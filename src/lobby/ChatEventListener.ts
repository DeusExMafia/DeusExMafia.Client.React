import Consumer from "../util/Consumer";
import ChatMessageEvent from "./ChatMessageEvent";

export default class ChatEventListener extends EventTarget {
    public set chat(chat: Consumer<ChatMessageEvent>) {
        this.addEventListener("chat", (m) => {
            chat(m as ChatMessageEvent);
        });
    }

    public apply(message: string): void {
        this.dispatchEvent(new ChatMessageEvent(message));
    }
}
