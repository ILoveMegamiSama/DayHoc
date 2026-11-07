/*
 * BÀI GIẢNG TƯƠNG TÁC: TỰ CODE MÁY CHẤM (STRESS TESTING) C++14
 * Hỗ trợ: Bật/tắt thành phần code (Toggles), Copy Code C++ thuần,
 * Mô phỏng Console + File Inspector (.inp, .out, .ans), Câu hỏi thảo luận & Trắc nghiệm.
 */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlightCppLine(rawLine) {
  const cmtIdx = rawLine.indexOf('//');
  let codePart = cmtIdx >= 0 ? rawLine.slice(0, cmtIdx) : rawLine;
  const cmtPart = cmtIdx >= 0 ? rawLine.slice(cmtIdx) : '';

  if (/^\s*#/.test(codePart)) {
    const escapedMacro = escapeHtml(codePart);
    const escapedCmt = cmtPart ? `<span class="hl-cmt">${escapeHtml(cmtPart)}</span>` : '';
    return `<span class="hl-macro">${escapedMacro}</span>${escapedCmt}`;
  }

  const tokens = [];
  let tokenized = codePart.replace(/"([^"\\]|\\.)*"/g, (m) => {
    const id = `@@STR_${tokens.length}@@`;
    tokens.push(`<span class="hl-str">${escapeHtml(m)}</span>`);
    return id;
  });

  tokenized = escapeHtml(tokenized);

  tokenized = tokenized.replace(
    /\b(using|namespace|std|return|for|while|if|else|const|auto|void|break|exit|true|false)\b/g,
    '<span class="hl-kw">$1</span>'
  );

  tokenized = tokenized.replace(
    /\b(int|long|bool|char|string|vector|ifstream|ofstream|mt19937|mt19937_64|uniform_int_distribution|steady_clock|cin|cout|stdin|stdout|NULL)\b/g,
    '<span class="hl-type">$1</span>'
  );

  tokenized = tokenized.replace(
    /\b(main|generate|compare|system|freopen|Rand|sort|swap|max|min|lower_bound|upper_bound|time|srand|rand|close|assert)\b(?=\s*\()/g,
    '<span class="hl-fn">$1</span>'
  );

  tokenized = tokenized.replace(/\b(\d+(?:LL)?)\b/g, '<span class="hl-num">$1</span>');

  tokens.forEach((htmlSpan, idx) => {
    tokenized = tokenized.replace(`@@STR_${idx}@@`, htmlSpan);
  });

  const renderedCmt = cmtPart ? `<span class="hl-cmt">${escapeHtml(cmtPart)}</span>` : '';
  return tokenized + renderedCmt;
}

function highlightCpp(rawCode, changedLines = []) {
  const changedSet = new Set(changedLines);
  const lines = String(rawCode).split('\n');
  return lines
    .map((line, idx) => {
      const lineNo = idx + 1;
      const isChanged = changedSet.has(lineNo);
      const cls = isChanged ? 'code-line hl-changed' : 'code-line';
      return `<span class="${cls}"><span class="line-no">${lineNo}</span>${highlightCppLine(line)}</span>`;
    })
    .join('\n');
}

