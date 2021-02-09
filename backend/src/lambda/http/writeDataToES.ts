// import * as elasticsearch from 'elasticsearch'
// import * as AWSES from 'http-aws-es'

// const client = new elasticsearch.Client({
//     host: "https://udacity-serverless:Htmko1206-1965@search-timon-dev-es-sn23hvbrylsbmnrd2uitjvxfam.us-east-2.es.amazonaws.com",
//     connectionClass: AWSES,
//     log: "error"
// })

exports.handler = function(event/*, callback*/) {
    console.log(JSON.stringify(event, null, 2));
    // event.Records.forEach(function(record) {
    //     try{
    //         if(record.eventName === "INSERT"){
    //             let result = client.create({
    //                 index: 'description',
    //                 type: 'todos',
    //                 id: record.dynamodb.NewImage.todoId.S,
    //                 body: {
    //                     id: record.dynamodb.NewImage.todoId.S,
    //                     name: record.dynamodb.NewImage.name.S,
    //                     description: record.dynamodb.NewImage.description.S
    //                 }
    //             })
    //             console.log(result)
    //         }
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // });
    // callback(null, "message");
};