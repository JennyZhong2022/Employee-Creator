import { useEffect, useState } from "react";
import {
  deleteEmployeeById,
  EmployeeResponse,
  getAllEmployees,
} from "../../services/employee";
import EmployeeCard from "../../components/EmployeeList/EmployeeCard";
import styles from "./EmployeesPage.module.scss";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const EmployeesPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [selectedEmployeeFirstName, setSelectedEmployeeFirstName] = useState<
    string | null
  >(null);
  const [selectedEmployeeLastName, setSelectedEmployeeLastName] = useState<
    string | null
  >(null);

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

  const handleDelete = (id: number, firstName: string, lastName: string) => {
    setSelectedEmployeeFirstName(firstName);
    setSelectedEmployeeLastName(lastName);
    setSelectedEmployeeId(id);
    setOpenConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedEmployeeId === null) return;

    const isConfirmed = await deleteEmployeeById(selectedEmployeeId).catch(
      (e) => {
        console.log(e);
        return false;
      }
    );

    if (isConfirmed) {
      setEmployees(
        employees.filter((employee) => employee.id !== selectedEmployeeId)
      );
    }

    setOpenConfirmModal(false);
    setSelectedEmployeeId(null);
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
          onDelete={handleDelete}
        />
      ))}
      <ConfirmModal
        isOpen={openConfirmModal}
        onRequestClose={() => setOpenConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployeeFirstName} ${selectedEmployeeLastName}?`}
      />
    </div>
  );
};

export default EmployeesPage;
