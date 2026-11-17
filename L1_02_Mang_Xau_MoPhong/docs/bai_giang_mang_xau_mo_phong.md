# Bài Giảng `L1-02` — Mảng 1D/2D, Xâu Ký Tự & Tư Duy Mô Phỏng

- **Mã chuyên đề:** `L1-02` (Tầng 1 — Pha 1: Nền tảng C++ Lớp 9)
- **Kiến thức tiền đề đã có (`MOD-Pre` + `MOD-CP0` + `L1-01`):**
  - Đã thuộc lòng **Bộ Khung Chuẩn CP**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`.
  - Đã nắm vững rẽ nhánh `if / else if / else`, vòng lặp `for`, `while`, `while (t--)`, `break`, `continue`, kiểu `long long`, ép kiểu `1LL` và chia lấy dư `%`.
  - Đã hiểu RAM là chiếc bàn làm việc tốc độ cao có giới hạn dung lượng.
- **Ranh giới Pha 1 Lớp 9:** Bài giảng này viết toàn bộ mã nguồn bên trong cửa chính `main()` và khai báo **mảng tĩnh toàn cục (`const int N = ...; int a[N];`)** ở phía trên `main()`, chỉ sử dụng mảng tĩnh, xâu `string`, vòng lặp và rẽ nhánh cơ bản.

---

## 1. Bức Tranh Toàn Cảnh: Vấn Đề Lớn Khi Dữ Liệu Cần "Nhớ Lại" Và Mô Phỏng Chuỗi Hành Động

Ở bài `L1-01`, **Anh Phụ Bếp Thật Thà** chỉ cần 1 chiếc hộp biến tạm `x` để đọc rồi cộng dồn điểm của $100.000$ lượt khách — đọc xong ai là vứt luôn phiếu người đó. Nhưng bước sang vòng thi đồng đội của **Ngày Hội Học Sinh Toàn Thành Phố**, Ban Tổ Chức đưa ra 3 thử thách khiến cách dùng "1 biến lẻ" **bế tắc hoàn toàn**:

1. **Bế tắc 1 — Không thể nhớ lại cả dãy số tới $10^6$ phần tử (và đặt tủ trong `main()` thì sập chương trình!):**
   Đề bài yêu cầu đọc điểm của $N \le 10^6$ học sinh, tính điểm trung bình cả trường, rồi đếm xem có **bao nhiêu bạn cao hơn trung bình** hoặc in lại danh sách theo thứ tự đảo ngược. Bạn bắt buộc phải *giữ lại toàn bộ $N$ con số* cùng lúc để duyệt lại lần thứ 2! Không ai có thể gõ 1 triệu cái tên `x1, x2, ..., x1000000`; còn nếu tạo một dãy tủ lớn ngay *bên trong* `main()`, chương trình sẽ lập tức sập nguồn vì tràn vùng nhớ cục bộ nhỏ hẹp (~8 MB)!
2. **Bế tắc 2 — Không thể quản lý bản đồ bảng lưới $R \times C$ và đếm tần suất tức thì:**
   Hội trường được xếp theo sơ đồ $R$ hàng $\times$ $C$ cột ô vuông, cần kiểm tra 4 ô xung quanh một vị trí; hoặc có $10^5$ phiếu bốc thăm đánh mã số $1..10^6$ và cần biết ngay mã nào xuất hiện nhiều nhất hoặc còn thiếu mà không thể chạy 2 vòng lặp lồng $O(N^2)$ (sẽ bị `TLE`)!
3. **Bế tắc 3 — Không thể đọc tên có dấu cách sau khi nhập số & hay sai khi mô phỏng từng bước:**
   Khi đọc một dòng họ tên nguyên vẹn như `Nguyen Van An` ngay sau `cin >> n;`, lệnh `cin >> s` chỉ lấy được mỗi chữ `"Nguyen"`, còn dùng `getline(cin, s)` ngay sau `cin >> n` lại bị đọc nhầm thành xâu rỗng! Ngoài ra, khi mô phỏng quá trình dịch chuyển hay đổi chỗ theo quy luật đề bài, chỉ sơ suất chạm biên hoặc cập nhật dẫm chân lên nhau là `WA` ngay.

> **Chiến lược giải quyết:** Tách bài toán lớn thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)** và giải quyết dứt điểm từng phần!

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Mảng Tĩnh 1 Chiều Toàn Cục (`const int N = 1e6 + 5; int a[N];`) & Bẫy Ngoài Biên (`Out of Bounds`)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Thay vì mua 1 triệu chiếc hộp lẻ rồi dán 1 triệu cái tên riêng `a1, a2, ..., a1000000`, bạn đặt đóng **một chiếc tủ dài gồm $N$ ngăn kéo xếp liền kề nhau**, tất cả đều dùng chung một cái tên là `a`, mỗi ngăn có một **biển số thứ tự** đặt trong ngoặc vuông `[i]`:
- Nếu quy ước đánh số từ `0` (`0-based`): tủ có `n` ngăn sẽ mang số từ `a[0]` đến `a[n - 1]`.
- Nếu quy ước đánh số từ `1` (`1-based`) cho khớp đề bài CP: ta đặt đóng dư vài ngăn (ví dụ `1e6 + 5` ngăn) rồi chỉ dùng các ngăn `a[1]` đến `a[n]`.

**Tại sao PHẢI đặt chiếc tủ khổng lồ bên ngoài `main()`?**
Hãy nhớ lại hình ảnh chiếc bàn làm việc RAM. Bên trong căn phòng `main()`, Anh Thật Thà chỉ có một chiếc **bàn gấp cục bộ rất nhỏ (~8 MB)** — chỉ đủ đặt khoảng 2 triệu số `int` (tương đương ~8 MB). Nếu bạn kê một chiếc tủ `3.000.000` số `int` (~12 MB) hoặc `10.000.000` số `int` (~40 MB) ngay lên cái bàn nhỏ trong `main()`, mặt bàn sập gãy ngay lập tức (*tràn ngăn xếp* / `Segmentation Fault`)!
Ngược lại, nếu đặt chiếc tủ **bên ngoài và phía trên `main()`** (gọi là khai báo toàn cục), chiếc tủ được cất trong **nhà kho dữ liệu tĩnh cực rộng (~256 MB)** của hệ thống, vừa chứa thoải mái hàng chục triệu số vừa được ban quản lý **dọn sạch toàn bộ về `0`** trước khi `main()` bắt đầu chạy!

**Cảnh báo Bẫy Ngoài Biên (`Out of Bounds`):**
Nếu tủ chỉ đóng 5 ngăn (`0..4`) mà bạn ra lệnh mở `a[5]` hoặc `a[-1]`, Anh Thật Thà không biết kiểm tra đâu — anh ấy thò tay sang ngăn kéo nhà hàng xóm hoặc sờ nhầm vào vùng cấm, gây ra kết quả rác ngẫu nhiên hoặc sập chương trình (`Runtime Error`).

#### Bước 2: Ánh xạ vào lập trình C++
```cpp
#include <bits/stdc++.h>
using namespace std;

