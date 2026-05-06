import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase"; 

function Login() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User signed in!");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default Login;