const MODULES_DATA = [
  // ============================================================================
  // MODULE 1: DỮ LIỆU NẰM Ở ĐÂU & 3 CƠ CHẾ NHẬP XUẤT
  // ============================================================================
  {
    id: 'm1',
    number: 'Module 01',
    shortTitle: 'RAM, Ổ Cứng & Nhập Xuất',
    title: 'Dữ Liệu Nằm Ở Đâu? & Bản Chất 3 Cơ Chế Nhập Xuất C++',
    lead: 'Hiểu từ gốc cho người mới bắt đầu: Byte là gì, sự khác biệt giữa RAM (Bàn làm việc) và Ổ cứng (Tủ hồ sơ), cơ chế Buffer ("Chiếc xe tải gom hàng") và tại sao máy chấm bắt buộc phải kết hợp cả cin/cout, freopen lẫn ofstream.',
    sections: [
      {
        num: '1.1',
        heading: 'Góc nhìn cho người mới: Byte, RAM (Bàn làm việc) và Ổ cứng (Tủ hồ sơ)',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Byte là gì? <span class="concept-tag">Đơn vị dữ liệu</span></h4>
              <p>Hãy tưởng tượng mỗi <strong>1 Byte</strong> là một ô giấy nhỏ chứa đúng <strong>1 ký tự</strong> (ví dụ chữ cái <code>'A'</code>, chữ số <code>'5'</code>, dấu cách <code>' '</code>, hoặc dấu xuống dòng <code>'\\n'</code>).</p>
              <ul>
                <li>Khi bạn mở file <code>BAI1.inp</code> thấy ghi số <code>100</code>, máy tính thực chất lưu 3 byte ký tự: <code>'1'</code>, <code>'0'</code>, <code>'0'</code>.</li>
                <li>File <strong>0 byte</strong> nghĩa là tờ giấy trắng tinh, chưa có bất kỳ chữ hay số nào bên trong.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. RAM — "Bàn làm việc cá nhân" <span class="concept-tag">Bộ nhớ tạm</span></h4>
              <p>Mọi biến bạn khai báo trong C++ như <code>int n;</code>, <code>long long a[1000];</code> đều nằm trên <strong>RAM</strong>:</p>
              <ul>
                <li><strong>Tốc độ cực nhanh:</strong> CPU lấy dữ liệu trên bàn làm việc chỉ mất vài phần tỷ giây.</li>
                <li><strong>Mất sạch khi tắt:</strong> Chương trình chạy xong hoặc mất điện là bàn làm việc được dọn sạch.</li>
                <li><strong>Cách ly tuyệt đối:</strong> Mỗi chương trình (<code>MAYCHAM.exe</code>, <code>BAI1.exe</code>) ngồi ở một phòng riêng, <strong>không thể nhìn thấy biến trên RAM của nhau</strong>!</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>3. Ổ cứng (Disk) — "Tủ hồ sơ chung" <span class="concept-tag">Lưu trữ File</span></h4>
              <p>Các file <code>BAI1.inp</code>, <code>BAI1.out</code>, <code>BAI1.ans</code> nằm trên <strong>Ổ cứng (SSD/HDD)</strong>:</p>
              <ul>
                <li><strong>Bền vững:</strong> Chương trình tắt đi thì file vẫn nằm nguyên trong thư mục.</li>
                <li><strong>Cầu nối giao tiếp:</strong> Vì <code>MAYCHAM.exe</code> không thể truyền trực tiếp mảng <code>a[]</code> trong RAM cho <code>BAI1.exe</code>, nó phải ghi đề bài ra tờ giấy <code>BAI1.inp</code> trong Tủ hồ sơ (Ổ cứng) để <code>BAI1.exe</code> mở ra đọc!</li>
              </ul>
            </div>
          </div>
          <div class="analogy-box">
            <strong>Ẩn dụ "Chiếc xe tải gom hàng" (Buffer / Bộ đệm):</strong><br/>
            Đi từ Bàn làm việc (RAM) xuống Tủ hồ sơ (Ổ cứng) rất xa và tốn sức. Vì thế, khi bạn viết lệnh ghi file <code>inp &lt;&lt; n;</code>, C++ <strong>chưa ghi xuống ổ cứng ngay đâu!</strong> Nó xếp tạm số <code>n</code> lên một thùng xe tải chờ trên RAM gọi là <strong>Buffer (Bộ đệm)</strong>. Chiếc xe tải này chỉ chịu chạy xuống ổ cứng khi: (1) Thùng xe đầy (thường vài nghìn byte), (2) Chương trình kết thúc hẳn, hoặc (3) Bạn ra lệnh đóng cửa xe bằng <strong><code>inp.close()</code></strong>!
          </div>
        `
      },
      {
        num: '1.2',
        heading: 'So sánh bản chất 3 cơ chế Nhập Xuất trong C++',
        html: `
          <div class="diagram-box">[Bàn phím (stdin)] ----&gt; cin                 cout ----&gt; [Màn hình đen (stdout)]
                          |                    |
        (Nếu gọi freopen: Bẻ cứng ống dẫn của cin/cout cắm thẳng vào File!)
                          v                    v
                    [BAI1.inp]            [BAI1.out]

        (Nếu dùng ifstream / ofstream: Tạo ống dẫn RIÊNG, giữ nguyên cin/cout cho màn hình!)
        ofstream inp("BAI1.inp") ----&gt; [BAI1.inp]   (còn cout vẫn in ra Màn hình đen!)</div>
          <table class="comp-table">
            <thead>
              <tr>
                <th>Tiêu chí</th>
                <th>1. <code>cin</code> / <code>cout</code> (Luồng chuẩn)</th>
                <th>2. <code>freopen(...)</code> (Bẻ hướng luồng)</th>
                <th>3. <code>ifstream</code> / <code>ofstream</code> (Luồng file độc lập)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Bản chất</strong></td>
                <td>Đọc từ bàn phím (<code>stdin</code>), in ra màn hình console (<code>stdout</code>). <em>(Lưu ý: <code>scanf/printf</code> của C cũng dùng chung luồng này nhưng ta chỉ dùng <code>cin/cout</code>).</em></td>
                <td>Bẻ thẳng "ống nước" toàn cục của <code>stdin</code> / <code>stdout</code> vào file trên ổ cứng.</td>
                <td>Tạo một biến đối tượng mới (như <code>ofstream inp</code>) nối riêng với file, không đụng chạm tới <code>cin/cout</code>.</td>
              </tr>
              <tr>
                <td><strong>Dùng ở đâu?</strong></td>
                <td>Dùng trong <code>MAYCHAM.cpp</code> để in thông báo <code>"Test 1: CORRECT!"</code> ra màn hình đen.</td>
                <td>Dùng ở đầu hàm <code>main()</code> của <strong><code>BAI1.cpp</code></strong> và <strong><code>BAI1_TRAU.cpp</code></strong>.</td>
                <td>Dùng trong hàm <strong><code>generate()</code> của <code>MAYCHAM.cpp</code></strong> để ghi đề bài vào file <code>.inp</code>.</td>
              </tr>
              <tr>
                <td><strong>Tại sao?</strong></td>
                <td>Giúp ta theo dõi tiến độ chấm trực tiếp trên cửa sổ Console.</td>
                <td>Chỉ cần thêm 2 dòng ở đầu bài thi, mọi lệnh <code>cin/cout</code> bên dưới tự động đọc/ghi file mà không phải sửa tên biến.</td>
                <td>Sinh 100 test trong vòng lặp: mở file <code>.inp</code> $\rightarrow$ ghi test $\rightarrow$ gọi <code>inp.close()</code> để xả Buffer ngay, mà không làm hỏng <code>cout</code> của màn hình!</td>
              </tr>
            </tbody>
          </table>
        `
      }
    ],
    discussions: [
      {
        id: 'd1_1',
        question: 'Câu hỏi thảo luận 1: Tại sao trong hàm generate() của Máy Chấm, nếu ta dùng freopen("BAI1.inp", "w", stdout) rồi dùng cout để in đề bài, thì khi chạy Máy Chấm màn hình đen lại tối thui không hiện dòng "Test 1: CORRECT!" nào?',
        answer: 'Vì <code>freopen(..., "w", stdout)</code> đã bẻ vĩnh viễn ống dẫn <code>stdout</code> (vốn nối với màn hình đen) cắm thẳng vào file <code>BAI1.inp</code>! Từ giây phút đó trở đi, mọi lệnh <code>cout &lt;&lt; "Test 1: CORRECT!"</code> ở hàm <code>compare()</code> đều bị ghi đè thẳng vào trong file <code>BAI1.inp</code> chứ không còn đường nào ra màn hình nữa!'
      },
      {
        id: 'd1_2',
        question: 'Câu hỏi thảo luận 2: Chuyện gì xảy ra nếu bạn mở ofstream inp("BAI1.inp") ở ngoài hàm main(), ghi dữ liệu xong mà KHÔNG gọi inp.close(), rồi gọi ngay system("BAI1.exe")?',
        answer: 'Do dữ liệu sinh ra ít (chỉ vài chục byte), nó vẫn đang nằm chờ trên "chiếc xe tải Buffer" ở trong RAM của <code>MAYCHAM.exe</code> chứ chưa được đổ xuống ổ cứng. Khi <code>BAI1.exe</code> mở <code>BAI1.inp</code> trên ổ cứng ra đọc, nó sẽ thấy một <strong>file trắng trơn (0 byte)</strong> và chạy ra kết quả rác!'
      }
    ],
    sandboxes: [
      {
        id: 'sb1_1',
        title: 'Phòng thí nghiệm 1: Cơ chế Buffer (.close()) & Sự khác biệt giữa ofstream và freopen',
        desc: 'Hãy thử gạt công tắc để xem điều gì xảy ra với Màn hình Console và bên trong file BAI1.inp khi chạy Máy Chấm.',
        toggles: [
          {
            key: 'streamMode',
            label: '1. Cách ghi file BAI1.inp',
            options: [
              { value: 'ofstream', text: 'Dùng ofstream inp (Chuẩn)', kind: 'ok' },
              { value: 'freopen', text: 'Dùng freopen stdout (Lỗi)', kind: 'bug' }
            ]
          },
          {
            key: 'closeMode',
            label: '2. Lệnh đóng luồng cuối generate()',
            options: [
              { value: 'closed', text: 'Có gọi inp.close() (Chuẩn)', kind: 'ok' },
              { value: 'unclosed', text: 'Biến toàn cục quên .close() (Lỗi kẹt Buffer)', kind: 'bug' }
            ]
          }
        ],
        build(state) {
          const useFreopen = state.streamMode === 'freopen';
          const noClose = state.closeMode === 'unclosed';
          const changed = [];

          let code = `#include <bits/stdc++.h>
using namespace std;
#define NAME "BAI1"
`;
          if (!useFreopen && noClose) {
            code += `ofstream inp(NAME ".inp"); // Khai báo toàn cục nhưng quên close()!\n`;
            changed.push(4);
          }
          code += `
void generate() {`;
          if (useFreopen) {
            code += `
    freopen(NAME ".inp", "w", stdout); // Bẻ luôn stdout vào file .inp!
    cout << 5 << "\\n";
    cout << "2 -1 4 -3 5\\n";`;
            changed.push(6, 7, 8);
          } else if (noClose) {
            code += `
    inp << 5 << "\\n";
    inp << "2 -1 4 -3 5\\n";
    // QUÊN inp.close() -> Dữ liệu còn kẹt trên Buffer RAM!`;
            changed.push(7, 8, 9);
          } else {
            code += `
    ofstream inp(NAME ".inp"); // Tạo ống dẫn riêng vào file .inp
    inp << 5 << "\\n";
    inp << "2 -1 4 -3 5\\n";
    inp.close(); // Đóng luồng -> Ép xe tải Buffer đổ xuống ổ cứng ngay!`;
          }
          code += `
}

int main() {
    for (int iTest = 1; iTest <= 2; iTest++) {
        generate();
        system(NAME ".exe");
        cout << "Test " << iTest << ": CORRECT!\\n";
    }
    return 0;
}`;

          if (useFreopen) {
            return {
              code,
              changedLines: changed,
              statusOk: false,
              statusText: 'LỖI NGHIÊM TRỌNG: Màn hình Console tối đen vì stdout đã bị freopen bẻ vào file BAI1.inp!',
              console: `[Cửa sổ đen cmd.exe trống trơn - không có bất kỳ dòng chữ nào hiện ra!]`,
              files: {
                inp: `5\n2 -1 4 -3 5\nTest 2: CORRECT!\n`,
                out: `7\n`,
                ans: `7\n`
              },
              explain: 'Hãy bấm sang tab "BAI1.inp" ở khung bên phải! Bạn sẽ thấy dòng chữ "Test 2: CORRECT!" đáng lẽ phải in ra màn hình thì lại bị tống thẳng vào cuối file đề bài BAI1.inp!'
            };
          }

          if (noClose) {
            return {
              code,
              changedLines: changed,
              statusOk: false,
              statusText: 'LỖI KẸT BUFFER: Thời điểm BAI1.exe chạy, file BAI1.inp trên ổ cứng vẫn đang rỗng (0 byte)!',
              console: `Test 1: WRONG! (BAI1.exe đọc phải file rỗng vì Buffer chưa xả xuống ổ cứng!)\nTest 2: WRONG!`,
              files: {
                inp: `[Trống rỗng 0 byte tại thời điểm BAI1.exe mở file ra đọc! Dữ liệu vẫn nằm lơ lửng trên RAM của MAYCHAM.exe]`,
                out: `0 (Kết quả rác do không đọc được N)\n`,
                ans: `7\n`
              },
              explain: 'Vì biến inp mở ở toàn cục và không gọi inp.close(), chiếc xe tải Buffer thấy mới có hơn chục ký tự nên chưa chịu chạy xuống ổ cứng. Khi BAI1.exe mở BAI1.inp ra đọc thì tờ giấy vẫn trắng tinh!'
            };
          }

          return {
            code,
            changedLines: [6, 9],
            statusOk: true,
            statusText: 'CHUẨN XÁC: inp.close() đẩy trọn vẹn đề bài xuống ổ cứng, còn cout vẫn in kết quả ra màn hình Console!',
            console: `Comparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 1: CORRECT!\nComparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 2: CORRECT!`,
            files: {
              inp: `5\n2 -1 4 -3 5\n`,
              out: `7\n`,
              ans: `7\n`
            },
            explain: 'ofstream inp tạo đường ống riêng để ghi file BAI1.inp và đóng lại sạch sẽ bằng inp.close(), trong khi cout của máy chấm vẫn nối với màn hình đen bình thường.'
          };
        }
      }
    ],
    quiz: [
      {
        q: 'Câu 1: Tại sao chương trình MAYCHAM.exe không thể truyền trực tiếp mảng a[] trong bộ nhớ của nó sang cho chương trình BAI1.exe?',
        options: [
          'Vì mảng a[] nằm trên RAM riêng của MAYCHAM.exe; hai chương trình .exe độc lập không thể đọc vùng RAM của nhau mà phải giao tiếp qua File trên ổ cứng.',
          'Vì ngôn ngữ C++ không cho phép khai báo mảng trong file MAYCHAM.cpp.',
          'Vì biến trên RAM chạy chậm hơn rất nhiều so với file trên ổ cứng.',
          'Vì Code::Blocks chỉ cho phép mở 1 file .cpp tại một thời điểm.'
        ],
        correct: 0,
        explain: 'Chính xác! Mỗi tiến trình (.exe) có không gian bộ nhớ RAM cách ly hoàn toàn. Muốn gửi dữ liệu từ Máy Chấm sang Bài Làm, bắt buộc phải ghi xuống ổ cứng (.inp).'
      },
      {
        q: 'Câu 2: Vai trò thực sự của câu lệnh inp.close() ở cuối hàm generate() là gì?',
        options: [
          'Để xóa file .inp khỏi ổ cứng sau khi sinh test xong.',
          'Để ép bộ đệm (Buffer) trên RAM đổ toàn bộ dữ liệu vừa sinh xuống file .inp trên ổ cứng ngay lập tức trước khi gọi BAI1.exe vào đọc.',
          'Để biên dịch lại file BAI1.cpp thành BAI1.exe.',
          'Để đổi tên file .inp thành file .out.'
        ],
        correct: 1,
        explain: 'Chuẩn xác! Nếu không đóng luồng bằng inp.close() (hoặc kết thúc phạm vi biến ofstream), dữ liệu có thể còn nằm trong Buffer RAM khiến BAI1.exe đọc phải file rỗng.'
      },
      {
        q: 'Câu 3: Trong bộ 3 file của một bài toán (MAYCHAM.cpp, BAI1.cpp, BAI1_TRAU.cpp), ta phân chia cách dùng freopen và ofstream như thế nào là chuẩn nhất?',
        options: [
          'Dùng freopen cho cả 3 file.',
          'Dùng ofstream trong hàm generate() của MAYCHAM.cpp; còn dùng freopen ở đầu hàm main() của BAI1.cpp và BAI1_TRAU.cpp.',
          'Dùng freopen trong MAYCHAM.cpp; còn dùng ofstream trong BAI1.cpp.',
          'Không cần dùng file nào cả, chỉ cần dùng cin và cout.'
        ],
        correct: 1,
        explain: 'Rất chuẩn! BAI1.cpp và BAI1_TRAU.cpp chỉ chạy 1 lần mỗi test nên dùng freopen ở đầu main() là gọn nhất; còn MAYCHAM.cpp phải vừa ghi file .inp nhiều lần vừa in thông báo ra màn hình nên phải dùng ofstream.'
      },
      {
        q: 'Câu 4: Dòng lệnh ios_base::sync_with_stdio(false); cin.tie(NULL); đặt ở đầu hàm main() có tác dụng gì?',
        options: [
          'Tự động sinh số ngẫu nhiên cho chương trình.',
          'Ngắt đồng bộ giữa luồng C++ (cin/cout) và luồng C (scanf/printf), giúp tốc độ đọc ghi của cin/cout nhanh ngang ngửa scanf/printf.',
          'Tự động đóng mọi file trên ổ cứng.',
          'So sánh hai file .out và .ans.'
        ],
        correct: 1,
        explain: 'Đúng vậy! Nhờ 2 dòng này, bạn hoàn toàn yên tâm chỉ dùng cin/cout và freopen mà không bao giờ phải bận tâm đến scanf/printf nữa.'
      }
    ]
  },

  // ============================================================================
  // MODULE 2: LỆNH HỆ THỐNG, SHELL (cmd vs sh), PATH & fc /w + exit(0)
  // ============================================================================
  {
    id: 'm2',
    number: 'Module 02',
    shortTitle: 'Hệ Điều Hành, PATH & fc /w',
    title: 'Lệnh Hệ Thống system(), Shell (cmd vs sh), Đường Dẫn PATH & So File Kết Quả',
    lead: 'Giải thích từ gốc: cmd.exe và sh là ai, tại sao Windows và Linux lại nói hai "ngôn ngữ lệnh" khác nhau, bí mật của biến môi trường PATH khi cài Code::Blocks, và cách dùng fc /w kết hợp exit(0) để bắt tận tay dòng kết quả sai.',
    sections: [
      {
        num: '2.1',
        heading: 'Shell (cmd.exe vs sh) là gì? Tại sao Windows và Linux lại khác nhau?',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Tại sao cần tới <code>cmd</code> và <code>sh</code>? <span class="concept-tag">Người trợ lý chữ</span></h4>
              <p>Bình thường, bạn dùng chuột bấm đúp vào biểu tượng trên màn hình (Giao diện đồ họa - GUI) để mở phần mềm. Nhưng chương trình C++ <code>MAYCHAM.exe</code> <strong>không có bàn tay để cầm chuột click đúp</strong>!</p>
              <p>Khi bạn gọi hàm <code>system("lệnh")</code>, chương trình C++ sẽ nhờ <strong>"Người trợ lý nhận lệnh bằng chữ" (gọi là Shell)</strong> của Hệ điều hành chạy hộ câu lệnh đó, chờ chạy xong rồi mới làm việc tiếp.</p>
            </div>
            <div class="concept-card">
              <h4>2. Nhánh Windows (Học sinh dùng Code::Blocks) <span class="concept-tag">Gốc MS-DOS</span></h4>
              <ul>
                <li><strong>Người trợ lý:</strong> <code>cmd.exe</code> (Command Prompt).</li>
                <li><strong>Đuôi file chạy:</strong> Bắt buộc là <code>.exe</code> (ví dụ: <code>BAI1.exe</code>).</li>
                <li><strong>Dấu ngăn cách thư mục:</strong> Dấu gạch chéo ngược <code>\\</code> (ví dụ: <code>D:\\Code\\BAI1.exe</code>).</li>
                <li><strong>Lệnh so sánh 2 file:</strong> <code>fc /w BAI1.out BAI1.ans</code> (<em>File Compare</em>).</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>3. Nhánh Linux (Arch Linux & Máy chấm thi Online) <span class="concept-tag">Gốc UNIX</span></h4>
              <ul>
                <li><strong>Người trợ lý:</strong> <code>sh</code> hoặc <code>bash</code>.</li>
                <li><strong>Gọi file chạy:</strong> Phải có <code>./</code> ở đầu để chỉ "ngay thư mục này" và không có đuôi <code>.exe</code>: <code>./BAI1</code>.</li>
                <li><strong>Dấu ngăn cách thư mục:</strong> Dấu gạch chéo xuôi <code>/</code>.</li>
                <li><strong>Lệnh so sánh 2 file:</strong> <code>diff -w BAI1.out BAI1.ans</code> (<em>Difference</em>).</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '2.2',
        heading: 'Đường dẫn (Path) và Biến môi trường PATH trên Windows + Code::Blocks',
        html: `
          <div class="analogy-box">
            <strong>Câu hỏi thực tế:</strong> Tại sao trong <code>MAYCHAM.cpp</code> trên Windows, ta gõ <code>system("fc /w ...")</code> thì máy hiểu ngay, nhưng nếu gõ <code>system("g++ BAI1.cpp -o BAI1.exe")</code> thì máy của học sinh cài Code::Blocks lại báo lỗi đỏ lòm: <code>'g++' is not recognized as an internal or external command</code>?
          </div>
          <div class="concept-grid">
            <div class="concept-card">
              <h4>Bước tìm 1: Tìm ngay tại "Phòng đang đứng" <span class="concept-tag">Working Directory</span></h4>
              <p>Khi nhận lệnh tên một chương trình (ví dụ <code>system("BAI1.exe")</code>), <code>cmd.exe</code> sẽ nhìn ngay vào <strong>thư mục hiện tại nơi <code>MAYCHAM.exe</code> đang đứng</strong>.</p>
              <p>$\rightarrow$ Vì vậy, nếu bạn đặt <code>MAYCHAM.cpp</code>, <code>BAI1.cpp</code>, <code>BAI1_TRAU.cpp</code> trong <strong>cùng 1 thư mục</strong> và bấm Build (F9), cả 3 file <code>.exe</code> sẽ nằm cạnh nhau và gọi thấy nhau ngay lập tức!</p>
            </div>
            <div class="concept-card">
              <h4>Bước tìm 2: Tra "Sổ tay danh bạ hệ thống" (<code>PATH</code>) <span class="concept-tag">System PATH</span></h4>
              <p>Nếu tìm ở thư mục hiện tại không thấy, Windows mới lật một cuốn sổ tay tên là <strong><code>PATH</code></strong> (chứa danh sách các thư mục vip của hệ thống như <code>C:\\Windows\\System32</code>).</p>
              <ul>
                <li>Chương trình <code>fc.exe</code> có sẵn trong <code>C:\\Windows\\System32</code> $\rightarrow$ gọi ở đâu cũng chạy được!</li>
                <li>Ngược lại, khi cài <strong>Code::Blocks</strong>, bộ dịch <code>g++.exe</code> nằm sâu trong <code>C:\\Program Files\\CodeBlocks\\MinGW\\bin</code> nhưng bộ cài Code::Blocks <strong>không tự ghi địa chỉ này vào sổ tay <code>PATH</code></strong>! Vì thế ta không gọi <code>system("g++ ...")</code> trong code mà bấm <strong>Build (F9)</strong> trực tiếp trên Code::Blocks.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '2.3',
        heading: 'Giải phẫu lệnh fc /w, Giá trị trả về ngược đời và Tuyệt chiêu exit(0)',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Tại sao phải có cờ <code>/w</code> trong <code>fc /w</code>? <span class="concept-tag">White space</span></h4>
              <p>Trong thi đấu C++, in ra <code>"15 "</code> (dư 1 dấu cách cuối dòng) và <code>"15"</code> đều được tính là <strong>ĐÚNG (Accepted)</strong>.</p>
              <ul>
                <li>Nếu chỉ viết <code>fc BAI1.out BAI1.ans</code>: nó soi từng byte một, thấy dư 1 dấu cách cũng báo <strong>SAI OAN</strong>!</li>
                <li>Khi thêm <code>/w</code> (<em>compress white space</em>): nó tự động bỏ qua khoảng trắng thừa ở đầu/cuối dòng và gộp nhiều khoảng trắng liên tiếp thành 1.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. Giá trị trả về của <code>system("fc /w ...")</code> <span class="concept-tag">0 = Giống nhau!</span></h4>
              <p>Trong hệ điều hành, con số trả về của một lệnh mang ý nghĩa <strong>"Số lỗi phát hiện được" (Exit Code)</strong>:</p>
              <ul>
                <li>Trả về <strong><code>0</code></strong>: Không có lỗi / Không có khác biệt nào $\rightarrow$ <strong>2 file GIỐNG HỆT NHAU (CORRECT)!</strong></li>
                <li>Trả về <strong><code>!= 0</code></strong> (khác 0): Phát hiện sự khác biệt $\rightarrow$ <strong>2 file KHÁC NHAU (WRONG)!</strong></li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>3. Tại sao dùng <code>exit(0)</code> trong hàm <code>void compare()</code>? <span class="concept-tag">Giữ hiện trường</span></h4>
              <p>Khi ta tách riêng hàm <code>void compare()</code>:</p>
              <ul>
                <li>Nếu gặp test sai, chính lệnh <code>fc /w</code> sẽ tự động in đoạn khác nhau (<code>***** BAI1.out ... ***** BAI1.ANS ...</code>) thẳng lên cửa sổ Console.</li>
                <li>Ngay lúc đó, ta gọi <strong><code>exit(0);</code></strong> để <strong>dừng toàn bộ chương trình lập tức từ trong hàm con</strong>! Cửa sổ Console của Code::Blocks sẽ dừng lại ngay dưới cụm <code>*****</code> để bạn nhìn thấy ngay đáp án lệch nhau thế nào, đồng thời giữ nguyên file <code>BAI1.inp</code> gây lỗi không bị vòng lặp sau ghi đè!</li>
              </ul>
            </div>
          </div>
        `
      }
    ],
    discussions: [
      {
        id: 'd2_1',
        question: 'Câu hỏi thảo luận 1: Một bạn học sinh viết trong hàm void compare() như sau: if (system("fc /w BAI1.out BAI1.ans") != 0) { cout << "WRONG!"; return; }. Hỏi điều gì sẽ xảy ra khi máy chấm bắt được test sai ở Test thứ 3?',
        answer: 'Vì <code>compare()</code> có kiểu trả về là <code>void</code>, lệnh <code>return;</code> chỉ thoát khỏi hàm <code>compare()</code> rồi quay lại vòng lặp <code>for</code> trong <code>main()</code> để <strong>chạy tiếp Test 4, Test 5... đến hết Test 100</strong>! Hậu quả là file <code>BAI1.inp</code> làm sai ở Test 3 bị Test 4 ghi đè mất tích luôn! Phải dùng <strong><code>exit(0);</code></strong> mới dừng hẳn toàn bộ chương trình ngay tại Test 3.'
      },
      {
        id: 'd2_2',
        question: 'Câu hỏi thảo luận 2: Tại sao trên máy Windows của học sinh, gọi system("BAI1.exe") thì chạy được, còn trên máy Arch Linux của thầy giáo phải gọi system("./BAI1")?',
        answer: 'Vì trên Windows, <code>cmd.exe</code> tự động tìm file <code>.exe</code> ngay tại thư mục hiện tại. Còn trên Linux (<code>sh</code>/<code>bash</code>), vì lý do bảo mật, nó <strong>không tự tìm trong thư mục hiện tại</strong> trừ khi ta viết rõ <code>./</code> (nghĩa là "ngay tại thư mục này") ở đằng trước tên file!'
      }
    ],
    sandboxes: [
      {
        id: 'sb2_1',
        title: 'Phòng thí nghiệm 2: Lệnh so sánh file (fc /w vs diff -w), Exit Code và Lệnh dừng exit(0)',
        desc: 'Giả sử ở Test 2, thuật Full in ra "15" còn thuật Trâu in ra "12 " (hoặc ở Test 1 cả hai cùng in ra "10" nhưng thuật Trâu dư 1 dấu cách cuối dòng). Hãy bật/tắt các công tắc để xem kết quả trên màn hình Console!',
        toggles: [
          {
            key: 'osMode',
            label: '1. Hệ điều hành',
            options: [
              { value: 'win', text: 'Windows (Code::Blocks - fc)', kind: 'ok' },
              { value: 'linux', text: 'Arch Linux (diff)', kind: 'ok' }
            ]
          },
          {
            key: 'flagW',
            label: '2. Cờ bỏ qua khoảng trắng thừa',
            options: [
              { value: 'with_w', text: 'Có /w (hoặc -w) (Chuẩn)', kind: 'ok' },
              { value: 'no_w', text: 'Quên /w (Báo sai oan vì dấu cách)', kind: 'bug' }
            ]
          },
          {
            key: 'stopMode',
            label: '3. Kiểm tra & Dừng trong compare()',
            options: [
              { value: 'exit0', text: '!= 0 và gọi exit(0) (Chuẩn)', kind: 'ok' },
              { value: 'invert', text: 'Viết nhầm == 0 (Ngược logic)', kind: 'bug' },
              { value: 'return_only', text: 'Dùng return; thay vì exit(0) (Mất test sai)', kind: 'bug' }
            ]
          }
        ],
        build(state) {
          const isWin = state.osMode === 'win';
          const hasW = state.flagW === 'with_w';
          const stop = state.stopMode;

          const runFullCmd = isWin ? 'system(NAME ".exe");' : 'system("./" NAME);';
          const runTrauCmd = isWin ? 'system(NAME "_TRAU.exe");' : 'system("./" NAME "_TRAU");';
          const cmpCmd = isWin
            ? `system("fc ${hasW ? '/w ' : ''}" NAME ".out " NAME ".ans")`
            : `system("diff ${hasW ? '-w ' : ''}" NAME ".out " NAME ".ans")`;

          const op = stop === 'invert' ? '== 0' : '!= 0';
          const stopLine =
            stop === 'exit0'
              ? '        exit(0); // Dừng toàn bộ chương trình, giữ lại phần ***** trên Console!'
              : stop === 'return_only'
              ? '        return;  // LỖI: Chỉ thoát hàm compare(), vòng lặp main vẫn chạy tiếp đè mất .inp!'
              : '        exit(0);';

          const code = `#include <bits/stdc++.h>
using namespace std;
#define NAME "BAI1"

void generate() {
    ofstream inp(NAME ".inp");
    inp << 4 << "\\n1 2 3 4\\n";
    inp.close();
}

void compare(int iTest) {
    if (${cmpCmd} ${op}) {
        cout << "Test " << iTest << ": WRONG!\\n";
${stopLine}
    }
    cout << "Test " << iTest << ": CORRECT!\\n";
}

int main() {
    for (int iTest = 1; iTest <= 3; iTest++) {
        generate();
        ${runFullCmd}
        ${runTrauCmd}
        compare(iTest);
    }
    return 0;
}`;

          if (!hasW) {
            return {
              code,
              changedLines: [6],
              statusOk: false,
              statusText: 'BÁO SAI OAN Ở TEST 1: Cả 2 file đều ra đáp án 10, nhưng thiếu cờ /w nên bị bắt lỗi dư 1 dấu cách cuối dòng!',
              console: isWin
                ? `Comparing files BAI1.out and BAI1.ANS\n***** BAI1.out\n10\n***** BAI1.ANS\n10 \n*****\nTest 1: WRONG!\n\nProcess returned 0 (0x0)   execution time : 0.042 s\nPress any key to continue.`
                : `1c1\n< 10\n---\n> 10 \nTest 1: WRONG!`,
              files: {
                inp: `4\n1 2 3 4\n`,
                out: `10\n`,
                ans: `10 \n`
              },
              explain: 'Ở Test 1, BAI1.out in "10" còn BAI1.ans in "10 " (dư 1 dấu cách). Nếu quên cờ /w (Windows) hoặc -w (Linux), lệnh so sánh sẽ báo khác biệt ngay dù kết quả toán học hoàn toàn đúng!'
            };
          }

          if (stop === 'invert') {
            return {
              code,
              changedLines: [6],
              statusOk: false,
              statusText: 'LỖI NGƯỢC LOGIC (== 0): Ngay ở Test 1 hai file GIỐNG HỆT NHAU (trả về 0) thì máy chấm lại hô WRONG!',
              console: isWin
                ? `Comparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 1: WRONG!\n\nProcess returned 0 (0x0)`
                : `Test 1: WRONG!`,
              files: {
                inp: `4\n1 2 3 4\n`,
                out: `10\n`,
                ans: `10 \n`
              },
              explain: 'Hãy nhìn dòng "FC: no differences encountered" (Không có sự khác biệt nào -> trả về 0). Vì bạn viết if (system(...) == 0), máy chấm thấy trả về 0 lại tưởng là sai và báo WRONG ngay ở test đúng!'
            };
          }

          if (stop === 'return_only') {
            return {
              code,
              changedLines: [8],
              statusOk: false,
              statusText: 'LỖI MẤT HIỆN TRƯỜNG: Phát hiện WRONG ở Test 2 nhưng dùng return; nên máy chạy tiếp Test 3 và ghi đè mất file BAI1.inp của Test 2!',
              console: isWin
                ? `Comparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 1: CORRECT!\nComparing files BAI1.out and BAI1.ANS\n***** BAI1.out\n15\n***** BAI1.ANS\n12\n*****\nTest 2: WRONG!\nComparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 3: CORRECT!`
                : `Test 1: CORRECT!\n1c1\n< 15\n---\n> 12\nTest 2: WRONG!\nTest 3: CORRECT!`,
              files: {
                inp: `3\n5 5 5\n(Đây là dữ liệu của Test 3! Dữ liệu gây lỗi ở Test 2 đã bị ghi đè mất sạch!)`,
                out: `15\n`,
                ans: `15\n`
              },
              explain: 'Vì dùng return; trong hàm void compare(), chương trình không dừng lại ở Test 2 mà chạy tiếp sang Test 3. Khi bạn mở file BAI1.inp ra xem thì nó đã bị thay bằng dữ liệu của Test 3 mất rồi!'
            };
          }

          return {
            code,
            changedLines: [6, 8, 16, 17],
            statusOk: true,
            statusText: 'HOẠT ĐỘNG CHUẨN XÁC: Bắt đúng lỗi ở Test 2, hiển thị rõ dòng khác nhau ***** trên Console và dừng ngay bằng exit(0)!',
            console: isWin
              ? `Comparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 1: CORRECT!\nComparing files BAI1.out and BAI1.ANS\n***** BAI1.out\n15\n***** BAI1.ANS\n12\n*****\nTest 2: WRONG!\n\nProcess returned 0 (0x0)   execution time : 0.085 s\nPress any key to continue.`
              : `Test 1: CORRECT!\n1c1\n< 15\n---\n> 12\nTest 2: WRONG!`,
            files: {
              inp: `5\n-2 7 -1 8 -5\n(Giữ nguyên vẹn hiện trường đề bài của Test 2 để bạn mở ra debug!)`,
              out: `15\n`,
              ans: `12\n`
            },
            explain: 'Nhờ lệnh exit(0) đặt ngay sau khi fc /w trả về != 0, bạn vừa nhìn thấy ngay trên cửa sổ đen: BAI1.out ra 15 trong khi BAI1.ANS ra 12, vừa giữ nguyên được file BAI1.inp của Test 2!'
          };
        }
      }
    ],
    quiz: [
      {
        q: 'Câu 1: Khi hai file BAI1.out và BAI1.ans có nội dung GIỐNG HỆT NHAU (không tính khoảng trắng thừa), lệnh system("fc /w BAI1.out BAI1.ans") sẽ trả về giá trị nào?',
        options: [
          'Trả về 1 (True)',
          'Trả về 0 (Không có sự khác biệt nào)',
          'Trả về -1',
          'Trả về số dòng của file'
        ],
        correct: 1,
        explain: 'Chuẩn xác! Quy ước Exit Code của hệ điều hành: 0 nghĩa là thành công / không có khác biệt; khác 0 (!= 0) mới là có sự khác biệt.'
      },
      {
        q: 'Câu 2: Tại sao khi cài Code::Blocks trên Windows, ta không nên dùng lệnh system("g++ BAI1.cpp -o BAI1.exe") bên trong máy chấm của học sinh?',
        options: [
          'Vì Windows cấm chạy trình biên dịch C++.',
          'Vì bộ cài Code::Blocks thường không tự thêm thư mục chứa g++.exe vào biến môi trường PATH của Windows, nên cmd.exe sẽ báo không tìm thấy lệnh g++.',
          'Vì lệnh system() chỉ gọi được lệnh fc chứ không gọi được file .exe.',
          'Vì g++ chỉ có trên Linux.'
        ],
        correct: 1,
        explain: 'Đúng vậy! Thay vì phải chỉnh biến môi trường PATH phức tạp trong phòng thi, học sinh chỉ cần mở tab BAI1.cpp và BAI1_TRAU.cpp bấm Build (F9) để tạo sẵn file .exe trong cùng thư mục.'
      },
      {
        q: 'Câu 3: Trong hàm void compare(), tại sao khi phát hiện test sai ta dùng lệnh exit(0); thay vì lệnh return;?',
        options: [
          'Vì hàm void không cho phép viết chữ return;.',
          'Vì return; chỉ thoát khỏi hàm compare() rồi lại chạy tiếp vòng lặp test kế tiếp trong main() làm ghi đè mất file .inp gây lỗi; còn exit(0); dừng toàn bộ chương trình ngay lập tức.',
          'Vì exit(0); giúp tự động sửa lỗi trong code Full.',
          'Vì exit(0); xóa hết các file .out và .ans.'
        ],
        correct: 1,
        explain: 'Hoàn toàn chính xác! exit(0) kết thúc toàn bộ tiến trình ngay lập tức, giữ nguyên cả thông báo ***** của fc /w trên màn hình đen lẫn file .inp gây lỗi trên ổ cứng.'
      },
      {
        q: 'Câu 4: Tương ứng với cặp lệnh system("BAI1.exe") và system("fc /w BAI1.out BAI1.ans") trên Windows, khi chuyển sang Arch Linux ta viết như thế nào?',
        options: [
          'system("BAI1") và system("fc -w BAI1.out BAI1.ans")',
          'system("./BAI1") và system("diff -w BAI1.out BAI1.ans")',
          'system("/BAI1.exe") và system("cmp BAI1.out BAI1.ans")',
          'system("run BAI1") và system("diff /w BAI1.out BAI1.ans")'
        ],
        correct: 1,
        explain: 'Chính xác! Trên Linux ta gọi thực thi tại thư mục hiện tại bằng "./BAI1" và so sánh bỏ qua khoảng trắng bằng "diff -w".'
      }
    ]
  },

  // ============================================================================
  // MODULE 3: SINH SỐ NGẪU NHIÊN (mt19937, mt19937_64 vs rand())
  // ============================================================================
  {
    id: 'm3',
    number: 'Module 03',
    shortTitle: 'Random & mt19937',
    title: 'Sinh Số Ngẫu Nhiên Hiện Đại: mt19937, mt19937_64 & Những Cái Bẫy Chết Người Của Seed',
    lead: 'Tại sao máy tính không biết "tung xúc xắc" thật, tại sao rand() trên Windows chỉ sinh được số tới 32767, lỗi đặt hạt giống time(0) trong hàm làm 50 test sinh ra giống hệt nhau, và cách viết hàm Rand(l, r) chuẩn cho kiểu long long.',
    sections: [
      {
        num: '3.1',
        heading: 'Bản chất số ngẫu nhiên trong máy tính (PRNG) và Hạt giống (Seed)',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Máy tính có biết "ngẫu nhiên" thật không? <span class="concept-tag">Giả ngẫu nhiên</span></h4>
              <p>Câu trả lời là <strong>KHÔNG</strong>! Máy tính là cỗ máy toán học chính xác tuyệt đối. Để tạo ra dãy số trông có vẻ ngẫu nhiên, nó dùng một dây chuyền công thức toán học bắt đầu từ một con số đầu vào gọi là <strong>Hạt giống (Seed)</strong>.</p>
              <p><strong>Quy luật sắt đá:</strong> Nếu bạn đưa vào <strong>cùng 1 Hạt giống (Seed)</strong> $\rightarrow$ dây chuyền sẽ nhả ra <strong>dãy số giống hệt nhau 100%</strong>!</p>
            </div>
            <div class="concept-card">
              <h4>2. Cái bẫy của <code>time(0)</code> (Tính theo GIÂY) <span class="concept-tag">Lỗi trùng 50 test</span></h4>
              <p>Hàm <code>time(0)</code> trả về số giây tính từ năm 1970 — tức là <strong>phải hết 1 giây đồng hồ nó mới nhảy thêm 1 đơn vị</strong>.</p>
              <ul>
                <li>Trong khi đó, vòng lặp máy chấm chạy 50 test chỉ mất khoảng <code>0.1 giây</code>!</li>
                <li>Nếu bạn khởi tạo bộ sinh số bên trong hàm <code>generate()</code> với <code>time(0)</code>, cả 50 lần gọi hàm đều diễn ra trong cùng 1 giây $\rightarrow$ nhận cùng 1 Seed $\rightarrow$ <strong>sinh ra 50 file <code>.inp</code> giống hệt nhau từng con số!</strong></li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>3. Giải pháp chuẩn: Global + <code>steady_clock</code> <span class="concept-tag">Chuẩn C++14+</span></h4>
              <p>Ta khắc phục triệt để bằng 2 nguyên tắc:</p>
              <ul>
                <li><strong>Nguyên tắc 1:</strong> Khai báo bộ sinh <code>mt19937_64 rd(...)</code> ở <strong>Toàn cục (Global - ngoài mọi hàm)</strong> để gieo hạt giống đúng 1 lần khi bật chương trình.</li>
                <li><strong>Nguyên tắc 2:</strong> Dùng <code>chrono::steady_clock::now().time_since_epoch().count()</code> (đồng hồ đếm theo phần tỷ giây - nanosecond) thay cho <code>time(0)</code>.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '3.2',
        heading: 'So sánh rand() cổ điển vs mt19937 (32-bit) vs mt19937_64 (64-bit)',
        html: `
          <table class="comp-table">
            <thead>
              <tr>
                <th>Công cụ</th>
                <th>Giới hạn số lớn nhất sinh ra</th>
                <th>Chuyện gì xảy ra khi cần sinh số <code>long long</code> (tới $10^{18}$)?</th>
                <th>Khuyên dùng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong><code>rand()</code></strong> (C cổ điển)</td>
                <td>Trên Windows (Code::Blocks): <strong><code>RAND_MAX = 32767</code></strong> ($2^{15}-1$).</td>
                <td>Không bao giờ sinh trực tiếp được số $> 32767$! Kể cả mảng $N = 10^5$ cũng không sinh nổi!</td>
                <td><strong>Tuyệt đối bỏ!</strong></td>
              </tr>
              <tr>
                <td><strong><code>mt19937</code></strong> (32-bit)</td>
                <td>$2^{32} - 1 \approx$ <strong>$4.29 \times 10^9$</strong> (kiểu <code>unsigned int</code>).</td>
                <td>Nếu dùng công thức chia dư <code>l + rd() % (r - l + 1)</code>, số sinh ra <strong>không bao giờ vượt quá 4.29 tỷ</strong>! (Trừ khi bọc qua <code>uniform_int_distribution&lt;long long&gt;</code>).</td>
                <td>Đủ cho kiểu <code>int</code> ($\le 2 \times 10^9$).</td>
              </tr>
              <tr>
                <td><strong><code>mt19937_64</code></strong> (64-bit)</td>
                <td>$2^{64} - 1 \approx$ <strong>$1.84 \times 10^{19}$</strong> (kiểu <code>unsigned long long</code>).</td>
                <td>Phủ kín toàn bộ miền <code>long long</code> từ $-9 \times 10^{18}$ đến $9 \times 10^{18}$ cả khi dùng chia dư lẫn dùng <code>uniform_int_distribution</code>!</td>
                <td><strong>Chuẩn mực tốt nhất!</strong></td>
              </tr>
            </tbody>
          </table>
          <div class="analogy-box">
            <strong>Hai cách viết hàm <code>Rand(long long l, long long r)</code> với <code>mt19937_64</code>:</strong><br/>
            - <strong>Cách 1 (Chuẩn & an toàn tuyệt đối, không bao giờ lo tràn số khi $r - l + 1$ lớn):</strong><br/>
              <code>long long Rand(long long l, long long r) { return uniform_int_distribution&lt;long long&gt;(l, r)(rd); }</code><br/>
            - <strong>Cách 2 (Ngắn gọn, dễ nhớ trong phòng thi khi $r - l + 1 \le 10^{18}$):</strong><br/>
              <code>long long Rand(long long l, long long r) { return l + rd() % (r - l + 1); }</code> <em>(Lưu ý: bắt buộc <code>rd</code> phải là <code>mt19937_64</code> thì <code>rd()</code> mới trả về số 64-bit!).</em>
          </div>
        `
      }
    ],
    discussions: [
      {
        id: 'd3_1',
        question: 'Câu hỏi thảo luận 1: Đề bài cho N <= 100,000. Một bạn học sinh trên Windows dùng hàm int n = rand() % 100000 + 1; để sinh kích thước mảng. Hỏi giá trị N lớn nhất mà máy chấm của bạn đó thực sự sinh ra được là bao nhiêu?',
        answer: 'Chỉ là <strong>32,768</strong>! Vì trên Windows (MinGW / Code::Blocks), hàm <code>rand()</code> chỉ trả về số nguyên từ <code>0</code> đến <code>RAND_MAX = 32767</code>. Khi lấy một số $\le 32767$ đem chia lấy dư cho <code>100000</code> rồi cộng 1, kết quả không bao giờ vượt quá <code>32768</code>! Bạn đó tưởng đã test được với $N = 10^5$ nhưng thực chất chưa bao giờ chạm tới!'
      },
      {
        id: 'd3_2',
        question: 'Câu hỏi thảo luận 2: Tại sao nếu khai báo mt19937 rd(chrono::steady_clock::now().time_since_epoch().count()); ở BÊN NGOÀI hàm generate() (toàn cục) thì mỗi lần gọi generate() nó lại sinh ra số mới, còn nếu đặt dòng đó ở BÊN TRONG hàm generate() thì lại rất nguy hiểm?',
        answer: 'Khi đặt ở <strong>toàn cục (bên ngoài)</strong>, máy tính chỉ gieo hạt giống (Seed) đúng 1 lần lúc bắt đầu chạy <code>MAYCHAM.exe</code>; mỗi lần gọi <code>rd()</code> tiếp theo sẽ lấy con số kế tiếp trong dây chuyền toán học nên luôn khác nhau. Ngược lại, nếu đặt ở <strong>bên trong hàm <code>generate()</code></strong>, mỗi vòng lặp nó lại đập đi xây lại bộ sinh mới (và nếu dùng <code>time(0)</code> thì gieo lại đúng hạt giống cũ), vừa chậm vừa làm trùng test!'
      }
    ],
    sandboxes: [
      {
        id: 'sb3_1',
        title: 'Phòng thí nghiệm 3A (Code độc lập): Demo lỗi đặt Seed trong hàm generate() vs Toàn cục',
        desc: 'Đoạn code dưới đây hoàn chỉnh 100% — bạn có thể bấm "Chạy thử" ngay trên web hoặc bấm "Copy Code hiện tại" dán thẳng vào USACO IDE / Code::Blocks để cho học sinh xem 5 test sinh ra giống hệt nhau!',
        toggles: [
          {
            key: 'seedPos',
            label: '1. Vị trí khai báo mt19937 & Seed',
            options: [
              { value: 'global_steady', text: 'Toàn cục (Global) + steady_clock (Chuẩn)', kind: 'ok' },
              { value: 'local_time0', text: 'Đặt trong generate() + time(0) (Lỗi trùng 100% test)', kind: 'bug' }
            ]
          },
          {
            key: 'engineType',
            label: '2. Bộ sinh số & Miền giá trị',
            options: [
              { value: 'mt64_large', text: 'mt19937_64 sinh số [-10^15, 10^15] (Chuẩn)', kind: 'ok' },
              { value: 'mt32_mod', text: 'mt19937 (32-bit) dùng % 10^15 (Bị cắt ngọn 4.29 tỷ)', kind: 'bug' },
              { value: 'c_rand', text: 'rand() cổ điển trên Windows (Kẹt ở 32767)', kind: 'bug' }
            ]
          }
        ],
        build(state) {
          const isBadSeed = state.seedPos === 'local_time0';
          const eng = state.engineType;
          const changed = [];

          let code = `#include <bits/stdc++.h>
using namespace std;
`;
          if (!isBadSeed) {
            if (eng === 'mt64_large') {
              code += `// CHUẨN: Khai báo toàn cục (Global) 1 lần duy nhất với steady_clock
mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());

long long Rand(long long l, long long r) {
    return uniform_int_distribution<long long>(l, r)(rd);
}
`;
              changed.push(4, 6, 7);
            } else if (eng === 'mt32_mod') {
              code += `// CẢNH BÁO: Dùng mt19937 (32-bit) kết hợp phép chia dư % cho số lớn
mt19937 rd(chrono::steady_clock::now().time_since_epoch().count());

long long Rand(long long l, long long r) {
    return l + rd() % (r - l + 1); // rd() tối đa chỉ ~ 4.29 * 10^9!
}
`;
              changed.push(4, 7);
            } else {
              code += `// LỖI CỔ ĐIỂN: Dùng rand() của C (Trên Windows RAND_MAX = 32767)
long long Rand(long long l, long long r) {
    return l + rand() % (r - l + 1); // rand() tối đa chỉ 32767!
}
`;
              changed.push(4, 5);
            }
          }

          code += `
void generate(int iTest) {`;
          if (isBadSeed) {
            code += `
    // LỖI CHÍ MẠNG: Khởi tạo lại mt19937 với time(0) ở mỗi lần gọi hàm!
    mt19937_64 rd(time(0));
    cout << "Test " << iTest << ": ";
    for (int i = 1; i <= 4; i++) {
        cout << (1 + rd() % 100) << " ";
    }
    cout << "\\n";`;
            changed.push(5, 6);
          } else {
            code += `
    cout << "Test " << iTest << ": ";
    for (int i = 1; i <= 3; i++) {
        cout << Rand(1, 1000000000000000LL) << " ";
    }
    cout << "\\n";`;
          }
          code += `
}

int main() {
    for (int iTest = 1; iTest <= 5; iTest++) {
        generate(iTest);
    }
    return 0;
}`;

          if (isBadSeed) {
            return {
              code,
              changedLines: changed,
              statusOk: false,
              statusText: 'LỖI TRÙNG LẶP TEST: Cả 5 test chạy trong cùng 1 giây nên nhận cùng Seed time(0) -> Sinh ra 5 dãy số giống hệt nhau!',
              console: `Test 1: 42 87 15 93 \nTest 2: 42 87 15 93 \nTest 3: 42 87 15 93 \nTest 4: 42 87 15 93 \nTest 5: 42 87 15 93 `,
              files: {
                inp: `4\n42 87 15 93\n(Mọi vòng lặp từ Test 1 đến Test 5 đều ghi đè đúng 4 con số này vào file .inp!)`,
                out: `237\n`,
                ans: `237\n`
              },
              explain: 'Bạn có thể bấm nút "Copy Code hiện tại" và dán sang USACO IDE bấm Run ngay! Bạn sẽ thấy cả 5 dòng in ra 4 con số giống hệt nhau không sai một chữ số nào!'
            };
          }

          if (eng === 'c_rand') {
            return {
              code,
              changedLines: changed,
              statusOk: false,
              statusText: 'LỖI TRẦN 32767 (Windows): Yêu cầu sinh số tới 10^15 nhưng không có số nào vượt quá 32768!',
              console: `Test 1: 42 18468 6335 \nTest 2: 26501 19170 15725 \nTest 3: 11479 29359 26963 \nTest 4: 24465 5706 28146 \nTest 5: 23282 16828 9962 `,
              files: {
                inp: `3\n23282 16828 9962\n`,
                out: `50072\n`,
                ans: `50072\n`
              },
              explain: 'Dù truyền r = 10^15 vào hàm Rand(1, 10^15), nhưng trên Windows rand() chỉ trả về số <= 32767. Do đó nếu code Full của bạn bị lỗi tràn kiểu int (quên dùng long long), máy chấm dùng rand() sẽ KHÔNG BAO GIỜ phát hiện ra!'
            };
          }

          if (eng === 'mt32_mod') {
            return {
              code,
              changedLines: changed,
              statusOk: false,
              statusText: 'LỖI CẮT NGỌN 32-BIT: Dùng mt19937 thường + phép chia dư % khiến số sinh ra không bao giờ vượt quá 4.29 tỷ!',
              console: `Test 1: 3891024112 918273645 4102938471 \nTest 2: 1209384756 3998172635 2847561920 \nTest 3: 4019283746 192837465 3102938475 \nTest 4: 2891029384 4291029381 847561029 \nTest 5: 1928374650 3748291023 2109283746 `,
              files: {
                inp: `3\n1928374650 3748291023 2109283746\n`,
                out: `7785949419\n`,
                ans: `7785949419\n`
              },
              explain: 'Vì mt19937 (không có _64) chỉ sinh số 32-bit tối đa là 4,294,967,295 (~4.29 * 10^9). Khi lấy rd() % 10^15, kết quả vẫn chỉ loanh quanh vài tỷ chứ không bao giờ chạm tới 10^15!'
            };
          }

          return {
            code,
            changedLines: changed,
            statusOk: true,
            statusText: 'CHUẨN MỰC: mt19937_64 toàn cục + steady_clock sinh số 64-bit phân bố đều tới 10^15 ở mọi test!',
            console: `Test 1: 849201928374651 129384756102938 991827364519283 \nTest 2: 451928374650192 738291029384756 192837465091827 \nTest 3: 618293049586712 910293847561029 384756192039485 \nTest 4: 293847561029384 847561920394857 564738291029384 \nTest 5: 719283746501928 102938475610293 884756192039481 `,
            files: {
              inp: `3\n719283746501928 102938475610293 884756192039481\n`,
              out: `1706978414151702\n`,
              ans: `1706978414151702\n`
            },
            explain: 'Khởi tạo mt19937_64 ở ngoài hàm main() kết hợp uniform_int_distribution<long long> giúp mỗi test đều có dữ liệu hoàn toàn mới và đạt tới tận 10^15 (bắt gọn mọi lỗi tràn số int)!'
          };
        }
      }
    ],
    quiz: [
      {
        q: 'Câu 1: Trên hệ điều hành Windows (với trình biên dịch MinGW đi kèm Code::Blocks), hàm rand() cổ điển trả về số nguyên lớn nhất (RAND_MAX) là bao nhiêu?',
        options: [
          '32,767 (tức 2^15 - 1)',
          '2,147,483,647 (tức 2^31 - 1)',
          '10^18',
          'Không có giới hạn'
        ],
        correct: 0,
        explain: 'Chính xác! RAND_MAX trên Windows chỉ là 32767, khiến hàm rand() hoàn toàn vô dụng khi cần sinh test lớn trong lập trình thi đấu.'
      },
      {
        q: 'Câu 2: Chuyện gì sẽ xảy ra nếu ta đặt dòng mt19937 rd(time(0)); ở BÊN TRONG hàm void generate()?',
        options: [
          'Chương trình không biên dịch được.',
          'Vì time(0) chỉ đổi giá trị mỗi giây 1 lần, các test chạy trong cùng 1 giây sẽ nhận cùng một hạt giống (Seed) và sinh ra bộ test giống hệt nhau.',
          'Số ngẫu nhiên sinh ra sẽ luôn bằng 0.',
          'Máy chấm sẽ chạy nhanh gấp đôi.'
        ],
        correct: 1,
        explain: 'Chuẩn xác! Trong 1 giây máy chấm chạy được hàng chục test, nên nếu khởi tạo lại với time(0) trong hàm generate(), hàng chục test liên tiếp sẽ y hệt nhau.'
      },
      {
        q: 'Câu 3: Sự khác biệt cốt lõi giữa mt19937 và mt19937_64 là gì?',
        options: [
          'mt19937 chỉ chạy được trên Windows, còn mt19937_64 chỉ chạy được trên Linux.',
          'mt19937 sinh số nguyên không dấu 32-bit (tối đa ~4.29 * 10^9), còn mt19937_64 sinh số nguyên không dấu 64-bit (tối đa ~1.84 * 10^19, phủ trọn kiểu long long).',
          'mt19937_64 sinh ra 64 số cùng một lúc.',
          'Không có sự khác biệt nào.'
        ],
        correct: 1,
        explain: 'Đúng vậy! Khi dùng công thức chia lấy dư l + rd() % (r - l + 1) cho kiểu long long, bắt buộc phải dùng mt19937_64.'
      },
      {
        q: 'Câu 4: Đâu là cách khai báo bộ sinh số ngẫu nhiên và hàm Rand(l, r) chuẩn nhất cho Template Máy Chấm?',
        options: [
          'Đặt srand(time(0)) bên trong hàm generate() và dùng rand().',
          'Khai báo mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count()); ở toàn cục (ngoài main) và viết hàm Rand(long long l, long long r).',
          'Khai báo mt19937 rd(1); bên trong vòng lặp for.',
          'Không cần khởi tạo hạt giống (Seed) cho mt19937.'
        ],
        correct: 1,
        explain: 'Hoàn hảo! Khai báo toàn cục với steady_clock đảm bảo mỗi lần chạy và mỗi test trong vòng lặp đều sinh ra dữ liệu ngẫu nhiên độc lập.'
      }
    ]
  },

  // ============================================================================
  // MODULE 4: THUẬT TRÂU, THUẬT FULL, TEMPLATE MÁY CHẤM & TỔ CHỨC FILE KỲ THI
  // ============================================================================
  {
    id: 'm4',
    number: 'Module 04',
    shortTitle: 'Template & Tổ Chức Thi',
    title: 'Thuật Trâu vs Thuật Full, Template Máy Chấm Chuẩn & Tổ Chức Thư Mục Trong Phòng Thi',
    lead: 'Cách phối hợp bộ 3 file (NAME.cpp, NAME_TRAU.cpp, MAYCHAM.cpp), bí quyết dùng #define NAME để đổi tên bài trong 1 giây, và quy trình 4 bước thao tác trên Code::Blocks để không bao giờ dính lỗi chấm nhầm file .exe cũ.',
    sections: [
      {
        num: '4.1',
        heading: 'Triết lý Đối chiếu: Thuật Trâu (NAME_TRAU) và Thuật Full (NAME)',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Thuật Trâu (<code>NAME_TRAU.cpp</code>) <span class="concept-tag">Chân lý đúng đắn</span></h4>
              <p>Là chương trình giải bài toán bằng cách <strong>ngây thơ nhất, vét cạn mọi trường hợp</strong> ($O(N^2), O(N^3), O(2^N)$):</p>
              <ul>
                <li><strong>Ưu tiên duy nhất:</strong> Chắc chắn đúng 100% với $N$ nhỏ, code càng ngắn gọn càng ít chỗ sai càng tốt.</li>
                <li><strong>File đọc/ghi:</strong> Đọc <code>NAME.inp</code> $\rightarrow$ Ghi ra <strong><code>NAME.ans</code></strong> (Answer - Đáp án chuẩn).</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. Thuật Full (<code>NAME.cpp</code>) <span class="concept-tag">Đối tượng cần kiểm tra</span></h4>
              <p>Là chương trình dùng thuật toán thông minh ($O(N), O(N \log N)$, Quy hoạch động, Tham lam, Chặt nhị phân...) để lấy trọn điểm:</p>
              <ul>
                <li><strong>Rủi ro:</strong> Rất dễ dính lỗi xét thiếu trường hợp biên, tràn số, sai chỉ số mảng.</li>
                <li><strong>File đọc/ghi:</strong> Đọc <code>NAME.inp</code> $\rightarrow$ Ghi ra <strong><code>NAME.out</code></strong> (Output bài thi).</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>3. Mẹo <code>#define NAME "BAI1"</code> <span class="concept-tag">Nối chuỗi tự động C++</span></h4>
              <p>Trong C++, khi bạn viết hai chuỗi hằng cạnh nhau như <code>"BAI1" ".inp"</code>, trình biên dịch tự động ghép chúng thành <code>"BAI1.inp"</code>!</p>
              <ul>
                <li>Nhờ đặt <code>#define NAME "BAI1"</code> ở dòng đầu tiên, mọi lệnh bên dưới chỉ cần viết <code>NAME ".inp"</code>, <code>NAME ".out"</code>, <code>NAME "_TRAU.exe"</code>.</li>
                <li>Khi chuyển sang làm Bài 2 trong phòng thi, bạn <strong>chỉ cần sửa đúng 1 chữ</strong> thành <code>#define NAME "BAI2"</code> là xong!</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '4.2',
        heading: 'Cách tổ chức thư mục trong kỳ thi & Quy trình 4 bước trên Code::Blocks',
        html: `
          <div class="diagram-box">D:\\ThiHSG_Tinh\\
  ├── BAI1\\
  │     ├── BAI1.cpp         --(Bấm Build F9)--&gt; BAI1.exe        (Đọc BAI1.inp -&gt; Xuất BAI1.out)
  │     ├── BAI1_TRAU.cpp    --(Bấm Build F9)--&gt; BAI1_TRAU.exe   (Đọc BAI1.inp -&gt; Xuất BAI1.ans)
  │     ├── MAYCHAM.cpp      --(Build &amp; Run)--&gt; MAYCHAM.exe     (Sinh BAI1.inp -&gt; Gọi 2 file .exe -&gt; fc /w)
  │     ├── BAI1.inp         (Tự động được sinh ra bởi MAYCHAM.exe)
  │     ├── BAI1.out         (Tự động được sinh ra bởi BAI1.exe)
  │     └── BAI1.ans         (Tự động được sinh ra bởi BAI1_TRAU.exe)
  └── BAI2\\ ...</div>
          <div class="analogy-box">
            <strong>QUY TẮC SỐNG CÒN TRÊN CODE::BLOCKS (90% HỌC SINH MỚI ĐỀU MẮC):</strong><br/>
            Lệnh <code>system("BAI1.exe")</code> trong Máy Chấm gọi <strong>file thực thi <code>BAI1.exe</code> trên ổ cứng</strong> chứ KHÔNG tự động biên dịch file mã nguồn <code>BAI1.cpp</code>!<br/>
            $\Rightarrow$ <strong>Mỗi khi bạn sửa bất kỳ dòng code nào trong <code>BAI1.cpp</code> hoặc <code>BAI1_TRAU.cpp</code>, bạn BẮT BUỘC phải chuyển qua tab đó bấm Build (F9) để cập nhật lại file <code>.exe</code> mới, rồi mới quay sang tab <code>MAYCHAM.cpp</code> bấm Run!</strong>
          </div>
        `
      }
    ],
    discussions: [
      {
        id: 'd4_1',
        question: 'Câu hỏi thảo luận 1: Sau khi viết xong BAI1.cpp, bạn copy toàn bộ code sang tạo file BAI1_TRAU.cpp rồi sửa phần thuật toán thành thuật Trâu, nhưng quên sửa dòng freopen(NAME ".out", "w", stdout); ở đầu hàm main() của BAI1_TRAU.cpp. Hỏi khi chạy Máy Chấm sẽ xảy ra hiện tượng kỳ lạ gì?',
        answer: 'Cả <code>BAI1.exe</code> lẫn <code>BAI1_TRAU.exe</code> đều ghi kết quả đè vào cùng file <code>BAI1.out</code>! Còn file <code>BAI1.ans</code> thì không tồn tại (hoặc vẫn chứa kết quả cũ từ bài trước). Kết quả là lệnh <code>fc /w BAI1.out BAI1.ans</code> sẽ báo lỗi <code>cannot find the file BAI1.ans</code> hoặc so sánh sai hoàn toàn! <strong>Nhớ kỹ: Code Trâu bắt buộc phải xuất ra đuôi <code>.ans</code>!</strong>'
      },
      {
        id: 'd4_2',
        question: 'Câu hỏi thảo luận 2: Máy chấm vừa bắt được WRONG ở Test 14. Bạn mở BAI1.cpp ra sửa lỗi xong, rồi lập tức bấm Run ở tab MAYCHAM.cpp (mà quên bấm Build ở tab BAI1.cpp). Tại sao máy chấm vẫn tiếp tục báo WRONG với đúng lỗi cũ?',
        answer: 'Vì bạn chỉ mới sửa văn bản trong <code>BAI1.cpp</code>, còn file <code>BAI1.exe</code> nằm trên ổ cứng vẫn là phiên bản cũ chứa lỗi từ trước! Khi <code>MAYCHAM.exe</code> gọi <code>system("BAI1.exe")</code>, nó vẫn chạy cái file <code>.exe</code> cũ đó. Phải bấm <strong>Build (Ctrl + F9)</strong> ở tab <code>BAI1.cpp</code> trước!'
      }
    ],
    sandboxes: [
      {
        id: 'sb4_1',
        title: 'Phòng thí nghiệm 4: Toàn bộ Template Máy Chấm Chuẩn & Các lỗi vận hành trong phòng thi',
        desc: 'Đây là khung Template chuẩn chỉnh nhất để bạn Copy về dùng. Hãy thử bật các lỗi vận hành thường gặp khi đi thi để xem hiện tượng trên Console.',
        toggles: [
          {
            key: 'envTarget',
            label: '1. Môi trường xuất Template',
            options: [
              { value: 'win', text: 'Học sinh: Windows (Code::Blocks)', kind: 'ok' },
              { value: 'linux', text: 'Giáo viên: Arch Linux', kind: 'ok' }
            ]
          },
          {
            key: 'trauExt',
            label: '2. File xuất trong BAI1_TRAU.cpp',
            options: [
              { value: 'ans', text: 'freopen(NAME ".ans", "w", stdout) (Chuẩn)', kind: 'ok' },
              { value: 'out_dup', text: 'Copy quên sửa thành .ans (Vẫn để .out)', kind: 'bug' }
            ]
          },
          {
            key: 'buildState',
            label: '3. Thao tác Build trên Code::Blocks',
            options: [
              { value: 'built', text: 'Đã Build (F9) cả BAI1.exe & BAI1_TRAU.exe', kind: 'ok' },
              { value: 'no_exe', text: 'Chưa bấm Build BAI1_TRAU.cpp ra .exe', kind: 'bug' }
            ]
          }
        ],
        build(state) {
          const isWin = state.envTarget === 'win';
          const wrongExt = state.trauExt === 'out_dup';
          const noExe = state.buildState === 'no_exe';

          const runFull = isWin ? 'system(NAME ".exe");' : 'system("./" NAME);';
          const runTrau = isWin ? 'system(NAME "_TRAU.exe");' : 'system("./" NAME "_TRAU");';
          const cmpLine = isWin
            ? 'if (system("fc /w " NAME ".out " NAME ".ans") != 0)'
            : 'if (system("diff -w " NAME ".out " NAME ".ans") != 0)';

          const code = `#include <bits/stdc++.h>
#include <cassert>
using namespace std;

#define NAME "BAI1"
const int NTEST = 100;

mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());

long long Rand(long long l, long long r) {
    assert(l <= r);
    return uniform_int_distribution<long long>(l, r)(rd);
}

void generate() {
    ofstream inp(NAME ".inp");
    int n = Rand(5, 10);
    inp << n << "\\n";
    for (int i = 1; i <= n; i++) {
        inp << Rand(-20, 20) << (i == n ? "" : " ");
    }
    inp << "\\n";
    inp.close();
}

void compare(int iTest) {
    ${cmpLine} {
        cout << "Test " << iTest << ": WRONG!\\n";
        exit(0);
    }
    cout << "Test " << iTest << ": CORRECT!\\n";
}

int main() {
    for (int iTest = 1; iTest <= NTEST; iTest++) {
        generate();
        ${runFull}
        ${runTrau}
        compare(iTest);
    }
    return 0;
}`;

          if (noExe) {
            return {
              code,
              changedLines: [38],
              statusOk: false,
              statusText: 'LỖI QUÊN BUILD .EXE: Hệ điều hành không tìm thấy file BAI1_TRAU.exe trong thư mục!',
              console: isWin
                ? `'BAI1_TRAU.exe' is not recognized as an internal or external command,\noperable program or batch file.\nFC: cannot open BAI1.ANS - No such file or directory\nTest 1: WRONG!`
                : `sh: line 1: ./BAI1_TRAU: No such file or directory\ndiff: BAI1.ans: No such file or directory\nTest 1: WRONG!`,
              files: {
                inp: `6\n-4 12 -3 8 -10 5\n`,
                out: `17\n`,
                ans: `[Không tồn tại file BAI1.ans vì BAI1_TRAU.exe chưa được tạo ra!]`
              },
              explain: 'Khi thấy thông báo "\'BAI1_TRAU.exe\' is not recognized...", nghĩa là bạn mới chỉ lưu file BAI1_TRAU.cpp chứ chưa bấm Build (F9) để dịch nó ra file chạy .exe!'
            };
          }

          if (wrongExt) {
            return {
              code,
              changedLines: [27, 38],
              statusOk: false,
              statusText: 'LỖI COPY NHẦM ĐUÔI FILE: BAI1_TRAU.cpp vẫn ghi vào BAI1.out nên không có file BAI1.ans để so sánh!',
              console: isWin
                ? `FC: cannot open BAI1.ANS - No such file or directory\nTest 1: WRONG!\n\nProcess returned 0 (0x0)`
                : `diff: BAI1.ans: No such file or directory\nTest 1: WRONG!`,
              files: {
                inp: `6\n-4 12 -3 8 -10 5\n`,
                out: `17 (Bị BAI1_TRAU.exe ghi đè lên BAI1.out!)\n`,
                ans: `[Không tồn tại file BAI1.ans do trong BAI1_TRAU.cpp bạn viết nhầm freopen(NAME ".out", "w", stdout)]`
              },
              explain: 'Đây là lỗi cực kỳ phổ biến khi copy khung code từ bài Full sang bài Trâu: quên đổi chữ ".out" thành ".ans" ở dòng freopen của file _TRAU.cpp!'
            };
          }

          return {
            code,
            changedLines: [5, 15, 26, 37, 38],
            statusOk: true,
            statusText: 'TEMPLATE HOÀN HẢO: Chạy mượt mà 100 test, sẵn sàng copy vào thư mục thi của bạn!',
            console: isWin
              ? `Comparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 1: CORRECT!\nComparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 2: CORRECT!\n...\nComparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 100: CORRECT!`
              : `Test 1: CORRECT!\nTest 2: CORRECT!\n...\nTest 100: CORRECT!`,
            files: {
              inp: `6\n-4 12 -3 8 -10 5\n`,
              out: `17\n`,
              ans: `17\n`
            },
            explain: 'Bạn có thể bấm nút "Copy Code hiện tại" ở góc trên để lưu ngay khung MAYCHAM.cpp chuẩn này vào máy!'
          };
        }
      }
    ],
    quiz: [
      {
        q: 'Câu 1: Trong C++, khi viết #define NAME "MAXSUB" ở đầu chương trình, biểu thức chuỗi NAME "_TRAU.exe" sẽ được trình biên dịch hiểu thành gì?',
        options: [
          'Báo lỗi biên dịch vì thiếu dấu cộng (+).',
          'Tự động nối 2 chuỗi hằng đứng cạnh nhau thành "MAXSUB_TRAU.exe".',
          'Hiển thị chữ "NAME_TRAU.exe".',
          'Xóa mất chữ MAXSUB.'
        ],
        correct: 1,
        explain: 'Chính xác! C/C++ có tính năng tự động ghép các chuỗi hằng đặt cạnh nhau (String Literal Concatenation), giúp bạn chỉ cần đổi #define NAME ở 1 dòng duy nhất.'
      },
      {
        q: 'Câu 2: Trong 3 file của một bài toán (BAI1.cpp, BAI1_TRAU.cpp, MAYCHAM.cpp), quy ước tên file nhập/xuất chuẩn xác là gì?',
        options: [
          'BAI1.cpp xuất ra BAI1.ans; BAI1_TRAU.cpp xuất ra BAI1.out.',
          'MAYCHAM.cpp xuất đề vào BAI1.inp; BAI1.cpp đọc BAI1.inp và xuất ra BAI1.out; BAI1_TRAU.cpp đọc BAI1.inp và xuất ra BAI1.ans.',
          'Cả BAI1.cpp và BAI1_TRAU.cpp đều xuất ra BAI1.out.',
          'MAYCHAM.cpp đọc từ BAI1.inp.'
        ],
        correct: 1,
        explain: 'Chuẩn xác! .inp là Input (do máy chấm sinh), .out là Output của thuật Full, còn .ans là Answer của thuật Trâu.'
      },
      {
        q: 'Câu 3: Khi chạy MAYCHAM.exe trên Windows xuất hiện thông báo lỗi: "\'BAI1_TRAU.exe\' is not recognized as an internal or external command", nguyên nhân là gì?',
        options: [
          'Code thuật Trâu bị sai kết quả.',
          'Bạn chưa bấm Build (F9) file BAI1_TRAU.cpp để tạo ra file chạy BAI1_TRAU.exe (hoặc lưu file không cùng thư mục với MAYCHAM.exe).',
          'Bạn quên gọi inp.close().',
          'Máy tính bị hết RAM.'
        ],
        correct: 1,
        explain: 'Đúng vậy! Phải đảm bảo cả 3 file nằm chung 1 thư mục và đã bấm Build (F9) cho cả BAI1.cpp lẫn BAI1_TRAU.cpp trước khi chạy MAYCHAM.cpp.'
      },
      {
        q: 'Câu 4: Mục tiêu quan trọng nhất khi viết code cho file NAME_TRAU.cpp là gì?',
        options: [
          'Phải chạy nhanh dưới 1 giây với N = 10^6.',
          'Phải dùng thuật toán càng phức tạp càng tốt.',
          'Phải đơn giản, rõ ràng và đảm bảo ĐÚNG TUYỆT ĐỐI 100% với N nhỏ để làm thước đo chuẩn đối chiếu với thuật Full.',
          'Không được dùng vòng lặp for.'
        ],
        correct: 2,
        explain: 'Hoàn toàn chính xác! Thuật Trâu là "trọng tài", nếu trọng tài mà viết phức tạp dẫn đến sai thì máy chấm sẽ mất tác dụng.'
      }
    ]
  },

  // ============================================================================
  // MODULE 5: THỰC HÀNH SINH TEST CÓ CẤU TRÚC & ĐỘ MẠNH CỦA TEST (TEST STRENGTH)
  // ============================================================================
  {
    id: 'm5',
    number: 'Module 05',
    shortTitle: 'Sinh Test & Độ Mạnh Test',
    title: 'Thực Hành Sinh Test Có Cấu Trúc Đặc Biệt & Nghệ Thuật Tạo "Test Mạnh"',
    lead: 'Tại sao sinh ngẫu nhiên ngây thơ Rand(1, 10^9) thường tạo ra "test rác" không bắt được lỗi nào? Thực hành trên bài Đoạn Con Tổng Lớn Nhất (MAXSUB) và bài Truy Vấn Trên Mảng Tăng Dần (QUERY) để nắm vững cách sinh test đúng ràng buộc và ép lộ bug.',
    sections: [
      {
        num: '5.1',
        heading: 'Khởi động với Bài 1 (MAXSUB): Tại sao khi chấm thử chỉ nên sinh N từ 5 đến 10?',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>Đề bài 1: Đoạn con có tổng lớn nhất (<code>MAXSUB</code>)</h4>
              <p>Cho mảng $N$ số nguyên $A_1, A_2, \dots, A_N$ ($N \le 2 \times 10^5, |A_i| \le 10^9$). Tìm tổng lớn nhất của một đoạn con liên tiếp khác rỗng.</p>
              <ul>
                <li><strong>Thuật Trâu ($O(N^2)$):</strong> 2 vòng <code>for</code> duyệt mọi cặp đầu mút $(L, R)$.</li>
                <li><strong>Thuật Full ($O(N)$):</strong> Thuật toán Kadane hoặc Mảng cộng dồn.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>Nguyên tắc vàng: Sinh $N$ nhỏ (<code>Rand(5, 10)</code>) trước! <span class="concept-tag">Dễ tìm lỗi</span></h4>
              <p>Nhiều bạn mới viết máy chấm hay sinh ngay <code>n = Rand(1000, 10000)</code>. Đó là sai lầm vì 2 lý do:</p>
              <ul>
                <li><strong>Lý do 1 (Tốc độ):</strong> Với $N = 10$, 1 giây máy chấm chạy được hàng chục test; còn $N = 10^4$ thì thuật Trâu chạy 1 test đã mất cả giây!</li>
                <li><strong>Lý do 2 (Debug bằng mắt):</strong> Khi máy chấm dừng lại ở <code>WRONG!</code>, mở file <code>.inp</code> thấy chỉ có <strong>5 con số</strong> (ví dụ: <code>-4 -2 -9 -1 -5</code>), bạn nhẩm bằng mắt 3 giây là phát hiện ra ngay code Full của mình bị sai khi mảng toàn số âm! Nếu mảng có 10,000 số thì bạn không thể nào nhìn ra lỗi!</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '5.2',
        heading: 'Trọng tâm Bài 2 (QUERY): Test có cấu trúc đặc biệt & Bẫy "Test Yếu"',
        html: `
          <div class="analogy-box">
            <strong>Đề bài 2 (<code>QUERY</code> - Đếm số lần xuất hiện trên đoạn của mảng tăng dần):</strong><br/>
            Cho mảng $A$ gồm $N$ số nguyên <strong>đã được sắp xếp tăng dần</strong> ($A_1 \le A_2 \le \dots \le A_N$, $|A_i| \le 10^9$) và $Q$ truy vấn. Mỗi truy vấn cho 3 số nguyên $L, R, X$ ($1 \le L \le R \le N$), yêu cầu đếm xem giá trị $X$ xuất hiện bao nhiêu lần trong đoạn từ $A[L]$ đến $A[R]$.<br/>
            - <strong>Code Trâu (<code>QUERY_TRAU.cpp</code>):</strong> Duyệt <code>for (int i = L; i &lt;= R; i++) if (a[i] == x) cnt++;</code> ($O(N \times Q)$).<br/>
            - <strong>Code Full (<code>QUERY.cpp</code>):</strong> Dùng chặt nhị phân <code>upper_bound</code> trừ <code>lower_bound</code> trên đoạn $[L, R]$ ($O(Q \log N)$).
          </div>
          <div class="concept-grid">
            <div class="concept-card">
              <h4>Cạm bẫy 1: Sinh Test Vi Phạm Cấu Trúc Đề Bài <span class="concept-tag">Invalid Test</span></h4>
              <p>Đề bài có 2 ràng buộc cứng mà nếu hàm <code>generate()</code> của bạn không tuân thủ, chính máy chấm sẽ tạo ra "đề bài lỗi":</p>
              <ul>
                <li><strong>Ràng buộc 1 (Mảng tăng dần):</strong> Nếu bạn chỉ <code>inp &lt;&lt; Rand(1, 10)</code> mà quên lưu vào mảng rồi gọi <strong><code>sort(a + 1, a + n + 1)</code></strong> trước khi in, mảng trong file <code>.inp</code> sẽ lộn xộn $\rightarrow$ Chặt nhị phân trong code Full chạy sai bét dù code Full viết đúng!</li>
                <li><strong>Ràng buộc 2 (Đoạn $1 \le L \le R \le N$):</strong> Nếu viết ngây thơ <code>int L = Rand(1, n), R = Rand(1, n);</code>, sẽ có lúc sinh ra $L = 8, R = 3$ ($L > R$) làm sập chương trình! Cách viết chuẩn: <strong><code>int L = Rand(1, n); int R = Rand(L, n);</code></strong> (hoặc <code>if (L &gt; R) swap(L, R);</code>).</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>Cạm bẫy 2: Sinh Ngẫu Nhiên Ngây Thơ Tạo Ra "Test Cực Yếu" <span class="concept-tag">Weak Test</span></h4>
              <p>Thử tưởng tượng bạn thấy đề bài ghi $|A_i|, |X| \le 10^9$, thế là trong <code>generate()</code> bạn viết:</p>
              <p><code>a[i] = Rand(1, 1000000000);</code> và <code>x = Rand(1, 1000000000);</code></p>
              <ul>
                <li><strong>Hậu quả:</strong> Chọn 10 con số ngẫu nhiên trong 1 tỷ số, xác suất để số $X$ trùng với một số trong mảng $A$ chỉ là $\frac{10}{10^9} = 0.000001\%$!</li>
                <li>Chạy 1,000 test thì cả 1,000 test đều có đáp án là <strong><code>0</code> (không tìm thấy)</strong>! Nếu code Full của bạn viết sai hoàn toàn công thức tính độ dài đoạn tìm thấy, nó vẫn vượt qua 1,000 test của máy chấm ngon lành rồi vào phòng thi nhận 0 điểm!</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>3 Tuyệt Chiêu Làm Mạnh Test (Test Strength) <span class="concept-tag">Bí kíp thực chiến</span></h4>
              <ul>
                <li><strong>Chiêu 1 (Nén miền giá trị - Value Compression):</strong> Khi sinh mảng $N = 10$ phần tử, chỉ sinh <code>a[i] = Rand(1, 4)</code>! Theo nguyên lý Dirichlet, chắc chắn sẽ có nhiều số bằng nhau đứng cạnh nhau (ví dụ: <code>1 1 2 2 2 3 4 4</code>), ép chặt nhị phân phải xử lý đúng biên trái/phải của đoạn trùng nhau!</li>
                <li><strong>Chiêu 2 (Ép xác suất trúng đích - Biased Sampling):</strong> Tung đồng xu <code>if (Rand(0, 1) == 1)</code> thì bốc thẳng một phần tử có thật trong mảng làm $X$: <code>x = a[Rand(L, R)];</code>! Đảm bảo ít nhất 50% truy vấn có kết quả $> 0$.</li>
                <li><strong>Chiêu 3 (Gài test biên):</strong> Thử $L = R$, thử mảng toàn 1 số giống hệt nhau (<code>Rand(5, 5)</code>), và thử miền số cực lớn ở một vài test để kiểm tra tràn <code>long long</code>.</li>
              </ul>
            </div>
          </div>
        `
      }
    ],
    discussions: [
      {
        id: 'd5_1',
        question: 'Câu hỏi thảo luận 1: Trong bài Đoạn con có tổng lớn nhất (MAXSUB), nếu hàm generate() của bạn viết inp << Rand(1, 100) cho mọi phần tử trong mảng, thì có một lỗi cực kỳ phổ biến nào trong code của học sinh sẽ KHÔNG BAO GIỜ bị phát hiện?',
        answer: 'Đó là lỗi khởi tạo biến kết quả <code>long long ans = 0;</code> (hoặc <code>cur &lt; 0 thì gán bằng 0</code> mà không xét đoạn khác rỗng)! Vì bạn chỉ sinh số dương <code>Rand(1, 100)</code> nên tổng lớn nhất luôn dương. Để bắt được lỗi này, hàm <code>generate()</code> bắt buộc phải sinh cả số âm <code>Rand(-50, 20)</code> (thậm chí có test toàn số âm <code>Rand(-50, -1)</code>)!'
      },
      {
        id: 'd5_2',
        question: 'Câu hỏi thảo luận 2: Giả sử đề bài cho N số nguyên ĐÔI MỘT KHÁC NHAU (a[i] != a[j] với mọi i != j). Nếu dùng Rand(1, 10) để sinh 8 số thì chắc chắn bị trùng. Làm thế nào để sinh được N số đôi một khác nhau trong hàm generate()?',
        answer: 'Có 2 cách rất dễ:<br/>- <strong>Cách 1 (Dùng mảng đánh dấu hoặc <code>set</code>):</strong> Sinh số mới, nếu chưa có trong <code>set</code> thì mới nhận.<br/>- <strong>Cách 2 (Sinh tăng dần từng bước):</strong> Cho <code>a[1] = Rand(1, 5);</code>, với các số tiếp theo gán <code>a[i] = a[i - 1] + Rand(1, 5);</code> (mỗi bước tăng ít nhất 1 đơn vị nên chắc chắn 100% đôi một khác nhau!), sau đó nếu không cần mảng tăng dần thì gọi <code>shuffle(a + 1, a + n + 1, rd);</code> để xáo trộn vị trí!'
      },
      {
        id: 'd5_3',
        question: 'Câu hỏi thảo luận 3: Khi máy chấm chạy 100 test đều báo CORRECT hết, bạn đã được phép yên tâm 100% nộp bài chưa? Còn 2 yếu tố nào mà máy chấm với N nhỏ (N = 10) chưa kiểm tra được?',
        answer: 'Còn 2 yếu tố phải tự kiểm tra thêm:<br/>1. <strong>Thời gian chạy (TLE) & Bộ nhớ (MLE) ở giới hạn tối đa:</strong> Phải thử sửa hàm <code>generate()</code> sinh 1 test với $N$ lớn nhất theo đề bài (ví dụ $N = 2 \times 10^5$), chỉ chạy một mình <code>system(NAME ".exe")</code> xem có chạy dưới 1 giây và không bị tràn mảng (khai báo thiếu kích thước mảng <code>NMAX</code>) hay không.<br/>2. <strong>Tràn số <code>int</code> / <code>long long</code> ở giá trị cực đại:</strong> Thử sinh $A_i = \text{Rand}(10^8, 10^9)$ xem tổng có bị tràn kiểu <code>int</code> không.'
      }
    ],
    sandboxes: [
      {
        id: 'sb5_1',
        title: 'Phòng thí nghiệm 5: Sinh Test Có Cấu Trúc & Làm Mạnh Test (Bài QUERY)',
        desc: 'Giả sử code Full (QUERY.cpp) của học sinh có một lỗi nhỏ: viết nhầm cả 2 dòng thành lower_bound (hoặc viết sai khi X xuất hiện nhiều lần). Hãy thử thay đổi cách viết hàm generate() để xem khi nào máy chấm bắt được lỗi và khi nào máy chấm bị "mù"!',
        toggles: [
          {
            key: 'structRule',
            label: '1. Tuân thủ cấu trúc đề bài (.inp)',
            options: [
              { value: 'valid', text: 'Chuẩn: Có sort(a) & R = Rand(L, n)', kind: 'ok' },
              { value: 'no_sort', text: 'Lỗi: Quên sort mảng a[]', kind: 'bug' },
              { value: 'bad_lr', text: 'Lỗi: Sinh L, R độc lập (Gây L > R)', kind: 'bug' }
            ]
          },
          {
            key: 'strengthMode',
            label: '2. Chiến lược Độ mạnh của Test',
            options: [
              { value: 'strong', text: 'Test Mạnh: Miền nhỏ [1, 4] & Ép 50% X thuộc a[]', kind: 'ok' },
              { value: 'weak', text: 'Test Yếu: Sinh ngây thơ Rand(1, 10^9)', kind: 'bug' }
            ]
          }
        ],
        build(state) {
          const st = state.structRule;
          const isStrong = state.strengthMode === 'strong';
          const changed = [];

          let code = `#include <bits/stdc++.h>
#include <cassert>
using namespace std;
#define NAME "QUERY"

mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());
long long Rand(long long l, long long r) {
    assert(l <= r);
    return uniform_int_distribution<long long>(l, r)(rd);
}

void generate() {
    ofstream inp(NAME ".inp");
    int n = 8, q = 4;
    inp << n << " " << q << "\\n";
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) {
`;
          if (isStrong) {
            code += `        a[i] = Rand(1, 4); // TEST MẠNH: Miền giá trị hẹp [1..4] để ép nhiều số trùng nhau\n`;
            changed.push(18);
          } else {
            code += `        a[i] = Rand(1, 1000000000LL); // TEST YẾU: Miền quá rộng [1..10^9]!\n`;
            changed.push(18);
          }
          code += `    }\n`;

          if (st === 'no_sort') {
            code += `    // LỖI CẤU TRÚC: Quên sort(a.begin() + 1, a.end()) trong khi đề bài cho mảng tăng dần!\n`;
            changed.push(20);
          } else {
            code += `    sort(a.begin() + 1, a.end()); // Đảm bảo mảng tăng dần đúng yêu cầu đề bài\n`;
          }

          code += `    for (int i = 1; i <= n; i++) inp << a[i] << (i == n ? "\\n" : " ");\n\n`;
          code += `    for (int k = 1; k <= q; k++) {\n`;

          if (st === 'bad_lr') {
            code += `        int L = Rand(1, n), R = Rand(1, n); // LỖI: Có thể sinh ra L > R!\n`;
            changed.push(24);
          } else {
            code += `        int L = Rand(1, n), R = Rand(L, n); // CHUẨN: Luôn đảm bảo 1 <= L <= R <= n\n`;
          }

          if (isStrong) {
            code += `        long long X = (Rand(0, 1) && L <= R) ? a[Rand(L, R)] : Rand(1, 5); // Ép 50% trúng đích\n`;
            changed.push(25);
          } else {
            code += `        long long X = Rand(1, 1000000000LL); // Xác suất X trùng với a[i] gần như = 0%!\n`;
            changed.push(25);
          }

          code += `        inp << L << " " << R << " " << X << "\\n";
    }
    inp.close();
}

int main() {
    generate();
    return 0;
}`;

          if (st === 'bad_lr') {
            return {
              code,
              changedLines: changed,
              statusOk: false,
              statusText: 'LỖI CẤU TRÚC ĐỀ BÀI (L > R): Truy vấn sinh ra L = 7, R = 2 làm thuật toán chặt nhị phân ra kết quả âm hoặc sập bộ nhớ (RE)!',
              console: `Comparing files QUERY.out and QUERY.ANS\n***** QUERY.out\n-3\n***** QUERY.ANS\n0\n*****\nTest 1: WRONG! (Lỗi giả: Do máy chấm sinh đề bài sai điều kiện L <= R!)`,
              files: {
                inp: `8 4\n1 1 2 2 3 3 4 4\n7 2 3   <-- LỖI: L = 7 lớn hơn R = 2!\n1 5 2\n3 8 4\n2 6 1\n`,
                out: `-3\n2\n2\n1\n`,
                ans: `0\n2\n2\n1\n`
              },
              explain: 'Khi L = 7 > R = 2, vòng for của code Trâu không chạy lần nào nên in ra 0, còn lower_bound(a+7, a+3, x) trong code Full bị truyền ngược con trỏ đầu/cuối gây lỗi! Luôn nhớ viết R = Rand(L, n) hoặc if (L > R) swap(L, R)!'
            };
          }

          if (st === 'no_sort') {
            return {
              code,
              changedLines: changed,
              statusOk: false,
              statusText: 'LỖI VI PHẠM RÀNG BUỘC MẢNG TĂNG DẦN: Quên sort(a) làm thuật toán chặt nhị phân (dù viết đúng) vẫn báo WRONG!',
              console: `Comparing files QUERY.out and QUERY.ANS\n***** QUERY.out\n0\n1\n***** QUERY.ANS\n2\n2\n*****\nTest 1: WRONG! (Lỗi giả: Do mảng trong QUERY.inp chưa được sắp xếp tăng dần!)`,
              files: {
                inp: `8 4\n4 1 3 2 4 1 2 3   <-- LỖI: Mảng lộn xộn, vi phạm đề bài "mảng tăng dần"!\n1 8 2\n2 7 1\n1 5 4\n3 8 3\n`,
                out: `0\n1\n0\n1\n`,
                ans: `2\n2\n2\n2\n`
              },
              explain: 'Đề bài cam kết mảng A tăng dần nên code Full mới dùng lower_bound/upper_bound. Vì hàm generate() quên sort mảng trước khi in ra file .inp, chặt nhị phân tìm không thấy phần tử và báo sai oan!'
            };
          }

          if (!isStrong) {
            return {
              code,
              changedLines: changed,
              statusOk: false,
              statusText: 'BẪY TEST YẾU: Chạy 100 test đều báo CORRECT giả tạo vì mọi truy vấn đều trả về 0!',
              console: `Comparing files QUERY.out and QUERY.ANS\nFC: no differences encountered\nTest 1: CORRECT!\n...\nComparing files QUERY.out and QUERY.ANS\nFC: no differences encountered\nTest 100: CORRECT! (Cảnh báo: 100% đáp án đều là số 0, chưa test được nhánh tìm thấy!)`,
              files: {
                inp: `8 4\n14209182 89102938 192837465 340192837 519283746 710293847 891029384 950192837\n1 8 444999111\n2 6 777888222\n1 5 123456789\n3 8 999111222\n`,
                out: `0\n0\n0\n0\n`,
                ans: `0\n0\n0\n0\n`
              },
              explain: 'Hãy nhìn vào tab QUERY.out và QUERY.ans: cả 4 truy vấn đều ra 0! Vì sinh ngẫu nhiên trong 1 tỷ số, X không bao giờ trùng với phần tử nào trong mảng A. Test như vậy hoàn toàn vô tác dụng!'
            };
          }

          return {
            code,
            changedLines: changed,
            statusOk: true,
            statusText: 'TEST CỰC MẠNH & ĐÚNG CẤU TRÚC: Vừa đảm bảo mảng tăng dần & L <= R, vừa ép xuất hiện nhiều số trùng nhau để bắt gọn mọi bug!',
            console: `Comparing files QUERY.out and QUERY.ANS\n***** QUERY.out\n1\n2\n***** QUERY.ANS\n3\n2\n*****\nTest 1: WRONG! (Bắt gọn bug trong code Full ngay tại Test 1 nhờ có 3 số 2 đứng liền nhau!)`,
            files: {
              inp: `8 4\n1 1 2 2 2 3 4 4\n1 6 2   <-- Đoạn [1..6] có tới 3 số 2 liên tiếp!\n2 8 4\n3 5 2\n1 8 5\n`,
              out: `1\n2\n1\n0\n`,
              ans: `3\n2\n3\n0\n`
            },
            explain: 'Nhờ thu hẹp miền Rand(1, 4) và lấy X trực tiếp từ mảng A, ngay ở Test 1 mảng đã có 3 số 2 đứng cạnh nhau (1 1 2 2 2 3 4 4), lập tức vạch trần lỗi sai của code Full ngay ở lần chạy đầu tiên!'
          };
        }
      }
    ],
    quiz: [
      {
        q: 'Câu 1: Khi mới bắt đầu chạy Máy Chấm để kiểm tra tính đúng đắn của thuật toán Full so với thuật Trâu, ta nên chọn kích thước N trong hàm generate() như thế nào?',
        options: [
          'Luôn sinh N lớn nhất theo đề bài (ví dụ N = 200,000).',
          'Sinh N nhỏ (ví dụ N từ 5 đến 10) để thuật Trâu chạy cực nhanh và khi bắt được test WRONG ta có thể nhìn bằng mắt thường, nhẩm tay tìm ra lỗi ngay.',
          'Chỉ sinh duy nhất N = 1.',
          'Sinh N âm.'
        ],
        correct: 1,
        explain: 'Chính xác! N nhỏ giúp vòng lặp chạy hàng chục test mỗi giây và quan trọng nhất là giúp con người đọc file .inp để tự trace lỗi dễ dàng.'
      },
      {
        q: 'Câu 2: Đề bài yêu cầu nhập truy vấn đoạn [L, R] thỏa mãn 1 <= L <= R <= N. Cách viết nào sau đây trong hàm generate() là ĐÚNG?',
        options: [
          'int L = Rand(1, n); int R = Rand(1, n);',
          'int L = Rand(1, n); int R = Rand(L, n); (hoặc sinh cả hai trong [1, n] rồi if (L > R) swap(L, R);)',
          'int L = Rand(1, n); int R = Rand(1, L - 1);',
          'int L = 1; int R = n; cho mọi truy vấn.'
        ],
        correct: 1,
        explain: 'Chuẩn xác! Sinh R trong đoạn [L, n] hoặc dùng if (L > R) swap(L, R) luôn đảm bảo điều kiện 1 <= L <= R <= n.'
      },
      {
        q: 'Câu 3: Tại sao trong các bài toán tìm kiếm hoặc đếm phần tử bằng nhau, việc sinh a[i] = Rand(1, 10^9) và x = Rand(1, 10^9) lại tạo ra "Test Yếu"?',
        options: [
          'Vì máy tính không in được số 10^9.',
          'Vì miền giá trị quá rộng khiến xác suất hai số bằng nhau gần như bằng 0%, dẫn đến mọi test đều rơi vào trường hợp "Không tìm thấy" và bỏ sót hoàn toàn nhánh xử lý khi tìm thấy.',
          'Vì hàm Rand chạy chậm với số 10^9.',
          'Vì file .inp sẽ nặng quá 100MB.'
        ],
        correct: 1,
        explain: 'Hoàn toàn chính xác! Muốn test nhánh "tìm thấy" và nhánh "nhiều phần tử trùng nhau", ta phải nén miền giá trị nhỏ lại (ví dụ Rand(1, 5)) hoặc chủ động lấy x = a[Rand(L, R)].'
      },
      {
        q: 'Câu 4: Đề bài cho trước điều kiện "Dãy A được sắp xếp tăng dần". Nếu trong hàm generate() bạn sinh ngẫu nhiên mảng A mà quên gọi lệnh sort(a + 1, a + n + 1) trước khi in vào file .inp, điều gì sẽ xảy ra?',
        options: [
          'Không sao cả, code Full sẽ tự sắp xếp.',
          'File .inp sinh ra vi phạm điều kiện đề bài; thuật toán chặt nhị phân trong code Full sẽ chạy sai kết quả dù code Full viết hoàn toàn đúng!',
          'Code Trâu sẽ không biên dịch được.',
          'Lệnh fc /w sẽ tự động sắp xếp lại file .inp.'
        ],
        correct: 1,
        explain: 'Đúng vậy! Máy chấm phải đóng vai người ra đề chuẩn chỉnh: đề bài cam kết điều kiện gì (mảng tăng dần, cây, đồ thị liên thông, L <= R...) thì hàm generate() bắt buộc phải thỏa mãn điều kiện đó.'
      },
      {
        q: 'Câu 5: Sau khi vượt qua 100 test nhỏ (N <= 10) trên máy chấm, bước kiểm tra cuối cùng bạn nên làm trước khi yên tâm nộp bài là gì?',
        options: [
          'Xóa luôn file bài làm.',
          'Sửa hàm generate() sinh thử 1 test có N lớn nhất (Max N) và giá trị A[i] lớn nhất (Max A[i]) để kiểm tra thời gian chạy (TLE), giới hạn mảng và tràn số long long.',
          'Đổi tên file .out thành .ans.',
          'Bỏ dòng freopen đi.'
        ],
        correct: 1,
        explain: 'Tuyệt vời! Bạn đã nắm trọn vẹn quy trình từ A đến Z của việc tự code và sử dụng Máy Chấm trong lập trình thi đấu!'
      }
    ]
  }
];

