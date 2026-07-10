// data.js - Complete Mock API Data

const MockData = {
    delay: 500,

    profile: {
        name: 'Touseeq Hussain',
        title: 'Frontend Developer',
        bio: 'I design and build modern, responsive, and user-friendly web applications that make a difference in the digital world.',
        about: {
            paragraph1: 'I am a passionate Frontend Developer with a strong foundation in web technologies. Currently pursuing BS Computer Science at GOVT College of Management Science Mardan.',
            paragraph2: 'My journey in web development started with a curiosity for how websites work, and it has evolved into a professional career where I create impactful digital experiences.',
            paragraph3: 'I believe in writing clean, maintainable code and creating interfaces that are both beautiful and accessible to everyone.'
        },
        interests: [
            'Responsive Web Design & UI/UX Principles',
            'JavaScript & Modern Frameworks',
            'Web Performance Optimization',
            'Web Accessibility (WCAG)',
            'Open Source Contribution',
            'Continuous Learning & Growth'
        ],
        stats: { projects: 8, experience: '2+', satisfaction: '100%' }
    },

    skills: {
        languages: [
            { name: 'HTML5', level: 92, icon: 'fab fa-html5' },
            { name: 'CSS3', level: 88, icon: 'fab fa-css3-alt' },
            { name: 'JavaScript', level: 78, icon: 'fab fa-js' },
            { name: 'TypeScript', level: 65, icon: 'fab fa-js' }
        ],
        frameworks: [
            { name: 'React.js', level: 72, icon: 'fab fa-react' },
            { name: 'Next.js', level: 55, icon: 'fab fa-react' },
            { name: 'Bootstrap', level: 85, icon: 'fab fa-bootstrap' },
            { name: 'Tailwind CSS', level: 78, icon: 'fab fa-css3-alt' }
        ],
        tools: [
            { name: 'Git & GitHub', level: 82, icon: 'fab fa-git-alt' },
            { name: 'VS Code', level: 90, icon: 'fas fa-code' },
            { name: 'Chrome DevTools', level: 85, icon: 'fab fa-chrome' },
            { name: 'Figma', level: 65, icon: 'fab fa-figma' }
        ]
    },

    projects: [
        {
            id: 1,
            title: 'AI Chat Assistant',
            description: 'An intelligent chatbot powered by natural language processing. Features context-aware responses, multi-language support, and custom training capabilities.',
            category: 'web',
            categoryLabel: 'Web Development',
            icon: 'fa-robot',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
            technologies: ['Python', 'TensorFlow', 'React', 'WebSocket'],
            githubLink: 'https://github.com/TouseeqHussain/ai-chat',
            liveDemo: 'https://ai-chat-demo.vercel.app',
            featured: true
        },
        {
            id: 2,
            title: 'Cloud Storage Platform',
            description: 'Secure cloud storage solution with end-to-end encryption, file sharing, version history, and real-time collaboration features.',
            category: 'web',
            categoryLabel: 'Web Development',
            icon: 'fa-cloud-upload-alt',
            image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop',
            technologies: ['Node.js', 'MongoDB', 'AWS S3', 'React'],
            githubLink: 'https://github.com/TouseeqHussain/cloud-storage',
            liveDemo: 'https://cloud-storage-demo.vercel.app',
            featured: true
        },
        {
            id: 3,
            title: 'Fitness Tracker App',
            description: 'Cross-platform fitness tracking app with workout plans, step counting, heart rate monitoring, and progress analytics.',
            category: 'mobile',
            categoryLabel: 'Mobile Development',
            icon: 'fa-heartbeat',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
            technologies: ['React Native', 'Firebase', 'HealthKit', 'Google Fit'],
            githubLink: 'https://github.com/TouseeqHussain/fitness-tracker',
            liveDemo: 'https://fitness-tracker-demo.vercel.app',
            featured: false
        },
        {
            id: 4,
            title: 'Design System Library',
            description: 'Comprehensive design system with reusable components, accessibility guidelines, and interactive documentation.',
            category: 'design',
            categoryLabel: 'UI/UX Design',
            icon: 'fa-palette',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
            technologies: ['Figma', 'Storybook', 'CSS Modules', 'React'],
            githubLink: 'https://github.com/TouseeqHussain/design-system',
            liveDemo: 'https://design-system-demo.vercel.app',
            featured: false
        },
        {
            id: 5,
            title: 'Sales Analytics Dashboard',
            description: 'Interactive data visualization dashboard with real-time charts, KPI metrics, and exportable reports.',
            category: 'data',
            categoryLabel: 'Data Analysis',
            icon: 'fa-chart-bar',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
            technologies: ['Chart.js', 'D3.js', 'Python', 'Pandas'],
            githubLink: 'https://github.com/TouseeqHussain/analytics-dashboard',
            liveDemo: 'https://analytics-dashboard-demo.vercel.app',
            featured: false
        },
        {
            id: 6,
            title: 'Developer Blog Platform',
            description: 'Full-featured blog platform with Markdown support, syntax highlighting, search functionality, and SEO optimization.',
            category: 'other',
            categoryLabel: 'Other',
            icon: 'fa-blog',
            image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop',
            technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'Algolia'],
            githubLink: 'https://github.com/TouseeqHussain/dev-blog',
            liveDemo: 'https://dev-blog-demo.vercel.app',
            featured: false
        },
        {
            id: 7,
            title: 'E-commerce Marketplace',
            description: 'Full-featured e-commerce platform with product catalog, shopping cart, payment processing, and order tracking.',
            category: 'web',
            categoryLabel: 'Web Development',
            icon: 'fa-shopping-cart',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
            technologies: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
            githubLink: 'https://github.com/TouseeqHussain/ecommerce',
            liveDemo: 'https://ecommerce-demo.vercel.app',
            featured: false
        },
        {
            id: 8,
            title: 'Real-time Collaboration IDE',
            description: 'Real-time collaborative code editor with syntax highlighting, code completion, version control integration, and pair programming features.',
            category: 'web',
            categoryLabel: 'Web Development',
            icon: 'fa-code',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop',
            technologies: ['React', 'Socket.io', 'Monaco Editor', 'Node.js'],
            githubLink: 'https://github.com/TouseeqHussain/collab-ide',
            liveDemo: 'https://collab-ide-demo.vercel.app',
            featured: true
        }
    ],

    contact: {
        email: 'Touseeqhussain253@gmail.com',
        github: 'github.com/touseeqHussain25',
        linkedin: 'linkedin.com/in/touseeqHussain25'
    },

    getProfile() {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ data: this.profile }), this.delay);
        });
    },
    getSkills() {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ data: this.skills }), this.delay);
        });
    },
    getProjects() {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ data: this.projects }), this.delay);
        });
    },
    getContact() {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ data: this.contact }), this.delay);
        });
    },
    sendMessage(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve({ success: true, message: `Thank you ${formData.name}! I'll get back to you soon.` });
                } else {
                    reject(new Error('Network error. Please try again.'));
                }
            }, 1200);
        });
    }
};