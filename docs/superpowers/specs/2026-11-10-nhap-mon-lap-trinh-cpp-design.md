# Đặc Tả Thiết Kế (Design Spec) — Chuyên Đề: Nhập Môn Lập Trình C++ (Từ Bản Chất Máy Tính & Bộ Nhớ Đến Chương Trình Đầu Tiên)

- **Mã chuyên đề:** `MOD-Pre` (hoặc `MOD-00-Pre`)
- **Tên chuyên đề:** `00_NhapMon_LapTrinh_CPP`
- **Ngày lập:** 2026-11-10
- **Trạng thái:** Chờ phê duyệt (Pending Approval)
- **Thư mục đích:** `/home/paust/Projects/DayHoc/00_NhapMon_LapTrinh_CPP/`

---

## 1. Bối Cảnh & Động Lực (Intent & The Why)

Hiện tại, hệ thống bài giảng trong học viện CP đã có các chuyên đề từ `MOD-00` (Tự code máy chấm Stress Testing), `MOD-01` (Đệ quy & Đệ quy đuôi), `MOD-02` (Ngăn xếp), `MOD-03` (Hai con trỏ) đến `MOD-04` (Quy hoạch động & Cấu trúc tuyến tính). 
Tuy nhiên, module đầu tiên hiện tại là `MOD-00: MayCham` yêu cầu người học **phải đã biết cú pháp C++ cơ bản** (biến, câu lệnh rẽ nhánh, vòng lặp for/while). 

Điều này tạo ra một rào cản lớn đối với **người mới bắt đầu, chưa từng biết gì về lập trình**. Họ cần một bài giảng nhập môn nền móng (`MOD-Pre`) dẫn dắt từ con số 0, định hình tư duy lập trình chuẩn mực, hiểu bản chất máy tính thực thi chương trình thế nào, tự tay viết và chạy chương trình đầu tiên mà không bị học vẹt hay sợ hãi cú pháp.

---

## 2. Mục Tiêu, Phi Mục Tiêu & Chống Mục Tiêu

### 2.1. Mục Tiêu (Goals)
1. **Bài giảng Markdown chi tiết (`docs/bai_giang_nhap_mon_cpp.md`):** Tuân thủ phương pháp sư phạm 3 bước đồng nhất:
   - *Bước 1: Tình huống đời sống trực quan.*
   - *Bước 2: Ánh xạ vào mã nguồn C++ chuẩn mực.*
   - *Bước 3: Giải nghĩa thuật ngữ & Bản chất máy tính (CPU, RAM, Compiler, Byte/Bit).*
2. **Kho Code Mẫu chuẩn (`Code_Mau/`):** 3 file mã nguồn C++14 chú thích cặn kẽ, chạy độc lập:
   - `01_HelloWorld_GiaiPhauCauTruc.cpp`: Khung chương trình chuẩn, in ra màn hình, bản chất từng dòng lệnh.
   - `02_Bien_KieuDuLieu_ToanTu.cpp`: Khái niệm biến, kích thước kiểu dữ liệu trong RAM (`sizeof`), các phép toán số học, chia nguyên vs chia thực.
   - `03_NhapXuat_TuongTac_MiniApp.cpp`: Dòng luồng `cin`/`cout`, xử lý trôi lệnh cơ bản, bài toán thực tế (máy tính đổi độ C sang F và hóa đơn thanh toán).
3. **Trang Web Bài Giảng Tương Tác (`index.html` + `lesson-data.js`):**
   - Tái sử dụng trọn vẹn hạ tầng chung (`shared/styles.css`, `shared/lecture-engine.js`, `shared/icons.js`, `shared/highlighter.js`).
   - Có các thẻ mô phỏng trực quan: Chiếc bàn RAM dán nhãn biến, dòng ống nước `cin`/`cout`, mô hình dịch mã Compiler.
   - Hệ thống trắc nghiệm chất lượng cao (đáp án đồng dạng 80–90%, yêu cầu tư duy sâu về bản chất bộ nhớ và câu lệnh).
4. **Tích Hợp Vào Trang Chủ Toàn Cục (`shared/portal-data.js`):**
   - Đưa node `nhap_mon_cpp` vào vị trí gốc rễ của DAG kỹ năng (Track: `foundations`).
   - Đặt `nhap_mon_cpp` làm tiền đề (prerequisite) trực tiếp cho `MOD-00: may_cham`.
