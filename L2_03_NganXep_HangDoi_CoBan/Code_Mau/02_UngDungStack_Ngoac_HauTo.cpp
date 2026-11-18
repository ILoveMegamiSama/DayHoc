#include <bits/stdc++.h>
using namespace std;

/*
 * Bài L2-03 - Code Mẫu 2:
 * 3 ứng dụng kinh điển của std::stack:
 * 1. Kiểm tra dãy ngoặc nhiều loại ()[]{} (đủ cả hai chốt chặn st.empty()).
 * 2. Tính giá trị biểu thức hậu tố (RPN) với stack<long long>.
 * 3. Khử cặp ký tự liền kề giống nhau & kiểm tra hoán vị qua ngõ cụt (SPOJ STPAR).
 */

bool isValidBrackets(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            // Chốt chặn 1: Gặp ngoặc đóng khi stack rỗng -> sai ngay!
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if (c == ')' && top != '(') return false;
            if (c == ']' && top != '[') return false;
            if (c == '}' && top != '{') return false;
        }
    }
    // Chốt chặn 2: Kết thúc chuỗi, stack phải rỗng hoàn toàn!
    return st.empty();
}

long long evalRPN(const vector<string>& tokens) {
    stack<long long> st;
    for (const string& tok : tokens) {
        if (tok == "+" || tok == "-" || tok == "*" || tok == "/") {
            // BẮT BUỘC: Phần tử pop trước là toán hạng PHẢI (b), pop sau là toán hạng TRÁI (a)
            long long b = st.top(); st.pop();
            long long a = st.top(); st.pop();
            if (tok == "+") st.push(a + b);
            else if (tok == "-") st.push(a - b);
            else if (tok == "*") st.push(a * b);
            else st.push(a / b);
        } else {
            st.push(stoll(tok));
        }
    }
    return st.top();
}

string removeAdjacentDuplicates(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (!st.empty() && st.top() == c) {
            st.pop();
        } else {
            st.push(c);
        }
    }
    string res;
    while (!st.empty()) {
        res.push_back(st.top());
        st.pop();
    }
    reverse(res.begin(), res.end());
    return res;
}

bool canOrderPermutation(const vector<int>& a) {
    stack<int> sideStreet;
    int need = 1;
    for (int x : a) {
        while (!sideStreet.empty() && sideStreet.top() == need) {
            sideStreet.pop();
            need++;
        }
        if (x == need) {
            need++;
        } else {
            sideStreet.push(x);
        }
    }
    while (!sideStreet.empty() && sideStreet.top() == need) {
        sideStreet.pop();
        need++;
    }
    return need == (int)a.size() + 1;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cout << "Ngoac \"([]{})\": " << (isValidBrackets("([]{})") ? "HOP LE" : "KHONG HOP LE") << '\n';
    cout << "Ngoac \"())\": " << (isValidBrackets("())") ? "HOP LE" : "KHONG HOP LE") << '\n';
    cout << "Ngoac \"(()\": " << (isValidBrackets("(()") ? "HOP LE" : "KHONG HOP LE") << '\n';

    vector<string> expr = {"5", "1", "2", "+", "4", "*", "+", "3", "-"};
    cout << "Gia tri RPN (5 + (1 + 2) * 4 - 3) = " << evalRPN(expr) << '\n';

    cout << "Khu cap ke \"abbaca\" -> \"" << removeAdjacentDuplicates("abbaca") << "\"\n";
    cout << "Hoan vi {5, 1, 2, 4, 3}: " << (canOrderPermutation({5, 1, 2, 4, 3}) ? "yes" : "no") << '\n';
    cout << "Hoan vi {1, 3, 4, 2, 5}: " << (canOrderPermutation({1, 3, 4, 2, 5}) ? "yes" : "no") << '\n';

    return 0;
}
