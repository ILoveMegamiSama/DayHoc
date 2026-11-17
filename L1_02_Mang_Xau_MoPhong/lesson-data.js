/**
 * DỮ LIỆU BÀI GIẢNG L1-02: MẢNG 1D/2D, XÂU KÝ TỰ & MÔ PHỎNG
 * Tầng 1 — Pha 1 Lớp 9 (Nối tiếp từ L1-01)
 * Quy tắc Pha 1 nghiêm ngặt: khai báo mảng tĩnh toàn cục (const int N = ...; int a[N];) ngoài main(),
 * toàn bộ xử lý nằm trong main(), chỉ dùng mảng tĩnh, string, vòng lặp và rẽ nhánh cơ bản.
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'mang_xau_mo_phong',
    number: 'Bài Học L1-02',
    shortTitle: 'Mảng 1D/2D, Xâu & Mô Phỏng',
    title: 'Bài L1-02: Mảng Tĩnh 1D/2D, Xâu Ký Tự & Tư Duy Mô Phỏng',
    lead: 'Nâng cấp từ việc xử lý từng biến rời rạc ở L1-01 lên quản lý cả triệu phần tử bằng mảng tĩnh toàn cục (const int N), bảng lưới 2 chiều, bảng đếm tần suất, xử lý chuỗi string theo mã ASCII và cài đặt chính xác các bài toán Mô phỏng / Chia trường hợp.',
    modules: [
      // ============================================================================
      // MODULE 1: MẢNG TĨNH 1 CHIỀU TOÀN CỤC & BẪY NGOÀI BIÊN (OUT OF BOUNDS)
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Mảng 1D Toàn Cục & Biên',
        title: 'Vấn Đề Nhỏ 1: Mảng Tĩnh 1 Chiều Toàn Cục & Bẫy Truy Cập Ngoài Biên',
        lead: 'Tại sao phải dùng mảng thay cho biến đơn lẻ khi cần giữ lại dãy số tới 10^6 phần tử, vì sao mảng khổng lồ đặt trong main() bị sập còn đặt toàn cục lại chạy êm, và cách tránh bẫy truy cập ngoài biên (Out of Bounds).',
        subproblem: {
          title: 'Làm sao giữ lại cùng lúc 1.000.000 số nguyên để duyệt đi duyệt lại mà không sập bộ nhớ và không đọc nhầm sang ô nhớ bên cạnh?',
          desc: 'Ở L1-01, một biến x chỉ giữ được 1 số tại một thời điểm — đọc số mới là mất số cũ. Khi bài toán yêu cầu tính điểm trung bình cả trường (N <= 10^6) rồi quay lại đếm số bạn cao hơn trung bình, ta cần chiếc tủ nhiều ngăn đánh số thứ tự đặt tại vùng nhớ rộng rãi ngoài main().'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Chiếc Tủ Ngăn Kéo Đánh Số a[0..n-1] / a[1..n]',
            tag: 'Mảng 1 chiều',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hãy tưởng tượng trong Ngày Hội Học Sinh có <strong>100.000 thí sinh</strong> nộp phiếu điểm. Để đếm xem bao nhiêu bạn cao hơn <em>điểm trung bình của cả hội đồng</em>, <strong>Anh Thật Thà</strong> không thể đọc xong một bạn rồi vứt phiếu đi ngay — anh ấy phải cất toàn bộ phiếu để tính xong tổng điểm rồi quay lại so sánh từng người!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Không ai đặt nổi 100.000 cái tên hộp rời <code>d1, d2, ..., d100000</code>. Thay vào đó, ta đặt đóng <strong>một chiếc tủ dài có các ngăn kéo liền nhau</strong>, dán chung tên <code>a</code> và đánh số thứ tự từng ngăn trong ngoặc vuông <code>[i]</code>.</li>
                  <li><strong>Hai cách đánh số ngăn tủ:</strong> Quy ước chuẩn trong C++ đếm từ <code>0</code> (tủ <code>n</code> ngăn gồm <code>a[0]</code> đến <code>a[n - 1]</code>). Khi đi thi CP, ta thường đóng dư vài ngăn (ví dụ <code>1e6 + 5</code> ngăn) để dùng tự nhiên từ ngăn <code>a[1]</code> tới <code>a[n]</code> cho khớp với đề bài!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Khai báo mảng tĩnh toàn cục phía trên <code>main()</code>, đọc đủ <code>n</code> phần tử để tính tổng, rồi duyệt lại lần thứ 2 để đếm và in ngược:</p>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const int N = 1e6 + 5; // Đóng dư 5 ngăn để đánh số thoải mái từ 1 đến 10^6
int a[N];              // Đặt NGOÀI main()!

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin &gt;&gt; n;

    long long tong = 0;
    for (int i = 1; i &lt;= n; i++) {
        cin &gt;&gt; a[i];
        tong += a[i];
    }

    // Duyệt LẠI mảng lần 2 (điều mà 1 biến đơn lẻ ở L1-01 không làm được!)
    // Mẹo Pha 1: a[i] &gt; tong / n  &lt;=&gt;  1LL * a[i] * n &gt; tong (tránh sai số số thực)
    int dem = 0;
    for (int i = 1; i &lt;= n; i++) {
        if (1LL * a[i] * n &gt; tong) {
            dem++;
        }
    }
    cout &lt;&lt; dem &lt;&lt; '\\n';

    // In ngược dãy từ n về 1
    for (int i = n; i &gt;= 1; i--) {
        cout &lt;&lt; a[i];
        if (i &gt; 1) {
            cout &lt;&lt; ' ';
        }
    }
    cout &lt;&lt; '\\n';
    return 0;
}</code></pre>
                <p style="margin-top: 8px; font-size: 13.5px; color: var(--muted);">
                  <strong>Lưu ý cách in dấu cách:</strong> Tách riêng <code>if (i &gt; 1) cout &lt;&lt; ' ';</code> giúp tránh thừa một dấu cách ở cuối dòng (hoặc nhớ luôn in xuống dòng <code>'\\n'</code> khi kết thúc).
                </p>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Mảng tĩnh 1 chiều (<code>1D Static Array</code>):</strong> Tập hợp cố định các ô nhớ cùng kiểu dữ liệu xếp liên tiếp trên RAM, cho phép đọc/ghi trực tiếp vào vị trí <code>a[i]</code> trong đúng 1 bước ($O(1)$).</li>
                  <li><strong>Chỉ số (<code>Index</code>):</strong> Số thứ tự đặt trong ngoặc vuông <code>[...]</code>. Với mảng <code>int a[N];</code>, chỉ số hợp lệ tuyệt đối là từ <code>0</code> đến <code>N - 1</code>.</li>
                  <li><strong>Hằng số kích thước (<code>const int N = ...;</code>):</strong> Cách đặt tên hằng kích thước chuẩn CP (như <code>1e6 + 5</code> hay <code>1000005</code>) để dễ chỉnh sửa và tránh gõ nhầm số <code>0</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Bí Mật Bộ Nhớ: Tại Sao Phải Đặt Mảng Ngoài main() & Bẫy Ngoài Biên (Out of Bounds)',
            tag: 'An toàn bộ nhớ',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Chiếc bàn gấp chật hẹp trong phòng vs Nhà kho khổng lồ bên ngoài</span>
                <p>Hãy nhớ lại hình ảnh chiếc bàn làm việc RAM. Bên trong căn phòng <code>main()</code>, Anh Thật Thà chỉ có một chiếc <strong>bàn gấp cục bộ rất nhỏ (~8 MB)</strong>. Còn ở bên ngoài và phía trên <code>main()</code> là <strong>nhà kho dữ liệu tĩnh cực rộng (~256 MB)</strong>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Tai họa 1 — Kê tủ khổng lồ lên bàn gấp trong <code>main()</code>:</strong> Một số <code>int</code> chiếm 4 byte. Một tủ <code>3.000.000</code> số <code>int</code> nặng tới <strong>~12 MB</strong> — đặt lên chiếc bàn 8 MB trong <code>main()</code> làm bàn sập gãy ngay lập tức (lỗi <code>Segmentation Fault</code> / <code>Runtime Error</code>)! Còn đặt ra nhà kho ngoài <code>main()</code> thì chứa thoải mái hàng chục triệu số!</li>
                  <li><strong>Tai họa 2 — Tủ trong <code>main()</code> đầy rác vs Kho ngoài tự dọn sạch:</strong> Bất kỳ mảng nào đặt trong <code>main()</code> mà quên gán <code>= 0</code> đều chứa sẵn <em>giá trị rác ngẫu nhiên</em> từ lượt làm việc cũ. Ngược lại, mảng toàn cục ngoài <code>main()</code> luôn được hệ thống <strong>tự động dọn sạch bằng <code>0</code></strong>!</li>
                  <li><strong>Tai họa 3 — Thò tay ra ngoài biên tủ (<code>Out of Bounds</code>):</strong> Tủ chỉ có <code>n</code> ngăn mà bạn viết <code>for (int i = 1; i &lt;= n; i++)</code> rồi bên trong lại nhìn sang <code>a[i + 1]</code>! Khi <code>i = n</code>, lệnh đó đọc sang ngăn <code>a[n + 1]</code> chưa hề nhập (mang số <code>0</code> hoặc rác), làm sai kết quả nếu dãy có số âm, hoặc sập hẳn nếu vượt quá kích thước mảng <code>N</code>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: So sánh code chuẩn CP và lỗi sập / ngoài biên</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// ĐÚNG CHUẨN: Đặt toàn cục ngoài main() -> Vùng nhớ tĩnh ~256MB, tự gán toàn 0!
const int N = 1e6 + 5;
int a[N];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // NGUY HIỂM: Nếu đặt int b[3000000]; Ở ĐÂY -> Sập ngay vì tràn ngăn xếp cục bộ ~8MB!
    // NGUY HIỂM: Nếu đặt int c[100]; ở đây -> 100 ô chứa rác ngẫu nhiên (không phải 0)!

    int n;
    cin &gt;&gt; n;
    for (int i = 1; i &lt;= n; i++) {
        cin &gt;&gt; a[i];
    }

    // Kiểm tra cặp liên tiếp (a[i], a[i + 1]) AN TOÀN BIÊN:
    // PHẢI dừng ở i &lt; n (tức i chạy từ 1 đến n - 1) để không chạm sang a[n + 1]!
    int demCapTang = 0;
    for (int i = 1; i &lt; n; i++) {
        if (a[i] &lt; a[i + 1]) {
            demCapTang++;
        }
    }
    cout &lt;&lt; demCapTang &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Vùng nhớ dữ liệu tĩnh toàn cục (<code>Global Static Memory</code>):</strong> Nơi lưu các biến và mảng khai báo bên ngoài <code>main()</code>; dung lượng rất lớn (thường dùng tới giới hạn bộ nhớ đề bài ~256 MB) và mọi phần tử tự động mang giá trị <code>0</code> ban đầu.</li>
                  <li><strong>Vùng nhớ ngăn xếp cục bộ (<code>Local Stack Memory</code>):</strong> Bàn làm việc nhỏ hẹp của riêng hàm <code>main()</code> (~8 MB trên máy chấm tiêu chuẩn); chỉ nên chứa vài biến đơn lẻ như <code>n, i, tong</code>, tuyệt đối không chứa mảng lớn!</li>
                  <li><strong>Truy cập ngoài biên (<code>Out of Bounds</code>):</strong> Đọc hoặc ghi vào vị trí chỉ số âm hoặc &ge; kích thước mảng (hoặc vượt quá số phần tử <code>n</code> đã nhập như <code>a[n + 1]</code>), gây sai âm thầm hoặc <code>RE</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_global_vs_local_array',
            title: 'Phòng Thí Nghiệm 1: Đặt Mảng 12 MB Trong main() (Sập Stack) vs Toàn Cục Ngoài main()',
            desc: 'Quan sát chuyện gì xảy ra khi khai báo mảng 3.000.000 phần tử int (~12 MB) bên trong hàm main() so với đưa ra làm mảng tĩnh toàn cục bên ngoài main().',
            toggles: [
              {
                key: 'scope',
                label: 'Vị trí khai báo mảng a[3000005]',
                options: [
                  { value: 'global_ok', text: 'Đặt toàn cục ngoài main() (Vùng tĩnh ~256MB)', kind: 'ok' },
                  { value: 'local_bug', text: 'Đặt cục bộ trong main() (Vùng ngăn xếp ~8MB)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.scope === 'global_ok';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

const int N = 3000005; // ~12 MB: an toan tuyet doi o vung tinh toan cuc!
int a[N];              // Moi o tu dong bang 0!

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    a[1] = 42;
    cout << "a[0]=" << a[0] << " a[1]=" << a[1] << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int a[3000005]; // ~12 MB dat trong main(): VUOT NGUONG ~8 MB!
    a[1] = 42;
    cout << "a[0]=" << a[0] << " a[1]=" << a[1] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [4, 5] : [7],
                statusOk: isOk,
                statusText: isOk
                  ? 'Chạy êm ru (AC): Mảng 12 MB nằm gọn trong vùng dữ liệu tĩnh ~256 MB và a[0] tự sạch bằng 0'
                  : 'SẬP CHƯƠNG TRÌNH (RE / Segmentation Fault): 12 MB vượt quá vùng nhớ ngăn xếp cục bộ ~8 MB của main()!',
                predictions: [
                  { text: 'Chương trình khởi tạo a[0] = 0, chạy bình thường và in ra "a[0]=0 a[1]=42"' },
                  { text: 'Chương trình bị sập ngay khi vào main() vì tràn vùng nhớ cục bộ ~8 MB (Segmentation Fault)' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\na[0]=0 a[1]=42'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nSegmentation fault (core dumped)\n[Ket qua may cham: RE - Runtime Error do tran ngan xep cuc bo ~8MB!]',
                explain: isOk
                  ? 'Đặt const int N = 3000005; int a[N]; phía trên main() giúp hệ điều hành cấp bộ nhớ từ vùng dữ liệu tĩnh (~256 MB) và tự động điền số 0 vào tất cả các ô.'
                  : 'Mỗi phần tử int tốn 4 byte, nên 3.000.005 phần tử tốn ~12 MB. Ngăn xếp cục bộ của hàm main() mặc định chỉ rộng ~8 MB trên máy chấm, nên vừa bước vào main() là chương trình bị hệ điều hành ngắt ngay lập tức (RE)!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;
const int N = 105;
int a[N];
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 4;
    a[0] = 10; a[1] = 20; a[2] = 30; a[3] = 40;
    cout << a[0] + a[n - 1] << ' ' << a[n] << '\\n';
    return 0;
}`,
            q: 'Mảng toàn cục <code>a[N]</code> được khai báo phía trên <code>main()</code>. Với <code>n = 4</code> đã gán từ <code>a[0]</code> tới <code>a[3]</code>, đoạn mã trên in ra hai giá trị nào?',
            options: [
              'In ra 40 0 vì a[n - 1] bằng 30 và phần tử a[n] ngoài biên toàn cục bằng 0',
              'In ra 50 40 vì phần tử a[n] tự động sao chép lại giá trị của phần tử cuối a[n - 1]',
              'In ra 50 0 vì a[0] + a[3] bằng 50 và ô nhớ a[4] toàn cục được khởi tạo bằng 0',
              'In ra 30 40 vì chỉ số mảng bắt đầu đếm từ 1 nên a[0] không được tính vào tổng'
            ],
            correct: 2,
            explain: 'Với n = 4, a[0] = 10 và a[n - 1] = a[3] = 40 nên tổng a[0] + a[3] = 50. Ô nhớ a[n] = a[4] chưa từng được gán, nhưng vì mảng a đặt ở toàn cục nên giá trị mặc định là 0.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;
const int N = 105;
int a[N];
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 4;
    a[1] = 5; a[2] = 2; a[3] = 7; a[4] = 9;
    int dem = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] < a[i + 1]) dem++;
    }
    cout << dem << '\\n';
    return 0;
}`,
            q: 'Theo dõi vòng lặp <code>for (int i = 1; i &lt; n; i++)</code> trên mảng <code>a[1..4] = {5, 2, 7, 9}</code>. Giá trị <code>dem</code> in ra là bao nhiêu?',
            options: [
              'In ra số 2 vì chỉ có hai cặp kề thỏa mãn là (a[2], a[3]) và (a[3], a[4])',
              'In ra số 3 vì vòng lặp so sánh cả cặp cuối cùng là (a[4], a[5]) với a[5] = 0',
              'In ra số 1 vì điều kiện i < n bỏ qua lượt i = 3 nên chỉ kịp xét tới a[3]',
              'In ra số 4 vì mọi phần tử từ 1 đến 4 đều tham gia tăng biến đếm lên 1'
            ],
            correct: 0,
            explain: 'Vòng lặp chạy với i = 1, 2, 3 (dừng trước n = 4). Cặp (5, 2) sai; cặp (2, 7) đúng (dem = 1); cặp (7, 9) đúng (dem = 2). Điều kiện i < n giữ an toàn không chạm vào a[5].'
          },
          {
            type: 'single',
            q: 'Tại sao trong Pha 1 Lớp 9, mảng lớn cỡ <code>const int N = 1e6 + 5; int a[N];</code> phải khai báo ở <strong>toàn cục phía trên <code>main()</code></strong> thay vì khai báo bên trong <code>main()</code>?',
            options: [
              'Vì ngôn ngữ C++14 cấm hoàn toàn việc khai báo mảng tĩnh có kích thước cố định bên trong main()',
              'Vì mảng đặt trong main() chỉ đọc được tối đa 100 phần tử rồi tự động khóa truy cập phần tử sau',
              'Vì khai báo mảng ngoài main() làm tăng tốc độ CPU chạy nhanh hơn gấp đôi so với bên trong main()',
              'Vì vùng nhớ cục bộ của main() rất hẹp (~8MB) dễ sập, còn vùng tĩnh toàn cục rộng (~256MB) và tự sạch 0'
            ],
            correct: 3,
            explain: 'Vùng nhớ ngăn xếp cục bộ của main() chỉ khoảng 8 MB nên chứa mảng lớn sẽ sập (RE) và chứa rác nếu quên gán = 0; đặt toàn cục dùng vùng nhớ tĩnh ~256 MB và được khởi tạo toàn 0.'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> về mảng tĩnh 1 chiều trong C++?',
            options: [
              'Mảng kích thước N phần tử có các chỉ số hợp lệ theo chuẩn 0-based nằm từ 0 đến N - 1',
              'Mảng khai báo bên trong hàm main() luôn được hệ thống tự động gán toàn bộ các ô bằng 0',
              'Khai báo dư vài phần tử như const int N = 1e6 + 5 giúp dùng chỉ số 1..n an toàn không chạm biên',
              'Truy cập phần tử ngoài biên như a[-1] hoặc a[N] gây lỗi bộ nhớ hoặc sai dữ liệu khó lường'
            ],
            correct: [0, 2, 3],
            explain: 'A, C và D đều chính xác. B sai vì biến và mảng khai báo bên trong hàm main() nếu không khởi tạo (= {0}) sẽ mang giá trị rác ngẫu nhiên trong RAM.'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: MẢNG 2 CHIỀU (BẢNG LƯỚI) & MẢNG ĐẾM TẦN SUẤT (FREQUENCY ARRAY)
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Mảng 2D & Mảng Đếm',
        title: 'Vấn Đề Nhỏ 2: Mảng 2 Chiều (Lưới Ô Vuông) & Mảng Đếm Tần Suất',
        lead: 'Biểu diễn bảng cờ / sơ đồ hàng-cột bằng mảng 2 chiều a[i][j], quét 4 ô lân cận gọn gàng bằng mảng hướng đi dr[], dc[], và đếm tần suất xuất hiện trong O(1) mỗi phần tử bằng Frequency Array.',
        subproblem: {
          title: 'Làm sao quản lý bản đồ lưới R hàng C cột và thống kê tần suất 100.000 mã số mà không bị chạy chậm O(N^2) hay nhầm bộ nhớ?',
          desc: 'Khi dữ liệu có tọa độ 2 chiều (hàng, cột) hoặc cần trả lời ngay "Số x xuất hiện bao nhiêu lần?", ta nâng cấp chiếc tủ 1 hàng thành kệ lưới 2 chiều a[i][j] và tạo chiếc bảng điểm danh cnt[x] lấy giá trị làm số thứ tự ngăn.'
        },
        cards: [
          {
            heading: 'Mảng 2 Chiều a[i][j]: Kệ Lưới Hàng–Cột & Kỹ Thuật Quét 4 Hướng',
            tag: 'Mảng 2 chiều',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Sơ đồ ghế hội trường R hàng C cột &amp; nhìn sang 4 ô kề</span>
                <p>Hội trường ngày hội xếp ghế thành <code>R</code> hàng ngang và <code>C</code> cột dọc như bàn cờ. Nếu chỉ dùng một mảng 1 chiều dài ngoằng, mỗi lần muốn tìm bạn ngồi ở <em>hàng 3, cột 4</em> sẽ rất rối. Ta dựng luôn một chiếc <strong>kệ lưới 2 chiều</strong>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Quy tắc vàng:</strong> Luôn đọc <strong>Hàng trước, Cột sau</strong> (<code>grid[hang][cot]</code>). Vòng lặp ngoài chạy qua từng hàng <code>i = 1..r</code>, vòng lặp trong đi qua từng cột <code>j = 1..c</code>.</li>
                  <li><strong>Nhìn 4 ô xung quanh (Lên, Xuống, Trái, Phải):</strong> Đứng tại ô <code>(sr, sc)</code>, 4 ô kề là <code>(sr - 1, sc)</code>, <code>(sr + 1, sc)</code>, <code>(sr, sc - 1)</code>, <code>(sr, sc + 1)</code>. Nhưng nếu bạn đứng sát mép tường (như hàng <code>1</code> mà bước Lên thành hàng <code>0</code>), bạn <strong>bắt buộc phải kiểm tra còn nằm trong bảng <code>[1..R] &times; [1..C]</code> không</strong> trước khi mở ô đó!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào C++ với mảng hướng đi dr[], dc[]</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const int MAXR = 505;
int grid[MAXR][MAXR]; // 505 * 505 * 4 byte ~ 1 MB (an toàn!)
// CẢNH BÁO MLE: Đừng khai báo int grid[10005][10005]; (tốn ~400 MB &gt; 256 MB)!

// 4 hướng đi chuẩn CP: Lên (-1, 0), Xuống (+1, 0), Trái (0, -1), Phải (0, +1)
const int dr[4] = {-1, 1, 0, 0};
const int dc[4] = {0, 0, -1, 1};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int r, c, sr, sc;
    cin &gt;&gt; r &gt;&gt; c &gt;&gt; sr &gt;&gt; sc;
    for (int i = 1; i &lt;= r; i++) {
        for (int j = 1; j &lt;= c; j++) {
            cin &gt;&gt; grid[i][j];
        }
    }

    // Quét 4 ô lân cận bằng 1 vòng lặp duy nhất + kiểm tra biên chặt chẽ
    long long tongKe = 0;
    for (int d = 0; d &lt; 4; d++) {
        int nr = sr + dr[d];
        int nc = sc + dc[d];
        if (nr &gt;= 1 &amp;&amp; nr &lt;= r &amp;&amp; nc &gt;= 1 &amp;&amp; nc &lt;= c) {
            tongKe += grid[nr][nc];
        }
    }
    cout &lt;&lt; tongKe &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Mảng 2 chiều / Ma trận (<code>2D Array / Matrix</code>):</strong> Bảng dữ liệu gồm <code>R</code> hàng và <code>C</code> cột, kích thước bộ nhớ tính bằng <code>R &times; C &times; sizeof(kieu)</code>.</li>
                  <li><strong>Mảng hướng đi (<code>Direction Arrays</code>):</strong> Cặp mảng <code>dr[4], dc[4]</code> gom 4 nhánh kiểm tra Lên/Xuống/Trái/Phải vào chung một vòng lặp, giảm 4 lần nguy cơ gõ nhầm dấu <code>+/-</code>.</li>
                  <li><strong>Lỗi tràn giới hạn bộ nhớ (<code>MLE - Memory Limit Exceeded</code>):</strong> Khai báo mảng 2D quá khổng lồ (ví dụ <code>10005 &times; 10005</code> số <code>int</code> = 400 MB) vượt mức 256 MB của máy chấm.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Mảng Đếm Tần Suất & Đánh Dấu (Frequency Array): Điểm Danh Tức Thì O(1)',
            tag: 'Mảng đếm tần suất',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Bảng điểm danh gắn sẵn số báo danh</span>
                <p>Có <code>100.000</code> học sinh quẹt thẻ mang số báo danh từ <code>1</code> đến <code>100.000</code>. Muốn tìm số nào xuất hiện nhiều nhất hoặc bị vắng mặt:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Cách chậm (TLE):</strong> Với từng số <code>1..100.000</code>, lại chạy quét lại cả <code>100.000</code> phiếu &rarr; mất $10^{10}$ phép tính (hết giờ!).</li>
                  <li><strong>Cách thần tốc (Mảng đếm tần suất):</strong> Ta đặt 1 dãy tủ <code>cnt[1..100000]</code> toàn cục đều bằng <code>0</code>. Mỗi lần đọc được mã <code>x</code>, ta bước thẳng tới ngăn số <code>x</code> và gạch thêm 1 vạch: <code>cnt[x]++</code>! Chỉ cần 1 vòng lặp duy nhất là thống kê xong toàn bộ!</li>
                  <li><strong>Hai điều kiện bắt buộc:</strong> (1) Giá trị <code>x</code> phải không âm và đủ nhỏ (thường $0 \\le x \\le 10^6$ — nếu $x$ tới $10^9$ thì không đủ RAM mở tủ!); (2) Nếu chạy nhiều bộ test <code>while (t--)</code>, nhớ <strong>xóa sạch về <code>0</code></strong> các ô đã dùng trước khi sang test mới!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào code C++ cho nhiều bộ test</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const int MAXV = 1000005;
int cnt[MAXV]; // Toàn cục: tự bằng 0 ở test đầu tiên

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int t;
    cin &gt;&gt; t;
    while (t--) {
        int n;
        cin &gt;&gt; n;
        int maxVal = 0;
        for (int i = 1; i &lt;= n; i++) {
            int x;
            cin &gt;&gt; x;
            cnt[x]++; // Lấy giá trị x làm chỉ số ngăn tủ!
            if (x &gt; maxVal) maxVal = x;
        }

        int soNhieuNhat = 0;
        for (int v = 1; v &lt;= maxVal; v++) {
            if (cnt[v] &gt; cnt[soNhieuNhat]) {
                soNhieuNhat = v;
            }
        }
        cout &lt;&lt; soNhieuNhat &lt;&lt; " " &lt;&lt; cnt[soNhieuNhat] &lt;&lt; '\\n';

        // QUAN TRỌNG: Xóa sạch lại về 0 trước khi chuyển sang bộ test kế tiếp!
        for (int v = 0; v &lt;= maxVal; v++) {
            cnt[v] = 0;
        }
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Mảng đếm tần suất (<code>Frequency Array</code>):</strong> Mảng <code>cnt[x]</code> lưu số lần xuất hiện của giá trị <code>x</code>.</li>
                  <li><strong>Mảng đánh dấu (<code>Marking / Visited Array</code>):</strong> Mảng <code>bool daCo[x]</code> hoặc <code>bool visited[x]</code> chỉ lưu <code>true/false</code> xem giá trị <code>x</code> (hoặc ô lưới) đã xuất hiện/đi qua chưa.</li>
                  <li><strong>Dọn sạch giữa các bộ test (<code>Reset between Testcases</code>):</strong> Mảng toàn cục chỉ tự gán <code>0</code> một lần duy nhất lúc khởi chạy chương trình; khi dùng <code>while (t--)</code>, lập trình viên phải tự xóa lại những ô đã dùng.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_freq_array_reset',
            title: 'Phòng Thí Nghiệm 2: Quên Reset Mảng Đếm Toàn Cục Giữa Các Bộ Test (while t--)',
            desc: 'Thử nghiệm kết quả trên 2 bộ test: Test 1 là dãy {5, 5}, Test 2 là dãy {3, 3, 5}. Xem điều gì xảy ra nếu quên dọn sạch cnt[] sau Test 1!',
            toggles: [
              {
                key: 'resetMode',
                label: 'Xử lý mảng đếm cnt[] sau mỗi bộ test',
                options: [
                  { value: 'reset_ok', text: 'Gán lại cnt[v] = 0 sau khi xong mỗi test', kind: 'ok' },
                  { value: 'no_reset', text: 'Quên reset cnt[] (tưởng toàn cục tự về 0 mỗi lượt)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.resetMode === 'reset_ok';
              const code = `#include <bits/stdc++.h>
using namespace std;

const int MAXV = 100005;
int cnt[MAXV]; // Chi tu khoi tao = 0 MOT LAN khi bat dau chuong trinh!

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Test 1 doc day {5, 5}
    cnt[5] += 2;
${isOk ? '    for (int v = 0; v <= 5; v++) cnt[v] = 0; // Don sach sau Test 1!' : '    // QUEN xoa cnt[v] = 0 sau Test 1 -> cnt[5] van giu gia tri 2!'}
    // Test 2 doc day {3, 3, 5}
    cnt[3] += 2;
    cnt[5] += 1;
    cout << "cnt[3]=" << cnt[3] << " cnt[5]=" << cnt[5] << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [12],
                statusOk: isOk,
                statusText: isOk
                  ? 'Đúng chuẩn (AC): Test 2 đếm sạch sẽ ra cnt[3]=2, cnt[5]=1 (số 3 nhiều nhất)'
                  : 'SAI KẾT QUẢ (WA): Dữ liệu Test 1 bị rò sang Test 2 khiến cnt[5] cộng dồn thành 3!',
                predictions: [
                  { text: 'Mảng đếm ở Test 2 cho kết quả đúng là cnt[3]=2 và cnt[5]=1' },
                  { text: 'Số 5 bị cộng dồn từ Test 1 nên cnt[5] bị vọt lên thành 3 (sai đáp án)' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 main.cpp -o main && ./main\ncnt[3]=2 cnt[5]=1'
                  : '$ g++ -std=c++14 main.cpp -o main && ./main\ncnt[3]=2 cnt[5]=3\n[Canh bao: So 5 tu Test 1 van nam trong cnt[5] lam hong dap an Test 2!]',
                explain: isOk
                  ? 'Sau khi hoàn tất Test 1, vòng lặp đặt lại các ô đã dùng của cnt[] về 0 giúp Test 2 bắt đầu với bảng điểm danh hoàn toàn trống.'
                  : 'Mảng toàn cục chỉ được hệ thống dọn về 0 một lần duy nhất trước khi hàm main() chạy. Sang bộ test thứ 2 của while (t--), cnt[5] vẫn đang giữ số 2 từ Test 1 nên khi tăng thêm 1 nó biến thành 3!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;
const int MAXR = 10;
int g[MAXR][MAXR];
const int dr[4] = {-1, 1, 0, 0};
const int dc[4] = {0, 0, -1, 1};
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    g[1][2] = 5; g[2][1] = 3; g[2][3] = 7; g[3][2] = 4;
    int sr = 2, sc = 2, s = 0;
    for (int d = 0; d < 4; d++) {
        int nr = sr + dr[d], nc = sc + dc[d];
        if (nr >= 1 && nr <= 2 && nc >= 1 && nc <= 3) s += g[nr][nc];
    }
    cout << s << '\\n';
    return 0;
}`,
            q: 'Quan sát kỹ điều kiện biên bảng <code>2 &times; 3</code> (<code>nr &lt;= 2 &amp;&amp; nc &lt;= 3</code>) quanh ô <code>(2, 2)</code>. Giá trị <code>s</code> in ra là bao nhiêu?',
            options: [
              'In ra 19 vì vòng lặp cộng đủ cả 4 ô kề gồm 5 + 4 + 3 + 7 quanh tâm (2, 2)',
              'In ra 15 vì hướng đi xuống ra hàng 3 vượt biên nr <= 2 nên chỉ cộng 5 + 3 + 7',
              'In ra 12 vì ô bên phải (2, 3) vượt quá số hàng nên chỉ cộng được hai ô 5 + 7',
              'In ra 10 vì hai hướng lên và xuống đối xứng triệt tiêu nhau chỉ còn hướng ngang'
            ],
            correct: 1,
            explain: '4 ô kề của (2, 2) lần lượt là (1, 2)=5, (3, 2)=4, (2, 1)=3, (2, 3)=7. Vì bảng chỉ có 2 hàng (nr <= 2) nên ô (3, 2) bị loại, tổng cộng được 5 + 3 + 7 = 15.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;
const int MAXV = 105;
int cnt[MAXV];
int b[5] = {4, 2, 4, 1, 4};
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    for (int i = 0; i < 5; i++) cnt[b[i]]++;
    int ans = 0;
    for (int v = 1; v <= 4; v++) {
        if (cnt[v] > cnt[ans]) ans = v;
    }
    cout << ans << " " << cnt[ans] << '\\n';
    return 0;
}`,
            q: 'Mảng đếm <code>cnt</code> toàn cục thống kê dãy <code>b = {4, 2, 4, 1, 4}</code>. Kết quả in ra <code>ans</code> và <code>cnt[ans]</code> là gì?',
            options: [
              'In ra 1 1 vì số 1 được cập nhật đầu tiên và điều kiện > không đổi nữa',
              'In ra 4 5 vì vòng lặp đếm cả 5 phần tử trong dãy b vào ô nhớ cnt[4]',
              'In ra 2 3 vì số 2 nằm ở vị trí có tần suất bằng với phần tử lớn nhất',
              'In ra 4 3 vì giá trị 4 xuất hiện nhiều nhất với đúng 3 lần trong dãy b'
            ],
            correct: 3,
            explain: 'Sau vòng đếm: cnt[0]=0, cnt[1]=1, cnt[2]=1, cnt[3]=0, cnt[4]=3. Ở vòng thứ 2, ans cập nhật lên 1 (cnt=1) rồi cập nhật tiếp lên 4 (cnt=3). Kết quả là 4 3.'
          },
          {
            type: 'single',
            q: 'Bài toán có <code>T = 100</code> bộ test (<code>while (t--)</code>), mỗi test cho <code>N &le; 10^4</code> số nằm trong đoạn <code>[1, 10^5]</code> và cần đếm tần suất bằng mảng toàn cục <code>int cnt[100005];</code>. Cách xử lý nào đúng chuẩn?',
            options: [
              'Sau mỗi bộ test, gán lại cnt[x] = 0 cho các phần tử vừa đọc (hoặc từ 1..maxVal) để tránh cộng dồn',
              'Không cần xóa mảng cnt vì mỗi lần vào lượt mới của while (t--), mảng toàn cục tự về 0',
              'Mở rộng mảng thành cnt[1000000005] để mỗi bộ test lưu vào một đoạn chỉ số khác nhau',
              'Đưa mảng int cnt[100005]; vào trong vòng while (t--) mà không cần gán 0 để tối ưu tốc độ'
            ],
            correct: 0,
            explain: 'Mảng toàn cục chỉ tự động gán 0 một lần trước khi vào main(). Với nhiều bộ test, bắt buộc phải xóa lại các ô đã dùng của cnt[] về 0 sau mỗi test (cẩn thận không quét hết 10^5 nếu T * 10^5 > 10^8; tốt nhất chỉ xóa những giá trị đã lưu trong test đó!).'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> về mảng 2 chiều và mảng đếm tần suất?',
            options: [
              'Trong khai báo int a[R][C], chỉ số thứ nhất R biểu diễn số hàng và chỉ số thứ hai C biểu diễn số cột',
              'Khai báo mảng 2 chiều int a[10005][10005] tốn khoảng 400 MB RAM, vượt ngưỡng 256 MB gây lỗi MLE',
              'Có thể dùng mảng đếm int cnt[1000000005] cho bài toán có giá trị x lên tới 10^9 để tra cứu nhanh',
              'Mảng toàn cục cnt[] tự động đặt lại toàn bộ các phần tử về 0 sau mỗi lượt của vòng lặp while (t--)'
            ],
            correct: [0, 1],
            explain: 'A và B đều chính xác. C sai vì một mảng 10^9 số int tốn ~4 GB RAM gây MLE; D sai vì mảng toàn cục chỉ tự động gán 0 một lần trước khi vào main(), không tự reset giữa các bộ test.'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: XÂU KÝ TỰ (STRING), ASCII, GETLINE & TƯ DUY MÔ PHỎNG + CASEWORK
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Xâu Ký Tự, ASCII & Mô Phỏng',
        title: 'Vấn Đề Nhỏ 3 & Ghép Lại: Xâu Ký Tự std::string, Mã ASCII & Tư Duy Mô Phỏng / Chia Trường Hợp',
        lead: 'Làm chủ xâu ký tự string, phép toán mã ASCII không cần thuộc số, gỡ bẫy cin.ignore() trước getline(cin, s), ép (int)s.size() tránh lỗi không dấu và hoàn thiện kỹ năng Mô phỏng + Chia trường hợp.',
        subproblem: {
          title: 'Làm sao đọc cả dòng họ tên chứa dấu cách sau khi nhập số, chuyển đổi chữ hoa/thường/chữ số bằng ASCII và mô phỏng các bước biến đổi chuẩn xác 100%?',
          desc: 'Ở mảnh ghép cuối cùng của L1-02, dữ liệu chuyển thành văn bản và các quy luật bước nhảy theo từng giây hoặc theo hướng đi. Chỉ cần nắm mã ASCII, gỡ bẫy bộ đệm của getline và tránh đè bước trong vòng lặp mô phỏng là giải trọn vẹn.'
        },
        cards: [
          {
            heading: 'Xâu Ký Tự string, Bảng Mã ASCII & Hai Bẫy Kinh Điển: (int)s.size() và cin.ignore()',
            tag: 'Xâu ký tự & ASCII',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Chuỗi hạt ký tự, mã số ASCII &amp; Dấu Enter kẹt ở khe đọc</span>
                <p>Một biến <code>string s</code> giống như một <strong>dây xâu hạt ký tự</strong> có chiều dài <code>s.size()</code>, đánh số từ <code>s[0]</code> đến <code>s[(int)s.size() - 1]</code>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bí mật bảng mã ASCII:</strong> Bên trong máy tính, mỗi ký tự thực chất là một con số xếp liền mạch: các chữ số <code>'0'..'9'</code> đứng liền nhau, <code>'A'..'Z'</code> đứng liền nhau và <code>'a'..'z'</code> đứng liền nhau! Vì vậy không cần nhớ số <code>48, 65, 97</code> — muốn đổi ký tự <code>'7'</code> thành số <code>7</code> chỉ lấy <code>c - '0'</code>; muốn biến chữ hoa <code>c</code> thành thường chỉ lấy <code>c - 'A' + 'a'</code>!</li>
                  <li><strong>Bẫy 1 — <code>s.size() - 1</code> khi xâu rỗng:</strong> Hàm <code>s.size()</code> trả về số <em>không dấu</em> (không thể âm). Nếu <code>s</code> rỗng (<code>0</code> ký tự) mà viết <code>s.size() - 1</code>, số <code>0 - 1</code> bị lật vòng thành số dương khổng lồ (~1.8 &times; 10<sup>19</sup>)! <strong>Thói quen vàng:</strong> Luôn ép <code>(int)s.size()</code> trước khi trừ!</li>
                  <li><strong>Bẫy 2 — <code>getline(cin, s)</code> ngay sau <code>cin &gt;&gt; n</code>:</strong> Khi gõ số <code>3</code> rồi bấm Enter (<code>'\\n'</code>), lệnh <code>cin &gt;&gt; n</code> chỉ gắp số <code>3</code> và bỏ lại dấu <code>'\\n'</code> kẹt ngay khe nhập. Lệnh <code>getline</code> tiếp theo chạm ngay dấu <code>'\\n'</code> tưởng hết dòng nên trả về xâu rỗng <code>""</code>! Cách chữa: gọi <code>cin.ignore();</code> ở giữa để nuốt bỏ dấu Enter thừa!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào code C++ chuẩn CP</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int cntChu[26]; // Mảng đếm 26 chữ cái 'a'..'z' toàn cục (= 0)

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin &gt;&gt; n;
    cin.ignore(); // BẮT BUỘC: Bỏ dấu '\\n' còn sót lại trước khi dùng getline!

    for (int dong = 1; dong &lt;= n; dong++) {
        string s;
        getline(cin, s); // Đọc trọn vẹn cả dòng có dấu cách!

        // Luôn ép (int)s.size() khi duyệt hoặc lấy s.size() - 1
        for (int i = 0; i &lt; (int)s.size(); i++) {
            char c = s[i];
            if (c &gt;= 'A' &amp;&amp; c &lt;= 'Z') {
                c = c - 'A' + 'a'; // Chuẩn hóa về chữ thường
            }
            if (c &gt;= 'a' &amp;&amp; c &lt;= 'z') {
                cntChu[c - 'a']++; // Đánh dấu vào ô 0..25!
            }
        }
    }

    for (int k = 0; k &lt; 26; k++) {
        if (cntChu[k] &gt; 0) {
            cout &lt;&lt; (char)('a' + k) &lt;&lt; ": " &lt;&lt; cntChu[k] &lt;&lt; '\\n';
        }
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>std::string</code>:</strong> Kiểu xâu ký tự linh hoạt của C++, hỗ trợ truy cập <code>s[i]</code>, đo độ dài <code>s.size()</code>, nối bằng <code>+</code> và so sánh thứ tự từ điển <code>&lt;, ==, &gt;</code>.</li>
                  <li><strong>Mã ASCII &amp; Ép kiểu <code>(int)s.size()</code>:</strong> Dùng phép trừ ký tự (<code>c - '0'</code>, <code>c - 'a'</code>) để quy đổi chữ về số, và luôn ép <code>(int)</code> để tránh lỗi <code>Unsigned Underflow</code> (tràn số không dấu).</li>
                  <li><strong><code>cin.ignore()</code> &amp; <code>getline(cin, s)</code>:</strong> Cặp lệnh đọc nguyên dòng có chứa khoảng trắng an toàn sau khi vừa dùng <code>cin &gt;&gt;</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Ghép Lại Thành Tư Duy Mô Phỏng (Simulation) & Chia Trường Hợp (Casework)',
            tag: 'Mô phỏng & Casework',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Đóng vai Anh Thật Thà làm lại từng bước &amp; liệt kê sạch mọi nhánh</span>
                <p>Nhiều bài thi Lớp 9 không đòi hỏi công thức bí ẩn nào — chúng mô tả một quy trình diễn ra từng giây hoặc từng bước (như hàng học sinh đổi chỗ, robot đi trên lưới, hay bấm nút chuyển đèn). Khi đó ta áp dụng <strong>Mô phỏng (Simulation)</strong> kết hợp <strong>Chia trường hợp (Casework)</strong>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Nguyên tắc 1 — Tránh xung đột cập nhật trong cùng 1 lượt:</strong> Trong hàng chờ gồm các bạn nam <code>'B'</code> và bạn nữ <code>'G'</code>, mỗi giây cặp <code>"BG"</code> đổi chỗ thành <code>"GB"</code>. Nếu ở vị trí <code>i</code> ta vừa đổi <code>"BG"</code> &rarr; <code>"GB"</code>, phải nhớ <strong>nhảy thêm <code>i++</code></strong> để bạn <code>'B'</code> vừa nhảy sang <code>i + 1</code> không bị xét đổi thêm lần nữa ngay trong cùng giây đó!</li>
                  <li><strong>Nguyên tắc 2 — Kiểm tra điều kiện dừng &amp; Chia trường hợp không trùng, không sót:</strong> Khi mô phỏng nhảy giữa các trạng thái (như <code>cur = a[cur]</code>), dùng mảng đánh dấu <code>bool visited[N]</code> để phát hiện vòng lặp vô tận; khi chia trường hợp (Casework), viết các nhánh <code>if / else if / else</code> phủ kín mọi khả năng (ví dụ: đếm số ký tự xuất hiện lẻ trong bài xếp xâu đối xứng: <code>&gt; 1</code> thì vô nghiệm, <code>== 1</code> đặt ở giữa, <code>== 0</code> chia đôi hai bên).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Minh họa C++ bài toán Mô phỏng hàng đợi &amp; Robot trên lưới</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Mô phỏng hàng đợi BG -&gt; GB qua t giây
    int n, t;
    string hang;
    cin &gt;&gt; n &gt;&gt; t &gt;&gt; hang;

    for (int giay = 1; giay &lt;= t; giay++) {
        for (int i = 0; i + 1 &lt; (int)hang.size(); i++) {
            if (hang[i] == 'B' &amp;&amp; hang[i + 1] == 'G') {
                char tam = hang[i];
                hang[i] = hang[i + 1];
                hang[i + 1] = tam;
                i++; // BẮT BUỘC: Bỏ qua i + 1 trong cùng 1 giây!
            }
        }
    }
    cout &lt;&lt; hang &lt;&lt; '\\n';

    // 2. Chia trường hợp (Casework) bước đi của Robot trong lưới [1..3] x [1..3]
    string lenh;
    cin &gt;&gt; lenh;
    int r = 1, c = 1;
    for (int i = 0; i &lt; (int)lenh.size(); i++) {
        int nr = r, nc = c;
        if (lenh[i] == 'U') nr--;
        else if (lenh[i] == 'D') nr++;
        else if (lenh[i] == 'L') nc--;
        else if (lenh[i] == 'R') nc++;

        // Chỉ cập nhật khi không bước ra ngoài biên bảng
        if (nr &gt;= 1 &amp;&amp; nr &lt;= 3 &amp;&amp; nc &gt;= 1 &amp;&amp; nc &lt;= 3) {
            r = nr;
            c = nc;
        }
    }
    cout &lt;&lt; r &lt;&lt; " " &lt;&lt; c &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Mô phỏng (<code>Simulation</code>):</strong> Cài đặt từng bước tuần tự phản ánh đúng quy luật của đề bài trên mảng hoặc xâu.</li>
                  <li><strong>Chia trường hợp (<code>Casework</code>):</strong> Phân hoạch bài toán thành tập hợp các tình huống rời nhau, xử lý dứt điểm từng nhánh mà không bỏ sót trường hợp biên.</li>
                  <li><strong>Xung đột cập nhật (<code>In-place Update Collision</code>):</strong> Lỗi thay đổi mảng/xâu ngay khi đang duyệt làm ảnh hưởng dây chuyền tới các bước kế tiếp trong cùng một lượt.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_cin_ignore_getline',
            title: 'Phòng Thí Nghiệm 3: Bẫy Quên cin.ignore() Trước getline(cin, s) Sau Khi Nhập Số',
            desc: 'Thử nghiệm đọc đầu vào gồm dòng 1 là số "1", dòng 2 là chuỗi họ tên "Nguyen Van An" khi thiếu vs có lệnh cin.ignore().',
            toggles: [
              {
                key: 'ignoreMode',
                label: 'Xử lý ký tự xuống dòng thừa sau cin >> n',
                options: [
                  { value: 'with_ignore', text: 'Có gọi cin.ignore(); trước getline', kind: 'ok' },
                  { value: 'no_ignore', text: 'Quên gọi cin.ignore(); trước getline', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.ignoreMode === 'with_ignore';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
${isOk ? '    cin.ignore(); // Nuot dau Enter \'\\n\' thua sau so n!' : '    // QUEN cin.ignore(); -> dau \'\\n\' van nam cho o cua doc!'}
    string hoTen;
    getline(cin, hoTen);
    cout << "Ten doc duoc: [" << hoTen << "] (do dai " << hoTen.size() << ")\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [9],
                statusOk: isOk,
                statusText: isOk
                  ? 'Chính xác (AC): cin.ignore() dọn dấu \\n giúp getline đọc trọn vẹn "Nguyen Van An" (13 ký tự)'
                  : 'SAI DỮ LIỆU (WA): getline nuốt dấu \\n thừa ngay sau số 1 nên đọc được xâu rỗng "" (độ dài 0)!',
                predictions: [
                  { text: 'Chương trình bỏ qua dấu Enter thừa và đọc trọn vẹn "Nguyen Van An" (độ dài 13)' },
                  { text: 'Chương trình đọc nhầm dấu Enter thành một dòng trống và in ra độ dài bằng 0' }
                ],
                console: isOk
                  ? '$ ./main   # Input: 1 <Enter> Nguyen Van An\nTen doc duoc: [Nguyen Van An] (do dai 13)'
                  : '$ ./main   # Input: 1 <Enter> Nguyen Van An\nTen doc duoc: [] (do dai 0)\n[Canh bao: Chuoi "Nguyen Van An" da bi bo sot o phia sau!]',
                explain: isOk
                  ? 'Lệnh cin.ignore() đọc và bỏ đi 1 ký tự (chính là dấu xuống dòng \'\\n\' còn sót lại sau lệnh cin >> n), nhường đường cho getline(cin, hoTen) đọc trọn dòng tiếp theo.'
                  : 'Toán tử >> luôn dừng ngay trước khoảng trắng hoặc dấu xuống dòng \'\\n\'. Vì vậy ngay sau cin >> n, dấu \'\\n\' vẫn nằm đầu bộ đệm; getline chạm ngay nó và kết thúc tức thì với xâu rỗng!'
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
    string s = "AbC9";
    int sum = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        if (s[i] >= 'A' && s[i] <= 'Z') {
            s[i] = s[i] - 'A' + 'a';
        } else if (s[i] >= '0' && s[i] <= '9') {
            sum += (s[i] - '0');
        }
    }
    cout << s << " " << sum << '\\n';
    return 0;
}`,
            q: 'Theo dõi đoạn code xử lý ký tự theo mã ASCII trên xâu <code>s = "AbC9"</code>. Màn hình sẽ in ra kết quả nào?',
            options: [
              'In ra abc9 57 vì mã ASCII của ký tự \'9\' là 57 nên được cộng thẳng vào biến sum',
              'In ra Abc9 9 vì chữ cái \'A\' đứng đầu không thỏa điều kiện đổi sang chữ thường',
              'In ra abc9 9 vì chữ hoa đổi sang chữ thường, còn \'9\' - \'0\' cộng giá trị số 9',
              'In ra ABC9 9 vì phép gán s[i] = s[i] - \'A\' + \'a\' chuyển toàn bộ xâu thành hoa'
            ],
            correct: 2,
            explain: 'Ký tự \'A\' và \'C\' nằm trong [\'A\', \'Z\'] nên đổi thành \'a\' và \'c\'; ký tự \'b\' giữ nguyên; ký tự \'9\' cộng giá trị \'9\' - \'0\' = 9 vào biến sum. Kết quả là abc9 9.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string s = "BGGBG";
    for (int i = 0; i + 1 < (int)s.size(); i++) {
        if (s[i] == 'B' && s[i + 1] == 'G') {
            char tmp = s[i];
            s[i] = s[i + 1];
            s[i + 1] = tmp;
            i++;
        }
    }
    cout << s << '\\n';
    return 0;
}`,
            q: 'Theo dõi mô phỏng đổi chỗ cặp <code>"BG"</code> trong 1 giây với lệnh <code>i++</code> trên xâu <code>s = "BGGBG"</code>. Kết quả in ra là gì?',
            options: [
              'In ra GGBGB vì bạn \'B\' đầu tiên sau khi đổi sang vị trí 1 tiếp tục đổi thêm bước nữa',
              'In ra GBGGB vì lệnh i++ bỏ qua vị trí 1 nên mỗi bạn \'B\' chỉ tiến đúng 1 bước',
              'In ra BBGGG vì mọi chữ cái \'B\' và \'G\' được tách hết về hai đầu của xâu ký tự',
              'In ra GBBGG vì vòng lặp chỉ thực hiện duy nhất một phép hoán đổi ở đầu hàng rồi dừng'
            ],
            correct: 1,
            explain: 'Tại i = 0: "BG" đổi thành "GB" (xâu thành "GBGBG"), sau đó i++ nhảy qua chỉ số 1 lên i = 2. Tại i = 2: "GB" không đổi. Tại i = 3: "BG" đổi thành "GB" (xâu thành "GBGGB").'
          },
          {
            type: 'single',
            q: 'Khi dùng <code>cin &gt;&gt; n;</code> ngay trước lệnh <code>getline(cin, s);</code> để đọc một dòng có khoảng trắng, nếu quên gọi <code>cin.ignore();</code> ở giữa thì lỗi gì xảy ra?',
            options: [
              'Trình biên dịch báo lỗi cú pháp ngay lúc biên dịch vì không cho phép dùng lẫn cin và getline',
              'Lệnh getline(cin, s) tự động bỏ qua dòng chữ đầu tiên và đọc thẳng sang dòng thứ hai bên dưới',
              'Lệnh getline(cin, s) đọc nhầm ký tự xuống dòng \'\\n\' còn sót sau cin >> n nên nhận xâu rỗng ""',
              'Chương trình chạy vào vòng lặp vô tận không thể kết thúc vì bộ đệm nhập bị khóa hoàn toàn'
            ],
            correct: 2,
            explain: 'cin >> n để lại dấu xuống dòng \'\\n\' trong bộ đệm nhập. Ngay khi gọi getline(cin, s), nó gặp dấu \'\\n\' này nên lập tức dừng lại và trả về xâu rỗng "".'
          },
          {
            type: 'multiple',
            q: 'Những thói quen lập trình nào sau đây là <strong>ĐÚNG CHUẨN</strong> khi xử lý xâu ký tự <code>string</code> và bài toán Mô phỏng?',
            options: [
              'Viết vòng lặp for (int i = 0; i < s.size() - 1; i++) mà không ép (int) kể cả khi s có thể rỗng',
              'Luôn ép kiểu (int)s.size() trước khi trừ 1 hoặc so sánh để tránh bị tràn số không dấu',
              'Khi mô phỏng bước đi trên lưới 2D, luôn kiểm tra tọa độ mới nằm trong bảng trước khi truy cập',
              'Khi chia trường hợp (Casework), các nhánh cần rời nhau không trùng và phủ kín mọi tình huống'
            ],
            correct: [1, 2, 3],
            explain: 'B, C và D là các nguyên tắc cốt lõi giúp tránh lỗi RE và WA. A rất nguy hiểm vì s.size() là kiểu không dấu: khi s rỗng, 0 - 1 lật vòng thành số dương khổng lồ.'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module cuối - Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l102_local_giant_array',
        title: 'Khai Báo Mảng Khổng Lồ Trong main() Gây Tràn Bộ Nhớ Ngăn Xếp (~8 MB)',
        description: 'Chương trình cần đọc dãy tối đa 3.000.000 số nguyên (~12 MB) vào mảng a, rồi in phần tử đầu và cuối. Khi vừa khởi chạy, chương trình lập tức bị sập (Segmentation Fault) ngay tại hàm main()!',
        failingInput: '5\n10 20 30 40 50',
        failingOutput: 'Runtime Error (Segmentation Fault — tràn vùng nhớ cục bộ ~8 MB)',
        expectedOutput: '10 50',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int a[3000005];
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];
    cout << a[1] << " " << a[n] << '\\n';
    return 0;
}`,
        bugLine: 7,
        patches: [
          { text: 'Đưa khai báo const int N = 3000005; int a[N]; ra toàn cục phía trên hàm main()' },
          { text: 'Đổi dòng 7 thành long long a[3000005]; ngay trong hàm main() để tăng dung lượng' },
          { text: 'Đổi vòng lặp dòng 10 thành for (int i = 0; i < n; i++) để tiết kiệm bộ nhớ' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 7, mảng 3.000.005 số int nặng ~12 MB, vượt quá ngăn xếp cục bộ (~8 MB) của hàm main() nên sập tức thì! Đưa mảng ra toàn cục ngoài main() sẽ dùng vùng nhớ dữ liệu tĩnh (~256 MB) và tự động bằng 0.'
      },
      {
        id: 'dbg_l102_oob_neighbor',
        title: 'Bẫy Truy Cập Ngoài Biên a[i + 1] Khi So Sánh Hai Phần Tử Liên Tiếp',
        description: 'Chương trình cần đếm số cặp kề tăng dần (a[i] < a[i + 1]). Với dãy toàn số âm "-8 -5 -9", đáp án đúng là 1 (chỉ có -8 < -5), nhưng code lại đếm thành 2 vì lỡ so sánh a[3] với a[4] = 0 ngoài dãy!',
        failingInput: '3\n-8 -5 -9',
        failingOutput: '2',
        expectedOutput: '1',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

const int N = 100005;
int a[N];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];
    int dem = 0;
    for (int i = 1; i <= n; i++) {
        if (a[i] < a[i + 1]) dem++;
    }
    cout << dem << '\\n';
    return 0;
}`,
        bugLine: 14,
        patches: [
          { text: 'Sửa dòng 14 thành for (int i = 0; i <= n; i++) { để tính luôn phần tử đầu tiên a[0]' },
          { text: 'Sửa dòng 14 thành for (int i = 1; i < n; i++) { để chỉ xét cặp tới (n - 1, n)' },
          { text: 'Sửa dòng 15 thành if (a[i] <= a[i + 1]) dem++; để bổ sung trường hợp hai số bằng nhau' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 14, i chạy tới n làm dòng 15 đọc sang phần tử a[n + 1] = a[4] (bằng 0 do mảng toàn cục khởi tạo sẵn). Vì -9 < 0 đúng nên dem bị cộng oan thêm 1! Sửa thành i < n sẽ dừng đúng ở cặp cuối (n - 1, n).'
      },
      {
        id: 'dbg_l102_missing_cin_ignore',
        title: 'Quên cin.ignore() Trước getline(cin, s) Khi Đọc Xâu Có Dấu Cách Sau Số',
        description: 'Chương trình cần đọc số n = 1 rồi đọc nguyên dòng họ tên đầy đủ "Tran Minh Khoi". Khi chạy thử, màn hình chỉ in ra tên rỗng "" do bị nuốt dấu xuống dòng còn sót!',
        failingInput: '1\nTran Minh Khoi',
        failingOutput: 'Ten: ',
        expectedOutput: 'Ten: Tran Minh Khoi',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    string hoTen;
    getline(cin, hoTen);
    cout << "Ten: " << hoTen << '\\n';
    return 0;
}`,
        bugLine: 10,
        patches: [
          { text: 'Thay dòng 10 bằng cin >> hoTen; để đọc trực tiếp toàn bộ họ tên gồm cả dấu cách' },
          { text: 'Đổi dòng 9 thành char hoTen[100]; để lưu được chuỗi ký tự có chứa khoảng trắng' },
          { text: 'Thêm cin.ignore(); ngay trước dòng 10 để xóa ký tự xuống dòng \'\\n\' sót lại sau cin >> n' }
        ],
        correctPatch: 2,
        explain: 'Lệnh cin >> n ở dòng 8 chỉ đọc số 1 và để lại dấu Enter \'\\n\' trong bộ đệm. Khi dòng 10 gọi getline(cin, hoTen), nó chạm ngay dấu \'\\n\' đó và trả về xâu rỗng! Thêm cin.ignore(); trước getline sẽ gỡ bỏ dấu \'\\n\' thừa.'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — PHA 1 THUẦN MẢNG/XÂU)
    // ============================================================================
    practiceProblems: [
      {
        id: 'CF-136A',
        title: '136A - Presents',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/136/A',
        hint: 'Giới hạn 1 <= n <= 100. Dùng mảng 1D toàn cục int ans[105]; với chỉ số 1-based: khi đọc được p ở lượt i (bạn i tặng quà cho p), hãy gán ngược lại ans[p] = i; rồi in từ 1 đến n.'
      },
      {
        id: 'CF-263A',
        title: '263A - Beautiful Matrix',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/263/A',
        hint: 'Ma trận cố định 5 x 5. Khai báo mảng 2D toàn cục int a[6][6]; đọc từng ô từ hàng 1..5, cột 1..5 để tìm tọa độ (r, c) của số 1. Đáp án là số bước đổi hàng + đổi cột đưa về tâm (3, 3): |r - 3| + |c - 3| (dùng if để tính trị tuyệt đối).'
      },
      {
        id: 'CF-71A',
        title: '71A - Way Too Long Words',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/71/A',
        hint: 'Giới hạn 1 <= n <= 100, độ dài mỗi từ <= 100. Đọc từng xâu bằng cin >> s; (không có dấu cách). Nếu (int)s.size() > 10 thì in s[0], rồi số (int)s.size() - 2, rồi s[(int)s.size() - 1]; ngược lại giữ nguyên s.'
      },
      {
        id: 'CSES-1083',
        title: 'Missing Number',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1083',
        hint: 'Giới hạn 2 <= n <= 2*10^5. Khai báo mảng đánh dấu toàn cục bool daCo[200005]; (nếu để mảng lớn trong main() rất dễ sập!). Đọc n - 1 số x và đánh dấu daCo[x] = true;, sau đó duyệt i từ 1 đến n tìm vị trí đầu tiên có daCo[i] == false.'
      },
      {
        id: 'VNOJ-BONES',
        title: 'BONES - Xúc xắc bò',
        judge: 'VNOJ',
        tier: 2,
        link: 'https://oj.vnoi.info/problem/bones',
        hint: 'Giới hạn 2 <= S1, S2 <= 20, 2 <= S3 <= 40. Dùng 3 vòng lặp for (i=1..S1, j=1..S2, k=1..S3) cộng dồn vào mảng đếm tần suất toàn cục int cnt[85]; tại vị trí cnt[i + j + k]++. Sau đó quét từ tổng 3 đến S1+S2+S3 bằng dấu > để tự động giữ tổng nhỏ nhất nếu tần suất bằng nhau.'
      },
      {
        id: 'ABC197-B',
        title: 'B - Visibility',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc197/tasks/abc197_b',
        hint: 'Giới hạn 1 <= H, W <= 100. Dùng mảng xâu toàn cục string grid[105]; (lưu ý grid[0..H-1] dùng 0-based nên đổi X--, Y--!). Dùng 2 mảng hướng đi dr[4] = {-1, 1, 0, 0}, dc[4] = {0, 0, -1, 1} kết hợp while tiến từng bước, dừng ngay khi ra ngoài biên hoặc đụng ô "#".'
      },
      {
        id: 'ABC065-B',
        title: 'B - Trained?',
        judge: 'AtCoder',
        tier: 3,
        link: 'https://atcoder.jp/contests/abc065/tasks/abc065_b',
        hint: 'Giới hạn 2 <= N <= 10^5. Khai báo hai mảng toàn cục int a[100005]; và bool visited[100005];. Mô phỏng từ nút cur = 1: mỗi bước kiểm tra nếu cur == 2 thì in số bước rồi dừng; nếu visited[cur] đã true (rơi vào vòng lặp vô tận!) thì in -1; ngược lại đánh dấu visited[cur] = true, cur = a[cur] và tăng bước.'
      },
      {
        id: 'CSES-1755',
        title: 'Palindrome Reorder',
        judge: 'CSES',
        tier: 3,
        link: 'https://cses.fi/problemset/task/1755',
        hint: 'Giới hạn độ dài xâu |s| <= 10^6 gồm chữ in hoa A..Z. Dùng mảng đếm cnt[26] theo mã ASCII (c - \'A\'). Chia trường hợp (Casework): đếm số chữ cái xuất hiện lẻ lần; nếu > 1 in "NO SOLUTION". Ngược lại tạo nửa trái bằng toán tử += (tránh viết s = s + c gây tốn O(N^2)!) hoặc in trực tiếp từng ký tự bằng cout << (char)(\'A\' + c) cho cnt[c]/2 lần, in ký tự lẻ ở giữa, rồi in ngược nửa trái!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
