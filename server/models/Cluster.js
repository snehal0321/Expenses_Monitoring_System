import mongoose from "mongoose";

const clusterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  balance: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Cluster =
  mongoose.models.Cluster || mongoose.model("Cluster", clusterSchema);
export default Cluster;
