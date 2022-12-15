import express from "express";
import connectDB from "./configs/database.js";
import path from "path";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import originPortRoutes from "./routes/originPortRoutes.js";
import destinationPortRoutes from "./routes/destinationPortRoutes.js";
import transportRoutes from "./routes/transportRoutes.js";
import commodityRoutes from "./routes/commodityRoutes.js";
import consigneeRoutes from "./routes/consigneeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import shipperRoutes from "./routes/shipperRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/origin-ports", originPortRoutes);
app.use("/api/destination-ports", destinationPortRoutes);
app.use("/api/transports", transportRoutes);
app.use("/api/commodities", commodityRoutes);
app.use("/api/consignees", consigneeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/shippers", shipperRoutes);
app.use("/api/transactions", transactionRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

let port = process.env.PORT;
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} on PORT ${port}`.yellow.bold
  );
});
