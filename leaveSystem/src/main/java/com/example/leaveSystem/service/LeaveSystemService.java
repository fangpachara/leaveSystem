package com.example.leaveSystem.service;

import com.example.leaveSystem.dto.LeaveBalanceModel;
import com.example.leaveSystem.dto.LeaveRequestModel;
import com.example.leaveSystem.dto.LeaveTypeModel;
import com.example.leaveSystem.dto.LeaveTypeSumModel;
import com.example.leaveSystem.entity.LeaveBalance;
import com.example.leaveSystem.entity.LeaveRequest;
import com.example.leaveSystem.entity.LeaveType;
import com.example.leaveSystem.entity.Users;
import com.example.leaveSystem.repository.LeaveBalanceRepository;
import com.example.leaveSystem.repository.LeaveRequestRepository;
import com.example.leaveSystem.repository.LeaveTypeRepository;
import com.example.leaveSystem.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LeaveSystemService {

    private final UserRepository userRepository;
    private final LeaveTypeRepository leaveTypeRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;

    public LeaveSystemService(UserRepository userRepository, LeaveTypeRepository leaveTypeRepository, LeaveRequestRepository leaveRequestRepository, LeaveBalanceRepository leaveBalanceRepository){
        this.userRepository = userRepository;
        this.leaveTypeRepository = leaveTypeRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
    }

    //สร้าง request
    public LeaveRequestModel createRequest(LeaveRequestModel model){
        Users user = new Users();
        user.setId(model.getUserId());

        LeaveType leaveType = new LeaveType();
        leaveType.setId(model.getLeaveTypeId());

        //เอาข้อมูลลง entity
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setUserId(user);
        leaveRequest.setLeaveTypeId(leaveType);
        leaveRequest.setStartDate(model.getStartDate());
        leaveRequest.setEndDate(model.getEndDate());
        leaveRequest.setReason(model.getReason());
        leaveRequest.setStatus("PENDING");

        LeaveRequest saveRequest = leaveRequestRepository.save(leaveRequest);
        model.setId(saveRequest.getId());
        model.setStatus(saveRequest.getStatus());
        return model;
    }

    //อัพเดท PENDING เป็น APPROVED
    public LeaveRequestModel updateStatus(int Id, String status){
        LeaveRequest leaveRequest = leaveRequestRepository.findById(Id).orElseThrow(() -> new RuntimeException("Id not found"));

        leaveRequest.setStatus(status.toUpperCase());
        LeaveRequest request = leaveRequestRepository.save(leaveRequest);

        if(status.equals("NOTAPPROVED")){
            leaveRequestRepository.delete(leaveRequest);
        }
        LeaveRequestModel model = new LeaveRequestModel();
        model.setId(request.getId());
        model.setUserId(request.getUserId().getId());
        model.setLeaveTypeId(request.getLeaveTypeId().getId());
        model.setStartDate(request.getStartDate());
        model.setEndDate(request.getEndDate());
        model.setReason(request.getReason());
        model.setStatus(request.getStatus());


        return model;
    }

    //ดูวันลวคงเหลือ
    public List<LeaveBalanceModel> calRemainingDays(){
        List<LeaveBalance> leaveBalance = leaveBalanceRepository.findAll();
        List<LeaveBalanceModel> result = new ArrayList<>();

        for (LeaveBalance balance : leaveBalance){
            Users user = balance.getUserId();
            LeaveType leave = balance.getLeaveTypeId();
            int year = balance.getYear();


            List<LeaveRequest> leaveRequest  = leaveRequestRepository.findByUserIdAndLeaveTypeId(user.getId(), leave.getId());
            int usedDay = 0;
            for (LeaveRequest request : leaveRequest){
                if("APPROVED".equals(request.getStatus())){ //ถ้า approved ตรงกับใน statas ให้บวกๆ
                    int leaveDay = (int)ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) +1;
                    usedDay += leaveDay;
                }
            }
            int maxDay = leave.getMaxDays();
            int remainDay  = maxDay - usedDay;

            LeaveBalanceModel model = new LeaveBalanceModel();
            model.setId(balance.getId());
            model.setUserId(balance.getUserId().getId());
            model.setLeaveTypeId(balance.getLeaveTypeId().getId());
            model.setYear(year);
            model.setRemainingDays(remainDay);
            model.setUsedDays(usedDay);

            result.add(model);

            balance.setRemainingDays(remainDay);
            leaveBalanceRepository.save(balance);
        }

        //รวมวันลาทั้งหมดของแต่ละคน
        for (LeaveBalanceModel i : result){
            int total = 0; //วันลารวม
            int totalRemain = 0; //วันลาที่เหลือ
            for (LeaveBalanceModel j : result){
                if(j.getUserId() == (i.getUserId())){
                    total += j.getUsedDays();
                    totalRemain += j.getRemainingDays();
                }
            }
            i.setTotalLeaveDays(total);
            i.setTotalRemaining(totalRemain);
        }
    return result;
    }

    //get ค่า leavetype แต่ละไอดี
    public List<LeaveTypeSumModel> getLeaveType(){
        List<LeaveRequest> leaveRequests = leaveRequestRepository.findByStatus("APPROVED");
        Map<Integer, LeaveTypeSumModel> summary = new HashMap<>();

        for (LeaveRequest request : leaveRequests){
            Users user = request.getUserId();
            LeaveType leaveType = request.getLeaveTypeId();
            int days = (int)ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) +1;

            LeaveTypeSumModel model = summary.computeIfAbsent(user.getId(), k -> {
                LeaveTypeSumModel list = new LeaveTypeSumModel();
                list.setFullName(user.getUserName());
                list.setDepartment(user.getDepartment());
                return list;
            });

            //บวกวันลาป่วย
            switch (leaveType.getName()){
                case "ลาป่วย" -> model.setSick(model.getSick() + days);
                case "ลากิจ" -> model.setBusiness(model.getBusiness() + days);
                case "ลาพักร้อน" -> model.setVacation(model.getVacation() + days);
            }
        }

        for(LeaveTypeSumModel sum : summary.values()){
            int total = sum.getSick() + sum.getBusiness() + sum.getVacation();
            sum.setSumAll(total);
        }
        return new ArrayList<>(summary.values());
    }
}
