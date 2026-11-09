# Đặc Tả Thiết Kế (Design Spec) — Hệ Sinh Thái Bài Giảng Tương Tác Lập Trình Thi Đấu (CP) Cho Người Mới Bắt Đầu & Quy Trình Chuẩn Hóa

- **Ngày tạo:** 2026-11-09
- **Quy mô công việc (Work Size):** Dự án lớn (Full Project) — Xây dựng kiến trúc cổng học tập trung tâm (`index.html`), thư viện giao diện/tương tác dùng chung (`shared/`), 4 bộ bài giảng chuẩn mẫu (3 bài kiến thức đơn lẻ + 1 bài kết hợp) đi kèm nội dung gốc `.md`, code mẫu `.cpp` và bộ kiểm định chất lượng tự động.
- **Đối tượng người học:** Người mới bắt đầu học Lập trình Thi đấu (Competitive Programming - C++14), học sinh dùng Windows (Code::Blocks) hoặc Linux, chưa biết các thuật ngữ chuyên ngành tiếng Anh hay tiếng Việt nâng cao.

---

## 1. Mục Tiêu, Phạm Vi & Nguyên Tắc Cốt Lõi

### 1.1. Mục tiêu (Goals)
1. **Biến repo `DayHoc` thành kho học liệu CP tương tác toàn diện:** Người học chỉ cần `git clone` repo về máy, mở `index.html` ở thư mục gốc là thấy toàn bộ **Cây Kỹ Năng (Skill Tree / Knowledge Graph)**, tiến trình học tập cá nhân và danh sách các bài giảng.
2. **Chuẩn hóa 1 Design System dùng chung (`shared/`):** Thống nhất giao diện giữa tất cả các bài học, hỗ trợ **Chế độ Sáng / Tối (Light / Dark Mode)**, bố cục Card kiến thức rộng (1 cột hoặc tối đa 2 cột: Lý thuyết + Minh họa cạnh nhau), và chỉ sử dụng **icon đơn sắc tối giản (Monochrome SVG / ký hiệu kỹ thuật)**.
3. **Sư phạm "Bắt Đầu Từ Vấn Đề $\rightarrow$ Chia Nhỏ & Ghép Lại $\rightarrow$ Đời Sống $\rightarrow$ Lập Trình $\rightarrow$ Thuật Ngữ":**
   - **Khởi đầu bằng Vấn đề (Problem-First) & Chia nhỏ vấn đề lớn (Decompose & Synthesize):**
     - Luôn bắt đầu mỗi kiến thức bằng **vấn đề thực tế mà kiến thức đó sinh ra để giải quyết** (ví dụ: cách làm ngây thơ bị quá thời gian hay tràn bộ nhớ ở đâu?).
     - Với kiến thức phức tạp, **tách vấn đề lớn thành các vấn đề nhỏ (Sub-problems)** $\rightarrow$ giải quyết lần lượt từng vấn đề nhỏ một $\rightarrow$ **ghép các cách giải quyết nhỏ đó lại với nhau** thành kỹ thuật hoàn chỉnh cuối cùng.
   - **Flow giải thích chuẩn 3 bước cho từng khái niệm (Đời sống $\rightarrow$ Ánh xạ Lập trình $\rightarrow$ Giải nghĩa Thuật ngữ):**
     - *Bước 1 (Vấn đề & Cách giải quyết trong đời sống):* Đặt ra một tình huống tương tự ngoài đời thực và chỉ ra con người ngoài đời giải quyết nó như thế nào.
     - *Bước 2 (Ánh xạ vào lập trình):* Chuyển hóa cách giải quyết ngoài đời đó vào cơ chế hoạt động của máy tính và các bước xử lý trong code.
     - *Bước 3 (Giải nghĩa tên gọi & Thuật ngữ gắn liền với ví dụ đời sống):* Giải thích ý nghĩa từng chữ trong tên gọi tiếng Việt và thuật ngữ chuyên ngành/tiếng Anh, đồng thời **đối chiếu ngược lại xem thuật ngữ đó ứng với hình ảnh nào trong ví dụ đời sống ở Bước 1**.
