/*
 * BÀI L2-02: TÌM KIẾM NHỊ PHÂN & CHẶT NHỊ PHÂN ĐÁP ÁN
 * File 03: Chặt nhị phân trên tập đáp án (Binary Search on Answer)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Mô hình hóa bài toán tối ưu thành hàm đơn điệu bool check(mid).
 * 2. Thành thạo cả 2 dạng:
 *    - Dạng FFFTTT (tìm giá trị NHỎ NHẤT thỏa mãn): bài Factory Machines (CSES-1620).
 *    - Dạng TTTFFF (tìm giá trị LỚN NHẤT thỏa mãn): chia thanh gỗ / tăng trung vị.
 * 3. Đặt biên long long [low, high] chính xác và dừng sớm trong check(mid) để
 *    tuyệt đối không tràn số long long.
 */

#include <bits/stdc++.h>
using namespace std;

// Bài toán 1 (Dạng FFFTTT - tìm thời gian T NHỎ NHẤT):
// Có n máy, máy i mất k[i] giây làm 1 sản phẩm. Cần làm ít nhất t sản phẩm.
bool canMake(long long timeLimit, const vector<long long>& k, long long target) {
    long long made = 0;
    for (long long ki : k) {
        made += timeLimit / ki;
        // Dừng sớm ngay khi đủ target để tránh tràn long long!
        if (made >= target) {
            return true;
        }
    }
    return false;
}

long long solveMinTime(const vector<long long>& k, long long target) {
    long long minK = *min_element(k.begin(), k.end());
    long long low = 1;
    long long high = minK * target; // Đáp án không thể vượt quá thời gian máy nhanh nhất làm hết
    long long ans = high;

    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (canMake(mid, k, target)) {
            ans = mid;       // Thời gian mid đủ dùng -> ghi nhận và thử giảm nhỏ hơn
            high = mid - 1;
        } else {
            low = mid + 1;   // Chưa đủ sản phẩm -> phải tăng thời gian lên
        }
    }
    return ans;
}

// Bài toán 2 (Dạng TTTFFF - tìm độ dài L LỚN NHẤT):
// Có các thanh gỗ độ dài len[i], cần cắt ít nhất needPieces đoạn dài bằng nhau L.
bool canCutPieces(long long L, const vector<long long>& len, long long needPieces) {
    if (L == 0) return true;
    long long pieces = 0;
    for (long long x : len) {
        pieces += x / L;
        if (pieces >= needPieces) {
            return true;
        }
    }
    return false;
}

long long solveMaxLength(const vector<long long>& len, long long needPieces) {
    long long low = 1;
    long long high = *max_element(len.begin(), len.end());
    long long ans = 0; // Nếu không cắt được đoạn dài >= 1 thì đáp án là 0

    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (canCutPieces(mid, len, needPieces)) {
            ans = mid;      // Cắt được -> ghi nhận và thử cắt dài hơn nữa
            low = mid + 1;
        } else {
            high = mid - 1; // Quá dài, không đủ số đoạn -> phải thu ngắn lại
        }
    }
    return ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ 1 (CSES Factory Machines): 3 máy tốc độ {3, 2, 5}, cần 7 sản phẩm -> 8 giây
    vector<long long> k = {3, 2, 5};
    long long target = 7;
    cout << "Thoi gian nho nhat lam du " << target << " san pham: "
         << solveMinTime(k, target) << '\n';

    // Ví dụ 2 (Cắt thanh gỗ): 4 thanh {802, 743, 457, 539}, cần ít nhất 11 đoạn -> 200
    vector<long long> woods = {802, 743, 457, 539};
    long long needPieces = 11;
    cout << "Do dai lon nhat cat duoc " << needPieces << " doan: "
         << solveMaxLength(woods, needPieces) << '\n';

    return 0;
}
