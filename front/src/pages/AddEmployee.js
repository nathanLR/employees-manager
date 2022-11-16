import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "./AddEmployee.scss";
import heroImage from "../assets/images/workspace.svg";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  let redirectionTimeout;
  const navigate = useNavigate();
  const [newEmployeeCreated, setNewEmployeeCreated] = useState(false);
  const [newEmployeeForm, setNewEmployeeForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: 1,
  });

  useEffect(() => {
    return () => {
      clearTimeout(redirectionTimeout);
    };
  }, [redirectionTimeout]);

  const hanldeInputChange = ({ target }) => {
    setNewEmployeeForm((previous) => ({
      ...previous,
      [target.name]: target.value,
    }));
  };
  const handleSelectChange = ({ target }) => {
    setNewEmployeeForm((previous) => ({
      ...previous,
      role: parseInt(target.value),
    }));
  };
  const isFormValid = () => {
    const { firstName, lastName, email, role } = newEmployeeForm;
    if (
      firstName.length !== 0 &&
      lastName.length !== 0 &&
      email.match(/^([a-z0-9]+|([a-z0-9]+\.[a-z0-9]+))@[a-z]+\.[a-z]{2,3}$/) &&
      role
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/api/employees", {
      method: "POST",
      body: JSON.stringify(newEmployeeForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNewEmployeeCreated(true);

        redirectionTimeout = setTimeout(navigate("/"), 500);
      });
  };

  return (
    <Layout>
      <div>
        <img
          src={heroImage}
          alt="workspace"
          style={{
            height: "300px",
            width: "auto",
            margin: "auto",
            display: "block",
          }}
        />
      </div>
      <form onSubmit={handleSubmit} className="newEmployeeForm">
        <div className="newEmployeeForm__formfield">
          <label htmlFor="firstName">First Name :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Harry"
            value={newEmployeeForm.firstName}
            onChange={hanldeInputChange}
          />
        </div>
        <div className="newEmployeeForm__formfield">
          <label htmlFor="lastName">Last Name :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="POTTER"
            value={newEmployeeForm.lastName}
            onChange={hanldeInputChange}
          />
        </div>
        <div className="newEmployeeForm__formfield">
          <label htmlFor="email">Email adress :</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="harry.potter@poudlard.com"
            value={newEmployeeForm.email}
            onChange={hanldeInputChange}
          />
        </div>
        <div className="newEmployeeForm__formfield">
          <label htmlFor="role">Role :</label>
          <select
            id="role"
            name="role"
            onChange={handleSelectChange}
            value={newEmployeeForm.role}
          >
            <option value="1">Developer</option>
            <option value="2">Designer</option>
            <option value="3">Human Resources</option>
          </select>
        </div>
        <input
          type="submit"
          value="add employee"
          disabled={!isFormValid() || newEmployeeCreated}
        />
      </form>
    </Layout>
  );
};

export default AddEmployee;
