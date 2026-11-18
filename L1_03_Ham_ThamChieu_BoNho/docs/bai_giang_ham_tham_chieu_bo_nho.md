# Bài Giảng `L1-03` — Hàm, Tham Chiếu (`&`) & Bộ Nhớ Stack / Vùng Tĩnh

- **Mã chuyên đề:** `L1-03` (Tầng 1 — Pha 1: Nền tảng C++ Lớp 9)
- **Kiến thức tiền đề đã có (`MOD-Pre` + `MOD-CP0` + `L1-01` + `L1-02`):**
  - Đã thuộc lòng **Bộ Khung Chuẩn CP**: `#include <bits/stdc++.h>`, `using namespace std;`, `ios_base::sync_with_stdio(false); cin.tie(NULL);`, dùng `'\n'` thay cho `endl`.
  - Đã thành thạo `if / else if / else`, vòng lặp `for / while / while (t--)`, kiểu `long long`, `bool`, `char`, `string`.
  - Đã biết dùng **mảng tĩnh toàn cục (`const int N = ...; int a[N];`)** đặt phía trên `main()` và hiểu sơ bộ sự khác biệt giữa chiếc bàn làm việc cục bộ chật hẹp (~8 MB) với nhà kho dữ liệu tĩnh (~256 MB).
- **Ranh giới Pha 1 Lớp 9:** Trong bài này, các hàm chỉ nhận **tham số kiểu cơ bản** (`int`, `long long`, `double`, `char`, `bool`, `string`) và **tham số tham chiếu** (`int&`, `long long&`). Mọi mảng kích thước lớn vẫn tiếp tục đặt ở **mảng tĩnh toàn cục** phía trên các hàm — tuyệt đối chưa truyền mảng hay dùng các cấu trúc co giãn ở Pha 2.

---

## 1. Bức Tranh Toàn Cảnh: Bế Tắc Khi Nhồi Mọi Thứ Vào Trong `main()`

Trong kỳ thi chọn đội tuyển Tin học Lớp 9, đề bài yêu cầu xét dãy gồm $N \le 10^5$ mã thẻ học sinh và thực hiện 3 công việc liên tiếp:
1. Lọc ra các mã **"Siêu thân thiện"**: vừa có **tổng chữ số là số nguyên tố**, vừa có **số đảo ngược là số nguyên tố**.
2. Liên tục cập nhật đồng thời **kỷ lục nhỏ nhất và lớn nhất** (hoặc hoán đổi vị trí hai giá trị khi cần).
3. Giữ nguyên mảng dữ liệu lớn và tổng điểm chung mà không bị sập bộ nhớ hoặc hỏng dữ liệu giữa chừng.

Nếu bạn tiếp tục viết **toàn bộ 150 dòng code nhồi hết vào bên trong `main()`**, ba bế tắc nghiêm trọng lập tức xuất hiện:
1. **Bế tắc 1 — Lặp code dài lê thê & Sửa 1 chỗ sót 2 chỗ:** Bạn phải viết lại vòng lặp kiểm tra số nguyên tố tới 2–3 lần ở các đoạn khác nhau trong `main()`. Chỉ cần gõ nhầm 1 dấu `<` thành `<=`, bạn phải đi dò và sửa khắp cả trăm dòng; hễ sót một chỗ là nhận ngay kết quả `WA`!
2. **Bế tắc 2 — Tách ra hàm riêng rồi nhưng... biến ngoài `main()` không chịu đổi!** Khi bạn thử tự tách một hàm `hoanDoi(int a, int b)` để đổi giá trị hai biến, chạy xong hàm thì ở ngoài `main()` hai biến đó vẫn giữ nguyên như chưa hề có chuyện gì xảy ra!
3. **Bế tắc 3 — Đặt mảng lớn trong hàm phụ làm sập chương trình & Che khuất tên biến toàn cục:** Khai báo mảng lớn bên trong một hàm phụ khiến khay làm việc trên **bộ nhớ stack (~8 MB)** bị tràn ngay lập tức (`Runtime Error`); hoặc lỡ đặt trùng tên biến cục bộ với biến toàn cục khiến hàm tưởng đang cộng vào tổng chung nhưng thực ra chỉ sửa trên bản nháp tạm!

