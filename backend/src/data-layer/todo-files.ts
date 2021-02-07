
import * as AWS  from 'aws-sdk'

export class TodoFiles {

    constructor(
        private readonly s3= new AWS.S3({
            signatureVersion: 'v4'
        }), private readonly bucketName = process.env.S3_BUCKET) {
    }
    async getUploadURL(todoId: String) {
        const signedUrl = this.s3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Key: todoId,
            Expires: 300
        })
        return signedUrl
    }
}