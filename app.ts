import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import errorHandler from "./middleware/errorHandler";
import userRoute from "./routes/user.route";
import courseRoute from "./routes/course.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);
app.use("/api", userRoute);
app.use("/api", courseRoute);

export default app;
