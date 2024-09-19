import { useEffect, useState } from "react";
import {
  deleteEmployeeById,
  EmployeeResponse,
  getAllEmployees,
} from "../../services/employee";
import EmployeeCard from "../../components/EmployeeList/EmployeeCard";
import styles from "./EmployeesPage.module.scss";
import { useNavigate } from "react-router-dom";

const EmployeesPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);

  useEffect(() => {
    getAllEmployees()
      .then((data) => {
        setEmployees(data);
      })
      .catch((e) => {
        console.error("Failed to fetch employees", e);
      });
  }, []);

  console.log("employees", employees);

  const onDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) {
      return;
    }
    const isConfirmed = await deleteEmployeeById(id).catch((e) => {
      console.log(e);
      return false;
    });
    if (isConfirmed) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  const handleAddEmployee = () => {
    navigate("/add-employee");
  };

  return (
    <div className={styles.employeesList}>
      <div className={styles.employeesList__header}>
        <h1 className={styles.employeesList__title}>Employees' list</h1>
        <div className={styles.employeesList__subheader}>
          <p className={styles.employeesList__instruction}>
            Please click on "Edit" to find more details of each employee
          </p>
          <button
            className={styles.employeesList__addButton}
            onClick={handleAddEmployee}
          >
            Add employee
          </button>
        </div>
      </div>
      {employees.map((employee) => (
        <EmployeeCard
          employee={employee}
          key={employee.id}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EmployeesPage;
