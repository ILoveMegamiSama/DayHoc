#include <bits/stdc++.h>
#include <cassert>
using namespace std;

/*
 * BÀI 1: MAXSUB - PHIÊN BẢN DÀNH CHO ARCH LINUX (./MAXSUB và diff -w)
 */
#define NAME "MAXSUB"
const int NTEST = 100;

mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());

long long Rand(long long l, long long r) {
    assert(l <= r);
    return uniform_int_distribution<long long>(l, r)(rd);
}

void generate() {
    ofstream inp(NAME ".inp");
    int n = Rand(5, 10);
    inp << n << "\n";
    for (int i = 1; i <= n; i++) {
        inp << Rand(-20, 20) << (i == n ? "" : " ");
    }
    inp << "\n";
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
