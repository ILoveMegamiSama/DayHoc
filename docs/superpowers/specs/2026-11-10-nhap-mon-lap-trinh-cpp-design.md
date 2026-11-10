# Đặc Tả Thiết Kế (Design Spec) — Chuyên Đề: Nhập Môn Lập Trình C++ (Bản Chất Giao Tiếp Dịch Vụ — Dành Cho Người Mới Bắt Đầu)

- **Mã chuyên đề:** `MOD-Pre` (hoặc `MOD-00-Pre`)
- **Tên chuyên đề:** `00_NhapMon_LapTrinh_CPP`
- **Ngày cập nhật:** 2026-11-10
- **Phiên bản:** 2.0 (Tái thiết kế theo Bản chất Giao Tiếp Dịch Vụ & Nghiệm thu bằng Subagent)
- **Thư mục đích:** `/home/paust/Projects/DayHoc/00_NhapMon_LapTrinh_CPP/`
- **Đối tượng học tập:** Học sinh từ cấp 2 trở lên, người hoàn toàn chưa từng biết gì về lập trình.

---

## 1. Bản Chất Sư Phạm: Mô Hình "Giao Tiếp & Ủy Thác Dịch Vụ"

### 1.1. Triết lý cốt lõi (Tránh trùng lặp với MayCham)
Ở bài `MOD-00: MayCham`, học sinh đã được học sâu về hệ thống phần cứng (RAM vs Ổ cứng, Shell, PATH, cờ biên dịch g++, file `.exe`). 
Vì vậy, bài **Nhập Môn (`MOD-Pre`) tuyệt đối không lặp lại các khái niệm phần cứng sâu hay hệ điều hành**.

Thay vào đó, bài giảng giải quyết câu hỏi gốc rễ nhất của một đứa trẻ cấp 2 khi lần đầu nhìn vào màn hình code:
> **"Lập trình thực chất là làm cái gì? Tại sao tôi phải gõ những dòng chữ kỳ lạ này?"**

### 1.2. Mô hình đời sống chủ đạo: "Quầy Dịch Vụ & Chú Robot Pha Chế Siêu Tốc"
Hãy tưởng tượng bạn bước vào một quầy trà sữa tự động. Trong quầy có một **Chú Robot Pha Chế** (Đối tượng cung cấp dịch vụ):
1. **Đặc điểm của Robot dịch vụ:**
   - Siêu năng lực: Tốc độ làm việc cực nhanh (hàng tỷ thao tác/giây), không bao giờ biết mệt mỏi, không bao giờ nhầm lẫn nếu được chỉ dẫn đúng.
   - Nhược điểm chí mạng: **Ngô nghê một cách máy móc tuyệt đối**. Robot không có trực giác, không thể tự đoán ý bạn ("Làm cho tôi cốc gì ngon ngon" $\rightarrow$ Robot sẽ đứng đơ hoặc báo lỗi).
2. **Quy trình tương tác dịch vụ:**
   - **Thực đơn / Quy ước chuẩn (Ngôn ngữ lập trình):** Bạn phải dùng đúng cú pháp mà Robot đã được lập trình sẵn để hiểu.
   - **Từng bước chỉ dẫn tường minh (Thuật toán):** Mỗi bước hành động phải có điểm dừng rõ ràng (Dấu chấm phẩy `;` như tiếng bấm chuông kết thúc một khẩu lệnh).
   - **Khay chứa nguyên liệu có dán nhãn (Biến & Kiểu dữ liệu):** Muốn Robot làm việc, trên bàn pha chế phải có các khay dán nhãn. Khay đựng đá (chất lỏng/rắn) không thể chứa topping trân châu nếu sai loại.
   - **Cửa nhận yêu cầu & Cửa trả món (Luồng I/O):** Khách đưa order vào qua ô cửa nhận (`cin`), Robot pha chế xong đẩy món ra ô cửa trả (`cout`).

