import { Navigate, Route, Routes } from "react-router-dom";
import { logoutUser } from "../../../store/ducks/me/actions";
// import { User } from "../apps/user-management/users-list/core/_models";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export function Logout() {
  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies(["userAdm"]);
  // const cookieUser: User = cookies.userAdm;
  // console.log("########### cookies Começo", cookies);
  removeCookie("userAdm", { path: "/" });
  dispatch(logoutUser());
  localStorage.removeItem("TOKEN");
  useEffect(() => {
    document.location.reload();
  })

  return (
    <Routes>
      <Route index element={<Navigate to="/auth/login" />} />
    </Routes>
  );
}
