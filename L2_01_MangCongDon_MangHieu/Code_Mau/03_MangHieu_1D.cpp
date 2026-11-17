/**
 * BÀI L2-01: MẢNG CỘNG DỒN (1D/2D) & MẢNG HIỆU
 * File mẫu 03: Mảng Hiệu 1D (Difference Array) — Cập Nhật Đoạn Hàng Loạt O(1)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Ghi nhận cập nhật tăng đoạn [l, r] thêm v trong O(1): diff[l] += v; diff[r + 1] -= v;
 * 2. Luôn cấp phát diff kích thước (n + 2) với 1-based để khi r == n, diff[r + 1] = diff[n + 1] KHÔNG bị Out-of-Bounds!
 * 3. Khôi phục mảng cuối cùng bằng 1 lượt cộng dồn trong O(N), tổng độ phức tạp O(N + Q).
 * 4. Kết hợp Mảng hiệu + Mảng cộng dồn để giải bài toán đếm điểm thỏa ngưỡng (mô hình CF 816B).
 */

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cout << "=== PHAN A: TANG DOAN [L, R] THEM V TRONG O(1) ===" << '\n';
    int n = 6;
    vector<long long> a = {0, 10, 20, 30, 40, 50, 60};
    // Bắt buộc cỡ (n + 2) để khi r = n thì r + 1 = n + 1 vẫn nằm gọn trong mảng!
    vector<long long> diff(n + 2, 0);

    struct RangeAdd {
        int l, r;
        long long v;
    };
    vector<RangeAdd> updates = {
        {1, 3, 5},   // Tăng [1, 3] thêm 5
        {2, 6, 10},  // Tăng [2, 6] đến tận cuối mảng (r = n = 6) thêm 10
        {4, 5, -3}   // Giảm [4, 5] đi 3
    };

    for (const RangeAdd& op : updates) {
        diff[op.l] += op.v;
        diff[op.r + 1] -= op.v;
    }

    long long curAdd = 0;
    cout << "Mang sau khi cap nhat: ";
    for (int i = 1; i <= n; i++) {
        curAdd += diff[i];
        a[i] += curAdd;
        cout << a[i] << (i == n ? '\n' : ' ');
    }

    cout << "\n=== PHAN B: GHEP MANG HIEU + MANG CONG DON (MO HINH KAREN & COFFEE) ===" << '\n';
    int maxPos = 10;
    int k = 2; // Điểm hợp lệ nếu có ít nhất k đoạn phủ qua
    vector<pair<int, int>> segments = {{1, 5}, {3, 7}, {4, 10}};

    vector<int> segDiff(maxPos + 2, 0);
    for (const pair<int, int>& s : segments) {
        segDiff[s.first]++;
        segDiff[s.second + 1]--;
    }

    // Lượt cộng dồn 1: đếm số đoạn phủ từng vị trí
    // Lượt cộng dồn 2: đếm số vị trí hợp lệ (cover >= k) trong [1..i]
    vector<int> prefValid(maxPos + 1, 0);
    int curCover = 0;
    for (int i = 1; i <= maxPos; i++) {
        curCover += segDiff[i];
        int isValid = (curCover >= k) ? 1 : 0;
        prefValid[i] = prefValid[i - 1] + isValid;
    }

    cout << "So diem duoc phu >= " << k << " lan trong [2, 6]: "
         << (prefValid[6] - prefValid[2 - 1]) << '\n';
    cout << "So diem duoc phu >= " << k << " lan trong [1, 10]: "
         << (prefValid[10] - prefValid[1 - 1]) << '\n';

    return 0;
}
