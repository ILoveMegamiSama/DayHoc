/**
 * BÀI L2-06: NHẬP MÔN QUY HOẠCH ĐỘNG (DP 1D & TRUY VẾT)
 * File 02: Khung 4 Bước DP & Lập Bảng 1D (Bottom-Up: Pull DP, Push DP, Đổi Tiền, Không Kề Nhau)
 * Chuẩn CP C++14 (Pha 2 STL Lớp 9)
 */
#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL; // 1e18: tuyệt đối không dùng LLONG_MAX

// 1. Frog 1 (AtCoder DP-A) theo Pull DP: tính dp[i] bằng cách kéo từ i-1 và i-2
long long frog1Pull(const vector<long long>& h) {
    int n = (int)h.size() - 1; // Đánh số đá 1..n
    vector<long long> dp(n + 1, INF);
    dp[1] = 0;
    for (int i = 2; i <= n; i++) {
        dp[i] = min(dp[i], dp[i - 1] + abs(h[i] - h[i - 1]));
        if (i >= 3) {
            dp[i] = min(dp[i], dp[i - 2] + abs(h[i] - h[i - 2]));
        }
    }
    return dp[n];
}

// 2. Frog 2 (AtCoder DP-B) theo Push DP: đứng ở i đẩy tới i + 1 .. i + K
long long frog2Push(const vector<long long>& h, int K) {
    int n = (int)h.size() - 1;
    vector<long long> dp(n + 1, INF);
    dp[1] = 0;
    for (int i = 1; i <= n; i++) {
        if (dp[i] == INF) continue; // Bảo vệ trạng thái chưa tới được
        for (int step = 1; step <= K; step++) {
            if (i + step <= n) {
                long long cand = dp[i] + abs(h[i + step] - h[i]);
                dp[i + step] = min(dp[i + step], cand);
            }
        }
    }
    return dp[n];
}

// 3. Đổi tiền Min (CSES-1634 style): có kiểm tra dp[s - c] != INF
long long minCoinsBottomUp(int S, const vector<int>& coins) {
    vector<long long> dp(S + 1, INF);
    dp[0] = 0;
    for (int s = 1; s <= S; s++) {
        for (int c : coins) {
            if (s >= c && dp[s - c] != INF) {
                dp[s] = min(dp[s], dp[s - c] + 1);
            }
        }
    }
    return (dp[S] == INF ? -1 : dp[S]);
}

// 4. Chọn phần tử không kề nhau có tổng lớn nhất (House Robber / Boredom pattern)
long long maxNonAdjacent(const vector<long long>& a) {
    int n = (int)a.size() - 1; // 1-based
    if (n == 0) return 0;
    vector<long long> dp(n + 1, 0);
    dp[1] = max(0LL, a[1]);
    for (int i = 2; i <= n; i++) {
        // Bỏ i -> giữ dp[i - 1]; Chọn i -> lấy dp[i - 2] + a[i]
        dp[i] = max(dp[i - 1], dp[i - 2] + a[i]);
    }
    return dp[n];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<long long> h = {0, 10, 25, 45, 20};
    cout << "Frog 1 Pull DP (K=2): " << frog1Pull(h) << '\n';    // 20
    cout << "Frog 2 Push DP (K=2): " << frog2Push(h, 2) << '\n'; // 20
    cout << "Frog 2 Push DP (K=3): " << frog2Push(h, 3) << '\n'; // 10 (nhảy thẳng 1 -> 4)

    cout << "Doi tien {1, 3, 4}, S=6 : " << minCoinsBottomUp(6, {1, 3, 4}) << '\n'; // 2
    cout << "Doi tien {2, 4}, S=5    : " << minCoinsBottomUp(5, {2, 4}) << '\n';    // -1

    vector<long long> houses = {0, 3, 10, 3, 1, 2};
    cout << "Khong ke nhau {3,10,3,1,2}: " << maxNonAdjacent(houses) << '\n'; // 12 (10 + 2)
    return 0;
}
