# Bài Giảng: Kỹ Thuật Hai Con Trỏ (Two Pointers) — Từ Bản Chất Đơn Điệu Đến Cửa Sổ Trượt Tuyến Tính

- **Mã chuyên đề:** `MOD-03`
- **Thời lượng ước tính:** 90–120 phút
- **Đối tượng học tập:** Người mới học lập trình thi đấu C++, muốn thành thạo kỹ thuật tối ưu hóa vòng lặp trên dãy có tính đơn điệu.

---

## 1. Vấn Đề Lớn Cần Giải Quyết

Cho một dãy số nguyên dương $A_1, A_2, \dots, A_N$ với $N = 200.000$ và một số $S$.
Ta cần tìm độ dài của đoạn con liên tiếp dài nhất sao cho tổng các phần tử không vượt quá $S$.

- **Cách làm thông thường (Duyệt trâu 2 vòng lặp):**
  Thử mọi cặp điểm đầu $L$ và điểm cuối $R$ ($1 \le L \le R \le N$) và tính tổng:
  - Có $\frac{N(N + 1)}{2} \approx 2 \times 10^{10}$ đoạn con!
  - Thời gian chạy mất hơn **25 giây** $\rightarrow$ Nhận phán quyết **TLE (Time Limit Exceeded)**!

**Câu hỏi cốt lõi:**
Làm sao để tìm được đoạn con tối ưu mà không phải thử mọi cặp $(L, R)$ thừa thãi, đưa thuật toán về đúng **$O(N)$ thời gian** và **$O(1)$ bộ nhớ phụ**?

Để giải quyết vấn đề lớn này, chúng ta tách thành **3 vấn đề nhỏ**:
- **Vấn đề nhỏ 1:** Khi dữ liệu đã có thứ tự tăng dần, làm sao loại bỏ hàng nghìn cặp số vô vọng chỉ bằng 1 phép so sánh (Hai con trỏ ngược chiều)?
- **Vấn đề nhỏ 2:** Khi tìm đoạn liên tiếp trên dãy số dương, làm sao co giãn một khung cửa sổ chỉ tiến về phía trước (Hai con trỏ cùng chiều / Cửa sổ trượt)?
- **Vấn đề nhỏ 3 & Ghép lại:** Làm sao đếm nhanh số lượng đoạn con thỏa mãn điều kiện và điều kiện sống còn nào khiến Hai con trỏ bị phá sản hoàn toàn (Bẫy số âm)?

---

## 2. Giải Quyết Từng Vấn Đề Nhỏ

### 2.1. Vấn Đề Nhỏ 1: Loại Bỏ Hàng Loạt Cặp Số Thừa (Hai Con Trỏ Ngược Chiều)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Bạn và một người bạn đi mua 2 cuốn sách trên một kệ sách đã xếp giá tiền tăng dần từ trái sang phải (cuốn rẻ nhất bên trái, đắt nhất bên phải). Hai bạn có đúng số tiền $S = 100.000đ$:
- Bạn đặt **ngón tay trái (`trai`)** vào cuốn rẻ nhất (bên trái cùng), bạn của bạn đặt **ngón tay phải (`phai`)** vào cuốn đắt nhất (bên phải cùng).
- Hai bạn cộng giá tiền 2 cuốn:
  - Nếu $\text{Tổng} > 100.000đ$: Cuốn bên phải quá đắt! Dù ghép cuốn bên phải này với bất kỳ cuốn nào khác trên kệ thì tổng vẫn sẽ $> 100.000đ$. Do đó cuốn này **hoàn toàn vô vọng** $\rightarrow$ bạn của bạn dịch ngón tay sang trái một cuốn (`phai--`).
  - Nếu $\text{Tổng} < 100.000đ$: Cuốn bên trái quá rẻ, ghép với cuốn đắt nhất mà vẫn chưa đủ $100.000đ$ thì ghép với các cuốn khác càng thiếu $\rightarrow$ bạn dịch ngón tay sang phải một cuốn (`trai++`).
  - Nếu $\text{Tổng} == 100.000đ$: Tìm thấy ngay cặp sách hoàn hảo!

