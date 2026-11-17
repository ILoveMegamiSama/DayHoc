# Bài Giảng: Chương Phụ `MOD-CP0` — Chuẩn Hóa Code C++ Hướng Thi Đấu (CP)

- **Mã chuyên đề:** `MOD-CP0` (Chương Phụ — Nối tiếp ngay sau `MOD-Pre`)
- **Đối tượng học tập:** Học sinh Lớp 9 đã hoàn thành bài `MOD-Pre` (đã biết hàm `main()`, dấu `;`, biến `int/double/string/char/bool`, phép chia nguyên `5 / 2 = 2`, kênh `std::cin` / `std::cout`, `std::endl`).
- **Mục tiêu cốt lõi:** Nâng cấp bộ đồ nghề C++ từ bài Nhập môn thành **Bộ Khung Chuẩn Lập Trình Thi Đấu (Competitive Programming Template)** vừa gọn gàng, vừa tránh được lỗi trùng tên ngớ ngẩn, vừa đạt tốc độ nhập xuất cực nhanh để không bị TLE khi chấm bài tự động.

---

## 1. Bức Tranh Toàn Cảnh: Vấn Đề Lớn Khi Anh Thật Thà Bước Vào Đấu Trường Tốc Độ

Ở bài `MOD-Pre`, bạn đã giúp **Anh Thật Thà** vận hành một Tiệm Bánh Mì nho nhỏ phục vụ vài lượt khách đầu tiên với vài dòng `std::cout`, `std::cin`, `#include <iostream>` và `#include <string>`.

Hôm nay, bạn đưa Anh Thật Thà đi thi **Giải Đấu Vua Đầu Bếp Tốc Độ (Lập Trình Thi Đấu — Competitive Programming / CP)**. Đề thi bắt đầu khắt khe hơn hẳn: máy chấm tự động sẽ đổ vào hàng trăm nghìn đơn hàng và yêu cầu toàn bộ chương trình chạy xong trong **đúng 1 giây**!

Ngay lập tức, cách viết code kiểu "nhập môn thư thả" ở `MOD-Pre` bộc lộ **3 bế tắc lớn (3 Vấn Đề Nhỏ)**:

1. **Bế tắc 1 — Lỉnh kỉnh quên đồ nghề (`#include` rời rạc):**
   Mỗi khi cần một dụng cụ mới (đo chuỗi chữ `string`, tính căn bậc hai `sqrt`, tìm số lớn hơn `max`...), bạn lại phải tự chạy đi mở từng chiếc tủ khác nhau (`#include <iostream>`, `#include <string>`, `#include <cmath>`, `#include <algorithm>`...). Chỉ cần quên một dòng ở đầu file là trình biên dịch lập tức dừng việc báo lỗi thiếu đồ nghề!
2. **Bế tắc 2 — Rối rắm tiền tố `std::` và Bẫy trùng nhãn biến:**
   Cứ mỗi lần gọi loa, khe nhận hay tạo chuỗi chữ, bạn lại phải viết chữ `std::` dài dòng (`std::cout`, `std::cin`, `std::string`). Nhưng nếu rút gọn bằng `using namespace std;`, nhiều bạn mới học vô tình đặt tên chiếc hộp biến của mình trùng với đồ nghề sẵn có trong kho chuẩn (như `count`, `min`, `max`, `left`, `right`) — làm Anh Thật Thà bối rối không phân biệt được đâu là hộp của bạn, đâu là dụng cụ chuẩn!
3. **Bế tắc 3 — Quá thời gian (`TLE`) vì nhập xuất chậm rì:**
   Khi làm các bài thi có hàng trăm nghìn đến hàng triệu dòng dữ liệu (mà ngay từ bài `L1-01` sắp tới bạn sẽ dùng vòng lặp để đọc liên tiếp), `cin/cout` mặc định chạy chậm do 3 thói quen "cẩn thận thái quá":
   - Vừa chạy loa/khe C++ (`cin/cout`) vừa phải dừng lại đối chiếu sổ sách với bộ loa/khe thế hệ cũ của ngôn ngữ C (`scanf/printf`).
   - Hễ định đọc dữ liệu từ `cin`, máy lại bắt `cout` phải dọn sạch bàn trước.
   - Dùng `endl` sau mỗi dòng khiến anh Thật Thà vừa ghi xong 1 dòng đã phải chạy đi nộp sổ đóng dấu (`flush`) ngay lập tức!

