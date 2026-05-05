function Login({ onLogin }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">
          Student Council Voting
        </h2>
        <p className="text-gray-600 mb-6">
          Please sign in with your Google account to cast your vote
        </p>
        <button
          onClick={onLogin}
          className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 transition-colors w-full"
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;