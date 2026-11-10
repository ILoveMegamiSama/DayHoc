---
name: cp-lecture-workflow
description: Quy trình chuẩn hóa 6 bước để tạo bài giảng tương tác Lập Trình Thi Đấu (CP) cho người mới bắt đầu trong repo DayHoc: từ Tách vấn đề (Problem Decomposition), 3 bước Đời sống -> Lập trình -> Thuật ngữ, Code mẫu C++14, Web tương tác (Card 1-2 cột, Sandbox, Bài tập Debug, Quiz Trace Code), đến cập nhật Cây Kỹ Năng và kiểm thử tự động.
---

# Quy Trình Chuẩn Hóa Sinh Bài Giảng Tương Tác Lập Trình Thi Đấu (CP) Cho Người Mới Bắt Đầu

Skill này định nghĩa quy trình vàng 6 bước để tạo mới bất kỳ bài giảng đơn lẻ hoặc bài giảng kết hợp nào trong kho học liệu `DayHoc`.

---

## 1. Nguyên Tắc Sư Phạm Bắt Buộc (Core Pedagogical Principles)

1. **Bước 0: Kiểm Toán Tiền Đề Theo Cây Kỹ Năng (Prerequisite Knowledge Audit):**
   - **PHẢI LUÔN NHỚ RẰNG NGƯỜI HỌC LÀ NGƯỜI MỚI.**
   - Trước khi viết bất kỳ bài giảng nào, bắt buộc tra cứu Cây Kỹ Năng xem bài học này nối tiếp từ bài nào, và lập danh sách:
     * `knownConcepts`: Những hình ảnh/khái niệm người học **ĐÃ BIẾT THẬT SỰ** từ bài trước (ví dụ: từ bài MayCham, người học chỉ biết RAM là chiếc bàn làm việc, ổ cứng là tủ hồ sơ, OS, Shell, g++, hàm `main()`, mảng).
     * `newConcepts`: Những khái niệm **MỚI TINH** cần giảng giải.
   - **CẤM TUYỆT ĐỐI** dùng thuật ngữ mới (như Call Stack, Stack Frame, LIFO...) khi chưa dẫn dắt từ các hình ảnh cũ đã biết (ví dụ: từ "chiếc bàn làm việc RAM" ở MayCham $\rightarrow$ kê thêm "chiếc khay phụ" $\rightarrow$ chồng các khay phụ thành "Call Stack").

2. **Khởi đầu từ Vấn đề lớn & Tách vấn đề (Problem Decomposition):**
   - Không mở đầu bằng công thức hay lý thuyết khô khan.
   - Luôn bắt đầu bằng một **bài toán lập trình thực tế** mà cách làm thông thường (duyệt trâu, đệ quy ngây thơ) bị **bế tắc** (TLE hoặc Stack Overflow).
   - Tách vấn đề lớn đó thành **2–3 vấn đề nhỏ độc lập ($V_1, V_2, V_3$)**, giải quyết dứt điểm từng vấn đề nhỏ rồi ghép lại thành kỹ thuật hoàn chỉnh.

3. **Chuẩn 3 bước trong từng mục kiến thức (Đời sống $\rightarrow$ Lập trình $\rightarrow$ Thuật ngữ):**
   - **Bước 1 (Vấn đề & Cách giải quyết ngoài đời sống):** Đặt ra một tình huống đời thường tương tự mà ai cũng hình dung được (chồng đĩa, xếp hàng, con sâu đo, hỏi hàng ghế...).
   - **Bước 2 (Ánh xạ vào lập trình):** Bê nguyên cách giải quyết ngoài đời đó vào máy tính và code C++ (mô hình bộ nhớ RAM, vòng lặp, điều kiện biên).
   - **Bước 3 (Giải nghĩa tên gọi & Thuật ngữ liên kết ngược về ví dụ đời sống):** Giải thích ý nghĩa từng chữ trong tên gọi tiếng Việt và tiếng Anh, đồng thời đối chiếu rõ: *"Thuật ngữ X này chính là đồ vật/hành động Y trong ví dụ đời sống ở Bước 1"*.

4. **Tiêu chuẩn Giao diện & Tương tác:**
   - Mặc định toàn hệ thống là **Giao diện Tối (Dark Mode)**, đồng bộ tức thì qua `localStorage['cp_dayhoc_theme']`.
   - Bố cục **`.knowledge-card`** rộng rãi toàn chiều ngang, từng bước `.step-life`, `.step-code`, `.step-term` được bố trí thoáng đạt, không ép vào các cột hẹp gây chật chội.
   - **Phòng thí nghiệm Dự đoán trước khi chạy (Prediction-First Sandbox):** Người học chọn dự đoán trước khi bấm Chạy Thử, sau đó mới quan sát kết quả thật từ console.
   - Bắt buộc có **Bài tập Debug tương tác (`debugExercises`)** và **Câu hỏi Trace hành vi Code (`traceCode`)**.

---

## 2. Quy Trình 6 Bước Triển Khai (The 6-Step Workflow)

