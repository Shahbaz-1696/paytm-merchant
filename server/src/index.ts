import express from "express";
import { userRouter } from "./routes/user";
import { merchantRouter } from "./routes/merchant";

const app = express();

app.use(express.json());

app.use("/api/vi/user", userRouter);

app.use("/api/v1/merchant", merchantRouter);

app.listen(3000, function () {
  console.log("Server started running on port 3000");
});
