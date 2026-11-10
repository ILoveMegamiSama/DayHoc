/**
 * DỮ LIỆU BÀI GIẢNG 02: NGĂN XẾP & NGĂN XẾP ĐƠN ĐIỆU (MONOTONIC STACK)
 */
(function() {
  const LESSON_DATA = {
    id: 'ngan_xep_don_dieu',
    number: 'Bài Học 02',
    shortTitle: 'Ngăn Xếp & Ngăn Xếp Đơn Điệu',
    title: 'Ngăn Xếp & Ngăn Xếp Đơn Điệu (Monotonic Stack) — Từ Bản Chất LIFO Đến Tìm Biên Tuyến Tính O(N)',
    lead: 'Hiểu bản chất từ gốc rễ: Tại sao duyệt trâu mất O(N^2) nhưng chỉ cần loại bỏ những phần tử bị che khuất vĩnh viễn là ta có ngay thuật toán O(N)? Kỹ thuật lưu chỉ số và ứng dụng mở rộng biên.',
    modules: [
      // ============================================================================
      // MODULE 1: VẤN ĐỀ NHỎ 1: LƯU VÀ LẤY PHẦN TỬ VỪA GẶP XONG (LIFO)
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Ngăn Xếp Cơ Bản & Khớp Ngoặc',
        title: 'Vấn Đề Nhỏ 1: Cấu Trúc LIFO — Lấy Ra Phần Tử Vừa Mới Gặp Xong Nhanh Nhất',
        lead: 'Khám phá cấu trúc dữ liệu Ngăn xếp (Stack): mô hình chồng đĩa rửa bát, các thao tác chuẩn và bài toán kiểm tra dãy ngoặc.',
        subproblem: {
          title: 'Làm sao để luôn truy xuất được phần tử gần nhất vừa được xử lý mà không cần tìm kiếm?',
          desc: 'Khi duyệt một chuỗi các sự kiện hoặc dấu ngoặc mở, ta cần cấu trúc dữ liệu cho phép cất giữ và lấy ngay phần tử mới nhất vừa đặt vào để khớp cặp.'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Từ Chồng Đĩa Rửa Bát Đến Thao Tác std::stack',
            tag: 'Cấu trúc dữ liệu',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Tình huống đời sống bình thường</span>
                <p>Quan sát một <strong>chồng đĩa rửa bát</strong> trong gian bếp:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Chiếc đĩa bạn vừa rửa xong sạch sẽ được đặt lên <strong>trên cùng</strong> của chồng đĩa.</li>
                  <li>Khi gia đình dọn cơm ăn, chiếc đĩa được lấy ra đầu tiên chính là <strong>chiếc đĩa đặt vào sau cùng</strong>.</li>
                  <li>Chiếc đĩa đặt vào đầu tiên nằm dưới đáy chỉ được lấy ra khi toàn bộ đĩa phía trên đã lấy hết.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Các thao tác cốt lõi của <code>std::stack</code> trong thư viện <code>&lt;stack&gt;</code>:</p>
                <pre class="code-pre"><code>stack&lt;char&gt; st;
st.push('(');        // Đặt ngoặc '(' lên đỉnh
char c = st.top();   // Xem phần tử ở đỉnh (Cần check !st.empty())
st.pop();            // Lấy phần tử đỉnh ra vứt đi
bool r = st.empty(); // Kiểm tra ngăn xếp có rỗng không</code></pre>
                <p style="margin-top: 8px; font-size: 13.5px; color: var(--muted);">
                  <strong>Cảnh báo sống còn:</strong> Tuyệt đối không gọi <code>st.top()</code> hoặc <code>st.pop()</code> khi <code>st.empty() == true</code>! Điều này sẽ gây lỗi Crash chương trình ngay lập tức.
                </p>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi & Thuật ngữ (Liên kết ngược về Bước 1)</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Ngăn xếp (Stack):</strong> <em>"Ngăn"</em> là nơi chứa, <em>"Xếp"</em> là xếp chồng các phần tử lên nhau từ đáy lên đỉnh.</li>
                  <li><strong>LIFO (Last In, First Out):</strong> <em>"Vào sau - Ra trước"</em>, chiếc đĩa vào sau cùng lấy ra đầu tiên.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_bracket_match',
            title: 'Phòng Thí Nghiệm 1: Thuật Toán Khớp Dãy Ngoặc Hợp Lệ',
            desc: 'Thử nghiệm cơ chế push khi gặp ngoặc mở và pop khi gặp ngoặc đóng tương ứng.',
            toggles: [
              {
                key: 'bracket_case',
                label: 'Chuỗi ngoặc kiểm tra',
                options: [
                  { value: 'valid', text: 'Chuỗi hợp lệ: "{ [ ( ) ] }"', kind: 'ok' },
                  { value: 'wrong_order', text: 'Sai thứ tự lồng: "( [ ) ]"', kind: 'bug' },
                  { value: 'missing_open', text: 'Thừa ngoặc đóng: "())"', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const c = state.bracket_case;
              const isOk = c === 'valid';
              let inputStr = '{[()]}';
              let consoleText = '';
              if (c === 'valid') {
                inputStr = '{[()]}';
                consoleText = `Duyệt '{': push('{') -> Stack: ['{']\nDuyệt '[': push('[') -> Stack: ['{', '[']\nDuyệt '(': push('(') -> Stack: ['{', '[', '(']\nDuyệt ')': top == '(' -> khớp! pop() -> Stack: ['{', '[']\nDuyệt ']': top == '[' -> khớp! pop() -> Stack: ['{']\nDuyệt '}': top == '{' -> khớp! pop() -> Stack: []\nKết thúc: Stack rỗng -> HỢP LỆ!`;
              } else if (c === 'wrong_order') {
                inputStr = '([)]';
                consoleText = `Duyệt '(': push('(') -> Stack: ['(']\nDuyệt '[': push('[') -> Stack: ['(', '[']\nDuyệt ')': top là '[' không khớp với ')'! -> KHÔNG HỢP LỆ!`;
              } else {
                inputStr = '())';
                consoleText = `Duyệt '(': push('(') -> Stack: ['(']\nDuyệt ')': pop() -> Stack: []\nDuyệt ')': Stack rỗng mà gặp ngoặc đóng! -> KHÔNG HỢP LỆ!`;
              }

              const code = `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool hopLe(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if (c == ')' && top != '(') return false;
            if (c == ']' && top != '[') return false;
            if (c == '}' && top != '{') return false;
        }
    }
    return st.empty();
}

int main() {
    string s = "${inputStr}";
    cout << s << ": " << (hopLe(s) ? "HOP LE" : "SAI") << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [21],
                statusOk: isOk,
                statusText: isOk ? 'Chuỗi ngoặc đóng mở đúng chuẩn LIFO' : 'Phát hiện lỗi vi phạm quy tắc đóng mở ngoặc',
                console: consoleText,
                explain: isOk
                  ? 'Mỗi ngoặc mở đều được ghép cặp hoàn hảo với ngoặc đóng gần nhất nhờ cơ chế LIFO của ngăn xếp.'
                  : 'Ngăn xếp phát hiện ngay sự sai lệch về thứ tự đóng mở hoặc sự mất cân bằng số lượng ngoặc.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Quan sát các thao tác ngăn xếp sau: push(1), push(2), pop(), push(3), push(4), pop(). Phần tử đang nằm ở đỉnh ngăn xếp (top) hiện tại là gì?',
            options: [
              'Phần tử 3 đang nằm ở đỉnh ngăn xếp sau khi 4 bị lấy ra',
              'Phần tử 4 đang nằm ở đỉnh ngăn xếp vì vừa được push vào',
              'Phần tử 1 đang nằm ở đỉnh ngăn xếp vì nằm ở đáy từ đầu',
              'Phần tử 2 đang nằm ở đỉnh ngăn xếp vì được push thứ hai'
            ],
            correct: 0,
            explain: 'push(1)->[1]; push(2)->[1,2]; pop()->[1]; push(3)->[1,3]; push(4)->[1,3,4]; pop()->[1,3]. Phần tử đỉnh lúc này là 3.'
          },
          {
            type: 'trace',
            q: 'Khi kiểm tra chuỗi ngoặc s = "(()))" bằng ngăn xếp, chuyện gì xảy ra tại ký tự cuối cùng ở vị trí index 4?',
            options: [
              'Hàm trả về false ngay vì gặp ngoặc đóng mà ngăn xếp đã rỗng',
              'Ngăn xếp tự động bỏ qua ký tự này và tiếp tục chạy đến hết',
              'Ký tự được push vào ngăn xếp và hàm kết luận chuỗi hợp lệ',
              'Chương trình bị sập vì ký tự ngoặc đóng không phải là số'
            ],
            correct: 0,
            explain: 'Hai cặp ngoặc đầu làm ngăn xếp rỗng. Tại ký tự thứ 5 (ngoặc đóng cuối cùng), ngăn xếp đang rỗng nên hàm trả về false.'
          },
          {
            type: 'single',
            q: 'Nguyên tắc cốt lõi LIFO của cấu trúc dữ liệu Ngăn xếp (Stack) có nghĩa là gì?',
            options: [
              'Phần tử được đưa vào ngăn xếp sau cùng sẽ là phần tử được lấy ra đầu tiên',
              'Phần tử có giá trị số học lớn nhất sẽ luôn luôn được ưu tiên lấy ra trước',
              'Phần tử được đưa vào ngăn xếp đầu tiên sẽ luôn luôn được lấy ra đầu tiên',
              'Các phần tử bên trong ngăn xếp luôn được tự động sắp xếp theo thứ tự tăng'
            ],
            correct: 0,
            explain: 'LIFO viết tắt của Last In, First Out: phần tử vào sau cùng sẽ được lấy ra đầu tiên.'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là ĐÚNG về cấu trúc dữ liệu std::stack trong C++?',
            options: [
              'Thao tác thêm phần tử push() và xóa phần tử pop() đều có thời gian O(1)',
              'Gọi st.top() khi st.empty() == true là hành vi nguy hiểm gây lỗi crash',
              'Ta có thể truy cập ngẫu nhiên phần tử ở giữa ngăn xếp bằng cú pháp st[2]',
              'Hàm st.empty() trả về true khi ngăn xếp hiện tại không chứa phần tử nào'
            ],
            correct: [0, 1, 3],
            explain: 'A, B và D đúng. Ý C sai vì std::stack không hỗ trợ toán tử chỉ số [] để truy cập phần tử ở giữa.'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: VẤN ĐỀ NHỎ 2: LOẠI BỎ PHẦN TỬ BỊ CHE KHUẤT (NGĂN XẾP ĐƠN ĐIỆU)
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Kẻ Bị Che Khuất & Monotonic Stack',
        title: 'Vấn Đề Nhỏ 2: Ngăn Xếp Đơn Điệu — Loại Bỏ Những Kẻ Bị Che Khuất Vĩnh Viễn',
        lead: 'Khám phá ý tưởng đột phá: Tại sao một phần tử nhỏ hơn đứng trước một phần tử lớn hơn lại vĩnh viễn không còn giá trị sử dụng?',
        subproblem: {
          title: 'Làm sao để tìm phần tử lớn hơn gần nhất bên trái cho mọi vị trí mà không cần dò ngược từng bước?',
          desc: 'Nếu duy trì các phần tử giảm dần trong ngăn xếp và loại bỏ ngay những phần tử bị phần tử mới che khuất, ta tìm được đáp án ngay trên đỉnh ngăn xếp chỉ trong 1 thao tác.'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Hàng Người Xếp Dọc Đến Vòng Lặp Duy Trì Tính Đơn Điệu',
            tag: 'Thuật toán tối ưu',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Tình huống đời sống bình thường</span>
                <p>Một nhóm người xếp hàng dọc nhìn về phía trước:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Một người mới cao <strong>1m80</strong> bước vào đứng ở vị trí $i$.</li>
                  <li>Những người đứng ngay trước người này chỉ cao <strong>1m60, 1m65</strong>.</li>
                  <li><strong>Hỏi:</strong> Đối với tất cả những người đến sau $i$, liệu có ai còn nhìn thấy các bạn $1m60, 1m65$ nữa không?</li>
                  <li><strong>Trả lời:</strong> <em>Không bao giờ!</em> Người $1m80$ đã che khuất họ hoàn toàn. Do đó, ta có thể mời ngay các bạn bị che khuất rời khỏi danh sách chờ.</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Mã nguồn tìm phần tử lớn hơn gần nhất bên trái:</p>
                <pre class="code-pre"><code>stack&lt;int&gt; st;
for (int i = 0; i &lt; n; i++) {
    // Đuổi tất cả những phần tử bị a[i] che khuất
    while (!st.empty() && st.top() &lt;= a[i]) {
        st.pop();
    }
    // Đỉnh ngăn xếp chính là người cao hơn gần nhất!
    int lonHon = st.empty() ? -1 : st.top();

    // Đẩy a[i] vào để làm người che khuất tiếp theo
    st.push(a[i]);
}</code></pre>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa tên gọi & Thuật ngữ (Liên kết ngược về Bước 1)</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Ngăn xếp đơn điệu (Monotonic Stack):</strong> <em>"Đơn"</em> là một, <em>"Điệu"</em> là chiều hướng. Các phần tử trong ngăn xếp chỉ tăng dần hoặc chỉ giảm dần từ đáy lên đỉnh.</li>
                  <li><strong>Bất biến (Invariant):</strong> Các phần tử trong ngăn xếp luôn giảm dần từ đáy lên đỉnh; đỉnh luôn là phần tử lớn hơn gần nhất.</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_mono_stack_trace',
            title: 'Phòng Thí Nghiệm 2: Mô Phỏng Từng Bước Ngăn Xếp Đơn Điệu',
            desc: 'Quan sát các phần tử bị pop ra khỏi ngăn xếp khi dãy số xuất hiện phần tử lớn hơn.',
            toggles: [
              {
                key: 'input_array',
                label: 'Dãy số kiểm tra',
                options: [
                  { value: 'mix', text: 'Dãy hỗn hợp: [2, 5, 3, 7]', kind: 'ok' },
                  { value: 'desc', text: 'Dãy giảm dần: [9, 8, 5, 2]', kind: 'ok' },
                  { value: 'asc', text: 'Dãy tăng dần: [1, 3, 6, 8]', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const opt = state.input_array;
              let arr = [2, 5, 3, 7];
              let log = '';

              if (opt === 'mix') {
                arr = [2, 5, 3, 7];
                log = `i=0, a[0]=2: Stack rỗng -> L[0]=-1. Push(2) -> Stack: [2]\ni=1, a[1]=5: 2 <= 5 -> pop(2). Stack rỗng -> L[1]=-1. Push(5) -> Stack: [5]\ni=2, a[2]=3: top(5) > 3 -> L[2]=5. Push(3) -> Stack: [5, 3]\ni=3, a[3]=7: 3 <= 7 -> pop(3); 5 <= 7 -> pop(5). Stack rỗng -> L[3]=-1. Push(7) -> Stack: [7]`;
              } else if (opt === 'desc') {
                arr = [9, 8, 5, 2];
                log = `i=0 (9): L[0]=-1 -> Stack: [9]\ni=1 (8): top=9 > 8 -> L[1]=9 -> Stack: [9, 8]\ni=2 (5): top=8 > 5 -> L[2]=8 -> Stack: [9, 8, 5]\ni=3 (2): top=5 > 2 -> L[3]=5 -> Stack: [9, 8, 5, 2]\n(Không có phần tử nào bị pop vì dãy đã giảm dần sẵn)`;
              } else {
                arr = [1, 3, 6, 8];
                log = `i=0 (1): L[0]=-1 -> Stack: [1]\ni=1 (3): pop(1) -> L[1]=-1 -> Stack: [3]\ni=2 (6): pop(3) -> L[2]=-1 -> Stack: [6]\ni=3 (8): pop(6) -> L[3]=-1 -> Stack: [8]\n(Mỗi bước đều đuổi sạch phần tử trước vì phần tử mới luôn lớn hơn!)`;
              }

              const code = `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    vector<int> a = {${arr.join(', ')}};
    stack<int> st;
    for (int x : a) {
        while (!st.empty() && st.top() <= x) st.pop();
        int ans = st.empty() ? -1 : st.top();
        cout << "Phan tu " << x << " -> Lon hon gan nhat: " << ans << "\\n";
        st.push(x);
    }
    return 0;
}`;
              return {
                code,
                changedLines: [7],
                statusOk: true,
                statusText: 'Ngăn xếp duy trì tính đơn điệu giảm dần từ đáy lên đỉnh hoàn hảo',
                console: log,
                explain: 'Các phần tử nhỏ hơn luôn bị loại bỏ ngay lập tức, đảm bảo đỉnh ngăn xếp luôn là phần tử lớn hơn gần nhất.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Với mảng a = [4, 2, 5, 1], khi thuật toán duyệt xong phần tử a[2] = 5, trạng thái các phần tử trong ngăn xếp st là gì?',
            options: [
              'Chỉ có 1 phần tử duy nhất là [5] vì 5 đã pop cả 2 và 4',
              'Có 3 phần tử [4, 2, 5] vì ngăn xếp lưu trữ toàn bộ các số',
              'Có 2 phần tử [4, 5] vì chỉ có số 2 bị phần tử 5 loại bỏ',
              'Ngăn xếp rỗng [] vì phần tử 5 đã làm sạch toàn bộ ngăn xếp'
            ],
            correct: 0,
            explain: 'Tại a[0]=4 -> st=[4]. a[1]=2 -> st=[4, 2]. Tại a[2]=5: 2<=5 -> pop(2); 4<=5 -> pop(4). Cuối cùng push(5) -> st=[5].'
          },
          {
            type: 'trace',
            q: 'Với mảng a = [7, 3, 2, 6], phần tử lớn hơn gần nhất bên trái của phần tử a[3] = 6 là giá trị nào?',
            options: [
              'Là phần tử 7 vì số 2 và số 3 đều đã bị số 6 loại bỏ khỏi stack',
              'Là phần tử 2 vì số 2 là số đứng liền kề ngay bên trái của số 6',
              'Là phần tử 3 vì số 3 là số đứng cách số 6 đúng hai vị trí chỉ số',
              'Không có phần tử nào lớn hơn vì số 6 là số lớn nhất trong cả dãy'
            ],
            correct: 0,
            explain: 'Khi gặp 6: 2<=6 -> pop(2); 3<=6 -> pop(3). Đỉnh stack còn lại là 7 (> 6), nên đáp số là 7.'
          },
          {
            type: 'single',
            q: 'Tại sao việc loại bỏ (pop) một phần tử nhỏ hơn khỏi ngăn xếp đơn điệu không làm mất mát nghiệm cho các phần tử sau?',
            options: [
              'Vì phần tử mới thêm vào vừa đứng gần hơn vừa lớn hơn nên che khuất hoàn toàn phần tử bị pop',
              'Vì các phần tử sau chỉ quan tâm đến các số có giá trị chẵn chứ không quan tâm số lẻ',
              'Vì phần tử bị pop sẽ tự động được hệ điều hành lưu vào một biến phụ khác để tra cứu',
              'Vì thuật toán chỉ áp dụng cho các mảng có kích thước nhỏ hơn hoặc bằng một trăm số'
            ],
            correct: 0,
            explain: 'Phần tử mới lớn hơn và đứng gần hơn, do đó mọi phần tử về sau nếu cần tìm số lớn hơn thì số mới này luôn tốt hơn số bị pop.'
          },
          {
            type: 'multiple',
            q: 'Những nhận định nào sau đây là ĐÚNG về Ngăn xếp đơn điệu (Monotonic Stack)?',
            options: [
              'Nếu cần tìm phần tử lớn hơn gần nhất thì ngăn xếp phải duy trì giảm dần từ đáy lên đỉnh',
              'Nếu cần tìm phần tử nhỏ hơn gần nhất thì ngăn xếp phải duy trì tăng dần từ đáy lên đỉnh',
              'Mỗi phần tử trong mảng được push vào stack đúng 1 lần và pop khỏi stack tối đa 1 lần',
              'Độ phức tạp thời gian luôn là O(N^2) vì có vòng lặp while lồng bên trong vòng lặp for'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đúng. Ý D sai vì độ phức tạp khấu hao là O(N) chứ không phải O(N^2).'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: VẤN ĐỀ NHỎ 3 & GHÉP LẠI: LƯU CHỈ SỐ & MỞ RỘNG BIÊN TRÁI PHẢI
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Lưu Chỉ Số & Mở Rộng Biên',
        title: 'Vấn Đề Nhỏ 3 & Ghép Lại: Lưu Chỉ Số (Index) & Tìm Biên Mở Rộng Hình Chữ Nhật',
        lead: 'Tại sao lưu vị trí i lại vượt trội hơn lưu giá trị A[i]? Cách tìm cả biên trái và biên phải để giải bài toán Histogram trong O(N).',
        subproblem: {
          title: 'Làm sao để vừa biết giá trị vừa tính được khoảng cách độ rộng giữa hai biên?',
          desc: 'Lưu chỉ số i vào ngăn xếp cho phép ta tra cứu ngược lại giá trị A[st.top()] và tính ngay độ rộng khoảng cách R[i] - L[i] - 1.'
        },
        cards: [
          {
            heading: 'Lưu Chỉ Số Vị Trí & Khấu Hao O(N) Trong Bài Toán Histogram',
            tag: 'Ghép nối kỹ thuật',
            html: `
              <div class="step-life">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.book : ''} Bước 1: Tình huống đời sống bình thường</span>
                <p>Khoảng cách và vị trí cột mốc:</p>
                <ul style="margin: 8px 0 0 20px;">
                  <li>Nếu bạn chỉ nhớ <em>"người cao hơn đứng trước cao 1m85"</em>, bạn không biết họ đứng cách bạn bao xa.</li>
                  <li>Nếu bạn ghi nhớ <strong>"người đó đứng ở vị trí cọc số 2"</strong>, bạn biết ngay khoảng cách từ cọc của bạn ($i = 6$) đến họ là: $6 - 2 - 1 = 3$ bước chân!</li>
                </ul>
              </div>

              <div class="step-code">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.code : ''} Bước 2: Ánh xạ vào lập trình C++</span>
                <p>Đẩy chỉ số <code>i</code> vào ngăn xếp thay vì giá trị:</p>
                <pre class="code-pre"><code>stack&lt;int&gt; st; // Lưu CHỈ SỐ i
for (int i = 0; i &lt; n; i++) {
    while (!st.empty() && h[st.top()] &gt;= h[i]) {
        st.pop();
    }
    // L[i] là vị trí đầu tiên bên trái thấp hơn h[i]
    L[i] = st.empty() ? -1 : st.top();
    st.push(i);
}</code></pre>
                <p style="font-size: 13.5px; margin-top: 8px;">
                  Diện tích hình chữ nhật lớn nhất tạo bởi cột $h[i]$: $\\text{DienTich} = h[i] \\times (R[i] - L[i] - 1)$.
                </p>
              </div>

              <div class="step-term">
                <span class="step-badge">${window.CP_ICONS ? window.CP_ICONS.info : ''} Bước 3: Giải nghĩa thuật ngữ & Độ phức tạp (Liên kết ngược về Bước 1)</span>
                <ul style="margin: 8px 0 0 20px;">
                  <li><strong>Độ phức tạp khấu hao (Amortized O(1)):</strong> Mỗi chỉ số chỉ vào stack 1 lần và ra tối đa 1 lần. Tổng số thao tác pop trên cả $N$ bước $\\le N$. Tổng chi phí: $2N$ thao tác $\\rightarrow O(N)$!</li>
                </ul>
              </div>
            `
          }
        ],
        sandboxes: [
          {
            id: 'sb_histogram_calc',
            title: 'Phòng Thí Nghiệm 3: Tính Hình Chữ Nhật Lớn Nhất Trong Histogram',
            desc: 'Quan sát biên trái L[i] và biên phải R[i] được tính độc lập bằng Monotonic Stack.',
            toggles: [
              {
                key: 'hist_case',
                label: 'Bộ dữ liệu cột',
                options: [
                  { value: 'classic', text: 'Kinh điển: {2, 1, 5, 6, 2, 3} (Max = 10)', kind: 'ok' },
                  { value: 'flat', text: 'Các cột bằng nhau: {4, 4, 4, 4} (Max = 16)', kind: 'ok' }
                ]
              }
            ],
            build(state) {
              const isClassic = state.hist_case === 'classic';
              const hArr = isClassic ? [2, 1, 5, 6, 2, 3] : [4, 4, 4, 4];
              const ansVal = isClassic ? 10 : 16;
              const log = isClassic
                ? `Cột h[2]=5: Biên trái L=1, Biên phải R=4 -> Rộng = 4-1-1 = 2 -> DT = 5 * 2 = 10\nCột h[3]=6: Biên trái L=2, Biên phải R=4 -> Rộng = 4-2-1 = 1 -> DT = 6 * 1 = 6\n-> Diện tích lớn nhất toàn bảng: 10!`
                : `Tất cả cột cao 4, mở rộng trọn vẹn cả 4 cột -> DT = 4 * 4 = 16!`;

              const code = `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    vector<long long> h = {${hArr.join(', ')}};
    int n = h.size();
    vector<int> L(n), R(n);
    stack<int> st;

    for (int i = 0; i < n; i++) {
        while (!st.empty() && h[st.top()] >= h[i]) st.pop();
        L[i] = st.empty() ? -1 : st.top();
        st.push(i);
    }
    while (!st.empty()) st.pop();
    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && h[st.top()] >= h[i]) st.pop();
        R[i] = st.empty() ? n : st.top();
        st.push(i);
    }
    long long ans = 0;
    for (int i = 0; i < n; i++) ans = max(ans, h[i] * (R[i] - L[i] - 1));
    cout << "Dien tich max: " << ans << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [7],
                statusOk: true,
                statusText: 'Tìm biên trái và biên phải trong O(N) hoàn toàn chính xác',
                console: log,
                explain: 'Cột h[2]=5 và h[3]=6 kết hợp thành hình chữ nhật chiều cao 5, chiều rộng 2, diện tích 10 là đáp án tối ưu.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Với cột i có chiều cao h[i] = 4, biên trái L[i] = 1 và biên phải R[i] = 5 (nghĩa là cọc 1 và cọc 5 thấp hơn 4). Độ rộng của hình chữ nhật tạo bởi cột i là bao nhiêu?',
            options: [
              'Độ rộng là 3 vì công thức khoảng cách giữa hai biên là 5 - 1 - 1 = 3',
              'Độ rộng là 4 vì lấy trực tiếp chỉ số biên phải trừ chỉ số biên trái là 5 - 1 = 4',
              'Độ rộng là 5 vì lấy trực tiếp giá trị của biên phải R[i] là 5',
              'Độ rộng là 2 vì lấy chỉ số biên phải trừ biên trái rồi trừ tiếp 2 đơn vị'
            ],
            correct: 0,
            explain: 'Khoảng cách giữa hai cọc L và R không tính hai đầu cọc là (R - L - 1) = 5 - 1 - 1 = 3.'
          },
          {
            type: 'trace',
            q: 'Cho mảng a = [3, 1, 4]. Khi tính biên trái nhỏ hơn bằng cách lưu chỉ số vào stack, mảng L[] thu được là gì?',
            options: [
              'Mảng L là [-1, -1, 1] vì chỉ có số 4 nhìn thấy số 1 ở vị trí index 1',
              'Mảng L là [-1, 0, 1] vì số 1 nhìn thấy số 3 ở ngay vị trí index 0',
              'Mảng L là [0, 1, 2] vì lưu lại chính các chỉ số vị trí ban đầu của mảng',
              'Mảng L là [-1, -1, -1] vì không có số nào nhỏ hơn các số đứng trước nó'
            ],
            correct: 0,
            explain: 'a[0]=3: L[0]=-1. a[1]=1: 3>=1 -> pop(0), stack rỗng -> L[1]=-1. a[2]=4: top=1 (a[1]=1 < 4) -> L[2]=1. Mảng L là [-1, -1, 1].'
          },
          {
            type: 'single',
            q: 'Lý do quan trọng nhất khiến ta nên đẩy CHỈ SỐ i vào ngăn xếp thay vì đẩy giá trị A[i] là gì?',
            options: [
              'Lưu chỉ số vừa biết được vị trí để tính khoảng cách vừa tra cứu được giá trị A[i]',
              'Lưu chỉ số giúp chương trình tiết kiệm được một nửa dung lượng RAM của CPU',
              'Lưu chỉ số bắt buộc máy tính phải chạy với tốc độ xung nhịp cao hơn bình thường',
              'Lưu chỉ số giúp compiler tự động chuyển mã nguồn sang ngôn ngữ lập trình Python'
            ],
            correct: 0,
            explain: 'Từ chỉ số i ta tra cứu được giá trị A[i] qua mảng, đồng thời tính được khoảng cách (i - top) mà lưu giá trị thuần túy không làm được.'
          },
          {
            type: 'multiple',
            q: 'Những yếu tố nào sau đây giải thích tại sao thuật toán Ngăn xếp đơn điệu có độ phức tạp O(N)?',
            options: [
              'Mỗi phần tử trong dãy chỉ được đẩy (push) vào ngăn xếp đúng 1 lần duy nhất',
              'Mỗi phần tử khi đã bị lấy ra (pop) khỏi ngăn xếp thì vĩnh viễn không bao giờ bị pop lại',
              'Tổng số thao tác pop trên toàn bộ N bước lặp của chương trình không bao giờ vượt quá N',
              'Vòng lặp while bên trong luôn được bảo đảm chạy đúng một số lần cố định là 10'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C chứng minh tính chất khấu hao O(N). Ý D sai vì số lần chạy vòng while biến thiên tùy bước nhưng tổng số lần chạy <= N.'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_mono_1',
        title: 'Bẫy Quên Kiểm Tra Ngăn Xếp Rỗng Trước Khi Gọi st.top()',
        description: 'Học sinh viết vòng lặp pop các phần tử nhỏ hơn, nhưng quên kiểm tra !st.empty() làm chương trình bị Crash (Segmentation fault) ngay ở phần tử đầu tiên.',
        failingInput: 'a = [5, 2, 8]',
        failingOutput: 'Segmentation fault (core dumped)',
        expectedOutput: 'Chạy an toàn không bị sập',
        buggyCode: `vector<int> timLonHon(vector<int>& a) {
    stack<int> st;
    vector<int> L(a.size());
    for (int i = 0; i < a.size(); i++) {
        while (a[st.top()] <= a[i]) { // BUG: st.top() khi stack rong!
            st.pop();
        }
        L[i] = st.empty() ? -1 : st.top();
        st.push(i);
    }
    return L;
}`,
        bugLine: 5,
        patches: [
          { text: 'Sửa dòng 5 thành: while (!st.empty() && a[st.top()] <= a[i])' },
          { text: 'Sửa dòng 5 thành: while (st.size() >= 0 && a[st.top()] <= a[i])' },
          { text: 'Sửa dòng 5 thành: while (a[st.top()] <= a[i] && !st.empty())' }
        ],
        correctPatch: 0,
        explain: 'Tại i = 0, st đang rỗng! Nếu gọi a[st.top()] trước khi kiểm tra !st.empty(), CPU sẽ đọc vùng nhớ bất hợp pháp dẫn đến Crash. Trong C++, điều kiện (!st.empty() && ...) có cơ chế short-circuit sẽ dừng ngay nếu rỗng.'
      },
      {
        id: 'dbg_mono_2',
        title: 'Bẫy Lưu Giá Trị Thay Vì Lưu Chỉ Số Khi Tính Khoảng Cách',
        description: 'Đề bài yêu cầu tìm khoảng cách từ i đến phần tử lớn hơn gần nhất. Học sinh lưu giá trị a[i] vào stack nên phép trừ khoảng cách ra kết quả sai lệch hoàn toàn.',
        failingInput: 'a = [10, 3, 5], tìm khoảng cách từ a[2]=5 đến số lớn hơn nó',
        failingOutput: 'Khoảng cách = 5 - 10 = -5 (Sai)',
        expectedOutput: 'Khoảng cách = 2 - 0 = 2 (Đúng)',
        buggyCode: `stack<int> st; // Luu gia tri thay vi chi so
for (int i = 0; i < n; i++) {
    while (!st.empty() && st.top() <= a[i]) st.pop();
    int khoangCach = st.empty() ? -1 : (i - st.top()); // BUG: st.top() la gia tri!
    st.push(a[i]);
}`,
        bugLine: 4,
        patches: [
          { text: 'Đổi st.push(i) ở dòng 5 và sửa dòng 3 thành while (!st.empty() && a[st.top()] <= a[i]) để st.top() là chỉ số' },
          { text: 'Sửa dòng 4 thành: int khoangCach = abs(i - st.top());' },
          { text: 'Sửa dòng 4 thành: int khoangCach = i + st.top();' }
        ],
        correctPatch: 0,
        explain: 'Để tính khoảng cách i - vị trí, ngăn xếp bắt buộc phải lưu CHỈ SỐ i. Bản vá A đổi ngăn xếp sang lưu chỉ số và so sánh qua a[st.top()], giúp phép tính (i - st.top()) cho ra khoảng cách chính xác.'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN
    // ============================================================================
    practiceProblems: [
      {
        id: 'CSES-1645',
        title: 'Nearest Smaller Values',
        judge: 'CSES Problem Set',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1645',
        hint: 'Áp dụng trực tiếp khuôn mẫu Ngăn xếp đơn điệu tăng dần từ đáy lên đỉnh để tìm phần tử nhỏ hơn gần nhất bên trái trong O(N).'
      },
      {
        id: 'VNOJ-KAGAIN',
        title: 'Khởi Nghĩa (Dãy Cột Tầm Nhìn)',
        judge: 'VNOJ',
        tier: 2,
        link: 'https://oj.vnoi.info/problem/kagain',
        hint: 'Tìm biên trái và biên phải mở rộng từ mỗi vị trí i bằng cách tìm phần tử nhỏ hơn gần nhất về hai phía.'
      },
      {
        id: 'CSES-1142',
        title: 'Advertisement (Largest Rectangle in Histogram)',
        judge: 'CSES Problem Set',
        tier: 2,
        link: 'https://cses.fi/problemset/task/1142',
        hint: 'Tìm diện tích bảng quảng cáo lớn nhất: tính L[i] và R[i] bằng Monotonic Stack lưu chỉ số, rồi max hóa h[i] * (R[i] - L[i] - 1).'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
