// ✅ โหลด header และ footer
async function loadComponents() {
  const [headerRes, footerRes] = await Promise.all([
    fetch('../components/header.html'),
    fetch('../components/footer.html')
  ]);

  const headerHTML = await headerRes.text();
  const footerHTML = await footerRes.text();

  document.getElementById('header').innerHTML = headerHTML;
  document.getElementById('footer').innerHTML = footerHTML;

  // ✅ รอให้ DOM update เสร็จจริงก่อนเรียก setup
  requestAnimationFrame(() => {
    setupMobileToggle();
  });
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

  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      const aboutBtn = e.target.closest('.about-btn');
      if (aboutBtn) {
        const target = aboutBtn.getAttribute('data-target');
        window.location.href = target || 'pages/aboutus.html';
      }
    }
  });
  
    // ✅ ไฮไลท์จาก anchor (#cardX) เมื่อเข้าหน้านี้
    const hash = window.location.hash;
    if (hash) {
      const targetCard = document.querySelector(hash);
      if (targetCard && targetCard.classList.contains('card-group')) {
        // เอา highlight อันอื่นออกก่อน
        document.querySelectorAll('.card-group.highlight').forEach(el => {
          el.classList.remove('highlight');
        });
  
        // เพิ่ม highlight แล้วลบออกหลัง 3 วินาที
        targetCard.classList.add('highlight');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
        setTimeout(() => {
          targetCard.classList.remove('highlight');
        }, 3000);
      }
    }

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

// ✅ แก้ Scroll Snap เพี้ยน (เลื่อนไปเริ่มที่การ์ดใบที่ 2) ด้วยการ reset scroll position หลังโหลดรูป
window.addEventListener('load', () => {
  const offerSlider = document.querySelector('.offer-wrapper');
  const chooseSlider = document.querySelector('.choose-cards');

  if (offerSlider) offerSlider.scrollLeft = 0;
  if (chooseSlider) chooseSlider.scrollLeft = 0;
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
/*
function setupChatWidget() {
  const toggleBtn = document.getElementById('chat-toggle');
  const popup = document.getElementById('chat-popup');
  const chatIcon = document.getElementById('chat-icon-img');
  const arrowIcon = document.getElementById('arrow-icon');
  const sendBtn = document.getElementById('send-chat');
  const messageInput = document.getElementById('chat-message');

  if (!toggleBtn || !popup || !chatIcon || !arrowIcon || !sendBtn || !messageInput) return;

  let isOpen = false;

  toggleBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    popup.style.display = isOpen ? 'flex' : 'none';

    if (isOpen) {
      // แสดงลูกศร ซ่อน chat icon
      chatIcon.classList.add('hidden');
      arrowIcon.classList.remove('hidden');
    } else {
      // แสดง chat icon พร้อมหมุน
      arrowIcon.classList.add('hidden');
      chatIcon.classList.remove('hidden');
      chatIcon.classList.add('rotate');

      // ล้างเอฟเฟกต์หมุนหลังจบ animation
      setTimeout(() => {
        chatIcon.classList.remove('rotate');
      }, 400);
    }
  });

  sendBtn.addEventListener('click', () => {
    const message = encodeURIComponent(messageInput.value.trim());
    if (message) {
      const phoneNumber = '66853772222';
      const url = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(url, '_blank');
      messageInput.value = '';
      popup.style.display = 'none';

      // รีเซ็ตเป็นไอคอนแชท
      arrowIcon.classList.add('hidden');
      chatIcon.classList.remove('hidden');
      isOpen = false;
    } else {
      alert("Please fill in the message before sending.");
    }
  });
}

document.addEventListener('DOMContentLoaded', setupChatWidget);

*/

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


// Contact Us Dropdown
document.addEventListener('DOMContentLoaded', () => {
  // 🔹 Title Dropdown
  const titleToggle = document.querySelector('.title-toggle');
  const titleMenu = document.querySelector('.title-menu');
  const titleInput = document.getElementById('selected-title');

  if (titleToggle && titleMenu && titleInput) {
    titleToggle.addEventListener('click', () => {
      titleMenu.style.display = titleMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.custom-title-dropdown')) {
        titleMenu.style.display = 'none';
      }
    });

    titleMenu.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', () => {
        const selected = item.textContent;
        titleToggle.textContent = selected + ' ▾';
        titleInput.value = selected;
        titleMenu.style.display = 'none';
      });
    });
  }

  // 🔹 Menu Dropdown (Main toggle)
  const menuToggle = document.querySelector('.menu-toggle');
  const menuList = document.querySelector('.menu-list');
  const menuInput = document.getElementById('selected-menu');

  if (menuToggle && menuList && menuInput) {
    menuToggle.addEventListener('click', () => {
      menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.custom-menu-dropdown')) {
        menuList.style.display = 'none';
        document.querySelectorAll('.menu-group').forEach(p => {
          p.classList.remove('open');
          const submenu = p.querySelector('.submenu');
          if (submenu) submenu.style.display = 'none';
        });
      }
    });

    // 🔸 เปิด/ปิด submenu
    const submenuParents = document.querySelectorAll('.menu-list .menu-group > a');
    submenuParents.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = link.closest('.menu-group');
        parent.classList.toggle('open');
        const submenu = parent.querySelector('.submenu');
        if (submenu) {
          submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        }
      });
    });

    // 🔸 คลิกเลือกเมนูย่อย
    const subItems = document.querySelectorAll('.menu-list .submenu li');
    subItems.forEach(item => {
      item.addEventListener('click', () => {
        const selected = item.textContent;
        menuToggle.textContent = selected + ' ▾';
        menuInput.value = selected;
        menuList.style.display = 'none';

        document.querySelectorAll('.menu-group').forEach(p => {
          p.classList.remove('open');
          const submenu = p.querySelector('.submenu');
          if (submenu) submenu.style.display = 'none';
        });
      });
    });

    // ✅ เพิ่มส่วนนี้: กดเลือกเมนูที่ไม่มี submenu (Other)
    const flatItems = document.querySelectorAll('.menu-list > li:not(.menu-group)');
    flatItems.forEach(item => {
      item.addEventListener('click', () => {
        const selected = item.textContent;
        menuToggle.textContent = selected + ' ▾';
        menuInput.value = selected;
        menuList.style.display = 'none';

        document.querySelectorAll('.menu-group').forEach(p => {
          p.classList.remove('open');
          const submenu = p.querySelector('.submenu');
          if (submenu) submenu.style.display = 'none';
        });
      });
    });
  }
});
