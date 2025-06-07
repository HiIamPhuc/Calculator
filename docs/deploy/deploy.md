# Hướng dẫn chạy Web Calculator (How to deploy)

## Phần 1: Chạy Backend Python với `virtualenv` (mỗi service một môi trường ảo)

Dự án có các service riêng biệt, ví dụ cho service graphing: `server/graphing`.

### Bước 1: Tạo Môi Trường Ảo cho Từng Service

#### 1. Di chuyển vào thư mục service
```bash
cd server/graphing
```

#### 2. Tạo môi trường ảo bằng `virtualenv`
```bash
virtualenv venv
```
> Lệnh này sẽ tạo thư mục `venv/` trong thư mục hiện tại.

#### 3. Kích hoạt môi trường ảo
* **Trên Windows**:
  ```bash
  venv\Scripts\activate
  ```

* **Trên macOS/Linux**:
  ```bash
  source venv/bin/activate
  ```
> Sau khi kích hoạt, bạn sẽ thấy dấu `(venv)` xuất hiện trước terminal.

#### 4. Cài đặt các thư viện cần thiết
* Có file `requirements.txt`:

```bash
pip install -r requirements.txt
```

#### 5. Lặp lại các bước trên cho từng service khác trong `server/`
Còn các service khác trong `server/` là `currency-converter` và `scientific-calculator`.

For Windows:
```bash
cd server/currency-converter
virtualenv venv
venv\Scripts\activate
```

```bash
cd server/scientific-calculator
virtualenv venv
venv\Scripts\activate
```

---

### Bước 2: Chạy Backend

File chính của mỗi service là `app.py`:

```bash
cd server/name-of-service
```

```bash
python app.py
```

> 📡 Mặc định, server chạy tại `http://0.0.0.0:5001` hoặc `http://127.0.0.1:5001`.

---

### Bước 3: Thoát Môi Trường Ảo 

```bash
deactivate
```

---

## Phần 2: Chạy Frontend React (Node.js)

Frontend nằm trong thư mục `client/calculator`.

### Bước 1: Cài đặt Node.js (nếu chưa có)

* Tải tại: [https://nodejs.org](https://nodejs.org)

### Bước 2: Cài đặt thư viện cho frontend

```bash
cd client/calculator
npm install
```

### Bước 3: Chạy ứng dụng React

```bash
npm start
```

> Ứng dụng sẽ tự động mở tại `http://localhost:3000`

---

## Bảng tổng Kết Câu Lệnh Nhanh

| Hành động                       | Câu lệnh ví dụ                    |
| ------------------------------- | --------------------------------- |
| Tạo môi trường ảo               | `virtualenv venv`                 |
| Kích hoạt môi trường ảo (Windows)             | `venv\Scripts\activate`           |
| Kích hoạt môi trường ảo (macOS/Linux)         | `source venv/bin/activate`        |
| Cài thư viện Python             | `pip install -r requirements.txt` |
| Chạy backend                    | `python app.py`                   |
| Tắt môi trường ảo               | `deactivate`                      |
| Cài đặt thư viện React frontend | `npm install`                     |
| Chạy frontend React             | `npm start`                       |