4. **Tách biệt bài giảng Đơn lẻ và bài giảng Kết hợp:**
   - **Phần 1 (Các thư mục kiến thức đơn lẻ):** Dạy riêng từng kỹ thuật từ gốc rễ (`01_DeQuy_Va_DeQuyDuoi`, `02_NganXep_Va_NganXepDonDieu`, `03_HaiConTro`).
   - **Phần 2 (Thư mục kết hợp chủ đề):** Dạy cách phối hợp các kỹ thuật và chuyển hóa tư duy (`04_KetHop_NganXep_QHD_HaiConTro` — Kết hợp Ngăn xếp với Quy hoạch động, khử đệ quy và đối chiếu với Hai con trỏ).
5. **Kiểm soát chất lượng câu hỏi (Quiz QC), Nhấn mạnh Trace hành vi Code & Bài tập Debug:**
   - Bắt buộc có nhóm câu hỏi **Tự chạy tay theo dõi hành vi của Code (Code Execution Tracing)**.
   - Bắt buộc có mục **Bài Tập Debug (Bug-Hunting Exercises)**: Cấp một đoạn mã nguồn C++ có lỗi tiềm ẩn (lỗi logic, lỗi biên, lỗi thứ tự thao tác), yêu cầu người học tìm đúng dòng gây lỗi, hiểu tại sao nó chạy sai và chọn bản vá đúng.
   - Các đáp án trong câu hỏi trắc nghiệm phải có độ tương đồng cấu trúc chữ **80–90%**, độ dài đáp án đúng được phân bố ngẫu nhiên.
   - Hỗ trợ cả **Trắc nghiệm chọn 1 đáp án đúng (Single-choice)** và **Trắc nghiệm chọn nhiều đáp án đúng (Multi-select)**.
6. **Quy trình sản xuất chuẩn (Markdown-first Workflow):**
   - Soạn thảo các file `.md` nội dung chi tiết trước $\rightarrow$ Chuyển hóa vào cấu trúc Web tương tác + Phòng thí nghiệm Code (`sandboxes`) + `Code_Mau/*.cpp` $\rightarrow$ Đính kèm danh sách bài tập thực chiến (VNOJ, CSES, Codeforces) $\rightarrow$ Đúc kết thành Skill tự động hóa.

### 1.2. Phi mục tiêu & Điều cần tránh (Non-goals & Anti-goals)
- **Không dùng Server Backend hay Database ngoài:** Toàn bộ hệ thống phải chạy được ngay lập tức khi mở file `.html` trực tiếp trên máy tính cá nhân (`file://` hoặc local static server) mà không cần cài Node.js hay Docker để học.
- **Không dùng icon màu mè, rối mắt:** Loại bỏ các emoji sặc sỡ gây mất tập trung; chỉ dùng icon nét mảnh đơn sắc (`currentColor`) hoặc nhãn văn bản kỹ thuật.
- **Không ném thuật ngữ chuyên ngành khi chưa giải thích:** Tuyệt đối không dùng các từ như *Stack Frame, Tail Call Optimization, Monotonic Invariant, Amortized $O(1)$, State Transition* nếu chưa xây dựng hình ảnh đời thường và giải nghĩa tiếng Việt trước đó.
- **Không để câu hỏi trắc nghiệm đoán mò được bằng mắt:** Cấm các phương án nhiễu vô lý hoặc quá ngắn so với đáp án đúng.

---

## 2. Các Phương Án Kiến Trúc Đã Cân Nhắc (Approaches)

1. **Phương án A (Đã chọn): Kiến trúc "Hạt nhân Dùng Chung (`shared/`) + Thư mục Bài Giảng Độc Lập"**
   - Gồm `index.html` ở ngoài cùng (Cây kỹ năng + Quản lý tiến trình), thư mục `shared/` chứa toàn bộ CSS/JS chuẩn, và các thư mục bài giảng riêng biệt (mỗi thư mục có `docs/*.md`, `index.html`, `lesson-data.js`, `Code_Mau/`).
   - *Lý do chọn:* Đảm bảo 100% tính đồng nhất về giao diện, dễ nâng cấp tính năng chung (Dark Mode, Auto-save, Quiz Engine), trong khi vẫn giữ được cấu trúc thư mục rõ ràng kèm `Code_Mau/` cho học sinh mở bằng Code::Blocks.
