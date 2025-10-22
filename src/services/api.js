const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get headers
  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Helper method to handle responses
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  }

  // Auth API
  async register(userData) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  }

  async login(email, password) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password })
    });
    return this.handleResponse(response);
  }

  async getCurrentUser() {
    const response = await fetch(`${this.baseURL}/auth/me`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async updateProfile(userData) {
    const response = await fetch(`${this.baseURL}/auth/profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  }

  async changePassword(currentPassword, newPassword) {
    const response = await fetch(`${this.baseURL}/auth/change-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return this.handleResponse(response);
  }

  async logout() {
    const response = await fetch(`${this.baseURL}/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // Cars API
  async getCars(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${this.baseURL}/cars?${queryString}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async getCar(id) {
    const response = await fetch(`${this.baseURL}/cars/${id}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async checkAvailability(carId, startDate, endDate) {
    const response = await fetch(`${this.baseURL}/cars/${carId}/availability`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ startDate, endDate })
    });
    return this.handleResponse(response);
  }

  async getCarCategories() {
    const response = await fetch(`${this.baseURL}/cars/categories`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async getCarBrands() {
    const response = await fetch(`${this.baseURL}/cars/brands`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // Bookings API
  async getBookings(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${this.baseURL}/bookings?${queryString}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async getBooking(id) {
    const response = await fetch(`${this.baseURL}/bookings/${id}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async createBooking(bookingData) {
    const response = await fetch(`${this.baseURL}/bookings`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(bookingData)
    });
    return this.handleResponse(response);
  }

  async updateBookingStatus(id, status, notes) {
    const response = await fetch(`${this.baseURL}/bookings/${id}/status`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ status, notes })
    });
    return this.handleResponse(response);
  }

  async cancelBooking(id, reason) {
    const response = await fetch(`${this.baseURL}/bookings/${id}/cancel`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ reason })
    });
    return this.handleResponse(response);
  }

  async rateBooking(id, carRating, serviceRating, carReview, serviceReview) {
    const response = await fetch(`${this.baseURL}/bookings/${id}/rate`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        carRating,
        serviceRating,
        carReview,
        serviceReview
      })
    });
    return this.handleResponse(response);
  }

  // Users API
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${this.baseURL}/users?${queryString}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async getUser(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async updateUser(id, userData) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  }

  async getUserBookings(id, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${this.baseURL}/users/${id}/bookings?${queryString}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async getUserStats(id) {
    const response = await fetch(`${this.baseURL}/users/${id}/stats`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // Admin API
  async getDashboardStats() {
    const response = await fetch(`${this.baseURL}/admin/dashboard`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async getAnalytics(period = '30d', type = 'revenue') {
    const response = await fetch(`${this.baseURL}/admin/analytics?period=${period}&type=${type}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // Payments API
  async createPaymentIntent(bookingId, amount) {
    const response = await fetch(`${this.baseURL}/payments/create-payment-intent`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ bookingId, amount })
    });
    return this.handleResponse(response);
  }

  async confirmPayment(paymentIntentId, bookingId) {
    const response = await fetch(`${this.baseURL}/payments/confirm-payment`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ paymentIntentId, bookingId })
    });
    return this.handleResponse(response);
  }

  async processRefund(bookingId, amount) {
    const response = await fetch(`${this.baseURL}/payments/refund`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ bookingId, amount })
    });
    return this.handleResponse(response);
  }

  async getPaymentMethods() {
    const response = await fetch(`${this.baseURL}/payments/methods`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;