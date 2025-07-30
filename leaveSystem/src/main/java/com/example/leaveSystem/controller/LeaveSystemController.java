package com.example.leaveSystem.controller;

import com.example.leaveSystem.dto.LeaveBalanceModel;
import com.example.leaveSystem.dto.LeaveRequestModel;
import com.example.leaveSystem.dto.LeaveTypeSumModel;
import com.example.leaveSystem.service.LeaveAllService;
import com.example.leaveSystem.service.LeaveSystemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LeaveSystemController {

    private final LeaveSystemService leaveSystemService;
    private final LeaveAllService leaveAllService;

    public LeaveSystemController(LeaveSystemService leaveSystemService, LeaveAllService leaveAllService){
        this.leaveSystemService = leaveSystemService;
        this.leaveAllService = leaveAllService;
    }

    @PostMapping("/crate-request")
    public ResponseEntity<LeaveRequestModel> createRequest(@RequestBody LeaveRequestModel model){
        return ResponseEntity.ok(leaveSystemService.createRequest(model));
    }

    @GetMapping("/getAll")
    public List<LeaveRequestModel> getAllRequest(){
        return leaveAllService.getAllRequest();
    }

    @PutMapping("/PutRequest/{Id}")
    public ResponseEntity<LeaveRequestModel> updateStatus(@PathVariable int Id,
                                                          @RequestParam String status){
        return ResponseEntity.ok(leaveSystemService.updateStatus(Id, status));
    }

    @GetMapping("/GetBalances")
    public ResponseEntity<List<LeaveBalanceModel>> calRemainDays(){
        return ResponseEntity.ok(leaveSystemService.calRemainingDays());
    }

    @GetMapping("/get-leavetype-all")
    public List<LeaveTypeSumModel> getLeaveType(){
        return leaveSystemService.getLeaveType();
    }
}
