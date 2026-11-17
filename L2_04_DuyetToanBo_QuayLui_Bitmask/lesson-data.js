/**
 * DỮ LIỆU BÀI GIẢNG L2-04: CÂY ĐỆ QUY, QUAY LUI & BITMASK TẬP CON
 * Tầng 2 — Pha 2 STL Lớp 9 (Nối tiếp từ MOD-00, MOD-01 & L1-04..L2-03)
 * Mở khóa:
 * - Cây đệ quy đa nhánh & khung Quay lui (Backtracking) 3 pha: Chọn -> Thử Đệ Quy -> Trả Lại Trạng Thái;
 *   sinh xâu nhị phân 2^N (N <= 20), tổ hợp C(N, K), hoán vị N! (N <= 10, mảng used[]),
 *   truyền tham chiếu & tránh copy O(N), và ứng dụng viết hàm solve_trau() làm Oracle cho Máy chấm (MOD-00).
 * - Quay lui trên lưới (N-Queens) với kiểm tra cột/chéo O(1) (col[c], diag1[r - c + n], diag2[r + c])
 *   và kỹ thuật Nhánh cận (Branch & Bound) cắt nhánh vượt ngưỡng / thua cận lạc quan.
 * - Phép toán Bit (&, |, ^, <<, >>) & Bitmask Tập Con 2^N không đệ quy, cùng 2 bẫy kinh điển:
 *   thứ tự ưu tiên == mạnh hơn & (cộng thêm bẫy == 1 sai với bit i >= 1) và tràn dấu 1 << k khi k >= 31 (dùng 1LL << k).
 * Ranh giới tiền đề: KHÔNG dùng kiến thức chưa học (L2-05 Tham lam / Exchange Argument, L2-06+ Quy hoạch động / Bitmask DP).
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'duyet_toan_bo_quay_lui',
    number: 'Bài Học L2-04',
    shortTitle: 'Quay Lui & Bitmask',
    title: 'Bài L2-04: Cây Đệ Quy, Quay Lui & Bitmask Tập Con',
    lead: 'Biến bài toán không thể viết cố định $N$ vòng <code>for</code> lồng nhau thành <strong>Cây quyết định</strong> gọn gàng bằng khung <strong>Quay lui</strong> ($N \\le 20$ cho $2^N$, $N \\le 10$ cho $N!$) để vừa giải trực tiếp bài ràng buộc nhỏ, vừa tự tạo hàm <code>solve_trau()</code> cho <strong>Máy chấm (<code>MOD-00</code>)</strong>; làm chủ <strong>$N$-Queens &amp; Nhánh cận</strong> và thu gọn việc duyệt $2^N$ tập con vào 1 con số nguyên bằng <strong>Bitmask</strong>.',
    modules: [
      // ============================================================================
      // MODULE 1: CÂY ĐỆ QUY & KHUNG QUAY LUI (NHỊ PHÂN, TỔ HỢP, HOÁN VỊ & ORACLE MOD-00)
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Cây Đệ Quy & Quay Lui',
        title: 'Vấn Đề Nhỏ 1: Cây Đệ Quy &amp; Khung Quay Lui (Nhị Phân, Tổ Hợp, Hoán Vị &amp; Oracle Máy Chấm)',
        lead: 'Từ hình ảnh đi mê cung đánh dấu phấn đến khung 3 pha <em>Chọn &rarr; Thử Đệ Quy &rarr; Trả Lại Trạng Thái</em>: sinh trọn vẹn $2^N$ xâu nhị phân, tổ hợp $\\binom{N}{K}$, hoán vị $N!$, định lượng ngưỡng $N$ theo chuẩn $10^8$ phép tính/giây (<code>L1-04</code>) và dùng làm <code>solve_trau()</code> bắt lỗi WA trong <code>MOD-00</code>.',
        subproblem: {
          title: 'Làm sao thử mọi cấu hình có độ dài $N$ nhập từ bàn phím khi không thể viết sẵn $N$ vòng <code>for</code> lồng nhau, và làm sao tạo đáp án chuẩn cho Máy chấm <code>MOD-00</code>?',
          desc: 'Vòng <code>for</code> lồng nhau chỉ cố định cho $2$ hay $3$ phần tử, còn $N$ thay đổi theo từng test! Ta dùng chính lời gọi đệ quy (<code>MOD-01</code>) làm "vòng lặp co giãn" tự động xếp sâu $N$ tầng: mỗi bước thử 1 lựa chọn, đi hết nhánh rồi <strong>hoàn tác sạch sẽ</strong> để thử nhánh kế tiếp.'
        },
        cards: [
          {
            heading: 'Đi Mê Cung Với Viên Phấn: Khung Quay Lui 3 Pha &amp; Sinh Nhị Phân / Tổ Hợp',
            tag: '2^N (N &le; 20)',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tưởng tượng bạn đứng trước một ngã rẽ trong mê cung và cầm theo một viên phấn để không đi nhầm lại đường cũ:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Pha 1 &mdash; Chọn (Choose):</strong> Chọn 1 ngã rẽ (ví dụ viết ký tự <code>'0'</code> hoặc thêm số <code>v</code> vào danh sách <code>cur</code>) và <strong>vạch dấu phấn</strong> lên vách tường.</li>
                  <li><strong>Pha 2 &mdash; Thử Đệ Quy (Explore):</strong> Bước sâu vào ngã rẽ đó bằng cách gọi hàm ở vị trí kế tiếp <code>pos + 1</code> (hoặc <code>v + 1</code>) cho tới khi chạm điểm dừng <code>pos == n</code> (hoặc đủ $K$ phần tử).</li>
                  <li><strong>Pha 3 &mdash; Trả Lại Trạng Thái (Unchoose / Backtrack):</strong> Khi đã khám phá xong cả nhánh đó, quay lùi đúng về ngã ba ban đầu và <strong>xóa nét phấn vừa vạch</strong> (<code>cur.pop_back()</code>) để thử ngã tiếp theo trong trạng thái sạch nguyên vẹn!</li>
                  <li><strong>Thước đo giới hạn $N$ (<code>L1-04</code>: $10^8$ phép tính/giây):</strong>
                    <ul style="margin: 4px 0 0 20px;">
                      <li><strong>Sinh xâu nhị phân / tập con $2^N$:</strong> $N = 20 \\Rightarrow 2^{20} = 1\\,048\\,576$ nhánh (chạy vài chục mili-giây &rarr; <strong>AC rất an toàn với $N \\le 20$</strong>). Tới $N = 25 \\Rightarrow 3.3 \\cdot 10^7$ (mấp mé ngưỡng TLE).</li>
                      <li><strong>Sinh tổ hợp $\\binom{N}{K}$:</strong> Bắt buộc truyền thêm biến <code>start</code> và gọi đệ quy từ <code>v + 1</code> để các phần tử luôn tăng ngặt, không bao giờ lặp lại cặp như <code>{1, 2}</code> và <code>{2, 1}</code>!</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Sinh Xâu Nhị Phân &amp; Tổ Hợp C(N, K) Chuẩn C++14 (Truyền Tham Chiếu &amp;)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// Luôn truyền tham chiếu &amp; cho cur để KHÔNG tốn O(N) sao chép ở mỗi nút cây!
void genBinary(int pos, int n, string&amp; cur) {
    if (pos == n) {
        cout &lt;&lt; cur &lt;&lt; ' ';
        return;
    }
    for (char ch : {'0', '1'}) {
        cur.push_back(ch);          // 1. Chọn
        genBinary(pos + 1, n, cur); // 2. Thử đệ quy
        cur.pop_back();             // 3. Trả lại trạng thái
    }
}

void genComb(int start, int n, int k, vector&lt;int&gt;&amp; cur) {
    if ((int)cur.size() == k) {
        cout &lt;&lt; '{' &lt;&lt; cur[0] &lt;&lt; ',' &lt;&lt; cur[1] &lt;&lt; "} ";
        return;
    }
    // Chỉ duyệt tiếp từ start trở đi và gọi v + 1 để giữ thứ tự tăng ngặt
    for (int v = start; v &lt;= n; v++) {
        cur.push_back(v);
        genComb(v + 1, n, k, cur);
        cur.pop_back();
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string s;
    genBinary(0, 3, s);
    cout &lt;&lt; '\\n';

    vector&lt;int&gt; cur;
    genComb(1, 4, 2, cur);
    cout &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cây quyết định (<code>Decision Tree</code>):</strong> Sơ đồ phân nhánh mọi lựa chọn từ gốc (chưa chọn gì) tới các nút lá (một cấu hình hoàn chỉnh).</li>
                  <li><strong>Quay lui (<code>Backtracking</code>):</strong> Kỹ thuật duyệt sâu trên cây quyết định theo chu trình bất biến: <em>Chọn &rarr; Đệ quy &rarr; Hoàn tác trạng thái</em>.</li>
                  <li><strong>Truyền tham chiếu <code>&amp;</code> (<code>Pass by Reference</code>):</strong> Dùng chung đúng 1 biến <code>cur</code> trên toàn bộ cây đệ quy và tự <code>pop_back()</code> khi rút lui, tiết kiệm gấp $N$ lần thời gian và RAM so với truyền bản sao.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Sinh Hoán Vị N! Với Mảng used[] &amp; Làm Oracle "Đáp Án Chuẩn" Cho Máy Chấm (MOD-00)',
            tag: 'N! (N &le; 10) &bull; Stress Test',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Khác với tổ hợp (chỉ cần biết ai có mặt), bài toán <strong>Hoán vị</strong> hỏi có bao nhiêu cách xếp thứ tự $N$ bạn học sinh vào $N$ chiếc ghế (ví dụ <code>{1, 2, 3}</code> khác hẳn <code>{2, 1, 3}</code>):</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Mỗi bạn mang một thẻ đánh dấu <code>used[v]</code>. Khi bạn <code>v</code> ngồi vào ghế hiện tại: gắn <code>used[v] = true;</code> và <code>cur.push_back(v);</code>. Khi bạn ấy đứng dậy nhường chỗ cho thử nghiệm khác, <strong>bắt buộc trả cả hai</strong>: <code>cur.pop_back();</code> và <code>used[v] = false;</code>!</li>
                  <li><strong>Ngưỡng an toàn của $N!$:</strong> $8! = 40\\,320$, $10! = 3\\,628\\,800$ (AC thoải mái), nhưng $11! \\approx 3.99 \\cdot 10^7$ rất sát biên và $12! \\approx 4.79 \\cdot 10^8$ (TLE chắc chắn!).</li>
                  <li><strong>Ứng dụng vàng kết nối <code>MOD-00</code> (Máy chấm):</strong> Khi thi thật với $N = 10^5$, bạn viết một hàm nhanh <code>solveNhanh()</code> bằng <code>sort</code> + <code>lower_bound</code> (<code>L2-02</code>) nhưng nộp bị <strong>WA test ẩn</strong>! Lúc này, hãy viết ngay một hàm <code>solveTrau()</code> bằng Quay lui duyệt mọi lựa chọn trên bộ test nhỏ $N \\le 8$ sinh ngẫu nhiên bằng <code>mt19937</code>. Vì code Quay lui bám sát nguyên văn đề bài nên làm <strong>Oracle (đáp án chuẩn)</strong> chỉ ra đúng test gây WA trong tích tắc!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Sinh Hoán Vị N! &amp; Đối Chiếu solveTrau vs solveNhanh (MOD-00)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

void genPerm(int n, vector&lt;int&gt;&amp; cur, vector&lt;bool&gt;&amp; used) {
    if ((int)cur.size() == n) {
        for (int i = 0; i &lt; n; i++) cout &lt;&lt; cur[i] &lt;&lt; (i + 1 == n ? '\\n' : ' ');
        return;
    }
    for (int v = 1; v &lt;= n; v++) {
        if (used[v]) continue;
        used[v] = true;         // Đánh dấu đã chọn
        cur.push_back(v);
        genPerm(n, cur, used);
        cur.pop_back();         // Hoàn tác phần tử
        used[v] = false;        // Hoàn tác thẻ đánh dấu!
    }
}

// Oracle (Code trâu MOD-00): Quay lui kiểm tra có 2 phần tử tổng == target không
void dfsPair(int idx, int picked, long long sum, const vector&lt;long long&gt;&amp; a, long long target, bool&amp; ok) {
    if (ok) return;
    if (picked == 2) { if (sum == target) ok = true; return; }
    if (idx == (int)a.size()) return;
    dfsPair(idx + 1, picked + 1, sum + a[idx], a, target, ok);
    dfsPair(idx + 1, picked, sum, a, target, ok);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;int&gt; cur;
    vector&lt;bool&gt; used(4, false);
    genPerm(3, cur, used);

    vector&lt;long long&gt; a = {4, -1, 7, 2};
    bool ok = false;
    dfsPair(0, 0, 0LL, a, 6, ok); // 4 + 2 == 6
    cout &lt;&lt; (ok ? "TIM THAY CAP" : "KHONG CO") &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Hoán vị (<code>Permutation</code>):</strong> Mọi cách sắp xếp thứ tự đầy đủ $N$ phần tử phân biệt, có đúng $N!$ cấu hình và độ sâu cây đệ quy bằng $N$.</li>
                  <li><strong>Mảng đánh dấu (<code>used[]</code> / <code>visited[]</code>):</strong> Mảng boolean ghi nhận giá trị nào đang có mặt trên đường đi hiện tại của cây đệ quy để không chọn lặp.</li>
                  <li><strong>Oracle Đối Chứng (<code>Stress-Test Oracle</code>):</strong> Hàm <code>solveTrau()</code> chạy chậm ($O(2^N)$ hoặc $O(N!)$) nhưng đơn giản tuyệt đối trên test nhỏ $N \\le 8$ để bắt lỗi sai của code tối ưu trong <code>MOD-00</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_backtrack_unchoose',
            title: 'Phòng Thí Nghiệm 1A: Quên Trả Lại used[v] = false; Khi Sinh Hoán Vị {1, 2, 3}',
            desc: 'Cần in toàn bộ 6 hoán vị của {1, 2, 3}. Thử bật công tắc quên trả lại trạng thái used[v] = false (như lỗi copy-paste giữ nguyên used[v] = true;) để xem nhánh đệ quy bị khóa cứng thế nào!',
            toggles: [
              {
                key: 'restoreUsed',
                label: 'Hành động hoàn tác sau đệ quy',
                options: [
                  { value: 'restore', text: 'used[v] = false; — Trả lại trạng thái sạch (AC)', kind: 'ok' },
                  { value: 'forget', text: 'used[v] = true; — Quên mở khóa sau đệ quy (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.restoreUsed === 'restore';
              const code = `#include <bits/stdc++.h>
using namespace std;

int n = 3, cnt = 0;
vector<int> cur;
bool used[10];

void genPerm() {
    if ((int)cur.size() == n) {
        cnt++;
        for (int i = 0; i < n; i++) cout << cur[i] << (i + 1 == n ? ';' : ' ');
        return;
    }
    for (int v = 1; v <= n; v++) {
        if (used[v]) continue;
        used[v] = true;
        cur.push_back(v);
        genPerm();
        cur.pop_back();
${isOk ? '        used[v] = false;' : '        used[v] = true;'}
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    genPerm();
    cout << " total=" << cnt << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [20],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Trả lại used[v] = false giúp các nhánh anh em dùng lại được giá trị v và sinh đủ 6 hoán vị!'
                  : 'THIẾU NGHIỆM NGHIÊM TRỌNG (WA): Vì không đặt lại false, cả 3 số 1, 2, 3 bị khóa vĩnh viễn sau nhánh đầu tiên nên chỉ in ra đúng 1 hoán vị!',
                predictions: [
                  { text: 'Chương trình giải phóng từng giá trị khi rút lui và in đủ 6 hoán vị (total=6)' },
                  { text: 'Sau hoán vị 1 2 3 đầu tiên, cả 3 số đều bị khóa used=true nên chỉ in được 1 kết quả (total=1)' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1 2 3;1 3 2;2 1 3;2 3 1;3 1 2;3 2 1; total=6'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1 2 3; total=1',
                explain: isOk
                  ? 'Mỗi lần cur.pop_back() rút một số ra khỏi dãy, lệnh used[v] = false; báo rằng số v lại rảnh rỗi để các nhánh quay lui tiếp theo có thể chọn vào vị trí khác.'
                  : 'Khi nhánh đầu chọn 1 &rarr; 2 &rarr; 3 hoàn tất và lùi về, mảng used[1], used[2], used[3] vẫn giữ nguyên giá trị true! Mọi vòng for ở các tầng trên đều gặp if (used[v]) continue; và bỏ qua hết.'
              };
            }
          },
          {
            id: 'sb_comb_start',
            title: 'Phòng Thí Nghiệm 1B: Sinh Tổ Hợp C(3, 2) — Dùng Biến start vs Duyệt Lại Từ 1',
            desc: 'Cần liệt kê 3 tập con gồm 2 phần tử phân biệt từ {1, 2, 3}: {1,2}, {1,3}, {2,3}. Thử đổi vòng lặp từ start sang chạy lại từ 1 để thấy tổ hợp biến thành cặp lặp và trùng thứ tự!',
            toggles: [
              {
                key: 'loopStart',
                label: 'Điểm bắt đầu vòng for trong genComb(start)',
                options: [
                  { value: 'from_start', text: 'for (int v = start; v &lt;= n; v++) — Giữ tăng ngặt (AC)', kind: 'ok' },
                  { value: 'from_one', text: 'for (int v = 1; v &lt;= n; v++) — Bỏ qua start (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.loopStart === 'from_start';
              const code = `#include <bits/stdc++.h>
using namespace std;

int n = 3, k = 2, cnt = 0;
vector<int> cur;

void genComb(int start) {
    if ((int)cur.size() == k) {
        cnt++;
        cout << '{' << cur[0] << ',' << cur[1] << "} ";
        return;
    }
${isOk ? '    for (int v = start; v <= n; v++) {' : '    for (int v = 1; v <= n; v++) {'}
        cur.push_back(v);
        genComb(v + 1);
        cur.pop_back();
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    genComb(1);
    cout << "cnt=" << cnt << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [13],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Tham số start kèm genComb(v + 1) sinh đúng 3 tổ hợp tăng ngặt không trùng!'
                  : 'SINH TRÙNG LẶP (WA): Duyệt lại từ 1 tạo cả cặp tự lặp {1,1}, {2,2} lẫn lặp thứ tự {1,2} và {2,1} (ra tới 9 cặp)!',
                predictions: [
                  { text: 'In ra đúng 3 tổ hợp tăng ngặt {1,2} {1,3} {2,3} và cnt=3' },
                  { text: 'In ra 9 cặp gồm cả {1,1}, {2,1}, {3,1}, {3,3} và cnt=9' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n{1,2} {1,3} {2,3} cnt=3'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n{1,1} {1,2} {1,3} {2,1} {2,2} {2,3} {3,1} {3,2} {3,3} cnt=9',
                explain: isOk
                  ? 'Khi đã chọn giá trị v ở vị trí hiện tại, truyền v + 1 làm start cho tầng sau ép mọi phần tử đứng sau đều lớn hơn v, tự động loại bỏ hoàn toàn trùng lặp.'
                  : 'Dù đã truyền v + 1 vào tham số start, vòng for bên trong lại cố chấp chạy từ v = 1! Tham số start bị bỏ rơi hoàn toàn nên mỗi tầng đều thử đủ cả 3 số 1, 2, 3.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int cnt = 0;
void gen(int pos, int n, string cur) {
    if (pos == n) {
        cnt++;
        cout << cur << ' ';
        return;
    }
    gen(pos + 1, n, cur + '0');
    if (cur.empty() || cur.back() != '1') {
        gen(pos + 1, n, cur + '1');
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    gen(0, 3, "");
    cout << "| " << cnt << '\\n';
    return 0;
}`,
            q: 'Theo dõi cây đệ quy sinh xâu nhị phân độ dài $3$ không chứa hai số <code>1</code> kề nhau ở trên. Dòng kết quả in ra màn hình là gì?',
            options: [
              'In ra 000 001 010 011 100 101 | 6 vì chỉ có nhánh 110 và 111 bị điều kiện chặn lại',
              'In ra 000 010 001 100 101 | 5 vì nhánh thử ký tự 1 luôn được ưu tiên chạy trước nhánh 0',
              'In ra 000 001 010 100 101 | 5 vì tại mọi bước ta gọi nhánh thêm 0 trước rồi mới thử thêm 1',
              'In ra 000 001 010 101 | 4 vì khi xâu đang là 10 hàm không được phép nối thêm ký tự 0 vào cuối'
            ],
            correct: 2,
            explain: 'Hàm luôn rẽ nhánh thêm \'0\' trước rồi mới kiểm tra điều kiện cur.empty() || cur.back() != \'1\' để rẽ nhánh thêm \'1\'. Khi cur = "01", bước tiếp theo không được thêm \'1\' (bỏ "011"). Khi cur = "1", chỉ thêm được \'0\' thành "10", rồi nối \'0\' ("100") và \'1\' ("101"). Tổng có 5 xâu theo đúng thứ tự: 000 001 010 100 101 | 5.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> cur;
void comb(int start, int n, int k) {
    if ((int)cur.size() == k) {
        cout << cur[0] << cur[1] << ' ';
        return;
    }
    for (int v = start; v <= n; v++) {
        cur.push_back(v);
        comb(v + 1, n, k);
        cur.pop_back();
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    comb(1, 4, 2);
    cout << '\\n';
    return 0;
}`,
            q: 'Đoạn code trên sinh tất cả tổ hợp $C(4, 2)$ và ghép liền hai chữ số khi in. Kết quả chính xác trên màn hình là gì?',
            options: [
              'In ra 12 13 14 23 24 34 theo đúng thứ tự tăng dần từng phần tử từ trái qua phải',
              'In ra 12 13 14 21 23 24 vì vòng lặp vẫn cho phép ghép lại phần tử đứng phía trước',
              'In ra 12 23 34 13 24 14 vì hàm gọi đệ quy theo chiều rộng từng khoảng cách một',
              'In ra 11 12 13 14 22 23 24 vì lời gọi đệ quy truyền nhầm v thay vì v + 1 ở tầng sau'
            ],
            correct: 0,
            explain: 'Khi v = 1, tầng sau nhận start = 2 nên lần lượt ghép thành 12, 13, 14. Sau khi pop_back() trả lại rỗng và tăng v = 2, tầng sau nhận start = 3 nên sinh 23, 24. Cuối cùng v = 3 sinh 34; tới v = 4 gọi comb(5, 4, 2) thì vòng for không chạy nữa. Kết quả: 12 13 14 23 24 34.'
          },
          {
            type: 'single',
            q: 'Bạn nộp một bài có $N \\le 10^5$ dùng <code>sort</code> + <code>lower_bound</code> (<code>L2-02</code>) và bị <strong>WA ở test ẩn</strong> mà chưa rõ sai biên nào. Cách ứng dụng code Quay lui $O(N!)$ thiết thực nhất theo bài Máy chấm (<code>MOD-00</code>) là gì?',
            options: [
              'Nộp thẳng code Quay lui O(N!) lên máy chấm trực tuyến và tăng giới hạn mảng lên 10^5 phần tử',
              'Chép code Quay lui vào vòng lặp while vô tận để ép hệ điều hành cấp thêm RAM cho Call Stack',
              'Thay toàn bộ câu lệnh std::sort bằng hàm quay lui sinh hoán vị rồi nộp lại để tránh sai biên',
              'Viết hàm solveTrau() bằng Quay lui chạy trên test ngẫu nhiên N &lt;= 8 để tìm ra test gây WA'
            ],
            correct: 3,
            explain: 'Code Quay lui có độ phức tạp O(2^N) hay O(N!) không thể qua test lớn N = 10^5, nhưng trên bộ test nhỏ N &lt;= 8 sinh từ mt19937 (MOD-00) nó chạy dưới 1 mili-giây và mô tả chính xác định nghĩa đề bài &mdash; là hàm đối chứng chuẩn (Oracle) tuyệt vời để tìm ra test sai của code nhanh.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về kỹ thuật Quay lui và ước lượng độ phức tạp trong C++14 (Pha 2)?',
            options: [
              'Với thời gian 1 giây (~10^8 phép tính), thuật toán O(2^N * N) chạy an toàn cho N &lt;= 20, còn O(N! * N) phù hợp cho N &lt;= 10',
              'Nên truyền vector&lt;int&gt;&amp; cur bằng tham chiếu (&amp;) kèm pop_back() thay vì truyền bản sao vector cur qua mỗi lời gọi đệ quy',
              'Khi quên hoàn tác cur.pop_back() hoặc used[v] = false, chương trình vẫn tự động quay về trạng thái cũ nhờ trình biên dịch',
              'Để sinh tổ hợp chập K không trùng thứ tự, hàm đệ quy nhận tham số start và truyền v + 1 xuống lời gọi tiếp theo'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D đều đúng. C sai hoàn toàn vì truyền tham chiếu dùng chung một biến cur hoặc mảng used toàn cục nên bắt buộc phải tự hoàn tác bằng tay; nếu quên, dấu vết của nhánh trước sẽ làm hỏng toàn bộ các nhánh sau.'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: QUAY LUI TRÊN LƯỚI (N-QUEENS) & KỸ THUẬT NHÁNH CẬN (BRANCH & BOUND)
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'N-Queens & Nhánh Cận',
        title: 'Vấn Đề Nhỏ 2: Quay Lui Trên Lưới ($N$-Queens) &amp; Kỹ Thuật Nhánh Cận (Branch &amp; Bound)',
        lead: 'Rút gọn không gian thử bàn cờ $N \\times N$ xuống từng hàng, kiểm tra xung đột cột và 2 đường chéo chỉ trong $O(1)$ với mẹo dịch chỉ số <code>r - c + n</code>, rồi học nghệ thuật <strong>Nhánh cận</strong> cắt bỏ sớm hàng trăm nghìn nhánh chắc chắn vô vọng.',
        subproblem: {
          title: 'Làm sao kiểm tra hai quân hậu có ăn nhau hay không trong $O(1)$ mà không bị âm chỉ số mảng, và làm sao thu gọn cây tìm kiếm từ hàng trăm nghìn nhánh xuống chỉ còn vài chục nhánh?',
          desc: 'Nếu đặt $N$ quân hậu bừa lên $N^2$ ô rồi quét lại bàn cờ kiểm tra thì vừa chậm vừa phình nhánh thành $\\binom{N^2}{N}$. Còn trong các bài tối ưu như tìm tổng tập con $\\le S$, duyệt hết tới tận lá mới kiểm tra khiến ta lãng phí thời gian trên những nhánh đã biết chắc chắn không thể thắng kỷ lục!'
        },
        cards: [
          {
            heading: 'Bài Toán $N$-Queens: Giảm Chiều Theo Hàng &amp; Mẹo Dịch Đường Chéo r - c + n',
            tag: 'Kiểm tra O(1)',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Bạn cần xếp $N$ vị khách VIP vào bàn cờ $N \\times N$ sao cho không hai ai cùng hàng, cùng cột hay cùng đường chéo:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Mỗi hàng chỉ có đúng 1 chỗ:</strong> Thay vì thử từng ô ngẫu nhiên trên cả $N^2$ ô, ta chỉ định dứt khoát <em>"hàng <code>r</code> đặt quân hậu số <code>r</code>"</em>, rồi chọn cột <code>c</code> từ <code>0</code> đến <code>n - 1</code>! Tự động loại sạch xung đột cùng hàng.</li>
                  <li><strong>Biển báo cấm $O(1)$ cho cột và hai đường chéo:</strong>
                    <ol style="margin: 4px 0 0 20px;">
                      <li><strong>Cột thẳng đứng:</strong> Các ô cùng cột có chung giá trị <code>c</code> &rarr; dùng mảng <code>usedCol[c]</code>.</li>
                      <li><strong>Đường chéo phụ (hướng <code>/</code>):</strong> Thử cộng tọa độ các ô trên cùng đường chéo phụ như <code>(0,2), (1,1), (2,0)</code>: tổng <strong><code>r + c</code> luôn bằng nhau</strong> (từ <code>0</code> tới <code>2n - 2</code>) &rarr; dùng <code>diagAnti[r + c]</code>.</li>
                      <li><strong>Đường chéo chính (hướng <code>\\</code>):</strong> Thử trừ tọa độ các ô như <code>(0,1), (1,2), (2,3)</code>: hiệu <strong><code>r - c</code> luôn bằng nhau</strong>, nhưng có thể <strong>ÂM</strong> (từ <code>-(n - 1)</code> đến <code>n - 1</code>)! Tuyệt đối <strong>KHÔNG dùng <code>abs(r - c)</code></strong> (vì sẽ gộp nhầm 2 đường chéo đối xứng nhau!) &mdash; hãy <strong>cộng bù thêm <code>+ n</code></strong> thành <code>diagMain[r - c + n]</code> để chỉ số luôn dương từ <code>1</code> tới <code>2n - 1</code>!</li>
                    </ol>
                  </li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Giải N-Queens (Và Biến Thể Ô Cấm '*') Trong O(1) Kiểm Tra</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int n = 8, ways = 0;
vector&lt;bool&gt; usedCol, diagMain, diagAnti;

void placeQueen(int r) {
    if (r == n) {
        ways++;
        return;
    }
    for (int c = 0; c &lt; n; c++) {
        int d1 = r - c + n; // Dịch + n để chỉ số luôn &gt;= 1 (tránh âm mảng)
        int d2 = r + c;
        if (usedCol[c] || diagMain[d1] || diagAnti[d2]) continue;

        usedCol[c] = diagMain[d1] = diagAnti[d2] = true; // Chọn
        placeQueen(r + 1);                               // Thử đệ quy
        usedCol[c] = diagMain[d1] = diagAnti[d2] = false;// Trả trạng thái
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    usedCol.assign(n, false);
    diagMain.assign(2 * n + 1, false);
    diagAnti.assign(2 * n + 1, false);
    placeQueen(0);
    cout &lt;&lt; "So cach xep 8-Queens: " &lt;&lt; ways &lt;&lt; '\\n'; // 92
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Kiểm tra xung đột $O(1)$ (<code>O(1) Conflict Check</code>):</strong> Biến việc rà soát bàn cờ $O(N)$ thành đúng 3 phép tra mảng trực tiếp dựa trên bất biến tọa độ cột và hai đường chéo.</li>
                  <li><strong>Dịch chỉ số (<code>Index Shifting</code>):</strong> Cộng hằng số dương <code>+ n</code> vào đại lượng có thể âm (<code>r - c</code>) để biến thành chỉ số hợp lệ của <code>vector</code> / mảng trong C++.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Kỹ Thuật Nhánh Cận (Branch &amp; Bound): Cắt Phăng Nhánh Vô Vọng Ngay Giữa Đường',
            tag: 'Cắt tỉa nhánh',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tưởng tượng bạn cần chọn một tập các thùng hàng có trọng lượng <strong>dương</strong> ($w_i &gt; 0$) sao cho tổng trọng lượng <strong>lớn nhất nhưng không vượt quá $S = 100$ kg</strong>, và bạn đã ghi nhận được kỷ lục hiện tại là <code>best = 96</code> kg:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cắt nhánh 1 &mdash; Vượt ngưỡng (<code>Feasibility Bound</code>):</strong> Đang giữa chừng mà tổng trên xe đã lên <code>curSum = 105 &gt; 100</code>. Vì mọi thùng còn lại đều nặng dương (&gt; 0), chất thêm chỉ càng nặng hơn (hoặc giữ nguyên <code>105</code> vẫn phạm luật) &rarr; <strong>quay đầu <code>return;</code> ngay, không đi sâu thêm dù chỉ 1 bước!</strong></li>
                  <li><strong>Cắt nhánh 2 &mdash; Cận lạc quan (<code>Optimistic Bound</code>):</strong> Đứng trước thùng thứ <code>idx</code>, bạn có <code>curSum = 60</code> kg và biết tổng tất cả các thùng còn lại từ <code>idx</code> đến cuối chỉ là <code>suffixSum[idx] = 30</code> kg (tính sẵn bằng mảng cộng dồn hậu tố giống <code>L2-01</code>). Ngay cả khi gom sạch 100% số thùng còn lại cũng chỉ đạt tối đa <code>60 + 30 = 90 &lt;= 96</code> (thua kỷ lục <code>best</code>)! &rarr; <strong>Cắt bỏ toàn bộ nhánh con bên dưới!</strong></li>
                  <li><strong>Mẹo gia tốc:</strong> Sắp xếp mảng $w$ <strong>giảm dần</strong> rồi luôn ưu tiên thử nhánh <em>chọn</em> trước <em>bỏ qua</em> để sớm chạm kỷ lục cao nhất, khiến nhát kéo cắt nhánh hoạt động mạnh tối đa!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Nhánh Cận Tìm Tổng Tập Con Lớn Nhất &lt;= S Với Số Dương</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

void dfsBB(int idx, long long curSum, long long S,
           const vector&lt;long long&gt;&amp; w, const vector&lt;long long&gt;&amp; suf,
           long long&amp; best, long long&amp; calls) {
    calls++;
    if (curSum &gt; S) return;                    // Cắt 1: Vượt ngưỡng S (mọi w[i] &gt; 0)
    if (curSum + suf[idx] &lt;= best) return;     // Cắt 2: Thua cả cận lạc quan nhất!

    if (curSum &gt; best) best = curSum;
    if (best == S || idx == (int)w.size()) return;

    dfsBB(idx + 1, curSum + w[idx], S, w, suf, best, calls); // Thử chọn trước
    dfsBB(idx + 1, curSum, S, w, suf, best, calls);          // Rồi thử bỏ qua
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;long long&gt; w = {45, 38, 31, 27, 22, 19, 15, 14, 11, 9, 8, 6, 5, 4, 3, 2};
    sort(w.rbegin(), w.rend()); // Xếp giảm dần giúp sớm đạt kỷ lục cao
    int n = (int)w.size();
    vector&lt;long long&gt; suf(n + 1, 0);
    for (int i = n - 1; i &gt;= 0; i--) suf[i] = suf[i + 1] + w[i];

    long long best = 0, calls = 0;
    dfsBB(0, 0, 100, w, suf, best, calls);
    cout &lt;&lt; "Best = " &lt;&lt; best &lt;&lt; ", So loi goi = " &lt;&lt; calls &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Nhánh cận (<code>Branch &amp; Bound</code>):</strong> Kết hợp phân nhánh tìm kiếm với việc tính cận trên/cận dưới ở mỗi nút; hễ không thể tốt hơn kỷ lục <code>best</code> thì cắt nhánh ngay.</li>
                  <li><strong>Cận lạc quan (<code>Optimistic Bound</code>):</strong> Giá trị tốt nhất có thể mơ ước từ trạng thái hiện tại (ví dụ: cộng toàn bộ <code>suffixSum[idx]</code>); nếu đến mức lạc quan nhất còn thua <code>best</code> thì thực tế chắc chắn thua.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_nqueens_diag_shift',
            title: 'Phòng Thí Nghiệm 2A: Đường Chéo Chính r - c + n vs Dùng Sai abs(r - c) Trong 4-Queens',
            desc: 'Với bàn cờ N = 4, có đúng 2 cách xếp 4 quân hậu hợp lệ. Thử dùng abs(r - c) thay vì r - c + n để tránh số âm và xem hậu quả làm biến mất sạch cả 2 nghiệm!',
            toggles: [
              {
                key: 'diagMode',
                label: 'Công thức chỉ số đường chéo chính',
                options: [
                  { value: 'shift', text: 'int d1 = r - c + n; — Dịch dương chuẩn xác (AC)', kind: 'ok' },
                  { value: 'abs_bug', text: 'int d1 = abs(r - c); — Gộp nhầm 2 đường chéo (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.diagMode === 'shift';
              const code = `#include <bits/stdc++.h>
using namespace std;

int n = 4, ways = 0;
bool col[10], diag1[20], diag2[20];

void dfs(int r) {
    if (r == n) { ways++; return; }
    for (int c = 0; c < n; c++) {
${isOk ? '        int d1 = r - c + n;' : '        int d1 = abs(r - c);'}
        int d2 = r + c;
        if (col[c] || diag1[d1] || diag2[d2]) continue;
        col[c] = diag1[d1] = diag2[d2] = true;
        dfs(r + 1);
        col[c] = diag1[d1] = diag2[d2] = false;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    dfs(0);
    cout << ways << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [10],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Công thức r - c + n tách biệt rạch ròi mọi đường chéo chính và trả về đúng 2 nghiệm!'
                  : 'MẤT HẾT NGHIỆM (WA): abs(r - c) làm ô (0, 1) và (1, 0) dùng chung chỉ số 1 dù không hề chung đường chéo, xóa sổ cả 2 nghiệm (in 0)!',
                predictions: [
                  { text: 'Mỗi đường chéo có chỉ số riêng từ 1 đến 7 nên tìm đủ cả 2 nghiệm của 4-Queens' },
                  { text: 'Các ô đối xứng bị gán trùng chỉ số đường chéo nên chương trình tưởng bị ăn và in ra 0' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n2'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n0',
                explain: isOk
                  ? 'Với n = 4, r - c chạy từ -3 đến +3; cộng thêm n = 4 đưa về đoạn [1..7], vừa khớp kích thước mảng và giữ song ánh 1-1 cho tất cả 7 đường chéo chính.'
                  : 'Khi đặt hậu ở ô (0, 1), hiệu abs(0 - 1) = 1 đánh dấu diag1[1] = true. Sang hàng 1 và hàng 2, ô (2, 3) có đúng hiệu 2 - 3 = -1 (khác hẳn đường chéo kia) nhưng abs(-1) lại ra đúng 1 nên bị cấm oan!'
              };
            }
          },
          {
            id: 'sb_branch_and_bound',
            title: 'Phòng Thí Nghiệm 2B: Số Lời Gọi Đệ Quy Khi Có vs Không Có Cắt Nhánh Cận',
            desc: 'Tìm tổng tập con lớn nhất &lt;= 100 từ mảng 16 số dương. Quan sát số lần hàm solve() được gọi khi giữ hai điều kiện cắt nhánh cận so với quay lui thô toàn bộ 2^16 nhánh!',
            toggles: [
              {
                key: 'pruneMode',
                label: 'Chế độ Nhánh Cận',
                options: [
                  { value: 'bb', text: 'Bật cắt vượt S &amp; cắt cận hậu tố suf[idx] (Nhanh!)', kind: 'ok' },
                  { value: 'raw', text: 'Không cắt nhánh — Duyệt hết 2^16 nhánh (Chậm)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.pruneMode === 'bb';
              const code = `#include <bits/stdc++.h>
using namespace std;

vector<long long> w = {45, 38, 31, 27, 22, 19, 15, 14, 11, 9, 8, 6, 5, 4, 3, 2};
vector<long long> suf;
long long S = 100, best = 0, calls = 0;

void solve(int idx, long long curSum) {
    calls++;
${isOk
  ? '    if (curSum > S || curSum + suf[idx] <= best) return;\n    if (curSum > best) best = curSum;'
  : '    // Khong cat nhanh: chay du 2^16 nhanh\n    if (curSum <= S && curSum > best) best = curSum;'}
    if (idx == (int)w.size()) return;
    solve(idx + 1, curSum + w[idx]);
    solve(idx + 1, curSum);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = (int)w.size();
    suf.assign(n + 1, 0);
    for (int i = n - 1; i >= 0; i--) suf[i] = suf[i + 1] + w[i];
    solve(0, 0);
    cout << "best=" << best << " calls=" << calls << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [10, 11],
                statusOk: isOk,
                statusText: isOk
                  ? 'SIÊU TỐC NHỜ NHÁNH CẬN: Vẫn ra best = 100 nhưng chỉ cần 5,951 lời gọi thay vì 131,071 (giảm 22 lần)!'
                  : 'QUÁ NHIỀU NHÁNH THỪA: Tuy cùng ra best = 100 nhưng phải đi trọn 131,071 nút cây (nếu N = 30 sẽ nổ thành 2 tỷ nút TLE)!',
                predictions: [
                  { text: 'Cắt ngay khi vượt 100 hoặc không đủ bù tới kỷ lục nên chỉ tốn 5,951 lời gọi' },
                  { text: 'Không cắt nhánh nên phải duyệt trọn 2^(16+1) - 1 = 131,071 lời gọi đệ quy' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nbest=100 calls=5951'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nbest=100 calls=131071',
                explain: isOk
                  ? 'Nhánh bên trái nhanh chóng đạt best = 100 ngay từ những bước đầu. Kể từ đó, mọi nhánh vượt 100 hoặc tổng phần còn lại không vượt nổi 100 đều bị chặt bỏ tức thì.'
                  : 'Dù curSum đã lên tới 141 (&gt; 100) từ độ sâu thứ 4, code vẫn mù quáng rẽ nhánh thêm 12 tầng nữa cho cả 2^12 = 4,096 nhánh con vô ích!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int n = 4;
bool col[10], d1[20], d2[20], found = false;
int pos[10];

void dfs(int r) {
    if (found) return;
    if (r == n) {
        found = true;
        for (int i = 0; i < n; i++) cout << pos[i] << (i == n - 1 ? '\\n' : ' ');
        return;
    }
    for (int c = 0; c < n; c++) {
        if (col[c] || d1[r - c + n] || d2[r + c]) continue;
        col[c] = d1[r - c + n] = d2[r + c] = true;
        pos[r] = c;
        dfs(r + 1);
        col[c] = d1[r - c + n] = d2[r + c] = false;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    dfs(0);
    return 0;
}`,
            q: 'Với $N = 4$, hàm <code>dfs(0)</code> thử cột từ <code>0</code> đến <code>3</code> theo thứ tự tăng dần. Nghiệm ĐẦU TIÊN in ra màn hình (vị trí cột của 4 hàng <code>0, 1, 2, 3</code>) là gì?',
            options: [
              'In ra 0 2 1 3 vì khi đặt hậu đầu tiên ở ô (0, 0) bàn cờ 4x4 vẫn còn đủ chỗ xếp ba quân còn lại',
              'In ra 1 3 0 2 vì đặt hàng 0 ở cột 0 bị cụt ở hàng 2 nên nghiệm đầu tiên bắt đầu bằng cột 1',
              'In ra 2 0 3 1 vì vòng lặp cột luôn ưu tiên đi từ cột ở giữa trước rồi mới quay lại cột 0',
              'In ra 0 3 1 2 vì quân hậu ở hàng 1 cột 3 không cùng đường chéo phụ với ô (2, 1) trên bàn cờ'
            ],
            correct: 1,
            explain: 'Nếu đặt hàng 0 ở cột 0: hàng 1 chỉ còn cột 2 hoặc 3; cả hai đều làm hàng 2 không còn ô an toàn nào! Khi thử hàng 0 ở cột 1: hàng 1 buộc đặt ở cột 3, hàng 2 đặt được ở cột 0, hàng 3 đặt được ở cột 2. Kết quả đầu tiên tìm thấy là: 1 3 0 2.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

vector<int> w = {8, 5, 4};
vector<int> suf = {17, 9, 4, 0};
int S = 9, best = 0, calls = 0;

void solve(int idx, int curSum) {
    calls++;
    if (curSum > S || curSum + suf[idx] <= best) return;
    if (curSum > best) best = curSum;
    if (idx == (int)w.size()) return;
    solve(idx + 1, curSum + w[idx]);
    solve(idx + 1, curSum);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    solve(0, 0);
    cout << best << ' ' << calls << '\\n';
    return 0;
}`,
            q: 'Theo dõi cây Nhánh cận trên mảng <code>w = {8, 5, 4}</code> với <code>S = 9</code>. Hai số <code>best</code> và tổng số lời gọi <code>calls</code> in ra là gì?',
            options: [
              'In ra 8 15 vì thuật toán đi hết trọn cây nhị phân 15 nút của 3 phần tử và chọn giá trị 8',
              'In ra 9 7 vì ngay sau khi vượt S ở nhánh 8 + 5 hàm lập tức dừng toàn bộ chương trình ở lần gọi 7',
              'In ra 9 11 vì nhánh 8 + 5 bị cắt tại calls=3 và nhánh bỏ 8+5 còn tổng 4 bị cắt tại calls=7',
              'In ra 9 9 vì sau khi chọn 5 + 4 = 9 mọi nhánh tiếp theo có tổng nhỏ hơn đều bị cắt trước khi tăng calls'
            ],
            correct: 2,
            explain: 'Lần lượt: (1) (0,0)&rarr;best=0; (2) (1,8)&rarr;best=8; (3) (2,13&gt;9)&rarr;cắt; (4) (2,8): 8+4=12&gt;0 nên đi tiếp &rarr; (5) (3,12&gt;9)&rarr;cắt; (6) (3,8)&rarr;hết mảng; (7) quay về (1,0): 0+suf[1]=9&gt;8 nên đi tiếp &rarr; (8) (2,5): 5+4=9&gt;8 nên đi tiếp &rarr; (9) (3,9)&rarr;best=9; (10) (3,5)&rarr;5+0&lt;=9&rarr;cắt; (11) quay về (2,0): 0+suf[2]=4&lt;=9&rarr;cắt! Tổng: best = 9, calls = 11.'
          },
          {
            type: 'single',
            q: 'Vì sao khi đánh dấu đường chéo chính <code>\\</code> trong $N$-Queens ta viết <code>diagMain[r - c + n]</code> thay vì viết <code>diagMain[r - c]</code> hoặc <code>diagMain[abs(r - c)]</code>?',
            options: [
              'Vì r - c có thể âm gây lỗi ngoài mảng còn abs(r - c) lại gộp nhầm 2 đường chéo khác nhau về cùng 1 ô',
              'Vì phép cộng + n giúp trình biên dịch C++ tự động chuyển bảng đánh dấu từ kiểu bool sang long long',
              'Vì đường chéo chính trên bàn cờ N x N có số ô nhiều gấp đôi tổng số hàng nên hiệu r - c luôn bằng n',
              'Vì khi dùng abs(r - c) các quân hậu ở cùng hàng ngang sẽ bị trùng chỉ số cột nên không đi tiếp được'
            ],
            correct: 0,
            explain: 'Giá trị r - c chạy từ -(n - 1) tới +(n - 1): dùng thẳng sẽ gặp chỉ số âm (UB/RTE), còn dùng abs(r - c) làm (0, 1) (hiệu -1) trùng chỉ số với (1, 0) (hiệu +1) dù hai ô nằm trên hai đường chéo hoàn toàn khác nhau! Cộng thêm + n dịch an toàn về [1..2n-1].'
          },
          {
            type: 'multiple',
            q: 'Khi giải bài toán tối ưu tập con có tổng lớn nhất $\\le S$, những nhận định nào sau đây về <strong>Nhánh cận (Branch &amp; Bound)</strong> là <strong>ĐÚNG</strong>?',
            options: [
              'Chỉ được phép cắt nhánh bằng điều kiện if (curSum &gt; S) return; khi tất cả phần tử còn lại đều không âm (&gt;= 0)',
              'Nếu trong mảng vẫn còn số âm (ví dụ -50) thì khi curSum &gt; S ta vẫn có thể cắt nhánh ngay vì cộng thêm chỉ làm tăng tổng',
              'Nếu curSum + tổng các phần tử còn lại &lt;= best (với các phần tử đều dương) thì có thể cắt nhánh an toàn mà không làm mất nghiệm tối ưu',
              'Sắp xếp mảng giảm dần trước khi quay lui giúp tìm thấy giá trị best lớn sớm hơn, qua đó cắt được nhiều nhánh hơn'
            ],
            correct: [0, 2, 3],
            explain: 'A, C và D đều đúng. B sai: nếu phía sau còn phần tử âm như -50, một tổng đang vượt S vẫn có thể hạ xuống &lt;= S ở các bước sau, nên cắt khi curSum &gt; S sẽ làm mất nghiệm đúng!'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: PHÉP TOÁN BIT & BITMASK TẬP CON 2^N
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Bitmask Tập Con 2^N',
        title: 'Vấn Đề Nhỏ 3: Phép Toán Bit &amp; Bitmask Tập Con $2^N$',
        lead: 'Nén cả mảng chọn/không chọn của $N \\le 20$ phần tử vào một số nguyên <code>int mask</code> duy nhất: thành thạo 5 phép toán bit (<code>&amp;</code>, <code>|</code>, <code>^</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>), duyệt $2^N$ tập con không cần đệ quy và né sạch 2 bẫy C++ kinh điển về ưu tiên <code>==</code> và tràn bit <code>1LL &lt;&lt; k</code>.',
        subproblem: {
          title: 'Làm sao duyệt hết $2^N$ tập con ($N \\le 20$) bằng một vòng <code>for</code> phẳng gọn mà không cần hàm đệ quy hay mảng <code>used[]</code>, và tránh hai bẫy C++ khiến code bit chạy sai kết quả?',
          desc: 'Dùng đệ quy sinh tập con tốn khung nhớ Call Stack và dài dòng; trong khi mỗi số nguyên từ $0$ đến $2^N - 1$ tự nhiên tương ứng 1-1 với một tổ hợp Bật/Tắt của $N$ công tắc. Tuy nhiên, viết sai ngoặc ở toán tử <code>&amp;</code> hoặc quên hậu tố <code>LL</code> ở <code>1 &lt;&lt; k</code> sẽ cho kết quả sai hoàn toàn!'
        },
        cards: [
          {
            heading: 'Bảng Công Tắc Đèn Trong RAM: 5 Phép Toán Bit &amp; 2 Bẫy C++ Chết Người',
            tag: 'O(1) Bitwise &bull; 2 Bẫy',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy hình dung trước mặt bạn là một <strong>bảng gồm 20 công tắc đèn</strong> đánh số từ $0$ đến $19$ (từ phải sang trái). Thay vì mua 20 cuốn sổ ghi <code>true/false</code>, bạn chỉ dùng <strong>một số nguyên <code>mask</code></strong> ở dạng nhị phân:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Số <code>1 &lt;&lt; i</code> bằng $2^i$ (chỉ duy nhất công tắc <code>i</code> mang bit <code>1</code>).</li>
                  <li><strong>Kiểm tra công tắc <code>i</code> đang Bật hay Tắt:</strong> <code>(mask &gt;&gt; i) &amp; 1</code> (kéo bit <code>i</code> về ngoài cùng bên phải rồi lọc đúng 1 bit cuối).</li>
                  <li><strong>Bật công tắc <code>i</code>:</strong> <code>mask | (1 &lt;&lt; i)</code> &bull; <strong>Tắt công tắc <code>i</code>:</strong> <code>mask &amp; ~(1 &lt;&lt; i)</code> &bull; <strong>Đảo (Bật &harr; Tắt):</strong> <code>mask ^ (1 &lt;&lt; i)</code>.</li>
                  <li><strong>2 BẪY C++ CHẾT NGƯỜI PHẢI NHỚ SUỐT ĐỜI:</strong>
                    <ol style="margin: 4px 0 0 20px;">
                      <li><strong>Bẫy 1 &mdash; Thứ tự ưu tiên toán tử (<code>==</code> mạnh hơn <code>&amp;</code>) và bẫy <code>== 1</code>:</strong>
                        <br>Viết <code>if (mask &amp; (1 &lt;&lt; i) == 0)</code> bị C++ hiểu thành <code>mask &amp; ((1 &lt;&lt; i) == 0)</code> &rarr; <strong>luôn bằng 0</strong>! Còn viết <code>if ((mask &amp; (1 &lt;&lt; i)) == 1)</code> lại <strong>SAI cho mọi $i \\ge 1$</strong> vì kết quả của phép <code>&amp;</code> là $2^i$ (ví dụ <code>4</code>) chứ không phải <code>1</code>! <strong>Luôn viết <code>(mask &gt;&gt; i) &amp; 1</code> hoặc <code>(mask &amp; (1 &lt;&lt; i)) != 0</code>!</strong></li>
                      <li><strong>Bẫy 2 &mdash; Tràn bit <code>1 &lt;&lt; k</code> khi $k \\ge 31$:</strong> Hằng số <code>1</code> mặc định là kiểu <code>int</code> 32-bit có dấu! Khi $k = 31$, <code>1 &lt;&lt; 31</code> tràn thành số âm <code>-2147483648</code>; khi $k \\ge 32$, kết quả là hành vi bất định (UB)! <strong>Luôn viết <code>1LL &lt;&lt; k</code> cho kiểu 64-bit!</strong></li>
                    </ol>
                  </li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Thao Tác Bit Chuẩn &amp; Dùng 1LL &lt;&lt; k Trong C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int mask = 5;            // 0101: công tắc 0 và 2 đang BẬT
    mask |= (1 &lt;&lt; 1);        // Bật bit 1  -&gt; 0111 (7)
    mask &amp;= ~(1 &lt;&lt; 0);       // Tắt bit 0  -&gt; 0110 (6)
    mask ^= (1 &lt;&lt; 2);        // Đảo bit 2  -&gt; 0010 (2)

    // Kiểm tra an toàn tuyệt đối bằng (mask &gt;&gt; i) &amp; 1 hoặc ((mask &amp; (1 &lt;&lt; i)) != 0)
    for (int i = 2; i &gt;= 0; i--) {
        cout &lt;&lt; ((mask &gt;&gt; i) &amp; 1);
    }
    cout &lt;&lt; ", popcount = " &lt;&lt; __builtin_popcount(mask) &lt;&lt; '\\n';

    // Bắt buộc dùng 1LL &lt;&lt; k khi k &gt;= 31 để tránh tràn kiểu int 32-bit!
    int k = 40;
    long long bigMask = (1LL &lt;&lt; k) | (1LL &lt;&lt; 31);
    cout &lt;&lt; "Bit 40 = " &lt;&lt; ((bigMask &gt;&gt; 40) &amp; 1LL) &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Toán tử Bit (<code>Bitwise Operators</code>):</strong> Gồm AND (<code>&amp;</code>), OR (<code>|</code>), XOR (<code>^</code>), NOT (<code>~</code>), dịch trái (<code>&lt;&lt;</code> = nhân $2^k$) và dịch phải (<code>&gt;&gt;</code> = chia $2^k$).</li>
                  <li><strong>Ưu tiên toán tử (<code>Operator Precedence</code>):</strong> Trong C++, phép so sánh <code>==</code> và <code>!=</code> bám chặt hơn <code>&amp;</code>; cần đóng ngoặc rõ <code>(mask &amp; (1 &lt;&lt; i)) != 0</code> hoặc dùng <code>(mask &gt;&gt; i) &amp; 1</code>.</li>
                  <li><strong>Dịch bit 64-bit (<code>1LL &lt;&lt; k</code>):</strong> Ép hằng số <code>1</code> sang <code>long long</code> trước khi dịch để hỗ trợ an toàn các bit vị trí $0..62$.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Bitmask Tập Con $2^N$: Vòng Lặp Phẳng O(2^N &middot; N) Thay Thế Đệ Quy',
            tag: 'Tập con 2^N',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Khi có $N = 3$ quả táo $\{A, B, C\}$, có bao nhiêu cách chọn một tập con bất kỳ? Hãy đếm các số từ $0$ đến $2^3 - 1 = 7$ ở dạng nhị phân $3$ bit:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><code>0 = 000</code> &rarr; <code>{}</code> &nbsp;|&nbsp; <code>1 = 001</code> &rarr; <code>{A}</code> &nbsp;|&nbsp; <code>2 = 010</code> &rarr; <code>{B}</code> &nbsp;|&nbsp; <code>3 = 011</code> &rarr; <code>{A, B}</code></li>
                  <li><code>4 = 100</code> &rarr; <code>{C}</code> &nbsp;|&nbsp; <code>5 = 101</code> &rarr; <code>{A, C}</code> &nbsp;|&nbsp; <code>6 = 110</code> &rarr; <code>{B, C}</code> &nbsp;|&nbsp; <code>7 = 111</code> &rarr; <code>{A, B, C}</code></li>
                  <li><strong>Phép màu vòng lặp phẳng:</strong> Chỉ cần đúng 1 vòng <code>for (int mask = 0; mask &lt; (1 &lt;&lt; n); mask++)</code>, không cần viết thêm hàm đệ quy nào, bạn tự động đi qua <strong>đủ và không trùng bất kỳ tập con nào</strong> trong cả $2^N$ khả năng!</li>
                  <li><strong>Ngưỡng hiệu năng thực chiến:</strong> Với mỗi <code>mask</code> ta duyệt thêm <code>for (int i = 0; i &lt; n; i++)</code> nên tổng chi phí là $O(2^N \\cdot N)$. Tại $N = 20$: $2^{20} \\cdot 20 \\approx 2 \\cdot 10^7$ phép tính &rarr; chạy AC dưới 0.2s! (Đếm nhanh số phần tử trong tập con bằng <code>__builtin_popcount(mask)</code>).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Giải Bài Toán Chia Đôi Nhóm Táo Cân Bằng Nhất Bằng Bitmask 2^N</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;long long&gt; p = {3, 2, 7, 4, 1};
    int n = (int)p.size();
    long long total = 0;
    for (long long x : p) total += x;

    long long ans = total;
    for (int mask = 0; mask &lt; (1 &lt;&lt; n); mask++) {
        long long g1 = 0;
        for (int i = 0; i &lt; n; i++) {
            if ((mask &gt;&gt; i) &amp; 1) {
                g1 += p[i]; // Quả táo i nằm ở nhóm 1
            }
        }
        long long g2 = total - g1;
        ans = min(ans, abs(g1 - g2));
    }

    cout &lt;&lt; "Chenh lech nho nhat = " &lt;&lt; ans &lt;&lt; '\\n'; // 1
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bitmask Tập Con (<code>Bitmask Subset Enumeration</code>):</strong> Ánh xạ song ánh 1-1 giữa tập con của $N$ phần tử với các số nguyên trong đoạn $[0, 2^N - 1]$ bằng một vòng lặp đơn giản.</li>
                  <li><strong>Hàm đếm bit bật (<code>__builtin_popcount</code>):</strong> Hàm tích hợp của trình biên dịch GCC trả về số bit <code>1</code> của biến <code>int</code> (dùng <code>__builtin_popcountll</code> cho <code>long long</code>).</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_bit_check',
            title: 'Phòng Thí Nghiệm 3A: Kiểm Tra Bit Bằng (mask &gt;&gt; i) &amp; 1 vs Bẫy (mask &amp; (1 &lt;&lt; i)) == 1',
            desc: 'Với mask = 5 (nhị phân 101: bit 0 và bit 2 đang bật, bit 1 đang tắt), thử đổi cách kiểm tra bit i từ (mask &gt;&gt; i) &amp; 1 sang viết nhầm (mask &amp; (1 &lt;&lt; i)) == 1 để thấy máy tính bỏ sót bit 2 như thế nào!',
            toggles: [
              {
                key: 'bitExpr',
                label: 'Biểu thức kiểm tra bit thứ i có bật không',
                options: [
                  { value: 'shift', text: '((mask &gt;&gt; i) &amp; 1) == 1 — Đọc đúng bit 0 hoặc 1 (AC)', kind: 'ok' },
                  { value: 'eq_one', text: '(mask &amp; (1 &lt;&lt; i)) == 1 — So với 1 khi giá trị là 2^i (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.bitExpr === 'shift';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int mask = 5; // 101 nhi phan: bit 0 va bit 2 dang bat
    for (int i = 0; i < 3; i++) {
${isOk ? '        bool on = ((mask >> i) & 1) == 1;' : '        bool on = (mask & (1 << i)) == 1;'}
        cout << (on ? 1 : 0) << (i == 2 ? '\\n' : ' ');
    }
    return 0;
}`;
              return {
                code,
                changedLines: [9],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Dịch phải (mask &gt;&gt; i) đưa bit i về vị trí 0 rồi &amp; 1 nên luôn trả đúng 1 0 1!'
                  : 'SÓT BIT LỚN HƠN 0 (WA): Ở i = 2, phép 5 &amp; (1 &lt;&lt; 2) cho ra 4 chứ không phải 1, làm biểu thức == 1 bị sai và in nhầm 1 0 0!',
                predictions: [
                  { text: 'Cả bit 0 và bit 2 đều được nhận diện bật nên màn hình in đúng 1 0 1' },
                  { text: 'Bit 2 bị tính thành 4 != 1 nên hàm tưởng bit 2 đang tắt và in sai 1 0 0' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1 0 1'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1 0 0',
                explain: isOk
                  ? 'Biểu thức (mask &gt;&gt; i) &amp; 1 luôn trả về đúng 1 nếu bit i bật và 0 nếu bit i tắt, bất kể i bằng 0, 2 hay 19!'
                  : 'Phép mask &amp; (1 &lt;&lt; i) trả về 2^i (4 khi i = 2), không phải 1! Nếu dùng mask &amp; (1 &lt;&lt; i), bạn bắt buộc phải viết ((mask &amp; (1 &lt;&lt; i)) != 0) &mdash; hoặc gọn hơn hẳn là (mask &gt;&gt; i) &amp; 1.'
              };
            }
          },
          {
            id: 'sb_1ll_shift',
            title: 'Phòng Thí Nghiệm 3B: Dịch Bit 1LL &lt;&lt; k vs 1 &lt;&lt; k Khi k = 31',
            desc: 'Cần tính giá trị 2^31 = 2,147,483,648 vào biến long long. Thử bỏ hậu tố LL để xem phép dịch bit trên hằng số int 32-bit bị tràn thành số âm thế nào!',
            toggles: [
              {
                key: 'shiftLit',
                label: 'Kiểu của hằng số 1 trước dấu &lt;&lt;',
                options: [
                  { value: 'll', text: 'return 1LL &lt;&lt; k; — Dịch trên 64-bit (AC)', kind: 'ok' },
                  { value: 'int32', text: 'return 1 &lt;&lt; k; — Dịch trên int 32-bit bị tràn dấu (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.shiftLit === 'll';
              const code = `#include <bits/stdc++.h>
using namespace std;

long long maskOfBit(int k) {
${isOk ? '    return 1LL << k;' : '    return 1 << k;'}
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int k = 31;
    cout << maskOfBit(k) << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [5],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Hậu tố 1LL ép phép dịch chạy trên 64-bit và trả đúng 2147483648!'
                  : 'TRÀN SỐ BIT DẤU (WA): Dù hàm trả về long long, vế phải 1 &lt;&lt; 31 vẫn tính bằng int 32-bit trước rồi mới ép kiểu nên tràn thành -2147483648!',
                predictions: [
                  { text: 'Phép dịch thực hiện trên 64-bit và in đúng giá trị dương 2147483648' },
                  { text: 'Hằng số 1 kiểu int 32-bit tràn ngay ở bit dấu thứ 31 và in ra số âm -2147483648' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n2147483648'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n-2147483648',
                explain: isOk
                  ? 'Viết 1LL giúp vế trái của toán tử &lt;&lt; có kiểu long long 64-bit ngay từ đầu, biểu diễn an toàn mọi lũy thừa từ 2^0 tới 2^62.'
                  : 'C++ tính xong toàn bộ phép 1 &lt;&lt; k trong kiểu int 32-bit có dấu (tràn thành -2^31) rồi mới gán vào kiểu trả về long long. Khi k &gt;= 32 còn gây ra lỗi hành vi bất định (UB)!'
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
    int mask = 6;        // 0110
    mask |= (1 << 0);    // Bat bit 0
    mask ^= (1 << 2);    // Dao bit 2
    mask &= ~(1 << 1);   // Tat bit 1
    cout << mask << ' ' << ((mask >> 0) & 1) << '\\n';
    return 0;
}`,
            q: 'Bắt đầu với <code>mask = 6</code> (nhị phân <code>0110</code>) rồi chạy lần lượt ba thao tác bit như trên. Hai số in ra màn hình là gì?',
            options: [
              'In ra 3 1 vì sau ba bước trên các bit 0 và 1 cùng bật còn bit 2 bị tắt hoàn toàn',
              'In ra 5 1 vì thao tác XOR ở bước hai đảo bit 2 từ 0 lên 1 làm giá trị tăng thêm 4',
              'In ra 0 0 vì lệnh tắt bit cuối cùng xóa sạch toàn bộ các bit đang bật trong mask',
              'In ra 1 1 vì bit 2 và bit 1 lần lượt bị tắt còn bit 0 giữ nguyên trạng thái bật 1'
            ],
            correct: 3,
            explain: 'Ban đầu mask = 6 (0110). Bước 1: bật bit 0 &rarr; 0111 (7). Bước 2: đảo bit 2 (đang là 1 nên chuyển thành 0) &rarr; 0011 (3). Bước 3: tắt bit 1 &rarr; 0001 (1). Cuối cùng mask = 1 và bit 0 của mask bằng 1, nên in ra: 1 1.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {2, 5, 8};
    int n = 3, cnt = 0, maxSum = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        int s = 0;
        for (int i = 0; i < n; i++) {
            if ((mask >> i) & 1) s += a[i];
        }
        if (s >= 10) {
            cnt++;
            maxSum = max(maxSum, s);
        }
    }
    cout << cnt << ' ' << maxSum << '\\n';
    return 0;
}`,
            q: 'Đoạn code Bitmask $2^N$ trên duyệt tất cả $8$ tập con của <code>a = {2, 5, 8}</code>. Hai số <code>cnt</code> và <code>maxSum</code> in ra là gì?',
            options: [
              'In ra 2 15 vì chỉ có hai tập con {5, 8} và {2, 5, 8} đạt tổng từ 10 trở lên',
              'In ra 3 15 vì có ba tập con đạt tổng &gt;= 10 là {2, 8}, {5, 8} và {2, 5, 8}',
              'In ra 4 15 vì tập con {2, 5} có tổng bằng 7 cũng được đếm khi cộng dồn vào maxSum',
              'In ra 3 13 vì vòng lặp for chạy điều kiện mask &lt; (1 &lt;&lt; 3) bỏ sót mask = 7 toàn số 1'
            ],
            correct: 1,
            explain: 'Các tập con có tổng &gt;= 10 gồm: mask = 5 (101_2: 2 + 8 = 10), mask = 6 (110_2: 5 + 8 = 13) và mask = 7 (111_2: 2 + 5 + 8 = 15). Tổng cộng có cnt = 3 tập con và maxSum = 15. Chú ý (1 &lt;&lt; 3) = 8 nên mask &lt; 8 vẫn xét trọn cả mask = 7.'
          },
          {
            type: 'single',
            q: 'Với <code>mask = 5</code> (<code>101</code> nhị phân), vì sao câu lệnh <code>if (mask &amp; (1 &lt;&lt; 2) == 0)</code> bị coi là bẫy sai logic nghiêm trọng trong C++?',
            options: [
              'Vì phép dịch trái (1 &lt;&lt; 2) làm tràn kiểu int 32-bit khiến kết quả đổi thành số âm',
              'Vì toán tử &amp; chỉ được phép áp dụng cho biến kiểu bool chứ không dùng với int',
              'Vì phép so sánh == ưu tiên cao hơn &amp;, nên code bị hiểu thành mask &amp; ((1 &lt;&lt; 2) == 0)',
              'Vì vòng lặp dịch bit luôn đọc các bit từ trái qua phải chứ không đếm từ vị trí 0'
            ],
            correct: 2,
            explain: 'Trong C++, toán tử == có độ ưu tiên cao hơn &amp;. Biểu thức mask &amp; (1 &lt;&lt; 2) == 0 được biên dịch thành mask &amp; (4 == 0), tức mask &amp; 0 = 0 (sai hoàn toàn!). Phải bọc ngoặc ((mask &amp; (1 &lt;&lt; 2)) == 0) hoặc dùng (mask &gt;&gt; 2) &amp; 1.'
          },
          {
            type: 'multiple',
            q: 'Những cách viết hoặc nhận định nào sau đây là <strong>AN TOÀN &amp; ĐÚNG</strong> khi lập trình Bitmask trong C++14?',
            options: [
              'Dùng (mask &gt;&gt; i) &amp; 1 hoặc ((mask &amp; (1 &lt;&lt; i)) != 0) để kiểm tra bit thứ i có đang bật hay không',
              'Khi cần tạo bit thứ k với k từ 31 đến 62, phải viết 1LL &lt;&lt; k thay vì 1 &lt;&lt; k để tránh tràn số int',
              'Vòng lặp duyệt 2^N tập con với độ phức tạp O(2^N * N) chạy an toàn trong 1 giây khi N &lt;= 20',
              'Nếu k = 20 thì viết (mask &amp; (1 &lt;&lt; 20)) == 1 luôn cho giá trị true khi bit 20 của mask đang bật'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều đúng. D sai vì mask &amp; (1 &lt;&lt; 20) khi bit 20 bật trả về 2^20 = 1,048,576 chứ không phải 1, nên so sánh == 1 sẽ trả về false!'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l204_forgot_unmark_used',
        title: 'Quên Mở Khóa used[v] = false; Sau Khi Quay Lui Sinh Hoán Vị (WA)',
        description: 'Chương trình đếm tổng số hoán vị của {1..n}. Với n = 3, đáp án đúng là 3! = 6, nhưng do copy-paste dòng đánh dấu sau khi quay lui nên code khóa cứng mọi phần tử và chỉ in ra 1!',
        failingInput: '3',
        failingOutput: '1',
        expectedOutput: '6',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

void dfs(int n, vector<int>& cur, vector<bool>& used, int& cnt) {
    if ((int)cur.size() == n) {
        cnt++;
        return;
    }
    for (int v = 1; v <= n; v++) {
        if (used[v]) continue;
        used[v] = true;
        cur.push_back(v);
        dfs(n, cur, used, cnt);
        cur.pop_back();
        used[v] = true;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    vector<int> cur;
    vector<bool> used(n + 1, false);
    int cnt = 0;
    dfs(n, cur, used, cnt);
    cout << cnt << '\\n';
    return 0;
}`,
        bugLine: 15,
        patches: [
          { text: 'Đổi dòng 15 thành cur.pop_back(); thêm một lần nữa để xóa sạch cả vector' },
          { text: 'Đổi dòng 15 thành used[v] = false;' },
          { text: 'Đổi dòng 10 thành if (!used[v]) continue;' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 15, sau khi hàm đệ quy trả về và đã rút v ra khỏi cur bằng cur.pop_back(), tác giả lại gán nhầm used[v] = true; thay vì used[v] = false;! Do đó mọi số sau nhánh 1 2 3 đầu tiên đều bị coi là đã dùng mãi mãi.'
      },
      {
        id: 'dbg_l204_nqueens_abs_diag',
        title: 'Dùng abs(r - c) Thay Cho r - c + n Làm Mất Nghiệm N-Queens (WA)',
        description: 'Chương trình đếm số cách xếp n quân hậu lên bàn cờ n x n. Với n = 4, kết quả đúng là 2, nhưng do dùng abs(r - c) để né chỉ số âm nên hai đường chéo đối xứng đè lên nhau và code in ra 0!',
        failingInput: '4',
        failingOutput: '0',
        expectedOutput: '2',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int n, ways = 0;
vector<bool> col, d1, d2;

void dfs(int r) {
    if (r == n) {
        ways++;
        return;
    }
    for (int c = 0; c < n; c++) {
        int idx1 = abs(r - c);
        int idx2 = r + c;
        if (col[c] || d1[idx1] || d2[idx2]) continue;
        col[c] = d1[idx1] = d2[idx2] = true;
        dfs(r + 1);
        col[c] = d1[idx1] = d2[idx2] = false;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cin >> n;
    col.assign(n, false);
    d1.assign(2 * n + 1, false);
    d2.assign(2 * n + 1, false);
    dfs(0);
    cout << ways << '\\n';
    return 0;
}`,
        bugLine: 13,
        patches: [
          { text: 'Đổi dòng 13 thành int idx1 = r - c + n;' },
          { text: 'Đổi dòng 13 thành int idx1 = r + c + n;' },
          { text: 'Đổi dòng 13 thành int idx1 = abs(r - c) + 1;' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 13, viết abs(r - c) làm hai đường chéo chính đối xứng như r - c = -1 và r - c = +1 cùng ánh xạ vào chỉ số 1, chặn nhầm các ô hợp lệ. Sửa thành r - c + n dịch song ánh toàn bộ giá trị từ [-(n-1)..n-1] về đoạn dương [1..2n-1].'
      },
      {
        id: 'dbg_l204_bitmask_eq_one',
        title: 'So Sánh (mask &amp; (1 &lt;&lt; i)) == 1 Bỏ Sót Mọi Bit i &gt;= 1 Trong Bitmask (WA)',
        description: 'Chương trình đếm số tập con khác rỗng của n số có tổng đúng bằng S. Với mảng {1, 2, 4} và S = 5 (tập {1, 4} ứng với mask = 5), đáp án đúng là 1, nhưng code lại bỏ sót phần tử 4 ở vị trí i = 2 và in ra 0!',
        failingInput: '3 5\n1 2 4',
        failingOutput: '0',
        expectedOutput: '1',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    long long S;
    cin >> n >> S;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int ans = 0;
    for (int mask = 1; mask < (1 << n); mask++) {
        long long sum = 0;
        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) == 1) {
                sum += a[i];
            }
        }
        if (sum == S) ans++;
    }
    cout << ans << '\\n';
    return 0;
}`,
        bugLine: 16,
        patches: [
          { text: 'Đổi dòng 16 thành if ((mask | (1 << i)) == 1) {' },
          { text: 'Đổi dòng 16 thành if ((mask & (1 << i)) == i) {' },
          { text: 'Đổi dòng 16 thành if ((mask >> i) & 1) {' }
        ],
        correctPatch: 2,
        explain: 'Ở dòng 16, khi kiểm tra bit i = 2 của mask = 5 (101_2), phép mask &amp; (1 &lt;&lt; 2) cho kết quả bằng 4 (khác 1!) nên không cộng a[2] = 4. Đổi thành (mask &gt;&gt; i) &amp; 1 (hoặc (mask &amp; (1 &lt;&lt; i)) != 0) sẽ cộng chính xác mọi phần tử thuộc tập con.'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — L2-04)
    // ============================================================================
    practiceProblems: [
      {
        id: 'CF-579A',
        title: '579A - Raising Bacteria',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/579/A',
        hint: 'Giới hạn $1 \\le x \\le 10^9$, TL 1.0s, ML 256 MB. Mỗi đêm vi khuẩn nhân đôi (tương ứng dịch trái bit <code>&lt;&lt; 1</code>), mỗi sáng thả thêm 1 con cộng vào bit cuối. Số vi khuẩn tối thiểu cần thả chính là <strong>số bit <code>1</code></strong> trong biểu diễn nhị phân của $x$ — đếm bằng vòng lặp <code>(x &gt;&gt; i) &amp; 1</code> hoặc <code>__builtin_popcount(x)</code>.'
      },
      {
        id: 'CSES-1622',
        title: 'Creating Strings',
        judge: 'CSES',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1622',
        hint: 'Giới hạn $1 \\le n \\le 8$ (chữ cái thường <code>a</code>&ndash;<code>z</code>), TL 1.00s, ML 512 MB. Với $8! = 40\\,320$, bạn có thể đếm tần suất $26$ ký tự <code>cnt[0..25]</code> rồi dùng Quay lui duyệt từ <code>\'a\'</code> đến <code>\'z\'</code> (nếu <code>cnt[c] &gt; 0</code> thì giảm <code>cnt[c]</code>, ghép ký tự, đệ quy rồi tăng lại <code>cnt[c]</code>): vừa sinh đúng thứ tự từ điển, vừa tự khử trùng hoán vị giống nhau!'
      },
      {
        id: 'CSES-1623',
        title: 'Apple Division',
        judge: 'CSES',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1623',
        hint: 'Giới hạn $1 \\le n \\le 20$, $1 \\le p_i \\le 10^9$, TL 1.00s, ML 512 MB. Bài tập kinh điển cho cả Cây đệ quy 2 nhánh lẫn Bitmask $2^N$: chạy <code>mask</code> từ $0$ đến <code>(1 &lt;&lt; n) - 1</code>, tính tổng nhóm 1 gồm các phần tử có <code>(mask &gt;&gt; i) &amp; 1</code>, rồi cập nhật <code>ans = min(ans, abs(total - 2 * g1))</code>. Lưu ý bắt buộc dùng <code>long long</code> vì tổng tới $2 \\cdot 10^{10}$!'
      },
      {
        id: 'CF-1097B',
        title: '1097B - Petr and a Combination Lock',
        judge: 'Codeforces',
        tier: 2,
        link: 'https://codeforces.com/problemset/problem/1097/B',
        hint: 'Giới hạn $1 \\le n \\le 15$, $1 \\le a_i \\le 180$, TL 1.0s, ML 256 MB. Mỗi bước xoay thứ $i$ chỉ có 2 lựa chọn: cộng $+a_i$ (bit <code>1</code>) hoặc trừ $-a_i$ (bit <code>0</code>). Dùng Bitmask duyệt $2^n \\le 32\\,768$ trạng thái và kiểm tra tổng góc chia hết cho $360$ (<code>((sum % 360) + 360) % 360 == 0</code>, nhớ xử lý chia lấy dư số âm!).'
      },
      {
        id: 'CF-550B',
        title: '550B - Preparing Olympiad',
        judge: 'Codeforces',
        tier: 2,
        link: 'https://codeforces.com/problemset/problem/550/B',
        hint: 'Giới hạn $1 \\le n \\le 15$, $1 \\le l \\le r \\le 10^9$, $1 \\le x, c_i \\le 10^6$, TL 2.0s, ML 256 MB. Duyệt toàn bộ $2^n$ tập con bằng Bitmask (hoặc Quay lui kèm nhánh cắt <code>sum &gt; r</code>). Với mỗi tập con, cập nhật <code>cnt</code>, <code>sum</code> (<code>long long</code>), <code>mn</code>, <code>mx</code> và đếm nếu thỏa đồng thời <code>cnt &gt;= 2</code>, <code>l &lt;= sum &amp;&amp; sum &lt;= r</code> và <code>mx - mn &gt;= x</code>.'
      },
      {
        id: 'CSES-1624',
        title: 'Chessboard and Queens',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1624',
        hint: 'Bàn cờ $8 \\times 8$ gồm <code>.</code> (ô trống) và <code>*</code> (ô cấm không đặt được hậu), TL 1.00s, ML 512 MB. Áp dụng thẳng khuôn mẫu $N$-Queens theo từng hàng <code>r = 0..7</code> với 3 mảng <code>col[c]</code>, <code>d1[r - c + 8]</code>, <code>d2[r + c]</code>, cộng thêm điều kiện <code>board[r][c] == \'.\'</code> (lưu ý quân hậu vẫn ăn xuyên qua ô <code>*</code> bình thường!).'
      },
      {
        id: 'ABC197-C',
        title: 'C - ORXOR',
        judge: 'AtCoder',
        tier: 3,
        link: 'https://atcoder.jp/contests/abc197/tasks/abc197_c',
        hint: 'Giới hạn $1 \\le N \\le 20$, $0 \\le A_i &lt; 2^{30}$, TL 2.0s, ML 1024 MB. Giữa $N$ phần tử có $N - 1$ khe hở (tối đa $19$ khe): dùng Bitmask từ $0$ đến <code>(1 &lt;&lt; (N - 1)) - 1</code> biểu diễn việc có đặt vách ngăn chia đoạn ở khe thứ $i$ hay không. Trong mỗi đoạn liên tiếp tích lũy bitwise OR (<code>curOr |= a[i]</code>), gặp vách ngăn thì XOR vào kết quả đoạn (<code>totalXor ^= curOr</code>) rồi reset <code>curOr = 0</code>.'
      },
      {
        id: 'CSES-1625',
        title: 'Grid Paths',
        judge: 'CSES',
        tier: 3,
        link: 'https://cses.fi/problemset/task/1625',
        hint: 'Lưới $7 \\times 7$, chuỗi $48$ ký tự (<code>U/D/L/R/?</code>) đi qua mọi ô đúng 1 lần từ <code>(0, 0)</code> tới <code>(6, 0)</code>, TL 1.00s, ML 512 MB. Thử thách đỉnh cao của <strong>Cắt nhánh (Pruning)</strong>: nếu giữ nguyên cây $4^{48}$ sẽ TLE tức thì, nhưng chỉ cần thêm 2 quy tắc cắt: (1) chạm đích <code>(6, 0)</code> khi chưa đủ 48 bước thì cắt ngay; (2) nếu phía trước và sau đều bị tường/ô đã thăm chặn nhưng hai bên trái-phải còn trống (lưới bị chẻ làm 2 vùng cô lập) thì cắt nhánh ngay lập tức!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
