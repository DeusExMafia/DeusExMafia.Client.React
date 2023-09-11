import DeusExMafiaClient from "../../DeusExMafiaClient";
import NetworkState from "../NetworkState";
import ReceiveChatMessageClientBoundPacket from "../packet/clientbound/ReceiveChatMessageClientBoundPacket";
import NetworkHandler from "./NetworkHandler";

export default abstract class CommonNetworkHandler<T extends CommonNetworkHandler<T>> extends NetworkHandler<T> {
    protected constructor(client: DeusExMafiaClient, webSocket: WebSocket, state: NetworkState<T>) {
        super(client, webSocket, state);
    }

    public abstract onReceiveChatMessage(packet: ReceiveChatMessageClientBoundPacket): void;
}
