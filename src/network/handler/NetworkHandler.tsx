import DeusExMafiaClient from "../../DeusExMafiaClient";
import DisconnectedScreen from "../../render/screen/DisconnectedScreen";
import NetworkState from "../NetworkState";
import PacketHandler from "../packet/PacketHandler";
import ServerBoundPacket from "../packet/ServerBoundPacket";
import DisconnectClientBoundPacket from "../packet/clientbound/DisconnectClientBoundPacket";

export default abstract class NetworkHandler<T extends NetworkHandler<T>> {
    private readonly _client: DeusExMafiaClient;
    private readonly _webSocket: WebSocket;
    private readonly packetHandler: PacketHandler<T>;

    protected constructor(client: DeusExMafiaClient, webSocket: WebSocket, state: NetworkState<T>) {
        this._client = client;
        this._webSocket = webSocket;
        this.packetHandler = new PacketHandler<T>(this as unknown as T, state);
    }

    protected get client() {
        return this._client;
    }

    protected get webSocket() {
        return this._webSocket;
    }

    public disconnect(reason?: string): void {
        this._webSocket.close(1000, reason);
    }

    public sendPacket<U extends ServerBoundPacket>(packet: U): void {
        if (this._webSocket.readyState !== 1) {
            return;
        }

        try {
            let buffer: ArrayBuffer = this.packetHandler.getPacketBuffer(packet);
            this._webSocket.send(buffer);
        } catch (e: any) {
            this.disconnect(e.message);
        }
    }

    public message(e: MessageEvent<ArrayBuffer>): void {
        try {
            this.packetHandler.handle(e.data.byteLength, e.data);
        } catch (e: any) {
            this.disconnect(e.message);
        }
    }
    
    public onDisconnect(packet: DisconnectClientBoundPacket): void {
        this.client.screenHandler.screen = () => <DisconnectedScreen client={this.client} reason={packet.reason} />;
    }
}
