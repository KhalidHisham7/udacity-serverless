import * as elasticsearch from 'elasticsearch'

const client = new elasticsearch.Client({
    host: "https://username:pw@search-timon-dev-ztcdorjuka4lwb75sz72h4qoly.us-east-2.es.amazonaws.com",
    log: "error"
})

exports.handler = function(event/*, callback*/) {
    console.log(JSON.stringify(event, null, 2));
    event.Records.forEach(function(record) {
        try{
            if(record.eventName === "INSERT"){
                let result = client.create({
                    index: 'description',
                    type: 'todos',
                    id: record.dynamodb.NewImage.todoId.S,
                    body: {
                        id: record.dynamodb.NewImage.todoId.S,
                        name: record.dynamodb.NewImage.name.S,
                        description: record.dynamodb.NewImage.description.S
                    }
                })
                console.log(result)
            }
            else if(record.eventName === "REMOVE"){
                let result = client.delete({
                    index: 'description',
                    id: record.dynamodb.OldImage.todoId.S,
                })
                console.log(result)
            }
            else if(record.eventName === "MODIFY"){
                let result = client.update({
                    id: record.dynamodb.NewImage.todoId.S,
                    index: 'description',
                    type: 'todos',
                    body: {
                        doc: {
                            name: record.dynamodb.NewImage.name.S,
                            description: record.dynamodb.NewImage.description.S  
                        }            
                    }
                })
                console.log(result)
            }
        }
        catch(err){
            console.log(err);
        }
    });
};