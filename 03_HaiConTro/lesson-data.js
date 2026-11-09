/**
 * DỮ LIỆU BÀI GIẢNG 03: KỸ THUẬT HAI CON TRỎ (TWO POINTERS)
 */
(function() {
  const LESSON_DATA = {
    id: 'hai_con_tro',
    number: 'Bài Học 03',
    shortTitle: 'Kỹ Thuật Hai Con Trỏ',
    title: 'Kỹ Thuật Hai Con Trỏ (Two Pointers) — Từ Bản Chất Đơn Điệu Đến Cửa Sổ Trượt Tuyến Tính O(N)',
    lead: 'Hiểu từ gốc rễ: Không phải biến con trỏ bộ nhớ int* phức tạp, mà là hai ngón tay chỉ vị trí cùng trượt trên dãy. Phân biệt rõ hai con trỏ ngược chiều vs cùng chiều và điều kiện sống còn để sử dụng.',
    modules: [
      // ============================================================================
      // MODULE 1: VẤN ĐỀ NHỎ 1: LOẠI BỎ HÀNG LOẠT CẶP SỐ THỪA (NGƯỢC CHIỀU)
      // ============================================================================
      {
        id: 'mod1',
        number: 'Phần 1',
        shortTitle: 'Hai Con Trỏ Ngược Chiều',
        title: 'Vấn Đề Nhỏ 1: Dùng Thứ Tự Sắp Xếp Để Loại Bỏ Cặp Thừa — Hai Con Trỏ Ngược Chiều',
        lead: 'Khám phá cách tìm cặp số có tổng bằng S trên mảng đã sắp xếp: tại sao mỗi bước so sánh loại bỏ được hẳn một hàng lựa chọn?',
        subproblem: {
          title: 'Làm sao để tìm cặp số có tổng bằng S trong O(N) mà không phải thử mọi cặp đầu-cuối O(N^2)?',
          desc: 'Nếu dữ liệu đã được sắp xếp tăng dần, khi tổng a[trai] + a[phai] > S, ta biết chắc chắn a[phai] không thể ghép với bất kỳ số nào khác, cho phép loại bỏ ngay a[phai].'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Kệ Sách Đã Xếp Đến Thuật Toán Ngược Chiều',
            tag: 'Tối ưu cặp đôi',
            split: {
              left: `
                <div class="step-life">
                  <span class="step-badge">Bước 1: Tình huống đời sống bình thường</span>
                  <p>Bạn và bạn mình đi mua 2 cuốn sách có tổng giá $S = 100.000đ$ trên kệ sách đã xếp từ rẻ đến đắt:</p>
                  <ul>
                    <li>Bạn đặt ngón tay vào cuốn <strong>rẻ nhất (bên trái cùng)</strong>.</li>
                    <li>Bạn của bạn đặt ngón tay vào cuốn <strong>đắt nhất (bên phải cùng)</strong>.</li>
                    <li>Nếu $\\text{Tổng} > 100k$: Cuốn đắt nhất quá đắt, ghép với cuốn rẻ nhất còn vượt ngân sách thì không thể ghép với ai khác $\\rightarrow$ dịch ngón tay phải lùi lại (<code>phai--</code>).</li>
                    <li>Nếu $\\text{Tổng} < 100k$: Cuốn rẻ nhất quá rẻ $\\rightarrow$ dịch ngón tay trái tiến lên (<code>trai++</code>).</li>
                  </ul>
                </div>
                <div class="step-term">
                  <span class="step-badge">Bước 3: Giải nghĩa tên gọi & Thuật ngữ</span>
                  <ul>
                    <li><strong>Hai con trỏ (Two Pointers):</strong> Hai biến chỉ số vị trí nguyên <code>trai</code> và <code>phai</code> trỏ vào mảng.</li>
                    <li><strong>Hai con trỏ ngược chiều:</strong> Một ngón tay đi từ đầu mảng tiến lên, một ngón tay đi từ cuối mảng lùi xuống.</li>
                  </ul>
                </div>
              `,
              right: `
                <div class="step-code">
                  <span class="step-badge">Bước 2: Ánh xạ vào lập trình C++</span>
                  <p>Thuật toán trên mảng đã sắp xếp tăng dần:</p>
                  <pre class="code-pre"><code>int trai = 0, phai = n - 1;
while (trai < phai) {
    long long tong = a[trai] + a[phai];
    if (tong == S) {
        cout << "Tim thay tai: " << trai << ", " << phai;
        break;
    }
    if (tong < S) trai++; // Can tang tong -> tien trai
    else phai--;          // Can giam tong -> lui phai
}</code></pre>
                  <p style="font-size: 13px; color: var(--muted); margin-top: 8px;">
                    Mỗi bước lặp hoặc <code>trai</code> tăng lên 1 hoặc <code>phai</code> giảm đi 1. Khoảng cách thu hẹp tối đa $N$ bước $\rightarrow$ Thời gian chạy $O(N)$!
                  </p>
                </div>
              `
            }
          }
        ],
        sandboxes: [
          {
            id: 'sb_two_sum',
            title: 'Phòng Thí Nghiệm 1: Mô Phỏng Hai Con Trỏ Ngược Chiều',
            desc: 'Quan sát ngón tay trái và ngón tay phải co cụm lại để tìm cặp số có tổng bằng S.',
            toggles: [
              {
                key: 'target_s',
                label: 'Tổng mục tiêu S',
                options: [
                  { value: 's_8', text: 'Mục tiêu S = 8 trên mảng {1, 2, 4, 7, 9}', kind: 'ok' },
                  { value: 's_11', text: 'Mục tiêu S = 11 trên mảng {1, 2, 4, 7, 9}', kind: 'ok' },
                  { value: 's_5', text: 'Mục tiêu S = 5 trên mảng {1, 2, 4, 7, 9}', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const opt = state.target_s;
              let sVal = 8;
              let log = '';

              if (opt === 's_8') {
                sVal = 8;
                log = `Bước 1: trai=0 (1), phai=4 (9). Tổng = 1 + 9 = 10 > 8 -> phai-- (lui ve 3)\nBước 2: trai=0 (1), phai=3 (7). Tổng = 1 + 7 = 8 == 8 -> TÌM THẤY! Cặp (1, 7)`;
              } else if (opt === 's_11') {
                sVal = 11;
                log = `Bước 1: trai=0 (1), phai=4 (9). Tổng = 1 + 9 = 10 < 11 -> trai++ (tien len 1)\nBước 2: trai=1 (2), phai=4 (9). Tổng = 2 + 9 = 11 == 11 -> TÌM THẤY! Cặp (2, 9)`;
              } else {
                sVal = 5;
                log = `Bước 1: trai=0 (1), phai=4 (9). Tổng = 10 > 5 -> phai-- (3)\nBước 2: trai=0 (1), phai=3 (7). Tổng = 8 > 5 -> phai-- (2)\nBước 3: trai=0 (1), phai=2 (4). Tổng = 5 == 5 -> TÌM THẤY! Cặp (1, 4)`;
              }

              const code = `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {1, 2, 4, 7, 9};
    int S = ${sVal};
    int trai = 0, phai = a.size() - 1;
    while (trai < phai) {
        int tong = a[trai] + a[phai];
        if (tong == S) {
            cout << "Tim thay: " << a[trai] << " + " << a[phai] << " = " << S << "\\n";
            return 0;
        }
        if (tong < S) trai++;
        else phai--;
    }
    cout << "Khong tim thay!\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [7],
                statusOk: true,
                statusText: 'Tìm thấy cặp số tối ưu sau số bước cực ngắn trong O(N)',
                console: log,
                explain: 'Nhờ mảng đã sắp xếp, ta loại bỏ được một nửa không gian tìm kiếm ở mỗi bước di chuyển chỉ số.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Với mảng a = [2, 3, 5, 8, 11] và mục tiêu S = 10. Khi bắt đầu với trai = 0, phai = 4, chuỗi các cặp chỉ số (trai, phai) được duyệt lần lượt là gì?',
            options: [
              'Bắt đầu (0, 4) -> chuyển sang (0, 3) và tìm thấy cặp (2, 8)',
              'Bắt đầu (0, 4) -> chuyển sang (1, 4) và tìm thấy cặp (3, 8)',
              'Bắt đầu (0, 4) -> chuyển sang (1, 3) và tìm thấy cặp (3, 5)',
              'Bắt đầu (0, 4) -> chuyển sang (2, 4) và tìm thấy cặp (5, 8)'
            ],
            correct: 0,
            explain: 'Tại (0, 4): 2 + 11 = 13 > 10 -> phai giảm xuống 3. Tại (0, 3): 2 + 8 = 10 == 10 -> Tìm thấy ngay cặp (2, 8).'
          },
          {
            type: 'trace',
            q: 'Quan sát mảng đã sort a = [1, 4, 6, 9]. Nếu tìm cặp có tổng S = 12, sau bao nhiêu bước lặp của vòng while thì thuật toán kết luận không có nghiệm?',
            options: [
              'Sau đúng 3 bước di chuyển con trỏ thì hai con trỏ gặp nhau và kết thúc',
              'Sau đúng 1 bước duy nhất vì hai phần tử đầu và cuối cộng lại không bằng 12',
              'Sau đúng 6 bước lặp vì phải thử tất cả các cặp có thể có trong mảng',
              'Vòng lặp chạy vô tận không dừng vì không tìm thấy tổng nào bằng 12'
            ],
            correct: 0,
            explain: '(0,3): 1+9=10 < 12 -> trai=1. (1,3): 4+9=13 > 12 -> phai=2. (1,2): 4+6=10 < 12 -> trai=2. Lúc này trai == phai (2 == 2) -> dừng sau 3 bước.'
          },
          {
            type: 'single',
            q: 'Điều kiện TIÊN QUYẾT để áp dụng kỹ thuật Hai con trỏ ngược chiều tìm cặp tổng S là gì?',
            options: [
              'Các phần tử trong mảng bắt buộc phải được sắp xếp theo thứ tự tăng dần hoặc giảm dần',
              'Tất cả các phần tử trong mảng bắt buộc phải là các số nguyên dương lẻ',
              'Kích thước của mảng bắt buộc phải là một số chẵn chia hết cho hai',
              'Mảng không được phép chứa bất kỳ hai phần tử nào có giá trị trùng nhau'
            ],
            correct: 0,
            explain: 'Nếu mảng chưa sắp xếp, tính đơn điệu không tồn tại và việc dịch trai++/phai-- sẽ dẫn đến bỏ sót nghiệm.'
          },
          {
            type: 'multiple',
            q: 'Những ưu điểm nào sau đây thuộc về kỹ thuật Hai con trỏ ngược chiều so với duyệt trâu hai vòng for?',
            options: [
              'Giảm độ phức tạp thời gian từ O(N^2) xuống O(N) (hoặc O(N log N) nếu cần sort)',
              'Chỉ sử dụng hai biến chỉ số nguyên nên độ phức tạp không gian phụ là O(1)',
              'Dễ dàng cài đặt và không đòi hỏi cấu trúc dữ liệu phân cấp phức tạp',
              'Tự động sửa chữa các phần tử bị lỗi cú pháp trong bộ nhớ RAM của máy tính'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đúng. Ý D hoàn toàn sai và vô lý.'
          }
        ]
      },

      // ============================================================================
      // MODULE 2: VẤN ĐỀ NHỎ 2: KHUNG CỬA SỔ CO GIÃN (CỬA SỔ TRƯỢT)
      // ============================================================================
      {
        id: 'mod2',
        number: 'Phần 2',
        shortTitle: 'Hai Con Trỏ Cùng Chiều & Cửa Sổ Trượt',
        title: 'Vấn Đề Nhỏ 2: Cửa Sổ Trượt — Khung Co Giãn Con Sâu Đo Bò Trên Mảng Dương',
        lead: 'Khám phá mô hình Hai con trỏ cùng chiều: tại sao khi đầu vươn tới trước và đuôi co lại, ta luôn duy trì được đoạn con tối ưu trong O(N)?',
        subproblem: {
          title: 'Làm sao để tìm đoạn con dài nhất có tổng <= S trên dãy số dương mà không tính lại từ đầu?',
          desc: 'Khi mở rộng biên phải, tổng tăng; khi co hẹp biên trái, tổng giảm. Cả hai biên cùng tiến sang phải giúp ta cập nhật tổng chỉ bằng phép cộng/trừ 1 phần tử.'
        },
        cards: [
          {
            heading: 'Ba Bước Tiếp Cận: Con Sâu Đo Đến Khung Cửa Sổ Trượt [trai..phai]',
            tag: 'Cửa sổ trượt',
            split: {
              left: `
                <div class="step-life">
                  <span class="step-badge">Bước 1: Tình huống đời sống bình thường</span>
                  <p>Quan sát một <strong>con sâu đo</strong> bò trên cành cây ăn lá:</p>
                  <ul>
                    <li>Bụng con sâu chỉ chứa được tối đa cân nặng $S$.</li>
                    <li>Đầu con sâu (<code>phai</code>) vươn tới trước ăn thêm lá $\\rightarrow$ cân nặng tăng.</li>
                    <li>Khi cân nặng vượt quá $S$ (bội thực), đầu sâu đứng yên, <strong>đuôi sâu (<code>trai</code>) co lại</strong>, nhả bớt lá cũ ra cho tới khi cân nặng an toàn $\\le S$.</li>
                    <li>Đầu sâu lại tiếp tục bò tới trước.</li>
                    <li><strong>Bản chất:</strong> Cả đầu và đuôi sâu <em>chỉ bò về phía trước</em>, không bao giờ quay lùi lại điểm xuất phát!</li>
                  </ul>
                </div>
                <div class="step-term">
                  <span class="step-badge">Bước 3: Giải nghĩa tên gọi & Thuật ngữ</span>
                  <ul>
                    <li><strong>Cửa sổ trượt (Sliding Window):</strong> Khung đoạn con <code>[trai..phai]</code> trượt trên mảng số.</li>
                    <li><strong>Hai con trỏ cùng chiều:</strong> Cả hai chỉ số <code>trai</code> và <code>phai</code> đều chỉ tăng dần từ $0$ đến $N - 1$.</li>
                  </ul>
                </div>
              `,
              right: `
                <div class="step-code">
                  <span class="step-badge">Bước 2: Ánh xạ vào lập trình C++</span>
                  <p>Mã nguồn chuẩn mực duy trì tổng đoạn con:</p>
                  <pre class="code-pre"><code>int trai = 0, maxLen = 0;
long long tong = 0;

for (int phai = 0; phai < n; phai++) {
    tong += a[phai]; // Dau sau vuon toi an them

    // Khi boi thuc: duoi sau co lai
    while (tong > S && trai <= phai) {
        tong -= a[trai];
        trai++;
    }

    // Doan [trai..phai] chac chan co tong <= S
    maxLen = max(maxLen, phai - trai + 1);
}</code></pre>
                </div>
              `
            }
          }
        ],
        sandboxes: [
          {
            id: 'sb_sliding_window_trace',
            title: 'Phòng Thí Nghiệm 2: Mô Phỏng Từng Bước Cửa Sổ Trượt',
            desc: 'Quan sát biến trai và phai dịch chuyển để duy trì tổng <= S.',
            toggles: [
              {
                key: 'win_target',
                label: 'Mục tiêu tổng S',
                options: [
                  { value: 's5', text: 'S = 5 trên mảng {1, 3, 2, 1, 4}', kind: 'ok' },
                  { value: 's3', text: 'S = 3 trên mảng {1, 3, 2, 1, 4}', kind: 'ok' }
                ]
              }
            ],
            build(state) {
              const isS5 = state.win_target === 's5';
              const sVal = isS5 ? 5 : 3;
              const log = isS5
                ? `phai=0 (1): tong=1 <= 5 -> doDai=1, doan=[0..0]\nphai=1 (3): tong=4 <= 5 -> doDai=2, doan=[0..1]\nphai=2 (2): tong=6 > 5 -> pop a[0]=1, trai=1 -> tong=5 <= 5 -> doDai=2, doan=[1..2]\nphai=3 (1): tong=6 > 5 -> pop a[1]=3, trai=2 -> tong=3 <= 5 -> doDai=2, doan=[2..3]\nphai=4 (4): tong=7 > 5 -> pop a[2]=2, trai=3 -> tong=5 <= 5 -> doDai=2, doan=[3..4]\n-> Độ dài dài nhất là 2!`
                : `phai=0 (1): tong=1 <= 3 -> doDai=1\nphai=1 (3): tong=4 > 3 -> pop a[0], trai=1 -> tong=3 -> doDai=1\nphai=2 (2): tong=5 > 3 -> pop a[1], trai=2 -> tong=2 -> doDai=1\nphai=3 (1): tong=3 <= 3 -> doan=[2..3] -> doDai=2!\n-> Độ dài dài nhất là 2!`;

              const code = `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {1, 3, 2, 1, 4};
    int S = ${sVal};
    int trai = 0, maxLen = 0, tong = 0;
    for (int phai = 0; phai < a.size(); phai++) {
        tong += a[phai];
        while (tong > S && trai <= phai) {
            tong -= a[trai];
            trai++;
        }
        maxLen = max(maxLen, phai - trai + 1);
    }
    cout << "Do dai max: " << maxLen << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [7],
                statusOk: true,
                statusText: 'Cửa sổ trượt duy trì tổng trong O(N) hoàn toàn chính xác',
                console: log,
                explain: 'Biến trai và phai mỗi biến chỉ tiến từ 0 đến N-1, đảm bảo chương trình chạy tức thì.'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Với mảng a = [2, 1, 5, 2] và S = 4. Khi vòng lặp phai chạy đến phần tử a[2] = 5, giá trị của biến trai sau khi kết thúc vòng while bên trong là bao nhiêu?',
            options: [
              'trai = 3 vì số 5 lớn hơn 4 làm cửa sổ bị thu hẹp vượt qua cả vị trí 2',
              'trai = 2 vì số 5 lớn hơn 4 làm cửa sổ dừng lại đúng tại vị trí số 5',
              'trai = 1 vì chỉ cần loại bỏ phần tử đầu tiên a[0] = 2 là đủ thỏa mãn',
              'trai = 0 vì vòng lặp while không bao giờ được kích hoạt khi gặp số 5'
            ],
            correct: 0,
            explain: 'tong = 2 + 1 + 5 = 8 > 4. Pop 2 -> tong=6 > 4, trai=1. Pop 1 -> tong=5 > 4, trai=2. Pop 5 -> tong=0, trai=3. Lúc này trai = 3 > phai (2) nên dừng.'
          },
          {
            type: 'trace',
            q: 'Trong thuật toán cửa sổ trượt, tổng số lần câu lệnh tong -= a[trai]; trai++; có thể được thực thi tối đa trên toàn bộ N bước lặp là bao nhiêu?',
            options: [
              'Tối đa N lần vì biến trai chỉ có thể tăng từ 0 lên N mà không bao giờ giảm',
              'Tối đa N^2 lần vì vòng while nằm bên trong vòng for duyệt N phần tử',
              'Tối đa 2 lần vì mỗi bước lặp chỉ được phép loại bỏ tối đa hai số',
              'Vô hạn lần vì vòng lặp while có thể bị lặp lại liên tục không dừng'
            ],
            correct: 0,
            explain: 'Biến trai khởi tạo bằng 0 và chỉ có phép tăng trai++, đồng thời bị chặn bởi trai <= phai < N. Do đó tổng số lần tăng tối đa là N.'
          },
          {
            type: 'single',
            q: 'Điểm khác biệt căn bản giữa kỹ thuật Cửa sổ trượt và duyệt trâu 2 vòng lặp lồng nhau là gì?',
            options: [
              'Cửa sổ trượt tận dụng kết quả của bước trước bằng cách chỉ thêm 1 phần tử và bớt các phần tử thừa',
              'Cửa sổ trượt bắt buộc phải sắp xếp lại toàn bộ các phần tử trong mảng ở mỗi bước lặp',
              'Cửa sổ trượt chỉ chạy được trên các mảng có kích thước nhỏ hơn một nghìn phần tử',
              'Cửa sổ trượt luôn luôn cho ra kết quả xấp xỉ chứ không đảm bảo kết quả chính xác'
            ],
            correct: 0,
            explain: 'Thay vì tính lại tổng đoạn con từ đầu mất O(N), cửa sổ trượt chỉ tốn O(1) để cộng thêm phần tử mới và trừ bớt phần tử cũ.'
          },
          {
            type: 'multiple',
            q: 'Những yếu tố nào sau đây là ĐÚNG khi nói về thuật toán Cửa sổ trượt (Hai con trỏ cùng chiều)?',
            options: [
              'Tổng thời gian chạy là O(N) vì cả hai con trỏ đều chỉ dịch chuyển một chiều sang phải',
              'Bộ nhớ phụ tiêu tốn là O(1) vì chỉ sử dụng vài biến nguyên để lưu trữ chỉ số và tổng',
              'Cửa sổ trượt có thể áp dụng để tìm cả đoạn con dài nhất lẫn đoạn con ngắn nhất',
              'Cửa sổ trượt bắt buộc phải cấp phát một mảng hai chiều để lưu bảng kết quả'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đúng. Ý D sai vì cửa sổ trượt chỉ tốn O(1) bộ nhớ phụ, không dùng mảng 2 chiều.'
          }
        ]
      },

      // ============================================================================
      // MODULE 3: VẤN ĐỀ NHỎ 3 & GHÉP LẠI: ĐẾM ĐOẠN CON & BẪY SỐ ÂM
      // ============================================================================
      {
        id: 'mod3',
        number: 'Phần 3',
        shortTitle: 'Đếm Đoạn Con & Bẫy Số Âm',
        title: 'Vấn Đề Nhỏ 3 & Ghép Lại: Công Thức Đếm Đoạn Con Nhanh & Điều Kiện Phá Sản (Bẫy Số Âm)',
        lead: 'Học cách đếm (phai - trai + 1) đoạn con chỉ trong 1 bước và hiểu sâu tại sao sự xuất hiện của số âm sẽ phá hủy hoàn toàn thuật toán.',
        subproblem: {
          title: 'Làm sao để đếm hàng triệu đoạn con thỏa mãn điều kiện mà không phải đếm từng đoạn một?',
          desc: 'Khi cố định điểm cuối phai, nếu [trai..phai] hợp lệ trên mảng số dương thì tất cả các đoạn con kết thúc tại phai đều tự động hợp lệ. Nhưng nếu mảng có số âm, tính đơn điệu bị phá vỡ hoàn toàn.'
        },
        cards: [
          {
            heading: 'Công Thức Đếm Đoạn Con & Bẫy Chết Người Khi Mảng Chứa Số Âm',
            tag: 'Bẫy thuật toán',
            split: {
              left: `
                <div class="step-life">
                  <span class="step-badge">Bước 1: Tình huống đời sống bình thường</span>
                  <p>Nguyên lý chiếc thước kẻ và cân nặng:</p>
                  <ul>
                    <li>Nếu một giỏ hoa quả gồm 4 quả táo có tổng cân nặng $\le 5kg$, thì việc bạn <strong>bớt đi bớt lại quả táo ở đầu</strong> chắc chắn sẽ tạo ra những giỏ nhẹ hơn $\le 5kg$!</li>
                    <li><strong>Số giỏ hợp lệ kết thúc ở quả cuối:</strong> Đúng bằng số quả có trong giỏ: $\text{phai} - \text{trai} + 1$.</li>
                    <li><em>Nhưng nếu có một quả táo bay ngược trọng lực (quả táo cân nặng âm)?</em> Bỏ nó ra thì giỏ lại nặng lên, thêm nó vào thì giỏ lại nhẹ đi $\rightarrow$ Không thể biết giỏ nào nặng hơn!</li>
                  </ul>
                </div>
                <div class="step-term">
                  <span class="step-badge">Bước 3: Giải nghĩa thuật ngữ & Giới hạn áp dụng</span>
                  <ul>
                    <li><strong>Đơn điệu của tổng (Monotonic Sum):</strong> Các số $A_i \ge 0$ đảm bảo khi mở rộng đoạn thì tổng chỉ có thể tăng, khi thu hẹp đoạn thì tổng chỉ có thể giảm.</li>
                    <li><strong>Bẫy số âm:</strong> Nếu mảng có số âm, Hai con trỏ <em>bị phá sản hoàn toàn</em>, bắt buộc phải dùng Prefix Sum + Data Structure (Segment Tree / Map).</li>
                  </ul>
                </div>
              `,
              right: `
                <div class="step-code">
                  <span class="step-badge">Bước 2: Ánh xạ vào lập trình C++</span>
                  <p>Công thức cộng dồn số lượng đoạn con:</p>
                  <pre class="code-pre"><code>long long tongSoDoan = 0;
for (int phai = 0; phai < n; phai++) {
    tong += a[phai];
    while (tong > S && trai <= phai) {
        tong -= a[trai];
        trai++;
    }
    // Đếm ngay (phai - trai + 1) đoạn con kết thúc tại phai:
    tongSoDoan += (phai - trai + 1);
}</code></pre>
                  <p style="font-size: 13px; color: var(--warn); margin-top: 8px;">
                    <strong>Cảnh báo phòng thi:</strong> Đọc kỹ giới hạn đề bài! Nếu $A_i$ có thể âm ($A_i \ge -10^9$), cấm tuyệt đối dùng Hai con trỏ.
                  </p>
                </div>
              `
            }
          }
        ],
        sandboxes: [
          {
            id: 'sb_negative_trap',
            title: 'Phòng Thí Nghiệm 3: Thử Nghiệm Bẫy Số Âm Trên Hai Con Trỏ',
            desc: 'Quan sát Hai con trỏ cho ra đáp án đúng trên mảng số dương vs bỏ sót nghiệm nghiêm trọng trên mảng có số âm.',
            toggles: [
              {
                key: 'has_negative',
                label: 'Tập dữ liệu đầu vào',
                options: [
                  { value: 'all_pos', text: 'Mảng toàn số dương: {2, 1, 3, 2} (S = 4)', kind: 'ok' },
                  { value: 'has_neg', text: 'Mảng có số âm: {5, -3, 2, 1} (S = 4)', kind: 'bug' }
                ]
              }
            ],
            build(state) {
              const isPos = state.has_negative === 'all_pos';
              const code = `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {${isPos ? '2, 1, 3, 2' : '5, -3, 2, 1'}};
    int S = 4;
    int trai = 0, tong = 0, cnt = 0;
    for (int phai = 0; phai < a.size(); phai++) {
        tong += a[phai];
        while (tong > S && trai <= phai) {
            tong -= a[trai];
            trai++;
        }
        cnt += (phai - trai + 1);
    }
    cout << "So doan con tim duoc: " << cnt << "\\n";
    return 0;
}`;
              return {
                code,
                changedLines: [6],
                statusOk: isPos,
                statusText: isPos ? 'Mảng toàn số dương: Hai con trỏ đếm chính xác 100% các đoạn con' : 'BẪY SỐ ÂM: Hai con trỏ bỏ sót đoạn hợp lệ vì tính đơn điệu bị phá vỡ!',
                console: isPos
                  ? `$ ./countSub\nSo doan con tim duoc: 6\n[Thanh cong: Ket qua chinh xac tuyet doi trong O(N)!]`
                  : `$ ./countSub\nSo doan con tim duoc: 5 (Dap an thuc te la 7!)\n[That bai: Doan {5, -3, 2} co tong 4 bi bo sot vi con tro da lo tay duoi so 5 di!]`,
                explain: isPos
                  ? 'Khi các phần tử đều dương, tổng luôn tăng khi phai tăng và luôn giảm khi trai tăng, đảm bảo không bỏ sót.'
                  : 'Khi a[0]=5 > 4, con trỏ trai bị ép nhảy qua 5. Nhưng sau đó xuất hiện -3 làm tổng giảm xuống 4, con trỏ trai không thể lùi lại để lấy lại số 5 được nữa!'
              };
            }
          }
        ],
        quiz: [
          {
            type: 'trace',
            q: 'Với mảng số dương a = [1, 2, 1] và S = 3. Tại phai = 1 (khi xét đoạn [0..1] gồm các số {1, 2} có tổng = 3 <= 3), số đoạn con hợp lệ kết thúc tại vị trí index 1 là bao nhiêu?',
            options: [
              'Có 2 đoạn con là đoạn [0..1] ({1, 2}) và đoạn [1..1] ({2})',
              'Có 1 đoạn con duy nhất là đoạn [0..1] có đầy đủ cả hai số',
              'Có 3 đoạn con vì tính cả đoạn rỗng không chứa phần tử nào',
              'Không có đoạn con nào vì tổng bắt buộc phải nhỏ hơn hẳn ba'
            ],
            correct: 0,
            explain: 'Công thức (phai - trai + 1) = (1 - 0 + 1) = 2 đoạn con: đó là {1, 2} (tổng 3) và {2} (tổng 2).'
          },
          {
            type: 'trace',
            q: 'Tại sao khi mảng có chứa số âm, ví dụ a = [10, -5, 2] với S = 7, kỹ thuật Hai con trỏ lại bị thất bại ngay từ bước đầu tiên?',
            options: [
              'Vì khi gặp số 10 > 7, con trỏ trái đã loại bỏ 10, trong khi đoạn {10, -5, 2} có tổng 7 hoàn toàn hợp lệ',
              'Vì máy tính không thể thực hiện phép cộng giữa một số dương và một số nguyên âm',
              'Vì con trỏ phải bắt buộc phải dừng lại ngay lập tức khi nhìn thấy một số nguyên âm',
              'Vì các số nguyên âm bắt buộc phải được nhân với âm một trước khi đưa vào mảng'
            ],
            correct: 0,
            explain: 'Khi thấy 10 > 7, thuật toán thu hẹp bỏ mất số 10. Nhưng sự xuất hiện của số -5 phía sau giúp kéo tổng xuống còn 7, con trỏ trái không thể lùi lại để sửa sai.'
          },
          {
            type: 'single',
            q: 'Khi bài toán yêu cầu tìm đoạn con có tổng bằng S trên mảng CÓ CHỨA SỐ ÂM, phương pháp chuẩn mực cần sử dụng là gì?',
            options: [
              'Sử dụng Mảng cộng dồn (Prefix Sum) kết hợp cấu trúc tra cứu như std::map hoặc bảng băm',
              'Vẫn tiếp tục dùng Hai con trỏ nhưng cho cả hai con trỏ cùng chạy ngược chiều từ phải qua trái',
              'Nhân tất cả các số âm với số không để biến mảng thành toàn các số nguyên dương',
              'Chỉ cần đổi kiểu dữ liệu của biến tổng từ kiểu int thông thường sang kiểu dữ liệu bool'
            ],
            correct: 0,
            explain: 'Với mảng có số âm, Prefix Sum + Map/Hash Table cho phép tìm vị trí cũ có prefix sum = (sum - S) trong O(N log N) hoặc O(N).'
          },
          {
            type: 'multiple',
            q: 'Những phát biểu nào sau đây là ĐÚNG về công thức tính số lượng đoạn con (phai - trai + 1) trong kỹ thuật Cửa sổ trượt?',
            options: [
              'Công thức này chỉ áp dụng chính xác khi mảng đầu vào chỉ chứa toàn các số không âm',
              'Nó đếm tất cả các đoạn con liên tiếp bắt đầu từ vị trí trai đến phai và kết thúc đúng tại phai',
              'Công thức này giúp ta tính được số lượng đoạn con hợp lệ trong thời gian O(1) tại mỗi bước',
              'Công thức này yêu cầu ta phải chạy thêm một vòng lặp for thứ ba lồng vào bên trong để đếm'
            ],
            correct: [0, 1, 2],
            explain: 'A, B và C đúng. Ý D sai vì công thức tính trực tiếp bằng phép trừ số học trong O(1) mà không cần vòng lặp for thứ ba.'
          }
        ]
      }
    ],

    // ============================================================================
    // BÀI TẬP DEBUG TƯƠNG TÁC
    // ============================================================================
    debugExercises: [
      {
        id: 'dbg_tp_1',
        title: 'Bẫy Cập Nhật Độ Dài TRƯỚC Khi Thu Hẹp Cửa Sổ Hợp Lệ',
        description: 'Học sinh viết hàm tìm độ dài đoạn con dài nhất có tổng <= S, nhưng lại đặt lệnh cập nhật maxLen trước vòng lặp while thu hẹp, khiến kết quả lấy nhầm cả đoạn bị quá tải.',
        failingInput: 'a = [4, 5], S = 4',
        failingOutput: 'maxLen = 2 (Đoạn {4, 5} có tổng 9 > 4 mà vẫn bị tính!)',
        expectedOutput: 'maxLen = 1',
        buggyCode: `int timDoan(vector<int>& a, int S) {
    int trai = 0, tong = 0, maxLen = 0;
    for (int phai = 0; phai < a.size(); phai++) {
        tong += a[phai];
        maxLen = max(maxLen, phai - trai + 1); // BUG: Cap nhat truoc khi thu hep!
        while (tong > S && trai <= phai) {
            tong -= a[trai];
            trai++;
        }
    }
    return maxLen;
}`,
        bugLine: 5,
        patches: [
          { text: 'Chuyển dòng 5 xuống SAU vòng lặp while thu hẹp (đặt ở sau dòng 9)' },
          { text: 'Sửa dòng 5 thành: maxLen = max(maxLen, phai - trai);' },
          { text: 'Sửa dòng 5 thành: maxLen = maxLen + 1;' }
        ],
        correctPatch: 0,
        explain: 'Tại phai = 1 (số 5), tong = 9 > 4. Nếu cập nhật maxLen ở dòng 5, đoạn {4, 5} (độ dài 2) chưa được thu hẹp đã bị tính vào kết quả! Bản vá A chuyển lệnh cập nhật xuống sau vòng while, đảm bảo chỉ đoạn hợp lệ mới được ghi nhận.'
      },
      {
        id: 'dbg_tp_2',
        title: 'Bẫy Lỗi Điều Kiện Vòng Lặp Hai Con Trỏ Ngược Chiều (Dùng <= Thay Vì <)',
        description: 'Học sinh tìm 2 phần tử ở HAI VỊ TRÍ KHÁC NHAU có tổng bằng S, nhưng lại dùng điều kiện trai <= phai khiến chương trình tự cộng một phần tử với chính nó.',
        failingInput: 'a = [2, 5, 8], S = 10',
        failingOutput: 'Tìm thấy cặp tại vị trí 1 và 1 (tự lấy 5 + 5 = 10, trong khi chỉ có 1 số 5!)',
        expectedOutput: 'Không tìm thấy cặp số nào ở hai vị trí khác nhau có tổng bằng 10',
        buggyCode: `bool timCap(vector<int>& a, int S) {
    int trai = 0, phai = (int)a.size() - 1;
    while (trai <= phai) { // BUG: Khi trai == phai, phan tu tu cong voi chinh no!
        int tong = a[trai] + a[phai];
        if (tong == S) return true;
        if (tong < S) trai++;
        else phai--;
    }
    return false;
}`,
        bugLine: 3,
        patches: [
          { text: 'Sửa dòng 3 thành: while (trai < phai) để bắt buộc hai con trỏ ở hai vị trí khác nhau' },
          { text: 'Sửa dòng 3 thành: while (trai <= phai + 1)' },
          { text: 'Sửa dòng 3 thành: while (trai != phai + 1)' }
        ],
        correctPatch: 0,
        explain: 'Khi đề bài yêu cầu tìm hai phần tử ở hai vị trí khác nhau (i != j), vòng lặp bắt buộc phải là "while (trai < phai)". Dùng "<=" sẽ dẫn đến trường hợp trai == phai, phần tử a[trai] bị cộng với chính nó dẫn đến kết luận sai.'
      }
    ],

    // ============================================================================
    // BÀI TẬP THỰC CHIẾN TUYỂN CHỌN
    // ============================================================================
    practiceProblems: [
      {
        id: 'CSES-1640',
        title: 'Sum of Two Values',
        judge: 'CSES Problem Set',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1640',
        hint: 'Áp dụng Hai con trỏ ngược chiều trên mảng đã sắp xếp (lưu kèm vị trí gốc) để tìm 2 số có tổng bằng X.'
      },
      {
        id: 'CSES-1660',
        title: 'Subarray Sums I',
        judge: 'CSES Problem Set',
        tier: 1,
        link: 'https://cses.fi/problemset/task/1660',
        hint: 'Mảng toàn số dương: dùng Hai con trỏ cùng chiều (Cửa sổ trượt) để đếm số đoạn con có tổng đúng bằng X.'
      },
      {
        id: 'VNOJ-NKSGAME',
        title: 'Trò Chơi Với Dãy Số (Hai Con Trỏ Ngược Chiều)',
        judge: 'VNOJ',
        tier: 2,
        link: 'https://oj.vnoi.info/problem/nksgame',
        hint: 'Cho 2 dãy số, tìm cặp a[i] + b[j] có giá trị tuyệt đối nhỏ nhất: sort cả 2 mảng rồi dùng 2 con trỏ co hẹp khoảng cách.'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.LESSON_DATA = LESSON_DATA;
  }
})();
