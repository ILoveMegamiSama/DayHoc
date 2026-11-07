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
  // MODULE 1: NỀN TẢNG HỆ THỐNG: PHẦN CỨNG, OS, SHELL, PATH, COMPILER & PHÍM F9
  // ============================================================================
  {
    id: 'm1',
    number: 'Module 01',
    shortTitle: 'Phần Cứng, OS, PATH & F9',
    title: 'Nền Tảng Hệ Thống: Phần Cứng, OS, Shell, PATH, Compiler & Bản Chất Phím F9',
    lead: 'Hiểu tận gốc máy tính hoạt động như thế nào: Bit & Byte là gì, RAM (Bàn làm việc) vs Ổ cứng (Tủ hồ sơ), Hệ điều hành & Shell (cmd vs sh), bí mật biến môi trường PATH, dòng chảy từ Code C++ qua Trình biên dịch tạo file .exe, và chuyện gì thực sự xảy ra khi bạn bấm F9 trong Code::Blocks.',
    sections: [
      {
        num: '1.1',
        heading: 'Phần cứng cốt lõi: Bit, Byte, RAM (Bàn làm việc) và Ổ cứng (Tủ hồ sơ)',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Bit & Byte là gì? <span class="concept-tag">Đơn vị dữ liệu</span></h4>
              <p>Máy tính chỉ là những mạch điện bật/tắt:</p>
              <ul>
                <li><strong>1 Bit:</strong> Là 1 công tắc bóng đèn: <code>0</code> (tắt) hoặc <code>1</code> (bật).</li>
                <li><strong>1 Byte = 8 Bit:</strong> Là một ô giấy nhỏ chứa đúng <strong>1 ký tự</strong> (ví dụ: chữ cái <code>'A'</code>, số <code>'5'</code>, dấu cách <code>' '</code>, hoặc xuống dòng <code>'\\n'</code>).</li>
                <li>Khi mở file <code>BAI1.inp</code> thấy số <code>100</code>, đĩa cứng thực chất lưu 3 byte ký tự: <code>'1'</code>, <code>'0'</code>, <code>'0'</code>. File <strong>0 byte</strong> nghĩa là tờ giấy trắng tinh, chưa ghi ký tự nào!</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. RAM — "Bàn làm việc tốc độ cao" <span class="concept-tag">Bộ nhớ tạm</span></h4>
              <p>Mọi biến bạn khai báo trong C++ như <code>int n;</code>, <code>long long a[1000];</code> đều nằm trên <strong>RAM</strong>:</p>
              <ul>
                <li><strong>Tốc độ cực nhanh:</strong> CPU lấy dữ liệu trên bàn làm việc chỉ mất vài phần tỷ giây (nanosecond).</li>
                <li><strong>Mất sạch khi tắt:</strong> Tắt máy hoặc tắt chương trình là bàn làm việc bị xóa trắng.</li>
                <li><strong>Cách ly tuyệt đối:</strong> Hệ điều hành nhốt mỗi tiến trình trong một căn phòng riêng. <code>MAYCHAM.exe</code> và <code>BAI1.exe</code> <strong>không thể đọc trực tiếp biến trên RAM của nhau</strong>!</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>3. Ổ cứng (Disk) — "Tủ hồ sơ chung" <span class="concept-tag">Lưu trữ File</span></h4>
              <p>Các file mã nguồn <code>BAI1.cpp</code> và file dữ liệu <code>BAI1.inp</code>, <code>BAI1.out</code> nằm trên <strong>Ổ cứng (SSD/HDD)</strong>:</p>
              <ul>
                <li><strong>Lưu trữ bền vững:</strong> Tắt máy thì file vẫn nằm nguyên trong thư mục.</li>
                <li><strong>Cầu nối giao tiếp:</strong> Vì <code>MAYCHAM.exe</code> không thể truyền biến RAM cho <code>BAI1.exe</code>, nó bắt buộc phải ghi đề bài ra tờ giấy <code>BAI1.inp</code> cất vào Tủ hồ sơ (Ổ cứng) để <code>BAI1.exe</code> mở ra đọc!</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '1.2',
        heading: 'Hệ điều hành (OS) & Shell (Giao diện dòng lệnh CLI vs GUI)',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Hệ điều hành (OS) là ai? <span class="concept-tag">Người quản lý tối cao</span></h4>
              <p>Hệ điều hành (Windows, Linux, macOS) là người toàn quyền chỉ huy phần cứng máy tính: cấp phát RAM, quản lý các file trên ổ cứng, và điều phối CPU chạy chương trình nào trước, chương trình nào sau.</p>
            </div>
            <div class="concept-card">
              <h4>2. GUI vs Shell (CLI) <span class="concept-tag">Giao tiếp với OS</span></h4>
              <ul>
                <li><strong>GUI (Giao diện đồ họa):</strong> Người dùng dùng chuột bấm đúp vào icon, menu, cửa sổ.</li>
                <li><strong>Shell (Dòng lệnh CLI):</strong> Cổng giao tiếp bằng văn bản. Bạn gõ một câu lệnh chữ rồi bấm <code>Enter</code>, Shell nhận lệnh, chuyển cho OS thực thi và in kết quả ra màn hình.</li>
                <li>Trên <strong>Windows:</strong> Trợ lý dòng lệnh là <code>cmd.exe</code> (Command Prompt) hoặc PowerShell.</li>
                <li>Trên <strong>Linux:</strong> Trợ lý dòng lệnh là <code>sh</code>, <code>bash</code>, hoặc <code>zsh</code>.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>3. Vì sao coder phải hiểu Shell? <span class="concept-tag">Tự động hóa</span></h4>
              <p>Chương trình C++ <code>MAYCHAM.exe</code> <strong>không có bàn tay để cầm chuột click đúp</strong> vào <code>BAI1.exe</code>! Cách duy nhất để máy chấm gọi bài thi chạy là gửi lệnh dạng chữ cho Shell của hệ điều hành thông qua lệnh <code>system("BAI1.exe")</code>.</p>
            </div>
          </div>
        `
      },
      {
        num: '1.3',
        heading: 'Biến môi trường PATH — Sổ danh bạ tìm kiếm của Shell',
        html: `
          <div class="analogy-box">
            <strong>Câu đố thực tế:</strong> Tại sao khi mở cửa sổ đen <code>cmd</code>, bạn gõ lệnh <code>python</code> hoặc <code>fc</code> thì máy tính hiểu ngay, nhưng nếu gõ <code>g++</code> trên máy học sinh cài Code::Blocks thì lại báo lỗi: <code>'g++' is not recognized as an internal or external command</code>?
          </div>
          <div class="concept-grid">
            <div class="concept-card">
              <h4>Bước 1: Tìm tại "Thư mục hiện tại" <span class="concept-tag">Working Directory</span></h4>
              <p>Khi bạn gõ tên một chương trình (ví dụ <code>BAI1.exe</code>), Shell sẽ nhìn ngay vào <strong>thư mục bạn đang đứng</strong>.</p>
              <p>→ Vì vậy, nếu bạn để <code>MAYCHAM.cpp</code>, <code>BAI1.cpp</code>, <code>BAI1_TRAU.cpp</code> trong <strong>cùng 1 thư mục</strong>, các file <code>.exe</code> sinh ra sẽ nằm cạnh nhau và gọi thấy nhau ngay lập tức!</p>
            </div>
            <div class="concept-card">
              <h4>Bước 2: Lật sổ danh bạ hệ thống (<code>PATH</code>) <span class="concept-tag">System PATH</span></h4>
              <p>Nếu tìm ở thư mục hiện tại không thấy, Shell mới lật cuốn sổ danh bạ tên là <strong><code>PATH</code></strong> (chứa danh sách các thư mục hệ thống như <code>C:\\Windows\\System32</code>).</p>
              <ul>
                <li>Lệnh <code>fc.exe</code> (so file) nằm sẵn trong <code>System32</code> (đã có trong PATH) → gõ ở đâu cũng chạy!</li>
                <li>Ngược lại, khi cài <strong>Code::Blocks</strong>, trình biên dịch <code>g++.exe</code> nằm sâu trong <code>C:\\Program Files\\CodeBlocks\\MinGW\\bin</code> nhưng bộ cài <strong>không tự ghi địa chỉ này vào sổ tay <code>PATH</code></strong>! Vì thế cmd không tìm thấy <code>g++</code> nếu bạn chưa tự thêm vào PATH.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '1.4',
        heading: 'Trình biên dịch (Compiler) & Dòng chảy mã máy: Code C++ → File .exe (Windows) / Binary (Linux)',
        html: `
          <div class="diagram-box">[File Code .cpp] (Ký tự văn bản: int main()...)
       |
       v (Trình biên dịch g++ nhận lệnh, kiểm tra cú pháp, dịch sang mã máy 0 & 1)
[Bộ mã máy nhị phân CPU hiểu được]
       |
       +---> Trên Windows: Đóng gói định dạng PE -> File "BAI1.exe" (Hệ điều hành cấp RAM & chạy)
       +---> Trên Linux:   Đóng gói định dạng ELF -> File binary "./BAI1" (Có cờ chmod +x)</div>
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. CPU chỉ hiểu "Mã máy nhị phân" <span class="concept-tag">0 và 1</span></h4>
              <p>CPU là con chip điện tử, nó không biết đọc chữ <code>cout &lt;&lt; "Hello"</code>. CPU chỉ hiểu các dòng lệnh nhị phân thô gọi là <strong>Machine Code (Mã máy)</strong>.</p>
            </div>
            <div class="concept-card">
              <h4>2. Trình biên dịch (Compiler: g++) <span class="concept-tag">Người dịch thuật</span></h4>
              <p>Bản chất <code>g++.exe</code> là một chương trình dịch thuật: nó đọc file văn bản <code>.cpp</code>, phân tích cú pháp, tối ưu thuật toán (cờ <code>-O2</code>), và chuyển toàn bộ thành mã máy nhị phân.</p>
            </div>
            <div class="concept-card">
              <h4>3. Tại sao phải là file <code>.exe</code> trên Windows? <span class="concept-tag">Định dạng PE / ELF</span></h4>
              <p>Hệ điều hành cần biết: Chương trình này cần bao nhiêu RAM? Bắt đầu chạy từ dòng byte nào? Vì vậy:</p>
              <ul>
                <li><strong>Windows:</strong> Đóng gói theo chuẩn <strong>PE (Portable Executable)</strong> có đuôi <code>.exe</code>. Windows nhìn đuôi <code>.exe</code> và cấu trúc PE để nạp mã máy vào RAM cho CPU chạy.</li>
                <li><strong>Linux:</strong> Đóng gói theo chuẩn <strong>ELF</strong>, không cần đuôi mở rộng, kèm cờ quyền thực thi (executable permission).</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '1.5',
        heading: 'Giải mã phím F9 (Build & Run) trong Code::Blocks — Sau cánh gà IDE làm gì?',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>Bản chất của Code::Blocks <span class="concept-tag">IDE là gì?</span></h4>
              <p><strong>Code::Blocks không phải là trình biên dịch!</strong> Code::Blocks chỉ là một trình soạn thảo văn bản thông minh (Editor) tích hợp nút bấm để gọi ngầm trình biên dịch <code>g++.exe</code>.</p>
            </div>
            <div class="concept-card">
              <h4>3 bước bí mật khi bấm F9 (Build and Run) <span class="concept-tag">Quy trình F9</span></h4>
              <ol>
                <li><strong>Bước 1 (Lưu file):</strong> Ghi những dòng chữ bạn vừa gõ trên RAM xuống file <code>BAI1.cpp</code> trên ổ cứng.</li>
                <li><strong>Bước 2 (Biên dịch):</strong> Gọi ngầm lệnh: <code>g++ -Wall -O2 BAI1.cpp -o BAI1.exe</code> để dịch ra file <code>BAI1.exe</code> mới nhất.</li>
                <li><strong>Bước 3 (Thực thi):</strong> Ra lệnh cho OS mở một cửa sổ console <code>cmd.exe</code> và chạy <code>BAI1.exe</code> vừa tạo.</li>
              </ol>
            </div>
            <div class="concept-card">
              <h4>Cảnh báo lỗi kinh điển khi chấm Stress Test! <span class="concept-tag">Quên F9</span></h4>
              <p>Nếu bạn sửa thuật toán trong <code>BAI1.cpp</code> nhưng <strong>quên bấm Build lại (F9)</strong> mà chạy luôn <code>MAYCHAM.exe</code>, Hệ điều hành vẫn sẽ nạp file <strong><code>BAI1.exe</code> cũ từ 10 phút trước</strong> lên RAM để chạy! Kết quả chấm sẽ hoàn toàn sai lệch so với code bạn đang nhìn trên màn hình.</p>
            </div>
          </div>
        `
      }
    ],
    discussions: [
      {
        id: 'd1_1',
        question: 'Câu hỏi thảo luận 1: Tại sao trong cửa sổ cmd trên Windows, ta gõ lệnh fc thì máy chạy được ngay ở bất kỳ thư mục nào, nhưng gõ g++ trên máy vừa cài Code::Blocks lại có thể báo lỗi "\'g++\' is not recognized"?',
        answer: 'Vì lệnh <code>fc.exe</code> nằm sẵn trong thư mục hệ thống <code>C:\\Windows\\System32</code> (đã được Windows ghi sẵn vào sổ tay danh bạ <code>PATH</code>). Còn khi bạn cài Code::Blocks, file <code>g++.exe</code> nằm sâu trong <code>C:\\Program Files\\CodeBlocks\\MinGW\\bin</code> nhưng bộ cài mặc định <strong>không tự thêm địa chỉ này vào biến PATH</strong> của Windows! Shell tra danh bạ không thấy nên báo lỗi.'
      },
      {
        id: 'd1_2',
        question: 'Câu hỏi thảo luận 2: Một bạn sửa code trong BAI1.cpp từ thuật toán O(N^2) sang O(N), bấm Save (Ctrl+S) rồi mở MAYCHAM.exe lên chạy luôn. Hỏi máy chấm sẽ chạy thuật toán nào của BAI1?',
        answer: 'Máy chấm vẫn chạy <strong>thuật toán cũ O(N^2)</strong>! Vì bạn mới chỉ lưu file chữ <code>BAI1.cpp</code> trên ổ cứng, chưa bấm <strong>Build (F9)</strong> để trình biên dịch <code>g++</code> dịch lại thành file mã máy <code>BAI1.exe</code> mới. File <code>BAI1.exe</code> trên ổ cứng vẫn là phiên bản cũ từ lần bấm F9 trước đó!'
      }
    ],
    sandboxes: [
      {
        id: 'sb1_1',
        title: 'Phòng thí nghiệm 1: Dòng chảy từ Code C++ → Biên dịch g++ → File .exe & Giải mã phím F9',
        desc: 'Thử nghiệm sự khác biệt giữa bấm F9 biên dịch, quên bấm F9 (chạy file .exe cũ còn sót), và gọi trực tiếp g++ từ dòng lệnh Shell.',
        toggles: [
          {
            key: 'action',
            label: '1. Thao tác của Lập trình viên',
            options: [
              { value: 'f9', text: 'Bấm F9: Biên dịch và chạy file .exe mới nhất (Chuẩn)', kind: 'ok' },
              { value: 'no_build', text: 'Sửa code nhưng quên F9: Chạy file .exe cũ còn sót (Lỗi)', kind: 'bug' },
              { value: 'cli', text: 'Dòng lệnh CLI: Gõ trực tiếp g++ trong Shell', kind: 'ok' }
            ]
          },
          {
            key: 'env',
            label: '2. Môi trường Hệ điều hành',
            options: [
              { value: 'win', text: 'Windows (Code::Blocks + cmd.exe + BAI1.exe)' },
              { value: 'linux', text: 'Linux (Arch Linux + sh/bash + ./BAI1)' }
            ]
          }
        ],
        build(state) {
          const act = state.action;
          const isWin = state.env === 'win';
          const exeName = isWin ? 'BAI1.exe' : 'BAI1';
          const runCmd = isWin ? 'BAI1.exe' : './BAI1';

          let code = `#include <iostream>
using namespace std;

#define NAME "BAI1"

int main() {
    // Flow: Code C++ -> Biên dịch g++ -> File thực thi (.exe / binary)
    long long n = 10;
    cout << "Chay thanh cong bai toan: " << NAME << "\\n";
    cout << "Du lieu thu nghiem N = " << n << "\\n";
    return 0;
}`;

          if (act === 'f9') {
            return {
              code,
              changedLines: [7, 8, 9],
              statusOk: true,
              statusText: 'CHUẨN: Đã bấm F9 Build & Run, tạo file ' + exeName + ' mới nhất từ code .cpp hiện tại!',
              console: isWin
                ? `-------------- Build: Debug in BAI1 (compiler: GNU GCC Compiler)---------------
g++.exe -Wall -O2 -c D:\\Code\\BAI1.cpp -o obj\\Debug\\BAI1.o
g++.exe -o bin\\Debug\\BAI1.exe obj\\Debug\\BAI1.o
Output file is bin\\Debug\\BAI1.exe with size 78.42 KB
Process terminated with status 0 (0 minute(s), 0 second(s))
0 error(s), 0 warning(s)

Chay thanh cong bai toan: BAI1
Du lieu thu nghiem N = 10

Process returned 0 (0x0)   execution time : 0.015 s
Press any key to continue.`
                : `$ g++ -O2 BAI1.cpp -o BAI1
$ ./BAI1
Chay thanh cong bai toan: BAI1
Du lieu thu nghiem N = 10`,
              files: {
                inp: `BAI1.cpp: Cập nhật lúc 15:30 (Khớp 100% với file thực thi)`,
                out: `${exeName}: Tạo mới lúc 15:30 (Mã máy nhị phân mới nhất)`,
                ans: isWin ? 'Định dạng PE (Windows x64)' : 'Định dạng ELF (Linux x86_64)'
              }
            };
          } else if (act === 'no_build') {
            return {
              code,
              changedLines: [8],
              statusOk: false,
              statusText: 'LỖI QUÊN BẤM F9: Sửa code .cpp nhưng không biên dịch, máy tính vẫn chạy file ' + exeName + ' cũ từ lần chạy trước!',
              console: `[CẢNH BÁO: Code BAI1.cpp vừa sửa lúc 15:30 nhưng KHÔNG bấm Build F9!]
Hệ điều hành vẫn nạp file ${exeName} cũ (tạo lúc 15:15) từ ổ cứng lên RAM để chạy!
Chay thanh cong bai toan: BAI1 (Phien ban cu!)
Du lieu thu nghiem N = 5  <-- KẾT QUẢ CỦA CODE CŨ (chưa có dòng N = 10)!`,
              files: {
                inp: `BAI1.cpp: Cập nhật lúc 15:30 (Chứa N = 10)`,
                out: `${exeName}: Tạo từ lúc 15:15 (Vẫn là mã máy cũ chứa N = 5!)`,
                ans: 'CẢNH BÁO: File thực thi không khớp với mã nguồn C++ hiện tại!'
              }
            };
          } else {
            return {
              code,
              changedLines: [1, 2, 3],
              statusOk: true,
              statusText: 'DÒNG LỆNH CLI: Biên dịch thủ công qua Shell ' + (isWin ? 'cmd.exe' : 'bash'),
              console: isWin
                ? `C:\\ThiHSG\\BAI1> g++ -O2 BAI1.cpp -o BAI1.exe
C:\\ThiHSG\\BAI1> BAI1.exe
Chay thanh cong bai toan: BAI1
Du lieu thu nghiem N = 10
C:\\ThiHSG\\BAI1>`
                : `$ g++ -O2 BAI1.cpp -o BAI1
$ ./BAI1
Chay thanh cong bai toan: BAI1
Du lieu thu nghiem N = 10`,
              files: {
                inp: `BAI1.cpp: Đọc trực tiếp bởi trình biên dịch g++`,
                out: `${exeName}: Tạo thành công trong cùng thư mục làm việc`,
                ans: `Lệnh gọi: ${runCmd}`
              }
            };
          }
        }
      }
    ],
    quiz: [
      {
        q: '1. Tại sao hai chương trình MAYCHAM.exe và BAI1.exe không thể trực tiếp đọc biến trong RAM của nhau mà phải trao đổi qua file trên ổ cứng?',
        options: [
          'Vì RAM của máy tính quá nhỏ không đủ chỗ chứa 2 chương trình cùng lúc',
          'Vì Hệ điều hành cách ly bộ nhớ RAM của mỗi tiến trình để đảm bảo an toàn, chương trình này không được tự tiện truy cập vùng nhớ của chương trình khác',
          'Vì biến trong C++ chỉ tồn tại khi được ghi xuống ổ cứng',
          'Vì CPU chỉ cho phép một chương trình được dùng RAM trong một ngày'
        ],
        correct: 1,
        explain: 'Hệ điều hành áp dụng cơ chế bảo vệ bộ nhớ ảo (Virtual Memory Isolation): mỗi tiến trình được cấp một không gian địa chỉ riêng biệt và không thể can thiệp vào RAM của tiến trình khác. Vì thế chúng phải giao tiếp qua các file trên ổ cứng (.inp, .out).'
      },
      {
        q: '2. Khi bạn mở cửa sổ cmd trên Windows và gõ một lệnh, Shell sẽ tìm kiếm file thực thi theo thứ tự nào?',
        options: [
          'Tìm trên mạng Internet trước, sau đó tìm trong thùng rác',
          'Tìm trong thư mục hiện tại trước; nếu không thấy mới tra cứu danh sách thư mục trong biến môi trường PATH',
          'Tìm trong biến PATH trước, nếu không thấy thì không bao giờ tìm ở thư mục hiện tại',
          'Chỉ tìm kiếm trong ổ đĩa C:\\'
        ],
        correct: 1,
        explain: 'Trên Windows, cmd.exe trước hết kiểm tra xem file có nằm ngay trong thư mục đang đứng (Working Directory) hay không. Nếu không có, nó mới tra cứu trong biến môi trường PATH.'
      },
      {
        q: '3. Bản chất của file có đuôi .exe trên hệ điều hành Windows là gì?',
        options: [
          'Là file văn bản chứa nguyên văn mã nguồn C++ mà bạn đã viết',
          'Là file nén ZIP chứa các hình ảnh của phần mềm',
          'Là file nhị phân đóng gói theo định dạng PE (Portable Executable) chứa mã máy mà CPU có thể thực thi trực tiếp khi được OS nạp vào RAM',
          'Là một tập lệnh chỉ chạy được khi có phần mềm Code::Blocks đang mở'
        ],
        correct: 2,
        explain: 'File .exe là file nhị phân theo định dạng PE (Portable Executable). Nó chứa mã máy (Machine code) và các thông tin cần thiết để Windows nạp vào RAM và chỉ định CPU bắt đầu thực thi.'
      },
      {
        q: '4. Khi lập trình trên Code::Blocks, điều gì thực sự xảy ra đằng sau hậu trường khi bạn nhấn phím F9 (Build and Run)?',
        options: [
          'Code::Blocks tự biến thành hệ điều hành để chạy trực tiếp từng dòng code C++',
          'Code::Blocks gửi code lên máy chủ của Google để chấm điểm',
          'Code::Blocks lưu file .cpp, gọi ngầm trình biên dịch g++ dịch mã sang file .exe, rồi ra lệnh cho OS mở console chạy file .exe đó',
          'Code::Blocks chỉ mở file .cpp dưới dạng xem trước mà không làm gì khác'
        ],
        correct: 2,
        explain: 'Code::Blocks là một IDE (Môi trường phát triển tích hợp). Khi bấm F9, nó lưu file, gọi g++ biên dịch mã nguồn thành file thực thi .exe, và gọi OS khởi chạy file .exe trong cửa sổ console.'
      }
    ]
  },

  // ============================================================================
  // MODULE 2: BẢN CHẤT CƠ CHẾ LUỒNG (STREAM), BUFFER & 3 CƠ CHẾ NHẬP XUẤT C++
  // ============================================================================
  {
    id: 'm2',
    number: 'Module 02',
    shortTitle: 'Cơ Chế Luồng & Nhập Xuất File',
    title: 'Bản Chất Cơ Chế Luồng (Stream), Buffer & 3 Cơ Chế Nhập Xuất C++',
    lead: 'Hiểu từ gốc dòng chảy dữ liệu: Luồng (Stream) là gì, cơ chế Buffer ("Chiếc xe tải gom hàng"), giải phẫu từ gốc lệnh ofstream (o-f-stream), phân biệt cin/cout vs freopen vs ofstream, và tại sao quên .close() lại sinh ra file rỗng 0 byte.',
    sections: [
      {
        num: '2.1',
        heading: 'Cơ chế Luồng (Stream) trong C++: Mô hình đường ống nước dữ liệu',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Khái niệm "Luồng" (Stream) <span class="concept-tag">Đường ống nước</span></h4>
              <p>Trong C++, dữ liệu không bay nhảy tự do. Nó chảy tuần tự qua các <strong>"Đường ống dẫn dữ liệu" (gọi là Stream)</strong> kết nối giữa bộ nhớ RAM và thế giới bên ngoài:</p>
              <ul>
                <li><strong><code>cin</code> (Standard Input):</strong> Đường ống hút nước từ Bàn phím vào các biến trên RAM thông qua toán tử <code>&gt;&gt;</code>.</li>
                <li><strong><code>cout</code> (Standard Output):</strong> Đường ống bơm nước từ RAM ra Màn hình console thông qua toán tử <code>&lt;&lt;</code>.</li>
                <li><strong><code>ifstream</code> & <code>ofstream</code>:</strong> Các đường ống chuyên dụng nối thẳng giữa RAM và file trên Ổ cứng.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. Cơ chế Buffer ("Thùng chứa tạm / Xe tải gom hàng") <span class="concept-tag">Tối ưu tốc độ</span></h4>
              <p>Mỗi lần chọc xuống ổ cứng ghi dữ liệu tốn hàng triệu chu kỳ CPU. Vì vậy, C++ đặt một <strong>thùng chứa tạm trên RAM gọi là Buffer</strong> ở miệng mỗi luồng:</p>
              <ul>
                <li>Khi viết <code>inp &lt;&lt; n &lt;&lt; "\\n";</code>, dữ liệu <strong>chưa nằm trên ổ cứng ngay!</strong> Nó đang nằm trong thùng xe tải Buffer trên RAM.</li>
                <li>Xe tải chỉ chạy xuống ổ cứng xả hàng khi: (1) Thùng đầy, (2) Chương trình kết thúc, hoặc (3) Bạn chủ động đóng van bằng <strong><code>inp.close()</code></strong>!</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>3. Hậu quả khi quên <code>inp.close()</code> trong Máy Chấm <span class="concept-tag">Lỗi kẹt Buffer</span></h4>
              <p>Trong máy chấm, sau khi sinh test xong ta gọi ngay <code>system("BAI1.exe")</code>. Nếu quên <code>inp.close()</code>, dữ liệu test vẫn nằm kẹt trên Buffer RAM của <code>MAYCHAM.exe</code>. Khi <code>BAI1.exe</code> mở file ra đọc sẽ thấy một <strong>file 0 byte (trắng tinh)</strong> và chạy ra kết quả rác!</p>
            </div>
          </div>
        `
      },
      {
        num: '2.2',
        heading: 'Giải nghĩa cú pháp & Ý nghĩa từ gốc lệnh ofstream (o-f-stream)',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Ý nghĩa từng chữ trong <code>ofstream</code> <span class="concept-tag">Mnemonic</span></h4>
              <ul>
                <li><code>o</code> = <strong>Output</strong> (Xuất dữ liệu từ RAM ra ngoài).</li>
                <li><code>f</code> = <strong>File</strong> (Tệp tin trên đĩa cứng).</li>
                <li><code>stream</code> = <strong>Stream</strong> (Luồng dữ liệu / Đường ống).</li>
                <li>→ <strong><code>ofstream</code> = "Luồng xuất dữ liệu vào tệp tin"</strong>.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. Cú pháp khai báo & Ghi dữ liệu <span class="concept-tag">Cú pháp chuẩn</span></h4>
              <ul>
                <li><code>ofstream inp("BAI1.inp");</code>: Mở một đường ống mới cắm vào file <code>BAI1.inp</code>, đặt tên đường ống là <code>inp</code>.</li>
                <li><code>inp &lt;&lt; n &lt;&lt; "\\n";</code>: Đẩy dữ liệu vào đường ống <code>inp</code> (y hệt như cách dùng <code>cout &lt;&lt;</code>).</li>
                <li><code>inp.close();</code>: Đóng van đường ống, ép trút cạn sạch Buffer xuống đĩa cứng và trả lại file cho hệ điều hành.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>3. Tương ứng: <code>ifstream</code> <span class="concept-tag">Input File Stream</span></h4>
              <ul>
                <li><code>i</code> = <strong>Input</strong> (Hút dữ liệu từ ngoài vào RAM).</li>
                <li><code>f</code> = <strong>File</strong> (Tệp tin).</li>
                <li><code>ifstream doc("BAI1.inp");</code>: Luồng đọc dữ liệu từ file vào biến (dùng toán tử <code>doc &gt;&gt; a[i];</code>).</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '2.3',
        heading: 'So sánh bản chất 3 cơ chế Nhập Xuất trong C++',
        html: `
          <div class="diagram-box">[Bàn phím (stdin)] ----> cin                 cout ----> [Màn hình đen (stdout)]
                          |                    |
        (Nếu gọi freopen: Bẻ cứng ống dẫn của cin/cout cắm thẳng vào File!)
                          v                    v
                    [BAI1.inp]            [BAI1.out]

        (Nếu dùng ifstream / ofstream: Tạo ống dẫn RIÊNG, giữ nguyên cin/cout cho màn hình!)
        ofstream inp("BAI1.inp") ----> [BAI1.inp]   (còn cout vẫn in ra Màn hình đen!)</div>
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
                <td>Đọc từ bàn phím (<code>stdin</code>), in ra màn hình console (<code>stdout</code>).</td>
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
                <td>Sinh 100 test trong vòng lặp: mở file <code>.inp</code> → ghi test → gọi <code>inp.close()</code> để xả Buffer ngay, mà không làm hỏng <code>cout</code> của màn hình!</td>
              </tr>
            </tbody>
          </table>
        `
      }
    ],
    discussions: [
      {
        id: 'd2_1',
        question: 'Câu hỏi thảo luận 1: Tại sao trong hàm generate() của Máy Chấm, nếu ta dùng freopen("BAI1.inp", "w", stdout) rồi dùng cout để in đề bài, thì khi chạy Máy Chấm màn hình đen lại tối thui không hiện dòng "Test 1: CORRECT!" nào?',
        answer: 'Vì <code>freopen(..., "w", stdout)</code> đã bẻ vĩnh viễn ống dẫn <code>stdout</code> (vốn nối với màn hình đen) cắm thẳng vào file <code>BAI1.inp</code>! Từ giây phút đó trở đi, mọi lệnh <code>cout &lt;&lt; "Test 1: CORRECT!"</code> ở hàm <code>compare()</code> đều bị ghi đè thẳng vào trong file <code>BAI1.inp</code> chứ không còn đường nào ra màn hình nữa!'
      },
      {
        id: 'd2_2',
        question: 'Câu hỏi thảo luận 2: Chuyện gì xảy ra nếu bạn mở ofstream inp("BAI1.inp") ở ngoài hàm main(), ghi dữ liệu xong mà KHÔNG gọi inp.close(), rồi gọi ngay system("BAI1.exe")?',
        answer: 'Do dữ liệu sinh ra ít (chỉ vài chục byte), nó vẫn đang nằm chờ trên "chiếc xe tải Buffer" ở trong RAM của <code>MAYCHAM.exe</code> chứ chưa được đổ xuống ổ cứng. Khi <code>BAI1.exe</code> mở <code>BAI1.inp</code> trên ổ cứng ra đọc, nó sẽ thấy một <strong>file trắng trơn (0 byte)</strong> và chạy ra kết quả rác!'
      }
    ],
    sandboxes: [
      {
        id: 'sb2_1',
        title: 'Phòng thí nghiệm 2: Cơ chế Buffer (.close()) & Sự khác biệt giữa ofstream và freopen',
        desc: 'Hãy thử gạt công tắc để xem điều gì xảy ra với Màn hình Console và bên trong file BAI1.inp khi chạy Máy Chấm.',
        toggles: [
          {
            key: 'streamMode',
            label: '1. Cách ghi file BAI1.inp',
            options: [
              { value: 'ofstream', text: 'Dùng ofstream inp (Chuẩn)', kind: 'ok' },
              { value: 'freopen', text: 'Dùng freopen stdout (Lỗi bẻ mất console)', kind: 'bug' }
            ]
          },
          {
            key: 'closeMode',
            label: '2. Lệnh đóng luồng cuối generate()',
            options: [
              { value: 'closed', text: 'Có gọi inp.close() (Chuẩn xả Buffer)', kind: 'ok' },
              { value: 'unclosed', text: 'Quên inp.close() (Lỗi kẹt Buffer 0 byte)', kind: 'bug' }
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
              statusText: 'LỖI NGHIÊM TRỌNG: Màn hình console bị câm hoàn toàn vì freopen đã bẻ stdout cắm vào file!',
              console: `(Màn hình Console đen ngòm hoàn toàn, không hiện bất kỳ chữ "CORRECT" nào!)
Lý do: Lệnh freopen("BAI1.inp", "w", stdout) đã cướp mất màn hình console. Toàn bộ chữ in ra bị ghi đè vào file .inp!`,
              files: {
                inp: `5\n2 -1 4 -3 5\nTest 2: CORRECT!\n`,
                out: `7\n`,
                ans: `7\n`
              }
            };
          }

          if (noClose) {
            return {
              code,
              changedLines: changed,
              statusOk: false,
              statusText: 'LỖI KẸT BUFFER: Quên inp.close(), file .inp trên ổ cứng bị 0 byte!',
              console: `Test 1: WRONG! (BAI1.exe đọc phải file rỗng vì Buffer chưa xả xuống ổ cứng!)\nTest 2: WRONG!`,
              files: {
                inp: `(FILE TRẮNG 0 BYTE - Dữ liệu vẫn còn kẹt trong RAM của MAYCHAM!)`,
                out: `0 (Kết quả rác do không đọc được N)\n`,
                ans: `7\n`
              }
            };
          }

          return {
            code,
            changedLines: [],
            statusOk: true,
            statusText: 'CHUẨN: Dùng ofstream và có inp.close(), Buffer được xả ngay xuống ổ cứng!',
            console: `Comparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 1: CORRECT!\nComparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 2: CORRECT!`,
            files: {
              inp: `5\n2 -1 4 -3 5\n`,
              out: `7\n`,
              ans: `7\n`
            }
          };
        }
      }
    ],
    quiz: [
      {
        q: '1. Từ "ofstream" trong C++ được viết tắt từ cụm từ tiếng Anh nào?',
        options: [
          'Offline Format Stream (Luồng định dạng ngoại tuyến)',
          'Output File Stream (Luồng xuất dữ liệu vào tệp tin)',
          'Open Fast Stream (Mở luồng tốc độ cao)',
          'Operating File System (Hệ thống tệp tin điều hành)'
        ],
        correct: 1,
        explain: 'ofstream là viết tắt của Output File Stream (o = Output, f = File, stream = Luồng dữ liệu), chuyên dùng để ghi dữ liệu từ RAM xuống file trên ổ cứng.'
      },
      {
        q: '2. Cơ chế Buffer (Bộ đệm) của luồng dữ liệu trong C++ được tạo ra nhằm mục đích gì?',
        options: [
          'Để làm chậm chương trình giúp học sinh dễ đọc code',
          'Để gom dữ liệu tạm thời trên RAM tốc độ cao trước khi ghi một mẻ lớn xuống ổ cứng, giúp giảm tải số lần truy xuất đĩa đắt đỏ',
          'Để mã hóa dữ liệu tránh bị hacker đọc trộm',
          'Để tự động sửa lỗi tràn số kiểu int'
        ],
        correct: 1,
        explain: 'Truy xuất ổ cứng chậm hơn RAM hàng nghìn lần. Buffer gom dữ liệu thành một lô (batch) trên RAM rồi mới ghi xuống ổ cứng một lần khi đầy hoặc khi gặp lệnh close().'
      },
      {
        q: '3. Tại sao trong hàm sinh test generate() của Máy Chấm, ta KHÔNG NÊN dùng freopen("BAI1.inp", "w", stdout) mà nên dùng ofstream inp("BAI1.inp")?',
        options: [
          'Vì freopen chạy chậm hơn ofstream 10 lần',
          'Vì freopen sẽ bẻ vĩnh viễn luồng stdout ra file .inp, khiến các thông báo "Test: CORRECT" in bằng cout sau đó bị ghi đè vào file .inp thay vì hiện lên màn hình',
          'Vì Code::Blocks cấm hoàn toàn lệnh freopen',
          'Vì freopen chỉ dùng được trên hệ điều hành Linux'
        ],
        correct: 1,
        explain: 'freopen bẻ hướng toàn cục luồng stdout của hệ thống. Nếu bẻ vào .inp thì toàn bộ thông báo in ra màn hình bằng cout sau đó cũng bị ghi tọt vào file .inp, làm hỏng cả màn hình lẫn file test!'
      },
      {
        q: '4. Lệnh inp.close() của đối tượng ofstream có tác dụng gì quan trọng nhất?',
        options: [
          'Xóa vĩnh viễn file trên ổ cứng',
          'Đóng đường ống, ép xả sạch mọi dữ liệu còn sót lại trên Buffer xuống đĩa cứng và trả lại file cho OS để tiến trình khác vào đọc ngay',
          'Đổi tên file thành .bak',
          'Tắt màn hình máy tính để tiết kiệm pin'
        ],
        correct: 1,
        explain: 'inp.close() khóa van luồng dữ liệu, ép trút toàn bộ dữ liệu đang gom trong Buffer trên RAM xuống ổ cứng, đảm bảo file trên ổ cứng có đầy đủ dữ liệu ngay trước khi chương trình khác vào đọc.'
      }
    ]
  },

  // ============================================================================
  // MODULE 3: LỆNH HỆ THỐNG system(), SHELL CON, MÃ THOÁT & SO FILE fc /w
  // ============================================================================
  {
    id: 'm3',
    number: 'Module 03',
    shortTitle: 'Lệnh Hệ Thống & So File',
    title: 'Lệnh Hệ Thống system(), Shell Con, Mã Thoát & So File fc /w',
    lead: 'Điều khiển tiến trình từ C++: Bản chất hàm system() là nhờ OS mở Shell con, quy ước mã thoát 0 vs khác 0, giải phẫu lệnh so file fc /w (Windows) vs diff -w (Linux), và kỹ thuật exit(0) giữ nguyên hiện trường test sai.',
    sections: [
      {
        num: '3.1',
        heading: 'Hàm system() trong C++: Cầu nối ra lệnh cho Hệ điều hành',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. system() hoạt động như thế nào? <span class="concept-tag">Nhờ Shell con</span></h4>
              <p>Chương trình C++ không thể tự ý tạo tiến trình mới. Khi bạn viết <code>system("BAI1.exe");</code>:</p>
              <ol>
                <li>Chương trình <code>MAYCHAM.exe</code> tạm dừng lại.</li>
                <li>Hệ điều hành mở một <strong>Shell con ngầm (cmd.exe hoặc sh)</strong>.</li>
                <li>Shell con thực thi lệnh <code>BAI1.exe</code>, đợi nó chạy xong.</li>
                <li>Shell con đóng lại và gửi trả lại <strong>Mã thoát (Exit Code)</strong> cho C++ tiếp tục chạy.</li>
              </ol>
            </div>
            <div class="concept-card">
              <h4>2. Khác biệt cú pháp giữa Windows và Linux <span class="concept-tag">Môi trường</span></h4>
              <ul>
                <li><strong>Windows (Học sinh):</strong> Gọi <code>system("BAI1.exe");</code> (cmd tự tìm ở thư mục hiện tại). Lệnh so file là <code>fc /w BAI1.out BAI1.ans</code>.</li>
                <li><strong>Linux (Giáo viên / Online Judge):</strong> Phải có <code>./</code> ở đầu: <code>system("./BAI1");</code>. Lệnh so file là <code>diff -w BAI1.out BAI1.ans</code>.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '3.2',
        heading: 'Quy ước Mã thoát (Exit Code): 0 = Giống nhau, != 0 = Phát hiện khác biệt',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Quy ước quốc tế của Hệ điều hành <span class="concept-tag">Exit Code</span></h4>
              <p>Mọi chương trình khi kết thúc đều trả về một con số nguyên cho OS:</p>
              <ul>
                <li>Trả về <strong><code>0</code></strong>: Hoàn thành êm đẹp, không gặp lỗi nào.</li>
                <li>Trả về <strong><code>!= 0</code></strong> (khác 0): Báo hiệu có lỗi hoặc gặp điều kiện bất thường.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. Lệnh so file <code>fc</code> và <code>diff</code> trả về gì? <span class="concept-tag">Quy ước so sánh</span></h4>
              <ul>
                <li>Nếu 2 file <strong>GIỐNG HỆT NHAU</strong>: Lệnh trả về <strong><code>0</code></strong> (Số lỗi = 0 → Test ĐÚNG!).</li>
                <li>Nếu 2 file <strong>CÓ KHÁC BIỆT</strong>: Lệnh trả về <strong><code>!= 0</code></strong> (Phát hiện lỗi → Test SAI!).</li>
                <li>→ Vì vậy điều kiện bắt test sai trong C++ là: <code>if (system("fc /w BAI1.out BAI1.ans") != 0)</code>!</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '3.3',
        heading: 'Giải phẫu lệnh fc /w, cờ whitespace và Tuyệt chiêu exit(0) giữ hiện trường',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Tại sao phải có cờ <code>/w</code> trong <code>fc /w</code>? <span class="concept-tag">White space</span></h4>
              <p>Trong thi đấu, in <code>"10 "</code> (dư 1 dấu cách cuối) hay <code>"10\\r\\n"</code> (xuống dòng Windows) đều được tính là <strong>Accepted</strong>.</p>
              <ul>
                <li>Nếu không có <code>/w</code>: <code>fc</code> soi từng byte một và báo <strong>SAI OAN</strong>!</li>
                <li>Khi thêm <code>/w</code>: Tự động bỏ qua khoảng trắng thừa đầu/cuối dòng và gộp nhiều dấu cách liên tiếp.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. Tuyệt chiêu <code>exit(0)</code> trong <code>void compare()</code> <span class="concept-tag">Giữ hiện trường</span></h4>
              <p>Khi tách hàm con <code>void compare()</code>:</p>
              <ul>
                <li>Nếu gặp test sai, <code>fc /w</code> tự in đoạn khác nhau (<code>***** BAI1.out ... ***** BAI1.ANS ...</code>) lên console.</li>
                <li>Ngay sau đó, ta gọi <strong><code>exit(0);</code></strong> để <strong>dừng toàn bộ chương trình ngay lập tức</strong>!</li>
                <li>Console dừng lại ngay tại chỗ sai để học sinh nhìn thấy ngay đáp án lệch nhau, và file <code>BAI1.inp</code> gây lỗi được bảo toàn nguyên vẹn trên đĩa, không bị vòng lặp sau ghi đè!</li>
              </ul>
            </div>
          </div>
        `
      }
    ],
    discussions: [
      {
        id: 'd3_1',
        question: 'Câu hỏi thảo luận 1: Một bạn viết hàm void compare() như sau: if (system("fc /w BAI1.out BAI1.ans") != 0) { cout << "WRONG!\\n"; return; }. Hỏi điều gì sẽ xảy ra khi máy chấm gặp test sai ở Test 3?',
        answer: 'Vì hàm <code>compare()</code> trả về <code>void</code>, lệnh <code>return;</code> chỉ thoát khỏi hàm con rồi vòng lặp <code>for</code> trong <code>main()</code> lại <strong>chạy tiếp Test 4, Test 5...</strong> Hậu quả là file <code>BAI1.inp</code> làm sai ở Test 3 bị Test 4 ghi đè mất tích luôn! Bắt buộc phải dùng <strong><code>exit(0);</code></strong> mới dừng hẳn toàn bộ chương trình ngay tại Test 3.'
      },
      {
        id: 'd3_2',
        question: 'Câu hỏi thảo luận 2: Tại sao khi so sánh kết quả ta luôn luôn phải thêm cờ /w (trên Windows) hoặc -w (trên Linux)?',
        answer: 'Vì cờ <code>/w</code> (compress white space) hướng dẫn lệnh so sánh bỏ qua các khoảng trắng thừa ở đầu/cuối dòng và không phân biệt ký tự xuống dòng Windows (<code>\\r\\n</code>) với Linux (<code>\\n</code>). Nếu không có cờ này, chỉ cần code Trâu in dư một dấu cách cuối dòng là máy chấm báo sai oan dù đáp số đúng.'
      }
    ],
    sandboxes: [
      {
        id: 'sb3_1',
        title: 'Phòng thí nghiệm 3: Lệnh so file fc /w, cờ whitespace và Cơ chế dừng exit(0)',
        desc: 'Thử nghiệm điều gì xảy ra khi code Trâu in dư một dấu cách cuối dòng, hoặc khi viết ngược logic điều kiện kiểm tra exit code.',
        toggles: [
          {
            key: 'os',
            label: '1. Hệ điều hành',
            options: [
              { value: 'win', text: 'Windows (fc /w)' },
              { value: 'linux', text: 'Linux (diff -w)' }
            ]
          },
          {
            key: 'ws',
            label: '2. Cờ bỏ qua khoảng trắng',
            options: [
              { value: 'with_w', text: 'Có cờ /w (Bỏ qua dấu cách thừa - Chuẩn)', kind: 'ok' },
              { value: 'no_w', text: 'Thiếu cờ /w (Soi từng byte - Sai oan)', kind: 'bug' }
            ]
          },
          {
            key: 'exitLogic',
            label: '3. Điều kiện bắt lỗi và lệnh dừng',
            options: [
              { value: 'correct', text: 'if (system(...) != 0) + exit(0) (Chuẩn)', kind: 'ok' },
              { value: 'invert', text: 'if (system(...) == 0) (Ngược logic)', kind: 'bug' },
              { value: 'return_only', text: 'Dùng return; thay vì exit(0); (Ghi đè test lỗi)', kind: 'bug' }
            ]
          }
        ],
        build(state) {
          const isWin = state.os === 'win';
          const withW = state.ws === 'with_w';
          const logic = state.exitLogic;
          const cmpCmd = isWin ? (withW ? 'fc /w BAI1.out BAI1.ans' : 'fc BAI1.out BAI1.ans') : (withW ? 'diff -w BAI1.out BAI1.ans' : 'diff BAI1.out BAI1.ans');
          const op = logic === 'invert' ? '== 0' : '!= 0';
          const exitStmt = logic === 'return_only' ? 'return; // Lỗi: Vòng for vẫn chạy tiếp ghi đè test!' : 'exit(0); // Chuẩn: Dừng ngay bảo toàn test lỗi!';

          let code = `#include <bits/stdc++.h>
using namespace std;
#define NAME "BAI1"

void compare(int iTest) {
    if (system("${cmpCmd}") ${op}) {
        cout << "Test " << iTest << ": WRONG!\\n";
        ${exitStmt}
    }
    cout << "Test " << iTest << ": CORRECT!\\n";
}

int main() {
    for (int iTest = 1; iTest <= 100; iTest++) {
        // ... generate() & system(NAME ".exe") ...
        compare(iTest);
    }
    return 0;
}`;

          if (!withW) {
            return {
              code,
              changedLines: [6],
              statusOk: false,
              statusText: 'BÁO SAI OAN: Code Trâu in ra "10 " (dư 1 dấu cách), thiếu /w nên fc báo sai từng byte!',
              console: isWin
                ? `Comparing files BAI1.out and BAI1.ANS\n***** BAI1.out\n10\n***** BAI1.ANS\n10 \n*****\nTest 1: WRONG!\n(Process stopped by exit(0))`
                : `1c1\n< 10\n---\n> 10 \nTest 1: WRONG!`,
              files: {
                inp: `4\n1 2 3 4\n`,
                out: `10\n`,
                ans: `10 \n`
              }
            };
          }

          if (logic === 'invert') {
            return {
              code,
              changedLines: [6],
              statusOk: false,
              statusText: 'NGƯỢC LOGIC: system() == 0 nghĩa là 2 file GIỐNG NHAU, nhưng bạn lại báo WRONG!',
              console: `Comparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 1: WRONG! (Ngược đời: 2 file giống hệt nhau lại báo WRONG và dừng chương trình!)`,
              files: {
                inp: `4\n1 2 3 4\n`,
                out: `10\n`,
                ans: `10\n`
              }
            };
          }

          if (logic === 'return_only') {
            return {
              code,
              changedLines: [8],
              statusOk: false,
              statusText: 'CẢNH BÁO: Dùng return; khiến vòng for chạy tiếp đến Test 100, file test lỗi bị ghi đè mất!',
              console: `Comparing files BAI1.out and BAI1.ANS\n***** BAI1.out\n15\n***** BAI1.ANS\n20\n*****\nTest 1: WRONG!\nComparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 2: CORRECT!\n...\nTest 100: CORRECT! (Mất sạch hiện trường của Test 1!)`,
              files: {
                inp: `10\n1 2 3 ... (Test 100 đã ghi đè lên Test 1)`,
                out: `55\n`,
                ans: `55\n`
              }
            };
          }

          return {
            code,
            changedLines: [],
            statusOk: true,
            statusText: 'CHUẨN: Có cờ /w và dùng exit(0) dừng ngay khi phát hiện sai khác!',
            console: `Comparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 1: CORRECT!\nComparing files BAI1.out and BAI1.ANS\nFC: no differences encountered\nTest 2: CORRECT!\n... Chấm tiếp tục đến khi phát hiện lỗi ...`,
            files: {
              inp: `4\n1 2 3 4\n`,
              out: `10\n`,
              ans: `10 \n`
            }
          };
        }
      }
    ],
    quiz: [
      {
        q: '1. Khi gọi system("fc /w BAI1.out BAI1.ans") trên Windows, giá trị trả về bằng 0 có ý nghĩa gì?',
        options: [
          'Chương trình fc bị lỗi không chạy được',
          'Hai file kết quả hoàn toàn GIỐNG NHAU (Accepted)',
          'Hai file kết quả KHÁC NHAU (Wrong Answer)',
          'File BAI1.out bị rỗng 0 byte'
        ],
        correct: 1,
        explain: 'Theo quy ước của hệ điều hành, giá trị trả về (exit code) bằng 0 đại diện cho việc không có lỗi hay khác biệt nào được tìm thấy. Tức là hai file giống hệt nhau.'
      },
      {
        q: '2. Tại sao phải thêm cờ /w trong câu lệnh fc /w của Windows?',
        options: [
          'Để ghi đè kết quả lên màn hình',
          'Để nén file kết quả thành file zip',
          'Để bỏ qua khoảng trắng thừa và ký tự xuống dòng khác nhau giữa Windows và Linux',
          'Để chạy lệnh với quyền Administrator'
        ],
        correct: 2,
        explain: 'Cờ /w (compress white space) giúp bỏ qua dấu cách thừa ở đầu/cuối dòng và không phân biệt \\r\\n với \\n, đúng với quy chế chấm thi lập trình thi đấu.'
      },
      {
        q: '3. Trong hàm void compare(), nếu phát hiện test sai ta phải gọi lệnh nào để bảo vệ hiện trường file .inp?',
        options: [
          'return;',
          'break;',
          'continue;',
          'exit(0);'
        ],
        correct: 3,
        explain: 'Lệnh exit(0); lập tức kết thúc toàn bộ chương trình từ bất kỳ hàm con nào, ngăn vòng lặp for chạy tiếp và giữ nguyên file .inp gây lỗi trên ổ cứng.'
      },
      {
        q: '4. Sự khác biệt khi chạy file thực thi trên Windows so với Linux qua hàm system() là gì?',
        options: [
          'Windows bắt buộc đuôi .exe (ví dụ system("BAI1.exe")), còn Linux yêu cầu đường dẫn ./ ở trước (ví dụ system("./BAI1"))',
          'Windows không cho phép chạy file qua system()',
          'Linux bắt buộc file phải có đuôi .exe',
          'Cả hai hệ điều hành đều bắt buộc viết system("run BAI1")'
        ],
        correct: 0,
        explain: 'Trên Windows, cmd tự tìm file .exe ở thư mục hiện tại. Trên Linux, vì lý do an toàn, Shell bắt buộc phải chỉ rõ ./ (ngay thư mục này) và file binary không có đuôi .exe.'
      }
    ]
  },

  // ============================================================================
  // MODULE 4: SINH SỐ NGẪU NHIÊN: mt19937_64, SEED THỜI GIAN & HÀM RAND DỄ NHỚ
  // ============================================================================
  {
    id: 'm4',
    number: 'Module 04',
    shortTitle: 'Random & mt19937_64',
    title: 'Sinh Số Ngẫu Nhiên: mt19937_64, Seed Thời Gian & Hàm Rand Dễ Nhớ',
    lead: 'Vứt bỏ hàm rand() cổ điển: Giới hạn 32767 trên Windows, giải mã cú pháp hiện đại mt19937_64 và chrono::steady_clock, định hình hàm Rand(l, r) chia dư dễ nhớ làm chuẩn trong phòng thi, và bẫy đặt sai vị trí hạt giống.',
    sections: [
      {
        num: '4.1',
        heading: 'Tại sao phải vứt bỏ rand() và srand(time(0)) trên Windows?',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Giới hạn <code>RAND_MAX = 32767</code> <span class="concept-tag">Quá bé</span></h4>
              <p>Trên Windows (MinGW / Code::Blocks), hàm <code>rand()</code> chỉ trả về số tối đa là <strong>32,767</strong> ($2^{15}-1$).</p>
              <ul>
                <li>Bạn muốn sinh mảng $N = 100,000$ phần tử? <code>rand()</code> không sinh nổi!</li>
                <li>Bạn muốn sinh số nguyên lớn $10^9$ hay $10^{18}$? <code>rand()</code> hoàn toàn bất lực!</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. Cái bẫy của <code>time(0)</code> <span class="concept-tag">Trùng hạt giống</span></h4>
              <p>Máy tính sinh số ngẫu nhiên dựa vào <strong>Hạt giống (Seed)</strong>. Cùng seed → sinh ra dãy số y hệt nhau!</p>
              <ul>
                <li>Hàm <code>time(0)</code> chỉ nhảy số <strong>mỗi giây 1 lần</strong>.</li>
                <li>Máy chấm chạy 50 test trong 1 giây. Nếu đặt <code>srand(time(0))</code> bên trong hàm <code>generate()</code>, cả 50 test đều nhận chung 1 hạt giống và sinh ra 50 file <code>.inp</code> giống hệt nhau!</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '4.2',
        heading: 'Giải nghĩa cú pháp hiện đại: mt19937_64 và chrono::steady_clock',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. <code>mt19937_64</code> là gì? <span class="concept-tag">Mersenne Twister</span></h4>
              <ul>
                <li><code>mt</code> = <strong>Mersenne Twister</strong> (thuật toán sinh số ngẫu nhiên cực mạnh phát minh năm 1997, chu kỳ siêu dài $2^{19937}-1$).</li>
                <li><code>19937</code> = Số mũ nguyên tố Mersenne.</li>
                <li><code>_64</code> = Sinh số nguyên không dấu <strong>64-bit</strong> (tối đa $\approx 1.84 \times 10^{19}$), phủ kín toàn bộ miền giá trị của kiểu <code>long long</code>!</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. <code>chrono::steady_clock</code> <span class="concept-tag">Thần thời gian</span></h4>
              <ul>
                <li><code>chrono</code> = Thư viện thời gian độ chính xác cao của C++11 (bắt nguồn từ thần thời gian Chronos).</li>
                <li><code>steady_clock</code> = Chiếc đồng hồ chạy đều đơn điệu, không bao giờ bị giật lùi.</li>
                <li><code>time_since_epoch().count()</code> = Đếm từng tích tắc <strong>nanosecond (phần tỷ giây)</strong> tính từ ngày 01/01/1970 làm hạt giống độc nhất, chạy nghìn test trong 1 giây vẫn nhận 1000 hạt giống khác nhau!</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '4.3',
        heading: 'Hàm Rand(l, r) dễ nhớ hàng đầu trong phòng thi',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Cú pháp chia dư dễ nhớ (Khuyên dùng trong phòng thi) <span class="concept-tag">Ưu tiên số 1</span></h4>
              <pre><code>mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());

long long Rand(long long l, long long r) {
    return l + (rd() % (r - l + 1));
}</code></pre>
              <p><strong>Giải thích trực quan:</strong></p>
              <ul>
                <li><code>rd()</code> bốc ra một số nguyên ngẫu nhiên cực lớn.</li>
                <li><code>rd() % (r - l + 1)</code>: Lấy phần dư cho độ dài đoạn $[l, r]$, ra một số trong đoạn $[0, r - l]$.</li>
                <li>Cộng thêm <code>l</code>: Tịnh tiến từ $[0, r - l]$ thành đúng đoạn $[l, r]$! Cực kỳ dễ nhớ, không sợ gõ sai tên kiểu trong phòng thi.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. Cú pháp mở rộng chuẩn C++ (Phân phối đều tuyệt đối) <span class="concept-tag">Mở rộng</span></h4>
              <pre><code>long long Rand(long long l, long long r) {
    return uniform_int_distribution&lt;long long&gt;(l, r)(rd);
}</code></pre>
              <ul>
                <li><code>uniform</code>: Phân phối đều (mọi số trong đoạn có xác suất xuất hiện ngang nhau, không lệch modulo).</li>
                <li><code>int_distribution&lt;long long&gt;</code>: Phân phối số nguyên kiểu <code>long long</code>.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>3. Vị trí đặt biến <code>rd</code> <span class="concept-tag">Bắt buộc toàn cục</span></h4>
              <p>Biến <code>rd</code> <strong>bắt buộc phải khai báo ở ngoài hàm (Global)</strong> một lần duy nhất ở đầu chương trình. Nếu đặt trong hàm <code>generate()</code> hay trong hàm <code>Rand()</code> thì mỗi lần gọi hàm lại bị reset lại bộ quay số!</p>
            </div>
          </div>
        `
      }
    ],
    discussions: [
      {
        id: 'd4_1',
        question: 'Câu hỏi thảo luận 1: Tại sao trên Code::Blocks (Windows), khi bạn viết Rand(1, 1000000) bằng hàm rand() % 1000000, số sinh ra không bao giờ vượt quá 32,767?',
        answer: 'Vì trên Windows (MinGW), hằng số <code>RAND_MAX</code> chỉ bằng <strong>32,767</strong>! Bản thân hàm <code>rand()</code> không thể sinh ra số nào lớn hơn 32,767, nên phép chia dư <code>% 1000000</code> giữ nguyên số đó, không thể nào chạm tới mốc 1 triệu!'
      },
      {
        id: 'd4_2',
        question: 'Câu hỏi thảo luận 2: Tại sao công thức return l + (rd() % (r - l + 1)); kết hợp mt19937_64 lại là cú pháp ưu tiên số 1 trong phòng thi?',
        answer: 'Vì công thức này chỉ gồm 1 dòng toán học cơ bản (chia dư độ dài rồi cộng dồn mốc xuất phát), rất dễ thuộc lòng và gõ cực nhanh dưới áp lực thi cử, mà vẫn an toàn tuyệt đối với số 64-bit nhờ bộ sinh <code>mt19937_64</code>.'
      }
    ],
    sandboxes: [
      {
        id: 'sb4_1',
        title: 'Phòng thí nghiệm 4A: Cái bẫy vị trí đặt Hạt giống (Seed) và time(0) vs steady_clock',
        desc: 'Mô phỏng chuyện gì xảy ra khi đặt khởi tạo seed bên trong hàm sinh test so với đặt toàn cục ở ngoài hàm.',
        toggles: [
          {
            key: 'seedPos',
            label: '1. Vị trí đặt bộ sinh ngẫu nhiên',
            options: [
              { value: 'global', text: 'Khai báo Toàn cục (Global) ở ngoài hàm (Chuẩn)', kind: 'ok' },
              { value: 'local_time', text: 'Khai báo Cục bộ trong hàm + time(0) (Lỗi trùng seed)', kind: 'bug' }
            ]
          }
        ],
        build(state) {
          const isGlobal = state.seedPos === 'global';
          let code = `#include <bits/stdc++.h>
using namespace std;
`;
          if (isGlobal) {
            code += `// Khởi tạo TOÀN CỤC một lần duy nhất với đồng hồ nano-giây:
mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());

long long Rand(long long l, long long r) {
    return l + (rd() % (r - l + 1));
}

void generate() {
    cout << Rand(1, 100) << " " << Rand(1, 100) << "\\n";
}
`;
          } else {
            code += `long long Rand(long long l, long long r) {
    // LỖI CHÍ MẠNG: Khởi tạo hạt giống time(0) mỗi lần gọi hàm!
    mt19937 rd(time(0)); 
    return l + (rd() % (r - l + 1));
}

void generate() {
    cout << Rand(1, 100) << " " << Rand(1, 100) << "\\n";
}
`;
          }
          code += `int main() {
    for (int t = 1; t <= 3; t++) {
        cout << "--- Test " << t << " ---\\n";
        generate();
    }
    return 0;
}`;

          if (isGlobal) {
            return {
              code,
              changedLines: [3, 4, 6],
              statusOk: true,
              statusText: 'CHUẨN: Khởi tạo toàn cục, 3 test sinh ra hoàn toàn khác nhau!',
              console: `--- Test 1 ---\n83 14\n--- Test 2 ---\n47 92\n--- Test 3 ---\n19 65\n\nProcess returned 0 (0x0)`,
              files: {
                inp: `Test 1: 83 14\nTest 2: 47 92\nTest 3: 19 65\n`,
                out: `Mỗi test đều có dữ liệu mới`,
                ans: `Hạt giống steady_clock biến thiên theo nanosecond`
              }
            };
          } else {
            return {
              code,
              changedLines: [3, 4],
              statusOk: false,
              statusText: 'LỖI TRÙNG SEED: time(0) chưa kịp đổi giây, cả 3 test in ra 2 số y hệt nhau!',
              console: `--- Test 1 ---\n42 42\n--- Test 2 ---\n42 42\n--- Test 3 ---\n42 42\n\n(CẢNH BÁO: Vì chạy trong cùng 1 giây, time(0) trả về cùng 1 số. Cả 3 test sinh ra y hệt nhau!)`,
              files: {
                inp: `--- Test 1 ---\n42 42\n--- Test 2 ---\n42 42\n--- Test 3 ---\n42 42\n`,
                out: `Dữ liệu bị trùng lặp hoàn toàn`,
                ans: `Lỗi khởi tạo hạt giống bên trong hàm`
              }
            };
          }
        }
      },
      {
        id: 'sb4_2',
        title: 'Phòng thí nghiệm 4B: So sánh tầm với kiểu số: rand() vs mt19937_64 với Hàm Rand Dễ Nhớ',
        desc: 'Thử nghiệm sinh số nguyên lớn trong đoạn [1, 10^12] bằng hàm Rand chia dư dễ nhớ so với hàm rand() cổ điển.',
        toggles: [
          {
            key: 'genMethod',
            label: '1. Phương pháp sinh ngẫu nhiên',
            options: [
              { value: 'mt64_modulo', text: 'mt19937_64 + Chia dư dễ nhớ l + rd() % (r - l + 1) (Chuẩn)', kind: 'ok' },
              { value: 'mt64_dist', text: 'mt19937_64 + uniform_int_distribution (Mở rộng)', kind: 'ok' },
              { value: 'classic_rand', text: 'rand() % (r - l + 1) cổ điển (Lỗi chặn ngọn 32767)', kind: 'bug' }
            ]
          }
        ],
        build(state) {
          const method = state.genMethod;
          let code = `#include <bits/stdc++.h>
using namespace std;
`;
          if (method === 'mt64_modulo') {
            code += `mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());

