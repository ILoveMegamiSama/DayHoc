/**
 * CHUYÊN ĐỀ PHỤ MOD-CP0: CHUẨN HÓA CODE C++ HƯỚNG THI ĐẤU (CP)
 * File mẫu 02: Bảng Tên Viết Tắt (using namespace std;) & Cách Tránh Bẫy Trùng Tên
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Sử dụng using namespace std; để viết cin, cout, string, max, min gọn gàng không cần std::.
 * 2. Nhận diện "vùng cấm đặt tên biến" trùng với thư viện chuẩn: count, min, max, left, right, size...
 * 3. Thực hành đặt tên biến an toàn (soLuong, giaThapNhat, giaCaoNhat) để không bao giờ dính lỗi ambiguous.
 */

#include <bits/stdc++.h>
using namespace std;

// CẢNH BÁO BẪY TRÙNG TÊN Ở PHẠM VI TOÀN CỤC:
// Nếu viết "int count = 0;" ở đây rồi dùng "cout << count;" trong main(),
// trình biên dịch g++ sẽ báo lỗi: "reference to 'count' is ambiguous"
// vì trong std đã có sẵn hàm std::count(...)!
// Tương tự, hãy tránh đặt tên biến là: min, max, left, right, size, next, prev, hash.

// Cách đặt tên AN TOÀN (tiếng Việt không dấu hoặc thêm hậu tố rõ nghĩa):
int soLuongKhach = 0;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int giaBanhPate = 15;
    int giaBanhTrung = 12;
    soLuongKhach = 4;

    // Không đặt "int min = ...;" hay "int max = ...;" để hàm min(), max() của std hoạt động an toàn!
    int giaThapNhat = min(giaBanhPate, giaBanhTrung);
    int giaCaoNhat = max(giaBanhPate, giaBanhTrung);
    int tongTienUocTinh = soLuongKhach * giaCaoNhat;

    // Nhờ "using namespace std;", ta viết thẳng cout và '\n' mà không cần std::cout
    cout << "So khach hien tai : " << soLuongKhach << '\n';
    cout << "Gia mon re nhat    : " << giaThapNhat << " nghin dong" << '\n';
    cout << "Gia mon dat nhat   : " << giaCaoNhat << " nghin dong" << '\n';
    cout << "Tong tien toi da   : " << tongTienUocTinh << " nghin dong" << '\n';

    return 0;
}
