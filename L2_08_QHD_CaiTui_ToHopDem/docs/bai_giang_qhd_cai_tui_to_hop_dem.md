# Bài Giảng `L2-08` — Tổ Hợp Đếm Sơ Cấp & DP Cái Túi (Knapsack)

- **Mã chuyên đề:** `L2-08` (Tầng 2 — Pha 2 STL Lớp 9, Core DP)
- **Kiến thức tiền đề đã có (`L1-05`, `L1-07`, `L2-04`, `L2-05`, `L2-06`, `L2-07`):**
  - Đã thành thạo **Chuẩn CP C++14**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`, `std::vector`, `pair`, và `reverse()`.
  - Đã biết **Phép chia dư modulo `MOD = 1000000007LL` (`L1-07`)** và cách dùng `1LL * a * b % MOD` để tránh tràn số `int`.
  - Đã chứng kiến **Điểm gãy Tham lam trên Balo 0-1 (`L2-05`)**: với túi $W = 10$ kg và 3 thỏi vàng `{(6, 60), (5, 45), (5, 45)}`, Tham lam theo tỉ giá $v_i / w_i$ chọn nhầm thỏi `(6, 60)` rồi kẹt 4 kg trống (chỉ đạt `60`), trong khi chọn 2 thỏi `(5, 45) + (5, 45)` đạt **`90`**!
  - Đã nắm **Khung 4 Bước DP (`L2-06`)** và **Bảng 2D / Cuộn mảng 1D (`L2-07`)**.
- **Kiến thức mới mở khóa ở `L2-08`:**
  - **Tổ hợp đếm sơ cấp:** Quy tắc Cộng, Quy tắc Nhân (tránh tràn `int` & giữ đơn vị khởi tạo đúng `0` vs `1`) và dựng **Tam giác Pascal $C(n, k)$** trong $O(N^2)$ mà không cần phép chia modulo.
  - **DP Cái Túi 0/1 (`0/1 Knapsack`):** Bảng 2D `dp[i][w]`, **Truy vết món đã chọn** bằng so sánh `dp[i][w] != dp[i - 1][w]`, và **nén 1D duyệt NGƯỢC trọng lượng `w = W -> w_i`** để cấm chọn lại 1 món nhiều lần.
  - **Kỹ thuật Đổi chiều trạng thái (`Knapsack 2`):** Khi sức chứa $W$ vọt lên $10^9$ (gây **MLE/TLE** nếu mở mảng theo trọng lượng) nhưng tổng giá trị $\sum v_i \le 10^5$, đảo sang `dp[val] = trọng lượng nhỏ nhất để đạt giá trị val`.
  - **Cái Túi Vô Hạn (`Unbounded Knapsack`) & Bẫy Thứ Tự 2 Vòng Lặp:** Biến đổi vòng lặp sang **duyệt XUÔI `w = w_i -> W`** khi mỗi món có vô số bản, và phân biệt rạch ròi **Đếm Hoán Vị (`CSES-1635`)** vs **Đếm Tổ Hợp (`CSES-1636`)** chỉ bằng việc tráo đổi 2 vòng lặp!

---

## 1. Bức Tranh Toàn Cảnh: Từ Đếm Cấu Hình Đến Bốn Biến Thể Của Chiếc Ba Lô

Trong các kỳ thi HSG Tin học Lớp 9 và hệ thống OJ lớn, rất nhiều bài toán Quy hoạch động đều quay về câu hỏi: *"Từ $N$ lựa chọn có sẵn, có bao nhiêu cách chọn hoặc tổng giá trị tối ưu là bao nhiêu khi bị ràng buộc bởi một ngưỡng $W$?"*

Để làm chủ trọn vẹn chủ đề này mà không bị loạn công thức, ta tách bài toán lớn thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)**:
- $V_1$: **Tổ Hợp Đếm Sơ Cấp** — Quy tắc Cộng, Quy tắc Nhân & Tam giác Pascal $C(n, k)$ trong $O(N^2)$.
- $V_2$: **DP Cái Túi 0/1 (`0/1 Knapsack`)** — Bảng 2D + Truy vết, Nén 1D Duyệt Ngược & Đổi Chiều Giá Trị (`Knapsack 2` khi $W \le 10^9$).
- $V_3$: **Cái Túi Vô Hạn (`Unbounded Knapsack`)** — Vòng Lặp Duyệt Xuôi & Bẫy Thứ Tự Hai Vòng Lặp (Hoán Vị vs Tổ Hợp).

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Quy Tắc Cộng, Quy Tắc Nhân & Tam Giác Pascal $C(n, k)$

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
1. **Khi nào CỘNG, khi nào NHÂN?**
   - **Quy tắc Cộng (Chia trường hợp loại trừ nhau — chữ "HOẶC"):** Để đi từ nhà đến trường, bạn có $3$ tuyến xe buýt **HOẶC** $2$ con đường đi xe đạp. Vì chỉ chọn **1 trong 2 phương án**, tổng số cách đi là $3 + 2 = 5$ (khởi tạo biến cộng dồn `ans = 0`).
   - **Quy tắc Nhân (Ghép các công đoạn nối tiếp — chữ "VÀ"):** Để mặc một bộ đồ hoàn chỉnh, bạn cần chọn $1$ cái áo (có $A$ mẫu) **VÀ** $1$ cái quần (có $B$ mẫu) **VÀ** $1$ đôi giày (có $C$ mẫu). Vì mỗi lựa chọn ghép được với mọi lựa chọn khác, tổng số bộ là $A \times B \times C$ (khởi tạo biến tích `ans = 1`, tuyệt đối không khởi tạo bằng `0`!).
   - **Bẫy tràn số `int` trước khi `% MOD`:** Nếu `a = 100000`, `b = 100000` đều là kiểu `int`, biểu thức `(a * b) % MOD` tính tích `a * b = 10^10` bằng kiểu `int` trước nên bị **tràn số (Undefined Behavior)** trước khi kịp chia dư! Phải viết **`1LL * a * b % MOD`** (hoặc dùng kiểu `long long`).
2. **Tại sao cần Tam giác Pascal $C(n, k)$ thay vì công thức giai thừa?**
   - Trong toán học: $C(n, k) = \frac{n!}{k!(n - k)!}$.
   - Nhưng ở lập trình thi đấu khi đáp án chia dư cho `MOD = 10^9 + 7`, **$21!$ đã tràn `long long`** ($9.22 \times 10^{18}$)! Nếu ta lấy `% MOD` cho `fact[n]`, `fact[k]` rồi đem chia bình thường `fact[n] / (fact[k] * fact[n-k])`, kết quả sẽ **SAI HOÀN TOÀN** vì phép chia nguyên không bảo toàn số dư (ví dụ $(6 / 2) \bmod 5 = 3$, nhưng $(6 \bmod 5) / (2 \bmod 5) = 1 / 2 = 0$!).
   - **Lối thoát bằng Tam giác Pascal (DP 2D thuần phép cộng!):** Muốn chọn một đội $k$ bạn từ $n$ học sinh, hãy nhìn vào bạn đứng cuối tên **An**:
     - *Trường hợp 1 (KHÔNG chọn An):* Phải chọn đủ $k$ bạn từ $n - 1$ bạn còn lại $\rightarrow$ có $C(n - 1, k)$ cách.
     - *Trường hợp 2 (CHỌN An vào đội):* Chỉ cần chọn thêm $k - 1$ bạn từ $n - 1$ bạn còn lại $\rightarrow$ có $C(n - 1, k - 1)$ cách.
   - Theo Quy tắc Cộng:
     $$C[n][k] = \big(C[n - 1][k - 1] + C[n - 1][k]\big) \bmod \text{MOD}$$
   - **Hai mốc cơ sở bắt buộc:** `C[i][0] = 1` (chọn 0 người luôn có 1 cách: không chọn ai!) và `C[i][i] = 1` (chọn tất cả $i$ người chỉ có 1 cách). Với $N \le 2000 \dots 5000$, bảng $O(N^2)$ chỉ dùng toàn phép cộng và chia dư từng bước, chạy cực nhanh và không cần tới phép chia modulo!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int maxN = 100;
    vector<vector<long long>> C(maxN + 1, vector<long long>(maxN + 1, 0));
    for (int i = 0; i <= maxN; i++) {
        C[i][0] = 1; // Bắt buộc có: chọn 0 phần tử luôn có 1 cách
        C[i][i] = 1; // Chọn tất cả i phần tử có 1 cách
        for (int j = 1; j < i; j++) {
            C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
        }
    }

    // Minh họa Quy tắc Nhân + Cộng: chọn 2 nam từ 5 nam VÀ 1 nữ từ 4 nữ
    // HOẶC chọn 3 nữ từ 4 nữ
    long long cach1 = (C[5][2] * C[4][1]) % MOD; // 10 * 4 = 40
    long long cach2 = C[4][3];                   // 4
    long long tong = (cach1 + cach2) % MOD;      // 44
    cout << "C(10, 3) = " << C[10][3] << ", Tong cach = " << tong << '\n';
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Quy tắc Cộng (`Addition Rule`) & Quy tắc Nhân (`Multiplication Rule`):** Hai nguyên lý đếm nền tảng tương ứng với phép cộng (`ans = 0`) cho các trường hợp rời nhau và phép nhân (`ans = 1`) cho các bước chọn độc lập nối tiếp.
- **Hệ số nhị thức / Tổ hợp (`Binomial Coefficient` $C(n, k)$) & Tam giác Pascal (`Pascal's Triangle`):** Bảng DP 2 chiều tính số tập con cỡ $k$ lấy từ $n$ phần tử bằng công thức truy hồi thuần phép cộng trong $O(N^2)$.

