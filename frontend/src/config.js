// Local development uses XAMPP. Production uses the live AwardSpace backend.
export const API_BASE = import.meta.env.PROD
  ? "https://tastybite.awardspace.com"
  : "http://localhost/restuarant-backend";

export const API = {
  getMenu: `${API_BASE}/getMenu.php`,
  addOrder: `${API_BASE}/addOrder.php`,
  getOrders: `${API_BASE}/getOrders.php`,
};