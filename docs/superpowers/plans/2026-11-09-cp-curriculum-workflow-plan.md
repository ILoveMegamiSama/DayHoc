# Hệ Sinh Thái Bài Giảng CP Tương Tác & Workflow Chuẩn Hóa — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng cổng học tập trung tâm (`index.html`) kèm Cây Kỹ Năng CP, bộ giao diện/logic dùng chung (`shared/`) có chế độ Sáng/Tối + Auto-save `user_progress.json`, 4 bộ bài giảng tương tác chuẩn mẫu (3 bài kiến thức đơn lẻ + 1 bài kết hợp về Đệ quy đuôi, Ngăn xếp & Quy hoạch động, Hai con trỏ) kèm `.md`, `Code_Mau/*.cpp`, Bài tập Debug, Quiz Trace Code, và đóng gói thành Skill workflow tái sử dụng.

**Architecture:** Kiến trúc "Hạt nhân Dùng Chung (`shared/`) + Thư mục Bài Giảng Độc Lập" chạy trực tiếp trên trình duyệt qua giao thức `file://` hoặc static server mà không cần backend. Dữ liệu mỗi bài giảng được biên soạn trước ở `docs/*.md` và xuất ra `lesson-data.js` (`window.LESSON_DATA`), được dựng tự động bởi `shared/lecture-engine.js` và đồng bộ tiến trình qua `shared/progress.js`.

**Tech Stack:** HTML5, CSS3 Variables (Light/Dark theme), Vanilla JavaScript (ES6+), SVG (Interactive Skill Tree & Knowledge Graph), KaTeX 0.16.8, C++14 (`g++ -std=c++14 -O2 -Wall`), Node.js (`node:assert`, `node:vm`) cho kiểm thử tự động.

**Spec:** `docs/superpowers/specs/2026-11-09-cp-curriculum-workflow-design.md`

## Global Constraints

- Bảng màu Sáng mặc định: `--bg: #F6F3EC`, `--surface-elevated: #FAF8F3`, `--ink: #181816`, `--accent: #C84B31`; Chế độ Tối (`[data-theme="dark"]`): `--bg: #121316`, `--surface-elevated: #1A1C20`, `--ink: #E6E8EC`, `--accent: #E06C50`. Không sử dụng màu tím (`violet`, `lavender`, `#8b5cf6`, `#a855f7`).
- Tuyệt đối không sử dụng icon emoji màu mè sặc sỡ; toàn bộ icon phải là SVG nét mảnh đơn sắc (`stroke="currentColor"`) trong `shared/icons.js`.
- File `user_progress.json` phải nằm trong `.gitignore` và **không tồn tại trên Git repo**; tiến trình tự động lưu tức thì vào `localStorage['cp_dayhoc_progress_v1']` và hỗ trợ ghi đè tự động xuống `user_progress.json` thông qua File System Access API (`window.showSaveFilePicker` / `IndexedDB` handle) kèm nút Xuất/Nạp JSON dự phòng.
- Mọi bài giảng phải tuân thủ phương pháp sư phạm: **Bắt đầu từ Vấn đề lớn $\rightarrow$ Tách thành các vấn đề nhỏ ($V_1, V_2, \dots$) rồi ghép lại**, và trong mỗi mục đi theo đúng 3 bước: **Bước 1 (Vấn đề & Cách giải quyết ngoài đời sống) $\rightarrow$ Bước 2 (Ánh xạ vào lập trình) $\rightarrow$ Bước 3 (Giải nghĩa tên gọi & Thuật ngữ liên kết ngược về ví dụ đời sống)**.
- Mỗi bài giảng bắt buộc có: Đồ thị kiến thức (Knowledge Graph SVG), Card kiến thức rộng 1–2 cột (`.knowledge-card`, `.card-split`), Phòng thí nghiệm Code (`sandboxes`), **Bài tập Debug tương tác (`debugExercises`)**, Câu hỏi kiểm tra (`quiz` gồm `trace`, `single`, `multiple`, trong đó `trace` chiếm $\ge 40\%$, độ dài phương án trong cùng 1 câu lệch nhau $\le 35\%$, độ tương đồng từ vựng/cấu trúc cao), và Danh sách bài tập thực chiến (`practiceProblems`).
- Toàn bộ file `.cpp` trong `Code_Mau/` phải biên dịch thành công với `g++ -std=c++14 -O2 -Wall`.

## Review Focus

