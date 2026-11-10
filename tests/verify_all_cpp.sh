#!/usr/bin/env bash
set -e

echo "=== KIỂM TRA BIÊN DỊCH C++14 TOÀN BỘ REPO ==="
FAILED=0
TOTAL=0

# Tìm tất cả file .cpp trong Code_Mau của các bài giảng mới và MayCham
while IFS= read -r file; do
  TOTAL=$((TOTAL + 1))
  OUT="/tmp/test_bin_$TOTAL"
  echo -n "Biên dịch [$TOTAL]: $file ... "
  if g++ -std=c++14 -O2 -Wall "$file" -o "$OUT" 2>/tmp/compile_err; then
    echo "OK"
    rm -f "$OUT"
  else
    echo "FAILED"
    cat /tmp/compile_err
    FAILED=$((FAILED + 1))
  fi
done < <(find 00_* 01_* 02_* 03_* 04_* MayCham/Code_Mau -type f -name "*.cpp" 2>/dev/null | sort)

echo "=== TỔNG KẾT: Đã kiểm tra $TOTAL file .cpp (Lỗi: $FAILED) ==="
if [ $FAILED -ne 0 ]; then
  exit 1
fi
exit 0
