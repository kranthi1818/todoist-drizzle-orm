import db from '../config/db.js'
import { projects } from '../config/schema.js';
import { eq } from 'drizzle-orm'

export async function projectCreation(user_id,name, color, is_favorite) {
  try {
    const result = await db.insert(projects).values({
      user_id,
      name,
      color,
      is_favorite
    }).returning();

    return result

  } catch (error) {
    throw new Error("Failed to create project in DB: " + error.message);
  }
}


  export async function getProjectsAll() {
    try {
      const result = await db.select().from(projects);
      return result; 
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error("Unable to fetch the projects: " + error.message);
    }
  }
  
  export async function projectById(id) {
    try {
      const result = await db.select().from(projects).where(eq(projects.id, id));
  
      return result

    } catch (error) {
      throw new Error('Unable to get the project: ' + error.message);
    }
  }

  export async function projectDeleting(id) {
    try {
      const result = await db.delete(projects).where(eq(projects.id, id));
  
      return { message: `Project with id ${id} Deleted Successfully` }

    } catch (error) {
      throw new Error('unable to delete the project: ' + error.message);
    }
  }

  export async function allProjectsDelete() {
    try {
      const result = await db.delete(projects)

      return { message: 'All Projects Deleted Successfully' }

    } catch (error) {
      throw new Error('Deleting Projects Failed: ' + error.message);
    }
  }


