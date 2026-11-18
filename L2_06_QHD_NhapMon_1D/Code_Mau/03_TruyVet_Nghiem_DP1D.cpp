/**
 * BÀI L2-06: NHẬP MÔN QUY HOẠCH ĐỘNG (DP 1D & TRUY VẾT)
 * File 03: Truy Vết Nghiệm (trace[] & Lần Ngược Từ Đích) Cho Frog 1, Đổi Tiền Và Không Kề Nhau
 * Chuẩn CP C++14 (Pha 2 STL Lớp 9)
 */
#include <bits/stdc++.h>
using namespace std;

const long long INF = 1000000000000000000LL;

// 1. Frog 1 + Truy vết lộ trình các hòn đá đã nhảy
void solveFrogWithTrace(const vector<long long>& h) {
    int n = (int)h.size() - 1;
    vector<long long> dp(n + 1, INF);
    vector<int> trace(n + 1, -1); // Sentinel -1: điểm xuất phát

    dp[1] = 0;
    for (int i = 2; i <= n; i++) {
        long long c1 = dp[i - 1] + abs(h[i] - h[i - 1]);
        if (c1 < dp[i]) {
            dp[i] = c1;
            trace[i] = i - 1; // Chỉ ghi trace[i] khi cập nhật được kỷ lục tốt hơn!
        }
        if (i >= 3) {
            long long c2 = dp[i - 2] + abs(h[i] - h[i - 2]);
            if (c2 < dp[i]) {
                dp[i] = c2;
                trace[i] = i - 2;
            }
        }
    }

    vector<int> path;
    for (int cur = n; cur != -1; cur = trace[cur]) {
        path.push_back(cur);
    }
    reverse(path.begin(), path.end());

    cout << "Frog 1 min cost = " << dp[n] << ", path =";
    for (int x : path) cout << ' ' << x;
    cout << '\n';
}

// 2. Đổi tiền Min + Truy vết chính xác các đồng xu đã chọn
void solveCoinsWithTrace(int S, const vector<int>& coins) {
    vector<long long> dp(S + 1, INF);
    vector<int> choice(S + 1, -1); // Lưu mệnh giá đồng xu vừa dùng để đạt tổng s

    dp[0] = 0;
    for (int s = 1; s <= S; s++) {
        for (int c : coins) {
            if (s >= c && dp[s - c] != INF && dp[s - c] + 1 < dp[s]) {
                dp[s] = dp[s - c] + 1;
                choice[s] = c;
            }
        }
    }

    if (dp[S] == INF) {
        cout << "Khong doi duoc tong " << S << '\n';
        return;
    }

    vector<int> used;
    int cur = S;
    while (cur > 0) {
        used.push_back(choice[cur]);
        cur -= choice[cur];
    }
    reverse(used.begin(), used.end());

    cout << "Doi S=" << S << " ton " << dp[S] << " xu:";
    for (int c : used) cout << ' ' << c;
    cout << '\n';
}

// 3. Truy vết không cần mảng trace[] riêng cho bài toán Chọn Không Kề Nhau
void solveNonAdjacentOnTheFly(const vector<long long>& a) {
    int n = (int)a.size() - 1;
    vector<long long> dp(n + 1, 0);
    if (n >= 1) dp[1] = max(0LL, a[1]);
    for (int i = 2; i <= n; i++) {
        dp[i] = max(dp[i - 1], dp[i - 2] + a[i]);
    }

    vector<int> chosenIdx;
    int i = n;
    while (i >= 1) {
        if (i == 1) {
            if (dp[1] > 0) chosenIdx.push_back(1);
            break;
        }
        if (dp[i] == dp[i - 1]) {
            i--; // Đã bỏ nhà i
        } else {
            chosenIdx.push_back(i); // Đã chọn nhà i -> lùi 2 bước
            i -= 2;
        }
    }
    reverse(chosenIdx.begin(), chosenIdx.end());

    cout << "Khong ke nhau max = " << dp[n] << ", chon vi tri:";
    for (int idx : chosenIdx) cout << ' ' << idx;
    cout << '\n';
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    solveFrogWithTrace({0, 10, 25, 45, 20});       // cost=20, path: 1 2 4
    solveCoinsWithTrace(6, {1, 3, 4});             // 2 xu: 3 3
    solveNonAdjacentOnTheFly({0, 3, 10, 3, 1, 2}); // max=12, chon vi tri: 2 5
    return 0;
}
