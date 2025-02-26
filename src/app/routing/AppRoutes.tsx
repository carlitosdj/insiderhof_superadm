/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import { AuthPage, Logout, useAuth } from "../modules/auth";
import { App } from "../App";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { useCookies } from "react-cookie";
import { User } from "../../store/ducks/me/types";
import { useDispatch } from "react-redux";
import { authfromcookie } from "../../store/ducks/me/actions";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { BASE_URL } = import.meta.env;

const AppRoutes: FC = () => {
  //const {currentUser, setCurrentUser} = useAuth()
  //console.log("currentUser", currentUser);

  const me = useSelector((state: ApplicationState) => state.me);
  //Cookies:
  const [cookies, setCookie] = useCookies(["userAdmINSIDER"]);
  const cookieUser: User = cookies.userAdmINSIDER;
  const dispatch = useDispatch();

  // Para o refresh da página:
  if (!me.logged && cookieUser) {
    console.log("tem cookie user!", cookieUser);
    // console.log('Cookie user found routes...', cookieUser)

    dispatch(authfromcookie(cookieUser));
  }
  if (me.logged && !cookieUser) {
    console.log("Está conectado mas sem cookieUser, cadastrando cookie:");
    var date = new Date();
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000); //Days *
    //Seta cookie:
    setCookie("userAdmINSIDER", me.me, {
      path: "/",
      expires: date, //maxAge?
    });
    // return <div>eai</div>
  }

  return (
    <BrowserRouter basename={BASE_URL} future={{ v7_startTransition: true }}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {me.logged && cookieUser ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
