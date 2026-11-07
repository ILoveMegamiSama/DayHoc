#!/usr/bin/env bash
set -euo pipefail
BASE="/home/paust/Projects/DayHoc/MayCham/Code_Mau"

FILES=(
  "$BASE/Demo_Nho_Tung_Phan/01_Buffer_QuenClose.cpp"
  "$BASE/Demo_Nho_Tung_Phan/02_Random_LoiSeedTime0.cpp"
  "$BASE/Demo_Nho_Tung_Phan/03_Random_GioiHanRand32767.cpp"
  "$BASE/Win_CodeBlocks/00_Template_MayCham/MAYCHAM.cpp"
  "$BASE/Win_CodeBlocks/00_Template_MayCham/BAI1.cpp"
  "$BASE/Win_CodeBlocks/00_Template_MayCham/BAI1_TRAU.cpp"
  "$BASE/Win_CodeBlocks/01_MaxSubarray/MAYCHAM.cpp"
  "$BASE/Win_CodeBlocks/01_MaxSubarray/MAXSUB.cpp"
  "$BASE/Win_CodeBlocks/01_MaxSubarray/MAXSUB_TRAU.cpp"
  "$BASE/Win_CodeBlocks/02_TruyVanDoan_TestManh/MAYCHAM.cpp"
  "$BASE/Win_CodeBlocks/02_TruyVanDoan_TestManh/QUERY.cpp"
  "$BASE/Win_CodeBlocks/02_TruyVanDoan_TestManh/QUERY_TRAU.cpp"
  "$BASE/Linux_Arch/01_MaxSubarray/MAYCHAM.cpp"
  "$BASE/Linux_Arch/01_MaxSubarray/MAXSUB.cpp"
  "$BASE/Linux_Arch/01_MaxSubarray/MAXSUB_TRAU.cpp"
  "$BASE/Linux_Arch/02_TruyVanDoan_TestManh/MAYCHAM.cpp"
  "$BASE/Linux_Arch/02_TruyVanDoan_TestManh/QUERY.cpp"
  "$BASE/Linux_Arch/02_TruyVanDoan_TestManh/QUERY_TRAU.cpp"
  "$BASE/Web_USACO_IDE/MAXSUB_AllInOne.cpp"
  "$BASE/Web_USACO_IDE/QUERY_AllInOne.cpp"
)

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

for f in "${FILES[@]}"; do
  [ -f "$f" ] || { echo "MISSING: $f"; exit 1; }
  g++ -std=c++14 -Wall -Wextra -Werror "$f" -o "$TMP_DIR/out.bin"
done

# Kiểm tra biên dịch khi bật các công tắc #define
g++ -std=c++14 -Wall -Werror -DBUG_QUEN_CLOSE=1 -DBUG_SEED_TRONG_HAM=1 "$BASE/Win_CodeBlocks/00_Template_MayCham/MAYCHAM.cpp" -o "$TMP_DIR/t1.bin"
g++ -std=c++14 -Wall -Werror -DBUG_QUEN_SORT=1 -DBUG_SAI_LR=1 -DBUG_TEST_YEU=1 "$BASE/Win_CodeBlocks/02_TruyVanDoan_TestManh/MAYCHAM.cpp" -o "$TMP_DIR/t2.bin"

# Chạy thực tế bản AllInOne để chắc chắn trả về kết quả chạy
g++ -std=c++14 "$BASE/Web_USACO_IDE/MAXSUB_AllInOne.cpp" -o "$TMP_DIR/maxsub_aio"
"$TMP_DIR/maxsub_aio" | grep -q "CORRECT"

g++ -std=c++14 "$BASE/Web_USACO_IDE/QUERY_AllInOne.cpp" -o "$TMP_DIR/query_aio"
"$TMP_DIR/query_aio" | grep -q "CORRECT"

echo "ALL C++ FILES COMPILED AND VERIFIED SUCCESSFULLY"
