const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');

const app = express();
app.use(cors());
app.use(express.json());

// Configure the AWS SDK
AWS.config.update({
  region: 'us-east-1', // Replace with your DynamoDB region
});

// Create a DynamoDB client
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Replace 'your-table-name' with your actual table name
const tableName = 'Students';

// Function to read all data from the DynamoDB table
async function readAllData() {
  const params = {
    TableName: tableName,
  };

  try {
    const data = await dynamodb.scan(params).promise();
    // console.log(data);
    return data.Items;
  } catch (error) {
    console.error('Error reading data:', error);
  }
}

// const students = [
//   {
//     name: "Alice",
//     email: "alice@miu.edu",
//     id: "S100"
//   },
//   {
//     name: "Bob",
//     email: "bob@miu.edu",
//     id: "S101"
//   },
//   {
//     name: "Carol",
//     email: "carol@miu.edu",
//     id: "S102"
//   },
//   {
//     name: "David",
//     email: "david@miu.edu",
//     id: "S103"
//   },
//   {
//     name: "Eve",
//     email: "eve@miu.edu",
//     id: "S104"
//   },
//   {
//     name: "Frank",
//     email: "frank@miu.edu",
//     id: "S105"
//   },
//   {
//     name: "Grace",
//     email: "grace@miu.edu",
//     id: "S106"
//   },
//   {
//     name: "Hank",
//     email: "hank@miu.edu",
//     id: "S107"
//   },
//   {
//     name: "Ivy",
//     email: "ivy@miu.edu",
//     id: "S108"
//   },
//   {
//     name: "Jack",
//     email: "jack@miu.edu",
//     id: "S109"
//   }
// ];


app.get('/health', async (req, res) => {
  res.send("I am OK.");
});

app.get('/students', async (req, res) => {
  res.send(await readAllData());
});


const port = 5000;
app.listen(port, () => console.log(`Listening on ${port}`));