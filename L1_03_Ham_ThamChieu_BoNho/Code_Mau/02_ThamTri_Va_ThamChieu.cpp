/**
 * BÀI L1-03: HÀM, THAM CHIẾU & BỘ NHỚ STACK / VÙNG TĨNH
 * File mẫu 02: Truyền Tham Trị (Bản Sao) vs Truyền Tham Chiếu & (Bản Gốc)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Hiểu vì sao truyền tham trị (int x) chỉ tạo bản sao photo -> không đổi được biến gốc ngoài main().
 * 2. Dùng truyền tham chiếu (int& x, long long& x) để chỉnh sửa trực tiếp biến gốc ngoài hàm.
 * 3. Kết hợp tham chiếu & với kiểu trả về bool/void để cập nhật nhiều biến (hoán đổi, min/max) gọn gàng.
 */

#include <bits/stdc++.h>
using namespace std;

// 1. TRUYỀN THAM TRỊ (sai khi muốn đổi biến gốc):
// x và y chỉ là BẢN SAO PHOTO của hai biến ngoài main().
void hoanDoiSai(long long x, long long y) {
    long long tam = x;
    x = y;
    y = tam;
    // Khi kết thúc hàm, bản sao x và y biến mất; biến gốc ngoài main() không hề nhúc nhích!
}

// 2. TRUYỀN THAM CHIẾU (&) (đúng chuẩn khi muốn sửa biến gốc):
// Dấu '&' biến x và y thành tên gọi khác trỏ thẳng vào ô nhớ gốc ngoài main().
void hoanDoiDung(long long& x, long long& y) {
    long long tam = x;
    x = y;
    y = tam;
}

// 3. SẮP XẾP 2 BIẾN TĂNG DẦN BẰNG THAM CHIẾU:
// Nếu a > b thì tự động đổi chỗ để luôn đảm bảo a <= b.
void xepTangHaiSo(long long& a, long long& b) {
    if (a > b) {
        hoanDoiDung(a, b);
    }
}

// 4. VỪA TRẢ VỀ BOOL VỪA CẬP NHẬT CẢ 2 BIẾN KỶ LỤC MIN VÀ MAX BẰNG '&':
// (Vì lệnh return chỉ trả về được 1 giá trị, tham chiếu '&' giúp trả về nhiều thay đổi cùng lúc!)
bool capNhatKyLuc(long long& thapNhat, long long& caoNhat, long long diemMoi) {
    bool phaKyLuc = false;
    if (diemMoi < thapNhat) {
        thapNhat = diemMoi;
        phaKyLuc = true;
    }
    if (diemMoi > caoNhat) {
        caoNhat = diemMoi;
        phaKyLuc = true;
    }
    return phaKyLuc;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ đầu vào (stdin):
    // 50 20
    // 5
    // 100 120 90 120 150
    long long u, v;
    if (!(cin >> u >> v)) {
        return 0;
    }

    cout << "=== 1. SO SANH THAM TRI VS THAM CHIEU (&) ===" << '\n';
    cout << "Ban dau: u = " << u << ", v = " << v << '\n';

    hoanDoiSai(u, v);
    cout << "Sau hoanDoiSai(u, v): u = " << u << ", v = " << v << " (KHONG DOI!)" << '\n';

    hoanDoiDung(u, v);
    cout << "Sau hoanDoiDung(u, v): u = " << u << ", v = " << v << " (DA DOI THANH CONG!)" << '\n';

    xepTangHaiSo(u, v);
    cout << "Sau xepTangHaiSo(u, v): (" << u << ", " << v << ")" << '\n';

    cout << "\n=== 2. CAP NHAT DONG THOI MIN & MAX BANG THAM CHIEU (&) ===" << '\n';
    int n;
    if (!(cin >> n) || n <= 0) {
        return 0;
    }

    long long diemDau;
    cin >> diemDau;
    long long minDiem = diemDau;
    long long maxDiem = diemDau;
    int soLanPhaKyLuc = 0;

    for (int i = 2; i <= n; i++) {
        long long d;
        cin >> d;
        if (capNhatKyLuc(minDiem, maxDiem, d)) {
            soLanPhaKyLuc++;
        }
    }

    cout << "Diem thap nhat: " << minDiem << '\n';
    cout << "Diem cao nhat: " << maxDiem << '\n';
    cout << "So lan pha ky luc (nhu CF 155A): " << soLanPhaKyLuc << '\n';

    return 0;
}
