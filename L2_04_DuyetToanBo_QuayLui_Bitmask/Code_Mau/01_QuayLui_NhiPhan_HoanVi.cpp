/**
 * BÀI L2-04: CÂY ĐỆ QUY, QUAY LUI & BITMASK TẬP CON
 * File 01: Khung Quay Lui Sinh Nhị Phân, Tổ Hợp, Hoán Vị & Làm Oracle Cho Máy Chấm (MOD-00)
 * Chuẩn CP C++14 (Pha 2 STL Lớp 9)
 */
#include <bits/stdc++.h>
using namespace std;

// 1. Sinh toàn bộ xâu nhị phân độ dài n: O(2^n * n)
void genBinary(int pos, int n, string& cur, vector<string>& out) {
    if (pos == n) {
        out.push_back(cur);
        return;
    }
    for (char ch : {'0', '1'}) {
        cur.push_back(ch);               // Chọn
        genBinary(pos + 1, n, cur, out); // Thử đệ quy
        cur.pop_back();                  // Trả lại trạng thái (Backtrack)
    }
}

// 2. Sinh tổ hợp chập k của {1..n}: O(C(n, k) * k)
// Dùng tham số start để dãy luôn tăng ngặt, tránh trùng hoán vị
void genComb(int start, int n, int k, vector<int>& cur, vector<vector<int>>& out) {
    if ((int)cur.size() == k) {
        out.push_back(cur);
        return;
    }
    // Cắt nhỏ vòng lặp: phải đủ phần tử còn lại cho đủ k
    int need = k - (int)cur.size();
    for (int v = start; v <= n - need + 1; v++) {
        cur.push_back(v);
        genComb(v + 1, n, k, cur, out);
        cur.pop_back();
    }
}

// 3. Sinh toàn bộ hoán vị của {1..n} bằng mảng đánh dấu used[]: O(n! * n)
void genPerm(int n, vector<int>& cur, vector<bool>& used, vector<vector<int>>& out) {
    if ((int)cur.size() == n) {
        out.push_back(cur);
        return;
    }
    for (int v = 1; v <= n; v++) {
        if (used[v]) continue;
        used[v] = true;                  // Chọn và đánh dấu đã dùng
        cur.push_back(v);
        genPerm(n, cur, used, out);      // Thử đệ quy
        cur.pop_back();                  // Trả lại phần tử
        used[v] = false;                 // Trả lại trạng thái chưa dùng
    }
}

// 4. Ứng dụng nối MOD-00 (Máy chấm):
// Viết hàm solveTrau bằng Quay lui C(n, 2) chắc chắn đúng để đối chứng với solveNhanh O(n log n)
void dfsPairSum(int idx, int picked, long long curSum, const vector<long long>& a, long long target, bool& found) {
    if (found) return;
    if (picked == 2) {
        if (curSum == target) found = true;
        return;
    }
    if (idx == (int)a.size()) return;
    // Nhánh 1: chọn a[idx]
    dfsPairSum(idx + 1, picked + 1, curSum + a[idx], a, target, found);
    // Nhánh 2: bỏ qua a[idx]
    dfsPairSum(idx + 1, picked, curSum, a, target, found);
}

bool solveTrau(const vector<long long>& a, long long target) {
    bool found = false;
    dfsPairSum(0, 0, 0LL, a, target, found);
    return found;
}

bool solveNhanh(vector<long long> a, long long target) {
    sort(a.begin(), a.end());
    int n = (int)a.size();
    for (int i = 0; i < n; i++) {
        long long need = target - a[i];
        auto it = lower_bound(a.begin() + i + 1, a.end(), need);
        if (it != a.end() && *it == need) {
            return true;
        }
    }
    return false;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Minh họa 1: Xâu nhị phân n = 3
    string s;
    vector<string> bins;
    genBinary(0, 3, s, bins);
    cout << "Nhi phan n=3 (" << bins.size() << " xau): ";
    for (int i = 0; i < (int)bins.size(); i++) {
        cout << bins[i] << (i + 1 == (int)bins.size() ? '\n' : ' ');
    }

    // Minh họa 2: Tổ hợp C(4, 2)
    vector<int> cur;
    vector<vector<int>> combs;
    genComb(1, 4, 2, cur, combs);
    cout << "To hop C(4, 2) (" << combs.size() << " cach): ";
    for (const auto& c : combs) {
        cout << '{' << c[0] << ',' << c[1] << "} ";
    }
    cout << '\n';

    // Minh họa 3: Hoán vị n = 3
    vector<bool> used(4, false);
    vector<vector<int>> perms;
    genPerm(3, cur, used, perms);
    cout << "Hoan vi n=3 (" << perms.size() << " cach):\n";
    for (const auto& p : perms) {
        cout << "  " << p[0] << ' ' << p[1] << ' ' << p[2] << '\n';
    }

    // Minh họa 4: Stress Test (MOD-00) với 200 bộ test ngẫu nhiên n <= 8
    mt19937 rng(2026);
    int mismatches = 0;
    for (int tc = 0; tc < 200; tc++) {
        int n = (int)(rng() % 7) + 2; // 2..8
        vector<long long> a(n);
        for (int i = 0; i < n; i++) {
            a[i] = (long long)(rng() % 21) - 10; // [-10..10]
        }
        long long target = (long long)(rng() % 25) - 12;
        if (solveTrau(a, target) != solveNhanh(a, target)) {
            mismatches++;
        }
    }
    cout << "Stress test 200 test (N <= 8): " << (mismatches == 0 ? "AC 200/200" : "CO LOI WA") << '\n';
    return 0;
}