- Khi mở trực tiếp bằng giao thức `file://` trên trình duyệt mà chưa liên kết file `user_progress.json` hoặc trình duyệt không hỗ trợ `showSaveFilePicker`, `shared/progress.js` vẫn phải lưu/đọc tự động vào `localStorage` mà không ném lỗi `ReferenceError` hay `SecurityError`.
- Trong câu hỏi chọn nhiều đáp án (`type: "multiple"`), người học phải tích chọn các phương án và bấm nút `[ Kiểm tra đáp án ]` thì hệ thống mới chấm điểm; chỉ được tính là đúng khi tập hợp chỉ số đã chọn trùng khớp hoàn toàn với mảng `correct: number[]`.
- Trong Bài tập Debug (`debugExercises`), khi người học chọn dòng lỗi (`bugLine`) và chọn phương án sửa (`patchIdx`), giao diện phải hiển thị rõ phản hồi đúng/sai, giải thích tại sao bộ dữ liệu đầu vào làm dòng đó chạy sai và cập nhật trạng thái vào tiến trình học.
- Bộ tô màu cú pháp `shared/highlighter.js` không được làm hỏng các thẻ HTML hoặc biểu thức toán học KaTeX `$...$` khi tô màu inline code `<code>`.
- Kiểm định tự động chất lượng Quiz (`tests/verify_all_lectures.mjs`) phải bắt được các câu hỏi có phương án đúng dài vượt trội (chênh lệch độ dài giữa phương án dài nhất và ngắn nhất $> 35\%$ độ dài phương án dài nhất) hoặc thiếu câu hỏi dạng `trace`.

---

### Task 1: Hạ Tầng Dùng Chung (`shared/`), Cổng Học Tập Trung Tâm (`index.html`), `.gitignore` & Khung Kiểm Thử

**Files:**
- Create: `.gitignore`
- Create: `shared/styles.css`
- Create: `shared/icons.js`
- Create: `shared/progress.js`
- Create: `shared/highlighter.js`
- Create: `shared/lecture-engine.js`
- Create: `shared/portal-data.js`
- Create: `index.html`
- Create: `tests/verify_all_lectures.mjs`
- Create: `tests/verify_all_cpp.sh`

**Interfaces:**
- Produces:
  - `window.CP_ICONS`: `{ sun, moon, check, cross, arrowRight, arrowLeft, code, bug, terminal, graph, book, externalLink, save, upload, linkFile, layers, play, copy }` (mỗi trường là chuỗi `<svg ... stroke="currentColor" ...>`)
  - `window.CP_PROGRESS`:
    - `loadProgress() -> { version: 1, updatedAt: string, theme: 'light'|'dark', quizzes: Record<string, any>, debugs: Record<string, boolean>, problems: Record<string, boolean>, modulesVisited: Record<string, boolean> }`
    - `saveProgress(partialUpdate: object) -> Promise<boolean>`
    - `recordQuizAnswer(lessonId: string, modId: string, qIdx: number, answer: number | number[], isCorrect: boolean) -> void`
    - `recordDebugSolved(lessonId: string, debugId: string, isSolved: boolean) -> void`
    - `toggleProblemSolved(lessonId: string, probId: string) -> boolean`
    - `bindAutoSaveFile() -> Promise<{ ok: boolean, filename?: string, reason?: string }>`
    - `exportProgressJson() -> void`
    - `importProgressJson(file: File) -> Promise<boolean>`
    - `getLessonSummary(lessonData: object) -> { quizCorrect: number, quizTotal: number, debugSolved: number, debugTotal: number, probSolved: number, probTotal: number, percent: number }`
  - `window.highlightCpp(rawCode: string, changedLines?: number[]) -> string`
  - `window.highlightInlineCodeSnippet(codeHtml: string) -> string`
  - `window.highlightAllInlineCode(rootEl?: HTMLElement) -> void`
  - `window.PORTAL_DATA`: `{ title: string, subtitle: string, tracks: Array<object>, nodes: Array<{ id: string, code: string, title: string, category: 'foundation'|'single'|'combined', path: string, summary: string, x: number, y: number }>, edges: Array<{ from: string, to: string, label: string, detail: string }> }`
  - `window.initLecturePage(lessonData: object) -> void`

- [ ] **Step 1: Viết script kiểm thử khung hạ tầng trong `tests/verify_all_lectures.mjs` và `tests/verify_all_cpp.sh`**

