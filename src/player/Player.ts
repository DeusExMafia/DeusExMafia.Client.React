export default class Player {
    private _name: string = "";

    public constructor(name: string) {
        this.name = name;
    }

    public get name() {
        return this._name;
    }

    public set name(name) {
        this._name = name ?? "";
    }
}