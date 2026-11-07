#include <bits/stdc++.h>
using namespace std;

/*
 * DEMO 02: TẠI SAO KHÔNG ĐẶT SEED time(0) BÊN TRONG HÀM generate()?
 * -----------------------------------------------------------------
 * Có thể copy chạy trực tiếp trên USACO IDE hoặc Code::Blocks.
 * - Khi BUG_SEED_TRONG_HAM = 1: Khởi tạo mt19937 với time(0) bên trong hàm.
 *   Vì time(0) chỉ nhảy số mỗi 1 GIÂY, còn máy tính chạy 5 test chỉ mất 0.001 giây,
 *   nên cả 5 test nhận cùng 1 hạt giống (Seed) -> Sinh ra 5 dãy số GIỐNG HỆT NHAU!
 * - Khi BUG_SEED_TRONG_HAM = 0: Khởi tạo mt19937_64 toàn cục (Global) với steady_clock.
 */
#ifndef BUG_SEED_TRONG_HAM
#define BUG_SEED_TRONG_HAM 1 // Mặc định để 1 cho học sinh thấy ngay 5 test trùng nhau!
#endif

// CHUẨN: Khai báo bộ sinh số ngẫu nhiên ở TOÀN CỤC (ngoài mọi hàm)
mt19937_64 rd_global(chrono::steady_clock::now().time_since_epoch().count());

void generate_demo(int iTest) {
    cout << "Test " << iTest << ": ";

#if BUG_SEED_TRONG_HAM == 1
    // LỖI KINH ĐIỂN: Mỗi lần gọi hàm lại tạo mới mt19937 với time(0) (tính theo giây)
    mt19937_64 rd_local(time(0));
    for (int i = 1; i <= 5; i++) {
        cout << (1 + rd_local() % 100) << " ";
    }
#else
    // CHUẨN: Dùng chung bộ sinh rd_global đã gieo hạt giống từ đầu chương trình
    for (int i = 1; i <= 5; i++) {
        cout << (1 + rd_global() % 100) << " ";
    }
#endif
    cout << "\n";
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

#if BUG_SEED_TRONG_HAM == 1
    cout << "=== CHE DO LOI: Khai bao mt19937(time(0)) ben trong ham generate() ===\n";
#else
    cout << "=== CHE DO CHUAN: Khai bao mt19937_64 toan cuc voi steady_clock ===\n";
#endif

    for (int iTest = 1; iTest <= 5; iTest++) {
        generate_demo(iTest);
    }
    return 0;
}
