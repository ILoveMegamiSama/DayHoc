# Kế Hoạch Triển Khai (Implementation Plan): Lộ Trình CP Chuẩn Lớp 9 Đến Hết DP Cơ Bản & Nâng Cấp Workflow

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nâng cấp quy trình `cp-lecture-workflow`, tái cấu trúc Cây Kỹ Năng (`shared/portal-data.js`, `index.html`) theo Hướng A dành cho học sinh Lớp 9 đến hết Quy hoạch động cơ bản (Tầng 2), viết mới Chương phụ chuẩn hóa C++ CP (`00b_ChuanHoa_Code_CP`), chuẩn hóa 6 bài giảng hiện có, và biên soạn đầy đủ 15 bài giảng mới (`L1-01` → `L2-09`) kèm kiểm định subagent và 1 lần nghiệm thu toàn repo.

**Architecture:** Giữ nguyên kiến trúc hạt nhân `shared/` + thư mục bài giảng độc lập chạy trực tiếp qua `file://`. Mỗi bài giảng có `docs/*.md`, 3 file `Code_Mau/*.cpp`, `lesson-data.js` (`window.LESSON_DATA`), và `index.html`. Cây Kỹ Năng trong `shared/portal-data.js` dùng 4 tracks (`foundations`, `tier1_core`, `tier2_dp`, `extension`) với thuộc tính `status: 'ready' | 'planned'` và `phase: 'pha1_array' | 'pha2_stl'`.

**Tech Stack:** HTML5, CSS3 Variables (Light/Dark theme), Vanilla JS (ES6+), SVG DAG, KaTeX 0.16.8, C++14 (`g++ -std=c++14 -O2 -Wall`), Node.js (`node:assert`, `node:vm`), Web Search (`search_web`) xác thực OJ.

**Spec:** `docs/superpowers/specs/2026-11-17-grade9-core-dp-roadmap-design.md`

## Global Constraints

- Bảng màu Sáng/Tối tuân thủ `shared/styles.css`; **không sử dụng màu tím** (`violet`, `lavender`, `#8b5cf6`, `#a855f7`).
- Icon bắt buộc là SVG đơn sắc (`stroke="currentColor"`) trong `shared/icons.js`, không dùng emoji màu mè.
- Chạy thuần trên `file://` không cần backend; không tạo `user_progress.json` vào repo; **không** stage/commit thay đổi chưa theo dõi ngoài phạm vi (như `.gitignore` đã chỉnh trước phiên).
- Sư phạm 3 bước bắt buộc: **Vấn đề lớn $\rightarrow$ Tách vấn đề nhỏ ($V_1, V_2, \dots$) $\rightarrow$ Đời sống $\rightarrow$ Ánh xạ Lập trình $\rightarrow$ Giải nghĩa Thuật ngữ liên kết ngược**.
- Đối tượng Lớp 9 chia 2 pha ngôn ngữ:
  - **Pha 1 (`MOD-Pre`, `MOD-CP0`, `L1-01` → `L1-04`):** Chỉ dùng mảng tĩnh toàn cục (`const int N = ...;`), hàm chỉ nhận tham số nguyên thủy; không dùng thuật ngữ `Call Stack` (thay bằng *"ngăn xếp lời gọi hàm / bộ nhớ stack"*).
  - **Pha 2 (`L1-05` trở đi):** Mở khóa `vector`, `pair`, `sort`, STL containers, truyền tham chiếu `&` cho container.
