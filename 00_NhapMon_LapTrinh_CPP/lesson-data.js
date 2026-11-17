/**
 * DỮ LIỆU BÀI GIẢNG 00: NHẬP MÔN LẬP TRÌNH C++ (MOD-Pre)
 * Triết lý Problem-First: Tiệm Bánh Mì & Anh Phụ Bếp Thật Thà
 * Tuân thủ chuẩn CP nhẹ nhàng (#include <bits/stdc++.h> + using namespace std;) và ranh giới Pha 1 Lớp 9.
 */
(function() {
  const LESSON_DATA = {
    id: 'nhap_mon_cpp',
    number: 'Bài Học 00',
    shortTitle: 'Nhập Môn Lập Trình C++',
    title: 'Nhập Môn Lập Trình C++ — Bản Chất Giao Tiếp & Tiệm Bánh Mì Của Anh Phụ Bếp Thật Thà',
    lead: 'Hiểu từ gốc rễ: Lập trình không phải là học vẹt cú pháp, mà là nghệ thuật chỉ dẫn một người phụ việc ngây ngô. Giải phẫu Tủ Đồ Nghề #include <bits/stdc++.h>, Cánh Cửa Chính main(), Tiếng Chuông (;), Hộp Biến RAM và Kênh Giao Tiếp cin/cout.',
    modules: [
      // ============================================================================
      // MODULE 1: VẤN ĐỀ NHỎ 1: RANH GIỚI KHẨU LỆNH & CỬA BẮT ĐẦU CA LÀM
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Cửa Chính main() & Chuông Ngắt Lệnh ;',
        title: 'Vấn Đề Nhỏ 1: Ranh Giới Khẩu Lệnh & Cửa Bắt Đầu Ca Làm Việc',
        lead: 'Khám phá lý do vì sao máy tính luôn bắt đầu từ hàm main(), tầm quan trọng sống còn của dấu chấm phẩy (;), tủ đồ nghề #include <bits/stdc++.h>, xưởng chung std và lệnh return 0.',
        subproblem: {
          title: 'Làm sao để một người phụ việc ngây ngô biết khi nào bắt đầu làm việc và khi nào dứt một câu dặn?',
          desc: 'Nếu không có quy ước cửa bắt đầu, anh phụ việc sẽ đứng trơ mắt giữa gian bếp ngổn ngang. Nếu không có dấu hiệu ngắt lệnh dứt khoát, anh ấy cứ nghĩ ta đang nói dở câu nên đứng chờ mãi mãi, hoặc gộp mọi chỉ dẫn thành mớ bòng bong hỗn loạn.'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Từ Chiếc Chuông Trong Bếp Đến Cú Pháp C++',
            tag: 'Phương pháp sư phạm',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề & Cách giải quyết trong đời sống</span>
                <p>Bạn thuê một người phụ việc tên là <strong>Anh Thật Thà</strong> để phụ bán tiệm bánh mì. Anh ấy rất khỏe, tính siêu nhanh nhưng chỉ hiểu đúng nghĩa đen từng chữ và <strong>không biết tự đoán mò ý bạn</strong>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Nếu không có Cánh Cửa Chính:</strong> Sáng sớm đến tiệm, anh ấy đứng đực ở cửa nhìn quanh hàng trăm việc (quét nhà, nướng bánh, rửa bát) mà không biết phải làm việc nào trước!</li>
                  <li><strong>Nếu không có Chiếc Chuông Gõ Dứt Lệnh:</strong> Bạn dặn <em>"Lấy bánh mì ra"</em> rồi ngừng 2 giây để thở. Vì không biết bạn đã nói xong chưa, anh ấy cứ đứng bất động chờ bạn nói tiếp mãi mãi!</li>
                  <li><strong>Giải pháp đời sống:</strong> Mở sẵn một <strong>tủ đồ nghề đa năng</strong> trước cửa bếp, quy ước tấm biển <em>"CỬA CA SÁNG"</em> lên gian bếp chính (anh ấy luôn bước vào đây đầu tiên), và treo một <em>Chiếc Chuông Đồng</em> (cứ dặn xong 1 việc, bạn gõ <em>"Reng!"</em> một tiếng để anh ấy bắt tay vào làm ngay).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Diễn đạt chính xác các quy ước đời sống trên bằng đoạn mã C++ gọn sạch chuẩn thi đấu:</p>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    // 1. Dặn in lời chào và GÕ CHUÔNG KẾT THÚC CÂU LỆNH (dấu ;)
    cout &lt;&lt; "Xin chao! Toi la Anh That Tha cham chi!" &lt;&lt; endl;

    // 2. Báo cáo ca làm việc hoàn thành an toàn (mã lỗi số 0)
    return 0;
}</code></pre>
                <p style="margin-top: 8px; font-size: 13.5px; color: var(--muted);">
                  <strong>Cảnh báo sống còn:</strong> Nếu xóa dấu chấm phẩy <code>;</code> ở cuối dòng lệnh, người phụ việc (trình biên dịch) sẽ từ chối làm việc ngay lập tức vì không biết câu dặn đã dừng ở đâu!
                </p>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi & Thuật ngữ (Liên kết ngược về Bước 1)</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>#include &lt;bits/stdc++.h&gt;</code> (Tủ đồ nghề đa năng):</strong> Gói sẵn trọn bộ dụng cụ chuẩn của C++ (loa, khe nhập, chữ viết, toán học...) chỉ trong 1 dòng ở đầu file.</li>
                  <li><strong><code>using namespace std;</code> (Mở xưởng chung <code>std</code>):</strong> Cho phép gọi thẳng <code>cout</code>, <code>cin</code>, <code>endl</code>, <code>string</code> mà không cần viết <code>std::</code> phía trước. <em>(Ghi chú: Ở bài nhập môn này ta chưa cần bật lệnh tăng tốc <code>ios_base</code> — Chương Phụ <code>MOD-CP0</code> ngay sau đây sẽ giải mã kỹ bẫy trùng tên và cách bật Fast I/O!)</em></li>
                  <li><strong>Hàm <code>main()</code> (Căn phòng chỉ huy):</strong> Điểm khởi đầu duy nhất mà máy tính luôn bước vào đầu tiên khi khởi động chương trình.</li>
                  <li><strong>Dấu chấm phẩy <code>;</code> (Tiếng chuông đồng):</strong> Dấu hiệu bắt buộc để dứt điểm một câu lệnh hoàn chỉnh (Statement).</li>
                  <li><strong><code>return 0;</code>:</strong> Lời báo cáo cuối ca làm: "Mọi việc đã hoàn thành trọn vẹn, không xảy ra tai nạn nào (mã số 0)".</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_semicolon',
            title: 'Phòng Thí Nghiệm 1: Tầm Quan Trọng Của Dấu Chấm Phẩy (;)',
            desc: 'Thử nghiệm điều gì xảy ra khi dặn việc có gõ chuông (dấu ;) vs khi quên gõ chuông.',
            toggles: [
              {
                key: 'mode',
                label: 'Tình trạng tiếng chuông dứt lệnh',
                options: [
                  { value: 'has_semi', text: 'Có dấu chấm phẩy ; ở cuối lệnh', kind: 'ok' },
                  { value: 'no_semi', text: 'Quên dấu chấm phẩy ; (Chưa dứt lệnh)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const ok = state.mode === 'has_semi';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
${ok ? '    cout << "Tiem banh mi mo cua!" << endl;' : '    cout << "Tiem banh mi mo cua!" << endl  // QUEN DAU ;'}
    return 0;
}`;
              return {
                code,
                changedLines: [5],
                statusOk: ok,
                statusText: ok ? 'Lệnh hoàn chỉnh: Tiếng chuông vang lên, máy tính in ra thành công' : 'Lỗi cú pháp: Quên gõ chuông ;, máy tính báo lỗi error: expected \';\' before \'return\'',
                console: ok
                  ? '$ g++ main.cpp && ./a.out\nTiem banh mi mo cua!\n[Thanh cong: Chuong trinh chay my man!]'
                  : '$ g++ main.cpp\nmain.cpp:6:5: error: expected \';\' before \'return\'\n    return 0;\n[Loi: May tinh tu choi chay vi khong biet cau lenh truoc ket thuc o dau!]',
                explain: ok
                  ? 'Khi có dấu ;, máy tính hiểu rõ câu lệnh in đã kết thúc, liền thực thi ngay và chuyển sang lệnh return 0.'
                  : 'Vì thiếu dấu ;, máy tính nghĩ rằng câu lệnh in dòng chữ vẫn còn tiếp diễn gộp chung với return 0, tạo thành một mệnh lệnh quái dị không thể dịch nổi!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Quan sát đoạn chương trình C++ dưới đây. Kết quả chính xác hiển thị trên màn hình console khi chạy là gì?',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "A";
    cout << "B" << endl;
    cout << "C";
    return 0;
}`,
            options: [
              'In ra AB trên dòng thứ nhất và in ra C ở đầu dòng thứ hai',
              'In ra A ở dòng đầu, B ở dòng hai và C ở dòng thứ ba',
              'In ra ABC dính liền nhau trên cùng đúng một dòng duy nhất',
              'In ra A ở dòng thứ nhất và BC dính liền nhau ở dòng hai'
            ],
            correct: 0,
            explain: 'Lệnh cout << "A"; chưa có endl nên "B" được nối ngay sau "A" thành "AB". Sau đó gặp endl mới xuống dòng, nên "C" nằm ở dòng thứ hai.'
          },
          {
            type: 'trace',
            q: 'Khi thực thi đoạn code dưới đây, tại sao dòng chữ "Ca 2" hoàn toàn không xuất hiện trên màn hình?',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Ca 1" << endl;
    return 0;
    cout << "Ca 2" << endl;
}`,
            options: [
              'Vì lệnh cout << "Ca 2" thiếu tiền tố std:: ở phía trước',
              'Vì hàm main() kết thúc ngay tại return 0 nên lệnh sau bị bỏ qua',
              'Vì trong một hàm main() chỉ được phép gọi tối đa một lệnh cout',
              'Vì máy tính chỉ đọc dòng đầu tiên rồi tự động xóa dòng cuối cùng'
            ],
            correct: 1,
            explain: 'Lệnh return 0; kết thúc hàm main() và đóng ca làm việc ngay lập tức; mọi câu lệnh nằm phía sau return 0; trong cùng hàm sẽ không bao giờ được chạy.'
          },
          {
            type: 'single',
            q: 'Tại sao trong C++, sau mỗi câu lệnh như cout << "Xin chao"; ta bắt buộc phải đặt dấu chấm phẩy (;)?',
            options: [
              'Vì dấu chấm phẩy như tín hiệu xuống dòng màn hình cho câu thông báo tiếp theo',
              'Vì dấu chấm phẩy dùng để cấp phát thêm một ngăn nhớ mới cho câu lệnh sau',
              'Vì dấu chấm phẩy đóng vai trò chuông dứt lệnh giúp máy tính biết câu đã xong',
              'Vì dấu chấm phẩy là mã khóa bắt buộc để bảo vệ tệp mã nguồn khỏi sao chép'
            ],
            correct: 2,
            explain: 'Dấu chấm phẩy (;) là ranh giới kết thúc của một câu lệnh (Statement) trong C++. Không có nó, trình biên dịch không thể tách biệt hai câu lệnh.'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là ĐÚNG về bộ khung chương trình C++ chuẩn vừa học?',
            options: [
              'Hàm int main() là điểm bắt đầu duy nhất mà máy tính bước vào khi chạy chương trình',
              'Dòng #include <bits/stdc++.h> không kết thúc bằng dấu ; vì là khâu chuẩn bị đồ nghề',
              'Lệnh using namespace std; giúp ta viết gọn cout, cin, endl mà không cần tiền tố std::',
              'Bất kỳ dòng ghi chú nào bắt đầu bằng hai dấu gạch chéo // đều gây lỗi khi biên dịch'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều đúng bản chất. Ý D sai vì dòng chú thích // là ghi chú dành cho con người đọc, trình biên dịch sẽ bỏ qua hoàn toàn.'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: VẤN ĐỀ NHỎ 2: HỘP DÁN NHÃN & BÀI TOÁN CHIA BÁNH MÌ
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Hộp Dán Nhãn & Phép Chia Bánh',
        title: 'Vấn Đề Nhỏ 2: Hỗn Loạn Chứa Đồ & Phân Loại Hộp (Biến & Kiểu Dữ Liệu)',
        lead: 'Khám phá bản chất Biến số là những chiếc hộp dán nhãn trên kệ RAM, sự khác biệt giữa int, double, string và bài học chia bánh mì 5 / 2 = 2.',
        subproblem: {
          title: 'Làm sao để cất giữ dữ liệu không bị rơi vãi, quên mất và tránh đổ nhầm loại đồ đạc?',
          desc: 'Khách mua 3 bánh, giá 15.5 nghìn, tên "An". Nếu không có hộp dán nhãn chuyên biệt, các con số sẽ rơi vãi lung tung khi va vào mép bàn; lấy túi lưới đựng nước sốt sẽ chảy lênh láng, và chia 5 cái bánh cho 2 người trong hộp int sẽ làm mất mẩu bánh lẻ.'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Từ Dàn Hộp Trên Kệ Gỗ Đến Biến Số Trong RAM',
            tag: 'Phương pháp sư phạm',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề & Cách giải quyết trong đời sống</span>
                <p>Khách đến mua 3 chiếc bánh, giá 15.5 nghìn, tên là "An". Nếu không có đồ đựng chuyên dụng:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Anh Thật Thà cầm số 3 ở tay trái, số 15.5 ở tay phải, ngậm tên "An" trong miệng. Va vào mép bàn một cái là rơi vãi sạch trơn hoặc nhầm số lượng thành giá tiền!</li>
                  <li>Nếu lấy túi lưới đựng nước sốt thì sốt chảy lênh láng; lấy lọ thuốc nhỏ mắt nhét cả ổ bánh mì thì nứt vỡ lọ (đựng sai loại đồ).</li>
                  <li><strong>Giải pháp đời sống:</strong> Chuẩn bị sẵn một <strong>Dàn Kệ Gỗ gồm các chiếc hộp dán nhãn</strong>:
                    <br>• Hộp dán nhãn <code>soBanh</code>: Loại hộp gỗ nguyên chỉ đựng số nguyên cái đếm được (1, 2, 3 cái).
                    <br>• Hộp dán nhãn <code>giaTien</code>: Loại hộp có vạch đong đếm số lẻ thập phân (15.5 nghìn).
                    <br>• Hộp dán nhãn <code>tenKhach</code>: Hộp dài đựng mẩu giấy ghi chuỗi chữ viết.
                  </li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Khai báo những chiếc hộp dán nhãn tương ứng trên bộ nhớ RAM (đều có sẵn trong <code>&lt;bits/stdc++.h&gt;</code> và xưởng chung <code>std</code>):</p>
                <pre class="code-pre"><code>int soBanh = 3;         // Hộp số nguyên đếm được (int)
double giaTien = 15.5;  // Hộp số có phần lẻ thập phân (double)
string tenKhach = "An"; // Hộp chuỗi chữ (string)

// Bài toán chia bánh mì:
int chiaNguyen = 5 / 2;      // Kết quả: 2 (Mẩu lẻ 0.5 bị rơi mất ra sàn!)
double chiaThuc = 5.0 / 2.0; // Kết quả: 2.5 (Giữ trọn vẹn mẩu lẻ trong hộp double)</code></pre>
                <p style="margin-top: 8px; font-size: 13.5px; color: var(--muted);">
                  <strong>Quy tắc quan trọng:</strong> Dấu bằng <code>=</code> là hành động xúc dữ liệu bên tay phải đặt gọn vào chiếc hộp dán nhãn bên tay trái!
                </p>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi & Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Biến (Variable):</strong> Một chiếc hộp dán nhãn đặt trên bàn làm việc RAM để lưu trữ dữ liệu, giá trị bên trong có thể thay đổi được.</li>
                  <li><strong>Kiểu dữ liệu (Data Type):</strong> Chủng loại và kích thước của chiếc hộp (<code>int</code> là 4 byte, <code>double</code> là 8 byte).</li>
                  <li><strong>Hiện tượng chia nguyên (Integer Division):</strong> Hai số nguyên chia nhau sẽ cho ra số nguyên, phần thập phân đằng sau bị cắt bỏ hoàn toàn.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_division',
            title: 'Phòng Thí Nghiệm 2: Hiện Tượng Chia Nguyên vs Chia Thực',
            desc: 'Quan sát điều gì xảy ra với mẩu bánh lẻ khi chia 5 cái bánh cho 2 người bằng hộp int vs hộp double.',
            toggles: [
              {
                key: 'type',
                label: 'Loại phép chia sử dụng',
                options: [
                  { value: 'real', text: 'Chia với số thực double (5.0 / 2.0)', kind: 'ok' },
                  { value: 'int', text: 'Chia giữa 2 số nguyên int (5 / 2)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isReal = state.type === 'real';
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
${isReal ? '    double ketQua = 5.0 / 2.0; // Phep chia so thuc' : '    int ketQua = 5 / 2;        // Phep chia so nguyen'}
    cout << "5 chia 2 bang: " << ketQua << endl;
    return 0;
}`;
              return {
                code,
                changedLines: [5],
                statusOk: isReal,
                statusText: isReal ? 'Chính xác: 5 chia 2 bằng 2.5 (giữ trọn vẹn phần lẻ)' : 'Mất phần lẻ: 5 chia 2 chỉ bằng 2 (mẩu bánh 0.5 bị vứt bỏ ra sàn!)',
                console: isReal
                  ? '$ ./a.out\n5 chia 2 bang: 2.5\n[Thanh cong: Hop double giu tron ven phan thap phan!]'
                  : '$ ./a.out\n5 chia 2 bang: 2\n[Canh bao: Hop int chi chua so nguyen, phan .5 bi cat bo hoan toan!]',
                explain: isReal
                  ? 'Khi cả hai số hoặc ít nhất một số mang kiểu double (5.0), máy tính dùng phép chia số thực và lưu trọn vẹn kết quả 2.5 vào hộp double.'
                  : 'Vì 5 và 2 đều là số nguyên, máy tính thực hiện phép chia nguyên lấy thương là 2, phần dư 1 tương ứng 0.5 bị loại bỏ hoàn toàn.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Theo dõi giá trị trong các chiếc hộp ở đoạn code dưới đây. Dòng kết quả chính xác in ra màn hình là gì?',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int a = 7, b = 2;
    int kq1 = a / b;
    double kq2 = a / 2.0;
    cout << kq1 << " " << kq2 << endl;
    return 0;
}`,
            options: [
              'In ra 3.5 3.5 vì cả hai kết quả đều tự động giữ phần thập phân',
              'In ra 3 3 vì cả hai biểu thức đều lấy biến số nguyên a đem chia',
              'In ra 3 3.5 vì kq1 chia nguyên còn kq2 có số thực 2.0 ở mẫu',
              'In ra 4 3.5 vì phép chia 7 / 2 được máy tính làm tròn lên 4'
            ],
            correct: 2,
            explain: 'Ở kq1, cả a và b đều là int nên 7 / 2 = 3 (cắt bỏ phần lẻ). Ở kq2, mẫu số là 2.0 (số thực) nên phép chia trở thành chia số thực: 7 / 2.0 = 3.5.'
          },
          {
            type: 'trace',
            q: 'Quan sát thao tác gán lại giá trị và cắt phần lẻ dưới đây. Giá trị cuối cùng của x và y được in ra là bao nhiêu?',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int x = 10;
    x = x + 5;
    int y = 4.9;
    cout << x << " " << y << endl;
    return 0;
}`,
            options: [
              'In ra 15 4 vì x nhận thêm 5 còn hộp int y cắt bỏ phần lẻ 0.9',
              'In ra 10 4 vì lệnh x = x + 5 không hợp lệ khi cùng tên biến x',
              'In ra 15 5 vì máy tính tự động làm tròn số 4.9 lên thành số 5',
              'In ra 15 4.9 vì giá trị 4.9 vẫn nằm nguyên vẹn bên trong hộp y'
            ],
            correct: 0,
            explain: 'Lệnh x = x + 5 lấy 10 + 5 = 15 bỏ đè vào hộp x. Còn hộp y kiểu int chỉ chứa số nguyên nên phần lẻ .9 của 4.9 bị cắt bỏ hoàn toàn, chỉ còn lại 4.'
          },
          {
            type: 'single',
            q: 'Một học sinh khai báo double tiLe = 5 / 2; rồi in ra màn hình. Tại sao dù đã dùng hộp double mà kết quả vẫn chỉ ra 2 thay vì 2.5?',
            options: [
              'Vì trình biên dịch C++ luôn làm tròn xuống tất cả kết quả của kiểu số thực',
              'Vì phép chia 5 / 2 ở vế phải thực hiện giữa hai số nguyên trước khi bỏ vào hộp',
              'Vì kiểu double trong C++ chỉ chứa được phần nguyên của các số dương nhỏ hơn 10',
              'Vì dấu bằng = bị đảo ngược hướng gán từ hộp tiLe sang hằng số ở bên phải'
            ],
            correct: 1,
            explain: 'Máy tính luôn tính xong biểu thức vế phải (5 / 2 = 2 theo phép chia nguyên) rồi mới xúc kết quả 2 đặt vào hộp double tiLe! Để ra 2.5, phải viết 5.0 / 2 hoặc 5 / 2.0.'
          },
          {
            type: 'multiple',
            q: 'Những quy tắc nào sau đây là ĐÚNG về biến và kiểu dữ liệu cơ bản trong C++?',
            options: [
              'Kiểu int dùng để lưu số nguyên đếm được, còn kiểu double dùng để lưu số có phần lẻ thập phân',
              'Kiểu char chỉ chứa đúng 1 ký tự đặt trong nháy đơn, còn string chứa chuỗi chữ trong nháy kép',
              'Phép gán = có nghĩa là lấy giá trị ở biểu thức bên phải đặt vào chiếc hộp mang tên ở bên trái',
              'Kiểu bool dùng để lưu cả một đoạn văn bản dài chứa nhiều dấu cách và ký tự đặc biệt'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều chính xác. Ý D sai vì bool chỉ lưu 2 trạng thái đúng/sai (true/false), còn đoạn chữ mới dùng string.'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: VẤN ĐỀ NHỎ 3 & GHÉP LẠI: KÊNH GIAO TIẾP 2 CHIỀU & TIỆM BÁNH MÌ
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Loa cout & Khe cin (Tiệm Bánh Mì)',
        title: 'Vấn Đề Nhỏ 3 & Ghép Lại: Kênh Giao Tiếp Hai Chiều & Tiệm Bánh Mì Hoàn Chỉnh',
        lead: 'Làm chủ cơ chế đưa dữ liệu ra ngoài qua Loa phát thanh cout << và nhận dữ liệu vào qua Khe trượt cin >>. Ghép toàn bộ kiến thức thành ứng dụng Tiệm Bánh Mì.',
        subproblem: {
          title: 'Làm sao để người trong bếp giao tiếp 2 chiều với khách bên ngoài mà không bị nhầm lẫn chiều đưa đồ?',
          desc: 'Nếu không có loa thông báo, anh phụ bếp làm xong cũng giấu tiệt trong góc không ai thấy. Nếu không có khe nhận phiếu, khách không cách nào đưa số lượng bánh mong muốn vào bếp. Chiều mũi tên << và >> giúp định hướng luồng dữ liệu chính xác tuyệt đối.'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Từ Khe Nhận Phiếu & Chiếc Loa Đến Luồng cin/cout',
            tag: 'Phương pháp sư phạm',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Vấn đề & Cách giải quyết trong đời sống</span>
                <p>Gian bếp được xây kín tường để bảo đảm an toàn vệ sinh. Để tương tác với dòng người mua bánh bên ngoài:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Loa Phát Thanh (Đẩy thông điệp ra ngoài):</strong> Bạn lắp một chiếc loa hướng miệng ra ngoài bệ cửa sổ. Mỗi khi cần chào khách hay báo tổng tiền, anh phụ bếp chỉ việc đẩy câu chữ vào miệng loa. Âm thanh sẽ bay theo một chiều từ trong bếp vang ra ngoài màn hình.</li>
                  <li><strong>Khe Nhận Phiếu Order (Hút thông tin vào trong):</strong> Bạn khoét một khe trượt nhỏ ở mép cửa. Khách ghi tên và số bánh vào phiếu rồi nhét qua khe. Mẩu phiếu sẽ trượt theo một chiều từ bàn phím bên ngoài rót thẳng vào chiếc hộp dán nhãn trong bếp.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Quy ước hướng mũi tên của luồng I/O trong C++ (đã có sẵn nhờ <code>#include &lt;bits/stdc++.h&gt;</code> và <code>using namespace std;</code>):</p>
                <pre class="code-pre"><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    string tenKhach;
    int soBanh;
    double giaTien = 15.5;

    // Loa phát thanh (cout): Mũi tên &lt;&lt; bắn chữ ra ngoài loa màn hình
    cout &lt;&lt; "Nhap ten cua ban: ";

    // Khe nhận phiếu (cin): Mũi tên &gt;&gt; rót dữ liệu từ bàn phím vào hộp tenKhach
    cin &gt;&gt; tenKhach;

    cout &lt;&lt; "Nhap so banh: ";
    cin &gt;&gt; soBanh;

    double tongTien = soBanh * giaTien;
    cout &lt;&lt; "Tong tien: " &lt;&lt; tongTien &lt;&lt; " nghin dong." &lt;&lt; endl;
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi & Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>cout &lt;&lt;</code> (Console Output):</strong> Miệng loa phát thanh. Mũi tên <code>&lt;&lt;</code> thể hiện hướng dòng dữ liệu được đẩy từ bộ nhớ ra màn hình.</li>
                  <li><strong>Băng chuyền nối nhiều <code>&lt;&lt;</code>:</strong> Bạn có thể dùng nhiều mũi tên <code>&lt;&lt;</code> liên tiếp như các toa tàu để đẩy một chuỗi: câu chào &rarr; giá trị trong hộp &rarr; lệnh xuống dòng cùng một lúc.</li>
                  <li><strong><code>cin &gt;&gt;</code> (Console Input):</strong> Khe nhận dữ liệu. Mũi tên <code>&gt;&gt;</code> thể hiện hướng dòng dữ liệu từ bàn phím chảy xuôi rót vào trong chiếc hộp biến.</li>
                  <li><strong><code>endl</code> (End Line):</strong> Dặn loa phát thanh xuống dòng và dọn sạch hàng đợi thông báo. <em>(Ở Chương Phụ <code>MOD-CP0</code>, bạn sẽ học cách thay <code>endl</code> bằng <code>'\\n'</code> cùng <code>ios_base</code> để tăng tốc khi đi thi!)</em></li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_bakery_app',
            title: 'Phòng Thí Nghiệm 3: Mô Phỏng Tiệm Bánh Mì Tương Tác',
            desc: 'Thay đổi đơn đặt hàng của khách hàng để xem anh phụ bếp tính toán và in hóa đơn ra loa phát thanh.',
            toggles: [
              {
                key: 'order',
                label: 'Đơn hàng của khách',
                options: [
                  { value: 'order1', text: 'Khách "An" mua 2 chiếc bánh', kind: 'ok' },
                  { value: 'order2', text: 'Khách "Nam" mua 5 chiếc bánh', kind: 'ok' },
                  { value: 'order3', text: 'Khách "Linh" mua 10 chiếc bánh', kind: 'ok' }
                ]
              }
            ],
            build(state) {
              const orders = {
                order1: { name: 'An', qty: 2, total: 31.0 },
                order2: { name: 'Nam', qty: 5, total: 77.5 },
                order3: { name: 'Linh', qty: 10, total: 155.0 }
              };
              const cur = orders[state.order] || orders.order1;
              const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    string tenKhach = "${cur.name}";
    int soBanh = ${cur.qty};
    double donGia = 15.5;

    double tongTien = soBanh * donGia;

    cout << "HOA DON TIEM BANH MI" << endl;
    cout << "Khach hang: " << tenKhach << endl;
    cout << "So luong  : " << soBanh << " chiec" << endl;
    cout << "Tong tien : " << tongTien << " nghin dong." << endl;
    return 0;
}`;
              return {
                code,
                changedLines: [5, 6, 9],
                statusOk: true,
                statusText: `Đã tính toán thành công đơn hàng cho khách ${cur.name}: ${cur.qty} chiếc bánh`,
                console: `$ ./tiemBanhMi\nHOA DON TIEM BANH MI\nKhach hang: ${cur.name}\nSo luong  : ${cur.qty} chiec\nTong tien : ${cur.total} nghin dong.\n[Thanh cong: Hoa don da duoc loa phat thanh thong bao ro rang!]`,
                explain: `Anh phụ bếp lấy số bánh trong hộp soBanh (${cur.qty}) nhân với đơn giá 15.5, múc kết quả ${cur.total} vào hộp tongTien, rồi dùng cout << đẩy từng dòng thông tin ra ngoài màn hình.`
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Nếu người dùng nhập từ bàn phím: "4 15.5", đoạn chương trình dưới đây sẽ in ra màn hình dòng kết quả nào?',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int soBanh;
    double gia;
    cin >> soBanh >> gia;
    double tong = soBanh * gia;
    cout << soBanh << " banh = " << tong << endl;
    return 0;
}`,
            options: [
              'In ra: 4 banh = 62 (vì 4 nhân 15.5 bằng 62.0 nên cout in gọn là 62)',
              'In ra: 4 banh = 60 (vì biến soBanh kiểu int ép mất phần lẻ của gia)',
              'In ra: 15.5 banh = 62 (vì lệnh cin đọc giá trị thập phân vào trước)',
              'Báo lỗi runtime vì không thể nhân biến kiểu int với biến kiểu double'
            ],
            correct: 0,
            explain: 'Khe cin đọc số đầu tiên 4 vào hộp soBanh, số thứ hai 15.5 vào hộp gia. Biểu thức 4 * 15.5 cho kết quả double là 62 (in mặc định gọn là 62).'
          },
          {
            type: 'trace',
            q: 'Cho dữ liệu đầu vào từ bàn phím là: "An 14". Hãy trace xem đoạn code sau sẽ in ra chính xác chuỗi nào?',
            traceCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string ten;
    int tuoi;
    cin >> ten >> tuoi;
    cout << "Chao " << ten << ", sang nam " << tuoi + 1 << endl;
    return 0;
}`,
            options: [
              'Chao ten, sang nam tuoi + 1',
              'Chao An, sang nam 14',
              'Chao An, sang nam 141',
              'Chao An, sang nam 15'
            ],
            correct: 3,
            explain: 'Hộp ten nhận "An", hộp tuoi nhận 14. Biểu thức tuoi + 1 tính ra 15. Băng chuyền cout nối lần lượt các đoạn chữ và giá trị trong hộp thành: "Chao An, sang nam 15".'
          },
          {
            type: 'single',
            q: 'Một lập trình viên mới học viết dòng lệnh: cin << soBanh;. Trình biên dịch C++ sẽ phản ứng thế nào?',
            options: [
              'Báo lỗi biên dịch ngay vì cin chỉ đi với mũi tên hút >> chứ không đi với <<',
              'Vẫn chạy bình thường vì hai dấu << và >> có thể thay thế cho nhau tùy ý thích',
              'Chương trình vẫn chạy nhưng tự động in giá trị trong hộp soBanh ra màn hình',
              'Chương trình đứng im chờ mãi mãi vì dữ liệu chảy ngược ra phía bàn phím'
            ],
            correct: 0,
            explain: 'cin chỉ đi với toán tử trích luồng >> (stream extraction). Dùng << với cin là sai cú pháp và gây lỗi biên dịch ngay.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là ĐÚNG về luồng giao tiếp cin và cout khi làm bài trên máy chấm tự động (OJ)?',
            options: [
              'Trên máy chấm tự động, chỉ in đúng đáp án đề yêu cầu chứ không in thêm câu mời "Nhap a:"',
              'Ta có thể nối nhiều cặp >> liên tiếp như cin >> a >> b; để đọc lần lượt hai số cách nhau bởi dấu cách',
              'Toán tử << đẩy dữ liệu ra loa cout, còn toán tử >> hút dữ liệu từ bàn phím vào biến',
              'Bắt buộc phải viết mỗi giá trị cần in thành một câu lệnh cout riêng rẽ ở mỗi dòng code'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đều đúng. Ý D sai vì băng chuyền << cho phép nối nhiều phần tử trên cùng một câu lệnh cout.'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (PHA 1 - DÀNH CHO NGƯỜI MỚI BẮT ĐẦU)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_pre_semicolon',
        title: 'Bẫy Quên Tiếng Chuông Dứt Lệnh (Dấu Chấm Phẩy ;)',
        description: 'Học sinh viết chương trình chào khách cho Tiệm Bánh Mì, nhưng trình biên dịch dừng ngay lập tức và báo lỗi ngay trước dòng return 0.',
        failingInput: '(Khi biên dịch bằng g++ -std=c++14)',
        failingOutput: "error: expected ';' before 'return'",
        expectedOutput: 'Tiem banh mi mo cua!',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Tiem banh mi mo cua!" << endl
    return 0;
}`,
        bugLine: 5,
        patches: [
          { text: 'Xóa dòng using namespace std; ở dòng 2 để tự động ngắt dòng lệnh' },
          { text: 'Thêm dấu chấm phẩy ; vào cuối dòng 5: cout << "Tiem banh mi mo cua!" << endl;' },
          { text: 'Đổi return 0; ở dòng 6 thành return 1; để bỏ qua lỗi thiếu dấu' }
        ],
        correctPatch: 1,
        explain: 'Dòng 5 thiếu dấu chấm phẩy (;) ở cuối câu lệnh cout, làm máy tính tưởng dòng 5 kéo dài gộp chung với lệnh return 0 ở dòng 6. Thêm dấu ; vào cuối dòng 5 là sửa đúng gốc.'
      },
      {
        id: 'dbg_pre_int_div',
        title: 'Bẫy Chia Nguyên 5 / 2 Làm Mất Phần Thập Phân',
        description: 'Học sinh muốn tính điểm trung bình của 2 bài kiểm tra (4 và 5 điểm). Dù đã khai báo kết quả là double, màn hình vẫn in ra 4 thay vì 4.5!',
        failingInput: 'a = 4, b = 5',
        failingOutput: '4',
        expectedOutput: '4.5',
        buggyCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int a = 4, b = 5;
    double trungBinh = (a + b) / 2; // BUG: Chia 2 so nguyen!
    cout << trungBinh << endl;
    return 0;
}`,
        bugLine: 6,
        patches: [
          { text: 'Sửa dòng 6 thành: double trungBinh = (a + b) / 2.0; để thực hiện phép chia số thực' },
          { text: 'Sửa dòng 6 thành: int trungBinh = (a + b) / 2; để đồng bộ kiểu int cho cả hai vế' },
          { text: 'Sửa dòng 7 thành: cout << trungBinh + 0.0 << endl; để ép in ra phần thập phân' }
        ],
        correctPatch: 0,
        explain: 'Ở dòng 6, (a + b) là 9 (kiểu int) và 2 cũng là số nguyên int, nên phép chia 9 / 2 thực hiện chia nguyên cho ra 4 trước khi đưa vào hộp double. Đổi số 2 thành 2.0 giúp máy tính thực hiện phép chia số thực và giữ trọn kết quả 4.5.'
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
        hint: 'Giới hạn 1 <= A, B <= 1000. Mở khung #include <bits/stdc++.h> và using namespace std;, đọc cin >> a >> b; rồi in đúng cout << a + b << endl; (không in thêm chữ dẫn "Nhap a:").'
      },
      {
        id: 'ABC169-A',
        title: 'A - Multiplication 1',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/abc169/tasks/abc169_a',
        hint: 'Giới hạn 1 <= A, B <= 100. Khai báo 2 hộp int a, b; đọc bằng cin >> a >> b; rồi phát ra loa tích a * b (nhớ trong C++ dùng dấu * cho phép nhân).'
      },
      {
        id: 'ABC180-A',
        title: 'A - box',
        judge: 'AtCoder',
        tier: 1,
        link: 'https://atcoder.jp/contests/abc180/tasks/abc180_a',
        hint: 'Giới hạn 1 <= N <= 100, 1 <= A, B <= 100 (A <= N). Hộp ban đầu có N bóng, lấy ra A quả rồi thêm B quả. Nhập đủ 3 hộp n, a, b và in ra n - a + b.'
      },
      {
        id: 'ABC205-A',
        title: 'A - kcal',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc205/tasks/abc205_a',
        hint: 'Giới hạn 0 <= A, B <= 1000. Mỗi 100 mL có A kcal, suy ra B mL có (A * B) / 100.0 kcal. Hãy chia cho 100.0 (số thực) và lưu vào hộp double để tránh bẫy chia nguyên mất phần lẻ!'
      },
      {
        id: 'ABC186-A',
        title: 'A - Brick',
        judge: 'AtCoder',
        tier: 2,
        link: 'https://atcoder.jp/contests/abc186/tasks/abc186_a',
        hint: 'Giới hạn 1 <= N, W <= 1000. Xe tải chở tối đa N kg, mỗi viên gạch nặng W kg. Đây là lúc tận dụng chính phép chia nguyên N / W giữa 2 hộp int để lấy đúng số viên gạch nguyên vẹn!'
      },
      {
        id: 'ABC202-A',
        title: 'A - Three Dice',
        judge: 'AtCoder',
        tier: 3,
        link: 'https://atcoder.jp/contests/abc202/tasks/abc202_a',
        hint: 'Giới hạn 1 <= a, b, c <= 6. Hai mặt đối diện của xúc xắc chuẩn có tổng bằng 7. Biết 3 mặt trên là a, b, c, tổng 3 mặt đáy là (7 - a) + (7 - b) + (7 - c) — không cần câu lệnh rẽ nhánh!'
      },
      {
        id: 'ABC153-A',
        title: 'A - Serval vs Monster',
        judge: 'AtCoder',
        tier: 3,
        link: 'https://atcoder.jp/contests/abc153/tasks/abc153_a',
        hint: 'Giới hạn 1 <= H, A <= 10^4. Quái vật có H máu, mỗi đòn đánh mất A máu. Để làm tròn lên phép chia H / A mà chưa cần dùng if hay vòng lặp, hãy dùng mẹo chia nguyên (H + A - 1) / A!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
