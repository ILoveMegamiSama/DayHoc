/**
 * DỮ LIỆU BÀI GIẢNG L2-01: MẢNG CỘNG DỒN (1D/2D) & MẢNG HIỆU
 * Tầng 2 — Pha 2 STL Lớp 9 (Nối tiếp từ L1-05..L1-07)
 * Mở khóa:
 * - Mảng cộng dồn 1D (1D Prefix Sum): đánh chỉ số từ 1 (pref[0] = 0), truy vấn S[r] - S[l - 1] trong O(1),
 *   bẫy tràn int (dùng vector<long long>) và kết hợp std::sort / std::map đếm đoạn con tổng K.
 * - Mảng cộng dồn 2D (2D Prefix Sum): công thức Bao hàm - Loại trừ dựng bảng O(N*M) và cắt hình chữ nhật O(1).
 * - Mảng hiệu 1D (1D Difference Array): đánh dấu +v tại l và -v tại r + 1 trên diff(n + 2, 0),
 *   khôi phục mảng cuối trong O(N), đối chiếu Prefix Sum vs Difference Array và ghép cả hai.
 * Ranh giới tiền đề: KHÔNG dùng kiến thức L2-02+ (Binary Search, Two Pointers, Stack/Queue, Backtracking, Greedy, DP).
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'mang_cong_don',
    number: 'Bài Học L2-01',
    shortTitle: 'Mảng Cộng Dồn & Hiệu',
    title: 'Bài L2-01: Mảng Cộng Dồn (1D/2D) & Mảng Hiệu',
    lead: 'Biến $Q = 2 \\cdot 10^5$ truy vấn tổng đoạn $[L, R]$ hoặc hình chữ nhật con $(r_1, c_1) \\dots (r_2, c_2)$ từ $O(Q \\cdot N)$ / $O(Q \\cdot N \\cdot M)$ thành $O(1)$ mỗi truy vấn bằng Mảng cộng dồn 1D/2D, đồng thời xử lý $Q$ lần cộng cả đoạn trong $O(N + Q)$ với Mảng hiệu <code>diff</code> cỡ <code>n + 2</code> trên <code>vector&lt;long long&gt;</code>.',
    modules: [
      // ============================================================================
      // MODULE 1: MẢNG CỘNG DỒN 1D (1D PREFIX SUM)
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Mảng Cộng Dồn 1D',
        title: 'Vấn Đề Nhỏ 1: Mảng Cộng Dồn 1D — Tổng Đoạn $[L, R]$ Trong $O(1)$',
        lead: 'Từ vòng lặp cộng lại mất $O(Q \\cdot N)$ gây TLE xuống còn $O(N + Q)$ nhờ tiền xử lý mảng tiền tố 1-based <code>pref[0] = 0</code>, truy vấn bằng phép trừ <code>pref[r] - pref[l - 1]</code> và tránh bẫy tràn số <code>int</code>.',
        subproblem: {
          title: 'Làm sao trả lời $Q = 2 \\cdot 10^5$ câu hỏi tính tổng đoạn $[L, R]$ trên dãy $N = 2 \\cdot 10^5$ số nguyên (tới $10^9$) trong dưới $1$ giây?',
          desc: 'Nếu mỗi truy vấn lại chạy vòng <code>for</code> từ $L$ đến $R$, tổng số phép cộng lên tới $4 \\cdot 10^{10}$ (TLE hàng trăm giây!), và dùng kiểu <code>int</code> để cộng dồn sẽ tràn ngưỡng $2.14 \\cdot 10^9$ (WA!). Ta cần tính sẵn tổng từ đầu dãy một lần duy nhất vào <code>vector&lt;long long&gt;</code>.'
        },
        cards: [
          {
            heading: 'Đồng Hồ Quãng Đường &amp; Mẹo Lính Canh Chỉ Số 1-Based (pref[0] = 0)',
            tag: 'Truy vấn O(1)',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tưởng tượng bạn theo dõi số km một chiếc xe tải đi được mỗi ngày từ Ngày $1$ đến Ngày $N$. Nếu cuối mỗi ngày $i$, tài xế ghi lại <strong>số công-tơ-mét tích lũy tính từ vạch xuất phát</strong> vào sổ <code>S[i]</code> (với mốc xuất phát ngày $0$ là <code>S[0] = 0</code>):</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Khi sếp hỏi: <em>"Từ đầu ngày $L$ đến hết ngày $R$ xe chạy bao nhiêu km?"</em> — bạn <strong>không cần cộng lại từng ngày</strong> từ $L$ đến $R$! Chỉ cần lấy chỉ số đồng hồ cuối ngày $R$ (<code>S[R]</code>) trừ đi chỉ số đồng hồ ngay trước ngày $L$ (<code>S[L - 1]</code>).</li>
                  <li><strong>Tại sao đánh chỉ số từ $1$ với <code>S[0] = 0</code>?</strong> Nếu dùng 0-based (<code>0..n-1</code>), khi hỏi từ đầu dãy ($L = 0$) bạn phải viết thêm nhánh <code>if (l == 0) ans = S[r]; else ans = S[r] - S[l - 1];</code> rất dễ quên. Dùng 1-based có lính canh <code>S[0] = 0</code> giúp công thức <code>S[r] - S[l - 1]</code> chạy đúng 100% cả khi $L = 1$!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Cài đặt Mảng cộng dồn 1D chuẩn C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 5;
    // Đánh chỉ số từ 1: bỏ trống a[0], đặt lính canh pref[0] = 0
    vector&lt;long long&gt; a = {0, 4, -2, 7, 1, 5};
    vector&lt;long long&gt; pref(n + 1, 0);

    // Tiền xử lý O(N): mỗi phần tử chỉ cộng đúng 1 lần
    for (int i = 1; i &lt;= n; i++) {
        pref[i] = pref[i - 1] + a[i];
    }

    // Truy vấn O(1): ngay cả khi l = 1, pref[1 - 1] = pref[0] = 0 hoàn toàn hợp lệ
    cout &lt;&lt; "Tong [1, 3] = " &lt;&lt; pref[3] - pref[0] &lt;&lt; '\\n';
    cout &lt;&lt; "Tong [2, 5] = " &lt;&lt; pref[5] - pref[2 - 1] &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Mảng cộng dồn 1D (<code>1D Prefix Sum</code> / <code>Cumulative Sum</code>):</strong> Mảng <code>pref[i]</code> lưu tổng tiền tố $a[1] + a[2] + \\dots + a[i]$. Chi phí dựng bảng $O(N)$, trả lời mỗi truy vấn tổng đoạn $[L, R]$ trong $O(1)$.</li>
                  <li><strong>Lính canh biên <code>pref[0] = 0</code> (<code>Sentinel</code>):</strong> Ô đệm ở đầu mảng để phép trừ <code>pref[r] - pref[l - 1]</code> không bao giờ chạm chỉ số âm khi $L = 1$.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Bẫy Tràn Số int Khi Cộng Dồn &amp; Ghép Prefix Sum Với std::sort / std::map',
            tag: 'Tràn số &amp; Mở rộng STL',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Mỗi tờ hóa đơn trong ngày có thể chỉ tối đa $10^9$ (vừa khít chiếc hộp <code>int</code> chứa tối đa $\\approx 2.14 \\cdot 10^9$). Nhưng khi gom tổng của $2 \\cdot 10^5$ ngày lại, số tiền lên tới $2 \\cdot 10^{14}$ — làm chiếc hộp <code>int</code> vỡ tung thành số âm vô nghĩa! Vì vậy <strong>mảng <code>pref</code> luôn phải khai báo <code>vector&lt;long long&gt;</code></strong>.</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Ghép với <code>std::sort</code> (<code>L1-05</code>):</strong> Nếu đề hỏi cả tổng đoạn trên mảng gốc lẫn tổng đoạn sau khi sắp xếp (như <em>Kuriyama Mirai's Stones</em>), chỉ cần tạo bản sao <code>b = a</code>, sắp xếp <code>sort(b.begin() + 1, b.end())</code> rồi dựng thêm mảng <code>pref2</code>!</li>
                  <li><strong>Ghép với <code>std::map</code> (<code>L1-06</code>) để đếm đoạn có tổng $= K$ khi có cả số âm:</strong> Một đoạn $[l, r]$ có tổng bằng $K$ khi và chỉ khi <code>pref[r] - pref[l - 1] == K</code>, tức là <strong><code>pref[l - 1] == pref[r] - K</code></strong>! Khi duyệt $r$ từ trái sang phải, ta chỉ cần tra trong <code>map&lt;long long, long long&gt;</code> xem giá trị <code>curPref - K</code> đã xuất hiện bao nhiêu lần trước đó (khởi tạo <code>mp[0] = 1</code> cho <code>pref[0]</code>, tránh <code>unordered_map</code> vì bẫy anti-hash!).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Đếm số đoạn con tổng bằng K (có số âm) bằng Prefix Sum + map</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;long long&gt; a = {2, -2, 2, 2, -2};
    long long target = 2;

    map&lt;long long, long long&gt; countPref;
    countPref[0] = 1; // Lưu pref[0] = 0 để không sót đoạn bắt đầu từ vị trí đầu

    long long curPref = 0, ans = 0;
    for (long long x : a) {
        curPref += x;
        long long need = curPref - target;
        if (countPref.count(need)) {
            ans += countPref[need];
        }
        countPref[curPref]++;
    }

    cout &lt;&lt; "So doan con tong bang " &lt;&lt; target &lt;&lt; ": " &lt;&lt; ans &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bẫy tràn số (<code>Integer Overflow</code>):</strong> Xảy ra khi từng phần tử nhỏ ($\\le 10^9$) nhưng tổng cộng dồn vượt quá $2^{31} - 1 \\approx 2.14 \\cdot 10^9$. Cách phòng chống triệt để: dùng <code>long long</code> cho mọi biến tổng và mảng cộng dồn.</li>
                  <li><strong>Biến đổi phương trình tiền tố:</strong> Chuyển bài toán tìm cặp chỉ số $(l, r)$ thỏa $S[r] - S[l - 1] = K$ thành bài toán tra cứu tần suất của $S[r] - K$ trong $O(\\log N)$ mỗi bước bằng <code>std::map</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_1d_bound',
            title: 'Phòng Thí Nghiệm 1A: Quên "- 1" Ở Cận Trái pref[r] - pref[l - 1]',
            desc: 'Tính tổng đoạn [2, 4] của dãy 1-based {10, 20, 30, 40, 50} (đáp án đúng là 20 + 30 + 40 = 90). Đổi công tắc để thấy hậu quả khi viết nhầm pref[r] - pref[l]!',
            toggles: [
              {
                key: 'boundMode',
                label: 'Công thức trừ cận trái',
                options: [
                  { value: 'ok', text: 'pref[r] - pref[l - 1] — Lấy trọn từ l đến r (AC)', kind: 'ok' },
                  { value: 'bug', text: 'pref[r] - pref[l] — Lệch 1 ô bên trái (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.boundMode === 'ok';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 5;
    vector<long long> a = {0, 10, 20, 30, 40, 50};
    vector<long long> pref(n + 1, 0);
    for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + a[i];
    int l = 2, r = 4;
    cout << pref[r] - pref[l - 1] << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 5;
    vector<long long> a = {0, 10, 20, 30, 40, 50};
    vector<long long> pref(n + 1, 0);
    for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + a[i];
    int l = 2, r = 4;
    cout << pref[r] - pref[l] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [12],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Trừ đúng pref[l - 1] = pref[1] = 10 nên giữ lại được a[2] = 20, ra 90!'
                  : 'SAI THUẬT TOÁN (WA): pref[4] - pref[2] trừ luôn cả a[2] = 20, khiến kết quả bị thiếu còn 70!',
                predictions: [
                  { text: 'Chương trình giữ lại phần tử a[2] = 20 nên tính đúng tổng đoạn [2, 4] bằng 90' },
                  { text: 'Chương trình trừ nhầm cả phần tử a[2] = 20 vào phần bỏ đi nên chỉ in ra 70' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n90'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n70',
                explain: isOk
                  ? 'pref[r] là tổng a[1..4] = 100. Muốn giữ lại từ vị trí l = 2 trở đi thì chỉ được cắt bỏ phần đứng trước l, tức là pref[l - 1] = pref[1] = 10 &rarr; 100 - 10 = 90.'
                  : 'pref[2] đã bao gồm cả a[1] + a[2] = 30. Khi lấy pref[4] - pref[2] = 100 - 30 = 70, bạn đã vô tình vứt mất đúng phần tử tại biên trái a[2]!'
              };
            }
          },
          {
            id: 'sb_1d_overflow',
            title: 'Phòng Thí Nghiệm 1B: Bẫy Tràn Kiểu int Khi Các Phần Tử Có Giá Trị 10^9',
            desc: 'Mỗi phần tử đều là 10^9 (nằm vừa trong int!). Thử cộng dồn 4 phần tử xem điều gì xảy ra nếu khai báo nhầm vector&lt;int&gt; pref thay vì vector&lt;long long&gt; pref!',
            toggles: [
              {
                key: 'typeMode',
                label: 'Kiểu dữ liệu của mảng cộng dồn pref',
                options: [
                  { value: 'll', text: 'vector&lt;long long&gt; pref — An toàn tới 9*10^18 (AC)', kind: 'ok' },
                  { value: 'int', text: 'vector&lt;int&gt; pref — Tràn 32-bit (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.typeMode === 'll';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 4;
    vector<int> a = {0, 1000000000, 1000000000, 1000000000, 1000000000};
    vector<long long> pref(n + 1, 0);
    for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + a[i];
    cout << pref[4] - pref[0] << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 4;
    vector<int> a = {0, 1000000000, 1000000000, 1000000000, 1000000000};
    vector<int> pref(n + 1, 0);
    for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + a[i];
    cout << pref[4] - pref[0] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [9],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): <code>vector&lt;long long&gt;</code> chứa gọn tổng 4000000000 không hề bị tràn!'
                  : 'TRÀN SỐ (WA): Tổng 4*10^9 vượt ngưỡng 2^31 - 1 của int nên quay vòng thành -294967296!',
                predictions: [
                  { text: 'Mảng pref kiểu long long giữ nguyên giá trị dương và in đúng 4000000000' },
                  { text: 'Mảng pref kiểu int bị tràn 32-bit ở phép cộng thứ 3 nên in ra số âm -294967296' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n4000000000'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n-294967296',
                explain: isOk
                  ? 'Trong các bài tập CP như CSES Static Range Sum Queries (N &lt;= 2*10^5, x_i &lt;= 10^9), từng phần tử chứa trong int nhưng tổng pref[i] lên tới 2*10^14, bắt buộc phải dùng long long.'
                  : 'Kiểu int 32-bit chỉ chứa tối đa 2,147,483,647. Khi pref[2] = 2*10^9 cộng thêm a[3] = 10^9 thành 3*10^9, bit dấu bị tràn làm giá trị lật sang âm và kéo sai luôn pref[4] thành -294967296!'
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
    vector<long long> a = {0, 5, -2, 8, 3, -4};
    vector<long long> pref(6, 0);
    for (int i = 1; i <= 5; i++) pref[i] = pref[i - 1] + a[i];
    cout << (pref[4] - pref[1]) << ' ' << (pref[3] - pref[0]) << '\\n';
    return 0;
}`,
            q: 'Chạy đoạn code dựng mảng cộng dồn 1-based trên dãy <code>a = {0, 5, -2, 8, 3, -4}</code>. Hai số in ra màn hình là gì?',
            options: [
              'In ra 14 11 vì câu truy vấn đầu cộng nhầm thêm cả phần tử a[1] bằng 5',
              'In ra 11 6 vì câu truy vấn thứ hai bỏ sót phần tử đầu tiên a[1] bằng 5',
              'In ra 9 11 vì pref[4] = 14 trừ pref[1] = 5 còn 9 và pref[3] = 11 trừ 0',
              'In ra 9 14 vì câu truy vấn thứ hai lấy nhầm cận phải tới vị trí thứ tư'
            ],
            correct: 2,
            explain: 'Bảng pref lần lượt là: pref[0] = 0, pref[1] = 5, pref[2] = 3, pref[3] = 11, pref[4] = 14, pref[5] = 10. Vậy pref[4] - pref[1] = 14 - 5 = 9 (tổng đoạn [2, 4]) và pref[3] - pref[0] = 11 - 0 = 11 (tổng đoạn [1, 3]).'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<long long> a = {3, -3, 3, 0};
    map<long long, long long> mp;
    mp[0] = 1;
    long long pref = 0, ans = 0, k = 3;
    for (long long x : a) {
        pref += x;
        if (mp.count(pref - k)) ans += mp[pref - k];
        mp[pref]++;
    }
    cout << ans << '\\n';
    return 0;
}`,
            q: 'Theo dõi biến <code>pref</code>, <code>mp</code> và <code>ans</code> khi đếm số đoạn con có tổng bằng <code>k = 3</code> trên dãy <code>{3, -3, 3, 0}</code>. Chương trình in ra số nào?',
            options: [
              'In ra 5 vì mỗi giá trị pref = 3 tìm thấy các tiền tố 0 xuất hiện trước đó',
              'In ra 3 vì chỉ đếm những đoạn con không chứa phần tử mang giá trị âm -3',
              'In ra 4 vì quên đếm đoạn đơn phần tử [1, 1] khi bỏ qua bước mp[0] = 1',
              'In ra 6 vì đếm trùng cả các tiền tố nằm ở phía sau vị trí hiện tại'
            ],
            correct: 0,
            explain: 'Khởi tạo mp[0] = 1. Bước 1 (x=3): pref=3, cần 0 &rarr; mp[0]=1 (ans=1), mp[3]=1. Bước 2 (x=-3): pref=0, cần -3 &rarr; không có, mp[0]=2. Bước 3 (x=3): pref=3, cần 0 &rarr; mp[0]=2 (ans=1+2=3), mp[3]=2. Bước 4 (x=0): pref=3, cần 0 &rarr; mp[0]=2 (ans=3+2=5), mp[3]=3. Kết quả: 5.'
          },
          {
            type: 'single',
            q: 'Vì sao khi cài đặt mảng cộng dồn 1D trong CP, ta thường khai báo <code>vector&lt;long long&gt; pref(n + 1, 0)</code> và lưu dữ liệu từ chỉ số <code>1</code> đến <code>n</code>?',
            options: [
              'Để giảm một nửa bộ nhớ sử dụng so với cách đánh chỉ số từ 0 trong mọi trường hợp',
              'Để trình biên dịch C++ tự động chuyển kiểu dữ liệu của mọi phần tử sang long long',
              'Để mảng cộng dồn tự động sắp xếp lại theo thứ tự tăng dần ngay sau vòng lặp',
              'Để công thức pref[r] - pref[l - 1] không cần viết nhánh riêng khi l bằng 1'
            ],
            correct: 3,
            explain: 'Khi dùng 1-based với lính canh pref[0] = 0, lúc truy vấn đoạn bắt đầu từ l = 1 thì chỉ số l - 1 = 0 hoàn toàn hợp lệ và trả về đúng pref[r] - 0 = pref[r], không cần viết rẽ nhánh if (l == 1) và tránh đọc nhầm chỉ số -1.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về Mảng cộng dồn 1D (1D Prefix Sum)?',
            options: [
              'Có thể tính tổng mọi đoạn [l, r] trong O(1) sau bước tiền xử lý mất O(N)',
              'Áp dụng chính xác ngay cả khi dãy ban đầu chứa nhiều số âm hoặc số 0',
              'Bắt buộc dùng kiểu long long nếu N tới 2*10^5 và phần tử đạt mức 10^9',
              'Có thể tăng một phần tử a[i] bất kỳ lên +v rồi cập nhật lại trong O(1)'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều đúng. D sai hoàn toàn: nếu thay đổi a[i], mọi giá trị từ pref[i] đến pref[n] đều bị ảnh hưởng nên phải mất O(N) để cập nhật lại trên mảng cộng dồn tĩnh!'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: MẢNG CỘNG DỒN 2D & BAO HÀM - LOẠI TRỪ
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Mảng Cộng Dồn 2D',
        title: 'Vấn Đề Nhỏ 2: Mảng Cộng Dồn 2D &amp; Công Thức Bao Hàm - Loại Trừ',
        lead: 'Mở rộng ý tưởng cộng dồn lên ma trận $N \\times M$: xây bảng $P[i][j]$ trong $O(N \\cdot M)$ và tính tổng mọi hình chữ nhật con $(r_1, c_1) \\dots (r_2, c_2)$ trong đúng $O(1)$ mà không bị cộng đúp hay trừ đúp vùng giao chéo.',
        subproblem: {
          title: 'Làm sao tính tổng một hình chữ nhật con $(r_1, c_1) \\dots (r_2, c_2)$ trên bảng $1000 \\times 1000$ trong $O(1)$ qua $2 \\cdot 10^5$ truy vấn?',
          desc: 'Chạy 2 vòng <code>for</code> từ $r_1..r_2$ và $c_1..c_2$ cho mỗi truy vấn tốn tới $2 \\cdot 10^5 \\times 10^6 = 2 \\cdot 10^{11}$ phép tính (TLE nặng!). Ta lưu sẵn tổng mọi hình chữ nhật tính từ góc $(1, 1)$ vào <code>pref[i][j]</code> rồi dùng nguyên lý Bao hàm - Loại trừ.'
        },
        cards: [
          {
            heading: 'Dựng Bảng pref[i][j]: Cộng Trên, Cộng Trái, Trừ Phần Giao Bị Đếm Đúp',
            tag: 'Tiền xử lý O(N*M)',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tưởng tượng bạn cần đếm tổng số hạt thóc nằm trong hình chữ nhật tính từ góc trên-trái <code>(1, 1)</code> đến ô <code>(i, j)</code> (ký hiệu là <code>P[i][j]</code>). Thay vì đếm lại từng ô từ đầu, bạn trải 2 tấm thảm đã biết tổng:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Tấm thảm phía trên <code>P[i - 1][j]</code> phủ trọn từ hàng $1$ đến $i - 1$, cột $1$ đến $j$.</li>
                  <li>Tấm thảm bên trái <code>P[i][j - 1]</code> phủ trọn từ hàng $1$ đến $i$, cột $1$ đến $j - 1$.</li>
                  <li>Khi cộng <code>a[i][j] + P[i - 1][j] + P[i][j - 1]</code>, hãy nhìn vào góc trên-trái <code>(1, 1)..(i - 1, j - 1)</code>: cả hai tấm thảm đều phủ lên nó, nên vùng <code>P[i - 1][j - 1]</code> đã bị đếm <strong>2 lần</strong>! Ta bắt buộc phải <strong>trừ lại đúng 1 lần <code>- P[i - 1][j - 1]</code></strong>.</li>
                  <li>Nhờ cấp phát <code>(n + 1) x (m + 1)</code> khởi tạo bằng <code>0</code>, hàng $0$ và cột $0$ đều bằng $0$ nên không cần xét riêng biên $i = 1$ hay $j = 1$!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Xây bảng Mảng cộng dồn 2D chuẩn C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 3, m = 3;
    vector&lt;vector&lt;long long&gt;&gt; a = {
        {0, 0, 0, 0},
        {0, 1, 2, 1},
        {0, 3, 1, 2},
        {0, 2, 0, 4}
    };

    // Hàng 0 và cột 0 bằng 0 đóng vai trò lính canh biên
    vector&lt;vector&lt;long long&gt;&gt; pref(n + 1, vector&lt;long long&gt;(m + 1, 0));
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            pref[i][j] = a[i][j] + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
        }
    }

    cout &lt;&lt; "pref[2][2] = " &lt;&lt; pref[2][2] &lt;&lt; ", pref[3][3] = " &lt;&lt; pref[3][3] &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Mảng cộng dồn 2D (<code>2D Prefix Sum</code>):</strong> Mỗi ô <code>pref[i][j]</code> lưu tổng toàn bộ phần tử trong hình chữ nhật từ <code>(1, 1)</code> đến <code>(i, j)</code>, dựng trong thời gian và bộ nhớ $O(N \\cdot M)$.</li>
                  <li><strong>Trừ vùng đếm đúp (<code>- pref[i - 1][j - 1]</code>):</strong> Bước loại trừ phần giao của hai vùng chữ nhật liền kề khi ghép bảng.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Cắt Hình Chữ Nhật (r1, c1)..(r2, c2) Trong O(1) — Cộng Bù Góc Bị Trừ Kép',
            tag: 'Bao hàm - Loại trừ',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Bây giờ ta muốn cắt riêng mảnh giấy hình chữ nhật có góc trên-trái <code>(r1, c1)</code> và góc dưới-phải <code>(r2, c2)</code> từ tờ giấy lớn <code>P[r2][c2]</code>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Dùng kéo cắt bỏ dải thừa phía trên gồm các hàng $1 \\dots r_1 - 1$: trừ đi <code>P[r1 - 1][c2]</code>.</li>
                  <li>Cắt tiếp dải thừa bên trái gồm các cột $1 \\dots c_1 - 1$: trừ đi <code>P[r2][c1 - 1]</code>.</li>
                  <li><strong>Chú ý vùng góc trên-trái <code>(1, 1)..(r1 - 1, c1 - 1)</code>:</strong> Mảnh góc này nằm trong <em>cả hai dải vừa cắt</em>, tức là nó đã bị trừ tới <strong>2 lần</strong>! Muốn kết quả cân bằng lại, bắt buộc phải <strong>cộng trả lại <code>+ P[r1 - 1][c1 - 1]</code></strong>!</li>
                  <li><strong>Mẹo nhớ nhanh chống nhầm dấu:</strong> Khi <strong>dựng bảng</strong> thì <code>+ trên + trái - góc chéo</code>; còn khi <strong>truy vấn</strong> thì ngược lại: <code>lớn - trên - trái + góc chéo</code>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Truy vấn hình chữ nhật 2D trong O(1) (kiểu Forest Queries)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 4, m = 4;
    vector&lt;string&gt; grid = {"", " .*..", " *..*", " **.*", " ...."};
    // Đánh số 1-based cho hàng 1..4 và cột 1..4 (bỏ qua ký tự đầu mỗi chuỗi mẫu)
    vector&lt;vector&lt;long long&gt;&gt; pref(n + 1, vector&lt;long long&gt;(m + 1, 0));
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            long long hasTree = (grid[i][j] == '*') ? 1 : 0;
            pref[i][j] = hasTree + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
        }
    }

    int r1 = 2, c1 = 1, r2 = 3, c2 = 3;
    long long trees = pref[r2][c2] - pref[r1 - 1][c2] - pref[r2][c1 - 1] + pref[r1 - 1][c1 - 1];
    cout &lt;&lt; "So cay trong (2,1)..(3,3) = " &lt;&lt; trees &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Nguyên lý Bao hàm - Loại trừ (<code>Inclusion-Exclusion Principle</code>):</strong> Khi bỏ đi hai phần giao nhau (<code>- P[r1-1][c2] - P[r2][c1-1]</code>), phần giao của chúng bị trừ hai lần nên phải bù lại đúng một lần (<code>+ P[r1-1][c1-1]</code>).</li>
                  <li><strong>Độ phức tạp tổng thể:</strong> Với bảng $N \\times M$ và $Q$ truy vấn, tổng thời gian chỉ là $O(N \\cdot M + Q)$ — xử lý nhẹ nhàng $1000 \\times 1000$ với $2 \\cdot 10^5$ truy vấn trong chưa tới $0.1$ giây!</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_2d_build',
            title: 'Phòng Thí Nghiệm 2A: Quên "- pref[i - 1][j - 1]" Khi Xây Bảng Cộng Dồn 2D',
            desc: 'Xây bảng cộng dồn 2D trên lưới 3x3 toàn số 1 (kết quả đúng tại pref[2][2] = 4 và pref[3][3] = 9). Thử bỏ phần trừ góc chéo xem sai số phình to ra sao!',
            toggles: [
              {
                key: 'buildMode',
                label: 'Công thức dựng ô pref[i][j]',
                options: [
                  { value: 'ok', text: '+ pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1] (AC)', kind: 'ok' },
                  { value: 'bug', text: '+ pref[i-1][j] + pref[i][j-1] (Quên trừ góc chéo — WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.buildMode === 'ok';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3;
    vector<vector<long long>> a(n + 1, vector<long long>(n + 1, 1));
    vector<vector<long long>> pref(n + 1, vector<long long>(n + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            pref[i][j] = a[i][j] + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
        }
    }
    cout << "pref[2][2]=" << pref[2][2] << " pref[3][3]=" << pref[3][3] << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3;
    vector<vector<long long>> a(n + 1, vector<long long>(n + 1, 1));
    vector<vector<long long>> pref(n + 1, vector<long long>(n + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            pref[i][j] = a[i][j] + pref[i - 1][j] + pref[i][j - 1];
        }
    }
    cout << "pref[2][2]=" << pref[2][2] << " pref[3][3]=" << pref[3][3] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [12],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Trừ đúng góc giao nên pref[2][2] = 4 và pref[3][3] = 9!'
                  : 'SAI THUẬT TOÁN (WA): Ô (1, 1) bị cộng đúp liên hoàn khiến pref[2][2] = 5 và pref[3][3] phình lên tới 19!',
                predictions: [
                  { text: 'Mọi ô pref[i][j] đếm đúng số ô trong hình chữ nhật nên in ra pref[2][2]=4 pref[3][3]=9' },
                  { text: 'Phần giao trên-trái bị cộng đúp nhiều lần nên kết quả phình thành pref[2][2]=5 pref[3][3]=19' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\npref[2][2]=4 pref[3][3]=9'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\npref[2][2]=5 pref[3][3]=19',
                explain: isOk
                  ? 'Khi dựng pref[2][2], pref[1][2] = 2 và pref[2][1] = 2 đều chứa ô (1, 1). Trừ đi pref[1][1] = 1 đưa 1 + 2 + 2 - 1 về đúng 4.'
                  : 'Vì thiếu - pref[i - 1][j - 1], ô (1, 1) bị cộng 2 lần ở pref[2][2], rồi lại tiếp tục nhân đôi qua pref[2][3], pref[3][2] đến pref[3][3] tạo ra sai số dây chuyền 19 thay vì 9!'
              };
            }
          },
          {
            id: 'sb_2d_query',
            title: 'Phòng Thí Nghiệm 2B: Quên "+ pref[r1 - 1][c1 - 1]" Khi Truy Vấn Hình Chữ Nhật',
            desc: 'Truy vấn hình chữ nhật (2, 2)..(3, 3) trên lưới 3x3 toàn số 1 (kết quả đúng gồm 4 ô nên tổng bằng 4). Đổi công tắc để kiểm chứng hậu quả khi quên cộng bù góc chéo!',
            toggles: [
              {
                key: 'queryMode',
                label: 'Công thức cắt hình chữ nhật (r1, c1)..(r2, c2)',
                options: [
                  { value: 'ok', text: 'Bù lại + pref[r1-1][c1-1] ở cuối công thức (AC)', kind: 'ok' },
                  { value: 'bug', text: 'Quên + pref[r1-1][c1-1] — Bị trừ 2 lần góc chéo (WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.queryMode === 'ok';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3;
    vector<vector<long long>> a(n + 1, vector<long long>(n + 1, 1));
    vector<vector<long long>> pref(n + 1, vector<long long>(n + 1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            pref[i][j] = a[i][j] + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
    int r1 = 2, c1 = 2, r2 = 3, c2 = 3;
    long long ans = pref[r2][c2] - pref[r1 - 1][c2] - pref[r2][c1 - 1] + pref[r1 - 1][c1 - 1];
    cout << ans << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 3;
    vector<vector<long long>> a(n + 1, vector<long long>(n + 1, 1));
    vector<vector<long long>> pref(n + 1, vector<long long>(n + 1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            pref[i][j] = a[i][j] + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
    int r1 = 2, c1 = 2, r2 = 3, c2 = 3;
    long long ans = pref[r2][c2] - pref[r1 - 1][c2] - pref[r2][c1 - 1];
    cout << ans << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [14],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Cộng bù pref[1][1] = 1 nên 9 - 3 - 3 + 1 = 4!'
                  : 'SAI THUẬT TOÁN (WA): Ô (1, 1) nằm ở cả dải trên lẫn dải trái bị trừ 2 lần nên chỉ còn 9 - 3 - 3 = 3!',
                predictions: [
                  { text: 'Chương trình bù lại phần bị trừ kép ở góc (1, 1) nên in đúng đáp án bằng 4' },
                  { text: 'Chương trình trừ ô (1, 1) tới hai lần mà không cộng bù nên chỉ in ra 3' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n4'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n3',
                explain: isOk
                  ? 'pref[3][3] = 9, dải trên pref[1][3] = 3, dải trái pref[3][1] = 3. Khi trừ cả hai, ô (1, 1) bị rút ra hai lần nên + pref[1][1] = +1 trả kết quả về đúng 4.'
                  : 'Vì thiếu + pref[1][1], công thức tính thành 9 - 3 - 3 = 3, thiếu đúng phần giao (1, 1)..(1, 1).'
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
    int a[4][4] = {
        {0, 0, 0, 0},
        {0, 1, 2, 1},
        {0, 3, 1, 2},
        {0, 2, 0, 4}
    };
    long long p[4][4] = {};
    for (int i = 1; i <= 3; i++)
        for (int j = 1; j <= 3; j++)
            p[i][j] = a[i][j] + p[i - 1][j] + p[i][j - 1] - p[i - 1][j - 1];
    cout << p[2][2] << ' ' << p[3][2] << '\\n';
    return 0;
}`,
            q: 'Theo dõi quá trình dựng mảng cộng dồn 2D <code>p[i][j]</code> trên ma trận 3x3 trên. Hai giá trị in ra là gì?',
            options: [
              'In ra 8 10 vì ô p[1][1] bị đếm hai lần khi tính p[2][2]',
              'In ra 7 9 vì p[2][2] = 1+2+3+1 và p[3][2] cộng thêm hàng 3 cột 1..2',
              'In ra 6 9 vì phần tử a[2][2] = 1 bị bỏ qua trong bước cộng hàng',
              'In ra 7 11 vì p[3][2] cộng thêm cả giá trị ở cột thứ ba hàng 2'
            ],
            correct: 1,
            explain: 'p[2][2] là tổng hình chữ nhật (1,1)..(2,2) = 1 + 2 + 3 + 1 = 7. Tương tự p[3][2] là tổng hình chữ nhật (1,1)..(3,2) = 7 + 2 + 0 = 9. Kết quả in ra: 7 9.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int a[4][4] = {
        {0, 0, 0, 0},
        {0, 2, 1, 3},
        {0, 4, 5, 1},
        {0, 1, 2, 6}
    };
    long long p[4][4] = {};
    for (int i = 1; i <= 3; i++)
        for (int j = 1; j <= 3; j++)
            p[i][j] = a[i][j] + p[i - 1][j] + p[i][j - 1] - p[i - 1][j - 1];
    long long ans = p[3][3] - p[1][3] - p[3][1] + p[1][1];
    cout << ans << '\\n';
    return 0;
}`,
            q: 'Biểu thức <code>p[3][3] - p[1][3] - p[3][1] + p[1][1]</code> truy vấn đúng hình chữ nhật con nào và in ra giá trị bao nhiêu?',
            options: [
              'Truy vấn vùng (1, 1)..(2, 2) của ma trận và in ra kết quả bằng 12',
              'Truy vấn vùng (2, 2)..(3, 3) nhưng thiếu ô a[3][3] nên in ra 8',
              'Truy vấn vùng (2, 1)..(3, 3) gồm 6 phần tử nên in ra kết quả bằng 19',
              'Truy vấn vùng (2, 2)..(3, 3) gồm 5, 1, 2, 6 và in ra kết quả bằng 14'
            ],
            correct: 3,
            explain: 'Với r1 = 2, c1 = 2, r2 = 3, c2 = 3, công thức là p[3][3] - p[1][3] - p[3][1] + p[1][1]. Ta có p[3][3] = 25, p[1][3] = 6, p[3][1] = 7, p[1][1] = 2 &rarr; 25 - 6 - 7 + 2 = 14 (đúng bằng 5 + 1 + 2 + 6 = 14).'
          },
          {
            type: 'single',
            q: 'Trong công thức truy vấn hình chữ nhật 2D <code>P[r2][c2] - P[r1 - 1][c2] - P[r2][c1 - 1] + P[r1 - 1][c1 - 1]</code>, vì sao phải mang dấu <strong>cộng</strong> ở hạng tử cuối <code>P[r1 - 1][c1 - 1]</code>?',
            options: [
              'Vì vùng P[r1 - 1][c1 - 1] vốn bị bỏ sót chưa từng có mặt trong P[r2][c2]',
              'Vì khi cắt mảng 1-based ta cần bù thêm 1 đơn vị cho mỗi dòng đã trừ trước đó',
              'Vì vùng góc trên-trái đó nằm trong cả hai dải vừa trừ nên đã bị trừ mất 2 lần',
              'Vì tổng 2D chỉ đếm phần biên ngoài của hình chữ nhật nếu thiếu hạng tử góc'
            ],
            correct: 2,
            explain: 'Hai hình chữ nhật thừa cần cắt là P[r1 - 1][c2] (dải trên) và P[r2][c1 - 1] (dải trái). Phần giao của hai dải này chính là hình chữ nhật P[r1 - 1][c1 - 1], nên nó bị trừ đi 2 lần và cần cộng bù 1 lần để cân bằng.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về Mảng cộng dồn 2D (2D Prefix Sum)?',
            options: [
              'Cấp phát bảng (n + 1) x (m + 1) bằng 0 giúp truy vấn chạm biên không cần rẽ nhánh',
              'Chỉ cần dùng công thức cộng cùng một dấu ở cả bước dựng bảng lẫn bước truy vấn',
              'Thời gian dựng bảng là O(N * M) và trả lời mỗi truy vấn hình chữ nhật là O(1)',
              'Nếu mỗi ô đạt giá trị 10^9 với N, M = 1000 thì phải dùng long long tránh tràn'
            ],
            correct: [0, 2, 3],
            explain: 'A, C và D đều đúng. B sai hoàn toàn: bước dựng bảng phải TRỪ góc chéo (- pref[i - 1][j - 1]), còn bước truy vấn phải CỘNG góc chéo (+ pref[r1 - 1][c1 - 1]).'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: MẢNG HIỆU 1D (1D DIFFERENCE ARRAY)
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Mảng Hiệu 1D',
        title: 'Vấn Đề Nhỏ 3: Mảng Hiệu 1D (Difference Array) — Cập Nhật Đoạn Trong $O(1)$',
        lead: 'Khi cần thực hiện $Q = 2 \\cdot 10^5$ lượt cộng thêm $v$ vào cả đoạn $[L, R]$ rồi mới đọc mảng cuối, hãy đánh dấu 2 điểm mút <code>diff[L] += v</code> và <code>diff[R + 1] -= v</code> trên mảng cỡ <code>n + 2</code> trong $O(1)$ mỗi lượt và cộng dồn một lần duy nhất ở cuối trong $O(N)$.',
        subproblem: {
          title: 'Làm sao xử lý $Q = 2 \\cdot 10^5$ lần tăng cả đoạn $[L, R]$ thêm $v$ trên dãy dài $N = 2 \\cdot 10^5$ trong $O(N + Q)$ mà không bị Out-of-Bounds ở <code>R + 1</code>?',
          desc: 'Cập nhật từng ô từ $L$ đến $R$ bằng vòng <code>for</code> mất $O(Q \\cdot N)$ (TLE!), còn Mảng cộng dồn tĩnh cũng không sửa hàng loạt trong $O(1)$ được. Ta đảo ngược quy trình: lưu sự chênh lệch vào Mảng hiệu <code>diff</code> cỡ <code>n + 2</code> rồi cộng dồn 1 lượt sau cùng.'
        },
        cards: [
          {
            heading: 'Sổ Xe Buýt: +v Lên Xe Ở Trạm L, -v Xuống Xe Tại Trạm R + 1 &amp; Cỡ Mảng n + 2',
            tag: 'Cập nhật đoạn O(1)',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tưởng tượng một tuyến xe buýt đi qua các trạm $1, 2, \\dots, N$. Có $Q$ đoàn khách, mỗi đoàn gồm $v$ người <strong>lên xe ở trạm $L$</strong>, ngồi xuyên suốt qua các trạm $L, L+1, \\dots, R$, rồi <strong>xuống xe ngay sau khi qua trạm $R$ — tức tại trạm $R + 1$</strong>.</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Thay vì phải ghi số $+v$ vào danh sách của từng trạm từ $L$ tới $R$ (tốn $O(N)$ mỗi đoàn), bác tài chỉ ghi đúng <strong>2 dòng biến động</strong> vào sổ <code>diff</code>: <code>diff[L] += v</code> và <code>diff[R + 1] -= v</code>!</li>
                  <li><strong>Vì sao bắt buộc cấp phát <code>diff(n + 2, 0)</code>?</strong> Nếu một đoàn khách ngồi tới trạm cuối cùng $R = N$, trạm để đánh dấu họ xuống xe là <code>R + 1 = N + 1</code>! Nếu bạn lỡ khai báo <code>diff(n + 1, 0)</code> (chỉ có chỉ số <code>0..n</code>), lệnh <code>diff[n + 1] -= v</code> sẽ đâm thủng ra ngoài mảng (<strong>Out-of-Bounds / Runtime Error</strong>)! Khai báo <code>n + 2</code> bảo đảm chỉ số <code>n + 1</code> luôn an toàn tuyệt đối.</li>
                  <li><strong>Khôi phục mảng cuối cùng:</strong> Sau khi nhận đủ $Q$ đoàn, chạy đúng 1 vòng <code>for</code> từ $1$ đến $N$: tích lũy <code>curAdd += diff[i];</code> rồi cộng vào mảng gốc <code>a[i] += curAdd;</code>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Cài đặt Mảng hiệu 1D chuẩn C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 5;
    vector&lt;long long&gt; a = {0, 10, 20, 30, 40, 50};
    // Bắt buộc cỡ (n + 2) để diff[r + 1] hợp lệ cả khi r == n!
    vector&lt;long long&gt; diff(n + 2, 0);

    vector&lt;pair&lt;pair&lt;int, int&gt;, long long&gt;&gt; updates = {
        {{1, 3}, 5},
        {{2, 5}, 10} // r = 5 == n -&gt; ghi vào diff[6] hoàn toàn an toàn!
    };

    for (const auto&amp; op : updates) {
        int l = op.first.first, r = op.first.second;
        long long v = op.second;
        diff[l] += v;
        diff[r + 1] -= v;
    }

    long long curAdd = 0;
    for (int i = 1; i &lt;= n; i++) {
        curAdd += diff[i];
        a[i] += curAdd;
        cout &lt;&lt; a[i] &lt;&lt; (i == n ? '\\n' : ' ');
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Mảng hiệu (<code>Difference Array</code>):</strong> Lưu độ chênh lệch thay đổi tại từng điểm mút; mỗi lần tăng đoạn $[L, R]$ tốn $O(1)$ và bước cộng dồn cuối cùng khôi phục toàn bộ $N$ phần tử trong $O(N)$ (tổng $O(N + Q)$).</li>
                  <li><strong>An toàn biên <code>n + 2</code>:</strong> Dự phòng sẵn ô chỉ số <code>n + 1</code> cho thao tác <code>diff[r + 1] -= v</code> khi <code>r = n</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Khi Nào Dùng Mảng Cộng Dồn vs Mảng Hiệu? &amp; Cách Ghép Đôi Cực Mạnh',
            tag: 'Đối chiếu &amp; Kết hợp',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Học sinh mới học rất dễ phân vân khi đọc đề: lúc nào dùng Mảng cộng dồn, lúc nào dùng Mảng hiệu? Hãy nhìn vào <strong>những gì xảy ra lặp đi lặp lại trong đề bài</strong>:</p>
                <table style="width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 13.5px;">
                  <thead>
                    <tr style="border-bottom: 1px solid var(--border); text-align: left;">
                      <th style="padding: 6px;">Đặc điểm đề bài</th>
                      <th style="padding: 6px;">Mảng cộng dồn (Prefix Sum)</th>
                      <th style="padding: 6px;">Mảng hiệu (Difference Array)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid var(--border);">
                      <td style="padding: 6px;"><strong>Dữ liệu dãy số</strong></td>
                      <td style="padding: 6px;">Tĩnh (không sửa đổi giữa chừng)</td>
                      <td style="padding: 6px;">Chịu hàng loạt lệnh cộng đoạn $[L, R]$</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                      <td style="padding: 6px;"><strong>Thao tác tốn $O(1)$</strong></td>
                      <td style="padding: 6px;">Hỏi tổng một đoạn $[L, R]$</td>
                      <td style="padding: 6px;">Cộng thêm $v$ vào cả đoạn $[L, R]$</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px;"><strong>Thời điểm quét $O(N)$</strong></td>
                      <td style="padding: 6px;">Làm <strong>trước</strong> (xây bảng trước khi hỏi)</td>
                      <td style="padding: 6px;">Làm <strong>sau</strong> (cộng dồn sau khi cập nhật hết)</td>
                    </tr>
                  </tbody>
                </table>
                <p><strong>Tuyệt chiêu ghép đôi (như bài <em>Karen and Coffee</em>):</strong> Đề cho $N$ công thức pha chế (mỗi công thức phủ đoạn nhiệt độ $[L, R]$), sau đó hỏi $Q$ lần xem trong đoạn $[a, b]$ có bao nhiêu mức nhiệt độ xuất hiện $\\ge K$ lần. Vì <strong>toàn bộ cập nhật diễn ra trước toàn bộ truy vấn</strong>, ta chạy <strong>Mảng hiệu</strong> đánh dấu $+1/-1$ $\\rightarrow$ <strong>Cộng dồn lần 1</strong> ra tần suất từng nhiệt độ $\\rightarrow$ đánh dấu <code>1/0</code> nếu $\\ge K$ $\\rightarrow$ <strong>Cộng dồn lần 2</strong> để trả lời mỗi truy vấn $[a, b]$ trong $O(1)$!</p>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Đường ống Mảng hiệu -&gt; Cộng dồn 1 -&gt; Cộng dồn 2</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int maxX = 8, k = 2;
    vector&lt;pair&lt;int, int&gt;&gt; segs = {{1, 4}, {3, 7}, {4, 8}};

    vector&lt;int&gt; diff(maxX + 2, 0);
    for (const auto&amp; s : segs) {
        diff[s.first]++;
        diff[s.second + 1]--;
    }

    vector&lt;int&gt; prefValid(maxX + 1, 0);
    int curCover = 0;
    for (int i = 1; i &lt;= maxX; i++) {
        curCover += diff[i]; // Cộng dồn lần 1: số đoạn phủ qua i
        prefValid[i] = prefValid[i - 1] + (curCover &gt;= k ? 1 : 0); // Cộng dồn lần 2
    }

    cout &lt;&lt; "So vi tri phu &gt;= 2 lan trong [2, 6] = " &lt;&lt; prefValid[6] - prefValid[1] &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cặp phép biến đổi nghịch đảo:</strong> Cộng dồn của Mảng hiệu khôi phục lại dãy giá trị; ngược lại, lấy hiệu hai phần tử kề nhau trên Mảng cộng dồn khôi phục lại dãy gốc.</li>
                  <li><strong>Mô hình xử lý ngoại tuyến (<code>Offline Batching</code>):</strong> Gom toàn bộ cập nhật làm xong xuôi bằng Mảng hiệu rồi mới dùng Mảng cộng dồn trả lời câu hỏi, tất cả chỉ mất $O(N + Q)$!</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_diff_right',
            title: 'Phòng Thí Nghiệm 3A: Ghi Nhầm diff[r] -= v Thay Vì diff[r + 1] -= v',
            desc: 'Tăng đoạn [2, 4] của dãy 5 số 0 lên thêm 10 (kết quả đúng phải là 0 10 10 10 0). Thử xem lỗi gì xảy ra nếu ghi nhầm dấu trừ ngay tại vị trí r thay vì r + 1!',
            toggles: [
              {
                key: 'endMode',
                label: 'Vị trí đặt dấu trừ kết thúc đoạn [l, r]',
                options: [
                  { value: 'ok', text: 'diff[r + 1] -= v — Kết thúc sau r (AC)', kind: 'ok' },
                  { value: 'bug', text: 'diff[r] -= v — Trừ sớm ngay tại r (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.endMode === 'ok';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 5;
    vector<long long> diff(n + 2, 0);
    int l = 2, r = 4;
    long long v = 10;
    diff[l] += v;
    diff[r + 1] -= v;
    long long cur = 0;
    for (int i = 1; i <= n; i++) {
        cur += diff[i];
        cout << cur << (i == n ? '\\n' : ' ');
    }
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 5;
    vector<long long> diff(n + 2, 0);
    int l = 2, r = 4;
    long long v = 10;
    diff[l] += v;
    diff[r] -= v;
    long long cur = 0;
    for (int i = 1; i <= n; i++) {
        cur += diff[i];
        cout << cur << (i == n ? '\\n' : ' ');
    }
    return 0;
}`;
              return {
                code,
                changedLines: [12],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Giữ nguyên +10 qua vị trí 2, 3, 4 và chỉ triệt tiêu tại vị trí 5!'
                  : 'SAI THUẬT TOÁN (WA): Triệt tiêu ngay tại vị trí 4 nên phần tử thứ 4 bị mất +10, chỉ còn 0 10 10 0 0!',
                predictions: [
                  { text: 'Giá trị +10 kéo dài đủ qua cả ba vị trí 2, 3, 4 nên in ra 0 10 10 10 0' },
                  { text: 'Giá trị +10 bị triệt tiêu sớm tại vị trí 4 nên chỉ in ra 0 10 10 0 0' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n0 10 10 10 0'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n0 10 10 0 0',
                explain: isOk
                  ? 'Đoạn [l, r] có nghĩa là phần tử r vẫn nằm TRONG đoạn được cộng. Chỉ từ phần tử r + 1 trở đi mới thoát ra ngoài đoạn nên dấu -v phải đặt tại r + 1.'
                  : 'Khi đặt diff[4] -= 10, lúc biến cur chạy tới i = 4 thì cur cộng ngay -10 về lại 0, làm biến mất phần thưởng của đúng vị trí r = 4 (thực tế đã cập nhật nửa khoảng [l, r) chứ không phải [l, r]).'
              };
            }
          },
          {
            id: 'sb_diff_reconstruct',
            title: 'Phòng Thí Nghiệm 3B: Quên Cộng Dồn Khôi Phục Mảng Hiệu Ở Bước Cuối',
            desc: 'Dãy gốc a = {1, 2, 3, 4, 5}, thực hiện 1 lệnh cộng đoạn [2, 4] thêm 10 (đáp án đúng: 1 12 13 14 5). Quan sát hậu quả nếu quên biến cộng dồn cur mà in thẳng a[i] + diff[i]!',
            toggles: [
              {
                key: 'reconMode',
                label: 'Cách in kết quả cuối từ mảng hiệu diff',
                options: [
                  { value: 'ok', text: 'cur += diff[i]; cout &lt;&lt; a[i] + cur (AC)', kind: 'ok' },
                  { value: 'bug', text: 'In thẳng a[i] + diff[i] không cộng dồn (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.reconMode === 'ok';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 5;
    vector<long long> a = {0, 1, 2, 3, 4, 5}, diff(n + 2, 0);
    diff[2] += 10; diff[4 + 1] -= 10;
    long long cur = 0;
    for (int i = 1; i <= n; i++) {
        cur += diff[i];
        cout << a[i] + cur << (i == n ? '\\n' : ' ');
    }
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 5;
    vector<long long> a = {0, 1, 2, 3, 4, 5}, diff(n + 2, 0);
    diff[2] += 10; diff[4 + 1] -= 10;
    for (int i = 1; i <= n; i++) {
        cout << a[i] + diff[i] << (i == n ? '\\n' : ' ');
    }
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [10, 12, 13] : [11],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Cộng dồn cur giúp truyền +10 xuyên suốt [2, 4] và ra đúng 1 12 13 14 5!'
                  : 'SAI THUẬT TOÁN (WA): Không cộng dồn khiến vị trí 3, 4 không nhận được +10 còn vị trí 5 bị trừ -10 thành -5!',
                predictions: [
                  { text: 'Biến cộng dồn cur truyền đều +10 qua các ô 2, 3, 4 nên in ra 1 12 13 14 5' },
                  { text: 'Chỉ vị trí 2 được cộng 10 và vị trí 5 bị trừ 10 nên in ra 1 12 3 4 -5' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1 12 13 14 5'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1 12 3 4 -5',
                explain: isOk
                  ? 'diff[i] chỉ lưu sự THAY ĐỔI tại mốc i chứ không phải tổng lượng tăng tại i. Muốn ra tổng lượng tăng thực tế tại i, ta bắt buộc phải cộng dồn cur += diff[i] từ 1 đến n.'
                  : 'Vì bỏ qua bước cộng dồn, diff[2] = +10 chỉ ảnh hưởng mỗi a[2], a[3] và a[4] giữ nguyên (diff bằng 0), còn a[5] = 5 cộng với diff[5] = -10 cho kết quả sai -5!'
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
    int n = 5;
    vector<long long> diff(n + 2, 0);
    diff[1] += 4; diff[4] -= 4;
    diff[2] += 2; diff[6] -= 2;
    diff[3] -= 1; diff[5] += 1;
    long long cur = 0;
    for (int i = 1; i <= n; i++) {
        cur += diff[i];
        cout << cur << (i == n ? '\\n' : ' ');
    }
    return 0;
}`,
            q: 'Thực hiện 3 thao tác mảng hiệu lần lượt cho các đoạn <code>[1, 3] (+4)</code>, <code>[2, 5] (+2)</code> và <code>[3, 4] (-1)</code> trên dãy 5 số 0. Dãy in ra cuối cùng là gì?',
            options: [
              'In ra 4 6 5 1 2 vì phần tử 3 nhận +4 +2 -1 và phần tử 5 nhận +2',
              'In ra 4 6 5 2 2 vì thao tác giảm -1 vẫn tiếp tục tác động lên vị trí 5',
              'In ra 4 2 -1 0 1 vì vòng lặp quên cộng dồn mà in thẳng giá trị diff',
              'In ra 4 6 7 2 0 vì vị trí 5 bị trừ đi 2 do diff[6] bị truy cập quá sớm'
            ],
            correct: 0,
            explain: 'Sau 3 thao tác: diff[1]=4, diff[2]=2, diff[3]=-1, diff[4]=-4, diff[5]=1, diff[6]=-2. Cộng dồn từ 1 đến 5: cur = 4, 6, 5, 1, 2. Vậy in ra: 4 6 5 1 2.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 5;
    vector<int> diff(n + 2, 0), pref(n + 1, 0);
    diff[1]++; diff[4]--;
    diff[2]++; diff[6]--;
    diff[2]++; diff[5]--;
    int cur = 0;
    for (int i = 1; i <= n; i++) {
        cur += diff[i];
        pref[i] = pref[i - 1] + (cur >= 2 ? 1 : 0);
    }
    cout << (pref[5] - pref[2]) << '\\n';
    return 0;
}`,
            q: 'Đoạn code trên đánh dấu 3 đoạn <code>[1, 3]</code>, <code>[2, 5]</code>, <code>[2, 4]</code> rồi đếm số vị trí được phủ ít nhất 2 lần trong đoạn <code>[3, 5]</code>. Kết quả in ra là bao nhiêu?',
            options: [
              'In ra 3 vì cả ba vị trí 3, 4 và 5 đều có hai đoạn trở lên đi qua',
              'In ra 2 vì chỉ có hai vị trí 3 và 4 thỏa mãn có ít nhất 2 đoạn phủ',
              'In ra 1 vì vị trí 3 có 3 đoạn phủ nhưng bị trừ bớt tại biên phải 4',
              'In ra 4 vì tính gộp cả vị trí 2 vào kết quả của phép trừ pref[5] - pref[2]'
            ],
            correct: 1,
            explain: 'Số đoạn phủ từng vị trí 1..5 lần lượt là: 1, 3, 3, 2, 1. Những vị trí có cur &gt;= 2 là {2, 3, 4}, nên pref = {0, 0, 1, 2, 3, 3}. Giá trị pref[5] - pref[2] = 3 - 1 = 2 (gồm vị trí 3 và 4 trong đoạn [3, 5]).'
          },
          {
            type: 'single',
            q: 'Vì sao khi cài đặt Mảng hiệu 1-based cho dãy độ dài <code>n</code>, ta luôn phải cấp phát <code>vector&lt;long long&gt; diff(n + 2, 0)</code> thay vì cỡ <code>n + 1</code>?',
            options: [
              'Để chứa thêm phần tử mảng gốc a[0] và phần tử a[n + 1] làm hai lính canh đối xứng',
              'Để độ phức tạp lúc cộng dồn khôi phục mảng cuối cùng giảm từ O(N) xuống còn O(1)',
              'Để khi một thao tác chạm biên phải r = n thì lệnh diff[r + 1] -= v không tràn khỏi mảng',
              'Để mảng diff tự động lưu được cả tổng tiền tố lẫn mảng hiệu cùng một lúc trong 1 mảng'
            ],
            correct: 2,
            explain: 'Vector kích thước n + 1 chỉ có các chỉ số hợp lệ từ 0 đến n. Khi một truy vấn cập nhật có biên phải r = n, lệnh diff[r + 1] -= v sẽ ghi vào diff[n + 1], gây lỗi truy cập ngoài vùng nhớ nếu không cấp phát đủ n + 2 ô.'
          },
          {
            type: 'multiple',
            q: 'Những nhận xét nào sau đây là <strong>ĐÚNG</strong> khi so sánh và kết hợp Mảng cộng dồn với Mảng hiệu?',
            options: [
              'Mảng hiệu làm tốt cả truy vấn hỏi tổng đoạn xen kẽ liên tục ngay sau mỗi lần cập nhật trong O(1)',
              'Mảng cộng dồn mạnh khi dãy số cố định và cần trả lời hàng loạt truy vấn tổng đoạn trong O(1)',
              'Mảng hiệu mạnh khi cần cộng thêm giá trị trên nhiều đoạn rồi mới đọc kết quả cuối một lần',
              'Có thể chạy Mảng hiệu xong xuôi hết các cập nhật rồi dựng Mảng cộng dồn lên kết quả thu được'
            ],
            correct: [1, 2, 3],
            explain: 'B, C và D đều đúng. A sai vì nếu cập nhật đoạn và hỏi tổng đoạn đan xen liên tục (online), mảng hiệu vẫn cần O(N) để khôi phục trước mỗi truy vấn — lúc đó phải dùng cấu trúc nâng cao hơn ở Tầng 3!'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l201_pref1d_left_bound',
        title: 'Lệch Biên Trái pref[r] - pref[l] Làm Mất Phần Tử Đầu Đoạn (WA)',
        description: 'Chương trình đọc mảng n phần tử rồi trả lời q truy vấn tổng đoạn [l, r] (1-based). Với dãy {3, 7, 2, 8, 5} và truy vấn [2, 4], tổng đúng phải là 7 + 2 + 8 = 17, nhưng chương trình lại in ra 10!',
        failingInput: '5 1\n3 7 2 8 5\n2 4',
        failingOutput: '10',
        expectedOutput: '17',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, q;
    cin >> n >> q;
    vector<long long> a(n + 1), pref(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        pref[i] = pref[i - 1] + a[i];
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << pref[r] - pref[l] << '\\n';
    }
    return 0;
}`,
        bugLine: 17,
        patches: [
          { text: 'Đổi dòng 12 thành pref[i] = pref[i - 1] + a[i - 1]; để dịch lùi mảng cộng dồn' },
          { text: 'Đổi dòng 17 thành cout << pref[r] - pref[l - 1] << \'\\n\'; để chỉ trừ phần đứng trước l' },
          { text: 'Đổi dòng 17 thành cout << pref[r - 1] - pref[l - 1] << \'\\n\'; để dịch cả hai đầu mút' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 17, pref[l] chứa cả giá trị a[l] = 7 nên lấy pref[r] - pref[l] làm mất luôn phần tử tại biên trái l = 2 (20 - 10 = 10). Phải viết pref[r] - pref[l - 1] = 20 - 3 = 17.'
      },
      {
        id: 'dbg_l201_pref2d_inclusion',
        title: 'Trừ Kép Góc Chéo - pref[r1 - 1][c1 - 1] Trong Truy Vấn 2D (WA)',
        description: 'Chương trình tính tổng hình chữ nhật con (r1, c1)..(r2, c2) trên ma trận n x m bằng Mảng cộng dồn 2D. Với ma trận 3x3 các số 1..9 và truy vấn góc dưới-phải (2, 2)..(3, 3), đáp án đúng là 5 + 6 + 8 + 9 = 28, nhưng code lại in ra 26!',
        failingInput: '3 3\n1 2 3\n4 5 6\n7 8 9\n2 2 3 3',
        failingOutput: '26',
        expectedOutput: '28',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m;
    cin >> n >> m;
    vector<vector<long long>> pref(n + 1, vector<long long>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            long long x;
            cin >> x;
            pref[i][j] = x + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
        }
    }
    int r1, c1, r2, c2;
    cin >> r1 >> c1 >> r2 >> c2;
    long long ans = pref[r2][c2] - pref[r1 - 1][c2] - pref[r2][c1 - 1] - pref[r1 - 1][c1 - 1];
    cout << ans << '\\n';
    return 0;
}`,
        bugLine: 19,
        patches: [
          { text: 'Đổi dòng 14 thành pref[i][j] = x + pref[i - 1][j] + pref[i][j - 1] + pref[i - 1][j - 1];' },
          { text: 'Đổi dòng 19 thành long long ans = pref[r2][c2] - pref[r1][c2] - pref[r2][c1] + pref[r1][c1];' },
          { text: 'Đổi dòng 19 thành long long ans = pref[r2][c2] - pref[r1 - 1][c2] - pref[r2][c1 - 1] + pref[r1 - 1][c1 - 1];' }
        ],
        correctPatch: 2,
        explain: 'Ở dòng 19, góc trên-trái pref[1][1] = 1 đã bị trừ tới 2 lần qua dải trên và dải trái, vậy mà code lại tiếp tục TRỪ thêm một lần nữa (45 - 6 - 12 - 1 = 26)! Đổi dấu thành CỘNG (+ pref[r1 - 1][c1 - 1]) sẽ cho 45 - 6 - 12 + 1 = 28.'
      },
      {
        id: 'dbg_l201_diff_right_bound',
        title: 'Đánh Dấu Nhầm diff[r] -= v Thay Vì diff[r + 1] -= v Trong Mảng Hiệu (WA)',
        description: 'Chương trình khởi tạo dãy n số 0, nhận q lệnh tăng đoạn [l, r] thêm v rồi in ra dãy sau cập nhật. Với n = 5 và 2 lệnh [1, 3] (+10), [2, 5] (+5), dãy đúng phải là 10 15 15 5 5, nhưng chương trình lại in ra 10 15 5 5 0!',
        failingInput: '5 2\n1 3 10\n2 5 5',
        failingOutput: '10 15 5 5 0',
        expectedOutput: '10 15 15 5 5',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, q;
    cin >> n >> q;
    vector<long long> diff(n + 2, 0);
    while (q--) {
        int l, r;
        long long v;
        cin >> l >> r >> v;
        diff[l] += v;
        diff[r] -= v;
    }
    long long cur = 0;
    for (int i = 1; i <= n; i++) {
        cur += diff[i];
        cout << cur << (i == n ? '\\n' : ' ');
    }
    return 0;
}`,
        bugLine: 15,
        patches: [
          { text: 'Đổi dòng 15 thành diff[r + 1] -= v; để chỉ triệt tiêu giá trị v sau vị trí r' },
          { text: 'Đổi dòng 14 thành diff[l - 1] += v; để dịch sớm điểm bắt đầu sang bên trái' },
          { text: 'Đổi dòng 19 thành cur += diff[i - 1]; để làm trễ hiệu ứng của mảng hiệu đi 1 bước' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 15, việc viết diff[r] -= v làm lượng +v bị triệt tiêu ngay tại vị trí r (nên ô 3 mất +10 và ô 5 mất +5). Đổi thành diff[r + 1] -= v để giữ nguyên +v đến hết vị trí r (và an toàn khi r = n nhờ mảng cỡ n + 2).'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — L2-01)
    // ============================================================================
    practiceProblems: [
      {
        id: 'CSES-1646',
        title: 'Static Range Sum Queries',
        judge: 'CSES',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1646',
        hint: 'Giới hạn $1 \\le n, q \\le 2 \\cdot 10^5$, $1 \\le x_i \\le 10^9$, TL 1.00s, ML 512 MB. Bài mẫu chuẩn 100% cho Mảng cộng dồn 1D: tạo <code>vector&lt;long long&gt; pref(n + 1, 0)</code> và trả lời mỗi đoạn $[a, b]$ bằng <code>pref[b] - pref[a - 1]</code> trong $O(1)$. Nhớ bắt buộc dùng <code>long long</code> vì tổng tới $2 \\cdot 10^{14}$!'
      },
      {
        id: 'CSES-1652',
        title: 'Forest Queries',
        judge: 'CSES',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1652',
        hint: 'Giới hạn $1 \\le n \\le 1000$, $1 \\le q \\le 2 \\cdot 10^5$, TL 1.00s, ML 512 MB. Bài kinh điển của Mảng cộng dồn 2D: gán $1$ cho ô cây <code>\'*\'</code> và $0$ cho ô trống <code>\'.\'</code>, dựng <code>pref[i][j]</code> trong $O(n^2)$ và trả lời mỗi truy vấn $(y_1, x_1)..(y_2, x_2)$ bằng công thức Bao hàm - Loại trừ trong $O(1)$.'
      },
      {
        id: 'ABC122-C',
        title: 'C - GeT AC',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/abc122/tasks/abc122_c',
        hint: 'Giới hạn $2 \\le N \\le 10^5$, $1 \\le Q \\le 10^5$, TL 2.0s, ML 1024 MB. Cẩn thận ranh giới cặp ký tự! Nếu gán <code>pref[i]</code> là số cặp <code>"AC"</code> bắt đầu từ vị trí $i$ trở về trước (tức <code>S[i] == \'A\' &amp;&amp; S[i + 1] == \'C\'</code>), thì trong đoạn $[l, r]$ một cặp hợp lệ không thể bắt đầu tại đúng $r$ nên đáp án là <code>pref[r - 1] - pref[l - 1]</code>!'
      },
      {
        id: 'CF-433B',
        title: '433B - Kuriyama Mirai\'s Stones',
        judge: 'Codeforces',
        tier: 2,
        link: 'https://codeforces.com/problemset/problem/433/B',
        hint: 'Giới hạn $1 \\le n, m \\le 10^5$, $1 \\le v_i \\le 10^9$, TL 2.0s, ML 256 MB. Kết hợp <code>std::sort</code> (<code>L1-05</code>) với Mảng cộng dồn 1D: tạo bản sao <code>u = v</code>, sắp xếp tăng dần <code>u</code> rồi dựng hai mảng <code>pref1</code> (trên mảng gốc) và <code>pref2</code> (trên mảng đã sort) đều dùng kiểu <code>long long</code>.'
      },
      {
        id: 'CF-816B',
        title: '816B - Karen and Coffee',
        judge: 'Codeforces',
        tier: 2,
        link: 'https://codeforces.com/problemset/problem/816/B',
        hint: 'Giới hạn $1 \\le k \\le n \\le 200\\,000$, $1 \\le q \\le 200\\,000$, $1 \\le l_i \\le r_i \\le 200\\,000$, TL 2.5s, ML 512 MB. Đường ống 2 bước: dùng Mảng hiệu cỡ $200\\,002$ đánh dấu $+1$ tại $l_i$ và $-1$ tại $r_i + 1$, cộng dồn lần 1 ra số công thức phủ mỗi nhiệt độ, quy đổi về $1/0$ (nếu $\\ge k$) rồi cộng dồn lần 2 để trả lời $[a, b]$ trong $O(1)$.'
      },
      {
        id: 'CSES-1661',
        title: 'Subarray Sums II',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1661',
        hint: 'Giới hạn $1 \\le n \\le 2 \\cdot 10^5$, $-10^9 \\le a_i, x \\le 10^9$, TL 1.00s, ML 512 MB. Vì dãy có cả số âm nên tổng tiền tố không tăng đều. Kết hợp Mảng cộng dồn với <code>std::map&lt;long long, long long&gt;</code> (<code>L1-06</code>, khởi tạo <code>mp[0] = 1</code>) để cộng dồn số lần xuất hiện của <code>curPref - x</code> trong $O(N \\log N)$.'
      },
      {
        id: 'CF-276C',
        title: '276C - Little Girl and Maximum Sum',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/276/C',
        hint: 'Giới hạn $1 \\le n, q \\le 2 \\cdot 10^5$, $1 \\le a_i \\le 2 \\cdot 10^5$, TL 2.0s, ML 256 MB. Dùng Mảng hiệu cỡ $n + 2$ cộng $+1$ trên mỗi đoạn truy vấn $[l, r]$ rồi cộng dồn để tìm tần suất <code>freq[i]</code> số lần mỗi vị trí được hỏi. Sau đó dùng <code>sort</code> (<code>L1-05</code>) sắp tăng cả mảng <code>a</code> lẫn <code>freq</code> rồi ghép cặp tương ứng để tính tổng tích bằng <code>long long</code>!'
      },
      {
        id: 'CF-295A',
        title: '295A - Greg and Array',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/295/A',
        hint: 'Giới hạn $1 \\le n, m, k \\le 10^5$, $0 \\le a_i, d_i \\le 10^5$, TL 2.0s, ML 256 MB. Mảng hiệu 2 tầng cực hay: tầng 1 dùng <code>diffOp(m + 2, 0)</code> ghi nhận các truy vấn $[x_i, y_i]$ rồi cộng dồn để biết mỗi thao tác thứ $j$ được gọi bao nhiêu lần (<code>opCount[j]</code>); tầng 2 dùng <code>diffArr(n + 2, 0)</code> cộng lượng <code>opCount[j] * d[j]</code> vào đoạn $[l_j, r_j]$ rồi cộng dồn vào <code>a[i]</code> (dùng <code>long long</code>!).'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
