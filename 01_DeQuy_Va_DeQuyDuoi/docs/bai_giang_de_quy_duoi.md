# Bài Giảng: Đệ Quy & Đệ Quy Đuôi (Tail Recursion) — Từ Bản Chất Bộ Nhớ Đến Tối Ưu Hóa Tuyệt Đối

- **Mã chuyên đề:** `MOD-01`
- **Thời lượng ước tính:** 90–120 phút
- **Đối tượng học tập:** Người mới học lập trình thi đấu C++, muốn hiểu sâu cách máy tính thực thi hàm trong RAM và làm chủ kỹ thuật khử tràn bộ nhớ.

---

## 1. Vấn Đề Lớn Cần Giải Quyết

Trong lập trình thi đấu, ta thường giải bài toán bằng cách chia bài toán lớn thành các bài toán con nhỏ hơn có cùng cấu trúc. Tuy nhiên, khi cho hàm tự gọi lại chính nó với độ sâu $N = 10^5$ hoặc $N = 10^6$ (ví dụ: tính tổng dãy số, tìm đường đi trên đồ thị sâu), chương trình ngay lập tức bị sập và báo lỗi:
```text
Segmentation fault (core dumped) - Hoặc Exit code 3221225725 (0xC00000FD)
```
**Câu hỏi cốt lõi:**
1. Tại sao máy tính còn hàng Gigabyte RAM mà hàm đệ quy mới gọi được vài trăm nghìn lần đã sập?
2. Làm thế nào để viết hàm tự gọi lại chính nó sâu tùy ý mà chỉ tiêu tốn bộ nhớ đúng bằng một vòng lặp đơn giản ($O(1)$ không gian)?

Để giải quyết vấn đề lớn này, chúng ta tách nó thành **3 vấn đề nhỏ**:
- **Vấn đề nhỏ 1:** Làm sao chia một việc lớn thành việc nhỏ giống hệt và biết khi nào phải dừng lại?
- **Vấn đề nhỏ 2:** Tại sao việc "chờ người trước trả lời xong rồi mới tính tiếp" lại làm đầy ngăn xếp bộ nhớ (Call Stack)?
- **Vấn đề nhỏ 3 & Ghép lại:** Làm sao bàn giao trọn vẹn kết quả ngay tại thời điểm gọi để người trước được giải phóng ngay lập tức (Đệ quy đuôi & TCO)?

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Chia Việc Lớn Thành Việc Nhỏ Giống Hệt

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Hãy tưởng tượng bạn đang ngồi trong một rạp chiếu phim tối đen và muốn biết mình đang ngồi ở **hàng ghế số mấy**. Bạn không thể đứng dậy đếm từ đầu vì sẽ che mắt người khác.
- **Cách bạn làm:** Bạn vỗ vai người ngồi ngay phía trước và hỏi: *"Bạn ngồi hàng số mấy?"*.
- Người phía trước cũng không biết, họ lại quay lên vỗ vai người phía trước nữa.
- Cứ như vậy, câu hỏi được chuyền dần lên phía trước cho đến khi chạm tới người ngồi ở **hàng đầu tiên**.
- Người hàng đầu tiên không cần hỏi ai cả, họ tự tin trả lời ngay: *"Tôi ngồi hàng số 1!"*.
- Câu trả lời được chuyền ngược lại về phía sau, mỗi người khi nhận được câu trả lời từ người trước chỉ việc lấy con số đó **cộng thêm 1** rồi báo cho người sau lưng mình.

#### Bước 2: Ánh xạ vào lập trình C++
Trong code, ta mô tả chính xác quá trình trên bằng một hàm nhận vào vị trí ghế và tự gọi lại chính nó:
```cpp
int timHangGhe(int nguoi) {
    if (nguoi == 1) return 1;          // Người đầu tiên: biết ngay đáp án
    return timHangGhe(nguoi - 1) + 1;  // Chờ người trước trả lời rồi cộng 1
}
```
- Nếu không có dòng kiểm tra `nguoi == 1`, câu hỏi sẽ bị chuyền mãi mãi ra ngoài rạp chiếu phim (lặp vô tận).

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ (Liên kết ngược về ví dụ đời sống)
- **Đệ quy (Recursion):**
  - *Chữ "Đệ":* Trong tiếng Hán-Việt có nghĩa là chuyển tiếp, nối tiếp nhau theo từng bậc (như "đệ trình", "sư đệ"). Đây chính là hành động **chuyền câu hỏi lên người phía trước**.
  - *Chữ "Quy":* Có nghĩa là quay ngược trở về gốc (như "quy tụ", "hồi quy"). Đây chính là hành động **chuyền ngược câu trả lời từ hàng 1 về lại hàng của bạn**.
