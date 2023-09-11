import NetworkHandler from "../handler/NetworkHandler";
import PacketBinaryReader from "../io/PacketBinaryReader";
import ClientBoundPacket from "./ClientBoundPacket";

export default interface PacketCreator<T extends NetworkHandler<T>> {
    new(reader: PacketBinaryReader): ClientBoundPacket<T>;
}
