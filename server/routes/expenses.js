import express from "express";
import Expense from "../models/Expense.js";
import Cluster from "../models/Cluster.js";

const router = express.Router();

// GET all expenses
router.get("/:clustertype", async (req, res) => {
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
    const { title, amount, date, cluster } = req.body;

    if (!title || !amount || !date || !cluster) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newExpense = new Expense({
      title,
      amount,
      date: new Date(date),
      cluster,
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
    const { title, balance } = req.body;

    if (!title || !balance) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCluster = new Cluster({
      title,
      balance,
    });

    const savedCluster = await newCluster.save();
    res.status(201).json(savedCluster);
  } catch (err) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

router.get("/cluster/find", async (req, res) => {
  try {
    const cluster = await Cluster.find().sort({ balance: -1 });
    res.json(cluster);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

export default router;