### Bước 1: Soạn Thảo Nội Dung Gốc Dạng Markdown (`docs/bai_giang_<topic>.md`)
Tạo thư mục bài giảng (ví dụ `05_CayPhanDoan_SegmentTree/`).
Tạo thư mục con `docs/` và viết file Markdown hoàn chỉnh gồm:
- Vấn đề lớn cần giải quyết và chia thành các vấn đề nhỏ.
- Phân tích chi tiết từng vấn đề nhỏ theo đúng 3 bước: Đời sống $\rightarrow$ Ánh xạ lập trình $\rightarrow$ Giải nghĩa thuật ngữ.
- Bảng phân tích độ phức tạp thời gian/bộ nhớ và các bẫy thường gặp (Pitfalls).

### Bước 2: Viết Kho Code Mẫu C++14 Chạy Ngay Được (`Code_Mau/*.cpp`)
Tạo thư mục con `Code_Mau/` chứa tối thiểu 3 file `.cpp`:
- `01_<ChuDe>_CoBan.cpp`: Minh họa cách làm ngây thơ hoặc cấu trúc cơ bản nhất.
- `02_<ChuDe>_ToiUu.cpp`: Minh họa thuật toán tối ưu đã qua phân tích.
- `03_<ChuDe>_UngDung.cpp`: Minh họa bài toán ứng dụng thực tế hoặc mở rộng nâng cao.
- **Yêu cầu:** Mọi file phải biên dịch thành công 100% với `g++ -std=c++14 -O2 -Wall`, có hàm `main()` in ra màn hình dễ hiểu cho học sinh chạy trên Code::Blocks hoặc Linux.

### Bước 3: Đóng Gói Dữ Liệu Tương Tác Vào `lesson-data.js`
Tạo file `lesson-data.js` xuất ra biến `window.LESSON_DATA` theo cấu trúc chuẩn:
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
      subproblem: {
        title: 'Câu hỏi của vấn đề nhỏ?',
        desc: 'Mô tả bối cảnh và nút thắt cần tháo gỡ.'
      },
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
      sandboxes: [ /* Các phòng thí nghiệm code có toggles */ ],
      quiz: [ /* Bộ câu hỏi trắc nghiệm kiểm tra */ ]
    }
  ],
  debugExercises: [ /* Tối thiểu 2 bài tập debug */ ],
  practiceProblems: [ /* Tối thiểu 3 bài tập CSES, VNOJ, Codeforces */ ]
};
```

### Bước 4: Kiểm Soát Chất Lượng Câu Hỏi (Quiz QC Rules)
Bộ câu hỏi trong mỗi bài giảng bắt buộc phải tuân theo các quy tắc kiểm định sau:
1. **Tỷ lệ câu hỏi Trace code $\ge 40\%$:** Đưa ra một đoạn mã ngắn `traceCode` và dữ liệu đầu vào cụ thể, hỏi trạng thái biến/mảng/stack sau bước $k$.
2. **Độ tương đồng cấu trúc phương án 80–90% (Isomorphic Distractors):** Các phương án A, B, C, D trong cùng 1 câu phải có cùng khung câu văn, chỉ khác ở điều kiện biên, giá trị hoặc bản chất. Tuyệt đối không dùng phương án đùa cợt vô lý.
3. **Cân bằng độ dài phương án:** Trong cùng một câu hỏi, độ dài phương án dài nhất và ngắn nhất không được lệch nhau quá $35\%$. Tuyệt đối không để đáp án đúng luôn là câu dài nhất.
4. **Hỗ trợ đủ 3 loại:** `type: 'trace'`, `type: 'single'`, và `type: 'multiple'` (chọn nhiều đáp án có nút kiểm tra).
5. **Bài tập Debug (`debugExercises`):** Cung cấp mã nguồn bị lỗi, bộ test làm code chạy sai, yêu cầu học sinh bấm chọn đúng dòng lỗi (`bugLine`) và chọn bản vá chuẩn (`correctPatch`).

### Bước 5: Tạo Giao Diện Web `index.html` & Cập Nhật Cây Kỹ Năng
1. Tạo file `index.html` trong thư mục bài giảng nạp:
   - `../shared/styles.css`
   - KaTeX 0.16.8 (CSS + JS + auto-render)
   - `../shared/icons.js`, `../shared/progress.js`, `../shared/highlighter.js`, `../shared/lecture-engine.js`
   - `lesson-data.js`
   - Đoạn script khởi tạo: `initLecturePage(window.LESSON_DATA)`.
2. Mở file `shared/portal-data.js` ở thư mục gốc:
   - Thêm nút mới vào mảng `nodes`: `{ id, code, title, track, category, path, summary, x, y, badge }`.
   - Thêm cạnh nối vào mảng `edges`: `{ from, to, label, detail }` giải thích rõ bước nhảy tư duy giữa kiến thức cũ và kiến thức mới.

### Bước 6: Kiểm Thử Tự Động Toàn Diện
Chạy bộ kiểm thử tự động để bảo đảm chất lượng tuyệt đối trước khi bàn giao:
```bash
# 1. Kiểm tra cấu trúc web, tỷ lệ trace, chênh lệch độ dài quiz và tính toàn vẹn dữ liệu
node tests/verify_all_lectures.mjs

# 2. Kiểm tra biên dịch g++ -std=c++14 -O2 -Wall cho tất cả file .cpp
bash tests/verify_all_cpp.sh
```
Nếu có bất kỳ lỗi nào xuất hiện, sửa ngay tại mã nguồn gốc cho đến khi cả hai lệnh đều báo **PASS 100%**.
