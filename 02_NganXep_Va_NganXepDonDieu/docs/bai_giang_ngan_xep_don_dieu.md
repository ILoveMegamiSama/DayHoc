# Bài Giảng: Ngăn Xếp & Ngăn Xếp Đơn Điệu (Monotonic Stack) — Từ Bản Chất LIFO Đến Tìm Biên Tuyến Tính

- **Mã chuyên đề:** `MOD-02`
- **Thời lượng ước tính:** 90–120 phút
- **Đối tượng học tập:** Người mới học lập trình thi đấu C++, muốn làm chủ kỹ thuật tìm kiếm lân cận trong thời gian tối ưu $O(N)$.

---

## 1. Vấn Đề Lớn Cần Giải Quyết

Cho một dãy gồm $N = 200.000$ tòa nhà có chiều cao $A_1, A_2, \dots, A_N$.
Tại mỗi tòa nhà thứ $i$, ta cần tìm vị trí của **tòa nhà gần nhất bên trái cao hơn nó** (để biết tầm nhìn bị chắn ở đâu).

- **Cách làm thông thường (Duyệt trâu):**
  Tại mỗi vị trí $i$, ta cho vòng lặp $j$ chạy ngược từ $i - 1$ về $1$.
  Nếu gặp $A_j > A_i$ thì dừng lại.
  - Khi mảng giảm dần (ví dụ: $10, 9, 8, \dots, 1$), số phép so sánh lên tới $\frac{N(N - 1)}{2} \approx 2 \times 10^{10}$ thao tác!
  - Máy tính mất hơn **20 giây** và nhận phán quyết **TLE (Time Limit Exceeded)**!

**Câu hỏi cốt lõi:**
Làm thế nào để tại mỗi bước $i$, ta tìm được ngay phần tử lớn hơn gần nhất chỉ trong $O(1)$ bước, đưa toàn bộ thuật toán về **$O(N)$ thời gian**?

Để giải quyết vấn đề lớn này, chúng ta tách thành **3 vấn đề nhỏ**:
- **Vấn đề nhỏ 1:** Cấu trúc dữ liệu nào giúp ta lưu trữ các phần tử đã duyệt qua và lấy ra phần tử vừa mới gặp nhất nhanh nhất?
- **Vấn đề nhỏ 2:** Trong số các phần tử đứng trước, những phần tử nào đã **vĩnh viễn bị che khuất** và có thể loại bỏ ngay lập tức để không bao giờ phải xét lại?
- **Vấn đề nhỏ 3 & Ghép lại:** Tại sao lưu **chỉ số vị trí (index)** lại mạnh hơn lưu giá trị, và làm thế nào để 2 vòng lặp lồng nhau chỉ tốn tối đa $2N$ thao tác (Độ phức tạp khấu hao)?

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Lưu Trữ Phần Tử Vừa Mới Gặp (Ngăn Xếp Cơ Bản)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Hãy hình dung một **chồng đĩa rửa bát** hoặc một **ống đựng bóng tennis**:
- Chiếc đĩa bạn vừa rửa sạch xong sẽ được đặt lên **trên cùng** của chồng đĩa.
- Khi dọn cơm, chiếc đĩa bạn lấy ra đầu tiên chính là **chiếc đĩa vừa được đặt vào sau cùng**.
- Chiếc đĩa nằm dưới đáy chỉ được lấy ra sau khi toàn bộ các đĩa phía trên đã được dọn đi hết.

