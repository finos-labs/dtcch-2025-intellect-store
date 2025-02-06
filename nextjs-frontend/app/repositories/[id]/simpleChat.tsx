"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "@/components/ui/button";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeDisplayBlock from "@/components/code-display-block";
import { askConformixRequest } from "@/components/actions/ask-conformix-action";

type Message = {
  id: string;               // Unique ID for each message
  role: "user" | "assistant"; // Specifies who sent the message
  content: string;          // The text of the message
  timestamp?: Date;         // Optional timestamp
};

// Update the function signature to accept props
type SimpleChatProps = {
  repositoryId: string; // Define the prop type
};

export default function SimpleChat({ repositoryId }: SimpleChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Scrolls to bottom when messages change
  const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle text input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Handle Enter key
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim() || isGenerating) return;
      onSubmit();
    }
  };

  // Non-streaming function to request chat completion
  const requestChatCompletion = async (userMessage: string) => {
    try {
      const data = await askConformixRequest(userMessage, repositoryId); // Use repositoryId here

      // Create a user message
      const userMessageObj: Message = {
        id: String(Date.now()),
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      };

      // Create an assistant message
      const assistantMessage: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: data?.message || "No response from assistant",
        timestamp: new Date(),
      };

      // Update messages state with both user and assistant messages
      setMessages((prev) => [...prev, userMessageObj, assistantMessage]);
    } catch (error) {
      console.error("Error during request:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle form submit
  const onSubmit = async () => {
    if (!input.trim()) return;

    // Create a user message
    const userMessage: Message = {
      id: String(Date.now()),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    // Add it to the state
    setMessages((prev) => [...prev, userMessage]);
    setInput("");           // Reset the input field
    setIsGenerating(true);  // We'll be streaming a reply

    // Request a streamed response
    await requestChatCompletion(userMessage.content);
  };

  return (
    <div className="mx-auto max-w-2xl p-4 h-96 flex flex-col">
      {/* Message list */}
      <div ref={messagesRef} className="flex-grow overflow-y-auto p-2">
        <ChatMessageList>
          {messages.map((msg, idx) => (
            <ChatBubble
              key={msg.id}
              variant={msg.role === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar src="" fallback={msg.role === "user" ? "👤" : "🤖"} />
              <ChatBubbleMessage>
                {msg.content.split("```").map((part, partIndex) => {
                  if (partIndex % 2 === 0) {
                    // Regular Markdown text
                    return (
                      <Markdown key={partIndex} remarkPlugins={[remarkGfm]}>
                        {part}
                      </Markdown>
                    );
                  } else {
                    // Code block
                    return (
                      <pre key={partIndex} className="whitespace-pre-wrap pt-2">
                        <CodeDisplayBlock code={part} lang="" />
                      </pre>
                    );
                  }
                })}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {/* Loading bubble for streaming */}
          {isGenerating && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar src="" fallback="🤖" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring mt-2"
      >
        <ChatInput
          value={input}
          onKeyDown={onKeyDown}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Button variant="ghost" size="icon">
            <Paperclip className="size-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mic className="size-4" />
          </Button>
          <Button
            disabled={!input || isGenerating}
            type="submit"
            size="sm"
            className="ml-auto gap-1.5"
          >
            Send
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
}