# Bài Giảng `L2-04` — Cây Đệ Quy, Quay Lui & Bitmask Tập Con

- **Mã chuyên đề:** `L2-04` (Tầng 2 — Pha 2 STL Lớp 9)
- **Kiến thức tiền đề đã có (`MOD-Pre` + `MOD-CP0` + `MOD-00` + `MOD-01` + `L1-01` $\rightarrow$ `L1-07` + `L2-01`..`L2-03`):**
  - Đã thành thạo **Bộ Khung Chuẩn CP**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`.
  - Đã hiểu bản chất **Đệ quy & Call Stack** (`MOD-01`), **Máy chấm / Stress Testing** (`MOD-00`: `generate()`, `solve_trau()`, `solve_full()`), phân tích độ phức tạp $10^8$ phép tính/giây (`L1-04`), và các cấu trúc `vector`, `string`, `sort`, `lower_bound` (`L1-05` $\rightarrow$ `L2-03`).
- **Kiến thức mới mở khóa ở `L2-04`:**
  - Mô hình **Cây đệ quy đa nhánh** và khung **Quay lui (`Backtracking`)** 3 bước: *Chọn $\rightarrow$ Thử Đệ Quy $\rightarrow$ Trả Lại Trạng Thái* để sinh xâu nhị phân $2^N$, tổ hợp $C(N, K)$, hoán vị $N!$ (`used[]`) và viết hàm `solve_trau()` làm "đáp án chuẩn" cho Máy chấm (`MOD-00`).
  - Quay lui trên bàn cờ **$N$-Queens** với kiểm tra cột và 2 đường chéo trong $O(1)$ (`col[c]`, `diag1[r - c + n]`, `diag2[r + c]`) và kỹ thuật **Nhánh cận (`Branch & Bound`)** cắt sớm nhánh vô vọng.
  - **Phép toán Bit (`&`, `|`, `^`, `<<`, `>>`)** và **Bitmask Tập Con $2^N$** (`for (int mask = 0; mask < (1 << n); mask++)`), cùng 2 bẫy kinh điển: ưu tiên toán tử (`==` mạnh hơn `&`, và `(mask & (1 << i)) == 1` sai khi $i \ge 1$) và tràn dấu `1 << k` khi $k \ge 31$ (phải viết `1LL << k`).
  *(Lưu ý ranh giới kiến thức: Học sinh chưa học Tham lam `L2-05` hay Quy hoạch động `L2-06+` — bài giảng này không dùng lý thuyết Tham lam hay DP.)*

---

## 1. Bức Tranh Toàn Cảnh: Khi Vòng Lặp `for` Bế Tắc & Lúc Cần "Đáp Án Chuẩn" Để Stress Test

Khi đọc đề thi Lớp 9 / Chuyên Tin, bạn sẽ thường xuyên gặp **3 bài toán khiến vòng lặp `for` thông thường bó tay**:

1. **Bế tắc 1 — Số lượng vòng `for` phụ thuộc vào $N$ lúc chạy:** Cần thử chọn ra một tập con từ $N \le 20$ món đồ, hoặc sắp xếp $N \le 10$ người thành hàng dọc. Nếu viết $3$ vòng `for` lồng nhau thì chỉ chạy được $N = 3$; khi $N$ nhập từ `cin`, bạn không thể gõ $N$ vòng `for` lồng nhau sẵn trong code! Đồng thời, khi bạn cài được một thuật toán nhanh $O(N \log N)$ nhưng bị **WA ở test ẩn**, bạn cần một hàm `solve_trau()` (chạy trên $N \le 8$) đảm bảo **100% không sai sót logic** để đưa vào **Máy chấm (`MOD-00`)** đối chiếu tìm test lỗi.
2. **Bế tắc 2 — Cây tìm kiếm phình to hàng triệu nhánh vô ích:** Ở bài xếp $N$ quân hậu hay tìm tập con tối ưu đạt tổng $\le S$, nếu thử hết mọi vị trí hoặc duyệt hết tới tận lá rồi mới kiểm tra điều kiện, số lời gọi hàm phình thành $N^N$ hoặc $2^N$ rất lãng phí dù nhánh đó đã **chắc chắn sai hoặc thua kỷ lục** từ nửa đường.
3. **Bế tắc 3 — Duyệt $2^N$ tập con bằng đệ quy tốn bộ nhớ và khó viết gọn:** Mỗi lần gọi đệ quy truyền theo trạng thái vừa dài dòng vừa tiêu tốn khung nhớ Call Stack, trong khi một số nguyên `int` 32-bit đã chứa sẵn được tới $20..30$ công tắc Bật/Tắt trong RAM!

> **Chiến lược giải quyết (`Problem Decomposition`):** Chia bài toán lớn thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)**:
> - $V_1$: Cây Đệ Quy & Khung Quay Lui (Sinh Nhị Phân, Tổ Hợp, Hoán Vị & Làm Oracle Cho Máy Chấm `MOD-00`).
> - $V_2$: Quay Lui Trên Lưới ($N$-Queens với $O(1)$ dịch chỉ số đường chéo) & Kỹ Thuật Nhánh Cận (`Branch & Bound`).
> - $V_3$: Phép Toán Bit & Bitmask Tập Con $2^N$ (tránh 2 bẫy ưu tiên `&` và `1LL << k`).

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Cây Đệ Quy & Khung Quay Lui (Sinh Nhị Phân, Tổ Hợp, Hoán Vị & Oracle Máy Chấm)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Lối đi trong mê cung có phấn đánh dấu:** Giả sử bạn đứng trước một ngã ba trong mê cung:
  1. **Chọn (Choose):** Chọn nhánh trái, bước vào và **vạch một nét phấn lên tường** đánh dấu đường đang đi.
  2. **Thử Đệ Quy (Explore):** Đi tiếp theo nhánh đó để giải các ngã rẽ sâu hơn.
  3. **Trả Lại Trạng Thái (Unchoose / Backtrack):** Khi nhánh trái đã đi hết hoặc gặp ngõ cụt, bạn quay lui đúng về ngã ba ban đầu và **xóa nét phấn vừa vẽ** để thử tiếp nhánh phải như chưa từng đi nhánh trái!
- **Áp dụng vào 3 dạng sinh cơ bản và ngưỡng giới hạn $N$ (dựa trên $10^8$ phép tính/giây của `L1-04`):**
  - **Sinh xâu nhị phân độ dài $N$:** Mỗi vị trí có $2$ lựa chọn (`'0'` hoặc `'1'`) $\rightarrow$ tổng cộng $2^N$ lá. Nếu $N \le 20$, $2^{20} \approx 1.05 \cdot 10^6$ nút (chạy trong vài chục mili-giây). Nếu $N = 25$, $2^{25} \approx 3.3 \cdot 10^7$ đã mấp mé ngưỡng TLE!
  - **Sinh tổ hợp chập $K$ của $\{1..N\}$:** Dùng thêm tham số `start` để số chọn tiếp theo luôn $\ge$ số vừa chọn $+ 1$, đảm bảo tạo đúng $\binom{N}{K}$ tập tăng ngặt và không lặp lại các hoán vị cùng một tập như `{1, 2}` và `{2, 1}`.
  - **Sinh hoán vị độ dài $N$:** Dùng mảng `vector<bool> used(n + 1, false)` (như thẻ đã ngồi ghế). Chỉ chọn giá trị `v` chưa dùng, gắn `used[v] = true`, `cur.push_back(v)`, gọi đệ quy, rồi bắt buộc hoàn tác cả `cur.pop_back()` lẫn `used[v] = false`! Với $N \le 10$, $10! = 3\,628\,800$ chạy an toàn; từ $N \ge 12$ ($12! \approx 4.79 \cdot 10^8$) là TLE ngay!
- **Liên kết sống còn với `MOD-00` (Máy chấm / Stress Testing):**
  - Trong phòng thi, khi code thuật toán nhanh (như `sort` + `lower_bound` ở `L2-02`) bị WA ở test ẩn mà bạn không biết sai ở trường hợp biên nào, hãy viết ngay một hàm `solveTrau()` bằng Quay lui ($O(2^N)$ hoặc $O(N!)$) chạy cho bộ test ngẫu nhiên nhỏ $N \le 8$ sinh bằng `mt19937`! Vì code quay lui mô tả **nguyên văn định nghĩa đề bài**, nó gần như không bao giờ sai logic, trở thành **Oracle (đáp án chuẩn)** bắt lỗi code nhanh chỉ sau vài giây!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

void genPerm(int n, vector<int>& cur, vector<bool>& used) {
    if ((int)cur.size() == n) {
        for (int i = 0; i < n; i++) cout << cur[i] << (i + 1 == n ? '\n' : ' ');
        return;
    }
    for (int v = 1; v <= n; v++) {
        if (used[v]) continue;
        used[v] = true;            // 1. Chọn
        cur.push_back(v);
        genPerm(n, cur, used);     // 2. Thử đệ quy
        cur.pop_back();            // 3. Trả lại trạng thái
        used[v] = false;
    }
}
```
> **Lưu ý hiệu năng Pha 2:** Luôn truyền `vector<int>& cur` và `vector<bool>& used` bằng **tham chiếu `&`**! Nếu quên dấu `&`, mỗi nút trên cây đệ quy phải sao chép toàn bộ mảng tốn thêm $O(N)$ bộ nhớ và thời gian.

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Cây quyết định (`Decision Tree`):** Sơ đồ phân nhánh mọi lựa chọn ở từng bước, từ gốc (chưa chọn gì) tới các nút lá (một cấu hình hoàn chỉnh).
- **Quay lui (`Backtracking`):** Chiến lược duyệt theo chiều sâu trên cây quyết định, luôn thực hiện đủ 3 pha: *Chọn $\rightarrow$ Đệ quy $\rightarrow$ Hoàn tác trạng thái*.
- **Hàm đối chứng chuẩn (`Brute-Force Oracle`):** Hàm giải vét cạn (chậm nhưng đơn giản, chắc chắn đúng trên $N \le 8$) dùng để đối chiếu tìm lỗi trong quy trình Stress Test (`MOD-00`).

