import Armor from "./Armor.js";
import Weapon from "./Weapon.js";

export default class Character {
    private _name: string;
    private _hitpoint: number;
    private _attack: number;
    private _defense: number;
    private _armor: Armor;
    private _weapon: Weapon;
    private _experience: number;
    private _level: number;

    constructor(name: string) {
        this._name = name;
        this._hitpoint = 100;
        this._attack = 1;
        this._defense = 1;
        this._armor = new Armor("Armure en bois", 1);
        this._weapon = new Weapon("Epée en bois", 1);
        this._experience = 0;
        this._level = 1;
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

    get experience(): number {
        return this._experience;
    }

    set experience(value: number) {
        this._experience += value;
        if (this._experience >= 100) {
            this._experience -= 100;
            this.gainLevel();
        }
    }

    private gainLevel() {
        this._level++;
        this.hitpoint = -10;
        this._attack++;
        this._defense++;
    }

    get level(): number {
        return this._level;
    }
}