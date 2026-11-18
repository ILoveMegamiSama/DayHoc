/**
 * BÀI L1-02: MẢNG 1D/2D, XÂU KÝ TỰ & MÔ PHỎNG
 * File mẫu 01: Mảng Tĩnh 1 Chiều Toàn Cục & An Toàn Biên Mảng (Out of Bounds)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Khai báo mảng tĩnh toàn cục (const int N = 1e6 + 5; int a[N];) bên ngoài main()
 *    để dùng vùng nhớ dữ liệu tĩnh rộng ~256MB (tránh sập bộ nhớ ngăn xếp ~8MB trong main()).
 * 2. Thành thạo đánh chỉ số 0-based (0..n-1) và 1-based (1..n), đọc và duyệt xuôi/ngược.
 * 3. Tránh bẫy truy cập ngoài biên (Out of Bounds) khi so sánh phần tử kề a[i + 1].
 */

#include <bits/stdc++.h>
using namespace std;

// ĐẶT TOÀN CỤC NGOÀI main():
// - Dùng vùng dữ liệu tĩnh (~256MB), chứa thoải mái 10^6 phần tử (~4MB).
// - Mọi phần tử được hệ thống tự động khởi tạo sẵn bằng 0 trước khi vào main().
const int N = 1e6 + 5;
int a[N];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ đầu vào (stdin):
    // 6
    // 4 8 6 10 5 9
    int n;
    if (!(cin >> n)) {
        return 0;
    }

    // Kiểm tra giới hạn hợp lệ để không vượt quá kích thước tủ mảng a[N]
    if (n <= 0 || n >= N) {
        cout << "So phan tu khong hop le!" << '\n';
        return 0;
    }

    // 1. Đọc mảng 1-based (từ chỉ số 1 đến n) và tính tổng bằng long long tránh tràn số
    long long tong = 0;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        tong += a[i];
    }

    // 2. Cần mảng vì phải duyệt LẠI lần 2 sau khi đã biết tổng của cả dãy:
    //    Đếm số phần tử lớn hơn hẳn trung bình cộng (a[i] > tong / n  <=>  1LL * a[i] * n > tong)
    int demVuotTB = 0;
    for (int i = 1; i <= n; i++) {
        if (1LL * a[i] * n > tong) {
            demVuotTB++;
        }
    }

    // 3. Duyệt kiểm tra cặp phần tử liên tiếp (a[i], a[i + 1]) AN TOÀN BIÊN:
    //    Chỉ cho i chạy từ 1 đến n - 1 (tức i < n) để a[i + 1] không bao giờ vọt sang a[n + 1]!
    int capTang = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] < a[i + 1]) {
            capTang++;
        }
    }

    cout << "=== KET QUA XU LY MANG 1D ===" << '\n';
    cout << "Tong day so: " << tong << '\n';
    cout << "So phan tu lon hon trung binh: " << demVuotTB << '\n';
    cout << "So cap ke tang dan (a[i] < a[i+1]): " << capTang << '\n';

    // 4. Duyệt ngược từ n về 1 để in dãy đảo ngược
    cout << "Day dao nguoc: ";
    for (int i = n; i >= 1; i--) {
        cout << a[i];
        if (i > 1) {
            cout << ' ';
        }
    }
    cout << '\n';

    return 0;
}
