// script.js - Complete Application Logic

// ===== THEME MANAGER =====
const ThemeManager = {
    init() {
        const saved = localStorage.getItem('portfolio-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = saved || (prefersDark ? 'dark' : 'light');
        this.setTheme(theme);
        
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-mode');
            this.setTheme(isDark ? 'light' : 'dark');
        });
    },

    setTheme(theme) {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        localStorage.setItem('portfolio-theme', theme);
        
        const btn = document.getElementById('themeToggle');
        if (btn) {
            const icon = btn.querySelector('i');
            const text = btn.querySelector('span');
            if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            if (text) text.textContent = theme === 'dark' ? 'Light' : 'Dark';
        }
    }
};

// ===== NAVIGATION =====
const Navigation = {
    init() {
        const links = document.querySelectorAll('.nav-link');
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle?.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    links.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section');
            let current = 'home';
            sections.forEach(section => {
                const top = section.offsetTop - 150;
                if (window.scrollY >= top) current = section.id;
            });
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        });
    }
};

// ===== PROFILE LOADER =====
async function loadProfile() {
    try {
        const profile = await API.getProfile();
        
        document.getElementById('profileName').textContent = profile.name;
        document.getElementById('profileTitle').textContent = profile.title;
        document.getElementById('profileBio').textContent = profile.bio;
        document.getElementById('projectCount').textContent = 0;
        
        const aboutContent = document.getElementById('aboutContent');
        aboutContent.innerHTML = `
            <div class="about-text">
                <p>${profile.about.paragraph1}</p>
                <p>${profile.about.paragraph2}</p>
                <p>${profile.about.paragraph3}</p>
            </div>
            <div class="about-interests">
                <h3><i class="fas fa-heart" style="color: var(--primary);"></i> Interests</h3>
                <ul>
                    ${profile.interests.map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>
        `;
        
    } catch (error) {
        console.error('Failed to load profile:', error);
    }
}

// ===== SKILLS LOADER =====
async function loadSkills() {
    try {
        const skills = await API.getSkills();
        const grid = document.getElementById('skillsGrid');
        
        const groups = [
            { title: 'Languages', items: skills.languages },
            { title: 'Frameworks & Libraries', items: skills.frameworks },
            { title: 'Tools & Platforms', items: skills.tools }
        ];
        
        grid.innerHTML = '';
        groups.forEach(group => {
            const card = SkillCard.render(group.title, group.items);
            grid.appendChild(card);
        });
        
    } catch (error) {
        console.error('Failed to load skills:', error);
    }
}

// ===== PROJECTS LOADER =====
let allProjects = [];
let currentFilter = 'all';

async function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    const skeleton = document.getElementById('skeletonGrid');
    const emptyState = document.getElementById('emptyState');
    const errorState = document.getElementById('errorState');

    grid.innerHTML = '';
    emptyState.style.display = 'none';
    errorState.style.display = 'none';
    skeleton.style.display = 'grid';
    skeleton.innerHTML = SkeletonLoader.render('card', 6).innerHTML;

    try {
        const projects = await API.getProjects();
        allProjects = projects;
        
        const categories = [
            { key: 'all', label: 'All' },
            ...Object.entries(projects.reduce((acc, p) => {
                if (!acc[p.category]) acc[p.category] = p.categoryLabel;
                return acc;
            }, {})).map(([key, label]) => ({ key, label }))
        ];

        const filterContainer = document.getElementById('filterButtons');
        filterContainer.innerHTML = categories.map(({ key, label }) => {
            const count = key === 'all' ? projects.length : projects.filter(p => p.category === key).length;
            return `
                <button class="filter-btn ${key === 'all' ? 'active' : ''}" data-filter="${key}">
                    ${label} <span class="filter-count">${count}</span>
                </button>
            `;
        }).join('');

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                applyFilters();
            });
        });

        document.getElementById('searchInput').addEventListener('input', applyFilters);
        
        skeleton.style.display = 'none';
        renderProjects(projects);
        
    } catch (error) {
        console.error('Failed to load projects:', error);
        skeleton.style.display = 'none';
        errorState.style.display = 'block';
        document.getElementById('errorMessage').textContent = error.message || 'Failed to load projects';
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    let filtered = allProjects;
    
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(p => {
            return p.title.toLowerCase().includes(searchTerm) ||
                   p.description.toLowerCase().includes(searchTerm) ||
                   p.technologies.some(t => t.toLowerCase().includes(searchTerm)) ||
                   p.categoryLabel.toLowerCase().includes(searchTerm);
        });
    }
    
    renderProjects(filtered);
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');
    
    grid.innerHTML = '';
    emptyState.style.display = 'none';
    
    if (projects.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    projects.forEach(project => {
        const card = ProjectCard.render(project, (proj) => {
            Modal.open({
                title: proj.title,
                category: proj.categoryLabel,
                description: proj.description,
                technologies: proj.technologies,
                githubLink: proj.githubLink,
                liveDemo: proj.liveDemo
            });
        });
        grid.appendChild(card);
    });
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    currentFilter = 'all';
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-btn[data-filter="all"]')?.classList.add('active');
    applyFilters();
}

// ===== CONTACT LOADER =====
async function loadContact() {
    try {
        const contact = await API.getContact();
        document.getElementById('contactEmail').textContent = contact.email;
        document.getElementById('contactGithub').textContent = contact.github;
        document.getElementById('contactLinkedin').textContent = contact.linkedin;
    } catch (error) {
        console.error('Failed to load contact:', error);
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName');
        const email = document.getElementById('contactEmailInput');
        const message = document.getElementById('contactMessage');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnLoading = document.getElementById('btnLoading');
        const successDiv = document.getElementById('formSuccess');
        const successMsg = document.getElementById('successMessage');
        
        successDiv.style.display = 'none';
        ['nameError', 'emailError', 'messageError'].forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
        [name, email, message].forEach(el => el.classList.remove('error'));
        
        let isValid = true;
        
        if (name.value.trim().length < 2) {
            document.getElementById('nameError').style.display = 'block';
            name.classList.add('error');
            isValid = false;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            document.getElementById('emailError').style.display = 'block';
            email.classList.add('error');
            isValid = false;
        }
        
        if (message.value.trim().length < 10) {
            document.getElementById('messageError').style.display = 'block';
            message.classList.add('error');
            isValid = false;
        }
        
        if (!isValid) return;
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        try {
            const result = await API.sendMessage({
                name: name.value.trim(),
                email: email.value.trim(),
                message: message.value.trim()
            });
            
            successMsg.textContent = result.message;
            successDiv.style.display = 'flex';
            form.reset();
            Toast.success('Message sent successfully!');
            
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 5000);
            
        } catch (error) {
            Toast.error(error.message || 'Failed to send message');
        } finally {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
}

// ===== MODAL CONTROLS =====
function initModalControls() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('modalClose');
    
    closeBtn.addEventListener('click', () => Modal.close());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) Modal.close();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') Modal.close();
    });
}

// ===== FOOTER =====
function initFooter() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-wrapper')
        .forEach(el => observer.observe(el));
}

// ===== INITIALIZE APP =====
async function initApp() {
    console.log('🚀 Initializing Portfolio...');
    
    ThemeManager.init();
    Navigation.init();
    initModalControls();
    initContactForm();
    initFooter();
    initScrollAnimations();
    
    await loadProfile();
    await loadSkills();
    await loadProjects();
    await loadContact();
    
    console.log('✅ Portfolio loaded successfully!');
}

document.addEventListener('DOMContentLoaded', initApp);