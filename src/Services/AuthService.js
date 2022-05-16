import decode from "jwt-decode";
import Swal from "sweetalert2";
import Axios from "axios";

export default class AuthService {

    async login(password) {
        try{
            let res = await Axios.post("/login",{password:password})
            console.log(res)
            localStorage.setItem("token",res.data.token)
            window.location = "/dashboard"
        }catch(err){
            Swal.fire({
                icon: 'error',
                title: 'Wrong password',
                text: 'Please enter the correct password',
            })
        }
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token); // handwaiving here
    }

    isTokenExpired(token) {
        try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
            // Checking if token is expired. N
            return true;
        } else return false;
        } catch (err) {
        return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem("token");
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem("token");
    }

    getDecodedToken() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }
}