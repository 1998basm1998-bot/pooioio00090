// عند تحميل الصفحة بالكامل
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. برمجة شريط التبويبات (Navigation)
    const navItems = document.querySelectorAll(".nav-item");
    const tabContents = document.querySelectorAll(".tab-content");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault(); // منع السلوك الافتراضي للرابط

            // إزالة الكلاس active من جميع الأزرار والمحتويات
            navItems.forEach(nav => nav.classList.remove("active"));
            tabContents.forEach(tab => tab.classList.remove("active"));

            // إضافة الكلاس active للزر الذي تم الضغط عليه
            item.classList.add("active");

            // إظهار المحتوى المطابق للزر (استخدام data-target)
            const targetId = item.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");
        });
    });

    // 2. تهيئة قاعدة البيانات المحلية LocalStorage
    initDatabase();
});

/**
 * وظيفة لتهيئة الجداول (المصفوفات) في المتصفح إذا لم تكن موجودة
 * هذه هي البنية التحتية التي سنعتمد عليها في المراحل القادمة
 */
function initDatabase() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]));
    }
    if (!localStorage.getItem("buses")) {
        localStorage.setItem("buses", JSON.stringify([]));
    }
    if (!localStorage.getItem("trips")) {
        localStorage.setItem("trips", JSON.stringify([]));
    }
    if (!localStorage.getItem("funds")) {
        // إنشاء الصناديق الأساسية
        const initialFunds = {
            umrah: 0,
            public_transport: 0,
            tourism: 0,
            profits: 0,
            buses_funds: {} // صندوق منفصل لكل باص سيتم إضافته هنا
        };
        localStorage.setItem("funds", JSON.stringify(initialFunds));
    }
}
