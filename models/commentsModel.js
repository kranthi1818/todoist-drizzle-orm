import db from "../config/db.js"
import { comments } from "../config/schema.js"
import { eq } from "drizzle-orm"

export async function createCommentInDB(task_id, project_id, content) {
  try {
    const result = await db
      .insert(comments)
      .values({
        task_id,
        project_id,
        content,
      })
      .returning()

    return result

  } catch (error) {
    throw new Error("unable to create the comment: " + error.message)
  }
}

export async function getAllCommentsFromDB() {
  try {
    const result = await db.select().from(comments)

    return result

  } catch (error) {
    throw new Error("unable to get all the comments: " + error.message)
  }
}

export async function getCommentsByIdFromDB(id) {
  try {
    const result = await db.select().from(comments).where(eq(comments.id, id))

    return result

  } catch (error) {
    throw new Error("unable to get the comment: " + error.message)
  }
}

export async function updateCommentInDB(id, content) {
  try {
    const result = await db
      .update(comments)
      .set({ content })
      .where(eq(comments.id, id)).returning()

    return result

  } catch (error) {
    throw new Error("unable to update the comment: " + error.message)
  }
}

export async function allCommentsPerProject(id) {
  try {

    const result =  await db
      .select()
      .from(comments)
      .where(eq(comments.project_id, id))

      return result

  } catch (error) {
    throw new Error("unable to get the comment: " + error.message)

  }
}

export async function deleteCommentByIdFromDB(id) {
  try {

      await db.delete(comments).where(eq(comments.id, id))

    return { message: `Comment with ID ${id} deleted successfully`};

  } catch (error) {

    throw new Error("unable to get the comment: " + error.message)
  }
}

export async function deleteAllCommentsFromDB() {
  try {

    await db.delete().from(comments)

    return { mesaage:'All Comments Deleted Successfully' }

  } catch (error) {
    return { sucess: false }
  }
}
