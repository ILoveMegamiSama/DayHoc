/*
 * BÀI L2-02: TÌM KIẾM NHỊ PHÂN & CHẶT NHỊ PHÂN ĐÁP ÁN
 * File 02: lower_bound, upper_bound trong STL & Ứng dụng đếm đoạn
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Phân biệt std::lower_bound (>= x) và std::upper_bound (> x) trên vector đã sort.
 * 2. Chuyển iterator về chỉ số 0-based bằng phép trừ (- a.begin()) và luôn kiểm tra
 *    it != a.end() trước khi đọc *it, it != a.begin() trước khi lùi --it.
 * 3. Đếm số phần tử bằng x hoặc nằm trong đoạn [L, R] trong O(log N).
 * 4. Nhắc lại bẫy O(N) TLE của L1-06: trên std::set phải gọi s.lower_bound(x).
 */

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<int> a = {10, 20, 20, 20, 35, 50};
    int n = (int)a.size();

    // 1. lower_bound: vị trí đầu tiên >= x
    auto itLow = lower_bound(a.begin(), a.end(), 20);
    // 2. upper_bound: vị trí đầu tiên > x
    auto itHigh = upper_bound(a.begin(), a.end(), 20);

    int idxLow = (int)(itLow - a.begin());
    int idxHigh = (int)(itHigh - a.begin());
    cout << "lower_bound(20) tai chi so " << idxLow << " (gia tri " << *itLow << ")\n";
    cout << "upper_bound(20) tai chi so " << idxHigh << " (gia tri " << *itHigh << ")\n";
    cout << "So phan tu bang 20 = " << (itHigh - itLow) << '\n';

    // 3. Đếm số phần tử thuộc đoạn [L, R] = [15, 35] trong O(log N)
    int L = 15, R = 35;
    int cntRange = (int)(upper_bound(a.begin(), a.end(), R) - lower_bound(a.begin(), a.end(), L));
    cout << "So phan tu trong [" << L << ", " << R << "] = " << cntRange << '\n';

    // 4. Tìm phần tử LỚN NHẤT <= query (ví dụ query = 25 -> đáp án 20; query = 5 -> không có)
    for (int query : {25, 5, 60}) {
        auto it = upper_bound(a.begin(), a.end(), query);
        if (it == a.begin()) {
            cout << "Query " << query << ": khong co phan tu <= " << query << '\n';
        } else {
            --it;
            cout << "Query " << query << ": phan tu lon nhat <= " << query << " la " << *it << '\n';
        }
    }

    // 5. Kiểm tra an toàn != a.end() khi tìm >= 100
    auto itBig = lower_bound(a.begin(), a.end(), 100);
    if (itBig == a.end()) {
        cout << "Khong co phan tu >= 100 (itBig == a.end(), chi so = " << n << ")\n";
    }

    // 6. Nhắc lại chuẩn set/multiset (L1-06): luôn dùng s.lower_bound(x), KHÔNG dùng std::lower_bound(s.begin(), ...)
    set<int> s = {10, 20, 35, 50};
    auto itSet = s.lower_bound(21);
    if (itSet != s.end()) {
        cout << "Trong set, phan tu dau tien >= 21 la " << *itSet << '\n';
    }

    return 0;
}
