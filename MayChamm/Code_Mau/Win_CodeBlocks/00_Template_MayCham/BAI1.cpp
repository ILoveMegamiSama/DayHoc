#include <bits/stdc++.h>
using namespace std;

#define NAME "BAI1"

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Đọc từ BAI1.inp và xuất ra BAI1.out
    freopen(NAME ".inp", "r", stdin);
    freopen(NAME ".out", "w", stdout);

    int n;
    if (!(cin >> n)) return 0;

    long long sum = 0;
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        sum += x;
    }
    cout << sum << "\n";
    return 0;
}