---

### 2.2. Vấn Đề Nhỏ 2: Quay Lui Trên Lưới ($N$-Queens) & Kỹ Thuật Nhánh Cận (`Branch & Bound`)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Bài toán xếp $N$ quân hậu ($N$-Queens):** Đặt $N$ quân hậu lên bàn cờ $N \times N$ sao cho không 2 quân nào cùng hàng, cùng cột, hoặc cùng đường chéo.
  - **Giảm số chiều từ $N^2$ xuống $N$:** Mỗi hàng chắc chắn có **đúng 1 quân hậu**, nên ta chỉ cần xét từng hàng `r = 0, 1, ..., n - 1` và chọn cột `c` cho hàng đó.
  - **Kiểm tra xung đột trong $O(1)$:** Thay vì quét lại các quân hậu đã đặt mất $O(N)$ mỗi lần thử ô `(r, c)`, ta dùng $3$ mảng đánh dấu:
    1. Cột: `usedCol[c]` (chỉ số `0 .. n - 1`).
    2. Đường chéo phụ (hướng `/`): mọi ô trên cùng đường chéo này có tổng **`r + c` không đổi** (từ `0` tới `2n - 2`).
    3. Đường chéo chính (hướng `\`): mọi ô trên cùng đường chéo này có hiệu **`r - c` không đổi** (từ `-(n - 1)` tới `n - 1`). Vì chỉ số mảng C++ không được âm (và **tuyệt đối không dùng `abs(r - c)`** vì sẽ gộp nhầm 2 đường chéo đối xứng qua đường chéo chính!), ta phải **dịch dương thêm `+ n`**: `diagMain[r - c + n]`!
- **Kỹ thuật Nhánh cận (`Branch & Bound`) — Cắt phăng nhánh vô vọng:**
  - Giả sử bạn cần chọn tập con các món đồ có trọng lượng dương $w_i > 0$ sao cho tổng **lớn nhất nhưng $\le S$**. Đang có kỷ lục tốt nhất là `bestSum = 95`:
    1. **Cắt vượt ngưỡng (`Feasibility Pruning`):** Nếu tổng đang chọn `curSum > S`, do các món còn lại đều dương nên cộng thêm chỉ làm vượt $S$ nặng hơn $\rightarrow$ **`return;` ngay!**
    2. **Cắt thua kỷ lục bằng cận lạc quan (`Optimistic Bound Pruning`):** Tính sẵn tổng mọi món còn lại từ vị trí `idx` trở đi là `suffixSum[idx]` (dùng Mảng cộng dồn hậu tố giống `L2-01`). Nếu ngay cả trường hợp **lạc quan nhất** (nhét hết toàn bộ phần còn lại) mà `curSum + suffixSum[idx] <= bestSum`, nhánh này **vĩnh viễn không thể phá kỷ lục** $\rightarrow$ **`return;` ngay lập tức!**
  - Sắp xếp $w$ giảm dần trước khi quay lui giúp nhanh chóng tìm thấy `bestSum` lớn ngay ở vài nhánh đầu, khiến điều kiện cắt nhánh kích hoạt dày đặc (từ hơn $131\,071$ lời gọi ở $N = 16$ xuống chỉ còn vài chục lời gọi!).

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
// Kiểm tra ô (r, c) trong O(1) với dịch chỉ số đường chéo chính + n
if (usedCol[c] || diagMain[r - c + n] || diagAnti[r + c]) continue;
usedCol[c] = diagMain[r - c + n] = diagAnti[r + c] = true;
backtrack(r + 1);
usedCol[c] = diagMain[r - c + n] = diagAnti[r + c] = false;
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Kiểm tra xung đột $O(1)$ (`O(1) Conflict Check`):** Dùng mảng đánh dấu theo đại lượng bất biến của cột (`c`) và đường chéo (`r + c`, `r - c + n`).
- **Nhánh cận (`Branch & Bound`):** Kỹ thuật tối ưu quay lui bằng cách ước lượng cận tốt nhất có thể đạt được ở một nhánh; nếu nhánh đó vi phạm ràng buộc hoặc không thể vượt qua kỷ lục `best` hiện tại thì **cắt tỉa (`Pruning`)** ngay.

---

### 2.3. Vấn Đề Nhỏ 3: Phép Toán Bit & Bitmask Tập Con $2^N$

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Dãy công tắc đèn trong một con số nguyên:** Hãy tưởng tượng một bảng điều khiển có $N$ công tắc đèn đánh số từ $0$ đến $N - 1$ (từ phải sang trái). Thay vì tạo cả một mảng `bool den[20]`, máy tính lưu trạng thái bật (`1`) / tắt (`0`) của cả $20$ chiếc đèn vào **đúng 1 biến `int mask`** (biểu diễn nhị phân 32-bit)!
  - Số `1 << i` chính là $2^i$ (chỉ duy nhất công tắc thứ `i` bật `1`, mọi bit khác bằng `0`).
  - **Kiểm tra bit `i` đang Bật hay Tắt:** `(mask >> i) & 1` (dịch bit `i` về tận cùng bên phải rồi `&` với `1` để ra đúng `0` hoặc `1`).
  - **Bật bit `i`:** `mask | (1 << i)` (OR với `2^i`).
  - **Tắt bit `i`:** `mask & ~(1 << i)` (AND với bit đảo của `2^i`).
  - **Đảo bit `i` (0 $\leftrightarrow$ 1):** `mask ^ (1 << i)` (XOR với `2^i`).
- **2 bẫy C++ kinh điển khiến hàng nghìn thí sinh mất điểm oan:**
  1. **Bẫy 1 — Thứ tự ưu tiên toán tử (`==` mạnh hơn `&`) và lỗi so sánh `== 1`:**
     - Nếu viết `if (mask & (1 << i) == 0)`, C++ hiểu thành `mask & ((1 << i) == 0)` $\rightarrow$ `mask & 0` $\rightarrow$ **luôn sai (`0`)**!
     - Nếu viết `if ((mask & (1 << i)) == 1)`, khi `i = 2` và bit `2` đang bật, phép `mask & (1 << 2)` trả về **`4` chứ không phải `1`** $\rightarrow$ sai ở mọi bit $i \ge 1$!
     - **Quy tắc an toàn tuyệt đối:** Luôn viết **`if ((mask >> i) & 1)`** hoặc **`if ((mask & (1 << i)) != 0)`**!
  2. **Bẫy 2 — Tràn bit `1 << k` khi $k \ge 31$:**
     - Hằng số `1` mặc định là kiểu **`int` 32-bit có dấu** (chỉ có 31 bit giá trị dương $0..30$, bit $31$ là bit dấu!). Khi viết `1 << 31`, kết quả tràn thành `-2147483648`; còn khi $k \ge 32$, `1 << k` là **Undefined Behavior**!
     - Khi thao tác với bit từ vị trí $31$ trở lên (tới $62$), **bắt buộc viết `1LL << k`**!
- **Bitmask tập con $2^N$ không cần đệ quy:**
  - Khi chạy `for (int mask = 0; mask < (1 << n); mask++)`, mỗi giá trị `mask` ứng với **đúng 1 tập con duy nhất** trong $2^N$ tập con của $N$ phần tử! Kiểm tra `if ((mask >> i) & 1)` để biết phần tử `a[i]` có mặt trong tập con `mask` hay không.
  - Tổng độ phức tạp là $O(2^N \cdot N)$: với $N \le 20$, $2^{20} \cdot 20 \approx 2 \cdot 10^7$ phép tính (AC dưới 0.2s). Với $N \le 15$, chỉ $\approx 5 \cdot 10^5$ phép tính.

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 4;
    vector<int> a = {10, 20, 30, 40};
    for (int mask = 0; mask < (1 << n); mask++) {
        long long sum = 0;
        for (int i = 0; i < n; i++) {
            if ((mask >> i) & 1) sum += a[i]; // An toàn tuyệt đối với mọi bit i
        }
        if (__builtin_popcount(mask) == 2) {
            cout << "Tap con 2 phan tu co tong = " << sum << '\n';
        }
    }
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Mặt nạ bit (`Bitmask`):** Dùng dãy các bit `0/1` trong một số nguyên để mã hóa trạng thái chọn/không chọn của cả một tập hợp phần tử.
- **Thứ tự ưu tiên toán tử (`Operator Precedence`):** Luật C++ thực hiện `==`, `!=` trước `&`, `|`, `^` — đòi hỏi phải bọc ngoặc `((mask & (1 << i)) != 0)` hoặc ưu tiên viết `(mask >> i) & 1`.
- **Hàm đếm bit bật (`__builtin_popcount` / `__builtin_popcountll`):** Hàm tích hợp của trình biên dịch GCC giúp đếm số bit `1` trong biến `int` (hoặc `long long` với hậu tố `ll`) gần như tức thì.

---

## 3. Bảng Phân Tích Độ Phức Tạp, Ngưỡng $N$ & Các Bẫy Thường Gặp

| Dạng duyệt toàn bộ | Độ phức tạp | Ngưỡng $N$ an toàn ($\le 10^8$ ops/s) | Khi nào ưu tiên dùng? |
| :--- | :---: | :---: | :--- |
| Sinh xâu nhị phân / Chia 2 nhánh | $O(2^N \cdot N)$ | $N \le 20$ | Chọn/không chọn phần tử, nhánh cận có cắt tỉa |
| Bitmask tập con $2^N$ | $O(2^N \cdot N)$ | $N \le 20$ | Tập hợp có $\le 20$ phần tử, cần code phẳng gọn không đệ quy |
| Tổ hợp chập $K$ của $N$ | $O(\binom{N}{K} \cdot K)$ | Tùy $(N, K)$ | Chọn đúng $K$ phần tử từ $N$ phần tử |
| Sinh hoán vị $N!$ | $O(N! \cdot N)$ | $N \le 10$ | Thử mọi thứ tự sắp xếp của $N$ đối tượng |
| Quay lui + Nhánh cận ($N$-Queens, lưới) | Thấp hơn nhiều $N^N$ | Phụ thuộc độ chặt của cận | Lưới nhỏ hoặc bài tối ưu có cận cắt nhánh tốt |

### Danh Sách Bẫy Kinh Điển Cần Tránh
1. **Quên trả lại trạng thái khi quay lui (`used[v] = false` hoặc `cur.pop_back()`):** Làm biến mất giá trị ở các nhánh sau hoặc đẩy thừa phần tử sai kích thước.
2. **Quên dấu `&` khi truyền `vector` / `string` vào hàm đệ quy:** Tạo bản sao $O(N)$ ở mỗi lời gọi đệ quy, vừa tốn RAM vừa dễ TLE.
3. **Dùng `abs(r - c)` thay cho `r - c + n` trong $N$-Queens:** Gộp nhầm 2 đường chéo đối xứng nhau, làm mất nghiệm hợp lệ (hoặc dùng trực tiếp `r - c` gây truy cập chỉ số âm!).
4. **Dùng tham số cố định hoặc bỏ `start` khi sinh tổ hợp:** Sinh trùng hoán vị `{1, 2}` và `{2, 1}` thay vì chỉ sinh đúng tập tăng ngặt `{1, 2}`.
5. **Viết `mask & (1 << i) == 0` hoặc `(mask & (1 << i)) == 1`:** Cả hai đều sai do ưu tiên toán tử và giá trị trả về $2^i$. Hãy luôn dùng **`(mask >> i) & 1`**.
6. **Dùng `1 << k` khi $k \ge 31$:** Tràn số `int` 32-bit! Luôn dùng **`1LL << k`** (và `__builtin_popcountll` cho `long long`).
