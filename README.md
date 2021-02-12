# Serverless TODO

This project simply creates, updates and deletes TODO items.
# Features
###### Create TODO (Gets writted to ES)
###### Update TODO (Update gets channelled to ES)
###### Delete TODO (Reflected to ES)
###### List TODO
###### Upload images and associate them with TODO items

# Functionality of the application

This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.
- All TODO items are synced to an elasticsearch server in order for the admins of the system to easily find patterns and analyze data

# TODO items

The application should store TODO items, and each TODO item contains the following fields:

* `todoId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `name` (string) - name of a TODO item (e.g. "Change a light bulb")
* `description` (string) - description of TODO item (e.g. "First I need to get a new light bulb, then I will need to remove the old one...")
* `dueDate` (string) - date and time by which an item should be completed
* `done` (boolean) - true if an item was completed, false otherwise
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a TODO item

You might also store an id of a user who created a TODO item.

# What's new
Upon creating, updating and deleting TODO items they get synced to Elasticsearch in order to help system owners search long text data (description) easily and analyze the results
* This is done not using simple functions, it is implemented using events on data streams (DynamoDB streams), upon new events in dynamodb the writeToES function is triggered and deals with the event as it needs (create, update or delete)

# Validating the Elasticsearch flow
* You will need to visit this URL [Kibana link] (https://search-timon-dev-ztcdorjuka4lwb75sz72h4qoly.us-east-2.es.amazonaws.com/_plugin/kibana/)
* Then login using the provided username and password, and search for index "description" to check for data

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless TODO application.

# Future work
* Add event to compress image size when uploaded to S3 and save them in a new bucket
* Search through TODO items using ES index