---

### 2.2. Vấn Đề Nhỏ 2: DP Cái Túi 0/1 (`0/1 Knapsack`) & Đổi Chiều Giá Trị (`Knapsack 2`)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Quay lại phản ví dụ làm gãy Tham lam ở `L2-05`: ba lô chịu tải tối đa $W = 10$ kg; có 3 thỏi vàng nguyên chiếc `{(6 kg, giá 60), (5 kg, giá 45), (5 kg, giá 45)}`. Mỗi thỏi chỉ có **đúng 1 chiếc** (hoặc lấy `1`, hoặc bỏ `0` — gọi là **0/1 Knapsack**). Với $N \le 100$ và $W \le 10^5$, thuật toán Quay lui $2^N$ (`L2-04`) chắc chắn **TLE**.

1. **Cách 1 — Bảng DP 2D `dp[i][w]` & Truy vết món đã chọn:**
   - Gọi `dp[i][w]` là *tổng giá trị lớn nhất có thể đạt được khi chỉ xét $i$ món đầu tiên với tổng trọng lượng không vượt quá $w$*.
   - Khi đứng trước món thứ $i$ (nặng `wt`, giá `val`), ta chỉ có đúng 2 lựa chọn:
     - **Không lấy món $i$:** giữ nguyên kết quả từ $i - 1$ món trước $\rightarrow$ `dp[i - 1][w]`.
     - **Lấy món $i$** (nếu `w >= wt`): dành ra `wt` kg cho món $i$, phần `w - wt` kg còn lại lấy tối đa từ $i - 1$ món trước $\rightarrow$ `dp[i - 1][w - wt] + val`.
   - Công thức: `dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - wt] + val)`.
   - **Truy vết món đã chọn:** Lần ngược từ `i = N` về `1` với sức chứa hiện tại `curW = W`: nếu `dp[i][curW] != dp[i - 1][curW]` thì chứng tỏ tổng giá trị tăng lên là nhờ có món `i` — ghi nhận `i` và giảm `curW -= wt[i]`; ngược lại bỏ qua món `i`. Cuối cùng `reverse()` danh sách!

