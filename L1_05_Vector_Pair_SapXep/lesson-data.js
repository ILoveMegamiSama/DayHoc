/**
 * DỮ LIỆU BÀI GIẢNG L1-05: STD::VECTOR, PAIR & SẮP XẾP (STD::SORT)
 * Tầng 1 — Mở Khóa Pha 2 STL Lớp 9 (Nối tiếp từ L1-04)
 * Chính thức mở khóa: std::vector<T>, vector<vector<int>>, truyền vector<T>& / const vector<T>&,
 * std::pair<T1, T2>, std::sort O(N log N) và Custom Comparator (Strict Weak Ordering).
 * Không giả định các cấu trúc set, map, priority_queue, deque (L1-06) hay lower_bound (L2-02).
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'sap_xep_vector',
    number: 'Bài Học L1-05',
    shortTitle: 'Vector, Pair & Sort',
    title: 'Bài L1-05: std::vector, pair & Sắp Xếp (std::sort) — Mở Khóa Pha 2 STL',
    lead: 'Chính thức bước sang Pha 2 STL: tạm biệt mảng tĩnh cứng nhắc, làm chủ thùng chứa co giãn std::vector trên vùng Heap, truyền vector& / const vector& để né bẫy copy O(N) TLE, gói cặp dữ liệu bằng pair và sắp xếp 10^5 phần tử trong tích tắc với std::sort + Custom Comparator.',
    modules: [
      // ============================================================================
      // MODULE 1: STD::VECTOR, HEAP & TRUYỀN THAM CHIẾU VECTOR& / CONST VECTOR&
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'std::vector & Tham Chiếu',
        title: 'Vấn Đề Nhỏ 1: std::vector&lt;T&gt;, Bộ Nhớ Heap & Truyền Tham Chiếu (&)',
        lead: 'Tại sao mảng tĩnh 2 chiều tốn hàng GB cho K câu lạc bộ kích thước không đều, cách std::vector gửi dữ liệu lên Heap để né tràn Stack 8 MB, bẫy (int)v.size() - 1 và sự khác biệt sinh tử giữa truyền tham trị O(N) vs const vector& O(1).',
        subproblem: {
          title: 'Làm sao lưu nhiều danh sách kích thước thay đổi linh hoạt mà không tràn Stack (~8 MB) hay lãng phí RAM (&gt; 256 MB), và truyền vào hàm xử lý mà không bị copy chậm O(N)?',
          desc: 'Ở Pha 1, mảng tĩnh cố định kích thước sẽ gây MLE nếu K = 10^4 phòng có kích thước răng cưa, còn truyền mảng sao chép qua hàm gây TLE. Ta dùng std::vector&lt;T&gt; trên Heap kết hợp truyền tham chiếu vector& / const vector& trong O(1).'
        },
        cards: [
          {
            heading: 'std::vector&lt;T&gt; & vector&lt;vector&lt;int&gt;&gt; — Chiếc Balo Co Giãn Trên Heap',
            tag: 'Mở khóa Pha 2 STL',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Ở Pha 1 (<code>L1-02</code> đến <code>L1-04</code>), ta quen dùng <strong>mảng tĩnh toàn cục</strong> — giống như dãy <strong>tủ sắt hàn chết</strong> số ngăn từ đầu. Nhưng khi quản lý $K = 10\\,000$ câu lạc bộ có quy mô lệch nhau (CLB A có $50\\,000$ bạn, CLB B chỉ có $2$ bạn), đặt tủ cứng <code>int clb[10005][50005];</code> sẽ đốt hơn <strong>2 GB RAM &rarr; tràn MLE</strong>!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Chiếc balo dây rút <code>std::vector&lt;T&gt;</code>:</strong> Ban đầu rỗng; thêm cuối bằng <code>push_back(x)</code>, bỏ cuối bằng <code>pop_back()</code>, xem số lượng bằng <code>size()</code>, đặt lại kích thước bằng <code>resize(n, val)</code>.</li>
                  <li><strong>Tại sao đặt trong <code>main()</code> vẫn an toàn (Heap vs Stack):</strong> Ở <code>L1-03</code>, khai báo mảng tĩnh <code>int a[1000000];</code> trong <code>main()</code> bị sập Stack (~8 MB). Còn <code>vector&lt;int&gt; a(1000000);</code> chỉ để một <strong>tấm thẻ nhỏ 24 byte</strong> trên Stack, toàn bộ $10^6$ phần tử được gửi sang <strong>kho Heap (~256 MB)</strong> nên không bao giờ tràn Stack!</li>
                  <li><strong>Cảnh báo bẫy số không dấu <code>v.size() - 1</code>:</strong> Hàm <code>v.size()</code> trả về kiểu không âm <code>size_t</code>. Khi <code>v</code> rỗng (<code>size == 0</code>), phép <code>v.size() - 1</code> tràn ngược thành $1.84 \\times 10^{19}$, khiến vòng lặp chạy vọt ra ngoài bộ nhớ và crash (RE)! Luôn ép kiểu <code>(int)v.size()</code> hoặc viết <code>i + 1 &lt; (int)v.size()</code>.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Thao tác cơ bản trên vector&lt;int&gt;
    vector&lt;int&gt; ds;
    ds.push_back(10);
    ds.push_back(25);
    ds.push_back(40);
    ds.pop_back(); // Còn {10, 25}

    // 2. Bảng răng cưa vector&lt;vector&lt;int&gt;&gt;: 3 phòng kích thước hoàn toàn khác nhau
    vector&lt;vector&lt;int&gt;&gt; clb(3);
    clb[0].push_back(101);
    clb[0].push_back(102);
    clb[1].resize(3, 7); // Tạo nhanh 3 phần tử cùng bằng 7

    // 3. Luôn ép (int) hoặc kiểm tra !empty() trước khi trừ 1 trên size()
    vector&lt;int&gt; rong;
    int dem = 0;
    for (int i = 0; i + 1 &lt; (int)rong.size(); i++) {
        if (rong[i] &lt; rong[i + 1]) dem++;
    }

    cout &lt;&lt; (int)ds.size() &lt;&lt; ' ' &lt;&lt; clb[1][2] &lt;&lt; ' ' &lt;&lt; dem &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>std::vector&lt;T&gt;</code> (<code>Dynamic Array</code> — Mảng động):</strong> Thùng chứa chuẩn STL tự động cấp phát và co giãn vùng nhớ liên tiếp trên <strong>Heap</strong>; truy cập <code>v[i]</code> mất $O(1)$, thêm/xóa cuối <code>push_back</code>/<code>pop_back</code> mất $O(1)$ khấu hao.</li>
                  <li><strong><code>size_t</code> &amp; Tràn số không dấu (<code>Unsigned Underflow</code>):</strong> Kiểu số nguyên không âm dùng làm kết quả của <code>.size()</code>; nếu lấy <code>0 - 1</code> sẽ quay vòng thành $2^{64} - 1$, do đó bắt buộc ép <code>(int)v.size()</code> khi tính chỉ số.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Mở Khóa Tham Chiếu Cho Container: vector& và const vector& vs Copy O(N)',
            tag: 'Bẫy TLE truyền tham trị',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Ở <code>L1-03</code>, bạn đã biết <strong>tham trị</strong> là photocopy tờ giấy, còn <strong>tham chiếu <code>&amp;</code></strong> là đưa bản gốc. Với một biến <code>int x</code> (chỉ 4 byte — 1 mảnh giấy nhỏ), việc photocopy chẳng tốn bao nhiêu công. Nhưng khi <code>vector&lt;int&gt; a</code> chứa tới <strong>$N = 100\\,000$ số</strong> (một tập tài liệu dày $100\\,000$ trang):</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Lỗi 1 — Photocopier quá tải (Quên <code>&amp;</code> gây TLE):</strong> Nếu bạn viết <code>int layPhanTu(vector&lt;int&gt; a, int idx)</code> và gọi trong vòng lặp $Q = 10^5$ truy vấn, mỗi lần gọi hàm máy tính phải photocopy toàn bộ $10^5$ số &rarr; $10^5 \\times 10^5 = 10^{10}$ lượt chép (<strong>chết TLE chắc chắn!</strong>).</li>
                  <li><strong>Lỗi 2 — Mất công sửa bản sao:</strong> Hàm <code>void sapXep(vector&lt;int&gt; a)</code> không có <code>&amp;</code> chỉ sắp xếp trên tập giấy photocopy rồi vứt đi khi kết thúc hàm; bản gốc trong <code>main()</code> vẫn lộn xộn y nguyên!</li>
                  <li><strong>Giải pháp 3 mức rõ ràng:</strong> Chỉ đọc dùng <code>const vector&lt;int&gt;&amp; a</code> (truyền địa chỉ $O(1)$ và khóa quyền sửa); cần sửa bản gốc dùng <code>vector&lt;int&gt;&amp; a</code> (truyền địa chỉ $O(1)$); <strong>tuyệt đối tránh</strong> viết <code>vector&lt;int&gt; a</code> cho vector lớn!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Phân biệt 3 cách truyền vector vào hàm</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// 1. Tham chiếu hằng (const vector&lt;int&gt;&amp;): Chỉ đọc trong O(1), KHÔNG copy O(N)!
int layGiaTri(const vector&lt;int&gt;&amp; a, int idx) {
    return a[idx];
}

// 2. Tham chiếu (vector&lt;int&gt;&amp;): Sửa trực tiếp bản gốc trong O(1)
void tangTatCa(vector&lt;int&gt;&amp; a, int them) {
    for (int i = 0; i &lt; (int)a.size(); i++) {
        a[i] += them;
    }
}

// 3. Tham trị (vector&lt;int&gt; b): Sao chép cả vector O(N) - bản gốc KHÔNG đổi!
void suaThuBanSao(vector&lt;int&gt; b) {
    if (!b.empty()) b[0] = 999;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;int&gt; a = {2, 5, 8};
    suaThuBanSao(a); // a[0] vẫn là 2
    tangTatCa(a, 3); // a thành {5, 8, 11}
    cout &lt;&lt; layGiaTri(a, 0) &lt;&lt; ' ' &lt;&lt; layGiaTri(a, 2) &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Truyền tham chiếu hằng (<code>Pass by Const Reference</code> — <code>const vector&lt;T&gt;&amp;</code>):</strong> Đưa địa chỉ ô nhớ gốc cho hàm đọc với chi phí $O(1)$, đồng thời từ khóa <code>const</code> ngăn hàm vô tình sửa đổi dữ liệu gốc.</li>
                  <li><strong>Truyền tham trị trên container (<code>Pass by Value</code>):</strong> Tạo bản sao sâu toàn bộ $N$ phần tử trên Heap, tốn $O(N)$ thời gian và bộ nhớ cho mỗi lần gọi hàm.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_vector_pass_by_ref',
            title: 'Phòng Thí Nghiệm 1: So Sánh const vector&lt;int&gt;& O(1) vs Copy Tham Trị O(N)',
            desc: 'Thử gọi hàm đọc a[0] + a[idx] lặp lại Q = 20,000 lần trên một vector cỡ N = 20,000 khi truyền bằng const vector&lt;int&gt;& (chỉ truyền địa chỉ) so với truyền tham trị vector&lt;int&gt; (sao chép cả mảng mỗi lần gọi!).',
            toggles: [
              {
                key: 'passMode',
                label: 'Cách truyền vector vào hàm layPhanTu',
                options: [
                  { value: 'const_ref', text: 'const vector&lt;int&gt;& a — Truyền địa chỉ O(1)/lần', kind: 'ok' },
                  { value: 'by_val', text: 'vector&lt;int&gt; a — Quên & nên copy O(N)/lần', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.passMode === 'const_ref';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

// ĐÚNG: Chỉ truyền địa chỉ gốc -> 1 bước/lần gọi!
long long layPhanTu(const vector<int>& a, int idx) {
    return (long long)a[0] + a[idx];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 20000, q = 20000;
    vector<int> a(n, 7);
    long long tong = 0;
    for (int i = 0; i < q; i++) {
        tong += layPhanTu(a, i % n);
    }
    cout << "Tong = " << tong << ", luot copy = 0" << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

// BẪY TLE: Quên '&' -> mỗi lần gọi phải copy cả 20,000 phần tử!
long long layPhanTu(vector<int> a, int idx) {
    return (long long)a[0] + a[idx];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 20000, q = 20000;
    vector<int> a(n, 7);
    long long tong = 0;
    for (int i = 0; i < q; i++) {
        tong += layPhanTu(a, i % n);
    }
    cout << "Tong = " << tong << ", luot copy = " << 1LL * n * q << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [5] : [5],
                statusOk: isOk,
                statusText: isOk
                  ? 'NHANH O(Q): Chỉ đọc trực tiếp bản gốc qua địa chỉ, 0 lượt sao chép thừa (~0.001s AC)!'
                  : 'CHẬM O(Q * N): Tạo 20,000 bản sao vector = 4*10^8 phần tử được chép! Lên N = Q = 10^5 sẽ nổ 10^10 (TLE)!',
                predictions: [
                  { text: 'Chương trình in Tong = 280000 ngay tức thì với 0 phần tử bị sao chép nhờ const vector&lt;int&gt;&' },
                  { text: 'Vẫn ra 280000 nhưng ngầm sao chép 400 triệu phần tử (4*10^8); nếu N = Q = 10^5 sẽ bị TLE ngay' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nTong = 280000, luot copy = 0\n[Voi N = Q = 100,000: chi mat 100,000 buoc -> AC em ru!]'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nTong = 280000, luot copy = 400000000\n[Canh bao TLE: Voi N = Q = 100,000 se copy 10,000,000,000 phan tu -> TLE chac chan!]',
                explain: isOk
                  ? 'Nhờ dấu & trong const vector&lt;int&gt;& a, hàm chỉ nhận con trỏ/địa chỉ của vector gốc trong O(1), không hề cấp phát hay sao chép thêm bộ nhớ nào.'
                  : 'Thiếu dấu &, tham số vector&lt;int&gt; a ép C++ tạo một bản sao hoàn toàn mới trên Heap ở mỗi vòng lặp for, đẩy độ phức tạp từ O(Q) vọt lên O(Q * N).'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

void themVaXoa(vector<int>& v, vector<int> w) {
    v.push_back(9);
    w.push_back(99);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {1, 2};
    vector<int> b = {3, 4};
    themVaXoa(a, b);
    a.pop_back();
    a.push_back(5);
    cout << (int)a.size() << ' ' << a.back() << ' ' << (int)b.size() << '\\n';
    return 0;
}`,
            q: 'Theo dõi tác động của tham chiếu <code>vector&lt;int&gt;&amp; v</code> và tham trị <code>vector&lt;int&gt; w</code> trong đoạn code trên. Kết quả in ra là gì?',
            options: [
              'In ra 3 9 3 vì v thêm 9 rồi vẫn giữ ở cuối, còn w sửa trực tiếp b',
              'In ra 2 5 3 vì pop_back xóa hai phần tử, còn w thêm 99 vào gốc b',
              'In ra 3 5 2 vì v sửa bản gốc a qua tham chiếu, còn w là bản sao b',
              'In ra 3 5 3 vì cả hai tham số v và w đều cập nhật lên bản gốc b'
            ],
            correct: 2,
            explain: 'v là tham chiếu tới a nên a trở thành {1, 2, 9}; w chỉ là bản sao của b nên b giữ nguyên {3, 4} (size = 2). Sau đó a.pop_back() bỏ 9 còn {1, 2}, rồi a.push_back(5) thành {1, 2, 5} nên size = 3, back = 5. In ra: 3 5 2.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<vector<int>> nhom(3);
    nhom[0].push_back(4);
    nhom[0].push_back(7);
    nhom[2].push_back(1);
    nhom[1].resize(3, 2);
    cout << (int)nhom[0].size() << ' ' << nhom[1][2] << ' ' << (int)nhom[2].size() << '\\n';
    return 0;
}`,
            q: 'Quan sát mảng 2 chiều răng cưa <code>vector&lt;vector&lt;int&gt;&gt; nhom(3)</code> trên đây. Chương trình sẽ in ra ba số nào?',
            options: [
              'In ra 2 2 1 vì nhom[1].resize(3, 2) tạo ba phần tử bằng 2 nên nhom[1][2] là 2',
              'In ra 2 3 1 vì nhom[1].resize(3, 2) tạo hai phần tử bằng 3 nên nhom[1][2] là 3',
              'In ra 2 0 1 vì nhom[1].resize(3, 2) chỉ mở rộng mảng và điền giá trị mặc định 0',
              'In ra 3 2 1 vì ba lệnh push_back đầu tiên đều thêm phần tử vào hàng nhom[0]'
            ],
            correct: 0,
            explain: 'nhom[0] có 2 phần tử {4, 7}; nhom[1].resize(3, 2) tạo 3 ô đều bằng 2 nên nhom[1][2] = 2; nhom[2] có 1 phần tử {1}. Kết quả: 2 2 1.'
          },
          {
            type: 'single',
            q: 'Khi giải bài có $N = 10^5$ phần tử và $Q = 10^5$ truy vấn gọi hàm đọc vector, tại sao bắt buộc dùng <code>const vector&lt;int&gt;&amp; a</code> thay vì <code>vector&lt;int&gt; a</code>?',
            options: [
              'Vì truyền vector&lt;int&gt; a theo tham trị giúp hàm chạy nhanh hơn và tiết kiệm RAM hơn',
              'Vì truyền vector&lt;int&gt; a sẽ xóa mất phần tử cuối của mảng gốc sau mỗi lần gọi hàm',
              'Vì truyền const vector&lt;int&gt;& a cho phép hàm thay đổi trực tiếp dữ liệu mảng gốc',
              'Vì truyền vector&lt;int&gt; a sao chép cả N phần tử mỗi lượt gọi làm tổng tốn O(Q * N)'
            ],
            correct: 3,
            explain: 'Truyền tham trị (không có &) tạo bản sao toàn bộ N phần tử ở mỗi lần gọi hàm, khiến Q truy vấn tốn O(Q * N) = 10^10 thao tác (TLE). Dùng const vector&lt;int&gt;& chỉ truyền địa chỉ trong O(1).'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> về <code>std::vector</code>, vùng nhớ Heap và cách dùng <code>size()</code>?',
            options: [
              'Dữ liệu phần tử của vector nằm trên Heap nên vector&lt;int&gt; a(1000000); trong main() không tràn Stack',
              'Khi vector rỗng, viết v.size() - 1 vẫn cho giá trị -1 an toàn như khi dùng biến kiểu int bình thường',
              'Phải ép kiểu (int)v.size() hoặc viết i + 1 &lt; (int)v.size() để tránh lỗi tràn số không dấu size_t',
              'Hàm nhận vector&lt;int&gt;& a vẫn sao chép lại toàn bộ N phần tử giống tham trị trước khi sửa bản gốc'
            ],
            correct: [0, 2],
            explain: 'A và C đúng. B sai vì v.size() trả về size_t (không dấu), nên 0 - 1 tràn thành ~1.84*10^19! D sai vì tham chiếu & không sao chép mảng mà thao tác trực tiếp trên bản gốc.'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: STD::PAIR & STD::SORT O(N LOG N) VS O(N^2)
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'pair & std::sort O(N log N)',
        title: 'Vấn Đề Nhỏ 2: std::pair&lt;T1, T2&gt; & std::sort — Từ O(N^2) Xuống O(N log N)',
        lead: 'Cách ghim chặt 2 thông tin gắn liền (giá trị + chỉ số gốc, hoặc sức mạnh + phần thưởng) bằng std::pair, quy tắc so sánh từ điển (.first trước, .second sau) và cách std::sort xử lý 10^5 phần tử trong O(N log N).',
        subproblem: {
          title: 'Làm sao sắp xếp danh sách 10^5 thí sinh dưới 1 giây mà không bị TLE như thuật toán O(N^2), đồng thời không làm rơi mất mã số gốc của từng người?',
          desc: 'Dùng std::pair&lt;T1, T2&gt; để đóng gói thông tin đi kèm thành một cặp duy nhất trong vector&lt;pair&lt;...&gt;&gt;, rồi gọi std::sort(v.begin(), v.end()) chạy trong O(N log N).'
        },
        cards: [
          {
            heading: 'std::pair&lt;T1, T2&gt; — Chiếc Kẹp Giấy Giữ Chặt Dữ Liệu Đi Kèm',
            tag: 'Gắn cặp thông tin',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Giả sử lớp có $N$ bạn thi đấu, bạn lưu điểm số vào mảng <code>diem</code> và tên hoặc mã số vào mảng <code>ma</code>. Nếu chỉ sắp xếp mỗi mảng <code>diem</code>, thứ tự điểm thay đổi nhưng mảng <code>ma</code> đứng yên &rarr; <strong>râu ông nọ cắm cằm bà kia</strong>!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Chiếc kẹp giấy đôi <code>std::pair&lt;T1, T2&gt;</code>:</strong> Ghim chặt hai mảnh thông tin vào chung một hồ sơ: mặt trước là <code>.first</code>, mặt sau là <code>.second</code>. Khi di chuyển hồ sơ, cả cặp đi cùng nhau không thể tách rời.</li>
                  <li><strong>Quy tắc xếp chồng mặc định của <code>pair</code>:</strong> C++ tự hiểu cách so sánh hai <code>pair</code>: <strong>xét <code>.first</code> trước</strong>; chỉ khi <code>.first</code> bằng hệt nhau mới xét tiếp <strong><code>.second</code></strong>! Vì vậy, tiêu chí ưu tiên chính luôn đặt ở <code>.first</code> (ví dụ <code>pair&lt;int, string&gt;</code> lưu <code>{chieuCao, tenNui}</code>).</li>
                  <li><strong>Mở rộng 3 thông tin nhanh gọn:</strong> Có thể lồng cặp <code>pair&lt;pair&lt;int, int&gt;, int&gt;</code> hoặc định nghĩa tên ngắn bằng <code>typedef</code> để giữ trọn 3 trường mà chưa cần học cấu trúc phức tạp.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Khởi tạo và sắp xếp vector&lt;pair&gt; trong C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Lưu {sức mạnh quái, điểm thưởng}: đặt sức mạnh ở .first để sort theo sức mạnh!
    vector&lt;pair&lt;int, int&gt;&gt; quai;
    quai.push_back(make_pair(20, 5));
    quai.push_back({10, 12}); // C++11/14 cho phép viết gọn {a, b}
    quai.push_back({15, 8});
    quai.push_back({10, 4});

    // Mặc định sort tăng dần theo .first; nếu .first == 10 thì tăng theo .second!
    sort(quai.begin(), quai.end());

    // Thứ tự sau sort: {10, 4}, {10, 12}, {15, 8}, {20, 5}
    for (int i = 0; i &lt; (int)quai.size(); i++) {
        cout &lt;&lt; quai[i].first &lt;&lt; ' ' &lt;&lt; quai[i].second &lt;&lt; '\\n';
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>std::pair&lt;T1, T2&gt;</code> (Cặp giá trị):</strong> Kiểu dữ liệu ghép 2 thành phần (có thể khác kiểu như <code>pair&lt;int, string&gt;</code>), truy cập qua <code>p.first</code> và <code>p.second</code>, tạo nhanh bằng <code>{a, b}</code> hoặc <code>make_pair(a, b)</code>.</li>
                  <li><strong>Thứ tự từ điển (<code>Lexicographical Order</code>):</strong> Quy tắc so sánh mặc định của <code>pair</code>: so sánh <code>.first</code> trước, nếu bằng nhau mới so sánh <code>.second</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'std::sort — Sắp Xếp O(N log N) Đánh Bại O(N^2) & Nửa Khoảng [begin, end)',
            tag: 'Chuẩn tốc độ CP',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Ở <code>L1-04</code>, bạn biết máy chấm chạy tối đa $\\sim 10^8$ phép tính mỗi giây. Nếu tự viết 2 vòng lặp sắp xếp chọn (Selection Sort) hoặc nổi bọt (Bubble Sort) mất $O(N^2)$:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Với $N = 10^5$, thuật toán $O(N^2)$ phải thực hiện $\\approx 5 \\times 10^9$ phép so sánh (mất ~50 giây &rarr; <strong>TLE!</strong>).</li>
                  <li>Hàm thư viện <strong><code>std::sort</code></strong> (nằm sẵn trong <code>&lt;bits/stdc++.h&gt;</code>) hoạt động theo cơ chế chia để trị thông minh, đạt độ phức tạp đảm bảo <strong>$O(N \\log N)$</strong>: với $N = 10^5$ chỉ tốn khoảng $1.7 \\times 10^6$ bước (~0.02 giây)!</li>
                  <li><strong>Chú ý ranh giới nửa khoảng <code>[begin, end)</code>:</strong> Tham số thứ nhất là vị trí bắt đầu (bao gồm), tham số thứ hai là vị trí <strong>ngay sau phần tử cuối cùng</strong> (không bao gồm). Vì vậy luôn viết <code>sort(v.begin(), v.end())</code> cho <code>vector</code>, hoặc <code>sort(a + 1, a + n + 1)</code> nếu dùng mảng tĩnh 1-indexed!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Các dạng gọi std::sort thông dụng nhất</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;int&gt; a = {40, 10, 50, 20, 30};

    // 1. Sắp xếp toàn bộ vector tăng dần: O(N log N)
    sort(a.begin(), a.end()); // {10, 20, 30, 40, 50}

    // 2. Sắp xếp toàn bộ vector giảm dần (với kiểu chuẩn có sẵn greater&lt;T&gt;)
    sort(a.begin(), a.end(), greater&lt;int&gt;()); // {50, 40, 30, 20, 10}

    // 3. Sắp xếp riêng đoạn chỉ số [1, 4) = chỉ số 1, 2, 3 (bỏ qua chỉ số 0 và 4)
    vector&lt;int&gt; b = {99, 30, 10, 20, 88};
    sort(b.begin() + 1, b.begin() + 4); // {99, 10, 20, 30, 88}

    cout &lt;&lt; a[0] &lt;&lt; ' ' &lt;&lt; b[1] &lt;&lt; ' ' &lt;&lt; b[4] &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>std::sort(first, last)</code>:</strong> Hàm sắp xếp chuẩn STL chạy trong thời gian $O(N \\log N)$ (dùng Introsort trong thư viện chuẩn), sắp xếp phần tử trong nửa khoảng <code>[first, last)</code>.</li>
                  <li><strong>Nửa khoảng <code>[begin, end)</code> (<code>Half-open Range</code>):</strong> Bao gồm vị trí <code>begin</code> nhưng <strong>dừng ngay trước</strong> vị trí <code>end</code>; nên <code>v.end()</code> trỏ tới vị trí giả nằm sau phần tử cuối cùng <code>v[n - 1]</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_pair_sort_speed',
            title: 'Phòng Thí Nghiệm 2: std::sort O(N log N) vs Selection Sort O(N^2) Trên vector&lt;pair&gt;',
            desc: 'Sắp xếp một danh sách các cặp {điểm, mã thí sinh} để xem std::sort bảo toàn đúng mã thí sinh và chênh lệch số phép so sánh khổng lồ so với vòng lặp O(N^2) khi N tăng lên quy mô thi đấu.',
            toggles: [
              {
                key: 'sortAlgo',
                label: 'Thuật toán sắp xếp N = 5,000 phần tử',
                options: [
                  { value: 'std_sort', text: 'std::sort(v.begin(), v.end()) — O(N log N)', kind: 'ok' },
                  { value: 'manual_on2', text: '2 vòng lặp lồng Selection Sort — O(N^2)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.sortAlgo === 'std_sort';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<pair<int, int>> ds = {{85, 1}, {95, 2}, {85, 3}, {70, 4}};
    sort(ds.begin(), ds.end()); // O(N log N): ~61,500 buoc voi N = 5,000!
    cout << "Diem thap nhat: " << ds[0].first << " (ID #" << ds[0].second << ")" << '\\n';
    cout << "Diem cao nhat : " << ds.back().first << " (ID #" << ds.back().second << ")" << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 5000;
    vector<pair<int, int>> a(n);
    for (int i = 0; i < n; i++) a[i] = {n - i, i + 1};
    long long buoc = 0;
    for (int i = 0; i < n; i++) {
        int pos = i;
        for (int j = i + 1; j < n; j++) {
            buoc++;
            if (a[j] < a[pos]) pos = j;
        }
        swap(a[i], a[pos]);
    }
    cout << "So buoc O(N^2) voi N=5000: " << buoc << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [8] : [11, 12, 13, 14, 15, 16, 17, 18],
                statusOk: isOk,
                statusText: isOk
                  ? 'CHUẨN O(N log N): Vừa giữ trọn cặp {điểm, ID}, vừa chỉ tốn ~61,500 bước ở N=5,000 (~1.7*10^6 ở N=10^5 -&gt; AC)!'
                  : 'QUÁ CHẬM O(N^2): Tại N=5,000 đã tốn 12,497,500 bước; khi N=10^5 sẽ nhảy vọt lên 5*10^9 bước (TLE)!',
                predictions: [
                  { text: 'std::sort sắp xếp đúng theo điểm và giữ đúng ID gốc (#4 thấp nhất, #2 cao nhất), sẵn sàng cho N = 10^5' },
                  { text: 'Hai vòng lặp O(N^2) tốn 12,497,500 phép so sánh ngay ở N = 5,000 nên sẽ TLE ở N = 10^5' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nDiem thap nhat: 70 (ID #4)\nDiem cao nhat : 95 (ID #2)\n[Voi N = 100,000: std::sort chi mat ~1.7*10^6 phep so sanh -> AC trong 0.02s!]'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nSo buoc O(N^2) voi N=5000: 12497500\n[Canh bao TLE: Voi N = 100,000 se mat 4,999,950,000 phep so sanh (~50 giay -> TLE)!]',
                explain: isOk
                  ? 'std::sort chạy trong O(N log N) và tự động so sánh .first trước rồi .second sau trên pair, đảm bảo mã ID luôn đi liền với điểm số.'
                  : 'Dù kết quả sắp xếp đúng về mặt logic, thuật toán O(N^2) không thể qua được bài toán N = 10^5 trong giới hạn 1.0 giây (~10^8 phép/giây).'
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
    vector<pair<int, int>> v = {{20, 5}, {10, 8}, {20, 2}, {10, 3}};
    sort(v.begin(), v.end());
    cout << v[0].first << ' ' << v[0].second << ' '
         << v[2].first << ' ' << v[2].second << '\\n';
    return 0;
}`,
            q: 'Sau khi gọi <code>sort(v.begin(), v.end())</code> trên <code>vector&lt;pair&lt;int, int&gt;&gt;</code>, bốn số nào được in ra màn hình?',
            options: [
              'In ra 10 8 20 5 vì sort mặc định ưu tiên sắp .first tăng dần và .second giảm dần',
              'In ra 10 3 20 2 vì sort mặc định sắp .first tăng dần, nếu bằng nhau xét .second',
              'In ra 10 3 20 5 vì sort chỉ sắp theo .first và giữ nguyên thứ tự gốc của .second',
              'In ra 20 2 10 8 vì sort ưu tiên sắp .second tăng dần trước rồi mới xét tới .first'
            ],
            correct: 1,
            explain: 'sort mặc định trên pair sắp .first tăng dần; khi .first bằng nhau thì tiếp tục sắp .second tăng dần. Thứ tự chuẩn là {10, 3}, {10, 8}, {20, 2}, {20, 5}. Nên v[0] = (10, 3) và v[2] = (20, 2).'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {5, 1, 9, 3, 7, 2};
    sort(a.begin() + 1, a.begin() + 5);
    for (int i = 0; i < (int)a.size(); i++) {
        cout << a[i] << (i + 1 < (int)a.size() ? ' ' : '\\n');
    }
    return 0;
}`,
            q: 'Chú ý quy tắc nửa khoảng <code>[begin, end)</code> trong lệnh <code>sort(a.begin() + 1, a.begin() + 5);</code>. Dãy kết quả in ra là gì?',
            options: [
              'In ra 1 3 5 7 9 2 vì nửa khoảng [1, 5) tính luôn phần tử đầu tiên ở vị trí 0',
              'In ra 5 1 2 3 7 9 vì nửa khoảng [1, 5) bao gồm luôn phần tử cuối ở vị trí 5',
              'In ra 1 2 3 5 7 9 vì hàm sort luôn tự động sắp xếp lại toàn bộ phần tử vector',
              'In ra 5 1 3 7 9 2 vì nửa khoảng [1, 5) chỉ sắp xếp các chỉ số 1, 2, 3 và 4'
            ],
            correct: 3,
            explain: 'Nửa khoảng [a.begin() + 1, a.begin() + 5) chỉ gồm 4 phần tử ở chỉ số 1, 2, 3, 4 là {1, 9, 3, 7} -&gt; xếp thành {1, 3, 7, 9}. Hai đầu chỉ số 0 (giá trị 5) và chỉ số 5 (giá trị 2) giữ nguyên!'
          },
          {
            type: 'single',
            q: 'Để đếm số giá trị phân biệt trong dãy $N \\le 2 \\cdot 10^5$ số nguyên (giá trị tới $10^9$) bằng kiến thức đến bài <code>L1-05</code>, cách nào đạt AC dưới 1.0s?',
            options: [
              'Dùng hai vòng lặp lồng O(N^2) kiểm tra xem mỗi số đã xuất hiện phía trước chưa',
              'Tự viết thuật toán Selection Sort O(N^2) rồi đếm các phần tử kề nhau khác nhau',
              'Đưa vào vector, gọi std::sort O(N log N) rồi duyệt một vòng đếm v[i] != v[i - 1]',
              'Tạo mảng tĩnh đếm tần suất a[10^9 + 5] vì giá trị mỗi số có thể lên tới 10^9'
            ],
            correct: 2,
            explain: 'Sau khi std::sort trong O(N log N), mọi số giống nhau đứng cạnh nhau, nên chỉ cần 1 vòng lặp O(N) đếm số lần v[i] != v[i - 1] (khởi tạo đếm = 1 nếu n &gt; 0). Mảng 10^9 gây MLE (~4 GB), còn O(N^2) gây TLE.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là <strong>ĐÚNG</strong> về <code>std::pair</code> và <code>std::sort</code>?',
            options: [
              'Hàm std::sort chạy trong O(N log N), chỉ mất vài triệu bước với N = 10^5 nên tránh được TLE',
              'Khi lưu {diem, id} vào vector&lt;pair&lt;int, int&gt;&gt;, sort mặc định so điểm trước rồi mới so id',
              'Với vector 10 phần tử a, lời gọi sort(a.begin(), a.end() - 1) sẽ sắp xếp đủ cả 10 phần tử',
              'Để sắp xếp vector&lt;int&gt; theo thứ tự giảm dần nhanh gọn, có thể thêm greater&lt;int&gt;() vào sort'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D đều đúng. C sai vì a.end() - 1 trỏ vào phần tử cuối a[9], do nửa khoảng [begin, end) không tính cận phải nên phần tử cuối a[9] bị bỏ sót không được sắp xếp!'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: CUSTOM COMPARATOR & BẪY STRICT WEAK ORDERING (CẤM <= / >=)
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Custom Comparator & Bẫy &lt;=',
        title: 'Vấn Đề Nhỏ 3: Custom Comparator & Quy Tắc Strict Weak Ordering',
        lead: 'Cách viết hàm so sánh tùy biến bool cmp(const T& a, const T& b) cho nhiều tiêu chí trái chiều (như số bài giảm dần, phạt tăng dần) hoặc biểu thức dẫn xuất, và lý do sống còn khiến dấu &lt;= / &gt;= làm sập std::sort.',
        subproblem: {
          title: 'Khi cần sắp xếp theo luật riêng phức tạp (nhiều tiêu chí ngược chiều nhau hoặc theo hiệu b - a), làm sao viết Custom Comparator đúng chuẩn và không làm crash chương trình?',
          desc: 'Truyền hàm bool cmp(const T& a, const T& b) vào tham số thứ 3 của std::sort và tuân thủ tuyệt đối luật Strict Weak Ordering: chỉ dùng &lt; hoặc &gt;, TUYỆT ĐỐI không dùng &lt;= hay &gt;=.'
        },
        cards: [
          {
            heading: 'Viết Trọng Tài So Sánh Đa Tiêu Chí: bool cmp(const T& a, const T& b)',
            tag: 'Luật xếp hạng tùy biến',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Trên bảng xếp hạng thi đấu thật (như Codeforces / ICPC), ta muốn: <strong>người giải nhiều bài hơn đứng trước</strong> (<code>p</code> giảm dần); nếu bằng số bài thì <strong>người có phút phạt ít hơn đứng trước</strong> (<code>t</code> tăng dần); nếu bằng cả hai thì <strong>mã đội nhỏ hơn đứng trước</strong>. Hoặc ta muốn xếp bài toán theo hiệu thời gian <code>(b - a)</code> tăng dần!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Trọng tài so sánh <code>cmp(a, b)</code>:</strong> Hãy hình dung <code>std::sort</code> là một giải đấu loại, mỗi lần đặt 2 đối tượng <code>a</code> và <code>b</code> lên bàn và hỏi trọng tài đúng một câu: <em>"Trong thứ tự cuối cùng, <code>a</code> có phải đứng TRƯỚC <code>b</code> không?"</em>.</li>
                  <li><strong>Cách trả lời theo từng tầng tiêu chí:</strong> Nếu tiêu chí 1 khác nhau (<code>a.p != b.p</code>), phân thắng bại ngay tại tầng 1 (<code>return a.p &gt; b.p;</code>). Chỉ khi tiêu chí 1 bằng nhau mới đi tiếp xuống tiêu chí 2 (<code>return a.t &lt; b.t;</code>).</li>
                  <li><strong>Nhớ truyền <code>const T&amp;</code>:</strong> Khi kiểu <code>T</code> là <code>pair</code> chứa <code>string</code> hay <code>vector</code>, luôn viết <code>const T&amp; a, const T&amp; b</code> để trọng tài nhìn trực tiếp hồ sơ gốc trong $O(1)$ chứ không photocopy lại hàng triệu lần!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Viết Custom Comparator đa tiêu chí &amp; theo hiệu (b - a)</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// Đóng gói: {{soBai, phutPhat}, maDoi}
typedef pair&lt;pair&lt;int, int&gt;, int&gt; DoiThi;

bool cmpXepHang(const DoiThi&amp; a, const DoiThi&amp; b) {
    if (a.first.first != b.first.first) {
        return a.first.first &gt; b.first.first; // Tầng 1: số bài GIẢM dần
    }
    if (a.first.second != b.first.second) {
        return a.first.second &lt; b.first.second; // Tầng 2: phút phạt TĂNG dần
    }
    return a.second &lt; b.second; // Tầng 3: mã đội TĂNG dần
}

// So sánh theo giá trị dẫn xuất: hiệu (second - first) tăng dần
bool cmpChenhLech(const pair&lt;int, int&gt;&amp; x, const pair&lt;int, int&gt;&amp; y) {
    return (x.second - x.first) &lt; (y.second - y.first);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;DoiThi&gt; bxh = {{{4, 150}, 1}, {{5, 220}, 2}, {{4, 120}, 3}};
    sort(bxh.begin(), bxh.end(), cmpXepHang);
    cout &lt;&lt; "Hang 1: Doi #" &lt;&lt; bxh[0].second &lt;&lt; ", Hang 2: Doi #" &lt;&lt; bxh[1].second &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Hàm so sánh tùy biến (<code>Custom Comparator</code>):</strong> Hàm <code>bool cmp(const T&amp; a, const T&amp; b)</code> truyền vào đối số thứ 3 của <code>std::sort</code> (chỉ ghi tên hàm <code>cmp</code>, <strong>không</strong> có ngoặc <code>cmp()</code>), trả về <code>true</code> khi <code>a</code> đứng trước <code>b</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Bẫy Chết Người &lt;= và &gt;= — Quy Tắc Strict Weak Ordering',
            tag: 'Cấm kỵ gây crash RE',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Tại sao một dấu "=" nhỏ xíu trong &lt;= lại làm sập cả chương trình?</span>
                <p>Nhiều bạn nghĩ: <em>"Nếu hai bạn bằng điểm nhau thì bạn nào đứng trước chẳng được, viết <code>return a &lt;= b;</code> hay <code>return a &gt;= b;</code> có sao đâu?"</em>. Sai lầm cực lớn!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Nghịch lý tự đứng trước chính mình:</strong> Nếu trọng tài dùng dấu <code>&lt;=</code>, khi bị hỏi <em>"Số 5 có đứng NGHIÊM NGẶT trước chính số 5 không?"</em>, trọng tài trả lời <code>true</code> (<code>5 &lt;= 5</code> đúng!). Sau đó hỏi ngược lại số 5 thứ hai với số 5 thứ nhất, trọng tài lại bảo <code>true</code>!</li>
                  <li><strong>Hậu quả trên máy chấm:</strong> Khi dữ liệu có nhiều phần tử bằng nhau (ví dụ $N = 10^5$ số cùng bằng $5$), vòng lặp chia nhóm bên trong <code>std::sort</code> tin rằng mọi phần tử đều "nhỏ hơn mốc", nên con trỏ chạy tuốt ra ngoài vùng nhớ của vector và gây sập <strong>Runtime Error (Segmentation Fault)</strong>!</li>
                  <li><strong>Mẹo nhớ vĩnh viễn:</strong> Trong Custom Comparator, câu hỏi là <em>"<code>a</code> có đứng TRƯỚC HẲN <code>b</code> không?"</em> &rarr; Khi bằng nhau, đáp án BẮT BUỘC phải là <strong><code>false</code></strong>! Chỉ dùng <code>&lt;</code> hoặc <code>&gt;</code>, <strong>tuyệt đối cấm <code>&lt;=</code> và <code>&gt;=</code></strong>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Soi trực tiếp cmp sai luật &lt;= vs cmp chuẩn &lt;</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// SAI LUẬT (NGUY HIỂM): cmpSai(5, 5) == true -&gt; sập Segmentation Fault với mảng lớn!
bool cmpSai(int a, int b) {
    return a &lt;= b;
}

// CHUẨN LUẬT: cmpDung(5, 5) == false (phi phản xạ) -&gt; chạy mượt mọi kích thước!
bool cmpDung(int a, int b) {
    return a &lt; b;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector&lt;int&gt; a = {5, 5, 5, 2, 8};
    sort(a.begin(), a.end(), cmpDung);
    cout &lt;&lt; "cmpDung(5, 5) = " &lt;&lt; cmpDung(5, 5)
         &lt;&lt; ", cmpSai(5, 5) = " &lt;&lt; cmpSai(5, 5) &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Thứ tự yếu nghiêm ngặt (<code>Strict Weak Ordering</code>):</strong> Tập quy tắc toán học bắt buộc cho hàm so sánh của <code>std::sort</code>:
                    <br>1) <strong>Phi phản xạ (<code>Irreflexive</code>):</strong> <code>cmp(x, x)</code> phải luôn là <code>false</code> (nghiêm cấm <code>&lt;=</code>, <code>&gt;=</code>).
                    <br>2) <strong>Bất đối xứng (<code>Asymmetric</code>):</strong> Nếu <code>cmp(a, b) == true</code> thì <code>cmp(b, a) == false</code>.
                    <br>3) <strong>Bắc cầu (<code>Transitive</code>):</strong> Nếu <code>a</code> trước <code>b</code> và <code>b</code> trước <code>c</code> thì <code>a</code> trước <code>c</code>.
                  </li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_custom_cmp_strict',
            title: 'Phòng Thí Nghiệm 3: Custom Comparator Chuẩn (&lt; / &gt;) vs Vi Phạm Strict Weak Ordering (&lt;=)',
            desc: 'Kiểm chứng phép thử cmp(x, x) và thứ tự bảng xếp hạng khi dùng dấu nghiêm ngặt (&lt;) so với viết nhầm dấu (&lt;=) ở điều kiện cuối.',
            toggles: [
              {
                key: 'cmpMode',
                label: 'Hàm so sánh truyền vào std::sort',
                options: [
                  { value: 'strict_lt', text: 'Dùng &lt; / &gt; nghiêm ngặt (Strict Weak Ordering)', kind: 'ok' },
                  { value: 'non_strict_le', text: 'Dùng &lt;= ở tiêu chí cuối (Vi phạm luật!)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.cmpMode === 'strict_lt';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

bool cmp(const pair<int, int>& a, const pair<int, int>& b) {
    if (a.first != b.first) return a.first > b.first;
    return a.second < b.second; // CHUẨN: nghiêm ngặt '<', cmp(x, x) == false!
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<pair<int, int>> v = {{5, 120}, {5, 80}, {7, 200}, {5, 120}};
    sort(v.begin(), v.end(), cmp);
    cout << "cmp(x, x) = " << cmp(v[0], v[0]) << '\\n';
    cout << "Hang 1: (" << v[0].first << ", " << v[0].second << ")" << '\\n';
    cout << "Hang 2: (" << v[1].first << ", " << v[1].second << ")" << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

bool cmp(const pair<int, int>& a, const pair<int, int>& b) {
    if (a.first != b.first) return a.first > b.first;
    return a.second <= b.second; // BẪY: '<=' làm cmp(x, x) trả về true!
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<pair<int, int>> v = {{5, 120}, {5, 80}, {7, 200}, {5, 120}};
    sort(v.begin(), v.end(), cmp);
    cout << "cmp(x, x) = " << cmp(v[0], v[0]) << '\\n';
    cout << "Hang 1: (" << v[0].first << ", " << v[0].second << ")" << '\\n';
    cout << "Hang 2: (" << v[1].first << ", " << v[1].second << ")" << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [6],
                statusOk: isOk,
                statusText: isOk
                  ? 'HỢP LỆ (AC): cmp(x, x) = 0 (false), bảng xếp hạng đúng chuẩn và chạy an toàn với mọi N = 10^5!'
                  : 'VI PHẠM STRICT WEAK ORDERING (UB / RE): cmp(x, x) = 1 (true)! Với N = 10^5 phần tử bằng nhau sẽ sập Segmentation Fault!',
                predictions: [
                  { text: 'cmp(x, x) = 0 (hợp lệ), Hạng 1 là (7, 200) và Hạng 2 là (5, 80)' },
                  { text: 'cmp(x, x) = 1 (vi phạm Strict Weak Ordering), tiềm ẩn crash RE trên mảng lớn toàn phần tử bằng nhau' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ncmp(x, x) = 0\nHang 1: (7, 200)\nHang 2: (5, 80)'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ncmp(x, x) = 1\nHang 1: (7, 200)\nHang 2: (5, 80)\n[Canh bao RE/UB: Tren mang lon N = 100,000 phan tu giong nhau, dau <= lam std::sort vuot bien bo nho -> Segmentation fault (Exit 139)!]',
                explain: isOk
                  ? 'Dấu &lt; nghiêm ngặt đảm bảo khi hai đối tượng bằng nhau hoàn toàn thì cmp(x, x) trả về false, giúp thuật toán phân hoạch của std::sort dừng đúng ranh giới.'
                  : 'Dù trên 4 phần tử nhỏ kết quả trông có vẻ bình thường, cmp(x, x) = 1 đã phá vỡ luật phi phản xạ của std::sort. Khi gặp 10^5 phần tử bằng nhau (hoặc bật chế độ kiểm tra debug của máy chấm), chương trình sẽ bị ép dừng (RE).'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

bool cmp(const pair<int, int>& a, const pair<int, int>& b) {
    if (a.first != b.first) return a.first > b.first;
    return a.second < b.second;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<pair<int, int>> v = {{4, 150}, {5, 220}, {4, 120}, {5, 190}};
    sort(v.begin(), v.end(), cmp);
    cout << v[0].first << ' ' << v[0].second << " | "
         << v[2].first << ' ' << v[2].second << '\\n';
    return 0;
}`,
            q: 'Hàm <code>cmp</code> sắp xếp theo <code>.first</code> giảm dần, nếu bằng nhau thì theo <code>.second</code> tăng dần. Kết quả in ra <code>v[0]</code> và <code>v[2]</code> là gì?',
            options: [
              'In ra 5 190 | 4 120 vì xếp .first giảm dần rồi mới xếp .second tăng dần',
              'In ra 5 220 | 4 150 vì xếp .first giảm dần và xếp luôn .second giảm dần',
              'In ra 4 120 | 5 190 vì xếp .first tăng dần rồi mới xếp .second tăng dần',
              'In ra 5 190 | 4 150 vì khi .first bằng 4 thì .second được xếp giảm dần'
            ],
            correct: 0,
            explain: 'Sau khi sắp xếp theo cmp: v[0] = (5, 190), v[1] = (5, 220), v[2] = (4, 120), v[3] = (4, 150). Vậy v[0] là 5 190 và v[2] là 4 120.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

bool cmp(const pair<int, int>& a, const pair<int, int>& b) {
    return (a.second - a.first) < (b.second - b.first);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<pair<int, int>> v = {{3, 10}, {8, 4}, {5, 6}};
    sort(v.begin(), v.end(), cmp);
    cout << v[0].first << ' ' << v[0].second << " | "
         << v[1].first << ' ' << v[1].second << '\\n';
    return 0;
}`,
            q: 'Quan sát Custom Comparator theo biểu thức hiệu <code>(second - first)</code> trên đây. Hai cặp <code>v[0]</code> và <code>v[1]</code> được in ra là gì?',
            options: [
              'In ra 3 10 | 5 6 vì sắp xếp theo giá trị a.first tăng dần từ 3 đến 5',
              'In ra 3 10 | 8 4 vì sắp xếp theo tổng (a.first + a.second) tăng dần',
              'In ra 8 4 | 5 6 vì hiệu (second - first) lần lượt tăng là -4, 1 rồi 7',
              'In ra 5 6 | 8 4 vì hiệu (second - first) lần lượt là 1, -4 rồi tới 7'
            ],
            correct: 2,
            explain: 'Hiệu (second - first) của ba cặp lần lượt là: (3, 10) -&gt; 7; (8, 4) -&gt; -4; (5, 6) -&gt; 1. Sắp tăng dần theo hiệu: {8, 4}, {5, 6}, {3, 10}. Vậy in ra: 8 4 | 5 6.'
          },
          {
            type: 'single',
            q: 'Tại sao viết <code>return a.diem &gt;= b.diem;</code> trong Custom Comparator truyền cho <code>std::sort</code> lại là một lỗi cực kỳ nguy hiểm?',
            options: [
              'Vì dấu &gt;= làm hàm sort tự động chuyển độ phức tạp từ O(N log N) xuống chậm O(N^2)',
              'Vì khi a == b hàm trả về true, vi phạm Strict Weak Ordering và dễ gây crash RE',
              'Vì trình biên dịch C++14 không cho phép dùng toán tử &gt;= trong bất kỳ hàm bool nào',
              'Vì dấu &gt;= chỉ dùng được cho kiểu double chứ không so sánh được số nguyên int'
            ],
            correct: 1,
            explain: 'Khi a và b bằng điểm nhau, &gt;= trả về true vi phạm tính phi phản xạ (cmp(x, x) phải là false) của Strict Weak Ordering, dễ khiến std::sort chạy lố biên bộ nhớ và gây crash Runtime Error.'
          },
          {
            type: 'multiple',
            q: 'Những lưu ý nào sau đây là <strong>ĐÚNG</strong> khi viết Custom Comparator <code>bool cmp(...)</code> cho <code>std::sort</code>?',
            options: [
              'Luôn dùng dấu &lt;= hoặc &gt;= ở điều kiện cuối cùng để tránh bỏ sót hai phần tử bằng nhau',
              'Nên truyền tham số dạng const T& để tránh sao chép nặng O(N) khi T là string hay vector',
              'Khi cần xếp nhiều tiêu chí, chỉ cần viết return a.first &gt; b.first && a.second &lt; b.second;',
              'Hàm cmp(x, x) phải luôn trả về false (phi phản xạ) và chỉ trả true khi x đứng trước y'
            ],
            correct: [1, 3],
            explain: 'B và D đúng. A sai vì &lt;= / &gt;= gây UB/crash. C sai vì nếu a.first == b.first, vế a.first &gt; b.first sai làm cả biểu thức && trả về false bất chấp a.second có nhỏ hơn b.second hay không (vi phạm thứ tự bắc cầu)!'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module cuối - Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l105_missing_ref_vector',
        title: 'Quên Dấu & Khi Truyền Vector Vào Hàm (Mất Thay Đổi & Copy O(N))',
        description: 'Viết hàm congVaSort(a, bonus) để cộng thêm bonus vào mọi phần tử của vector a rồi sắp xếp tăng dần. Chương trình chạy không báo lỗi biên dịch nhưng lại in ra dãy ban đầu chưa hề thay đổi!',
        failingInput: '4 10\n5 2 8 1',
        failingOutput: '5 2 8 1',
        expectedOutput: '11 12 15 18',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

void congVaSort(vector<int> a, int bonus) {
    for (int i = 0; i < (int)a.size(); i++) {
        a[i] += bonus;
    }
    sort(a.begin(), a.end());
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, bonus;
    cin >> n >> bonus;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    congVaSort(a, bonus);
    for (int i = 0; i < n; i++) {
        cout << a[i] << (i + 1 < n ? ' ' : '\\n');
    }
    return 0;
}`,
        bugLine: 4,
        patches: [
          { text: 'Đổi dòng 4 thành void congVaSort(const vector<int>& a, int bonus) { để khóa quyền sửa của hàm' },
          { text: 'Đổi dòng 4 thành void congVaSort(vector<int>& a, int bonus) { để sửa trực tiếp vector gốc trong O(1)' },
          { text: 'Đổi dòng 8 thành sort(a.begin(), a.end(), greater<int>()); để sắp xếp trực tiếp bản gốc' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 4, tham số vector&lt;int&gt; a thiếu dấu & nên hàm chỉ sao chép ra một bản nháp mới, cộng bonus và sort trên bản nháp đó rồi vứt đi! Đổi thành vector&lt;int&gt;& a giúp sửa thẳng bản gốc mà không tốn chi phí copy O(N).'
      },
      {
        id: 'dbg_l105_unsigned_size_trap',
        title: 'Bẫy Tràn Số Không Dấu a.size() - 1 Khi Vector Rỗng (RE)',
        description: 'Cho dãy có n phần tử (0 &lt;= n &lt;= 10^5), đếm số cặp liền kề thỏa mãn a[i] &lt; a[i + 1]. Với mọi test n &gt;= 1 code chạy đúng, nhưng vừa gặp test biên n = 0 (vector rỗng) thì chương trình sập Segmentation Fault!',
        failingInput: '0',
        failingOutput: 'Runtime Error: Segmentation fault (a.size() - 1 tràn thành 18446744073709551615)',
        expectedOutput: '0',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int dem = 0;
    for (size_t i = 0; i < a.size() - 1; i++) {
        if (a[i] < a[i + 1]) dem++;
    }
    cout << dem << '\\n';
    return 0;
}`,
        bugLine: 12,
        patches: [
          { text: 'Đổi dòng 12 thành for (int i = 0; i + 1 < (int)a.size(); i++) { để tránh phép trừ trên size_t' },
          { text: 'Đổi dòng 12 thành for (size_t i = 0; i <= a.size() - 1; i++) { để giữ biến lặp size_t đồng bộ' },
          { text: 'Đổi dòng 9 thành vector<int> a(n + 1); để giữ lại đúng kích thước vector sau khi đọc xong' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 12, a.size() trả về kiểu size_t (số nguyên không dấu). Khi n = 0, 0 - 1 quay vòng thành 2^64 - 1 (~1.84*10^19), khiến vòng lặp đọc lố ra ngoài bộ nhớ và crash RE! Viết i + 1 &lt; (int)a.size() hoàn toàn an toàn ngay cả khi n = 0.'
      },
      {
        id: 'dbg_l105_strict_weak_cmp',
        title: 'Dùng Dấu &lt;= Trong Custom Comparator Gây Sập std::sort (RE)',
        description: 'Cho N (1 &lt;= N &lt;= 10^5) điểm số đều nằm trong một mảng vector, hãy sắp xếp tăng dần bằng hàm so sánh tùy biến cmp. Trên test nhỏ code chạy êm, nhưng gặp test N = 10^5 thí sinh đồng loạt đạt điểm 5 thì chương trình sập Runtime Error!',
        failingInput: '100000',
        failingOutput: 'Runtime Error: Segmentation fault (Exit 139)',
        expectedOutput: '5',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

bool cmp(int x, int y) {
    return x <= y;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    vector<int> a(n, 5);
    sort(a.begin(), a.end(), cmp);
    cout << a[0] << '\\n';
    return 0;
}`,
        bugLine: 5,
        patches: [
          { text: 'Đổi dòng 5 thành return x >= y; để đảo chiều kiểm tra trước khi std::sort chia mảng' },
          { text: 'Đổi dòng 14 thành sort(a.begin(), a.end() - 1, cmp); để chừa lại phần tử cuối tránh vọt biên' },
          { text: 'Đổi dòng 5 thành return x < y; để thỏa mãn luật Strict Weak Ordering (cmp(x, x) == false)' }
        ],
        correctPatch: 2,
        explain: 'Ở dòng 5, return x &lt;= y; làm cmp(5, 5) == true, vi phạm tính phi phản xạ của Strict Weak Ordering. Trên mảng lớn nhiều phần tử bằng nhau, std::sort trượt con trỏ vọt ra khỏi vùng nhớ vector gây Segmentation fault! Đổi thành return x &lt; y; giải quyết triệt để.'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — L1-05 PHA 2 STL)
    // ============================================================================
    practiceProblems: [
      {
        id: 'CSES-1621',
        title: 'Distinct Numbers',
        judge: 'CSES',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1621',
        hint: 'Giới hạn 1 &lt;= n &lt;= 2*10^5, 1 &lt;= x_i &lt;= 10^9, TL 1.0s, ML 512 MB. Chưa cần dùng set/map: đọc vào vector&lt;int&gt; a(n), gọi sort(a.begin(), a.end()) trong O(n log n), rồi duyệt 1 vòng từ i = 1..n-1 đếm số lần a[i] != a[i - 1] (nhớ khởi tạo ans = 1).'
      },
      {
        id: 'CF-230A',
        title: '230A - Dragons',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/230/A',
        hint: 'Giới hạn 1 &lt;= s &lt;= 10^4, 1 &lt;= n &lt;= 10^3, TL 2.0s, ML 256 MB. Dùng vector&lt;pair&lt;int, int&gt;&gt; lưu (x_i, y_i) với x_i là sức mạnh rồng ở .first và y_i là điểm thưởng ở .second. Gọi sort(dragons.begin(), dragons.end()) để đánh từ rồng yếu nhất trước: nếu s &gt; x_i thì s += y_i, ngược lại in NO ngay.'
      },
      {
        id: 'ABC201-B',
        title: 'B - Do you know the second highest mountain?',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/abc201/tasks/abc201_b',
        hint: 'Giới hạn 2 &lt;= N &lt;= 1000, độ dài tên &lt;= 15, chiều cao 1 &lt;= T_i &lt;= 10^5 (phân biệt), TL 2.0s. Đặt chiều cao vào .first và tên núi vào .second trong vector&lt;pair&lt;int, string&gt;&gt;, gọi sort(v.begin(), v.end()) tăng dần (hoặc truyền custom comparator giảm dần) rồi in ra v[N - 2].second!'
      },
      {
        id: 'CF-166A',
        title: '166A - Rank List',
        judge: 'Codeforces',
        tier: 2,
        link: 'https://codeforces.com/problemset/problem/166/A',
        hint: 'Giới hạn 1 &lt;= k &lt;= n &lt;= 50, TL 2.0s, ML 256 MB. Lưu vector&lt;pair&lt;int, int&gt;&gt; gồm (p_i, t_i) và viết Custom Comparator: nếu a.first != b.first thì return a.first &gt; b.first; ngược lại return a.second &lt; b.second; (tuyệt đối không dùng &lt;= / &gt;=). Sau khi sort, đếm số đội giống hệt teams[k - 1].'
      },
      {
        id: 'ABC128-B',
        title: 'B - Guidebook',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc128/tasks/abc128_b',
        hint: 'Giới hạn 1 &lt;= N &lt;= 100, tên thành phố &lt;= 10 ký tự, điểm 0 &lt;= P_i &lt;= 100, TL 2.0s. Dùng vector&lt;pair&lt;pair&lt;string, int&gt;, int&gt;&gt; lưu {{tenThanhPho, diem}, chiSoGoc} (1-indexed) và Custom Comparator truyền const ...&: nếu thành phố khác nhau thì xếp từ điển tăng dần (a.first.first &lt; b.first.first), cùng thành phố thì xếp điểm giảm dần (a.first.second &gt; b.first.second).'
      },
      {
        id: 'CF-1859B',
        title: '1859B - Olya and Game with Arrays',
        judge: 'Codeforces',
        tier: 2,
        link: 'https://codeforces.com/problemset/problem/1859/B',
        hint: 'Giới hạn t, n &lt;= 25,000, mỗi mảng m_i &gt;= 2 và tổng sum(m_i) &lt;= 50,000, a_{i,j} &lt;= 10^9, TL 1.0s, ML 256 MB. Vì từng mảng có kích thước m_i khác nhau nên phải dùng vector&lt;vector&lt;int&gt;&gt; a(n), gọi sort từng mảng a[i], tìm min toàn cục của a[i][0] và tổng các a[i][1] (nhớ dùng long long cho đáp án!).'
      },
      {
        id: 'VNOJ-BWPOINTS',
        title: 'BWPOINTS - VOI 11 Bài 4 (Nối điểm đen trắng)',
        judge: 'VNOJ',
        tier: 3,
        link: 'https://oj.vnoi.info/problem/bwpoints',
        hint: 'Giới hạn n &lt;= 10^5, |a_i|, |b_i| &lt;= 10^9, TL 0.6s. Gom tất cả 2n điểm vào vector&lt;pair&lt;int, int&gt;&gt; (first là tọa độ, second là màu 0/1), gọi sort(pts.begin(), pts.end()) trong O(n log n). Duyệt từ trái sang phải: nếu 2 điểm kề nhau khác màu thì ghép thành 1 đoạn (ans++, nhảy i += 2), ngược lại dịch i += 1.'
      },
      {
        id: 'VNOJ-ACMNB',
        title: 'ACMNB - PreVNOI 2013 (ACM)',
        judge: 'VNOJ',
        tier: 3,
        link: 'https://oj.vnoi.info/problem/acmnb',
        hint: 'Giới hạn n &lt;= 4*10^5 (2n &lt;= 8*10^5 bài toán), a_i, b_i &lt;= 100, TL 1.0s, ML 512 MB. Giả sử ban đầu Tí làm hết 2n bài (tổng a_i). Dùng vector&lt;pair&lt;int, int&gt;&gt; và Custom Comparator cmp(x, y) so sánh (x.second - x.first) &lt; (y.second - y.first) trong O(n log n), rồi chuyển n bài đầu (có b_i - a_i nhỏ nhất) sang cho Tèo làm!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
