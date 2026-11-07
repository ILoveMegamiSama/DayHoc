#include <bits/stdc++.h>
#include <cassert>
using namespace std;

/*
 * BÀI 2: TRUY VẤN ĐẾM PHẦN TỬ X TRÊN ĐOẠN [L, R] CỦA MẢNG TĂNG DẦN (QUERY)
 * =======================================================================
 * Đề bài:
 * - Cho mảng A gồm N số nguyên ĐÃ SẮP XẾP TĂNG DẦN (A[1] <= A[2] <= ... <= A[N]).
 * - Cho Q truy vấn, mỗi truy vấn gồm 3 số nguyên L, R, X (1 <= L <= R <= N).
 * - Đếm xem giá trị X xuất hiện bao nhiêu lần trong đoạn từ A[L] đến A[R].
 *
 * CÁC CÔNG TẮC MINH HỌA LỖI SINH TEST & ĐỘ MẠNH CỦA TEST:
 * - BUG_QUEN_SORT = 1 : Quên sort mảng A khi sinh test -> Vi phạm đề bài, làm Binary Search chạy sai!
 * - BUG_SAI_LR    = 1 : Sinh L, R độc lập làm xuất hiện L > R -> Test lỗi cấu trúc!
 * - BUG_TEST_YEU  = 1 : Sinh A[i] và X trong đoạn [1, 10^9] độc lập -> 100% đáp án ra 0 (Test quá yếu)!
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

// Hàm sinh số ngẫu nhiên trong đoạn [l, r] (Cú pháp chia dư dễ nhớ trong phòng thi)
long long Rand(long long l, long long r) {
    assert(l <= r);
    return l + (rd() % (r - l + 1));
    // Cú pháp mở rộng chuẩn C++ (phân phối đều tuyệt đối):
    // return uniform_int_distribution<long long>(l, r)(rd);
}

void generate() {
    ofstream inp(NAME ".inp");
    int n = Rand(6, 12);
    int q = Rand(4, 6);
    inp << n << " " << q << "\n";

    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) {
#if BUG_TEST_YEU == 1
        // TEST YẾU: Miền giá trị quá rộng [1, 10^9] làm xác suất trùng bằng 0
        a[i] = Rand(1, 1000000000LL);
#else
        // TEST MẠNH (Kỹ thuật 1): Thu hẹp miền giá trị [1, 5] để tạo nhiều phần tử trùng nhau
        a[i] = Rand(1, 5);
#endif
    }

#if BUG_QUEN_SORT == 0
    // BẮT BUỘC: Đề bài cho mảng tăng dần nên máy chấm phải sort trước khi in!
    sort(a.begin() + 1, a.end());
#endif

    for (int i = 1; i <= n; i++) {
        inp << a[i] << (i == n ? "" : " ");
    }
    inp << "\n";

    for (int k = 1; k <= q; k++) {
#if BUG_SAI_LR == 1
        // LỖI CẤU TRÚC TEST: Sinh L và R độc lập có thể gây ra L > R!
        int l = Rand(1, n);
        int r = Rand(1, n);
#else
        // CHUẨN: Sinh L trước, sau đó sinh R trong đoạn [L, n] (hoặc dùng swap)
        int l = Rand(1, n);
        int r = Rand(l, n);
#endif

        long long x;
#if BUG_TEST_YEU == 1
        x = Rand(1, 1000000000LL);
#else
        // TEST MẠNH (Kỹ thuật 2): 50% lấy thẳng 1 phần tử có thật trong đoạn, 50% sinh tự do
        if (Rand(0, 1) == 1 && l <= r) {
            x = a[Rand(l, r)];
        } else {
            x = Rand(0, 6);
        }
#endif
        inp << l << " " << r << " " << x << "\n";
    }

    inp.close();
}

void compare(int iTest) {
    if (system("fc /w " NAME ".out " NAME ".ans") != 0) {
        cout << "Test " << iTest << ": WRONG!\n";
        exit(0);
    }
    cout << "Test " << iTest << ": CORRECT!\n";
}

int main() {
    for (int iTest = 1; iTest <= NTEST; iTest++) {
        generate();
        system(NAME ".exe");
        system(NAME "_TRAU.exe");
        compare(iTest);
    }
    return 0;
}
