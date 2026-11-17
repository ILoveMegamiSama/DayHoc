/**
 * BÀI L2-04: CÂY ĐỆ QUY, QUAY LUI & BITMASK TẬP CON
 * File 03: Phép Toán Bit (&, |, ^, <<, >>) & Bitmask Tập Con 2^N
 * Chuẩn CP C++14 (Pha 2 STL Lớp 9)
 */
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Thao tác bit cơ bản trên một dãy công tắc (mask)
    int mask = 0;         // Nhị phân: 0000 (tất cả tắt)
    mask |= (1 << 0);     // Bật bit 0 -> 0001 (1)
    mask |= (1 << 2);     // Bật bit 2 -> 0101 (5)
    mask ^= (1 << 1);     // Đảo bit 1 (0 -> 1) -> 0111 (7)
    mask &= ~(1 << 0);    // Tắt bit 0 -> 0110 (6)

    cout << "Trang thai mask = " << mask << ", so bit bat = " << __builtin_popcount(mask) << '\n';
    cout << "Cac bit tu 3 ve 0: ";
    for (int i = 3; i >= 0; i--) {
        // Luôn dùng (mask >> i) & 1 hoặc ((mask & (1 << i)) != 0)
        // Tránh bẫy ưu tiên toán tử == mạnh hơn &!
        cout << ((mask >> i) & 1);
    }
    cout << '\n';

    // 2. Bẫy dịch bit >= 31: bắt buộc dùng 1LL << k cho kiểu 64-bit
    int k = 40;
    long long bigMask = (1LL << k) | (1LL << 31);
    cout << "Bit 40 cua bigMask: " << ((bigMask >> 40) & 1LL) << '\n';

    // 3. Bitmask Tập Con 2^N: Chia nhóm táo cân bằng nhất (kiểu CSES Apple Division)
    // Với n <= 20, chạy 2^n * n <= 20 * 2^20 ~ 2e7 phép tính
    vector<long long> p = {3, 2, 7, 4, 1};
    int n = (int)p.size();
    long long totalWeight = 0;
    for (long long w : p) totalWeight += w;

    long long minDiff = totalWeight;
    int bestMask = 0;

    // Duyệt mask từ 0 đến (1 << n) - 1
    for (int sub = 0; sub < (1 << n); sub++) {
        long long group1 = 0;
        for (int i = 0; i < n; i++) {
            if ((sub >> i) & 1) {
                group1 += p[i];
            }
        }
        long long group2 = totalWeight - group1;
        long long diff = abs(group1 - group2);
        if (diff < minDiff) {
            minDiff = diff;
            bestMask = sub;
        }
    }

    cout << "Chenh lech nho nhat: " << minDiff << " (mask = " << bestMask << ")\n";
    cout << "Nhom 1 chon cac qua tao co trong luong: ";
    for (int i = 0; i < n; i++) {
        if ((bestMask >> i) & 1) cout << p[i] << ' ';
    }
    cout << '\n';
    return 0;
}
