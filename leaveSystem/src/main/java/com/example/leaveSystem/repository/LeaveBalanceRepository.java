package com.example.leaveSystem.repository;

import com.example.leaveSystem.entity.LeaveBalance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveBalanceRepository extends JpaRepository<LeaveBalance, Integer> {
}
