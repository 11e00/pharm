
"use client";
import { supabase } from "@/app/db";
import React, { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const UserGreetText = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);
  if (user !== null) {
    console.log(user);
    return (
      <p
        className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 
        backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
      >
        hello&nbsp;
        <code className="font-mono font-bold">{user.user_metadata.full_name ?? "user"}!</code>
      </p>
    );
  }
  return (
    <p
      className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-6"
    >
      Welcome to &nbsp;<code>Pharm.com</code>
    </p>
  );
};

export default UserGreetText;