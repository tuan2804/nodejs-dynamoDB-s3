const { getAllCars, addCar, deleteCar } = require('../models/carModel');

async function renderCarList(req, res) {
    try {
        const cars = await getAllCars();
        res.render('index', { cars });
    } catch (err) {
        console.error('Lỗi lấy dữ liệu từ DynamoDB:', err);
        res.send('Lỗi lấy dữ liệu!');
    }
}

async function handleAddCar(req, res) {
    const { id, name, type, price } = req.body;
    const parsedPrice = Number(price);

    if (!id || !name || !type || isNaN(parsedPrice) || parsedPrice <= 0 || !req.file) {
        return res.send('Dữ liệu không hợp lệ!');
    }

    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.file.key}`;
    const car = {
        carId: { S: id },
        name: { S: name },
        type: { S: type },
        price: { N: parsedPrice.toString() },
        image: { S: imageUrl }
    };

    try {
        await addCar(car);
        res.redirect('/');
    } catch (err) {
        console.error('Lỗi thêm dữ liệu vào DynamoDB:', err);
        res.send('Lỗi thêm dữ liệu!');
    }
}

async function handleDeleteCar(req, res) {
    const { carId } = req.body;
    if (!carId) {
        return res.send('Thiếu ID xe!');
    }
    try {
        await deleteCar(carId);
        res.redirect('/');
    } catch (err) {
        console.error('Lỗi xóa dữ liệu từ DynamoDB:', err);
        res.send('Lỗi xóa dữ liệu!');
    }
}

module.exports = { renderCarList, handleAddCar, handleDeleteCar };