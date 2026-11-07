#include <bits/stdc++.h>
using namespace std;

#define NAME "BAI1"

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Đọc từ BAI1.inp và xuất ra BAI1.ans (CHÚ Ý ĐUÔI .ans)
    freopen(NAME ".inp", "r", stdin);
    freopen(NAME ".ans", "w", stdout);

    int n;
    if (!(cin >> n)) return 0;

    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    long long sum = 0;
    for (long long x : a) sum += x;
    cout << sum << "\n";
    return 0;
}
