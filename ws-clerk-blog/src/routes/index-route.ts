import { type Request, type Response, Router } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Post Auth Platform API",
  });
});

export { router as indexRoute };
