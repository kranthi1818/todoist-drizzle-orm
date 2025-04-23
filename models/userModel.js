
import db from '../config/db.js'
import { users } from '../config/schema.js';


export async function createUserInDB(name, email) {
    console.log("name: ", name);
    console.log("email: ", email);
    try {
        
      const inserted = await db.insert(users).values({ name, email});
  
      return inserted[0]
    } catch (err) {
        console.log("kkkkk");
        
      throw new Error('Error creating users: ' + err.message);
    }
  }


export async function getAllUsersFromDB() {
    try {
      const allUsers = await db.select().from(users);
      return allUsers;
    } catch (err) {
      throw new Error("Failed to fetch users: " + err.message);
    }
  }

  export async function getUserByIdFromDB(id) {
    const user = await db.select().from(users).where(eq(users.id, Number(id)));
  
    if (user.length === 0) {
      throw new Error(`User with id ${id} not found`);
    }
  
    return user[0];
  }

  export async function deleteUserByIdFromDB(id) {
    const result = await db.delete(users).where(eq(users.id, Number(id)));
  
    if (result.rowsAffected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
  
    return { message: `User with id ${id} is deleted` };
  }


  export async function deleteAllUsersFromDB() {
    await db.delete(users);
    return { message: "All users deleted successfully" };
  }