/**
 * DỮ LIỆU BÀI GIẢNG L2-07: DP LƯỚI 2D & TỐI ƯU BỘ NHỚ (ROLLING ARRAY)
 * Tầng 2 — Pha 2 STL Lớp 9 (Nối tiếp từ L1-04, L2-01, L2-06)
 * Mở khóa:
 * - Bảng trạng thái 2 chiều dp[i][j] cho bài toán đường đi trên lưới N x M (Min/Max),
 *   chuẩn biên 1-based an toàn (±INF = ±1e18 để hàng 0 / cột 0 không kéo số 0 giả) và Truy vết 2D.
 * - Đếm đường đi trên lưới có vật cản ('*') theo modulo 10^9 + 7, bẫy ô xuất phát/đích bị chặn,
 *   và biến thể 3 hướng duyệt cột-trước-hàng-sau (VNOJ-QBMAX).
 * - Cuộn mảng (Rolling Array): nén bảng O(N*M) xuống 2 hàng (prev/cur + swap + fill reset) hoặc
 *   1 hàng in-place O(M) để vượt rào 256 MB (tránh MLE), cùng giới hạn ghi đè và đánh đổi truy vết.
 * Ranh giới tiền đề: Chỉ dạy DP Lưới 2D & Rolling Array; KHÔNG lấn sang Knapsack / Pascal C(n,k) (L2-08)
 *   hay LIS / LCS / Edit Distance / Vacation State Machine (L2-09).
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'dp_luoi_2d',
    number: 'Bài Học L2-07',
    shortTitle: 'DP Lưới 2D & Cuộn Mảng',
    title: 'Bài L2-07: DP Lưới 2D &amp; Tối Ưu Bộ Nhớ (Rolling Array)',
    lead: 'Ở <code>L2-06</code>, con ếch chỉ nhảy dọc theo $1$ đường thẳng nên mảng <code>dp[i]</code> là đủ. Nhưng khi bước lên bản đồ ô vuông $N \\times M$ (từ <code>L2-01</code>), bạn phải nâng cấp lên bảng 2 chiều <strong><code>dp[i][j]</code></strong>, xử lý chuẩn biên $\\pm\\text{INF}$ &amp; vật cản <code>*</code>, đồng thời làm chủ tuyệt chiêu <strong>Cuộn mảng (Rolling Array)</strong> nén RAM từ $800\\text{ MB}$ (<strong>MLE</strong>) xuống chỉ còn vài chục <strong>KB</strong>!',
    modules: [
      // ============================================================================
      // MODULE 1: BẢNG TRẠNG THÁI 2D dp[i][j] & CHUẨN BIÊN 1-BASED (TỐI ƯU MIN/MAX)
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'DP Lưới 2D & Chuẩn Biên',
        title: 'Vấn Đề Nhỏ 1: Bảng Trạng Thái 2D <code>dp[i][j]</code> &amp; Chuẩn Biên 1-Based (Tối Ưu Min/Max)',
        lead: 'Tại sao thói quen khởi tạo hàng <code>0</code> và cột <code>0</code> bằng <code>0</code> ở Mảng Cộng Dồn <code>L2-01</code> lại biến thành thảm họa <strong>WA</strong> khi áp dụng vào DP tìm đường đi tổng nhỏ nhất hoặc tổng lớn nhất có số âm?',
        subproblem: {
          title: 'Mở rộng khung 4 bước DP (<code>L2-06</code>) lên ma trận $N \\times M$ đi Phải/Xuống, đặt lính canh biên $\\pm\\text{INF}$ đúng chuẩn và truy vết ngược lộ trình từ $(N, M)$ về $(1, 1)$.',
          desc: 'Với lưới $N$ hàng, $M$ cột chỉ cho phép đi <strong>Sang phải</strong> $(i, j+1)$ hoặc <strong>Xuống dưới</strong> $(i+1, j)$, ô $(i, j)$ chỉ nhận bước chuyển từ <strong>ô trên $(i-1, j)$</strong> hoặc <strong>ô trái $(i, j-1)$</strong>. Nếu quên lót biên ngoài bằng vô cực $\\pm\\text{INF}$, phép tính ở hàng $1$ hoặc cột $1$ sẽ bốc nhầm số <code>0</code> giả nằm ngoài bản đồ!'
        },
        cards: [
          {
            heading: 'Khung 4 Bước DP Lưới 2D &amp; Bẫy Biên Số 0 Ở Hàng 1 / Cột 1',
            tag: 'dp[i][j] &bull; Biên 1-Based',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tưởng tượng một robot giao hàng đứng ở góc trên trái $(1, 1)$ của khu phố bàn cờ $N \\times M$, cần tới góc dưới phải $(N, M)$. Mỗi ô $(i, j)$ có trạm thu phí $a[i][j]$. Robot chỉ được đi <strong>Sang phải</strong> hoặc <strong>Xuống dưới</strong>. Làm sao tìm tổng phí nhỏ nhất?</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bước 1 &mdash; Định nghĩa trạng thái 2D:</strong> <code>dp[i][j]</code> là <em>tổng chi phí nhỏ nhất để đi từ $(1, 1)$ tới đúng ô $(i, j)$</em>.</li>
                  <li><strong>Bước 2 &mdash; Bẫy khởi tạo biên bằng <code>0</code>:</strong> Ở <code>L2-01</code> (tính tổng), đặt hàng <code>0</code> và cột <code>0</code> bằng <code>0</code> rất an toàn. Nhưng với bài <strong>Min</strong> (hay <strong>Max có số âm</strong>), nếu đặt <code>dp[0][j] = 0</code>, khi đứng ở ô $(1, 2)$ ta tính <code>min(dp[0][2], dp[1][1]) + a[1][2]</code>: vì <code>0 &lt; a[1][1]</code>, robot liền "nhảy dù" xuyên tường từ ngoài bản đồ $(0, 2)$ vào mà bỏ qua tiền vé tại $(1, 1)$!</li>
                  <li><strong>Bước 3 &mdash; Đặt lính canh biên $\\pm\\text{INF}$ &amp; Neo gốc:</strong> Khởi tạo toàn bộ bảng <code>dp</code> kích thước $(N + 1) \\times (M + 1)$ bằng <strong><code>INF = 1e18</code></strong> (bài Min) hoặc <strong><code>-INF = -1e18</code></strong> (bài Max), chỉ gán <strong><code>dp[1][1] = a[1][1]</code></strong>. Từ đó với mọi $(i, j) \\neq (1, 1)$, công thức <code>dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + a[i][j]</code> tự động chặn mọi bước nhảy từ hàng <code>0</code> và cột <code>0</code> mà không cần viết thêm câu lệnh <code>if</code> rẽ nhánh nào!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: DP Lưới 2D Tổng Nhỏ Nhất Chuẩn Biên 1-Based (C++14)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long INF = 1000000000000000000LL; // 1e18 (tránh dùng LLONG_MAX)

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 3, m = 3;
    vector&lt;vector&lt;long long&gt;&gt; a = {
        {0, 0, 0, 0},
        {0, 5, 1, 2},
        {0, 9, 3, 4},
        {0, 1, 2, 1}
    };

    // Khởi tạo toàn bộ bảng bằng INF để hàng 0 và cột 0 tự làm tường chắn!
    vector&lt;vector&lt;long long&gt;&gt; dp(n + 1, vector&lt;long long&gt;(m + 1, INF));
    dp[1][1] = a[1][1];

    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            if (i == 1 &amp;&amp; j == 1) continue;
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + a[i][j];
        }
    }

    cout &lt;&lt; "Tong nho nhat = " &lt;&lt; dp[n][m] &lt;&lt; '\\n'; // 12 (5+1+3+2+1)
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bảng trạng thái 2D (<code>2D DP State Table</code>):</strong> Bảng hai chiều <code>dp[i][j]</code> lưu giá trị tối ưu cho bài toán con kết thúc tại ô $(i, j)$ trên ma trận.</li>
                  <li><strong>Đường biên lính canh $\\pm\\text{INF}$ (<code>Sentinel Border</code>):</strong> Đặt sẵn hàng <code>0</code> và cột <code>0</code> bằng giá trị vô cực cực tệ (<code>INF</code> cho Min, <code>-INF</code> cho Max) để không phải tách riêng 3 vòng lặp cho hàng $1$, cột $1$ và phần lõi.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Truy Vết Đường Đi Tối Ưu Trên Lưới 2D (Lần Ngược Từ (N, M) Về (1, 1))',
            tag: 'Truy Vết 2D &bull; D/R',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Biết tổng nhỏ nhất là <code>12</code> hay <code>8</code> rồi, nhưng đề bài yêu cầu in ra chính xác chuỗi ký tự bước đi (<code>'D'</code> = Xuống, <code>'R'</code> = Sang phải) hoặc tọa độ các ô đã dẫm qua từ $(1, 1)$ tới $(N, M)$:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Truy vết trực tiếp trên bảng <code>dp[][]</code> (<code>On-the-fly</code>):</strong> Đứng tại đích <code>(r, c) = (N, M)</code>, chừng nào <code>r &gt; 1 || c &gt; 1</code>, ta so sánh xem chi phí <code>dp[r][c]</code> vừa nhận được từ ô trên hay ô trái: nếu <code>r &gt; 1 &amp;&amp; dp[r][c] == dp[r - 1][c] + a[r][c]</code> thì bước vừa rồi là đi xuống (<code>'D'</code>) nên lùi lên <code>r--</code>; ngược lại bước vừa rồi là đi sang phải (<code>'R'</code>) nên lùi sang trái <code>c--</code>!</li>
                  <li><strong>Nhớ đảo ngược <code>reverse()</code>:</strong> Vì lần giật lùi từ $(N, M)$ về $(1, 1)$ nên chuỗi bước thu được bị ngược từ cuối lên đầu &mdash; phải gọi <code>reverse(moves.begin(), moves.end())</code> trước khi in!</li>
                  <li><strong>Mẹo tiết kiệm RAM khi truy vết:</strong> Nếu cần lưu mảng vết riêng thay vì giữ cả bảng <code>dp</code> (ví dụ bài giới hạn 64 MB), chỉ cần lưu một ký tự hướng <code>char dir[i][j]</code> (<code>'D'</code> hoặc <code>'R'</code>, chỉ tốn $1\\text{ byte}$/ô thay vì $8\\text{ byte}$ của <code>pair&lt;int, int&gt;</code>)!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Truy Vết Đường Đi Lưới 3x3 (Chuỗi Bước &amp; Tọa Độ)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 3, m = 3;
    vector&lt;vector&lt;long long&gt;&gt; a = {
        {0, 0, 0, 0},
        {0, 1, 9, 9},
        {0, 2, 9, 9},
        {0, 3, 1, 1}
    };

    vector&lt;vector&lt;long long&gt;&gt; dp(n + 1, vector&lt;long long&gt;(m + 1, INF));
    dp[1][1] = a[1][1];
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            if (i == 1 &amp;&amp; j == 1) continue;
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + a[i][j];
        }
    }

    string moves;
    int r = n, c = m;
    while (r &gt; 1 || c &gt; 1) {
        if (r &gt; 1 &amp;&amp; dp[r][c] == dp[r - 1][c] + a[r][c]) {
            moves.push_back('D');
            r--;
        } else {
            moves.push_back('R');
            c--;
        }
    }
    reverse(moves.begin(), moves.end());

    cout &lt;&lt; "Tong min = " &lt;&lt; dp[n][m] &lt;&lt; " | Lo trinh: " &lt;&lt; moves &lt;&lt; '\\n'; // 8 | DDRR
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Truy vết ngược 2D (<code>2D Backward Reconstruction</code>):</strong> Đi ngược từ tọa độ đích $(N, M)$ về $(1, 1)$ theo hướng cha hợp lệ ở mỗi ô rồi <code>reverse()</code> lại chuỗi bước đi.</li>
                  <li><strong>Mảng hướng gọn nhẹ (<code>Compact Direction Array</code>):</strong> Lưu ký tự đơn <code>'D'</code>/<code>'R'</code> vào bảng <code>char</code> thay cho tọa độ <code>pair&lt;int, int&gt;</code> để giảm $8$ lần dung lượng vết khi RAM bị siết chặt.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_border_zero',
            title: 'Phòng Thí Nghiệm 1A: Chuẩn Biên INF vs Bẫy Khởi Tạo 0 (Tổng Đường Đi Nhỏ Nhất)',
            desc: 'Thử đổi giá trị khởi tạo ban đầu của bảng dp[][] từ INF (1e18) sang 0 trên lưới 3x3 toàn số dương để xem robot "nhảy dù" xuyên tường ngoài biên vào làm sai đáp án từ 12 xuống 4 như thế nào!',
            toggles: [
              {
                key: 'borderMode',
                label: 'Giá trị khởi tạo toàn bảng dp[][] (bao gồm hàng 0 và cột 0)',
                options: [
                  { value: 'safe_inf', text: 'Khởi tạo bằng INF = 1e18 — Biên chặn hợp lệ (AC)', kind: 'ok' },
                  { value: 'zero_bug', text: 'Khởi tạo bằng 0 — Quên biên ±INF (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.borderMode === 'safe_inf';
              const code = `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3, m = 3;
    vector<vector<long long>> a = {
        {0, 0, 0, 0},
        {0, 5, 1, 2},
        {0, 9, 3, 4},
        {0, 1, 2, 1}
    };
${isOk ? '    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, INF));' : '    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, 0));'}
    dp[1][1] = a[1][1];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) continue;
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + a[i][j];
        }
    }
    cout << "dp[1][2]=" << dp[1][2] << " dp[3][3]=" << dp[3][3] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [16],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Hàng 0 và cột 0 mang INF nên min() bắt buộc đi từ (1, 1) qua, ra đúng dp[1][2]=6 và dp[3][3]=12!'
                  : 'NHẢY DÙ XUYÊN BIÊN (WA): Ở (1, 2), min(dp[0][2]=0, dp[1][1]=5) bốc số 0 ngoài lưới làm dp[1][2]=1 và kéo dp[3][3] tụt xuống 4!',
                predictions: [
                  { text: 'In ra dp[1][2]=6 dp[3][3]=12 nhờ biên INF chặn hoàn toàn ngoài lưới' },
                  { text: 'In ra dp[1][2]=1 dp[3][3]=4 vì hàng 0 và cột 0 mang giá trị 0 lọt vào min()' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[1][2]=6 dp[3][3]=12'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[1][2]=1 dp[3][3]=4',
                explain: isOk
                  ? 'Đặt INF = 1e18 khiến mọi ô trên hàng 0 và cột 0 thua trắng trong hàm min(), đảm bảo mọi đường đi đều xuất phát chuẩn xác từ (1, 1).'
                  : 'Khi dp khởi tạo bằng 0, ở hàng 1 ô (1, 2) lấy dp[0][2] = 0 thay vì dp[1][1] = 5, còn ở cột 1 ô (3, 1) lấy dp[3][0] = 0 nên cuối cùng dp[3][3] chỉ còn 4!'
              };
            }
          },
          {
            id: 'sb_trace_2d',
            title: 'Phòng Thí Nghiệm 1B: Truy Vết 2D — Có vs Quên reverse() Chuỗi Bước Đi',
            desc: 'Cùng ma trận 3x3 có lộ trình tối ưu (1,1) &rarr; (2,1) &rarr; (3,1) &rarr; (3,2) &rarr; (3,3) (tức DDRR), thử bật tắt lệnh reverse() ở cuối vòng lặp truy vết để kiểm chứng thứ tự bước đi!',
            toggles: [
              {
                key: 'revMode',
                label: 'Đảo ngược chuỗi moves sau vòng lặp while từ (n, m) về (1, 1)',
                options: [
                  { value: 'with_rev', text: 'Gọi reverse(moves.begin(), moves.end()) (AC)', kind: 'ok' },
                  { value: 'no_rev', text: 'Quên reverse() — In ngược từ đích về đầu (Bẫy WA!)', kind: 'bug' }
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
    int n = 3, m = 3;
    vector<vector<long long>> a = {
        {0, 0, 0, 0},
        {0, 1, 9, 9},
        {0, 2, 9, 9},
        {0, 3, 1, 1}
    };
    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, INF));
    dp[1][1] = a[1][1];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) continue;
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + a[i][j];
        }
    }
    string moves;
    int r = n, c = m;
    while (r > 1 || c > 1) {
        if (r > 1 && dp[r][c] == dp[r - 1][c] + a[r][c]) {
            moves.push_back('D'); r--;
        } else {
            moves.push_back('R'); c--;
        }
    }
${isOk ? '    reverse(moves.begin(), moves.end());' : '    // Quên gọi reverse(moves.begin(), moves.end());'}
    cout << "cost=" << dp[n][m] << " moves=" << moves << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [33],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Lật ngược chuỗi moves ra đúng hướng từ (1, 1) tới (3, 3): DDRR!'
                  : 'NGƯỢC LỘ TRÌNH (WA): Đi giật lùi từ (3, 3) về (1, 1) nhặt R, R, D, D nên in nhầm thành RRDD!',
                predictions: [
                  { text: 'In ra cost=8 moves=DDRR (đi xuống 2 bước rồi rẽ phải 2 bước)' },
                  { text: 'In ra cost=8 moves=RRDD vì chuỗi moves chưa được đảo ngược' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ncost=8 moves=DDRR'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ncost=8 moves=RRDD',
                explain: isOk
                  ? 'Từ (3, 3) lùi về (3, 2) là R, về (3, 1) là R, lên (2, 1) là D, lên (1, 1) là D. Gọi reverse() lật RRDD thành DDRR chuẩn xác.'
                  : 'Không có reverse(), chuỗi moves lưu lại các bước theo thứ tự đi lùi từ đích về xuất phát (RRDD) — nếu đi theo từ (1, 1) sẽ đâm qua toàn ô chi phí 9!'
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
    int n = 3, m = 3;
    vector<vector<long long>> a = {
        {0, 0, 0, 0},
        {0, 2, 8, 1},
        {0, 4, 1, 3},
        {0, 5, 6, 2}
    };
    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, INF));
    dp[1][1] = a[1][1];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) continue;
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + a[i][j];
        }
    }
    cout << dp[1][3] << ' ' << dp[2][2] << ' ' << dp[3][3] << '\\n';
    return 0;
}`,
            q: 'Khi chạy thuật toán DP tổng đường đi nhỏ nhất trên lưới 3x3 trên, ba giá trị <code>dp[1][3]</code>, <code>dp[2][2]</code> và <code>dp[3][3]</code> in ra lần lượt là gì?',
            options: [
              'In ra 9 5 10 vì hàng đầu tiên kéo nhầm biên 0 ở cột 2 và cột 3',
              'In ra 11 7 12 vì dp[1][3]=11, dp[2][2]=7 (2+4+1) và dp[3][3]=12',
              'In ra 11 9 13 vì tại ô (2, 2) phải đi qua ô (1, 2) tốn 10 đơn vị',
              'In ra 10 7 11 vì bước từ (2, 3) xuống (3, 3) không cộng thêm a[3][3]'
            ],
            correct: 1,
            explain: 'Hàng 1: dp[1][1]=2, dp[1][2]=10, dp[1][3]=11. Hàng 2: dp[2][1]=6, dp[2][2]=min(10,6)+1=7, dp[2][3]=min(11,7)+3=10. Hàng 3: dp[3][1]=11, dp[3][2]=min(7,11)+6=13, dp[3][3]=min(10,13)+2=12. Vậy in ra: 11 7 12.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3, m = 3;
    vector<vector<long long>> a = {
        {0, 0, 0, 0},
        {0, 1, 4, 9},
        {0, 2, 5, 9},
        {0, 8, 1, 2}
    };
    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, INF));
    dp[1][1] = a[1][1];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) continue;
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + a[i][j];
        }
    }
    string moves;
    int r = n, c = m;
    while (r > 1 || c > 1) {
        if (r > 1 && dp[r][c] == dp[r - 1][c] + a[r][c]) {
            moves.push_back('D'); r--;
        } else {
            moves.push_back('R'); c--;
        }
    }
    reverse(moves.begin(), moves.end());
    cout << dp[n][m] << ' ' << moves << '\\n';
    return 0;
}`,
            q: 'Đoạn code tìm đường đi tổng nhỏ nhất kèm truy vết <code>moves</code> trên lưới 3x3 trên sẽ in ra kết quả gì?',
            options: [
              'In ra 11 RDRD vì vòng lặp truy vết quên đảo ngược dãy bước đã nhặt',
              'In ra 11 DDRR vì từ (1, 1) ưu tiên đi thẳng hết cột 1 xuống (3, 1)',
              'In ra 13 RRDD vì tại ô (1, 2) chọn sang phải hết hàng 1 rồi xuống',
              'In ra 11 DRDR vì lộ trình nhỏ nhất đi qua (1,1)-(2,1)-(2,2)-(3,2)-(3,3)'
            ],
            correct: 3,
            explain: 'Bảng dp cho dp[1][1]=1, dp[2][1]=3, dp[2][2]=min(5,3)+5=8, dp[3][2]=min(8,11)+1=9, dp[3][3]=min(17,9)+2=11. Truy vết lùi nhặt R (3,3 &lt;- 3,2), D (3,2 &lt;- 2,2), R (2,2 &lt;- 2,1), D (2,1 &lt;- 1,1) và reverse thành: 11 DRDR.'
          },
          {
            type: 'single',
            q: 'Vì sao khi cài đặt bài tìm đường đi có tổng nhỏ nhất trên lưới 1-based, ta phải khởi tạo toàn bảng <code>dp</code> bằng <code>INF = 1e18</code> thay vì <code>0</code>?',
            options: [
              'Ở hàng 1 hoặc cột 1, min() sẽ kéo số 0 từ hàng 0 và cột 0 ở ngoài lưới vào đáp án',
              'Hàm vector không thể lưu các phần tử có giá trị dương nếu bảng 2D đặt giá trị đầu là 0',
              'Ở hàng 1 hoặc cột 1, cộng thêm a[i][j] vào 0 sẽ bị tràn giới hạn số nguyên long long',
              'Đoạn code truy vết từ (n, m) luôn gặp vòng lặp vô tận nếu mọi ô biên đều giữ số 0'
            ],
            correct: 0,
            explain: 'Nếu hàng 0 và cột 0 mang giá trị 0, hàm min(dp[i - 1][j], dp[i][j - 1]) ở hàng 1 hoặc cột 1 sẽ tưởng nhầm đi từ ngoài bản đồ (chi phí 0) là đường hợp lệ, làm bỏ qua ô xuất phát (1, 1) và kéo tụt kết quả!'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về bảng trạng thái 2D <code>dp[i][j]</code> và truy vết trên lưới?',
            options: [
              'Đặt biên hàng 0 và cột 0 bằng INF (bài min) hoặc -INF (bài max) giúp bỏ được nhiều nhánh if ở hàng 1, cột 1',
              'Khi truy vết ngược từ (N, M) về (1, 1), ta ghi lại bước đi ở mỗi ô rồi gọi reverse() để ra thứ tự từ (1, 1) đến (N, M)',
              'Ở bài tìm tổng đường đi lớn nhất trên bảng có toàn số âm, khởi tạo hàng 0 và cột 0 bằng 0 luôn cho kết quả đúng',
              'Mảng hướng char dir[N][M] chỉ tốn khoảng 1 byte mỗi ô, tiết kiệm RAM hơn nhiều so với lưu pair&lt;int, int&gt;'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D đều đúng. C sai hoàn toàn: nếu bảng toàn số âm mà biên hàng 0 / cột 0 lại mang 0, hàm max() sẽ chọn ngay số 0 giả ở ngoài bảng thay vì số âm ở (1, 1)!'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: ĐẾM ĐƯỜNG ĐI CÓ VẬT CẢN (MOD = 10^9 + 7) & BIẾN THỂ LƯỚI
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Đếm Đường & Vật Cản',
        title: 'Vấn Đề Nhỏ 2: Đếm Đường Đi Có Vật Cản (<code>MOD = 10^9 + 7</code>) &amp; Biến Thể Lưới',
        lead: 'Chuyển từ tối ưu Min/Max sang <strong>đếm tổng số cách đi</strong> trên lưới có bẫy <code>*</code> (<code>CSES-1638</code>, <code>AtCoder DP-H</code>): né bẫy ô xuất phát <code>(1, 1)</code> bị chặn, chia dư từng bước, và mở rộng sang lưới đi $3$ hướng theo cột như <code>VNOJ-QBMAX</code>!',
        subproblem: {
          title: 'Đếm số đường đi hợp lệ modulo $10^9 + 7$ trên bản đồ có ô cấm <code>*</code> (kể cả ở đầu hoặc đích), và đảo thứ tự vòng lặp khi bước đi phụ thuộc chéo giữa các hàng của cột trước.',
          desc: 'Ở bài toán đếm, biên hàng <code>0</code> và cột <code>0</code> mang giá trị <code>0</code> (nghĩa là $0$ cách đi tới). Tuy nhiên nhiều bài vẫn <strong>WA</strong> ở test biên vì gán cứng <code>dp[1][1] = 1</code> khi <code>(1, 1) == \'*\'</code>, hoặc duyệt hàng ngoài cột trong cho bài toán đi 3 hướng (lên-phải, thẳng-phải, xuống-phải).'
        },
        cards: [
          {
            heading: 'Đếm Đường Đi Có Vật Cản (CSES-1638 / DP-H) &amp; Bẫy Ô (1, 1) Bị Chặn',
            tag: 'Đếm Đường &bull; Vật Cản *',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Một mê cung $N \\times M$ gồm các ô cỏ sạch <code>.</code> và các hố bẫy <code>*</code> (hoặc tường <code>#</code>). Robot chỉ đi <strong>Sang phải</strong> hoặc <strong>Xuống dưới</strong>. Hỏi có bao nhiêu đường đi khác nhau từ $(1, 1)$ tới $(N, M)$ (chia dư cho <code>10^9 + 7</code>)?</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Quy tắc tại ô vật cản <code>*</code>:</strong> Không ai được đặt chân vào hố bẫy, nên số đường đi tới ô đó luôn bằng <strong><code>0</code></strong> (<code>dp[i][j] = 0</code>).</li>
                  <li><strong>Bẫy điểm xuất phát &amp; điểm đích (<code>(1, 1)</code> hoặc <code>(N, M) == '*'</code>):</strong> Nhiều bạn hay viết cứng <code>dp[1][1] = 1;</code> trước vòng lặp rồi mới bỏ qua ô <code>(1, 1)</code> trong vòng <code>for</code>. Khi bộ test cho ô <code>(1, 1)</code> là hố bẫy <code>*</code>, robot lẽ ra chết ngay từ vạch xuất phát (đáp án <code>0</code>), nhưng code vẫn lan truyền <code>dp[1][1] = 1</code> đi khắp bảng! Cách viết chuẩn nhất là gộp chung vào vòng <code>for</code>: <em>nếu là <code>'*'</code> thì <code>dp[i][j] = 0</code> ngay từ đầu</em> (trước nhánh <code>i == 1 &amp;&amp; j == 1</code>!).</li>
                  <li><strong>Cộng đồng dư từng bước (<code>L1-07</code>):</strong> Tổng số đường đi trên lưới $1000 \\times 1000$ có thể lên tới hơn $10^{500}$, nên phải viết <code>dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD</code> ngay ở từng ô.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Đếm Đường Có Vật Cản Modulo 10^9 + 7 (An Toàn Tuyệt Đối)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 4, m = 4;
    vector&lt;string&gt; grid = {
        "....",
        ".*..",
        "...*",
        "*..."
    };

    // Khởi tạo hàng 0 và cột 0 bằng 0 (0 cách đi từ ngoài bảng)
    vector&lt;vector&lt;long long&gt;&gt; dp(n + 1, vector&lt;long long&gt;(m + 1, 0));

    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            // Kiểm tra vật cản TRƯỚC khi gán dp[1][1] = 1 để bắt luôn bẫy (1, 1) == '*'!
            if (grid[i - 1][j - 1] == '*') {
                dp[i][j] = 0;
            } else if (i == 1 &amp;&amp; j == 1) {
                dp[1][1] = 1;
            } else {
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
            }
        }
    }

    cout &lt;&lt; "So duong di = " &lt;&lt; dp[n][m] &lt;&lt; '\\n'; // 3
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bẫy điểm gốc bị chặn (<code>Blocked Origin/Destination Trap</code>):</strong> Lỗi gán mặc định <code>dp[1][1] = 1</code> mà quên kiểm tra ô xuất phát <code>(1, 1)</code> (hoặc ô đích) có nằm trên vật cản không.</li>
                  <li><strong>Cộng đồng dư từng bước (<code>Stepwise Modulo Addition</code>):</strong> Lấy <code>% MOD</code> ngay sau mỗi phép cộng <code>dp[i - 1][j] + dp[i][j - 1]</code> để giá trị từng ô luôn nằm gọn trong $[0, 10^9 + 6]$.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Biến Thể 3 Hướng Đi &amp; Xuất Phát Tự Do Trên Cột 1 (VNOJ-QBMAX)',
            tag: 'Duyệt Theo Cột &bull; Số Âm',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Ở bài <strong>QBMAX (<code>VNOJ</code>)</strong>, luật chơi đổi hẳn: bạn được xuất phát từ <strong>bất kỳ ô nào ở cột 1</strong>, mỗi bước từ cột $j - 1$ sang cột $j$ được đi $3$ hướng: <strong>chếch lên</strong> $(i - 1, j - 1)$, <strong>đi ngang</strong> $(i, j - 1)$, hoặc <strong>chếch xuống</strong> $(i + 1, j - 1)$ tới cột $M$, và trong bảng <strong>có số âm</strong>!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Thay đổi 1 &mdash; Duyệt cột <code>j</code> ở NGOÀI, hàng <code>i</code> ở TRONG:</strong> Để tính ô <code>dp[i][j]</code>, ta cần cả <code>dp[i + 1][j - 1]</code> (ô ở <em>hàng dưới hơn</em> thuộc cột trước). Nếu giữ vòng lặp cũ <code>for i</code> ở ngoài, lúc đứng ở hàng <code>i</code> thì hàng <code>i + 1</code> chưa hề được tính! Phải viết <code>for (int j = 2; j &lt;= m; j++)</code> bao bên ngoài <code>for (int i = 1; i &lt;= n; i++)</code>.</li>
                  <li><strong>Thay đổi 2 &mdash; Lót biên kép <code>-INF</code> ở CẢ hàng <code>0</code> và hàng <code>N + 1</code>:</strong> Vì từ hàng <code>1</code> nhìn lên <code>i - 1 = 0</code> và từ hàng <code>N</code> nhìn xuống <code>i + 1 = N + 1</code>, bảng phải có <strong><code>n + 2</code> hàng</strong> khởi tạo bằng <code>-INF = -1e18</code> để chặn số âm không chọn nhầm số <code>0</code> ngoài bảng!</li>
                  <li><strong>Thay đổi 3 &mdash; Đáp án là <code>max</code> toàn cột cuối <code>M</code>:</strong> Khởi tạo cả cột $1$ (<code>dp[i][1] = a[i][1]</code>) và lấy <code>max</code> qua mọi hàng <code>i = 1..N</code> ở cột $M$.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Khuôn Mẫu QBMAX Duyệt Cột Ngoài &amp; Biên Kép -INF</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 3, m = 3;
    vector&lt;vector&lt;long long&gt;&gt; a = {
        {0,   0,   0,   0},
        {0, -10, -10, -10},
        {0,  -5, -20, -10},
        {0, -10, -10, -10}
    };

    // Kích thước (n + 2) x (m + 1) để cả hàng 0 lẫn hàng n + 1 đều mang -INF
    vector&lt;vector&lt;long long&gt;&gt; dp(n + 2, vector&lt;long long&gt;(m + 1, -INF));
    for (int i = 1; i &lt;= n; i++) dp[i][1] = a[i][1];

    // Duyệt cột j ở ngoài, hàng i ở trong để cột j - 1 đã hoàn tất 100%
    for (int j = 2; j &lt;= m; j++) {
        for (int i = 1; i &lt;= n; i++) {
            dp[i][j] = max({dp[i - 1][j - 1], dp[i][j - 1], dp[i + 1][j - 1]}) + a[i][j];
        }
    }

    long long ans = -INF;
    for (int i = 1; i &lt;= n; i++) ans = max(ans, dp[i][m]);
    cout &lt;&lt; "QBMAX = " &lt;&lt; ans &lt;&lt; '\\n'; // -25
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Thứ tự phụ thuộc theo cột (<code>Column-by-Column Dependency</code>):</strong> Khi bước chuyển sang cột <code>j</code> đọc dữ liệu từ các hàng trên, ngang và dưới của cột <code>j - 1</code>, vòng lặp ngoài bắt buộc phải là chỉ số cột <code>j</code>.</li>
                  <li><strong>Biên kép lính canh (<code>Double Sentinel Rows 0 &amp; N + 1</code>):</strong> Cấp phát thừa 2 hàng <code>0</code> và <code>N + 1</code> mang <code>-INF</code> để hướng đi chéo lên từ hàng $1$ hay chéo xuống từ hàng $N$ luôn an toàn ngoài lưới.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_blocked_start',
            title: 'Phòng Thí Nghiệm 2A: Bẫy Ô Xuất Phát (1, 1) Là Vật Cản * Trong Bài Đếm Đường',
            desc: 'Cho bản đồ 3x3 mà ngay ô xuất phát (1, 1) là hố bẫy *. Thử so sánh cách viết kiểm tra vật cản TRƯỚC vs gán cứng dp[1][1] = 1 ở đầu hàm để xem sự khác biệt giữa 0 và 6!',
            toggles: [
              {
                key: 'startCheck',
                label: 'Cách xử lý ô xuất phát (1, 1) khi gặp vật cản *',
                options: [
                  { value: 'safe', text: 'Kiểm tra g[0][0] == * trước khi đặt dp[1][1] = 1 (AC)', kind: 'ok' },
                  { value: 'bug', text: 'Gán cứng dp[1][1] = 1 bỏ qua kiểm tra (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.startCheck === 'safe';
              const code = `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3, m = 3;
    vector<string> g = {
        "*..",
        "...",
        "..."
    };
    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, 0));
${isOk ? "    if (g[0][0] != '*') dp[1][1] = 1;" : '    dp[1][1] = 1;'}
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) continue;
            if (g[i - 1][j - 1] == '*') dp[i][j] = 0;
            else dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
        }
    }
    cout << "dp[3][3]=" << dp[n][m] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [16],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Vì g[0][0] == \'*\' nên dp[1][1] giữ nguyên 0, mọi ô sau cũng là 0!'
                  : 'ĐƯỜNG ĐI MA TỪ HỐ BẪY (WA): Gán cứng dp[1][1] = 1 làm chương trình đếm ra tận 6 đường dù không thể xuất phát!',
                predictions: [
                  { text: 'In ra dp[3][3]=0 vì ô xuất phát (1, 1) bị chặn bởi vật cản *' },
                  { text: 'In ra dp[3][3]=6 vì gán cứng dp[1][1]=1 bất chấp ô (1, 1) là *' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[3][3]=0'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[3][3]=6',
                explain: isOk
                  ? 'Kiểm tra g[0][0] != \'*\' (hoặc xử lý nhánh g == \'*\' trước i == 1 &amp;&amp; j == 1) chặn triệt để đường đi xuất phát từ ô bẫy.'
                  : 'Vì vòng lặp bỏ qua (1, 1) bằng continue nên giá trị gán cứng dp[1][1] = 1 không bao giờ bị sửa lại về 0, sinh ra 6 đường đi không tồn tại!'
              };
            }
          },
          {
            id: 'sb_qbmax_order',
            title: 'Phòng Thí Nghiệm 2B: Thứ Tự Vòng Lặp Trong QBMAX (Duyệt Cột Ngoài vs Hàng Ngoài)',
            desc: 'Trong QBMAX (được đi chéo lên từ hàng i + 1 của cột trước), hãy đảo hai vòng lặp for j và for i để chứng kiến ô (1, 3) bỏ sót đường đi tốt nhất qua (2, 2) = 60!',
            toggles: [
              {
                key: 'loopOrder',
                label: 'Thứ tự vòng lặp tính bảng dp[i][j]',
                options: [
                  { value: 'col_outer', text: 'for j (cột) ở ngoài, for i (hàng) ở trong (AC)', kind: 'ok' },
                  { value: 'row_outer', text: 'for i (hàng) ở ngoài, for j (cột) ở trong (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.loopOrder === 'col_outer';
              const code = `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3, m = 3;
    vector<vector<long long>> a = {
        {0,  0,  0,   0},
        {0,  1,  1, 100},
        {0,  1, 10,   1},
        {0, 50,  1,   1}
    };
    vector<vector<long long>> dp(n + 2, vector<long long>(m + 1, -INF));
    for (int i = 1; i <= n; i++) dp[i][1] = a[i][1];
${isOk ? '    for (int j = 2; j <= m; j++) {\n        for (int i = 1; i <= n; i++) {' : '    for (int i = 1; i <= n; i++) {\n        for (int j = 2; j <= m; j++) {'}
            dp[i][j] = max({dp[i - 1][j - 1], dp[i][j - 1], dp[i + 1][j - 1]}) + a[i][j];
        }
    }
    long long ans = -INF;
    for (int i = 1; i <= n; i++) ans = max(ans, dp[i][m]);
    cout << "ans=" << ans << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [18, 19],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Cột 2 hoàn tất xong [2, 60, 51], nên cột 3 lấy được 60 + 100 = 160!'
                  : 'ĐỌC Ô CHƯA TÍNH (WA): Khi tính dp[1][3], hàng 2 chưa chạy nên dp[2][2] vẫn đang là -INF, đáp án rớt từ 160 xuống 102!',
                predictions: [
                  { text: 'In ra ans=160 nhờ lộ trình (3,1)=50 &rarr; (2,2)=60 &rarr; (1,3)=160' },
                  { text: 'In ra ans=102 vì dp[2][2] chưa được tính khi chương trình tính dp[1][3]' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nans=160'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nans=102',
                explain: isOk
                  ? 'Duyệt cột j bên ngoài bảo đảm mọi hàng của cột j - 1 đều đã có kết quả trước khi cột j đọc sang.'
                  : 'Khi duyệt hàng i = 1 chạy hết từ j = 2..3 trước, lúc tính dp[1][3] cần đọc dp[2][2] thì giá trị ở đó vẫn đang là -INF chưa được chạm tới!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3, m = 4;
    vector<string> grid = {
        "....",
        ".*..",
        "...."
    };
    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (grid[i - 1][j - 1] == '*') dp[i][j] = 0;
            else if (i == 1 && j == 1) dp[1][1] = 1;
            else dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
        }
    }
    cout << dp[2][3] << ' ' << dp[2][4] << ' ' << dp[3][4] << '\\n';
    return 0;
}`,
            q: 'Với bản đồ 3x4 chứa vật cản <code>*</code> tại vị trí <code>(2, 2)</code> như trên, ba giá trị <code>dp[2][3]</code>, <code>dp[2][4]</code> và <code>dp[3][4]</code> in ra lần lượt là gì?',
            options: [
              'In ra 2 3 5 vì ô vật cản (2, 2) vẫn truyền giá trị cũ từ hàng 1 xuống dưới',
              'In ra 1 2 3 vì tại ô (3, 3) chỉ cộng từ ô (2, 3) mà bỏ qua ô (3, 2)',
              'In ra 1 2 4 vì dp[2][3]=1, dp[2][4]=1+1=2 và dp[3][4]=2+2=4',
              'In ra 1 1 2 vì vật cản tại (2, 2) chặn toàn bộ các ô ở cột 3 và cột 4'
            ],
            correct: 2,
            explain: 'Hàng 1: [1, 1, 1, 1]. Hàng 2: dp[2][1]=1, dp[2][2]=0 (vật cản), dp[2][3]=1+0=1, dp[2][4]=1+1=2. Hàng 3: dp[3][1]=1, dp[3][2]=0+1=1, dp[3][3]=1+1=2, dp[3][4]=2+2=4. Vậy in ra: 1 2 4.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3, m = 3;
    vector<vector<long long>> a = {
        {0,  0,   0,  0},
        {0, -4,  -2, -6},
        {0, -1, -10, -3},
        {0, -5,  -2, -1}
    };
    vector<vector<long long>> dp(n + 2, vector<long long>(m + 1, -INF));
    for (int i = 1; i <= n; i++) dp[i][1] = a[i][1];
    for (int j = 2; j <= m; j++) {
        for (int i = 1; i <= n; i++) {
            dp[i][j] = max({dp[i - 1][j - 1], dp[i][j - 1], dp[i + 1][j - 1]}) + a[i][j];
        }
    }
    long long ans = -INF;
    for (int i = 1; i <= n; i++) ans = max(ans, dp[i][m]);
    cout << dp[1][2] << ' ' << dp[2][3] << ' ' << ans << '\\n';
    return 0;
}`,
            q: 'Chạy đoạn code QBMAX trên lưới 3x3 toàn số âm ở trên sẽ in ra <code>dp[1][2]</code>, <code>dp[2][3]</code> và <code>ans</code> bằng bao nhiêu?',
            options: [
              'In ra -3 -6 -4 vì kết quả tốt nhất kết thúc tại ô (3, 3) qua đường (2,1)-(3,2)-(3,3)',
              'In ra -2 -5 -3 vì biên hàng 0 và hàng 4 mang giá trị 0 được chọn thay cho số âm',
              'In ra -3 -11 -9 vì đường đi tối ưu bắt buộc đi thẳng theo hàng 1 từ đầu đến cuối',
              'In ra -6 -9 -4 vì ở cột 2 chỉ được đi ngang chứ không được đi chéo từ (2, 1)'
            ],
            correct: 0,
            explain: 'Cột 1: [-4, -1, -5]. Cột 2: dp[1][2]=max(-INF,-4,-1)-2=-3; dp[2][2]=-1-10=-11; dp[3][2]=max(-1,-5,-INF)-2=-3. Cột 3: dp[1][3]=-3-6=-9; dp[2][3]=max(-3,-11,-3)-3=-6; dp[3][3]=-3-1=-4. Max cột 3 = -4. Kết quả: -3 -6 -4.'
          },
          {
            type: 'single',
            q: 'Vì sao trong bài toán <code>QBMAX</code> (tới ô <code>(i, j)</code> từ <code>(i - 1, j - 1)</code>, <code>(i, j - 1)</code>, <code>(i + 1, j - 1)</code>), vòng lặp ngoài bắt buộc phải duyệt cột <code>j</code> trước rồi mới duyệt hàng <code>i</code>?',
            options: [
              'Vì bộ nhớ đệm của vector hai chiều trong C++ luôn sắp xếp các phần tử liên tiếp theo cột',
              'Vì nếu duyệt hàng trước thì mỗi ô ở cột cuối cùng bị cộng trùng tới ba lần liên tiếp',
              'Vì ô (i, j) cần đọc cả dp[i + 1][j - 1] ở hàng dưới nên toàn bộ cột j - 1 phải tính xong trước',
              'Vì đề bài QBMAX chỉ cho phép tính cột chẵn trước rồi mới quay lại tính cột lẻ ở sau'
            ],
            correct: 2,
            explain: 'Do công thức của ô (i, j) đọc tới cả dp[i + 1][j - 1] nằm ở hàng bên dưới của cột trước, toàn bộ cột j - 1 (từ hàng 1 tới n) phải được tính xong hoàn toàn trước khi chuyển sang cột j.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> khi giải bài toán Đếm đường đi trên lưới có vật cản <code>*</code>?',
            options: [
              'Nếu ô xuất phát (1, 1) là vật cản \'*\', ta phải gán dp[1][1] = 0 thay vì gán cứng dp[1][1] = 1',
              'Chỉ cần lấy dư % MOD một lần duy nhất khi in dp[n][m] ở cuối chương trình để chạy nhanh hơn',
              'Khi đọc bản đồ bằng vector&lt;string&gt; g(n) đánh số từ 0, ô (i, j) theo chuẩn 1-based là g[i - 1][j - 1]',
              'Với ô (i, j) là vật cản \'*\', đặt dp[i][j] = 0 để chặn mọi đường đi đi xuyên qua ô đó'
            ],
            correct: [0, 2, 3],
            explain: 'A, C và D đều đúng. B sai: số đường đi tăng theo cấp số mũ (vượt xa giới hạn 64-bit long long) chỉ sau vài chục bước trên lưới lớn, nên bắt buộc phải % MOD ở từng phép cộng trong vòng lặp!'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: TỐI ƯU BỘ NHỚ BẰNG CUỘN MẢNG (ROLLING ARRAY: O(N*M) -> O(M))
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Cuộn Mảng (Rolling Array)',
        title: 'Vấn Đề Nhỏ 3: Tối Ưu Bộ Nhớ Bằng Cuộn Mảng (Rolling Array: $O(N \\cdot M) \\rightarrow O(M)$ RAM)',
        lead: 'Kết nối lại giới hạn bộ nhớ <strong>256 MB</strong> của <code>L1-04</code>: tại sao bảng <code>long long dp[10005][10005]</code> ngốn tới $\\approx 800\\text{ MB}$ và chết vì <strong>MLE</strong>, và làm sao nén xuống chỉ còn <strong>2 hàng</strong> hoặc <strong>1 hàng</strong> mà vẫn giữ nguyên kết quả?',
        subproblem: {
          title: 'Nén bảng DP $N \\times M$ từ $O(N \\cdot M)$ bộ nhớ xuống chỉ còn $O(M)$ bằng kỹ thuật Cuộn mảng (2 hàng <code>prev</code>/<code>cur</code> hoặc 1 hàng tại chỗ), đồng thời nhận diện 2 ranh giới cấm dùng 1 hàng.',
          desc: 'Khi tính các ô ở hàng <code>i</code>, công thức 2D chỉ đọc lại dữ liệu từ <strong>hàng <code>i - 1</code> ngay phía trên</strong> (chưa bao giờ dùng lại hàng <code>i - 2</code> trở về trước). Bằng cách tráo đổi 2 mảng 1 chiều <code>prev</code> và <code>cur</code> (hoặc ghi đè khéo léo trên đúng 1 mảng <code>dp[M + 1]</code>), bộ nhớ RAM sụt giảm hàng nghìn lần!'
        },
        cards: [
          {
            heading: 'Cuộn Mảng 2 Hàng (prev / cur + swap) &amp; Bẫy Quên Reset Hàng Mới',
            tag: '2-Row Rolling &bull; swap()',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tính thử dung lượng RAM như đã học ở <code>L1-04</code>: với lưới $N = 10^4, M = 10^4$, bảng <code>long long dp[10005][10005]</code> tốn $10\,005 \\times 10\,005 \\times 8\\text{ bytes} \\approx 800{,}8\\text{ MB} &gt; 256\\text{ MB}$ &rarr; <strong>MLE ngay lập tức!</strong></p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Chiến lược 2 tấm bảng con (<code>prev</code> &amp; <code>cur</code>):</strong> Thay vì giữ cả $10\,000$ hàng, ta chỉ cầm $2$ mảng 1 chiều cỡ $M + 1$ (chỉ tốn $\\approx 160\\text{ KB}$!): <code>prev</code> giữ kết quả hàng <code>i - 1</code>, <code>cur</code> tính hàng <code>i</code>.</li>
                  <li><strong>Đổi vai $O(1)$ với <code>swap(prev, cur)</code>:</strong> Tính xong hàng <code>i</code>, gọi <code>swap(prev, cur)</code> để <code>cur</code> trở thành <code>prev</code> cho hàng tiếp theo (<code>std::vector::swap</code> chỉ tráo địa chỉ con trỏ trong $O(1)$, không copy dữ liệu!).</li>
                  <li><strong>Bẫy chết người &mdash; Quên đặt lại <code>cur</code> về <code>0</code> / <code>INF</code> sau <code>swap()</code>:</strong> Lúc này <code>cur</code> đang chứa dữ liệu cũ của <strong>hàng <code>i - 2</code></strong>! Nếu ở hàng <code>i</code> bạn viết <code>if (g[i - 1][j - 1] == '*') continue;</code> mà quên <code>fill(cur.begin(), cur.end(), 0);</code> ở đầu hàng, ô vật cản sẽ giữ nguyên số rác từ hàng <code>i - 2</code> tạo ra đường đi ma!</li>
                  <li><strong>Lưu ý đọc input khi lưới lớn:</strong> Nếu đề cho $N \\cdot M$ quá lớn không lưu hết bảng đầu vào, hãy đọc từng hàng <code>i</code> tới đâu, tính <code>cur</code> tới đó rồi bỏ hàng input cũ luôn!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Cuộn Mảng 2 Hàng Đếm Đường Có Vật Cản (O(M) RAM)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 3, m = 3;
    vector&lt;string&gt; grid = {
        "...",
        "...",
        ".*."
    };

    // Chỉ dùng 2 hàng O(M) bộ nhớ (~160 KB nếu M = 10^4)
    vector&lt;long long&gt; prev(m + 1, 0), cur(m + 1, 0);

    for (int i = 1; i &lt;= n; i++) {
        // BẮT BUỘC reset toàn bộ cur về 0 vì swap() vừa đưa rác hàng i - 2 vào cur!
        fill(cur.begin(), cur.end(), 0);
        for (int j = 1; j &lt;= m; j++) {
            if (grid[i - 1][j - 1] == '*') continue;
            if (i == 1 &amp;&amp; j == 1) {
                cur[j] = 1;
            } else {
                cur[j] = (prev[j] + cur[j - 1]) % MOD;
            }
        }
        swap(prev, cur);
    }

    cout &lt;&lt; "So duong (2-row rolling) = " &lt;&lt; prev[m] &lt;&lt; '\\n'; // 3
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cuộn mảng 2 hàng (<code>2-Row Rolling Array</code>):</strong> Chỉ duy trì 2 mảng <code>prev</code> (hàng <code>i - 1</code>) và <code>cur</code> (hàng <code>i</code>), tráo vai bằng <code>swap(prev, cur)</code> sau mỗi hàng để giảm bộ nhớ từ $O(N \\cdot M)$ xuống $O(M)$.</li>
                  <li><strong>Reset bộ đệm (<code>Buffer Reset</code>):</strong> Gọi <code>fill(cur.begin(), cur.end(), 0)</code> (hoặc <code>INF</code>) ở đầu mỗi hàng mới để xóa sạch dữ liệu tồn đọng từ hàng <code>i - 2</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Nén Tiếp Xuống 1 Hàng (1D In-Place) &amp; Hai Ranh Giới Không Thể Dùng 1 Hàng',
            tag: '1-Row DP &bull; Ranh Giới',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Thậm chí ta có thể vứt luôn bảng <code>cur</code>, chỉ giữ <strong>duy nhất 1 mảng <code>vector&lt;long long&gt; dp(M + 1)</code></strong>! Cơ chế hoạt động khi vòng cột <code>j</code> chạy từ trái sang phải ($1 \\rightarrow M$) ở hàng <code>i</code>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Tại sao 1 mảng đọc được cả Ô TRÊN lẫn Ô TRÁI?</strong> Ngay trước khi gán lại <code>dp[j]</code>, ô <code>dp[j]</code> vẫn đang giữ giá trị cũ của <strong>hàng <code>i - 1</code></strong> (chính là <code>up</code>!). Trong khi đó <code>dp[j - 1]</code> vừa mới được cập nhật ở bước <code>j - 1</code> xong, nên nó đang giữ giá trị mới của <strong>hàng <code>i</code></strong> (chính là <code>left</code>!). Với vật cản <code>'*'</code>, bắt buộc gán <code>dp[j] = 0;</code> (tuyệt đối không chỉ <code>continue;</code> vì <code>dp[j]</code> đang giữ giá trị hàng trên!).</li>
                  <li><strong>Ranh giới 1 &mdash; Không dùng 1 hàng khi công thức đọc ô đã/chưa ghi đè chéo (như <code>QBMAX</code>):</strong> Trong <code>QBMAX</code>, khi cập nhật cột <code>j</code> từ <code>i = 1..N</code>, nếu ta dùng 1 cột <code>dp[1..N]</code> ghi đè luôn <code>dp[i]</code>, thì sang hàng <code>i + 1</code> nó sẽ đọc nhầm giá trị <em>mới của cột <code>j</code></em> tại <code>dp[i]</code> thay vì giá trị <em>cũ của cột <code>j - 1</code></em>! Khi đó bắt buộc giữ <strong>2 mảng <code>prev</code> / <code>cur</code></strong>!</li>
                  <li><strong>Ranh giới 2 &mdash; Mất dữ liệu truy vết <code>On-the-fly</code>:</strong> Vì các hàng cũ đã bị ghi đè mất, bạn <strong>không thể</strong> lần ngược trên <code>dp[][]</code> để in đường đi sau khi xong vòng lặp! Nếu bài có ML thấp (như 64 MB) mà bắt truy vết đường đi, hãy dùng cuộn mảng tính DP và lưu riêng bảng hướng gọn nhẹ <code>char dir[N][M]</code> ($1\\text{ byte}$/ô).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Nén 1 Hàng Tại Chỗ Cho Đếm Đường &amp; Tổng Nhỏ Nhất</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long MOD = 1000000007LL;
const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Đếm đường có vật cản bằng đúng 1 mảng dp[1..m]
    int n = 3, m = 3;
    vector&lt;string&gt; grid = {"...", "...", ".*."};
    vector&lt;long long&gt; dpWay(m + 1, 0);
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            if (grid[i - 1][j - 1] == '*') dpWay[j] = 0; // Bắt buộc xóa = 0!
            else if (i == 1 &amp;&amp; j == 1) dpWay[1] = 1;
            else dpWay[j] = (dpWay[j] + dpWay[j - 1]) % MOD;
        }
    }
    cout &lt;&lt; "1-row ways = " &lt;&lt; dpWay[m] &lt;&lt; '\\n'; // 3

    // 2. Đường đi tổng nhỏ nhất bằng đúng 1 mảng dp[1..m]
    vector&lt;vector&lt;long long&gt;&gt; a = {
        {0, 0, 0, 0},
        {0, 5, 1, 2},
        {0, 9, 3, 4},
        {0, 1, 2, 1}
    };
    vector&lt;long long&gt; dpMin(m + 1, INF);
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            if (i == 1 &amp;&amp; j == 1) dpMin[1] = a[1][1];
            else dpMin[j] = min(dpMin[j], dpMin[j - 1]) + a[i][j];
        }
    }
    cout &lt;&lt; "1-row min  = " &lt;&lt; dpMin[m] &lt;&lt; '\\n'; // 12
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cuộn mảng 1 hàng tại chỗ (<code>1-Row In-Place Rolling Array</code>):</strong> Chỉ dùng duy nhất 1 mảng 1 chiều <code>dp[1..M]</code>, tận dụng thứ tự duyệt <code>j = 1..M</code> để <code>dp[j]</code> trước ghi đè đóng vai ô trên, <code>dp[j - 1]</code> sau cập nhật đóng vai ô trái.</li>
                  <li><strong>Xung đột ghi đè (<code>Overwrite Conflict</code>):</strong> Hiện tượng việc ghi đè một ô tại chỗ phá hỏng giá trị cũ mà ô kế tiếp (như <code>i + 1</code> trong <code>QBMAX</code>) còn cần đọc lại &mdash; buộc phải quay về 2 mảng <code>prev</code>/<code>cur</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_rolling_reset',
            title: 'Phòng Thí Nghiệm 3A: Cuộn Mảng 2 Hàng — Bẫy Quên Reset cur Sau swap()',
            desc: 'Trong bài Đếm đường đi có vật cản dùng 2 mảng prev và cur, khi gặp ô vật cản (3, 2) = * lệnh continue sẽ bỏ qua phép gán cur[2]. Thử tắt dòng fill(cur.begin(), cur.end(), 0) để xem rác từ hàng 1 biến thành đường đi ma như thế nào!',
            toggles: [
              {
                key: 'resetMode',
                label: 'Đặt lại mảng cur ở đầu mỗi hàng i',
                options: [
                  { value: 'with_reset', text: 'Gọi fill(cur.begin(), cur.end(), 0); (AC)', kind: 'ok' },
                  { value: 'no_reset', text: 'Chỉ đặt cur[0] = 0, bỏ quên phần còn lại (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.resetMode === 'with_reset';
              const code = `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3, m = 3;
    vector<string> g = {
        "...",
        "...",
        ".*."
    };
    vector<long long> prev(m + 1, 0), cur(m + 1, 0);
    for (int i = 1; i <= n; i++) {
${isOk ? '        fill(cur.begin(), cur.end(), 0);' : '        cur[0] = 0;'}
        for (int j = 1; j <= m; j++) {
            if (g[i - 1][j - 1] == '*') continue;
            if (i == 1 && j == 1) cur[j] = 1;
            else cur[j] = (prev[j] + cur[j - 1]) % MOD;
        }
        swap(prev, cur);
    }
    cout << "prev[2]=" << prev[2] << " prev[3]=" << prev[3] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [17],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): cur[2] được xóa về 0 trước khi tính hàng 3, nên vật cản (3, 2) giữ đúng 0 và kết quả là 3!'
                  : 'DÍNH RÁC HÀNG i - 2 (WA): swap() đưa hàng 1 ([0,1,1,1]) vào cur, khiến ô vật cản (3, 2) còn giữ cur[2]=1 và đẩy đáp án sai lên 4!',
                predictions: [
                  { text: 'In ra prev[2]=0 prev[3]=3 nhờ xóa sạch mảng cur ở đầu mỗi hàng' },
                  { text: 'In ra prev[2]=1 prev[3]=4 vì ô vật cản (3, 2) giữ nhầm giá trị 1 từ hàng 1' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nprev[2]=0 prev[3]=3'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nprev[2]=1 prev[3]=4',
                explain: isOk
                  ? 'Lệnh fill(cur.begin(), cur.end(), 0) đảm bảo mọi ô vật cản (những ô nhảy qua bằng continue) luôn có giá trị 0 sạch sẽ.'
                  : 'Sau khi xong hàng 2, swap(prev, cur) chuyển dữ liệu của hàng 1 ([0, 1, 1, 1]) sang cur. Sang hàng 3, tại ô vật cản (3, 2) lệnh continue bỏ qua việc ghi lại cur[2], làm giá trị 1 cũ trỗi dậy!'
              };
            }
          },
          {
            id: 'sb_1row_overwrite',
            title: 'Phòng Thí Nghiệm 3B: Dùng 2 Cột vs 1 Cột Ghi Đè Tại Chỗ Trong QBMAX',
            desc: 'So sánh dùng 2 cột (prevCol &amp; curCol) với việc cố nén xuống 1 cột dp[] duy nhất trong bài QBMAX đi 3 hướng. Quan sát cách dữ liệu bị ghi đè làm đáp án vọt sai từ 12 lên 15!',
            toggles: [
              {
                key: 'colMode',
                label: 'Số mảng cột khi tối ưu bộ nhớ cho QBMAX',
                options: [
                  { value: 'two_cols', text: '2 cột prevCol &amp; curCol — Không xung đột (AC)', kind: 'ok' },
                  { value: 'one_col_bug', text: '1 cột dp[] cập nhật tại chỗ — Ghi đè chéo (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.colMode === 'two_cols';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3, m = 3;
    vector<vector<long long>> a = {
        {0,  0, 0, 0},
        {0, 10, 1, 1},
        {0,  1, 1, 1},
        {0,  1, 1, 1}
    };
    vector<long long> prevCol(n + 2, -INF), curCol(n + 2, -INF);
    for (int i = 1; i <= n; i++) prevCol[i] = a[i][1];
    for (int j = 2; j <= m; j++) {
        fill(curCol.begin(), curCol.end(), -INF);
        for (int i = 1; i <= n; i++) {
            curCol[i] = max({prevCol[i - 1], prevCol[i], prevCol[i + 1]}) + a[i][j];
        }
        swap(prevCol, curCol);
    }
    long long ans = -INF;
    for (int i = 1; i <= n; i++) ans = max(ans, prevCol[i]);
    cout << "ans=" << ans << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3, m = 3;
    vector<vector<long long>> a = {
        {0,  0, 0, 0},
        {0, 10, 1, 1},
        {0,  1, 1, 1},
        {0,  1, 1, 1}
    };
    vector<long long> dp(n + 2, -INF);
    for (int i = 1; i <= n; i++) dp[i] = a[i][1];
    for (int j = 2; j <= m; j++) {
        for (int i = 1; i <= n; i++) {
            // BẪY GHI ĐÈ: dp[i - 1] vừa bị sửa thành cột j, không còn là cột j - 1!
            dp[i] = max({dp[i - 1], dp[i], dp[i + 1]}) + a[i][j];
        }
    }
    long long ans = -INF;
    for (int i = 1; i <= n; i++) ans = max(ans, dp[i]);
    cout << "ans=" << ans << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [16, 17, 19, 21, 23, 26] : [16, 17, 20, 21, 25],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Giữ nguyên prevCol khi tính curCol nên kết quả đúng là 10 + 1 + 1 = 12!'
                  : 'XUNG ĐỘT GHI ĐÈ CHÉO (WA): dp[1] = 11 đè mất 10, làm dp[2] = 12, dp[3] = 13 rồi cột 3 nhảy tiếp lên 15!',
                predictions: [
                  { text: 'In ra ans=12 vì mọi bước từ cột 1 sang cột 3 chỉ cộng thêm tối đa 2 đơn vị' },
                  { text: 'In ra ans=15 do đọc lại chính giá trị vừa ghi đè trong cùng một cột' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nans=12'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nans=15',
                explain: isOk
                  ? 'Dùng 2 mảng prevCol và curCol tách biệt giữa cột cũ và cột mới giúp mọi ô (i - 1, j - 1), (i, j - 1), (i + 1, j - 1) giữ nguyên vẹn.'
                  : 'Khi cập nhật 1 mảng từ trên xuống dưới, dp[1] mới (= 11) lập tức được dp[2] cộng thêm 1 thành 12 (đi dọc xuống trong cùng 1 cột!), rồi dp[3] thành 13, sai hoàn toàn luật đi!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3, m = 3;
    vector<string> g = {
        "...",
        ".*.",
        "..."
    };
    vector<long long> prev(m + 1, 0), cur(m + 1, 0);
    for (int i = 1; i <= n; i++) {
        fill(cur.begin(), cur.end(), 0);
        for (int j = 1; j <= m; j++) {
            if (g[i - 1][j - 1] == '*') continue;
            if (i == 1 && j == 1) cur[j] = 1;
            else cur[j] = (prev[j] + cur[j - 1]) % MOD;
        }
        swap(prev, cur);
    }
    cout << prev[1] << ' ' << prev[2] << ' ' << prev[3] << '\\n';
    return 0;
}`,
            q: 'Đoạn code Cuộn mảng 2 hàng cho lưới 3x3 có vật cản ở tâm <code>(2, 2)</code> sẽ in ra ba giá trị cuối cùng <code>prev[1]</code>, <code>prev[2]</code>, <code>prev[3]</code> là gì?',
            options: [
              'In ra 1 2 3 vì ô (2, 2) bị bỏ qua nhưng cur[2] vẫn giữ giá trị 1 từ hàng 1',
              'In ra 1 1 2 vì ở hàng 3, prev[2]=0 nên cur[2]=1 và cur[3]=prev[3]+cur[2]=2',
              'In ra 1 0 1 vì sau lệnh swap(prev, cur) ở hàng 3 thì mảng prev bị xóa về 0',
              'In ra 1 1 3 vì ô (3, 3) nhận được cả ba hướng từ hàng trên và góc chéo trái'
            ],
            correct: 1,
            explain: 'Sau hàng 1: prev=[0,1,1,1]. Sau hàng 2 (có * tại (2,2)): prev=[0,1,0,1]. Sang hàng 3: cur[1]=1, cur[2]=prev[2]+cur[1]=0+1=1, cur[3]=prev[3]+cur[2]=1+1=2; rồi swap cho prev=[0,1,1,2]. In ra: 1 1 2.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3, m = 3;
    vector<vector<long long>> a = {
        {0, 0, 0, 0},
        {0, 3, 2, 5},
        {0, 4, 1, 6},
        {0, 7, 2, 1}
    };
    vector<long long> dp(m + 1, INF);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) dp[1] = a[1][1];
            else dp[j] = min(dp[j], dp[j - 1]) + a[i][j];
        }
    }
    cout << dp[1] << ' ' << dp[2] << ' ' << dp[3] << '\\n';
    return 0;
}`,
            q: 'Chạy đoạn code nén 1 hàng tại chỗ tìm tổng đường đi nhỏ nhất trên lưới 3x3 ở trên sẽ in ra <code>dp[1]</code>, <code>dp[2]</code>, <code>dp[3]</code> bằng bao nhiêu?',
            options: [
              'In ra 14 16 17 vì trên hàng 3 chỉ được phép cộng nối tiếp từ trái sang phải',
              'In ra 7 6 12 vì kết quả in ra chính là trạng thái sau khi kết thúc hàng thứ 2',
              'In ra 14 8 13 vì tại j = 3 của hàng 3 lấy min(dp[3]=12, dp[2]=8) + 5',
              'In ra 14 8 9 vì tại hàng 3, dp[2]=min(6,14)+2=8 và dp[3]=min(12,8)+1=9'
            ],
            correct: 3,
            explain: 'Hàng 1: [INF, 3, 5, 10]. Hàng 2: dp[1]=7, dp[2]=min(5,7)+1=6, dp[3]=min(10,6)+6=12. Hàng 3: dp[1]=7+7=14, dp[2]=min(6,14)+2=8, dp[3]=min(12,8)+1=9. In ra: 14 8 9.'
          },
          {
            type: 'single',
            q: 'Tại sao trong bài toán <code>QBMAX</code> (tính cột <code>j</code> từ <code>i - 1</code>, <code>i</code>, <code>i + 1</code> của cột <code>j - 1</code>), ta KHÔNG được nén xuống đúng 1 mảng <code>dp[1..N]</code> cập nhật từ trên xuống dưới?',
            options: [
              'Vì khi gán dp[i] xong thì bước i + 1 sẽ đọc nhầm giá trị mới của cột j thay vì cột j - 1',
              'Vì hàm max() chỉ so sánh được tối đa hai phần tử nếu mảng dp chỉ có một chiều',
              'Vì mảng 1 chiều không cho phép đặt lính canh -INF ở vị trí đầu và vị trí cuối bảng',
              'Vì kích thước N hàng luôn lớn hơn nhiều lần trần 256 MB ngay cả khi dùng một cột'
            ],
            correct: 0,
            explain: 'Khi cập nhật dp[i] cho cột j ngay trên mảng 1D theo thứ tự i = 1..N, sang hàng i + 1 biểu thức dp[i] sẽ trả về kết quả mới của cột j chứ không phải cột j - 1 nữa, làm robot đi thẳng dọc xuống trong cùng cột!'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về kỹ thuật Cuộn mảng (Rolling Array) tối ưu bộ nhớ?',
            options: [
              'Với N = 10^4, M = 10^4, bảng long long dp[10005][10005] tốn khoảng 800 MB vượt trần 256 MB nên bị MLE',
              'Khi dùng cuộn mảng 2 hàng prev/cur, phải reset mảng cur về 0 (hoặc INF) ở mỗi hàng vì swap đã đưa dữ liệu hàng i - 2 vào cur',
              'Nếu chỉ giữ 1 mảng dp(M + 1) để tiết kiệm RAM, ta mất dữ liệu các hàng cũ nên không truy vết ngược trực tiếp trên dp[][] được',
              'Lệnh swap(prev, cur) trên hai vector cỡ M phải sao chép toàn bộ M phần tử nên tốn thời gian O(M)'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều đúng. D sai: std::vector::swap chỉ tráo đổi 3 con trỏ nội bộ của vector nên độ phức tạp luôn là O(1), không copy từng phần tử!'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l207_border_zero',
        title: 'Khởi Tạo Bảng DP Bằng 0 Thay Vì INF Khi Tìm Tổng Đường Đi Nhỏ Nhất (WA)',
        description: 'Chương trình tìm tổng đường đi nhỏ nhất từ (1, 1) đến (n, m) trên lưới n x m (chỉ đi Phải hoặc Xuống). Với lưới 3x3 gồm {5 1 2 / 9 3 4 / 1 2 1}, đáp án đúng là 12, nhưng code lại in ra 4 do kéo nhầm số 0 từ hàng 0 và cột 0!',
        failingInput: '3 3\n5 1 2\n9 3 4\n1 2 1',
        failingOutput: '4',
        expectedOutput: '12',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m;
    cin >> n >> m;
    vector<vector<long long>> a(n + 1, vector<long long>(m + 1));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) cin >> a[i][j];
    }
    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, 0));
    dp[1][1] = a[1][1];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) continue;
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + a[i][j];
        }
    }
    cout << dp[n][m] << '\\n';
    return 0;
}`,
        bugLine: 15,
        patches: [
          { text: 'Đổi dòng 15 thành vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, INF));' },
          { text: 'Đổi dòng 16 thành dp[1][1] = 0;' },
          { text: 'Đổi dòng 20 thành dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) + a[i][j];' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 15, khởi tạo dp bằng 0 làm hàng 0 và cột 0 mang giá trị 0, khiến min(dp[i - 1][j], dp[i][j - 1]) ở hàng 1 và cột 1 kéo nhầm 0 từ ngoài bản đồ vào! Đổi thành INF giữ biên ngoài làm tường chắn chuẩn xác.'
      },
      {
        id: 'dbg_l207_blocked_origin',
        title: 'Gán Cứng dp[1][1] = 1 Bất Chấp Ô Xuất Phát (1, 1) Là Vật Cản * (WA)',
        description: 'Chương trình đếm số đường đi từ (1, 1) đến (n, m) tránh ô vật cản * modulo 10^9 + 7. Với bản đồ 3x3 mà ngay ô xuất phát (1, 1) bị chặn bởi *, đáp án đúng phải là 0, nhưng chương trình lại in ra tới 6!',
        failingInput: '3 3\n*..\n...\n...',
        failingOutput: '6',
        expectedOutput: '0',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m;
    cin >> n >> m;
    vector<string> g(n);
    for (int i = 0; i < n; i++) cin >> g[i];
    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, 0));
    dp[1][1] = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) continue;
            if (g[i - 1][j - 1] == '*') dp[i][j] = 0;
            else dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
        }
    }
    cout << dp[n][m] << '\\n';
    return 0;
}`,
        bugLine: 14,
        patches: [
          { text: 'Đổi dòng 19 thành else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];' },
          { text: 'Đổi dòng 14 thành if (g[0][0] != \'*\') dp[1][1] = 1;' },
          { text: 'Đổi dòng 18 thành if (g[i][j] == \'*\') dp[i][j] = 0;' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 14, gán cứng dp[1][1] = 1 mà không kiểm tra g[0][0] == \'*\', sau đó dòng 17 lại continue bỏ qua ô (1, 1) khiến hố bẫy ở điểm xuất phát vẫn tạo ra đường đi ma! Thêm điều kiện if (g[0][0] != \'*\') giải quyết dứt điểm cả lưới 1x1.'
      },
      {
        id: 'dbg_l207_rolling_reset',
        title: 'Quên Reset Toàn Bộ Mảng cur Sau swap() Trong Cuộn Mảng 2 Hàng (WA)',
        description: 'Chương trình đếm số đường đi có vật cản * bằng Cuộn mảng 2 hàng prev và cur. Với lưới 3x3 có vật cản tại (3, 2), đáp án đúng là 3, nhưng chương trình lại in ra 4 vì để sót giá trị hàng 1 trong mảng cur!',
        failingInput: '3 3\n...\n...\n.*.',
        failingOutput: '4',
        expectedOutput: '3',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m;
    cin >> n >> m;
    vector<string> g(n);
    for (int i = 0; i < n; i++) cin >> g[i];
    vector<long long> prev(m + 1, 0), cur(m + 1, 0);
    for (int i = 1; i <= n; i++) {
        cur[0] = 0;
        for (int j = 1; j <= m; j++) {
            if (g[i - 1][j - 1] == '*') continue;
            if (i == 1 && j == 1) cur[j] = 1;
            else cur[j] = (prev[j] + cur[j - 1]) % MOD;
        }
        swap(prev, cur);
    }
    cout << prev[m] << '\\n';
    return 0;
}`,
        bugLine: 15,
        patches: [
          { text: 'Đổi dòng 21 thành swap(cur[0], prev[0]);' },
          { text: 'Đổi dòng 18 thành if (i == 1 && j == 1) cur[j] = 0;' },
          { text: 'Đổi dòng 15 thành fill(cur.begin(), cur.end(), 0);' }
        ],
        correctPatch: 2,
        explain: 'Ở dòng 15, chỉ gán cur[0] = 0 mà quên reset các ô 1..m của cur sau lệnh swap(prev, cur)! Sang hàng 3, mảng cur đang giữ dữ liệu của hàng 1, nên khi gặp vật cản * và chạy continue ở dòng 17, cur[2] vẫn giữ nhầm giá trị 1 làm đáp án tăng từ 3 thành 4.'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — L2-07)
    // ============================================================================
    practiceProblems: [
      {
        id: 'CSES-1638',
        title: 'Grid Paths',
        judge: 'CSES',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1638',
        hint: 'Giới hạn $1 \\le n \\le 1000$, TL 1.00s, ML 512 MB, modulo $10^9 + 7$. Bài đếm đường đi có bẫy <code>*</code> chuẩn mực nhất: kiểm tra vật cản <strong>trước</strong> khi đặt <code>dp[1][1] = 1</code> để không bị WA khi ô <code>(1, 1)</code> hoặc <code>(n, n)</code> là <code>*</code>, và nhớ lấy <code>% MOD</code> sau mỗi phép cộng!'
      },
      {
        id: 'DP-H',
        title: 'H - Grid 1',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/dp/tasks/dp_h',
        hint: 'Giới hạn $2 \\le H, W \\le 1000$, TL 2.0s, ML 1024 MB, tường <code>#</code>, modulo $10^9 + 7$. Khác CSES ở kích thước hình chữ nhật $H \\times W$: hãy luyện viết bằng cả bảng 2D <code>dp[H + 1][W + 1]</code> lẫn phiên bản nén 1 hàng <code>vector&lt;long long&gt; dp(W + 1, 0)</code>!'
      },
      {
        id: 'LC-64',
        title: '64. Minimum Path Sum',
        judge: 'LeetCode',
        tier: 1,
        link: 'https://leetcode.com/problems/minimum-path-sum/',
        hint: 'Giới hạn $1 \\le m, n \\le 200$, $0 \\le \\text{grid}[i][j] \\le 200$. Bài toán tìm đường đi tổng nhỏ nhất từ góc trên trái đến góc dưới phải (đi Phải/Xuống): đặt biên lính canh <code>INF = 1e18</code>, neo <code>dp[1][1] = grid[0][0]</code> rồi thử nén xuống mảng 1 chiều $O(n)$ bộ nhớ!'
      },
      {
        id: 'ABC232-D',
        title: 'D - Weak Takahashi',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc232/tasks/abc232_d',
        hint: 'Giới hạn $1 \\le H, W \\le 100$, TL 2.0s, ML 1024 MB, luôn có <code>C[1][1] = \'.\'</code>. Xuất phát từ <code>(1, 1)</code> đi Phải hoặc Xuống tránh tường <code>#</code> để thăm được <strong>nhiều ô nhất</strong> (được dừng ở bất kỳ đâu). Nếu viết Pull DP xuôi: phải khởi tạo bảng toàn <code>-INF</code>, đặt <code>dp[1][1] = 1</code> để các ô kẹt sau tường không tự nhận giá trị dương giả!'
      },
      {
        id: 'VNOJ-QBMAX',
        title: 'Đường đi có tổng lớn nhất (QBMAX)',
        judge: 'VNOJ',
        tier: 2,
        link: 'https://oj.vnoi.info/problem/qbmax',
        hint: 'Giới hạn $1 \\le m, n \\le 100$, $|a_{ij}| \\le 100$ (<strong>có số âm!</strong>), TL 1.0s, ML 1536 MB. Xuất phát ở cột $1$ bất kỳ, đi $3$ hướng sang cột $j + 1$ tới cột $n$: bắt buộc duyệt <strong>cột <code>j</code> ở ngoài, hàng <code>i</code> ở trong</strong>, lót biên kép hàng $0$ và hàng $m + 1$ bằng <code>-INF</code>, và nếu cuộn mảng phải dùng <strong>2 cột</strong>!'
      },
      {
        id: 'VNOJ-QBSQUARE',
        title: 'Hình vuông 0 1 (QBSQUARE)',
        judge: 'VNOJ',
        tier: 2,
        link: 'https://oj.vnoi.info/problem/qbsquare',
        hint: 'Giới hạn $1 \\le M, N \\le 1000$, ô chứa <code>0</code> hoặc <code>1</code>, TL 1.0s, ML 1536 MB. Gọi <code>dp[i][j]</code> là cạnh hình vuông đồng nhất lớn nhất nhận <code>(i, j)</code> làm góc dưới phải: nếu <code>a[i][j]</code> trùng với cả $3$ ô <code>(i-1, j)</code>, <code>(i, j-1)</code>, <code>(i-1, j-1)</code> thì <code>dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]})</code>, ngược lại bằng <code>1</code>. Thử tối ưu bằng cuộn mảng 2 hàng $O(N)$ RAM!'
      },
      {
        id: 'CF-1695C',
        title: '1695C - Zero Path',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/1695/C',
        hint: 'Giới hạn $1 \\le n, m \\le 1000$, $\\sum n \\cdot m \\le 10^6$, ô chứa <code>1</code> hoặc <code>-1</code>, TL 2.0s, ML 256 MB. Mọi đường đi từ <code>(1, 1)</code> đến <code>(n, m)</code> đều qua đúng $n + m - 1$ ô nên nếu $n + m - 1$ lẻ thì đáp án là <code>NO</code> ngay lập tức. Khi chẵn, dùng DP lưới tính song song tổng nhỏ nhất <code>mn[i][j]</code> và lớn nhất <code>mx[i][j]</code>: đáp án là <code>YES</code> khi và chỉ khi <code>mn &lt;= 0 &amp;&amp; 0 &lt;= mx</code>!'
      },
      {
        id: 'CF-2B',
        title: '2B - The least round way',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/2/B',
        hint: 'Giới hạn $2 \\le n \\le 1000$, $0 \\le a_{ij} \\le 10^9$, TL 2.0s, <strong>ML chỉ 64 MB!</strong> Chạy 2 lần DP lưới tối thiểu hóa số thừa số $2$ và thừa số $5$ trên đường đi, cẩn thận bẫy ô chứa số $0$ (đi qua số $0$ luôn cho tích $0$ có $1$ số $0$ tận cùng!). Do RAM chỉ $64\\text{ MB}$, hãy dùng cuộn mảng $O(n)$ cho bảng <code>dp</code> và lưu riêng mảng hướng gọn nhẹ <code>char dir[1005][1005]</code> (~$1\\text{ MB}$) để truy vết chuỗi <code>\'D\'</code>/<code>\'R\'</code>!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
