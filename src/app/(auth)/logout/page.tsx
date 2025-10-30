'use client';
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

const LogoutPage =  () => {
    useEffect(() => {
       setTimeout(()=> redirect("/"), 3000);
    }, []);
  return (
        <div className="flex justify-center">
        <div className='z-10 pt-85 font-mono border-b'>
        You have logged out... redirecting in a sec.
        </div>
    </div>

  );
};

export default LogoutPage;