package com.example.leaveSystem.repository;

import com.example.leaveSystem.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer> {
    @Query("select i from LeaveRequest i where i.userId.Id = :userId and i.leaveTypeId.Id = :leaveTypeId") //ใช้เชื่อม userid กับ leavetypeid ถ้าไม่ใส่หาไม่เจอ
    List<LeaveRequest> findByUserIdAndLeaveTypeId(@Param("userId") int userId,@Param("leaveTypeId") int leaveTypeId);
}
