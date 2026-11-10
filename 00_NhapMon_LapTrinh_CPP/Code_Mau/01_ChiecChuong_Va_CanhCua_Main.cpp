/**
 * CHUYÊN ĐỀ 00: NHẬP MÔN LẬP TRÌNH C++ (MOD-Pre)
 * File mẫu 01: Cánh Cửa Chính, Tiếng Chuông Dứt Lệnh & Lời Chào Thế Giới
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Hiểu bản chất hàm main() là Cánh Cửa Chính bước vào ca làm việc.
 * 2. Hiểu vì sao mỗi câu lệnh bắt buộc phải kết thúc bằng tiếng chuông (dấu chấm phẩy ;).
 * 3. Làm quen với Loa phát thanh std::cout và lệnh xuống dòng std::endl.
 * 4. Hiểu ý nghĩa của câu lệnh báo cáo hoàn thành ca làm an toàn: return 0;
 */

// Dấu # báo hiệu: Hãy mượn bộ đồ nghề "Loa và Khe Nhận" (<iostream>) trước khi mở tiệm!
#include <iostream>

// Cánh Cửa Chính bước vào Ca Sáng của chương trình.
// Chữ "int" báo trước: khi đóng cửa phòng, anh phụ bếp sẽ báo cáo một con số nguyên (số 0).
int main() {
    // std::cout: Chiếc loa phát thanh chuẩn quốc tế hướng ra màn hình console.
    // Mũi tên <<: Đẩy dòng chữ từ trong tiệm bắn thẳng vào miệng loa để phát ra ngoài.
    // Dấu chấm phẩy (;): Tiếng chuông "Reng!" báo dứt khoát đã xong câu dặn dò thứ nhất!
    std::cout << "=== TIEM BANH MI CHU THIEN XIN CHAO! ===" << std::endl;

    std::cout << "Toi la Anh That Tha - nguoi phu viec cham chi cua ban." << std::endl;
    std::cout << "Moi chi thi cua ban deu duoc toi thuc hien chinh xac tung chu!" << std::endl;

    // std::endl (End Line): Dặn loa xuống dòng để câu tiếp theo in ở hàng mới.
    std::cout << "Hom nay troi that dep de hoc lap trinh C++!" << std::endl;

    // return 0: Báo cáo với hệ điều hành máy tính:
    // "Ca lam viec da hoan thanh xuat sac, khong gap bat ky tai nan hay do vo nao (ma loi: 0)."
    return 0;
}
