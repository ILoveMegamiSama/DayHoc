/**
 * VÍ DỤ 01: NGĂN XẾP CƠ BẢN (LIFO) — BÀI TOÁN KIỂM TRA DÃY NGOẶC HỢP LỆ
 * Biên dịch: g++ -std=c++14 -O2 -Wall 01_NganXepCoBan_KhopNgoac.cpp -o 01_NganXepCoBan_KhopNgoac.exe
 */

#include <iostream>
#include <string>
#include <stack>

using namespace std;

bool kiemTraNgoacHopLe(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c); // Ngoặc mở: đẩy lên đỉnh ngăn xếp
        } else {
            // Gặp ngoặc đóng nhưng ngăn xếp rỗng -> Thiếu ngoặc mở tương ứng
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if (c == ')' && top != '(') return false;
            if (c == ']' && top != '[') return false;
            if (c == '}' && top != '{') return false;
        }
    }
    // Nếu hết chuỗi mà ngăn xếp vẫn còn phần tử -> Dư thừa ngoặc mở
    return st.empty();
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string s1 = "{[()]}";
    string s2 = "([)]";

    cout << "=== THỬ NGHIỆM KHỚP NGOẶC BẰNG NGĂN XẾP ===" << "\n";
    cout << "Chuỗi s1 = " << s1 << " -> " << (kiemTraNgoacHopLe(s1) ? "HỢP LỆ" : "SAI") << "\n";
    cout << "Chuỗi s2 = " << s2 << " -> " << (kiemTraNgoacHopLe(s2) ? "HỢP LỆ" : "SAI") << "\n";

    return 0;
}
