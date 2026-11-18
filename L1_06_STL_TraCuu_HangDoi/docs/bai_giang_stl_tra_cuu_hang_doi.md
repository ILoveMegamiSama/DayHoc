# Bài Giảng `L1-06` — Bộ Công Cụ STL (`set`, `map`, `priority_queue`, `deque`)

- **Mã chuyên đề:** `L1-06` (Tầng 1 — Pha 2 STL Lớp 9)
- **Kiến thức tiền đề đã có (`MOD-Pre` + `MOD-CP0` + `L1-01` $\rightarrow$ `L1-05`):**
  - Đã thành thạo **Bộ Khung Chuẩn CP**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`.
  - Đã vững `if/else`, `for/while`, `long long`, xâu `std::string`, truyền tham chiếu `&` / `const &`, RAM Stack (~8 MB) vs Heap (~256 MB), phân tích Big-O và quy tắc $\sim 10^8$ phép tính/giây.
  - Đã làm chủ `std::vector<T>`, `(int)v.size()`, `std::pair<T1, T2>`, `std::sort` $O(N \log N)$, `greater<T>()` và Custom Comparator ở `L1-05`.
- **Kiến thức mới mở khóa ở `L1-06`:** `std::set<T>`, `std::multiset<T>` (`s.lower_bound(x)`, `s.upper_bound(x)`, bẫy `ms.erase(x)` vs `ms.erase(ms.find(x))`), `std::map<K, V>` (`mp.count(x)` tránh tạo khóa rác, né bẫy anti-hash $O(N^2)$ của `unordered_map`), `std::priority_queue` (Max-Heap & Min-Heap `greater<T>`) và `std::deque<T>` (thêm/xóa hai đầu $O(1)$). *(Kỹ thuật Chặt nhị phân trên mảng/đáp án sẽ học ở `L2-02`, còn ngăn xếp/hàng đợi chuyên sâu & BFS sẽ học ở `L2-03`.)*

---

## 1. Bức Tranh Toàn Cảnh: Hệ Thống Điều Hành Đấu Trường Trực Tuyến $10^5$ Sự Kiện

Ở bài `L1-05`, ta đã dùng `vector` + `sort()` để xếp hạng danh sách **tĩnh** (nhập xong hết một lần rồi mới sắp xếp). Nhưng nay bạn phải viết máy chủ điều hành một đấu trường trực tuyến có **$Q \le 10^5$ sự kiện xảy ra liên tục (online)** — vừa có người vào, vừa có người thoát, vừa phải trả lời ngay lập tức ở từng bước:

1. **Bế tắc 1 — Danh sách biến động liên tục & mất vé trùng giá:** Người chơi liên tục vào hoặc rời phòng với điểm Elo từ $1$ đến $10^9$. Mỗi lượt ghép cặp, bạn phải tìm ngay người đang rảnh có Elo nhỏ nhất $\ge X$ rồi xóa **đúng 1 vé** của người đó (dù nhiều người có cùng Elo!). Nếu dùng `vector` rồi `sort()` lại sau mỗi sự kiện, $Q = 10^5$ bước sẽ tốn $O(Q \cdot N \log N) \approx 10^{11}$ phép tính ($\rightarrow$ **TLE!**).
2. **Bế tắc 2 — Đếm điểm theo tên tài khoản hoặc ID tới $10^9$:** Cần cộng điểm và kiểm tra số điểm theo tên `string` hoặc mã số tới $10^9$. Mảng đếm tĩnh `cnt[1000000005]` đòi **4 GB RAM ($\rightarrow$ MLE)** và không thể lấy `string` làm chỉ số; còn dùng `unordered_map` trên Codeforces lại dễ dính test "anti-hash" đẩy thời gian lên $O(N^2)$ (**TLE**)!
3. **Bế tắc 3 — Bốc người mạnh nhất / yếu nhất & hàng chờ VIP hai đầu:** Cần liên tục bốc người có điểm lớn nhất (hoặc nhỏ nhất) rồi cập nhật điểm và trả lại vào danh sách trong $O(\log N)$, đồng thời quản lý một hàng chờ cho phép **chèn đầu cho thẻ VIP** và **thêm cuối cho khách thường** trong $O(1)$ (nếu dùng `v.insert(v.begin(), x)` trên `vector` thì mỗi lần chèn đầu phải dồn toàn bộ mảng tốn $O(N) \rightarrow O(N^2)$ **TLE**!).

> **Chiến lược giải quyết:** Tách hệ thống điều hành thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)** để lần lượt làm chủ 4 công cụ STL cốt lõi:
> - $V_1$: `std::set` & `std::multiset` — Tủ hồ sơ tự sắp xếp và tra cứu trong $O(\log N)$.
> - $V_2$: `std::map` — Từ điển ánh xạ khóa lớn / `string` trong $O(\log N)$ & né bẫy anti-hash.
> - $V_3$: `std::priority_queue` (Max/Min-Heap $O(\log N)$) & `std::deque` (Hàng đợi hai đầu $O(1)$).

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: `std::set` & `std::multiset` — Tủ Hồ Sơ Tự Sắp Xếp $O(\log N)$

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Tủ hồ sơ có nhân viên tự xếp thứ tự (`std::set`):** Hãy tưởng tượng một chiếc tủ kỳ diệu: hễ bạn nhét một tấm thẻ ghi số vào (`insert`), nhân viên trực tủ tự động đặt nó vào đúng vị trí để toàn bộ tủ **luôn sắp xếp tăng dần** từ trái sang phải; nếu số đó đã có trong tủ rồi thì nhân viên bỏ qua (không lưu trùng). Thẻ đầu tiên (`*s.begin()`) luôn là **nhỏ nhất**, thẻ cuối cùng (`*s.rbegin()`) luôn là **lớn nhất**. Mọi việc thêm, xóa, hay hỏi tìm một số đều chỉ mất **$O(\log N)$** ($\approx 17$ bước cho $10^5$ phần tử!).
- **Tủ cho phép giữ nhiều thẻ giống hệt nhau (`std::multiset`):** Nếu nhiều tấm vé có giá tiền giống hệt nhau (như 3 vé giá `10`), `std::set` sẽ gộp làm một, làm ta bán nhầm mất 2 vé! Khi cần giữ cả bản sao mà vẫn luôn sắp xếp tăng dần trong $O(\log N)$, ta dùng **`std::multiset`**.
- **2 cạm bẫy kinh điển cần tránh tuyệt đối:**
  1. **Bẫy tìm cận `std::lower_bound(s.begin(), s.end(), x)` ($O(N)$ TLE!) vs `s.lower_bound(x)` ($O(\log N)$ AC!):** Các thẻ trong `set` nằm rải rác trong cây bộ nhớ chứ không xếp liền kề như `vector`, nên bạn **không thể viết `s[i]`** và nếu gọi nhầm hàm toàn cục `std::lower_bound(s.begin(), s.end(), x)`, hàm đó phải đi bộ từng thẻ một từ đầu tủ tới cuối tủ mất **$O(N)$** ($\rightarrow$ $Q$ truy vấn thành $O(Q \cdot N)$ **TLE!**). Luôn gọi phương thức nội bộ **`s.lower_bound(x)`** (tìm phần tử đầu tiên $\ge x$) hoặc **`s.upper_bound(x)`** (tìm phần tử đầu tiên $> x$) để chạy đúng **$O(\log N)$**!
  2. **Bẫy `ms.erase(x)` trên `multiset`:** Lệnh `ms.erase(10)` sẽ ném **SẠCH MỌI TẤM THẺ số 10** ra khỏi tủ! Muốn chỉ rút đúng **1 tấm thẻ** giá trị `10`, ta phải tìm địa chỉ của một tấm trước (`auto it = ms.find(10);`) rồi mới xóa theo địa chỉ đó (`if (it != ms.end()) ms.erase(it);`)!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. std::set: loại trùng, tự sắp tăng dần trong O(log N)
    set<int> s = {30, 10, 30, 50, 20}; // Thực chứa {10, 20, 30, 50}
    s.insert(25);
    s.erase(20); // Thực chứa {10, 25, 30, 50}

    // Phương thức riêng s.lower_bound(x) -> O(log N)!
    // KHÔNG viết std::lower_bound(s.begin(), s.end(), 22) vì sẽ chạy chậm O(N)!
    auto it = s.lower_bound(22); // Phần tử đầu tiên >= 22 -> trỏ tới 25
    if (it != s.end()) {
        cout << "So >= 22 nho nhat: " << *it << '\n';
    }

    // Lấy phần tử lớn nhất <= 22: dùng s.upper_bound(22) rồi lùi 1 bước (nếu it != s.begin())
    auto it2 = s.upper_bound(22); // Phần tử đầu tiên > 22 -> trỏ tới 25
    if (it2 != s.begin()) {
        --it2;
        cout << "So <= 22 lon nhat: " << *it2 << '\n'; // 10
    }

    // 2. std::multiset: cho phép trùng lặp & cách xóa ĐÚNG 1 phần tử
    multiset<int> ms = {10, 10, 10, 40};
    auto itDel = ms.find(10);
    if (itDel != ms.end()) {
        ms.erase(itDel); // Chỉ xóa ĐÚNG 1 số 10 -> còn 2 số 10
    }
    cout << "Con lai so 10 sau erase(it): " << ms.count(10) << '\n';

    ms.erase(10); // Xóa SẠCH mọi số 10 còn lại!
    cout << "Con lai so 10 sau erase(10): " << ms.count(10) << '\n';
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **`std::set<T>` (Tập hợp có thứ tự — `Ordered Set`):** Cấu trúc cây tìm kiếm nhị phân cân bằng (cây Đỏ-Đen) tự động loại phần tử trùng và duy trì thứ tự tăng dần; `insert`, `erase`, `find`, `count`, `lower_bound`, `upper_bound` đều chạy trong **$O(\log N)$**.
- **`std::multiset<T>` (Đa tập hợp có thứ tự):** Giống hệt `std::set` nhưng **cho phép chứa nhiều phần tử bằng nhau**; lưu ý `ms.erase(val)` xóa tất cả bản sao có giá trị `val` trong $O(\log N + k)$, còn `ms.erase(it)` xóa đúng 1 phần tử tại iterator `it` trong $O(1)$ khấu hao.
- **Iterator hai chiều (`Bidirectional Iterator`):** Con trỏ chỉ vị trí phần tử trên `set`/`multiset`/`map`, chỉ hỗ trợ tiến 1 bước (`++it`) hoặc lùi 1 bước (`--it`), không hỗ trợ cộng nhảy `it + k` hay truy cập `s[i]`.

---

### 2.2. Vấn Đề Nhỏ 2: `std::map` & Bẫy Tạo Khóa Rác / Anti-Hash `unordered_map`

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Cuốn sổ từ điển tra cặp `(Khóa -> Giá trị)` (`std::map`):** Mảng đếm `cnt[x]` ở Pha 1 chỉ làm được khi chỉ số `x` là số nguyên nhỏ ($0 \le x \le 10^6$). Nếu đề cho số tới $10^9$ hoặc muốn tra điểm theo **tên tài khoản `string`**, mảng thường bó tay. `std::map<Key, Value>` giống như một **cuốn từ điển sắp theo thứ tự bảng chữ cái của `Key`**: mỗi mục lưu một cặp `(Khóa, Giá trị)`, thao tác ghi/sửa/tra cứu chỉ tốn **$O(\log N)$** và chỉ tốn RAM đúng bằng số khóa thật sự xuất hiện!
- **Bẫy `if (mp[x] == ...)` tự sinh khóa rác:** Ngoặc vuông `mp[x]` của `std::map` rất tiện khi gán (`mp[x]++`), nhưng lại có tính chất **tự động ghi thêm mục mới `(x, 0)` vào từ điển ngay khi bạn chỉ lỡ nhìn thử xem `x` có mặt hay chưa**! Nếu bạn viết `if (mp[x] == 0)` trong $10^5$ truy vấn toàn số lạ, `mp` bị nhét đầy $10^5$ mục rác giá trị `0`, vừa ngốn RAM, vừa làm sai `mp.size()` và chậm các bước tra cứu sau. Để **chỉ hỏi thăm tồn tại** mà không làm bẩn `map`, luôn dùng **`mp.count(x)`** hoặc **`mp.find(x) != mp.end()`**!
- **Bẫy Anti-Hash $O(N^2)$ TLE của `unordered_map` trên Codeforces:** Có thể bạn nghe nói `unordered_map` chạy trung bình $O(1)$ nhanh hơn `map` $O(\log N)$. Nhưng `unordered_map` dùng **bảng băm (Hash Table)** với công thức chia dư cố định: trong các kỳ thi như Codeforces (hoặc test hack), người ra đề cố tình tạo ra hàng chục nghìn số khác nhau nhưng lại **rơi chung vào đúng 1 ngăn băm**, khiến mỗi lượt tìm kiếm phải đi quét danh sách dài $O(N) \rightarrow$ cả bài thành **$O(N^2)$ TLE**! Với kiến thức Tầng 1, luôn ưu tiên dùng **`std::map`** vì nó đảm bảo $O(N \log N)$ vững như bàn thạch trước mọi bộ test!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Đếm tần suất số rất lớn tới 10^9 trong O(N log N)
    map<long long, int> freq;
    vector<long long> ds = {1000000000LL, 7, 1000000000LL, 3};
    for (long long x : ds) {
        freq[x]++;
    }

    // Duyệt từng cặp (Key, Value) bằng const auto& để không sao chép thừa
    for (const auto& p : freq) {
        cout << p.first << " -> " << p.second << '\n';
    }

    // 2. Cách kiểm tra tồn tại KHÔNG tạo khóa rác: dùng .count() hoặc .find()
    if (freq.count(999999999LL) == 0) {
        cout << "Khong co 999999999, size van la: " << (int)freq.size() << '\n'; // 3
    }

    // 3. BẪY: viết if (freq[999999999LL] == 0) sẽ tự chèn thêm khóa rác!
    if (freq[999999999LL] == 0) {
        cout << "Sau freq[...], size bi tang thanh: " << (int)freq.size() << '\n'; // 4
    }
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **`std::map<Key, Value>` (Từ điển ánh xạ có thứ tự):** Lưu các cặp `pair<const Key, Value>` luôn xếp tăng dần theo `Key`, đảm bảo mọi thao tác tìm/thêm/xóa tốn **$O(\log N)$** trong trường hợp xấu nhất.
- **Tạo khóa mặc định của `operator[]`:** Gọi `mp[k]` khi `k` chưa tồn tại sẽ tự động chèn `(k, 0)` (hoặc giá trị mặc định của `Value`) vào `map` trước khi trả về tham chiếu tới giá trị đó.
- **Xung đột băm (`Hash Collision`) & Test Anti-Hash:** Hiện tượng nhiều khóa khác nhau rơi vào cùng một bucket của `unordered_map`, biến độ phức tạp từ $O(1)$ trung bình thành **$O(N)$ mỗi lần tra cứu** ($O(N^2)$ toàn chương trình $\rightarrow$ **TLE**).

---

### 2.3. Vấn Đề Nhỏ 3: `std::priority_queue` (Max/Min-Heap) & `std::deque` (Hàng Đợi Hai Đầu)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
- **Rổ ưu tiên tự đẩy người đứng đầu lên mặt (`std::priority_queue` — Heap):** Giả sử bạn cần mô phỏng dây chuyền luôn **bốc ngay món đắt nhất** để giảm giá một nửa, rồi lại **thả vào rổ** và tiếp tục bốc món đắt nhất hiện tại $10^5$ lần. Nếu nhét vào `vector` rồi `sort()` lại sau mỗi lần thả thì mất $O(Q \cdot N \log N)$ ($\rightarrow$ **TLE**). `std::priority_queue` giống như một cái **phễu ưu tiên**: nó không thèm sắp toàn bộ đống đồ bên dưới, mà chỉ đảm bảo **phần tử ưu tiên nhất luôn nổi lên ngay miệng phễu (`top()`)** để bạn nhìn thấy trong $O(1)$, bốc ra (`pop()`) hay bỏ thêm vào (`push()`) đều chỉ tốn **$O(\log N)$**!
  - Mặc định `priority_queue<int>` là **Max-Heap** (số **LỚN NHẤT** nổi lên trên).
  - Muốn biến thành **Min-Heap** (số **NHỎ NHẤT** nổi lên trên), ta viết đủ 3 tham số: `priority_queue<int, vector<int>, greater<int>>`.
  - **Nhắc an toàn:** Luôn kiểm tra `!pq.empty()` trước khi gọi `pq.top()` hoặc `pq.pop()`, nếu không chương trình sẽ sập **RE**!
- **Đường ống mở cả hai đầu (`std::deque`):** Với `vector`, thêm/xóa ở cuối (`push_back`, `pop_back`) cực nhanh $O(1)$, nhưng chèn lên đầu (`v.insert(v.begin(), x)`) bắt buộc cả hàng phải dịch bước sang phải mất **$O(N)$** ($Q = 10^5$ lần chèn đầu thành $O(N^2)$ **TLE!**). `std::deque` giống như một **toa tàu mở cửa cả đầu lẫn đuôi**: `push_front`, `pop_front`, `push_back`, `pop_back`, xem `front()` / `back()` và truy cập `dq[i]` đều chạy trong **$O(1)$**!

#### Bước 2: Ánh xạ vào lập trình C++14

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Max-Heap mặc định: luôn lấy được phần tử LỚN NHẤT ở top()
    priority_queue<int> maxPq;
    maxPq.push(10);
    maxPq.push(50);
    maxPq.push(30);
    if (!maxPq.empty()) {
        cout << "Max top = " << maxPq.top() << '\n'; // 50
        maxPq.pop(); // Còn {30, 10}, O(log N)
    }

    // 2. Min-Heap: dùng greater<int> để đưa phần tử NHỎ NHẤT lên top()
    priority_queue<int, vector<int>, greater<int>> minPq;
    minPq.push(10);
    minPq.push(50);
    minPq.push(30);
    if (!minPq.empty()) {
        cout << "Min top = " << minPq.top() << '\n'; // 10
    }

    // 3. std::deque: thêm/xóa hai đầu + truy cập chỉ số trong O(1)
    deque<int> dq;
    dq.push_back(20);  // {20}
    dq.push_front(10); // {10, 20} -> O(1), không bị O(N) như vector.insert!
    dq.push_back(30);  // {10, 20, 30}
    cout << "front = " << dq.front() << ", dq[1] = " << dq[1]
         << ", back = " << dq.back() << '\n';
    dq.pop_front(); // {20, 30}
    dq.pop_back();  // {20}
    cout << "Sau pop 2 dau, size = " << (int)dq.size() << ", con lai = " << dq.front() << '\n';
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **`std::priority_queue<T>` (Hàng đợi ưu tiên / `Binary Heap`):** Cấu trúc đống nhị phân luôn giữ phần tử lớn nhất ở đỉnh `top()` (Max-Heap); khi truyền thêm `vector<T>, greater<T>` trở thành **Min-Heap** giữ phần tử nhỏ nhất ở đỉnh `top()`. Đọc `top()` mất $O(1)$, `push()` và `pop()` mất **$O(\log N)$**.
- **`std::deque<T>` (`Double-Ended Queue` — Hàng đợi hai đầu):** Thùng chứa cho phép thêm/xóa ở cả hai đầu (`push_front`, `pop_front`, `push_back`, `pop_back`) và truy cập `dq[i]` trong **$O(1)$**.

---

## 3. Bảng Tổng Hợp Độ Phức Tạp & Khi Nào Chọn Công Cụ Nào

| Công cụ STL | Điểm mạnh cốt lõi | Độ phức tạp chính | Khi nào dùng? |
| :--- | :--- | :--- | :--- |
| `std::set<T>` | Loại trùng, luôn tăng dần, tìm $\ge x$ | `insert/erase/find/lower_bound`: **$O(\log N)$** | Cần tập phân biệt động + lấy min/max/cận $\ge x$ |
| `std::multiset<T>` | Cho phép trùng, luôn tăng dần | `insert/find`: **$O(\log N)$**, `erase(it)`: $O(1)$ khấu hao | Khi tập động có phần tử trùng nhau & cần xóa **từng chiếc** |
| `std::map<K, V>` | Đếm/tra cứu theo khóa $10^9$ hoặc `string` | `mp[k]/count/find/erase`: **$O(\log N)$** | Mảng đếm không đủ RAM hoặc khóa là `string` / số lớn |
| `std::priority_queue` | Bốc nhanh phần tử max/min động (ít RAM hơn `set`) | `top`: $O(1)$; `push/pop`: **$O(\log N)$** | Chỉ cần bốc đỉnh lớn nhất/nhỏ nhất liên tục, không cần tìm phần tử ở giữa |
| `std::deque<T>` | Thêm/bớt cả hai đầu linh hoạt | `push_front/back`, `pop_front/back`, `dq[i]`: **$O(1)$** | Cần đẩy/rút ở cả đầu và cuối dãy mà `vector` bị chậm $O(N)$ ở đầu |

---

## 4. Danh Sách Kiểm Tra Tránh Bẫy Kinh Điển (Pitfalls Checklist)

1. **Gọi `std::lower_bound(s.begin(), s.end(), x)` trên `set`/`multiset`:** Chạy chậm **$O(N)$** và chắc chắn gây **TLE** khi lặp nhiều truy vấn! Bắt buộc gọi phương thức riêng **`s.lower_bound(x)`** / **`s.upper_bound(x)`** ($O(\log N)$).
2. **Gọi `ms.erase(x)` khi chỉ muốn xóa 1 phần tử trong `multiset`:** Lệnh này xóa **sạch mọi bản sao** có giá trị `x`! Phải tìm vị trí trước: `auto it = ms.find(x); if (it != ms.end()) ms.erase(it);`.
3. **Dùng `if (mp[x] == ...)` để kiểm tra tồn tại trong `map`:** Tự động tạo thêm khóa rác `(x, 0)` làm phình bộ nhớ và sai `mp.size()`. Luôn dùng **`mp.count(x)`** hoặc **`mp.find(x) != mp.end()`**.
4. **Dùng `unordered_map` khi thi Codeforces:** Có thể bị test anti-hash đánh sập từ $O(1)$ thành **$O(N^2)$ TLE**. Mặc định ưu tiên `std::map` cho an toàn $O(N \log N)$.
5. **Quên kiểm tra `!empty()` hoặc quên lùi iterator sai cách:**
   - Gọi `pq.top()`, `pq.pop()`, `dq.front()`, `dq.pop_front()` khi rỗng gây crash **RE**.
   - Trên `set`/`multiset`, khi gọi `auto it = s.upper_bound(x);` để tìm số $\le x$ lớn nhất, bắt buộc kiểm tra `if (it != s.begin()) { --it; ... }`; nếu `it == s.begin()` mà vẫn viết `--it` sẽ gây lỗi nghiêm trọng (`UB` / crash).
6. **Chèn đầu bằng `vector.insert(v.begin(), x)`:** Tốn $O(N)$ mỗi lần chèn đầu ($\rightarrow O(N^2)$ **TLE**); hãy chuyển sang **`std::deque`** và dùng `dq.push_front(x)` trong **$O(1)$**.
