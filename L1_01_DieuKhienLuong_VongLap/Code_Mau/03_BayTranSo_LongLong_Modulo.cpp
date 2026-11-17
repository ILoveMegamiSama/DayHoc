/**
 * BÀI L1-01: ĐIỀU KHIỂN LUỒNG, VÒNG LẶP & SỐ NGUYÊN LỚN
 * File mẫu 03: Kiểu long long, Bẫy Tràn Số int, Ép Kiểu 1LL & Số Học Chia Dư (%)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Nắm chính xác ngưỡng chứa của int (~2.14e9) và long long (~9.22e18).
 * 2. Biết cách ép kiểu an toàn 1LL * a * b để tránh bẫy tràn số trung gian (int * int).
 * 3. Áp dụng phép chia lấy dư % ở từng bước cho bài toán lũy thừa / tích lớn theo MOD = 10^9 + 7.
 * 4. Xử lý chuẩn xác phép lấy dư với số âm bằng công thức ((x % M) + M) % M.
 */

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    const long long MOD = 1000000007LL; // 10^9 + 7

    // Ví dụ đầu vào (stdin):
    // 1000000000 1000000000 10 3 10 5
    int a, b;
    long long n;
    long long x, y, m;
    if (!(cin >> a >> b >> n >> x >> y >> m)) {
        return 0;
    }

    // 1. GIỚI HẠN CỦA INT VS LONG LONG & ÉP KIỂU AN TOÀN 1LL:
    cout << "=== 1. GIOI HAN KIEU DU LIEU & EP KIEU 1LL ===" << '\n';
    cout << "Gioi han duong toi da cua int (INT_MAX)       : " << INT_MAX << '\n';
    cout << "Gioi han duong toi da cua long long (LLONG_MAX): " << LLONG_MAX << '\n';

    // CẢNH BÁO: Nếu viết long long sai = a * b; với a = 10^9, b = 10^9:
    // Phép nhân a * b chạy bằng kiểu int (bị tràn!) TRƯỚC KHI gán vào long long!
    // Cách chuẩn CP: Đặt 1LL * ở ĐẦU phép nhân để nâng cả biểu thức lên 64-bit.
    long long tichAnToan = 1LL * a * b;
    cout << "Tich an toan (1LL * a * b) = " << tichAnToan << '\n';

    // 2. TÍNH 2^n % (10^9 + 7) BẰNG VÒNG LẶP + CHIA DƯ TỪNG BƯỚC:
    //    Nếu đợi tính xong 2^n rồi mới % MOD sẽ tràn cả long long khi n >= 63!
    //    Quy tắc: (A * B) % MOD = ((A % MOD) * (B % MOD)) % MOD
    long long luyThuaMod = 1;
    for (long long i = 1; i <= n; i++) {
        luyThuaMod = (luyThuaMod * 2) % MOD;
    }
    cout << "\n=== 2. TICH LUY THUA THEO MODULO 10^9 + 7 ===" << '\n';
    cout << "2^" << n << " mod " << MOD << " = " << luyThuaMod << '\n';

    // 3. BẪY PHÉP CHIA LẤY DƯ % VỚI SỐ ÂM TRONG C++14:
    //    Với x = 3, y = 10, m = 5: (x - y) = -7.
    //    Trong C++, (-7) % 5 ra -2 (giữ dấu âm), KHÔNG PHẢI số dư toán học 3!
    long long duThoCxx = (x - y) % m;
    long long duChuanKhongAm = (((x - y) % m) + m) % m;

    cout << "\n=== 3. BAY MODULO SO AM ===" << '\n';
    cout << "(" << x << " - " << y << ") % " << m << " tho trong C++ = " << duThoCxx << '\n';
    cout << "Chuan hoa khong am [0, m - 1]     = " << duChuanKhongAm << '\n';

    return 0;
}
