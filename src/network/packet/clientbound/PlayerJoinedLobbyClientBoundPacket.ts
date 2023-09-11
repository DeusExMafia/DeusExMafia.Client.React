import Player from "../../../player/Player";
import LobbyNetworkHandler from "../../handler/LobbyNetworkHandler";
import PacketBinaryReader from "../../io/PacketBinaryReader";
import ClientBoundPacket from "../ClientBoundPacket";

export default class PlayerJoinedLobbyClientBoundPacket implements ClientBoundPacket<LobbyNetworkHandler> {
    private readonly _player: Player;

    public constructor(reader: PacketBinaryReader) {
        this._player = reader.readPlayer();
    }

    public get player() {
        return this._player;
    }

    public apply(listener: LobbyNetworkHandler): void {
        listener.onPlayerJoinedLobby(this);
    }
}