- Chuẩn Code C++ CP: Mọi `.cpp` và code mẫu dùng `#include <bits/stdc++.h>` và `using namespace std;`; mọi bài từ `MOD-CP0` trở đi có `ios_base::sync_with_stdio(false); cin.tie(NULL);` và ưu tiên `'\n'`.
- **Zero-Hallucination OJ Gate:** Mọi bài tập `practiceProblems` ($\ge 6$ bài/bài giảng, chia 3 `tier: 1, 2, 3`) bắt buộc xác thực ID + URL trực tiếp + đề bài qua `search_web`; cấm link trang chủ (`https://oj.vnoi.info/`).
- Quy chuẩn Quiz & Debug: $\ge 40\%$ câu `trace` (`type: 'trace'` hoặc có `traceCode`), độ dài đáp án cùng 1 câu lệch nhau $\le 35\%$ (khuyến nghị $\le 20\%$), đồng dạng 80–90%, đáp án đúng ngẫu nhiên, đủ `single`/`multiple`/`trace`, tối thiểu 2 `debugExercises` với `bugLine` khớp chính xác code.
- **Verify tối ưu:** Hỗ trợ `--lesson <folder>` khi phát triển từng bài; chạy kiểm định toàn repo **duy nhất 1 lần** sau khi hoàn tất tất cả các đợt implement.
- **Subagent Quality Gate:** Mỗi bài giảng mới (hoặc nâng cấp lớn) phải qua kiểm định độc lập bởi subagent với ngưỡng đạt $\ge 90/100$.

## Review Focus

- `tests/verify_00_nhap_mon.sh` kiểm tra `nhap_mon_cpp` (`x - 90 >= 0`), khoảng cách `x` giữa `nhap_mon_cpp` và `may_cham` ($\ge 60\text{px}$), và biên dịch `00_NhapMon_LapTrinh_CPP/Code_Mau/*.cpp` với cờ `-Wall -Wextra -Werror` — mọi thay đổi tọa độ DAG hoặc code mẫu bài 00 không được làm gãy ràng buộc này.
- `index.html` render node `status: 'planned'` phải vô hiệu hóa nút học an toàn (không click vào URL chưa tồn tại) nhưng vẫn mở được bảng chi tiết tiền đề/khái niệm mới và không vỡ khi lọc Track hoặc Pan/Zoom SVG.
- `tests/verify_all_lectures.mjs` phải quét được cả 4 bài cũ lẫn toàn bộ 16 thư mục bài mới (`00b_*`, `L1_*`, `L2_*`), kiểm tra DAG không chu trình, không cạnh treo, không link OJ trang chủ, `practiceProblems.length >= 6`, và chỉ quét 1 bài khi truyền `--lesson <folder>`.
- Các bài Pha 1 (`L1-01` → `L1-04`, `MOD-Pre`, `MOD-CP0`) tuyệt đối không rò rỉ `vector` truyền vào hàm hay thuật ngữ `Call Stack`.
- Toàn bộ link OJ sai/chung chung cũ (`MOD-Pre-P01..03`, `VNOJ-GIAITHUA`, `CSES-1076` trong `MOD-04`) phải được thay thế bằng bài OJ thật đã xác thực qua `search_web`.

---

### Task 1: Nâng Cấp Quy Trình `cp-lecture-workflow` (5 Điểm Cải Tiến)

**Files:**
- Modify: `.agents/skills/cp-lecture-workflow/SKILL.md`

**Interfaces:**
- Produces: Tài liệu chuẩn hóa `cp-lecture-workflow` cập nhật 6 bước cho đối tượng Lớp 9, Pha 1 vs Pha 2, C++ CP Standard (`#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`), Zero-Hallucination OJ Gate ($\ge 6$ bài phân 3 tier + bắt buộc `search_web`), `--lesson` vs chạy full 1 lần cuối, và Subagent Quality Gate ($\ge 90/100$).

- [ ] **Step 1: Cập nhật `.agents/skills/cp-lecture-workflow/SKILL.md`**
  Bổ sung đủ 5 quy định mới (3a–3e), quy tắc Pha 1 (mảng toàn cục, không `Call Stack`) vs Pha 2 (`vector`, `&`, STL), nâng yêu cầu `practiceProblems` lên tối thiểu 6 bài phân tier 1–3, thêm Bước 6a (`--lesson`) vs Bước 6b (Subagent Quality Gate) và Bước 7 (chạy full verification 1 lần duy nhất sau khi xong đợt implement).