```javascript
// Trong tests/verify_all_lectures.mjs: kiểm tra sự tồn tại và giao diện của .gitignore, index.html, shared/*
import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const gitignore = fs.readFileSync('.gitignore', 'utf8');
assert.match(gitignore, /user_progress\.json/, '.gitignore phải chứa user_progress.json');
assert.equal(fs.existsSync('user_progress.json'), false, 'user_progress.json không được nằm sẵn trên repo');

const sharedCss = fs.readFileSync('shared/styles.css', 'utf8');
assert.match(sharedCss, /#F6F3EC/i, 'shared/styles.css phải có màu nền sáng #F6F3EC');
assert.match(sharedCss, /\[data-theme="dark"\]/, 'shared/styles.css phải hỗ trợ [data-theme="dark"]');
assert.match(sharedCss, /\.knowledge-card/, 'shared/styles.css phải có .knowledge-card');
assert.match(sharedCss, /\.card-split/, 'shared/styles.css phải có .card-split 2 cột');
assert.doesNotMatch(sharedCss, /violet|lavender|#8b5cf6|#a855f7/i, 'Không được dùng màu tím');
```

- [ ] **Step 2: Chạy test để xác nhận trạng thái FAIL ban đầu**

Run: `node tests/verify_all_lectures.mjs`
Expected: FAIL với lỗi `ENOENT: no such file or directory, open '.gitignore'`

- [ ] **Step 3: Tạo `.gitignore`, `shared/styles.css`, `shared/icons.js`, `shared/progress.js`, `shared/highlighter.js`, `shared/lecture-engine.js`, `shared/portal-data.js`, và `index.html`**

- `.gitignore`: Bỏ qua `user_progress.json`, `*.exe`, `*.o`, `*.out`, `.DS_Store`.
- `shared/styles.css`: Định nghĩa biến màu Light/Dark, header cố định, nút chuyển chế độ Sáng/Tối, nút Auto-save `user_progress.json`, bản đồ SVG (`.knowledge-graph-wrap`), `.knowledge-card` và `.card-split` (tối đa 2 cột cân đối), các hộp sư phạm `.step-life` (Bước 1: Đời sống), `.step-code` (Bước 2: Ánh xạ lập trình), `.step-term` (Bước 3: Giải nghĩa thuật ngữ gắn với đời sống), `.subproblem-banner`, khung Code Sandbox kiểu `MayCham`, khung Bài tập Debug (`.debug-card`), khung Quiz 3 loại (`trace`, `single`, `multiple`), và bảng Bài tập thực chiến (`.practice-table`).
- `shared/progress.js`: Cài đặt `window.CP_PROGRESS` với Auto-save Tầng 1 (`localStorage['cp_dayhoc_progress_v1']`) ở mọi thao tác và Auto-save Tầng 2 dùng `IndexedDB` lưu `FileSystemFileHandle` để ghi đè ngầm `user_progress.json` khi đã liên kết.
- `shared/lecture-engine.js`: Cài đặt `window.initLecturePage(lessonData)` hiển thị đầy đủ Knowledge Graph nội bộ của bài giảng, các tab Module, các Card kiến thức 1–2 cột, Code Sandboxes có Toggles + Copy + Run, Bài tập Debug tương tác (chọn dòng lỗi + chọn bản vá + giải thích), Quiz (Single, Multi-select có nút kiểm tra, Trace code có khung hiển thị code đánh số dòng), và Bảng bài tập thực chiến có checkbox lưu tiến trình.
- `index.html` & `shared/portal-data.js`: Cổng chính hiển thị Cây Kỹ Năng CP bằng SVG tương tác (nối `MayCham`, `01_DeQuy_Va_DeQuyDuoi`, `02_NganXep_Va_NganXepDonDieu`, `03_HaiConTro`, `04_KetHop_NganXep_QHD_HaiConTro`), bảng tổng hợp tiến trình cá nhân, thanh điều khiển Auto-save `user_progress.json` và chuyển đổi Sáng/Tối.

- [ ] **Step 4: Chạy lại test hạ tầng để xác nhận PASS**

Run: `node tests/verify_all_lectures.mjs`
Expected: PASS phần kiểm tra hạ tầng `shared/` và `index.html`.

- [ ] **Step 5: Commit Task 1**

```bash
git add .gitignore index.html shared/ tests/
git commit -m "feat: build shared lecture engine, auto-save progress, and root skill tree portal"
```

---

### Task 2: Bài Giảng Đơn Lẻ 01 — `01_DeQuy_Va_DeQuyDuoi` (Đệ Quy & Đệ Quy Đuôi)

