import { useEffect, useState } from "react";
import {
  deleteEmployeeById,
  EmployeeResponse,
  getAllEmployees,
} from "../../services/todo-post";
import EmployeeList from "../../components/EmployeeList/EmployeeList";

const EmployeesPage = () => {
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

  return (
    <div>
      {employees.map((employee) => (
        <EmployeeList employee={employee} key={employee.id} />
      ))}
    </div>
  );
};

export default EmployeesPage;
