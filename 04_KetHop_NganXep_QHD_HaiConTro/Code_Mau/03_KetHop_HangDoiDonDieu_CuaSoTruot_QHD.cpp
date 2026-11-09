/**
 * VÍ DỤ 03: KẾT HỢP CỬA SỔ TRƯỢT VÀ NGĂN XẾP ĐƠN ĐIỆU — MONOTONIC DEQUE DP
 * Bài toán: Nhảy bậc thang (Jump Game VI) — Chi phí lớn nhất từ 0 đến N-1,
 * mỗi bước nhảy tối đa K bước: dp[i] = a[i] + max_{i-K <= j < i} {dp[j]}.
 * Biên dịch: g++ -std=c++14 -O2 -Wall 03_KetHop_HangDoiDonDieu_CuaSoTruot_QHD.cpp -o 03_KetHop_HangDoiDonDieu_CuaSoTruot_QHD.exe
 */

#include <iostream>
#include <vector>
#include <deque>

using namespace std;

long long chiPhiNhayToiDa(const vector<long long>& a, int K) {
    int n = a.size();
    vector<long long> dp(n, 0);
    deque<int> dq; // Lưu chỉ số j theo thứ tự dp[j] giảm dần từ đầu đến cuối

    dp[0] = a[0];
    dq.push_back(0);

    for (int i = 1; i < n; i++) {
        // 1. Con trỏ trái cửa sổ trượt: Bỏ các chỉ số quá hạn (j < i - K)
        while (!dq.empty() && dq.front() < i - K) {
            dq.pop_front();
        }

        // 2. Chuyển trạng thái DP trong O(1): dq.front() luôn là max dp[j] trong cửa sổ!
        dp[i] = a[i] + dp[dq.front()];

        // 3. Cơ chế ngăn xếp đơn điệu: Loại bỏ các phần tử kém tối ưu hơn ở đuôi
        while (!dq.empty() && dp[dq.back()] <= dp[i]) {
            dq.pop_back();
        }
        dq.push_back(i);
    }
    return dp[n - 1];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<long long> a = {1, -1, -2, 4, -7, 3};
    int K = 2;

    long long ans = chiPhiNhayToiDa(a, K);
    cout << "=== TỐI ƯU HÓA QUY HOẠCH ĐỘNG BẰNG MONOTONIC DEQUE ===" << "\n";
    cout << "Dãy điểm: {1, -1, -2, 4, -7, 3}, bước nhảy tối đa K = 2\n";
    cout << "Điểm lớn nhất đạt được: " << ans << " (Kỳ vọng: 7: 1 -> -1 -> 4 -> 3 = 7)\n";

    return 0;
}
