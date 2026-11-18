/**
 * DỮ LIỆU BÀI GIẢNG L1-03: HÀM, THAM CHIẾU (&) & BỘ NHỚ STACK / VÙNG TĨNH
 * Tầng 1 — Pha 1 Lớp 9 (Nối tiếp từ L1-02)
 * Quy tắc Pha 1 nghiêm ngặt: hàm chỉ nhận tham số nguyên thủy (int, long long, double, char, bool, string)
 * và tham chiếu (int&, long long&). Mảng lớn luôn khai báo ở toàn cục (const int N = ...; int a[N];),
 * chỉ sử dụng cấu trúc điều khiển cơ bản và thuật ngữ ngăn xếp lời gọi hàm tiếng Việt.
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'ham_va_bo_nho',
    number: 'Bài Học L1-03',
    shortTitle: 'Hàm, Tham Chiếu & Bộ Nhớ',
    title: 'Bài L1-03: Hàm (void / return), Tham Chiếu (&) & Bộ Nhớ Stack / Vùng Tĩnh',
    lead: 'Ngừng nhồi nhét hàng trăm dòng lệnh vào main(): chia việc lớn thành các hàm nhỏ độc lập, phân biệt truyền tham trị (bản sao) với truyền tham chiếu & (bản gốc), tránh bẫy che khuất biến toàn cục và nắm vững ranh giới bộ nhớ Stack (~8 MB) vs vùng tĩnh (~256 MB) / Heap.',
    modules: [
      // ============================================================================
      // MODULE 1: CHIA VIỆC LỚN THÀNH HÀM (VOID VS HÀM TRẢ VỀ RETURN)
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Hàm void & return',
        title: 'Vấn Đề Nhỏ 1: Chia Việc Lớn Thành Hàm (void vs Hàm Trả Về return)',
        lead: 'Tại sao không nên viết 150 dòng lặp đi lặp lại trong main(), cách tách hàm có giá trị trả về (int, long long, bool) và hàm hành động (void), quy tắc hàm kết thúc ngay khi gặp return và cách kiểm thử từng mảnh độc lập.',
        subproblem: {
          title: 'Làm sao loại bỏ code lặp lại dài dòng trong main() và kiểm tra cùng lúc nhiều điều kiện (như tổng chữ số nguyên tố, số đảo ngược nguyên tố) mà sửa 1 chỗ là đúng tất cả?',
          desc: 'Khi bài toán cần kiểm tra tính nguyên tố ở 2–3 vị trí khác nhau, việc copy-paste vòng lặp vào trong main() rất dễ sai sót khi chỉnh sửa. Ta đóng gói từng nhiệm vụ thành một hàm độc lập phía trên main(), giao đầu vào qua tham số và nhận kết quả qua return.'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Giao Khoán Cho Tổ Chuyên Trách (Hàm Trả Về vs void)',
            tag: 'Phân rã bằng hàm',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Trong gian bếp ngày hội, nếu một mình <strong>Anh Thật Thà</strong> (<code>main()</code>) tự làm từ khâu kiểm tra hạn dùng từng hộp, cân bột, đến viết bảng tổng kết trong một danh sách 200 dòng, chỉ sơ suất 1 dòng là rối tung cả dây chuyền. Thay vào đó, ta lập ra các <strong>Tổ chuyên trách (Hàm)</strong>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Tổ báo cáo kết quả (Hàm có kiểu trả về <code>int</code>, <code>long long</code>, <code>bool</code>):</strong> Bạn đưa cho tổ nguyên liệu đầu vào (tham số), tổ xử lý gọn gàng rồi <strong>gửi trả lại đúng 1 phiếu kết quả</strong> qua lệnh <code>return</code>. Ví dụ: <code>laNguyenTo(x)</code> trả về <code>true</code>/<code>false</code>, <code>tongChuSo(x)</code> trả về tổng. Ngay khi nộp phiếu <code>return</code>, tổ lập tức <strong>dừng mọi việc và rời phòng</strong>!</li>
                  <li><strong>Tổ thi công hành động (Hàm <code>void</code>):</strong> Tổ này chỉ thực hiện thao tác (như in báo cáo ra màn hình) rồi tự giải tán mà <strong>không trả lại con số nào</strong>. Nếu muốn dừng sớm giữa chừng trong hàm <code>void</code>, chỉ cần viết <code>return;</code> (không kèm giá trị).</li>
                  <li><strong>Lợi ích kiểm thử:</strong> Khi tách riêng từng hàm, bạn có thể thử chạy riêng <code>tongChuSo(123)</code> hay <code>laNguyenTo(9)</code> để tìm lỗi nhanh gấp nhiều lần so với dò cả <code>main()</code> khổng lồ!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++ (đặt hàm phía trên main())</span>
                <p>Trong C++, hàm phụ phải được viết <strong>phía trên nơi gọi nó</strong> để trình biên dịch nhận ra tên hàm trước khi vào <code>main()</code>:</p>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// 1. Hàm trả về int: nhận bản sao tham số x, trả về tổng chữ số
int tongChuSo(long long x) {
    int tong = 0;
    while (x &gt; 0) {
        tong += (int)(x % 10);
        x /= 10;
    }
    return tong;
}

// 2. Hàm trả về bool: chỉ return true SAU KHI hết vòng lặp!
bool laNguyenTo(long long x) {
    if (x &lt; 2) {
        return false; // Thoát sớm ngay lập tức nếu x &lt; 2
    }
    for (long long i = 2; i * i &lt;= x; i++) {
        if (x % i == 0) {
            return false; // Gặp ước -&gt; dừng hàm ngay tại đây!
        }
    }
    return true; // Chạy hết vòng lặp không có ước nào mới kết luận true
}

// 3. Hàm void: chỉ thực hiện hành động in ấn, không có giá trị trả về
void inKetQua(long long ma, bool hopLe) {
    if (!hopLe) {
        cout &lt;&lt; ma &lt;&lt; ": KHONG DAT" &lt;&lt; '\\n';
        return; // Dùng return; trống để thoát sớm hàm void
    }
    cout &lt;&lt; ma &lt;&lt; ": DAT CHUAN" &lt;&lt; '\\n';
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long ma;
    cin &gt;&gt; ma;

    // main() gọn sạch như đọc tiếng Việt: gọi lại laNguyenTo() ở 2 nơi không hề lặp code!
    bool ok = laNguyenTo(ma) &amp;&amp; laNguyenTo(tongChuSo(ma));
    inKetQua(ma, ok);
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Hàm (<code>Function</code>) &amp; Tham số (<code>Parameters</code>):</strong> Khối lệnh độc lập có tên gọi riêng, nhận đầu vào qua danh sách tham số trong ngoặc tròn <code>(...)</code>.</li>
                  <li><strong>Hàm có kiểu trả về vs <code>void</code>:</strong> Nếu đầu hàm ghi kiểu dữ liệu (<code>int</code>, <code>long long</code>, <code>bool</code>...) thì bắt buộc trả kết quả bằng <code>return giaTri;</code>; nếu ghi <code>void</code> thì hàm chỉ thực thi hành động, không được gán vào biến hay dùng trong <code>cout &lt;&lt;</code>.</li>
                  <li><strong>Thoát sớm tại <code>return</code> (<code>Early Return</code>):</strong> Hàm dừng ngay tại lệnh <code>return</code> đầu tiên chạy qua — tuyệt đối không đặt nhầm <code>else return true;</code> bên trong vòng <code>for</code> khi đang kiểm tra ước số!</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_return_early_and_order',
            title: 'Phòng Thí Nghiệm 1: Bẫy Đặt return true; Sớm Bên Trong Vòng Lặp for',
            desc: 'Thử nghiệm hàm bool laNguyenTo(int x) với số 9 (hợp số chia hết cho 3) khi đặt return true; ĐÚNG chỗ (sau vòng lặp) so với đặt NHẦM nhánh else return true; ngay trong vòng for!',
            toggles: [
              {
                key: 'returnPos',
                label: 'Vị trí lệnh return true; trong laNguyenTo(int x)',
                options: [
                  { value: 'after_loop', text: 'Đặt return true; SAU khi chạy hết vòng for', kind: 'ok' },
                  { value: 'inside_loop', text: 'Đặt else return true; BÊN TRONG vòng for', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.returnPos === 'after_loop';
              const code = isOk
                ? `#include <bits/stdc++.h>
using namespace std;

bool laNguyenTo(int x) {
    if (x < 2) return false;
    for (int i = 2; i * i <= x; i++) {
        if (x % i == 0) return false;
    }
    return true; // Chi ket luan true khi da thu het moi uoc i!
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout << "laNguyenTo(9) = " << laNguyenTo(9) << '\\n';
    cout << "laNguyenTo(11) = " << laNguyenTo(11) << '\\n';
    return 0;
}`
                : `#include <bits/stdc++.h>
using namespace std;

bool laNguyenTo(int x) {
    if (x < 2) return false;
    for (int i = 2; i * i <= x; i++) {
        if (x % i == 0) return false;
        else return true; // BAY: i = 2 khong chia het -> thoat luon!
    }
    return true;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout << "laNguyenTo(9) = " << laNguyenTo(9) << '\\n';
    cout << "laNguyenTo(11) = " << laNguyenTo(11) << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [9] : [8],
                statusOk: isOk,
                statusText: isOk
                  ? 'Chính xác (AC): 9 bị loại tại i = 3 nên trả về 0 (false); 11 qua hết vòng lặp trả về 1 (true)'
                  : 'SAI THUẬT TOÁN (WA): Ngay tại i = 2, vì 9 % 2 != 0 nên hàm gặp else return true; và kết thúc tức thì!',
                predictions: [
                  { text: 'laNguyenTo(9) trả về 0 (sai, không phải nguyên tố) và laNguyenTo(11) trả về 1 (đúng)' },
                  { text: 'laNguyenTo(9) kết luận nhầm thành 1 (nguyên tố) vì thoát sớm ngay lượt i = 2' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nlaNguyenTo(9) = 0\nlaNguyenTo(11) = 1'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nlaNguyenTo(9) = 1\nlaNguyenTo(11) = 1\n[Canh bao WA: So 9 chi kiem tra moi i = 2 roi thoat ham ngay tai return true!]',
                explain: isOk
                  ? 'Khi x = 9, i = 2 không chia hết nên vòng lặp tiếp tục sang i = 3. Tại i = 3, 9 % 3 == 0 nên hàm chạy return false; và kết thúc đúng đắn.'
                  : 'Lệnh return lập tức chấm dứt toàn bộ hàm! Đặt else return true; trong vòng for biến vòng lặp thành lệnh chỉ kiểm tra duy nhất số chẵn i = 2, mọi số lẻ &gt;= 3 như 9, 15, 21 đều bị kết luận nhầm là số nguyên tố!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

bool kiemTra(int x) {
    if (x < 2) return false;
    for (int i = 2; i * i <= x; i++) {
        if (x % i == 0) return false;
        else return true;
    }
    return true;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout << kiemTra(9) << ' ' << kiemTra(4) << '\\n';
    return 0;
}`,
            q: 'Theo dõi hành vi thoát sớm của lệnh <code>return</code> trong hàm <code>kiemTra</code>. Chương trình in ra hai số nào?',
            options: [
              'In ra 0 0 vì cả hai số 9 và 4 đều là hợp số có ước nhỏ hơn chính nó',
              'In ra 0 1 vì 9 có ước 3 ở lượt sau còn 4 không kịp xét trong vòng lặp',
              'In ra 1 0 vì 9 không chia hết cho 2 nên thoát sớm còn 4 chia hết cho 2',
              'In ra 1 1 vì câu lệnh return true ở cuối vòng lặp luôn được chạy tới'
            ],
            correct: 2,
            explain: 'Với kiemTra(9): ở lượt i = 2, 9 % 2 != 0 nên chạy nhánh else return true; -&gt; thoát hàm ngay với giá trị 1. Với kiemTra(4): ở lượt i = 2, 4 % 2 == 0 nên chạy return false; -&gt; trả về 0. Kết quả là 1 0.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int tangThem(int x) {
    return x + 2;
    x = x + 100;
    return x;
}

void inNeuDuong(int val) {
    if (val <= 0) return;
    cout << "OK ";
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    inNeuDuong(-3);
    inNeuDuong(4);
    cout << tangThem(4) << '\\n';
    return 0;
}`,
            q: 'Khi gọi <code>inNeuDuong(-3)</code>, <code>inNeuDuong(4)</code> rồi <code>tangThem(4)</code>, màn hình in ra kết quả nào?',
            options: [
              'In ra OK 6 vì -3 bị thoát sớm còn lệnh x + 100 sau return bị bỏ qua',
              'In ra OK 106 vì lệnh return đầu tiên trong tangThem vẫn cộng tiếp 100',
              'In ra OK OK 6 vì hàm void không dừng lại khi gặp câu lệnh return trống',
              'In ra 6 vì điều kiện val &lt;= 0 làm cả hai lời gọi inNeuDuong đều thoát'
            ],
            correct: 0,
            explain: 'inNeuDuong(-3) gặp return; nên thoát ngay không in gì. inNeuDuong(4) in "OK ". tangThem(4) gặp return x + 2; ở dòng đầu nên trả về 6 và dừng ngay, dòng x = x + 100 không bao giờ chạy.'
          },
          {
            type: 'single',
            q: 'Trong C++, tại sao người viết code CP thường định nghĩa các hàm phụ như <code>tongChuSo</code> hay <code>laNguyenTo</code> ở <strong>phía trên <code>main()</code></strong> và tách thành nhiều hàm nhỏ?',
            options: [
              'Vì ngôn ngữ C++ chỉ cho phép tối đa hai hàm hoạt động nếu viết bên dưới cửa chính main()',
              'Vì đặt hàm ở trên main() giúp CPU tính toán các phép cộng trừ nhanh hơn gấp đôi bình thường',
              'Vì hàm đặt trên main() tự động biến mọi biến bên trong nó thành biến toàn cục dùng chung',
              'Vì trình biên dịch đọc từ trên xuống dưới nên phải thấy tên hàm trước, và tách nhỏ giúp dễ kiểm thử'
            ],
            correct: 3,
            explain: 'Trình biên dịch C++ đọc mã nguồn từ trên xuống dưới: nếu chưa khai báo tên hàm trước khi gọi trong main() sẽ bị lỗi biên dịch. Tách thành các hàm nhỏ giúp loại bỏ lặp code và kiểm thử độc lập từng mảnh.'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> về hàm <code>void</code> và hàm có giá trị trả về <code>return</code> trong C++?',
            options: [
              'Hàm có kiểu trả về như int hay bool bắt buộc kết thúc bằng return kèm giá trị đúng kiểu đó',
              'Ngay khi gặp lệnh return chạy tới, hàm lập tức dừng lại và bỏ qua mọi dòng lệnh phía sau',
              'Hàm void vẫn có thể dùng câu lệnh cout &lt;&lt; hamVoid(); để in thẳng kết quả trả về ra màn hình',
              'Hàm void có thể dùng lệnh return; trống (không kèm giá trị) để thoát sớm khi thỏa điều kiện dừng'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D đều chính xác. C sai hoàn toàn vì hàm void không trả về bất kỳ giá trị nào nên không thể đặt vào trong biểu thức cout &lt;&lt; hoặc gán cho biến.'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: TRUYỀN THAM TRỊ (BẢN SAO) VS TRUYỀN THAM CHIẾU & (BẢN GỐC)
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Tham Trị vs Tham Chiếu (&)',
        title: 'Vấn Đề Nhỏ 2: Truyền Tham Trị (Bản Sao) vs Truyền Tham Chiếu & (Bản Gốc)',
        lead: 'Giải mã bí ẩn "vì sao hàm hoanDoi(a, b) không hề đổi được biến ngoài main()", nắm vững sự khác biệt giữa bản photo (tham trị) và bản gốc (&), và cách dùng & để cập nhật nhiều biến cùng lúc.',
        subproblem: {
          title: 'Làm sao viết một hàm hoanDoi(x, y) hoặc capNhatKyLuc(minVal, maxVal, diem) có thể sửa thẳng các biến đang nằm ở bên ngoài main()?',
          desc: 'Một lệnh return chỉ trả về được duy nhất 1 giá trị, nhưng nhiều bài toán yêu cầu đổi chỗ 2 biến hoặc cập nhật đồng thời cả min và max. Nếu truyền tham số thông thường, hàm chỉ nhận bản sao và mọi thay đổi biến mất khi hàm kết thúc.'
        },
        cards: [
          {
            heading: 'Đưa Bản Photo (Tham Trị) vs Đưa Tờ Giấy Gốc (Tham Chiếu &)',
            tag: 'Cơ chế truyền tham số',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: So sánh tờ giấy photo vs tờ giấy gốc</span>
                <p>Khi gọi một hàm và đưa cho nó các biến đang có ở <code>main()</code>, bạn có hai lựa chọn hoàn toàn trái ngược nhau:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Truyền tham trị (<code>int x</code> — KHÔNG có dấu <code>&amp;</code>) = Đưa bản PHOTO:</strong> Khi bạn gọi <code>hoanDoi(u, v)</code>, máy tính chạy đi photo giá trị của <code>u</code> và <code>v</code> ra hai tờ giấy nháp <code>x</code> và <code>y</code> rồi đưa cho hàm. Trong hàm có đổi chỗ <code>x</code> và <code>y</code> bao nhiêu lần đi nữa thì <strong>hai tờ giấy gốc <code>u</code> và <code>v</code> ngoài <code>main()</code> vẫn đứng yên như tượng</strong>!</li>
                  <li><strong>Truyền tham chiếu (<code>int&amp; x</code> — CÓ dấu <code>&amp;</code>) = Đưa thẳng BẢN GỐC:</strong> Dấu <code>&amp;</code> nối thẳng tham số <code>x</code> vào đúng ô nhớ của biến gốc <code>u</code>. Mọi thao tác gán lên <code>x</code> thực chất là sửa trực tiếp vào <code>u</code> ngoài <code>main()</code>!</li>
                  <li><strong>Quy tắc bắt buộc với <code>&amp;</code>:</strong> Vì tham chiếu cần một ô nhớ biến thật để gắn vào, khi gọi hàm có tham số <code>int&amp;</code> bạn chỉ được truyền <strong>tên biến</strong> (như <code>hoanDoi(u, v)</code>), tuyệt đối không truyền số cứng (như <code>hoanDoi(3, 5)</code> sẽ báo lỗi biên dịch ngay!).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào code C++ hoán đổi &amp; cập nhật kỷ lục min/max</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// Tham trị (không có &amp;): chỉ sửa bản sao, biến gốc ngoài main() KHÔNG ĐỔI
void hoanDoiSai(long long x, long long y) {
    long long tam = x;
    x = y;
    y = tam;
}

// Tham chiếu (có &amp;): x và y là tên gọi khác trỏ thẳng vào biến gốc!
void hoanDoiDung(long long&amp; x, long long&amp; y) {
    long long tam = x;
    x = y;
    y = tam;
}

// Kết hợp: vừa trả về bool, vừa sửa CẢ HAI biến minVal và maxVal qua '&amp;'
bool capNhatKyLuc(int&amp; minVal, int&amp; maxVal, int diemMoi) {
    bool phaKyLuc = false;
    if (diemMoi &lt; minVal) {
        minVal = diemMoi;
        phaKyLuc = true;
    }
    if (diemMoi &gt; maxVal) {
        maxVal = diemMoi;
        phaKyLuc = true;
    }
    return phaKyLuc;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long a = 10, b = 25;
    hoanDoiSai(a, b);  // a vẫn là 10, b vẫn là 25
    hoanDoiDung(a, b); // Bây giờ a = 25, b = 10!
    cout &lt;&lt; a &lt;&lt; ' ' &lt;&lt; b &lt;&lt; '\\n';

    int mn = 100, mx = 100;
    if (capNhatKyLuc(mn, mx, 135)) {
        cout &lt;&lt; "Ky luc moi: " &lt;&lt; mn &lt;&lt; ' ' &lt;&lt; mx &lt;&lt; '\\n';
    }
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Truyền tham trị (<code>Pass by Value</code>):</strong> Tạo bản sao dữ liệu truyền vào hàm. Nên dùng mặc định cho biến nhỏ (<code>int</code>, <code>long long</code>, <code>bool</code>) khi hàm <strong>chỉ đọc</strong> mà không cần sửa biến gốc.</li>
                  <li><strong>Truyền tham chiếu (<code>Pass by Reference</code> — ký hiệu <code>&amp;</code>):</strong> Tham số trở thành bí danh của biến gốc truyền vào. Dùng khi hàm cần <strong>thay đổi trực tiếp</strong> 1 hoặc nhiều biến bên ngoài.</li>
                  <li><strong>Chi phí <code>string</code> trong tham số:</strong> Với chuỗi dài tới $10^5$ ký tự, truyền tham trị <code>string s</code> lặp lại nhiều lần sẽ tốn thời gian copy toàn bộ chuỗi; có thể đặt <code>string</code> ở toàn cục hoặc dùng tham chiếu (Pha 2 sẽ tối ưu thêm bằng tham chiếu hằng).</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_value_vs_ref',
            title: 'Phòng Thí Nghiệm 2: Hoán Đổi Hai Số Với Tham Trị (Thiếu &) vs Tham Chiếu (Có &)',
            desc: 'Quan sát trực tiếp giá trị của a = 10 và b = 25 trong main() trước và sau khi gọi hàm hoanDoi khi có vs không có dấu &.',
            toggles: [
              {
                key: 'paramMode',
                label: 'Kiểu truyền tham số của hàm hoanDoi',
                options: [
                  { value: 'by_ref', text: 'Truyền tham chiếu: void hoanDoi(int& x, int& y)', kind: 'ok' },
                  { value: 'by_val', text: 'Truyền tham trị: void hoanDoi(int x, int y)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.paramMode === 'by_ref';
              const code = `#include <bits/stdc++.h>
using namespace std;

${isOk ? 'void hoanDoi(int& x, int& y) {' : 'void hoanDoi(int x, int y) { // Thieu dau & -> chi doi ban sao!'}
    int tam = x;
    x = y;
    y = tam;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int a = 10, b = 25;
    hoanDoi(a, b);
    cout << "Sau hoanDoi: a = " << a << ", b = " << b << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [4],
                statusOk: isOk,
                statusText: isOk
                  ? 'Thành công (AC): Dấu & sửa thẳng vào ô nhớ gốc của a và b nên a = 25, b = 10'
                  : 'MẤT THAY ĐỔI (WA): Không có dấu & nên chỉ đổi hai bản sao x, y; ngoài main() vẫn là a = 10, b = 25!',
                predictions: [
                  { text: 'Sau khi gọi hoanDoi(a, b), hai biến ngoài main() đổi chỗ thành a = 25, b = 10' },
                  { text: 'Hai biến ngoài main() hoàn toàn không đổi, vẫn giữ nguyên a = 10, b = 25' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nSau hoanDoi: a = 25, b = 10'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\nSau hoanDoi: a = 10, b = 25\n[Canh bao WA: Ham chi hoan doi ban sao x, y roi vut bo khi thoat ham!]',
                explain: isOk
                  ? 'Ký hiệu int& x, int& y giúp x và y trỏ trực tiếp vào vùng nhớ của a và b trong main(). Do đó lệnh x = y; y = tam; hoán đổi thành công a và b.'
                  : 'Khi thiếu dấu &, máy tính tạo bản sao x = 10 và y = 25. Hàm hoán đổi xong thì x thành 25, y thành 10 nhưng cả hai lập tức biến mất khi thoát hàm, bỏ lại a = 10 và b = 25 nguyên vẹn!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

void bienDoi(int a, int& b) {
    a += 10;
    b += 10;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int x = 5, y = 5;
    bienDoi(x, y);
    cout << x << ' ' << y << '\\n';
    return 0;
}`,
            q: 'Chú ý hàm <code>bienDoi</code> nhận <code>a</code> bằng tham trị và <code>b</code> bằng tham chiếu <code>&amp;</code>. Kết quả in ra sau lệnh gọi <code>bienDoi(x, y)</code> là gì?',
            options: [
              'In ra 15 15 vì cả hai tham số a và b đều được cộng thêm 10 bên trong hàm',
              'In ra 5 15 vì a chỉ sửa bản sao của x còn b sửa thẳng vào biến gốc y',
              'In ra 15 5 vì tham số đứng trước a được ưu tiên gán ngược lại vào biến x',
              'In ra 5 5 vì mọi thay đổi bên trong hàm void đều bị hủy khi hàm kết thúc'
            ],
            correct: 1,
            explain: 'Tham số đầu tiên (int a) là tham trị nên a += 10 chỉ sửa bản sao, x giữ nguyên 5. Tham số thứ hai (int& b) là tham chiếu nên b += 10 cộng thẳng vào y, làm y thành 15.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

void capNhat(int& mn, int& mx, int val) {
    if (val < mn) mn = val;
    if (val > mx) mx = val;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int mn = 10, mx = 10;
    capNhat(mn, mx, 4);
    capNhat(mn, mx, 12);
    cout << mn << ' ' << mx << '\\n';
    return 0;
}`,
            q: 'Theo dõi giá trị hai biến tham chiếu <code>mn</code> và <code>mx</code> qua hai lần gọi hàm <code>capNhat</code>. Màn hình in ra gì?',
            options: [
              'In ra 10 10 vì hai biến mn và mx ở main() không bị thay đổi bởi hàm void',
              'In ra 4 10 vì lần gọi thứ hai với val = 12 chỉ kiểm tra sau lệnh return',
              'In ra 10 12 vì điều kiện val &lt; mn không cập nhật vào biến gốc của mn',
              'In ra 4 12 vì lần đầu hạ mn xuống 4 và lần sau nâng mx lên thành 12'
            ],
            correct: 3,
            explain: 'Ban đầu mn = 10, mx = 10. Lần 1 (val = 4): 4 &lt; 10 nên mn đổi thành 4 (mx giữ 10). Lần 2 (val = 12): 12 &gt; 10 nên mx đổi thành 12 (mn giữ 4). Kết quả cuối cùng là 4 12.'
          },
          {
            type: 'single',
            q: 'Giả sử đã khai báo hàm <code>void tangMot(int& x) { x++; }</code>. Nếu ở trong <code>main()</code> bạn viết lệnh gọi <code>tangMot(5);</code> thì chuyện gì xảy ra?',
            options: [
              'Chương trình vẫn chạy bình thường và âm thầm bỏ qua phép cộng x++ bên trong hàm',
              'Trình biên dịch báo lỗi ngay (CE) vì tham chiếu int& bắt buộc nhận một biến có ô nhớ thật',
              'Hằng số 5 tự động đổi thành số 6 ở mọi dòng lệnh phía sau bên trong hàm main()',
              'Chương trình biên dịch xong nhưng bị tràn bộ nhớ ngăn xếp khi gọi vào hàm tangMot'
            ],
            correct: 1,
            explain: 'Tham số tham chiếu không hằng (int& x) đòi hỏi một biến thật trên RAM (lvalue) để có thể thay đổi giá trị của nó. Truyền hằng số cứng như 5 sẽ gây lỗi biên dịch (Compile Error).'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> về truyền tham trị và truyền tham chiếu (<code>&amp;</code>) trong C++?',
            options: [
              'Truyền tham trị tạo ra một bản sao độc lập nên không làm thay đổi giá trị biến gốc ngoài hàm',
              'Muốn hàm sửa được biến gốc ngoài main(), ta bắt buộc phải truyền biến theo tên hàm trả về int',
              'Dùng tham chiếu & giúp một hàm có thể cập nhật đồng thời nhiều biến bên ngoài (như hoán đổi 2 số)',
              'Truyền tham chiếu & chỉ hoạt động khi truyền vào hằng số nguyên như 10 hoặc biểu thức a + b'
            ],
            correct: [0, 2],
            explain: 'A và C là hai tính chất cốt lõi của tham trị và tham chiếu &. B sai vì hàm void dùng tham chiếu & vẫn sửa được biến gốc; D sai vì tham chiếu & yêu cầu biến thật, không nhận hằng số hay biểu thức tạm.'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: PHẠM VI BIẾN, NGĂN XẾP LỜI GỌI HÀM & RANH GIỚI BỘ NHỚ STACK / VÙNG TĨNH / HEAP
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Phạm Vi Biến & Stack (~8MB)',
        title: 'Vấn Đề Nhỏ 3 & Cầu Nối Tương Lai: Phạm Vi Biến, Ngăn Xếp Lời Gọi Hàm & Giới Hạn Stack (~8 MB)',
        lead: 'Hiểu tuổi thọ của biến cục bộ trên ngăn xếp lời gọi hàm, gỡ bẫy che khuất biến toàn cục (Shadowing), phân biệt rõ giới hạn bộ nhớ Stack (~8 MB) với vùng dữ liệu tĩnh (~256 MB) / Heap để chuẩn bị bước vào Đệ quy.',
        subproblem: {
          title: 'Tại sao biến cục bộ biến mất ngay sau khi hàm return, vì sao đặt trùng tên lại che khuất biến toàn cục, và vì sao mảng lớn không được phép đặt trong hàm?',
          desc: 'Khi chương trình có nhiều hàm gọi chồng lên nhau, bạn cần hiểu rõ biến nào sống ở đâu trên RAM: khay tạm của từng hàm trên bộ nhớ Stack chỉ rộng tổng cộng ~8 MB, còn nhà kho dữ liệu tĩnh toàn cục mới chứa được mảng trăm triệu byte.'
        },
        cards: [
          {
            heading: 'Tuổi Thọ Biến Trên Ngăn Xếp Lời Gọi Hàm & Bẫy Che Khuất (Shadowing)',
            tag: 'Phạm vi & Tuổi thọ biến',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Chồng khay công việc trên ngăn xếp &amp; hai tờ giấy trùng tên</span>
                <p>Hãy tưởng tượng cách máy tính xếp khay làm việc khi <code>main()</code> gọi một hàm phụ <code>f()</code>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Biến cục bộ trên ngăn xếp lời gọi hàm (<em>bộ nhớ stack</em>):</strong> Mỗi lần gọi <code>f()</code>, hệ thống đặt thêm một <strong>chiếc khay tạm</strong> lên trên khay của <code>main()</code>. Toàn bộ tham số và biến khai báo trong <code>f()</code> nằm trên khay đó (nếu quên gán giá trị, chúng chứa <em>rác ngẫu nhiên</em>!). Ngay khi <code>f()</code> gặp <code>return</code>, chiếc khay bị dọn sạch — gọi lại <code>f()</code> lần sau sẽ mở khay mới tinh chứ không giữ giá trị cũ!</li>
                  <li><strong>Biến toàn cục &amp; Bẫy che khuất (<code>Shadowing</code>):</strong> Biến và mảng đặt bên ngoài mọi hàm nằm trong <strong>nhà kho dữ liệu tĩnh (~256 MB)</strong>, sống suốt cả chương trình và tự gán bằng <code>0</code>. Nhưng nếu trong hàm <code>f()</code> bạn gõ lại <code>long long tong = 0;</code> trùng tên với biến toàn cục <code>long long tong = 0;</code>, chiếc khay tạm sẽ <strong>che khuất</strong> tờ ghi chú ngoài kho: hàm cộng vào biến cục bộ, xong việc khay bị vứt đi, còn biến toàn cục ở ngoài vẫn bằng <code>0</code>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Phân biệt che khuất biến toàn cục vs cập nhật đúng</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const int N = 100005;
int a[N];               // Mảng tĩnh toàn cục (~0.4 MB), tự sạch = 0
long long tong = 0;     // Biến toàn cục tại vùng dữ liệu tĩnh

void congBiCheKhuat(int n) {
    long long tong = 0; // BẪY SHADOWING: Tạo biến cục bộ mới che khuất tong toàn cục!
    for (int i = 1; i &lt;= n; i++) {
        tong += a[i];
    }
    // Thoát hàm -&gt; biến cục bộ tong biến mất, tong toàn cục vẫn = 0!
}

void congDung(int n) {
    tong = 0; // KHÔNG ghi kiểu "long long" -&gt; sửa trực tiếp biến toàn cục!
    for (int i = 1; i &lt;= n; i++) {
        tong += a[i];
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    a[1] = 10; a[2] = 20; a[3] = 30;
    congBiCheKhuat(3);
    cout &lt;&lt; "Sau ham che khuat: " &lt;&lt; tong &lt;&lt; '\\n'; // In ra 0!

    congDung(3);
    cout &lt;&lt; "Sau ham sua dung: " &lt;&lt; tong &lt;&lt; '\\n';     // In ra 60!
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Biến cục bộ (<code>Local Variable</code>):</strong> Biến khai báo bên trong hàm hoặc cặp ngoặc nhọn <code>{ ... }</code>; chỉ sống trên ngăn xếp lời gọi hàm cho tới khi thoát khỏi hàm đó.</li>
                  <li><strong>Biến toàn cục (<code>Global Variable</code>):</strong> Khai báo bên ngoài mọi hàm; nằm trong vùng dữ liệu tĩnh, mặc định bằng <code>0</code> và dùng chung xuyên suốt chương trình.</li>
                  <li><strong>Che khuất biến (<code>Variable Shadowing</code>):</strong> Lỗi đặt tên biến cục bộ trùng với biến toàn cục, khiến hàm chỉ thao tác trên bản cục bộ và không chạm tới biến toàn cục.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Ranh Giới Bộ Nhớ Stack (~8 MB) vs Vùng Dữ Liệu Tĩnh (~256 MB) / Heap & Cầu Nối Đệ Quy',
            tag: 'Bản đồ bộ nhớ RAM',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Chiếc kệ Stack chật hẹp (~8 MB) vs Nhà kho Tĩnh &amp; Bãi đất Heap (~256 MB)</span>
                <p>Khi chương trình C++ chạy trên máy chấm, bộ nhớ RAM được chia thành 3 khu vực rõ rệt mà mọi học sinh Lớp 9 cần thuộc lòng:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>1. Bộ nhớ Stack / Ngăn xếp lời gọi hàm (~8 MB):</strong> Nơi xếp chồng các khay làm việc của <code>main()</code> và từng hàm phụ đang chạy. Mỗi biến <code>int</code> tốn 4 byte, <code>long long</code> tốn 8 byte — cực kỳ gọn nhẹ! <strong>Nhưng tổng sức chứa của cả chồng khay chỉ ~8 MB!</strong> Nếu bạn đặt mảng lớn cỡ <code>int tam[3000000];</code> (~12 MB) vào trong một hàm phụ, chiếc khay sập gãy ngay khoảnh khắc hàm được gọi (<code>Segmentation Fault</code>)!</li>
                  <li><strong>2. Vùng dữ liệu tĩnh toàn cục (~256 MB):</strong> Nhà kho rộng lớn đặt phía trên mọi hàm. Đây là nơi <strong>bắt buộc</strong> phải đặt mọi mảng tĩnh lớn như <code>const int N = 1e6 + 5; int a[N];</code> ở Pha 1.</li>
                  <li><strong>3. Vùng nhớ động Heap (~256 MB — mở khóa ở Pha 2):</strong> Sau này lên Pha 2 STL, các cấu trúc dữ liệu co giãn tự động sẽ xin cấp phát bộ nhớ trên vùng Heap rộng lớn này mà không làm nặng chiếc kệ Stack 8 MB.</li>
                  <li><strong>Cầu nối sang bài Đệ quy (<code>MOD-01</code>):</strong> Một hàm thậm chí có thể tự gọi lại chính nó nhiều tầng liên tiếp! Vì mỗi tầng lại xếp thêm một khay lên Stack (~8 MB), hiểu giới hạn Stack hôm nay chính là chìa khóa tránh tràn ngăn xếp ở <code>MOD-01</code>.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Quy tắc đặt mảng lớn toàn cục &amp; dùng biến nhỏ trong hàm</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// DUNG CHUAN PHA 1: Mang lon nam o vung du lieu tinh (~256 MB)
const int N = 1e6 + 5;
int a[N]; // ~4 MB: an toan tuyet doi!

// Ham phu chi chua cac bien don le nho gon (vai byte tren Stack ~8 MB)
long long tinhTongDoan(int l, int r) {
    // NGUY HIEM NEU VIET: int nhap[3000000]; (~12 MB) -&gt; Sap Stack ngay khi goi ham!
    long long s = 0; // 8 byte tren khay tam cua ham -&gt; sieu nhe!
    for (int i = l; i &lt;= r; i++) {
        s += a[i];
    }
    return s;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 4;
    for (int i = 1; i &lt;= n; i++) a[i] = i * 10;
    cout &lt;&lt; tinhTongDoan(1, n) &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Bộ nhớ Stack / Ngăn xếp lời gọi hàm (<code>Stack Memory</code>):</strong> Vùng nhớ tốc độ cao (~8 MB) chuyên lưu khay làm việc, tham số và biến cục bộ của các hàm đang thực thi.</li>
                  <li><strong>Vùng dữ liệu tĩnh (<code>Static / Global Memory</code>):</strong> Vùng nhớ lớn (~256 MB) chứa biến/mảng khai báo ngoài hàm, tự khởi tạo bằng <code>0</code> và tồn tại suốt chương trình.</li>
                  <li><strong>Vùng nhớ động (<code>Heap Memory</code>):</strong> Kho chứa lớn (~256 MB) dùng để cấp phát dữ liệu co giãn lúc chương trình đang chạy (sẽ làm chủ trực tiếp từ Pha 2 STL).</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_shadowing_and_scope',
            title: 'Phòng Thí Nghiệm 3: Bẫy Che Khuất Biến Toàn Cục (Shadowing) Trong Hàm',
            desc: 'Quan sát kết quả của biến toàn cục tong sau hai lần gọi hàm tangTong(10) và tangTong(25) khi trong hàm vô tình khai báo lại int tong = 0;.',
            toggles: [
              {
                key: 'scopeMode',
                label: 'Cách viết bên trong hàm void tangTong(int x)',
                options: [
                  { value: 'global_ok', text: 'Dùng thẳng biến toàn cục (tong += x;)', kind: 'ok' },
                  { value: 'shadow_bug', text: 'Khai báo trùng tên (int tong = 0; tong += x;)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.scopeMode === 'global_ok';
              const code = `#include <bits/stdc++.h>
using namespace std;

int tong = 0; // Bien toan cuc o vung du lieu tinh

void tangTong(int x) {
${isOk ? '    tong += x; // Sua thang bien toan cuc!' : '    int tong = 0; // BAY SHADOWING: Che khuat bien toan cuc!\n    tong += x;'}
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    tangTong(10);
    tangTong(25);
    cout << "tong ngoai main() = " << tong << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: isOk ? [7] : [7, 8],
                statusOk: isOk,
                statusText: isOk
                  ? 'Chính xác (AC): Cả 2 lần gọi đều cộng thẳng vào tong toàn cục nên kết quả là 35'
                  : 'SAI KẾT QUẢ (WA): Biến cục bộ int tong = 0 che khuất biến toàn cục rồi biến mất -&gt; ngoài main() vẫn là 0!',
                predictions: [
                  { text: 'Ngoài main() nhận đủ hai lần cộng dồn và in ra tong ngoai main() = 35' },
                  { text: 'Ngoài main() hoàn toàn không nhận được thay đổi và in ra tong ngoai main() = 0' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ntong ngoai main() = 35'
                  : '$ g++ -std=c++14 -O2 main.cpp -o main && ./main\ntong ngoai main() = 0\n[Canh bao WA: int tong = 0 trong ham da che khuat bien toan cuc va bi xoa khi return!]',
                explain: isOk
                  ? 'Hàm tangTong không khai báo biến cục bộ trùng tên, nên câu lệnh tong += x; cập nhật thẳng vào biến toàn cục tong (0 -&gt; 10 -&gt; 35).'
                  : 'Khi viết int tong = 0; bên trong hàm, hệ thống tạo biến cục bộ riêng trên ngăn xếp lời gọi hàm. Biến này nhận giá trị 10 (lần 1) rồi 25 (lần 2) và đều bị hủy ngay khi thoát hàm, bỏ mặc biến toàn cục tong ngoài main() vẫn bằng 0!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int tong = 100;

void them(int x) {
    int tong = 0;
    tong += x;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    them(25);
    cout << tong << '\\n';
    return 0;
}`,
            q: 'Biến toàn cục <code>tong</code> khởi đầu bằng <code>100</code>, bên trong hàm <code>them</code> lại có dòng <code>int tong = 0;</code>. Giá trị in ra ở <code>main()</code> là bao nhiêu?',
            options: [
              'In ra 100 vì biến cục bộ int tong đã che khuất rồi biến mất khi thoát hàm',
              'In ra 125 vì lệnh tong += x cộng thêm giá trị 25 trực tiếp vào tổng ban đầu',
              'In ra 25 vì lệnh int tong = 0 đã xóa biến toàn cục về 0 trước khi cộng x',
              'In ra 0 vì biến cục bộ trùng tên làm mất vĩnh viễn giá trị 100 toàn cục'
            ],
            correct: 0,
            explain: 'Dòng int tong = 0; trong hàm them tạo ra một biến cục bộ trùng tên che khuất hoàn toàn biến toàn cục. Phép cộng += 25 chỉ tác động lên biến cục bộ rồi bị hủy khi thoát hàm, nên tong toàn cục vẫn là 100.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int a[10];

int tangMot() {
    int dem = 0;
    dem++;
    return dem;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    a[1] = tangMot();
    a[2] = tangMot();
    cout << a[1] << ' ' << a[2] << ' ' << a[3] << '\\n';
    return 0;
}`,
            q: 'Theo dõi tuổi thọ của biến cục bộ <code>dem</code> qua hai lần gọi hàm <code>tangMot()</code> và mảng toàn cục <code>a[10]</code>. Kết quả in ra là gì?',
            options: [
              'In ra 1 2 0 vì biến cục bộ dem trong hàm vẫn giữ giá trị 1 sang lần gọi sau',
              'In ra 1 1 1 vì mảng toàn cục a[10] tự động sao chép giá trị sang các ô sau',
              'In ra 1 1 0 vì mỗi lần gọi hàm lại tạo biến dem mới và a[3] toàn cục là 0',
              'In ra 0 1 0 vì hàm tangMot trả về giá trị cũ của dem trước khi tăng thêm 1'
            ],
            correct: 2,
            explain: 'Mỗi lần gọi tangMot(), hệ thống cấp phát một khay làm việc mới với dem = 0 nên cả hai lần đều trả về 1. Mảng a[10] khai báo toàn cục nên a[3] tự khởi tạo bằng 0. Kết quả là 1 1 0.'
          },
          {
            type: 'single',
            q: 'Điều gì xảy ra nếu trong một hàm phụ <code>void xuLy()</code> bạn khai báo mảng <code>int tam[3000000];</code> (~12 MB) rồi gọi hàm đó từ <code>main()</code>?',
            options: [
              'Trình biên dịch tự động chuyển mảng tam sang vùng dữ liệu tĩnh toàn cục để chạy',
              'Mảng tam được tự động gán toàn bộ 3 triệu phần tử bằng 0 ngay khi bước vào hàm',
              'Chương trình bị sập (RE) vì mảng ~12 MB vượt quá giới hạn bộ nhớ Stack (~8 MB)',
              'Chương trình chạy chậm hơn đôi chút nhưng vẫn ra kết quả đúng sau khi return'
            ],
            correct: 2,
            explain: 'Các biến và mảng khai báo bên trong hàm nằm trên khay làm việc của bộ nhớ Stack (~8 MB). Cấp phát ~12 MB trên ngăn xếp lời gọi hàm làm vượt giới hạn và sập chương trình ngay lập tức (Segmentation Fault).'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là <strong>ĐÚNG</strong> về phạm vi biến và các vùng nhớ trong C++?',
            options: [
              'Biến cục bộ trong một hàm luôn tự động giữ nguyên giá trị sang lần gọi hàm tiếp theo',
              'Bộ nhớ Stack (ngăn xếp lời gọi hàm) có dung lượng nhỏ (~8 MB), chỉ nên chứa biến đơn lẻ nhỏ',
              'Vùng dữ liệu tĩnh toàn cục (~256 MB) thích hợp để đặt mảng lớn và tự động khởi tạo bằng 0',
              'Đặt biến cục bộ trùng tên với biến toàn cục sẽ che khuất biến toàn cục trong suốt phạm vi hàm đó'
            ],
            correct: [1, 2, 3],
            explain: 'B, C và D đều chính xác. A sai hoàn toàn vì biến cục bộ được tạo mới khi gọi hàm và bị hủy sạch ngay khi hàm return.'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module cuối - Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l103_early_return_loop',
        title: 'Bẫy Thoát Sớm return true; Bên Trong Vòng Lặp Kiểm Tra Nguyên Tố',
        description: 'Hàm laNguyenTo(x) cần kiểm tra xem x có phải số nguyên tố hay không. Khi chạy thử với x = 9 (hợp số), chương trình lại in nhầm là "YES" vì vòng lặp vừa kiểm tra i = 2 không chia hết đã vội thoát hàm!',
        failingInput: '9',
        failingOutput: 'YES',
        expectedOutput: 'NO',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

bool laNguyenTo(int x) {
    if (x < 2) return false;
    for (int i = 2; i * i <= x; i++) {
        if (x % i == 0) return false;
        else return true;
    }
    return true;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    if (laNguyenTo(n)) cout << "YES" << '\\n';
    else cout << "NO" << '\\n';
    return 0;
}`,
        bugLine: 8,
        patches: [
          { text: 'Đổi dòng 6 thành for (int i = 1; i * i <= x; i++) { để kiểm tra thêm từ i = 1' },
          { text: 'Xóa bỏ dòng 8 (else return true;) để chỉ return true sau khi kết thúc vòng for' },
          { text: 'Đổi dòng 10 ở cuối hàm thành return false; để tránh trả về true khi hết vòng lặp' }
        ],
        correctPatch: 1,
        explain: 'Ở dòng 8, nhánh else return true; khiến hàm lập tức thoát ngay ở lượt i = 2 với mọi số lẻ &gt;= 3 (như 9, 15, 21). Chỉ cần xóa bỏ dòng 8 để vòng lặp chạy hết tới sqrt(x) trước khi return true ở dòng 10.'
      },
      {
        id: 'dbg_l103_missing_ref_swap',
        title: 'Quên Dấu & Khi Viết Hàm Hoán Đổi Hai Biến Ngoài main()',
        description: 'Chương trình nhập hai số a, b và gọi hàm xepTang(a, b) để sắp xếp sao cho a &lt;= b trước khi in ra hiệu b - a. Khi nhập "50 20", hàm không hề đổi chỗ khiến output vẫn là "50 20"!',
        failingInput: '50 20',
        failingOutput: '50 20',
        expectedOutput: '20 50',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

void xepTang(long long a, long long b) {
    if (a > b) {
        long long tam = a;
        a = b;
        b = tam;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long u, v;
    cin >> u >> v;
    xepTang(u, v);
    cout << u << ' ' << v << '\\n';
    return 0;
}`,
        bugLine: 4,
        patches: [
          { text: 'Sửa dòng 4 thành void xepTang(long long& a, long long& b) { để truyền tham chiếu' },
          { text: 'Đổi dòng 4 thành long long xepTang(long long a, long long b) { và thêm return a;' },
          { text: 'Đổi dòng 6 thành int tam = a; bên trong câu lệnh if để tiết kiệm dung lượng bộ nhớ' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 4, tham số a và b truyền theo tham trị (bản sao) nên mọi phép gán đổi chỗ chỉ diễn ra trên bản nháp cục bộ rồi biến mất. Thêm dấu & thành long long& a, long long& b sẽ sửa thẳng vào biến u và v ngoài main().'
      },
      {
        id: 'dbg_l103_shadowing_global',
        title: 'Bẫy Che Khuất Biến Toàn Cục (Shadowing) Làm Mất Kết Quả Cộng Dồn',
        description: 'Chương trình có biến toàn cục tong = 0 và gọi hàm congVaoTong(x) cho từng phần tử trong mảng n số. Dù nhập "3\\n10 20 30", kết quả cuối cùng in ra màn hình vẫn bằng 0!',
        failingInput: '3\n10 20 30',
        failingOutput: '0',
        expectedOutput: '60',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

long long tong = 0;

void congVaoTong(int x) {
    long long tong = 0;
    tong += x;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        congVaoTong(x);
    }
    cout << tong << '\\n';
    return 0;
}`,
        bugLine: 7,
        patches: [
          { text: 'Chuyển dòng 4 vào bên trong hàm main() để các hàm đều truy cập được chung' },
          { text: 'Đổi dòng 6 thành void congVaoTong(int& x) { để truyền tham chiếu cho biến x' },
          { text: 'Xóa bỏ dòng 7 (long long tong = 0;) để hàm cộng thẳng vào biến toàn cục tong' }
        ],
        correctPatch: 2,
        explain: 'Dòng 7 khai báo lại long long tong = 0; ngay trong hàm congVaoTong, tạo ra biến cục bộ che khuất hoàn toàn biến toàn cục tong. Xóa dòng 7 giúp hàm cộng thẳng giá trị x vào biến toàn cục tong bên trên.'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — PHA 1 THUẦN HÀM + MẢNG TĨNH)
    // ============================================================================
    practiceProblems: [
      {
        id: 'ABC083-B',
        title: 'B - Some Sums',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/abc083/tasks/abc083_b',
        hint: 'Giới hạn 1 &lt;= N &lt;= 10^4, 1 &lt;= A &lt;= B &lt;= 36. Tách riêng hàm int tongChuSo(int x) dùng while (x &gt; 0) cộng x % 10 rồi chia 10. Trong main(), chỉ cần duyệt i từ 1..N và gọi hàm nếu A &lt;= s && s &lt;= B thì cộng i vào đáp án.'
      },
      {
        id: 'CF-271A',
        title: '271A - Beautiful Year',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/271/A',
        hint: 'Giới hạn 1000 &lt;= y &lt;= 9000. Viết hàm bool cacChuSoKhacNhau(int nam) kiểm tra 4 chữ số có đôi một khác nhau (hoặc dùng mảng cục bộ nhỏ bool daCo[10] = {}; bên trong hàm để thấy mỗi lần gọi là một khay mới!). Sau đó chạy while (true) { y++; if (cacChuSoKhacNhau(y)) { cout &lt;&lt; y &lt;&lt; \'\\n\'; break; } }.'
      },
      {
        id: 'CF-155A',
        title: '155A - I_love_%username%',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/155/A',
        hint: 'Giới hạn 1 &lt;= n &lt;= 1000, điểm 0 &lt;= a_i &lt;= 10^4. Đọc điểm đầu tiên làm thapNhat và caoNhat. Với n - 1 điểm sau, viết hàm bool capNhatKyLuc(int& thapNhat, int& caoNhat, int diem) dùng tham chiếu & để cập nhật thẳng hai kỷ lục và trả về true nếu phá kỷ lục.'
      },
      {
        id: 'ABC081-B',
        title: 'B - Shift only',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc081/tasks/abc081_b',
        hint: 'Giới hạn 1 &lt;= N &lt;= 200, 1 &lt;= A_i &lt;= 10^9. Khai báo mảng tĩnh toàn cục int a[205];. Tách thành hai hàm: bool tatCaChan(int n) kiểm tra mọi a[1..n] đều chia hết cho 2, và void chiaDoiTatCa(int n) chia đôi mọi phần tử. Trong main() chỉ cần while (tatCaChan(n)) { chiaDoiTatCa(n); ans++; }.'
      },
      {
        id: 'VNOJ-NKNUMFRE',
        title: 'NKNUMFRE - Số thân thiện',
        judge: 'VNOJ',
        tier: 2,
        link: 'https://oj.vnoi.info/problem/nknumfre',
        hint: 'Giới hạn 10 &lt;= a &lt;= b &lt;= 30000. Tách bài toán thành 3 hàm rõ ràng: int daoNguoc(int x), int ucln(int x, int y) (dùng vòng lặp while (y != 0) { int r = x % y; x = y; y = r; } return x;), và bool laSoThanThien(int x) kiểm tra ucln(x, daoNguoc(x)) == 1.'
      },
      {
        id: 'ABC186-C',
        title: 'C - Unlucky 7',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc186/tasks/abc186_c',
        hint: 'Giới hạn 1 &lt;= N &lt;= 10^5. Thay vì viết 2 vòng lặp tách chữ số giống nhau cho hệ 10 và hệ 8, hãy viết ĐÚNG MỘT hàm có tham số hóa: bool coChuaSo7(int x, int coSo) lặp while (x &gt; 0) { if (x % coSo == 7) return true; x /= coSo; }. Trong main() chỉ cần kiểm tra !coChuaSo7(i, 10) && !coChuaSo7(i, 8).'
      },
      {
        id: 'CSES-1754',
        title: 'Coin Piles',
        judge: 'CSES',
        tier: 3,
        link: 'https://cses.fi/problemset/task/1754',
        hint: 'Giới hạn 1 &lt;= t &lt;= 10^5, 0 &lt;= a, b &lt;= 10^9. Viết hàm void xepTang(long long& a, long long& b) dùng tham chiếu & để luôn đảm bảo a &lt;= b. Sau đó viết bool coTheHetXu(long long a, long long b): gọi xepTang(a, b) rồi kiểm tra (a + b) % 3 == 0 && 2 * a &gt;= b (dùng long long tránh tràn khi 2 * a hoặc a + b).'
      },
      {
        id: 'ABC196-C',
        title: 'C - Doubled',
        judge: 'AtCoder',
        tier: 3,
        link: 'https://atcoder.jp/contests/abc196/tasks/abc196_c',
        hint: 'Giới hạn 1 &lt;= N &lt; 10^12 (duyệt từ 1..N sẽ TLE!). Chỉ cần duyệt nửa đầu x từ 1..10^6 và viết hàm long long ghepDoi(long long x) nhân x với lũy thừa 10 vừa lớn hơn x rồi cộng x (ví dụ x = 12 -&gt; 12 * 100 + 12 = 1212). Nếu ghepDoi(x) &lt;= N thì tăng biến đếm, ngược lại break ngay!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
