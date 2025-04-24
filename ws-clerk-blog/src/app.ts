import express, { type Application } from "express";
import cors, { CorsOptions } from "cors";
import { indexRoute } from "./routes/index-route.ts";
import { postRoutes } from "./routes/post-routes.ts";
import { userRoutes } from "./routes/user-routes.ts";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions: CorsOptions = {
  origin: ["http://localhost:3000", "https://anderson-clerk-blog.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/", indexRoute);
app.use("/post", postRoutes);
app.use("/user", userRoutes);

export { app };
