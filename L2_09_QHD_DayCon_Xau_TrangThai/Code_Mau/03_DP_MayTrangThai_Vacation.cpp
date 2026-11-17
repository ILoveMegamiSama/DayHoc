#include <bits/stdc++.h>
using namespace std;

const int INF = 1000000000;

// 1. DP May Trang Thai theo ngay (AtCoder DP-C: Vacation) - Bang dp[n + 1][3]
long long solveVacation2D(const vector<vector<long long>>& val) {
    int n = (int)val.size();
    vector<vector<long long>> dp(n + 1, vector<long long>(3, 0));

    // Ngay 0 la ngay gia truoc ky nghi voi 0 diem o ca 3 trang thai -> chay chuan ca n = 1
    for (int i = 1; i <= n; i++) {
        dp[i][0] = val[i - 1][0] + max(dp[i - 1][1], dp[i - 1][2]);
        dp[i][1] = val[i - 1][1] + max(dp[i - 1][0], dp[i - 1][2]);
        dp[i][2] = val[i - 1][2] + max(dp[i - 1][0], dp[i - 1][1]);
    }
    return max({dp[n][0], dp[n][1], dp[n][2]});
}

// 2. Cuon bo nho ve O(1) chi giu 3 trang thai ngay hom qua
long long solveVacationO1(const vector<vector<long long>>& val) {
    long long d0 = 0, d1 = 0, d2 = 0;
    for (const auto& day : val) {
        long long n0 = day[0] + max(d1, d2);
        long long n1 = day[1] + max(d0, d2);
        long long n2 = day[2] + max(d0, d1);
        d0 = n0;
        d1 = n1;
        d2 = n2;
    }
    return max({d0, d1, d2});
}

// 3. Bien the rang buoc ngay hop le (CF-698A style): it so ngay nghi nhat
// a[i]: 0 = chi nghi, 1 = thi, 2 = gym, 3 = ca thi va gym
int solveMinRestVacations(const vector<int>& a) {
    int n = (int)a.size();
    // state 0: nghi, 1: lam bai thi, 2: tap gym
    vector<vector<int>> dp(n + 1, vector<int>(3, INF));
    dp[0][0] = dp[0][1] = dp[0][2] = 0;

    for (int i = 1; i <= n; i++) {
        dp[i][0] = min({dp[i - 1][0], dp[i - 1][1], dp[i - 1][2]}) + 1; // Nghi luon duoc phep
        if (a[i - 1] == 1 || a[i - 1] == 3) {
            dp[i][1] = min(dp[i - 1][0], dp[i - 1][2]);
        }
        if (a[i - 1] == 2 || a[i - 1] == 3) {
            dp[i][2] = min(dp[i - 1][0], dp[i - 1][1]);
        }
    }
    return min({dp[n][0], dp[n][1], dp[n][2]});
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<vector<long long>> sample = {{10, 40, 70}, {20, 50, 80}, {30, 60, 90}};
    vector<vector<long long>> greedyTrap = {{10, 40, 70}, {20, 50, 100}};
    vector<vector<long long>> oneDay = {{10, 40, 70}};

    cout << "[Vacation Sample n=3] 2D = " << solveVacation2D(sample)
         << " | O(1) = " << solveVacationO1(sample) << '\n';
    cout << "[Bay Tham lam n=2] DP = " << solveVacation2D(greedyTrap)
         << " (Tham lam chi duoc 120)\n";
    cout << "[Bien n=1] DP = " << solveVacation2D(oneDay) << '\n';

    vector<int> vacDays = {1, 3, 2, 2};
    cout << "[Min Rest Vacations {1,3,2,2}] = " << solveMinRestVacations(vacDays) << '\n';
    return 0;
}
