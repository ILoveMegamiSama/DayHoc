/**
 * DỮ LIỆU CÂY KỸ NĂNG CP & DANH SÁCH BÀI GIẢNG TOÀN CỤC
 * Dùng cho Trang Chủ (index.html) để render sơ đồ tương tác DAG,
 * kiểm toán tiền đề (Prerequisite Audit) và chi tiết cầu nối tư duy (Bridge Inspector).
 */
(function() {
  const PORTAL_DATA = {
    title: 'Học Viện Lập Trình Thi Đấu C++ (CP) — Từ Bản Chất Đến Thực Chiến',
    subtitle: 'Nguồn học liệu mở, bài giảng tương tác và code mẫu chuẩn mực dành cho người mới bắt đầu.',
    tracks: [
      { id: 'foundations', title: '1. Nền Tảng Hệ Thống & Stress Test', color: '#57534E' },
      { id: 'single_concepts', title: '2. Các Khối Kiến Thức Đơn Lẻ (Tối Ưu Bộ Nhớ & Con Trỏ)', color: '#1B6B4A' },
      { id: 'combined_concepts', title: '3. Chuyên Đề Kết Hợp (Quy Hoạch Động & Cấu Trúc Tuyến Tính)', color: '#C84B31' }
    ],
    nodes: [
      {
        id: 'nhap_mon_cpp',
        code: 'MOD-Pre',
        title: 'Nhập Môn Lập Trình C++ (Bản Chất Giao Tiếp)',
        track: 'foundations',
        category: 'foundation',
        path: '00_NhapMon_LapTrinh_CPP/index.html',
        summary: 'Xóa tan nỗi sợ: học cách chỉ dẫn Anh Phụ Bếp Thật Thà. Giải phẫu Cửa chính main(), Chuông dứt lệnh (;), Hộp biến RAM và Loa/Khe cin/cout.',
        x: 40,
        y: 80,
        badge: 'Khởi đầu',
        prerequisites: [
          'Chưa cần biết gì về lập trình',
          'Chỉ cần biết sử dụng chuột và bàn phím máy tính cơ bản'
        ],
        newConcepts: [
          'Bản chất lập trình: ủy thác việc cho một người phụ việc ngây ngô máy móc',
          'Cánh Cửa Chính main() và Tiếng Chuông Đồng dứt câu lệnh (;)',
          'Hộp dán nhãn trên kệ RAM: int, double, string, char, bool và hiện tượng chia bánh 5 / 2 = 2',
          'Kênh giao tiếp hai chiều: Loa phát thanh cout << và Khe nhận phiếu order cin >>'
        ]
      },
      {
        id: 'may_cham',
        code: 'MOD-00',
        title: 'Tự Code Máy Chấm (Stress Testing)',
        track: 'foundations',
        category: 'foundation',
        path: 'MayCham/index.html',
        summary: 'Hiểu bản chất phần cứng, RAM vs Ổ cứng, Shell, biến PATH, g++, cờ -static và tự động hóa tìm test sai bằng máy chấm C++14.',
        x: 220,
        y: 80,
        badge: 'Nền tảng',
        prerequisites: [
          'Đã học xong MOD-Pre: Nhập Môn Lập Trình C++ (Biến, Kiểu dữ liệu, cin/cout)',
          'Biết cách mở môi trường lập trình (Code::Blocks hoặc Terminal Linux)'
        ],
        newConcepts: [
          'RAM là chiếc bàn làm việc tốc độ cao, Ổ cứng là chiếc tủ hồ sơ lưu trữ',
          'Hệ điều hành, Shell (cmd.exe / bash), biến danh bạ hệ thống PATH',
          'Compiler g++, cờ biên dịch (-O2, -static) và bản chất file thực thi .exe'
        ]
      },
      {
        id: 'de_quy_duoi',
        code: 'MOD-01',
        title: 'Đệ Quy & Đệ Quy Đuôi (Tail Recursion)',
        track: 'single_concepts',
        category: 'single',
        path: '01_DeQuy_Va_DeQuyDuoi/index.html',
        summary: 'Kê thêm khay phụ trên bàn làm việc RAM: giải phẫu Call Stack, cơ chế Stack Overflow và kỹ thuật Đệ quy đuôi (TCO) O(1) bộ nhớ.',
        x: 420,
        y: 80,
        badge: 'Đơn lẻ',
        prerequisites: [
          'Đã hiểu từ MayCham: RAM là chiếc bàn làm việc của CPU, hàm main() để biến lên bàn',
          'Hiểu cách gọi hàm và truyền tham số trong C++'
        ],
        newConcepts: [
          'Khay phụ kê thêm trên bàn làm việc RAM (Stack Frame)',
          'Chồng các khay phụ khi hàm gọi hàm (Call Stack) và Giới hạn tràn ngăn xếp (~8MB)',
          'Đệ quy ("Đệ" = chuyển tiếp, "Quy" = quay về) và Điểm dừng (Base case)',
          'Cuốn sổ tổng kết chuyền tay (Biến tích lũy Accumulator) và Đệ quy đuôi (TCO)'
        ]
      },
      {
        id: 'ngan_xep_don_dieu',
        code: 'MOD-02',
        title: 'Ngăn Xếp & Ngăn Xếp Đơn Điệu (Monotonic Stack)',
        track: 'single_concepts',
        category: 'single',
        path: '02_NganXep_Va_NganXepDonDieu/index.html',
        summary: 'Từ cơ chế LIFO đến Ngăn xếp đơn điệu: bài toán tìm phần tử che khuất trong O(N) khấu hao và ứng dụng mở rộng biên.',
        x: 720,
        y: 80,
        badge: 'Đơn lẻ',
        prerequisites: [
          'Đã hiểu từ bài Đệ quy: Ngăn xếp là chồng khay/đĩa lấy cái trên cùng ra trước (LIFO)',
          'Biết dùng mảng 1 chiều và vòng lặp trong C++'
        ],
        newConcepts: [
          'Tự tạo cấu trúc ngăn xếp tường minh bằng std::stack hoặc std::vector',
          'Ngăn xếp đơn điệu (Monotonic Stack): Hàng người che khuất nhau, loại bỏ kẻ yếu thế',
          'Lưu chỉ số vị trí (Index) thay vì lưu giá trị thuần túy để tính khoảng cách',
          'Độ phức tạp khấu hao (Amortized O(1))'
        ]
      },
      {
        id: 'hai_con_tro',
        code: 'MOD-03',
        title: 'Kỹ Thuật Hai Con Trỏ (Two Pointers)',
        track: 'single_concepts',
        category: 'single',
        path: '03_HaiConTro/index.html',
        summary: 'Khung cửa sổ co giãn trượt trên mảng: Hai con trỏ ngược chiều và Cửa sổ trượt cùng chiều, điều kiện biên và bẫy số âm.',
        x: 720,
        y: 260,
        badge: 'Đơn lẻ',
        prerequisites: [
          'Biết sắp xếp mảng bằng std::sort()',
          'Hiểu tính chất cộng dồn trên dãy số không âm'
        ],
        newConcepts: [
          'Hai con trỏ không phải con trỏ địa chỉ int*, mà là hai ngón tay chỉ vị trí',
          'Hai con trỏ ngược chiều: co cụm từ 2 đầu mảng đã sắp xếp để loại bỏ cặp thừa',
          'Hai con trỏ cùng chiều (Cửa sổ trượt / Sliding Window): mô hình thân con sâu đo co giãn',
          'Công thức đếm nhanh (phai - trai + 1) và Bẫy phá sản khi mảng có số âm'
        ]
      },
      {
        id: 'ket_hop_ngan_xep_qhd_hai_con_tro',
        code: 'MOD-04',
        title: 'Kết Hợp: Ngăn Xếp, Quy Hoạch Động & Hai Con Trỏ',
        track: 'combined_concepts',
        category: 'combined',
        path: '04_KetHop_NganXep_QHD_HaiConTro/index.html',
        summary: 'Khử đệ quy bằng Ngăn xếp, tăng tốc bước chuyển trạng thái Quy hoạch động bằng Ngăn xếp đơn điệu và Deque cửa sổ trượt.',
        x: 1060,
        y: 170,
        badge: 'Chuyên đề kết hợp',
        prerequisites: [
          'Đã nắm vững Đệ quy đuôi (MOD-01)',
          'Đã thành thạo Ngăn xếp đơn điệu (MOD-02)',
          'Đã hiểu bản chất Cửa sổ trượt (MOD-03)'
        ],
        newConcepts: [
          'Khử đệ quy bằng bảng Quy hoạch động (lập bảng kế hoạch cập nhật dần)',
          'Dùng Ngăn xếp đơn điệu tìm vị trí L[i] để kế thừa ngay dp[L[i]] trong O(1)',
          'Hàng đợi hai đầu đơn điệu (Monotonic Deque): Ghép Cửa sổ trượt K (Hai con trỏ) với Ngăn xếp đơn điệu'
        ]
      }
    ],
    edges: [
      {
        from: 'nhap_mon_cpp',
        to: 'may_cham',
        shortTag: 'Giao Tiếp → Hệ Thống',
        fromTitle: 'Nhập Môn C++ (MOD-Pre)',
        toTitle: 'Máy Chấm (MOD-00)',
        fromKnown: 'Ở bài Nhập Môn, bạn đã biết cách giao việc cho anh phụ bếp: mở ca main(), gõ chuông ;, tạo hộp biến và in/nhập dữ liệu.',
        bottleneck: 'Khi bạn viết code trong file .cpp, máy tính thực sự lưu trữ file ở đâu? Quá trình dịch từ chữ viết sang file .exe và kiểm tra đúng/sai hàng ngàn bài toán diễn ra như thế nào?',
        solution: 'Khám phá thế giới phần cứng: RAM vs Ổ cứng, Shell, PATH, trình biên dịch g++ và tự code máy chấm tự động sinh test để tìm lỗi sai!'
      },
      {
        from: 'may_cham',
        to: 'de_quy_duoi',
        shortTag: 'RAM → Stack',
        fromTitle: 'Máy Chấm (MOD-00)',
        toTitle: 'Đệ Quy & Đệ Quy Đuôi (MOD-01)',
        fromKnown: 'Ở bài Máy Chấm, bạn đã biết RAM là chiếc bàn làm việc tốc độ cao của CPU và hàm main() đặt các biến lên đó.',
        bottleneck: 'Khi hàm main() tự gọi một hàm con (hoặc hàm con tự gọi chính nó hàng ngàn lần), bàn làm việc RAM bị xử lý ra sao mà máy tính lại bị sập?',
        solution: 'Hệ điều hành kê thêm các "chiếc khay phụ" (Stack Frame) chồng lên nhau thành Call Stack. Đệ quy đuôi dạy cách chuyền sổ tổng kết để chỉ tốn đúng 1 khay!'
      },
      {
        from: 'de_quy_duoi',
        to: 'ngan_xep_don_dieu',
        shortTag: 'Ẩn → Tường Minh',
        fromTitle: 'Đệ Quy Đuôi (MOD-01)',
        toTitle: 'Ngăn Xếp Đơn Điệu (MOD-02)',
        fromKnown: 'Ở bài Đệ quy, bạn đã thấy hệ điều hành tự động dùng cơ chế ngăn xếp (vào sau ra trước - LIFO) để quản lý hàm con.',
        bottleneck: 'Khi gặp bài toán tìm người cao hơn gần nhất trên 200.000 cột, duyệt trâu mất N^2 bước. Ta không thể trông chờ vào hệ điều hành tự làm hộ.',
        solution: 'Tự tạo cấu trúc std::stack trên code và duy trì tính chất đơn điệu: loại bỏ ngay những phần tử bị người mới che khuất vĩnh viễn, đưa về O(N)!'
      },
      {
        from: 'ngan_xep_don_dieu',
        to: 'hai_con_tro',
        shortTag: 'Tính Đơn Điệu',
        fromTitle: 'Ngăn Xếp Đơn Điệu (MOD-02)',
        toTitle: 'Hai Con Trỏ (MOD-03)',
        fromKnown: 'Ở bài Ngăn xếp đơn điệu, bạn đã thấm nhuần tư duy: "Một phần tử bị loại bỏ thì vĩnh viễn không bao giờ cần xét lại".',
        bottleneck: 'Khi bài toán chuyển sang tìm đoạn con liên tiếp có tổng <= S, ngăn xếp không còn tiện lợi để thu hẹp đầu trái và mở rộng đầu phải linh hoạt.',
        solution: 'Chuyển hóa sang Hai con trỏ (Cửa sổ trượt): hai ngón tay cùng tiến về phía trước như con sâu đo co giãn, đạt O(N) thời gian và O(1) bộ nhớ phụ!'
      },
      {
        from: 'ngan_xep_don_dieu',
        to: 'ket_hop_ngan_xep_qhd_hai_con_tro',
        shortTag: 'Tối Ưu DP',
        fromTitle: 'Ngăn Xếp Đơn Điệu (MOD-02)',
        toTitle: 'Chuyên Đề Kết Hợp (MOD-04)',
        fromKnown: 'Bạn đã biết dùng Ngăn xếp đơn điệu để tìm phần tử nhỏ hơn gần nhất L[i] trong O(N).',
        bottleneck: 'Trong bài toán Quy hoạch động, bước chuyển dp[i] phải duyệt lại toàn bộ các trạng thái cũ j < i mất O(N) mỗi bước -> Cả bài tốn O(N^2) (TLE).',
        solution: 'Dùng Ngăn xếp đơn điệu tìm nhanh vị trí L[i] và tái sử dụng trực tiếp dp[L[i]], đưa bước chuyển DP về O(1)!'
      },
      {
        from: 'hai_con_tro',
        to: 'ket_hop_ngan_xep_qhd_hai_con_tro',
        shortTag: 'Cửa Sổ + Deque',
        fromTitle: 'Hai Con Trỏ (MOD-03)',
        toTitle: 'Chuyên Đề Kết Hợp (MOD-04)',
        fromKnown: 'Bạn đã biết dùng Cửa sổ trượt (Hai con trỏ) để duy trì phạm vi dịch chuyển độ dài K.',
        bottleneck: 'Khi bài toán Quy hoạch động giới hạn bước nhảy trong phạm vi K bước, Hai con trỏ thuần túy chỉ theo dõi được tổng chứ không tìm được min/max của dp.',
        solution: 'Ghép Cửa sổ trượt (Hai con trỏ ở đầu front) với Ngăn xếp đơn điệu (ở đuôi back) tạo thành Hàng đợi hai đầu (std::deque) tối ưu DP cửa sổ K trong O(N)!'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.PORTAL_DATA = PORTAL_DATA;
  }
})();
