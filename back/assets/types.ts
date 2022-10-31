export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 1 | 2 | 3;
};
export type Employees = Array<Employee>;
