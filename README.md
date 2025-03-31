# OnThiTest

## Cài đặt dự án

Chạy lệnh sau để cài đặt các dependencies:

```sh
npm install @aws-sdk/client-dynamodb @aws-sdk/client-s3 aws-sdk body-parser dotenv ejs express express-session multer multer-s3 nodemon
```

## Import các thư viện trong dự án

Dưới đây là cách import các thư viện được sử dụng trong dự án:

```js
// Load environment variables từ file .env
require('dotenv').config();

// Import các thư viện cần thiết
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { S3Client } = require('@aws-sdk/client-s3');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const ejs = require('ejs');
```

## Khởi động dự án

Sử dụng lệnh sau để chạy dự án với **nodemon**:

```sh
npm start
```

Hoặc chạy thủ công:

```sh
node index.js
```
