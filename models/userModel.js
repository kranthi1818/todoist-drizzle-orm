
import db from '../config/db.js';
import { users } from '../config/schema.js';
import { eq } from 'drizzle-orm';

export async function createUserInDB(name, email) {
  try {
    const result = await db.insert(users).values({ name, email }).returning()
    
    return result

  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
}

export async function getAllUsersFromDB() {
  try {
    const result = await db.select().from(users)

    return result

  } catch (err) {
    throw new Error('Failed to fetch users: ' + err.message);
  }
}

export async function getUserByIdFromDB(id) {
  try {
    const result = await db.select().from(users).where(eq(users.id, id))

    return result

  } catch (err) {
    throw new Error('Unable to fetch user: ' + err.message);
  }
}

export async function deleteUserByIdFromDB(id) {

  try {
   const result =   await db.delete(users).where(eq(users.id, Number(id)));

   if (result.changes === 0) {
    return { message: `no user found with ID ${id}` };
  }

  return { message: `user with ID ${id} deleted successfully` }

  } catch (err) {
    throw new Error('unable to delete user: ' + err.message);
  }
}

export async function deleteAllUsersFromDB() {
  try {
    await db.delete(users);

    return { message: 'All users deleted successfully' };

  } catch (err) {
    throw new Error('Deleting users failed: ' + err.message);
  }
}


