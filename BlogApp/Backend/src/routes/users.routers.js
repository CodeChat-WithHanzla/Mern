import { Router } from "express";

const router = Router();
router.get("/test", (req_, res) => {
  res.json({ message: "New Api created" });
});
export default router;
