#!/usr/bin/env bash
set -e

echo "=== KIỂM TRA KỸ THUẬT: CHUYÊN ĐỀ 00_NHAPMON_LAPTRINH_CPP ==="

REQ_FILES=(
  "00_NhapMon_LapTrinh_CPP/docs/bai_giang_nhap_mon_cpp.md"
  "00_NhapMon_LapTrinh_CPP/Code_Mau/01_ChiecChuong_Va_CanhCua_Main.cpp"
  "00_NhapMon_LapTrinh_CPP/Code_Mau/02_NhungChiecHop_BienVaKieu.cpp"
  "00_NhapMon_LapTrinh_CPP/Code_Mau/03_LoaVaKheNhan_TiemBanhMi.cpp"
  "00_NhapMon_LapTrinh_CPP/index.html"
  "00_NhapMon_LapTrinh_CPP/lesson-data.js"
)

for f in "${REQ_FILES[@]}"; do
  if [ ! -f "$f" ]; then
    echo "[FAIL] File bắt buộc không tồn tại: $f"
    exit 1
  fi
  echo "[PASS] Tồn tại file: $f"
done

echo "--- 1. Kiểm tra biên dịch C++14 (-std=c++14 -Wall -Wextra -Werror) ---"
for cpp in 00_NhapMon_LapTrinh_CPP/Code_Mau/*.cpp; do
  echo -n "Đang biên dịch $cpp ... "
  OUT="/tmp/test_cpp_$(basename "$cpp" .cpp)"
  g++ -std=c++14 -Wall -Wextra -Werror "$cpp" -o "$OUT"
  echo "OK"
  rm -f "$OUT"
done

echo "--- 2. Kiểm tra cú pháp JavaScript lesson-data.js ---"
node -c 00_NhapMon_LapTrinh_CPP/lesson-data.js
echo "[PASS] Cú pháp lesson-data.js hợp lệ."

echo "--- 3. Kiểm tra tích hợp vào shared/portal-data.js ---"
if grep -q "nhap_mon_cpp" shared/portal-data.js; then
  echo "[PASS] Đã tìm thấy node nhap_mon_cpp trong portal-data.js."
else
  echo "[FAIL] Chưa tích hợp nhap_mon_cpp vào shared/portal-data.js."
  exit 1
fi

echo "=== HOÀN TẤT: TẤT CẢ KIỂM TRA KỸ THUẬT ĐỀU ĐẠT CHUẨN! ==="
exit 0
