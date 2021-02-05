import 'source-map-support/register'
import { getTodos } from "../../business-logic/todos-logic"

import { /*APIGatewayProxyEvent,*/ APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  const items = await getTodos()
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items
    })
  }
}
