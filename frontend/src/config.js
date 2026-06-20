// Local development uses XAMPP. Production uses the live backend URL
// set in Netlify's environment variables (VITE_API_BASE).
export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost/restuarant-backend";

export const API = {
  getMenu: `${API_BASE}/getMenu.php`,
  addOrder: `${API_BASE}/addOrder.php`,
  getOrders: `${API_BASE}/getOrders.php`,
};