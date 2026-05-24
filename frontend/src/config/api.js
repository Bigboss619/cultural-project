const API_URL = import.meta.env.DEV
  ? 'http://localhost:5000'
  : 'https://cultural-server-delta.vercel.app';

export const UPLOAD_URL = import.meta.env.DEV
  ? 'http://localhost:5000/uploads'
  : 'https://cultural-server-delta.vercel.app/uploads';

export default API_URL;