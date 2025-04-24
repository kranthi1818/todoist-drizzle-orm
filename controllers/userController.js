import {
  getAllUsersFromDB,
  createUserInDB,
  getUserByIdFromDB,
  deleteUserByIdFromDB,
  deleteAllUsersFromDB,
} from "../models/userModel.js"

export async function createUser(req, res) {
  const { name, email } = req.body
  
  if (!name) {
    return res.status(400).json({ error: "user name is required" })
  }

  if (!email) {
    return res.status(400).json({ error: "user email is required." })
  }

  try {
    const result = await createUserInDB(name, email)

    res.status(201).json(result)

  } catch (error) {
   
    if (error.message.includes("UNIQUE constraint failed")) {
      return res.status(409).json({ error: "Email already exists." })
    }

    res.status(500).json({ error: error.message })
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await getAllUsersFromDB()

    res.status(200).json(users)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getUserById(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: "user id is required" })
  }

  if (isNaN(id)) {
    return res.status(400).json({ error: "user id must be a  number" })
  }
  
  try {
    const user = await getUserByIdFromDB(id)

    res.status(200).json(user)

  } catch (error) {

    res.status(500).json({ error: error.message })
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: "user id is required" })
  }

  if (isNaN(id)) {
    return res.status(400).json({ error: "user id must be a  number" })
  }

  try {
    const result = await deleteUserByIdFromDB(id)

    res.status(200).json(result)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function deleteAllUsers(req, res) {
  try {
    const result = await deleteAllUsersFromDB()

    res.status(200).json(result)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
