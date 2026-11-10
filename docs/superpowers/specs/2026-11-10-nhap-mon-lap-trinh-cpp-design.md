# Đặc Tả Thiết Kế (Design Spec) — Chuyên Đề: Nhập Môn Lập Trình C++ (Bản Chất Vấn Đề Gốc & Nghệ Thuật Chỉ Dẫn Người Phụ Việc Ngây Ngô)

- **Mã chuyên đề:** `MOD-Pre` (hoặc `MOD-00-Pre`)
- **Tên chuyên đề:** `00_NhapMon_LapTrinh_CPP`
- **Ngày cập nhật:** 2026-11-10
- **Phiên bản:** 4.0 (Triết lý: Đi từ Vấn đề gốc đời sống & Hậu quả nếu thiếu cơ chế → Giải pháp từng phần → Ghép lại hoàn chỉnh)
- **Thư mục đích:** `/home/paust/Projects/DayHoc/00_NhapMon_LapTrinh_CPP/`
- **Đối tượng học tập:** Mọi lứa tuổi (từ học sinh lớp 6-7, sinh viên đến người đi làm), hoàn toàn chưa biết gì về lập trình.

---

## 1. Phương Pháp Sư Phạm Cốt Lõi: Problem-First (Vấn Đề Đi Trước, Giải Pháp Theo Sau)

### 1.1. Nguyên tắc sống còn
- **Không bao giờ đưa ra giải pháp hay cú pháp trước khi người học cảm nhận được vấn đề.**
- Mọi đặc điểm của ngôn ngữ lập trình (dấu chấm phẩy `;`, hàm `main`, biến, kiểu dữ liệu, `cin`, `cout`) **đều sinh ra để giải quyết một thảm họa cụ thể**.
- Tiếp cận bằng câu hỏi: **"Nếu không có cơ chế đó, điều tồi tệ gì sẽ xảy ra trong đời sống?"**
- Trình bày toàn bộ **Vấn đề lớn $\rightarrow$ 3 Vấn đề nhỏ** trước để người học nhìn thấy bức tranh toàn cảnh về sự bế tắc/hỗn loạn, sau đó mới đi vào giải quyết từng vấn đề một và ghép lại thành chương trình hoàn chỉnh.

---

## 2. Bức Tranh Toàn Cảnh: Vấn Đề Lớn & 3 Vấn Đề Nhỏ

### 2.1. Vấn Đề Lớn Cần Giải Quyết Trong Đời Sống
Bạn mở một tiệm bánh mì đông khách vào mỗi sáng. Bạn phải làm hàng trăm việc: nhận yêu cầu từ khách, nhớ số lượng bánh, tính tiền chính xác từng hào, giao bánh và thối tiền. 
Bạn không thể tự làm một mình nên bạn thuê một **Anh Phụ Bếp Thật Thà (Người Phụ Việc Ngây Ngô)**:
- Anh ấy có thể lực phi thường, đôi tay thoăn thoắt, tính toán siêu nhanh, bảo gì làm nấy, không bao giờ biết mệt mỏi hay gian dối.
- **Nghịch lý trớ trêu:** Nếu bạn nói chuyện với anh ấy như một người bình thường (*"Này anh, có khách kìa, lấy bánh rồi tính tiền giúp tôi với"*), thì **gian bếp lập tức rơi vào hỗn loạn và tê liệt hoàn toàn!**

**Tại sao lại tê liệt?** Vì xuất hiện 3 bế tắc nan giải:
1. **Bế tắc 1 (Về ranh giới câu lệnh & thời điểm bắt đầu):** Nếu bạn nói một câu dài không ngắt nghỉ, làm sao anh ấy biết câu lệnh kết thúc ở đâu để bắt tay vào làm? Anh ấy cứ đứng trơ mắt chờ bạn nói tiếp mãi mãi!
2. **Bế tắc 2 (Về lưu trữ & nhầm lẫn dữ liệu):** Khách order 3 chiếc bánh mì thịt, giá 15.5 nghìn một chiếc, khách tên "An". Nếu không có chỗ cất giữ có quy củ, các con số và chữ viết sẽ rơi vãi, lẫn lộn hoặc bị anh ấy quên sạch ngay sau 1 giây!
3. **Bế tắc 3 (Về kênh chuyển giao dữ liệu 2 chiều):** Gian bếp đóng kín với thế giới bên ngoài. Nếu không có quy định về lối đưa đồ vào và lối đẩy đồ ra, anh ấy không biết khách muốn gì, nấu xong cũng giấu tiệt trong góc bếp không ai nhìn thấy!

