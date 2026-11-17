# Đặc Tả Thiết Kế (Design Spec) — Lộ Trình Học CP Chuẩn Lớp 9 Đến Hết Quy Hoạch Động Cơ Bản & Nâng Cấp Quy Trình `cp-lecture-workflow`

- **Ngày tạo:** 2026-11-17
- **Nhánh Git thực hiện:** `feat/grade9-core-dp-roadmap`
- **Quy mô:** Dự án kiến trúc tổng thể (Architectural) — Nâng cấp quy trình sinh bài giảng, tái cấu trúc Cây Kỹ Năng theo Hướng A, viết chương phụ chuẩn hóa code C++ CP, nâng cấp các bài cũ và triển khai đầy đủ toàn bộ hệ thống bài giảng Tầng 1 → hết Tầng 2 (Quy hoạch động cơ bản).
- **Đối tượng người học thống nhất:** Học sinh **Lớp 9 (THCS)** mới bắt đầu học C++ & Lập trình thi đấu (Competitive Programming - C++14).
- **Mục tiêu tốt nghiệp của lộ trình chuẩn:** Hoàn thiện vững vàng đến **Hết Tầng 2 — Quy hoạch động cơ bản (Core DP)**.

---

## 1. Mục Tiêu & Các Quyết Định Kiến Trúc Đã Chốt

1. **Triển khai thực chất toàn bộ Tầng 1 & Tầng 2 (không dừng ở trạng thái `planned`):**
   - Toàn bộ các bài còn thiếu trong Tầng 1, Tầng 2 và Chương phụ chuẩn hóa code C++ sẽ được biên soạn đầy đủ (`docs/*.md`, `Code_Mau/*.cpp`, `lesson-data.js`, `index.html`, kiểm định bởi subagent) theo các đợt triển khai kế tiếp.
   - Cơ chế `status: 'ready' | 'planned'` trong `shared/portal-data.js` vẫn được thiết kế bài bản theo **Hướng A** để bản đồ DAG luôn toàn vẹn trong suốt quá trình cuốn chiếu từng đợt, và chuyển dần sang `'ready'` 100% khi hoàn tất Tầng 1–2.
2. **Xử lý di sản `MOD-01..04` theo Hướng A:**
   - Không xóa các thư mục bài giảng đã xây dựng (`00_NhapMon_LapTrinh_CPP`, `MayCham`, `01_DeQuy_Va_DeQuyDuoi`, `02_NganXep_Va_NganXepDonDieu`, `03_HaiConTro`, `04_KetHop_NganXep_QHD_HaiConTro`).
   - Đặt `MOD-02` (phần Ngăn xếp đơn điệu) và `MOD-04` (Tối ưu DP bằng Monotonic Stack/Deque) vào vùng **Mở Rộng Sau Tầng 2 (Tùy chọn)**; đồng thời sửa lại các cạnh phụ thuộc trong `shared/portal-data.js` để `MOD-04` chỉ nối sau khi học sinh đã hoàn thành **`L2-06` (Nhập môn Quy hoạch động)**, **`MOD-02`** và **`MOD-03`**.
3. **Thống nhất chuẩn đối tượng Lớp 9 giữa `cp-lecture-workflow` và `cp-quiz-workflow`** (*ghi chú: `.agents/skills/cp-quiz-workflow/` hiện đang bị ignore trong `.gitignore` nên chỉ đồng bộ cục bộ khi cần, không stage/commit vào git*):
   - Chia làm 2 pha trình độ ngôn ngữ trên Cây Kỹ Năng:
     * **Pha 1 — Nền tảng C++ (`MOD-Pre` → `L1-04`):** Chỉ dùng mảng tĩnh toàn cục (`const int N = ...; int a[N];`), hàm chỉ nhận tham số nguyên thủy; tránh thuật ngữ hàn lâm nặng (thay `Call Stack` bằng *"ngăn xếp lời gọi hàm / bộ nhớ stack"*).
     * **Pha 2 — STL & Thuật toán (`L1-05` Vector/Sort → hết Tầng 2 & Mở rộng):** Sau bài `L1-05`, chính thức mở khóa `std::vector`, `pair`, `sort`, truyền tham chiếu `&` cho container, và toàn bộ bộ công cụ STL (`set`, `map`, `priority_queue`, `deque`).

