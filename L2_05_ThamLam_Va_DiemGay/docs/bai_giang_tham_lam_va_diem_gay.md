# Bài Giảng `L2-05` — Thuật Toán Tham Lam & Điểm Gãy Của Tham Lam

- **Mã chuyên đề:** `L2-05` (Tầng 2 — Pha 2 STL Lớp 9)
- **Kiến thức tiền đề đã có (`MOD-Pre` + `MOD-CP0` + `MOD-00` + `MOD-01` + `L1-01` $\rightarrow$ `L1-07` + `L2-01`..`L2-04`):**
  - Đã thành thạo **Bộ Khung Chuẩn CP**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`, và dùng `long long` chống tràn số.
  - Đã làm chủ `std::vector`, `std::pair`, `std::sort` kèm Custom Comparator theo chuẩn Strict Weak Ordering (`<` hoặc `>`, không dùng `<=`) ở `L1-05`.
  - Đã thành thạo `std::priority_queue` (Max-Heap & Min-Heap `greater<long long>`) ở `L1-06`.
  - Đã biết cách viết hàm `solveTrau()` $O(2^N)$ bằng Quay lui / Bitmask (`L2-04`) và dùng **Máy chấm / Stress Testing** (`MOD-00`: `mt19937`) để đối chiếu code nhanh trên test nhỏ.
- **Kiến thức mới mở khóa ở `L2-05`:**
  - Tư duy **Tham lam (`Greedy`)**: đưa ra lựa chọn tối ưu cục bộ ở từng bước mà không quay lại sửa, chạy nhanh $O(N \log N)$ cho $N \le 2 \cdot 10^5$.
  - Các mẫu Tham lam chuẩn: **Lập lịch chọn đoạn** (ưu tiên kết thúc sớm `r` tăng dần), **Ghép cặp hai đầu**, và **Tham lam động bằng Min-Heap** (nối dây / *Stick Divisions*).
  - Phương pháp chứng minh tính đúng đắn bằng **Đối chứng hoán đổi (`Exchange Argument`)** — đổi chỗ 2 phần tử kề nhau bị ngược thứ tự để chứng minh thứ tự Tham lam luôn tối ưu.
  - **Điểm gãy của Tham lam (`Where Greedy Fails`)**: nhận diện các bài toán khiến Tham lam thất bại thảm hại như **Đổi tiền (`{1, 3, 4}`, $S = 6$)** và **Xếp balo 0-1 theo tỉ giá (`v / w`)**, dùng code duyệt toàn bộ $O(2^N)$ (`L2-04`) + Máy chấm (`MOD-00`) để phát hiện phản ví dụ — mở đường trực tiếp sang **Quy hoạch động (`L2-06`)**!
  *(Lưu ý ranh giới kiến thức: Học sinh chưa học Quy hoạch động `L2-06+` — bài giảng này không dùng kỹ thuật lập bảng/ghi nhớ của DP mà chỉ đối chiếu Tham lam với code duyệt toàn bộ `L2-04` để làm lộ rõ bản chất và động lực bước sang `L2-06`.)*

---

## 1. Bức Tranh Toàn Cảnh: Khi $N = 2 \cdot 10^5$ Khiến Quay Lui Bế Tắc & Câu Hỏi Sống Còn Của Tham Lam

Ở bài `L2-04`, bạn đã biết dùng Quay lui và Bitmask để thử hết $2^N$ lựa chọn khi $N \le 20$. Nhưng khi bước vào đề thi với **$N \le 2 \cdot 10^5$**, $2^{200\,000}$ lớn hơn số nguyên tử trong vũ trụ — máy tính sẽ đứng hình TLE ngay lập tức!

Ta cần một chiến lược **quyết định dứt khoát từng bước một** để hạ độ phức tạp từ $O(2^N)$ xuống còn $O(N \log N)$ ($\approx 3.5 \cdot 10^6$ phép tính, chạy trong $0.05$ giây). Chiến lược đó mang tên **Thuật toán Tham lam (`Greedy`)**: tại mỗi bước, chọn ngay phương án trông **có lợi nhất trước mắt** rồi đi tiếp luôn, không bao giờ quay đầu sửa lại!

Tuy nhiên, người lập trình thi đấu vướng phải **3 bế tắc lớn** khi dùng Tham lam:
1. **Bế tắc 1 — Chọn sai tiêu chí sắp xếp ngay từ bước đầu:** Có tới 3 cách sắp xếp nghe đều hợp lý (bắt đầu sớm, đoạn ngắn nhất, kết thúc sớm). Chọn nhầm 1 tiêu chí thôi là dính **WA** ngay trên test ẩn!
2. **Bế tắc 2 — Danh sách biến đổi sau mỗi bước & chứng minh đúng đắn:** Khi nối hai sợi dây ngắn nhất thành một sợi dây mới dài hơn, thứ tự sắp xếp ban đầu bị phá vỡ liên tục; còn với bài toán gán hạn chót (`deadline`), làm sao chắc chắn tiêu chí mình chọn **đúng 100%** chứ không phải đoán mò?
3. **Bế tắc 3 — Điểm gãy chết người (WA không rõ nguyên nhân):** Cùng tư duy "chọn đồng tiền to nhất" hay "chọn món đáng tiền nhất mỗi kg", bài này thì AC nhưng sang bài Đổi tiền hoặc Balo 0-1 lại **WA**! Làm sao tự phát hiện Tham lam bị gãy trước khi bấm nút Submit?

> **Chiến lược giải quyết (`Problem Decomposition`):** Tách bài toán lớn thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)**:
> - $V_1$: Tư Duy Tham Lam & Lập Lịch Đoạn (`Activity Selection` / Ghép Cặp Với `std::sort`).
> - $V_2$: Tham Lam Động Với Min-Heap (`priority_queue`) & Chứng Minh Đối Chứng Hoán Đổi (`Exchange Argument`).
> - $V_3$: Điểm Gãy Của Tham Lam — Phản Ví Dụ (`{1, 3, 4}`, Balo 0-1) & Đối Chiếu Máy Chấm (`L2-04` / `MOD-00`).

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Tư Duy Tham Lam, Lập Lịch Đoạn & Ghép Cặp Với `std::sort`

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Bài toán rạp chiếu phim (`Movie Festival` — `CSES-1629`):** Trong ngày có $N$ bộ phim, mỗi phim chiếu trong khoảng $[l_i, r_i]$ (từ phút $l_i$ đến phút $r_i$). Mỗi lần bạn chỉ xem được 1 phim, xem xong lúc $r_i$ có thể sang rạp khác xem ngay phim bắt đầu lúc $l_j \ge r_i$. Hỏi xem được tối đa bao nhiêu phim?
- **Thử 3 tiêu chí Tham lam bằng đời sống và phản ví dụ:**
  1. **Chọn phim bắt đầu sớm nhất ($l$ nhỏ nhất)? — SAI!** Ví dụ có 4 phim: `[1, 10]`, `[2, 6]`, `[5, 8]`, `[7, 11]`. Nếu chọn phim mở màn sớm nhất `[1, 10]`, bạn ngồi lì trong rạp suốt từ phút 1 đến phút 10 và bỏ lỡ sạch 3 phim còn lại $\rightarrow$ chỉ xem được **1 phim** (trong khi chọn `[2, 6]` rồi `[7, 11]` xem được **2 phim**)!
  2. **Chọn phim có thời lượng ngắn nhất ($r - l$ nhỏ nhất)? — CŨNG SAI!** Cũng với 4 phim `[1, 10]` (dài 9), `[2, 6]` (dài 4), `[5, 8]` (dài 3), `[7, 11]` (dài 4): phim ngắn nhất là `[5, 8]` (dài 3), nhưng nó lại nằm vắt ngang chặn đầu cả `[2, 6]` lẫn `[7, 11]` $\rightarrow$ bạn cũng chỉ xem được đúng **1 phim**!
  3. **Chọn phim kết thúc sớm nhất ($r$ nhỏ nhất)? — ĐÚNG TUYỆT ĐỐI!** Sau khi xem xong 1 phim, thứ duy nhất quyết định phần ngày còn lại bạn còn chỗ xem thêm bao nhiêu phim chính là **mốc thời gian rảnh `lastEnd`**. Chọn phim kết thúc càng sớm ($r$ càng nhỏ), phần thời gian còn lại `[r, +∞)` càng dài ra (chứa trọn vẹn phần còn lại của mọi lựa chọn khác)! Trên ví dụ trên: sắp theo $r$ tăng dần được `[2, 6]`, `[5, 8]`, `[1, 10]`, `[7, 11]` $\rightarrow$ chọn `[2, 6]`, bỏ `[5, 8]` và `[1, 10]` vì bắt đầu $< 6$, chọn tiếp `[7, 11]` $\rightarrow$ **2 phim**!
- **Mẫu Tham lam ghép cặp hai đầu (`Ferris Wheel` — `CSES-1090`):** Có $N$ bạn nhỏ có cân nặng $p_i$, mỗi cabin chở tối đa **2 bạn** với tổng cân nặng $\le X$. Làm sao dùng ít cabin nhất?
  - *Bẫy thường gặp:* Ghép hai bạn nhẹ nhất đi chung (`2 + 3 = 5` với $X = 10$ cho dãy `{2, 3, 7, 8}`) sẽ bỏ rơi `7` và `8` phải đi riêng $\rightarrow$ tốn **3 cabin**!
  - *Cách đúng:* Bạn **nặng nhất (`r`)** kiểu gì cũng phải lên cabin. Nếu có thể nhét thêm bạn **nhẹ nhất (`l`)** vào cùng cabin (`p[l] + p[r] <= X`) thì ghép đôi luôn (`l++, r--`), bằng không bạn nặng nhất đi một mình (`r--`)! Với `{2, 3, 7, 8}` và $X = 10$: ghép `{2, 8}` và `{3, 7}` $\rightarrow$ chỉ tốn **2 cabin**!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

// Comparator chuẩn Strict Weak Ordering (L1-05): sắp theo r tăng dần, không dùng <=
bool cmpEnd(const pair<long long, long long>& a, const pair<long long, long long>& b) {
    if (a.second != b.second) return a.second < b.second;
    return a.first < b.first;
}

int maxIntervals(vector<pair<long long, long long>> segs) {
    sort(segs.begin(), segs.end(), cmpEnd);
    int cnt = 0;
    long long lastEnd = -1e18;
    for (int i = 0; i < (int)segs.size(); i++) {
        if (segs[i].first >= lastEnd) {
            cnt++;
            lastEnd = segs[i].second;
        }
    }
    return cnt;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Thuật toán Tham lam (`Greedy Algorithm`):** Chiến lược giải quyết vấn đề bằng cách chọn phương án tốt nhất ở bước hiện tại (`tối ưu cục bộ` — *Local Optimum*) mà không xét lại các bước đã qua, hy vọng (và chứng minh được) rằng chuỗi lựa chọn đó dẫn tới *tối ưu toàn cục* (`Global Optimum`).
- **Lập lịch chọn đoạn (`Activity Selection`):** Bài toán kinh điển chọn nhiều đoạn $[l_i, r_i]$ không giao nhau nhất bằng cách sắp xếp tăng dần theo **điểm kết thúc $r_i$**.

---

### 2.2. Vấn Đề Nhỏ 2: Tham Lam Động Với Min-Heap (`priority_queue`) & Chứng Minh Exchange Argument

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Tại sao `std::sort` một lần không đủ cho bài Nối Dây (`Stick Divisions` — `CSES-1161`)?**
  - Cho $N$ đoạn dây có độ dài $d_1, \dots, d_N$. Mỗi bước chọn 2 đoạn dài $a, b$ ghép lại thành 1 đoạn dài $a + b$ và tốn chi phí $a + b$. Cần nối thành 1 sợi duy nhất với **tổng chi phí nhỏ nhất**.
  - Ví dụ với 4 đoạn `{2, 3, 3, 4}`:
    - Nếu chỉ `sort` 1 lần rồi nối cuốn chiếu từ trái sang phải: nối `2 + 3 = 5` (tốn `5`), rồi nối `5 + 3 = 8` (tốn `8`), rồi `8 + 4 = 12` (tốn `12`) $\rightarrow$ tổng = `5 + 8 + 12 = 25`! **SAI!** Vì sau bước 1, các đoạn đang có là `{5, 3, 4}` — sợi dây mới `5` đã **dài hơn** hai sợi `3` và `4` còn lại!
    - Đúng ra, ở mỗi bước ta luôn phải lấy **hai đoạn đang ngắn nhất hiện tại**: bước 1 gộp `2 + 3 = 5` (tốn `5`), rổ dây còn `{3, 4, 5}`; bước 2 gộp `3 + 4 = 7` (tốn `7`), rổ dây còn `{5, 7}`; bước 3 gộp `5 + 7 = 12` (tốn `12`) $\rightarrow$ tổng = `5 + 7 + 12 = 24`!
  - Công cụ từ `L1-06`: **Min-Heap** `priority_queue<long long, vector<long long>, greater<long long>>` giúp rút 2 số nhỏ nhất và thả tổng mới vào chỉ trong $O(\log N)$ mỗi bước! (Luôn dùng `long long` vì chi phí cộng dồn có thể vượt $2 \cdot 10^9$.)
- **Làm sao chứng minh Tham lam đúng 100% — Phương pháp Đối chứng hoán đổi (`Exchange Argument`)?**
  - Đừng đoán mò! Xét bài toán **Tasks and Deadlines (`CSES-1630`)**: Có $N$ nhiệm vụ, nhiệm vụ $i$ mất thời gian $a_i$ và có hạn $d_i$. Nếu xong tại thời điểm $f_i$, điểm thưởng là $d_i - f_i$. Cần xếp thứ tự $N$ việc để tổng điểm thưởng $\sum (d_i - f_i) = \sum d_i - \sum f_i$ lớn nhất.
  - Vì $\sum d_i$ là **hằng số cố định** (không đổi dù xếp thứ tự nào!), tối đa hóa tổng thưởng tương đương với **tối thiểu hóa tổng thời điểm hoàn thành $\sum f_i$**!
  - Giả sử có một lịch tối ưu nào đó chứa hai công việc đứng liền kề nhau là $A$ (tốn $a_1$) trước $B$ (tốn $a_2$), bắt đầu từ mốc thời gian $T$, nhưng lại bị ngược chiều **$a_1 > a_2$**:
    - Thứ tự cũ $(A \rightarrow B)$: $A$ xong lúc $T + a_1$, $B$ xong lúc $T + a_1 + a_2$. Tổng 2 mốc này là **$2T + 2a_1 + a_2$**.
    - Nếu ta **hoán đổi (swap)** $B$ lên trước $A$ thành $(B \rightarrow A)$: mọi công việc trước $A$ và sau $B$ đều **không đổi thời điểm hoàn thành** (vì cả khối vẫn bắt đầu tại $T$ và kết thúc tại $T + a_1 + a_2$). Riêng $B$ và $A$ có tổng mới là **$2T + 2a_2 + a_1$**.
    - Hiệu thay đổi: $(2T + 2a_2 + a_1) - (2T + 2a_1 + a_2) = a_2 - a_1 < 0$! Nghĩa là **đổi chỗ làm tổng $\sum f_i$ giảm đi (tốt hơn hẳn)**!
  - Kết luận thép: Mọi lịch còn tồn tại cặp kề $a_1 > a_2$ đều có thể hoán đổi để tốt hơn $\Rightarrow$ lịch tối ưu **bắt buộc sắp theo thời lượng $a_i$ tăng dần** (thậm chí không hề phụ thuộc vào $d_i$!).

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

// 1. Tham lam động nối dây bằng Min-Heap: O(N log N)
long long minMergeCost(const vector<long long>& sticks) {
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (long long x : sticks) pq.push(x);

    long long totalCost = 0;
    while ((int)pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        long long combined = a + b;
        totalCost += combined;
        pq.push(combined);
    }
    return totalCost;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Tham lam động với Min-Heap (`Dynamic Greedy with Priority Queue`):** Dùng `priority_queue<long long, vector<long long>, greater<long long>>` khi tập ứng viên liên tục sinh thêm phần tử mới sau mỗi lựa chọn, giữ thao tác bốc phần tử nhỏ nhất ở mức $O(\log N)$.
- **Đối chứng hoán đổi (`Exchange Argument`):** Kỹ thuật chứng minh Tham lam chuẩn mực: giả sử tồn tại phương án tối ưu khác thứ tự Tham lam, xét hai phần tử kề nhau bị đảo nghịch và hoán đổi chúng để chứng minh kết quả **tốt hơn hoặc giữ nguyên** (không bao giờ tệ đi).

---

### 2.3. Vấn Đề Nhỏ 3: Điểm Gãy Của Tham Lam — Phản Ví Dụ & So Đối Chiếu Máy Chấm (`L2-04` / `MOD-00`)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Tại sao Tham lam có thể bị gãy? — "Cái bẫy tham bát bỏ mâm":**
  Tham lam chỉ nhìn lợi ích trước mắt mà **không biết nhìn xa** và **không thể quay lại sửa** nếu bước chọn sớm đó làm khóa mất tổ hợp đẹp phía sau! Có hai bài toán kinh điển làm lộ rõ **điểm gãy của Tham lam**:
  1. **Điểm gãy 1 — Bài toán Đổi tiền (`Coin Change`):** Cho các mệnh giá xu `{1, 3, 4}` (không giới hạn số tờ mỗi loại), cần đổi đúng $S = 6$ đồng bằng **ít tờ nhất**.
     - *Tham lam chọn tờ lớn nhất trước:* `6 >= 4` $\rightarrow$ lấy tờ `4`, còn lại `2` $\rightarrow$ lấy `1` $\rightarrow$ lấy `1` = **`3` tờ (`4 + 1 + 1`)**.
     - *Đáp án tối ưu (tìm bằng Quay lui `L2-04`):* bỏ qua tờ `4`, chọn **`3 + 3`** = chỉ cần **`2` tờ**!
     - *Bản chất:* Tờ `4` trông hấp dẫn trước mắt vì giảm được nhiều nhất, nhưng lại cắt đứt khả năng ghép cặp `3 + 3` tròn trịa phía sau!
  2. **Điểm gãy 2 — Xếp Balo 0-1 (`0-1 Knapsack`) theo đơn giá $v_i / w_i$:** Cho balo tải trọng tối đa $W = 10$ kg và 3 món đồ **nguyên chiếc** (chỉ được chọn nguyên món hoặc bỏ, không được bẻ đôi!):
     - Món A: nặng $6$ kg, giá trị $60$ (tỉ giá **$10.0$/kg** — cao nhất!).
     - Món B: nặng $5$ kg, giá trị $45$ (tỉ giá **$9.0$/kg**).
     - Món C: nặng $5$ kg, giá trị $45$ (tỉ giá **$9.0$/kg**).
     - *Tham lam lấy tỉ giá cao nhất:* nhặt ngay Món A ($6$ kg, giá $60$). Balo còn dư đúng **$4$ kg trống**, không nhét vừa Món B ($5$ kg) hay Món C ($5$ kg) $\rightarrow$ tổng giá trị = **`60`**!
     - *Đáp án tối ưu (duyệt Bitmask $2^3 = 8$ ở `L2-04`):* bỏ qua Món A, nhặt **Món B + Món C** ($5 + 5 = 10$ kg vừa khít!) $\rightarrow$ tổng giá trị = **`90`**!
- **Chiến thuật phòng thủ sống còn trong phòng thi (`L2-04` + `MOD-00`):**
  - Khi nghĩ ra một chiến lược Tham lam cho bài mới mà **chưa chứng minh được bằng Exchange Argument**, đừng vội tin 100% rồi nộp bài!
  - Hãy viết ngay hàm `solveTrau()` bằng **Quay lui hoặc Bitmask (`L2-04`)** chạy đúng tuyệt đối trên test nhỏ $N \le 8$, rồi cho chạy đối chiếu với `solveGreedy()` trên hàng nghìn test ngẫu nhiên bằng `mt19937` (**Máy chấm `MOD-00`**). Chỉ sau 0.1 giây, nếu Tham lam sai, Máy chấm sẽ nhổ ra ngay một **phản ví dụ cực nhỏ** để bạn tỉnh ngộ!
  - **Cánh cửa mở sang bài `L2-06` (Quy hoạch động):** Khi Máy chấm chứng minh Tham lam bị gãy (như Đổi tiền hay Balo 0-1), ta không thể cứ cắm đầu vào $O(2^N)$ khi $N = 1000$ hay $S = 10^5$. Giải pháp tiếp theo ở **`L2-06`** sẽ dạy bạn cách **lưu lại đáp án tối ưu của mọi bài toán con nhỏ hơn** để vừa xét đủ mọi khả năng như Quay lui, vừa chạy nhanh như vòng lặp!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

// Đổi tiền bằng Quay lui đơn giản (L2-04) trên S nhỏ vs Tham lam
int greedyCoin(int S, vector<int> coins) {
    sort(coins.rbegin(), coins.rend());
    int cnt = 0;
    for (int c : coins) {
        cnt += S / c;
        S %= c;
    }
    return S == 0 ? cnt : 1e9;
}

void backtrackCoin(int S, int used, const vector<int>& coins, int& best) {
    if (used >= best) return;
    if (S == 0) { best = used; return; }
    for (int c : coins) {
        if (c <= S) backtrackCoin(S - c, used + 1, coins, best);
    }
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Phản ví dụ (`Counterexample`):** Một bộ dữ liệu đầu vào cụ thể (thường rất nhỏ, chỉ $3$–$5$ phần tử) làm thuật toán Tham lam cho kết quả **tệ hơn** đáp án tối ưu thực tế — chỉ cần **1 phản ví dụ** là đủ bác bỏ hoàn toàn một thuật toán Tham lam!
- **Điểm gãy của Tham lam (`Failure of Greedy Choice Property`):** Tình huống mà việc chọn phương án tốt nhất cục bộ ở bước hiện tại làm mất đi khả năng đạt cấu hình tốt nhất toàn cục về sau (dấu hiệu cần chuyển sang **Quy hoạch động `L2-06+`**).

---

## 3. Bảng Phân Tích Độ Phức Tạp, Mẫu Tham Lam & Các Bẫy Thường Gặp

| Dạng bài / Kỹ thuật | Cấu trúc dùng kèm | Độ phức tạp | Khi nào ĐÚNG vs GÃY? |
| :--- | :--- | :---: | :--- |
| Lập lịch chọn đoạn | `vector<pair>` + `sort` theo $r_i$ | $O(N \log N)$ | Đúng cho đếm tối đa đoạn rời nhau |
| Ghép cặp 2 đầu / Sắp hạn | `sort` + 2 chỉ số `l, r` hoặc `cmp` | $O(N \log N)$ | Chứng minh được bằng **Exchange Argument** |
| Tham lam động nối dây | Min-Heap `priority_queue<..., greater<...>>` | $O(N \log N)$ | Đúng khi cần bốc min/max sau mỗi bước gộp |
| Đổi tiền mệnh giá bất kỳ / Balo 0-1 | Quay lui / Bitmask (`L2-04`) | $O(2^N)$ cho $N \le 20$ | **Tham lam GÃY!** Cần `L2-06+` Quy hoạch động cho $N$ lớn |

### Danh Sách Bẫy Kinh Điển Cần Tránh
1. **Xếp đoạn theo bắt đầu `l` hoặc độ dài `r - l`:** Cả hai đều có phản ví dụ 4 đoạn làm WA tức thì — bắt buộc xếp theo **kết thúc `r` tăng dần**.
2. **Dùng nhầm `sort` một lần thay cho Min-Heap khi tập giá trị biến đổi:** Sau khi gộp 2 phần tử nhỏ nhất, phần tử mới `a + b` có thể lớn hơn các phần tử đứng sau — bắt buộc dùng **Min-Heap (`priority_queue<long long, vector<long long>, greater<long long>>`)**.
3. **Quên dùng `long long` trong tổng chi phí hoặc điểm thưởng:** Các bài như `Stick Divisions` hoặc `Tasks and Deadlines` có tổng vượt $10^{14}$, dùng `int` bị tràn âm ngay!
4. **Tin tưởng Tham lam mà không chứng minh hay chạy Stress Test `MOD-00`:** Hãy kiểm tra bằng `solveTrau()` (`L2-04`) trên $N \le 8$ trước khi chắc chắn Tham lam không có phản ví dụ!