> **Mục tiêu chương phụ:** Giải quyết dứt điểm 3 bế tắc trên để ghép thành **Bộ Khung Chuẩn CP** dùng xuyên suốt từ `L1-01` đến hết toàn bộ lộ trình Lớp 9!

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Thùng Đồ Nghề Đa Năng `#include <bits/stdc++.h>`

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Trong gian bếp ở `MOD-Pre`, mỗi nhóm đồ dùng nằm ở một chiếc tủ riêng: tủ `iostream` đựng loa-khe, tủ `string` đựng hộp chữ, tủ `cmath` đựng thước đo căn bậc hai, tủ `algorithm` đựng cân so sánh lớn nhỏ. Trước mỗi ca thi, nếu phải tự nhớ tên hàng chục chiếc tủ để mở khóa từng cái thì vừa mất thời gian vừa rất dễ quên sót.

**Giải pháp đời sống:** Khi bước vào giải đấu tốc độ, bạn chuẩn bị sẵn **một Chiếc Vali Đồ Nghề Đa Năng (Tất Cả Trong Một)** đặt ngay cửa bếp. Chỉ cần mở khóa đúng chiếc vali này một lần duy nhất trước khi mở cửa ca sáng `main()`, Anh Thật Thà đã có sẵn toàn bộ dụng cụ tiêu chuẩn của C++ trong tầm tay!

#### Bước 2: Ánh xạ vào lập trình C++
Thay vì viết nhiều dòng `#include` rời rạc:
```cpp
// Cách rời rạc dễ quên thiếu:
#include <iostream>
#include <string>
#include <cmath>
#include <algorithm>
#include <iomanip>
```
Trong Lập trình thi đấu C++ (với trình biên dịch GCC / `g++` trên VNOJ, Codeforces, AtCoder, CSES), ta thay tất cả bằng **đúng 1 dòng**:

```cpp
#include <bits/stdc++.h>
```

- Chỉ cần một dòng `#include <bits/stdc++.h>`, bạn có thể dùng ngay `cin`, `cout`, `string`, `sqrt()`, `max()`, `min()`, `fixed`, `setprecision()`, và toàn bộ các thư viện chuẩn sau này mà không bao giờ sợ lỗi *"... was not declared in this scope"* do quên khai báo thư viện!
- **Lưu ý trung thực (Biết giới hạn của công cụ):**
  - `#include <bits/stdc++.h>` là file tiêu đề nội bộ đặc trưng của bộ biên dịch GCC (`g++`), sinh ra để giúp thí sinh CP tiết kiệm thời gian và tránh quên thư viện.
  - Ở ngoài đời thực khi làm các dự án phần mềm lớn (hoặc khi dùng trình biên dịch MSVC của Visual Studio trên Windows không cài GCC), lập trình viên vẫn liệt kê từng `#include` cụ thể để giảm thời gian biên dịch. Nhưng trong toàn bộ các kỳ thi HSG Tin học & Online Judge dùng `g++`, `#include <bits/stdc++.h>` là chuẩn mực số 1!

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Chỉ thị tiền xử lý (`Preprocessor Directive`):** Những dòng bắt đầu bằng dấu `#` ở đầu file. Đây là bước dặn máy tính chuẩn bị sẵn đồ nghề *trước khi* dịch mã lệnh trong `main()`, nên không cần dấu `;`.
- **Thư viện chuẩn C++ (`C++ Standard Library`):** Bộ công cụ chính thức đi kèm ngôn ngữ C++ (chứa `iostream`, `string`, `cmath`, `algorithm`...).
- **File tiêu đề tổng hợp `<bits/stdc++.h>`:** Chiếc vali "tất cả trong một" của trình biên dịch GCC giúp nạp toàn bộ thư viện chuẩn C++ chỉ bằng 1 dòng lệnh.