// Hàm Rand chia dư dễ nhớ trong phòng thi:
long long Rand(long long l, long long r) {
    return l + (rd() % (r - l + 1));
}

int main() {
    long long L = 1, R = 1000000000000LL; // 10^12
    cout << "Sinh so trong doan [1, 10^12]:\\n";
    for (int i = 1; i <= 3; i++) cout << Rand(L, R) << "\\n";
    return 0;
}`;
            return {
              code,
              changedLines: [4, 5, 6],
              statusOk: true,
              statusText: 'CHUẨN: mt19937_64 kết hợp chia dư dễ nhớ sinh mượt mà số 10^12!',
              console: `Sinh so trong doan [1, 10^12]:\n849201948201\n194820194820\n918274019284\n\nProcess returned 0 (0x0)`,
              files: {
                inp: `849201948201\n194820194820\n918274019284\n`,
                out: `Số nguyên 64-bit phủ kín toàn miền long long`,
                ans: `Công thức: l + (rd() % (r - l + 1))`
              }
            };
          } else if (method === 'mt64_dist') {
            code += `mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());

// Cú pháp mở rộng chuẩn C++ (phân phối đều tuyệt đối):
long long Rand(long long l, long long r) {
    return uniform_int_distribution<long long>(l, r)(rd);
}

