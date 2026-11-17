/**
 * BÀI L1-04: PHÂN TÍCH ĐỘ PHỨC TẠP THUẬT TOÁN (BIG-O)
 * File mẫu 02: Quy Tắc Vàng 10^8 Phép Tính/Giây & Kỹ Năng Đọc Ngược Giới Hạn N
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Áp dụng quy tắc CPU máy chấm ~10^8 phép toán sơ cấp / giây để dự đoán AC vs TLE.
 * 2. Giải bài toán "Tổng tích mọi cặp (i < j)" với N <= 2*10^5:
 *    - Cách ngây thơ O(N^2) tốn ~2*10^10 bước -> TLE chắc chắn!
 *    - Cách tối ưu O(N) dùng biến cộng dồn chạy chỉ ~2*10^5 bước -> AC tức thì!
 * 3. Xử lý bài toán đa bộ test T (T <= 10^4, X <= 10^14):
 *    - Tránh bẫy O(T * sqrt(X)) = 10^11 (TLE), hạ xuống O(T * log X) ~ 4.7*10^5 (AC).
 */

#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200005;
const long long MOD = 1000000007LL;

// Mảng tĩnh toàn cục (Pha 1 Lớp 9) đặt tại vùng dữ liệu tĩnh (~1.6 MB)
long long a[MAXN];

// Hàm dự đoán trạng thái chấm bài theo quy tắc vàng ~10^8 phép/giây (Time Limit 1.0s)
string duDoanTrangThai(long long uocLuongPhepTinh) {
    if (uocLuongPhepTinh <= 10000000LL) {
        return "AN TOAN AC (<= 0.1s)";
    } else if (uocLuongPhepTinh <= 80000000LL) {
        return "HOI SAT NGUONG - CAN CODE GON (0.2s - 0.8s)";
    } else {
        return "TLE CHAC CHAN (> 1.0s)";
    }
}

// Cách 1 - O(N^2): Dùng cho N nhỏ (N <= 5000). Nếu N = 2*10^5 -> TLE!
long long tongTichCap_ON2(int n) {
    long long ketQua = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = i + 1; j <= n; j++) {
            long long tich = (a[i] % MOD) * (a[j] % MOD) % MOD;
            ketQua = (ketQua + tich) % MOD;
        }
    }
    return ketQua;
}

// Cách 2 - O(N): Nhân tử chung a[i] * (a[1] + a[2] + ... + a[i-1])
// Giảm độ phức tạp từ O(N^2) xuống còn đúng 1 vòng lặp O(N)!
long long tongTichCap_ON(int n) {
    long long ketQua = 0;
    long long tongTruoc = 0;
    for (int i = 1; i <= n; i++) {
        long long x = a[i] % MOD;
        long long congThem = (x * tongTruoc) % MOD;
        ketQua = (ketQua + congThem) % MOD;
        tongTruoc = (tongTruoc + x) % MOD;
    }
    return ketQua;
}

// Bài toán đa bộ test: Kiểm tra X (<= 10^14) có ước lẻ nào > 1 hay không
// Thay vì duyệt ước tới sqrt(X) tốn 10^7/test -> chia 2 liên tiếp chỉ tốn <= 47 bước!
bool coUocLeLonHonMot(long long x) {
    while (x % 2 == 0) {
        x /= 2;
    }
    if (x > 1) {
        return true;
    }
    return false;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Thử nghiệm nhanh trên một dãy mẫu nhỏ để đối chiếu hai thuật toán
    int n = 5;
    long long mau[6] = {0, 1, 2, 3, 4, 5};
    for (int i = 1; i <= n; i++) {
        a[i] = mau[i];
    }

    cout << "=== BAI TOAN 1: TONG TICH MOI CAP (N = 5) ===" << '\n';
    cout << "Ket qua O(N^2): " << tongTichCap_ON2(n) << '\n';
    cout << "Ket qua O(N)  : " << tongTichCap_ON(n) << '\n';

    long long nMax = 200000;
    long long phepON2 = nMax * (nMax - 1) / 2;
    long long phepON = nMax;
    cout << "Voi N = 2*10^5:" << '\n';
    cout << "  - Thuat toan O(N^2) can ~" << phepON2 << " buoc -> "
         << duDoanTrangThai(phepON2) << '\n';
    cout << "  - Thuat toan O(N)   can ~" << phepON << " buoc  -> "
         << duDoanTrangThai(phepON) << '\n';

    // Minh họa đa bộ test (T = 10^4, X <= 10^14)
    cout << "=== BAI TOAN 2: DA BO TEST T = 10^4, X = 10^14 ===" << '\n';
    long long tests[4] = {16, 12, 1024, 100000000000000LL};
    for (int k = 0; k < 4; k++) {
        cout << "X = " << tests[k] << " -> co uoc le > 1? ";
        if (coUocLeLonHonMot(tests[k])) {
            cout << "YES" << '\n';
        } else {
            cout << "NO" << '\n';
        }
    }

    long long uocLuongSlow = 10000LL * 10000000LL; // T * sqrt(X) = 10^11
    long long uocLuongFast = 10000LL * 47LL;       // T * log2(X) ~ 4.7 * 10^5
    cout << "Uoc luong O(T * sqrt(X)) = " << uocLuongSlow << " -> "
         << duDoanTrangThai(uocLuongSlow) << '\n';
    cout << "Uoc luong O(T * log X)   = " << uocLuongFast << " -> "
         << duDoanTrangThai(uocLuongFast) << '\n';

    return 0;
}
