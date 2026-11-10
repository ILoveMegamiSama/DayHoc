/**
 * CHUYÊN ĐỀ 00: NHẬP MÔN LẬP TRÌNH C++ (MOD-Pre)
 * File mẫu 02: Dàn Hộp Dán Nhãn Trên Kệ, Kiểu Dữ Liệu & Phép Chia Bánh Mì
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Hiểu khái niệm Biến (Variable) là những chiếc hộp dán nhãn đặt trên kệ RAM.
 * 2. Phân loại kích cỡ và tính chất từng loại hộp: int, double, std::string, char, bool.
 * 3. Hiểu bản chất phép gán (=) là hành động múc đồ bên phải bỏ vào hộp bên trái.
 * 4. Thấu hiểu hiện tượng chia nguyên (5 / 2 = 2) và cách chia đúng ra số lẻ (5.0 / 2.0 = 2.5).
 */

#include <iostream>
#include <string>

int main() {
    std::cout << "=== KHÁM PHÁ DÀN HỘP DÁN NHÃN TRONG GIAN BẾP ===" << std::endl;

    // 1. HỘP SỐ NGUYÊN (int): Đựng con số đếm nguyên vẹn chiếc
    int soLuongBanh = 10;
    std::cout << "1. Hop so nguyen (int) 'soLuongBanh' chua: " << soLuongBanh << " chiec banh." << std::endl;
    std::cout << "   -> Kich thuoc hop nay tren ban RAM la: " << sizeof(int) << " byte." << std::endl;

    // 2. HỘP SỐ LẺ (double): Đựng số có phần lẻ thập phân
    double giaTienMotChiec = 15.5; // 15.5 nghìn đồng
    std::cout << "2. Hop so le (double) 'giaTienMotChiec' chua: " << giaTienMotChiec << " nghin dong." << std::endl;
    std::cout << "   -> Kich thuoc hop nay tren ban RAM la: " << sizeof(double) << " byte." << std::endl;

    // 3. HỘP CHUỖI CHỮ (std::string): Đựng một đoạn văn bản dài
    std::string tenKhachHang = "Nguyen Van An";
    std::cout << "3. Hop chuoi chu (string) 'tenKhachHang' chua: " << tenKhachHang << std::endl;

    // 4. HỘP KÝ TỰ ĐƠN (char): Chỉ đựng đúng 1 chữ cái đặt trong nháy đơn '...'
    char sizeCocNuoc = 'L'; // Cỡ cốc lớn (Large)
    std::cout << "4. Hop ky tu (char) 'sizeCocNuoc' chua: " << sizeCocNuoc << std::endl;

    // 5. HỘP CÔNG TẮC ĐÚNG/SAI (bool): Chỉ có 2 trạng thái: true (1) hoặc false (0)
    bool conBanhKhong = true;
    std::cout << "5. Hop logic (bool) 'conBanhKhong' chua: " << conBanhKhong << " (1 = Dung, con banh)." << std::endl;

    std::cout << "\n--------------------------------------------------" << std::endl;
    std::cout << "=== THỰC NGHIỆM SỐ HỌC: BÀI TOÁN CHIA BÁNH MÌ ===" << std::endl;

    // BÀI TOÁN: Có 5 ổ bánh mì chia đều cho 2 người bạn đói bụng
    int phepChiaNguyen = 5 / 2;
    std::cout << "- Phep chia giua 2 so nguyen: 5 / 2 = " << phepChiaNguyen << std::endl;
    std::cout << "  (Giai thich: Vi hop int khong co ngan dung phan le, mau banh 0.5 bi roi mat!)" << std::endl;

    double phepChiaThuc = 5.0 / 2.0;
    std::cout << "- Phep chia voi so le (double): 5.0 / 2.0 = " << phepChiaThuc << std::endl;
    std::cout << "  (Giai thich: Hop double giu tron ven phan thap phan 2.5!)" << std::endl;

    // Phép nhân (*) tính tổng tiền 3 cái bánh:
    int mua = 3;
    double thanhTien = mua * giaTienMotChiec;
    std::cout << "\n- Tinh tien: " << mua << " chiec * " << giaTienMotChiec << " nghin = " << thanhTien << " nghin dong." << std::endl;

    return 0;
}
