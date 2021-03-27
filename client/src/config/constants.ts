//example constant
export const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.PUBLIC_URL
    : 'http://localhost:8000';
