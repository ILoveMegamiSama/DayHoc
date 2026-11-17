#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

// Dựng bảng Tam giác Pascal tính tổ hợp C[n][k] % MOD trong O(N^2)
vector<vector<long long>> buildPascalMod(int maxN, long long mod) {
    vector<vector<long long>> C(maxN + 1, vector<long long>(maxN + 1, 0));
    for (int i = 0; i <= maxN; i++) {
        C[i][0] = 1;
        C[i][i] = 1;
        for (int j = 1; j < i; j++) {
            C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % mod;
        }
    }
    return C;
}

// Dựng bảng Tam giác Pascal không chia dư cho n nhỏ (n <= 60 vừa kiểu long long)
vector<vector<long long>> buildPascalExact(int maxN) {
    vector<vector<long long>> C(maxN + 1, vector<long long>(maxN + 1, 0));
    for (int i = 0; i <= maxN; i++) {
        C[i][0] = 1;
        C[i][i] = 1;
        for (int j = 1; j < i; j++) {
            C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
        }
    }
    return C;
}

long long safeComb(const vector<vector<long long>>& C, int n, int k) {
    if (k < 0 || k > n) return 0;
    return C[n][k];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Quy tắc Cộng & Quy tắc Nhân an toàn tràn số với 1LL
    int ao = 1000000, quan = 1000000, mu = 5;
    long long tongCong = (1LL * ao + quan + mu) % MOD; // Chọn 1 trong 3 loại -> Cộng
    long long boTrangPhuc = (((1LL * ao * quan) % MOD) * mu) % MOD; // Chọn đủ 3 món -> Nhân

    cout << "Quy tac Cong = " << tongCong << '\n';
    cout << "Quy tac Nhan = " << boTrangPhuc << '\n';

    // 2. Tam giác Pascal chia dư 10^9 + 7
    vector<vector<long long>> Cmod = buildPascalMod(100, MOD);
    cout << "C(10, 3) % MOD = " << safeComb(Cmod, 10, 3) << '\n';
    cout << "C(50, 25) % MOD = " << safeComb(Cmod, 50, 25) << '\n';

    // 3. Ứng dụng kiểu CF-131C (The World is a Theatre):
    // Chọn đúng t = 6 diễn viên từ n = 5 nam, m = 4 nữ (ít nhất 4 nam, ít nhất 1 nữ)
    int n = 5, m = 4, t = 6;
    vector<vector<long long>> Cexact = buildPascalExact(30);
    long long ways = 0;
    for (int boys = 4; boys <= n; boys++) {
        int girls = t - boys;
        if (girls >= 1 && girls <= m) {
            // Quy tắc Nhân cho từng cấu hình (boys, girls), Quy tắc Cộng qua các trường hợp
            ways += safeComb(Cexact, n, boys) * safeComb(Cexact, m, girls);
        }
    }
    cout << "So cach chon doan (n=5, m=4, t=6) = " << ways << '\n';
    return 0;
}
