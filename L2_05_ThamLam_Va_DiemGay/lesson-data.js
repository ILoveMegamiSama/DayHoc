/**
 * DỮ LIỆU BÀI GIẢNG L2-05: THUẬT TOÁN THAM LAM & ĐIỂM GÃY CỦA THAM LAM
 * Tầng 2 — Pha 2 STL Lớp 9 (Nối tiếp từ MOD-00, L1-05, L1-06, L2-02, L2-04)
 * Mở khóa:
 * - Tư duy Tham lam (Greedy) & Lập lịch chọn đoạn (Activity Selection: sắp theo kết thúc r tăng dần)
 *   cùng mẫu Ghép cặp hai đầu (Ferris Wheel) trên std::sort.
 * - Tham lam động với Min-Heap (priority_queue<long long, vector<long long>, greater<long long>>)
 *   cho bài toán Nối dây / Stick Divisions, và chứng minh đúng đắn bằng Đối chứng hoán đổi (Exchange Argument).
 * - Điểm gãy của Tham lam trên Đổi tiền ({1, 3, 4}, S = 6) và Balo 0-1 theo tỉ giá v/w,
 *   dùng code duyệt toàn bộ O(2^N) (L2-04) + Máy chấm (MOD-00) để tự phát hiện phản ví dụ,
 *   mở đường sang Quy hoạch động (L2-06).
 * Ranh giới tiền đề: KHÔNG dùng kỹ thuật Quy hoạch động (ghi nhớ hoặc lập bảng trạng thái — chưa học L2-06..L2-09).
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'tham_lam',
    number: 'Bài Học L2-05',
    shortTitle: 'Tham Lam & Điểm Gãy',
    title: 'Bài L2-05: Thuật Toán Tham Lam & Điểm Gãy Của Tham Lam',
    lead: 'Khi $N \\le 2 \\cdot 10^5$ làm Quay lui $O(2^N)$ của <code>L2-04</code> bó tay vì TLE, hãy học cách hạ độ phức tạp xuống $O(N \\log N)$ bằng <strong>Thuật toán Tham lam</strong>: chọn tiêu chí <code>std::sort</code> chuẩn (kết thúc sớm, ghép cặp hai đầu), dùng <strong>Min-Heap</strong> cho dữ liệu biến đổi động, tự chứng minh đúng đắn bằng <strong>Exchange Argument</strong>, và dùng <code>L2-04</code> + Máy chấm <code>MOD-00</code> bắt bài những lúc Tham lam bị gãy để mở cánh cửa sang Quy hoạch động (<code>L2-06</code>).',
    modules: [
      // ============================================================================
      // MODULE 1: TƯ DUY THAM LAM & LẬP LỊCH ĐOẠN / GHÉP CẶP VỚI STD::SORT
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Tham Lam & Lập Lịch Đoạn',
        title: 'Vấn Đề Nhỏ 1: Tư Duy Tham Lam &amp; Lập Lịch Đoạn (Activity Selection / Ghép Cặp Với <code>std::sort</code>)',
        lead: 'Tại sao cùng là xếp danh sách bằng <code>std::sort</code> rồi chọn một lần không quay đầu, chọn phim <em>kết thúc sớm nhất</em> lại đúng $100\\%$ trong khi chọn <em>bắt đầu sớm</em> hay <em>thời lượng ngắn nhất</em> đều sập ngay trên phản ví dụ 4 đoạn?',
        subproblem: {
          title: 'Làm sao chọn tối đa số bộ phim không chồng lấn từ $N \\le 2 \\cdot 10^5$ khoảng thời gian $[l_i, r_i]$ (hoặc ghép cặp giới hạn trọng lượng) chỉ trong $O(N \\log N)$ mà không phải thử $2^N$ tổ hợp?',
          desc: 'Với $N = 2 \\cdot 10^5$, thuật toán duyệt mọi tập con của <code>L2-04</code> chắc chắn TLE. Ta cần tìm ra đúng <strong>một quy tắc ưu tiên</strong> sau khi sắp xếp bằng <code>std::sort</code> (<code>L1-05</code>) sao cho mỗi bước chỉ cần lấy phần tử tốt nhất trước mắt và tiến thẳng một mạch.'
        },
        cards: [
          {
            heading: 'Lập Lịch Chọn Đoạn (Activity Selection): Sắp Theo Kết Thúc Sớm r Tăng Dần',
            tag: 'O(N log N) &bull; Sort r',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Trong một ngày hội chiếu phim (<code>CSES-1629</code>), có $N$ bộ phim chiếu từ phút $l_i$ đến phút $r_i$. Bạn chỉ có thể xem 1 phim mỗi lúc (phim sau hợp lệ nếu $l_{\\text{mới}} \\ge r_{\\text{cũ}}$). Ta thử kiểm tra 3 chiến lược Tham lam trên đúng 4 bộ phim: <code>[1, 10]</code>, <code>[2, 6]</code>, <code>[5, 8]</code>, <code>[7, 11]</code>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Chiến lược A &mdash; Chọn phim bắt đầu sớm nhất ($l$ nhỏ nhất):</strong> Bốc ngay <code>[1, 10]</code>. Phim này kéo dài tới phút $10$, đè bẹp cả 3 phim còn lại &rarr; chỉ xem được <strong>1 phim (SAI!)</strong>.</li>
                  <li><strong>Chiến lược B &mdash; Chọn phim ngắn nhất ($r - l$ nhỏ nhất):</strong> Bốc ngay <code>[5, 8]</code> (chỉ dài $3$ phút!). Thế nhưng nó lại nằm đúng khe giao nhau, chặn mất cả <code>[2, 6]</code> lẫn <code>[7, 11]</code> &rarr; cũng chỉ xem được <strong>1 phim (SAI!)</strong>.</li>
                  <li><strong>Chiến lược C &mdash; Chọn phim kết thúc sớm nhất ($r$ nhỏ nhất):</strong> Sau khi xem xong 1 phim, thứ duy nhất quyết định bạn còn bao nhiêu thời gian rảnh phía sau là mốc <code>lastEnd</code>! Phim kết thúc càng sớm sẽ <strong>giải phóng thời gian rảnh sớm nhất</strong>. Thứ tự theo $r$: <code>[2, 6]</code>, <code>[5, 8]</code>, <code>[1, 10]</code>, <code>[7, 11]</code> &rarr; chọn <code>[2, 6]</code> (rảnh lúc $6$), bỏ qua <code>[5, 8]</code> và <code>[1, 10]</code> vì bắt đầu trước $6$, chọn tiếp <code>[7, 11]</code> &rarr; xem được <strong>2 phim (CHUẨN!)</strong>.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Cài Đặt Lập Lịch Đoạn Chuẩn Strict Weak Ordering (L1-05)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// Luôn dùng &lt; (KHÔNG dùng &lt;=) theo quy tắc Strict Weak Ordering (L1-05)
bool cmpByEnd(const pair&lt;long long, long long&gt;&amp; a,
              const pair&lt;long long, long long&gt;&amp; b) {
    if (a.second != b.second) return a.second &lt; b.second;
    return a.first &lt; b.first;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;pair&lt;long long, long long&gt;&gt; segs = {{1, 10}, {2, 6}, {5, 8}, {7, 11}};
    sort(segs.begin(), segs.end(), cmpByEnd);

    int cnt = 0;
    long long lastEnd = -4000000000000000000LL;
    for (int i = 0; i &lt; (int)segs.size(); i++) {
        // Phim mới bắt đầu &gt;= giờ kết thúc phim vừa xem là hợp lệ
        if (segs[i].first &gt;= lastEnd) {
            cnt++;
            lastEnd = segs[i].second;
        }
    }
    cout &lt;&lt; "So phim toi da: " &lt;&lt; cnt &lt;&lt; '\\n'; // 2
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Thuật toán Tham lam (<code>Greedy Algorithm</code>):</strong> Chiến lược ra quyết định theo từng bước: luôn chọn phương án tối ưu cục bộ ở thời điểm hiện tại và chốt luôn không quay lui.</li>
                  <li><strong>Lập lịch chọn đoạn (<code>Activity Selection</code>):</strong> Bài toán chọn tập con các đoạn $[l_i, r_i]$ đôi một không chồng lấn có kích thước lớn nhất bằng cách sắp xếp tăng dần theo đầu mút phải $r_i$.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Mẫu Tham Lam Ghép Cặp Hai Đầu &amp; Chọn Theo Ngưỡng (Ferris Wheel / Queue)',
            tag: 'Sắp xếp &amp; Ghép cặp',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Không phải bài Tham lam nào cũng chỉ quét một chiều từ trái sang phải! Xét bài toán vòng quay mặt trời (<code>Ferris Wheel</code> &mdash; <code>CSES-1090</code>): có $N$ bạn nhỏ với cân nặng $p_i$, mỗi cabin chở tối đa <strong>2 bạn</strong> và tổng cân nặng không vượt quá $X$:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bẫy ghép hai bạn nhẹ nhất đi chung:</strong> Với $X = 10$ và cân nặng <code>{2, 3, 7, 8}</code>, nếu bạn ham ghép <code>2 + 3 = 5</code> vào chung 1 cabin thì hai bạn <code>7</code> và <code>8</code> còn lại không ghép được với nhau ($7 + 8 = 15 &gt; 10$), phải đi riêng &rarr; tốn tới <strong>3 cabin (SAI!)</strong>.</li>
                  <li><strong>Chiến lược Tham lam hai đầu (<code>l</code> và <code>r</code>):</strong> Sau khi sắp tăng dần, bạn <strong>nặng nhất ở cuối dãy (<code>r</code>)</strong> kiểu gì cũng phải lên một cabin. Để tận dụng tối đa phần tải trọng dư của cabin đó, hãy thử rủ bạn <strong>nhẹ nhất còn lại ở đầu dãy (<code>l</code>)</strong> đi cùng! Nếu <code>p[l] + p[r] &lt;= X</code> thì ghép cả hai (<code>l++, r--</code>); ngược lại, ngay cả bạn nhẹ nhất còn không ghép nổi với <code>r</code> thì chẳng ai ghép được với <code>r</code>, nên <code>r</code> đành đi một mình (<code>r--</code>). Với <code>{2, 3, 7, 8}</code>: ghép <code>{2, 8}</code> và <code>{3, 7}</code> &rarr; chỉ cần <strong>2 cabin (CHUẨN!)</strong>!</li>
                  <li><strong>Mẹo đọc đề nhận diện nhanh mẫu <code>sort</code> + tham lam tuyến tính:</strong> Các bài chỉ cần chọn tối đa/tối thiểu theo một ngưỡng tổng cố định (như xếp hàng không thất vọng <code>CF-545D</code> hay chọn ít đồng xu nhất để thắng nửa còn lại <code>CF-160A</code>) đều xuất phát từ việc sắp xếp dãy tăng hoặc giảm dần rồi quét một lượt $O(N)$.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ghép Cặp Hai Đầu Tải Trọng &lt;= X (O(N log N))</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long X = 10;
    vector&lt;long long&gt; p = {8, 2, 7, 3};
    sort(p.begin(), p.end()); // {2, 3, 7, 8}

    int l = 0, r = (int)p.size() - 1;
    int boats = 0;
    while (l &lt;= r) {
        // Phải kiểm tra l &lt; r để tránh tự ghép 1 người với chính mình khi còn 1 người
        if (l &lt; r &amp;&amp; p[l] + p[r] &lt;= X) {
            l++;
        }
        r--;
        boats++;
    }
    cout &lt;&lt; "So cabin toi thieu: " &lt;&lt; boats &lt;&lt; '\\n'; // 2
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Ghép cặp Tham lam hai đầu (<code>Two-End Greedy Pairing</code>):</strong> Sắp xếp mảng tăng dần rồi đặt hai chỉ số <code>l = 0</code>, <code>r = n - 1</code> để luôn ghép phần tử khó nhất (lớn nhất <code>r</code>) với phần tử dễ chịu nhất (nhỏ nhất <code>l</code>).</li>
                  <li><strong>Điều kiện bảo vệ <code>l &lt; r</code>:</strong> Khi chỉ còn đúng 1 phần tử (<code>l == r</code>), nhánh ghép cặp không được chạy để tránh tính 1 người thành 2 lần.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_activity_sort',
            title: 'Phòng Thí Nghiệm 1A: Lập Lịch Đoạn — Sắp Theo Kết Thúc r vs Độ Dài (r - l)',
            desc: 'Với 4 bộ phim {[1, 10], [2, 6], [5, 8], [7, 11]}, thử đổi tiêu chí sắp xếp giữa kết thúc sớm r và thời lượng ngắn nhất r - l để kiểm chứng xem chọn phim ngắn nhất bị kẹt ra sao!',
            toggles: [
              {
                key: 'sortRule',
                label: 'Tiêu chí sắp xếp các đoạn [l, r]',
                options: [
                  { value: 'end', text: 'a.second &lt; b.second — Kết thúc sớm r tăng dần (AC)', kind: 'ok' },
                  { value: 'len', text: '(a.second - a.first) &lt; (b.second - b.first) — Đoạn ngắn nhất trước (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.sortRule === 'end';
              const code = `#include <bits/stdc++.h>
using namespace std;

bool cmp(const pair<long long, long long>& a, const pair<long long, long long>& b) {
${isOk ? '    if (a.second != b.second) return a.second < b.second;\n    return a.first < b.first;' : '    long long lenA = a.second - a.first, lenB = b.second - b.first;\n    if (lenA != lenB) return lenA < lenB;\n    return a.second < b.second;'}
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<pair<long long, long long>> segs = {{1, 10}, {2, 6}, {5, 8}, {7, 11}};
    sort(segs.begin(), segs.end(), cmp);
    int cnt = 0;
    long long lastEnd = 0;
    for (int i = 0; i < (int)segs.size(); i++) {
        if (segs[i].first >= lastEnd) {
            cnt++;
            lastEnd = segs[i].second;
            cout << '[' << segs[i].first << ',' << segs[i].second << "] ";
        }
    }
    cout << "=> cnt=" << cnt << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [5, 6] : [5, 6, 7],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Xếp theo kết thúc sớm r giúp mở khóa đoạn [2, 6] rồi nối tiếp được [7, 11], tổng cnt = 2!'
                  : 'MẮC BẪY CHỌN ĐOẠN NGẮN (WA): Phim [5, 8] có độ dài 3 ngắn nhất nhưng nằm chắn giữa cả [2, 6] và [7, 11], làm kết quả tụt xuống còn cnt = 1!',
                predictions: [
                  { text: 'Chương trình chọn được 2 phim [2,6] và [7,11] (cnt=2)' },
                  { text: 'Chương trình ưu tiên phim ngắn [5,8] trước và bị kẹt chỉ còn 1 phim (cnt=1)' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n[2,6] [7,11] => cnt=2'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n[5,8] => cnt=1',
                explain: isOk
                  ? 'Sắp theo r tăng dần luôn chọn đoạn giải phóng lịch sớm nhất. Bất kỳ đoạn nào kết thúc muộn hơn đều chỉ còn lại khoảng thời gian rảnh hẹp hơn, không bao giờ chọn được nhiều phim hơn.'
                  : 'Đoạn ngắn [5, 8] kết thúc ở phút 8 (muộn hơn [2, 6]) nhưng bắt đầu ở phút 5 (sớm hơn [7, 11]) nên nó giết chết cả hai lựa chọn hai bên!'
              };
            }
          },
          {
            id: 'sb_ferris_pairing',
            title: 'Phòng Thí Nghiệm 1B: Ghép Cabin — Nặng Nhất + Nhẹ Nhất vs Hai Bạn Kề Nhau',
            desc: 'Với X = 10 và danh sách cân nặng đã sắp {2, 3, 7, 8}, thử đổi từ ghép hai đầu (l và r) sang ghép tuần tự hai bạn nhẹ đứng cạnh nhau để xem số cabin tăng lên thế nào!',
            toggles: [
              {
                key: 'pairMode',
                label: 'Cách ghép đôi lên cabin (maxW = 10)',
                options: [
                  { value: 'two_ends', text: 'Ghép nặng nhất p[r] với nhẹ nhất p[l] (AC)', kind: 'ok' },
                  { value: 'adjacent', text: 'Ghép tuần tự từ trái p[i] + p[i+1] (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.pairMode === 'two_ends';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long X = 10;
    vector<long long> p = {2, 3, 7, 8};
    int l = 0, r = (int)p.size() - 1, boats = 0;
    while (l <= r) {
        if (l < r && p[l] + p[r] <= X) l++;
        r--;
        boats++;
    }
    cout << "boats=" << boats << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long X = 10;
    vector<long long> p = {2, 3, 7, 8};
    int i = 0, n = (int)p.size(), boats = 0;
    while (i < n) {
        if (i + 1 < n && p[i] + p[i + 1] <= X) i += 2;
        else i += 1;
        boats++;
    }
    cout << "boats=" << boats << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [9, 10, 11, 12, 13] : [9, 10, 11, 12, 13],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Ghép {2, 8} và {3, 7} vừa khít tải trọng 10, chỉ tốn đúng 2 cabin!'
                  : 'LÃNG PHÍ CHỖ TRỐNG (WA): Ghép 2 + 3 = 5 quá nhẹ làm bỏ thừa 5kg, để 7 và 8 phải đi riêng thành 3 cabin!',
                predictions: [
                  { text: 'Tạo thành 2 cặp {2, 8} và {3, 7}, in ra boats=2' },
                  { text: 'Ghép 2 với 3 rồi bỏ lẻ 7 và 8, in ra boats=3' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nboats=2'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nboats=3',
                explain: isOk
                  ? 'Bạn nặng nhất (8) chỉ có thể ghép với ai &lt;= 2; lấy chính người nhẹ nhất (2) vừa cứu được 1 cabin cho 8, vừa nhường bạn nhẹ tiếp theo (3) cho 7!'
                  : 'Khi bạn nhẹ 2 ghép với bạn nhẹ 3, sức chứa 10kg chỉ dùng có 5kg, trong khi 7 và 8 đứng cuối không thể ghép cùng ai được nữa.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

bool cmpEnd(const pair<int, int>& a, const pair<int, int>& b) {
    if (a.second != b.second) return a.second < b.second;
    return a.first < b.first;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<pair<int, int>> segs = {{1, 4}, {2, 8}, {4, 6}, {5, 9}, {6, 10}};
    sort(segs.begin(), segs.end(), cmpEnd);
    int cnt = 0, lastEnd = 0;
    for (int i = 0; i < (int)segs.size(); i++) {
        if (segs[i].first >= lastEnd) {
            cnt++;
            lastEnd = segs[i].second;
            cout << lastEnd << ' ';
        }
    }
    cout << "| " << cnt << '\\n';
    return 0;
}`,
            q: 'Đoạn code trên chọn các đoạn không giao nhau theo thứ tự kết thúc tăng dần (cho phép nối tiếp khi <code>l &gt;= lastEnd</code>). Kết quả in ra màn hình là gì?',
            options: [
              'In ra 4 8 10 | 3 vì đoạn {2, 8} có điểm kết thúc 8 nằm ngay sau đoạn {1, 4}',
              'In ra 4 6 10 | 3 vì lần lượt chọn được ba đoạn {1, 4}, {4, 6} và {6, 10}',
              'In ra 4 6 9 | 3 vì sau đoạn {4, 6} thì đoạn {5, 9} có đầu mút 9 nhỏ hơn 10',
              'In ra 4 9 | 2 vì điều kiện segs[i].first &gt;= lastEnd loại bỏ đoạn {4, 6}'
            ],
            correct: 1,
            explain: 'Sau khi sort theo kết thúc r tăng dần: {1,4}, {4,6}, {2,8}, {5,9}, {6,10}. Chọn {1,4} (lastEnd=4); xét {4,6}: 4 &gt;= 4 nên chọn (lastEnd=6); bỏ {2,8} (2 &lt; 6) và {5,9} (5 &lt; 6); chọn {6,10} (6 &gt;= 6, lastEnd=10). In ra: 4 6 10 | 3.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int X = 10;
    vector<int> w = {9, 4, 7, 3, 6};
    sort(w.begin(), w.end());
    int l = 0, r = (int)w.size() - 1;
    int boats = 0, paired = 0;
    while (l <= r) {
        if (l < r && w[l] + w[r] <= X) {
            l++;
            paired++;
        }
        r--;
        boats++;
    }
    cout << boats << ' ' << paired << '\\n';
    return 0;
}`,
            q: 'Theo dõi thuật toán ghép cặp hai đầu với tải trọng tối đa <code>X = 10</code> trên mảng <code>{9, 4, 7, 3, 6}</code>. Hai số <code>boats</code> và <code>paired</code> in ra là gì?',
            options: [
              'In ra 4 1 vì chỉ ghép được duy nhất cặp {3, 4} ở đầu dãy sau khi sắp xếp',
              'In ra 3 3 vì cả hai chỉ số l và r đều chạm nhau ở lần lặp cuối cùng',
              'In ra 3 2 vì có 2 cabin chở hai người ({3, 7}, {4, 6}) và 1 cabin chở riêng 9',
              'In ra 2 2 vì sau khi ghép {3, 7} và {4, 6} thì phần tử 9 tự động bị bỏ qua'
            ],
            correct: 2,
            explain: 'Mảng sau sort là {3, 4, 6, 7, 9}. Bước 1: 3 + 9 = 12 &gt; 10 nên 9 đi riêng (r=3, boats=1). Bước 2: 3 + 7 = 10 &lt;= 10 nên ghép {3, 7} (l=1, r=2, paired=1, boats=2). Bước 3: 4 + 6 = 10 &lt;= 10 nên ghép {4, 6} (l=2, r=1, paired=2, boats=3). Dừng vòng lặp, in ra 3 2.'
          },
          {
            type: 'single',
            q: 'Trong bài toán Lập lịch chọn đoạn (<code>Activity Selection</code>), vì sao chiến lược xếp theo <strong>kết thúc sớm $r$ tăng dần</strong> lại tối ưu, còn xếp theo độ dài $r - l$ ngắn nhất lại có thể sai?',
            options: [
              'Vì chọn đoạn kết thúc sớm nhất luôn giữ lại phần thời gian rảnh phía sau dài nhất có thể',
              'Vì đoạn có độ dài nhỏ nhất luôn có tọa độ đầu mút bên trái lớn hơn mọi đoạn còn lại',
              'Vì hàm std::sort trong C++ chỉ sắp xếp đúng khi viết comparator so sánh phần tử second',
              'Vì tổng độ dài của các đoạn không chồng lấn luôn đạt cực đại khi ta chọn ít đoạn nhất'
            ],
            correct: 0,
            explain: 'Khi chọn 1 đoạn kết thúc tại r, không gian còn lại cho các đoạn sau là [r, +∞). Đoạn nào kết thúc càng sớm thì [r, +∞) càng rộng, luôn chứa được mọi lựa chọn tương lai của bất kỳ phương án nào khác; còn đoạn ngắn như [5, 8] có thể vắt ngang cắt đứt 2 đoạn dài hai bên.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> khi cài đặt Tham lam với <code>std::sort</code> trong C++14?',
            options: [
              'Hàm comparator dùng cho std::sort bắt buộc chỉ trả về true khi thật sự đứng trước (&lt; hoặc &gt;), không dùng &lt;= hay &gt;=',
              'Với bài toán chọn nhiều đoạn không giao nhau nhất, luôn sắp xếp các đoạn tăng dần theo đầu mút bắt đầu l sẽ cho đáp án tối ưu',
              'Khi ghép cặp hai đầu trên mảng đã sắp xếp, cần kiểm tra điều kiện l &lt; r trước khi ghép để tránh ghép một phần tử với chính nó',
              'Nếu tọa độ l, r hoặc cân nặng đạt tới 10^9 và cần cộng dồn nhiều phần tử, phải dùng kiểu long long để tránh tràn số int'
            ],
            correct: [0, 2, 3],
            explain: 'A, C và D đều đúng. B sai hoàn toàn: xếp theo điểm bắt đầu l tăng dần sẽ chọn nhầm đoạn [1, 10] rất dài khởi đầu sớm, chặn sạch các đoạn ngắn phía sau như [2, 6] và [7, 11].'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: THAM LAM ĐỘNG VỚI MIN-HEAP & CHỨNG MINH EXCHANGE ARGUMENT
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Min-Heap & Exchange Argument',
        title: 'Vấn Đề Nhỏ 2: Tham Lam Động Với Min-Heap (<code>priority_queue</code>) &amp; Chứng Minh Exchange Argument',
        lead: 'Khi danh sách ứng viên biến đổi liên tục sau mỗi bước (như Nối dây <code>CSES-1161</code>), tại sao chỉ <code>sort</code> một lần lại sai và phải dùng <strong>Min-Heap</strong>? Và làm sao <strong>tự chứng minh</strong> một công thức Tham lam đúng $100\\%$ bằng kỹ thuật <strong>Exchange Argument</strong>?',
        subproblem: {
          title: 'Làm sao luôn rút ra 2 phần tử nhỏ nhất sau khi liên tục sinh thêm phần tử tổng mới trong $O(N \\log N)$, và làm sao chứng minh chặt chẽ thứ tự sắp xếp của Tham lam không thể bị đánh bại?',
          desc: 'Nếu dùng <code>sort</code> lại sau mỗi bước gộp sẽ mất $O(N^2 \\log N)$ (TLE), còn dùng Min-Heap của <code>L1-06</code> giữ mỗi thao tác chỉ tốn $O(\\log N)$. Còn để tránh "đoán mò" tiêu chí sắp xếp trong phòng thi, ta dùng phép hoán đổi 2 phần tử kề nhau (<strong>Exchange Argument</strong>).'
        },
        cards: [
          {
            heading: 'Tham Lam Động Với Min-Heap: Nối Dây / Stick Divisions (CSES-1161)',
            tag: 'Min-Heap &bull; long long',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Bạn có $N$ sợi dây độ dài $d_1, \\dots, d_N$. Mỗi lần buộc 2 sợi dây dài $a$ và $b$ lại thành một sợi dài $a + b$ tốn chi phí bằng đúng $a + b$. Cần nối thành 1 sợi duy nhất với tổng chi phí nhỏ nhất (tương đương đảo ngược bài cắt thanh gỗ <code>CSES-1161</code>):</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cạm bẫy chỉ <code>sort</code> một lần rồi nối tuần tự:</strong> Xét 4 sợi dây <code>{2, 3, 3, 4}</code>. Nếu chỉ sắp tăng dần 1 lần rồi cứ nối dồn từ trái sang phải: <code>2 + 3 = 5</code> (tốn $5$), lấy sợi <code>5</code> nối tiếp với <code>3</code> được <code>8</code> (tốn $8$), lấy <code>8</code> nối với <code>4</code> được <code>12</code> (tốn $12$) &rarr; tổng = <strong>25 (SAI!)</strong>.</li>
                  <li><strong>Tại sao sai?</strong> Sau bước 1, sợi mới dài <code>5</code> đã <strong>dài hơn</strong> cả hai sợi <code>3</code> và <code>4</code> còn trong rổ! Sợi nào bị nối sớm sẽ bị cộng dồn chi phí lại nhiều vòng sau, nên ở <strong>MỌI BƯỚC</strong> ta đều phải chọn 2 sợi <em>hiện đang ngắn nhất</em>:
                    <ol style="margin: 4px 0 0 20px;">
                      <li>Rổ <code>{2, 3, 3, 4}</code>: nối <code>2 + 3 = 5</code> (chi phí $+5 = 5$), thả <code>5</code> lại rổ &rarr; <code>{3, 4, 5}</code>.</li>
                      <li>Rổ <code>{3, 4, 5}</code>: nối <code>3 + 4 = 7</code> (chi phí $+7 = 12$), thả <code>7</code> lại rổ &rarr; <code>{5, 7}</code>.</li>
                      <li>Rổ <code>{5, 7}</code>: nối <code>5 + 7 = 12</code> (chi phí $+12 = 24$) &rarr; tổng = <strong>24 (CHUẨN!)</strong>.</li>
                    </ol>
                  </li>
                  <li><strong>Cảnh báo tràn số <code>long long</code>:</strong> Với $N = 2 \\cdot 10^5$ và tổng độ dài tới $10^9$, tổng chi phí cộng dồn nhiều vòng có thể lên tới $10^{14}$ &mdash; dùng <code>int</code> chắc chắn tràn âm! Luôn dùng <code>priority_queue&lt;long long, vector&lt;long long&gt;, greater&lt;long long&gt;&gt;</code> (<code>L1-06</code>).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Cài Đặt Nối Dây Với Min-Heap 64-bit Trong O(N log N)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;long long&gt; d = {2, 3, 3, 4};
    // Khai báo Min-Heap chuẩn L1-06: số NHỎ NHẤT luôn nằm ở top()
    priority_queue&lt;long long, vector&lt;long long&gt;, greater&lt;long long&gt;&gt; pq;
    for (long long x : d) pq.push(x);

    long long totalCost = 0;
    while ((int)pq.size() &gt; 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        long long merged = a + b;
        totalCost += merged;
        pq.push(merged); // Đẩy sợi mới vào lại Heap để tự sắp vị trí O(log N)
    }

    cout &lt;&lt; "Tong chi phi min: " &lt;&lt; totalCost &lt;&lt; '\\n'; // 24
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Tham lam động (<code>Dynamic Greedy</code>):</strong> Bài toán tham lam mà tập ứng viên thay đổi sau mỗi bước chọn, đòi hỏi cấu trúc duy trì cực trị liên tục như <code>priority_queue</code> (Min-Heap / Max-Heap) hoặc <code>multiset</code> trong $O(\\log N)$.</li>
                  <li><strong>Mẫu trộn tối ưu (<code>Optimal Merge / Huffman Pattern</code>):</strong> Kỹ thuật luôn gộp 2 phần tử nhỏ nhất hiện có để giảm số lần các phần tử nhỏ bị cộng lặp lại ở các tầng trên.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Chứng Minh Bằng Đối Chứng Hoán Đổi (Exchange Argument) — Tasks &amp; Deadlines',
            tag: 'Chứng minh toán học',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Xét bài toán <code>Tasks and Deadlines</code> (<code>CSES-1630</code>): Bạn có $N$ bài tập, bài $i$ mất thời gian làm $a_i$ và có hạn chót $d_i$. Nếu hoàn thành tại thời điểm $f_i$, điểm thưởng là $d_i - f_i$. Cần xếp thứ tự $N$ bài để tổng điểm thưởng $\\sum (d_i - f_i)$ lớn nhất:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cảm tính hay lừa bạn thế nào?</strong> Nhiều bạn thấy từ "hạn chót $d_i$" liền vội xếp theo <code>d[i]</code> tăng dần! Thử ngay với 3 việc <code>(a=6, d=15)</code>, <code>(a=2, d=10)</code>, <code>(a=4, d=20)</code>: xếp theo $d_i$ ra $8 + 7 + 8 = 23$, nhưng làm <code>(2,10) &rarr; (4,20) &rarr; (6,15)</code> lại đạt $8 + 14 + 3 = 25$!</li>
                  <li><strong>Phép chứng minh Exchange Argument (Hoán đổi 2 việc kề nhau):</strong>
                    <ol style="margin: 4px 0 0 20px;">
                      <li>Tách tổng điểm thưởng: $\\sum (d_i - f_i) = \\sum d_i - \\sum f_i$. Vì $\\sum d_i$ là <strong>hằng số cố định</strong>, muốn tổng thưởng lớn nhất ta chỉ cần <strong>tổng thời điểm xong $\\sum f_i$ nhỏ nhất</strong>!</li>
                      <li>Giả sử trong một lịch xếp bất kỳ có hai việc đứng liền kề là $A$ (tốn $a_1$) trước $B$ (tốn $a_2$) bắt đầu từ mốc $T$, với <strong>$a_1 &gt; a_2$</strong>:
                        <br>Thứ tự $(A, B)$: $f_A = T + a_1$, $f_B = T + a_1 + a_2 \\Rightarrow f_A + f_B = 2T + 2a_1 + a_2$.</li>
                      <li>Thử <strong>hoán đổi chỗ</strong> thành $(B, A)$: Mọi việc đứng trước $A$ và sau $B$ có thời điểm xong <strong>giữ nguyên</strong> (vì cả khối vẫn kết thúc tại $T + a_1 + a_2$)! Chỉ có 2 việc này đổi thành $f_B' + f_A' = 2T + 2a_2 + a_1$.</li>
                      <li>Lấy hiệu: $(2T + 2a_2 + a_1) - (2T + 2a_1 + a_2) = a_2 - a_1 &lt; 0$! Vậy việc đổi chỗ giúp <strong>giảm tổng $\\sum f_i$ đi $a_1 - a_2$</strong> (điểm thưởng tăng lên!)!</li>
                    </ol>
                  </li>
                  <li><strong>Kết luận bất khả xâm phạm:</strong> Lịch tối ưu không thể chứa cặp kề $a_1 &gt; a_2$ nào &rarr; <strong>bắt buộc sắp xếp theo thời lượng $a_i$ tăng dần</strong> (không phụ thuộc $d_i$)!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Cài Đặt Tasks &amp; Deadlines Chuẩn Exchange Argument</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Task {
    long long a; // Thời lượng làm bài
    long long d; // Hạn chót (deadline)
};

bool cmpDuration(const Task&amp; x, const Task&amp; y) {
    if (x.a != y.a) return x.a &lt; y.a;
    return x.d &lt; y.d;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;Task&gt; tasks = {{6, 15}, {2, 10}, {4, 20}};
    sort(tasks.begin(), tasks.end(), cmpDuration);

    long long curTime = 0, totalReward = 0;
    for (int i = 0; i &lt; (int)tasks.size(); i++) {
        curTime += tasks[i].a;
        totalReward += tasks[i].d - curTime;
    }
    cout &lt;&lt; "Tong thuong max: " &lt;&lt; totalReward &lt;&lt; '\\n'; // 25
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Đối chứng hoán đổi (<code>Exchange Argument</code>):</strong> Phương pháp chứng minh tính tối ưu của Tham lam bằng cách giả sử một lời giải tốt nhất bị lệch thứ tự, hoán đổi 2 phần tử kề nhau và chỉ ra kết quả chỉ có thể tốt hơn hoặc bằng.</li>
                  <li><strong>Bất biến khối (<code>Local Swapping Invariance</code>):</strong> Khi đổi chỗ hai công việc kề nhau $(A, B) \\rightarrow (B, A)$, tổng thời gian khối $a_1 + a_2$ không đổi nên mọi công việc đứng trước và sau khối hoàn toàn không bị ảnh hưởng.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_min_heap_ropes',
            title: 'Phòng Thí Nghiệm 2A: Nối Dây {2, 3, 3, 4} — Min-Heap Động vs Sort Một Lần',
            desc: 'Với 4 đoạn dây {2, 3, 3, 4}, thử tắt Min-Heap để dùng cách chỉ sort 1 lần rồi nối cuốn chiếu từ trái sang phải xem chi phí đội lên ra sao!',
            toggles: [
              {
                key: 'heapMode',
                label: 'Cấu trúc duy trì đoạn ngắn nhất',
                options: [
                  { value: 'minheap', text: 'Min-Heap priority_queue&lt;..., greater&lt;...&gt;&gt; (AC)', kind: 'ok' },
                  { value: 'staticsort', text: 'Chỉ sort() một lần rồi nối từ trái qua phải (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.heapMode === 'minheap';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (long long x : {2LL, 3LL, 3LL, 4LL}) pq.push(x);
    long long cost = 0;
    while ((int)pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        cost += a + b;
        pq.push(a + b);
    }
    cout << "cost=" << cost << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<long long> a = {2, 3, 3, 4};
    sort(a.begin(), a.end());
    long long cur = a[0], cost = 0;
    for (int i = 1; i < (int)a.size(); i++) {
        cur += a[i];
        cost += cur;
    }
    cout << "cost=" << cost << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [7, 8, 10, 11, 12, 13, 14] : [7, 8, 9, 10, 11, 12, 13],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Min-Heap nhét sợi 5 vào sau sợi 3 và 4, nối {3, 4} trước và đạt tối ưu cost = 24!'
                  : 'QUÊN CẬP NHẬT THỨ TỰ (WA): Sợi mới 5 dài hơn 3 và 4 nhưng vẫn bị nối tiếp ngay thành 5 + 3 = 8, làm tổng chi phí tăng vọt lên cost = 25!',
                predictions: [
                  { text: 'Ghép (2+3)=5, rồi (3+4)=7, rồi (5+7)=12, tổng cost=24' },
                  { text: 'Nối dồn (2+3)=5, (5+3)=8, (8+4)=12, tổng bị tăng lên cost=25' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ncost=24'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ncost=25',
                explain: isOk
                  ? 'Min-Heap tự động đặt phần tử mới 2 + 3 = 5 vào đúng vị trí phía sau 3 và 4 chỉ trong O(log N), giúp bước thứ hai luôn gộp được đúng 2 đoạn ngắn nhất là 3 và 4.'
                  : 'Khi nối tuần tự bằng vòng for trên mảng đã sort 1 lần, phần tử tích lũy cur = 5 bị giữ ở đầu hàng dù nó lớn hơn a[2] = 3 và a[3] = 4!'
              };
            }
          },
          {
            id: 'sb_exchange_tasks',
            title: 'Phòng Thí Nghiệm 2B: Tasks &amp; Deadlines — Xếp Theo Thời Lượng a vs Hạn Chót d',
            desc: 'Với 3 công việc {(a=6, d=15), (a=2, d=10), (a=4, d=20)}, hãy kiểm chứng kết luận Exchange Argument bằng cách so sánh xếp theo thời lượng a tăng dần với xếp nhầm theo hạn chót d tăng dần!',
            toggles: [
              {
                key: 'taskKey',
                label: 'Khóa sắp xếp cặp (duration a, deadline d)',
                options: [
                  { value: 'dur', text: 'x.first &lt; y.first — Theo thời lượng a tăng dần (AC)', kind: 'ok' },
                  { value: 'dead', text: 'x.second &lt; y.second — Theo hạn chót d tăng dần (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.taskKey === 'dur';
              const code = `#include <bits/stdc++.h>
using namespace std;

bool cmp(const pair<long long, long long>& x, const pair<long long, long long>& y) {
${isOk ? '    return x.first < y.first;' : '    return x.second < y.second;'}
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<pair<long long, long long>> tasks = {{6, 15}, {2, 10}, {4, 20}};
    sort(tasks.begin(), tasks.end(), cmp);
    long long t = 0, reward = 0;
    for (int i = 0; i < (int)tasks.size(); i++) {
        t += tasks[i].first;
        reward += tasks[i].second - t;
    }
    cout << "reward=" << reward << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [5],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Exchange Argument chứng minh sắp theo thời lượng a luôn giảm tổng thời điểm xong và đạt reward = 25!'
                  : 'NHẦM SANG HẠN CHÓT (WA): Việc (6, 15) làm dài 6 phút chen trước (4, 20) làm trễ thêm 6 phút, kéo điểm thưởng tụt xuống còn 23!',
                predictions: [
                  { text: 'Làm theo thứ tự thời lượng 2 &rarr; 4 &rarr; 6, đạt tổng thưởng reward=25' },
                  { text: 'Làm theo thứ tự hạn chót 10 &rarr; 15 &rarr; 20, chỉ đạt reward=23' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nreward=25'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nreward=23',
                explain: isOk
                  ? 'Tổng hạn chót sum(d_i) = 45 không đổi. Xếp thời lượng 2, 4, 6 giúp thời điểm xong là 2, 6, 12 (tổng 20) &rarr; thưởng 45 - 20 = 25 (tối ưu tuyệt đối!).'
                  : 'Xếp theo hạn chót cho thứ tự thời lượng 2, 6, 4 nên thời điểm xong là 2, 8, 12 (tổng 22) &rarr; thưởng chỉ còn 45 - 22 = 23!'
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
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (long long x : {5LL, 2LL, 4LL, 2LL}) pq.push(x);
    long long cost = 0, secondMerge = 0;
    int step = 0;
    while ((int)pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        long long s = a + b;
        step++;
        if (step == 2) secondMerge = s;
        cost += s;
        pq.push(s);
    }
    cout << cost << ' ' << secondMerge << '\\n';
    return 0;
}`,
            q: 'Theo dõi quá trình Min-Heap nối 4 đoạn dây <code>{5, 2, 4, 2}</code> ở trên. Hai số <code>cost</code> và <code>secondMerge</code> (chi phí của lần gộp thứ 2) in ra là gì?',
            options: [
              'In ra 23 6 vì lần gộp thứ hai luôn ghép phần tử vừa tạo với giá trị nhỏ nhất là 2',
              'In ra 26 6 vì sau khi gộp 2 + 4 = 6 thì phần tử 5 được ghép cùng 2 ở bước thứ hai',
              'In ra 27 9 vì bước hai nối sợi 5 với sợi 4 vừa nối xong từ lần gộp thứ nhất',
              'In ra 25 8 vì bước một gộp 2 + 2 = 4, bước hai gộp 4 + 4 = 8 và bước ba gộp 5 + 8 = 13'
            ],
            correct: 3,
            explain: 'Min-Heap ban đầu {2, 2, 4, 5}. Bước 1: rút 2 và 2 &rarr; ghép 4 (cost=4), heap còn {4, 4, 5}. Bước 2: rút 4 và 4 &rarr; secondMerge=8 (cost=4+8=12), heap còn {5, 8}. Bước 3: rút 5 và 8 &rarr; ghép 13 (cost=12+13=25). In ra: 25 8.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

struct Task { long long a, d; };
bool cmp(const Task& x, const Task& y) { return x.a < y.a; }

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<Task> tasks = {{5, 12}, {2, 10}, {3, 9}};
    sort(tasks.begin(), tasks.end(), cmp);
    long long t = 0, ans = 0;
    for (int i = 0; i < (int)tasks.size(); i++) {
        t += tasks[i].a;
        ans += tasks[i].d - t;
    }
    cout << ans << '\\n';
    return 0;
}`,
            q: 'Chạy đoạn code <code>Tasks and Deadlines</code> trên 3 công việc <code>{(5, 12), (2, 10), (3, 9)}</code>. Giá trị tổng thưởng <code>ans</code> in ra là bao nhiêu?',
            options: [
              'In ra 14 vì thứ tự làm là 2, 3, 5 nên tổng thưởng lần lượt là 8 + 4 + 2 = 14',
              'In ra 12 vì công việc có hạn chót 9 được xếp lên đầu trước công việc có hạn 10',
              'In ra 16 vì thời gian hoàn thành từng việc được cộng độc lập không tính phần dồn t',
              'In ra 11 vì công việc đầu tiên mất 5 phút làm trễ hai công việc còn lại phía sau'
            ],
            correct: 0,
            explain: 'Sau khi sort theo thời lượng a tăng dần: (2, 10), (3, 9), (5, 12). Việc 1 xong lúc t=2 (thưởng 10-2=8). Việc 2 xong lúc t=2+3=5 (thưởng 9-5=4). Việc 3 xong lúc t=5+5=10 (thưởng 12-10=2). Tổng ans = 8 + 4 + 2 = 14.'
          },
          {
            type: 'single',
            q: 'Trong chứng minh <strong>Exchange Argument</strong> cho bài toán <code>Tasks and Deadlines</code>, khi ta hoán đổi hai công việc đứng kề nhau $A$ (thời lượng $a_1$) và $B$ (thời lượng $a_2$) với $a_1 &gt; a_2$ tại mốc bắt đầu $T$, điều gì xảy ra với tổng thời điểm hoàn thành $\\sum f_i$?',
            options: [
              'Mọi việc sau B cũng bị dịch chuyển thời điểm xong nên công thức không đánh giá được độ lệch',
              'Tổng hai mốc f_A + f_B tăng thêm a_1 - a_2 nên giữ nguyên thứ tự A trước B luôn tốt hơn',
              'Tổng hai mốc f_A + f_B giảm đúng a_1 - a_2 &gt; 0 trong khi mọi việc khác vẫn giữ nguyên mốc xong',
              'Điểm thưởng của việc đứng trước tăng lên nhưng tổng thời gian làm cả khối tăng lên a_1 + a_2'
            ],
            correct: 2,
            explain: 'Cả khối (A, B) vẫn bắt đầu tại T và kết thúc tại T + a_1 + a_2 nên các việc trước và sau khối hoàn toàn không đổi mốc xong. Riêng f_A + f_B chuyển từ 2T + 2a_1 + a_2 sang 2T + 2a_2 + a_1, giảm đi đúng a_1 - a_2 &gt; 0!'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> về Tham lam động với Heap và Exchange Argument?',
            options: [
              'Trong bài nối dây, chỉ sort mảng một lần rồi nối từ trái qua phải sẽ sai với dãy {2, 3, 3, 4} vì sợi mới tạo ra (5) dài hơn các sợi chưa dùng (3, 4)',
              'Khai báo priority_queue&lt;long long, vector&lt;long long&gt;, greater&lt;long long&gt;&gt; tạo ra Min-Heap giúp lấy và đẩy lại sợi dây mới trong O(log N)',
              'Dùng Max-Heap priority_queue&lt;long long&gt; nối hai sợi dây dài nhất trước sẽ giúp giảm số vòng lặp và đạt tổng chi phí nhỏ nhất',
              'Khi tổng độ dài các đoạn dây đạt tới 10^9 và N lên tới 2 * 10^5, biến tổng chi phí bắt buộc phải dùng kiểu long long thay cho int'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D đều đúng. C sai hoàn toàn: nối 2 sợi dài nhất trước khiến các sợi lớn bị cộng dồn lặp lại qua tất cả các vòng sau, cho tổng chi phí lớn nhất chứ không phải nhỏ nhất!'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: ĐIỂM GÃY CỦA THAM LAM — PHẢN VÍ DỤ & MÁY CHẤM L2-04/MOD-00
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Điểm Gãy Của Tham Lam',
        title: 'Vấn Đề Nhỏ 3: Điểm Gãy Của Tham Lam &mdash; Phản Ví Dụ &amp; Đối Chiếu Máy Chấm (<code>L2-04</code> / <code>MOD-00</code>)',
        lead: 'Tham lam không phải phép màu vạn năng! Khám phá hai bài toán kinh điển làm Tham lam gãy gục (<strong>Đổi tiền <code>{1, 3, 4}</code></strong> và <strong>Balo 0-1 theo tỉ giá</strong>), cách dùng <code>L2-04</code> + Máy chấm <code>MOD-00</code> vạch trần phản ví dụ trong 0.1 giây, và lý do ta cần bước sang <strong>Quy hoạch động (<code>L2-06</code>)</strong>.',
        subproblem: {
          title: 'Khi nào chọn cái lợi nhất trước mắt lại dẫn tới đáp án SAI (WA), làm sao dùng Quay lui/Bitmask (<code>L2-04</code>) và Máy chấm (<code>MOD-00</code>) phát hiện lỗi trước khi nộp bài, và bước tiếp theo là gì?',
          desc: 'Tham lam chỉ đúng khi lựa chọn hiện tại không làm hỏng phần còn lại. Nếu bỏ qua một lựa chọn lớn hôm nay giúp ghép vừa khít cặp đẹp ở phía sau, Tham lam sẽ bị lừa hoàn toàn. Với $N$ nhỏ ta đối chiếu bằng <code>L2-04</code>; còn với $N$ lớn khi Tham lam đã gãy, đó chính là lúc mở khóa <strong>Quy hoạch động (<code>L2-06</code>)</strong>!'
        },
        cards: [
          {
            heading: 'Hai Điểm Gãy Kinh Điển: Đổi Tiền {1, 3, 4} &amp; Balo 0-1 Theo Tỉ Giá',
            tag: 'Phản ví dụ &bull; WA',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Tại sao "lấy thứ ngon nhất trước mắt" đôi khi lại khiến ta <strong>tham bát bỏ mâm</strong>? Hãy nhìn thẳng vào 2 phản ví dụ cực nhỏ sau:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Điểm gãy 1 &mdash; Bài toán Đổi tiền (<code>Coin Change</code>):</strong> Trong ví có vô hạn các đồng xu mệnh giá <code>{1, 3, 4}</code>, bạn cần trả đúng $S = 6$ đồng bằng <strong>ít tờ nhất</strong>:
                    <br>&bull; <em>Tham lam lấy tờ to nhất trước:</em> Thấy <code>4 &lt;= 6</code> liền rút ngay tờ <code>4</code>, còn dư $2$, đành rút thêm <code>1 + 1</code> &rarr; tốn <strong>3 tờ (<code>4 + 1 + 1</code>)</strong>!
                    <br>&bull; <em>Tối ưu thật sự (Quay lui <code>L2-04</code> tìm ra):</em> Nhường tờ <code>4</code> lại, rút <strong><code>3 + 3</code></strong> &rarr; chỉ tốn <strong>2 tờ</strong>! Việc vồ lấy tờ <code>4</code> đã khóa mất đường ghép <code>3 + 3</code>!</li>
                  <li><strong>Điểm gãy 2 &mdash; Balo 0-1 nguyên chiếc (<code>0-1 Knapsack</code>):</strong> Balo chở tối đa $W = 10$ kg. Có 3 thỏi vàng nguyên khối (chỉ được lấy nguyên thỏi hoặc bỏ, <strong>không được cưa đôi</strong>):
                    <br>&bull; Món A: nặng $6$ kg, giá $60$ (tỉ giá <strong>$10.0$/kg</strong> &mdash; hời nhất!).
                    <br>&bull; Món B: nặng $5$ kg, giá $45$ (tỉ giá $9.0$/kg) &bull; Món C: nặng $5$ kg, giá $45$ (tỉ giá $9.0$/kg).
                    <br>&bull; <em>Tham lam theo tỉ giá $v_i / w_i$:</em> Chọn ngay A ($6$ kg, giá $60$). Balo còn trống $4$ kg nhưng không nhét nổi B hay C ($5$ kg) &rarr; <strong>bỏ trống $4$ kg</strong>, tổng giá chỉ đạt <strong>60</strong>!
                    <br>&bull; <em>Tối ưu thật sự (Bitmask $2^3$ của <code>L2-04</code>):</em> Bỏ qua A, chọn <strong>B + C</strong> ($5 + 5 = 10$ kg vừa khít!) &rarr; tổng giá đạt <strong>90</strong>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: So Sánh Tham Lam Gãy vs Bitmask 2^N (L2-04) Trên Balo 0-1</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Item { long long w, v; };

bool cmpRatio(const Item&amp; a, const Item&amp; b) {
    // So sánh a.v / a.w &gt; b.v / b.w bằng nhân chéo nguyên (tránh sai số thực!)
    return a.v * b.w &gt; b.v * a.w;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long W = 10;
    vector&lt;Item&gt; items = {{6, 60}, {5, 45}, {5, 45}};

    // 1. Tham lam theo tỉ giá v/w: chọn {6, 60} rồi kẹt 4kg thừa -&gt; chỉ đạt 60!
    vector&lt;Item&gt; sorted = items;
    sort(sorted.begin(), sorted.end(), cmpRatio);
    long long curW = 0, greedyVal = 0;
    for (const auto&amp; it : sorted) {
        if (curW + it.w &lt;= W) { curW += it.w; greedyVal += it.v; }
    }

    // 2. Bitmask 2^N (L2-04): duyệt đủ mọi tập con -&gt; tìm được {5,45}+{5,45} = 90!
    int n = (int)items.size();
    long long exactVal = 0;
    for (int mask = 0; mask &lt; (1 &lt;&lt; n); mask++) {
        long long sw = 0, sv = 0;
        for (int i = 0; i &lt; n; i++) {
            if ((mask &gt;&gt; i) &amp; 1) { sw += items[i].w; sv += items[i].v; }
        }
        if (sw &lt;= W) exactVal = max(exactVal, sv);
    }

    cout &lt;&lt; "Greedy = " &lt;&lt; greedyVal &lt;&lt; ", Bitmask = " &lt;&lt; exactVal &lt;&lt; '\\n'; // 60 vs 90
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Phản ví dụ (<code>Counterexample</code>):</strong> Một test đầu vào cụ thể (dù chỉ có $3$ phần tử) khiến thuật toán Tham lam trả kết quả sai so với nghiệm tối ưu; chỉ cần <strong>1 phản ví dụ</strong> là đủ kết luận chiến lược Tham lam bị sai!</li>
                  <li><strong>Điểm gãy của Tham lam (<code>Failure of Greedy Choice</code>):</strong> Hiện tượng lựa chọn tham lam ở bước hiện tại làm hỏng khả năng kết hợp tối ưu ở các bước sau (như tờ <code>4</code> chặn cặp <code>3 + 3</code>, hay thỏi <code>6</code> kg chặn cặp <code>5 + 5</code>).</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Quy Trình Tự Kiểm Chứng Bằng Máy Chấm (MOD-00) &amp; Cánh Cửa Sang Quy Hoạch Động (L2-06)',
            tag: 'Stress Test &bull; Cầu nối DP',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Trong phòng thi, khi bạn nghĩ ra một ý tưởng Tham lam mà chưa kịp chứng minh <strong>Exchange Argument</strong>, tuyệt đối đừng nhắm mắt nộp ngay! Hãy dùng đúng vũ khí <strong><code>L2-04</code> + <code>MOD-00</code></strong> đã học:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bước 1:</strong> Viết hàm <code>solveTrau()</code> bằng Quay lui hoặc Bitmask $2^N$ (chắc chắn đúng 100% trên $N \\le 8$).</li>
                  <li><strong>Bước 2:</strong> Sinh $500$ đến $1\\,000$ bộ test ngẫu nhiên nhỏ bằng <code>mt19937</code> và so <code>solveGreedy()</code> với <code>solveTrau()</code>. Nếu Tham lam có lỗi, Máy chấm sẽ nhổ ra đúng một phản ví dụ mini chỉ trong 0.1 giây!</li>
                  <li><strong>Bước 3 &mdash; Khi Tham lam gãy mà $N$ lại lớn thì đi đâu?</strong> Trong ví dụ Balo 0-1, nếu $N = 100$ và $W = 10^4$, Tham lam thì <strong>WA</strong> còn Bitmask $2^{100}$ của <code>L2-04</code> thì <strong>TLE</strong>! Lối thoát duy nhất nằm ở bài giảng tiếp theo <strong><code>L2-06</code>: Quy Hoạch Động (Dynamic Programming)</strong> &mdash; nơi bạn học cách ghi nhớ lại kết quả của mọi bài toán con thay vì chỉ lao mù quáng theo một lựa chọn tham lam!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Dùng Máy Chấm MOD-00 Tự Động Bắt Lỗi Tham Lam Bằng Bitmask</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

struct Item { long long w, v; };

long long greedyRatio(long long W, vector&lt;Item&gt; items) {
    sort(items.begin(), items.end(), [](const Item&amp; a, const Item&amp; b) {
        return a.v * b.w &gt; b.v * a.w;
    });
    long long curW = 0, ans = 0;
    for (const auto&amp; it : items) {
        if (curW + it.w &lt;= W) { curW += it.w; ans += it.v; }
    }
    return ans;
}

long long solveTrau(long long W, const vector&lt;Item&gt;&amp; items) {
    int n = (int)items.size();
    long long best = 0;
    for (int mask = 0; mask &lt; (1 &lt;&lt; n); mask++) {
        long long sw = 0, sv = 0;
        for (int i = 0; i &lt; n; i++) {
            if ((mask &gt;&gt; i) &amp; 1) { sw += items[i].w; sv += items[i].v; }
        }
        if (sw &lt;= W) best = max(best, sv);
    }
    return best;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    mt19937 rng(2026);
    for (int tc = 1; tc &lt;= 500; tc++) {
        int n = (int)(rng() % 5) + 3;
        long long W = (long long)(rng() % 15) + 6;
        vector&lt;Item&gt; items(n);
        for (int i = 0; i &lt; n; i++) items[i] = {(long long)(rng() % 9) + 1, (long long)(rng() % 40) + 5};
        long long g = greedyRatio(W, items), b = solveTrau(W, items);
        if (g != b) {
            cout &lt;&lt; "Phat hien diem gay tai test #" &lt;&lt; tc &lt;&lt; ": Greedy=" &lt;&lt; g &lt;&lt; " != " &lt;&lt; b &lt;&lt; '\\n';
            break;
        }
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Kiểm chứng đối chiếu Tham lam (<code>Greedy Stress Testing</code>):</strong> Dùng hàm vét cạn <code>L2-04</code> ($O(2^N)$ / $O(N!)$) làm đáp án chuẩn (Oracle) trên test ngẫu nhiên $N \\le 8$ (<code>MOD-00</code>) để phát hiện phản ví dụ trước khi nộp bài.</li>
                  <li><strong>Cầu nối Quy hoạch động (<code>Bridge to Dynamic Programming</code>):</strong> Khi một bài toán không có tính chất tham lam (Tham lam bị gãy) nhưng các nhánh thử của cây đệ quy <code>L2-04</code> có nhiều bài toán con lặp lại, giải pháp tối ưu là lưu bảng đáp án con trong <strong><code>L2-06</code></strong>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_coin_break',
            title: 'Phòng Thí Nghiệm 3A: Đổi Tiền {1, 3, 4} Với S = 6 — Quay Lui (L2-04) vs Tham Lam',
            desc: 'Thử chạy bài toán đổi đúng 6 đồng từ bộ xu {1, 3, 4}. Chuyển sang chế độ Tham lam chọn tờ lớn nhất để chứng kiến nó bị kẹt ở 4 + 1 + 1 (3 tờ) thay vì 3 + 3 (2 tờ)!',
            toggles: [
              {
                key: 'coinAlgo',
                label: 'Thuật toán đổi S = 6 với {1, 3, 4}',
                options: [
                  { value: 'backtrack', text: 'Quay lui duyệt mọi tổ hợp (L2-04) — Tìm đúng 2 tờ (AC)', kind: 'ok' },
                  { value: 'greedy', text: 'Tham lam luôn lấy xu lớn nhất còn &lt;= S (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.coinAlgo === 'backtrack';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int best = 1000000000;
void dfs(int rem, int used, const vector<int>& coins) {
    if (used >= best) return;
    if (rem == 0) { best = used; return; }
    for (int c : coins) {
        if (c <= rem) dfs(rem - c, used + 1, coins);
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    dfs(6, 0, {4, 3, 1});
    cout << "min_coins=" << best << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int S = 6, cnt = 0;
    for (int c : {4, 3, 1}) {
        cnt += S / c;
        S %= c;
    }
    cout << "min_coins=" << cnt << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [4, 5, 6, 7, 8, 9, 10, 11, 16] : [7, 8, 9, 10, 11],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Quay lui thử đủ mọi nhánh bỏ qua tờ 4 và tìm được cặp tối ưu 3 + 3 (2 tờ)!'
                  : 'ĐIỂM GÃY ĐỔI TIỀN (WA): Tham lam rút ngay tờ 4 làm phần dư tụt về 2, ép phải lấy thêm hai tờ 1 thành 3 tờ (4 + 1 + 1)!',
                predictions: [
                  { text: 'Thử tất cả tổ hợp nên tìm được cặp 3 + 3 và in min_coins=2' },
                  { text: 'Chọn ngay tờ 4 đầu tiên rồi bù hai tờ 1 nên in sai min_coins=3' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nmin_coins=2'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nmin_coins=3',
                explain: isOk
                  ? 'Khi thử cả nhánh chọn 3 trước, bài toán con còn lại là S = 3 cũng vừa khít 1 tờ 3. Ở L2-06, ta sẽ học cách ghi nhớ các bài toán con S = 1..6 để chạy nhanh O(S * |coins|)!'
                  : 'Mệnh giá {1, 3, 4} không có tính chất chia bội đẹp như tiền thật {1, 2, 5, 10}, nên chọn tờ lớn nhất 4 ở bước đầu làm hỏng nghiệm tối ưu!'
              };
            }
          },
          {
            id: 'sb_knapsack_break',
            title: 'Phòng Thí Nghiệm 3B: Balo 0-1 (W = 10) — Bitmask 2^N vs Tham Lam Tỉ Giá v/w',
            desc: 'Với W = 10 và 3 món {(6, 60), (5, 45), (5, 45)}, hãy bật chế độ Tham lam theo tỉ giá v/w giảm dần để xem khoảng trống 4kg bị bỏ phí thế nào!',
            toggles: [
              {
                key: 'knapAlgo',
                label: 'Cách chọn đồ vào balo tải trọng W = 10',
                options: [
                  { value: 'bitmask', text: 'Bitmask duyệt 2^N tập con (L2-04) — Đạt 90 (AC)', kind: 'ok' },
                  { value: 'ratio', text: 'Tham lam xếp tỉ giá v/w giảm dần (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.knapAlgo === 'bitmask';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long W = 10, best = 0;
    vector<pair<long long, long long>> items = {{6, 60}, {5, 45}, {5, 45}};
    int n = (int)items.size();
    for (int mask = 0; mask < (1 << n); mask++) {
        long long sw = 0, sv = 0;
        for (int i = 0; i < n; i++) {
            if ((mask >> i) & 1) { sw += items[i].first; sv += items[i].second; }
        }
        if (sw <= W) best = max(best, sv);
    }
    cout << "max_value=" << best << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long W = 10, curW = 0, best = 0;
    vector<pair<long long, long long>> items = {{6, 60}, {5, 45}, {5, 45}};
    sort(items.begin(), items.end(), [](const pair<long long, long long>& a, const pair<long long, long long>& b) {
        return a.second * b.first > b.second * a.first;
    });
    for (auto it : items) {
        if (curW + it.first <= W) { curW += it.first; best += it.second; }
    }
    cout << "max_value=" << best << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [9, 10, 11, 12, 13, 14, 15, 16] : [9, 10, 11, 12, 13, 14],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Bitmask 2^3 thử bỏ món 6kg và lấy vừa khít hai món 5kg + 5kg, đạt max_value = 90!'
                  : 'ĐIỂM GÃY BALO 0-1 (WA): Món (6, 60) có tỉ giá 10.0 cao nhất được nhặt trước, để thừa 4kg không nhét được món 5kg nào nên chỉ đạt 60!',
                predictions: [
                  { text: 'Duyệt đủ 8 tập con, chọn 2 món 5kg để lấp đầy 10kg và in max_value=90' },
                  { text: 'Chọn món tỉ giá 10.0/kg (6kg, giá 60) rồi thừa 4kg vô dụng nên in sai max_value=60' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nmax_value=90'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nmax_value=60',
                explain: isOk
                  ? 'Khi đồ vật không được chia lẻ (0 hoặc 1), ta buộc phải xét tổ hợp vừa khít dung lượng W. Nếu N tới 100 không chạy nổi 2^N, hãy chờ bài L2-06 và L2-08 (Quy hoạch động Cái túi)!'
                  : 'Tham lam theo tỉ giá v/w chỉ đúng nếu bạn được phép bẻ nhỏ món hàng (Balo phân số — Fractional Knapsack); với Balo 0-1 nguyên chiếc, khoảng trống 4kg bị lãng phí làm mất 30 giá trị!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int best = 1000000000;
void dfs(int rem, int used, const vector<int>& coins) {
    if (used >= best) return;
    if (rem == 0) { best = used; return; }
    for (int c : coins) {
        if (c <= rem) dfs(rem - c, used + 1, coins);
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> coins = {5, 4, 1};
    int S = 8, greedyCnt = 0, tmp = S;
    for (int c : coins) {
        greedyCnt += tmp / c;
        tmp %= c;
    }
    dfs(S, 0, coins);
    cout << greedyCnt << ' ' << best << '\\n';
    return 0;
}`,
            q: 'Đoạn code trên chạy cả thuật toán Tham lam chọn đồng lớn nhất lẫn Quay lui chuẩn trên tập xu <code>{5, 4, 1}</code> với <code>S = 8</code>. Kết quả in ra là gì?',
            options: [
              'In ra 3 2 vì Tham lam lấy 5 + 1 + 1 + 1 chỉ đếm sai biến tmp trong vòng lặp cuối',
              'In ra 4 2 vì Tham lam lấy 5 + 1 + 1 + 1 (4 tờ) còn Quay lui tìm được 4 + 4 (2 tờ)',
              'In ra 2 2 vì cả Tham lam lẫn Quay lui đều tự động chọn hai đồng mệnh giá 4',
              'In ra 4 3 vì Quay lui không thể dùng lại cùng một đồng xu mệnh giá 4 nhiều hơn một lần'
            ],
            correct: 1,
            explain: 'Với S = 8 và xu {5, 4, 1}: Tham lam lấy 8 / 5 = 1 tờ 5 (dư 3), 3 / 4 = 0, 3 / 1 = 3 tờ 1 &rarr; tổng 4 tờ. Quay lui cho phép thử lại mỗi đồng xu nhiều lần nên chọn 4 + 4 &rarr; 2 tờ. Kết quả: 4 2.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long W = 8;
    vector<pair<long long, long long>> items = {{5, 50}, {4, 36}, {4, 36}};
    sort(items.begin(), items.end(), [](const pair<long long, long long>& a, const pair<long long, long long>& b) {
        return a.second * b.first > b.second * a.first;
    });
    long long curW = 0, greedyVal = 0;
    for (auto it : items) {
        if (curW + it.first <= W) { curW += it.first; greedyVal += it.second; }
    }
    long long exactVal = 0;
    for (int mask = 0; mask < (1 << 3); mask++) {
        long long sw = 0, sv = 0;
        for (int i = 0; i < 3; i++) {
            if ((mask >> i) & 1) { sw += items[i].first; sv += items[i].second; }
        }
        if (sw <= W) exactVal = max(exactVal, sv);
    }
    cout << greedyVal << ' ' << exactVal << '\\n';
    return 0;
}`,
            q: 'Với balo <code>W = 8</code> và 3 món <code>{(5, 50), (4, 36), (4, 36)}</code>, giá trị <code>greedyVal</code> (Tham lam tỉ giá) và <code>exactVal</code> (Bitmask $2^N$) in ra là gì?',
            options: [
              'In ra 86 86 vì sau khi chọn món (5, 50) balo vẫn còn đủ chỗ nhét thêm món (4, 36)',
              'In ra 72 86 vì hàm sort sắp nhầm hai món tỉ giá 9.0 lên trước món tỉ giá 10.0',
              'In ra 50 50 vì cả hai cách đều không thể ghép chung hai món có cùng trọng lượng 4',
              'In ra 50 72 vì Tham lam lấy món (5, 50) rồi kẹt 3kg thừa còn Bitmask lấy 36 + 36 = 72'
            ],
            correct: 3,
            explain: 'Món (5, 50) có tỉ giá 10.0 &gt; 9.0 nên Tham lam nhặt trước (còn trống 3kg &lt; 4kg, dừng tại 50). Bitmask thử mask = 6 (110_2) chọn cả hai món (4, 36) có tổng trọng lượng 8 &lt;= 8 và đạt exactVal = 72. In ra: 50 72.'
          },
          {
            type: 'single',
            q: 'Khi bạn thiết kế một thuật toán Tham lam cho bài tối ưu mới và chạy thử trên Máy chấm (<code>MOD-00</code>) đối chiếu với code Quay lui/Bitmask (<code>L2-04</code>) cho $N \\le 8$, chuyện gì sẽ xảy ra nếu máy chấm báo lệch kết quả ở chỉ <strong>1 bộ test nhỏ</strong>?',
            options: [
              'Thuật toán Tham lam vẫn đúng nhưng cần đổi kiểu int sang long long ở vòng lặp for',
              'Thuật toán Tham lam đã bị gãy tại phản ví dụ đó và không thể dùng để giải bài này',
              'Máy chấm MOD-00 bị lỗi sinh số ngẫu nhiên mt19937 vì kích thước N = 8 quá nhỏ',
              'Cần tăng số lần lặp random từ 500 lên 10,000 để bộ test lệch tự biến mất dần'
            ],
            correct: 1,
            explain: 'Chỉ cần tồn tại 1 phản ví dụ hợp lệ mà code Tham lam ra kết quả kém hơn đáp án chuẩn của code Quay lui/Bitmask là đủ kết luận chiến lược Tham lam đã bị gãy! Lúc này ta cần xét lại bài toán con (chuyển sang Quy hoạch động ở L2-06 khi N lớn).'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về điểm gãy của Tham lam và cách kiểm chứng?',
            options: [
              'Bài toán Đổi tiền luôn gãy nếu chọn đồng lớn nhất với một số bộ mệnh giá như {1, 3, 4} (với S = 6: 4 + 1 + 1 tệ hơn 3 + 3)',
              'Tham lam theo đơn giá v_i / w_i có thể sai trong Balo 0-1 vì món tỉ giá cao có thể để lại phần dung lượng thừa không nhét vừa món nào khác',
              'Hàm vét cạn O(2^N) bằng Bitmask hoặc Quay lui (L2-04) trên N &lt;= 8 là công cụ Oracle tin cậy giúp bắt phản ví dụ cho code Tham lam',
              'Nếu một thuật toán Tham lam chạy khớp trên 5 test ngẫu nhiên đầu tiên thì chắc chắn 100% đúng mà không cần chứng minh thêm'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều đúng. D sai hoàn toàn: có những phản ví dụ Tham lam chỉ xuất hiện ở các cấu hình ràng buộc rất đặc biệt hoặc N lớn hơn một chút; phải chứng minh chặt chẽ (như Exchange Argument) hoặc chạy Stress Test hàng nghìn bộ test đa dạng!'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l205_activity_sort_start',
        title: 'Sắp Xếp Đoạn Theo Điểm Bắt Đầu Thay Vì Điểm Kết Thúc Trong Activity Selection (WA)',
        description: 'Chương trình tìm số lượng tối đa các đoạn [l, r] không chồng lấn. Với 4 đoạn [1, 10], [2, 6], [5, 8], [7, 11], đáp án đúng là 2 ([2, 6] và [7, 11]), nhưng do gọi sort mặc định nên code xếp theo đầu mút trái l và in ra 1!',
        failingInput: '4\n1 10\n2 6\n5 8\n7 11',
        failingOutput: '1',
        expectedOutput: '2',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

bool cmpByEnd(const pair<long long, long long>& a, const pair<long long, long long>& b) {
    if (a.second != b.second) return a.second < b.second;
    return a.first < b.first;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    vector<pair<long long, long long>> segs(n);
    for (int i = 0; i < n; i++) cin >> segs[i].first >> segs[i].second;
    sort(segs.begin(), segs.end());
    int cnt = 0;
    long long lastEnd = -4000000000000000000LL;
    for (int i = 0; i < n; i++) {
        if (segs[i].first >= lastEnd) {
            cnt++;
            lastEnd = segs[i].second;
        }
    }
    cout << cnt << '\\n';
    return 0;
}`,
        bugLine: 16,
        patches: [
          { text: 'Đổi dòng 16 thành sort(segs.rbegin(), segs.rend());' },
          { text: 'Đổi dòng 16 thành sort(segs.begin(), segs.end(), cmpByEnd);' },
          { text: 'Đổi dòng 20 thành if (segs[i].second >= lastEnd) {' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 16, gọi sort(segs.begin(), segs.end()) mặc định sắp theo .first (điểm bắt đầu l), làm đoạn [1, 10] lên đầu tiên và che phủ sạch mọi đoạn sau. Truyền comparator cmpByEnd giúp sắp tăng dần theo .second (điểm kết thúc r) và cho đáp án đúng 2!'
      },
      {
        id: 'dbg_l205_stick_max_heap',
        title: 'Dùng Nhầm Max-Heap Mặc Định Thay Cho Min-Heap Khi Nối Dây (WA)',
        description: 'Chương trình tính tổng chi phí nhỏ nhất để gộp n đoạn dây (kiểu Stick Divisions). Với n = 4 và các đoạn {2, 3, 3, 4}, đáp án tối ưu là 24, nhưng tác giả quên tham số greater khiến priority_queue trở thành Max-Heap và in ra 29!',
        failingInput: '4\n2 3 3 4',
        failingOutput: '29',
        expectedOutput: '24',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    priority_queue<long long> pq;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        pq.push(x);
    }
    long long totalCost = 0;
    while ((int)pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        long long merged = a + b;
        totalCost += merged;
        pq.push(merged);
    }
    cout << totalCost << '\\n';
    return 0;
}`,
        bugLine: 9,
        patches: [
          { text: 'Đổi dòng 9 thành queue<long long> pq;' },
          { text: 'Đổi dòng 15 thành long long totalCost = 1;' },
          { text: 'Đổi dòng 9 thành priority_queue<long long, vector<long long>, greater<long long>> pq;' }
        ],
        correctPatch: 2,
        explain: 'Ở dòng 9, priority_queue&lt;long long&gt; mặc định là Max-Heap nên luôn rút hai sợi DÀI NHẤT (4 + 3 = 7, 7 + 3 = 10, 10 + 2 = 12) cho tổng 29! Phải khai báo đủ 3 tham số với greater&lt;long long&gt; để tạo Min-Heap luôn rút hai sợi ngắn nhất.'
      },
      {
        id: 'dbg_l205_tasks_sort_deadline',
        title: 'Xếp Công Việc Theo Hạn Chót d Thay Vì Thời Lượng a Trong Tasks &amp; Deadlines (WA)',
        description: 'Chương trình tìm tổng điểm thưởng (d_i - f_i) lớn nhất cho n công việc. Với 3 việc {(6, 15), (2, 10), (4, 20)}, đáp án tối ưu là 25, nhưng code lại sắp xếp theo hạn chót d tăng dần nên chỉ đạt 23!',
        failingInput: '3\n6 15\n2 10\n4 20',
        failingOutput: '23',
        expectedOutput: '25',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

struct Task { long long a, d; };

bool cmpByDuration(const Task& x, const Task& y) {
    if (x.a != y.a) return x.a < y.a;
    return x.d < y.d;
}

bool cmpByDeadline(const Task& x, const Task& y) {
    if (x.d != y.d) return x.d < y.d;
    return x.a < y.a;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    vector<Task> tasks(n);
    for (int i = 0; i < n; i++) cin >> tasks[i].a >> tasks[i].d;
    sort(tasks.begin(), tasks.end(), cmpByDeadline);
    long long curTime = 0, totalReward = 0;
    for (int i = 0; i < n; i++) {
        curTime += tasks[i].a;
        totalReward += tasks[i].d - curTime;
    }
    cout << totalReward << '\\n';
    return 0;
}`,
        bugLine: 23,
        patches: [
          { text: 'Đổi dòng 23 thành sort(tasks.begin(), tasks.end(), cmpByDuration);' },
          { text: 'Đổi dòng 27 thành totalReward += curTime - tasks[i].d;' },
          { text: 'Đổi dòng 26 thành curTime = tasks[i].d;' }
        ],
        correctPatch: 0,
        explain: 'Theo chứng minh Exchange Argument ở Phần 2, tổng phần thưởng sum(d_i) - sum(f_i) chỉ phụ thuộc vào việc tối thiểu hóa tổng thời điểm hoàn thành sum(f_i), tức phải sắp xếp theo thời lượng a tăng dần (cmpByDuration) ở dòng 23 chứ không phải hạn chót d!'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — L2-05)
    // ============================================================================
    practiceProblems: [
      {
        id: 'CF-160A',
        title: '160A - Twins',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/160/A',
        hint: 'Giới hạn $1 \\le n \\le 100$, $1 \\le a_i \\le 100$, TL 2.0s, ML 256 MB. Tính tổng <code>total</code> toàn bộ đồng xu, sắp xếp mảng <code>a</code> giảm dần bằng <code>sort(a.rbegin(), a.rend())</code> rồi lấy lần lượt từ đồng lớn nhất cho tới khi <code>mySum &gt; total - mySum</code>.'
      },
      {
        id: 'CSES-1629',
        title: 'Movie Festival',
        judge: 'CSES',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1629',
        hint: 'Giới hạn $1 \\le n \\le 2 \\cdot 10^5$, $1 \\le a &lt; b \\le 10^9$, TL 1.00s, ML 512 MB. Khuôn mẫu <strong>Activity Selection</strong> kinh điển: lưu các cặp <code>(a, b)</code>, sắp tăng dần theo thời điểm kết thúc <code>b</code> rồi chọn mọi phim có <code>a &gt;= lastEnd</code> (cập nhật <code>lastEnd = b</code>).'
      },
      {
        id: 'CF-545D',
        title: '545D - Queue',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/545/D',
        hint: 'Giới hạn $1 \\le n \\le 10^5$, $1 \\le t_i \\le 10^9$, TL 1.0s, ML 256 MB. Sắp xếp thời gian phục vụ <code>t</code> tăng dần. Giữ biến tổng thời gian chờ <code>waitSum</code> (kiểu <code>long long</code>): nếu <code>waitSum &lt;= t[i]</code> thì phục vụ người này (<code>cnt++; waitSum += t[i];</code>), còn ai không kịp thì đẩy xuống cuối hàng để không làm chậm người khác.'
      },
      {
        id: 'CSES-1090',
        title: 'Ferris Wheel',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1090',
        hint: 'Giới hạn $1 \\le n \\le 2 \\cdot 10^5$, $1 \\le x \\le 10^9$, $1 \\le p_i \\le x$, TL 1.00s, ML 512 MB. Sắp cân nặng tăng dần rồi ghép hai đầu <code>l = 0, r = n - 1</code>: nếu <code>l &lt; r &amp;&amp; p[l] + p[r] &lt;= x</code> thì cho <code>l</code> đi chung với <code>r</code> (<code>l++</code>), còn không <code>r</code> đi một mình (<code>r--</code>, tăng số cabin).'
      },
      {
        id: 'CSES-1630',
        title: 'Tasks and Deadlines',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1630',
        hint: 'Giới hạn $1 \\le n \\le 2 \\cdot 10^5$, $1 \\le a, d \\le 10^6$, TL 1.00s, ML 512 MB. Áp dụng thẳng chứng minh <strong>Exchange Argument</strong> ở Phần 2: tổng thưởng $\\sum (d_i - f_i) = \\sum d_i - \\sum f_i$ không phụ thuộc vào $d_i$ khi sắp thứ tự! Chỉ cần sắp tăng dần theo thời lượng <code>a</code> và cộng dồn bằng <code>long long</code>.'
      },
      {
        id: 'ABC131-D',
        title: 'D - Megalomania',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc131/tasks/abc131_d',
        hint: 'Giới hạn $1 \\le N \\le 2 \\times 10^5$, $1 \\le A_i, B_i \\le 10^9$, TL 2.0s, ML 1024 MB. Khác với bài cộng dồn thưởng, ở đây bạn phải hoàn thành <strong>tất cả</strong> việc trước hạn $B_i$: theo Exchange Argument (Earliest Deadline First), hãy sắp việc tăng dần theo hạn chót <code>B_i</code>, cộng dồn thời gian <code>cur += A_i</code> (<code>long long</code>) và kiểm tra <code>cur &lt;= B_i</code> ở mọi bước.'
      },
      {
        id: 'CSES-1161',
        title: 'Stick Divisions',
        judge: 'CSES',
        tier: 3,
        link: 'https://cses.fi/problemset/task/1161',
        hint: 'Giới hạn $1 \\le x \\le 10^9$, $1 \\le n \\le 2 \\cdot 10^5$, $\\sum d_i = x$, TL 1.00s, ML 512 MB. Đảo ngược quá trình cắt thành gộp các khúc $d_i$ lại thành khúc dài $x$: nạp toàn bộ $d_i$ vào <strong>Min-Heap</strong> <code>priority_queue&lt;long long, vector&lt;long long&gt;, greater&lt;long long&gt;&gt;</code>, lặp khi <code>size() &gt; 1</code> rút 2 đoạn ngắn nhất cộng vào đáp án <code>long long</code> và đẩy tổng trở lại heap.'
      },
      {
        id: 'CF-1526C2',
        title: '1526C2 - Potions (Hard Version)',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/1526/C2',
        hint: 'Giới hạn $1 \\le n \\le 2 \\cdot 10^5$, $-10^9 \\le a_i \\le 10^9$, TL 1.0s, ML 256 MB. Kỹ thuật <strong>Tham lam biết sửa sai (Regret Greedy)</strong> cực đẹp với Min-Heap (không cần DP!): đi từ trái sang phải, tạm thời cứ uống mọi lọ thuốc <code>a[i]</code> (cộng vào <code>health</code> kiểu <code>long long</code> và đẩy vào Min-Heap); hễ <code>health &lt; 0</code>, lập tức nôn bỏ lọ thuốc <em>âm nhất</em> từng uống ở đỉnh Min-Heap (<code>health -= pq.top(); pq.pop();</code>)!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