2. **Phương án B (Loại bỏ): Mỗi thư mục tự chứa bản copy CSS/JS riêng**
   - Gây trùng lặp mã nguồn lớn, khó đồng bộ khi cập nhật tính năng chung.
3. **Phương án C (Loại bỏ): Gom tất cả vào 1 trang Single-Page Application duy nhất**
   - Khó tách rời thư mục `Code_Mau/` theo từng bài và gặp hạn chế CORS khi nạp dữ liệu động qua giao thức `file://`.

---

## 3. Kiến Trúc Thư Mục Toàn Repo

```text
/home/paust/Projects/DayHoc/
├── .gitignore                              # Chứa user_progress.json (không bao giờ xung đột khi git pull)
├── index.html                              # Cổng chính: Cây Kỹ Năng CP (Skill Tree SVG) + Tiến trình + Danh mục bài giảng
├── shared/                                 # Bộ khung Giao diện & Logic dùng chung cho toàn bộ repo
│   ├── styles.css                          # Design System: Light/Dark mode, Card 1-2 cột, Code IDE, Monochrome Icons
│   ├── icons.js                            # Bộ icon SVG đơn sắc tối giản (currentColor)
│   ├── progress.js                         # Cơ chế Auto-save 2 tầng (localStorage + File System Access API / JSON)
│   ├── highlighter.js                      # Bộ tô màu cú pháp C++14 & Inline Code
│   ├── lecture-engine.js                   # Bộ dựng bài giảng: Knowledge Graph, Cards, Code Sandbox, Trace Table, Quiz
│   └── portal-data.js                      # Dữ liệu Cây Kỹ Năng CP toàn cục và danh sách các bài học trên trang chủ
├── MayCham/                                # Prototype gốc (Giữ nguyên hoạt động, liên kết vào Cây Kỹ Năng ở trang chủ)
├── 01_DeQuy_Va_DeQuyDuoi/                  # [Kiến thức đơn lẻ 1] Đệ quy & Đệ quy đuôi
│   ├── docs/                               # Nội dung bài giảng gốc dạng Markdown (.md)
│   ├── index.html                          # Trang bài giảng tương tác
│   ├── lesson-data.js                      # Dữ liệu bài giảng, Sandbox, Trace, Quiz, Bài tập thực chiến
│   └── Code_Mau/                           # Các file .cpp chuẩn C++14 chạy ngay trên Code::Blocks / g++
├── 02_NganXep_Va_NganXepDonDieu/           # [Kiến thức đơn lẻ 2] Ngăn xếp (Stack) & Ngăn xếp đơn điệu
│   ├── docs/
│   ├── index.html
│   ├── lesson-data.js
│   └── Code_Mau/
├── 03_HaiConTro/                           # [Kiến thức đơn lẻ 3] Kỹ thuật Hai con trỏ (Two Pointers)
│   ├── docs/
│   ├── index.html
│   ├── lesson-data.js
│   └── Code_Mau/
├── 04_KetHop_NganXep_QHD_HaiConTro/        # [Bài giảng kết hợp] Ngăn xếp với Quy hoạch động & Liên kết Hai con trỏ
│   ├── docs/
│   ├── index.html
│   ├── lesson-data.js
│   └── Code_Mau/
└── tests/                                  # Bộ kiểm thử tự động toàn repo
    ├── verify_all_lectures.mjs             # Kiểm tra cấu trúc web, Quiz QC (độ giống 80-90%, độ dài, trace), KaTeX
    └── verify_all_cpp.sh                   # Tự động biên dịch g++ -std=c++14 -O2 -Wall cho toàn bộ Code_Mau/
```

---

