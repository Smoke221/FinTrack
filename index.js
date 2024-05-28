const express = require("express");
const { tRouter } = require("./routes/transactionRoutes");
const { bRouter } = require("./routes/budgetRoutes");
const { cRouter } = require("./routes/categoryRoutes");
const { rRouter } = require("./routes/reportRoutes");
const { userRouter } = require("./routes/userRoute");
const { authenticate } = require("./middlewares/auth");

require("dotenv").config();
const app = express();
app.use(express.json());

app.use("/", (req,res) => {
  res.send(`
    <h1>Welcome to FinTrack</h1>
    <p>Your personal finance companion</p>
    <p>Effortlessly track your expenses on the go, making financial management a breeze!</p>
  `);
})

app.use("/auth", userRouter)

app.use(authenticate);

app.use("/transactions", tRouter);
app.use("/budgets", bRouter);
app.use("/categories", cRouter);
app.use("/reports", rRouter);

app.listen(process.env.PORT, () => {
  console.log(` Server is running here --> http://localhost:${process.env.PORT}`);
});
