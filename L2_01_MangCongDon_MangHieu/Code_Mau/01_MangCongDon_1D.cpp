/**
 * BÀI L2-01: MẢNG CỘNG DỒN (1D/2D) & MẢNG HIỆU
 * File mẫu 01: Mảng Cộng Dồn 1D (1D Prefix Sum) — Truy Vấn Tổng Đoạn O(1)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Tiền xử lý mảng cộng dồn 1-based pref[0..n] trong O(N) để trả lời mỗi truy vấn [l, r] trong O(1).
 * 2. Đặt lính canh pref[0] = 0 để công thức pref[r] - pref[l - 1] không cần nhánh if (l == 1).
 * 3. Dùng vector<long long> cho pref để tránh tràn int khi N <= 2*10^5 và |a[i]| <= 10^9.
 * 4. Ứng dụng nâng cao: Đếm số đoạn con có tổng bằng K (có cả số âm) bằng Prefix Sum + std::map.
 */

#include <bits/stdc++.h>
using namespace std;

// Xây dựng mảng cộng dồn 1-based từ mảng 1-based a[1..n]
vector<long long> buildPrefix1D(const vector<long long>& a) {
    int n = (int)a.size() - 1;
    vector<long long> pref(n + 1, 0); // pref[0] = 0 làm lính canh
    for (int i = 1; i <= n; i++) {
        pref[i] = pref[i - 1] + a[i];
    }
    return pref;
}

// Truy vấn tổng đoạn [l, r] trong O(1)
long long queryRange1D(const vector<long long>& pref, int l, int r) {
    return pref[r] - pref[l - 1];
}

// Đếm số đoạn con liên tiếp [l, r] có tổng đúng bằng targetSum (dùng được cả khi có số âm!)
// Nhận xét: pref[r] - pref[l - 1] == targetSum  <=>  pref[l - 1] == pref[r] - targetSum
long long countSubarraysWithSum(const vector<long long>& a, long long targetSum) {
    int n = (int)a.size() - 1;
    map<long long, long long> freqPref;
    freqPref[0] = 1; // Tương ứng với pref[0] = 0 trước khi duyệt phần tử đầu tiên

    long long curPref = 0;
    long long ans = 0;
    for (int r = 1; r <= n; r++) {
        curPref += a[r];
        long long need = curPref - targetSum;
        if (freqPref.count(need)) {
            ans += freqPref[need];
        }
        freqPref[curPref]++;
    }
    return ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cout << "=== PHAN A: TRUY VAN TONG DOAN [L, R] TRONG O(1) ===" << '\n';
    // Chỉ số 1-based: bỏ trống vị trí 0
    vector<long long> a = {0, 4, -2, 7, 1, -5, 10};
    vector<long long> pref = buildPrefix1D(a);

    vector<pair<int, int>> queries = {{1, 6}, {1, 3}, {2, 5}, {4, 4}};
    for (const pair<int, int>& q : queries) {
        int l = q.first, r = q.second;
        cout << "Tong [" << l << ", " << r << "] = " << queryRange1D(pref, l, r) << '\n';
    }

    cout << "\n=== PHAN B: BAY TRAN INT VOI GIA TRI 10^9 ===" << '\n';
    vector<long long> bigArr = {0, 1000000000LL, 1000000000LL, 1000000000LL, 1000000000LL};
    vector<long long> bigPref = buildPrefix1D(bigArr);
    // Nếu dùng int thì 4 * 10^9 sẽ tràn ngưỡng 2,147,483,647!
    cout << "Tong 4 phan tu 10^9 (long long) = " << queryRange1D(bigPref, 1, 4) << '\n';

    cout << "\n=== PHAN C: DEM DOAN CON CO TONG BANG K (CO SO AM) ===" << '\n';
    vector<long long> b = {0, 2, -2, 2, 2, -2};
    long long target = 2;
    cout << "Day b = {2, -2, 2, 2, -2}, K = " << target << '\n';
    cout << "So doan con co tong bang K = " << countSubarraysWithSum(b, target) << '\n';

    return 0;
}
