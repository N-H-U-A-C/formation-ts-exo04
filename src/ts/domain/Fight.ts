import Character from "./Character.js";
import Monster from "./Monster.js";
import {rollD10} from "../utils/Dice.js";

export default class Fight {
    private _character: Character;
    private _monster: Monster;
    private _playerTurn: boolean;
    private _isOver: boolean;

    constructor(character: Character, monster: Monster) {
        this._character = character;
        this._monster = monster;
        this._playerTurn = true;
        this._isOver = false;
        this.startFight();
    }

    get character(): Character {
        return this._character;
    }

    get monster(): Monster {
        return this._monster;
    }

    startFight(): void {
        do {
            this.resolveTurn();
        } while (!this._isOver);

        if (this._monster.hitpoint <= 0) {
            this.gainExperience();
            alert(`Vous avez vaincu ${this._monster} !`);
        } else if (this._character.hitpoint <= 0) {
            alert(`Vous êtes mort !`);
        } else {
            alert(`Vous avez fui le combat !`);
        }
    }

    private gainExperience() {
        this._character.experience = this._monster.level * 10;
    }

    resolveTurn(): void {
        if (!this._isOver) {
            this._playerTurn ? this.askPlayerChoice() : this.attack(this._monster, this._character);
        }
    }

    attack(attacker: Character | Monster, defender: Character | Monster): void {
        // to hit roll
        console.log(`${attacker} attaque:`);
        let hasHit: boolean = false;
        const hitRoll: number = rollD10();
        switch (hitRoll) {
            case 1:
                console.log("\tTouche critique !");
                hasHit = true;
                break;
            case 2:
                console.log("\tEchec critique !");
                break;
            default:
                if (hitRoll + attacker.attack - defender.defense > 5) {
                    console.log("\tTouche réussie:");
                    hasHit = true;
                } else {
                    console.log("\tTouche ratée.");
                }
                break;
        }

        // to wound roll
        if (hasHit) {
            const woundRoll = rollD10();
            const damage: number = Math.max(woundRoll + attacker.weapon.damage - defender.armor.protection, 0);
            console.log(`\t${attacker.weapon} vs ${defender.armor}\n\t\t${damage} dégât(s).`);
            defender.hitpoint = damage;
            if (defender.hitpoint <= 0) {
                this._isOver = true;
            }
        }

        // toggle player/monster turn
        this._playerTurn = !this._playerTurn;
    }

    private askPlayerChoice(): void {
        const choice: boolean = confirm(`${this._character}: ${this._character.hitpoint} PV\n${this._monster}: ${this._monster.hitpoint} PV\nChoisissez une action (OK = Attaquer, Cancel = Fuir):`);
        choice ? this.attack(this._character, this._monster) : this.flee();
    }

    private flee(): void {
        this._isOver = true;
    }
}
