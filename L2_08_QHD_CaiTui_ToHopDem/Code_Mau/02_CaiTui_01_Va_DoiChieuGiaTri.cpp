#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL; // 1e18

struct Item {
    long long w, v;
};

// 1. 0/1 Knapsack bảng 2D kèm Truy vết các món đã chọn
void solveKnapsack2DWithTrace(int W, const vector<Item>& items) {
    int n = (int)items.size();
    vector<vector<long long>> dp(n + 1, vector<long long>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        long long wt = items[i - 1].w;
        long long val = items[i - 1].v;
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i - 1][w]; // Không chọn món i
            if (w >= wt) {
                dp[i][w] = max(dp[i][w], dp[i - 1][w - wt] + val); // Chọn món i
            }
        }
    }

    // Truy vết ngược từ hàng n về hàng 1
    vector<int> chosen;
    int curW = W;
    for (int i = n; i >= 1; i--) {
        if (dp[i][curW] != dp[i - 1][curW]) {
            chosen.push_back(i); // Món i (1-based) đã được chọn
            curW -= (int)items[i - 1].w;
        }
    }
    reverse(chosen.begin(), chosen.end());

    cout << "[2D + Trace] Max gia tri = " << dp[n][W] << " | Mon chon (1-based):";
    for (int idx : chosen) cout << ' ' << idx;
    cout << '\n';
}

// 2. 0/1 Knapsack nén 1D: BẮT BUỘC duyệt ngược w từ W về wt
long long solveKnapsack1D(int W, const vector<Item>& items) {
    vector<long long> dp(W + 1, 0);
    for (const auto& it : items) {
        for (int w = W; w >= it.w; w--) {
            dp[w] = max(dp[w], dp[w - it.w] + it.v);
        }
    }
    return dp[W];
}

// 3. Đổi chiều trạng thái (Knapsack 2): khi W cực lớn (tới 10^9) nhưng sum(v_i) nhỏ
long long solveKnapsackValueDimension(long long W, const vector<Item>& items) {
    long long sumV = 0;
    for (const auto& it : items) sumV += it.v;

    // dp[val] = tổng trọng lượng NHỎ NHẤT để đạt đúng tổng giá trị val
    vector<long long> dp(sumV + 1, INF);
    dp[0] = 0;

    for (const auto& it : items) {
        for (long long val = sumV; val >= it.v; val--) {
            if (dp[val - it.v] < INF) {
                dp[val] = min(dp[val], dp[val - it.v] + it.w);
            }
        }
    }

    long long ans = 0;
    for (long long val = sumV; val >= 0; val--) {
        if (dp[val] <= W) {
            ans = val;
            break;
        }
    }
    return ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Giải quyết trực tiếp phản ví dụ làm gãy Tham lam ở L2-05:
    // W = 10, 3 món {(6, 60), (5, 45), (5, 45)} -> Tham lam ra 60, DP 0/1 ra 90!
    int W = 10;
    vector<Item> items = {{6, 60}, {5, 45}, {5, 45}};

    solveKnapsack2DWithTrace(W, items);
    cout << "[1D Backward] Max gia tri = " << solveKnapsack1D(W, items) << '\n';

    // Thử Knapsack 2 với sức chứa W = 10^9 và trọng lượng cực lớn
    long long bigW = 1000000000LL;
    vector<Item> bigItems = {{600000000LL, 30}, {500000000LL, 25}, {500000000LL, 25}};
    cout << "[Knapsack 2] W=10^9 -> Max gia tri = "
         << solveKnapsackValueDimension(bigW, bigItems) << '\n';
    return 0;
}
