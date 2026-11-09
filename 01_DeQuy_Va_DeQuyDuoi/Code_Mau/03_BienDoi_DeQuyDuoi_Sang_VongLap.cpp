/**
 * VÍ DỤ 03: BIẾN ĐỔI ĐỆ QUY ĐUÔI SANG VÒNG LẶP WHILE
 * Biên dịch: g++ -std=c++14 -O2 -Wall 03_BienDoi_DeQuyDuoi_Sang_VongLap.cpp -o 03_BienDoi_DeQuyDuoi_Sang_VongLap.exe
 */

#include <iostream>

using namespace std;

// Chuyển đổi thủ công từ Đệ quy đuôi sang Vòng lặp:
// 1. Tham số tichLuy trở thành biến cục bộ khởi tạo bằng 0.
// 2. Điều kiện dừng if (n <= 0) đảo ngược thành while (n > 0).
// 3. Mỗi vòng lặp cập nhật tichLuy += n và n--.
long long tinhTongVongLap(long long n) {
    long long tichLuy = 0;
    while (n > 0) {
        tichLuy += n;
        n--;
    }
    return tichLuy;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long n = 10000000LL;
    cout << "=== THỬ NGHIỆM KHỬ ĐỆ QUY BẰNG VÒNG LẶP ===" << "\n";
    cout << "Tính tổng 1 đến " << n << " bằng vòng lặp while...\n";
    cout << "Kết quả: " << tinhTongVongLap(n) << "\n";

    return 0;
}
