document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. APPLICATION STATE
    // ==========================================
    const state = {
        theme: localStorage.getItem('theme') || 'dark',
        activeTrackId: 'frontend',
        totalCompletion: 62.7,
        badgesEarnedCount: 2,
        
        courses: {
            frontend: {
                id: 'frontend',
                title: 'Frontend Architecture',
                tag: 'HTML & CSS',
                duration: '8 hours',
                progress: 75,
                status: 'in-progress', // 'in-progress' | 'completed' | 'locked'
                description: 'Master CSS Grid layouts, Flexbox structures, media queries, and modern fluid typography with CSS clamp.',
                checklist: [
                    { id: 'fe-1', text: 'Master CSS Grid layouts and named templates', desc: 'Define grid-template-areas for header, sidebar, main and footer grids.', checked: true },
                    { id: 'fe-2', text: 'Configure native HTML Popover Navigation sidebar', desc: 'Implement popover attributes for triggering responsive sidebar navigation.', checked: true },
                    { id: 'fe-3', text: 'Incorporate CSS clamp for fluid typography rules', desc: 'Bind fluid headers and body copy sizing dynamically.', checked: true },
                    { id: 'fe-4', text: 'Write keyframe entry animations for page items', desc: 'Add subtle keyframes and entry transitions to widgets.', checked: false }
                ]
            },
            javascript: {
                id: 'javascript',
                title: 'Dynamic UI & APIs',
                tag: 'JavaScript & Web APIs',
                duration: '12 hours',
                progress: 40,
                status: 'in-progress',
                description: 'Learn to fetch APIs, manipulate DOM structures, handle web storage, and build responsive asynchronous interfaces.',
                checklist: [
                    { id: 'js-1', text: 'Wire user sensory receptors via event listeners', desc: 'Add event listener handlers to trigger interaction routines.', checked: true },
                    { id: 'js-2', text: 'Setup isolated client-side state models', desc: 'Create Javascript objects representing the source of UI truths.', checked: true },
                    { id: 'js-3', text: 'Update DOM nodes safely via textContent API', desc: 'Acknowledge XSS vectors and update markup text nodes safely.', checked: false },
                    { id: 'js-4', text: 'Write decoupled js- hook selector conventions', desc: 'Decouple CSS rules from JavaScript handler queries.', checked: false },
                    { id: 'js-5', text: 'Toggle state class names with is- prefixes', desc: 'Alter visual components using dedicated is- prefixes.', checked: false }
                ]
            },
            backend: {
                id: 'backend',
                title: 'Full-Stack Systems',
                tag: 'NodeJS & Cloud DB',
                duration: '15 hours',
                progress: 0,
                status: 'locked',
                description: 'Configure database routers, cache nodes, authentication protocols, and launch full-stack APIs to edge servers.',
                checklist: [
                    { id: 'be-1', text: 'Initialize Node.js local server instances', desc: 'Setup express listener loops on local dev environments.', checked: false },
                    { id: 'be-2', text: 'Configure DB schemas and route handlers', desc: 'Map client-side requests to structured collection models.', checked: false },
                    { id: 'be-3', text: 'Manage CORS policies and auth controllers', desc: 'Sanitize server logs, control headers and crypt tokens.', checked: false }
                ]
            }
        },
        
        webinars: {
            1: { id: 1, title: 'Flexbox vs Grid Decoded', date: 'Jun 08', time: '18:00', registered: false },
            2: { id: 2, title: 'Web Performance & SEO', date: 'Jun 12', time: '15:00', registered: false }
        },
        
        notifications: [
            { id: 'nt-1', text: 'Welcome to Week 3 Sprint: Client-Side Interactions.', type: 'success', time: '5m ago', read: false },
            { id: 'nt-2', text: 'Frontend Architecture progress has reached 75%.', type: 'info', time: '20m ago', read: false },
            { id: 'nt-3', text: 'Live Session: Flexbox vs Grid starts shortly.', type: 'warning', time: '1h ago', read: true }
        ],
        
        badges: {
            flexbox: { title: 'Flexbox Expert', desc: 'Demonstrated complete understanding of Flexbox alignment, flow, wrapping, and child alignments.', unlocked: true },
            grid: { title: 'Grid Architect', desc: 'Mastered multi-dimensional Grid alignments, named grid areas, auto-fit columns, and macro page divisions.', unlocked: true },
            dom: { title: 'DOM Wizard', desc: 'Awarded for complete traversal of the DOM tree. Creating, deleting, and updating elements based on event listeners.', unlocked: false },
            api: { title: 'API Alchemist', desc: 'Unlocked after mastering asynchronous APIs, parsing JSON datasets, and saving state changes locally.', unlocked: false },
            fullstack: { title: 'Full-Stack Titan', desc: 'Mastered cloud DB structures, routers, cache controllers, and authentication middleware.', unlocked: false }
        },

        sandboxPresets: {
            'alert-box': {
                html: '<!-- HTML Structure -->\n<div class="card">\n    <h3>Developer Workspace</h3>\n    <p>Click the button below to test client-side event loops.</p>\n    <button class="btn js-alert-btn">Click Me!</button>\n</div>',
                css: '/* CSS Styles */\nbody {\n    font-family: sans-serif;\n    background-color: #f0f2f5;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n    margin: 0;\n}\n.card {\n    background: white;\n    padding: 2rem;\n    border-radius: 12px;\n    box-shadow: 0 4px 15px rgba(0,0,0,0.1);\n    text-align: center;\n}\n.btn {\n    background: #6366f1;\n    color: white;\n    border: none;\n    padding: 0.6rem 1.2rem;\n    border-radius: 6px;\n    font-weight: 600;\n    cursor: pointer;\n    transition: background 0.2s;\n}\n.btn:hover {\n    background: #4f46e5;\n}',
                js: '// JS Interactions\nconst alertBtn = document.querySelector(".js-alert-btn");\nalertBtn.addEventListener("click", () => {\n    alert("🎉 Hello from the custom Sandbox runtime!");\n});'
            },
            'theme-toggle': {
                html: '<!-- HTML Structure -->\n<div class="theme-card js-theme-card">\n    <h3>Micro Customizer</h3>\n    <p>Toggle this local theme node to mutate elements.</p>\n    <button class="js-toggle-btn">Toggle Style</button>\n</div>',
                css: '/* CSS Styles */\nbody {\n    font-family: sans-serif;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n    margin: 0;\n    background: #0f172a;\n    color: #f8fafc;\n    transition: background 0.3s, color 0.3s;\n}\n.theme-card {\n    padding: 2rem;\n    border-radius: 10px;\n    border: 1px solid #334155;\n    text-align: center;\n    background: #1e293b;\n}\n.theme-card.is-light {\n    background: #ffffff;\n    color: #0f172a;\n    border-color: #cbd5e1;\n}\nbutton {\n    background: #0ea5e9;\n    color: white;\n    border: none;\n    padding: 0.5rem 1rem;\n    border-radius: 4px;\n    cursor: pointer;\n    font-weight: 700;\n}\nbutton:hover {\n    opacity: 0.9;\n}',
                js: '// JS Interactions\nconst card = document.querySelector(".js-theme-card");\nconst btn = document.querySelector(".js-toggle-btn");\n\nbtn.addEventListener("click", () => {\n    card.classList.toggle("is-light");\n    if (card.classList.contains("is-light")) {\n        document.body.style.background = "#f1f5f9";\n        document.body.style.color = "#0f172a";\n    } else {\n        document.body.style.background = "#0f172a";\n        document.body.style.color = "#f8fafc";\n    }\n});'
            },
            'task-list': {
                html: '<!-- HTML Structure -->\n<div class="todo-app">\n    <h3>Micro Checklist</h3>\n    <div class="input-row">\n        <input type="text" class="js-task-input" placeholder="Add new task...">\n        <button class="js-add-btn">Add</button>\n    </div>\n    <ul class="js-task-list"></ul>\n</div>',
                css: '/* CSS Styles */\nbody {\n    font-family: sans-serif;\n    background: #faf5ff;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n    margin: 0;\n}\n.todo-app {\n    background: white;\n    padding: 1.5rem;\n    border-radius: 10px;\n    box-shadow: 0 8px 20px rgba(147, 51, 234, 0.1);\n    width: 280px;\n}\n.input-row {\n    display: flex;\n    gap: 0.5rem;\n    margin-bottom: 1rem;\n}\ninput {\n    flex: 1;\n    padding: 0.4rem;\n    border: 1px solid #ddd;\n    border-radius: 4px;\n}\nbutton {\n    background: #a855f7;\n    color: white;\n    border: none;\n    padding: 0.4rem 0.8rem;\n    border-radius: 4px;\n    cursor: pointer;\n}\nul {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n}\nli {\n    padding: 0.5rem;\n    background: #fdf4ff;\n    border-radius: 4px;\n    display: flex;\n    justify-content: space-between;\n    font-size: 0.9rem;\n    border-left: 3px solid #c084fc;\n}\nli span.is-done {\n    text-decoration: line-through;\n    color: #aaa;\n}',
                js: '// JS Interactions\nconst addBtn = document.querySelector(".js-add-btn");\nconst input = document.querySelector(".js-task-input");\nconst list = document.querySelector(".js-task-list");\n\naddBtn.addEventListener("click", () => {\n    const text = input.value.trim();\n    if (!text) return;\n    \n    const li = document.createElement("li");\n    li.innerHTML = `\n        <span>${text}</span>\n        <a href="#" class="js-del-link" style="color:red; text-decoration:none;">&times;</a>\n    `;\n    \n    li.querySelector("span").addEventListener("click", function() {\n        this.classList.toggle("is-done");\n    });\n    \n    li.querySelector(".js-del-link").addEventListener("click", (e) => {\n        e.preventDefault();\n        li.remove();\n    });\n    \n    list.appendChild(li);\n    input.value = "";\n});'
            }
        }
    };

    // ==========================================
    // 2. ELEMENT CACHE & SELECTORS
    // ==========================================
    const DOM = {
        themeToggle: document.querySelector('.js-theme-toggle'),
        themeToggleIcon: document.querySelector('.js-theme-toggle i'),
        
        notificationBtn: document.querySelector('.js-notification-trigger'),
        notificationIndicator: document.querySelector('.js-notification-indicator'),
        notificationsDropdown: document.querySelector('.js-notifications-dropdown'),
        notificationsList: document.querySelector('.js-notifications-list'),
        markReadBtn: document.querySelector('.js-mark-read-btn'),
        
        navItems: document.querySelectorAll('.js-nav-item'),
        filterTabs: document.querySelectorAll('.js-filter-tab'),
        trackSearch: document.querySelector('.js-track-search'),
        tracksContainer: document.querySelector('.js-tracks-container'),
        
        checklistDrawer: document.querySelector('.js-checklist-drawer'),
        closeDrawerBtn: document.querySelector('.js-close-drawer'),
        drawerTitle: document.querySelector('.js-drawer-title'),
        checklistItemsContainer: document.querySelector('.js-checklist-items-container'),
        
        countdownHours: document.querySelector('.js-countdown-hours'),
        countdownMinutes: document.querySelector('.js-countdown-minutes'),
        countdownSeconds: document.querySelector('.js-countdown-seconds'),
        countdownShort: document.querySelector('.js-webinar-countdown-short'),
        webinarButtons: document.querySelectorAll('.js-webinar-btn'),
        
        badgeItems: document.querySelectorAll('.js-badge-item'),
        badgeGrid: document.querySelector('.js-badge-grid'),
        badgeModal: document.querySelector('.js-badge-modal'),
        closeBadgeModalBtn: document.querySelector('.js-close-modal-btn'),
        modalBadgeIcon: document.querySelector('.js-modal-badge-icon'),
        modalBadgeTitle: document.querySelector('.js-modal-badge-title'),
        modalBadgeStatus: document.querySelector('.js-modal-badge-status'),
        modalBadgeDesc: document.querySelector('.js-modal-badge-description'),
        
        sandboxSelect: document.querySelector('.js-sandbox-select'),
        sandboxRunBtn: document.querySelector('.js-sandbox-run'),
        sandboxResetBtn: document.querySelector('.js-sandbox-reset'),
        editorTabs: document.querySelectorAll('.js-editor-tab'),
        editorWrappers: document.querySelectorAll('.js-editor-wrapper'),
        sandboxHtml: document.querySelector('.js-sandbox-html'),
        sandboxCss: document.querySelector('.js-sandbox-css'),
        sandboxJs: document.querySelector('.js-sandbox-js'),
        sandboxIframe: document.querySelector('.js-sandbox-iframe'),
        
        submitForm: document.querySelector('.js-submit-form'),
        repoInput: document.querySelector('.js-repo-input'),
        liveInput: document.querySelector('.js-live-input'),
        requirementIndicator: document.querySelector('.js-requirement-indicator'),
        submitBtn: document.querySelector('.js-submit-btn'),
        
        successModal: document.querySelector('.js-success-modal'),
        modalRepoLink: document.querySelector('.js-modal-repo-link'),
        modalLiveLink: document.querySelector('.js-modal-live-link'),
        closeSuccessBtn: document.querySelector('.js-close-success-btn'),
        
        totalCompletionLabel: document.querySelector('.js-total-completion-label'),
        badgesEarnedLabel: document.querySelector('.js-badges-earned-label')
    };

    // ==========================================
    // 3. INITIALIZATION
    // ==========================================
    function init() {
        applyTheme(state.theme);
        calculateDashboardMetrics();
        renderTracks();
        renderNotifications();
        startCountdown();
        setupWebinars();
        setupSandboxPreset('alert-box');
        checkSubmissionStatus();
        
        // Hide sidebar popover when menu link clicked
        const sidebar = document.getElementById('sidebar-menu');
        DOM.navItems.forEach(item => {
            item.addEventListener('click', () => {
                DOM.navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                if (sidebar.matches(':popover-open')) {
                    sidebar.hidePopover();
                }
            });
        });
    }

    // ==========================================
    // 4. THEME CONTROLLER (localStorage & data-theme)
    // ==========================================
    DOM.themeToggle.addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(state.theme);
        localStorage.setItem('theme', state.theme);
        createToast(`Switched to ${state.theme} mode!`, 'info');
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'light') {
            DOM.themeToggleIcon.className = 'fa-solid fa-sun';
            DOM.themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        } else {
            DOM.themeToggleIcon.className = 'fa-solid fa-moon';
            DOM.themeToggle.setAttribute('aria-label', 'Switch to light theme');
        }
    }

    // ==========================================
    // 5. TOAST NOTIFICATION SYSTEM
    // ==========================================
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
        if (type === 'danger') iconClass = 'fa-times-circle';

        toast.innerHTML = `
            <i class="fa-solid ${iconClass} toast-icon"></i>
            <span class="toast-message">${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('is-open'), 10);
        
        // Remove after 3.5s
        setTimeout(() => {
            toast.classList.remove('is-open');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    // ==========================================
    // 6. NOTIFICATIONS SYSTEM (Dropdown & Actions)
    // ==========================================
    DOM.notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        DOM.notificationsDropdown.classList.toggle('is-open');
    });

    // Close notifications dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!DOM.notificationsDropdown.contains(e.target) && e.target !== DOM.notificationBtn) {
            DOM.notificationsDropdown.classList.remove('is-open');
        }
    });

    DOM.markReadBtn.addEventListener('click', () => {
        state.notifications.forEach(note => note.read = true);
        renderNotifications();
        createToast('All notifications marked as read', 'success');
    });

    function renderNotifications() {
        DOM.notificationsList.innerHTML = '';
        
        const unreadCount = state.notifications.filter(n => !n.read).length;
        if (unreadCount > 0) {
            DOM.notificationIndicator.classList.add('is-active');
        } else {
            DOM.notificationIndicator.classList.remove('is-active');
        }

        if (state.notifications.length === 0) {
            DOM.notificationsList.innerHTML = '<div class="notification-empty">No notifications available</div>';
            return;
        }

        state.notifications.forEach(note => {
            const item = document.createElement('div');
            item.className = `notification-item ${!note.read ? 'is-unread' : ''}`;
            
            let icon = 'fa-circle-info';
            if (note.type === 'success') icon = 'fa-circle-check';
            if (note.type === 'warning') icon = 'fa-triangle-exclamation';

            item.innerHTML = `
                <i class="fa-solid ${icon} notification-item-icon is-${note.type}"></i>
                <div class="notification-item-content">
                    <span class="notification-item-text">${note.text}</span>
                    <span class="notification-item-time">${note.time}</span>
                </div>
            `;
            
            item.addEventListener('click', () => {
                note.read = true;
                renderNotifications();
                DOM.notificationsDropdown.classList.remove('is-open');
            });

            DOM.notificationsList.appendChild(item);
        });
    }

    function addNotification(text, type = 'info') {
        state.notifications.unshift({
            id: 'nt-' + Date.now(),
            text: text,
            type: type,
            time: 'Just now',
            read: false
        });
        renderNotifications();
    }

    // ==========================================
    // 7. LEARNING TRACKS (Filters, Search & Cards)
    // ==========================================
    DOM.filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            DOM.filterTabs.forEach(btn => btn.classList.remove('is-active'));
            tab.classList.add('is-active');
            renderTracks();
        });
    });

    DOM.trackSearch.addEventListener('input', () => {
        renderTracks();
    });

    function renderTracks() {
        const filterVal = document.querySelector('.js-filter-tab.is-active').dataset.filter;
        const searchQuery = DOM.trackSearch.value.trim().toLowerCase();
        
        const trackCards = DOM.tracksContainer.querySelectorAll('.js-track-card');
        
        trackCards.forEach(card => {
            const trackId = card.dataset.trackId;
            const trackData = state.courses[trackId];
            
            // Sync UI states with javascript state
            const badgeEl = card.querySelector('.js-card-badge');
            const fillEl = card.querySelector('.js-progress-fill');
            const percentEl = card.querySelector('.js-progress-percent');
            const resumeBtnEl = card.querySelector('.js-resume-btn');
            
            // Update UI components dynamically based on JS State
            card.dataset.status = trackData.status;
            percentEl.textContent = `${trackData.progress}%`;
            fillEl.style.width = `${trackData.progress}%`;
            
            if (trackData.status === 'locked') {
                card.classList.add('is-locked');
                badgeEl.className = 'card-badge badge-locked js-card-badge';
                badgeEl.innerHTML = '<i class="fa-solid fa-lock"></i> Locked';
                resumeBtnEl.disabled = true;
                resumeBtnEl.className = 'card-btn btn-secondary js-resume-btn';
                resumeBtnEl.innerHTML = '<span>Track Locked</span> <i class="fa-solid fa-lock"></i>';
            } else if (trackData.status === 'completed') {
                card.classList.remove('is-locked');
                badgeEl.className = 'card-badge badge-completed js-card-badge';
                badgeEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Completed';
                resumeBtnEl.disabled = false;
                resumeBtnEl.className = 'card-btn btn-secondary js-resume-btn';
                resumeBtnEl.innerHTML = '<span>Review Material</span> <i class="fa-solid fa-rotate-left"></i>';
            } else {
                card.classList.remove('is-locked');
                badgeEl.className = 'card-badge badge-active js-card-badge';
                badgeEl.innerHTML = 'In Progress';
                resumeBtnEl.disabled = false;
                resumeBtnEl.className = 'card-btn btn-primary js-resume-btn';
                resumeBtnEl.innerHTML = '<span>Resume Track</span> <i class="fa-solid fa-arrow-right"></i>';
            }
            
            // Check filters & search matches
            const title = trackData.title.toLowerCase();
            const desc = trackData.description.toLowerCase();
            const tag = trackData.tag.toLowerCase();
            
            const matchesSearch = title.includes(searchQuery) || desc.includes(searchQuery) || tag.includes(searchQuery);
            
            let matchesFilter = true;
            if (filterVal === 'in-progress') matchesFilter = trackData.status === 'in-progress';
            else if (filterVal === 'completed') matchesFilter = trackData.status === 'completed';
            else if (filterVal === 'locked') matchesFilter = trackData.status === 'locked';
            
            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Re-attach resume listeners
        setupResumeButtons();
    }

    // ==========================================
    // 8. ACCORDION CHECKLIST DRAWER
    // ==========================================
    function setupResumeButtons() {
        const resumeBtns = document.querySelectorAll('.js-resume-btn');
        resumeBtns.forEach(btn => {
            // Remove previous event listeners
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', () => {
                const card = newBtn.closest('.js-track-card');
                const trackId = card.dataset.trackId;
                openChecklistDrawer(trackId);
            });
        });
    }

    function openChecklistDrawer(trackId) {
        state.activeTrackId = trackId;
        const trackData = state.courses[trackId];
        
        DOM.drawerTitle.textContent = `${trackData.title} Checklist`;
        renderChecklistItems(trackData.checklist);
        
        DOM.checklistDrawer.classList.add('is-open');
        DOM.checklistDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        createToast(`Loaded checklist: "${trackData.title}"`, 'success');
    }

    DOM.closeDrawerBtn.addEventListener('click', () => {
        DOM.checklistDrawer.classList.remove('is-open');
    });

    function renderChecklistItems(checklist) {
        DOM.checklistItemsContainer.innerHTML = '';
        
        checklist.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = `checklist-item ${item.checked ? 'is-checked' : ''}`;
            
            itemEl.innerHTML = `
                <div class="checklist-checkbox-wrapper">
                    <input type="checkbox" class="task-checkbox js-task-checkbox" data-task-id="${item.id}" ${item.checked ? 'checked' : ''}>
                    <div class="custom-checkbox">
                        <i class="fa-solid fa-check"></i>
                    </div>
                </div>
                <div class="checklist-item-details">
                    <span class="checklist-item-title">${item.text}</span>
                    <span class="checklist-item-desc">${item.desc}</span>
                </div>
            `;
            
            // Attach toggle logic
            const checkbox = itemEl.querySelector('.js-task-checkbox');
            checkbox.addEventListener('change', () => {
                item.checked = checkbox.checked;
                itemEl.classList.toggle('is-checked', checkbox.checked);
                
                // Animate micro scale
                itemEl.style.transform = 'scale(0.98)';
                setTimeout(() => itemEl.style.transform = 'none', 100);
                
                updateTrackProgress(state.activeTrackId);
            });
            
            DOM.checklistItemsContainer.appendChild(itemEl);
        });
    }

    function updateTrackProgress(trackId) {
        const trackData = state.courses[trackId];
        const totalTasks = trackData.checklist.length;
        const completedTasks = trackData.checklist.filter(item => item.checked).length;
        
        const originalProgress = trackData.progress;
        trackData.progress = Math.round((completedTasks / totalTasks) * 100);
        
        if (trackData.progress === 100) {
            trackData.status = 'completed';
            addNotification(`Congratulations! Track "${trackData.title}" completed.`, 'success');
            createToast(`Completed Track: "${trackData.title}"! 🎉`, 'success');
            
            // Unlock next tracks logic
            if (trackId === 'frontend' && state.courses.javascript.status === 'in-progress') {
                // Already in progress, let it be. But unlock domestic badges.
                unlockBadge('dom');
            } else if (trackId === 'javascript') {
                unlockBadge('api');
                // Unlock Full-Stack track
                if (state.courses.backend.status === 'locked') {
                    state.courses.backend.status = 'in-progress';
                    addNotification('Backend development track has been unlocked!', 'success');
                    createToast('New Track Unlocked: Full-Stack Systems!', 'success');
                }
            } else if (trackId === 'backend') {
                unlockBadge('fullstack');
            }
        } else {
            trackData.status = 'in-progress';
            // If it fell back, relock subsequent dependencies if necessary
            // In a real application we might do it, here we keep it robust.
        }
        
        // Save state locally
        calculateDashboardMetrics();
        renderTracks();
        renderChecklistItems(trackData.checklist);
        checkSubmissionStatus();
    }

    function calculateDashboardMetrics() {
        const tracks = Object.values(state.courses);
        const totalProgressSum = tracks.reduce((acc, course) => acc + course.progress, 0);
        state.totalCompletion = Math.round((totalProgressSum / (tracks.length * 100)) * 100);
        
        // Update metric DOM
        DOM.totalCompletionLabel.textContent = `${state.totalCompletion}%`;
        
        const unlockedBadgesCount = Object.values(state.badges).filter(b => b.unlocked).length;
        state.badgesEarnedCount = unlockedBadgesCount;
        DOM.badgesEarnedLabel.textContent = `${state.badgesEarnedCount} / 5`;
        
        syncBadgeGrid();
    }

    // ==========================================
    // 9. ACHIEVEMENT BADGES & MODAL SYSTEM
    // ==========================================
    function unlockBadge(badgeId) {
        if (state.badges[badgeId] && !state.badges[badgeId].unlocked) {
            state.badges[badgeId].unlocked = true;
            addNotification(`New Achievement Badge Earned: ${state.badges[badgeId].title}`, 'success');
            createToast(`Badge Earned: ${state.badges[badgeId].title}! 🏆`, 'success');
            calculateDashboardMetrics();
        }
    }

    function syncBadgeGrid() {
        DOM.badgeItems.forEach(item => {
            const badgeId = item.dataset.badge;
            const badgeData = state.badges[badgeId];
            
            if (badgeData.unlocked) {
                item.classList.remove('is-locked');
                item.dataset.unlocked = 'true';
            } else {
                item.classList.add('is-locked');
                item.dataset.unlocked = 'false';
            }
        });
    }

    // Open Badge Info modal
    DOM.badgeItems.forEach(item => {
        item.addEventListener('click', () => {
            const badgeId = item.dataset.badge;
            const badgeData = state.badges[badgeId];
            
            DOM.modalBadgeTitle.textContent = badgeData.title;
            DOM.modalBadgeStatus.textContent = badgeData.unlocked ? 'Unlocked ✓' : 'Locked 🔒';
            DOM.modalBadgeStatus.className = `modal-subtitle ${badgeData.unlocked ? 'text-success' : 'text-muted'}`;
            DOM.modalBadgeDesc.textContent = badgeData.desc;
            
            const iconHTML = item.querySelector('.badge-icon-wrapper').innerHTML;
            DOM.modalBadgeIcon.innerHTML = iconHTML;
            if (badgeData.unlocked) {
                DOM.modalBadgeIcon.className = 'modal-badge-wrapper';
            } else {
                DOM.modalBadgeIcon.className = 'modal-badge-wrapper is-locked';
            }
            
            DOM.badgeModal.classList.add('is-open');
        });
    });

    DOM.closeBadgeModalBtn.addEventListener('click', () => {
        DOM.badgeModal.classList.remove('is-open');
    });

    DOM.badgeModal.addEventListener('click', (e) => {
        if (e.target === DOM.badgeModal) {
            DOM.badgeModal.classList.remove('is-open');
        }
    });

    // ==========================================
    // 10. WEBINARS Countdown Timer & Registration
    // ==========================================
    function startCountdown() {
        // Webinar starts in 6 hours and 30 minutes from current load dynamically
        const targetDate = new Date();
        targetDate.setHours(targetDate.getHours() + 6);
        targetDate.setMinutes(targetDate.getMinutes() + 30);
        targetDate.setSeconds(0);
        
        function tick() {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;
            
            if (distance < 0) {
                clearInterval(timerInterval);
                DOM.countdownHours.textContent = '00';
                DOM.countdownMinutes.textContent = '00';
                DOM.countdownSeconds.textContent = '00';
                DOM.countdownShort.textContent = 'Live Now!';
                return;
            }
            
            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const pad = (num) => String(num).padStart(2, '0');
            
            DOM.countdownHours.textContent = pad(hours);
            DOM.countdownMinutes.textContent = pad(minutes);
            DOM.countdownSeconds.textContent = pad(seconds);
            
            DOM.countdownShort.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }
        
        tick();
        const timerInterval = setInterval(tick, 1000);
    }

    function setupWebinars() {
        DOM.webinarButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.js-webinar-item');
                const webinarId = item.dataset.id;
                const webinar = state.webinars[webinarId];
                
                if (webinar.registered) {
                    webinar.registered = false;
                    btn.textContent = 'Register';
                    btn.classList.remove('is-registered');
                    createToast(`Cancelled registration: "${webinar.title}"`, 'warning');
                    addNotification(`Cancelled registration for: "${webinar.title}"`, 'info');
                } else {
                    webinar.registered = true;
                    btn.textContent = 'Registered ✓';
                    btn.classList.add('is-registered');
                    createToast(`Registered for: "${webinar.title}"`, 'success');
                    addNotification(`Registered for webinar: "${webinar.title}"`, 'success');
                }
            });
        });
    }

    // ==========================================
    // 11. PLAYGROUND CODE SANDBOX RENDERER
    // ==========================================
    DOM.editorTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            DOM.editorTabs.forEach(btn => btn.classList.remove('is-active'));
            tab.classList.add('is-active');
            
            const targetTab = tab.dataset.tab;
            DOM.editorWrappers.forEach(wrapper => {
                if (wrapper.id === `editor-${targetTab}`) {
                    wrapper.classList.add('is-active');
                } else {
                    wrapper.classList.remove('is-active');
                }
            });
        });
    });

    DOM.sandboxSelect.addEventListener('change', () => {
        const preset = DOM.sandboxSelect.value;
        if (preset !== 'default') {
            setupSandboxPreset(preset);
        }
    });

    function setupSandboxPreset(presetKey) {
        const preset = state.sandboxPresets[presetKey];
        if (preset) {
            DOM.sandboxHtml.value = preset.html;
            DOM.sandboxCss.value = preset.css;
            DOM.sandboxJs.value = preset.js;
            runSandboxCode();
            createToast(`Loaded template: "${presetKey}"`, 'info');
        }
    }

    DOM.sandboxRunBtn.addEventListener('click', () => {
        runSandboxCode();
        createToast('Sandbox updated!', 'success');
    });

    DOM.sandboxResetBtn.addEventListener('click', () => {
        DOM.sandboxHtml.value = '';
        DOM.sandboxCss.value = '';
        DOM.sandboxJs.value = '';
        DOM.sandboxIframe.srcdoc = '<html><body style="font-family:sans-serif; padding:1.5rem; color:#aaa;">Click Run Code to compile...</body></html>';
        DOM.sandboxSelect.value = 'default';
        createToast('Sandbox cleared', 'warning');
    });

    function runSandboxCode() {
        const html = DOM.sandboxHtml.value;
        const css = DOM.sandboxCss.value;
        const js = DOM.sandboxJs.value;
        
        const combinedCode = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        ${css}
                    </style>
                </head>
                <body>
                    ${html}
                    <script>
                        try {
                            ${js}
                        } catch(err) {
                            console.error(err);
                            document.body.innerHTML += '<div style="color:red; margin:1rem 0; font-family:monospace; padding:0.5rem; border:1px solid red;">Runtime Error: ' + err.message + '</div>';
                        }
                    </script>
                </body>
            </html>
        `;
        
        DOM.sandboxIframe.srcdoc = combinedCode;
    }

    // ==========================================
    // 12. SPRINT SUBMISSION FORM VALIDATOR
    // ==========================================
    function checkSubmissionStatus() {
        const isFrontendDone = state.courses.frontend.status === 'completed';
        const isJsDone = state.courses.javascript.status === 'completed';
        
        if (isFrontendDone && isJsDone) {
            DOM.submitBtn.disabled = false;
            DOM.requirementIndicator.innerHTML = '<i class="fa-solid fa-circle-check text-success"></i> <span>Requirements met. Ready for submit!</span>';
        } else {
            DOM.submitBtn.disabled = true;
            DOM.requirementIndicator.innerHTML = '<i class="fa-solid fa-circle-exclamation text-warning"></i> <span>Complete active tracks to 100% first.</span>';
        }
    }

    DOM.submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const repoUrl = DOM.repoInput.value.trim();
        const liveUrl = DOM.liveInput.value.trim();
        
        let isValid = true;
        
        // Reset invalid styles
        const formGroups = document.querySelectorAll('.js-form-group');
        formGroups.forEach(g => g.classList.remove('is-invalid'));
        
        // Validate GitHub repository URL
        if (!validateUrl(repoUrl) || !repoUrl.toLowerCase().includes('github.com')) {
            DOM.repoInput.closest('.js-form-group').classList.add('is-invalid');
            isValid = false;
        }
        
        // Validate live link
        if (!validateUrl(liveUrl)) {
            DOM.liveInput.closest('.js-form-group').classList.add('is-invalid');
            isValid = false;
        }
        
        if (!isValid) {
            // Apply shake animation on form
            DOM.submitForm.classList.add('shake-animation');
            setTimeout(() => DOM.submitForm.classList.remove('shake-animation'), 500);
            
            createToast('Invalid URL fields detected.', 'danger');
            return;
        }
        
        // Mock loading submit
        DOM.submitBtn.classList.add('is-loading');
        DOM.submitBtn.disabled = true;
        
        setTimeout(() => {
            DOM.submitBtn.classList.remove('is-loading');
            DOM.submitBtn.disabled = false;
            
            // Populate success modal
            DOM.modalRepoLink.textContent = repoUrl;
            DOM.modalRepoLink.href = repoUrl;
            DOM.modalLiveLink.textContent = liveUrl;
            DOM.modalLiveLink.href = liveUrl;
            
            // Open modal
            DOM.successModal.classList.add('is-open');
            addNotification('Sprint 3 deliverables successfully submitted for review.', 'success');
            createToast('Deliverables Submitted! 🚀', 'success');
            
            // Advance Sprint Value on Dash
            document.querySelector('.js-progress-sprint').textContent = 'Sprint 4';
        }, 1600);
    });

    function validateUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    DOM.closeSuccessBtn.addEventListener('click', () => {
        DOM.successModal.classList.remove('is-open');
        DOM.submitForm.reset();
        checkSubmissionStatus();
        
        // Smooth scroll to top dashboard
        document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
    });

    // Start App
    init();
});