- [ ] **Step 2: Kiểm tra nhanh cấu trúc SKILL.md bằng regex kiểm định hiện có**
  Run: `node -e "const fs=require('fs'),s=fs.readFileSync('.agents/skills/cp-lecture-workflow/SKILL.md','utf8'); if(!/bits\/stdc\+\+\.h/.test(s)||!/search_web/i.test(s)||!/subagent/i.test(s)) throw new Error('Thieu muc bat buoc'); console.log('OK')"`
  Expected: `OK`
- [ ] **Step 3: Commit**
  ```bash
  git add .agents/skills/cp-lecture-workflow/SKILL.md
  git commit -m "docs(skill): upgrade cp-lecture-workflow with CP standard, OJ verification, and subagent gate"
  ```

---

### Task 2: Nâng Cấp Khung Kiểm Định Tự Động (`verify_all_lectures.mjs` & `verify_all_cpp.sh`)

**Files:**
- Modify: `tests/verify_all_lectures.mjs`
- Modify: `tests/verify_all_cpp.sh`

**Interfaces:**
- Consumes: `shared/portal-data.js` (`window.PORTAL_DATA`), các thư mục bài giảng `00_*`, `00b_*`, `01_*..04_*`, `L1_*`, `L2_*`, `MayCham`.
- Produces:
  - `node tests/verify_all_lectures.mjs [--lesson <dir>] [--strict-oj]`
    - Luôn kiểm tra hạ tầng dùng chung (`shared/*`, `index.html`) và tính toàn vẹn DAG của `PORTAL_DATA` (mọi `edge.from`, `edge.to` tồn tại; phát hiện chu trình bằng Kahn/DFS; mọi node `status !== 'planned'` phải tồn tại `index.html`; `nhap_mon_cpp` và `may_cham` đảm bảo khoảng cách hợp lệ).
    - Tự động đọc danh sách các node có `status !== 'planned'` (bỏ qua `MayCham` vốn dùng custom engine) hoặc lọc đúng `--lesson <dir>` để kiểm tra: đủ `docs/*.md`, 3 `Code_Mau/*.cpp`, `index.html`, `lesson-data.js`, 3 bước sư phạm, `trace >= 40%`, độ dài đáp án chênh `<= 35%`, `debugExercises >= 2` (`bugLine` khớp số dòng code), `practiceProblems >= 6`, không chứa URL trang chủ trần (`^https?:\/\/oj\.vnoi\.info\/?$`), và code mẫu dùng `#include <bits/stdc++.h>` + `using namespace std;`.
  - `bash tests/verify_all_cpp.sh [<dir>]`: biên dịch toàn bộ `.cpp` trong `<dir>` (nếu truyền tham số) hoặc toàn repo (nếu không truyền tham số) bằng `g++ -std=c++14 -O2 -Wall`.

- [ ] **Step 1: Cập nhật `tests/verify_all_lectures.mjs` hỗ trợ kiểm tra động theo `PORTAL_DATA`, `--lesson <dir>`, DAG check, OJ URL check và CP C++ header check**
- [ ] **Step 2: Cập nhật `tests/verify_all_cpp.sh` hỗ trợ tham số tùy chọn `<dir>`**
- [ ] **Step 3: Chạy test thử chế độ kiểm tra đơn lẻ trên `01_DeQuy_Va_DeQuyDuoi`**
  Run: `node tests/verify_all_lectures.mjs --lesson 01_DeQuy_Va_DeQuyDuoi`
  Expected: Báo lỗi rõ các điểm hiện tại của `01_DeQuy` chưa đạt chuẩn mới (ví dụ số `practiceProblems < 6`, URL `oj.vnoi.info/` trần, thiếu `bits/stdc++.h`), xác nhận bộ kiểm định bắt đúng lỗi.
- [ ] **Step 4: Commit khung test**
  ```bash
  git add tests/verify_all_lectures.mjs tests/verify_all_cpp.sh
  git commit -m "test: upgrade lecture and cpp verifiers with DAG check, OJ validation, and --lesson filter"
  ```

