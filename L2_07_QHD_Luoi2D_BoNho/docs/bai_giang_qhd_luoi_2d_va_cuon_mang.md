# Bài Giảng `L2-07` — DP Lưới 2D & Tối Ưu Bộ Nhớ (Rolling Array)

- **Mã chuyên đề:** `L2-07` (Tầng 2 — Pha 2 STL Lớp 9, Core DP)
- **Kiến thức tiền đề đã có (`MOD-00`, `L1-04`, `L1-05`, `L2-01`, `L2-06`):**
  - Đã thành thạo **Chuẩn CP C++14**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`, `std::vector`, `pair`, và `swap()`.
  - Đã quen xử lý **Bảng lưới 2 chiều 1-based** (hàng `0`, cột `0` làm biên lính canh ở `L2-01`) và phép chia dư modulo `MOD = 1000000007LL` (`L1-07`).
  - Đã nắm **Khung 4 Bước Quy Hoạch Động 1D (`L2-06`)**: định nghĩa trạng thái `dp[i]`, cơ sở, vô cực an toàn `INF = 1000000000000000000LL` (`1e18`), và truy vết ngược `reverse()`.
  - Đã biết tính toán **Bộ nhớ RAM & giới hạn 256 MB (`L1-04`, `MOD-00`)**: hiểu vì sao một bảng 2D kích thước $10\,000 \times 10\,000$ vượt trần 256 MB và bị **MLE**.
- **Kiến thức mới mở khóa ở `L2-07`:**
  - Mở rộng bảng trạng thái lên **2 chiều `dp[i][j]`** trên bản đồ lưới $N \times M$ cho bài toán tối ưu tổng Min/Max và **Truy vết 2D** đường đi `(1, 1) -> (N, M)`.
  - **Chuẩn biên 1-based an toàn ($\pm\text{INF}$):** Khởi tạo hàng `0` và cột `0` bằng `INF` / `-INF` thay vì `0` để tránh hàm `min()`/`max()` kéo nhầm giá trị giả từ ngoài bản đồ.
  - **Đếm đường đi có vật cản theo modulo $10^9 + 7$:** Xử lý chuẩn xác bẫy ô xuất phát `(1, 1)` hoặc đích `(N, M)` bị chặn (`*`), và biến thể duyệt **cột-trước-hàng-sau** cho lưới đi 3 hướng (`VNOJ-QBMAX`).
  - **Kỹ thuật Cuộn Mảng (`Rolling Array`):** Nén bảng `dp[N][M]` từ $O(N \cdot M)$ RAM xuống **2 hàng (`prev` / `cur`)** hoặc **1 hàng (`dp[M + 1]`)** chỉ tốn $O(M)$ bộ nhớ, đồng thời nắm rõ khi nào **không được** nén 1 hàng (ghi đè chéo) và sự đánh đổi với truy vết.

---

## 1. Bức Tranh Toàn Cảnh: Từ Đường Thẳng 1D Lên Bản Đồ Lưới 2D & Nỗi Ám Ảnh 256 MB

Ở bài `L2-06`, con ếch chỉ nhảy dọc theo **một hàng đá thẳng tắp 1 chiều**, nên một biến vị trí `i` trong `dp[i]` là quá đủ. Nhưng trong thực tế thi đấu (từ *CSES Grid Paths*, *AtCoder Grid 1* đến *VNOJ QBMAX*), bài toán thường diễn ra trên một **bảng ô vuông $N$ hàng $\times$ $M$ cột**:
1. Tại mỗi ô $(i, j)$, robot có thể rẽ **Sang phải** $(i, j + 1)$ hoặc **Xuống dưới** $(i + 1, j)$ (hoặc thậm chí 3 hướng sang cột kế tiếp). Một chỉ số `i` duy nhất không thể mô tả được vị trí $(i, j)$ đang đứng!
2. Nếu bê nguyên thói quen đặt viền `0` ở hàng `0` và cột `0` từ bài Tổng Cộng Dồn (`L2-01`) sang bài **Tìm đường đi tổng nhỏ nhất** hoặc bài **Có số âm**, hàm `min()`/`max()` sẽ tự động nhận `0` từ ngoài mép lưới và phá hỏng toàn bộ đáp án (**WA**)!
3. Khi gặp bài cho kích thước lớn như $N = 10^4, M = 10^4$, bảng `long long dp[10005][10005]` ngốn tới **~800 MB > 256 MB** và sập ngay vì **MLE (Memory Limit Exceeded)**!

> **Chiến lược giải quyết (`Problem Decomposition`):** Tách bài toán lớn thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)**:
> - $V_1$: Bảng Trạng Thái 2D `dp[i][j]`, Chuẩn Biên 1-Based ($\pm\text{INF}$) & Truy Vết Đường Đi.
> - $V_2$: Đếm Đường Đi Có Vật Cản (`MOD = 10^9 + 7`), Bẫy Điểm Đầu/Đích & Biến Thể 3 Hướng (`QBMAX`).
> - $V_3$: Tối Ưu Bộ Nhớ Bằng Cuộn Mảng (`Rolling Array`: 2 Hàng `prev`/`cur` vs 1 Hàng `O(M)` & Ranh Giới Áp Dụng).

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Bảng Trạng Thái 2D `dp[i][j]` & Chuẩn Biên 1-Based (Tối Ưu Min/Max)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Hãy tưởng tượng một chú robot giao hàng đứng ở góc trên trái $(1, 1)$ của khu phố bàn cờ $N$ hàng, $M$ cột, muốn đi tới góc dưới phải $(N, M)$. Mỗi ô $(i, j)$ có trạm thu phí $a[i][j]$. Robot chỉ được đi **Sang phải** hoặc **Xuống dưới**. Làm sao tìm tổng phí rẻ nhất (hoặc tổng điểm cao nhất) và chỉ ra con đường cụ thể?

- **Định nghĩa trạng thái 2D:** `dp[i][j]` là *tổng chi phí nhỏ nhất để robot đi từ $(1, 1)$ tới đúng ô $(i, j)$*.
- **Công thức truy hồi (Pull DP):** Để đứng được vào ô $(i, j)$ (khác $(1, 1)$), bước ngay trước đó robot **chỉ có thể** bước xuống từ ô trên $(i - 1, j)$ hoặc bước sang từ ô trái $(i, j - 1)$:
  $$\text{dp}[i][j] = \min(\text{dp}[i - 1][j],\ \text{dp}[i][j - 1]) + a[i][j]$$
- **Bẫy chết người khi để biên hàng `0` và cột `0` bằng `0`:**
  - Nếu bạn quen tay gán `dp` ban đầu toàn `0` như Mảng Cộng Dồn (`L2-01`), khi tính ô $(1, 2)$ ở hàng đầu tiên, robot lấy $\min(\text{dp}[0][2], \text{dp}[1][1]) + a[1][2] = \min(0, a[1][1]) + a[1][2]$.
  - Vì `dp[0][2] = 0` nhỏ hơn `a[1][1]`, robot giả vờ "nhảy dù" từ bên ngoài bản đồ xuyên qua hàng `0` vào thẳng $(1, 2)$ mà bỏ qua tiền vé ở $(1, 1)$! Tương tự với bài **tìm Max trên bảng có số âm**: `0` ở ngoài mép lớn hơn mọi số âm bên trong nên thuật toán cũng chọn đi xuyên tường!
- **Cách đặt lính canh biên chuẩn 1-based:**
  - Khởi tạo **toàn bộ** bảng `dp` kích thước $(N + 1) \times (M + 1)$ bằng **`INF = 1e18`** (với bài Min) hoặc **`-INF = -1e18`** (với bài Max có số âm).
  - Neo duy nhất ô xuất phát: `dp[1][1] = a[1][1]`.
  - Khi chạy hai vòng lặp `i = 1..N`, `j = 1..M` (bỏ qua `(1, 1)`), tại hàng `1` ($i = 1, j > 1$) thì `dp[0][j] = INF` sẽ **tự động thua** trong hàm `min()`, ép robot bắt buộc phải đi từ bên trái `(1, j - 1)` sang mà không cần viết thêm bất kỳ câu lệnh `if` rẽ nhánh nào!
- **Truy vết đường đi 2D (`(1, 1) -> (N, M)`):**
  - Đứng ở đích `(r, c) = (N, M)`, chừng nào `r > 1 || c > 1`: kiểm tra xem `r > 1 && dp[r][c] == dp[r - 1][c] + a[r][c]` không; nếu đúng thì bước trước đó là **Xuống (`'D'`)** và lùi `r--`, ngược lại là **Phải (`'R'`)** và lùi `c--`. Cuối cùng gọi `reverse()` để lật ngược dãy bước thành xuôi!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL; // 1e18

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 3, m = 3;
    vector<vector<long long>> a = {
        {0, 0, 0, 0},
        {0, 1, 9, 9},
        {0, 2, 9, 9},
        {0, 3, 1, 1}
    };

    // Khởi tạo toàn bộ bằng INF để hàng 0 và cột 0 làm tường chắn an toàn
    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, INF));
    dp[1][1] = a[1][1];

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) continue;
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + a[i][j];
        }
    }

    // Truy vết ngược từ (n, m) về (1, 1) rồi reverse()
    string moves;
    int r = n, c = m;
    while (r > 1 || c > 1) {
        if (r > 1 && dp[r][c] == dp[r - 1][c] + a[r][c]) {
            moves.push_back('D');
            r--;
        } else {
            moves.push_back('R');
            c--;
        }
    }
    reverse(moves.begin(), moves.end());

    cout << "Tong min = " << dp[n][m] << " | Buoc: " << moves << '\n'; // 8 | DDRR
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Bảng trạng thái 2D (`2D DP State Table`):** Bảng `dp[i][j]` lưu đáp án tối ưu của bài toán con kết thúc tại tọa độ hàng `i`, cột `j`.
- **Đường biên lính canh $\pm\text{INF}$ (`Sentinel Border`):** Việc đặt hàng `0` và cột `0` thành `INF` (cho bài `min`) hoặc `-INF` (cho bài `max`) để loại bỏ khả năng nhảy từ ngoài biên vào bảng mà vẫn giữ công thức `dp[i][j]` ngắn gọn, đồng nhất.
- **Truy vết trực tiếp 2D (`2D On-the-fly Reconstruction`):** Lần ngược từ $(N, M)$ về $(1, 1)$ bằng cách đối chiếu xem `dp[r][c]` khớp với ô trên `(r - 1, c)` hay ô trái `(r, c - 1)`, rồi đảo ngược bằng `reverse()`.

---

### 2.2. Vấn Đề Nhỏ 2: Đếm Đường Đi Có Vật Cản (`MOD = 10^9 + 7`) & Biến Thể Hướng Đi

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Xét hai tình huống rất hay gặp trong đề thi:
1. **Đếm số đường đi tránh hố bẫy (`CSES-1638` / `AtCoder DP-H`):** Trên lưới $N \times M$ gồm ô đi được `.` và hố bẫy `*` (hoặc `#`), đếm số đường đi từ `(1, 1)` tới `(N, M)` theo hướng Phải / Xuống (chia dư cho `10^9 + 7`).
   - Tại ô có bẫy `*`: robot **không thể đặt chân vào**, nên số cách đi tới đó luôn bằng **`0`** (`dp[i][j] = 0`).
   - **Bẫy chí mạng — Điểm xuất phát `(1, 1)` bị khóa `*`:** Nếu bạn gán cứng `dp[1][1] = 1;` trước vòng lặp mà quên kiểm tra `grid[1][1] == '*'`, robot sẽ "xuất phát từ giữa hố bẫy" và đếm ra hàng loạt đường đi ma! Tương tự nếu `(N, M) == '*'`, đích bị khóa nên kết quả cũng phải bằng **`0`**.
   - **Lấy dư `% MOD` ngay từng phép cộng:** Số đường đi trên lưới $1000 \times 1000$ lớn hơn $10^{500}$, nên phải viết `dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;` ngay bên trong vòng lặp.