---

## 3. Chi Tiết Từng Vấn Đề Nhỏ: Từ "Hậu Quả Nếu Thiếu" Đến "Giải Pháp C++"

### 3.1. Vấn Đề Nhỏ 1: Ranh Giới Khẩu Lệnh & Cửa Bắt Đầu Ca Làm Việc

#### Bước 1: Vấn đề trong đời sống (Hậu quả nếu không có)
- **Nếu không có điểm bắt đầu quy ước:** Bạn để anh phụ việc vào bếp từ sáng. Anh ấy cứ đứng ở cửa nhìn quanh: Có cả trăm việc (quét nhà, rửa bát, nướng bánh, đếm tiền), anh ấy hoàn toàn không biết phải bắt đầu từ đâu!
- **Nếu không có dấu ngắt câu lệnh dứt khoát:** Bạn dặn: *"Lấy bánh mì ra"* rồi bạn dừng lại hít một hơi thở để dặn tiếp *"cho vào lò nướng"*. Nhưng vì không có tín hiệu dứt câu, anh ấy cứ nghĩ bạn vẫn đang nói dở, nên đứng im bất động chờ đợi, hoặc anh ấy nghe lẫn lộn các câu vào nhau thành một mệnh lệnh quái dị không thể thực hiện!
- **Giải pháp trong đời sống:**
  - Quy ước một **Cánh cửa chính mang tên Ca Sáng**: Anh ấy chỉ bước vào cánh cửa này và bắt đầu đọc danh sách dặn việc từ trên xuống dưới.
  - Trang bị một **Chiếc chuông con**: Cứ dặn xong trọn vẹn MỘT việc, bạn gõ chuông một tiếng *"Reng!"*. Nghe thấy tiếng chuông, anh ấy mới lập tức thực hiện xong việc đó rồi mới nghe việc tiếp theo. Làm xong việc cuối cùng, anh ấy bấm còi báo cáo ca làm thành công và đóng cửa.

#### Bước 2: Ánh xạ vào C++
- Cánh cửa chính: Hàm `int main() { ... }` — Điểm khởi đầu duy nhất mà hệ thống luôn bước vào đầu tiên.
- Chiếc chuông báo hết lệnh: Dấu chấm phẩy `;` — Kết thúc một câu lệnh (`statement`). Quên dấu `;` tương đương với việc không gõ chuông, trình biên dịch báo lỗi vì không biết câu lệnh ngắt ở đâu.
- Báo cáo hoàn thành: `return 0;` — Mã số báo hiệu chương trình kết thúc thành công, không gặp tai nạn.

#### Bước 3: Bản chất & Thuật ngữ
- **Câu lệnh (Statement):** Một chỉ thị hoàn chỉnh kết thúc bằng `;`.
- **Hàm `main()` (Entry Point):** Cánh cổng vào duy nhất của chương trình.
- **Lỗi cú pháp (Syntax Error / Expected ';'):** Lỗi do bạn quên gõ chuông `;`, người phụ việc từ chối làm việc ngay từ đầu.

---

### 3.2. Vấn Đề Nhỏ 2: Hỗn Loạn Chứa Đồ & Rơi Vãi Dữ Liệu (Biến & Kiểu Dữ Liệu)

