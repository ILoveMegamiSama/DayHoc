/**
 * BÀI L1-05: STD::VECTOR, PAIR & SẮP XẾP (STD::SORT) — MỞ KHÓA PHA 2 STL
 * File mẫu 03: Custom Comparator & Quy Tắc Strict Weak Ordering (Cấm <= / >=)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Viết hàm so sánh tùy biến `bool cmp(const T& a, const T& b)` để sắp xếp
 *    theo nhiều tiêu chí trái chiều nhau (ví dụ: điểm giảm dần, thời gian phạt tăng dần,
 *    nếu vẫn hòa thì mã thí sinh tăng dần).
 * 2. Áp dụng Custom Comparator để sắp xếp theo giá trị dẫn xuất (hiệu b - a, tổng...).
 * 3. Nắm chắc quy tắc Strict Weak Ordering: trả về true khi a CHẮC CHẮN đứng trước b;
 *    TUYỆT ĐỐI dùng `<` hoặc `>`, KHÔNG BAO GIỜ dùng `<=` hay `>=` (gây RE / Crash!).
 */

#include <bits/stdc++.h>
using namespace std;

// Đóng gói 3 thông tin của 1 đội thi bằng pair lồng nhau:
// first.first = số bài giải được (p), first.second = thời gian phạt (t), second = mã đội (id)
typedef pair<pair<int, int>, int> DoiThi;

// Custom Comparator chuẩn mực:
// 1. Đội giải được NHIỀU bài hơn đứng trước (p giảm dần)
// 2. Bằng số bài -> đội có thời gian phạt ÍT hơn đứng trước (t tăng dần)
// 3. Bằng cả hai -> mã đội nhỏ hơn đứng trước (id tăng dần)
bool cmpBangXepHang(const DoiThi& a, const DoiThi& b) {
    if (a.first.first != b.first.first) {
        return a.first.first > b.first.first;
    }
    if (a.first.second != b.first.second) {
        return a.first.second < b.first.second;
    }
    return a.second < b.second; // Chỉ dùng '<', TUYỆT ĐỐI không dùng '<='!
}

// Custom Comparator theo hiệu (b - a) giống bài toán phân công công việc ACM:
// Đưa bài toán có (b - a) nhỏ nhất lên đầu danh sách.
bool cmpChenhLech(const pair<int, int>& x, const pair<int, int>& y) {
    return (x.second - x.first) < (y.second - y.first);
}

// Comparator SAI LUẬT để kiểm chứng (dùng '>=' vi phạm Strict Weak Ordering)
bool cmpSaiLuat(const pair<int, int>& a, const pair<int, int>& b) {
    return a.first >= b.first; // NGUY HIỂM: cmpSaiLuat(x, x) trả về true!
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Phần A: Sắp xếp bảng xếp hạng 3 tiêu chí với Custom Comparator
    vector<DoiThi> bxh = {
        {{4, 150}, 1},
        {{5, 220}, 2},
        {{4, 120}, 3},
        {{5, 220}, 4},
        {{4, 120}, 5}
    };

    sort(bxh.begin(), bxh.end(), cmpBangXepHang);

    cout << "=== PHAN A: BANG XEP HANG DA TIEU CHI ===" << '\n';
    for (int i = 0; i < (int)bxh.size(); i++) {
        cout << "Hang " << (i + 1) << ": Doi #" << bxh[i].second
             << " | So bai = " << bxh[i].first.first
             << " | Phat = " << bxh[i].first.second << '\n';
    }

    // Phần B: Sắp xếp theo giá trị dẫn xuất (b - a) tăng dần
    vector<pair<int, int>> congViec = {{10, 4}, {3, 9}, {8, 2}, {5, 6}};
    sort(congViec.begin(), congViec.end(), cmpChenhLech);

    cout << "\n=== PHAN B: SORT THEO HIEU (B - A) TANG DAN ===" << '\n';
    for (int i = 0; i < (int)congViec.size(); i++) {
        int a = congViec[i].first;
        int b = congViec[i].second;
        cout << "(" << a << ", " << b << ") -> hieu (b - a) = " << (b - a) << '\n';
    }

    // Phần C: Kiểm chứng Strict Weak Ordering (Tính phi phản xạ: cmp(x, x) PHẢI là false)
    DoiThi mau = {{4, 120}, 3};
    pair<int, int> pMau = {50, 100};
    cout << "\n=== PHAN C: KIEM TRA STRICT WEAK ORDERING ===" << '\n';
    cout << "cmpBangXepHang(x, x) = " << cmpBangXepHang(mau, mau)
         << " (bat buoc = 0 / false)" << '\n';
    cout << "cmpSaiLuat(x, x)     = " << cmpSaiLuat(pMau, pMau)
         << " (VI PHAM = 1 / true -> de gay RE voi du lieu lon!)" << '\n';

    return 0;
}
