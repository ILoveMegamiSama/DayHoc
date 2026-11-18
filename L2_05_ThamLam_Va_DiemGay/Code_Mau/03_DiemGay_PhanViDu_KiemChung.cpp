/**
 * BÀI L2-05: THUẬT TOÁN THAM LAM & ĐIỂM GÃY CỦA THAM LAM
 * File 03: Điểm Gãy Của Tham Lam (Coin Change, 0-1 Knapsack) & Bắt Lỗi Bằng Quay Lui/Bitmask (L2-04 + MOD-00)
 * Chuẩn CP C++14 (Pha 2 STL Lớp 9)
 */
#include <bits/stdc++.h>
using namespace std;

// --- PHẦN 1: ĐỔI TIỀN {1, 3, 4}, S = 6 ---
int greedyCoinChange(int S, vector<int> coins) {
    sort(coins.rbegin(), coins.rend());
    int cnt = 0;
    for (int c : coins) {
        cnt += S / c;
        S %= c;
    }
    return (S == 0) ? cnt : 1000000000;
}

// Dùng Quay lui (L2-04) trên số tiền nhỏ để tìm số tờ ít nhất chắc chắn đúng
void dfsCoin(int rem, int used, const vector<int>& coins, int& best) {
    if (used >= best) return;
    if (rem == 0) {
        best = used;
        return;
    }
    for (int c : coins) {
        if (c <= rem) {
            dfsCoin(rem - c, used + 1, coins, best);
        }
    }
}

// --- PHẦN 2: BALO 0-1 (KHÔNG ĐƯỢC CẮT ĐÔI MÓN HÀNG) ---
struct Item {
    long long w;
    long long v;
};

// Tham lam sắp theo đơn giá v / w giảm dần (dùng nhân chéo nguyên để tránh sai số thực)
bool cmpRatioDesc(const Item& a, const Item& b) {
    // a.v / a.w > b.v / b.w  <=>  a.v * b.w > b.v * a.w
    long long lhs = a.v * b.w;
    long long rhs = b.v * a.w;
    if (lhs != rhs) return lhs > rhs;
    return a.w < b.w;
}

long long greedyKnapsack(long long W, vector<Item> items) {
    sort(items.begin(), items.end(), cmpRatioDesc);
    long long curW = 0, totalV = 0;
    for (int i = 0; i < (int)items.size(); i++) {
        if (curW + items[i].w <= W) {
            curW += items[i].w;
            totalV += items[i].v;
        }
    }
    return totalV;
}

// Oracle chuẩn xác 100% bằng Bitmask 2^N (L2-04) cho N <= 15
long long bruteforceKnapsack(long long W, const vector<Item>& items) {
    int n = (int)items.size();
    long long bestV = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        long long sumW = 0, sumV = 0;
        for (int i = 0; i < n; i++) {
            if ((mask >> i) & 1) {
                sumW += items[i].w;
                sumV += items[i].v;
            }
        }
        if (sumW <= W && sumV > bestV) {
            bestV = sumV;
        }
    }
    return bestV;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Điểm gãy Đổi tiền
    vector<int> coins = {1, 3, 4};
    int S = 6;
    int coinBest = 1000000000;
    dfsCoin(S, 0, coins, coinBest);
    cout << "Doi S=6 voi {1,3,4}: Tham lam = " << greedyCoinChange(S, coins)
         << " to | Quay lui chuan = " << coinBest << " to\n";

    // 2. Điểm gãy Balo 0-1
    vector<Item> items = {{6, 60}, {5, 45}, {5, 45}};
    long long W = 10;
    cout << "Balo 0-1 W=10: Tham lam ti gia = " << greedyKnapsack(W, items)
         << " | Bitmask chuan = " << bruteforceKnapsack(W, items) << '\n';

    // 3. Máy chấm MOD-00 tự động vạch trần phản ví dụ cho Tham lam Balo 0-1
    mt19937 rng(2026);
    int failCount = 0;
    for (int tc = 0; tc < 500; tc++) {
        int n = (int)(rng() % 5) + 3; // 3..7 món đồ
        long long cap = (long long)(rng() % 15) + 6;
        vector<Item> gen(n);
        for (int i = 0; i < n; i++) {
            gen[i].w = (long long)(rng() % 9) + 1;
            gen[i].v = (long long)(rng() % 40) + 5;
        }
        long long g = greedyKnapsack(cap, gen);
        long long b = bruteforceKnapsack(cap, gen);
        if (g != b) {
            failCount++;
            if (failCount == 1) {
                cout << "May cham MOD-00 bat duoc phan vi du dau tien (W=" << cap << "): ";
                cout << "Greedy=" << g << " != Oracle=" << b << '\n';
            }
        }
    }
    cout << "Tong so test bi gay trong 500 test ngau nhien: " << failCount << "/500\n";
    return 0;
}
