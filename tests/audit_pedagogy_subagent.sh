#!/usr/bin/env bash
set -e

DOC_FILE="00_NhapMon_LapTrinh_CPP/docs/bai_giang_nhap_mon_cpp.md"

if [ ! -f "$DOC_FILE" ]; then
  echo "[FAIL] Chưa tìm thấy file bài giảng: $DOC_FILE"
  exit 1
fi

echo "=== KÍCH HOẠT SUBAGENT GIÁM ĐỊNH SƯ PHẠM (PERSONA: NGƯỜI HỌC BÌNH THƯỜNG) ==="

PROMPT_FILE=$(mktemp /tmp/subagent_prompt_XXXXXX.txt)
cat << 'EOF' > "$PROMPT_FILE"
Bạn là một NGƯỜI HỌC BÌNH THƯỜNG (Ordinary Learner): đại diện cho một học sinh lớp 7 (12 tuổi) hoặc một người lớn bình thường lần đầu tiên tiếp cận lập trình, chưa từng biết gì về code, không có năng khiếu đặc biệt và vốn rất e ngại những thứ kỹ thuật máy tính phức tạp.

Nhiệm vụ của bạn là đọc toàn bộ bài giảng C++ sau đây và đưa ra bản nhận xét phản biện cực kỳ trung thực, thẳng thắn và chi tiết theo 4 tiêu chí:

1. Trải nghiệm cảm xúc & Tâm lý tiếp nhận:
   - Câu chuyện "Tiệm bánh mì và Anh phụ bếp thật thà" có cuốn hút, bình dị, dễ hình dung không?
   - Đọc xong bạn có còn cảm giác sợ hãi "lập trình là thứ siêu khó" nữa không?
   - Có từ ngữ nào mang tính "dân IT chuyên nghiệp", hàn lâm bị lọt vào làm bạn thấy xa lạ không?

2. Mức độ thấu hiểu bản chất nguồn gốc:
   - Bạn có thực sự thấm thía "Nếu không có cơ chế đó thì tai họa gì sẽ xảy ra trong gian bếp" trước khi nhìn thấy code C++ không?
   - Bạn có tự giải thích được:
     + TẠI SAO phải có dấu chấm phẩy `;` (tiếng chuông dứt lệnh)?
     + TẠI SAO phải có các loại hộp biến `int`, `double`, `string` và chuyện chia 5 cái bánh cho 2 người bị mất mẩu bánh lẻ?
     + TẠI SAO mũi tên `cin >>` và `cout <<` lại chĩa theo hai chiều ngược nhau?
   - Có điểm nào bạn cảm thấy bị ép phải "học vẹt" mà không hiểu lý do vì sao không?

3. Soi điểm gợn & Vùng bối rối (Friction Points):
   - Có câu văn, dòng code hay lời giải thích nào làm bạn phải đọc đi đọc lại mà vẫn thấy lấn cấn hoặc khó hiểu không? Hãy chỉ rõ (nếu có).

4. Khả năng tự tin thực hành:
   - Với tư cách người học bình thường, bạn có tự tin nhìn vào một đoạn code C++ cơ bản và giải thích được từng dòng lệnh đang giao việc gì cho máy tính không?

Cuối cùng, hãy chấm điểm trên thang điểm 100 và đưa ra kết luận: ĐẠT CHUẨN SƯ PHẠM (≥ 90 điểm) hay CẦN SỬA ĐỔI.

DƯỚI ĐÂY LÀ TOÀN VĂN BÀI GIẢNG CẦN THẨM ĐỊNH:
================================================================================
EOF

cat "$DOC_FILE" >> "$PROMPT_FILE"

# Gọi subagent qua CLI pi
OUTPUT=$(pi --no-session -p "@$PROMPT_FILE" "Hãy đóng vai Người Học Bình Thường và đưa ra bản thẩm định theo đúng yêu cầu.")
rm -f "$PROMPT_FILE"

echo "$OUTPUT"

if echo "$OUTPUT" | grep -qi "ĐẠT CHUẨN"; then
  echo "=== KẾT QUẢ: BÀI GIẢNG ĐẠT CHUẨN SƯ PHẠM CỦA NGƯỜI HỌC BÌNH THƯỜNG! ==="
  exit 0
else
  echo "=== KẾT QUẢ: BÀI GIẢNG CẦN ĐIỀU CHỈNH THÊM THEO GÓP Ý CỦA NGƯỜI HỌC BÌNH THƯỜNG ==="
  exit 1
fi
