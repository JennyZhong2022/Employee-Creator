import { useContext, useEffect, useState } from "react";
import {
  deleteEmployeeById,
  EmployeeResponse,
  getAllEmployees,
  searchForEmployeeName,
  searchForEmployeeNameByEmployeeStatus,
} from "../../services/employee";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import styles from "./EmployeesPage.module.scss";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../Modals/ConfirmModal/ConfirmModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import FilterModal from "../../Modals/FilterModal/FilterModal";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../Redux/searchSlice";
const EmployeesPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [employmentStatus, setEmploymentStatus] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
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
      dispatch(setSearchTerm(""));
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

  const handleStatusChange = (e: any): void => {
    setEmploymentStatus(e.target.value);
  };

  const handleFilter = () => {
    if (!employmentStatus || employmentStatus === "") {
      handleGetAllEmployees(); // Reset to show all if 'All' is selected
    } else {
      setLoading(true);
      setError(null);
      searchForEmployeeNameByEmployeeStatus(employmentStatus)
        .then((data) => {
          setEmployees(data);
          setLoading(false);
        })
        .catch((e) => {
          console.error("Failed to fetch employees by status", e);
          setError(`Can't find employees with status "${employmentStatus}"`);
          setLoading(false);
        });
    }
    setOpenFilterModal(false);
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
            className={styles.employeesList__button}
            onClick={handleAddEmployee}
          >
            Add employee
          </button>
        </div>
      </div>

      <div className={styles.employeesList__navBar}>
        <button
          className={styles.employeesList__button}
          onClick={handleGetAllEmployees}
        >
          All Employees
        </button>

        <div>
          <button
            onClick={() => setOpenFilterModal(true)}
            className={styles.employeesList__button}
          >
            Filter by Status
          </button>
          <FilterModal
            openFilterModal={openFilterModal}
            closeModal={() => setOpenFilterModal(false)}
            status={employmentStatus}
            onStatusChange={handleStatusChange}
            handleFilter={handleFilter}
          />
        </div>

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