// ĐẶT NGOÀI main(): dùng vùng nhớ dữ liệu tĩnh (~256MB), tự động khởi tạo = 0
const int N = 1e6 + 5;
int a[N];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;

    long long tong = 0;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        tong += a[i];
    }

    // Duyệt lại lần 2: đếm phần tử lớn hơn trung bình (tránh chia thực sai số)
    int dem = 0;
    for (int i = 1; i <= n; i++) {
        if (1LL * a[i] * n > tong) {
            dem++;
        }
    }
    cout << dem << '\n';

    // Duyệt cặp kề (a[i], a[i + 1]) AN TOÀN: i chỉ chạy tới n - 1 (i < n)!
    int capTang = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] < a[i + 1]) {
            capTang++;
        }
    }
    cout << capTang << '\n';

    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Mảng tĩnh 1 chiều (`1D Static Array`):** Dãy các ô nhớ cùng kiểu nằm liên tiếp trong RAM, truy cập trực tiếp bất kỳ ô nào qua chỉ số `a[i]` chỉ tốn đúng **1 bước ($O(1)$)**.
- **Chỉ số mảng (`Array Index`):** Số thứ tự đặt trong `[...]`; mảng kích thước `N` chỉ hợp lệ từ `0` đến `N - 1`. Luôn khai báo dư `+ 5` (như `const int N = 1e6 + 5;`) để dùng thoải mái chỉ số `1..n`.
- **Biến toàn cục vs Biến cục bộ (`Global vs Local Variable`):** Khai báo ngoài `main()` nằm trong **vùng nhớ dữ liệu tĩnh (~256 MB)** và tự có giá trị `0`; khai báo trong `main()` nằm trong **ngăn xếp cục bộ nhỏ hẹp (~8 MB)** và chứa rác ngẫu nhiên nếu quên gán.
- **Truy cập ngoài biên (`Out of Bounds`):** Đọc/ghi vào vị trí `< 0` hoặc `>= N` (hoặc vọt sang phần tử `a[n + 1]` chưa nhập), gây `WA` hoặc `RE`.

