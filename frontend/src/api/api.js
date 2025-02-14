import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const signup = (userData) => API.post('/auth/signup', userData);
export const verifyOTP = (otpData) => API.post('/auth/verify-otp', otpData);
export const login = (userData) => API.post('/auth/login', userData);
export const getProducts = () => API.get('/products');
export const selectProduct = (data) => API.post('/products/select', data);
export const createOrder = (data) => API.post('/payments/order', data);
export const verifyPayment = (data) => API.post('/payments/verify', data);

export default API;
