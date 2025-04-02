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
    const sendBtn = document.getElementById('send-chat');
    const messageInput = document.getElementById('chat-message');
    const closeBtn = document.getElementById('chat-close');
  
    if (!toggleBtn || !popup || !sendBtn || !messageInput || !closeBtn) return;
  
    toggleBtn.addEventListener('click', () => {
      popup.style.display = 'flex';
      toggleBtn.style.display = 'none';
    });
  
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
      toggleBtn.style.display = 'inline-block';
    });
  
    sendBtn.addEventListener('click', () => {
      const message = encodeURIComponent(messageInput.value.trim());
      if (message) {
        const phoneNumber = '66853772222';
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
  