**Files:**
- Create: `01_DeQuy_Va_DeQuyDuoi/docs/bai_giang_de_quy_duoi.md`
- Create: `01_DeQuy_Va_DeQuyDuoi/Code_Mau/01_DeQuyThuong_TranBoNho.cpp`
- Create: `01_DeQuy_Va_DeQuyDuoi/Code_Mau/02_DeQuyDuoi_BienTichLuy.cpp`
- Create: `01_DeQuy_Va_DeQuyDuoi/Code_Mau/03_BienDoi_DeQuyDuoi_Sang_VongLap.cpp`
- Create: `01_DeQuy_Va_DeQuyDuoi/lesson-data.js`
- Create: `01_DeQuy_Va_DeQuyDuoi/index.html`
- Modify: `tests/verify_all_lectures.mjs`

**Interfaces:**
- Consumes: `window.initLecturePage`, `window.CP_PROGRESS`, `window.CP_ICONS`, `window.highlightCpp` từ `../shared/`
- Produces: `window.LESSON_DATA` tại `01_DeQuy_Va_DeQuyDuoi/lesson-data.js` với `id: 'de_quy_duoi'`, 3 modules, Knowledge Graph SVG, Code Sandboxes, Debug Exercises, Quiz (`trace`, `single`, `multiple`), và Practice Problems.

- [ ] **Step 1: Bổ sung test kiểm định Bài 01 vào `tests/verify_all_lectures.mjs`**

Kiểm tra sự tồn tại của `01_DeQuy_Va_DeQuyDuoi/docs/bai_giang_de_quy_duoi.md`, 3 file `.cpp` trong `Code_Mau/`, cấu trúc `window.LESSON_DATA` (phải có tách vấn đề nhỏ, đủ 3 bước Đời sống $\rightarrow$ Ánh xạ lập trình $\rightarrow$ Giải nghĩa thuật ngữ, $\ge 2$ bài tập Debug, $\ge 40\%$ câu hỏi Quiz là `trace`, chênh lệch độ dài phương án $\le 35\%$).

- [ ] **Step 2: Chạy test để xác nhận FAIL khi chưa có Bài 01**

Run: `node tests/verify_all_lectures.mjs`
Expected: FAIL do thiếu `01_DeQuy_Va_DeQuyDuoi/lesson-data.js`.

- [ ] **Step 3: Soạn `01_DeQuy_Va_DeQuyDuoi/docs/bai_giang_de_quy_duoi.md`, viết `Code_Mau/*.cpp`, và tạo `lesson-data.js` + `index.html`**

- Nội dung chia thành 3 vấn đề nhỏ ghép lại:
  1. **Module 1 (Vấn đề nhỏ 1 — Chia việc lớn thành việc nhỏ giống hệt):** Từ chuyện xếp hàng hỏi số thứ tự ngoài đời $\rightarrow$ hàm tự gọi lại chính nó trong C++ $\rightarrow$ giải nghĩa từ **"Đệ quy"** ("Đệ" = chuyển tiếp từng bậc, "Quy" = quay về) và **"Điều kiện dừng" (Base case)**.
  2. **Module 2 (Vấn đề nhỏ 2 — Tại sao chờ người trước trả lời lại gây sập bộ nhớ?):** Từ chuyện mỗi người phải cầm tờ giấy đứng chờ cộng thêm phần mình $\rightarrow$ cơ chế chồng các khay nhớ trên RAM $\rightarrow$ giải nghĩa **"Khung ngăn xếp lời gọi" (Stack Frame)** và **"Tràn ngăn xếp" (Stack Overflow)**.
  3. **Module 3 (Vấn đề nhỏ 3 & Ghép lại — Giao sổ tổng kết ngay để không ai phải đứng chờ):** Từ cuốn sổ cộng dồn chuyền tay ngoài đời $\rightarrow$ đưa phép cộng vào tham số tích lũy và đặt lời gọi hàm ở vị trí cuối cùng tuyệt đối $\rightarrow$ giải nghĩa **"Đệ quy đuôi" (Tail Recursion)**, **"Biến tích lũy" (Accumulator)**, **"Tối ưu hóa lời gọi đuôi" (Tail Call Optimization - TCO)** và cách tự chuyển thành vòng lặp `while` trong 30 giây.
- Tạo 2 Bài tập Debug (bẫy: tưởng `return 1 + dem(n - 1)` hay `return dem(n - 1) + 0` là đệ quy đuôi; bẫy: cập nhật biến tích lũy sai thứ tự hoặc thiếu điều kiện dừng cho $n = 0$).
- Tạo bộ Quiz gồm câu hỏi Trace từng bước biến `n` và `tichLuy`, câu hỏi Single-choice và Multi-select đạt chuẩn QC.

