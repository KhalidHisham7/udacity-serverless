import { TodoDatabase } from '../data-layer/todo-database'


const todoAccess = new TodoDatabase()


export async function getTodos() {
    return await todoAccess.getTodos()
}