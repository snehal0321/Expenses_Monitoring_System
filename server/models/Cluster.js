import mongoose from "mongoose";

const clusterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  balance: { type: Number, required: true },
  date: { type: Date, required: false },
});

const Cluster =
  mongoose.models.Cluster || mongoose.model("Cluster", clusterSchema);
export default Cluster;
