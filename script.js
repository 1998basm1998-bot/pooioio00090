// 1. البيانات الأساسية المأخوذة من الأوراق
const appData = {
    drivers: ["عمار علوان", "سالم", "ياسر عقيل", "عبدالله", "ياسر ناطق", "مصطفى", "حمودي", "عمر عقوبه", "عمر كداد", "علي محيي"],
    mandoubs: ["ابو الطيب", "عباس فاضل", "عبدالله", "ليث", "علي محسن"],
    buses: ["هيكر ازرق", "هيكر اصفر", "سكانيا رصاصي", "جي ابيض", "ترافيكو حار سيدي", "GT طيارة", "GT وردي"],
    accountants: ["علي ثامر", "مهند", "رحمة", "مدقق حسابات"]
};

document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    populateSelects();
    generateBusFunds();
});

// 2. دالة تسجيل الدخول (التبديل بين الشاشات)
function login(role) {
    document.getElementById("login-screen").classList.remove("active-screen");
    document.getElementById("login-screen").style.display = "none";

    if (role === 'admin') {
        document.getElementById("admin-app").classList.add("active-screen");
        document.getElementById("admin-app").style.display = "block";
    } else if (role === 'user') {
        document.getElementById("user-app").classList.add("active-screen");
        document.getElementById("user-app").style.display = "block";
    }
}

// دالة تسجيل الخروج للعودة للشاشة الرئيسية
function logout() {
    document.getElementById("admin-app").style.display = "none";
    document.getElementById("user-app").style.display = "none";
    document.getElementById("login-screen").style.display = "flex";
}

// 3. برمجة شريط التبويبات السفلي
function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const role = item.getAttribute("data-role");
            const targetId = item.getAttribute("data-target");

            // إخفاء المحتوى الخاص بنفس الصلاحية فقط
            const parentApp = document.getElementById(`${role}-app`);
            const tabs = parentApp.querySelectorAll(".tab-content");
            const navs = parentApp.querySelectorAll(".nav-item");

            tabs.forEach(tab => tab.classList.remove("active"));
            navs.forEach(nav => nav.classList.remove("active"));

            item.classList.add("active");
            document.getElementById(targetId).classList.add("active");
        });
    });
}

// 4. تعبئة القوائم المنسدلة (Select) بالبيانات من المصفوفات
function populateSelects() {
    const driverSelect = document.getElementById("driver-select");
    const mandoubSelect = document.getElementById("mandoub-select");
    const busSelect = document.getElementById("bus-select");

    appData.drivers.forEach(name => {
        driverSelect.innerHTML += `<option value="${name}">${name}</option>`;
    });

    appData.mandoubs.forEach(name => {
        mandoubSelect.innerHTML += `<option value="${name}">${name}</option>`;
    });

    appData.buses.forEach(name => {
        busSelect.innerHTML += `<option value="${name}">${name}</option>`;
    });
}

// 5. توليد صناديق الباصات الـ 7 في واجهة المدير
function generateBusFunds() {
    const grid = document.getElementById("buses-funds-grid");
    appData.buses.forEach(bus => {
        grid.innerHTML += `
            <div class="stat-card">
                <i class="fas fa-bus" style="color: var(--primary-admin); font-size: 1.5rem;"></i>
                <h4 style="font-size: 0.9rem; margin: 5px 0;">${bus}</h4>
                <p style="font-weight: bold;">0 $</p>
            </div>
        `;
    });
}
