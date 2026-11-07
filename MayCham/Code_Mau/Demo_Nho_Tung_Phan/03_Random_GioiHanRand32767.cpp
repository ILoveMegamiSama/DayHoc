#include <bits/stdc++.h>
using namespace std;

/*
 * DEMO 03: SO SÁNH rand() CỔ ĐIỂN vs mt19937 (32-bit) vs mt19937_64 (64-bit)
 * --------------------------------------------------------------------------
 * Bài toán cần sinh số nguyên lớn tới 10^15 (kiểu long long).
 * Hãy quan sát giới hạn thực sự của từng công cụ!
 */

mt19937 rd32(chrono::steady_clock::now().time_since_epoch().count());
mt19937_64 rd64(chrono::steady_clock::now().time_since_epoch().count());

// Hàm Rand chuẩn dùng được cho cả số âm và số dương lớn tới 10^18
long long Rand(long long l, long long r) {
    return uniform_int_distribution<long long>(l, r)(rd64);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cout << "1. Tren Windows (Code::Blocks), RAND_MAX cua rand() chi la: 32767\n";
    cout << "   (Tren máy hiện tại RAND_MAX = " << RAND_MAX << ")\n\n";

    cout << "2. Gioi han toi da cua mt19937 (32-bit unsigned):\n";
    cout << "   rd32.max() = " << rd32.max() << " (~ 4.29 * 10^9)\n";
    cout << "   -> Neu dung rd32() % 10^15, so sinh ra KHONG BAO GIO vuot qua 4.29 ty!\n";
    cout << "   Thu sinh 3 so bang rd32() % 1000000000000000LL:\n   ";
    for (int i = 0; i < 3; i++) {
        cout << (long long)(rd32() % 1000000000000000LL) << "  ";
    }
    cout << "\n\n";

    cout << "3. Gioi han toi da cua mt19937_64 (64-bit unsigned):\n";
    cout << "   rd64.max() = " << rd64.max() << " (~ 1.84 * 10^19)\n";
    cout << "   -> Sinh thoải mái toàn bộ miền long long [-10^18, 10^18]!\n";
    cout << "   Thu sinh 3 so trong doan [-10^15, 10^15] bang ham Rand(l, r):\n   ";
    for (int i = 0; i < 3; i++) {
        cout << Rand(-1000000000000000LL, 1000000000000000LL) << "  ";
    }
    cout << "\n";
    return 0;
}
