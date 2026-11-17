/**
 * DỮ LIỆU BÀI GIẢNG L1-06: BỘ CÔNG CỤ STL (SET, MAP, PRIORITY_QUEUE, DEQUE)
 * Tầng 1 — Pha 2 STL Lớp 9 (Nối tiếp từ L1-05)
 * Mở khóa: std::set, std::multiset (s.lower_bound vs std::lower_bound, ms.erase(x) vs ms.erase(ms.find(x))),
 * std::map (khóa lớn 10^9 / string, bẫy tạo khóa rác mp[x], tránh anti-hash unordered_map),
 * std::priority_queue (Max-Heap & Min-Heap greater<T>) và std::deque (hàng đợi hai đầu O(1)).
 * Không giả định kiến thức chưa học: Prefix Sums (L2-01), Binary Search trên mảng/đáp án (L2-02),
 * Stack/Queue/BFS (L2-03), Backtracking (L2-04), Two Pointers (MOD-03), hay DP (L2-06+).
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'stl_tra_cuu_hang_doi',
    number: 'Bài Học L1-06',
    shortTitle: 'set, map, PQ & deque',
    title: 'Bài L1-06: Bộ Công Cụ STL (set, map, priority_queue, deque)',
    lead: 'Nâng cấp từ sắp xếp tĩnh của L1-05 sang xử lý dữ liệu biến động liên tục: giữ trật tự và tra cứu trong $O(\\log N)$ với set/multiset, đếm khóa khổng lồ tới $10^9$ không tốn RAM thừa với map, né bẫy anti-hash $O(N^2)$ của unordered_map, cùng priority_queue (Heap) và deque hai đầu $O(1)$.',
    modules: [
      // ============================================================================
      // MODULE 1: STD::SET & STD::MULTISET — TỦ HỒ SƠ TỰ SẮP XẾP O(LOG N)
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'set & multiset O(log N)',
        title: 'Vấn Đề Nhỏ 1: std::set, std::multiset &amp; Hai Cạm Bẫy Kinh Điển',
        lead: 'Cách duy trì tập hợp luôn sắp xếp tăng dần qua từng truy vấn thêm/xóa trong $O(\\log N)$, gọi đúng s.lower_bound(x) để tránh TLE $O(N)$, và phân biệt ms.erase(x) xóa sạch mọi bản sao với ms.erase(ms.find(x)) chỉ xóa đúng 1 phần tử.',
        subproblem: {
          title: 'Khi $Q = 10^5$ người chơi liên tục vào và rời phòng, làm sao luôn tìm được đối thủ có Elo $\\ge X$ nhỏ nhất trong $O(\\log N)$ và xóa đúng 1 tấm vé khi có nhiều vé trùng giá?',
          desc: 'Nếu dùng vector rồi gọi sort() sau mỗi lượt thêm/xóa thì tốn $O(Q \\cdot N \\log N)$ (TLE!). Ta dùng std::set (loại trùng) hoặc std::multiset (cho phép trùng) để thêm, xóa và tra cứu trực tiếp trong $O(\\log N)$.'
        },
        cards: [
          {
            heading: 'std::set&lt;T&gt; &amp; s.lower_bound(x) — Tủ Hồ Sơ Tự Xếp Thứ Tự $O(\\log N)$',
            tag: 'Loại trùng & Tra cứu nhanh',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Ở <code>L1-05</code>, khi danh sách cố định ta nhập hết vào <code>vector</code> rồi gọi <code>sort()</code> một lần. Nhưng nếu hồ sơ ra vào liên tục $Q = 10^5$ lần, xếp lại toàn bộ tủ mỗi lượt sẽ chậm tới <strong>$O(Q \\cdot N \\log N)$ &rarr; TLE</strong>!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Tủ hồ sơ tự sắp xếp <code>std::set&lt;T&gt;</code>:</strong> Hễ nhét một số vào (<code>insert</code>), tủ tự xếp ngay ngắn theo thứ tự tăng dần và tự bỏ qua nếu số đó đã tồn tại. Số nhỏ nhất luôn nằm đầu (<code>*s.begin()</code>), số lớn nhất luôn nằm cuối (<code>*s.rbegin()</code>), thêm/xóa/tìm đều chỉ mất <strong>$O(\\log N)$</strong> (~17 bước với $10^5$ phần tử).</li>
                  <li><strong>Không đánh số kiểu <code>s[i]</code>:</strong> Các ngăn tủ nằm rải rác trên cây chứ không nối liền như <code>vector</code>, nên chỉ tiến/lùi từng bước bằng iterator (<code>++it</code>, <code>--it</code>).</li>
                  <li><strong>Cảnh báo bẫy TLE <code>std::lower_bound(s.begin(), s.end(), x)</code>:</strong> Hàm <code>std::lower_bound(...)</code> bên ngoài không nhảy thẳng vào giữa tủ được mà phải đi bộ từng bước từ đầu tới cuối tốn <strong>$O(N)$</strong>! Phải gọi phương thức riêng của tủ là <strong><code>s.lower_bound(x)</code></strong> (tìm số đầu tiên $\\ge x$) hoặc <strong><code>s.upper_bound(x)</code></strong> (tìm số đầu tiên $&gt; x$) để chạy đúng <strong>$O(\\log N)$</strong>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    set&lt;int&gt; s = {30, 10, 30, 50, 20}; // Tự loại trùng -&gt; {10, 20, 30, 50}
    s.insert(25);
    s.erase(20); // Còn {10, 25, 30, 50}

    // ĐÚNG: Gọi phương thức của set -&gt; O(log N)!
    // CẤM viết std::lower_bound(s.begin(), s.end(), 22) vì sẽ chạy O(N) TLE!
    auto it = s.lower_bound(22); // Phần tử đầu tiên &gt;= 22 -&gt; 25
    cout &lt;&lt; "Min = " &lt;&lt; *s.begin() &lt;&lt; ", Max = " &lt;&lt; *s.rbegin() &lt;&lt; '\\n';
    if (it != s.end()) {
        cout &lt;&lt; "So &gt;= 22 nho nhat: " &lt;&lt; *it &lt;&lt; '\\n';
    }

    // Tìm số &lt;= 22 lớn nhất: lấy upper_bound(22) rồi lùi 1 bước nếu it2 != s.begin()
    auto it2 = s.upper_bound(22);
    if (it2 != s.begin()) {
        --it2;
        cout &lt;&lt; "So &lt;= 22 lon nhat: " &lt;&lt; *it2 &lt;&lt; '\\n';
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>std::set&lt;T&gt;</code> (Tập hợp có thứ tự):</strong> Cấu trúc cây tìm kiếm nhị phân cân bằng luôn loại bỏ trùng lặp và giữ thứ tự tăng dần; <code>insert</code>, <code>erase</code>, <code>find</code>, <code>count</code>, <code>s.lower_bound</code>, <code>s.upper_bound</code> chạy trong $O(\\log N)$.</li>
                  <li><strong><code>s.lower_bound(x)</code> vs <code>s.upper_bound(x)</code>:</strong> <code>lower_bound(x)</code> trả về vị trí đầu tiên $\\ge x$, còn <code>upper_bound(x)</code> trả về vị trí đầu tiên $&gt; x$ (trả về <code>s.end()</code> nếu không có).</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'std::multiset&lt;T&gt; &amp; Bẫy Kinh Điển ms.erase(x) vs ms.erase(ms.find(x))',
            tag: 'Bẫy xóa sạch bản sao',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Trong bài toán bán vé ca nhạc, quầy có <strong>3 tấm vé cùng mệnh giá 20</strong>. Nếu bỏ vào <code>set&lt;int&gt;</code>, 3 vé gộp lại chỉ còn 1 vé! Ta phải dùng <strong><code>std::multiset&lt;int&gt;</code></strong> để giữ nguyên cả 3 tấm vé mà vẫn xếp tăng dần trong $O(\\log N)$.</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cạm bẫy chết người <code>ms.erase(20)</code>:</strong> Khi một khách đầu tiên mua đúng 1 vé giá 20, nếu bạn gọi <code>ms.erase(20)</code> (truyền <em>giá trị</em>), nhân viên tủ hiểu là <em>"Vứt sạch toàn bộ hồ sơ mang giá 20!"</em> &rarr; cả <strong>3 tấm vé</strong> biến mất sạch trơn, hai khách sau mất vé oan (<strong>Wrong Answer!</strong>).</li>
                  <li><strong>Cách rút đúng 1 tấm vé:</strong> Trước tiên tìm địa chỉ của một tấm vé giá 20 bằng <code>auto it = ms.find(20);</code>. Kiểm tra thấy còn vé (<code>if (it != ms.end())</code>) thì mới truyền <em>địa chỉ</em> vào <code>ms.erase(it);</code> &rarr; tủ chỉ xóa <strong>đúng 1 tấm</strong> tại địa chỉ đó, giữ nguyên 2 tấm còn lại!</li>
                  <li><strong>Mẹo tránh TLE trên <code>ms.count(x)</code>:</strong> Nếu một số xuất hiện tới $K$ lần, <code>ms.count(x)</code> chạy mất $O(\\log N + K)$; khi chỉ cần kiểm tra xem có mặt hay không, hãy dùng <code>ms.find(x) != ms.end()</code> luôn chuẩn $O(\\log N)$!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Phân biệt ms.erase(ms.find(x)) và ms.erase(x)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    multiset&lt;int&gt; ms = {10, 20, 20, 20, 30};

    // ĐÚNG: Tìm iterator rồi xóa theo iterator -&gt; chỉ mất ĐÚNG 1 số 20!
    auto it = ms.find(20);
    if (it != ms.end()) {
        ms.erase(it); // Còn {10, 20, 20, 30}
    }
    cout &lt;&lt; "Sau erase(it), so 20 con lai: " &lt;&lt; ms.count(20) &lt;&lt; '\\n';

    // NGUY HIỂM: Xóa theo giá trị -&gt; xóa SẠCH mọi bản sao bằng 20!
    ms.erase(20); // Chỉ còn {10, 30}
    cout &lt;&lt; "Sau erase(20), so 20 con lai: " &lt;&lt; ms.count(20)
         &lt;&lt; ", size = " &lt;&lt; (int)ms.size() &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>std::multiset&lt;T&gt;</code> (Đa tập hợp có thứ tự):</strong> Giống <code>std::set</code> nhưng cho phép lưu nhiều bản sao có giá trị bằng nhau, giữ nguyên thứ tự tăng dần.</li>
                  <li><strong><code>ms.erase(val)</code> vs <code>ms.erase(it)</code>:</strong> Truyền giá trị <code>val</code> sẽ xóa mọi phần tử bằng <code>val</code> trong $O(\\log N + k)$; truyền iterator <code>it</code> (từ <code>ms.find(val)</code> sau khi đã kiểm tra <code>it != ms.end()</code>) chỉ xóa đúng 1 phần tử tại vị trí đó.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_multiset_erase_trap',
            title: 'Phòng Thí Nghiệm 1: Bẫy ms.erase(20) Xóa Sạch Bản Sao vs ms.erase(ms.find(20))',
            desc: 'Kho vé ban đầu có 3 vé mệnh giá 20 (ms = {10, 20, 20, 20, 30}). Khách đầu tiên chỉ mua 1 vé giá 20. Bật công tắc để xem số vé còn lại khi xóa bằng iterator so với xóa trực tiếp theo giá trị!',
            toggles: [
              {
                key: 'eraseMode',
                label: 'Lệnh xóa vé giá 20 trên multiset',
                options: [
                  { value: 'by_it', text: 'ms.erase(ms.find(20)) — Xóa đúng 1 vé', kind: 'ok' },
                  { value: 'by_val', text: 'ms.erase(20) — Xóa theo giá trị (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.eraseMode === 'by_it';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    multiset<int> ms = {10, 20, 20, 20, 30};
    auto it = ms.find(20);
    if (it != ms.end()) ms.erase(it); // ĐÚNG: chỉ xóa 1 vé giá 20
    cout << "So ve gia 20 con lai: " << ms.count(20) << '\\n';
    cout << "Tong so ve con lai  : " << (int)ms.size() << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    multiset<int> ms = {10, 20, 20, 20, 30};
    ms.erase(20); // BẪY WA: xóa SẠCH mọi vé có giá 20!
    cout << "So ve gia 20 con lai: " << ms.count(20) << '\\n';
    cout << "Tong so ve con lai  : " << (int)ms.size() << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [8, 9] : [8],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Còn đúng 2 vé giá 20 và tổng 4 vé sau khi bán 1 vé!'
                  : 'SAI THUẬT TOÁN (WA): ms.erase(20) đã xóa bay cả 3 vé giá 20, tổng chỉ còn 2 vé!',
                predictions: [
                  { text: 'Chương trình in còn 2 vé giá 20 và tổng còn 4 vé đúng như thực tế bán 1 vé' },
                  { text: 'Chương trình xóa sạch toàn bộ vé giá 20 khiến số vé giá 20 tụt về 0 và tổng chỉ còn 2' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nSo ve gia 20 con lai: 2\nTong so ve con lai  : 4'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nSo ve gia 20 con lai: 0\nTong so ve con lai  : 2',
                explain: isOk
                  ? 'Hàm ms.find(20) trả về iterator trỏ tới đúng một bản sao của giá trị 20. Sau khi kiểm tra it != ms.end(), lệnh ms.erase(it) chỉ gỡ bỏ duy nhất bản sao đó.'
                  : 'Khi truyền trực tiếp giá trị 20 vào ms.erase(20), multiset xóa toàn bộ mọi phần tử có giá trị bằng 20 trong cây, làm mất luôn 2 vé còn lại!'
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
    set<int> s = {40, 10, 30, 20, 30};
    s.erase(20);
    auto it1 = s.lower_bound(25);
    auto it2 = s.upper_bound(30);
    --it2;
    cout << (int)s.size() << ' ' << *it1 << ' ' << *it2 << '\\n';
    return 0;
}`,
            q: 'Theo dõi các thao tác trên <code>set&lt;int&gt; s</code> trong đoạn code trên. Ba số được in ra là gì?',
            options: [
              'In ra 4 30 40 vì lower_bound(25) tìm 30 còn upper_bound(30) lùi về 40',
              'In ra 3 30 30 vì set loại trùng 30, xóa 20, và --it2 lùi về đúng số 30',
              'In ra 3 40 30 vì lower_bound(25) bỏ qua 30 và lấy phần tử tiếp theo 40',
              'In ra 4 30 30 vì set giữ lại cả hai số 30 trước khi thực hiện lệnh xóa 20'
            ],
            correct: 1,
            explain: 'set tự loại trùng 30 thành {10, 20, 30, 40}. Sau s.erase(20) còn {10, 30, 40} (size = 3). s.lower_bound(25) tìm phần tử $\\ge 25$ là 30. s.upper_bound(30) tìm phần tử $&gt; 30$ là 40, lùi 1 bước --it2 về 30. In ra: 3 30 30.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    multiset<int> ms = {15, 15, 15, 30, 30};
    auto it = ms.find(15);
    if (it != ms.end()) ms.erase(it);
    ms.erase(30);
    cout << ms.count(15) << ' ' << ms.count(30) << ' ' << (int)ms.size() << '\\n';
    return 0;
}`,
            q: 'Quan sát sự khác biệt giữa <code>ms.erase(it)</code> và <code>ms.erase(30)</code> trên <code>multiset&lt;int&gt;</code>. Kết quả in ra là gì?',
            options: [
              'In ra 0 2 2 vì ms.erase(it) xóa sạch các số 15 còn ms.erase(30) giữ một số',
              'In ra 2 1 3 vì cả hai lệnh xóa đều chỉ loại bỏ đúng một bản sao tương ứng',
              'In ra 0 0 0 vì gọi ms.erase trên multiset luôn xóa sạch toàn bộ thùng chứa',
              'In ra 2 0 2 vì erase(it) xóa đúng 1 số 15 còn erase(30) xóa sạch mọi số 30'
            ],
            correct: 3,
            explain: 'ms.erase(it) chỉ xóa đúng 1 số 15 nên còn 2 số 15. Ngược lại, ms.erase(30) truyền giá trị nên xóa sạch cả hai số 30 (còn 0). Tổng size còn 2. Kết quả: 2 0 2.'
          },
          {
            type: 'single',
            q: 'Với tập <code>set&lt;int&gt; s</code> có $N = 10^5$ phần tử và $Q = 10^5$ truy vấn tìm cận dưới, vì sao bắt buộc gọi <code>s.lower_bound(x)</code> thay vì <code>std::lower_bound(s.begin(), s.end(), x)</code>?',
            options: [
              'Vì s.lower_bound(x) nhảy theo cây trong O(log N), còn std::lower_bound đi bộ tuần tự O(N)',
              'Vì hàm std::lower_bound toàn cục không thể biên dịch được khi truyền iterator của set',
              'Vì s.lower_bound(x) tự động xóa luôn phần tử vừa tìm thấy ngay sau khi trả về kết quả',
              'Vì hàm std::lower_bound toàn cục luôn trả về phần tử lớn nhất thay vì phần tử &gt;= x'
            ],
            correct: 0,
            explain: 'Iterator của set không hỗ trợ nhảy ngẫu nhiên $O(1)$ như vector. Vì vậy std::lower_bound(s.begin(), s.end(), x) phải duyệt từng bước mất $O(N)$ mỗi truy vấn ($O(Q \\cdot N)$ TLE), còn s.lower_bound(x) đi thẳng theo cây Đỏ-Đen mất đúng $O(\\log N)$.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về <code>std::set</code> và <code>std::multiset</code>?',
            options: [
              'Mọi thao tác insert, find và s.lower_bound(x) trên set đều đạt độ phức tạp O(log N)',
              'Có thể viết s[0] hoặc s.begin() + 2 để lấy phần tử trên set nhanh như vector',
              'Trên multiset, viết ms.erase(ms.find(x)) sau khi kiểm tra khác end() chỉ xóa đúng 1 bản sao',
              'Trước khi giảm --it sau lệnh upper_bound, ta không cần kiểm tra it != s.begin()'
            ],
            correct: [0, 2],
            explain: 'A và C đúng. B sai vì set không có truy cập chỉ số s[i] hay cộng iterator + k. D sai vì nếu it == s.begin() mà vẫn gọi --it sẽ lùi ra ngoài biên gây lỗi UB/RE nghiêm trọng.'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: STD::MAP & BẪY ANTI-HASH UNORDERED_MAP
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'map & Anti-Hash',
        title: 'Vấn Đề Nhỏ 2: std::map, Bẫy Khóa Rác mp[x] &amp; Anti-Hash unordered_map',
        lead: 'Dùng std::map để đếm và ánh xạ khóa số lớn tới $10^9$ hoặc chuỗi string trong $O(\\log N)$, né bẫy tạo khóa rác của toán tử mp[x], và hiểu vì sao Codeforces dễ đánh sập unordered_map xuống $O(N^2)$ TLE.',
        subproblem: {
          title: 'Khi cần đếm tần suất hoặc lưu điểm theo khóa lên tới $10^9$ hoặc xâu ký tự string qua $10^5$ truy vấn, làm sao không bị tràn bộ nhớ MLE, không sinh khóa rác và không chết TLE vì anti-hash?',
          desc: 'Mảng đếm tĩnh cnt[$10^9$] bị MLE (4 GB), còn unordered_map dễ bị test anti-hash đánh sập thành $O(N^2)$. Ta dùng std::map&lt;Key, Value&gt; chạy đảm bảo $O(N \\log N)$ và kiểm tra tồn tại sạch bằng .count() / .find().'
        },
        cards: [
          {
            heading: 'std::map&lt;Key, Value&gt; — Từ Điển Ánh Xạ Cho Khóa $10^9$ &amp; string',
            tag: 'Ánh xạ khóa bất kỳ',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Ở <code>L1-02</code>, ta dùng mảng đếm tần suất <code>cnt[x]++</code> khi <code>x</code> nhỏ ($\\le 10^6$). Nhưng nếu dãy số có giá trị tới <strong>$10^9$</strong> hoặc khóa là <strong>tên người dùng <code>string</code></strong>, ta không thể mở một tủ sắt $10^9$ ngăn (tốn 4 GB RAM &rarr; <strong>MLE!</strong>).</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cuốn sổ từ điển <code>std::map&lt;Key, Value&gt;</code>:</strong> Thay vì xây trước $10^9$ ngăn trống, ta chỉ ghi đúng những khóa thật sự xuất hiện theo cặp <code>(Khóa, Giá trị)</code>. Từ điển luôn tự sắp xếp tăng dần theo <code>Key</code>, mọi thao tác thêm/sửa/tra đều tốn <strong>$O(\\log N)$</strong>!</li>
                  <li><strong>Duyệt toàn bộ từ điển bằng <code>const auto&amp;</code>:</strong> Khi duyệt <code>for (const auto&amp; p : mp)</code>, <code>p.first</code> là khóa và <code>p.second</code> là giá trị; dấu <code>&amp;</code> giúp không sao chép thừa khi khóa là <code>string</code> dài.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Đếm tần suất khóa $10^9$ và chuỗi string trong C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;long long&gt; a = {1000000000LL, 7, 1000000000LL, 3, 7};
    map&lt;long long, int&gt; freq;
    for (long long x : a) {
        freq[x]++; // O(log N) mỗi lượt, không cần mảng 10^9!
    }

    // Map tự xếp theo khóa tăng dần: 3, 7, 1000000000
    for (const auto&amp; p : freq) {
        cout &lt;&lt; p.first &lt;&lt; ": " &lt;&lt; p.second &lt;&lt; '\\n';
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>std::map&lt;Key, Value&gt;</code> (Từ điển ánh xạ có thứ tự):</strong> Cấu trúc lưu cặp <code>(Key, Value)</code> với khóa duy nhất xếp tăng dần trên cây Đỏ-Đen; tra cứu và cập nhật tốn $O(\\log N)$ và bộ nhớ chỉ $O(\\text{số khóa khác nhau})$.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Bẫy Tạo Khóa Rác mp[x] &amp; Bẫy Anti-Hash $O(N^2)$ Của unordered_map',
            tag: 'Bẫy RAM & TLE Codeforces',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Hai bẫy khiến code map đúng logic nhưng vẫn WA hoặc TLE</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bẫy 1 — Viết <code>if (mp[x] == 0)</code> tự sinh khóa rác:</strong> Toán tử ngoặc vuông <code>mp[x]</code> có luật ngầm: hễ khóa <code>x</code> chưa có trong từ điển, nó <strong>tự động chèn thêm dòng rác <code>(x, 0)</code></strong> rồi mới trả về <code>0</code>! Nếu chỉ hỏi thăm qua $10^5$ số lạ, <code>mp</code> bị phình to gấp bội, sai sạch <code>mp.size()</code> và tốn RAM. Khi <strong>chỉ kiểm tra tồn tại</strong>, bắt buộc viết <strong><code>mp.count(x)</code></strong> hoặc <strong><code>mp.find(x) != mp.end()</code></strong>!</li>
                  <li><strong>Bẫy 2 — Tin vào <code>unordered_map</code> trên Codeforces (Anti-Hash $O(N^2)$ TLE):</strong> <code>unordered_map</code> không sắp xếp khóa mà dùng bảng băm chia ngăn để đạt $O(1)$ trung bình. Nhưng trên Codeforces luôn có những bộ test <em>"anti-hash"</em> gài sẵn các số cùng chui vào chung một ngăn băm! Lúc đó mỗi lần tra cứu phải quét cả chuỗi dài $O(N)$, khiến tổng thời gian vọt lên <strong>$O(N^2)$ &rarr; TLE chắc chắn</strong>! Hãy mặc định dùng <strong><code>std::map</code></strong> để luôn giữ vững tốc độ $O(N \\log N)$ an toàn tuyệt đối.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Kiểm tra sạch với count()/find() và đăng ký tài khoản bằng std::map</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    map&lt;string, int&gt; db;
    vector&lt;string&gt; req = {"an", "binh", "an", "an"};
    for (const string&amp; name : req) {
        // Dùng .count(name) để kiểm tra mà không tự sinh khóa rác
        if (db.count(name) == 0) {
            cout &lt;&lt; "OK" &lt;&lt; '\\n';
            db[name] = 1;
        } else {
            cout &lt;&lt; name &lt;&lt; db[name] &lt;&lt; '\\n';
            db[name]++;
        }
    }
    cout &lt;&lt; "Tong tai khoan goc: " &lt;&lt; (int)db.size() &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Tạo khóa mặc định (<code>Default Insertion</code> của <code>mp[k]</code>):</strong> Hành vi tự chèn <code>(k, 0)</code> vào <code>map</code> khi truy cập <code>mp[k]</code> với khóa <code>k</code> chưa có; khắc phục hoàn toàn bằng <code>mp.count(k)</code> hoặc <code>mp.find(k)</code>.</li>
                  <li><strong>Xung đột băm (<code>Hash Collision</code>) &amp; Test Anti-Hash:</strong> Hiện tượng hàng loạt khóa khác nhau rơi vào chung 1 bucket của <code>unordered_map</code>, kéo sụp hiệu năng từ $O(1)$ xuống $O(N)$ mỗi lượt ($O(N^2)$ tổng thể &rarr; <strong>TLE</strong>).</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_map_junk_key',
            title: 'Phòng Thí Nghiệm 2: Kiểm Tra Bằng mp.count(x) vs Bẫy Tạo Khóa Rác mp[x]',
            desc: 'Từ điển ban đầu chỉ có 2 bạn ("An", "Binh"). Ta thực hiện 3 truy vấn chỉ để HỎI THĂM xem 3 tên lạ ("Chi", "Dung", "Hoa") đã có tên trong sổ chưa. Xem kích thước thật của map biến đổi ra sao!',
            toggles: [
              {
                key: 'checkMode',
                label: 'Cách kiểm tra sự tồn tại của khóa lạ',
                options: [
                  { value: 'use_count', text: 'mp.count(ten) == 0 — Sạch, không tạo rác', kind: 'ok' },
                  { value: 'use_bracket', text: 'mp[ten] == 0 — Tự chèn khóa rác vào map!', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.checkMode === 'use_count';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    map<string, int> mp = {{"An", 90}, {"Binh", 85}};
    vector<string> hoi = {"Chi", "Dung", "Hoa"};
    int chuaCo = 0;
    for (const string& s : hoi) {
        if (mp.count(s) == 0) chuaCo++; // ĐÚNG: Chỉ đọc, KHÔNG chèn thêm khóa!
    }
    cout << "So ten chua co: " << chuaCo << ", mp.size() = " << (int)mp.size() << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    map<string, int> mp = {{"An", 90}, {"Binh", 85}};
    vector<string> hoi = {"Chi", "Dung", "Hoa"};
    int chuaCo = 0;
    for (const string& s : hoi) {
        if (mp[s] == 0) chuaCo++; // BẪY: mp[s] tự chèn (s, 0) vào map!
    }
    cout << "So ten chua co: " << chuaCo << ", mp.size() = " << (int)mp.size() << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [11],
                statusOk: isOk,
                statusText: isOk
                  ? 'SẠCH SẼ (AC): mp.size() vẫn giữ nguyên là 2, không sinh thêm bất kỳ khóa rác nào!'
                  : 'PHÌNH BỘ NHỚ (BẪY RÁC): mp.size() nhảy từ 2 lên 5 vì 3 khóa rác ("Chi", "Dung", "Hoa") vừa bị tự động chèn vào!',
                predictions: [
                  { text: 'mp.size() giữ nguyên bằng 2 vì mp.count(s) chỉ tra cứu chứ không ghi thêm dữ liệu vào map' },
                  { text: 'mp.size() tăng vọt lên 5 vì mỗi lần gọi mp[s] trên khóa lạ đều tự động chèn thêm (s, 0)' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nSo ten chua co: 3, mp.size() = 2'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nSo ten chua co: 3, mp.size() = 5',
                explain: isOk
                  ? 'Phương thức mp.count(s) (hoặc mp.find(s) != mp.end()) chỉ đọc cấu trúc cây của map trong $O(\\log N)$, tuyệt đối không làm thay đổi nội dung hay kích thước của map.'
                  : 'Toán tử mp[s] luôn đảm bảo trả về một ô nhớ có thể gán được; nếu s chưa có, map tự tạo mới cặp (s, 0). Làm vậy qua $10^5$ truy vấn sẽ ngốn RAM và làm sai kết quả dựa trên mp.size()!'
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
    map<string, int> mp;
    mp["lan"] = 5;
    if (mp.count("mai") == 0) mp["hoa"] = 8;
    if (mp["cuc"] == 0) mp["lan"] += 2;
    cout << (int)mp.size() << ' ' << mp["lan"] << ' ' << mp["cuc"] << '\\n';
    return 0;
}`,
            q: 'Chú ý hành vi của <code>mp.count("mai")</code> và <code>mp["cuc"]</code> trong đoạn code trên. Ba số được in ra là gì?',
            options: [
              'In ra 2 7 0 vì chỉ có "lan" và "hoa" được gán giá trị trực tiếp còn "cuc" không lưu',
              'In ra 4 7 0 vì các khóa "mai", "hoa", "cuc" đều bị chèn thêm vào bên cạnh "lan"',
              'In ra 3 7 0 vì mp.count("mai") không tạo khóa, còn mp["cuc"] tự tạo ("cuc", 0)',
              'In ra 3 5 0 vì điều kiện if (mp["cuc"] == 0) sai nên lệnh tăng mp["lan"] bị bỏ qua'
            ],
            correct: 2,
            explain: 'Ban đầu có {"lan": 5}. mp.count("mai") == 0 trả về true nhưng KHÔNG tạo khóa "mai", sau đó thêm {"hoa": 8}. Khi kiểm tra mp["cuc"] == 0, ngoặc vuông tự tạo thêm {"cuc": 0} rồi điều kiện đúng nên mp["lan"] thành 7. Tổng cộng có 3 khóa ("cuc", "hoa", "lan"). In ra: 3 7 0.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    map<int, int> cnt;
    vector<int> a = {1000000000, 2, 1000000000, 2, 2, 4};
    for (int x : a) cnt[x]++;
    int xoa = 0;
    for (const auto& p : cnt) {
        if (p.second < p.first) xoa += p.second;
        else xoa += p.second - p.first;
    }
    cout << (int)cnt.size() << ' ' << xoa << '\\n';
    return 0;
}`,
            q: 'Đoạn code trên đếm số phần tử cần xóa tối thiểu để mọi số $x$ còn lại xuất hiện đúng $x$ lần. Kết quả in ra là gì?',
            options: [
              'In ra 3 4 vì có 3 khóa phân biệt và tổng số phần tử cần xóa ở cả 3 khóa là 4',
              'In ra 3 2 vì chỉ cần xóa 1 lần số 2 và xóa 1 lần số 1000000000 để giữ lại đủ cặp',
              'In ra 6 4 vì kích thước của map luôn bằng đúng số phần tử của mảng đầu vào a',
              'In ra 3 3 vì khóa 2 không cần xóa phần tử nào còn khóa 4 và 10^9 xóa tổng là 3'
            ],
            correct: 0,
            explain: 'cnt chứa 3 khóa: {2: 3, 4: 1, $10^9$: 2}. Với p=(2, 3): 3 &gt;= 2 &rarr; xóa 3 - 2 = 1. Với p=(4, 1): 1 &lt; 4 &rarr; xóa hết 1. Với p=($10^9$, 2): 2 &lt; $10^9$ &rarr; xóa hết 2. Tổng xóa = 1 + 1 + 2 = 4. In ra: 3 4.'
          },
          {
            type: 'single',
            q: 'Tại sao khi nộp bài trên Codeforces với $N = 10^5$ khóa số nguyên, học sinh nên ưu tiên dùng <code>std::map</code> thay vì <code>std::unordered_map</code>?',
            options: [
              'Vì std::unordered_map chỉ lưu được khóa là số nguyên nhỏ hơn 10^6 chứ không lưu được 10^9',
              'Vì std::map luôn ổn định O(N log N), còn unordered_map dễ bị test anti-hash đánh sập O(N^2)',
              'Vì std::unordered_map bắt buộc tốn gấp mười lần bộ nhớ RAM so với mảng tĩnh 10^9 phần tử',
              'Vì std::map chạy trong O(1) tuyệt đối còn unordered_map chạy trong O(N log N) chậm hơn'
            ],
            correct: 1,
            explain: 'unordered_map mặc định dùng hàm băm cố định rất dễ bị các bộ test anti-hash gài xung đột bucket, làm thời gian thoái hóa thành $O(N^2)$ &rarr; TLE. std::map luôn đảm bảo $O(N \\log N)$ trong mọi trường hợp.'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> khi sử dụng <code>std::map&lt;K, V&gt;</code> trong lập trình thi đấu?',
            options: [
              'Các phần tử khi duyệt for (const auto&amp; p : mp) luôn được liệt kê theo thứ tự khóa p.first tăng dần',
              'Dùng mp.count(x) hoặc mp.find(x) != mp.end() giúp kiểm tra tồn tại mà không làm tăng mp.size()',
              'Để tránh TLE trên bài đếm từ khóa kiểu string, ta có thể truyền biến vòng lặp const auto&amp; p',
              'Khi khai báo map&lt;int, int&gt; mp; rồi gọi if (mp[10^9] == 0), bộ nhớ tăng vọt lên ngay 4 GB RAM'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều đúng. D sai vì map chỉ cấp phát nút cho đúng những khóa được chạm tới (chỉ thêm 1 nút cho khóa $10^9$ chứ không cấp phát cả mảng $10^9$ phần tử như mảng tĩnh!).'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: STD::PRIORITY_QUEUE (MAX/MIN-HEAP) & STD::DEQUE
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'priority_queue & deque',
        title: 'Vấn Đề Nhỏ 3: std::priority_queue (Max/Min-Heap) &amp; std::deque Hai Đầu $O(1)$',
        lead: 'Luôn lấy được phần tử lớn nhất hoặc nhỏ nhất trong $O(\\log N)$ qua mỗi bước cập nhật bằng priority_queue (Max-Heap &amp; Min-Heap), và thêm/xóa linh hoạt hai đầu trong $O(1)$ với std::deque.',
        subproblem: {
          title: 'Làm sao vừa liên tục bốc phần tử lớn nhất/nhỏ nhất rồi đẩy giá trị mới vào trong $O(\\log N)$ (thay vì gọi sort() lại mỗi bước), và vừa thêm/xóa ở cả đầu lẫn cuối dãy trong $O(1)$?',
          desc: 'Dùng std::priority_queue (Max-Heap mặc định hoặc Min-Heap với greater&lt;T&gt;) để luôn giữ phần tử ưu tiên nhất ở .top(), và dùng std::deque&lt;T&gt; để push_front/push_back/pop_front/pop_back đều chạy trong $O(1)$.'
        },
        cards: [
          {
            heading: 'std::priority_queue — Max-Heap Mặc Định &amp; Min-Heap Với greater&lt;T&gt;',
            tag: 'Hàng đợi ưu tiên $O(\\log N)$',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Giả sử có $N = 10^5$ món hàng và $M = 10^5$ phiếu giảm giá: mỗi lượt bạn phải <strong>bốc món đắt nhất</strong>, chia đôi giá tiền rồi <strong>bỏ lại vào giỏ</strong> để xét tiếp. Nếu bỏ vào <code>vector</code> rồi gọi <code>sort()</code> sau mỗi phiếu thì tốn <strong>$O(M \\cdot N \\log N)$ &rarr; TLE</strong>!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Chiếc phễu ưu tiên <code>std::priority_queue</code> (Heap):</strong> Nó không sắp toàn bộ giỏ hàng, mà luôn đẩy <strong>đúng 1 phần tử ưu tiên nhất lên miệng phễu (<code>pq.top()</code>)</strong>! Xem đỉnh mất $O(1)$, bốc đỉnh ra (<code>pq.pop()</code>) hoặc thả món mới vào (<code>pq.push(x)</code>) chỉ mất <strong>$O(\\log N)$</strong> (lại nhẹ RAM hơn <code>set</code>/<code>multiset</code> rất nhiều).</li>
                  <li><strong>Max-Heap vs Min-Heap:</strong>
                    <br>&bull; Mặc định <code>priority_queue&lt;int&gt; pq;</code> là <strong>Max-Heap</strong> (số <strong>LỚN NHẤT</strong> ở đỉnh).
                    <br>&bull; Muốn số <strong>NHỎ NHẤT</strong> ở đỉnh (<strong>Min-Heap</strong>), ghép thêm <code>vector</code> và <code>greater</code> (đã quen ở <code>L1-05</code>): <code>priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; minPq;</code>.</li>
                  <li><strong>Nhắc an toàn:</strong> Luôn kiểm tra <code>if (!pq.empty())</code> trước khi gọi <code>pq.top()</code> hoặc <code>pq.pop()</code>, nếu gọi khi rỗng sẽ crash <strong>RE</strong>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Dùng Max-Heap và Min-Heap trong C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Max-Heap mặc định: số LỚN NHẤT nổi lên top()
    priority_queue&lt;int&gt; maxPq;
    maxPq.push(15);
    maxPq.push(40);
    maxPq.push(25);
    cout &lt;&lt; "Max top = " &lt;&lt; maxPq.top() &lt;&lt; '\\n'; // 40
    maxPq.pop(); // Còn {25, 15}

    // 2. Min-Heap: dùng greater&lt;int&gt; để số NHỎ NHẤT nổi lên top()
    priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; minPq;
    minPq.push(15);
    minPq.push(40);
    minPq.push(25);
    if (!minPq.empty()) {
        cout &lt;&lt; "Min top = " &lt;&lt; minPq.top() &lt;&lt; '\\n'; // 15
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>std::priority_queue</code> (Hàng đợi ưu tiên / <code>Binary Heap</code>):</strong> Cấu trúc đống nhị phân mặc định giữ phần tử lớn nhất tại <code>top()</code> (<strong>Max-Heap</strong>); truyền thêm <code>vector&lt;T&gt;, greater&lt;T&gt;</code> sẽ đảo thành <strong>Min-Heap</strong> giữ phần tử nhỏ nhất tại <code>top()</code>.</li>
                  <li><strong>Độ phức tạp Heap:</strong> <code>top()</code>, <code>size()</code>, <code>empty()</code> mất $O(1)$; <code>push()</code> và <code>pop()</code> mất $O(\\log N)$.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'std::deque&lt;T&gt; — Hàng Đợi Hai Đầu $O(1)$ Đánh Bại vector.insert(begin()) $O(N)$',
            tag: 'Thao tác hai đầu $O(1)$',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p><code>std::vector</code> chỉ thêm/xóa nhanh $O(1)$ ở <strong>đuôi</strong> (<code>push_back</code>, <code>pop_back</code>). Nếu bạn viết <code>v.insert(v.begin(), x)</code> để chèn lên <strong>đầu hàng</strong>, toàn bộ $N$ phần tử phía sau phải dịch sang phải một ô mất <strong>$O(N)$</strong> ($Q = 10^5$ lần chèn đầu thành $O(N^2)$ <strong>TLE!</strong>).</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Đường ống mở cả hai đầu <code>std::deque&lt;T&gt;</code>:</strong> Cho phép thêm vào đầu (<code>push_front</code>), thêm vào cuối (<code>push_back</code>), bỏ đầu (<code>pop_front</code>), bỏ cuối (<code>pop_back</code>), xem đầu/cuối (<code>front()</code>, <code>back()</code>) và thậm chí truy cập trực tiếp <code>dq[i]</code> &mdash; tất cả đều chạy trong <strong>$O(1)$</strong>!</li>
                  <li><strong>Mẹo biến cờ đảo chiều với <code>deque</code>:</strong> Khi bài toán vừa bắt <em>"đảo ngược cả dãy"</em> vừa bắt <em>"thêm đầu hoặc cuối"</em> $2 \\cdot 10^5$ lần, đừng đảo mảng thật ($O(N)$), chỉ cần giữ 1 biến <code>bool rev</code> rồi đổi qua lại giữa <code>push_front</code> và <code>push_back</code> trong $O(1)$!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Thao tác chuẩn trên std::deque trong C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    deque&lt;int&gt; dq;
    vector&lt;int&gt; a = {4, 2, 5, 1};
    for (int x : a) {
        // Muốn kết quả nhỏ nhất theo từ điển: số nhỏ hơn hoặc bằng đầu -&gt; đẩy lên đầu!
        if (dq.empty() || x &lt;= dq.front()) dq.push_front(x);
        else dq.push_back(x);
    }
    // dq đang là {1, 2, 4, 5}
    cout &lt;&lt; "front = " &lt;&lt; dq.front() &lt;&lt; ", back = " &lt;&lt; dq.back() &lt;&lt; '\\n';
    dq.pop_front(); // Còn {2, 4, 5} trong O(1)
    dq.pop_back();  // Còn {2, 4} trong O(1)
    cout &lt;&lt; "Sau pop 2 dau: " &lt;&lt; dq[0] &lt;&lt; ' ' &lt;&lt; dq[1] &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>std::deque&lt;T&gt;</code> (Hàng đợi hai đầu / <code>Double-Ended Queue</code>):</strong> Thùng chứa mở rộng linh hoạt ở cả hai đầu trong $O(1)$ cho <code>push_front</code>, <code>pop_front</code>, <code>push_back</code>, <code>pop_back</code> và truy cập <code>dq[i]</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_pq_vs_resort',
            title: 'Phòng Thí Nghiệm 3: Min-Heap priority_queue O(N log N) vs sort() Lại Mỗi Bước O(N^2 log N)',
            desc: 'Mô phỏng bài toán nối N đoạn dây bằng cách luôn bốc 2 đoạn ngắn nhất, cộng lại rồi thả vào tập ban đầu. So sánh số phép toán khi dùng Min-Heap với việc gọi sort() lại ở mỗi bước.',
            toggles: [
              {
                key: 'heapMode',
                label: 'Cấu trúc dùng để bốc 2 số nhỏ nhất liên tục',
                options: [
                  { value: 'min_heap', text: 'Min-Heap priority_queue — O(N log N)', kind: 'ok' },
                  { value: 'resort_vec', text: 'vector + sort() mỗi lượt — O(N^2 log N)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.heapMode === 'min_heap';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> day = {8, 4, 6, 12};
    priority_queue<int, vector<int>, greater<int>> pq(day.begin(), day.end());
    long long chiPhi = 0;
    while ((int)pq.size() > 1) {
        int a = pq.top(); pq.pop();
        int b = pq.top(); pq.pop();
        chiPhi += a + b;
        pq.push(a + b); // Duy trì Min-Heap chỉ tốn O(log N)!
    }
    cout << "Tong chi phi nho nhat = " << chiPhi << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

long long soSanh = 0;
bool cmpGiam(int a, int b) {
    soSanh++;
    return a > b; // Xếp giảm dần để pop_back() lấy số nhỏ nhất
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 1000;
    vector<int> v(n);
    for (int i = 0; i < n; i++) v[i] = (i * 37) % 1000 + 1;
    long long chiPhi = 0;
    while ((int)v.size() > 1) {
        sort(v.begin(), v.end(), cmpGiam); // BẪY TLE: sort() lại ở mỗi lượt!
        int a = v.back(); v.pop_back();
        int b = v.back(); v.pop_back();
        chiPhi += a + b;
        v.push_back(a + b);
    }
    cout << "Chi phi = " << chiPhi << ", so phep so sanh (N=1000): " << soSanh << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [8, 10, 11, 12, 13, 14, 15] : [4, 5, 6, 7, 8, 18],
                statusOk: isOk,
                statusText: isOk
                  ? 'NHANH $O(N \\log N)$: Chỉ tốn ~$1.7 \\times 10^6$ bước cho $N=10^5$ &rarr; AC êm ru dưới 0.1s!'
                  : 'QUÁ CHẬM $O(N^2 \\log N)$: Mới $N=1\\,000$ đã tốn hơn 10 triệu phép so sánh; lên $N=10^5$ sẽ vượt $10^{11}$ bước &rarr; TLE!',
                predictions: [
                  { text: 'Min-Heap nối {4, 6, 8, 12} ra chi phí tối thiểu 58 trong $O(N \\log N)$, sẵn sàng cho $N = 10^5$' },
                  { text: 'Gọi sort() lại ở mỗi lượt khiến ngay cả $N = 1\\,000$ đã tốn hơn 10 triệu phép so sánh và chắc chắn TLE ở $N = 10^5$' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nTong chi phi nho nhat = 58\n[Voi N = 100,000: chi mat ~1.7*10^6 phep tinh -> AC em ru!]'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nChi phi = 4862448, so phep so sanh (N=1000): 10139108\n[Canh bao TLE: Voi N = 100,000 se vuot 10^11 phep tinh -> TLE chac chan!]',
                explain: isOk
                  ? 'Min-Heap chỉ đẩy số nhỏ nhất lên đỉnh mỗi khi pop() và push(), tốn $O(\\log N)$ mỗi thao tác nên tổng cả vòng lặp while chỉ là $O(N \\log N)$.'
                  : 'Mỗi lần gọi sort() trên phần còn lại đều sắp xếp lại từ đầu mất $O(N \\log N)$, lặp $N$ lần tạo thành $O(N^2 \\log N)$ vượt xa ngưỡng $10^8$ phép/giây.'
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
    priority_queue<int, vector<int>, greater<int>> pq;
    pq.push(12);
    pq.push(5);
    pq.push(9);
    int a = pq.top(); pq.pop();
    int b = pq.top(); pq.pop();
    pq.push(a + b);
    cout << a + b << ' ' << pq.top() << '\\n';
    return 0;
}`,
            q: 'Quan sát Min-Heap <code>priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt;</code> trên đây. Hai số được in ra là gì?',
            options: [
              'In ra 17 12 vì Min-Heap lấy hai số đầu tiên đẩy vào là 12 và 5 trước',
              'In ra 21 5 vì hàng đợi ưu tiên mặc định luôn lấy hai số lớn nhất là 12 và 9',
              'In ra 14 9 vì phần tử còn lại là 9 nhỏ hơn 12 và 14 trong lần bốc thứ hai',
              'In ra 14 12 vì Min-Heap lấy 5 và 9 ra cộng thành 14 rồi giữ nguyên 12 ở đỉnh'
            ],
            correct: 3,
            explain: 'Min-Heap chứa {5, 9, 12}. Lần 1 bốc a = 5; lần 2 bốc b = 9; tổng a + b = 14 rồi đẩy 14 vào lại &rarr; Heap còn {12, 14}, nên pq.top() là 12! Kết quả: 14 12.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    deque<int> dq;
    dq.push_back(4);
    dq.push_front(2);
    dq.push_back(7);
    dq.push_front(1);
    dq.pop_back();
    cout << dq.front() << ' ' << dq[1] << ' ' << (int)dq.size() << '\\n';
    return 0;
}`,
            q: 'Theo dõi trạng thái hai đầu của <code>deque&lt;int&gt; dq</code> qua từng lệnh. Ba số được in ra là gì?',
            options: [
              'In ra 2 4 3 vì lệnh push_front(1) đặt 1 sau 2 còn pop_back() bỏ đi số 7',
              'In ra 1 4 3 vì phần tử đứng ngay sau số 1 ở chỉ số dq[1] là số 4',
              'In ra 1 2 3 vì trước khi pop_back dãy là {1, 2, 4, 7} nên còn lại {1, 2, 4}',
              'In ra 4 2 3 vì deque luôn đẩy các phần tử mới nhất về phía cuối dãy'
            ],
            correct: 2,
            explain: 'Các bước thay đổi deque: {4} &rarr; {2, 4} &rarr; {2, 4, 7} &rarr; {1, 2, 4, 7} &rarr; pop_back() bỏ 7 còn {1, 2, 4}. Vậy dq.front() = 1, dq[1] = 2, size = 3. In ra: 1 2 3.'
          },
          {
            type: 'single',
            q: 'Với $Q = 10^5$ truy vấn cần liên tục chèn phần tử mới vào <strong>đầu</strong> danh sách và xem phần tử ở chỉ số $k$, tại sao dùng <code>std::deque</code> lại vượt trội so với <code>std::vector</code>?',
            options: [
              'Vì deque lưu các phần tử luôn được sắp xếp tăng dần sẵn như set nên tra cứu nhanh hơn',
              'Vì deque chèn đầu push_front trong O(1), còn vector.insert(v.begin(), x) tốn O(N) TLE',
              'Vì vector hoàn toàn không hỗ trợ truy cập chỉ số v[k] còn deque hỗ trợ truy cập O(log N)',
              'Vì deque tự động loại bỏ các phần tử trùng nhau ở hai đầu nên không tốn bộ nhớ phụ'
            ],
            correct: 1,
            explain: 'vector chèn vào đầu phải dịch toàn bộ $N$ phần tử sang phải mất $O(N)$ mỗi lần ($O(Q \\cdot N)$ TLE). deque hỗ trợ push_front, push_back, pop_front, pop_back và truy cập dq[k] đều trong $O(1)$.'
          },
          {
            type: 'multiple',
            q: 'Những lưu ý nào sau đây là <strong>ĐÚNG</strong> về <code>std::priority_queue</code> và <code>std::deque</code>?',
            options: [
              'Cần kiểm tra !pq.empty() trước khi gọi pq.top() hoặc pq.pop() để tránh lỗi Runtime Error',
              'Có thể viết pq[0] để đọc trực tiếp phần tử dưới đỉnh priority_queue hoặc dq trong O(1)',
              'Khai báo priority_queue&lt;int&gt; mặc định sẽ giữ phần tử lớn nhất ở đỉnh (Max-Heap)',
              'Dùng priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; luôn lấy được số nhỏ nhất'
            ],
            correct: [0, 2, 3],
            explain: 'A, C và D đều đúng. B sai vì priority_queue không hỗ trợ truy cập chỉ số pq[i] hay duyệt vòng lặp như vector hay deque; bạn chỉ đọc được mỗi phần tử đỉnh pq.top().'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module cuối - Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l106_multiset_erase_all',
        title: 'Xóa Nhầm Toàn Bộ Bản Sao Trên std::multiset (WA)',
        description: 'Kho vé có thể có nhiều vé trùng giá. Với mỗi loại truy vấn x cần bán đúng 1 vé giá x (nếu còn), rồi cuối cùng in số vé còn lại. Nhưng khi có 3 vé giá 20 và chỉ bán 1 vé, chương trình lại báo còn 0 vé giá 20!',
        failingInput: '5\n10 20 20 20 30\n20',
        failingOutput: '2',
        expectedOutput: '4',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, x;
    cin >> n;
    multiset<int> ms;
    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        ms.insert(val);
    }
    cin >> x;
    if (ms.find(x) != ms.end()) {
        ms.erase(x);
    }
    cout << (int)ms.size() << '\\n';
    return 0;
}`,
        bugLine: 17,
        patches: [
          { text: 'Đổi dòng 9 thành set<int> ms; để tự động gộp các vé trùng giá ngay khi nhập' },
          { text: 'Đổi dòng 16 thành if (ms.count(x) > 0) { để kiểm tra đủ số lượng trước khi xóa' },
          { text: 'Đổi dòng 17 thành ms.erase(ms.find(x)); để chỉ xóa đúng 1 bản sao qua iterator' }
        ],
        correctPatch: 2,
        explain: 'Ở dòng 17, ms.erase(x) xóa theo giá trị nên xóa SẠCH cả 3 vé giá 20 (size tụt từ 5 xuống 2)! Đã kiểm tra ms.find(x) != ms.end() ở dòng 16, chỉ cần đổi dòng 17 thành ms.erase(ms.find(x)); (hoặc lưu auto it = ms.find(x); ở dòng 16 rồi ms.erase(it);) là chỉ xóa đúng 1 vé (size còn 4).'
      },
      {
        id: 'dbg_l106_map_junk_key',
        title: 'Kiểm Tra Bằng mp[s] Tự Sinh Khóa Rác Làm Sai Kích Thước Map (WA)',
        description: 'Cho N điểm của N bạn (khác tên nhau), sau đó có Q lần chỉ hỏi xem tên s có nằm trong danh sách đạt giải không. Cuối cùng in ra số lượng bạn thật sự có trong danh sách ban đầu. Chương trình luôn in thừa số người!',
        failingInput: '2\nan 90\nbinh 85\n3\nchi\ndung\nhoa',
        failingOutput: '0\n0\n0\n5',
        expectedOutput: '0\n0\n0\n2',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, q;
    cin >> n;
    map<string, int> mp;
    for (int i = 0; i < n; i++) {
        string s;
        int d;
        cin >> s >> d;
        mp[s] = d;
    }
    cin >> q;
    while (q--) {
        string s;
        cin >> s;
        cout << (mp[s] > 0 ? 1 : 0) << '\\n';
    }
    cout << (int)mp.size() << '\\n';
    return 0;
}`,
        bugLine: 20,
        patches: [
          { text: 'Đổi dòng 20 thành cout << (mp.count(s) > 0 && mp[s] > 0 ? 1 : 0) << \'\\n\'; để không tạo khóa rác' },
          { text: 'Đổi dòng 9 thành unordered_map<string, int> mp; để không tự chèn thêm các khóa lạ' },
          { text: 'Đổi dòng 22 thành cout << (int)mp.size() - q << \'\\n\'; để trừ đi toàn bộ số truy vấn hỏi' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 20, biểu thức mp[s] tự động chèn thêm ("chi", 0), ("dung", 0), ("hoa", 0) vào map khiến mp.size() tăng từ 2 lên 5! Kiểm tra mp.count(s) &gt; 0 trước (nhờ tính chất đoản mạch &amp;&amp;, nếu count == 0 thì vế sau không chạy) giúp tuyệt đối không tạo khóa rác.'
      },
      {
        id: 'dbg_l106_pq_max_vs_min',
        title: 'Dùng Nhầm Max-Heap Mặc Định Khi Cần Bốc Phần Tử Nhỏ Nhất (WA)',
        description: 'Cho N số nguyên dương, liên tục bốc 2 số nhỏ nhất ghép lại thành một đoạn (chi phí bằng tổng 2 số rồi đẩy tổng đó trở lại). Nhưng chương trình lại lấy 2 số lớn nhất trước khiến tổng chi phí bị phình to sai kết quả!',
        failingInput: '4\n8 4 6 12',
        failingOutput: '76',
        expectedOutput: '58',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    priority_queue<int> pq;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        pq.push(x);
    }
    long long ans = 0;
    while ((int)pq.size() > 1) {
        int a = pq.top(); pq.pop();
        int b = pq.top(); pq.pop();
        ans += a + b;
        pq.push(a + b);
    }
    cout << ans << '\\n';
    return 0;
}`,
        bugLine: 9,
        patches: [
          { text: 'Đổi dòng 16 thành while ((int)pq.size() >= 1) { để không bỏ sót lần bốc cuối cùng' },
          { text: 'Đổi dòng 9 thành priority_queue<int, vector<int>, greater<int>> pq; để dùng Min-Heap' },
          { text: 'Đổi dòng 13 thành pq.push(-x); mà giữ nguyên dòng 9 và cộng ans += a + b ở dòng 19' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 9, priority_queue&lt;int&gt; mặc định là Max-Heap nên luôn bốc hai số lớn nhất trước (12 + 8 = 20 &rarr; 20 + 6 = 26 &rarr; 26 + 4 = 30, tổng sai thành 76). Đổi sang priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; pq; để dùng Min-Heap sẽ luôn bốc 2 số nhỏ nhất trước (4 + 6 = 10 &rarr; 8 + 10 = 18 &rarr; 12 + 18 = 30, tổng tối ưu đúng bằng 58).'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — L1-06 PHA 2 STL)
    // ============================================================================
    practiceProblems: [
      {
        id: 'CF-22A',
        title: '22A - Second Order Statistics',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/22/A',
        hint: 'Giới hạn $1 \\le n \\le 100$, $|a_i| \\le 100$. Đưa tất cả $n$ số vào <code>set&lt;int&gt; s</code> để tự động loại trùng và xếp tăng dần. Nếu <code>(int)s.size() &lt; 2</code> thì in "NO", ngược lại lấy phần tử thứ 2 bằng <code>auto it = s.begin(); ++it; cout &lt;&lt; *it &lt;&lt; \'\\n\';</code>.'
      },
      {
        id: 'CF-4C',
        title: '4C - Registration system',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/4/C',
        hint: 'Giới hạn $1 \\le n \\le 10^5$, độ dài tên $\\le 32$, TL 5.0s, ML 64 MB. Dùng <code>map&lt;string, int&gt; db</code> (tránh <code>unordered_map</code> vì bẫy anti-hash trên Codeforces). Nếu <code>db.count(s) == 0</code> thì in "OK" và gán <code>db[s] = 1</code>; ngược lại in <code>s &lt;&lt; db[s]</code> rồi tăng <code>db[s]++</code>.'
      },
      {
        id: 'CF-1579E1',
        title: '1579E1 - Permutation Minimization by Deque',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/1579/E1',
        hint: 'Giới hạn $\\sum n \\le 2 \\cdot 10^5$, TL 2.0s, ML 256 MB. Dùng <code>deque&lt;int&gt; dq</code>: với mỗi số $x$ đọc được, nếu <code>dq.empty() || x &lt; dq.front()</code> thì <code>dq.push_front(x)</code>, ngược lại <code>dq.push_back(x)</code> trong $O(1)$!'
      },
      {
        id: 'ABC082-C',
        title: 'C - Good Sequence',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc082/tasks/arc087_a',
        hint: 'Giới hạn $1 \\le N \\le 10^5$, $1 \\le a_i \\le 10^9$. Không thể tạo mảng đếm tới $10^9$ (MLE)! Dùng <code>map&lt;int, int&gt; cnt</code> đếm tần suất mỗi giá trị trong $O(N \\log N)$. Duyệt từng cặp $(x, c)$: nếu $c \\lt x$ thì xóa hết $c$, nếu $c \\gt x$ thì xóa $c - x$.'
      },
      {
        id: 'ABC141-D',
        title: 'D - Powerful Discount Tickets',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc141/tasks/abc141_d',
        hint: 'Giới hạn $1 \\le N, M \\le 10^5$, $1 \\le A_i \\le 10^9$. Dùng Max-Heap <code>priority_queue&lt;long long&gt; pq</code>: mỗi lượt lấy món đắt nhất <code>x = pq.top()</code>, pop rồi đẩy lại <code>x / 2</code> trong $O(\\log N)$ &rarr; tổng $O((N + M) \\log N)$. Nhớ tính tổng bằng <code>long long</code> vì tổng có thể tới $10^{14}$!'
      },
      {
        id: 'ABC158-D',
        title: 'D - String Formation',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc158/tasks/abc158_d',
        hint: 'Giới hạn $1 \\le |S| \\le 10^5$, $1 \\le Q \\le 2 \\cdot 10^5$, TL 2.0s, ML 1024 MB. Nạp $S$ vào <code>deque&lt;char&gt; dq</code> và giữ một biến cờ <code>bool rev = false</code>. Truy vấn đảo chỉ bật <code>rev = !rev</code> trong $O(1)$; truy vấn thêm ký tự dựa vào <code>rev</code> để gọi <code>push_front</code> hoặc <code>push_back</code> trong $O(1)$!'
      },
      {
        id: 'CSES-1163',
        title: 'Traffic Lights',
        judge: 'CSES',
        tier: 3,
        link: 'https://cses.fi/problemset/task/1163',
        hint: 'Giới hạn $1 \\le x \\le 10^9$, $1 \\le n \\le 2 \\cdot 10^5$, TL 1.00s, ML 512 MB. Dùng <code>set&lt;int&gt; lights = {0, x}</code> lưu vị trí đèn và <code>multiset&lt;int&gt; lens = {x}</code> lưu độ dài các đoạn. Khi thêm đèn $p$: lấy <code>auto it = lights.upper_bound(p); int r = *it; --it; int l = *it;</code> (lùi 1 bước đúng như Phần 1), gọi <code>lens.erase(lens.find(r - l))</code> để xóa ĐÚNG 1 đoạn cũ, chèn $(p - l)$ và $(r - p)$, rồi in <code>*lens.rbegin()</code>!'
      },
      {
        id: 'VNOJ-KMIN',
        title: 'KMIN - K tổng nhỏ nhất',
        judge: 'VNOJ',
        tier: 3,
        link: 'https://oj.vnoi.info/problem/kmin',
        hint: 'Giới hạn $1 \\le M, N, K \\le 50\\,000$, $K \\le M \\cdot N$, $1 \\le A_i, B_i \\le 10^9$, TL 1.0s, ML 512 MB. Sort hai mảng $A$ và $B$ (L1-05), đẩy các cặp ban đầu <code>{A[i] + B[0], {i, 0}}</code> vào Min-Heap <code>priority_queue</code> với <code>greater&lt;...&gt;</code>. Lặp $K$ lần: lấy cặp nhỏ nhất $(sum, i, j)$ ra in $sum$, rồi đẩy tiếp <code>{A[i] + B[j + 1], {i, j + 1}}</code> nếu $j + 1 \\lt N$!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