- **Điều kiện dừng (Base case):**
  - Ứng với **người ngồi hàng số 1** trong ví dụ: điểm chặn cuối cùng nơi bài toán có đáp án trực tiếp mà không cần phải chuyền câu hỏi đi tiếp.

---

### 2.2. Vấn Đề Nhỏ 2: Tại Sao "Chờ Đợi" Lại Làm Đầy Bộ Nhớ?

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Trong ví dụ rạp chiếu phim ở trên:
- Khi bạn vỗ vai người phía trước, bạn **chưa thể đi về hay ngủ được**. Bạn buộc phải đứng đợi ở đó, trong đầu luôn phải ghi nhớ một việc còn dở dang: *"Chờ người kia trả lời số $X$, mình phải lấy $X + 1$ rồi mới xong việc"*.
- Người phía trước bạn cũng phải đứng đợi. Người phía trước nữa cũng phải đứng đợi.
- Nếu hàng ghế có $1.000.000$ người, sẽ có đúng **$1.000.000$ người cùng phải đứng đợi cùng một lúc**, mỗi người cầm một mảnh giấy ghi nhớ việc chưa hoàn thành! Hành lang rạp chiếu phim sẽ bị tắc nghẽn hoàn toàn vì không đủ chỗ đứng.

#### Bước 2: Ánh xạ vào lập trình C++ (Cơ chế Call Stack trên RAM)
Bộ nhớ RAM của máy tính dành riêng một góc có dung lượng cố định (thường từ 2 MB đến 8 MB) gọi là **Vùng nhớ Ngăn Xếp Lời Gọi (Call Stack)**:
- Mỗi khi một hàm được gọi, hệ điều hành cấp phát một ô nhớ nhỏ gọi là **Khung ngăn xếp (Stack Frame)** để lưu:
  1. Các biến cục bộ và tham số của hàm đó (`nguoi`).
  2. **Địa chỉ dòng lệnh cần quay về** sau khi hàm con tính xong (để thực hiện phép tính `+ 1` còn nợ nần).
- Khi hàm `timHangGhe(N)` gọi `timHangGhe(N - 1)`, khung nhớ của `timHangGhe(N)` **vẫn bị giữ nguyên trên RAM** vì phép tính `+ 1` chưa được thực hiện!
- Khi $N = 1.000.000$, máy tính phải xếp chồng $10^6$ khung nhớ lên nhau. Khi chiều cao vượt quá giới hạn 8 MB, máy tính lập tức ngắt chương trình để bảo vệ hệ thống.

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Khung ngăn xếp lời gọi (Stack Frame):** Ứng với **tờ giấy ghi nhớ việc còn dở dang** mà mỗi người đang đứng chờ phải cầm trên tay.
- **Tràn ngăn xếp (Stack Overflow):** Ứng với tình huống **hành lang rạp chiếu phim hết chỗ đứng**, khiến mọi người ngã đổ và sự kiện bị hủy bỏ.

---

### 2.3. Vấn Đề Nhỏ 3 & Ghép Lại: Đệ Quy Đuôi (Tail Recursion) — Không Ai Phải Đứng Chờ

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Làm thế nào để người hỏi câu trước **không cần phải đứng chờ**?
Thay vì chuyền câu hỏi trắng trơn rồi bắt người trước báo về để mình cộng dồn:
- Bạn chuẩn bị một **Cuốn sổ tổng kết (Biến tích lũy)**.
- Khi bạn vỗ vai người phía trước, bạn ghi luôn vào sổ: *"Tính đến tôi là đã có 1 người rồi nhé"*. Bạn trao luôn cuốn sổ cho người phía trước và **bạn có thể đi về nhà nghỉ ngơi ngay lập tức**! Bạn không còn nợ nần bất kỳ phép tính nào nữa.
- Người tiếp theo nhận sổ, thấy ghi 1, liền cộng thêm bản thân họ thành 2, rồi trao tiếp cho người trước nữa và đi về.
- Đến người hàng 1, cuốn sổ đã có sẵn đáp án tổng kết cuối cùng. Người hàng 1 chỉ việc công bố kết quả mà không cần gọi ngược về bất kỳ ai!
- **Kết quả kỳ diệu:** Tại bất kỳ thời điểm nào, trong rạp chỉ có **đúng 1 người duy nhất đang cầm cuốn sổ làm việc**, không có ai phải đứng chờ, hành lang luôn rộng rãi!

