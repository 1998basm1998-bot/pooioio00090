// البيانات الأساسية
const appData = {
    drivers: ["عمار علوان", "سالم", "ياسر عقيل", "عبدالله", "ياسر ناطق", "مصطفى", "حمودي", "عمر عقوبه", "عمر كداد", "علي محيي"],
    mandoubs: ["ابو الطيب", "عباس فاضل", "عبدالله", "ليث", "علي محسن"],
    buses: ["هيكر ازرق", "هيكر اصفر", "سكانيا رصاصي", "جي ابيض", "ترافيكو حار سيدي", "GT طيارة", "GT وردي"],
    accountants: ["علي ثامر", "مهند", "رحمة", "مدقق حسابات"]
};

// تشغيل الأكواد بمجرد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    setupLoginSystem();
    setupNavigation();
    populateSelects();
    generateBusFunds();
    setupCalculationsAndInteractions();
});

// 1. نظام تسجيل الدخول والخروج
function setupLoginSystem() {
    const loginScreen = document.getElementById("login-screen");
    const adminApp = document.getElementById("admin-app");
    const userApp = document.getElementById("user-app");

    document.getElementById("btn-login-admin").addEventListener("click", () => {
        loginScreen.classList.add("hidden");
        adminApp.classList.remove("hidden");
    });

    document.getElementById("btn-login-user").addEventListener("click", () => {
        loginScreen.classList.add("hidden");
        userApp.classList.remove("hidden");
    });

    const logoutButtons = document.querySelectorAll(".btn-logout");
    logoutButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            adminApp.classList.add("hidden");
            userApp.classList.add("hidden");
            loginScreen.classList.remove("hidden");
        });
    });
}

// 2. برمجة شريط التبويبات السفلي
function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const role = item.getAttribute("data-role");
            const targetId = item.getAttribute("data-target");

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

// 3. تعبئة القوائم المنسدلة
function populateSelects() {
    const driverSelect = document.getElementById("driver-select");
    const mandoubSelect = document.getElementById("mandoub-select");
    const busSelect = document.getElementById("bus-select");

    if(driverSelect && mandoubSelect && busSelect) {
        appData.drivers.forEach(name => driverSelect.innerHTML += `<option value="${name}">${name}</option>`);
        appData.mandoubs.forEach(name => mandoubSelect.innerHTML += `<option value="${name}">${name}</option>`);
        appData.buses.forEach(name => busSelect.innerHTML += `<option value="${name}">${name}</option>`);
    }
}

// 4. توليد صناديق الباصات بالتصميم الجديد (وارد - صادر - تحويل)
function generateBusFunds() {
    const grid = document.getElementById("buses-funds-grid");
    if(grid) {
        appData.buses.forEach(bus => {
            grid.innerHTML += `
                <div class="stat-card">
                    <i class="fas fa-bus" style="color: var(--primary-admin); font-size: 1.5rem;"></i>
                    <h4 style="font-size: 0.9rem; margin: 5px 0;">${bus}</h4>
                    <div class="fund-details">
                        <span>و: 0</span> | <span>ص: 0</span> | <span>ت: 0</span>
                    </div>
                </div>
            `;
        });
    }
}

// 5. العمليات الحسابية التلقائية وإظهار/إخفاء الحقول
function setupCalculationsAndInteractions() {
    // حساب المتبقي للسائق
    const driverTotal = document.getElementById("driver-total");
    const driverPaid = document.getElementById("driver-paid");
    const driverRem = document.getElementById("driver-rem");
    
    const calcDriver = () => {
        if(driverTotal && driverPaid && driverRem) {
            driverRem.value = (Number(driverTotal.value) - Number(driverPaid.value)) || 0;
        }
    };
    if(driverTotal) driverTotal.addEventListener("input", calcDriver);
    if(driverPaid) driverPaid.addEventListener("input", calcDriver);

    // حساب المتبقي للمندوب
    const manTotal = document.getElementById("man-total");
    const manPaid = document.getElementById("man-paid");
    const manRem = document.getElementById("man-rem");

    const calcMan = () => {
        if(manTotal && manPaid && manRem) {
            manRem.value = (Number(manTotal.value) - Number(manPaid.value)) || 0;
        }
    };
    if(manTotal) manTotal.addEventListener("input", calcMan);
    if(manPaid) manPaid.addEventListener("input", calcMan);

    // إظهار حقل "عدد المعتمرين" في المصاريف عند اختيار تذكرة هيئة أو مطعم
    const expenseType = document.getElementById("expense-type");
    const pilgrimsCountGroup = document.getElementById("pilgrims-count-group");

    if(expenseType && pilgrimsCountGroup) {
        expenseType.addEventListener("change", (e) => {
            const val = e.target.value;
            if(val === "haya" || val === "restaurant") {
                pilgrimsCountGroup.classList.remove("hidden");
            } else {
                pilgrimsCountGroup.classList.add("hidden");
            }
        });
    }
}
