# Đặc Tả Thiết Kế (Design Spec) — Nâng Cấp Toàn Diện Bộ Bài Giảng Tương Tác & Kho Code Mẫu "Tự Code Máy Chấm (Stress Testing) C++"

- **Ngày cập nhật:** 2026-11-07
- **Phiên bản:** 2.0 (Nâng cấp chất lượng & tái cấu trúc sư phạm)
- **Thư mục đích:** `/home/paust/Projects/DayHoc/MayCham/`
- **Đối tượng học tập:**
  - **Học sinh:** Lớp lập trình thi đấu C++ (C++14 trở lên), môi trường Code::Blocks trên Windows, cần hiểu sâu bản chất máy tính (phần cứng, OS, Shell, compiler, file `.exe`, luồng dữ liệu) trước khi học công cụ.
  - **Giáo viên:** Môi trường Arch Linux, giảng dạy và demo trực quan trên Web tương tác kết hợp USACO IDE / Terminal.

---

## 1. Mục Tiêu & Các Điểm Cải Tiến Cốt Lõi

Đặc tả này chuẩn hóa 8 điểm nâng cấp toàn diện dựa trên phản hồi sư phạm thực tế:

1. **Hiển thị Toán học & Ký hiệu Chuẩn xác (KaTeX):**
   - Tích hợp KaTeX vào `index.html` để tự động render các công thức `$O(N \log N)$`, `$10^{18}$`, `$A_i \le 10^9$`, $[L, R]$.
   - Loại bỏ các lỗi gõ macro thô trong văn bản (như `$\rightarrow$`, `$\Rightarrow$`), thay thế bằng ký tự Unicode chuẩn (`→`, `⇒`, `≤`, `≥`, `×`).

2. **Khái niệm File `.exe` & Dòng chảy "Code $\rightarrow$ Compiler $\rightarrow$ File Thực Thi":**
   - Giải thích bản chất CPU chỉ hiểu **Mã máy nhị phân (Machine code: 0 và 1)**.
   - Trình biên dịch (Compiler) nhận code `.cpp`, biên dịch thành mã máy và đóng gói theo định dạng Hệ điều hành:
     - **Windows:** Định dạng PE (Portable Executable) mang phần mở rộng `.exe`.
     - **Linux:** Định dạng ELF (Executable and Linkable Format), file binary có cờ thực thi `chmod +x`.
   - Tại sao phải là file `.exe` / ELF? Vì Hệ điều hành cần định dạng này để đọc metadata, cấp phát RAM và trao quyền cho CPU chạy.

3. **Bản chất Cơ Chế Luồng (Stream) trong C++:**
   - Dùng mô hình **"Đường ống nước dữ liệu"** kết nối giữa RAM và thiết bị ngoại vi:
     - `cin`: Luồng đầu vào chuẩn (hút nước từ bàn phím vào biến).
     - `cout`: Luồng đầu ra chuẩn (đẩy nước từ RAM ra màn hình console).
     - `ofstream` / `ifstream`: Luồng file (đường ống dẫn thẳng giữa RAM và file trên ổ cứng).
   - Phân tích cơ chế **Buffer ("Thùng chứa tạm" / "Xe tải gom hàng")**: Giảm thiểu số lần truy xuất đĩa cứng đắt đỏ. Dữ liệu chỉ thực sự ghi xuống đĩa khi xả thùng (`flush`, `endl`, hoặc `close()`).

4. **Giải Nghĩa Cú Pháp & Ý Nghĩa Từ Gốc (Mnemonics):**
   - `ofstream`: Phân tích nguồn gốc `o` (Output), `f` (File), `stream` (Luồng dữ liệu); tên biến luồng `inp`; tham số file; phương thức `close()` đóng van.
   - `mt19937_64`: Phân tích thuật toán Mersenne Twister với số mũ nguyên tố $2^{19937}-1$, bản 64-bit phủ trọn `long long`.
   - `chrono::steady_clock`: Thần thời gian Chronos, đồng hồ chạy đơn điệu không giật lùi, đếm từng tích tắc nanosecond từ mốc epoch (01/01/1970) làm seed độc nhất.

