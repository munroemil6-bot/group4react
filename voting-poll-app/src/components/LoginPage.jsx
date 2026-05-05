import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const { login, loading } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Sign-in failed:", error);
      alert("Failed to sign in. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-orange-500 mb-4">
          🗳️ Student Council Voting
        </h1>
        <p className="text-gray-600 mb-6">
          Please sign in with your Google account to vote
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-5 h-5"
          />
          <span className="font-semibold text-gray-700">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;