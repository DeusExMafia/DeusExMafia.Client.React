import PacketBinaryWriter from "../io/PacketBinaryWriter";

export default interface ServerBoundPacket {
    write(writer: PacketBinaryWriter): void;
}
