/**
 * DỮ LIỆU BÀI GIẢNG 01: ĐỆ QUY & ĐỆ QUY ĐUÔI (TAIL RECURSION)
 */
(function() {
  const LESSON_DATA = {
    id: 'de_quy_duoi',
    number: 'Bài Học 01',
    shortTitle: 'Đệ Quy & Đệ Quy Đuôi',
    title: 'Đệ Quy & Đệ Quy Đuôi (Tail Recursion) — Từ Bản Chất Bộ Nhớ Đến Tối Ưu Hóa Tuyệt Đối',
    lead: 'Hiểu từ gốc rễ: Tại sao máy tính còn nhiều RAM mà hàm đệ quy sâu lại bị sập? Giải phẫu Call Stack, bản chất việc "chờ đợi", cơ chế TCO và cách dùng biến tích lũy để đưa O(N) bộ nhớ về O(1).',
    modules: [
      // ============================================================================
      // MODULE 1: VẤN ĐỀ NHỎ 1: CHIA VIỆC LỚN THÀNH VIỆC NHỎ GIỐNG HỆT
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Chia Nhỏ Việc & Điều Kiện Dừng',
        title: 'Vấn Đề Nhỏ 1: Chia Bài Toán Lớn Thành Bài Toán Con & Điểm Chặn Dừng',
        lead: 'Khám phá cách tư duy phân rã bài toán, cách hàm C++ tự gọi lại chính nó và tầm quan trọng sống còn của Điều kiện dừng.',
        subproblem: {
          title: 'Làm sao để giải quyết một bài toán lớn bằng cách ủy thác cho bài toán nhỏ hơn?',
          desc: 'Nếu cứ ủy thác mãi mà không có điểm dừng, bài toán sẽ rơi vào ngõ cụt lặp vô tận. Ta cần mô hình hóa việc chuyển giao câu hỏi và điểm chặn cuối cùng.'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Từ Chuyện Hỏi Hàng Ghế Đến Khái Niệm Đệ Quy',
            tag: 'Phương pháp sư phạm',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Tình huống đời sống bình thường</span>
                <p>Bạn ngồi trong rạp chiếu phim tối và muốn biết mình đang ngồi ở <strong>hàng ghế số mấy</strong>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Bạn vỗ vai người phía trước hỏi: <em>"Bạn ngồi hàng số mấy?"</em>.</li>
                  <li>Người đó cũng không biết, họ lại quay lên vỗ vai hỏi tiếp người phía trước nữa.</li>
                  <li>Câu hỏi chuyền dần lên tới <strong>người ngồi hàng đầu tiên</strong>. Người này biết ngay mình ở hàng 1 mà không cần hỏi ai.</li>
                  <li>Đáp án được báo ngược về sau: mỗi người lấy số của người trước rồi <strong>cộng thêm 1</strong> để trả lời cho người sau mình.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Diễn đạt quy trình trên bằng một hàm nhận số hiệu và tự gọi lại chính nó:</p>
                <pre class="code-pre"><code>int timHang(int nguoi) {
    // 1. Điểm dừng (Base case): Người hàng đầu biết ngay đáp án
    if (nguoi == 1) return 1;

    // 2. Tự gọi lại chính nó với bài toán nhỏ hơn và cộng dồn khi nhận kết quả
    return timHang(nguoi - 1) + 1;
}</code></pre>
                <p style="margin-top: 8px; font-size: 13.5px; color: var(--muted);">
                  <strong>Cảnh báo sống còn:</strong> Nếu xóa dòng kiểm tra <code>if (nguoi == 1)</code>, hàm sẽ hỏi người 0, người -1... mãi mãi cho đến khi chương trình bị ép dừng!
                </p>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi & Thuật ngữ (Liên kết ngược về Bước 1)</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Đệ quy (Recursion):</strong>
                    <br>• Chữ <em>"Đệ"</em>: Trong tiếng Hán-Việt có nghĩa là chuyển tiếp, nối tiếp nhau theo từng bậc (như đệ trình, sư đệ). Ứng với hành động <strong>vỗ vai chuyền câu hỏi lên người phía trước</strong>.
                    <br>• Chữ <em>"Quy"</em>: Có nghĩa là quay ngược trở về gốc (như quy tụ, hồi quy). Ứng với hành động <strong>chuyền ngược đáp án từ hàng 1 về lại vị trí của bạn</strong>.
                  </li>
                  <li style="margin-top: 8px;"><strong>Điều kiện dừng (Base case):</strong> Ứng với <strong>người ngồi hàng số 1</strong> trong ví dụ, nơi có sẵn đáp số mà không cần chuyền câu hỏi đi tiếp.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_base_case',
            title: 'Phòng Thí Nghiệm 1: Điều Kiện Dừng Của Đệ Quy',
            desc: 'Thử nghiệm điều gì xảy ra khi hàm đệ quy có điểm dừng chuẩn xác vs khi quên điều kiện dừng.',
            toggles: [
              {
                key: 'mode',
                label: 'Tình trạng điểm dừng',
                options: [
                  { value: 'has_base', text: 'Có điều kiện dừng if (n == 1)', kind: 'ok' },
                  { value: 'no_base', text: 'Quên điều kiện dừng (Gọi vô hạn)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const ok = state.mode === 'has_base';
              const code = `#include <iostream>
using namespace std;

int timHang(int n) {
${ok ? '    if (n == 1) return 1; // Base case' : '    // BUG: Thieu dieu kien dung!'}
    return timHang(n - 1) + 1;
}

int main() {
    cout << "Hang cua nguoi thu 4 la: " << timHang(4) << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [5],
                statusOk: ok,
                statusText: ok ? 'Hàm dừng đúng tại n = 1, trả về kết quả 4' : 'Lặp vô tận: n giảm xuống âm mãi mãi gây tràn bộ nhớ',
                console: ok ? '$ ./timHang\nHang cua nguoi thu 4 la: 4\n[Thanh cong: Ket qua chinh xac!]' : '$ ./timHang\nSegmentation fault (core dumped)\n[Loi: Stack Overflow vi goi de quy khong diem dung!]',
                explain: ok
                  ? 'Khi n = 1, hàm lập tức trả về 1, các lời gọi trước lần lượt nhận kết quả và cộng dồn về đáp án.'
                  : 'Vì không có điểm dừng, hàm tiếp tục gọi timHang(0), timHang(-1)... liên tục đẩy các khung nhớ vào Call Stack cho tới khi RAM bị tràn.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Quan sát đoạn code tính giai thừa dưới đây với đầu vào n = 3. Thứ tự các giá trị trả về lần lượt từ sâu nhất về đầu tiên là gì?',
            traceCode: `int giaiThua(int n) {
    if (n <= 1) return 1;
    return n * giaiThua(n - 1);
}`,
            options: [
              'Trả về 1 tại n = 1, kế tiếp trả về 2 tại n = 2, cuối cùng trả về 6 tại n = 3',
              'Trả về 3 tại n = 3, kế tiếp trả về 2 tại n = 2, cuối cùng trả về 1 tại n = 1',
              'Trả về 6 tại n = 3, kế tiếp trả về 2 tại n = 2, cuối cùng trả về 1 tại n = 1',
              'Trả về 1 tại n = 1, kế tiếp trả về 3 tại n = 2, cuối cùng trả về 6 tại n = 3'
            ],
            correct: 0,
            explain: 'Hàm đi sâu xuống n = 1 gặp điểm dừng trả về 1. Sau đó n = 2 tính 2 * 1 = 2 trả về. Cuối cùng n = 3 tính 3 * 2 = 6 trả về cho hàm gọi ban đầu.'
          },
          {
            type: 'trace',
            q: 'Nếu gọi hàm f(4) với định nghĩa dưới đây, giá trị cuối cùng in ra màn hình là bao nhiêu?',
            traceCode: `int f(int n) {
    if (n <= 0) return 0;
    return f(n - 2) + n;
}`,
            options: [
              'Kết quả in ra là 6 vì hàm lần lượt cộng 4 + 2 + 0',
              'Kết quả in ra là 4 vì hàm chỉ chạy một bước n = 4',
              'Kết quả in ra là 8 vì hàm lần lượt cộng 4 + 4 + 0',
              'Kết quả in ra là 10 vì hàm lần lượt cộng 4 + 3 + 2 + 1'
            ],
            correct: 0,
            explain: 'f(4) = f(2) + 4; f(2) = f(0) + 2; f(0) = 0. Tổng thu được: 0 + 2 + 4 = 6.'
          },
          {
            type: 'single',
            q: 'Đặc điểm bắt buộc phải có của một hàm đệ quy hợp lệ trong C++ là gì?',
            options: [
              'Phải có ít nhất một điều kiện dừng để ngắt chuỗi tự gọi lại',
              'Phải luôn luôn khai báo tất cả các tham số là kiểu con trỏ',
              'Phải sử dụng ít nhất hai câu lệnh vòng lặp for ở bên trong',
              'Phải trả về kiểu dữ liệu void chứ không được trả về số nguyên'
            ],
            correct: 0,
            explain: 'Hàm đệ quy bắt buộc phải có ít nhất một điều kiện dừng (base case) để đảm bảo chuỗi lời gọi có điểm kết thúc.'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là ĐÚNG khi nói về cơ chế đệ quy?',
            options: [
              'Mỗi lần gọi đệ quy bài toán phải được thu nhỏ dần về phía điều kiện dừng',
              'Nếu không có điều kiện dừng thì hàm sẽ tự gọi vô hạn và làm sập chương trình',
              'Hàm đệ quy bắt buộc phải chạy nhanh hơn vòng lặp trong mọi trường hợp thực thi',
              'Điểm dừng của đệ quy là nơi bài toán có thể trả về đáp số ngay lập tức'
            ],
            correct: [0, 1, 3],
            explain: 'Các ý A, B, D đều đúng bản chất đệ quy. Ý C sai vì đệ quy thường tốn chi phí gọi hàm và bộ nhớ hơn vòng lặp.'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: VẤN ĐỀ NHỎ 2: TẠI SAO CHỜ ĐỢI LẠI LÀM ĐẦY BỘ NHỚ?
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Call Stack & Stack Overflow',
        title: 'Vấn Đề Nhỏ 2: Call Stack, Bộ Nhớ Đệm & Bí Ẩn Tràn Ngăn Xếp',
        lead: 'Giải phẫu vùng nhớ Call Stack: chuyện gì xảy ra khi mỗi tầng hàm phải ôm một mảnh giấy đứng chờ kết quả?',
        subproblem: {
          title: 'Tại sao máy tính còn hàng Gigabyte RAM mà gọi đệ quy sâu lại bị sập?',
          desc: 'Khi một hàm gọi hàm con mà vẫn còn phép tính dang dở phía sau, khung nhớ của nó không thể giải phóng. Khi xếp chồng quá nhiều khung nhớ, vùng Call Stack bị tràn.'
        },
        cards: [
          {
            heading: 'Cơ Chế Chiếc Khay Phụ Trên Bàn Làm Việc RAM & Nợ Nần Tính Toán',
            tag: 'Bản chất hệ thống',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Tình huống đời sống bình thường</span>
                <p>Khi bạn hỏi người phía trước, bạn <strong>chưa thể bỏ đi</strong>:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Bạn phải đứng nguyên tại chỗ cầm tờ giấy ghi: <em>"Đang nợ phép tính: Lấy kết quả người trước cộng thêm 1"</em>.</li>
                  <li>Người thứ 2 cũng đứng chờ cầm tờ giấy. Người thứ 3 cũng vậy...</li>
                  <li>Nếu hàng có <strong>100.000 người</strong> cùng đứng chờ trong hành lang chật hẹp, hành lang sẽ vỡ trận vì hết chỗ chứa người đứng đợi!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++ (Từ Bàn Làm Việc RAM ở MayCham Đến Chồng Khay)</span>
                <p>Ở bài <strong>Máy Chấm (MOD-00)</strong>, bạn đã biết: <strong>RAM là chiếc bàn làm việc tốc độ cao của CPU</strong>, nơi hàm <code>main()</code> để các biến của nó lên bàn để tính. Bây giờ, chuyện gì xảy ra khi hàm <code>main()</code> gọi hàm con <code>tinhTong(3)</code>?</p>
                <ol style="margin: 8px 0 0 20px; font-size: 14.5px;">
                  <li>Hàm <code>main()</code> <strong>chưa làm xong việc của nó</strong>, nên nó <strong>không được phép xóa đồ trên bàn làm việc</strong>.</li>
                  <li>Để hàm con <code>tinhTong(3)</code> có chỗ làm việc, CPU phải lấy một <strong>"Chiếc khay phụ nhỏ"</strong> kê lên trên chiếc bàn làm việc RAM. Chiếc khay này chứa biến <code>n = 3</code> và tờ giấy nợ: <em>"Sau khi tính xong phải lấy kết quả cộng với 3 rồi báo về main()"</em>.</li>
                  <li>Hàm <code>tinhTong(3)</code> lại gọi <code>tinhTong(2)</code> $\\rightarrow$ CPU lại lấy thêm <strong>chiếc khay phụ thứ hai chồng lên trên chiếc khay thứ nhất</strong>!</li>
                  <li>Cứ mỗi lần gọi đệ quy, CPU lại phải kê thêm một chiếc khay phụ chồng cao dần lên trên chiếc bàn làm việc RAM!</li>
                </ol>
                <pre class="code-pre" style="margin-top: 12px;"><code>| Khay phụ 3: n = 3 (chờ n=2) nợ phép "+ 3" |  <- Đỉnh ngăn xếp
| Khay phụ 2: n = 2 (chờ n=1) nợ phép "+ 2" |
| Khay phụ 1: n = 1 (chờ n=0) nợ phép "+ 1" |
| Khay phụ 0: main() đang chờ               |  <- Đáy ngăn xếp</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi & Thuật ngữ (Liên kết ngược về chiếc bàn làm việc RAM)</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Khung ngăn xếp (Stack Frame):</strong> Chính là <strong>mỗi chiếc khay phụ nhỏ</strong> mà CPU kê thêm lên chiếc bàn làm việc RAM cho từng lượt gọi hàm.</li>
                  <li><strong>Ngăn xếp lời gọi (Call Stack):</strong> Chính là <strong>toàn bộ chồng các chiếc khay phụ</strong> đang xếp lớp trên bàn làm việc RAM.</li>
                  <li><strong>Tràn ngăn xếp (Stack Overflow):</strong> Chiếc bàn làm việc RAM chỉ cho phép chồng khay phụ lên một độ cao giới hạn (thường từ <strong>2 MB đến 8 MB</strong>). Khi bạn để hàm gọi đệ quy sâu $1.000.000$ tầng, chồng khay quá cao sẽ <strong>đổ sập</strong>, hệ điều hành lập tức tắt chương trình để bảo vệ hệ thống!</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_stack_depth',
            title: 'Phòng Thí Nghiệm 2: Giới Hạn Chiều Sâu Của Call Stack',
            desc: 'Quan sát sự khác biệt khi chạy với số tầng gọi nhỏ vs số tầng gọi vượt ngưỡng an toàn.',
            toggles: [
              {
                key: 'depth',
                label: 'Độ sâu đệ quy N',
                options: [
                  { value: 'safe', text: 'N = 10,000 (Trong giới hạn an toàn Call Stack)', kind: 'ok' },
                  { value: 'overflow', text: 'N = 1,000,000 (Vượt ngưỡng Call Stack ~8MB)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isSafe = state.depth === 'safe';
              const nVal = isSafe ? '10000' : '1000000';
              const code = `#include <iostream>
using namespace std;

long long tongThuong(long long n) {
    if (n <= 0) return 0;
    return tongThuong(n - 1) + n; // Con no phep cong + n
}

int main() {
    long long n = ${nVal};
    cout << "Tong 1 den " << n << " la: " << tongThuong(n) << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [10],
                statusOk: isSafe,
                statusText: isSafe ? 'N = 10.000: Chiều sâu Call Stack an toàn, tính ra 50005000' : 'N = 1.000.000: Tràn bộ nhớ Call Stack (Exit code 0xC00000FD)',
                console: isSafe
                  ? `$ ./tongThuong\nTong 1 den 10000 la: 50005000\n[Thanh cong: Call Stack chiem khoang ~320 KB an toan!]`
                  : `$ ./tongThuong\nSegmentation fault (core dumped)\n[Loi: 1 trieu Stack Frame ngon het ~32 MB, vuot tran 8 MB mac dinh!]`,
                explain: isSafe
                  ? 'Với 10.000 tầng gọi, dung lượng Call Stack tiêu tốn chưa tới 1 MB nên chương trình hoàn thành trơn tru.'
                  : 'Với 1.000.000 tầng gọi đệ quy thường, các khung nhớ không được giải phóng xếp chồng vượt quá 8MB của hệ thống dẫn đến Crash ngay lập tức.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Khi hàm đệ quy tong(3) dưới đây đang chạy và vừa chạm tới điều kiện dừng n = 0, có bao nhiêu Stack Frame của hàm tong đang nằm đồng thời trên Call Stack?',
            traceCode: `long long tong(int n) {
    if (n <= 0) return 0;
    return tong(n - 1) + n;
}`,
            options: [
              'Có 4 khung nhớ ứng với n = 3, n = 2, n = 1 và n = 0',
              'Có 1 khung nhớ duy nhất vì máy tính tự ghi đè biến n',
              'Có 3 khung nhớ ứng với n = 3, n = 2 và n = 1 trong ram',
              'Có 0 khung nhớ vì hàm chưa thực hiện phép tính cộng'
            ],
            correct: 0,
            explain: 'Lời gọi bắt đầu từ tong(3), gọi tiếp tong(2), tong(1) và tong(0). Khi ở tong(0), cả 4 tầng gọi này đều đang mở và nằm trên Call Stack.'
          },
          {
            type: 'trace',
            q: 'Quan sát đoạn code dưới đây. Tại thời điểm n = 1 trả về kết quả, giá trị mà khung nhớ của n = 2 đang chờ để hoàn tất phép tính là gì?',
            traceCode: `int tinh(int n) {
    if (n <= 1) return 2;
    return tinh(n - 1) * 3;
}`,
            options: [
              'Khung nhớ n = 2 nhận giá trị 2 từ n = 1 rồi đem nhân với 3 để ra 6',
              'Khung nhớ n = 2 nhận giá trị 3 từ n = 1 rồi đem nhân với 2 để ra 6',
              'Khung nhớ n = 2 nhận giá trị 1 từ n = 1 rồi đem nhân với 3 để ra 3',
              'Khung nhớ n = 2 nhận giá trị 6 từ n = 1 rồi đem cộng với 3 để ra 9'
            ],
            correct: 0,
            explain: 'Khi n = 1, hàm chạm base case trả về 2. Khung nhớ n = 2 đang chờ kết quả này để thực hiện phép tính 2 * 3 = 6.'
          },
          {
            type: 'single',
            q: 'Lý do chính khiến hàm đệ quy thông thường gây lỗi Stack Overflow khi N lớn là gì?',
            options: [
              'Mỗi lần gọi hàm đều tạo thêm Stack Frame mới mà chưa thể giải phóng vì còn nợ phép tính',
              'Do hệ điều hành tự động khóa quyền truy cập của con trỏ khi chương trình chạy quá 1 giây',
              'Do mảng số nguyên bị tràn số khi giá trị vượt qua ngưỡng tối đa của kiểu dữ liệu int',
              'Do CPU không thể thực hiện phép cộng giữa hai số nguyên có giá trị chênh lệch quá xa'
            ],
            correct: 0,
            explain: 'Các Stack Frame bị giữ lại trên RAM vì phép toán sau lời gọi hàm chưa được thực hiện, khiến vùng nhớ Call Stack bị đầy.'
          },
          {
            type: 'multiple',
            q: 'Những yếu tố nào sau đây được lưu trữ bên trong một Khung ngăn xếp (Stack Frame) của hàm C++?',
            options: [
              'Các tham số truyền vào hàm và các biến cục bộ khai báo bên trong hàm',
              'Địa chỉ dòng lệnh cần quay trở về sau khi hàm con kết thúc tính toán',
              'Toàn bộ mã nguồn văn bản gốc dạng chữ cái của file mã nguồn cpp',
              'Các giá trị tính toán trung gian đang chờ thực hiện nốt phép toán'
            ],
            correct: [0, 1, 3],
            explain: 'Stack Frame lưu tham số, biến cục bộ, địa chỉ trả về và giá trị trung gian. Mã nguồn văn bản nằm ở ổ cứng hoặc phần text segment chứ không nằm trong Stack Frame.'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: VẤN ĐỀ NHỎ 3 & GHÉP LẠI: ĐỆ QUY ĐUÔI VÀ BIẾN TÍCH LŨY
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Đệ Quy Đuôi & TCO',
        title: 'Vấn Đề Nhỏ 3 & Ghép Lại: Đệ Quy Đuôi (Tail Recursion) — Không Ai Phải Đứng Chờ',
        lead: 'Đưa lời gọi hàm về vị trí cuối cùng tuyệt đối với Biến tích lũy, kích hoạt Tail Call Optimization (TCO) và công thức chuyển nhanh sang vòng lặp.',
        subproblem: {
          title: 'Làm sao để người gọi hàm không cần phải nợ nần phép tính nào sau khi hàm con chạy xong?',
          desc: 'Ta chuẩn bị một cuốn sổ tổng kết (Biến tích lũy chuyền tay), bàn giao toàn bộ trọng trách cho người tiếp theo và giải phóng ngay khung nhớ hiện tại.'
        },
        cards: [
          {
            heading: 'Biến Tích Lũy (Accumulator) & Cơ Chế Tối Ưu Hóa TCO',
            tag: 'Kỹ thuật cốt lõi',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Tình huống đời sống bình thường</span>
                <p>Làm sao để không ai phải đứng chờ trong hành lang?</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Bạn chuẩn bị sẵn một <strong>Cuốn sổ tổng kết</strong>.</li>
                  <li>Khi vỗ vai người phía trước, bạn ghi luôn vào sổ: <em>"Đến tôi là 1 người rồi nhé"</em>, trao luôn cuốn sổ cho người đó và <strong>bạn đi về nhà nghỉ ngơi ngay lập tức</strong>!</li>
                  <li>Người tiếp theo nhận sổ, cộng thêm họ thành 2, chuyền tiếp cho người trên rồi cũng về nhà luôn.</li>
                  <li>Đến người hàng 1, cuốn sổ đã có sẵn kết quả cuối cùng.</li>
                  <li><strong>Bản chất:</strong> Tại bất kỳ giây nào, trong rạp chỉ có <strong>đúng 1 người</strong> đang cầm sổ làm việc, không ai phải đứng chờ!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Cú pháp đệ quy đuôi chuẩn mực với tham số tích lũy <code>tichLuy</code>:</p>
                <pre class="code-pre"><code>long long tongDuoi(long long n, long long tichLuy = 0) {
    if (n <= 0) return tichLuy; // Co san ket qua trong so

    // Lời gọi đệ quy là hành động CUỐI CÙNG TUYỆT ĐỐI!
    // Phep cong duoc thuc hien TRUOC khi goi ham:
    return tongDuoi(n - 1, tichLuy + n);
}</code></pre>
                <p style="font-size: 13.5px; margin-top: 8px;">
                  Khi biên dịch với cờ <code>-O2</code>, <code>g++</code> tự động chuyển hàm này thành lệnh nhảy vòng lặp trong mã máy (tái sử dụng đúng 1 chiếc khay phụ duy nhất). Gọi $N = 10^8$ lần vẫn chạy êm ru trong vài phần nghìn giây!
                </p>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi & Thuật ngữ (Liên kết ngược về Bước 1)</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Đệ quy đuôi (Tail Recursion):</strong> Chữ <em>"Đuôi"</em> nghĩa là lời gọi hàm nằm ở vị trí chót cùng tuyệt đối, sau khi gọi xong không còn bất kỳ phép tính nào đứng sau.</li>
                  <li><strong>Biến tích lũy (Accumulator):</strong> Chính là <strong>cuốn sổ tổng kết chuyền tay</strong> mang theo kết quả trung gian đẩy dần về phía trước.</li>
                  <li><strong>TCO (Tail Call Optimization):</strong> Trình biên dịch tái sử dụng chính ô nhớ hiện tại thành vòng lặp, tiêu tốn $O(1)$ bộ nhớ!</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_tail_recursion',
            title: 'Phòng Thí Nghiệm 3: Đệ Quy Đuôi vs Đệ Quy Thường Khi N = 10 Triệu',
            desc: 'So sánh trực tiếp giữa việc nợ phép cộng ở ngoài vs tính trước đưa vào biến tích lũy.',
            toggles: [
              {
                key: 'type',
                label: 'Cấu trúc giải thuật',
                options: [
                  { value: 'tail', text: 'Đệ quy đuôi (TCO: O(1) không gian)', kind: 'ok' },
                  { value: 'non_tail', text: 'Đệ quy thường (Nợ phép cộng: O(N) không gian)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isTail = state.type === 'tail';
              const code = `#include <iostream>
using namespace std;

${isTail ? `// ĐỆ QUY ĐUÔI: Không nợ phép tính sau lời gọi
long long tinh(long long n, long long tichLuy = 0) {
    if (n <= 0) return tichLuy;
    return tinh(n - 1, tichLuy + n); // Duoi tuyet doi
}` : `// ĐỆ QUY THƯỜNG: Còn nợ phép cộng + n sau cùng
long long tinh(long long n) {
    if (n <= 0) return 0;
    return tinh(n - 1) + n; // No phep cong
}`}

int main() {
    long long n = 10000000LL; // 10 trieu
    cout << "Ket qua: " << tinh(n${isTail ? ', 0' : ''}) << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: isTail ? [5, 6, 7] : [5, 6, 7],
                statusOk: isTail,
                statusText: isTail ? 'Đệ quy đuôi + cờ -O2: 10 triệu bước chạy trong 0.01s không tốn thêm 1 byte Stack' : 'Đệ quy thường: 10 triệu tầng gọi lập tức tràn bộ nhớ Stack',
                console: isTail
                  ? `$ g++ -O2 code.cpp -o code\n$ ./code\nKet qua: 50000005000000\n[Thanh cong: TCO da bien ham thanh vong lap while O(1) bo nho!]`
                  : `$ g++ -O2 code.cpp -o code\n$ ./code\nSegmentation fault (core dumped)\n[Loi: 10 trieu Stack Frame lam sap chuong trinh!]`,
                explain: isTail
                  ? 'Vì return tinh(n-1, tichLuy+n) là hành động cuối cùng, g++ tái sử dụng đúng 1 ô nhớ hiện tại cho mọi bước chạy.'
                  : 'Vì còn phép + n phía sau, mỗi bước gọi bắt buộc phải giữ lại khung nhớ trên Call Stack, gây sập bộ nhớ ngay.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Quan sát hàm đệ quy đuôi dưới đây với lệnh gọi f(3, 1). Bảng trace biến (n, tichLuy) qua từng bước cho đến khi return là gì?',
            traceCode: `int f(int n, int tichLuy) {
    if (n <= 1) return tichLuy;
    return f(n - 1, tichLuy * n);
}`,
            options: [
              'Bước 1: (3, 1) -> Bước 2: (2, 3) -> Bước 3: (1, 6) và trả về 6',
              'Bước 1: (3, 1) -> Bước 2: (2, 2) -> Bước 3: (1, 3) và trả về 3',
              'Bước 1: (3, 3) -> Bước 2: (2, 6) -> Bước 3: (1, 6) và trả về 6',
              'Bước 1: (3, 1) -> Bước 2: (2, 1) -> Bước 3: (1, 1) và trả về 1'
            ],
            correct: 0,
            explain: 'Ban đầu n=3, tichLuy=1. Lời gọi tiếp theo: n=2, tichLuy=1*3=3. Lời gọi tiếp: n=1, tichLuy=3*2=6. Tại n=1, hàm trả về ngay 6.'
          },
          {
            type: 'trace',
            q: 'Quan sát 4 cách viết sau. Cách viết nào là ĐỆ QUY ĐUÔI chuẩn xác cho phép compiler tối ưu hóa TCO?',
            options: [
              'return tinhTong(n - 1, tongHienTai + a[n]); // Truyen tong vao tham so',
              'return 1 + tinhTong(n - 1, tongHienTai);     // Con no phep cong voi 1',
              'return tinhTong(n - 1, tongHienTai) * 2;     // Con no phep nhan voi 2',
              'return a[n] + tinhTong(n - 1, tongHienTai); // Con no phep cong voi a[n]'
            ],
            correct: 0,
            explain: 'Chỉ có phương án A là không nợ phép toán nào sau lời gọi hàm. Các phương án B, C, D đều còn phép toán (+ 1, * 2, + a[n]) sau khi hàm con trả về.'
          },
          {
            type: 'single',
            q: 'Cơ chế Tối ưu hóa lời gọi đuôi (Tail Call Optimization - TCO) của compiler thực hiện điều gì trong mã máy?',
            options: [
              'Tái sử dụng chính Stack Frame hiện tại và biến lời gọi đệ quy thành lệnh nhảy vòng lặp',
              'Tự động tăng dung lượng bộ nhớ Call Stack của hệ điều hành lên vô hạn',
              'Lưu trữ tất cả các kết quả trung gian vào một file tạm trên ổ cứng thể rắn',
              'Chuyển toàn bộ các biến số nguyên trong chương trình sang kiểu số thực dấu phẩy động'
            ],
            correct: 0,
            explain: 'TCO phát hiện hàm cha không còn việc gì làm sau lời gọi hàm con nên nó tái sử dụng khung nhớ hiện tại và nhảy lại đầu hàm như vòng lặp.'
          },
          {
            type: 'multiple',
            q: 'Những điều kiện nào sau đây là CẦN THIẾT để một hàm đệ quy được tối ưu hóa theo cơ chế Đệ quy đuôi trong C++?',
            options: [
              'Lời gọi hàm tự thân phải là hành động tính toán cuối cùng tuyệt đối trước khi return',
              'Không được có bất kỳ phép toán nào khác thực hiện trên kết quả trả về của lời gọi đó',
              'Bật cờ tối ưu hóa của trình biên dịch (như cờ -O2 khi biên dịch với g++)',
              'Hàm bắt buộc phải có ít nhất mười tham số đầu vào được khai báo kiểu con trỏ'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C là các điều kiện bắt buộc để TCO hoạt động. Ý D hoàn toàn sai và vô căn cứ.'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC (BUG-HUNTING EXERCISES)
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_tail_1',
        title: 'Bẫy "Tưởng Đuôi Nhưng Không Phải" Trong Hàm Tính Số Chữ Số',
        description: 'Học sinh viết hàm đếm số chữ số của một số nguyên n bằng đệ quy đuôi, nhưng khi chấm với n = 10^18 thì chương trình vẫn bị tràn Stack hoặc chạy sai.',
        failingInput: 'n = 12345',
        failingOutput: 'Chạy sâu và nợ phép tính ở mỗi tầng',
        expectedOutput: 'Đệ quy đuôi thuần túy không nợ phép cộng',
        buggyCode: `int demChuSo(long long n) {
    if (n < 10) return 1;
    return 1 + demChuSo(n / 10);
}`,
        bugLine: 3,
        patches: [
          { text: 'Sửa thành: return demChuSo(n / 10, tichLuy + 1); với hàm có thêm tham số int tichLuy = 1' },
          { text: 'Sửa thành: return demChuSo(n / 10) + 0; để triệt tiêu phép cộng' },
          { text: 'Sửa thành: return (1 + demChuSo(n / 10)) * 1; để ép kiểu giá trị' }
        ],
        correctPatch: 0,
        explain: 'Dòng 3 có phép tính "1 + demChuSo(...)" nghĩa là còn nợ phép cộng 1 sau khi hàm con trả về, nên KHÔNG PHẢI đệ quy đuôi! Bản vá A thêm biến tích lũy tichLuy để đưa phép cộng vào tham số trước khi gọi hàm.'
      },
      {
        id: 'dbg_tail_2',
        title: 'Bẫy Điều Kiện Dừng Sai Trong Hàm Đệ Quy Đuôi Tính Tổng Dãy Số',
        description: 'Hàm đệ quy đuôi tính tổng từ 1 đến n bị tính thiếu số 1 hoặc trả về sai giá trị tích lũy khi n chạm điểm dừng.',
        failingInput: 'n = 3, tichLuy = 0',
        failingOutput: '0 (hoặc vòng lặp không dừng khi n = 0)',
        expectedOutput: '6 (vì 3 + 2 + 1 = 6)',
        buggyCode: `long long tinhTong(int n, long long tichLuy) {
    if (n == 1) return 0; // BUG: Tra ve 0 lam mat sach gia tri tich luy
    return tinhTong(n - 1, tichLuy + n);
}`,
        bugLine: 2,
        patches: [
          { text: 'Sửa dòng 2 thành: if (n <= 0) return tichLuy; để trả về toàn bộ kết quả đã tích lũy' },
          { text: 'Sửa dòng 2 thành: if (n == 1) return 1; để trả về số 1' },
          { text: 'Sửa dòng 2 thành: if (n < 0) return -1; để báo lỗi số âm' }
        ],
        correctPatch: 0,
        explain: 'Trong đệ quy đuôi, kết quả cuối cùng nằm trọn vẹn trong biến tichLuy! Nếu viết "return 0;" hoặc "return 1;" tại điểm dừng, bạn sẽ vứt bỏ toàn bộ công sức cộng dồn từ trước. Phải trả về chính biến tichLuy khi n <= 0.'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN
    // ============================================================================
    practiceProblems: [
      {
        id: 'CSES-1068',
        title: 'Weird Algorithm (Dãy Collatz)',
        judge: 'CSES Problem Set',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1068',
        hint: 'Mỗi bước n chẵn -> n / 2, n lẻ -> 3n + 1. Viết bằng đệ quy đuôi void inDay(long long n) và quan sát compiler khử đệ quy.'
      },
      {
        id: 'VNOJ-GIAITHUA',
        title: 'Tính Giai Thừa Số Lớn & Đệ Quy Đuôi',
        judge: 'VNOJ',
        tier: 1,
        link: 'https://oj.vnoi.info/',
        hint: 'Chuyển hàm tính n! từ đệ quy thường sang đệ quy đuôi có biến tích lũy để tránh Stack Overflow khi n lớn.'
      },
      {
        id: 'CF-1033A',
        title: 'King Escape (Loang Đệ Quy & Khử Tràn Stack)',
        judge: 'Codeforces',
        tier: 2,
        link: 'https://codeforces.com/problemset/problem/1033/A',
        hint: 'Khi loang trên lưới 1000x1000 bằng DFS đệ quy, nếu không tối ưu sẽ bị tràn Call Stack. Hãy áp dụng tư duy khử đệ quy.'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
