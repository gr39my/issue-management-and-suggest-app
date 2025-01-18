const API_BASE_URL = 'http://localhost:5000/api';

export async function createIssue(issueData: {
    title: string;
    description: string;
    department: string;
}) {
    const response = await fetch(`${API_BASE_URL}/issues`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(issueData),
    });
    if (!response.ok) {
        throw new Error('Failed to create issue');
    }
    return response.json();
}

export async function fetchSuggestions(description: string, department: string) {
    const response = await fetch(`${API_BASE_URL}/suggestions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, department }),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
    }
    return response.json();
}

export async function fetchDashboardData() {
    const response = await fetch(`${API_BASE_URL}/dashboard`);
    if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
    }
    return response.json();
}