int main() {
    long long L = 1, R = 1000000000000LL; // 10^12
    cout << "Sinh so trong doan [1, 10^12]:\\n";
    for (int i = 1; i <= 3; i++) cout << Rand(L, R) << "\\n";
    return 0;
}`;
            return {
              code,
              changedLines: [4, 5, 6],
              statusOk: true,
              statusText: 'CHUẨN: uniform_int_distribution phân phối đều tuyệt đối cho kiểu long long.',
              console: `Sinh so trong doan [1, 10^12]:\n719284019283\n382019482019\n501928401928\n\nProcess returned 0 (0x0)`,
              files: {
                inp: `719284019283\n382019482019\n501928401928\n`,
                out: `Phân phối đều chuẩn thư viện <random>`,
                ans: `uniform_int_distribution<long long>`
              }
            };
          } else {
            code += `long long Rand(long long l, long long r) {
    // LỖI: rand() trên Windows chỉ trả về tối đa 32767!
    return l + (rand() % (r - l + 1));
}

int main() {
    srand(time(0));
    long long L = 1, R = 1000000000000LL; // 10^12
    cout << "Sinh so trong doan [1, 10^12]:\\n";
    for (int i = 1; i <= 3; i++) cout << Rand(L, R) << "\\n";
    return 0;
}`;
            return {
              code,
              changedLines: [3],
              statusOk: false,
              statusText: 'LỖI RAND_MAX: rand() bị chặn cứng dưới 32767, không thể chạm tới 10^12!',
              console: `Sinh so trong doan [1, 10^12]:\n14829\n28401\n5921\n\n(CẢNH BÁO: Tất cả số sinh ra đều bé hơn 32,767!)`,
              files: {
                inp: `14829\n28401\n5921\n`,
                out: `Số sinh ra bị kẹt dưới 32767`,
                ans: `Hạn chế của thư viện C cổ điển`
              }
            };
          }
        }
      }
    ],
    quiz: [
      {
        q: '1. Hằng số RAND_MAX trên hệ điều hành Windows khi dùng Code::Blocks có giá trị là bao nhiêu?',
        options: [
          '32,767 (tức 2^15 - 1)',
          '2,147,483,647 (tức 2^31 - 1)',
          'Vô hạn',
          '1,000,000'
        ],
        correct: 0,
        explain: 'Trên Windows (MinGW), RAND_MAX chỉ bằng 32767. Không thể dùng rand() để sinh mảng 10^5 phần tử hay các số lớn hơn 32767.'
      },
      {
        q: '2. Tại sao ta nên dùng chrono::steady_clock thay vì time(0) để làm hạt giống (seed) cho mt19937_64?',
        options: [
          'Vì steady_clock đếm theo nanosecond (phần tỷ giây), còn time(0) chỉ đổi giá trị mỗi giây 1 lần nên dễ làm các test sinh ra giống hệt nhau khi chạy nhanh',
          'Vì steady_clock viết ngắn hơn time(0)',
          'Vì time(0) không được C++ hỗ trợ nữa',
          'Vì steady_clock tự động sắp xếp mảng'
        ],
        correct: 0,
        explain: 'time(0) tính theo giây nên nếu chạy 100 test trong 1 giây sẽ nhận cùng 1 seed. steady_clock đếm theo nanosecond đảm bảo mỗi tích tắc đều nhận seed mới.'
      },
      {
        q: '3. Công thức nào sau đây là cú pháp hàm Rand(l, r) chia dư dễ nhớ và an toàn cho kiểu số 64-bit?',
        options: [
          'return l + (rd() % (r - l + 1));',
          'return rd() % r;',
          'return l + rd();',
          'return (l + r) / 2;'
        ],
        correct: 0,
        explain: 'l + (rd() % (r - l + 1)) lấy phần dư cho độ dài đoạn [0, r - l] rồi cộng tịnh tiến từ l, tạo thành số ngẫu nhiên trong đoạn [l, r].'
      },
      {
        q: '4. Biến bộ sinh ngẫu nhiên mt19937_64 rd(...) nên được đặt ở vị trí nào trong mã nguồn?',
        options: [
          'Bên trong vòng lặp for sinh test',
          'Khai báo toàn cục (Global) ở ngoài hàm một lần duy nhất',
          'Bên trong hàm Rand(l, r)',
          'Đặt ở cuối chương trình sau lệnh return 0;'
        ],
        correct: 1,
        explain: 'Đặt toàn cục giúp bộ sinh ngẫu nhiên duy trì trạng thái liên tục qua các lần gọi hàm, tránh việc bị reset seed gây trùng lặp dữ liệu.'
      }
    ]
  },

  // ============================================================================
  // MODULE 5: TỔ CHỨC TEMPLATE MÁY CHẤM HOÀN CHỈNH & NGHỆ THUẬT TẠO TEST MẠNH
  // ============================================================================
  {
    id: 'm5',
    number: 'Module 05',
    shortTitle: 'Template & Sinh Test Mạnh',
    title: 'Tổ Chức Template Máy Chấm Hoàn Chỉnh & Nghệ Thuật Tạo Test Mạnh',
    lead: 'Gộp toàn bộ kiến thức vào thực chiến: Khung chuẩn MAYCHAM.cpp, phối hợp Thuật Trâu (.ans) vs Thuật Full (.out), tổ chức thư mục thi đấu và nghệ thuật tạo test bẫy (MAXSUB và QUERY).',
    sections: [
      {
        num: '5.1',
        heading: 'Mô hình máy chấm 3 file & Khung sườn MAYCHAM.cpp chuẩn',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Mô hình 3 file trong kỳ thi <span class="concept-tag">Tổ chức</span></h4>
              <ul>
                <li><strong><code>BAI1.cpp</code> (Thuật Full):</strong> Đọc <code>BAI1.inp</code> → Ghi ra <strong><code>BAI1.out</code></strong>. Thuật toán tối ưu ($O(N), O(N \\log N)$).</li>
                <li><strong><code>BAI1_TRAU.cpp</code> (Thuật Trâu):</strong> Đọc <code>BAI1.inp</code> → Ghi ra <strong><code>BAI1.ans</code></strong>. Thuật toán ngây thơ duyệt cạn nhưng <strong>chắc chắn đúng 100%</strong>.</li>
                <li><strong><code>MAYCHAM.cpp</code> (Người trọng tài):</strong> Sinh test bằng <code>ofstream</code>, gọi 2 file <code>.exe</code> bằng <code>system()</code>, so sánh bằng <code>fc /w</code>, dừng lại ngay bằng <code>exit(0)</code> khi thấy lỗi!</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. Khung sườn hoàn chỉnh với hàm Rand dễ nhớ <span class="concept-tag">MAYCHAM.cpp</span></h4>
              <pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

#define NAME "BAI1"
const int NUM_TESTS = 100;

mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());
long long Rand(long long l, long long r) {
    return l + (rd() % (r - l + 1));
}

void generate() {
    ofstream inp(NAME ".inp");
    // Sinh dữ liệu test ở đây...
    inp.close();
}

void compare(int iTest) {
    #ifdef _WIN32
        string cmd = "fc /w " NAME ".out " NAME ".ans";
    #else
        string cmd = "diff -w " NAME ".out " NAME ".ans";
    #endif
    if (system(cmd.c_str()) != 0) {
        cout &lt;&lt; "Test " &lt;&lt; iTest &lt;&lt; ": WRONG!\\n";
        exit(0);
    }
    cout &lt;&lt; "Test " &lt;&lt; iTest &lt;&lt; ": CORRECT!\\n";
}

int main() {
    for (int iTest = 1; iTest &lt;= NUM_TESTS; iTest++) {
        generate();
        system(NAME ".exe");
        system(NAME "_TRAU.exe");
        compare(iTest);
    }
    return 0;
}</code></pre>
            </div>
          </div>
        `
      },
      {
        num: '5.2',
        heading: 'Nghệ thuật sinh test mạnh: Bài 1 - Đoạn con có tổng lớn nhất (MAXSUB)',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Đề bài MAXSUB <span class="concept-tag">Bài toán cơ bản</span></h4>
              <p>Cho mảng $N$ số nguyên ($N \\le 2 \\times 10^5, |A_i| \\le 10^9$). Tìm đoạn con liên tiếp có tổng lớn nhất.</p>
              <ul>
                <li>Thuật Trâu: $O(N^2)$ duyệt 2 vòng for.</li>
                <li>Thuật Full: $O(N)$ dùng thuật toán Kadane.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. Nguyên tắc vàng: Sinh N nhỏ trước! <span class="concept-tag">N = 5..10</span></h4>
              <p>Đừng vội sinh $N = 100,000$!</p>
              <ul>
                <li>Thuật Trâu $O(N^2)$ chạy $N = 10^5$ sẽ bị đứng hình (TLA).</li>
                <li>Khi máy chấm báo <code>WRONG!</code> ở mảng 5 số, bạn nhẩm tay 30 giây là tìm ra bug. Nếu mảng 100.000 số thì chịu chết không biết lỗi ở đâu!</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        num: '5.3',
        heading: 'Nghệ thuật sinh test bẫy: Bài 2 - Truy vấn mảng tăng dần (QUERY)',
        html: `
          <div class="concept-grid">
            <div class="concept-card">
              <h4>1. Ràng buộc cấu trúc dữ liệu <span class="concept-tag">Valid Data</span></h4>
              <ul>
                <li>Đề bài yêu cầu <strong>mảng tăng dần</strong>: Sau khi sinh mảng, <strong>bắt buộc phải <code>sort(a + 1, a + n + 1);</code></strong> trước khi in ra file <code>.inp</code>! Nếu quên sort, thuật chặt nhị phân trong code Full sẽ chạy sai oan!</li>
                <li>Truy vấn đoạn $[L, R]$ với $L \\le R$: Phải sinh <code>int L = Rand(1, n), R = Rand(L, n);</code> chứ không sinh độc lập làm $L > R$.</li>
              </ul>
            </div>
            <div class="concept-card">
              <h4>2. Bẫy Test Yếu: Thu hẹp miền sinh & Ép xác suất trúng <span class="concept-tag">Strong Test</span></h4>
              <ul>
                <li>Nếu sinh $A_i$ và $X$ trong miền $[1, 10^9]$ ngây thơ: Xác suất $X$ trùng với phần tử trong mảng gần như bằng <strong>0%</strong>! Cả 100 test đều ra kết quả 0, không test được nhánh tìm thấy của code Full!</li>
                <li><strong>Cách khắc phục:</strong> Thu hẹp miền giá trị xuống <code>Rand(1, 5)</code> để các số trùng nhau nhiều lần, và tung đồng xu 50% ép $X = a[\\text{Rand}(L, R)]$ để chắc chắn $X$ có mặt trong đoạn!</li>
              </ul>
            </div>
          </div>
        `
      }
    ],
    discussions: [
      {
        id: 'd5_1',
        question: 'Câu hỏi thảo luận 1: Tại sao khi stress test ta nên ưu tiên sinh kích thước N nhỏ (ví dụ N = 5 đến 10) thay vì sinh thẳng N = 10^5?',
        answer: 'Vì hai lý do: (1) Thuật Trâu O(N^2) chỉ chạy nhanh với N nhỏ, nếu N = 10^5 máy chấm sẽ bị đơ vì quá thời gian; (2) Khi bắt được test sai, mảng 5 phần tử giúp bạn nhẩm tay tìm ra lỗi trong 30 giây, còn mảng 100.000 phần tử thì không thể nhìn bằng mắt để debug được.'
      },
      {
        id: 'd5_2',
        question: 'Câu hỏi thảo luận 2: Trong bài toán truy vấn đếm số X trên mảng tăng dần, tại sao việc sinh ngẫu nhiên X độc lập trong miền [1, 10^9] lại tạo ra test cực yếu?',
        answer: 'Vì không gian 10^9 quá rộng lớn trong khi mảng chỉ có vài phần tử. Xác suất số X bốc ngẫu nhiên trúng vào mảng gần như bằng 0, dẫn tới 100% truy vấn đều ra đáp án là 0. Một code Full viết sai hoàn toàn thuật toán tìm kiếm vẫn có thể cho ra kết quả 0 và vượt qua máy chấm!'
      }
    ],
    sandboxes: [
      {
        id: 'sb5_1',
        title: 'Phòng thí nghiệm 5: Bắt Bug với Test Mạnh (Bài QUERY: Mảng tăng dần & Truy vấn [L, R])',
        desc: 'Mô phỏng máy chấm bắt lỗi code Full khi sinh test có cấu trúc mảng tăng dần và ép xác suất trúng số.',
        toggles: [
          {
            key: 'structMode',
            label: '1. Cấu trúc dữ liệu mảng A và đoạn [L, R]',
            options: [
              { value: 'sorted_valid', text: 'Có sort mảng tăng dần & Luôn đảm bảo L <= R (Chuẩn)', kind: 'ok' },
              { value: 'unsorted', text: 'Quên sort mảng A (Lỗi vi phạm đề bài mảng tăng dần)', kind: 'bug' },
              { value: 'bad_range', text: 'Sinh L, R độc lập dẫn đến L > R (Lỗi vi phạm đề)', kind: 'bug' }
            ]
          },
          {
            key: 'strengthMode',
            label: '2. Độ mạnh của Test sinh ra',
            options: [
              { value: 'strong', text: 'Test Mạnh: Miền hẹp [1, 5] & Ép 50% X thuộc mảng (Bắt bug)', kind: 'ok' },
              { value: 'weak', text: 'Test Yếu: Miền rộng [1, 10^9] độc lập (100% đáp án = 0)', kind: 'bug' }
            ]
          }
        ],
        build(state) {
          const isSorted = state.structMode === 'sorted_valid';
          const isUnsorted = state.structMode === 'unsorted';
          const isBadRange = state.structMode === 'bad_range';
          const isStrong = state.strengthMode === 'strong';

          let code = `#include <bits/stdc++.h>
using namespace std;
#define NAME "QUERY"

mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());
long long Rand(long long l, long long r) {
    return l + (rd() % (r - l + 1));
}

void generate() {
    ofstream inp(NAME ".inp");
    int n = 8, q = 4;
    inp << n << " " << q << "\\n";
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) {
`;
          if (isStrong) {
            code += `        a[i] = Rand(1, 5); // TEST MẠNH: Miền hẹp [1..5] để ép trùng số!\\n`;
          } else {
            code += `        a[i] = Rand(1, 1000000000LL); // TEST YẾU: Miền quá rộng [1..10^9]!\\n`;
          }
          code += `    }\n`;

          if (isUnsorted) {
            code += `    // LỖI: Quên sort mảng trong khi đề bài yêu cầu mảng tăng dần!\\n`;
          } else {
            code += `    sort(a.begin() + 1, a.end()); // Chuẩn: Đảm bảo mảng tăng dần\\n`;
          }

          code += `    for (int i = 1; i <= n; i++) inp << a[i] << (i == n ? "\\n" : " ");\\n\\n`;
          code += `    for (int k = 1; k <= q; k++) {\\n`;

          if (isBadRange) {
            code += `        int L = Rand(1, n), R = Rand(1, n); // LỖI: Có thể sinh ra L > R!\\n`;
          } else {
            code += `        int L = Rand(1, n), R = Rand(L, n); // Chuẩn: Luôn đảm bảo 1 <= L <= R <= n\\n`;
          }

          if (isStrong) {
            code += `        long long X = (Rand(0, 1) && L <= R) ? a[Rand(L, R)] : Rand(1, 5); // Ép 50% trúng\\n`;
          } else {
            code += `        long long X = Rand(1, 1000000000LL); // Xác suất trùng gần như bằng 0%!\\n`;
          }

          code += `        inp << L << " " << R << " " << X << "\\n";
    }
    inp.close();
}

int main() {
    generate();
    system(NAME ".exe");
    system(NAME "_TRAU.exe");
    // compare()...
    return 0;
}`;

          if (isBadRange) {
            return {
              code,
              changedLines: [24],
              statusOk: false,
              statusText: 'LỖI ĐỀ BÀI: Sinh L, R độc lập làm L = 7 > R = 2, vi phạm yêu cầu bài toán!',
              console: `Comparing files QUERY.out and QUERY.ANS\n***** QUERY.out\n-1\n***** QUERY.ANS\n0\n*****\nTest 1: WRONG! (Lỗi giả: Máy chấm sinh test sai điều kiện L <= R)`,
              files: {
                inp: `8 4\n1 1 2 2 3 3 4 4\n7 2 3   <-- LỖI: L = 7 lớn hơn R = 2!\n`,
                out: `-1\n`,
                ans: `0\n`
              }
            };
          }

          if (isUnsorted) {
            return {
              code,
              changedLines: [18],
              statusOk: false,
              statusText: 'LỖI CẤU TRÚC: Quên sort mảng tăng dần, làm thuật chặt nhị phân chạy sai!',
              console: `Comparing files QUERY.out and QUERY.ANS\n***** QUERY.out\n0\n***** QUERY.ANS\n2\n*****\nTest 1: WRONG! (Lỗi giả: Mảng trong QUERY.inp chưa được sắp xếp tăng dần)`,
              files: {
                inp: `8 4\n4 1 3 2 4 1 2 3   <-- LỖI: Mảng lộn xộn vi phạm đề bài!\n1 8 2\n`,
                out: `0\n`,
                ans: `2\n`
              }
            };
          }

          if (!isStrong) {
            return {
              code,
              changedLines: [15, 27],
              statusOk: false,
              statusText: 'CẢNH BÁO TEST QUÁ YẾU: Miền sinh 10^9 làm 100% kết quả bằng 0, không bắt được bug!',
              console: `Comparing files QUERY.out and QUERY.ANS\nFC: no differences encountered\nTest 1: CORRECT!\n...\nTest 100: CORRECT! (Cảnh báo: 100% đáp án đều là số 0, nhánh tìm thấy chưa từng được chạy!)`,
              files: {
                inp: `8 4\n14209182 89102938 192837465 340192837 519283746 710293847 891029384 950192837\n1 8 444999111\n`,
                out: `0\n0\n0\n0\n`,
                ans: `0\n0\n0\n0\n`
              }
            };
          }

          return {
            code,
            changedLines: [],
            statusOk: true,
            statusText: 'BẮT GỌN BUG: Test mạnh với 3 số 2 đứng liền nhau giúp bắt bug trong code Full ngay tại Test 1!',
            console: `Comparing files QUERY.out and QUERY.ANS\n***** QUERY.out\n1\n***** QUERY.ANS\n3\n*****\nTest 1: WRONG! (Bắt trúng bug code Full không đếm hết các số trùng nhau trên đoạn [1..6]!)`,
            files: {
              inp: `8 4\n1 1 2 2 2 3 4 4\n1 6 2   <-- Đoạn [1..6] có tới 3 số 2 đứng liền nhau!\n`,
              out: `1\n`,
              ans: `3\n`
            }
          };
        }
      }
    ],
    quiz: [
      {
        q: '1. Tại sao trong mô hình máy chấm 3 file, code Trâu luôn xuất ra file .ans còn code Full xuất ra .out?',
        options: [
          'Để máy tính không bị lẫn lộn giữa hai file kết quả và dùng lệnh so sánh fc /w NAME.out NAME.ans một cách tự động',
          'Vì đuôi .ans chạy nhanh hơn đuôi .out',
          'Vì Code::Blocks chỉ đọc được file .ans',
          'Vì đề bài quy định như vậy'
        ],
        correct: 0,
        explain: 'Tách biệt NAME.out (kết quả thuật tối ưu) và NAME.ans (đáp án chuẩn của thuật Trâu) giúp lệnh fc /w đối chiếu trực tiếp giữa 2 file kết quả độc lập.'
      },
      {
        q: '2. Khi sinh test cho bài toán có điều kiện "mảng tăng dần", bước nào trong hàm generate() là bắt buộc?',
        options: [
          'Gọi sort() mảng trước khi in ra file .inp',
          'In mảng ngẫu nhiên mà không cần sắp xếp',
          'Chỉ sinh mảng có 1 phần tử',
          'Đảo ngược mảng'
        ],
        correct: 0,
        explain: 'Nếu không sort mảng tăng dần trước khi in ra file .inp, test sinh ra sẽ vi phạm giả thiết đề bài, khiến code Full dùng chặt nhị phân bị chạy sai oan.'
      },
      {
        q: '3. Khi sinh truy vấn trên đoạn [L, R] của mảng N phần tử, cách viết nào đảm bảo 1 <= L <= R <= N?',
        options: [
          'int L = Rand(1, n); int R = Rand(L, n);',
          'int L = Rand(1, n); int R = Rand(1, n);',
          'int L = 1; int R = n + 1;',
          'int L = Rand(n, 1); int R = Rand(n, 1);'
        ],
        correct: 0,
        explain: 'Bằng cách sinh R trong đoạn [L, n], ta luôn luôn đảm bảo L <= R mà không cần viết thêm điều kiện if (L > R) swap(L, R).'
      },
      {
        q: '4. Kỹ thuật nào giúp biến một bộ sinh test "yếu" (100% đáp án bằng 0) thành bộ sinh test "mạnh" bắt bug hiệu quả?',
        options: [
          'Thu hẹp miền giá trị để tăng tần suất trùng lặp và chủ động ép xác suất truy vấn trúng vào phần tử có trong mảng',
          'Tăng kích thước mảng lên 1 triệu phần tử',
          'Mở rộng miền giá trị lên 10^18',
          'Bỏ không dùng hàm Rand nữa'
        ],
        correct: 0,
        explain: 'Thu hẹp miền giá trị và ép xác suất trúng đích giúp kích hoạt tối đa các nhánh logic xử lý trùng số và tìm thấy của thuật toán, nơi bug thường ẩn nấp.'
      },
      {
        q: '5. Điểm cốt lõi nhất của việc "Tự code máy chấm" trong lập trình thi đấu là gì?',
        options: [
          'Tự động hóa hoàn toàn việc tìm phản ví dụ (counterexample) để sửa bug trước khi nộp bài, biến điểm 0 thành điểm tuyệt đối',
          'Để khoe với bạn bè là mình biết nhiều thư viện C++',
          'Để làm cho máy tính chạy chậm lại',
          'Để thay thế hoàn toàn việc học thuật toán'
        ],
        correct: 0,
        explain: 'Stress testing giúp coder chủ động tạo ra hàng nghìn test bẫy để phát hiện và vá mọi lỗ hổng thuật toán ngay trong phòng thi trước khi nộp lên hệ thống chấm chính thức.'
      }
    ]
  }
];


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
            <span class="discussion-label">💬 Câu hỏi thảo luận trên lớp</span>
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

  
  function triggerMathRender() {
    if (typeof renderMathInElement === 'function' && typeof document !== 'undefined' && document.body) {
      try {
        renderMathInElement(document.body, {
          delimiters: [
            { left: '24', right: '24', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn('KaTeX render error:', err);
      }
    }
  }
  window.triggerMathRender = triggerMathRender;

  function renderAll() {
    renderNav();
    renderMainContent();
    triggerMathRender();
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
