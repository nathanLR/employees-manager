import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import EmployeeList from "../EmployeeList/EmployeeList";

import { _FETCH_URL_ } from "../../utilities/constants";
import { useNavigate } from "react-router-dom";

const Management = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    fetch(_FETCH_URL_)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      });
  }, []);
  const handleUpdate = () => {
    navigate(`/update-employee/${selectedEmployees[0]}`);
  };
  const handleDelete = () => {
    //send to the api the array of employees i want to delete
    if (selectedEmployees.length === 1) {
      fetch(`${_FETCH_URL_}/${selectedEmployees[0]}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((message) => {
          console.log(message);
        });
      setEmployees(
        employees.filter((employee) => employee.id !== selectedEmployees[0])
      );
      setSelectedEmployees([]);
    } else {
      fetch(_FETCH_URL_, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedEmployees),
      })
        .then((response) => response.json())
        .then((message) => {
          console.log(message);
        });
      setEmployees(
        employees.filter((employee) => !selectedEmployees.includes(employee.id))
      );
      setSelectedEmployees([]);
    }
  };
  const toggleEmployeeToSelection = (employeeID) => {
    if (selectedEmployees.includes(employeeID)) {
      setSelectedEmployees(
        selectedEmployees.filter((employee) => employee !== employeeID)
      );
    } else {
      setSelectedEmployees((previous) => [...previous, employeeID]);
    }
  };
  return (
    <React.Fragment>
      <div className="actions">
        <div className="actions__title">
          <p>ACTIONS</p>
        </div>
        <div className="actions__actions">
          <Button
            text="update"
            bgColor="orange"
            disabled={selectedEmployees.length !== 1}
            onClick={handleUpdate}
          />
          <Button
            text="delete"
            bgColor="red"
            disabled={selectedEmployees.length === 0}
            onClick={handleDelete}
          />
        </div>
      </div>
      <div>
        <EmployeeList
          employees={employees}
          toggleEmployeeToSelection={toggleEmployeeToSelection}
        />
      </div>
    </React.Fragment>
  );
};

export default Management;
