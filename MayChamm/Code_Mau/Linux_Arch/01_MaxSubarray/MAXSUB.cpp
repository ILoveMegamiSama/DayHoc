#include <bits/stdc++.h>
using namespace std;

#define NAME "MAXSUB"

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    freopen(NAME ".inp", "r", stdin);
    freopen(NAME ".out", "w", stdout);

    int n;
    if (!(cin >> n)) return 0;

    long long best = -4e18, cur = 0;
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        cur = max(x, cur + x);
        best = max(best, cur);
    }
    cout << best << "\n";
    return 0;
}
