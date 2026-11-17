# Bài Giảng `L1-01` — Điều Khiển Luồng, Vòng Lặp & Số Nguyên Lớn

- **Mã chuyên đề:** `L1-01` (Tầng 1 — Pha 1: Nền tảng C++ Lớp 9)
- **Kiến thức tiền đề đã có (`MOD-Pre` + `MOD-CP0` + `MOD-00`):**
  - Đã quen hình ảnh **Anh Phụ Bếp Thật Thà**, cửa chính `main()`, tiếng chuông `;`, hộp biến RAM (`int`, `double`, `string`, `char`, `bool`), phép chia nguyên `5 / 2 = 2`, loa/khe `cin`/`cout`.
  - Đã thuộc lòng **Bộ Khung Chuẩn CP**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`.
  - Đã hiểu từ `MOD-00`: RAM là chiếc bàn làm việc tốc độ cao với dung lượng ô nhớ hữu hạn cho từng hộp biến.
- **Ranh giới Pha 1 Lớp 9:** Bài giảng này chỉ dùng các biến đơn lẻ bên trong `main()` — **chưa dùng** mảng, hàm tự định nghĩa bên ngoài `main()`, hay thư viện cấu trúc dữ liệu nâng cao.

---

## 1. Bức Tranh Toàn Cảnh: Vấn Đề Lớn Khi Tiệm Bánh Bước Vào Ngày Hội Toàn Thành Phố

Sau khi trang bị xong Bộ Khung Chuẩn CP ở `MOD-CP0`, **Anh Thật Thà** nhận nhiệm vụ điều hành quầy phát quà và chấm điểm trong **Ngày Hội Học Sinh Toàn Thành Phố** với hàng trăm nghìn lượt tham gia ($N \le 10^5$, nhiều đợt thi $T$ liên tiếp, quy mô phần thưởng lên tới $10^9 \times 10^9$).

Nếu chỉ dùng những lệnh chạy thẳng từ trên xuống dưới như hai bài đầu, chương trình lập tức **bế tắc ở 3 điểm**:

1. **Bế tắc 1 — Không biết rẽ nhánh ra quyết định:**
   Mỗi thí sinh có điểm số, độ tuổi, hoặc năm sinh khác nhau. Nếu Anh Thật Thà chỉ biết chạy một đường thẳng từ trên xuống dưới, anh ấy không thể phân loại được *"Giỏi / Khá / Trung bình"* hay kiểm tra điều kiện phức tạp như *"Năm nhuận"*.
2. **Bế tắc 2 — Không thể lặp lại hàng trăm nghìn lượt:**
   Đề bài yêu cầu đọc và cộng điểm cho $100.000$ lượt khách hoặc lặp qua $T$ bộ test. Không ai có thể gõ tay $100.000$ dòng `cin >> x;` giống hệt nhau, và cũng có những việc chưa biết trước lặp bao nhiêu lần (như tách từng chữ số của một số đến khi hết).
3. **Bế tắc 3 — Bẫy tràn số `int` ($10^9 \times 10^9$) và số dư âm:**
   Khi tính diện tích sân khấu hình chữ nhật kích thước $10^9 \times 10^9$ bằng chiếc hộp `int` quen thuộc, kết quả bất ngờ **biến thành số âm quái dị**! Và khi đếm kết quả lớn phải chia lấy dư `%` cho $M = 10^9 + 7$ (hoặc lấy dư số âm trong C++), chỉ một sơ suất nhỏ cũng gây Wrong Answer toàn bộ bài thi.

> **Chiến lược giải quyết:** Tách bài toán lớn thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)** và giải quyết dứt điểm từng mảnh ghép!

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Ngã Tư Quyết Định (`if / else if / else`) & Toán Tử Logic (`&&`, `||`, `!`)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Ở cổng kiểm soát vé ngày hội, Anh Thật Thà cầm một **bảng nội quy bậc thang**:
- Nếu điểm $\ge 8.0$: cấp thẻ **Giỏi**.
- Ngược lại, nếu điểm $\ge 6.5$: cấp thẻ **Khá**.
- Ngược lại, nếu điểm $\ge 5.0$: cấp thẻ **Trung bình**.
- Tất cả trường hợp còn lại: cấp thẻ **Chưa đạt**.

Hãy chú ý hai tai nạn rất hay gặp ở đời thực:
1. **Đặt biển chỉ dẫn ngược thứ tự:** Nếu đặt tấm biển *"Điểm $\ge 5.0$ vào hàng Trung bình"* lên đầu tiên, thì bạn đạt $9.5$ điểm cũng thấy $9.5 \ge 5.0$ đúng rồi và rẽ ngay vào hàng Trung bình, không bao giờ xuống tới hàng Giỏi! Vì vậy **luôn xếp điều kiện chặt nhất (cao nhất) lên trước**.
2. **Nhầm giữa "dán giá trị mới" (`=`) và "hỏi kiểm tra xem có bằng nhau không" (`==`), hoặc viết gộp hai điều kiện:** Một người thật thà như Anh Thật Thà nếu nghe câu *"Gán điểm bằng 10 xem thử"* (`diem = 10`), anh ấy sẽ thật thà sửa luôn tờ phiếu thành 10 điểm thay vì kiểm tra!

#### Bước 2: Ánh xạ vào lập trình C++
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    double diem;
    int nam;
    cin >> diem >> nam;

    // 1. Cấu trúc if / else if / else: đi từ điều kiện chặt xuống lỏng
    if (diem >= 8.0) {
        cout << "Gioi" << '\n';
    } else if (diem >= 6.5) {
        cout << "Kha" << '\n';
    } else if (diem >= 5.0) {
        cout << "Trung binh" << '\n';
    } else {
        cout << "Chua dat" << '\n';
    }

    // 2. Toán tử so sánh & logic (&&, ||, !) qua bài kiểm tra Năm Nhuận
    bool laNamNhuan = (nam % 400 == 0) || (nam % 4 == 0 && nam % 100 != 0);
    if (laNamNhuan) {
        cout << "Nam nhuan" << '\n';
    } else {
        cout << "Khong nhuan" << '\n';
    }

    return 0;
}
```

