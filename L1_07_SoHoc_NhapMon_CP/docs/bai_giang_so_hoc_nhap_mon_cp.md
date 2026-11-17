# Bài Giảng `L1-07` — Số Học Nhập Môn Cho CP

- **Mã chuyên đề:** `L1-07` (Tầng 1 — Pha 2 STL Lớp 9)
- **Kiến thức tiền đề đã có (`MOD-Pre` + `MOD-CP0` + `L1-01` $\rightarrow$ `L1-06`):**
  - Đã thành thạo **Bộ Khung Chuẩn CP**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`.
  - Đã vững kiểu `long long`, phép chia lấy dư `%`, vòng lặp `for`/`while`, phân tích Big-O và quy tắc $\sim 10^8$ phép tính/giây (`L1-04`), cùng `std::vector` và các thùng chứa STL (`L1-05`, `L1-06`).
- **Kiến thức mới mở khóa ở `L1-07`:**
  - Tính đối xứng của cặp ước $(d, N/d)$ để đếm ước và kiểm tra nguyên tố trong $O(\sqrt{N})$.
  - Sàng nguyên tố Eratosthenes $O(N \log \log N)$ trên `vector<bool>`.
  - Thuật toán Euclid dạng lặp tính GCD/LCM trong $O(\log(\min(a, b)))$ và bẫy tràn số khi tính LCM.
  - Số học đồng dư an toàn (đặc biệt phép trừ `((a - b) % M + M) % M`) và Lũy thừa nhị phân dạng lặp (`while (b > 0)`) tính $a^b \bmod M$ trong $O(\log b)$.
  *(Lưu ý: Học sinh chưa học Prefix Sums `L2-01`, Binary Search `L2-02`, Đệ quy `MOD-01` hay Quy hoạch động — toàn bộ thuật toán trong bài này đều cài đặt bằng vòng lặp tường minh.)*

---

## 1. Bức Tranh Toàn Cảnh: Hệ Thống Kiểm Tra Mã Số & Chia Nhóm Quy Mô Lớn

Giả sử bạn cần xây dựng bộ xử lý số học cho một hệ thống thi đấu trực tuyến xử lý những con số lên tới $10^{12}$ – $10^{18}$:

1. **Bế tắc 1 — Kiểm tra nguyên tố $10^{12}$ & Liệt kê nguyên tố tới $10^6$:** Nếu kiểm tra số $N \le 10^{12}$ bằng cách thử chia mọi số từ $2$ đến $N - 1$, máy tính phải chạy $10^{12}$ vòng lặp ($\rightarrow$ **TLE hàng giờ**!). Còn nếu cần biết mọi số nguyên tố từ $1$ đến $10^6$, gọi kiểm tra từng số tốn $O(N \sqrt{N}) \approx 10^9$ phép tính ($\rightarrow$ **TLE**!).
2. **Bế tắc 2 — Tìm ước chung / bội chung cho hai số $10^{12}$:** Thử đếm lùi từ $\min(A, B)$ xuống $1$ tốn $O(\min(A, B))$ (**TLE**). Nếu áp dụng công thức $\text{LCM}(A, B) = (A \times B) / \text{GCD}(A, B)$ theo thứ tự nhân trước chia sau, với $A = 2 \cdot 10^{12}, B = 3 \cdot 10^{12}$, tích $A \times B = 6 \cdot 10^{24}$ sẽ **tràn `long long`** ($\approx 9.22 \cdot 10^{18}$) trước khi kịp chia!
3. **Bế tắc 3 — Tính $a^b \bmod M$ khi $b = 10^{18}$ & Phép trừ ra số âm:** Nhân vòng lặp `for` $b$ lần tốn $10^{18}$ bước (**TLE**), để cuối cùng mới `% M` làm tràn `long long`, và khi viết `(a - b) % M` trong C++ nếu `a < b` sẽ in ra **số âm** (**WA**)!

> **Chiến lược giải quyết:** Tách bài toán thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)**:
> - $V_1$: Ước số, Kiểm tra nguyên tố $O(\sqrt{N})$ & Sàng Eratosthenes $O(N \log \log N)$.
> - $V_2$: Thuật toán Euclid tính GCD/LCM $O(\log(\min(a, b)))$ & Chia trước nhân sau.
> - $V_3$: Số học đồng dư an toàn & Lũy thừa nhị phân dạng lặp $O(\log b)$.

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Ước Số, Kiểm Tra Nguyên Tố $O(\sqrt{N})$ & Sàng Eratosthenes

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Cặp ước đối xứng của hình chữ nhật diện tích $N$:** Để xếp $N = 36$ viên gạch thành hình chữ nhật có chiều rộng $d \le$ chiều dài $N/d$, chiều rộng $d$ không bao giờ vượt quá $\sqrt{36} = 6$! Hễ tìm được một chiều rộng $d$ ở nửa bên trái ($1 \le d \le \sqrt{N}$), ta lập tức biết luôn chiều dài đối xứng $N/d$ ở nửa bên phải mà không cần chạy tiếp từ $\sqrt{N}+1$ đến $N$. Riêng khi $d = N/d$ (hình vuông $6 \times 6$), hai ước trùng nhau nên chỉ đếm **1 lần**!
- **Kiểm tra số nguyên tố $O(\sqrt{N})$:** Số nguyên tố là số nguyên lớn hơn $1$ chỉ có đúng 2 ước là $1$ và chính nó. Nếu $N$ có một ước $d$ ($1 < d < N$) thì cặp $(d, N/d)$ chắc chắn có ít nhất một số $\le \sqrt{N}$. Do đó chỉ cần thử chia từ $2$ đến $\lfloor\sqrt{N}\rfloor$!
  - **Bẫy 1:** `n = 1` (và $n \le 0$) **KHÔNG** phải số nguyên tố! Luôn kiểm tra `if (n < 2) return false;`.
  - **Bẫy 2:** Viết `for (int i = 2; i * i <= n; i++)` khi $n \approx 2 \cdot 10^9$! Khi $i = 46341$, tích `i * i = 2,147,488,281` vượt ngưỡng `int` ($2^{31}-1 = 2,147,483,647$) và **tràn số (Undefined Behavior)**! Luôn dùng `long long i` hoặc viết `1LL * i * i <= n`.
- **Sàng Eratosthenes $O(N \log \log N)$ trên `vector<bool>`:** Khi cần biết **mọi số nguyên tố từ $1$ đến $N = 10^6$**, ta dùng một bảng đánh dấu `vector<bool> isPrime(N + 1, true)` (mỗi phần tử chỉ tốn ~1 bit, $10^7$ số chỉ tốn $\sim 1.25$ MB!). Ban đầu xem tất cả đều là nguyên tố (trừ $0$ và $1$). Duyệt $i$ từ $2$ sao cho `1LL * i * i <= N`: hễ thấy `isPrime[i] == true`, ta đi gạch sạch các bội của $i$ bắt đầu từ **`1LL * i * i`** (vì mọi bội nhỏ hơn như $2i, 3i, \dots, (i-1)i$ đều đã có ước nguyên tố nhỏ hơn $i$ gạch sạch từ trước rồi!).

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

bool isPrime(long long n) {
    if (n < 2) return false;
    for (long long i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

vector<bool> sieve(int n) {
    vector<bool> isPrimeArr(n + 1, true);
    if (n >= 0) isPrimeArr[0] = false;
    if (n >= 1) isPrimeArr[1] = false;
    for (int i = 2; 1LL * i * i <= n; i++) {
        if (isPrimeArr[i]) {
            for (long long j = 1LL * i * i; j <= n; j += i) {
                isPrimeArr[(int)j] = false;
            }
        }
    }
    return isPrimeArr;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Kiểm tra chia thử (`Trial Division` $O(\sqrt{N})$):** Kiểm tra tính nguyên tố hoặc đếm ước của một số $N$ đơn lẻ bằng tính đối xứng của cặp ước $(d, N/d)$.
- **Sàng Eratosthenes (`Sieve of Eratosthenes` $O(N \log \log N)$):** Tiền xử lý toàn bộ tính nguyên tố trong đoạn $[1, N]$ bằng cách loại dần các bội số từ $i^2$ trở lên; chi phí gần như tuyến tính vì $\sum_{p \le N} \frac{N}{p} \approx N \ln \ln N$.

---

### 2.2. Vấn Đề Nhỏ 2: Thuật Toán Euclid Tính GCD/LCM ($O(\log(\min(a, b)))$)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Cắt miếng bìa hình chữ nhật $a \times b$ thành các ô vuông lớn nhất:** Muốn lát kín mảnh đất $a \times b$ bằng các viên gạch vuông cạnh $g$ lớn nhất có thể, cạnh $g$ chính là $\gcd(a, b)$. Nếu cắt đi tối đa các hình vuông cạnh $b$ từ cạnh $a$, mảnh còn thừa có kích thước $b \times (a \bmod b)$. Mọi viên gạch chia hết cả $a$ lẫn $b$ cũng chắc chắn chia hết phần dư $a \bmod b$! Nhờ vậy ta thay cặp $(a, b)$ bằng cặp nhỏ hơn nhiều là $(b, a \bmod b)$, lặp lại cho tới khi phần dư bằng $0$ — phần còn lại chính là $\gcd$!
- **Vì sao chạy cực nhanh $O(\log(\min(a, b)))$:** Cứ sau tối đa 2 bước chia dư, giá trị số lớn hơn giảm đi ít nhất một nửa! Vì vậy với hai số khổng lồ tới $10^{18}$, vòng lặp `while (b != 0)` chỉ chạy tối đa khoảng $90$ bước!
- **Lưu ý `__gcd` vs Euclid tự viết:** Hàm `__gcd(a, b)` trong `<algorithm>` là phần mở rộng riêng của GCC (không phải chuẩn C++ mọi trình biên dịch, và đòi hỏi 2 tham số phải cùng kiểu — gọi `__gcd(12, 18LL)` sẽ **lỗi biên dịch**!). Việc tự viết hàm `myGcd(long long a, long long b)` bằng vòng lặp `while` vừa tương thích 100%, vừa giúp hiểu bản chất và xử lý an toàn số `long long`.
- **Bẫy tràn số khi tính LCM:** Công thức $\text{LCM}(a, b) = \frac{a \cdot b}{\gcd(a, b)}$. Nếu viết `(a * b) / g`, tích `a * b` có thể vượt $9.22 \cdot 10^{18}$ (`long long`) ngay cả khi đáp án LCM cuối cùng vẫn rất nhỏ! Vì `a` luôn chia hết cho `g = gcd(a, b)`, hãy **CHIA TRƯỚC, NHÂN SAU**: `(a / g) * b`!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
long long myGcd(long long a, long long b) {
    if (a < 0) a = -a;
    if (b < 0) b = -b;
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}

long long myLcm(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    long long g = myGcd(a, b);
    return (a / g) * b; // CHIA TRƯỚC, NHÂN SAU để chống tràn trung gian!
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Ước chung lớn nhất (`GCD — Greatest Common Divisor`) & Bội chung nhỏ nhất (`LCM — Least Common Multiple`):** Liên hệ chặt qua đẳng thức $a \cdot b = \gcd(a, b) \cdot \text{lcm}(a, b)$.
- **Thuật toán Euclid (`Euclidean Algorithm`):** Dựa trên bất biến $\gcd(a, b) = \gcd(b, a \bmod b)$ và $\gcd(a, 0) = a$, đạt độ phức tạp $O(\log(\min(a, b)))$.

---

### 2.3. Vấn Đề Nhỏ 3: Số Học Đồng Dư & Lũy Thừa Nhị Phân Lặp $O(\log b)$

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Lấy dư theo từng bước trên đồng hồ $M$ giờ:** Khi đáp án quá lớn, đề bài yêu cầu in kết quả chia lấy dư cho $M = 10^9 + 7$. Để không bị tràn số `long long`, ta phải lấy dư sau mỗi phép cộng, trừ, nhân:
  - Cộng: `((a % M) + (b % M)) % M`
  - Nhân: `((a % M) * (b % M)) % M` (nhớ ép `long long` / `1LL` vì $(10^9 + 6)^2 \approx 10^{18}$ vượt xa `int`!)
  - **Bẫy phép trừ trong C++:** Trong C++, `(-3) % 7` ra `-3` (số âm!) chứ không phải `4`! Muốn kết quả luôn nằm chuẩn trong $[0, M - 1]$, viết **`((a % M - b % M) % M + M) % M`** (hoặc `(a - b + M) % M` khi `0 <= a, b < M`).
  - **Cảnh báo:** Phép chia KHÔNG có tính chất `(a / b) % M = ((a % M) / (b % M)) % M`.
- **Lũy thừa nhị phân dạng lặp (`while (b > 0)`):** Muốn tính $a^{13} \bmod M$, thay vì nhân $13$ lần (khi $b = 10^{18}$ sẽ chạy mất $10^{18}$ bước $\rightarrow$ **TLE**!), ta tách số mũ $13$ thành tổng các lũy thừa của $2$: $13 = 8 + 4 + 1 = (1101)_2$.
  - Ta giữ `res = 1 % M` và ép ngay **`a %= M`** ở đầu hàm (nếu quên ép `a %= M`, một cơ số $a = 10^{12}$ nhân `a * a` sẽ tràn `long long` ngay bước đầu!).
  - Trong vòng `while (b > 0)`: nếu bit cuối của `b` là `1` (`b & 1`), nhân dồn `res = (res * a) % M;`. Sau đó bình phương cơ số `a = (a * a) % M;` và chặt đôi số mũ `b >>= 1;` (`b /= 2`). Với $b \le 10^{18}$, vòng lặp chạy tối đa **~60 bước** ($O(\log b)$)!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
long long subMod(long long a, long long b, long long mod) {
    return (((a % mod) - (b % mod)) % mod + mod) % mod;
}

long long binPow(long long a, long long b, long long mod) {
    long long res = 1 % mod;
    a %= mod;
    if (a < 0) a += mod;
    while (b > 0) {
        if (b & 1LL) res = (res * a) % mod;
        a = (a * a) % mod;
        b >>= 1;
    }
    return res;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Số học đồng dư (`Modular Arithmetic`):** Thực hiện cộng, trừ, nhân trong phần dư theo mô-đun $M$ để giữ giá trị nhỏ gọn không tràn `long long`.
- **Lũy thừa nhị phân (`Binary Exponentiation`):** Tính $a^b \bmod M$ trong $O(\log b)$ bằng cách khai triển nhị phân số mũ $b$ và bình phương liên tiếp cơ số $a$.

---

## 3. Bảng Tổng Hợp Độ Phức Tạp

| Thuật toán | Độ phức tạp Thời gian | Độ phức tạp Bộ nhớ | Phạm vi áp dụng điển hình |
| :--- | :--- | :--- | :--- |
| Kiểm tra nguyên tố / Đếm ước | $O(\sqrt{N})$ | $O(1)$ | Một vài số đơn lẻ $N \le 10^{14}$ |
| Sàng Eratosthenes | $O(N \log \log N)$ | $O(N)$ bit (`vector<bool>`) | Kiểm tra nhiều truy vấn với $N \le 10^7$ |
| Euclid GCD & LCM | $O(\log(\min(a, b)))$ | $O(1)$ | Cặp số tới $10^{18}$ |
| Lũy thừa nhị phân lặp | $O(\log b)$ | $O(1)$ | Tính $a^b \bmod M$ với $b \le 10^{18}$ |

---

## 4. Danh Sách Kiểm Tra Tránh Bẫy Kinh Điển (Pitfalls Checklist)

1. **Quên `n = 1` không phải số nguyên tố:** Luôn đặt `if (n < 2) return false;` ở dòng đầu hàm kiểm tra nguyên tố.
2. **Tràn `int` ở điều kiện `i * i <= n`:** Khi $n \approx 2 \cdot 10^9$ hoặc trong sàng có `j = i * i`, viết `int i` khiến `i * i` tràn kiểu `int`. Luôn dùng `long long i` hoặc `1LL * i * i`.
3. **Tràn số trung gian ở LCM `(a * b) / gcd(a, b)`:** Luôn viết `(a / gcd(a, b)) * b` (chia trước, nhân sau).
4. **Phép trừ đồng dư ra số âm:** `(a - b) % M` trong C++ trả về số âm khi `a < b`; bắt buộc viết `((a - b) % M + M) % M`.
5. **Quên `a %= M` hoặc quên `% M` trong `binPow`:** Luôn ép `a %= M` ngay đầu hàm và luôn `% M` sau mỗi phép `res * a` và `a * a`.
6. **Ngây thơ lấy dư phép chia `(a / b) % M = ((a % M) / (b % M)) % M`:** Sai hoàn toàn về toán học!
