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
  
    setupMobileToggle();
  }
  
  loadComponents();
  
  // ✅ Mobile menu toggle
  function setupMobileToggle() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-nav');
  
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('show');
      });
    }
  
    const submenuParents = document.querySelectorAll('.mobile-nav-menu .has-submenu > a');
    submenuParents.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = link.closest('.has-submenu');
        parent.classList.toggle('open');
      });
    });
  }
  
  // ✅ Tabs toggle
  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const cardGroups = document.querySelectorAll('.card-group');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        const targetCard = document.getElementById(targetId);
  
        tabs.forEach(t => t.classList.remove('active'));
        cardGroups.forEach(card => card.classList.remove('highlight'));
  
        tab.classList.add('active');
        if (targetCard) {
          targetCard.classList.add('highlight');
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  
    cardGroups.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('id');
        cardGroups.forEach(c => c.classList.remove('highlight'));
        tabs.forEach(t => t.classList.remove('active'));
  
        card.classList.add('highlight');
        const matchingTab = document.querySelector(`.tab[data-target="${id}"]`);
        if (matchingTab) matchingTab.classList.add('active');
      });
    });
  });
  
  // ✅ โหลด contact widget
  async function loadContactWidget() {
    const res = await fetch('../components/contact_widget.html');
    const widgetHTML = await res.text();
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
    setupChatWidget();
  }
  
  loadContactWidget();
  
  // ✅ Contact widget logic
  function setupChatWidget() {
    const toggleBtn = document.getElementById('chat-toggle');
    const popup = document.getElementById('chat-popup');
    const iconPath = document.getElementById('toggle-icon-path');
    const sendBtn = document.getElementById('send-chat');
    const messageInput = document.getElementById('chat-message');
  
    if (!toggleBtn || !popup || !sendBtn || !messageInput || !iconPath) return;
  
    let isOpen = false;
  
    const iconChat = 'M2 3h20a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6l-4 4V4a1 1 0 0 1 1-1z';
    const iconArrow = 'M6 9l6 6 6-6';
  
    toggleBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      popup.style.display = isOpen ? 'flex' : 'none';
      iconPath.setAttribute('d', isOpen ? iconArrow : iconChat);
    });
  
    sendBtn.addEventListener('click', () => {
      const message = encodeURIComponent(messageInput.value.trim());
      if (message) {
        const phoneNumber = '66853772222';
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, '_blank');
        messageInput.value = '';
        popup.style.display = 'none';
        iconPath.setAttribute('d', iconChat);
        isOpen = false;
      } else {
        alert("กรุณากรอกข้อความก่อนส่ง");
      }
    });
  }
  
  // อย่าลืมเรียกหลัง DOM พร้อม
  document.addEventListener('DOMContentLoaded', setupChatWidget);
  
  
  // ✅ ปุ่ม About Us ในมือถือ
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      const aboutBtn = e.target.closest('.about-btn');
      if (aboutBtn) {
        const target = aboutBtn.getAttribute('data-target');
        window.location.href = target || 'pages/aboutus.html';
      }
    }
  });
  