import React from "react";
import Layout from "../components/Layout/Layout";
import Management from "../components/Management/Management";
import heroImage from "../assets/images/workflow.svg";
import "./Home.scss";

const Home = () => {
  return (
    <Layout>
      <div>
        <img
          src={heroImage}
          alt="workflow"
          style={{
            height: "300px",
            width: "auto",
            margin: "auto",
            display: "block",
          }}
        />
      </div>
      <Management />
    </Layout>
  );
};

export default Home;
