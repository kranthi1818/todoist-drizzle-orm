import {
  createCommentInDB,
  getAllCommentsFromDB,
  getCommentsByIdFromDB,
  deleteCommentByIdFromDB,
  deleteAllCommentsFromDB,
  updateCommentInDB,
  allCommentsPerProject
} from "../models/commentsModel.js"

export async function createComment(req, res) {
  const { task_id, project_id, content } = req.body

  if (!task_id || !project_id || !content) {
    return res.status(400).json({ error: "All fields are required" })
  }

  if (isNaN(task_id)) {
    return res.status(400).json({ error: "task id must be a  number" })
  }
  if (isNaN(project_id)) {
    return res.status(400).json({ error: "Project id must be a  number" })
  }

  try {
    const result = await createCommentInDB(task_id, project_id, content)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getAllComments(req, res) {
  try {
    const allComments = await getAllCommentsFromDB()

    res.status(200).json(allComments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getCommentsById(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: "Comment ID is required" })
  }

  if (isNaN(id)) {
    return res.status(400).json({ error: " comment id must be a  number" })
  }

  try {
    const comment = await getCommentsByIdFromDB(id)

    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function updateComment(req, res) {
  const { id } = req.params
  const { content } = req.body

  if (!id || !content) {
    return res.status(400).json({ error: "Both id and content are required" })
  }

  if (isNaN(id)) {
    return res.status(400).json({ error: "comment id must be a  number" })
  }

  try {
    const result = await updateCommentInDB(id, content)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function deleteCommentsById(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: "id required" })
  }

  if (isNaN(id)) {
    return res.status(400).json({ error: "comment id must be a  number" })
  }

  try {
    const result = await deleteCommentByIdFromDB(id)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function deleteAllComments(req, res) {
  try {
    const result = await deleteAllCommentsFromDB()

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getAllCommentsPerProject(req, res) {
  const { projectId } = req.params

  if (!projectId) {
    return res.status(400).json({ error: "projectId is required" })
  }

  if (isNaN(projectId)) {
    return res.status(400).json({ error: "project id  must be a  number" })
  }

  try {

    const result = await allCommentsPerProject(projectId)
    res.status(200).json(result)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


