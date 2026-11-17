/**
 * BÀI L1-02: MẢNG 1D/2D, XÂU KÝ TỰ & MÔ PHỎNG
 * File mẫu 02: Mảng 2 Chiều (Lưới Ô Vuông) & Mảng Đếm Tần Suất (Frequency Array)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Khai báo và duyệt mảng 2 chiều toàn cục a[hang][cot], tính toán theo hàng/cột
 *    và kiểm tra 4 ô lân cận bằng mảng hướng đi dr[], dc[] kèm kiểm tra biên an toàn.
 * 2. Dùng mảng đếm tần suất toàn cục cnt[x] để thống kê số lần xuất hiện trong O(1) mỗi truy vấn.
 * 3. Nhớ reset sạch các ô đã dùng trong mảng đếm khi có nhiều bộ test.
 */

#include <bits/stdc++.h>
using namespace std;

const int MAXR = 505;
const int MAXV = 1000005;

// Bảng lưới 2D toàn cục (~505 * 505 * 4 byte ≈ 1 MB)
int grid[MAXR][MAXR];

// Mảng đếm tần suất toàn cục (~4 MB), tự khởi tạo toàn 0
int cnt[MAXV];

// 4 hướng lân cận: Lên, Xuống, Trái, Phải
const int dr[4] = {-1, 1, 0, 0};
const int dc[4] = {0, 0, -1, 1};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ đầu vào (stdin):
    // Phần A (Bảng R x C và tọa độ ô (sr, sc)):
    // 3 4 2 2
    // 1 2 3 4
    // 5 9 7 8
    // 6 0 2 1
    // Phần B (Dãy m số để đếm tần suất, giá trị trong [0, 1000000]):
    // 7
    // 5 2 5 9 2 5 1
    int r, c, sr, sc;
    if (!(cin >> r >> c >> sr >> sc)) {
        return 0;
    }
    if (r <= 0 || r >= MAXR || c <= 0 || c >= MAXR) {
        cout << "Kich thuoc bang vuot qua gioi han mang!" << '\n';
        return 0;
    }

    cout << "=== PHAN A: MANG 2 CHIEU (LUOI O VUONG) ===" << '\n';
    for (int i = 1; i <= r; i++) {
        long long tongHang = 0;
        for (int j = 1; j <= c; j++) {
            cin >> grid[i][j];
            tongHang += grid[i][j];
        }
        cout << "Tong hang " << i << ": " << tongHang << '\n';
    }

    // Quét 4 ô kề quanh (sr, sc) với kiểm tra biên nghiêm ngặt
    long long tongLanCan = 0;
    int soOThoaMan = 0;
    for (int dir = 0; dir < 4; dir++) {
        int nr = sr + dr[dir];
        int nc = sc + dc[dir];
        // PHẢI kiểm tra 1 <= nr <= r && 1 <= nc <= c TRƯỚC KHI truy cập grid[nr][nc]
        if (nr >= 1 && nr <= r && nc >= 1 && nc <= c) {
            tongLanCan += grid[nr][nc];
            soOThoaMan++;
        }
    }
    cout << "O (" << sr << ", " << sc << ") co " << soOThoaMan
         << " o ke hop le, tong cac o ke = " << tongLanCan << '\n';

    cout << "\n=== PHAN B: MANG DEM TAN SUAT (FREQUENCY ARRAY) ===" << '\n';
    int m;
    if (!(cin >> m)) {
        return 0;
    }

    int giaTriMax = 0;
    for (int i = 1; i <= m; i++) {
        int x;
        cin >> x;
        if (x >= 0 && x < MAXV) {
            cnt[x]++;
            if (x > giaTriMax) {
                giaTriMax = x;
            }
        }
    }

    int soNhieuNhat = -1;
    int tanSuatMax = 0;
    for (int val = 0; val <= giaTriMax; val++) {
        if (cnt[val] > tanSuatMax) {
            tanSuatMax = cnt[val];
            soNhieuNhat = val;
        }
    }

    cout << "Gia tri xuat hien nhieu nhat: " << soNhieuNhat
         << " (xuat hien " << tanSuatMax << " lan)" << '\n';

    // Thói quen tốt khi chạy nhiều bộ test: xóa sạch phần mảng đã dùng từ 0..giaTriMax
    for (int val = 0; val <= giaTriMax; val++) {
        cnt[val] = 0;
    }

    return 0;
}