---

### 2.2. Vấn Đề Nhỏ 2: Bảng Tên Viết Tắt `using namespace std;` & Bẫy Đặt Tên Trùng

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Mọi dụng cụ trong Vali Chuẩn Quốc Tế đều được khắc chữ **"Chuẩn Quốc Tế - "** ở đầu tên (`std::cout`, `std::cin`, `std::string`, `std::max`). Nếu trong một bài thi dài 50 dòng, bạn phải đọc đi đọc lại cụm từ "Chuẩn Quốc Tế - ..." mấy chục lần thì rất mỏi tay và rối mắt.

**Giải pháp đời sống:** Bạn dán một tờ quy ước ngay dưới chiếc vali:
> *"Từ giờ trở đi, hễ tôi gọi tên dụng cụ nào mà không nói rõ xuất xứ, anh cứ mặc định tìm nó trong Vali Chuẩn Quốc Tế (`std`) nhé!"*

**CẢNH BÁO TAI NẠN (Bẫy trùng tên):**
Trong Vali Chuẩn Quốc Tế có sẵn rất nhiều dụng cụ mang tên tiếng Anh thông dụng như:
- `count` (dụng cụ đếm)
- `min` (tìm giá trị nhỏ nhất)
- `max` (tìm giá trị lớn nhất)
- `left`, `right` (căn lề trái/phải)
- `size`, `next`, `prev`, `hash`, `time`

Nếu bạn đã dán quy ước mặc định tìm trong Vali Chuẩn, rồi lại lấy chính chữ `count` hoặc `max` để dán nhãn cho **chiếc hộp biến** của mình:
- Khi đặt hộp `int count = 5;` ở bên ngoài `main()` (biến toàn cục), Anh Thật Thà sẽ đứng hình ngay lập tức: *"Gọi `count` là lấy chiếc hộp số 5 của bạn hay lấy dụng cụ đếm trong Vali Chuẩn?"* $\rightarrow$ **Lỗi biên dịch nhập nhằng (`ambiguous`)!**
- Hoặc nếu đặt `int max = 10;` bên trong `main()`, nó sẽ che mất dụng cụ `max(3, 5)` trong Vali Chuẩn, làm câu lệnh `max(3, 5)` nổ lỗi ngay!

