/**
 * BÀI L1-03: HÀM, THAM CHIẾU & BỘ NHỚ STACK / VÙNG TĨNH
 * File mẫu 03: Phạm Vi Biến, Tuổi Thọ Trên Ngăn Xếp & Ranh Giới Stack (~8MB) vs Toàn Cục (~256MB)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Phân biệt biến cục bộ (sống trên khay tạm ngăn xếp lời gọi hàm, biến mất khi return)
 *    và biến toàn cục (nằm tại vùng dữ liệu tĩnh ~256MB, tự gán = 0, mọi hàm đều truy cập được).
 * 2. Tránh bẫy che khuất biến toàn cục (Shadowing) khi đặt trùng tên biến cục bộ trong hàm.
 * 3. Đặt mảng tĩnh lớn ở toàn cục ngoài mọi hàm để tránh tràn bộ nhớ Stack (~8MB).
 */

#include <bits/stdc++.h>
using namespace std;

// VÙNG DỮ LIỆU TĨNH TOÀN CỤC (~256 MB):
// - Tự động khởi tạo bằng 0 khi bắt đầu chương trình.
// - Dùng chung cho cả main() và các hàm phụ mà không cần truyền mảng lớn qua tham số.
const int N = 1000005;
int a[N];          // ~4 MB nằm an toàn ở vùng dữ liệu tĩnh toàn cục!
long long tongChung = 0;

// CẢNH BÁO BẪY CHE KHUẤT (SHADOWING):
// Hàm này vô tình khai báo lại "long long tongChung = 0;" bên trong thân hàm ->
// che khuất biến toàn cục cùng tên! Phép cộng chỉ xảy ra trên khay tạm rồi biến mất.
void congVaoMangBiCheKhuat(int n) {
    long long tongChung = 0; // BIẾN CỤC BỘ TRÙNG TÊN: che khuất biến toàn cục!
    for (int i = 1; i <= n; i++) {
        tongChung += a[i];
    }
    cout << "[Ben trong ham bi che khuat] tongChung cuc bo = " << tongChung << '\n';
}

// CÁCH ĐÚNG 1: Sửa trực tiếp biến toàn cục (không khai báo lại tên biến đó).
void congVaoBienToanCucDung(int n) {
    tongChung = 0; // Reset trước khi cộng dồn
    for (int i = 1; i <= n; i++) {
        tongChung += a[i];
    }
}

// CÁCH ĐÚNG 2 (KHUYÊN DÙNG CHO CODE SẠCH): Dùng biến cục bộ rồi trả về kết quả (return)
// hoặc truyền tham chiếu (long long& ketQua) để hàm ít phụ thuộc ngầm vào biến toàn cục.
long long tinhTongDocLap(int n) {
    // Khai báo mảng lớn kiểu int b[3000000]; (~12 MB) Ở ĐÂY sẽ làm tràn bộ nhớ Stack (~8MB)!
    // Ngược lại, một biến tổng đơn lẻ (8 byte) nằm gọn nhẹ trên khay làm việc của hàm.
    long long tongCucBo = 0;
    for (int i = 1; i <= n; i++) {
        tongCucBo += a[i];
    }
    return tongCucBo; // Giá trị được sao chép ra ngoài trước khi khay của hàm bị dọn sạch
}

// Minh họa tuổi thọ biến cục bộ: mỗi lần gọi hàm, khay tạm được tạo mới hoàn toàn!
int demLanGoiThuNghiem(int giaTriCongThem) {
    int boDemCucBo = 0; // PHẢI tự gán = 0 vì biến cục bộ mặc định chứa giá trị rác!
    boDemCucBo += giaTriCongThem;
    return boDemCucBo;  // Ngay sau return, boDemCucBo bị xóa khỏi ngăn xếp lời gọi hàm
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ đầu vào (stdin):
    // 4
    // 10 20 30 40
    int n;
    if (!(cin >> n) || n <= 0 || n >= N) {
        return 0;
    }

    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }

    cout << "=== 1. BAY CHE KHUAT BIEN TOAN CUC (SHADOWING) ===" << '\n';
    congVaoMangBiCheKhuat(n);
    cout << "[Ngoai main()] tongChung toan cuc van bang: " << tongChung << '\n';

    congVaoBienToanCucDung(n);
    cout << "[Sau khi sua dung] tongChung toan cuc bang: " << tongChung << '\n';

    cout << "\n=== 2. HAM TINH TOAN DOC LAP & TUOI THO BIEN CUC BO ===" << '\n';
    cout << "tinhTongDocLap(n) = " << tinhTongDocLap(n) << '\n';
    cout << "Goi lan 1 demLanGoiThuNghiem(5) -> " << demLanGoiThuNghiem(5) << '\n';
    cout << "Goi lan 2 demLanGoiThuNghiem(5) -> " << demLanGoiThuNghiem(5)
         << " (khay moi tinh, khong giu gia tri 5 cu!)" << '\n';

    return 0;
}
