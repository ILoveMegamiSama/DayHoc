/**
 * VÍ DỤ 02: NGĂN XẾP ĐƠN ĐIỆU (MONOTONIC STACK)
 * Tìm phần tử lớn hơn gần nhất bên trái cho mọi vị trí i trong O(N).
 * Biên dịch: g++ -std=c++14 -O2 -Wall 02_NganXepDonDieu_PhanTuLonHonGanNhat.cpp -o 02_NganXepDonDieu_PhanTuLonHonGanNhat.exe
 */

#include <iostream>
#include <vector>
#include <stack>

using namespace std;

// Trả về mảng L[i] là chỉ số phần tử gần nhất bên trái lớn hơn a[i]
// Nếu không có phần tử nào lớn hơn, L[i] = -1
vector<int> timLonHonBenTrai(const vector<int>& a) {
    int n = a.size();
    vector<int> L(n, -1);
    stack<int> st; // Lưu CHỈ SỐ các phần tử theo thứ tự giảm dần giá trị từ đáy lên đỉnh

    for (int i = 0; i < n; i++) {
        // Loại bỏ các phần tử bị a[i] che khuất (nhỏ hơn hoặc bằng a[i])
        while (!st.empty() && a[st.top()] <= a[i]) {
            st.pop();
        }
        // Đỉnh ngăn xếp hiện tại chính là người cao hơn gần nhất bên trái
        if (!st.empty()) {
            L[i] = st.top();
        }
        // Đẩy chỉ số i vào ngăn xếp
        st.push(i);
      }
    return L;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<int> a = {2, 5, 3, 7, 8, 1, 9};
    vector<int> L = timLonHonBenTrai(a);

    cout << "=== PHẦN TỬ LỚN HƠN GẦN NHẤT BÊN TRÁI ===" << "\n";
    for (int i = 0; i < (int)a.size(); i++) {
        cout << "Vị trí " << i << " (a[" << i << "] = " << a[i] << "): ";
        if (L[i] == -1) cout << "Không có (L[i] = -1)\n";
        else cout << "Tại vị trí " << L[i] << " (a[" << L[i] << "] = " << a[L[i]] << ")\n";
    }

    return 0;
}
