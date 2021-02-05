import * as AWS from 'aws-sdk'

export class TodoDatabase {
    constructor(
        private readonly docClient = new AWS.DynamoDB.DocumentClient(),
        private readonly todoTable = process.env.TODO_TABLE,
        private readonly index = process.env.INDEX_NAME) {
    }

    async getTodos() {
        console.log('Getting todos')
    
        const result = await this.docClient.query({
          TableName: this.todoTable,
          IndexName: this.index,
          KeyConditionExpression: "userId = :u",
          ExpressionAttributeValues: {
            ":u": '688'
          }
        }).promise()
        return result.Items
      }
}