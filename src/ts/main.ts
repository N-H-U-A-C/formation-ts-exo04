import Character from "./domain/Character.js";
import Monster from "./domain/Monster.js";
import Fight from "./domain/Fight.js";
import Weapon from "./domain/Weapon.js";
import Armor from "./domain/Armor.js";

// create monsters
const weapon1: Weapon = new Weapon("Griffe", 1);
const weapon2: Weapon = new Weapon("Lance rouillée", 2);
const armor1: Armor = new Armor("Armure naturelle", 0);
const armor2: Armor = new Armor("Armure de fortune", 1);

const monster1: Monster = new Monster("Evil Mushroom", 5, 0, 0, armor1, weapon1, 1);
const monster2: Monster = new Monster("Slime", 7, 0, 0, armor1, weapon1, 1);
const monster3: Monster = new Monster("Gobelin", 15, 1, 1, armor2, weapon2, 2);

const monsters: Monster[] = [];
monsters.push(monster1, monster2, monster3);

// create character
let characterName: string | null = prompt("Quel est le nom de votre personnage ?");
while (!characterName) {
    characterName = prompt("Nom invalide, quel est le nom de votre personnage ?")
}
const character: Character = new Character(characterName);

// run the game
do {
    let randomMonster: Monster =  getRandomMonster();
    let fight: Fight = new Fight(character, randomMonster);
} while (character.hitpoint > 0);

function getRandomMonster() {
    return monsters[Math.floor(Math.random() * monsters.length)].clone();
}
