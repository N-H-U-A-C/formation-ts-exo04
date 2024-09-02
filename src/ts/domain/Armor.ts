export default class Armor {
    private _name: string;
    private _protection: number;

    constructor(name: string, protection: number) {
        this._name = name;
        this._protection = protection;
    }

    toString(): string {
        return `${this._name} (${this._protection})`;
    }

    get name(): string {
        return this._name;
    }

    get protection(): number {
        return this._protection;
    }
}