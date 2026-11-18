/**
 * DỮ LIỆU BÀI GIẢNG L2-02: TÌM KIẾM NHỊ PHÂN & CHẶT NHỊ PHÂN ĐÁP ÁN
 * Tầng 2 — Pha 2 STL Lớp 9 (Nối tiếp từ L1-05..L1-07 & L2-01)
 * Mở khóa:
 * - Tìm kiếm nhị phân chuẩn while (l <= r), bất biến biên l = mid + 1 / r = mid - 1 chống lặp vô tận,
 *   công thức mid = l + (r - l) / 2 chống tràn số và khuôn mẫu biến ans tìm vị trí đầu tiên / cuối cùng.
 * - STL std::lower_bound (>= x) & std::upper_bound (> x), đổi iterator sang chỉ số (- a.begin()),
 *   kiểm tra an toàn != a.end() / != a.begin(), đếm tần suất / đoạn [L, R] và nhắc bẫy O(N) trên std::set.
 * - Chặt nhị phân trên tập đáp án (Binary Search on Answer): hàm đơn điệu bool check(mid) dạng FFFTTT & TTTFFF,
 *   đặt biên long long [low, high] chính xác và dừng sớm chống tràn long long trong check(mid).
 * Ranh giới tiền đề: KHÔNG dùng kiến thức chưa học (MOD-03 Hai con trỏ, L2-03 Stack/Queue, L2-04 Quay lui, L2-05 Tham lam, L2-06+ DP).
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'tim_kiem_nhi_phan',
    number: 'Bài Học L2-02',
    shortTitle: 'Tìm Kiếm Nhị Phân',
    title: 'Bài L2-02: Tìm Kiếm Nhị Phân & Chặt Nhị Phân Đáp Án',
    lead: 'Biến bài toán tra cứu $Q = 2 \\cdot 10^5$ truy vấn từ $O(Q \\cdot N)$ chậm chạp xuống $O((N + Q) \\log N)$ bằng Tìm kiếm nhị phân chuẩn <code>while (l &lt;= r)</code> và <code>lower_bound</code> / <code>upper_bound</code>, rồi bứt phá sang Chặt nhị phân đáp án để giải các bài tối ưu trên miền giá trị tới $10^{18}$ chỉ trong $\\approx 60$ bước.',
    modules: [
      // ============================================================================
      // MODULE 1: TÌM KIẾM NHỊ PHÂN CHUẨN & BẤT BIẾN BIÊN
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Nhị Phân Chuẩn & Biên',
        title: 'Vấn Đề Nhỏ 1: Tìm Kiếm Nhị Phân Chuẩn &amp; Bất Biến Biên (while l &lt;= r)',
        lead: 'Từ dò tuần tự mất $O(N)$ xuống chia đôi khoảng tìm kiếm chỉ còn $\\approx 18$ bước cho $2 \\cdot 10^5$ phần tử, nắm vững công thức chống tràn <code>mid = l + (r - l) / 2</code> và khuôn mẫu biến <code>ans</code> không bao giờ lặp vô tận.',
        subproblem: {
          title: 'Làm sao tìm nhanh một giá trị $x$ (hoặc vị trí đầu tiên / cuối cùng của $x$) trong dãy $N = 2 \\cdot 10^5$ số với $Q = 2 \\cdot 10^5$ truy vấn mà không bị TLE hay treo vòng lặp?',
          desc: 'Duyệt tuần tự từ đầu tới cuối tốn $O(Q \\cdot N) = 4 \\cdot 10^{10}$ phép so sánh (TLE hàng trăm giây!). Khi đã dùng <code>std::sort</code> (<code>L1-05</code>) đưa dãy về thứ tự tăng dần, ta có thể chặt đôi phạm vi tìm kiếm ở mỗi bước — nhưng phải giữ đúng bất biến biên để vòng lặp dừng chính xác và không tràn số.'
        },
        cards: [
          {
            heading: 'Từ Điển Giấy, Trò Chơi Đoán Số &amp; Quy Tắc Vàng while (l &lt;= r)',
            tag: 'O(N) &rarr; O(log N)',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tưởng tượng bạn chơi trò đoán một con số bí mật trong khoảng từ $1$ đến $1000$, mỗi lần đoán trọng tài chỉ đáp <em>"Nhỏ quá"</em>, <em>"Lớn quá"</em> hoặc <em>"Đúng rồi"</em>. Thay vì đoán lần lượt $1, 2, 3, \\dots$ ($1000$ lần), bạn luôn <strong>đoán ngay chính giữa</strong> ($500$)!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Nếu trọng tài bảo $500$ <em>"Lớn quá"</em>, mọi số từ $500$ đến $1000$ chắc chắn sai &rarr; bạn <strong>vứt bỏ hẳn một nửa đoạn tìm kiếm</strong> chỉ sau 1 câu hỏi! Cứ chia đôi liên tiếp, ngay cả với $N = 2 \\cdot 10^5$ phần tử ta cũng chỉ mất tối đa $\\lceil \\log_2(2 \\cdot 10^5) \\rceil \\approx 18$ bước!</li>
                  <li><strong>Điều kiện bắt buộc:</strong> Dãy số phải <strong>được sắp xếp tăng dần</strong> (bằng <code>sort</code> ở <code>L1-05</code>). Nếu dãy còn lộn xộn mà vứt một nửa đi, giá trị $x$ có thể đang nằm ngay trong nửa vừa bỏ!</li>
                  <li><strong>3 quy tắc chống bẫy kinh điển:</strong>
                    <ol style="margin: 4px 0 0 20px;">
                      <li>Luôn viết <code>while (l &lt;= r)</code> (nếu viết <code>l &lt; r</code> sẽ bỏ sót trường hợp đoạn còn đúng 1 phần tử <code>l == r</code>!).</li>
                      <li>Luôn loại bỏ hẳn <code>mid</code> đã xét bằng <code>l = mid + 1</code> và <code>r = mid - 1</code>: độ dài đoạn tìm kiếm giảm ngặt ở mọi bước nên <strong>không bao giờ lặp vô tận</strong>.</li>
                      <li>Viết <code>int mid = l + (r - l) / 2;</code> thay vì <code>(l + r) / 2</code> để khi <code>l, r</code> tới $1.5 \\cdot 10^9$ thì phép cộng không tràn ngưỡng $2^{31} - 1$ của <code>int</code>!</li>
                    </ol>
                  </li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Cài đặt Tìm kiếm nhị phân chuẩn C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int binarySearchExact(const vector&lt;int&gt;&amp; a, int x) {
    int l = 0, r = (int)a.size() - 1;
    while (l &lt;= r) {
        int mid = l + (r - l) / 2; // An toàn, không tràn int khi l, r lớn
        if (a[mid] == x) {
            return mid;
        }
        if (a[mid] &lt; x) {
            l = mid + 1; // Bỏ nửa trái [l..mid]
        } else {
            r = mid - 1; // Bỏ nửa phải [mid..r]
        }
    }
    return -1; // Không tìm thấy
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;int&gt; a = {40, 10, 25, 15, 50};
    sort(a.begin(), a.end()); // Bắt buộc sort trước: {10, 15, 25, 40, 50}

    cout &lt;&lt; "Vi tri cua 25: " &lt;&lt; binarySearchExact(a, 25) &lt;&lt; '\\n';
    cout &lt;&lt; "Vi tri cua 30: " &lt;&lt; binarySearchExact(a, 30) &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Tìm kiếm nhị phân (<code>Binary Search</code>):</strong> Thuật toán tìm kiếm bằng cách chia đôi không gian tìm kiếm $[l, r]$ sau mỗi lần so sánh phần tử giữa <code>mid</code>, đạt độ phức tạp $O(\\log N)$.</li>
                  <li><strong>Bất biến vòng lặp (<code>Loop Invariant</code>):</strong> Khẳng định luôn đúng ở đầu mỗi vòng lặp: nếu $x$ có mặt trong mảng thì $x$ chắc chắn nằm trong đoạn chỉ số đóng $[l, r]$.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Khuôn Mẫu Biến ans An Toàn: Tìm Vị Trí Đầu Tiên &amp; Cuối Cùng Khi Có Trùng Lặp',
            tag: 'Biên trùng lặp',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Trong danh sách điểm thi đã xếp tăng dần <code>{4, 7, 7, 7, 7, 9}</code>, thầy giáo hỏi: <em>"Học sinh ĐẦU TIÊN đạt $7$ điểm đứng ở chỉ số mấy?"</em> Nếu dùng hàm cơ bản ở trên, khi <code>mid</code> chạm ngay số $7$ ở giữa (chỉ số <code>2</code>), lệnh <code>return mid;</code> lập tức thoát ra và báo sai kết quả (đáng lẽ là chỉ số <code>1</code>)!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Mẹo cuốn sổ ghi nhận <code>ans</code>:</strong> Hãy giữ một biến <code>int ans = -1;</code> lưu kỷ lục tốt nhất hiện có. Khi thấy <code>a[mid] == x</code> (hoặc thỏa điều kiện đề bài), ta <strong>CHƯA thoát ngay</strong> mà ghi vào sổ <code>ans = mid;</code> rồi tiếp tục ép nửa tìm kiếm về phía tốt hơn:
                    <ul style="margin: 4px 0 0 20px;">
                      <li>Muốn tìm vị trí <strong>đầu tiên (nhỏ nhất)</strong>: lưu <code>ans = mid;</code> rồi gán <code>r = mid - 1;</code> để rà tiếp sang bên trái.</li>
                      <li>Muốn tìm vị trí <strong>cuối cùng (lớn nhất)</strong>: lưu <code>ans = mid;</code> rồi gán <code>l = mid + 1;</code> để rà tiếp sang bên phải.</li>
                    </ul>
                  </li>
                  <li>Khuôn mẫu <code>while (l &lt;= r)</code> + biến <code>ans</code> này dùng chung được cho mọi dạng bài tìm kiếm nhị phân từ cơ bản đến nâng cao mà không phải đánh vật với các kiểu <code>while (l &lt; r)</code> dễ sai biên!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Tìm vị trí đầu tiên và cuối cùng của x bằng biến ans</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int findFirst(const vector&lt;int&gt;&amp; a, int x) {
    int l = 0, r = (int)a.size() - 1, ans = -1;
    while (l &lt;= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) {
            ans = mid;   // Ghi nhận ứng viên rồi tiếp tục tìm sang trái
            r = mid - 1;
        } else if (a[mid] &lt; x) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return ans;
}

int findLast(const vector&lt;int&gt;&amp; a, int x) {
    int l = 0, r = (int)a.size() - 1, ans = -1;
    while (l &lt;= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) {
            ans = mid;   // Ghi nhận ứng viên rồi tiếp tục tìm sang phải
            l = mid + 1;
        } else if (a[mid] &lt; x) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;int&gt; a = {4, 7, 7, 7, 7, 9};
    int L = findFirst(a, 7), R = findLast(a, 7);
    cout &lt;&lt; "Dau = " &lt;&lt; L &lt;&lt; ", Cuoi = " &lt;&lt; R &lt;&lt; ", So luong = " &lt;&lt; (R - L + 1) &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Khuôn mẫu lưu <code>ans</code> (<code>Answer-Tracking Pattern</code>):</strong> Ghi lại vị trí <code>mid</code> vừa tìm thấy vào biến tạm <code>ans</code> rồi ép <code>r = mid - 1</code> hoặc <code>l = mid + 1</code> để tìm tiếp phần tử cực trị hơn, giữ cho <code>while (l &lt;= r)</code> luôn an toàn.</li>
                  <li><strong>Vị trí đầu tiên / cuối cùng (<code>First / Last Occurrence</code>):</strong> Hai đầu mút của khối phần tử trùng nhau trong dãy đã sắp xếp; nếu tồn tại, số lần xuất hiện của $x$ bằng <code>last - first + 1</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_while_bound',
            title: 'Phòng Thí Nghiệm 1A: Lỗi Viết while (l &lt; r) Làm Sót Phần Tử Cuối Khi l == r',
            desc: 'Tìm số 16 trong mảng đã sắp xếp {2, 5, 8, 12, 16} (vị trí đúng là chỉ số 4). Thử chuyển công tắc giữa while (l &lt;= r) và while (l &lt; r) để xem bước cuối cùng khi đoạn tìm kiếm thu về còn đúng 1 ô!',
            toggles: [
              {
                key: 'loopCond',
                label: 'Điều kiện vòng lặp while',
                options: [
                  { value: 'le', text: 'while (l &lt;= r) — Xét cả khi l == r (AC)', kind: 'ok' },
                  { value: 'lt', text: 'while (l &lt; r) — Thoát sớm khi l == r (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.loopCond === 'le';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {2, 5, 8, 12, 16};
    int l = 0, r = 4, ans = -1, x = 16;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) { ans = mid; break; }
        if (a[mid] < x) l = mid + 1;
        else r = mid - 1;
    }
    cout << ans << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {2, 5, 8, 12, 16};
    int l = 0, r = 4, ans = -1, x = 16;
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) { ans = mid; break; }
        if (a[mid] < x) l = mid + 1;
        else r = mid - 1;
    }
    cout << ans << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [9],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Khi l == 4 và r == 4, vòng lặp vẫn chạy thêm 1 lượt để kiểm tra a[4] = 16 và in ra 4!'
                  : 'SAI THUẬT TOÁN (WA): Khi thu hẹp về l == 4 và r == 4, điều kiện l &lt; r sai nên thoát vòng lặp luôn và in ra -1!',
                predictions: [
                  { text: 'Khi l và r cùng chạm chỉ số 4, vòng lặp vẫn kiểm tra a[4] = 16 và in đúng 4' },
                  { text: 'Khi l và r cùng chạm chỉ số 4, vòng lặp bỏ qua phần tử cuối và in sai -1' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n4'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n-1',
                explain: isOk
                  ? 'Với [l, r] là đoạn ĐÓNG (cả l lẫn r đều chưa bị loại), khi l == r đoạn vẫn còn đúng 1 phần tử là a[l]. Dùng while (l &lt;= r) đảm bảo phần tử cuối cùng đó luôn được kiểm tra.'
                  : 'Ở bước 1: mid = 2 (a[2]=8 &lt; 16) &rarr; l = 3. Ở bước 2: mid = 3 (a[3]=12 &lt; 16) &rarr; l = 4. Lúc này l = 4, r = 4: vì viết while (l &lt; r) nên máy tính thoát ngay mà chưa hề kiểm tra a[4]!'
              };
            }
          },
          {
            id: 'sb_first_occ',
            title: 'Phòng Thí Nghiệm 1B: Thoát Sớm return mid vs Khuôn Mẫu ans Khi Có Số Trùng Nhau',
            desc: 'Cho mảng {2, 5, 5, 5, 5, 9}, cần tìm chỉ số ĐẦU TIÊN của số 5 (đáp án đúng là 1). Đổi công tắc để thấy hậu quả khi dừng ngay lúc mới chạm số 5 ở giữa!',
            toggles: [
              {
                key: 'dupMode',
                label: 'Cách xử lý khi gặp a[mid] == x',
                options: [
                  { value: 'ans_left', text: 'ans = mid; r = mid - 1; — Ép tìm sang trái (AC)', kind: 'ok' },
                  { value: 'stop_early', text: 'ans = mid; break; — Dừng ngay khi gặp (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.dupMode === 'ans_left';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {2, 5, 5, 5, 5, 9};
    int l = 0, r = 5, ans = -1, x = 5;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) { ans = mid; r = mid - 1; }
        else if (a[mid] < x) l = mid + 1;
        else r = mid - 1;
    }
    cout << ans << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {2, 5, 5, 5, 5, 9};
    int l = 0, r = 5, ans = -1, x = 5;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) { ans = mid; break; }
        else if (a[mid] < x) l = mid + 1;
        else r = mid - 1;
    }
    cout << ans << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [11],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Ghi nhận mid = 2 rồi tiếp tục rà sang trái nên tìm đúng chỉ số đầu tiên bằng 1!'
                  : 'SAI THUẬT TOÁN (WA): Chạm số 5 ở mid = 2 liền thoát sớm nên bỏ lỡ số 5 ở chỉ số 1!',
                predictions: [
                  { text: 'Chương trình ghi nhớ ans rồi tìm tiếp sang trái nên in đúng chỉ số đầu tiên là 1' },
                  { text: 'Chương trình thoát ngay khi vừa gặp a[2] == 5 nên in sai chỉ số ở giữa là 2' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n2',
                explain: isOk
                  ? 'Tại bước 1, mid = 2 có a[2] = 5 &rarr; lưu ans = 2 và gán r = 1. Bước 2: mid = 0 (a[0] = 2 &lt; 5) &rarr; l = 1. Bước 3: mid = 1 (a[1] = 5) &rarr; cập nhật ans = 1, r = 0 và dừng. Trả về đúng 1.'
                  : 'Lệnh break thoát ngay ở vòng lặp đầu tiên khi mid = (0 + 5) / 2 = 2, không hề kiểm tra xem phía bên trái (chỉ số 1) có còn số 5 nào nữa hay không.'
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
    vector<int> a = {3, 7, 7, 7, 12, 18};
    int l = 0, r = 5, ans = -1, x = 7;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) {
            ans = mid;
            r = mid - 1;
        } else if (a[mid] < x) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    cout << ans << ' ' << l << ' ' << r << '\\n';
    return 0;
}`,
            q: 'Theo dõi đoạn code tìm vị trí đầu tiên của <code>x = 7</code> trên dãy <code>a = {3, 7, 7, 7, 12, 18}</code>. Ba số in ra màn hình là gì?',
            options: [
              'In ra 2 1 0 vì sau khi gặp số 7 ở chỉ số 2 vòng lặp gán r = mid - 1 rồi dừng ngay',
              'In ra 3 2 1 vì vòng lặp dịch sang bên phải tìm phần tử 7 nằm ở vị trí cuối cùng',
              'In ra 1 1 0 vì sau khi gặp 7 ở chỉ số 2 vòng lặp tiếp tục thu hẹp sang trái về 1',
              'In ra 1 0 1 vì ở bước cuối cùng biên l bị giảm xuống 0 còn biên r giữ nguyên ở 1'
            ],
            correct: 2,
            explain: 'Bước 1: l=0, r=5 &rarr; mid=2 (a[2]=7) &rarr; ans=2, r=1. Bước 2: l=0, r=1 &rarr; mid=0 (a[0]=3 &lt; 7) &rarr; l=1. Bước 3: l=1, r=1 &rarr; mid=1 (a[1]=7) &rarr; ans=1, r=0. Lúc này l=1 &gt; r=0 nên dừng và in ra: 1 1 0.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {4, 9, 15, 22, 30};
    int l = 0, r = 4, steps = 0, ans = -1, x = 14;
    while (l <= r) {
        steps++;
        int mid = l + (r - l) / 2;
        if (a[mid] >= x) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    cout << ans << ' ' << steps << '\\n';
    return 0;
}`,
            q: 'Đoạn code trên tìm chỉ số đầu tiên thỏa <code>a[mid] &gt;= 14</code> và đếm số vòng lặp <code>steps</code>. Kết quả in ra là gì?',
            options: [
              'In ra 2 3 vì vòng lặp chạy đúng 3 lần và lưu được phần tử đầu tiên &gt;= 14 ở chỉ số 2',
              'In ra 1 3 vì vòng lặp chạy đúng 3 lần và dừng lại ở phần tử cuối cùng &lt; 14 là 9',
              'In ra 2 2 vì ở bước 2 chỉ số mid = 0 nhỏ hơn 14 nên vòng lặp thoát ra ngay lập tức',
              'In ra -1 3 vì mảng không chứa giá trị đúng bằng 14 nên biến ans giữ nguyên là -1'
            ],
            correct: 0,
            explain: 'Bước 1: l=0, r=4 &rarr; steps=1, mid=2 (15 &gt;= 14) &rarr; ans=2, r=1. Bước 2: l=0, r=1 &rarr; steps=2, mid=0 (4 &lt; 14) &rarr; l=1. Bước 3: l=1, r=1 &rarr; steps=3, mid=1 (9 &lt; 14) &rarr; l=2. Dừng và in ra: 2 3.'
          },
          {
            type: 'single',
            q: 'Khi cài đặt tìm kiếm nhị phân bằng kiểu <code>int</code> trên không gian chỉ số lớn (tới $2 \\cdot 10^9$), vì sao ta viết <code>int mid = l + (r - l) / 2;</code> thay vì <code>(l + r) / 2</code>?',
            options: [
              'Vì công thức mới luôn làm tròn lên trên giúp không bỏ sót phần tử nằm bên phải',
              'Vì phép trừ trong C++ chạy nhanh hơn đáng kể so với phép cộng hai số nguyên int',
              'Vì công thức cũ không thể sử dụng được khi hai biến l và r đều là số nguyên chẵn',
              'Vì tổng l + r có thể vượt ngưỡng 2^31 - 1 gây tràn số int trước khi kịp chia cho 2'
            ],
            correct: 3,
            explain: 'Khi l = 1.5*10^9 và r = 2*10^9, tổng l + r = 3.5*10^9 vượt quá giới hạn tối đa ~2.14*10^9 của kiểu int 32-bit, làm tràn thành số âm trước khi chia 2. Viết l + (r - l) / 2 giữ mọi phép tính trung gian nằm gọn trong phạm vi an toàn.'
          },
          {
            type: 'multiple',
            q: 'Những nhận xét nào sau đây là <strong>ĐÚNG</strong> về vòng lặp tìm kiếm nhị phân chuẩn <code>while (l &lt;= r)</code>?',
            options: [
              'Dãy dữ liệu đầu vào bắt buộc phải có tính thứ tự (ví dụ đã sort tăng dần) trước khi tìm kiếm',
              'Có thể gán thẳng r = mid trong vòng while (l &lt;= r) mà không bao giờ gặp lỗi lặp vô tận',
              'Cập nhật l = mid + 1 và r = mid - 1 đảm bảo độ dài đoạn [l, r] luôn giảm ngặt ở mọi bước',
              'Muốn tìm vị trí đầu tiên thỏa điều kiện trên dãy trùng lặp, ta lưu ans = mid rồi gán r = mid - 1'
            ],
            correct: [0, 2, 3],
            explain: 'A, C và D đều đúng. B sai hoàn toàn vì khi l == r, mid cũng bằng r nên gán r = mid không làm giảm độ dài đoạn [l, r], khiến vòng while (l &lt;= r) lặp vô tận (TLE)!'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: LOWER_BOUND & UPPER_BOUND TRONG STL
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'lower & upper_bound',
        title: 'Vấn Đề Nhỏ 2: <code>lower_bound</code> &amp; <code>upper_bound</code> Trong STL',
        lead: 'Thay thế vòng lặp viết tay bằng 2 hàm chuẩn $O(\\log N)$ trên <code>vector</code> đã <code>sort</code>, chuyển iterator về chỉ số, bảo vệ ranh giới <code>a.end()</code> / <code>a.begin()</code> và tránh bẫy $O(N)$ TLE trên <code>std::set</code>.',
        subproblem: {
          title: 'Làm sao tìm nhanh vị trí $\\ge x$, vị trí $&gt; x$, đếm số phần tử bằng $x$ hoặc nằm trong đoạn $[L, R]$ trên mảng đã sắp xếp chỉ bằng 1 dòng code mà không bị nhầm dấu hay lỗi bộ nhớ?',
          desc: 'Tự viết nhiều hàm tìm kiếm nhị phân cho từng kiểu điều kiện rất dễ sai sót dấu <code>&lt;=</code> / <code>&lt;</code>. Thư viện STL C++ cung cấp sẵn <code>lower_bound</code> và <code>upper_bound</code> đạt chuẩn $O(\\log N)$, nhưng đòi hỏi nắm chắc ý nghĩa ranh giới và cách kiểm tra <code>a.end()</code>.'
        },
        cards: [
          {
            heading: 'Thủ Thư Kệ Sách: Phân Biệt lower_bound (&gt;= x), upper_bound (&gt; x) &amp; Kiểm Tra Biên',
            tag: 'Iterator &amp; Chỉ số',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tưởng tượng một kệ sách xếp chiều cao tăng dần: <code>{10, 20, 20, 20, 35, 50}</code> (chỉ số <code>0..5</code>). Khi bạn muốn tìm chỗ cho một cuốn sách cao <code>x = 20</code> cm:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>lower_bound(a.begin(), a.end(), 20)</code>:</strong> Trả về tấm thẻ đánh dấu <strong>cuốn sách ĐẦU TIÊN cao $\\ge 20$</strong> &rarr; đứng ở chỉ số <code>1</code> (cuốn <code>20</code> đầu tiên). Đây là chỗ đứng <em>trái nhất</em> giữ kệ vẫn tăng dần!</li>
                  <li><strong><code>upper_bound(a.begin(), a.end(), 20)</code>:</strong> Trả về tấm thẻ đánh dấu <strong>cuốn sách ĐẦU TIÊN cao hẳn $&gt; 20$</strong> &rarr; đứng ở chỉ số <code>4</code> (cuốn <code>35</code>). Đây là chỗ đứng ngay sau cả nhóm cuốn <code>20</code>!</li>
                  <li><strong>3 quy tắc sử dụng không bao giờ gặp tai nạn:</strong>
                    <ol style="margin: 4px 0 0 20px;">
                      <li><strong>Đổi địa chỉ (iterator) về chỉ số mảng:</strong> Lấy <code>int idx = it - a.begin();</code>.</li>
                      <li><strong>Bẫy đọc lố <code>a.end()</code>:</strong> Nếu mọi phần tử đều nhỏ hơn <code>x</code> (như tìm <code>100</code>), hàm trả về vạch cuối <code>a.end()</code> (chỉ số <code>n</code>, <strong>không chứa dữ liệu thật</strong>!). Phải kiểm tra <code>if (it != a.end())</code> trước khi đọc giá trị <code>*it</code>!</li>
                      <li><strong>Tìm phần tử LỚN NHẤT $\\le x$:</strong> Gọi <code>auto it = upper_bound(a.begin(), a.end(), x);</code>. Mọi phần tử đứng <strong>trước</strong> <code>it</code> đều $\\le x$, nên nếu <code>it != a.begin()</code> thì lùi 1 bước <code>--it;</code> sẽ trỏ đúng vào số lớn nhất $\\le x$!</li>
                    </ol>
                  </li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Dùng lower_bound / upper_bound và kiểm tra an toàn</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;int&gt; a = {10, 20, 20, 20, 35, 50};

    auto it1 = lower_bound(a.begin(), a.end(), 20); // vị trí 1 (giá trị 20)
    auto it2 = upper_bound(a.begin(), a.end(), 20); // vị trí 4 (giá trị 35)
    cout &lt;&lt; "idx &gt;= 20: " &lt;&lt; (it1 - a.begin()) &lt;&lt; ", idx &gt; 20: " &lt;&lt; (it2 - a.begin()) &lt;&lt; '\\n';

    // Kiểm tra an toàn != a.end() trước khi đọc *it
    auto itBig = lower_bound(a.begin(), a.end(), 100);
    if (itBig != a.end()) {
        cout &lt;&lt; *itBig &lt;&lt; '\\n';
    } else {
        cout &lt;&lt; "Khong co phan tu &gt;= 100\\n";
    }

    // Tìm phần tử lớn nhất &lt;= 25: lấy upper_bound(25) rồi lùi 1 bước nếu khác begin()
    auto itLe = upper_bound(a.begin(), a.end(), 25);
    if (itLe != a.begin()) {
        --itLe;
        cout &lt;&lt; "Lon nhat &lt;= 25 la: " &lt;&lt; *itLe &lt;&lt; '\\n'; // In ra 20
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>std::lower_bound(first, last, x)</code>:</strong> Trả về iterator đầu tiên trỏ tới phần tử thỏa mãn <code>*it &gt;= x</code>, hoặc <code>last</code> nếu không có phần tử nào $\\ge x$.</li>
                  <li><strong><code>std::upper_bound(first, last, x)</code>:</strong> Trả về iterator đầu tiên trỏ tới phần tử thỏa mãn <code>*it &gt; x</code>, hoặc <code>last</code> nếu không có phần tử nào $&gt; x$.</li>
                  <li><strong>Mốc kết thúc <code>a.end()</code> (<code>Past-the-end Iterator</code>):</strong> Vị trí ảo ngay sau phần tử cuối cùng <code>a[n - 1]</code>, dùng để báo hiệu "vượt ra ngoài mảng" và tuyệt đối không được đọc <code>*a.end()</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Đếm Tần Suất, Đếm Đoạn [L, R] &amp; Bẫy O(N) TLE Trên std::set (Nhắc Lại L1-06)',
            tag: 'Đếm nhanh &amp; Bẫy STL',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Từ hai mốc <code>lower_bound</code> (đầu nhóm $\\ge$) và <code>upper_bound</code> (ngay sau nhóm $\\le$), ta có hàng loạt công thức đếm chỉ tốn $O(\\log N)$ trên mảng đã sắp xếp:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Đếm số lượng phần tử nhỏ hơn hoặc bằng $x$:</strong> <code>upper_bound(a.begin(), a.end(), x) - a.begin()</code>.</li>
                  <li><strong>Đếm số lần xuất hiện của $x$:</strong> <code>upper_bound(a.begin(), a.end(), x) - lower_bound(a.begin(), a.end(), x)</code>. Ngay cả khi $x$ không tồn tại trong mảng, cả hai hàm trỏ cùng một vị trí nên hiệu tự động ra $0$!</li>
                  <li><strong>Đếm số phần tử nằm trong đoạn giá trị $[L, R]$:</strong> <code>upper_bound(a.begin(), a.end(), R) - lower_bound(a.begin(), a.end(), L)</code>.</li>
                  <li><strong>CẢNH BÁO ĐỎ TỪ <code>L1-06</code> (Bẫy <code>std::set</code> / <code>std::multiset</code>):</strong> Với <code>vector</code>, các ô nằm liền nhau trên RAM nên <code>std::lower_bound(v.begin(), v.end(), x)</code> nhảy cóc tới giữa mảng trong $O(1)$ và đạt $O(\\log N)$. Nhưng trên <code>set</code> / <code>multiset</code> / <code>map</code>, các nút nằm rải rác: hàm toàn cục <code>std::lower_bound(s.begin(), s.end(), x)</code> phải <strong>đi bộ từng bước một mất $O(N)$</strong> ($\\rightarrow$ $Q$ truy vấn bị <strong>TLE!</strong>). Luôn gọi phương thức riêng <strong><code>s.lower_bound(x)</code></strong> và <strong><code>s.upper_bound(x)</code></strong> để chạy đúng $O(\\log N)$!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Đếm tần suất, đếm đoạn [L, R] và cú pháp chuẩn trên std::set</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;int&gt; a = {5, 12, 12, 12, 19, 25, 30};
    int cnt12 = (int)(upper_bound(a.begin(), a.end(), 12) - lower_bound(a.begin(), a.end(), 12));
    int cntRange = (int)(upper_bound(a.begin(), a.end(), 25) - lower_bound(a.begin(), a.end(), 10));
    cout &lt;&lt; "So lan 12 xuat hien: " &lt;&lt; cnt12 &lt;&lt; '\\n';
    cout &lt;&lt; "So phan tu trong [10, 25]: " &lt;&lt; cntRange &lt;&lt; '\\n';

    // Trên set/multiset: LUÔN gọi s.lower_bound(x), KHÔNG gọi lower_bound(s.begin(), s.end(), x)!
    multiset&lt;int&gt; ms = {10, 20, 20, 35};
    auto itSet = ms.upper_bound(20); // O(log N) chuẩn!
    if (itSet != ms.begin()) {
        --itSet;
        cout &lt;&lt; "Lon nhat &lt;= 20 trong multiset: " &lt;&lt; *itSet &lt;&lt; '\\n';
        ms.erase(itSet); // Chỉ xóa đúng 1 bản sao 20 (nhớ từ L1-06)
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Nửa khoảng <code>[first, last)</code>:</strong> Mọi thuật toán STL nhận cặp iterator <code>[a.begin(), a.end())</code> và trả về số phần tử nằm giữa hai iterator qua phép trừ <code>it2 - it1</code> trên <code>vector</code>.</li>
                  <li><strong><code>Random Access Iterator</code> vs <code>Bidirectional Iterator</code>:</strong> Iterator của <code>vector</code> nhảy thẳng được $k$ bước (<code>it + k</code>) nên <code>std::lower_bound</code> chạy $O(\\log N)$; iterator của <code>set</code>/<code>map</code> chỉ tiến lùi từng bước (<code>++it</code> / <code>--it</code>) nên phải dùng hàm thành viên <code>s.lower_bound(x)</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_lb_vs_ub',
            title: 'Phòng Thí Nghiệm 2A: Đếm Số Phần Tử &lt;= x Bằng upper_bound vs lower_bound',
            desc: 'Cho mảng đã sắp xếp {10, 20, 20, 30, 40}, cần đếm xem có bao nhiêu số &lt;= 20 (đáp án đúng: 3 số là 10, 20, 20). Đổi công tắc để thấy hậu quả khi dùng nhầm lower_bound thay cho upper_bound!',
            toggles: [
              {
                key: 'boundFn',
                label: 'Hàm STL sử dụng để đếm &lt;= x',
                options: [
                  { value: 'ub', text: 'upper_bound - a.begin() — Lấy hết cả các số == x (AC)', kind: 'ok' },
                  { value: 'lb', text: 'lower_bound - a.begin() — Dừng trước số x (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.boundFn === 'ub';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {10, 20, 20, 30, 40};
    int x = 20;
    int cnt = (int)(upper_bound(a.begin(), a.end(), x) - a.begin());
    cout << cnt << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {10, 20, 20, 30, 40};
    int x = 20;
    int cnt = (int)(lower_bound(a.begin(), a.end(), x) - a.begin());
    cout << cnt << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [9],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): upper_bound(20) trỏ tới 30 (chỉ số 3), nên đếm đủ 3 phần tử &lt;= 20!'
                  : 'SAI THUẬT TOÁN (WA): lower_bound(20) dừng ngay tại số 20 đầu tiên (chỉ số 1), bỏ sót toàn bộ các số == 20!',
                predictions: [
                  { text: 'Hàm upper_bound nhảy qua cả hai số 20 tới chỉ số 3 và in đúng số lượng bằng 3' },
                  { text: 'Hàm lower_bound dừng ngay ở số 20 đầu tiên tại chỉ số 1 nên chỉ đếm được 1' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n3'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n1',
                explain: isOk
                  ? 'upper_bound(20) tìm phần tử đầu tiên &gt; 20 (tức 30 ở chỉ số 3). Tất cả phần tử có chỉ số 0, 1, 2 đứng trước vị trí đó đều &lt;= 20, nên số lượng đúng là 3.'
                  : 'lower_bound(20) tìm phần tử đầu tiên &gt;= 20, nên nó dừng ngay ở a[1] = 20. Hiệu lower_bound - a.begin() chỉ đếm số phần tử NHỎ HƠN HẲN 20 (&lt; 20) chứ không phải &lt;= 20!'
              };
            }
          },
          {
            id: 'sb_max_le',
            title: 'Phòng Thí Nghiệm 2B: Tìm Số Lớn Nhất &lt;= x Bằng --upper_bound vs lower_bound',
            desc: 'Trong danh sách giá vé {10, 20, 30, 40}, khách có 25 đồng muốn mua vé đắt nhất không vượt quá 25 (đáp án đúng: 20). Thử đổi công tắc xem chuyện gì xảy ra nếu dùng nhầm lower_bound!',
            toggles: [
              {
                key: 'searchWay',
                label: 'Cách tìm phần tử lớn nhất &lt;= 25',
                options: [
                  { value: 'ub_prev', text: 'upper_bound(25) rồi kiểm tra != begin() để --it (AC)', kind: 'ok' },
                  { value: 'lb_direct', text: 'Dùng thẳng *lower_bound(25) (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.searchWay === 'ub_prev';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {10, 20, 30, 40};
    int budget = 25;
    auto it = upper_bound(a.begin(), a.end(), budget);
    if (it != a.begin()) { --it; cout << *it << '\\n'; }
    else cout << -1 << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {10, 20, 30, 40};
    int budget = 25;
    auto it = lower_bound(a.begin(), a.end(), budget);
    if (it != a.end()) cout << *it << '\\n';
    else cout << -1 << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [9, 10],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): upper_bound(25) trỏ số 30, lùi --it về đúng vé 20 (lớn nhất &lt;= 25)!'
                  : 'SAI THUẬT TOÁN (WA): lower_bound(25) tìm số &gt;= 25 nên bốc ngay vé 30 vượt quá số tiền 25!',
                predictions: [
                  { text: 'Chương trình lùi 1 bước từ upper_bound(25) về đúng giá vé hợp lệ là 20' },
                  { text: 'Chương trình bốc nhầm giá vé đầu tiên &gt;= 25 là 30, vượt quá số tiền 25' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n20'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n30',
                explain: isOk
                  ? 'upper_bound(25) tìm phần tử đầu tiên &gt; 25 là 30. Nếu it khác a.begin(), phần tử ngay trước nó (--it) chắc chắn &lt;= 25 và là lớn nhất thỏa mãn.'
                  : 'lower_bound(25) luôn tìm phần tử &gt;= 25. Khi mảng không có số 25, nó nhảy vọt lên số lớn hơn tiếp theo là 30!'
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
    vector<int> a = {10, 20, 20, 20, 35, 50};
    int p1 = (int)(lower_bound(a.begin(), a.end(), 20) - a.begin());
    int p2 = (int)(upper_bound(a.begin(), a.end(), 20) - a.begin());
    int cnt = (int)(upper_bound(a.begin(), a.end(), 35) - lower_bound(a.begin(), a.end(), 15));
    cout << p1 << ' ' << p2 << ' ' << cnt << '\\n';
    return 0;
}`,
            q: 'Cho mảng <code>a = {10, 20, 20, 20, 35, 50}</code>. Sau khi chạy 3 phép tra cứu STL trên, kết quả in ra màn hình là gì?',
            options: [
              'In ra 1 3 4 vì upper_bound(20) trả về vị trí của số 20 cuối cùng tại chỉ số 3',
              'In ra 1 4 4 vì p1 trỏ số 20 đầu tiên, p2 trỏ số 35, và có 4 số trong đoạn [15, 35]',
              'In ra 1 4 3 vì phép trừ hai iterator ở biến cnt không tính phần tử biên phải là 35',
              'In ra 2 4 4 vì lower_bound(20) bỏ qua phần tử đầu bằng 20 tại chỉ số 1 để sang 2'
            ],
            correct: 1,
            explain: 'lower_bound(20) trỏ chỉ số 1 (giá trị 20 đầu tiên). upper_bound(20) trỏ chỉ số 4 (giá trị 35 &gt; 20). Với đoạn [15, 35]: lower_bound(15) tại chỉ số 1, upper_bound(35) tại chỉ số 5 (giá trị 50), nên cnt = 5 - 1 = 4 (gồm 20, 20, 20, 35). In ra: 1 4 4.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {5, 12, 18, 25};
    auto it1 = upper_bound(a.begin(), a.end(), 18);
    auto it2 = lower_bound(a.begin(), a.end(), 30);
    int x1 = (it1 == a.begin()) ? -1 : *(--it1);
    int x2 = (it2 == a.end()) ? -1 : *it2;
    cout << x1 << ' ' << x2 << '\\n';
    return 0;
}`,
            q: 'Theo dõi đoạn code kiểm tra ranh giới <code>a.begin()</code> và <code>a.end()</code> trên <code>a = {5, 12, 18, 25}</code>. Hai giá trị in ra là gì?',
            options: [
              'In ra 25 -1 vì upper_bound(18) trỏ tới 25 còn it2 trỏ tới cuối mảng a.end()',
              'In ra 18 25 vì khi không có số &gt;= 30 thì lower_bound trả về phần tử cuối là 25',
              'In ra 12 -1 vì phép --it1 lùi qua hẳn giá trị 18 để xuống phần tử nhỏ hơn hẳn 12',
              'In ra 18 -1 vì --it1 lùi từ 25 về 18, còn it2 chạm a.end() nên nhánh trả về -1'
            ],
            correct: 3,
            explain: 'upper_bound(18) trỏ phần tử &gt; 18 là 25 (khác begin()), nên --it1 lùi về 18 (x1 = 18). Mọi phần tử trong mảng đều &lt; 30 nên lower_bound(30) trả về a.end(), suy ra x2 = -1. Kết quả: 18 -1.'
          },
          {
            type: 'single',
            q: 'Cho một tập hợp <code>set&lt;int&gt; s</code> chứa $10^5$ phần tử và $10^5$ truy vấn tìm số đầu tiên $\\ge x$. Lệnh nào dưới đây chạy đúng $O(\\log N)$ mỗi truy vấn để đạt AC?',
            options: [
              'Gọi phương thức s.lower_bound(x) để tận dụng cấu trúc cây tìm kiếm cân bằng của set',
              'Gọi hàm toàn cục std::lower_bound(s.begin(), s.end(), x) tương tự như trên vector',
              'Gọi hàm std::upper_bound(s.begin(), s.end(), x - 1) vì bản chất tương đương &gt;= x',
              'Sao chép toàn bộ set ra vector mới ở mỗi truy vấn rồi gọi std::lower_bound(v...)'
            ],
            correct: 0,
            explain: 'Iterator của set không nhảy cóc O(1) như vector, nên std::lower_bound(s.begin(), s.end(), x) và std::upper_bound(s.begin(), ...) phải đi bộ tuần tự O(N) gây TLE! Phải gọi phương thức s.lower_bound(x) trên cây để đạt O(log N).'
          },
          {
            type: 'multiple',
            q: 'Với mảng <code>vector&lt;int&gt; a</code> đã sắp xếp tăng dần, những biểu thức nào sau đây luôn cho kết quả <strong>ĐÚNG</strong> về mặt thuật toán và an toàn bộ nhớ?',
            options: [
              'Số lần x xuất hiện trong mảng bằng upper_bound(a.begin(), a.end(), x) - lower_bound(a.begin(), a.end(), x)',
              'Số phần tử có giá trị nhỏ hơn hoặc bằng x bằng upper_bound(a.begin(), a.end(), x) - a.begin()',
              'Luôn có thể đọc ngay giá trị *lower_bound(a.begin(), a.end(), x) mà không cần kiểm tra khác a.end()',
              'Để tìm số lớn nhất &lt; x, lấy auto it = lower_bound(a.begin(), a.end(), x); và lùi --it nếu it != a.begin()'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D đều đúng (chú ý ở D: lower_bound(x) trỏ vào phần tử đầu tiên &gt;= x, nên ngay trước nó chắc chắn là phần tử lớn nhất &lt; x). C sai vì nếu x lớn hơn mọi phần tử thì it == a.end(), đọc *it gây truy cập ngoài mảng!'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: CHẶT NHỊ PHÂN TRÊN TẬP ĐÁP ÁN (BINARY SEARCH ON ANSWER)
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Chặt Nhị Phân Đáp Án',
        title: 'Vấn Đề Nhỏ 3: Chặt Nhị Phân Trên Tập Đáp Án (Binary Search on Answer)',
        lead: 'Khi đề bài không cho sẵn mảng để tìm mà hỏi giá trị tối ưu nhỏ nhất / lớn nhất trên miền $1 \\dots 10^{18}$, ta biến bài toán thành hàm đơn điệu <code>bool check(mid)</code> dạng <code>FFFTTT</code> hoặc <code>TTTFFF</code> và khóa chặt bẫy tràn số <code>long long</code>.',
        subproblem: {
          title: 'Có $N = 2 \\cdot 10^5$ máy in (mỗi máy làm 1 sản phẩm mất $k_i \\le 10^9$ giây). Cần làm đủ $T = 10^9$ sản phẩm trong thời gian NHỎ NHẤT — tìm đáp án tới $10^{18}$ thế nào khi không có mảng dữ liệu đã sort?',
          desc: 'Duyệt từng giây $1, 2, 3, \\dots, 10^{18}$ là điều không tưởng ($10^{23}$ phép tính!). Nhưng nếu ta hỏi ngược: <em>"Cho trước đúng <code>mid</code> giây, các máy có làm kịp $T$ sản phẩm không?"</em> thì câu trả lời chỉ có Đúng hoặc Sai và mang tính đơn điệu tuyệt đối: chỉ cần $\\approx 60$ lần chặt đôi!'
        },
        cards: [
          {
            heading: 'Hàm Đơn Điệu check(mid) &amp; Hai Dáng Kinh Điển FFFTTT / TTTFFF',
            tag: 'Tư duy đảo ngược',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Thay vì tìm thẳng con số tối ưu bí ẩn, hãy <strong>đoán thử một ứng viên <code>mid</code></strong> rồi kiểm tra xem nó có hợp lệ không bằng hàm <code>bool check(mid)</code>!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Quan sát tính đơn điệu:</strong> Trong bài <em>Factory Machines</em> (3 máy mất <code>{3, 2, 5}</code> giây/sản phẩm, cần $7$ sản phẩm):
                    <ul style="margin: 4px 0 0 20px;">
                      <li>Nếu <code>mid = 7</code> giây: làm được $\\lfloor 7/3 \\rfloor + \\lfloor 7/2 \\rfloor + \\lfloor 7/5 \\rfloor = 2 + 3 + 1 = 6 &lt; 7$ &rarr; <code>False</code> (chưa đủ, mọi thời gian $\\le 7$ chắc chắn cũng <code>False</code>!).</li>
                      <li>Nếu <code>mid = 8</code> giây: làm được $2 + 4 + 1 = 7 \\ge 7$ &rarr; <code>True</code> (đủ rồi, và mọi thời gian $\\ge 8$ cũng tự động <code>True</code>!).</li>
                    </ul>
                  </li>
                  <li>Dãy trạng thái <code>check(1), check(2), ...</code> tự động xếp thành hai nửa ngăn nắp:
                    <ul style="margin: 4px 0 0 20px;">
                      <li><strong>Dáng 1 — <code>F, F, F, ..., F, T, T, T</code> (Tìm giá trị NHỎ NHẤT thỏa mãn):</strong> Khi <code>check(mid) == true</code>, ta ghi <code>ans = mid;</code> rồi ép sang trái <code>high = mid - 1;</code> để tìm số nhỏ hơn; ngược lại <code>low = mid + 1;</code>.</li>
                      <li><strong>Dáng 2 — <code>T, T, T, ..., T, F, F, F</code> (Tìm giá trị LỚN NHẤT thỏa mãn, như cắt gỗ dài nhất):</strong> Khi <code>check(mid) == true</code>, ta ghi <code>ans = mid;</code> rồi đẩy sang phải <code>low = mid + 1;</code> để tìm số lớn hơn; ngược lại <code>high = mid - 1;</code>.</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Chặt nhị phân đáp án dáng FFFTTT (CSES Factory Machines)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

bool canMake(long long timeLimit, const vector&lt;long long&gt;&amp; k, long long target) {
    long long made = 0;
    for (long long x : k) {
        made += timeLimit / x;
        if (made &gt;= target) return true; // Đạt đủ rồi thì dừng sớm ngay!
    }
    return false;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;long long&gt; k = {3, 2, 5};
    long long target = 7;

    long long low = 1, high = (*min_element(k.begin(), k.end())) * target;
    long long ans = high;
    while (low &lt;= high) {
        long long mid = low + (high - low) / 2;
        if (canMake(mid, k, target)) {
            ans = mid;       // Thời gian mid làm đủ -&gt; lưu lại và thử nhỏ hơn
            high = mid - 1;
        } else {
            low = mid + 1;   // Chưa đủ -&gt; phải tăng thời gian
        }
    }
    cout &lt;&lt; "Thoi gian nho nhat: " &lt;&lt; ans &lt;&lt; '\\n'; // In ra 8
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Chặt nhị phân đáp án (<code>Binary Search on Answer</code>):</strong> Chia đôi khoảng ứng viên $[low, high]$ dựa trên kết quả của hàm kiểm tra thay vì tìm trên mảng có sẵn.</li>
                  <li><strong>Hàm kiểm tra đơn điệu (<code>Monotonic Predicate</code>):</strong> Hàm <code>bool check(mid)</code> đảm bảo đổi chiều đúng 1 lần duy nhất từ <code>False &rarr; True</code> hoặc <code>True &rarr; False</code> trên toàn miền $[low, high]$.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Đặt Biên long long [low, high] Chính Xác &amp; Dừng Sớm Chống Tràn Số Trong check(mid)',
            tag: 'Biên &amp; Tràn số 10^18',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Rất nhiều bài nộp chặt nhị phân đáp án bị <strong>WA bí ẩn</strong> dù tư duy đúng hoàn toàn — thủ phạm gần như luôn nằm ở 1 trong 3 chỗ sau:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>1. Đặt cận trên <code>high</code> quá nhỏ hoặc dùng kiểu <code>int</code>:</strong> Trong bài máy in, nếu chỉ có $n = 1$ máy với $k_0 = 10^9$ và cần $t = 10^9$ sản phẩm, đáp án đúng lên tới <strong>$10^{18}$</strong>! Nếu bạn đặt <code>high = 1e9</code> hay <code>1e12</code>, kết quả thật nằm ngoài vùng tìm kiếm! Chỉ cần dùng <code>long long</code> và đặt <code>high = min_k * t</code> (hoặc $10^{18}$), vòng lặp cũng chỉ chạy thêm có $\\log_2(10^{18}) \\approx 60$ bước!</li>
                  <li><strong>2. Tràn số <code>long long</code> ngay BÊN TRONG <code>check(mid)</code>:</strong> Ở lượt đầu tiên khi <code>mid = 5 * 10^17</code>, nếu có $2 \\cdot 10^5$ máy chạy siêu nhanh ($k_i = 1$), vòng lặp cộng <code>made += mid / k[i]</code> sẽ cộng lên tới $10^{23} &gt; 9.22 \\cdot 10^{18}$, làm <strong>vỡ hộp <code>long long</code> thành số âm</strong> khiến <code>check(mid)</code> trả về <code>false</code> oan! Giải pháp: hễ <code>made &gt;= target</code> là <strong><code>return true;</code> ngay lập tức</strong>!</li>
                  <li><strong>3. Quên cận dưới <code>low</code> thực tế (ví dụ bài <em>Chia mảng / Array Division</em>):</strong> Nếu chia dãy $x_i$ thành $k$ đoạn sao cho tổng đoạn lớn nhất nhỏ nhất, mỗi phần tử đơn lẻ đều phải nằm trọn trong một đoạn nên <strong><code>low = *max_element(x.begin(), x.end())</code></strong> và <strong><code>high = tổng toàn mảng</code></strong> (lên tới $2 \\cdot 10^{14}$, dùng <code>long long</code>!).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Cài đặt mẫu bài Chia mảng thành &lt;= k đoạn (CSES Array Division)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

bool canSplit(long long limit, const vector&lt;long long&gt;&amp; x, int maxGroups) {
    int groups = 1;
    long long curSum = 0;
    for (long long val : x) {
        if (val &gt; limit) return false; // An toàn: một phần tử vượt limit là bất khả thi
        if (curSum + val &gt; limit) {
            groups++;
            curSum = val;
        } else {
            curSum += val;
        }
    }
    return groups &lt;= maxGroups;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;long long&gt; x = {2, 4, 7, 3, 5};
    int k = 3;
    long long low = *max_element(x.begin(), x.end()); // = 7 (không thể nhỏ hơn phần tử lớn nhất)
    long long high = accumulate(x.begin(), x.end(), 0LL); // = 21 (tổng cả mảng)
    long long ans = high;

    while (low &lt;= high) {
        long long mid = low + (high - low) / 2;
        if (canSplit(mid, x, k)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout &lt;&lt; "Tong doan lon nhat nho nhat: " &lt;&lt; ans &lt;&lt; '\\n'; // In ra 8: {2,4} | {7} | {3,5}
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Dừng sớm chống tràn (<code>Early Exit Overflow Guard</code>):</strong> Thoát khỏi vòng lặp tính tổng trong <code>check(mid)</code> ngay khi biến tích lũy đạt ngưỡng <code>target</code> để giá trị không bao giờ leo lên quá giới hạn $9.22 \\cdot 10^{18}$ của <code>long long</code>.</li>
                  <li><strong>Độ phức tạp $O(N \\log(\\text{Range}))$:</strong> Mỗi lần kiểm tra tốn $O(N)$ và số lần chặt tối đa là $\\log_2(\\text{high} - \\text{low})$. Với $N = 2 \\cdot 10^5$ và $\\text{Range} = 10^{18}$, tổng số phép tính chỉ khoảng $2 \\cdot 10^5 \\times 60 \\approx 1.2 \\cdot 10^7$ (chạy dưới $0.1$ giây!).</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_bs_ans_dir',
            title: 'Phòng Thí Nghiệm 3A: Nhầm Hướng Dịch Cận Trong Dạng FFFTTT (Tìm Min Thời Gian)',
            desc: 'Hai máy mất {2, 3} giây/sản phẩm cần làm đủ 5 sản phẩm (đáp án đúng là 6 giây: 3 + 2 = 5). Thử đảo nhầm hướng low = mid + 1 khi check(mid) đúng để xem biến ans bị trôi lên tận 100!',
            toggles: [
              {
                key: 'dirMode',
                label: 'Cập nhật cận khi check(mid) == true',
                options: [
                  { value: 'min_ok', text: 'ans = mid; high = mid - 1; — Ép tìm nhỏ nhất (AC)', kind: 'ok' },
                  { value: 'max_bug', text: 'ans = mid; low = mid + 1; — Đẩy lên tối đa (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.dirMode === 'min_ok';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<long long> k = {2, 3};
    long long target = 5, low = 1, high = 100, ans = -1;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        long long made = mid / k[0] + mid / k[1];
        if (made >= target) { ans = mid; high = mid - 1; }
        else low = mid + 1;
    }
    cout << ans << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<long long> k = {2, 3};
    long long target = 5, low = 1, high = 100, ans = -1;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        long long made = mid / k[0] + mid / k[1];
        if (made >= target) { ans = mid; low = mid + 1; }
        else high = mid - 1;
    }
    cout << ans << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [12, 13],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Khi mid đủ 5 sản phẩm thì thu hẹp về trái (high = mid - 1), khóa đúng min = 6!'
                  : 'SAI THUẬT TOÁN (WA): Khi mid đủ sản phẩm lại đẩy sang phải (low = mid + 1), nên tìm ra thời gian lớn nhất 100!',
                predictions: [
                  { text: 'Mỗi lần làm đủ 5 sản phẩm chương trình thu hẹp sang trái nên tìm đúng min = 6' },
                  { text: 'Mỗi lần làm đủ 5 sản phẩm chương trình đẩy sang phải nên trả về sai tận 100' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n6'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n100',
                explain: isOk
                  ? 'Với bài toán tìm GIÁ TRỊ NHỎ NHẤT (dạng FFFTTT), khi mid đã thỏa mãn thì mọi giá trị bên phải mid đều thỏa mãn nhưng không tối ưu bằng mid &rarr; phải giữ ans = mid rồi thu gọn đoạn về bên trái (high = mid - 1).'
                  : 'Đổi nhầm thành low = mid + 1 biến bài toán thành tìm GIÁ TRỊ LỚN NHẤT thỏa mãn trong [1, 100], dẫn tới trôi thẳng lên tận cận trên high = 100!'
              };
            }
          },
          {
            id: 'sb_bs_ans_high',
            title: 'Phòng Thí Nghiệm 3B: Đặt Cận Trên high = 10^9 Thay Vì 10^18 Làm Mất Đáp Án',
            desc: 'Một máy in chậm mất k[0] = 2 giây/sản phẩm, cần làm t = 10^9 sản phẩm (đáp án đúng là 2*10^9 giây). Thử thu nhỏ high = 10^9 để thấy vòng lặp bỏ lỡ hoàn toàn đáp án thật!',
            toggles: [
              {
                key: 'highBound',
                label: 'Cận trên high của không gian đáp án',
                options: [
                  { value: 'e18', text: 'high = 1000000000000000000LL (10^18) — Bao trọn đáp án (AC)', kind: 'ok' },
                  { value: 'e9', text: 'high = 1000000000LL (10^9) — Cắt cụt miền giá trị (Bẫy WA!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.highBound === 'e18';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long k0 = 2, target = 1000000000LL;
    long long low = 1, high = 1000000000000000000LL, ans = -1;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (mid / k0 >= target) { ans = mid; high = mid - 1; }
        else low = mid + 1;
    }
    cout << ans << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long k0 = 2, target = 1000000000LL;
    long long low = 1, high = 1000000000LL, ans = -1;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (mid / k0 >= target) { ans = mid; high = mid - 1; }
        else low = mid + 1;
    }
    cout << ans << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [8],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHÍNH XÁC (AC): Miền [1, 10^18] chứa trọn đáp án 2000000000 và tìm ra chỉ trong 60 bước!'
                  : 'SAI THUẬT TOÁN (WA): Toàn bộ [1, 10^9] chỉ in được tối đa 5*10^8 sản phẩm nên ans giữ nguyên -1!',
                predictions: [
                  { text: 'Không gian tìm kiếm tới 10^18 bao phủ đủ và in đúng 2000000000' },
                  { text: 'Cận trên 10^9 quá nhỏ không chứa đáp án thật nên chương trình in ra -1' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n2000000000'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\n-1',
                explain: isOk
                  ? 'Với n = 1, k_0 &lt;= 10^9 và target &lt;= 10^9, đáp án xấu nhất có thể lên tới 10^18. Dùng kiểu long long tới 10^18 vẫn chỉ cần tối đa 60 vòng lặp!'
                  : 'Vì mọi mid trong [1, 10^9] đều cho mid / 2 &lt;= 500000000 &lt; 10^9, nhánh if (mid / k0 &gt;= target) không bao giờ chạy dù chỉ một lần, khiến ans giữ nguyên giá trị khởi tạo -1!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

bool check(long long t, const vector<long long>& k, long long need) {
    long long made = 0;
    for (long long x : k) {
        made += t / x;
        if (made >= need) return true;
    }
    return false;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<long long> k = {2, 3, 5};
    long long low = 1, high = 12, ans = -1;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (check(mid, k, 6)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout << ans << ' ' << low << ' ' << high << '\\n';
    return 0;
}`,
            q: 'Đoạn code trên tìm thời gian tối thiểu làm đủ 6 sản phẩm cho 3 máy tốc độ <code>{2, 3, 5}</code>. Ba số in ra màn hình là gì?',
            options: [
              'In ra 5 6 5 vì tại thời điểm t = 5 ba máy in được vừa đủ 6 sản phẩm theo yêu cầu',
              'In ra 6 6 5 vì t = 6 là thời gian nhỏ nhất làm đủ 6 sản phẩm và vòng lặp dừng ở low = 6',
              'In ra 6 5 6 vì sau khi lưu ans = 6 vòng lặp giữ nguyên high = 6 để kiểm tra biên phải',
              'In ra 7 7 6 vì t = 6 mới tạo được 5 sản phẩm nên vòng lặp phải tăng lên 7 để đủ 6 cái'
            ],
            correct: 1,
            explain: 'Tại t = 6: 6/2 + 6/3 + 6/5 = 3 + 2 + 1 = 6 &gt;= 6 (đủ). Tại t = 5: 5/2 + 5/3 + 5/5 = 2 + 1 + 1 = 4 &lt; 6 (chưa đủ). Lượt 1: mid = 6 &rarr; ans = 6, high = 5; các lượt sau mid = 3, 4, 5 đều sai nên low tăng lên 6. Dừng và in ra: 6 6 5.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

bool ok(long long L, const vector<long long>& w, long long need) {
    long long cnt = 0;
    for (long long x : w) cnt += x / L;
    return cnt >= need;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<long long> w = {10, 14, 19};
    long long low = 1, high = 19, ans = 0;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (ok(mid, w, 5)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    cout << ans << ' ' << low << ' ' << high << '\\n';
    return 0;
}`,
            q: 'Chặt nhị phân độ dài lớn nhất <code>L</code> để cắt được ít nhất 5 đoạn bằng nhau từ ba thanh gỗ <code>{10, 14, 19}</code>. Kết quả in ra là gì?',
            options: [
              'In ra 6 7 6 vì độ dài L = 7 chỉ cắt được tối đa 4 đoạn nên phải hạ xuống 6',
              'In ra 7 7 8 vì ở bước cuối cùng biến low nhận giá trị 7 còn biến high tăng lên 8',
              'In ra 7 8 7 vì L = 7 cắt được đúng 5 đoạn (1 + 2 + 2) và L = 8 chỉ cắt được 4 đoạn',
              'In ra 8 8 7 vì phép chia nguyên 19 / 8 cộng phần dư giúp đủ 5 đoạn từ ba thanh gỗ'
            ],
            correct: 2,
            explain: 'Với L = 7: 10/7 + 14/7 + 19/7 = 1 + 2 + 2 = 5 đoạn (đạt). Với L = 8: 10/8 + 14/8 + 19/8 = 1 + 1 + 2 = 4 &lt; 5 (không đạt). Khi kết thúc vòng lặp tìm max dạng TTTFFF, ans = 7, low = 8, high = 7. In ra: 7 8 7.'
          },
          {
            type: 'single',
            q: 'Trong bài toán tìm thời gian tối thiểu làm đủ $t \\le 10^9$ sản phẩm từ $n \\le 2 \\cdot 10^5$ máy ($k_i \\le 10^9$), vì sao ta phải viết <code>if (made &gt;= target) return true;</code> ngay bên trong vòng lặp của hàm <code>check(mid)</code>?',
            options: [
              'Vì hàm check(mid) chỉ được phép cộng tối đa 10 lần trước khi trả kết quả về cho main',
              'Vì khi mid tới 10^18 và nhiều máy có k_i = 1, tổng made vượt 9*10^18 gây tràn long long',
              'Vì nếu không thoát sớm thì vòng lặp for sẽ tự động chia đôi biến mid thêm lần nữa',
              'Vì mảng k chưa được sắp xếp tăng dần nên tổng made sẽ tính sai nếu duyệt hết mảng'
            ],
            correct: 1,
            explain: 'Nếu có 2*10^5 máy có k_i = 1 và mid = 5*10^17, tổng made cộng hết cả vòng lặp sẽ đạt 10^23, vượt xa giới hạn ~9.22*10^18 của kiểu long long 64-bit và bị tràn sang số âm! Dừng sớm ngay khi made &gt;= target giữ tổng luôn an toàn.'
          },
          {
            type: 'multiple',
            q: 'Những điều kiện nào sau đây là <strong>ĐÚNG</strong> khi áp dụng kỹ thuật Chặt nhị phân trên tập đáp án (Binary Search on Answer)?',
            options: [
              'Hàm check(mid) phải có tính đơn điệu (chỉ đổi chiều tối đa 1 lần dạng FFFTTT hoặc TTTFFF)',
              'Nếu đang tìm giá trị nhỏ nhất thỏa mãn (dạng FFFTTT), khi check(mid) đúng ta gán ans = mid; high = mid - 1;',
              'Với bài chia mảng thành k đoạn để tổng đoạn lớn nhất nhỏ nhất, cận low tối thiểu phải bằng max(x_i)',
              'Khoảng [low, high] trên tập đáp án chỉ dùng được khi đã lưu hết mọi số từ low đến high vào vector'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều đúng. D sai hoàn toàn vì sức mạnh của Chặt nhị phân đáp án là tìm trực tiếp trên hai con số biên [low, high] tới 10^18 bằng phép toán học mà không tốn bộ nhớ lưu dãy.'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l202_while_lt_misses_last',
        title: 'Viết while (l &lt; r) Làm Sót Phần Tử Cuối Khi Hai Cận Chạm Nhau (WA)',
        description: 'Chương trình tìm chỉ số của số x trong mảng đã sắp xếp tăng dần n phần tử (trả về -1 nếu không có). Với mảng {2, 5, 8, 12, 16} và x = 16, kết quả đúng phải là 4, nhưng code lại in ra -1!',
        failingInput: '5 16\n2 5 8 12 16',
        failingOutput: '-1',
        expectedOutput: '4',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, x;
    cin >> n >> x;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int l = 0, r = n - 1, ans = -1;
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) {
            ans = mid;
            break;
        }
        if (a[mid] < x) l = mid + 1;
        else r = mid - 1;
    }
    cout << ans << '\\n';
    return 0;
}`,
        bugLine: 12,
        patches: [
          { text: 'Đổi dòng 12 thành while (l < r - 1) { để dừng vòng lặp sớm hơn khi còn 2 phần tử' },
          { text: 'Đổi dòng 12 thành while (l <= r) { để xét cả trường hợp đoạn chỉ còn đúng 1 phần tử l == r' },
          { text: 'Đổi dòng 18 thành if (a[mid] <= x) l = mid; để nhảy chậm lại ở bước gần cuối' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 12, khi tìm x = 16 trên mảng 5 phần tử, hai bước đầu đưa l lên 3 rồi lên 4. Khi l == 4 và r == 4, điều kiện while (l &lt; r) sai nên thoát ngay mà chưa xét a[4] = 16! Đổi thành while (l &lt;= r) sẽ cho ra đúng chỉ số 4.'
      },
      {
        id: 'dbg_l202_lb_instead_of_ub',
        title: 'Dùng Nhầm lower_bound Thay Vì upper_bound Khi Đếm Số Phần Tử &lt;= x (WA)',
        description: 'Chương trình sắp xếp dãy n phần tử rồi trả lời q truy vấn đếm xem có bao nhiêu số nhỏ hơn hoặc bằng x. Với dãy {10, 20, 20, 30, 40} và truy vấn x = 20, số lượng đúng là 3 (gồm 10, 20, 20), nhưng code lại in ra 1!',
        failingInput: '5 1\n10 20 20 30 40\n20',
        failingOutput: '1',
        expectedOutput: '3',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, q;
    cin >> n >> q;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    sort(a.begin(), a.end());
    while (q--) {
        int x;
        cin >> x;
        int cnt = (int)(lower_bound(a.begin(), a.end(), x) - a.begin());
        cout << cnt << '\\n';
    }
    return 0;
}`,
        bugLine: 15,
        patches: [
          { text: 'Đổi dòng 15 thành int cnt = (int)(lower_bound(a.begin(), a.end(), x) - a.begin()) + 1;' },
          { text: 'Đổi dòng 15 thành int cnt = (int)(upper_bound(a.begin(), a.end(), x) - lower_bound(a.begin(), a.end(), x));' },
          { text: 'Đổi dòng 15 thành int cnt = (int)(upper_bound(a.begin(), a.end(), x) - a.begin());' }
        ],
        correctPatch: 2,
        explain: 'Ở dòng 15, lower_bound(20) trỏ tới số 20 đầu tiên (chỉ số 1), nên hiệu chỉ đếm các phần tử &lt; 20 (bị thiếu hai số 20!). Phải dùng upper_bound (đầu tiên &gt; 20, trỏ tới số 30 ở chỉ số 3) trừ a.begin() để đếm trọn vẹn mọi số &lt;= 20.'
      },
      {
        id: 'dbg_l202_bs_ans_small_high',
        title: 'Đặt Cận Trên high = 10^9 Quá Nhỏ Trong Chặt Nhị Phân Đáp Án (WA)',
        description: 'Một máy in mất k[0] = 2 giây cho mỗi sản phẩm, cần in đủ t = 10^9 sản phẩm trong thời gian nhỏ nhất (đáp án đúng là 2000000000 giây), nhưng code lại in ra -1!',
        failingInput: '1 1000000000\n2',
        failingOutput: '-1',
        expectedOutput: '2000000000',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    long long t;
    cin >> n >> t;
    vector<long long> k(n);
    for (int i = 0; i < n; i++) cin >> k[i];
    long long low = 1, high = 1000000000LL, ans = -1;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        long long made = 0;
        for (long long x : k) {
            made += mid / x;
            if (made >= t) break;
        }
        if (made >= t) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    cout << ans << '\\n';
    return 0;
}`,
        bugLine: 12,
        patches: [
          { text: 'Đổi dòng 12 thành long long low = 1, high = 1000000000000000000LL, ans = -1;' },
          { text: 'Đổi dòng 12 thành long long low = 0, high = t, ans = 0;' },
          { text: 'Đổi dòng 22 thành low = mid + 1; thay cho high = mid - 1;' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 12, với k[0] = 2 và t = 10^9, đáp án thật là 2*10^9 (worst-case bài toán có thể lên tới 10^18). Đặt high = 10^9 khiến toàn bộ khoảng tìm kiếm không chạm tới được đáp án, dẫn đến ans giữ nguyên -1!'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — L2-02)
    // ============================================================================
    practiceProblems: [
      {
        id: 'CF-706B',
        title: '706B - Interesting drink',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/706/B',
        hint: 'Giới hạn $1 \\le n, q \\le 10^5$, $1 \\le x_i \\le 10^5$, $1 \\le m_i \\le 10^9$, TL 2.0s, ML 256 MB. Bài mẫu kinh điển cho <code>upper_bound</code>: sắp xếp mảng giá tiền $x$ bằng <code>sort</code> rồi với mỗi ngân sách $m_i$, số cửa hàng mua được chính là <code>upper_bound(x.begin(), x.end(), m_i) - x.begin()</code> trong $O(\\log N)$.'
      },
      {
        id: 'CF-474B',
        title: '474B - Worms',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/474/B',
        hint: 'Giới hạn $1 \\le n, m \\le 10^5$, $1 \\le a_i \\le 10^3$, $\\sum a_i \\le 10^6$, TL 1.0s, ML 256 MB. Kết hợp tuyệt đẹp giữa <code>L2-01</code> và <code>L2-02</code>: dựng Mảng cộng dồn 1D <code>pref</code> (chỉ số 1-based, tăng dần ngặt) để lưu nhãn lớn nhất của mỗi đống, sau đó trả lời vị trí sâu thứ $q_i$ bằng <code>lower_bound(pref.begin() + 1, pref.end(), q_i) - pref.begin()</code>.'
      },
      {
        id: 'CF-600B',
        title: '600B - Queries about less or equal elements',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/600/B',
        hint: 'Giới hạn $1 \\le n, m \\le 2 \\cdot 10^5$, $|a_i|, |b_j| \\le 10^9$, TL 2.0s, ML 256 MB. Sắp xếp mảng $a$ tăng dần trong $O(n \\log n)$, rồi với từng truy vấn $b_j$ (có cả số âm!) đếm số phần tử $\\le b_j$ bằng <code>upper_bound(a.begin(), a.end(), b_j) - a.begin()</code> trong $O(\\log n)$.'
      },
      {
        id: 'CSES-1091',
        title: 'Concert Tickets',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1091',
        hint: 'Giới hạn $1 \\le n, m \\le 2 \\cdot 10^5$, $1 \\le h_i, t_i \\le 10^9$, TL 1.00s, ML 512 MB. Cần xóa vé sau khi bán nên dùng <code>std::multiset&lt;int&gt;</code> (<code>L1-06</code>). Với mỗi khách có giá tối đa $t_i$, gọi phương thức <code>auto it = ms.upper_bound(t_i);</code> (tuyệt đối KHÔNG gọi <code>std::upper_bound(ms.begin(), ...)</code> vì bị $O(N)$ TLE!). Nếu <code>it == ms.begin()</code> in <code>-1</code>; ngược lại <code>--it</code>, in <code>*it</code> và gọi <code>ms.erase(it)</code>.'
      },
      {
        id: 'ABC146-C',
        title: 'C - Buy an Integer',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc146/tasks/abc146_c',
        hint: 'Giới hạn $1 \\le A, B \\le 10^9$, $1 \\le X \\le 10^{18}$, TL 2.0s, ML 1024 MB. Giá tiền $A \\cdot N + B \\cdot d(N)$ tăng đơn điệu theo $N$ (dạng <code>TTTFFF</code> tìm $N$ lớn nhất trong $[0, 10^9]$). Dùng <code>long long</code> cho mọi phép tính vì $A \\cdot N$ đạt $10^{18}$, đếm chữ số $d(\\text{mid})$ bằng vòng lặp chia $10$ trong $O(1)$.'
      },
      {
        id: 'CSES-1620',
        title: 'Factory Machines',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1620',
        hint: 'Giới hạn $1 \\le n \\le 2 \\cdot 10^5$, $1 \\le t \\le 10^9$, $1 \\le k_i \\le 10^9$, TL 1.00s, ML 512 MB. Bài kinh điển của Chặt nhị phân đáp án dáng <code>FFFTTT</code>: đặt <code>low = 1</code>, <code>high = min_k * t</code> (hoặc $10^{18}$ bằng <code>long long</code>). Trong hàm <code>check(mid)</code> cộng <code>made += mid / k[i]</code> và nhớ dừng sớm <code>if (made &gt;= t) return true;</code> để tránh tràn <code>long long</code>!'
      },
      {
        id: 'CF-1201C',
        title: '1201C - Maximum Median',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/1201/C',
        hint: 'Giới hạn $1 \\le n \\le 2 \\cdot 10^5$ ($n$ lẻ), $1 \\le k \\le 10^9$, $1 \\le a_i \\le 10^9$, TL 2.0s, ML 256 MB. Sau khi <code>sort(a.begin(), a.end())</code>, để trung vị đạt ít nhất $\\text{mid}$, mọi phần tử từ chỉ số $n / 2$ đến $n - 1$ đều phải $\\ge \\text{mid}$. Chặt nhị phân giá trị $\\text{mid}$ trong $[a[n / 2], a[n / 2] + k]$ (nhớ <code>long long</code> vì tới $2 \\cdot 10^9$!) với <code>check(mid)</code> tính tổng $\\max(0LL, \\text{mid} - a[i])$ cho $i \\ge n / 2$ và kiểm tra $\\le k$.'
      },
      {
        id: 'CSES-1085',
        title: 'Array Division',
        judge: 'CSES',
        tier: 3,
        link: 'https://cses.fi/problemset/task/1085',
        hint: 'Giới hạn $1 \\le n \\le 2 \\cdot 10^5$, $1 \\le k \\le n$, $1 \\le x_i \\le 10^9$, TL 1.00s, ML 512 MB. Chặt nhị phân tổng lớn nhất cho phép <code>mid</code> (dáng <code>FFFTTT</code>) trong khoảng $[\\max(x_i), \\sum x_i]$ (tới $2 \\cdot 10^{14}$, dùng <code>long long</code>). Trong <code>check(mid)</code>, duyệt mảng từ trái sang phải, gom càng nhiều phần tử liên tiếp vào nhóm hiện tại càng tốt miễn tổng $\\le \\text{mid}$, nếu vượt thì mở nhóm mới; kiểm tra tổng số nhóm $\\le k$.'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
