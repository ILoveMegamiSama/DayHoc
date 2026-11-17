/**
 * DỮ LIỆU BÀI GIẢNG CHƯƠNG PHỤ CP0: CHUẨN HÓA CODE C++ HƯỚNG THI ĐẤU (MOD-CP0)
 * Nối tiếp trực tiếp từ MOD-Pre (Tiệm Bánh Mì & Anh Phụ Bếp Thật Thà)
 * Tuân thủ nghiêm ngặt ranh giới Pha 1 Lớp 9 (nền tảng nhập xuất chuẩn CP).
 */
(function() {
  const LESSON_DATA = {
    id: 'chuan_hoa_code_cp',
    number: 'Chương Phụ CP0',
    shortTitle: 'Chuẩn Hóa Code CP',
    title: 'Chương Phụ: Chuẩn Hóa Code C++ Hướng Thi Đấu (CP)',
    lead: 'Nâng cấp bộ đồ nghề từ bài Nhập môn (MOD-Pre) để bước vào đấu trường tốc độ: gói gọn thư viện bằng #include &lt;bits/stdc++.h&gt;, mở bảng tên viết tắt using namespace std; (tránh bẫy trùng tên count/min/max) và bật bộ tăng tốc Fast I/O chuẩn CP.',
    modules: [
      // ============================================================================
      // MODULE 1: THÙNG ĐỒ NGHỀ ĐA NĂNG #include <bits/stdc++.h>
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Vali #include &lt;bits/stdc++.h&gt;',
        title: 'Vấn Đề Nhỏ 1: Thùng Đồ Nghề Đa Năng #include &lt;bits/stdc++.h&gt;',
        lead: 'Giải quyết bế tắc phải nhớ và gõ hàng loạt #include rời rạc khi đi thi đấu tốc độ bằng một dòng khai báo tổng hợp chuẩn GCC.',
        subproblem: {
          title: 'Làm sao để không phải nhớ tên hàng chục thư viện rời rạc và tránh lỗi biên dịch vì quên #include khi làm bài thi?',
          desc: 'Ở bài Nhập môn (MOD-Pre), muốn dùng cin/cout phải viết #include &lt;iostream&gt;, muốn dùng string phải viết thêm #include &lt;string&gt;. Khi bước vào đề thi cần tính căn bậc hai (cmath), tìm lớn/nhỏ nhất (algorithm), làm tròn số thập phân (iomanip)..., chỉ cần quên đúng 1 dòng là Anh Thật Thà báo lỗi thiếu đồ nghề ngay!'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Từ Tủ Đồ Lẻ Tẻ Đến Chiếc Vali Đa Năng C++',
            tag: 'Thư viện tổng hợp',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Hôm nay bạn đưa <strong>Anh Thật Thà</strong> đi thi <em>Giải Đấu Vua Đầu Bếp Tốc Độ</em> (Lập trình thi đấu — CP). Trong gian bếp cũ ở <code>MOD-Pre</code>, mỗi loại dụng cụ nằm ở một chiếc tủ khóa riêng:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Tủ <code>iostream</code> đựng loa phát thanh (<code>cout</code>) và khe nhận phiếu (<code>cin</code>).</li>
                  <li>Tủ <code>string</code> đựng hộp chuỗi chữ viết.</li>
                  <li>Tủ <code>cmath</code> đựng thước tính căn bậc hai (<code>sqrt</code>), lũy thừa.</li>
                  <li>Tủ <code>algorithm</code> đựng cân so sánh lớn nhất (<code>max</code>), nhỏ nhất (<code>min</code>).</li>
                </ul>
                <p style="margin-top: 8px;">Nếu trước lúc thi phải nhớ tên từng chiếc tủ rồi mở khóa rời rạc từng cái, chỉ cần quên mở 1 tủ là công việc đình trệ. <strong>Giải pháp đời sống:</strong> Đóng gói sẵn một <strong>Chiếc Vali Đồ Nghề Đa Năng (Tất Cả Trong Một)</strong> đặt ngay trước cửa bếp <code>main()</code> — mở đúng 1 chiếc vali là có trọn bộ đồ nghề chuẩn!</p>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Thay vì viết 4–5 dòng <code>#include</code> rời rạc rất dễ sót, trong Lập trình thi đấu với trình biên dịch <code>g++</code> (GCC), ta dùng duy nhất 1 dòng ở đầu file:</p>
                <pre class="code-pre"><code>// Chi can 1 dong duy nhat thay cho &lt;iostream&gt;, &lt;string&gt;, &lt;cmath&gt;, &lt;algorithm&gt;...
#include &lt;bits/stdc++.h&gt;

int main() {
    std::string tenTiem = "Tiem Banh Mi";
    int lonNhat = std::max(12, 19);
    double canh = std::sqrt(25.0);
    std::cout &lt;&lt; tenTiem &lt;&lt; ": " &lt;&lt; lonNhat &lt;&lt; ", " &lt;&lt; canh &lt;&lt; '\\n';
    return 0;
}</code></pre>
                <p style="margin-top: 8px; font-size: 13.5px; color: var(--muted);">
                  <strong>Lưu ý trung thực:</strong> <code>#include &lt;bits/stdc++.h&gt;</code> là file tiêu đề nội bộ của trình biên dịch GCC (<code>g++</code>), chạy chuẩn 100% trên VNOJ, Codeforces, AtCoder, CSES. Trong các dự án phần mềm lớn ngoài đời (hoặc dùng Visual Studio MSVC), lập trình viên vẫn viết từng <code>#include</code> riêng để tăng tốc độ biên dịch.
                </p>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Chỉ thị tiền xử lý (Preprocessor Directive):</strong> Các dòng bắt đầu bằng dấu <code>#</code> như <code>#include</code>. Đây là khâu chuẩn bị đồ nghề <em>trước khi</em> dịch lệnh trong <code>main()</code>, nên không có dấu <code>;</code> ở cuối.</li>
                  <li><strong>Thư viện chuẩn C++ (C++ Standard Library):</strong> Bộ công cụ chính thức đi kèm C++ gồm loa-khe, chuỗi chữ, toán học và thuật toán cơ bản.</li>
                  <li><strong><code>&lt;bits/stdc++.h&gt;</code>:</strong> File tiêu đề tổng hợp của bộ biên dịch GCC giúp nạp toàn bộ thư viện chuẩn C++ chỉ với một dòng duy nhất.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_bits_header',
            title: 'Phòng Thí Nghiệm 1: Thiếu Thư Viện Rời Rạc vs Vali &lt;bits/stdc++.h&gt;',
            desc: 'So sánh phản ứng của trình biên dịch g++ khi dùng hàm sqrt() và setprecision() với hai cách khai báo thư viện.',
            toggles: [
              {
                key: 'headerMode',
                label: 'Cách nạp thư viện đầu file',
                options: [
                  { value: 'bits', text: 'Dùng vali đa năng #include &lt;bits/stdc++.h&gt;', kind: 'ok' },
                  { value: 'iostream_only', text: 'Chỉ viết #include &lt;iostream&gt; (quên cmath/iomanip)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isBits = state.headerMode === 'bits';
              const code = `${isBits ? '#include <bits/stdc++.h> // Nap tron bo thu vien chuan' : '#include <iostream>      // Thieu <cmath> va <iomanip>!'}

int main() {
    double canhKhay = std::sqrt(50.0);
    std::cout << std::fixed << std::setprecision(2) << canhKhay << '\\n'; // In dung 2 chu so thap phan
    return 0;
}`;
              return {
                code,
                changedLines: [1],
                statusOk: isBits,
                statusText: isBits
                  ? 'Biên dịch sạch 100%: Cả sqrt() lẫn setprecision() đều có sẵn trong &lt;bits/stdc++.h&gt;'
                  : 'Lỗi biên dịch: \'sqrt\' và \'setprecision\' chưa được khai báo vì thiếu &lt;cmath&gt; và &lt;iomanip&gt;!',
                predictions: [
                  { text: 'Chương trình biên dịch thành công và in ra 7.07' },
                  { text: 'Trình biên dịch báo lỗi vì không tìm thấy sqrt và setprecision' }
                ],
                console: isBits
                  ? '$ g++ -std=c++14 main.cpp -o main && ./main\n7.07'
                  : '$ g++ -std=c++14 main.cpp\nmain.cpp:4:28: error: \'sqrt\' is not a member of \'std\'\nmain.cpp:5:37: error: \'setprecision\' is not a member of \'std\'',
                explain: isBits
                  ? 'Chỉ một dòng #include &lt;bits/stdc++.h&gt; đã nạp cả &lt;iostream&gt;, &lt;cmath&gt;, &lt;iomanip&gt;, &lt;algorithm&gt;, &lt;string&gt;... giúp Anh Thật Thà tìm thấy ngay sqrt() và setprecision().'
                  : 'Thư viện &lt;iostream&gt; chỉ chứa loa-khe cin/cout. Khi gọi std::sqrt hoặc std::setprecision mà quên nạp thêm &lt;cmath&gt; và &lt;iomanip&gt;, g++ sẽ dừng ngay ở bước biên dịch!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <iostream>
int main() {
    int a = 9;
    std::cout << std::sqrt(a) << '\\n';
    return 0;
}`,
            q: 'Quan sát đoạn mã trên khi biên dịch bằng g++ -std=c++14. Kết quả thực tế sẽ như thế nào?',
            options: [
              'Chương trình biên dịch thành công và in ra giá trị 3 rồi xuống dòng mới',
              'Chương trình biên dịch thành công nhưng in ra giá trị 9 do chưa ép kiểu về số thực',
              'Trình biên dịch báo lỗi vì thiếu thư viện chứa hàm sqrt như cmath hay bits/stdc++.h',
              'Trình biên dịch tự động tải thêm thư viện toán học từ hệ thống để chạy ra kết quả 3'
            ],
            correct: 2,
            explain: 'Hàm std::sqrt() nằm trong thư viện toán học &lt;cmath&gt; (được gói sẵn trong &lt;bits/stdc++.h&gt;). Chỉ nạp &lt;iostream&gt; sẽ khiến g++ báo lỗi \'sqrt\' is not a member of \'std\'.'
          },
          {
            type: 'single',
            q: 'Vì sao trong Lập trình thi đấu (CP) với trình biên dịch g++, thí sinh thường dùng dòng #include &lt;bits/stdc++.h&gt; ở đầu file?',
            options: [
              'Vì dòng này tự động tăng tốc độ tính toán của bộ xử lý CPU lên gấp nhiều lần trong suốt quá trình chạy bài thi',
              'Vì dòng này nạp sẵn toàn bộ thư viện chuẩn C++ chỉ trong một lệnh, giúp code gọn và tránh quên khai báo thư viện',
              'Vì dòng này tự động sửa mọi lỗi cú pháp thiếu dấu chấm phẩy trước khi trình biên dịch g++ kiểm tra toàn bộ mã nguồn',
              'Vì dòng này tự động bỏ qua tiền tố std:: ở mọi câu lệnh nên không cần dùng thêm dòng khai báo using namespace std'
            ],
            correct: 1,
            explain: '#include &lt;bits/stdc++.h&gt; là file tổng hợp của GCC giúp nạp gần như toàn bộ thư viện chuẩn C++ chỉ trong 1 dòng. Nó KHÔNG tự tăng tốc CPU hay thay thế using namespace std;.'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là ĐÚNG về chỉ thị #include &lt;bits/stdc++.h&gt;?',
            options: [
              'Đây là chỉ thị tiền xử lý nên tuyệt đối không đặt dấu chấm phẩy (;) ở cuối dòng lệnh này',
              'Đây là thư viện bắt buộc có sẵn trên mọi trình biên dịch C++ kể cả Visual Studio (MSVC) gốc',
              'Dòng này hoạt động ổn định trên bộ biên dịch g++ (GCC) của các hệ thống chấm VNOJ, CSES, CF',
              'Khi dùng dòng này, ta có thể gọi ngay string, sqrt(), max() mà không cần tách nhiều #include'
            ],
            correct: [0, 2, 3],
            explain: 'A, C và D đúng. Nhận định B sai vì &lt;bits/stdc++.h&gt; là phần mở rộng của bộ biên dịch GCC (g++), không phải chuẩn mặc định trên Visual Studio MSVC.'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: USING NAMESPACE STD & BẪY ĐẶT TÊN BIẾN TRÙNG
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'using namespace std & Bẫy Tên',
        title: 'Vấn Đề Nhỏ 2: Bảng Tên Viết Tắt using namespace std; & Bẫy Đặt Tên Biến Trùng',
        lead: 'Loại bỏ tiền tố std:: lặp đi lặp lại trong mọi dòng code, đồng thời phòng tránh bẫy đụng độ tên với các hàm chuẩn như count, min, max, left, right.',
        subproblem: {
          title: 'Làm sao bỏ chữ std:: dài dòng ở mỗi dòng code mà vẫn không bị xung đột tên với đồ nghề có sẵn?',
          desc: 'Viết std::cout, std::cin, std::string liên tục rất mỏi tay và dễ sót. Nhưng ngay khi bạn mở tắt bằng using namespace std;, toàn bộ hàng trăm cái tên trong kho chuẩn (count, min, max, left, right...) đều được bày chung ra mặt bàn. Nếu bạn đặt tên chiếc hộp biến trùng với chúng, trình biên dịch sẽ lập tức báo lỗi!'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Quy Ước Gọi Tắt Trong Bếp & Vùng Cấm Đặt Tên Hộp',
            tag: 'Không gian tên',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Mọi món đồ lấy từ Vali Chuẩn Quốc Tế ở <code>MOD-Pre</code> đều phải gọi đầy đủ họ tên: <em>"Chuẩn Quốc Tế - Loa"</em> (<code>std::cout</code>), <em>"Chuẩn Quốc Tế - Khe"</em> (<code>std::cin</code>), <em>"Chuẩn Quốc Tế - Hộp Chữ"</em> (<code>std::string</code>).</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Giải pháp rút gọn:</strong> Bạn dán bảng quy ước lên tường bếp: <em>"Hễ gọi tên đồ nghề gì mà không đọc tiền tố, cứ mặc định lấy từ Vali Chuẩn Quốc Tế nhé!"</em>.</li>
                  <li><strong>Cảnh báo Bẫy Trùng Nhãn:</strong> Trong Vali Chuẩn Quốc Tế đã có sẵn các dụng cụ tên <code>count</code> (đếm), <code>min</code> (nhỏ nhất), <code>max</code> (lớn nhất), <code>left</code>, <code>right</code>, <code>size</code>. Nếu bạn cũng lấy nhãn <code>count</code> dán lên chiếc hộp riêng của bạn đặt ngoài sảnh chung, Anh Thật Thà sẽ rối tung: <em>"Gọi count là hộp của bạn hay dụng cụ đếm trong vali?"</em></li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Đặt <code>using namespace std;</code> ngay dưới dòng <code>#include</code>, và luôn tránh đặt tên biến vào "vùng cấm":</p>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

// KHONG DAT: int count = 0;  -&gt; Se bi loi "reference to 'count' is ambiguous"!
// KHONG DAT: min, max, left, right, size, next, prev, hash
int soLuong = 5; // Ten tieng Viet ro nghia hoac cnt, minVal, maxVal -&gt; An toan 100%!

int main() {
    int giaNhoNhat = min(15, 20);
    cout &lt;&lt; "So luong: " &lt;&lt; soLuong &lt;&lt; ", Gia min: " &lt;&lt; giaNhoNhat &lt;&lt; '\\n';
    return 0;
}</code></pre>
                <p style="margin-top: 8px; font-size: 13.5px; color: var(--muted);">
                  <strong>Hai kiểu lỗi hay gặp nhất ở Lớp 9:</strong> (1) Khai báo biến toàn cục <code>int count = 0;</code> rồi in <code>cout &lt;&lt; count;</code> &rarr; lỗi <code>ambiguous</code>; (2) Khai báo <code>int max = 10;</code> trong <code>main()</code> rồi gọi <code>max(3, 7)</code> &rarr; lỗi <code>'max' cannot be used as a function</code>!
                </p>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Không gian tên (Namespace):</strong> Khu vực đặt tên riêng biệt để phân biệt đồ nghề của các thư viện khác nhau; thư viện chuẩn C++ mang tên <code>std</code> (<em>Standard</em>).</li>
                  <li><strong><code>using namespace std;</code>:</strong> Câu lệnh cho phép dùng trực tiếp mọi tên trong không gian tên <code>std</code> mà không cần gõ tiền tố <code>std::</code>.</li>
                  <li><strong>Nhập nhằng / Che khuất tên (Ambiguous Reference / Shadowing):</strong> Lỗi xảy ra khi tên biến do bạn đặt trùng với hàm hoặc đối tượng đã có trong <code>std</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_namespace_collision',
            title: 'Phòng Thí Nghiệm 2: Đặt Tên Biến An Toàn vs Bẫy Trùng Tên Trong std',
            desc: 'Quan sát chuyện gì xảy ra khi bạn đặt tên biến toàn cục là count (trùng với std::count) khi đã bật using namespace std;.',
            toggles: [
              {
                key: 'varName',
                label: 'Tên chiếc hộp biến toàn cục',
                options: [
                  { value: 'safe', text: 'Tên an toàn: int soLuong = 5;', kind: 'ok' },
                  { value: 'collide', text: 'Tên trùng chuẩn: int count = 5;', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isSafe = state.varName === 'safe';
              const varId = isSafe ? 'soLuong' : 'count';
              const code = `#include <bits/stdc++.h>
using namespace std;

int ${varId} = 5; // ${isSafe ? 'Ten ro nghia, khong trung ham std' : 'NGUY HIEM: Trung voi ham std::count!'}

int main() {
    cout << "Gia tri hop: " << ${varId} << '\\n';
    return 0;
}`;
              return {
                code,
                changedLines: [4, 7],
                statusOk: isSafe,
                statusText: isSafe
                  ? 'An toàn tuyệt đối: Không trùng bất kỳ tên nào trong std, chương trình in ra 5'
                  : 'Lỗi biên dịch: reference to \'count\' is ambiguous (trùng với std::count)',
                predictions: [
                  { text: 'Chương trình biên dịch sạch và in ra Gia tri hop: 5' },
                  { text: 'Trình biên dịch báo lỗi nhập nhằng tên gọi (ambiguous)' }
                ],
                console: isSafe
                  ? '$ g++ -std=c++14 main.cpp -o main && ./main\nGia tri hop: 5'
                  : '$ g++ -std=c++14 main.cpp\nmain.cpp:7:33: error: reference to \'count\' is ambiguous\n  candidate 1: template<...> std::count(...)\n  candidate 2: int count',
                explain: isSafe
                  ? 'Tên biến soLuong (hoặc cnt, minVal, maxVal) hoàn toàn tách biệt với kho tên tiếng Anh chuẩn của C++, giúp code vừa ngắn gọn vừa an toàn.'
                  : 'Do đã bật using namespace std; và #include &lt;bits/stdc++.h&gt;, cả hàm std::count lẫn biến toàn cục count của bạn đều xuất hiện chung một chỗ, khiến g++ không biết chọn cái nào!'
              };
            }
          }
        ],
        debugExercises: [
          {
            id: 'dbg_cp0_collision',
            title: 'Bẫy Đặt Tên Biến Toàn Cục Trùng Kho Chuẩn (count)',
            description: 'Bạn học sinh viết chương trình đọc một số nguyên và in ra giá trị gấp đôi, nhưng khi nộp bài lại nhận lỗi Compilation Error (CE): "reference to \'count\' is ambiguous".',
            failingInput: '7',
            failingOutput: 'Compilation Error: reference to \'count\' is ambiguous',
            expectedOutput: '14',
            buggyCode: `#include <bits/stdc++.h>
using namespace std;

int count = 0;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cin >> count;
    cout << count * 2 << '\\n';
    return 0;
}`,
            bugLine: 4,
            patches: [
              { text: 'Đổi tên biến toàn cục ở dòng 4 thành int soLuong = 0; và cập nhật lại ở dòng 9 và dòng 10' },
              { text: 'Xóa bỏ hoàn toàn dòng using namespace std; ở dòng 2 nhưng giữ nguyên cin và cout không thêm std::' },
              { text: 'Đổi kiểu dữ liệu của biến toàn cục ở dòng 4 từ int thành double để trình biên dịch phân biệt' }
            ],
            correctPatch: 0,
            explain: 'Khi dùng #include &lt;bits/stdc++.h&gt; và using namespace std;, biến toàn cục tên count bị đụng độ trực tiếp với hàm std::count. Đổi tên thành soLuong (hoặc cnt) giúp hết xung đột hoàn toàn.'
          }
        ],
        quiz: [
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;
int count = 5;
int main() {
    cout << count << '\\n';
    return 0;
}`,
            q: 'Khi biên dịch chương trình trên bằng g++ -std=c++14, máy tính sẽ phản ứng ra sao với biến toàn cục count?',
            options: [
              'Chương trình biên dịch sạch sẽ và in ra con số 5 ở dòng đầu tiên của màn hình kết quả',
              'Chương trình biên dịch sạch sẽ và tự động đổi tên biến count thành cnt trước khi chạy',
              'Chương trình vẫn chạy bình thường nhưng tự động gán giá trị bằng 0 cho biến toàn cục',
              'Trình biên dịch báo lỗi nhập nhằng vì biến count trùng tên với hàm count có sẵn trong std'
            ],
            correct: 3,
            explain: 'Do &lt;bits/stdc++.h&gt; đã nạp sẵn std::count và dòng using namespace std; mở khóa tên đó ra toàn cục, khai báo int count = 5; gây ra lỗi reference to \'count\' is ambiguous.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int max = 10;
    cout << max(3, 7) << '\\n';
    return 0;
}`,
            q: 'Quan sát đoạn mã trên. Điều gì sẽ xảy ra ở dòng lệnh số 5 khi ta vừa đặt biến tên max vừa gọi hàm max(3, 7)?',
            options: [
              'Trình biên dịch báo lỗi vì biến max bên trong main đã che khuất mất hàm max của thư viện chuẩn',
              'Trình biên dịch tự động phân biệt được biến và hàm nên chương trình chạy bình thường in ra số 7',
              'Chương trình chạy bình thường và cộng thêm giá trị biến max vào kết quả nên in ra con số 17',
              'Chương trình không báo lỗi mà tự động lấy giá trị lớn nhất giữa số 10, số 3 và số 7 là số 10'
            ],
            correct: 0,
            explain: 'Khai báo int max = 10; bên trong main() làm tên max trở thành một biến số nguyên, che khuất hàm std::max. Khi gọi max(3, 7), g++ báo lỗi: \'max\' cannot be used as a function.'
          },
          {
            type: 'single',
            q: 'Khi đã viết using namespace std; ở đầu chương trình, nhóm tên biến nào sau đây cần TRÁNH ĐẶT để không đụng độ với thư viện chuẩn?',
            options: [
              'Các tên biến viết rõ nghĩa tiếng Việt không dấu như soLuong, tongDiem, giaBanh, chiSoTrai',
              'Các tên biến có kèm chữ số hoặc hậu tố phân biệt như minVal, maxVal, cnt1, ketQuaChinh',
              'Các tên tiếng Anh ngắn trùng đồ nghề chuẩn như count, min, max, left, right, size, next',
              'Các tên biến viết theo kiểu lạc đà hai từ ghép lại như soBanhMi, donGiaCu, tenKhachHang'
            ],
            correct: 2,
            explain: 'Các từ khóa/tên hàm thông dụng trong thư viện chuẩn như count, min, max, left, right, size, next, prev rất dễ gây lỗi biên dịch khi bật using namespace std;.'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: FAST I/O (IOS_BASE), '\n' VS ENDL & CẤM TRỘN SCANF/PRINTF
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Fast I/O & Bộ Khung CP',
        title: 'Vấn Đề Nhỏ 3 & Ghép Lại: Tăng Tốc Nhập Xuất Fast I/O, \'\\n\' vs endl & Cấm Trộn scanf/printf',
        lead: 'Hiểu bản chất 3 nguyên nhân khiến cin/cout mặc định bị chậm (TLE), cách tháo xích bằng bộ khung chuẩn CP và quy tắc sống còn không trộn printf/scanf.',
        subproblem: {
          title: 'Làm sao đọc và in hàng trăm nghìn dòng dữ liệu trong vòng 1 giây mà không bị TLE và không in đảo lộn thứ tự?',
          desc: 'Khi làm các bài thi có dữ liệu lớn (mà ngay từ bài L1-01 tới đây bạn sẽ dùng vòng lặp để đọc liên tiếp hàng trăm nghìn số), cin/cout mặc định tự đối chiếu với scanf/printf, bắt cout dọn bàn trước mỗi lần cin đọc và lệnh endl ép xả sổ ở từng dòng. Chỉ cần quên tháo 3 sợi xích này, bài làm đúng thuật toán vẫn nhận ngay kết quả TLE!'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Tháo Dây Xích Đồng Bộ & Cấm Trộn Loa Cũ scanf/printf',
            tag: 'Fast I/O',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề &amp; Cách giải quyết trong đời sống</span>
                <p>Trước khi C++ ra đời, ngôn ngữ lập trình cũ hơn là C dùng thư viện nhập xuất thế hệ cũ <code>&lt;cstdio&gt;</code> (gọi tắt là <code>stdio</code> — gồm lệnh <code>printf</code> để in và <code>scanf</code> để đọc). Khi tiệm bánh tiếp đón hàng trăm nghìn đơn hàng trong 1 giây, <strong>Anh Thật Thà</strong> bị chậm vì 2 quy trình kiểm tra thừa thãi:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Trạm gác đồng bộ (<code>sync_with_stdio</code>):</strong> Cứ mỗi lần dùng loa mới <code>cout</code> hay khe mới <code>cin</code>, anh ấy lại chạy qua đối chiếu sổ với bộ <code>stdio</code> cũ (<code>printf/scanf</code>) để phòng có người dùng trộn hai bộ cùng lúc &rarr; tốn thời gian gấp bội!</li>
                  <li><strong>Dây buộc dọn bàn (<code>cin.tie</code>):</strong> Hễ chuẩn bị nhận phiếu mới ở khe <code>cin</code>, anh ấy lại dừng bếp bắt loa <code>cout</code> phải dọn sạch chữ đang chờ ra màn hình rồi mới đọc số tiếp theo!</li>
                </ul>
                <p style="margin-top: 8px;"><strong>Giải pháp:</strong> Cắt trạm gác đối chiếu và cởi dây buộc dọn bàn — nhưng từ giây phút đó, <strong>TUYỆT ĐỐI KHÔNG ĐƯỢC DÙNG TRỘN</strong> bộ loa cũ <code>printf/scanf</code> nữa, vì hai sổ tách rời nhau sẽ đọc/in lộn xộn thứ tự!</p>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào Bộ Khung Chuẩn CP C++14</span>
                <p>Đây là <strong>Bộ Khung Chuẩn CP</strong> bạn sẽ viết ở đầu MỌI bài giải từ <code>L1-01</code> trở đi:</p>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); // Ngat dong bo voi scanf/printf
    cin.tie(NULL);                    // Khong bat cout xa ban truoc moi lan cin

    int a, b;
    cin &gt;&gt; a &gt;&gt; b;
    cout &lt;&lt; a + b &lt;&lt; '\\n'; // Luon dung '\\n', KHONG tron printf() / scanf()!

    return 0;
}</code></pre>
                <p style="margin-top: 8px; font-size: 13.5px; color: var(--muted);">
                  <strong>Mẹo thi đấu Online Judge:</strong> Trên VNOJ, Codeforces, AtCoder, đề bài đọc trực tiếp dữ liệu do máy chấm đẩy vào. Bạn chỉ cần viết <code>cin &gt;&gt; a &gt;&gt; b;</code>, <strong>không</strong> in thêm lời mời <code>"Hay nhap a:"</code> kẻo bị tính dư chữ (Wrong Answer)!
                </p>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>ios_base::sync_with_stdio(false);</code>:</strong> Tắt đồng bộ giữa luồng nhập xuất C++ (<code>cin/cout</code>) và C (<code>scanf/printf</code>) để giải phóng tốc độ.</li>
                  <li><strong><code>cin.tie(NULL);</code>:</strong> Tháo liên kết buộc <code>cin</code> phải đợi <code>cout</code> xả hết bộ đệm trước khi đọc.</li>
                  <li><strong>Bộ đệm (Buffer) &amp; Xả bộ đệm (Flush):</strong> Khay chứa tạm giúp gom nhiều dữ liệu xuất/nhập cùng lúc thay vì gửi lẻ tẻ từng dòng.</li>
                </ul>
              </div>
            `
          },
          {
            heading: 'So Sánh Ký Tự \'\\n\' vs endl — Chi Tiết Nhỏ Cứu Sống Hàng Nghìn Bài Thi',
            tag: 'Tránh lỗi TLE',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Gửi từng bức thư lẻ tẻ vs Gom vào khay rồi gửi 1 lượt</span>
                <p>Hãy hình dung bạn cần in 100.000 dòng hóa đơn:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Dùng <code>endl</code>:</strong> Vừa xuống dòng, vừa bắt Anh Thật Thà <em>dừng tay chạy ngay ra bưu điện gửi bức thư đó đi</em> (<code>flush</code>). Chạy đi chạy về 100.000 chuyến lẻ tẻ sẽ khiến anh kiệt sức và quá giờ!</li>
                  <li><strong>Dùng <code>'\\n'</code>:</strong> Chỉ viết dấu xuống dòng gọn vào khay tạm trên bàn. Khi khay đầy hoặc hết ca làm, máy tính gửi đi một lượt chỉ tốn vài chuyến cực nhanh!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào code C++</span>
                <pre class="code-pre"><code>// NEN DUNG trong 99% bai thi CP:
cout &lt;&lt; "Ket qua: " &lt;&lt; dapAn &lt;&lt; '\\n';

// CHI DUNG endl trong bai toan tuong tac (Interactive) can may cham thay ngay:
// cout &lt;&lt; "? 5" &lt;&lt; endl;</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi &amp; Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>'\\n'</code> (Newline Character):</strong> Ký tự xuống dòng thuần túy đặt trong nháy đơn (hoặc <code>"\\n"</code> trong chuỗi), không ép xả bộ đệm.</li>
                  <li><strong>TLE (Time Limit Exceeded):</strong> Kết quả chấm báo chương trình chạy vượt quá thời gian giới hạn (thường là 1–2 giây) — nguyên nhân kinh điển khi đọc/in nhiều dòng mà quên Fast I/O hoặc lạm dụng <code>endl</code>.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_fast_io_mix',
            title: 'Phòng Thí Nghiệm 3: Chuẩn Fast I/O vs Bẫy Trộn cout Với printf',
            desc: 'Thử nghiệm hiệu ứng đảo lộn thứ tự in trên màn hình khi đã gọi ios_base::sync_with_stdio(false); nhưng lại trộn cout và printf.',
            toggles: [
              {
                key: 'ioStyle',
                label: 'Cách dùng luồng xuất dữ liệu',
                options: [
                  { value: 'pure_cout', text: 'Thuần cout + \'\\n\' (Chuẩn Fast I/O)', kind: 'ok' },
                  { value: 'mixed_printf', text: 'Trộn lẫn cout và printf (Vi phạm quy tắc)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isPure = state.ioStyle === 'pure_cout';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cout << "Dong 1 (cout)\\n";
${isPure ? '    cout << "Dong 2 (cout)\\n";' : '    printf("Dong 2 (printf)\\n"); // LOI: Tron printf sau khi ngat dong bo!'}
    cout << "Dong 3 (cout)\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [9],
                statusOk: isPure,
                statusText: isPure
                  ? 'Thứ tự hoàn hảo: Cả 3 dòng dùng chung 1 khay đệm cout nên in đúng 1 → 2 → 3'
                  : 'LOẠN THỨ TỰ (Wrong Answer): Dong 2 (printf) nhảy lên in TRƯỚC Dong 1 (cout)!',
                predictions: [
                  { text: 'Màn hình in đúng thứ tự từ trên xuống: Dong 1, Dong 2, rồi Dong 3' },
                  { text: 'Thứ tự các dòng bị đảo lộn vì khay cout và printf chạy tách rời nhau' }
                ],
                console: isPure
                  ? '$ g++ -std=c++14 main.cpp -o main && ./main\nDong 1 (cout)\nDong 2 (cout)\nDong 3 (cout)'
                  : '$ g++ -std=c++14 main.cpp -o main && ./main\nDong 2 (printf)\nDong 1 (cout)\nDong 3 (cout)\n[Canh bao: Dong 2 da nhay len truoc Dong 1 gay sai ket qua!]',
                explain: isPure
                  ? 'Khi chỉ dùng thuần cout và ký tự \'\\n\', mọi dòng đều xếp ngay ngắn vào cùng một khay nhớ đệm rồi xuất ra đúng thứ tự 1 → 2 → 3 với tốc độ cao nhất.'
                  : 'Lệnh sync_with_stdio(false) đã cắt liên lạc giữa khay của cout (C++) và khay của printf (C). printf xuất ra trước trong khi Dong 1 vẫn đang nằm chờ trong khay đệm của cout!'
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
    cout << "Dong 1\\n";
    printf("Dong 2\\n");
    cout << "Dong 3\\n";
    return 0;
}`,
            q: 'Khi đã bật ios_base::sync_with_stdio(false); mà lại trộn cout với printf như đoạn mã trên, nguy cơ nào dễ xảy ra khi chấm bài trên Linux/OJ?',
            options: [
              'Trình biên dịch g++ từ chối dịch file mã nguồn và báo lỗi cú pháp ngay ở dòng gọi lệnh printf',
              'Hai luồng dùng khay đệm tách rời nên "Dong 2" từ printf có thể nhảy lên in trước "Dong 1" của cout',
              'Lệnh printf tự động xóa trắng toàn bộ dữ liệu mà các lệnh cout phía trước đã ghi vào bộ nhớ đệm',
              'Chương trình chỉ in ra duy nhất "Dong 1" rồi tự động dừng lại trước khi chạy tới lệnh printf'
            ],
            correct: 1,
            explain: 'Sau khi gọi ios_base::sync_with_stdio(false);, bộ đệm của cout và printf hoạt động độc lập, nên dòng in từ printf có thể xuất ra màn hình trước dòng cout nằm phía trên nó.'
          },
          {
            type: 'trace',
            traceCode: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int a = 4, b = 7;
    cout << a + b << '\\n' << a * b << '\\n';
    return 0;
}`,
            q: 'Kết quả chính xác xuất ra màn hình của đoạn mã chuẩn CP trên là gì?',
            options: [
              'In cả hai số 11 và 28 dính liền nhau trên cùng một dòng thành chuỗi 1128',
              'In số 11 ở dòng một rồi dừng lại chờ người dùng gõ thêm Enter mới in số 28',
              'In số 11 ở dòng đầu tiên, xuống dòng mới rồi in tiếp số 28 ở dòng thứ hai',
              'In hai dòng chữ nguyên văn là a + b ở dòng đầu và a * b ở dòng thứ hai'
            ],
            correct: 2,
            explain: 'Băng chuyền toán tử &lt;&lt; xuất tổng a + b = 11, gặp ký tự \'\\n\' nên xuống dòng mới, sau đó xuất tích a * b = 28 và xuống dòng kết thúc.'
          },
          {
            type: 'single',
            q: 'Vì sao trong Lập trình thi đấu (CP), ta luôn dùng ký tự \'\\n\' thay cho endl khi cần xuống dòng nhiều lần?',
            options: [
              'Vì \'\\n\' chỉ ghi ký tự xuống dòng vào bộ đệm, còn endl ép xả bộ đệm ngay mỗi dòng gây chậm và dễ TLE',
              'Vì \'\\n\' tự động tắt đồng bộ giữa C và C++, còn endl luôn bật lại chế độ kiểm tra lỗi cú pháp sau mỗi dòng',
              'Vì \'\\n\' giúp giữ nguyên phần thập phân của số thực, còn endl tự động làm tròn kết quả về số nguyên gần nhất',
              'Vì \'\\n\' dùng được cho mọi kiểu biến số nguyên và chuỗi, còn endl chỉ hỗ trợ xuống dòng cho kiểu số nguyên'
            ],
            correct: 0,
            explain: 'Lệnh endl vừa chèn xuống dòng vừa thực hiện thao tác flush (xả bộ đệm ngay lập tức). Khi in hàng trăm nghìn dòng, số lần flush quá lớn sẽ làm chương trình chạy chậm và bị TLE.'
          },
          {
            type: 'multiple',
            q: 'Những quy tắc nào sau đây thuộc Bộ Khung Chuẩn CP hoàn chỉnh cho bài thi tốc độ thông thường?',
            options: [
              'Dùng #include &lt;bits/stdc++.h&gt; kết hợp với using namespace std; ngay ở phần đầu file',
              'Gọi cặp lệnh ios_base::sync_with_stdio(false); và cin.tie(NULL); ngay đầu hàm main()',
              'Kết hợp dùng xen kẽ cả scanf/printf lẫn cin/cout để tận dụng tốc độ của cả hai thư viện',
              'Dùng ký tự \'\\n\' để xuống dòng và tránh đặt tên biến trùng với count, min, max, left, right'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D là 3 mảnh ghép chuẩn mực của bộ khung CP. C hoàn toàn sai vì tuyệt đối cấm trộn scanf/printf với cin/cout khi đã tắt đồng bộ.'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (hiển thị tại Module cuối)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_cp0_mix_io',
        title: 'Bẫy Đảo Lộn Thứ Tự In Khi Trộn cout Và printf Trong Fast I/O',
        description: 'Chương trình đã bật Fast I/O nhưng người viết lại chèn một lệnh printf vào giữa hai lệnh cout, khiến kết quả in ra bị nhảy dòng sai thứ tự trên máy chấm.',
        failingInput: '(Không cần nhập dữ liệu đầu vào)',
        failingOutput: 'Ket qua 2: 20 (in trước!) -> Ket qua 1: 10 -> Ket qua 3: 30',
        expectedOutput: 'Ket qua 1: 10 -> Ket qua 2: 20 -> Ket qua 3: 30',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout << "Ket qua 1: 10\\n";
    printf("Ket qua 2: 20\\n");
    cout << "Ket qua 3: 30\\n";
    return 0;
}`,
        bugLine: 8,
        patches: [
          { text: 'Xóa dòng cin.tie(NULL); ở dòng 6 để tự động đồng bộ lại bộ đệm của cout và printf' },
          { text: 'Thay dòng 8 thành cout << "Ket qua 2: 20\\n"; để toàn bộ chương trình dùng thuần cout' },
          { text: 'Đổi ký tự \\n ở dòng 7 thành endl để ép lệnh printf ở dòng 8 đợi in đúng hàng' }
        ],
        correctPatch: 1,
        explain: 'Sau khi gọi ios_base::sync_with_stdio(false);, bộ đệm của cout và printf tách rời hoàn toàn. Cách sửa chuẩn CP duy nhất là thay printf ở dòng 8 thành cout để dùng thống nhất một luồng C++.'
      },
      {
        id: 'dbg_cp0_missing_header',
        title: 'Bẫy Thiếu Thư Viện Khi Dùng #include &lt;iostream&gt; Rời Rạc',
        description: 'Tìm dòng khai báo thư viện ở đầu file khiến chương trình báo lỗi "\'sqrt\' was not declared in this scope" khi gọi hàm tính căn bậc hai, và chuẩn hóa theo bộ khung CP.',
        failingInput: '(Biên dịch bằng g++ -std=c++14)',
        failingOutput: 'error: \'sqrt\' was not declared in this scope',
        expectedOutput: '4',
        buggyCode: `#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int dienTich = 16;
    cout << sqrt(dienTich) << '\\n';
    return 0;
}`,
        bugLine: 1,
        patches: [
          { text: 'Thay dòng 1 thành #include <bits/stdc++.h> để nạp trọn bộ thư viện chuẩn C++' },
          { text: 'Thay dòng 1 thành #include <string> để hỗ trợ in kết quả số học ra màn hình' },
          { text: 'Xóa dòng using namespace std; ở dòng 2 để hàm sqrt() tự động được mở khóa' }
        ],
        correctPatch: 0,
        explain: '&lt;iostream&gt; không chứa các hàm toán học như sqrt(). Chuẩn hóa dòng 1 thành #include &lt;bits/stdc++.h&gt; sẽ nạp đầy đủ cả &lt;cmath&gt;, &lt;algorithm&gt;, &lt;string&gt;, &lt;iostream&gt;... chỉ trong 1 dòng.'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN (ĐÃ XÁC THỰC QUA SEARCH_WEB)
    // ============================================================================
    practiceProblems: [
      {
        id: 'VNOJ-POST',
        title: 'A cộng B',
        judge: 'VNOJ',
        tier: 1,
        link: 'https://oj.vnoi.info/problem/post',
        hint: 'Giới hạn 1 &lt;= A, B &lt;= 1000. Gõ lại trọn vẹn bộ khung chuẩn CP (#include &lt;bits/stdc++.h&gt;, using namespace std;, ios_base::sync_with_stdio(false); cin.tie(NULL);), đọc cin &gt;&gt; a &gt;&gt; b; và in cout &lt;&lt; a + b &lt;&lt; \'\\n\'; không in thêm lời nhắc.'
      },
      {
        id: 'ABC172-A',
        title: 'A - Calc',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/abc172/tasks/abc172_a',
        hint: 'Giới hạn 1 &lt;= a &lt;= 10. Dùng bộ khung chuẩn CP, nhập số nguyên a rồi tính trực tiếp a + a * a + a * a * a và in kèm \'\\n\'.'
      },
      {
        id: 'ABC134-A',
        title: 'A - Dodecagon',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/abc134/tasks/abc134_a',
        hint: 'Giới hạn 1 &lt;= r &lt;= 100. Nhập bán kính r và xuất diện tích thập nhị giác đều 3 * r * r theo bộ khung chuẩn CP.'
      },
      {
        id: 'ABC211-A',
        title: 'A - Blood Pressure',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc211/tasks/abc211_a',
        hint: 'Giới hạn 50 &lt;= B &lt;= A &lt;= 300. Tính huyết áp trung bình (A - B) / 3.0 + B (dùng 3.0 để không dính bẫy chia nguyên từ MOD-Pre), và nhớ thêm cout &lt;&lt; fixed &lt;&lt; setprecision(6) để in đủ độ chính xác thập phân theo yêu cầu AtCoder.'
      },
      {
        id: 'ABC184-A',
        title: 'A - Determinant',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc184/tasks/abc184_a',
        hint: 'Giới hạn -100 &lt;= a, b, c, d &lt;= 100. Dù dữ liệu cho trên 2 dòng, cin &gt;&gt; a &gt;&gt; b &gt;&gt; c &gt;&gt; d; tự động bỏ qua khoảng trắng/xuống dòng. In a * d - b * c kèm \'\\n\'.'
      },
      {
        id: 'CF-50A',
        title: '50A - Domino piling',
        judge: 'Codeforces',
        tier: 2,
        link: 'https://codeforces.com/problemset/problem/50/A',
        hint: 'Giới hạn 1 &lt;= M &lt;= N &lt;= 16. Mỗi quân domino phủ 2 ô, nên tận dụng chính phép chia nguyên (M * N) / 2 để tìm số quân tối đa trên bảng M x N.'
      },
      {
        id: 'CF-617A',
        title: '617A - Elephant',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/617/A',
        hint: 'Giới hạn 1 &lt;= x &lt;= 10^6. Chú voi đi tối đa 5 đơn vị mỗi bước. Để làm tròn lên phép chia x / 5 mà chưa cần dùng if/else, hãy dùng công thức chia nguyên (x + 4) / 5!'
      },
      {
        id: 'CF-546A',
        title: '546A - Soldier and Bananas',
        judge: 'Codeforces',
        tier: 3,
        link: 'https://codeforces.com/problemset/problem/546/A',
        hint: 'Giới hạn 1 &lt;= k, w &lt;= 1000 và 0 &lt;= n &lt;= 10^9. Tính tổng tiền w quả chuối bằng công thức k * w * (w + 1) / 2 (vẫn nằm gọn trong kiểu int), rồi dùng hàm max(0, tongTien - n) có sẵn từ &lt;bits/stdc++.h&gt; để in kết quả mà không cần dùng if/else hay vòng lặp! (Nhớ không đặt tên biến trùng với max).'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
