const API_URL = import.meta.env.DEV
  ? 'http://localhost:5000/api'
  : 'https://social-cultural-server.vercel.app/api';

export const UPLOAD_URL = import.meta.env.DEV
  ? 'http://localhost:5000/uploads'
  : 'https://social-cultural-server.vercel.app/uploads';

export default API_URL;