5. **Loại Bỏ Nhãn "(Hỏi học sinh trước khi bấm)":**
   - Chuẩn hóa toàn bộ nhãn câu hỏi thảo luận thành `💬 Câu hỏi thảo luận trên lớp` nhằm giữ phong thái tự nhiên, trang trọng khi trình chiếu.

6. **Tái Cấu Trúc Bố Cục Kiến Thức (Nền tảng & Phần cứng trước):**
   - Đưa toàn bộ nền tảng hệ thống vào **Module 1**: Bit/Byte $\rightarrow$ RAM vs Ổ cứng $\rightarrow$ OS $\rightarrow$ Shell (`cmd.exe` vs `sh`) $\rightarrow$ Sổ danh bạ `PATH` (tại sao gõ được `python`, `g++`, `fc`) $\rightarrow$ Compiler (`g++`) $\rightarrow$ File `.exe` $\rightarrow$ **Giải mã phím F9**.

7. **Hàm `Rand` Dễ Nhớ Làm Chuẩn & Cú Pháp Mở Rộng:**
   - Cú pháp mặc định dễ nhớ trong phòng thi:
     ```cpp
     mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());
     long long Rand(long long l, long long r) {
         return l + (rd() % (r - l + 1));
     }
     ```
   - Cú pháp mở rộng chuẩn C++: `return uniform_int_distribution<long long>(l, r)(rd);` được chú thích như phương án phân phối đều tuyệt đối của thư viện `<random>`.

8. **Thiết Kế Giao Diện Cho Code Xen Kẽ Văn Bản (Inline Code):**
   - Cập nhật CSS: Toàn bộ thẻ `<code>` trong văn bản (`p code`, `li code`, `.comp-table code`, `.hint code`) đổi sang nền đen than `#1C1B18`, chữ sáng `#E6EDF3`, viền mảnh `#33322E`, đồng bộ hoàn hảo với khung code chính.

---

## 2. Kiến Trúc & Cấu Trúc Thư Mục

```text
/home/paust/Projects/DayHoc/MayCham/
├── index.html                          # Trang web bài giảng, nạp KaTeX & CSS/JS
├── styles.css                          # Bảng màu nền kem kỹ thuật, dark inline code
├── app.js                              # Dữ liệu 5 module mới, bộ mô phỏng console/file, quiz
├── tests/
│   ├── verify_web.mjs                  # Test tự động kiểm tra cú pháp C++, KaTeX, toggles
│   └── verify_cpp.sh                   # Test tự động biên dịch tất cả code mẫu C++14
└── Code_Mau/
    ├── README_HuongDan.md              # Hướng dẫn mở và biên dịch trên Code::Blocks & Linux
    ├── Demo_Nho_Tung_Phan/             # Demo ngắn dán vào USACO IDE / Code::Blocks
    │   ├── 01_Buffer_QuenClose.cpp
    │   ├── 02_Random_LoiSeedTime0.cpp
    │   └── 03_Random_GioiHanRand32767.cpp
    ├── Win_CodeBlocks/                 # Mẫu chuẩn Windows + Code::Blocks
    │   ├── 00_Template_MayCham/
    │   │   ├── MAYCHAM.cpp             # Template chuẩn dùng Rand chia dư dễ nhớ
    │   │   ├── BAI1.cpp
    │   │   └── BAI1_TRAU.cpp
    │   ├── 01_MaxSubarray/             # Bài MAXSUB
    │   └── 02_TruyVanDoan_TestManh/    # Bài QUERY
    ├── Linux_Arch/                     # Mẫu chuẩn Linux cho giáo viên
    └── Web_USACO_IDE/                  # Bản gộp 1 file chạy trực tiếp trên Web
```

---

## 3. Thiết Kế Giao Diện (UI/UX) & Phong Cách Kỹ Thuật

### 3.1. Bảng Màu
- **Nền chính trang (`--bg`):** `#F6F3EC` (Kem giấy ấm, không gây chói mắt).
- **Nền thẻ lý thuyết (`--surface`):** `#EFECE4` (Be kem dịu).
- **Khung Code & Console (`--code-bg`):** `#1C1B18` (Đen than kỹ thuật).
- **Inline Code (`p code`, `li code`):**
  - `background`: `#1C1B18`
  - `color`: `#E6EDF3`
  - `border`: `1px solid #33322E`
  - `border-radius`: `4px`
  - `padding`: `2px 6px`
  - `font-family`: `var(--font-mono)`
