/*
 * BÀI L2-02: TÌM KIẾM NHỊ PHÂN & CHẶT NHỊ PHÂN ĐÁP ÁN
 * File 01: Tìm kiếm nhị phân chuẩn & Bất biến biên (while l <= r)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Cài đặt Tìm kiếm nhị phân chuẩn O(log N) trên vector đã sắp xếp tăng dần.
 * 2. Dùng công thức mid = l + (r - l) / 2 để tránh tràn số int khi l, r lớn.
 * 3. Dùng khuôn mẫu biến ans + while (l <= r) để tìm VỊ TRÍ ĐẦU TIÊN và
 *    VỊ TRÍ CUỐI CÙNG của phần tử x (xử lý gọn mảng có phần tử trùng nhau).
 */

#include <bits/stdc++.h>
using namespace std;

// Tìm vị trí bất kỳ của x trong mảng đã sort tăng dần; trả về -1 nếu không có
int binarySearchExact(const vector<int>& a, int x) {
    int l = 0, r = (int)a.size() - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) {
            return mid;
        }
        if (a[mid] < x) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return -1;
}

// Khuôn mẫu biến ans: tìm VỊ TRÍ ĐẦU TIÊN (nhỏ nhất) có giá trị == x
int findFirstEqual(const vector<int>& a, int x) {
    int l = 0, r = (int)a.size() - 1;
    int ans = -1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) {
            ans = mid;    // Ghi nhận ứng viên hợp lệ
            r = mid - 1;  // Thử tìm tiếp bên trái xem có vị trí nhỏ hơn không
        } else if (a[mid] < x) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return ans;
}

// Khuôn mẫu biến ans: tìm VỊ TRÍ CUỐI CÙNG (lớn nhất) có giá trị == x
int findLastEqual(const vector<int>& a, int x) {
    int l = 0, r = (int)a.size() - 1;
    int ans = -1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) {
            ans = mid;    // Ghi nhận ứng viên hợp lệ
            l = mid + 1;  // Thử tìm tiếp bên phải xem có vị trí lớn hơn không
        } else if (a[mid] < x) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<int> a = {40, 10, 20, 20, 20, 35, 10, 50};
    // Bắt buộc sắp xếp tăng dần trước khi tìm kiếm nhị phân!
    sort(a.begin(), a.end());
    // Sau khi sort: {10, 10, 20, 20, 20, 35, 40, 50} (chỉ số 0..7)

    cout << "Mang sau khi sort: ";
    for (int i = 0; i < (int)a.size(); i++) {
        cout << a[i] << (i + 1 == (int)a.size() ? '\n' : ' ');
    }

    int x = 20;
    int firstPos = findFirstEqual(a, x);
    int lastPos = findLastEqual(a, x);
    cout << "Tim x = " << x << ": vi tri bat ky = " << binarySearchExact(a, x) << '\n';
    cout << "Vi tri dau tien = " << firstPos << ", vi tri cuoi cung = " << lastPos << '\n';
    if (firstPos != -1) {
        cout << "So lan xuat hien cua " << x << " = " << (lastPos - firstPos + 1) << '\n';
    }

    cout << "Tim x = 25 (khong co): " << binarySearchExact(a, 25) << '\n';
    return 0;
}
