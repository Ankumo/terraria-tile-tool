export enum EBiome {
    FOREST,
    CORRUPTION,
    JUNGLE,
    SNOW,
    HALLOW,
    CRIMSON,
    DESERT,
    OCEAN,
    MUSHROOM,
    UNDERWORLD,
}

export enum ESunStyle {
    DEFAULT,
    COOL,
    ECLIPSE,
}

export enum EMoonStyle {
    DEFAULT,
    DESERT,
    SPACE,
    MYTHRIL,
    SNOW,
    JUNGLE,
    ORICHALCUM,
    HALLOW,
    PURPLE,
    PUMPKIN,
    FROST,
    SMILEY,
}

export enum EMoonPhase {
    FULL,
    WANING_GIBBOUS,
    THIRD_QUARTER,
    WANING_CRESCENT,
    NEW,
    WAXING_CRESCENT,
    FIRST_QUARTER,
    WAXING_GIBBOUS,
}

export enum EWorldDifficulty {
    NORMAL,
    EXPERT,
    MASTER,
    JOURNEY,
}

export enum EWorldCorrType {
    CORRUPTION,
    HALLOW_CORRUPTION,
    CRIMSON,
    HALLOW_CRIMSON,
}

export enum EActiveMenu {
    MAIN,
    BG_SETTINGS,
    SWAPS,
    DROP,
    WORLD,
    SWAP,
}

export enum EBranchType {
    IN_Y,
    BELOW_Y,
    ABOVE_Y,
    BEYOND_X,
    ABOVE_X,
    //HAS_COLOR,
    HAS_NEARBY_WALL,
    HAS_NEARBY_TILE,
}

export enum EWorldYType {
    SPACE,
    SURFACE,
    UNDERGROUND,
    CAVERNS,
    UNDERWORLD,
}

export enum EResultType {
    TILE,
    WALL,
    BOTH,
}

