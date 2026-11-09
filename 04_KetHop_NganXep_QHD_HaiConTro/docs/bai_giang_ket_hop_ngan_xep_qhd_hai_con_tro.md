# Bài Giảng Kết Hợp: Ngăn Xếp Với Quy Hoạch Động & Sợi Dây Liên Kết Hai Con Trỏ

- **Mã chuyên đề:** `MOD-04`
- **Thời lượng ước tính:** 120–150 phút
- **Đối tượng học tập:** Người học đã nắm vững Đệ quy đuôi, Ngăn xếp đơn điệu và Hai con trỏ, muốn làm chủ tư duy phối hợp các cấu trúc dữ liệu để giải các bài toán Quy hoạch động (DP) nâng cao.

---

## 1. Vấn Đề Lớn Cần Giải Quyết

Trong lập trình thi đấu, **Quy hoạch động (Dynamic Programming - DP)** là kỹ thuật tối thượng để giải quyết các bài toán tối ưu nhiều bước. Tuy nhiên, khi xây dựng lời giải DP, người học thường gặp 2 "cơn ác mộng":

1. **Cơn ác mộng 1 — Tràn bộ nhớ khi cài đặt Đệ quy có nhớ (Memoization):**
   Hàm gọi đệ quy quá sâu $N = 10^5$ làm nổ tung Call Stack trước khi kịp hoàn thành bảng nhớ.
2. **Cơn ác mộng 2 — Tắc nghẽn thời gian ở bước chuyển trạng thái (State Transition Bottleneck):**
   Để tính giá trị $DP[i]$, ta phải duyệt lại toàn bộ các trạng thái cũ $DP[j]$ (với $j < i$) trong quá khứ:
   $$DP[i] = \min_{j < i} \{ DP[j] + \text{chi phí}(j, i) \}$$
   Nếu duyệt lại $j$ bằng một vòng lặp `for` mất $O(N)$ bước, tổng thời gian toàn bài sẽ là $O(N^2)$ $\rightarrow$ **TLE!**

**Câu hỏi cốt lõi:**
Làm thế nào để phối hợp **Ngăn xếp (Stack)** và **Hai con trỏ (Two Pointers)** vào **Quy hoạch động** để:
- Tự quản lý bộ nhớ, khử sạch đệ quy sâu?
- Tăng tốc bước chuyển trạng thái từ $O(N)$ xuống **$O(1)$**, đưa toàn bài từ $O(N^2)$ về **$O(N)$ thời gian**?

Để chinh phục bài toán này, ta chia thành **3 mảnh ghép liên hoàn**:
- **Mảnh ghép 1:** Từ Đệ quy sang Ngăn xếp tự quản lý & Bảng Quy hoạch động (Khử đệ quy thủ công).
- **Mảnh ghép 2:** Dùng Ngăn xếp đơn điệu (Monotonic Stack) để loại bỏ các trạng thái DP cũ bị che khuất, tăng tốc $DP[i]$ về $O(1)$.
- **Mảnh ghép 3:** Khi bài toán giới hạn bước nhảy trong cửa sổ độ dài $K$: Kết hợp **Cửa sổ trượt (Hai con trỏ)** và **Ngăn xếp đơn điệu** thành **Hàng đợi hai đầu đơn điệu (Monotonic Deque)** để tối ưu DP.

---

## 2. Giải Quyết Từng Mảnh Ghép

