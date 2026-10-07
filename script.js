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
// ==========================================
// HW2: DRUM KIT - POLYPHONIC AUDIO ENGINE
// ==========================================

function playSound(key) {
  // Tìm phần tử HTML tương ứng dựa trên data-key
  const pad = document.querySelector(`.drum-pad[data-key="${key.toLowerCase()}"]`);

  if (!pad) return;

  // Tạo một instance Audio mới mỗi lần bấm để hỗ trợ đa âm (polyphonic)
  const audio = new Audio(pad.dataset.sound);
  audio.play().catch((error) => {
    console.error('Unable to play audio:', error);
  });

  // Thêm hiệu ứng khi phím được bấm
  pad.classList.add('active');
  setTimeout(() => pad.classList.remove('active'), 100);
}

// Phát âm khi bấm vào nút màn hình hoặc dùng bàn phím
for (const pad of document.querySelectorAll('.drum-pad')) {
  pad.addEventListener('click', () => playSound(pad.dataset.key));
}

window.addEventListener('keydown', (event) => {
  // Chặn lặp lại khi giữ phím để tránh phát nhiều lần
  if (event.repeat) return;

  playSound(event.key);
});