---

### 2.2. Vấn Đề Nhỏ 2: Mảng 2 Chiều (Lưới Ô Vuông) & Mảng Đếm Tần Suất (`Frequency Array`)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
1. **Mảng 2 chiều (Bảng lưới ô vuông):** Khi sơ đồ hội trường có $R$ hàng và $C$ cột như bàn cờ vua, ta ghép các ngăn kéo thành một **kệ lưới $R$ hàng, $C$ cột**. Quy tắc đọc tọa độ bất di bất dịch trong C++ là **Hàng trước, Cột sau: `a[hang][cot]`**.
   Khi đứng tại ô `(r, c)` và muốn ngó sang **4 ô lân cận** (Trên `r - 1`, Dưới `r + 1`, Trái `c - 1`, Phải `c + 1`), luôn nhớ kiểm tra xem ô mới `(nr, nc)` có bị rơi ra ngoài mép bảng `[1..R] x [1..C]` hay không trước khi mở tủ `a[nr][nc]`!
2. **Mảng đếm tần suất / đánh dấu (`Frequency Array`):** Nếu có $10^5$ phiếu ghi mã số $x \in [1, 10^6]$ và ta muốn biết mã nào xuất hiện mấy lần (hoặc mã nào bị thiếu), ta chuẩn bị sẵn **1 dãy hòm đánh số `cnt[1..1000000]` đều bằng `0`**. Cứ đọc được số `x`, ta bước thẳng tới hòm số `x` và bỏ thêm 1 vạch (`cnt[x]++`). Chi phí thống kê chỉ là **1 bước cho mỗi số**, nhanh gấp hàng trăm nghìn lần so với tìm kiếm lặp đi lặp lại!
   *Giới hạn vàng của mảng đếm:* Chỉ dùng giá trị `x` làm chỉ số khi `0 <= x <= 10^6` (vì mảng kích thước $10^9$ tốn $4\text{ GB}$ RAM sẽ bị `MLE`!). Và nếu chạy nhiều bộ test `while (t--)`, **nhớ xóa sạch về `0`** các ô đã dùng sau mỗi bộ test!

