#include <bits/stdc++.h>
using namespace std;

#define NAME "MAXSUB"

/*
 * Thuật toán Full O(N) - Kadane
 * (Có công tắc BUG_KHOI_TAO_0: nếu đổi thành 1 sẽ bị sai khi mảng toàn số âm)
 */
#ifndef BUG_KHOI_TAO_0
#define BUG_KHOI_TAO_0 0
#endif

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    freopen(NAME ".inp", "r", stdin);
    freopen(NAME ".out", "w", stdout);

    int n;
    if (!(cin >> n)) return 0;

#if BUG_KHOI_TAO_0 == 1
    long long best = 0; // LỖI: Nếu cả mảng đều âm, đáp án phải là số âm lớn nhất chứ không phải 0
#else
    long long best = -4e18;
#endif
    long long cur = 0;

    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        cur = max(x, cur + x);
        best = max(best, cur);
    }

    cout << best << "\n";
    return 0;
}
