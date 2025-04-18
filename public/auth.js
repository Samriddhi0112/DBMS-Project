class Auth {
    static checkAccess() {
        const isPaid = localStorage.getItem('programAccess');
        if (!isPaid) {
            window.location.href = '/payment';
        }
    }

    static setAccess(programId) {
        localStorage.setItem('programAccess', programId);
    }

    static isLoggedIn() {
        return localStorage.getItem('userToken') !== null;
    }
}

// Export the Auth class
export default Auth;