---

## 2. Năm Nâng Cấp Bắt Buộc Trong Quy Trình `cp-lecture-workflow`

Cập nhật trực tiếp vào `.agents/skills/cp-lecture-workflow/SKILL.md`:

### 2.1. Chuẩn Hóa Code C++ Theo Hướng CP (`CP C++ Standard`) + Chương Phụ Riêng
- Mọi mã nguồn C++ trong `Code_Mau/*.cpp`, `lesson-data.js` (sandbox, quiz, debug), và `docs/*.md` của tất cả bài giảng phải tuân thủ thống nhất chuẩn CP:
  ```cpp
  #include <bits/stdc++.h>
  using namespace std;

  int main() {
      ios_base::sync_with_stdio(false);
      cin.tie(NULL);
      // ... dùng '\n' thay cho endl khi in nhiều dòng
      return 0;
  }
  ```
- *Ngoại lệ có chủ đích:* Các bài tập minh họa trong `MOD-Pre` (khi học sinh mới viết dòng code đầu tiên) vẫn sử dụng `#include <bits/stdc++.h>` và `using namespace std;` (thay cho `#include <iostream>` + `std::cout` cũ), nhưng chưa ép học sinh gõ `ios_base::sync_with_stdio(false); cin.tie(NULL);` cho tới ngay bài **Chương Phụ `00b_ChuanHoa_Code_CP`** (`MOD-CP0`).
- **Tạo mới Chương Phụ `00b_ChuanHoa_Code_CP` (`MOD-CP0`):**
  - Giải phẫu 3 câu hỏi bản chất theo đúng 3 bước Đời sống → Lập trình → Thuật ngữ:
    1. Vì sao `#include <bits/stdc++.h>` giống "thùng đồ nghề đa năng" thay vì phải gọi từng bộ `<iostream>`, `<vector>`, `<algorithm>`, `<stack>`? (Kèm lưu ý thời gian biên dịch & tính chuẩn GCC trong CP).
    2. `using namespace std;` là gì? (Ẩn dụ: cùng làm chung trong một xưởng `std`, không cần lúc nào cũng gọi họ tên đầy đủ `std::cout`, và cảnh báo đặt tên biến trùng như `count`, `min`, `max`, `left`, `right`).
    3. `ios_base::sync_with_stdio(false); cin.tie(NULL);` và `'\n'` vs `endl` là gì? (Ẩn dụ: cắt dây đồng bộ giữ chân xe tải giao hàng C và C++, tháo dây ràng buộc xả bộ đệm mỗi lần nhập xuất để đọc $10^6$ số trong 0.1s thay vì TLE; kèm bẫy cấm trộn `scanf/printf` với `cin/cout` khi đã bật fast I/O).

### 2.2. Double-Check Bắt Buộc Toàn Bộ Bài Tập OJ Ngoài (Zero-Hallucination OJ Gate)
- **Cấm tuyệt đối** bịa đặt mã bài (như `VNOJ-GIAITHUA`, `MOD-Pre-P01`), gắn link trang chủ chung chung (`https://oj.vnoi.info/`), hoặc gán sai thuật toán (như gắn `CSES-1076` Sliding Window Median vào Deque DP).
- Mọi bài tập trong `practiceProblems` bắt buộc phải được **tìm kiếm và kiểm tra chéo trên web (`search_web`)** trước khi đưa vào `lesson-data.js`:
  1. Kiểm tra mã bài, tiêu đề chính xác và URL trực tiếp trỏ tới đúng đề bài trên CSES / Codeforces / VNOJ / AtCoder / LeetCode.
  2. Xác nhận đề bài và giới hạn ($N$, $A_i$, Time Limit) phù hợp đúng với kiến thức và độ phức tạp của bài giảng.
  3. Rà soát và thay thế toàn bộ các bài bị gán sai/link trang chủ ở các bài giảng cũ (`00..04`).

