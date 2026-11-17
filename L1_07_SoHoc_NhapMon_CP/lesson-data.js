/**
 * DỮ LIỆU BÀI GIẢNG L1-07: SỐ HỌC NHẬP MÔN CHO CP
 * Tầng 1 — Pha 2 STL Lớp 9 (Nối tiếp từ L1-06)
 * Mở khóa: Cặp ước đối xứng (d, N/d) và kiểm tra nguyên tố O(sqrt(N)) (bẫy n = 1, bẫy tràn int i * i <= n),
 * Sàng Eratosthenes O(N log log N) trên vector<bool> (gạt từ 1LL * i * i),
 * Thuật toán Euclid dạng lặp tính GCD/LCM O(log(min(a, b))) (cảnh báo __gcd & bẫy tràn LCM (a / g) * b),
 * Số học đồng dư an toàn ((a - b) % M + M) % M và Lũy thừa nhị phân lặp while (b > 0) trong O(log b).
 * Không giả định kiến thức chưa học: Prefix Sums (L2-01), Binary Search (L2-02), Đệ quy (MOD-01) hay DP (L2-06+).
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'so_hoc_co_ban',
    number: 'Bài Học L1-07',
    shortTitle: 'Số Học Nhập Môn',
    title: 'Bài L1-07: Số Học Nhập Môn Cho CP',
    lead: 'Chinh phục các bài toán số nguyên lớn tới $10^{18}$: tìm ước và kiểm tra nguyên tố trong $O(\\sqrt{N})$ nhờ tính đối xứng, sàng Eratosthenes $O(N \\log \\log N)$ trên vector&lt;bool&gt;, thuật toán Euclid tính GCD/LCM tránh tràn số trung gian, cùng phép trừ đồng dư không âm và Lũy thừa nhị phân dạng lặp $O(\\log b)$.',
    modules: [
      // ============================================================================
      // MODULE 1: ƯỚC SỐ, KIỂM TRA NGUYÊN TỐ O(SQRT(N)) & SÀNG ERATOSTHENES
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Nguyên Tố & Sàng',
        title: 'Vấn Đề Nhỏ 1: Cặp Ước Đối Xứng $O(\\sqrt{N})$ &amp; Sàng Eratosthenes $O(N \\log \\log N)$',
        lead: 'Rút gọn kiểm tra nguyên tố từ $O(N)$ xuống $O(\\sqrt{N})$ bằng cặp ước $(d, N/d)$, né hai bẫy $n = 1$ và tràn int <code>i * i &lt;= n</code>, đồng thời tìm mọi số nguyên tố tới $10^6$ trong tích tắc bằng Sàng Eratosthenes trên <code>vector&lt;bool&gt;</code>.',
        subproblem: {
          title: 'Làm sao kiểm tra một số $N \\le 10^{12}$ có phải nguyên tố không trong $O(\\sqrt{N})$ và liệt kê toàn bộ số nguyên tố từ $1$ tới $10^6$ mà không bị TLE?',
          desc: 'Chạy vòng lặp tới $N$ cho $N = 10^{12}$ mất hàng giờ (TLE), còn kiểm tra từng số $1..10^6$ mất $O(N\\sqrt{N}) \\approx 10^9$ phép tính (TLE!). Ta dùng cặp ước đối xứng $(d, N/d)$ cho số đơn lẻ và Sàng Eratosthenes trên vector&lt;bool&gt; cho cả dải $[1, N]$.'
        },
        cards: [
          {
            heading: 'Tính Đối Xứng Cặp Ước (d, N/d) &amp; Hai Bẫy Khi Kiểm Tra Nguyên Tố O(sqrt(N))',
            tag: 'Cặp ước & Tràn int',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tưởng tượng bạn cần xếp $N = 36$ viên gạch thành hình chữ nhật có chiều rộng $d \\le$ chiều dài $N/d$. Chiều rộng $d$ <strong>không bao giờ vượt quá $\\sqrt{N} = 6$</strong> (vì nếu cả hai cạnh cùng lớn hơn $\\sqrt{N}$ thì tích của chúng lớn hơn $N$ mất rồi!). Hễ tìm được cạnh nhỏ $d$ bên trái ($1 \\le d \\le \\sqrt{N}$), ta suy ngay ra cạnh lớn $N / d$ bên phải; riêng hình vuông $d = N / d$ (như $6 \\times 6$) thì chỉ tính <strong>1 lần</strong>.</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Ánh xạ sang số nguyên tố:</strong> Một số nguyên $N \\ge 2$ là nguyên tố nếu không có ước nào từ $2$ đến $\\lfloor\\sqrt{N}\\rfloor$. Chỉ mất tối đa $10^6$ bước cho $N = 10^{12}$!</li>
                  <li><strong>Bẫy 1 — Quên trường hợp <code>n = 1</code>:</strong> Theo định nghĩa, số nguyên tố phải có <strong>đúng 2 ước dương phân biệt</strong> ($1$ và chính nó). Số $1$ chỉ có đúng 1 ước nên <strong>$n = 1$ KHÔNG phải số nguyên tố</strong>! Luôn viết <code>if (n &lt; 2) return false;</code> ngay đầu hàm.</li>
                  <li><strong>Bẫy 2 — Viết <code>int i</code> trong <code>i * i &lt;= n</code>:</strong> Nếu viết <code>for (int i = 2; i * i &lt;= n; i++)</code> khi $n \\approx 2 \\cdot 10^9$, tại $i = 46\\,341$ phép nhân <code>i * i = 2\\,147\\,488\\,281</code> vượt ngưỡng <code>int</code> ($2^{31} - 1$) gây <strong>tràn số (Undefined Behavior)</strong>! Luôn viết <code>long long i</code> hoặc <code>1LL * i * i &lt;= n</code> (tránh cả dùng <code>sqrt(n)</code> liên tục vì hàm số thực chậm và có thể sai số làm tròn).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Đếm ước &amp; Kiểm tra nguyên tố chuẩn C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int countDivisors(long long n) {
    int cnt = 0;
    for (long long d = 1; d * d &lt;= n; d++) {
        if (n % d == 0) {
            cnt++; // Ước nhỏ d
            if (d != n / d) {
                cnt++; // Ước đối xứng n / d (không đếm đôi khi d * d == n)
            }
        }
    }
    return cnt;
}

bool isPrime(long long n) {
    if (n &lt; 2) return false; // 0, 1 và số âm KHÔNG phải nguyên tố
    // Dùng long long i (hoặc 1LL * i * i &lt;= n) để không bao giờ tràn int!
    for (long long i = 2; i * i &lt;= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout &lt;&lt; countDivisors(36) &lt;&lt; ' ' &lt;&lt; isPrime(1) &lt;&lt; ' ' &lt;&lt; isPrime(2147483647LL) &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cặp ước đối xứng (<code>Symmetric Divisor Pair</code>):</strong> Với mỗi ước $d \\le \\sqrt{N}$ của $N$, giá trị $N / d \\ge \\sqrt{N}$ cũng là ước của $N$, giúp duyệt toàn bộ ước trong $O(\\sqrt{N})$.</li>
                  <li><strong>Kiểm tra chia thử (<code>Trial Division</code>):</strong> Thuật toán thử các ước từ $2$ đến $\\lfloor\\sqrt{N}\\rfloor$ để kết luận nguyên tố hay hợp số trong $O(\\sqrt{N})$ thời gian và $O(1)$ bộ nhớ.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Sàng Nguyên Tố Eratosthenes O(N log log N) Trên vector<bool>',
            tag: 'Tiền xử lý đoạn [1, N]',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Khi đề cho $Q = 10^5$ câu hỏi kiểu <em>"Số $x$ ($x \\le 10^6$) có nguyên tố không?"</em>, gọi hàm <code>isPrime(x)</code> $10^5$ lần tốn tới $10^5 \\times 10^3 = 10^8$ phép chia (sát ranh TLE!). Thay vì hỏi từng số, thầy giáo phát một tờ giấy đánh số từ $2$ đến $N$:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Gặp số $2$ chưa bị gạch: khoanh tròn $2$ là nguyên tố, rồi đi một lượt gạch sạch mọi bội của $2$ ($4, 6, 8, \\dots$). Gặp số $3$ chưa bị gạch: khoanh tròn $3$, gạch sạch bội của $3$ ($9, 12, 15, \\dots$).</li>
                  <li><strong>Mẹo tăng tốc tối đa — Gạt từ $i^2$:</strong> Khi đứng ở số nguyên tố $i$ (ví dụ $i = 5$), các bội nhỏ hơn $i^2$ như $2\\times 5 = 10$, $3\\times 5 = 15$, $4\\times 5 = 20$ đều có ước nguyên tố nhỏ hơn $5$ nên <strong>ĐÃ bị gạch từ lượt $2, 3$ rồi</strong>! Vì vậy ta chỉ bắt đầu gạt từ <strong><code>1LL * i * i</code></strong>, và vòng ngoài chỉ cần chạy khi <strong><code>1LL * i * i &lt;= N</code></strong>!</li>
                  <li><strong>Tiết kiệm 8 lần RAM với <code>vector&lt;bool&gt;</code>:</strong> Mỗi ô trong <code>vector&lt;bool&gt;</code> chỉ chiếm đúng <strong>1 bit</strong> trên Heap (thay vì 1 byte của <code>bool[]</code>), nên sàng tới $10^7$ chỉ ngốn $\\approx 1.25$ MB RAM!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Cài đặt Sàng Eratosthenes chuẩn C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

vector&lt;bool&gt; sieveEratosthenes(int n) {
    vector&lt;bool&gt; isPrime(n + 1, true);
    if (n &gt;= 0) isPrime[0] = false;
    if (n &gt;= 1) isPrime[1] = false;

    for (int i = 2; 1LL * i * i &lt;= n; i++) {
        if (isPrime[i]) {
            // Bắt đầu từ 1LL * i * i để tránh vừa gạt trùng vừa tràn int!
            for (long long j = 1LL * i * i; j &lt;= n; j += i) {
                isPrime[(int)j] = false;
            }
        }
    }
    return isPrime;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 30;
    vector&lt;bool&gt; p = sieveEratosthenes(n);
    for (int i = 2; i &lt;= n; i++) {
        if (p[i]) cout &lt;&lt; i &lt;&lt; ' ';
    }
    cout &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Sàng Eratosthenes (<code>Sieve of Eratosthenes</code>):</strong> Thuật toán lọc toàn bộ số nguyên tố trong $[1, N]$ theo độ phức tạp $O(N \\log \\log N)$ (nhanh gần bằng tuyến tính $O(N)$: với $N = 10^6$, số lượt đánh dấu chỉ khoảng $\\sim 2 \\cdot 10^6$ phép gán!).</li>
                  <li><strong>Lệch biên khởi tạo <code>1LL * i * i</code>:</strong> Khi $N = 10^6$ thì $i \\le 1000$, nhưng nếu $N = 10^7$ (hay lớn hơn) viết <code>1LL * i * i</code> giúp thói quen code luôn miễn nhiễm tràn <code>int</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_prime_bound',
            title: 'Phòng Thí Nghiệm 1A: Thiếu Dấu "=" Ở i * i <= n Làm Nhận Nhầm Số Chính Phương',
            desc: 'Thử kiểm tra ba số {1, 49, 97} bằng hàm isPrime. Đổi công tắc để quan sát điều gì xảy ra khi điều kiện vòng lặp quên dấu "=" (viết nhầm thành i * i < n)!',
            toggles: [
              {
                key: 'boundMode',
                label: 'Điều kiện dừng của vòng lặp chia thử',
                options: [
                  { value: 'le', text: 'i * i <= n — Kiểm tra cả đúng căn bậc hai (AC)', kind: 'ok' },
                  { value: 'lt', text: 'i * i < n — Thiếu dấu "=" (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.boundMode === 'le';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

bool isPrime(long long n) {
    if (n < 2) return false;
    for (long long i = 2; i * i <= n; i++) { // ĐÚNG: có dấu <=
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    for (long long x : {1LL, 49LL, 97LL}) {
        cout << x << ": " << (isPrime(x) ? "YES" : "NO") << '\\n';
    }
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

bool isPrime(long long n) {
    if (n < 2) return false;
    for (long long i = 2; i * i < n; i++) { // BẪY: thiếu dấu =!
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    for (long long x : {1LL, 49LL, 97LL}) {
        cout << x << ": " << (isPrime(x) ? "YES" : "NO") << '\\n';
    }
    return 0;
}`;
              return {
                code,
                changedLines: [6],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): 1 là NO, 49 (7*7) là NO, 97 là YES!'
                  : 'SAI THUẬT TOÁN (WA): Vì thiếu dấu = nên i dừng ở 6, bỏ sót ước 7 của 49 và báo nhầm 49 là YES!',
                predictions: [
                  { text: 'Chương trình kết luận chính xác 1 là NO, 49 là NO và 97 là YES' },
                  { text: 'Chương trình bỏ sót ước đúng bằng căn bậc hai nên báo nhầm 49 là YES' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1: NO\n49: NO\n97: YES'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1: NO\n49: YES\n97: YES',
                explain: isOk
                  ? 'Khi n = p^2 (bình phương của một số nguyên tố như 4, 9, 25, 49), ước duy nhất khác 1 và n chính là i = sqrt(n). Dấu <= đảm bảo vòng lặp chạm tới đúng i = 7.'
                  : 'Với i * i < 49, khi i tăng tới 7 thì 7 * 7 = 49 < 49 là sai nên vòng lặp thoát sớm trước khi kịp chia thử cho 7, dẫn tới nhận nhầm mọi số p^2 thành số nguyên tố!'
              };
            }
          },
          {
            id: 'sb_sieve_start',
            title: 'Phòng Thí Nghiệm 1B: Điểm Bắt Đầu Vòng Gạt Bội Trong Sàng Eratosthenes',
            desc: 'Tìm các số nguyên tố từ 1 đến 20 bằng Sàng Eratosthenes. Xem hậu quả nếu gõ nhầm điểm bắt đầu vòng gạt bên trong từ j = 1LL * i * i thành j = i!',
            toggles: [
              {
                key: 'startMode',
                label: 'Giá trị khởi tạo của vòng lặp gạt bội',
                options: [
                  { value: 'sq', text: 'j = 1LL * i * i — Chỉ gạt bội thực sự từ i^2 (AC)', kind: 'ok' },
                  { value: 'self', text: 'j = i — Gạt nhầm chính số nguyên tố i (WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.startMode === 'sq';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 20;
    vector<bool> p(n + 1, true);
    p[0] = p[1] = false;
    for (int i = 2; 1LL * i * i <= n; i++) {
        if (p[i]) {
            for (long long j = 1LL * i * i; j <= n; j += i) {
                p[(int)j] = false;
            }
        }
    }
    for (int i = 2; i <= n; i++) if (p[i]) cout << i << ' ';
    cout << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 20;
    vector<bool> p(n + 1, true);
    p[0] = p[1] = false;
    for (int i = 2; 1LL * i * i <= n; i++) {
        if (p[i]) {
            for (long long j = i; j <= n; j += i) {
                p[(int)j] = false;
            }
        }
    }
    for (int i = 2; i <= n; i++) if (p[i]) cout << i << ' ';
    cout << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [12],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Giữ nguyên 2, 3 và gạt hết hợp số, in đủ 8 số nguyên tố <= 20!'
                  : 'SAI THUẬT TOÁN (WA): j = i tự đánh dấu p[2] = false, p[3] = false khiến 2 và 3 biến mất!',
                predictions: [
                  { text: 'In ra đủ 8 số nguyên tố nhỏ hơn hoặc bằng 20 là 2 3 5 7 11 13 17 19' },
                  { text: 'Các số nguyên tố nhỏ như 2 và 3 bị tự gạch nhầm nên chỉ còn 5 7 11 13 17 19' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n2 3 5 7 11 13 17 19 '
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n5 7 11 13 17 19 ',
                explain: isOk
                  ? 'Bắt đầu từ i * i không bao giờ chạm vào chính i (vì i >= 2 nên i * i > i), đồng thời bỏ qua toàn bộ các bội nhỏ hơn đã được sàng trước đó.'
                  : 'Vòng ngoài chạy tới i = 4 (vì 4 * 4 <= 20). Với i = 2 và i = 3, lệnh j = i tự gán p[2] = false và p[3] = false ngay ở bước đầu tiên, làm mất luôn các số nguyên tố <= sqrt(n)!'
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
    long long n = 36;
    int cnt = 0;
    for (long long d = 1; d * d <= n; d++) {
        if (n % d == 0) {
            cnt++;
            if (d != n / d) cnt++;
        }
    }
    cout << cnt << '\\n';
    return 0;
}`,
            q: 'Theo dõi số lượng ước đếm được của <code>n = 36</code> qua từng cặp đối xứng <code>(d, n / d)</code>. Giá trị in ra là gì?',
            options: [
              'In ra 8 vì vòng lặp đếm đủ các ước từ 1 đến 6 rồi trừ bỏ bội trùng lặp 36',
              'In ra 10 vì ở bước d = 6 điều kiện d != n / d vẫn cho phép cộng thêm hai lần',
              'In ra 9 vì bốn cặp khác nhau đóng góp 8 ước và riêng d = 6 chỉ cộng thêm 1',
              'In ra 6 vì vòng lặp dừng ngay khi d chạm đúng giá trị căn bậc hai của 36'
            ],
            correct: 2,
            explain: 'Các ước d <= 6 là: d=1 -> (1, 36) +2; d=2 -> (2, 18) +2; d=3 -> (3, 12) +2; d=4 -> (4, 9) +2; d=6 -> d == n/d nên chỉ +1. Tổng: 2+2+2+2+1 = 9.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 15;
    vector<bool> p(n + 1, true);
    p[0] = p[1] = false;
    int marks = 0;
    for (int i = 2; 1LL * i * i <= n; i++) {
        if (p[i]) {
            for (long long j = 1LL * i * i; j <= n; j += i) {
                p[(int)j] = false;
                marks++;
            }
        }
    }
    cout << marks << ' ' << p[9] << ' ' << p[11] << '\\n';
    return 0;
}`,
            q: 'Đoạn sàng Eratosthenes chạy với <code>n = 15</code> và đếm tổng số lần gán <code>marks</code>. Ba số in ra là gì?',
            options: [
              'In ra 8 0 1 vì lượt i = 2 gạt 6 lần từ 4 và lượt i = 3 chỉ gạt thêm 2 lần từ 9',
              'In ra 9 0 1 vì lượt i = 2 gạt 6 lần từ 4 và lượt i = 3 gạt thêm 3 lần từ 9',
              'In ra 8 1 1 vì số 9 chưa nằm trong phạm vi gạt của lượt i = 2 lẫn i = 3',
              'In ra 7 0 1 vì số 12 đã bị gạch ở i = 2 nên lượt i = 3 tự động bỏ qua'
            ],
            correct: 1,
            explain: 'Vòng ngoài chạy i = 2, 3 (vì 4*4 = 16 > 15). Với i = 2: j chạy {4, 6, 8, 10, 12, 14} (6 lần). Với i = 3: j chạy {9, 12, 15} (3 lần). Tổng marks = 6 + 3 = 9; p[9] = 0 (hợp số), p[11] = 1 (nguyên tố). In ra: 9 0 1.'
          },
          {
            type: 'single',
            q: 'Khi kiểm tra số nguyên $N$ lên tới $2 \\cdot 10^9$ trong hàm <code>isPrime(long long n)</code>, vì sao viết <code>for (int i = 2; i * i &lt;= n; i++)</code> lại cực kỳ nguy hiểm?',
            options: [
              'Vì khi i đạt 46341 phép nhân i * i vượt ngưỡng kiểu int gây tràn số sai lệch',
              'Vì biến kiểu int không bao giờ biểu diễn được số lớn hơn 10^6 trong vòng lặp for',
              'Vì kiểu int thực hiện phép chia lấy dư % chậm gấp mười lần so với long long',
              'Vì vòng lặp int bắt buộc phải khởi tạo từ i = 1 thay vì bắt đầu từ i = 2'
            ],
            correct: 0,
            explain: 'Giá trị lớn nhất của int là 2,147,483,647. Khi i = 46,341 thì 46,341^2 = 2,147,488,281 vượt ngưỡng int gây tràn số (Undefined Behavior). Dùng long long i hoặc 1LL * i * i <= n sẽ an toàn tuyệt đối.'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> về kiểm tra nguyên tố và Sàng Eratosthenes?',
            options: [
              'Hàm isPrime(n) bắt buộc trả về false ngay khi n < 2 vì số 1 không phải nguyên tố',
              'Với Sàng Eratosthenes trên N = 10^6, độ phức tạp thời gian là O(N * sqrt(N))',
              'Bắt đầu vòng gạt bội trong sàng từ 1LL * i * i giúp tránh xét lại bội nhỏ hơn',
              'Để tìm mọi số nguyên tố từ 1 đến 10^6 nhanh nhất, nên gọi isPrime(x) từng số'
            ],
            correct: [0, 2],
            explain: 'A và C đúng. B sai vì Sàng Eratosthenes chạy trong O(N log log N) chứ không phải O(N sqrt(N)). D sai vì gọi isPrime từng số mất O(N sqrt(N)) ~ 10^9 bước, chậm hơn Sàng rất nhiều.'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: THUẬT TOÁN EUCLID TÍNH GCD / LCM & BẪY TRÀN SỐ
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Euclid GCD & LCM',
        title: 'Vấn Đề Nhỏ 2: Thuật Toán Euclid ($O(\\log(\\min(a,b)))$) &amp; Bẫy Tràn Số LCM',
        lead: 'Hiểu sâu bản chất phép chia dư liên tiếp của thuật toán Euclid dạng lặp, nắm rõ lưu ý giữa <code>__gcd</code> của GCC với hàm tự viết, và bảo vệ công thức LCM khỏi tràn số trung gian bằng thứ tự <code>(a / gcd) * b</code>.',
        subproblem: {
          title: 'Với hai số nguyên khổng lồ $A, B \\le 10^{12}$, làm sao tìm $\\gcd(A, B)$ và $\\text{lcm}(A, B)$ chỉ trong vài chục phép tính mà không bị tràn `long long` ở bước nhân $A \\times B$?',
          desc: 'Thử ước từ $\\min(A, B)$ xuống $1$ tốn $O(\\min(A, B))$ (TLE!), còn công thức (a * b) / gcd làm tích $a \\times b = 10^{24}$ tràn ngay kiểu long long! Ta cài đặt thuật toán Euclid lặp $O(\\log(\\min(a, b)))$ và luôn chia trước khi nhân.'
        },
        cards: [
          {
            heading: 'Thuật Toán Euclid Lặp — Chia Dư Liên Tiếp Trong O(log(min(a, b)))',
            tag: 'Bản chất chia dư',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Bạn có một tấm bìa kích thước $a \\times b$ (ví dụ $252 \\times 105$) và muốn cắt thành các ô vuông <strong>lớn nhất có thể</strong> mà không dư một mẩu vụn nào. Cạnh ô vuông đó chính là $\\gcd(a, b)$.</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Thay vì thử từng cỡ gạch từ $105$ lùi xuống $1$, ta cắt ra nhiều hình vuông cạnh $105$ nhất có thể từ chiều dài $252$: cắt được $2$ hình ($2 \\times 105 = 210$), phần bìa còn thừa lại là $105 \\times (252 \\bmod 105) = 105 \\times 42$!</li>
                  <li>Bất kỳ viên gạch vuông nào lát vừa cả $252$ lẫn $105$ chắc chắn cũng lát vừa phần dư $42$! Do đó $\\gcd(252, 105) = \\gcd(105, 42) = \\gcd(42, 21) = \\gcd(21, 0) = 21$!</li>
                  <li><strong>Vì sao chỉ mất $O(\\log(\\min(a, b)))$?</strong> Cứ sau tối đa 2 bước, số lớn hơn giảm ít nhất một nửa. Ngay cả khi $a, b \\le 10^{18}$, vòng lặp <code>while (b != 0)</code> chỉ chạy tối đa khoảng $90$ bước!</li>
                  <li><strong>Lưu ý <code>__gcd(a, b)</code> vs Euclid tự viết:</strong> Hàm <code>__gcd</code> trong <code>&lt;algorithm&gt;</code> là mở rộng riêng của GCC (không phải chuẩn mọi trình biên dịch C++14), lại <strong>bắt buộc 2 tham số phải cùng kiểu</strong> (gọi <code>__gcd(12, 18LL)</code> báo lỗi biên dịch ngay!). Tự viết hàm lặp <code>myGcd(long long a, long long b)</code> giúp bạn làm chủ kiểu dữ liệu và chưa cần dùng tới đệ quy.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Cài đặt Euclid dạng lặp chuẩn C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

long long myGcd(long long a, long long b) {
    if (a &lt; 0) a = -a;
    if (b &lt; 0) b = -b;
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout &lt;&lt; "gcd(252, 105) = " &lt;&lt; myGcd(252, 105) &lt;&lt; '\\n';
    // Lưu ý: __gcd(12, 18LL) bị LỖI biên dịch vì khác kiểu int và long long!
    cout &lt;&lt; "__gcd(12LL, 18LL) = " &lt;&lt; __gcd(12LL, 18LL) &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Ước chung lớn nhất (<code>GCD — Greatest Common Divisor</code>):</strong> Số nguyên dương lớn nhất chia hết cả $a$ và $b$; nếu $\\gcd(a, b) = 1$, ta gọi $a$ và $b$ là <strong>nguyên tố cùng nhau (<code>Coprime</code>)</strong>.</li>
                  <li><strong>Thuật toán Euclid (<code>Euclidean Algorithm</code>):</strong> Dựa trên đẳng thức bất biến $\\gcd(a, b) = \\gcd(b, a \\bmod b)$ với điều kiện dừng $\\gcd(a, 0) = a$.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Tính LCM An Toàn — Chia Trước Nhân Sau (a / gcd(a, b)) * b',
            tag: 'Bẫy tràn trung gian',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hai tuyến xe buýt chạy theo chu kỳ $a$ phút và $b$ phút. Thời điểm gần nhất hai xe lại cùng khởi hành là <strong>Bội chung nhỏ nhất</strong> $\\text{lcm}(a, b) = \\frac{a \\cdot b}{\\gcd(a, b)}$.</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cạm bẫy chết người <code>(a * b) / g</code>:</strong> Giả sử $a = 2 \\cdot 10^{12}$ và $b = 3 \\cdot 10^{12}$. Thực tế $\\gcd(a, b) = 10^{12}$, nên đáp án LCM thật chỉ là $6 \\cdot 10^{12}$ (nằm lọt thỏm trong <code>long long</code> $\\le 9.22 \\cdot 10^{18}$!). Nhưng nếu viết <code>(a * b) / g</code>, máy tính thực hiện phép nhân trước: $2 \\cdot 10^{12} \\times 3 \\cdot 10^{12} = 6 \\cdot 10^{24}$, <strong>tràn ngay <code>long long</code></strong> thành số sai hoàn toàn trước khi kịp chia cho $g$!</li>
                  <li><strong>Quy tắc vàng — CHIA TRƯỚC, NHÂN SAU:</strong> Vì $g = \\gcd(a, b)$ chắc chắn là ước của $a$, phép chia <strong><code>a / g</code> luôn chia hết nguyên vẹn không mất phần dư</strong>! Viết <strong><code>(a / g) * b</code></strong> giúp thu nhỏ con số xuống chỉ còn $2$ rồi mới nhân $3 \\cdot 10^{12} = 6 \\cdot 10^{12}$!</li>
                  <li><strong>Mở rộng cho cả dãy số:</strong> Với dãy $A$, ta khởi tạo <code>ans = A[0]</code> rồi gộp dần <code>ans = myGcd(ans, A[i])</code> hoặc <code>ans = myLcm(ans, A[i])</code> qua từng phần tử.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Hàm myLcm an toàn chống tràn trung gian</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

long long myGcd(long long a, long long b) {
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}

long long myLcm(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    long long g = myGcd(a, b);
    return (a / g) * b; // BẮT BUỘC chia trước, nhân sau!
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a = 2000000000000LL, b = 3000000000000LL;
    cout &lt;&lt; "LCM an toan = " &lt;&lt; myLcm(a, b) &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bội chung nhỏ nhất (<code>LCM — Least Common Multiple</code>):</strong> Số nguyên dương nhỏ nhất chia hết cho cả $a$ và $b$, liên hệ với GCD qua $a \\cdot b = \\gcd(a, b) \\cdot \\text{lcm}(a, b)$.</li>
                  <li><strong>Tràn số trung gian (<code>Intermediate Overflow</code>):</strong> Lỗi phép tính tạm thời vượt ngưỡng kiểu dữ liệu dù kết quả cuối vẫn nhỏ hơn giới hạn; phòng tránh bằng thứ tự <code>(a / g) * b</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_lcm_overflow',
            title: 'Phòng Thí Nghiệm 2: Chia Trước (a / g) * b vs Bẫy Nhân Trước (a * b) / g',
            desc: 'Với a = 2*10^12 và b = 3*10^12, đáp án đúng của LCM là 6*10^12 (vừa khít long long). Đổi công tắc để quan sát tai nạn tràn số trung gian khi nhân trước rồi mới chia!',
            toggles: [
              {
                key: 'lcmOrder',
                label: 'Thứ tự phép tính LCM(a, b)',
                options: [
                  { value: 'div_first', text: '(a / g) * b — Chia trước nhân sau (AC)', kind: 'ok' },
                  { value: 'mul_first', text: '(a * b) / g — Nhân trước chia sau (Bẫy tràn WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.lcmOrder === 'div_first';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

long long myGcd(long long a, long long b) {
    while (b != 0) { long long r = a % b; a = b; b = r; }
    return a;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a = 2000000000000LL, b = 3000000000000LL;
    long long g = myGcd(a, b);
    long long lcm = (a / g) * b; // ĐÚNG: chia trước nên kết quả thu nhỏ còn 2 * 3*10^12
    cout << lcm << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

long long myGcd(long long a, long long b) {
    while (b != 0) { long long r = a % b; a = b; b = r; }
    return a;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a = 2000000000000LL, b = 3000000000000LL;
    long long g = myGcd(a, b);
    long long lcm = (a * b) / g; // BẪY: a * b = 6 * 10^24 tràn sạch long long!
    cout << lcm << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [14],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): (a / g) * b giữ kết quả nhỏ gọn, in chuẩn 6000000000000!'
                  : 'TRÀN SỐ TRUNG GIAN (WA): a * b = 6*10^24 vượt 9.22*10^18 nên kết quả bị hỏng thành -6424158!',
                predictions: [
                  { text: 'Chương trình chia a cho g trước nên tránh tràn long long và in chuẩn 6000000000000' },
                  { text: 'Chương trình tính a * b quá lớn làm tràn long long nên in ra số rác âm -6424158' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n6000000000000'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n-6424158',
                explain: isOk
                  ? 'Vì g = gcd(a, b) = 10^12 là ước của a nên a / g = 2 là số nguyên chính xác; nhân tiếp 2 * 3*10^12 = 6*10^12 hoàn toàn an toàn trong long long.'
                  : 'Dù biến lcm dùng kiểu long long, phép nhân a * b = 6 * 10^24 xảy ra trước đã vượt xa giới hạn ~9.22 * 10^18 của số 64-bit có dấu, gây tràn thành giá trị rác!'
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
    long long a = 84, b = 30;
    int steps = 0;
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
        steps++;
    }
    cout << a << ' ' << steps << '\\n';
    return 0;
}`,
            q: 'Theo dõi từng vòng lặp của thuật toán Euclid với <code>a = 84, b = 30</code>. Hai số in ra là gì?',
            options: [
              'In ra 6 3 vì cặp (84, 30) chuyển thành (30, 24) rồi (24, 6) và dừng ở (6, 0)',
              'In ra 6 4 vì cặp (84, 30) phải qua thêm bước chia dư cho 12 trước khi về 0',
              'In ra 12 3 vì phần dư đầu tiên của phép chia 84 cho 30 mang giá trị bằng 12',
              'In ra 3 4 vì thuật toán dừng ngay khi phần dư chạm xuống ước nguyên tố 3'
            ],
            correct: 0,
            explain: 'Bước 1: r = 84 % 30 = 24 -> (30, 24), steps=1. Bước 2: r = 30 % 24 = 6 -> (24, 6), steps=2. Bước 3: r = 24 % 6 = 0 -> (6, 0), steps=3. Dừng vì b == 0. In ra: 6 3.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

long long myGcd(long long a, long long b) {
    while (b != 0) { long long r = a % b; a = b; b = r; }
    return a;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<long long> v = {18, 24, 30};
    long long g = v[0], l = v[0];
    for (int i = 1; i < (int)v.size(); i++) {
        g = myGcd(g, v[i]);
        l = (l / myGcd(l, v[i])) * v[i];
    }
    cout << g << ' ' << l << '\\n';
    return 0;
}`,
            q: 'Đoạn code tính GCD và LCM của dãy <code>{18, 24, 30}</code>. Kết quả hai số được in ra là gì?',
            options: [
              'In ra 6 720 vì bội chung nhỏ nhất của 72 và 30 bằng tích của chúng chia 3',
              'In ra 12 360 vì ước chung lớn nhất ban đầu của 18 và 24 giữ nguyên là 12',
              'In ra 6 180 vì bước cuối tính LCM(72, 30) cho kết quả nhỏ nhất bằng 180',
              'In ra 6 360 vì GCD toàn dãy là 6 còn LCM tăng từ 18 lên 72 rồi lên 360'
            ],
            correct: 3,
            explain: 'Sau i=1 (24): g = gcd(18, 24) = 6; l = (18 / 6) * 24 = 72. Sau i=2 (30): g = gcd(6, 30) = 6; l = (72 / gcd(72, 30)) * 30 = (72 / 6) * 30 = 360. In ra: 6 360.'
          },
          {
            type: 'single',
            q: 'Vì sao khi gọi hàm mở rộng <code>__gcd(a, b)</code> của GCC ta cần cẩn thận so với việc tự viết hàm Euclid lặp <code>myGcd(long long a, long long b)</code>?',
            options: [
              'Vì hàm __gcd có độ phức tạp O(N) chậm hơn rất nhiều so với vòng lặp Euclid tự viết',
              'Vì hàm __gcd chỉ nhận được tối đa giá trị 10^9 và không chạy được trên kiểu 64-bit',
              'Vì hàm __gcd đòi hỏi hai tham số phải có cùng kiểu dữ liệu và không chuẩn trên mọi trình biên dịch',
              'Vì hàm __gcd trả về trực tiếp Bội chung nhỏ nhất thay vì Ước chung lớn nhất của hai số'
            ],
            correct: 2,
            explain: '__gcd(a, b) là hàm nội bộ của GCC (không chuẩn trong C++14 trên mọi hệ thống) và bắt buộc a, b phải cùng một kiểu (ví dụ __gcd(12, 18LL) sẽ báo lỗi biên dịch do lệch int và long long).'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về thuật toán Euclid và công thức tính LCM?',
            options: [
              'Thuật toán Euclid đạt độ phức tạp O(log(min(a, b))) nhờ phần dư giảm nhanh từng bước',
              'Viết (a / gcd(a, b)) * b giúp chống tràn số trung gian mà vẫn chia hết nguyên vẹn',
              'Viết luôn (a * b) / gcd(a, b) sẽ luôn an toàn nếu biến kết quả khai báo long long',
              'Với mọi số nguyên dương a khi chạy vòng lặp chia dư tới 0, luôn thu được gcd(a, 0) = a'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D đều đúng. C sai vì tích a * b được tính trước khi chia cho gcd, nên với a, b ~ 10^12 thì a * b = 10^24 đã tràn sạch long long trước khi phép chia kịp chạy!'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: SỐ HỌC ĐỒNG DƯ & LŨY THỪA NHỊ PHÂN LẶP O(LOG B)
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Đồng Dư & Lũy Thừa Nhị Phân',
        title: 'Vấn Đề Nhỏ 3: Phép Toán Đồng Dư An Toàn &amp; Lũy Thừa Nhị Phân Lặp $O(\\log b)$',
        lead: 'Xử lý cộng, nhân và tránh bẫy phép trừ ra số âm <code>((a - b) % M + M) % M</code> trong C++, đồng thời cài đặt Lũy thừa nhị phân dạng lặp <code>while (b &gt; 0)</code> tính $(a^b) \\bmod M$ với $b \\le 10^{18}$ chỉ trong ~60 bước.',
        subproblem: {
          title: 'Làm sao tính $(a^b) \\bmod M$ khi $b \\le 10^{18}$ chỉ trong ~60 bước bằng vòng lặp `while` và đảm bảo các phép cộng, trừ, nhân đồng dư không bao giờ tràn số hay bị âm?',
          desc: 'Nhân lặp $b$ lần tốn $O(b)$ (TLE!), quên % M ở từng bước làm tràn long long, còn viết (a - b) % M trong C++ có thể trả về số âm! Ta dùng Lũy thừa nhị phân lặp while (b > 0) trong $O(\\log b)$ và chuẩn hóa ((a - b) % M + M) % M.'
        },
        cards: [
          {
            heading: 'Số Học Đồng Dư An Toàn — Cộng, Nhân & Bẫy Phép Trừ Ra Số Âm',
            tag: 'Bẫy % số âm',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Trên đồng hồ $12$ giờ, dù quay thêm $100$ giờ thì kim vẫn chỉ về một giờ từ $0$ đến $11$. Trong lập trình thi đấu, đáp án thường rất lớn nên đề yêu cầu lấy dư cho $M = 10^9 + 7$ (hoặc $998244353$). Nếu để tới cuối cùng mới <code>% M</code>, các tích trung gian đã tràn <code>long long</code> từ lâu! Ta cần lấy dư ngay sau mỗi phép tính:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cộng an toàn:</strong> <code>((a % M) + (b % M)) % M</code>.</li>
                  <li><strong>Nhân an toàn:</strong> <code>((a % M) * (b % M)) % M</code> — nhớ các biến phải là <code>long long</code> (hoặc ép <code>1LL * ...</code>), vì $(10^9 + 6)^2 \\approx 10^{18}$ vượt xa <code>int</code> ($2.14 \\cdot 10^9$) và chỉ vừa trong <code>long long</code> ($9.22 \\cdot 10^{18}$).</li>
                  <li><strong>Bẫy phép trừ ra số âm trong C++:</strong> Về toán học $(-3) \\bmod 7 = 4$, nhưng trong C++, biểu thức <code>(2 - 5) % 7</code> lại trả về <strong><code>-3</code></strong>! Muốn kết quả luôn dương đẹp trong $[0, M - 1]$, bắt buộc viết <strong><code>((a - b) % M + M) % M</code></strong> (hoặc <code>(a - b + M) % M</code> nếu đã chắc chắn $0 \\le a, b &lt; M$).</li>
                  <li><strong>Cảnh báo phép chia:</strong> Tuyệt đối <strong>KHÔNG</strong> viết <code>(a / b) % M == ((a % M) / (b % M)) % M</code> (ví dụ $(10 / 2) \\bmod 3 = 2 \\ne (1 / 2) \\bmod 3 = 0$!).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Bộ 3 hàm đồng dư chuẩn C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long MOD = 1000000007LL;

long long addMod(long long a, long long b, long long mod) {
    return ((a % mod) + (b % mod)) % mod;
}

long long subMod(long long a, long long b, long long mod) {
    // Cộng thêm mod trước khi % mod lần 2 để triệt tiêu số âm
    return (((a % mod) - (b % mod)) % mod + mod) % mod;
}

long long mulMod(long long a, long long b, long long mod) {
    return ((a % mod) * (b % mod)) % mod;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout &lt;&lt; "C++ (2 - 5) % 7 = " &lt;&lt; ((2 - 5) % 7) &lt;&lt; '\\n';
    cout &lt;&lt; "subMod(2, 5, 7) = " &lt;&lt; subMod(2, 5, 7) &lt;&lt; '\\n';
    cout &lt;&lt; "mulMod(10^9, 10^9-1) = " &lt;&lt; mulMod(1000000000LL, 999999999LL, MOD) &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Số học đồng dư (<code>Modular Arithmetic</code>):</strong> Quy tắc bảo toàn phần dư cho cộng, trừ, nhân giúp giữ mọi giá trị trung gian nhỏ hơn $M$, hoàn toàn không tràn 64-bit khi $M \\le 2 \\cdot 10^9$.</li>
                  <li><strong>Phần dư âm (<code>Negative Remainder</code>):</strong> Quy ước của C/C++ giữ dấu của số bị chia trong phép <code>%</code>, đòi hỏi cộng bù <code>+ M</code> khi làm phép trừ đồng dư.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Lũy Thừa Nhị Phân Lặp (while (b > 0)) Tính (a^b) % M Trong O(log b)',
            tag: 'O(log b) với b <= 10^18',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Muốn tính $3^{13} \\bmod M$, nếu nhân tuần tự $13$ lần thì với $b = 10^{18}$ máy tính phải chạy <strong>$10^{18}$ bước (&rarr; TLE tỷ năm)</strong>! Bí quyết là viết số mũ $13$ dưới dạng tổng các lũy thừa của $2$ (hệ nhị phân): $13 = 8 + 4 + 1 = (1101)_2$, suy ra $3^{13} = 3^8 \\cdot 3^4 \\cdot 3^1$.</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Vòng lặp <code>while (b &gt; 0)</code> cực gọn (không cần đệ quy!):</strong> Ta giữ hai biến: <code>res = 1 % M</code> (kết quả tích lũy) và <code>a</code> (lưu giá trị cơ số nâng bình phương dần: $a^1 \\to a^2 \\to a^4 \\to a^8 \\dots$).</li>
                  <li>Ở mỗi bước, nhìn bit cuối của <code>b</code> bằng <code>b &amp; 1</code> (tức <code>b % 2 == 1</code>): nếu bit cuối là $1$, nhân dồn <code>res = (res * a) % M;</code>. Sau đó bình phương cơ số <code>a = (a * a) % M;</code> và chia đôi số mũ <code>b &gt;&gt;= 1;</code> (tức <code>b /= 2</code>).</li>
                  <li><strong>Hai bẫy bắt buộc tránh:</strong> (1) Phải ép <strong><code>a %= M;</code></strong> ngay đầu hàm — nếu quên, với $a = 10^{12}$ thì <code>a * a</code> tràn <code>long long</code> ngay vòng đầu tiên! (2) Phải nhớ <code>% M</code> ở cả <code>res = (res * a) % M</code> lẫn <code>a = (a * a) % M</code> và dùng kiểu <code>long long</code>! Khi $b = 0$, vòng lặp không chạy và trả về <code>res = 1 % M</code> (khớp luôn quy ước $0^0 = 1$).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Hàm binPow dạng lặp chuẩn C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

long long binPow(long long a, long long b, long long mod) {
    long long res = 1 % mod;
    a %= mod; // Bắt buộc thu gọn a trước để a * a không tràn!
    if (a &lt; 0) a += mod;

    while (b &gt; 0) {
        if (b &amp; 1LL) { // Tương đương b % 2 == 1
            res = (res * a) % mod;
        }
        a = (a * a) % mod; // Chuẩn bị a^2, a^4, a^8...
        b &gt;&gt;= 1;           // Tương đương b /= 2
    }
    return res;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    const long long MOD = 1000000007LL;
    cout &lt;&lt; "3^13 % MOD      = " &lt;&lt; binPow(3, 13, MOD) &lt;&lt; '\\n';
    cout &lt;&lt; "2^(10^18) % MOD = " &lt;&lt; binPow(2, 1000000000000000000LL, MOD) &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Lũy thừa nhị phân (<code>Binary Exponentiation</code>):</strong> Kỹ thuật tính $a^b \\bmod M$ trong <strong>$O(\\log b)$</strong> phép nhân (chỉ ~60 bước khi $b = 10^{18}$) dựa trên khai triển nhị phân của $b$.</li>
                  <li><strong>Toán tử bit <code>b &amp; 1</code> và <code>b &gt;&gt;= 1</code>:</strong> Kiểm tra tính chẵn/lẻ nhanh và chia nguyên cho $2$ trên số nguyên không âm <code>b</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_sub_mod',
            title: 'Phòng Thí Nghiệm 3A: Phép Trừ Đồng Dư ((a - b) % M + M) % M vs Bẫy Số Âm',
            desc: 'Cho a = 2, b = 5 và M = 7. Trên toán học (2 - 5) mod 7 = 4, nhưng C++ lại giữ dấu âm. Hãy bật công tắc để so sánh hai công thức!',
            toggles: [
              {
                key: 'subMode',
                label: 'Công thức phép trừ đồng dư',
                options: [
                  { value: 'safe', text: '((a - b) % M + M) % M — Luôn ra [0, M-1] (AC)', kind: 'ok' },
                  { value: 'raw', text: '(a - b) % M — Có thể ra số âm (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.subMode === 'safe';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a = 2, b = 5, M = 7;
    long long ans = ((a - b) % M + M) % M; // ĐÚNG: bù + M rồi % M
    cout << ans << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a = 2, b = 5, M = 7;
    long long ans = (a - b) % M; // BẪY: trong C++ (-3) % 7 ra -3!
    cout << ans << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [8],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Kết quả được chuẩn hóa về 4 trong đoạn [0, 6]!'
                  : 'SAI THUẬT TOÁN (WA): C++ trả về -3 làm sai đáp án đồng dư!',
                predictions: [
                  { text: 'Chương trình bù thêm M trước khi lấy dư lần hai nên in chuẩn số dương 4' },
                  { text: 'Chương trình giữ nguyên dấu âm của (-3) % 7 trong C++ và in ra -3' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n4'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n-3',
                explain: isOk
                  ? 'Trong C++, phép (-3) % 7 ra -3. Khi cộng thêm M = 7 ta được -3 + 7 = 4, rồi % 7 một lần nữa để bảo đảm nếu ban đầu đã dương thì cũng không vượt quá M - 1.'
                  : 'Trong chuẩn C++14, toán tử % luôn cho phần dư cùng dấu với số bị chia (2 - 5 = -3 nên (-3) % 7 = -3).'
              };
            }
          },
          {
            id: 'sb_binpow_mod',
            title: 'Phòng Thí Nghiệm 3B: Quên "% mod" Ở Bước Nhân res Trong Lũy Thừa Nhị Phân',
            desc: 'Tính (10^9)^3 % (10^9 + 7). Quan sát sự khác biệt khi quên chia dư lúc cập nhật res = res * a trong vòng while (b > 0)!',
            toggles: [
              {
                key: 'powMode',
                label: 'Cập nhật biến kết quả res trong binPow',
                options: [
                  { value: 'with_mod', text: 'res = (res * a) % mod — Giữ nhỏ hơn mod (AC)', kind: 'ok' },
                  { value: 'no_mod', text: 'res = res * a — Quên % mod (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.powMode === 'with_mod';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

long long binPow(long long a, long long b, long long mod) {
    long long res = 1 % mod;
    a %= mod;
    while (b > 0) {
        if (b & 1LL) res = (res * a) % mod; // ĐÚNG: luôn % mod
        a = (a * a) % mod;
        b >>= 1;
    }
    return res;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout << binPow(1000000000LL, 3, 1000000007LL) << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

long long binPow(long long a, long long b, long long mod) {
    long long res = 1 % mod;
    a %= mod;
    while (b > 0) {
        if (b & 1LL) res = res * a; // BẪY: quên % mod làm res vượt mod!
        a = (a * a) % mod;
        b >>= 1;
    }
    return res;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout << binPow(1000000000LL, 3, 1000000007LL) << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [8],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Kết quả luôn nằm gọn trong [0, mod - 1], in ra 999999664!'
                  : 'SAI THUẬT TOÁN (WA): res phình thành 49000000000 lớn hơn cả mod (và dễ tràn long long nếu b lớn hơn)!',
                predictions: [
                  { text: 'Biến res được lấy dư sau mỗi lần nhân nên kết quả nhỏ hơn mod là 999999664' },
                  { text: 'Biến res không được lấy dư nên phình vượt mod và in ra 49000000000' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n999999664'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n49000000000',
                explain: isOk
                  ? 'Với 10^9 = -7 (mod 10^9 + 7), ta có (-7)^3 = -343 = 999999664 (mod 10^9 + 7). Luôn giữ res < mod giúp kết quả vừa đúng vừa không bao giờ tràn số.'
                  : 'Ở bước b = 3: res = 10^9, a^2 % mod = 49. Ở bước b = 1: res * a = 10^9 * 49 = 49000000000 không được % mod nên sai kết quả (và nếu b có thêm 1 bit nữa sẽ tràn sạch long long!).'
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
    long long a = 3, b = 11, mod = 100;
    long long res = 1;
    a %= mod;
    while (b > 0) {
        if (b & 1LL) res = (res * a) % mod;
        a = (a * a) % mod;
        b >>= 1;
    }
    cout << res << '\\n';
    return 0;
}`,
            q: 'Theo dõi giá trị biến <code>res</code> và <code>a</code> trong hàm <code>binPow(3, 11, 100)</code>. Kết quả cuối cùng in ra là gì?',
            options: [
              'In ra 43 vì lũy thừa nhị phân nhân 3^1 nhân 3^4 nhân 3^6 rồi chia dư cho 100',
              'In ra 81 vì phép dịch bit dừng lại ngay khi biến b đạt giá trị bằng 2 ở bước cuối',
              'In ra 27 vì các bit bật của số 11 ứng với tích 3^1 nhân 3^2 chia dư cho 100',
              'In ra 47 vì 11 = 8 + 2 + 1 nên res nhân lần lượt với 3, 9 và 61 theo mod 100'
            ],
            correct: 3,
            explain: '11 = 8 + 2 + 1 (1011_2). Bước 1 (b=11 lẻ): res = 3, a = 9, b = 5. Bước 2 (b=5 lẻ): res = (3 * 9) % 100 = 27, a = 81, b = 2. Bước 3 (b=2 chẵn): a = (81*81) % 100 = 61, b = 1. Bước 4 (b=1 lẻ): res = (27 * 61) % 100 = 1647 % 100 = 47, b = 0. In ra: 47.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long mod = 10;
    long long a = 4, b = 19;
    long long wrongSub = (a - b) % mod;
    long long safeSub = ((a - b) % mod + mod) % mod;
    cout << wrongSub << ' ' << safeSub << '\\n';
    return 0;
}`,
            q: 'Quan sát hai cách tính phép trừ đồng dư trên <code>(4 - 19)</code> theo <code>mod = 10</code>. Hai số in ra là gì?',
            options: [
              'In ra 5 5 vì cả hai phép chia dư trên số nguyên đều tự chuyển về giá trị dương',
              'In ra -5 5 vì C++ giữ nguyên dấu âm ở wrongSub và safeSub cộng bù thêm 10',
              'In ra -5 15 vì safeSub cộng thêm 10 mà quên chia dư lại một lần nữa ở cuối',
              'In ra -1 9 vì kết quả phép trừ trước khi chia dư bị giảm tiếp thêm 1 đơn vị'
            ],
            correct: 1,
            explain: '4 - 19 = -15. Trong C++, (-15) % 10 trả về -5. Với safeSub: (-5 + 10) % 10 = 5 % 10 = 5. In ra: -5 5.'
          },
          {
            type: 'single',
            q: 'Trong hàm <code>binPow(long long a, long long b, long long mod)</code>, vì sao bắt buộc phải đặt lệnh <code>a %= mod;</code> ngay trước vòng lặp <code>while (b &gt; 0)</code>?',
            options: [
              'Để vòng lặp while chạy giảm đi đúng một nửa số bước lặp so với khi không ép dư',
              'Để khi b = 0 chương trình vẫn trả về chính xác giá trị phần dư a % mod ban đầu',
              'Để khi cơ số a rất lớn (ví dụ 10^12) phép tính a * a đầu tiên không bị tràn số',
              'Để tự động biến các số mũ âm b < 0 thành số mũ dương trước khi thực hiện dịch bit'
            ],
            correct: 2,
            explain: 'Nếu không có a %= mod ở đầu hàm, khi đề cho a = 10^12 thì ngay lệnh a = (a * a) % mod ở lượt đầu tiên phép nhân 10^12 * 10^12 = 10^24 sẽ tràn ngay long long (9.22 * 10^18).'
          },
          {
            type: 'multiple',
            q: 'Những quy tắc nào sau đây là <strong>ĐÚNG</strong> về số học đồng dư và Lũy thừa nhị phân?',
            options: [
              'Có thể tính (a / b) % M trực tiếp bằng công thức ((a % M) / (b % M)) % M',
              'Khi b = 10^18, vòng lặp while (b > 0) trong binPow chỉ thực hiện khoảng 60 bước',
              'Cần dùng kiểu long long cho các phép nhân đồng dư khi M = 10^9 + 7 để tránh tràn int',
              'Nếu a < b (0 <= a, b < M), biểu thức (a - b + M) % M luôn cho kết quả thuộc [0, M - 1]'
            ],
            correct: [1, 2, 3],
            explain: 'B, C và D đều đúng. A sai hoàn toàn vì phép chia không có tính chất phân phối với phép lấy dư thông thường (ví dụ (10 / 2) % 3 = 2 nhưng ((10 % 3) / (2 % 3)) % 3 = 1 / 2 = 0).'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module cuối - Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l107_prime_square_bound',
        title: 'Thiếu Dấu "=" Ở i * i <= n Làm Nhận Nhầm Số Chính Phương (WA)',
        description: 'Chương trình đọc một số nguyên dương n và kiểm tra xem n có phải số nguyên tố hay không (in YES hoặc NO). Tuy nhiên với các số là bình phương của một số nguyên tố (như 25 = 5 * 5 hay 49 = 7 * 7), chương trình luôn báo nhầm là YES!',
        failingInput: '25',
        failingOutput: 'YES',
        expectedOutput: 'NO',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

bool isPrime(long long n) {
    if (n < 2) return false;
    for (long long i = 2; i * i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long n;
    cin >> n;
    cout << (isPrime(n) ? "YES" : "NO") << '\\n';
    return 0;
}`,
        bugLine: 6,
        patches: [
          { text: 'Đổi dòng 5 thành if (n <= 2) return false; để lọc thêm trường hợp số 2' },
          { text: 'Đổi dòng 6 thành for (long long i = 2; i * i <= n; i++) { để kiểm tra cả ước tại căn bậc hai' },
          { text: 'Đổi dòng 6 thành for (long long i = 2; i * i <= n / 2; i++) { để rút ngắn vòng lặp' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 6, điều kiện i * i < n dừng khi i = 5 vì 5 * 5 < 25 là sai, bỏ sót đúng ước 5 của 25! Đổi thành i * i <= n để kiểm tra đủ các ước từ 2 đến floor(sqrt(n)).'
      },
      {
        id: 'dbg_l107_lcm_overflow',
        title: 'Tràn Số Trung Gian Khi Tính LCM Theo Thứ Tự (a * b) / gcd (WA)',
        description: 'Cho hai số nguyên dương a, b <= 10^13 có ước chung lớn nhất đủ lớn để LCM(a, b) vẫn nằm gọn trong long long. Nhưng khi thử với a = 2*10^12 và b = 3*10^12, thay vì in ra 6000000000000, chương trình lại in ra một số âm vô nghĩa!',
        failingInput: '2000000000000 3000000000000',
        failingOutput: '-6424158',
        expectedOutput: '6000000000000',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

long long myGcd(long long a, long long b) {
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a, b;
    cin >> a >> b;
    long long lcm = (a * b) / myGcd(a, b);
    cout << lcm << '\\n';
    return 0;
}`,
        bugLine: 18,
        patches: [
          { text: 'Đổi dòng 4 thành int myGcd(int a, int b) { để tăng tốc phép chia dư' },
          { text: 'Đổi dòng 19 thành cout << abs(lcm) << \'\\n\'; để bỏ dấu âm ở kết quả' },
          { text: 'Đổi dòng 18 thành long long lcm = (a / myGcd(a, b)) * b; để chia trước khi nhân' }
        ],
        correctPatch: 2,
        explain: 'Ở dòng 18, tích a * b = 6 * 10^24 vượt quá giới hạn ~9.22 * 10^18 của kiểu long long trước khi kịp chia cho gcd = 10^12. Chia trước (a / myGcd(a, b)) * b thu gọn 2*10^12 / 10^12 = 2 rồi mới nhân 3*10^12 = 6000000000000.'
      },
      {
        id: 'dbg_l107_binpow_mod',
        title: 'Quên "% mod" Ở Bước Cập Nhật res Trong Lũy Thừa Nhị Phân (WA)',
        description: 'Chương trình tính (a^b) % mod bằng Lũy thừa nhị phân lặp. Với bộ test a = 1000000000, b = 3, mod = 1000000007, kết quả trả về là 49000000000 (vượt cả mod!) thay vì đáp án đúng 999999664.',
        failingInput: '1000000000 3 1000000007',
        failingOutput: '49000000000',
        expectedOutput: '999999664',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

long long binPow(long long a, long long b, long long mod) {
    long long res = 1 % mod;
    a %= mod;
    while (b > 0) {
        if (b & 1LL) {
            res = res * a;
        }
        a = (a * a) % mod;
        b >>= 1;
    }
    return res;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a, b, m;
    cin >> a >> b >> m;
    cout << binPow(a, b, m) << '\\n';
    return 0;
}`,
        bugLine: 9,
        patches: [
          { text: 'Đổi dòng 9 thành res = (res * a) % mod; để luôn giữ res nhỏ hơn mod' },
          { text: 'Đổi dòng 14 thành return res % mod; và giữ nguyên dòng 9 không cần chia dư' },
          { text: 'Đổi dòng 11 thành a = a * a; để chỉ lấy dư một lần ở cuối hàm binPow' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 9, việc quên % mod làm res phình lên thành 10^9 * 49 = 49000000000 (và nếu b có nhiều bit 1 hơn sẽ tràn ngay long long trước khi tới dòng return!). Lấy dư ngay tại dòng 9 đảm bảo res luôn thuộc [0, mod - 1].'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — L1-07)
    // ============================================================================
    practiceProblems: [
      {
        id: 'ABC149-C',
        title: 'C - Next Prime',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/abc149/tasks/abc149_c',
        hint: 'Giới hạn $2 \\le X \\le 10^5$, TL 2.0s, ML 1024 MB. Tăng dần biến $x$ từ $X$ trở đi và dùng hàm <code>isPrime(x)</code> trong $O(\\sqrt{x})$ (nhớ <code>i * i &lt;= x</code> và $x \\ge 2$); gặp số nguyên tố đầu tiên thì in ra và dừng!'
      },
      {
        id: 'ABC148-C',
        title: 'C - Snack',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/abc148/tasks/abc148_c',
        hint: 'Giới hạn $1 \\le A, B \\le 10^5$, TL 2.0s, ML 1024 MB. Tìm số bánh nhỏ nhất chia hết cho cả $A$ và $B$ chính là $\\text{LCM}(A, B) = (A / \\gcd(A, B)) \\cdot B$. Nhớ dùng kiểu <code>long long</code> vì LCM có thể lên tới $10^{10}$ (tràn <code>int</code>!).'
      },
      {
        id: 'CF-742A',
        title: '742A - Arpa’s hard exam and Mehrdad’s naive cheat',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/742/A',
        hint: 'Giới hạn $0 \\le n \\le 10^9$, TL 1.0s, ML 256 MB. Chữ số tận cùng của $1378^n$ chính là <code>binPow(1378, n, 10)</code> trong $O(\\log n)$. Hàm <code>binPow</code> chuẩn tự trả về $1$ khi $n = 0$ và ép $1378 \\bmod 10 = 8$ ở đầu hàm!'
      },
      {
        id: 'CSES-1095',
        title: 'Exponentiation',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1095',
        hint: 'Giới hạn $1 \\le n \\le 2 \\cdot 10^5$, $0 \\le a, b \\le 10^9$, quy ước $0^0 = 1$, modulo $10^9 + 7$, TL 1.00s, ML 512 MB. Chạy <code>binPow(a, b, 1000000007LL)</code> cho mỗi cặp $(a, b)$ trong $O(\\log b)$; chú ý fast I/O và <code>\'\\n\'</code> vì có tới $2 \\cdot 10^5$ dòng output!'
      },
      {
        id: 'CF-230B',
        title: '230B - T-primes',
        judge: 'Codeforces',
        tier: 2,
        link: 'https://codeforces.com/problemset/problem/230/B',
        hint: 'Giới hạn $1 \\le n \\le 10^5$, $1 \\le x_i \\le 10^{12}$, TL 2.0s, ML 256 MB. Một số có đúng 3 ước khi và chỉ khi nó có dạng $p^2$ với $p$ là số nguyên tố! Sàng Eratosthenes tới $10^6$ trên <code>vector&lt;bool&gt;</code>, rồi với mỗi $x$ lấy căn <code>s = (long long)sqrt((double)x)</code> (chỉnh $\\pm 1$ bằng <code>while</code> sao cho $s^2 \\le x &lt; (s+1)^2$) và kiểm tra <code>s * s == x &amp;&amp; isPrime[s]</code>.'
      },
      {
        id: 'ABC131-C',
        title: 'C - Anti-Division',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc131/tasks/abc131_c',
        hint: 'Giới hạn $1 \\le A \\le B \\le 10^{18}$, $1 \\le C, D \\le 10^9$, TL 2.0s, ML 1024 MB. Số lượng số trong $[1, N]$ chia hết cho $C$ hoặc $D$ là $N/C + N/D - N/\\text{LCM}(C, D)$. Dùng công thức <code>(C / myGcd(C, D)) * D</code> để tính LCM an toàn trong <code>long long</code> và lấy $f(B) - f(A - 1)$.'
      },
      {
        id: 'CF-1285C',
        title: '1285C - Fadi and LCM',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/1285/C',
        hint: 'Giới hạn $1 \\le X \\le 10^{12}$, TL 1.0s, ML 256 MB. Duyệt mọi ước $d$ từ $1$ đến $\\sqrt{X}$ (<code>1LL * d * d &lt;= X</code>): khi $X \\bmod d == 0$, nếu <code>myGcd(d, X / d) == 1</code> thì chắc chắn $\\text{LCM}(d, X / d) == X$! Lưu cặp có $\\max(d, X / d)$ nhỏ nhất (tối ưu trong $O(\\sqrt{X} \\log X)$).'
      },
      {
        id: 'VNOJ-NKABD',
        title: 'NKABD - Số phong phú',
        judge: 'VNOJ',
        tier: 3,
        link: 'https://oj.vnoi.info/problem/nkabd',
        hint: 'Giới hạn $1 \\le L \\le R \\le 10^5$, TL 0.38s, ML 256 MB. Áp dụng ý tưởng vòng lặp bội số của Sàng: tạo <code>vector&lt;int&gt; sumDiv(R + 1, 0)</code>, với mỗi $i$ từ $1$ đến $R/2$ duyệt $j = 2i; j \\le R; j += i$ rồi cộng <code>sumDiv[j] += i</code> trong $O(R \\log R)$ (~$1.2 \\cdot 10^6$ phép tính, vượt nhẹ TL 0.38s!), sau đó đếm số $x$ trong $[L, R]$ có <code>sumDiv[x] &gt; x</code>.'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
