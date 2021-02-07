import * as AWS from 'aws-sdk'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

export class TodoDatabase {
    constructor(
        private readonly docClient = new AWS.DynamoDB.DocumentClient(),
        private readonly todoTable = process.env.TODO_TABLE,
        private readonly index = process.env.INDEX_NAME) {
    }

    async getTodos(userId: String) {
        console.log('Getting todos')
    
        const result = await this.docClient.query({
          TableName: this.todoTable,
          IndexName: this.index,
          KeyConditionExpression: "userId = :u",
          ExpressionAttributeValues: {
            ":u": userId
          }
        }).promise()
        return result.Items
    }

    async createTodo(item: TodoItem): Promise<TodoItem> {
      await this.docClient.put({
        TableName: this.todoTable,
        Item: item
      }).promise()
      return item
    }

    async updateTodo(todoId: String, userId: String, updatedTodo: TodoUpdate) {
      try {
        return await this.docClient.update({
          TableName: this.todoTable,
          Key: {
            todoId: todoId,
            userId: userId
          },
          UpdateExpression: "set #namefield = :name, dueDate=:dueDate, done=:done",
          ConditionExpression: 'attribute_exists(userId)',
          ExpressionAttributeValues: {
            ":name": updatedTodo.name,
            ":dueDate": updatedTodo.dueDate,
            ":done": updatedTodo.done
          },
          ExpressionAttributeNames: {
            "#namefield": "name"
          },
          ReturnValues: "UPDATED_NEW"
        }).promise()
      } catch (err) {
          return {
            body: "No such item"
          }
      }
    }

    async getTodo(todoId: String) {
      const result = await this.docClient
        .query({
          TableName: this.todoTable,
          KeyConditionExpression: 'todoId = :todoId',
          ExpressionAttributeValues:{
            ':todoId': todoId
          }
        })
        .promise()
      return result.Items
  }

  async deleteTodo(todoId: String, userId: String) {
    return await this.docClient.delete({
      TableName: this.todoTable,
      Key: {
        todoId: todoId,
        userId: userId
      }
    }).promise()
  }

  async updateURL(todoId: String, userId: String) {
    return await this.docClient.update({
      TableName: this.todoTable,
      Key: {
        todoId: todoId,
        userId: userId
      },
      UpdateExpression: "set attachmentUrl = :signedUrl",
      ExpressionAttributeValues: {
        ":signedUrl": "https://timon-todo-s3bucket-dev.s3.amazonaws.com/" + todoId
      },
      ReturnValues: "UPDATED_NEW"
    }).promise()
  }
}