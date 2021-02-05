import * as AWS from 'aws-sdk'

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
}