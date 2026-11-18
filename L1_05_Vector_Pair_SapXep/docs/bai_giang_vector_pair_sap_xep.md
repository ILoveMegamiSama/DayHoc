# Bài Giảng `L1-05` — `std::vector`, `pair` & Sắp Xếp (`std::sort`) — Mở Khóa Pha 2 STL

- **Mã chuyên đề:** `L1-05` (Tầng 1 — **Mở Khóa Pha 2: Thư Viện Chuẩn STL**)
- **Kiến thức tiền đề đã có (`MOD-Pre` + `MOD-CP0` + `L1-01` $\rightarrow$ `L1-04`):**
  - Đã thành thạo **Bộ Khung Chuẩn CP**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`.
  - Đã vững `if/else`, `for/while/while (t--)`, `long long`, `%`, xâu `std::string`, mảng tĩnh toàn cục `const int MAXN = ...; int a[MAXN];`.
  - Đã nắm rõ hàm `void` / `return`, truyền tham chiếu `&` cho biến nguyên thủy, ranh giới **bộ nhớ Stack (~8 MB)** với **vùng dữ liệu tĩnh / Heap (~256 MB)**, cùng quy tắc Big-O và $\sim 10^8$ phép tính/giây.
- **Cột mốc chuyển Pha 2:** Từ bài `L1-05`, bạn chính thức bước từ **Pha 1 (mảng tĩnh toàn cục)** sang **Pha 2 (STL — Thư viện chuẩn C++)**: mở khóa `std::vector<T>`, truyền `vector<T>&` / `const vector<T>&`, `std::pair<T1, T2>`, `std::sort` $O(N \log N)$ và Custom Comparator. *(Các cấu trúc `set`, `map`, `priority_queue`, `deque` sẽ học ở `L1-06`, còn `lower_bound`/`upper_bound` sẽ học ở `L2-02`.)*

---

## 1. Bức Tranh Toàn Cảnh: Vấn Đề Lớn Khi Quản Lý Giải Đấu $10^5$ Thí Sinh

Giả sử bạn được giao viết hệ thống xử lý kết quả cho một kỳ thi Tin học có **$N \le 10^5$ thí sinh** chia vào $K \le 10^4$ câu lạc bộ khác nhau. Mỗi thí sinh gồm: **mã số gốc**, **số bài giải được ($p$)** và **tổng thời gian phạt ($t$)**. Khi làm bằng công cụ Pha 1 (mảng tĩnh), ta đụng ngay **3 bế tắc lớn**:

1. **Bế tắc 1 — Mảng tĩnh cố định lãng phí RAM hoặc tràn MLE:** Có CLB chỉ có 2 bạn, có CLB lại có $50\,000$ bạn. Nếu tạo mảng 2 chiều tĩnh `int clb[10005][50005];`, bộ nhớ vọt lên hơn **$2 \text{ GB} \gg 256 \text{ MB}$** (chết MLE ngay trước khi chạy!). Hơn nữa, nếu đặt mảng lớn trong hàm cục bộ lại tràn Stack (~8 MB), còn truyền mảng qua hàm sai cách lại bị copy chậm $O(N)$ dẫn tới TLE!
2. **Bế tắc 2 — Rời rạc dữ liệu và sắp xếp $O(N^2)$ bị TLE:** Nếu chỉ nhét điểm vào một mảng riêng rồi tự viết 2 vòng lặp sắp xếp chọn/nổi bọt $O(N^2)$, với $N = 10^5$ chương trình phải chạy $\sim 5 \times 10^9$ phép so sánh ($\sim 50$ giây $\rightarrow$ TLE!). Chưa kể sau khi đổi chỗ điểm số, ta mất sạch dấu vết xem điểm đó thuộc về thí sinh nào!
3. **Bế tắc 3 — Luật xếp hạng nhiều tiêu chí & bẫy crash chương trình:** Bảng xếp hạng yêu cầu: **ai giải nhiều bài hơn đứng trước; bằng số bài thì ai ít phút phạt hơn đứng trước**. Nếu tự viết hàm so sánh bằng dấu `<=` hoặc `>=`, chương trình rất dễ sập giữa chừng (RE / Segmentation Fault) trên bộ test có các thí sinh bằng điểm nhau!

> **Chiến lược giải quyết:** Tách bài toán quản lý và xếp hạng dữ liệu quy mô $10^5$ thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)**, lần lượt mở khóa bộ ba quyền lực của Pha 2 STL: `std::vector`, `std::pair` + `std::sort`, và Custom Comparator chuẩn Strict Weak Ordering!

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: `std::vector<T>`, Bộ Nhớ Heap & Truyền Tham Chiếu (`vector&` / `const vector&`)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Tại sao mảng tĩnh bị bó tay với danh sách có độ dài bất kỳ?** Mảng tĩnh giống như **tủ sắt hàn chết 100 ngăn** từ trước khi mở cửa hàng: nếu chỉ có 3 khách thì bỏ trống 97 ngăn lãng phí; nếu có $50\,000$ khách ở 1 phòng và 2 khách ở phòng khác thì bảng vuông hàn cứng sẽ tốn hàng tỷ ô trống.
- **`std::vector` giống như chiếc balo dây rút thông minh:** Ban đầu rỗng không tốn chỗ, có thêm món nào lại nới rộng vừa khít món đó (`push_back`), cần bớt món cuối thì rút ra (`pop_back`), muốn biết đang chứa bao nhiêu đồ thì nhìn nhãn đếm (`size()`).
- **Vị trí trên bàn làm việc RAM (Heap vs Stack):** Ở `L1-03`, ta biết khai báo `int a[1000000];` bên trong `main()` sẽ làm sập ngăn xếp Stack (~8 MB). Nhưng `vector<int> a(1000000);` trong `main()` lại **an toàn tuyệt đối**! Vì trên Stack, `vector` chỉ đặt một **tấm thẻ quản lý nhỏ xíu 24 byte** (ghi địa chỉ và kích thước), còn toàn bộ $1\,000\,000$ ô dữ liệu thật được gửi sang **kho Heap rộng lớn (~256 MB)**!
- **Cạm bẫy photocopy khi nhờ trợ lý (truyền vào hàm):** Nếu viết hàm `long long tinhTong(vector<int> a)` (không có dấu `&`), mỗi lần gọi hàm là máy tính **photocopy toàn bộ $N$ phần tử** ra một bản sao mới! Nếu gọi $Q = 10^5$ lần trên vector $N = 10^5$, tổng số lượt copy là $10^{10}$ (chắc chắn TLE!). Giải pháp:
  - Chỉ đọc: dùng `const vector<int>& a` — đưa thẳng **chìa khóa đọc** vào bản gốc trong $O(1)$, vừa nhanh vừa chống sửa nhầm.
  - Cần thay đổi dữ liệu gốc: dùng `vector<int>& a` — đưa chìa khóa toàn quyền trong $O(1)$.

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

// 1. Chỉ đọc -> const vector<int>& (truyền địa chỉ trong O(1), không copy O(N)!)
long long tinhTong(const vector<int>& a) {
    long long s = 0;
    for (int i = 0; i < (int)a.size(); i++) {
        s += a[i];
    }
    return s;
}

// 2. Cần thay đổi vector gốc -> vector<int>& (truyền tham chiếu trong O(1))
void tangThem(vector<int>& a, int delta) {
    for (int i = 0; i < (int)a.size(); i++) {
        a[i] += delta;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Khởi tạo & thêm/bớt phần tử
    vector<int> ds;
    ds.push_back(10);
    ds.push_back(20);
    ds.push_back(30);
    ds.pop_back(); // Còn {10, 20}

    // Mảng 2 chiều răng cưa (k hàng có độ dài tùy ý, tổng phần tử <= 10^5 rất nhẹ!)
    int k = 3;
    vector<vector<int>> clb(k);
    clb[0].push_back(1);
    clb[0].push_back(2);
    clb[1].push_back(5); // clb[2] vẫn rỗng, không tốn thêm ô nhớ thừa!

    // BẪY SỐ KHÔNG DẤU: v.size() trả về size_t (không âm)
    // Nếu v rỗng, viết v.size() - 1 sẽ tràn thành ~1.8 * 10^19!
    // Luôn ép kiểu (int)v.size() hoặc viết i + 1 < (int)v.size()
    vector<int> rong;
    for (int i = 0; i + 1 < (int)rong.size(); i++) {
        cout << rong[i] << '\n'; // Không chạy khi rỗng -> an toàn tuyệt đối!
    }

    tangThem(ds, 5);
    cout << tinhTong(ds) << '\n'; // (10+5) + (20+5) = 40
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **`std::vector<T>` (Mảng động / `Dynamic Array`):** Thùng chứa co giãn tự động lưu các phần tử kiểu `T` liên tiếp trên vùng nhớ **Heap** (tương ứng chiếc balo dây rút); truy cập ngẫu nhiên `v[i]` mất $O(1)$, thêm/xóa cuối `push_back`/`pop_back` mất $O(1)$ trung bình (khấu hao).
- **Truyền tham chiếu hằng (`const vector<T>&`):** Truyền địa chỉ bản gốc ở chế độ chỉ đọc (không tạo bản sao $O(N)$, cũng không cho phép hàm làm hỏng dữ liệu gốc).
- **Tràn số không dấu (`Unsigned Underflow` của `v.size()`):** Kiểu trả về `size_t` không chứa được số âm, nên khi `v` rỗng (`size == 0`), phép `v.size() - 1` quay vòng thành $2^{64} - 1 \approx 1.84 \times 10^{19}$; luôn ép `(int)v.size()` trước khi làm phép trừ!

---

### 2.2. Vấn Đề Nhỏ 2: `std::pair<T1, T2>` & `std::sort` — Từ $O(N^2)$ Xuống $O(N \log N)$

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Kẹp giấy gắn 2 tờ thông tin (`pair`):** Nếu điểm thi và mã số thí sinh nằm ở hai mảng rời rạc, khi bạn đổi chỗ điểm số để xếp hạng thì **điểm đi đằng điểm, tên đi đằng tên**! `std::pair<T1, T2>` giống như **chiếc kẹp giấy ghim chặt 2 tờ giấy** thành một hồ sơ duy nhất: tờ trước gọi là `.first`, tờ sau gọi là `.second`. Khi đổi chỗ 2 hồ sơ, cả điểm số lẫn mã số đi cùng nhau không bao giờ thất lạc!
- **Quy tắc so sánh mặc định của `pair`:** Khi đặt hai hồ sơ lên bàn để sắp xếp tăng dần, máy tính luôn **nhìn tờ `.first` trước**. Chỉ khi hai tờ `.first` bằng hệt nhau, máy tính mới liếc tiếp sang **tờ `.second`** để phân thắng bại. Vì vậy, muốn sắp theo tiêu chí nào mặc định, hãy đặt tiêu chí đó vào `.first`!
- **Bí quyết xếp $10^5$ hồ sơ trong tích tắc (`std::sort`):** Tự viết 2 vòng lặp so sánh từng cặp tốn $O(N^2) \approx 5 \times 10^9$ bước cho $N = 10^5$ (chết TLE!). Hàm `sort(v.begin(), v.end())` có sẵn trong thư viện `<algorithm>` (đã nằm trong `<bits/stdc++.h>`) sử dụng thuật toán lai ghép tối ưu chạy trong **$O(N \log N)$**: với $N = 10^5$, số bước chỉ khoảng $1.7 \times 10^6$ ($\approx 0.02$ giây — nhanh gấp hàng nghìn lần!).

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Gắn {điểm, mã gốc} vào vector<pair<int, int>>
    int n = 4;
    vector<pair<int, int>> ds;
    ds.push_back(make_pair(85, 1));
    ds.push_back({95, 2}); // C++11/14 hỗ trợ khởi tạo nhanh bằng {a, b}
    ds.push_back({85, 3});
    ds.push_back({70, 4});

    // 2. Sắp xếp tăng dần mặc định:
    //    So .first (điểm) tăng dần; nếu .first bằng nhau, so .second (mã gốc) tăng dần!
    sort(ds.begin(), ds.end());

    for (int i = 0; i < n; i++) {
        cout << ds[i].first << " (ID #" << ds[i].second << ")\n";
    }

    // 3. Với vector<int> bình thường muốn sắp GIẢM DẦN nhanh:
    vector<int> diem = {3, 9, 1, 7};
    sort(diem.begin(), diem.end(), greater<int>());
    // Kết quả: 9 7 3 1

    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **`std::pair<T1, T2>`:** Kiểu cấu trúc ghép 2 giá trị (có thể khác kiểu, như `pair<int, string>`) truy cập qua `.first` và `.second`; hỗ trợ tạo nhanh bằng `{a, b}` hoặc `make_pair(a, b)`, và có sẵn phép so sánh từ điển (so `.first` trước, bằng nhau mới so `.second`).
- **`std::sort(begin, end)`:** Hàm sắp xếp chuẩn của STL chạy trong **$O(N \log N)$** trên nửa khoảng `[begin, end)` (từ vị trí đầu tới **ngay sau** vị trí cuối, ví dụ `v.begin(), v.end()`, hoặc `a + 1, a + n + 1` nếu dùng mảng tĩnh 1-indexed).

---

### 2.3. Vấn Đề Nhỏ 3: Custom Comparator & Bẫy Chết Người `<=` (Strict Weak Ordering)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Khi luật thi đấu không giống thứ tự mặc định:** Dùng `sort` mặc định trên `pair<int, int>` thì cả hai thành phần đều tăng dần. Nhưng bảng xếp hạng thật lại đòi hỏi: **số bài `.first` GIẢM DẦN**, còn nếu bằng số bài thì **phút phạt `.second` TĂNG DẦN**! Hoặc bài toán phân công yêu cầu sắp xếp theo hiệu `b - a` tăng dần!
- **Trọng tài so sánh (`Custom Comparator`):** Ta viết một hàm trọng tài nhỏ `bool cmp(const T& a, const T& b)` đưa vào tham số thứ 3 của `sort`. Mỗi lần `sort` cần biết giữa `a` và `b` ai đứng trước, nó hỏi trọng tài: *"Đặt `a` đứng TRƯỚC `b` có đúng luật không?"* — nếu đúng trả về `true`, ngược lại trả về `false`.
- **Cạm bẫy chết người mang tên `<=` và `>=` (Strict Weak Ordering):**
  Hãy tưởng tượng có 2 bạn **bằng điểm hệt nhau** (`a = 50`, `b = 50`), và bạn viết nhầm luật trọng tài thành `return a >= b;`. Khi máy tính hỏi *"50 đứng trước 50 được không?"*, trọng tài đáp `true`! Rồi đổi chỗ hỏi ngược lại *"50 kia đứng trước 50 này được không?"*, trọng tài lại đáp `true`! Thuật toán chia nhóm bên trong `std::sort` bị rối loạn logic, con trỏ chạy vọt ra ngoài vùng nhớ của vector và **đánh sập chương trình ngay lập tức (`Runtime Error / Segmentation Fault`)**!
  **Quy tắc vàng bất di bất dịch:** Trọng tài chỉ được phép trả lời `true` khi `a` **THẬT SỰ ĐỨNG TRƯỚC NGHIÊM NGẶT** so với `b` (luôn dùng `<` hoặc `>`, **TUYỆT ĐỐI KHÔNG BAO GIỜ** dùng `<=` hoặc `>=`, kể cả ở điều kiện cuối cùng!).

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

// Gói 3 thông tin: {{soBai, phutPhat}, maDoi}
typedef pair<pair<int, int>, int> DoiThi;

// Truyền const DoiThi& để KHÔNG copy dữ liệu trong quá trình so sánh!
bool cmpXepHang(const DoiThi& a, const DoiThi& b) {
    if (a.first.first != b.first.first) {
        return a.first.first > b.first.first; // Nhiều bài hơn đứng trước
    }
    if (a.first.second != b.first.second) {
        return a.first.second < b.first.second; // Ít phút phạt hơn đứng trước
    }
    return a.second < b.second; // Mã nhỏ hơn đứng trước (LUÔN dùng '<', CẤM '<='!)
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<DoiThi> bxh = {
        {{4, 150}, 1},
        {{5, 220}, 2},
        {{4, 120}, 3},
        {{4, 120}, 4}
    };

    sort(bxh.begin(), bxh.end(), cmpXepHang);

    for (int i = 0; i < (int)bxh.size(); i++) {
        cout << "Doi #" << bxh[i].second << ": "
             << bxh[i].first.first << " bai, "
             << bxh[i].first.second << " phut\n";
    }
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Hàm so sánh tùy biến (`Custom Comparator`):** Hàm `bool cmp(const T& a, const T& b)` truyền làm đối số thứ 3 cho `std::sort` để định nghĩa thứ tự ưu tiên riêng theo nhiều tiêu chí hoặc theo biểu thức tính toán.
- **Thứ tự yếu nghiêm ngặt (`Strict Weak Ordering`):** Luật toán học bắt buộc đối với `cmp`:
  1. **Phi phản xạ (`Irreflexive`):** `cmp(x, x)` bắt buộc phải bằng `false` (một phần tử không thể đứng trước chính nó — lý do tuyệt đối cấm `<=` và `>=`!).
  2. **Bất đối xứng (`Asymmetric`):** Nếu `cmp(a, b) == true` thì `cmp(b, a)` phải bằng `false`.
  3. **Bắc cầu:** Nếu `a` trước `b` và `b` trước `c` thì `a` phải trước `c`.

---

## 3. Bảng Tổng Hợp Độ Phức Tạp & Bộ Nhớ

| Thao tác / Cấu trúc | Thời gian | Bộ nhớ / Ghi chú thực chiến |
| :--- | :--- | :--- |
| `v[i]`, `v.back()`, `v.size()`, `v.empty()` | $O(1)$ | Lưu dữ liệu trên Heap (~256 MB), Stack chỉ giữ 24 byte |
| `v.push_back(x)`, `v.pop_back()` | $O(1)$ khấu hao | Tự nới dung lượng gấp đôi khi đầy |
| `vector<int> v(n, val)` / `v.resize(n)` | $O(N)$ | Tốn $4N$ byte (với `int`) hoặc $8N$ byte (với `long long`) |
| Truyền `const vector<T>&` hoặc `vector<T>&` | **$O(1)$** | Chỉ truyền địa chỉ, bắt buộc dùng khi vector nằm trong hàm |
| Truyền `vector<T>` (tham trị, quên `&`) | **$O(N)$** | Tạo bản sao toàn bộ vector $\rightarrow$ gọi $Q$ lần thành $O(Q \cdot N)$ **TLE**! |
| `sort(v.begin(), v.end())` / `sort(..., cmp)` | **$O(N \log N)$** | Chạy mượt với $N \le 10^5$–$5 \cdot 10^5$ trong 1.0s |
| Vòng lặp `for` lồng sắp xếp thủ công | $O(N^2)$ | Quá $10^8$ bước khi $N \ge 2 \cdot 10^4$ $\rightarrow$ **TLE** |

---

## 4. Danh Sách Kiểm Tra Tránh Bẫy Kinh Điển (Pitfalls Checklist)

1. **Quên `&` khi truyền `vector` hoặc `string` vào hàm / vào `cmp`:** Biến $O(1)$ thành $O(N)$ copy ngầm, hoặc sửa mãi mà bản gốc trong `main()` không thay đổi.
2. **Dùng `v.size() - 1` trực tiếp khi `v` có thể rỗng:** `size_t` là số không dấu nên `0 - 1` tràn thành $1.84 \times 10^{19}$, khiến vòng lặp chạy quá biên và crash (`RE`). Luôn viết `(int)v.size() - 1` hoặc `i + 1 < (int)v.size()`.
3. **Dùng `<=` hoặc `>=` trong Custom Comparator:** Vi phạm Strict Weak Ordering (`cmp(x, x) == true`), gây hành vi không xác định (`UB`) và dễ crash `Segmentation Fault` khi có phần tử bằng nhau.
4. **Khai báo lại kích thước khổng lồ sai quy mô RAM:** `vector<vector<int>> a(100000, vector<int>(100000))` vẫn đòi $10^{10} \times 4\text{ byte} \approx 40\text{ GB}$ ($\text{MLE}$!). Chỉ dùng `vector<vector<int>> a(k)` rỗng ban đầu rồi `push_back` khi tổng số phần tử $\sum m_i$ nhỏ (ví dụ $\sum m_i \le 2 \cdot 10^5$).
5. **Thứ tự trường trong `pair`:** Nếu dùng `sort` mặc định, tiêu chí ưu tiên số 1 bắt buộc phải đặt ở `.first`, không phải `.second`.
