/**
 * VÍ DỤ 02: DÙNG NGĂN XẾP ĐƠN ĐIỆU ĐỂ TỐI ƯU HÓA QUY HOẠCH ĐỘNG
 * Bài toán: Tính tổng giá trị nhỏ nhất của mọi đoạn con liên tiếp (Sum of Subarray Minimums).
 * Tối ưu từ O(N^2) xuống O(N) nhờ kết hợp Monotonic Stack và DP.
 * Biên dịch: g++ -std=c++14 -O2 -Wall 02_NganXepDonDieu_ToiUu_QuyHoachDong.cpp -o 02_NganXepDonDieu_ToiUu_QuyHoachDong.exe
 */

#include <iostream>
#include <vector>
#include <stack>

using namespace std;

const int MOD = 1e9 + 7;

// dp[i] là tổng min của tất cả các đoạn con kết thúc tại i.
// Dùng Monotonic Stack tìm L là vị trí gần nhất bên trái nhỏ hơn a[i].
// Công thức chuyển trạng thái:
// dp[i] = dp[L] + a[i] * (i - L)  (nếu có L)
// dp[i] = a[i] * (i + 1)          (nếu không có L, tức a[i] nhỏ nhất từ đầu đến i)
long long tongMinCacDoanCon(const vector<int>& a) {
    int n = a.size();
    vector<long long> dp(n, 0);
    stack<int> st; // Ngăn xếp đơn điệu tăng dần lưu chỉ số

    long long tongKetQua = 0;

    for (int i = 0; i < n; i++) {
        // Loại bỏ các phần tử lớn hơn hoặc bằng a[i]
        while (!st.empty() && a[st.top()] >= a[i]) {
            st.pop();
        }

        int L = st.empty() ? -1 : st.top();

        if (L == -1) {
            dp[i] = ((long long)a[i] * (i + 1)) % MOD;
        } else {
            dp[i] = (dp[L] + (long long)a[i] * (i - L)) % MOD;
        }

        tongKetQua = (tongKetQua + dp[i]) % MOD;
        st.push(i);
    }
    return tongKetQua;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<int> a = {3, 1, 2, 4};
    long long ans = tongMinCacDoanCon(a);

    cout << "=== TỔNG GIÁ TRỊ NHỎ NHẤT CÁC ĐOẠN CON ===" << "\n";
    cout << "Dãy số: {3, 1, 2, 4}\n";
    cout << "Tổng min của tất cả các đoạn con: " << ans << " (Kỳ vọng: 17)\n";

    return 0;
}
