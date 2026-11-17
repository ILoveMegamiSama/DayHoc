/**
 * BÀI L2-06: NHẬP MÔN QUY HOẠCH ĐỘNG (DP 1D & TRUY VẾT)
 * File 01: Từ Cây Đệ Quy O(2^N) Đến Đệ Quy Có Nhớ (Top-Down Memoization)
 * Chuẩn CP C++14 (Pha 2 STL Lớp 9)
 */
#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL; // 1e18

// 1. Đệ quy ngây thơ đếm số cách leo cầu thang (bước 1 hoặc 2 bậc): O(2^N)
long long climbNaive(int n, long long& calls) {
    calls++;
    if (n <= 1) return 1;
    return climbNaive(n - 1, calls) + climbNaive(n - 2, calls);
}

// 2. Đệ quy có nhớ (Memoization): truyền vector<long long>& memo theo tham chiếu!
// Độ phức tạp giảm từ O(2^N) xuống O(N) (mỗi trạng thái 0..n chỉ tính đúng 1 lần)
long long climbMemo(int n, vector<long long>& memo, long long& calls) {
    calls++;
    if (n <= 1) return 1;
    if (memo[n] != -1) return memo[n]; // Đã ghi trong sổ nháp -> đọc ngay trong O(1)
    memo[n] = climbMemo(n - 1, memo, calls) + climbMemo(n - 2, memo, calls);
    return memo[n];
}

// 3. Giải cứu bài toán Đổi tiền {1, 3, 4} (từng làm Tham lam sai ở L2-05) bằng Memoization
// Quy ước: memo[s] == -1 (chưa tính), memo[s] == INF (đã tính nhưng vô nghiệm)
long long coinMemo(int s, const vector<int>& coins, vector<long long>& memo) {
    if (s == 0) return 0;
    if (memo[s] != -1) return memo[s];

    long long best = INF;
    for (int c : coins) {
        if (s >= c) {
            long long sub = coinMemo(s - c, coins, memo);
            if (sub != INF) {
                best = min(best, sub + 1);
            }
        }
    }
    memo[s] = best;
    return memo[s];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 25;
    long long naiveCalls = 0, memoCalls = 0;
    long long ansNaive = climbNaive(n, naiveCalls);

    vector<long long> memo(n + 1, -1);
    long long ansMemo = climbMemo(n, memo, memoCalls);

    cout << "Leo cau thang N=" << n << ": dap an = " << ansMemo << '\n';
    cout << "  So loi goi de quy ngay tho : " << naiveCalls << '\n'; // 242785
    cout << "  So loi goi de quy co nho   : " << memoCalls << '\n';  // 49
    (void)ansNaive;

    // Kiểm chứng Đổi tiền {1, 3, 4} với S = 6 (Tham lam ra 3, DP ra 2)
    int S = 6;
    vector<int> coins = {1, 3, 4};
    vector<long long> coinCache(S + 1, -1);
    long long minCoins = coinMemo(S, coins, coinCache);
    cout << "Doi tien {1, 3, 4}, S=6: so xu it nhat = "
         << (minCoins == INF ? -1 : minCoins) << '\n'; // 2

    // Kiểm tra trường hợp vô nghiệm: {2, 4} với S = 5
    vector<int> evenCoins = {2, 4};
    vector<long long> failCache(6, -1);
    long long failAns = coinMemo(5, evenCoins, failCache);
    cout << "Doi tien {2, 4}, S=5 (vo nghiem) = "
         << (failAns == INF ? -1 : failAns) << '\n'; // -1
    return 0;
}