2. **Cách 2 — Cuộn xuống 1D: BẮT BUỘC duyệt NGƯỢC `w` từ `W` về `wt`!**
   - Áp dụng Cuộn mảng (`L2-07`): hàng `i` chỉ đọc từ hàng `i - 1`, nên ta nén về 1 mảng `dp[0..W]`.
   - **Bẫy chết người nếu duyệt XUÔI (`for (int w = wt; w <= W; w++)`):**
     - Giả sử món 1 nặng `3` kg, giá `40`. Khi `w = 3`, ta cập nhật `dp[3] = 40`.
     - Nếu chạy xuôi lên `w = 6`, công thức đọc `dp[6 - 3] = dp[3]` — nhưng `dp[3]` lúc này vừa bị ghi đè thành `40` ở ngay lượt hiện tại chứ không còn là `0` của hàng `i - 1` nữa! Thế là máy tính bốc tiếp món 1 lần thứ hai thành `dp[6] = 80`, rồi `dp[9] = 120`!
   - **Giải pháp — Duyệt NGƯỢC (`for (int w = W; w >= wt; w--)`):**
     - Khi tính từ `W` lùi xuống `wt`, mọi ô `dp[w - wt]` nằm bên trái đều **CHƯA bị chạm tới** ở lượt món `i`, nên chắc chắn đang giữ nguyên giá trị cũ của hàng `i - 1`! Nhờ vậy mỗi món được bảo đảm chọn tối đa **1 lần**!

