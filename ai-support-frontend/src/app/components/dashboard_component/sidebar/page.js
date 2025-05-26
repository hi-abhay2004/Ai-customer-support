export default function Sidebar() {
    return (
      <div className="w-64 bg-white shadow-lg p-5">
        <h2 className="text-2xl font-bold mb-6">Support Agent</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Chat History</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Settings</a>
        </nav>
      </div>
    );
  }
  