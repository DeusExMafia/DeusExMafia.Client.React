import DeusExMafiaClient from "../DeusExMafiaClient";
import MainMenuScreen from "../render/screen/MainMenuScreen";
import LoginNetworkHandler from "./handler/LoginNetworkHandler";
import NetworkHandler from "./handler/NetworkHandler";
import ServerBoundPacket from "./packet/ServerBoundPacket";

export default class ClientConnection {
    private readonly client: DeusExMafiaClient;
    private readonly webSocket: WebSocket;
    private networkHandler: NetworkHandler<any>;

    public constructor(client: DeusExMafiaClient, webSocket: WebSocket, networkHandler: LoginNetworkHandler) {
        this.client = client;
        this.webSocket = webSocket;
        this.webSocket.binaryType = "arraybuffer";
        this.webSocket.onmessage = this.message.bind(this);
        this.webSocket.onclose = this.close.bind(this);
        this.networkHandler = networkHandler;
    }

    public upgrade(networkHandler: NetworkHandler<any>): void {
        if (networkHandler == null) {
            throw new Error("networkHandler may not be null");
        }
        this.networkHandler = networkHandler;
    }

    public disconnect(reason?: string): void {
        this.networkHandler.disconnect(reason);
    }

    public sendPacket<U extends ServerBoundPacket>(packet: U): void {
        this.networkHandler.sendPacket(packet);
    }

    private message(e: MessageEvent<ArrayBuffer>): void {
        this.networkHandler.message(e);
    }

    private close(): void {
        this.client.screenHandler.screen = () => <MainMenuScreen client={this.client} />;
    }
}