- **Điểm nhấn tương tác (`--accent`):** Cam gạch `#C84B31`.
- **Trạng thái đúng (`--ok`):** Xanh lá đậm `#1B6B4A`.
- **Trạng thái sai/cảnh báo (`--warn`):** Đỏ gạch đậm `#B91C1C`.

### 3.2. Tích hợp KaTeX Rendering
- Nhúng KaTeX CSS và JS qua CDN (với fallback offline thông minh):
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>
  ```
- Hàm render nội dung gọi `renderMathInElement` sau khi chuyển module hoặc đổi tab, hỗ trợ delimit `$..$` cho inline math.

---

## 4. Chi Tiết Nội Dung 5 Module Bài Giảng

### Module 01: Nền Tảng Hệ Thống: Phần Cứng, OS, Shell, PATH & Bản Chất F9
- **Mục tiêu:** Giúp học sinh hiểu trọn vẹn máy tính làm việc như thế nào từ phần cứng đến khi một dòng code C++ được chạy thành công.
- **Các phần nội dung:**
  1. **1.1. Phần cứng cốt lõi:**
     - Bit (0 và 1) và Byte (8 bit, chứa 1 ký tự). File 0 byte là file rỗng không có ký tự nào.
     - RAM (Bàn làm việc tốc độ cao, mất dữ liệu khi tắt) vs Ổ cứng (Tủ hồ sơ lưu trữ lâu dài nhưng truy xuất chậm).
     - Tại sao hai chương trình khác nhau (`MAYCHAM.exe` và `BAI1.exe`) không thể đọc RAM của nhau mà phải giao tiếp qua file trên ổ cứng.
  2. **1.2. Hệ điều hành (OS) & Shell (Dòng lệnh):**
     - OS (Windows / Linux) là người quản lý toàn quyền phần cứng.
     - Shell là cổng giao tiếp dòng lệnh (`cmd.exe` trên Windows, `sh`/`bash` trên Linux).
     - Sự khác biệt giữa bấm chuột (GUI) và gửi câu lệnh văn bản (CLI).
  3. **1.3. Biến môi trường `PATH`:**
     - Shell tìm chương trình ở đâu? (Thư mục hiện tại trước $\rightarrow$ sau đó tra cứu sổ danh bạ `PATH`).
     - Lệnh `fc.exe` có sẵn trong `C:\Windows\System32` nên gõ ở đâu cũng chạy.
     - Trình biên dịch `g++.exe` trong Code::Blocks nằm sâu trong `MinGW\bin` nhưng không có trong `PATH`, lý giải tại sao gõ trong cmd dễ bị lỗi `'g++' is not recognized`.
  4. **1.4. Trình biên dịch (Compiler) & Dòng chảy mã máy:**
     - CPU chỉ đọc được Machine code (0 và 1).
     - Compiler dịch `.cpp` thành mã máy và đóng gói thành định dạng thực thi:
       - Windows: Định dạng PE với đuôi `.exe`.
       - Linux: Định dạng ELF với cờ thực thi `chmod +x`.
     - OS cần định dạng chuẩn để biết cách cấp phát RAM và đặt con trỏ lệnh cho CPU.
  5. **1.5. Giải mã phím F9 trong Code::Blocks:**
     - Bước 1: Lưu code từ RAM xuống file `.cpp` trên ổ cứng.
     - Bước 2: Gọi ngầm `g++ -O2 BAI1.cpp -o BAI1.exe`.
     - Bước 3: Ra lệnh cho OS nạp `BAI1.exe` lên RAM và mở cửa sổ console đen để thực thi.
- **Thảo luận & Sandbox:** Minh họa sơ đồ tương tác dòng chảy và câu hỏi phản biện về việc tại sao sửa code mà không bấm Build lại thì file `.exe` cũ vẫn chạy.

---

### Module 02: Bản Chất Cơ Chế Luồng (Stream), Buffer & 3 Cách Nhập Xuất C++
- **Mục tiêu:** Hiểu bản chất dòng chảy dữ liệu, lý do sinh ra Buffer và cách dùng `ofstream` an toàn trong máy chấm.
- **Các phần nội dung:**
  1. **2.1. Cơ chế Luồng (Stream) trong C++:**
     - Khái niệm đường ống dẫn dữ liệu nối RAM với bàn phím (`cin`), màn hình (`cout`), và tập tin (`ifstream`/`ofstream`).
     - Toán tử `>>` (hút dữ liệu vào biến) và `<<` (đẩy dữ liệu vào ống).
  2. **2.2. Cơ chế Buffer ("Thùng chứa tạm / Xe tải gom hàng"):**
     - Tại sao phải gom hàng vào Buffer trên RAM trước khi ghi xuống ổ cứng.
     - Các điều kiện kích hoạt van xả Buffer: (1) Thùng đầy, (2) Chương trình thoát, (3) Lệnh xả chủ động (`endl`, `flush`, `close()`).
  3. **2.3. Giải nghĩa cú pháp lệnh `ofstream`:**
     - `o` = Output, `f` = File, `stream` = Luồng $\rightarrow$ Luồng xuất dữ liệu ra file.
     - `ofstream inp(NAME ".inp");`: Khởi tạo đường ống gắn với file `BAI1.inp`.
     - `inp.close();`: Khóa van đường ống, trút cạn sạch Buffer xuống đĩa cứng để các chương trình khác vào đọc ngay.
  4. **2.4. So sánh 3 cơ chế nhập xuất:**
     - `cin/cout`: Nối console mặc định.
     - `freopen`: Bẻ hướng luồng hệ thống — tiện cho bài thi nhưng nguy hiểm trong máy chấm vì bẻ mất `stdout` làm `cout` bị câm.
     - `ofstream`: Luồng độc lập, tách rời hoàn toàn với màn hình, chuẩn mực cho máy chấm.
- **Code Sandbox:** Thí nghiệm công tắc `ofstream` vs `freopen`, và có `inp.close()` vs thiếu `inp.close()` (sinh ra file rỗng 0 byte).

---

### Module 03: Lệnh Hệ Thống `system()`, Shell Con & So Sánh File `fc /w`
- **Mục tiêu:** Làm chủ việc điều khiển tiến trình từ C++ và so sánh file kết quả tự động.
- **Các phần nội dung:**
  1. **3.1. Lệnh `system()` trong C++:**
     - Bản chất: Nhờ OS mở một Shell con chạy dòng lệnh chuỗi rồi đợi tiến trình kết thúc.
  2. **3.2. Mã thoát (Exit Code):**
     - Quy ước hệ điều hành: `0` là hoàn thành êm đẹp / không khác biệt; `!= 0` là có lỗi / phát hiện sai khác.
  3. **3.3. Lệnh so file `fc /w` (Windows) & `diff -w` (Linux):**
     - Ý nghĩa cờ `/w` (white space): Bỏ qua khoảng trắng thừa và ký tự xuống dòng `\r\n` của Windows.
     - Cơ chế dừng ngay lập tức `exit(0)` trong `void compare()` khi phát hiện `WRONG!`, bảo toàn hiện trường file test sai.
- **Code Sandbox:** Bật/tắt cờ `/w`, kiểm tra code Trâu dư dấu cách cuối dòng, hiển thị thông báo `***** BAI1.out ... ***** BAI1.ANS` mô phỏng chân thực.

---

### Module 04: Sinh Số Ngẫu Nhiên: `mt19937_64`, Seed Thời Gian & Hàm Rand Dễ Nhớ
- **Mục tiêu:** Loại bỏ hoàn toàn lỗi sinh ngẫu nhiên yếu và bẫy seed trùng.
- **Các phần nội dung:**
  1. **4.1. Hạn chế của `rand()` & `time(0)`:**
     - Giới hạn `RAND_MAX = 32767` trên Windows không thể sinh mảng $N = 10^5$ hay số $10^9$.
     - `time(0)` chỉ thay đổi mỗi giây 1 lần; chạy 50 test trong 1 giây sẽ sinh ra 50 test giống nhau nếu khởi tạo bên trong hàm sinh.
  2. **4.2. Giải nghĩa cú pháp C++ hiện đại:**
     - `mt19937_64`: Mersenne Twister 64-bit chu kỳ $2^{19937}-1$.
     - `chrono::steady_clock`: Đồng hồ thần thời gian Chronos đếm theo nanosecond.
  3. **4.3. Hàm `Rand(l, r)` dễ nhớ hàng đầu:**
     - Cú pháp: `return l + (rd() % (r - l + 1));`
     - Giải thích: Chia dư cho độ dài đoạn rồi tịnh tiến từ mốc `l`.
  4. **4.4. Cú pháp mở rộng chuẩn C++:**
     - `return uniform_int_distribution<long long>(l, r)(rd);` dùng khi cần phân phối đều tuyệt đối không qua modulo.
  5. **4.5. Vị trí đặt biến `rd`:**
     - Bắt buộc khai báo toàn cục (Global) ở ngoài hàm để không bị reset seed.
- **Code Sandbox:** Thí nghiệm lỗi đặt seed trong hàm vs toàn cục; so sánh `rand()` vs `mt19937_64`.

---

### Module 05: Tổ Chức Template Máy Chấm Hoàn Chỉnh & Nghệ Thuật Tạo Test Mạnh
- **Mục tiêu:** Cung cấp khung code máy chấm chuẩn thi đấu và kỹ năng bắt bug tinh vi.
- **Các phần nội dung:**
  1. **5.1. Khung sườn hoàn chỉnh `MAYCHAM.cpp`:**
     - Tận dụng `#define NAME "BAI1"` và tính năng tự ghép chuỗi của C++.
     - Kết nối toàn bộ kiến thức: `ofstream`, `Rand`, `system()`, `fc /w`, `exit(0)`.
  2. **5.2. Thuật Trâu vs Thuật Full:**
     - Trâu: Đúng tuyệt đối, xuất ra `.ans`.
     - Full: Tối ưu thời gian, xuất ra `.out`.
  3. **5.3. Nghệ thuật sinh test mạnh (MAXSUB & QUERY):**
     - Sinh test kích thước nhỏ để dễ nhẩm tay khi bắt được bug.
     - Đảm bảo tính hợp lệ: Sắp xếp mảng tăng dần trước khi in, sinh $L \le R$.
     - Bẫy test yếu: Thu hẹp miền giá trị để tăng tần suất trùng số, ép xác suất 50% trúng truy vấn để test nhánh tìm thấy.
