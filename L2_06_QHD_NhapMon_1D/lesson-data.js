/**
 * DỮ LIỆU BÀI GIẢNG L2-06: NHẬP MÔN QUY HOẠCH ĐỘNG (DP 1D & TRUY VẾT)
 * Tầng 2 — Pha 2 STL Lớp 9 (Nối tiếp từ MOD-01, L2-04, L2-05)
 * Mở khóa:
 * - Phát hiện Bài toán con gối nhau (Overlapping Subproblems) trên cây đệ quy O(2^N).
 * - Đệ quy có nhớ (Top-Down Memoization), bẫy thiếu & và cảnh báo Call Stack (~8MB).
 * - Khung 4 Bước Quy Hoạch Động & Lập bảng 1D (Bottom-Up: Pull DP vs Push DP),
 *   vô cực an toàn INF = 1e18 (tránh LLONG_MAX overflow), giải Frog 1/2, Đổi tiền {1, 3, 4}, House Robber.
 * - Truy vết nghiệm bằng mảng trace[] (lần ngược từ đích + reverse + bảo vệ sentinel -1).
 * Ranh giới tiền đề: Chỉ dùng DP 1 chiều (dp[i]); KHÔNG nhảy sang DP lưới 2D (L2-07),
 *   Knapsack 0/1 & Coin Comb I/II (L2-08), hay LIS/LCS/Vacation đa trạng thái (L2-09).
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'dp_nhap_mon',
    number: 'Bài Học L2-06',
    shortTitle: 'Nhập Môn QHD (DP 1D)',
    title: 'Bài L2-06: Nhập Môn Quy Hoạch Động (DP 1D &amp; Truy Vết)',
    lead: 'Ở <code>L2-05</code>, Tham lam đã gãy trên bài toán Đổi tiền <code>{1, 3, 4}</code> với $S = 6$, còn Quay lui $O(2^N)$ của <code>L2-04</code> thì lại TLE khi $N$ lớn. Hãy bước qua cánh cửa <strong>Quy hoạch động 1 chiều (1D DP)</strong>: biến cây đệ quy lặp vô ích thành <strong>Đệ quy có nhớ</strong> $O(N)$, đóng gói <strong>Khung 4 Bước DP</strong> (Pull DP &amp; Push DP) cùng <strong>Truy vết <code>trace[]</code></strong> để vừa ra đúng $100\\%$ như vét cạn, vừa chạy mượt ở $N \\le 10^6$!',
    modules: [
      // ============================================================================
      // MODULE 1: TỪ CÂY ĐỆ QUY O(2^N) ĐẾN ĐỆ QUY CÓ NHỚ (TOP-DOWN MEMOIZATION)
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Đệ Quy Có Nhớ',
        title: 'Vấn Đề Nhỏ 1: Từ Cây Đệ Quy $O(2^N)$ Đến Đệ Quy Có Nhớ (Top-Down Memoization)',
        lead: 'Tại sao cùng một công thức đệ quy leo cầu thang <code>f(n) = f(n - 1) + f(n - 2)</code> lại tốn tới hàng trăm nghìn lời gọi khi $N = 25$, nhưng chỉ cần kẹp thêm đúng một cuốn sổ nháp <code>memo[]</code> là rơi xuống còn vài chục phép tính?',
        subproblem: {
          title: 'Làm sao giữ nguyên sự chính xác tuyệt đối của cây đệ quy (<code>L2-04</code>) mà không phải tính đi tính lại cùng một bài toán con hàng tỷ lần?',
          desc: 'Khi vẽ cây đệ quy cho bài toán leo cầu thang hoặc Đổi tiền <code>{1, 3, 4}</code>, ta thấy rất nhiều nhánh khác nhau cùng rẽ xuống đúng một bài toán con như <code>f(3)</code> hay <code>solve(2)</code>. Nếu ta ghi lại đáp án ngay lần đầu tính được vào mảng nháp <code>memo[]</code>, mọi lần gặp lại sau chỉ việc đọc thẳng kết quả trong $O(1)$!'
        },
        cards: [
          {
            heading: 'Phát Hiện Bài Toán Con Gối Nhau &amp; Đệ Quy Có Nhớ (Memoization)',
            tag: 'O(2^N) &rarr; O(N) &bull; Memo',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Cô giáo đố tính số cách leo hết cầu thang $N$ bậc (mỗi bước lên $1$ hoặc $2$ bậc). Để tính $f(6)$, bạn phải nhờ hai bạn dưới tính giúp $f(5)$ và $f(4)$. Nhưng bạn $f(5)$ lại đi hỏi tiếp $f(4)$ và $f(3)$, còn $f(4)$ lại hỏi $f(3)$ và $f(2)$...</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Lãng phí khổng lồ trên cây đệ quy:</strong> Chỉ mới $N = 25$, cây đệ quy ngây thơ gọi hàm tới <strong><code>242,785</code> lần</strong> vì cứ gặp lại <code>f(3)</code> hay <code>f(2)</code> là ngồi tính lại từ đầu. Nếu $N = 45$, số lời gọi vọt lên tới <strong><code>3,672,623,805</code> lần</strong> ($\\approx 3{,}67 \\times 10^9$) và TLE ngay!</li>
                  <li><strong>Chiến lược kẹp sổ nháp <code>memo[]</code>:</strong> Ta dán một bảng nháp gồm $N + 1$ ô, ban đầu ghi hết số <code>-1</code> (nghĩa là <em>"chưa từng giải"</em>). Ai hỏi <code>f(k)</code> lần đầu thì chịu khó tính theo công thức rồi <strong>ghi ngay đáp án vào ô <code>memo[k]</code></strong>. Ai hỏi lại <code>f(k)</code> từ lần thứ hai trở đi chỉ cần liếc sổ nháp thấy khác <code>-1</code> là trả lời ngay trong $O(1)$! Với $N = 25$, tổng lời gọi sập từ <code>242,785</code> xuống chỉ còn <strong><code>49</code> lần</strong>!</li>
                  <li><strong>Giải cứu Đổi tiền <code>{1, 3, 4}</code> ở <code>L2-05</code>:</strong> Đặt <code>memo[s] == -1</code> là chưa tính, còn nếu một số tiền <code>s</code> <em>đã tính xong nhưng vô nghiệm</em> (như $S = 5$ với xu <code>{2, 4}</code>), ta lưu <code>memo[s] = INF</code> (khác <code>-1</code>!) để lần sau không tính lại nhánh vô nghiệm nữa.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Đệ Quy Có Nhớ Giải Đổi Tiền {1, 3, 4} (S = 6)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long INF = 1000000000000000000LL;

// memo[s] == -1: chưa tính | memo[s] == INF: đã tính nhưng vô nghiệm
long long coinMemo(int s, const vector&lt;int&gt;&amp; coins, vector&lt;long long&gt;&amp; memo) {
    if (s == 0) return 0;
    if (memo[s] != -1) return memo[s]; // Đọc ngay sổ nháp trong O(1)

    long long best = INF;
    for (int c : coins) {
        if (s &gt;= c) {
            long long sub = coinMemo(s - c, coins, memo);
            if (sub != INF) {
                best = min(best, sub + 1);
            }
        }
    }
    memo[s] = best; // Ghi nhớ kết quả trước khi trả về
    return memo[s];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int S = 6;
    vector&lt;int&gt; coins = {1, 3, 4};
    vector&lt;long long&gt; memo(S + 1, -1);

    long long ans = coinMemo(S, coins, memo);
    cout &lt;&lt; "So xu it nhat cho S=6: " &lt;&lt; (ans == INF ? -1 : ans) &lt;&lt; '\\n'; // 2
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bài toán con gối nhau (<code>Overlapping Subproblems</code>):</strong> Hiện tượng nhiều nhánh trên cây đệ quy cùng đi giải đi giải lại một bài toán con nhỏ hơn có tham số giống hệt nhau.</li>
                  <li><strong>Đệ quy có nhớ (<code>Top-Down Memoization</code>):</strong> Cách đi từ bài toán gốc lớn ($S$ hoặc $N$) gọi đệ quy xuống các bài toán nhỏ hơn và lưu kết quả vào mảng nháp <code>memo[]</code> để mỗi trạng thái chỉ tính tối đa $1$ lần.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Hai Cái Bẫy Chết Người Của Memoization: Quên Dấu &amp; và Tràn Call Stack (~8 MB)',
            tag: 'Bẫy TLE &amp; Stack Overflow',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Rất nhiều bạn viết đúng công thức Đệ quy có nhớ nhưng vẫn bị <strong>TLE</strong> hoặc <strong>Runtime Error (RE)</strong> ngay trên bài đầu tiên vì mắc 2 lỗi sau:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bẫy 1 &mdash; Quên dấu <code>&amp;</code> (Photo cuốn sổ nháp):</strong> Nếu bạn viết tham số <code>vector&lt;long long&gt; memo</code> mà thiếu dấu <code>&amp;</code>, C++ mặc định <em>truyền tham trị</em>: mỗi lần gọi đệ quy nó sao chép ra một cuốn sổ nháp mới tinh. Khi hàm con viết đáp án vào bản sao rồi thoát ra, bản chính ở hàm cha vẫn trắng tinh <code>-1</code>! Thế là công sức ghi nhớ bằng không và độ phức tạp nổ lại thành $O(2^N)$!</li>
                  <li><strong>Bẫy 2 &mdash; Tràn ngăn xếp lời gọi hàm (Call Stack ~8 MB, <code>MOD-01</code>):</strong> Dù đã truyền <code>&amp;</code> chuẩn chỉnh, hàm đệ quy vẫn phải xếp các khung nhớ lên <em>Call Stack</em> (thường giới hạn khoảng <code>8 MB</code> trên nhiều máy chấm). Khi $N = 10^5$ hoặc $10^6$, chuỗi gọi sâu <code>f(10^6) &rarr; f(999999) &rarr; ...</code> chất quá nhiều khung nhớ và gây <strong>Stack Overflow</strong>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Truyền Tham Chiếu <code>&amp;</code> Đúng Chuẩn Cho Leo Cầu Thang</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long MOD = 1000000007LL;

// BẮT BUỘC có dấu &amp; ở vector&lt;long long&gt;&amp; memo để dùng chung 1 bảng nhớ duy nhất!
// Lưu ý: chỉ nên dùng Top-Down khi độ sâu đệ quy nhỏ (&lt;= 10^4) để tránh tràn Call Stack ~8MB
long long climbMemo(int i, vector&lt;long long&gt;&amp; memo) {
    if (i &lt;= 1) return 1;
    if (memo[i] != -1) return memo[i];
    memo[i] = (climbMemo(i - 1, memo) + climbMemo(i - 2, memo)) % MOD;
    return memo[i];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 10;
    vector&lt;long long&gt; memo(n + 1, -1);
    cout &lt;&lt; "So cach leo " &lt;&lt; n &lt;&lt; " bac: " &lt;&lt; climbMemo(n, memo) &lt;&lt; '\\n'; // 89
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Truyền tham chiếu (<code>Pass by Reference &amp;</code>):</strong> Đưa địa chỉ trực tiếp của mảng <code>memo</code> vào hàm đệ quy thay vì sao chép bản mới, giữ thời gian truy cập $O(1)$ và cập nhật xuyên suốt mọi nhánh.</li>
                  <li><strong>Tràn ngăn xếp (<code>Stack Overflow</code>):</strong> Lỗi tràn vùng nhớ <code>Call Stack</code> (~8 MB ở <code>MOD-01</code>) khi đệ quy lồng nhau sâu cỡ $10^5 \\dots 10^6$ tầng &mdash; lý do chính khiến ta cần chuyển sang vòng lặp <strong>Bottom-Up</strong> ở Phần 2.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_memo_vs_naive',
            title: 'Phòng Thí Nghiệm 1A: Cây Đệ Quy Ngây Thơ vs Đệ Quy Có Nhớ (N = 25)',
            desc: 'Thử tắt mở sổ nháp memo[] cho bài toán đếm cách leo cầu thang N = 25 bậc để tận mắt thấy số lời gọi hàm sập từ 242,785 xuống còn đúng 49 lần!',
            toggles: [
              {
                key: 'mode',
                label: 'Chế độ ghi nhớ kết quả bài toán con',
                options: [
                  { value: 'memo', text: 'Bật Memoization (kiểm tra &amp; lưu memo[n]) — AC', kind: 'ok' },
                  { value: 'naive', text: 'Tắt Memoization (đệ quy ngây thơ O(2^N)) — Bẫy TLE!', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.mode === 'memo';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

long long solve(int n, vector<long long>& memo, long long& calls) {
    calls++;
    if (n <= 1) return 1;
    if (memo[n] != -1) return memo[n];
    memo[n] = solve(n - 1, memo, calls) + solve(n - 2, memo, calls);
    return memo[n];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 25;
    vector<long long> memo(n + 1, -1);
    long long calls = 0;
    long long ans = solve(n, memo, calls);
    cout << "ans=" << ans << " calls=" << calls << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

long long solve(int n, vector<long long>& memo, long long& calls) {
    calls++;
    if (n <= 1) return 1;
    // BỎ QUÊN kiểm tra & lưu memo[n] -> tính lại vô ích!
    return solve(n - 1, memo, calls) + solve(n - 2, memo, calls);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 25;
    vector<long long> memo(n + 1, -1);
    long long calls = 0;
    long long ans = solve(n, memo, calls);
    cout << "ans=" << ans << " calls=" << calls << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [7, 8, 9] : [7, 8],
                statusOk: isOk,
                statusText: isOk
                  ? 'SIÊU NHANH (AC): Nhờ memo[n], mỗi bậc từ 0..25 chỉ tính đúng 1 lần — tổng cộng chỉ tốn 49 lời gọi hàm!'
                  : 'BÙNG NỔ LỜI GỌI (TLE khi N lớn): Không có memo, cây đệ quy phải gọi hàm tới 242,785 lần chỉ cho N = 25!',
                predictions: [
                  { text: 'In ra ans=121393 calls=49 nhờ đọc sổ nháp memo[n] trong O(1)' },
                  { text: 'In ra ans=121393 calls=242785 do tính lặp lại hàng trăm nghìn bài toán con' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nans=121393 calls=49'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nans=121393 calls=242785',
                explain: isOk
                  ? 'Mỗi trạng thái n = 2..25 chỉ tính mới 1 lần rồi lưu vào memo[n]; 23 lần quay lại chỉ cần đọc ngay khi thấy memo[n] != -1, tổng số lời gọi là 2 * 25 - 1 = 49.'
                  : 'Khi bỏ kiểm tra memo[n], solve(3) bị gọi lại hàng chục nghìn lần; nếu tăng lên N = 45 thì số lời gọi vượt 2 tỷ và TLE chắc chắn.'
              };
            }
          },
          {
            id: 'sb_memo_ref_trap',
            title: 'Phòng Thí Nghiệm 1B: Bẫy Quên Dấu &amp; Khi Truyền Bảng memo[] (N = 10)',
            desc: 'So sánh <code>vector&lt;long long&gt;&amp; memo</code> (có dấu <code>&amp;</code>) với <code>vector&lt;long long&gt; memo</code> (thiếu dấu <code>&amp;</code>) để thấy vì sao thiếu đúng 1 ký tự <code>&amp;</code> lại phá hỏng hoàn toàn Memoization!',
            toggles: [
              {
                key: 'refMode',
                label: 'Cách truyền mảng memo vào hàm đệ quy',
                options: [
                  { value: 'by_ref', text: 'vector&lt;long long&gt;&amp; memo — Truyền tham chiếu (AC)', kind: 'ok' },
                  { value: 'by_val', text: 'vector&lt;long long&gt; memo — Quên dấu &amp; (Bẫy mất ghi nhớ!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.refMode === 'by_ref';
              const code = `#include <bits/stdc++.h>
using namespace std;

${isOk ? 'long long solve(int i, vector<long long>& memo, int& calls) {' : 'long long solve(int i, vector<long long> memo, int& calls) {'}
    calls++;
    if (i <= 1) return 1;
    if (memo[i] != -1) return memo[i];
    memo[i] = solve(i - 1, memo, calls) + solve(i - 2, memo, calls);
    return memo[i];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 10, calls = 0;
    vector<long long> memo(n + 1, -1);
    long long ans = solve(n, memo, calls);
    cout << "ans=" << ans << " calls=" << calls << " memo[10]=" << memo[10] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [4],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Dùng chung 1 mảng memo qua tham chiếu &amp;, calls = 19 và memo[10] = 89!'
                  : 'MẤT SẠCH SỔ NHÁP (TLE): Thiếu dấu &amp; làm mọi cập nhật memo[i] bị hủy khi thoát hàm con, calls vọt lên 177 và memo[10] vẫn là -1!',
                predictions: [
                  { text: 'In ra ans=89 calls=19 memo[10]=89' },
                  { text: 'In ra ans=89 calls=177 memo[10]=-1 vì mỗi hàm chỉ sửa trên bản sao' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nans=89 calls=19 memo[10]=89'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nans=89 calls=177 memo[10]=-1',
                explain: isOk
                  ? 'Dấu &amp; giúp mọi lời gọi hàm con ghi thẳng vào cùng một vector memo ở main(), nên các nhánh sau đọc được ngay kết quả đã lưu.'
                  : 'Không có dấu &amp;, mỗi lần gọi solve() lại sao chép cả vector memo ra vùng nhớ riêng; khi hàm con kết thúc, bản sao bị xóa sạch khiến hàm cha vẫn thấy -1!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int f(int i, vector<int>& memo, int& calls) {
    calls++;
    if (i <= 1) return 1;
    if (memo[i] != -1) return memo[i];
    memo[i] = f(i - 1, memo, calls) + f(i - 2, memo, calls);
    return memo[i];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 5, calls = 0;
    vector<int> memo(n + 1, -1);
    int ans = f(n, memo, calls);
    cout << ans << ' ' << calls << '\\n';
    return 0;
}`,
            q: 'Với <code>n = 5</code>, đoạn code Đệ quy có nhớ (Memoization) trên sẽ in ra <code>ans</code> và tổng số lời gọi <code>calls</code> bằng bao nhiêu?',
            options: [
              'In ra 8 15 vì nhánh i - 2 luôn phải tính lại từ đầu do chưa lưu vào memo',
              'In ra 5 9 vì giá trị cơ sở của f(0) và f(1) trả về 0 ở bước cuối cùng',
              'In ra 8 9 vì i = 2..5 chỉ tính 1 lần, đọc lại từ memo 2 lần và base case 3 lần',
              'In ra 13 11 vì hàm đệ quy chạy xuống tới i = 6 trước khi dừng'
            ],
            correct: 2,
            explain: 'Cây gọi f(5): nhánh đi xuống 5 &rarr; 4 &rarr; 3 &rarr; 2 (4 lần tính mới i = 2..5). Các lời gọi base case (i &lt;= 1) xảy ra 3 lần: f(1) ở f(2), f(0) ở f(2), và f(1) ở f(3). Sau đó có đúng 2 lần đọc lại từ memo (f(2) ở f(4) và f(3) ở f(5)). Tổng: ans = 8, calls = 4 + 3 + 2 = 9.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

long long solve(int s, const vector<int>& coins, vector<long long>& memo) {
    if (s == 0) return 0;
    if (memo[s] != -1) return memo[s];
    long long best = INF;
    for (int c : coins) {
        if (s >= c) {
            long long sub = solve(s - c, coins, memo);
            if (sub != INF) best = min(best, sub + 1);
        }
    }
    return memo[s] = best;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> coins = {1, 3, 4};
    vector<long long> memo(7, -1);
    long long ans = solve(6, coins, memo);
    cout << ans << ' ' << memo[3] << ' ' << memo[5] << '\\n';
    return 0;
}`,
            q: 'Khi chạy <code>solve(6)</code> với tập xu <code>{1, 3, 4}</code>, ba giá trị <code>ans</code>, <code>memo[3]</code> và <code>memo[5]</code> in ra lần lượt là gì?',
            options: [
              'In ra 3 1 2 vì solve(6) ưu tiên lấy đồng 4 rồi thêm hai đồng 1',
              'In ra 2 1 2 vì cần 2 xu cho S=6 (3+3), 1 xu cho S=3 (3), 2 xu cho S=5 (4+1)',
              'In ra 2 1 3 vì memo[5] chỉ thử lấy 5 đồng xu mệnh giá 1',
              'In ra 2 2 2 vì để đổi được tổng 3 phải dùng 1 + 1 + 1 nếu thiếu bước cơ sở'
            ],
            correct: 1,
            explain: 'Trong lúc tính solve(6), đệ quy lần lượt ghi memo[1]=1, memo[2]=2, memo[3]=1 (chọn 3), memo[4]=1 (chọn 4), memo[5]=min(memo[4]+1, memo[2]+1, memo[1]+1)=2, và memo[6]=min(memo[5]+1, memo[3]+1, memo[2]+1)=2. Kết quả in ra: 2 1 2.'
          },
          {
            type: 'single',
            q: 'Tại sao nếu bạn quên dấu <code>&amp;</code> ở tham số <code>vector&lt;long long&gt; memo</code> trong hàm Đệ quy có nhớ thì thuật toán lại chạy chậm như vét cạn hoặc bị TLE?',
            options: [
              'Mỗi lời gọi đệ quy phải sao chép cả mảng memo ra bản riêng khiến các ghi chú mới biến mất khi thoát hàm',
              'Trình biên dịch C++14 tự động đổi vector không có dấu &amp; thành danh sách liên kết truy cập mất O(N)',
              'Giá trị -1 trong bản sao vector bị trình biên dịch đặt lại thành 0 ngay khi bước vào vòng lặp for',
              'Bộ nhớ Call Stack lập tức nhân kích thước mỗi khung lên gấp 1000 lần và làm tràn bộ nhớ chính'
            ],
            correct: 0,
            explain: 'Truyền tham trị (thiếu &amp;) khiến C++ copy toàn bộ vector memo ở MỖI lời gọi hàm. Hàm con sửa trên bản sao rồi hủy bản sao khi return, nên hàm cha không bao giờ nhận được giá trị đã nhớ &rarr; vừa tốn O(N) công copy, vừa tính lại cây đệ quy O(2^N)!'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về Đệ quy có nhớ (Top-Down Memoization) và giới hạn của nó?',
            options: [
              'Điều kiện để dùng Memoization hiệu quả là bài toán có các bài toán con gối nhau lặp lại nhiều lần',
              'Nếu một trạng thái có thể cho kết quả vô nghiệm, giá trị chưa tính (ví dụ -1) phải khác với giá trị vô nghiệm (ví dụ INF)',
              'Với độ sâu đệ quy N = 10^5..10^6, Top-Down dễ chạm giới hạn Call Stack (~8 MB) gây Stack Overflow trên máy chấm',
              'Đệ quy có nhớ luôn nhanh hơn Bottom-Up Tabulation và không bao giờ tốn bộ nhớ Call Stack phụ trợ'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều đúng. D sai hoàn toàn: Top-Down tốn thêm chi phí gọi hàm và khung bộ nhớ trên Call Stack (~8 MB) cho từng tầng đệ quy, nên khi N lớn cỡ 10^5..10^6 ta ưu tiên viết Bottom-Up bằng vòng lặp.'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: KHUNG 4 BƯỚC DP & LẬP BẢNG 1D (BOTTOM-UP: PULL DP VS PUSH DP)
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Khung 4 Bước &amp; DP 1D',
        title: 'Vấn Đề Nhỏ 2: Khung 4 Bước Quy Hoạch Động &amp; Lập Bảng 1D (Pull DP vs Push DP)',
        lead: 'Làm sao vứt bỏ hoàn toàn đệ quy để không bao giờ sợ tràn Call Stack khi $N = 10^6$, đồng thời có một công thức tư duy chuẩn chỉnh giải mượt cả <strong>Frog 1/2</strong>, <strong>Đổi tiền Min</strong> lẫn <strong>Chọn không kề nhau</strong>?',
        subproblem: {
          title: 'Xây dựng quy trình 4 bước cố định cho mọi bài DP 1D bằng vòng lặp <code>for</code> (Bottom-Up Tabulation) và tránh bẫy tràn số khi khởi tạo vô cực <code>INF</code>.',
          desc: 'Thay vì đứng trên đỉnh $N$ gọi ngược xuống đáy, ta dựng mảng <code>dp[0..N]</code> từ nhỏ lên lớn bằng vòng lặp <code>for</code>. Mỗi bước chuyển trạng thái đều có thể viết theo một trong hai hướng tương đương: <strong>Pull DP</strong> (kéo từ quá khứ về <code>i</code>) hoặc <strong>Push DP</strong> (từ <code>i</code> đẩy sang tương lai <code>i + step</code>).'
        },
        cards: [
          {
            heading: 'Khung 4 Bước Quy Hoạch Động &amp; Pull DP (Frog 1, Đổi Tiền Min)',
            tag: 'Khung 4 Bước &bull; Pull DP',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tưởng tượng bạn xây một cầu thang đá từ bậc $1$ đi lên bậc $N$. Nếu đã biết chi phí nhỏ nhất để đứng ở bậc $1, 2, \\dots, i-1$, bạn đứng ở bậc $i$ và tính ngay chi phí tới $i$ bằng <strong>Khung 4 Bước Bất Biến</strong>:</p>
                <ol style="margin: 8px 0 0 20px;">
                  <li><strong>Định nghĩa trạng thái <code>dp[i]</code>:</strong> Phát biểu chính xác 1 câu: ví dụ <code>dp[i]</code> là <em>tổng sức lực ít nhất để con ếch nhảy từ đá $1$ tới đá $i$</em> (hoặc <em>số xu ít nhất đổi tổng $i$</em>).</li>
                  <li><strong>Khởi tạo cơ sở &amp; Vô cực an toàn <code>INF</code>:</strong> Đặt <code>dp[1] = 0</code> (đã đứng sẵn ở đá $1$), các ô còn lại đặt <code>INF = 1000000000000000000LL</code> (<code>1e18</code>). <strong>Cấm dùng <code>LLONG_MAX</code>!</strong> Vì nếu ô <code>dp[i - c]</code> đang giữ <code>LLONG_MAX</code> mà lỡ cộng thêm <code>1</code>, số tràn vòng thành số âm khổng lồ và đánh bại mọi kết quả đúng trong hàm <code>min()</code>!</li>
                  <li><strong>Công thức truy hồi (Pull DP &mdash; Kéo từ quá khứ):</strong> Ở bậc $i$, hỏi <em>"có thể nhảy tới tôi từ đâu?"</em>:
                    <code>dp[i] = min(dp[i - 1] + |h[i] - h[i - 1]|, dp[i - 2] + |h[i] - h[i - 2]|)</code>. Với Đổi tiền <code>{1, 3, 4}</code>, tính lần lượt <code>dp[0..6]</code> ra <code>0, 1, 2, 1, 1, 2, 2</code> &rarr; <code>dp[6] = 2</code> (xu <code>3 + 3</code>)!</li>
                  <li><strong>Đáp án &amp; Độ phức tạp:</strong> Kết quả nằm ở <code>dp[N]</code> (kiểm tra <code>dp[S] == INF</code> để in <code>-1</code> nếu vô nghiệm). Thời gian $O(N \\cdot K)$, RAM $O(N)$, chạy mượt ở $N = 10^6$!</li>
                </ol>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Pull DP Chuẩn Cho Frog 1 &amp; Đổi Tiền Min</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long INF = 1000000000000000000LL; // 1e18 (KHÔNG dùng LLONG_MAX)

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Frog 1 (Pull DP): dãy độ cao 1-based {10, 25, 45, 20}
    int n = 4;
    vector&lt;long long&gt; h = {0, 10, 25, 45, 20};
    vector&lt;long long&gt; dp(n + 1, INF);
    dp[1] = 0;
    for (int i = 2; i &lt;= n; i++) {
        dp[i] = min(dp[i], dp[i - 1] + abs(h[i] - h[i - 1]));
        if (i &gt;= 3) {
            dp[i] = min(dp[i], dp[i - 2] + abs(h[i] - h[i - 2]));
        }
    }
    cout &lt;&lt; "Frog 1 min cost = " &lt;&lt; dp[n] &lt;&lt; '\\n'; // 20

    // 2. Đổi tiền Min {1, 3, 4}, S = 6 (kiểm tra != INF trước khi + 1)
    int S = 6;
    vector&lt;int&gt; coins = {1, 3, 4};
    vector&lt;long long&gt; dpCoin(S + 1, INF);
    dpCoin[0] = 0;
    for (int s = 1; s &lt;= S; s++) {
        for (int c : coins) {
            if (s &gt;= c &amp;&amp; dpCoin[s - c] != INF) {
                dpCoin[s] = min(dpCoin[s], dpCoin[s - c] + 1);
            }
        }
    }
    cout &lt;&lt; "Doi tien S=6 = " &lt;&lt; (dpCoin[S] == INF ? -1 : dpCoin[S]) &lt;&lt; '\\n'; // 2
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Lập bảng (<code>Bottom-Up Tabulation</code>):</strong> Giải tuần tự từ bài toán nhỏ nhất (<code>dp[0]</code>, <code>dp[1]</code>) lên <code>dp[N]</code> bằng vòng lặp <code>for</code>, triệt tiêu hoàn toàn nguy cơ tràn Call Stack.</li>
                  <li><strong><code>Pull DP</code> (Kéo trạng thái):</strong> Khi đang tính ô <code>i</code>, nhìn ngược lại các ô đã tính xong phía trước (<code>i - 1</code>, <code>i - 2</code>, <code>s - c</code>) để kéo đáp án tốt nhất về <code>dp[i]</code>.</li>
                  <li><strong>Vô cực an toàn (<code>Safe INF</code>):</strong> Dùng <code>1e18</code> (cho <code>long long</code>) hoặc <code>1e9</code> (cho <code>int</code>) thay cho <code>LLONG_MAX</code>/<code>INT_MAX</code>, kết hợp điều kiện <code>!= INF</code> để chống tràn số và chống lệch mốc <code>INF + 1</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Push DP (Đẩy Tới Tương Lai) &amp; Mẫu Chọn Không Kề Nhau (House Robber)',
            tag: 'Push DP &bull; Không Kề Nhau',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Ngoài cách đứng tại đích <code>i</code> nhìn lại (<em>Pull DP</em>), bạn hoàn toàn có thể đảo góc nhìn sang <strong>Push DP</strong> và xử lý thêm bài toán kinh điển <strong>Chọn không kề nhau</strong>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Push DP (Đứng ở <code>i</code> đẩy tới <code>i + step</code>):</strong> Khi đứng tại hòn đá <code>i</code> đã biết chi phí tối ưu <code>dp[i]</code>, bạn thử nhảy tới mọi hòn đá phía trước <code>i + 1, i + 2, ..., i + K</code> (như <strong>Frog 2</strong>). Có 2 chốt chặn sống còn: (1) nếu <code>dp[i] == INF</code> (ô <code>i</code> chưa tới được) thì <code>continue;</code> ngay; (2) luôn kiểm tra <code>if (i + step &lt;= n)</code> để không vọt ra ngoài mảng!</li>
                  <li><strong>Mẫu Chọn không kề nhau (<code>House Robber</code> / <code>CF-455A Boredom</code>):</strong> Có $N$ ngôi nhà chứa số tiền $a_1, a_2, \\dots, a_N$ (lưu <code>long long</code>). Bạn muốn lấy tổng tiền lớn nhất nhưng <strong>không được chọn 2 nhà đứng sát nhau</strong>. Đứng ở nhà <code>i</code>, chỉ có 2 quyết định:
                    <em>Bỏ nhà <code>i</code></em> (giữ kỷ lục tới <code>i - 1</code> là <code>dp[i - 1]</code>) hoặc <em>Chọn nhà <code>i</code></em> (bắt buộc bỏ <code>i - 1</code>, lấy <code>dp[i - 2] + a[i]</code>) &rarr; <code>dp[i] = max(dp[i - 1], dp[i - 2] + a[i])</code>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Push DP (Frog 2) &amp; Chọn Không Kề Nhau</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Push DP cho Frog 2 với K = 3 trên {10, 25, 45, 20}
    int n = 4, K = 3;
    vector&lt;long long&gt; h = {0, 10, 25, 45, 20};
    vector&lt;long long&gt; dp(n + 1, INF);
    dp[1] = 0;
    for (int i = 1; i &lt;= n; i++) {
        if (dp[i] == INF) continue; // Không đẩy từ ô chưa từng đặt chân tới
        for (int step = 1; step &lt;= K; step++) {
            if (i + step &lt;= n) {
                dp[i + step] = min(dp[i + step], dp[i] + abs(h[i + step] - h[i]));
            }
        }
    }
    cout &lt;&lt; "Frog 2 Push DP (K=3): " &lt;&lt; dp[n] &lt;&lt; '\\n'; // 10 (nhảy 1 -&gt; 4)

    // 2. Chọn phần tử không kề nhau (House Robber) trên {3, 10, 3, 1, 2}
    int m = 5;
    vector&lt;long long&gt; a = {0, 3, 10, 3, 1, 2};
    vector&lt;long long&gt; best(m + 1, 0);
    best[1] = max(0LL, a[1]);
    for (int i = 2; i &lt;= m; i++) {
        best[i] = max(best[i - 1], best[i - 2] + a[i]);
    }
    cout &lt;&lt; "Khong ke nhau max: " &lt;&lt; best[m] &lt;&lt; '\\n'; // 12 (10 + 2)
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>Push DP</code> (Đẩy trạng thái):</strong> Khi đứng ở trạng thái <code>i</code> đã tính xong, đẩy giá trị sang các trạng thái kế tiếp <code>i + step</code>. Rất tự nhiên khi bài toán mô tả "từ bước hiện tại có thể nhảy đi đâu" (như <code>Frog 2</code> hay <code>VSTEPS</code>).</li>
                  <li><strong>Chọn không kề nhau (<code>Non-Adjacent Max Sum</code>):</strong> Mẫu DP 1D quy về đúng 2 quyết định: <em>bỏ <code>i</code></em> (<code>dp[i - 1]</code>) hoặc <em>lấy <code>i</code></em> (<code>dp[i - 2] + a[i]</code>).</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_inf_overflow',
            title: 'Phòng Thí Nghiệm 2A: Vô Cực An Toàn 1e18 vs Bẫy Tràn Số LLONG_MAX (S = 5, Xu {2, 4})',
            desc: 'Thử đổi vô cực INF từ 1000000000000000000LL (1e18) sang LLONG_MAX trong bài Đổi tiền {2, 4} với tổng S = 5 để tận mắt thấy phép cộng dp[s - c] + 1 bị tràn số thành số âm -9223372036854775808 như thế nào!',
            toggles: [
              {
                key: 'guard',
                label: 'Cách đặt giá trị vô cực INF &amp; chốt kiểm tra',
                options: [
                  { value: 'safe', text: 'INF = 1000000000000000000LL &amp;&amp; dp[s - c] != INF (AC)', kind: 'ok' },
                  { value: 'unsafe', text: 'INF = LLONG_MAX và bỏ kiểm tra != INF (Bẫy tràn số âm!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.guard === 'safe';
              const code = `#include <bits/stdc++.h>
using namespace std;

${isOk ? 'const long long INF = 1000000000000000000LL;' : 'const long long INF = LLONG_MAX;'}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int S = 5;
    vector<int> coins = {2, 4};
    vector<long long> dp(S + 1, INF);
    dp[0] = 0;
    for (int s = 1; s <= S; s++) {
        for (int c : coins) {
${isOk ? '            if (s >= c && dp[s - c] != INF) {' : '            if (s >= c) {'}
                dp[s] = min(dp[s], dp[s - c] + 1);
            }
        }
    }
    if (dp[S] == INF) cout << -1 << '\\n';
    else cout << dp[S] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [4, 15],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Giữ nguyên dp[5] = INF khi không đổi được, nên điều kiện dp[S] == INF in đúng -1!'
                  : 'TRÀN SỐ ÂM DO LLONG_MAX (WA): dp[1] = LLONG_MAX cộng 1 tràn vòng thành -9223372036854775808 và thắng cả hàm min()!',
                predictions: [
                  { text: 'Phát hiện không đổi được tổng S=5 và in ra -1' },
                  { text: 'Phép cộng LLONG_MAX + 1 tràn số thành -9223372036854775808' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n-1'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n-9223372036854775808',
                explain: isOk
                  ? 'Dùng INF = 1e18 (kết hợp chặn dp[s - c] != INF) giữ an toàn tuyệt đối: các ô vô nghiệm không bao giờ tràn số hay bị cộng lệch khỏi INF.'
                  : 'LLONG_MAX là giá trị dương lớn nhất của kiểu long long (9223372036854775807). Khi cộng thêm 1 lúc s = 3, nó tràn vòng sang -9223372036854775808 (số âm nhỏ nhất), đánh bại mọi phương án trong min()!'
              };
            }
          },
          {
            id: 'sb_pull_vs_push',
            title: 'Phòng Thí Nghiệm 2B: Pull DP (Nhìn Lùi) vs Push DP (Đẩy Tới) Trên Frog 1',
            desc: 'Cùng bài toán Frog 1 trên dãy độ cao {10, 25, 45, 20}, hãy chuyển đổi qua lại giữa Pull DP và Push DP để kiểm chứng cả hai hướng đều cho cùng một bảng dp[] và đáp án 20!',
            toggles: [
              {
                key: 'direction',
                label: 'Hướng viết công thức truy hồi 1D',
                options: [
                  { value: 'pull', text: 'Pull DP: Đứng tại i kéo từ i - 1 và i - 2 (AC)', kind: 'ok' },
                  { value: 'push', text: 'Push DP: Đứng tại i đẩy ra i + 1 và i + 2 (AC)', kind: 'ok' }
                ]
              }
            ],
            build(state) {
              const isPull = state.direction === 'pull';
              const code = isPull
                ? `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 4;
    vector<long long> h = {0, 10, 25, 45, 20};
    vector<long long> dp(n + 1, INF);
    dp[1] = 0;
    for (int i = 2; i <= n; i++) {
        dp[i] = min(dp[i], dp[i - 1] + abs(h[i] - h[i - 1]));
        if (i >= 3) dp[i] = min(dp[i], dp[i - 2] + abs(h[i] - h[i - 2]));
    }
    cout << "dp[n]=" << dp[n] << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 4;
    vector<long long> h = {0, 10, 25, 45, 20};
    vector<long long> dp(n + 1, INF);
    dp[1] = 0;
    for (int i = 1; i <= n; i++) {
        if (dp[i] == INF) continue;
        if (i + 1 <= n) dp[i + 1] = min(dp[i + 1], dp[i] + abs(h[i + 1] - h[i]));
        if (i + 2 <= n) dp[i + 2] = min(dp[i + 2], dp[i] + abs(h[i + 2] - h[i]));
    }
    cout << "dp[n]=" << dp[n] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isPull ? [13, 14, 15, 16] : [13, 14, 15, 16, 17],
                statusOk: true,
                statusText: isPull
                  ? 'CHÍNH XÁC (AC — Pull DP): Tính xong từng ô i từ trái sang phải, đáp án dp[4] = 20!'
                  : 'CHÍNH XÁC (AC — Push DP): Đẩy chi phí từ mỗi ô i sang i + 1, i + 2 có bảo vệ biên &lt;= n, đáp án vẫn đúng dp[4] = 20!',
                predictions: [
                  { text: 'Chương trình in ra dp[n]=20 (đường nhảy tối ưu 1 &rarr; 2 &rarr; 4 tốn 15 + 5)' },
                  { text: 'Pull DP và Push DP cho ra hai kết quả khác nhau vì đổi chiều cập nhật' }
                ],
                console: '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[n]=20',
                explain: isPull
                  ? 'Ở Pull DP, khi vòng lặp đứng tại i thì dp[i - 1] và dp[i - 2] đã hoàn tất nên kéo về dp[i] rất gọn.'
                  : 'Ở Push DP, khi i tăng từ 1..n, trước khi rời khỏi ô i thì mọi đường nhảy tới i đều đã được xét xong, nên dp[i] chắc chắn tối ưu để đẩy tiếp ra i + 1 và i + 2!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int S = 7;
    vector<int> coins = {1, 3, 5};
    vector<long long> dp(S + 1, INF);
    dp[0] = 0;
    for (int s = 1; s <= S; s++) {
        for (int c : coins) {
            if (s >= c && dp[s - c] != INF) {
                dp[s] = min(dp[s], dp[s - c] + 1);
            }
        }
    }
    cout << dp[4] << ' ' << dp[6] << ' ' << dp[7] << '\\n';
    return 0;
}`,
            q: 'Cho tập xu <code>{1, 3, 5}</code> và chạy bảng DP Đổi tiền tới <code>S = 7</code>. Ba giá trị <code>dp[4]</code>, <code>dp[6]</code> và <code>dp[7]</code> in ra là gì?',
            options: [
              'In ra 4 2 3 vì tổng 4 chọn bốn đồng 1 + 1 + 1 + 1 thay vì ghép hai đồng 3 + 1',
              'In ra 2 4 3 vì tổng 6 chọn 3 + 1 + 1 + 1 (4 xu) thay vì ghép 5 + 1 hay 3 + 3',
              'In ra 2 2 5 vì tổng 7 chọn năm đồng 1 + 1 + 1 + 1 + 3 thay vì lấy xu mệnh giá 5',
              'In ra 2 2 3 vì dp[4]=2 (3+1), dp[6]=2 (3+3 hoặc 5+1), dp[7]=3 (5+1+1 là 3 xu)'
            ],
            correct: 3,
            explain: 'Lần lượt tính: dp[0]=0, dp[1]=1 (1), dp[2]=2 (1+1), dp[3]=1 (3), dp[4]=min(dp[3]+1, dp[1]+1)=2, dp[5]=1 (5), dp[6]=min(dp[5]+1, dp[3]+1, dp[1]+1)=2, dp[7]=min(dp[6]+1, dp[4]+1, dp[2]+1)=3. Vậy in ra: 2 2 3.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 5;
    vector<long long> a = {0, 3, 10, 3, 1, 2};
    vector<long long> dp(n + 1, 0);
    dp[1] = max(0LL, a[1]);
    for (int i = 2; i <= n; i++) {
        dp[i] = max(dp[i - 1], dp[i - 2] + a[i]);
    }
    cout << dp[3] << ' ' << dp[4] << ' ' << dp[5] << '\\n';
    return 0;
}`,
            q: 'Đoạn code Chọn không kề nhau (House Robber) trên mảng 1-based <code>a = {3, 10, 3, 1, 2}</code> in ra <code>dp[3]</code>, <code>dp[4]</code> và <code>dp[5]</code> là gì?',
            options: [
              'In ra 6 11 12 vì tại i = 3 chọn 3 + 3 thay vì giữ 10',
              'In ra 10 10 12 vì bỏ i = 3 để giữ 10, sau đó lấy thêm 2 ở i = 5',
              'In ra 10 11 12 vì dp[3]=10 (giữ a[2]), dp[4]=11 (10+1), dp[5]=12 (10+2)',
              'In ra 10 11 13 vì ở i = 5 lấy được cả 10 + 1 + 2 cùng một lúc'
            ],
            correct: 2,
            explain: 'Ta có dp[0]=0, dp[1]=3, dp[2]=max(3, 0+10)=10, dp[3]=max(10, 3+3)=10, dp[4]=max(10, 10+1)=11 (chọn nhà 2 và 4), dp[5]=max(11, 10+2)=12 (chọn nhà 2 và 5). In ra: 10 11 12.'
          },
          {
            type: 'single',
            q: 'Vì sao trong Khung 4 Bước DP ta nên đặt vô cực <code>INF = 1000000000000000000LL</code> (<code>1e18</code>) thay vì dùng hằng số cực đại <code>LLONG_MAX</code> cho bài tìm chi phí nhỏ nhất?',
            options: [
              'Hằng số 1e18 dùng ít bộ nhớ RAM hơn một nửa so với biến kiểu LLONG_MAX',
              'Nếu ô vô nghiệm mang LLONG_MAX bị cộng thêm chi phí sẽ tràn thành số âm và thắng hàm min()',
              'Hàm min() chuẩn trong thư viện algorithm của C++14 không chấp nhận so sánh kiểu LLONG_MAX',
              'Giá trị LLONG_MAX tự động bị trình chấm ép về 0 nếu mảng vector khởi tạo toàn bộ phần tử'
            ],
            correct: 1,
            explain: 'Nếu dp[prev] == LLONG_MAX và ta lỡ viết dp[prev] + cost, phép cộng tràn giới hạn kiểu long long có dấu, quay vòng thành số âm (-9.22e18) khiến min() chọn nhầm đáp án sai bét! Đặt INF = 1e18 (kết hợp != INF) giữ an toàn tuyệt đối khi cộng thêm chi phí.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về Bottom-Up DP 1D (Pull DP và Push DP)?',
            options: [
              'Bottom-Up dùng vòng lặp for tính từ trạng thái cơ sở đi lên nên không bị tràn Call Stack như đệ quy sâu 10^6 tầng',
              'Push DP luôn có độ phức tạp thời gian thấp hơn Pull DP một thừa số O(log N) trên cùng một bài toán',
              'Cả Pull DP và Push DP đều cho cùng kết quả tối ưu nếu thứ tự vòng lặp đảm bảo mỗi trạng thái được hoàn tất trước khi dùng',
              'Trong Push DP từ i đẩy sang i + step, luôn phải kiểm tra biên i + step &lt;= n để không truy cập ngoài mảng'
            ],
            correct: [0, 2, 3],
            explain: 'A, C và D đều đúng. B sai: Pull DP và Push DP xét đúng cùng số lượng trạng thái và chuyển trạng thái nên độ phức tạp thời gian hoàn toàn như nhau (cùng O(N * K)).'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: TRUY VẾT NGHIỆM (TRACE[] / LẦN NGƯỢC TỪ ĐÍCH)
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Truy Vết Nghiệm DP',
        title: 'Vấn Đề Nhỏ 3: Truy Vết Nghiệm (<code>trace[]</code> / Lần Ngược Từ Đích) Để In Đường Đi Hoặc Tập Chọn',
        lead: 'Mảng <code>dp[n]</code> mới chỉ cho ta một con số duy nhất như chi phí <code>20</code> hay <code>2</code> đồng xu. Nếu đề bài hỏi tiếp: <em>"Con ếch đã nhảy qua những hòn đá nào?"</em> hay <em>"Đã chọn những đồng xu mệnh giá nào?"</em>, ta khôi phục lại lộ trình tối ưu ra sao?',
        subproblem: {
          title: 'Làm sao ghi lại đúng lựa chọn đã tạo ra kỷ lục tại mỗi trạng thái <code>dp[i]</code> và khôi phục trọn vẹn dãy kết quả mà không dính vòng lặp vô tận hay in ngược thứ tự?',
          desc: 'Ta dựng thêm một mảng song song <code>trace[]</code> (khởi tạo toàn bộ bằng giá trị dừng <code>-1</code>). Mỗi khi <code>dp[i]</code> tìm được bước chuyển tốt hơn thực sự, ta ghi chú lại cha của nó vào <code>trace[i]</code>, cuối cùng đi giật lùi từ đích về đầu rồi <code>reverse()</code>!'
        },
        cards: [
          {
            heading: 'Lưu Mảng Vết <code>trace[]</code> Trong Lúc DP &amp; Lần Ngược Từ Đích',
            tag: 'trace[] &bull; reverse()',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy hình dung bạn leo qua một dòng suối gồm $N$ hòn đá. Mỗi khi có ai nhảy tới hòn đá <code>next</code> từ hòn đá <code>prev</code> với tổng sức lực <strong>ít hơn kỷ lục đang ghi trên đá <code>next</code></strong>, bạn lấy phấn viết ngay một mũi tên dưới chân đá <code>next</code>: <em>"Tôi vừa nhảy tới đây từ đá <code>prev</code>"</em>.</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Tại hòn đá xuất phát (<code>1</code>):</strong> Không nhảy từ đâu tới cả &rarr; biển chỉ đường ghi <code>trace[1] = -1</code> (chốt dừng!).</li>
                  <li><strong>Tại đích <code>N</code> (ví dụ <code>N = 4</code>):</strong> Ta nhìn biển chỉ đường dưới chân: đứng ở <code>4</code>, <code>trace[4] = 2</code>, lùi về <code>2</code> thấy <code>trace[2] = 1</code>, lùi về <code>1</code> gặp <code>trace[1] = -1</code> thì dừng!</li>
                  <li><strong>Đảo ngược lại:</strong> Vì ta đi giật lùi nên danh sách nhặt được đang là <code>4, 2, 1</code>. Chỉ cần gọi <code>reverse(path.begin(), path.end())</code> là ra chuẩn xác đường đi xuôi <code>1 &rarr; 2 &rarr; 4</code>!</li>
                  <li><strong>Với Đổi tiền Min:</strong> Thay vì lưu chỉ số đá trước, ta lưu ngay mệnh giá đồng xu vừa chọn vào <code>choice[s] = c</code>. Lúc truy vết từ <code>cur = S</code>, mỗi bước nhặt <code>choice[cur]</code> rồi trừ đi: <code>cur -= choice[cur]</code> cho tới khi <code>cur == 0</code>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Truy Vết Frog 1 &amp; Đổi Tiền Min {1, 3, 4}</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Truy vết đường đi Frog 1 trên dãy độ cao {10, 25, 45, 20}
    int n = 4;
    vector&lt;long long&gt; h = {0, 10, 25, 45, 20};
    vector&lt;long long&gt; dp(n + 1, INF);
    vector&lt;int&gt; trace(n + 1, -1); // Chốt dừng -1
    dp[1] = 0;

    for (int i = 2; i &lt;= n; i++) {
        long long c1 = dp[i - 1] + abs(h[i] - h[i - 1]);
        if (c1 &lt; dp[i]) {
            dp[i] = c1;
            trace[i] = i - 1;
        }
        if (i &gt;= 3) {
            long long c2 = dp[i - 2] + abs(h[i] - h[i - 2]);
            if (c2 &lt; dp[i]) {
                dp[i] = c2;
                trace[i] = i - 2;
            }
        }
    }

    vector&lt;int&gt; path;
    for (int cur = n; cur != -1; cur = trace[cur]) {
        path.push_back(cur);
    }
    reverse(path.begin(), path.end());

    cout &lt;&lt; "Cost = " &lt;&lt; dp[n] &lt;&lt; " | Path:";
    for (int x : path) cout &lt;&lt; ' ' &lt;&lt; x;
    cout &lt;&lt; '\\n'; // Cost = 20 | Path: 1 2 4
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Mảng truy vết (<code>Trace / Parent Array</code>):</strong> Mảng 1D song song với <code>dp[]</code> để lưu nguồn gốc (chỉ số cha hoặc hành động đã chọn) tạo ra giá trị tối ưu tại mỗi trạng thái.</li>
                  <li><strong>Lần ngược từ đích (<code>Backward Reconstruction</code>):</strong> Vòng lặp <code>while (cur != -1)</code> thu thập đường đi từ trạng thái cuối về trạng thái đầu rồi gọi <code>reverse()</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: '3 Bẫy Truy Vết (Sentinel Loop, Ghi Ngoài Nhánh if) &amp; Truy Vết Không Cần Mảng Phụ',
            tag: 'Bẫy Truy Vết &bull; Tiết Kiệm RAM',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Đã tính đúng 100% giá trị <code>dp[N]</code> rồi mà vẫn bị WA hoặc TLE ở bước truy vết thường rơi vào đúng <strong>3 cái bẫy</strong> sau:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bẫy 1 &mdash; Ghi <code>trace[i]</code> bên ngoài nhánh <code>if (cand &lt; dp[i])</code>:</strong> Nếu bạn cập nhật <code>trace[i]</code> một cách mù quáng ngay cả khi phương án mới <em>tệ hơn</em> kỷ lục cũ, bảng <code>trace[]</code> sẽ chỉ vào đồng xu sai hoặc đá sai khiến số bước truy vết không khớp với <code>dp[N]</code>!</li>
                  <li><strong>Bẫy 2 &mdash; Vòng lặp vô tận (<code>Sentinel Loop</code>) &amp; Đẩy nhầm <code>trace[cur]</code>:</strong> Nếu quên gán chốt dừng <code>trace[start] = -1</code> (lại để mặc định <code>0</code> trên mảng 0-based) rồi viết <code>while (cur != -1)</code>, vòng lặp sẽ đứng kẹt mãi tại <code>cur = 0</code>! Ngoài ra, nhiều bạn hay viết nhầm <code>path.push_back(trace[cur])</code> thay vì <code>path.push_back(cur)</code> làm rơi mất đích <code>N</code> và dính <code>-1</code> vào kết quả!</li>
                  <li><strong>Bẫy 3 &mdash; Truy vết không cần mảng <code>trace[]</code> (<code>On-the-fly</code>):</strong> Với các bài có bộ nhớ RAM eo hẹp như Chọn không kề nhau (<code>House Robber</code>), từ đích <code>i = n</code> ta kiểm tra lại chính công thức truy hồi trên bảng <code>dp[]</code>: nếu <code>dp[i] == dp[i - 1]</code> thì bỏ nhà <code>i</code> (<code>i--</code>); ngược lại đã chọn nhà <code>i</code> (<code>push_back(i); i -= 2;</code>)!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Truy Vết Đổi Tiền Với choice[] &amp; Bảo Vệ Sentinel</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int S = 6;
    vector&lt;int&gt; coins = {1, 3, 4};
    vector&lt;long long&gt; dp(S + 1, INF);
    vector&lt;int&gt; choice(S + 1, -1); // -1: chưa có đồng xu nào được chọn
    dp[0] = 0;

    for (int s = 1; s &lt;= S; s++) {
        for (int c : coins) {
            if (s &gt;= c &amp;&amp; dp[s - c] != INF &amp;&amp; dp[s - c] + 1 &lt; dp[s]) {
                dp[s] = dp[s - c] + 1;
                choice[s] = c; // CHỈ ghi khi thực sự cải thiện được dp[s]!
            }
        }
    }

    if (dp[S] == INF) {
        cout &lt;&lt; -1 &lt;&lt; '\\n';
        return 0;
    }

    vector&lt;int&gt; used;
    int cur = S;
    while (cur &gt; 0 &amp;&amp; choice[cur] != -1) { // Chặn kép chống vòng lặp vô tận
        used.push_back(choice[cur]);
        cur -= choice[cur];
    }
    reverse(used.begin(), used.end());

    cout &lt;&lt; "So xu: " &lt;&lt; dp[S] &lt;&lt; " | Cac xu:";
    for (int c : used) cout &lt;&lt; ' ' &lt;&lt; c;
    cout &lt;&lt; '\\n'; // So xu: 2 | Cac xu: 3 3
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Chốt chặn dừng (<code>Sentinel -1</code>):</strong> Giá trị không phải chỉ số hợp lệ đặt ở ô xuất phát để vòng lặp truy vết biết chính xác lúc nào dừng lại.</li>
                  <li><strong>Truy vết trực tiếp trên <code>dp[]</code> (<code>On-the-fly Reconstruction</code>):</strong> Kiểm tra ngược điều kiện nào đã tạo ra <code>dp[i]</code> ngay sau khi lập bảng xong để không tốn thêm mảng <code>trace[]</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_trace_sync',
            title: 'Phòng Thí Nghiệm 3A: Ghi choice[s] Bên Trong vs Bên Ngoài Nhánh if (S = 6, Xu {1, 3, 4})',
            desc: 'Thử kéo dòng <code>choice[s] = c</code> ra ngoài điều kiện tối ưu <code>dp[s - c] + 1 &lt; dp[s]</code> để xem ngay thảm họa: <code>dp[6]</code> báo 2 đồng xu nhưng danh sách truy vết lại in ra tới 3 đồng xu!',
            toggles: [
              {
                key: 'syncMode',
                label: 'Vị trí cập nhật mảng choice[s]',
                options: [
                  { value: 'inside', text: 'Ghi choice[s] = c bên trong if (dp[s - c] + 1 &lt; dp[s]) (AC)', kind: 'ok' },
                  { value: 'outside', text: 'Ghi choice[s] = c bên ngoài nhánh if (Bẫy ghi đè sai!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.syncMode === 'inside';
              const code = `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int S = 6;
    vector<int> coins = {1, 3, 4};
    vector<long long> dp(S + 1, INF);
    vector<int> choice(S + 1, -1);
    dp[0] = 0;
    for (int s = 1; s <= S; s++) {
        for (int c : coins) {
            if (s >= c && dp[s - c] != INF) {
${isOk ? '                if (dp[s - c] + 1 < dp[s]) { dp[s] = dp[s - c] + 1; choice[s] = c; }' : '                if (dp[s - c] + 1 < dp[s]) dp[s] = dp[s - c] + 1;\n                choice[s] = c;'}
            }
        }
    }
    vector<int> used;
    for (int cur = S; cur > 0 && choice[cur] != -1; cur -= choice[cur]) {
        used.push_back(choice[cur]);
    }
    reverse(used.begin(), used.end());
    cout << "dp[6]=" << dp[S] << " | trace:";
    for (int x : used) cout << ' ' << x;
    cout << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [17] : [17, 18],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): choice[6] giữ nguyên 3 và choice[3] giữ nguyên 3, khớp hoàn toàn dp[6] = 2 (3 3)!'
                  : 'MÂU THUẪN TRUY VẾT (WA): Vòng lặp c = 4 ở s = 6 không làm giảm dp[6] nhưng vẫn ghi đè choice[6] = 4, kéo theo truy vết 1 1 4!',
                predictions: [
                  { text: 'In ra dp[6]=2 | trace: 3 3 khớp đúng số đồng xu tối ưu' },
                  { text: 'In ra dp[6]=2 | trace: 1 1 4 (3 đồng xu mâu thuẫn với dp[6]=2)' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[6]=2 | trace: 3 3'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[6]=2 | trace: 1 1 4',
                explain: isOk
                  ? 'Khi nằm trong khối if (dp[s - c] + 1 &lt; dp[s]), choice[6] chỉ được gán lúc c = 3 giúp dp[6] giảm từ 3 xuống 2, bỏ qua c = 4 (tốn 3 xu).'
                  : 'Vì choice[s] = c nằm ngoài if, đồng xu cuối cùng trong vòng lặp (c = 4) luôn ghi đè choice[6] = 4 dù dp[2] + 1 = 3 tệ hơn 2!'
              };
            }
          },
          {
            id: 'sb_trace_reverse',
            title: 'Phòng Thí Nghiệm 3B: Quên Lệnh reverse(path.begin(), path.end()) Khi Truy Vết Frog 1',
            desc: 'Quan sát kết quả đường đi của con ếch trên dãy {10, 25, 45, 20} khi có và không có lệnh reverse() sau vòng lặp nhảy lùi từ đích!',
            toggles: [
              {
                key: 'revMode',
                label: 'Đảo ngược thứ tự mảng path sau khi lần ngược',
                options: [
                  { value: 'with_rev', text: 'Có gọi reverse(path.begin(), path.end()) (AC)', kind: 'ok' },
                  { value: 'no_rev', text: 'Quên gọi reverse() — In ngược từ đích về đầu (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.revMode === 'with_rev';
              const code = `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 4;
    vector<long long> h = {0, 10, 25, 45, 20};
    vector<long long> dp(n + 1, INF);
    vector<int> trace(n + 1, -1);
    dp[1] = 0;
    for (int i = 2; i <= n; i++) {
        if (dp[i - 1] + abs(h[i] - h[i - 1]) < dp[i]) {
            dp[i] = dp[i - 1] + abs(h[i] - h[i - 1]);
            trace[i] = i - 1;
        }
        if (i >= 3 && dp[i - 2] + abs(h[i] - h[i - 2]) < dp[i]) {
            dp[i] = dp[i - 2] + abs(h[i] - h[i - 2]);
            trace[i] = i - 2;
        }
    }
    vector<int> path;
    for (int cur = n; cur != -1; cur = trace[cur]) path.push_back(cur);
${isOk ? '    reverse(path.begin(), path.end());' : '    // Quên reverse(path.begin(), path.end());'}
    for (int i = 0; i < (int)path.size(); i++) {
        if (i > 0) cout << ' ';
        cout << path[i];
    }
    cout << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [26],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Đảo ngược xong thu được lộ trình xuôi từ đá 1 tới đá 4: 1 2 4!'
                  : 'BỊ NGƯỢC LỘ TRÌNH (WA): Lần ngược từ đích thu được 4 2 1 rồi in thẳng ra màn hình!',
                predictions: [
                  { text: 'In ra lộ trình đúng từ đầu tới đích: 1 2 4' },
                  { text: 'In ra lộ trình bị lộn ngược từ đích về đầu: 4 2 1' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1 2 4'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n4 2 1',
                explain: isOk
                  ? 'Vòng lặp truy vết xuất phát từ cur = n nên nhặt 4, rồi trace[4] = 2, rồi trace[2] = 1. Lệnh reverse() lật lại thành 1 2 4.'
                  : 'Vì ta nhảy giật lùi từ hòn đá cuối n về hòn đá 1, mảng path ban đầu luôn lưu theo thứ tự ngược [4, 2, 1].'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 4;
    vector<long long> h = {0, 5, 10, 30, 12};
    vector<long long> dp(n + 1, INF);
    vector<int> trace(n + 1, -1);
    dp[1] = 0;
    for (int i = 2; i <= n; i++) {
        if (dp[i - 1] + abs(h[i] - h[i - 1]) < dp[i]) {
            dp[i] = dp[i - 1] + abs(h[i] - h[i - 1]);
            trace[i] = i - 1;
        }
        if (i >= 3 && dp[i - 2] + abs(h[i] - h[i - 2]) < dp[i]) {
            dp[i] = dp[i - 2] + abs(h[i] - h[i - 2]);
            trace[i] = i - 2;
        }
    }
    vector<int> path;
    for (int cur = n; cur != -1; cur = trace[cur]) path.push_back(cur);
    reverse(path.begin(), path.end());
    cout << dp[n] << ": ";
    for (int x : path) cout << x << ' ';
    cout << '\\n';
    return 0;
}`,
            q: 'Với dãy độ cao đá <code>h = {5, 10, 30, 12}</code> (1-based), đoạn code Frog 1 kèm truy vết trên sẽ in ra kết quả gì?',
            options: [
              'In ra 7: 1 2 4 vì nhảy 1 &rarr; 2 tốn 5 và nhảy 2 &rarr; 4 tốn thêm 2',
              'In ra 23: 1 2 3 4 vì con ếch bắt buộc nhảy qua từng hòn đá kề nhau',
              'In ra 43: 1 3 4 vì nhảy 1 &rarr; 3 tốn 25 và nhảy 3 &rarr; 4 tốn thêm 18',
              'In ra 7: 4 2 1 vì vòng lặp reverse chưa đảo đúng phần tử đầu tiên'
            ],
            correct: 0,
            explain: 'Tính bảng DP: dp[1]=0, dp[2]=5 (trace[2]=1), dp[3]=min(5+20, 0+25)=25 (trace[3]=2), dp[4]=min(25+18, 5+2)=7 (trace[4]=2). Lần ngược từ 4 về 2 rồi 1 và reverse cho kết quả: 7: 1 2 4.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int S = 9;
    vector<int> coins = {2, 3, 5};
    vector<long long> dp(S + 1, INF);
    vector<int> choice(S + 1, -1);
    dp[0] = 0;
    for (int s = 1; s <= S; s++) {
        for (int c : coins) {
            if (s >= c && dp[s - c] != INF && dp[s - c] + 1 < dp[s]) {
                dp[s] = dp[s - c] + 1;
                choice[s] = c;
            }
        }
    }
    int cur = S;
    while (cur > 0) {
        cout << choice[cur] << ' ';
        cur -= choice[cur];
    }
    cout << '\\n';
    return 0;
}`,
            q: 'Khi truy vết không dùng <code>reverse()</code> như vòng <code>while</code> ở trên cho <code>S = 9</code> và xu <code>{2, 3, 5}</code>, chương trình sẽ in ra dãy nào?',
            options: [
              'In ra 5 2 2 vì ở S = 9 chọn đồng 5 rồi phần còn lại 4 chọn 2 + 2',
              'In ra 3 3 3 vì bộ xu ưu tiên chia đều thành ba đồng xu mệnh giá 3',
              'In ra 2 2 5 vì chọn 2 trước tại S = 9 (do 2 đứng đầu mảng coins)',
              'In ra 5 4 vì tại S = 9 trừ 5 còn 4 nên in ra thẳng phần dư cuối cùng'
            ],
            correct: 2,
            explain: 'Tính từ nhỏ đến lớn: dp[2]=1 (choice[2]=2), dp[3]=1 (choice[3]=3), dp[4]=2 (choice[4]=2), dp[5]=1 (choice[5]=5), dp[7]=2 (choice[7]=2 vì dp[5]+1=2), dp[9]=3 (khi xét c=2 ở s=9: dp[7]+1=3 &lt; INF nên choice[9]=2; c=3, c=5 đều cho 3 không &lt; 3). Vòng while in ngược từ S=9: choice[9]=2 &rarr; cur=7, choice[7]=2 &rarr; cur=5, choice[5]=5 &rarr; cur=0. Kết quả: 2 2 5.'
          },
          {
            type: 'single',
            q: 'Trong lúc truy vết ngược đường đi bằng mảng <code>trace[]</code>, điều gì xảy ra nếu bạn quên đặt <code>trace[start] = -1</code> (lại khởi tạo toàn mảng bằng <code>0</code>) rồi viết <code>while (cur != -1)</code>?',
            options: [
              'Vòng lặp dừng ngay lập tức khi vừa chạm đích N nên mảng path bị rỗng',
              'Vòng lặp đứng kẹt vĩnh viễn tại cur = 0 vì trace[0] vẫn bằng 0 (TLE)',
              'Trình biên dịch báo lỗi thiếu bộ nhớ khi biên dịch với cờ -std=c++14',
              'Hàm reverse() tự động phát hiện số 0 lặp lại và ngắt vòng lặp an toàn'
            ],
            correct: 1,
            explain: 'Khi start = 0 (hoặc khi cur lùi tới 0) mà trace[0] mang giá trị mặc định 0 chứ không phải sentinel -1, lệnh cur = trace[cur] cứ giữ mãi cur = 0 khác -1, đẩy phần tử vào vector cho tới khi TLE hoặc tràn RAM!'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về kỹ thuật truy vết nghiệm trong DP 1D?',
            options: [
              'Không cần gọi reverse() nếu viết vòng lặp while (cur != -1) vì mảng trace[] luôn tự xếp xuôi từ 1 đến N',
              'Chỉ được cập nhật trace[i] bên trong nhánh kiểm tra khi thực sự tìm thấy đáp án tốt hơn cho dp[i]',
              'Trong vòng lặp truy vết từ đích, phải push cur vào mảng path trước khi gán cur = trace[cur]',
              'Có thể truy vết Chọn không kề nhau mà không cần mảng trace[] bằng cách đối chiếu dp[i] == dp[i - 1]'
            ],
            correct: [1, 2, 3],
            explain: 'B, C và D đều đúng. A sai: lần ngược bắt đầu từ cur = N lùi về điểm xuất phát nên danh sách thu được luôn bị ngược thứ tự (từ đích về đầu) và cần reverse() nếu đề yêu cầu in xuôi từ đầu đến cuối.'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l206_memo_missing_ref',
        title: 'Quên Dấu &amp; Khi Truyền Bảng memo Vào Hàm Đệ Quy Có Nhớ (TLE)',
        description: 'Chương trình đếm số cách leo n bậc cầu thang (mỗi bước 1 hoặc 2 bậc) kèm biến đếm số lời gọi hàm calls. Với n = 10, đáp án đúng là 89 với đúng 19 lời gọi hàm, nhưng do thiếu 1 ký tự ở hàm solve() nên calls vọt lên tới 177!',
        failingInput: '10',
        failingOutput: '89 177',
        expectedOutput: '89 19',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

long long solve(int i, vector<long long> memo, int& calls) {
    calls++;
    if (i <= 1) return 1;
    if (memo[i] != -1) return memo[i];
    memo[i] = solve(i - 1, memo, calls) + solve(i - 2, memo, calls);
    return memo[i];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    vector<long long> memo(n + 1, -1);
    int calls = 0;
    long long ans = solve(n, memo, calls);
    cout << ans << ' ' << calls << '\\n';
    return 0;
}`,
        bugLine: 4,
        patches: [
          { text: 'Đổi dòng 7 thành if (memo[i] == -1) return memo[i];' },
          { text: 'Đổi dòng 4 thành long long solve(int i, vector<long long>& memo, int& calls) {' },
          { text: 'Đổi dòng 17 thành vector<long long> memo(n + 1, 0);' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 4, tham số vector&lt;long long&gt; memo bị truyền tham trị (thiếu dấu &amp;), làm mỗi lời gọi đệ quy phải copy ra một bản sao mới và làm mất toàn bộ kết quả đã lưu. Thêm dấu &amp; đưa số lời gọi từ 177 xuống đúng 19!'
      },
      {
        id: 'dbg_l206_coin_inf_plus_one',
        title: 'Dùng LLONG_MAX Làm Vô Cực Gây Tràn Số Âm Khi Cộng + 1 (WA)',
        description: 'Chương trình tìm số đồng xu ít nhất đổi tổng S (in -1 nếu vô nghiệm). Với 2 đồng xu {2, 4} và S = 5 (không thể đổi bằng toàn xu chẵn!), đáp án đúng là -1, nhưng code lại tràn số âm và in ra -9223372036854775808!',
        failingInput: '2 5\n2 4',
        failingOutput: '-9223372036854775808',
        expectedOutput: '-1',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = LLONG_MAX;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, S;
    cin >> n >> S;
    vector<int> coins(n);
    for (int i = 0; i < n; i++) cin >> coins[i];
    vector<long long> dp(S + 1, INF);
    dp[0] = 0;
    for (int s = 1; s <= S; s++) {
        for (int c : coins) {
            if (s >= c) {
                dp[s] = min(dp[s], dp[s - c] + 1);
            }
        }
    }
    if (dp[S] == INF) cout << -1 << '\\n';
    else cout << dp[S] << '\\n';
    return 0;
}`,
        bugLine: 4,
        patches: [
          { text: 'Đổi dòng 14 thành dp[0] = INF;' },
          { text: 'Đổi dòng 18 thành dp[s] = min(dp[s], dp[s - c]);' },
          { text: 'Đổi dòng 4 thành const long long INF = 1000000000000000000LL;' }
        ],
        correctPatch: 2,
        explain: 'Ở dòng 4, đặt INF = LLONG_MAX khiến phép cộng dp[s - c] + 1 trên trạng thái vô nghiệm bị tràn giới hạn long long sang số âm -9223372036854775808 và thắng hàm min()! Đổi thành 1000000000000000000LL (1e18) giúp giữ nguyên INF khi chưa đạt tới được (và nhớ kết hợp thêm kiểm tra dp[s - c] != INF để đạt chuẩn phòng vệ kép).'
      },
      {
        id: 'dbg_l206_trace_push_parent',
        title: 'Đẩy Nhầm trace[cur] Thay Vì cur Vào Mảng Kết Quả Khi Truy Vết (WA)',
        description: 'Chương trình tìm đường đi tối ưu cho Frog 1 trên n hòn đá. Với n = 4 và độ cao {10, 25, 45, 20}, đường đi đúng là 1 2 4, nhưng code lại làm rơi mất hòn đá đích 4 và in thừa giá trị chốt -1 thành -1 1 2!',
        failingInput: '4\n10 25 45 20',
        failingOutput: '-1 1 2',
        expectedOutput: '1 2 4',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    vector<long long> h(n + 1);
    for (int i = 1; i <= n; i++) cin >> h[i];
    vector<long long> dp(n + 1, INF);
    vector<int> trace(n + 1, -1);
    dp[1] = 0;
    for (int i = 2; i <= n; i++) {
        if (dp[i - 1] + abs(h[i] - h[i - 1]) < dp[i]) {
            dp[i] = dp[i - 1] + abs(h[i] - h[i - 1]);
            trace[i] = i - 1;
        }
        if (i >= 3 && dp[i - 2] + abs(h[i] - h[i - 2]) < dp[i]) {
            dp[i] = dp[i - 2] + abs(h[i] - h[i - 2]);
            trace[i] = i - 2;
        }
    }
    vector<int> path;
    int cur = n;
    while (cur != -1) {
        path.push_back(trace[cur]);
        cur = trace[cur];
    }
    reverse(path.begin(), path.end());
    for (int i = 0; i < (int)path.size(); i++) {
        if (i > 0) cout << ' ';
        cout << path[i];
    }
    cout << '\\n';
    return 0;
}`,
        bugLine: 29,
        patches: [
          { text: 'Đổi dòng 29 thành path.push_back(cur);' },
          { text: 'Đổi dòng 28 thành while (cur > 1) {' },
          { text: 'Đổi dòng 14 thành vector<int> trace(n + 1, 0);' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 29, đẩy trace[cur] thay vì cur làm hòn đá đầu tiên trong vòng lặp (cur = n) bị bỏ qua, đồng thời ở vòng cuối khi cur = 1 lại đẩy sentinel trace[1] = -1 vào mảng path! Đổi thành path.push_back(cur) sẽ in đúng 1 2 4.'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — L2-06)
    // ============================================================================
    practiceProblems: [
      {
        id: 'DP-A',
        title: 'A - Frog 1',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/dp/tasks/dp_a',
        hint: 'Giới hạn $2 \\le N \\le 10^5$, $1 \\le h_i \\le 10^4$, TL 2.0s, ML 1024 MB. Khuôn mẫu DP 1D nhập môn kinh điển: đặt <code>dp[1] = 0</code>, với $i$ từ $2$ đến $N$ tính <code>dp[i] = min(dp[i - 1] + |h[i] - h[i - 1]|, dp[i - 2] + |h[i] - h[i - 2]|)</code> (chỉ xét <code>i - 2</code> khi <code>i &gt;= 3</code>).'
      },
      {
        id: 'VNOJ-VSTEPS',
        title: 'VM 08 Bài 01 - Bậc thang (VSTEPS)',
        judge: 'VNOJ',
        tier: 1,
        link: 'https://oj.vnoi.info/problem/vsteps',
        hint: 'Giới hạn $0 \\le K &lt; N \\le 10^5$, modulo $14062008$, TL 1.0s, ML 256 MB. Đánh dấu các bậc hỏng bằng mảng <code>broken[i]</code>: đặt <code>dp[1] = 1</code>, với mỗi bậc $i$ từ $2$ đến $N$, nếu <code>broken[i]</code> thì <code>dp[i] = 0</code>, ngược lại <code>dp[i] = (dp[i - 1] + dp[i - 2]) % 14062008</code>.'
      },
      {
        id: 'CSES-1633',
        title: 'Dice Combinations',
        judge: 'CSES',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1633',
        hint: 'Giới hạn $1 \\le n \\le 10^6$, modulo $10^9 + 7$, TL 1.00s, ML 512 MB. Đếm số cách tạo tổng $n$ khi tung xúc xắc $1..6$ (có xét thứ tự lần tung, giống leo cầu thang bước $1..6$): <code>dp[0] = 1</code>, với $i = 1..n$ cộng <code>dp[i - j]</code> ($j = 1..6$) theo modulo $10^9 + 7$. Dùng Bottom-Up để tránh tràn Call Stack!'
      },
      {
        id: 'DP-B',
        title: 'B - Frog 2',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/dp/tasks/dp_b',
        hint: 'Giới hạn $2 \\le N \\le 10^5$, $1 \\le K \\le 100$, $1 \\le h_i \\le 10^4$, TL 2.0s, ML 1024 MB. Mở rộng Frog 1 lên $K$ bước nhảy trong $O(N \\cdot K)$: khởi tạo <code>dp</code> bằng <code>INF = 1e18</code>, <code>dp[1] = 0</code> rồi cài bằng Pull DP (<code>j</code> từ $1$ tới $\\min(K, i - 1)$) hoặc Push DP (<code>i + step &lt;= N</code>).'
      },
      {
        id: 'CSES-1634',
        title: 'Minimizing Coins',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1634',
        hint: 'Giới hạn $1 \\le n \\le 100$, $1 \\le x \\le 10^6$, $1 \\le c_i \\le 10^6$, TL 1.00s, ML 512 MB. Bài toán tổng quát của Đổi tiền khiến Tham lam gãy ở <code>L2-05</code>: dùng mảng <code>dp(x + 1, INF)</code>, <code>dp[0] = 0</code>, cập nhật <code>dp[s] = min(dp[s], dp[s - c] + 1)</code> khi <code>s &gt;= c &amp;&amp; dp[s - c] != INF</code>; in <code>-1</code> nếu <code>dp[x] == INF</code>.'
      },
      {
        id: 'VNOJ-NKTICK',
        title: 'Xếp hàng mua vé (NKTICK)',
        judge: 'VNOJ',
        tier: 2,
        link: 'https://oj.vnoi.info/problem/nktick',
        hint: 'Giới hạn $1 \\le N \\le 60\\,000$, $1 \\le t_i, r_i \\le 30\\,000$, TL 1.0s, ML 256 MB. Gọi <code>dp[i]</code> là tổng thời gian ít nhất cho $i$ người đầu tiên: <code>dp[0] = 0</code>, <code>dp[1] = t[1]</code>, từ $i = 2..N$ người thứ $i$ hoặc tự mua (<code>dp[i - 1] + t[i]</code>) hoặc nhờ người $i - 1$ mua hộ (<code>dp[i - 2] + r[i - 1]</code>). Hãy thử cài thêm <code>trace[]</code> để biết ai tự mua, ai mua ghép đôi!'
      },
      {
        id: 'CF-189A',
        title: '189A - Cut Ribbon',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/189/A',
        hint: 'Giới hạn $1 \\le n, a, b, c \\le 4000$, TL 1.0s, ML 256 MB. Bài DP tối đa số mảnh cắt trên độ dài $n$: khác bài Min ở chỗ phải khởi tạo <code>dp(n + 1, -1)</code> (hoặc <code>-INF</code>) để đánh dấu độ dài <em>chưa thể cắt khít</em>, đặt <code>dp[0] = 0</code>, chỉ chuyển tiếp khi <code>dp[i - len] != -1</code> để lấy <code>max(..., dp[i - len] + 1)</code>.'
      },
      {
        id: 'CF-455A',
        title: '455A - Boredom',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/455/A',
        hint: 'Giới hạn $1 \\le n \\le 10^5$, $1 \\le a_i \\le 10^5$, TL 1.0s, ML 256 MB. Đếm tần suất <code>cnt[x]</code> của mỗi giá trị $x$. Nếu chọn giá trị $x$ thì ăn hết cả <code>x * cnt[x]</code> điểm và bị cấm chọn $x - 1, x + 1$ &rarr; biến thành đúng bài <strong>Chọn không kề nhau (House Robber)</strong> trên trục giá trị $1..M$: <code>dp[v] = max(dp[v - 1], dp[v - 2] + v * cnt[v])</code> (nhớ dùng <code>long long</code>!).'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
