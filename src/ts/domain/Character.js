import Armor from "./Armor.js";
import Weapon from "./Weapon.js";
export default class Character {
    constructor(name) {
        this.name = name;
        this.hitpoint = 100;
        this.armor = new Armor("Armure de bois", 1);
        this.weapon = new Weapon("Epée en bois", 1);
        this.experience = 0;
        this.level = 1;
    }
}
