import NetworkState from "../NetworkState";
import NetworkHandler from "../handler/NetworkHandler";
import PacketBinaryReader from "../io/PacketBinaryReader";
import PacketBinaryWriter from "../io/PacketBinaryWriter";
import ClientBoundPacket from "./ClientBoundPacket";
import ServerBoundPacket from "./ServerBoundPacket";

export default class PacketHandler<T extends NetworkHandler<T>> {
    private readonly networkHandler: T;
    private readonly state: NetworkState<T>;

    public constructor(networkHandler: T, state: NetworkState<T>) {
        this.networkHandler = networkHandler;
        this.state = state;
    }

    public getPacketBuffer<U extends ServerBoundPacket>(packet: U): ArrayBuffer {
        let id: number = this.state.getId(packet.constructor.name);
        let writer: PacketBinaryWriter = new PacketBinaryWriter();
        writer.writeInteger(id);
        packet.write(writer);
        return writer.buffer;
    }

    public handle(receivedSize: number, buffer: ArrayBuffer): void {
        let reader: PacketBinaryReader = new PacketBinaryReader(buffer);
        
        let packet: ClientBoundPacket<T> = this.readPacket(reader);
        if (reader.position !== receivedSize) {
            this.networkHandler.disconnect(`Invalid packet payload: Expected ${reader.position} bytes, got ${receivedSize} bytes instead`);
            return;
        }
        packet.apply(this.networkHandler);
    }

    private readPacket(reader: PacketBinaryReader): ClientBoundPacket<T> {
        let id: number = reader.readInteger();
        return new (this.state.getCreator(id))(reader);
    }
}
