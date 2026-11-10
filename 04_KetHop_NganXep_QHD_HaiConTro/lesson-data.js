/**
 * DỮ LIỆU BÀI GIẢNG KẾT HỢP 04: NGĂN XẾP VỚI QUY HOẠCH ĐỘNG & HAI CON TRỎ
 */
(function() {
  const LESSON_DATA = {
    id: 'ket_hop_ngan_xep_qhd_hai_con_tro',
    number: 'Chuyên Đề Kết Hợp 04',
    shortTitle: 'Kết Hợp Ngăn Xếp, DP & Hai Con Trỏ',
    title: 'Chuyên Đề Kết Hợp: Ngăn Xếp với Quy Hoạch Động & Sợi Dây Liên Kết Hai Con Trỏ',
    lead: 'Đỉnh cao kết nối: Từ việc dùng Ngăn xếp để khử đệ quy bộ nhớ, đến việc dùng Ngăn xếp đơn điệu tăng tốc bước chuyển DP từ O(N^2) về O(N), và kết hợp với Cửa sổ trượt (Hai con trỏ) tạo thành Monotonic Deque DP.',
    modules: [
      // ============================================================================
      // MODULE 1: MẢNH GHÉP 1: TỪ ĐỆ QUY SANG NGĂN XẾP TỰ QUẢN LÝ VÀ BẢNG DP
      // ============================================================================
      {
        id: 'mod1',
        number: 'Mảnh Ghép 1',
        shortTitle: 'Khử Đệ Quy & Bảng DP',
        title: 'Mảnh Ghép 1: Từ Đệ Quy Sang Ngăn Xếp Tự Quản Lý & Bảng Quy Hoạch Động',
        lead: 'Khám phá cách xóa sổ nguy cơ Stack Overflow bằng việc chuyển từ hàm đệ quy tự gọi sang bảng ghi chép Quy hoạch động.',
        subproblem: {
          title: 'Làm sao để giải các bài toán tối ưu nhiều bước mà không bị sập bộ nhớ đệ quy hay tính đi tính lại?',
          desc: 'Thay vì để hệ điều hành quản lý Call Stack chật hẹp, ta lập bảng ghi chép kết quả các bài toán con (DP) và chỉ việc tra lại khi cần.'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Sổ Ghi Chép Chi Tiêu Đến Bảng Mảng dp[]',
            tag: 'Khử đệ quy',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Tình huống đời sống bình thường</span>
                <p>Bạn là thủ quỹ ghi chép tiền bạc hàng ngày:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Nếu mỗi lần cần biết số tiền hôm nay, bạn lại <em>gọi điện hỏi người hôm qua</em>, người đó gọi hỏi ngày trước... (Đệ quy): điện thoại sẽ hết pin (Tràn Call Stack) và tốn thời gian.</li>
                  <li><strong>Cách khôn ngoan:</strong> Bạn mua một <strong>Cuốn sổ ghi chép</strong>:
                    <ul>
                      <li>Ngày 0: có 1 triệu.</li>
                      <li>Ngày 1: tra sổ ngày 0, chi 200k $\\rightarrow$ ghi vào sổ: còn 800k.</li>
                      <li>Ngày $i$: chỉ việc <strong>tra lại trang sổ ngày $i - 1$</strong> ngay trước mặt!</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Chuyển từ đệ quy Fibonacci sang bảng Quy hoạch động:</p>
                <pre class="code-pre"><code>// Quy hoạch động: O(N) thời gian, O(1) bộ nhớ
long long dp0 = 0, dp1 = 1;
for (int i = 2; i <= n; i++) {
    long long dp2 = (dp0 + dp1) % MOD;
    dp0 = dp1;
    dp1 = dp2;
}
return dp1;</code></pre>
                <p style="font-size: 13.5px; color: var(--muted); margin-top: 8px;">
                  Không còn bất kỳ một khung nhớ Call Stack nào được tạo ra. Chương trình chạy với $N = 1.000.000$ chỉ trong 0.002 giây!
                </p>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi & Thuật ngữ (Liên kết ngược về Bước 1)</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Quy hoạch động (Dynamic Programming):</strong> <em>"Quy hoạch"</em> là lập bảng kế hoạch (mảng <code>dp[]</code>); <em>"Động"</em> là cập nhật nối tiếp dần dần từ nhỏ đến lớn.</li>
                  <li><strong>Khử đệ quy:</strong> Biến đổi lời gọi hàm tốn bộ nhớ thành việc duyệt mảng tuần tự.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_rec_to_dp',
            title: 'Phòng Thí Nghiệm 1: Đệ Quy Có Nhớ vs Quy Hoạch Động Vòng Lặp',
            desc: 'Thử nghiệm sự khác biệt về bộ nhớ và tốc độ giữa Đệ quy có nhớ (Memoization) và Bảng DP tuần tự.',
            toggles: [
              {
                key: 'impl_mode',
                label: 'Phương pháp cài đặt',
                options: [
                  { value: 'iter_dp', text: 'Bảng DP tuần tự (O(1) bộ nhớ Stack, chạy tức thì)', kind: 'ok' },
                  { value: 'rec_memo', text: 'Đệ quy có nhớ khi N = 100,000 (Tràn Call Stack)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isIter = state.impl_mode === 'iter_dp';
              const code = `#include <iostream>
using namespace std;

${isIter ? `// BẢNG DP: Duyệt từ đáy lên, O(1) không gian Stack
long long fibo(int n) {
    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long c = (a + b) % 1000000007;
        a = b; b = c;
    }
    return b;
}` : `// ĐỆ QUY CÓ NHỚ: Vẫn phải gọi sâu N tầng Call Stack!
long long memo[100005];
long long fibo(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    return memo[n] = (fibo(n - 1) + fibo(n - 2)) % 1000000007;
}`}

int main() {
    int n = 100000;
    cout << "Fibo(" << n << ") = " << fibo(n) << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: isIter ? [5, 6, 7] : [5, 6, 7],
                statusOk: isIter,
                statusText: isIter ? 'Quy hoạch động tuần tự: tính xong Fibo(100.000) trong 0.001s tuyệt đối an toàn' : 'Đệ quy có nhớ: dù có mảng nhớ memo nhưng vẫn bị sập vì Call Stack gọi sâu 100.000 tầng',
                console: isIter
                  ? `$ ./fibo\nFibo(100000) = 879482701\n[Thanh cong: Khong ton bo nho Call Stack!]`
                  : `$ ./fibo\nSegmentation fault (core dumped)\n[Loi: Stack Overflow truoc khi kip luu vao mang memo!]`,
                explain: isIter
                  ? 'Bảng DP tính toán tuần tự từ bài toán nhỏ đến bài toán lớn, loại bỏ hoàn toàn chi phí gọi hàm.'
                  : 'Dù memoization tránh tính lại các nhánh trùng, nhưng chuỗi đệ quy fibo(n-1) vẫn tạo ra một đường thẳng sâu N tầng trên Call Stack.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Với bài toán đếm số cách bước lên cầu thang n bậc (mỗi bước đi 1 hoặc 2 bậc), bảng giá trị dp[1..4] lần lượt là bao nhiêu?',
            traceCode: `dp[1] = 1; dp[2] = 2;
for (int i = 3; i <= 4; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
}`,
            options: [
              'Bảng giá trị là dp = [1, 2, 3, 5] ứng với từng bậc thang',
              'Bảng giá trị là dp = [1, 2, 4, 8] theo cấp số nhân hai',
              'Bảng giá trị là dp = [1, 2, 3, 4] tăng dần từng đơn vị',
              'Bảng giá trị là dp = [1, 1, 2, 3] bắt đầu từ số một'
            ],
            correct: 0,
            explain: 'dp[1]=1, dp[2]=2. dp[3] = dp[2] + dp[1] = 2 + 1 = 3. dp[4] = dp[3] + dp[2] = 3 + 2 = 5.'
          },
          {
            type: 'trace',
            q: 'Tại sao việc chuyển từ Đệ quy có nhớ (Top-down) sang Quy hoạch động tuần tự (Bottom-up) lại giúp code vượt qua giới hạn bộ nhớ?',
            options: [
              'Vì Bottom-up loại bỏ hoàn toàn các khung nhớ Call Stack và chỉ dùng các biến lặp',
              'Vì Bottom-up nén dữ liệu các số nguyên thành các chuỗi văn bản có dung lượng nhỏ',
              'Vì Bottom-up bắt buộc trình biên dịch phải kích hoạt chế độ đa luồng của chip CPU',
              'Vì Bottom-up tự động xóa bỏ các bài toán con không có lời giải trước khi chạy'
            ],
            correct: 0,
            explain: 'Bottom-up chạy bằng vòng lặp tuần tự nên độ sâu Call Stack là O(1), không bao giờ lo lỗi tràn bộ nhớ ngăn xếp.'
          },
          {
            type: 'single',
            q: 'Thuật ngữ "Quy hoạch động" (Dynamic Programming) có ý nghĩa bản chất là gì?',
            options: [
              'Lập bảng ghi nhận kết quả và cập nhật liên tục từ bài toán nhỏ đến bài toán lớn',
              'Viết chương trình có khả năng tự động thay đổi thuật toán trong lúc đang chấm bài',
              'Một kỹ thuật chỉ dùng riêng cho các bài toán đồ thị có chu trình âm trong thi đấu',
              'Phương pháp chia đôi dữ liệu liên tục để giảm kích thước bài toán về một nửa'
            ],
            correct: 0,
            explain: 'Quy hoạch là lập bảng kế hoạch, động là các ô trong bảng được cập nhật dần dần theo thời gian từ bài toán nhỏ lên lớn.'
          },
          {
            type: 'multiple',
            q: 'Những lợi ích nào sau đây đạt được khi tự khử đệ quy bằng vòng lặp và mảng Quy hoạch động?',
            options: [
              'Triệt tiêu hoàn toàn rủi ro bị lỗi tràn ngăn xếp (Stack Overflow) khi N rất lớn',
              'Tận dụng tốt bộ nhớ đệm (CPU Cache) do dữ liệu mảng được bố trí liên tục trên RAM',
              'Giảm bớt chi phí phụ của việc đẩy và rút các khung nhớ Stack Frame liên tục',
              'Làm cho code luôn luôn tự động chạy đúng mà không cần viết điều kiện dừng'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đúng. Ý D sai vì bảng DP vẫn bắt buộc phải khởi tạo các bài toán cơ sở (base cases).'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: MẢNG GHÉP 2: DÙNG NGĂN XẾP ĐƠN ĐIỆU TĂNG TỐC QUY HOẠCH ĐỘNG
      // ============================================================================
      {
        id: 'mod2',
        number: 'Mảnh Ghép 2',
        shortTitle: 'Monotonic Stack Tối Ưu DP',
        title: 'Mảnh Ghép 2: Dùng Ngăn Xếp Đơn Điệu Tăng Tốc Bước Chuyển DP Từ O(N^2) Về O(N)',
        lead: 'Khám phá kỹ thuật kết hợp Monotonic Stack vào bước chuyển trạng thái DP: tại sao chỉ cần 1 cú nhảy về L[i] là giải quyết xong toàn bộ quá khứ?',
        subproblem: {
          title: 'Làm sao để tính dp[i] phụ thuộc vào các giá trị min/max của các đoạn con trong O(1)?',
          desc: 'Thay vì dùng vòng for j duyệt ngược từ i-1 về 0 mất O(N^2), ta dùng Ngăn xếp đơn điệu tìm vị trí L[i] gần nhất nhỏ hơn A[i] và tái sử dụng ngay dp[L[i]].'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Kế Thừa Quá Khứ Đến Công Thức dp[i] = dp[L] + A[i] * (i - L)',
            tag: 'Tối ưu hóa DP',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Tình huống đời sống bình thường</span>
                <p>Tính tổng chiều cao thấp nhất của các khối đá xếp hàng:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Khi một khối đá $A_i$ mới xuất hiện, nó thấp hơn các khối đá ngay trước nó.</li>
                  <li>Nó sẽ <strong>thay thế toàn bộ các khối đá cao hơn đứng trước</strong> trong vai trò làm "chiều cao thấp nhất" của các đoạn kết thúc tại $i$.</li>
                  <li>Nhưng các đoạn vươn xa hơn về trước điểm $L_i$ (nơi có khối đá còn thấp hơn cả $A_i$) thì sao? <strong>Đã được tính và ghi lại trong $DP[L_i]$ từ trước!</strong></li>
                  <li>Ta chỉ việc kế thừa lại $DP[L_i]$ mà không phải tính lại!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Công thức chuyển trạng thái kết hợp Monotonic Stack:</p>
                <pre class="code-pre"><code>stack&lt;int&gt; st; // Ngăn xếp tăng dần
for (int i = 0; i &lt; n; i++) {
    while (!st.empty() && a[st.top()] &gt;= a[i]) {
        st.pop();
    }
    int L = st.empty() ? -1 : st.top();

    if (L == -1) {
        dp[i] = (long long)a[i] * (i + 1);
    } else {
        // Tái sử dụng dp[L] chỉ trong O(1)!
        dp[i] = dp[L] + (long long)a[i] * (i - L);
    }
    st.push(i);
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi & Thuật ngữ (Liên kết ngược về Bước 1)</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Tối ưu hóa trạng thái DP (DP Optimization):</strong> Kỹ thuật dùng cấu trúc dữ liệu để giảm thời gian tìm trạng thái tốt nhất từ $O(N)$ xuống $O(1)$.</li>
                  <li><strong>Khấu hao O(N):</strong> Ngăn xếp đơn điệu duy trì các vị trí $L$ chỉ tốn $2N$ thao tác cho cả bài toán.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_dp_mono_stack',
            title: 'Phòng Thí Nghiệm 2: Tính dp[i] Bằng Vét Cạn O(N^2) vs Monotonic Stack O(N)',
            desc: 'Quan sát giá trị dp[i] được tính tức thì nhờ tái sử dụng kết quả dp[L].',
            toggles: [
              {
                key: 'dp_algo',
                label: 'Phương pháp chuyển trạng thái',
                options: [
                  { value: 'fast_mono', text: 'Dùng Monotonic Stack O(N)', kind: 'ok' },
                  { value: 'slow_brute', text: 'Duyệt trâu vòng lặp j O(N^2)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isFast = state.dp_algo === 'fast_mono';
              const log = isFast
                ? `i=0 (a=3): L=-1 -> dp[0] = 3 * 1 = 3 -> Stack: [0]\ni=1 (a=1): 3>=1 pop(0), L=-1 -> dp[1] = 1 * 2 = 2 -> Stack: [1]\ni=2 (a=2): top=1 < 2 -> L=1 -> dp[2] = dp[1] + 2*(2-1) = 2 + 2 = 4 -> Stack: [1, 2]\ni=3 (a=4): top=2 < 4 -> L=2 -> dp[3] = dp[2] + 4*(3-2) = 4 + 4 = 8 -> Stack: [1, 2, 3]\n-> Tổng kết quả: 3 + 2 + 4 + 8 = 17 trong O(N)!`
                : `Vét cạn: Duyệt từng đoạn con:\n[3]=3; [3,1]=1, [1]=1; [3,1,2]=1, [1,2]=1, [2]=2; [3,1,2,4]=1, [1,2,4]=1, [2,4]=2, [4]=4\nTổng = 3 + 2 + 4 + 8 = 17 (Mất N*(N+1)/2 phép tính)`;

              const code = `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    vector<int> a = {3, 1, 2, 4};
    int n = a.size();
    vector<long long> dp(n, 0);
    stack<int> st;
    long long ans = 0;

    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.top()] >= a[i]) st.pop();
        int L = st.empty() ? -1 : st.top();
        dp[i] = (L == -1) ? (long long)a[i] * (i + 1) : dp[L] + (long long)a[i] * (i - L);
        ans += dp[i];
        st.push(i);
    }
    cout << "Tong min cac doan con: " << ans << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [14, 15, 16],
                statusOk: isFast,
                statusText: isFast ? 'Monotonic Stack tối ưu bước chuyển DP về O(1) trung bình' : 'Vét cạn mất O(N^2) thời gian khi N lớn',
                console: log,
                explain: 'Nhờ tìm được vị trí L trong O(1) qua ngăn xếp, ta kế thừa ngay dp[L] và chỉ phải tính phần chênh lệch cho (i - L) đoạn con mới.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Với dãy số a = [5, 2, 6], khi xét đến phần tử i = 2 (a[2] = 6) với dp[1] = 4 và L = 1 (vị trí của số 2). Giá trị dp[2] được tính theo công thức là bao nhiêu?',
            traceCode: `// a = [5, 2, 6], dp[1] = 4, L = 1, i = 2
dp[2] = dp[L] + a[i] * (i - L);`,
            options: [
              'dp[2] = 4 + 6 * (2 - 1) = 4 + 6 = 10',
              'dp[2] = 4 + 2 * (2 - 1) = 4 + 2 = 6',
              'dp[2] = 6 * (2 + 1) = 18 vì không tính dp[L]',
              'dp[2] = 4 * 6 + (2 - 1) = 24 + 1 = 25'
            ],
            correct: 0,
            explain: 'Áp dụng công thức: dp[2] = dp[1] + a[2] * (2 - 1) = 4 + 6 * 1 = 10.'
          },
          {
            type: 'trace',
            q: 'Trong công thức dp[i] = dp[L] + a[i] * (i - L), tại sao ta có thể cộng trực tiếp giá trị dp[L] mà không cần duyệt lại các phần tử trước L?',
            options: [
              'Vì với mọi đoạn con bắt đầu trước hoặc tại L, phần tử a[i] lớn hơn a[L] nên không thể làm thay đổi min cũ',
              'Vì tất cả các phần tử trước vị trí L đều tự động có giá trị bằng không trong mảng',
              'Vì máy tính đã xóa sạch các phần tử trước vị trí L khỏi bộ nhớ RAM của hệ thống',
              'Vì thuật toán chỉ áp dụng cho các mảng đã được sắp xếp tăng dần từ trước'
            ],
            correct: 0,
            explain: 'Vì a[L] < a[i], đối với bất kỳ đoạn con nào vươn qua L về phía trước, phần tử nhỏ nhất vẫn do các phần tử trước L (đã gói trong dp[L]) quyết định.'
          },
          {
            type: 'single',
            q: 'Tác dụng lớn nhất của việc đưa Monotonic Stack vào bài toán Quy hoạch động là gì?',
            options: [
              'Giảm độ phức tạp của bước chuyển trạng thái từ O(N) xuống O(1) khấu hao',
              'Tự động tăng số lượng phần tử của mảng lên gấp hai lần khi chạy',
              'Chuyển toàn bộ các giá trị trong bảng DP sang kiểu dữ liệu xâu ký tự',
              'Giúp chương trình không cần phải khai báo hàm main() trong mã nguồn'
            ],
            correct: 0,
            explain: 'Monotonic Stack lọc và tìm nhanh vị trí tối ưu trong O(1) khấu hao, đưa cả bài toán từ O(N^2) về O(N).'
          },
          {
            type: 'multiple',
            q: 'Những điều kiện nào sau đây cho thấy một bài toán Quy hoạch động có thể được tối ưu bằng Ngăn xếp đơn điệu?',
            options: [
              'Bước chuyển trạng thái phụ thuộc vào giá trị nhỏ nhất hoặc lớn nhất của các đoạn con',
              'Trạng thái cũ j bị che khuất và mất hẳn giá trị tối ưu khi một phần tử mới xuất hiện',
              'Mỗi phần tử chỉ cần xét vào và ra khỏi cấu trúc dữ liệu tối đa một số lần hữu hạn',
              'Bài toán bắt buộc phải có ít nhất mười nghìn câu lệnh điều kiện if lồng nhau'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C là các dấu hiệu đặc trưng của kỹ thuật tối ưu hóa DP bằng Monotonic Stack.'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: MẢNG GHÉP 3: CỬA SỔ TRƯỢT (HAI CON TRỎ) GHÉP ĐÔI MONOTONIC DEQUE
      // ============================================================================
      {
        id: 'mod3',
        number: 'Mảnh Ghép 3',
        shortTitle: 'Monotonic Deque & Sliding Window DP',
        title: 'Mảnh Ghép 3: Cửa Sổ Trượt Ghép Đôi Ngăn Xếp Đơn Điệu (Monotonic Deque DP)',
        lead: 'Đỉnh cao kết hợp: Khi bước chuyển DP bị giới hạn trong phạm vi K bước, ta kết hợp Hai con trỏ cửa sổ trượt và Ngăn xếp đơn điệu thành std::deque tối ưu trong O(N).',
        subproblem: {
          title: 'Làm sao để tìm max/min dp[j] trong phạm vi cửa sổ trượt i - K <= j < i chỉ trong O(1)?',
          desc: 'Đầu trước của deque đóng vai trò con trỏ trái loại bỏ phần tử quá hạn, đuôi sau của deque đóng vai trò ngăn xếp đơn điệu loại bỏ các giá trị kém tối ưu.'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Đoàn Tàu K Toa Đến Hàng Đợi Hai Đầu std::deque',
            tag: 'Cấu trúc tối thượng',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Tình huống đời sống bình thường</span>
                <p>Mô hình đoàn tàu chứa $K$ hành khách ưu tiên:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Khi tàu chạy đến ga $i$, những hành khách lên tàu từ ga cũ hơn $i - K$ <strong>bắt buộc phải xuống tàu</strong> (Hết hạn vé) $\\rightarrow$ Lấy ra ở <strong>đầu tàu (front)</strong>.</li>
                  <li>Một hành khách mới lên tàu có điểm ưu tiên rất cao: những ai ở trên tàu mà điểm ưu tiên thấp hơn người mới này <strong>sẽ bị loại khỏi danh sách xét duyệt</strong> $\\rightarrow$ Đuổi ra ở <strong>đuôi tàu (back)</strong>.</li>
                  <li>Người đứng ở đầu tàu luôn luôn là người có điểm ưu tiên cao nhất!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Khung code chuẩn mực tối ưu hóa DP bằng <code>std::deque</code>:</p>
                <pre class="code-pre"><code>deque&lt;int&gt; dq; // Lưu chỉ số j
dq.push_back(0);

for (int i = 1; i &lt; n; i++) {
    // 1. Con trỏ trái cửa sổ trượt: Bỏ phần tử quá hạn
    while (!dq.empty() && dq.front() &lt; i - K) {
        dq.pop_front();
    }

    // 2. dq.front() luôn là giá trị tối ưu nhất trong O(1)
    dp[i] = a[i] + dp[dq.front()];

    // 3. Cơ chế ngăn xếp đơn điệu: Bỏ phần tử kém ở đuôi
    while (!dq.empty() && dp[dq.back()] &lt;= dp[i]) {
        dq.pop_back();
    }
    dq.push_back(i);
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi & Thuật ngữ (Liên kết ngược về Bước 1)</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Hàng đợi hai đầu (Deque - Double Ended Queue):</strong> Cấu trúc cho phép thêm và xóa ở cả hai đầu: <code>pop_front()</code> và <code>pop_back()</code> trong $O(1)$.</li>
                  <li><strong>Monotonic Deque DP:</strong> Kỹ thuật tối ưu hóa bước chuyển DP trượt cửa sổ $K$ đưa $O(N \\times K)$ về $O(N)$.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_deque_dp',
            title: 'Phòng Thí Nghiệm 3: Mô Phỏng Từng Bước Monotonic Deque DP',
            desc: 'Quan sát pop_front (cửa sổ trượt) và pop_back (ngăn xếp đơn điệu) phối hợp nhịp nhàng.',
            toggles: [
              {
                key: 'jump_k',
                label: 'Độ rộng bước nhảy K',
                options: [
                  { value: 'k2', text: 'K = 2 trên mảng {1, -1, -2, 4, -7, 3}', kind: 'ok' },
                  { value: 'k1', text: 'K = 1 (Chỉ được đi liền kề)', kind: 'ok' }
                ]
              }
            ],
            build(state) {
              const isK2 = state.jump_k === 'k2';
              const kVal = isK2 ? 2 : 1;
              const log = isK2
                ? `i=0: dp[0]=1 -> dq=[0]\ni=1: dq.front=0 (>= 1-2) -> dp[1] = -1 + 1 = 0 -> pop_back ko co -> dq=[0, 1]\ni=2: dq.front=0 (>= 2-2) -> dp[2] = -2 + 1 = -1 -> dq=[0, 1, 2]\ni=3: dq.front=0 < 3-2 -> pop_front(0)! dq.front hien tai la 1 (dp[1]=0) -> dp[3] = 4 + 0 = 4! dp[3]=4 lon hon ca dp[1], dp[2] -> pop_back(2), pop_back(1) -> dq=[3]!\n-> Kết quả cuối cùng dp[5] = 7 trong O(N)!`
                : `K=1: Bắt buộc phải đi qua mọi vị trí: tổng = 1 + (-1) + (-2) + 4 + (-7) + 3 = -2`;

              const code = `#include <iostream>
#include <vector>
#include <deque>
using namespace std;

int main() {
    vector<long long> a = {1, -1, -2, 4, -7, 3};
    int n = a.size();
    int K = ${kVal};
    vector<long long> dp(n, 0);
    deque<int> dq;
    dp[0] = a[0];
    dq.push_back(0);

    for (int i = 1; i < n; i++) {
        while (!dq.empty() && dq.front() < i - K) dq.pop_front();
        dp[i] = a[i] + dp[dq.front()];
        while (!dq.empty() && dp[dq.back()] <= dp[i]) dq.pop_back();
        dq.push_back(i);
    }
    cout << "Diem max: " << dp[n - 1] << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [8],
                statusOk: true,
                statusText: 'Monotonic Deque kết hợp hoàn hảo giữa Hai con trỏ và Ngăn xếp đơn điệu',
                console: log,
                explain: 'Thao tác pop_front đảm bảo tính hợp lệ của cửa sổ trượt K, thao tác pop_back duy trì giá trị tối ưu ở đầu hàng đợi.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Với K = 2 và i = 4. Trong hàng đợi deque hiện đang chứa các chỉ số [1, 2, 3]. Sau khi thực hiện vòng lặp while (!dq.empty() && dq.front() < i - K), chỉ số nào sẽ bị pop_front ra khỏi hàng đợi?',
            options: [
              'Chỉ số 1 bị pop_front vì 1 < 4 - 2 = 2 (đã trượt ra ngoài cửa sổ K = 2)',
              'Chỉ số 3 bị pop_front vì nằm ở vị trí gần nhất so với chỉ số hiện tại 4',
              'Chỉ số 2 bị pop_front vì giá trị tại vị trí 2 là giá trị số chẵn',
              'Không có chỉ số nào bị pop_front vì cả ba chỉ số đều nhỏ hơn bốn'
            ],
            correct: 0,
            explain: 'Điều kiện quá hạn là j < i - K, tức j < 4 - 2 = 2. Do đó chỉ số 1 (< 2) bị loại bỏ khỏi đầu hàng đợi.'
          },
          {
            type: 'trace',
            q: 'Sau khi tính xong dp[i] = 10, trong deque đang có các chỉ số ở đuôi có giá trị dp[dq.back()] lần lượt là 6, 8, 12 (với mục tiêu tìm MAX). Thao tác pop_back sẽ diễn ra như thế nào?',
            options: [
              'Lần lượt loại bỏ giá trị 6 và 8 khỏi đuôi vì chúng nhỏ hơn 10, sau đó dừng lại trước 12',
              'Loại bỏ toàn bộ cả ba giá trị 6, 8 và 12 ra khỏi đuôi của hàng đợi deque',
              'Chỉ loại bỏ giá trị 12 vì 12 là giá trị lớn nhất trong ba phần tử ở đuôi',
              'Không có phần tử nào bị loại bỏ vì hàng đợi deque chỉ cho phép thao tác ở đầu'
            ],
            correct: 0,
            explain: 'Vòng lặp while (!dq.empty() && dp[dq.back()] <= 10) sẽ pop 6, pop 8, và dừng khi gặp 12 (> 10).'
          },
          {
            type: 'single',
            q: 'Tại sao việc kết hợp Hai con trỏ (cửa sổ trượt) và Ngăn xếp đơn điệu vào std::deque lại đưa độ phức tạp về O(N)?',
            options: [
              'Vì mỗi chỉ số j chỉ được thêm vào đuôi deque đúng 1 lần và lấy ra khỏi deque tối đa 1 lần',
              'Vì thư viện std::deque của C++ tự động biên dịch sang mã máy chạy song song trên tám lõi CPU',
              'Vì thuật toán tự động bỏ qua toàn bộ các bước lặp có chỉ số i là số nguyên lẻ',
              'Vì kích thước của cửa sổ trượt K luôn luôn bằng kích thước N của mảng đầu vào'
            ],
            correct: 0,
            explain: 'Mỗi phần tử được push_back đúng 1 lần, và chỉ bị pop (qua pop_front hoặc pop_back) tối đa 1 lần, tổng thao tác <= 2N.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là ĐÚNG khi so sánh giữa Ngăn xếp đơn điệu thuần túy và Hàng đợi hai đầu đơn điệu (Monotonic Deque)?',
            options: [
              'Ngăn xếp đơn điệu chỉ thao tác ở 1 đầu, dùng khi không bị giới hạn độ dài khoảng cách',
              'Monotonic Deque thao tác ở cả 2 đầu, dùng khi bước chuyển bị giới hạn trong cửa sổ độ dài K',
              'Cả hai cấu trúc đều đạt độ phức tạp thời gian khấu hao O(1) cho mỗi bước xử lý',
              'Monotonic Deque bắt buộc phải cài đặt bằng con trỏ động chứ không thể dùng thư viện C++'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đúng. Ý D sai vì thư viện chuẩn std::deque trong C++ hỗ trợ sẵn và chạy cực kỳ tối ưu.'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_comb_1',
        title: 'Bẫy Quên Loại Bỏ Phần Tử Quá Hạn Ở Đầu Deque Trong Bài Toán Cửa Sổ K',
        description: 'Học sinh viết thuật toán Monotonic Deque DP nhưng quên vòng lặp pop_front kiểm tra dq.front() < i - K, dẫn đến việc lấy nhầm kết quả từ một bước nhảy vượt quá giới hạn K.',
        failingInput: 'K = 2, i = 3, dq.front() = 0 (nhảy từ 0 đến 3 là 3 bước > K)',
        failingOutput: 'Lấy dp[0] làm kết quả cho dp[3], vi phạm giới hạn bước nhảy',
        expectedOutput: 'Bắt buộc phải pop_front() loại bỏ vị trí 0 trước khi lấy kết quả',
        buggyCode: `long long nhayBacThang(vector<long long>& a, int K) {
    int n = a.size();
    vector<long long> dp(n, 0);
    deque<int> dq;
    dp[0] = a[0];
    dq.push_back(0);
    for (int i = 1; i < n; i++) {
        // BUG: Quen kiem tra dq.front() < i - K!
        dp[i] = a[i] + dp[dq.front()];
        while (!dq.empty() && dp[dq.back()] <= dp[i]) dq.pop_back();
        dq.push_back(i);
    }
    return dp[n - 1];
}`,
        bugLine: 9,
        patches: [
          { text: 'Chèn thêm trước dòng 9: while (!dq.empty() && dq.front() < i - K) dq.pop_front();' },
          { text: 'Sửa dòng 9 thành: dp[i] = a[i] + dp[dq.back()];' },
          { text: 'Sửa dòng 9 thành: dp[i] = a[i] + dp[i - 1];' }
        ],
        correctPatch: 0,
        explain: 'Nếu không có vòng lặp pop_front ở đầu, phần tử dq.front() có thể đã nằm ngoài phạm vi cửa sổ [i - K, i - 1], vi phạm điều kiện độ dài bước nhảy. Bản vá A khôi phục cơ chế cửa sổ trượt chuẩn mực.'
      },
      {
        id: 'dbg_comb_2',
        title: 'Bẫy Tính Thiếu Khi Ngăn Xếp Rỗng Trong Bài Toán Tổng Min Đoạn Con',
        description: 'Khi ngăn xếp rỗng (nghĩa là a[i] nhỏ hơn tất cả các phần tử đứng trước nó), học sinh gán dp[i] = a[i] thay vì a[i] * (i + 1), làm tính thiếu toàn bộ các đoạn con vươn về đầu dãy.',
        failingInput: 'a = [5, 2], i = 1 (a[1] = 2 nhỏ hơn 5, stack rỗng)',
        failingOutput: 'dp[1] = 2 (Chỉ tính được đoạn {2}, bỏ sót đoạn {5, 2} có min là 2)',
        expectedOutput: 'dp[1] = 2 * (1 + 1) = 4 (Tính đủ cả đoạn {5, 2} và đoạn {2})',
        buggyCode: `long long tinhDP(vector<int>& a) {
    int n = a.size();
    vector<long long> dp(n);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.top()] >= a[i]) st.pop();
        int L = st.empty() ? -1 : st.top();
        if (L == -1) dp[i] = a[i]; // BUG: Phai nhan voi (i + 1)!
        else dp[i] = dp[L] + (long long)a[i] * (i - L);
        st.push(i);
    }
    return dp[n - 1];
}`,
        bugLine: 9,
        patches: [
          { text: 'Sửa dòng 9 thành: if (L == -1) dp[i] = (long long)a[i] * (i + 1);' },
          { text: 'Sửa dòng 9 thành: if (L == -1) dp[i] = dp[i - 1] + a[i];' },
          { text: 'Sửa dòng 9 thành: if (L == -1) dp[i] = 0;' }
        ],
        correctPatch: 0,
        explain: 'Khi L == -1, phần tử a[i] nhỏ nhất trong toàn bộ đoạn từ index 0 đến i (gồm đúng i + 1 vị trí). Do đó có đúng (i + 1) đoạn con kết thúc tại i nhận a[i] làm giá trị nhỏ nhất, công thức bắt buộc là a[i] * (i + 1).'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN
    // ============================================================================
    practiceProblems: [
      {
        id: 'LC-907',
        title: 'Sum of Subarray Minimums (DP + Monotonic Stack)',
        judge: 'LeetCode',
        tier: 2,
        link: 'https://leetcode.com/problems/sum-of-subarray-minimums/',
        hint: 'Áp dụng công thức dp[i] = dp[L] + a[i] * (i - L) với L tìm bằng Monotonic Stack tăng dần.'
      },
      {
        id: 'LC-1696',
        title: 'Jump Game VI (Sliding Window DP with Deque)',
        judge: 'LeetCode',
        tier: 2,
        link: 'https://leetcode.com/problems/jump-game-vi/',
        hint: 'Mỗi bước nhảy tối đa K: dùng Monotonic Deque duy trì max dp[j] trong cửa sổ [i-K, i-1] trong O(N).'
      },
      {
        id: 'CSES-1076',
        title: 'Sliding Window Median (Cửa Sổ Trượt Nâng Cao)',
        judge: 'CSES Problem Set',
        tier: 3,
        link: 'https://cses.fi/problemset/task/1076',
        hint: 'Duy trì cửa sổ trượt độ dài K kết hợp 2 cấu trúc dữ liệu để tìm trung vị trong O(N log K).'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
