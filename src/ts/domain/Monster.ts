import Armor from "./Armor.js";
import Weapon from "./Weapon.js";

export default class Monster {
    private _name: string;
    private _hitpoint: number;
    private _attack: number;
    private _defense: number;
    private _armor: Armor;
    private _weapon: Weapon;
    private _level: number;

    constructor(name: string, hitpoints: number, attack: number, defense: number, armor: Armor, weapon: Weapon, level: number) {
        this._name = name;
        this._hitpoint = hitpoints;
        this._attack = attack;
        this._defense = defense;
        this._armor = armor;
        this._weapon = weapon;
        this._level = level;
    }

    clone(): Monster {
        return new Monster(
            this._name,
            this._hitpoint,
            this._attack,
            this._defense,
            this._armor,
            this._weapon,
            this._level
        )
    }

    toString(): string {
        return this._name;
    }

    get name(): string {
        return this._name;
    }

    get hitpoint(): number {
        return this._hitpoint;
    }

    set hitpoint(value: number) {
        this._hitpoint -= value;
    }

    get attack(): number {
        return this._attack;
    }

    get defense(): number {
        return this._defense;
    }

    get armor(): Armor {
        return this._armor;
    }

    get weapon(): Weapon {
        return this._weapon;
    }

    get level(): number {
        return this._level;
    }
}