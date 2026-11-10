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

echo "--- 4. Kiểm tra khoảng cách tọa độ DAG (Chống tràn viền & chồng lấn) ---"
node -e '
const fs = require("fs");
const code = fs.readFileSync("shared/portal-data.js", "utf8");
const sandbox = { window: {} };
require("vm").runInNewContext(code, sandbox);
const nodes = sandbox.window.PORTAL_DATA.nodes;
const n0 = nodes.find(n => n.id === "nhap_mon_cpp");
const n1 = nodes.find(n => n.id === "may_cham");
const n2 = nodes.find(n => n.id === "de_quy_duoi");

if (n0.x - 90 < 0) {
  console.error("[FAIL] nhap_mon_cpp bi tran mep trai: x - 90 = " + (n0.x - 90));
  process.exit(1);
}
const gap01 = (n1.x - 90) - (n0.x + 90);
if (gap01 < 60) {
  console.error("[FAIL] Khoang cach giua nhap_mon va may_cham qua hep: " + gap01 + "px (yeu cau >= 60px)");
  process.exit(1);
}
console.log("[PASS] Tọa độ DAG hợp lệ, khoảng cách đẹp: " + gap01 + "px");
'


echo "=== HOÀN TẤT: TẤT CẢ KIỂM TRA KỸ THUẬT ĐỀU ĐẠT CHUẨN! ==="
exit 0
