export default class ChatMessageEvent extends Event {
    private readonly _message: string;

    public constructor(message: string) {
        super("chat");
        this._message = message;
    }

    public get message() {
        return this._message;
    }
}
