
import db from '../config/db.js'
import { tasks } from '../config/schema.js'
import { eq } from 'drizzle-orm'

export async function taskCreation(project_id, content, description, due_date,is_completed) {
  try {
    const result = await db.insert(tasks).values({
      project_id,
      content,
      description,
      due_date,
      is_completed
    }).returning()

    return result
    
  } catch (error) {
    throw new Error('task creation failed: ' + error.message)
  }
}

export async function getTasksAll() {
  try {
    const result = await db.select().from(tasks)

    return result

  } catch (error) {
    throw new Error('Failed to fetch tasks: ' + error.message)
  }
}

export async function getTaskById(id) {
  try {
    const result = await db.select().from(tasks).where(eq(tasks.id, id))

    return result
    
  } catch (error) {
    throw new Error('Unable to get the task: ' + error.message)
  }
}

export async function updateTaskStatus(id,content,description,project_id) {
  try {
    const result = await db.update(tasks)
      .set({content, description ,project_id})
      .where(eq(tasks.id, id)).returning()

    return result

  } catch (error) {
    throw new Error('Failed to update task: ' + error.message)
  }
}

export async function deleteTaskById(id) {
  try {
    const result = await db.delete(tasks).where(eq(tasks.id, id)).returning()

    return { message: 'Task deleted successfully'}

  } catch (error) {
    throw new Error('Failed to delete task: ' + error.message)
  }
}

