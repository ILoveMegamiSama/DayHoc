# Bài Giảng `L2-09` — DP Dãy Con, Xâu & Máy Trạng Thái Cơ Bản (Tốt Nghiệp Tầng 2)

- **Mã chuyên đề:** `L2-09` (Tầng 2 — Pha 2 STL Lớp 9, Cột Mốc Tốt Nghiệp Tầng 2)
- **Kiến thức tiền đề đã có (`L2-06`, `L2-07`, `L2-08`):**
  - Đã thành thạo **Chuẩn CP C++14**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`, `std::vector`, `std::string`, `pair`, `reverse()`, `*max_element()`.
  - Đã nắm **Khung 4 Bước DP & Truy vết `trace[]` (`L2-06`)**: định nghĩa trạng thái, truy hồi, giá trị cơ sở và lần ngược mảng cha.
  - Đã quen **Bảng DP 2D `dp[i][j]` & Cuộn mảng (`L2-07`)** cùng tư duy thiết kế chiều trạng thái và kiểm soát vòng lặp (`L2-08`).
- **Kiến thức mới mở khóa ở `L2-09`:**
  - **Dãy con tăng dài nhất (`LIS` $O(N^2)$) & Truy vết dãy:** Trạng thái `dp[i]` **kết thúc TẠI vị trí `i`**, phân biệt tăng ngặt (`<`) vs không giảm (`<=`), bẫy chết người in nhầm `dp[n]` thay vì `*max_element` toàn mảng, và truy vết ngược bằng `trace[i]`.
  - **DP Hai Tiền Tố Trên Xâu (`LCS` & `Edit Distance`):** Ánh xạ hai xâu `A[0..n-1]`, `B[0..m-1]` lên bảng 2D `(n + 1) x (m + 1)`. Nắm vững sự khác biệt sống còn giữa **LCS** (biên `0`, truy vết xâu chung) và **Edit Distance** (biên bắt buộc `dp[i][0] = i`, `dp[0][j] = j`).
  - **DP Máy Trạng Thái Theo Ngày (`dp[i][state]` — `AtCoder DP-C Vacation`):** Mở thêm chiều nhỏ lưu trạng thái hành động ngày hôm trước khi lựa chọn hôm nay bị ràng buộc bởi hôm qua.
  - **Bản Đồ Tổng Hợp 4 Nhóm DP Cơ Bản Chuẩn HSG Lớp 9:** Quy chuẩn hóa toàn bộ lộ trình `L2-06` $\rightarrow$ `L2-09` để đọc đề là nhận diện ngay mô hình DP phù hợp.

---

## 1. Bức Tranh Toàn Cảnh: Khép Lại Bốn Trụ Cột DP Cơ Bản Lớp 9

Từ `L2-06` đến `L2-08`, bạn đã làm chủ DP 1D trên dãy số, DP lưới 2D trên bản đồ ô vuông và DP cái túi/tổ hợp đếm. Để hoàn thành trọn vẹn mảnh ghép Quy hoạch động cho kỳ thi HSG Tin học Lớp 9, còn lại **3 khuôn mẫu kinh điển** xuất hiện dày đặc nhất trong đề thi:

1. **$V_1$: Dãy Con Tăng Dài Nhất (`LIS` $O(N^2)$) & Truy Vết Dãy** — chọn một dãy con không cần liên tiếp có giá trị tăng dần dài nhất.
2. **$V_2$: DP Hai Tiền Tố Trên Xâu (`LCS` & `Edit Distance`)** — đối chiếu hai xâu ký tự bằng bảng 2 chiều `(n + 1) x (m + 1)`.
3. **$V_3$: DP Máy Trạng Thái Theo Ngày (`dp[i][state]`) & Bản Đồ 4 Nhóm DP Lớp 9** — giải các bài tối ưu theo chuỗi ngày bị ràng buộc trạng thái liền kề, đồng thời tổng hợp trọn vẹn 4 nhóm DP cốt lõi.

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Dãy Con Tăng Dài Nhất (`LIS` $O(N^2)$) & Truy Vết Dãy

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Cho dãy $N \le 1000$ số nguyên $a_1, a_2, \dots, a_N$. Hãy chọn ra một **dãy con** (giữ nguyên thứ tự từ trái sang phải, được quyền bỏ qua các phần tử xen giữa) sao cho các số được chọn **tăng dần** và độ dài dài nhất.

1. **Vì sao không đặt `dp[i]` = "độ dài LIS trong đoạn `1..i`" rồi đọc `dp[n]`?**
   - Nếu chỉ biết đoạn `1..i` có LIS dài `3` mà không biết **phần tử cuối cùng của dãy đó lớn cỡ nào**, khi đứng trước `a[i + 1]` ta hoàn toàn mù tịt không biết có nối được `a[i + 1]` vào sau dãy đó hay không!
2. **Định nghĩa chuẩn: `dp[i]` = độ dài LIS KẾT THÚC ĐÚNG TẠI vị trí `i` (bắt buộc chọn `a[i]` làm phần tử cuối):**
   - **Khởi tạo:** Mọi phần tử đứng một mình đã tạo thành dãy tăng dài `1` $\implies$ **`dp[i] = 1`**.
   - **Chuyển trạng thái (nhìn về mọi vị trí `j < i`):** Nếu `a[j] < a[i]`, ta có thể nối `a[i]` vào ngay sau dãy tốt nhất kết thúc tại `j`, nên cập nhật:
     $$\text{dp}[i] = \max\big(\text{dp}[i],\ \text{dp}[j] + 1\big)$$
   - **Phân biệt Tăng ngặt vs Không giảm:** Đề yêu cầu $a_{i_1} < a_{i_2} < \dots$ thì kiểm tra `a[j] < a[i]` (`{3, 3, 5}` ra `2`); nếu cho phép bằng nhau $a_{i_1} \le a_{i_2} \le \dots$ (dãy không giảm) thì kiểm tra `a[j] <= a[i]` (`{3, 3, 5}` ra `3`).
   - **Bẫy chết người: KHÔNG BAO GIỜ in `dp[n]`!** Ví dụ dãy `{4, 2, 6, 3, 8, 1}` có mảng `dp = [1, 1, 2, 2, 3, 1]`. Phần tử cuối `a[6] = 1` quá nhỏ không nối được vào đâu nên `dp[6] = 1`, trong khi LIS dài nhất kết thúc tại `a[5] = 8` (`4, 6, 8`) có độ dài **`3`**! Đáp án toàn bài bắt buộc là **`*max_element(dp.begin() + 1, dp.end())`**.
3. **Truy vết in lại dãy con:**
   - Khởi tạo `trace(n + 1, -1)`. Mỗi lần `a[j] < a[i]` và `dp[j] + 1 > dp[i]`, gán `dp[i] = dp[j] + 1` và ghi `trace[i] = j`.
   - Tìm chỉ số `bestPos` đạt `dp[bestPos]` lớn nhất (không phải `n`!), lần ngược `cur = bestPos; while (cur != -1)` để đẩy `a[cur]` vào `seq`, rồi gọi `reverse(seq.begin(), seq.end())`.

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<long long> a = {0, 4, 2, 6, 3, 8, 1}; // 1-based, n = 6
    int n = (int)a.size() - 1;
    vector<int> dp(n + 1, 1);
    vector<int> trace(n + 1, -1);

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j < i; j++) {
            if (a[j] < a[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                trace[i] = j;
            }
        }
    }

    int bestPos = 1;
    for (int i = 2; i <= n; i++) {
        if (dp[i] > dp[bestPos]) bestPos = i;
    }

    vector<long long> seq;
    for (int cur = bestPos; cur != -1; cur = trace[cur]) seq.push_back(a[cur]);
    reverse(seq.begin(), seq.end());

    cout << "LIS = " << dp[bestPos] << " | Day:";
    for (long long x : seq) cout << ' ' << x;
    cout << '\n'; // LIS = 3 | Day: 4 6 8
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Dãy con (`Subsequence`) vs Đoạn con liên tiếp (`Subarray`):** Dãy con giữ nguyên thứ tự trước-sau nhưng không bắt buộc liền kề nhau trong mảng gốc.
- **Dãy con tăng dài nhất (`Longest Increasing Subsequence — LIS`):** Bài toán DP 1 chiều cổ điển trong $O(N^2)$ với trạng thái ép kết thúc tại vị trí `i` và tìm max trên toàn mảng.

---

### 2.2. Vấn Đề Nhỏ 2: DP Hai Tiền Tố Trên Xâu (`LCS` & `Edit Distance`)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Với hai xâu `A` (độ dài `n`) và `B` (độ dài `m`), thay vì xét các ô bản đồ như `L2-07`, ta đặt hàng `i` (`0..n`) đại diện cho **tiền tố `i` ký tự đầu của `A`** (`A[0..i-1]`) và cột `j` (`0..m`) đại diện cho **tiền tố `j` ký tự đầu của `B`** (`B[0..j-1]`). Chú ý: trong C++14 xâu đánh số từ `0`, nên ký tự thứ `i` của bảng `dp` 1-based chính là **`A[i - 1]`**!

1. **Xâu con chung dài nhất (`LCS` — `AtCoder DP-F`):**
   - `dp[i][j]` = độ dài xâu con chung dài nhất (không cần liên tiếp) của `A[0..i-1]` và `B[0..j-1]`.
   - **Biên rỗng:** Khi một trong hai xâu rỗng (`i = 0` hoặc `j = 0`), không có ký tự chung nào $\implies$ `dp[i][0] = 0`, `dp[0][j] = 0`.
   - **Truy hồi:**
     - Nếu `A[i - 1] == B[j - 1]` (khớp nhau): ghép cặp ký tự này vào ngay sau LCS của phần trước $\implies$ **`dp[i][j] = dp[i - 1][j - 1] + 1`** (chỉ đi chéo! Tuyệt đối KHÔNG lấy `max(dp[i-1][j], dp[i][j-1]) + 1` vì sẽ đếm trùng 1 ký tự nhiều lần!).
     - Nếu `A[i - 1] != B[j - 1]`: bỏ bớt ký tự cuối của `A` hoặc của `B` $\implies$ `dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])`.
   - **Truy vết in xâu LCS:** Bắt đầu từ `(i, j) = (n, m)` khi `i > 0 && j > 0`: nếu `A[i - 1] == B[j - 1]`, đẩy `A[i - 1]` vào đáp án và lùi chéo `i--, j--`; ngược lại đi về ô lớn hơn trong `(i - 1, j)` và `(i, j - 1)`, rồi `reverse()`.
2. **Khoảng cách biến đổi xâu (`Edit Distance` — `CSES-1639`):**
   - `dp[i][j]` = số phép sửa ít nhất (Chèn `1` ký tự, Xóa `1` ký tự, hoặc Thay thế `1` ký tự) để biến `A[0..i-1]` thành `B[0..j-1]`.
   - **CẠM BẪY BIÊN SỐ `0` TỪ LCS:** Nhiều bạn quen tay từ LCS để cả hàng `0` và cột `0` bằng `0`! Nhưng muốn biến `i` ký tự đầu của `A` thành xâu rỗng `""` (`j = 0`) phải **Xóa hết `i` ký tự** $\implies$ **`dp[i][0] = i`**; muốn biến `""` (`i = 0`) thành `j` ký tự của `B` phải **Chèn đủ `j` ký tự** $\implies$ **`dp[0][j] = j`**!
   - **Truy hồi (3 nhánh `min`):**
     - Xóa `A[i - 1]`: `dp[i - 1][j] + 1`
     - Chèn `B[j - 1]`: `dp[i][j - 1] + 1`
     - Thay thế (hoặc giữ nguyên nếu trùng): `dp[i - 1][j - 1] + (A[i - 1] != B[j - 1])`

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string A = "LOVE", B = "MOVIE";
    int n = (int)A.size(), m = (int)B.size();

    // Edit Distance: BAT BUOC dat bien dp[i][0] = i va dp[0][j] = j
    vector<vector<int>> ed(n + 1, vector<int>(m + 1, 0));
    for (int i = 0; i <= n; i++) ed[i][0] = i;
    for (int j = 0; j <= m; j++) ed[0][j] = j;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            ed[i][j] = min({
                ed[i - 1][j] + 1,                          // Xoa A[i - 1]
                ed[i][j - 1] + 1,                          // Chen B[j - 1]
                ed[i - 1][j - 1] + (A[i - 1] != B[j - 1])  // Thay / Giu
            });
        }
    }
    cout << "Edit Distance(LOVE, MOVIE) = " << ed[n][m] << '\n'; // 2
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Xâu con chung dài nhất (`Longest Common Subsequence — LCS`):** Dãy ký tự cùng xuất hiện theo đúng thứ tự (không nhất thiết liền kề) trong cả hai xâu.
- **Khoảng cách biến đổi (`Edit Distance` / `Levenshtein Distance`):** Số thao tác thêm, xóa, sửa ký tự tối thiểu để biến xâu `A` thành xâu `B`.

---

### 2.3. Vấn Đề Nhỏ 3: DP Máy Trạng Thái (`Vacation`) & Bản Đồ 4 Nhóm DP Lớp 9

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
1. **DP Máy trạng thái theo ngày (`dp[i][state]` — `AtCoder DP-C Vacation`):**
   - Trong kỳ nghỉ $N$ ngày, mỗi ngày bạn được chọn $1$ trong $3$ việc: `0` (Bơi, được `a[i]` điểm), `1` (Núi, được `b[i]` điểm), `2` (Bài tập, được `c[i]` điểm), **cấm làm trùng một việc trong 2 ngày liên tiếp**.
   - **Vì sao Tham lam sập bẫy?** Nếu Ngày 1 có `[10, 40, 70]` và Ngày 2 có `[20, 50, 100]`, Tham lam hám lợi ngày 1 chọn việc `2` (`70`), sang Ngày 2 bị cấm việc `2` chỉ lấy được `50` $\implies$ `120`. Trong khi lùi lại chọn Ngày 1 việc `1` (`40`) rồi Ngày 2 việc `2` (`100`) đạt **`140`**!
   - **Cách giải:** Mở chiều trạng thái nhỏ `state ∈ {0, 1, 2}`: `dp[i][s]` là *tổng điểm tối đa sau `i` ngày, biết chắc ngày `i` làm việc `s`*.
     - Khởi tạo ngày `0`: `dp[0][0] = dp[0][1] = dp[0][2] = 0` (chạy gọn cho cả `n = 1`!).
     - Chuyển trạng thái ngày `i`: mỗi việc `s` chỉ được nối từ **hai việc khác `s`** của ngày `i - 1`:
       `dp[i][0] = val[i][0] + max(dp[i - 1][1], dp[i - 1][2])`, tương tự cho `1` và `2`.
     - Đáp án: `max({dp[n][0], dp[n][1], dp[n][2]})`. (Và nếu chỉ cần tổng điểm tối ưu, có thể cuộn mảng xuống 3 biến $O(1)$ RAM).

2. **Bản Đồ Tổng Hợp 4 Nhóm DP Cơ Bản Chuẩn HSG Lớp 9:**
   - **Nhóm 1 — DP 1D Tuyến Tính & Truy Vết (`L2-06`):** Nhảy bậc / đổi tiền nhỏ / xếp lịch 1 trục chỉ số. Trạng thái `dp[i]`. Cẩn thận `INF = 1e18` (tránh `LLONG_MAX + 1`) và `reverse()` khi truy vết.
   - **Nhóm 2 — DP Lưới 2D & Cuộn Mảng (`L2-07`):** Đường đi trên bảng $N \times M$, tránh vật cản `*`, tổng min/max. Trạng thái `dp[i][j]`. Lót biên `±INF` cho bài tối ưu và reset `cur` khi cuộn mảng.
   - **Nhóm 3 — Tổ Hợp Đếm & DP Cái Túi (`L2-08`):** Chọn đồ vật với sức chứa $W$ (0/1 duyệt ngược vs vô hạn duyệt xuôi), đếm Hoán vị (`sum` ngoài) vs Tổ hợp (`coin` ngoài), Tam giác Pascal `C[n][k]`, đổi chiều giá trị `dp[val]`.
   - **Nhóm 4 — Dãy Con `LIS`, Hai Tiền Tố Xâu & Máy Trạng Thái (`L2-09`):**
     - `LIS` $O(N^2)$: `dp[i]` kết thúc tại `i`, kết quả là `*max_element` toàn mảng.
     - `LCS` & `Edit Distance`: `dp[i][j]` trên hai tiền tố, nhớ phân biệt biên `0` (LCS) vs biên `dp[i][0] = i, dp[0][j] = j` (Edit Distance).
     - Máy trạng thái `dp[i][state]`: chọn theo ngày/bước có ràng buộc liền kề (`Vacation`, `Vacations`, `Basketball Exercise`).
   - **Chân trời mở rộng (Tùy chọn sau Tốt nghiệp Tầng 2):** Khi gặp các bài có $N \le 10^5$ vượt giới hạn $O(N^2)$, bạn có thể khám phá nhánh **Mở rộng (`Extension`)**: tối ưu `LIS` xuống $O(N \log N)$ bằng Tìm kiếm nhị phân (`L2-02`) hoặc **Chuyên đề tăng tốc DP về $O(N)$** bằng **Ngăn xếp đơn điệu (`MOD-02`)** và **Hàng đợi hai đầu đơn điệu / Hai con trỏ (`MOD-04`)**!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 3;
    vector<vector<long long>> val = {{10, 40, 70}, {20, 50, 80}, {30, 60, 90}};
    vector<vector<long long>> dp(n + 1, vector<long long>(3, 0));

    for (int i = 1; i <= n; i++) {
        dp[i][0] = val[i - 1][0] + max(dp[i - 1][1], dp[i - 1][2]);
        dp[i][1] = val[i - 1][1] + max(dp[i - 1][0], dp[i - 1][2]);
        dp[i][2] = val[i - 1][2] + max(dp[i - 1][0], dp[i - 1][1]);
    }

    cout << max({dp[n][0], dp[n][1], dp[n][2]}) << '\n'; // 210 (C -> B -> C)
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **DP Máy trạng thái (`State Machine DP`):** Mô hình DP bổ sung chiều nhỏ `state` biểu diễn chế độ / hành động vừa chọn ở bước trước để kiểm soát chặt các chuyển tiếp hợp lệ.
- **Bản đồ 4 nhóm DP cơ bản (`4-Group Core DP Map`):** Hệ thống phân loại nhanh mọi bài QHD Lớp 9 theo cấu trúc trạng thái và điều kiện biên.

---

## 3. Tổng Kết Độ Phức Tạp & 5 Bẫy Kinh Điển

| Chủ đề / Khuôn mẫu | Trạng thái `dp` | Thời gian | Bộ nhớ RAM | Lưu ý sống còn |
| :--- | :--- | :--- | :--- | :--- |
| `LIS` + Truy vết | `dp[i]` kết thúc tại `i` | $O(N^2)$ | $O(N)$ | Khởi tạo `1`; kết quả là `*max_element` toàn mảng |
| `LCS` + Truy vết | `dp[i][j]` trên `A[0..i-1], B[0..j-1]` | $O(N \cdot M)$ | $O(N \cdot M)$ | Khớp ký tự chỉ đi chéo `dp[i-1][j-1] + 1` |
| `Edit Distance` | `dp[i][j]` biến `A[0..i-1]` thành `B[0..j-1]` | $O(N \cdot M)$ | $O(N \cdot M)$ | Biên bắt buộc: `dp[i][0] = i`, `dp[0][j] = j` |
| Máy trạng thái (`Vacation`) | `dp[i][state]` tại bước `i` | $O(N \cdot K)$ | $O(N \cdot K)$ hoặc $O(K)$ | Tránh cho phép chuyển từ chính `state` nếu cấm lặp |

**5 bẫy cần kiểm tra trước khi Submit:**
1. **`LIS` in nhầm `dp[n]` thay vì `*max_element(dp.begin() + 1, dp.end())`**, hoặc quên khởi tạo `dp[i] = 1`, hoặc nhầm `<` (tăng ngặt) với `<=` (không giảm).
2. **`LCS` cộng `+ 1` vào `max(dp[i-1][j], dp[i][j-1])` khi `A[i-1] == B[j-1]`**, khiến một ký tự bị đếm lặp thành `2`, `3` lần.
3. **`Edit Distance` quên đặt `dp[i][0] = i` và `dp[0][j] = j`**, để mặc định `0` giống hệt `LCS` khiến các tiền tố rỗng không tốn phép xóa/chèn.
4. **Lệch chỉ số 0-based của `std::string` với bảng DP 1-based:** So sánh nhầm `A[i] == B[j]` thay vì `A[i - 1] == B[j - 1]`.
5. **DP Máy trạng thái quên loại `dp[i - 1][s]` khỏi nhánh chuyển của trạng thái `s`**, hoặc quên dùng `long long` khi tổng điểm / chiều cao lên tới $N \cdot 10^9$ (như `CF-1195C`).
