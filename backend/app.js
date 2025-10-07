import express, { json } from "express";
import dotenv from 'dotenv';
import productRoutes from "./routes/product-routes.js";
import cors from "cors";
import path from "path";
//import { createProductTable } from "./models/Product.js";
dotenv.config();

const app = express();
app.use(express.json());/* allows us to accept json data in the request body (in req.body). Without this
you won't be able to do this "const { name, price, image } = req.body" */
app.use(cors());
console.log("Starting backend server...")

const __dirname = path.resolve();

app.use("/api/product", productRoutes);

//making the frontend and backend to run on the same port
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

const APP_PORT = process.env.APP_PORT || 5000;
//npm install cross-env --save-dev

app.listen(APP_PORT, ()=>{
   //createProductTable();
    console.log("Server running at http://localhost:" + APP_PORT);
});

// process.on('uncaughtException', (err) => {
//   console.error("Uncaught Exception:", err);
// });

// process.on('unhandledRejection', (reason) => {
//   console.error("Unhandled Rejection:", reason);
// });
