function LogoutButton({ user, onLogout }) {
  // Get first letter of user's name for avatar
  const getInitial = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "?";
  };

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow mb-4">
      <div className="flex items-center gap-3">
        {user?.photoURL ? (
          <img 
            src={user.photoURL} 
            alt="Profile" 
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            {getInitial()}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-800">
            {user?.displayName || "Student"}
          </p>
          <p className="text-sm text-gray-500">
            {user?.email}
          </p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}

export default LogoutButton;