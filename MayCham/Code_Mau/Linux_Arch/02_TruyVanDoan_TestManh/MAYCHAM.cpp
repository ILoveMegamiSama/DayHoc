#include <bits/stdc++.h>
#include <cassert>
using namespace std;

/*
 * BÀI 2: QUERY - PHIÊN BẢN DÀNH CHO ARCH LINUX (./QUERY và diff -w)
 */
#ifndef BUG_QUEN_SORT
#define BUG_QUEN_SORT 0
#endif

#ifndef BUG_SAI_LR
#define BUG_SAI_LR 0
#endif

#ifndef BUG_TEST_YEU
#define BUG_TEST_YEU 0
#endif

#define NAME "QUERY"
const int NTEST = 100;

mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());

long long Rand(long long l, long long r) {
    assert(l <= r);
    return uniform_int_distribution<long long>(l, r)(rd);
}

void generate() {
    ofstream inp(NAME ".inp");
    int n = Rand(6, 12);
    int q = Rand(4, 6);
    inp << n << " " << q << "\n";

    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) {
#if BUG_TEST_YEU == 1
        a[i] = Rand(1, 1000000000LL);
#else
        a[i] = Rand(1, 5);
#endif
    }

#if BUG_QUEN_SORT == 0
    sort(a.begin() + 1, a.end());
#endif

    for (int i = 1; i <= n; i++) {
        inp << a[i] << (i == n ? "" : " ");
    }
    inp << "\n";

    for (int k = 1; k <= q; k++) {
#if BUG_SAI_LR == 1
        int l = Rand(1, n);
        int r = Rand(1, n);
#else
        int l = Rand(1, n);
        int r = Rand(l, n);
#endif
        long long x;
#if BUG_TEST_YEU == 1
        x = Rand(1, 1000000000LL);
#else
        if (Rand(0, 1) == 1 && l <= r) x = a[Rand(l, r)];
        else x = Rand(0, 6);
#endif
        inp << l << " " << r << " " << x << "\n";
    }
    inp.close();
}

void compare(int iTest) {
    if (system("diff -w " NAME ".out " NAME ".ans") != 0) {
        cout << "Test " << iTest << ": WRONG!\n";
        exit(0);
    }
    cout << "Test " << iTest << ": CORRECT!\n";
}

int main() {
    for (int iTest = 1; iTest <= NTEST; iTest++) {
        generate();
        system("./" NAME);
        system("./" NAME "_TRAU");
        compare(iTest);
    }
    return 0;
}
