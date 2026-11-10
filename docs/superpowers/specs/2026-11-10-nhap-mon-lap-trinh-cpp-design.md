# Đặc Tả Thiết Kế (Design Spec) — Chuyên Đề: Nhập Môn Lập Trình C++ (Bản Chất Giao Tiếp Với Người Phụ Việc Ngây Ngô — Phổ Quát Cho Mọi Người Học)

- **Mã chuyên đề:** `MOD-Pre` (hoặc `MOD-00-Pre`)
- **Tên chuyên đề:** `00_NhapMon_LapTrinh_CPP`
- **Ngày cập nhật:** 2026-11-10
- **Phiên bản:** 3.0 (Thuần đời sống, phi công nghệ — Chạm tới mọi đối tượng từ học sinh cấp 2, người ngoại đạo đến người lớn tuổi)
- **Thư mục đích:** `/home/paust/Projects/DayHoc/00_NhapMon_LapTrinh_CPP/`
- **Đối tượng học tập:** Bất kỳ ai chưa từng lập trình bao giờ (học sinh lớp 6-7, sinh viên trái ngành, người sợ công nghệ).

---

## 1. Bản Chất Sư Phạm: Mô Hình "Người Phụ Việc Ngây Ngô Siêu Cần Cù"

### 1.1. Triết lý xóa tan rào cản công nghệ
Tuyệt đối không dùng các thuật ngữ viễn tưởng hay công nghệ như "robot", "hệ điều hành", "phần cứng", "máy móc tự động" trong bước giải thích đời sống ban đầu.

Bản chất của việc lập trình được đưa về tình huống đời thường gần gũi nhất:
> **"Lập trình thực chất là học cách viết một cuốn sổ tay hướng dẫn thật rõ ràng, không mập mờ, cho một Người Phụ Việc siêu khỏe, siêu chăm chỉ nhưng ngây ngô đến mức máy móc."**

### 1.2. Hình tượng đời sống chủ đạo: "Anh Phụ Bếp Thật Thà"
Hãy tưởng tượng trong căn bếp của bạn có một anh phụ việc tên là **Thật Thà**:
1. **Điểm mạnh tuyệt đối:** 
   - Rất khỏe, làm việc nhanh như chớp, không bao giờ biết mệt mỏi, bảo gì làm nấy, không bao giờ cãi lời hay làm sai nếu bạn chỉ dẫn đúng.
2. **Điểm yếu ngây ngô:**
   - **Chỉ làm đúng từng chữ một (Literal mind), tuyệt đối không biết "tự suy diễn" hay "đoán mò ý bạn"**:
     - Nếu bạn bảo: *"Lấy cho tôi cái gì ngon ngon"* $\rightarrow$ Anh ấy sẽ đứng đờ đẫn không biết làm gì.
     - Nếu bạn bảo: *"Lấy đường đổ vào cốc"* $\rightarrow$ Anh ấy sẽ lúng túng vì không biết lấy bao nhiêu thìa đường, lấy cốc ở đâu.
     - Bạn phải nói chính xác: *"Lấy chiếc cốc ở khay có nhãn 'Cốc', múc đúng 2 thìa đường ở hộp có nhãn 'Đường' đổ vào!"*.
3. **Quy tắc giao tiếp trong gian bếp:**
   - **Cuốn sổ công thức (Chương trình C++):** Anh ấy chỉ bắt đầu làm việc khi bạn trao cho anh ấy một cuốn sổ có các bước đánh số thứ tự từ trên xuống dưới.
   - **Dấu chấm câu rõ ràng (Dấu chấm phẩy `;`):** Dặn xong một việc, bạn phải gõ chiếc chuông nhỏ reng một tiếng (dấu `;`). Nếu chưa nghe chuông, anh ấy cứ đứng chờ mãi vì tưởng bạn vẫn đang nói dở.
   - **Những chiếc hộp có dán nhãn (Biến số & Kiểu dữ liệu):** Trong bếp có rất nhiều hộp: hộp to chứa gạo (`string`), hộp vừa chứa số lượng quả trứng (`int`), lọ thủy tinh đong từng giọt dầu ăn (`double`). Bạn không thể bảo anh ấy đổ dầu ăn vào túi lưới đựng hành tỏi. Hộp nào phải chứa đúng loại đồ đó.
   - **Ô cửa sổ nhận yêu cầu & Bệ cửa trả món (Luồng vào `cin` & Luồng ra `cout`):**
     - Anh ấy đứng trong bếp kín. Khách bên ngoài đưa giấy order qua ô cửa nhận đồ $\rightarrow$ Anh ấy cầm tờ giấy đọc dữ liệu cất vào các hộp (`cin`).
     - Nấu xong, anh ấy đặt món ăn kèm hóa đơn ra bệ cửa sổ cho khách lấy (`cout`).

