import { useState, useCallback, useEffect } from 'react';

let logoutTimmer;

export const useAuth = () => {
     const [token, setToken] = useState(null);
     const [tokenExpirationDate, setTokenExpirationDate] = useState();
     const [userId, setUserId] = useState(false);

     const login = useCallback((userId, token, expirationDate) => {
       setToken(token);
       const tokenExpirationDate =
         expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
       setTokenExpirationDate(tokenExpirationDate);
       localStorage.setItem(
         "userData",
         JSON.stringify({
           userId: userId,
           token: token,
           expiration: tokenExpirationDate.toISOString(),
         })
       );
       setUserId(userId);
     }, []);

     const logout = useCallback(() => {
       setToken(null);
       setUserId(null);
       setTokenExpirationDate(null);
       localStorage.removeItem("userData");
     }, []);

     useEffect(() => {
       if (token && tokenExpirationDate) {
         const remainigTime =
           tokenExpirationDate.getTime() - new Date().getTime();
         logoutTimmer = setTimeout(logout, remainigTime);
       } else {
         clearTimeout(logoutTimmer);
       }
     }, [token, logout, tokenExpirationDate]);

     useEffect(() => {
       const storedData = JSON.parse(localStorage.getItem("userData"));
       if (
         storedData &&
         storedData.token &&
         new Date(storedData.expiration) > new Date()
       ) {
         login(
           storedData.userId,
           storedData.token,
           new Date(storedData.expiration)
         );
       }
     }, [login]);

     return {token, login, logout, userId}
}