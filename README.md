# to-do-app
CRUD Work App

<h3>Yêu cầu</h3>
- Cài đặt npm install / redis server

Version 1.0
- Back-end: Nodejs/ExpressJs/Lowdb - {start-server: ~/backend/nodemon index}
- Front-end: React - {start-server: ~/frontend/npm start}
+ Chức năng cơ bản của App:
- Hiển thị danh sách công việc từ Database/ Phân trang hiển thị (Mỗi trang 10 công việc)
- Thêm/Sửa/Xóa công việc
- Validate Field thêm công việc khi không đủ thông tin
- Search / Search nhanh
- Sort / Sort nhanh

Version 1.1 (1/11/2019)
- Front-end: Quản lý State bằng Redux / Redux-thunk

Version 1.2 (4/11/2019)
- Back-end: Tăng tốc độ truy xuất bằng Redis
{start-server-cache: sudo service redis-server start}
{default-port: 6379}

Version 2.0 (... tương lai)
- Bổ sung chức năng Authentication / Authorization

<h3>Front-End Diagram</h3>
<img src="https://user-images.githubusercontent.com/49454154/68199558-d60e3500-fff0-11e9-8c5e-08c49c213088.jpg" alt="front-end" />

<h3>Back-End Diagram</h3>
<img src="https://user-images.githubusercontent.com/49454154/68201833-1e2f5680-fff5-11e9-9066-3f8b3beba8ce.jpg" alt="back-end"/>



