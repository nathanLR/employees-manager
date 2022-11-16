import React, { useState } from "react";
import PropTypes from "prop-types";
import { getRoleEmployeeRole } from "../../utilities/functions";

import "./EmployeeList.scss";

const EmployeeList = ({ employees, toggleEmployeeToSelection }) => {
  // const [globalSelection, setGlobalSelection] = useState([]);
  // const handleCheckBoxBulkChange = () => {

  // }
  return (
    <ul className="employeeList">
      <li className="employeeList__header">
        <p className="checkbox">
          {/* <input type="checkbox" onChange={handleCheckBoxBulkChange}/> */}
        </p>
        <p>First Name</p>
        <p>Last Name</p>
        <p>Email adress</p>
        <p>Role</p>
      </li>
      {employees.map((employee) => (
        <Employee
          employee={employee}
          key={employee.id}
          toggleEmployeeToSelection={toggleEmployeeToSelection}
        />
      ))}
    </ul>
  );
};
EmployeeList.propTypes = {
  employees: PropTypes.array.isRequired,
  toggleEmployeeToSelection: PropTypes.func.isRequired,
};

const Employee = ({ employee, isChecked, toggleEmployeeToSelection }) => {
  const { id, firstName, lastName, email, role } = employee;
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckBoxChange = () => {
    // event.preventDefault();
    setIsSelected((prev) => !prev);
    toggleEmployeeToSelection(id);
  };
  return (
    <li className="employeeList__item">
      <p className="checkbox">
        <input
          type="checkbox"
          name="unit"
          onChange={handleCheckBoxChange}
          checked={isSelected}
        />
      </p>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{email}</p>
      <p>{getRoleEmployeeRole(role)}</p>
    </li>
  );
};
Employee.propTypes = {
  employee: PropTypes.object.isRequired,
  isChecked: PropTypes.bool,
  toggleEmployeeToSelection: PropTypes.func,
};

export default EmployeeList;
