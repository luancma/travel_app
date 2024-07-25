"use client"
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialize } from '@/services/firebase';
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { AppBarComponent } from "@/components/ui/AppBar";

const { auth } = initialize();

export const AuthContext = createContext<{
  user: User | null;
}>({ user: null });

const AuthProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [userState, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const context = useMemo(() => ({ user: userState }), [userState]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid && window.location.pathname === "/") {
        setUserState(user);
        setLoading(false);
        router.push("/dashboard")
        return;
      }
      if (user?.uid && window.location.pathname !== "/") {
        setLoading(false);
        setUserState(user);
        return;
      }

      if (!user?.uid) {
        setLoading(false);
        setUserState(null);
        router.push("/")
        return;
      }

    });
    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider value={context}>
      <AppBarComponent />
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
export { AuthProvider, useAuth };