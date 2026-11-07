# Kế Hoạch Triển Khai (Implementation Plan) — Nâng Cấp Chất Lượng Bài Giảng & Kho Code Mẫu "Tự Code Máy Chấm (Stress Testing) C++"

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nâng cấp chất lượng sư phạm và kỹ thuật toàn diện cho bộ bài giảng tương tác và kho code mẫu "Tự code máy chấm C++" (sửa hiển thị LaTeX, bổ sung bản chất file `.exe`/compiler/F9/luồng, giải nghĩa cú pháp mnemonics, tái cấu trúc 5 module, đưa hàm Rand dễ nhớ làm chuẩn, và chỉnh giao diện inline code).

**Architecture:** Bố cục lại 5 module tuần tự trong `MayCham/app.js` theo luồng sư phạm từ phần cứng $\rightarrow$ OS/Shell/Compiler $\rightarrow$ Luồng & Buffer $\rightarrow$ Lệnh hệ thống $\rightarrow$ Random $\rightarrow$ Stress testing thực chiến. Tích hợp KaTeX vào `index.html` và cập nhật `styles.css` cho inline code nền đen than. Đồng bộ cú pháp hàm `Rand` dễ nhớ trên toàn bộ kho code mẫu `Code_Mau/` và đảm bảo pass 100% test tự động `verify_web.mjs` và `verify_cpp.sh`.

**Tech Stack:** HTML5, CSS3 (Technical Cream palette, Dark inline code), Vanilla JavaScript (DOM, KaTeX auto-render, regex code tokenizer), C++14 (`g++`, `mt19937_64`, `chrono`, `ofstream`, `system`, `fc /w`).

