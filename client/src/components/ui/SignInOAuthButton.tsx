import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./button";

const SignInOAuthButton = () => {
    const {signIn,isLoaded}=useSignIn()
    if(!isLoaded)
        return null;
    const signInWithGoogle=()=>{
        signIn.authenticateWithRedirect({
            strategy:"oauth_google",
            redirectUrl:"/sso-callback",
            redirectUrlComplete:"/auth-callback"
        })
    }
  return <Button onClick={signInWithGoogle} variant={"secondary"} className="w-full border-zinc-100 text-white h-11">Continue with Google</Button>
    
  
}

export default SignInOAuthButton