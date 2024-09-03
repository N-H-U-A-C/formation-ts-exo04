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
        // roll to hit
        let hasHit = this.rollToHit(attacker, defender);

        // roll to wound
        this.rollToWound(hasHit, attacker, defender);

        // toggle player/monster turn
        this._playerTurn = !this._playerTurn;
    }

    private rollToHit(attacker: Character | Monster, defender: Character | Monster) {
        console.log(`${attacker} attaque:`);
        let hasHit: boolean = false;
        const hitRoll: number = rollD10();
        const attack = attacker.attack;
        const defense = defender.defense;
        switch (hitRoll) {
            case 10:
                console.log("\tTouche critique !");
                hasHit = true;
                break;
            case 1:
                console.log("\tEchec critique !");
                break;
            default:
                if (hitRoll + attack - defense > 5) {
                    console.log(`\t${hitRoll} + ${attack} - ${defense} => Touche réussie`);
                    hasHit = true;
                } else {
                    console.log("\tTouche ratée.");
                }
                break;
        }
        return hasHit;
    }

    private rollToWound(hasHit: boolean, attacker: Character | Monster, defender: Character | Monster) {
        if (hasHit) {
            const woundRoll = rollD10();
            const weaponDamage = attacker.weapon.damage;
            const armorProtection = defender.armor.protection;
            const damage: number = Math.max(woundRoll + weaponDamage - armorProtection, 0);
            console.log(`\t${attacker.weapon} vs ${defender.armor}\n\t\t${woundRoll} + ${weaponDamage} - ${armorProtection} => ${damage} dégâts`);
            defender.hitpoint = damage;
            if (defender.hitpoint <= 0) {
                this._isOver = true;
            }
        }
    }

    private askPlayerChoice(): void {
        const choice: boolean = confirm(`${this._character}: ${this._character.hitpoint} PV\n${this._monster}: ${this._monster.hitpoint} PV\nChoisissez une action (OK = Attaquer, Cancel = Fuir):`);
        choice ? this.attack(this._character, this._monster) : this.flee();
    }

    private flee(): void {
        this._isOver = true;
    }
}
