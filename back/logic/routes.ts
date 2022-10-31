import {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "./controller";

const Router = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Origin, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    // On liste des méthodes et les entêtes valides
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Accept, Origin, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );

    return res.end();
  }
  if (req.method === "GET") {
    if (req.url === "/api/employees") {
      getEmployees(req, res);
    } else if (req.url.match(/\/api\/employees\/(\w{4}-?){3}/)) {
      const requestID = req.url.split("/")[3];

      getEmployee(req, res, requestID);
    } else {
      res.statusCode = 404;

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: `Error : ${req.url} not found !` }));
    }
  }
  if (req.method === "POST") {
    console.log("hello post");
    if (req.url === "/api/employees") {
      createEmployee(req, res);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: `Error : ${req.url} not found !` }));
    }
  }
  if (req.method === "DELETE") {
    if (req.url.match(/\/api\/employees\/(\w{4}-?){3}/)) {
      const requestID = req.url.split("/")[3];
      deleteEmployee(req, res, requestID);
    } else {
      res.statusCode = 404;

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: `Error : ${req.url} not found !` }));
    }
  }
  if (req.method === "PUT") {
    if (req.url.match(/\/api\/employees\/(\w{4}-?){3}/)) {
      const requestID = req.url.split("/")[3];
      updateEmployee(req, res, requestID);
    } else {
      res.statusCode = 404;

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: `Error : ${req.url} not found !` }));
    }
  }
};

export default Router;
