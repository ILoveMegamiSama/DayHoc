/**
 * VÍ DỤ 02: ĐỆ QUY ĐUÔI (TAIL RECURSION) DÙNG BIẾN TÍCH LŨY (ACCUMULATOR)
 * Biên dịch: g++ -std=c++14 -O2 -Wall 02_DeQuyDuoi_BienTichLuy.cpp -o 02_DeQuyDuoi_BienTichLuy.exe
 */

#include <iostream>

using namespace std;

// Hàm Đệ Quy Đuôi: Lời gọi đệ quy là hành động CUỐI CÙNG TUYỆT ĐỐI!
// Kết quả cộng dồn được tính trước và truyền qua tham số tichLuy.
// Khi biên dịch với -O2, g++ sẽ áp dụng Tail Call Optimization (TCO),
// tái sử dụng 1 Stack Frame duy nhất (độ phức tạp không gian O(1)).
long long tinhTongDuoi(long long n, long long tichLuy = 0) {
    if (n <= 0) return tichLuy; // Đã tích lũy xong, trả về ngay lập tức
    return tinhTongDuoi(n - 1, tichLuy + n); // Không còn phép tính nào ở ngoài
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long n = 10000000LL; // 10 triệu bước gọi đệ quy!
    cout << "=== THỬ NGHIỆM ĐỆ QUY ĐUÔI (TCO) ===" << "\n";
    cout << "Tính tổng từ 1 đến " << n << " bằng đệ quy đuôi...\n";
    cout << "Kết quả: " << tinhTongDuoi(n, 0) << "\n";
    cout << "Chạy thành công mà không hề bị tràn bộ nhớ Stack!\n";

    return 0;
}