2. **Biến thể 3 hướng & xuất phát cả cột 1 (`VNOJ-QBMAX`):**
   - Robot được chọn **bất kỳ ô nào ở cột 1** để bắt đầu, mỗi bước sang cột `j` được đi **Lên-phải**, **Đi thẳng**, hoặc **Xuống-phải** (tức là tới `(i, j)` từ `(i - 1, j - 1)`, `(i, j - 1)` hoặc `(i + 1, j - 1)`), và dừng ở bất kỳ ô nào trên cột $M$.
   - **Hai thay đổi bắt buộc:**
     - **Duyệt cột `j` ở vòng lặp NGOÀI, hàng `i` ở vòng lặp TRONG:** Vì `(i, j)` cần đọc cả ô ở hàng dưới `i + 1` của cột `j - 1` (`dp[i + 1][j - 1]`). Nếu duyệt hàng `i` ở ngoài thì cả cột `j - 1` chưa hoàn tất!
     - **Lót `-INF` ở CẢ hàng `0` lẫn hàng `N + 1`:** Bảng phải có kích thước `(N + 2) x (M + 1)` khởi tạo `-INF` vì ma trận có thể chứa toàn số âm (`|a[i][j]| <= 100`).

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 4, m = 4;
    vector<string> grid = {
        "....",
        ".*..",
        "...*",
        "*..."
    };

    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (grid[i - 1][j - 1] == '*') {
                dp[i][j] = 0; // Bảo vệ cả trường hợp (1, 1) hoặc (n, m) là '*'
            } else if (i == 1 && j == 1) {
                dp[1][1] = 1;
            } else {
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
            }
        }
    }
    cout << "So duong di hop le = " << dp[n][m] << '\n'; // 3
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Bẫy điểm gốc bị chặn (`Blocked Origin/Destination Trap`):** Lỗi gán cứng `dp[1][1] = 1` trước khi kiểm tra xem ô `(1, 1)` có phải vật cản hay không.
- **Thứ tự phụ thuộc theo cột (`Column-by-Column Dependency`):** Khi công thức truy hồi của cột `j` cần đọc các hàng trên/ngang/dưới ở cột `j - 1` (`dp[i - 1][j - 1]`, `dp[i][j - 1]`, `dp[i + 1][j - 1]`), vòng lặp ngoài bắt buộc phải là `for (int j = 2; j <= m; j++)`.