## 4. Chi Tiết Các Thành Phần Kỹ Thuật & Sư Phạm

### 4.1. Cơ Chế Auto-Save Tiến Trình Học Tập & `user_progress.json`
Để file `user_progress.json` **không nằm sẵn trên repo** (tránh xung đột khi `git pull`) mà chỉ sinh ra ở máy người học và tự động cập nhật:

1. **Tầng 1 — Auto-save Tức Thì (`localStorage`):**
   - Ngay khi người học mở `index.html` hoặc thực hiện bất kỳ thao tác nào (chọn đáp án Quiz, chuyển Module, đánh dấu bài tập đã giải), `shared/progress.js` tự động lưu ngay vào `localStorage['cp_dayhoc_progress_v1']` (0 thao tác thừa).
2. **Tầng 2 — Auto-save Xuống File `user_progress.json` (Nằm trong `.gitignore`):**
   - **Với trình duyệt hỗ trợ File System Access API (Chrome, Edge, Brave, Opera):**
     - Khi người học bấm nút `[ Liên kết file lưu tự động ]` lần đầu tiên, trình duyệt tạo file `user_progress.json` ngay trong thư mục repo và lưu `FileSystemFileHandle` vào `IndexedDB`.
     - Từ thời điểm đó, mỗi khi điểm Quiz hoặc tiến trình thay đổi, hệ thống **tự động ghi đè ngầm (silent auto-save)** thẳng vào file `user_progress.json` trên ổ cứng mà không bật thêm bất kỳ cửa sổ tải xuống nào.
   - **Với mọi trình duyệt khác (Fallback):**
     - Vẫn auto-save 100% vào `localStorage`, đồng thời cung cấp nút `[ Xuất file user_progress.json ]` và `[ Nạp file user_progress.json ]` chỉ với 1 cú nhấp chuột.

### 4.2. Thiết Kế Giao Diện, Chế Độ Sáng/Tối & Bố Cục Card 1–2 Cột
1. **Bảng màu Sáng / Tối (Light / Dark Mode):**
   - **Chế độ Sáng (Mặc định):** Nền giấy kỹ thuật ấm `#F6F3EC`, bề mặt card `#FAF8F3`, chữ chính `#181816`, điểm nhấn cam đất `#C84B31`.
   - **Chế độ Tối (Dark Mode):** Nền than dịu mắt `#121316`, bề mặt card `#1A1C20`, viền `#2A2D34`, chữ chính `#E6E8EC`, chữ phụ `#9BA1AB`, điểm nhấn cam sáng `#E06C50`.
   - Khung code và inline code trong cả 2 chế độ đều giữ nền IDE tối sâu (`#16171A`) kèm tô màu cú pháp C++ rõ nét.
2. **Icon Đơn Sắc (Monochrome Icons):**
   - Tuyệt đối không dùng emoji màu mè. Toàn bộ icon trên thanh điều hướng, nút bấm, trạng thái đúng/sai, danh mục bài tập đều dùng SVG nét mảnh (`stroke="currentColor"`, `stroke-width="1.75"`), tự động đổi màu theo chế độ Sáng/Tối.
3. **Bố cục Card Kiến Thức ("1 Card = 1 Mục Kiến Thức Nhỏ Trọn Vẹn"):**
   - Thay thế hoàn toàn lưới 3–4 cột hẹp cũ bằng **`.knowledge-card`** toàn chiều ngang.
   - Bên trong mỗi `.knowledge-card` hỗ trợ bố cục **`.card-split` (2 cột cân đối)**:
     - **Cột trái (Lý thuyết & Đời sống):** Ví dụ đời thường $\rightarrow$ Giải nghĩa tên gọi tiếng Việt $\rightarrow$ Giải thích bản chất & quy tắc.
     - **Cột phải (Minh họa & Code/Trace):** Sơ đồ trực quan, bảng chạy tay từng bước (Trace table), hoặc đoạn code C++ minh họa trực tiếp.

### 4.3. Tiêu Chuẩn Sư Phạm Cho Người Mới & Cấu Trúc Nội Dung 4 Bài Giảng

