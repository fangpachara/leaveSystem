package com.example.leaveSystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name="leave_balances")
public class LeaveBalance {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private Users user_id;

    @ManyToOne
    @JoinColumn(name="leave_id")
    private LeaveType leaveType_id;

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

    public Users getUser_id() {
        return user_id;
    }

    public void setUser_id(Users user_id) {
        this.user_id = user_id;
    }

    public LeaveType getLeaveType_id() {
        return leaveType_id;
    }

    public void setLeaveType_id(LeaveType leaveType_id) {
        this.leaveType_id = leaveType_id;
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
