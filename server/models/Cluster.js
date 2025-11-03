import mongoose from "mongoose";

const clusterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  balance: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Cluster = mongoose.model("Cluster", clusterSchema);
export default Cluster;
