# Bài Giảng `L2-06` — Nhập Môn Quy Hoạch Động (DP 1D & Truy Vết)

- **Mã chuyên đề:** `L2-06` (Tầng 2 — Pha 2 STL Lớp 9, Core DP)
- **Kiến thức tiền đề đã có (`MOD-Pre`, `MOD-CP0`, `MOD-00`, `MOD-01`, `L1-01`..`L1-07`, `L2-04`, `L2-05`):**
  - Đã thành thạo **Chuẩn CP C++14**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`, và dùng `long long` chống tràn số.
  - Đã thành thạo `std::vector`, truyền tham chiếu `&` để tránh sao chép mảng lớn (`L1-05`).
  - Đã nắm **Đệ quy & Ngăn xếp lời gọi hàm (Call Stack ~8 MB)** (`MOD-01`) cùng cách vẽ **Cây đệ quy** $O(2^N)$ (`L2-04`).
  - Đã chứng kiến **Điểm gãy của Tham lam (`L2-05`)**: ví dụ bài toán Đổi tiền `{1, 3, 4}` với $S = 6$ làm Tham lam chọn `4 + 1 + 1` (3 tờ) bị sai so với tối ưu `3 + 3` (2 tờ), nhưng Quay lui $O(2^N)$ lại bị **TLE** ngay khi $S$ hoặc $N$ lớn!
- **Kiến thức mới mở khóa ở `L2-06`:**
  - Phát hiện **Bài toán con gối nhau (`Overlapping Subproblems`)** trên cây đệ quy $O(2^N)$.
  - **Đệ quy có nhớ (`Top-Down Memoization`)**: thêm bảng nháp `memo[]` để biến độ phức tạp lũy thừa $O(2^N)$ thành tuyến tính $O(N)$ (hoặc $O(N \cdot K)$), đồng thời nhận diện 2 bẫy lớn: quên truyền `&` và tràn bộ nhớ Stack (~8 MB) khi độ sâu $N \approx 10^5$.
  - **Khung 4 Bước Quy Hoạch Động & Lập bảng 1D (`Bottom-Up Tabulation`)**: định nghĩa trạng thái `dp[i]`, khởi tạo cơ sở và vô cực an toàn `INF = 1000000000000000000LL` (`1e18`, tuyệt đối tránh `LLONG_MAX`), công thức chuyển **Pull DP** vs **Push DP** trên Frog 1/2, Đổi tiền Min, và Chọn không kề nhau (House Robber).
  - **Truy vết nghiệm (`trace[]`)**: ghi lại dấu vết chuyển trạng thái để lần ngược từ đích và đảo ngược bằng `reverse()` nhằm in ra chính xác dãy hòn đá hoặc các đồng xu đã chọn.

---

## 1. Bức Tranh Toàn Cảnh: Cây Đệ Quy Bị TLE, Tham Lam Bị WA — Quy Hoạch Động Lên Ngôi

Ở cuối bài `L2-05`, bạn đã gặp một bài toán tưởng chừng đơn giản: cho bộ mệnh giá xu `{1, 3, 4}` và số tiền $S = 6$, tìm số đồng xu ít nhất để đổi đúng $S$.
- **Tham lam (`L2-05`)** bốc đồng to nhất `4`, rồi hai đồng `1` $\rightarrow$ tốn **3 đồng (WA)**, trong khi đáp án đúng là `3 + 3` (chỉ **2 đồng**)!
- **Quay lui (`L2-04`)** thử mọi nhánh nên chắc chắn đúng, nhưng nếu $S = 100$ hoặc leo cầu thang $N = 50$ bậc thì cây đệ quy phình ra thành hàng tỷ lời gọi trùng lặp (**TLE**)!

**Làm sao vừa đúng tuyệt đối như Quay lui, vừa nhanh như vòng lặp $O(N)$?**
Bí mật nằm ở một câu hỏi duy nhất: **Tại sao phải tính đi tính lại những câu hỏi giống hệt nhau?**

> **Chiến lược giải quyết (`Problem Decomposition`):** Tách bài toán lớn thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)**:
> - $V_1$: Từ Cây Đệ Quy $O(2^N)$ Đến Đệ Quy Có Nhớ (`Top-Down Memoization`) & Bẫy Call Stack.
> - $V_2$: Khung 4 Bước Quy Hoạch Động & Lập Bảng 1D (`Bottom-Up`: Pull DP vs Push DP).
> - $V_3$: Truy Vết Nghiệm (`trace[]` / Lần Ngược Từ Đích) Để In Đường Đi Hoặc Tập Chọn.

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Từ Cây Đệ Quy $O(2^N)$ Đến Đệ Quy Có Nhớ (`Top-Down Memoization`)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Bài toán đếm cách leo cầu thang:** Có một cầu thang $N$ bậc. Mỗi bước bạn có thể bước `1` bậc hoặc `2` bậc. Hỏi có bao nhiêu cách lên tới bậc $N$?
- Nếu dùng đệ quy thuần túy (`ways(n) = ways(n - 1) + ways(n - 2)`):
  - Để tính `ways(6)`, bạn phải gọi `ways(5)` và `ways(4)`.
  - Trong `ways(5)`, bạn lại gọi `ways(4)` và `ways(3)`.
  - Cả hai nhánh đều tính `ways(4)`, rồi `ways(3)` bị tính lặp 3 lần, `ways(2)` bị tính lặp 5 lần... Với $N = 45$, số lời gọi hàm vọt lên gần **$2{,}3 \times 10^9$ lần** — chạy mất nhiều giây và TLE ngay!
- **Cách giải quyết bằng sổ nháp:** Kẹp thêm một **tờ giấy nháp `memo`** gồm $N + 1$ ô trống (đánh dấu `-1` nghĩa là *"chưa từng tính"*).
  - Lần **đầu tiên** gặp `ways(k)`: ta chịu khó tính theo công thức đệ quy, rồi **viết ngay đáp án vào ô `memo[k]`**.
  - Mọi lần **sau đó** gặp lại `ways(k)`: thấy `memo[k] != -1`, ta **đọc thẳng đáp án trên sổ nháp** trong $O(1)$ mà không chui xuống cây đệ quy nữa!
  - Với $N = 25$: đệ quy ngây thơ tốn tới **`242,785` lời gọi**, còn có sổ nháp chỉ tốn đúng **`49` lời gọi** ($2N - 1$)!
- **Hai cái bẫy chết người của Đệ quy có nhớ:**
  1. **Quên dấu `&` khi truyền `memo` (`vector<long long> memo`):** Mỗi lần gọi hàm đệ quy, C++ lại **photocopy toàn bộ mảng `memo`**, làm mất sạch những gì vừa ghi và biến độ phức tạp về lại $O(2^N)$ (hoặc $O(N^2)$)! Phải luôn viết `vector<long long>& memo`.
  2. **Tràn bộ nhớ ngăn xếp (`Call Stack` ~8 MB — `MOD-01`):** Ngay cả khi có `&`, nếu $N = 10^5$ hoặc $10^6$, chuỗi gọi lồng nhau `ways(10^6) -> ways(999999) -> ...` tạo ra $10^6$ khung bộ nhớ xếp chồng lên nhau, dễ gây **Stack Overflow (Runtime Error)** trên máy chấm!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL; // 1e18

// Đệ quy có nhớ đổi tiền {1, 3, 4} lấy số đồng xu ít nhất cho tổng s
// Quy ước: memo[s] == -1 nghĩa là CHƯA TÍNH; memo[s] == INF nghĩa là ĐÃ TÍNH nhưng VÔ NGHIỆM
long long solveCoinMemo(int s, const vector<int>& coins, vector<long long>& memo) {
    if (s == 0) return 0;
    if (memo[s] != -1) return memo[s]; // Đọc ngay từ sổ nháp trong O(1)

    long long best = INF;
    for (int c : coins) {
        if (s >= c) {
            long long sub = solveCoinMemo(s - c, coins, memo);
            if (sub != INF) {
                best = min(best, sub + 1);
            }
        }
    }
    memo[s] = best; // Ghi vào sổ nháp trước khi trả về
    return memo[s];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int S = 6;
    vector<int> coins = {1, 3, 4};
    vector<long long> memo(S + 1, -1);

    long long ans = solveCoinMemo(S, coins, memo);
    cout << (ans == INF ? -1 : ans) << '\n'; // In ra 2 (thay vì 3 của Tham lam!)
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Bài toán con gối nhau (`Overlapping Subproblems`):** Hiện tượng các nhánh khác nhau trên cây đệ quy liên tục gọi lại đúng cùng một bài toán con (như `ways(3)` hoặc `solve(2)`). Đây là dấu hiệu nhận diện số 1 của Quy hoạch động!
- **Đệ quy có nhớ (`Top-Down Memoization`):** Đi từ bài toán gốc lớn ($N$ hoặc $S$) gọi đệ quy xuống các bài toán nhỏ hơn, nhưng lưu lại kết quả vào mảng `memo[]` để mỗi trạng thái chỉ phải tính **tối đa 1 lần**.
- **Giá trị đánh dấu chưa tính (`Unvisited Sentinel -1`):** Giá trị đặc biệt khác với mọi đáp án hợp lệ (và khác `INF`) để phân biệt ô nháp *chưa giải* với ô *đã giải ra vô nghiệm*.

---

### 2.2. Vấn Đề Nhỏ 2: Khung 4 Bước DP & Lập Bảng 1D (`Bottom-Up`: Pull DP vs Push DP)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Để loại bỏ hoàn toàn nguy cơ tràn Call Stack khi $N \le 10^6$ và giúp code chạy nhanh nhất có thể, ta chuyển sang **Lập bảng từ dưới lên (`Bottom-Up Tabulation`)**: xây từng ô từ `0, 1, 2, ...` đến `N` bằng vòng lặp `for` đơn giản!

Mọi bài Quy hoạch động 1D đều tuân theo **Khung 4 Bước Bất Biến**:
1. **Định nghĩa trạng thái `dp[i]`:** Phát biểu chính xác bằng tiếng Việt `dp[i]` đại diện cho đại lượng gì (ví dụ: *tổng chi phí nhỏ nhất để con ếch đứng ở hòn đá thứ `i`*, hoặc *số đồng xu ít nhất để đổi tổng `i`*).
2. **Khởi tạo cơ sở & Vô cực an toàn (`Base Cases & Safe INF`):**
   - Gán điểm xuất phát: `dp[1] = 0` (ếch đứng sẵn ở đá 1), hoặc `dp[0] = 0` (0 đồng xu cho tổng 0).
   - Các ô còn lại gán `INF = 1000000000000000000LL` (`1e18`) cho bài `min`, hoặc `-INF` cho bài `max` khi có trạng thái không đạt tới được.
   - **Cảnh báo:** Tuyệt đối **KHÔNG** dùng `LLONG_MAX` làm `INF`! Vì nếu một trạng thái vô nghiệm mang `LLONG_MAX` mà bạn lỡ cộng thêm chi phí (`LLONG_MAX + 1`), số sẽ tràn vòng về số âm `-9.22e18` và đánh bại mọi kết quả đúng trong hàm `min(...)`!
3. **Công thức truy hồi (`Transition`) — Hai hướng tư duy tương đương:**
   - **Pull DP (Kéo từ quá khứ về `i`):** Đứng tại `i`, hỏi *"từ đâu có thể nhảy tới `i`?"*
     - Ví dụ **Frog 1 (`AtCoder DP-A`):** `dp[i] = min(dp[i - 1] + |h[i] - h[i - 1]|, dp[i - 2] + |h[i] - h[i - 2]|)`.
     - Ví dụ **Đổi tiền `{1, 3, 4}` với $S = 6$:** `dp[0]=0, dp[1]=1, dp[2]=2, dp[3]=1, dp[4]=1, dp[5]=2, dp[6]=min(dp[5]+1, dp[3]+1, dp[2]+1) = 2`.
     - Ví dụ **Chọn không kề nhau (`House Robber` / `CF-455A`):** Tại phần tử `i`, chọn hoặc bỏ: `dp[i] = max(dp[i - 1], dp[i - 2] + a[i])`.
   - **Push DP (Đẩy từ `i` ra tương lai `i + step`):** Đứng tại `i` đã có kết quả tối ưu `dp[i]`, hỏi *"từ `i` có thể nhảy tới đâu?"*
     - Ví dụ **Frog 2 (`AtCoder DP-B`):** Với `step` từ `1` tới `K`, nếu `i + step <= n`, cập nhật `dp[i + step] = min(dp[i + step], dp[i] + |h[i + step] - h[i]|)`.
     - Nhớ kiểm tra `if (dp[i] == INF) continue;` trước khi đẩy, và `if (i + step <= n)` để không vọt ra ngoài mảng!
4. **Kết quả & Độ phức tạp:** Đọc đáp án tại `dp[N]` (hoặc `dp[S]`). Thời gian $O(N \cdot K)$, bộ nhớ $O(N)$, chạy mượt cho $N = 10^6$!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL; // 1e18: an toàn tuyệt đối khi cộng chi phí

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ Pull DP: Frog 1 trên dãy độ cao {10, 25, 45, 20} (1-based)
    int n = 4;
    vector<long long> h = {0, 10, 25, 45, 20};
    vector<long long> dp(n + 1, INF);

    dp[1] = 0; // Cơ sở: đang đứng sẵn ở đá 1
    for (int i = 2; i <= n; i++) {
        dp[i] = min(dp[i], dp[i - 1] + abs(h[i] - h[i - 1]));
        if (i >= 3) {
            dp[i] = min(dp[i], dp[i - 2] + abs(h[i] - h[i - 2]));
        }
    }
    cout << "Frog 1 Pull DP: " << dp[n] << '\n'; // 20 (1 -> 2 -> 4)

    // Ví dụ Push DP: Frog 2 với K = 2 trên cùng dãy đá
    int K = 2;
    vector<long long> dpPush(n + 1, INF);
    dpPush[1] = 0;
    for (int i = 1; i <= n; i++) {
        if (dpPush[i] == INF) continue; // Bảo vệ trạng thái chưa tới được
        for (int step = 1; step <= K; step++) {
            if (i + step <= n) {
                long long cost = dpPush[i] + abs(h[i + step] - h[i]);
                dpPush[i + step] = min(dpPush[i + step], cost);
            }
        }
    }
    cout << "Frog 2 Push DP: " << dpPush[n] << '\n'; // 20
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Lập bảng (`Bottom-Up Tabulation`):** Tính giá trị bảng `dp[]` theo thứ tự từ các bài toán nhỏ nhất đi lên bài toán lớn bằng vòng lặp `for`, không dùng đệ quy nên không bao giờ tràn Call Stack.
- **Pull DP vs Push DP:** Hai chiều viết công thức truy hồi trên cùng một bảng `dp[]`: *Pull* kéo từ `i - k` về `i`, còn *Push* đẩy từ `i` sang `i + k`.
- **Vô cực an toàn (`Safe INF`):** Đặt `1e18` (cho `long long`) hoặc `1e9` (cho `int`) để còn dư biên cộng thêm chi phí mà không tràn số.

---

### 2.3. Vấn Đề Nhỏ 3: Truy Vết Nghiệm (`trace[]` / Lần Ngược Từ Đích)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Biết con ếch tốn ít nhất `20` sức lực (hay đổi tiền hết `2` đồng xu) mới chỉ trả lời được *"tốn bao nhiêu"*. Nếu đề bài hỏi thêm: *"Con ếch đã dẫm qua những hòn đá nào?"* hoặc *"Đã chọn những đồng xu nào?"*, ta làm sao?

- **Ý tưởng cắm biển chỉ đường (`trace[]`):**
  - Tạo thêm một mảng song song `trace(n + 1, -1)` có giá trị dừng là `-1` (*không có ô nào đứng trước*).
  - Mỗi khi cập nhật được kỷ lục tốt hơn cho `dp[next]` từ `cur` (ví dụ `cand < dp[next]`), ta **ghi ngay biển chỉ đường**: `trace[next] = cur;` (hoặc với Đổi tiền: `choice[s] = c;`).
  - Sau khi chạy xong bảng DP, ta đứng ở đích `cur = n`, nhặt `cur` vào danh sách `path`, rồi nhảy lùi `cur = trace[cur]` cho tới khi `cur == -1`.
  - Vì ta đi giật lùi từ đích về đầu (`4 -> 2 -> 1`), ta phải dùng `reverse(path.begin(), path.end())` để lật lại thành lộ trình xuôi (`1 -> 2 -> 4`)!
- **3 bẫy thường gặp khi Truy vết:**
  1. **Ghi `trace[]` nằm ngoài `if (cand < dp[i])`:** Nếu viết `trace[i] = c` bừa bãi kể cả khi `cand` tệ hơn `dp[i]`, biển chỉ đường bị ghi đè sai khiến đường đi truy vết mâu thuẫn với `dp[i]`.
  2. **Quên chặn vòng lặp vô tận (`Sentinel Loop`):** Nếu dùng mảng `0`-based (như tổng `0` trong Đổi tiền) mà khởi tạo `trace` toàn `0` rồi viết `while (cur != -1)`, chương trình sẽ kẹt mãi ở `cur = 0` (`trace[0] = 0`)! Phải khởi tạo `trace` bằng `-1` (hoặc dùng điều kiện `while (cur > 0)` cho Đổi tiền).
  3. **Đẩy nhầm `trace[cur]` thay vì `cur` vào `path`:** Nếu viết `path.push_back(trace[cur])` sẽ làm thiếu đích `N` và lọt cả giá trị dừng `-1` vào kết quả!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Truy vết đường đi Frog 1 trên {10, 25, 45, 20}
    int n = 4;
    vector<long long> h = {0, 10, 25, 45, 20};
    vector<long long> dp(n + 1, INF);
    vector<int> trace(n + 1, -1); // Sentinel -1: điểm xuất phát chưa có cha

    dp[1] = 0;
    for (int i = 2; i <= n; i++) {
        if (dp[i - 1] + abs(h[i] - h[i - 1]) < dp[i]) {
            dp[i] = dp[i - 1] + abs(h[i] - h[i - 1]);
            trace[i] = i - 1;
        }
        if (i >= 3 && dp[i - 2] + abs(h[i] - h[i - 2]) < dp[i]) {
            dp[i] = dp[i - 2] + abs(h[i] - h[i - 2]);
            trace[i] = i - 2;
        }
    }

    vector<int> path;
    for (int cur = n; cur != -1; cur = trace[cur]) {
        path.push_back(cur);
    }
    reverse(path.begin(), path.end());

    cout << "Chi phi: " << dp[n] << "\nLo trinh: ";
    for (int stone : path) cout << stone << ' ';
    cout << '\n'; // 20 và 1 2 4
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Mảng truy vết (`Trace / Parent Array`):** Mảng 1 chiều song song với `dp[]`, lưu chỉ số trạng thái trước đó (hoặc quyết định đã chọn) tạo ra giá trị tối ưu tại `i`.
- **Truy vết ngược (`Backward Reconstruction`):** Đi giật lùi từ đích về điểm xuất phát qua `cur = trace[cur]` đến khi chạm sentinel `-1`, sau đó gọi `reverse()` để in theo thứ tự từ đầu đến cuối.

---

## 3. Tổng Kết Độ Phức Tạp & Các Bẫy Kinh Điển

| Phương pháp | Thời gian (Ví dụ $N$ trạng thái, $K$ bước) | Bộ nhớ RAM | Nguy cơ Stack Overflow? | Truy vết nghiệm? |
| :--- | :--- | :--- | :--- | :--- |
| Cây đệ quy ngây thơ (`L2-04`) | $O(K^N)$ (TLE ngay khi $N \ge 35$) | $O(N)$ Call Stack | Có | Khó lưu |
| Đệ quy có nhớ (`Top-Down Memo`) | $O(N \cdot K)$ | $O(N)$ mảng + $O(N)$ Stack | **Có** (nếu $N \ge 10^5$) | Lưu `trace[i]` |
| Lập bảng 1D (`Bottom-Up`) | $O(N \cdot K)$ | $O(N)$ mảng tĩnh/vector | **Không** (vòng `for`) | Lưu `trace[i]` hoặc lần ngược trực tiếp trên `dp[]` |

**5 bẫy cần kiểm tra trước khi Submit bài DP 1D:**
1. Quên `&` khi truyền `memo` vào hàm đệ quy có nhớ $\rightarrow$ TLE.
2. Dùng đệ quy có nhớ cho $N = 10^5 \dots 10^6$ $\rightarrow$ dễ tràn Call Stack (~8 MB), nên dùng Bottom-Up.
3. Dùng `LLONG_MAX` làm `INF` hoặc quên kiểm tra `dp[prev] != INF` trước khi cộng $\rightarrow$ tràn số hoặc sai điều kiện `dp[S] == INF`.
4. Quên lấy dư `% MOD` ở mỗi phép cộng trong bài đếm cách (`VSTEPS`, `Dice Combinations`).
5. Ghi đè `trace[i]` ngoài nhánh `if` hoặc quên `reverse()` / đẩy nhầm `trace[cur]` thay vì `cur`.
