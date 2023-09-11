import CommonNetworkHandler from "../../handler/CommonNetworkHandler";
import PacketBinaryReader from "../../io/PacketBinaryReader";
import ClientBoundPacket from "../ClientBoundPacket";

export default class ReceiveChatMessageClientBoundPacket implements ClientBoundPacket<CommonNetworkHandler<any>> {
    private readonly _message: string;

    public constructor(reader: PacketBinaryReader) {
        this._message = reader.readString();
    }

    public get message() {
        return this._message;
    }

    apply(listener: CommonNetworkHandler<any>): void {
        listener.onReceiveChatMessage(this);
    }
}
