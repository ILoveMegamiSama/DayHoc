#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

struct Item {
    int w;
    long long v;
};

// 1. Cái túi VÔ HẠN (Unbounded Knapsack): mỗi món được chọn vô số lần -> duyệt XUÔI w
long long solveUnboundedMaxValue(int W, const vector<Item>& items) {
    vector<long long> dp(W + 1, 0);
    for (const auto& it : items) {
        for (int w = it.w; w <= W; w++) {
            dp[w] = max(dp[w], dp[w - it.w] + it.v);
        }
    }
    return dp[W];
}

// 2. Đếm HOÁN VỊ đồng xu (CSES-1635 Coin Combinations I):
//    1+2 và 2+1 là 2 cách KHÁC NHAU -> Vòng NGOÀI là tổng s, vòng TRONG là xu c
long long countCoinPermutations(int S, const vector<int>& coins) {
    vector<long long> dp(S + 1, 0);
    dp[0] = 1;
    for (int s = 1; s <= S; s++) {
        for (int c : coins) {
            if (s >= c) {
                dp[s] = (dp[s] + dp[s - c]) % MOD;
            }
        }
    }
    return dp[S];
}

// 3. Đếm TỔ HỢP đồng xu (CSES-1636 Coin Combinations II):
//    {1, 2} và {2, 1} là CÙNG 1 CÁCH -> Vòng NGOÀI là xu c, vòng TRONG là tổng s
long long countCoinCombinations(int S, const vector<int>& coins) {
    vector<long long> dp(S + 1, 0);
    dp[0] = 1;
    for (int c : coins) {
        for (int s = c; s <= S; s++) {
            dp[s] = (dp[s] + dp[s - c]) % MOD;
        }
    }
    return dp[S];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int W = 9;
    vector<Item> items = {{3, 40}, {5, 60}};
    cout << "Unbounded Knapsack (W=9) = " << solveUnboundedMaxValue(W, items) << '\n'; // 120

    int S = 4;
    vector<int> coins = {1, 2};
    cout << "Hoan vi xu (CSES-1635, S=4) = " << countCoinPermutations(S, coins) << '\n'; // 5
    cout << "To hop xu  (CSES-1636, S=4) = " << countCoinCombinations(S, coins) << '\n'; // 3
    return 0;
}
