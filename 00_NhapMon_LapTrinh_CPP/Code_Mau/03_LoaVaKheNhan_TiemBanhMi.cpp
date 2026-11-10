/**
 * CHUYÊN ĐỀ 00: NHẬP MÔN LẬP TRÌNH C++ (MOD-Pre)
 * File mẫu 03: Loa Phát Thanh (cout), Khe Nhận Phiếu (cin) & Ứng Dụng Tiệm Bánh Mì
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Làm chủ kênh giao tiếp 2 chiều: Loa đẩy ra (cout <<) và Khe nhận vào (cin >>).
 * 2. Phân biệt trực quan chiều mũi tên: << bắn ra loa, >> rót vào trong hộp.
 * 3. Ghép nối toàn bộ kiến thức thành một chương trình hoàn chỉnh mô phỏng Tiệm Bánh Mì.
 */

#include <iostream>
#include <string>

int main() {
    // -------------------------------------------------------------------------
    // BƯỚC 1: Chuẩn bị các chiếc hộp dán nhãn trên kệ gỗ
    // -------------------------------------------------------------------------
    std::string tenKhachHang;     // Hộp chứa tên khách
    int soLuongBanh;              // Hộp chứa số lượng bánh cần mua
    double giaMotBanh = 15.5;     // Hộp chứa đơn giá: 15.5 nghìn đồng / 1 chiếc bánh

    // -------------------------------------------------------------------------
    // BƯỚC 2: Bật loa chào khách & Mở khe trượt nhận phiếu order
    // -------------------------------------------------------------------------
    std::cout << "============================================" << std::endl;
    std::cout << "   CHAO MUNG DEN VOI TIEM BANH MI CHU THIEN " << std::endl;
    std::cout << "============================================" << std::endl;

    std::cout << "Xin moi quy khach nhap ten (nhap 1 tu viet lien, vi du: An, Nam): ";
    // Khe nhận: Mũi tên >> hút dữ liệu bàn phím rót vào hộp tenKhachHang
    std::cin >> tenKhachHang;

    std::cout << "Chao ban " << tenKhachHang << "! Ban muon mua bao nhieu chiec banh mi? ";
    // Khe nhận: Mũi tên >> hút số lượng gõ từ bàn phím rót vào hộp soLuongBanh
    std::cin >> soLuongBanh;

    // -------------------------------------------------------------------------
    // BƯỚC 3: Tính toán tiền bạc và múc kết quả vào hộp tongTien
    // (Dấu * đại diện cho phép nhân trong lập trình)
    // -------------------------------------------------------------------------
    double tongTien = soLuongBanh * giaMotBanh;

    // -------------------------------------------------------------------------
    // BƯỚC 4: Bật loa thông báo hóa đơn rõ ràng cho khách hàng
    // -------------------------------------------------------------------------
    std::cout << std::endl;
    std::cout << "--------------------------------------------" << std::endl;
    std::cout << "           HOA DON THANH TOAN               " << std::endl;
    std::cout << "--------------------------------------------" << std::endl;
    std::cout << "Khach hang     : " << tenKhachHang << std::endl;
    std::cout << "So luong banh  : " << soLuongBanh << " chiec" << std::endl;
    std::cout << "Don gia        : " << giaMotBanh << " nghin dong / chiec" << std::endl;
    std::cout << "TONG CONG      : " << tongTien << " NGHIN DONG" << std::endl;
    std::cout << "--------------------------------------------" << std::endl;
    std::cout << "Cam on quy khach da ung ho tiem banh mi!" << std::endl;
    std::cout << "Chuc ban mot ngay moi tran day nang luong!" << std::endl;

    // Báo cáo kết thúc ca làm việc thành công tốt đẹp
    return 0;
}