**Nguyên tắc sư phạm xuyên suốt:** Phải **xây dựng hoàn chỉnh ý niệm trong đời sống** ở học sinh trước, để học sinh tự thấy nhu cầu cần có công cụ đó, sau đó mới ánh xạ nhẹ nhàng sang câu lệnh C++.

---

## 2. Mục Tiêu, Phi Mục Tiêu & Tiêu Chí Nghiệm Thu

### 2.1. Mục Tiêu (Goals)
1. **Bài giảng Markdown (`docs/bai_giang_nhap_mon_cpp.md`):** 
   - Văn phong gần gũi, dí dỏm, học sinh cấp 2 đọc đến đâu hiểu ngay đến đó.
   - Tuân thủ cấu trúc 3 bước:
     - *Bước 1: Tình huống quầy dịch vụ trong đời sống.*
     - *Bước 2: Ánh xạ vào C++ (chỉ dẫn tường minh cho máy tính).*
     - *Bước 3: Bản chất cơ chế & Ý nghĩa từ ngữ.*
2. **Kho Code Mẫu chuẩn (`Code_Mau/`):** 3 file mã nguồn C++14 sạch sẽ, chú thích cực kỳ sinh động:
   - `01_Robot_ChaoKhach.cpp`: Chương trình đầu tiên, xuất khẩu lệnh ra màn hình (`cout`), giải phẫu cánh cổng `main()`.
   - `02_KhayNguyenLieu_BienVaKieu.cpp`: Đặt tên khay, phân loại khay (`int, double, char, string, bool`), hành động rót dữ liệu (toán tử gán `=`), phép toán pha chế.
   - `03_QuayTuongTac_CinCout_MiniApp.cpp`: Nhận order từ bàn phím (`cin`), tính toán và trả kết quả qua màn hình (`cout`) — Ứng dụng: Máy tính tính tiền trà sữa tự động kèm hóa đơn.
3. **Trang Web Tương Tác (`index.html` + `lesson-data.js`):**
   - Tái sử dụng hạ tầng `shared/`.
   - Mô phỏng trực quan: Quầy pha chế (Bàn làm việc với các khay dán nhãn), Băng chuyền đưa order vào (`cin`) và Khay đẩy trà sữa ra (`cout`).
   - Bộ câu hỏi trắc nghiệm chất lượng cao (đáp án đồng dạng 80–90%, kiểm tra sâu về bản chất ủy thác dịch vụ và quy tắc hộp dữ liệu).
4. **Tích Hợp Vào Cây Kỹ Năng (`shared/portal-data.js`):**
   - Đưa node `nhap_mon_cpp` vào làm điểm xuất phát đầu tiên trước `MOD-00: may_cham`.

### 2.2. Phi Mục Tiêu (Non-Goals)
- Không đi sâu vào cấu trúc phần cứng sâu (không nói Shell, PATH, định dạng file nhị phân PE/ELF, cờ tối ưu compiler `-O2`, buffer flush cấp thấp — vì đó là sân chơi của `MayCham`).
- Không dạy các cấu trúc điều khiển nâng cao (vòng lặp lồng nhau, hàm đệ quy, mảng, con trỏ).

### 2.3. Cơ Chế Nghiệm Thu Mới: Thử Nghiệm Bằng Subagent Độc Lập
- Sau khi hoàn thành bài giảng và code mẫu, hệ thống sẽ tự động kích hoạt một **Subagent Giám Định Sư Phạm** (chạy qua CLI `pi --no-session -p` với system prompt đóng vai trò: Một giáo viên dạy Tin học cấp 2 kết hợp một học sinh lớp 7 chưa từng biết lập trình).
- Subagent sẽ đọc toàn bộ giáo án và trả về bảng điểm đánh giá theo các tiêu chí:
  1. *Tính tự nhiên của ví dụ đời sống (Có gượng ép không? Học sinh cấp 2 có thấy quen thuộc không?)*
  2. *Độ mượt mà khi chuyển tiếp từ đời sống sang code C++.*
  3. *Mức độ dễ hiểu của các khái niệm trừu tượng (Biến, Kiểu dữ liệu, Toán tử gán, `cin`/`cout`).*
  4. *Độ sạch và tính sư phạm của code mẫu.*
  5. *Chất lượng bộ câu hỏi trắc nghiệm (có bẫy ngữ pháp vớ vẩn hay tập trung vào tư duy bản chất).*
