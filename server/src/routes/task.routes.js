import { Router } from "express";
import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").put(toggleTask).delete(deleteTask);

export default router;