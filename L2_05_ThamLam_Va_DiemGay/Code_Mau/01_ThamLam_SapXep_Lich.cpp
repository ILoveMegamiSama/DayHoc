/**
 * BÀI L2-05: THUẬT TOÁN THAM LAM & ĐIỂM GÃY CỦA THAM LAM
 * File 01: Tham Lam Với std::sort — Lập Lịch Đoạn (Activity Selection) & Ghép Cặp Hai Đầu
 * Chuẩn CP C++14 (Pha 2 STL Lớp 9)
 */
#include <bits/stdc++.h>
using namespace std;

struct Segment {
    long long l, r;
};

// Comparator chuẩn Strict Weak Ordering (L1-05):
// Sắp theo thời điểm kết thúc r tăng dần; nếu bằng nhau, sắp theo l tăng dần
bool cmpByEnd(const Segment& a, const Segment& b) {
    if (a.r != b.r) return a.r < b.r;
    return a.l < b.l;
}

bool cmpByStart(const Segment& a, const Segment& b) {
    if (a.l != b.l) return a.l < b.l;
    return a.r < b.r;
}

bool cmpByLength(const Segment& a, const Segment& b) {
    long long lenA = a.r - a.l;
    long long lenB = b.r - b.l;
    if (lenA != lenB) return lenA < lenB;
    return a.r < b.r;
}

int countSelected(vector<Segment> segs, bool (*cmp)(const Segment&, const Segment&)) {
    sort(segs.begin(), segs.end(), cmp);
    int cnt = 0;
    long long lastEnd = -4000000000000000000LL;
    for (int i = 0; i < (int)segs.size(); i++) {
        // Phim mới bắt đầu >= thời điểm kết thúc phim trước thì xem được
        if (segs[i].l >= lastEnd) {
            cnt++;
            lastEnd = segs[i].r;
        }
    }
    return cnt;
}

// Mẫu 2: Ghép cặp hai đầu (Ferris Wheel - CSES 1090)
// Mỗi thuyền chở tối đa 2 bạn với tổng cân nặng <= maxW
int minBoats(vector<long long> w, long long maxW) {
    sort(w.begin(), w.end());
    int l = 0;
    int r = (int)w.size() - 1;
    int boats = 0;
    while (l <= r) {
        if (l < r && w[l] + w[r] <= maxW) {
            l++; // Ghép bạn nhẹ nhất đi cùng bạn nặng nhất
        }
        r--;     // Bạn nặng nhất luôn lên thuyền trong lượt này
        boats++;
    }
    return boats;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Kiểm chứng tiêu chí lập lịch đoạn trên phản ví dụ 4 đoạn
    vector<Segment> movies = {{1, 10}, {2, 6}, {5, 8}, {7, 11}};
    cout << "Lap lich theo bat dau som (SAI): " << countSelected(movies, cmpByStart) << '\n';
    cout << "Lap lich theo do dai ngan (SAI): " << countSelected(movies, cmpByLength) << '\n';
    cout << "Lap lich theo ket thuc som (CHUAN): " << countSelected(movies, cmpByEnd) << '\n';

    // 2. Ghép cặp hai đầu trên mảng {2, 3, 7, 8} với tải trọng thuyền X = 10
    vector<long long> weights = {8, 2, 7, 3};
    cout << "So thuyen toi thieu (X=10): " << minBoats(weights, 10) << '\n';
    return 0;
}
