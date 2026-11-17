---
name: cp-lecture-workflow
description: Quy trình chuẩn hóa tạo bài giảng tương tác Lập Trình Thi Đấu (CP) cho học sinh Lớp 9 trong repo DayHoc: quy tắc 2 Pha (Pha 1 mảng toàn cục, Pha 2 vector/STL), Problem Decomposition, 3 bước Đời sống -> Lập trình -> Thuật ngữ, chuẩn C++ CP (#include <bits/stdc++.h> + fast I/O), Zero-Hallucination OJ Gate (search_web, >= 6 bài 3 tier), Debug/Trace Quiz, cập nhật Cây Kỹ Năng, kiểm thử --lesson và Subagent Quality Gate (>= 90/100).
---

# Quy Trình Chuẩn Hóa Sinh Bài Giảng Tương Tác CP Cho Học Sinh Lớp 9

Skill này định nghĩa quy trình chuẩn hóa để xây dựng và nâng cấp bài giảng trong kho học liệu `DayHoc`, thống nhất cho đối tượng **học sinh Lớp 9 (THCS)** mới học C++14 & Lập trình thi đấu (CP).

---

## 1. Nguyên Tắc Sư Phạm & Quy Tắc 2 Pha Ngôn Ngữ

0. **Quy Tắc 2 Pha Trình Độ Trên Cây Kỹ Năng (Grade 9 Two-Phase Rules):**
   - **Pha 1 — Nền tảng C++ (`MOD-Pre` $\rightarrow$ `L1-04`):** Chỉ dùng mảng tĩnh toàn cục (`const int N = ...; int a[N];`), hàm chỉ nhận tham số nguyên thủy; tránh thuật ngữ hàn lâm nặng (thay `Call Stack` bằng *"ngăn xếp lời gọi hàm / bộ nhớ stack"*).
   - **Pha 2 — STL & Thuật toán (`L1-05` $\rightarrow$ hết Tầng 2 & Mở rộng):** Từ bài `L1-05`, chính thức mở khóa `std::vector`, `pair`, `sort`, truyền tham chiếu `&` cho container và bộ công cụ STL (`set`, `map`, `priority_queue`, `deque`).

1. **Bước 0: Kiểm Toán Tiền Đề Theo Cây Kỹ Năng (Prerequisite Knowledge Audit):**
   - **PHẢI LUÔN NHỚ RẰNG NGƯỜI HỌC LÀ HỌC SINH LỚP 9 MỚI BẮT ĐẦU.**
   - Tra cứu `shared/portal-data.js` xem bài học nối tiếp từ đâu để lập danh sách:
     * `knownConcepts`: Khái niệm/hình ảnh người học **đã biết thật sự** từ các bài trước.
     * `newConcepts`: Khái niệm **mới tinh** cần giảng giải.
   - **CẤM TUYỆT ĐỐI** dùng thuật ngữ mới (như `Call Stack`, `Stack Frame`, `LIFO`, `DP`...) khi chưa dẫn dắt từ hình ảnh cũ đã biết; ở Pha 1 ưu tiên cách gọi trực quan tiếng Việt (*"ngăn xếp lời gọi hàm / bộ nhớ stack"*).

2. **Khởi đầu từ Vấn đề lớn & Tách vấn đề (Problem Decomposition):**
   - Luôn mở đầu bằng một **bài toán lập trình thực tế** mà cách làm ngây thơ bị **bế tắc** (TLE, WA hoặc tràn bộ nhớ).
   - Tách vấn đề lớn thành **2–3 vấn đề nhỏ độc lập ($V_1, V_2, V_3$)**, giải quyết dứt điểm từng phần rồi ghép lại thành thuật toán hoàn chỉnh.

3. **Chuẩn 3 bước trong từng mục kiến thức (Đời sống $\rightarrow$ Lập trình $\rightarrow$ Thuật ngữ):**
   - **Bước 1 (Đời sống):** Đặt tình huống đời thường tương tự mà học sinh Lớp 9 hình dung ngay được.
   - **Bước 2 (Lập trình):** Ánh xạ trực tiếp cách giải quyết đó vào bộ nhớ RAM, mảng/container và code C++.
   - **Bước 3 (Thuật ngữ):** Giải nghĩa tên gọi tiếng Việt + tiếng Anh và nối ngược về đồ vật/hành động ở Bước 1.

4. **Tiêu chuẩn Giao diện & Tương tác:**
   - Mặc định **Giao diện Tối (Dark Mode)** qua `localStorage['cp_dayhoc_theme']`.
   - Bố cục **`.knowledge-card`** rộng rãi, phân tách rõ `.step-life`, `.step-code`, `.step-term`.
   - Có **Phòng thí nghiệm Dự đoán trước khi chạy (Prediction-First Sandbox)**, **Bài tập Debug tương tác (`debugExercises`)** và **Câu hỏi Trace hành vi Code (`traceCode`)**.

---

## 2. Quy Trình Triển Khai & 5 Điểm Nâng Cấp Bắt Buộc

### Bước 1: Soạn Thảo Nội Dung Gốc Dạng Markdown (`docs/bai_giang_<topic>.md`)
Tạo thư mục bài giảng và `docs/bai_giang_<topic>.md` gồm:
- Vấn đề lớn & phân rã thành các vấn đề nhỏ.
- Phân tích từng vấn đề theo đúng 3 bước: Đời sống $\rightarrow$ Lập trình $\rightarrow$ Thuật ngữ.
- Bảng phân tích độ phức tạp thời gian/bộ nhớ và các bẫy thường gặp (Pitfalls).

### Bước 2: Viết Kho Code Mẫu Chuẩn CP C++14 (`Code_Mau/*.cpp`) — *[Nâng cấp 1: CP C++ Standard]*
Tạo thư mục `Code_Mau/` chứa tối thiểu 3 file `.cpp` (`01_<ChuDe>_CoBan.cpp`, `02_<ChuDe>_ToiUu.cpp`, `03_<ChuDe>_UngDung.cpp`).
- **Chuẩn CP C++ Standard bắt buộc** trong `Code_Mau/*.cpp`, `lesson-data.js` (sandbox, quiz, debug) và `docs/*.md`:
  ```cpp
  #include <bits/stdc++.h>
  using namespace std;

  int main() {
      ios_base::sync_with_stdio(false);
      cin.tie(NULL);
      // Dùng '\n' thay cho endl khi in nhiều dòng; không trộn scanf/printf với cin/cout
      return 0;
  }
  ```
- **Ngoại lệ có chủ đích:** `MOD-Pre` (`00_NhapMon_LapTrinh_CPP`) dùng `#include <bits/stdc++.h>` và `using namespace std;`, nhưng **chưa** bắt buộc `ios_base::sync_with_stdio(false); cin.tie(NULL);` cho tới ngay Chương Phụ `00b_ChuanHoa_Code_CP` (`MOD-CP0`).
- Tuân thủ đúng Pha 1 (mảng toàn cục, tham số nguyên thủy) hoặc Pha 2 (`vector`, `&`, STL) theo vị trí bài trên lộ trình.
- Mọi file `.cpp` phải biên dịch sạch 100% không lỗi/warning với `g++ -std=c++14 -O2 -Wall`.

### Bước 3: Đóng Gói `lesson-data.js` & Xác Thực OJ — *[Nâng cấp 2 & 4: Zero-Hallucination OJ Gate + 6–8 Bài 3 Tier]*
Tạo `lesson-data.js` xuất `window.LESSON_DATA`:
```javascript
window.LESSON_DATA = {
  id: 'ma_bai_giang',
  number: 'Bài Học 0X',
  shortTitle: 'Tên Ngắn Gọn',
  title: 'Tên Đầy Đủ — Phụ Đề Bản Chất',
  lead: 'Đoạn dẫn nhập ngắn giải thích vấn đề và giá trị cốt lõi.',
  modules: [
    {
      id: 'mod1',
      number: 'Phần 1',
      shortTitle: 'Tên Vấn Đề Nhỏ 1',
      title: 'Vấn Đề Nhỏ 1: ...',
      lead: '...',
      subproblem: { title: '...', desc: '...' },
      cards: [
        {
          heading: 'Tiêu đề card',
          tag: 'Nhãn phân loại',
          split: {
            left: '<div class="step-life">...</div><div class="step-term">...</div>',
            right: '<div class="step-code">...</div>'
          }
        }
      ],
      sandboxes: [ /* Phòng thí nghiệm dự đoán trước khi chạy */ ],
      quiz: [ /* Câu hỏi trace, single, multiple */ ]
    }
  ],
  debugExercises: [ /* Tối thiểu 2 bài tập debug */ ],
  practiceProblems: [ /* Tối thiểu 6 bài (khuyến nghị 6–8 bài), phân tier: 1, 2, 3 */ ]
};
```
- **Zero-Hallucination OJ Gate (`search_web` bắt buộc):**
  - **Cấm tuyệt đối** bịa đặt mã bài (như `VNOJ-GIAITHUA`, `MOD-Pre-P01`), gắn link trang chủ chung chung (`https://oj.vnoi.info/`), hoặc gán sai thuật toán.
  - Mọi bài trong `practiceProblems` **bắt buộc phải tra cứu và kiểm tra chéo qua `search_web`** trước khi ghi vào `lesson-data.js`:
    1. Xác nhận mã bài, tiêu đề chính xác và URL trực tiếp tới đúng đề bài (CSES / Codeforces / VNOJ / AtCoder / LeetCode).
    2. Xác nhận ràng buộc ($N$, $A_i$, Time Limit) khớp đúng kiến thức và độ phức tạp của bài giảng.
- **Chuẩn số lượng & phân tầng `practiceProblems`:** Tối thiểu **6 bài tập thực chiến (khuyến nghị 6–8 bài)** mỗi bài giảng, phân 3 cấp:
  - `tier: 1` (**Cơ bản — 2–3 bài**): Áp dụng trực tiếp khuôn mẫu vừa học.
  - `tier: 2` (**Thông hiểu — 2–3 bài**): Biến tấu điều kiện biên, kiểu dữ liệu hoặc ghép bài trước.
  - `tier: 3` (**Vận dụng Lớp 9 — 1–2 bài**): Chuẩn đề HSG Tin học Lớp 9 / Chuyên Tin / Div.2 A–B.

### Bước 4: Kiểm Soát Chất Lượng Câu Hỏi & Debug (`Quiz QC Rules`)
1. **Tỷ lệ câu hỏi Trace code (`type: 'trace'`, có `traceCode`) $\ge 40\%$:** Đưa đoạn code ngắn và input cụ thể, hỏi trạng thái biến/mảng tại bước $k$.
2. **Nhiễu đồng dạng 80–90% (Isomorphic Distractors):** Các phương án A, B, C, D dùng chung khung câu văn, chỉ khác điều kiện biên, giá trị hoặc bản chất; không có phương án đùa cợt.
3. **Cân bằng độ dài phương án $\le 35\%$ (ưu tiên $\le 20\%$):** Độ dài phương án dài nhất và ngắn nhất không lệch quá $35\%$; phân bổ ngẫu nhiên vị trí đáp án đúng (`A/B/C/D`).
4. **Đủ 3 loại câu hỏi:** `type: 'trace'`, `type: 'single'`, `type: 'multiple'`.
5. **Bài tập Debug (`debugExercises`):** Tối thiểu 2 bài; mỗi bài có `bugLine > 0` khớp chính xác dòng lỗi trong code, `failingInput`, ít nhất 3 `patches`, và `correctPatch`.

### Bước 5: Tạo Giao Diện Web `index.html` & Cập Nhật Cây Kỹ Năng (`shared/portal-data.js`)
1. Tạo `index.html` nạp `../shared/styles.css`, KaTeX 0.16.8, `../shared/icons.js`, `../shared/progress.js`, `../shared/highlighter.js`, `../shared/lecture-engine.js`, `lesson-data.js` và gọi `initLecturePage(window.LESSON_DATA)`.
2. Cập nhật `shared/portal-data.js`:
   - Thêm/cập nhật node trong `nodes`: `{ id, code, title, track, phase, status, category, path, summary, x, y, badge }`.
   - Thêm/cập nhật cạnh trong `edges`: `{ from, to, label, detail }` bảo toàn DAG không chu trình.

### Bước 6: Kiểm Thử Cục Bộ & Cổng Thẩm Định Subagent — *[Nâng cấp 3 & 5]*
- **Bước 6a — Kiểm thử cục bộ theo từng bài (`--lesson <dir>`):**
  Không chạy lại toàn bộ bộ test repo sau mỗi chỉnh sửa nhỏ. Trong lúc phát triển, chỉ chạy kiểm định riêng thư mục bài đang làm:
  ```bash
  node tests/verify_all_lectures.mjs --lesson <TenThuMuc>
  bash tests/verify_all_cpp.sh --lesson <TenThuMuc>
  ```
- **Bước 6b — Cổng Kiểm Định Subagent Độc Lập (`Subagent Quality Gate >= 90/100`):**
  Sau khi hoàn thiện mỗi bài giảng (hoặc cụm bài giảng), bắt buộc chạy **subagent độc lập** (dựa trên bộ tiêu chí `tests/audit_pedagogy_subagent.sh` + rà soát kỹ thuật) để chấm điểm và phản biện:
  1. **Sư phạm Lớp 9:** Đủ Problem-First $\rightarrow$ Tách vấn đề $\rightarrow$ 3 bước; không lọt thuật ngữ chưa dạy; tuân thủ Pha 1 (mảng toàn cục, tránh `Call Stack`) vs Pha 2 (`vector`, `&`, STL).
  2. **Chuẩn Code C++ CP:** Đúng `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);` (trừ `MOD-Pre`), dùng `'\n'`.
  3. **Chất lượng Quiz & Debug:** Trace code $\ge 40\%$, nhiễu đồng dạng 80–90%, chênh lệch độ dài $\le 35\%$, đáp án phân bổ đều, `bugLine` khớp code, $\ge 2$ `debugExercises`.
  4. **Độ tin cậy OJ:** Đủ $\ge 6$ bài phân `tier: 1, 2, 3`, đã xác thực qua `search_web`, không link trang chủ, đúng thuật toán.
  - **Ngưỡng đạt chuẩn:** **$\ge 90/100$** và không còn lỗi logic/tiền đề nghiêm trọng.
  - *Ghi chú quy trình SDD:* Khi thực hiện theo kế hoạch SDD, **controller điều phối subagent thẩm định này ngay sau bước triển khai** (implementer không tự spawn subagent lồng nhau).

### Bước 7: Nghiệm Thu Toàn Repo 1 Lần Duy Nhất — *[Nâng cấp 3]*
Chỉ chạy bộ kiểm định toàn repo **1 lần duy nhất** khi kết thúc toàn bộ đợt triển khai (sau mọi chỉnh sửa cuối cùng):
```bash
node tests/verify_all_lectures.mjs
bash tests/verify_all_cpp.sh
```
Cả hai lệnh phải đạt **PASS 100%** (gồm toàn vẹn DAG `shared/portal-data.js`, không có node non-`planned` thiếu `index.html`, và không có link OJ dạng trang chủ trần).
