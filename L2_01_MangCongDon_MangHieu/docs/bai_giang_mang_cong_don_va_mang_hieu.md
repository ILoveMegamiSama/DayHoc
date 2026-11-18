# Bài Giảng `L2-01` — Mảng Cộng Dồn (1D/2D) & Mảng Hiệu

- **Mã chuyên đề:** `L2-01` (Tầng 2 — Pha 2 STL Lớp 9)
- **Kiến thức tiền đề đã có (`MOD-Pre` + `MOD-CP0` + `MOD-01` + `L1-01` $\rightarrow$ `L1-07`):**
  - Đã thành thạo **Bộ Khung Chuẩn CP**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`.
  - Đã vững phân tích độ phức tạp Big-O ($10^8$ phép tính/giây, `L1-04`), kiểu `long long` chống tràn số, `std::vector`, `pair`, `std::sort` (`L1-05`) và `std::map` (`L1-06`).
- **Kiến thức mới mở khóa ở `L2-01`:**
  - Mảng cộng dồn 1D (`1D Prefix Sum`): trả lời tổng đoạn $[L, R]$ trong $O(1)$ với chỉ số 1-based (`S[0] = 0`).
  - Mảng cộng dồn 2D (`2D Prefix Sum`): công thức Bao hàm - Loại trừ để dựng bảng $O(N \cdot M)$ và truy vấn hình chữ nhật $(r_1, c_1) \dots (r_2, c_2)$ trong $O(1)$.
  - Mảng hiệu 1D (`1D Difference Array`): đánh dấu `+v` ở `L` và `-v` ở `R + 1` trên mảng kích thước `n + 2` để cộng hàng loạt đoạn trong $O(1)$ mỗi lượt và khôi phục mảng cuối trong $O(N)$.
  *(Lưu ý ranh giới kiến thức: Học sinh chưa học Tìm kiếm nhị phân `L2-02`, Hai con trỏ `MOD-03`, Ngăn xếp/Hàng đợi `L2-03`, Quay lui `L2-04`, Tham lam `L2-05` hay Quy hoạch động `L2-06+`.)*

---

## 1. Bức Tranh Toàn Cảnh: Hệ Thống Thống Kê Chuỗi Cửa Hàng Quy Mô Lớn

Giả sử bạn quản lý dữ liệu doanh thu và lưu lượng khách cho một hệ thống quy mô $N, Q \le 2 \cdot 10^5$ với các yêu cầu sau:

1. **Bế tắc 1 — Hỏi tổng đoạn $[L, R]$ tới $2 \cdot 10^5$ lần:** Dãy có $2 \cdot 10^5$ ngày, mỗi ngày có giá trị tới $10^9$. Nếu mỗi câu hỏi lại chạy vòng `for` từ $L$ đến $R$, tổng số bước là $O(Q \cdot N) \approx 4 \cdot 10^{10}$ phép cộng $\rightarrow$ **TLE hàng trăm giây!** Ngoài ra, nếu lưu tổng bằng `int`, tổng đoạn dễ đạt $2 \cdot 10^{14}$ vượt ngưỡng $2.14 \cdot 10^9$ $\rightarrow$ **tràn số (`WA`)!**
2. **Bế tắc 2 — Hỏi tổng hình chữ nhật con trên bản đồ $1000 \times 1000$:** Có $2 \cdot 10^5$ lần hỏi tổng trong hình chữ nhật $(r_1, c_1) \dots (r_2, c_2)$. Quét 2 vòng `for` mỗi lần hỏi tốn $O(Q \cdot N \cdot M) \approx 2 \cdot 10^{11}$ phép tính $\rightarrow$ **TLE nặng!**
3. **Bế tắc 3 — Tăng hàng loạt đoạn $[L, R]$ thêm $v$ rồi mới xuất mảng cuối:** Có $2 \cdot 10^5$ lượt phát thưởng cộng thêm $v$ cho mọi vị trí từ $L$ tới $R$. Dùng vòng `for` cộng trực tiếp từng ô tốn $O(Q \cdot N)$ (**TLE**!), còn Mảng cộng dồn tĩnh thì bó tay khi dãy đang bị thay đổi liên tục!

> **Chiến lược giải quyết (Problem Decomposition):** Tách bài toán lớn thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)**:
> - $V_1$: Mảng cộng dồn 1D (`S[i]`, lính canh `S[0] = 0`, truy vấn $O(1)$ & bẫy tràn `int`).
> - $V_2$: Mảng cộng dồn 2D & Công thức Bao hàm - Loại trừ trên bảng.
> - $V_3$: Mảng hiệu 1D (`diff` cỡ `n + 2`, ghi 2 mốc đầu-cuối trong $O(1)$ & khôi phục một lượt $O(N)$).

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Mảng Cộng Dồn 1D (1D Prefix Sum)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Công-tơ-mét quãng đường / Sổ tổng tích lũy theo ngày:** Một chiếc xe ghi lại tổng số km đã đi tính từ điểm xuất phát sau mỗi ngày: `S[1]` là tổng ngày 1, `S[2]` là tổng ngày 1 + ngày 2, ..., `S[i]` là tổng từ ngày $1$ đến hết ngày $i$. Để biết xe đi được bao nhiêu km từ đầu ngày $L$ đến hết ngày $R$, ta không cần cộng lại từng ngày từ $L$ tới $R$: chỉ lấy **đồng hồ cuối ngày $R$ trừ đi đồng hồ cuối ngày $L - 1$**: `S[R] - S[L - 1]`.
- **Mẹo chỉ số 1-based (`S[0] = 0`):** Nếu đặt mốc xuất phát ngày $0$ là `S[0] = 0`, thì ngay cả khi hỏi từ đầu dãy ($L = 1$), công thức `S[R] - S[0] = S[R]` vẫn đúng tuyệt đối mà **không cần viết nhánh `if (l == 1)`**!
- **Bẫy tràn `int`:** Dù mỗi `a[i]` vừa trong `int` ($\le 10^9$), tổng $N = 2 \cdot 10^5$ phần tử có thể tới $2 \cdot 10^{14}$. Luôn dùng `vector<long long> pref(n + 1, 0)`.

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, q;
    cin >> n >> q;
    vector<long long> a(n + 1), pref(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        pref[i] = pref[i - 1] + a[i];
    }

    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << pref[r] - pref[l - 1] << '\n';
    }
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Mảng cộng dồn (`Prefix Sum / Cumulative Sum`):** Mảng `pref[i]` lưu tổng của tiền tố `a[1..i]` (với `pref[0] = 0`), dựng trong $O(N)$ để trả lời tổng đoạn $[L, R]$ trong $O(1)$.
- **Đánh chỉ số từ 1 (`1-based Indexing`):** Chừa ô `0` làm lính canh (`pref[0] = 0`) giúp công thức `pref[r] - pref[l - 1]` thống nhất mọi trường hợp, kể cả $L = 1$.

---

### 2.2. Vấn Đề Nhỏ 2: Mảng Cộng Dồn 2D & Bao Hàm - Loại Trừ

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Hai tấm thảm chồng góc khi dựng bảng `P[i][j]`:** Định nghĩa `P[i][j]` là tổng các ô trong hình chữ nhật góc $(1, 1) \dots (i, j)$. Để tính `P[i][j]`, ta lấy giá trị tại ô `(i, j)` cộng tấm thảm phía trên `P[i - 1][j]` và tấm thảm bên trái `P[i][j - 1]`. Vì vùng góc trên-trái `(1, 1)..(i - 1, j - 1)` nằm dưới cả hai tấm thảm nên bị cộng **2 lần**, ta phải **trừ bớt 1 lần `P[i - 1][j - 1]`**:
  $$P[i][j] = a[i][j] + P[i - 1][j] + P[i][j - 1] - P[i - 1][j - 1]$$
- **Cắt mảnh giấy hình chữ nhật $(r_1, c_1) \dots (r_2, c_2)$ khi truy vấn:** Lấy hình lớn `P[r2][c2]`, cắt bỏ phần phía trên `P[r1 - 1][c2]` và cắt bỏ phần bên trái `P[r2][c1 - 1]`. Lúc này, góc giao trên-trái `(1, 1)..(r1 - 1, c1 - 1)` nằm ở cả hai mảnh vừa cắt nên đã bị trừ tới **2 lần**! Phải **cộng trả lại `+ P[r1 - 1][c1 - 1]`**:
  $$\text{Sum} = P[r_2][c_2] - P[r_1 - 1][c_2] - P[r_2][c_1 - 1] + P[r_1 - 1][c_1 - 1]$$
- **Mẹo không bao giờ quên dấu:** Lúc **dựng bảng** thì `+ trên + trái - góc chéo`; lúc **truy vấn** thì `tổng - trên - trái + góc chéo`! Dùng bảng `vector<vector<long long>> pref(n + 1, vector<long long>(m + 1, 0))` để hàng `0` và cột `0` tự động bằng `0`.

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
vector<vector<long long>> pref(n + 1, vector<long long>(m + 1, 0));
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        pref[i][j] = a[i][j] + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
    }
}

long long ans = pref[r2][c2] - pref[r1 - 1][c2] - pref[r2][c1 - 1] + pref[r1 - 1][c1 - 1];
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Mảng cộng dồn 2D (`2D Prefix Sum`):** Lưu tổng mọi hình chữ nhật bắt đầu từ gốc $(1, 1)$ trong $O(N \cdot M)$ thời gian và bộ nhớ.
- **Nguyên lý Bao hàm - Loại trừ (`Inclusion-Exclusion Principle`):** Bù lại phần giao bị đếm đúp (dấu `-` khi dựng bảng) hoặc bị trừ đúp (dấu `+` khi cắt hình chữ nhật truy vấn).

---

### 2.3. Vấn Đề Nhỏ 3: Mảng Hiệu 1D (1D Difference Array)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Sổ ghi chép xe buýt qua các trạm $1 \dots N$:** Một nhóm $+v$ hành khách lên xe ở trạm $L$ và ngồi suốt tới hết trạm $R$ (tức đến ngay **sau trạm $R$ — trạm $R + 1$** họ mới xuống xe). Thay vì ghi $+v$ vào từng dòng từ $L$ tới $R$, bác tài chỉ ghi đúng **2 biến động**:
  1. Tại trạm $L$: `diff[L] += v` (cộng thêm $v$ kể từ $L$ trở đi).
  2. Tại trạm $R + 1$: `diff[R + 1] -= v` (triệt tiêu $+v$ ngay sau khi rời trạm $R$).
- **Quy tắc sống còn `diff(n + 2, 0)`:** Khi một lệnh cộng chạm tới cuối mảng ($R = N$), vị trí `R + 1` chính là **`N + 1`**! Nếu chỉ cấp phát `diff(n + 1, 0)` (chỉ số `0..n`), lệnh `diff[n + 1] -= v` sẽ **tràn ra ngoài vùng nhớ của vector (`Out-of-Bounds`)**! Luôn cấp phát **`vector<long long> diff(n + 2, 0)`**.
- **Khôi phục mảng cuối cùng trong $O(N)$:** Sau khi ghi xong toàn bộ $Q$ biến động, chạy đúng 1 vòng `for` từ `1` tới `n` cộng dồn `curAdd += diff[i]` rồi cộng vào giá trị gốc `a[i] += curAdd`. Tổng thời gian chỉ $O(N + Q)$!
- **Khi nào dùng Prefix Sum vs Difference Array?**
  - **Mảng cộng dồn:** Dãy **tĩnh** (không cập nhật), nhiều truy vấn **hỏi tổng đoạn**.
  - **Mảng hiệu:** Nhiều lượt **cập nhật cộng đoạn**, sau khi **xong hết các lượt cập nhật** mới đọc lại dãy (hoặc dựng tiếp Mảng cộng dồn để trả lời truy vấn tĩnh ở bước sau).

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
vector<long long> diff(n + 2, 0);
for (int k = 0; k < q; k++) {
    int l, r;
    long long v;
    cin >> l >> r >> v;
    diff[l] += v;
    diff[r + 1] -= v;
}

long long curAdd = 0;
for (int i = 1; i <= n; i++) {
    curAdd += diff[i];
    a[i] += curAdd;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Mảng hiệu (`Difference Array`):** Mảng ghi nhận hiệu số thay đổi giữa hai phần tử kề nhau (`diff[i] = delta[i] - delta[i - 1]`). Thực hiện phép cộng dồn lên Mảng hiệu sẽ khôi phục toàn bộ lượng tăng/giảm thực tế tại mọi vị trí trong $O(N)$.

---

## 3. Bảng Tổng Hợp Độ Phức Tạp

| Kỹ thuật | Tiền xử lý | Mỗi truy vấn / cập nhật | Đọc mảng cuối | Tổng độ phức tạp | Bộ nhớ phụ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Duyệt trâu 1D | $O(1)$ | $O(N)$ | — | $O(Q \cdot N)$ | $O(1)$ |
| **Mảng cộng dồn 1D** | $O(N)$ | **$O(1)$** (hỏi tổng đoạn) | — | **$O(N + Q)$** | $O(N)$ |
| Duyệt trâu 2D | $O(1)$ | $O(N \cdot M)$ | — | $O(Q \cdot N \cdot M)$ | $O(1)$ |
| **Mảng cộng dồn 2D** | $O(N \cdot M)$ | **$O(1)$** (hỏi hình chữ nhật) | — | **$O(N \cdot M + Q)$** | $O(N \cdot M)$ |
| **Mảng hiệu 1D** | $O(1)$ | **$O(1)$** (cộng cả đoạn) | $O(N)$ | **$O(N + Q)$** | $O(N)$ |

---

## 4. Danh Sách Kiểm Tra Tránh Bẫy Kinh Điển (Pitfalls Checklist)

1. **Tràn `int` khi cộng dồn:** Khi $N \le 2 \cdot 10^5$ và $|a_i| \le 10^9$, tổng đạt $2 \cdot 10^{14}$. Bắt buộc dùng `long long` cho mảng cộng dồn và mảng hiệu.
2. **Lệch biên trái `pref[r] - pref[l]`:** Quên `- 1` làm mất luôn giá trị `a[l]`. Luôn dùng 1-based (`pref[0] = 0`) và công thức `pref[r] - pref[l - 1]`.
3. **Ngược dấu góc chéo trong Bao hàm - Loại trừ 2D:** Dựng bảng phải **trừ** `pref[i - 1][j - 1]`; truy vấn phải **cộng** `+ pref[r1 - 1][c1 - 1]`.
4. **Cấp phát `diff` cỡ `n + 1` thay vì `n + 2`:** Khi $R = N$, `diff[r + 1]` truy cập `diff[n + 1]` gây **Out-of-Bounds**. Luôn khai báo `vector<long long> diff(n + 2, 0)`.
5. **Ghi nhầm `diff[r] -= v` thay vì `diff[r + 1] -= v`:** Làm phần tử tại đúng vị trí `r` không được cộng thêm `v`.
6. **Quên cộng dồn khôi phục hoặc quên cộng mảng gốc `a[i]`:** In thẳng `diff[i]` chỉ in ra hiệu số thay đổi chứ không phải giá trị phần tử sau cập nhật!
