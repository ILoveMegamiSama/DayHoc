/**
 * CHUYÊN ĐỀ PHỤ MOD-CP0: CHUẨN HÓA CODE C++ HƯỚNG THI ĐẤU (CP)
 * File mẫu 01: Thùng Đồ Nghề Đa Năng (#include <bits/stdc++.h>)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Hiểu vì sao #include <bits/stdc++.h> thay thế được nhiều dòng #include rời rạc.
 * 2. Thấy được sự tiện lợi khi dùng ngay string, sqrt(), max(), min(), setprecision() mà không sợ thiếu header.
 * 3. Nắm bộ khung chuẩn CP: #include <bits/stdc++.h> + using namespace std; + Fast I/O + '\n'.
 */

// Chỉ cần 1 dòng duy nhất này (Vali Đồ Nghề Đa Năng) thay cho:
// #include <iostream>, #include <string>, #include <cmath>, #include <algorithm>, #include <iomanip>
#include <bits/stdc++.h>
using namespace std;

int main() {
    // Bộ đôi tăng tốc nhập xuất chuẩn CP (sẽ giải phẫu chi tiết ở File mẫu 03)
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Dùng ngay std::string mà không cần viết riêng #include <string>
    string tenTiem = "Tiem Banh Mi Anh That Tha";

    // 2. Dùng ngay hàm max(), min() (từ <algorithm>) mà không cần viết riêng #include <algorithm>
    int donSang = 12;
    int donChieu = 19;
    int donNhieuNhat = max(donSang, donChieu);
    int donItNhat = min(donSang, donChieu);

    // 3. Dùng ngay sqrt() (từ <cmath>) và fixed << setprecision(2) (từ <iomanip>)
    double dienTichKhayVuong = 50.0;
    double canhKhay = sqrt(dienTichKhayVuong);

    // Dùng '\n' thay cho endl để xuất kết quả gọn nhẹ và nhanh nhất
    cout << "=== " << tenTiem << " ===" << '\n';
    cout << "Ca dong khach nhat: " << donNhieuNhat << " don" << '\n';
    cout << "Ca vang khach nhat: " << donItNhat << " don" << '\n';
    cout << fixed << setprecision(2); // In dung 2 chu so thap phan
    cout << "Canh khay vuong (can bac 2 cua 50): " << canhKhay << " cm" << '\n';

    return 0;
}
