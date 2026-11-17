/**
 * BÀI L2-07: DP LƯỚI 2D & TỐI ƯU BỘ NHỚ (ROLLING ARRAY)
 * File 02: Đếm Đường Đi Có Vật Cản (MOD = 10^9 + 7) & Biến Thể 3 Hướng Cột-Theo-Cột (QBMAX)
 * Chuẩn CP C++14 (Pha 2 STL Lớp 9)
 */
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;
const long long INF = 1000000000000000000LL;

// 1. Đếm số đường đi từ (1, 1) -> (n, m) tránh vật cản '*' theo modulo 10^9 + 7
// Xử lý an toàn cả khi (1, 1) hoặc (n, m) là vật cản '*'!
long long countGridPaths(int n, int m, const vector<string>& grid) {
    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            // Lưu ý: grid là vector<string> 0-based -> ký tự tại (i, j) là grid[i - 1][j - 1]
            if (grid[i - 1][j - 1] == '*') {
                dp[i][j] = 0; // Mọi ô vật cản (kể cả 1,1 hay n,m) đều có 0 đường đi tới!
            } else if (i == 1 && j == 1) {
                dp[1][1] = 1;
            } else {
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
            }
        }
    }
    return dp[n][m];
}

// 2. Biến thể QBMAX (VNOJ): xuất phát ở cột 1 bất kỳ, kết thúc ở cột m bất kỳ,
// mỗi bước sang cột j chỉ đến từ (i-1, j-1), (i, j-1), (i+1, j-1). Có số âm!
long long solveQBMAX(int n, int m, const vector<vector<long long>>& a) {
    // Cần (n + 2) hàng để cả hàng 0 và hàng n + 1 đều mang -INF (chặn đi chéo ra ngoài bảng)
    vector<vector<long long>> dp(n + 2, vector<long long>(m + 1, -INF));

    for (int i = 1; i <= n; i++) {
        dp[i][1] = a[i][1];
    }

    // BẮT BUỘC duyệt cột j ở ngoài, hàng i ở trong để cả cột j - 1 đã hoàn tất!
    for (int j = 2; j <= m; j++) {
        for (int i = 1; i <= n; i++) {
            long long bestPrev = max({dp[i - 1][j - 1], dp[i][j - 1], dp[i + 1][j - 1]});
            dp[i][j] = bestPrev + a[i][j];
        }
    }

    long long ans = -INF;
    for (int i = 1; i <= n; i++) {
        ans = max(ans, dp[i][m]);
    }
    return ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Test 1: Lưới 4x4 chuẩn với vật cản '*'
    vector<string> normalGrid = {
        "....",
        ".*..",
        "...*",
        "*..."
    };
    cout << "So duong di (4x4 hop le) = " << countGridPaths(4, 4, normalGrid) << '\n'; // 3

    // Test 2: Bẫy điểm xuất phát (1, 1) bị chặn '*' -> đáp án phải bằng 0
    vector<string> blockedStart = {
        "*..",
        "...",
        "..."
    };
    cout << "So duong di ((1,1) la '*') = " << countGridPaths(3, 3, blockedStart) << '\n'; // 0

    // Test 3: Bẫy điểm đích (n, m) bị chặn '*' -> đáp án phải bằng 0
    vector<string> blockedEnd = {
        "...",
        "...",
        "..*"
    };
    cout << "So duong di ((3,3) la '*') = " << countGridPaths(3, 3, blockedEnd) << '\n'; // 0

    // Test 4: QBMAX trên lưới 3x3 toàn số âm (-INF ở hàng 0 và n + 1 cứu kết quả!)
    vector<vector<long long>> negMatrix = {
        {0,   0,   0,   0},
        {0, -10, -10, -10},
        {0,  -5, -20, -10},
        {0, -10, -10, -10}
    };
    cout << "QBMAX tren ma tran am = " << solveQBMAX(3, 3, negMatrix) << '\n'; // -25
    return 0;
}
