# Bài Giảng: Nhập Môn Lập Trình C++ — Bản Chất Giao Tiếp & Tiệm Bánh Mì Của Anh Phụ Bếp Thật Thà

- **Mã chuyên đề:** `MOD-Pre` (Nền tảng khởi đầu)
- **Thời lượng ước tính:** 60–90 phút
- **Đối tượng học tập:** Dành cho người học ở mọi lứa tuổi (học sinh cấp 2, người lớn, người trái ngành) hoàn toàn chưa từng biết lập trình, muốn hiểu bản chất gốc rễ mà không phải học vẹt.

---

## 1. Bức Tranh Toàn Cảnh: Vấn Đề Lớn Cần Giải Quyết Trong Đời Sống

Hãy tạm quên đi màn hình máy tính đen kịt, các dòng mã loằng ngoằng hay những thuật ngữ công nghệ xa xôi. Hãy bước vào một câu chuyện đời thường giản dị:

Bạn vừa mở một **Tiệm Bánh Mì Ăn Sáng** trên góc phố. Mỗi buổi sáng, hàng trăm lượt khách tấp nập kéo đến:
- Người thì mua bánh mì pate, người thì dặn không ăn ớt.
- Người mua 2 ổ, người mua 5 ổ mang về cho cơ quan.
- Bạn vừa phải nhận order của khách, vừa nhớ từng con số, vừa nướng bánh cho nóng giòn, vừa tính tiền chính xác từng nghìn đồng và thối tiền thừa.

Một mình bạn làm không xuể. Khách đợi lâu bắt đầu phàn nàn, bạn thì toát mồ hôi hột và rất dễ tính nhầm tiền làm lỗ vốn. Bạn quyết định tìm một người hỗ trợ và may mắn thuê được một người phụ việc tên là **Anh Thật Thà**.

### Chân dung "Anh Phụ Bếp Thật Thà"
Anh Thật Thà sở hữu những phẩm chất mà bất kỳ chủ tiệm nào cũng mơ ước:
- **Sức khỏe vô địch và tốc độ phi thường:** Đôi tay anh ấy thoăn thoắt, có thể tính nhẩm hàng triệu phép tính trong chớp mắt mà không bao giờ nhầm lẫn một con số.
- **Tuyệt đối trung thành và cần cù:** Bảo gì làm nấy, làm việc 24/7 không biết mệt mỏi, không bao giờ tự ý làm sai và không bao giờ cãi lời chủ.

**Nhưng anh ấy có một đặc điểm chí mạng:**
> **Anh ấy "ngây ngô" một cách máy móc tuyệt đối! Anh ấy chỉ hiểu nghĩa đen của từng từ, hoàn toàn không có khả năng tự suy diễn, không biết đoán mò và không hiểu những câu nói bóng gió.**

Nếu bạn bước vào bếp và dặn anh ấy như cách con người vẫn nói chuyện với nhau:
*"Này anh, có khách đông kìa, mau lấy bánh mì ra nướng giòn rồi tính tiền cho người ta đi nhé!"*
... thì ngay lập tức, **toàn bộ gian bếp sẽ rơi vào tình trạng tê liệt và hỗn loạn hoàn toàn!**

Tại sao lại tê liệt? Bởi vì giữa bạn và anh Thật Thà lập tức nảy sinh **3 bế tắc nan giải (3 Vấn Đề Nhỏ)**:

---

### Bế Tắc 1 (Vấn đề về Ranh giới khẩu lệnh & Cửa bắt đầu ca làm):
- **Nếu không có quy ước cửa bắt đầu:** Sáng sớm anh ấy đến tiệm, thấy gian bếp ngổn ngang hàng trăm thứ (chổi quét nhà, bồn rửa bát, bao tải bột mì, lò nướng bánh). Anh ấy cứ đứng trơ mắt ở cửa nhìn quanh, không hề nhúc nhích vì không biết phải bắt đầu từ việc nào trước!
- **Nếu không có ranh giới ngắt lệnh:** Khi bạn nói: *"Lấy bánh mì ra"* rồi bạn dừng lại 2 giây để thở trước khi nói tiếp *"bỏ vào lò nướng"*. Vì không có dấu hiệu dứt câu, anh ấy cứ nghĩ bạn vẫn đang nói dở câu nói chưa xong, nên đứng im bất động chờ đợi mãi mãi! Hoặc ngược lại, nếu bạn nói liền một tràng, anh ấy gộp tất cả thành một mớ âm thanh hỗn độn và không biết bước nào làm trước, bước nào làm sau.