#### Bước 2: Ánh xạ vào lập trình C++
Ta thêm một tham số thứ hai gọi là `tichLuy` (Accumulator) vào hàm:
```cpp
// Hàm Đệ Quy Đuôi chuẩn mực:
long long tinhTongDuoi(int n, long long tichLuy) {
    if (n == 0) return tichLuy;
    // Lời gọi đệ quy là hành động CUỐI CÙNG TUYỆT ĐỐI!
    // Không có phép + hay * nào ở ngoài lời gọi hàm:
    return tinhTongDuoi(n - 1, tichLuy + n);
}
```
- **Tối ưu hóa của Trình Biên Dịch (Tail Call Optimization - TCO):**
  - Khi bạn biên dịch với cờ `-O2` (chuẩn thi đấu), `g++` nhận thấy: *"Sau khi gọi `tinhTongDuoi(n - 1, ...)` xong, hàm hiện tại chỉ việc trả về nguyên vẹn kết quả đó chứ không làm thêm gì nữa"*.
  - Trình biên dịch sẽ **tái sử dụng luôn khung nhớ hiện tại**: nó chỉ việc ghi đè giá trị mới vào tham số và nhảy lệnh `jmp` quay lại đầu hàm, y hệt như một vòng lặp `while`!
  - Chiều cao ngăn xếp luôn là $O(1)$, gọi $N = 10^8$ lần vẫn chạy êm ru trong vài phần nghìn giây.

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Đệ quy đuôi (Tail Recursion):** Chữ **"Đuôi" (Tail)** nghĩa là lời gọi tự thân nằm ở **điểm kết thúc tuyệt đối** của hàm. Sau khi hàm con chạy xong, hàm cha không còn làm thêm bất cứ việc gì.
- **Biến tích lũy (Accumulator):** Ứng với **Cuốn sổ tổng kết chuyền tay** trong đời sống, gom kết quả trung gian đẩy dần về phía trước.
- **Tối ưu hóa lời gọi đuôi (Tail Call Optimization - TCO):** Cơ chế trình biên dịch biến lời gọi hàm thành lệnh nhảy vòng lặp trong mã máy để tiết kiệm 100% không gian ngăn xếp.

---

## 3. Công Thức Chuyển Đổi Nhanh: Từ Đệ Quy Đuôi Sang Vòng Lặp `while`

Mọi hàm đệ quy đuôi đều có thể chuyển thành vòng lặp trong 3 bước:
1. Tạo biến `tichLuy` bên ngoài.
2. Thay `if (dieuKienDung)` thành `while (!dieuKienDung)`.
3. Cập nhật `tichLuy` và giảm `n`, lặp lại cho đến khi dừng.
```cpp
long long tinhTongVongLap(int n) {
    long long tichLuy = 0;
    while (n > 0) {
        tichLuy += n;
        n--;
    }
    return tichLuy;
}
```

---

## 4. Các Bẫy Thường Gặp Khi Viết Đệ Quy Đuôi (Pitfalls)

1. **Bẫy "Tưởng là đuôi nhưng không phải":**
   ```cpp
   return 1 + tinh(n - 1);  // KHÔNG PHẢI đuôi! Vì còn phép + 1 sau khi hàm con trả về.
   return tinh(n - 1) * n;  // KHÔNG PHẢI đuôi! Vì còn phép nhân n sau khi hàm con trả về.
   ```
2. **Quên bật cờ `-O2`:** Trong các trình biên dịch C++ cũ hoặc chế độ Debug không có `-O2`, trình biên dịch có thể không kích hoạt TCO. Do đó trong phòng thi luôn cần nhớ cờ `-O2` hoặc chủ động chuyển sang vòng lặp.
