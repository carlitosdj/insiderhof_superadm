import { Navigate, Route, Routes } from "react-router-dom";
import { logoutUser } from "../../../store/ducks/me/actions";
// import { User } from "../apps/user-management/users-list/core/_models";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ApplicationState } from "../../../store";

export function Logout() {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["userAdmINSIDER"]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const me = useSelector((state: ApplicationState) => state.me);

  // const cookieUser: User = cookies.userAdmINSIDER;
  // console.log("########### cookies Começo", cookies);

  useEffect(() => {
    if (isLoggingOut) return; // Evita execução múltipla
    
    console.log("🔍 LOGOUT DEBUG - Estado inicial:", {
      logged: me.logged,
      cookie: cookies.userAdmINSIDER,
      token: localStorage.getItem("TOKEN")
    });
    
    setIsLoggingOut(true);
    
    // Força a limpeza imediata
    const performLogout = async () => {
      console.log("🚪 Iniciando processo de logout...");
      
      // Remove o cookie do usuário de múltiplas formas
      removeCookie("userAdmINSIDER", { path: "/" });
      removeCookie("userAdmINSIDER", { path: "/", domain: window.location.hostname });
      removeCookie("userAdmINSIDER", { path: "/", domain: "." + window.location.hostname });
      console.log("🍪 Cookie removido de múltiplas formas");
      
      // Dispatch da ação de logout
      dispatch(logoutUser());
      console.log("🔄 Dispatch de logout enviado");
      
      // Salva as configurações importantes antes de limpar
      const preservedSettings: { [key: string]: string | null } = {};
      
      // Preserva todas as configurações que começam com 'kt_' (tema e outras configurações do Metronic)
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('kt_')) {
          preservedSettings[key] = localStorage.getItem(key);
        }
      }
      
      // Preserva configurações específicas importantes
      preservedSettings['i18nConfig'] = localStorage.getItem('i18nConfig');
      
      console.log("🎨 Configurações importantes salvas:", preservedSettings);
      
      // Remove o token do localStorage
      localStorage.removeItem("TOKEN");
      console.log("🗝️ Token removido do localStorage");
      
      // Limpa qualquer outro dado de sessão
      sessionStorage.clear();
      console.log("🗂️ SessionStorage limpo");
      
      // Limpa localStorage mas preserva o tema
      localStorage.clear();
      console.log("🗂️ LocalStorage limpo");
      
      // Restaura as configurações importantes
      Object.entries(preservedSettings).forEach(([key, value]) => {
        if (value !== null) {
          localStorage.setItem(key, value);
        }
      });
      console.log("🎨 Configurações importantes restauradas");
      
      // Aguarda um pouco para garantir que o dispatch foi processado
      await new Promise(resolve => setTimeout(resolve, 200));
      
      console.log("🔍 LOGOUT DEBUG - Estado final:", {
        logged: me.logged,
        cookie: cookies.userAdmINSIDER,
        token: localStorage.getItem("TOKEN")
      });
      
      // Verifica se ainda há cookie e força remoção se necessário
      if (cookies.userAdmINSIDER) {
        console.log("⚠️ Cookie ainda existe, forçando remoção...");
        document.cookie = "userAdmINSIDER=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "userAdmINSIDER=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
      }
      
      // Redireciona para login
      console.log("🔄 Redirecionando para /auth/login...");
      window.location.replace("/auth/login");
    };
    
    performLogout();
  }, []); // Executa apenas uma vez

  return (
    <Routes>
      <Route index element={<Navigate to="/auth/login" />} />
    </Routes>
  );
}
