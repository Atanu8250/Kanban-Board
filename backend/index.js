const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRouter = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
     res.send("Welcome to Kanban-board's API Home page...")
})

app.use("/", authRouter);

app.listen(process.env.PORT ?? 8080, async () => {
     try {
          console.log(`✅ Server started at : http://localhost:${process.env.PORT ?? 8080}`);
          console.log('⏳ Database connecting...')
          await connectDB;
          console.log('✅ Database Connected')
     } catch (error) {
          console.log('❌ error:', error.message);
     }
})