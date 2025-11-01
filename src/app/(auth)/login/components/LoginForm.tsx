import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card"
import SignInWithGoogleButton from "./SignInWithGoogleButton"
import SignInWithFacebookButton from "./SignInWithFacebookButton"
import SignInWithSMSButton from "./SignInWithSMSButton"

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action="">
            <div className="grid gap-4">
             <SignInWithGoogleButton/>
             <SignInWithFacebookButton/> 
             <hr/>
             <Card className="p-3">
                <CardTitle className="text-lg text-center">Login with Phone Number</CardTitle>
                <SignInWithSMSButton />
            </Card>
            </div>
        </form>
      </CardContent>
    </Card>
  )
}
