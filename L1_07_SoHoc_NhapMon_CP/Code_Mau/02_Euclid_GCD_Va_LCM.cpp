/**
 * BÀI L1-07: SỐ HỌC NHẬP MÔN CHO CP
 * File mẫu 02: Thuật Toán Euclid Tính GCD & LCM An Toàn Chống Tràn Số
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Hiểu bản chất phép chia dư liên tiếp trong thuật toán Euclid lặp O(log(min(a, b))).
 * 2. Biết khác biệt giữa hàm mở rộng __gcd(a, b) của GCC (bắt buộc cùng kiểu, không chuẩn C++)
 *    với hàm myGcd(long long, long long) tự viết sạch sẽ (chưa cần dùng đệ quy).
 * 3. Tránh bẫy tràn số khi tính LCM: luôn viết (a / myGcd(a, b)) * b (CHIA TRƯỚC, NHÂN SAU).
 */

#include <bits/stdc++.h>
using namespace std;

// Thuật toán Euclid dạng lặp: gcd(a, b) = gcd(b, a % b) cho tới khi b == 0
long long myGcd(long long a, long long b) {
    if (a < 0) a = -a;
    if (b < 0) b = -b;
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}

// Tính LCM an toàn: chia trước rồi mới nhân để tránh tràn số trung gian (a * b)
long long myLcm(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    long long g = myGcd(a, b);
    return (a / g) * b;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cout << "=== PHAN A: MO PHONG TUNG BUOC EUCLID ===" << '\n';
    long long a = 252, b = 105;
    long long x = a, y = b;
    while (y != 0) {
        cout << "gcd(" << x << ", " << y << ") -> du = " << (x % y) << '\n';
        long long r = x % y;
        x = y;
        y = r;
    }
    cout << "Ket qua GCD(" << a << ", " << b << ") = " << x << '\n';
    cout << "Ket qua LCM(" << a << ", " << b << ") = " << myLcm(a, b) << '\n';

    cout << "\n=== PHAN B: BAY TRAN SO KHI TINH LCM ===" << '\n';
    long long bigA = 2000000000000LL; // 2 * 10^12
    long long bigB = 3000000000000LL; // 3 * 10^12
    // Nếu viết (bigA * bigB) / myGcd(bigA, bigB) thì bigA * bigB = 6 * 10^24 -> TRÀN long long!
    cout << "LCM an toan (a / g) * b = " << myLcm(bigA, bigB) << '\n'; // 6000000000000

    cout << "\n=== PHAN C: GCD & LCM CUA CA DAY SO ===" << '\n';
    vector<long long> arr = {12, 18, 24, 30};
    long long arrayGcd = arr[0];
    long long arrayLcm = arr[0];
    for (int i = 1; i < (int)arr.size(); i++) {
        arrayGcd = myGcd(arrayGcd, arr[i]);
        arrayLcm = myLcm(arrayLcm, arr[i]);
    }
    cout << "GCD day {12, 18, 24, 30} = " << arrayGcd << '\n'; // 6
    cout << "LCM day {12, 18, 24, 30} = " << arrayLcm << '\n'; // 360

    // Lưu ý hàm __gcd của GCC: __gcd(a, b) đòi hỏi 2 đối số phải CÙNG KIỂU (cùng int hoặc cùng long long)
    cout << "Kiem chung voi __gcd(252LL, 105LL) = " << __gcd(252LL, 105LL) << '\n';

    return 0;
}