**Bảng toán tử so sánh & logic cần thuộc lòng:**

| Nhóm | Toán tử | Ý nghĩa thực tế | Bẫy Lớp 9 hay mắc |
| :--- | :--- | :--- | :--- |
| So sánh | `==`, `!=` | So sánh bằng nhau / khác nhau | Viết nhầm `if (x = 5)` (gán `5` vào `x`, luôn đúng vì $5 \neq 0$) thay cho `if (x == 5)`! |
| So sánh | `<`, `<=`, `>`, `>=` | Nhỏ hơn, nhỏ hơn hoặc bằng, lớn hơn, lớn hơn hoặc bằng | Viết gộp kiểu Toán `5 <= x <= 10`: trong C++ `5 <= x` ra `0` hoặc `1`, rồi so với `10` luôn đúng! |
| Logic | `&&` (AND — VÀ) | Cả hai vế cùng đúng mới đúng | Phải viết tách rõ ràng: `if (5 <= x && x <= 10)`. |
| Logic | `||` (OR — HOẶC) | Chỉ cần một trong hai vế đúng là đúng | Dùng ngoặc `(...)` khi kết hợp lẫn `&&` và `||` cho khỏi nhầm thứ tự ưu tiên. |
| Logic | `!` (NOT — PHỦ ĐỊNH) | Đảo ngược Đúng $\leftrightarrow$ Sai | `!(x > 0)` tương đương `x <= 0`. |

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Câu lệnh điều kiện / Rẽ nhánh (`Conditional Statement / Branching`):** Cấu trúc `if / else if / else` giúp chương trình chọn **đúng 1 nhánh** để đi dựa trên biểu thức đúng/sai (`bool`).
- **Toán tử quan hệ (`Relational Operators`):** `==`, `!=`, `<`, `<=`, `>`, `>=` — luôn trả về `true` (`1`) hoặc `false` (`0`).
- **Toán tử logic (`Logical Operators`):** `&&` (và), `||` (hoặc), `!` (phủ định) — dùng để ghép nhiều điều kiện nhỏ thành điều kiện lớn.

---