> **Chiến lược giải quyết:** Tách vấn đề lớn thành **3 Vấn Đề Nhỏ ($V_1, V_2, V_3$)** để biến chương trình thành những khối lắp ghép sạch sẽ, dễ kiểm thử và an toàn tuyệt đối về bộ nhớ!

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Tách Việc Lớn Thành Hàm (`void` vs Hàm Trả Về `return`)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Hãy tưởng tượng trong gian bếp lớn của Ngày Hội Học Sinh, **Anh Thật Thà** (`main()`) phải vừa cân bột, vừa kiểm tra hạn sử dụng từng hộp sữa, vừa tính tổng calo, vừa ghi bảng báo cáo. Nếu tự làm tất cả trong một danh sách 200 bước dài dằng dặc, chỉ nhầm 1 dòng là rối tung cả gian bếp!

Giải pháp thông minh là thành lập các **Tổ chuyên trách (Hàm)**, chia thành 2 loại nhiệm vụ:
1. **Tổ báo cáo kết quả (Hàm có kiểu trả về như `int`, `long long`, `bool`):**
   Bạn đưa cho tổ nguyên liệu đầu vào (*tham số*), tổ tự xử lý gọn gàng trong phòng riêng rồi **nộp lại đúng 1 phiếu kết quả (`return`)**. Ví dụ: tổ `laNguyenTo(x)` nhận vào số `x` và trả ra phiếu `true` hoặc `false`; tổ `tongChuSo(x)` trả ra một số `int`.
   *Quy tắc quan trọng:* Ngay khoảnh khắc tổ đưa phiếu `return`, tổ đó **lập tức dừng mọi công việc còn lại và rời phòng**! Bất kỳ dòng lệnh nào nằm sau câu lệnh `return` trong nhánh đó sẽ không bao giờ được chạy.
2. **Tổ thi công hành động (Hàm `void`):**
   Tổ này chỉ nhận việc để **làm một hành động** (ví dụ: in bảng báo cáo, hoặc giải quyết trọn vẹn 1 bộ test `xuLyTest()`), làm xong thì tự ra về mà **không cần nộp lại giá trị số nào**. Nếu muốn dừng sớm giữa chừng trong hàm `void`, ta viết `return;` (không kèm giá trị).

#### Bước 2: Ánh xạ vào lập trình C++
Nhớ quy tắc vàng trong C++: **Hàm phụ phải được khai báo ở phía trên nơi gọi nó** (đặt phía trên `main()`).

