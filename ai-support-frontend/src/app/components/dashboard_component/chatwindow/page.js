export default function ChatWindow() {
    return (
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <p className="text-sm text-gray-500 mb-2">Customer: I need help with my refund</p>
          <p className="text-sm text-gray-700 mb-4">AI: Sure, I can help you with that...</p>
          <p className="text-sm text-gray-500 mb-2">Customer: That didn't work</p>
        </div>
        <div className="mt-4 flex">
          <input
            className="flex-1 border border-gray-300 rounded px-4 py-2"
            placeholder="Type your response..."
          />
          <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Send</button>
        </div>
      </div>
    );
  }
  