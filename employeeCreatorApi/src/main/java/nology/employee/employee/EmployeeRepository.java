package nology.employee.employee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

  @Query("SELECT e FROM Employee AS e WHERE e.firstName LIKE %:name% OR e.middleName LIKE %:name% OR e.lastName LIKE %:name%")
  List<Employee> findByAnyName(@Param("name") String name);

  @Query("SELECT e FROM Employee AS e WHERE e.employeeStatus LIKE %:status%")
  List<Employee> findByEmployeeStatus(String status);

}
