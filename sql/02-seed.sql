USE `StoreManager`;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `products`;

TRUNCATE TABLE `sales`;

TRUNCATE TABLE `sales_products`;

SET FOREIGN_KEY_CHECKS = 1;
/*  */
INSERT INTO
    StoreManager.products (name)
 VALUES ("Thor's Hammer"),
        ("Shrinking Suit"),
        ("Captain America's Shield"),
        ("Iron Man's Armor"),
        ("Wonder Woman's Lasso"),
        ("Green Lantern's Ring"),
        ("Spider-Man's Web-Shooters"),
        ("Doctor Strange's Cloak of Levitation"),
        ("Black Panther's Suit"),
        ("Hawkeye's Bow and Arrows"),
        ("Batman's Batarang"),
        ("Aquaman's Trident"),
        ("Flash's Suit"),
        ("Cyborg's Armor"),
        ("Superman's Cape"),
        ("Ant-Man's Helmet"),
        ("Wolverine's Claws"),
        ("Stormbreaker Axe"),
        ("Black Widow's Bite"),
        ("Star-Lord's Helmet"),
        ("Groot's Sapling"),
        ("Rocket Raccoon's Blaster"),
        ("Gamora's Sword"),
        ("Drax's Daggers"),
        ("Scarlet Witch's Crown"),
        ("Vision's Mind Stone"),
        ("Falcon's Wings"),
        ("Winter Soldier's Arm"),
        ("Hulk's Fists"),
        ("Silver Surfer's Board"),
        ("Daredevil's Billy Club"),
        ("Punisher's Skull Shirt"),
        ("Ghost Rider's Chain"),
        ("Blade's Sword"),
        ( "Moon Knight's Crescent Darts"),
        ("Shazam's Lightning Bolt"),
        ("Green Arrow's Bow"),
        ("Zatanna's Wand"),
        ("Constantine's Lighter"),
        ("Martian Manhunter's Belt"),
        ("Hawkgirl's Mace"),
        ("Atom's Suit"),
        ("Blue Beetle's Scarab"),
        ("Booster Gold's Visor"),
        ("Raven's Cloak"),
        ("Starfire's Starbolts"),
        ("Beast Boy's Communicator"),
        ("Nightwing's Escrima Sticks"),
        ("Supergirl's Cape"),
        ("Red Hood's Helmet");