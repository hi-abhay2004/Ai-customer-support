export default function TopNav() {
    return (
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center border-b">
        {/* Left: Title or Breadcrumb */}
        <h1 className="text-xl font-semibold">Dashboard</h1>
  
        {/* Right: User Profile / Settings */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative">
            <span className="material-icons text-gray-600">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
  
          {/* User Info */}
          <div className="flex items-center space-x-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">Agent Name</span>
          </div>
        </div>
      </div>
    );
  }
  