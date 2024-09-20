package nology.employee.employee;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import nology.employee.common.BaseEntity;

@Entity
@Table(name = "employee_creator")
public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(columnDefinition = "TEXT")
  private String firstName;

  @Column(columnDefinition = "TEXT")
  private String middleName;

  @Column(columnDefinition = "TEXT")
  private String lastName;

  @Email
  @Column(columnDefinition = "VARCHAR(255)")
  private String email;

  @Column(columnDefinition = "VARCHAR(15)")
  private String mobile;

  @Column(columnDefinition = "TEXT")
  private String employeeStatus;

  @Column(columnDefinition = "DATE")
  private String startDate;

  @Column(columnDefinition = "DATE")
  private String finishDate;

  @Column
  private Boolean onGoing;

  @Column(columnDefinition = "VARCHAR(50)")
  private String employmentBasis;

  @Column
  private Integer hoursPerWeek;

  public Employee() {
  }

  public Long getId() {
    return id;
  }

  // public void setId(Long id) {
  // this.id = id;
  // }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getMiddleName() {
    return middleName;
  }

  public void setMiddleName(String middleName) {
    this.middleName = middleName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getMobile() {
    return mobile;
  }

  public void setMobile(String mobile) {
    this.mobile = mobile;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  @Column(columnDefinition = "VARCHAR(255)")
  private String address;

  public String getEmployeeStatus() {
    return employeeStatus;
  }

  public void setEmployeeStatus(String employeeStatus) {
    this.employeeStatus = employeeStatus;
  }

  public String getStartDate() {
    return startDate;
  }

  public void setStartDate(String startDate) {
    this.startDate = startDate;
  }

  public String getFinishDate() {
    return finishDate;
  }

  public void setFinishDate(String finishDate) {
    this.finishDate = finishDate;
  }

  public Boolean getOngoing() {
    return onGoing;
  }

  public void setOngoing(Boolean onGoing) {
    this.onGoing = onGoing;
  }

  public Integer getHoursPerWeek() {
    return hoursPerWeek;
  }

  public void setHoursPerWeek(Integer hoursPerWeek) {
    this.hoursPerWeek = hoursPerWeek;
  }

  public String getEmploymentBasis() {
    return employmentBasis;
  }

  public void setEmploymentBasis(String employmentBasis) {
    this.employmentBasis = employmentBasis;
  }

}