- [ ] **Step 4: Chạy test web và test biên dịch C++**

Run: `node tests/verify_all_lectures.mjs && bash tests/verify_all_cpp.sh`
Expected: PASS cho Bài 01.

- [ ] **Step 5: Commit Task 2**

```bash
git add 01_DeQuy_Va_DeQuyDuoi/ tests/
git commit -m "feat(01-de-quy-duoi): add markdown lecture, C++14 samples, debug exercises, and trace quizzes"
```

---

### Task 3: Bài Giảng Đơn Lẻ 02 — `02_NganXep_Va_NganXepDonDieu` (Ngăn Xếp & Ngăn Xếp Đơn Điệu)

**Files:**
- Create: `02_NganXep_Va_NganXepDonDieu/docs/bai_giang_ngan_xep_don_dieu.md`
- Create: `02_NganXep_Va_NganXepDonDieu/Code_Mau/01_NganXepCoBan_KhopNgoac.cpp`
- Create: `02_NganXep_Va_NganXepDonDieu/Code_Mau/02_NganXepDonDieu_PhanTuLonHonGanNhat.cpp`
- Create: `02_NganXep_Va_NganXepDonDieu/Code_Mau/03_MoRongBienTraiPhai_HinhChuNhatLonNhat.cpp`
- Create: `02_NganXep_Va_NganXepDonDieu/lesson-data.js`
- Create: `02_NganXep_Va_NganXepDonDieu/index.html`
- Modify: `tests/verify_all_lectures.mjs`

**Interfaces:**
- Consumes: `window.initLecturePage`, `window.CP_PROGRESS`, `window.CP_ICONS`, `window.highlightCpp`
- Produces: `window.LESSON_DATA` tại `02_NganXep_Va_NganXepDonDieu/lesson-data.js` với `id: 'ngan_xep_don_dieu'`.

- [ ] **Step 1: Bổ sung test kiểm định Bài 02 vào `tests/verify_all_lectures.mjs`**

Kiểm tra đầy đủ Markdown, `Code_Mau/*.cpp`, `window.LESSON_DATA`, bài tập Debug và chuẩn Quiz QC cho `02_NganXep_Va_NganXepDonDieu`.

- [ ] **Step 2: Chạy test để xác nhận FAIL khi chưa có Bài 02**

Run: `node tests/verify_all_lectures.mjs`
Expected: FAIL do thiếu `02_NganXep_Va_NganXepDonDieu/lesson-data.js`.

- [ ] **Step 3: Soạn `02_NganXep_Va_NganXepDonDieu/docs/bai_giang_ngan_xep_don_dieu.md`, viết `Code_Mau/*.cpp`, và tạo `lesson-data.js` + `index.html`**

- Nội dung chia thành 3 vấn đề nhỏ ghép lại:
  1. **Module 1 (Vấn đề nhỏ 1 — Lưu và lấy phần tử vừa mới gặp xong):** Chồng đĩa rửa bát / ống cầu lông ngoài đời $\rightarrow$ cấu trúc `std::stack` hoặc `vector` trong C++ $\rightarrow$ giải nghĩa **"Ngăn xếp" (Stack)**, **"Vào sau - Ra trước" (LIFO)**.
  2. **Module 2 (Vấn đề nhỏ 2 — Loại bỏ ngay những phần tử bị "che khuất" vĩnh viễn):** Bài toán tìm người cao hơn gần nhất đứng trước trong hàng dọc; khi một người cao bước vào, những người thấp hơn đứng trước bị che khuất hoàn toàn nên bước ra khỏi hàng chờ $\rightarrow$ vòng lặp `while (!st.empty() && a[st.top()] <= a[i]) st.pop();` $\rightarrow$ giải nghĩa **"Ngăn xếp đơn điệu" (Monotonic Stack)** ("Đơn" = một, "Điệu" = chiều hướng).
  3. **Module 3 (Vấn đề nhỏ 3 & Ghép lại — Lưu vị trí thay vì giá trị & Tìm biên mở rộng sang 2 phía):** Tại sao lưu chỉ số `i` vào ngăn xếp mạnh hơn lưu giá trị `a[i]`? Chứng minh tại sao 2 vòng lặp lồng nhau (`for` và `while`) chỉ tốn tối đa $2N$ bước (**Độ phức tạp khấu hao / Amortized $O(1)$**) và ứng dụng tìm hình chữ nhật lớn nhất.
