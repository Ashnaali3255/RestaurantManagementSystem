// Local development uses XAMPP. Production uses a CORS proxy in front of
// the InfinityFree backend, because InfinityFree strips CORS headers.
const RAW_BACKEND = "https://tastybite.infinityfree.me";
const PROXY = "https://corsproxy.io/?url=";

const isProduction = import.meta.env.PROD;

export const API_BASE = isProduction
  ? PROXY + encodeURIComponent(RAW_BACKEND)
  : "http://localhost/restuarant-backend";

export const API = {
  getMenu: `${API_BASE}/getMenu.php`,
  addOrder: `${API_BASE}/addOrder.php`,
  getOrders: `${API_BASE}/getOrders.php`,
};