import NetworkHandler from "../handler/NetworkHandler";

export default interface ClientBoundPacket<T extends NetworkHandler<T>> {
    apply(listener: T): void;
}