#### Bước 1: Vấn đề trong đời sống (Hậu quả nếu không có)
- **Nếu không có vật chứa có tên:** Khách dặn mua 3 cái bánh, giá 15.5 nghìn, tên là "An". Bạn bảo anh phụ việc: *"Nhớ lấy để tí nữa tính tiền"*. Anh ấy không có túi hay khay đựng nào cả. Anh ấy cầm số 3 ở tay trái, số 15.5 ở tay phải, tên "An" ngậm trong miệng. Chỉ cần đi va vào mép bàn là rơi vãi sạch trơn hoặc nhầm số lượng thành giá tiền!
- **Nếu không phân loại vật chứa (Đổ nhầm loại đồ):** Bạn lấy chiếc túi lưới đựng hành tỏi để đựng nước sốt $\rightarrow$ Nước sốt chảy lênh láng ra sàn nhà. Bạn lấy lọ thuốc nhỏ mắt để nhét cả ổ bánh mì $\rightarrow$ Vỡ lọ.
- **Nếu chia đồ không đúng tính chất:** Bạn có 5 ổ bánh mì chia đều cho 2 người. Vì anh phụ việc chỉ biết đếm từng ổ nguyên vẹn, anh ấy chia mỗi người 2 ổ rồi vứt luôn ổ còn lại ra sọt rác thay vì cắt đôi thành 2.5!
- **Giải pháp trong đời sống:**
  - Trên bàn làm việc, sắp sẵn **những chiếc hộp dán nhãn tên gọi rõ ràng** (`so_banh`, `gia_tien`, `ten_khach`).
  - Mỗi hộp có hình dạng và tính chất riêng:
    - *Hộp số nguyên (`int`):* Chuyên đựng các con số đếm nguyên chiếc (1 cái, 2 cái, không có mảnh vỡ).
    - *Hộp số lẻ (`double`):* Chuyên đong đếm các số có phần lẻ thập phân (15.5 nghìn, 3.14).
    - *Hộp chữ viết (`string`):* Chuyên đựng các dòng chữ dài (họ tên, lời dặn).
    - *Hộp ký tự đơn (`char`):* Hộp tí hon đựng đúng một chữ cái ('M', 'L').
    - *Hộp cờ hiệu (`bool`):* Hộp công tắc chỉ có 2 trạng thái Bật (Đúng) hoặc Tắt (Sai).
  - Hành động xúc đồ bỏ vào hộp: Phép gán `=`.

#### Bước 2: Ánh xạ vào C++
```cpp
int soBanh = 3;             // Hộp số nguyên
double giaTien = 15.5;      // Hộp số có phần lẻ
std::string tenKhach = "An"; // Hộp chuỗi chữ
```
- Khái niệm biến: Vùng nhớ được đặt tên trên bàn làm việc RAM.
- Bản chất phép chia nguyên: `5 / 2 = 2` vì hai số nguyên chia nhau chỉ trả về kết quả vào hộp số nguyên, phần dư `.5` bị vứt bỏ. Muốn có `2.5`, phải dùng hộp số thực `double` và phép chia có số thực: `5.0 / 2 = 2.5`.

#### Bước 3: Bản chất & Thuật ngữ
- **Biến (Variable):** Chiếc hộp chứa dữ liệu có tên gọi.
- **Kiểu dữ liệu (Data Type):** Định dạng và kích thước chiếc hộp (số byte bộ nhớ).
- **Phép gán (`=`):** Lấy giá trị bên phải đặt vào chiếc hộp bên trái.

---

### 3.3. Vấn Đề Nhỏ 3 & Ghép Lại: Kênh Giao Tiếp Hai Chiều & Lời Giải Hoàn Chỉnh

#### Bước 1: Vấn đề trong đời sống (Hậu quả nếu không có)
- **Nếu không có lối đẩy thông điệp ra ngoài:** Anh phụ việc ở trong bếp, dù tính tiền xong hay nướng bánh xong cũng chỉ để trên bàn bên trong. Khách bên ngoài nhìn vào ô cửa sổ tối om, không biết bánh đã xong chưa, giá tiền bao nhiêu $\rightarrow$ Mất kết nối.
- **Nếu không có lối nhận yêu cầu từ ngoài vào:** Anh ấy chỉ biết dùng các dữ liệu có sẵn từ hôm qua, không có cách nào để khách hàng truyền số lượng mong muốn của ngày hôm nay vào trong bếp.
- **Nếu nhầm lẫn chiều giao tiếp:** Khách đang muốn đưa tiền vào thì anh lại chìa tay giật đồ của khách; khách đang đợi lấy bánh thì anh lại đòi khách đưa bánh cho anh!
- **Giải pháp trong đời sống:**
  - Lắp đặt một chiếc **Loa phát thanh** hướng miệng loa ra ngoài cửa sổ: Mọi thông báo, kết quả đẩy vào miệng loa (`<<`) sẽ vang ra ngoài cho khách nghe thấy.
  - Mở một **Khe nhận phiếu order**: Phiếu order từ tay khách bên ngoài sẽ trượt theo mũi tên (`>>`) rót thẳng vào đúng chiếc hộp dán nhãn bên trong bếp.

