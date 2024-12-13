import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: "http://localhost:9090",
    realm: "gebrain",
    clientId: "gebrain_tenent",
});
const initKeycloak = (onAuthenticatedCallback: Function, logout: Function) => {

    // khởi tạo đối tượng keycloak
    keycloak.init({
        onLoad: "login-required",
        enableLogging: true,
        pkceMethod: "S256",
        
        // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    })
        .then((authenticated: boolean) => {
            if (!authenticated) {
                logout();
            }
            return onAuthenticatedCallback();
        })
        .catch((e) => {
            return console.error;
        });
};

const getKeyCloak = () => keycloak;

const doLogin = keycloak.login; // đăng nhập

const doLogout = keycloak.logout; // đăng xuất

const getToken = () => keycloak.token; // lấy token

const isLoggedIn = () => keycloak.authenticated; // kiểm tra trạng thái đăng nhập

const getUsername = () => keycloak.tokenParsed?.realm_access; // lấy thông tin user

const hasRole = (roles: string[]) => roles.some((role: string) => keycloak.hasRealmRole(role)); // kiểm tra quyền

const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    getUsername,
    hasRole,
    getKeyCloak
};

export default UserService;