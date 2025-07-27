package com.example.leaveSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "leave_requests")
public class LeaveRequest {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private Users userId;

    @ManyToOne
    @JoinColumn(name="leave_id")
    private LeaveType leaveTypeId;

    @Column(name="start_date")
    private LocalDate startDate;
    @Column(name="end_date")
    private LocalDate endDate;
    @Column(name="status")
    private String status;
    @Column(name="reason")
    private String reason;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public Users getUserId() {
        return userId;
    }

    public void setUserId(Users userId) {
        this.userId = userId;
    }

    public LeaveType getLeaveTypeId() {
        return leaveTypeId;
    }

    public void setLeaveTypeId(LeaveType leaveTypeId) {
        this.leaveTypeId = leaveTypeId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
