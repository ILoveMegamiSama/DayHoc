/**
 * BÀI L2-01: MẢNG CỘNG DỒN (1D/2D) & MẢNG HIỆU
 * File mẫu 02: Mảng Cộng Dồn 2D & Công Thức Bao Hàm - Loại Trừ
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Dựng bảng pref[i][j] (1-based, hàng 0 và cột 0 bằng 0) trong O(N * M):
 *    pref[i][j] = a[i][j] + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1]
 * 2. Truy vấn tổng hình chữ nhật con (r1, c1)..(r2, c2) trong O(1):
 *    pref[r2][c2] - pref[r1 - 1][c2] - pref[r2][c1 - 1] + pref[r1 - 1][c1 - 1]
 * 3. Phân biệt rạch ròi dấu của góc chéo khi XÂY BẢNG (-) và khi TRUY VẤN (+).
 */

#include <bits/stdc++.h>
using namespace std;

vector<vector<long long>> buildPrefix2D(int rows, int cols, const vector<vector<long long>>& a) {
    vector<vector<long long>> pref(rows + 1, vector<long long>(cols + 1, 0));
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= cols; j++) {
            // Cộng ô hiện tại + hình chữ nhật trên + hình chữ nhật trái - phần giao bị đếm đúp
            pref[i][j] = a[i][j] + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
        }
    }
    return pref;
}

long long queryRect2D(const vector<vector<long long>>& pref, int r1, int c1, int r2, int c2) {
    // Lấy vùng lớn - dải trên - dải trái + góc chéo bị trừ 2 lần
    return pref[r2][c2] - pref[r1 - 1][c2] - pref[r2][c1 - 1] + pref[r1 - 1][c1 - 1];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 4, m = 4;
    vector<vector<long long>> a = {
        {0, 0, 0, 0, 0},
        {0, 1, 2, 3, 4},
        {0, 5, 6, 7, 8},
        {0, 9, 1, 2, 3},
        {0, 4, 5, 6, 7}
    };

    vector<vector<long long>> pref = buildPrefix2D(n, m, a);

    cout << "=== PHAN A: BANG CONG DON 2D pref[i][j] ===" << '\n';
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cout << pref[i][j] << (j == m ? '\n' : ' ');
        }
    }

    cout << "\n=== PHAN B: TRUY VAN HINH CHU NHAT TRONG O(1) ===" << '\n';
    struct RectQuery {
        int r1, c1, r2, c2;
    };
    vector<RectQuery> queries = {
        {1, 1, 4, 4}, // Toàn bộ bảng (biên trái và biên trên bằng 0)
        {2, 2, 3, 3}, // Lõi giữa: 6 + 7 + 1 + 2 = 16
        {2, 1, 4, 3}, // Giáp mép trái (c1 = 1)
        {3, 3, 3, 3}  // Đúng 1 ô duy nhất a[3][3] = 2
    };

    for (const RectQuery& q : queries) {
        long long fastAns = queryRect2D(pref, q.r1, q.c1, q.r2, q.c2);
        long long bruteAns = 0;
        for (int i = q.r1; i <= q.r2; i++) {
            for (int j = q.c1; j <= q.c2; j++) {
                bruteAns += a[i][j];
            }
        }
        cout << "(" << q.r1 << "," << q.c1 << ")..(" << q.r2 << "," << q.c2 << "): "
             << "O(1) = " << fastAns << " | Brute = " << bruteAns << '\n';
    }

    return 0;
}