---

### 2.3. Vấn Đề Nhỏ 3: Tối Ưu Bộ Nhớ Bằng Cuộn Mảng (`Rolling Array`: $O(N \cdot M) \rightarrow O(M)$ RAM)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Nếu đề bài nâng kích thước lên $N = 10\,000, M = 10\,000$ với giới hạn bộ nhớ **256 MB** (`L1-04`), việc tạo bảng `vector<vector<long long>> dp(10005, vector<long long>(10005))` ngốn:
$$10\,005 \times 10\,005 \times 8\text{ bytes} \approx 800{,}8\text{ MB} \gg 256\text{ MB} \implies \textbf{MLE ngay lập tức!}$$

Hãy để ý: khi tính hàng `i`, ta **chỉ nhìn vào hàng `i - 1` ngay phía trên** và ô bên trái cùng hàng `i`. Toàn bộ các hàng `1, 2, ..., i - 2` cũ đã xong việc và không bao giờ được đọc lại nữa!

1. **Cuộn mảng 2 hàng (`prev` và `cur`):**
   - Dùng đúng 2 mảng 1 chiều cỡ `M + 1`: `prev` giữ hàng `i - 1`, `cur` dùng để tính hàng `i` (chỉ tốn $2 \times 10\,005 \times 8\text{ bytes} \approx 160\text{ KB}$!).
   - Tính xong hàng `i`, chỉ cần gọi `swap(prev, cur);` (đổi vai con trỏ trong $O(1)$, không copy dữ liệu).
   - **Bẫy chết người:** Sau `swap(prev, cur)`, mảng `cur` đang chứa dữ liệu cũ của hàng `i - 2`! Bắt buộc phải gọi **`fill(cur.begin(), cur.end(), 0);`** (hoặc `INF`) ở đầu mỗi hàng `i` — nếu không, khi gặp ô vật cản `*` rồi `continue;`, giá trị rác từ hàng `i - 2` sẽ trỗi dậy biến thành "đường đi ma"!
