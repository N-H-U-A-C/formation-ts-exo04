export default class Weapon {
    private _name: string;
    private _damage: number;

    constructor(name: string, damage: number) {
        this._name = name;
        this._damage = damage;
    }

    toString(): string {
        return `${this._name} (${this._damage})`;
    }

    get name(): string {
        return this._name;
    }

    get damage(): number {
        return this._damage;
    }
}