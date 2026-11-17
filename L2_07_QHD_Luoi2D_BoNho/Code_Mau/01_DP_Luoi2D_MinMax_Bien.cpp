/**
 * BÀI L2-07: DP LƯỚI 2D & TỐI ƯU BỘ NHỚ (ROLLING ARRAY)
 * File 01: Bảng Trạng Thái 2D dp[i][j], Chuẩn Biên 1-Based (±INF) & Truy Vết Đường Đi
 * Chuẩn CP C++14 (Pha 2 STL Lớp 9)
 */
#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL; // 1e18: an toàn tuyệt đối khi cộng chi phí

// 1. Đường đi tổng nhỏ nhất từ (1, 1) -> (n, m), chỉ đi Phải hoặc Xuống (1-based)
// Khởi tạo toàn bảng dp bằng INF giúp hàng 0 & cột 0 tự động là tường chắn ±INF
void solveMinPathWithTrace(int n, int m, const vector<vector<long long>>& a) {
    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, INF));

    dp[1][1] = a[1][1];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) continue;
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + a[i][j];
        }
    }

    // Truy vết ngược On-the-fly từ (n, m) về (1, 1) trên chính bảng dp[][]
    string moves;
    vector<pair<int, int>> coords;
    int r = n, c = m;
    while (r > 1 || c > 1) {
        coords.push_back({r, c});
        if (r > 1 && dp[r][c] == dp[r - 1][c] + a[r][c]) {
            moves.push_back('D'); // Xuống từ ô trên (r - 1, c)
            r--;
        } else {
            moves.push_back('R'); // Sang phải từ ô trái (r, c - 1)
            c--;
        }
    }
    coords.push_back({1, 1});
    reverse(moves.begin(), moves.end());
    reverse(coords.begin(), coords.end());

    cout << "Tong nho nhat = " << dp[n][m] << " | Buoc di: " << moves << '\n';
    cout << "Toa do lo trinh:";
    for (const auto& cell : coords) {
        cout << " (" << cell.first << "," << cell.second << ")";
    }
    cout << '\n';
}

// 2. Đường đi tổng LỚN NHẤT trên lưới CÓ SỐ ÂM (bắt buộc lót biên -INF, không dùng 0!)
long long solveMaxPathWithNegatives(int n, int m, const vector<vector<long long>>& a) {
    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, -INF));
    dp[1][1] = a[1][1];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (i == 1 && j == 1) continue;
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) + a[i][j];
        }
    }
    return dp[n][m];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ 1: Lưới 3x3 tìm tổng nhỏ nhất + truy vết đường đi (1,1) -> (3,3)
    vector<vector<long long>> gridMin = {
        {0, 0, 0, 0},
        {0, 1, 9, 9},
        {0, 2, 9, 9},
        {0, 3, 1, 1}
    };
    solveMinPathWithTrace(3, 3, gridMin); // Tong = 8 | DDRR

    // Ví dụ 2: Lưới 2x3 toàn số âm (nếu lót biên 0 thay vì -INF sẽ chọn nhầm 0 từ ngoài biên!)
    vector<vector<long long>> gridNeg = {
        {0,  0,   0,  0},
        {0, -5,  -2, -9},
        {0, -8, -10, -1}
    };
    cout << "Max sum tren luoi so am = " << solveMaxPathWithNegatives(2, 3, gridNeg) << '\n'; // -17

    // Ví dụ 3: Trường hợp biên lưới 1x1
    vector<vector<long long>> grid1x1 = {
        {0, 0},
        {0, -7}
    };
    solveMinPathWithTrace(1, 1, grid1x1); // Tong = -7 | Buoc di rong
    return 0;
}
