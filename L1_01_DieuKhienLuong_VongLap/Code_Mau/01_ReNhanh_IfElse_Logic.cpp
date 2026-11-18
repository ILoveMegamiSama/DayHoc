/**
 * BÀI L1-01: ĐIỀU KHIỂN LUỒNG, VÒNG LẶP & SỐ NGUYÊN LỚN
 * File mẫu 01: Rẽ Nhánh if / else if / else, Toán Tử So Sánh & Logic (&&, ||, !)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Tổ chức ngã tư quyết định if / else if / else theo đúng thứ tự từ chặt đến lỏng.
 * 2. Dùng thành thạo toán tử so sánh (==, !=, <, <=, >, >=) và logic (&&, ||, !).
 * 3. Viết điều kiện gộp đúng chuẩn C++ (a <= x && x <= b) và tránh bẫy nhầm = với ==.
 */

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ test đầu vào (stdin): 8.5 2024
    double diemThi;
    int nam;
    if (!(cin >> diemThi >> nam)) {
        return 0;
    }

    // 1. Rẽ nhánh bậc thang if / else if / else:
    //    Luôn kiểm tra từ ngưỡng cao nhất (chặt nhất) xuống thấp nhất để không bị lọt nhầm nhánh.
    cout << "=== 1. XEP LOAI HOC LUC ===" << '\n';
    if (diemThi < 0.0 || diemThi > 10.0) {
        cout << "Diem khong hop le (phai thuoc doan [0, 10])" << '\n';
    } else if (diemThi >= 8.0) {
        cout << "Xep loai: Gioi" << '\n';
    } else if (diemThi >= 6.5) {
        cout << "Xep loai: Kha" << '\n';
    } else if (diemThi >= 5.0) {
        cout << "Xep loai: Trung binh" << '\n';
    } else {
        cout << "Xep loai: Chua dat" << '\n';
    }

    // 2. Kết hợp điều kiện với && (VÀ) — CẢNH BÁO: Không viết 6.5 <= diemThi < 8.0!
    //    Trong C++, 6.5 <= diemThi trả về 0 hoặc 1 (bool), rồi so tiếp với 8.0 luôn đúng!
    bool namTrongKhoangKha = (6.5 <= diemThi && diemThi < 8.0);
    cout << "Diem nam trong [6.5, 8.0)? ";
    if (namTrongKhoangKha) {
        cout << "Co" << '\n';
    } else {
        cout << "Khong" << '\n';
    }

    // 3. Toán tử logic &&, ||, ! qua bài toán kiểm tra Năm Nhuận:
    //    Năm nhuận nếu chia hết cho 400, HOẶC (chia hết cho 4 VÀ không chia hết cho 100).
    cout << "\n=== 2. KIEM TRA NAM NHUAN ===" << '\n';
    bool laNamNhuan = (nam % 400 == 0) || (nam % 4 == 0 && nam % 100 != 0);
    if (laNamNhuan) {
        cout << "Nam " << nam << " LA nam nhuan (thang 2 co 29 ngay)." << '\n';
    } else {
        cout << "Nam " << nam << " KHONG phai nam nhuan (thang 2 co 28 ngay)." << '\n';
    }

    // 4. Toán tử phủ định ! (NOT):
    //    Ví dụ: Chỉ được vào vòng chung kết nếu điểm >= 5.0 (trong [5.0, 10.0]) và năm hợp lệ (nam > 0)
    if (!(diemThi < 5.0) && diemThi <= 10.0 && nam > 0) {
        cout << "Trang thai: Du dieu kien xet thuong." << '\n';
    } else {
        cout << "Trang thai: Chua du dieu kien xet thuong." << '\n';
    }

    return 0;
}