---

### Task 3: Nâng Cấp Cổng Học Tập & Cây Kỹ Năng Hướng A (`portal-data.js`, `index.html`, `styles.css`)

**Files:**
- Modify: `shared/portal-data.js`
- Modify: `index.html`
- Modify: `shared/styles.css`

**Interfaces:**
- Produces:
  - `window.PORTAL_DATA.tracks`: 4 track (`foundations`, `tier1_core`, `tier2_dp`, `extension`).
  - `window.PORTAL_DATA.nodes`: Đủ 23 node theo bảng mục 3 của Spec, mỗi node có `{ id, code, title, track, category, path, summary, x, y, badge, status: 'ready'|'planned', phase: 'pha1_array'|'pha2_stl', prerequisites, newConcepts }`. (Ở Task 3: các bài chưa viết mang `status: 'planned'`, các bài đã có mang `status: 'ready'`; `MOD-04` nối từ `dp_nhap_mon`, `ngan_xep_don_dieu`, `hai_con_tro`).
  - `index.html`: Hỗ trợ lọc thẻ bài theo Track, hiển thị node `planned` với nét đứt + badge `"Sắp mở"` (vẫn bấm xem `prerequisites`/`newConcepts`), `viewBox` bao trọn đồ thị 4 hàng mượt mà với Pan/Zoom.

- [ ] **Step 1: Cập nhật CSS trong `shared/styles.css` cho thẻ/node `planned` và bộ lọc Track**
- [ ] **Step 2: Cập nhật `shared/portal-data.js` với đủ 23 node, 4 track và toàn bộ `edges` cầu nối tư duy**
  *(Đảm bảo `nhap_mon_cpp.x - 90 >= 0` và khoảng cách `x` giữa `nhap_mon_cpp` và `may_cham` $\ge 60\text{px}$ để giữ nguyên tương thích `verify_00_nhap_mon.sh`)*.
- [ ] **Step 3: Cập nhật `index.html` để render đúng node `ready` / `planned`, cập nhật `viewBox` và bộ lọc Track**
- [ ] **Step 4: Kiểm tra cú pháp & toàn vẹn DAG bằng `node -c` + kiểm tra `verify_00_nhap_mon.sh` phần DAG**
  Run: `node -c shared/portal-data.js && node -e "const fs=require('fs'),vm=require('vm'),sb={window:{}};vm.runInNewContext(fs.readFileSync('shared/portal-data.js','utf8'),sb);console.log('Nodes:',sb.window.PORTAL_DATA.nodes.length,'Edges:',sb.window.PORTAL_DATA.edges.length)"`
  Expected: `Nodes: 23 Edges: ...` (không lỗi).
- [ ] **Step 5: Commit**
  ```bash
  git add shared/portal-data.js shared/styles.css index.html
  git commit -m "feat(portal): adopt Direction A Grade-9 skill tree up to Core DP"
  ```

---

### Task 4: Tạo Chương Phụ `00b_ChuanHoa_Code_CP` (`MOD-CP0`)

**Files:**
- Create: `00b_ChuanHoa_Code_CP/docs/bai_giang_chuan_hoa_code_cp.md`
- Create: `00b_ChuanHoa_Code_CP/Code_Mau/01_ThuVienDaNang_BitsStdCpp.cpp`
- Create: `00b_ChuanHoa_Code_CP/Code_Mau/02_XuongChung_UsingNamespaceStd.cpp`
- Create: `00b_ChuanHoa_Code_CP/Code_Mau/03_TangTocNhapXuat_IosBase.cpp`
- Create: `00b_ChuanHoa_Code_CP/lesson-data.js`
- Create: `00b_ChuanHoa_Code_CP/index.html`
- Modify: `shared/portal-data.js` (chuyển `chuan_hoa_code_cp` sang `status: 'ready'`)

