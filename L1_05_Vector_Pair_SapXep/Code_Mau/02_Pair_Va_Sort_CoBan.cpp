/**
 * BÀI L1-05: STD::VECTOR, PAIR & SẮP XẾP (STD::SORT) — MỞ KHÓA PHA 2 STL
 * File mẫu 02: std::pair<T1, T2>, vector<pair> & std::sort O(N log N)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Đóng gói 2 thông tin gắn liền (điểm số + mã thí sinh, hoặc sức mạnh + thưởng)
 *    vào std::pair<T1, T2> để không bị thất lạc dấu vết khi sắp xếp.
 * 2. Nắm quy tắc so sánh mặc định của pair: so .first trước, bằng nhau mới so .second.
 * 3. Dùng std::sort(v.begin(), v.end()) chạy trong O(N log N), đánh bại O(N^2) TLE.
 */

#include <bits/stdc++.h>
using namespace std;

// Đếm số bước so sánh thực tế của Selection Sort O(N^2) trên bản sao nhỏ
long long demBuocSelectionSort(vector<int> a) {
    long long buoc = 0;
    int n = (int)a.size();
    for (int i = 0; i < n; i++) {
        int viTriMin = i;
        for (int j = i + 1; j < n; j++) {
            buoc++;
            if (a[j] < a[viTriMin]) {
                viTriMin = j;
            }
        }
        swap(a[i], a[viTriMin]);
    }
    return buoc;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Phần A: Sắp xếp mảng thường tăng dần & giảm dần với std::sort
    vector<int> a = {42, 15, 8, 99, 23, 15};
    sort(a.begin(), a.end()); // O(N log N) tăng dần

    cout << "=== PHAN A: STD::SORT TANG & GIAM DAN ===" << '\n';
    cout << "Tang dan: ";
    for (int i = 0; i < (int)a.size(); i++) {
        cout << a[i] << (i + 1 < (int)a.size() ? ' ' : '\n');
    }

    sort(a.begin(), a.end(), greater<int>()); // Giảm dần bằng bộ so sánh chuẩn STL
    cout << "Giam dan: ";
    for (int i = 0; i < (int)a.size(); i++) {
        cout << a[i] << (i + 1 < (int)a.size() ? ' ' : '\n');
    }

    // Phần B: Gắn (Điểm, Mã số gốc) vào vector<pair<int, int>>
    // Chú ý: Đặt điểm ở .first, mã thí sinh ở .second để sort mặc định theo điểm!
    vector<pair<int, int>> thiSinh;
    thiSinh.push_back(make_pair(85, 1)); // Thí sinh #1 đạt 85 điểm
    thiSinh.push_back({95, 2});          // Cú pháp gọn {a, b} trong C++11/14
    thiSinh.push_back({85, 3});
    thiSinh.push_back({70, 4});

    sort(thiSinh.begin(), thiSinh.end()); // Tăng dần theo .first, trùng thì tăng theo .second

    cout << "\n=== PHAN B: VECTOR<PAIR<INT, INT>> SAU KHI SORT ===" << '\n';
    for (int i = 0; i < (int)thiSinh.size(); i++) {
        cout << "Diem = " << thiSinh[i].first
             << ", Ma goc = #" << thiSinh[i].second << '\n';
    }

    // Phần C: Bài toán mẫu kiểu Dragons (gặp quái yếu trước để tích lũy sức mạnh)
    // Nếu không sort mà gặp quái {20, 5} trước sẽ thua ngay; sau khi sort thắng cả 3!
    int sucManh = 11;
    vector<pair<int, int>> quai = {{20, 5}, {10, 12}, {15, 8}};
    sort(quai.begin(), quai.end()); // Phải sắp xếp theo sức mạnh quái (.first) tăng dần!

    bool thangTatCa = true;
    for (int i = 0; i < (int)quai.size(); i++) {
        if (sucManh > quai[i].first) {
            sucManh += quai[i].second;
        } else {
            thangTatCa = false;
            break;
        }
    }
    cout << "\n=== PHAN C: CHIEN THANG THEO THU TU SORT PAIR ===" << '\n';
    cout << "Ket qua: " << (thangTatCa ? "YES" : "NO")
         << ", suc manh cuoi = " << sucManh << '\n';

    // Phần D: So sánh trực tiếp số bước O(N^2) vs ước lượng O(N log N)
    int nThu = 2000;
    vector<int> dayNguoc(nThu);
    for (int i = 0; i < nThu; i++) {
        dayNguoc[i] = nThu - i;
    }
    long long buocN2 = demBuocSelectionSort(dayNguoc);
    long long uocLuongNLogN = (long long)nThu * 11; // log2(2000) ~ 11
    cout << "\n=== PHAN D: O(N^2) VS O(N log N) TAI N = " << nThu << " ===" << '\n';
    cout << "Selection Sort O(N^2)  : " << buocN2 << " phep so sanh" << '\n';
    cout << "std::sort O(N log N)   : ~" << uocLuongNLogN << " phep so sanh" << '\n';

    return 0;
}
