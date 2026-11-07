#include <bits/stdc++.h>
using namespace std;

#define NAME "MAXSUB"

// Thuật toán Trâu O(N^2): Duyệt mọi cặp đầu mút (l, r)
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    freopen(NAME ".inp", "r", stdin);
    freopen(NAME ".ans", "w", stdout);

    int n;
    if (!(cin >> n)) return 0;

    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];

    long long ans = -4e18;
    for (int l = 1; l <= n; l++) {
        long long sum = 0;
        for (int r = l; r <= n; r++) {
            sum += a[r];
            ans = max(ans, sum);
        }
    }

    cout << ans << "\n";
    return 0;
}
