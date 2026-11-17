/**
 * DỮ LIỆU BÀI GIẢNG L1-01: ĐIỀU KHIỂN LUỒNG, VÒNG LẶP & SỐ NGUYÊN LỚN
 * Tầng 1 — Pha 1 Lớp 9 (Nối tiếp từ MOD-Pre, MOD-CP0, MOD-00)
 * Quy tắc Pha 1 nghiêm ngặt: chỉ dùng biến đơn lẻ trong main(), chưa dùng mảng tĩnh hay hàm phụ bên ngoài main().
 * Chuẩn CP C++14: #include <bits/stdc++.h>, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);, '\n'.
 */
(function() {
  const LESSON_DATA = {
    id: 'dieu_khien_luong',
    number: 'Bài Học L1-01',
    shortTitle: 'Luồng, Vòng Lặp & Số Lớn',
    title: 'Bài L1-01: Điều Khiển Luồng, Vòng Lặp & Số Nguyên Lớn',
    lead: 'Nâng cấp Anh Phụ Bếp Thật Thà từ người chỉ biết chạy thẳng một mạch thành người biết tự rẽ nhánh quyết định (if/else), lặp lại hàng trăm nghìn công việc (for/while, break/continue) và làm chủ số nguyên lớn long long cùng phép chia lấy dư % tránh tràn số.',
    modules: [
      // ============================================================================
      // MODULE 1: RẼ NHÁNH IF / ELSE IF / ELSE, TOÁN TỬ SO SÁNH & LOGIC
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Rẽ Nhánh if/else & Logic',
        title: 'Vấn Đề Nhỏ 1: Ngã Tư Quyết Định if / else if / else & Toán Tử Logic',
        lead: 'Giúp chương trình tự chọn đúng một hướng đi khi gặp điều kiện, kết hợp nhiều tiêu chí bằng &&, ||, ! và tránh hai bẫy chết người của Lớp 9: nhầm = với == và viết gộp 5 &lt;= x &lt;= 10.',
        subproblem: {
          title: 'Làm sao để Anh Thật Thà biết tự phân loại học lực, kiểm tra năm nhuận và không rẽ nhầm cổng kiểm soát?',
          desc: 'Ở bài MOD-Pre và MOD-CP0, code chỉ chạy thẳng một mạch từ trên xuống dưới. Khi bước vào Ngày Hội Học Sinh, mỗi thí sinh có điểm số và năm sinh khác nhau: cần tự xét loại Giỏi / Khá / Trung bình hoặc kiểm tra năm nhuận mà không được để hai nhánh dẫm chân lên nhau.'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Ngã Tư Biển Chỉ Dẫn & Thứ Tự Bậc Thang if / else if / else',
            tag: 'Rẽ nhánh quyết định',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Tại cổng phát thẻ ngày hội, bạn giao cho <strong>Anh Thật Thà</strong> nhiệm vụ phát đúng <strong>1 tấm thẻ xếp loại</strong> cho mỗi học sinh dựa theo điểm số:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Từ <code>8.0</code> trở lên &rarr; thẻ <strong>Giỏi</strong>.</li>
                  <li>Từ <code>6.5</code> đến dưới <code>8.0</code> &rarr; thẻ <strong>Khá</strong>.</li>
                  <li>Từ <code>5.0</code> đến dưới <code>6.5</code> &rarr; thẻ <strong>Trung bình</strong>.</li>
                  <li>Dưới <code>5.0</code> &rarr; thẻ <strong>Chưa đạt</strong>.</li>
                </ul>
                <p style="margin-top: 8px;"><strong>Cảnh báo tai nạn xếp ngược biển chỉ dẫn:</strong> Nếu bạn đặt tấm biển <em>"Điểm &ge; 5.0 rẽ vào cửa Trung bình"</em> ở đầu ngã tư, thì một bạn được <code>9.5</code> điểm thấy <code>9.5 &ge; 5.0</code> đúng rồi sẽ rẽ ngay vào cửa Trung bình mà không bao giờ đi tới cửa Giỏi! Vì vậy quy tắc sống còn là <strong>kiểm tra từ điều kiện chặt nhất (cao nhất) xuống lỏng nhất</strong>.</p>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Cấu trúc bậc thang <code>if / else if / else</code> giúp Anh Thật Thà kiểm tra tuần tự từ trên xuống và chỉ chọn <strong>đúng một nhánh đầu tiên thỏa mãn</strong>:</p>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    double diem;
    cin &gt;&gt; diem;

    // ĐÚNG: Xếp từ ngưỡng cao nhất (8.0) xuống thấp nhất (5.0)
    if (diem &gt;= 8.0) {
        cout &lt;&lt; "Gioi" &lt;&lt; '\\n';
    } else if (diem &gt;= 6.5) {
        cout &lt;&lt; "Kha" &lt;&lt; '\\n';
    } else if (diem &gt;= 5.0) {
        cout &lt;&lt; "Trung binh" &lt;&lt; '\\n';
    } else {
        cout &lt;&lt; "Chua dat" &lt;&lt; '\\n';
    }

    return 0;
}</code></pre>
                <p style="margin-top: 8px; font-size: 13.5px; color: var(--muted);">
                  <strong>Phân biệt <code>else if</code> vs nhiều lệnh <code>if</code> rời nhau:</strong> Nếu viết 3 lệnh <code>if</code> đứng riêng, máy tính sẽ kiểm tra cả 3 và có thể in ra 2–3 dòng cùng lúc! Dùng chuỗi <code>if ... else if ... else</code> đảm bảo <strong>nhiều nhất 1 nhánh</strong> được thực hiện.
                </p>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Câu lệnh điều kiện / Rẽ nhánh (<code>Conditional Branching</code>):</strong> Cấu trúc <code>if / else if / else</code> cho phép luồng thực thi rẽ sang nhánh tương ứng khi biểu thức điều kiện mang giá trị đúng (<code>true</code>).</li>
                  <li><strong>Khối lệnh (<code>Code Block { ... }</code>):</strong> Cặp ngoặc nhọn <code>{ }</code> gom nhiều câu lệnh thuộc về cùng một nhánh <code>if</code> hoặc <code>else</code>. Luôn viết rõ <code>{ }</code> ngay cả khi nhánh chỉ có 1 dòng để tránh sai sót khi sửa code.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Toán Tử So Sánh (==, !=) & Toán Tử Logic (&&, ||, !) — Hai Bẫy Chết Người Lớp 9',
            tag: 'Bẫy điều kiện',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Ghép nhiều tiêu chuẩn kiểm tra &amp; Sự ngây ngô của Anh Thật Thà</span>
                <p>Khi kiểm tra một năm <code>nam</code> có phải <strong>Năm Nhuận</strong> không, nội quy đặt ra hai điều kiện ghép: <em>"Chia hết cho 400, HOẶC (chia hết cho 4 VÀ không chia hết cho 100)"</em>. Anh Thật Thà chỉ kiểm tra được từng cặp hai số một, không biết hiểu câu viết tắt kiểu Toán học!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Tai nạn 1 (Viết gộp <code>5 &le; x &le; 10</code>):</strong> Trong Toán học, viết $5 \\le x \\le 10$ nghĩa là $x$ nằm trong đoạn $[5, 10]$. Nhưng Anh Thật Thà đọc từ trái sang phải: anh hỏi <code>5 &le; x</code> trước (ra Đúng = <code>1</code> hoặc Sai = <code>0</code>), rồi lấy con số <code>1</code> hoặc <code>0</code> đó so sánh tiếp <code>&le; 10</code> &rarr; <strong>lúc nào cũng ĐÚNG</strong> dù <code>x = 20</code> hay <code>x = -50</code>!</li>
                  <li><strong>Tai nạn 2 (Viết nhầm <code>=</code> thành <code>==</code>):</strong> Dấu <code>=</code> là <em>lệnh dán giá trị mới vào hộp</em>, còn <code>==</code> mới là <em>câu hỏi kiểm tra xem có bằng nhau không</em>. Viết <code>if (x = 5)</code> nghĩa là bảo Anh Thật Thà nhét số <code>5</code> vào hộp <code>x</code> rồi kiểm tra xem <code>5</code> có khác <code>0</code> không &rarr; luôn ĐÚNG và làm hỏng luôn giá trị cũ của <code>x</code>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int x, nam;
    cin &gt;&gt; x &gt;&gt; nam;

    // 1. Tách rõ từng vế bằng &amp;&amp; (VÀ) — TUYỆT ĐỐI KHÔNG viết 5 &lt;= x &lt;= 10
    if (5 &lt;= x &amp;&amp; x &lt;= 10) {
        cout &lt;&lt; "x nam trong [5, 10]" &lt;&lt; '\\n';
    }

    // 2. Luôn dùng == để so sánh bằng, != để so sánh khác
    if (x == 5) {
        cout &lt;&lt; "x dung bang 5" &lt;&lt; '\\n';
    }

    // 3. Toán tử || (HOẶC), &amp;&amp; (VÀ), ! (PHỦ ĐỊNH) cho Năm Nhuận
    //    % lấy phần dư của phép chia nguyên (chia hết cho 400 tức là dư == 0; xem chi tiết ở Phần 3)
    bool laNhuan = (nam % 400 == 0) || (nam % 4 == 0 &amp;&amp; nam % 100 != 0);
    if (!laNhuan) {
        cout &lt;&lt; nam &lt;&lt; " KHONG phai nam nhuan" &lt;&lt; '\\n';
    } else {
        cout &lt;&lt; nam &lt;&lt; " LA nam nhuan" &lt;&lt; '\\n';
    }

    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Bảng tra nhanh Toán tử Quan hệ &amp; Logic</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Toán tử quan hệ (<code>Relational Operators</code>):</strong> <code>==</code> (bằng), <code>!=</code> (khác), <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code> — trả về <code>true</code> (<code>1</code>) hoặc <code>false</code> (<code>0</code>).</li>
                  <li><strong><code>&amp;&amp;</code> (Logical AND — VÀ):</strong> Chỉ đúng khi <strong>cả hai vế</strong> cùng đúng.</li>
                  <li><strong><code>||</code> (Logical OR — HOẶC):</strong> Đúng khi có <strong>ít nhất một vế</strong> đúng.</li>
                  <li><strong><code>!</code> (Logical NOT — PHỦ ĐỊNH):</strong> Đảo ngược kết quả đúng &harr; sai. Luôn dùng ngoặc đơn <code>(...)</code> khi ghép <code>&amp;&amp;</code> với <code>||</code> để rõ nghĩa.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_if_range_trap',
            title: 'Phòng Thí Nghiệm 1: Bẫy Viết Gộp Toán Học (5 &lt;= x &lt;= 10) vs Toán Tử &&',
            desc: 'Quan sát chuyện gì xảy ra với x = 20 khi bạn viết điều kiện kiểu Toán học 5 &lt;= x &lt;= 10 thay vì tách bằng toán tử &&.',
            toggles: [
              {
                key: 'condStyle',
                label: 'Cách viết điều kiện kiểm tra đoạn [5, 10]',
                options: [
                  { value: 'and_ok', text: 'Tách chuẩn C++: if (5 &lt;= x && x &lt;= 10)', kind: 'ok' },
                  { value: 'chain_bug', text: 'Viết gộp kiểu Toán: if (5 &lt;= x &lt;= 10)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.condStyle === 'and_ok';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int x = 20; // So 20 ro rang NAM NGOAI doan [5, 10]!
${isOk ? '    if (5 <= x && x <= 10) { // Dung: kiem tra dong thoi ca 2 ve' : '    if (5 <= x <= 10) {      // SAI: (5 <= 20) thanh 1, roi 1 <= 10 thanh DUNG!'}
        cout << "Hop le: nam trong [5, 10]\\n";
    } else {
        cout << "Khong hop le: ngoai doan [5, 10]\\n";
    }
    return 0;
}`;
              return {
                code,
                changedLines: [8],
                statusOk: isOk,
                statusText: isOk
                  ? 'Chính xác: Với x = 20, vế (x &lt;= 10) sai nên nhánh if trả về Sai và in "Khong hop le"'
                  : 'SAI LOGIC (WA): Máy tính hiểu (5 &lt;= 20) = 1, sau đó 1 &lt;= 10 lại ĐÚNG nên in nhầm "Hop le"!',
                predictions: [
                  { text: 'Chương trình nhận đúng x = 20 nằm ngoài [5, 10] và in "Khong hop le: ngoai doan [5, 10]"' },
                  { text: 'Chương trình bị đánh lừa bởi phép so sánh nối tiếp và in nhầm "Hop le: nam trong [5, 10]"' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 main.cpp -o main && ./main\nKhong hop le: ngoai doan [5, 10]'
                  : '$ g++ -std=c++14 main.cpp -o main && ./main\nHop le: nam trong [5, 10]\n[Canh bao: 20 > 10 nhung 5 <= x <= 10 van chay vao nhanh if!]',
                explain: isOk
                  ? 'Toán tử && yêu cầu cả hai vế (5 &lt;= 20) là đúng VÀ (20 &lt;= 10) là đúng. Vì vế sau sai nên biểu thức trả về false và đi đúng vào nhánh else.'
                  : 'C++ đọc 5 &lt;= x &lt;= 10 thành (5 &lt;= x) &lt;= 10. Khi x = 20, (5 &lt;= 20) có giá trị true (tức số 1). Tiếp theo 1 &lt;= 10 lại luôn đúng! Đó là lý do không bao giờ được viết gộp hai dấu so sánh liên tiếp trong C++.'
              };
            }
          }
        ],
        debugExercises: [
          {
            id: 'dbg_l101_assign_in_if',
            title: 'Bẫy Viết Nhầm Phép Gán (=) Thay Cho Phép So Sánh (==) Trong Câu Lệnh if',
            description: 'Chương trình cần kiểm tra điểm vừa nhập có đúng bằng 10 hay không. Nhưng khi nhập 6, chương trình vẫn báo "Dat diem toi da" và in ra diem mới bị biến thành 10!',
            failingInput: '6',
            failingOutput: 'Dat diem toi da (diem = 10)',
            expectedOutput: 'Chua toi da (diem = 6)',
            buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int diem;
    cin >> diem;
    if (diem = 10) {
        cout << "Dat diem toi da (diem = " << diem << ")\\n";
    } else {
        cout << "Chua toi da (diem = " << diem << ")\\n";
    }
    return 0;
}`,
            bugLine: 9,
            patches: [
              { text: 'Sửa dòng 9 thành if (diem == 10) { để kiểm tra so sánh bằng thay vì gán giá trị' },
              { text: 'Sửa dòng 9 thành if (diem <= 10) { để kiểm tra điểm không vượt quá mức tối đa' },
              { text: 'Sửa dòng 7 thành long long diem; để biến có đủ dung lượng lưu đúng giá trị nhập' }
            ],
            correctPatch: 0,
            explain: 'Ở dòng 9, dấu = đơn là phép gán: gán giá trị 10 đè lên biến diem, và biểu thức trả về 10 (khác 0, tức true) nên luôn chạy nhánh if. Đổi thành == ở dòng 9 mới là phép so sánh bằng.'
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
    double diem = 9.0;
    if (diem >= 5.0) cout << "TB";
    else if (diem >= 8.0) cout << "Gioi";
    else cout << "Yeu";
    cout << '\\n';
    return 0;
}`,
            q: 'Quan sát kỹ thứ tự nhánh if / else if ở đoạn mã trên. Với diem = 9.0, chương trình sẽ in ra kết quả nào?',
            options: [
              'Chương trình in ra chữ Gioi vì điểm 9.0 đạt điều kiện lớn hơn hoặc bằng 8.0',
              'Chương trình in ra chữ TB vì điều kiện &gt;= 5.0 đứng đầu tiên đã đúng rồi',
              'Chương trình in ra cả TB và Gioi liền nhau vì thỏa mãn cả hai điều kiện',
              'Chương trình báo lỗi biên dịch vì các nhánh else if chưa xếp theo thứ tự tăng'
            ],
            correct: 1,
            explain: 'Trong chuỗi if / else if / else, máy tính kiểm tra từ trên xuống và dừng ngay ở nhánh đầu tiên đúng. Vì 9.0 &gt;= 5.0 đúng ngay ở dòng đầu nên nó in "TB" và bỏ qua toàn bộ nhánh else if phía sau.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int x = 3;
    if (x = 5) {
        cout << x + 1 << '\\n';
    } else {
        cout << 0 << '\\n';
    }
    return 0;
}`,
            q: 'Đoạn mã trên cố ý dùng dấu = thay vì == ở dòng điều kiện if. Giá trị in ra màn hình sẽ là gì?',
            options: [
              'In ra số 0 vì giá trị ban đầu của x là 3 nên không thể bằng 5',
              'In ra số 4 vì điều kiện if vẫn giữ nguyên x bằng 3 rồi cộng 1',
              'Báo lỗi biên dịch ngay lập tức vì không được phép viết dấu = trong if',
              'In ra số 6 vì phép gán x = 5 trả về 5 (khác 0 là đúng) nên cộng 1'
            ],
            correct: 3,
            explain: 'Phép gán x = 5 đổi giá trị biến x từ 3 thành 5 và trả về giá trị 5. Trong C++, mọi số khác 0 đều được coi là true, nên nhánh if được thực hiện và in ra 5 + 1 = 6.'
          },
          {
            type: 'single',
            q: 'Để kiểm tra xem số nguyên nam có phải là Năm Nhuận (chia hết cho 400, hoặc chia hết cho 4 nhưng không chia hết cho 100; dùng % lấy phần dư), biểu thức C++ nào sau đây đúng chuẩn?',
            options: [
              '(nam % 400 == 0) || (nam % 4 == 0 && nam % 100 != 0)',
              '(nam % 400 == 0) && (nam % 4 == 0 || nam % 100 != 0)',
              '(nam % 400 != 0) || (nam % 4 == 0 && nam % 100 == 0)',
              '(nam % 400 = 0) || (nam % 4 = 0 && nam % 100 != 0)'
            ],
            correct: 0,
            explain: 'Năm nhuận thỏa mãn: chia hết cho 400 (nam % 400 == 0, tức chia 400 dư 0) HOẶC (||) thỏa mãn đồng thời chia hết cho 4 (nam % 4 == 0) VÀ (&&) không chia hết cho 100 (nam % 100 != 0). (Phép chia lấy dư % sẽ được phân tích kỹ hơn ở Phần 3.)'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là ĐÚNG về câu lệnh rẽ nhánh và toán tử logic trong C++?',
            options: [
              'Trong chuỗi if / else if / else, luôn xếp các điều kiện hẹp (chặt) lên trước điều kiện rộng',
              'Để kiểm tra x nằm giữa 1 và 100, ta phải tách thành (1 &lt;= x && x &lt;= 100) thay vì viết 1 &lt;= x &lt;= 100',
              'Trong biểu thức logic, ký hiệu || chỉ trả về true khi cả hai vế trái và phải đều cùng đúng',
              'Toán tử phủ định ! biến điều kiện đúng (true) thành sai (false) và ngược lại từ sai thành đúng'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D hoàn toàn đúng. C sai vì || (OR) chỉ cần ít nhất một trong hai vế đúng là trả về true; phép bắt buộc cả hai vế cùng đúng là && (AND).'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: VÒNG LẶP FOR, WHILE, WHILE (T--) & BREAK, CONTINUE
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Vòng Lặp & break/continue',
        title: 'Vấn Đề Nhỏ 2: Vòng Lặp for, while, Mẫu while (t--) & Nút Điều Khiển break / continue',
        lead: 'Ra lệnh cho Anh Thật Thà làm việc lặp lại hàng trăm nghìn lần mà không cần dùng mảng, đọc nhiều bộ test với while (t--), dùng break/continue đúng lúc và phòng tránh vòng lặp vô tận (TLE).',
        subproblem: {
          title: 'Làm sao xử lý 100.000 lượt khách hoặc đọc T bộ test liên tiếp mà không phải gõ 100.000 dòng code, và không để chương trình chạy mãi không dừng?',
          desc: 'Đề bài thường cho N dòng dữ liệu (N tới 10^5) hoặc T bộ test độc lập, nhưng ở L1-01 ta chưa cần lưu cả dãy vào mảng. Ta cần hai loại vòng lặp: for (biết trước số lượt) và while (lặp theo điều kiện dừng), cùng nút ngắt sớm break và nút nhảy lượt continue.'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Dây Chuyền for Biết Trước Số Lượt & Vòng Lặp while Chờ Điều Kiện Dừng',
            tag: 'Vòng lặp cơ bản',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Hai kiểu giao việc lặp lại trong gian bếp</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Vòng lặp <code>for</code> (Đếm đúng số lượt định sẵn):</strong> Bạn dặn Anh Thật Thà: <em>"Bắt đầu từ vị khách số <code>1</code>, hễ số thứ tự còn <code>&le; n</code> thì đọc phiếu điểm rồi bỏ vào rổ <code>tong</code>, xong mỗi người thì tăng số thứ tự lên <code>1</code>!"</em> — Chỉ cần <strong>1 chiếc hộp biến tạm <code>x</code></strong> đọc lần lượt từng người, chưa cần tủ mảng chứa hết cả dãy!</li>
                  <li><strong>Vòng lặp <code>while</code> (Làm chừng nào điều kiện còn đúng):</strong> Khi cần bóc từng chữ số hàng đơn vị của một số <code>n</code> (như <code>2026</code>), bạn không biết trước số đó có mấy chữ số. Bạn dặn: <em>"Chừng nào <code>n &gt; 0</code>, cứ lấy phần dư <code>n % 10</code> rồi cắt bỏ chữ số cuối bằng <code>n /= 10</code>!"</em></li>
                </ul>
                <p style="margin-top: 8px;"><strong>Bẫy Vòng Lặp Vô Tận:</strong> Nếu bạn quên dặn bước cập nhật <code>n /= 10;</code> (hoặc viết điều kiện luôn đúng như <code>i &gt;= 1</code> rồi cứ <code>i++</code>), Anh Thật Thà sẽ làm đi làm lại mãi mãi không bao giờ thoát ra được &rarr; máy chấm báo <strong>TLE (Quá thời gian)</strong>!</p>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào code C++ chuẩn CP</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Vòng lặp for đọc n số &amp; cộng tổng (KHÔNG quên khởi tạo tong = 0!)
    int n;
    cin &gt;&gt; n;
    long long tong = 0;
    for (int i = 1; i &lt;= n; i++) {
        long long x;
        cin &gt;&gt; x;
        tong += x;
    }
    cout &lt;&lt; tong &lt;&lt; '\\n';

    // 2. Vòng lặp while đếm tổng chữ số của một số nguyên dương m
    long long m;
    cin &gt;&gt; m;
    int tongChuSo = 0;
    while (m &gt; 0) {
        tongChuSo += (int)(m % 10);
        m /= 10; // Cập nhật biến điều kiện để vòng lặp tiến gần điểm dừng!
    }
    cout &lt;&lt; tongChuSo &lt;&lt; '\\n';

    // 3. Mẫu đọc T bộ test kinh điển trên Codeforces: while (t--)
    int t;
    cin &gt;&gt; t;
    while (t--) {
        long long a, b;
        cin &gt;&gt; a &gt;&gt; b;
        cout &lt;&lt; a + b &lt;&lt; '\\n';
    }

    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Vòng lặp <code>for (khởi_tạo; điều_kiện; bước_nhảy)</code>:</strong> Thực hiện khởi tạo 1 lần duy nhất, sau đó lặp lại chu trình: <em>Kiểm tra điều kiện &rarr; Chạy thân vòng lặp &rarr; Thực hiện bước nhảy</em>.</li>
                  <li><strong>Vòng lặp <code>while (điều_kiện)</code>:</strong> Kiểm tra điều kiện trước mỗi lượt; nếu đúng thì chạy thân vòng lặp, sai thì thoát ngay.</li>
                  <li><strong><code>while (t--)</code>:</strong> Dùng giá trị hiện tại của <code>t</code> để kiểm tra (<code>t != 0</code> là đúng), rồi giảm <code>t</code> đi 1 ngay trong bước kiểm tra. Nếu <code>t = 3</code>, vòng lặp chạy đúng 3 lượt (bên trong thân vòng lặp <code>t</code> lần lượt mang giá trị <code>2, 1, 0</code>) và khi điều kiện <code>0 != 0</code> sai thì giảm tiếp thành <code>-1</code> rồi thoát.</li>
                  <li><strong>Vòng lặp vô tận (<code>Infinite Loop</code>):</strong> Vòng lặp có điều kiện không bao giờ trở thành sai (thường do quên cập nhật biến điều kiện), dẫn đến <code>TLE</code>.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Hai Nút Điều Khiển Khẩn Cấp Trong Vòng Lặp: break vs continue',
            tag: 'Điều khiển lượt lặp',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Sự khác biệt giữa "Nghỉ việc luôn" và "Cho qua người này"</span>
                <p>Hãy tưởng tượng Anh Thật Thà đang soát vé một hàng người dài từ số <code>1</code> đến <code>100</code>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Lệnh <code>continue</code> (Bỏ qua lượt hiện tại):</strong> Khi gặp người mặc áo mưa ướt (ví dụ số chẵn không cần xét), bạn dặn anh ấy <em>"Đừng làm các bước ghi chép phía dưới cho người này nữa, mời ngay người tiếp theo vào!"</em>. Vòng lặp <strong>vẫn tiếp tục</strong> sang lượt <code>i + 1</code>.</li>
                  <li><strong>Lệnh <code>break</code> (Ngắt khẩn cấp toàn bộ vòng lặp):</strong> Khi nhiệm vụ là <em>"Tìm người ĐẦU TIÊN đạt vé vàng"</em>, ngay giây phút tìm thấy người đó, anh bấm chuông đóng cửa và <strong>thoát hẳn khỏi vòng lặp</strong>, không kiểm tra thêm bất kỳ ai phía sau nữa!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: So sánh trực tiếp break và continue trong code C++</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ: Xét i từ 1 đến 10, bỏ qua số chẵn (continue),
    // nhưng hễ gặp số chia hết cho 7 đầu tiên thì ghi nhận và thoát hẳn (break).
    for (int i = 1; i &lt;= 10; i++) {
        if (i % 2 == 0) {
            continue; // Nhảy thẳng tới bước i++, bỏ qua các dòng bên dưới
        }
        if (i % 7 == 0) {
            cout &lt;&lt; "Tim thay so le chia het cho 7: " &lt;&lt; i &lt;&lt; '\\n';
            break;    // Thoát khỏi vòng for ngay lập tức (không xét 8, 9, 10 nữa)
        }
        cout &lt;&lt; "Dang xet so le: " &lt;&lt; i &lt;&lt; '\\n';
    }
    // Kết quả in ra:
    // Dang xet so le: 1
    // Dang xet so le: 3
    // Dang xet so le: 5
    // Tim thay so le chia het cho 7: 7
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Ghi nhớ thuật ngữ điều khiển luồng</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>break</code> (Ngắt vòng lặp):</strong> Kết thúc ngay lập tức vòng lặp <code>for</code> hoặc <code>while</code> gần nhất bao bọc nó, chuyển luồng thực thi xuống dòng code ngay sau vòng lặp.</li>
                  <li><strong><code>continue</code> (Tiếp tục lượt mới):</strong> Bỏ qua toàn bộ các câu lệnh còn lại trong thân vòng lặp ở lượt hiện tại, nhảy thẳng tới bước cập nhật (với <code>for</code>) hoặc kiểm tra điều kiện (với <code>while</code>).</li>
                  <li><strong>Cảnh báo dùng <code>continue</code> trong <code>while</code>:</strong> Nếu đặt lệnh cập nhật (như <code>i++;</code>) ở <em>cuối</em> thân <code>while</code> mà lại gọi <code>continue;</code> ở phía trên, máy tính sẽ nhảy qua mất <code>i++;</code> và rơi vào vòng lặp vô tận! Với <code>for</code>, bước nhảy <code>i++</code> luôn tự chạy kể cả khi gọi <code>continue;</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_while_infinite',
            title: 'Phòng Thí Nghiệm 2: Cập Nhật Biến Trong while vs Vòng Lặp Vô Tận (TLE)',
            desc: 'Thử nghiệm tác động của việc quên cập nhật biến n /= 10; trong vòng lặp while đếm số chữ số của số 202605.',
            toggles: [
              {
                key: 'whileMode',
                label: 'Cập nhật biến n trong thân while',
                options: [
                  { value: 'with_update', text: 'Có lệnh n /= 10; (Tiến tới điểm dừng)', kind: 'ok' },
                  { value: 'no_update', text: 'Quên lệnh n /= 10; (Điều kiện mãi đúng)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.whileMode === 'with_update';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long n = 202605;
    int dem = 0;
    while (n > 0) {
        dem++;
${isOk ? '        n /= 10; // Cat bo chu so cuoi -> n giam dan ve 0!' : '        // QUEN n /= 10; -> n mai mai bang 202605 (> 0)!'}
    }
    cout << "So chu so: " << dem << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [11],
                statusOk: isOk,
                statusText: isOk
                  ? 'Dừng đúng lúc sau 6 lượt: n giảm 202605 → 20260 → ... → 0 và in "So chu so: 6"'
                  : 'VÒNG LẶP VÔ TẬN (TLE): n mãi giữ giá trị 202605 &gt; 0, CPU quay cuồng không thoát được!',
                predictions: [
                  { text: 'Vòng lặp chạy 6 lần cho tới khi n về 0 và in ra "So chu so: 6"' },
                  { text: 'Vòng lặp chạy mãi mãi không thể dừng lại và máy chấm báo TLE (Quá thời gian)' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 main.cpp -o main && ./main\nSo chu so: 6'
                  : '$ g++ -std=c++14 main.cpp -o main && ./main\n[Dang chay mai mai... n luon bang 202605!]\n[Ket qua may cham: TLE - Time Limit Exceeded]',
                explain: isOk
                  ? 'Mỗi lượt lặp, n /= 10 rút ngắn n đi 1 chữ số. Sau 6 lượt, n = 0 nên điều kiện (n &gt; 0) thành sai, vòng lặp thoát an toàn.'
                  : 'Vì không có dòng cập nhật n trong thân vòng lặp, giá trị của n không bao giờ thay đổi. Điều kiện (202605 &gt; 0) luôn đúng qua hàng tỷ lượt lặp cho đến khi hết thời gian quy định.'
              };
            }
          }
        ],
        debugExercises: [
          {
            id: 'dbg_l101_loop_off_by_one',
            title: 'Bẫy Sai Biên Vòng Lặp (Off-By-One) Khi Cộng Tổng Từ 1 Đến N',
            description: 'Học sinh muốn tính tổng S = 1 + 2 + ... + n, nhưng khi thử với n = 5 (kỳ vọng 15) thì chương trình chỉ in ra 10 do thiếu mất số cuối cùng.',
            failingInput: '5',
            failingOutput: '10',
            expectedOutput: '15',
            buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    long long tong = 0;
    for (int i = 1; i < n; i++) {
        tong += i;
    }
    cout << tong << '\\n';
    return 0;
}`,
            bugLine: 10,
            patches: [
              { text: 'Sửa dòng 10 thành for (int i = 1; i <= n; i++) { để tính cả giá trị i = n' },
              { text: 'Sửa dòng 10 thành for (int i = 0; i < n; i++) { để vòng lặp chạy đủ n bước' },
              { text: 'Sửa dòng 9 thành long long tong = 1; để cộng bù vào tổng ban đầu bị thiếu' }
            ],
            correctPatch: 0,
            explain: 'Điều kiện i &lt; n chỉ cho i chạy từ 1 đến n - 1 (tức 1 + 2 + 3 + 4 = 10), bỏ sót mất số n = 5. Phải dùng i &lt;= n ở dòng 10 để bao gồm cả phần tử cuối cùng.'
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
    int tong = 0;
    for (int i = 1; i <= 6; i++) {
        if (i % 2 == 0) continue;
        if (i == 5) break;
        tong += i;
    }
    cout << tong << '\\n';
    return 0;
}`,
            q: 'Theo dõi từng bước chạy của biến i và tong trong đoạn mã trên. Giá trị cuối cùng in ra màn hình là bao nhiêu?',
            options: [
              'In ra số 9 vì vòng lặp cộng ba số lẻ đầu tiên là 1 + 3 + 5',
              'In ra số 6 vì vòng lặp dừng ngay khi i = 5 và cộng 1 + 2 + 3',
              'In ra số 4 vì chỉ có i = 1 và i = 3 được cộng trước khi gặp break ở 5',
              'In ra số 12 vì câu lệnh break chỉ bỏ qua lượt i = 5 rồi cộng tiếp i = 6'
            ],
            correct: 2,
            explain: 'Khi i = 1: tong = 1. Khi i = 2: gặp continue nên bỏ qua. Khi i = 3: tong = 1 + 3 = 4. Khi i = 4: gặp continue nên bỏ qua. Khi i = 5: gặp break nên thoát hẳn vòng lặp trước khi cộng 5. Kết quả in ra là 4.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n = 407, s = 0;
    while (n > 0) {
        s += n % 10;
        n /= 10;
    }
    cout << s << " " << n << '\\n';
    return 0;
}`,
            q: 'Khi kết thúc vòng lặp while ở đoạn mã trên, hai giá trị s và n được in ra lần lượt là gì?',
            options: [
              'In ra 11 0 vì vòng lặp tách lần lượt các chữ số 7, 0, 4 và chia n xuống còn 0',
              'In ra 11 407 vì phép chia n /= 10 chỉ tính tạm thời chứ không đổi giá trị n',
              'In ra 11 4 vì vòng lặp dừng lại ngay khi chỉ còn chữ số hàng trăm cuối cùng',
              'In ra 47 0 vì chữ số 0 ở giữa làm phép lấy dư % 10 cộng sai chữ số hàng trăm'
            ],
            correct: 0,
            explain: 'Lượt 1: s = 7, n = 40. Lượt 2: s = 7 + 0 = 7, n = 4. Lượt 3: s = 7 + 4 = 11, n = 0. Lúc này (n &gt; 0) sai nên thoát vòng lặp và in ra 11 0.'
          },
          {
            type: 'single',
            q: 'Khi viết một vòng lặp while để đọc nhiều bộ test có dạng while (t--) với t = 3, biến t sẽ thay đổi như thế nào qua các lượt?',
            options: [
              'Vòng lặp chạy 2 lượt ứng với t = 3, 2 rồi dừng lại ngay khi biến t giảm xuống giá trị 1',
              'Vòng lặp chạy 4 lượt ứng với t = 3, 2, 1, 0 rồi mới thoát ra ngoài với biến t bằng 0',
              'Vòng lặp chạy mãi mãi vì phép t-- chỉ giảm tạm giá trị khi kiểm tra chứ không sửa biến t',
              'Vòng lặp chạy đúng 3 lượt ứng với giá trị kiểm tra 3, 2, 1 rồi thoát khi t kiểm tra lúc bằng 0'
            ],
            correct: 3,
            explain: 'Biểu thức t-- trả về giá trị trước khi giảm (3, 2, 1 đều khác 0 nên đúng -&gt; chạy 3 lượt). Đến lượt thứ 4, t-- trả về 0 (sai) rồi giảm t thành -1 và thoát vòng lặp.'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là ĐÚNG về vòng lặp và từ khóa điều khiển trong C++?',
            options: [
              'Luôn phải gán giá trị khởi tạo ban đầu (như long long tong = 0;) cho biến cộng dồn trước khi vào vòng lặp',
              'Từ khóa break và continue có tác dụng giống hệt nhau là đều thoát hẳn ra khỏi vòng lặp chứa nó',
              'Nếu đặt lệnh tăng i++ ở cuối thân while và dùng continue phía trên nó thì có thể gây vòng lặp vô tận',
              'Có thể dùng 1 biến đọc từng số trong vòng lặp for (1..n) để tính tổng mà chưa cần dùng mảng lưu cả dãy'
            ],
            correct: [0, 2, 3],
            explain: 'A, C và D đều đúng bản chất. Ý B sai hoàn toàn vì continue chỉ bỏ qua phần còn lại của lượt hiện tại để sang lượt tiếp theo, còn break mới thoát hẳn vòng lặp.'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: KIỂU LONG LONG, BẪY TRÀN SỐ INT, ÉP KIỂU 1LL & CHIA LẤY DƯ %
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'long long, Tràn Số & Modulo %',
        title: 'Vấn Đề Nhỏ 3 & Ghép Lại: Kiểu long long, Bẫy Tràn Số int, Ép Kiểu 1LL & Chia Dư %',
        lead: 'Bảo vệ kết quả khỏi bị biến thành số âm quái dị khi nhân hai số 10^9, hiểu vì sao a * b với biến int vẫn tràn dù gán vào long long, và nắm quy tắc chia dư % an toàn cho cả số âm.',
        subproblem: {
          title: 'Tại sao nhân 10^9 với 10^9 lại ra số âm kỳ quái dù đã khai báo biến kết quả là long long, và làm sao chia dư % không bị sai khi gặp số âm?',
          desc: 'Ở bài cuối cùng của Ngày Hội, đề bài cho kích thước tới 10^9 hoặc yêu cầu tính kết quả chia dư cho 10^9 + 7. Hộp biến int 32-bit chỉ chứa tối đa khoảng 2.14 tỷ; vượt quá mức này đồng hồ RAM sẽ lộn vòng thành số âm. Ngay cả phép chia lấy dư % trên C++ với số âm cũng khác toán học nếu không chuẩn hóa!'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Đồng Hồ Công-Tơ-Mét RAM (int vs long long) & Bẫy Tràn Trung Gian 1LL',
            tag: 'Tràn số 64-bit',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề đồng hồ 4 chữ số &amp; Bẫy đổi khay muộn</span>
                <p>Hãy hình dung chiếc đồng hồ công-tơ-mét xe máy chỉ có <strong>4 ô chữ số</strong> (tối đa <code>9999</code>). Khi nhích thêm 1 km nữa, do không có ô thứ 5, đồng hồ lật vòng về <code>0000</code>!</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Hộp <code>int</code> (4 byte / 32-bit):</strong> Chỉ chứa được từ $-2\\,147\\,483\\,648$ đến $+2\\,147\\,483\\,647$ ($\\approx 2.14 \\times 10^9$). Hai số $10^9$ đứng riêng thì vừa vặn, nhưng khi nhân nhau thành $10^{18}$ thì tràn tung thành số âm (ví dụ <code>-1486618624</code>)!</li>
                  <li><strong>Hộp <code>long long</code> (8 byte / 64-bit):</strong> Chứa được tới $\\pm 9.22 \\times 10^{18}$ — đủ sức chứa $10^{18}$ ngon lành!</li>
                  <li><strong>Bẫy "Đổi khay quá muộn":</strong> Nếu bạn giữ nguyên hai chiếc cốc nhỏ <code>int a, b;</code> chứa $10^9$, rồi đổ vào chiếc xô to <code>long long s = a * b;</code>, thì Anh Thật Thà <strong>nhân hai cốc nhỏ lại với nhau trước</strong> (làm tràn nước văng hết ra ngoài), <em>rồi mới</em> đổ phần nước sai bét đó vào chiếc xô <code>long long</code>!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Quy tắc vàng tránh tràn số chuẩn CP</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int a = 1000000000, b = 1000000000; // 10^9 van vua kieu int

    // 1. SAI: int * int bi tran thanh so am (-1486618624) TRUOC KHI gan vao long long!
    // long long sai = a * b;

    // 2. VAN SAI: a * b o ben trai van nhan kieu int truoc roi moi gap 1LL!
    // long long vanSai = a * b * 1LL;

    // 3. DUNG CHUAN CP: Dat 1LL * o DAU phep nhan (hoac khai bao luon long long a, b;)
    long long dung = 1LL * a * b; // = 1000000000000000000 (10^18)
    cout &lt;&lt; "10^9 * 10^9 = " &lt;&lt; dung &lt;&lt; '\\n';

    // Luu y them: Phep cong 2 so 2 * 10^9 cung vuot int (4 * 10^9 &gt; 2.14 * 10^9)!
    long long x = 2000000000LL, y = 2000000000LL;
    cout &lt;&lt; "Tong an toan = " &lt;&lt; x + y &lt;&lt; '\\n';
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Ngưỡng cần thuộc lòng</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Tràn số nguyên (<code>Integer Overflow</code>):</strong> Khi kết quả phép toán vượt ngưỡng kiểu dữ liệu (<code>int</code> &approx; $2.14 \\times 10^9$, <code>long long</code> &approx; $9.22 \\times 10^{18}$), giá trị bị lật vòng sai hoàn toàn.</li>
                  <li><strong>Hằng số <code>1LL</code> &amp; Ép kiểu (<code>Type Casting</code>):</strong> Hậu tố <code>LL</code> biến số <code>1</code> thành kiểu <code>long long</code> 64-bit. Đặt <code>1LL * a * b</code> ép phép tính từ trái sang phải chạy hoàn toàn bằng 64-bit ngay từ bước nhân đầu tiên.</li>
                  <li><strong>Mẹo đi thi CP:</strong> Hễ thấy giới hạn tích, tổng hoặc đáp án có khả năng vượt $10^9$ (hoặc cộng dồn $10^5$ số cỡ $10^5$), hãy dùng thẳng <code>long long</code> ngay từ đầu!</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'Số Học Chia Lấy Dư (%) Từng Bước & Bẫy Phép Chia Dư Số Âm Trong C++',
            tag: 'Modulo chuẩn CP',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Đếm không tràn với Modulo &amp; Lệch dấu khi chia số âm</span>
                <p>Nếu đề bài bắt tính $2^{100000}$ rồi chia lấy dư cho $M = 10^9 + 7$, con số $2^{100000}$ có hơn $30.000$ chữ số — ngay cả <code>long long</code> cũng nổ tung! Bí quyết là: <strong>chỉ giữ lại phần dư nhỏ gọn sau mỗi bước nhân/cộng</strong>, giống như đồng hồ chỉ cần biết vị trí kim phút sau mỗi vòng quay 60 phút mà không cần đếm tổng số phút từ đầu thế kỷ!</p>
                <p style="margin-top: 8px;"><strong>Bẫy số âm đặc trưng của C++:</strong> Trong Toán học, số dư khi chia cho <code>5</code> luôn nằm từ <code>0</code> đến <code>4</code>. Nhưng trong C++14, phép <code>(-7) % 5</code> lại cho ra <strong><code>-2</code></strong> (vì C++ lấy dấu theo số bị chia)! Nếu bạn dùng công thức hiệu hai số <code>(a - b) % M</code> khi <code>a &lt; b</code>, kết quả sẽ âm và bị Wrong Answer ngay!</p>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Bộ công thức Modulo chuẩn CP trong C++14</span>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    const long long MOD = 1000000007LL; // 10^9 + 7

    // 1. Nhan luy thua 2^n % MOD tung buoc trong long long (n &lt;= 10^6)
    int n = 100000;
    long long ans = 1;
    for (int i = 1; i &lt;= n; i++) {
        ans = (ans * 2) % MOD; // Luon giu ans nam trong [0, MOD - 1]
    }
    cout &lt;&lt; "2^100000 mod (10^9 + 7) = " &lt;&lt; ans &lt;&lt; '\\n';

    // 2. Nhan 2 so da chia du: PHAI dung long long vi (MOD-1)*(MOD-1) ~ 10^18!
    long long u = 1000000000LL, v = 1000000000LL;
    long long tichMod = ((u % MOD) * (v % MOD)) % MOD;
    cout &lt;&lt; "Tich modulo = " &lt;&lt; tichMod &lt;&lt; '\\n';

    // 3. Chuan hoa so du khi co phep tru / so am: ((x % M) + M) % M
    long long x = 3, y = 10, m = 5;
    long long hieuModChuan = (((x - y) % m) + m) % m; // (-2 + 5) % 5 = 3
    cout &lt;&lt; "Hieu modulo chuan khong am = " &lt;&lt; hieuModChuan &lt;&lt; '\\n';

    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Tóm tắt công thức Đồng dư (Modular Arithmetic)</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Quy tắc cộng:</strong> <code>(a + b) % M = ((a % M) + (b % M)) % M</code></li>
                  <li><strong>Quy tắc nhân:</strong> <code>(a * b) % M = ((a % M) * (b % M)) % M</code> (nhớ dùng <code>long long</code> vì $M \\approx 10^9$ nên tích trung gian lên tới $10^{18}$!).</li>
                  <li><strong>Quy tắc trừ an toàn (tránh âm):</strong> <code>(a - b) % M</code> chuẩn hóa thành <code>(((a - b) % M) + M) % M</code> để luôn nằm trong $[0, M - 1]$.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_int_overflow',
            title: 'Phòng Thí Nghiệm 3A: Bẫy Tràn Số Trung Gian (int * int) Trước Khi Gán long long',
            desc: 'Thử nghiệm kết quả thực tế khi nhân a = 10^9 và b = 10^9 trong hộp int rồi gán vào long long so với ép kiểu 1LL * a * b.',
            toggles: [
              {
                key: 'castMode',
                label: 'Cách viết phép nhân gán vào long long',
                options: [
                  { value: 'safe_1ll', text: 'Ép kiểu đầu biểu thức: 1LL * a * b', kind: 'ok' },
                  { value: 'raw_int_mul', text: 'Nhân trực tiếp hai biến int: a * b', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.castMode === 'safe_1ll';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int a = 1000000000;
    int b = 1000000000;
${isOk ? '    long long tich = 1LL * a * b; // Ep len 64-bit TRUOC khi nhan' : '    long long tich = a * b;       // TRAN SO: a * b tinh bang int 32-bit!'}
    cout << tich << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [9],
                statusOk: isOk,
                statusText: isOk
                  ? 'An toàn tuyệt đối: 1LL * a nâng phép nhân lên 64-bit và in đúng 1000000000000000000'
                  : 'TRÀN SỐ NGUYÊN (WA): a * b tính bằng int bị tràn thành -1486618624 rồi mới gán vào long long!',
                predictions: [
                  { text: 'Chương trình tính bằng 64-bit và in đúng kết quả 1000000000000000000 (10^18)' },
                  { text: 'Phép nhân int * int tràn trước khi gán nên in ra số âm sai là -1486618624' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 main.cpp -o main && ./main\n1000000000000000000'
                  : '$ g++ -std=c++14 main.cpp -o main && ./main\n-1486618624\n[Canh bao: Du bien tich la long long, phep nhan a * b van tran kieu int!]',
                explain: isOk
                  ? 'Vì 1LL là kiểu long long đặt ở đầu phép nhân, máy tính chuyển a thành long long rồi nhân b bằng 64-bit, chứa trọn vẹn 10^18.'
                  : 'Máy tính thực hiện vế phải (a * b) theo kiểu của a và b (đều là int 32-bit). Tích 10^18 vượt ngưỡng ~2.14e9 nên bị tràn thành -1486618624 ngay trước khi được lưu vào biến tich!'
              };
            }
          },
          {
            id: 'sb_neg_modulo',
            title: 'Phòng Thí Nghiệm 3B: Bẫy Chia Lấy Dư (%) Với Số Âm Trong C++14',
            desc: 'So sánh kết quả của (3 - 10) % 5 khi giữ nguyên công thức thô vs chuẩn hóa không âm (((a - b) % m) + m) % m.',
            toggles: [
              {
                key: 'modMode',
                label: 'Công thức chia lấy dư phép trừ',
                options: [
                  { value: 'norm_mod', text: 'Chuẩn hóa không âm: (((a - b) % m) + m) % m', kind: 'ok' },
                  { value: 'raw_mod', text: 'Lấy dư trực tiếp: (a - b) % m', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isOk = state.modMode === 'norm_mod';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a = 3, b = 10, m = 5;
${isOk ? '    long long du = (((a - b) % m) + m) % m; // Chuan hoa ve [0, m - 1]' : '    long long du = (a - b) % m;            // C++14 giu dau am!'}
    cout << du << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [8],
                statusOk: isOk,
                statusText: isOk
                  ? 'Chuẩn xác: (-2 + 5) % 5 = 3, nằm gọn trong đoạn [0, 4]'
                  : 'SAI DẤU ÂM (WA): Trong C++14, (-7) % 5 trả về -2 thay vì 3!',
                predictions: [
                  { text: 'Chương trình chuẩn hóa số dư âm cộng thêm m và in ra kết quả dương đúng là 3' },
                  { text: 'Chương trình giữ nguyên dấu của số bị chia âm và in ra kết quả sai là -2' }
                ],
                console: isOk
                  ? '$ g++ -std=c++14 main.cpp -o main && ./main\n3'
                  : '$ g++ -std=c++14 main.cpp -o main && ./main\n-2\n[Canh bao: So du bi am (-2) khi thuc hien phep tru trong modulo!]',
                explain: isOk
                  ? 'Bước (a - b) % m cho -2 (thuộc (-m, m)). Cộng thêm m thành 3 (chắc chắn &gt;= 0), rồi % m lần nữa để đề phòng trường hợp số ban đầu đã dương.'
                  : 'Toán tử % trong C++14 giữ dấu của số bị chia bên trái (-7), nên (-7) % 5 = -2. Mọi bài toán đồng dư yêu cầu đáp án trong [0, m - 1] đều sẽ chấm sai nếu không cộng bù + m rồi % m.'
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
    int a = 100000, b = 100000;
    long long s = a * b;
    cout << s << '\\n';
    return 0;
}`,
            q: 'Với a = 100.000 và b = 100.000 đều khai báo là int, biến s dù có kiểu long long nhưng đoạn mã trên vẫn gặp lỗi gì?',
            options: [
              'Trình biên dịch báo lỗi cú pháp vì không cho phép gán phép nhân int vào long long',
              'Phép nhân a * b tràn ngưỡng int (~2.14e9) trước khi gán nên s bị nhận giá trị sai',
              'Phép nhân a * b chạy đúng kết quả 10^10 vì biến s bên trái tự nâng kiểu từ đầu',
              'Chương trình bị chia nguyên mất phần dư nên chỉ lưu được giá trị là 100000'
            ],
            correct: 1,
            explain: '100000 * 100000 = 10^10 &gt; 2.14e9. Vì cả a và b đều là int, C++ thực hiện a * b bằng 32-bit int (gây tràn số) rồi mới gán giá trị đã tràn đó sang biến s kiểu long long.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a = 2, b = 9, m = 5;
    long long r1 = (a - b) % m;
    long long r2 = (((a - b) % m) + m) % m;
    cout << r1 << " " << r2 << '\\n';
    return 0;
}`,
            q: 'Kết quả chính xác của r1 và r2 được in ra màn hình khi chạy đoạn mã trên bằng C++14 là gì?',
            options: [
              'In ra 3 3 vì toán tử % trong C++14 luôn tự động chuẩn hóa số dư thành số dương',
              'In ra -2 -2 vì cộng thêm m rồi % m vẫn bảo toàn dấu âm của phép trừ ban đầu',
              'In ra -2 3 vì (-7) % 5 trong C++ ra -2, còn công thức r2 đưa về số dư chuẩn 3',
              'In ra -3 2 vì phần dư của 7 chia 5 là 2 nên đảo dấu thành -3 và cộng thêm 5'
            ],
            correct: 2,
            explain: 'a - b = -7. Trong C++14, (-7) % 5 giữ dấu của -7 nên r1 = -2. Sang r2: (-2 + 5) % 5 = 3 % 5 = 3.'
          },
          {
            type: 'single',
            q: 'Cho int a = 1000000000, b = 1000000000; Cách viết nào sau đây giúp tính ĐÚNG tích 10^18 mà không bị tràn số trung gian?',
            options: [
              'long long tich = a * b; để biến bên trái tự động ép kiểu phép nhân bên phải',
              'long long tich = a * b * 1LL; để nhân hai biến int trước rồi mới nhân với 1LL',
              'long long tich = (int)(1LL * a * b); để thu gọn kết quả tích về đúng 4 byte',
              'long long tich = 1LL * a * b; để nâng cấp phép nhân lên 64-bit ngay từ đầu'
            ],
            correct: 3,
            explain: 'C++ tính từ trái sang phải theo độ ưu tiên ngang nhau của phép nhân: 1LL * a cho ra long long trước, rồi nhân tiếp với b ở chế độ 64-bit. Còn a * b * 1LL thì a * b đã tràn trước khi gặp 1LL!'
          },
          {
            type: 'multiple',
            q: 'Những nguyên tắc nào sau đây là ĐÚNG khi làm việc với kiểu số nguyên lớn và chia lấy dư (%) trong C++?',
            options: [
              'Kiểu int 32-bit chứa thoải mái tới 10^12 nên chỉ cần dùng long long khi số vượt 10^15',
              'Khi tính (A * B) % M với M = 10^9 + 7, phải dùng long long vì tích hai số &lt; M có thể tới 10^18',
              'Để tránh tràn khi tính lũy thừa hay giai thừa theo modulo, phải lấy % M ngay sau từng bước nhân',
              'Công thức (((x % M) + M) % M) giúp mọi kết quả chia dư luôn nằm trong đoạn [0, M - 1] kể cả khi x âm'
            ],
            correct: [1, 2, 3],
            explain: 'B, C và D là ba quy tắc cốt lõi của số học đồng dư trong CP. A sai hoàn toàn vì int 32-bit chỉ chứa tối đa ~2.14 * 10^9 (chỉ qua mốc 2 tỷ một chút).'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module cuối - Module 3)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_l101_int_mul_overflow',
        title: 'Bẫy Tràn Số int * int Trước Khi Gán Vào Biến Kết Quả long long',
        description: 'Chương trình đọc hai cạnh a, b &lt;= 10^9 của sân khấu hình chữ nhật và in diện tích. Dù đã khai báo dienTich là long long, khi chạy test a = 1000000, b = 1000000 lại ra số âm!',
        failingInput: '1000000 1000000',
        failingOutput: '-727379968',
        expectedOutput: '1000000000000',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int a, b;
    cin >> a >> b;
    long long dienTich = a * b;
    cout << dienTich << '\\n';
    return 0;
}`,
        bugLine: 9,
        patches: [
          { text: 'Sửa dòng 9 thành long long dienTich = 1LL * a * b; để nâng phép nhân lên 64-bit trước khi tính' },
          { text: 'Sửa dòng 9 thành long long dienTich = a * b * 1LL; để ép kiểu ở cuối biểu thức sau khi nhân' },
          { text: 'Sửa dòng 10 thành cout << (long long)dienTich << \'\\n\'; để ép kiểu ngay lúc in kết quả ra màn hình' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 9, a và b đều là int nên phép nhân a * b chạy ở 32-bit và tràn ra -727379968 trước khi gán. Đặt 1LL * ở đầu phép nhân (hoặc đổi dòng 7 thành long long a, b;) giúp tính toàn bộ bằng 64-bit.'
      },
      {
        id: 'dbg_l101_neg_modulo',
        title: 'Bẫy Số Dư Âm Khi Thực Hiện Phép Trừ Theo Modulo (%)',
        description: 'Cho 3 số a, b, m, cần in ra phần dư không âm trong [0, m - 1] của (a - b) khi chia cho m. Nhưng với a = 3, b = 10, m = 5, code lại in ra -2!',
        failingInput: '3 10 5',
        failingOutput: '-2',
        expectedOutput: '3',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a, b, m;
    cin >> a >> b >> m;
    long long du = (a - b) % m;
    cout << du << '\\n';
    return 0;
}`,
        bugLine: 9,
        patches: [
          { text: 'Sửa dòng 9 thành long long du = (((a - b) % m) + m) % m; để chuẩn hóa số dư về [0, m - 1]' },
          { text: 'Sửa dòng 9 thành long long du = (a - b) % m + m; để cộng bù thêm m vào mọi kết quả' },
          { text: 'Sửa dòng 9 thành long long du = (a % m) - (b % m); để chia dư từng số trước khi trừ nhau' }
        ],
        correctPatch: 0,
        explain: 'Trong C++14, (-7) % 5 ra -2. Nếu chỉ + m mà không % m lần nữa (phương án B), khi a - b &gt;= 0 kết quả sẽ bị cộng dư vượt quá m - 1! Còn phương án C vẫn ra 3 - 0 = 3 hoặc khi a%m &lt; b%m vẫn bị âm. Chuẩn mực là (((a - b) % m) + m) % m.'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB — KHÔNG DÙNG MẢNG)
    // ============================================================================
    practiceProblems: [
      {
        id: 'CF-4A',
        title: '4A - Watermelon',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/4/A',
        hint: 'Giới hạn 1 &lt;= w &lt;= 100. Cần chia quả dưa thành 2 phần ĐỀU CÓ CÂN NẶNG CHẴN DƯƠNG. Đừng quên bẫy trường hợp biên w = 2 (tuy chẵn nhưng 2 = 1 + 1 lẻ!): viết if (w &gt; 2 && w % 2 == 0).'
      },
      {
        id: 'VNOJ-FCB010-BIGGER',
        title: 'Beginner Free Contest 10 - BIGGER',
        judge: 'VNOJ',
        tier: 1,
        link: 'https://oj.vnoi.info/problem/fcb010_bigger',
        hint: 'Giới hạn 1 &lt;= A, B &lt;= 10. Mỗi năm cây A tăng gấp 3 lần (a *= 3;), cây B tăng gấp 2 lần (b *= 2;). Dùng vòng lặp while (a &lt;= b) đếm số năm cho đến khi a &gt; b (dùng long long để an toàn tuyệt đối).'
      },
      {
        id: 'CF-231A',
        title: '231A - Team',
        judge: 'Codeforces',
        tier: 1,
        link: 'https://codeforces.com/problemset/problem/231/A',
        hint: 'Giới hạn 1 &lt;= n &lt;= 1000. Chưa cần dùng mảng! Dùng vòng lặp for từ 1 đến n (hoặc while (n--)), mỗi lượt đọc 3 số p, v, t rồi kiểm tra if (p + v + t &gt;= 2) thì tăng biến đếm ans++.'
      },
      {
        id: 'CF-1328A',
        title: '1328A - Divisibility Problem',
        judge: 'Codeforces',
        tier: 2,
        link: 'https://codeforces.com/problemset/problem/1328/A',
        hint: 'Giới hạn 1 &lt;= t &lt;= 10^4 và 1 &lt;= a, b &lt;= 10^9. Dùng mẫu while (t--) đọc từng cặp (a, b). Nếu dùng vòng lặp while (a % b != 0) a++; sẽ bị TLE vì a, b tới 10^9! Hãy dùng rẽ nhánh kết hợp %: nếu a % b == 0 in 0, ngược lại in b - (a % b).'
      },
      {
        id: 'CSES-1068',
        title: 'Weird Algorithm',
        judge: 'CSES',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1068',
        hint: 'Giới hạn 1 &lt;= n &lt;= 10^6. Dùng vòng lặp while (n != 1) với if (n % 2 == 0) n /= 2; else n = 3 * n + 1;. BẪY TRÀN SỐ: dù đầu vào n &lt;= 10^6, giá trị trung gian khi nhân 3n + 1 vượt quá giới hạn 32-bit int! Bắt buộc khai báo long long n;'
      },
      {
        id: 'ABC174-B',
        title: 'B - Distance',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc174/tasks/abc174_b',
        hint: 'Giới hạn N &lt;= 2*10^5, |X|, |Y|, D &lt;= 2*10^5. Đọc từng tọa độ (x, y) trong vòng lặp for (không cần lưu mảng) và so sánh x * x + y * y &lt;= d * d để tránh sai số thập phân của sqrt. Chú ý (2*10^5)^2 = 4*10^10 vượt int -&gt; bắt buộc dùng long long cho x, y, d!'
      },
      {
        id: 'CF-1A',
        title: '1A - Theatre Square',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/1/A',
        hint: 'Giới hạn 1 &lt;= n, m, a &lt;= 10^9. Số viên gạch mỗi chiều làm tròn lên bằng chia nguyên: (n + a - 1) / a (hoặc dùng if (n % a != 0)). Khi a = 1 và n = m = 10^9, đáp án tới 10^18 -&gt; bắt buộc dùng long long n, m, a; từ lúc nhập!'
      },
      {
        id: 'CSES-1617',
        title: 'Bit Strings',
        judge: 'CSES',
        tier: 3,
        link: 'https://cses.fi/problemset/task/1617',
        hint: 'Giới hạn 1 &lt;= n &lt;= 10^6. Yêu cầu tính 2^n mod (10^9 + 7). Với n &lt;= 10^6, chỉ cần vòng lặp for chạy từ 1 đến n, mỗi bước tính ans = (ans * 2) % 1000000007; với long long ans = 1 là chạy kịp dưới 1 giây và không bao giờ tràn số!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