3. **Cách 3 — Đổi chiều trạng thái (`Knapsack 2`) khi $W \le 10^9$ nhưng $\sum v_i \le 10^5$:**
   - Nếu đề cho sức chứa túi $W = 10^9$ (`AtCoder DP-E`), mảng `dp[W + 1]` cần tới **8 GB RAM (MLE)** và vòng lặp $N \cdot W = 10^{11}$ chạy mất vài phút (**TLE**)!
   - Nhưng hãy nhìn sang ràng buộc giá trị: $N \le 100$, mỗi món có $v_i \le 10^3 \implies \sum v_i \le 10^5$!
   - **Chiêu lật ngược chiều trạng thái:** Thay vì *"với trọng lượng $w$, kiếm được tối đa bao nhiêu tiền?"*, ta hỏi ngược lại:
     > **`dp[val]` = tổng trọng lượng ÍT NHẤT cần thiết để kiếm được ĐÚNG tổng giá trị `val`!**
   - Khởi tạo `dp[0] = 0`, mọi `dp[val > 0] = INF = 1e18`.
   - Với mỗi món `(wt, v)` (chọn tối đa 1 lần nên vẫn **duyệt ngược `val = sumV -> v`**):
     $$\text{dp}[val] = \min\big(\text{dp}[val],\ \text{dp}[val - v] + wt\big)$$
   - Đáp án cuối cùng là giá trị `val` **lớn nhất** thỏa mãn **`dp[val] <= W`**!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. 0/1 Knapsack 1D duyệt ngược trên phản ví dụ L2-05
    int W = 10;
    vector<pair<int, long long>> items = {{6, 60}, {5, 45}, {5, 45}};
    vector<long long> dp(W + 1, 0);
    for (const auto& it : items) {
        for (int w = W; w >= it.first; w--) {
            dp[w] = max(dp[w], dp[w - it.first] + it.second);
        }
    }
    cout << "0/1 Knapsack (W=10) = " << dp[W] << '\n'; // 90

    // 2. Knapsack 2 (Đổi chiều giá trị khi W = 10^9)
    long long bigW = 1000000000LL;
    vector<pair<long long, int>> bigItems = {{600000000LL, 30}, {500000000LL, 25}, {500000000LL, 25}};
    int sumV = 80;
    vector<long long> minW(sumV + 1, INF);
    minW[0] = 0;
    for (const auto& it : bigItems) {
        for (int val = sumV; val >= it.second; val--) {
            if (minW[val - it.second] < INF) {
                minW[val] = min(minW[val], minW[val - it.second] + it.first);
            }
        }
    }
    int ans = 0;
    for (int val = sumV; val >= 0; val--) {
        if (minW[val] <= bigW) { ans = val; break; }
    }
    cout << "Knapsack 2 (W=10^9) = " << ans << '\n'; // 50
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Cái túi 0/1 (`0/1 Knapsack`) & Duyệt ngược trọng lượng (`Backward Weight Sweep`):** Bài toán chọn tập con tối ưu với mỗi phần tử chỉ dùng $0$ hoặc $1$ lần; khi nén về 1D bắt buộc quét `w` từ `W` lùi về `wt` để đọc trạng thái cũ của hàng trước.
- **Đổi chiều trạng thái (`State-Value Inversion` / `Knapsack 2`):** Đổi trục trọng lượng khổng lồ $W$ ra làm giá trị trả về của hàm `dp[val]`, đưa bài toán từ $O(N \cdot W)$ TLE/MLE về $O(N \cdot \sum v_i)$ gọn nhẹ.