#### Bước 2: Ánh xạ vào lập trình C++
C++ cung cấp cấu trúc `std::stack` (thư viện `<stack>`) hoặc ta có thể dùng `std::vector` với các thao tác ở cuối:
```cpp
#include <stack>
stack<int> st;

st.push(x);   // Đặt đĩa x lên đỉnh
st.pop();      // Lấy đĩa ở đỉnh ra vứt đi
int top = st.top(); // Xem giá trị đĩa ở đỉnh (CẢNH BÁO: phải kiểm tra !st.empty() trước!)
bool rong = st.empty(); // Kiểm tra ngăn xếp có đĩa nào không
```
- Ứng dụng kinh điển: Kiểm tra tính đúng đắn của dãy ngoặc `(()())`: Gặp ngoặc mở `(` thì đặt vào ngăn xếp, gặp ngoặc đóng `)` thì lấy ngoặc mở trên đỉnh ra khớp đôi.

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Ngăn xếp (Stack):** Chữ *"Ngăn"* là ngăn chứa, *"Xếp"* là xếp chồng từng lớp lên nhau từ đáy lên đỉnh.
- **LIFO (Last In, First Out):** *"Vào sau - Ra trước"*, mô tả chính xác chiếc đĩa đặt vào cuối cùng sẽ là chiếc đĩa được lấy ra đầu tiên.

---

### 2.2. Vấn Đề Nhỏ 2: Loại Bỏ Những Kẻ Bị Che Khuất (Ngăn Xếp Đơn Điệu)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Tưởng tượng một nhóm học sinh đang xếp hàng dọc nhìn về phía người chụp ảnh:
- Khi một học sinh mới bước vào vị trí $i$:
  - Học sinh này cao $1m80$.
  - Những bạn đứng ngay trước bạn này chỉ cao $1m60, 1m65$.
- **Hỏi:** Đối với tất cả những người đến sau bạn $1m80$, liệu có ai còn nhìn thấy các bạn $1m60, 1m65$ nữa không?
- **Câu trả lời:** **KHÔNG BAO GIỜ!** Bạn $1m80$ đã che khuất hoàn toàn những người thấp hơn đứng trước bạn ấy. Mọi người đến sau nếu bị chắn tầm nhìn thì người chắn họ chắc chắn là bạn $1m80$ (hoặc một người còn cao hơn nữa ở phía trước), chứ vĩnh viễn không bao giờ là các bạn thấp bé kia!
- **Hành động:** Ta có thể mời ngay các bạn thấp bé bị che khuất bước ra khỏi hàng chờ, vĩnh viễn không cần lưu tâm nữa.

#### Bước 2: Ánh xạ vào lập trình C++
Mỗi khi xét đến phần tử $A_i$:
- Ta nhìn lên đỉnh ngăn xếp `st.top()`.
- Chừng nào đỉnh ngăn xếp còn **nhỏ hơn hoặc bằng $A_i$**, nghĩa là nó đã bị $A_i$ che khuất vĩnh viễn $\rightarrow$ ta dùng lệnh `st.pop()` đuổi nó ra!
- Quá trình đuổi dừng lại khi:
  1. Ngăn xếp rỗng: nghĩa là bên trái không có ai cao hơn $A_i$.
  2. Đỉnh ngăn xếp lớn hơn $A_i$: đây chính là **người cao hơn gần nhất** bên trái cần tìm!