**Spec:** [docs/superpowers/specs/2026-11-07-may-cham-lecture-design.md](file:///home/paust/Projects/DayHoc/docs/superpowers/specs/2026-11-07-may-cham-lecture-design.md)

## Global Constraints

- **Bảng màu:** Giữ nguyên màu nền kem `#F6F3EC`, bề mặt `#EFECE4`, khung code `#1C1B18`; tuyệt đối không dùng màu tím/lavender/gradient lòe loẹt.
- **Inline Code Style:** Thẻ `code` trong đoạn văn/bảng/danh sách phải có `background: #1C1B18`, `color: #E6EDF3`, `border: 1px solid #33322E`.
- **Nhãn câu hỏi:** Loại bỏ hoàn toàn cụm `(Hỏi học sinh trước khi bấm)`. Thay bằng `💬 Câu hỏi thảo luận trên lớp`.
- **Hàm `Rand`:** Ưu tiên cú pháp dễ nhớ `return l + (rd() % (r - l + 1));` làm mặc định, chú thích `uniform_int_distribution` làm mở rộng.
- **Biên dịch C++14:** 100% code sinh ra từ sandbox và 100% file trong `Code_Mau/` phải biên dịch thành công với `g++ -std=c++14`.
- **Bộ test tự động:** Phải vượt qua `node MayCham/tests/verify_web.mjs` và `bash MayCham/tests/verify_cpp.sh`.

## Review Focus

1. **KaTeX Render:** Công thức toán `$O(N \log N)$`, `$10^{18}$`, `$\le$` phải được render thành typography toán học; các ký tự mũi tên thô `$\rightarrow$`, `$\Rightarrow$` phải đổi thành Unicode `→`, `⇒`.
2. **Inline Code Contrast:** Toàn bộ thẻ `<code>` trong văn bản không được giữ màu nền kem cũ (`#E5E0D3`) mà phải chuyển sang nền đen than `#1C1B18`.
3. **Module 1 Flow:** Phải thể hiện đủ chuỗi: Bit/Byte $\rightarrow$ RAM vs Ổ cứng $\rightarrow$ OS & Shell (`cmd` vs `sh`) $\rightarrow$ Sổ danh bạ `PATH` $\rightarrow$ Compiler $\rightarrow$ File `.exe` (PE) vs Linux binary (ELF) $\rightarrow$ Giải mã F9.
4. **Stream & Mnemonics:** Phải có hình tượng đường ống dẫn nước, cơ chế Buffer ("thùng chứa tạm"), giải nghĩa từ gốc `o-f-stream`, `mt19937_64`, `chrono::steady_clock`.
5. **Rand Function Consistency:** Mọi template `MAYCHAM.cpp` trong `Code_Mau/` và sandbox `app.js` đều phải dùng cú pháp dễ nhớ `l + (rd() % (r - l + 1))` làm mặc định.

---

### Task 1: Nâng Cấp Giao Diện CSS & Nhúng Thư Viện KaTeX

**Files:**
- Modify: `MayCham/index.html:1-41`
- Modify: `MayCham/styles.css:346-356`
- Test: `MayCham/tests/verify_web.mjs`

**Interfaces:**
- Consumes: Thư viện KaTeX CDN từ `index.html`.
- Produces: CSS inline code đen than `#1C1B18` và hàm `window.renderMathInElement` khả dụng trong browser.

- [ ] **Step 1: Viết test kiểm tra CSS inline code và thẻ KaTeX trong `verify_web.mjs`**
  - Thêm assert kiểm tra `styles.css` có quy tắc `background: #1C1B18` (hoặc `var(--code-bg)`) cho `p code, li code, .comp-table code`.
  - Thêm assert kiểm tra `index.html` có thẻ nạp `katex.min.css` và `katex.min.js`.

- [ ] **Step 2: Chạy test để xác nhận test thất bại**
  - Chạy: `node MayCham/tests/verify_web.mjs`
  - Kết quả mong đợi: FAIL do chưa có KaTeX trong `index.html` và CSS inline code chưa đổi.

- [ ] **Step 3: Cập nhật `MayCham/index.html`**
  - Thêm link stylesheet KaTeX CDN: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">`
  - Thêm script KaTeX & auto-render:
    ```html
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>
    ```

- [ ] **Step 4: Cập nhật `MayCham/styles.css`**
  - Thay đổi quy tắc định kiểu inline code:
    ```css
    .comp-table code,
    p code,
    li code,
    .discussion-card code,
    .quiz-card code {
      font-family: var(--font-mono);
      font-size: 0.88em;
      background: var(--code-bg);
      color: #E6EDF3;
      border: 1px solid #33322E;
      padding: 2px 6px;
      border-radius: 4px;
    }
    ```

- [ ] **Step 5: Chạy lại test `verify_web.mjs`**
  - Chạy: `node MayCham/tests/verify_web.mjs`
  - Kết quả mong đợi: PASS các assert về CSS và KaTeX.

---

### Task 2: Cập Nhật Hàm Render KaTeX, Làm Sạch Ký Hiệu & Nhãn Thảo Luận trong `app.js`

**Files:**
- Modify: `MayCham/app.js` (Hàm `renderApp`, `renderDiscussions`, `escapeHtml`)
- Test: `MayCham/tests/verify_web.mjs`

**Interfaces:**
- Consumes: `window.renderMathInElement` nếu có.
- Produces: Hàm tự động quét và render KaTeX sau khi DOM cập nhật; nhãn câu hỏi thảo luận không còn chữ `(Hỏi học sinh trước khi bấm)`.

- [ ] **Step 1: Viết test kiểm tra không còn xuất hiện cụm `(Hỏi học sinh trước khi bấm)` trong `verify_web.mjs`**
  - Thêm assert trong `verify_web.mjs`: `assert.doesNotMatch(js, /hỏi học sinh trước khi bấm/i, 'Không được chứa chữ "Hỏi học sinh trước khi bấm"')`.

- [ ] **Step 2: Chạy test để xác nhận test thất bại**
  - Chạy: `node MayCham/tests/verify_web.mjs`
  - Kết quả: FAIL vì dòng 1746 trong `app.js` vẫn còn cụm này.

- [ ] **Step 3: Cập nhật nhãn và tích hợp trigger KaTeX trong `MayCham/app.js`**
  - Tại dòng hiển thị nhãn thảo luận: Đổi thành `<span class="discussion-label">💬 Câu hỏi thảo luận trên lớp</span>`.
  - Viết hàm trợ giúp `triggerMathRender()`:
    ```javascript
    function triggerMathRender() {
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      }
    }
    ```
  - Gọi `triggerMathRender()` cuối hàm `renderApp()` và sau mỗi lần chuyển tab module hoặc mở đáp án thảo luận.
  - Chuẩn hóa các ký tự mũi tên trong toàn bộ chuỗi HTML: thay `$\rightarrow$` thành `→`, `$\Rightarrow$` thành `⇒`.

- [ ] **Step 4: Chạy lại test `verify_web.mjs`**
  - Chạy: `node MayCham/tests/verify_web.mjs`
  - Kết quả mong đợi: PASS.

---

### Task 3: Tái Cấu Trúc Module 1: Phần Cứng, OS, Shell, PATH, Compiler, File `.exe` & Phím F9

**Files:**
- Modify: `MayCham/app.js:72-350` (Module 01 definition)
- Test: `MayCham/tests/verify_web.mjs`

**Interfaces:**
- Consumes: Khung dữ liệu `MODULES_DATA[0]`.
- Produces: Module 1 hoàn chỉnh với 5 mục lý thuyết (1.1 đến 1.5), câu hỏi thảo luận mới và câu hỏi trắc nghiệm kiểm tra kiến thức nền tảng.

- [ ] **Step 1: Viết test kiểm tra các chủ đề bắt buộc trong Module 1 tại `verify_web.mjs`**
  - Thêm assert kiểm tra Module 1 có chứa các từ khóa: `cmd.exe` hoặc `Shell`, `PATH`, `g++.exe` hoặc `Compiler`, `.exe`, `F9`.

- [ ] **Step 2: Chạy test để xác nhận test thất bại**
  - Chạy: `node MayCham/tests/verify_web.mjs`
  - Kết quả: FAIL do Module 1 hiện tại chưa tích hợp Shell/PATH/F9.

- [ ] **Step 3: Triển khai nội dung mới cho Module 1 trong `MayCham/app.js`**
  - `shortTitle`: `'Nền Tảng Phần Cứng & Biên Dịch'`
  - `title`: `'Nền Tảng Hệ Thống: Phần Cứng, OS, Shell, PATH, Compiler & Bản Chất Phím F9'`
  - **Mục 1.1:** Phần cứng cốt lõi — Bit, Byte, RAM (Bàn làm việc) vs Ổ cứng (Tủ hồ sơ). Tại sao 2 process không đọc được RAM nhau.
  - **Mục 1.2:** Hệ điều hành & Shell (`cmd.exe` vs `sh`) — Giao tiếp dòng lệnh CLI vs GUI bấm chuột.
  - **Mục 1.3:** Biến môi trường `PATH` — Sổ danh bạ tìm lệnh của Shell. Tại sao gõ `python`, `fc` thì hiểu, còn `g++` có thể báo lỗi `'g++' is not recognized`.
  - **Mục 1.4:** Trình biên dịch (Compiler) & Dòng chảy mã máy — CPU chỉ hiểu nhị phân 0/1; định dạng PE (`.exe` trên Windows) và ELF (Linux binary).
  - **Mục 1.5:** Giải mã phím F9 (Build & Run) trong Code::Blocks — Lưu code $\rightarrow$ gọi ngầm `g++ -O2` biên dịch $\rightarrow$ gọi OS mở console đen chạy file `.exe`.
  - Cập nhật các câu hỏi thảo luận & trắc nghiệm xoay quanh bản chất file `.exe`, biến `PATH`, và phím F9.

- [ ] **Step 4: Chạy test `verify_web.mjs`**
  - Chạy: `node MayCham/tests/verify_web.mjs`
  - Kết quả mong đợi: PASS.

---

### Task 4: Tái Cấu Trúc Module 2: Bản Chất Luồng (Stream), Buffer & 3 Cách Nhập Xuất C++

**Files:**
- Modify: `MayCham/app.js:350-650` (Module 02 definition)
- Test: `MayCham/tests/verify_web.mjs`

**Interfaces:**
- Consumes: Khung dữ liệu `MODULES_DATA[1]`.
- Produces: Module 2 mới tập trung vào Luồng (Stream), Buffer, cú pháp mnemonics của `ofstream`, so sánh `cin/cout` vs `freopen` vs `ofstream`, và sandbox thí nghiệm quên `close()`.

- [ ] **Step 1: Viết test kiểm tra Module 2 có giải thích cú pháp mnemonics `ofstream` và cơ chế luồng**
  - Thêm assert trong `verify_web.mjs` xác nhận Module 2 chứa giải thích `o` (Output), `f` (File), `stream` (Luồng dữ liệu) và cơ chế van xả Buffer.

- [ ] **Step 2: Chạy test để xác nhận test thất bại**
  - Chạy: `node MayCham/tests/verify_web.mjs`
  - Kết quả: FAIL vì Module 2 hiện tại là module về Shell/PATH.

- [ ] **Step 3: Triển khai nội dung mới cho Module 2 trong `MayCham/app.js`**
  - `shortTitle`: `'Cơ Chế Luồng & Nhập Xuất File'`
  - `title`: `'Bản Chất Cơ Chế Luồng (Stream), Buffer & 3 Cơ Chế Nhập Xuất C++'`
  - **Mục 2.1:** Khái niệm Luồng (Stream) trong C++ — Mô hình đường ống nước dữ liệu (`cin`, `cout`, `ifstream`, `ofstream`).
  - **Mục 2.2:** Cơ chế Buffer ("Chiếc xe tải gom hàng" / "Thùng chứa tạm") và 3 thời điểm xả van.
  - **Mục 2.3:** Đi sâu cú pháp & ý nghĩa lệnh `ofstream` (`o-f-stream`, tên biến luồng `inp`, `inp.close()`).
  - **Mục 2.4:** So sánh 3 cơ chế: `cin/cout`, `freopen` (bẻ hướng luồng), `ofstream` (luồng file độc lập an toàn cho máy chấm).
  - Tích hợp Sandbox thí nghiệm quên `inp.close()` dẫn đến file rỗng 0 byte (chuyển từ sandbox cũ sang).
  - Cập nhật câu hỏi thảo luận & trắc nghiệm cho Module 2.

- [ ] **Step 4: Chạy test `verify_web.mjs`**
  - Chạy: `node MayCham/tests/verify_web.mjs`
  - Kết quả mong đợi: PASS.

---

### Task 5: Tái Cấu Trúc Module 3: Lệnh Hệ Thống `system()`, Shell Con & So File `fc /w`

**Files:**
- Modify: `MayCham/app.js` (Module 03 definition)
- Test: `MayCham/tests/verify_web.mjs`

**Interfaces:**
- Consumes: Khung dữ liệu `MODULES_DATA[2]`.
- Produces: Module 3 chuyên sâu về `system()`, mã trả về Exit code `0` vs `!= 0`, lệnh `fc /w` vs `diff -w`, cơ chế dừng khẩn cấp `exit(0)`.

- [ ] **Step 1: Viết test kiểm tra Module 3 có đầy đủ lý thuyết `system()`, `fc /w`, `exit(0)` và Sandbox so file**
  - Thêm assert trong `verify_web.mjs` kiểm tra Module 3 có sandbox kiểm tra cờ `/w` và exit code.

- [ ] **Step 2: Chạy test để kiểm tra tính hợp lệ**
  - Chạy: `node MayCham/tests/verify_web.mjs`

- [ ] **Step 3: Cập nhật nội dung Module 3 trong `MayCham/app.js`**
  - `shortTitle`: `'Lệnh Hệ Thống & So File'`
  - `title`: `'Lệnh Hệ Thống system(), Shell Con, Mã Thoát & So File fc /w'`
  - Kết nối với kiến thức Shell ở Module 1: `system()` là C++ nhờ OS mở một Shell con chạy chuỗi lệnh.
  - Giải thích quy ước mã thoát: `0` (thành công / 2 file giống nhau), `!= 0` (lỗi / khác biệt).
  - Lệnh so file `fc /w` (Windows) & `diff -w` (Linux) và ý nghĩa cờ `/w` (whitespace).
  - Sandbox so file: thử nghiệm bật/tắt cờ `/w` và logic `exit(0)`.
  - Cập nhật thảo luận & trắc nghiệm Module 3.

- [ ] **Step 4: Chạy test `verify_web.mjs`**
  - Chạy: `node MayCham/tests/verify_web.mjs`
  - Kết quả mong đợi: PASS.

---

### Task 6: Tái Cấu Trúc Module 4: Random, `mt19937_64`, `chrono` & Hàm `Rand` Dễ Nhớ

**Files:**
- Modify: `MayCham/app.js` (Module 04 definition)
- Test: `MayCham/tests/verify_web.mjs`

**Interfaces:**
- Consumes: Khung dữ liệu `MODULES_DATA[3]`.
- Produces: Module 4 chuẩn hóa giải nghĩa `mt19937_64`, `chrono`, hàm `Rand` dễ nhớ `l + (rd() % (r - l + 1))` làm mặc định, và `uniform_int_distribution` làm mở rộng.

- [ ] **Step 1: Viết test kiểm tra hàm `Rand` trong sandbox Module 4 sử dụng cú pháp chia dư dễ nhớ**
  - Thêm assert trong `verify_web.mjs` xác nhận code sandbox của Module 4 chứa cú pháp `l + (rd() % (r - l + 1))` hoặc `mt19937_64`.

- [ ] **Step 2: Chạy test kiểm tra**
  - Chạy: `node MayCham/tests/verify_web.mjs`

- [ ] **Step 3: Cập nhật nội dung Module 4 trong `MayCham/app.js`**
  - `shortTitle`: `'Random & mt19937_64'`
  - `title`: `'Sinh Số Ngẫu Nhiên: mt19937_64, Seed Thời Gian & Hàm Rand Dễ Nhớ'`
  - Phân tích `rand()` giới hạn 32767 và lỗi seed `time(0)`.
  - Giải nghĩa từ gốc: `mt19937_64` (Mersenne Twister chu kỳ $2^{19937}-1$), `chrono::steady_clock` (thần thời gian Chronos, nanosecond).
  - Định hình hàm `Rand` dễ nhớ làm chuẩn:
    ```cpp
    mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());
    long long Rand(long long l, long long r) {
        return l + (rd() % (r - l + 1));
    }
    ```
  - Chú thích rõ cú pháp mở rộng: `return uniform_int_distribution<long long>(l, r)(rd);`.
  - Sandbox: Demo lỗi khởi tạo seed trong hàm vs toàn cục; demo giới hạn kiểu số.
  - Cập nhật thảo luận & trắc nghiệm Module 4.

- [ ] **Step 4: Chạy test `verify_web.mjs`**
  - Chạy: `node MayCham/tests/verify_web.mjs`
  - Kết quả mong đợi: PASS.

---

### Task 7: Đồng Bộ Kho Code Mẫu (`Code_Mau/`), Module 5 & Xác Minh Toàn Diện

**Files:**
- Modify: `MayCham/Code_Mau/Win_CodeBlocks/00_Template_MayCham/MAYCHAM.cpp`
- Modify: `MayCham/Code_Mau/Win_CodeBlocks/01_MaxSubarray/MAYCHAM.cpp`
- Modify: `MayCham/Code_Mau/Win_CodeBlocks/02_TruyVanDoan_TestManh/MAYCHAM.cpp`
- Modify: `MayCham/Code_Mau/Linux_Arch/01_MaxSubarray/MAYCHAM.cpp`
- Modify: `MayCham/Code_Mau/Linux_Arch/02_TruyVanDoan_TestManh/MAYCHAM.cpp`
- Modify: `MayCham/Code_Mau/Web_USACO_IDE/MAXSUB_AllInOne.cpp`
- Modify: `MayCham/Code_Mau/Web_USACO_IDE/QUERY_AllInOne.cpp`
- Modify: `MayCham/Code_Mau/README_HuongDan.md`
- Modify: `MayCham/app.js` (Module 05 & sandbox MAXSUB/QUERY)
- Test: `MayCham/tests/verify_web.mjs` & `MayCham/tests/verify_cpp.sh`

**Interfaces:**
- Consumes: Cú pháp hàm `Rand` dễ nhớ đã thống nhất.
- Produces: 100% code mẫu C++ dùng cú pháp `Rand` dễ nhớ làm mặc định và biên dịch thành công; Module 5 đồng bộ hoàn toàn.

- [ ] **Step 1: Cập nhật hàm `Rand` trong tất cả file mẫu C++**
  - Thay thế phần định nghĩa hàm `Rand` trong các file `MAYCHAM.cpp` và `AllInOne.cpp`:
    ```cpp
    // Hàm sinh số ngẫu nhiên trong đoạn [l, r] (Cú pháp chia dư dễ nhớ trong phòng thi)
    long long Rand(long long l, long long r) {
        return l + (rd() % (r - l + 1));
        // Cú pháp mở rộng chuẩn C++ (phân phối đều tuyệt đối):
        // return uniform_int_distribution<long long>(l, r)(rd);
    }
    ```

- [ ] **Step 2: Cập nhật Module 5 trong `MayCham/app.js`**
  - Đồng bộ hàm `Rand` trong sandbox MAXSUB và QUERY sang cú pháp chia dư dễ nhớ.
  - Rà soát các câu hỏi thảo luận và trắc nghiệm của Module 5.

- [ ] **Step 3: Chạy test biên dịch toàn bộ kho code mẫu C++**
  - Chạy: `bash MayCham/tests/verify_cpp.sh`
  - Kết quả mong đợi: `ALL CPP VERIFICATION PASSED: 100% code samples compiled successfully with -std=c++14.`

- [ ] **Step 4: Chạy test kiểm thử tự động toàn diện Web**
  - Chạy: `node MayCham/tests/verify_web.mjs`
  - Kết quả mong đợi: `WEB VERIFICATION PASSED: All 5 modules, all toggle combinations, copyable code, and quizzes verified.`

- [ ] **Step 5: Kiểm tra trực quan trên trình duyệt**
  - Xác nhận KaTeX hiển thị đẹp, công thức không bị lỗi font.
  - Xác nhận inline code có nền đen than và độ tương phản cao.
  - Xác nhận toàn bộ 5 module chuyển đổi mượt mà bằng phím số 1–5 hoặc bấm chuột.
