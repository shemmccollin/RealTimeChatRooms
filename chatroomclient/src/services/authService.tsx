import { toast } from "react-toastify";
import axios from "axios";
import { redirect } from "react-router-dom";
import { ROLES } from "../constants/ROLES";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function activateToast(status: string, message: string) {
  if (status === "success") {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else if (status === "error") {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
}

export async function signUpAction({ request }: any) {
  const formData = await request.formData();
  const signup = Object.fromEntries(formData);

  try {
    const res = await axios.post("/auth/signup", signup);
    activateToast("success", res.data.message);
    return redirect("/");
  } catch (error: any) {
    activateToast("error", error.response.data.message);
    return null;
  }
}

export async function logInAction({ request }: any) {
  const formData = await request.formData();
  const login = Object.fromEntries(formData);

  try {
    const res = await axios.post("/auth/login", login);

    if (res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data));
      activateToast("success", `Welcome ${res.data.username}.`);
      if (res.data.roles.includes(ROLES.ROLE_ADMIN)) {
        return redirect("/dashboard");
      }
      return redirect("/chatrooms");
    } else {
      activateToast("error", `Something went wrong!`);
      return null;
    }
  } catch (error: any) {
    activateToast("error", "Username or Password incorrect!");
    return null;
  }
}

export function signOut() {
  localStorage.removeItem("user");
}

export function getUser() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}

export function isUser() {
  const user: any = getUser();
  if (user) {
    return user.roles.includes(ROLES.ROLE_USER) ? true : false;
  }

  return false;
}

export function isAdmin() {
  const user: any = getUser();
  if (user) {
    return user.roles.includes(ROLES.ROLE_ADMIN) ? true : false;
  }

  return false;
}

export function getHeader() {
  const user: any = getUser();

  if (user && user.token) {
    return `Bearer ${user.token}`;
  } else {
    return "";
  }
}
