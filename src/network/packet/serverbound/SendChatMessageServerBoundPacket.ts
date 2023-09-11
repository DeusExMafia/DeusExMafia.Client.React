import PacketBinaryWriter from "../../io/PacketBinaryWriter";
import ServerBoundPacket from "../ServerBoundPacket";

export default class SendChatMessageServerBoundPacket implements ServerBoundPacket {
    private readonly message: string;

    public constructor(message: string) {
        this.message = message;
    }

    public write(writer: PacketBinaryWriter): void {
        writer.writeString(this.message);
    }
}