#### Bước 2: Ánh xạ vào lập trình C++
Đặt dòng sau ngay dưới `#include <bits/stdc++.h>`:

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int soLuong = 5;            // Tên an toàn, rõ nghĩa!
    int giaNhoNhat = min(15, 20);
    cout << soLuong << ' ' << giaNhoNhat << '\n';
    return 0;
}
```

- **Quy tắc đặt tên biến an toàn cho học sinh Lớp 9:**
  - **TRÁNH TUYỆT ĐỐI** đặt tên biến trùng với: `count`, `min`, `max`, `left`, `right`, `size`, `next`, `prev`, `hash`, `time`, `index`, `distance`.
  - Hãy ưu tiên đặt tên tiếng Việt không dấu rõ nghĩa (`soLuong`, `tongDiem`, `giaMin`, `giaMax`, `chiSoTrai`) hoặc viết tắt an toàn (`cnt`, `ans`, `res`, `minVal`, `maxVal`).

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Không gian tên (`Namespace`):** Giống như tên "họ" hoặc tên "chiếc vali chứa dụng cụ" để phân biệt đồ nghề của các bộ thư viện khác nhau. Không gian tên chuẩn của C++ tên là `std` (*Standard*).
- **`using namespace std;`:** Lệnh mở quyền gọi tắt tên các dụng cụ trong không gian tên `std` mà không cần viết tiền tố `std::` phía trước nữa.
- **Xung đột tên / Nhập nhằng tên gọi (`Name Collision / Ambiguous Reference`):** Lỗi biên dịch xảy ra khi tên chiếc hộp biến của bạn trùng khít với một tên có sẵn trong `std` (như `count`, `min`, `max`, `left`, `right`), khiến trình biên dịch không biết bạn muốn gọi cái nào.

---

### 2.3. Vấn Đề Nhỏ 3 & Ghép Lại: Tăng Tốc Nhập Xuất (`Fast I/O`), `'\n'` vs `endl` & Cấm Trộn `scanf/printf`

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Tưởng tượng Anh Thật Thà đứng trước 500.000 vị khách xếp hàng chờ in hóa đơn, và đồng hồ trọng tài chỉ cho phép làm xong trong **1 giây**. Tại sao cách làm mặc định ở `MOD-Pre` lại làm tiệm bánh bị quá giờ (`TLE`)? Có tới **3 sợi dây xích kìm hãm tốc độ**:

1. **Sợi dây xích 1 — Đối chiếu sổ sách với Bộ Loa Cũ (`sync_with_stdio`):**
   Trước khi C++ ra đời, ngôn ngữ lập trình cũ hơn là C dùng bộ loa-khe thế hệ cũ tên là `printf` và `scanf`. Để đề phòng có người dùng lẫn lộn cả bộ cũ lẫn bộ mới trong cùng một chương trình, C++ mặc định bắt Anh Thật Thà: *cứ nói một câu bằng `cout` hay đọc một số bằng `cin` là phải chạy qua đối chiếu đồng bộ với sổ sách của `printf/scanf`!* Việc chạy đi chạy lại đối chiếu làm tốc độ giảm đi nhiều lần.
2. **Sợi dây xích 2 — Cứ nhận phiếu mới là bắt loa dọn bàn (`cin.tie`):**
   Mặc định, khe nhận `cin` bị buộc dây vào loa `cout` (`cin.tie(&cout)`). Nghĩa là mỗi lần bạn dùng `cin >> x;`, Anh Thật Thà đều bắt loa `cout` phải dọn sạch toàn bộ chữ đang chờ trong khay ra màn hình xong xuôi rồi mới chịu đọc số `x`! Khi làm bài thi đấu đọc 500.000 số liên tiếp trên máy chấm tự động (nơi không có người ngồi nhìn màn hình tương tác từng câu), việc bắt loa dọn bàn liên tục này hoàn toàn vô ích và làm chậm chương trình.
3. **Sợi dây xích 3 — Bấm nút xả sổ cưỡng ép sau từng dòng (`endl` vs `'\n'`):**
   Khi bạn in hàng trăm nghìn dòng kết quả, mỗi lần dùng `endl`, Anh Thật Thà làm 2 việc: (1) xuống dòng mới, và (2) **ép xả ngay khay đệm ra màn hình (`flush`)** — giống như vừa viết xong 1 dòng tên khách đã chạy ngay ra bưu điện gửi một bức thư riêng, viết dòng thứ 2 lại chạy ra bưu điện gửi bức thứ 2! Trong khi đó, dùng ký tự `'\n'` chỉ là gõ một dấu xuống dòng nhẹ nhàng vào khay tạm (`buffer`), để máy tính tự gom nhiều dòng lại gửi một lần cho cực nhanh!

#### Bước 2: Ánh xạ vào lập trình C++ — Bộ Khung Chuẩn CP Hoàn Chỉnh
Tháo bỏ cả 3 sợi dây xích trên bằng **Bộ Khung Chuẩn CP** đặt ngay ở đầu hàm `main()`:

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int soBanh, donGia;
    cin >> soBanh >> donGia;
    cout << "Tong tien: " << soBanh * donGia << '\n';

    return 0;
}
```

