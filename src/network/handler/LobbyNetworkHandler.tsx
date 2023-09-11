import DeusExMafiaClient from "../../DeusExMafiaClient";
import Lobby from "../../lobby/Lobby";
import NetworkState from "../NetworkState";
import PlayerJoinedLobbyClientBoundPacket from "../packet/clientbound/PlayerJoinedLobbyClientBoundPacket";
import PlayerLeftLobbyClientBoundPacket from "../packet/clientbound/PlayerLeftLobbyClientBoundPacket";
import ReceiveChatMessageClientBoundPacket from "../packet/clientbound/ReceiveChatMessageClientBoundPacket";
import CommonNetworkHandler from "./CommonNetworkHandler";

export default class LobbyNetworkHandler extends CommonNetworkHandler<LobbyNetworkHandler> {
    private readonly lobby: Lobby;

    public constructor(webSocket: WebSocket, client: DeusExMafiaClient, lobby: Lobby) {
        super(client, webSocket, NetworkState.LOBBY);
        this.lobby = lobby;
    }

    public onPlayerJoinedLobby(packet: PlayerJoinedLobbyClientBoundPacket): void {
        this.lobby.addPlayer(packet.player);
        this.client.screenHandler.refresh();
    }

    public onPlayerLeftLobby(packet: PlayerLeftLobbyClientBoundPacket): void {
        this.lobby.removePlayerByName(packet.name);
        this.client.screenHandler.refresh();
    }

    public onReceiveChatMessage(packet: ReceiveChatMessageClientBoundPacket): void {
        this.lobby.onChatMessage.apply(packet.message);
        this.client.screenHandler.refresh();
    }
}
