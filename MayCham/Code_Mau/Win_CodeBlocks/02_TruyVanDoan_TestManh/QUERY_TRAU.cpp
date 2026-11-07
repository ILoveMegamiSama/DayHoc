#include <bits/stdc++.h>
using namespace std;

#define NAME "QUERY"

// Thuật toán Trâu O(N * Q): Duyệt trực tiếp từ L đến R để đếm
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    freopen(NAME ".inp", "r", stdin);
    freopen(NAME ".ans", "w", stdout);

    int n, q;
    if (!(cin >> n >> q)) return 0;

    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];

    while (q--) {
        int l, r;
        long long x;
        cin >> l >> r >> x;
        int cnt = 0;
        for (int i = l; i <= r; i++) {
            if (a[i] == x) cnt++;
        }
        cout << cnt << "\n";
    }
    return 0;
}