#### Bước 2: Ánh xạ vào lập trình C++
Ta dùng 2 biến chỉ số `trai = 0` và `phai = n - 1` chạy ngược chiều nhau trên mảng đã sắp xếp:
```cpp
int trai = 0, phai = n - 1;
while (trai < phai) {
    long long tong = a[trai] + a[phai];
    if (tong == S) {
        cout << "Tim thay tai: " << trai << " va " << phai << "\n";
        return;
    }
    if (tong < S) trai++;  // Cần tổng lớn hơn -> tăng số nhỏ lên
    else phai--;           // Cần tổng nhỏ hơn -> giảm số lớn xuống
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Hai con trỏ (Two Pointers):** Không phải biến con trỏ địa chỉ phức tạp (`int*`), mà đơn giản là **hai ngón tay chỉ vị trí** (hai biến chỉ số nguyên) cùng trượt trên mảng.
- **Tính đơn điệu (Monotonicity):** Khi dịch sang phải thì giá trị tăng, dịch sang trái thì giá trị giảm. Nhờ tính chất này mà ta tự tin vứt bỏ các lựa chọn thừa.

---

### 2.2. Vấn Đề Nhỏ 2: Khung Cửa Sổ Co Giãn (Cửa Sổ Trượt — Sliding Window)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Quan sát chuyển động của một **con sâu đo** bò trên cành cây:
- Con sâu muốn ăn nhiều lá nhất nhưng bụng nó chỉ chứa được tối đa cân nặng $S$:
  - Đầu con sâu (`phai`) vươn tới phía trước, ăn thêm từng chiếc lá và tăng cân nặng.
  - Khi cân nặng vượt quá $S$ (bội thực), đầu con sâu giữ nguyên, **đuôi con sâu (`trai`) co lại**, nhả bớt các lá cũ phía sau cho tới khi cân nặng an toàn trở lại.
  - Sau đó đầu con sâu lại tiếp tục bò tới trước.
- **Điểm mấu chốt:** Cả đầu và đuôi con sâu **chỉ có một chiều bò về phía trước**, không bao giờ bị giật lùi về điểm xuất phát!

#### Bước 2: Ánh xạ vào lập trình C++
Duy trì đoạn `[trai..phai]` và biến `tong`:
```cpp
int trai = 0, doDaiMax = 0;
long long tong = 0;

for (int phai = 0; phai < n; phai++) {
    tong += a[phai]; // Đưa thêm phần tử mới vào cửa sổ

    // Khi tổng vượt ngưỡng S: thu hẹp cửa sổ từ bên trái
    while (tong > S && trai <= phai) {
        tong -= a[trai];
        trai++;
    }

    // Lúc này đoạn [trai..phai] chắc chắn có tổng <= S
    doDaiMax = max(doDaiMax, phai - trai + 1);
}
```

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Cửa sổ trượt (Sliding Window):** Ứng với **thân con sâu đo**, là một khung đoạn con liên tiếp có thể mở rộng bên phải và thu hẹp bên trái.
- **Độ phức tạp $O(N)$:** `phai` chạy từ $0$ đến $N - 1$ ($N$ bước). `trai` cũng chỉ tăng từ $0$ đến $N - 1$ (tối đa $N$ bước). Tổng số bước di chuyển của cả hai con trỏ tối đa chỉ là $2N$ bước!

---

### 2.3. Vấn Đề Nhỏ 3 & Ghép Lại: Đếm Số Đoạn Con & Điều Kiện Sống Còn (Bẫy Số Âm)

#### Bước 1: Bí quyết đếm số đoạn con kết thúc tại `phai`
Giả sử tại bước `phai`, đoạn `[trai..phai]` có tổng $\le S$:
- Khi đó, mọi đoạn con bắt đầu từ `trai, trai + 1, ..., phai` kết thúc tại `phai` **đều có tổng $\le S$** (vì các số đều là số dương).
- Số lượng đoạn con hợp lệ kết thúc tại `phai` chính là: $\text{soLuong} = \text{phai} - \text{trai} + 1$.
- Ta chỉ việc cộng dồn: `tongSoDoan += (phai - trai + 1)`.

#### Bước 2: Điều kiện sống còn — Khi nào Hai con trỏ bị phá sản?
Hai con trỏ **BẮT BUỘC** dựa trên tính chất:
$$\text{Thêm phần tử vào } \Rightarrow \text{Tổng chắc chắn TĂNG}; \quad \text{Bỏ phần tử ra } \Rightarrow \text{Tổng chắc chắn GIẢM}$$
- **Nếu mảng có số âm:**
  - Thêm một số âm vào $\rightarrow$ tổng lại giảm đi!
  - Bỏ một số âm ra $\rightarrow$ tổng lại tăng lên!
  - Tính đơn điệu bị phá hủy hoàn toàn. Con sâu đo không biết phải co đuôi hay vươn đầu.
- **Kết luận:** Nếu mảng có số âm, **tuyệt đối không dùng Hai con trỏ** mà phải dùng **Mảng cộng dồn (Prefix Sum) kết hợp Cây phân đoạn (Segment Tree) hoặc Map**!

---

## 3. Bảng So Sánh Hai Con Trỏ Ngược Chiều vs Cùng Chiều

| Tiêu Chí | Hai Con Trỏ Ngược Chiều | Cửa Sổ Trượt (Cùng Chiều) |
|---|---|---|
| Hướng di chuyển | `trai` tiến sang phải, `phai` lùi sang trái | Cả `trai` và `phai` cùng tiến sang phải |
| Yêu cầu dữ liệu | Mảng phải được **sắp xếp có thứ tự** | Các phần tử phải **không âm** (tính chất cộng dồn tăng) |
| Bài toán điển hình | Tìm cặp số có tổng $= S$, hiệu $= S$ | Tìm đoạn con dài nhất/ngắn nhất có tổng $\le S$, đếm đoạn con |
| Độ phức tạp | $O(N \log N)$ (nếu cần sort) hoặc $O(N)$ | $O(N)$ thời gian, $O(1)$ bộ nhớ |
