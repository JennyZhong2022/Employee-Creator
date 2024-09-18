import { EmployeeResponse } from "../../services/todo-post";

interface EmployeeListProps {
  employee: EmployeeResponse;
}

const EmployeeList = ({ employee }: EmployeeListProps) => {
  return <div>{employee.firstName}</div>;
};

export default EmployeeList;