- Tạo Bài tập Debug (bẫy: quên kiểm tra `!st.empty()` trước khi gọi `st.top()`; bẫy: nhầm dấu `<` và `<=` khi mảng có các phần tử bằng nhau làm đếm trùng hoặc bỏ sót; bẫy: lưu giá trị thay vì chỉ số nên không tính được khoảng cách).
- Tạo bộ Quiz tập trung mạnh vào việc **Trace trạng thái của ngăn xếp `st` qua từng bước `i`** và danh sách bài tập thực chiến (CSES Nearest Smaller Values, VNOJ KAGAIN, Histogram...).

- [ ] **Step 4: Chạy test web và test biên dịch C++**

Run: `node tests/verify_all_lectures.mjs && bash tests/verify_all_cpp.sh`
Expected: PASS cho Bài 01 và Bài 02.

- [ ] **Step 5: Commit Task 3**

```bash
git add 02_NganXep_Va_NganXepDonDieu/ tests/
git commit -m "feat(02-ngan-xep-don-dieu): add markdown lecture, C++14 samples, debug exercises, and trace quizzes"
```

---

### Task 4: Bài Giảng Đơn Lẻ 03 — `03_HaiConTro` (Kỹ Thuật Hai Con Trỏ)

**Files:**
- Create: `03_HaiConTro/docs/bai_giang_hai_con_tro.md`
- Create: `03_HaiConTro/Code_Mau/01_HaiConTroNguocChieu_TimCapTongBangS.cpp`
- Create: `03_HaiConTro/Code_Mau/02_HaiConTroCungChieu_DoanConDaiNhat.cpp`
- Create: `03_HaiConTro/Code_Mau/03_DemSoDoanCon_ThoaManDieuKien.cpp`
- Create: `03_HaiConTro/lesson-data.js`
- Create: `03_HaiConTro/index.html`
- Modify: `tests/verify_all_lectures.mjs`

**Interfaces:**
- Consumes: `window.initLecturePage`, `window.CP_PROGRESS`, `window.CP_ICONS`, `window.highlightCpp`
- Produces: `window.LESSON_DATA` tại `03_HaiConTro/lesson-data.js` với `id: 'hai_con_tro'`.

- [ ] **Step 1: Bổ sung test kiểm định Bài 03 vào `tests/verify_all_lectures.mjs`**

- [ ] **Step 2: Chạy test để xác nhận FAIL khi chưa có Bài 03**

Run: `node tests/verify_all_lectures.mjs`
Expected: FAIL do thiếu `03_HaiConTro/lesson-data.js`.

- [ ] **Step 3: Soạn `03_HaiConTro/docs/bai_giang_hai_con_tro.md`, viết `Code_Mau/*.cpp`, và tạo `lesson-data.js` + `index.html`**

- Nội dung chia thành 3 vấn đề nhỏ ghép lại:
  1. **Module 1 (Vấn đề nhỏ 1 — Dùng thứ tự sắp xếp để loại bỏ hàng loạt cặp thừa):** Tìm 2 món hàng có tổng giá đúng bằng $S$ trên kệ đã xếp từ rẻ đến đắt bằng cách đặt 2 ngón tay ở 2 đầu kệ $\rightarrow$ dịch chỉ số `trai++` hoặc `phai--` $\rightarrow$ giải nghĩa **"Hai con trỏ ngược chiều" (Opposite-Direction Two Pointers)**.
  2. **Module 2 (Vấn đề nhỏ 2 — Giữ một khung co giãn cùng tiến về phía trước):** Con sâu đo bò trên cành cây (đầu tiến lên ăn thêm lá, đuôi co lại khi quá nặng) $\rightarrow$ kỹ thuật duy trì đoạn `[trai..phai]` có tổng $\le S$ trên mảng số dương $\rightarrow$ giải nghĩa **"Hai con trỏ cùng chiều" / "Cửa sổ trượt" (Sliding Window)**.
  3. **Module 3 (Vấn đề nhỏ 3 & Ghép lại — Đếm số đoạn con và Điều kiện sống còn để dùng Hai con trỏ):** Tại sao khi cố định `phai`, nếu đoạn `[trai..phai]` hợp lệ thì có ngay `phai - trai + 1` đoạn con kết thúc tại `phai`? Khi nào Hai con trỏ **bị hỏng hoàn toàn** (khi mảng có cả số âm làm tổng không còn tăng/giảm một chiều)?
