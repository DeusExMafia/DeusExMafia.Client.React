import Player from "../player/Player";
import ChatEventListener from "./ChatEventListener";

export default class Lobby {
    private _players: Player[] = [];
    private _onChatMessage: ChatEventListener = new ChatEventListener();

    public get players() {
        return this._players;
    }

    public get playerCount() {
        return this._players.length;
    }

    public get onChatMessage() {
        return this._onChatMessage;
    }

    public addPlayer(player: Player): void {
        this._players.push(player);
    }

    public addPlayers(players: Player[]): void {
        this._players.push(...players);
    }

    public removePlayerByName(name: string): void {
        let index: number = this._players.findIndex(player => player.name === name);
        if (index === -1) {
            return;
        }
        this._players.splice(index, 1);
    }
}