---

### Bế Tắc 2 (Vấn đề về Rơi vãi dữ liệu & Hỗn loạn chứa đồ):
- **Nếu không có đồ đựng:** Khách đến mua 3 chiếc bánh, giá 15.5 nghìn một chiếc, khách tên là "An". Bạn dặn anh ấy: *"Nhớ lấy mấy thứ đó để tí nữa tính tiền"*. Anh Thật Thà không có túi áo, không có khay đựng. Anh ấy cầm con số 3 ở tay trái, con số 15.5 ở tay phải, ngậm chữ "An" trong miệng. Chỉ cần đi va vào cạnh bàn là các con số rơi vãi lung tung, quên sạch trơn sau 1 giây!
- **Nếu đựng nhầm loại đồ:** Bạn lấy túi lưới đựng hành tỏi để múc nước sốt $\rightarrow$ Nước sốt chảy lênh láng ra sàn nhà. Bạn lấy lọ thuốc nhỏ mắt để nhét cả ổ bánh mì $\rightarrow$ Vỡ lọ nứt toác.
- **Nếu chia đồ không đúng tính chất:** Có 5 ổ bánh mì chia đều cho 2 vị khách đói bụng. Vì anh ấy chỉ biết đếm từng ổ nguyên chiếc, anh ấy chia mỗi người 2 ổ rồi vứt luôn ổ bánh còn lại vào sọt rác thay vì cắt đôi thành $2.5$ ổ!

---

### Bế Tắc 3 (Vấn đề về Bế tắc kênh giao tiếp 2 chiều):
- **Nếu không có lối đẩy thông tin ra ngoài:** Gian bếp xây tường kín mít. Dù anh ấy có nướng xong bánh ngon tuyệt hay tính xong tiền, anh ấy cũng chỉ đặt trên bàn bên trong. Khách hàng đứng ngoài cửa sổ nhìn vào gian bếp tối om, không biết bánh xong chưa, không biết phải trả bao nhiêu tiền $\rightarrow$ Việc phục vụ tắc nghẽn.
- **Nếu không có lối đưa yêu cầu vào trong:** Anh ấy chỉ biết lặp lại những gì bạn dặn từ hôm qua. Khi một vị khách mới đến muốn mua 7 cái bánh chứ không phải 3 cái, khách không có cách nào đưa con số 7 đó vào cho anh ấy biết.
- **Nếu nhầm chiều giao tiếp:** Khách đang chìa tiền ra thì anh ấy lại thò tay giật bánh của khách; khách đang chờ lấy bánh thì anh ấy lại đòi khách đưa bánh cho mình.

---

