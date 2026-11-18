#include <bits/stdc++.h>
using namespace std;

// 1. LIS O(N^2) tang ngat (a[j] < a[i]) + Truy vet day con tang dai nhat (1-based)
void solveLISWithTrace(const vector<long long>& a) {
    int n = (int)a.size() - 1; // a[1..n]
    vector<int> dp(n + 1, 1);    // Moi phan tu tu no la day tang do dai 1
    vector<int> trace(n + 1, -1);

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j < i; j++) {
            if (a[j] < a[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                trace[i] = j;
            }
        }
    }

    // BAY KINH DIEN: Dap an la max tren TOAN BO dp[1..n], KHONG PHAI dp[n]!
    int bestPos = 1;
    for (int i = 2; i <= n; i++) {
        if (dp[i] > dp[bestPos]) {
            bestPos = i;
        }
    }

    vector<long long> seq;
    int cur = bestPos;
    while (cur != -1) {
        seq.push_back(a[cur]);
        cur = trace[cur];
    }
    reverse(seq.begin(), seq.end());

    cout << "[LIS tang ngat] Do dai max = " << dp[bestPos]
         << " (trong khi dp[n]=" << dp[n] << ") | Day con:";
    for (long long x : seq) cout << ' ' << x;
    cout << '\n';
}

// 2. Bien the: Day con KHONG GIAM dai nhat (a[j] <= a[i])
int solveNonDecreasingLIS(const vector<long long>& a) {
    int n = (int)a.size() - 1;
    vector<int> dp(n + 1, 1);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j < i; j++) {
            if (a[j] <= a[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    return *max_element(dp.begin() + 1, dp.end());
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Vi du 1: Phan tu cuoi cung a[6] = 1 rat nho -> dp[6] = 1, nhung LIS = 3!
    vector<long long> a1 = {0, 4, 2, 6, 3, 8, 1};
    solveLISWithTrace(a1);

    // Vi du 2: Phan biet tang ngat (<) vs khong giam (<=)
    vector<long long> a2 = {0, 3, 3, 5, 2, 5};
    solveLISWithTrace(a2);
    cout << "[Khong giam <=] Do dai max = " << solveNonDecreasingLIS(a2) << '\n';

    // Vi du 3: Truong hop bien n = 1
    vector<long long> a3 = {0, 42};
    solveLISWithTrace(a3);

    return 0;
}
