import AppData from "./AppData.json";
import ClientConnection from "./network/ClientConnection";
import LoginNetworkHandler from "./network/handler/LoginNetworkHandler";
import Player from "./player/Player";
import ScreenHandler from "./render/ScreenHandler";
import EmptyConsumer from "./util/EmptyConsumer";

export default class DeusExMafiaClient {
    private static _instance: DeusExMafiaClient;

    private readonly _screenHandler: ScreenHandler;
    private _clientConnection?: ClientConnection;
    private _player?: Player;

    public constructor(onScreenUpdate: EmptyConsumer) {
        DeusExMafiaClient._instance = this;
        this._screenHandler = new ScreenHandler(this, onScreenUpdate);
    }

    public static get instance() {
        return DeusExMafiaClient._instance;
    }

    public get screenHandler() {
        return this._screenHandler;
    }

    public get clientConnection() {
        return this._clientConnection;
    }

    public get player() {
        return this._player;
    }

    public set player(player) {
        this._player = player;
    }

    public connect(token: string): void {
        let url: URL = new URL(AppData.serverAddress);
        url.searchParams.append("token", token);
        let webSocket: WebSocket = new WebSocket(url);
        this._clientConnection = new ClientConnection(this, webSocket, new LoginNetworkHandler(webSocket, this));
    }

    public disconnect(): void {
        if (this._clientConnection == null) {
            return;
        }
        this._clientConnection.disconnect();
    }
}
