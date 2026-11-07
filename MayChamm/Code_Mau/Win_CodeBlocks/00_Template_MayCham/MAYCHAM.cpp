#include <bits/stdc++.h>
#include <cassert>
using namespace std;

/*
 * TEMPLATE MÁY CHẤM CHUẨN (DÀNH CHO CODE::BLOCKS TRÊN WINDOWS)
 * ============================================================
 * Quy ước tên file:
 * - File đề bài sinh ra : BAI1.inp
 * - Kết quả thuật Full  : BAI1.out (từ BAI1.exe)
 * - Kết quả thuật Trâu  : BAI1.ans (từ BAI1_TRAU.exe)
 *
 * CÁC CÔNG TẮC THỬ NGHIỆM BUG CỦA MÁY CHẤM (0 = Chuẩn, 1 = Bật lỗi):
 */
#ifndef BUG_QUEN_CLOSE
#define BUG_QUEN_CLOSE 0      // 1: Quên gọi inp.close() cuối hàm generate()
#endif

#ifndef BUG_SEED_TRONG_HAM
#define BUG_SEED_TRONG_HAM 0  // 1: Đặt mt19937(time(0)) vào trong hàm generate()
#endif

#ifndef BUG_NGUOC_SYSTEM
#define BUG_NGUOC_SYSTEM 0    // 1: Viết nhầm if (system("fc /w ...") == 0) báo WRONG
#endif

#ifndef BUG_QUEN_EXIT
#define BUG_QUEN_EXIT 0       // 1: Quên gọi exit(0) khi gặp test WRONG
#endif

#define NAME "BAI1"
const int NTEST = 100;

// Bộ sinh số ngẫu nhiên 64-bit khởi tạo 1 lần ở toàn cục
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

#if BUG_SEED_TRONG_HAM == 1
    mt19937_64 rd_bad(time(0));
    int n = 1 + rd_bad() % 10;
    inp << n << "\n";
    for (int i = 1; i <= n; i++) {
        inp << (long long)(rd_bad() % 21) - 10 << (i == n ? "" : " ");
    }
    inp << "\n";
#else
    // Sinh ngẫu nhiên dữ liệu đề bài vào file NAME.inp
    int n = Rand(5, 10);
    inp << n << "\n";
    for (int i = 1; i <= n; i++) {
        inp << Rand(-10, 10) << (i == n ? "" : " ");
    }
    inp << "\n";
#endif

#if BUG_QUEN_CLOSE == 0
    inp.close(); // BẮT BUỘC: Đóng luồng để xả Buffer xuống ổ cứng trước khi gọi .exe
#endif
}

void compare(int iTest) {
    // system("fc /w ...") trả về 0 nếu 2 file GIỐNG NHAU, khác 0 nếu KHÁC NHAU
#if BUG_NGUOC_SYSTEM == 1
    if (system("fc /w " NAME ".out " NAME ".ans") == 0) {
#else
    if (system("fc /w " NAME ".out " NAME ".ans") != 0) {
#endif
        cout << "Test " << iTest << ": WRONG!\n";
#if BUG_QUEN_EXIT == 0
        exit(0); // Dừng toàn bộ chương trình ngay lập tức để giữ lại file .inp và dòng ***** của fc
#endif
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
