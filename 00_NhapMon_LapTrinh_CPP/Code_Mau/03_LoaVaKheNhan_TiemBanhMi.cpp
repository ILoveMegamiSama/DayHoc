/**
 * CHUYÊN ĐỀ 00: NHẬP MÔN LẬP TRÌNH C++ (MOD-Pre)
 * File mẫu 03: Loa Phát Thanh (cout), Khe Nhận Phiếu (cin) & Ứng Dụng Tiệm Bánh Mì
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Làm chủ kênh giao tiếp 2 chiều: Loa đẩy ra (cout <<) và Khe nhận vào (cin >>).
 * 2. Phân biệt trực quan chiều mũi tên: << bắn ra loa, >> rót vào trong hộp.
 * 3. Ghép nối toàn bộ kiến thức thành một chương trình hoàn chỉnh mô phỏng Tiệm Bánh Mì.
 * (Ghi chú: Ở bài nhập môn này ta giữ nhập xuất nhẹ nhàng chưa bật Fast I/O;
 *  Chương Phụ MOD-CP0 ngay sau đây sẽ giải thích chi tiết ios_base::sync_with_stdio(false);)
 */

#include <bits/stdc++.h>
using namespace std;

int main() {
    // -------------------------------------------------------------------------
    // BƯỚC 1: Chuẩn bị các chiếc hộp dán nhãn trên kệ gỗ
    // -------------------------------------------------------------------------
    string tenKhachHang;          // Hộp chứa tên khách
    int soLuongBanh;              // Hộp chứa số lượng bánh cần mua
    double giaMotBanh = 15.5;     // Hộp chứa đơn giá: 15.5 nghìn đồng / 1 chiếc bánh

    // -------------------------------------------------------------------------
    // BƯỚC 2: Bật loa chào khách & Mở khe trượt nhận phiếu order
    // -------------------------------------------------------------------------
    cout << "============================================" << endl;
    cout << "   CHAO MUNG DEN VOI TIEM BANH MI CHU THIEN " << endl;
    cout << "============================================" << endl;

    cout << "Xin moi quy khach nhap ten (nhap 1 tu viet lien, vi du: An, Nam): ";
    // Khe nhận: Mũi tên >> hút dữ liệu bàn phím rót vào hộp tenKhachHang
    cin >> tenKhachHang;

    cout << "Chao ban " << tenKhachHang << "! Ban muon mua bao nhieu chiec banh mi? ";
    // Khe nhận: Mũi tên >> hút số lượng gõ từ bàn phím rót vào hộp soLuongBanh
    cin >> soLuongBanh;

    // -------------------------------------------------------------------------
    // BƯỚC 3: Tính toán tiền bạc và múc kết quả vào hộp tongTien
    // (Dấu * đại diện cho phép nhân trong lập trình)
    // -------------------------------------------------------------------------
    double tongTien = soLuongBanh * giaMotBanh;

    // -------------------------------------------------------------------------
    // BƯỚC 4: Bật loa thông báo hóa đơn rõ ràng cho khách hàng
    // -------------------------------------------------------------------------
    cout << endl;
    cout << "--------------------------------------------" << endl;
    cout << "           HOA DON THANH TOAN               " << endl;
    cout << "--------------------------------------------" << endl;
    cout << "Khach hang     : " << tenKhachHang << endl;
    cout << "So luong banh  : " << soLuongBanh << " chiec" << endl;
    cout << "Don gia        : " << giaMotBanh << " nghin dong / chiec" << endl;
    cout << "TONG CONG      : " << tongTien << " NGHIN DONG" << endl;
    cout << "--------------------------------------------" << endl;
    cout << "Cam on quy khach da ung ho tiem banh mi!" << endl;
    cout << "Chuc ban mot ngay moi tran day nang luong!" << endl;

    // Báo cáo kết thúc ca làm việc thành công tốt đẹp
    return 0;
}