export enum ETileID {
    None = -1,
    Dirt = 0,
    Stone = 1,
    Grass = 2,
    Plants = 3,
    Torches = 4,
    Trees = 5,
    Iron = 6,
    Copper = 7,
    Gold = 8,
    Silver = 9,
    ClosedDoor = 10,
    OpenDoor = 11,
    Heart = 12,
    Bottles = 13,
    Tables = 14,
    Chairs = 15,
    Anvils = 16,
    Furnaces = 17,
    WorkBenches = 18,
    Platforms = 19,
    Saplings = 20,
    Containers = 21,
    Demonite = 22,
    CorruptGrass = 23,
    CorruptPlants = 24,
    Ebonstone = 25,
    DemonAltar = 26,
    Sunflower = 27,
    Pots = 28,
    PiggyBank = 29,
    WoodBlock = 30,
    ShadowOrbs = 31,
    CorruptThorns = 32,
    Candles = 33,
    Chandeliers = 34,
    Jackolanterns = 35,
    Presents = 36,
    Meteorite = 37,
    GrayBrick = 38,
    RedBrick = 39,
    ClayBlock = 40,
    BlueDungeonBrick = 41,
    HangingLanterns = 42,
    GreenDungeonBrick = 43,
    PinkDungeonBrick = 44,
    GoldBrick = 45,
    SilverBrick = 46,
    CopperBrick = 47,
    Spikes = 48,
    WaterCandle = 49,
    Books = 50,
    Cobweb = 51,
    Vines = 52,
    Sand = 53,
    Glass = 54,
    Signs = 55,
    Obsidian = 56,
    Ash = 57,
    Hellstone = 58,
    Mud = 59,
    JungleGrass = 60,
    JunglePlants = 61,
    JungleVines = 62,
    Sapphire = 63,
    Ruby = 64,
    Emerald = 65,
    Topaz = 66,
    Amethyst = 67,
    Diamond = 68,
    JungleThorns = 69,
    MushroomGrass = 70,
    MushroomPlants = 71,
    MushroomTrees = 72,
    Plants2 = 73,
    JunglePlants2 = 74,
    ObsidianBrick = 75,
    HellstoneBrick = 76,
    Hellforge = 77,
    ClayPot = 78,
    Beds = 79,
    Cactus = 80,
    Coral = 81,
    ImmatureHerbs = 82,
    MatureHerbs = 83,
    BloomingHerbs = 84,
    Tombstones = 85,
    Loom = 86,
    Pianos = 87,
    Dressers = 88,
    Benches = 89,
    Bathtubs = 90,
    Banners = 91,
    Lampposts = 92,
    Lamps = 93,
    Kegs = 94,
    ChineseLanterns = 95,
    CookingPots = 96,
    Safes = 97,
    SkullLanterns = 98,
    TrashCan = 99,
    Candelabras = 100,
    Bookcases = 101,
    Thrones = 102,
    Bowls = 103,
    GrandfatherClocks = 104,
    Statues = 105,
    Sawmill = 106,
    Cobalt = 107,
    Mythril = 108,
    HallowedGrass = 109,
    HallowedPlants = 110,
    Adamantite = 111,
    Ebonsand = 112,
    HallowedPlants2 = 113,
    TinkerersWorkbench = 114,
    HallowedVines = 115,
    Pearlsand = 116,
    Pearlstone = 117,
    PearlstoneBrick = 118,
    IridescentBrick = 119,
    Mudstone = 120,
    CobaltBrick = 121,
    MythrilBrick = 122,
    Silt = 123,
    WoodenBeam = 124,
    CrystalBall = 125,
    DiscoBall = 126,
    MagicalIceBlock = 127,
    Mannequin = 128,
    Crystals = 129,
    ActiveStoneBlock = 130,
    InactiveStoneBlock = 131,
    Lever = 132,
    AdamantiteForge = 133,
    MythrilAnvil = 134,
    PressurePlates = 135,
    Switches = 136,
    Traps = 137,
    Boulder = 138,
    MusicBoxes = 139,
    DemoniteBrick = 140,
    Explosives = 141,
    InletPump = 142,
    OutletPump = 143,
    Timers = 144,
    CandyCaneBlock = 145,
    GreenCandyCaneBlock = 146,
    SnowBlock = 147,
    SnowBrick = 148,
    HolidayLights = 149,
    AdamantiteBeam = 150,
    SandstoneBrick = 151,
    EbonstoneBrick = 152,
    RedStucco = 153,
    YellowStucco = 154,
    GreenStucco = 155,
    GrayStucco = 156,
    Ebonwood = 157,
    RichMahogany = 158,
    Pearlwood = 159,
    RainbowBrick = 160,
    IceBlock = 161,
    BreakableIce = 162,
    CorruptIce = 163,
    HallowedIce = 164,
    Stalactite = 165,
    Tin = 166,
    Lead = 167,
    Tungsten = 168,
    Platinum = 169,
    PineTree = 170,
    ChristmasTree = 171,
    Sinks = 172,
    PlatinumCandelabra = 173,
    PlatinumCandle = 174,
    TinBrick = 175,
    TungstenBrick = 176,
    PlatinumBrick = 177,
    ExposedGems = 178,
    GreenMoss = 179,
    BrownMoss = 180,
    RedMoss = 181,
    BlueMoss = 182,
    PurpleMoss = 183,
    LongMoss = 184,
    SmallPiles = 185,
    LargePiles = 186,
    LargePiles2 = 187,
    CactusBlock = 188,
    Cloud = 189,
    MushroomBlock = 190,
    LivingWood = 191,
    LeafBlock = 192,
    SlimeBlock = 193,
    BoneBlock = 194,
    FleshBlock = 195,
    RainCloud = 196,
    FrozenSlimeBlock = 197,
    Asphalt = 198,
    CrimsonGrass = 199,
    FleshIce = 200,
    CrimsonPlants = 201,
    Sunplate = 202,
    Crimstone = 203,
    Crimtane = 204,
    CrimsonVines = 205,
    IceBrick = 206,
    WaterFountain = 207,
    Shadewood = 208,
    Cannon = 209,
    LandMine = 210,
    Chlorophyte = 211,
    SnowballLauncher = 212,
    Rope = 213,
    Chain = 214,
    Campfire = 215,
    Firework = 216,
    Blendomatic = 217,
    MeatGrinder = 218,
    Extractinator = 219,
    Solidifier = 220,
    Palladium = 221,
    Orichalcum = 222,
    Titanium = 223,
    Slush = 224,
    Hive = 225,
    LihzahrdBrick = 226,
    DyePlants = 227,
    DyeVat = 228,
    HoneyBlock = 229,
    CrispyHoneyBlock = 230,
    Larva = 231,
    WoodenSpikes = 232,
    PlantDetritus = 233,
    Crimsand = 234,
    Teleporter = 235,
    LifeFruit = 236,
    LihzahrdAltar = 237,
    PlanteraBulb = 238,
    MetalBars = 239,
    Painting3X3 = 240,
    Painting4X3 = 241,
    Painting6X4 = 242,
    ImbuingStation = 243,
    BubbleMachine = 244,
    Painting2X3 = 245,
    Painting3X2 = 246,
    Autohammer = 247,
    PalladiumColumn = 248,
    BubblegumBlock = 249,
    Titanstone = 250,
    PumpkinBlock = 251,
    HayBlock = 252,
    SpookyWood = 253,
    Pumpkins = 254,
    AmethystGemsparkOff = 255,
    TopazGemsparkOff = 256,
    SapphireGemsparkOff = 257,
    EmeraldGemsparkOff = 258,
    RubyGemsparkOff = 259,
    DiamondGemsparkOff = 260,
    AmberGemsparkOff = 261,
    AmethystGemspark = 262,
    TopazGemspark = 263,
    SapphireGemspark = 264,
    EmeraldGemspark = 265,
    RubyGemspark = 266,
    DiamondGemspark = 267,
    AmberGemspark = 268,
    Womannequin = 269,
    FireflyinaBottle = 270,
    LightningBuginaBottle = 271,
    Cog = 272,
    StoneSlab = 273,
    SandStoneSlab = 274,
    BunnyCage = 275,
    SquirrelCage = 276,
    MallardDuckCage = 277,
    DuckCage = 278,
    BirdCage = 279,
    BlueJay = 280,
    CardinalCage = 281,
    FishBowl = 282,
    HeavyWorkBench = 283,
    CopperPlating = 284,
    SnailCage = 285,
    GlowingSnailCage = 286,
    AmmoBox = 287,
    MonarchButterflyJar = 288,
    PurpleEmperorButterflyJar = 289,
    RedAdmiralButterflyJar = 290,
    UlyssesButterflyJar = 291,
    SulphurButterflyJar = 292,
    TreeNymphButterflyJar = 293,
    ZebraSwallowtailButterflyJar = 294,
    JuliaButterflyJar = 295,
    ScorpionCage = 296,
    BlackScorpionCage = 297,
    FrogCage = 298,
    MouseCage = 299,
    BoneWelder = 300,
    FleshCloningVat = 301,
    GlassKiln = 302,
    LihzahrdFurnace = 303,
    LivingLoom = 304,
    SkyMill = 305,
    IceMachine = 306,
    SteampunkBoiler = 307,
    HoneyDispenser = 308,
    PenguinCage = 309,
    WormCage = 310,
    DynastyWood = 311,
    RedDynastyShingles = 312,
    BlueDynastyShingles = 313,
    MinecartTrack = 314,
    Coralstone = 315,
    BlueJellyfishBowl = 316,
    GreenJellyfishBowl = 317,
    PinkJellyfishBowl = 318,
    ShipInABottle = 319,
    SeaweedPlanter = 320,
    BorealWood = 321,
    PalmWood = 322,
    PalmTree = 323,
    BeachPiles = 324,
    TinPlating = 325,
    Waterfall = 326,
    Lavafall = 327,
    Confetti = 328,
    ConfettiBlack = 329,
    CopperCoinPile = 330,
    SilverCoinPile = 331,
    GoldCoinPile = 332,
    PlatinumCoinPile = 333,
    WeaponsRack = 334,
    FireworksBox = 335,
    LivingFire = 336,
    AlphabetStatues = 337,
    FireworkFountain = 338,
    GrasshopperCage = 339,
    LivingCursedFire = 340,
    LivingDemonFire = 341,
    LivingFrostFire = 342,
    LivingIchor = 343,
    LivingUltrabrightFire = 344,
    Honeyfall = 345,
    ChlorophyteBrick = 346,
    CrimtaneBrick = 347,
    ShroomitePlating = 348,
    MushroomStatue = 349,
    MartianConduitPlating = 350,
    ChimneySmoke = 351,
    CrimsonThorns = 352,
    VineRope = 353,
    BewitchingTable = 354,
    AlchemyTable = 355,
    Sundial = 356,
    MarbleBlock = 357,
    GoldBirdCage = 358,
    GoldBunnyCage = 359,
    GoldButterflyCage = 360,
    GoldFrogCage = 361,
    GoldGrasshopperCage = 362,
    GoldMouseCage = 363,
    GoldWormCage = 364,
    SilkRope = 365,
    WebRope = 366,
    Marble = 367,
    Granite = 368,
    GraniteBlock = 369,
    MeteoriteBrick = 370,
    PinkSlimeBlock = 371,
    PeaceCandle = 372,
    WaterDrip = 373,
    LavaDrip = 374,
    HoneyDrip = 375,
    FishingCrate = 376,
    SharpeningStation = 377,
    TargetDummy = 378,
    Bubble = 379,
    PlanterBox = 380,
    LavaMoss = 381,
    VineFlowers = 382,
    LivingMahogany = 383,
    LivingMahoganyLeaves = 384,
    CrystalBlock = 385,
    TrapdoorOpen = 386,
    TrapdoorClosed = 387,
    TallGateClosed = 388,
    TallGateOpen = 389,
    LavaLamp = 390,
    CageEnchantedNightcrawler = 391,
    CageBuggy = 392,
    CageGrubby = 393,
    CageSluggy = 394,
    ItemFrame = 395,
    Sandstone = 396,
    HardenedSand = 397,
    CorruptHardenedSand = 398,
    CrimsonHardenedSand = 399,
    CorruptSandstone = 400,
    CrimsonSandstone = 401,
    HallowHardenedSand = 402,
    HallowSandstone = 403,
    DesertFossil = 404,
    Fireplace = 405,
    Chimney = 406,
    FossilOre = 407,
    LunarOre = 408,
    LunarBrick = 409,
    LunarMonolith = 410,
    Detonator = 411,
    LunarCraftingStation = 412,
    SquirrelOrangeCage = 413,
    SquirrelGoldCage = 414,
    LunarBlockSolar = 415,
    LunarBlockVortex = 416,
    LunarBlockNebula = 417,
    LunarBlockStardust = 418,
    LogicGateLamp = 419,
    LogicGate = 420,
    ConveyorBeltLeft = 421,
    ConveyorBeltRight = 422,
    LogicSensor = 423,
    WirePipe = 424,
    AnnouncementBox = 425,
    TeamBlockRed = 426,
    TeamBlockRedPlatform = 427,
    WeightedPressurePlate = 428,
    WireBulb = 429,
    TeamBlockGreen = 430,
    TeamBlockBlue = 431,
    TeamBlockYellow = 432,
    TeamBlockPink = 433,
    TeamBlockWhite = 434,
    TeamBlockGreenPlatform = 435,
    TeamBlockBluePlatform = 436,
    TeamBlockYellowPlatform = 437,
    TeamBlockPinkPlatform = 438,
    TeamBlockWhitePlatform = 439,
    GemLocks = 440,
    FakeContainers = 441,
    ProjectilePressurePad = 442,
    GeyserTrap = 443,
    BeeHive = 444,
    PixelBox = 445,
    SillyBalloonPink = 446,
    SillyBalloonPurple = 447,
    SillyBalloonGreen = 448,
    SillyStreamerBlue = 449,
    SillyStreamerGreen = 450,
    SillyStreamerPink = 451,
    SillyBalloonMachine = 452,
    SillyBalloonTile = 453,
    Pigronata = 454,
    PartyMonolith = 455,
    PartyBundleOfBalloonTile = 456,
    PartyPresent = 457,
    SandFallBlock = 458,
    SnowFallBlock = 459,
    SnowCloud = 460,
    SandDrip = 461,
    DjinnLamp = 462,
    DefendersForge = 463,
    WarTable = 464,
    WarTableBanner = 465,
    ElderCrystalStand = 466,
    Containers2 = 467,
    FakeContainers2 = 468,
    Tables2 = 469,
    DisplayDoll = 470,
    WeaponsRack2 = 471,
    IronBrick = 472,
    LeadBrick = 473,
    LesionBlock = 474,
    HatRack = 475,
    GolfHole = 476,
    GolfGrass = 477,
    CrimstoneBrick = 478,
    SmoothSandstone = 479,
    BloodMoonMonolith = 480,
    CrackedBlueDungeonBrick = 481,
    CrackedGreenDungeonBrick = 482,
    CrackedPinkDungeonBrick = 483,
    RollingCactus = 484,
    AntlionLarva = 485,
    DrumSet = 486,
    PicnicTable = 487,
    FallenLog = 488,
    PinWheel = 489,
    WeatherVane = 490,
    VoidVault = 491,
    GolfGrassHallowed = 492,
    GolfCupFlag = 493,
    GolfTee = 494,
    ShellPile = 495,
    AntiPortalBlock = 496,
    Toilets = 497,
    Spider = 498,
    LesionStation = 499,
    SolarBrick = 500,
    VortexBrick = 501,
    NebulaBrick = 502,
    StardustBrick = 503,
    MysticSnakeRope = 504,
    GoldGoldfishBowl = 505,
    CatBast = 506,
    GoldStarryGlassBlock = 507,
    BlueStarryGlassBlock = 508,
    VoidMonolith = 509,
    ArrowSign = 510,
    PaintedArrowSign = 511,
    GreenMossBrick = 512,
    BrownMossBrick = 513,
    RedMossBrick = 514,
    BlueMossBrick = 515,
    PurpleMossBrick = 516,
    LavaMossBrick = 517,
    LilyPad = 518,
    Cattail = 519,
    FoodPlatter = 520,
    BlackDragonflyJar = 521,
    BlueDragonflyJar = 522,
    GreenDragonflyJar = 523,
    OrangeDragonflyJar = 524,
    RedDragonflyJar = 525,
    YellowDragonflyJar = 526,
    GoldDragonflyJar = 527,
    MushroomVines = 528,
    SeaOats = 529,
    OasisPlants = 530,
    BoulderStatue = 531,
    MaggotCage = 532,
    RatCage = 533,
    KryptonMoss = 534,
    KryptonMossBrick = 535,
    XenonMoss = 536,
    XenonMossBrick = 537,
    LadybugCage = 538,
    ArgonMoss = 539,
    ArgonMossBrick = 540,
    EchoBlock = 541,
    OwlCage = 542,
    PupfishBowl = 543,
    GoldLadybugCage = 544,
    LawnFlamingo = 545,
    Grate = 546,
    PottedPlants1 = 547,
    PottedPlants2 = 548,
    Seaweed = 549,
    TurtleCage = 550,
    TurtleJungleCage = 551,
    Sandcastles = 552,
    GrebeCage = 553,
    SeagullCage = 554,
    WaterStriderCage = 555,
    GoldWaterStriderCage = 556,
    GrateClosed = 557,
    SeahorseCage = 558,
    GoldSeahorseCage = 559,
    GolfTrophies = 560,
    MarbleColumn = 561,
    BambooBlock = 562,
    LargeBambooBlock = 563,
    PlasmaLamp = 564,
    FogMachine = 565,
    AmberStoneBlock = 566,
    GardenGnome = 567,
    PinkFairyJar = 568,
    GreenFairyJar = 569,
    BlueFairyJar = 570,
    Bamboo = 571,
    SoulBottles = 572,
    TatteredWoodSign = 573,
    BorealBeam = 574,
    RichMahoganyBeam = 575,
    GraniteColumn = 576,
    SandstoneColumn = 577,
    MushroomBeam = 578,
    RockGolemHead = 579,
    HellButterflyJar = 580,
    LavaflyinaBottle = 581,
    MagmaSnailCage = 582,
    TreeTopaz = 583,
    TreeAmethyst = 584,
    TreeSapphire = 585,
    TreeEmerald = 586,
    TreeRuby = 587,
    TreeDiamond = 588,
    TreeAmber = 589,
    GemSaplings = 590,
    PotsSuspended = 591,
    BrazierSuspended = 592,
    VolcanoSmall = 593,
    VolcanoLarge = 594,
    VanityTreeSakuraSaplings = 595,
    VanityTreeSakura = 596,
    TeleportationPylon = 597,
    LavafishBowl = 598,
    AmethystBunnyCage = 599,
    TopazBunnyCage = 600,
    SapphireBunnyCage = 601,
    EmeraldBunnyCage = 602,
    RubyBunnyCage = 603,
    DiamondBunnyCage = 604,
    AmberBunnyCage = 605,
    AmethystSquirrelCage = 606,
    TopazSquirrelCage = 607,
    SapphireSquirrelCage = 608,
    EmeraldSquirrelCage = 609,
    RubySquirrelCage = 610,
    DiamondSquirrelCage = 611,
    AmberSquirrelCage = 612,
    PottedLavaPlants = 613,
    PottedLavaPlantTendrils = 614,
    VanityTreeWillowSaplings = 615,
    VanityTreeYellowWillow = 616,
    MasterTrophyBase = 617,
    AccentSlab = 618,
    TruffleWormCage = 619,
    EmpressButterflyJar = 620,
    SliceOfCake = 621,
    TeaKettle = 622,
    PottedCrystalPlants = 623,
    AbigailsFlower = 624,
    VioletMoss = 625,
    VioletMossBrick = 626,
    RainbowMoss = 627,
    RainbowMossBrick = 628,
    StinkbugCage = 629,
    StinkbugHousingBlocker = 630,
    StinkbugHousingBlockerEcho = 631,
    ScarletMacawCage = 632,
    AshGrass = 633,
    TreeAsh = 634,
    AshWood = 635,
    CorruptVines = 636,
    AshPlants = 637,
    AshVines = 638,
    ManaCrystal = 639,
    BlueMacawCage = 640,
    ReefBlock = 641,
    ChlorophyteExtractinator = 642,
    ToucanCage = 643,
    YellowCockatielCage = 644,
    GrayCockatielCage = 645,
    ShadowCandle = 646,
    LargePilesEcho = 647,
    LargePiles2Echo = 648,
    SmallPiles2x1Echo = 649,
    SmallPiles1x1Echo = 650,
    PlantDetritus3x2Echo = 651,
    PlantDetritus2x2Echo = 652,
    PotsEcho = 653,
    TNTBarrel = 654,
    PlanteraThorns = 655,
    GlowTulip = 656,
    EchoMonolith = 657,
    ShimmerMonolith = 658,
    ShimmerBlock = 659,
    ShimmerflyinaBottle = 660,
    CorruptJungleGrass = 661,
    CrimsonJungleGrass = 662,
    Moondial = 663,
    BouncyBoulder = 664,
    LifeCrystalBoulder = 665,
    PoopBlock = 666,
    ShimmerBrick = 667,
    DirtiestBlock = 668,
    LunarRustBrick = 669,
    DarkCelestialBrick = 670,
    AstraBrick = 671,
    CosmicEmberBrick = 672,
    CryocoreBrick = 673,
    MercuryBrick = 674,
    StarRoyaleBrick = 675,
    HeavenforgeBrick = 676,
    AncientBlueBrick = 677,
    AncientGreenBrick = 678,
    AncientPinkBrick = 679,
    AncientGoldBrick = 680,
    AncientSilverBrick = 681,
    AncientCopperBrick = 682,
    AncientObsidianBrick = 683,
    AncientHellstoneBrick = 684,
    AncientCobaltBrick = 685,
    AncientMythrilBrick = 686,
    LavaMossBlock = 687,
    ArgonMossBlock = 688,
    KryptonMossBlock = 689,
    XenonMossBlock = 690,
    VioletMossBlock = 691,
    RainbowMossBlock = 692,
    Count = 693,
}

