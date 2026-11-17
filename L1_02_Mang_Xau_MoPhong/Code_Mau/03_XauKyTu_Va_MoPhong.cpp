/**
 * BÀI L1-02: MẢNG 1D/2D, XÂU KÝ TỰ & MÔ PHỎNG
 * File mẫu 03: Xâu Ký Tự (std::string), Mã ASCII, getline & Tư Duy Mô Phỏng (Simulation)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Đọc xâu có khoảng trắng bằng getline(cin, s) sau cin >> n mà không bị trôi dòng (cin.ignore()).
 * 2. Duyệt từng ký tự s[i], chuẩn hóa hoa/thường và đếm tần suất 26 chữ cái qua mã ASCII.
 * 3. Cài đặt bài toán Mô phỏng (Simulation) từng bước (đổi chỗ hàng đợi 'B'/'G')
 *    và Chia trường hợp (Casework) hướng đi trên lưới sạch sẽ.
 */

#include <bits/stdc++.h>
using namespace std;

int demChu[26]; // Toàn cục: tự khởi tạo 26 ô đếm 'a'..'z' đều bằng 0

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ đầu vào (stdin):
    // 1
    // Nguyen Van An 2026
    // 5 1
    // BGGBG
    // RDRU
    int soDong;
    if (!(cin >> soDong)) {
        return 0;
    }
    // BẮT BUỘC: Xóa dấu Enter '\n' còn sót trong bộ đệm sau lệnh cin >> soDong
    cin.ignore();

    cout << "=== 1. DOC DONG CO DAU CACH & THONG KE ASCII ===" << '\n';
    for (int dong = 1; dong <= soDong; dong++) {
        string hoTen;
        getline(cin, hoTen);

        int soChuSo = 0;
        for (int i = 0; i < (int)hoTen.size(); i++) {
            char c = hoTen[i];
            if (c >= '0' && c <= '9') {
                soChuSo++;
            } else if (c >= 'A' && c <= 'Z') {
                // Chuyển chữ hoa thành chữ thường bằng khoảng cách mã ASCII
                char thuong = c - 'A' + 'a';
                hoTen[i] = thuong;
                demChu[thuong - 'a']++;
            } else if (c >= 'a' && c <= 'z') {
                demChu[c - 'a']++;
            }
        }
        cout << "Dong " << dong << " (thuong): " << hoTen
             << " | So chu so: " << soChuSo << '\n';
    }

    cout << "Tan suat chu cai xuat hien:" << '\n';
    for (int c = 0; c < 26; c++) {
        if (demChu[c] > 0) {
            cout << "  '" << (char)('a' + c) << "': " << demChu[c] << '\n';
        }
    }

    cout << "\n=== 2. MO PHONG HANG DOI 'BG' -> 'GB' QUA T GIAY ===" << '\n';
    int n, t;
    string hang;
    if (!(cin >> n >> t >> hang)) {
        return 0;
    }

    for (int giay = 1; giay <= t; giay++) {
        for (int i = 0; i + 1 < (int)hang.size(); i++) {
            if (hang[i] == 'B' && hang[i + 1] == 'G') {
                // Hoán đổi thủ công bằng biến tạm (Pha 1 rõ ràng từng bước)
                char tam = hang[i];
                hang[i] = hang[i + 1];
                hang[i + 1] = tam;
                // QUAN TRỌNG: Nhảy qua vị trí i + 1 để bạn 'B' vừa đổi không đổi tiếp ngay trong cùng 1 giây!
                i++;
            }
        }
    }
    cout << "Hang sau " << t << " giay: " << hang << '\n';

    cout << "\n=== 3. MO PHONG & CHIA TRUONG HOP (CASEWORK) ROBOT TREN LUOI 3x3 ===" << '\n';
    string lenh;
    if (!(cin >> lenh)) {
        return 0;
    }
    int x = 1, y = 1; // Bắt đầu tại góc (1, 1) của lưới [1..3] x [1..3]
    for (int i = 0; i < (int)lenh.size(); i++) {
        char buoc = lenh[i];
        int nx = x, ny = y;
        if (buoc == 'U') {
            nx = x - 1;
        } else if (buoc == 'D') {
            nx = x + 1;
        } else if (buoc == 'L') {
            ny = y - 1;
        } else if (buoc == 'R') {
            ny = y + 1;
        }

        // Chỉ cập nhật tọa độ nếu bước đi vẫn nằm gọn trong lưới [1..3] x [1..3]
        if (nx >= 1 && nx <= 3 && ny >= 1 && ny <= 3) {
            x = nx;
            y = ny;
        }
    }
    cout << "Vi tri cuoi cua robot: (" << x << ", " << y << ")" << '\n';

    return 0;
}
