import { TodoDatabase } from '../data-layer/todo-database'
import { TodoFiles } from '../data-layer/todo-files'
import { getUserId } from '../lambda/utils'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import * as uuid from 'uuid'
import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todoDB = new TodoDatabase()
const todoFiles = new TodoFiles()


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

export async function updateTodo(event) {
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    const updateOperation = await todoDB.updateTodo(todoId, userId, updatedTodo)
    return updateOperation
}

export async function deleteTodo(event) {
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    return await todoDB.deleteTodo(todoId, userId)
}

export async function upload(event) {
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    const signedUrl = await todoFiles.getUploadURL(todoId)
    await todoDB.updateURL(todoId, userId)
    return signedUrl
}