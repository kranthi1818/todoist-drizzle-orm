import {
  projectCreation,
  getProjectsAll,
  projectDeleting,
  allProjectsDelete,
  projectById,
} from "../models/projectModel.js"

export async function createProject(req, res) {
  try {
    const { user_id, name, color, is_favourite } = req.body

    if (!name) {
      return res.status(400).json({ error: "project name is required" })
    }

    if (!color) {
      return res.status(400).json({ error: "project color is required" })
    }

    const isFavouriteValue = Number(is_favourite)

    if (![0, 1].includes(isFavouriteValue)) {
      return res.status(400).json({ error: "Invalid is_favourite value" })
    }

    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ error: "correct user_id required" })
    }

    let project = await projectCreation(user_id, name, color, is_favourite)

    res.status(201).json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export async function getAllProjects(req, res) {
  try {
    let projects = await getProjectsAll()

    res.status(200).json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    res.status(400).json({ message: error.message || error })
  }
}

export async function getProjectById(req, res) {
  const { id } = req.params

  try {
    if (!id) {
      return res.status(400).json({ error: "project id is required" })
    }

    if (isNaN(id)) {
      return res.status(404).json({ error: "Please provide project id as number" })
    }

    let project = await projectById(id)

    res.status(200).json(project)

  } catch (error) {
    res.status(400).json({ message: error.message || error })
  }
}

export async function deleteProject(req, res) {
  const { id } = req.params
  try {

    if (!id) {
      return res.status(400).json({ error: "project id is required" })
    }

    if (isNaN(id)) {
      return res.status(404).json({ error: "Please provide id as number" })
    }

    let project = await projectDeleting(id)

    res.status(200).json(project)

  } catch (error) {
    res.status(400).json({ message: error.message || error })
  }
}

export async function deleteAllProjects(req, res) {
  try {

    let data = await allProjectsDelete()

    res.status(200).json(data)

  } catch (error) {
    res.status(400).json({ message: error.message || error })
  }
}


