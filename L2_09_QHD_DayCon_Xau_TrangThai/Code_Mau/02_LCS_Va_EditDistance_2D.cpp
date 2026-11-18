#include <bits/stdc++.h>
using namespace std;

// 1. Xau Con Chung Dai Nhat (LCS) + Truy vet in lai xau ket qua
void solveLCSWithTrace(const string& A, const string& B) {
    int n = (int)A.size();
    int m = (int)B.size();

    // Base case: dp[i][0] = 0 va dp[0][j] = 0
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (A[i - 1] == B[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1; // Khop ky tu: di cheo + 1
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]); // Bo ky tu cuoi A hoac B
            }
        }
    }

    // Truy vet nguoc tu (n, m) ve (0, 0)
    string lcs;
    int i = n, j = m;
    while (i > 0 && j > 0) {
        if (A[i - 1] == B[j - 1]) {
            lcs.push_back(A[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    reverse(lcs.begin(), lcs.end());

    cout << "[LCS] \"" << A << "\" & \"" << B << "\" -> Do dai = "
         << dp[n][m] << " | Xau chung = \"" << lcs << "\"\n";
}

// 2. Khoang Cach Bien Doi Xau (Edit Distance - CSES 1639)
int solveEditDistance(const string& A, const string& B) {
    int n = (int)A.size();
    int m = (int)B.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

    // BAT BUOC: Bien xau i ky tu thanh rong phai xoa i lan; bien rong thanh j ky tu phai chen j lan
    for (int i = 0; i <= n; i++) dp[i][0] = i;
    for (int j = 0; j <= m; j++) dp[0][j] = j;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            int delCost = dp[i - 1][j] + 1;                        // Xoa A[i - 1]
            int insCost = dp[i][j - 1] + 1;                        // Chen B[j - 1]
            int repCost = dp[i - 1][j - 1] + (A[i - 1] != B[j - 1]); // Thay hoac giu nguyen
            dp[i][j] = min({delCost, insCost, repCost});
        }
    }
    return dp[n][m];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    solveLCSWithTrace("abcbdab", "bdcaba");
    solveLCSWithTrace("AGGTAB", "GXTXAYB");

    cout << "[Edit Distance] LOVE -> MOVIE = " << solveEditDistance("LOVE", "MOVIE") << '\n';
    cout << "[Edit Distance] kitten -> sitting = " << solveEditDistance("kitten", "sitting") << '\n';
    cout << "[Edit Distance] abc -> \"\" (bien rong) = " << solveEditDistance("abc", "") << '\n';
    return 0;
}
