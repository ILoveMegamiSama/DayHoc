/**
 * DỮ LIỆU BÀI GIẢNG L2-09: DP DÃY CON, XÂU & MÁY TRẠNG THÁI CƠ BẢN (TỐT NGHIỆP TẦNG 2)
 * Tầng 2 — Pha 2 STL Lớp 9 (Nối tiếp từ L2-06, L2-07, L2-08)
 * Mở khóa:
 * - Dãy con tăng dài nhất (LIS) trong O(N^2): trạng thái dp[i] kết thúc TẠI vị trí i (khởi tạo 1),
 *   phân biệt tăng ngặt (<) vs không giảm (<=), bẫy kinh điển in dp[n] thay vì *max_element toàn mảng,
 *   và Truy vết dãy con bằng mảng trace[i] + sentinel -1 + reverse().
 * - DP Hai Tiền Tố Trên Xâu: Bảng 2D (n + 1) x (m + 1) cho LCS (biên 0, đi chéo + 1, truy vết in xâu)
 *   và Edit Distance (CSES-1639: biên bắt buộc dp[i][0] = i, dp[0][j] = j, 3 nhánh min Xóa/Chèn/Thay).
 * - DP Máy Trạng Thái Theo Ngày (AtCoder DP-C Vacation, CF-698A Vacations): chiều trạng thái phụ dp[i][state]
 *   chặn lặp hành động liền kề, cùng Bản Đồ Tổng Hợp 4 Nhóm DP Chuẩn HSG Lớp 9 & gợi mở nhánh Mở rộng (MOD-02, MOD-04).
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'dp_day_con_xau',
    number: 'Bài Học L2-09',
    shortTitle: 'DP Dãy Con, Xâu & Trạng Thái',
    title: 'Bài L2-09: DP Dãy Con, Xâu &amp; Máy Trạng Thái Cơ Bản',
    lead: 'Cột mốc <strong>Tốt nghiệp Tầng 2 Lớp 9</strong>! Từ nền tảng <code>L2-06</code> &rarr; <code>L2-08</code>, chúng ta hoàn thiện bộ 3 khuôn mẫu DP kinh điển cuối cùng: <strong>Dãy con tăng dài nhất (<code>LIS</code> $O(N^2)$ &amp; truy vết)</strong>, <strong>Bảng hai tiền tố xâu (<code>LCS</code> &amp; <code>Edit Distance</code>)</strong>, và <strong>DP Máy trạng thái (<code>dp[i][state]</code>)</strong> &mdash; đồng thời ghép trọn <strong>Bản đồ 4 Nhóm DP Chuẩn HSG Lớp 9</strong>!',
    modules: [
      // ============================================================================
      // MODULE 1: DÃY CON TĂNG DÀI NHẤT (LIS O(N^2)) & TRUY VẾT DÃY
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'LIS O(N^2) & Truy Vết',
        title: 'Vấn Đề Nhỏ 1: Dãy Con Tăng Dài Nhất (<code>LIS</code> $O(N^2)$) &amp; Truy Vết Dãy',
        lead: 'Tại sao ta không thể đặt <code>dp[i]</code> là "LIS trong đoạn <code>1..i</code>" rồi lấy <code>dp[n]</code>, mà bắt buộc ép <code>dp[i]</code> phải <strong>kết thúc ĐÚNG TẠI vị trí <code>i</code></strong> &mdash; và tại sao in <code>dp[n]</code> lại là cái bẫy WA phổ biến nhất?',
        subproblem: {
          title: 'Định nghĩa chuẩn <code>dp[i]</code> cho bài toán Dãy con tăng dài nhất ($N \\le 1000$), phân biệt tăng ngặt <code>&lt;</code> vs không giảm <code>&lt;=</code>, tìm nghiệm trên toàn mảng và truy vết dãy con.',
          desc: 'Khác với đoạn con liên tiếp (<code>L2-01</code>), <strong>dãy con (subsequence)</strong> giữ nguyên thứ tự trước-sau nhưng được phép nhảy cóc bỏ qua phần tử xen giữa. Dùng Quay lui (<code>L2-04</code>) thử chọn/bỏ từng phần tử mất $O(2^N)$ sẽ <strong>TLE</strong> ngay khi $N = 1000$. Ép trạng thái <code>dp[i]</code> kết thúc tại <code>a[i]</code> biến bài toán về bảng $O(N^2)$ kèm mảng <code>trace[i]</code> cực gọn.'
        },
        cards: [
          {
            heading: 'Định Nghĩa <code>dp[i]</code> Kết Thúc Tại <code>i</code>, Dấu <code>&lt;</code> vs <code>&lt;=</code> &amp; Bẫy In <code>dp[n]</code>',
            tag: 'LIS O(N^2) &bull; max(dp)',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Bạn xếp một hàng $N$ cột gỗ có độ cao $a_1, a_2, \\dots, a_N$. Bạn muốn chọn ra nhiều cột nhất theo thứ tự từ trái sang phải (được quyền bỏ bớt cột vướng ở giữa) sao cho cột chọn sau <strong>cao hơn hẳn</strong> cột chọn trước.</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Vì sao KHÔNG định nghĩa <code>dp[i]</code> = "LIS trong $i$ cột đầu tiên"?</strong> Nếu chỉ biết trong $5$ cột đầu có một dãy dài $3$ mà quên mất <em>cột cuối cùng của dãy đó cao bao nhiêu</em>, sang cột thứ $6$ bạn không thể biết có ghép tiếp được hay không!</li>
                  <li><strong>Định nghĩa chuẩn (Neo phần tử cuối):</strong> <code>dp[i]</code> là <em>độ dài dãy con tăng dài nhất <strong>KẾT THÚC ĐÚNG TẠI cột <code>i</code></strong> (bắt buộc lấy <code>a[i]</code> làm cột cuối)</em>.</li>
                  <li><strong>Khởi tạo &amp; Công thức:</strong> Mọi cột đứng một mình đã tạo thành dãy dài $1$, nên ban đầu đặt <strong><code>dp[i] = 1</code></strong>. Xét mọi cột đứng trước $j \\lt i$: nếu <code>a[j] &lt; a[i]</code>, nối cột $i$ vào sau dãy kết thúc tại $j$: <code>dp[i] = max(dp[i], dp[j] + 1)</code>.</li>
                  <li><strong>Phân biệt Tăng ngặt vs Không giảm:</strong> Dãy tăng ngặt ($a_j \\lt a_i$) dùng <code>&lt;</code> (với <code>{3, 3, 5}</code> ra <code>2</code>); dãy không giảm ($a_j \\le a_i$) đổi thành <code>&lt;=</code> (với <code>{3, 3, 5}</code> ra <code>3</code>).</li>
                  <li><strong>Bẫy chết người &mdash; Đáp án KHÔNG nằm ở <code>dp[n]</code>!</strong> Với dãy <code>{4, 2, 6, 3, 8, 1}</code>, phần tử cuối <code>a[6] = 1</code> rất nhỏ nên <code>dp[6] = 1</code>, trong khi dãy dài nhất <code>4 &rarr; 6 &rarr; 8</code> kết thúc ở vị trí $5$ (<code>dp[5] = 3</code>)! Bắt buộc lấy <strong><code>*max_element(dp.begin() + 1, dp.end())</code></strong>.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: LIS O(N^2) Chuẩn CP C++14 (So Sánh *max_element vs dp[n])</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;long long&gt; a = {0, 4, 2, 6, 3, 8, 1}; // 1-based, n = 6
    int n = (int)a.size() - 1;
    vector&lt;int&gt; dp(n + 1, 1); // Khởi tạo mọi vị trí đều tối thiểu dài 1

    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt; i; j++) {
            if (a[j] &lt; a[i]) { // Đổi thành &lt;= nếu đề hỏi dãy không giảm
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }

    int ans = *max_element(dp.begin() + 1, dp.end());
    cout &lt;&lt; "LIS max = " &lt;&lt; ans &lt;&lt; " | dp[n] = " &lt;&lt; dp[n] &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Dãy con (<code>Subsequence</code>) vs Đoạn con liên tiếp (<code>Subarray</code>):</strong> Dãy con giữ nguyên thứ tự trái-phải nhưng được bỏ bớt phần tử xen giữa; đoạn con bắt buộc các phần tử nằm sát nhau.</li>
                  <li><strong>Dãy con tăng dài nhất (<code>Longest Increasing Subsequence — LIS</code>):</strong> Mô hình DP $O(N^2)$ với trạng thái neo điểm kết thúc <code>dp[i]</code>, cho phép kiểm tra trực tiếp <code>a[j] &lt; a[i]</code> và tìm max toàn mảng.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Truy Vết Dãy Con Tăng Bằng Mảng <code>trace[i]</code> &amp; <code>reverse()</code>',
            tag: 'Truy Vết &bull; bestPos',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Nhiều bài HSG không chỉ hỏi độ dài lớn nhất bằng bao nhiêu, mà bắt in ra <strong>chính xác từng phần tử của dãy con tăng đó</strong>. Áp dụng nguyên lý sổ tay truy vết từ <code>L2-06</code>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Ghi lại "người đứng ngay trước":</strong> Tạo mảng <code>trace(n + 1, -1)</code>. Giá trị chốt <code>-1</code> có nghĩa là <em>"tôi là điểm khởi đầu của dãy, không nối sau ai cả"</em>.</li>
                  <li><strong>Chỉ ghi khi phá kỷ lục:</strong> Ở vòng lặp trong khi thấy <code>a[j] &lt; a[i] &amp;&amp; dp[j] + 1 &gt; dp[i]</code>, ta vừa cập nhật <code>dp[i] = dp[j] + 1</code>, vừa ghi <code>trace[i] = j</code>.</li>
                  <li><strong>Điểm xuất phát truy vết là <code>bestPos</code> (KHÔNG phải <code>n</code>!):</strong> Quét $i = 1..N$ tìm chỉ số <code>bestPos</code> có <code>dp[bestPos]</code> lớn nhất. Bắt đầu từ <code>cur = bestPos</code>, lặp <code>while (cur != -1)</code> đẩy <code>a[cur]</code> vào mảng <code>seq</code> rồi nhảy <code>cur = trace[cur]</code>. Cuối cùng gọi <code>reverse(seq.begin(), seq.end())</code> để lật lại đúng chiều xuôi!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Truy Vết Đầy Đủ Dãy Con Tăng Dài Nhất (C++14)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;long long&gt; a = {0, 4, 2, 6, 3, 8, 1};
    int n = (int)a.size() - 1;
    vector&lt;int&gt; dp(n + 1, 1), trace(n + 1, -1);

    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt; i; j++) {
            if (a[j] &lt; a[i] &amp;&amp; dp[j] + 1 &gt; dp[i]) {
                dp[i] = dp[j] + 1;
                trace[i] = j;
            }
        }
    }

    int bestPos = 1;
    for (int i = 2; i &lt;= n; i++) {
        if (dp[i] &gt; dp[bestPos]) bestPos = i;
    }

    vector&lt;long long&gt; seq;
    for (int cur = bestPos; cur != -1; cur = trace[cur]) {
        seq.push_back(a[cur]);
    }
    reverse(seq.begin(), seq.end());

    cout &lt;&lt; "Len = " &lt;&lt; seq.size() &lt;&lt; " | Day:";
    for (long long x : seq) cout &lt;&lt; ' ' &lt;&lt; x;
    cout &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Vị trí kết thúc tối ưu (<code>bestPos</code>):</strong> Chỉ số đạt <code>max(dp[1..n])</code> dùng làm điểm xuất phát khi lần ngược mảng <code>trace[]</code>, tránh bẫy xuất phát nhầm từ <code>n</code>.</li>
                  <li><strong>Chốt chặn <code>-1</code> (<code>Sentinel -1</code>):</strong> Dấu hiệu kết thúc vòng lặp truy vết giúp nhận biết phần tử đầu tiên của dãy con tăng.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_lis_ans_trap',
            title: 'Phòng Thí Nghiệm 1A: Kết Quả LIS — Quét Max Toàn Mảng vs Bẫy In dp[n]',
            desc: 'Với dãy a = {10, 20, 30, 5} (n = 4), phần tử cuối cùng 5 làm kết thúc cho dãy cụt. Hãy thử đổi cách lấy kết quả cuối cùng giữa *max_element và dp[n]!',
            toggles: [
              {
                key: 'ansMode',
                label: 'Biểu thức lấy kết quả độ dài LIS cuối cùng',
                options: [
                  { value: 'max_all', text: '*max_element(dp.begin() + 1, dp.end()) — Quét toàn mảng (AC)', kind: 'ok' },
                  { value: 'only_n', text: 'dp[n] — Tưởng dp[n] chứa cả dãy 1..n (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.ansMode === 'max_all';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {0, 10, 20, 30, 5};
    int n = 4;
    vector<int> dp(n + 1, 1);
    for (int i = 1; i <= n; i++)
        for (int j = 1; j < i; j++)
            if (a[j] < a[i]) dp[i] = max(dp[i], dp[j] + 1);
${isOk ? '    int ans = *max_element(dp.begin() + 1, dp.end());' : '    int ans = dp[n];'}
    cout << "LIS = " << ans << " (dp[4]=" << dp[4] << ")\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [13],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Quét max trên dp[1..4] bắt trúng kỷ lục dp[3] = 3 từ dãy {10, 20, 30}!'
                  : 'MẤT NGHIỆM GIỮA MẢNG (WA): Phần tử a[4] = 5 không nối được vào đâu nên dp[4] chỉ bằng 1!',
                predictions: [
                  { text: 'In ra LIS = 3 (dp[4]=1) vì dãy tăng dài nhất kết thúc tại vị trí 3' },
                  { text: 'In ra LIS = 1 (dp[4]=1) vì chỉ đọc mỗi ô cuối cùng của mảng dp' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nLIS = 3 (dp[4]=1)'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nLIS = 1 (dp[4]=1)',
                explain: isOk
                  ? 'Mảng dp lần lượt là [?, 1, 2, 3, 1]. Vì dp[i] định nghĩa "kết thúc TẠI i", dãy tốt nhất có thể nằm ở bất kỳ vị trí nào trước n, bắt buộc phải lấy max toàn mảng.'
                  : 'dp[4] chỉ đo độ dài dãy tăng kết thúc tại số 5 cuối mảng (chỉ có chính số 5 nên dài 1), bỏ rơi hoàn toàn dãy {10, 20, 30} đã đạt được ở dp[3]!'
              };
            }
          },
          {
            id: 'sb_lis_init_zero',
            title: 'Phòng Thí Nghiệm 1B: Khởi Tạo dp[i] = 1 vs Bẫy Để Mặc Định dp[i] = 0',
            desc: 'Trên dãy a = {2, 5, 3, 7}, LIS chuẩn là 3 ({2, 5, 7} hoặc {2, 3, 7}). Thử đổi giá trị khởi tạo ban đầu của mảng dp từ 1 xuống 0 để xem cả bảng bị hụt đi 1 đơn vị ra sao!',
            toggles: [
              {
                key: 'initVal',
                label: 'Giá trị khởi tạo ban đầu cho mọi ô dp[1..n]',
                options: [
                  { value: 'one', text: 'vector&lt;int&gt; dp(n + 1, 1) — Độ dài dãy 1 phần tử (AC)', kind: 'ok' },
                  { value: 'zero', text: 'vector&lt;int&gt; dp(n + 1, 0) — Quen tay khởi tạo bằng 0 (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.initVal === 'one';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {0, 2, 5, 3, 7};
    int n = 4;
${isOk ? '    vector<int> dp(n + 1, 1);' : '    vector<int> dp(n + 1, 0);'}
    for (int i = 1; i <= n; i++)
        for (int j = 1; j < i; j++)
            if (a[j] < a[i]) dp[i] = max(dp[i], dp[j] + 1);
    cout << "Max LIS = " << *max_element(dp.begin() + 1, dp.end()) << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [9],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Khởi tạo 1 cho phép mỗi phần tử tự tính 1 bước, ra chuẩn Max LIS = 3!'
                  : 'HỤT 1 ĐƠN VỊ TOÀN BẢNG (WA): Khởi tạo 0 khiến mọi dãy đều bị đếm số bước nối thay vì số phần tử, tụt xuống 2!',
                predictions: [
                  { text: 'In ra Max LIS = 3 vì phần tử đầu dãy đã tính độ dài bằng 1' },
                  { text: 'In ra Max LIS = 2 vì thiếu độ dài 1 ở điểm bắt đầu của mỗi dãy' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nMax LIS = 3'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nMax LIS = 2',
                explain: isOk
                  ? 'Với dp khởi tạo bằng 1: dp[1]=1, dp[2]=2, dp[3]=2, dp[4]=3. Kết quả đúng là 3 (cả trường hợp n = 1 cũng trả về 1).'
                  : 'Với dp khởi tạo bằng 0: dp[1]=0, dp[2]=1, dp[3]=1, dp[4]=2. Thậm chí với mảng giảm dần hay n = 1, kết quả bị tụt về 0 sai hoàn toàn!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {0, 5, 2, 6, 3, 8, 1};
    int n = 6;
    vector<int> dp(n + 1, 1);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j < i; j++) {
            if (a[j] < a[i]) dp[i] = max(dp[i], dp[j] + 1);
        }
    }
    cout << dp[4] << ' ' << dp[6] << ' ' << *max_element(dp.begin() + 1, dp.end()) << '\\n';
    return 0;
}`,
            q: 'Khi chạy đoạn code LIS trên với <code>a = {0, 5, 2, 6, 3, 8, 1}</code>, kết quả in ra màn hình là gì?',
            options: [
              'In ra 1 3 3 vì phần tử 1 đứng cuối nối tiếp sau phần tử 3 ở vị trí thứ 4',
              'In ra 2 2 3 vì dp[6] kế thừa giá trị từ dãy con tăng nhỏ hơn đứng phía trước',
              'In ra 2 1 3 vì dp[4]=2 từ (2, 3), dp[6]=1 và giá trị max toàn mảng bằng 3',
              'In ra 3 1 3 vì a[4]=3 được nối ngay sau hai phần tử đầu tiên là 5 và 2'
            ],
            correct: 2,
            explain: 'Tính từng vị trí: dp[1]=1 (5), dp[2]=1 (2), dp[3]=2 (5,6), dp[4]=2 (2,3), dp[5]=3 (5,6,8), dp[6]=1 (không có số nào đứng trước nhỏ hơn 1). Vậy dp[4]=2, dp[6]=1, max=3. In ra: 2 1 3.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {0, 3, 8, 4, 9, 2};
    int n = 5;
    vector<int> dp(n + 1, 1), trace(n + 1, -1);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j < i; j++) {
            if (a[j] < a[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                trace[i] = j;
            }
        }
    }
    int bestPos = 1;
    for (int i = 2; i <= n; i++) if (dp[i] > dp[bestPos]) bestPos = i;
    vector<int> seq;
    for (int cur = bestPos; cur != -1; cur = trace[cur]) seq.push_back(a[cur]);
    reverse(seq.begin(), seq.end());
    cout << seq.size() << ":";
    for (int x : seq) cout << ' ' << x;
    cout << '\\n';
    return 0;
}`,
            q: 'Đoạn code LIS kèm truy vết trên sẽ in ra độ dài và dãy con nào trên màn hình?',
            options: [
              'In ra 3: 3 8 9 vì tại vị trí 4 nhận trace[4] = 2 trước khi xét j = 3 với điều kiện &gt;',
              'In ra 3: 3 4 9 vì vị trí 3 ghi đè trace[4] = 3 khi có cùng độ dài dp[3] + 1',
              'In ra 3: 9 8 3 vì dãy truy vết được đẩy từ cuối về đầu nhưng thiếu hàm đảo ngược',
              'In ra 1: 2 vì vòng lặp tìm bestPos lấy nhầm phần tử cuối cùng có chỉ số n = 5'
            ],
            correct: 0,
            explain: 'dp = [?, 1, 2, 2, 3, 1]. Tại i = 4 (a[4]=9): khi j = 2 (a[2]=8) có dp[2] + 1 = 3 &gt; 1 nên dp[4] = 3, trace[4] = 2; sang j = 3 (a[3]=4), dp[3] + 1 = 3 không LỚN HƠN HẲN 3 nên không ghi đè trace[4]. Truy vết 4 &rarr; 2 &rarr; 1 và reverse cho: 3: 3 8 9.'
          },
          {
            type: 'single',
            q: 'Trong bài toán LIS $O(N^2)$, vì sao lấy <code>dp[n]</code> làm đáp án cuối cùng thường dẫn đến <strong>Wrong Answer (WA)</strong>, kể cả khi vòng lặp chuyển trạng thái đã viết đúng?',
            options: [
              'Vì bảng dp đánh số từ 0 nên phần tử thứ n thực chất nằm ngoài kích thước mảng',
              'Vì vòng lặp for j luôn bỏ sót phần tử a[n - 1] nên dp[n] luôn bị thiếu đi một đơn vị',
              'Vì hàm reverse() làm thay đổi trực tiếp vị trí các giá trị bên trong mảng dp',
              'Vì dp[i] là độ dài LIS kết thúc TẠI vị trí i nên dãy dài nhất có thể kết thúc trước vị trí n'
            ],
            correct: 3,
            explain: 'dp[i] ép phần tử cuối của dãy con tăng phải là a[i]. Nếu a[n] là một số rất nhỏ ở cuối mảng (như 1 trong {4, 2, 6, 3, 8, 1}), dp[n] chỉ bằng 1 trong khi đáp án thực sự nằm ở một vị trí j &lt; n trước đó!'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> về thuật toán <code>LIS</code> $O(N^2)$ và truy vết dãy?',
            options: [
              'Nếu đề yêu cầu dãy con KHÔNG GIẢM (a[j] &lt;= a[i]) thì chỉ cần sửa dấu &lt; thành &lt;= trong bước kiểm tra',
              'Mọi ô dp[1..n] bắt buộc khởi tạo bằng 1 vì một phần tử đứng riêng lẻ đã là dãy tăng độ dài 1',
              'Mảng truy vết trace[i] chỉ cần chạy từ n lùi về -1 là luôn lấy được dãy con tăng dài nhất của mảng',
              'Độ phức tạp thời gian là O(N^2) và bộ nhớ là O(N), hoàn toàn chạy AC khi giới hạn N &lt;= 1000'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D đều đúng. C sai hoàn toàn: truy vết phải xuất phát từ chỉ số bestPos (vị trí có dp[bestPos] lớn nhất trên 1..n), tuyệt đối không được xuất phát mù quáng từ n!'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: DP HAI TIỀN TỐ TRÊN XÂU — LCS & EDIT DISTANCE
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'LCS & Edit Distance',
        title: 'Vấn Đề Nhỏ 2: DP Hai Tiền Tố Trên Xâu &mdash; <code>LCS</code> &amp; <code>Edit Distance</code>',
        lead: 'Cũng là bảng 2D kích thước <code>(n + 1) x (m + 1)</code> trên hai tiền tố <code>A[0..i-1]</code> và <code>B[0..j-1]</code> kế thừa từ <code>L2-07</code>, nhưng vì sao <strong>LCS</strong> để hàng 0 và cột 0 bằng <code>0</code>, còn <strong>Edit Distance</strong> bắt buộc phải đặt <code>dp[i][0] = i</code> và <code>dp[0][j] = j</code>?',
        subproblem: {
          title: 'Xây dựng bảng DP 2D trên hai tiền tố xâu để giải trọn vẹn Xâu con chung dài nhất (<code>LCS</code> + truy vết xâu) và Khoảng cách biến đổi xâu (<code>Edit Distance</code>).',
          desc: 'Vì hai xâu ký tự <code>A</code> (độ dài $n$) và <code>B</code> (độ dài $m$) trong C++ đánh số từ <code>0</code>, ta dùng quy ước chuẩn: <strong>ô <code>dp[i][j]</code> xét $i$ ký tự đầu của <code>A</code> và $j$ ký tự đầu của <code>B</code></strong>, do đó ký tự cuối đang so sánh luôn là <strong><code>A[i - 1]</code> và <code>B[j - 1]</code></strong>. Mọi nhầm lẫn về chỉ số <code>- 1</code> hoặc ô biên hàng 0 / cột 0 đều làm bảng tính sụp đổ!'
        },
        cards: [
          {
            heading: 'Xâu Con Chung Dài Nhất (<code>LCS</code>) &amp; Truy Vết Xâu Kết Quả (<code>AtCoder DP-F</code>)',
            tag: 'LCS 2D &bull; Truy Vết Xâu',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hai bạn ghi chép nhật ký các chữ cái thu thập được: xâu <code>A = "abcbdab"</code> và xâu <code>B = "bdcaba"</code>. Ta muốn tìm <strong>xâu con chung dài nhất</strong> (giữ nguyên thứ tự từ trái sang phải trong cả hai xâu, được phép bỏ qua các chữ xen kẽ).</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Định nghĩa trạng thái:</strong> <code>dp[i][j]</code> là <em>độ dài LCS của $i$ ký tự đầu của <code>A</code> (<code>A[0..i-1]</code>) và $j$ ký tự đầu của <code>B</code> (<code>B[0..j-1]</code>)</em>.</li>
                  <li><strong>Ô biên rỗng:</strong> Nếu một trong hai xâu có độ dài $0$ ($i = 0$ hoặc $j = 0$), không có ký tự chung nào $\implies$ <code>dp[i][0] = dp[0][j] = 0</code>.</li>
                  <li><strong>Chuyển trạng thái (2 trường hợp tại cặp ký tự cuối <code>A[i - 1]</code> và <code>B[j - 1]</code>):</strong>
                    <br>&bull; <em>Khớp nhau (<code>A[i - 1] == B[j - 1]</code>):</em> Ghép ngay chữ chung này vào sau LCS của hai phần trước đó $\implies$ <strong><code>dp[i][j] = dp[i - 1][j - 1] + 1</code></strong>! (Cẩn thận: <em>KHÔNG</em> viết <code>max(dp[i - 1][j], dp[i][j - 1]) + 1</code> vì cùng một ký tự sẽ bị cộng lặp nhiều lần!)
                    <br>&bull; <em>Lệch nhau (<code>A[i - 1] != B[j - 1]</code>):</em> Không thể giữ cả hai chữ cuối cùng lúc; hoặc bỏ <code>A[i - 1]</code>, hoặc bỏ <code>B[j - 1]</code> $\implies$ <code>dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])</code>.
                  </li>
                  <li><strong>Truy vết in lại xâu LCS:</strong> Đặt <code>i = n, j = m</code>. Chừng nào <code>i &gt; 0 &amp;&amp; j &gt; 0</code>: nếu <code>A[i - 1] == B[j - 1]</code> thì đẩy <code>A[i - 1]</code> vào kết quả rồi đi chéo <code>i--, j--</code>; ngược lại bước về ô lớn hơn giữa <code>dp[i - 1][j]</code> và <code>dp[i][j - 1]</code>. Cuối cùng gọi <code>reverse()</code>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: LCS 2D &amp; Truy Vết Xâu Chuẩn CP C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string A = "abcbdab", B = "bdcaba";
    int n = (int)A.size(), m = (int)B.size();
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(m + 1, 0));

    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            if (A[i - 1] == B[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1; // Chỉ đi chéo + 1
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    string res;
    int i = n, j = m;
    while (i &gt; 0 &amp;&amp; j &gt; 0) {
        if (A[i - 1] == B[j - 1]) {
            res.push_back(A[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] &gt;= dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    reverse(res.begin(), res.end());
    cout &lt;&lt; "LCS = " &lt;&lt; dp[n][m] &lt;&lt; " | Xau: " &lt;&lt; res &lt;&lt; '\\n'; // 4 | bcba
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Xâu con chung dài nhất (<code>Longest Common Subsequence — LCS</code>):</strong> Xâu dài nhất vừa là dãy con của <code>A</code>, vừa là dãy con của <code>B</code>, tính trên bảng 2D hai tiền tố trong $O(N \\cdot M)$.</li>
                  <li><strong>Truy vết đường đi chéo (<code>2D Diagonal Backtracking</code>):</strong> Chỉ ghi nhận ký tự vào đáp án tại những bước khớp <code>A[i - 1] == B[j - 1]</code> khi lùi ngược từ <code>(n, m)</code> về <code>(0, 0)</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Khoảng Cách Biến Đổi Xâu (<code>Edit Distance</code>) &amp; Bẫy Biên <code>dp[i][0] = i</code>',
            tag: 'Edit Distance &bull; Biên i, j',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Bộ kiểm tra chính tả muốn biến từ gõ sai <code>A = "LOVE"</code> thành từ đúng <code>B = "MOVIE"</code> với <strong>ít thao tác nhất</strong> (mỗi bước được phép: <strong>Xóa</strong> $1$ ký tự, <strong>Chèn</strong> $1$ ký tự, hoặc <strong>Thay thế</strong> $1$ ký tự bằng ký tự khác).</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Định nghĩa trạng thái:</strong> <code>dp[i][j]</code> là <em>số phép sửa ít nhất để biến <code>A[0..i-1]</code> thành <code>B[0..j-1]</code></em>.</li>
                  <li><strong>Cạm bẫy chết người ở hàng 0 và cột 0:</strong> Quen tay từ LCS mà giữ toàn bộ biên bằng <code>0</code> là sai bét! Bởi vì:
                    <br>&bull; Biến $i$ ký tự đầu của <code>A</code> thành xâu rỗng (<code>j = 0</code>): phải <strong>Xóa đủ $i$ ký tự</strong> $\implies$ <strong><code>dp[i][0] = i</code></strong>!
                    <br>&bull; Biến xâu rỗng (<code>i = 0</code>) thành $j$ ký tự của <code>B</code>: phải <strong>Chèn đủ $j$ ký tự</strong> $\implies$ <strong><code>dp[0][j] = j</code></strong>!
                  </li>
                  <li><strong>Ba nhánh chuyển trạng thái tại cặp <code>(i, j)</code> (chọn <code>min</code>):</strong>
                    <br>&bull; <em>Xóa <code>A[i - 1]</code>:</em> Sửa <code>A[0..i-2]</code> thành <code>B[0..j-1]</code> cộng $1$ phép xóa $\implies$ <code>dp[i - 1][j] + 1</code>.
                    <br>&bull; <em>Chèn <code>B[j - 1]</code> vào cuối <code>A</code>:</em> Sửa <code>A[0..i-1]</code> thành <code>B[0..j-2]</code> cộng $1$ phép chèn $\implies$ <code>dp[i][j - 1] + 1</code>.
                    <br>&bull; <em>Thay thế hoặc Giữ nguyên:</em> Sửa <code>A[0..i-2]</code> thành <code>B[0..j-2]</code>, tốn thêm $0$ nếu <code>A[i - 1] == B[j - 1]</code> hoặc $1$ nếu khác nhau $\implies$ <code>dp[i - 1][j - 1] + (A[i - 1] != B[j - 1])</code>.
                  </li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Edit Distance (CSES-1639) Chuẩn CP C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string A = "LOVE", B = "MOVIE";
    int n = (int)A.size(), m = (int)B.size();
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(m + 1, 0));

    // BẮT BUỘC: Biên xâu rỗng phải xóa i lần hoặc chèn j lần
    for (int i = 0; i &lt;= n; i++) dp[i][0] = i;
    for (int j = 0; j &lt;= m; j++) dp[0][j] = j;

    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            dp[i][j] = min({
                dp[i - 1][j] + 1,                          // Xóa A[i - 1]
                dp[i][j - 1] + 1,                          // Chèn B[j - 1]
                dp[i - 1][j - 1] + (A[i - 1] != B[j - 1])  // Thay thế hoặc giữ
            });
        }
    }

    cout &lt;&lt; "Edit Distance = " &lt;&lt; dp[n][m] &lt;&lt; '\\n'; // 2 (L-&gt;M, chen I)
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Khoảng cách biến đổi (<code>Edit Distance</code> / <code>Levenshtein Distance</code>):</strong> Số phép Thêm, Xóa, Thay thế tối thiểu biến xâu <code>A</code> thành <code>B</code>.</li>
                  <li><strong>Điều kiện biên tiền tố rỗng (<code>Empty-Prefix Base Case</code>):</strong> Khác biệt mấu chốt với LCS: bắt buộc gán <code>dp[i][0] = i</code> và <code>dp[0][j] = j</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_lcs_diag_vs_max',
            title: 'Phòng Thí Nghiệm 2A: Khi Khớp Ký Tự Trong LCS — Đi Chéo + 1 vs Bẫy Lấy max(trên, trái) + 1',
            desc: 'Với A = "aa" và B = "a", LCS chuẩn chỉ có thể dài 1 (vì xâu B chỉ có 1 ký tự!). Thử đổi nhánh khớp ký tự sang max(dp[i-1][j], dp[i][j-1]) + 1 để chứng kiến ký tự "a" bị đếm trùng ra 2!',
            toggles: [
              {
                key: 'matchMode',
                label: 'Công thức khi A[i - 1] == B[j - 1] trong LCS',
                options: [
                  { value: 'diag', text: 'dp[i][j] = dp[i - 1][j - 1] + 1 — Đi chéo chuẩn (AC)', kind: 'ok' },
                  { value: 'max_up_left', text: 'dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) + 1 (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.matchMode === 'diag';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string A = "aa", B = "a";
    int n = (int)A.size(), m = (int)B.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (A[i - 1] == B[j - 1])
${isOk ? '                dp[i][j] = dp[i - 1][j - 1] + 1;' : '                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) + 1;'}
            else
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    cout << "LCS(\\"aa\\", \\"a\\") = " << dp[n][m] << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [13],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Đường chéo dp[i-1][j-1] tiêu thụ đúng cả hai ký tự A[i-1] và B[j-1], ra LCS = 1!'
                  : 'ĐẾM TRÙNG KÝ TỰ (WA): Xâu B chỉ có độ dài 1 nhưng LCS vọt thành 2 do tái sử dụng B[0] hai lần!',
                predictions: [
                  { text: 'In ra LCS("aa", "a") = 1 vì mỗi ký tự ở B chỉ được ghép đúng một lần' },
                  { text: 'In ra LCS("aa", "a") = 2 vì ô trên dp[1][1] = 1 đã dùng B[0] lại bị cộng thêm 1' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nLCS("aa", "a") = 1'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nLCS("aa", "a") = 2',
                explain: isOk
                  ? 'Ở bước i = 2, j = 1, dp[i - 1][j - 1] = dp[1][0] = 0 (chưa dùng B[0]), nên dp[2][1] = 0 + 1 = 1 chính xác tuyệt đối.'
                  : 'Khi đọc dp[i - 1][j] = dp[1][1] = 1, giá trị 1 đó ĐÃ tiêu thụ mất chữ a duy nhất của B rồi! Cộng thêm 1 nữa tức là xài lại chữ a đó hai lần!'
              };
            }
          },
          {
            id: 'sb_edit_base_case',
            title: 'Phòng Thí Nghiệm 2B: Edit Distance — Biên Chuẩn dp[i][0] = i vs Bẫy Để Biên 0 Như LCS',
            desc: 'Biến xâu A = "abc" thành B = "c" bắt buộc phải xóa "a" và "b" (đáp án đúng = 2). Thử tắt bước gán dp[i][0] = i để thấy Edit Distance bị tụt sai về 0 như thế nào!',
            toggles: [
              {
                key: 'baseMode',
                label: 'Giá trị khởi tạo cột 0 (dp[i][0]) trong Edit Distance',
                options: [
                  { value: 'proper', text: 'dp[i][0] = i và dp[0][j] = j — Đúng chi phí xóa/chèn (AC)', kind: 'ok' },
                  { value: 'zero_lcs', text: 'Giữ dp[i][0] = 0 như bài LCS (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.baseMode === 'proper';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string A = "abc", B = "c";
    int n = (int)A.size(), m = (int)B.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
${isOk ? '    for (int i = 0; i <= n; i++) dp[i][0] = i;' : '    for (int i = 0; i <= n; i++) dp[i][0] = 0;'}
    for (int j = 0; j <= m; j++) dp[0][j] = j;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            dp[i][j] = min({dp[i - 1][j] + 1, dp[i][j - 1] + 1,
                            dp[i - 1][j - 1] + (A[i - 1] != B[j - 1])});
        }
    }
    cout << "Edit(\\"abc\\", \\"c\\") = " << dp[n][m] << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [10],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Biên dp[2][0] = 2 tính đủ 2 phép xóa "ab", kết hợp chữ "c" khớp nhau cho ra Edit = 2!'
                  : 'XÓA MIỄN PHÍ KHÔNG TỐN PHÉP (WA): Với dp[2][0] = 0, máy tưởng bỏ "ab" chỉ tốn 0 phép rồi khớp "c"==' + "'c'" + ' thành Edit = 0!',
                predictions: [
                  { text: 'In ra Edit("abc", "c") = 2 nhờ tính đủ chi phí xóa 2 ký tự ở cột 0' },
                  { text: 'In ra Edit("abc", "c") = 0 vì dp[2][0] = 0 làm biến mất chi phí xóa tiền tố "ab"' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nEdit("abc", "c") = 2'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nEdit("abc", "c") = 0',
                explain: isOk
                  ? 'Tại (3, 1), A[2] == B[0] (\'c\' == \'c\') nên đường chéo đọc dp[2][0] + 0 = 2. Nhờ dp[2][0] = 2, tổng phép sửa đạt chuẩn 2.'
                  : 'Khi dp[2][0] giữ bằng 0, tại (3, 1) nhánh đường chéo đọc dp[2][0] + 0 = 0 — tức là xóa miễn phí hai ký tự "ab" mà không mất phép nào!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string A = "abcd", B = "acbd";
    int n = (int)A.size(), m = (int)B.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            dp[i][j] = (A[i - 1] == B[j - 1]) ? dp[i - 1][j - 1] + 1
                                              : max(dp[i - 1][j], dp[i][j - 1]);
    string res;
    int i = n, j = m;
    while (i > 0 && j > 0) {
        if (A[i - 1] == B[j - 1]) { res.push_back(A[i - 1]); i--; j--; }
        else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
        else j--;
    }
    reverse(res.begin(), res.end());
    cout << dp[n][m] << ' ' << res << '\\n';
    return 0;
}`,
            q: 'Khi chạy đoạn code LCS và truy vết với <code>A = "abcd"</code>, <code>B = "acbd"</code> trên, đầu ra in trên màn hình là gì?',
            options: [
              'In ra 3 acd vì tại ô (3, 3) điều kiện so sánh ưu tiên giảm chỉ số j trước',
              'In ra 3 abd vì tại (3, 3) có dp[2][3] == dp[3][2] == 2 nên đi theo nhánh i-- rồi gặp b',
              'In ra 2 ad vì hai ký tự ở giữa là b và c bị đổi chỗ nên không thể cùng thuộc một LCS',
              'In ra 4 abcd vì bảng dp cộng thêm 1 tại mọi cặp vị trí có độ dài bằng nhau'
            ],
            correct: 1,
            explain: 'Độ dài LCS là 3 (hoặc "abd" hoặc "acd"). Khi truy vết ngược từ (4, 4): khớp \'d\' &rarr; lùi về (3, 3). Tại (3, 3) (\'c\' != \'b\'), vì dp[2][3] = 2 &gt;= dp[3][2] = 2 nên code chạy nhánh i-- lên (2, 3), khớp \'b\', rồi về (1, 1) khớp \'a\'. Đảo ngược ra: 3 abd.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string A = "cat", B = "cuts";
    int n = (int)A.size(), m = (int)B.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 0; i <= n; i++) dp[i][0] = i;
    for (int j = 0; j <= m; j++) dp[0][j] = j;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            dp[i][j] = min({dp[i - 1][j] + 1, dp[i][j - 1] + 1,
                            dp[i - 1][j - 1] + (A[i - 1] != B[j - 1])});
        }
    }
    cout << dp[2][2] << ' ' << dp[n][m] << '\\n';
    return 0;
}`,
            q: 'Với hai xâu <code>A = "cat"</code> và <code>B = "cuts"</code>, đoạn code Edit Distance trên sẽ in ra hai giá trị <code>dp[2][2]</code> và <code>dp[3][4]</code> lần lượt là bao nhiêu?',
            options: [
              'In ra 2 3 vì cần 2 phép xóa hết tiền tố "ca" và 3 phép đổi toàn bộ xâu "cat"',
              'In ra 1 3 vì ký tự cuối \'s\' của "cuts" làm tăng tổng số phép sửa từ 2 lên 3',
              'In ra 0 2 vì tiền tố "ca" và "cu" có chung chữ \'c\' nên tạm thời không tốn phép sửa',
              'In ra 1 2 vì "ca" &rarr; "cu" tốn 1 phép thay a &rarr; u, rồi khớp \'t\' và chèn thêm \'s\''
            ],
            correct: 3,
            explain: 'dp[2][2] biến "ca" thành "cu": giữ \'c\', thay \'a\' &rarr; \'u\' tốn 1 phép. Sang (3, 3) biến "cat" thành "cut": \'t\'==\'t\' nên giữ nguyên dp[2][2] = 1. Cuối cùng tại (3, 4) chèn thêm \'s\' thành dp[3][3] + 1 = 2. In ra: 1 2.'
          },
          {
            type: 'single',
            q: 'Vì sao trong bài toán <strong>Edit Distance</strong> ta bắt buộc phải khởi tạo <code>dp[i][0] = i</code> và <code>dp[0][j] = j</code>, trong khi bài <strong>LCS</strong> lại để hàng 0 và cột 0 bằng <code>0</code>?',
            options: [
              'Vì biến đổi giữa xâu rỗng và xâu dài k tốn đúng k phép Xóa hoặc Chèn, còn LCS với xâu rỗng chung 0 ký tự',
              'Vì hàm min({a, b, c}) trong C++14 trả về kết quả sai nếu có bất kỳ ô biên nào trong bảng mang giá trị 0',
              'Vì Edit Distance không dùng được kiểu std::string nên phải lưu độ dài xâu trực tiếp vào hàng 0 và cột 0',
              'Vì LCS duyệt hai vòng lặp từ 0 đến n - 1 nên tự động bỏ qua hàng 0 và cột 0 của bảng dp'
            ],
            correct: 0,
            explain: 'Ý nghĩa trạng thái quyết định ô biên: Edit Distance đo chi phí biến A[0..i-1] thành rỗng (phải xóa i chữ &rarr; i) hoặc từ rỗng thành B[0..j-1] (phải chèn j chữ &rarr; j); còn LCS đo số ký tự chung nên ghép với xâu rỗng luôn chung 0 ký tự.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về DP hai tiền tố trên xâu <code>LCS</code> và <code>Edit Distance</code>?',
            options: [
              'Do std::string đánh số từ 0 nên tại ô dp[i][j] (1-based) ta luôn so sánh A[i - 1] với B[j - 1] cho chuẩn chỉ số',
              'Khi A[i - 1] == B[j - 1] trong LCS, ta có thể cộng dồn vào max(dp[i-1][j], dp[i][j-1]) mà không cần đi chéo',
              'Trong Edit Distance, công thức dp[i - 1][j - 1] + (A[i - 1] != B[j - 1]) gộp gọn cả phép giữ nguyên (+0) và thay thế (+1)',
              'Với xâu dài tới 5000 (CSES-1639), bảng 2D kiểu int kích thước 5001 x 5001 tốn khoảng 100 MB, chạy mượt dưới mức 512 MB'
            ],
            correct: [0, 2, 3],
            explain: 'A, C và D đều đúng. B sai nghiêm trọng: trong LCS khi A[i - 1] == B[j - 1] luôn bắt buộc dùng đường chéo dp[i - 1][j - 1] + 1; nếu cộng vào max(trên, trái) sẽ đếm lặp cùng một ký tự như đã chứng minh ở Phòng Thí Nghiệm 2A!'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: DP MÁY TRẠNG THÁI (VACATION) & BẢN ĐỒ 4 NHÓM DP LỚP 9
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Máy Trạng Thái & 4 Nhóm DP',
        title: 'Vấn Đề Nhỏ 3: DP Máy Trạng Thái (<code>dp[i][state]</code>) &amp; Bản Đồ 4 Nhóm DP Lớp 9',
        lead: 'Khi lựa chọn ngày hôm nay bị ràng buộc trực tiếp bởi hành động ngày hôm qua (<code>AtCoder DP-C Vacation</code>), Tham lam chọn điểm cao nhất mỗi ngày sẽ sập bẫy ra sao &mdash; và làm thế nào gộp toàn bộ <code>L2-06</code> &rarr; <code>L2-09</code> thành <strong>Bản đồ 4 Nhóm DP Chuẩn HSG Lớp 9</strong>?',
        subproblem: {
          title: 'Thêm chiều trạng thái phụ <code>dp[i][state]</code> để kiểm soát điều kiện chuyển bước liền kề trong $O(N)$, và tổng kết hệ thống nhận diện 4 nhóm DP cốt lõi để tốt nghiệp Tầng 2.',
          desc: 'Với các bài tối ưu theo chuỗi ngày/bước có lệnh cấm lặp lại hành động ngày trước (như <code>Vacation</code>, <code>Vacations</code> hay <code>Basketball Exercise</code>), một mảng 1 chiều <code>dp[i]</code> không thể nhớ hôm qua ta đã làm gì. Chỉ cần mở thêm một chiều nhỏ <code>state</code> ($2$ hoặc $3$ trạng thái), bài toán hóa giải gọn trong $O(N)$ thời gian và thậm chí cuộn về $O(1)$ bộ nhớ!'
        },
        cards: [
          {
            heading: 'DP Máy Trạng Thái Theo Ngày: <code>dp[i][state]</code> (<code>AtCoder DP-C Vacation</code>)',
            tag: 'State Machine &bull; O(N)',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Trong $N$ ngày nghỉ hè, mỗi ngày $i$ bạn được chọn $1$ trong $3$ việc: <code>0</code> (Bơi, được <code>a[i]</code> điểm), <code>1</code> (Bắt bọ, được <code>b[i]</code> điểm), hoặc <code>2</code> (Làm bài, được <code>c[i]</code> điểm). Luật chơi: <strong>không được làm cùng một việc trong 2 ngày liên tiếp</strong>.</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Vì sao Tham lam gãy?</strong> Xét $2$ ngày: Ngày 1 có <code>[10, 40, 70]</code>, Ngày 2 có <code>[20, 50, 100]</code>. Tham lam chọn việc <code>2</code> (<code>70</code>) ở Ngày 1, sang Ngày 2 bị cấm việc <code>2</code> nên chỉ lấy được <code>50</code> $\implies$ tổng <strong><code>120</code></strong>. Trong khi chọn Ngày 1 việc <code>1</code> (<code>40</code>) rồi Ngày 2 việc <code>2</code> (<code>100</code>) đạt <strong><code>140</code></strong>!</li>
                  <li><strong>Mở thêm chiều trạng thái ngày hôm nay:</strong> Gọi <code>dp[i][s]</code> là <em>tổng điểm tối đa sau $i$ ngày đầu tiên, biết chắc ngày thứ $i$ đã làm việc $s \\in \\{0, 1, 2\\}$</em>.</li>
                  <li><strong>Khởi tạo ngày <code>0</code> giả &amp; Chuyển trạng thái:</strong> Đặt <code>dp[0][0] = dp[0][1] = dp[0][2] = 0</code> (đảm bảo chạy đúng cả khi $N = 1$!). Từ $i = 1..N$, muốn làm việc $s$ hôm nay thì hôm qua bắt buộc làm một trong <strong>hai việc còn lại khác $s$</strong>:
                    <br>&bull; <code>dp[i][0] = a[i] + max(dp[i - 1][1], dp[i - 1][2])</code>
                    <br>&bull; <code>dp[i][1] = b[i] + max(dp[i - 1][0], dp[i - 1][2])</code>
                    <br>&bull; <code>dp[i][2] = c[i] + max(dp[i - 1][0], dp[i - 1][1])</code>
                  </li>
                  <li><strong>Đáp án cuối:</strong> Không biết ngày thứ $N$ chọn việc nào lời nhất nên lấy <strong><code>max({dp[n][0], dp[n][1], dp[n][2]})</code></strong>! (Khi $N \\le 10^5$, dùng <code>long long</code> và có thể cuộn xuống 3 biến <code>d0, d1, d2</code>).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: DP Máy Trạng Thái Vacation (AtCoder DP-C) Chuẩn CP C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;vector&lt;long long&gt;&gt; val = {
        {10, 40, 70},
        {20, 50, 80},
        {30, 60, 90}
    };
    int n = (int)val.size();
    vector&lt;vector&lt;long long&gt;&gt; dp(n + 1, vector&lt;long long&gt;(3, 0));

    for (int i = 1; i &lt;= n; i++) {
        dp[i][0] = val[i - 1][0] + max(dp[i - 1][1], dp[i - 1][2]);
        dp[i][1] = val[i - 1][1] + max(dp[i - 1][0], dp[i - 1][2]);
        dp[i][2] = val[i - 1][2] + max(dp[i - 1][0], dp[i - 1][1]);
    }

    long long ans = max({dp[n][0], dp[n][1], dp[n][2]});
    cout &lt;&lt; "Max happiness = " &lt;&lt; ans &lt;&lt; '\\n'; // 210 (C -&gt; B -&gt; C)
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>DP Máy trạng thái (<code>State Machine DP</code>):</strong> Thêm chiều nhỏ <code>state</code> vào bảng <code>dp[i][state]</code> để mô tả chế độ / hành động ở bước hiện tại, giúp kiểm tra chính xác ràng buộc chuyển tiếp giữa các bước kề nhau.</li>
                  <li><strong>Biến thể ràng buộc khả dụng (như <code>CF-698A Vacations</code> / <code>CF-1195C</code>):</strong> Nếu trạng thái $s$ không khả dụng trong ngày $i$, giữ <code>dp[i][s] = INF</code> (bài min) hoặc bỏ qua không cập nhật (bài max) thay vì cho phép chọn bừa!</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Bản Đồ Tổng Hợp 4 Nhóm DP Cơ Bản Chuẩn HSG Lớp 9 (Tốt Nghiệp Tầng 2)',
            tag: 'Capstone Map &bull; 4 Nhóm DP',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Bản Đồ Nhận Diện Nhanh Trong Phòng Thi HSG Lớp 9</span>
                <p>Chúc mừng bạn đã đi hết cả 4 chuyên đề Quy hoạch động Tầng 2! Khi đọc một đề bài DP bất kỳ, hãy soi vào bảng đối chiếu 4 nhóm dưới đây để chốt đúng công thức trong 30 giây:</p>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
                  <thead>
                    <tr style="border-bottom: 1px solid var(--border); text-align: left;">
                      <th style="padding: 6px;">Nhóm DP &amp; Bài học</th>
                      <th style="padding: 6px;">Dấu hiệu nhận diện trong đề</th>
                      <th style="padding: 6px;">Trạng thái &amp; Bẫy số 1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid var(--border);">
                      <td style="padding: 6px;"><strong>1. DP 1D &amp; Truy vết</strong><br><code>L2-06</code></td>
                      <td style="padding: 6px;">1 trục chỉ số (bậc thang, đổi tiền nhỏ, xếp hàng <code>Frog / NKTICK</code>)</td>
                      <td style="padding: 6px;"><code>dp[i]</code>; tránh <code>LLONG_MAX + 1</code> (dùng <code>1e18</code>), nhớ <code>reverse()</code> khi truy vết</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                      <td style="padding: 6px;"><strong>2. Lưới 2D &amp; Cuộn mảng</strong><br><code>L2-07</code></td>
                      <td style="padding: 6px;">Bảng $N \\times M$ đi Phải/Xuống, vật cản <code>*</code>, đường đi min/max</td>
                      <td style="padding: 6px;"><code>dp[i][j]</code>; lót biên <code>±INF</code> (bài min/max), reset <code>cur</code> sau <code>swap()</code></td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                      <td style="padding: 6px;"><strong>3. Cái túi &amp; Tổ hợp đếm</strong><br><code>L2-08</code></td>
                      <td style="padding: 6px;">Chọn món giới hạn $W$ (0/1 vs vô hạn), đếm Hoán vị vs Tổ hợp, $C(n,k)$</td>
                      <td style="padding: 6px;">0/1 1D duyệt <strong>ngược</strong>; Hoán vị (<code>sum</code> ngoài) vs Tổ hợp (<code>coin</code> ngoài); <code>dp[val] &lt;= W</code></td>
                    </tr>
                    <tr>
                      <td style="padding: 6px;"><strong>4. Dãy con, Xâu &amp; Trạng thái</strong><br><code>L2-09</code></td>
                      <td style="padding: 6px;"><code>LIS</code> tăng dần; đối chiếu 2 xâu <code>LCS / Edit</code>; chuỗi ngày cấm lặp <code>Vacation</code></td>
                      <td style="padding: 6px;"><code>LIS</code> lấy <code>*max_element</code>; <code>Edit</code> đặt biên <code>i, j</code>; Máy trạng thái <code>dp[i][s]</code> cấm lặp <code>s</code></td>
                    </tr>
                  </tbody>
                </table>
                <p style="margin-top: 10px;"><strong>Chân trời Mở rộng (Tùy chọn sau Tốt nghiệp Tầng 2):</strong> Khi gặp bài có $N \\le 10^5$ vượt ngưỡng $O(N^2)$, bạn có thể khám phá thêm các chuyên đề ở nhánh <strong>Mở rộng (<code>Extension</code>)</strong> trên Cây Kỹ Năng: tối ưu <code>LIS</code> về $O(N \\log N)$ bằng Tìm kiếm nhị phân (<code>L2-02</code>), hoặc dùng <strong>Ngăn xếp đơn điệu (<code>MOD-02</code>)</strong> và <strong>Hàng đợi hai đầu đơn điệu / Hai con trỏ (<code>MOD-04</code>)</strong> để hạ DP từ $O(N^2)$ xuống $O(N)$!</p>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Bộ Ba Khuôn Mẫu L2-09 Tổng Hợp (C++14)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int lisLength(const vector&lt;int&gt;&amp; a) { // a: 1-based [1..n]
    int n = (int)a.size() - 1;
    vector&lt;int&gt; dp(n + 1, 1);
    for (int i = 1; i &lt;= n; i++)
        for (int j = 1; j &lt; i; j++)
            if (a[j] &lt; a[i]) dp[i] = max(dp[i], dp[j] + 1);
    return *max_element(dp.begin() + 1, dp.end());
}

int editDist(const string&amp; A, const string&amp; B) {
    int n = (int)A.size(), m = (int)B.size();
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(m + 1, 0));
    for (int i = 0; i &lt;= n; i++) dp[i][0] = i;
    for (int j = 0; j &lt;= m; j++) dp[0][j] = j;
    for (int i = 1; i &lt;= n; i++)
        for (int j = 1; j &lt;= m; j++)
            dp[i][j] = min({dp[i - 1][j] + 1, dp[i][j - 1] + 1,
                            dp[i - 1][j - 1] + (A[i - 1] != B[j - 1])});
    return dp[n][m];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout &lt;&lt; "LIS={2,5,1} -&gt; " &lt;&lt; lisLength({0, 2, 5, 1})
         &lt;&lt; " | Edit(cat,cut) -&gt; " &lt;&lt; editDist("cat", "cut") &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Tổng Kết Thuật Ngữ Tốt Nghiệp Tầng 2</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bản đồ 4 Nhóm DP Cơ Bản (<code>4-Group Core DP Map</code>):</strong> Khung phân loại nhanh toàn bộ DP Lớp 9: (1) 1D Tuyến tính, (2) Lưới 2D &amp; Cuộn mảng, (3) Cái túi &amp; Đếm tổ hợp, (4) Dãy con / 2 Tiền tố xâu / Máy trạng thái.</li>
                  <li><strong>Tối ưu hóa DP nâng cao (<code>Extension: MOD-02 / MOD-04</code>):</strong> Bước đi tiếp theo tùy chọn sau khi tốt nghiệp Tầng 2 để tăng tốc bước chuyển trạng thái từ $O(N^2)$ về $O(N)$.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_vacation_same_day',
            title: 'Phòng Thí Nghiệm 3A: Máy Trạng Thái Vacation — Cấm Lặp Hôm Qua vs Bẫy Cộng Chính Trạng Thái s',
            desc: 'Với 2 ngày {{10, 40, 70}, {20, 50, 100}}, không được làm trùng 2 ngày liên tiếp nên kết quả đúng là 40 + 100 = 140. Thử để nhầm dp[i - 1][2] vào công thức của dp[i][2]!',
            toggles: [
              {
                key: 'transMode',
                label: 'Các trạng thái được phép chuyển tới dp[i][2] từ ngày i - 1',
                options: [
                  { value: 'no_repeat', text: 'max(dp[i - 1][0], dp[i - 1][1]) — Chỉ lấy 2 việc khác 2 (AC)', kind: 'ok' },
                  { value: 'allow_repeat', text: 'max(dp[i - 1][1], dp[i - 1][2]) — Lỡ cho lặp việc 2 (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.transMode === 'no_repeat';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<vector<long long>> val = {{10, 40, 70}, {20, 50, 100}};
    vector<vector<long long>> dp(3, vector<long long>(3, 0));
    for (int i = 1; i <= 2; i++) {
        dp[i][0] = val[i - 1][0] + max(dp[i - 1][1], dp[i - 1][2]);
        dp[i][1] = val[i - 1][1] + max(dp[i - 1][0], dp[i - 1][2]);
${isOk ? '        dp[i][2] = val[i - 1][2] + max(dp[i - 1][0], dp[i - 1][1]);' : '        dp[i][2] = val[i - 1][2] + max(dp[i - 1][1], dp[i - 1][2]);'}
    }
    cout << "Max = " << max({dp[2][0], dp[2][1], dp[2][2]}) << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [12],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Loại bỏ dp[i-1][2] ép ngày 1 chọn việc 1 (40) để ngày 2 lấy việc 2 (100), ra đúng 140!'
                  : 'VI PHẠM LUẬT CẤM LẶP (WA): Chọn việc 2 ở cả hai ngày liên tiếp (70 + 100 = 170) trái đề bài!',
                predictions: [
                  { text: 'In ra Max = 140 nhờ cấm nối từ chính trạng thái 2 của ngày trước' },
                  { text: 'In ra Max = 170 vì công thức nhầm cho phép làm việc 2 liên tiếp 2 ngày' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nMax = 140'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nMax = 170',
                explain: isOk
                  ? 'Khi mỗi dp[i][s] chỉ lấy max của hai trạng thái khác s từ hàng i - 1, mọi lộ trình hợp lệ không trùng nhau đều được xét đủ để đạt tối ưu 140.'
                  : 'Chỉ một sai sót gõ nhầm chỉ số trạng thái trong max() đã cho phép chuỗi C &rarr; C xuất hiện, tạo ra nghiệm phạm luật 170!'
              };
            }
          },
          {
            id: 'sb_vacations_state_vs_greedy',
            title: 'Phòng Thí Nghiệm 3B: Vacations (CF-698A) — DP 3 Trạng Thái vs Bẫy Tham Lam Chọn Trước',
            desc: 'Với 3 ngày a = {3, 2, 1} (Ngày 1: cả Thi &amp; Gym; Ngày 2: chỉ Gym; Ngày 3: chỉ Thi), làm đúng quy tắc không trùng 2 ngày liên tiếp có thể KHÔNG nghỉ ngày nào (0 ngày nghỉ). Thử so với Tham lam luôn ưu tiên Gym khi mở!',
            toggles: [
              {
                key: 'stratMode',
                label: 'Chiến lược chọn hoạt động theo chuỗi ngày',
                options: [
                  { value: 'dp_state', text: 'DP 3 trạng thái dp[i][0/1/2] (Nghỉ / Thi / Gym — AC)', kind: 'ok' },
                  { value: 'greedy_gym', text: 'Tham lam ưu tiên Gym ngay nếu mở (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.stratMode === 'dp_state';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

const int INF = 1000000000;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {3, 2, 1};
    int n = (int)a.size();
    vector<vector<int>> dp(n + 1, vector<int>(3, INF));
    dp[0][0] = dp[0][1] = dp[0][2] = 0;
    for (int i = 1; i <= n; i++) {
        dp[i][0] = min({dp[i - 1][0], dp[i - 1][1], dp[i - 1][2]}) + 1;
        if (a[i - 1] == 1 || a[i - 1] == 3) dp[i][1] = min(dp[i - 1][0], dp[i - 1][2]);
        if (a[i - 1] == 2 || a[i - 1] == 3) dp[i][2] = min(dp[i - 1][0], dp[i - 1][1]);
    }
    cout << "Min rest = " << min({dp[n][0], dp[n][1], dp[n][2]}) << "\\n";
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {3, 2, 1};
    int prev = 0, rest = 0; // Tham lam cuoi cung mac bay tai ngay 2!
    for (int x : a) {
        if ((x == 2 || x == 3) && prev != 2) prev = 2;
        else if ((x == 1 || x == 3) && prev != 1) prev = 1;
        else { prev = 0; rest++; }
    }
    cout << "Min rest = " << rest << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [11, 13, 14, 15, 16] : [8, 10, 11, 12],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): DP giữ đủ cả 3 nhánh ở ngày 1, tự chọn Thi &rarr; Gym &rarr; Thi cho ra Min rest = 0!'
                  : 'BỊ KẸT Ở NGÀY 2 (WA): Tham lam lỡ chọn Gym ở ngày 1 nên sang ngày 2 (chỉ có Gym) bị buộc nghỉ 1 ngày!',
                predictions: [
                  { text: 'In ra Min rest = 0 nhờ giữ được lựa chọn Thi ở ngày 1 để nhường Gym cho ngày 2' },
                  { text: 'In ra Min rest = 1 vì chọn vội Gym ngay ở ngày 1 làm kẹt ngày 2' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nMin rest = 0'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nMin rest = 1',
                explain: isOk
                  ? 'Khi ngày có nhiều lựa chọn (a[i] = 3), chỉ DP Máy trạng thái lưu cả 3 nhánh mới giữ được phương án tối ưu cho tương lai.'
                  : 'Tương tự Vacation, chọn cục bộ một hoạt động ở ngày có nhiều lựa chọn mà không nhìn ngày sau sẽ bóp nghẹt ngày kế tiếp.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<vector<long long>> val = {{10, 20, 5}, {30, 50, 10}, {40, 10, 20}};
    int n = 3;
    vector<vector<long long>> dp(n + 1, vector<long long>(3, 0));
    for (int i = 1; i <= n; i++) {
        dp[i][0] = val[i - 1][0] + max(dp[i - 1][1], dp[i - 1][2]);
        dp[i][1] = val[i - 1][1] + max(dp[i - 1][0], dp[i - 1][2]);
        dp[i][2] = val[i - 1][2] + max(dp[i - 1][0], dp[i - 1][1]);
    }
    cout << dp[2][1] << ' ' << max({dp[3][0], dp[3][1], dp[3][2]}) << '\\n';
    return 0;
}`,
            q: 'Khi chạy đoạn code DP Máy trạng thái Vacation trên với 3 ngày đã cho, hai giá trị <code>dp[2][1]</code> và đáp án tối ưu <code>max({dp[3][0], dp[3][1], dp[3][2]})</code> in ra là gì?',
            options: [
              'In ra 70 110 vì ngày 2 được nối từ chính hoạt động 1 có điểm 20 của ngày 1',
              'In ra 60 90 vì ở ngày 3 thì hoạt động 0 chỉ nhận giá trị từ dp[2][2] là 30',
              'In ra 60 100 vì dp[2][1] = 60, rồi ngày 3 chọn hoạt động 0 đạt 40 + 60',
              'In ra 55 100 vì ngày 1 chọn hoạt động 2 được 5 điểm rồi nối sang ngày 2'
            ],
            correct: 2,
            explain: 'Ngày 1: [10, 20, 5]. Ngày 2: dp[2][0]=30+20=50, dp[2][1]=50+10=60, dp[2][2]=10+20=30. Ngày 3: dp[3][0]=40+max(60,30)=100, dp[3][1]=10+50=60, dp[3][2]=20+60=80. Vậy in ra: 60 100.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

const int INF = 1000000000;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {1, 3, 2, 2};
    int n = (int)a.size();
    vector<vector<int>> dp(n + 1, vector<int>(3, INF));
    dp[0][0] = dp[0][1] = dp[0][2] = 0;
    for (int i = 1; i <= n; i++) {
        dp[i][0] = min({dp[i - 1][0], dp[i - 1][1], dp[i - 1][2]}) + 1;
        if (a[i - 1] == 1 || a[i - 1] == 3) dp[i][1] = min(dp[i - 1][0], dp[i - 1][2]);
        if (a[i - 1] == 2 || a[i - 1] == 3) dp[i][2] = min(dp[i - 1][0], dp[i - 1][1]);
    }
    cout << min({dp[n][0], dp[n][1], dp[n][2]}) << '\\n';
    return 0;
}`,
            q: 'Với lịch mở cửa 4 ngày <code>a = {1, 3, 2, 2}</code> (<code>1</code>=Thi, <code>2</code>=Gym, <code>3</code>=Cả hai), số ngày nghỉ ít nhất được đoạn code in ra bằng bao nhiêu?',
            options: [
              'In ra 0 vì ngày 1 làm bài thi, ngày 2 tập gym, rồi hai ngày cuối chia nhau thi và gym',
              'In ra 1 vì hai ngày cuối chỉ mở duy nhất Gym (2) nên bắt buộc phải nghỉ ít nhất 1 ngày',
              'In ra 2 vì sang ngày 2 có cả hai hoạt động nên thuật toán ép phải nghỉ trước một ngày',
              'In ra 3 vì bảng dp khởi tạo toàn bộ bằng giá trị INF nên chỉ có trạng thái 0 giảm được'
            ],
            correct: 1,
            explain: 'Ngày 1 (1): [1,0,INF]. Ngày 2 (3): [1,1,0]. Ngày 3 (2): [1,INF,1] (nếu ngày 2 tập gym thì ngày 3 phải nghỉ!). Ngày 4 (2): [2,INF,1] (nghỉ ngày 3 rồi tập gym ngày 4). Kết quả ít nhất là 1.'
          },
          {
            type: 'single',
            q: 'Dựa vào <strong>Bản đồ 4 Nhóm DP Cơ Bản</strong>, nếu đề bài cho hai xâu ký tự $S, T$ (độ dài $\\le 3000$) và hỏi <em>"số phép Chèn, Xóa hoặc Thay ký tự ít nhất để biến $S$ thành $T$"</em>, bài toán thuộc mô hình và điều kiện biên nào?',
            options: [
              'Thuộc Nhóm 1 (DP 1D): đặt dp[i] là số phép sửa tới vị trí i với khởi tạo dp[i] = 1',
              'Thuộc Nhóm 4 (Hai tiền tố xâu — Edit Distance): bảng dp[i][j] với biên dp[i][0] = i và dp[0][j] = j',
              'Thuộc Nhóm 4 (Hai tiền tố xâu — LCS): bảng dp[i][j] với biên hàng 0 và cột 0 đều đặt bằng 0',
              'Thuộc Nhóm 3 (0/1 Knapsack): mảng 1D duyệt ngược trọng lượng từ m về 0 với dp[0] = 0'
            ],
            correct: 1,
            explain: 'Bài toán đối chiếu biến đổi 2 xâu bằng Chèn/Xóa/Thay thuộc Nhóm 4 (Edit Distance), dùng bảng 2D hai tiền tố dp[i][j] với biên bắt buộc dp[i][0] = i và dp[0][j] = j.'
          },
          {
            type: 'multiple',
            q: 'Những nguyên tắc nào sau đây là <strong>ĐÚNG</strong> khi tổng kết và áp dụng 4 Nhóm DP Cơ Bản Lớp 9?',
            options: [
              'Trong mọi bài toán QHD, đáp án cuối cùng luôn luôn nằm tại phần tử cuối dp[n] hoặc dp[n][m]',
              'Trong LIS O(N^2), cần quét *max_element trên toàn mảng dp[1..n] vì dãy dài nhất có thể kết thúc trước n',
              'Trong DP Máy trạng thái dp[i][state] cấm lặp hành động, state s chỉ đọc từ các state khác s ở hàng i - 1',
              'Khi bảng lớn hoặc cần tối ưu O(N^2) sang O(N), có thể dùng Cuộn mảng (L2-07) hoặc Mở rộng (MOD-02, MOD-04)'
            ],
            correct: [1, 2, 3],
            explain: 'B, C và D đều đúng. A là ngộ nhận kinh điển: rất nhiều bài như LIS, Knapsack 2 hay Vacation có đáp án là max trên tập trạng thái (hoặc quét điều kiện dp[val] &lt;= W) chứ không phải đọc cứng mỗi ô cuối cùng!'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l209_lis_dp_n',
        title: 'In dp[n] Thay Vì *max_element Trong Bài Toán LIS (WA)',
        description: 'Chương trình tìm độ dài dãy con tăng ngặt dài nhất (LIS) bằng DP O(N^2). Với dãy n = 5 là {2, 5, 8, 3, 1}, dãy con tăng dài nhất là {2, 5, 8} dài 3, nhưng chương trình lại in ra 1!',
        failingInput: '5\n2 5 8 3 1',
        failingOutput: '1',
        expectedOutput: '3',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    vector<int> dp(n + 1, 1);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j < i; j++) {
            if (a[j] < a[i]) dp[i] = max(dp[i], dp[j] + 1);
        }
    }
    cout << dp[n] << '\\n';
    return 0;
}`,
        bugLine: 17,
        patches: [
          { text: '    cout << *min_element(dp.begin() + 1, dp.end()) << \'\\n\';' },
          { text: '    cout << *max_element(dp.begin() + 1, dp.end()) << \'\\n\';' },
          { text: '    cout << dp[1] << \'\\n\';' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 17, dp[i] là độ dài LIS kết thúc TẠI vị trí i; với phần tử cuối a[5] = 1 quá nhỏ nên dp[5] chỉ bằng 1! Đổi thành *max_element(dp.begin() + 1, dp.end()) để tìm kỷ lục thực sự trên toàn mảng (kể cả khi n = 1).'
      },
      {
        id: 'dbg_l209_lcs_double_count',
        title: 'Cộng + 1 Vào max(trên, trái) Thay Vì Đường Chéo dp[i-1][j-1] Trong LCS (WA)',
        description: 'Chương trình tính độ dài Xâu con chung dài nhất (LCS) của hai xâu A và B. Với A = "aa" và B = "a", đáp án tối đa không thể vượt quá độ dài của B (là 1), nhưng code lại in ra 2!',
        failingInput: 'aa\na',
        failingOutput: '2',
        expectedOutput: '1',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string A, B;
    cin >> A >> B;
    int n = (int)A.size(), m = (int)B.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (A[i - 1] == B[j - 1]) {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    cout << dp[n][m] << '\\n';
    return 0;
}`,
        bugLine: 14,
        patches: [
          { text: '                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];' },
          { text: '                dp[i][j] = dp[i - 1][j - 1];' },
          { text: '                dp[i][j] = dp[i - 1][j - 1] + 1;' }
        ],
        correctPatch: 2,
        explain: 'Ở dòng 14, khi A[i - 1] == B[j - 1], lấy max(dp[i - 1][j], dp[i][j - 1]) + 1 sẽ xài lại ký tự B[j - 1] đã ghép ở bước trước thành ra đếm trùng! Phải đổi thành dp[i][j] = dp[i - 1][j - 1] + 1; để dịch chéo lùi cả hai xâu.'
      },
      {
        id: 'dbg_l209_edit_zero_border',
        title: 'Quên Gán Biên dp[i][0] = i Khi Cài Đặt Edit Distance (WA)',
        description: 'Chương trình tính Khoảng cách biến đổi xâu (Edit Distance) giữa A và B. Với A = "abc" và B = "c", cần xóa 2 chữ "ab" nên đáp án đúng là 2, nhưng chương trình lại in ra 0!',
        failingInput: 'abc\nc',
        failingOutput: '0',
        expectedOutput: '2',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string A, B;
    cin >> A >> B;
    int n = (int)A.size(), m = (int)B.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 0; i <= n; i++) dp[i][0] = 0;
    for (int j = 0; j <= m; j++) dp[0][j] = j;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            dp[i][j] = min({dp[i - 1][j] + 1, dp[i][j - 1] + 1,
                            dp[i - 1][j - 1] + (A[i - 1] != B[j - 1])});
        }
    }
    cout << dp[n][m] << '\\n';
    return 0;
}`,
        bugLine: 11,
        patches: [
          { text: '    for (int i = 0; i <= n; i++) dp[i][0] = i;' },
          { text: '    for (int i = 0; i <= n; i++) dp[i][0] = 1;' },
          { text: '    for (int i = 0; i <= n; i++) dp[i][0] = m;' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 11, đặt dp[i][0] = 0 giống hệt LCS làm máy tưởng biến tiền tố độ dài i thành xâu rỗng không mất phép xóa nào! Phải đổi thành dp[i][0] = i; để phản ánh đúng chi phí xóa hết i ký tự của A.'
      },
      {
        id: 'dbg_l209_vacation_allow_repeat',
        title: 'Cho Phép Chọn Lại Trạng Thái Hôm Qua Trong DP Vacation (WA)',
        description: 'Chương trình giải bài Vacation (AtCoder DP-C): không được làm cùng một việc trong 2 ngày liên tiếp. Với 2 ngày {10 40 70} và {20 50 100}, đáp án đúng là 40 + 100 = 140, nhưng code lại in ra 170!',
        failingInput: '2\n10 40 70\n20 50 100',
        failingOutput: '170',
        expectedOutput: '140',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    vector<long long> a(n + 1), b(n + 1), c(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i] >> b[i] >> c[i];
    vector<vector<long long>> dp(n + 1, vector<long long>(3, 0));
    for (int i = 1; i <= n; i++) {
        dp[i][0] = a[i] + max(dp[i - 1][1], dp[i - 1][2]);
        dp[i][1] = b[i] + max(dp[i - 1][0], dp[i - 1][2]);
        dp[i][2] = c[i] + max(dp[i - 1][1], dp[i - 1][2]);
    }
    cout << max({dp[n][0], dp[n][1], dp[n][2]}) << '\\n';
    return 0;
}`,
        bugLine: 15,
        patches: [
          { text: '        dp[i][2] = c[i] + max(dp[i - 1][0], dp[i - 1][2]);' },
          { text: '        dp[i][2] = c[i] + max(dp[i - 1][0], dp[i - 1][1]);' },
          { text: '        dp[i][2] = c[i] + min(dp[i - 1][0], dp[i - 1][1]);' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 15, nhánh chuyển cho hoạt động 2 lại đọc nhầm từ dp[i - 1][2] nên cho phép làm việc 2 hai ngày liên tiếp (70 + 100 = 170)! Phải đổi thành max(dp[i - 1][0], dp[i - 1][1]) để chỉ nhận từ hai hoạt động khác 2.'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — L2-09)
    // ============================================================================
    practiceProblems: [
      {
        id: 'VNOJ-LIQ',
        title: 'Dãy con tăng dài nhất (bản dễ - LIQ)',
        judge: 'VNOJ',
        tier: 1,
        link: 'https://oj.vnoi.info/problem/liq',
        hint: 'Giới hạn $1 \\le N \\le 1000$, $1 \\le A_i \\le 10000$, TL 1.0s, ML 512 MB. Khuôn mẫu <code>LIS</code> $O(N^2)$ chuẩn mực nhất: khởi tạo <code>dp(n + 1, 1)</code>, kiểm tra tăng ngặt <code>a[j] &lt; a[i]</code> và nhớ in <code>*max_element(dp.begin() + 1, dp.end())</code> (tuyệt đối không in <code>dp[n]</code>!).'
      },
      {
        id: 'VNOJ-QBSTR',
        title: 'Xâu con chung dài nhất (QBSTR)',
        judge: 'VNOJ',
        tier: 1,
        link: 'https://oj.vnoi.info/problem/qbstr',
        hint: 'Giới hạn độ dài hai xâu $|A|, |B| \\le 2000$, TL 1.0s, ML 512 MB. Áp dụng bảng 2D <code>dp[i][j]</code> kích thước $(n + 1) \\times (m + 1)$: nếu <code>A[i - 1] == B[j - 1]</code> thì lấy đường chéo <code>dp[i - 1][j - 1] + 1</code>, ngược lại lấy <code>max(dp[i - 1][j], dp[i][j - 1])</code>!'
      },
      {
        id: 'DP-C',
        title: 'C - Vacation',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/dp/tasks/dp_c',
        hint: 'Giới hạn $1 \\le N \\le 10^5$, $1 \\le a_i, b_i, c_i \\le 10^4$, TL 2.0s, ML 1024 MB. Khuôn mẫu DP Máy trạng thái kinh điển: <code>dp[i][0/1/2]</code> lưu tổng điểm hạnh phúc lớn nhất sau $i$ ngày kết thúc ở hoạt động $0/1/2$, chuyển từ <code>max</code> của $2$ trạng thái khác ngày trước và nhớ dùng <code>long long</code>!'
      },
      {
        id: 'DP-F',
        title: 'F - LCS',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/dp/tasks/dp_f',
        hint: 'Giới hạn $1 \\le |s|, |t| \\le 3000$, TL 2.0s, ML 1024 MB. Khác với <code>QBSTR</code>, bài này bắt in ra <strong>chính xâu LCS</strong> chứ không phải độ dài! Dựng bảng 2D <code>vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(m + 1, 0))</code> rồi truy vết ngược từ <code>(n, m)</code> về <code>(0, 0)</code> và gọi <code>reverse()</code>!'
      },
      {
        id: 'CSES-1639',
        title: 'Edit Distance',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1639',
        hint: 'Giới hạn $1 \\le n, m \\le 5000$, TL 1.00s, ML 512 MB. Khoảng cách biến đổi xâu chuẩn mực: đừng quên khởi tạo <strong><code>dp[i][0] = i</code></strong> và <strong><code>dp[0][j] = j</code></strong>, dùng kiểu <code>int</code> (tốn khoảng $100\\text{ MB} \\lt 512\\text{ MB}$) và lấy <code>min</code> của $3$ nhánh Xóa / Chèn / Thay thế!'
      },
      {
        id: 'CF-698A',
        title: '698A - Vacations',
        judge: 'Codeforces',
        tier: 2,
        link: 'https://codeforces.com/problemset/problem/698/A',
        hint: 'Giới hạn $1 \\le n \\le 100$, $0 \\le a_i \\le 3$, TL 1.0s, ML 256 MB. DP Máy trạng thái tìm số ngày nghỉ <strong>nhỏ nhất</strong>: <code>dp[i][0]</code> (nghỉ), <code>dp[i][1]</code> (thi nếu <code>a[i] == 1 || a[i] == 3</code>), <code>dp[i][2]</code> (gym nếu <code>a[i] == 2 || a[i] == 3</code>), khởi tạo <code>INF</code> và <code>dp[0][0..2] = 0</code>!'
      },
      {
        id: 'CF-1195C',
        title: '1195C - Basketball Exercise',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/1195/C',
        hint: 'Giới hạn $1 \\le n \\le 10^5$, $1 \\le h_{1,i}, h_{2,i} \\le 10^9$, TL 2.0s, ML 256 MB. DP Máy trạng thái 3 lựa chọn mỗi cột: <code>dp[i][0]</code> (bỏ qua cả 2 hàng), <code>dp[i][1]</code> (chọn hàng 1: cộng từ <code>max(dp[i-1][0], dp[i-1][2])</code>), <code>dp[i][2]</code> (chọn hàng 2: cộng từ <code>max(dp[i-1][0], dp[i-1][1])</code>) &mdash; bắt buộc dùng <code>long long</code>!'
      },
      {
        id: 'CF-1350B',
        title: '1350B - Orac and Models',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/1350/B',
        hint: 'Giới hạn $1 \\le t \\le 100$, $1 \\le n \\le 10^5$, $\\sum n \\le 10^5$, $1 \\le s_i \\le 10^9$, TL 3.0s, ML 256 MB. Biến thể LIS dùng Push-DP trên bội số chỉ số: với mỗi $i = 1..n$, chỉ đẩy sang các bội $j = 2i, 3i, \\dots \\le n$ thỏa <code>s[i] &lt; s[j]</code> (<code>dp[j] = max(dp[j], dp[i] + 1)</code>) trong $O(N \\log N)$, rồi in <code>*max_element</code> toàn mảng!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