- Chỉ khi Subagent thẩm định đạt đánh giá "Xuất sắc / Đạt chuẩn sư phạm", bài giảng mới được coi là hoàn tất.

---

## 3. Tách Biệt 3 Vấn Đề Nhỏ Chi Tiết

### Vấn đề nhỏ 1: Bản Chất Lập Trình — Bạn Là Khách Hàng, Máy Tính Là Robot Phục Vụ
- **Bước 1 (Đời sống):**
  - Câu chuyện bước vào tiệm đồ uống tự động: Bạn không thể tự vào bếp pha chế vì bạn không có máy móc chuyên dụng, bạn phải **ủy thác** cho Robot pha chế.
  - Nhưng Robot không có khả năng "đọc suy nghĩ". Nếu bạn nói chung chung "cho cốc gì ngon ngon", Robot sẽ đứng im. Bạn phải đưa ra một **bản quy trình hành động chính xác** (Công thức / Chỉ thị).
  - Ngôn ngữ C++ chính là một bộ từ vựng đã được thống nhất từ trước giữa bạn và Robot.
- **Bước 2 (Ánh xạ C++):**
  - Cánh cổng tiếp nhận công việc: `int main() { ... }` — Đây là nơi Robot mở cửa ca làm việc và bắt đầu đọc danh sách lệnh từ trên xuống dưới.
  - Dấu chấm phẩy `;`: Mỗi hành động phải dứt khoát. Robot chỉ thực hiện bước tiếp theo khi thấy dấu hiệu kết thúc câu lệnh `;`.
  - Kết thúc ca làm việc: `return 0;` — Robot báo cáo với bạn: "Mọi yêu cầu đã thực hiện trọn vẹn, không xảy ra sự cố!".
- **Bước 3 (Thuật ngữ & Bản chất):**
  - **Lập trình (Programming):** Là nghệ thuật viết ra bản hướng dẫn chi tiết, không mập mờ, để ủy thác cho máy tính thực hiện thay con người.
  - **Lỗi cú pháp (Syntax Error):** Bạn dùng sai từ hoặc quên dấu `;`, Robot không hiểu khẩu lệnh nên từ chối chạy ngay từ đầu.

### Vấn đề nhỏ 2: Cấu Trúc Bản Chỉ Dẫn Đầu Tiên & Lời Chào Thế Giới (`cout`)
- **Bước 1 (Đời sống):**
  - Trước khi pha chế, quầy phục vụ cần bật chiếc **Loa thông báo / Màn hình hiển thị số thứ tự** để nói chuyện với khách hàng. Muốn có loa, quầy phải lắp đặt bộ phụ kiện âm thanh từ kho dụng cụ.
  - Khi muốn gửi lời chào hoặc thông báo món ăn đã xong, nhân viên đẩy thông điệp vào chiếc loa phát thanh.
- **Bước 2 (Ánh xạ C++):**
  ```cpp
  #include <iostream>

  int main() {
      std::cout << "Xin chao! Toi la Robot phuc vu C++!" << std::endl;
      return 0;
  }
  ```
  - `#include <iostream>`: Khai báo mượn bộ đồ nghề "Âm thanh & Giao tiếp" (`Input/Output Stream`).
  - `std::cout`: Chính là chiếc loa phát thanh hướng ra màn hình.
  - Toán tử `<<`: Mũi tên đẩy thông điệp hoặc dữ liệu từ trong quầy bắn thẳng vào miệng loa `cout`.
  - `std::endl`: Xuống dòng và dọn sạch hàng đợi thông báo.
- **Bước 3 (Thuật ngữ & Bản chất):**
  - **Luồng xuất chuẩn (Standard Output):** Con đường chính thống duy nhất để chương trình đẩy thông điệp ra cho người dùng nhìn thấy.

