import { getRequestData } from "../assets/helpers";
import { Employee } from "../assets/types";
import {
  create,
  findAll,
  findById,
  deleteE,
  update,
  deleteMultiple,
} from "./model";

export const getEmployees = async (req, res): Promise<void> => {
  try {
    const employees = await findAll();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify(employees));
  } catch (error) {
    console.log(error);
  }
};

export const getEmployee = async (req, res, employeeID): Promise<void> => {
  try {
    const employee = await findById(employeeID);

    if (employee != undefined) {
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(JSON.stringify(employee));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Erorr 404: employee not found in the database !",
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const createEmployee = async (req, res): Promise<void> => {
  try {
    const newEmployee = await getRequestData(req);
    const employeeCreated: Employee = await create(newEmployee);
    res.writeHead(201, { "Content-Type": "application/json" });

    res.end(JSON.stringify(employeeCreated));
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = async (req, res, employeeID): Promise<void> => {
  try {
    if (deleteE(employeeID)) {
      res.writeHead(201, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          message: `Employee N° ${employeeID} deleted successfully !`,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteEmployees = async (req, res): Promise<void> => {
  try {
    const employeesToBeDeleted = await getRequestData(req);
    if (deleteMultiple(employeesToBeDeleted)) {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "employees deleted successfully" }));
    } else {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Some of the employees might have not been found !",
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = async (req, res, employeeID): Promise<void> => {
  try {
    const employee: Employee = await findById(employeeID);
    if (employee) {
      const updates = await getRequestData(req);
      const { firstName, lastName, email, role } = JSON.parse(updates);
      const dataToReplace = {
        firstName: firstName || employee.firstName,
        lastName: lastName || employee.lastName,
        email: email || employee.email,
        role: role || employee.role,
      };
      const updatedEmployee = await update(employeeID, dataToReplace);
      if (updatedEmployee) {
        res.writeHead(200, { "Content-type": "application/json" });

        res.end(JSON.stringify(updatedEmployee));
      } else {
        res.writeHead(404, { "Content-type": "application/json" });

        res.end(JSON.stringify({ message: "Something went wrong !" }));
      }
    } else {
      res.writeHead(404, { "Content-type": "application/json" });

      res.end(JSON.stringify({ message: "Employee not found !" }));
    }
  } catch (error) {
    console.log(error);
  }
};
