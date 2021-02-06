import { TodoDatabase } from '../data-layer/todo-database'
import { getUserId } from '../lambda/utils'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import * as uuid from 'uuid'
import { TodoItem } from '../models/TodoItem'

const todoDB = new TodoDatabase()


export async function getTodos(event) {
    const userId = getUserId(event)

    return await todoDB.getTodos(userId)
}

export async function createTodo(event) {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const userId = getUserId(event)
    const itemId = uuid.v4()
    const createdAt = new Date()

    const newItem: TodoItem = {
        todoId: itemId,
        userId: userId,
        done: false,
        createdAt: createdAt.toString(),
        ...newTodo
    }
    await todoDB.createTodo(newItem)
    return newItem
}