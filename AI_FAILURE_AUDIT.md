# AI Failure Mode Audit

1. **Defect Description:** AI/Trình duyệt tải và lưu file âm thanh sai định dạng (lưu thành trang web/html thay vì mp3 thực sự), khiến trình duyệt báo lỗi "error occurred while loading the audio file".
   - **Diagnostic Method:** Sử dụng Audio Preview tích hợp của VS Code phát hiện file không thể đọc được.
   - **Refactored Solution:** Tải trực tiếp tài nguyên từ link thô, đổi tên chuẩn xác thành `kick.mp3`, `snare.mp3`, `hihat.mp3` và đưa vào thư mục `/assets`.

2. **Defect Description:** AI vi phạm kiến trúc phân tách khi tự ý chèn `style="..."` (Inline Style) trực tiếp vào thẻ `<p id="form-status">` trong HTML.
   - **Diagnostic Method:** Rà soát mã nguồn HTML dựa trên nguyên tắc tách biệt hiển thị (CSS) và nội dung (HTML).
   - **Refactored Solution:** Xóa thuộc tính style trong HTML và di dời quy tắc định dạng (margin-top, font-weight) sang tệp `style.css` bằng ID selector `#form-status`.

3. **Defect Description:** AI sinh ra mã CSS bị đứt đoạn, thiếu dấu đóng ngoặc nhọn `}` ở cuối khối lệnh, khiến toàn bộ giao diện layout grid bị vỡ và các phần tử đè lên nhau.
   - **Diagnostic Method:** DevTools và VS Code báo lỗi đỏ "at-rule or selector expected" do sai cú pháp.
   - **Refactored Solution:** Dọn dẹp lại toàn bộ mã CSS, loại bỏ ký tự backtick (```) thừa do AI sinh ra và bổ sung đầy đủ thẻ đóng khối.