### 2.3. Kiểm Định Tối Ưu — Chỉ Verify Toàn Bộ 1 Lần Duy Nhất Sau Khi Hoàn Thành
- Không chạy lại toàn bộ `verify_all_lectures.mjs` và `verify_all_cpp.sh` lặp đi lặp lại sau mỗi chỉnh sửa nhỏ.
- Nâng cấp `tests/verify_all_lectures.mjs` và `tests/verify_all_cpp.sh`:
  - Hỗ trợ tùy chọn `--lesson <folder>` (hoặc biến môi trường) để kiểm tra nhanh chỉ riêng bài đang làm nếu cần test cục bộ.
  - Chạy bộ kiểm định **toàn repo 1 lần duy nhất** ngay khi kết thúc đợt triển khai (sau mọi chỉnh sửa cuối cùng).
  - Bổ sung kiểm tra toàn vẹn DAG của `shared/portal-data.js` (mọi `from`/`to` hợp lệ, không chu trình, mọi bài `status !== 'planned'` đều có file `index.html`, và không có link OJ dạng trang chủ `oj.vnoi.info/` trần).

### 2.4. Tăng Số Lượng & Phân Tầng `practiceProblems`
- Nâng chuẩn tối thiểu từ 3 bài lên **tối thiểu 6 bài tập thực chiến (khuyến nghị 6–8 bài)** cho mỗi bài giảng (trừ `MOD-00` Máy chấm vốn thực hành tự sinh test trên các bài mẫu đã có, vẫn có danh sách bài thực hành stress-test thực chiến tối thiểu 6 bài).
- Phân tầng rõ 3 cấp trong mỗi bài:
  - `tier: 1` (**Cơ bản — 2–3 bài**): Áp dụng trực tiếp khuôn mẫu vừa học.
  - `tier: 2` (**Thông hiểu — 2–3 bài**): Biến tấu điều kiện biên, kiểu dữ liệu hoặc ghép kiến thức bài trước.
  - `tier: 3` (**Vận dụng Lớp 9 — 1–2 bài**): Chuẩn đề HSG Tin học Lớp 9 / Chuyên Tin / Div.2 A–B.

### 2.5. Bắt Buộc Gọi Subagent Kiểm Định Chất Lượng Bài Giảng
- Sau khi tạo xong mỗi bài giảng (hoặc cụm bài giảng), bắt buộc gọi **subagent độc lập** (dựa trên bộ tiêu chí của `tests/audit_pedagogy_subagent.sh` kết hợp rà soát kỹ thuật) để chấm điểm và phản biện:
  1. **Sư phạm Lớp 9:** Đủ Problem-First → Tách vấn đề → 3 bước (Đời sống → Lập trình → Thuật ngữ); không lọt thuật ngữ chưa dạy; không vi phạm pha mảng toàn cục vs `vector`.
  2. **Chuẩn Code C++ CP:** Đúng `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`.
  3. **Chất lượng Quiz & Debug:** Trace code $\ge 40\%$, phương án nhiễu đồng dạng 80–90%, chênh lệch độ dài $\le 35\%$ (ưu tiên $\le 20\%$), vị trí đáp án phân bổ ngẫu nhiên, lỗi `bugLine` khớp chính xác code.
  4. **Độ tin cậy OJ:** Đủ $\ge 6$ bài, không link trang chủ, đúng thuật toán mục tiêu.
- Ngưỡng đạt chuẩn: **$\ge 90/100$** và không còn lỗi logic/tiền đề nghiêm trọng.

---

## 3. Lộ Trình Đầy Đủ Theo Hướng A (23 Node — Hoàn Thiện Hết Tầng 2: DP Cơ Bản)