#### A. Khung dẫn dắt bài giảng (Problem Decomposition & Life-to-Code Mapping)
1. **Cách mở đầu và xây dựng một kiến thức lớn:**
   - Đặt ra **Bài toán thực tế trong lập trình** mà cách làm thông thường bị bế tắc (chạy quá chậm hoặc tràn bộ nhớ).
   - **Tách vấn đề lớn thành các vấn đề nhỏ ($V_1, V_2, V_3$):** Giải quyết dứt điểm từng vấn đề nhỏ một $\rightarrow$ cuối cùng **ghép các mảnh lời giải nhỏ lại** thành kỹ thuật hoàn chỉnh.
2. **Flow 3 bước bắt buộc bên trong mỗi mục kiến thức:**
   - **Bước 1 — Vấn đề & Cách giải quyết trong đời sống:** Đặt ra vấn đề tương tự ngoài đời sống và chỉ rõ con người ngoài đời giải quyết nó ra sao.
   - **Bước 2 — Ánh xạ vào lập trình:** Đưa cách giải quyết ngoài đời đó vào máy tính và code C++ (dữ liệu lưu ở đâu, vòng lặp/hàm chạy thế nào).
   - **Bước 3 — Giải nghĩa tên gọi & Thuật ngữ (liên kết ngược với ví dụ đời sống):** Giải thích ý nghĩa tên gọi tiếng Việt và thuật ngữ chuyên ngành, đồng thời chỉ rõ *"Thuật ngữ X này chính là vật thể/hành động Y trong ví dụ đời sống ở Bước 1"*.

#### B. Áp dụng vào 4 Bài Giảng Chuẩn Mẫu

1. **Bài 01 — `01_DeQuy_Va_DeQuyDuoi` (Đệ Quy & Đệ Quy Đuôi):**
   - *Vấn đề lớn cần giải quyết:* Khi một hàm tự gọi lại chính nó hàng trăm nghìn lần, tại sao máy tính lại sập và báo lỗi tràn bộ nhớ, và làm sao để hàm gọi đệ quy sâu tùy ý mà chỉ tốn bộ nhớ đúng bằng 1 lần gọi?
   - *Tách thành các vấn đề nhỏ:*
     - **Vấn đề nhỏ 1:** Làm sao chia một việc lớn thành việc nhỏ hơn có cùng cách làm? (*Đời sống:* Đếm số người trong một hàng dọc bằng cách hỏi người đứng trước $\rightarrow$ *Ánh xạ lập trình:* Hàm tự gọi lại chính nó và điểm dừng $\rightarrow$ *Thuật ngữ:* **Đệ quy / Recursion** và **Điều kiện dừng / Base case**).
     - **Vấn đề nhỏ 2:** Tại sao việc "chờ người phía trước trả lời xong rồi mới cộng thêm phần của mình" lại làm đầy bộ nhớ? (*Đời sống:* Mỗi người phải đứng nguyên tại chỗ giữ tờ giấy ghi nhớ việc còn dở $\rightarrow$ *Ánh xạ lập trình:* Máy tính phải chồng thêm một khay nhớ mới trên RAM cho mỗi lần gọi $\rightarrow$ *Thuật ngữ:* **Khung ngăn xếp lời gọi / Stack Frame** và **Tràn ngăn xếp / Stack Overflow**).
     - **Vấn đề nhỏ 3:** Làm sao bàn giao kết quả ngay lập tức để người trước được về nghỉ luôn, không ai phải đứng chờ? (*Đời sống:* Cộng dồn luôn kết quả vào một cuốn sổ chuyền tay rồi trao hẳn cho người tiếp theo $\rightarrow$ *Ánh xạ lập trình:* Đưa phép tính vào tham số tích lũy và để lời gọi hàm ở vị trí cuối cùng tuyệt đối để trình biên dịch dùng lại đúng 1 ô nhớ $\rightarrow$ *Thuật ngữ:* **Đệ quy đuôi / Tail Recursion**, **Biến tích lũy / Accumulator**, **Tối ưu hóa lời gọi đuôi / Tail Call Optimization**).

