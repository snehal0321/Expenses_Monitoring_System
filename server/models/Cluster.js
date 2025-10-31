import mongoose from "mongoose";

const clusterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  balance: { type: Number, required: true },
});

const Cluster = mongoose.model("Cluster", clusterSchema);
export default Cluster;