#### Bước 2: Ánh xạ vào C++
- Bộ đồ nghề giao tiếp: `#include <iostream>` (`Input/Output Stream`).
- Chiếc loa phát thanh ra màn hình: `std::cout << thong_tin;` (mũi tên đẩy ra loa).
- Khe nhận thông tin từ bàn phím: `std::cin >> hop_bien;` (mũi tên rót vào hộp).

#### Bước 3: Ghép Lại Thành Chương Trình Hoàn Chỉnh (The Synthesis)
Ghép toàn bộ lời giải của 3 vấn đề nhỏ thành một chương trình trọn vẹn:
```cpp
#include <iostream>
#include <string>

int main() {
    // 1. Chuẩn bị các chiếc hộp có dán nhãn (Giải quyết Vấn đề 2)
    std::string tenKhach;
    int soBanh;
    double giaMotBanh = 15.5; // nghìn đồng

    // 2. Loa chào khách & Khe nhận phiếu order (Giải quyết Vấn đề 1 & 3)
    std::cout << "Xin chao! Quy khach ten la gi? ";
    std::cin >> tenKhach;

    std::cout << "Ban muon mua bao nhieu chiec banh mi? ";
    std::cin >> soBanh;

    // 3. Tính toán và lưu vào hộp tổng tiền (Giải quyết Vấn đề 2)
    double tongTien = soBanh * giaMotBanh;

    // 4. Loa thông báo kết quả ra cho khách (Giải quyết Vấn đề 3)
    std::cout << "Cam on ban " << tenKhach << "!" << std::endl;
    std::cout << "Tong so tien ban can thanh toan la: " << tongTien << " nghin dong." << std::endl;

    // 5. Báo cáo kết thúc ca làm việc mỹ mãn (Giải quyết Vấn đề 1)
    return 0;
}
```

---

## 4. Hệ Thống Tệp Tin & Kịch Bản Nghiệm Thu

```text
00_NhapMon_LapTrinh_CPP/
├── docs/
│   └── bai_giang_nhap_mon_cpp.md         # Giáo án Problem-First hoàn chỉnh
├── Code_Mau/
│   ├── 01_ChiecChuong_Va_CanhCua_Main.cpp # Cấu trúc lệnh, dấu ;, hàm main, return 0
│   ├── 02_NhungChiecHop_BienVaKieu.cpp    # Biến, kiểu int/double/string, chia nguyên
│   └── 03_LoaVaKheNhan_TiemBanhMi.cpp     # cin, cout, ghép lại toàn bộ chương trình
├── index.html                             # Web tương tác tái sử dụng shared/
└── lesson-data.js                         # Dữ liệu web, sandbox tương tác, trắc nghiệm 80-90%
```

### Kịch bản nghiệm thu với Subagent (`tests/audit_pedagogy_subagent.sh`):
Chạy `pi --no-session -p` với tiêu chí thẩm định:
1. Có trình bày toàn bộ Vấn Đề Lớn và 3 Vấn Đề Nhỏ trước khi đưa ra giải pháp không?
2. Tình huống đời sống "Hậu quả nếu thiếu cơ chế" có gây ấn tượng mạnh và dễ hiểu cho học sinh cấp 2 không?
3. Quá trình ghép 3 mảnh ghép lại thành code C++ có mượt mà, tự nhiên và thuyết phục không?
4. Trắc nghiệm có đạt chuẩn 80-90% độ tương đồng và không bẫy mẹo ngữ pháp không?
