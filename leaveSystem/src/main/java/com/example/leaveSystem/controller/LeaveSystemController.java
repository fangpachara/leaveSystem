package com.example.leaveSystem.controller;

import com.example.leaveSystem.dto.LeaveRequestModel;
import com.example.leaveSystem.service.LeaveSystemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LeaveSystemController {

    private final LeaveSystemService leaveSystemService;

    public LeaveSystemController(LeaveSystemService leaveSystemService){
        this.leaveSystemService = leaveSystemService;
    }

    @PostMapping("/api/leave-requests")
    public ResponseEntity<LeaveRequestModel> createRequest(@RequestBody LeaveRequestModel model){
        return leaveSystemService.createRequest(model);
    }


}
