/**
 * BÀI L1-05: STD::VECTOR, PAIR & SẮP XẾP (STD::SORT) — MỞ KHÓA PHA 2 STL
 * File mẫu 01: std::vector<T>, Mảng 2 Chiều Răng Cưa & Truyền Tham Chiếu (& / const &)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Làm chủ std::vector<T>: push_back, pop_back, size, empty, resize, clear.
 * 2. Dùng vector<vector<int>> để lưu K danh sách có kích thước khác nhau trên Heap
 *    mà không bị tràn bộ nhớ Stack (~8 MB) hay lãng phí mảng tĩnh 2D gây MLE (> 256 MB).
 * 3. Hiểu bẫy tràn số không dấu (int)v.size() - 1 khi vector rỗng.
 * 4. Phân biệt truyền tham trị (copy O(N) -> TLE), const vector<T>& (đọc nhanh O(1)),
 *    và vector<T>& (sửa trực tiếp bản gốc O(1)).
 */

#include <bits/stdc++.h>
using namespace std;

// 1. Truyền tham chiếu hằng (const vector<int>&): chỉ đọc, truyền địa chỉ trong O(1)!
// Tuyệt đối KHÔNG viết `vector<int> a` (không có &) vì mỗi lần gọi sẽ copy toàn bộ N phần tử -> TLE!
long long tinhTongDoan(const vector<int>& a, int l, int r) {
    long long tong = 0;
    for (int i = l; i <= r; i++) {
        tong += a[i];
    }
    return tong;
}

// 2. Truyền tham chiếu (vector<int>&): sửa trực tiếp trên vector gốc của main() trong O(1)
void nhanDoiPhanTu(vector<int>& a) {
    for (int i = 0; i < (int)a.size(); i++) {
        a[i] *= 2;
    }
}

// 3. Minh họa truyền tham trị (KHÔNG KHUYẾN KHÍCH với vector lớn):
// Mỗi lần gọi hàm phải tạo bản sao mới của toàn bộ vector -> sửa bên trong không ảnh hưởng bản gốc!
void thuSuaBanSao(vector<int> banSao) {
    if (!banSao.empty()) {
        banSao[0] = 999999; // Chỉ đổi trên bản sao tạm
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Phần A: Các thao tác cơ bản của std::vector<int>
    vector<int> ds; // Khởi tạo rỗng, dữ liệu nằm trên Heap (không sợ tràn Stack 8 MB!)
    ds.push_back(10);
    ds.push_back(25);
    ds.push_back(40);
    ds.push_back(15);

    cout << "=== PHAN A: VECTOR CO BAN ===" << '\n';
    cout << "Kich thuoc ban dau: " << (int)ds.size()
         << ", phan tu cuoi: " << ds.back() << '\n';

    ds.pop_back(); // Xóa phần tử cuối (15) trong O(1)
    cout << "Sau pop_back(), kich thuoc: " << (int)ds.size()
         << ", phan tu cuoi: " << ds.back() << '\n';

    // Luôn ép kiểu (int)ds.size() trước khi trừ 1 để tránh lỗi tràn số không dấu!
    vector<int> rong;
    cout << "Kiem tra vector rong an toan: (int)rong.size() - 1 = "
         << (int)rong.size() - 1 << '\n';

    // Phần B: Khởi tạo kích thước sẵn & Mảng 2 chiều răng cưa vector<vector<int>>
    // Giả sử có 3 câu lạc bộ với số thành viên hoàn toàn khác nhau:
    // CLB 0 có 2 bạn, CLB 1 có 4 bạn, CLB 2 có 1 bạn
    int k = 3;
    vector<vector<int>> clb(k);
    clb[0].push_back(101);
    clb[0].push_back(102);

    clb[1].push_back(201);
    clb[1].push_back(202);
    clb[1].push_back(203);
    clb[1].push_back(204);

    clb[2].push_back(301);

    cout << "\n=== PHAN B: VECTOR 2D RANG CUA ===" << '\n';
    for (int i = 0; i < (int)clb.size(); i++) {
        cout << "CLB " << i << " (" << (int)clb[i].size() << " ban): ";
        for (int j = 0; j < (int)clb[i].size(); j++) {
            cout << clb[i][j] << (j + 1 < (int)clb[i].size() ? ' ' : '\n');
        }
    }

    // Phần C: Truyền tham trị vs const vector& vs vector&
    cout << "\n=== PHAN C: THAM CHIEU & TRONG HAM ===" << '\n';
    vector<int> diem = {5, 8, 12, 7};
    thuSuaBanSao(diem);
    cout << "Sau thuSuaBanSao (tham tri), diem[0] van la: " << diem[0] << '\n';

    cout << "Tong doan [1..2] qua const vector&: " << tinhTongDoan(diem, 1, 2) << '\n';

    nhanDoiPhanTu(diem); // Sửa trực tiếp bản gốc qua vector<int>&
    cout << "Sau nhanDoiPhanTu (vector<int>&): ";
    for (int i = 0; i < (int)diem.size(); i++) {
        cout << diem[i] << (i + 1 < (int)diem.size() ? ' ' : '\n');
    }

    // Minh họa vector lớn trên Heap không hề gây tràn Stack:
    vector<int> mangLon(1000000, 1); // ~4 MB trên Heap, Stack chỉ giữ 24 byte!
    cout << "Khai bao vector 10^6 phan tu trong main() an toan, size = "
         << (int)mangLon.size() << '\n';

    return 0;
}
