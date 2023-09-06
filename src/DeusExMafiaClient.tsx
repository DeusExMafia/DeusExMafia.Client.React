import ScreenHandler from "./render/ScreenHandler";
import EmptyConsumer from "./util/EmptyConsumer";

export default class DeusExMafiaClient {
    private static _instance: DeusExMafiaClient;

    private readonly _screenHandler: ScreenHandler;

    public constructor(onScreenUpdate: EmptyConsumer) {
        DeusExMafiaClient._instance = this;
        this._screenHandler = new ScreenHandler(this, onScreenUpdate);
    }

    public static get instance() {
        return DeusExMafiaClient._instance;
    }

    public get screenHandler(): ScreenHandler {
        return this._screenHandler;
    }
}
