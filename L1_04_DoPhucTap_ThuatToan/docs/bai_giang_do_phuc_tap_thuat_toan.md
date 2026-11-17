# Bài Giảng `L1-04` — Phân Tích Độ Phức Tạp Thuật Toán (Big-O): Thời Gian & Không Gian

- **Mã chuyên đề:** `L1-04` (Tầng 1 — Pha 1: Nền tảng C++ Lớp 9)
- **Kiến thức tiền đề đã có (`MOD-Pre` + `MOD-CP0` + `L1-01` + `L1-02` + `L1-03`):**
  - Đã thuộc lòng **Bộ Khung Chuẩn CP**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`.
  - Đã thành thạo `if / else if / else`, vòng lặp `for / while / while (t--)`, kiểu `int` ($\sim 2.14 \cdot 10^9$), `long long` ($\sim 9 \cdot 10^{18}$), `%`.
  - Đã thành thạo **mảng tĩnh toàn cục (`const int N = ...; int a[N];`)**, xâu `string`, hàm `void` / `return`, tham chiếu `&`, và phân biệt **ngăn xếp lời gọi hàm / bộ nhớ stack (~8 MB)** với **vùng dữ liệu tĩnh toàn cục (~256 MB)**.
- **Ranh giới Pha 1 Lớp 9:** Đây là bài tổng kết cuối Pha 1 trước khi mở khóa cấu trúc dữ liệu co giãn ở `L1-05`. Toàn bộ code trong bài chỉ dùng mảng tĩnh toàn cục, biến nguyên thủy, hàm cơ bản và toán học — chưa dùng cấu trúc dữ liệu động hay hàm sắp xếp thư viện.

---

## 1. Bức Tranh Toàn Cảnh: Tại Sao Test Nhỏ Chạy Mượt Mà Nộp Bài Lại TLE Và MLE?

Trong kỳ thi Tin học Lớp 9, đề bài đưa ra giới hạn thời gian **1.0 giây** và giới hạn bộ nhớ **256 MB**. Có 3 tình huống khiến rất nhiều bạn ngơ ngác sau khi bấm nút nộp bài:

1. **Bế tắc 1 — Đồng hồ bấm giờ không đáng tin:** Bạn chạy thử bài toán "Tính tổng tích mọi cặp $(a_i \cdot a_j)$ với $1 \le i < j \le N$" ở nhà với $N = 5$, máy in kết quả đúng trong nháy mắt (`0.001s`). Nhưng khi nộp lên máy chấm (nơi có test $N = 2 \times 10^5$), máy báo **TLE (Time Limit Exceeded — Quá thời gian)**! Hơn nữa, cùng một đoạn code, chạy trên máy mạnh hết `0.6s`, chạy trên máy yếu đang mở nhiều cửa sổ lại mất `1.4s` — vậy ta cần một thước đo công bằng nào thay cho đồng hồ bấm giây?
2. **Bế tắc 2 — Bẫy đa bộ test $T$ và không biết chọn hướng giải:** Đề ghi $N \le 10^4$, nhưng dòng đầu lại có **$T \le 10^4$ bộ test** (`while (t--)`). Một giải pháp chạy mất $O(N^2)$ tưởng vừa khít $10^8$, hóa ra khi nhân thêm $T$ lại vọt lên $10^{12}$ bước (mất gần 3 tiếng!). Làm sao chỉ cần **đọc giới hạn $N$ và $T$ trong 5 giây đầu** là biết ngay thuật toán nào được phép dùng?
3. **Bế tắc 3 — Chạy nhanh $O(1)$ mỗi truy vấn nhưng chết vì MLE:** Để trả lời nhanh tổng đoạn $[l, r]$ với $N = 10^4$, bạn khai báo hẳn bảng 2 chiều toàn cục `int bang[10005][10005];`. Dù đã đặt ngoài `main()` (tránh ngăn xếp ~8 MB), máy chấm vẫn báo **MLE (Memory Limit Exceeded — Tràn bộ nhớ)** vì vượt trần 256 MB!

> **Chiến lược giải quyết:** Tách bài toán *"Dự đoán TLE/MLE trước khi gõ dòng code đầu tiên"* thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)** để làm chủ hoàn toàn thước đo tốc độ và bộ nhớ!

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Đếm Phép Toán Sơ Cấp & Ký Hiệu Big-O ($O$-notation)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Hãy tưởng tượng hai cửa hàng cùng nhận giao **$N$ hộp bánh mì**. Nếu dùng đồng hồ bấm giây để so sánh: người đi xe máy chắc chắn nhanh hơn người đi bộ với $N = 10$, nhưng không phản ánh được *cách tổ chức giao hàng* tốt hay dở! Thay vào đó, ta đếm **tổng số lượt công việc phải làm phụ thuộc theo $N$**:

1. **$O(1)$ — Thời gian hằng số (Làm 1 lần xong ngay):** Mở tủ lấy đúng hộp bánh đầu tiên. Dù kho có $10$ hay $1\,000\,000\,000$ hộp, bạn chỉ làm đúng **1 bước**.
2. **$O(\log N)$ — Thời gian logarit (Cắt đôi liên tiếp):** Chơi trò đoán 1 số bí mật từ $1$ đến $N$ (hoặc tìm một từ trong cuốn từ điển $N$ trang bằng cách luôn lật đúng trang giữa). Với $N = 1\,000\,000\,000$, chỉ cần **~30 lần bẻ đôi** ($\log_2(10^9) \approx 30$) là tìm ra! Tương tự, vòng lặp `while (n > 0) n /= 2;` hay tách chữ số `n /= 10;` đều là $O(\log N)$.
3. **$O(\sqrt{N})$ — Thời gian căn bậc hai (Đi nửa đường rồi ghép cặp):** Tìm mọi ước số của $N$ bằng cách chỉ xét $i$ từ $1$ đến $\sqrt{N}$: cứ thấy $i$ là ước thì lấy luôn cả cặp $(i, N/i)$. Với $N = 10^{12}$, chỉ cần chạy tới $10^6$ bước thay vì $10^{12}$!
4. **$O(N)$ — Thời gian tuyến tính (Đi qua mỗi người 1 lần):** Điểm danh lần lượt từng bạn từ $1$ đến $N$. Số bước tỷ lệ thuận bậc nhất với $N$.
5. **$O(N \log N)$ — Tuyến tính nhân logarit:** Có $N$ ngày, mỗi ngày làm một việc mất $O(\log N)$ bước; hoặc vòng lặp điều hòa `for (i = 1..N) for (j = i; j <= N; j += i)` có tổng số bước là $N/1 + N/2 + \dots + N/N \approx N \ln N$.
6. **$O(N^2)$ — Thời gian bình phương (Bắt tay mọi cặp):** Trong phòng có $N$ bạn, mỗi bạn lần lượt đi bắt tay với tất cả các bạn còn lại (2 vòng lặp lồng nhau từ $1$ đến $N$). Khi $N$ tăng gấp 10 lần, số cái bắt tay tăng gấp **100 lần**!
7. **$O(2^N)$ — Thời gian hàm mũ (Gấp đôi mỗi món):** Có $N$ món đồ, mỗi món chọn "lấy" hoặc "bỏ" nên có $2 \times 2 \times \dots \times 2 = 2^N$ cách. Chỉ cần $N = 30$, số bước đã vượt $10^9$!

**Hai quy tắc rút gọn về ký hiệu Big-O:**
Giả sử đoạn code tốn chính xác $3N^2 + 100N + 50$ phép toán sơ cấp.
- **Quy tắc 1 — Bỏ hằng số nhân và hằng số cộng:** $2N + 5 \to O(N)$, $3N^2 \to O(N^2)$. Vì ta quan tâm *tốc độ phình to khi $N$ tiến ra rất lớn*.
- **Quy tắc 2 — Chỉ giữ số hạng bậc lớn nhất:** Trong $N^2 + 100N + 50$, khi $N = 10^5$ thì $N^2 = 10^{10}$ áp đảo hoàn toàn $100N = 10^7$ và $50$, nên rút gọn thành $O(N^2)$.

> **Cảnh báo 2 ngoại lệ sống còn trong thi đấu CP:**
> 1. **Đừng xem thường hệ số hằng số $C$ quá lớn!** Về lý thuyết $500N$ vẫn là $O(N)$, nhưng nếu $N = 10^6$ và mỗi lượt chạy 500 phép chia nặng, tổng số bước lên tới $5 \times 10^8 \implies$ vẫn có thể bị TLE!
> 2. **Không được bỏ biến thứ hai (như số bộ test $T$ hoặc kích thước $M$)!** Nếu có $T$ bộ test, mỗi test mất $O(N)$ thì độ phức tạp phải viết là **$O(T \cdot N)$** (vì $T$ là biến đầu vào độc lập có thể tới $10^4$–$10^5$, KHÔNG phải hằng số!). Tương tự, 2 vòng lặp nối tiếp theo $N$ và $M$ là **$O(N + M)$**; lồng nhau là **$O(N \cdot M)$**.

#### Bước 2: Ánh xạ vào lập trình C++
Mỗi phép gán (`=`), cộng/trừ/nhân/chia/chia dư (`+`, `-`, `*`, `/`, `%`), so sánh (`<`, `==`), hay truy cập phần tử mảng (`a[i]`) đều được tính là **1 phép toán sơ cấp** tốn $O(1)$.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long n = 1000;

    // 1. O(1): Không có vòng lặp phụ thuộc N
    long long tongCongThuc = n * (n + 1) / 2;

    // 2. O(log N): Mỗi bước n giảm đi một nửa -> chỉ ~10 bước với n = 1000
    long long buocLog = 0, x = n;
    while (x > 0) {
        buocLog++;
        x /= 2;
    }

    // 3. O(sqrt(N)): Duyệt i tới căn bậc hai của n -> ~31 bước với n = 1000
    long long buocSqrt = 0;
    for (long long i = 1; i * i <= n; i++) {
        buocSqrt++;
    }

    // 4. O(N) + O(N): Hai vòng lặp NỐI TIẾP -> 2N bước -> rút gọn là O(N)
    long long buocNoiTiep = 0;
    for (int i = 1; i <= n; i++) buocNoiTiep++;
    for (int i = 1; i <= n; i++) buocNoiTiep++;

    // 5. O(N^2): Hai vòng lặp LỒNG NHAU -> N*(N-1)/2 bước -> O(N^2)
    long long buocLong = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = i + 1; j <= n; j++) {
            buocLong++;
        }
    }

    cout << tongCongThuc << ' ' << buocLog << ' ' << buocSqrt << ' '
         << buocNoiTiep << ' ' << buocLong << '\n';
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Phép toán sơ cấp (`Elementary Operation`):** Một thao tác cơ bản mà CPU thực hiện với thời gian hằng số $O(1)$ (cộng, trừ, nhân, chia, gán biến, đọc ô mảng `a[i]`).
- **Ký hiệu Big-O (`Big-O Notation`):** Ký hiệu toán học mô tả **giới hạn trên của tốc độ tăng số phép toán** khi kích thước đầu vào $N$ tăng lên (bỏ hằng số, giữ bậc tăng nhanh nhất).
- **Quy tắc cộng & Quy tắc nhân:** Hai khối lệnh chạy **nối tiếp** nhau lấy bậc lớn hơn ($\max$, viết thành $O(f(N) + g(N))$); một khối $g(N)$ nằm **lồng bên trong** vòng lặp $f(N)$ thì nhân vào thành $O(f(N) \cdot g(N))$.

---

### 2.2. Vấn Đề Nhỏ 2: Quy Tắc Vàng $\sim 10^8$ Phép Tính/Giây & Đọc Ngược Giới Hạn $N$

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Máy chấm bài chuẩn CP chạy được khoảng **$10^8$ (100 triệu) phép toán sơ cấp trong 1.0 giây**.
Vì mỗi vòng lặp thực tế thường kèm vài thao tác nhỏ (`i++`, kiểm tra điều kiện, truy cập mảng, phép `%`), một quy tắc kinh nghiệm cực kỳ an toàn cho học sinh Lớp 9 là:
- Tổng số phép lặp ước lượng **$\le 10^7$**: Chạy êm ru (`<= 0.1s`), gần như chắc chắn **AC**!
- Từ **$10^7$ đến $8 \times 10^7$**: Chạy được nhưng phải viết code gọn, tránh phép tính thừa trong vòng lặp trong cùng.
- Vượt quá **$10^8$–$10^9$** (với Time Limit `1.0s`): Chắc chắn **TLE**!

Từ quy tắc $\sim 10^8$, các cao thủ CP có **kỹ năng đọc ngược giới hạn $N$ trong đề bài** — chỉ mất 5 giây nhìn đề là khoanh vùng ngay độ phức tạp bắt buộc phải đạt:

| Giới hạn $N$ trong đề (TL = 1.0s) | Độ phức tạp tối đa cho phép | Số bước ước lượng | Hướng thuật toán gợi ý |
| :--- | :--- | :--- | :--- |
| $N \le 20$ | $O(2^N)$ hoặc $O(N \cdot 2^N)$ | $\sim 10^6$ – $2 \cdot 10^7$ | Thử mọi tập con (sẽ học ở bài Quay lui) |
| $N \le 100$ | $O(N^3)$ hoặc $O(N^4)$ nhẹ | $\sim 10^6$ – $10^8$ | 3 vòng lặp lồng nhau |
| $N \le 500$ | $O(N^3)$ | $\sim 1.25 \cdot 10^8$ | 3 vòng lặp lồng, hằng số thật nhỏ |
| $N \le 5\,000$ | $O(N^2)$ | $\sim 2.5 \cdot 10^7$ | 2 vòng lặp lồng nhau duyệt mọi cặp |
| $N \le 10^5$ – $10^6$ | **$O(N)$ hoặc $O(N \log N)$** | $\sim 10^5$ – $2 \cdot 10^7$ | 1 vòng lặp, cộng dồn, hai con trỏ, sắp xếp (Pha 2) |
| $N \le 10^9$ – $10^{12}$ | **$O(\sqrt{N})$, $O(\log N)$, $O(1)$** | $\le 10^6$ | Duyệt tới $\sqrt{N}$, chia đôi, công thức toán |
| $N \le 10^{18}$ | **$O(\log N)$ hoặc $O(1)$** | $\le 60$ | Chia đôi/chia cơ số, lũy thừa nhanh, công thức |

**Hai cái bẫy kinh điển khi ước lượng $10^8$:**
1. **Bẫy đa bộ test $T$ (`while (t--)`):**
   Đề cho $T \le 10^4$ và $N \le 10^4$. Nếu chỉ nhìn $N = 10^4$, nhiều bạn nghĩ "$10^4 \times 10^4 = 10^8$, chắc qua!" — **SAI LẦM CHẾT NGƯỜI!** Khi chạy $T$ bộ test, tổng số bước là $T \times N^2 = 10^4 \times 10^8 = 10^{12} \implies$ TLE thảm hại! Với $T = 10^4, N = 10^4$, ta cần thuật toán mỗi test tối đa $O(N)$ (tổng $T \times N = 10^8$, hơi sát) hoặc tốt nhất là $O(\log N)$ / $O(1)$!
   *Lưu ý ngoại lệ:* Nếu đề có ghi thêm câu **"Tổng $N$ của tất cả các bộ test không vượt quá $2 \times 10^5$"** ($\sum N \le 2 \times 10^5$), thì thuật toán $O(N)$ mỗi test có tổng chi phí thực tế là $O(\sum N) = 2 \times 10^5$ (AC cực nhanh!), KHÔNG phải $T \times N$!
2. **Bẫy vòng lặp ẩn bên trong lời gọi hàm:**
   Giả sử bạn viết `for (int i = 1; i <= n; i++) if (laNguyenTo(i)) dem++;` với $N = 10^6$. Vòng ngoài chạy $N$ lần, nhưng bên trong mỗi lần gọi `laNguyenTo(i)` lại có vòng lặp $O(\sqrt{i})$! Tổng chi phí lên tới $O(N \sqrt{N}) \approx 10^9 \implies$ dễ bị TLE! Tương tự, gọi `strlen(s)` của chuỗi C-style trong điều kiện `for (int i = 0; i < strlen(s); i++)` làm mỗi bước lại quét đếm độ dài xâu từ đầu $\implies O(|s|^2)$ (khác với `s.size()` của `std::string` chỉ mất $O(1)$).

#### Bước 2: Ánh xạ vào lập trình C++
Xét bài toán **Tính $\sum_{1 \le i < j \le N} a[i] \cdot a[j] \pmod{10^9 + 7}$** với $N \le 2 \times 10^5$:
- Vì $N = 2 \times 10^5$, thuật toán $O(N^2)$ tốn $\frac{N(N-1)}{2} \approx 2 \times 10^{10}$ phép toán $\implies$ **TLE**!
- Ta phân tích nhân tử: giữ cố định $a[i]$ ở bên phải, nó cần nhân với $(a[1] + a[2] + \dots + a[i - 1])$. Chỉ cần duy trì 1 biến `tongTruoc` cộng dồn đến trước vị trí $i$ là giải trọn vẹn trong **$O(N)$** (~$2 \times 10^5$ bước $\ll 10^8$)!

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200005;
const long long MOD = 1000000007LL;
long long a[MAXN];

// CÁCH CHẬM O(N^2) - TLE với N = 2*10^5 (~2*10^10 bước)
long long giaiCham_ON2(int n) {
    long long ans = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = i + 1; j <= n; j++) {
            ans = (ans + (a[i] % MOD) * (a[j] % MOD)) % MOD;
        }
    }
    return ans;
}

// CÁCH TỐI ƯU O(N) - AC tức thì với N = 2*10^5 (~2*10^5 bước)
long long giaiNhanh_ON(int n) {
    long long ans = 0;
    long long tongTruoc = 0;
    for (int i = 1; i <= n; i++) {
        long long x = a[i] % MOD;
        ans = (ans + (x * tongTruoc) % MOD) % MOD;
        tongTruoc = (tongTruoc + x) % MOD;
    }
    return ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }

    cout << giaiNhanh_ON(n) << '\n';
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Giới hạn thời gian (`Time Limit Exceeded — TLE`):** Lỗi xảy ra khi số phép toán thực tế vượt quá khả năng xử lý của CPU máy chấm trong thời gian quy định (~$10^8$ phép/giây).
- **Đọc ngược ràng buộc (`Constraint Analysis`):** Kỹ năng dựa vào cận trên của $N, T$ để loại bỏ ngay các ý tưởng quá chậm trước khi bắt tay vào code.
- **Chi phí đa bộ test (`Multi-test Complexity`):** Luôn nhân thêm số lượng test $T$ vào độ phức tạp từng test ($O(T \cdot f(N))$), trừ khi đề ràng buộc tổng $\sum N$.

---

### 2.3. Vấn Đề Nhỏ 3: Độ Phức Tạp Không Gian (Space Complexity) & Giới Hạn 256 MB

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Nếu độ phức tạp thời gian đo **số bước làm việc**, thì độ phức tạp không gian đo **diện tích kho lưu trữ RAM** mà chương trình chiếm giữ!
Ở bài `L1-03`, bạn đã biết ranh giới quan trọng:
- **Ngăn xếp lời gọi hàm (bộ nhớ Stack)** chỉ nhỏ khoảng **~8 MB**, dùng cho biến đơn lẻ và lời gọi hàm.
- **Vùng dữ liệu tĩnh toàn cục** (và vùng nhớ động ở Pha 2) chịu trần bộ nhớ chung của đề bài — thường là **256 MB**.

Để không bao giờ bị **MLE (Memory Limit Exceeded)**, bạn chỉ cần nhớ bảng quy đổi sau:
- `bool`, `char`: **1 byte** / phần tử
- `int`: **4 bytes** / phần tử
- `long long`, `double`: **8 bytes** / phần tử
- **Quy đổi sang MB:** $1\text{ MB} \approx 10^6\text{ bytes}$ (chính xác là $1\,048\,576\text{ bytes}$, nhưng trong thi đấu ta lấy $10^6$ để tính nhẩm thật nhanh và luôn giữ khoảng đệm an toàn!).

Thử tính nhẩm thực tế với giới hạn **256 MB**:
- `int a[10000000];` ($10^7$ phần tử `int`) $= 10^7 \times 4\text{ bytes} = 40\text{ MB} \implies$ **Rất an toàn**!
- `long long a[10000000];` ($10^7$ phần tử `long long`) $= 10^7 \times 8\text{ bytes} = 80\text{ MB} \implies$ **An toàn** (nhưng khai báo 4 mảng như vậy sẽ thành $320\text{ MB} \implies$ **MLE**!).
- **Cái bẫy mảng 2 chiều kinh điển:** `int a[10000][10000];` có tổng số ô là $10\,000 \times 10\,000 = 10^8$ ô! Nhân với $4\text{ bytes}$ bằng **$400\text{ MB} > 256\text{ MB}$ $\implies$ MLE ngay lập tức!** (Nếu là `long long a[10000][10000]` thì ngốn tới **$800\text{ MB}$**!).

**Ba cách tránh bẫy bộ nhớ trong Pha 1:**
1. **Giảm chiều mảng hoặc đọc luồng dữ liệu ($O(N) \to O(1)$ không gian):** Nếu bài toán chỉ cần tìm Max, Min, Tổng hay đếm số thỏa mãn mà không cần xem lại dãy cũ, hãy đọc từng số bằng 1 biến `x` trong vòng lặp (`O(1)` bộ nhớ) thay vì lưu cả mảng! Còn nếu cần trả lời nhiều truy vấn tổng đoạn $[l, r]$, hãy dùng mảng 1 chiều `long long pref[100005]` ($\approx 0.8\text{ MB}$) thay vì bảng 2 chiều `sum[10005][10005]` ($\approx 400\text{ MB}$).
2. **Cộng tổng bộ nhớ MỌI mảng toàn cục:** Đừng chỉ kiểm tra 1 mảng, hãy cộng kích thước tất cả mảng toàn cục đang dùng và giữ tổng dưới ~200 MB (nhường chỗ cho hệ thống).
3. **Không khai báo mảng lớn trong hàm / trong vòng lặp & Tránh `s = s + c`:** Mảng lớn đặt trong hàm gây tràn bộ nhớ Stack (~8 MB $\to$ `RE`). Phép nối chuỗi `s = s + c` bên trong vòng lặp $N = 10^5$ không chỉ mất $O(N^2)$ thời gian mà còn liên tục cấp phát các bản sao chuỗi lớn — luôn dùng `s += c;`!

#### Bước 2: Ánh xạ vào lập trình C++
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;

// Hợp lệ hoàn toàn: tổng bộ nhớ chỉ ~1.2 MB << 256 MB
int a[MAXN];          // 400,020 bytes (~0.40 MB)
long long pref[MAXN]; // 800,040 bytes (~0.80 MB)

// CẢNH BÁO: Nếu mở dòng sau đây ở đề có Memory Limit 256 MB sẽ bị MLE!
// int bang2D[10005][10005]; // 100,100,025 * 4 bytes ~ 400.4 MB > 256 MB!

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, q;
    if (!(cin >> n >> q)) return 0;

    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        pref[i] = pref[i - 1] + a[i]; // Mảng cộng dồn 1D: chỉ tốn O(N) bộ nhớ!
    }

    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << pref[r] - pref[l - 1] << '\n'; // Trả lời mỗi truy vấn trong O(1)
    }
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Độ phức tạp không gian (`Space Complexity`):** Tổng dung lượng bộ nhớ (tính theo Big-O như $O(1)$, $O(N)$, $O(N^2)$) mà chương trình cần để lưu dữ liệu đầu vào và biến phụ.
- **Bộ nhớ phụ thêm (`Auxiliary Space`):** Dung lượng bộ nhớ bổ sung ngoài phần lưu đầu vào (ví dụ: đọc từng số trực tiếp để tính tổng chỉ tốn $O(1)$ bộ nhớ phụ).
- **Tràn giới hạn bộ nhớ (`Memory Limit Exceeded — MLE`):** Lỗi do tổng dung lượng các mảng toàn cục / dữ liệu cấp phát vượt trần RAM cho phép của đề (thường là 256 MB), khác với tràn **ngăn xếp lời gọi hàm / bộ nhớ stack** (~8 MB) gây lỗi `RE` (`Segmentation Fault`).

---

## 3. Bảng Tổng Hợp Các Bẫy Kinh Điển (`L1-04`)

| Loại lỗi / Bẫy | Tình huống gây lỗi thường gặp | Cách xử lý chuẩn CP |
| :--- | :--- | :--- |
| Quên nhân $T$ test | Thấy $N \le 10^4$, viết $O(N^2)$ mà quên đề có $T \le 10^4$ $\implies T \cdot N^2 = 10^{12}$ (`TLE`) | Luôn tính đủ $O(T \cdot f(N))$; chuyển sang $O(N)$, $O(\log N)$ hoặc $O(1)$ mỗi test |
| Vòng lặp ẩn trong hàm | Gọi `laNguyenTo(i)` $O(\sqrt{i})$ trong `for (i = 1..10^6)` $\implies O(N\sqrt{N}) \approx 10^9$ (`TLE`) | Hoặc tối ưu bên trong vòng lặp, hoặc dùng mảng sàng tiền xử lý |
| `strlen(s)` / nối `s = s + c` | Viết `for (i < strlen(s))` hoặc `ans = ans + s[i]` với $|s| = 2 \cdot 10^5 \implies O(|s|^2)$ (`TLE`) | Dùng `(int)s.size()` ($O(1)$) cho `string` và luôn nối chuỗi bằng `ans += s[i];` |
| Mảng 2D quá 256 MB | Khai báo `int dp[10005][10005];` tốn $10^8 \times 4\text{B} \approx 400\text{ MB} > 256\text{ MB}$ (`MLE`) | Tính nhẩm `hàng * cột * sizeof(kiểu) / 10^6`; giảm xuống mảng 1D `O(N)` hoặc `O(1)` |
| Nhầm Stack (~8 MB) với 256 MB | Khai báo `int a[3000000];` (~12 MB) bên trong `main()` hoặc hàm phụ (`RE`) | Luôn đưa mọi mảng kích thước lớn ra **toàn cục** phía trên `main()` |