2. **Nén xuống đúng 1 hàng duy nhất (`1-Row In-Place DP`):**
   - Dùng duy nhất 1 mảng `vector<long long> dp(M + 1)`. Khi vòng `j` chạy từ `1` tới `M` trên hàng `i`:
     - Trước khi gán `dp[j] = ...`, biến **`dp[j]` vẫn đang giữ giá trị của hàng `i - 1`** (ô TRÊN!).
     - Còn **`dp[j - 1]` vừa được cập nhật xong ở bước trước**, nên nó giữ giá trị mới của **hàng `i`** (ô TRÁI!).
   - **Hai ranh giới không thể lạm dụng 1 hàng tại chỗ:**
     - Nếu công thức cần đọc một ô bị ghi đè chéo (như `QBMAX` đọc cả `i - 1`, `i`, `i + 1` của cột trước): cập nhật `dp[i]` sớm sẽ làm `i + 1` đọc nhầm giá trị mới của cột hiện tại! Lúc đó **phải giữ 2 mảng `prev` / `cur`**.
     - Nếu đề bắt **truy vết in toàn bộ đường đi**: bảng 2D `dp[][]` đã bị ghi đè mất nên không dùng truy vết `On-the-fly` được nữa; cần phải giữ bảng ký tự hướng nhẹ `char dir[N][M]` (chỉ tốn $1\text{ byte}$/ô) hoặc dùng đủ bảng 2D khi $N, M$ cho phép.

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 3, m = 3;
    vector<string> grid = {
        "...",
        "...",
        ".*."
    };

    // Cách 1: Cuộn mảng 2 hàng (an toàn, dễ suy nghĩ, ~160 KB cho M = 10000)
    vector<long long> prev(m + 1, 0), cur(m + 1, 0);
    for (int i = 1; i <= n; i++) {
        fill(cur.begin(), cur.end(), 0); // Bắt buộc xóa dấu vết hàng i - 2!
        for (int j = 1; j <= m; j++) {
            if (grid[i - 1][j - 1] == '*') continue;
            if (i == 1 && j == 1) cur[j] = 1;
            else cur[j] = (prev[j] + cur[j - 1]) % MOD;
        }
        swap(prev, cur);
    }
    cout << "2-row rolling = " << prev[m] << '\n'; // 3

    // Cách 2: Nén 1 hàng tại chỗ (dp[j] trước ghi đè = up, dp[j - 1] = left)
    vector<long long> dp(m + 1, 0);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (grid[i - 1][j - 1] == '*') {
                dp[j] = 0; // Bắt buộc gán lại = 0 (không được chỉ continue!)
            } else if (i == 1 && j == 1) {
                dp[1] = 1;
            } else {
                dp[j] = (dp[j] + dp[j - 1]) % MOD;
            }
        }
    }
    cout << "1-row rolling = " << dp[m] << '\n'; // 3
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Cuộn mảng (`Rolling Array` / `Space Optimization`):** Kỹ thuật tái sử dụng lại 2 hàng (`prev`, `cur`) hoặc 1 hàng (`dp`) thay cho toàn bộ bảng $N \times M$ khi trạng thái hàng hiện tại chỉ phụ thuộc vào hàng liền kề ngay trước nó.
- **Xung đột ghi đè (`Overwrite Conflict`):** Tình huống dùng 1 mảng tại chỗ làm mất giá trị cũ cần thiết cho bước kế tiếp (như `dp[i]` mới đè mất giá trị cột cũ khi `i + 1` còn cần đọc `i` cũ).

