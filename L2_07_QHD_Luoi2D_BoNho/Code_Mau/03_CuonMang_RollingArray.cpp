/**
 * BÀI L2-07: DP LƯỚI 2D & TỐI ƯU BỘ NHỚ (ROLLING ARRAY)
 * File 03: Cuộn Mảng 2 Hàng (prev/cur + swap) & Nén 1 Hàng (In-Place) Từ O(N*M) -> O(M) RAM
 * Chuẩn CP C++14 (Pha 2 STL Lớp 9)
 */
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;
const long long INF = 1000000000000000000LL;

// 1. Cuộn mảng 2 hàng (prev & cur) cho bài Đếm đường đi có vật cản '*' -> O(M) bộ nhớ
long long countPathsTwoRows(int n, int m, const vector<string>& grid) {
    vector<long long> prev(m + 1, 0), cur(m + 1, 0);

    for (int i = 1; i <= n; i++) {
        // BẮT BUỘC đặt lại toàn bộ cur về 0 sau swap, vì cur đang giữ rác của hàng i - 2!
        fill(cur.begin(), cur.end(), 0);
        for (int j = 1; j <= m; j++) {
            if (grid[i - 1][j - 1] == '*') continue; // An toàn nhờ cur[j] đã được reset = 0
            if (i == 1 && j == 1) {
                cur[j] = 1;
            } else {
                cur[j] = (prev[j] + cur[j - 1]) % MOD;
            }
        }
        swap(prev, cur); // O(1): chỉ tráo con trỏ bên trong hai vector
    }
    return prev[m];
}

// 2. Nén xuống đúng 1 hàng duy nhất dp[1..m] cho bài Đường đi tổng nhỏ nhất -> O(M) RAM
// Khi j chạy 1..m tại hàng i:
//   - Trước khi gán: dp[j] vẫn đang giữ giá trị của hàng (i - 1) -> chính là ô TRÊN (up)
//   - Đã gán xong:   dp[j - 1] đã giữ giá trị mới của hàng i   -> chính là ô TRÁI (left)
long long minPathOneRow(int n, int m, const vector<vector<long long>>& a) {
    vector<long long> dp(m + 1, INF);

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) {
                dp[1] = a[1][1];
            } else {
                dp[j] = min(dp[j], dp[j - 1]) + a[i][j];
            }
        }
    }
    return dp[m];
}

// 3. Với QBMAX (đọc cả i-1, i, i+1 của cột trước), KHÔNG thể nén 1 mảng tại chỗ vì ghi đè chéo!
// Phải dùng Cuộn mảng 2 cột (prevCol & curCol) để giữ nguyên trạng thái cột trước đó.
long long qbmaxTwoCols(int n, int m, const vector<vector<long long>>& a) {
    vector<long long> prevCol(n + 2, -INF), curCol(n + 2, -INF);
    for (int i = 1; i <= n; i++) {
        prevCol[i] = a[i][1];
    }

    for (int j = 2; j <= m; j++) {
        fill(curCol.begin(), curCol.end(), -INF);
        for (int i = 1; i <= n; i++) {
            curCol[i] = max({prevCol[i - 1], prevCol[i], prevCol[i + 1]}) + a[i][j];
        }
        swap(prevCol, curCol);
    }

    long long ans = -INF;
    for (int i = 1; i <= n; i++) {
        ans = max(ans, prevCol[i]);
    }
    return ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Minh họa tính nhanh bộ nhớ RAM (1 MB ~ 10^6 bytes) khi N = 10000, M = 10000
    long long fullTableBytes = 10005LL * 10005LL * sizeof(long long);
    long long twoRowsBytes   = 2LL * 10005LL * sizeof(long long);
    long long oneRowBytes    = 1LL * 10005LL * sizeof(long long);
    cout << "N=10000, M=10000:\n";
    cout << "  Bang 2D day du : ~" << (fullTableBytes / 1000000LL) << " MB (> 256 MB -> MLE!)\n";
    cout << "  Cuon mang 2 hang: ~" << (twoRowsBytes / 1000LL) << " KB (< 1 MB -> AC!)\n";
    cout << "  Nen 1 hang      : ~" << (oneRowBytes / 1000LL) << " KB (< 1 MB -> AC!)\n";

    // Kiểm chứng tính đúng đắn trên ví dụ nhỏ
    vector<string> grid = {
        "...",
        "...",
        ".*."
    };
    cout << "Dem duong (2-row rolling) = " << countPathsTwoRows(3, 3, grid) << '\n'; // 3

    vector<vector<long long>> cost = {
        {0, 0, 0, 0},
        {0, 5, 1, 2},
        {0, 9, 3, 4},
        {0, 1, 2, 1}
    };
    cout << "Min path (1-row rolling)  = " << minPathOneRow(3, 3, cost) << '\n'; // 12

    vector<vector<long long>> qb = {
        {0,  0, 0, 0},
        {0, 10, 1, 1},
        {0,  1, 1, 1},
        {0,  1, 1, 1}
    };
    cout << "QBMAX (2-col rolling)     = " << qbmaxTwoCols(3, 3, qb) << '\n'; // 12
    return 0;
}
