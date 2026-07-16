import { useState } from "react";
import { sendMessages } from "../../services/MessageService";

export const MessageInput = ({ receiverId }) => {
  const [text, setText] = useState("");

  const send = async () => {
    if (!text.trim()) return;

    await sendMessages(receiverId, text);

    setText("");
  };

  return (
    <div className="flex gap-3 border-t p-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-lg px-3 py-2"
      />

      <button onClick={send} className="bg-blue-600 text-white px-5 rounded-lg">
        Send
      </button>
    </div>
  );
};
