package nology.employee.employee;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateEmployeeDTO {

  @NotBlank(message = "First name is required.")
  @Length(min = 2, max = 50, message = "First name must be between 2 and 50 characters long.")
  private String firstName;

  @Length(max = 50, message = "Middle name must not exceed 50 characters.")
  private String middleName;

  @NotBlank(message = "Last name is required.")
  @Length(min = 2, max = 50, message = "Last name must be between 2 and 50 characters long.")
  private String lastName;

  @NotBlank(message = "Email is required.")
  @Email(message = "Email should be valid.")
  private String email;

  @NotBlank(message = "Mobile number is required.")
  @Length(min = 10, max = 15, message = "Mobile number should be between 10 and 15 digits.")
  private String mobile;

  @NotBlank(message = "Employee status is required.")
  private String employeeStatus;

  @NotNull(message = "Start date is required.")
  private LocalDate startDate;

  private LocalDate finishDate; // no validation needed

  private Boolean ongoing;

  @NotBlank(message = "Time basis is required.")
  private String timeBasis;

  @NotNull(message = "Hours per week is required.")
  private Integer hoursPerWeek;

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

  public String getEmployeeStatus() {
    return employeeStatus;
  }

  public void setEmployeeStatus(String employeeStatus) {
    this.employeeStatus = employeeStatus;
  }

  public LocalDate getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDate startDate) {
    this.startDate = startDate;
  }

  public LocalDate getFinishDate() {
    return finishDate;
  }

  public void setFinishDate(LocalDate finishDate) {
    this.finishDate = finishDate;
  }

  public Boolean getOngoing() {
    return ongoing;
  }

  public void setOngoing(Boolean ongoing) {
    this.ongoing = ongoing;
  }

  public String getTimeBasis() {
    return timeBasis;
  }

  public void setTimeBasis(String timeBasis) {
    this.timeBasis = timeBasis;
  }

  public Integer getHoursPerWeek() {
    return hoursPerWeek;
  }

  public void setHoursPerWeek(Integer hoursPerWeek) {
    this.hoursPerWeek = hoursPerWeek;
  }

}