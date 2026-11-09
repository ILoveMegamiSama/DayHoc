/**
 * VÍ DỤ 02: HAI CON TRỎ CÙNG CHIỀU (CỬA SỔ TRƯỢT - SLIDING WINDOW)
 * Tìm độ dài đoạn con liên tiếp dài nhất có tổng <= S trên dãy số không âm.
 * Biên dịch: g++ -std=c++14 -O2 -Wall 02_HaiConTroCungChieu_DoanConDaiNhat.cpp -o 02_HaiConTroCungChieu_DoanConDaiNhat.exe
 */

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int doanConDaiNhatTongKhongQuaS(const vector<long long>& a, long long S) {
    int n = a.size();
    int trai = 0;
    long long tong = 0;
    int maxLen = 0;

    for (int phai = 0; phai < n; phai++) {
        tong += a[phai]; // Đưa a[phai] vào cửa sổ

        // Khi tổng vượt ngưỡng S: thu hẹp cửa sổ từ bên trái
        while (tong > S && trai <= phai) {
            tong -= a[trai];
            trai++;
        }

        // Lúc này đoạn [trai..phai] chắc chắn hợp lệ
        maxLen = max(maxLen, phai - trai + 1);
    }
    return maxLen;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<long long> a = {1, 3, 2, 1, 4, 1, 3, 2};
    long long S = 5;

    int ans = doanConDaiNhatTongKhongQuaS(a, S);
    cout << "=== ĐỘ DÀI ĐOẠN CON DÀI NHẤT CÓ TỔNG <= " << S << " ===" << "\n";
    cout << "Dãy số: {1, 3, 2, 1, 4, 1, 3, 2}\n";
    cout << "Độ dài dài nhất: " << ans << " (Ví dụ đoạn: {2, 1, 1, 1} hoặc {3, 2})\n";

    return 0;
}