> **TỔNG KẾT VẤN ĐỀ LỚN:**
> Nếu không giải quyết được 3 bế tắc trên, một người phụ tá phi thường như anh Thật Thà cũng trở nên hoàn toàn vô dụng.
> Bây giờ, chúng ta sẽ lần lượt giải quyết từng bế tắc một cách khoa học, sau đó ghép chúng lại thành một quy trình hoàn hảo!

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Ranh Giới Khẩu Lệnh & Cửa Bắt Đầu Ca Làm

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Để anh Thật Thà không bị lúng túng và không đứng chờ vô tận, bạn và anh ấy thống nhất 3 quy tắc sắt đá:
1. **Quy định Cánh Cửa Chính (Ca Sáng):** Trong tiệm có nhiều phòng, nhưng bạn dán một tấm biển đỏ lên cánh cửa gian bếp chính: *"CỬA CA SÁNG"*. Khi bắt đầu một ngày mới, anh ấy luôn bước vào đúng cánh cửa này đầu tiên và mở cuốn sổ dặn việc ra đọc từ dòng số 1.
2. **Chiếc Chuông Đồng Gõ Dứt Lệnh:** Bạn treo một chiếc chuông nhỏ ở bàn dặn việc. Cứ dặn xong trọn vẹn MỘT hành động, bạn gõ chiếc chuông một tiếng thật đanh: *"Reng!"*. 
   - Hễ nghe thấy tiếng *"Reng!"*, anh Thật Thà biết chắc chắn mệnh lệnh đó đã trọn vẹn, anh lập tức bắt tay vào làm ngay mà không cần đợi.
   - Nếu bạn chưa gõ chuông, anh ấy sẽ kiên nhẫn đứng đợi bạn dặn nốt phần còn lại của câu lệnh.
3. **Báo cáo kết thúc ca làm việc:** Khi làm xong việc cuối cùng trong sổ, anh ấy bấm chiếc còi báo hiệu: *"Mọi việc đã hoàn thành trọn vẹn, không xảy ra sự cố đổ vỡ nào!"* rồi mới yên tâm đóng cửa nghỉ ngơi.

#### Bước 2: Ánh xạ vào lập trình C++
Mọi chương trình C++ trên thế giới đều bắt đầu chính xác từ 3 quy tắc đời sống này:

```cpp
#include <iostream>

int main() {
    // 1. Dặn anh phụ bếp in lời chào và GÕ CHUÔNG KẾT THÚC CÂU LỆNH (dấu ;)
    std::cout << "Xin chao! Toi la nguoi phu viec cham chi cua ban!";

    // 2. Báo cáo ca làm việc hoàn thành mỹ mãn không có lỗi (mã số 0)
    return 0;
}
```

- **`int main() { ... }` (Cánh Cửa Chính):** Là điểm khởi đầu duy nhất mà máy tính luôn bước vào đầu tiên khi mở tiệm. Dấu mở ngoặc `{` là bước chân vào phòng, dấu đóng ngoặc `}` là bước chân ra khỏi phòng.
  - *Tại sao lại có chữ `int` đứng trước chữ `main`?* Vì khi kết thúc ca làm việc, anh phụ bếp sẽ báo cáo một **con số nguyên** (mã số 0 an toàn ở lệnh `return 0;`). Do đó, trước cửa phòng chỉ huy bắt buộc phải gắn biển `int` để thông báo trước: "Căn phòng này khi đóng cửa sẽ trả về một con số nguyên!".
- **Dấu chấm phẩy `;` (Tiếng Chuông Đồng):** Cực kỳ quan trọng! Mỗi câu lệnh trong C++ bắt buộc phải kết thúc bằng dấu `;`. Nếu bạn quên dấu `;`, người phụ việc (và người chấm bài kiểm tra của máy tính) sẽ báo lỗi ngay lập tức vì tưởng câu lệnh của bạn vẫn còn đang dang dở!
- **`return 0;` (Báo Cáo Thành Công):** Báo cáo cho hệ thống biết: "Chương trình đã thực hiện xong mọi chỉ thị và kết thúc an toàn với mã lỗi bằng 0 (không có tai nạn nào)".

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Câu lệnh (Statement):** Một chỉ thị trọn vẹn gửi tới máy tính, luôn kết thúc bằng dấu chấm phẩy `;`.
- **Hàm `main` (Main Function):** Từ *"main"* trong tiếng Anh nghĩa là *"chính yếu, quan trọng nhất"*. Đây là căn phòng chỉ huy, nơi điều hành toàn bộ công việc của chương trình.
- **Lỗi cú pháp (Syntax Error / Expected ';'):** Lỗi khi bạn viết thiếu dấu `;` hoặc sai quy tắc từ ngữ, tương đương việc bạn quên gõ chuông làm anh phụ việc đứng bối rối không hiểu khẩu lệnh.
- **Tiền tố `std::` là gì?** Bạn sẽ thấy chữ `std::` xuất hiện trước `cout`, `cin`, `endl`, `string`. Chữ `std` là viết tắt của **Standard** (nghĩa là *"Bộ Tiêu Chuẩn Quốc Tế"*). Khi viết `std::cout`, bạn đang dặn anh phụ việc: *"Hãy dùng chiếc Loa Chuẩn Quốc Tế có sẵn trong hộp đồ nghề của C++ nhé!"*. Hai dấu hai chấm `::` giống như một sợi dây nối chỉ xuất xứ của dụng cụ.

