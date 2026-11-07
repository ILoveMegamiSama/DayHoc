#include <bits/stdc++.h>
using namespace std;

/*
 * DEMO 01: CƠ CHẾ BUFFER ("CHIẾC XE TẢI GOM HÀNG") & LỆNH .close()
 * -----------------------------------------------------------------
 * Đổi BUG_QUEN_CLOSE từ 0 sang 1 để thấy:
 * Khi ofstream chưa gọi .close(), dữ liệu mới nằm trong RAM (Buffer),
 * chưa được đổ xuống ổ cứng -> lúc mở file ra đọc sẽ thấy file RỖNG!
 */
#ifndef BUG_QUEN_CLOSE
#define BUG_QUEN_CLOSE 0
#endif

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Bước 1: Mở luồng ghi vào file "demo_buffer.inp"
    ofstream inp("demo_buffer.inp");
    inp << 5 << "\n";
    inp << "10 20 30 40 50\n";

#if BUG_QUEN_CLOSE == 0
    // CHUẨN: Đóng luồng để ép "xe tải Buffer" đổ dữ liệu xuống ổ cứng ngay lập tức
    inp.close();
    cout << "[Che do CHUAN] Da goi inp.close() truoc khi doc.\n";
#else
    // LỖI: Quên inp.close() بينما biến inp vẫn đang sống trong hàm!
    cout << "[Che do LOI] Quen goi inp.close()! Du lieu con ket trong Buffer RAM.\n";
#endif

    // Bước 2: Giả lập chương trình bài làm mở file "demo_buffer.inp" ra đọc ngay lúc đó
    ifstream doc_thu("demo_buffer.inp");
    int n = -1;
    if (!(doc_thu >> n)) {
        cout << "-> KET QUA DOC FILE: File RONG! Khong doc duoc so N nao ca!\n";
    } else {
        cout << "-> KET QUA DOC FILE: Doc thanh cong N = " << n << "\n";
    }
    doc_thu.close();
    return 0;
}
