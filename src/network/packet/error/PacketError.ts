import NetworkState from "../../NetworkState";
import NetworkHandler from "../../handler/NetworkHandler";

export default class PacketError<T extends NetworkHandler<T>> extends Error {
    private readonly _state: NetworkState<T>;

    public constructor(state: NetworkState<T>, message: string) {
        super();
        this._state = state;
        this.message = message;
    }

    public get state(): NetworkState<T> {
        return this._state;
    }
}