### Track 1 — `foundations`: Nền Tảng Giao Tiếp, Chuẩn CP & Hệ Thống (3 bài)
| STT | Mã | Thư mục | Tên bài giảng | Trạng thái | Kiến thức cốt lõi & Tiền đề |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | `MOD-Pre` | `00_NhapMon_LapTrinh_CPP` | Nhập Môn Lập Trình C++ | Đã có *(nâng cấp)* | `main()`, `;`, biến `int/double/string/char/bool`, chia nguyên, `cin/cout`; chuẩn hóa `bits/stdc++.h` + `using namespace std;` + 6 bài OJ thật |
| 2 | `MOD-CP0` | `00b_ChuanHoa_Code_CP` | **Chương Phụ: Chuẩn Hóa Code C++ Hướng Thi Đấu (CP)** | **Viết mới** | `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, `'\n'` vs `endl`, bẫy trộn `printf/scanf` |
| 3 | `MOD-00` | `MayCham` | Kiến Trúc Máy Tính, `g++` & Tự Code Máy Chấm | Đã có *(nâng cấp)* | RAM vs Ổ cứng, Shell, `PATH`, `g++`; phần Stress Test hoàn chỉnh liên kết thực hành thêm sau `L2-04` |

### Track 2 — `tier1_core`: Tầng 1 — C++ Lập Trình & Tư Duy Thuật Toán Sơ Khai (7 bài)
| STT | Mã | Thư mục | Tên bài giảng | Trạng thái | Kiến thức cốt lõi & Tiền đề |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 4 | `L1-01` | `L1_01_DieuKhienLuong_VongLap` | Điều Khiển Luồng, Vòng Lặp & Số Nguyên Lớn | **Viết mới** | `if/else`, toán tử quan hệ/logic, `for/while`, kiểu `long long`, bẫy tràn số `int` ($10^9 \times 10^9$), phép chia dư `%` |
| 5 | `L1-02` | `L1_02_Mang_Xau_MoPhong` | Mảng 1D/2D, Xâu Ký Tự & Mô Phỏng | **Viết mới** | Mảng tĩnh toàn cục `const int N`, mảng 2 chiều, `string` cơ bản, bài toán Mô phỏng (`Simulation`) & Chia trường hợp (`Casework`) |
| 6 | `L1-03` | `L1_03_Ham_ThamChieu_BoNho` | Hàm, Tham Chiếu & Bộ Nhớ Stack/Heap | **Viết mới** | Hàm `void`/trả về, tham trị vs tham chiếu (`&`), biến toàn cục vs cục bộ, dung lượng Stack ~8MB vs Heap |
| 7 | `L1-04` | `L1_04_DoPhucTap_ThuatToan` | Phân Tích Độ Phức Tạp Thuật Toán ($O$-notation) | **Viết mới** | Đếm số phép toán, $O(1), O(\log N), O(N), O(N\log N), O(N^2), O(2^N)$, quy tắc $10^8$ phép/giây, đọc ràng buộc $N$ chọn thuật toán |
| 8 | `L1-05` | `L1_05_Vector_Pair_SapXep` | `std::vector`, `pair` & Sắp Xếp (`std::sort`) | **Viết mới** | Chuyển từ mảng tĩnh sang `vector`, `pair`, `sort`, viết hàm so sánh (Custom Comparator) — *Mở khóa truyền `vector&` vào hàm* |
| 9 | `L1-06` | `L1_06_STL_TraCuu_HangDoi` | Bộ Công Cụ STL (`set`, `map`, `priority_queue`, `deque`) | **Viết mới** | Tra cứu & đếm tần suất $O(\log N)$, bẫy `unordered_map` collision, hàng đợi ưu tiên `priority_queue` (Heap), `deque` |
| 10 | `L1-07` | `L1_07_SoHoc_NhapMon_CP` | Số Học Nhập Môn Cho CP | **Viết mới** | Ước số $\sqrt{N}$, Sàng nguyên tố Eratosthenes, GCD/LCM (Euclid), tính chất đồng dư `(a*b)%M`, `(a-b+M)%M`, Lũy thừa nhị phân $O(\log K)$ |

### Track 3 — `tier2_dp`: Tầng 2 — Công Cụ Tuyến Tính, Duyệt Toàn Bộ & Quy Hoạch Động Cơ Bản (11 bài — Điểm Tốt Nghiệp Lớp 9)
| STT | Mã | Thư mục | Tên bài giảng | Trạng thái | Kiến thức cốt lõi & Tiền đề |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 11 | `L2-01` | `L2_01_MangCongDon_MangHieu` | Mảng Cộng Dồn (1D/2D) & Mảng Hiệu | **Viết mới** | Prefix Sum 1D & 2D truy vấn tổng đoạn $O(1)$, Difference Array cập nhật tăng đoạn $O(1)$ |
| 12 | `L2-02` | `L2_02_TimKiemNhiPhan` | Tìm Kiếm Nhị Phân & Chặt Nhị Phân Đáp Án | **Viết mới** | `lower_bound` / `upper_bound` trên mảng tăng, Binary Search on Answer (hàm kiểm tra `check(mid)` đơn điệu) |
| 13 | `MOD-03` | `03_HaiConTro` | Kỹ Thuật Hai Con Trỏ & Cửa Sổ Trượt | Đã có *(nâng cấp)* | Nối từ `L1-05` (`sort`) & `L2-01` (cộng dồn); chuẩn hóa code CP + 6 bài OJ thật |
| 14 | `MOD-01` | `01_DeQuy_Va_DeQuyDuoi` | Đệ Quy, Ngăn Xếp Lời Gọi Hàm & Đệ Quy Đuôi | Đã có *(nâng cấp)* | Nối từ `L1-03` & `MOD-00`; chuẩn hóa code CP + sửa `VNOJ-GIAITHUA` + đủ 6 bài OJ thật |
| 15 | `L2-03` | `L2_03_NganXep_HangDoi_CoBan` | Ngăn Xếp (`stack`) & Hàng Đợi (`queue`) Cơ Bản | **Viết mới** | Cơ chế LIFO (khớp ngoặc, tính biểu thức) và FIFO (hàng chờ mô phỏng), nối tự nhiên từ `MOD-01` |
| 16 | `L2-04` | `L2_04_DuyetToanBo_QuayLui_Bitmask` | Cây Đệ Quy, Quay Lui & Bitmask Tập Con | **Viết mới** | Cây đệ quy đa nhánh, Quay lui (Backtracking) sinh hoán vị/tập con/N-Queens, Nhánh cận, Phép toán Bit (`&`, `|`, `^`, `<<`) duyệt $2^N$; thực hành Stress Test với `MOD-00` |
| 17 | `L2-05` | `L2_05_ThamLam_Va_DiemGay` | Thuật Toán Tham Lam & Điểm Gãy Của Tham Lam | **Viết mới** | Tham lam lập lịch, nối dây (`priority_queue`), chứng minh chọn tham lam; chỉ rõ bài toán Tham lam **bị sai** (đổi tiền, chọn quà) để mở đường sang DP |
| 18 | `L2-06` | `L2_06_QHD_NhapMon_1D` | **Nhập Môn Quy Hoạch Động (DP 1D & Truy Vết)** | **Viết mới** | Từ Tham lam sai & Cây đệ quy trùng lặp → Đệ quy có nhớ (Memoization) & Lập bảng (Tabulation), Pull vs Push DP, DP 1D (Cầu thang, Frog 1/2, Đổi tiền min), Truy vết |
| 19 | `L2-07` | `L2_07_QHD_Luoi2D_BoNho` | **DP Lưới 2D & Tối Ưu Bộ Nhớ (Rolling Array)** | **Viết mới** | DP đường đi max/min & đếm đường đi có vật cản trên bảng $N \times M$, kỹ thuật cuộn mảng 2D → 1D giảm RAM |
| 20 | `L2-08` | `L2_08_QHD_CaiTui_ToHopDem` | **Tổ Hợp Đếm Sơ Cấp & DP Cái Túi (Knapsack)** | **Viết mới** | Quy tắc cộng/nhân, $C_n^k$ Pascal → 0/1 Knapsack, Unbounded Knapsack, Phân biệt **Hoán vị vs Tổ hợp** (Coin Comb I vs II), Đổi chiều Giá trị (*Knapsack 2*) |
| 21 | `L2-09` | `L2_09_QHD_DayCon_Xau_TrangThai` | **DP Dãy Con, Xâu & Máy Trạng Thái Cơ Bản** | **Viết mới** | LIS ($O(N^2)$), LCS, Edit Distance, DP máy trạng thái ngày (*Vacation*) — **Hoàn thành Tầng 2 (DP Cơ bản Lớp 9)** |

### Track 4 — `extension`: Mở Rộng Sau Tầng 2 *(Bài đã có sẵn, ngoài chuẩn bắt buộc Lớp 9)*
| STT | Mã | Thư mục | Tên bài giảng | Trạng thái | Cầu nối phụ thuộc trong `portal-data.js` |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 22 | `MOD-02` | `02_NganXep_Va_NganXepDonDieu` | Ngăn Xếp & Ngăn Xếp Đơn Điệu | Đã có *(nâng cấp)* | Nối từ `L2-03` (`stack` cơ bản); chuẩn hóa code CP + 6 bài OJ thật |
| 23 | `MOD-04` | `04_KetHop_NganXep_QHD_HaiConTro` | Kết Hợp: Ngăn Xếp, QHD & Hai Con Trỏ | Đã có *(nâng cấp)* | Nối từ **`L2-06` (Nhập môn DP)** + **`MOD-02`** + **`MOD-03`**; thay `CSES-1076` bằng bài đúng Deque/Stack DP + chuẩn hóa code CP + 6 bài OJ thật |

---

## 4. Kiến Trúc Giao Diện Cổng Học Tập (`shared/portal-data.js` & `index.html`)

1. **`shared/portal-data.js`:**
   - Thêm thuộc tính `status: 'ready' | 'planned'` và `phase: 'pha1_array' | 'pha2_stl'` cho từng node.
   - Bổ sung 4 `tracks` (`foundations`, `tier1_core`, `tier2_dp`, `extension`) với màu sắc theo hệ thống token hiện có (`#57534E`, `#1B6B4A`, `#C84B31`, `#9A5B13` — không dùng màu tím).
   - Thiết kế tọa độ DAG theo lưới 4 hàng × các cột nối mạch lạc, giữ khoảng cách tối thiểu giữa các node $\ge 70\text{px}$ để badge trên cạnh nối không bị đè chữ, đồng thời bảo toàn ràng buộc của `tests/verify_00_nhap_mon.sh` (`n0.x - 90 >= 0` và khoảng cách `x` giữa `nhap_mon_cpp` và `may_cham` $\ge 60\text{px}$).
