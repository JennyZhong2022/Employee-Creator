import { EmployeeResponse } from "../../services/employee";
import styles from "./EmployeeCard.module.scss";

interface EmployeeCardProps {
  employee: EmployeeResponse;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  return (
    <div className={styles.employeeCardContainer}>
      <div className={styles.employeeCard}>
        <div className={styles.employeeInfo}>
          <div className={styles.name}>
            {employee.firstName} {employee.middleName} {employee.lastName}
          </div>
          <div className={styles.actions}>
            <a href="#" className={styles.editLink}>
              Edit
            </a>{" "}
            <a href="#" className={styles.removeLink}>
              Remove
            </a>
          </div>
        </div>
        <div className={styles.employmentDetails}>
          {employee.employeeStatus} - {employee.startDate}
        </div>
        <div className={styles.email}>{employee.email}</div>
      </div>
    </div>
  );
};

export default EmployeeCard;
