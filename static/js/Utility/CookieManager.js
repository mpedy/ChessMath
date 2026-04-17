class CookieManager {
    static setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    }
    static getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            if (cookie) {
                const [cookieName, cookieValue] = cookie.split("=");
                if (cookieName === name) {
                    return decodeURIComponent(cookieValue);
                }
            }
        }
        return null;
    }
    static deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
}

export { CookieManager };