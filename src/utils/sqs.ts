import AWS from 'aws-sdk';

const sqs = new AWS.SQS({ region: 'us-east-1' });

export const sendMessage = (queueUrl: string, messageBody: string) => {
  return sqs.sendMessage({
    QueueUrl: queueUrl,
    MessageBody: messageBody,
  }).promise();
};

export const receiveMessages = (queueUrl: string) => {
  return sqs.receiveMessage({
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20,
  }).promise();
};