```cpp
#include <bits/stdc++.h>
using namespace std;

// Hàm trả về int: nhận tham số long long x
int tongChuSo(long long x) {
    int tong = 0;
    while (x > 0) {
        tong += (int)(x % 10);
        x /= 10;
    }
    return tong;
}

// Hàm trả về bool: chỉ return true SAU KHI đã duyệt xong toàn bộ vòng lặp!
bool laNguyenTo(long long x) {
    if (x < 2) {
        return false; // Thoát ngay lập tức nếu x < 2
    }
    for (long long i = 2; i * i <= x; i++) {
        if (x % i == 0) {
            return false; // Gặp ước -> kết luận ngay, không cần chạy tiếp vòng lặp!
        }
    }
    return true; // Chạy hết vòng lặp không gặp ước nào mới kết luận nguyên tố
}

// Hàm void: chỉ thực hiện in kết quả, không trả về giá trị
void inKetQua(long long ma, bool hopLe) {
    if (!hopLe) {
        cout << ma << ": KHONG DAT" << '\n';
        return; // Dừng hàm void ngay tại đây
    }
    cout << ma << ": DAT CHUAN" << '\n';
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long ma;
    cin >> ma;

    // main() bây giờ đọc như một bản tóm tắt tiếng Việt mạch lạc!
    bool ok = laNguyenTo(ma) && laNguyenTo(tongChuSo(ma));
    inKetQua(ma, ok);
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Hàm (`Function`):** Khối mã nguồn độc lập có tên gọi riêng, nhận **tham số đầu vào (`Parameters`)** và thực hiện một nhiệm vụ cụ thể. Giúp tái sử dụng code và kiểm thử (*debug*) từng mảnh riêng biệt.
- **Hàm có giá trị trả về (`Value-returning Function`):** Hàm bắt đầu bằng kiểu dữ liệu (`int`, `long long`, `bool`, `double`, `string`...), kết thúc bằng `return <giá trị>;`.
- **Hàm thủ tục (`void Function`):** Hàm bắt đầu bằng từ khóa `void`, chỉ thực thi hành động (như in ấn hoặc cập nhật dữ liệu) mà không trả về giá trị để gán vào biểu thức.
- **Thoát sớm (`Early Return`):** Đặc tính hàm dừng ngay tại câu lệnh `return` đầu tiên gặp phải; cực kỳ hữu ích khi kiểm tra điều kiện sai để thoát sớm, nhưng nếu đặt nhầm `return true;` vào trong vòng `for` sẽ làm hàm kết luận vội vàng ngay từ lượt đầu tiên!

---

### 2.2. Vấn Đề Nhỏ 2: Truyền Tham Trị (Bản Sao) vs Truyền Tham Chiếu `&` (Bản Gốc)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Bạn muốn viết một hàm `hoanDoi(a, b)` để đổi giá trị của hai biến `u = 10` và `v = 25` đang nằm ở `main()`, hoặc một hàm `capNhatKyLuc` vừa cập nhật đồng thời hai biến `minDiem` và `maxDiem`. Vì sao viết `void hoanDoi(int a, int b)` lại thất bại?

Hãy hình dung hai cách giao giấy tờ cho tổ chuyên trách:
1. **Truyền tham trị (`int a`, KHÔNG có dấu `&`) — Đưa bản PHOTO:**
   Khi bạn gọi `hoanDoi(u, v)`, máy tính mang biến `u` và `v` đi **photo thành hai tờ bản sao** tên là `a` và `b`, rồi đưa cho hàm `hoanDoi`. Trong phòng riêng, hàm đổi chỗ hai bản sao `a` và `b` rất hăng hái, nhưng **hai tờ giấy gốc `u` và `v` ngoài `main()` không hề bị đụng chạm**! Xong việc, hai tờ photo bị vứt đi, `u` vẫn là `10` và `v` vẫn là `25`.
2. **Truyền tham chiếu (`int& a`, CÓ dấu `&`) — Đưa thẳng BẢN GỐC:**
   Khi thêm dấu `&` ngay sau tên kiểu dữ liệu (`int& a`, `long long& a`), bạn không photo nữa mà **giao thẳng tờ giấy gốc** cho hàm! Lúc này `a` thực chất chỉ là **một bí danh khác trỏ thẳng vào chính ô nhớ của biến `u`**. Hàm viết gì lên `a` là sửa trực tiếp lên `u` ngoài `main()`!

*Lưu ý bắt buộc:* Vì tham chiếu `&` cần "một tờ giấy gốc có thật trên RAM", bạn chỉ có thể truyền **tên biến thật** (như `hoanDoi(u, v)`), **không được** truyền hằng số cứng (như `hoanDoi(10, 25)` — sẽ báo lỗi biên dịch ngay!).

#### Bước 2: Ánh xạ vào lập trình C++
```cpp
#include <bits/stdc++.h>
using namespace std;

// Truyền THAM TRỊ (bản sao): KHÔNG làm đổi u, v bên ngoài main()
void hoanDoiThamTri(long long x, long long y) {
    long long tam = x;
    x = y;
    y = tam;
}

// Truyền THAM CHIẾU (&): Sửa trực tiếp u, v bên ngoài main()!
void hoanDoiThamChieu(long long& x, long long& y) {
    long long tam = x;
    x = y;
    y = tam;
}

