/**
 * BÀI L1-04: PHÂN TÍCH ĐỘ PHỨC TẠP THUẬT TOÁN (BIG-O)
 * File mẫu 01: Đếm Phép Toán Sơ Cấp & Các Bậc Ký Hiệu Big-O
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Hiểu tại sao đo tốc độ bằng số phép toán sơ cấp thay vì đồng hồ bấm giây.
 * 2. Nhận diện trực quan 6 bậc độ phức tạp thường gặp:
 *    O(1), O(log N), O(sqrt(N)), O(N), O(N log N), O(N^2).
 * 3. Áp dụng 2 quy tắc rút gọn Big-O (bỏ hằng số, giữ số hạng bậc cao nhất)
 *    và cảnh báo ngoại lệ khi có hệ số hằng số lớn hoặc T bộ test.
 */

#include <bits/stdc++.h>
using namespace std;

// 1. Độ phức tạp O(1): Số bước cố định, không phụ thuộc độ lớn của N
long long demO1(long long n, long long& buoc) {
    buoc = 1; // Chỉ 1 biểu thức công thức duy nhất
    return n * (n + 1) / 2;
}

// 2. Độ phức tạp O(log N): Mỗi bước giảm kích thước đi một nửa (hoặc chia cho 10)
long long demOLogN(long long n, long long& buoc) {
    buoc = 0;
    long long x = n;
    while (x > 0) {
        buoc++;
        x /= 2;
    }
    return buoc;
}

// 3. Độ phức tạp O(sqrt(N)): Duyệt đến căn bậc hai để đếm ước số của N
long long demUocOSqrtN(long long n, long long& buoc) {
    buoc = 0;
    long long soUoc = 0;
    for (long long i = 1; i * i <= n; i++) {
        buoc++;
        if (n % i == 0) {
            soUoc++;
            if (i * i != n) {
                soUoc++; // Ghép cặp ước đối xứng n / i
            }
        }
    }
    return soUoc;
}

// 4. Độ phức tạp O(N): Một vòng lặp duyệt tuyến tính từ 1 đến N
long long demON(int n, long long& buoc) {
    buoc = 0;
    long long tong = 0;
    for (int i = 1; i <= n; i++) {
        buoc++;
        tong += i;
    }
    return tong;
}

// 5. Độ phức tạp O(N log N): Chuỗi điều hòa N/1 + N/2 + ... + N/N ~ N * ln(N)
// Đây chính là khung của thuật toán đếm số ước cho mọi số từ 1 đến N!
long long demONLogN(int n, long long& buoc) {
    buoc = 0;
    long long tongSoUoc = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = i; j <= n; j += i) {
            buoc++;
            tongSoUoc++;
        }
    }
    return tongSoUoc;
}

// 6. Độ phức tạp O(N^2): Hai vòng lặp lồng nhau duyệt mọi cặp (i, j) với i < j
long long demON2(int n, long long& buoc) {
    buoc = 0;
    long long soCap = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = i + 1; j <= n; j++) {
            buoc++;
            soCap++;
        }
    }
    return soCap;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Ví dụ đầu vào: 1000
    int n = 1000;
    if (cin >> n) {
        if (n < 1) {
            n = 1;
        }
    }

    long long buoc1 = 0, buocLog = 0, buocSqrt = 0;
    long long buocN = 0, buocNLog = 0, buocN2 = 0;

    long long tongCongThuc = demO1(n, buoc1);
    long long bitNhiPhan = demOLogN(n, buocLog);
    long long soUocN = demUocOSqrtN(n, buocSqrt);

    cout << "=== SO SANH SO PHEP LAP THUC TE VOI N = " << n << " ===" << '\n';
    cout << "1. O(1)        -> so buoc = " << buoc1
         << " (tong 1..N = " << tongCongThuc << ")" << '\n';
    cout << "2. O(log N)    -> so buoc = " << buocLog
         << " (so lan chia doi N = " << bitNhiPhan << ")" << '\n';
    cout << "3. O(sqrt(N))  -> so buoc = " << buocSqrt
         << " (so uoc cua N = " << soUocN << ")" << '\n';

    if (n <= 1000000) {
        long long tongVongLap = demON(n, buocN);
        cout << "4. O(N)        -> so buoc = " << buocN
             << " (tong 1..N = " << tongVongLap << ")" << '\n';
    } else {
        cout << "4. O(N)        -> uoc luong ~ " << n << " buoc" << '\n';
    }

    if (n <= 50000) {
        demONLogN(n, buocNLog);
        cout << "5. O(N log N)  -> so buoc = " << buocNLog << '\n';
    } else {
        cout << "5. O(N log N)  -> uoc luong ~ " << (long long)n * buocLog << " buoc" << '\n';
    }

    if (n <= 5000) {
        demON2(n, buocN2);
        cout << "6. O(N^2)      -> so buoc = " << buocN2 << '\n';
    } else {
        cout << "6. O(N^2)      -> N*(N-1)/2 ~ " << 1LL * n * (n - 1) / 2
             << " buoc (QUY MO NAY SE BI TLE NEU N >= 20000!)" << '\n';
    }

    return 0;
}
