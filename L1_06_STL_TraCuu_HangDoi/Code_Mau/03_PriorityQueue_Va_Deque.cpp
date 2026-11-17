/**
 * BÀI L1-06: BỘ CÔNG CỤ STL (SET, MAP, PRIORITY_QUEUE, DEQUE)
 * File mẫu 03: std::priority_queue (Max-Heap / Min-Heap) & std::deque (Hàng Đợi Hai Đầu)
 *
 * MỤC TIÊU HỌC TẬP:
 * 1. Phân biệt Max-Heap mặc định priority_queue<T> và Min-Heap priority_queue<T, vector<T>, greater<T>>.
 * 2. Luôn bốc được phần tử lớn nhất / nhỏ nhất trong O(log N) mà không phải sort() lại mỗi bước.
 * 3. Làm chủ std::deque<T>: push_front, push_back, pop_front, pop_back, truy cập dq[i] trong O(1).
 * 4. Nhớ luôn kiểm tra !pq.empty() / !dq.empty() trước khi gọi top(), front(), back(), pop().
 */

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // =========================================================================
    // PHẦN A: Max-Heap & Min-Heap với std::priority_queue
    // =========================================================================
    cout << "=== PHAN A: MAX-HEAP VA MIN-HEAP ===" << '\n';
    priority_queue<int> maxPq;
    maxPq.push(15);
    maxPq.push(40);
    maxPq.push(25);
    cout << "Max-Heap top (lon nhat): " << maxPq.top() << '\n'; // 40
    maxPq.pop(); // Bỏ 40 trong O(log N)
    cout << "Max-Heap top sau pop : " << maxPq.top() << '\n'; // 25

    // Min-Heap: Đưa phần tử NHỎ NHẤT lên đỉnh bằng greater<int>
    priority_queue<int, vector<int>, greater<int>> minPq;
    minPq.push(15);
    minPq.push(40);
    minPq.push(25);
    cout << "Min-Heap top (nho nhat): " << minPq.top() << '\n'; // 15

    // =========================================================================
    // PHẦN B: Ứng dụng Max-Heap (kiểu ABC141-D): Dùng M phiếu giảm giá chia đôi
    // Mỗi lần luôn lấy món đắt nhất chia đôi rồi bỏ lại vào Heap -> O((N + M) log N)
    // =========================================================================
    cout << "\n=== PHAN B: DUNG PHIEU GIAM GIA BANG MAX-HEAP ===" << '\n';
    vector<long long> prices = {10, 25, 18};
    int tickets = 3;
    priority_queue<long long> pq(prices.begin(), prices.end());
    for (int i = 0; i < tickets; i++) {
        if (pq.empty()) break;
        long long best = pq.top();
        pq.pop();
        pq.push(best / 2);
    }
    long long total = 0;
    while (!pq.empty()) {
        total += pq.top();
        pq.pop();
    }
    cout << "Tong tien nho nhat sau 3 phieu giam gia: " << total << '\n';

    // =========================================================================
    // PHẦN C: std::deque — Hàng đợi hai đầu O(1) (push_front / push_back)
    // =========================================================================
    cout << "\n=== PHAN C: STD::DEQUE HAI DAU O(1) ===" << '\n';
    deque<int> dq;
    vector<int> incoming = {4, 2, 5, 1, 3};
    // Bài toán xếp dãy nhỏ nhất theo từ điển (kiểu CF 1579E1):
    // Số mới <= đầu hiện tại thì nhét vào đầu (push_front), ngược lại nhét vào cuối (push_back)!
    for (int x : incoming) {
        if (dq.empty() || x <= dq.front()) {
            dq.push_front(x);
        } else {
            dq.push_back(x);
        }
    }

    cout << "Day ket qua trong deque: ";
    for (int i = 0; i < (int)dq.size(); i++) {
        cout << dq[i] << (i + 1 < (int)dq.size() ? ' ' : '\n');
    }

    dq.pop_front(); // Bỏ đầu O(1)
    dq.pop_back();  // Bỏ cuối O(1)
    cout << "Sau khi bo 2 dau: front = " << dq.front() << ", back = " << dq.back() << '\n';

    return 0;
}
