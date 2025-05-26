export default function ChatList() {
    const chats = [
      { id: 1, name: 'John Doe', preview: 'I need help with my order' },
      { id: 2, name: 'Sarah Lee', preview: 'AI reply didn’t help' },
    ];
  
    return (
      <div className="w-1/3 bg-white border-r overflow-y-auto">
        <h3 className="p-4 font-semibold text-lg">Active Chats</h3>
        {chats.map(chat => (
          <div key={chat.id} className="p-4 border-b hover:bg-gray-100 cursor-pointer">
            <p className="font-bold">{chat.name}</p>
            <p className="text-sm text-gray-500">{chat.preview}</p>
          </div>
        ))}
      </div>
    );
  }
  