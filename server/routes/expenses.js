import express from "express";
import Expense from "../models/Expense.js";
import Cluster from "../models/Cluster.js";
import Login from "../models/Login.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// GET all expenses
router.get("/:clusterType", async (req, res) => {
  const { clusterType } = req.params;
  try {
    const expenses = await Expense.find({ cluster: clusterType }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// POST a new expense
router.post("/save", async (req, res) => {
  try {
    const { title, amount, date, cluster, user } = req.body;

    if (!title || !amount || !date || !cluster) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newExpense = new Expense({
      title,
      amount,
      date: new Date(date),
      cluster,
      user,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/cluster/save", async (req, res) => {
  try {
    const { title, balance, user } = req.body;
    const date = new Date(); // ✅ correct way

    if (!title || !balance) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCluster = new Cluster({
      title,
      balance,
      date,
      user,
    });

    const savedCluster = await newCluster.save();
    res.status(201).json(savedCluster);
  } catch (err) {
    console.error("Error saving cluster:", err);
    res.status(500).json({ error: "Failed to add expense" });
  }
});
router.get("/cluster/find", async (req, res) => {
  try {
    const cluster = await Cluster.find().sort({ date: -1 });
    res.json(cluster);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;
    console.log("Login request body:", user, password);

    if (!user || !password) {
      return res.status(400).json({ error: "User and password are required" });
    }

    const foundUser = await Login.findOne({ user });
    if (!foundUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Simple password check (plain text)
    if (foundUser.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: foundUser._id, user: foundUser.user },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // expires in 1 hour
    );

    res.status(200).json({
      message: "Login successful",
      user: foundUser.user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

export default router;
