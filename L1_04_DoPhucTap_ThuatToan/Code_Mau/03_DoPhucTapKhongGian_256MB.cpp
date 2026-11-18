/**
 * BÀI L1-04: PHÂN TÍCH ĐỘ PHỨC TẠP THUẬT TOÁN (BIG-O)
 * File mẫu 03: Độ Phức Tạp Không Gian (Space Complexity) & Giới Hạn 256 MB
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Biết kích thước từng kiểu dữ liệu: bool/char (1B), int (4B), long long (8B).
 * 2. Tính nhẩm nhanh dung lượng mảng theo MB (1 MB ~ 10^6 bytes) để tránh lỗi MLE.
 * 3. Hiểu cách hạ bộ nhớ từ O(N^2) (~400 MB MLE) xuống O(N) (~0.8 MB) hoặc O(1),
 *    và tránh bẫy nối chuỗi s = s + c gây vừa TLE vừa phình bộ nhớ O(N^2).
 */

#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;

// Các mảng tĩnh toàn cục hợp lệ (cùng nằm gọn trong ngưỡng 256 MB):
bool danhDau[MAXN];   // ~100 KB  (1 byte * 100,005)
int giaTri[MAXN];     // ~400 KB  (4 bytes * 100,005)
long long pref[MAXN]; // ~800 KB  (8 bytes * 100,005)

// CẢNH BÁO MLE (không khai báo thực khi thi với N = 10^4):
// Nếu khai báo: int bang2D[10005][10005];
// Số phần tử = 10,005 * 10,005 = 100,100,025 ô
// Dung lượng  = 100,100,025 * 4 bytes ~ 400.4 MB > 256 MB -> MLE NGAY LẬP TỨC!

void inDungLuongMB(const string& tenMang, long long soByte) {
    double mbChinhXac = 1.0 * soByte / (1024.0 * 1024.0);
    double mbUocLuong = 1.0 * soByte / 1000000.0;
    cout << tenMang << ": " << soByte << " bytes (~"
         << fixed << setprecision(2) << mbChinhXac << " MiB | uoc luong nhanh ~"
         << mbUocLuong << " MB)" << '\n';
}

// Hạ độ phức tạp bộ nhớ từ O(N^2) xuống O(N) cho bài toán Tổng đoạn [l, r]:
// Thay vì tạo bảng 2 chiều tong[l][r] tốn 400 MB (MLE với N = 10^4),
// ta chỉ cần 1 mảng cộng dồn 1 chiều pref[i] = tổng a[1..i] (~0.8 MB)!
long long truyVanTongDoan(int l, int r) {
    return pref[r] - pref[l - 1];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cout << "=== DO DUNG LUONG THUC TE CUA CAC KIEU & MANG TINH ===" << '\n';
    cout << "sizeof(bool) = " << sizeof(bool) << " byte" << '\n';
    cout << "sizeof(int)  = " << sizeof(int) << " bytes" << '\n';
    cout << "sizeof(long long) = " << sizeof(long long) << " bytes" << '\n';

    inDungLuongMB("bool danhDau[100005]", sizeof(danhDau));
    inDungLuongMB("int giaTri[100005]  ", sizeof(giaTri));
    inDungLuongMB("long long pref[100005]", sizeof(pref));

    long long giaLapBang2D = 10005LL * 10005LL * (long long)sizeof(int);
    inDungLuongMB("Gia lap int bang2D[10005][10005]", giaLapBang2D);
    cout << "-> Nhan xet: Bang 2D ton ~400 MB (> 256 MB) gay MLE, con mang 1D chi ~0.8 MB!" << '\n';

    // Minh họa tính tổng đoạn [l, r] bằng mảng 1D pref (~0.8 MB) và trả lời O(1)
    int n = 5;
    int mau[6] = {0, 10, 20, 30, 40, 50};
    for (int i = 1; i <= n; i++) {
        giaTri[i] = mau[i];
        pref[i] = pref[i - 1] + giaTri[i];
    }
    cout << "Tong doan [2, 4] dung pref[4] - pref[1] = " << truyVanTongDoan(2, 4) << '\n';

    // Minh họa nối chuỗi chuẩn O(N) bằng += (tránh s = s + c tốn O(N^2) bộ nhớ tạm!)
    string ketQua = "";
    for (int i = 0; i < 6; i++) {
        ketQua += (char)('A' + i);
    }
    cout << "Noi chuoi O(N) dung += : " << ketQua << '\n';

    return 0;
}
