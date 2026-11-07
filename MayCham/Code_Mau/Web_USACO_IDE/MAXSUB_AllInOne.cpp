#include <bits/stdc++.h>
#include <cassert>
using namespace std;

/*
 * BẢN GỘP 1 FILE DUY NHẤT ĐỂ CHẠY TRỰC TIẾP TRÊN USACO IDE (MAXSUB)
 * -----------------------------------------------------------------
 * Vì USACO IDE không cho phép gọi system("MAXSUB.exe"), ta gom cả
 * generate(), solve_trau(), solve_full() và compare() vào chung 1 file,
 * vẫn đọc/ghi qua file MAXSUB.inp, MAXSUB.out, MAXSUB.ans bằng ifstream/ofstream!
 */
#ifndef BUG_KHOI_TAO_0
#define BUG_KHOI_TAO_0 0 // Đổi thành 1 để thấy máy chấm bắt được test toàn số âm!
#endif

#define NAME "MAXSUB"
const int NTEST = 20;

mt19937_64 rd(chrono::steady_clock::now().time_since_epoch().count());

// Hàm sinh số ngẫu nhiên trong đoạn [l, r] (Cú pháp chia dư dễ nhớ trong phòng thi)
long long Rand(long long l, long long r) {
    assert(l <= r);
    return l + (rd() % (r - l + 1));
    // Cú pháp mở rộng chuẩn C++ (phân phối đều tuyệt đối):
    // return uniform_int_distribution<long long>(l, r)(rd);
}

void generate() {
    ofstream inp(NAME ".inp");
    int n = Rand(5, 8);
    inp << n << "\n";
    for (int i = 1; i <= n; i++) {
        inp << Rand(-20, 10) << (i == n ? "" : " ");
    }
    inp << "\n";
    inp.close();
}

void run_full() {
    ifstream cin_f(NAME ".inp");
    ofstream cout_f(NAME ".out");
    int n;
    cin_f >> n;
#if BUG_KHOI_TAO_0 == 1
    long long best = 0;
#else
    long long best = -4e18;
#endif
    long long cur = 0;
    for (int i = 1; i <= n; i++) {
        long long x;
        cin_f >> x;
        cur = max(x, cur + x);
        best = max(best, cur);
    }
    cout_f << best << "\n";
    cout_f.close();
}

void run_trau() {
    ifstream cin_f(NAME ".inp");
    ofstream cout_f(NAME ".ans");
    int n;
    cin_f >> n;
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin_f >> a[i];
    long long ans = -4e18;
    for (int l = 1; l <= n; l++) {
        long long sum = 0;
        for (int r = l; r <= n; r++) {
            sum += a[r];
            ans = max(ans, sum);
        }
    }
    cout_f << ans << "\n";
    cout_f.close();
}

void compare(int iTest) {
    ifstream f_out(NAME ".out"), f_ans(NAME ".ans");
    long long v_out, v_ans;
    f_out >> v_out;
    f_ans >> v_ans;
    if (v_out != v_ans) {
        cout << "Comparing files " NAME ".out and " NAME ".ANS\n";
        cout << "***** " NAME ".out\n" << v_out << "\n";
        cout << "***** " NAME ".ANS\n" << v_ans << "\n*****\n";
        cout << "Test " << iTest << ": WRONG!\n";
        cout << "\n--- Noi dung file " NAME ".inp gay loi ---\n";
        ifstream f_inp(NAME ".inp");
        cout << f_inp.rdbuf();
        exit(0);
    }
    cout << "Test " << iTest << ": CORRECT!\n";
}

int main() {
    for (int iTest = 1; iTest <= NTEST; iTest++) {
        generate();
        run_full();
        run_trau();
        compare(iTest);
    }
    return 0;
}
