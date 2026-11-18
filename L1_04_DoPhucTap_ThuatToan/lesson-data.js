/**
 * DỮ LIỆU BÀI GIẢNG L1-04: PHÂN TÍCH ĐỘ PHỨC TẠP THUẬT TOÁN (BIG-O)
 * Tầng 1 — Pha 1 Lớp 9 (Nối tiếp từ L1-03, bài tổng kết cuối Pha 1)
 * Quy tắc Pha 1 nghiêm ngặt: chỉ dùng mảng tĩnh toàn cục (const int N = ...;), biến nguyên thủy,
 * hàm cơ bản và tham chiếu &. Tuyệt đối không dùng các cấu trúc STL Pha 2, không dùng toán tử ba ngôi,
 * và luôn dùng thuật ngữ "ngăn xếp lời gọi hàm / bộ nhớ stack".
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'do_phuc_tap',
    number: 'Bài Học L1-04',
    shortTitle: 'Độ Phức Tạp Big-O',
    title: 'Bài L1-04: Phân Tích Độ Phức Tạp Thuật Toán (Big-O) — Thời Gian & Không Gian',
    lead: 'Dự đoán chính xác TLE hay MLE trước khi gõ dòng code đầu tiên: đếm số phép toán sơ cấp qua ký hiệu Big-O, vận dụng quy tắc vàng 10^8 phép tính/giây, đọc ngược giới hạn N trong đề bài và tính nhanh bộ nhớ theo giới hạn 256 MB.',
    modules: [
      // ============================================================================
      // MODULE 1: ĐẾM PHÉP TOÁN SƠ CẤP & KÝ HIỆU BIG-O
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Đếm Phép Toán & Big-O',
        title: 'Vấn Đề Nhỏ 1: Đếm Phép Toán Sơ Cấp & Ký Hiệu Big-O',
        lead: 'Tại sao không dùng đồng hồ bấm giây để chấm tốc độ code, cách nhận diện 7 bậc tăng trưởng từ O(1) đến O(2^N), 2 quy tắc rút gọn Big-O và cảnh báo ngoại lệ khi có hệ số hằng số lớn hay T bộ test.',
        subproblem: {
          title: 'Làm sao đo độ nhanh/chậm của một thuật toán một cách công bằng, không phụ thuộc máy khỏe hay máy yếu, và dự đoán tốc độ khi N tăng gấp 1000 lần?',
          desc: 'Chạy thử với N = 5 trên máy nhà luôn mất chưa tới 0.001 giây nên không thể phát hiện lỗi quá thời gian. Thay vì bấm đồng hồ, ta đếm số phép toán sơ cấp phụ thuộc theo N rồi rút gọn bằng ký hiệu Big-O.'
        },
        cards: [
          {
            heading: 'Đếm Số Bước Theo N Thay Vì Bấm Đồng Hồ — 7 Bậc Big-O Kinh Điển',
            tag: 'Thước đo độc lập phần cứng',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hai bạn cùng giao <strong>$N$ hộp bánh mì</strong>: bạn A đi xe máy, bạn B đi bộ. Nếu đo bằng <em>đồng hồ bấm giây</em> ở $N = 10$, bạn A thắng nhờ phương tiện khỏe hơn — giống như code chạy trên CPU đời mới nhanh hơn máy cũ. Để chấm điểm <strong>cách tổ chức làm việc</strong>, ta đếm <strong>số bước phải làm theo $N$</strong>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>$O(1)$ — Hằng số:</strong> Mở tủ lấy đúng hộp đầu tiên. Dù kho có $10$ hay $10^9$ hộp vẫn chỉ làm <strong>1 bước</strong>.</li>
                  <li><strong>$O(\\log N)$ — Logarit (Chia đôi liên tiếp):</strong> Trò chơi đoán số từ $1$ đến $N$ bằng cách luôn chặt đôi khoảng tìm kiếm. Với $N = 10^9$, chỉ mất khoảng <strong>30 bước</strong> ($\\log_2 10^9 \\approx 30$)!</li>
                  <li><strong>$O(\\sqrt{N})$ — Căn bậc hai:</strong> Kiểm tra ước của $N$ chỉ bằng cách đi tới $\\sqrt{N}$ rồi ghép cặp đối xứng $(i, N/i)$. Với $N = 10^{12}$ chỉ chạy tới $10^6$ bước.</li>
                  <li><strong>$O(N)$ — Tuyến tính:</strong> Điểm danh mỗi bạn trong hàng đúng 1 lần. $N$ tăng gấp 10 thì số bước tăng gấp 10.</li>
                  <li><strong>$O(N \\log N)$ — Tuyến tính nhân logarit:</strong> Lặp $N$ lượt, mỗi lượt làm một việc mất $O(\\log N)$; hoặc chuỗi điều hòa $N/1 + N/2 + \\dots + N/N \\approx N \\ln N$.</li>
                  <li><strong>$O(N^2)$ — Bình phương:</strong> Trong phòng có $N$ bạn, mỗi bạn bắt tay lần lượt tất cả các bạn còn lại (2 vòng lặp lồng nhau). $N$ tăng gấp 10 thì số bước tăng gấp <strong>100 lần</strong>!</li>
                  <li><strong>$O(2^N)$ — Hàm mũ:</strong> Có $N$ món đồ, mỗi món quyết định lấy hay bỏ nên số cách nhân đôi qua từng món ($2 \\times 2 \\times \\dots \\times 2$). Với $N = 30$ đã vượt $10^9$ bước!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào từng dạng vòng lặp trong C++14</span>
                <p>Mỗi phép gán, cộng trừ nhân chia, so sánh hay đọc ô mảng <code>a[i]</code> tính là <strong>1 phép toán sơ cấp $O(1)$</strong>. Quan sát cách đếm số lần lặp <code>buoc</code> cho từng bậc:</p>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long n = 1000;

    // 1. O(1): Công thức trực tiếp, không phụ thuộc độ lớn của n
    long long tong = n * (n + 1) / 2;

    // 2. O(log N): Chia đôi liên tiếp -&gt; n = 1000 chỉ chạy đúng 10 lần!
    long long buocLog = 0, x = n;
    while (x &gt; 0) {
        buocLog++;
        x /= 2;
    }

    // 3. O(sqrt(N)): Duyệt i tới căn bậc hai -&gt; n = 1000 chạy 31 lần!
    long long buocSqrt = 0;
    for (long long i = 1; i * i &lt;= n; i++) {
        buocSqrt++;
    }

    // 4. O(N log N): Chuỗi điều hòa (nền tảng sàng ước 1..n)
    long long buocNLog = 0;
    for (int i = 1; i &lt;= n; i++) {
        for (int j = i; j &lt;= n; j += i) {
            buocNLog++;
        }
    }

    // 5. O(N^2): Hai vòng lặp lồng nhau -&gt; ~500,000 bước khi n = 1000
    long long buocN2 = 0;
    for (int i = 1; i &lt;= n; i++) {
        for (int j = i + 1; j &lt;= n; j++) {
            buocN2++;
        }
    }

    cout &lt;&lt; tong &lt;&lt; ' ' &lt;&lt; buocLog &lt;&lt; ' ' &lt;&lt; buocSqrt
         &lt;&lt; ' ' &lt;&lt; buocNLog &lt;&lt; ' ' &lt;&lt; buocN2 &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Phép toán sơ cấp (<code>Elementary Operation</code>):</strong> Thao tác cơ bản của CPU như gán, cộng/trừ/nhân/chia/<code>%</code>, so sánh, truy cập mảng <code>a[i]</code>, đều tốn thời gian $O(1)$.</li>
                  <li><strong>Ký hiệu Big-O (<code>Big-O Notation</code>):</strong> Mô tả tốc độ tăng trưởng của số phép toán theo kích thước đầu vào $N$ trong trường hợp xấu nhất, xếp từ nhanh tới chậm: $O(1) &lt; O(\\log N) &lt; O(\\sqrt{N}) &lt; O(N) &lt; O(N \\log N) &lt; O(N^2) &lt; O(2^N)$.</li>
                </ul>
              </div>
            `
          },
          {
            heading: '2 Quy Tắc Rút Gọn Big-O & Cảnh Báo Hằng Số / Đa Bộ Test',
            tag: 'Quy tắc rút gọn & bẫy thực chiến',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Tại sao $2N + 5 \\to O(N)$ và $N^2 + 100N \\to O(N^2)$?</span>
                <p>Giả sử công thức đếm chi phí chính xác của bạn là $N^2 + 100N + 5000$. Khi $N$ còn nhỏ ($N = 10$), con số $5000$ trông rất to; nhưng khi $N = 100\\,000$ thì $N^2 = 10^{10}$ đè bẹp hoàn toàn $100N = 10^7$ và $5000$. Vì vậy ta có <strong>2 quy tắc rút gọn Big-O</strong>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bỏ hằng số nhân và hằng số cộng:</strong> $2N + 5 \\to O(N)$ và $3N^2 \\to O(N^2)$.</li>
                  <li><strong>Giữ lại số hạng tăng nhanh nhất:</strong> Hai khối chạy <em>nối tiếp</em> lấy bậc lớn hơn ($N^2 + 100N \\to O(N^2)$); hai khối <em>lồng nhau</em> thì nhân bậc ($N \\times \\log N \\to O(N \\log N)$).</li>
                  <li><strong>Cảnh báo thực chiến cực quan trọng:</strong>
                    1) Nếu hệ số hằng số $C$ quá lớn (ví dụ một vòng $O(N)$ nhưng mỗi lượt có 500 phép chia nặng với $N = 10^6$), tổng $5 \\times 10^8$ bước vẫn có thể <strong>TLE</strong>!
                    2) Khi có biến thứ hai như <strong>$T$ bộ test</strong> hoặc <strong>$M$ truy vấn</strong>, tuyệt đối KHÔNG bỏ $T$ hay $M$ như hằng số: phải viết rõ $O(T \\cdot N)$ hay $O(N + M)$!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Phân biệt O(N + M) nối tiếp, O(N * M) lồng nhau và O(T * log N)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const int MAXN = 100005;
int a[MAXN], b[MAXN];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 100, m = 100;

    // 1. Nối tiếp 2 vòng lặp theo N và M -&gt; O(N + M)
    long long tongA = 0, tongB = 0;
    for (int i = 1; i &lt;= n; i++) tongA += a[i];
    for (int j = 1; j &lt;= m; j++) tongB += b[j];

    // 2. Lồng nhau theo N và M -&gt; O(N * M) (CHÚ Ý: không gộp thành O(N)!)
    long long demCap = 0;
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            if (a[i] == b[j]) demCap++;
        }
    }

    // 3. Đa bộ test T: mỗi test chạy O(log X) -&gt; tổng O(T * log X)
    int t = 3;
    long long buoc = 0;
    while (t--) {
        long long x = 1000;
        while (x &gt; 0) {
            buoc++;
            x /= 2;
        }
    }

    cout &lt;&lt; tongA + tongB &lt;&lt; ' ' &lt;&lt; demCap &lt;&lt; ' ' &lt;&lt; buoc &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Quy tắc cộng (<code>Addition Rule</code>):</strong> Các đoạn code thực thi tuần tự nối tiếp nhau có độ phức tạp bằng tổng, rút gọn còn số hạng trội nhất: $O(f(N) + g(N)) = O(\\max(f(N), g(N)))$ nếu cùng biến $N$, hoặc giữ nguyên $O(N + M)$ nếu khác biến.</li>
                  <li><strong>Quy tắc nhân (<code>Multiplication Rule</code>):</strong> Vòng lặp ngoài chạy $A$ lần, mỗi lần chạy trọn khối bên trong mất $B$ bước $\\implies O(A \\cdot B)$.</li>
                  <li><strong>Hệ số hằng số (<code>Constant Factor</code>):</strong> Con số đứng trước biến lớn nhất; Big-O ẩn nó đi để phân loại lý thuyết, nhưng khi chấm bài 1.0s vẫn phải để mắt tới nó và số bộ test $T$.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_bigo_growth',
            title: 'Phòng Thí Nghiệm 1: So Sánh Số Bước Thực Tế Khi N Tăng Lên Quy Mô Thi Đấu',
            desc: 'Quan sát bài toán đếm số cặp hoặc tính tổng trên N phần tử: khi chạy N = 1000 ở nhà thấy mượt, nhưng chuyển sang cách O(N) so với O(N^2) sẽ chênh nhau hàng tỷ phép toán ở N = 100,000!',
            toggles: [
              {
                key: 'algoMode',
                label: 'Thuật toán xử lý dãy N phần tử',
                options: [
                  { value: 'linear_on', text: '1 vòng lặp cộng dồn — O(N)', kind: 'ok' },
                  { value: 'nested_on2', text: '2 vòng lặp lồng nhau — O(N^2)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.algoMode === 'linear_on';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 1000;
    long long ops = 0, tong = 0, tongTruoc = 0;
    for (int i = 1; i <= n; i++) {
        ops++;
        tong += 1LL * i * tongTruoc;
        tongTruoc += i;
    }
    cout << "Ket qua = " << tong << ", so buoc = " << ops << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 1000;
    long long ops = 0, tong = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = i + 1; j <= n; j++) {
            ops++;
            tong += 1LL * i * j;
        }
    }
    cout << "Ket qua = " << tong << ", so buoc = " << ops << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [9, 10, 11, 12] : [9, 10, 11, 12, 13],
                statusOk: isOk,
                statusText: isOk
                  ? 'TỐI ƯU O(N): Với N = 1000 chỉ mất 1,000 bước; khi N = 10^5 chỉ mất 100,000 bước (~0.001s AC)!'
                  : 'BÙNG NỔ O(N^2): Ngay tại N = 1000 đã tốn 499,500 bước; khi N = 10^5 sẽ nhảy lên 5*10^9 bước (TLE)!',
                predictions: [
                  { text: 'Hai cách cho cùng một kết quả đúng, nhưng O(N) chỉ cần đúng 1,000 bước và sống khỏe khi N = 10^5' },
                  { text: 'O(N^2) tốn tới gần 500,000 bước ngay ở N = 1000, nên khi N = 10^5 sẽ vọt lên ~5 tỷ bước gây TLE' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nKet qua = 125083208250, so buoc = 1000\n[Mo phong len N = 100,000: chi mat 100,000 buoc -> AC em ru!]'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nKet qua = 125083208250, so buoc = 499500\n[Canh bao TLE: O N = 100,000 se phai chay 4,999,950,000 buoc (~50 giay)!]',
                explain: isOk
                  ? 'Nhờ giữ tổng cộng dồn tongTruoc, mỗi phần tử i chỉ đi qua đúng 1 lần nên số bước tăng tuyến tính O(N).'
                  : 'Khi N tăng 100 lần (từ 1,000 lên 100,000), số bước của thuật toán O(N^2) tăng tới 100 * 100 = 10,000 lần, vượt xa ngưỡng xử lý 1 giây của CPU!'
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
    long long n = 36, buoc = 0;
    while (n > 0) {
        buoc++;
        n /= 2;
    }
    cout << buoc << '\\n';
    return 0;
}`,
            q: 'Theo dõi vòng lặp chia đôi <code>O(log N)</code> trên đây với <code>n = 36</code>. Màn hình sẽ in ra giá trị biến <code>buoc</code> là bao nhiêu?',
            options: [
              'In ra 5 vì vòng lặp chia đôi dừng lại ngay trước khi biến n chạm về giá trị 1',
              'In ra 6 vì qua các giá trị 36, 18, 9, 4, 2, 1 đều đếm thêm một bước chia đôi',
              'In ra 7 vì sau khi n giảm về 0 thì điều kiện lặp vẫn chạy thêm một lần nữa',
              'In ra 18 vì phép chia nguyên cho 2 chạy đúng một nửa số lượng của số 36 đầu'
            ],
            correct: 1,
            explain: 'Các giá trị của n ở đầu mỗi lần lặp lần lượt là: 36 (bước 1 -&gt; 18), 18 (bước 2 -&gt; 9), 9 (bước 3 -&gt; 4), 4 (bước 4 -&gt; 2), 2 (bước 5 -&gt; 1), 1 (bước 6 -&gt; 0). Khi n = 0 thì vòng while dừng, nên in ra 6.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 4;
    long long buoc = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = i + 1; j <= n; j++) {
            buoc++;
        }
    }
    for (int k = 1; k <= n; k++) {
        buoc++;
    }
    cout << buoc << '\\n';
    return 0;
}`,
            q: 'Khi chạy đoạn mã gồm hai khối lệnh nối tiếp trên với <code>n = 4</code>, giá trị <code>buoc</code> in ra và độ phức tạp Big-O tương ứng là gì?',
            options: [
              'In ra 6 và tổng độ phức tạp của hai khối lệnh nối tiếp được rút gọn là O(N)',
              'In ra 16 và tổng độ phức tạp của hai khối lệnh nối tiếp được rút gọn là O(N^2)',
              'In ra 20 và tổng độ phức tạp của hai khối lệnh nối tiếp được rút gọn là O(N^3)',
              'In ra 10 và tổng độ phức tạp của hai khối lệnh nối tiếp được rút gọn là O(N^2)'
            ],
            correct: 3,
            explain: 'Khối lồng nhau chạy 3 + 2 + 1 + 0 = 6 lần; khối nối tiếp chạy thêm 4 lần nên tổng buoc = 10. Theo quy tắc cộng, N(N-1)/2 + N rút gọn còn số hạng bậc lớn nhất là O(N^2).'
          },
          {
            type: 'single',
            q: 'Một chương trình có tổng số phép toán sơ cấp là $2N^2 + 100N + 50$. Cách rút gọn Big-O và lưu ý thực chiến nào sau đây là chuẩn xác nhất?',
            options: [
              'Rút gọn thành O(N^2), nhưng vẫn phải cảnh giác nếu có hệ số ẩn lớn hoặc thêm biến T bộ test',
              'Rút gọn thành O(N^2), và trong mọi bài thi CP luôn được phép bỏ qua số lượng T bộ test đi kèm',
              'Rút gọn thành O(N^3), vì phải cộng bậc của N^2 với bậc của N thành số hạng lớn nhất',
              'Rút gọn thành O(N), vì hệ số 100 ở trước N lớn hơn hệ số 2 đứng trước số hạng N^2'
            ],
            correct: 0,
            explain: 'Ta bỏ hằng số và chỉ giữ số hạng bậc cao nhất N^2 -&gt; O(N^2). Tuy nhiên trong thi đấu CP, hệ số hằng số ẩn quá lớn hoặc có thêm T bộ test ngoài vẫn có thể làm tổng bước vượt 10^8 và gây TLE.'
          },
          {
            type: 'single',
            q: 'Đoạn mã <code>for (int i = 1; i &lt;= n; i++) for (int j = i; j &lt;= n; j += i) dem++;</code> (dùng để đếm ước cho mọi số từ <code>1..n</code>) có độ phức tạp thời gian là bao nhiêu?',
            options: [
              'Độ phức tạp là O(N) vì bước nhảy j += i bỏ qua gần hết phần tử trong vòng lặp',
              'Độ phức tạp là O(N^2) vì có hai vòng lặp for lồng nhau cùng đi tới giới hạn n',
              'Độ phức tạp là O(N log N) vì tổng số bước N/1 + N/2 + ... + N/N xấp xỉ N ln N',
              'Độ phức tạp là O(N sqrt(N)) vì biến i tăng dần nên chỉ có khoảng căn N lượt chạy'
            ],
            correct: 2,
            explain: 'Với mỗi i, vòng trong chạy n / i lần. Tổng số lần chạy qua i = 1..n là n/1 + n/2 + ... + n/n = n * (1 + 1/2 + ... + 1/n), chuỗi điều hòa này xấp xỉ ln(n), nên độ phức tạp là O(N log N).'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> về cách đếm phép toán sơ cấp và ký hiệu Big-O?',
            options: [
              'Các phép gán, so sánh, cộng trừ nhân chia và truy cập a[i] đều được tính là phép toán sơ cấp O(1)',
              'Hai vòng lặp chạy nối tiếp theo N và M có độ phức tạp O(N + M), còn lồng nhau là O(N * M)',
              'Nếu một bài toán có T bộ test và mỗi test mất O(N), ta có thể bỏ T như hằng số để viết là O(N)',
              'Khi N tăng từ 10^3 lên 10^5, thuật toán O(N^2) tăng số bước lên gấp 10,000 lần trong khi O(N) chỉ tăng 100 lần'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D đều chính xác. C sai nghiêm trọng vì T là biến đầu vào độc lập của số bộ test chứ không phải hằng số cố định — phải giữ nguyên thành O(T * N).'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: QUY TẮC VÀNG 10^8 PHÉP/GIÂY & ĐỌC NGƯỢC GIỚI HẠN N
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Quy Tắc 10^8 & Giới Hạn N',
        title: 'Vấn Đề Nhỏ 2: Quy Tắc Vàng 10^8 Phép/Giây & Đọc Ngược Giới Hạn N',
        lead: 'Cách dùng mốc ~10^8 phép toán/giây để lập bảng tra ngược giới hạn N trong đề bài (N &lt;= 20, 500, 5000, 10^5, 10^9, 10^18) và né 3 cạm bẫy kinh điển: T bộ test, tổng Sum(N), và vòng lặp ẩn trong hàm.',
        subproblem: {
          title: 'Vừa đọc đề thấy Time Limit 1.0s và giới hạn N (hoặc T và N), làm sao biết ngay thuật toán mình đang nghĩ sẽ AC hay bị TLE trước khi viết code?',
          desc: 'Áp dụng quy tắc CPU máy chấm thực hiện ~10^8 phép toán sơ cấp/giây (ngưỡng an toàn &lt;= 10^7 - 5*10^7), kết hợp bảng tra ngược giới hạn N và kiểm tra kỹ số lượng bộ test T.'
        },
        cards: [
          {
            heading: 'Quy Tắc Vàng ~10^8 Phép/Giây & Bảng Tra Ngược Giới Hạn N',
            tag: 'Đọc đề trong 5 giây',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Con số ~10^8 phép toán/giây &amp; Bảng tra chiến lược</span>
                <p>CPU máy chấm chạy được xấp xỉ <strong>$10^8$ (100 triệu) phép toán sơ cấp mỗi giây</strong>. Vì mỗi lượt lặp thường kèm 2–5 thao tác nhỏ (tăng biến đếm, kiểm tra điều kiện, truy cập mảng), mốc <strong>$\\le 10^7$–$5 \\times 10^7$</strong> bước là ngưỡng an toàn gần như chắc chắn <strong>AC</strong> trong 1.0s:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>$N \\le 20$:</strong> Thoải mái dùng $O(2^N)$ (~$10^6$) hoặc $O(N \\cdot 2^N)$ (~$2 \\times 10^7$).</li>
                  <li><strong>$N \\le 500$:</strong> Cho phép tới $O(N^3)$ (~$1.25 \\times 10^8$, viết vòng trong thật gọn).</li>
                  <li><strong>$N \\le 5000$:</strong> Dùng $O(N^2)$ (~$2.5 \\times 10^7$) — 2 vòng lặp lồng nhau chạy rất khỏe!</li>
                  <li><strong>$N \\le 10^5$ – $10^6$:</strong> Bắt buộc <strong>$O(N)$</strong> hoặc <strong>$O(N \\log N)$</strong> (~$2 \\times 10^7$). Mọi code $O(N^2)$ ($10^{10}$–$10^{12}$) chắc chắn <strong>TLE</strong>!</li>
                  <li><strong>$N \\le 10^9$ – $10^{12}$:</strong> Bắt buộc <strong>$O(\\sqrt{N})$</strong> ($\\le 10^6$), <strong>$O(\\log N)$</strong> hoặc <strong>$O(1)$</strong>; 1 vòng lặp $O(N)$ cũng bị <strong>TLE</strong>!</li>
                  <li><strong>$N \\le 10^{18}$:</strong> Chỉ có <strong>$O(\\log N)$</strong> ($\\le 60$ bước) hoặc <strong>$O(1)$</strong> mới sống sót!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Đọc N &lt;= 10^12 và hạ từ O(N) TLE xuống O(sqrt(N)) AC</span>
                <p>Ví dụ đếm số ước của số nguyên dương $N \\le 10^{12}$: duyệt $1..N$ tốn $10^{12}$ bước (mất ~3 tiếng!), chỉ cần duyệt tới $\\sqrt{N}$ là rút xuống tối đa $10^6$ bước (~0.01s):</p>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// Đếm ước trong O(sqrt(N)): với N = 10^12 chỉ chạy tối đa 10^6 bước!
long long demUocNhanh(long long n) {
    long long dem = 0;
    for (long long i = 1; i * i &lt;= n; i++) {
        if (n % i == 0) {
            dem++;
            if (i * i != n) {
                dem++; // Cộng thêm ước đối xứng n / i
            }
        }
    }
    return dem;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long n;
    if (cin &gt;&gt; n) {
        cout &lt;&lt; demUocNhanh(n) &lt;&lt; '\\n';
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Giới hạn thời gian (<code>Time Limit Exceeded — TLE</code>):</strong> Trạng thái bị dừng do chương trình chạy vượt ngưỡng thời gian quy định (thường 1.0–2.0 giây, ứng với $\\sim 10^8$ phép toán/giây).</li>
                  <li><strong>Đọc ngược giới hạn (<code>Constraint Analysis</code>):</strong> Thói quen đọc mục Constraints trước khi nghĩ thuật toán để khoanh vùng đúng bậc Big-O mục tiêu.</li>
                </ul>
              </div>
            `
          },
          {
            heading: '3 Bẫy Kinh Điển: T Bộ Test, Tổng Sum(N) & Vòng Lặp Ẩn Trong Hàm',
            tag: 'Bẫy TLE ngầm',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Tại sao N &lt;= 10^4 vẫn chết TLE?</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bẫy 1 — Quên nhân số bộ test $T$:</strong> Đề cho $T \\le 10^4$ và $N \\le 10^4$. Nhiều bạn chỉ nhìn $N = 10^4$ rồi viết $O(N^2)$ ($10^8$), quên mất vòng lặp <code>while (t--)</code> làm tổng số bước thành $T \\times N^2 = 10^4 \\times 10^8 = 10^{12}$ (TLE!). Để qua gọn, mỗi test phải hạ xuống $O(N)$ ($T \\times N = 10^8$, hơi sát) hoặc tốt nhất $O(\\log N)$ / $O(1)$!</li>
                  <li><strong>Ngoại lệ "Tổng $N$":</strong> Nếu đề ghi thêm câu <em>"Tổng $N$ của tất cả các bộ test không vượt quá $2 \\times 10^5$"</em> ($\\sum N \\le 2 \\times 10^5$), thì thuật toán $O(N)$ mỗi test chỉ mất tổng $O(\\sum N) = 2 \\times 10^5$ (AC cực nhanh!), không bị nhân $T \\times N$.</li>
                  <li><strong>Bẫy 2 — Vòng lặp ẩn trong hàm hoặc điều kiện <code>for</code>:</strong> Gọi <code>laNguyenTo(i)</code> ($O(\\sqrt{i})$) bên trong <code>for (i = 1..10^6)</code> sẽ thành $O(N \\sqrt{N}) \\approx 10^9$ (TLE)! Hoặc viết <code>for (int i = 0; i &lt; strlen(cstr); i++)</code> làm hàm C-style <code>strlen</code> quét lại cả xâu ở mỗi bước, biến vòng lặp tưởng $O(N)$ thành $O(N^2)$ (lưu ý: <code>s.size()</code> của <code>std::string</code> luôn là $O(1)$).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Đối chiếu T bộ test: O(T * sqrt(X)) TLE vs O(T * log X) AC</span>
                <p>Bài toán: Cho $T \\le 10^4$ bộ test, mỗi test cho $X \\le 10^{14}$. Hỏi $X$ có ước lẻ nào lớn hơn $1$ không? (Nếu chia hết hết thừa số $2$ mà còn lại $&gt; 1$ thì chắc chắn có ước lẻ!)</p>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// BẪY TLE: Nếu duyệt ước tới sqrt(X) = 10^7 cho T = 10^4 test -&gt; 10^11 bước!
// TỐI ƯU O(log X): Chia 2 liên tiếp tối đa 47 bước -&gt; T * 47 ~ 4.7*10^5 bước!
bool coUocLe(long long x) {
    while (x % 2 == 0) {
        x /= 2;
    }
    if (x &gt; 1) {
        return true;
    }
    return false;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int t;
    if (!(cin &gt;&gt; t)) return 0;
    while (t--) {
        long long x;
        cin &gt;&gt; x;
        if (coUocLe(x)) cout &lt;&lt; "YES" &lt;&lt; '\\n';
        else cout &lt;&lt; "NO" &lt;&lt; '\\n';
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Độ phức tạp đa bộ test (<code>Multi-test Complexity</code>):</strong> Tổng số bước là $O(T \\cdot f(N))$ nếu các test độc lập, hoặc $O(\\sum f(N_i))$ khi đề khống chế tổng kích thước $\\sum N$.</li>
                  <li><strong>Vòng lặp ẩn (<code>Hidden Loop</code>):</strong> Phép toán nằm trong điều kiện lặp hoặc bên trong hàm được gọi lại, âm thầm nhân thêm hệ số $O(N)$ hoặc $O(\\sqrt{N})$ vào tổng chi phí.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_multitest_10e8',
            title: 'Phòng Thí Nghiệm 2: Bẫy Đa Bộ Test T = 10^4, N = 10^4 Với Quy Tắc 10^8',
            desc: 'Bài toán: Có T = 10,000 bộ test, mỗi test cho một số nguyên N = 10,000, yêu cầu tính tổng các số chia hết cho 3 hoặc 5 từ 1 đến N. Hãy bật công tắc để so sánh vòng lặp O(T * N) sát ngưỡng 10^8 với công thức O(1) mỗi test (tổng O(T))!',
            toggles: [
              {
                key: 'testMode',
                label: 'Cách giải trong mỗi bộ test (T = 10,000; N = 10,000)',
                options: [
                  { value: 'o1_per_test', text: 'Công thức O(1) mỗi test -&gt; tổng O(T) = 10^4 bước', kind: 'ok' },
                  { value: 'on2_trap', text: 'Vòng lặp lồng O(N^2) kiểm tra trùng -&gt; T*N^2 = 10^12 bước', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.testMode === 'o1_per_test';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

long long tongBoi(long long n, long long k) {
    long long m = n / k;
    return k * m * (m + 1) / 2;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int t = 10000;
    long long n = 10000, ops = 0, tongChung = 0;
    while (t--) {
        ops += 3; // Tinh tongBoi(3) + tongBoi(5) - tongBoi(15) trong O(1)!
        tongChung += tongBoi(n, 3) + tongBoi(n, 5) - tongBoi(n, 15);
    }
    cout << "ops = " << ops << ", check = " << tongChung << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int t = 10000;
    long long n = 10000, ops = 0;
    // Gia su moi test viet nham 2 vong lap long O(N^2)
    long long uocLuongTong = 1LL * t * n * n;
    ops = n * n; // Chi rieng 1 test da ton 10^8 buoc!
    cout << "1 test = " << ops << ", T test = " << uocLuongTong << " (TLE!)\\n";
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [14, 15, 16] : [10, 11, 12],
                statusOk: isOk,
                statusText: isOk
                  ? 'AN TOAN AC: Chỉ 30,000 phép toán cho toàn bộ 10,000 test (~0.001s)!'
                  : 'TLE THẢM HẠI: 10,000 * 10,000^2 = 10^12 phép toán (&gt; 10^8 tới 10,000 lần)!',
                predictions: [
                  { text: 'Tổng số phép toán cho 10,000 test chỉ là 30,000 bước, chạy xong tức thì dưới 0.01s' },
                  { text: 'Quên nhân hệ số T khiến tổng phép toán vọt lên 10^12 bước và bị TLE ngay lập tức' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nops = 30000, check = 233416680000\n[Du doan 10^8/s: 30,000 << 10^8 -> AC tuyet doi!]'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1 test = 100000000, T test = 1000000000000 (TLE!)\n[Canh bao: 10^12 phep toan can ~10,000 giay (~2.7 gio), qua Time Limit 1.0s!]',
                explain: isOk
                  ? 'Thay vì lặp từ 1..N trong mỗi test, công thức cấp số cộng tính tổng bội của 3, 5 (trừ bội 15 bị đếm hai lần) giải quyết mỗi test trong O(1), nên T = 10^4 test chỉ tốn vài chục nghìn phép toán.'
                  : 'Nhiều bạn chỉ kiểm tra 1 test thấy N^2 = 10^8 nên tưởng kịp, nhưng quên vòng while (t--) bên ngoài nhân thêm T = 10^4 lần thành 10^12!'
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
    int a[3] = {12, 16, 20};
    int tongBuoc = 0;
    for (int i = 0; i < 3; i++) {
        int x = a[i];
        while (x % 2 == 0) {
            x /= 2;
            tongBuoc++;
        }
    }
    cout << tongBuoc << '\\n';
    return 0;
}`,
            q: 'Đoạn code mô phỏng thao tác chia 2 liên tiếp (giống bài tìm ước lẻ trong $O(\\log X)$) với 3 test <code>12, 16, 20</code>. Giá trị <code>tongBuoc</code> in ra là bao nhiêu?',
            options: [
              'In ra 7 vì số 16 chỉ chia đôi được ba lần trước khi dừng lại ở số nguyên lẻ 1',
              'In ra 8 vì các số 12, 16, 20 chia hết cho 2 lần lượt trong 2, 4 và 2 lượt lặp',
              'In ra 9 vì mỗi số còn chạy thêm một vòng kiểm tra sau khi giá trị đạt bằng 1',
              'In ra 12 vì cả ba phần tử trong mảng đều thực hiện chia đôi tối đa bốn lượt'
            ],
            correct: 1,
            explain: '12 chia 2 được 2 lần (12 -&gt; 6 -&gt; 3); 16 chia 2 được 4 lần (16 -&gt; 8 -&gt; 4 -&gt; 2 -&gt; 1); 20 chia 2 được 2 lần (20 -&gt; 10 -&gt; 5). Tổng số bước là 2 + 4 + 2 = 8.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a[5] = {0, 2, 3, 5, 4};
    long long ans = 0, tongTruoc = 0;
    for (int i = 1; i <= 4; i++) {
        ans += a[i] * tongTruoc;
        tongTruoc += a[i];
    }
    cout << ans << ' ' << tongTruoc << '\\n';
    return 0;
}`,
            q: 'Theo dõi thuật toán <code>O(N)</code> tính tổng tích mọi cặp <code>a[i] * a[j]</code> (với <code>i &lt; j</code>) trên dãy <code>[2, 3, 5, 4]</code>. Kết quả in ra màn hình là gì?',
            options: [
              'In ra 71 14 vì tại mỗi bước i chỉ cộng thêm tích của a[i] với tổng các phần tử đứng trước',
              'In ra 142 14 vì công thức tích lũy tính lặp cả hai chiều cặp (i, j) lẫn cặp (j, i)',
              'In ra 71 10 vì biến tongTruoc chưa cộng thêm giá trị phần tử cuối a[4] khi kết thúc',
              'In ra 51 14 vì ở bước cuối cùng biến tongTruoc vẫn chưa kịp cộng dồn phần tử a[3]'
            ],
            correct: 0,
            explain: 'i=1: ans+=2*0=0, tongTruoc=2; i=2: ans+=3*2=6, tongTruoc=5; i=3: ans+=5*5=31, tongTruoc=10; i=4: ans+=4*10=71, tongTruoc=14. Kết quả chính xác là 71 14.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int t = 3;
    long long ops = 0;
    while (t--) {
        long long n = 25;
        for (long long i = 1; i * i <= n; i++) {
            ops++;
        }
    }
    cout << ops << '\\n';
    return 0;
}`,
            q: 'Đếm chính xác số lượt lặp <code>ops</code> của thuật toán <code>O(T * sqrt(N))</code> khi <code>t = 3</code> và <code>n = 25</code>:',
            options: [
              'In ra 5 vì biến t chỉ đếm ngược nhưng vòng lặp for bên trong chỉ thực thi một lần',
              'In ra 12 vì điều kiện i * i &lt;= 25 dừng lại ngay trước khi biến i đạt tới giá trị 5',
              'In ra 15 vì mỗi bộ test chạy 5 lượt tới căn bậc hai của 25 và lặp lại đủ 3 bộ test',
              'In ra 75 vì vòng lặp bên trong chạy hết tới n = 25 cho cả 3 bộ test liên tiếp'
            ],
            correct: 2,
            explain: 'Mỗi bộ test vòng for chạy i = 1, 2, 3, 4, 5 (vì 5 * 5 = 25 &lt;= 25), tức 5 lượt. Lặp qua 3 bộ test nên ops = 3 * 5 = 15.'
          },
          {
            type: 'single',
            q: 'Đề bài có Time Limit <code>1.0s</code>, cho $T \\le 10^4$ bộ test độc lập, mỗi test có $N \\le 10^4$ (không có ràng buộc tổng $\\sum N$). Đánh giá nào đúng nhất theo quy tắc $\\sim 10^8$ phép tính/giây?',
            options: [
              'Thuật toán O(N^2) mỗi test vẫn chạy kịp vì N = 10^4 bình phương lên đúng bằng mốc 10^8',
              'Thuật toán O(N^3) mỗi test vẫn chạy kịp vì trình biên dịch tự bỏ qua các bộ test giống nhau',
              'Thuật toán O(N log N) mỗi test chắc chắn vượt xa 10^10 phép tính nên sẽ luôn bị báo lỗi TLE',
              'Thuật toán O(N^2) mỗi test sẽ thành T * N^2 = 10^12 phép tính (TLE), phải hạ xuống &lt;= O(N)'
            ],
            correct: 3,
            explain: 'Không được quên hệ số T bộ test! Nếu mỗi test chạy O(N^2) = 10^8 thì cả T = 10^4 test sẽ thành 10^12 bước (TLE chắc chắn). Cần hạ xuống tối đa O(N) (khi T * N = 10^8 hơi sát) hoặc tốt nhất là O(log N) hay O(1).'
          },
          {
            type: 'multiple',
            q: 'Khi đọc giới hạn của một bài toán có Time Limit <code>1.0s</code>, những suy luận nào sau đây là <strong>CHÍNH XÁC</strong>?',
            options: [
              'Khi N &lt;= 10^5, thuật toán O(N^2) tốn khoảng 10^10 bước nên chắc chắn TLE, cần tìm hướng O(N log N) hoặc O(N)',
              'Khi N &lt;= 10^12, một vòng lặp for từ 1 đến N vẫn qua gọn trong 1.0 giây nếu dùng fast I/O cin.tie(NULL)',
              'Khi T &lt;= 10^5, N &lt;= 10^5 nhưng đề đảm bảo tổng N các test &lt;= 2*10^5 thì thuật toán O(N) mỗi test vẫn AC',
              'Khi N &lt;= 20, tuyệt đối không được dùng thuật toán quay lui O(2^N) vì 2^20 đã vượt quá ngưỡng 10^8 phép'
            ],
            correct: [0, 2],
            explain: 'A và C đúng. B sai vì fast I/O chỉ tăng tốc đọc/in chứ CPU vẫn không thể chạy 10^12 vòng lặp trong 1 giây. D sai vì 2^20 chỉ bằng ~10^6, rất an toàn trong ngưỡng 10^8!'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: ĐỘ PHỨC TẠP KHÔNG GIAN & GIỚI HẠN 256 MB
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Không Gian & 256 MB',
        title: 'Vấn Đề Nhỏ 3: Độ Phức Tạp Không Gian (Space Complexity) & Giới Hạn 256 MB',
        lead: 'Cách quy đổi kích thước mảng (bool/char 1B, int 4B, long long 8B) sang MB, lý do mảng 10^7 int (~40 MB) an toàn còn a[10000][10000] (~400 MB) gây MLE, và cách hạ bộ nhớ xuống O(N) hay O(1).',
        subproblem: {
          title: 'Tại sao code chạy rất nhanh, đặt mảng ra ngoài main() để tránh tràn bộ nhớ stack ~8 MB rồi mà vẫn bị hệ thống đánh MLE (&gt; 256 MB)?',
          desc: 'Cả vùng dữ liệu tĩnh toàn cục cũng có giới hạn RAM (thường 256 MB). Chỉ cần biết kích thước mỗi kiểu dữ liệu và công thức 1 MB ~ 10^6 bytes, bạn sẽ tính chính xác dung lượng mọi mảng trước khi nộp bài.'
        },
        cards: [
          {
            heading: 'Quy Đổi Kích Thước Kiểu Dữ Liệu Sang MB & Ngưỡng 256 MB',
            tag: 'Tính nhẩm RAM trong 3 giây',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Bảng kích thước kiểu dữ liệu &amp; Công thức 1 MB &approx; 10^6 bytes</span>
                <p>Từ bài <code>L1-03</code>, bạn đã biết <strong>ngăn xếp lời gọi hàm / bộ nhớ stack</strong> chỉ có ~8 MB (nên mảng lớn luôn phải đưa ra toàn cục). Nhưng ở vùng tĩnh toàn cục, máy chấm vẫn đặt giới hạn chung (thường <strong>256 MB</strong>):</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><code>bool</code>, <code>char</code>: <strong>1 byte</strong> / phần tử.</li>
                  <li><code>int</code>: <strong>4 bytes</strong> / phần tử.</li>
                  <li><code>long long</code>, <code>double</code>: <strong>8 bytes</strong> / phần tử.</li>
                  <li><strong>Mẹo quy đổi nhanh:</strong> Lấy <strong>$1\\text{ MB} \\approx 10^6\\text{ bytes}$</strong> (thực tế $1\\text{ MiB} = 1\\,048\\,576\\text{ bytes}$, chia cho $10^6$ vừa dễ nhẩm vừa an toàn nhẹ!).</li>
                  <li><strong>Áp dụng thực tế:</strong>
                    <code>int a[10000000];</code> ($10^7$ ô) $\\implies 10^7 \\times 4 = 40\\text{ MB}$ (<strong>An toàn!</strong>).
                    Còn mảng 2 chiều <code>int a[10000][10000];</code> có $10^4 \\times 10^4 = 10^8$ ô $\\implies 10^8 \\times 4 = 400\\text{ MB} &gt; 256\\text{ MB}$ (<strong>MLE ngay lập tức!</strong>).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Dùng sizeof() đo trực tiếp và hạ từ O(N^2) xuống O(N) bộ nhớ</span>
                <p>Thay vì tạo bảng 2 chiều <code>sum[10005][10005]</code> (~400 MB MLE) để trả lời tổng đoạn <code>[l, r]</code>, ta chỉ cần 1 mảng cộng dồn 1D <code>long long pref[100005]</code> (~0.8 MB!):</p>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const int MAXN = 100005;
int a[MAXN];          // 400,020 bytes (~0.40 MB)
long long pref[MAXN]; // 800,040 bytes (~0.80 MB)

// TRÁNH TUYỆT ĐỐI ở giới hạn 256 MB:
// int bang2D[10005][10005]; // 100,100,025 * 4 bytes ~ 400.4 MB -&gt; MLE!

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cout &lt;&lt; "sizeof(a) = " &lt;&lt; sizeof(a) &lt;&lt; " bytes" &lt;&lt; '\\n';
    cout &lt;&lt; "sizeof(pref) = " &lt;&lt; sizeof(pref) &lt;&lt; " bytes" &lt;&lt; '\\n';

    int n = 5;
    for (int i = 1; i &lt;= n; i++) {
        a[i] = i * 10;
        pref[i] = pref[i - 1] + a[i];
    }
    // Truy vấn tổng đoạn [2, 4] trong O(1) thời gian, chỉ tốn O(N) bộ nhớ!
    cout &lt;&lt; "Tong [2, 4] = " &lt;&lt; pref[4] - pref[1] &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Độ phức tạp không gian (<code>Space Complexity</code>):</strong> Lượng bộ nhớ RAM chương trình sử dụng tính theo $N$ ($O(1)$, $O(N)$, $O(N^2)$).</li>
                  <li><strong>Bộ nhớ phụ thêm (<code>Auxiliary Space</code>):</strong> Lượng bộ nhớ cấp phát thêm ngoài dữ liệu đầu vào. Nhiều bài có thể đọc đến đâu xử lý đến đó chỉ với $O(1)$ bộ nhớ phụ!</li>
                  <li><strong>Tràn giới hạn bộ nhớ (<code>Memory Limit Exceeded — MLE</code>):</strong> Vượt quá mức RAM cho phép của bài (thường 256 MB).</li>
                </ul>
              </div>
            `
          },
          {
            heading: '3 Bẫy Bộ Nhớ Hay Quên: Cộng Tổng Mảng, Mảng Trong Vòng Lặp & Nối Chuỗi',
            tag: 'Tránh lỗi MLE & RE',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Những chỗ ngốn RAM âm thầm ngoài 1 mảng đơn lẻ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bẫy 1 — Quên cộng tổng bộ nhớ TẤT CẢ các mảng:</strong> Một mảng <code>long long a[10000000]</code> mất 80 MB là ổn, nhưng khai báo thêm 3 mảng nữa (<code>b, c, d</code> cùng cỡ $10^7$) sẽ thành $4 \\times 80 = 320\\text{ MB} &gt; 256\\text{ MB}$ $\\implies$ <strong>MLE</strong>! Luôn giữ tổng bộ nhớ mọi mảng dưới ~200 MB.</li>
                  <li><strong>Bẫy 2 — Khai báo mảng lớn bên trong vòng lặp hoặc hàm:</strong> Đặt <code>int tam[3000000];</code> (~12 MB) trong <code>main()</code> hay trong <code>while (t--)</code> sẽ làm tràn <strong>ngăn xếp lời gọi hàm / bộ nhớ stack (~8 MB)</strong> gây lỗi <strong>RE</strong> ngay lập tức!</li>
                  <li><strong>Bẫy 3 — Nối chuỗi <code>s = s + c</code> trong vòng lặp:</strong> Với $N = 2 \\times 10^5$, viết <code>ans = ans + s[i];</code> bắt máy tính tạo bản sao mới dài hơn qua mỗi bước, ngốn $O(N^2)$ cả thời gian lẫn tổng dung lượng cấp phát tạm! Luôn viết <code>ans += s[i];</code>.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Tiết kiệm từ O(N) xuống O(1) không gian &amp; nối chuỗi bằng +=</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Đọc luồng dữ liệu (Streaming): chỉ tốn O(1) bộ nhớ dù N = 10^7!
    int n = 4;
    long long mau[4] = {15, 42, 8, 27};
    long long tong = 0, lonNhat = -1;
    for (int i = 0; i &lt; n; i++) {
        long long x = mau[i]; // Chỉ dùng đúng 1 biến x thay cho cả mảng lớn!
        tong += x;
        if (x &gt; lonNhat) lonNhat = x;
    }

    // 2. Nối chuỗi chuẩn CP: dùng += để giữ nguyên O(N) thời gian và bộ nhớ
    string s = "AB12CD", ketQua = "";
    for (int i = 0; i &lt; (int)s.size(); i++) {
        if (s[i] &gt;= 'A' &amp;&amp; s[i] &lt;= 'Z') {
            ketQua += s[i]; // Tuyệt đối không viết ketQua = ketQua + s[i];
        }
    }

    cout &lt;&lt; tong &lt;&lt; ' ' &lt;&lt; lonNhat &lt;&lt; ' ' &lt;&lt; ketQua &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Tổng dấu chân bộ nhớ (<code>Total Memory Footprint</code>):</strong> Tổng dung lượng của tất cả các mảng toàn cục, chuỗi, biến và khung ngăn xếp đang dùng đồng thời.</li>
                  <li><strong>Xử lý luồng (<code>Streaming O(1) Space</code>):</strong> Đọc từng phần tử vào 1 biến tạm rồi cập nhật đáp án ngay mà không lưu lại cả dãy, giảm bộ nhớ về $O(1)$.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_space_256mb',
            title: 'Phòng Thí Nghiệm 3: Soi Dung Lượng MB Thực Tế Giữa Mảng 2D O(N^2) Và Mảng 1D O(N)',
            desc: 'Cùng bài toán truy vấn tổng đoạn [2, 4] trên dãy N &lt;= 10,000 với giới hạn 256 MB. Hãy chuyển đổi giữa mảng 2D lưu sẵn mọi cặp [l][r] (~400 MB) và mảng cộng dồn 1D (~0.8 MB)!',
            toggles: [
              {
                key: 'spaceMode',
                label: 'Cấu trúc lưu trữ dữ liệu cho N = 10,000',
                options: [
                  { value: 'compact_1d', text: 'Mảng 1D pref[100005] (~0.8 MB) — O(N)', kind: 'ok' },
                  { value: 'bloated_2d', text: 'Bảng 2D sum[10005][10005] (~400 MB) — O(N^2)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.spaceMode === 'compact_1d';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
long long pref[MAXN]; // Chi ton 800,040 bytes (~0.76 MiB << 256 MB)

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int a[6] = {0, 10, 20, 30, 40, 50};
    for (int i = 1; i <= 5; i++) {
        pref[i] = pref[i - 1] + a[i];
    }
    cout << "sizeof(pref) = " << sizeof(pref) << " bytes\\n";
    cout << "Tong [2, 4] = " << pref[4] - pref[1] << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

// 10,005 * 10,005 * 4 bytes = 400,400,100 bytes (~400 MB > 256 MB!)
int bang2D[10005][10005];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout << "sizeof(bang2D) = " << sizeof(bang2D) << " bytes\\n";
    cout << "Vuot tran 256 MB -> May cham bao MLE!" << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [4, 5] : [5],
                statusOk: isOk,
                statusText: isOk
                  ? 'AN TOAN RAM: Mảng 1D chỉ chiếm ~0.8 MB (chưa tới 1% giới hạn 256 MB) -&gt; AC!'
                  : 'TRÀN BỘ NHỚ (MLE): Mảng 2D chiếm tới 400,400,100 bytes (~382 MiB / 400 MB &gt; 256 MB)!',
                predictions: [
                  { text: 'Mảng 1D chỉ chiếm chưa tới 1 MB RAM và vẫn trả lời mọi đoạn [l, r] trong O(1)' },
                  { text: 'Mảng 2D int[10005][10005] ngốn tới ~400 MB RAM, vượt quá trần 256 MB và bị MLE' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nsizeof(pref) = 800040 bytes\nTong [2, 4] = 90\n[An toan: 0.76 MiB << 256 MB -> AC!]'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nsizeof(bang2D) = 400400100 bytes\nVuot tran 256 MB -> May cham bao MLE!\n[Canh bao MLE: 400.4 MB (> 381 MiB) vuot gioi han 256 MB!]',
                explain: isOk
                  ? 'Mảng 1D pref[100005] kiểu long long chỉ chiếm 100,005 * 8 = 800,040 bytes (~0.8 MB) và trả lời mỗi truy vấn trong O(1) qua pref[r] - pref[l - 1].'
                  : 'Chỉ cần nhìn số 10005 nhân với 10005 = 10^8 ô rồi nhân 4 bytes/int, ta thấy ngay dung lượng đã vọt lên ~400 MB — vượt quá ngưỡng 256 MB của máy chấm!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int a[10];
long long b[5];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout << sizeof(a) << ' ' << sizeof(b) << ' ' << sizeof(a) + sizeof(b) << '\\n';
    return 0;
}`,
            q: 'Trên máy chấm chuẩn 64-bit (<code>int</code> 4 byte, <code>long long</code> 8 byte), đoạn chương trình đo kích thước hai mảng toàn cục trên sẽ in ra kết quả nào?',
            options: [
              'In ra 10 5 15 vì toán tử sizeof đếm đúng số lượng phần tử được khai báo trong ngoặc vuông',
              'In ra 40 40 80 vì int chiếm 4 byte (40B) và long long chiếm 8 byte (40B), tổng cộng 80B',
              'In ra 40 20 60 vì mảng long long chỉ chiếm một nửa kích thước của mảng int khi ở toàn cục',
              'In ra 20 40 60 vì trên hệ điều hành 64-bit kiểu int chỉ tốn 2 byte còn long long tốn 8 byte'
            ],
            correct: 1,
            explain: 'sizeof() trả về tổng số byte mà biến/mảng chiếm: a có 10 * 4 = 40 bytes; b có 5 * 8 = 40 bytes; tổng cộng bằng 80 bytes.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

long long pref[6];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int a[6] = {0, 3, 7, 2, 8, 5};
    for (int i = 1; i <= 5; i++) {
        pref[i] = pref[i - 1] + a[i];
    }
    cout << pref[4] - pref[1] << ' ' << pref[5] << '\\n';
    return 0;
}`,
            q: 'Theo dõi mảng cộng dồn 1D <code>pref</code> (giúp tiết kiệm bộ nhớ từ <code>O(N^2)</code> xuống <code>O(N)</code>). Chương trình sẽ in ra hai số nào?',
            options: [
              'In ra 20 25 vì biểu thức pref[4] - pref[1] tính tổng từ vị trí 1 đến vị trí 4',
              'In ra 15 25 vì phần tử a[4] không nằm trong đoạn cần tính của pref[4] - pref[1]',
              'In ra 17 25 vì pref[4] - pref[1] cho tổng đoạn [2, 4] bằng 7 + 2 + 8 = 17',
              'In ra 17 20 vì mảng toàn cục pref chưa cộng phần tử cuối a[5] vào tổng chung'
            ],
            correct: 2,
            explain: 'pref lần lượt là [0, 3, 10, 12, 20, 25]. Vậy pref[4] - pref[1] = 20 - 3 = 17 (tổng a[2] + a[3] + a[4]) và pref[5] = 25.'
          },
          {
            type: 'single',
            q: 'Với giới hạn bộ nhớ của đề là <strong>256 MB</strong>, khai báo mảng toàn cục nào sau đây sẽ gây ra lỗi <strong>MLE (tràn bộ nhớ)</strong>?',
            options: [
              'Mảng int dp[10005][10005]; vì tổng số ô xấp xỉ 10^8 nhân 4 byte tốn khoảng 400 MB (&gt; 256 MB)',
              'Mảng int a[10000005]; vì tổng số ô 10^7 nhân 4 byte chỉ chiếm khoảng 40 MB (vẫn dư nhiều RAM)',
              'Mảng long long b[5000005]; vì tổng số ô 5*10^6 nhân 8 byte chỉ tốn khoảng 40 MB (&lt; 256 MB)',
              'Mảng bool vis[20000005]; vì tổng số ô 2*10^7 nhân 1 byte chỉ tốn khoảng 20 MB (&lt; 256 MB)'
            ],
            correct: 0,
            explain: 'int dp[10005][10005] có hơn 10^8 phần tử * 4 bytes ~ 400.4 MB, vượt quá trần 256 MB nên bị MLE ngay! Ba mảng còn lại chỉ tốn 20–40 MB nên rất an toàn.'
          },
          {
            type: 'single',
            q: 'Khi cần ghép $N = 2 \\times 10^5$ ký tự vào cuối một xâu <code>ans</code> bên trong vòng lặp <code>for</code>, cách viết nào vừa chậm <code>O(N^2)</code> vừa cấp phát lại bộ nhớ liên tục?',
            options: [
              'Dùng lệnh ans += s[i]; bên trong vòng lặp vì thao tác chỉ nối thêm 1 ký tự vào cuối xâu gốc',
              'Dùng hàm riêng kiểu void themKyTu(string& ans, char c) có dùng tham chiếu & để nối thêm',
              'Khai báo chuỗi ans ở vùng toàn cục phía trên main() và thêm ký tự bằng toán tử ans += c;',
              'Viết ans = ans + s[i]; trong vòng lặp vì mỗi bước phải cấp phát và sao chép lại cả chuỗi ans'
            ],
            correct: 3,
            explain: 'Phép ans = ans + s[i]; tạo ra một chuỗi tạm mới bằng cách copy toàn bộ độ dài hiện tại của ans trước khi gán lại, tốn O(N^2) thời gian và cấp phát liên tục. Dùng ans += s[i]; chỉ tốn O(N).'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> về độ phức tạp không gian và giới hạn bộ nhớ 256 MB?',
            options: [
              'Vùng nhớ ngăn xếp lời gọi hàm chứa tối đa 256 MB nên đặt mảng int a[20000000]; trong hàm vẫn ổn',
              'Với 1 MB xấp xỉ 10^6 byte, một mảng 10^7 phần tử kiểu int tốn ~40 MB nên hoàn toàn an toàn trong 256 MB',
              'Khi khai báo nhiều mảng toàn cục cùng lúc, phải cộng tổng dung lượng tất cả các mảng không vượt quá 256 MB',
              'Nếu không cần dùng lại mảng sau khi đọc xong, xử lý trực tiếp trên 1 biến sẽ giảm không gian từ O(N) về O(1)'
            ],
            correct: [1, 2, 3],
            explain: 'B, C và D đều đúng. A sai vì ngăn xếp lời gọi hàm (bộ nhớ stack) chỉ chứa khoảng ~8 MB, đặt mảng lớn ~80 MB trong hàm sẽ sập chương trình (RE) ngay lập tức!'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module cuối - Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l104_mle_2d_array',
        title: 'Khai Báo Bảng 2D Quá Khổ Gây Tràn Bộ Nhớ (MLE &gt; 256 MB)',
        description: 'Cho dãy N &lt;= 10,000 số nguyên và Q truy vấn tổng đoạn [l, r] (Memory Limit: 256 MB). Để trả lời nhanh trong O(1), học sinh khai báo bảng 2D toàn cục sum2D[10005][10005] nên bị máy chấm báo MLE ngay lập tức!',
        failingInput: '5 1\n10 20 30 40 50\n2 4',
        failingOutput: 'Memory Limit Exceeded (~400.4 MB > 256 MB)',
        expectedOutput: '90',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

const int MAXN = 10005;
int sum2D[MAXN][MAXN];
int a[MAXN];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, q;
    cin >> n >> q;
    for (int i = 1; i <= n; i++) cin >> a[i];
    for (int l = 1; l <= n; l++) {
        int s = 0;
        for (int r = l; r <= n; r++) {
            s += a[r];
            sum2D[l][r] = s;
        }
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << sum2D[l][r] << '\\n';
    }
    return 0;
}`,
        bugLine: 5,
        patches: [
          { text: 'Thay dòng 5 bằng mảng cộng dồn 1D long long pref[MAXN]; (~80 KB) và tính pref[r] - pref[l - 1]' },
          { text: 'Đổi dòng 5 thành long long sum2D[MAXN][MAXN]; để tránh bị tràn số khi tổng vượt 2*10^9' },
          { text: 'Chuyển dòng 5 vào bên trong hàm main() để trình biên dịch giải phóng bộ nhớ sau khi đọc xong' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 5, int sum2D[10005][10005] chiếm hơn 10^8 * 4 bytes ~ 400.4 MB (&gt; 256 MB) gây MLE! Dùng mảng cộng dồn 1D pref[MAXN] chỉ tốn ~80 KB (O(N) không gian) mà vẫn trả lời mọi truy vấn [l, r] trong O(1) thời gian.'
      },
      {
        id: 'dbg_l104_on2_pair_sum_tle',
        title: 'Thuật Toán O(N^2) Bị TLE Khi N = 10^5 (Tổng Tích Mọi Cặp)',
        description: 'Cho dãy N &lt;= 10^5 số nguyên, tính tổng tích mọi cặp a[i] * a[j] (1 &lt;= i &lt; j &lt;= N) chia dư 10^9 + 7. Code chạy test mẫu N = 4 đúng kết quả, nhưng vừa nộp lên bị TLE do dùng 2 vòng lặp lồng O(N^2)!',
        failingInput: '4\n2 3 5 4',
        failingOutput: 'Time Limit Exceeded (~5*10^9 phép toán khi N = 10^5)',
        expectedOutput: '71',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const long long MOD = 1000000007LL;
long long a[MAXN];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];
    long long ans = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = i + 1; j <= n; j++) {
            ans = (ans + (a[i] % MOD) * (a[j] % MOD)) % MOD;
        }
    }
    cout << ans << '\\n';
    return 0;
}`,
        bugLine: 16,
        patches: [
          { text: 'Đổi dòng 16 thành for (int j = 1; j <= n; j++) để giữ nguyên hai vòng lặp đầy đủ' },
          { text: 'Bỏ vòng lặp lồng dòng 16, chỉ chạy 1 vòng O(N) cộng ans += a[i] * tongTruoc rồi cập nhật tongTruoc' },
          { text: 'Đổi dòng 12 thành long long n; và thêm hàm kiểm tra riêng bên ngoài main() cho gọn' }
        ],
        correctPatch: 1,
        explain: 'Vòng lặp lồng từ dòng 15–19 tạo thành O(N^2), với N = 10^5 tốn 5*10^9 phép toán (&gt;&gt; 10^8) nên bị TLE! Bỏ vòng trong và dùng 1 biến tongTruoc cộng dồn giúp giảm xuống O(N) (~10^5 bước).'
      },
      {
        id: 'dbg_l104_string_concat_tle',
        title: 'Bẫy Nối Chuỗi ans = ans + s[i] Gây O(|s|^2) TLE Với Xâu Dài 2*10^5',
        description: 'Cho xâu s độ dài tới 2*10^5 ký tự, yêu cầu lọc giữ lại các chữ cái in hoa. Thuật toán tưởng là 1 vòng lặp O(|s|), nhưng khi chấm test dài 200,000 ký tự lại bị TLE vì thao tác nối chuỗi tạo bản sao mới liên tục!',
        failingInput: 'aBcDeF',
        failingOutput: 'Time Limit Exceeded (~2*10^10 lượt copy ký tự khi |s| = 2*10^5)',
        expectedOutput: 'BDF',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string s;
    cin >> s;
    string ans = "";
    for (int i = 0; i < (int)s.size(); i++) {
        if (s[i] >= 'A' && s[i] <= 'Z') {
            ans = ans + s[i];
        }
    }
    cout << ans << '\\n';
    return 0;
}`,
        bugLine: 12,
        patches: [
          { text: 'Sửa dòng 10 thành for (int i = 0; i < s.size(); i++) để bỏ bước ép kiểu (int)' },
          { text: 'Đưa biến string ans = ""; ra toàn cục phía trên main() nhưng vẫn giữ nguyên ans = ans + s[i];' },
          { text: 'Sửa dòng 12 thành ans += s[i]; để nối trực tiếp vào cuối xâu trong O(1) thay vì copy cả xâu' }
        ],
        correctPatch: 2,
        explain: 'Ở dòng 12, biểu thức ans = ans + s[i]; tạo ra một bản sao mới của toàn bộ xâu ans qua mỗi lần thêm ký tự, tốn O(|s|^2) với |s| = 2*10^5. Đổi thành ans += s[i]; nối tại chỗ trong O(1) nên cả vòng lặp chạy đúng O(|s|).'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — PHA 1 THUẦN BIG-O)
    // ============================================================================
    practiceProblems: [
      {
        id: 'CF-486A',
        title: '486A - Calculating Function',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/486/A',
        hint: 'Giới hạn 1 &lt;= n &lt;= 10^15, TL 1.0s. Đừng viết vòng lặp for i từ 1..n (O(n) = 10^15 -&gt; TLE!). Ghép từng cặp (-1 + 2) + (-3 + 4) + ...: nếu n % 2 == 0 thì đáp án là n / 2, ngược lại là -(n + 1) / 2 trong O(1) thời gian và O(1) không gian (nhớ dùng long long!).'
      },
      {
        id: 'ABC181-B',
        title: 'B - Trapezoid Sum',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/abc181/tasks/abc181_b',
        hint: 'Giới hạn 1 &lt;= N &lt;= 10^5, 1 &lt;= A_i &lt;= B_i &lt;= 10^6. Nếu dùng thêm 1 vòng for chạy từ A_i đến B_i cho mỗi lượt thì tốn O(N * 10^6) = 10^11 bước (TLE!). Thay vào đó dùng công thức cấp số cộng (B - A + 1) * (A + B) / 2 trong O(1) mỗi dòng để đạt tổng O(N) và bộ nhớ O(1).'
      },
      {
        id: 'CSES-1618',
        title: 'Trailing Zeros',
        judge: 'CSES',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1618',
        hint: 'Giới hạn 1 &lt;= n &lt;= 10^9, TL 1.0s. Không thể tính n! bằng vòng lặp 1..n (vừa O(n) = 10^9 TLE vừa tràn số!). Hãy đếm số thừa số 5 trong n! bằng vòng lặp while (n &gt;= 5) { n /= 5; ans += n; }: chỉ tốn O(log_5(n)) &lt;= 13 bước!'
      },
      {
        id: 'CF-1475A',
        title: '1475A - Odd Divisor',
        judge: 'Codeforces',
        tier: 2,
        link: 'https://codeforces.com/problemset/problem/1475/A',
        hint: 'Giới hạn 1 &lt;= t &lt;= 10^4 bộ test, 2 &lt;= n &lt;= 10^14, TL 2.0s. Duyệt ước lẻ tới sqrt(n) cho mỗi test tốn 10^4 * 10^7 = 10^11 (TLE!). Dùng while (n % 2 == 0) n /= 2; trong O(log_2(n)) &lt;= 47 bước mỗi test -&gt; tổng ~4.7*10^5 bước. Nếu sau khi chia hết cho 2 mà n &gt; 1 thì in YES, ngược lại NO.'
      },
      {
        id: 'CSES-1071',
        title: 'Number Spiral',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1071',
        hint: 'Giới hạn 1 &lt;= t &lt;= 10^5 bộ test, 1 &lt;= y, x &lt;= 10^9, TL 1.0s. Không thể tạo mảng 2D 10^9 x 10^9 (MLE hàng triệu TB!) hay mô phỏng từng ô (TLE!). Gọi k = max(y, x) (dùng if/else), xét lớp vuông thứ k có giá trị từ (k-1)^2 + 1 đến k^2 rồi tính trực tiếp giá trị ô (y, x) trong O(1) mỗi test (dùng long long vì k^2 &lt;= 10^18).'
      },
      {
        id: 'VNOJ-PNUMBER',
        title: 'PNUMBER - Tìm số nguyên tố',
        judge: 'VNOJ',
        tier: 2,
        link: 'https://oj.vnoi.info/problem/pnumber',
        hint: 'Giới hạn 1 &lt;= A &lt;= B &lt;= 200,000, TL 1.0s, ML 256 MB. Kiểm tra nguyên tố bằng vòng lặp 2..x-1 tốn O(B^2) = 4*10^10 (TLE!). Viết hàm kiểm tra nguyên tố O(sqrt(x)) (hoặc dùng mảng tĩnh bool isPrime[200005] ~ 200 KB sàng ước O(B log log B)) để liệt kê nhanh gọn dưới 1 giây.'
      },
      {
        id: 'ABC180-C',
        title: 'C - Cream puff',
        judge: 'AtCoder',
        tier: 3,
        link: 'https://atcoder.jp/contests/abc180/tasks/abc180_c',
        hint: 'Giới hạn 1 &lt;= N &lt;= 10^12, TL 2.0s, ML 256 MB. Duyệt 1..N chắc chắn TLE! Chỉ cần duyệt i từ 1..sqrt(N) (tối đa 10^6 bước). Để in tăng dần mà chưa dùng hàm sắp xếp thư viện: khai báo 2 mảng tĩnh toàn cục long long uocNho[1000005], uocLon[1000005]; (~16 MB &lt;&lt; 256 MB), lưu i vào uocNho và N/i vào uocLon (khi i != N/i), rồi in xuôi uocNho và in ngược uocLon!'
      },
      {
        id: 'ABC177-C',
        title: 'C - Sum of product of pairs',
        judge: 'AtCoder',
        tier: 3,
        link: 'https://atcoder.jp/contests/abc177/tasks/abc177_c',
        hint: 'Giới hạn 2 &lt;= N &lt;= 2*10^5, 0 &lt;= A_i &lt;= 10^9, mod 10^9 + 7. Dùng 2 vòng for lồng O(N^2) = 2*10^10 chắc chắn TLE! Dùng mảng toàn cục long long a[200005]; (~1.6 MB) hoặc biến cộng dồn tongTruoc để tính tổng a[i] * tongTruoc trong O(N) duy nhất, nhớ lấy % MOD sau mỗi bước cộng và nhân!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