2. **Bài 02 — `02_NganXep_Va_NganXepDonDieu` (Ngăn Xếp & Ngăn Xếp Đơn Điệu):**
   - *Vấn đề lớn cần giải quyết:* Cho một dãy $N = 200.000$ cột cao thấp khác nhau; tại mỗi cột, làm sao tìm ngay cột gần nhất bên trái thấp hơn (hoặc cao hơn) nó mà không phải quay lại dò từng cột một (mất $N^2$ bước)?
   - *Tách thành các vấn đề nhỏ:*
     - **Vấn đề nhỏ 1:** Làm sao lưu trữ các phần tử vừa đi qua để luôn lấy được phần tử mới nhất ra trước? (*Đời sống:* Chồng đĩa rửa bát / ống cầu lông $\rightarrow$ *Ánh xạ lập trình:* Cấu trúc thêm/lấy ở cùng một đầu $\rightarrow$ *Thuật ngữ:* **Ngăn xếp / Stack**, thao tác `push`, `pop`, `top`).
     - **Vấn đề nhỏ 2:** Trong những cột đã đi qua, những cột nào đã "vô tác dụng vĩnh viễn" và có thể vứt bỏ ngay để không bao giờ phải dò lại? (*Đời sống:* Xếp hàng dọc nhìn về phía trước — khi một người mới đứng vào, những người đứng trước mà cao hơn/thấp hơn bị che khuất hoàn toàn đối với mọi người đến sau, nên mời họ rời khỏi danh sách chờ $\rightarrow$ *Ánh xạ lập trình:* Dùng vòng lặp `while` loại bỏ các phần tử vi phạm thứ tự trước khi đưa phần tử mới vào $\rightarrow$ *Thuật ngữ:* **Ngăn xếp đơn điệu / Monotonic Stack** — "Đơn" là một, "Điệu" là chiều hướng, liên kết với hàng người cao dần trong ví dụ đời sống).
     - **Vấn đề nhỏ 3:** Ghép lại — Tại sao có vòng lặp `while` lồng trong `for` nhưng tổng thời gian vẫn cực nhanh ($O(N)$)? (*Đời sống:* Mỗi người chỉ bước vào hàng đúng 1 lần và bước ra khỏi hàng tối đa 1 lần $\rightarrow$ *Thuật ngữ:* **Độ phức tạp khấu hao / Amortized $O(1)$**).

3. **Bài 03 — `03_HaiConTro` (Kỹ Thuật Hai Con Trỏ):**
   - *Vấn đề lớn cần giải quyết:* Làm sao tìm một cặp phần tử hoặc một đoạn liên tiếp thỏa mãn điều kiện trên mảng lớn trong thời gian tuyến tính mà không phải thử mọi cặp đầu-cuối ($O(N^2)$)?
   - *Tách thành các vấn đề nhỏ:*
     - **Vấn đề nhỏ 1:** Khi dữ liệu đã có thứ tự, nếu biết một lựa chọn đã "quá lớn" hoặc "quá nhỏ", làm sao loại bỏ hàng loạt trường hợp thừa không cần thử? (*Đời sống:* Hai người đứng ở hai đầu kệ sách đã xếp theo giá tiền từ rẻ đến đắt để tìm 2 cuốn cộng lại đúng bằng số tiền đang có $\rightarrow$ *Ánh xạ lập trình:* Hai biến chỉ số đi từ hai đầu mảng vào giữa).
     - **Vấn đề nhỏ 2:** Làm sao duy trì một đoạn liên tiếp co giãn trên dãy số dương mà không phải tính lại tổng từ đầu? (*Đời sống:* Con sâu đo bò trên cành cây — đầu vươn tới trước để ăn thêm, đuôi co lên khi quá dài $\rightarrow$ *Ánh xạ lập trình:* Hai biến chỉ số cùng tiến về bên phải $\rightarrow$ *Thuật ngữ:* **Hai con trỏ / Two Pointers** và **Cửa sổ trượt / Sliding Window**).

