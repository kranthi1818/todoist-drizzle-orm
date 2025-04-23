import db from '../config/db.js'
import { projects } from '../config/schema.js';

export async function projectCreation(name, color, is_favorite) {
    const result = await db.insert(projects).values({
      name,
      color,
      is_favorite: is_favorite ? 1 : 0,
    });
  
    const id = result[0]?.id; 
  
    return { id, name, color, is_favorite };
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
      const result = await db.select().from(projects).where(projects.id.equals(id));
      if (result.length === 0) {
        throw new Error(`Project with id ${id} not found`);
      }
      return result[0];
    } catch (error) {
      throw new Error('Unable to get the project: ' + error.message);
    }
  }

  export async function projectDeleting(id) {
    try {
      const result = await db.delete().from(projects).where(projects.id.equals(id));
      if (result.count === 0) {
        throw new Error(`Project with id ${id} not found`);
      }
      return { message: `Project with id ${id} Deleted Successfully` };
    } catch (error) {
      throw new Error('Unable to delete the project: ' + error.message);
    }
  }

  export async function allProjectsDelete() {
    try {
      const result = await db.delete().from(projects);
      return { message: 'All Projects Deleted Successfully' };
    } catch (error) {
      throw new Error('Deleting Projects Failed: ' + error.message);
    }
  }