import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "./AddEmployee.scss";
import heroImage from "../assets/images/workspace.svg";
import { useNavigate, useParams } from "react-router-dom";
import { _FETCH_URL_ } from "../utilities/constants";

const UpdateEmployee = () => {
  const { id } = useParams();
  let redirectionTimeout;

  const navigate = useNavigate();

  const [employeeUpdated, setEmployeeUpdated] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: 1,
  });

  useEffect(() => {
    fetch(`${_FETCH_URL_}/${id}`)
      .then((reponse) => reponse.json())
      .then((data) => {
        console.log(data);
        setForm({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role,
        });
      });

    return () => {
      clearTimeout(redirectionTimeout);
    };
  }, [redirectionTimeout]);

  const hanldeInputChange = ({ target }) => {
    setForm((previous) => ({
      ...previous,
      [target.name]: target.value,
    }));
  };
  const handleSelectChange = ({ target }) => {
    setForm((previous) => ({
      ...previous,
      role: parseInt(target.value),
    }));
  };
  const isFormValid = () => {
    const { firstName, lastName, email, role } = form;
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
    fetch(`http://localhost:4000/api/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployeeUpdated(true);
        console.log(data);
        redirectionTimeout = setTimeout(navigate("/"), 500);
      });
  };
  console.log(isFormValid());
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
            value={form.firstName}
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
            value={form.lastName}
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
            value={form.email}
            onChange={hanldeInputChange}
          />
        </div>
        <div className="newEmployeeForm__formfield">
          <label htmlFor="role">Role :</label>
          <select
            id="role"
            name="role"
            onChange={handleSelectChange}
            value={form.role}
          >
            <option value="1">Developer</option>
            <option value="2">Designer</option>
            <option value="3">Human Resources</option>
          </select>
        </div>
        <input
          type="submit"
          value="update employee"
          disabled={!isFormValid() || employeeUpdated}
        />
      </form>
    </Layout>
  );
};

export default UpdateEmployee;