**Interfaces:**
- Consumes: `MOD-Pre` (`00_NhapMon_LapTrinh_CPP`).
- Produces: Chương phụ giải thích trọn vẹn `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);` và `'\n'` vs `endl` + cảnh báo không trộn `scanf/printf` và không đặt tên biến trùng `count/min/max`; đủ $\ge 6$ bài tập OJ thật tìm qua `search_web`.

- [ ] **Step 1: Dùng `search_web` tìm & xác thực 6–8 bài tập OJ nhập xuất số lượng lớn / cơ bản (CSES, Codeforces, VNOJ)**
- [ ] **Step 2: Viết `00b_ChuanHoa_Code_CP/docs/bai_giang_chuan_hoa_code_cp.md` theo đúng 3 bước sư phạm Lớp 9 Pha 1**
- [ ] **Step 3: Viết 3 file `Code_Mau/*.cpp` chuẩn CP (`bits/stdc++.h`, `using namespace std;`, `ios_base`)**
- [ ] **Step 4: Viết `00b_ChuanHoa_Code_CP/lesson-data.js` (3 modules, sandboxes, quiz $\ge 40\%$ trace, $\ge 2$ debug, $\ge 6$ verified OJ problems) và `index.html`; cập nhật `status: 'ready'` trong `shared/portal-data.js`**
- [ ] **Step 5: Kiểm tra `--lesson 00b_ChuanHoa_Code_CP` & compile C++ của riêng thư mục này + gọi Subagent kiểm định chất lượng ($\ge 90/100$)**
- [ ] **Step 6: Commit**
  ```bash
  git add 00b_ChuanHoa_Code_CP shared/portal-data.js
  git commit -m "feat(lesson): add supplementary chapter MOD-CP0 on CP C++ standard"
  ```

---

### Task 5: Chuẩn Hóa Code CP & Xác Thực Bài Tập OJ Cho 6 Bài Giảng Hiện Có

**Files:**
- Modify: `00_NhapMon_LapTrinh_CPP/Code_Mau/*.cpp`, `00_NhapMon_LapTrinh_CPP/docs/bai_giang_nhap_mon_cpp.md`, `00_NhapMon_LapTrinh_CPP/lesson-data.js`
- Modify: `01_DeQuy_Va_DeQuyDuoi/Code_Mau/*.cpp`, `01_DeQuy_Va_DeQuyDuoi/docs/bai_giang_de_quy_duoi.md`, `01_DeQuy_Va_DeQuyDuoi/lesson-data.js`
- Modify: `02_NganXep_Va_NganXepDonDieu/Code_Mau/*.cpp`, `02_NganXep_Va_NganXepDonDieu/lesson-data.js`
- Modify: `03_HaiConTro/Code_Mau/*.cpp`, `03_HaiConTro/lesson-data.js`
- Modify: `04_KetHop_NganXep_QHD_HaiConTro/Code_Mau/*.cpp`, `04_KetHop_NganXep_QHD_HaiConTro/lesson-data.js`

