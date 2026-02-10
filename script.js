// Tunggu halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function () {

  // 1. SCROLL KE BAGIAN (jika klik link menu dengan #)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. SIMPAN NAMA PENGGUNA (AUTO-SAVE)
  const usernameInput = document.getElementById('username');
  const saveMessage = document.getElementById('save-message');

  if (usernameInput) {
    // Muat data dari localStorage saat halaman dibuka
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      usernameInput.value = savedUsername;
    }

    // Simpan otomatis saat input berubah (dengan delay)
    let saveTimer;
    usernameInput.addEventListener('input', function () {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        localStorage.setItem('username', this.value);
        if (saveMessage) {
          saveMessage.textContent = '✅ Tersimpan!';
          setTimeout(() => {
            saveMessage.textContent = '';
          }, 2000);
        }
      }, 500); // Simpan 0.5 detik setelah berhenti mengetik
    });
  }

  // 3. NOTIFIKASI SEDERHANA (popup kecil di halaman)
  window.showNotification = function (message) {
    let notif = document.getElementById('custom-notif');
    if (!notif) {
      notif = document.createElement('div');
      notif.id = 'custom-notif';
      notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        font-family: Arial, sans-serif;
        animation: fadeInOut 4s ease;
      `;
      document.body.appendChild(notif);
    }
    notif.textContent = message;

    // Animasi CSS (inject jika belum ada)
    if (!document.getElementById('notif-style')) {
      const style = document.createElement('style');
      style.id = 'notif-style';
      style.textContent = `
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Contoh: Tampilkan notifikasi saat halaman dibuka
  // showNotification('Selamat datang kembali!');
});
