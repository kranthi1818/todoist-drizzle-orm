import db from '../config/db.js';
import { comments } from '../config/schema.js';

export async function createCommentInDB(user_id, task_id, project_id, content) {
  try {
    const result = await db.insert(comments).values({
      user_id,
      task_id,
      project_id,
      content
    });

    const id = result[0]?.id;

    return { id, user_id, task_id, project_id, content };
  } catch (error) {
    throw new Error('Unable to create the comment: ' + error.message);
  }
}

export async function getAllCommentsFromDB() {
  try {
    const result = await db.select().from(comments);
    return result;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Unable to fetch the comments: " + error.message);
  }
}

export async function getCommentsByIdFromDB(id) {
  try {
    const result = await db.select().from(comments).where(comments.id.equals(id));
    if (result.length === 0) {
      throw new Error(`Comment with id ${id} not found`);
    }
    return result[0];
  } catch (error) {
    throw new Error('Unable to get the comment: ' + error.message);
  }
}

export async function deleteCommentByIdFromDB(id) {
  try {
    const result = await db.delete().from(comments).where(comments.id.equals(id));
    if (result.count === 0) {
      throw new Error(`Comment with id ${id} not found`);
    }
    return { message: `Comment with id ${id} deleted successfully` };
  } catch (error) {
    throw new Error('Unable to delete the comment: ' + error.message);
  }
}

export async function deleteAllCommentsFromDB() {
  try {
    const result = await db.delete().from(comments);
    return { message: 'All comments deleted successfully' };
  } catch (error) {
    throw new Error('Unable to delete all comments: ' + error.message);
  }
}

export async function updateCommentInDB(id, content) {
  try {
    const result = await db.update(comments).set({ content }).where(comments.id.equals(id));
    if (result.count === 0) {
      throw new Error(`Comment with id ${id} not found`);
    }
    return { message: `Updated comment with id ${id} successfully` };
  } catch (error) {
    throw new Error('Unable to update the comment: ' + error.message);
  }
}

export async function getAllCommentsFromUserDB(userId) {
  try {
    const result = await db.select().from(comments).where(comments.user_id.equals(userId));
    return result;
  } catch (error) {
    throw new Error('Unable to get comments for user: ' + error.message);
  }
}

export async function getAllCommentsPerTaskDB(projectId, taskId) {
  try {
    const result = await db.select().from(comments).where(comments.project_id.equals(projectId)).andWhere(comments.task_id.equals(taskId));
    return result;
  } catch (error) {
    throw new Error('Unable to get comments for task: ' + error.message);
  }
}
