import LoginButton from "./(auth)/components/LoginLogoutButton";
import UserGreetText from "./(auth)/components/UserGreetText";
import Image from "next/image";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Home() {
  return (
        <div className="z-10 font-mono fixed flex h-48 w-full items-end justify-center from-white via-white dark:from-black dark:via-black">
            <UserGreetText />
            <LoginButton />
        </div>
  );
}