---

### 2.2. Vấn Đề Nhỏ 2: Hộp Dán Nhãn & Phân Loại Đồ Đạc (Biến & Kiểu Dữ Liệu)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Để thông tin không bị rơi vãi, quên mất và lẫn lộn lung tung, bạn sắm một **Kệ Gỗ Đựng Đồ** đặt ngay giữa gian bếp:
1. **Dán nhãn định danh cho từng hộp:** Bạn lấy giấy ghi tên dán lên thành hộp: Hộp dán chữ `so_banh`, hộp dán chữ `gia_tien`, hộp dán chữ `ten_khach`.
2. **Chọn đúng loại hộp cho từng loại đồ (Phân loại hộp):**
   - **Hộp Đếm Số Nguyên:** Chỉ dùng để đựng số lượng cái bánh mì đếm được (1 cái, 2 cái, 5 cái). Hộp này có thành bằng gỗ cứng chắc, không chứa mảnh vỡ lẻ.
   - **Hộp Số Lẻ (Có Vạch Chia Độ):** Dùng để đong đếm tiền nong hoặc khối lượng có số thập phân (15.5 nghìn đồng, 0.5 kg pate).
   - **Hộp Đựng Giấy Chữ:** Chiếc hộp dẹt dài chuyên đựng mẩu giấy ghi họ tên của khách hàng hoặc lời nhắn dặn dò.
3. **Quy tắc bỏ đồ vào hộp:** Khi muốn lưu trữ cái gì, bạn xúc lấy đồ bên tay phải, đặt gọn vào chiếc hộp có dán nhãn bên tay trái.
4. **Bài học chia bánh mì:** Nếu bạn lấy 5 ổ bánh mì trong Hộp Số Nguyên chia đều cho 2 người, vì đây là chiếc hộp "chỉ biết đếm số nguyên", nó chỉ có thể chứa được con số 2 (mỗi người 2 ổ), còn mẩu bánh nửa ổ `.5` bị rơi ra ngoài sàn nhà mất tích! Muốn chia ra đúng $2.5$, bạn buộc phải chuyển số bánh sang Hộp Số Lẻ trước khi chia.

#### Bước 2: Ánh xạ vào lập trình C++
Trong C++, chiếc kệ gỗ đựng đồ chính là bộ nhớ máy tính, và những chiếc hộp dán nhãn chính là **Biến số (Variables)**:

```cpp
#include <iostream>
#include <string>

int main() {
    // 1. Tạo chiếc hộp chứa số nguyên có nhãn là 'soBanh', đặt số 3 vào hộp
    int soBanh = 3;

    // 2. Tạo chiếc hộp chứa số lẻ có nhãn là 'giaTien', đặt số 15.5 vào hộp
    double giaTien = 15.5;

    // 3. Tạo chiếc hộp chứa chuỗi chữ có nhãn là 'tenKhach', đặt chữ "An" vào hộp
    std::string tenKhach = "An";

    // 4. Bài học chia nguyên:
    int phepChiaNguyen = 5 / 2;      // Kết quả là 2 (mất phần .5)
    double phepChiaDung = 5.0 / 2.0; // Kết quả là 2.5 (giữ trọn vẹn phần lẻ)

    return 0;
}
```

