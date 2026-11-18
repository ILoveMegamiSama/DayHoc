# Bài Giảng `L2-02` — Tìm Kiếm Nhị Phân & Chặt Nhị Phân Đáp Án

- **Mã chuyên đề:** `L2-02` (Tầng 2 — Pha 2 STL Lớp 9)
- **Kiến thức tiền đề đã có (`MOD-Pre` + `MOD-CP0` + `MOD-01` + `L1-01` $\rightarrow$ `L1-07` + `L2-01`):**
  - Đã thành thạo **Bộ Khung Chuẩn CP**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`.
  - Đã vững phân tích độ phức tạp Big-O ($10^8$ phép tính/giây, `L1-04`), kiểu `long long`, `std::vector`, `pair`, `std::sort` (`L1-05`), `std::set` / `std::multiset` (`s.lower_bound(x)`, `s.upper_bound(x)`, `L1-06`) và Mảng cộng dồn 1D (`L2-01`).
- **Kiến thức mới mở khóa ở `L2-02`:**
  - Vòng lặp tìm kiếm nhị phân chuẩn `while (l <= r)` với bất biến biên `l = mid + 1`, `r = mid - 1` (không bao giờ lặp vô tận), công thức `mid = l + (r - l) / 2` chống tràn số, và khuôn mẫu biến `ans` tìm vị trí đầu tiên / cuối cùng.
  - Hai hàm chuẩn STL trên `vector` đã sắp xếp: `std::lower_bound` (đầu tiên $\ge x$) và `std::upper_bound` (đầu tiên $> x$), đổi iterator ra chỉ số (`- a.begin()`), bẫy đọc `*a.end()`, đếm tần suất / đoạn `[L, R]`, và nhắc lại bẫy $O(N)$ TLE khi gọi nhầm `std::lower_bound(s.begin(), ...)` trên `std::set`.
  - Chặt nhị phân trên tập đáp án (`Binary Search on Answer`): chuyển bài toán tối ưu thành hàm đơn điệu `bool check(mid)` dạng `FFFFFTTTTT` hoặc `TTTTTFFFFF`, đặt biên `long long [low, high]` chính xác và dừng sớm chống tràn số trong `check(mid)`.
  *(Lưu ý ranh giới kiến thức: Học sinh chưa học Hai con trỏ `MOD-03`, Ngăn xếp/Hàng đợi `L2-03`, Quay lui `L2-04`, Tham lam `L2-05` hay Quy hoạch động `L2-06+`.)*

---

## 1. Bức Tranh Toàn Cảnh: Tìm Nhanh Trong Dữ Liệu Khổng Lồ & Không Gian Đáp Án $10^{18}$

Giả sử bạn phụ trách hệ thống tra cứu và điều phối sản xuất với quy mô $N, Q \le 2 \cdot 10^5$, nhưng cách duyệt tuần tự gặp **3 bế tắc lớn**:

1. **Bế tắc 1 — Hỏi tìm kiếm $Q = 2 \cdot 10^5$ lần trên danh sách $N = 2 \cdot 10^5$ số:** Nếu mỗi truy vấn lại duyệt `for` từ đầu tới cuối mảng để tìm $x$ hoặc tìm vị trí đầu tiên của $x$, tổng số bước lên tới $O(Q \cdot N) = 4 \cdot 10^{10}$ phép so sánh $\rightarrow$ **TLE hàng trăm giây!**
2. **Bế tắc 2 — Viết tay lặp lại dễ lệch biên `<` / `<=` khi đếm phần tử trong đoạn `[L, R]`:** Khi mảng đã được `sort`, việc tự viết 2 vòng lặp nhị phân riêng để tìm đầu trái và đầu phải dễ sai dấu; trong khi STL đã có sẵn bộ công cụ $O(\log N)$ chỉ trong 1 dòng code — miễn là tránh được bẫy tràn biên `end()` và bẫy $O(N)$ trên `set`.
3. **Bế tắc 3 — Không có sẵn mảng để tìm, nhưng cần tìm đáp án tối ưu tới $10^{18}$:** Có $N = 2 \cdot 10^5$ máy in (mỗi máy mất $k_i \le 10^9$ giây/sản phẩm), hỏi thời gian **nhỏ nhất** để làm đủ $T = 10^9$ sản phẩm? Thử lần lượt từng giây $1, 2, 3, \dots, 10^{18}$ tốn $O(N \cdot T) \approx 2 \cdot 10^{23}$ bước $\rightarrow$ **bất khả thi!**

> **Chiến lược giải quyết (Problem Decomposition):** Tách bài toán lớn thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)**:
> - $V_1$: Tìm kiếm nhị phân chuẩn (`while l <= r`), chống tràn `mid`, bất biến biên & khuôn mẫu `ans`.
> - $V_2$: `lower_bound` & `upper_bound` trong STL, đếm đoạn `[L, R]`, bảo vệ `end()`/`begin()` & bẫy `std::set`.
> - $V_3$: Chặt nhị phân trên tập đáp án (`check(mid)` đơn điệu `FFFTTT` / `TTTFFF`, đặt biên `long long` & chống tràn).

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Tìm Kiếm Nhị Phân Chuẩn & Bất Biến Biên (`while l <= r`)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Lật từ điển giấy & Trò chơi đoán số $1 \dots 1000$:** Khi bạn mở từ điển để tra từ `"NhiPhan"` hay chơi trò đoán số bí mật từ $1$ đến $1000$ (mỗi lần đoán chỉ được trả lời *"Quá nhỏ"*, *"Quá lớn"* hoặc *"Đúng rồi"*):
  - Không ai lật từng trang từ trang $1, 2, 3, \dots$ ($1000$ bước). Bạn luôn **mở ngay chính giữa** ($500$)!
  - Nếu số bí mật nhỏ hơn $500$, toàn bộ nửa từ $500$ đến $1000$ chắc chắn sai $\rightarrow$ vứt bỏ ngay một nửa! Chỉ sau **tối đa $\log_2(1000) \approx 10$ lần** (với $2 \cdot 10^5$ phần tử chỉ tốn **$\approx 18$ lần**!), bạn chắc chắn khóa được đáp án!
- **Điều kiện tiên quyết:** Dãy số **bắt buộc phải được sắp xếp có thứ tự** (ví dụ tăng dần bằng `sort`). Nếu dãy lộn xộn mà ta bỏ đi một nửa, số cần tìm có thể đang trốn ở chính nửa vừa vứt!
- **3 quy tắc vàng để vòng lặp không bao giờ sai hay lặp vô tận:**
  1. **Dùng `while (l <= r)` kèm `l = mid + 1` và `r = mid - 1`:** Ở mọi bước, ta luôn kiểm tra xong phần tử `mid` rồi mới bỏ hẳn `mid` ra khỏi đoạn tìm kiếm `[l, r]`. Do độ dài đoạn `r - l + 1` **luôn giảm ngặt ít nhất $1$** (thực chất giảm gần một nửa), vòng lặp **chắc chắn dừng** — không bao giờ bị treo lặp vô tận ở trạng thái `l == r` hay `l + 1 == r`!
  2. **Tính `mid = l + (r - l) / 2`:** Nếu viết `(l + r) / 2` khi `l = 1.5 * 10^9` và `r = 2 * 10^9` bằng kiểu `int`, tổng `l + r = 3.5 * 10^9` tràn ngưỡng $2.14 \cdot 10^9$ thành số âm! Viết `l + (r - l) / 2` cho kết quả toán học giống hệt nhưng hiệu `r - l` không bao giờ vượt quá `r`.
  3. **Khuôn mẫu biến `ans` khi có phần tử trùng nhau:** Khi cần tìm vị trí **đầu tiên** (hoặc **cuối cùng**) thỏa mãn điều kiện, tuyệt đối không `return mid;` vội vàng. Hãy tạo biến `int ans = -1;`: mỗi khi thấy `mid` hợp lệ, ghi ngay `ans = mid;` rồi thu hẹp về phía tốt hơn (`r = mid - 1` nếu muốn vị trí nhỏ nhất; `l = mid + 1` nếu muốn vị trí lớn nhất)!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

int findFirstEqual(const vector<int>& a, int x) {
    int l = 0, r = (int)a.size() - 1;
    int ans = -1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) {
            ans = mid;   // Ghi nhận đáp án tốt nhất hiện có
            r = mid - 1; // Tiếp tục tìm bên trái xem có vị trí nhỏ hơn không
        } else if (a[mid] < x) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return ans;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Tìm kiếm nhị phân (`Binary Search`):** Thuật toán chia đôi khoảng tìm kiếm $[l, r]$ ở mỗi bước dựa trên tính đơn điệu của dữ liệu, giảm độ phức tạp từ $O(N)$ xuống $O(\log N)$.
- **Bất biến biên (`Loop Invariant`):** Cam kết rằng nếu đáp án tồn tại, nó vẫn nằm trong $[l, r]$ (hoặc đã được lưu vào `ans`), và sau mỗi vòng lặp khoảng $[l, r]$ luôn thu hẹp thực sự nhờ cập nhật `mid + 1` / `mid - 1`.

---

### 2.2. Vấn Đề Nhỏ 2: `lower_bound` & `upper_bound` Trong STL

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Thủ thư xếp sách theo chiều cao tăng dần:** Trên kệ đang có các cuốn sách cao `{10, 20, 20, 20, 35, 50}` cm (chỉ số `0..5`):
  - **`lower_bound(20)`** trả về **vị trí đầu tiên có chiều cao $\ge 20$** $\rightarrow$ chỉ số `1` (cuốn `20` đầu tiên). Đó là vị trí **trái nhất** có thể chèn thêm cuốn cao `20` mà kệ vẫn tăng dần!
  - **`upper_bound(20)`** trả về **vị trí đầu tiên có chiều cao $> 20$** $\rightarrow$ chỉ số `4` (cuốn `35`). Đó là vị trí **phải nhất** ngay sau cả cụm các cuốn `20`!
- **3 thao tác đắc lực trong $O(\log N)$:**
  1. **Đổi iterator thành chỉ số `0-based`:** `int idx = it - a.begin();`.
  2. **Kiểm tra an toàn trước khi đọc `*it` hay lùi `--it`:** Nếu mọi phần tử đều nhỏ hơn `x`, hàm trả về `a.end()` (địa chỉ ngay **sau** phần tử cuối cùng!). Đọc `*it` khi `it == a.end()` là lỗi truy cập ngoài mảng! Ngược lại, muốn tìm phần tử **lớn nhất $\le x$**, lấy `auto it = upper_bound(a.begin(), a.end(), x);`: nếu `it != a.begin()` thì lùi `--it;` sẽ trỏ đúng vào phần tử lớn nhất $\le x$!
  3. **Đếm số lần xuất hiện của `x` hoặc số phần tử trong `[L, R]`:**
     - Số phần tử bằng `x` = `upper_bound(a.begin(), a.end(), x) - lower_bound(a.begin(), a.end(), x)`.
     - Số phần tử thuộc đoạn `[L, R]` = `upper_bound(a.begin(), a.end(), R) - lower_bound(a.begin(), a.end(), L)`.
- **Nhắc lại bẫy kinh điển từ `L1-06` (`std::set` / `std::multiset`):** Trên `vector`, các ô nhớ xếp liền kề nên `lower_bound(a.begin(), a.end(), x)` nhảy thẳng trong $O(\log N)$. Nhưng trên `set` / `multiset`, các nút nằm rải rác: nếu gọi nhầm hàm toàn cục `std::lower_bound(s.begin(), s.end(), x)`, hàm đó phải đi bộ từng bước tốn **$O(N)$ (TLE!)**. Trên `set` / `multiset` / `map` **luôn gọi phương thức nội bộ `s.lower_bound(x)` / `s.upper_bound(x)`** để chạy $O(\log N)$!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<int> a = {10, 20, 20, 20, 35, 50};
    auto it1 = lower_bound(a.begin(), a.end(), 20); // chỉ số 1 (>= 20)
    auto it2 = upper_bound(a.begin(), a.end(), 20); // chỉ số 4 (> 20)

    cout << "Vi tri dau >= 20: " << (it1 - a.begin()) << '\n';
    cout << "So phan tu == 20: " << (it2 - it1) << '\n';
    cout << "So phan tu trong [15, 35]: "
         << (upper_bound(a.begin(), a.end(), 35) - lower_bound(a.begin(), a.end(), 15)) << '\n';

    if (it2 != a.begin()) {
        --it2; // Phần tử lớn nhất <= 20
        cout << "Phan tu lon nhat <= 20: " << *it2 << '\n';
    }
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **`std::lower_bound(first, last, val)`:** Tìm iterator đầu tiên trỏ tới phần tử $\ge \text{val}$ trong khoảng đã sắp xếp (`O(log N)` trên `vector`).
- **`std::upper_bound(first, last, val)`:** Tìm iterator đầu tiên trỏ tới phần tử $> \text{val}$ trong khoảng đã sắp xếp (`O(log N)` trên `vector`).
- **Iterator ngẫu nhiên (`Random Access Iterator`):** Cho phép nhảy thẳng giữa mảng như `a.begin() + mid` và trừ hai iterator (`it2 - it1`) để ra khoảng cách phần tử trong $O(1)$.

---

### 2.3. Vấn Đề Nhỏ 3: Chặt Nhị Phân Trên Tập Đáp Án (Binary Search on Answer)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Không cần mảng có sẵn — chỉ cần câu trả lời có tính đơn điệu `Đúng / Sai`!**
  - Giả sử có $3$ máy in với tốc độ $\{3, 2, 5\}$ giây/sản phẩm, cần in ít nhất $7$ sản phẩm. Thời gian ngắn nhất là bao nhiêu?
  - Nếu thử hỏi ngược lại: *"Nếu cho trước đúng `mid` giây, các máy có in đủ $7$ sản phẩm không?"* (`bool check(mid)`):
    - Với `mid = 1..7`: tổng sản phẩm $< 7$ $\rightarrow$ **`False` (Không đủ)**.
    - Với `mid = 8, 9, 10, ...`: tổng sản phẩm $\ge 7$ $\rightarrow$ **`True` (Đủ)**.
  - Dãy kết quả `check(1), check(2), ...` tự động xếp thành hai nửa ngăn nắp: **`F, F, F, ..., F, T, T, T, ...`**! Việc tìm giá trị $T$ nhỏ nhất trở thành bài toán chặt nhị phân tìm chữ **`T` đầu tiên** trên khoảng đáp án `[low, high]`!
- **Hai dáng đơn điệu kinh điển:**
  1. **Dáng `FFFFFTTTTT` (Tìm giá trị NHỎ NHẤT thỏa mãn):** Khi `check(mid) == true`, ghi nhận `ans = mid;` rồi thu nhỏ sang trái `high = mid - 1;` (ví dụ: thời gian tối thiểu, tải trọng xe tối thiểu).
  2. **Dáng `TTTTTFFFFF` (Tìm giá trị LỚN NHẤT thỏa mãn):** Khi `check(mid) == true`, ghi nhận `ans = mid;` rồi mở rộng sang phải `low = mid + 1;` (ví dụ: độ dài thanh gỗ cắt được lớn nhất, số nguyên lớn nhất mua được, trung vị lớn nhất).
- **2 bẫy chết người của Chặt nhị phân đáp án:**
  1. **Đặt `high` quá nhỏ (WA!):** Với $n = 1, k_1 = 10^9, t = 10^9$, đáp án lên tới **$10^{18}$**! Nếu đặt `high = 1e9` hay dùng kiểu `int`, ta cắt cụt đáp án ngay từ đầu. Chặt nhị phân trên `[1, 10^18]` chỉ mất $\log_2(10^{18}) \approx 60$ bước — siêu nhanh!
  2. **Tràn số `long long` ngay bên trong `check(mid)` (WA!):** Nếu `mid = 5 * 10^17` và có $2 \cdot 10^5$ máy chạy tốc độ `k[i] = 1`, vòng lặp cộng `made += mid / k[i]` đạt $10^{23} > 9.22 \cdot 10^{18}$ làm tràn `long long` thành số âm! **Bắt buộc kiểm tra `if (made >= target) return true;` ngay trong vòng lặp để dừng sớm!**

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
bool canMake(long long timeLimit, const vector<long long>& k, long long target) {
    long long made = 0;
    for (long long ki : k) {
        made += timeLimit / ki;
        if (made >= target) return true; // Dừng sớm tránh tràn long long!
    }
    return false;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Chặt nhị phân đáp án (`Binary Search on Answer`):** Tìm trực tiếp đáp án tối ưu trong một khoảng giá trị $[low, high]$ bằng cách kiểm tra tính khả thi qua hàm đơn điệu `check(mid)`.
- **Hàm kiểm tra đơn điệu (`Monotonic Predicate`):** Hàm `bool check(mid)` chỉ đổi chiều **đúng 1 lần** (`F...F -> T...T` hoặc `T...T -> F...F`) trên toàn bộ khoảng tìm kiếm.

---

## 3. Bảng Phân Tích Độ Phức Tạp & Các Bẫy Thường Gặp

| Kỹ thuật / Thành phần | Thời gian (Time) | Bộ nhớ (Space) | Khi nào sử dụng? |
| :--- | :---: | :---: | :--- |
| Sắp xếp + Tìm kiếm nhị phân | $O((N + Q) \log N)$ | $O(N)$ | Dữ liệu tĩnh cần nhiều truy vấn tìm giá trị / vị trí |
| `lower_bound` / `upper_bound` trên `vector` | $O(\log N)$ / truy vấn | $O(1)$ phụ | Mảng đã sort cần tìm cận $\ge x$, $> x$, đếm đoạn `[L, R]` |
| `s.lower_bound(x)` trên `std::set` | $O(\log N)$ / truy vấn | $O(N)$ cây | Dữ liệu thay đổi động (thêm/xóa xen kẽ truy vấn) |
| Chặt nhị phân trên tập đáp án | $O(N \log(\text{Range}))$ | $O(N)$ | Bài toán tìm Min/Max có tính đơn điệu `FFFTTT` / `TTTFFF` |

### Danh Sách Bẫy Kinh Điển Cần Tránh
1. **Tìm nhị phân trên mảng chưa `sort`:** Phải kiểm tra mảng đã có thứ tự (hoặc tự gọi `sort`) trước khi dùng `while (l <= r)`, `lower_bound`, `upper_bound`.
2. **Dùng `while (l < r)` hoặc viết `r = mid` cùng `while (l <= r)`:** Rất dễ bỏ sót phần tử cuối khi `l == r` (sai với `while (l < r)`) hoặc lặp vô tận (`r = mid` khi `l == r`). Luôn dùng khuôn mẫu an toàn `while (l <= r)` + biến `ans` + `l = mid + 1` / `r = mid - 1`.
3. **Tràn số khi tính `(l + r) / 2`:** Luôn viết `mid = l + (r - l) / 2`.
4. **Đọc `*it` khi `it == a.end()` hoặc `--it` khi `it == a.begin()`:** Luôn kiểm tra biên iterator trước khi giải tham chiếu hoặc dịch chuyển.
5. **Gọi `std::lower_bound(s.begin(), s.end(), x)` trên `std::set`:** Chậm $O(N)$ dẫn tới TLE! Phải gọi `s.lower_bound(x)` ($O(\log N)$).
6. **Cận `high` quá nhỏ hoặc tràn `long long` trong `check(mid)`:** Luôn tính biên `high` theo worst-case của đề bài (có thể tới $10^{18}$) và dừng sớm ngay khi biến đếm đạt `target`.