4. **Bài 04 (Kết Hợp) — `04_KetHop_NganXep_QHD_HaiConTro` (Ngăn Xếp với Quy Hoạch Động & Sợi Dây Liên Kết Hai Con Trỏ):**
   - *Vấn đề lớn cần giải quyết:* Khi giải các bài toán lập kế hoạch nhiều bước (Quy hoạch động), làm sao tránh tràn bộ nhớ đệ quy và làm sao tăng tốc bước tra cứu kết quả cũ từ $O(N^2)$ xuống $O(N)$?
   - *Tách thành các vấn đề nhỏ & Ghép nối 3 chủ đề:*
     - **Mảnh ghép 1 (Từ Đệ quy sang Ngăn xếp tự quản lý & Quy hoạch động):** Giải quyết việc máy tính hết bộ nhớ ngăn xếp tự động bằng cách tự tạo ngăn xếp trên vùng nhớ lớn, và lưu lại kết quả các bài toán con vào bảng (**Quy hoạch động** — lập bảng kế hoạch cập nhật dần).
     - **Mảnh ghép 2 (Dùng Ngăn xếp đơn điệu để tăng tốc Quy hoạch động):** Khi tính `dp[i]` phải lấy giá trị tốt nhất từ các vị trí trước đó bị giới hạn bởi chiều cao/giá trị, dùng Ngăn xếp đơn điệu gom các trạng thái cũ để cập nhật `dp[i]` chỉ trong 1 bước.
     - **Mảnh ghép 3 (Đặt Ngăn xếp đơn điệu và Hai con trỏ lên bàn cân):** Tổng hợp bức tranh lớn — khi nào bài toán đoạn con chỉ cần Hai con trỏ, khi nào bắt buộc phải kết hợp Ngăn xếp/Hàng đợi đơn điệu với Quy hoạch động.

### 4.4. Kiểm Soát Chất Lượng Câu Hỏi (Quiz QC), Trace Hành Vi Code & Bài Tập Debug

Mỗi bài giảng phải có đầy đủ hệ thống rèn luyện phản xạ thực hành gồm **Bài tập Debug tương tác** và **3 dạng câu hỏi Quiz**:

#### A. Bài Tập Debug Tương Tác (Interactive Bug-Hunting Exercises)
Trong mỗi bài giảng sẽ có mục riêng **"Thử Thách Debug: Bắt Lỗi Code Thực Tế"**:
- Cung cấp đề bài ngắn gọn + **Đoạn mã nguồn C++ đang bị lỗi** (có đánh số dòng từ $1 \dots M$) + **Bộ dữ liệu mẫu khiến code chạy sai / tràn bộ nhớ / lặp vô tận**.
- Người học thực hiện 2 bước:
  1. **Chỉ điểm dòng lỗi & Chẩn đoán nguyên nhân:** Xác định chính xác dòng nào gây lỗi và chuyện gì đã xảy ra trong bộ nhớ tại dòng đó khi chạy bộ test.
  2. **Chọn bản vá chuẩn (Patch):** Chọn đoạn code sửa lỗi đúng (và có thể bấm chạy thử ngay để đối chiếu kết quả trước/sau khi sửa).

#### B. Ba Dạng Câu Hỏi Kiểm Tra (Quiz)
1. **Dạng 1 — Trace Hành Vi Của Code (Code Execution Tracing - Chiếm tối thiểu 40% số câu):**
   - Đưa ra một đoạn code C++ ngắn gọn (có đánh số dòng) và một bộ dữ liệu đầu vào cụ thể (ví dụ `a = [5, 2, 6, 1, 4]`).
   - Hỏi người học về:
     - Trạng thái chính xác của ngăn xếp `st`, mảng `dp`, hoặc cặp chỉ số `(trai, phai)` ngay sau khi vòng lặp chạy xong bước `i = k`.
     - Thứ tự các phần tử bị lấy ra (`pop`) hoặc số lần câu lệnh bên trong vòng `while` được thực thi.
     - Hành vi thay đổi thế nào nếu sửa 1 ký hiệu trong code (ví dụ đổi `<` thành `<=`, hoặc đổi thứ tự 2 dòng lệnh).