### 2.1. Mảnh Ghép 1: Từ Đệ Quy Sang Ngăn Xếp Tự Quản Lý & Bảng Quy Hoạch Động

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Hãy hình dung bạn làm thủ quỹ ghi chép chi tiêu gia đình:
- Nếu mỗi lần cần biết *"Hôm nay còn bao nhiêu tiền?"*, bạn lại gọi điện hỏi người giữ sổ ngày hôm qua, người đó lại gọi hỏi ngày hôm trước... (Đệ quy): bạn sẽ tốn hàng giờ gọi điện chờ đợi và dễ bị sập nguồn điện thoại (Hết pin = Tràn Call Stack).
- **Cách người thông minh làm:** Bạn mua một **Cuốn sổ ghi chép (Bảng Quy hoạch động)**:
  - Ngày 0 (bắt đầu): có 1 triệu.
  - Ngày 1: tra sổ ngày 0 thấy 1 triệu, chi 200k $\rightarrow$ ghi vào sổ: Ngày 1 còn 800k.
  - Ngày $i$: chỉ việc **tra ngay trang sổ ngày $i - 1$**, không cần gọi điện hỏi lại bất kỳ ai!

#### Bước 2: Ánh xạ vào lập trình C++
1. **Chuyển Đệ quy sang Mảng DP:**
   Thay vì gọi `tinh(n)` đệ quy, ta tạo mảng `long long dp[N + 1]`. Điền lần lượt từ bài toán cơ sở `dp[0]` lên `dp[n]`.
2. **Khử đệ quy bằng `std::stack`:**
   Nếu thuật toán bắt buộc phải duyệt theo thứ tự DFS (ví dụ: duyệt cây), ta tự tạo một `stack<State> st` trên vùng nhớ Heap rộng lớn của RAM. Ta tự `push` và `pop` trạng thái thay vì để hệ điều hành làm hộ trên Call Stack 8MB chật hẹp!

#### Bước 3: Giải nghĩa tên gọi & Thuật ngữ
- **Quy hoạch động (Dynamic Programming - DP):**
  - *Chữ "Quy hoạch":* Nghĩa là lập bảng kế hoạch (bảng mảng `dp[]`).
  - *Chữ "Động":* Nghĩa là bảng được cập nhật dần dần theo thời gian từ bài toán nhỏ đến bài toán lớn.

---

### 2.2. Mảnh Ghép 2: Dùng Ngăn Xếp Đơn Điệu Tăng Tốc Quy Hoạch Động (Từ $O(N^2)$ Về $O(N)$)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Bạn cần tính tổng độ cao tối thiểu của các tòa nhà trong mọi đoạn con kết thúc tại ngày $i$.
- Khi một tòa nhà mới $A_i$ xuất hiện:
  - Những tòa nhà đứng ngay trước $i$ mà cao hơn $A_i$ sẽ **bị chiều cao $A_i$ thay thế hoàn toàn** trong vai trò là "chiều cao nhỏ nhất" của các đoạn con vươn tới $i$.
  - Thay vì duyệt ngược qua từng tòa nhà cũ để tính lại từ đầu, bạn chỉ cần tìm **tòa nhà gần nhất bên trái thấp hơn $A_i$** (gọi là vị trí $L_i$).
  - Toàn bộ các đoạn con từ $L_i + 1$ đến $i$ sẽ nhận $A_i$ làm giá trị nhỏ nhất $\rightarrow$ đóng góp: $A_i \times (i - L_i)$.
  - Còn toàn bộ các đoạn con trước $L_i$ thì sao? **Đã được tính sẵn và lưu trong $DP[L_i]$!** Ta chỉ việc lấy lại mà không cần tính lại!

#### Bước 2: Ánh xạ vào lập trình C++
Công thức chuyển trạng thái được tăng tốc thần tốc nhờ Ngăn xếp đơn điệu:
$$DP[i] = DP[L_i] + A_i \times (i - L_i)$$
```cpp
stack<int> st; // Ngăn xếp đơn điệu tăng dần lưu chỉ số
for (int i = 0; i < n; i++) {
    while (!st.empty() && a[st.top()] >= a[i]) {
        st.pop(); // Loại bỏ các phần tử cao hơn a[i]
    }
    int L = st.empty() ? -1 : st.top();

    // Chuyển trạng thái DP chỉ trong O(1) nhờ tái sử dụng dp[L]!
    if (L == -1) {
        dp[i] = (long long)a[i] * (i + 1);
    } else {
        dp[i] = dp[L] + (long long)a[i] * (i - L);
    }
    st.push(i);
}
```