---

## 3. Tổng Kết Độ Phức Tạp & 5 Bẫy Kinh Điển Trên Lưới 2D

| Phương pháp | Thời gian | Bộ nhớ RAM ($N, M \le 10^4$) | Có truy vết `On-the-fly` trên `dp` được không? | Ghi chú áp dụng |
| :--- | :--- | :--- | :--- | :--- |
| Bảng 2D đầy đủ `dp[N+1][M+1]` | $O(N \cdot M)$ | $O(N \cdot M)$ (~800 MB &rarr; **MLE** nếu $10^4 \times 10^4$) | **Có** | Dùng khi $N, M \le 3000$ (`long long`) hoặc cần truy vết trực tiếp |
| Cuộn mảng 2 hàng (`prev`, `cur`) | $O(N \cdot M)$ | $O(M)$ (~160 KB với $M = 10^4$) | Không (cần lưu riêng `char dir[N][M]` nếu truy vết) | An toàn nhất, xử lý được cả bước đi chéo 3 hướng |
| Nén 1 hàng tại chỗ (`dp[M+1]`) | $O(N \cdot M)$ | $O(M)$ (~80 KB với $M = 10^4$) | Không | Chỉ dùng khi mọi phụ thuộc đọc đúng ô chưa ghi đè (`up`, `left`) |

**5 bẫy cần kiểm tra trước khi Submit bài DP Lưới 2D:**
1. Khởi tạo bảng `dp` bằng `0` cho bài Min (hoặc bài Max có số âm) $\rightarrow$ hàng `0` / cột `0` kéo `0` giả vào đáp án (`WA`). Phải đặt biên $\pm\text{INF} = \pm 10^{18}$.
2. Gán cứng `dp[1][1] = 1` trong bài Đếm đường có vật cản mà quên kiểm tra ô `(1, 1) == '*'` (hoặc `(n, m) == '*'`).
3. Quên lấy `% MOD` ở từng phép cộng bên trong vòng lặp trong bài Đếm đường.
4. Duyệt sai thứ tự vòng lặp khi công thức cần cột trước ở cả hàng trên/dưới (`QBMAX` bắt buộc duyệt cột `j` ở ngoài, hàng `i` ở trong).
5. Quên `fill(cur.begin(), cur.end(), ...)` sau `swap(prev, cur)`, hoặc dùng 1 hàng tại chỗ cho công thức đọc ô đã bị ghi đè!
