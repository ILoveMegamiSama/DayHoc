/**
 * BÀI L2-05: THUẬT TOÁN THAM LAM & ĐIỂM GÃY CỦA THAM LAM
 * File 02: Tham Lam Động Với Min-Heap (Stick Divisions) & Exchange Argument (Tasks and Deadlines)
 * Chuẩn CP C++14 (Pha 2 STL Lớp 9)
 */
#include <bits/stdc++.h>
using namespace std;

// 1. Nối dây / Stick Divisions (CSES-1161) bằng Min-Heap: O(N log N)
// Lưu ý bắt buộc dùng long long để tránh tràn số int khi cộng dồn chi phí!
long long stickDivisionsMinHeap(const vector<long long>& pieces) {
    priority_queue<long long, vector<long long>, greater<long long>> minPq;
    for (long long x : pieces) {
        minPq.push(x);
    }

    long long totalCost = 0;
    while ((int)minPq.size() > 1) {
        long long a = minPq.top();
        minPq.pop();
        long long b = minPq.top();
        minPq.pop();

        long long merged = a + b;
        totalCost += merged;
        minPq.push(merged);
    }
    return totalCost;
}

// Cách sai: chỉ sort 1 lần rồi gộp tuần tự từ trái qua phải (không cập nhật lại vị trí sợi mới)
long long stickDivisionsStaticSortWrong(vector<long long> pieces) {
    if ((int)pieces.size() <= 1) return 0;
    sort(pieces.begin(), pieces.end());
    long long cur = pieces[0];
    long long totalCost = 0;
    for (int i = 1; i < (int)pieces.size(); i++) {
        cur += pieces[i];
        totalCost += cur;
    }
    return totalCost;
}

// 2. Tasks and Deadlines (CSES-1630): chứng minh bằng Exchange Argument
// Tối đa hóa sum(d_i - f_i) = sum(d_i) - sum(f_i) -> sắp xếp theo thời lượng a_i TĂNG DẦN!
struct Task {
    long long duration;
    long long deadline;
};

bool cmpByDuration(const Task& x, const Task& y) {
    if (x.duration != y.duration) return x.duration < y.duration;
    return x.deadline < y.deadline;
}

bool cmpByDeadlineWrong(const Task& x, const Task& y) {
    if (x.deadline != y.deadline) return x.deadline < y.deadline;
    return x.duration < y.duration;
}

long long calcReward(vector<Task> tasks, bool (*cmp)(const Task&, const Task&)) {
    sort(tasks.begin(), tasks.end(), cmp);
    long long curTime = 0;
    long long totalReward = 0;
    for (int i = 0; i < (int)tasks.size(); i++) {
        curTime += tasks[i].duration;
        totalReward += tasks[i].deadline - curTime;
    }
    return totalReward;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<long long> sticks = {2, 3, 3, 4};
    cout << "Noi day sort 1 lan (SAI): " << stickDivisionsStaticSortWrong(sticks) << '\n';
    cout << "Noi day Min-Heap (CHUAN): " << stickDivisionsMinHeap(sticks) << '\n';

    vector<Task> tasks = {{6, 15}, {2, 10}, {4, 20}};
    cout << "Tasks theo han chot d (SAI): " << calcReward(tasks, cmpByDeadlineWrong) << '\n';
    cout << "Tasks theo thoi luong a (CHUAN): " << calcReward(tasks, cmpByDuration) << '\n';
    return 0;
}
