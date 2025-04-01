// โหลด header และ footer
async function loadComponents() {
    const [headerRes, footerRes] = await Promise.all([
        fetch('../components/header.html'),
        fetch('../components/footer.html')
    ]);

    const headerHTML = await headerRes.text();
    const footerHTML = await footerRes.text();

    document.getElementById('header').innerHTML = headerHTML;
    document.getElementById('footer').innerHTML = footerHTML;

    // ✅ เรียกใช้ toggle หลัง header โหลดเสร็จแล้ว
    setupMobileToggle();
}

loadComponents();

// ✅ ฟังก์ชัน toggle สำหรับเมนูมือถือ
function setupMobileToggle() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-nav');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('show');
        });
    }

    // ✅ จัดการเมนูย่อย (submenu toggle)
    const submenuParents = document.querySelectorAll('.mobile-nav-menu .has-submenu > a');

    submenuParents.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // ป้องกัน redirect
            const parent = link.closest('.has-submenu');
            parent.classList.toggle('open');
        });
    });
}

// ✅ จัดการ Tabs & Cards
const tabs = document.querySelectorAll('.tab');
const cardGroups = document.querySelectorAll('.card-group');

// เมื่อคลิก tab
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        const targetCard = document.getElementById(targetId);

        // ลบ active และ highlight ทั้งหมด
        tabs.forEach(t => t.classList.remove('active'));
        cardGroups.forEach(card => card.classList.remove('highlight'));

        // เพิ่ม active และ highlight
        tab.classList.add('active');
        if (targetCard) {
            targetCard.classList.add('highlight');
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

// เมื่อคลิกที่การ์ด
cardGroups.forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('id');

        // ลบ highlight และ active ทั้งหมด
        cardGroups.forEach(c => c.classList.remove('highlight'));
        tabs.forEach(t => t.classList.remove('active'));

        // เพิ่ม highlight ให้การ์ดนี้
        card.classList.add('highlight');

        // ทำให้ปุ่ม tab ที่ตรงกับ id นี้ active ด้วย
        const matchingTab = document.querySelector(`.tab[data-target="${id}"]`);
        if (matchingTab) matchingTab.classList.add('active');
    });
});


// โหลด contact widget หลังโหลด header/footer
async function loadContactWidget() {
    const res = await fetch('../components/contact_widget.html');
    const widgetHTML = await res.text();
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
    setupChatWidget(); // เรียกใช้หลังโหลดเสร็จ
  }
  
  loadContactWidget();
  
  function setupChatWidget() {
    const toggleBtn = document.getElementById('chat-toggle');
    const popup = document.getElementById('chat-popup');
    const sendBtn = document.getElementById('send-chat');
    const messageInput = document.getElementById('chat-message');
    const closeBtn = document.getElementById('chat-close');
  
    // เมื่อกดปุ่มเปิดแชท
    toggleBtn.addEventListener('click', () => {
      popup.style.display = 'flex';
      toggleBtn.style.display = 'none';
    });
  
    // เมื่อกดปุ่มปิด (X)
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
      toggleBtn.style.display = 'inline-block';
    });
  
    // เมื่อกดส่งข้อความ
    sendBtn.addEventListener('click', () => {
      const message = encodeURIComponent(messageInput.value.trim());
      if (message) {
        const phoneNumber = '66853772222'; // เบอร์ WhatsApp
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, '_blank');
        messageInput.value = '';
        popup.style.display = 'none';
        toggleBtn.style.display = 'inline-block';
      } else {
        alert("กรุณากรอกข้อความก่อนส่ง");
      }
    });
  }
  