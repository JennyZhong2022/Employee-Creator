import { EmployeeFormData } from "../components/EmployForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface EmployeeResponse {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  employeeStatus: "Permanent" | "Contract" | "Casual";
  startDate: string; // ISO date string
  finishDate: string | null; // ISO date string or null
  onGoing: boolean;
  employmentBasis: "Full-time" | "Part-time";
  hoursPerWeek: number | null;
}

export function transformEmployeeData(
  employee: EmployeeResponse
): EmployeeFormData {
  const startDate = employee.startDate ? new Date(employee.startDate) : null;
  const finishDate = employee.finishDate ? new Date(employee.finishDate) : null;

  return {
    firstName: employee.firstName,
    middleName: employee.middleName || undefined,
    lastName: employee.lastName,
    email: employee.email,
    mobile: employee.mobile,
    address: employee.address,
    employeeStatus:
      employee.employeeStatus as EmployeeFormData["employeeStatus"],
    startDay: startDate ? startDate.getDate() : 1,
    startMonth: startDate
      ? (startDate.toLocaleString("default", {
          month: "long",
        }) as EmployeeFormData["startMonth"])
      : "January",
    startYear: startDate ? startDate.getFullYear() : new Date().getFullYear(),
    finishDay: finishDate ? finishDate.getDate() : null,
    finishMonth: finishDate
      ? (finishDate.toLocaleString("default", {
          month: "long",
        }) as EmployeeFormData["finishMonth"])
      : null,
    finishYear: finishDate ? finishDate.getFullYear() : null,
    onGoing: employee.onGoing,
    employmentBasis:
      employee.employmentBasis as EmployeeFormData["employmentBasis"],
    hoursPerWeek: employee.hoursPerWeek || null,
  };
}

export const getAllEmployees = async () => {
  const response = await fetch(baseURL + "/employees");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as EmployeeResponse[];
};

export const createEmployee = async (data: EmployeeFormData) => {
  const response = await fetch(baseURL + "/employees", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as EmployeeResponse;
};

export const getEmployeeById = async (id: number) => {
  const response = await fetch(baseURL + `/employees/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as EmployeeResponse;
};

export const updateEmployeeById = async (
  id: number,
  data: EmployeeFormData
) => {
  const response = await fetch(baseURL + `/employees/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as EmployeeResponse;
};

export const deleteEmployeeById = async (id: number) => {
  const response = await fetch(baseURL + `/employees/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return true;
};

export const deleteAllEmployee = async () => {
  const response = await fetch(baseURL + "/employees", {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return true;
};
