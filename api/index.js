const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, "..", "public")));

const employees = [
  { id: 1, employee_name: "Jessica Koo", employee_salary: 86000, employee_age: 66 },
  { id: 2, employee_name: "Rachel Lee", employee_salary: 433060, employee_age: 22 },
  { id: 3, employee_name: "Kaitlyn Hu", employee_salary: 137500, employee_age: 59 },
  { id: 4, employee_name: "Josh Richardson", employee_salary: 205500, employee_age: 39 },
  { id: 5, employee_name: "Anthony Chen", employee_salary: 470600, employee_age: 36 },
  { id: 6, employee_name: "Takumi Usui", employee_salary: 345000, employee_age: 30 },
  { id: 7, employee_name: "Levi Ackerman", employee_salary: 106450, employee_age: 48 },
   { id: 8, employee_name: "Naruto Uzumaki", employee_salary: 106451, employee_age: 22 },
   { id: 9, employee_name: "Sakura Haruno", employee_salary: 106452, employee_age: 60 },
   { id: 10, employee_name: "Justin Chong", employee_salary: 106453, employee_age: 25 },
   { id: 11, employee_name: "Rock Lee", employee_salary: 106454, employee_age: 27 },
];

app.get("/api/health", (req, res) => res.json({ ok: true }));


app.get("/api", (req, res) => {
  res.json({ employees });
});

app.get("/api/by_name/:qname", (req, res) => {
  const query = (req.params.qname || "").toLowerCase();
  const filtered = employees.filter((e) =>
    e.employee_name.toLowerCase().includes(query)
  );
  res.json({ employees: filtered });
});


app.get("/api/by_age/:start_age/:end_age", (req, res) => {
  const start = parseInt(req.params.start_age, 10);
  const end = parseInt(req.params.end_age, 10);

  const filtered = employees.filter((e) => e.employee_age >= start && e.employee_age <= end);
  res.json({ employees: filtered });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;v
