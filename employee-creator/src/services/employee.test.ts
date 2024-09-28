import { describe, it, expect, MockedFunction } from "vitest";
import { EmployeeResponse, getAllEmployees } from "./employee";
import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

// mock axios
vi.mock("axios");

const mockedGet = axios.get as MockedFunction<typeof axios.get>;

describe("getAllEmployees", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch and return employees data successfully", async () => {
    const mockEmployees: EmployeeResponse[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        mobile: "1234567890",
        address: "123 Main St",
        employeeStatus: "Permanent",
        startDate: "2023-01-01",
        finishDate: "2024-01-01",
        onGoing: true,
        employmentBasis: "Part-time",
        hoursPerWeek: 40,
        createdAt: "2023-01-01T00:00:00.000Z",
      },
    ];
    mockedGet.mockResolvedValueOnce({ data: mockEmployees });

    const result = await getAllEmployees();

    expect(mockedGet).toHaveBeenCalledWith(`${baseURL}/employees`);

    expect(result).toEqual(mockEmployees);
  });

  it("should throw an error when fetching employees fails", async () => {
    mockedGet.mockRejectedValueOnce(new Error("Network Error"));

    await expect(getAllEmployees()).rejects.toThrow(
      "Failed to fetch employees"
    );

    expect(mockedGet).toHaveBeenCalledWith(`${baseURL}/employees`);
  });
});
