#include <bits/stdc++.h>
#include <cassert>
using namespace std;

/*
 * BẢN GỘP 1 FILE DUY NHẤT ĐỂ CHẠY TRỰC TIẾP TRÊN USACO IDE (QUERY)
 * ----------------------------------------------------------------
 * Thử nghiệm trực tiếp trên USACO IDE:
 * - Đổi BUG_QUEN_SORT = 1 để thấy việc quên sort mảng A khi sinh test làm hỏng Binary Search!
 * - Đổi BUG_TEST_YEU  = 1 để thấy 100% truy vấn đều ra 0!
 */
#ifndef BUG_QUEN_SORT
#define BUG_QUEN_SORT 0
#endif

#ifndef BUG_TEST_YEU
#define BUG_TEST_YEU 0
#endif

#define NAME "QUERY"
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
    int n = Rand(6, 10);
    int q = Rand(3, 5);
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

    for (int i = 1; i <= n; i++) inp << a[i] << (i == n ? "" : " ");
    inp << "\n";

    for (int k = 1; k <= q; k++) {
        int l = Rand(1, n);
        int r = Rand(l, n);
        long long x;
#if BUG_TEST_YEU == 1
        x = Rand(1, 1000000000LL);
#else
        if (Rand(0, 1) == 1) x = a[Rand(l, r)];
        else x = Rand(1, 5);
#endif
        inp << l << " " << r << " " << x << "\n";
    }
    inp.close();
}

void run_full() {
    ifstream cin_f(NAME ".inp");
    ofstream cout_f(NAME ".out");
    int n, q;
    cin_f >> n >> q;
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin_f >> a[i];
    while (q--) {
        int l, r;
        long long x;
        cin_f >> l >> r >> x;
        auto it1 = lower_bound(a.begin() + l, a.begin() + r + 1, x);
        auto it2 = upper_bound(a.begin() + l, a.begin() + r + 1, x);
        cout_f << (it2 - it1) << "\n";
    }
    cout_f.close();
}

void run_trau() {
    ifstream cin_f(NAME ".inp");
    ofstream cout_f(NAME ".ans");
    int n, q;
    cin_f >> n >> q;
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin_f >> a[i];
    while (q--) {
        int l, r;
        long long x;
        cin_f >> l >> r >> x;
        int cnt = 0;
        for (int i = l; i <= r; i++) {
            if (a[i] == x) cnt++;
        }
        cout_f << cnt << "\n";
    }
    cout_f.close();
}

void compare(int iTest) {
    ifstream f_out(NAME ".out"), f_ans(NAME ".ans");
    vector<long long> v_out, v_ans;
    long long v;
    while (f_out >> v) v_out.push_back(v);
    while (f_ans >> v) v_ans.push_back(v);

    if (v_out != v_ans) {
        cout << "Comparing files " NAME ".out and " NAME ".ANS\n";
        cout << "***** " NAME ".out\n";
        for (auto x : v_out) cout << x << " ";
        cout << "\n***** " NAME ".ANS\n";
        for (auto x : v_ans) cout << x << " ";
        cout << "\n*****\n";
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
