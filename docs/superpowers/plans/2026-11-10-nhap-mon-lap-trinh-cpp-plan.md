# Kế Hoạch Triển Khai (Implementation Plan) — Chuyên Đề: Nhập Môn Lập Trình C++ (Bản Chất Vấn Đề Gốc Đời Sống & Tiệm Bánh Mì Của Anh Phụ Bếp Thật Thà)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng hoàn chỉnh bài giảng nhập môn C++ cho người chưa từng lập trình theo triết lý Problem-First (Ví dụ đời sống Tiệm bánh mì & Anh phụ bếp ngây ngô, nêu rõ hậu quả nếu thiếu cơ chế trước khi giải quyết), gồm giáo án Markdown, 3 file code mẫu C++14, web tương tác với trắc nghiệm chất lượng cao, tích hợp portal DAG và nghiệm thu bằng Subagent đóng vai Người Học Bình Thường.

**Architecture:** Thiết kế tách bạch 5 tầng: Bộ kịch bản kiểm thử tự động & script Subagent Audit (`tests/`) $\rightarrow$ Giáo án Markdown chuẩn sư phạm 3 bước (`docs/`) $\rightarrow$ Kho code mẫu C++14 chuẩn (`Code_Mau/`) $\rightarrow$ Giao diện Web tương tác kết nối hạ tầng chung (`index.html` + `lesson-data.js`) $\rightarrow$ Tích hợp đồ thị kỹ năng tiền đề (`shared/portal-data.js`).

**Tech Stack:** C++14 (`g++ -std=c++14 -Wall -Wextra -Werror`), Vanilla JavaScript (ES6, Lecture Engine, KaTeX auto-render), CSS3 (Hệ màu kỹ thuật dùng chung), Bash scripting, Pi Subagent CLI (`pi --no-session -p`).