#### Bước 2: Ánh xạ vào lập trình C++
```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXR = 505;
const int MAXV = 1000005;

int grid[MAXR][MAXR]; // Bảng 2D toàn cục (~1MB)
int cnt[MAXV];        // Mảng đếm toàn cục (~4MB), tự khởi tạo = 0

// Mảng bước đi 4 hướng: Lên, Xuống, Trái, Phải
const int dr[4] = {-1, 1, 0, 0};
const int dc[4] = {0, 0, -1, 1};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Đọc bảng 2 chiều R hàng C cột và tính tổng 4 ô kề của (sr, sc)
    int r, c, sr, sc;
    cin >> r >> c >> sr >> sc;
    for (int i = 1; i <= r; i++) {
        for (int j = 1; j <= c; j++) {
            cin >> grid[i][j];
        }
    }

    long long tongKe = 0;
    for (int dir = 0; dir < 4; dir++) {
        int nr = sr + dr[dir];
        int nc = sc + dc[dir];
        if (nr >= 1 && nr <= r && nc >= 1 && nc <= c) {
            tongKe += grid[nr][nc];
        }
    }
    cout << tongKe << '\n';

    // 2. Đếm tần suất xuất hiện của dãy m số trong [0, 10^6]
    int m;
    cin >> m;
    int maxVal = 0;
    for (int i = 1; i <= m; i++) {
        int x;
        cin >> x;
        cnt[x]++;
        if (x > maxVal) maxVal = x;
    }

    // Tìm số xuất hiện nhiều nhất
    int ansVal = 0, bestFreq = 0;
    for (int v = 0; v <= maxVal; v++) {
        if (cnt[v] > bestFreq) {
            bestFreq = cnt[v];
            ansVal = v;
        }
    }
    cout << ansVal << " " << bestFreq << '\n';

    // Reset sạch phần đã dùng nếu còn bộ test tiếp theo
    for (int v = 0; v <= maxVal; v++) {
        cnt[v] = 0;
    }

    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Mảng 2 chiều (`2D Array` / `Matrix`):** Khai báo `int a[MAXR][MAXC];`, lưu bảng dữ liệu theo hàng `i` và cột `j`. Chú ý tính dung lượng: `505 * 505 * 4 byte ≈ 1 MB` (an toàn), nhưng `10005 * 10005 * 4 byte ≈ 400 MB` (quá giới hạn `256 MB` gây `MLE`!).
- **Mảng hướng đi (`Direction Arrays: dr[], dc[]`):** Hai mảng nhỏ gồm 4 (hoặc 8) độ dịch tọa độ giúp gộp 4 đoạn `if` dài dòng thành 1 vòng lặp `for (int d = 0; d < 4; d++)` gọn sạch, luôn đi kèm kiểm tra biên bảng.
- **Mảng đếm tần suất / đánh dấu (`Frequency / Marking Array`):** Dùng chính giá trị `x` làm chỉ số `cnt[x]` (hoặc `bool visited[x]`) để đếm hoặc đánh dấu sự xuất hiện trong $O(1)$.

---

### 2.3. Vấn Đề Nhỏ 3 & Ghép Lại: Xâu Ký Tự (`std::string`), Mã ASCII, Bẫy `getline` & Tư Duy Mô Phỏng + Chia Trường Hợp

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
1. **Xâu ký tự `string` & Bảng mã ASCII:**
   `string s` là một **chuỗi hạt chữ cái** đánh số từ `0` đến `s.size() - 1` (gồm ký tự `'a'..'z'`, `'A'..'Z'`, `'0'..'9'`, dấu cách `' '`). Mỗi ký tự thực chất là một con số nguyên nhỏ trong **bảng mã ASCII**:
   - `'0'` tới `'9'` nằm liên tiếp (`48..57`) &rarr; đổi ký tự `'7'` thành số `7`: lấy `'7' - '0'`.
   - `'A'` tới `'Z'` nằm liên tiếp (`65..90`) &rarr; đổi chữ hoa `c` thành thường: `c - 'A' + 'a'`.
   - `'a'` tới `'z'` nằm liên tiếp (`97..122`) &rarr; đếm tần suất 26 chữ cái: dùng mảng `int cnt[26]` tại vị trí `c - 'a'`!
   *Cẩn thận kiểu trả về của `s.size()`:* Trong C++, `s.size()` trả về kiểu **số nguyên không dấu** (không thể mang giá trị âm). Nếu `s` rỗng (`s.size() == 0`) mà bạn viết `s.size() - 1`, phép trừ số không dấu bị "lật vòng" thành một số dương khổng lồ ($\approx 1.8 \times 10^{19}$) khiến vòng lặp chạy loạn! **Thói quen vàng:** Luôn ép `(int)s.size()` khi làm phép trừ hoặc so sánh với số nguyên `int`!

2. **Bẫy `getline(cin, s)` ngay sau `cin >> n`:**
   Khi người dùng nhập số `3` rồi nhấn phím **Enter (`\n`)**, lệnh `cin >> n` chỉ gắp mỗi số `3`, bỏ lại ký tự `\n` nằm chắn ngay đầu khe đọc! Nếu ngay sau đó bạn gọi `getline(cin, s)` để đọc một câu có dấu cách, `getline` chạm ngay dấu `\n` thừa đó tưởng đã hết dòng nên trả về **xâu rỗng `""`**!
   **Cách giải quyết:** Gọi `cin.ignore();` ngay giữa `cin >> n;` và `getline(cin, s);` để Anh Thật Thà nuốt bỏ dấu `\n` thừa trước khi đọc dòng chữ!

3. **Tư duy Mô phỏng (`Simulation`) & Chia trường hợp (`Casework`):**
   - **Mô phỏng (`Simulation`):** Làm lại từng bước đúng y hệt quy luật câu chuyện đề bài mô tả (ví dụ: qua mỗi giây các bạn `'B'` đứng trước `'G'` đổi chỗ thành `'GB'`, hoặc robot bước theo chuỗi `'U', 'D', 'L', 'R'`).
     *Mẹo sống còn:* Chú ý **xung đột cập nhật đồng thời** — khi `hang[i]` và `hang[i + 1]` vừa đổi `'BG'` thành `'GB'` ở giây này, nhớ `i++` nhảy qua bạn vừa đổi để không đẩy một cậu bé chạy tuốt về cuối hàng chỉ trong 1 giây!
   - **Chia trường hợp (`Casework`):** Chia toàn bộ tình huống có thể xảy ra thành các nhánh **rời nhau (không trùng lặp) và phủ kín (không bỏ sót)** — ví dụ: kiểm tra một xâu có xếp lại thành đối xứng (`Palindrome`) được không dựa trên số lượng chữ cái xuất hiện **số lẻ lần** (`0` lẻ, `1` lẻ, hay $\ge 2$ lẻ).

#### Bước 2: Ánh xạ vào lập trình C++
```cpp
#include <bits/stdc++.h>
using namespace std;

