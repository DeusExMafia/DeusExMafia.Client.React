import { ReactNode } from "react";
import EmptyConsumer from "../util/EmptyConsumer";
import DeusExMafiaClient from "../DeusExMafiaClient";
import MainMenuScreen from "./screen/MainMenuScreen";

export default class ScreenHandler {
    private readonly onScreenUpdate: EmptyConsumer;
    private _screen: ReactNode;

    public constructor(client: DeusExMafiaClient, onScreenUpdate: EmptyConsumer) {
        this.onScreenUpdate = onScreenUpdate;
        this._screen = <MainMenuScreen client={client} />;
    }

    public get screen(): ReactNode {
        return this._screen;
    }

    public set screen(screen: ReactNode) {
        this._screen = screen;
        this.onScreenUpdate();
    }
}
