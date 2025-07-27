package com.example.leaveSystem.service;

import com.example.leaveSystem.dto.LeaveRequestModel;
import com.example.leaveSystem.entity.LeaveRequest;
import com.example.leaveSystem.entity.LeaveType;
import com.example.leaveSystem.entity.Users;
import com.example.leaveSystem.repository.LeaveRequestRepository;
import com.example.leaveSystem.repository.LeaveTypeRepository;
import com.example.leaveSystem.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LeaveSystemService {

    private final UserRepository userRepository;
    private final LeaveTypeRepository leaveTypeRepository;
    private final LeaveRequestRepository leaveRequestRepository;

    public LeaveSystemService(UserRepository userRepository, LeaveTypeRepository leaveTypeRepository, LeaveRequestRepository leaveRequestRepository){
        this.userRepository = userRepository;
        this.leaveTypeRepository = leaveTypeRepository;
        this.leaveRequestRepository = leaveRequestRepository;
    }

    public LeaveRequestModel createRequest(LeaveRequestModel model){
        Users user = UserRepository.findById(model.getUserId());
        LeaveType leaveType = LeaveTypeRepository.findByid(model.getLeaveTypeId());

        //เอาข้อมูลลง entity
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setUserId(user);
        leaveRequest.setLeaveTypeId(leaveType);
        leaveRequest.setStartDate(model.getStartDate());
        leaveRequest.setEndDate(model.getEndDate());
        leaveRequest.setReason(model.getReason());
        leaveRequest.setStatus("Pending");

        LeaveRequest saved = leaveRequestRepository.save(leaveRequest);
        model.setId(saved.getId());
        model.setStatus(saved.getStatus());

        return ResponseEntity.ok(model);
    }
}
