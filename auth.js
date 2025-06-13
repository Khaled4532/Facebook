// التحقق من حالة تسجيل الدخول
function checkAuth() {
    const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
    if (window.location.pathname.includes('admin.html') && !isAdmin) {
        window.location.href = 'index.html';
    }
}

// تسجيل الدخول كمدير
function loginAsAdmin(password, callback) {
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        callback(true);
    } else {
        callback(false);
    }
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
}

// تهيئة أحداث الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // تسجيل الدخول في الصفحة الرئيسية
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (password === ADMIN_PASSWORD) {
                loginAsAdmin(password, (success) => {
                    if (success) {
                        window.location.href = 'admin.html';
                    } else {
                        alert('كلمة المرور غير صحيحة');
                    }
                });
            } else {
                await addUser(email, password);
                alert('تم تسجيل الدخول بنجاح!');
                this.reset();
            }
        });
    }
    
    // تسجيل الخروج في لوحة الإدارة
    if (document.getElementById('logoutButton')) {
        document.getElementById('logoutButton').addEventListener('click', logout);
    }
});