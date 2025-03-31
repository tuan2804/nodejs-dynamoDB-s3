const { DynamoDBClient, PutItemCommand, ScanCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb');

const dynamoDB = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const tableName = process.env.DYNAMODB_TABLE_NAME;

async function getAllCars() {
    const params = { TableName: tableName };
    const data = await dynamoDB.send(new ScanCommand(params));
    return data.Items.sort((a, b) => {
        const idA = isNaN(a.carId.S) ? a.carId.S : Number(a.carId.S);
        const idB = isNaN(b.carId.S) ? b.carId.S : Number(b.carId.S);
        return idA - idB;
    });
}

async function addCar(car) {
    const params = new PutItemCommand({ TableName: tableName, Item: car });
    await dynamoDB.send(params);
}

async function deleteCar(carId) {
    const params = new DeleteItemCommand({
        TableName: tableName,
        Key: { carId: { S: carId } }
    });
    await dynamoDB.send(params);
}

module.exports = { getAllCars, addCar, deleteCar };