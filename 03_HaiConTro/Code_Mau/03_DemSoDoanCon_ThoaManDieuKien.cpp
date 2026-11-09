/**
 * VÍ DỤ 03: ĐẾM SỐ ĐOẠN CON LIÊN TIẾP CÓ TỔNG <= S TRONG O(N)
 * Biên dịch: g++ -std=c++14 -O2 -Wall 03_DemSoDoanCon_ThoaManDieuKien.cpp -o 03_DemSoDoanCon_ThoaManDieuKien.exe
 */

#include <iostream>
#include <vector>

using namespace std;

long long demSoDoanConTongKhongQuaS(const vector<long long>& a, long long S) {
    int n = a.size();
    int trai = 0;
    long long tong = 0;
    long long tongSoDoan = 0;

    for (int phai = 0; phai < n; phai++) {
        tong += a[phai];

        while (tong > S && trai <= phai) {
            tong -= a[trai];
            trai++;
        }

        // Nếu đoạn [trai..phai] có tổng <= S thì tất cả các đoạn bắt đầu từ
        // trai, trai+1, ..., phai và kết thúc tại phai đều có tổng <= S!
        // Số lượng đoạn con như vậy đúng bằng (phai - trai + 1).
        tongSoDoan += (phai - trai + 1);
    }
    return tongSoDoan;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<long long> a = {2, 1, 3, 2, 4};
    long long S = 4;

    long long ans = demSoDoanConTongKhongQuaS(a, S);
    cout << "=== ĐẾM SỐ ĐOẠN CON CÓ TỔNG <= " << S << " ===" << "\n";
    cout << "Dãy số: {2, 1, 3, 2, 4}\n";
    cout << "Tổng số đoạn con thỏa mãn: " << ans << "\n";

    return 0;
}