- **Code Sandbox:** Bắt bug code Full bài QUERY khi có 3 số giống nhau đứng liền nhau.

---

## 5. Kế Hoạch Xác Minh & Kiểm Thử (Verification Plan)

1. **Kiểm tra Giao diện & Render Toán:**
   - Mở bài giảng trên trình duyệt, xác nhận KaTeX render chuẩn các ký hiệu `$O(N \log N)$`, `$10^{18}$`, không còn chữ thô `$\rightarrow$`.
   - Xác nhận toàn bộ inline code hiển thị nền đen than `#1C1B18` nổi bật trên nền kem.
   - Xác nhận tất cả câu hỏi thảo luận không còn chữ `(Hỏi học sinh trước khi bấm)`.

2. **Kiểm thử Tự động Web (`MayCham/tests/verify_web.mjs`):**
   - Đảm bảo 5 module mới với đầy đủ toggles, sandbox và quiz hoạt động trơn tru.
   - Kiểm tra mọi tổ hợp công tắc trong tất cả sandbox đều sinh ra code C++ biên dịch hợp lệ với `g++ -std=c++14`.

3. **Kiểm thử Kho Code Mẫu (`MayCham/tests/verify_cpp.sh`):**
   - Biên dịch 100% các file trong `Win_CodeBlocks/`, `Linux_Arch/`, `Web_USACO_IDE/`, `Demo_Nho_Tung_Phan/` bằng `g++ -std=c++14`.
   - Đảm bảo hàm `Rand` dễ nhớ chạy chính xác trên tất cả các file mẫu.
