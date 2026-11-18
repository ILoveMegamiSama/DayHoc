/**
 * DỮ LIỆU BÀI GIẢNG L2-08: TỔ HỢP ĐẾM SƠ CẤP & DP CÁI TÚI (KNAPSACK)
 * Tầng 2 — Pha 2 STL Lớp 9 (Nối tiếp từ L1-07, L2-05, L2-06, L2-07)
 * Mở khóa:
 * - Tổ hợp đếm sơ cấp: Quy tắc Cộng, Quy tắc Nhân (1LL * a * b % MOD, ans = 1) và
 *   Tam giác Pascal C[n][k] = (C[n-1][k-1] + C[n-1][k]) % MOD trong O(N^2) không cần phép chia modulo.
 * - DP Cái Túi 0/1 (0/1 Knapsack): giải quyết phản ví dụ Tham lam L2-05, bảng 2D + Truy vết món chọn,
 *   nén 1D duyệt NGƯỢC trọng lượng w (W -> w_i), và Đổi chiều trạng thái theo giá trị (Knapsack 2 khi W <= 10^9).
 * - Cái Túi Vô Hạn (Unbounded Knapsack) duyệt XUÔI w (w_i -> W) và bẫy thứ tự 2 vòng lặp:
 *   Đếm Hoán Vị có thứ tự (CSES-1635) vs Đếm Tổ Hợp không thứ tự (CSES-1636).
 * Ranh giới tiền đề: Giữ nghiêm ngặt trong phạm vi Tổ hợp đếm sơ cấp, 0/1 Knapsack, Knapsack 2
 *   và Unbounded Knapsack / Coin Combinations I & II (không lấn sang kiến thức bài L2-09).
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'dp_cai_tui',
    number: 'Bài Học L2-08',
    shortTitle: 'Tổ Hợp Đếm & DP Cái Túi',
    title: 'Bài L2-08: Tổ Hợp Đếm Sơ Cấp &amp; DP Cái Túi (Knapsack)',
    lead: 'Từ <strong>Quy tắc Cộng / Nhân</strong> và <strong>Tam giác Pascal $C(n, k)$</strong> $O(N^2)$ tránh phép chia modulo, ta bước thẳng vào giải quyết điểm gãy Tham lam của <code>L2-05</code> bằng <strong>DP Cái Túi 0/1</strong> (cùng mẹo nén 1D duyệt ngược &amp; <strong>Đổi chiều giá trị</strong> khi $W \\le 10^9$), rồi lật mở bí mật tráo hai vòng lặp phân biệt <strong>Hoán vị</strong> vs <strong>Tổ hợp</strong> ở <strong>Cái Túi Vô Hạn</strong>!',
    modules: [
      // ============================================================================
      // MODULE 1: TỔ HỢP ĐẾM SƠ CẤP: QUY TẮC CỘNG, QUY TẮC NHÂN & TAM GIÁC PASCAL
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Tổ Hợp Đếm & Pascal',
        title: 'Vấn Đề Nhỏ 1: Quy Tắc Cộng, Quy Tắc Nhân &amp; Tam Giác Pascal $C(n, k)$',
        lead: 'Khi bài toán đếm yêu cầu chia dư <code>MOD = 10^9 + 7</code> (<code>L1-07</code>), tại sao công thức giai thừa $n! / (k!(n-k)!)$ lại cho ra đáp án <strong>SAI</strong> khi chia lấy dư, và làm sao tính mọi $C(n, k)$ trong $O(N^2)$ chỉ bằng phép cộng?',
        subproblem: {
          title: 'Phân biệt chính xác khi nào CỘNG vs NHÂN khi đếm cấu hình lớn modulo $10^9 + 7$, tránh tràn <code>int</code> bằng <code>1LL</code>, và dựng bảng Tam giác Pascal $C(n, k)$ không cần phép chia.',
          desc: 'Với $N \\le 2000 \\dots 5000$, giá trị $N!$ và $C(n, k)$ vượt xa <code>long long</code> rất nhanh, trong khi phép chia nguyên không bảo toàn số dư (<code>(6 / 2) % 5 != (6 % 5) / (2 % 5)</code>). Tam giác Pascal biến $C(n, k)$ thành bài toán Quy hoạch động 2 chiều thuần phép cộng với độ phức tạp $O(N^2)$.'
        },
        cards: [
          {
            heading: 'Quy Tắc Cộng, Quy Tắc Nhân &amp; Bẫy Tràn Số Khi Chia Dư Modulo',
            tag: 'Cộng vs Nhân &bull; 1LL',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Mỗi bài toán đếm đều xuất phát từ hai hành động cực kỳ quen thuộc trong đời sống:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Quy tắc Cộng (Chữ "HOẶC" &mdash; các trường hợp rời nhau):</strong> Sáng nay bạn có $3$ tuyến xe buýt <em>HOẶC</em> $2$ con đường đạp xe để tới trường. Vì chỉ đi đúng $1$ cách, tổng số phương án là $3 + 2 = 5$. Trong code, biến cộng dồn luôn khởi tạo bằng <strong><code>ans = 0</code></strong>.</li>
                  <li><strong>Quy tắc Nhân (Chữ "VÀ" &mdash; nối tiếp nhiều công đoạn):</strong> Bạn muốn chọn một bộ trang phục gồm $1$ chiếc áo (có $A$ mẫu) <em>VÀ</em> $1$ chiếc quần (có $B$ mẫu) <em>VÀ</em> $1$ chiếc mũ (có $C$ mẫu). Vì mỗi lựa chọn ở bước này đều ghép được với mọi lựa chọn ở bước sau, tổng số bộ là $A \\times B \\times C$. Biến nhân dồn luôn khởi tạo bằng <strong><code>ans = 1</code></strong> (nhiều bạn quen tay đặt <code>ans = 0</code> làm cả tích bằng $0$ suốt vòng lặp!).</li>
                  <li><strong>Bẫy tràn <code>int</code> trước <code>% MOD</code> (<code>L1-07</code>):</strong> Nếu <code>int a = 1000000, b = 1000000;</code> mà viết <code>(a * b) % MOD</code>, C++ nhân hai biến <code>int</code> trước thành $10^{12} &gt; 2.14 \\cdot 10^9$ gây <strong>tràn số</strong> trước khi chia dư! Phải ép kiểu <strong><code>(1LL * a * b) % MOD</code></strong> hoặc dùng <code>long long</code> ngay từ đầu, và chia dư <code>% MOD</code> sau mỗi phép nhân / cộng.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Quy Tắc Cộng &amp; Nhân Chuẩn Modulo 10^9 + 7 (C++14)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int ao = 1000000, quan = 1000000, mu = 5;

    // Quy tắc Cộng: chỉ chọn đúng 1 món (áo HOẶC quần HOẶC mũ)
    long long chon1Mon = (0LL + ao + quan + mu) % MOD;

    // Quy tắc Nhân: chọn đủ cả bộ (áo VÀ quần VÀ mũ), khởi tạo ans = 1 và dùng 1LL
    long long ans = 1;
    ans = (ans * (ao % MOD)) % MOD;
    ans = (ans * (quan % MOD)) % MOD;
    ans = (ans * (mu % MOD)) % MOD;

    cout &lt;&lt; "Cong = " &lt;&lt; chon1Mon &lt;&lt; " | Nhan = " &lt;&lt; ans &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Quy tắc Cộng (<code>Addition Rule</code>):</strong> Nếu một công việc tách thành $k$ phương án độc lập không giao nhau, tổng số cách bằng tổng số cách của từng phương án.</li>
                  <li><strong>Quy tắc Nhân (<code>Multiplication Rule</code>):</strong> Nếu một công việc gồm $k$ bước thực hiện nối tiếp nhau, tổng số cách bằng tích số cách chọn ở mỗi bước (giữ đơn vị nhân <code>1</code> và dùng <code>1LL</code> chống tràn <code>int</code>).</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Tam Giác Pascal Tính $C(n, k)$ Trong $O(N^2)$ &mdash; Không Cần Phép Chia Modulo!',
            tag: 'Pascal C(n, k) &bull; DP 2D',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Lớp bạn có $n$ học sinh, cần chọn ra một đội văn nghệ gồm đúng $k$ bạn (không phân biệt thứ tự đứng, tức là tổ hợp $C(n, k)$). Vì sao không dùng công thức $C(n, k) = \\frac{n!}{k!(n - k)!}$ chia dư cho $10^9 + 7$?</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Lý do gãy công thức giai thừa:</strong> Chỉ tới $21!$ là đã tràn <code>long long</code>! Mà nếu lấy <code>% MOD</code> trước rồi chia bình thường thì sai bét vì phép chia không bảo toàn đồng dư: ví dụ $(6 / 2) \\bmod 5 = 3$, nhưng $(6 \\bmod 5) / (2 \\bmod 5) = 1 / 2 = 0$!</li>
                  <li><strong>Ý tưởng phân đôi theo bạn đứng cuối (Công thức Pascal):</strong> Đặt tên bạn thứ $n$ là <strong>An</strong>. Mọi đội $k$ người hợp lệ chỉ rơi vào đúng $2$ trường hợp rời nhau:
                    <br>&bull; <em>KHÔNG chọn An vào đội:</em> Phải chọn đủ $k$ người từ $n - 1$ bạn còn lại &rarr; <strong>$C(n - 1, k)$ cách</strong>.
                    <br>&bull; <em>CHỌN An vào đội:</em> Chỉ cần chọn thêm $k - 1$ người từ $n - 1$ bạn còn lại &rarr; <strong>$C(n - 1, k - 1)$ cách</strong>.
                  </li>
                  <li><strong>Cộng hai nhánh (Quy tắc Cộng):</strong> <code>C[n][k] = (C[n - 1][k - 1] + C[n - 1][k]) % MOD</code>! Toàn bộ bảng chỉ dùng phép cộng và <code>% MOD</code> trong $O(N^2)$!</li>
                  <li><strong>Hai ô cơ sở bắt buộc:</strong> <code>C[i][0] = 1</code> (chọn $0$ bạn luôn có $1$ cách: không chọn ai!) và <code>C[i][i] = 1</code> (chọn cả $i$ bạn có $1$ cách). Nếu quên <code>C[i][0] = 1</code>, cột $0$ bị giữ bằng $0$ sẽ kéo sập cả tam giác phía dưới!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Dựng Bảng Tam Giác Pascal Modulo 10^9 + 7 (C++14)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int maxN = 100;
    vector&lt;vector&lt;long long&gt;&gt; C(maxN + 1, vector&lt;long long&gt;(maxN + 1, 0));

    for (int i = 0; i &lt;= maxN; i++) {
        C[i][0] = 1; // Bắt buộc: chọn 0 phần tử luôn có 1 cách
        C[i][i] = 1; // Chọn tất cả i phần tử có 1 cách
        for (int j = 1; j &lt; i; j++) {
            C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
        }
    }

    // Kiểm tra biên k &lt; 0 || k &gt; n trả về 0 khi tra cứu
    cout &lt;&lt; "C(5, 2) = " &lt;&lt; C[5][2] &lt;&lt; " | C(50, 25) % MOD = " &lt;&lt; C[50][25] &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Hệ số tổ hợp / Nhị thức (<code>Binomial Coefficient</code> $C(n, k)$):</strong> Số tập con gồm $k$ phần tử phân biệt lấy từ $n$ phần tử, không xét thứ tự.</li>
                  <li><strong>Tam giác Pascal (<code>Pascal's Triangle</code>):</strong> Bảng DP 2 chiều tính mọi $C(i, j)$ từ hàng trên <code>i - 1</code> chỉ bằng phép cộng, an toàn tuyệt đối với phép chia dư <code>% MOD</code> khi $N \\le 5000$.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_mul_init',
            title: 'Phòng Thí Nghiệm 1A: Quy Tắc Nhân Modulo — Khởi Tạo ans = 1 vs Bẫy Đặt ans = 0',
            desc: 'Tính số bộ cấu hình qua 3 công đoạn độc lập lần lượt có 10^6, 10^6 và 5 lựa chọn (chia dư cho 10^9 + 7). Thử đổi giá trị khởi tạo ban đầu của biến ans giữa 1 và 0!',
            toggles: [
              {
                key: 'initVal',
                label: 'Giá trị khởi tạo biến tích ans trước vòng lặp nhân',
                options: [
                  { value: 'one', text: 'long long ans = 1 — Phần tử đơn vị của phép nhân (AC)', kind: 'ok' },
                  { value: 'zero', text: 'long long ans = 0 — Quen tay như Quy tắc Cộng (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.initVal === 'one';
              const code = `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<long long> ways = {1000000LL, 1000000LL, 5LL};
${isOk ? '    long long ans = 1;' : '    long long ans = 0;'}
    for (long long w : ways) {
        ans = (ans * (w % MOD)) % MOD;
    }
    cout << "So bo cau hinh = " << ans << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [10],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Với ans = 1, kết quả (10^6 * 10^6 % MOD) * 5 % MOD = 999965007!'
                  : 'MỌI PHÉP NHÂN ĐỀU HÓA 0 (WA): Đặt ans = 0 làm biểu thức ans * w luôn bằng 0 ở mọi bước!',
                predictions: [
                  { text: 'In ra So bo cau hinh = 999965007 nhờ đơn vị nhân ans = 1 và % MOD từng bước' },
                  { text: 'In ra So bo cau hinh = 0 vì biến ans khởi tạo bằng 0 nuốt mất mọi thừa số' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nSo bo cau hinh = 999965007'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nSo bo cau hinh = 0',
                explain: isOk
                  ? 'Với Quy tắc Nhân, biến tích ans bắt buộc khởi tạo bằng 1, đồng thời lấy % MOD sau mỗi bước nhân hai số long long để tổng tích không bao giờ vượt 10^18.'
                  : 'Thói quen đặt ans = 0 chỉ đúng cho Quy tắc Cộng; khi đem sang Quy tắc Nhân thì 0 * w = 0 mãi mãi!'
              };
            }
          },
          {
            id: 'sb_pascal_base',
            title: 'Phòng Thí Nghiệm 1B: Tam Giác Pascal — Đặt Đủ C[i][0] = 1 vs Bẫy Quên Cột 0',
            desc: 'Tính C[5][0] và C[5][2] bằng Tam giác Pascal. Thử tắt câu lệnh gán C[i][0] = 1 để xem cột 0 bằng 0 kéo sai C[5][2] từ 10 tụt xuống 4 như thế nào!',
            toggles: [
              {
                key: 'baseMode',
                label: 'Thiết lập trường hợp cơ sở cho hàng i trong Tam giác Pascal',
                options: [
                  { value: 'both', text: 'Gán đủ C[i][0] = 1 và C[i][i] = 1 (AC)', kind: 'ok' },
                  { value: 'missing_c0', text: 'Chỉ gán C[i][i] = 1 — Quên C[i][0] = 1 (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.baseMode === 'both';
              const code = `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 5;
    vector<vector<long long>> C(n + 1, vector<long long>(n + 1, 0));
    for (int i = 0; i <= n; i++) {
${isOk ? '        C[i][0] = 1;\n        C[i][i] = 1;' : '        // Quen gan C[i][0] = 1;\n        C[i][i] = 1;'}
        for (int j = 1; j < i; j++) {
            C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
        }
    }
    cout << "C[5][0]=" << C[5][0] << " C[5][2]=" << C[5][2] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [12],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Hai cạnh tam giác C[i][0] và C[i][i] đều bằng 1, ra chuẩn C[5][0]=1 và C[5][2]=10!'
                  : 'THỦNG CẠNH TRÁI (WA): C[i][0] bị giữ nguyên bằng 0 khiến các cột kề bên như C[5][2] tụt sai xuống còn 4!',
                predictions: [
                  { text: 'In ra C[5][0]=1 C[5][2]=10 đúng chuẩn toán học tổ hợp' },
                  { text: 'In ra C[5][0]=0 C[5][2]=4 do thiếu giá trị cơ sở ở cột 0' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nC[5][0]=1 C[5][2]=10'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nC[5][0]=0 C[5][2]=4',
                explain: isOk
                  ? 'Chọn 0 phần tử từ i phần tử luôn có đúng 1 cách (tập rỗng). Nhờ C[i][0] = 1 và C[i][i] = 1, mọi ô C[i][j] bên trong đều được cộng đủ từ hai ô hàng trên.'
                  : 'Khi thiếu C[i][0] = 1, chỉ có C[0][0] = 1 còn C[1..5][0] đều bằng 0; do đó C[2][1] = 0+1 = 1 (sai), C[3][1] = 1, ..., kéo C[5][2] tụt còn 4!'
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
    int n = 5;
    vector<vector<long long>> C(n + 1, vector<long long>(n + 1, 0));
    for (int i = 0; i <= n; i++) {
        C[i][0] = 1;
        C[i][i] = 1;
        for (int j = 1; j < i; j++) {
            C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
        }
    }
    cout << C[4][2] << ' ' << C[5][2] << ' ' << C[5][3] << '\\n';
    return 0;
}`,
            q: 'Khi chạy đoạn code dựng Tam giác Pascal trên, ba giá trị <code>C[4][2]</code>, <code>C[5][2]</code> và <code>C[5][3]</code> được in ra lần lượt là gì?',
            options: [
              'In ra 6 9 9 vì tại hàng 4 chỉ cộng ô C[3][1] với chính nó là 3 + 3',
              'In ra 6 10 10 vì hàng 4 là [1,4,6,4,1] và hàng 5 là [1,5,10,10,5,1]',
              'In ra 4 10 6 vì phép tính C[5][3] lấy sai hiệu thay vì tổng hai ô trên',
              'In ra 5 10 10 vì vòng lặp j dừng sớm trước khi cập nhật cột giữa C[4][2]'
            ],
            correct: 1,
            explain: 'Hàng 3: [1, 3, 3, 1]. Hàng 4: C[4][1]=4, C[4][2]=3+3=6, C[4][3]=4. Hàng 5: C[5][2]=C[4][1]+C[4][2]=4+6=10, C[5][3]=C[4][2]+C[4][3]=6+4=10. Vậy in ra: 6 10 10.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 4, m = 3, t = 5;
    vector<vector<long long>> C(10, vector<long long>(10, 0));
    for (int i = 0; i <= 8; i++) {
        C[i][0] = C[i][i] = 1;
        for (int j = 1; j < i; j++) C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
    }
    long long ways = 0;
    for (int b = 2; b <= n; b++) {
        int g = t - b;
        if (g >= 1 && g <= m) ways += C[n][b] * C[m][g];
    }
    cout << C[4][2] << ' ' << ways << '\\n';
    return 0;
}`,
            q: 'Đoạn code đếm số cách chọn đội gồm <code>5</code> bạn từ <code>4</code> nam và <code>3</code> nữ (ít nhất <code>2</code> nam và <code>1</code> nữ) trên sẽ in ra kết quả gì?',
            options: [
              'In ra 6 18 vì trường hợp b = 4 bị loại khi số bạn nữ g chỉ còn bằng 1',
              'In ra 6 24 vì tại mỗi bước chỉ nhân C[4][b] với giá trị C[3][1] cố định',
              'In ra 6 21 vì cộng ba trường hợp: 6*1 (b=2) + 4*3 (b=3) + 1*3 (b=4)',
              'In ra 6 15 vì điều kiện kiểm tra g &gt;= 1 bỏ qua trường hợp chọn 2 nam 3 nữ'
            ],
            correct: 2,
            explain: 'Với b=2, g=3: C[4][2]*C[3][3] = 6*1 = 6. Với b=3, g=2: C[4][3]*C[3][2] = 4*3 = 12. Với b=4, g=1: C[4][4]*C[3][1] = 1*3 = 3. Tổng ways = 6 + 12 + 3 = 21. In ra: 6 21.'
          },
          {
            type: 'single',
            q: 'Vì sao khi cần tính $C(n, k) \\bmod (10^9 + 7)$ với $N \\le 2000$ bằng kiến thức hiện tại, ta dùng Tam giác Pascal thay vì tính <code>fact[n] / (fact[k] * fact[n - k])</code> sau khi đã lấy <code>% MOD</code> cho mảng <code>fact[]</code>?',
            options: [
              'Vì phép chia nguyên không bảo toàn số dư đồng dư nên chia hai số đã % MOD sẽ cho kết quả sai',
              'Vì vòng lặp tính giai thừa từ 1 tới N tốn thời gian lâu hơn nhiều so với vòng lặp O(N^2)',
              'Vì mảng vector&lt;long long&gt; trong C++14 không cho phép thực hiện phép chia số nguyên',
              'Vì Tam giác Pascal luôn ra kết quả đúng ngay cả khi N lớn tới 10^9 mà không bị tràn RAM'
            ],
            correct: 0,
            explain: 'Phép cộng, trừ, nhân đều bảo toàn quan hệ đồng dư theo MOD, nhưng phép chia (/) thì KHÔNG (ví dụ (6 / 2) % 5 = 3 khác hẳn (6 % 5) / (2 % 5) = 1 / 2 = 0). Tam giác Pascal chỉ dùng phép cộng nên tránh được hoàn toàn phép chia!'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về Quy tắc Cộng, Quy tắc Nhân và Tam giác Pascal $C(n, k)$?',
            options: [
              'Với Quy tắc Nhân hai biến int a, b tới 10^9, phải viết (1LL * a * b) % MOD để tránh tràn kiểu int trước khi chia dư',
              'Biến cộng dồn của Quy tắc Cộng khởi tạo bằng 0, còn biến tích dồn của Quy tắc Nhân phải khởi tạo bằng 1',
              'Nếu trong Tam giác Pascal chỉ gán C[i][i] = 1 mà quên C[i][0] = 1 thì kết quả C[n][k] với k &gt;= 1 vẫn đúng',
              'Công thức C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD phân tích dựa trên việc chọn hay không chọn phần tử thứ i'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D đều đúng. C sai hoàn toàn: quên đặt C[i][0] = 1 làm cả cột 0 bằng 0, kéo sai giá trị của toàn bộ các cột bên trong tam giác như C[5][2] bị tụt từ 10 xuống còn 4!'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: DP CÁI TÚI 0/1 (0/1 KNAPSACK) & ĐỔI CHIỀU GIÁ TRỊ (KNAPSACK 2)
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Cái Túi 0/1 & Knapsack 2',
        title: 'Vấn Đề Nhỏ 2: DP Cái Túi 0/1 (<code>0/1 Knapsack</code>) &amp; Đổi Chiều Giá Trị (<code>Knapsack 2</code>)',
        lead: 'Quay lại phản ví dụ làm gãy Tham lam ở <code>L2-05</code> (túi $W = 10$, 3 món <code>{(6,60), (5,45), (5,45)}</code>): vì sao nén 1D bắt buộc phải duyệt <strong>NGƯỢC</strong> trọng lượng, và làm sao xoay sở khi sức chứa $W$ vọt lên $10^9$?',
        subproblem: {
          title: 'Giải quyết triệt để Cái túi 0/1 bằng bảng 2D + Truy vết món đã chọn, nén xuống 1D bằng vòng lặp duyệt ngược <code>w = W &rarr; w_i</code>, và lật trục trạng thái sang tổng giá trị khi $W \\le 10^9$.',
          desc: 'Với $N \\le 100, W \\le 10^5$, thuật toán Bitmask $2^N$ của <code>L2-04</code> bị <strong>TLE</strong> còn Tham lam <code>v/w</code> bị <strong>WA</strong>. Bảng DP giữ kỷ lục theo từng mức trọng lượng giải gọn trong $O(N \\cdot W)$; còn khi $W \\le 10^9$ nhưng $\\sum v_i \\le 10^5$, ta đảo sang tính <em>trọng lượng ít nhất để đạt giá trị <code>val</code></em>.'
        },
        cards: [
          {
            heading: 'Từ Bảng 2D + Truy Vết Đến Mẹo Cuộn 1D Duyệt Ngược (<code>w = W &rarr; w_i</code>)',
            tag: '0/1 Knapsack &bull; Duyệt Ngược',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Nhớ lại phản ví dụ ở <code>L2-05</code>: ba lô chịu tối đa $W = 10$ kg, có $3$ thỏi vàng nguyên chiếc <code>{(6 kg, 60), (5 kg, 45), (5 kg, 45)}</code>. Mỗi món chỉ có <strong>đúng 1 chiếc</strong> (lấy <code>1</code> hoặc bỏ <code>0</code>). Tham lam lấy món <code>(6, 60)</code> nên kẹt ở <code>60</code>; đáp án chuẩn là <strong><code>90</code></strong> (món $2$ + món $3$).</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bảng 2D <code>dp[i][w]</code> (Giá trị lớn nhất khi xét $i$ món đầu với sức chứa $w$):</strong> Đứng trước món $i$ nặng <code>wt</code>, giá <code>val</code>, chỉ có $2$ phương án:
                    <br>&bull; <em>Bỏ món $i$:</em> <code>dp[i - 1][w]</code>.
                    <br>&bull; <em>Lấy món $i$</em> (nếu <code>w &gt;= wt</code>): <code>dp[i - 1][w - wt] + val</code>.
                    <br>&rarr; Lấy <code>max</code> hai phương án! Nếu cần biết <strong>đã chọn những món nào</strong>, ta lùi từ <code>i = N</code> về <code>1</code> tại <code>curW = W</code>: hễ <code>dp[i][curW] != dp[i - 1][curW]</code> thì món $i$ đã được chọn &rarr; lưu $i$ và trừ <code>curW -= wt[i]</code>, cuối cùng gọi <code>reverse()</code>.</li>
                  <li><strong>Nén 1D &mdash; Tại sao BẮT BUỘC duyệt NGƯỢC <code>w = W &rarr; wt</code>?</strong>
                    <br>Tưởng tượng món $1$ nặng $3$ kg giá $40$. Nếu chạy <strong>XUÔI</strong> từ $w = 3$ lên $10$, tại $w = 3$ ta gán <code>dp[3] = 40</code>; lát sau chạy tới $w = 6$, công thức đọc <code>dp[6 - 3] = dp[3]</code> đã bị ghi đè thành $40$, nên nó tưởng có $2$ chiếc món $1$ và cộng tiếp thành $80$, rồi $w = 9$ thành $120$!
                    <br>Ngược lại, khi duyệt <strong>NGƯỢC</strong> từ $W$ lùi về <code>wt</code>, mọi ô <code>dp[w - wt]</code> ở bên trái <strong>chưa bị chạm tới</strong> ở lượt hiện tại nên vẫn giữ nguyên trạng thái sạch của hàng $i - 1$!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Cài Đặt 0/1 Knapsack 1D Duyệt Ngược &amp; Truy Vết 2D (C++14)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 3, W = 10;
    vector&lt;int&gt; wt = {0, 6, 5, 5};
    vector&lt;long long&gt; val = {0, 60, 45, 45};

    // 1. Nén 1D cực gọn (O(W) bộ nhớ): BẮT BUỘC duyệt ngược w = W -&gt; wt[i]
    vector&lt;long long&gt; dp1D(W + 1, 0);
    for (int i = 1; i &lt;= n; i++) {
        for (int w = W; w &gt;= wt[i]; w--) {
            dp1D[w] = max(dp1D[w], dp1D[w - wt[i]] + val[i]);
        }
    }

    // 2. Khi đề bắt in ra các món đã chọn: dùng bảng 2D rồi truy vết ngược
    vector&lt;vector&lt;long long&gt;&gt; dp2D(n + 1, vector&lt;long long&gt;(W + 1, 0));
    for (int i = 1; i &lt;= n; i++) {
        for (int w = 0; w &lt;= W; w++) {
            dp2D[i][w] = dp2D[i - 1][w];
            if (w &gt;= wt[i]) dp2D[i][w] = max(dp2D[i][w], dp2D[i - 1][w - wt[i]] + val[i]);
        }
    }
    vector&lt;int&gt; chosen;
    int curW = W;
    for (int i = n; i &gt;= 1; i--) {
        if (dp2D[i][curW] != dp2D[i - 1][curW]) {
            chosen.push_back(i);
            curW -= wt[i];
        }
    }
    reverse(chosen.begin(), chosen.end());

    cout &lt;&lt; "Max = " &lt;&lt; dp1D[W] &lt;&lt; " | Chon mon:";
    for (int id : chosen) cout &lt;&lt; ' ' &lt;&lt; id;
    cout &lt;&lt; '\\n'; // Max = 90 | Chon mon: 2 3
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cái túi 0/1 (<code>0/1 Knapsack</code>):</strong> Mô hình tối ưu hóa chọn tập con với mỗi vật phẩm chỉ có $2$ trạng thái: không chọn ($0$) hoặc chọn đúng $1$ lần ($1$).</li>
                  <li><strong>Duyệt ngược trọng lượng (<code>Backward Weight Sweep</code>):</strong> Chiều lặp <code>w = W</code> giảm dần về <code>w_i</code> trên mảng 1D giúp bảo toàn dữ liệu hàng $i - 1$ ở nửa bên trái mảng <code>dp[]</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Đổi Chiều Trạng Thái (<code>Knapsack 2</code>): Khi Sức Chứa $W \\le 10^9$ Nhưng $\\sum v_i \\le 10^5$',
            tag: 'Đổi Chiều &bull; AtCoder DP-E',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Gặp bài <code>AtCoder DP-E (Knapsack 2)</code>: vẫn chỉ có $N \\le 100$ món đồ, nhưng chiếc xe tải có sức chứa khổng lồ tới <strong>$W \\le 10^9$</strong>! Trong khi đó, mỗi món đồ chỉ có giá trị rất nhỏ $v_i \\le 10^3$ (nên tổng giá trị tối đa cả cửa hàng chỉ là $\\sum v_i \\le 100 \\times 10^3 = 10^5$).</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bế tắc của cách cũ:</strong> Mở mảng <code>dp[10^9]</code> ngốn tới <strong>8 GB RAM (MLE)</strong> và vòng lặp $N \\cdot W = 10^{11}$ chạy mất hàng phút (<strong>TLE</strong>)!</li>
                  <li><strong>Tuyệt chiêu Đảo Chiều Trạng Thái:</strong> Thay vì đặt sức chứa $W$ làm chỉ số mảng, ta ném $W$ ra làm <em>giá trị cần tối thiểu hóa</em> và đưa <strong>tổng giá trị <code>val</code></strong> (tối đa chỉ $10^5$) vào làm chỉ số mảng!
                    <br>&rarr; Định nghĩa: <strong><code>dp[val]</code> = tổng trọng lượng ÍT NHẤT cần thiết để gom được ĐÚNG tổng giá trị <code>val</code>.</strong></li>
                  <li><strong>Cơ sở &amp; Truy hồi:</strong> Đặt <code>dp[0] = 0</code> (không lấy món nào tốn $0$ kg), mọi <code>dp[val &gt; 0] = INF = 1e18</code> (chưa đạt được). Với mỗi món <code>(wt, v)</code>, vẫn duyệt <strong>ngược</strong> <code>val = sumV &rarr; v</code> (để mỗi món tối đa $1$ lần):
                    <br><code>if (dp[val - v] &lt; INF) dp[val] = min(dp[val], dp[val - v] + wt);</code></li>
                  <li><strong>Bẫy quên lọc sức chứa khi lấy đáp án:</strong> Sau khi tính xong bảng <code>dp</code>, không phải <code>val</code> nào <code>&lt; INF</code> cũng bỏ vừa xe tải! Ta phải tìm <code>val</code> <strong>lớn nhất</strong> sao cho <strong><code>dp[val] &lt;= W</code></strong>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Đổi Chiều Trạng Thái Giải Knapsack W = 10^9 (C++14)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long INF = 1000000000000000000LL; // 1e18

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long W = 1000000000LL; // 10^9 -&gt; Không thể mở mảng dp[W]!
    vector&lt;long long&gt; wt = {600000000LL, 500000000LL, 500000000LL};
    vector&lt;int&gt; val = {30, 25, 25};

    int sumV = 0;
    for (int v : val) sumV += v;

    // dp[v] = tổng trọng lượng NHỎ NHẤT để đạt đúng giá trị v
    vector&lt;long long&gt; dp(sumV + 1, INF);
    dp[0] = 0;

    for (int i = 0; i &lt; (int)wt.size(); i++) {
        for (int v = sumV; v &gt;= val[i]; v--) {
            if (dp[v - val[i]] &lt; INF) {
                dp[v] = min(dp[v], dp[v - val[i]] + wt[i]);
            }
        }
    }

    int ans = 0;
    for (int v = sumV; v &gt;= 0; v--) {
        if (dp[v] &lt;= W) { // BẮT BUỘC kiểm tra không vượt sức chứa W!
            ans = v;
            break;
        }
    }
    cout &lt;&lt; "Max gia tri voi W=10^9: " &lt;&lt; ans &lt;&lt; '\\n'; // 50
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Đổi chiều trạng thái (<code>State-Value Inversion</code>):</strong> Hoán đổi vai trò giữa chiều tham số đầu vào quá lớn ($W \\le 10^9$) và giá trị mục tiêu nhỏ ($\\sum v_i \\le 10^5$), đưa bài toán về $O(N \\cdot \\sum v_i)$.</li>
                  <li><strong>Điều kiện khả thi (<code>dp[val] &lt;= W</code>):</strong> Bước lọc nghiệm cuối cùng bảo đảm giá trị đạt được không vượt quá tải trọng thực tế của chiếc túi.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_01_backward_vs_forward',
            title: 'Phòng Thí Nghiệm 2A: Cái Túi 0/1 (1D) — Duyệt Ngược vs Bẫy Duyệt Xuôi',
            desc: 'Với túi W = 10 và 3 món {(3, 40), (5, 45), (5, 45)} (mỗi món chỉ có 1 chiếc, tối ưu đúng là 45 + 45 = 90), hãy đảo chiều vòng lặp w để chứng kiến máy tính bốc trùng món {3, 40} tận 3 lần lên thành 120!',
            toggles: [
              {
                key: 'dirMode',
                label: 'Chiều duyệt trọng lượng w cho từng món đồ',
                options: [
                  { value: 'backward', text: 'for (int w = W; w &gt;= wt; w--) — Duyệt NGƯỢC (AC)', kind: 'ok' },
                  { value: 'forward', text: 'for (int w = wt; w &lt;= W; w++) — Duyệt XUÔI (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.dirMode === 'backward';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int W = 10;
    vector<pair<int, long long>> items = {{3, 40}, {5, 45}, {5, 45}};
    vector<long long> dp(W + 1, 0);
    for (const auto& it : items) {
        int wt = it.first;
        long long val = it.second;
${isOk ? '        for (int w = W; w >= wt; w--) {' : '        for (int w = wt; w <= W; w++) {'}
            dp[w] = max(dp[w], dp[w - wt] + val);
        }
    }
    cout << "dp[6]=" << dp[6] << " dp[10]=" << dp[10] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [13],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Duyệt ngược giữ mỗi món tối đa 1 lần, chọn hai món {5, 45} để đạt dp[10]=90!'
                  : 'BỐC TRÙNG MÓN (WA): Duyệt xuôi khiến món {3, 40} bị nhét tới 3 lần vào túi (dp[6]=80, dp[10]=120)!',
                predictions: [
                  { text: 'In ra dp[6]=45 dp[10]=90 vì mỗi món chỉ được chọn tối đa 1 lần' },
                  { text: 'In ra dp[6]=80 dp[10]=120 vì món {3, 40} bị cộng dồn nhiều lần khi duyệt xuôi' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[6]=45 dp[10]=90'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[6]=80 dp[10]=120',
                explain: isOk
                  ? 'Khi w chạy lùi từ 10 về wt, món {3, 40} cho dp[6]=40 rồi món {5, 45} nâng lên dp[6]=45 (từ dp[1]+45); cuối cùng hai món {5, 45} ghép khít 5 + 5 = 10 đạt 90.'
                  : 'Khi w chạy xuôi cho món {3, 40}, tại w = 3 gán dp[3] = 40; ngay tại w = 6 lại đọc dp[6 - 3] = dp[3] = 40 để lên 80, rồi w = 9 lên tận 120!'
              };
            }
          },
          {
            id: 'sb_knapsack2_filter',
            title: 'Phòng Thí Nghiệm 2B: Đổi Chiều Giá Trị (Knapsack 2) — Lọc dp[v] &lt;= W vs Bẫy Quên Kiểm Tra W',
            desc: 'Với sức chứa túi W = 7 và 2 món {(w=4, v=5), (w=4, v=6)}, tổng giá trị cả hai là 11 nhưng nặng tới 8 &gt; 7. Thử tắt điều kiện dp[v] &lt;= W ở vòng lặp chọn nghiệm cuối cùng!',
            toggles: [
              {
                key: 'filterMode',
                label: 'Điều kiện chấp nhận tổng giá trị v làm đáp án',
                options: [
                  { value: 'check_w', text: 'if (dp[v] &lt;= W) ans = v — Kiểm tra không quá tải (AC)', kind: 'ok' },
                  { value: 'only_inf', text: 'if (dp[v] &lt; INF) ans = v — Quên so với W (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.filterMode === 'check_w';
              const code = `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long W = 7;
    vector<pair<long long, int>> items = {{4, 5}, {4, 6}};
    int sumV = 11;
    vector<long long> dp(sumV + 1, INF);
    dp[0] = 0;
    for (const auto& it : items) {
        for (int v = sumV; v >= it.second; v--) {
            if (dp[v - it.second] < INF) dp[v] = min(dp[v], dp[v - it.second] + it.first);
        }
    }
    int ans = 0;
    for (int v = 0; v <= sumV; v++) {
${isOk ? '        if (dp[v] <= W) ans = v;' : '        if (dp[v] < INF) ans = v;'}
    }
    cout << "W=" << W << " dp[6]=" << dp[6] << " dp[11]=" << dp[11] << " | ans=" << ans << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [21],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): dp[11]=8 vượt W=7 bị loại bỏ, nên đáp án hợp lệ lớn nhất là ans=6!'
                  : 'QUÁ TẢI CHIẾC TÚI (WA): Chỉ kiểm tra dp[v] &lt; INF làm máy chọn cả dp[11]=8 kg &gt; 7 kg, in nhầm ans=11!',
                predictions: [
                  { text: 'In ra W=7 dp[6]=4 dp[11]=8 | ans=6 vì tổng trọng lượng 8 vượt sức chứa W = 7' },
                  { text: 'In ra W=7 dp[6]=4 dp[11]=8 | ans=11 vì quên lọc điều kiện dp[v] &lt;= W' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nW=7 dp[6]=4 dp[11]=8 | ans=6'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nW=7 dp[6]=4 dp[11]=8 | ans=11',
                explain: isOk
                  ? 'Trong Knapsack 2, mảng dp[] tính cho mọi tổng giá trị đạt được kể cả những cấu hình nặng hơn W. Do đó bước cuối bắt buộc phải kiểm tra dp[v] &lt;= W.'
                  : 'dp[11] = 8 khác INF vì đạt được bằng cách lấy cả 2 món, nhưng 8 kg lớn hơn W = 7 kg nên không nhét vừa túi!'
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
    int W = 7;
    vector<pair<int, long long>> items = {{3, 4}, {4, 5}, {5, 6}};
    vector<long long> dp(W + 1, 0);
    for (const auto& it : items) {
        for (int w = W; w >= it.first; w--) {
            dp[w] = max(dp[w], dp[w - it.first] + it.second);
        }
    }
    cout << dp[4] << ' ' << dp[5] << ' ' << dp[7] << '\\n';
    return 0;
}`,
            q: 'Chạy đoạn code 0/1 Knapsack 1D duyệt ngược với <code>W = 7</code> trên sẽ in ra ba giá trị <code>dp[4]</code>, <code>dp[5]</code> và <code>dp[7]</code> bằng bao nhiêu?',
            options: [
              'In ra 4 5 10 vì ở bước cuối món {5, 6} ghi đè lại cả các ô nhỏ hơn 5',
              'In ra 5 5 9 vì tại món {5, 6} không lấy được thêm giá trị mới nào cho túi 5',
              'In ra 4 6 10 vì món {3, 4} bị chọn lặp hai lần ở trọng lượng w = 6',
              'In ra 5 6 9 vì dp[4]=5 (món 2), dp[5]=6 (món 3), dp[7]=9 (món 1 + món 2)'
            ],
            correct: 3,
            explain: 'Sau {3,4}: dp[3..7]=4. Sau {4,5}: dp[4..6]=5, dp[7]=max(4, dp[3]+5)=9. Sau {5,6}: dp[5]=6, dp[6]=max(5, dp[1]+6)=6, dp[7]=max(9, dp[2]+6)=9. Vậy in ra: 5 6 9.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long W = 6;
    vector<pair<long long, int>> items = {{4, 3}, {3, 2}, {2, 2}};
    int sumV = 7;
    vector<long long> dp(sumV + 1, INF);
    dp[0] = 0;
    for (const auto& it : items) {
        for (int v = sumV; v >= it.second; v--) {
            if (dp[v - it.second] < INF) dp[v] = min(dp[v], dp[v - it.second] + it.first);
        }
    }
    int ans = 0;
    for (int v = sumV; v >= 0; v--) {
        if (dp[v] <= W) { ans = v; break; }
    }
    cout << dp[4] << ' ' << dp[5] << ' ' << ans << '\\n';
    return 0;
}`,
            q: 'Khi chạy thuật toán Đổi chiều giá trị (<code>Knapsack 2</code>) với <code>W = 6</code> ở trên, ba số <code>dp[4]</code>, <code>dp[5]</code> và <code>ans</code> in ra là gì?',
            options: [
              'In ra 4 7 4 vì ghép món 1 và món 2 tốn trọng lượng 7 nhỏ nhất cho giá trị 5',
              'In ra 5 6 5 vì dp[4]=5 (3+2 kg), dp[5]=6 (4+2 kg) và dp[7]=9 &gt; 6 nên ans=5',
              'In ra 5 6 7 vì toàn bộ 7 giá trị đều khác INF nên đều được tính là hợp lệ',
              'In ra 5 7 5 vì ở món {2, 2} quên cập nhật lại giá trị dp[5] từ dp[3]'
            ],
            correct: 1,
            explain: 'Sau {4,3}: dp[3]=4. Sau {3,2}: dp[2]=3, dp[5]=7. Sau {2,2}: dp[7]=dp[5]+2=9, dp[5]=min(7, dp[3]+2)=6, dp[4]=dp[2]+2=5, dp[2]=2. Vì dp[7]=9 &gt; 6 và dp[5]=6 &lt;= 6 nên ans=5. In ra: 5 6 5.'
          },
          {
            type: 'single',
            q: 'Tại sao khi nén bảng Cái túi 0/1 từ 2D <code>dp[i][w]</code> xuống mảng 1D <code>dp[w]</code>, vòng lặp bên trong bắt buộc phải duyệt <code>w</code> giảm dần từ <code>W</code> về <code>w_i</code>?',
            options: [
              'Vì vector trong C++ luôn truy cập phần tử ở chỉ số lớn nhanh hơn chỉ số nhỏ',
              'Vì phép toán max() chỉ hoạt động chính xác khi mảng được quét từ phải sang trái',
              'Vì khi tính dp[w], ô dp[w - w_i] vẫn giữ nguyên dữ liệu hàng i - 1 (tránh trùng)',
              'Vì duyệt ngược giúp tự động truy vết lại toàn bộ các món đã chọn mà không cần bảng 2D'
            ],
            correct: 2,
            explain: 'Nếu duyệt xuôi từ w_i lên W, ô dp[w - w_i] đã bị ghi đè bởi món i ở ngay bước trước đó nên món i sẽ bị chọn lại nhiều lần. Duyệt ngược bảo đảm dp[w - w_i] vẫn là dữ liệu hàng i - 1!'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về DP Cái túi 0/1 và kỹ thuật Đổi chiều trạng thái (<code>Knapsack 2</code>)?',
            options: [
              'Trong truy vết trên bảng 2D, nếu dp[i][curW] != dp[i - 1][curW] thì chắc chắn món i đã được chọn vào túi',
              'Với bài AtCoder DP-D (W &lt;= 10^5, v_i &lt;= 10^9), có thể dùng mảng vector&lt;int&gt; cho dp[] mà không bị tràn số',
              'Khi sức chứa W &lt;= 10^9 nhưng tổng giá trị sum(v_i) &lt;= 10^5, ta đổi sang dp[val] = trọng lượng nhỏ nhất để đạt giá trị val',
              'Ở bước truy vết trên bảng 2D, khi xác nhận lấy món i ta nhớ giảm sức chứa còn lại curW -= wt[i] trước khi xét i - 1'
            ],
            correct: [0, 2, 3],
            explain: 'A, C và D đều đúng. B sai: khi N = 100 và v_i = 10^9, tổng giá trị tối đa lên tới 10^11 vượt xa ngưỡng int (~2.14 * 10^9), bắt buộc phải dùng long long cho bảng dp[]!'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: CÁI TÚI VÔ HẠN & BẪY THỨ TỰ HAI VÒNG LẶP (HOÁN VỊ VS TỔ HỢP)
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Túi Vô Hạn & Hoán Vị/Tổ Hợp',
        title: 'Vấn Đề Nhỏ 3: Cái Túi Vô Hạn &amp; Bẫy Thứ Tự Hai Vòng Lặp (Hoán Vị vs Tổ Hợp)',
        lead: 'Khi mỗi loại đồ vật hay đồng xu có <strong>vô hạn bản sao</strong>, "bẫy duyệt xuôi" ở Phần 2 bỗng biến thành công cụ chuẩn xác &mdash; nhưng chỉ một cú tráo chỗ hai vòng lặp lại chia bài toán thành hai thế giới khác hẳn: <strong>Hoán vị</strong> (<code>CSES-1635</code>) vs <strong>Tổ hợp</strong> (<code>CSES-1636</code>)!',
        subproblem: {
          title: 'Sử dụng vòng lặp duyệt xuôi <code>w = w_i &rarr; W</code> cho Cái túi vô hạn, và làm chủ quy luật thứ tự hai vòng lặp để phân biệt rạch ròi bài toán đếm có thứ tự vs không thứ tự.',
          desc: 'Với cùng tập xu <code>{1, 2}</code> và tổng <code>S = 4</code>, viết vòng lặp <code>for s</code> bên ngoài cho kết quả <strong>5</strong> (<code>1+2</code> và <code>2+1</code> tính riêng), còn viết vòng lặp <code>for coin</code> bên ngoài chỉ cho kết quả <strong>3</strong> (<code>{1, 2}</code> tính một lần). Hiểu thấu bất biến đứng sau sẽ giúp bạn không bao giờ chọn nhầm vòng lặp.'
        },
        cards: [
          {
            heading: 'Cái Túi Vô Hạn (<code>Unbounded Knapsack</code>): Đổi Chiều Thành Duyệt Xuôi <code>w = w_i &rarr; W</code>',
            tag: 'Vô Hạn &bull; Duyệt Xuôi',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Lần này bạn đi siêu thị sỉ: mỗi mặt hàng trên kệ có <strong>số lượng vô hạn</strong> (thích lấy bao nhiêu chiếc giống nhau cũng được miễn không vượt tải trọng $W$).</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Biến "lỗi" thành "tính năng vàng":</strong> Ở Phần 2, ta sợ duyệt xuôi <code>w = wt &rarr; W</code> vì nó đọc lại chính giá trị <code>dp[w - wt]</code> vừa cập nhật của món hiện tại, dẫn tới việc bốc món $i$ nhiều lần. Bây giờ khi được phép bốc vô hạn lần, ta <strong>CỐ TÌNH duyệt xuôi</strong> để <code>dp[w]</code> kế thừa tiếp từ <code>dp[w - wt]</code> (có thể đã chứa $1, 2, 3\\dots$ chiếc của món $i$)!</li>
                  <li><strong>So sánh trực diện với $W = 9$, <code>{(3, 40), (5, 60)}</code>:</strong>
                    <br>&bull; <em>Nếu là 0/1 Knapsack (duyệt ngược):</em> Chỉ chọn được tối đa <code>{3, 40} + {5, 60}</code> = <strong><code>100</code></strong>.
                    <br>&bull; <em>Nếu là Unbounded Knapsack (duyệt xuôi):</em> Tại $w = 3$ được $40$, tới $w = 6$ cộng tiếp $40$ thành $80$, tới $w = 9$ lấy thêm chiếc thứ $3$ đạt <strong><code>120</code></strong>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Cái Túi Vô Hạn Tối Ưu Giá Trị Duyệt Xuôi (C++14)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int W = 9;
    vector&lt;pair&lt;int, long long&gt;&gt; items = {{3, 40}, {5, 60}};

    vector&lt;long long&gt; dp(W + 1, 0);
    for (const auto&amp; it : items) {
        int wt = it.first;
        long long val = it.second;
        // Duyệt XUÔI từ wt lên W: cho phép chọn món hiện tại nhiều lần!
        for (int w = wt; w &lt;= W; w++) {
            dp[w] = max(dp[w], dp[w - wt] + val);
        }
    }

    cout &lt;&lt; "Unbounded Knapsack (W=9) = " &lt;&lt; dp[W] &lt;&lt; '\\n'; // 120
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cái túi vô hạn (<code>Unbounded / Complete Knapsack</code>):</strong> Biến thể Cái túi cho phép chọn lặp vô hạn lần cùng một loại đồ vật; chỉ khác Cái túi 0/1 ở đúng chiều vòng lặp <code>w</code> tăng dần.</li>
                  <li><strong>Duyệt xuôi trọng lượng (<code>Forward Weight Sweep</code>):</strong> Quét <code>w</code> từ <code>wt</code> đến <code>W</code> để trạng thái <code>dp[w - wt]</code> mang kết quả mới nhất đã tính trong cùng lượt đồ vật hiện tại.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Bẫy Kinh Điển Hai Vòng Lặp: Đếm Hoán Vị (<code>CSES-1635</code>) vs Đếm Tổ Hợp (<code>CSES-1636</code>)',
            tag: 'Hoán Vị vs Tổ Hợp &bull; CSES',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Cùng bài toán có vô hạn đồng xu mệnh giá <code>{1, 2}</code> để đổi tổng <code>S = 4</code> (chia dư $10^9 + 7$), nhưng đề thi chia thành $2$ câu hỏi hoàn toàn khác nhau:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bài 1 &mdash; Đếm HOÁN VỊ có phân biệt thứ tự (<code>CSES-1635</code>, <code>1+1+2</code> $\\neq$ <code>1+2+1</code> $\\neq$ <code>2+1+1</code>):</strong>
                    <br>Tưởng tượng bạn đút từng đồng xu vào máy bán hàng theo thời gian. Với mỗi mức tiền <code>s = 1..S</code> ở <strong>vòng NGOÀI</strong>, đồng xu <strong>cuối cùng</strong> vừa đút vào có thể là bất kỳ đồng nào trong <code>coins</code> (<strong>vòng TRONG</strong>).
                    <br>Khi <code>s = 3</code> đã tính đủ <code>1+2</code> và <code>2+1</code>, lên <code>s = 4</code> cộng thêm đồng <code>1</code> vào cả hai tạo ra <code>1+2+1</code> và <code>2+1+1</code> riêng biệt &rarr; Tổng cộng <strong><code>5</code> cách</strong> (<code>1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2</code>)!</li>
                  <li><strong>Bài 2 &mdash; Đếm TỔ HỢP không phân biệt thứ tự (<code>CSES-1636</code>, <code>{1, 1, 2}</code> chỉ tính $1$ lần):</strong>
                    <br>Tưởng tượng bạn gom một nắm xu bỏ vào ví — không quan tâm đồng nào bốc trước hay sau! Mẹo chống đếm trùng là <strong>ép cố định thứ tự xét từng loại xu</strong>: đặt <strong>vòng NGOÀI là từng đồng xu <code>c</code></strong>, <strong>vòng TRONG duyệt xuôi <code>s = c..S</code></strong>.
                    <br>Khi đang ở lượt của xu <code>1</code>, bảng <code>dp</code> chỉ sinh các tập toàn xu <code>1</code>. Khi chốt xu <code>1</code> và sang lượt xu <code>2</code>, ta chỉ được phép bỏ thêm xu <code>2</code> vào sau xu <code>1</code> (chỉ tạo ra <code>1+1+2</code>, không bao giờ quay lại sinh <code>2+1+1</code>) &rarr; Tổng chỉ còn <strong><code>3</code> cách</strong> (<code>{1,1,1,1}, {1,1,2}, {2,2}</code>)!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Song Song Coin Combinations I (Hoán Vị) vs II (Tổ Hợp)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int S = 4;
    vector&lt;int&gt; coins = {1, 2};

    // 1. Coin Combinations I (HOÁN VỊ - CSES 1635): Ngoài là tổng s, Trong là xu c
    vector&lt;long long&gt; dpPerm(S + 1, 0);
    dpPerm[0] = 1;
    for (int s = 1; s &lt;= S; s++) {
        for (int c : coins) {
            if (s &gt;= c) dpPerm[s] = (dpPerm[s] + dpPerm[s - c]) % MOD;
        }
    }

    // 2. Coin Combinations II (TỔ HỢP - CSES 1636): Ngoài là xu c, Trong là tổng s xuôi
    vector&lt;long long&gt; dpComb(S + 1, 0);
    dpComb[0] = 1;
    for (int c : coins) {
        for (int s = c; s &lt;= S; s++) {
            dpComb[s] = (dpComb[s] + dpComb[s - c]) % MOD;
        }
    }

    cout &lt;&lt; "Hoan vi = " &lt;&lt; dpPerm[S] &lt;&lt; " | To hop = " &lt;&lt; dpComb[S] &lt;&lt; '\\n'; // 5 | 3
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Đếm hoán vị (<code>Ordered Ways</code>):</strong> Các cách chọn khác thứ tự được tính là riêng biệt; vòng lặp tổng <code>s</code> nằm ngoài ép thử mọi bước cuối tại mỗi mức tổng.</li>
                  <li><strong>Đếm tổ hợp (<code>Unordered Combinations</code>):</strong> Chỉ quan tâm số lượng từng loại xu được dùng; vòng lặp loại xu <code>c</code> nằm ngoài ép dùng xong hẳn từng mệnh giá theo thứ tự cố định để loại trùng hoàn toàn.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_unbounded_vs_01',
            title: 'Phòng Thí Nghiệm 3A: Đổi Chiều Trọng Lượng — Vô Hạn Xuôi vs 0/1 Ngược',
            desc: 'Với sức chứa W = 9 và 2 loại vật phẩm vô số lượng {(3, 40), (5, 60)}, thử đổi chiều vòng lặp trọng lượng giữa xuôi và ngược để kiểm chứng kết quả!',
            toggles: [
              {
                key: 'sweepDir',
                label: 'Hướng duyệt trọng lượng w khi mỗi món có vô hạn chiếc',
                options: [
                  { value: 'forward', text: 'w = wt &rarr; W (Duyệt XUÔI — Đúng cho Túi Vô Hạn)', kind: 'ok' },
                  { value: 'backward', text: 'w = W &rarr; wt (Duyệt NGƯỢC — Chỉ lấy mỗi món 1 lần!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.sweepDir === 'forward';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int W = 9;
    vector<pair<int, long long>> items = {{3, 40}, {5, 60}};
    vector<long long> dp(W + 1, 0);
    for (const auto& it : items) {
        int wt = it.first;
        long long val = it.second;
${isOk ? '        for (int w = wt; w <= W; w++) {' : '        for (int w = W; w >= wt; w--) {'}
            dp[w] = max(dp[w], dp[w - wt] + val);
        }
    }
    cout << "dp[6]=" << dp[6] << " dp[9]=" << dp[9] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [13],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Duyệt xuôi cho phép lấy 3 chiếc món {3, 40} để đạt dp[9]=120!'
                  : 'MẤT LƯỢT LẤY LẶP (WA): Duyệt ngược giới hạn mỗi món đúng 1 chiếc nên chỉ đạt {3,40}+{5,60}=100!',
                predictions: [
                  { text: 'In ra dp[6]=80 dp[9]=120 vì lấy lặp lại món {3, 40} nhiều lần' },
                  { text: 'In ra dp[6]=60 dp[9]=100 vì duyệt ngược cấm chọn trùng một món' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[6]=80 dp[9]=120'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[6]=60 dp[9]=100',
                explain: isOk
                  ? 'Khi w tăng dần từ 3 lên 9, dp[6] kế thừa dp[3] = 40 để lên 80, rồi dp[9] kế thừa dp[6] = 80 để lên 120 (3 chiếc món 1).'
                  : 'Khi chạy lùi từ 9 về 3, mỗi món chỉ được chọn tối đa 1 lần: sau {3,40} có dp[6]=40, sau {5,60} tăng dp[6]=60 (từ dp[1]+60) và dp[9]=40+60=100.'
              };
            }
          },
          {
            id: 'sb_coin_perm_vs_comb',
            title: 'Phòng Thí Nghiệm 3B: Hoán Đổi Hai Vòng Lặp — Hoán Vị (CSES-1635) vs Tổ Hợp (CSES-1636)',
            desc: 'Đề bài yêu cầu đếm số HOÁN VỊ (1+2 khác 2+1) để tạo tổng S = 4 từ bộ xu {1, 2}. Hãy tráo chỗ 2 vòng lặp for để chứng kiến kết quả nhảy từ 5 xuống 3!',
            toggles: [
              {
                key: 'loopMode',
                label: 'Thứ tự hai vòng lặp lồng nhau',
                options: [
                  { value: 'sum_outer', text: 'Ngoài: for s = 1..S | Trong: for c (Đếm HOÁN VỊ — AC)', kind: 'ok' },
                  { value: 'coin_outer', text: 'Ngoài: for c | Trong: for s = c..S (Ra TỔ HỢP — Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.loopMode === 'sum_outer';
              const code = `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int S = 4;
    vector<int> coins = {1, 2};
    vector<long long> dp(S + 1, 0);
    dp[0] = 1;
${isOk ? '    for (int s = 1; s <= S; s++) {\n        for (int c : coins) {\n            if (s >= c) dp[s] = (dp[s] + dp[s - c]) % MOD;\n        }\n    }' : '    for (int c : coins) {\n        for (int s = c; s <= S; s++) {\n            dp[s] = (dp[s] + dp[s - c]) % MOD;\n        }\n    }'}
    cout << "dp[3]=" << dp[3] << " dp[4]=" << dp[4] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [13, 14, 15],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC CHO BÀI HOÁN VỊ (AC): Tổng s ở ngoài đếm riêng 1+2 và 2+1, ra dp[3]=3 và dp[4]=5!'
                  : 'ĐẾM NHẦM SANG TỔ HỢP (WA): Xu c ở ngoài gộp chung {1, 2} và {2, 1} làm 1 cách, tụt xuống dp[3]=2 và dp[4]=3!',
                predictions: [
                  { text: 'In ra dp[3]=3 dp[4]=5 (đếm đủ các hoán vị 1+1+2, 1+2+1, 2+1+1...)' },
                  { text: 'In ra dp[3]=2 dp[4]=3 vì vòng ngoài cố định theo từng loại xu c' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[3]=3 dp[4]=5'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ndp[3]=2 dp[4]=3',
                explain: isOk
                  ? 'Vòng ngoài duyệt tổng s từ 1 đến 4 tính theo kiểu Fibonacci: dp[1]=1, dp[2]=2 (1+1, 2), dp[3]=dp[2]+dp[1]=3, dp[4]=dp[3]+dp[2]=5.'
                  : 'Khi vòng ngoài là xu c, sau lượt xu 1 có [1,1,1,1,1]; sang lượt xu 2 mới thêm xu 2 vào cuối nên dp[3]=2 ({1,1,1}, {1,2}) và dp[4]=3 ({1,1,1,1}, {1,1,2}, {2,2}).'
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
    int W = 8;
    vector<pair<int, long long>> items = {{3, 5}, {4, 6}};
    vector<long long> dp(W + 1, 0);
    for (const auto& it : items) {
        for (int w = it.first; w <= W; w++) {
            dp[w] = max(dp[w], dp[w - it.first] + it.second);
        }
    }
    cout << dp[6] << ' ' << dp[7] << ' ' << dp[8] << '\\n';
    return 0;
}`,
            q: 'Khi chạy đoạn code Cái túi vô hạn (vòng lặp duyệt xuôi) với <code>W = 8</code> trên, ba giá trị <code>dp[6]</code>, <code>dp[7]</code> và <code>dp[8]</code> in ra là gì?',
            options: [
              'In ra 10 11 12 vì dp[6]=5+5, dp[7]=5+6 và dp[8]=6+6 do được lấy lặp món',
              'In ra 5 11 11 vì chỉ lấy được tối đa một chiếc mỗi loại cho túi 8',
              'In ra 10 10 12 vì tại w = 7 bỏ qua trường hợp ghép một món 3 và một món 4',
              'In ra 6 11 12 vì ở món {4, 6} thì giá trị dp[6] bị ghi đè xuống còn 6'
            ],
            correct: 0,
            explain: 'Sau món {3, 5}: dp[3..5]=5, dp[6..8]=10. Sau món {4, 6}: dp[4..5]=6, dp[6]=max(10, dp[2]+6)=10, dp[7]=max(10, dp[3]+6)=11, dp[8]=max(10, dp[4]+6)=12. In ra: 10 11 12.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int S = 5;
    vector<int> coins = {1, 2};
    vector<long long> dpPerm(S + 1, 0), dpComb(S + 1, 0);
    dpPerm[0] = dpComb[0] = 1;
    for (int s = 1; s <= S; s++) {
        for (int c : coins) if (s >= c) dpPerm[s] = (dpPerm[s] + dpPerm[s - c]) % MOD;
    }
    for (int c : coins) {
        for (int s = c; s <= S; s++) dpComb[s] = (dpComb[s] + dpComb[s - c]) % MOD;
    }
    cout << dpPerm[S] << ' ' << dpComb[S] << '\\n';
    return 0;
}`,
            q: 'Với mục tiêu <code>S = 5</code> và hai đồng xu <code>{1, 2}</code>, hai biến <code>dpPerm[5]</code> và <code>dpComb[5]</code> in ra lần lượt bằng bao nhiêu?',
            options: [
              'In ra 5 3 vì tổng 5 cũng chỉ tạo được đúng năm dãy hoán vị phân biệt',
              'In ra 8 8 vì cả hai cách viết vòng lặp lồng nhau đều đếm cùng một tập kết quả',
              'In ra 8 3 vì hoán vị bằng số Fibonacci 8 còn tổ hợp chỉ gồm 3 bộ (0, 1 hoặc 2 xu 2)',
              'In ra 8 5 vì cách đếm tổ hợp vẫn tính trùng hai dãy đối xứng 1+2+2 và 2+2+1'
            ],
            correct: 2,
            explain: 'Hoán vị (dpPerm): dpPerm = [1, 1, 2, 3, 5, 8] cho 8. Tổ hợp (dpComb): các bộ không thứ tự là {1,1,1,1,1}, {1,1,1,2}, {1,2,2} cho 3. Vậy in ra: 8 3.'
          },
          {
            type: 'single',
            q: 'Để giải bài toán <strong>Coin Combinations II (<code>CSES-1636</code>)</strong> yêu cầu đếm số cách tạo tổng <code>S</code> từ vô hạn đồng xu sao cho <code>{1, 2}</code> và <code>{2, 1}</code> chỉ tính <strong>1 lần</strong>, ta phải đặt hai vòng lặp theo thứ tự nào?',
            options: [
              'Vòng ngoài là tổng s từ 1 đến S, vòng trong duyệt các đồng xu c',
              'Vòng ngoài là tổng s từ S về 1, vòng trong duyệt các đồng xu c',
              'Vòng ngoài là từng đồng xu c, vòng trong duyệt ngược s từ S về c',
              'Vòng ngoài là từng đồng xu c, vòng trong duyệt xuôi s từ c đến S'
            ],
            correct: 3,
            explain: 'Để vừa dùng được vô hạn lần mỗi đồng xu (duyệt xuôi s = c..S), vừa ép thứ tự xét cố định từng loại xu để không đếm trùng hoán vị 1+2 và 2+1, vòng ngoài BẮT BUỘC duyệt từng đồng xu c và vòng trong duyệt xuôi s = c..S!'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về Cái túi vô hạn và bài toán đếm đổi xu?',
            options: [
              'Trong Cái túi vô hạn tối ưu giá trị, duyệt xuôi w = w_i .. W cho phép chọn lặp nhiều lần cùng một loại đồ vật',
              'Với bài Coin Combinations I (đếm hoán vị), đặt vòng ngoài là tổng s = 1..S và vòng trong là từng xu c',
              'Mỗi phép cộng dồn dp[s] = (dp[s] + dp[s - c]) % MOD đều phải lấy dư ngay trong vòng lặp để tránh tràn số',
              'Nếu đặt vòng ngoài là đồng xu c và vòng trong duyệt ngược s = S .. c thì sẽ giải được bài Coin Combinations II'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều đúng. D sai: duyệt ngược s = S .. c là mô hình 0/1 (mỗi đồng xu chỉ dùng tối đa 1 lần), còn Coin Combinations II (CSES-1636) cho phép dùng vô hạn mỗi mệnh giá nên vòng trong phải duyệt XUÔI s = c .. S!'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l208_pascal_col0',
        title: 'Quên Cơ Sở C[i][0] = 1 Khi Dựng Tam Giác Pascal (WA)',
        description: 'Chương trình tính C(n, k) % (10^9 + 7) bằng Tam giác Pascal. Với đầu vào n = 5, k = 2, đáp án đúng là 10, nhưng code chỉ in ra 4 vì thiếu giá trị cơ sở ở cột 0!',
        failingInput: '5 2',
        failingOutput: '4',
        expectedOutput: '10',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, k;
    cin >> n >> k;
    vector<vector<long long>> C(n + 1, vector<long long>(n + 1, 0));
    for (int i = 0; i <= n; i++) {
        C[i][i] = 1;
        for (int j = 1; j < i; j++) {
            C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
        }
    }
    cout << C[n][k] << '\\n';
    return 0;
}`,
        bugLine: 13,
        patches: [
          { text: 'C[i][0] = C[i][i] = 1;' },
          { text: 'C[i][j] = (C[i - 1][j - 1] * C[i - 1][j]) % MOD;' },
          { text: 'for (int j = 0; j < i; j++) {' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 13, chương trình chỉ đặt C[i][i] = 1 mà quên đặt C[i][0] = 1! Kết quả là mọi C[i][0] (trừ C[0][0]) đều bằng 0, làm C[2][1] = 1 thay vì 2 và kéo C[5][2] tụt xuống 4. Sửa dòng 13 thành C[i][0] = C[i][i] = 1; để khôi phục đủ 2 cạnh tam giác.'
      },
      {
        id: 'dbg_l208_01knapsack_forward',
        title: 'Duyệt Xuôi Trọng Lượng Trong 0/1 Knapsack 1D Gây Chọn Trùng Món (WA)',
        description: 'Bài toán Cái túi 0/1 (mỗi món chọn tối đa 1 lần) với W = 10 và 3 món {(3, 40), (5, 45), (5, 45)}. Đáp án tối ưu hợp lệ là 90, nhưng code lại in ra 120 vì bốc món {3, 40} tận 3 lần!',
        failingInput: '3 10\n3 40\n5 45\n5 45',
        failingOutput: '120',
        expectedOutput: '90',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, W;
    cin >> n >> W;
    vector<long long> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        int wt;
        long long val;
        cin >> wt >> val;
        for (int w = wt; w <= W; w++) {
            dp[w] = max(dp[w], dp[w - wt] + val);
        }
    }
    cout << dp[W] << '\\n';
    return 0;
}`,
        bugLine: 14,
        patches: [
          { text: 'vector<long long> dp(W + 1, 1);' },
          { text: 'for (int w = W; w >= wt; w--) {' },
          { text: 'dp[w] = min(dp[w], dp[w - wt] + val);' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 14, vòng lặp duyệt xuôi w = wt .. W khiến dp[w - wt] đã mang giá trị mới của chính món đang xét, biến nhầm thành Cái túi vô hạn và chọn món {3, 40} ba lần thành 120. Phải duyệt ngược for (int w = W; w &gt;= wt; w--) để bảo đảm mỗi món chỉ xét tối đa 1 lần.'
      },
      {
        id: 'dbg_l208_knapsack2_weight_check',
        title: 'Quên Kiểm Tra Điều Kiện dp[v] &lt;= W Khi Chọn Nghiệm Knapsack 2 (WA)',
        description: 'Giải bài Cái túi 0/1 bằng kỹ thuật Đổi chiều giá trị (dp[v] = trọng lượng min để đạt giá trị v). Với W = 7 và 2 món {(4, 5), (4, 6)}, đáp án đúng là 6, nhưng code lại in ra 11 dù nặng tới 8 &gt; 7!',
        failingInput: '2 7\n4 5\n4 6',
        failingOutput: '11',
        expectedOutput: '6',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    long long W;
    cin >> n >> W;
    vector<long long> wt(n);
    vector<int> val(n);
    int sumV = 0;
    for (int i = 0; i < n; i++) {
        cin >> wt[i] >> val[i];
        sumV += val[i];
    }
    vector<long long> dp(sumV + 1, INF);
    dp[0] = 0;
    for (int i = 0; i < n; i++) {
        for (int v = sumV; v >= val[i]; v--) {
            if (dp[v - val[i]] < INF) {
                dp[v] = min(dp[v], dp[v - val[i]] + wt[i]);
            }
        }
    }
    int ans = 0;
    for (int v = 0; v <= sumV; v++) {
        if (dp[v] < INF) ans = v;
    }
    cout << ans << '\\n';
    return 0;
}`,
        bugLine: 30,
        patches: [
          { text: 'dp[0] = INF;' },
          { text: 'for (int v = val[i]; v <= sumV; v++) {' },
          { text: 'if (dp[v] <= W) ans = v;' }
        ],
        correctPatch: 2,
        explain: 'Ở dòng 30, chỉ kiểm tra dp[v] &lt; INF sẽ chấp nhận cả các tổng giá trị có trọng lượng vượt quá sức chứa W (như dp[11] = 8 &gt; 7). Đổi thành if (dp[v] &lt;= W) ans = v; để chỉ nhận các cấu hình vừa túi!'
      },
      {
        id: 'dbg_l208_coin_comb2_backward',
        title: 'Duyệt Ngược Tổng Tiền Trong Bài Coin Combinations II (WA)',
        description: 'Đếm số TỔ HỢP xu tạo tổng S = 4 từ các đồng xu vô hạn {1, 2}. Đáp án đúng là 3 ({1,1,1,1}, {1,1,2}, {2,2}), nhưng code lại in ra 0!',
        failingInput: '2 4\n1 2',
        failingOutput: '0',
        expectedOutput: '3',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, S;
    cin >> n >> S;
    vector<int> coins(n);
    for (int i = 0; i < n; i++) cin >> coins[i];
    vector<long long> dp(S + 1, 0);
    dp[0] = 1;
    for (int c : coins) {
        for (int s = S; s >= c; s--) {
            dp[s] = (dp[s] + dp[s - c]) % MOD;
        }
    }
    cout << dp[S] << '\\n';
    return 0;
}`,
        bugLine: 16,
        patches: [
          { text: 'for (int s = c; s <= S; s++) {' },
          { text: 'dp[0] = 0;' },
          { text: 'dp[s] = (dp[s] * dp[s - c]) % MOD;' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 16, duyệt ngược s = S .. c biến bài toán thành 0/1 (chỉ được dùng mỗi đồng xu tối đa 1 lần nên từ {1, 2} chỉ tạo được tối đa tổng 3, ra dp[4] = 0). Vì mỗi mệnh giá xu có vô hạn đồng, phải đổi thành vòng lặp duyệt xuôi for (int s = c; s &lt;= S; s++) {'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — L2-08)
    // ============================================================================
    practiceProblems: [
      {
        id: 'CF-131C',
        title: '131C - The World is a Theatre',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/131/C',
        hint: 'Giới hạn $4 \\le n \\le 30$, $1 \\le m \\le 30$, $5 \\le t \\le n + m$, TL 2.0s, ML 256 MB. Dựng bảng Tam giác Pascal <code>C[61][61]</code> kiểu <code>long long</code> (không cần chia dư), rồi áp dụng Quy tắc Cộng và Quy tắc Nhân qua các số bạn nam $b \\ge 4$ sao cho số bạn nữ $g = t - b \\ge 1$ và $g \\le m$: $\\sum C[n][b] \\times C[m][t - b]$!'
      },
      {
        id: 'DP-D',
        title: 'D - Knapsack 1',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/dp/tasks/dp_d',
        hint: 'Giới hạn $1 \\le N \\le 100$, $1 \\le W \\le 10^5$, $1 \\le w_i \\le W$, $1 \\le v_i \\le 10^9$, TL 2.0s, ML 1024 MB. Khuôn mẫu Cái túi 0/1 chuẩn mực nhất: dùng <code>vector&lt;long long&gt; dp(W + 1, 0)</code> (bắt buộc <code>long long</code> vì tổng giá trị lên tới $10^{11}$!) và duyệt ngược <code>w = W</code> về <code>w_i</code>.'
      },
      {
        id: 'CSES-1635',
        title: 'Coin Combinations I',
        judge: 'CSES',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1635',
        hint: 'Giới hạn $1 \\le n \\le 100$, $1 \\le x \\le 10^6$, $1 \\le c_i \\le 10^6$, TL 1.00s, ML 512 MB, modulo $10^9 + 7$. Đếm số <strong>Hoán vị</strong> (có phân biệt thứ tự, <code>2+3</code> khác <code>3+2</code>): đặt vòng lặp NGOÀI chạy theo tổng <code>s = 1..x</code>, vòng lặp TRONG duyệt qua từng đồng xu <code>c</code>!'
      },
      {
        id: 'CSES-1636',
        title: 'Coin Combinations II',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1636',
        hint: 'Giới hạn $1 \\le n \\le 100$, $1 \\le x \\le 10^6$, $1 \\le c_i \\le 10^6$, TL 1.00s, ML 512 MB, modulo $10^9 + 7$. Đếm số <strong>Tổ hợp</strong> (không phân biệt thứ tự, <code>{2, 3}</code> chỉ tính $1$ lần): đảo vòng lặp NGOÀI thành duyệt từng đồng xu <code>c</code>, vòng lặp TRONG duyệt xuôi <code>s = c..x</code>!'
      },
      {
        id: 'CSES-1158',
        title: 'Book Shop',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1158',
        hint: 'Giới hạn $1 \\le n \\le 1000$, $1 \\le x \\le 10^5$, $1 \\le h_i, s_i \\le 1000$, TL 1.00s, ML 512 MB. Đây chính là 0/1 Knapsack với $n$ quyển sách (giá $h_i$, số trang $s_i$): nén xuống 1D duyệt ngược từ $x$ về $h_i$, và dùng <code>vector&lt;int&gt;</code> (tối đa $10^6$ trang nên vừa trong <code>int</code>) để chạy cực nhanh dưới 1 giây!'
      },
      {
        id: 'CSES-1745',
        title: 'Money Sums',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1745',
        hint: 'Giới hạn $1 \\le n \\le 100$, $1 \\le x_i \\le 1000$, TL 1.00s, ML 512 MB. Mỗi đồng xu chỉ có $1$ chiếc &rarr; bài toán 0/1 Knapsack kiểm tra tổng khả thi (<code>Subset Sum</code>): đặt <code>dp[0] = true</code>, duyệt ngược <code>s = sumMax</code> về <code>x_i</code>, nếu <code>dp[s - x_i]</code> đúng thì gán <code>dp[s] = true</code>, cuối cùng đếm và in tất cả các tổng <code>s &gt;= 1</code> có <code>dp[s] == true</code>!'
      },
      {
        id: 'DP-E',
        title: 'E - Knapsack 2',
        judge: 'AtCoder',
        tier: 3,
        link: 'https://atcoder.jp/contests/dp/tasks/dp_e',
        hint: 'Giới hạn $1 \\le N \\le 100$, $1 \\le W \\le 10^9$ (rất lớn!), $1 \\le v_i \\le 10^3$, TL 2.0s, ML 1024 MB. Không mở được mảng theo $W$: đổi sang trạng thái <code>dp[val]</code> là tổng trọng lượng nhỏ nhất để đạt giá trị <code>val</code> (tối đa $\\sum v_i \\le 10^5$), duyệt ngược theo <code>val</code>, rồi lấy <code>val</code> lớn nhất thỏa <code>dp[val] &lt;= W</code>!'
      },
      {
        id: 'CF-1633D',
        title: '1633D - Make Them Equal',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/1633/D',
        hint: 'Giới hạn $1 \\le n \\le 10^3$, $0 \\le k \\le 10^6$, $1 \\le b_i \\le 1000$, TL 2.0s, ML 256 MB. Tiền xử lý $1$ lần mảng <code>cost[1..1000]</code> (số phép biến đổi ít nhất từ $1$ tới $v$): thực tế <code>max(cost)</code> chỉ là $12$ bước! Sau đó co giới hạn sức chứa túi thành <code>cap = min(k, 12 * n)</code> và chạy 0/1 Knapsack với trọng lượng <code>cost[b[i]]</code>, giá trị <code>c[i]</code>!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
