
import db from '../config/db.js';
import { tasks } from '../config/schema.js';
import { eq } from 'drizzle-orm';

export async function taskCreation(project_id, content, description, due_date) {
  try {
    const result = await db.insert(tasks).values({
      project_id,
      content,
      description,
      due_date
    });

    const id = result[0]?.id;

    return { id, project_id, content, description, due_date };
  } catch (error) {
    throw new Error('Task creation failed: ' + error.message);
  }
}

export async function getTasksAll() {
  try {
    const result = await db.select().from(tasks);
    return result;
  } catch (error) {
    throw new Error('Failed to fetch tasks: ' + error.message);
  }
}

export async function getTaskById(id) {
  try {
    const result = await db.select().from(tasks).where(eq(tasks.id, id));

    if (result.length === 0) {
      throw new Error(`Task with id ${id} not found`);
    }

    return result[0];
  } catch (error) {
    throw new Error('Unable to get the task: ' + error.message);
  }
}

export async function updateTaskStatus(id, is_completed, content, description) {
  try {
    const result = await db.update(tasks)
      .set({ is_completed, content, description })
      .where(eq(tasks.id, id));

    if (result.count === 0) {
      throw new Error(`Task with id ${id} not found`);
    }

    return { message: 'Updated task successfully' };
  } catch (error) {
    throw new Error('Failed to update task: ' + error.message);
  }
}

export async function deleteTaskById(id) {
  try {
    const result = await db.delete(tasks).where(eq(tasks.id, id));

    if (result.rowsAffected === 0) {
      throw new Error(`Task with id ${id} not found`);
    }

    return { message: 'Task deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete task: ' + error.message);
  }
}

