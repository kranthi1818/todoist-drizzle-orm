
import express from "express"

import {
  createComment,
  getAllComments,
  getCommentsById,
  deleteCommentsById,
  deleteAllComments,
  updateComment,
  getAllCommentsPerProject
} from "../controllers/commentsController.js"

const router = express.Router()

router.post("/comments", createComment)

router.get("/comments", getAllComments)

router.get("/comments/project/:projectId",getAllCommentsPerProject)

router.get("/comments/:id", getCommentsById)

router.delete("/comments/:id", deleteCommentsById)

router.delete("/comments", deleteAllComments)

router.put("/comments/:id", updateComment)


export default router




