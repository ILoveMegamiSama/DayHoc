# Hướng Dẫn Sử Dụng Kho Code Mẫu "Tự Code Máy Chấm (Stress Testing)"

Thư mục này chứa toàn bộ code mẫu C++14 đi kèm bài giảng tương tác `MayCham/index.html`, được chia theo đúng môi trường sử dụng của học sinh và giáo viên.

## 1. Cấu trúc thư mục

- **`Demo_Nho_Tung_Phan/`**: Các đoạn code ngắn hoàn chỉnh dùng để minh họa từng lỗi đơn lẻ ngay trên lớp (có thể dán thẳng vào **USACO IDE** hoặc **Code::Blocks** để bấm Run ngay):
  - `01_Buffer_QuenClose.cpp`: Minh họa chuyện gì xảy ra khi mở `ofstream` ghi dữ liệu mà quên `.close()` trước khi đọc lại file đó.
  - `02_Random_LoiSeedTime0.cpp`: Minh họa lỗi khai báo `mt19937` dùng hạt giống `time(0)` bên trong hàm `generate()` làm hàng chục test liên tiếp sinh ra cùng một dãy số y hệt nhau.
  - `03_Random_GioiHanRand32767.cpp`: Minh họa giới hạn `RAND_MAX = 32767` trên Windows và sự khác biệt giữa `mt19937` (32-bit) với `mt19937_64` (64-bit).
- **`Win_CodeBlocks/`**: Bộ code chuẩn hóa cho học sinh dùng **Code::Blocks trên Windows** (gọi `NAME.exe` và so sánh bằng `fc /w`).
  - `00_Template_MayCham/`: Khung chuẩn để chép vào dùng trong phòng thi.
  - `01_MaxSubarray/`: Bài toán Đoạn con có tổng lớn nhất (`MAXSUB`).
  - `02_TruyVanDoan_TestManh/`: Bài toán Truy vấn đếm phần tử $X$ trên đoạn $[L, R]$ của mảng tăng dần (`QUERY`) — minh họa cách sinh test có ràng buộc cấu trúc và làm mạnh test.
- **`Linux_Arch/`**: Bộ code tương đương dành cho môi trường **Arch Linux** của giáo viên (gọi `./NAME` và so sánh bằng `diff -w`).
- **`Web_USACO_IDE/`**: Phiên bản gộp cả `generate()`, `solve_trau()`, `solve_full()` vào **1 file `.cpp` duy nhất** để giáo viên bấm Run trực tiếp trên web USACO IDE khi không gọi được lệnh `system()`.

---

## 2. Cách bật/tắt các "Công tắc Bug" trong Code

Ở đầu mỗi file `MAYCHAM.cpp` (và các file demo) đều có sẵn khối công tắc `#define`:

```cpp
#ifndef BUG_QUEN_CLOSE
#define BUG_QUEN_CLOSE 0      // Đổi 0 -> 1 để thử nghiệm lỗi quên inp.close()
#endif
```

- **`0`**: Chế độ chuẩn (máy chấm hoạt động hoàn hảo).
- **`1`**: Bật lỗi tương ứng để quan sát hiện tượng lỗi ngay trên màn hình Console.

---

## 3. Quy trình 4 bước chạy Máy Chấm trên Code::Blocks (Windows)

> **Lưu ý về `PATH` trên Windows:** Khi cài Code::Blocks, trình biên dịch `g++.exe` thường không được tự động thêm vào biến môi trường `PATH` của Windows. Do đó ta không gọi `system("g++ ...")` trong code mà bấm **Build (F9)** trực tiếp trên Code::Blocks cho từng file.

1. Đặt cả 3 file `BAI1.cpp`, `BAI1_TRAU.cpp`, `MAYCHAM.cpp` trong **cùng một thư mục**.
2. Mở `BAI1.cpp` trên Code::Blocks → Bấm **Build (Ctrl + F9)** để tạo `BAI1.exe`.
3. Mở `BAI1_TRAU.cpp` trên Code::Blocks → Bấm **Build (Ctrl + F9)** để tạo `BAI1_TRAU.exe`.
4. Mở `MAYCHAM.cpp` → Bấm **Build & Run (F9)**. Khi gặp test sai, lệnh `fc /w` sẽ in thẳng dòng khác biệt (`*****`) lên cửa sổ đen và `exit(0)` sẽ giữ nguyên cửa sổ đó để bạn kiểm tra!