2. **`index.html` & `shared/styles.css`:**
   - Mở rộng `#skill-tree-svg` với `viewBox` phù hợp toàn bộ đồ thị mới (tự động vừa khung qua nút `Vừa Khung`, kết hợp sẵn Pan/Zoom và bộ lọc nhanh theo Track ở phần danh mục thẻ bài bên dưới).
   - Node có `status === 'planned'` (trong quá trình cuốn chiếu các đợt) hiển thị viền nét đứt (`stroke-dasharray`), nhãn `"Đang biên soạn"`, vẫn click xem được `prerequisites` / `newConcepts`, còn nút mở bài được vô hiệu hóa rõ ràng. Khi toàn bộ các đợt hoàn tất, tất cả 21 bài Tầng 1–2 sẽ ở trạng thái `'ready'`.

---

## 5. Phân Đợt Triển Khai (Implementation Batches)

Vì toàn bộ phạm vi gồm hạ tầng + chương phụ + nâng cấp 6 bài cũ + viết mới 15 bài Tầng 1–2, quá trình lập kế hoạch (`writing-plans`) và thực thi sẽ chia thành **5 đợt rõ ràng**:
- **Đợt 1 — Hạ tầng, Workflow, Chương Phụ & Chuẩn Hóa Bài Cũ:**
  1. Cập nhật `.agents/skills/cp-lecture-workflow/SKILL.md` (5 nâng cấp 2.1–2.5).
  2. Cập nhật `shared/portal-data.js`, `index.html`, `shared/styles.css` theo Hướng A.
  3. Nâng cấp `tests/verify_all_lectures.mjs` và `tests/verify_all_cpp.sh` (hỗ trợ `--lesson`, kiểm tra tính toàn vẹn DAG và cấm link OJ trang chủ).
  4. Tạo mới **Chương Phụ `00b_ChuanHoa_Code_CP` (`MOD-CP0`)**.
  5. Chuẩn hóa C++ CP Standard + tìm kiếm xác thực lại và nâng lên $\ge 6$ bài tập OJ cho `00_NhapMon_LapTrinh_CPP`, `MayCham`, `01..04`.