// Xuất ra window để script kiểm thử Node.js (verify_web.mjs) và trình duyệt truy cập
window.MODULES_DATA = MODULES_DATA;
window.highlightCpp = highlightCpp;

// ============================================================================
// BỘ ĐIỀU KHIỂN GIAO DIỆN TƯƠNG TÁC TRÊN TRÌNH DUYỆT
// ============================================================================
(function initApp() {
  const navEl = document.getElementById('module-nav');
  const headerEl = document.getElementById('module-header');
  const contentEl = document.getElementById('module-content');
  const footerEl = document.getElementById('module-footer');
  const toastEl = document.getElementById('toast');

  // Nếu đang chạy trong môi trường kiểm thử Node.js không có DOM thật thì dừng phần gắn sự kiện UI
  if (!navEl || !contentEl) return;

  let currentModIdx = 0;
  // Lưu trạng thái công tắc của từng sandbox: { [sandboxId]: { [key]: value } }
  const sandboxStates = {};
  // Lưu tab output đang chọn của từng sandbox: { [sandboxId]: 'console' | 'inp' | 'out' | 'ans' }
  const sandboxTabs = {};
  // Lưu đáp án quiz học sinh đã chọn: { [modId_qIdx]: optionIdx }
  const quizAnswers = {};

  MODULES_DATA.forEach((mod) => {
    mod.sandboxes.forEach((sb) => {
      const initState = {};
      sb.toggles.forEach((t) => {
        initState[t.key] = t.options[0].value;
      });
      sandboxStates[sb.id] = initState;
      sandboxTabs[sb.id] = 'console';
    });
  });

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  function getModuleQuizScore(mod) {
    let correctCount = 0;
    mod.quiz.forEach((qItem, idx) => {
      if (quizAnswers[`${mod.id}_${idx}`] === qItem.correct) {
        correctCount++;
      }
    });
    return { correctCount, total: mod.quiz.length };
  }

  function renderNav() {
    navEl.innerHTML = MODULES_DATA.map((mod, idx) => {
      const { correctCount, total } = getModuleQuizScore(mod);
      const isDone = correctCount === total;
      return `
        <button class="module-tab ${idx === currentModIdx ? 'active' : ''}" data-mod-idx="${idx}">
          <div class="module-tab-top">
            <span>${mod.number}</span>
            <span class="quiz-badge ${isDone ? 'done' : ''}">${correctCount}/${total} câu</span>
          </div>
          <div class="module-tab-title">${mod.shortTitle}</div>
        </button>
      `;
    }).join('');

    navEl.querySelectorAll('.module-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        currentModIdx = Number(btn.getAttribute('data-mod-idx'));
        renderAll();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function renderSandboxHtml(sb) {
    const state = sandboxStates[sb.id];
    const activeTab = sandboxTabs[sb.id] || 'console';
    const built = sb.build(state);
    const highlightedCode = highlightCpp(built.code, built.changedLines || []);

    const togglesHtml = sb.toggles
      .map((t) => {
        const optsHtml = t.options
          .map((opt) => {
            const isActive = state[t.key] === opt.value;
            const kindCls = opt.kind === 'bug' ? 'is-bug' : 'is-ok';
            return `<button class="toggle-opt ${isActive ? `active ${kindCls}` : ''}" data-sb="${sb.id}" data-key="${t.key}" data-val="${opt.value}">${opt.text}</button>`;
          })
          .join('');
        return `
          <div class="toggle-group">
            <span class="toggle-label">${t.label}</span>
            <div class="toggle-options">${optsHtml}</div>
          </div>
        `;
      })
      .join('');

    let tabBody = built.console;
    if (activeTab === 'inp') tabBody = built.files.inp;
    if (activeTab === 'out') tabBody = built.files.out;
    if (activeTab === 'ans') tabBody = built.files.ans;

    return `
      <div class="sandbox-card" id="sandbox-${sb.id}">
        <div class="sandbox-top">
          <div class="sandbox-title-group">
            <h3>${sb.title}</h3>
            <p>${sb.desc}</p>
          </div>
          <div class="sandbox-actions">
            <button class="btn btn-copy" data-copy-sb="${sb.id}">📋 Copy Code hiện tại</button>
            <button class="btn btn-run" data-run-sb="${sb.id}">▶ Chạy thử (Run)</button>
          </div>
        </div>
        <div class="sandbox-toggles">${togglesHtml}</div>
        <div class="sandbox-body">
          <div class="code-pane">
            <div class="code-pane-header">
              <span>C++14 Source Code (Tự động cập nhật theo công tắc)</span>
              <span>Dòng màu cam = Đang thay đổi</span>
            </div>
            <pre class="code-pre"><code>${highlightedCode}</code></pre>
          </div>
          <div class="output-pane">
            <div class="output-tabs">
              <button class="out-tab ${activeTab === 'console' ? 'active' : ''}" data-tab-sb="${sb.id}" data-tab="console">🖥 Console (cmd / sh)</button>
              <button class="out-tab ${activeTab === 'inp' ? 'active' : ''}" data-tab-sb="${sb.id}" data-tab="inp">📄 File .inp</button>
              <button class="out-tab ${activeTab === 'out' ? 'active' : ''}" data-tab-sb="${sb.id}" data-tab="out">📄 File .out (Full)</button>
              <button class="out-tab ${activeTab === 'ans' ? 'active' : ''}" data-tab-sb="${sb.id}" data-tab="ans">📄 File .ans (Trâu)</button>
            </div>
            <div class="output-Status-banner ${built.statusOk ? 'ok' : 'bug'}">
              ${built.statusOk ? '✔ TRẠNG THÁI CHUẨN: ' : '⚠ PHÁT HIỆN VẤN ĐỀ: '}${built.statusText}
            </div>
            <div class="output-content">${escapeHtml(tabBody)}</div>
            <div class="output-explain"><strong>Giải thích cơ chế:</strong> ${built.explain}</div>
          </div>
        </div>
      </div>
    `;
  }

  function bindSandboxEvents(container) {
    container.querySelectorAll('.toggle-opt').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sbId = btn.getAttribute('data-sb');
        const key = btn.getAttribute('data-key');
        const val = btn.getAttribute('data-val');
        sandboxStates[sbId][key] = val;
        refreshSingleSandbox(sbId);
      });
    });

    container.querySelectorAll('[data-tab-sb]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sbId = btn.getAttribute('data-tab-sb');
        const tab = btn.getAttribute('data-tab');
        sandboxTabs[sbId] = tab;
        refreshSingleSandbox(sbId);
      });
    });

    container.querySelectorAll('[data-copy-sb]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const sbId = btn.getAttribute('data-copy-sb');
        const mod = MODULES_DATA[currentModIdx];
        const sb = mod.sandboxes.find((s) => s.id === sbId);
        if (!sb) return;
        const rawCode = sb.build(sandboxStates[sbId]).code;
        try {
          await navigator.clipboard.writeText(rawCode);
          showToast('Đã copy phiên bản code C++ hiện tại vào Clipboard!');
        } catch {
          showToast('Đã chọn code để copy!');
        }
      });
    });

    container.querySelectorAll('[data-run-sb]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sbId = btn.getAttribute('data-run-sb');
        sandboxTabs[sbId] = 'console';
        refreshSingleSandbox(sbId);
        showToast('Đã chạy mô phỏng và cập nhật Console + File .inp/.out/.ans!');
      });
    });
  }

  function refreshSingleSandbox(sbId) {
    const mod = MODULES_DATA[currentModIdx];
    const sb = mod.sandboxes.find((s) => s.id === sbId);
    const oldEl = document.getElementById(`sandbox-${sbId}`);
    if (!sb || !oldEl) return;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderSandboxHtml(sb);
    const newEl = wrapper.firstElementChild;
    oldEl.replaceWith(newEl);
    bindSandboxEvents(newEl);
  }

  function renderMainContent() {
    const mod = MODULES_DATA[currentModIdx];
    headerEl.innerHTML = `
      <div class="module-banner">
        <div class="module-kicker">${mod.number} — BÀI GIẢNG LẬP TRÌNH THI ĐẤU C++</div>
        <h1 class="module-h1">${mod.title}</h1>
        <p class="module-lead">${mod.lead}</p>
      </div>
    `;

    const sectionsHtml = mod.sections
      .map(
        (sec) => `
        <section class="section-block">
          <h2 class="section-heading"><span class="section-num">${sec.num}</span> ${sec.heading}</h2>
          ${sec.html}
        </section>
      `
      )
      .join('');

    const discussionsHtml = mod.discussions
      .map(
        (d) => `
        <div class="discussion-card">
          <div class="discussion-header">
            <span class="discussion-label">💬 Câu hỏi tương tác trên lớp (Hỏi học sinh trước khi bấm)</span>
            <button class="btn-reveal" data-reveal="${d.id}">👁 Hiện câu trả lời & Giải thích</button>
          </div>
          <div class="discussion-question">${d.question}</div>
          <div class="discussion-answer" id="ans-${d.id}">${d.answer}</div>
        </div>
      `
      )
      .join('');

    const sandboxesHtml = mod.sandboxes.map((sb) => renderSandboxHtml(sb)).join('');

    const { correctCount, total } = getModuleQuizScore(mod);
    const quizCardsHtml = mod.quiz
      .map((qItem, qIdx) => {
        const ansKey = `${mod.id}_${qIdx}`;
        const picked = quizAnswers[ansKey];
        const hasAnswered = picked !== undefined;

        const optsHtml = qItem.options
          .map((optText, oIdx) => {
            let cls = 'quiz-opt';
            if (hasAnswered) {
              if (oIdx === qItem.correct) cls += ' correct';
              else if (oIdx === picked) cls += ' wrong';
            }
            const letter = String.fromCharCode(65 + oIdx);
            return `
              <button class="${cls}" data-quiz-q="${qIdx}" data-quiz-opt="${oIdx}">
                <strong>${letter}.</strong> <span>${optText}</span>
              </button>
            `;
          })
          .join('');

        return `
          <div class="quiz-card">
            <div class="quiz-q">${qItem.q}</div>
            <div class="quiz-options">${optsHtml}</div>
            <div class="quiz-feedback ${hasAnswered ? 'visible' : ''}">
              ${
                hasAnswered
                  ? picked === qItem.correct
                    ? `<strong>✅ Chính xác!</strong> ${qItem.explain}`
                    : `<strong>❌ Chưa đúng.</strong> ${qItem.explain}`
                  : ''
              }
            </div>
          </div>
        `;
      })
      .join('');

    const quizSectionHtml = `
      <section class="quiz-section">
        <div class="quiz-header">
          <div>
            <div class="module-kicker">KIỂM TRA ĐỘ HIỂU BÀI</div>
            <h2>Trắc Nghiệm Chốt Kiến Thức ${mod.number}</h2>
          </div>
          <div class="env-pill">Đã trả lời đúng: <strong>${correctCount} / ${total}</strong> câu</div>
        </div>
        ${quizCardsHtml}
      </section>
    `;

    contentEl.innerHTML = sectionsHtml + discussionsHtml + sandboxesHtml + quizSectionHtml;

    // Gắn sự kiện nút hiện câu trả lời thảo luận
    contentEl.querySelectorAll('[data-reveal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const dId = btn.getAttribute('data-reveal');
        const ansEl = document.getElementById(`ans-${dId}`);
        if (!ansEl) return;
        const isOpen = ansEl.classList.toggle('open');
        btn.textContent = isOpen ? '🙈 Ẩn câu trả lời' : '👁 Hiện câu trả lời & Giải thích';
      });
    });

    // Gắn sự kiện Sandbox
    bindSandboxEvents(contentEl);

    // Gắn sự kiện chọn đáp án Quiz
    contentEl.querySelectorAll('[data-quiz-q]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qIdx = Number(btn.getAttribute('data-quiz-q'));
        const oIdx = Number(btn.getAttribute('data-quiz-opt'));
        quizAnswers[`${mod.id}_${qIdx}`] = oIdx;
        renderAll();
      });
    });

    // Render nút chuyển Module ở cuối trang
    const prevBtn =
      currentModIdx > 0
        ? `<button class="btn btn-copy" id="btn-prev-mod">← Quay lại ${MODULES_DATA[currentModIdx - 1].number}</button>`
        : `<span></span>`;
    const nextBtn =
      currentModIdx < MODULES_DATA.length - 1
        ? `<button class="btn btn-run" id="btn-next-mod">Tiếp tục sang ${MODULES_DATA[currentModIdx + 1].number}: ${MODULES_DATA[currentModIdx + 1].shortTitle} →</button>`
        : `<span class="env-pill">🎉 Bạn đã hoàn thành trọn vẹn 5 Module bài giảng!</span>`;

    footerEl.innerHTML = prevBtn + nextBtn;
    const prevEl = document.getElementById('btn-prev-mod');
    const nextEl = document.getElementById('btn-next-mod');
    if (prevEl) {
      prevEl.addEventListener('click', () => {
        currentModIdx--;
        renderAll();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    if (nextEl) {
      nextEl.addEventListener('click', () => {
        currentModIdx++;
        renderAll();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function renderAll() {
    renderNav();
    renderMainContent();
  }

  window.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.key >= '1' && e.key <= '5') {
      currentModIdx = Number(e.key) - 1;
      renderAll();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  renderAll();
})();
