/* Kích hoạt .env */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express'; // gọi thư viện express
const server = express(); // dùng thư viện express tạo ra server

/* Cấu hình cors cho phép mọi nguồn call api */
import cors from 'cors';
server.use(cors());

/* Cấu hình req.body */
import bodyParser from 'body-parser';
server.use(bodyParser.json())

/* Gọi cấu hình routing và yêu cầu server bật /api với routing đó */
import routerConfig from './routes';
server.use('/api', routerConfig)

/* Gọi cấu hình views */
import viewConfig from './views';
server.use(viewConfig);


/* public folder domain/file */
server.use(express.static("public"));

/* Yêu cầu server lắng nghe tại cổng 3000 trên máy */
server.listen(process.env.PORT, () => {
    console.log("Server đã chạy tại port", process.env.PORT)
})