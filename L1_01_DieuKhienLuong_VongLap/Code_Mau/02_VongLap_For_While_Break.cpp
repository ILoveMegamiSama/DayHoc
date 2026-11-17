/**
 * BÀI L1-01: ĐIỀU KHIỂN LUỒNG, VÒNG LẶP & SỐ NGUYÊN LỚN
 * File mẫu 02: Vòng Lặp for, while, break, continue & Mẫu Đọc Nhiều Bộ Test while (t--)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Dùng vòng lặp for khi biết trước số lượt lặp để cộng tổng & đếm (không cần dùng mảng).
 * 2. Dùng vòng lặp while khi lặp theo điều kiện dừng (tách chữ số của một số nguyên).
 * 3. Phân biệt break (thoát hẳn vòng lặp) và continue (bỏ qua phần còn lại của lượt hiện tại).
 * 4. Nắm mẫu đọc nhiều bộ test chuẩn CP: while (t--).
 */

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ đầu vào (stdin):
    // 5
    // 10 -3 25 -8 40
    // 10 30
    // 202605
    // 3
    // 10 3
    // 12 4
    // 7 5

    // 1. VÒNG LẶP FOR + CONTINUE: Đọc n số, bỏ qua số âm, cộng tổng số không âm (không cần mảng)
    int n;
    if (!(cin >> n)) {
        return 0;
    }

    long long tongHopLe = 0;
    int soLuongHopLe = 0;
    for (int i = 1; i <= n; i++) {
        int giaTri;
        cin >> giaTri;
        if (giaTri < 0) {
            // Bỏ qua số âm, nhảy ngay sang lượt i + 1 tiếp theo
            continue;
        }
        tongHopLe += giaTri;
        soLuongHopLe++;
    }

    cout << "=== 1. VONG LAP FOR + CONTINUE ===" << '\n';
    cout << "So luong so khong am: " << soLuongHopLe << '\n';
    cout << "Tong cac so khong am: " << tongHopLe << '\n';

    // 2. VÒNG LẶP FOR + CONTINUE + BREAK:
    //    Tìm số LẺ đầu tiên trong đoạn [l, r] chia hết cho 7.
    int l, r;
    cin >> l >> r;
    int ketQua = -1;
    for (int i = l; i <= r; i++) {
        if (i % 2 == 0) {
            // Số chẵn thì bỏ qua phần dưới, xét số kế tiếp
            continue;
        }
        if (i % 7 == 0) {
            ketQua = i;
            // Đã tìm thấy số đầu tiên thỏa mãn -> thoát hẳn vòng lặp ngay lập tức!
            break;
        }
    }

    cout << "\n=== 2. TIM KIEM SOM VOI BREAK ===" << '\n';
    cout << "So le dau tien trong [" << l << ", " << r << "] chia het cho 7: " << ketQua << '\n';

    // 3. VÒNG LẶP WHILE: Đếm số chữ số và tính tổng chữ số của m
    long long m;
    cin >> m;
    long long banSao = m;
    int soChuSo = 0;
    int tongChuSo = 0;

    if (banSao == 0) {
        soChuSo = 1;
        tongChuSo = 0;
    } else {
        while (banSao > 0) {
            tongChuSo += (int)(banSao % 10);
            soChuSo++;
            banSao /= 10; // BẮT BUỘC cập nhật để không rơi vào vòng lặp vô tận (TLE)!
        }
    }

    cout << "\n=== 3. VONG LAP WHILE (TACH CHU SO) ===" << '\n';
    cout << "So " << m << " co " << soChuSo << " chu so, tong chu so = " << tongChuSo << '\n';

    // 4. MẪU ĐỌC NHIỀU BỘ TEST CHUẨN CP: while (t--)
    //    Với mỗi cặp (a, b), tìm số bước ít nhất tăng a lên để a chia hết cho b.
    int t;
    cin >> t;
    cout << "\n=== 4. DOC NHIEU BO TEST WHILE (T--) ===" << '\n';
    while (t--) {
        long long a, b;
        cin >> a >> b;
        if (a % b == 0) {
            cout << 0 << '\n';
        } else {
            cout << b - (a % b) << '\n';
        }
    }

    return 0;
}
