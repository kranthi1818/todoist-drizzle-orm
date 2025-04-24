
import { taskCreation,getTasksAll,updateTaskStatus,deleteTaskById} from "../models/taskModel.js"

export async function createTask(req, res) {
  try {
    const { project_id, content, description, due_date ,is_completed} = req.body

    if (!project_id) {
      return res
        .status(400)
        .json({ error: "Project-ID is required mandatory" })
    }
    if(!description){
      return res
        .status(400)
        .json({ error: "description required" })
    }

    if ( !content || content.trim().length === 0) {
      return res.status(400).json({ error: "task cannot be empty and" });
    }

    const task = await taskCreation(project_id, content, description, due_date,is_completed)

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
  
}

export async function getAllTasks(req, res) {
  try {
    const tasks = await getTasksAll()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export async function updateTask(req, res) {
  try {
    const { id } = req.params
    const { description,content,project_id} = req.body

    if (!id) {
      return res.status(400).json({ msg: "task ID  is mandatory" });
    }
    
    if (isNaN(id)) {
      return res.status(400).json({ msg: "task ID should be a number" });
    }
    
    if (!project_id) {
      return res.status(400).json({ msg: "project ID for task  mandatory" });
    }

    if (isNaN(project_id)) {
      return res.status(400).json({ msg: "project id should be a number" });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ msg: "task content cannot be empty" });
    }

    const result = await updateTaskStatus(id,content,description,project_id)

    res.status(200).json(result)

  } catch (error) {

    res.status(500).json({ message: error.message })
  }

}


export async function deleteTask(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: "task id is required" })
  }

  if (isNaN(id)) {
    return res.status(400).json({ error: "task id must be a  number" })
  }

  try {
    const result = await deleteTaskById(id);
    res.status(200).json(result);

  } catch (error) {

    res.status(500).json({ message: error.message });
  }
}
