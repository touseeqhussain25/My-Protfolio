// api.js - API Service Layer

class ApiService {
    constructor() {
        this.useMock = true;
        this.cache = new Map();
    }

    async request(endpoint) {
        if (this.cache.has(endpoint)) {
            const cached = this.cache.get(endpoint);
            if (Date.now() - cached.timestamp < 30000) {
                return cached.data;
            }
        }

        try {
            let data;
            if (this.useMock) {
                data = await this.getMockData(endpoint);
            } else {
                const response = await fetch(`https://your-api.com${endpoint}`);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                data = await response.json();
            }
            this.cache.set(endpoint, { data, timestamp: Date.now() });
            return data;
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    }

    getMockData(endpoint) {
        const routes = {
            '/profile': MockData.getProfile(),
            '/skills': MockData.getSkills(),
            '/projects': MockData.getProjects(),
            '/contact': MockData.getContact()
        };

        for (const [route, handler] of Object.entries(routes)) {
            if (endpoint.startsWith(route)) return handler;
        }

        if (endpoint.startsWith('/projects/')) {
            return MockData.getProjects().then(result => {
                const id = parseInt(endpoint.split('/').pop());
                return { data: result.data.find(p => p.id === id) || null };
            });
        }

        throw new Error(`Unknown endpoint: ${endpoint}`);
    }

    async getProfile() {
        const result = await this.request('/profile');
        return result.data;
    }
    async getSkills() {
        const result = await this.request('/skills');
        return result.data;
    }
    async getProjects() {
        const result = await this.request('/projects');
        return result.data;
    }
    async getContact() {
        const result = await this.request('/contact');
        return result.data;
    }
    async sendMessage(formData) {
        if (this.useMock) return MockData.sendMessage(formData);
        const response = await fetch('https://your-api.com/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        return response.json();
    }
}

const API = new ApiService();