- **Các kiểu dữ liệu cơ bản (Các loại hộp):**
  - **`int` (Integer):** Chiếc hộp chứa số nguyên (như `1`, `2`, `-10`, `100`).
  - **`double`:** Chiếc hộp chứa số thực có phần lẻ thập phân (như `15.5`, `3.14`, `-0.75`).
  - **`std::string`:** Chiếc hộp chứa cả một chuỗi chữ viết đặt trong dấu nháy kép `" ... "` (như `"Nguyen Van An"`, `"Banh mi pate"`).
  - **`char` (Character):** Chiếc hộp nhỏ xíu chỉ chứa đúng 1 ký tự đặt trong nháy đơn `' ... '` (như `'A'`, `'M'`, `'x'`).
  - **`bool` (Boolean):** Chiếc hộp công tắc chỉ có 2 trạng thái: `true` (Đúng / Bật) hoặc `false` (Sai / Tắt).
- **Phép gán (Dấu bằng `=`):** Trong lập trình, dấu `=` mang ý nghĩa là **hành động xúc giá trị bên tay phải bỏ vào chiếc hộp bên tay trái** (chứ không phải so sánh bằng nhau trong toán học). Ví dụ: `soBanh = 5;` nghĩa là xúc số 5 bỏ vào hộp `soBanh`.
- **Dấu nhân `*` và dấu chia `/`:** Trong lập trình, máy tính dùng dấu sao `*` thay cho dấu nhân $(\times)$ trong vở toán, và dùng dấu gạch chéo `/` thay cho dấu chia $(:)$.
- **Lưu ý nhỏ khi nhập chữ:** Ở bài nhập môn này, khi nhập tên khách hàng bằng `cin >>`, bạn hãy gõ một chữ viết liền (ví dụ: `An`, `Nam`, `Linh`) nhé. 
  - *Nếu lỡ tay gõ cả họ và tên có dấu cách (như "Nguyen Van An") thì sao?* Đừng lo, tiệm bánh không bị nổ đâu! Chỉ là anh Thật Thà ngây ngô sẽ chỉ nhặt đúng từ đầu tiên `"Nguyen"` bỏ vào hộp, các từ còn lại bị rơi rớt ngoài cửa. Cách "trị" tính ngây ngô này để gom trọn vẹn cả họ lẫn tên chúng ta sẽ được học ở bài nâng cao tiếp theo.

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Biến (Variable):** Một ô chứa dữ liệu tạm thời trên bàn làm việc, có một cái tên để gọi và giá trị bên trong có thể thay đổi được.
- **Kiểu dữ liệu (Data Type):** Định dạng và kích cỡ của chiếc hộp (máy tính cần biết bạn muốn chứa số nguyên, số lẻ hay chữ cái để bố trí chiếc hộp vừa vặn).
- **Hiện tượng chia nguyên (Integer Division):** Khi lấy hai số nguyên chia cho nhau, máy tính sẽ cắt bỏ hoàn toàn phần thập phân đằng sau. Muốn giữ lại phần thập phân, ít nhất một trong hai con số phải là số thực (`5.0 / 2` hoặc `5 / 2.0`).

---

### 2.3. Vấn Đề Nhỏ 3 & Ghép Lại: Kênh Giao Tiếp Hai Chiều & Tiệm Bánh Mì Hoàn Chỉnh

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Bây giờ, anh Thật Thà đã biết khi nào bắt đầu làm việc (Cửa ca sáng `main`), biết khi nào xong một lệnh (Chuông `;`), và có sẵn các hộp dán nhãn để không bao giờ đánh rơi dữ liệu. 
Bế tắc cuối cùng cần giải quyết là **Giao tiếp giữa gian bếp bên trong và khách hàng bên ngoài**:

1. **Lắp Loa Phát Thanh (Đẩy thông điệp ra ngoài):**
   - Bạn gắn một chiếc loa phát thanh ngay trên bệ cửa sổ gian bếp, hướng miệng loa ra phía khách hàng.
   - Mỗi khi anh phụ bếp muốn chào khách, thông báo giá tiền hoặc báo món ăn đã xong, anh ấy chỉ cần đẩy câu chữ vào miệng loa. Âm thanh sẽ bay theo một chiều từ trong bếp vang ra ngoài tai khách hàng.
