import dynamic from "next/dynamic";

const ChatLayout = dynamic(() => import("@/components/ChatLayout"), {
  ssr: false,
});

export default function ChatPage() {
  return <ChatLayout data-oid="-979n9o" />;
}
