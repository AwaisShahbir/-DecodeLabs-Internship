document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        createToast(`Switched to ${newTheme} mode!`, 'info');
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    const sidebar = document.getElementById('sidebar-menu');
    const navItems = sidebar.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            if (sidebar.matches(':popover-open')) {
                sidebar.hidePopover();
            }
        });
    });

    const joinBtns = document.querySelectorAll('.join-btn');
    joinBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const webinarTitle = btn.closest('.webinar-details').querySelector('.webinar-title').textContent;
            
            if (btn.classList.contains('registered')) {
                btn.textContent = 'Register';
                btn.classList.remove('registered');
                createToast(`Cancelled registration for: "${webinarTitle}"`, 'warning');
            } else {
                btn.textContent = 'Registered ✓';
                btn.classList.add('registered');
                createToast(`Successfully registered for: "${webinarTitle}"`, 'success');
            }
        });
    });

    const resumeBtns = document.querySelectorAll('.card-btn.btn-primary');
    resumeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const courseTitle = btn.closest('.card-body').querySelector('.card-title').textContent;
            createToast(`Loading track: "${courseTitle}"... Ready!`, 'success');
        });
    });

    function createToast(message, type = 'info') {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconClass = 'fa-info-circle';
        if (type === 'success') iconClass = 'fa-check-circle';
        if (type === 'warning') iconClass = 'fa-exclamation-triangle';

        toast.innerHTML = `
            <i class="fa-solid ${iconClass} toast-icon"></i>
            <span class="toast-message">${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    const toastStyle = document.createElement('style');
    toastStyle.innerHTML = `
        .toast-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            z-index: 10000;
            pointer-events: none;
        }
        .toast {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 1rem 1.5rem;
            background: hsl(222, 25%, 15%);
            border: 1px solid var(--border);
            border-radius: var(--border-radius-md);
            color: var(--text-primary);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
            min-width: 280px;
            transform: translateX(120%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: auto;
        }
        .toast.show {
            transform: translateX(0);
        }
        .toast-icon {
            font-size: 1.15rem;
        }
        .toast-success .toast-icon { color: var(--success); }
        .toast-info .toast-icon { color: var(--secondary); }
        .toast-warning .toast-icon { color: var(--warning); }
        
        [data-theme="light"] .toast {
            background: #fff;
            color: var(--text-primary);
        }
    `;
    document.head.appendChild(toastStyle);
});