2. **Dạng 2 — Trắc Nghiệm Chọn 1 Đáp Án (Single-Choice Deep Concept):**
   - Kiểm tra sự hiểu sâu về bản chất và điều kiện áp dụng.
3. **Dạng 3 — Trắc Nghiệm Chọn Nhiều Đáp Án (Multi-Select Verification):**
   - Người học phải tích chọn tất cả các mệnh đề đúng (từ 2 đến 3 ý đúng trên 4–5 phương án) và bấm nút `[ Kiểm tra đáp án ]`.

**Tiêu chuẩn Kiểm định Tự động (Được kiểm tra bằng script `tests/verify_all_lectures.mjs`):**
- **Độ tương đồng phương án (High Lexical & Structural Similarity):** Các phương án trong cùng một câu hỏi phải có cấu trúc câu tương đồng, sử dụng chung tập từ vựng chuyên môn của câu hỏi đó (không dùng các câu đùa vô nghĩa).
- **Chống lộ đáp án qua độ dài (Anti-Length-Bias):** Trong mỗi câu hỏi, độ dài (số ký tự) của phương án dài nhất và ngắn nhất không được chênh lệch quá 35%, và trong một bài giảng, vị trí đáp án đúng cũng như thứ tự độ dài của đáp án đúng phải biến thiên ngẫu nhiên (đáp án đúng không được phép luôn là câu dài nhất).

### 4.5. Tuyển Tập Bài Tập Thực Chiến Đính Kèm
Cuối mỗi bài giảng đều có mục **Bài Tập Thực Chiến (Curated Practice Problems)** dẫn link trực tiếp tới các trang chấm bài uy tín (**CSES, VNOJ, Codeforces, LeetCode**), được chia theo 3 mức độ:
- **Mức 1 — Khuôn mẫu (Template):** Áp dụng trực tiếp đoạn code trong bài giảng.
- **Mức 2 — Vận dụng (Adaptation):** Cần biến đổi nhẹ điều kiện hoặc kết hợp bước tiền xử lý.
- **Mức 3 — Thử thách / Kết hợp (Challenge):** Kết hợp nhiều kỹ thuật (ví dụ Ngăn xếp đơn điệu + Quy hoạch động).
- Mỗi bài tập đều có: *Tên bài + Nền tảng + Độ khó + Gợi ý nhận diện dấu hiệu (ẩn/hiện được) + Ô đánh dấu "Đã hoàn thành" (tự động lưu vào tiến trình học tập).*

---

## 5. Những Quyết Định Kỹ Thuật Do Builder Chủ Động Xử Lý (Builder's Calls)

1. **Cách ánh xạ từ `.md` sang Web:** Trong mỗi thư mục bài giảng, thư mục `docs/` lưu trữ toàn bộ nội dung bài giảng bằng Markdown chuẩn để giáo viên đọc/sửa nhanh; dữ liệu chạy trên trình duyệt được đóng gói vào `lesson-data.js` (biến toàn cục `window.LESSON_DATA`) để đảm bảo mở trực tiếp `index.html` qua giao thức `file://` trên Windows/Linux không bao giờ bị lỗi chặn CORS của trình duyệt.
2. **Đồ thị Kiến thức (Knowledge Graph):** Vẽ bằng SVG tương tác trực tiếp (không phụ thuộc thư viện ngoài nặng nề), hiển thị rõ các nút (Nodes) là các bài học/mục kiến thức và các cạnh có hướng (Edges) ghi chú rõ *"Tại sao cần bước chuyển này"*.
3. **Đóng gói Workflow thành Skill:** Sau khi hoàn thiện và kiểm thử xong hệ thống bài giảng, tạo skill địa phương tại `.agents/skills/cp-lecture-workflow/SKILL.md` định nghĩa quy trình 5 bước để các phiên làm việc tiếp theo tự động tuân thủ đúng chuẩn này.