**Giải thích từng dòng tăng tốc:**
- `ios_base::sync_with_stdio(false);`: Cắt sợi dây xích đồng bộ giữa luồng C++ (`cin/cout`) và luồng C (`scanf/printf`). Từ giờ `cin/cout` chạy độc lập với tốc độ tối đa!
- `cin.tie(NULL);`: Tháo dây buộc giữa `cin` và `cout`. Khi đọc dữ liệu bằng `cin`, chương trình không tự động ép xả `cout` nữa.
- Dùng `'\n'` thay cho `endl` ở cuối mỗi dòng xuất (`cout << ketQua << '\n';`).
  - *Ngoại lệ nhỏ:* Chỉ giữ `endl` (hoặc `cout.flush()`) khi làm **bài toán tương tác (Interactive Problem)** — dạng bài hiếm gặp mà chương trình của bạn và máy chấm phải hỏi-đáp qua lại từng lượt một. Với 99% bài thi bình thường, luôn dùng `'\n'`.

**CẢNH BÁO CẤM KỴ TUYỆT ĐỐI:**
> Khi đã viết `ios_base::sync_with_stdio(false);`, **TUYỆT ĐỐI KHÔNG BAO GIỜ TRỘN LẪN** `scanf`/`printf` với `cin`/`cout` trong cùng một chương trình!
> Vì hai bộ loa-khe lúc này dùng hai khay nhớ tách rời hoàn toàn không liên lạc với nhau. Nếu bạn viết `cout << "Dong 1\n";` rồi `printf("Dong 2\n");`, rất có thể chữ `"Dong 2"` từ khay `printf` sẽ nhảy vọt lên in **TRƯỚC** `"Dong 1"` đang nằm chờ trong khay `cout`, khiến kết quả bị đảo lộn và nhận ngay **Wrong Answer (WA)**!

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Bộ đệm (`Buffer`):** Chiếc khay đựng tạm dữ liệu xuất/nhập. Gom nhiều dòng rồi đẩy ra màn hình một lượt nhanh hơn rất nhiều so với đẩy lẻ tẻ từng dòng.
- **Xả bộ đệm (`Flush`):** Hành động ép đẩy sạch mọi thứ đang nằm trong khay tạm ra ngoài ngay lập tức (lệnh `endl` luôn tự động thực hiện việc này).
- **Fast I/O:** Kỹ thuật tăng tốc nhập xuất dữ liệu trong C++ bằng cặp lệnh `ios_base::sync_with_stdio(false); cin.tie(NULL);` kết hợp ký tự xuống dòng `'\n'`.
- **TLE (`Time Limit Exceeded`):** Lỗi vượt quá giới hạn thời gian chạy cho phép của máy chấm bài tự động.

---

## 3. Bảng Tổng Kết Chuẩn CP (`MOD-CP0`)

| Thành phần trong Bộ Khung Chuẩn CP | Hình tượng Tiệm Bánh Mì Đời Sống | Tác dụng & Quy tắc vàng |
| :--- | :--- | :--- |
| `#include <bits/stdc++.h>` | Vali Đồ Nghề Đa Năng Tất Cả Trong Một | Nạp trọn bộ thư viện chuẩn C++ trên GCC (`g++`) chỉ với 1 dòng, không lo thiếu thư viện khi thi. |
| `using namespace std;` | Quy ước mặc định tìm đồ trong Vali Chuẩn | Gọi thẳng `cin`, `cout`, `string`, `max` không cần tiền tố `std::`. Tránh đặt tên biến trùng `count`, `min`, `max`, `left`, `right`. |
| `ios_base::sync_with_stdio(false);` | Ngắt trạm gác đối chiếu với bộ loa-khe cũ `scanf/printf` | Tăng tốc `cin`/`cout` lên nhiều lần. **Cấm kỵ trộn `scanf`/`printf` với `cin`/`cout`!** |
| `cin.tie(NULL);` | Cởi dây buộc bắt loa `cout` dọn bàn mỗi khi khe `cin` đọc phiếu | Giúp đọc hàng trăm nghìn số liên tục cực nhanh không bị khựng lại giữa chừng. |
| `'\n'` (thay cho `endl`) | Gõ dấu xuống dòng gọn vào khay tạm thay vì chạy đi gửi sổ từng dòng | Tránh thao tác xả bộ đệm (`flush`) dư thừa, bảo vệ code khỏi lỗi TLE. |
