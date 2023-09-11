import { ReactNode } from "react";
import DeusExMafiaClient from "../DeusExMafiaClient";
import EmptyConsumer from "../util/EmptyConsumer";
import MainMenuScreen from "./screen/MainMenuScreen";

interface ScreenProvider {
    (): ReactNode;
}

export default class ScreenHandler {
    private readonly onScreenUpdate: EmptyConsumer;
    private _screen: ScreenProvider;

    public constructor(client: DeusExMafiaClient, onScreenUpdate: EmptyConsumer) {
        this.onScreenUpdate = onScreenUpdate;
        this._screen = () => <MainMenuScreen client={client} />;
    }

    public get screen() {
        return this._screen;
    }

    public set screen(screen) {
        this._screen = screen;
        this.refresh();
    }

    public refresh(): void {
        this.onScreenUpdate();
    }
}