**Mục tiêu sư phạm:** Bất kỳ ai — kể cả một đứa trẻ 11–12 tuổi hay một người lớn tuổi sợ máy tính — khi đọc câu chuyện này đều bật cười, thấy quen thuộc và hiểu ngay lý do tại sao máy tính cần những dòng lệnh chi tiết đến thế!

---

## 2. Mục Tiêu & Cấu Trúc 3 Vấn Đề Nhỏ

### Vấn đề 1: Bản Chất Lập Trình — Bạn Ra Lệnh, Người Phụ Việc Thật Thà Thực Thi
- **Bước 1 (Đời sống):**
  - Tình huống giao việc cho anh phụ việc ngây ngô. Tại sao không thể dùng ngôn ngữ nói chung chung hàng ngày? Vì ngôn ngữ con người có quá nhiều từ ngữ bóng gió, ngầm hiểu.
  - Cần một bộ từ vựng quy ước chung, rõ nghĩa 100% để giao tiếp: Đó chính là ngôn ngữ C++.
- **Bước 2 (Ánh xạ C++):**
  - Căn bếp chính bắt đầu mở cửa: `int main() { ... }` — Bước chân đầu tiên của anh phụ việc khi bước vào ca làm.
  - Dấu chấm phẩy `;`: Tiếng chuông ngắt lệnh.
  - Kết thúc công việc: `return 0;` — Báo cáo lại cho bạn: "Em đã làm xong mọi việc suôn sẻ, không đổ vỡ gì!".
- **Bước 3 (Bản chất & Thuật ngữ):**
  - **Lập trình:** Là viết hướng dẫn cho người phụ việc ngây ngô.
  - **Lỗi cú pháp (Syntax error):** Viết sai chữ hoặc quên gõ chuông (quên `;`), anh phụ việc lắc đầu từ chối làm ngay từ đầu.

### Vấn đề 2: Dặn Việc Đầu Tiên — Lời Chào Qua Bệ Cửa Sổ (`cout`)
- **Bước 1 (Đời sống):**
  - Trước khi nấu ăn, anh phụ việc muốn chào đón người ngoài cửa sổ. Bạn trang bị cho anh ấy một chiếc **Loa phát thanh** hướng ra ngoài cửa sổ để truyền đi các thông báo.
  - Mỗi khi cần nói gì, anh ấy chỉ cần đẩy câu chữ vào chiếc loa đó.
- **Bước 2 (Ánh xạ C++):**
  ```cpp
  #include <iostream>

  int main() {
      std::cout << "Xin chao! Toi la nguoi phu viec cham chi cua ban!" << std::endl;
      return 0;
  }
  ```
  - `#include <iostream>`: Mượn bộ dụng cụ loa và micro giao tiếp (`Input/Output`).
  - `std::cout`: Chiếc loa hướng ra ngoài màn hình.
  - `<<`: Mũi tên đẩy chữ vào miệng loa.
  - `std::endl`: Xuống dòng, giống như một khoảng nghỉ thở để bắt đầu câu mới.
- **Bước 3 (Bản chất & Thuật ngữ):**
  - Dòng xuất chuẩn (Output Stream): Kênh duy nhất đẩy thông điệp từ gian bếp ra cho mọi người thấy.

### Vấn đề 3: Những Chiếc Hộp Dán Nhãn & Nhận Order Qua Ô Cửa Sổ (`cin` / `cout`)
- **Bước 1 (Đời sống):**
  - Trong bếp, để không bừa bãi, mọi thứ đều phải có hộp chứa riêng:
    - Hộp nhãn `so_banh`: Chỉ đựng số nguyên chiếc bánh mì (1 cái, 2 cái, không thể có bánh rưỡi).
    - Hộp nhãn `gia_tien`: Đựng số tiền có thể lẻ lẻ (15.5 nghìn).
    - Hộp nhãn `ten_khach`: Đựng cả mẩu giấy ghi họ tên khách hàng.
  - Nhận yêu cầu: Khách bên ngoài đưa tờ giấy qua khe cửa sổ (`cin`), anh phụ việc đọc số lượng bánh và cất vào hộp `so_banh`.
  - Tính toán: Anh ấy nhân số bánh với giá tiền, được kết quả đem đặt ra ngoài bệ cửa sổ (`cout`) kèm chiếc bánh cho khách.
