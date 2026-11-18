#include <bits/stdc++.h>
using namespace std;

/*
 * Bài L2-03 - Code Mẫu 1:
 * Ngăn xếp std::stack (LIFO) cơ bản, kiểm tra an toàn !st.empty()
 * và khử đệ quy sâu N = 10^6 bằng stack tường minh (tránh tràn ~8MB Call Stack).
 */

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // 1. Thao tác cơ bản O(1) với std::stack<int>
    stack<int> st;
    st.push(10); // Đáy stack: [10]
    st.push(25); // [10, 25]
    st.push(40); // Đỉnh stack: [10, 25, 40]

    cout << "Kich thuoc stack: " << (int)st.size() << '\n';
    if (!st.empty()) {
        // BẮT BUỘC đọc top() TRƯỚC khi pop() vì pop() trả về void
        int dinh = st.top();
        st.pop();
        cout << "Phan tu vua rut ra: " << dinh << '\n';
    }
    if (!st.empty()) {
        cout << "Dinh moi hien tai: " << st.top() << '\n';
    }

    // 2. Khử đệ quy chia đoạn [L, R] bằng stack tường minh (O(N), không tràn Call Stack)
    // Đẩy nửa PHẢI trước, nửa TRÁI sau để nửa TRÁI luôn nằm trên đỉnh và chạy trước!
    stack<pair<int, int>> tasks;
    tasks.push({1, 6});
    cout << "Thu tu duyet la trai -> phai bang stack tuong minh: ";
    while (!tasks.empty()) {
        pair<int, int> cur = tasks.top();
        tasks.pop();
        int l = cur.first, r = cur.second;
        if (l == r) {
            cout << l << ' ';
            continue;
        }
        int mid = l + (r - l) / 2;
        tasks.push({mid + 1, r}); // Đẩy nhánh phải xuống dưới
        tasks.push({l, mid});     // Đẩy nhánh trái lên trên để pop ra trước
    }
    cout << '\n';

    // 3. Thử nghiệm độ sâu N = 1,000,000 bằng std::stack (nằm trên Heap, miễn nhiễm Stack Overflow 8MB)
    const int N = 1000000;
    stack<int> bigSt;
    for (int i = 1; i <= N; i++) {
        bigSt.push(i);
    }
    long long tong = 0;
    while (!bigSt.empty()) {
        tong += bigSt.top();
        bigSt.pop();
    }
    cout << "Tong 1.." << N << " qua stack tuong minh = " << tong << '\n';

    return 0;
}