5. **Kiểm Thử Tự Động (`tests/verify_00_nhap_mon.sh`):**
   - Kiểm tra biên dịch g++ cờ `-std=c++14 -Wall -Wextra -Werror` cho toàn bộ file code mẫu.
   - Kiểm tra tính hợp lệ của cấu trúc `lesson-data.js` và liên kết portal.

### 2.2. Phi Mục Tiêu (Non-Goals)
- Không dạy các cấu trúc dữ liệu nâng cao (mảng 2 chiều, struct, vector, pair) hay thuật toán phức tạp (đệ quy, sắp xếp, tìm kiếm nhị phân) — các nội dung này thuộc các module tiếp theo.
- Không đi sâu vào lập trình hướng đối tượng (Class, OOP) hoặc kỹ thuật con trỏ thô (Raw Pointers) — con trỏ sẽ được học tại `MOD-03: Hai con trỏ`.
- Không cài cắm các môi trường lập trình phức tạp; tập trung vào tư duy cú pháp cốt lõi và cách vận hành.

### 2.3. Chống Mục Tiêu (Anti-Goals)
- **Chống học vẹt cú pháp:** Tuyệt đối không bắt học sinh gõ theo như một câu thần chú ma thuật mà không giải thích vì sao phải có `#include`, tại sao `main()` lại trả về `0`, hay dấu chấm phẩy `;` mang ý nghĩa gì.
- **Chống câu đố mẹo vô nghĩa:** Không đưa ra các câu hỏi trắc nghiệm dạng bẫy cú pháp vô bổ (ví dụ: `int a = ++a + a++`).
- **Chống ngập thuật ngữ kỹ thuật khô khan:** Không dùng từ chuyên ngành mà không có hình tượng đời sống đối chiếu tương đương.

---

## 3. Các Hướng Tiếp Cận Đã Cân Nhắc (Approaches)

### Hướng 1: "Từ Bản Chất Máy Tính & Bộ Nhớ Đến Chương Trình Đầu Tiên" (ĐÃ CHỌN)
- **Nội dung:** Tách làm 3 vấn đề nhỏ:
  1. *Vấn đề 1:* Máy tính suy nghĩ thế nào? CPU (Bộ não), RAM (Chiếc bàn làm việc), Ổ cứng (Tủ hồ sơ) và Compiler g++ (Người phiên dịch dịch mã C++ thành mã máy 0/1).
  2. *Vấn đề 2:* Giải phẫu chương trình C++ đầu tiên (`Hello World`). Từng dòng lệnh từ `#include`, `main()`, `std::cout`, toán tử `<<`, `;`, `return 0;`.
  3. *Vấn đề 3:* Đặt tên cho những chiếc hộp dữ liệu — Biến số, Kiểu dữ liệu (`int, double, char, string, bool`) và Nhập/Xuất 2 chiều (`cin >>`, `cout <<`).
- **Ưu điểm:** Khớp hoàn hảo với phong cách sư phạm của các module sẵn có trong repo. Người học có được mô hình tư duy vững chắc về RAM và CPU ngay từ ngày đầu, tự tin học tiếp `MayCham` và `DeQuy`.
- **Đánh đổi:** Cần dùng hình tượng đời sống thật sáng tạo, gần gũi để giải thích phần cứng một cách nhẹ nhàng.

### Hướng 2: "Thực Hành Trực Diện & Ra Sản Phẩm Nhanh (Action-First)" (ĐÃ LOẠI BỎ)
- **Nội dung:** Bỏ qua giải thích CPU, RAM, trình biên dịch; cho học sinh gõ ngay các lệnh tính toán số học và in ra màn hình.
- **Lý do loại bỏ:** Học viên dễ rơi vào tình trạng "học vẹt", không hiểu nguyên lý hoạt động của biến trong bộ nhớ. Khi chuyển tiếp sang bài `MayCham` (cần hiểu RAM vs Ổ cứng, compiler g++, cờ biên dịch) sẽ bị hổng nền tảng nghiêm trọng.

---

## 4. Đặc Tả Nội Dung Chi Tiết (The 3 Sub-Problems)

### Module 1: Máy Tính "Nghĩ" Thế Nào & Tại Sao Cần Ngôn Ngữ C++?
- **Bước 1 (Đời sống):** Người ngoại quốc và Cuốn từ điển / Người phiên dịch. Máy tính thực chất chỉ là một chiếc máy tính toán cực nhanh bằng các công tắc điện bật/tắt (Bật = 1, Tắt = 0 - Nhị phân Bit).
- **Bước 2 (Ánh xạ C++):**
  - Tại sao không viết thẳng số 0 và 1? Quá chậm và dễ sai sót.
  - Con người viết mã nguồn C++ cấp cao (dễ đọc, gần gũi ngôn ngữ tự nhiên) trong file `.cpp`.
  - **Trình biên dịch (Compiler - g++):** Đóng vai trò người phiên dịch mẫn cán, đọc mã C++, kiểm tra ngữ pháp và dịch toàn bộ thành Mã máy (Machine Code: 0 và 1) đóng gói trong file thực thi (`.exe` trên Windows, file binary trên Linux).
