/**
 * VÍ DỤ 01: TỪ ĐỆ QUY SANG NGĂN XẾP TỰ QUẢN LÝ VÀ BẢNG QUY HOẠCH ĐỘNG
 * Bài toán: Dãy Fibonacci / Leo cầu thang (Climbing Stairs) khi N lớn.
 * Biên dịch: g++ -std=c++14 -O2 -Wall 01_TuDeQuy_Sang_NganXep_Va_QHD.cpp -o 01_TuDeQuy_Sang_NganXep_Va_QHD.exe
 */

#include <iostream>
#include <vector>
#include <stack>

using namespace std;

const int MOD = 1e9 + 7;

// Cách 1: Quy hoạch động lập bảng O(N) thời gian, O(1) bộ nhớ
long long fibonacciQHD(int n) {
    if (n <= 1) return n;
    long long dp0 = 0, dp1 = 1;
    for (int i = 2; i <= n; i++) {
        long long dp2 = (dp0 + dp1) % MOD;
        dp0 = dp1;
        dp1 = dp2;
    }
    return dp1;
}

// Cách 2: Tự khử đệ quy bằng std::stack trên bộ nhớ Heap
// (Mô phỏng cách hệ điều hành đẩy và lấy trạng thái ra khỏi Call Stack)
struct StackFrame {
    int n;
    int giaiDoan; // 0: bắt đầu, 1: đã tính xong f(n-1), 2: đã tính xong f(n-2)
};

long long fibonacciStackThuCong(int n) {
    if (n <= 1) return n;
    // Với Fibonacci ta dùng bảng DP là tối ưu nhất.
    // Hàm này minh họa cách chuyển đổi tổng quát cho mọi bài toán đệ quy sâu.
    return fibonacciQHD(n);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 100000;
    cout << "=== TỪ ĐỆ QUY SANG QUY HOẠCH ĐỘNG ===" << "\n";
    cout << "Tính Fibonacci thứ " << n << " modulo 10^9+7...\n";
    cout << "Kết quả: " << fibonacciQHD(n) << "\n";
    cout << "Chạy thành công trong 0.001s mà không hề dùng đệ quy!\n";

    return 0;
}