int demChu[26]; // Đếm tần suất 26 chữ cái 'a'..'z' (toàn cục = 0)

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Đọc n dòng văn bản có khoảng trắng sau khi nhập số n
    int n;
    cin >> n;
    cin.ignore(); // Xóa ký tự '\n' còn kẹt lại sau cin >> n!

    for (int dong = 1; dong <= n; dong++) {
        string s;
        getline(cin, s);
        for (int i = 0; i < (int)s.size(); i++) {
            char c = s[i];
            if (c >= 'A' && c <= 'Z') {
                c = c - 'A' + 'a';
            }
            if (c >= 'a' && c <= 'z') {
                demChu[c - 'a']++;
            }
        }
    }

    // 2. Mô phỏng hàng đợi BG -> GB qua t giây
    int len, t;
    string hang;
    cin >> len >> t >> hang;
    for (int giay = 1; giay <= t; giay++) {
        for (int i = 0; i + 1 < (int)hang.size(); i++) {
            if (hang[i] == 'B' && hang[i + 1] == 'G') {
                char tam = hang[i];
                hang[i] = hang[i + 1];
                hang[i + 1] = tam;
                i++; // Tránh 1 bạn 'B' nhảy nhiều bước trong cùng 1 giây!
            }
        }
    }
    cout << hang << '\n';

    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Xâu ký tự (`std::string`):** Dãy ký tự co giãn tiện lợi hỗ trợ `s[i]`, `s.size()`, nối xâu `+`, so sánh từ điển `==`, `<`, `>`.
