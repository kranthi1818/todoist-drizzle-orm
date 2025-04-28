import {
  getAllUsersFromDB,
  createUserInDB,
  getUserByIdFromDB,
  deleteUserByIdFromDB,
  deleteAllUsersFromDB,
  findUserByEmailFromDB,
} from "../models/userModel.js"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config()

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await findUserByEmailFromDB(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET,            
      { expiresIn: process.env.JWT_EXPIRES_IN } 
    );

    res.status(200).json({
      message: "Login successful",
      token
    })

  } catch (error) {
    console.log(error);
     
    res.status(500).json({ error: error.message });
  }
}


export async function createUser(req, res) {
  const { name, email,password } = req.body
  
  if (!name) {
    return res.status(400).json({ error: "user name is required" })
  }

  if (!email) {
    return res.status(400).json({ error: "user email is required" })
  }
  if (!password) {
    return res.status(400).json({ error: "password is required" })
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await createUserInDB(name, email,hashedPassword)

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