**Interfaces:**
- Consumes: Kết quả `search_web` xác thực toàn bộ bài tập mới cho từng chủ đề.
- Produces:
  - Tất cả `.cpp` và đoạn code mẫu trong `lesson-data.js` dùng `#include <bits/stdc++.h>` và `using namespace std;` (thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` cho `01..04`; `00_NhapMon` giữ nhập xuất nhẹ nhàng không ép `ios_base` trước `00b`, chỉ chuẩn hóa `bits/stdc++.h` + `using namespace std;`).
  - Thay thế `MOD-Pre-P01..03`, `VNOJ-GIAITHUA`, `CSES-1076` và nâng mỗi bài `00..04` lên **$\ge 6$ bài tập thực chiến có link thật đã kiểm tra qua `search_web`**.
  - Kiểm tra `00_NhapMon` tuân thủ `-Wall -Wextra -Werror` của `verify_00_nhap_mon.sh`.

- [ ] **Step 1: Dùng `search_web` tìm và kiểm chứng đủ bài tập thật cho từng bài `00`, `01`, `02`, `03`, `04`**
- [ ] **Step 2: Chuẩn hóa `Code_Mau/*.cpp` và `lesson-data.js` của `00_NhapMon_LapTrinh_CPP` + `01_DeQuy_Va_DeQuyDuoi`**
- [ ] **Step 3: Chuẩn hóa `Code_Mau/*.cpp` và `lesson-data.js` của `02_NganXep`, `03_HaiConTro`, `04_KetHop`**
- [ ] **Step 4: Chạy `--lesson` cho từng bài đã sửa + `bash tests/verify_00_nhap_mon.sh` + Subagent rà soát thay đổi OJ & C++**
- [ ] **Step 5: Commit**
  ```bash
  git add 00_NhapMon_LapTrinh_CPP 01_DeQuy_Va_DeQuyDuoi 02_NganXep_Va_NganXepDonDieu 03_HaiConTro 04_KetHop_NganXep_QHD_HaiConTro
  git commit -m "refactor(lessons): standardize CP C++ template and verify 6+ real OJ problems per existing lesson"
  ```

---

### Task 6: Đợt 2 — Xây Dựng 4 Bài Tầng 1 Pha 1 (`L1-01` → `L1-04`)

*(Tuân thủ nghiêm ngặt Pha 1 Lớp 9: mảng tĩnh toàn cục `const int N = ...;`, hàm chỉ nhận kiểu nguyên thủy, chuẩn CP `bits/stdc++.h` + `using namespace std;` + `ios_base`, 6+ bài OJ tìm qua `search_web`, kiểm tra `--lesson` + subagent audit).*

**Files:**
- Create: `L1_01_DieuKhienLuong_VongLap/{docs/bai_giang_dieu_khien_luong_vong_lap.md, Code_Mau/01_*.cpp..03_*.cpp, lesson-data.js, index.html}`
- Create: `L1_02_Mang_Xau_MoPhong/{docs/bai_giang_mang_xau_mo_phong.md, Code_Mau/01_*.cpp..03_*.cpp, lesson-data.js, index.html}`
- Create: `L1_03_Ham_ThamChieu_BoNho/{docs/bai_giang_ham_tham_chieu_bo_nho.md, Code_Mau/01_*.cpp..03_*.cpp, lesson-data.js, index.html}`
- Create: `L1_04_DoPhucTap_ThuatToan/{docs/bai_giang_do_phuc_tap_thuat_toan.md, Code_Mau/01_*.cpp..03_*.cpp, lesson-data.js, index.html}`
- Modify: `shared/portal-data.js` (chuyển 4 node sang `status: 'ready'`)

- [ ] **Step 1: Dùng `search_web` xác thực $\ge 6$ bài tập OJ thật cho mỗi bài `L1-01..L1-04` (Codeforces 800–1000, CSES Introductory, VNOJ)**
- [ ] **Step 2: Triển khai `L1_01` & `L1_02` (có thể dùng parallel subagents mỗi agent 1 bài theo spec)**
- [ ] **Step 3: Triển khai `L1_03` & `L1_04`**
- [ ] **Step 4: Cập nhật `status: 'ready'` trong `shared/portal-data.js`, chạy `--lesson` và `verify_all_cpp.sh <dir>` cho 4 bài, gọi Subagent kiểm định chất lượng ($\ge 90/100$)**
- [ ] **Step 5: Commit Đợt 2**
  ```bash
  git add L1_01_DieuKhienLuong_VongLap L1_02_Mang_Xau_MoPhong L1_03_Ham_ThamChieu_BoNho L1_04_DoPhucTap_ThuatToan shared/portal-data.js
  git commit -m "feat(tier1): implement L1-01 through L1-04 foundational C++ and complexity lessons"
  ```

---

### Task 7: Đợt 3A — Xây Dựng 3 Bài Tầng 1 Pha 2 (`L1-05` → `L1-07`: STL & Số Học)

*(Mở khóa Pha 2 từ `L1-05`: `vector`, `pair`, `sort`, truyền tham chiếu `&`; chuẩn bị đầy đủ `priority_queue`, `deque`, sàng nguyên tố & lũy thừa nhị phân).*

**Files:**
- Create: `L1_05_Vector_Pair_SapXep/{docs/*.md, Code_Mau/*.cpp, lesson-data.js, index.html}`
- Create: `L1_06_STL_TraCuu_HangDoi/{docs/*.md, Code_Mau/*.cpp, lesson-data.js, index.html}`
- Create: `L1_07_SoHoc_NhapMon_CP/{docs/*.md, Code_Mau/*.cpp, lesson-data.js, index.html}`
- Modify: `shared/portal-data.js`

- [ ] **Step 1: Dùng `search_web` xác thực $\ge 6$ bài tập OJ thật cho `L1-05..L1-07`**
- [ ] **Step 2: Triển khai `L1_05`, `L1_06`, `L1_07`**
- [ ] **Step 3: Cập nhật `status: 'ready'`, chạy `--lesson` + `verify_all_cpp.sh <dir>` và Subagent kiểm định chất lượng ($\ge 90/100$)**
- [ ] **Step 4: Commit**
  ```bash
  git add L1_05_Vector_Pair_SapXep L1_06_STL_TraCuu_HangDoi L1_07_SoHoc_NhapMon_CP shared/portal-data.js
  git commit -m "feat(tier1): implement L1-05 through L1-07 STL sorting, containers, and basic number theory"
  ```

---

### Task 8: Đợt 3B — Xây Dựng 3 Bài Tầng 2 Tuyến Tính & Nhị Phân (`L2-01` → `L2-03`)

**Files:**
- Create: `L2_01_MangCongDon_MangHieu/{docs/*.md, Code_Mau/*.cpp, lesson-data.js, index.html}`
- Create: `L2_02_TimKiemNhiPhan/{docs/*.md, Code_Mau/*.cpp, lesson-data.js, index.html}`
- Create: `L2_03_NganXep_HangDoi_CoBan/{docs/*.md, Code_Mau/*.cpp, lesson-data.js, index.html}`
- Modify: `shared/portal-data.js`

- [ ] **Step 1: Dùng `search_web` xác thực $\ge 6$ bài tập OJ thật cho `L2-01..L2-03`**
- [ ] **Step 2: Triển khai `L2_01`, `L2_02`, `L2_03`**
- [ ] **Step 3: Cập nhật `status: 'ready'`, chạy `--lesson` + `verify_all_cpp.sh <dir>` và Subagent kiểm định chất lượng ($\ge 90/100$)**
- [ ] **Step 4: Commit**
  ```bash
  git add L2_01_MangCongDon_MangHieu L2_02_TimKiemNhiPhan L2_03_NganXep_HangDoi_CoBan shared/portal-data.js
  git commit -m "feat(tier2): implement L2-01 through L2-03 prefix sums, binary search, and basic stack/queue"
  ```

---

### Task 9: Đợt 4A — Xây Dựng 2 Bài Cầu Nối Vào DP (`L2-04` Quay Lui & `L2-05` Tham Lam)

**Files:**
- Create: `L2_04_DuyetToanBo_QuayLui_Bitmask/{docs/*.md, Code_Mau/*.cpp, lesson-data.js, index.html}`
- Create: `L2_05_ThamLam_Va_DiemGay/{docs/*.md, Code_Mau/*.cpp, lesson-data.js, index.html}`
- Modify: `shared/portal-data.js`

- [ ] **Step 1: Dùng `search_web` xác thực $\ge 6$ bài tập OJ thật cho `L2-04`, `L2-05`**
- [ ] **Step 2: Triển khai `L2_04` (Cây đệ quy đa nhánh, Quay lui, Bitmask $2^N$, nối ứng dụng Stress Test `MOD-00`) & `L2_05` (Tham lam + Điểm gãy mở đường sang DP)**
- [ ] **Step 3: Cập nhật `status: 'ready'`, chạy `--lesson` + `verify_all_cpp.sh <dir>` và Subagent kiểm định chất lượng ($\ge 90/100$)**
- [ ] **Step 4: Commit**
  ```bash
  git add L2_04_DuyetToanBo_QuayLui_Bitmask L2_05_ThamLam_Va_DiemGay shared/portal-data.js
  git commit -m "feat(tier2): implement L2-04 backtracking/bitmask and L2-05 greedy limits"
  ```

---

### Task 10: Đợt 4B — Xây Dựng Cụm 4 Bài Quy Hoạch Động Cơ Bản (`L2-06` → `L2-09`)

**Files:**
- Create: `L2_06_QHD_NhapMon_1D/{docs/*.md, Code_Mau/*.cpp, lesson-data.js, index.html}`
- Create: `L2_07_QHD_Luoi2D_BoNho/{docs/*.md, Code_Mau/*.cpp, lesson-data.js, index.html}`
- Create: `L2_08_QHD_CaiTui_ToHopDem/{docs/*.md, Code_Mau/*.cpp, lesson-data.js, index.html}`
- Create: `L2_09_QHD_DayCon_Xau_TrangThai/{docs/*.md, Code_Mau/*.cpp, lesson-data.js, index.html}`
- Modify: `shared/portal-data.js`

- [ ] **Step 1: Dùng `search_web` xác thực $\ge 6$ bài tập OJ thật cho mỗi bài `L2-06..L2-09` (CSES DP, AtCoder Edu DP A–F, VNOJ cơ bản)**
- [ ] **Step 2: Triển khai `L2_06` (DP 1D, Memoization vs Tabulation, Pull/Push DP, Truy vết) & `L2_07` (Grid 2D + Rolling Array)**
- [ ] **Step 3: Triển khai `L2_08` (Tổ hợp đếm sơ cấp + 0/1 & Unbounded Knapsack, Hoán vị vs Tổ hợp, Đổi chiều Giá trị) & `L2_09` (LIS $O(N^2)$, LCS, Edit Distance, State Machine *Vacation*)**
- [ ] **Step 4: Cập nhật toàn bộ `status: 'ready'` trong `shared/portal-data.js`, chạy `--lesson` + `verify_all_cpp.sh <dir>` cho 4 bài và Subagent kiểm định chất lượng ($\ge 90/100$)**
- [ ] **Step 5: Commit**
  ```bash
  git add L2_06_QHD_NhapMon_1D L2_07_QHD_Luoi2D_BoNho L2_08_QHD_CaiTui_ToHopDem L2_09_QHD_DayCon_Xau_TrangThai shared/portal-data.js
  git commit -m "feat(tier2): implement L2-06 through L2-09 Core Dynamic Programming curriculum"
  ```

---

### Task 11: Tổng Nghiệm Thu Toàn Repo 1 Lần Duy Nhất & Kiểm Tra Cuối

**Files:**
- Verify only (không sửa thêm nếu không có lỗi).

- [ ] **Step 1: Chạy 1 lần duy nhất toàn bộ bộ kiểm định kỹ thuật & biên dịch C++**
  Run:
  ```bash
  node tests/verify_all_lectures.mjs
  bash tests/verify_all_cpp.sh
  bash tests/verify_00_nhap_mon.sh
  node MayCham/tests/verify_web.mjs
  ```
  Expected: Toàn bộ PASS 100%, 0 lỗi.
- [ ] **Step 2: Gọi 1 Subagent tổng rà soát nhánh `feat/grade9-core-dp-roadmap`**
  Kiểm tra đối chiếu toàn bộ 23 node trên `shared/portal-data.js`, kiểm toán tiền đề giữa các bài, kiểm tra lại không còn placeholder/link OJ giả, không đụng file ngoài ý muốn.
- [ ] **Step 3: Báo cáo kết quả hoàn thiện cho người dùng (kèm hướng dẫn review/merge nhánh)**
