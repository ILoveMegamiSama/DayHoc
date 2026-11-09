/**
 * VÍ DỤ 01: ĐỆ QUY THƯỜNG — TẠI SAO GÂY TRÀN NGĂN XẾP (STACK OVERFLOW)?
 * Biên dịch: g++ -std=c++14 -O2 -Wall 01_DeQuyThuong_TranBoNho.cpp -o 01_DeQuyThuong_TranBoNho.exe
 */

#include <iostream>

using namespace std;

// Hàm đệ quy thường: Sau khi tinhTong(n - 1) tính xong, CPU vẫn phải
// thực hiện phép cộng "+ n". Do đó mỗi lần gọi đều phải giữ lại 1 Stack Frame!
long long tinhTongThuong(long long n) {
    if (n <= 0) return 0;
    return tinhTongThuong(n - 1) + n; // Còn nợ phép cộng "+ n"
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long n = 10000;
    cout << "=== THỬ NGHIỆM ĐỆ QUY THƯỜNG ===" << "\n";
    cout << "Tính tổng từ 1 đến " << n << "...\n";
    cout << "Kết quả: " << tinhTongThuong(n) << "\n";

    // CẢNH BÁO: Nếu n = 1000000 (1 triệu), hàm sẽ gọi sâu 1 triệu tầng,
    // tiêu tốn ~32MB bộ nhớ Stack vượt quá giới hạn mặc định (~8MB)
    // dẫn đến sập chương trình (Segmentation fault / Stack Overflow)!

    return 0;
}
