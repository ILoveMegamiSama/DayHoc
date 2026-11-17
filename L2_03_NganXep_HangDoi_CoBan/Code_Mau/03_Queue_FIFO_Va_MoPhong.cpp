#include <bits/stdc++.h>
using namespace std;

/*
 * Bài L2-03 - Code Mẫu 3:
 * Hàng đợi std::queue (FIFO) cơ bản, phân biệt .front() vs .top(),
 * sinh N số nhị phân đầu tiên, mô phỏng vòng tròn (Josephus) O(N)
 * và mở đường loang từng lớp (BFS) với mảng đánh dấu dist[].
 */

void printFirstNBinary(int n) {
    queue<string> q;
    q.push("1");
    cout << n << " so nhi phan dau tien: ";
    for (int i = 0; i < n; i++) {
        string cur = q.front();
        q.pop();
        cout << cur << (i + 1 < n ? ' ' : '\n');
        q.push(cur + "0");
        q.push(cur + "1");
    }
}

void simulateCircle(int n) {
    queue<int> q;
    for (int i = 1; i <= n; i++) q.push(i);

    cout << "Thu tu loai vong tron n = " << n << ": ";
    while (!q.empty()) {
        // Nguoi dau hang duoc giu lai -> chuyen xuong cuoi hang
        q.push(q.front());
        q.pop();
        // Nguoi ke tiep bi loai khoi vong tron
        cout << q.front() << ' ';
        q.pop();
    }
    cout << '\n';
}

int minStepsTwoButtons(int n, int m) {
    if (n >= m) return n - m;
    const int LIMIT = 20000;
    vector<int> dist(LIMIT + 1, -1);
    queue<int> q;

    dist[n] = 0;
    q.push(n);

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        if (u == m) return dist[u];

        int nxt[2] = {u - 1, u * 2};
        for (int v : nxt) {
            if (v >= 1 && v <= LIMIT && dist[v] == -1) {
                // QUY TẮC VÀNG: Đánh dấu dist[v] NGAY KHI đẩy vào hàng đợi
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return -1;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Thao tác cơ bản O(1) với std::queue<int>
    queue<int> q;
    q.push(100);
    q.push(200);
    q.push(300);
    if (!q.empty()) {
        cout << "Dau hang q.front() = " << q.front()
             << ", Cuoi hang q.back() = " << q.back() << '\n';
        q.pop(); // Xóa 100 ở đầu hàng
    }
    cout << "Sau pop, dau hang moi = " << q.front() << '\n';

    // 2. Sinh số nhị phân tăng dần bằng FIFO
    printFirstNBinary(6);

    // 3. Mô phỏng vòng tròn loại cách 1 người trong O(N)
    simulateCircle(7);

    // 4. Mở đường loang từng lớp (BFS): từ 4 lên 6 (4 -> 3 -> 6 mất 2 bước)
    cout << "So buoc it nhat tu 4 den 6 = " << minStepsTwoButtons(4, 6) << '\n';

    return 0;
}
