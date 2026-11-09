/**
 * VÍ DỤ 01: HAI CON TRỎ NGƯỢC CHIỀU — TÌM CẶP SỐ CÓ TỔNG BẰNG S
 * Biên dịch: g++ -std=c++14 -O2 -Wall 01_HaiConTroNguocChieu_TimCapTongBangS.cpp -o 01_HaiConTroNguocChieu_TimCapTongBangS.exe
 */

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Tìm 2 vị trí i != j sao cho a[i] + a[j] == S
// Trả về {i, j} theo chỉ số 1-based ban đầu
pair<int, int> timCapTongBangS(vector<pair<long long, int>>& a, long long S) {
    int trai = 0;
    int phai = (int)a.size() - 1;

    while (trai < phai) {
        long long tong = a[trai].first + a[phai].first;
        if (tong == S) {
            return {a[trai].second, a[phai].second};
        }
        if (tong < S) {
            trai++; // Tổng còn nhỏ -> Cần tăng số bên trái lên
        } else {
            phai--; // Tổng quá lớn -> Cần giảm số bên phải xuống
        }
    }
    return {-1, -1};
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<long long> goc = {2, 7, 5, 1, 9, 4};
    long long S = 8;
    int n = goc.size();

    // Lưu kèm vị trí gốc ban đầu để in ra
    vector<pair<long long, int>> a(n);
    for (int i = 0; i < n; i++) {
        a[i] = {goc[i], i + 1};
    }
    sort(a.begin(), a.end()); // Hai con trỏ ngược chiều bắt buộc phải sắp xếp

    pair<int, int> res = timCapTongBangS(a, S);
    cout << "=== TÌM CẶP SỐ CÓ TỔNG BẰNG " << S << " ===" << "\n";
    if (res.first != -1) {
        cout << "Tìm thấy tại 2 vị trí gốc: " << res.first << " và " << res.second << "\n";
        cout << "Giá trị: " << goc[res.first - 1] << " + " << goc[res.second - 1] << " = " << S << "\n";
    } else {
        cout << "Không tìm thấy cặp số nào có tổng bằng " << S << "\n";
    }

    return 0;
}
