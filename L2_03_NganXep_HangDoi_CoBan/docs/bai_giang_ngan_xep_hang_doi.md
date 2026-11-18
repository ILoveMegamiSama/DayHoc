# Bài L2-03: Ngăn Xếp (`stack`) & Hàng Đợi (`queue`) Cơ Bản

> **Pha kiến thức:** Tầng 2 — Pha 2 STL Lớp 9 (`pha2_stl`)  
> **Tiền đề đã học (`knownConcepts`):**
> - Cơ chế chồng khay phụ `Stack Frame` trên `Call Stack` (~8MB) và lỗi `Stack Overflow` từ bài `MOD-01` & `L1-03`.
> - RAM là bàn làm việc tốc độ cao của CPU (`MOD-00`), phân tích độ phức tạp $O(1), O(N)$ (`L1-04`).
> - Bộ công cụ STL mở đầu (`std::vector`, `std::pair` ở `L1-05`; `std::priority_queue` dùng `.top()`, `std::deque` hai đầu ở `L1-06`).
>
> **Kiến thức mới mở khóa (`newConcepts`):**
> - Ngăn xếp tường minh `std::stack<T>` (nguyên lý **LIFO** — Vào sau, Ra trước): `push`, `top`, `pop`, `empty`, `size` trong $O(1)$, rào chắn chống RTE và kỹ thuật **khử đệ quy** tránh tràn ~8MB Call Stack.
> - Ứng dụng kinh điển của Stack: khớp dãy ngoặc nhiều loại `()[]{}`, tính biểu thức hậu tố (**RPN**) với `stack<long long>`, khử cặp liền kề và mô phỏng hoán vị ngăn xếp.
> - Hàng đợi `std::queue<T>` (nguyên lý **FIFO** — Vào trước, Ra trước): `push`, `front`, `back`, `pop`, `empty`, `size` trong $O(1)$, phân biệt dứt điểm `.front()` vs `.top()`, sinh số nhị phân và mở đường cho **thuật toán loang / BFS** (`while (!q.empty())`).
>
> **Ranh giới tiền đề:** Không sử dụng `L2-04` (Quay lui / Bitmask), `L2-05` (Tham lam), `L2-06..L2-09` (Quy hoạch động), hay `MOD-02` (Ngăn xếp đơn điệu chuyên sâu `L[i]`, `R[i]`, Histogram).

---

## 0. Bài Toán Lớn & Tách Vấn Đề (Problem Decomposition)

Trong `MOD-01`, bạn đã thấy hệ điều hành tự đặt các khay phụ lên **Call Stack** mỗi lần hàm tự gọi lại chính nó. Nhưng cách làm ẩn đó có hai giới hạn lớn:
1. **Không tự do điều khiển:** Ta không thể trực tiếp nhìn xem trong Call Stack có dấu ngoặc `'('` nào vừa mở hay vừa đẩy hai toán hạng nào lên khay.
2. **Tràn bộ nhớ ~8MB:** Nếu một chuỗi xử lý sâu $N = 10^6$ bước dùng đệ quy thường, Call Stack lập tức sập (`Segmentation fault`), trong khi bộ nhớ Heap của bài thi vẫn còn tới 256MB–512MB!

Ngược lại, với những bài toán xử lý người xếp hàng công bằng $N = 2 \cdot 10^5$ lượt (xóa phần tử đầu tiên, thêm vào cuối hàng), nếu dùng `vector::erase(v.begin())` thì mỗi lượt phải dịch toàn bộ mảng mất $O(N) \Rightarrow O(N^2)$ (**TLE**!).

Ta phân rã bài toán thành **3 vấn đề nhỏ độc lập**:
- **$V_1$:** Làm chủ `std::stack<T>` (LIFO) tường minh, rào chắn an toàn `!st.empty()` và khử đệ quy sâu $N = 10^6$.
- **$V_2$:** Giải 3 lớp ứng dụng kinh điển của Stack: Khớp ngoặc `()[]{}`, tính biểu thức hậu tố (RPN) và khử cặp / hoán vị ngăn xếp.
- **$V_3$:** Làm chủ `std::queue<T>` (FIFO) để mô phỏng hàng chờ $O(1)$, phân biệt `.front()` vs `.top()`, và mở đường cho loang từng lớp (BFS).

---

## 1. Vấn Đề Nhỏ 1: `std::stack` & Nguyên Lý LIFO ($V_1$)

### 1.1. Từ Chồng Khay Call Stack (`MOD-01`) Đến `std::stack<T>`
- **Bước 1 (Đời sống):** Quan sát chồng khay thức ăn ở căng-tin: khay rửa sạch sau cùng được úp lên **đỉnh chồng**, và người đến lấy cơm cũng rút đúng chiếc khay **trên đỉnh** đó ra trước. Nếu rổ khay đã cạn sạch mà vẫn thò tay bốc thì chỉ bốc trúng không khí (sự cố)!
- **Bước 2 (Lập trình C++14):**
  - `st.push(x)`: đặt `x` lên đỉnh — $O(1)$.
  - `st.top()`: chỉ **đọc** giá trị ở đỉnh — $O(1)$.
  - `st.pop()`: **vứt bỏ** phần tử ở đỉnh (lưu ý: `pop()` trả về `void`, bắt buộc đọc `st.top()` TRƯỚC khi gọi `st.pop()`!) — $O(1)$.
  - `st.empty()`, `st.size()`: kiểm tra rỗng và lấy số lượng phần tử — $O(1)$.
  - **Rào chắn sống còn:** Luôn kiểm tra `if (!st.empty())` trước mọi lệnh `st.top()` và `st.pop()` để tránh lỗi truy cập vùng nhớ bất hợp pháp (RTE / Undefined Behavior).
