/**
 * DỮ LIỆU BÀI GIẢNG L2-03: NGĂN XẾP (STACK) & HÀNG ĐỢI (QUEUE) CƠ BẢN
 * Tầng 2 — Pha 2 STL Lớp 9 (Nối tiếp từ MOD-01 Đệ quy & L1-05..L1-06 STL)
 * Mở khóa:
 * - Ngăn xếp std::stack<T> (LIFO): kéo cơ chế chồng khay Call Stack ẩn (MOD-01) ra tường minh;
 *   5 thao tác chuẩn O(1), rào chắn an toàn !st.empty() và khử đệ quy sâu N = 10^6 tránh tràn 8MB.
 * - Ứng dụng kinh điển của Stack: khớp dãy ngoặc nhiều loại ()[]{} (đủ cả 2 chốt chặn st.empty()),
 *   tính biểu thức hậu tố (RPN) bằng stack<long long> giữ đúng thứ tự a - b, khử cặp kề & hoán vị ngăn xếp.
 * - Hàng đợi std::queue<T> (FIFO): phân biệt .front() vs .top(), mô phỏng hàng chờ tuần tự O(1),
 *   sinh số nhị phân và mở đường loang từng lớp (BFS) với nguyên tắc đánh dấu dist[v] ngay lúc push.
 * Ranh giới tiền đề: KHÔNG dùng kiến thức chưa học (L2-04 Quay lui/Bitmask, L2-05 Tham lam, L2-06+ DP, MOD-02 Monotonic Stack chuyên sâu).
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'ngan_xep_hang_doi',
    number: 'Bài Học L2-03',
    shortTitle: 'Ngăn Xếp & Hàng Đợi',
    title: 'Bài L2-03: Ngăn Xếp (stack) & Hàng Đợi (queue) Cơ Bản',
    lead: 'Biến cơ chế chồng khay ẩn bên dưới Call Stack (<code>MOD-01</code>) thành cấu trúc dữ liệu tường minh trong code: làm chủ <code>std::stack</code> (LIFO) để khớp ngoặc <code>()[]{}</code>, tính biểu thức hậu tố RPN và khử đệ quy tránh tràn 8MB; đồng thời làm chủ <code>std::queue</code> (FIFO) để mô phỏng hàng chờ $O(1)$ và mở đường cho thuật toán loang / BFS.',
    modules: [
      // ============================================================================
      // MODULE 1: NGĂN XẾP STD::STACK & NGUYÊN LÝ LIFO (TỪ CALL STACK ẨN RA TƯỜNG MINH)
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'std::stack & LIFO',
        title: 'Vấn Đề Nhỏ 1: Ngăn Xếp std::stack &amp; Nguyên Lý LIFO (Từ Call Stack Ẩn Ra Tường Minh)',
        lead: 'Kéo chồng khay phụ từ vùng nhớ Call Stack (<code>MOD-01</code>) ra ngoài để tự điều khiển bằng <code>std::stack&lt;T&gt;</code>: mọi thao tác <code>push</code>, <code>top</code>, <code>pop</code>, <code>empty</code>, <code>size</code> đều chạy $O(1)$, tránh bẫy sập chương trình khi rỗng và khử đệ quy sâu $N = 10^6$ an toàn khỏi giới hạn ~8MB.',
        subproblem: {
          title: 'Làm sao tự quản lý cấu trúc Vào sau &ndash; Ra trước ($O(1)$) ngay trong code và chạy quá trình lùi sâu $N = 10^6$ bước mà không bị tràn 8MB Call Stack của <code>MOD-01</code>?',
          desc: 'Ở <code>MOD-01</code>, mỗi lần hàm tự gọi lại thì hệ điều hành đặt ngầm một khay phụ lên Call Stack (~8MB) &mdash; sâu $10^6$ tầng là sập ngay (Stack Overflow). Ta cần tự khai báo <code>std::stack&lt;T&gt;</code> (nằm trên bộ nhớ Heap tới 256&ndash;512MB) để chủ động cất và rút phần tử theo đúng kỷ luật Vào sau &ndash; Ra trước.'
        },
        cards: [
          {
            heading: 'Từ Chồng Khay Call Stack (MOD-01) Đến std::stack&lt;T&gt; &amp; Rào Chắn !st.empty()',
            tag: 'LIFO &bull; O(1)',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Ở bài <code>MOD-01</code>, bạn đã thấy các chiếc khay phụ xếp chồng lên nhau trên bàn làm việc RAM. Ngoài đời, hãy nhìn vào <strong>chồng khay cơm ở căng-tin</strong> (hay chồng đĩa mới rửa):</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Khay nào rửa xong <strong>sau cùng</strong> được đặt lên <strong>đỉnh chồng</strong>; bạn học sinh vào lấy cũng bốc ngay đúng chiếc khay trên đỉnh đó ra <strong>đầu tiên</strong>!</li>
                  <li>Muốn lấy chiếc khay nằm dưới đáy, bắt buộc phải nhấc lần lượt toàn bộ các khay nằm bên trên nó ra trước.</li>
                  <li><strong>3 quy tắc an toàn sống còn:</strong>
                    <ol style="margin: 4px 0 0 20px;">
                      <li><strong>Luôn kiểm tra <code>if (!st.empty())</code> trước khi gọi <code>top()</code> hoặc <code>pop()</code>:</strong> Nếu chồng khay đã trống trơn mà vẫn thò tay bốc, chương trình rơi vào hành vi bất định và sập ngay (<strong>RTE / Segmentation fault</strong>).</li>
                      <li><strong>Lệnh <code>st.pop()</code> KHÔNG trả về giá trị (<code>void</code>):</strong> Phải lưu <code>int x = st.top();</code> xong rồi mới gọi <code>st.pop();</code>!</li>
                      <li><strong>Không đánh số <code>st[i]</code>:</strong> <code>std::stack</code> khóa kín phần thân để bảo vệ kỷ luật chỉ chạm đúng 1 cửa ở đỉnh.</li>
                    </ol>
                  </li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: 5 thao tác chuẩn O(1) của std::stack trong C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    stack&lt;int&gt; st;
    st.push(10); // Đáy: [10]
    st.push(25); // [10, 25]
    st.push(40); // Đỉnh: [10, 25, 40]

    cout &lt;&lt; "So phan tu: " &lt;&lt; (int)st.size() &lt;&lt; '\\n'; // 3

    // Bắt buộc kiểm tra !st.empty() và đọc top() TRƯỚC khi pop()
    if (!st.empty()) {
        int layRa = st.top();
        st.pop();
        cout &lt;&lt; "Vua lay: " &lt;&lt; layRa &lt;&lt; '\\n'; // 40
    }
    if (!st.empty()) {
        cout &lt;&lt; "Dinh moi: " &lt;&lt; st.top() &lt;&lt; '\\n'; // 25
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Ngăn xếp (<code>std::stack&lt;T&gt;</code>):</strong> Cấu trúc dữ liệu hoạt động theo nguyên lý <strong>LIFO</strong> (<em>Last In, First Out</em> &mdash; Vào sau, Ra trước). Cả 5 thao tác <code>push</code>, <code>pop</code>, <code>top</code>, <code>empty</code>, <code>size</code> đều chạy trong $O(1)$.</li>
                  <li><strong>Bộ chuyển đổi thùng chứa (<code>Container Adaptor</code>):</strong> Mặc định trong C++, <code>std::stack</code> bọc bên ngoài <code>std::deque</code> (đã học ở <code>L1-06</code>) và chỉ mở đúng một đầu đỉnh để ép chuẩn kỷ luật LIFO.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Khử Đệ Quy Sâu Bằng Stack Tường Minh: Thoát Bẫy Tràn 8MB Call Stack',
            tag: 'Khử đệ quy',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Từ bài <code>L1-03</code> và <code>MOD-01</code>, bạn đã biết vùng nhớ <strong>Call Stack</strong> dành cho lời gọi hàm chỉ rộng khoảng <strong>~8 MB</strong>, còn bộ nhớ <strong>Heap</strong> (nơi <code>vector</code>, <code>deque</code>, <code>stack</code> lưu dữ liệu) rộng tới <strong>256&ndash;512 MB</strong> theo giới hạn bài thi!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Thay vì để hàm đệ quy tự đẩy $10^6$ khay phụ lên Call Stack rồi bị sập, ta tự cầm một cuốn sổ ghi việc là <code>stack&lt;pair&lt;int, int&gt;&gt; st;</code> rồi chạy vòng lặp <code>while (!st.empty())</code> ngay trong <code>main()</code>!</li>
                  <li><strong>Mẹo đảo thứ tự đẩy khi chia 2 nhánh:</strong> Giả sử bạn muốn chia đoạn $[1, 4]$ thành nửa trái $[1, 2]$ và nửa phải $[3, 4]$ nhưng muốn <strong>nửa trái chạy trước</strong>. Vì Stack lấy phần tử đẩy <em>sau cùng</em> ra trước, bạn bắt buộc phải <strong>đẩy nửa PHẢI xuống trước, rồi mới đẩy nửa TRÁI lên trên</strong>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Dùng stack tường minh thay đệ quy (trái trước, và sâu N = 10^6)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Khử đệ quy chia đoạn [1, 4] theo thứ tự trái -&gt; phải
    stack&lt;pair&lt;int, int&gt;&gt; tasks;
    tasks.push({1, 4});
    while (!tasks.empty()) {
        pair&lt;int, int&gt; cur = tasks.top();
        tasks.pop();
        int l = cur.first, r = cur.second;
        if (l == r) {
            cout &lt;&lt; l &lt;&lt; ' ';
            continue;
        }
        int mid = l + (r - l) / 2;
        tasks.push({mid + 1, r}); // Đẩy PHẢI xuống đáy trước
        tasks.push({l, mid});     // Đẩy TRÁI lên đỉnh để chạy trước!
    }
    cout &lt;&lt; '\\n'; // In ra: 1 2 3 4

    // 2. Xử lý chuỗi N = 1,000,000 bước trên Heap bằng std::stack (không lo tràn 8MB)
    stack&lt;int&gt; bigSt;
    for (int i = 1; i &lt;= 1000000; i++) bigSt.push(i);
    long long tong = 0;
    while (!bigSt.empty()) {
        tong += bigSt.top();
        bigSt.pop();
    }
    cout &lt;&lt; tong &lt;&lt; '\\n'; // 500000500000
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Khử đệ quy tường minh (<code>Explicit Stack Simulation</code>):</strong> Chuyển các khung gọi hàm ẩn trên Call Stack thành phần tử dữ liệu nằm trong <code>std::stack</code> và điều phối bằng vòng lặp <code>while (!st.empty())</code>.</li>
                  <li><strong>Bộ nhớ Heap vs Call Stack (~8 MB):</strong> <code>std::stack</code> cấp phát vùng nhớ động trên Heap nên chứa được hàng triệu phần tử an toàn trong giới hạn RAM 256&ndash;512 MB.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_stack_pop_order',
            title: 'Phòng Thí Nghiệm 1A: Đọc st.top() Trước st.pop() vs Gọi st.pop() Trước Khi Đọc',
            desc: 'Trong ngăn xếp st đang có {10, 20, 30} (số 30 ở đỉnh). Vì st.pop() không trả về giá trị, thử đảo nhầm thứ tự gọi pop() trước khi đọc top() để xem số 30 biến mất oan uổng thế nào!',
            toggles: [
              {
                key: 'popOrder',
                label: 'Thứ tự đọc đỉnh và xóa đỉnh',
                options: [
                  { value: 'top_first', text: 'Đọc st.top() rồi mới st.pop() — Đúng luật (AC)', kind: 'ok' },
                  { value: 'pop_first', text: 'Gọi st.pop() trước rồi mới st.top() — Mất số đỉnh (WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.popOrder === 'top_first';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    stack<int> st;
    st.push(10); st.push(20); st.push(30);
    int layRa = st.top();
    st.pop();
    cout << layRa << ' ' << st.top() << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    stack<int> st;
    st.push(10); st.push(20); st.push(30);
    st.pop();
    int layRa = st.top();
    cout << layRa << ' ' << st.top() << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [9, 10],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Lấy đúng 30 ở đỉnh ra biến layRa, đỉnh mới còn lại là 20!'
                  : 'MẤT DỮ LIỆU ĐỈNH (WA): Lệnh st.pop() xóa mất 30 trước khi kịp đọc, nên layRa nhận nhầm số 20!',
                predictions: [
                  { text: 'Biến layRa giữ đúng giá trị 30 ở đỉnh, sau đó đỉnh mới lộ ra là 20 (in 30 20)' },
                  { text: 'Số 30 bị pop() xóa mất trước khi đọc nên biến layRa nhận nhầm số 20 (in 20 20)' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n30 20'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n20 20',
                explain: isOk
                  ? 'Trong C++, st.pop() có kiểu trả về void để đảm bảo tốc độ và an toàn bộ nhớ. Vì vậy luôn phải gọi int x = st.top(); trước khi thực hiện st.pop(); (đồng thời nhớ kiểm tra !st.empty()).'
                  : 'Khi gọi st.pop(); trước, phần tử 30 trên cùng lập tức bị vứt bỏ mà chưa hề lưu lại; lệnh st.top() phía sau lúc này lại đọc trúng phần tử thứ hai là 20!'
              };
            }
          },
          {
            id: 'sb_stack_push_order',
            title: 'Phòng Thí Nghiệm 1B: Khử Đệ Quy Chia Nhánh Bằng Stack — Thứ Tự Push Ngược Để Pop Đúng Chiều',
            desc: 'Chia đoạn [1, 4] làm hai nửa [1, 2] và [3, 4] bằng stack tường minh để in lá từ trái sang phải (kỳ vọng: 1 2 3 4). Thử đổi thứ tự đẩy nửa trái trước nửa phải để thấy hiệu ứng ngược chiều LIFO!',
            toggles: [
              {
                key: 'pushOrder',
                label: 'Thứ tự đẩy 2 đoạn con vào stack',
                options: [
                  { value: 'right_first', text: 'Push nhánh PHẢI trước, TRÁI sau — In 1 2 3 4 (AC)', kind: 'ok' },
                  { value: 'left_first', text: 'Push nhánh TRÁI trước, PHẢI sau — Bị đảo 4 3 2 1 (WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.pushOrder === 'right_first';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    stack<pair<int, int>> st;
    st.push({1, 4});
    while (!st.empty()) {
        pair<int, int> p = st.top(); st.pop();
        if (p.first == p.second) { cout << p.first << ' '; continue; }
        int mid = (p.first + p.second) / 2;
        st.push({mid + 1, p.second});
        st.push({p.first, mid});
    }
    cout << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    stack<pair<int, int>> st;
    st.push({1, 4});
    while (!st.empty()) {
        pair<int, int> p = st.top(); st.pop();
        if (p.first == p.second) { cout << p.first << ' '; continue; }
        int mid = (p.first + p.second) / 2;
        st.push({p.first, mid});
        st.push({mid + 1, p.second});
    }
    cout << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [13, 14],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Nhánh trái luôn nằm trên đỉnh nên các lá được in đúng thứ tự 1 2 3 4!'
                  : 'NGƯỢC THỨ TỰ (WA): Nhánh phải nằm đè lên trên nên máy tính duyệt từ phải sang trái thành 4 3 2 1!',
                predictions: [
                  { text: 'Vì đẩy phải trước rồi đẩy trái sau, nửa trái nổi lên đỉnh và in đúng 1 2 3 4' },
                  { text: 'Vì đẩy trái trước rồi đẩy phải sau, nửa phải nổi lên đỉnh và in ngược 4 3 2 1' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1 2 3 4 '
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n4 3 2 1 ',
                explain: isOk
                  ? 'Theo nguyên lý LIFO, phần tử đẩy vào sau cùng sẽ chạy đầu tiên. Để xử lý nửa [l, mid] trước nửa [mid + 1, r], ta phải đặt [mid + 1, r] xuống đáy trước rồi đặt [l, mid] lên trên.'
                  : 'Khi đẩy [l, mid] trước rồi [mid + 1, r] sau, mỗi vòng lặp lại bốc nửa bên phải ra xử lý trước, khiến toàn bộ dãy kết quả bị lật ngược hoàn toàn!'
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
    stack<int> st;
    st.push(4);
    st.push(7);
    st.pop();
    st.push(2);
    st.push(9);
    st.pop();
    cout << st.top() << ' ' << (int)st.size() << '\\n';
    return 0;
}`,
            q: 'Theo dõi trạng thái ngăn xếp <code>st</code> qua từng lệnh. Hai số được in ra ở dòng 14 là gì?',
            options: [
              'In ra 4 2 vì hai lệnh pop() lần lượt lấy mất số 7 và số 9 khỏi đỉnh',
              'In ra 9 2 vì số 9 vừa được đẩy vào sau cùng nên nằm ở đỉnh ngăn xếp',
              'In ra 2 2 vì sau khi pop() số 9, đỉnh còn lại là 2 và kích thước là 2',
              'In ra 2 3 vì ngăn xếp vẫn còn giữ lại ba phần tử là 4, 7 và 2 ở bên trong'
            ],
            correct: 2,
            explain: 'Các bước thay đổi ngăn xếp: {4} &rarr; {4, 7} &rarr; pop() còn {4} &rarr; {4, 2} &rarr; {4, 2, 9} &rarr; pop() còn {4, 2}. Đỉnh st.top() là 2 và kích thước là 2. In ra: 2 2.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    stack<int> st;
    for (int x : {3, 5, 2}) {
        st.push(x);
        if (st.top() % 2 == 1) st.push(st.top() + 1);
    }
    int sum = 0;
    while (!st.empty()) {
        sum += st.top();
        st.pop();
    }
    cout << sum << '\\n';
    return 0;
}`,
            q: 'Chạy vòng lặp <code>for</code> trên dãy <code>{3, 5, 2}</code> rồi cộng toàn bộ phần tử khi rút khỏi ngăn xếp. Giá trị <code>sum</code> in ra là bao nhiêu?',
            options: [
              'In ra 10 vì vòng lặp chỉ cộng ba phần tử ban đầu là 3, 5 và 2 trong dãy',
              'In ra 20 vì hai số lẻ 3 và 5 tạo thêm số 4 và số 6 đẩy vào ngăn xếp',
              'In ra 18 vì chỉ số lẻ đầu tiên là 3 được đẩy thêm số 4 vào ngăn xếp',
              'In ra 23 vì phần tử chẵn 2 ở cuối cũng được cộng thêm 1 thành 3'
            ],
            correct: 1,
            explain: 'x = 3: đẩy 3, lẻ &rarr; đẩy thêm 4. x = 5: đẩy 5, lẻ &rarr; đẩy thêm 6. x = 2: đẩy 2, chẵn &rarr; không đẩy thêm. Stack chứa {3, 4, 5, 6, 2}, tổng bằng 3 + 4 + 5 + 6 + 2 = 20.'
          },
          {
            type: 'single',
            q: 'Vì sao khi thay thế một hàm đệ quy sâu $N = 10^6$ bằng <code>std::stack</code> tường minh chạy trong vòng <code>while (!st.empty())</code> thì chương trình không còn bị sập Stack Overflow?',
            options: [
              'Vì std::stack tự động nén mọi số nguyên về dạng 1 bit nên không tốn bất kỳ RAM nào',
              'Vì vòng lặp while (!st.empty()) tự động xóa toàn bộ phần tử sau mỗi 1000 bước chạy',
              'Vì trình biên dịch C++14 chỉ cho phép Call Stack chạy tối đa 100 lần gọi hàm đệ quy',
              'Vì std::stack lưu phần tử trên bộ nhớ Heap co giãn hàng trăm MB thay vì Call Stack ~8MB'
            ],
            correct: 3,
            explain: 'Call Stack của hệ điều hành thường giới hạn chỉ ~8MB nên sâu 10^6 tầng sẽ tràn ngay. std::stack dùng container nền (deque/vector) cấp phát trên Heap nên chịu được hàng triệu phần tử trong giới hạn 256-512MB.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về <code>std::stack&lt;T&gt;</code> trong C++14?',
            options: [
              'Cả 5 thao tác push(), pop(), top(), empty() và size() đều có độ phức tạp O(1)',
              'Phải kiểm tra !st.empty() trước khi gọi st.top() hoặc st.pop() để tránh lỗi RTE',
              'Lệnh st.pop() trả về luôn giá trị phần tử ở đỉnh vừa xóa giống các ngôn ngữ khác',
              'Ta không thể dùng toán tử chỉ số st[i] để đọc trực tiếp phần tử nằm ở đáy ngăn xếp'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D đều đúng. C sai vì trong C++ STL, st.pop() có kiểu trả về là void (chỉ xóa chứ không trả giá trị), nên phải đọc st.top() trước rồi mới gọi st.pop().'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: ỨNG DỤNG KINH ĐIỂN CỦA STACK: KHỚP NGOẶC, RPN & KHỬ CẶP / HOÁN VỊ
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Khớp Ngoặc, RPN & Mô Phỏng',
        title: 'Vấn Đề Nhỏ 2: Ứng Dụng Kinh Điển Của Stack &mdash; Khớp Ngoặc, Hậu Tố (RPN) &amp; Khử Cặp / Hoán Vị',
        lead: 'Từ bài toán khớp chuỗi ngoặc nhiều loại <code>()[]{}</code> (nhớ đủ cả hai chốt chặn <code>st.empty()</code>), tính nhanh biểu thức hậu tố (RPN) với <code>stack&lt;long long&gt;</code> đến khử cặp ký tự liền kề và kiểm tra hoán vị qua ngõ cụt LIFO.',
        subproblem: {
          title: 'Làm sao kiểm tra chuỗi $10^6$ ngoặc <code>()[]{}</code> hợp lệ, tính biểu thức hậu tố không cần dấu ngoặc và rút gọn các cặp liền kề trong $O(N)$?',
          desc: 'Nếu quét đi quét lại chuỗi để xóa từng cặp <code>"()"</code> hoặc hai ký tự giống nhau nằm kề nhau giữa <code>std::string</code>, mỗi lần xóa tốn $O(N)$ &rarr; tổng $O(N^2)$ (TLE!). Nhờ nguyên lý <strong>Vào sau &ndash; Ra trước</strong>, mọi ký tự vừa mở hoặc chưa xử lý chỉ cần nằm chờ ở đỉnh <code>stack</code> để đối chiếu trong $O(1)$.'
        },
        cards: [
          {
            heading: 'Khớp Dãy Ngoặc Nhiều Loại ()[]{} &amp; Hai Chốt Chặn Sống Còn st.empty()',
            tag: 'Khớp ngoặc O(N)',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tưởng tượng bạn mở một bộ <strong>hộp lồng nhau</strong> nhiều kích cỡ (hộp tròn <code>()</code>, hộp vuông <code>[]</code>, hộp nhọn <code>{}</code>). Chiếc nắp vừa đóng lại bắt buộc phải khớp với <strong>chiếc hộp mở sau cùng</strong> đang chờ trên cùng!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Gặp ngoặc mở (<code>'('</code>, <code>'['</code>, <code>'{'</code>): mở thêm hộp mới và đẩy vào <code>stack&lt;char&gt;</code>.</li>
                  <li>Gặp ngoặc đóng (<code>')'</code>, <code>']'</code>, <code>'}'</code>): đối chiếu với <code>st.top()</code> rồi đóng nắp (<code>st.pop()</code>).</li>
                  <li><strong>2 chốt chặn không được thiếu dù chỉ 1:</strong>
                    <ol style="margin: 4px 0 0 20px;">
                      <li><strong>Chốt chặn 1 (trong vòng lặp):</strong> Khi gặp ngoặc đóng mà thấy <code>if (st.empty()) return false;</code> (ví dụ chuỗi <code>"())"</code> ở ký tự thứ 3). Tuyệt đối không được viết <code>else if (!st.empty() &amp;&amp; ...)</code> mà quên nhánh <code>else return false;</code>!</li>
                      <li><strong>Chốt chặn 2 (sau vòng lặp):</strong> Sau khi duyệt hết chuỗi, phải viết <code>return st.empty();</code> (cấm viết <code>return true;</code>), để bắt chuỗi còn thừa ngoặc mở chưa đóng như <code>"(()"</code>!</li>
                    </ol>
                  </li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Hàm kiểm tra dãy ngoặc ()[]{} chuẩn O(N)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

bool isValidBrackets(const string&amp; s) {
    stack&lt;char&gt; st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            // Chốt chặn 1: Thừa ngoặc đóng lúc stack đã rỗng
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if (c == ')' &amp;&amp; top != '(') return false;
            if (c == ']' &amp;&amp; top != '[') return false;
            if (c == '}' &amp;&amp; top != '{') return false;
        }
    }
    // Chốt chặn 2: Còn dư ngoặc mở chưa đóng ở cuối chuỗi?
    return st.empty();
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout &lt;&lt; isValidBrackets("([]{})") &lt;&lt; ' '
         &lt;&lt; isValidBrackets("())") &lt;&lt; ' '
         &lt;&lt; isValidBrackets("(()") &lt;&lt; '\\n'; // 1 0 0
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Dãy ngoặc đúng (<code>Regular Bracket Sequence</code>):</strong> Chuỗi ngoặc trong đó mỗi ngoặc mở đều được đóng đúng loại và không chéo cặp (như <code>"([)]"</code> là sai).</li>
                  <li><strong>Hai chốt chặn rỗng (<code>Underflow &amp; Leftover Checks</code>):</strong> Kiểm tra <code>if (st.empty()) return false;</code> khi đóng ngoặc và <code>return st.empty();</code> khi kết thúc duyệt chuỗi.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Tính Biểu Thức Hậu Tố (RPN), Khử Cặp Liền Kề &amp; Hoán Vị Ngăn Xếp',
            tag: 'RPN &amp; Mô phỏng',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Bên cạnh khớp ngoặc, <code>std::stack</code> còn giải gọn 3 dạng bài kinh điển sau chỉ trong 1 lượt duyệt $O(N)$:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>1. Biểu thức hậu tố (RPN):</strong> Thay vì viết <code>(1 + 2) * 4</code>, máy tính viết dấu phép toán ra sau hai con số: <code>"1 2 + 4 *"</code>. Khi đọc từ trái sang phải: gặp số thì đẩy vào <code>stack&lt;long long&gt;</code>; gặp toán tử thì rút 2 số trên đỉnh ra tính rồi đẩy kết quả trở lại! <strong>Bẫy thứ tự:</strong> số rút ra <em>đầu tiên</em> là toán hạng phải <code>b</code>, số rút ra <em>thứ hai</em> mới là toán hạng trái <code>a</code> &rarr; phải tính <code>a - b</code> và <code>a / b</code>!</li>
                  <li><strong>2. Khử cặp ký tự liền kề giống nhau:</strong> Với chuỗi <code>"abbaca"</code>, khi hai chữ giống nhau đụng mặt (<code>'b'</code> gặp <code>'b'</code> ở đỉnh stack) thì cả hai tự hủy (<code>st.pop()</code>), để lộ chữ <code>'a'</code> phía dưới gặp tiếp chữ <code>'a'</code> mới tạo thành hiệu ứng domino rút gọn thành <code>"ca"</code> trong $O(N)$!</li>
                  <li><strong>3. Kiểm tra hoán vị qua ngõ cụt (<code>SPOJ-STPAR</code>):</strong> Các xe $1..N$ đi vào đường 1 chiều và chỉ có 1 ngõ cụt kiểu Stack: giữ biến <code>need = 1</code>, hễ đầu ngõ cụt <code>st.top() == need</code> thì cho xe xuất phát ngay (<code>st.pop(); need++;</code>). <em>(Gợi ý tương lai: khi nâng cấp điều kiện từ bằng nhau sang loại bỏ phần tử bị che khuất, bạn sẽ bước sang <strong>Ngăn xếp đơn điệu ở <code>MOD-02</code></strong>!)</em></li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Tính biểu thức RPN với stack&lt;long long&gt; &amp; khử cặp liền kề</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

long long evalRPN(const vector&lt;string&gt;&amp; tokens) {
    stack&lt;long long&gt; st;
    for (const string&amp; tok : tokens) {
        if (tok == "+" || tok == "-" || tok == "*" || tok == "/") {
            long long b = st.top(); st.pop(); // Toán hạng PHẢI
            long long a = st.top(); st.pop(); // Toán hạng TRÁI
            if (tok == "+") st.push(a + b);
            else if (tok == "-") st.push(a - b);
            else if (tok == "*") st.push(a * b);
            else st.push(a / b);
        } else {
            st.push(stoll(tok));
        }
    }
    return st.top();
}

string khuCapKe(const string&amp; s) {
    stack&lt;char&gt; st;
    for (char c : s) {
        if (!st.empty() &amp;&amp; st.top() == c) st.pop();
        else st.push(c);
    }
    string ans;
    while (!st.empty()) { ans.push_back(st.top()); st.pop(); }
    reverse(ans.begin(), ans.end());
    return ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout &lt;&lt; evalRPN({"5", "1", "2", "+", "4", "*", "+", "3", "-"}) &lt;&lt; '\\n'; // 14
    cout &lt;&lt; khuCapKe("abbaca") &lt;&lt; '\\n'; // ca
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Biểu thức hậu tố / Ký pháp Ba Lan ngược (<code>RPN / Reverse Polish Notation</code>):</strong> Cách viết toán tử ngay sau hai toán hạng giúp máy tính định giá biểu thức chỉ bằng 1 ngăn xếp mà không cần dấu ngoặc.</li>
                  <li><strong>Khử cặp kề &amp; Hoán vị ngăn xếp (<code>Adjacent Cancellation &amp; Stack Permutation</code>):</strong> Hai mẫu mô phỏng chuẩn dùng <code>std::stack</code> để xử lý phản ứng dây chuyền hoặc sắp xếp thứ tự chỉ trong $O(N)$.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_bracket_end_check',
            title: 'Phòng Thí Nghiệm 2A: Bẫy Quên return st.empty(); Ở Cuối Hàm Khớp Ngoặc',
            desc: 'Kiểm tra chuỗi "(()" có còn dấu ngoặc mở chưa được đóng (đáp án đúng là KHONG HOP LE). Đổi công tắc ở dòng return cuối cùng để thấy vì sao return true; cho kết quả sai!',
            toggles: [
              {
                key: 'endCheck',
                label: 'Câu lệnh return ở cuối hàm check()',
                options: [
                  { value: 'st_empty', text: 'return st.empty(); — Bắt lỗi thừa ngoặc mở (AC)', kind: 'ok' },
                  { value: 'always_true', text: 'return true; — Quên kiểm tra ngoặc dư (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.endCheck === 'st_empty';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

bool check(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(c);
        else { if (st.empty()) return false; st.pop(); }
    }
    return st.empty();
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout << (check("(()") ? "HOP LE" : "KHONG HOP LE") << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

bool check(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(c);
        else { if (st.empty()) return false; st.pop(); }
    }
    return true;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout << (check("(()") ? "HOP LE" : "KHONG HOP LE") << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [10],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Stack còn 1 dấu \'(\' chưa đóng nên st.empty() là false &rarr; KHONG HOP LE!'
                  : 'SAI THUẬT TOÁN (WA): Hàm bỏ qua dấu \'(\' còn kẹt trong stack và kết luận sai HOP LE!',
                predictions: [
                  { text: 'Vì vẫn còn một dấu ngoặc mở chưa đóng trong stack, hàm trả về KHONG HOP LE' },
                  { text: 'Vì thoát vòng lặp mà không gặp ngoặc đóng sai, hàm return true báo nhầm HOP LE' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nKHONG HOP LE'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nHOP LE',
                explain: isOk
                  ? 'Một dãy ngoặc hợp lệ phải thỏa mãn cả hai điều kiện: không bao giờ thiếu ngoặc mở giữa chừng (if (st.empty()) return false;) VÀ không được dư ngoặc mở sau khi đọc hết chuỗi (return st.empty();).'
                  : 'Chuỗi "(()" có 2 ngoặc mở và chỉ 1 ngoặc đóng. Sau vòng lặp, trong stack vẫn còn dư 1 ký tự \'(\'; viết return true; đồng nghĩa với việc ngó lơ toàn bộ ngoặc mở còn sót!'
              };
            }
          },
          {
            id: 'sb_rpn_operand_order',
            title: 'Phòng Thí Nghiệm 2B: Bẫy Đảo Ngược Toán Hạng a - b Thành b - a Khi Tính Hậu Tố RPN',
            desc: 'Tính giá trị biểu thức RPN {"10", "3", "-", "2", "*"}, tương ứng (10 - 3) * 2 = 14. Thử đảo thứ tự phép trừ thành b - a để xem kết quả bị đổi dấu thành -14!',
            toggles: [
              {
                key: 'subOrder',
                label: 'Cách lấy hai toán hạng khi gặp phép trừ',
                options: [
                  { value: 'a_minus_b', text: 'st.push(a - b); — Đúng thứ tự trái trừ phải (AC)', kind: 'ok' },
                  { value: 'b_minus_a', text: 'st.push(b - a); — Đảo ngược phép trừ (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.subOrder === 'a_minus_b';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<string> tok = {"10", "3", "-", "2", "*"};
    stack<long long> st;
    for (const string& s : tok) {
        if (s == "-") {
            long long b = st.top(); st.pop();
            long long a = st.top(); st.pop();
            st.push(a - b);
        } else if (s == "*") {
            long long b = st.top(); st.pop();
            long long a = st.top(); st.pop();
            st.push(a * b);
        } else st.push(stoll(s));
    }
    cout << st.top() << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<string> tok = {"10", "3", "-", "2", "*"};
    stack<long long> st;
    for (const string& s : tok) {
        if (s == "-") {
            long long b = st.top(); st.pop();
            long long a = st.top(); st.pop();
            st.push(b - a);
        } else if (s == "*") {
            long long b = st.top(); st.pop();
            long long a = st.top(); st.pop();
            st.push(a * b);
        } else st.push(stoll(s));
    }
    cout << st.top() << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [13],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Rút b = 3 rồi a = 10, tính đúng (10 - 3) * 2 = 14!'
                  : 'NGƯỢC TOÁN HẠNG (WA): Tính nhầm 3 - 10 = -7 nên kết quả bị lật thành -14!',
                predictions: [
                  { text: 'Vì 10 nằm dưới 3, rút b = 3 và a = 10 rồi tính (a - b) * 2 ra đúng 14' },
                  { text: 'Vì lấy nhầm số mới pop trước trừ số cũ phía dưới nên kết quả bị âm thành -14' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n14'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n-14',
                explain: isOk
                  ? 'Khi đọc "10 3 -", số 10 vào stack trước (nằm dưới), số 3 vào sau (nằm trên đỉnh). Do vậy b = st.top() luôn là số thứ hai (3), còn a = st.top() kế tiếp mới là số đầu tiên (10).'
                  : 'Với phép + và *, đổi chỗ a và b không sao; nhưng với phép - và /, tính b - a hoặc b / a sẽ ra kết quả sai hoàn toàn!'
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
    vector<string> tok = {"8", "2", "/", "5", "-", "3", "*"};
    stack<long long> st;
    for (const string& s : tok) {
        if (s == "+" || s == "-" || s == "*" || s == "/") {
            long long b = st.top(); st.pop();
            long long a = st.top(); st.pop();
            if (s == "-") st.push(a - b);
            else if (s == "*") st.push(a * b);
            else if (s == "/") st.push(a / b);
            else st.push(a + b);
        } else st.push(stoll(s));
    }
    cout << st.top() << '\\n';
    return 0;
}`,
            q: 'Theo dõi ngăn xếp <code>stack&lt;long long&gt;</code> khi tính biểu thức hậu tố <code>{"8", "2", "/", "5", "-", "3", "*"}</code>. Giá trị in ra là bao nhiêu?',
            options: [
              'In ra 3 vì phép trừ lấy 5 trừ đi thương của 8 chia 2 rồi đem nhân với 3',
              'In ra -3 vì biểu thức tương ứng với phép tính (8 / 2 - 5) * 3 bằng -3',
              'In ra -15 vì 8 chia 2 bằng 4, sau đó lấy 4 nhân 3 trừ đi 5 thành sai dấu',
              'In ra 1 vì phép chia 8 / 2 đứng trước bị phép trừ 5 - 3 làm đổi thứ tự'
            ],
            correct: 1,
            explain: 'Đẩy 8, 2 &rarr; gặp "/" lấy a = 8, b = 2 tính 8 / 2 = 4 đẩy vào stack. Đẩy 5 &rarr; gặp "-" lấy a = 4, b = 5 tính 4 - 5 = -1 đẩy vào stack. Đẩy 3 &rarr; gặp "*" tính (-1) * 3 = -3.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string s = "azxxzy";
    stack<char> st;
    for (char c : s) {
        if (!st.empty() && st.top() == c) st.pop();
        else st.push(c);
    }
    string ans;
    while (!st.empty()) { ans.push_back(st.top()); st.pop(); }
    reverse(ans.begin(), ans.end());
    cout << ans << '\\n';
    return 0;
}`,
            q: 'Đoạn code trên thực hiện khử mọi cặp chữ cái giống nhau liền kề trên xâu <code>"azxxzy"</code>. Xâu <code>ans</code> in ra màn hình là gì?',
            options: [
              'In ra ay vì cặp xx bị xóa trước, làm hai chữ z kề nhau và tiếp tục bị xóa',
              'In ra azzy vì thuật toán chỉ xóa đúng một cặp xx liền kề nhau ban đầu',
              'In ra ya vì các ký tự trong ngăn xếp khi lấy ra sẽ bị đảo ngược thứ tự',
              'In ra xy vì hai cặp chữ giống nhau ở hai đầu bị triệt tiêu trong vòng lặp'
            ],
            correct: 0,
            explain: 'Các bước stack: "a" &rarr; "az" &rarr; "azx" &rarr; gặp \'x\' xóa \'x\' còn "az" &rarr; gặp \'z\' xóa \'z\' còn "a" &rarr; gặp \'y\' thành "ay". Sau khi rút và reverse() lại, kết quả đúng là "ay".'
          },
          {
            type: 'single',
            q: 'Trong bài kiểm tra dãy ngoặc hợp lệ, vì sao hàm chuẩn cần có <strong>CẢ</strong> <code>if (st.empty()) return false;</code> trong vòng lặp <strong>VÀ</strong> <code>return st.empty();</code> ở cuối hàm?',
            options: [
              'Câu lệnh trong vòng lặp đếm số dấu ngoặc vuông, còn câu lệnh cuối đếm dấu ngoặc nhọn',
              'Hai câu lệnh đều làm chung một việc là kiểm tra xem chuỗi ban đầu có rỗng hay không',
              'Câu lệnh trong vòng lặp giúp tăng tốc độ đọc chuỗi lên gấp đôi so với dùng vòng for',
              'Câu lệnh trong vòng lặp bắt lỗi thừa ngoặc đóng, còn câu lệnh cuối bắt lỗi dư ngoặc mở'
            ],
            correct: 3,
            explain: 'Nếu chuỗi là "())", ký tự thứ 3 gặp ngoặc đóng khi stack rỗng nên phải có if (st.empty()) return false; trong vòng lặp. Nếu chuỗi là "(()", vòng lặp chạy hết vẫn còn \'(\' dư trong stack nên cuối hàm phải return st.empty();.'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> khi ứng dụng <code>std::stack</code> giải các bài toán biểu thức và mô phỏng?',
            options: [
              'Trong RPN, khi gặp phép chia "/", phần tử pop() ra trước là số chia (b), pop() sau là số bị chia (a)',
              'Nên khai báo stack&lt;long long&gt; khi tính RPN để tránh tràn số int ở các phép nhân trung gian',
              'Thuật toán khử cặp ký tự liền kề bằng stack chỉ tốn O(N) thời gian cho chuỗi dài N',
              'Biểu thức hậu tố RPN bắt buộc phải giữ lại toàn bộ dấu ngoặc tròn mới tính đúng giá trị'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều chính xác. D sai vì ưu điểm lớn nhất của ký pháp hậu tố RPN là vị trí toán tử đã quyết định sẵn thứ tự thực hiện nên không cần dùng dấu ngoặc.'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: HÀNG ĐỢI STD::QUEUE & NGUYÊN LÝ FIFO (HÀNG CHỜ & MỞ ĐƯỜNG CHO BFS)
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'std::queue & FIFO',
        title: 'Vấn Đề Nhỏ 3: Hàng Đợi std::queue &amp; Nguyên Lý FIFO (Hàng Chờ Tuần Tự &amp; Mở Đường Cho BFS)',
        lead: 'Chuyển từ kỷ luật Vào sau &ndash; Ra trước sang công bằng tuyệt đối <strong>Vào trước &ndash; Ra trước (FIFO)</strong> với <code>std::queue&lt;T&gt;</code>: phân biệt dứt điểm <code>.front()</code> vs <code>.top()</code>, mô phỏng hàng chờ $O(1)$ và mở khóa vòng lặp loang từng lớp <code>while (!q.empty())</code> chuẩn bị cho BFS.',
        subproblem: {
          title: 'Làm sao mô phỏng dòng người xếp hàng $N = 2 \\cdot 10^5$ lượt (xóa đầu, đẩy ra cuối) và duyệt các trạng thái theo từng lớp khoảng cách tăng dần mà không bị $O(N^2)$?',
          desc: 'Nếu dùng <code>std::vector</code> và gọi <code>v.erase(v.begin())</code> để rút người đứng đầu hàng, $N - 1$ phần tử phía sau phải dịch sang trái tốn $O(N)$ mỗi lượt &rarr; tổng $O(N^2)$ (<strong>TLE!</strong>). Với <code>std::queue&lt;T&gt;</code>, cả thao tác đẩy vào cuối lẫn rút ở đầu đều chạy gọn <strong>$O(1)$</strong>.'
        },
        cards: [
          {
            heading: 'Quầy Vé Xem Phim FIFO &amp; Bảng Phân Biệt .front() vs .top()',
            tag: 'FIFO &bull; O(1)',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Khác với chồng đĩa ở căng-tin, khi bạn <strong>xếp hàng mua vé xem phim</strong> (hay mua trà sữa), quy tắc công bằng là <strong>ai tới trước đứng đầu hàng và được phục vụ trước</strong>, người mới tới tự giác đi xuống đứng sau đuôi hàng!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>6 thao tác $O(1)$ của <code>std::queue&lt;T&gt;</code>:</strong> <code>q.push(x)</code> (vào cuối hàng), <code>q.front()</code> (xem người đầu hàng), <code>q.back()</code> (xem người cuối hàng), <code>q.pop()</code> (cho người đầu hàng rời đi &mdash; trả về <code>void</code>), <code>q.empty()</code> và <code>q.size()</code>.</li>
                  <li><strong>Cảnh báo nhầm tên hàm giữa 3 cấu trúc STL (<code>L1-06</code> + <code>L2-03</code>):</strong>
                    <ul style="margin: 4px 0 0 20px;">
                      <li><code>std::stack</code> &rarr; <strong><code>.top()</code></strong></li>
                      <li><code>std::priority_queue</code> (<code>L1-06</code>) &rarr; <strong><code>.top()</code></strong></li>
                      <li><code>std::queue</code> &rarr; bắt buộc dùng <strong><code>.front()</code></strong> (gõ <code>q.top()</code> là Compile Error ngay!).</li>
                    </ul>
                  </li>
                  <li>Nhớ kiểm tra <code>if (!q.empty())</code> trước khi gọi <code>front()</code>, <code>back()</code> hoặc <code>pop()</code>, và tuyệt đối không gọi <code>q[i]</code> (nếu cần cả hai đầu hoặc truy cập chỉ số thì chuyển sang <code>std::deque</code> từ <code>L1-06</code>).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Thao tác FIFO &amp; Mô phỏng xoay vòng tròn O(N)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    queue&lt;int&gt; q;
    for (int i = 1; i &lt;= 5; i++) q.push(i); // Hàng: [1, 2, 3, 4, 5]

    if (!q.empty()) {
        cout &lt;&lt; "Dau: " &lt;&lt; q.front() &lt;&lt; ", Cuoi: " &lt;&lt; q.back() &lt;&lt; '\\n'; // 1, 5
    }

    // Mô phỏng vòng tròn: bỏ qua 1 bạn (đẩy xuống cuối), loại bạn kế tiếp (O(N))
    while (!q.empty()) {
        q.push(q.front()); // Giữ bạn đầu hàng -&gt; xếp xuống cuối hàng
        q.pop();
        cout &lt;&lt; q.front() &lt;&lt; ' '; // Loại bạn tiếp theo
        q.pop();
    }
    cout &lt;&lt; '\\n'; // Kết quả: 2 4 1 5 3
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Hàng đợi (<code>std::queue&lt;T&gt;</code>):</strong> Cấu trúc dữ liệu hoạt động theo nguyên lý <strong>FIFO</strong> (<em>First In, First Out</em> &mdash; Vào trước, Ra trước), thao tác hai đầu đúng quy chuẩn chỉ thêm cuối (<code>push</code>) và rút đầu (<code>pop</code>) trong $O(1)$.</li>
                  <li><strong><code>.front()</code> vs <code>.top()</code>:</strong> Hàng đợi đọc đầu ra bằng <code>q.front()</code> (và đầu vào bằng <code>q.back()</code>), khác với <code>.top()</code> trên <code>stack</code> và <code>priority_queue</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Sinh Số Nhị Phân Theo Lớp &amp; Mở Đường Cho Thuật Toán Loang (BFS)',
            tag: 'Tiền đề BFS',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy hình dung một <strong>giọt mực loang trên mặt nước phẳng</strong>: đầu tiên nước ướt ở vòng tròn khoảng cách $0$, rồi đồng loạt lan ra mọi ô cách $1$ bước, sau đó mới tới mọi ô cách $2$ bước. Cơ chế đó chính là linh hồn của <code>std::queue</code>!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Ví dụ 1 &mdash; Sinh $N$ số nhị phân đầu tiên (<code>"1", "10", "11", ...</code>):</strong> Đẩy <code>"1"</code> vào <code>queue&lt;string&gt;</code>. Mỗi lượt rút <code>cur = q.front(); q.pop();</code>, in ra rồi đẩy tiếp <code>cur + "0"</code> và <code>cur + "1"</code> vào cuối hàng. Vì vào trước ra trước, mọi số $k$ chữ số chắc chắn được in hết trước bất kỳ số $k + 1$ chữ số nào!</li>
                  <li><strong>Ví dụ 2 &mdash; Tìm số bước ít nhất biến số $n$ thành $m$ (<code>while (!q.empty())</code>):</strong> Dùng <code>vector&lt;int&gt; dist(LIMIT + 1, -1);</code>, gán <code>dist[n] = 0; q.push(n);</code>. Khi rút <code>u</code> ra, với mỗi bước kế tiếp <code>v</code> hợp lệ chưa thăm (<code>dist[v] == -1</code>), phải <strong>đánh dấu <code>dist[v] = dist[u] + 1;</code> NGAY LÚC ĐẨY <code>q.push(v);</code></strong> (không đợi lúc <code>pop()</code> mới đánh dấu, kẻo hàng ngàn nhánh cùng đẩy trùng một đỉnh <code>v</code> vào hàng đợi gây <strong>TLE/MLE</strong>!).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Sinh số nhị phân &amp; Loang trạng thái từng lớp bằng queue</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Sinh 5 số nhị phân đầu tiên bằng queue&lt;string&gt;
    queue&lt;string&gt; qb;
    qb.push("1");
    for (int i = 0; i &lt; 5; i++) {
        string cur = qb.front(); qb.pop();
        cout &lt;&lt; cur &lt;&lt; (i + 1 &lt; 5 ? ' ' : '\\n');
        qb.push(cur + "0");
        qb.push(cur + "1");
    }

    // 2. Loang khoảng cách ít nhất từ n = 4 tới m = 6 bằng -1 hoặc *2
    int n = 4, m = 6, LIMIT = 20000;
    vector&lt;int&gt; dist(LIMIT + 1, -1);
    queue&lt;int&gt; q;
    dist[n] = 0;
    q.push(n);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        if (u == m) break;
        int nxt[2] = {u - 1, u * 2};
        for (int v : nxt) {
            if (v &gt;= 1 &amp;&amp; v &lt;= LIMIT &amp;&amp; dist[v] == -1) {
                dist[v] = dist[u] + 1; // Đánh dấu NGAY LÚC PUSH!
                q.push(v);
            }
        }
    }
    cout &lt;&lt; "So buoc it nhat: " &lt;&lt; dist[m] &lt;&lt; '\\n'; // 2 (4 -&gt; 3 -&gt; 6)
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Duyệt loang theo từng lớp (<code>Level-by-Level Expansion / BFS Prep</code>):</strong> Vòng lặp <code>while (!q.empty())</code> đảm bảo mọi trạng thái ở bước $d$ luôn được xét xong trước trạng thái bước $d + 1$, nên lần đầu tiên chạm tới đích luôn là đường đi ngắn nhất.</li>
                  <li><strong>Đánh dấu khi đẩy (<code>Mark-on-Push Invariant</code>):</strong> Cập nhật <code>dist[v]</code> ngay trước <code>q.push(v)</code> đảm bảo mỗi trạng thái hợp lệ chỉ vào hàng đợi tối đa 1 lần duy nhất.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_queue_vs_stack_order',
            title: 'Phòng Thí Nghiệm 3A: Sinh 5 Số Nhị Phân Đầu Tiên — std::queue (FIFO) vs Nhầm Sang std::stack (LIFO)',
            desc: 'Từ gốc "1", mỗi bước sinh thêm cur + "0" và cur + "1". Hãy bật công tắc để quan sát sự khác biệt giữa hàng đợi FIFO (loang từng lớp tăng dần) và ngăn xếp LIFO (lao sâu một nhánh)!',
            toggles: [
              {
                key: 'dsType',
                label: 'Cấu trúc lưu trạng thái sinh số',
                options: [
                  { value: 'fifo', text: 'queue&lt;string&gt; — Loang từng lớp: 1 10 11 100 101 (AC)', kind: 'ok' },
                  { value: 'lifo', text: 'stack&lt;string&gt; — Lao sâu 1 nhánh: 1 11 111 1111 11111 (WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.dsType === 'fifo';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    queue<string> q;
    q.push("1");
    for (int i = 0; i < 5; i++) {
        string cur = q.front(); q.pop();
        cout << cur << (i + 1 < 5 ? ' ' : '\\n');
        q.push(cur + "0");
        q.push(cur + "1");
    }
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    stack<string> q;
    q.push("1");
    for (int i = 0; i < 5; i++) {
        string cur = q.top(); q.pop();
        cout << cur << (i + 1 < 5 ? ' ' : '\\n');
        q.push(cur + "0");
        q.push(cur + "1");
    }
    return 0;
}`;
              return {
                code,
                changedLines: [7, 10],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Cơ chế FIFO xử lý xong lớp 1 chữ số, 2 chữ số rồi mới tới 3 chữ số &rarr; 1 10 11 100 101!'
                  : 'SAI THỨ TỰ (WA): Ngăn xếp LIFO bốc ngay "11" vừa đẩy vào rồi lại đẩy "111" lên đỉnh &rarr; 1 11 111 1111 11111!',
                predictions: [
                  { text: 'Với queue (FIFO), các chuỗi ngắn xếp trước được in lần lượt 1 10 11 100 101' },
                  { text: 'Với stack (LIFO), chuỗi dài mới tạo đè lên đỉnh khiến kết quả vọt thành 1 11 111 1111 11111' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1 10 11 100 101'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1 11 111 1111 11111',
                explain: isOk
                  ? 'Queue luôn đẩy chuỗi con dài hơn xuống cuối hàng, nhường chỗ cho các chuỗi cùng độ dài ở phía trên chạy hết trước. Đây chính là bản chất loang theo chiều rộng (BFS).'
                  : 'Stack luôn rút chuỗi mới nhất nằm trên đỉnh. Vì cur + "1" được đẩy vào sau cùng, nó lập tức bị rút ra ở vòng lặp kế tiếp và cứ thế kéo dài chữ số 1 mãi mãi!'
              };
            }
          },
          {
            id: 'sb_queue_mark_on_push',
            title: 'Phòng Thí Nghiệm 3B: Đánh Dấu dist[v] Ngay Khi Push vs Đánh Dấu Muộn Lúc Pop',
            desc: 'Loang từ số 1 tới số 10 trong [1..10] bằng hai bước +1 hoặc +2. Xem tổng số lần đẩy vào queue vọt lên thế nào khi không đánh dấu dist[v] ngay lúc push!',
            toggles: [
              {
                key: 'markTime',
                label: 'Thời điểm đánh dấu mảng khoảng cách dist[]',
                options: [
                  { value: 'on_push', text: 'Gán dist[v] ngay lúc q.push(v) — Mỗi ô vào đúng 1 lần (AC)', kind: 'ok' },
                  { value: 'on_pop', text: 'Đợi lúc q.pop() mới gán dist[u] — Đẩy trùng lặp nhiều lần (Bẫy TLE!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.markTime === 'on_push';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> dist(11, -1);
    queue<int> q;
    dist[1] = 0; q.push(1);
    int pushes = 1;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        int nxt[2] = {u + 1, u + 2};
        for (int v : nxt) if (v <= 10 && dist[v] == -1) {
            dist[v] = dist[u] + 1; q.push(v); pushes++;
        }
    }
    cout << "dist[10]=" << dist[10] << ", pushes=" << pushes << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> dist(11, -1);
    queue<pair<int, int>> q;
    q.push({1, 0});
    int pushes = 1;
    while (!q.empty()) {
        pair<int, int> cur = q.front(); q.pop();
        int u = cur.first, d = cur.second;
        if (dist[u] != -1) continue;
        dist[u] = d;
        int nxt[2] = {u + 1, u + 2};
        for (int v : nxt) if (v <= 10 && dist[v] == -1) {
            q.push({v, d + 1}); pushes++;
        }
    }
    cout << "dist[10]=" << dist[10] << ", pushes=" << pushes << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [8, 9, 15] : [8, 9, 12, 13, 14, 15, 18],
                statusOk: isOk,
                statusText: isOk
                  ? 'TỐI ƯU O(N): Đánh dấu ngay khi push giúp 10 số [1..10] chỉ đẩy vào hàng đợi đúng 10 lần!'
                  : 'TRÙNG LẶP TRONG QUEUE (BẪY TLE): Chỉ có 10 số [1..10] nhưng đã bị đẩy trùng tới 18 lần (lên N=10^5 sẽ bùng nổ)!',
                predictions: [
                  { text: 'Đánh dấu dist[v] ngay lúc push giữ tổng số lần đẩy bằng đúng 10 (mỗi đỉnh tối đa 1 lần)' },
                  { text: 'Đợi lúc pop mới gán dist[u] làm nhiều đường cùng đẩy một đỉnh vào queue (tăng lên 18 lần)' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndist[10]=5, pushes=10'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndist[10]=5, pushes=18',
                explain: isOk
                  ? 'Khi cập nhật dist[v] = dist[u] + 1 ngay trước q.push(v), mọi trạng thái khác nhìn thấy v sau đó đều thấy dist[v] != -1 và bỏ qua ngay, giữ đúng độ phức tạp tuyến tính O(V).'
                  : 'Khi cả u và u + 1 cùng nhìn thấy v = u + 2 vẫn còn dist[v] == -1 trước khi pop, v bị đẩy trùng nhiều lần vào hàng đợi. Trên bảng lưới 1000x1000, cách viết này tạo ra hàng triệu bản sao rác dẫn tới TLE/MLE!'
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
    queue<int> q;
    for (int i = 1; i <= 4; i++) q.push(i);
    q.push(q.front()); q.pop();
    int firstOut = q.front(); q.pop();
    q.push(q.front()); q.pop();
    cout << firstOut << ' ' << q.front() << ' ' << (int)q.size() << '\\n';
    return 0;
}`,
            q: 'Theo dõi hàng đợi <code>q</code> qua các thao tác xoay đầu ra cuối và loại phần tử đầu. Ba số in ra màn hình là gì?',
            options: [
              'In ra 1 3 3 vì lần rút thứ nhất lấy số 1 rồi phần tử đứng đầu tiếp theo là số 3',
              'In ra 2 3 3 vì số 1 chuyển xuống cuối trước khi rút số 2 và tiếp tục giữ số 3',
              'In ra 2 4 3 vì số 1 và số 3 lần lượt được đưa xuống cuối nên 4 lên đầu hàng',
              'In ra 3 4 3 vì cả hai lần chuyển phần tử đầu hàng đều giữ nguyên số 3 ở đầu'
            ],
            correct: 2,
            explain: 'Ban đầu q = {1, 2, 3, 4}. Chuyển 1 ra sau &rarr; {2, 3, 4, 1}. Rút firstOut = 2, pop() &rarr; {3, 4, 1}. Chuyển 3 ra sau &rarr; {4, 1, 3}. Lúc này q.front() = 4 và kích thước q.size() = 3. Kết quả in ra: 2 4 3.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> dist(12, -1);
    queue<int> q;
    dist[3] = 0; q.push(3);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : {u - 1, u * 2}) {
            if (v >= 1 && v <= 10 && dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    cout << dist[5] << ' ' << dist[8] << '\\n';
    return 0;
}`,
            q: 'Đoạn code loang bằng <code>queue&lt;int&gt;</code> xuất phát từ số <code>3</code> (với bước <code>u - 1</code> hoặc <code>u * 2</code> trong <code>[1..10]</code>). Hai số <code>dist[5]</code> và <code>dist[8]</code> in ra là gì?',
            options: [
              'In ra 2 3 vì từ 3 đi 3 &rarr; 6 &rarr; 5 (2 bước) và 3 &rarr; 2 &rarr; 4 &rarr; 8 (3 bước)',
              'In ra 3 2 vì từ 3 đi 3 &rarr; 6 &rarr; 12 vượt quá giới hạn 10 nên chọn đường 3 &rarr; 4 &rarr; 8',
              'In ra 2 2 vì từ 3 chỉ cần hai phép biến đổi là chạm được cả 5 lẫn 8 nhanh nhất',
              'In ra 4 3 vì đường đi tới 5 phải lùi về 1 rồi nhân đôi liên tiếp qua số 2 và 4'
            ],
            correct: 0,
            explain: 'Lớp 0: {3}. Lớp 1 (dist=1): {2, 6}. Lớp 2 (dist=2): từ 2 ra {1, 4}; từ 6 ra {5} (vì 12 &gt; 10). Lớp 3 (dist=3): từ 4 ra {8}. Vậy dist[5] = 2 và dist[8] = 3. In ra: 2 3.'
          },
          {
            type: 'single',
            q: 'Khi lập trình bằng C++14 STL, sự khác nhau về tên phương thức đọc phần tử sắp lấy ra giữa <code>std::queue</code>, <code>std::stack</code> và <code>std::priority_queue</code> là gì?',
            options: [
              'std::queue dùng .top(), còn std::stack và std::priority_queue dùng chung .front()',
              'Cả ba cấu trúc trên đều dùng chung phương thức .front() để xem phần tử lấy ra trước',
              'std::queue dùng .peek(), còn std::stack dùng .top() và priority_queue dùng .max()',
              'std::queue dùng .front(), còn cả std::stack lẫn std::priority_queue đều dùng .top()'
            ],
            correct: 3,
            explain: 'Trong C++ STL: queue đọc phần tử đầu hàng bằng .front() (và cuối hàng bằng .back()), trong khi stack và priority_queue (L1-06) đọc phần tử sắp rút bằng .top().'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về hàng đợi <code>std::queue&lt;T&gt;</code> và thuật toán loang từng lớp?',
            options: [
              'Thao tác đẩy vào cuối q.push(x) và rút ở đầu q.pop() đều có độ phức tạp O(1)',
              'Nên cập nhật mảng dist[v] ngay trước lệnh q.push(v) để tránh đẩy trùng lặp một trạng thái',
              'Khi vòng lặp while (!q.empty()) chạy, mọi trạng thái ở bước d xong trước bước d + 1',
              'Ta có thể truy cập trực tiếp phần tử đứng giữa hàng đợi bằng cú pháp q[mid] trong O(1)'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều đúng bản chất FIFO và BFS. D sai vì std::queue không hỗ trợ toán tử chỉ số []; nếu cần truy cập ngẫu nhiên hai đầu, phải dùng std::deque (L1-06).'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l203_bracket_skip_empty',
        title: 'Thiếu Nhánh else return false; Khi Gặp Ngoặc Đóng Lúc Stack Rỗng (WA)',
        description: 'Hàm kiểm tra xâu chỉ gồm \'(\' và \')\' có hợp lệ hay không. Với xâu đầu vào "())", ký tự \')\' thứ ba dư thừa nên kết quả đúng phải là KHONG HOP LE, nhưng code lại im lặng bỏ qua và in ra HOP LE!',
        failingInput: '())',
        failingOutput: 'HOP LE',
        expectedOutput: 'KHONG HOP LE',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

bool check(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') {
            st.push(c);
        } else if (!st.empty()) {
            st.pop();
        }
    }
    return st.empty();
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string s;
    cin >> s;
    cout << (check(s) ? "HOP LE" : "KHONG HOP LE") << '\\n';
    return 0;
}`,
        bugLine: 9,
        patches: [
          { text: 'Đổi dòng 9 thành } else { if (st.empty()) return false;' },
          { text: 'Đổi dòng 9 thành } else if (st.empty()) { return true;' },
          { text: 'Đổi dòng 9 thành } else if (st.empty()) { st.push(c);' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 9, khi viết else if (!st.empty()) mà bỏ trống nhánh else, lúc gặp \')\' khi stack đang rỗng thì chương trình im lặng bỏ qua chứ không trả về false! Sửa dòng 9 thành } else { if (st.empty()) return false; để giữ nguyên st.pop(); ở dòng 10 khi stack không rỗng và trả về false ngay khi stack rỗng.'
      },
      {
        id: 'dbg_l203_rpn_swap_operands',
        title: 'Đảo Ngược Thứ Tự Toán Hạng (b - a Thay Vì a - b) Khi Tính Hậu Tố RPN (WA)',
        description: 'Chương trình đọc n token của một biểu thức hậu tố (RPN) và in kết quả. Với phép tính "10 3 -" (giá trị đúng là 10 - 3 = 7), code lại in ra -7!',
        failingInput: '3\n10 3 -',
        failingOutput: '-7',
        expectedOutput: '7',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    stack<long long> st;
    for (int i = 0; i < n; i++) {
        string tok;
        cin >> tok;
        if (tok == "-") {
            long long firstPop = st.top(); st.pop();
            long long secondPop = st.top(); st.pop();
            st.push(firstPop - secondPop);
        } else {
            st.push(stoll(tok));
        }
    }
    cout << st.top() << '\\n';
    return 0;
}`,
        bugLine: 16,
        patches: [
          { text: 'Đổi dòng 16 thành st.push(firstPop + secondPop);' },
          { text: 'Đổi dòng 16 thành st.push(secondPop - firstPop);' },
          { text: 'Đổi dòng 16 thành st.push(abs(firstPop - secondPop));' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 16, số 10 vào stack trước rồi mới tới số 3, nên firstPop là toán hạng bên phải (3) còn secondPop mới là toán hạng bên trái (10). Phải đẩy secondPop - firstPop (tức 10 - 3 = 7) mới đúng bản chất LIFO!'
      },
      {
        id: 'dbg_l203_queue_dist_init',
        title: 'Khởi Tạo Mảng Khoảng Cách dist Bằng 0 Thay Vì -1 Làm Tắc Vòng Loang Queue (WA)',
        description: 'Tìm số bước ít nhất biến số s = 2 thành t = 5 bằng phép +1 hoặc *2 (đáp án đúng là 2 bước: 2 &rarr; 4 &rarr; 5). Code khởi tạo sai mảng dist nên không bao giờ đẩy được trạng thái mới vào queue và in ra 0!',
        failingInput: '2 5',
        failingOutput: '0',
        expectedOutput: '2',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int s, t;
    cin >> s >> t;
    vector<int> dist(25, 0);
    queue<int> q;
    dist[s] = 0;
    q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : {u + 1, u * 2}) {
            if (v <= 20 && dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    cout << dist[t] << '\\n';
    return 0;
}`,
        bugLine: 9,
        patches: [
          { text: 'Đổi dòng 9 thành vector<int> dist(25, -1);' },
          { text: 'Đổi dòng 9 thành vector<int> dist(25, 1);' },
          { text: 'Đổi dòng 16 thành if (v <= 20 && dist[v] >= 0) {' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 9, mảng dist bị khởi tạo toàn bộ giá trị 0, khiến điều kiện kiểm tra chưa thăm dist[v] == -1 ở dòng 16 không bao giờ đúng! Đổi giá trị khởi tạo thành -1 giúp phân biệt rõ trạng thái chưa thăm (-1) với điểm xuất phát (0).'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — L2-03)
    // ============================================================================
    practiceProblems: [
      {
        id: 'CF-26B',
        title: '26B - Regular Bracket Sequence',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/26/B',
        hint: 'Giới hạn $1 \\le |s| \\le 10^6$, TL 2.0s, ML 256 MB. Duyệt từng ký tự: gặp <code>\'(\'</code> đẩy vào <code>stack&lt;char&gt;</code>; gặp <code>\')\'</code> kiểm tra <code>if (!st.empty())</code> thì <code>st.pop(); ans += 2;</code> để đếm độ dài dãy con ngoặc hợp lệ lớn nhất trong $O(|s|)$.'
      },
      {
        id: 'CF-1374C',
        title: '1374C - Move Brackets',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/1374/C',
        hint: 'Giới hạn $2 \\le n \\le 50$ ($n$ chẵn, có $n/2$ dấu <code>\'(\'</code> và $n/2$ dấu <code>\')\'</code>), TL 1.0s, ML 256 MB. Dùng <code>stack&lt;char&gt;</code> ghép mọi cặp <code>"()"</code> hợp lệ đã sẵn đúng thứ tự; số lượng dấu ngoặc <code>\'(\'</code> còn dư lại trong stack sau khi duyệt hết chính là số lần chuyển ít nhất.'
      },
      {
        id: 'ABC278-A',
        title: 'A - Shift',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/abc278/tasks/abc278_a',
        hint: 'Giới hạn $1 \\le N, K \\le 100$, $0 \\le A_i \\le 100$, TL 2.0s. Đẩy cả $N$ phần tử vào <code>queue&lt;int&gt; q</code>, sau đó lặp đúng $K$ lần thao tác <code>q.pop(); q.push(0);</code> rồi lần lượt rút từ <code>q.front()</code> để in dãy kết quả.'
      },
      {
        id: 'SPOJ-STPAR',
        title: 'STPAR - Street Parade',
        judge: 'SPOJ',
        tier: 2,
        link: 'https://www.spoj.com/problems/STPAR/',
        hint: 'Giới hạn $n \\le 1000$, nhiều bộ test và kết thúc khi gặp $n = 0$. Mô phỏng ngõ cụt bằng <code>stack&lt;int&gt;</code> kết hợp biến <code>need = 1</code>: hễ <code>!st.empty() &amp;&amp; st.top() == need</code> thì cho xe ra đường chính (<code>st.pop(); need++;</code>); nếu xe hiện tại bằng <code>need</code> thì tăng <code>need</code>, ngược lại đẩy vào <code>st</code>.'
      },
      {
        id: 'ABC240-D',
        title: 'D - Strange Balls',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc240/tasks/abc240_d',
        hint: 'Giới hạn $1 \\le N \\le 2 \\cdot 10^5$, $1 \\le a_i \\le 200\\,000$. Dùng <code>stack&lt;pair&lt;int, int&gt;&gt;</code> lưu cặp <code>(giá trị, số lượng liên tiếp cùng giá trị)</code> ở đỉnh ống cùng biến tổng <code>total</code>. Khi số lượng đạt đúng <code>a[i]</code> thì gọi <code>st.pop()</code> và trừ <code>total -= a[i]</code> trong $O(N)$.'
      },
      {
        id: 'ABC247-D',
        title: 'D - Cylinder',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc247/tasks/abc247_d',
        hint: 'Giới hạn $1 \\le Q \\le 2 \\cdot 10^5$, $1 \\le x, c \\le 10^9$. Vì $c$ tới $10^9$ nên không thể đẩy từng quả bóng lẻ! Hãy dùng <code>queue&lt;pair&lt;long long, long long&gt;&gt;</code> nén theo từng lô <code>(giá trị x, số lượng c)</code> và rút dần từ <code>q.front()</code> khi gặp truy vấn loại 2 (cộng tổng bằng <code>long long</code>).'
      },
      {
        id: 'CSES-2162',
        title: 'Josephus Problem I',
        judge: 'CSES',
        tier: 3,
        link: 'https://cses.fi/problemset/task/2162',
        hint: 'Giới hạn $1 \\le n \\le 2 \\cdot 10^5$, TL 1.00s, ML 512 MB. Nếu dùng <code>vector.erase()</code> xóa phần tử giữa mảng sẽ bị $O(N^2)$ TLE! Hãy đẩy $1..n$ vào <code>queue&lt;int&gt;</code>: trong khi <code>!q.empty()</code>, chuyển 1 bạn đầu xuống cuối (<code>q.push(q.front()); q.pop();</code>) rồi in và loại bạn tiếp theo (<code>q.front()</code>) trong đúng $O(N)$.'
      },
      {
        id: 'CF-520B',
        title: '520B - Two Buttons',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/520/B',
        hint: 'Giới hạn $1 \\le n, m \\le 10^4$, TL 2.0s, ML 256 MB. Mở đường cho thuật toán loang / BFS bằng <code>queue&lt;int&gt;</code> và mảng <code>vector&lt;int&gt; dist(20005, -1)</code>: từ trạng thái <code>u</code> sinh hai bước kế tiếp <code>u - 1</code> ($&gt; 0$) và <code>2 * u</code> ($\\le 20\\,000$), nhớ đánh dấu <code>dist[v] = dist[u] + 1</code> ngay lúc đẩy vào hàng đợi!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