- **Bước 3 (Thuật ngữ & Bản chất phần cứng):**
  - **CPU (Central Processing Unit):** "Đầu bếp trưởng" — chỉ biết nhai và thực thi từng lệnh máy ở tốc độ hàng tỷ phép tính mỗi giây.
  - **RAM (Random Access Memory):** "Chiếc bàn làm việc tốc độ cao" — nơi CPU đặt các biến và câu lệnh đang chạy dở. Tắt máy là bàn bị quét sạch (dữ liệu biến mất).
  - **Ổ cứng (HDD/SSD):** "Chiếc tủ hồ sơ lưu trữ lâu dài" — nơi chứa file `.cpp` và file `.exe`. Tắt máy dữ liệu vẫn còn nguyên.

### Module 2: Giải Phẫu Chương Trình C++ Đầu Tiên — Lời Chào Thế Giới (`Hello World`)
- **Bước 1 (Đời sống):** Cấu trúc một lá thư trang trọng gửi bưu điện. Cần có: Địa chỉ mượn đồ (thư viện đồ nghề), Tiêu đề bức thư, Thân thư chứa từng chỉ thị rõ ràng và Lời kết thúc chúc thư thành công.
- **Bước 2 (Ánh xạ C++):**
  ```cpp
  #include <iostream>

  int main() {
      std::cout << "Xin chao the gioi!" << std::endl;
      return 0;
  }
  ```
  - `#include <iostream>`: Mượn chiếc hộp dụng cụ nhập/xuất chuẩn (`i` = Input, `o` = Output, `stream` = dòng chảy dữ liệu).
  - `int main()`: Cánh cổng chính — nơi Hệ điều hành và CPU luôn bước vào đầu tiên khi khởi động chương trình.
  - `{ ... }`: Khối phòng làm việc của hàm main.
  - `std::cout << ...`: "Miệng loa phát thanh" hướng dữ liệu từ RAM đẩy ra màn hình console (toán tử `<<` như mũi tên đẩy thông điệp vào loa).
  - Dấu chấm phẩy `;`: Dấu chấm hết một câu mệnh lệnh cho CPU.
  - `return 0;`: Mật mã báo cáo Hệ điều hành: "Mọi việc đã hoàn thành mỹ mãn, không có lỗi gì xảy ra!"
- **Bước 3 (Thuật ngữ & Bản chất):**
  - **Console / Terminal:** Màn hình văn bản đen trắng cổ điển nơi chương trình giao tiếp.
  - **Lỗi biên dịch (Compile Error / Syntax Error):** Người phiên dịch g++ từ chối dịch vì ta vi phạm quy tắc ngữ pháp (quên dấu `;`, viết sai chính tả tên lệnh).

### Module 3: Đặt Tên Cho Những Chiếc Hộp — Biến Số, Kiểu Dữ Liệu & Giao Tiếp 2 Chiều
- **Bước 1 (Đời sống):** Phân loại đồ đạc trong phòng ngủ. Ta không thể để nước vào hộp các-tông, hay nhét chăn bông vào lọ thủy tinh nhỏ. Ta cần những chiếc hộp đúng kích cỡ và dán nhãn bên ngoài (ví dụ: hộp "Tiền tiết kiệm", hộp "Họ tên").
- **Bước 2 (Ánh xạ C++):**
  - Khái niệm **Biến (Variable):** Một ô nhớ được đặt tên trên bàn làm việc RAM để lưu trữ giá trị có thể thay đổi.
  - Các kiểu dữ liệu cơ bản:
    - `int`: Số nguyên (Integer, 4 byte, từ $-2 \times 10^9$ đến $2 \times 10^9$).
    - `double`: Số thực có phần thập phân (8 byte, độ chính xác ~15 chữ số).
    - `char`: Ký tự đơn trong dấu nháy đơn `'A'`, `'z'`, `'9'`.
    - `string`: Chuỗi ký tự / văn bản trong dấu nháy kép `"Lap trinh C++"`.
    - `bool`: Giá trị logic nhị phân (`true` = 1, `false` = 0).
  - Toán tử gán `=`: Hành động nhét giá trị bên tay phải vào chiếc hộp bên tay trái (`int tuoi = 18;`).
  - Giao tiếp 2 chiều: Nhập dữ liệu từ bàn phím bằng `cin >>` (mũi tên hướng dòng nước từ bàn phím chảy vào chiếc hộp biến).
  - Ứng dụng thực hành: Chương trình nhập vào năm sinh $\rightarrow$ tính ra tuổi; Nhập nhiệt độ Celsius $\rightarrow$ in ra Fahrenheit ($F = C \times 1.8 + 32$).