- **Bước 3 (Thuật ngữ):**
  - **LIFO (`Last In, First Out`):** Vào sau — Ra trước.
  - **`Container Adaptor`:** `std::stack` là lớp vỏ siết kỷ luật bên ngoài `std::deque` (mặc định), khóa thao tác chỉ số `st[i]` để đảm bảo mọi tương tác chỉ đi qua 1 cửa ở đỉnh.

### 1.2. Khử Đệ Quy Sâu Bằng Stack Tường Minh
- Khi cần chia việc phân cấp (ví dụ chia đoạn $[L, R]$ thành $[L, \text{mid}]$ và $[\text{mid} + 1, R]$) hoặc xử lý chuỗi công việc sâu tới $N = 10^6$:
  - Đẩy nhiệm vụ vào `stack<pair<int, int>>` (nằm trên bộ nhớ **Heap** co giãn tới hàng trăm MB).
  - Chú ý **quy tắc đảo thứ tự đẩy**: muốn xử lý nhánh trái trước, phải `push(nhánh phải)` trước rồi mới `push(nhánh trái)` sau để nhánh trái nằm trên đỉnh và được `pop()` trước!

---

## 2. Vấn Đề Nhỏ 2: Ứng Dụng Kinh Điển Của Stack ($V_2$)

### 2.1. Khớp Dãy Ngoặc Nhiều Loại `()[]{}`
- **Bước 1 (Đời sống):** Mở các hộp lồng nhau: chiếc hộp vừa mở **sau cùng** bắt buộc phải là chiếc hộp được đóng nắp **đầu tiên**.
- **Bước 2 (Lập trình):** Duyệt từng ký tự `c` trong xâu `s`:
  - Gặp `'('`, `'['`, `'{'`: `st.push(c);`.
  - Gặp ngoặc đóng:
    1. **Chốt chặn 1 (trong vòng lặp):** `if (st.empty()) return false;` — bắt trường hợp thừa ngoặc đóng như `"())"`. Nếu viết thiếu `else return false;` mà chỉ viết `else if (!st.empty() && ...)` sẽ bỏ sót ngoặc đóng dư!
    2. Lấy `top = st.top(); st.pop();` và kiểm tra khớp cặp `()`, `[]`, `{}`.
  - **Chốt chặn 2 (sau vòng lặp):** `return st.empty();` — bắt trường hợp còn dư ngoặc mở chưa đóng như `"(()"`.

### 2.2. Tính Biểu Thức Hậu Tố (RPN) & Khử Cặp / Hoán Vị
- **Biểu thức hậu tố (`Reverse Polish Notation — RPN`):** Toán tử viết ngay sau 2 toán hạng (ví dụ `5 1 2 + 4 * + 3 -`), loại bỏ hoàn toàn dấu ngoặc.
  - Gặp số: `st.push(stoll(tok))` (dùng `stack<long long>` tránh tràn `int`).
  - Gặp toán tử: rút 2 số trên đỉnh. **Cảnh báo thứ tự:** Số rút ra đầu tiên là toán hạng **phải (`b`)**, số rút ra thứ hai là toán hạng **trái (`a`)** $\Rightarrow$ thực hiện `a - b` hoặc `a / b` (nhiều bạn viết nhầm `b - a`!).
- **Khử cặp liền kề giống nhau:** Khi duyệt ký tự `c`, nếu `!st.empty() && st.top() == c` thì `st.pop()`, ngược lại `st.push(c)` — chạy gọn $O(N)$ thay vì xóa giữa chuỗi $O(N^2)$.
- **Hoán vị ngăn xếp (`SPOJ-STPAR`):** Dùng `stack<int>` mô phỏng ngõ cụt kết hợp biến `need = 1`, hễ `st.top() == need` thì đẩy ra đường chính (`st.pop(); need++;`).
- *(Mở đường lên `MOD-02`: Khi nâng cấp điều kiện `st.top() == c` thành giữ tính đơn điệu bằng `while (!st.empty() && st.top() <= a[i]) st.pop();`, ta sẽ mở khóa **Ngăn xếp đơn điệu** ở bài `MOD-02`.)*

---

## 3. Vấn Đề Nhỏ 3: Hàng Đợi `std::queue` & Nguyên Lý FIFO ($V_3$)