2. **Mở Khe Nhận Phiếu Order (Hút thông tin vào trong):**
   - Bạn khoét một khe trượt nhỏ ở mép cửa sổ, nối liền một đường trượt dẫn thẳng vào miệng chiếc hộp dán nhãn trên kệ gỗ.
   - Khách đứng bên ngoài ghi tên mình hoặc số lượng bánh vào tờ phiếu rồi nhét qua khe. Tờ phiếu sẽ trượt theo một chiều từ tay khách rơi thẳng vào đúng chiếc hộp đang mở nắp trong bếp.
3. **Mũi tên định hướng một chiều:**
   - Khi dặn anh ấy nói ra loa: Mũi tên chĩa về phía chiếc loa (`<<`).
   - Khi dặn anh ấy nhận đồ từ khe: Mũi tên chĩa về phía chiếc hộp nhận (`>>`).

#### Bước 2: Ánh xạ vào lập trình C++
Trong C++, việc giao tiếp giữa chương trình và con người được thực hiện thông qua thư viện Nhập/Xuất chuẩn (`iostream` = Input/Output Stream):

- **Mượn bộ loa và khe nhận: `#include <iostream>`** ở ngay đầu cuốn sổ dặn việc. 
  - Dấu thăng `#` giống như một chiếc cờ hiệu lệnh: "Hãy chuẩn bị đồ nghề này TRƯỚC KHI mở cửa tiệm!". 
  - Cặp ngoặc nhọn `<iostream>` là chiếc hộp niêm phong dụng cụ mượn từ kho thư viện tiêu chuẩn (`Input/Output Stream`).
- **Chiếc loa phát thanh hướng ra màn hình: `std::cout` (Console Output)**
  - Cú pháp: `std::cout << "Thong bao" << std::endl;`
  - Dấu mũi tên `<<` mô phỏng hướng đẩy thông tin từ trong chương trình bắn thẳng vào miệng loa `cout` để hiện lên màn hình.
  - `std::endl` (End Line): Lệnh xuống dòng và nghỉ thở, giúp câu tiếp theo được in ở dòng mới phía dưới.
- **Khe nhận dữ liệu từ bàn phím: `std::cin` (Console Input)**
  - Cú pháp: `std::cin >> tenHop;`
  - Dấu mũi tên `>>` mô phỏng hướng dữ liệu từ bàn phím người dùng gõ vào, chảy xuôi dòng và rót thẳng vào chiếc hộp mang tên `tenHop`.

---

#### Bước 3: Ghép Lại Thành Lời Giải Hoàn Chỉnh — Toàn Bộ Chương Trình Tiệm Bánh Mì

Bây giờ, chúng ta ghép trọn vẹn cả 3 giải pháp trên vào một chương trình C++ hoàn chỉnh. Đây chính là bản hướng dẫn từng li từng tí giúp anh Thật Thà vận hành tiệm bánh mì một cách xuất sắc:

