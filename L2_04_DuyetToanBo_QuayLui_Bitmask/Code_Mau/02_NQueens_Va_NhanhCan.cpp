/**
 * BÀI L2-04: CÂY ĐỆ QUY, QUAY LUI & BITMASK TẬP CON
 * File 02: N-Queens (Kiểm Tra Đường Chéo O(1)) & Nhánh Cận (Branch & Bound)
 * Chuẩn CP C++14 (Pha 2 STL Lớp 9)
 */
#include <bits/stdc++.h>
using namespace std;

// 1. Bài toán N-Queens: xếp n quân hậu sao cho không 2 quân nào ăn nhau
// Vì mỗi hàng chỉ có đúng 1 hậu, ta quay lui từng hàng r = 0..n-1
// Đánh dấu cột và 2 đường chéo trong O(1):
//   - Đường chéo chính: r - c không đổi -> dịch + n để chỉ số luôn >= 0
//   - Đường chéo phụ:   r + c không đổi
struct NQueensSolver {
    int n;
    int totalWays = 0;
    vector<int> colPos;
    vector<bool> usedCol, diagMain, diagAnti;
    vector<int> firstSol;

    NQueensSolver(int boardSize)
        : n(boardSize),
          colPos(boardSize, -1),
          usedCol(boardSize, false),
          diagMain(2 * boardSize + 1, false),
          diagAnti(2 * boardSize + 1, false) {}

    void backtrack(int r) {
        if (r == n) {
            if (totalWays == 0) firstSol = colPos;
            totalWays++;
            return;
        }
        for (int c = 0; c < n; c++) {
            if (usedCol[c] || diagMain[r - c + n] || diagAnti[r + c]) continue;

            // Chọn ô (r, c)
            colPos[r] = c;
            usedCol[c] = diagMain[r - c + n] = diagAnti[r + c] = true;

            backtrack(r + 1);

            // Trả lại trạng thái
            usedCol[c] = diagMain[r - c + n] = diagAnti[r + c] = false;
            colPos[r] = -1;
        }
    }
};

// 2. Nhánh cận (Branch & Bound):
// Cho mảng n phần tử dương w[i], tìm tổng tập con LỚN NHẤT không vượt quá S.
void searchRaw(int idx, long long curSum, long long S, const vector<long long>& w, long long& bestSum, long long& calls) {
    calls++;
    if (idx == (int)w.size()) {
        if (curSum <= S && curSum > bestSum) bestSum = curSum;
        return;
    }
    searchRaw(idx + 1, curSum + w[idx], S, w, bestSum, calls);
    searchRaw(idx + 1, curSum, S, w, bestSum, calls);
}

void searchBranchAndBound(int idx, long long curSum, long long S,
                          const vector<long long>& w,
                          const vector<long long>& suffixSum,
                          long long& bestSum, long long& calls) {
    calls++;
    // Cắt nhánh 1 (Vượt ngưỡng): vì mọi w[i] > 0 nên không thể giảm curSum nữa
    if (curSum > S) return;

    if (curSum > bestSum) bestSum = curSum;
    if (bestSum == S) return; // Đạt tối ưu tuyệt đối

    if (idx == (int)w.size()) return;

    // Cắt nhánh 2 (Cận lạc quan): lấy hết phần còn lại cũng không vượt bestSum
    if (curSum + suffixSum[idx] <= bestSum) return;

    // Thử nhánh chọn trước (ưu tiên nhánh hứa hẹn lớn để nâng kỷ lục bestSum sớm)
    searchBranchAndBound(idx + 1, curSum + w[idx], S, w, suffixSum, bestSum, calls);
    searchBranchAndBound(idx + 1, curSum, S, w, suffixSum, bestSum, calls);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Chạy N-Queens với N = 8
    NQueensSolver solver8(8);
    solver8.backtrack(0);
    cout << "8-Queens co tat ca: " << solver8.totalWays << " nghiem\n";
    cout << "Nghiem dau tien (cot theo tung hang 0..7): ";
    for (int i = 0; i < 8; i++) {
        cout << solver8.firstSol[i] << (i == 7 ? '\n' : ' ');
    }

    // So sánh Quay lui thô vs Nhánh cận
    vector<long long> w = {45, 38, 31, 27, 22, 19, 15, 14, 11, 9, 8, 6, 5, 4, 3, 2};
    long long S = 100;
    // Sắp xếp giảm dần giúp sớm chạm kỷ lục gần S
    sort(w.rbegin(), w.rend());

    int n = (int)w.size();
    vector<long long> suffixSum(n + 1, 0);
    for (int i = n - 1; i >= 0; i--) {
        suffixSum[i] = suffixSum[i + 1] + w[i];
    }

    long long bestRaw = 0, callsRaw = 0;
    searchRaw(0, 0, S, w, bestRaw, callsRaw);

    long long bestBB = 0, callsBB = 0;
    searchBranchAndBound(0, 0, S, w, suffixSum, bestBB, callsBB);

    cout << "Tong lon nhat <= " << S << ":\n";
    cout << "  Quay lui tho  : best = " << bestRaw << ", so loi goi = " << callsRaw << '\n';
    cout << "  Nhanh can B&B : best = " << bestBB  << ", so loi goi = " << callsBB << '\n';
    return 0;
}
