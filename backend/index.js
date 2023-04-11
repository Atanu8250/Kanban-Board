const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();


const app = express();

app.use(express.json())

app.use("/", authRouter);

app.listen(process.env.PORT, async () => {
     try {
          console.log(`✅ Server started at : http://lochost:${process.env.PORT}`);
          console.log('⏳ Database connecting...')
          await connectDB;
          console.log('✅ Database Connected')
     } catch (error) {
          console.log('❌ error:', error.message);
     }
})