```cpp
#include <iostream>  // Mượn bộ loa phát thanh (cout) và khe nhận phiếu (cin)
#include <string>    // Mượn hộp đựng chữ viết dài (string)

int main() {
    // =========================================================================
    // GIẢI PHÁP 2: Chuẩn bị sẵn các chiếc hộp dán nhãn trên kệ gỗ
    // =========================================================================
    std::string tenKhach;      // Hộp đựng họ tên khách
    int soBanh;                // Hộp đựng số lượng bánh mì (số nguyên cái)
    double giaMotBanh = 15.5;  // Hộp số lẻ: Giá một chiếc bánh là 15.5 nghìn đồng

    // =========================================================================
    // GIẢI PHÁP 1 & 3: Loa chào khách và Khe nhận thông tin từ bên ngoài
    // =========================================================================
    // Bật loa chào khách (kết thúc câu lệnh bằng tiếng chuông ;)
    std::cout << "=== TIEM BANH MI CHU THIEN XIN CHAO! ===" << std::endl;
    std::cout << "Xin moi quy khach nhap ten cua ban: ";
    
    // Khe nhận phiếu: Hút tên khách vừa gõ từ bàn phím rót vào hộp tenKhach
    std::cin >> tenKhach;

    std::cout << "Chao ban " << tenKhach << "! Ban muon mua bao nhieu chiec banh mi? ";
    
    // Khe nhận phiếu: Hút số lượng bánh rót vào hộp soBanh
    std::cin >> soBanh;

    // =========================================================================
    // GIẢI PHÁP 2: Tính toán tiền nong và xúc vào hộp tongTien (Dấu * là phép nhân)
    // =========================================================================
    double tongTien = soBanh * giaMotBanh;

    // =========================================================================
    // GIẢI PHÁP 3: Loa thông báo hóa đơn ra ngoài cửa sổ cho khách
    // =========================================================================
    std::cout << std::endl;
    std::cout << "----------------------------------------" << std::endl;
    std::cout << "HOA DON CUA KHACH HANG: " << tenKhach << std::endl;
    std::cout << "So luong banh: " << soBanh << " chiec" << std::endl;
    std::cout << "Don gia: " << giaMotBanh << " nghin dong/chiec" << std::endl;
    std::cout << "TONG TIEN THANH TOAN: " << tongTien << " nghin dong." << std::endl;
    std::cout << "----------------------------------------" << std::endl;
    std::cout << "Cam on ban da ung ho tiem banh mi!" << std::endl;

    // =========================================================================
    // GIẢI PHÁP 1: Báo cáo kết thúc ca làm việc thành công mỹ mãn
    // =========================================================================
    return 0;
}
```

---

## 3. Tổng Kết Kiến Thức Đọng Lại

Sau bài học này, bạn đã làm chủ được những viên gạch nền móng đầu tiên của toàn bộ thế giới lập trình:

| Khái niệm trong Lập trình | Hình tượng trong Tiệm Bánh Mì Đời Sống | Ý nghĩa thực tế |
| :--- | :--- | :--- |
| **Lập trình (Programming)** | Viết cuốn sổ dặn việc cho anh phụ bếp ngây ngô | Đưa ra các chỉ dẫn tường minh, chính xác, không mập mờ để máy tính làm việc thay con người. |
| **Hàm `int main()`** | Cánh Cửa Chính bước vào Ca Sáng | Nơi máy tính luôn bắt đầu thực thi chương trình đầu tiên. |
| **Dấu chấm phẩy `;`** | Tiếng Chuông Đồng dứt câu lệnh | Đánh dấu kết thúc một mệnh lệnh dứt khoát. Quên `;` máy tính sẽ không biết lệnh dừng ở đâu. |
| **Biến số (Variable)** | Chiếc Hộp Dán Nhãn trên kệ | Vùng nhớ lưu trữ dữ liệu tạm thời để tính toán. |
| **Kiểu dữ liệu (`int, double...`)** | Chủng loại và kích cỡ của chiếc hộp | Hộp đựng số nguyên (`int`), hộp đựng số lẻ (`double`), hộp đựng chữ (`string`). |
| **Phép gán (`=`)** | Hành động xúc đồ bên phải bỏ vào hộp bên trái | Đưa giá trị vào biến để cất giữ. |
| **`std::cout <<`** | Loa Phát Thanh đẩy thông điệp ra ngoài | Xuất dữ liệu từ chương trình ra màn hình cho con người nhìn thấy. |
| **`std::cin >>`** | Khe Nhận Phiếu hút thông tin vào trong hộp | Nhận dữ liệu do con người gõ từ bàn phím rót vào biến. |
| **`return 0;`** | Báo Cáo Hoàn Thành ca làm việc an toàn | Báo cho hệ thống biết chương trình đã chạy xong xuôi và không gặp lỗi. |