- **Bước 2 (Ánh xạ C++):**
  ```cpp
  #include <iostream>
  #include <string>

  int main() {
      std::string tenKhach;
      int soBanh;
      double giaBanh = 15.5; // nghìn đồng một chiếc

      std::cout << "Chao ban! Ban ten la gi? ";
      std::cin >> tenKhach;

      std::cout << "Ban muon mua bao nhieu chiec banh? ";
      std::cin >> soBanh;

      double tongTien = soBanh * giaBanh;

      std::cout << "Cam on " << tenKhach << "! Tong tien cua ban la: " << tongTien << " nghin dong." << std::endl;
      return 0;
  }
  ```
  - **Biến (Variable):** Một chiếc hộp dán nhãn đặt trong bếp để lưu trữ nguyên liệu tạm thời.
  - **Kiểu dữ liệu (Data Type):** Kích cỡ và chủng loại của hộp:
    - `int`: Hộp chứa số nguyên đếm được (không có phần lẻ).
    - `double`: Hộp chứa số có phần lẻ thập phân.
    - `char`: Hộp nhỏ xíu chỉ chứa đúng 1 chữ cái.
    - `string`: Hộp to chứa cả một chuỗi chữ viết dài.
    - `bool`: Hộp công tắc chỉ có 2 trạng thái Đúng hoặc Sai (`true`/`false`).
  - Phép gán `=`: Hành động xúc đồ bên phải bỏ vào chiếc hộp bên trái.
  - `cin >>`: Mũi tên hút thông tin khách gõ từ bàn phím đổ vào chiếc hộp.
- **Bước 3 (Bản chất & Thuật ngữ):**
  - Tại sao số nguyên chia số nguyên lại bị vứt phần lẻ (`5 / 2 = 2` chứ không phải `2.5`): Vì cái hộp `int` không có ngăn chứa phần lẻ!

---

## 3. Hệ Thống Tệp Tin Triển Khai

```text
00_NhapMon_LapTrinh_CPP/
├── docs/
│   └── bai_giang_nhap_mon_cpp.md         # Giáo án chi tiết, đậm chất sư phạm đời thường
├── Code_Mau/
│   ├── 01_PhuViec_ChaoHoi.cpp           # Mã mẫu 1: Cấu trúc cơ bản và std::cout
│   ├── 02_HopDanNhan_BienVaKieu.cpp     # Mã mẫu 2: Khai báo hộp, kiểu dữ liệu, gán giá trị
│   └── 03_NhanDon_GiaoHang_MiniApp.cpp  # Mã mẫu 3: cin, cout, tính tiền tiệm bánh mì
├── index.html                            # Giao diện web bài giảng tương tác
└── lesson-data.js                        # Toàn bộ nội dung tương tác, mô phỏng gian bếp, quiz
```

---

## 4. Kiểm Thử & Nghiệm Thu Bằng Subagent Sư Phạm

Quy trình nghiệm thu gồm 2 chặng:
1. **Kiểm thử tự động kỹ thuật (`tests/verify_00_nhap_mon.sh`):**
   - Biên dịch g++ C++14 cả 3 file code mẫu (`-Wall -Wextra -Werror`).
   - Kiểm tra liên kết stylesheet, engine, icon và portal DAG.
2. **Nghiệm thu sư phạm bằng Subagent (`tests/audit_pedagogy_subagent.sh`):**
   - Gọi `pi --no-session -p` với prompt đóng vai trò:
     - Giám khảo 1: Giáo viên dạy môn Nhập môn lập trình, chấm điểm tính chặt chẽ và không dạy vẹt.
     - Giám khảo 2: Học sinh 12 tuổi chưa từng biết lập trình, đọc thử giáo án xem có thấy vui, dễ hiểu và tự tin viết code không.
   - Thang điểm đánh giá (0-100), yêu cầu đạt trên 90 điểm với nhận xét chi tiết.
