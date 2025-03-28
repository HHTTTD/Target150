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
}

loadComponents();

// จัดการ Tabs & Cards
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
