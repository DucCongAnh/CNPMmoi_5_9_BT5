require('dotenv').config(); //import các nguồn cần dùng
const express = require('express'); //commonjs
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/api');
const connection = require('./config/database'); // Sử dụng file cấu hình MySQL

const getHomepage = require('./controllers/homeController');
const cors = require('cors');

const app = express(); //cấu hình app là express
const port = process.env.PORT || 8888; //cấu hình port, nếu tìm thấy port trong env, không thì trả về 8888

app.use(cors()); //cấu hình cors
app.use(express.json()); //cấu hình req.body cho json
app.use(express.urlencoded({
  extended: true
})); //for form data

configViewEngine(app); //config template engine

//config route cho view ejs
const webAPI = express.Router();
webAPI.get("/", getHomepage);
app.use('/', webAPI); //khai báo route cho API

app.use('/v1/api', apiRoutes);

(async () => {
  try {
    //kết nối database using mysql
    await connection(); // Đã thay đổi để sử dụng hàm kết nối MySQL

    //lắng nghe port trong env
    app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();