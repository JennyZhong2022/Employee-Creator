import { useContext, useEffect, useState } from "react";
import {
  deleteEmployeeById,
  EmployeeResponse,
  getAllEmployees,
  searchForEmployeeName,
} from "../../services/employee";
import EmployeeCard from "../../components/EmployeeList/EmployeeCard";
import styles from "./EmployeesPage.module.scss";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import { SearchQueryContext } from "../../context/SearchQueryContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const EmployeesPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { searchTerm, setSearchTerm } = useContext(SearchQueryContext);
  const [searchedEmployees, setSearchedEmployees] = useState<
    EmployeeResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [selectedEmployeeFirstName, setSelectedEmployeeFirstName] = useState<
    string | null
  >(null);
  const [selectedEmployeeLastName, setSelectedEmployeeLastName] = useState<
    string | null
  >(null);

  // Get all employees
  useEffect(() => {
    getAllEmployees()
      .then((data) => {
        setEmployees(data);
      })
      .catch((e) => {
        console.error("Failed to fetch all employees", e);
        setError("Error fetching all employees");
        setLoading(false);
      });
  }, []);

  console.log(loading);

  const handleGetAllEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllEmployees();
      setEmployees(data);
      setSearchedEmployees([]);
      setSearchTerm("");
    } catch (error) {
      console.error("Failed to fetch all employees", error);
      setError("Failed to fetch all employees");
    }
    setLoading(false);
  };

  console.log("employees", employees);

  // Get searched employees only when searchTerm is not empty
  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      setError(null);
      searchForEmployeeName(searchTerm)
        .then((data) => {
          setSearchedEmployees(data);
          setLoading(false);
        })
        .catch((e) => {
          console.error("Failed to fetch employees", e);
          setError(`Can't find the employee "${searchTerm}"`);
          setLoading(false);
        });
    }
  }, [searchTerm]);

  const employeesToShow =
    searchTerm && searchedEmployees.length > 0 ? searchedEmployees : employees;

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

      <div className={styles.employeesList__navBar}>
        <button
          className={styles.employeesList__addButton}
          onClick={handleGetAllEmployees}
        >
          All Employees
        </button>

        <SearchBar />
      </div>
      {loading && (
        <div className={styles.employeesList__loading}>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      )}
      {error && (
        <div className={styles.employeesList__errorMessage}>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
      {!loading &&
        !error &&
        employeesToShow.map((employee) => (
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
