package com.example.leaveSystem.dto;

public class LeaveTypeSumModel {
    private String fullName;
    private String department;
    private int sick;
    private int business;
    private int vacation;
    private int sumAll;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getSick() {
        return sick;
    }

    public void setSick(int sick) {
        this.sick = sick;
    }

    public int getBusiness() {
        return business;
    }

    public void setBusiness(int business) {
        this.business = business;
    }

    public int getVacation() {
        return vacation;
    }

    public void setVacation(int vacation) {
        this.vacation = vacation;
    }

    public int getSumAll() {
        return sumAll;
    }

    public void setSumAll(int sumAll) {
        this.sumAll = sumAll;
    }
}
