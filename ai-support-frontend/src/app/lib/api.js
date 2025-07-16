// --- Knowledge Base File Upload ---
export async function uploadFile(companyId, file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("company", companyId);
  const res = await fetch(`${BASE_URL}/upload/`, {
    method: "POST",
    headers: { ...authHeaders() }, // Do NOT set Content-Type for FormData
    body: formData,
  });
  if (!res.ok) throw new Error("File upload failed");
  return await res.json();
}
// Central API utility for all backend endpoints
const BASE_URL = "http://34.131.200.150/support";

// Helper to get token from localStorage
export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
}

export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Token ${token}` } : {};
}
// --- Auth ---
export async function registerUser({ username, password, name, domain, company_email, business_type }) {
  const res = await fetch(`${BASE_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, name, domain, company_email, business_type }),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Registration failed");
  return await res.json();
}

export async function loginUser(username, password) {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Login failed");
  const data = await res.json();
  if (typeof window !== "undefined" && data.token) {
    localStorage.setItem("access_token", data.token);
  }
  return data;
}

export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
}

// --- Chatbot ---
export async function sendChatbotMessage({ query, company, user_email, image }) {
  const formData = new FormData();
  formData.append('query', query);
  formData.append('company', company);
  formData.append('user_email', user_email);
  if (image) {
    formData.append('image', image);
  }
  const headers = { ...authHeaders() };
  // DO NOT set Content-Type header when using FormData
  if (headers["Content-Type"]) delete headers["Content-Type"];
  const response = await fetch(`${BASE_URL}/chatbot/`, {
    method: 'POST',
    body: formData,
    headers,
  });
  if (!response.ok) {
    let errorDetail = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.error) {
        errorDetail = errorData.error;
      } else {
        errorDetail = JSON.stringify(errorData);
      }
    } catch (e) {
      errorDetail = `HTTP error! status: ${response.status} - ${response.statusText}`;
    }
    throw new Error(`Chatbot request failed: ${errorDetail}`);
  }
  return response.json();
}
export async function getChatMessages(ticketId) {
  const res = await fetch(`${BASE_URL}/chat-messages/?ticket=${ticketId}`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch chat messages");
  return await res.json();
}


// --- Feedback ---

// --- Feedback ---

export async function submitFeedback({ company, user_email, rating, comment }) {
  const res = await fetch(`${BASE_URL}/feedback/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ company, user_email, rating, comment }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Feedback submit failed");
  }

  return await res.json();
}
