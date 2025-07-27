package com.example.leaveSystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name="leave_balances")
public class LeaveBalance {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private Users userId;

    @ManyToOne
    @JoinColumn(name="leave_id")
    private LeaveType leaveTypeId;

    @Column(name="year")
    private int year;
    @Column(name="remain_days")
    private int remainingDays;

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

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getRemainingDays() {
        return remainingDays;
    }

    public void setRemainingDays(int remainingDays) {
        this.remainingDays = remainingDays;
    }
}
