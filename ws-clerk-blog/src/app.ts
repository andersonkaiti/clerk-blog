import express, { type Application } from "express";
import cors from "cors";
import { indexRoute } from "./routes/index-route.ts";
import { postRoutes } from "./routes/post-routes.ts";
import { userRoutes } from "./routes/user-routes.ts";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", indexRoute);
app.use("/post", postRoutes);
app.use("/user", userRoutes);

export { app };