- **Bước 3 (Thuật ngữ & Bản chất bộ nhớ):**
  - `sizeof()`: Thước đo số byte chiếc hộp chiếm dụng trên bàn làm việc RAM.
  - Hiện tượng chia nguyên (`5 / 2 = 2` thay vì `2.5`): Bản chất của phép chia số nguyên trong máy tính và cách ép kiểu sang số thực.

---

## 5. Cấu Trúc Hệ Thống & Tệp Tin Triển Khai

```text
/home/paust/Projects/DayHoc/
├── 00_NhapMon_LapTrinh_CPP/
│   ├── docs/
│   │   └── bai_giang_nhap_mon_cpp.md          # Giáo án chi tiết chuẩn sư phạm 3 bước
│   ├── Code_Mau/
│   │   ├── 01_HelloWorld_GiaiPhauCauTruc.cpp # Mã mẫu phân tích từng thành phần C++
│   │   ├── 02_Bien_KieuDuLieu_ToanTu.cpp      # Mã mẫu về RAM, biến, sizeof, toán tử
│   │   └── 03_NhapXuat_TuongTac_MiniApp.cpp   # Mã mẫu cin/cout, ép kiểu, ứng dụng mini
│   ├── index.html                             # Giao diện web bài giảng tương tác
│   └── lesson-data.js                         # Dữ liệu 3 module, sandbox, bài tập & quiz
├── shared/
│   └── portal-data.js                         # Cập nhật thêm node 'nhap_mon_cpp' vào DAG
└── tests/
    └── verify_00_nhap_mon.sh                  # Script test biên dịch C++ và kiểm tra web
```

---

## 6. Tiêu Chuẩn Bộ Câu Hỏi Trắc Nghiệm (Quality Control)

Theo định hướng trong `idea.md`:
- Trắc nghiệm kiểm tra độ hiểu bản chất (Memory/Execution flow), không bẫy ngữ pháp.
- 4 đáp án trong mỗi câu hỏi phải có độ tương đồng cấu trúc/hình thức **80%–90%**.
- Độ dài của đáp án đúng được phân bố ngẫu nhiên (tránh việc đáp án đúng luôn là đáp án dài nhất).
- Người học buộc phải đọc kỹ toàn bộ 4 lựa chọn và hiểu bản chất cơ chế thì mới chọn đúng.
- Giải thích chi tiết cho cả đáp án đúng và lý do sai của từng đáp án nhiễu.

---

## 7. Rà Soát Builder Check (Tự Đánh Giá Của Người Triển Khai)

- **Vị trí tọa độ DAG trong `portal-data.js`:** 
  - Module `may_cham` hiện có tọa độ `x: 120, y: 80`.
  - Node `nhap_mon_cpp` mới sẽ được bố trí ở `x: 120, y: 0` (hoặc điều chỉnh lưới `track: foundations`), liên kết mũi tên sang `may_cham`.
- **Thư viện dùng chung:** `index.html` của `00_NhapMon_LapTrinh_CPP` sử dụng đường dẫn tương đối `../shared/styles.css`, `../shared/icons.js`, `../shared/highlighter.js`, `../shared/progress.js`, `../shared/lecture-engine.js` giống hệt như các bài `01_DeQuy_Va_DeQuyDuoi`.
- **Cú pháp C++:** Đảm bảo 100% mã nguồn tương thích C++14 trở lên, không có warning khi biên dịch với `-Wall -Wextra`.

---

## 8. Những Việc Để Lại Cho Người Triển Khai (Left to Builder)
- Tinh chỉnh văn phong sư phạm trong `bai_giang_nhap_mon_cpp.md` đảm bảo cuốn hút, dễ hiểu cho lứa tuổi học sinh / người mới nhập môn.
- Thiết kế nội dung mô phỏng tương tác (sandbox / interactive visualization) trong `lesson-data.js` sinh động.
- Hoàn thiện bộ kịch bản test tự động trong `tests/verify_00_nhap_mon.sh`.