### 3.1. Quầy Vé Xem Phim FIFO & Phân Biệt `.front()` vs `.top()`
- **Bước 1 (Đời sống):** Hàng người xếp hàng mua vé xem phim: người đến **trước** đứng ở **đầu hàng** và được phục vụ **trước**; người mới đến đi ra **cuối hàng**.
- **Bước 2 (Lập trình C++14):**
  - `q.push(x)`: đưa vào cuối hàng — $O(1)$.
  - `q.front()`: xem phần tử đầu hàng (sắp được phục vụ) — $O(1)$.
  - `q.back()`: xem phần tử cuối hàng (vừa mới vào) — $O(1)$.
  - `q.pop()`: cho phần tử đầu hàng rời đi (`void`) — $O(1)$.
  - **Cảnh báo tên hàm:** `std::stack` và `std::priority_queue` (`L1-06`) dùng `.top()`, còn `std::queue` bắt buộc dùng **`.front()`** (gọi `q.top()` sẽ báo lỗi biên dịch Compile Error!).

### 3.2. Sinh Số Nhị Phân & Mở Đường Cho Loang / BFS
- **Sinh $N$ số nhị phân đầu tiên (`"1", "10", "11", ...`):** Đẩy `"1"` vào `queue<string> q;`, mỗi bước lấy `cur = q.front(); q.pop();`, in `cur` rồi lần lượt đẩy `cur + "0"` trước, `cur + "1"` sau. Tính chất FIFO bảo đảm toàn bộ số độ dài $k$ ra hết trước mọi số độ dài $k + 1$.
- **Mở đường cho Loang / BFS (`while (!q.empty())`):** Khởi tạo `vector<int> dist(MAX, -1); dist[start] = 0; q.push(start);`. Khi rút `u` từ `q.front()`, với mỗi trạng thái kế tiếp `v` hợp lệ thỏa `dist[v] == -1`, ta **cập nhật `dist[v] = dist[u] + 1;` NGAY LÚC ĐẨY `q.push(v);`** (tuyệt đối không đợi tới lúc `pop()` ra mới đánh dấu, kẻo cùng một trạng thái bị đẩy trùng lặp vào hàng đợi gây TLE/MLE!).

---

## 4. Bảng Độ Phức Tạp & Các Bẫy Thường Gặp

| Cấu trúc | Nguyên lý | Đọc đầu ra | `push` / `pop` | Bẫy phổ biến cần tránh |
| :--- | :--- | :--- | :--- | :--- |
| `std::stack<T>` | LIFO | `st.top()` | $O(1)$ / $O(1)$ | Gọi `top()`/`pop()` khi `empty()` (RTE); quên `return st.empty()` ở cuối hàm ngoặc; đảo `a - b` thành `b - a` trong RPN |
| `std::queue<T>` | FIFO | `q.front()` | $O(1)$ / $O(1)$ | Gõ nhầm `q.top()`; nhầm `q.back()`; dùng `stack` thay `queue` khi cần duyệt theo lớp; quên đánh dấu `dist[v]` ngay lúc `push` |

---

## 5. Danh Sách Bài Tập Thực Chiến Đã Xác Thực (8 Bài — 3 Cấp Độ)

| Mã bài | Tên bài | Trang chấm | Cấp độ | Trọng tâm kỹ thuật |
| :--- | :--- | :--- | :--- | :--- |
| `CF-26B` | [26B - Regular Bracket Sequence](https://codeforces.com/problemset/problem/26/B) | Codeforces | Mức 1 | `stack<char>` đếm độ dài dãy con ngoặc hợp lệ lớn nhất ($\|s\| \le 10^6$) |
| `CF-1374C` | [1374C - Move Brackets](https://codeforces.com/problemset/problem/1374/C) | Codeforces | Mức 1 | `stack<char>` đếm số cặp ngoặc mở chưa khớp cần xoay |
| `ABC278-A` | [A - Shift](https://atcoder.jp/contests/abc278/tasks/abc278_a) | AtCoder | Mức 1 | `queue<int>` thực hiện $K$ lần `q.pop(); q.push(0);` |
| `SPOJ-STPAR` | [STPAR - Street Parade](https://www.spoj.com/problems/STPAR/) | SPOJ | Mức 2 | `stack<int>` mô phỏng ngõ cụt LIFO kiểm tra hoán vị $1..n$ |
| `ABC240-D` | [D - Strange Balls](https://atcoder.jp/contests/abc240/tasks/abc240_d) | AtCoder | Mức 2 | `stack<pair<int, int>>` nén các bóng trùng liên tiếp trong $O(N)$ |
| `ABC247-D` | [D - Cylinder](https://atcoder.jp/contests/abc247/tasks/abc247_d) | AtCoder | Mức 2 | `queue<pair<long long, long long>>` nén theo lô và cộng dồn `long long` |
| `CSES-2162` | [Josephus Problem I](https://cses.fi/problemset/task/2162) | CSES | Mức 3 | `queue<int>` mô phỏng vòng tròn $n \le 2 \cdot 10^5$ trong $O(N)$ (tránh `vector.erase` $O(N^2)$) |
| `CF-520B` | [520B - Two Buttons](https://codeforces.com/problemset/problem/520/B) | Codeforces | Mức 3 | `queue<int>` + `dist[]` loang từng lớp mở đường cho BFS |
