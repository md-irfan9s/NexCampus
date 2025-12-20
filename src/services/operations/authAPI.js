import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import toast from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API
} = endpoints


export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toasId = toast.loading("loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true
            })

            console.log("SENDOTP_API RESPONSE....", response);
            console.log(response.data.success);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email")
        }
        catch (error) {
            console.log("SENDOTP_API ERROR....", error);
            toast.error("could not send otp")
        }
        dispatch(setLoading(false));
        toast.dismiss(toasId)
    }
}

export function signUp(firstName, lastName, email, password, confirmPassword, otp, navigate) {
    return async (dispatch) => {
        const toasId = toast.loading("loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            })

            console.log("SIGNUP API RESPONSE....", response);

            if (!response.data.success) {
                throw new Error(response.data.success);
            }

            toast.success("Signup Successfully");
            navigate("/login")
        }
        catch (error) {
            console.log("SIGNUP_API ERROR.....", error);
            toast.error("could not signup account")
        }
        dispatch(setLoading(false));
        toast.dismiss(toasId)
    }
}

export function login(email, password, navigate) {

    return async (dispatch) => {
        const toasId = toast.loading("loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            })

            console.log("LOGIN_API RESPONSE....", response);

            if (!response.data.success) {
                throw new Error(response.data.success);
            }

            toast.success("Login successfully");
            dispatch(setToken(response.data.token))

            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`


            // set user and user image in redux store 
            const userWithImage = { ...response.data.user, image: userImage }
            dispatch(setUser(userWithImage))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            // set the user data in local storage
            localStorage.setItem("user", JSON.stringify(userWithImage))
            navigate("/studentcorner/profile")
        }
        catch (error) {
            console.log("LOGIN API ERROR.....", error);
            toast.error("could not login account")
        }
        toast.dismiss(toasId);
        dispatch(setLoading(false))

    }

}


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}