---

### 2.3. Vấn Đề Nhỏ 3: Cái Túi Vô Hạn & Bẫy Thứ Tự Hai Vòng Lặp (Hoán Vị vs Tổ Hợp)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Bây giờ hãy giả sử cửa hàng không chỉ có 1 thỏi mỗi loại, mà mỗi loại hàng / mệnh giá đồng xu đều có **vô hạn bản sao**!

1. **Cái túi vô hạn (`Unbounded Knapsack`) — Đảo bug thành tính năng!**
   - Hồi nãy ở 0/1 Knapsack, nếu lỡ duyệt XUÔI `for (int w = wt; w <= W; w++)`, máy tính sẽ cho phép chọn lại chính món `i` nhiều lần.
   - Bây giờ khi mỗi món có **vô hạn chiếc**, việc duyệt XUÔI lại trở thành **đúng chuẩn mong muốn**! Với `W = 9` và `{(3, 40), (5, 60)}`: duyệt ngược (0/1) chỉ chọn `{3, 40} + {5, 60} = 100`, còn duyệt xuôi (vô hạn) nhặt 3 lần món `{3, 40}` đạt **`120`**!

2. **Bẫy kinh điển hai vòng lặp: Đếm HOÁN VỊ (`CSES-1635`) vs Đếm TỔ HỢP (`CSES-1636`):**
   - Với bộ xu vô hạn `{1, 2}` và mục tiêu $S = 4$, hãy xem 2 cách đặt vòng lặp cho ra **hai con số hoàn toàn khác nhau**:
   - **Cách A — Đếm HOÁN VỊ có phân biệt thứ tự (`1 + 2` $\neq$ `2 + 1`, bài `Coin Combinations I`):**
     - Hình dung bạn xếp hàng bỏ **từng đồng xu theo thứ tự thời gian** vào khe máy bán nước: đồng 1 rồi mới tới đồng 2.
     - Tại mỗi tổng `s = 1..S` (vòng lặp **NGOÀI**), ta thử mọi đồng xu `c` làm **đồng xu đút vào cuối cùng** (vòng lặp **TRONG**): `dp[s] = (dp[s] + dp[s - c]) % MOD`.
     - Với `S = 4, {1, 2}`: `dp = [1, 1, 2, 3, 5]` (gồm `1+1+1+1`, `1+1+2`, `1+2+1`, `2+1+1`, `2+2` $\rightarrow$ **`5` cách**!). Vì tại `s = 3` ta đã gom cả `1+2` lẫn `2+1`, nên mọi hoán vị nối tiếp lên `s = 4` đều được đếm riêng biệt!
   - **Cách B — Đếm TỔ HỢP không phân biệt thứ tự (`{1, 2}` $=$ `{2, 1}`, bài `Coin Combinations II`):**
     - Hình dung bạn chỉ bốc **một nắm xu** bỏ vào túi — không quan tâm đồng nào bốc trước, đồng nào bốc sau!
     - Mẹo để không bao giờ sinh trùng hoán vị là **ép cố định thứ tự các loại xu được xét**: đặt vòng lặp **NGOÀI** duyệt từng đồng xu `c`, vòng lặp **TRONG** duyệt xuôi `s = c..S`!
     - Tại sao hết trùng? Khi ở lượt của xu `1`, máy chỉ tạo được các dãy toàn số `1`. Sau khi chốt sổ hoàn toàn xu `1` mới sang lượt của xu `2`, mọi đồng `2` được thêm vào luôn đứng sau các đồng `1` (chỉ sinh ra `1 + 1 + 2`, không bao giờ quay lại sinh `2 + 1 + 1` hay `1 + 2 + 1` nữa!).
     - Với `S = 4, {1, 2}`: chỉ còn đúng **`3` cách** (`{1,1,1,1}`, `{1,1,2}`, `{2,2}`)!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int S = 4;
    vector<int> coins = {1, 2};

    // 1. Đếm HOÁN VỊ (CSES-1635): Ngoài là tổng s, Trong là đồng xu c
    vector<long long> dpPerm(S + 1, 0);
    dpPerm[0] = 1;
    for (int s = 1; s <= S; s++) {
        for (int c : coins) {
            if (s >= c) dpPerm[s] = (dpPerm[s] + dpPerm[s - c]) % MOD;
        }
    }

    // 2. Đếm TỔ HỢP (CSES-1636): Ngoài là đồng xu c, Trong là tổng s (duyệt XUÔI)
    vector<long long> dpComb(S + 1, 0);
    dpComb[0] = 1;
    for (int c : coins) {
        for (int s = c; s <= S; s++) {
            dpComb[s] = (dpComb[s] + dpComb[s - c]) % MOD;
        }
    }

    cout << "Hoan vi (1+2 != 2+1) = " << dpPerm[S] << '\n'; // 5
    cout << "To hop  ({1,2} == {2,1}) = " << dpComb[S] << '\n'; // 3
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Cái túi vô hạn (`Unbounded Knapsack`):** Biến thể mà mỗi món đồ / mệnh giá xu có thể dùng không giới hạn số lần, sử dụng vòng lặp trọng lượng **duyệt xuôi (`w = w_i -> W`)**.
- **Hoán vị có thứ tự (`Ordered Sequences / Permutations`) vs Tổ hợp không thứ tự (`Unordered Combinations`):** Phân biệt hoàn toàn bởi **thứ tự hai vòng lặp lồng nhau** (ngoài `sum` đếm hoán vị; ngoài `coin` ép thứ tự xét từng loại xu nên chỉ đếm tổ hợp).

