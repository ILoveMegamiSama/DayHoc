/**
 * DỮ LIỆU BÀI GIẢNG 00: NHẬP MÔN LẬP TRÌNH C++ (MOD-Pre)
 * Triết lý Problem-First: Tiệm Bánh Mì & Anh Phụ Bếp Thật Thà
 */
(function() {
  const LESSON_DATA = {
    id: 'nhap_mon_cpp',
    number: 'Bài Học 00',
    shortTitle: 'Nhập Môn Lập Trình C++',
    title: 'Nhập Môn Lập Trình C++ — Bản Chất Giao Tiếp & Tiệm Bánh Mì Của Anh Phụ Bếp Thật Thà',
    lead: 'Hiểu từ gốc rễ: Lập trình không phải là học vẹt cú pháp, mà là nghệ thuật chỉ dẫn một người phụ việc ngây ngô. Giải phẫu Cánh Cửa Chính main(), Tiếng Chuông Ngắt Lệnh (;), Chiếc Hộp Dán Nhãn RAM và Kênh Giao Tiếp 2 Chiều cin/cout.',
    modules: [
      // ============================================================================
      // MODULE 1: VẤN ĐỀ NHỎ 1: RANH GIỚI KHẨU LỆNH & CỬA BẮT ĐẦU CA LÀM
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Cửa Chính main() & Chuông Ngắt Lệnh ;',
        title: 'Vấn Đề Nhỏ 1: Ranh Giới Khẩu Lệnh & Cửa Bắt Đầu Ca Làm Việc',
        lead: 'Khám phá lý do vì sao máy tính luôn bắt đầu từ hàm main(), tầm quan trọng sống còn của dấu chấm phẩy (;) và câu lệnh báo cáo hoàn thành return 0.',
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
                  <li><strong>Giải pháp đời sống:</strong> Quy ước dán biển <em>"CỬA CA SÁNG"</em> lên gian bếp chính (anh ấy luôn bước vào đây đầu tiên), và treo một <em>Chiếc Chuông Đồng</em> (cứ dặn xong 1 việc, bạn gõ <em>"Reng!"</em> một tiếng để anh ấy bắt tay vào làm ngay).</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Diễn đạt chính xác 3 quy ước đời sống trên bằng đoạn mã C++ chuẩn mực:</p>
                <pre class="code-pre"><code>#include &lt;iostream&gt;

int main() {
    // 1. Dặn in lời chào và GÕ CHUÔNG KẾT THÚC CÂU LỆNH (dấu ;)
    std::cout &lt;&lt; "Xin chao! Toi la Anh That Tha cham chi!" &lt;&lt; std::endl;

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
                  <li><strong>Hàm <code>main()</code> (Căn phòng chỉ huy):</strong> Từ <em>"main"</em> nghĩa là quan trọng nhất. Đây là điểm khởi đầu duy nhất mà máy tính luôn bước vào đầu tiên khi khởi động chương trình.</li>
                  <li><strong>Dấu chấm phẩy <code>;</code> (Tiếng chuông đồng):</strong> Dấu hiệu bắt buộc để dứt điểm một câu lệnh hoàn chỉnh (Statement).</li>
                  <li><strong>Tiền tố <code>std::</code>:</strong> Viết tắt của <em>Standard</em> (Bộ Tiêu Chuẩn Quốc Tế). Dặn anh phụ việc dùng chiếc Loa Chuẩn của C++.</li>
                  <li><strong><code>return 0;</code>:</strong> Lời báo cáo cuối ca làm: "Mọi việc đã hoàn thành trọn vẹn, không xảy ra tai nạn hay đổ vỡ nào (mã số 0)".</li>
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
              const code = `#include <iostream>

int main() {
${ok ? '    std::cout << "Tiem banh mi mo cua!" << std::endl;' : '    std::cout << "Tiem banh mi mo cua!" << std::endl  // QUEN DAU ;'}
    return 0;
}`;
              return {
                code,
                changedLines: [4],
                statusOk: ok,
                statusText: ok ? 'Lệnh hoàn chỉnh: Tiếng chuông vang lên, máy tính in ra thành công' : 'Lỗi cú pháp: Quên gõ chuông ;, máy tính báo lỗi error: expected \';\' before \'return\'',
                console: ok
                  ? '$ g++ main.cpp && ./a.out\nTiem banh mi mo cua!\n[Thanh cong: Chuong trinh chay my man!]'
                  : '$ g++ main.cpp\nmain.cpp:5:5: error: expected \';\' before \'return\'\n    return 0;\n[Loi: May tinh tu choi chay vi khong biet cau lenh truoc ket thuc o dau!]',
                explain: ok
                  ? 'Khi có dấu ;, máy tính hiểu rõ câu lệnh in đã kết thúc, liền thực thi ngay và chuyển sang lệnh return 0.'
                  : 'Vì thiếu dấu ;, máy tính nghĩ rằng câu lệnh in dòng chữ vẫn còn tiếp diễn gộp chung với return 0, tạo thành một mệnh lệnh quái dị không thể dịch nổi!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'concept',
            q: 'Tại sao trong ngôn ngữ C++, sau mỗi câu lệnh như std::cout << "Xin chao"; ta bắt buộc phải đặt dấu chấm phẩy (;)?',
            options: [
              'Vì dấu chấm phẩy đóng vai trò như chiếc chuông dứt lệnh, giúp máy tính biết chắc câu lệnh đã kết thúc trọn vẹn để thực thi mà không bị lẫn sang câu sau.',
              'Vì dấu chấm phẩy đóng vai trò như tín hiệu xuống dòng màn hình, giúp câu thông báo tiếp theo tự động nhảy xuống một hàng mới.',
              'Vì dấu chấm phẩy đóng vai trò như lệnh cấp phát thêm ô nhớ trên RAM, giúp câu thông báo không bị ghi đè lên các câu lệnh trước đó.',
              'Vì dấu chấm phẩy đóng vai trò như mật khẩu bảo mật của hệ điều hành, giúp ngăn chặn người khác đọc trộm mã nguồn C++.'
            ],
            correct: 0,
            explain: 'Dấu chấm phẩy (;) là ranh giới kết thúc của một câu lệnh (Statement) trong C++. Không có nó, máy tính không thể phân định được điểm dừng của mệnh lệnh.'
          },
          {
            type: 'concept',
            q: 'Điều gì sẽ xảy ra nếu một chương trình C++ được viết mà hoàn toàn không có hàm int main() { ... }?',
            options: [
              'Máy tính vẫn biên dịch bình thường nhưng chỉ chạy các dòng khai báo biến mà bỏ qua các dòng lệnh in ấn màn hình.',
              'Trình biên dịch sẽ báo lỗi ngay lập tức vì không tìm thấy Cánh Cửa Chính để biết chương trình phải bắt đầu thực thi từ đâu.',
              'Chương trình sẽ tự động chọn câu lệnh đầu tiên trong tệp mã nguồn làm điểm xuất phát và thực thi bình thường.',
              'Chương trình sẽ tự động tạo một hàm phụ ngầm định để thay thế cho hàm main mà người lập trình không hề hay biết.'
            ],
            correct: 1,
            explain: 'Hàm main() là điểm vào duy nhất (Entry point) bắt buộc của mọi chương trình C++. Thiếu hàm main, trình liên kết (linker) sẽ báo lỗi undefined reference to main.'
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
                <p>Khai báo những chiếc hộp dán nhãn tương ứng trên bộ nhớ RAM:</p>
                <pre class="code-pre"><code>int soBanh = 3;             // Hộp số nguyên đếm được (int)
double giaTien = 15.5;      // Hộp số có phần lẻ thập phân (double)
std::string tenKhach = "An"; // Hộp chuỗi chữ (string)

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
              const code = `#include <iostream>

int main() {
${isReal ? '    double ketQua = 5.0 / 2.0; // Phep chia so thuc' : '    int ketQua = 5 / 2;        // Phep chia so nguyen'}
    std::cout << "5 chia 2 bang: " << ketQua << std::endl;
    return 0;
}`;
              return {
                code,
                changedLines: [4],
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
            type: 'concept',
            q: 'Trong chương trình C++, kết quả in ra màn hình của dòng lệnh std::cout << 7 / 2; là con số nào và vì sao?',
            options: [
              'In ra 3 vì cả 7 và 2 đều là số nguyên, máy tính thực hiện phép chia nguyên và cắt bỏ hoàn toàn phần thập phân 0.5.',
              'In ra 3.5 vì máy tính tự động nhận biết kết quả có phần lẻ và tự động chuyển đổi sang số thực để hiển thị chính xác.',
              'In ra 4 vì máy tính nhận thấy phần thập phân là 0.5 nên tự động làm tròn lên con số nguyên gần nhất là 4.',
              'Báo lỗi biên dịch vì trong C++ không cho phép thực hiện phép chia giữa hai số nguyên nếu kết quả không chia hết.'
            ],
            correct: 0,
            explain: 'Trong C++, phép chia giữa hai số nguyên (int / int) luôn luôn trả về một số nguyên bằng cách bỏ đi phần thập phân. Do đó 7 / 2 = 3.'
          },
          {
            type: 'concept',
            q: 'Một học sinh muốn lưu trữ giá tiền một chiếc bánh mì là 15.5 nghìn đồng, nhưng lại khai báo int giaTien = 15.5;. Điều gì thực sự xảy ra trong bộ nhớ RAM?',
            options: [
              'Chương trình bị sập ngay lập tức khi khởi động vì hộp int hoàn toàn từ chối nhận các giá trị có dấu chấm thập phân.',
              'Chiếc hộp giaTien chỉ lưu con số nguyên 15, phần lẻ 0.5 bị cắt bỏ hoàn toàn vì kiểu int không có ngăn chứa phần thập phân.',
              'Chiếc hộp giaTien sẽ tự động đổi kiểu dữ liệu thành double trong RAM để lưu trữ trọn vẹn con số 15.5.',
              'Chiếc hộp giaTien sẽ tự động làm tròn con số 15.5 thành 16 để bảo đảm con số được lưu là số nguyên lớn hơn.'
            ],
            correct: 1,
            explain: 'Khi gán một số thực vào biến int, hiện tượng ép kiểu ngầm định (truncation) xảy ra: máy tính chỉ lấy phần nguyên 15 và loại bỏ phần lẻ 0.5.'
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
                <p>Quy ước hướng mũi tên của luồng I/O trong C++:</p>
                <pre class="code-pre"><code>#include &lt;iostream&gt;
#include &lt;string&gt;

int main() {
    std::string tenKhach;
    int soBanh;
    double giaTien = 15.5;

    // Loa phát thanh (cout): Mũi tên &lt;&lt; bắn chữ ra ngoài loa màn hình
    std::cout &lt;&lt; "Nhap ten cua ban: ";
    
    // Khe nhận phiếu (cin): Mũi tên &gt;&gt; rót dữ liệu từ bàn phím vào hộp tenKhach
    std::cin &gt;&gt; tenKhach;

    std::cout &lt;&lt; "Nhap so banh: ";
    std::cin &gt;&gt; soBanh;

    double tongTien = soBanh * giaTien;
    std::cout &lt;&lt; "Tong tien: " &lt;&lt; tongTien &lt;&lt; " nghin dong." &lt;&lt; std::endl;
    return 0;
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi & Thuật ngữ</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong><code>std::cout &lt;&lt;</code> (Console Output):</strong> Miệng loa phát thanh. Mũi tên <code>&lt;&lt;</code> thể hiện hướng dòng dữ liệu được đẩy từ bộ nhớ ra màn hình.</li>
                  <li><strong>Băng chuyền nối nhiều <code>&lt;&lt;</code>:</strong> Bạn có thể dùng nhiều mũi tên <code>&lt;&lt;</code> liên tiếp như các toa tàu để đẩy một chuỗi: câu chào $\rightarrow$ giá trị trong hộp $\rightarrow$ lệnh xuống dòng cùng một lúc.</li>
                  <li><strong><code>std::cin &gt;&gt;</code> (Console Input):</strong> Khe nhận dữ liệu. Mũi tên <code>&gt;&gt;</code> thể hiện hướng dòng dữ liệu từ bàn phím chảy xuôi rót vào trong chiếc hộp biến.</li>
                  <li><strong><code>std::endl</code> (End Line):</strong> Dặn loa phát thanh xuống dòng và dọn sạch hàng đợi thông báo.</li>
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
              const code = `#include <iostream>
#include <string>

int main() {
    std::string tenKhach = "${cur.name}";
    int soBanh = ${cur.qty};
    double donGia = 15.5;

    double tongTien = soBanh * donGia;

    std::cout << "HOA DON TIEM BANH MI" << std::endl;
    std::cout << "Khach hang: " << tenKhach << std::endl;
    std::cout << "So luong  : " << soBanh << " chiec" << std::endl;
    std::cout << "Tong tien : " << tongTien << " nghin dong." << std::endl;
    return 0;
}`;
              return {
                code,
                changedLines: [5, 6, 8],
                statusOk: true,
                statusText: `Đã tính toán thành công đơn hàng cho khách ${cur.name}: ${cur.qty} chiếc bánh`,
                console: `$ ./tiemBanhMi\nHOA DON TIEM BANH MI\nKhach hang: ${cur.name}\nSo luong  : ${cur.qty} chiec\nTong tien : ${cur.total} nghin dong.\n[Thanh cong: Hoa don da duoc loa phat thanh thong bao ro rang!]`,
                explain: `Anh phụ bếp lấy số bánh trong hộp soBanh (${cur.qty}) nhân với đơn giá 15.5, múc kết quả ${cur.total} vào hộp tongTien, rồi dùng std::cout << đẩy từng dòng thông tin ra ngoài màn hình.`
              };
            }
          }
        ],
        quiz: [
          {
            type: 'concept',
            q: 'Quan sát hai câu lệnh giao tiếp dưới đây: std::cin >> x; và std::cout << x;. Ý nghĩa chính xác của hướng mũi tên >> và << là gì?',
            options: [
              'Mũi tên >> thể hiện dữ liệu từ bàn phím chảy xuôi rót vào hộp x, còn mũi tên << thể hiện dữ liệu trong hộp x được đẩy bắn vào miệng loa cout để in ra.',
              'Mũi tên >> thể hiện phép so sánh lớn hơn giữa bàn phím và biến x, còn mũi tên << thể hiện phép so sánh nhỏ hơn giữa biến x và màn hình.',
              'Mũi tên >> là câu lệnh dịch chuyển bit nhị phân sang phải của biến x, còn mũi tên << là câu lệnh dịch chuyển bit nhị phân sang trái của biến x.',
              'Mũi tên >> và << chỉ là quy ước ký tự ngẫu nhiên của C++ để phân biệt hai lệnh, hoàn toàn không mang ý nghĩa mô phỏng hướng chuyển động của dữ liệu.'
            ],
            correct: 0,
            explain: 'Toán tử >> trong cin mô phỏng dòng dữ liệu được hút từ luồng vào rót vào biến, còn toán tử << trong cout mô phỏng dòng dữ liệu được đẩy từ biến ra luồng xuất.'
          },
          {
            type: 'concept',
            q: 'Một lập trình viên mới học viết dòng lệnh: std::cin << soBanh;. Trình biên dịch C++ sẽ phản ứng thế nào?',
            options: [
              'Báo lỗi biên dịch ngay lập tức vì cin là luồng nhận dữ liệu vào, bắt buộc phải dùng toán tử trích xuất >> chứ không thể dùng toán tử chèn << của cout.',
              'Vẫn chạy bình thường vì trong C++ hai toán tử << và >> có thể hoán đổi cho nhau mà không làm thay đổi ngữ nghĩa của chương trình.',
              'Chương trình vẫn chạy nhưng sẽ in giá trị của biến soBanh ra bàn phím thay vì nhận giá trị từ bàn phím vào biến.',
              'Chương trình bị treo vô thời hạn vì máy tính cố gắng đẩy dữ liệu ngược vào bên trong các phím bấm cơ học của bàn phím.'
            ],
            correct: 0,
            explain: 'cin chỉ đi với toán tử trích luồng >> (stream extraction operator). Sử dụng << với cin là sai cú pháp và gây ra lỗi biên dịch (no match for operator<<).'
          }
        ]
      }
    ],
    practiceProblems: [
      {
        id: 'MOD-Pre-P01',
        title: 'Tính Chu Vi & Diện Tích Mảnh Vườn',
        judge: 'Thực Hành C++',
        tier: 1,
        link: 'https://oj.vnoi.info/',
        hint: 'Khai báo 2 hộp số thực double dài và rộng. Nhập bằng cin >> dài >> rộng. Tính chu vi = 2 * (dài + rộng), diện tích = dài * rộng rồi dùng cout in ra.'
      },
      {
        id: 'MOD-Pre-P02',
        title: 'Chuyển Đổi Nhiệt Độ Celsius Sang Fahrenheit',
        judge: 'Thực Hành C++',
        tier: 1,
        link: 'https://oj.vnoi.info/',
        hint: 'Công thức F = C * 1.8 + 32. Nhớ dùng kiểu số thực double để không bị hiện tượng mất phần lẻ khi chia số học!'
      },
      {
        id: 'MOD-Pre-P03',
        title: 'Máy Tính Hóa Đơn Mua Sắm Siêu Thị',
        judge: 'Thực Hành C++',
        tier: 1,
        link: 'https://oj.vnoi.info/',
        hint: 'Nhập tên món hàng (string), số lượng (int), đơn giá (double). Tính tổng tiền và in phiếu thanh toán rõ ràng ra màn hình.'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
