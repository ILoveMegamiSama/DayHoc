#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

TARGET_DIR=""

if [ $# -eq 1 ]; then
  if [ "$1" = "--lesson" ] || [ "${1#--}" != "$1" ]; then
    if [[ "$1" == --lesson=* ]]; then
      TARGET_DIR="${1#--lesson=}"
      if [ -z "$TARGET_DIR" ]; then
        echo "[FAIL] Thiếu giá trị thư mục trong --lesson=<dir>" >&2
        exit 1
      fi
    else
      echo "[FAIL] Cách dùng: bash tests/verify_all_cpp.sh [<dir> | --lesson <dir>]" >&2
      exit 1
    fi
  else
    TARGET_DIR="$1"
    if [ -z "$TARGET_DIR" ]; then
      echo "[FAIL] Giá trị thư mục không được để trống" >&2
      exit 1
    fi
  fi
elif [ $# -eq 2 ] && [ "$1" = "--lesson" ]; then
  TARGET_DIR="$2"
  if [ -z "$TARGET_DIR" ]; then
    echo "[FAIL] Thiếu giá trị thư mục sau cờ --lesson" >&2
    exit 1
  fi
elif [ $# -ne 0 ]; then
  echo "[FAIL] Tham số không hợp lệ. Cách dùng: bash tests/verify_all_cpp.sh [<dir> | --lesson <dir>]" >&2
  exit 1
fi

TMP_DIR="$(mktemp -d /tmp/dayhoc_cpp_XXXXXX)"
trap 'rm -rf "$TMP_DIR"' EXIT

declare -a SEARCH_ROOTS=()

if [ -n "$TARGET_DIR" ]; then
  TARGET_DIR="${TARGET_DIR%/}"
  if [ ! -d "$TARGET_DIR" ]; then
    echo "[FAIL] Thư mục không tồn tại: $TARGET_DIR" >&2
    exit 1
  fi
  echo "=== KIỂM TRA BIÊN DỊCH C++14 CHO BÀI GIẢNG: $TARGET_DIR ==="
  SEARCH_ROOTS+=("$TARGET_DIR")
else
  echo "=== KIỂM TRA BIÊN DỊCH C++14 TOÀN BỘ REPO ==="
  shopt -s nullglob
  for candidate in 00_* 00b_* 01_* 02_* 03_* 04_* L1_* L2_* MayCham/Code_Mau; do
    if [ -d "$candidate" ]; then
      SEARCH_ROOTS+=("$candidate")
    fi
  done
  shopt -u nullglob
fi

if [ ${#SEARCH_ROOTS[@]} -eq 0 ]; then
  echo "[FAIL] Không tìm thấy thư mục mã nguồn C++ nào để kiểm tra." >&2
  exit 1
fi

FAILED=0
TOTAL=0

while IFS= read -r file; do
  TOTAL=$((TOTAL + 1))
  OUT="$TMP_DIR/bin_$TOTAL"
  ERR="$TMP_DIR/err_$TOTAL.log"
  echo -n "Biên dịch [$TOTAL]: $file ... "
  if g++ -std=c++14 -O2 -Wall "$file" -o "$OUT" 2>"$ERR"; then
    echo "OK"
    rm -f "$OUT"
  else
    echo "FAILED"
    cat "$ERR"
    FAILED=$((FAILED + 1))
  fi
done < <(find "${SEARCH_ROOTS[@]}" -type f -name "*.cpp" | sort)

if [ "$TOTAL" -eq 0 ]; then
  echo "[FAIL] Không tìm thấy file .cpp nào trong phạm vi kiểm tra." >&2
  exit 1
fi

echo "=== TỔNG KẾT: Đã kiểm tra $TOTAL file .cpp (Lỗi: $FAILED) ==="
if [ "$FAILED" -ne 0 ]; then
  exit 1
fi
exit 0