export enum EWallID {
    None = 0,
    Stone = 1,
    DirtUnsafe = 2,
    EbonstoneUnsafe = 3,
    Wood = 4,
    GrayBrick = 5,
    RedBrick = 6,
    BlueDungeonUnsafe = 7,
    GreenDungeonUnsafe = 8,
    PinkDungeonUnsafe = 9,
    GoldBrick = 10,
    SilverBrick = 11,
    CopperBrick = 12,
    HellstoneBrickUnsafe = 13,
    ObsidianBrickUnsafe = 14,
    MudUnsafe = 15,
    Dirt = 16,
    BlueDungeon = 17,
    GreenDungeon = 18,
    PinkDungeon = 19,
    ObsidianBrick = 20,
    Glass = 21,
    PearlstoneBrick = 22,
    IridescentBrick = 23,
    MudstoneBrick = 24,
    CobaltBrick = 25,
    MythrilBrick = 26,
    Planked = 27,
    PearlstoneBrickUnsafe = 28,
    CandyCane = 29,
    GreenCandyCane = 30,
    SnowBrick = 31,
    AdamantiteBeam = 32,
    DemoniteBrick = 33,
    SandstoneBrick = 34,
    EbonstoneBrick = 35,
    RedStucco = 36,
    YellowStucco = 37,
    GreenStucco = 38,
    Gray = 39,
    SnowWallUnsafe = 40,
    Ebonwood = 41,
    RichMaogany = 42,
    Pearlwood = 43,
    RainbowBrick = 44,
    TinBrick = 45,
    TungstenBrick = 46,
    PlatinumBrick = 47,
    AmethystUnsafe = 48,
    TopazUnsafe = 49,
    SapphireUnsafe = 50,
    EmeraldUnsafe = 51,
    RubyUnsafe = 52,
    DiamondUnsafe = 53,
    CaveUnsafe = 54,
    Cave2Unsafe = 55,
    Cave3Unsafe = 56,
    Cave4Unsafe = 57,
    Cave5Unsafe = 58,
    Cave6Unsafe = 59,
    LivingLeaf = 60,
    Cave7Unsafe = 61,
    SpiderUnsafe = 62,
    GrassUnsafe = 63,
    JungleUnsafe = 64,
    FlowerUnsafe = 65,
    Grass = 66,
    Jungle = 67,
    Flower = 68,
    CorruptGrassUnsafe = 69,
    HallowedGrassUnsafe = 70,
    IceUnsafe = 71,
    Cactus = 72,
    Cloud = 73,
    Mushroom = 74,
    Bone = 75,
    Slime = 76,
    Flesh = 77,
    LivingWood = 78,
    ObsidianBackUnsafe = 79,
    MushroomUnsafe = 80,
    CrimsonGrassUnsafe = 81,
    DiscWall = 82,
    CrimstoneUnsafe = 83,
    IceBrick = 84,
    Shadewood = 85,
    HiveUnsafe = 86,
    LihzahrdBrickUnsafe = 87,
    PurpleStainedGlass = 88,
    YellowStainedGlass = 89,
    BlueStainedGlass = 90,
    GreenStainedGlass = 91,
    RedStainedGlass = 92,
    RainbowStainedGlass = 93,
    BlueDungeonSlabUnsafe = 94,
    BlueDungeonTileUnsafe = 95,
    PinkDungeonSlabUnsafe = 96,
    PinkDungeonTileUnsafe = 97,
    GreenDungeonSlabUnsafe = 98,
    GreenDungeonTileUnsafe = 99,
    BlueDungeonSlab = 100,
    BlueDungeonTile = 101,
    PinkDungeonSlab = 102,
    PinkDungeonTile = 103,
    GreenDungeonSlab = 104,
    GreenDungeonTile = 105,
    WoodenFence = 106,
    MetalFence = 107,
    Hive = 108,
    PalladiumColumn = 109,
    BubblegumBlock = 110,
    TitanstoneBlock = 111,
    LihzahrdBrick = 112,
    Pumpkin = 113,
    Hay = 114,
    SpookyWood = 115,
    ChristmasTreeWallpaper = 116,
    OrnamentWallpaper = 117,
    CandyCaneWallpaper = 118,
    FestiveWallpaper = 119,
    StarsWallpaper = 120,
    SquigglesWallpaper = 121,
    SnowflakeWallpaper = 122,
    KrampusHornWallpaper = 123,
    BluegreenWallpaper = 124,
    GrinchFingerWallpaper = 125,
    FancyGrayWallpaper = 126,
    IceFloeWallpaper = 127,
    MusicWallpaper = 128,
    PurpleRainWallpaper = 129,
    RainbowWallpaper = 130,
    SparkleStoneWallpaper = 131,
    StarlitHeavenWallpaper = 132,
    BubbleWallpaper = 133,
    CopperPipeWallpaper = 134,
    DuckyWallpaper = 135,
    Waterfall = 136,
    Lavafall = 137,
    EbonwoodFence = 138,
    RichMahoganyFence = 139,
    PearlwoodFence = 140,
    ShadewoodFence = 141,
    WhiteDynasty = 142,
    BlueDynasty = 143,
    ArcaneRunes = 144,
    IronFence = 145,
    CopperPlating = 146,
    StoneSlab = 147,
    Sail = 148,
    BorealWood = 149,
    BorealWoodFence = 150,
    PalmWood = 151,
    PalmWoodFence = 152,
    AmberGemspark = 153,
    AmethystGemspark = 154,
    DiamondGemspark = 155,
    EmeraldGemspark = 156,
    AmberGemsparkOff = 157,
    AmethystGemsparkOff = 158,
    DiamondGemsparkOff = 159,
    EmeraldGemsparkOff = 160,
    RubyGemsparkOff = 161,
    SapphireGemsparkOff = 162,
    TopazGemsparkOff = 163,
    RubyGemspark = 164,
    SapphireGemspark = 165,
    TopazGemspark = 166,
    TinPlating = 167,
    Confetti = 168,
    ConfettiBlack = 169,
    CaveWall = 170,
    CaveWall2 = 171,
    Honeyfall = 172,
    ChlorophyteBrick = 173,
    CrimtaneBrick = 174,
    ShroomitePlating = 175,
    MartianConduit = 176,
    HellstoneBrick = 177,
    MarbleUnsafe = 178,
    MarbleBlock = 179,
    GraniteUnsafe = 180,
    GraniteBlock = 181,
    MeteoriteBrick = 182,
    Marble = 183,
    Granite = 184,
    Cave8Unsafe = 185,
    Crystal = 186,
    Sandstone = 187,
    CorruptionUnsafe1 = 188,
    CorruptionUnsafe2 = 189,
    CorruptionUnsafe3 = 190,
    CorruptionUnsafe4 = 191,
    CrimsonUnsafe1 = 192,
    CrimsonUnsafe2 = 193,
    CrimsonUnsafe3 = 194,
    CrimsonUnsafe4 = 195,
    DirtUnsafe1 = 196,
    DirtUnsafe2 = 197,
    DirtUnsafe3 = 198,
    DirtUnsafe4 = 199,
    HallowUnsafe1 = 200,
    HallowUnsafe2 = 201,
    HallowUnsafe3 = 202,
    HallowUnsafe4 = 203,
    JungleUnsafe1 = 204,
    JungleUnsafe2 = 205,
    JungleUnsafe3 = 206,
    JungleUnsafe4 = 207,
    LavaUnsafe1 = 208,
    LavaUnsafe2 = 209,
    LavaUnsafe3 = 210,
    LavaUnsafe4 = 211,
    RocksUnsafe1 = 212,
    RocksUnsafe2 = 213,
    RocksUnsafe3 = 214,
    RocksUnsafe4 = 215,
    HardenedSand = 216,
    CorruptHardenedSand = 217,
    CrimsonHardenedSand = 218,
    HallowHardenedSand = 219,
    CorruptSandstone = 220,
    CrimsonSandstone = 221,
    HallowSandstone = 222,
    DesertFossil = 223,
    LunarBrickWall = 224,
    CogWall = 225,
    SandFall = 226,
    SnowFall = 227,
    SillyBalloonPinkWall = 228,
    SillyBalloonPurpleWall = 229,
    SillyBalloonGreenWall = 230,
    IronBrick = 231,
    LeadBrick = 232,
    LesionBlock = 233,
    CrimstoneBrick = 234,
    SmoothSandstone = 235,
    Spider = 236,
    SolarBrick = 237,
    VortexBrick = 238,
    NebulaBrick = 239,
    StardustBrick = 240,
    OrangeStainedGlass = 241,
    GoldStarryGlassWall = 242,
    BlueStarryGlassWall = 243,
    LivingWoodUnsafe = 244,
    WroughtIronFence = 245,
    EbonstoneEcho = 246,
    MudWallEcho = 247,
    PearlstoneEcho = 248,
    SnowWallEcho = 249,
    AmethystEcho = 250,
    TopazEcho = 251,
    SapphireEcho = 252,
    EmeraldEcho = 253,
    RubyEcho = 254,
    DiamondEcho = 255,
    Cave1Echo = 256,
    Cave2Echo = 257,
    Cave3Echo = 258,
    Cave4Echo = 259,
    Cave5Echo = 260,
    Cave6Echo = 261,
    Cave7Echo = 262,
    SpiderEcho = 263,
    CorruptGrassEcho = 264,
    HallowedGrassEcho = 265,
    IceEcho = 266,
    ObsidianBackEcho = 267,
    CrimsonGrassEcho = 268,
    CrimstoneEcho = 269,
    CaveWall1Echo = 270,
    CaveWall2Echo = 271,
    MarbleEchoUnused = 272,
    GraniteEchoUnused = 273,
    Cave8Echo = 274,
    SandstoneEcho = 275,
    Corruption1Echo = 276,
    Corruption2Echo = 277,
    Corruption3Echo = 278,
    Corruption4Echo = 279,
    Crimson1Echo = 280,
    Crimson2Echo = 281,
    Crimson3Echo = 282,
    Crimson4Echo = 283,
    Dirt1Echo = 284,
    Dirt2Echo = 285,
    Dirt3Echo = 286,
    Dirt4Echo = 287,
    Hallow1Echo = 288,
    Hallow2Echo = 289,
    Hallow3Echo = 290,
    Hallow4Echo = 291,
    Jungle1Echo = 292,
    Jungle2Echo = 293,
    Jungle3Echo = 294,
    Jungle4Echo = 295,
    Lava1Echo = 296,
    Lava2Echo = 297,
    Lava3Echo = 298,
    Lava4Echo = 299,
    Rocks1Echo = 300,
    Rocks2Echo = 301,
    Rocks3Echo = 302,
    Rocks4Echo = 303,
    HardenedSandEcho = 304,
    CorruptHardenedSandEcho = 305,
    CrimsonHardenedSandEcho = 306,
    HallowHardenedSandEcho = 307,
    CorruptSandstoneEcho = 308,
    CrimsonSandstoneEcho = 309,
    HallowSandstoneEcho = 310,
    DesertFossilEcho = 311,
    BambooBlockWall = 312,
    LargeBambooBlockWall = 313,
    AmberStoneWallEcho = 314,
    BambooFence = 315,
    AshWood = 316,
    AshWoodFence = 317,
    EchoWall = 318,
    ReefWall = 319,
    PoopWall = 320,
    ShimmerBlockWall = 321,
    ShimmerBrickWall = 322,
    LunarRustBrickWall = 323,
    DarkCelestialBrickWall = 324,
    AstraBrickWall = 325,
    CosmicEmberBrickWall = 326,
    CryocoreBrickWall = 327,
    MercuryBrickWall = 328,
    StarRoyaleBrickWall = 329,
    HeavenforgeBrickWall = 330,
    AncientBlueBrickWall = 331,
    AncientGreenBrickWall = 332,
    AncientPinkBrickWall = 333,
    AncientGoldBrickWall = 334,
    AncientSilverBrickWall = 335,
    AncientCopperBrickWall = 336,
    AncientObsidianBrickWall = 337,
    AncientHellstoneBrickWall = 338,
    AncientCobaltBrickWall = 339,
    AncientMythrilBrickWall = 340,
    LavaMossBlockWall = 341,
    ArgonMossBlockWall = 342,
    KryptonMossBlockWall = 343,
    XenonMossBlockWall = 344,
    VioletMossBlockWall = 345,
    RainbowMossBlockWall = 346,
    Count = 347,
}
