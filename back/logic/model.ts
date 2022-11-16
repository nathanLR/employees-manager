import { _DATA_FILE_ } from "../assets/config";
import fs, { readFileSync } from "fs";
import { Employee, Employees } from "../assets/types";
import { guid, writeToFile } from "../assets/helpers";

export const findAll = (): Promise<Array<object>> => {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(_DATA_FILE_, "utf-8");

    resolve(JSON.parse(data));
  });
};

export const findById = (employeeID: string): Promise<Employee> => {
  return new Promise((resolve, reject) => {
    const data: Employees = JSON.parse(fs.readFileSync(_DATA_FILE_, "utf8"));

    const employee: Employee | undefined = data.find(
      (emp) => emp.id === employeeID
    );
    resolve(employee);
  });
};

export const create = (newEmployee: string): Promise<Employee> => {
  return new Promise((resolve, reject) => {
    let data: Employees = JSON.parse(fs.readFileSync(_DATA_FILE_, "utf-8"));

    let employeeToPush: Employee = { id: guid(), ...JSON.parse(newEmployee) };
    data.push(employeeToPush);

    writeToFile(_DATA_FILE_, data);
    resolve(employeeToPush);
  });
};

export const deleteE = (employeeID: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    let employeeHasBeenDeleted = false;

    const employees: Employees = JSON.parse(
      fs.readFileSync(_DATA_FILE_, "utf-8")
    );

    const newEmployees = employees.filter(
      (employee: Employee) => employee.id != employeeID
    );

    if (newEmployees.length < employees.length) {
      employeeHasBeenDeleted = true;
      writeToFile(_DATA_FILE_, newEmployees);
    }

    resolve(employeeHasBeenDeleted);
  });
};
export const deleteMultiple = (employeesID: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    let employeesHaveBeenDeleted = false;
    const employeesToBeDeleted: [string] = JSON.parse(employeesID);
    const employees: Employees = JSON.parse(
      fs.readFileSync(_DATA_FILE_, "utf-8")
    );
    const newEmployees: Employees = employees.filter(
      (employee) => !employeesToBeDeleted.includes(employee.id)
    );
    if (
      newEmployees.length ===
      employees.length - employeesToBeDeleted.length
    ) {
      employeesHaveBeenDeleted = true;
      writeToFile(_DATA_FILE_, newEmployees);
    }
    resolve(employeesHaveBeenDeleted);
  });
};
export const update = (
  employeeID: string,
  dataToReplace: {
    firstName: string;
    lastName: string;
    email: string;
    role: 1 | 2 | 3;
  }
): Promise<Employee> => {
  return new Promise((resolve, reject) => {
    let data: Employees = JSON.parse(fs.readFileSync(_DATA_FILE_, "utf-8"));
    const index = data.findIndex((employee) => employee.id === employeeID);
    data[index] = { id: employeeID, ...dataToReplace };
    writeToFile(_DATA_FILE_, data);
    resolve(data[index]);
  });
};
