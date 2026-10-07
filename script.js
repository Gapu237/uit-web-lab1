// Chọn nút bấm Theme từ DOM
const themeToggle = document.querySelector('#theme-btn');

// Kiểm tra trạng thái đã lưu trong localStorage khi tải trang
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.setAttribute('aria-pressed', 'true');
}

// Bắt sự kiện click để chuyển đổi giao diện
themeToggle.addEventListener('click', () => {
  // Bật/tắt class dark-theme trên thẻ body
  document.body.classList.toggle('dark-theme');
  
  // Kiểm tra xem body đang có class dark-theme hay không
  const isDark = document.body.classList.contains('dark-theme');
  
  // Cập nhật thuộc tính hỗ trợ tiếp cận (A11y)
  themeToggle.setAttribute('aria-pressed', isDark);
  
  // Lưu trạng thái vào localStorage với khóa là 'theme'
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});