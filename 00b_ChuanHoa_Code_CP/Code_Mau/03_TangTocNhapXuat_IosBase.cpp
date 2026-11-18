/**
 * CHUYÊN ĐỀ PHỤ MOD-CP0: CHUẨN HÓA CODE C++ HƯỚNG THI ĐẤU (CP)
 * File mẫu 03: Bộ Tăng Tốc Nhập Xuất (Fast I/O), '\n' vs endl & Quy Tắc Không Trộn printf/scanf
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Nắm trọn bộ khung CP hoàn chỉnh: #include <bits/stdc++.h> + using namespace std; + Fast I/O.
 * 2. Hiểu tác dụng của ios_base::sync_with_stdio(false); và cin.tie(NULL);.
 * 3. Dùng '\n' thay cho endl để không ép xả bộ đệm (flush) sau mỗi dòng.
 * 4. Ghi nhớ lệnh cấm tuyệt đối: KHÔNG trộn scanf/printf với cin/cout khi đã bật Fast I/O.
 */

#include <bits/stdc++.h>
using namespace std;

int main() {
    // 1. Ngắt trạm gác đồng bộ giữa cin/cout (C++) và scanf/printf (C).
    //    CẢNH BÁO: Sau dòng này, TUYỆT ĐỐI KHÔNG gọi thêm scanf() hay printf() nữa!
    ios_base::sync_with_stdio(false);

    // 2. Tháo dây buộc bắt cin phải đợi cout xả sạch màn hình trước mỗi lần đọc dữ liệu.
    cin.tie(NULL);

    // Đọc trực tiếp dữ liệu từ luồng vào chuẩn (stdin) theo đúng format Online Judge.
    // Lưu ý CP: Không in lời nhắc "Hay nhap..." khi nộp bài lên máy chấm vì sẽ bị tính dư chữ (WA).
    // Ví dụ chạy thử trên terminal rồi gõ: 101 3 15.5
    int maDon;
    int soBanh;
    double donGia;
    cin >> maDon >> soBanh >> donGia;

    // 3. Xuất nhiều dòng hóa đơn chỉ bằng cout và ký tự '\n' (KHÔNG dùng endl, KHÔNG trộn printf)
    double thanhTien = soBanh * donGia;
    double tienThue = thanhTien * 0.1;
    double tongCong = thanhTien + tienThue;

    cout << "=== HOA DON CHUAN CP (FAST I/O) ===" << '\n';
    cout << "Ma don hang : #" << maDon << '\n';
    cout << "So luong    : " << soBanh << " chiec" << '\n';
    cout << "Don gia     : " << donGia << " nghin dong" << '\n';
    cout << "Thanh tien  : " << thanhTien << " nghin dong" << '\n';
    cout << "Thue (10%)  : " << tienThue << " nghin dong" << '\n';
    cout << "TONG CONG   : " << tongCong << " nghin dong" << '\n';

    return 0;
}
