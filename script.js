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



// ==========================================
// HW3: DRIFT-FREE COUNTDOWN ENGINE
// ==========================================

// Tìm phần tử hiển thị đồng hồ trong HTML
const countdownElement = document.getElementById('countdown-timer');

// Đảm bảo phần tử tồn tại thì mới chạy code
if (countdownElement) {
  // Lấy mốc thời gian đích từ thuộc tính data-target trong HTML
  const targetDate = new Date(countdownElement.dataset.target).getTime();

  function updateCountdown() {
    // Luôn lấy mốc thời gian thực của máy tính tại thời điểm hiện tại
    const now = Date.now();
    
    // Khoảng cách từ hiện tại đến lúc ra mắt (tính bằng mili-giây)
    const distance = targetDate - now;

    // Nếu thời gian đã hết (distance <= 0) thì dừng ở số 0
    if (distance <= 0) {
      countdownElement.textContent = "00:00:00:00";
      return;
    }

    // Quy đổi mili-giây ra Ngày, Giờ, Phút, Giây
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Format hiển thị luôn có 2 chữ số (VD: 09 thay vì 9)
    countdownElement.textContent = 
      `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  // Gọi hàm chạy ngay lập tức để không bị hiện chữ "Loading..."
  updateCountdown();
  
  // Cập nhật lại thời gian mỗi 1 giây (1000 mili-giây)
  setInterval(updateCountdown, 1000);
}


// ==========================================
// HW3: FORM STATE MACHINE & ANTI-XSS
// ==========================================

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Chặn hành vi load lại trang mặc định

    // 1. NGĂN DOUBLE-SUBMIT (SLICE 3)
    // Khóa nút bấm ngay khi vừa nhấn để user không bấm được 2 lần
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    formStatus.textContent = '';
    formStatus.style.color = 'inherit';

    // 2. CHỐNG XSS & SANITIZATION (SLICE 3)
    // Biến các ký tự < và > thành dạng văn bản an toàn để chống chèn mã độc HTML
    const nameInput = document.getElementById('name').value;
    const sanitizedName = nameInput.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // 3. STATE-MACHINE FORM (SLICE 2)
    // Giả lập thời gian gửi dữ liệu lên server mất 2 giây
    setTimeout(() => {
      // Chuyển sang trạng thái Thành công
      formStatus.style.color = 'green';
      formStatus.textContent = `Thank you, ${sanitizedName}! Your message has been sent successfully.`;
      
      // Đưa form về trạng thái ban đầu (Idle)
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send';
    }, 2000);
  });
}