- **Đợt 2 — Tầng 1 Phần Đầu (`L1-01` → `L1-04`):** `L1_01_DieuKhienLuong_VongLap`, `L1_02_Mang_Xau_MoPhong`, `L1_03_Ham_ThamChieu_BoNho`, `L1_04_DoPhucTap_ThuatToan`.
- **Đợt 3 — Tầng 1 Phần Sau & Tầng 2 Tuyến Tính (`L1-05` → `L2-03`):** `L1_05_Vector_Pair_SapXep`, `L1_06_STL_TraCuu_HangDoi`, `L1_07_SoHoc_NhapMon_CP`, `L2_01_MangCongDon_MangHieu`, `L2_02_TimKiemNhiPhan`, `L2_03_NganXep_HangDoi_CoBan`.
- **Đợt 4 — Quay Lui, Tham Lam & Quy Hoạch Động Cơ Bản (`L2-04` → `L2-09`):** `L2_04_DuyetToanBo_QuayLui_Bitmask`, `L2_05_ThamLam_Va_DiemGay`, `L2_06_QHD_NhapMon_1D`, `L2_07_QHD_Luoi2D_BoNho`, `L2_08_QHD_CaiTui_ToHopDem`, `L2_09_QHD_DayCon_Xau_TrangThai`.
- **Đợt 5 — Nghiệm Thu Toàn Diện 1 Lần Duy Nhất:** Chạy 1 lần `node tests/verify_all_lectures.mjs` + `bash tests/verify_all_cpp.sh` trên toàn repo và hoàn tất vòng kiểm định Subagent cho toàn bộ bài mới.

---

## 6. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

- Toàn bộ 21 bài học trong lộ trình chuẩn Lớp 9 (3 bài `foundations`, 7 bài `tier1_core`, 11 bài `tier2_dp`) + 2 bài `extension` đều ở trạng thái `ready`, biên dịch 100% không lỗi/warning với `g++ -std=c++14 -O2 -Wall`.
- 100% file `.cpp` và code mẫu tuân thủ chuẩn CP (`#include <bits/stdc++.h>`, `using namespace std;`, và `ios_base::sync_with_stdio(false); cin.tie(NULL);` kể từ sau `MOD-Pre`).
- 100% `practiceProblems` ($\ge 6$ bài/bài giảng) có mã bài & URL thực tế đã được tìm kiếm đối chiếu qua web.
- Tỷ lệ trace code $\ge 40\%$, chênh lệch độ dài đáp án $\le 35\%$, đủ $\ge 2$ `debugExercises`/bài, và đạt điểm thẩm định $\ge 90/100$ từ subagent kiểm định.
- Chạy `verify_all_lectures.mjs` và `verify_all_cpp.sh` **1 lần duy nhất** ở bước cuối nghiệm thu đạt PASS 100%.