### Vấn đề nhỏ 3: Những Chiếc Khay Dán Nhãn & Giao Tiếp Hai Chiều (`cin` / `cout`)
- **Bước 1 (Đời sống):**
  - Trong quầy pha chế, Robot cần chứa nguyên liệu tạm thời để chế biến:
    - Khay dán nhãn `so_ly`: Chỉ đựng số lượng nguyên chiếc cốc (1, 2, 5 cốc).
    - Khay dán nhãn `luong_duong`: Đựng tỷ lệ phần trăm (0.5, 0.7, 1.0).
    - Khay dán nhãn `size_coc`: Đựng ký tự cỡ cốc ('M', 'L').
    - Khay dán nhãn `ten_khach`: Đựng cả họ tên khách ("Nguyen Van A").
  - Bạn không thể đổ trà sữa vào khay dán nhãn "đếm số lượng". Mỗi khay phải có **kích cỡ và loại đồ vật riêng biệt**.
  - **Quy trình tương tác:** Khách đứng trước quầy, đưa yêu cầu vào ô nhận order (`cin >> khay_chua`), Robot lấy thông tin từ khay ra tính tiền, rồi in hóa đơn ra loa màn hình (`cout << tong_tien`).
- **Bước 2 (Ánh xạ C++):**
  ```cpp
  #include <iostream>
  #include <string>

  int main() {
      std::string tenKhach;
      int soLy;
      double giaTienMotLy = 30.5; // nghìn đồng

      std::cout << "Moi ban nhap ten: ";
      std::cin >> tenKhach;

      std::cout << "Ban mua bao nhieu ly? ";
      std::cin >> soLy;

      double tongTien = soLy * giaTienMotLy;

      std::cout << "Hoa don cua " << tenKhach << ": " << tongTien << " nghin dong!" << std::endl;
      return 0;
  }
  ```
  - Khái niệm **Biến (Variable):** Một chiếc khay chứa dữ liệu tạm thời trên bàn làm việc, có tên gọi rõ ràng.
  - **Kiểu dữ liệu (Data Type):** Định dạng và kích thước của chiếc khay: `int` (số nguyên), `double` (số thực), `char` (1 ký tự), `string` (chuỗi chữ), `bool` (đúng/sai).
  - Phép gán `=`: Hành động xúc dữ liệu bên phải đặt vào khay bên trái.
  - Toán tử `cin >>`: Mũi tên hút dữ liệu từ bàn phím của khách hàng rót vào chiếc khay biến.
- **Bước 3 (Thuật ngữ & Bản chất):**
  - Phân biệt toán tử `<<` (đẩy ra loa) và `>>` (hút vào khay).
  - Bản chất của phép tính số học: Tại sao số nguyên chia số nguyên lại bị mất phần thập phân (phép chia nguyên `5 / 2 = 2`), và khi nào cần dùng khay số thực `double`.

---

## 4. Kế Hoạch Triển Khai & Kiểm Thử

```text
00_NhapMon_LapTrinh_CPP/
├── docs/
│   └── bai_giang_nhap_mon_cpp.md         # Giáo án chi tiết đậm chất sư phạm đời sống
├── Code_Mau/
│   ├── 01_Robot_ChaoKhach.cpp           # Mã mẫu 1: Cấu trúc lệnh & cout
│   ├── 02_KhayNguyenLieu_BienVaKieu.cpp # Mã mẫu 2: Khay biến, kiểu dữ liệu, sizeof
│   └── 03_QuayTuongTac_CinCout_MiniApp.cpp # Mã mẫu 3: Nhập xuất tương tác & App tính tiền
├── index.html                            # Trang web tương tác
└── lesson-data.js                        # Data 3 module, visual cards, sandbox, quiz
```

### Script nghiệm thu:
1. `tests/verify_00_nhap_mon.sh`: Biên dịch C++14 sạch warning, kiểm tra link tài nguyên web.
2. `tests/audit_pedagogy_subagent.sh`: Gọi `pi --no-session -p` với rubric thẩm định chất lượng sư phạm nghiêm ngặt.
