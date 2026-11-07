#include <bits/stdc++.h>
using namespace std;

#define NAME "QUERY"

// Thuật toán Full O(Q * log N): Dùng chặt nhị phân (lower_bound / upper_bound)
// vì mảng A đã được sắp xếp tăng dần theo đề bài.
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    freopen(NAME ".inp", "r", stdin);
    freopen(NAME ".out", "w", stdout);

    int n, q;
    if (!(cin >> n >> q)) return 0;

    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];

    while (q--) {
        int l, r;
        long long x;
        cin >> l >> r >> x;
        auto it1 = lower_bound(a.begin() + l, a.begin() + r + 1, x);
        auto it2 = upper_bound(a.begin() + l, a.begin() + r + 1, x);
        cout << (it2 - it1) << "\n";
    }
    return 0;
}
