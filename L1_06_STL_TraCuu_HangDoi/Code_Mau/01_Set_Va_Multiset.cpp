/**
 * BÀI L1-06: BỘ CÔNG CỤ STL (SET, MAP, PRIORITY_QUEUE, DEQUE)
 * File mẫu 01: std::set & std::multiset — Tủ Hồ Sơ Tự Sắp Xếp O(log N)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Làm chủ std::set<T>: insert, erase, find, count, *s.begin() (min), *s.rbegin() (max).
 * 2. Biết dùng phương thức riêng s.lower_bound(x) / s.upper_bound(x) chạy trong O(log N),
 *    TUYỆT ĐỐI KHÔNG gọi std::lower_bound(s.begin(), s.end(), x) vì bị O(N) TLE!
 * 3. Phân biệt bẫy kinh điển trên std::multiset:
 *    - ms.erase(x) xóa SẠCH mọi bản sao bằng x.
 *    - ms.erase(ms.find(x)) chỉ xóa ĐÚNG 1 bản sao bằng x.
 */

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // =========================================================================
    // PHẦN A: std::set<int> — Loại trùng & luôn giữ thứ tự tăng dần
    // =========================================================================
    set<int> s;
    s.insert(30);
    s.insert(10);
    s.insert(30); // Bị bỏ qua vì 30 đã có trong set
    s.insert(50);
    s.insert(20);

    cout << "=== PHAN A: STD::SET ===" << '\n';
    cout << "So phan tu phan biet: " << (int)s.size() << '\n';
    cout << "Cac gia tri tang dan: ";
    for (int x : s) {
        cout << x << ' ';
    }
    cout << '\n';
    cout << "Nho nhat = " << *s.begin() << ", Lon nhat = " << *s.rbegin() << '\n';

    // =========================================================================
    // PHẦN B: s.lower_bound(x) & s.upper_bound(x) trong O(log N)
    // CHÚ Ý: Luôn viết s.lower_bound(x), KHÔNG viết lower_bound(s.begin(), s.end(), x)!
    // =========================================================================
    cout << "\n=== PHAN B: TRA CUU TREN SET O(log N) ===" << '\n';
    auto it1 = s.lower_bound(25); // Phần tử đầu tiên >= 25 -> 30
    if (it1 != s.end()) {
        cout << "Phan tu >= 25 nho nhat: " << *it1 << '\n';
    }

    // Tìm phần tử <= 25 lớn nhất: dùng upper_bound(25) rồi lùi 1 bước nếu it != s.begin()
    auto it2 = s.upper_bound(25); // Phần tử đầu tiên > 25 -> 30
    if (it2 == s.begin()) {
        cout << "Khong co phan tu <= 25" << '\n';
    } else {
        --it2; // Lùi 1 bước trên iterator hai chiều của set
        cout << "Phan tu <= 25 lon nhat: " << *it2 << '\n';
    }

    // =========================================================================
    // PHẦN C: std::multiset<int> & Bẫy ms.erase(x) vs ms.erase(ms.find(x))
    // =========================================================================
    cout << "\n=== PHAN C: STD::MULTISET & BAY XOA ===" << '\n';
    multiset<int> ms;
    ms.insert(10);
    ms.insert(10);
    ms.insert(10);
    ms.insert(20);
    ms.insert(30);

    // Cách ĐÚNG để xóa ĐÚNG 1 phần tử có giá trị 10:
    auto itDel = ms.find(10);
    if (itDel != ms.end()) {
        ms.erase(itDel); // Chỉ xóa 1 bản sao -> vẫn còn hai số 10!
    }
    cout << "Sau ms.erase(ms.find(10)), so luong so 10 con lai: " << ms.count(10) << '\n';

    // Cách NGUY HIỂM nếu chỉ muốn xóa 1 chiếc: ms.erase(10) xóa SẠCH mọi số 10!
    ms.erase(10);
    cout << "Sau ms.erase(10), so luong so 10 con lai: " << ms.count(10)
         << ", tong size = " << (int)ms.size() << '\n';

    return 0;
}
