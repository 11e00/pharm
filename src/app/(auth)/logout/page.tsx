'use client';
import { redirect } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

const LogoutPage =  () => {
    useEffect(() => {
       setTimeout(()=> redirect("/"), 3000);
    }, []);
  return (
        <div className="flex pt-75 justify-center">
        <Card className='z-10 p-2 font-mono'>
            <CardDescription>
                You have logged out... redirecting in a sec.
            </CardDescription>
        </Card>
    </div>

  );
};

export default LogoutPage;