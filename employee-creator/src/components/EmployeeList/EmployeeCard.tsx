import { EmployeeResponse } from "../../services/employee";
import styles from "./EmployeeCard.module.scss";

interface EmployeeCardProps {
  employee: EmployeeResponse;
  onDelete: (id: number) => Promise<unknown>;
}

const EmployeeCard = ({ employee, onDelete }: EmployeeCardProps) => {
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
            <a
              className={styles.removeLink}
              onClick={() => onDelete(employee.id)}
            >
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
