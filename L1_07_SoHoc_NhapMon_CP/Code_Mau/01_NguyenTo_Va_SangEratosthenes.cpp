/**
 * BÀI L1-07: SỐ HỌC NHẬP MÔN CHO CP
 * File mẫu 01: Ước Số, Kiểm Tra Nguyên Tố O(sqrt(N)) & Sàng Eratosthenes O(N log log N)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Đếm ước và kiểm tra nguyên tố trong O(sqrt(N)) nhờ tính đối xứng cặp ước (d, N / d).
 * 2. Tránh 2 bẫy kinh điển:
 *    - n = 1 KHÔNG phải số nguyên tố (phải kiểm tra n < 2 -> false).
 *    - Viết i * i <= n với int i sẽ tràn số khi n gần 2*10^9 -> luôn dùng long long hoặc 1LL * i * i <= n.
 * 3. Cài đặt Sàng Eratosthenes trên vector<bool> trong O(N log log N), bắt đầu gạt từ 1LL * i * i.
 */

#include <bits/stdc++.h>
using namespace std;

// Đếm số ước nguyên dương của n trong O(sqrt(n))
int countDivisors(long long n) {
    if (n <= 0) return 0;
    int cnt = 0;
    for (long long d = 1; d * d <= n; d++) {
        if (n % d == 0) {
            cnt++; // Ước nhỏ d
            if (d != n / d) {
                cnt++; // Ước lớn đối xứng n / d (tránh đếm đôi khi n là số chính phương)
            }
        }
    }
    return cnt;
}

// Kiểm tra số nguyên tố trong O(sqrt(n))
// Lưu ý: dùng 1LL * i * i <= n (hoặc long long i) để không bao giờ tràn int!
bool isPrime(long long n) {
    if (n < 2) return false; // 0, 1 và số âm KHÔNG phải số nguyên tố
    for (long long i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

// Sàng nguyên tố Eratosthenes từ 0 đến n trong O(n log log n)
vector<bool> sieveEratosthenes(int n) {
    vector<bool> isPrimeArr(n + 1, true);
    if (n >= 0) isPrimeArr[0] = false;
    if (n >= 1) isPrimeArr[1] = false;

    for (int i = 2; 1LL * i * i <= n; i++) {
        if (isPrimeArr[i]) {
            // Mọi bội nhỏ hơn i * i (như 2*i, 3*i...) đã bị các ước nguyên tố nhỏ hơn i gạch rồi!
            for (long long j = 1LL * i * i; j <= n; j += i) {
                isPrimeArr[(int)j] = false;
            }
        }
    }
    return isPrimeArr;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cout << "=== PHAN A: DEM UOC & KIEM TRA NGUYEN TO O(sqrt(N)) ===" << '\n';
    vector<long long> samples = {1, 2, 25, 36, 97, 2147483647LL};
    for (long long x : samples) {
        cout << "x = " << x
             << " | so uoc = " << countDivisors(x)
             << " | isPrime = " << (isPrime(x) ? "YES" : "NO") << '\n';
    }

    cout << "\n=== PHAN B: SANG ERATOSTHENES O(N log log N) ===" << '\n';
    int limit50 = 50;
    vector<bool> prime50 = sieveEratosthenes(limit50);
    cout << "Cac so nguyen to <= 50: ";
    for (int i = 2; i <= limit50; i++) {
        if (prime50[i]) cout << i << ' ';
    }
    cout << '\n';

    int limit1M = 1000000;
    vector<bool> prime1M = sieveEratosthenes(limit1M);
    int totalPrimes = 0;
    for (int i = 2; i <= limit1M; i++) {
        if (prime1M[i]) totalPrimes++;
    }
    cout << "So luong so nguyen to <= 10^6: " << totalPrimes << '\n'; // 78498

    return 0;
}
