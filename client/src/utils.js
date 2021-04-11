export const getToken = () => {
  return localStorage.getItem('token');
};

export const checkInvalidToken = (errorStatusCode) => {
  if (errorStatusCode === 401) {
    localStorage.setItem('token', '');
    window.location.href = '/login';
  }
};
