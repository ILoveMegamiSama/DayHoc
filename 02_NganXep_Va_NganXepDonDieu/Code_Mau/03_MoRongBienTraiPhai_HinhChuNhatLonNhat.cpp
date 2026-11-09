/**
 * VÍ DỤ 03: ỨNG DỤNG MỞ RỘNG BIÊN TRÁI & BIÊN PHẢI — HÌNH CHỮ NHẬT LỚN NHẤT
 * Bài toán kinh điển: Largest Rectangle in Histogram trong O(N).
 * Biên dịch: g++ -std=c++14 -O2 -Wall 03_MoRongBienTraiPhai_HinhChuNhatLonNhat.cpp -o 03_MoRongBienTraiPhai_HinhChuNhatLonNhat.exe
 */

#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>

using namespace std;

// Tìm diện tích hình chữ nhật lớn nhất tạo bởi các cột
long long hinhChuNhatLonNhat(const vector<long long>& h) {
    int n = h.size();
    vector<int> L(n), R(n);
    stack<int> st;

    // 1. Tìm biên trái: Cột đầu tiên bên trái thấp hơn h[i]
    for (int i = 0; i < n; i++) {
        while (!st.empty() && h[st.top()] >= h[i]) {
            st.pop();
        }
        L[i] = st.empty() ? -1 : st.top();
        st.push(i);
    }

    // Xóa sạch ngăn xếp để tái sử dụng
    while (!st.empty()) st.pop();

    // 2. Tìm biên phải: Cột đầu tiên bên phải thấp hơn h[i]
    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && h[st.top()] >= h[i]) {
            st.pop();
        }
        R[i] = st.empty() ? n : st.top();
        st.push(i);
    }

    // 3. Tính diện tích tối đa mở rộng từ mỗi cột h[i]
    long long dienTichMax = 0;
    for (int i = 0; i < n; i++) {
        long long chieuRong = R[i] - L[i] - 1;
        long long dienTich = h[i] * chieuRong;
        dienTichMax = max(dienTichMax, dienTich);
    }
    return dienTichMax;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<long long> h = {2, 1, 5, 6, 2, 3};
    long long ans = hinhChuNhatLonNhat(h);

    cout << "=== HÌNH CHỮ NHẬT LỚN NHẤT TRONG HISTOGRAM ===" << "\n";
    cout << "Các cột: {2, 1, 5, 6, 2, 3}\n";
    cout << "Diện tích lớn nhất: " << ans << " (Cột 5 và 6 tạo diện tích 5 * 2 = 10)\n";

    return 0;
}