- **Mã ASCII (`ASCII Code`):** Bảng quy đổi ký tự thành số nguyên (`'0'=48`, `'A'=65`, `'a'=97`). Mọi chữ cái cùng loại xếp liền nhau nên chỉ cần phép trừ ký tự `c - 'a'` hoặc `c - '0'`.
- **Tràn số không dấu (`Unsigned Underflow`):** Vì `s.size()` trả về số không dấu, `(0 - 1)` biến thành số dương cực đại. Luôn ép `(int)s.size()` trước khi trừ `1`.
- **Mô phỏng (`Simulation`) & Chia trường hợp (`Casework`):** Hai kỹ năng cài đặt nền tảng giúp biến mô tả đời thực thành code chạy chính xác mọi tình huống biên.

---

## 3. Bảng Tổng Hợp Các Bẫy Kinh Điển & Phân Tích Chi Phí (`L1-02`)

| Chủ đề | Bẫy thường gặp (gây RE / MLE / WA) | Cách xử lý chuẩn CP |
| :--- | :--- | :--- |
| Mảng lớn trong `main()` | Khai báo `int a[3000000];` trong `main()` gây tràn bộ nhớ ngăn xếp (~8 MB) hoặc mang giá trị rác | Đặt toàn cục ngoài `main()`: `const int N = ...; int a[N];` (vùng tĩnh ~256 MB, tự `= 0`) |
| Ngoài biên mảng (`OOB`) | Duyệt `for (int i = 1; i <= n; i++)` rồi truy cập `a[i + 1]`, hoặc đọc ô `(nr, nc)` ngoài bảng 2D | Luôn lặp tới `i < n` khi đọc `a[i + 1]`; luôn kiểm tra `1 <= nr && nr <= r && 1 <= nc && nc <= c` |
| Mảng đếm tần suất | Dùng mảng đếm cho giá trị tới $10^9$ (gây `MLE`), hoặc quên reset `cnt` giữa nhiều bộ test `while (t--)` | Chỉ dùng khi giá trị nhỏ ($\le 10^6$); nhớ gán `= 0` các phần tử đã dùng sau mỗi test |
| `s.size() - 1` | Viết `i < s.size() - 1` khi `s` có thể rỗng (`s.size() == 0`), gây tràn không dấu | Luôn viết `(int)s.size() - 1` hoặc `i + 1 < (int)s.size()` |
| `getline` sau `cin >>` | Gọi `getline(cin, s)` ngay sau `cin >> n` khiến `s` đọc nhầm dấu `\n` thành xâu rỗng | Thêm `cin.ignore();` ngay trước khi gọi `getline(cin, s)` |
| Mô phỏng tại chỗ | Đổi `hang[i]` và `hang[i + 1]` rồi vòng `for` tự `i++` xét tiếp ngay vị trí `i + 1` vừa đổi | Tăng thêm `i++` sau khi hoán đổi nếu mỗi phần tử chỉ được đổi 1 lần mỗi lượt |

- **Độ phức tạp bài toán ở `L1-02`:**
  - Duyệt mảng 1 chiều hoặc xâu ký tự độ dài $N$: Thời gian $O(N)$, Bộ nhớ $O(N)$. Với $N \le 10^6$, mảng `int a[1000005]` chỉ tốn $\approx 4\text{ MB}$ RAM và chạy chưa tới $0.05$ giây.
  - Duyệt bảng lưới 2 chiều $R \times C$: Thời gian $O(R \cdot C)$, Bộ nhớ $O(R \cdot C)$. Với $R, C \le 500$, bảng $505 \times 505$ kiểu `int` chỉ tốn $\approx 1\text{ MB}$ RAM.
  - Mô phỏng trực tiếp $T$ bước trên xâu/mảng cỡ $N$: Thời gian $O(T \cdot N)$ — cần kiểm tra tích $T \cdot N \le 10^7..10^8$ để tránh `TLE`!