- Tạo Bài tập Debug (bẫy: cập nhật `ketQua = max(ketQua, phai - trai + 1)` **trước** vòng lặp `while (tong > S)` làm lấy cả đoạn không hợp lệ; bẫy: áp dụng cửa sổ trượt tính tổng trên mảng có số âm).
- Tạo bộ Quiz Trace vị trí `(trai, phai)` và giá trị `tong` qua từng bước, kèm bài tập thực chiến (CSES Sum of Two Values, Subarray Sums I, VNOJ NKSGAME, Codeforces EDU Two Pointers).

- [ ] **Step 4: Chạy test web và test biên dịch C++**

Run: `node tests/verify_all_lectures.mjs && bash tests/verify_all_cpp.sh`
Expected: PASS cho Bài 01, 02, 03.

- [ ] **Step 5: Commit Task 4**

```bash
git add 03_HaiConTro/ tests/
git commit -m "feat(03-hai-con-tro): add markdown lecture, C++14 samples, debug exercises, and trace quizzes"
```

---

### Task 5: Bài Giảng Kết Hợp 04 — `04_KetHop_NganXep_QHD_HaiConTro` (Ngăn Xếp với Quy Hoạch Động & Sợi Dây Liên Kết Hai Con Trỏ)

**Files:**
- Create: `04_KetHop_NganXep_QHD_HaiConTro/docs/bai_giang_ket_hop_ngan_xep_qhd_hai_con_tro.md`
- Create: `04_KetHop_NganXep_QHD_HaiConTro/Code_Mau/01_TuDeQuy_Sang_NganXep_Va_QHD.cpp`
- Create: `04_KetHop_NganXep_QHD_HaiConTro/Code_Mau/02_NganXepDonDieu_ToiUu_QuyHoachDong.cpp`
- Create: `04_KetHop_NganXep_QHD_HaiConTro/Code_Mau/03_KetHop_HangDoiDonDieu_CuaSoTruot_QHD.cpp`
- Create: `04_KetHop_NganXep_QHD_HaiConTro/lesson-data.js`
- Create: `04_KetHop_NganXep_QHD_HaiConTro/index.html`
- Modify: `tests/verify_all_lectures.mjs`

**Interfaces:**
- Consumes: `window.initLecturePage`, `window.CP_PROGRESS`, `window.CP_ICONS`, `window.highlightCpp`
- Produces: `window.LESSON_DATA` tại `04_KetHop_NganXep_QHD_HaiConTro/lesson-data.js` với `id: 'ket_hop_ngan_xep_qhd_hai_con_tro'`.

- [ ] **Step 1: Bổ sung test kiểm định Bài 04 vào `tests/verify_all_lectures.mjs`**

- [ ] **Step 2: Chạy test để xác nhận FAIL khi chưa có Bài 04**

Run: `node tests/verify_all_lectures.mjs`
Expected: FAIL do thiếu `04_KetHop_NganXep_QHD_HaiConTro/lesson-data.js`.

- [ ] **Step 3: Soạn `04_KetHop_NganXep_QHD_HaiConTro/docs/bai_giang_ket_hop_ngan_xep_qhd_hai_con_tro.md`, viết `Code_Mau/*.cpp`, và tạo `lesson-data.js` + `index.html`**

- Nội dung kết hợp 3 mảnh ghép lớn:
  1. **Module 1 (Mảnh ghép 1 — Từ Đệ quy sang Ngăn xếp tự quản lý & Bảng Quy hoạch động):** Vấn đề tính đi tính lại cùng một việc và tràn bộ nhớ đệ quy $\rightarrow$ cuốn sổ ghi chép chi tiêu từng ngày để ngày hôm sau chỉ việc tra lại kết quả ngày hôm trước $\rightarrow$ giải nghĩa **"Quy hoạch động" (Dynamic Programming)** ("Quy hoạch" = lập bảng kế hoạch, "Động" = cập nhật nối tiếp từ nhỏ đến lớn) và cách dùng `std::stack` khử đệ quy.
  2. **Module 2 (Mảnh ghép 2 — Dùng Ngăn xếp đơn điệu để tăng tốc Quy hoạch động từ $O(N^2)$ xuống $O(N)$):** Bài toán tính `dp[i]` (ví dụ: tổng giá trị nhỏ nhất của các đoạn con kết thúc tại `i`, hoặc bài toán nhảy qua các cột cao hơn/chia đoạn). Thay vì dùng vòng lặp `j` chạy ngược từ `i - 1` về `1` mất $O(N^2)$, dùng **Ngăn xếp đơn điệu** gom các vị trí `j` có cùng mức đóng góp và tái sử dụng ngay giá trị `dp[st.top()]`!
  3. **Module 3 (Mảnh ghép 3 — Kết nối Ngăn xếp đơn điệu, Hàng đợi hai đầu đơn điệu & Hai con trỏ trong Quy hoạch động):** Khi bài toán Quy hoạch động thêm giới hạn *"chỉ được nhảy tối đa $K$ bước"* (cửa sổ trượt độ dài $K$), ta ghép **Cửa sổ trượt (Hai con trỏ: đầu phải thêm vào, đầu trái loại phần tử quá hạn $i - K$)** với **Ngăn xếp đơn điệu (loại phần tử kém tối ưu ở cuối)** để tạo thành **Hàng đợi hai đầu đơn điệu (`std::deque`) tối ưu Quy hoạch động**.