- Sau khi tìm xong, ta đẩy chính $A_i$ vào ngăn xếp để nó tiếp tục làm "kẻ che khuất" cho các phần tử phía sau.
```cpp
while (!st.empty() && st.top() <= a[i]) {
    st.pop(); // Loại bỏ phần tử bị che khuất
}
int benTrai = st.empty() ? -1 : st.top();
st.push(a[i]);
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Ngăn xếp đơn điệu (Monotonic Stack):**
  - *Chữ "Đơn":* Nghĩa là một (duy nhất).
  - *Chữ "Điệu":* Nghĩa là chiều hướng, nhịp điệu (như giai điệu).
  - Ngăn xếp đơn điệu là ngăn xếp có tính kỷ luật sắt: Các phần tử nằm trong nó bắt buộc phải duy trì **đúng một chiều tăng dần hoặc giảm dần** từ đáy lên đỉnh.
- **Tính chất bất biến (Invariant):** Khi ta duy trì ngăn xếp giảm dần từ đáy lên đỉnh, phần tử ngay dưới đỉnh luôn là phần tử lớn hơn gần nhất.

---

### 2.3. Vấn Đề Nhỏ 3 & Ghép Lại: Lưu Chỉ Số (Index) & Độ Phức Tạp Khấu Hao $O(N)$

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Nếu chỉ ghi nhớ *"người đứng trước cao 1m85"*, bạn sẽ không biết người đó đứng **cách bạn bao nhiêu mét**. Nhưng nếu ghi nhớ *"người đó đứng ở vị trí số 3"*, bạn vừa biết chiều cao, vừa tính ngay được khoảng cách: $\text{Khoảng cách} = \text{Vị trí của bạn} - 3$.

#### Bước 2: Ánh xạ vào lập trình C++
Ta **không đẩy giá trị $A_i$ vào ngăn xếp mà đẩy chỉ số $i$ vào ngăn xếp** (`st.push(i)`):
- Khi cần giá trị, ta tra cứu $A[\text{st.top()}]$.
- Khi cần khoảng cách, ta lấy $i - \text{st.top()}$.
- Đây chính là chìa khóa để giải bài toán kinh điển: **Tìm hình chữ nhật lớn nhất trong biểu đồ cột (Largest Rectangle in Histogram)** trong $O(N)$.

#### Bước 3: Chứng minh độ phức tạp $O(N)$ (Khấu hao - Amortized Analysis)
Nhiều người mới học nhìn thấy vòng `while` lồng bên trong vòng `for` liền lầm tưởng độ phức tạp là $O(N^2)$:
- **Sự thật:**
  - Mỗi phần tử chỉ được đẩy vào ngăn xếp (`push`) đúng **1 lần duy nhất** trong cả chương trình.
  - Mỗi phần tử một khi đã bị lấy ra khỏi ngăn xếp (`pop`) thì **vĩnh viễn biến mất**, không bao giờ bị pop lại lần thứ hai.
  - Tổng số thao tác `pop` trên toàn bộ $N$ bước lặp tối đa chỉ là $N$ lần!
  - Tổng số thao tác của cả thuật toán: $N \text{ lần push} + \text{tối đa } N \text{ lần pop} \le 2N$ thao tác.
  - **Thời gian trung bình mỗi bước:** $\frac{2N}{N} = 2$ thao tác $\rightarrow$ **$O(1)$ khấu hao (Amortized $O(1)$)!**

---

## 3. Các Dạng Ngăn Xếp Đơn Điệu Thường Gặp

| Bài Toán Cần Tìm | Loại Ngăn Xếp Cần Duy Trì | Điều Kiện Pop |
|---|---|---|
| Lớn hơn gần nhất bên trái | Giảm dần từ đáy lên đỉnh | `while (!st.empty() && a[st.top()] <= a[i]) st.pop();` |
| Nhỏ hơn gần nhất bên trái | Tăng dần từ đáy lên đỉnh | `while (!st.empty() && a[st.top()] >= a[i]) st.pop();` |
| Lớn hơn gần nhất bên phải | Duyệt từ phải về trái ($N \dots 1$) | Giống bên trái nhưng chạy ngược |
| Nhỏ hơn gần nhất bên phải | Duyệt từ phải về trái ($N \dots 1$) | Giống bên trái nhưng chạy ngược |

---

## 4. Các Bẫy Thường Gặp Khi Cài Đặt (Pitfalls)

1. **Quên kiểm tra `!st.empty()` trước khi gọi `st.top()`:** Gây lỗi Runtime Error (Segmentation fault).
2. **Nhầm lẫn giữa dấu `<` và dấu `<=`:** Khi dãy có các số bằng nhau, nếu dùng nhầm dấu có thể làm tính trùng hoặc bỏ sót biên mở rộng.
3. **Lưu giá trị thay vì chỉ số:** Làm mất thông tin vị trí khiến không thể tính được độ rộng khoảng cách $(R - L - 1)$.
