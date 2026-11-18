/**
 * BÀI L1-03: HÀM, THAM CHIẾU & BỘ NHỚ STACK / VÙNG TĨNH
 * File mẫu 01: Tách Việc Lớn Thành Hàm (void vs Hàm Trả Về return)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Tách bài toán lớn thành các hàm nhỏ có nhiệm vụ rõ ràng, tránh lặp lại code.
 * 2. Phân biệt hàm trả về giá trị (int, long long, bool) với hàm hành động (void).
 * 3. Hiểu hàm kết thúc ngay lập tức tại câu lệnh return (tránh bẫy return sớm trong vòng lặp).
 */

#include <bits/stdc++.h>
using namespace std;

// Hàm 1 (trả về int): Tính tổng các chữ số của một số nguyên không âm x.
// Tham số x là bản sao giá trị được truyền vào.
int tongChuSo(long long x) {
    if (x < 0) {
        x = -x;
    }
    int tong = 0;
    while (x > 0) {
        tong += (int)(x % 10);
        x /= 10;
    }
    return tong;
}

// Hàm 2 (trả về long long): Đảo ngược các chữ số của số nguyên dương x.
long long daoNguocSo(long long x) {
    long long kq = 0;
    while (x > 0) {
        kq = kq * 10 + (x % 10);
        x /= 10;
    }
    return kq;
}

// Hàm 3 (trả về bool): Kiểm tra số nguyên tố trong O(sqrt(x)).
// Chú ý: Chỉ kết luận return true SAU KHI đã kiểm tra hết vòng lặp!
bool laNguyenTo(long long x) {
    if (x < 2) {
        return false; // Thoát sớm đúng đắn cho số < 2
    }
    for (long long i = 2; i * i <= x; i++) {
        if (x % i == 0) {
            return false; // Tìm thấy ước -> chắc chắn hợp số, dừng ngay lập tức
        }
    }
    return true; // Đã thử hết mọi i từ 2..sqrt(x) không có ước nào -> nguyên tố!
}

// Hàm 4 (hàm kết hợp): Gọi lại các hàm nhỏ ở trên để kiểm tra mã thẻ "Siêu Thân Thiện":
// Điều kiện: tổng chữ số là số nguyên tố VÀ số đảo ngược cũng là số nguyên tố.
bool laMaSieuThanThien(long long ma) {
    int s = tongChuSo(ma);
    long long dao = daoNguocSo(ma);
    return laNguyenTo(s) && laNguyenTo(dao);
}

// Hàm 5 (void - chỉ thực hiện hành động, không trả về giá trị):
// In báo cáo tổng kết đẹp mắt và sạch sẽ.
void inBaoCao(int tongMa, int soMaDatChuan) {
    cout << "=== BAO CAO LOC MA THE ===" << '\n';
    cout << "Tong so ma da kiem tra: " << tongMa << '\n';
    cout << "So ma sieu than thien: " << soMaDatChuan << '\n';
    if (soMaDatChuan == 0) {
        cout << "Khong co ma nao dat chuan." << '\n';
        return; // Có thể dùng "return;" trống trong hàm void để thoát sớm!
    }
    cout << "Trang thai: Da hoan tat kiem duyet!" << '\n';
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ đầu vào (stdin):
    // 5
    // 11 24 38 19 113
    int n;
    if (!(cin >> n)) {
        return 0;
    }

    int demDatChuan = 0;
    for (int i = 1; i <= n; i++) {
        long long ma;
        cin >> ma;
        if (laMaSieuThanThien(ma)) {
            demDatChuan++;
            cout << "Ma " << ma << " -> DAT (tong chu so = " << tongChuSo(ma)
                 << ", dao nguoc = " << daoNguocSo(ma) << ")" << '\n';
        } else {
            cout << "Ma " << ma << " -> KHONG DAT" << '\n';
        }
    }

    inBaoCao(n, demDatChuan);
    return 0;
}