**Spec:** [docs/superpowers/specs/2026-11-10-nhap-mon-lap-trinh-cpp-design.md](file:///home/paust/Projects/DayHoc/docs/superpowers/specs/2026-11-10-nhap-mon-lap-trinh-cpp-design.md)

## Global Constraints

- **Triết lý Problem-First:** Tuyệt đối không giới thiệu cú pháp trước khi người học thấm thía "hậu quả nếu thiếu cơ chế đó trong đời sống".
- **Không dùng ẩn dụ công nghệ:** Cấm dùng robot, vi tính, phần cứng trong bước đời sống; dùng hình tượng thuần người thường: "Tiệm bánh mì & Anh phụ bếp thật thà ngây ngô".
- **Không lặp lại MayCham:** Không giải thích Shell, PATH, cờ compiler `-O2`, PE/ELF; giữ sự tập trung hoàn toàn vào bản chất câu lệnh, biến và luồng giao tiếp.
- **Tiêu chuẩn Code C++:** 100% code mẫu phải tương thích chuẩn C++14, biên dịch sạch không warning với `-std=c++14 -Wall -Wextra -Werror`.
- **Trắc nghiệm chất lượng:** Đáp án trong mỗi câu hỏi phải có độ tương đồng hình thức 80–90%, độ dài đáp án đúng phân bố ngẫu nhiên, tập trung kiểm tra độ hiểu bản chất.
- **Nghiệm thu kép:** Bắt buộc vượt qua cả bài kiểm thử kỹ thuật (`verify_00_nhap_mon.sh`) và bài kiểm định sư phạm của Subagent Người Học Bình Thường (`audit_pedagogy_subagent.sh`).

## Review Focus

1. **Thảm họa nếu thiếu ranh giới (Missing `;`):** Người học phải hiểu được tại sao nếu không có chuông ngắt lệnh `;`, anh phụ việc sẽ đứng chờ mãi mãi hoặc các câu bị gộp thành mớ bòng bong vô nghĩa.
2. **Thảm họa nếu thiếu hộp biến (Data loss & Type mismatch):** Người học phải thấy được hình ảnh số 3, giá 15.5 và tên "An" bị rơi vãi, quên mất; hoặc lấy túi lưới đựng nước sốt thì sốt chảy lênh láng (nhầm kiểu dữ liệu).
3. **Thảm họa chia nguyên (`5 / 2 = 2`):** Người học phải hiểu bản chất vì sao 5 ổ bánh mì chia 2 người trong hộp `int` lại làm mất mẩu bánh lẻ `.5`, và cách khắc phục bằng hộp số thực `double`.
4. **Mũi tên ngược nhau của `cin >>` và `cout <<`:** Người học phải nhìn thấy hình ảnh chiếc loa chĩa ra ngoài (`cout <<`) và khe nhận phiếu order rót vào hộp bên trong (`cin >>`) để không bao giờ bị nhầm chiều mũi tên.
5. **Góc nhìn Người Học Bình Thường:** Subagent phải rà soát từng thuật ngữ kỹ thuật, đảm bảo không có từ ngữ chuyên ngành nào bị xuất hiện đột ngột mà thiếu giải thích bằng câu chuyện đời sống.

---

### Task 1: Thiết Lập Bộ Kiểm Thử Tự Động Kỹ Thuật & Script Nghiệm Thu Subagent

**Files:**
- Create: `tests/verify_00_nhap_mon.sh`
- Create: `tests/audit_pedagogy_subagent.sh`

**Interfaces:**
- Consumes: Thư mục `00_NhapMon_LapTrinh_CPP/`, file `bai_giang_nhap_mon_cpp.md`, code mẫu trong `Code_Mau/`, và CLI `pi --no-session -p`.
- Produces: Mã thoát exit 0 nếu đạt chuẩn, exit 1 nếu có lỗi kỹ thuật hoặc chưa đạt điểm sư phạm của Người Học Bình Thường.

- [ ] **Step 1: Viết test kỹ thuật `tests/verify_00_nhap_mon.sh`**
  - Kiểm tra sự tồn tại của các file bắt buộc:
    - `00_NhapMon_LapTrinh_CPP/docs/bai_giang_nhap_mon_cpp.md`
    - `00_NhapMon_LapTrinh_CPP/Code_Mau/01_ChiecChuong_Va_CanhCua_Main.cpp`
    - `00_NhapMon_LapTrinh_CPP/Code_Mau/02_NhungChiecHop_BienVaKieu.cpp`
    - `00_NhapMon_LapTrinh_CPP/Code_Mau/03_LoaVaKheNhan_TiemBanhMi.cpp`
    - `00_NhapMon_LapTrinh_CPP/index.html`
    - `00_NhapMon_LapTrinh_CPP/lesson-data.js`
  - Thử biên dịch 3 file code mẫu với: `g++ -std=c++14 -Wall -Wextra -Werror <file> -o /tmp/test_cpp && /tmp/test_cpp < /dev/null`.
  - Kiểm tra cú pháp JavaScript của `00_NhapMon_LapTrinh_CPP/lesson-data.js` bằng `node -c`.
  - Cấp quyền thực thi: `chmod +x tests/verify_00_nhap_mon.sh`.

- [ ] **Step 2: Viết script nghiệm thu sư phạm Subagent `tests/audit_pedagogy_subagent.sh`**
  - Script đọc file `00_NhapMon_LapTrinh_CPP/docs/bai_giang_nhap_mon_cpp.md`.
  - Gửi prompt đến `pi --no-session -p` với Persona: **Người Học Bình Thường (Ordinary Learner - 12 tuổi hoặc người lớn chưa từng học IT)**.
  - Yêu cầu Subagent chấm điểm trên thang 100 theo 4 tiêu chí trong spec và chỉ ra các điểm bối rối (friction points) nếu có.
  - Cấp quyền thực thi: `chmod +x tests/audit_pedagogy_subagent.sh`.

- [ ] **Step 3: Chạy thử các test để xác nhận FAIL (vì chưa có file nội dung)**
  - Chạy: `bash tests/verify_00_nhap_mon.sh`
  - Kết quả mong đợi: FAIL (thư mục và các file chưa được tạo).

- [ ] **Step 4: Commit**
  ```bash
  git add tests/verify_00_nhap_mon.sh tests/audit_pedagogy_subagent.sh
  git commit -m "test: add verification and subagent audit scripts for cpp intro"
  ```

---

### Task 2: Soạn Thảo Giáo Án Markdown Chuẩn Problem-First

**Files:**
- Create: `00_NhapMon_LapTrinh_CPP/docs/bai_giang_nhap_mon_cpp.md`
- Test: `tests/audit_pedagogy_subagent.sh`

**Interfaces:**
- Consumes: Ý tưởng Tiệm bánh mì & Anh phụ bếp thật thà từ Spec v4.0.
- Produces: Toàn bộ giáo án chi tiết chia làm 2 phần lớn:
  1. *Phần 1: Bức tranh toàn cảnh Vấn Đề Lớn & 3 Vấn Đề Nhỏ (Hậu quả nếu thiếu cơ chế).*
  2. *Phần 2: Giải quyết từng vấn đề nhỏ bằng đời sống $\rightarrow$ ánh xạ C++ $\rightarrow$ thuật ngữ $\rightarrow$ Ghép lại thành tiệm bánh mì hoàn chỉnh.*

- [ ] **Step 1: Viết nội dung Phần 1 — Vấn Đề Lớn & 3 Bế Tắc Nan Giải**
  - Đặt tình huống mở tiệm bánh mì đông khách, thuê Anh Thật Thà phụ việc.
  - Trình bày chi tiết 3 thảm họa nếu không có quy ước:
    - Bế tắc 1: Không có ranh giới khẩu lệnh (đứng chờ mãi hoặc mớ bòng bong).
    - Bế tắc 2: Không có hộp dán nhãn (rơi vãi, quên dữ liệu, đựng nhầm loại, chia bánh mất phần lẻ).
    - Bế tắc 3: Không có kênh giao tiếp 2 chiều (giấu kín trong bếp, không nhận được yêu cầu).

- [ ] **Step 2: Viết nội dung Phần 2 — Giải Quyết Từng Vấn Đề Nhỏ**
  - Giải quyết Vấn đề 1: Cánh cửa ca sáng (`int main`), Chiếc chuông reng một tiếng (Dấu `;`), Báo cáo thành công (`return 0;`).
  - Giải quyết Vấn đề 2: Dàn hộp dán nhãn trên kệ (`int`, `double`, `string`, `char`, `bool`), Hành động múc đồ vào hộp (`=`), Bản chất chia nguyên `5 / 2 = 2`.
  - Giải quyết Vấn đề 3 & Ghép lại: Chiếc loa phóng thanh (`cout <<`), Khe nhận phiếu order (`cin >>`), Ghép toàn bộ thành bản hướng dẫn C++ vận hành trọn vẹn tiệm bánh mì.

- [ ] **Step 3: Chạy script kiểm định Subagent Người Học Bình Thường**
  - Chạy: `bash tests/audit_pedagogy_subagent.sh`
  - Đọc nhận xét của Subagent, tinh chỉnh văn phong nếu phát hiện bất kỳ điểm gợn hoặc thuật ngữ hàn lâm nào khiến người học bình thường bị ngợp.

- [ ] **Step 4: Commit**
  ```bash
  git add 00_NhapMon_LapTrinh_CPP/docs/bai_giang_nhap_mon_cpp.md
  git commit -m "docs: add comprehensive problem-first cpp introductory lecture"
  ```

---

### Task 3: Xây Dựng Kho Code Mẫu C++14 Chuẩn Mực

**Files:**
- Create: `00_NhapMon_LapTrinh_CPP/Code_Mau/01_ChiecChuong_Va_CanhCua_Main.cpp`
- Create: `00_NhapMon_LapTrinh_CPP/Code_Mau/02_NhungChiecHop_BienVaKieu.cpp`
- Create: `00_NhapMon_LapTrinh_CPP/Code_Mau/03_LoaVaKheNhan_TiemBanhMi.cpp`
- Test: `g++ -std=c++14 -Wall -Wextra -Werror`

**Interfaces:**
- Consumes: Quy chuẩn code C++14, chú thích sư phạm bằng tiếng Việt có dấu, bám sát từng bước giải quyết vấn đề nhỏ.
- Produces: 3 file mã nguồn độc lập, chạy được và in ra kết quả trực quan trên console.

- [ ] **Step 1: Viết `01_ChiecChuong_Va_CanhCua_Main.cpp`**
  - Minh họa cấu trúc chương trình đầu tiên: `#include <iostream>`, `int main()`, các lệnh in qua `std::cout`, tầm quan trọng của dấu `;`, và `return 0;`.
  - Chú thích rõ ràng ánh xạ sang câu chuyện đời sống: cửa mở ca, tiếng chuông reng và báo cáo đóng ca.

- [ ] **Step 2: Viết `02_NhungChiecHop_BienVaKieu.cpp`**
  - Minh họa các loại hộp: `int`, `double`, `std::string`, `char`, `bool`.
  - Minh họa kích thước hộp trong RAM bằng `sizeof`.
  - Thực nghiệm hiện tượng chia nguyên: `5 / 2` so với `5.0 / 2` để học sinh tận mắt thấy sự khác biệt giữa hai loại hộp.

- [ ] **Step 3: Viết `03_LoaVaKheNhan_TiemBanhMi.cpp`**
  - Minh họa trọn vẹn ứng dụng Tiệm Bánh Mì:
    - Nhập tên khách (`cin >> tenKhach`).
    - Nhập số lượng bánh (`cin >> soBanh`).
    - Tính toán tiền và lưu vào hộp tổng tiền.
    - Đẩy hóa đơn ra loa `cout <<`.

- [ ] **Step 4: Biên dịch thử nghiệm tất cả các file code mẫu**
  - Biên dịch:
    ```bash
    g++ -std=c++14 -Wall -Wextra -Werror 00_NhapMon_LapTrinh_CPP/Code_Mau/01_ChiecChuong_Va_CanhCua_Main.cpp -o /tmp/test01 && /tmp/test01
    g++ -std=c++14 -Wall -Wextra -Werror 00_NhapMon_LapTrinh_CPP/Code_Mau/02_NhungChiecHop_BienVaKieu.cpp -o /tmp/test02 && /tmp/test02
    g++ -std=c++14 -Wall -Wextra -Werror 00_NhapMon_LapTrinh_CPP/Code_Mau/03_LoaVaKheNhan_TiemBanhMi.cpp -o /tmp/test03 && echo "An 3" | /tmp/test03
    ```
  - Kết quả mong đợi: PASS 100%, không cảnh báo, chạy ra kết quả chuẩn.

- [ ] **Step 5: Commit**
  ```bash
  git add 00_NhapMon_LapTrinh_CPP/Code_Mau/
  git commit -m "feat: add 3 foundational cpp code samples for intro module"
  ```

---

### Task 4: Xây Dựng Giao Diện Web Tương Tác & Bộ Câu Hỏi Trắc Nghiệm Chất Lượng Cao

**Files:**
- Create: `00_NhapMon_LapTrinh_CPP/index.html`
- Create: `00_NhapMon_LapTrinh_CPP/lesson-data.js`
- Test: `node -c 00_NhapMon_LapTrinh_CPP/lesson-data.js`

**Interfaces:**
- Consumes: Hạ tầng web dùng chung (`shared/styles.css`, `shared/lecture-engine.js`, `shared/icons.js`, `shared/highlighter.js`, `shared/progress.js`).
- Produces: Trang web tương tác trọn vẹn gồm 3 module tương ứng 3 vấn đề nhỏ, các thẻ mô phỏng đời sống (Step-life, Step-code, Step-term), sandbox tương tác thử nghiệm chia bánh/tính tiền, và bộ câu hỏi trắc nghiệm đồng dạng 80–90%.

- [ ] **Step 1: Viết `00_NhapMon_LapTrinh_CPP/index.html`**
  - Tái sử dụng cấu trúc HTML chuẩn mực từ `01_DeQuy_Va_DeQuyDuoi/index.html`.
  - Tích hợp KaTeX, CSS shared, progress tracker và lecture engine.

- [ ] **Step 2: Viết `00_NhapMon_LapTrinh_CPP/lesson-data.js`**
  - Bố cục 3 module:
    - *Module 1:* Cánh Cửa Chính & Chiếc Chuông Ngắt Lệnh (Hàm `main`, Dấu `;`, `return 0`).
    - *Module 2:* Dàn Hộp Dán Nhãn Trên Kệ & Phép Chia Bánh Mì (Biến, Kiểu dữ liệu, Chia nguyên vs Chia thực).
    - *Module 3:* Loa Thông Báo & Khe Nhận Phiếu Order (Luồng `cin`/`cout`, ghép lại ứng dụng tiệm bánh mì).
  - Tích hợp các câu hỏi trắc nghiệm chất lượng cao (đáp án đồng dạng 80–90%, kiểm tra sâu tư duy bản chất, có lời giải thích chi tiết cho từng phương án đúng/sai).

- [ ] **Step 3: Kiểm tra cú pháp JavaScript & render web**
  - Chạy: `node -c 00_NhapMon_LapTrinh_CPP/lesson-data.js`
  - Kết quả mong đợi: PASS (không có lỗi cú pháp JS).

- [ ] **Step 4: Commit**
  ```bash
  git add 00_NhapMon_LapTrinh_CPP/index.html 00_NhapMon_LapTrinh_CPP/lesson-data.js
  git commit -m "feat: build interactive web lecture and high-fidelity quiz for cpp intro"
  ```

---

### Task 5: Tích Hợp Đồ Thị Cây Kỹ Năng & Nghiệm Thu Toàn Diện

**Files:**
- Modify: `shared/portal-data.js`
- Test: `bash tests/verify_00_nhap_mon.sh`
- Test: `bash tests/audit_pedagogy_subagent.sh`

**Interfaces:**
- Consumes: Node `nhap_mon_cpp` và đường dẫn tới `00_NhapMon_LapTrinh_CPP/index.html`.
- Produces: Cập nhật đồ thị DAG trên trang chủ `index.html` hiển thị node Nhập môn là nút gốc rễ đầu tiên của toàn bộ học viện, trỏ mũi tên tiền đề vào `may_cham`.

- [ ] **Step 1: Cập nhật `shared/portal-data.js`**
  - Thêm node `nhap_mon_cpp` vào mảng `nodes`:
    - `id: 'nhap_mon_cpp'`, `code: 'MOD-Pre'`
    - `title: 'Nhập Môn Lập Trình C++ (Bản Chất Giao Tiếp)'`
    - `track: 'foundations'`, `category: 'foundation'`
    - `path: '00_NhapMon_LapTrinh_CPP/index.html'`
    - `x: 120, y: 0`
    - `prerequisites: ['Chưa cần kiến thức lập trình trước, chỉ cần biết sử dụng máy tính cơ bản']`
    - `newConcepts: ['Mô hình ủy thác công việc cho người phụ việc ngây ngô', 'Cánh cửa ca làm main(), chiếc chuông ngắt lệnh ;', 'Hộp biến và kiểu dữ liệu (int, double, string, char, bool)', 'Loa phát thanh cout và khe nhận phiếu cin']`
  - Cập nhật node `may_cham` để nhận `nhap_mon_cpp` làm tiền đề liên kết:
    - Sửa `prerequisites` của `may_cham`: `['Đã học xong MOD-Pre: Nhập Môn Lập Trình C++ (Biến, Kiểu dữ liệu, cin/cout)', ...]`

- [ ] **Step 2: Chạy kiểm thử tự động toàn bộ module**
  - Chạy: `bash tests/verify_00_nhap_mon.sh`
  - Kết quả mong đợi: ALL PASS.

- [ ] **Step 3: Chạy nghiệm thu sư phạm Subagent Người Học Bình Thường**
  - Chạy: `bash tests/audit_pedagogy_subagent.sh`
  - Xác nhận Subagent cho điểm xuất sắc (>90/100) và xác nhận học sinh lớp 7/người học bình thường hoàn toàn hiểu bản chất và yêu thích bài giảng.

- [ ] **Step 4: Commit**
  ```bash
  git add shared/portal-data.js
  git commit -m "feat: link cpp intro into curriculum DAG and pass all acceptance tests"
  ```