// Kết hợp: Trả về bool VÀ chỉnh sửa đồng thời 2 biến gốc minVal, maxVal qua '&'
bool capNhatKyLuc(int& minVal, int& maxVal, int diemMoi) {
    bool doiKyLuc = false;
    if (diemMoi < minVal) {
        minVal = diemMoi;
        doiKyLuc = true;
    }
    if (diemMoi > maxVal) {
        maxVal = diemMoi;
        doiKyLuc = true;
    }
    return doiKyLuc;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long u = 10, v = 25;
    hoanDoiThamTri(u, v);  // u vẫn là 10, v vẫn là 25!
    hoanDoiThamChieu(u, v); // Bây giờ u = 25, v = 10!
    cout << u << ' ' << v << '\n';

    int thapNhat = 100, caoNhat = 100;
    if (capNhatKyLuc(thapNhat, caoNhat, 125)) {
        cout << "Ky luc moi: [" << thapNhat << ", " << caoNhat << "]" << '\n';
    }
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Truyền tham trị (`Pass by Value`):** Tạo bản sao giá trị của đối số đưa vào hàm. An toàn khi hàm chỉ cần *đọc* dữ liệu (như `tongChuSo(x)`), không muốn vô tình làm hỏng biến bên ngoài.
- **Truyền tham chiếu (`Pass by Reference` — dấu `&`):** Truyền địa chỉ bí danh gắn thẳng vào biến gốc ngoài hàm. Dùng khi hàm cần **sửa biến gốc** hoặc **cập nhật nhiều biến cùng lúc** (đặc biệt hữu ích vì `return` chỉ trả về được 1 giá trị).

---

### 2.3. Vấn Đề Nhỏ 3 & Cầu Nối Tương Lai: Phạm Vi Biến, Ngăn Xếp Lời Gọi Hàm & Giới Hạn Bộ Nhớ Stack (~8 MB)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
1. **Ngăn xếp lời gọi hàm (*bộ nhớ stack*) hoạt động thế nào?**
   Hãy hình dung trên bàn làm việc RAM có một **chồng khay công việc**:
   - Khi chương trình chạy, hệ thống đặt khay của `main()` ở dưới cùng.
   - Khi `main()` gọi hàm `f()`, hệ thống **đặt thêm một chiếc khay tạm của `f()` lên trên khay `main()`**. Mọi tham số và **biến cục bộ** khai báo bên trong `f()` đều nằm trên chiếc khay tạm này (nếu quên gán giá trị ban đầu, chúng chứa **giá trị rác ngẫu nhiên**).
   - Ngay khi `f()` kết thúc (`return`), **chiếc khay của `f()` bị dọn sạch và nhấc ra khỏi chồng khay**! Mọi biến cục bộ của `f()` biến mất hoàn toàn — lần sau gọi lại `f()`, một khay mới tinh lại được đặt lên, hoàn toàn không nhớ giá trị của lần gọi trước!
2. **Biến toàn cục vs Bẫy che khuất (`Shadowing`):**
   Các mảng lớn và biến dùng chung đặt bên ngoài mọi hàm nằm tại **nhà kho dữ liệu tĩnh (~256 MB)**: chúng tồn tại suốt cả chương trình, tự động mang giá trị `0` lúc đầu và mọi hàm đều nhìn thấy được.
   *Bẫy chết người (`Shadowing`):* Nếu bên trên đã có biến toàn cục `long long tong = 0;`, mà bên trong hàm `congThem()` bạn lại gõ thêm chữ kiểu dữ liệu `long long tong = 0;` lần nữa, thì C++ lập tức tạo một **biến cục bộ trùng tên** ngay trên khay tạm của hàm, **che khuất** hoàn toàn biến toàn cục! Hàm tính ra kết quả đúng ở biến cục bộ, nhưng khi hàm kết thúc khay bị xóa đi, biến toàn cục bên ngoài vẫn bằng `0`!
3. **Ranh giới bộ nhớ Stack (~8 MB) vs Vùng dữ liệu tĩnh (~256 MB) / Heap:**
   - **Ngăn xếp lời gọi hàm (bộ nhớ Stack)** mặc định trên máy chấm chỉ rộng vỏn vẹn **~8 MB** (chứa tất cả các khay đang chồng lên nhau). Chỉ nên đặt các biến đơn lẻ (`int`, `long long`, `bool`, `char`) hoặc mảng cực nhỏ (vài chục phần tử) trên khay của hàm! Nếu đặt mảng lớn cỡ `int tam[2500000];` (~10 MB) bên trong một hàm rồi gọi nó, khay làm việc sập gãy ngay lập tức (**Tràn bộ nhớ Stack** / `Segmentation Fault`)!
   - **Vùng dữ liệu tĩnh toàn cục (~256 MB)** (và vùng nhớ động **Heap ~256 MB** sẽ học ở Pha 2 STL) mới là nơi chứa mảng hàng trăm nghìn hoặc hàng triệu phần tử!
   - **Cầu nối sang `MOD-01` (Đệ quy):** Ở các bài tới, bạn sẽ thấy một hàm thậm chí có thể *tự gọi lại chính nó* — mỗi lần gọi lại chồng thêm một khay mới lên ngăn xếp (~8 MB). Vì vậy hiểu rõ ranh giới ~8 MB hôm nay sẽ giúp bạn tránh bẫy tràn ngăn xếp ở bài Đệ quy!

#### Bước 2: Ánh xạ vào lập trình C++
```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 1000005;
int a[N];               // Vùng dữ liệu tĩnh toàn cục (~4 MB), tự sạch = 0!
long long tongChung = 0;

void congSaiDoCheKhuat(int n) {
    long long tongChung = 0; // BẪY SHADOWING: Che khuất biến toàn cục cùng tên!
    for (int i = 1; i <= n; i++) {
        tongChung += a[i];
    }
    // Ra khỏi hàm, biến cục bộ tongChung biến mất -> biến toàn cục vẫn bằng 0!
}

void congDungVaoToanCuc(int n) {
    tongChung = 0; // Không gõ lại "long long" -> sửa thẳng biến toàn cục!
    for (int i = 1; i <= n; i++) {
        tongChung += a[i];
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 3;
    a[1] = 10; a[2] = 20; a[3] = 30;

    congSaiDoCheKhuat(n);
    cout << "Sau ham bi che khuat: " << tongChung << '\n'; // In ra 0!

    congDungVaoToanCuc(n);
    cout << "Sau ham sua dung: " << tongChung << '\n';     // In ra 60!
    return 0;
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Phạm vi cục bộ vs Toàn cục (`Local vs Global Scope`):** Biến cục bộ chỉ sống trong cặp `{ ... }` nơi nó được khai báo và nằm trên ngăn xếp lời gọi hàm; biến toàn cục sống suốt thời gian chạy chương trình tại vùng dữ liệu tĩnh.
- **Che khuất biến (`Variable Shadowing`):** Khai báo biến cục bộ trùng tên với biến toàn cục (hoặc biến ở khối `{}` ngoài), khiến code bên trong không nhìn thấy biến bên ngoài.
- **Bộ nhớ Stack (`Stack Memory`, ~8 MB) vs Vùng dữ liệu tĩnh / Heap (~256 MB):** Stack dùng để xếp chồng các khay làm việc của hàm và biến cục bộ nhỏ; mảng tĩnh lớn phải nằm ở vùng dữ liệu tĩnh toàn cục (hoặc vùng động Heap ở Pha 2) để tránh lỗi `RE` / `Segmentation Fault`.

---

## 3. Bảng Tổng Hợp Các Bẫy Kinh Điển & Chi Phí (`L1-03`)

| Chủ đề | Bẫy thường gặp (gây WA / CE / RE) | Cách xử lý chuẩn CP |
| :--- | :--- | :--- |
| Thứ tự hàm | Gọi hàm `f()` trong `main()` khi `f()` được viết ở *phía dưới* `main()` gây lỗi biên dịch (`CE`) | Luôn viết các hàm phụ **ở phía trên `main()`** (sắp xếp từ hàm nhỏ tới hàm lớn) |
| `return` sớm trong vòng lặp | Đặt `else return true;` ngay trong vòng `for` của hàm kiểm tra nguyên tố, khiến hàm kết luận sai ngay từ `i = 2` | Chỉ `return false;` khi gặp ước trong `for`; đặt `return true;` **bên ngoài** sau khi kết thúc `for` |
| Quên dấu `&` | Viết `void hoanDoi(int x, int y)` khiến hàm chỉ đổi trên bản sao, biến gốc ngoài `main()` không đổi | Thêm `&` (`int& x, int& y`) khi hàm cần sửa trực tiếp biến gốc hoặc cập nhật nhiều biến |
| Truyền hằng cho `&` | Gọi `hoanDoi(3, 5)` khi tham số là `int& x, int& y` gây lỗi biên dịch (`CE`) | Luôn truyền **tên biến có thật** vào tham số tham chiếu `&` |
| Che khuất (`Shadowing`) | Đặt `long long ans = 0;` trong hàm khi đã có biến toàn cục `long long ans`, làm biến toàn cục luôn giữ giá trị cũ | Đặt tên phân biệt hoặc tốt hơn là dùng hàm trả về giá trị (`return`) / truyền `&` thay cho biến toàn cục |
| Mảng lớn trong hàm | Khai báo `int temp[3000000];` (~12 MB) bên trong một hàm gây tràn bộ nhớ Stack (~8 MB) dẫn tới `RE` | Đưa toàn bộ mảng lớn ra **toàn cục** (`const int N = ...; int a[N];`) phía trên mọi hàm |

- **Chi phí gọi hàm:** Gọi một hàm với tham số nguyên thủy (`int`, `long long`, `bool`, `char`) hoặc tham chiếu (`int&`, `long long&`) chỉ tốn $O(1)$ tức thời (~vài chu kỳ CPU). Lưu ý duy nhất cho `string`: nếu chuỗi dài $10^5$ ký tự mà truyền tham trị `string s` lặp đi lặp lại trong vòng lặp $10^5$ lần sẽ bị copy chậm $O(|s|)$ mỗi lần — khi đó nên giữ `string` ở toàn cục hoặc dùng tham chiếu (Pha 2 sẽ tối ưu sâu hơn bằng tham chiếu hằng cho các cấu trúc co giãn).
