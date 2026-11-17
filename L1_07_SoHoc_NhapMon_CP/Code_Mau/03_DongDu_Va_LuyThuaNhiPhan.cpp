/**
 * BÀI L1-07: SỐ HỌC NHẬP MÔN CHO CP
 * File mẫu 03: Số Học Đồng Dư An Toàn & Lũy Thừa Nhị Phân Lặp O(log b)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Cộng, nhân và đặc biệt phép TRỪ đồng dư an toàn không bị ra số âm trong C++.
 * 2. Lũy thừa nhị phân dạng lặp while (b > 0) tính (a^b) % M với b tới 10^18 chỉ trong ~60 bước.
 * 3. Nhớ ép a %= M ngay đầu hàm và dùng long long (1LL) khi nhân để tránh tràn số.
 */

#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

long long addMod(long long a, long long b, long long mod) {
    return ((a % mod) + (b % mod)) % mod;
}

// BẪY PHÉP TRỪ C++: (-3) % 7 trả về -3! Phải cộng thêm mod rồi % mod lần nữa.
long long subMod(long long a, long long b, long long mod) {
    return (((a % mod) - (b % mod)) % mod + mod) % mod;
}

// Khi mod <= 2 * 10^9, tích (a % mod) * (b % mod) <= 4 * 10^18, vừa khít long long!
long long mulMod(long long a, long long b, long long mod) {
    return ((a % mod) * (b % mod)) % mod;
}

// Lũy thừa nhị phân dạng lặp: tính (a^b) % mod trong O(log b)
// Quy ước chuẩn CP: 0^0 = 1 (khi mod > 1; trả về 1 % mod nếu mod = 1)
long long binPow(long long a, long long b, long long mod) {
    long long res = 1 % mod;
    a %= mod; // Bắt buộc thu gọn a trước để tránh a * a tràn long long ở bước đầu!
    if (a < 0) a += mod; // Phòng trường hợp a âm

    while (b > 0) {
        if (b & 1LL) { // Nếu bit cuối của b là 1 (tức b lẻ)
            res = (res * a) % mod;
        }
        a = (a * a) % mod; // Bình phương cơ số cho bit tiếp theo
        b >>= 1;           // Dịch phải 1 bit (tương đương b /= 2)
    }
    return res;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cout << "=== PHAN A: PHEP TOAN DONG DU AN TOAN ===" << '\n';
    long long x = 2, y = 5, m = 7;
    cout << "Trong C++, (2 - 5) % 7 = " << ((x - y) % m) << " (AM!)" << '\n';
    cout << "subMod(2, 5, 7)      = " << subMod(x, y, m) << " (CHUAN!)" << '\n';

    long long p = 1000000000LL, q = 999999999LL;
    cout << "mulMod(10^9, 10^9 - 1, 10^9 + 7) = " << mulMod(p, q, MOD) << '\n';

    cout << "\n=== PHAN B: LUY THUA NHI PHAN O(log b) ===" << '\n';
    cout << "3^13 % 10^9+7           = " << binPow(3, 13, MOD) << '\n';
    cout << "0^0 % 10^9+7            = " << binPow(0, 0, MOD) << '\n';
    cout << "2^(10^18) % 10^9+7      = " << binPow(2, 1000000000000000000LL, MOD) << '\n';
    cout << "(10^12)^5 % 10^9+7      = " << binPow(1000000000000LL, 5, MOD) << '\n';

    return 0;
}