---

## 3. Tổng Kết Độ Phức Tạp & 5 Bẫy Kinh Điển

| Kỹ thuật / Biến thể | Thời gian | Bộ nhớ RAM | Hướng duyệt trọng lượng / tổng | Ghi chú áp dụng |
| :--- | :--- | :--- | :--- | :--- |
| Tam giác Pascal $C(n, k)$ | $O(N^2)$ | $O(N^2)$ | `i = 0..N, j = 1..i-1` | Tránh phép chia `% MOD`, $N \le 5000$ |
| 0/1 Knapsack 2D + Truy vết | $O(N \cdot W)$ | $O(N \cdot W)$ | Không phụ thuộc hướng trên 2D | Dùng khi cần truy vết món đã chọn |
| 0/1 Knapsack 1D | $O(N \cdot W)$ | $O(W)$ | **Ngược** (`w = W -> w_i`) | Cấm dùng 1 món quá 1 lần |
| Đổi chiều giá trị (`Knapsack 2`) | $O(N \cdot \sum v_i)$ | $O(\sum v_i)$ | **Ngược** (`val = sumV -> v_i`) | Khi $W \le 10^9$ nhưng $\sum v_i \le 10^5$ |
| Unbounded Knapsack / Coin Comb II | $O(N \cdot S)$ | $O(S)$ | **Xuôi** (`w = w_i -> W`), ngoài `item/coin` | Dùng nhiều lần, không phân biệt thứ tự |
| Đếm Hoán Vị (`Coin Comb I`) | $O(N \cdot S)$ | $O(S)$ | Ngoài `s = 1..S`, trong `coin` | Dùng nhiều lần, **có** phân biệt thứ tự |

