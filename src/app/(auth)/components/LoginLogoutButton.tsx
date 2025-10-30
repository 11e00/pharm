"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/db";
import { Button } from "@/components/ui/button";

const LoginButton = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut(); 
    setUser(null);
    router.push("/logout");
  };

  if (user) {
    return (
      <Button onClick={handleLogout}>
        Log out
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => router.push("/login")}
    >
      Login
    </Button>
  );
};

export default LoginButton;
