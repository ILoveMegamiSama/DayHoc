/**
 * BÀI L1-06: BỘ CÔNG CỤ STL (SET, MAP, PRIORITY_QUEUE, DEQUE)
 * File mẫu 02: std::map — Từ Điển Ánh Xạ Khóa Lớn / Xâu & Tránh Bẫy Rác / Anti-Hash
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Dùng std::map<Key, Value> để đếm tần suất cho số lớn (tới 10^9) hoặc string trong O(log N).
 * 2. Né bẫy kinh điển: viết if (mp[x] == 0) tự động chèn thêm khóa rác (x, 0) vào map!
 *    Khi chỉ kiểm tra tồn tại, luôn dùng mp.count(x) hoặc mp.find(x) != mp.end().
 * 3. Hiểu lý do ưu tiên std::map (luôn O(log N) ổn định) thay cho unordered_map
 *    (có thể bị test anti-hash đánh sập thành O(N^2) TLE trên Codeforces).
 */

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // =========================================================================
    // PHẦN A: Đếm tần suất số lớn 10^9 và chuỗi string bằng std::map
    // =========================================================================
    vector<long long> a = {1000000000LL, 5, 1000000000LL, 12, 5, 1000000000LL};
    map<long long, int> demSo;
    for (long long x : a) {
        demSo[x]++; // Tự tạo khóa mới với giá trị 0 rồi tăng lên 1 trong O(log N)
    }

    cout << "=== PHAN A: MAP DEM KHOA LON 10^9 ===" << '\n';
    for (const auto& p : demSo) { // Dùng const auto& để không copy khi Key là kiểu lớn
        cout << "Gia tri " << p.first << " xuat hien " << p.second << " lan" << '\n';
    }

    // =========================================================================
    // PHẦN B: Bẫy tạo khóa rác của mp[x] vs kiểm tra sạch bằng mp.count(x)
    // =========================================================================
    cout << "\n=== PHAN B: BAY TAO KHOA RAC CUA mp[x] ===" << '\n';
    map<string, int> diem;
    diem["An"] = 95;
    diem["Binh"] = 88;
    cout << "Size ban dau: " << (int)diem.size() << '\n';

    // CÁCH ĐÚNG: Chỉ hỏi thăm bằng .count() hoặc .find() -> KHÔNG làm tăng size()!
    if (diem.count("Chi") == 0) {
        cout << "Chua co 'Chi' trong map, size van la: " << (int)diem.size() << '\n';
    }

    // CÁCH DỄ SẬP BẪY: Dùng ngoặc vuông diem["Dung"] chỉ để kiểm tra == 0!
    // Ngay khi chạy biểu thức diem["Dung"], map tự động chèn thêm ("Dung", 0)!
    if (diem["Dung"] == 0) {
        cout << "Sau khi hoi bang diem[\"Dung\"], size tang thanh: " << (int)diem.size() << '\n';
    }

    // =========================================================================
    // PHẦN C: Mô phỏng hệ thống đăng ký tài khoản (kiểu Codeforces 4C)
    // Dùng std::map để tránh bị test anti-hash O(N^2) như unordered_map
    // =========================================================================
    cout << "\n=== PHAN C: HE THONG DANG KY TAI KHOAN ===" << '\n';
    vector<string> requests = {"minh", "hoa", "minh", "minh", "hoa"};
    map<string, int> db;
    for (const string& name : requests) {
        if (db.count(name) == 0) {
            cout << name << " -> OK" << '\n';
            db[name] = 1;
        } else {
            cout << name << " -> " << name << db[name] << '\n';
            db[name]++;
        }
    }

    return 0;
}
