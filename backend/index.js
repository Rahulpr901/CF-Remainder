const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./model/student"); // Import the Student model

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/student_dashboard";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes

app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: "Error saving student", error: err });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err });
  }
});
app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err });
  }
});

// PUT (update) a student
app.put("/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: "Error updating student", error: err });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