### 2.2. Vấn Đề Nhỏ 2: Vòng Lặp `for`, `while`, `while (t--)` & Điều Khiển `break`, `continue`

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Để đếm tổng điểm của $100.000$ bạn học sinh lần lượt bước qua cổng, bạn không thể phát $100.000$ chiếc hộp biến đặt tên `a1, a2, ..., a100000`, càng không thể viết $100.000$ dòng `cin`. Bạn chỉ cần **1 chiếc rổ tích lũy (`tong = 0`)** và dặn Anh Thật Thà theo 2 kiểu nhịp lặp:
1. **Biết trước đúng $N$ lượt (`for`):** *"Đứng ở cổng đếm từ bạn số `1` tới bạn số `n`; mỗi bạn đi qua thì lấy điểm cộng dồn vào rổ `tong`."*
2. **Chưa biết trước số lượt, chỉ biết khi nào dừng (`while`):** *"Cứ lặp đi lặp lại việc bóc từng chữ số hàng đơn vị của số `m` (chia 10 vứt số cuối) CHỪNG NÀO `m > 0` vẫn còn chữ số!"*

Và trong khi đang chạy dây chuyền lặp, Anh Thật Thà cần thêm **2 nút điều khiển khẩn cấp**:
- **Nút `continue` (Bỏ qua lượt này):** *"Nếu gặp phiếu điểm âm (lỗi), bỏ qua đừng cộng vào rổ, quay ngay lên đầu vòng lặp để đón bạn kế tiếp!"*
- **Nút `break` (Ngắt khẩn cấp toàn bộ dây chuyền):** *"Nếu đang dò tìm người đầu tiên đạt mốc, hễ vừa tìm thấy là bấm chuông dừng hẳn vòng lặp ngay lập tức, không chạy tiếp các lượt dư thừa!"*

**Cảnh báo Vòng Lặp Vô Tận (`Infinite Loop`):** Nếu dùng `while (m > 0)` mà bạn **quên** rút gọn `m /= 10;` bên trong vòng lặp, thì `m` mãi mãi giữ nguyên giá trị dương ban đầu! Anh Thật Thà sẽ quay cuồng trong vòng lặp mãi mãi đến khi hết giờ (`TLE`)!