#### Bước 3: Giải nghĩa thuật ngữ & Bản chất
- **Tối ưu hóa chuyển trạng thái DP (DP State Optimization):** Thay vì duyệt lại $O(N)$ trạng thái cũ, Ngăn xếp đơn điệu đóng vai trò là bộ lọc giúp ta tìm đúng trạng thái đại diện $L_i$ chỉ trong $O(1)$ khấu hao!

---

### 2.3. Mảnh Ghép 3: Cửa Sổ Trượt (Hai Con Trỏ) Ghép Đôi Ngăn Xếp Đơn Điệu (Monotonic Deque)

#### Bước 1: Vấn đề & Cách giải quyết trong đời sống
Hãy tưởng tượng một **đoàn tàu gồm $K$ toa hành khách**:
- Bài toán: Tìm chi phí tối thiểu để nhảy từ vị trí $0$ đến $N$, mỗi bước **chỉ được nhảy tối đa $K$ bước**:
  $$DP[i] = A_i + \min_{i - K \le j < i} \{ DP[j] \}$$
- **Vấn đề:**
  1. Chỉ được nhìn trong phạm vi $K$ bước gần nhất $\rightarrow$ Đây chính là cơ chế **Cửa sổ trượt (Hai con trỏ)**: đầu phải nạp vào, đầu trái vứt bỏ những người đã trượt ra ngoài phạm vi $i - K$!
  2. Trong các người nằm trong cửa sổ $K$, ta chỉ cần người có $DP[j]$ nhỏ nhất $\rightarrow$ Đây chính là cơ chế **Ngăn xếp đơn điệu**: loại bỏ ngay những người đến trước mà có $DP$ lớn hơn người mới đến!
- **Giải pháp tối thượng:** Ghép hai cấu trúc lại thành **Hàng đợi hai đầu đơn điệu (`std::deque`)**:
  - Đầu trước (`front`): Đóng vai trò con trỏ trái, loại bỏ các phần tử quá hạn $j < i - K$.
  - Đầu sau (`back`): Đóng vai trò đỉnh ngăn xếp, loại bỏ các phần tử có $DP \ge DP[i]$ kém tối ưu.
  - Phần tử ở `deque.front()` luôn luôn là giá trị nhỏ nhất tối ưu tuyệt đối!

#### Bước 2: Ánh xạ vào lập trình C++
```cpp
deque<int> dq; // Lưu chỉ số j
dq.push_back(0); // Cơ sở dp[0] = a[0]

for (int i = 1; i < n; i++) {
    // 1. Con trỏ trái cửa sổ trượt: Bỏ các vị trí quá hạn (j < i - K)
    while (!dq.empty() && dq.front() < i - K) {
        dq.pop_front();
    }

    // 2. Lấy giá trị tối ưu nhất ngay tại đầu hàng đợi trong O(1)
    dp[i] = dp[dq.front()] + a[i];

    // 3. Cơ chế ngăn xếp đơn điệu: Loại bỏ các phần tử kém tối ưu ở đuôi
    while (!dq.empty() && dp[dq.back()] >= dp[i]) {
        dq.pop_back();
    }
    dq.push_back(i);
}
```

#### Bước 3: Bản đồ tư duy liên kết cả 3 chuyên đề
- **Đệ quy đuôi (MOD-01):** Dạy ta hiểu bản chất Call Stack, biến $O(N)$ bộ nhớ đệ quy về $O(1)$.
- **Ngăn xếp đơn điệu (MOD-02):** Dạy ta lọc bỏ các phần tử bị che khuất để tìm biên mở rộng trong $O(1)$ khấu hao.
- **Hai con trỏ (MOD-03):** Dạy ta cách co giãn cửa sổ trượt $K$ một chiều.
- **Quy hoạch động (MOD-04):** Ghép cửa sổ trượt và ngăn xếp đơn điệu lại tạo thành cấu trúc Deque tối ưu hóa DP đỉnh cao!
