// components.js - Reusable UI Components

const ProjectCard = {
    render(project, onClick) {
        const { id, title, description, categoryLabel, technologies, icon, image, featured } = project;

        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.id = id;

        const techHtml = technologies.slice(0, 4).map(t => 
            `<span class="tech-tag">${t}</span>`
        ).join('');

        card.innerHTML = `
            ${image ? `<img src="${image}" alt="${title}" class="project-card-image" loading="lazy" />` : ''}
            <div class="project-card-body">
                <span class="project-card-category ${categoryLabel.toLowerCase().replace(/ /g, '-')}">${categoryLabel}</span>
                <div class="project-card-icon"><i class="fas ${icon || 'fa-code'}"></i></div>
                <h3 class="project-card-title">${title}</h3>
                <div class="project-card-tech">${techHtml}</div>
                <p class="project-card-description">${description.substring(0, 120)}${description.length > 120 ? '...' : ''}</p>
                <div class="project-card-hint">Click for details <i class="fas fa-arrow-right"></i></div>
            </div>
        `;

        if (onClick) {
            card.addEventListener('click', () => onClick(project));
            card.style.cursor = 'pointer';
        }

        return card;
    }
};

const SkillCard = {
    render(title, skills) {
        const card = document.createElement('div');
        card.className = 'skill-card';

        card.innerHTML = `
            <h3 class="skill-card-title">${title}</h3>
            <ul class="skill-card-list">
                ${skills.map(skill => `
                    <li class="skill-item">
                        <span class="skill-item-name">
                            ${skill.icon ? `<i class="${skill.icon}"></i>` : ''}
                            ${skill.name}
                        </span>
                        <div class="skill-item-bar">
                            <div class="skill-item-fill" style="width: ${skill.level}%;"></div>
                        </div>
                        <span class="skill-item-percent">${skill.level}%</span>
                    </li>
                `).join('')}
            </ul>
        `;

        return card;
    }
};

const SkeletonLoader = {
    render(type = 'card', count = 6) {
        const container = document.createElement('div');
        container.className = 'skeleton-wrapper';

        const template = `
            <div class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-line title"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line medium"></div>
                    <div class="skeleton-line short"></div>
                    <div class="skeleton-line button"></div>
                </div>
            </div>
        `;

        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.innerHTML = template;
            container.appendChild(el.firstElementChild);
        }

        return container;
    }
};

const Modal = {
    open(options) {
        const overlay = document.getElementById('projectModal');
        if (!overlay) return;

        const { title, category, description, technologies, githubLink, liveDemo } = options;

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalCategory').textContent = category;
        document.getElementById('modalDescription').textContent = description;

        const techList = document.getElementById('modalTechList');
        techList.innerHTML = technologies.map(t => `<li>${t}</li>`).join('');

        document.getElementById('modalDemo').href = liveDemo || '#';
        document.getElementById('modalGithub').href = githubLink || '#';

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    close() {
        const overlay = document.getElementById('projectModal');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
};

const Toast = {
    show(message, type = 'success') {
        const existing = document.querySelector('.toast-container');
        if (existing) existing.remove();

        const container = document.createElement('div');
        container.className = 'toast-container';

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);
        document.body.appendChild(container);

        setTimeout(() => {
            toast.classList.add('toast-hide');
            setTimeout(() => container.remove(), 300);
        }, 4000);
    },

    success(message) { this.show(message, 'success'); },
    error(message) { this.show(message, 'error'); }
};