#### Bước 2: Ánh xạ vào lập trình C++
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Vòng lặp for đọc N số không cần mảng + continue bỏ qua số âm
    int n;
    cin >> n;
    long long tong = 0; // LUÔN khởi tạo = 0 trước vòng lặp!
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        if (x < 0) continue; // Bỏ qua số âm, sang lượt i + 1
        tong += x;
    }
    cout << tong << '\n';

    // 2. Vòng lặp while + break: tìm ước thực sự nhỏ nhất > 1 của một số
    int k;
    cin >> k;
    int uocNhoNhat = k;
    for (int d = 2; d <= k; d++) {
        if (k % d == 0) {
            uocNhoNhat = d;
            break; // Tìm thấy ước nhỏ nhất rồi -> thoát hẳn vòng for!
        }
    }
    cout << uocNhoNhat << '\n';

    // 3. Mẫu đọc nhiều bộ test chuẩn CP: while (t--)
    int t;
    cin >> t;
    while (t--) {
        long long a, b;
        cin >> a >> b;
        cout << a + b << '\n';
    }

    return 0;
}
```

**Lưu ý nhỏ với `while (t--)`:** Giả sử `t = 3`, biểu thức `t--` kiểm tra giá trị hiện tại của `t` (khác `0` là đúng) rồi mới giảm `t` đi `1`:
- Lần 1: kiểm tra `3 != 0` (đúng), giảm `t` thành `2`, chạy thân vòng lặp.
- Lần 2: kiểm tra `2 != 0` (đúng), giảm `t` thành `1`, chạy thân vòng lặp.
- Lần 3: kiểm tra `1 != 0` (đúng), giảm `t` thành `0`, chạy thân vòng lặp.
- Lần 4: kiểm tra `0 != 0` (sai), giảm `t` thành `-1` và thoát vòng lặp! Tổng cộng chạy đúng `3` lần!

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Vòng lặp (`Loop`):** Cấu trúc cho phép thực thi lặp đi lặp lại một khối lệnh (`for` thường dùng khi biết số bước đếm; `while` thường dùng khi lặp theo điều kiện dừng).
- **Biến tích lũy / Biến đếm (`Accumulator / Counter`):** Biến đặt bên ngoài vòng lặp (`tong = 0`, `dem = 0`) để cộng dồn qua từng lượt. Nếu quên gán `= 0` khi khai báo trong `main()`, biến sẽ mang "giá trị rác" ngẫu nhiên trong RAM!
- **`break` và `continue`:** Hai lệnh nhảy điều khiển vòng lặp (`break` thoát hẳn vòng lặp gần nhất chứa nó; `continue` nhảy qua phần còn lại của lượt hiện tại để sang lượt kế tiếp).
- **Vòng lặp vô tận (`Infinite Loop`):** Lỗi điều kiện lặp luôn đúng mãi mãi do quên cập nhật biến hoặc viết sai điều kiện dừng, gây ra `TLE` khi chấm bài.

---

### 2.3. Vấn Đề Nhỏ 3: Kiểu `long long`, Bẫy Tràn Số `int`, Ép Kiểu `1LL` & Chia Lấy Dư `%`

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Hãy hình dung chiếc **đồng hồ công-tơ-mét cơ học** trên xe máy chỉ có đúng **4 ô chữ số** (tối đa ghi được `9999`). Khi đang ở `9999` và xe chạy thêm 1 km nữa, do không có ô chữ số thứ 5, bánh răng lật vòng về `0000`!

Trong bộ nhớ RAM (`MOD-00`), hộp biến `int` chuẩn 32-bit cũng có dung lượng cố định **4 byte** — chỉ chứa được số nguyên trong khoảng:
$$-2\,147\,483\,648 \le \text{int} \le 2\,147\,483\,647 \quad (\approx 2.14 \times 10^9)$$

Khi đề bài cho $a = 10^9$ và $b = 10^9$, cả $a$ và $b$ đều **lọt vừa** chiếc hộp `int`. Nhưng khi nhân $a \times b = 10^{18}$, con số này vượt quá sức chứa của hộp 4 byte, khiến số bị "lật vòng" thành số âm sai bét (ví dụ `-1486618624`)!

**Giải pháp 1 — Đổi sang hộp lớn `long long` (8 byte / 64-bit):**
Chứa được từ $-9.22 \times 10^{18}$ đến $+9.22 \times 10^{18}$ (`LLONG_MAX = 9,223,372,036,854,775,807`).
Nhưng có một **cái bẫy kinh điển của Lớp 9**:
> Nếu `int a = 1000000000, b = 1000000000;` mà bạn viết `long long tich = a * b;` thì **VẪN BỊ TRÀN SỐ!**
> Vì Anh Thật Thà làm phép nhân `a * b` bên tay phải dấu `=` trước bằng hai chiếc hộp `int`, kết quả bị tràn hỏng ngay tại bước nhân, **rồi mới** bê kết quả hỏng đó bỏ vào chiếc hộp `long long tich`!
> **Cách khắc phục:** Đặt `1LL *` ở **đầu** phép nhân (`1LL * a * b`) để nâng cấp phép tính lên 64-bit ngay từ đầu, hoặc khai báo luôn `long long a, b;` từ lúc nhập!

**Giải pháp 2 — Chia lấy dư (`%`) từng bước & Bẫy số âm trong C++:**
Nhiều bài toán yêu cầu tính $2^n$ hoặc giai thừa $n!$ với $n = 10^6$, con số lớn hàng trăm nghìn chữ số không hộp `long long` nào chứa nổi! Đề bài bèn yêu cầu: *"In kết quả chia lấy dư cho $M = 10^9 + 7$"*.
- Đừng đợi nhân hết mới `% M`! Hãy lấy `% M` sau **mỗi phép cộng hoặc nhân**:
  - `(a + b) % M = ((a % M) + (b % M)) % M`
  - `(a * b) % M = ((a % M) * (b % M)) % M` (lưu ý dùng `long long` vì hai số $< 10^9 + 7$ nhân nhau lên tới $\approx 10^{18}$, vẫn tràn `int`!).
- **Bẫy số âm với `%` trong C++14:** Trong Toán học, số dư khi chia cho $5$ luôn nằm trong $\{0, 1, 2, 3, 4\}$. Nhưng trong C++, phép `(-7) % 5` cho kết quả là **`-2`** (giữ dấu của số bị chia)! Vì thế, khi biểu thức có dấu trừ hoặc số âm, luôn chuẩn hóa bằng công thức:
  $$\text{duChuan} = ((x \bmod M) + M) \bmod M$$

#### Bước 2: Ánh xạ vào lập trình C++
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    const long long MOD = 1000000007LL;

    int a = 1000000000, b = 1000000000;
    // SAI: long long tichSai = a * b;       -> tràn ngay từ int * int!
    // SAI: long long tichVanSai = a * b * 1LL; -> a * b ở bên trái đã tràn trước!
    // ĐÚNG: đặt 1LL * ở ĐẦU phép nhân:
    long long tichDung = 1LL * a * b; // = 1000000000000000000 (10^18)
    cout << tichDung << '\n';

    // Tính 2^n mod (10^9 + 7) bằng vòng lặp và chia dư từng bước
    int n;
    cin >> n;
    long long ans = 1;
    for (int i = 1; i <= n; i++) {
        ans = (ans * 2) % MOD;
    }
    cout << ans << '\n';

    // Chuẩn hóa phép chia lấy dư khi có hiệu hai số âm:
    long long x = 3, y = 10, m = 5;
    long long hieuMod = (((x - y) % m) + m) % m; // (-2 + 5) % 5 = 3
    cout << hieuMod << '\n';

    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Tràn số nguyên (`Integer Overflow`):** Hiện tượng giá trị tính toán vượt quá sức chứa của kiểu dữ liệu (`int` tối đa $\approx 2.14 \times 10^9$, `long long` tối đa $\approx 9.22 \times 10^{18}$), gây sai lệch kết quả hoặc biến thành số âm.
- **Ép kiểu tường minh sang 64-bit (`1LL * ...` hoặc `(long long)a`):** Nâng cấp toán hạng lên kiểu `long long` *trước* khi thực hiện phép nhân/cộng để phép toán trung gian không bị tràn ở 32-bit.
- **Số học đồng dư (`Modular Arithmetic`):** Tính phần dư bằng toán tử `%` ở từng bước cộng/nhân (`(a * b) % M`), và dùng `((x % M) + M) % M` để đảm bảo kết quả luôn không âm trong đoạn $[0, M - 1]$.

---

## 3. Bảng Tổng Hợp Các Bẫy Kinh Điển & Phân Tích Chi Phí (`L1-01`)

| Chủ đề | Bẫy thường gặp (gây WA / TLE) | Cách xử lý chuẩn CP |
| :--- | :--- | :--- |
| Rẽ nhánh `if` | Viết `if (x = 5)` thay cho `if (x == 5)`, hoặc viết gộp `5 <= x <= 10` | Luôn dùng `==` để so sánh và viết tường minh `5 <= x && x <= 10` |
| Bậc thang `else if` | Đặt điều kiện rộng (`>= 5.0`) trước điều kiện hẹp (`>= 8.0`) | Sắp xếp các nhánh từ **chặt nhất đến lỏng nhất** |
| Vòng lặp `for/while` | Quên khởi tạo `tong = 0;`, hoặc quên cập nhật biến trong `while` | Luôn gán giá trị đầu `= 0`, kiểm tra kỹ điều kiện dừng để tránh `TLE` |
| Tràn số trung gian | Khai báo `int a, b;` rồi viết `long long s = a * b;` | Khai báo `long long a, b;` hoặc viết **`1LL * a * b`** ngay đầu phép tính |
| Modulo `%` | Nhân hai số $\approx 10^9$ bằng `int` trước khi `% MOD`, hoặc quên xử lý số âm | Dùng `long long` cho biến trung gian và dùng `((x % M) + M) % M` khi có phép trừ |

- **Độ phức tạp bài toán ở `L1-01`:**
  - Các bài toán dùng vòng lặp đơn `for (1..N)` hoặc `while (t--)` duyệt qua $N$ phần tử mà không cần lưu lại dãy vào RAM chỉ tốn **Bộ nhớ $O(1)$** (vài biến đơn lẻ `int` / `long long`).
  - Với vòng lặp chạy $N \le 10^6$ bước (như `CSES 1617 - Bit Strings`), số phép tính $\approx 10^6$ hoàn toàn nằm gọn trong giới hạn $1$ giây của máy chấm (khoảng $10^8$ phép tính/giây).
