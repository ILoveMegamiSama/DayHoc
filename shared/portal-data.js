/**
 * DỮ LIỆU CÂY KỸ NĂNG CP & DANH SÁCH BÀI GIẢNG TOÀN CỤC (HƯỚNG A — LỘ TRÌNH LỚP 9)
 * 4 Track, 23 Node (lộ trình chuẩn Lớp 9 đến hết Quy hoạch động cơ bản + 2 bài Mở rộng).
 * Dùng cho Trang Chủ (index.html) để render sơ đồ tương tác DAG,
 * kiểm toán tiền đề (Prerequisite Audit) và chi tiết cầu nối tư duy (Bridge Inspector).
 */
(function() {
  const PORTAL_DATA = {
    title: 'Học Viện Lập Trình Thi Đấu C++ (CP) — Lộ Trình Lớp 9 Đến Hết Quy Hoạch Động Cơ Bản',
    subtitle: 'Nguồn học liệu mở, bài giảng tương tác theo tư duy bản chất (Đời sống → C++ → Thuật ngữ) và code mẫu chuẩn CP.',
    tracks: [
      {
        id: 'foundations',
        title: '1. Nền Tảng Giao Tiếp, Chuẩn CP & Hệ Thống',
        shortTitle: 'Nền tảng',
        color: '#57534E'
      },
      {
        id: 'tier1_core',
        title: '2. Tầng 1 — C++ Lập Trình & Tư Duy Thuật Toán Sơ Khai',
        shortTitle: 'Tầng 1',
        color: '#1B6B4A'
      },
      {
        id: 'tier2_dp',
        title: '3. Tầng 2 — Tuyến Tính, Quay Lui & Quy Hoạch Động Cơ Bản',
        shortTitle: 'Tầng 2: DP Cơ Bản',
        color: '#C84B31'
      },
      {
        id: 'extension',
        title: '4. Mở Rộng Sau Tầng 2 (Tối Ưu Nâng Cao)',
        shortTitle: 'Mở rộng sau Tầng 2',
        color: '#9A5B13'
      }
    ],
    nodes: [
      // =========================================================================
      // TRACK 1: FOUNDATIONS (3 bài)
      // =========================================================================
      {
        id: 'nhap_mon_cpp',
        code: 'MOD-Pre',
        title: 'Nhập Môn Lập Trình C++ (Bản Chất Giao Tiếp)',
        track: 'foundations',
        category: 'foundation',
        path: '00_NhapMon_LapTrinh_CPP/index.html',
        summary: 'Xóa tan nỗi sợ: học cách chỉ dẫn Anh Phụ Bếp Thật Thà. Giải phẫu cửa chính main(), chuông dứt lệnh (;), hộp biến RAM và loa/khe cin/cout.',
        x: 130,
        y: 56,
        badge: 'Khởi đầu',
        status: 'ready',
        phase: 'pha1_array',
        prerequisites: [
          'Chưa cần biết gì về lập trình',
          'Chỉ cần biết sử dụng chuột và bàn phím máy tính cơ bản'
        ],
        newConcepts: [
          'Bản chất lập trình: ủy thác việc cho một người phụ việc ngây ngô máy móc',
          'Cánh cửa chính main() và tiếng chuông đồng dứt câu lệnh (;)',
          'Hộp dán nhãn trên kệ RAM: int, double, string, char, bool và phép chia nguyên 5 / 2 = 2',
          'Kênh giao tiếp hai chiều: loa phát thanh cout << và khe nhận phiếu order cin >>'
        ]
      },
      {
        id: 'chuan_hoa_code_cp',
        code: 'MOD-CP0',
        title: 'Chương Phụ: Chuẩn Hóa Code C++ Hướng Thi Đấu (CP)',
        track: 'foundations',
        category: 'foundation',
        path: '00b_ChuanHoa_Code_CP/index.html',
        summary: 'Giải phẫu bộ khung CP chuẩn mực: #include <bits/stdc++.h>, using namespace std;, tăng tốc nhập xuất Fast I/O và bẫy trộn scanf/printf.',
        x: 415,
        y: 56,
        badge: 'Chuẩn CP',
        status: 'ready',
        phase: 'pha1_array',
        prerequisites: [
          'Đã học xong MOD-Pre: biết hàm main(), biến cơ bản và nhập xuất bằng cin/cout'
        ],
        newConcepts: [
          'Thùng đồ nghề đa năng #include <bits/stdc++.h> thay cho việc gọi rời rạc từng thư viện',
          'Không gian tên using namespace std; và bẫy đặt tên biến trùng (count, min, max, left, right)',
          'Fast I/O (ios_base::sync_with_stdio(false); cin.tie(NULL);) và dùng \'\\n\' thay cho endl',
          'Cấm kỵ trộn scanf/printf với cin/cout khi đã tắt đồng bộ luồng C/C++'
        ]
      },
      {
        id: 'may_cham',
        code: 'MOD-00',
        title: 'Kiến Trúc Máy Tính, g++ & Tự Code Máy Chấm',
        track: 'foundations',
        category: 'foundation',
        path: 'MayCham/index.html',
        summary: 'Hiểu bản chất phần cứng, RAM vs Ổ cứng, Shell, biến PATH, g++, cờ -static và tự động hóa tìm test sai bằng máy chấm C++14 (Stress Testing).',
        x: 1270,
        y: 56,
        badge: 'Nền tảng',
        status: 'ready',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã học xong MOD-Pre và nắm khung code chuẩn CP ở MOD-CP0',
          'Biết cách mở môi trường lập trình (Code::Blocks hoặc Terminal Linux)'
        ],
        newConcepts: [
          'RAM là chiếc bàn làm việc tốc độ cao, Ổ cứng là chiếc tủ hồ sơ lưu trữ lâu dài',
          'Hệ điều hành, Shell (cmd.exe / bash), biến danh bạ hệ thống PATH',
          'Trình biên dịch g++, cờ tối ưu (-O2, -static) và bản chất file thực thi .exe',
          'Tự code máy chấm ngẫu nhiên (Stress Testing) đối chiếu code trâu và code tối ưu'
        ]
      },

      // =========================================================================
      // TRACK 2: TIER 1 CORE (7 bài)
      // =========================================================================
      {
        id: 'dieu_khien_luong',
        code: 'L1-01',
        title: 'Điều Khiển Luồng, Vòng Lặp & Số Nguyên Lớn',
        track: 'tier1_core',
        category: 'tier1',
        path: 'L1_01_DieuKhienLuong_VongLap/index.html',
        summary: 'Rẽ nhánh if/else, vòng lặp for/while, bẫy tràn số int (10^9 * 10^9) với kiểu long long và phép chia lấy dư % chuẩn CP.',
        x: 700,
        y: 200,
        badge: 'Tầng 1',
        status: 'ready',
        phase: 'pha1_array',
        prerequisites: [
          'Đã nắm khung code chuẩn CP ở MOD-CP0 (Fast I/O, using namespace std;)'
        ],
        newConcepts: [
          'Ngã tư quyết định if / else if / else và toán tử quan hệ, logic (&&, ||, !)',
          'Vòng lặp for, while và điều khiển ngắt/bỏ qua lượt bằng break, continue',
          'Bẫy tràn số 32-bit int (~2.14e9) và ép kiểu 1LL * a * b sang long long 64-bit',
          'Phép chia lấy dư % và tính chất số học không tràn khi tính tổng/tích theo modulo'
        ]
      },
      {
        id: 'mang_xau_mo_phong',
        code: 'L1-02',
        title: 'Mảng 1D/2D, Xâu Ký Tự & Mô Phỏng',
        track: 'tier1_core',
        category: 'tier1',
        path: 'L1_02_Mang_Xau_MoPhong/index.html',
        summary: 'Dùng mảng tĩnh toàn cục const int N để chứa cả dãy số lớn, ma trận 2 chiều, xử lý string và giải bài toán Mô phỏng / Chia trường hợp.',
        x: 985,
        y: 200,
        badge: 'Tầng 1',
        status: 'ready',
        phase: 'pha1_array',
        prerequisites: [
          'Đã thành thạo vòng lặp for/while và kiểu long long ở L1-01'
        ],
        newConcepts: [
          'Mảng tĩnh 1 chiều toàn cục (const int N = 1e6 + 5; int a[N];) đặt ngoài main() để tránh tràn bộ nhớ',
          'Mảng 2 chiều (bảng lưới ô vuông), mảng đánh dấu / đếm tần suất (Frequency Array)',
          'Xâu ký tự std::string, mã ASCII ký tự và xử lý getline sau cin',
          'Tư duy Mô phỏng từng bước (Simulation) và Chia trường hợp sạch sẽ (Casework)'
        ]
      },
      {
        id: 'ham_va_bo_nho',
        code: 'L1-03',
        title: 'Hàm, Tham Chiếu & Bộ Nhớ Stack/Heap',
        track: 'tier1_core',
        category: 'tier1',
        path: 'L1_03_Ham_ThamChieu_BoNho/index.html',
        summary: 'Chia chương trình lớn thành các hàm nhỏ độc lập; phân biệt truyền tham trị vs tham chiếu (&) và ranh giới bộ nhớ Stack (~8MB) vs toàn cục.',
        x: 1270,
        y: 200,
        badge: 'Tầng 1',
        status: 'ready',
        phase: 'pha1_array',
        prerequisites: [
          'Đã biết khai báo và thao tác trên mảng tĩnh toàn cục, xâu ký tự ở L1-02'
        ],
        newConcepts: [
          'Tách việc lớn thành hàm void / hàm trả về giá trị (return) rõ ràng, dễ debug',
          'Truyền tham trị (bản sao) vs Truyền tham chiếu & (chỉnh sửa trực tiếp bản gốc)',
          'Phạm vi biến cục bộ vs biến toàn cục và tuổi thọ biến trong ngăn xếp lời gọi hàm',
          'Giới hạn dung lượng bộ nhớ Stack (~8MB) so với vùng dữ liệu tĩnh/Heap'
        ]
      },
      {
        id: 'do_phuc_tap',
        code: 'L1-04',
        title: 'Phân Tích Độ Phức Tạp Thuật Toán (O-notation)',
        track: 'tier1_core',
        category: 'tier1',
        path: 'L1_04_DoPhucTap_ThuatToan/index.html',
        summary: 'Dự đoán TLE trước khi bấm nộp bài: đếm số phép tính qua ký hiệu Big-O, quy tắc 10^8 phép/giây và cách đọc giới hạn N để chọn thuật toán.',
        x: 1555,
        y: 200,
        badge: 'Tầng 1',
        status: 'ready',
        phase: 'pha1_array',
        prerequisites: [
          'Đã nắm vững vòng lặp lồng nhau (L1-01), mảng (L1-02) và hàm (L1-03)'
        ],
        newConcepts: [
          'Đếm số phép toán sơ cấp và hiểu ý nghĩa ký hiệu O(1), O(log N), O(N), O(N log N), O(N^2), O(2^N)',
          'Quy tắc vàng CPU ~10^8 phép tính/giây để ước lượng thời gian chạy thực tế',
          'Kỹ năng ngược: Đọc giới hạn N trong đề (N <= 20, 10^3, 10^5, 10^9) để đoán ngay thuật toán hợp lệ',
          'Độ phức tạp không gian (Space Complexity) và giới hạn bộ nhớ 256MB'
        ]
      },
      {
        id: 'sap_xep_vector',
        code: 'L1-05',
        title: 'std::vector, pair & Sắp Xếp (std::sort)',
        track: 'tier1_core',
        category: 'tier1',
        path: 'L1_05_Vector_Pair_SapXep/index.html',
        summary: 'Bước sang Pha 2 STL: nâng cấp từ mảng tĩnh sang mảng co giãn std::vector, gói cặp dữ liệu pair và làm chủ hàm std::sort với Custom Comparator.',
        x: 1840,
        y: 200,
        badge: 'Mở STL',
        status: 'planned',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã hoàn thành Pha 1 (đến L1-04): vững mảng tĩnh toàn cục, tham chiếu & và phân tích Big-O'
        ],
        newConcepts: [
          'std::vector<T>: chiếc túi co giãn tự động trên Heap, các thao tác push_back, size, resize',
          'Mở khóa truyền vector& / const vector& vào hàm để tránh copy chậm O(N)',
          'std::pair<T1, T2> và vector<pair> để lưu thông tin đi kèm (giá trị + chỉ số, tọa độ)',
          'std::sort O(N log N) và viết hàm so sánh tùy biến (Custom Comparator) chuẩn strict weak ordering'
        ]
      },
      {
        id: 'stl_tra_cuu_hang_doi',
        code: 'L1-06',
        title: 'Bộ Công Cụ STL (set, map, priority_queue, deque)',
        track: 'tier1_core',
        category: 'tier1',
        path: 'L1_06_STL_TraCuu_HangDoi/index.html',
        summary: 'Làm chủ tủ hồ sơ tự sắp xếp set/map O(log N), tránh bẫy anti-hash của unordered_map, cùng hàng đợi ưu tiên priority_queue (Heap) và deque.',
        x: 2125,
        y: 200,
        badge: 'Tầng 1',
        status: 'planned',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã thành thạo std::vector, pair và std::sort (L1-05)'
        ],
        newConcepts: [
          'std::set & std::multiset: tập hợp luôn giữ thứ tự tăng, thêm/xóa/tìm kiếm O(log N)',
          'std::map: từ điển ánh xạ khóa-giá trị cho số lớn/xâu; cảnh báo bẫy TLE anti-hash của unordered_map',
          'std::priority_queue (Max-Heap & Min-Heap): luôn bốc được phần tử lớn nhất/nhỏ nhất trong O(log N)',
          'std::deque: hàng đợi hai đầu thêm/bớt linh hoạt cả đầu lẫn cuối trong O(1)'
        ]
      },
      {
        id: 'so_hoc_co_ban',
        code: 'L1-07',
        title: 'Số Học Nhập Môn Cho CP',
        track: 'tier1_core',
        category: 'tier1',
        path: 'L1_07_SoHoc_NhapMon_CP/index.html',
        summary: 'Tìm ước và kiểm tra nguyên tố trong O(sqrt(N)), Sàng Eratosthenes, thuật toán Euclid GCD/LCM, phép toán đồng dư và Lũy thừa nhị phân O(log K).',
        x: 2410,
        y: 200,
        badge: 'Tầng 1',
        status: 'planned',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã học độ phức tạp (L1-04), vector (L1-05) và kiến thức modulo cơ bản (L1-01)'
        ],
        newConcepts: [
          'Tính đối xứng của cặp ước (d, N/d) để duyệt ước và kiểm tra nguyên tố trong O(sqrt(N))',
          'Sàng nguyên tố Eratosthenes O(N log log N) trên vector<bool>',
          'Thuật toán Euclid tính GCD/LCM trong O(log(min(a, b)))',
          'Số học đồng dư an toàn với phép trừ (a - b + M) % M và Lũy thừa nhị phân (a^b) % M trong O(log b)'
        ]
      },

      // =========================================================================
      // TRACK 3: TIER 2 — LINEAR TOOLS, BACKTRACKING & CORE DP (11 bài)
      // =========================================================================
      {
        id: 'mang_cong_don',
        code: 'L2-01',
        title: 'Mảng Cộng Dồn (1D/2D) & Mảng Hiệu',
        track: 'tier2_dp',
        category: 'tier2',
        path: 'L2_01_MangCongDon_MangHieu/index.html',
        summary: 'Biến Q truy vấn tổng đoạn [L, R] từ O(Q*N) thành O(N + Q) bằng Prefix Sum 1D/2D, và cập nhật cộng hàng loạt trên đoạn trong O(1) với Difference Array.',
        x: 2125,
        y: 360,
        badge: 'Tầng 2',
        status: 'planned',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã nắm mảng 1D/2D, độ phức tạp (L1-04) và std::vector (L1-05)'
        ],
        newConcepts: [
          'Mảng cộng dồn 1D (Prefix Sum): lưu sẵn tổng tiền tố S[i] để trả lời tổng đoạn [L, R] = S[R] - S[L - 1] trong O(1)',
          'Mảng cộng dồn 2D (Prefix Sum trên bảng): công thức bao hàm - loại trừ cho hình chữ nhật con',
          'Mảng hiệu (Difference Array): đánh dấu +val tại L và -val tại R + 1 rồi cộng dồn cuối cùng để tăng đoạn O(1)'
        ]
      },
      {
        id: 'tim_kiem_nhi_phan',
        code: 'L2-02',
        title: 'Tìm Kiếm Nhị Phân & Chặt Nhị Phân Đáp Án',
        track: 'tier2_dp',
        category: 'tier2',
        path: 'L2_02_TimKiemNhiPhan/index.html',
        summary: 'Từ trò chơi đoán số chia đôi khoảng tìm kiếm O(log N), sử dụng lower_bound/upper_bound đến kỹ thuật Chặt nhị phân trên tập đáp án đơn điệu.',
        x: 2125,
        y: 620,
        badge: 'Tầng 2',
        status: 'planned',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã thành thạo std::vector và std::sort (L1-05)',
          'Hiểu bản chất hàm số/điều kiện đơn điệu tăng hoặc giảm'
        ],
        newConcepts: [
          'Vòng lặp tìm kiếm nhị phân (while l <= r) và cách giữ đúng bất biến biên tránh lặp vô tận',
          'lower_bound & upper_bound trong STL để tìm vị trí đầu tiên >= x hoặc > x trong O(log N)',
          'Chặt nhị phân đáp án (Binary Search on Answer): biến bài toán tối ưu thành hàm kiểm tra check(mid) đúng/sai đơn điệu'
        ]
      },
      {
        id: 'hai_con_tro',
        code: 'MOD-03',
        title: 'Kỹ Thuật Hai Con Trỏ & Cửa Sổ Trượt',
        track: 'tier2_dp',
        category: 'tier2',
        path: '03_HaiConTro/index.html',
        summary: 'Khung cửa sổ co giãn trượt trên mảng: Hai con trỏ ngược chiều trên mảng đã sort và Cửa sổ trượt cùng chiều O(N), điều kiện biên và bẫy số âm.',
        x: 2410,
        y: 360,
        badge: 'Tầng 2',
        status: 'ready',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã học std::vector và sắp xếp bằng std::sort() (L1-05)',
          'Đã hiểu Mảng Cộng Dồn 1D (L2-01) và tính chất đơn điệu trên dãy số không âm'
        ],
        newConcepts: [
          'Hai con trỏ không phải con trỏ địa chỉ int*, mà là hai chỉ số vị trí chạy đơn điệu',
          'Hai con trỏ ngược chiều: co cụm từ 2 đầu mảng đã sắp xếp để loại bỏ cặp thừa trong O(N)',
          'Hai con trỏ cùng chiều (Cửa sổ trượt / Sliding Window): mô hình thân con sâu đo co giãn',
          'Công thức đếm nhanh đoạn con hợp lệ (phai - trai + 1) và bẫy phá sản khi dãy có số âm'
        ]
      },
      {
        id: 'de_quy_duoi',
        code: 'MOD-01',
        title: 'Đệ Quy, Ngăn Xếp Lời Gọi Hàm & Đệ Quy Đuôi',
        track: 'tier2_dp',
        category: 'tier2',
        path: '01_DeQuy_Va_DeQuyDuoi/index.html',
        summary: 'Kê thêm khay phụ trên bàn làm việc RAM: giải phẫu Call Stack, cơ chế Stack Overflow và kỹ thuật Đệ quy đuôi (TCO) tối ưu bộ nhớ.',
        x: 1555,
        y: 490,
        badge: 'Tầng 2',
        status: 'ready',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã học Hàm, Tham Chiếu & Bộ Nhớ Stack/Heap (L1-03)',
          'Đã hiểu từ Máy Chấm (MOD-00): RAM là chiếc bàn làm việc tốc độ cao của CPU'
        ],
        newConcepts: [
          'Khay phụ kê thêm trên bàn làm việc RAM (Stack Frame) mỗi khi một hàm được gọi',
          'Chồng các khay phụ khi hàm gọi hàm (Call Stack) và giới hạn tràn ngăn xếp (~8MB)',
          'Đệ quy ("Đệ" = chuyển tiếp, "Quy" = quay về) và Điểm dừng (Base case)',
          'Cuốn sổ tổng kết chuyền tay (Biến tích lũy Accumulator) và Đệ quy đuôi (TCO)'
        ]
      },
      {
        id: 'ngan_xep_hang_doi',
        code: 'L2-03',
        title: 'Ngăn Xếp (stack) & Hàng Đợi (queue) Cơ Bản',
        track: 'tier2_dp',
        category: 'tier2',
        path: 'L2_03_NganXep_HangDoi_CoBan/index.html',
        summary: 'Biến cơ chế ẩn bên dưới Call Stack thành cấu trúc tường minh: Ngăn xếp LIFO (khớp ngoặc, tính biểu thức) và Hàng đợi FIFO (mô phỏng dòng người chờ).',
        x: 1840,
        y: 620,
        badge: 'Tầng 2',
        status: 'planned',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã hiểu cơ chế chồng khay vào-sau-ra-trước từ bài Đệ Quy (MOD-01)',
          'Đã làm quen container STL từ L1-05 / L1-06'
        ],
        newConcepts: [
          'Nguyên lý LIFO (Vào sau ra trước) với std::stack: push, pop, top, empty',
          'Ứng dụng kinh điển của Stack: kiểm tra dãy ngoặc hợp lệ, khử đệ quy và tính biểu thức hậu tố',
          'Nguyên lý FIFO (Vào trước ra trước) với std::queue: push, pop, front',
          'Mô phỏng hàng chờ xử lý tuần tự và chuẩn bị nền tảng cho thuật toán loang/BFS'
        ]
      },
      {
        id: 'duyet_toan_bo_quay_lui',
        code: 'L2-04',
        title: 'Cây Đệ Quy, Quay Lui & Bitmask Tập Con',
        track: 'tier2_dp',
        category: 'tier2',
        path: 'L2_04_DuyetToanBo_QuayLui_Bitmask/index.html',
        summary: 'Vẽ cây quyết định cho mọi khả năng (N <= 20): Quay lui (Backtracking) sinh nhị phân, tổ hợp, hoán vị, N-Queens, cắt nhánh và Bitmask tập con 2^N.',
        x: 1840,
        y: 490,
        badge: 'Tầng 2',
        status: 'planned',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã hiểu rõ Đệ quy và điểm dừng (MOD-01)',
          'Biết tự sinh test và đối chiếu code trâu bằng Máy chấm (MOD-00)'
        ],
        newConcepts: [
          'Cây đệ quy đa nhánh: mô hình hóa mọi bước chọn - thử - trả lại trạng thái (Backtracking)',
          'Sinh xâu nhị phân, tổ hợp C(N, K), hoán vị N phần tử và bài toán xếp hậu (N-Queens)',
          'Kỹ thuật Nhánh cận (Branch & Bound) cắt bỏ sớm nhánh chắc chắn tệ hơn kỷ lục hiện tại',
          'Phép toán Bit (&, |, ^, <<, >>) và dùng số nguyên làm Bitmask duyệt 2^N tập con'
        ]
      },
      {
        id: 'tham_lam',
        code: 'L2-05',
        title: 'Thuật Toán Tham Lam & Điểm Gãy Của Tham Lam',
        track: 'tier2_dp',
        category: 'tier2',
        path: 'L2_05_ThamLam_Va_DiemGay/index.html',
        summary: 'Chọn phương án lợi nhất trước mắt (lập lịch chọn việc, nối dây bằng priority_queue), chứng minh Exchange Argument và nhận diện khi nào Tham lam BỊ SAI.',
        x: 2410,
        y: 620,
        badge: 'Tầng 2',
        status: 'planned',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã thành thạo std::sort với Comparator (L1-05) và priority_queue (L1-06)',
          'Biết kiểm chứng bằng code duyệt toàn bộ / chặt nhị phân (L2-02)'
        ],
        newConcepts: [
          'Tư duy Tham lam (Greedy): đưa ra lựa chọn tối ưu cục bộ ở mỗi bước mà không quay lại sửa',
          'Các mẫu tham lam chuẩn: lập lịch chọn đoạn kết thúc sớm, ghép cặp, nối dây Min-Heap',
          'Phương pháp kiểm chứng tính đúng đắn bằng đối chứng hoán đổi (Exchange Argument)',
          'Điểm gãy của Tham lam: các bài toán đổi tiền, chọn quà khiến Tham lam thất bại — mở đường sang Quy hoạch động!'
        ]
      },
      {
        id: 'dp_nhap_mon',
        code: 'L2-06',
        title: 'Nhập Môn Quy Hoạch Động (DP 1D & Truy Vết)',
        track: 'tier2_dp',
        category: 'tier2',
        path: 'L2_06_QHD_NhapMon_1D/index.html',
        summary: 'Bước ngoặt quan trọng nhất: từ Tham lam sai & Cây đệ quy trùng lặp tiến lên Đệ quy có nhớ (Memoization), Lập bảng 1D (Tabulation) và Truy vết nghiệm.',
        x: 2695,
        y: 490,
        badge: 'Core DP',
        status: 'planned',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã thấy giới hạn bế tắc của Tham lam (L2-05)',
          'Đã biết vẽ Cây đệ quy & bài toán con từ Quay lui (L2-04)'
        ],
        newConcepts: [
          'Phát hiện bài toán con gối nhau (Overlapping Subproblems) trên cây đệ quy O(2^N)',
          'Đệ quy có nhớ (Top-Down Memoization) vs Lập bảng vòng lặp (Bottom-Up Tabulation)',
          'Định nghĩa trạng thái dp[i], công thức truy hồi (Pull DP vs Push DP) và giá trị cơ sở',
          'Kỹ thuật DP 1D (Cầu thang, Frog 1/2, Đổi tiền min) và Truy vết mảng trace[] tìm lại dãy bước chọn'
        ]
      },
      {
        id: 'dp_luoi_2d',
        code: 'L2-07',
        title: 'DP Lưới 2D & Tối Ưu Bộ Nhớ (Rolling Array)',
        track: 'tier2_dp',
        category: 'tier2',
        path: 'L2_07_QHD_Luoi2D_BoNho/index.html',
        summary: 'Mở rộng bảng phương án lên 2 chiều trên lưới ô vuông N x M (tổng đường đi lớn nhất/nhỏ nhất, đếm đường tránh vật cản) và kỹ thuật cuộn mảng giảm RAM.',
        x: 2980,
        y: 360,
        badge: 'Core DP',
        status: 'planned',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã nắm vững định nghĩa trạng thái, truy hồi và lập bảng 1D ở Nhập Môn QHD (L2-06)'
        ],
        newConcepts: [
          'Bảng trạng thái 2 chiều dp[i][j] cho bài toán di chuyển trên ma trận ô vuông',
          'Đếm số đường đi có vật cản theo modulo và tối ưu tổng đường đi min/max',
          'Xử lý chuẩn biên bảng (hàng 0, cột 0 hoặc dịch chỉ số 1-based để code gọn sạch)',
          'Kỹ thuật Cuộn Mảng (Rolling Array) nén dp[N][M] xuống chỉ còn 2 hàng hoặc 1 hàng O(M) bộ nhớ'
        ]
      },
      {
        id: 'dp_cai_tui',
        code: 'L2-08',
        title: 'Tổ Hợp Đếm Sơ Cấp & DP Cái Túi (Knapsack)',
        track: 'tier2_dp',
        category: 'tier2',
        path: 'L2_08_QHD_CaiTui_ToHopDem/index.html',
        summary: 'Quy tắc cộng/nhân & tam giác Pascal C(n, k) dẫn vào 0/1 Knapsack, Unbounded Knapsack, phân biệt Hoán vị vs Tổ hợp (Coin Comb I/II) và đổi chiều giá trị.',
        x: 2980,
        y: 490,
        badge: 'Core DP',
        status: 'planned',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã vững DP 1D (L2-06), phép chia dư modulo (L1-07) và quen mảng 2D / cuộn mảng (L2-07)'
        ],
        newConcepts: [
          'Quy tắc cộng, quy tắc nhân và tính tổ hợp C(n, k) bằng tam giác Pascal trong O(N^2)',
          'Bài toán Cái Túi 0/1 (mỗi vật chọn tối đa 1 lần): thứ tự duyệt ngược trọng lượng khi nén về 1D',
          'Cái Túi vô hạn (Unbounded Knapsack) và bẫy thứ tự 2 vòng lặp: Đếm Hoán Vị vs Đếm Tổ Hợp',
          'Kỹ thuật đổi chiều trạng thái (Knapsack 2): đổi DP theo tổng giá trị khi sức chứa W quá lớn (10^9)'
        ]
      },
      {
        id: 'dp_day_con_xau',
        code: 'L2-09',
        title: 'DP Dãy Con, Xâu & Máy Trạng Thái Cơ Bản',
        track: 'tier2_dp',
        category: 'tier2',
        path: 'L2_09_QHD_DayCon_Xau_TrangThai/index.html',
        summary: 'Cột mốc tốt nghiệp Tầng 2 Lớp 9: Dãy con tăng dài nhất (LIS O(N^2)), Xâu con chung dài nhất (LCS), Khoảng cách biến đổi xâu và DP Máy trạng thái.',
        x: 3265,
        y: 425,
        badge: 'Tốt nghiệp',
        status: 'planned',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã hoàn thành DP Lưới 2D (L2-07) và DP Cái Túi / Tổ hợp đếm (L2-08)'
        ],
        newConcepts: [
          'Dãy con tăng dài nhất (LIS) trong O(N^2): trạng thái kết thúc tại vị trí i và truy vết dãy',
          'Xâu con chung dài nhất (LCS) và Khoảng cách biến đổi xâu (Edit Distance) bằng bảng 2D trên tiền tố',
          'DP Máy trạng thái theo ngày (như bài Vacation): thêm chiều nhỏ dp[i][state] lưu hành động ngày trước',
          'Tổng hợp bản đồ nhận diện 4 nhóm DP cơ bản chuẩn HSG Tin học Lớp 9'
        ]
      },

      // =========================================================================
      // TRACK 4: EXTENSION AFTER TIER 2 (2 bài đã có sẵn)
      // =========================================================================
      {
        id: 'ngan_xep_don_dieu',
        code: 'MOD-02',
        title: 'Ngăn Xếp & Ngăn Xếp Đơn Điệu (Monotonic Stack)',
        track: 'extension',
        category: 'extension',
        path: '02_NganXep_Va_NganXepDonDieu/index.html',
        summary: 'Từ cơ chế LIFO tiến lên Ngăn xếp đơn điệu: tìm phần tử che khuất gần nhất trong O(N) khấu hao và bài toán hình chữ nhật lớn nhất.',
        x: 2125,
        y: 765,
        badge: 'Mở rộng',
        status: 'ready',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã học Ngăn Xếp & Hàng Đợi Cơ Bản (L2-03): nắm vững nguyên lý LIFO của std::stack',
          'Biết sử dụng std::vector và lưu chỉ số (index) trong C++'
        ],
        newConcepts: [
          'Ngăn xếp đơn điệu (Monotonic Stack): giữ hàng người cao dần/thấp dần, loại bỏ kẻ bị che khuất vĩnh viễn',
          'Lưu chỉ số vị trí (Index) thay vì giá trị thuần túy để tính khoảng cách mở rộng hai biên',
          'Phân tích độ phức tạp khấu hao (Amortized O(1)) — mỗi phần tử vào và ra stack tối đa 1 lần'
        ]
      },
      {
        id: 'ket_hop_ngan_xep_qhd_hai_con_tro',
        code: 'MOD-04',
        title: 'Kết Hợp: Ngăn Xếp Đơn Điệu, QHD & Hai Con Trỏ',
        track: 'extension',
        category: 'extension',
        path: '04_KetHop_NganXep_QHD_HaiConTro/index.html',
        summary: 'Chuyên đề tăng tốc nâng cao: tối ưu bước chuyển trạng thái Quy hoạch động từ O(N^2) xuống O(N) bằng Ngăn xếp đơn điệu và Deque cửa sổ trượt.',
        x: 2980,
        y: 765,
        badge: 'Mở rộng',
        status: 'ready',
        phase: 'pha2_stl',
        prerequisites: [
          'Đã hoàn thành Nhập Môn Quy Hoạch Động (L2-06)',
          'Đã thành thạo Ngăn xếp đơn điệu (MOD-02)',
          'Đã hiểu bản chất Cửa sổ trượt / Hai con trỏ (MOD-03)'
        ],
        newConcepts: [
          'Nhận diện nút thắt O(N^2) khi công thức DP phải duyệt lại dãy trạng thái cũ j < i',
          'Dùng Ngăn xếp đơn điệu tìm nhanh vị trí L[i] để kế thừa trực tiếp dp[L[i]] trong O(1)',
          'Hàng đợi hai đầu đơn điệu (Monotonic Deque): ghép Cửa sổ trượt K (Hai con trỏ) với tính đơn điệu để tối ưu DP trong O(N)'
        ]
      }
    ],
    edges: [
      // Track 1 -> Track 1 & Track 2
      {
        from: 'nhap_mon_cpp',
        to: 'chuan_hoa_code_cp',
        shortTag: 'Chuẩn CP',
        fromTitle: 'Nhập Môn C++ (MOD-Pre)',
        toTitle: 'Chuẩn Hóa Code CP (MOD-CP0)',
        fromKnown: 'Bạn đã biết mở cửa main(), dùng ; kết thúc lệnh, khai báo hộp biến và nhập xuất bằng cin/cout.',
        bottleneck: 'Khi làm bài thi đấu thật với 10^5–10^6 số, việc phải nhớ từng #include riêng lẻ và cin/cout chạy chậm dễ dẫn tới lỗi TLE.',
        solution: 'Đóng gói bộ khung chuẩn CP: #include <bits/stdc++.h>, using namespace std; và Fast I/O để đọc hàng triệu số trong tích tắc!'
      },
      {
        from: 'chuan_hoa_code_cp',
        to: 'may_cham',
        shortTag: 'Máy chấm',
        fromTitle: 'Chuẩn Hóa Code CP (MOD-CP0)',
        toTitle: 'Kiến Trúc & Máy Chấm (MOD-00)',
        fromKnown: 'Bạn đã có bộ khung code C++ chuẩn CP hoàn chỉnh.',
        bottleneck: 'Code chạy đúng vài ví dụ mẫu trên giấy nhưng khi nộp bài vẫn bị Wrong Answer vì test ẩn mà ta chưa hiểu compiler và RAM hoạt động ra sao.',
        solution: 'Hiểu RAM vs Ổ cứng, Shell, PATH, trình biên dịch g++ và tự viết bộ máy chấm ngẫu nhiên (Stress Test) tự tìm ra test làm code mình sai!'
      },
      {
        from: 'chuan_hoa_code_cp',
        to: 'dieu_khien_luong',
        shortTag: 'Luồng & Số',
        fromTitle: 'Chuẩn Hóa Code CP (MOD-CP0)',
        toTitle: 'Điều Khiển Luồng & Số Lớn (L1-01)',
        fromKnown: 'Bạn đã sẵn sàng viết chương trình C++ với khung Fast I/O chuẩn.',
        bottleneck: 'Chương trình mới chỉ chạy thẳng một mạch từ trên xuống dưới với những phép tính nhỏ, chưa biết rẽ nhánh hay lặp lại hàng triệu lần.',
        solution: 'Dùng if/else để máy tính ra quyết định, vòng lặp for/while để làm việc lặp lại và kiểu long long để tránh tràn số khi nhân 10^9!'
      },

      // Track 2 sequential spine
      {
        from: 'dieu_khien_luong',
        to: 'mang_xau_mo_phong',
        shortTag: 'Mảng & Xâu',
        fromTitle: 'Điều Khiển Luồng (L1-01)',
        toTitle: 'Mảng 1D/2D, Xâu & Mô Phỏng (L1-02)',
        fromKnown: 'Bạn đã biết lặp N lần và xử lý số nguyên lớn không bị tràn.',
        bottleneck: 'Nếu bài toán cho 100.000 số hoặc một bản đồ lưới 500x500 ô, ta không thể tạo 100.000 cái hộp biến đặt tên lẻ a1, a2, a3...',
        solution: 'Dùng mảng tĩnh toàn cục (const int N) làm dãy tủ có đánh số thứ tự để lưu trữ và mô phỏng bài toán thực tế dễ dàng!'
      },
      {
        from: 'mang_xau_mo_phong',
        to: 'ham_va_bo_nho',
        shortTag: 'Hàm & RAM',
        fromTitle: 'Mảng & Mô Phỏng (L1-02)',
        toTitle: 'Hàm, Tham Chiếu & Bộ Nhớ (L1-03)',
        fromKnown: 'Bạn đã thao tác được mảng toàn cục và xâu ký tự trong main().',
        bottleneck: 'Nhồi nhét toàn bộ logic dài 200 dòng vào hàm main() làm code rối mù; còn truyền mảng hay biến qua hàm sai cách lại làm mất thay đổi hoặc tốn bộ nhớ.',
        solution: 'Tách việc nhỏ thành hàm độc lập, phân biệt tham trị vs tham chiếu (&) và hiểu giới hạn Stack (~8MB) trên bàn làm việc RAM!'
      },
      {
        from: 'ham_va_bo_nho',
        to: 'do_phuc_tap',
        shortTag: 'Đo tốc độ',
        fromTitle: 'Hàm & Bộ Nhớ (L1-03)',
        toTitle: 'Độ Phức Tạp Thuật Toán (L1-04)',
        fromKnown: 'Bạn đã viết được các hàm xử lý trên mảng và hiểu giới hạn bộ nhớ.',
        bottleneck: 'Hai đoạn code cùng ra đáp án đúng nhưng một bài chạy 0.05s được AC, bài kia chạy 5 giây bị TLE — không biết trước khi nộp thì rất rủi ro.',
        solution: 'Học ký hiệu Big-O và quy tắc 10^8 phép/giây: chỉ cần nhìn giới hạn N trong đề bài là biết ngay thuật toán nào kịp thời gian!'
      },
      {
        from: 'do_phuc_tap',
        to: 'sap_xep_vector',
        shortTag: 'Mở Pha STL',
        fromTitle: 'Độ Phức Tạp Thuật Toán (L1-04)',
        toTitle: 'Vector, Pair & std::sort (L1-05)',
        fromKnown: 'Bạn đã vững Pha 1 (mảng tĩnh, hàm, phân tích O(N) vs O(N^2)).',
        bottleneck: 'Mảng tĩnh cố định kích thước không linh hoạt khi kích thước từng hàng khác nhau, và tự viết sắp xếp O(N^2) sẽ bị TLE khi N = 10^5.',
        solution: 'Chính thức mở khóa Pha 2 STL: dùng std::vector co giãn, pair ghép cặp và std::sort O(N log N) với hàm so sánh tùy biến!'
      },
      {
        from: 'sap_xep_vector',
        to: 'stl_tra_cuu_hang_doi',
        shortTag: 'Tra cứu STL',
        fromTitle: 'Vector & Sắp Xếp (L1-05)',
        toTitle: 'Bộ Công Cụ STL (L1-06)',
        fromKnown: 'Bạn đã dùng thành thạo vector, pair và sắp xếp một lần bằng sort().',
        bottleneck: 'Khi dữ liệu liên tục thêm mới hoặc xóa đi mà ta vừa muốn giữ thứ tự, vừa muốn đếm khóa lớn hoặc lấy phần tử lớn nhất ngay lập tức, sort lại mỗi lần tốn O(N^2 log N)!',
        solution: 'Trang bị bộ công cụ STL động: set/map giữ trật tự và tra cứu trong O(log N), cùng priority_queue (Heap) & deque cực linh hoạt!'
      },
      {
        from: 'stl_tra_cuu_hang_doi',
        to: 'so_hoc_co_ban',
        shortTag: 'Số học CP',
        fromTitle: 'Bộ Công Cụ STL (L1-06)',
        toTitle: 'Số Học Nhập Môn CP (L1-07)',
        fromKnown: 'Bạn đã làm chủ hầu hết các thùng chứa STL cơ bản và phân tích O().',
        bottleneck: 'Khi gặp bài đếm số nguyên tố tới 10^7, tính ước chung lớn nhất hoặc tính 2^(10^18) % M, chạy vòng lặp thuần O(N) hay O(K) lập tức TLE.',
        solution: 'Ứng dụng Sàng Eratosthenes O(N log log N) trên vector, Euclid GCD O(log N) và Lũy thừa nhị phân O(log K) cùng số học đồng dư an toàn!'
      },

      // Track 1/2 -> Track 3 (Recursion & Linear Tools)
      {
        from: 'ham_va_bo_nho',
        to: 'de_quy_duoi',
        shortTag: 'Hàm gọi hàm',
        fromTitle: 'Hàm & Bộ Nhớ (L1-03)',
        toTitle: 'Đệ Quy & Đệ Quy Đuôi (MOD-01)',
        fromKnown: 'Bạn đã biết một hàm được đặt vào ngăn xếp lời gọi hàm trên RAM.',
        bottleneck: 'Nhiều bài toán tự lặp lại cấu trúc nhỏ hơn của chính nó (cây phân cấp, chia bài toán). Nếu hàm tự gọi lại chính nó hàng trăm ngàn lần thì RAM xử lý thế nào?',
        solution: 'Giải phẫu Stack Frame và Call Stack, nắm vững Điểm dừng (Base case) và kỹ thuật Đệ quy đuôi (TCO) chuyền kết quả để chống tràn bộ nhớ!'
      },
      {
        from: 'may_cham',
        to: 'de_quy_duoi',
        shortTag: 'RAM → Stack',
        fromTitle: 'Máy Chấm (MOD-00)',
        toTitle: 'Đệ Quy & Đệ Quy Đuôi (MOD-01)',
        fromKnown: 'Từ bài Máy Chấm, bạn đã hiểu RAM là bàn làm việc tốc độ cao của CPU.',
        bottleneck: 'Khi chương trình chạy sâu hàng trăm ngàn tầng gọi hàm, bàn làm việc RAM bị chiếm dụng ra sao mà chương trình bị sập (Stack Overflow)?',
        solution: 'Quan sát trực tiếp các khay phụ chồng trên Call Stack (~8MB) và dùng Đệ quy đuôi giữ chỉ 1 khay làm việc!'
      },
      {
        from: 'sap_xep_vector',
        to: 'mang_cong_don',
        shortTag: 'Tổng đoạn O(1)',
        fromTitle: 'Vector & Sắp Xếp (L1-05)',
        toTitle: 'Mảng Cộng Dồn & Mảng Hiệu (L2-01)',
        fromKnown: 'Bạn đã quen dùng vector lưu dãy số và đo chi phí thuật toán.',
        bottleneck: 'Với 10^5 truy vấn hỏi tổng đoạn [L, R] hoặc tăng cả đoạn [L, R] thêm X, vòng lặp for lồng vào mỗi truy vấn sẽ tốn O(Q * N) và dính TLE.',
        solution: 'Tiền xử lý Mảng cộng dồn (1D/2D) để hỏi tổng mọi đoạn trong O(1), kết hợp Mảng hiệu để cập nhật đoạn trong O(1)!'
      },
      {
        from: 'sap_xep_vector',
        to: 'tim_kiem_nhi_phan',
        shortTag: 'Chia đôi O(log)',
        fromTitle: 'Vector & Sắp Xếp (L1-05)',
        toTitle: 'Tìm Kiếm Nhị Phân (L2-02)',
        fromKnown: 'Bạn đã biết dùng std::sort() đưa mảng về thứ tự tăng dần.',
        bottleneck: 'Sau khi mảng đã tăng dần, nếu vẫn tìm kiếm tuần tự từ đầu tới cuối thì mỗi truy vấn vẫn mất O(N) chậm chạp.',
        solution: 'Áp dụng Tìm kiếm nhị phân (lower_bound / upper_bound) O(log N) và mở rộng thành Chặt nhị phân trên tập đáp án đơn điệu!'
      },
      {
        from: 'sap_xep_vector',
        to: 'hai_con_tro',
        shortTag: 'Hai ngón tay',
        fromTitle: 'Vector & Sắp Xếp (L1-05)',
        toTitle: 'Hai Con Trỏ & Cửa Sổ Trượt (MOD-03)',
        fromKnown: 'Bạn đã biết dùng std::sort() sắp xếp mảng tăng dần trong O(N log N).',
        bottleneck: 'Khi cần tìm hai phần tử có tổng bằng S hoặc ghép hai mảng đã sắp xếp, dùng hai vòng lặp lồng tốn O(N^2) (hoặc binary search tốn thêm O(N log N)).',
        solution: 'Đặt hai con trỏ ngược chiều ở hai đầu mảng đã sort: mỗi bước chắc chắn loại bỏ được ít nhất 1 đầu thừa, đưa về O(N) mượt mà!',
        curveY: 318
      },
      {
        from: 'mang_cong_don',
        to: 'hai_con_tro',
        shortTag: 'Cửa sổ O(N)',
        fromTitle: 'Mảng Cộng Dồn (L2-01)',
        toTitle: 'Hai Con Trỏ & Cửa Sổ Trượt (MOD-03)',
        fromKnown: 'Bạn đã hiểu tổng đoạn [L, R] và tính chất tăng dần khi cộng thêm số không âm.',
        bottleneck: 'Để tìm đoạn con liên tiếp ngắn nhất/dài nhất có tổng đạt ngưỡng S, thử mọi cặp (L, R) mất O(N^2) quá chậm.',
        solution: 'Dùng Cửa sổ trượt (Sliding Window) như thân con sâu đo co giãn: hai chỉ số cùng tiến một chiều trong O(N) và chỉ O(1) bộ nhớ phụ!'
      },

      // Track 3 internal flow (Stack/Queue, Backtracking, Greedy -> DP)
      {
        from: 'de_quy_duoi',
        to: 'ngan_xep_hang_doi',
        shortTag: 'Ẩn → Tường minh',
        fromTitle: 'Đệ Quy & Đệ Quy Đuôi (MOD-01)',
        toTitle: 'Ngăn Xếp & Hàng Đợi Cơ Bản (L2-03)',
        fromKnown: 'Ở bài Đệ quy, bạn đã thấy hệ điều hành tự dùng ngăn xếp (LIFO) để quản lý lời gọi hàm.',
        bottleneck: 'Với các bài như kiểm tra ngoặc đóng mở hay mô phỏng dòng người xếp hàng mua vé, ta cần tự quản lý hàng đợi hoặc chồng đĩa ngay trong code chứ không phụ thuộc vào lời gọi hàm.',
        solution: 'Làm chủ trực tiếp std::stack (LIFO) và std::queue (FIFO) để giải gọn các bài xử lý tuần tự và khử đệ quy!'
      },
      {
        from: 'de_quy_duoi',
        to: 'duyet_toan_bo_quay_lui',
        shortTag: 'Cây đa nhánh',
        fromTitle: 'Đệ Quy & Đệ Quy Đuôi (MOD-01)',
        toTitle: 'Quay Lui & Bitmask (L2-04)',
        fromKnown: 'Bạn đã viết được hàm đệ quy tuyến tính gọi xuống một nhánh nhỏ hơn.',
        bottleneck: 'Nhiều bài toán không chỉ có 1 lựa chọn mà tại mỗi bước ta phải thử nhiều phương án khác nhau (chọn hoặc không chọn, xếp vị trí hoán vị).',
        solution: 'Xây dựng Cây đệ quy đa nhánh bằng Quay lui (Backtracking) và Nhánh cận, kết hợp Bitmask duyệt 2^N tập con khi N <= 20!'
      },
      {
        from: 'ngan_xep_hang_doi',
        to: 'ngan_xep_don_dieu',
        shortTag: 'Nâng cấp Stack',
        fromTitle: 'Ngăn Xếp & Hàng Đợi (L2-03)',
        toTitle: 'Ngăn Xếp Đơn Điệu (MOD-02)',
        fromKnown: 'Bạn đã thành thạo thao tác push/pop/top cơ bản của std::stack.',
        bottleneck: 'Khi gặp bài toán tìm phần tử lớn hơn/nhỏ hơn gần nhất cho cả 200.000 phần tử, stack thường chỉ lưu thuần túy nên vẫn dễ rơi vào duyệt lùi O(N^2).',
        solution: 'Duy trì tính chất đơn điệu trong stack: loại ngay những phần tử bị người mới che khuất vĩnh viễn để đạt O(N) khấu hao!'
      },
      {
        from: 'stl_tra_cuu_hang_doi',
        to: 'tham_lam',
        shortTag: 'Chọn cục bộ',
        fromTitle: 'Bộ Công Cụ STL (L1-06)',
        toTitle: 'Thuật Toán Tham Lam (L2-05)',
        fromKnown: 'Bạn đã có priority_queue và custom sort để luôn tìm nhanh phần tử tốt nhất hiện tại.',
        bottleneck: 'Với N = 10^5, thuật toán Quay lui O(2^N) hoàn toàn bất lực. Làm sao giải nhanh mà không cần thử hết mọi tổ hợp?',
        solution: 'Dùng Tham lam (Greedy): chứng minh được tại mỗi bước chỉ cần chọn phương án lợi nhất theo tiêu chí chuẩn (như kết thúc sớm nhất, nhỏ nhất) là đủ ra đáp án tối ưu!'
      },
      {
        from: 'tim_kiem_nhi_phan',
        to: 'tham_lam',
        shortTag: 'Kiểm chứng',
        fromTitle: 'Tìm Kiếm Nhị Phân (L2-02)',
        toTitle: 'Thuật Toán Tham Lam (L2-05)',
        fromKnown: 'Bạn đã biết dùng hàm check(mid) kiểm tra tính khả thi một cách đơn điệu.',
        bottleneck: 'Trong nhiều bài toán tối ưu phân chia tài nguyên, ngay cả bên trong hàm check(mid) hay trong bước chọn kết quả ta vẫn cần chiến lược quyết định nhanh trong O(N).',
        solution: 'Kết hợp tư duy Tham lam (chọn nhanh theo thứ tự hợp lý) với chứng minh tính đúng đắn Exchange Argument để xử lý bài toán N lớn!'
      },
      {
        from: 'tham_lam',
        to: 'dp_nhap_mon',
        shortTag: 'Khi Greedy sai',
        fromTitle: 'Thuật Toán Tham Lam (L2-05)',
        toTitle: 'Nhập Môn Quy Hoạch Động (L2-06)',
        fromKnown: 'Bạn đã biết Tham lam chọn phương án có vẻ lợi nhất ngay trước mắt.',
        bottleneck: 'Điểm gãy chết người: Đổi 6 đồng bằng các mệnh giá {1, 3, 4} — Tham lam lấy tờ 4 -> cần 4+1+1 (3 tờ), trong khi đáp án tối ưu là 3+3 (2 tờ)! Tham lam bị lừa bởi cái lợi trước mắt.',
        solution: 'Chuyển sang Quy hoạch động (Dynamic Programming): lưu lại kết quả tối ưu của mọi bài toán con nhỏ hơn để ra quyết định chính xác tuyệt đối!'
      },
      {
        from: 'duyet_toan_bo_quay_lui',
        to: 'dp_nhap_mon',
        shortTag: 'Nhớ bài con',
        fromTitle: 'Quay Lui & Bitmask (L2-04)',
        toTitle: 'Nhập Môn Quy Hoạch Động (L2-06)',
        fromKnown: 'Bạn đã biết dùng Cây đệ quy thử toàn bộ mọi nhánh khả dĩ để đảm bảo không sót đáp án.',
        bottleneck: 'Cây đệ quy tính đi tính lại cùng một trạng thái hàng triệu lần (như Fib(5) bị gọi lại vô số lần), khiến thời gian bùng nổ O(2^N) (TLE).',
        solution: 'Gắn thêm bảng nhớ (Memoization) hoặc lập bảng từ nhỏ đến lớn (Tabulation): mỗi trạng thái chỉ tính đúng 1 lần, biến O(2^N) thành O(N)!'
      },
      {
        from: 'dp_nhap_mon',
        to: 'dp_luoi_2d',
        shortTag: '1D → 2D',
        fromTitle: 'Nhập Môn QHD (L2-06)',
        toTitle: 'DP Lưới 2D & Cuộn Mảng (L2-07)',
        fromKnown: 'Bạn đã thành thạo định nghĩa dp[i], công thức truy hồi 1 chiều và truy vết.',
        bottleneck: 'Khi bài toán diễn ra trên bản đồ 2 chiều (hàng i, cột j) hoặc phụ thuộc 2 thông số độc lập, mảng 1 chiều dp[i] không còn đủ mô tả vị trí.',
        solution: 'Mở rộng bảng trạng thái lên dp[i][j] trên lưới 2D và học kỹ thuật Cuộn mảng (Rolling Array) giữ RAM luôn gọn nhẹ!'
      },
      {
        from: 'dp_nhap_mon',
        to: 'dp_cai_tui',
        shortTag: 'Chọn & Đếm',
        fromTitle: 'Nhập Môn QHD (L2-06)',
        toTitle: 'Tổ Hợp Đếm & Cái Túi (L2-08)',
        fromKnown: 'Bạn đã biết giải các bài DP 1D chuyển bước tuần tự.',
        bottleneck: 'Khi bài toán yêu cầu chọn tập đồ vật không vượt quá tải trọng W hoặc đếm số cách phân tích tổng (phân biệt thứ tự hay không), áp dụng DP 1D ngây thơ rất dễ đếm trùng!',
        solution: 'Làm chủ mô hình Cái Túi (0/1 & Unbounded Knapsack), kiểm soát chiều vòng lặp để phân biệt Hoán vị vs Tổ hợp và đổi chiều khi W quá lớn!'
      },
      {
        from: 'so_hoc_co_ban',
        to: 'dp_cai_tui',
        shortTag: 'Modulo đếm',
        fromTitle: 'Số Học Nhập Môn (L1-07)',
        toTitle: 'Tổ Hợp Đếm & Cái Túi (L2-08)',
        fromKnown: 'Bạn đã nắm vững tính chất đồng dư (a + b) % M và (a * b) % M an toàn.',
        bottleneck: 'Số cách chọn và số tổ hợp tăng nhanh theo cấp số mũ vượt xa giới hạn 64-bit long long.',
        solution: 'Kết hợp quy tắc cộng/nhân với phép lấy dư Modulo từng bước ngay trong bảng quy hoạch động đếm và tam giác Pascal!',
        curveY: 250
      },
      {
        from: 'dp_luoi_2d',
        to: 'dp_day_con_xau',
        shortTag: 'Bảng 2 xâu',
        fromTitle: 'DP Lưới 2D (L2-07)',
        toTitle: 'DP Dãy Con, Xâu & Trạng Thái (L2-09)',
        fromKnown: 'Bạn đã quen lập bảng dp[i][j] chuyển từ ô (i-1, j), (i, j-1) và (i-1, j-1).',
        bottleneck: 'Làm sao đối chiếu hai xâu ký tự (tìm xâu con chung dài nhất hoặc số phép sửa ít nhất biến xâu A thành xâu B)?',
        solution: 'Ánh xạ tiền tố xâu A[1..i] và B[1..j] thành tọa độ trên lưới 2D (LCS & Edit Distance) — chìa khóa hoàn thiện Tầng 2 Lớp 9!'
      },
      {
        from: 'dp_cai_tui',
        to: 'dp_day_con_xau',
        shortTag: 'Dãy & Trạng',
        fromTitle: 'Tổ Hợp Đếm & Cái Túi (L2-08)',
        toTitle: 'DP Dãy Con, Xâu & Trạng Thái (L2-09)',
        fromKnown: 'Bạn đã rèn kỹ năng thiết kế chiều trạng thái phụ thuộc điều kiện chọn.',
        bottleneck: 'Các bài dãy con tăng dài nhất (LIS) hay lịch hoạt động ràng buộc ngày hôm trước đòi hỏi định nghĩa "kết thúc tại phần tử i với trạng thái s".',
        solution: 'Hoàn thiện bộ 4 trụ cột DP Cơ Bản: LIS, LCS, Edit Distance và DP Máy trạng thái theo ngày (Vacation)!'
      },

      // Track 2/3/4 -> MOD-04 (Strictly gated by dp_nhap_mon, ngan_xep_don_dieu, hai_con_tro)
      {
        from: 'dp_nhap_mon',
        to: 'ket_hop_ngan_xep_qhd_hai_con_tro',
        shortTag: 'Tối ưu DP',
        fromTitle: 'Nhập Môn QHD (L2-06)',
        toTitle: 'Chuyên Đề Kết Hợp (MOD-04)',
        fromKnown: 'Bạn đã biết thiết lập công thức Quy hoạch động dp[i] và hiểu cách lập bảng chuyển trạng thái.',
        bottleneck: 'Trong nhiều bài DP, bước chuyển dp[i] phải quét lại toàn bộ các trạng thái cũ j < i mất O(N) cho mỗi bước -> cả bài tốn O(N^2) (TLE khi N = 10^5).',
        solution: 'Kết hợp kiến thức DP với cấu trúc đơn điệu để giữ lại đúng ứng viên tối ưu, hạ chi phí chuyển trạng thái DP từ O(N) về O(1) khấu hao!'
      },
      {
        from: 'ngan_xep_don_dieu',
        to: 'ket_hop_ngan_xep_qhd_hai_con_tro',
        shortTag: 'Stack + DP',
        fromTitle: 'Ngăn Xếp Đơn Điệu (MOD-02)',
        toTitle: 'Chuyên Đề Kết Hợp (MOD-04)',
        fromKnown: 'Bạn đã biết dùng Ngăn xếp đơn điệu tìm phần tử nhỏ hơn/lớn hơn gần nhất L[i] trong O(N).',
        bottleneck: 'Khi bài toán DP yêu cầu lấy giá trị dp tốt nhất bị giới hạn bởi phần tử lớn hơn/nhỏ hơn đứng ngay trước đó, tính riêng lẻ từng đoạn vẫn quá chậm.',
        solution: 'Dùng Ngăn xếp đơn điệu tìm nhanh vị trí L[i] và kế thừa trực tiếp giá trị dp[L[i]] ngay trong O(1)!'
      },
      {
        from: 'hai_con_tro',
        to: 'ket_hop_ngan_xep_qhd_hai_con_tro',
        shortTag: 'Cửa sổ + Deque',
        fromTitle: 'Hai Con Trỏ (MOD-03)',
        toTitle: 'Chuyên Đề Kết Hợp (MOD-04)',
        fromKnown: 'Bạn đã biết dùng Cửa sổ trượt (Hai con trỏ) để duy trì phạm vi dịch chuyển độ dài K.',
        bottleneck: 'Khi công thức DP giới hạn bước nhảy trong phạm vi K bước trước, Hai con trỏ thuần túy chỉ cập nhật được tổng chứ không lấy nhanh được min/max của dp.',
        solution: 'Ghép Cửa sổ trượt (đầu front của deque) với Ngăn xếp đơn điệu (đuôi back) thành Hàng đợi hai đầu đơn điệu (Monotonic Deque) tối ưu DP cửa sổ K trong O(N)!',
        curveY: 790
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.PORTAL_DATA = PORTAL_DATA;
  }
})();
