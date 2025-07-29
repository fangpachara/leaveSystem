package com.example.leaveSystem.service;

import com.example.leaveSystem.dto.LeaveRequestModel;
import com.example.leaveSystem.entity.LeaveRequest;
import com.example.leaveSystem.repository.LeaveRequestRepository;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class LeaveAllService {

    private final LeaveRequestRepository leaveRequestRepository;

    public LeaveAllService(LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }

    public List<LeaveRequestModel> getAllRequest(){
        List<LeaveRequest> users = leaveRequestRepository.findAll();
        List<LeaveRequestModel> models = new ArrayList<>();


        for (LeaveRequest user : users) {
            LeaveRequestModel model = new LeaveRequestModel();
            model.setId(user.getId());
            model.setUserId(user.getUserId().getId());
            model.setLeaveTypeId(user.getLeaveTypeId().getId());
            model.setStartDate(user.getStartDate());
            model.setEndDate(user.getEndDate());
            model.setReason(user.getReason());
            model.setStatus(user.getStatus());
            model.setLeaveTypeName(user.getLeaveTypeId().getName());

            if (user.getStartDate() != null && user.getEndDate() != null){
                int leaveDay = (int) ChronoUnit.DAYS.between(model.getStartDate(), model.getEndDate()) +1;
                model.setUsedDays(leaveDay);
            }else{
                model.setUsedDays(0);
            }



            models.add(model);
        }
        return models;
    }
}
