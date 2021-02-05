import { TodoDatabase } from '../data-layer/todo-database'
import { getUserId } from '../lambda/utils'

const todoDB = new TodoDatabase()


export async function getTodos(event) {
    const userId = getUserId(event)

    return await todoDB.getTodos(userId)
}