- Tạo Bài tập Debug (bẫy: quên loại bỏ chỉ số `st.front() < i - K` đã trượt ra ngoài cửa sổ trước khi lấy `dp` tốt nhất; bẫy: công thức chuyển trạng thái `dp[i]` dùng Ngăn xếp đơn điệu bị tính thiếu đoạn từ `0` đến `i` khi ngăn xếp rỗng).
- Tạo bộ Quiz Trace đồng thời cả mảng `dp[]` và ngăn xếp `st` qua từng bước `i`, kèm bài tập thực chiến kết hợp.

- [ ] **Step 4: Chạy test web và test biên dịch C++**

Run: `node tests/verify_all_lectures.mjs && bash tests/verify_all_cpp.sh`
Expected: PASS cho cả 4 bài giảng mới + `MayCham`.

- [ ] **Step 5: Commit Task 5**

```bash
git add 04_KetHop_NganXep_QHD_HaiConTro/ tests/
git commit -m "feat(04-ket-hop): add combined Stack + DP + Two Pointers interactive lecture and C++14 samples"
```

---

### Task 6: Đóng Gói Workflow Thành Skill (`.agents/skills/cp-lecture-workflow/SKILL.md`) & Kiểm Định Tổng Thể

**Files:**
- Create: `.agents/skills/cp-lecture-workflow/SKILL.md`
- Modify: `tests/verify_all_lectures.mjs`

**Interfaces:**
- Produces: Skill `.agents/skills/cp-lecture-workflow/SKILL.md` định nghĩa quy trình chuẩn để tạo bất kỳ bài giảng đơn lẻ hoặc bài giảng kết hợp mới nào trong repo `DayHoc`.

- [ ] **Step 1: Bổ sung test kiểm tra `.agents/skills/cp-lecture-workflow/SKILL.md` vào `tests/verify_all_lectures.mjs`**

Kiểm tra file skill tồn tại, có frontmatter `name: cp-lecture-workflow`, và mô tả đầy đủ quy trình 6 bước (Problem Decomposition $\rightarrow$ Life-to-Code-to-Terminology `.md` $\rightarrow$ `Code_Mau/*.cpp` $\rightarrow$ `lesson-data.js` với Knowledge Graph, Sandboxes, Debug Exercises, Trace/Single/Multiple Quizzes $\rightarrow$ Cập nhật `shared/portal-data.js` $\rightarrow$ Chạy `verify_all_lectures.mjs` & `verify_all_cpp.sh`).

- [ ] **Step 2: Chạy test để xác nhận FAIL trước khi tạo file Skill**

Run: `node tests/verify_all_lectures.mjs`
Expected: FAIL do chưa có `.agents/skills/cp-lecture-workflow/SKILL.md`.

- [ ] **Step 3: Viết `.agents/skills/cp-lecture-workflow/SKILL.md`**

Đóng gói toàn bộ quy tắc sư phạm, cấu trúc file, giao diện `window.LESSON_DATA`, quy tắc kiểm định câu hỏi (Quiz QC 80–90% tương đồng, $\ge 40\%$ câu hỏi Trace code, độ dài cân bằng $\le 35\%$, Bài tập Debug), và cách thêm nút mới vào Cây Kỹ Năng ở `shared/portal-data.js`.

- [ ] **Step 4: Chạy toàn bộ bộ kiểm thử Web, Quiz QC và C++14**

Run: `node tests/verify_all_lectures.mjs && bash tests/verify_all_cpp.sh && node MayCham/tests/verify_web.mjs`
Expected: Tất cả các bài kiểm thử đều PASS 100%.

- [ ] **Step 5: Commit Task 6**

```bash
git add .agents/skills/cp-lecture-workflow/SKILL.md tests/
git commit -m "feat(skill): extract cp-lecture-workflow skill and complete verification suite"
```
