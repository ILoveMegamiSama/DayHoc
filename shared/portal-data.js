/**
 * DỮ LIỆU CÂY KỸ NĂNG CP & DANH SÁCH BÀI GIẢNG TOÀN CỤC
 * Dùng cho Trang Chủ (index.html) để render sơ đồ tương tác DAG và tổng hợp tiến trình học.
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
        id: 'may_cham',
        code: 'MOD-00',
        title: 'Tự Code Máy Chấm (Stress Testing)',
        track: 'foundations',
        category: 'foundation',
        path: 'MayCham/index.html',
        summary: 'Hiểu bản chất phần cứng, RAM vs Ổ cứng, Shell, biến PATH, g++, cờ -static và tự động hóa tìm test sai bằng máy chấm C++14.',
        x: 120,
        y: 80,
        badge: 'Nền tảng'
      },
      {
        id: 'de_quy_duoi',
        code: 'MOD-01',
        title: 'Đệ Quy & Đệ Quy Đuôi (Tail Recursion)',
        track: 'single_concepts',
        category: 'single',
        path: '01_DeQuy_Va_DeQuyDuoi/index.html',
        summary: 'Giải phẫu Call Stack, cơ chế Stack Overflow và kỹ thuật Đệ quy đuôi (TCO) tái sử dụng ngăn xếp đưa O(N) bộ nhớ về O(1).',
        x: 420,
        y: 80,
        badge: 'Đơn lẻ'
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
        badge: 'Đơn lẻ'
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
        badge: 'Đơn lẻ'
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
        badge: 'Chuyên đề kết hợp'
      }
    ],
    edges: [
      {
        from: 'may_cham',
        to: 'de_quy_duoi',
        label: 'RAM & Call Stack',
        detail: 'Từ hiểu biết về RAM (Bàn làm việc) ở Máy Chấm bước sang quan sát Call Stack khi gọi hàm đệ quy.'
      },
      {
        from: 'de_quy_duoi',
        to: 'ngan_xep_don_dieu',
        label: 'Ngăn xếp ẩn → Tường minh',
        detail: 'Chuyển từ cơ chế tự động của hệ điều hành sang tự tạo std::stack và duy trì tính chất đơn điệu để tối ưu tìm kiếm.'
      },
      {
        from: 'ngan_xep_don_dieu',
        to: 'hai_con_tro',
        label: 'Tính đơn điệu 1 chiều',
        detail: 'Cùng chung bản chất "phần tử bị loại bỏ sẽ vĩnh viễn không quay lại", chuyển hóa giữa cấu trúc Stack và Hai con trỏ.'
      },
      {
        from: 'ngan_xep_don_dieu',
        to: 'ket_hop_ngan_xep_qhd_hai_con_tro',
        label: 'Tối ưu bước chuyển DP',
        detail: 'Dùng Ngăn xếp đơn điệu để gom và loại bỏ các trạng thái DP cũ bị che khuất, đưa O(N^2) về O(N).'
      },
      {
        from: 'hai_con_tro',
        to: 'ket_hop_ngan_xep_qhd_hai_con_tro',
        label: 'Cửa sổ trượt & Deque DP',
        detail: 'Kết hợp cửa sổ trượt (Hai con trỏ) với Ngăn xếp đơn điệu tạo thành Hàng đợi hai đầu (Deque) tối ưu DP trượt.'
      }
    ]
  };

  if (typeof window !== 'undefined') {
    window.PORTAL_DATA = PORTAL_DATA;
  }
})();
