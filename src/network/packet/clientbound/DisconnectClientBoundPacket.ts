import NetworkHandler from "../../handler/NetworkHandler";
import PacketBinaryReader from "../../io/PacketBinaryReader";
import ClientBoundPacket from "../ClientBoundPacket";

export default class DisconnectClientBoundPacket implements ClientBoundPacket<NetworkHandler<any>> {    
    private readonly _reason: string;

    public constructor(reader: PacketBinaryReader) {
        this._reason = reader.readString();
    }

    public get reason(): string {
        return this._reason
    }
    
    public apply(listener: NetworkHandler<any>): void {
        listener.onDisconnect(this);
    }
}