**5 bẫy cần kiểm tra trước khi Submit:**
1. Nhân 2 số `int` trước khi `% MOD` (`(a * b) % MOD` bị tràn `int` $\rightarrow$ phải viết `1LL * a * b % MOD`), hoặc quên khởi tạo `ans = 1` trong Quy tắc Nhân, hoặc quên `C[i][0] = 1` trong Tam giác Pascal.
2. Cài đặt 0/1 Knapsack 1D nhưng lại **duyệt xuôi** `w = w_i .. W`, biến nhầm thành Cái túi vô hạn (lấy trùng 1 món nhiều lần).
3. Dùng `dp[W]` của Knapsack 1 khi $W \le 10^9$ gây **MLE/TLE** (phải đổi sang `Knapsack 2`), hoặc trong `Knapsack 2` lại quên kiểm tra điều kiện `dp[val] <= W` khi chọn `val` lớn nhất!
4. Đảo nhầm thứ tự 2 vòng lặp trong bài Đếm xu: đề hỏi Tổ hợp (`CSES-1636`) lại viết vòng ngoài là `sum`, hoặc đề hỏi Hoán vị (`CSES-1635`) lại viết vòng ngoài là `coin`.
5. Quên dùng kiểu `long long` cho bảng `dp` khi $\sum v_i$ vượt $2 \cdot 10^9$ (như `AtCoder DP-D` với $v_i \le 10^9$), hoặc quên `% MOD` ở từng bước cộng.

---

## 4. Bộ Bài Tập Thực Chiến Đã Xác Thực (8 Bài — 3 Cấp Độ)

1. **[Mức 1] Codeforces 131C — The World is a Theatre** (`https://codeforces.com/problemset/problem/131/C`) — $4 \le n \le 30, 1 \le m \le 30, 5 \le t \le n+m$, TL 2.0s, ML 256 MB. Tam giác Pascal $C(n, k)$ bằng `long long` + Quy tắc Cộng/Nhân.
2. **[Mức 1] AtCoder DP-D — Knapsack 1** (`https://atcoder.jp/contests/dp/tasks/dp_d`) — $1 \le N \le 100, 1 \le W \le 10^5, 1 \le v_i \le 10^9$, TL 2.0s, ML 1024 MB. Khuôn mẫu 0/1 Knapsack 1D chuẩn với `long long`.
3. **[Mức 1] CSES 1635 — Coin Combinations I** (`https://cses.fi/problemset/task/1635`) — $1 \le n \le 100, 1 \le x \le 10^6$, TL 1.00s, ML 512 MB. Đếm Hoán vị xu (`for s` ngoài, `for c` trong, `% 10^9+7`).
4. **[Mức 2] CSES 1636 — Coin Combinations II** (`https://cses.fi/problemset/task/1636`) — $1 \le n \le 100, 1 \le x \le 10^6$, TL 1.00s, ML 512 MB. Đếm Tổ hợp xu (`for c` ngoài, `for s` xuôi trong, `% 10^9+7`).
5. **[Mức 2] CSES 1158 — Book Shop** (`https://cses.fi/problemset/task/1158`) — $1 \le n \le 1000, 1 \le x \le 10^5, 1 \le h_i, s_i \le 1000$, TL 1.00s, ML 512 MB. 0/1 Knapsack nén 1D gọn nhẹ (`vector<int>`) để chạy nhanh dưới 1s.
6. **[Mức 2] CSES 1745 — Money Sums** (`https://cses.fi/problemset/task/1745`) — $1 \le n \le 100, 1 \le x_i \le 1000$, TL 1.00s, ML 512 MB. 0/1 Knapsack kiểm tra tổng khả thi (`dp[s] = true/false`, duyệt ngược).
7. **[Mức 3] AtCoder DP-E — Knapsack 2** (`https://atcoder.jp/contests/dp/tasks/dp_e`) — $1 \le N \le 100, 1 \le W \le 10^9, 1 \le v_i \le 10^3$, TL 2.0s, ML 1024 MB. Đổi chiều trạng thái `dp[val]` khi $W$ quá lớn.
8. **[Mức 3] Codeforces 1633D — Make Them Equal** (`https://codeforces.com/problemset/problem/1633/D`) — $1 \le n \le 10^3, 0 \le k \le 10^6, 1 \le b_i \le 1000$, TL 2.0s, ML 256 MB. Tiền xử lý chi phí bước tối thiểu ($\le 12$) + nén giới hạn túi $\min(k, 12n)$ rồi chạy 0/1 Knapsack.
