/**
 * CHUYÊN ĐỀ 00: NHẬP MÔN LẬP TRÌNH C++ (MOD-Pre)
 * File mẫu 01: Cánh Cửa Chính, Tiếng Chuông Dứt Lệnh & Lời Chào Thế Giới
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Hiểu bản chất hàm main() là Cánh Cửa Chính bước vào ca làm việc.
 * 2. Hiểu vì sao mỗi câu lệnh bắt buộc phải kết thúc bằng tiếng chuông (dấu chấm phẩy ;).
 * 3. Làm quen với tủ đồ nghề đa năng #include <bits/stdc++.h>, xưởng chung std và loa phát thanh cout / endl.
 * 4. Hiểu ý nghĩa của câu lệnh báo cáo hoàn thành ca làm an toàn: return 0;
 * (Lưu ý: Khi bước vào bài thi tốc độ cao, Chương Phụ MOD-CP0 sẽ hướng dẫn thêm bộ tăng tốc Fast I/O.)
 */

// Dấu # báo hiệu: Mở "tủ đồ nghề đa năng" (<bits/stdc++.h>) trước khi mở tiệm!
// Một dòng duy nhất này đã gói sẵn loa-khe (iostream), chữ viết (string), toán học...
#include <bits/stdc++.h>

// Mở "xưởng chung std" để dùng thẳng cout, endl mà không cần gõ tiền tố "std::" lặp lại
using namespace std;

// Cánh Cửa Chính bước vào Ca Sáng của chương trình.
// Chữ "int" báo trước: khi đóng cửa phòng, anh phụ bếp sẽ báo cáo một con số nguyên (số 0).
int main() {
    // cout: Chiếc loa phát thanh trong xưởng chung std hướng ra màn hình console.
    // Mũi tên <<: Đẩy dòng chữ từ trong tiệm bắn thẳng vào miệng loa để phát ra ngoài.
    // Dấu chấm phẩy (;): Tiếng chuông "Reng!" báo dứt khoát đã xong câu dặn dò thứ nhất!
    cout << "=== TIEM BANH MI CHU THIEN XIN CHAO! ===" << endl;

    cout << "Toi la Anh That Tha - nguoi phu viec cham chi cua ban." << endl;
    cout << "Moi chi thi cua ban deu duoc toi thuc hien chinh xac tung chu!" << endl;

    // endl (End Line): Dặn loa xuống dòng để câu tiếp theo in ở hàng mới.
    cout << "Hom nay troi that dep de hoc lap trinh C++!" << endl;

    // return 0: Báo cáo với hệ điều hành máy tính:
    // "Ca lam viec da hoan thanh xuat sac, khong gap bat ky tai nan hay do vo nao (ma loi: 0)."
    return 0;
}
