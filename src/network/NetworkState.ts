import LobbyNetworkHandler from "./handler/LobbyNetworkHandler";
import LoginNetworkHandler from "./handler/LoginNetworkHandler";
import NetworkHandler from "./handler/NetworkHandler";
import PacketCreator from "./packet/PacketCreator";
import DisconnectClientBoundPacket from "./packet/clientbound/DisconnectClientBoundPacket";
import JoinedLobbyClientBoundPacket from "./packet/clientbound/JoinedLobbyClientBoundPacket";
import PlayerJoinedLobbyClientBoundPacket from "./packet/clientbound/PlayerJoinedLobbyClientBoundPacket";
import PlayerLeftLobbyClientBoundPacket from "./packet/clientbound/PlayerLeftLobbyClientBoundPacket";
import ReceiveChatMessageClientBoundPacket from "./packet/clientbound/ReceiveChatMessageClientBoundPacket";
import InvalidPacketIdError from "./packet/error/InvalidPacketIdError";
import UnregisteredPacketError from "./packet/error/UnregisteredPacketError";
import SendChatMessageServerBoundPacket from "./packet/serverbound/SendChatMessageServerBoundPacket";

class PacketHolder<T extends NetworkHandler<T>> {
    private readonly idToCreator: Map<number, PacketCreator<T>> = new Map<number, PacketCreator<T>>();
    private readonly typeToId: Map<string, number> = new Map<string, number>();

    public registerClientBound(creator: PacketCreator<T>): PacketHolder<T> {
        this.idToCreator.set(this.idToCreator.size, creator);
        return this;
    }

    public registerServerBound(name: string): PacketHolder<T> {
        this.typeToId.set(name, this.typeToId.size);
        return this;
    }

    public tryGetCreator(id: number): PacketCreator<T> | undefined {
        return this.idToCreator.get(id);
    }

    public tryGetId(name: string): number | undefined {
        return this.typeToId.get(name);
    }
}

export default class NetworkState<T extends NetworkHandler<T>> {
    public static readonly LOGIN: NetworkState<LoginNetworkHandler> = new NetworkState<LoginNetworkHandler>("LOGIN", new PacketHolder<LoginNetworkHandler>()
        .registerClientBound(JoinedLobbyClientBoundPacket)
        .registerClientBound(DisconnectClientBoundPacket)
    );
    public static readonly LOBBY: NetworkState<LobbyNetworkHandler> = new NetworkState<LobbyNetworkHandler>("LOBBY", new PacketHolder<LobbyNetworkHandler>()
        .registerServerBound(SendChatMessageServerBoundPacket.name)
        .registerClientBound(DisconnectClientBoundPacket)
        .registerClientBound(PlayerJoinedLobbyClientBoundPacket)
        .registerClientBound(PlayerLeftLobbyClientBoundPacket)
        .registerClientBound(ReceiveChatMessageClientBoundPacket)
    );

    private readonly _name: string;
    private readonly _holder: PacketHolder<T>;

    constructor(name: string, holder: PacketHolder<T>) {
        this._name = name;
        this._holder = holder;
    }

    public get name(): string {
        return this._name;
    }

    public getCreator(id: number): PacketCreator<T> {
        let creator: PacketCreator<T> | undefined = this._holder.tryGetCreator(id);
        if (creator !== undefined) {
            return creator;
        }
        throw new InvalidPacketIdError<T>(id, this);
    }

    public getId(name: string): number {
        let id: number | undefined = this._holder.tryGetId(name);
        if (id !== undefined) {
            return id;
        }
        throw new UnregisteredPacketError<T>(name, this);
    }
}
