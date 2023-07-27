addLayer("c", {
    name: "cards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "cards", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    milestones: {
        0: {
            requirementDescription: "4 cards",
            effectDescription: "Unlock the forge",
            done() { return player.c.points.gte(4) }
        },
    },
    upgrades: {
        11: {
            title: "2 of Hearts",
            description: "Double card progression generation.",
            cost: new Decimal(1),
        },
        12: {
            title: "2 of Spades",
            description: "Double card progression generation again.",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade('c', 11)},
        },
        13: {
            title: "2 of Diamonds",
            description: "Double card progression generation yet again.",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade('c', 12) && hasUpgrade('c', 21)},
        },
        14: {
            title: "2 of Clovers",
            description: "Double card progression generation once again.",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('c', 13) && hasUpgrade('c', 22) && hasUpgrade('c', 31) && hasMilestone('f', 0)},
        },
        21: {
            title: "3 of Hearts",
            description: "Add +3 to base card progression gain.",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade('c', 11)},
        },
        22: {
            title: "3 of Spades",
            description: "Add +3 to base card progression gain again.",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade('c', 12) && hasUpgrade('c', 21)},
        },
        23: {
            title: "3 of Diamonds",
            description: "Add +3 to base card progression gain once again.",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('c', 13) && hasUpgrade('c', 22) && hasUpgrade('c', 31) && hasMilestone('f', 0)},
        },
        24: {
            title: "3 of Clovers",
            description: "Add +3 to base card progression gain yet again.",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('c', 14) && hasUpgrade('c', 23) && hasUpgrade('c', 32) && hasUpgrade('c', 41) && hasMilestone('f', 1)},
        },
        31: {
            title: "4 of Hearts",
            description: "Card progression is multiplied by the 4th root of itself.",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade('c', 12) && hasUpgrade('c', 21)},
            effect() {
                if (!hasUpgrade('f', 13) ){return player.points.plus(1).pow(0.25)} else {return player.points.times(upgradeEffect('f', 13)).plus(1).pow(0.25)}
            },
            effectdisplay() {return format(upgradeEffect('c', 31))+"x" },
        },
        32: {
            title: "4 of Spades",
            description: "Card progression is multiplied by the 4th root of the previous upgrade.",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('c', 13) && hasUpgrade('c', 22) && hasUpgrade('c', 31) && hasMilestone('f', 0)},
            effect() {
                return upgradeEffect('c', 31).pow(0.25).plus(1)
            },
            effectdisplay() {return format(upgradeEffect('c', 31))+"x" },
        },
        33: {
            title: "4 of Diamonds",
            description: "Card progression is multiplied by the 4th root of the previous upgrade.",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('c', 14) && hasUpgrade('c', 23) && hasUpgrade('c', 32) && hasUpgrade('c', 41) && hasMilestone('f', 1)},
            effect() {
                return upgradeEffect('c', 32).pow(0.25).plus(1)
            },
            effectdisplay() {return format(upgradeEffect('c', 33))+"x" },
        },
        34: {
            title: "4 of Clovers",
            description: "Card progression is multiplied by the 4th root of the previous upgrade.",
            cost: new Decimal(6),
            unlocked() {return hasUpgrade('c', 24) && hasUpgrade('c', 33) && hasUpgrade('c', 42) && hasUpgrade('c', 51) && hasUpgrade('f', 14)},
            effect() {
                return upgradeEffect('c', 33).pow(0.25).plus(1)
            },
            effectdisplay() {return format(upgradeEffect('c', 34))+"x" },
        },
        41: {
            title: "5 of Hearts",
            description: "Multiply steel gain by 5.",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('c', 13) && hasUpgrade('c', 22) && hasUpgrade('c', 31) && hasMilestone('f', 0)},
        },
        42: {
            title: "5 of Spades",
            description: "Multiply steel gain by 5 again.",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('c', 14) && hasUpgrade('c', 23) && hasUpgrade('c', 32) && hasUpgrade('c', 41) && hasMilestone('f', 1)},
        },
        43: {
            title: "5 of Diamonds",
            description: "Multiply steel gain by 5 again.",
            cost: new Decimal(6),
            unlocked() {return hasUpgrade('c', 24) && hasUpgrade('c', 33) && hasUpgrade('c', 42) && hasUpgrade('c', 51) && hasUpgrade('f', 14)},
        },
        51: {
            title: "6 of Hearts",
            description: "The 6th root of your card progression multiply steel gain.",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('c', 14) && hasUpgrade('c', 23) && hasUpgrade('c', 32) && hasUpgrade('c', 41) && hasMilestone('f', 1)},
            effect() {
                return player.points.plus(1).pow(0.16666666666)
            }
        },
        52: {
            title: "6 of Spades",
            description: "The 6th root of the previous upgrade multiplies steel gain.",
            cost: new Decimal(6),
            unlocked() {return hasUpgrade('c', 24) && hasUpgrade('c', 33) && hasUpgrade('c', 42) && hasUpgrade('c', 51) && hasUpgrade('f', 14)},
            effect() {
                return upgradeEffect('c', 51).plus(1).pow(0.16666666666)
            }
        },
        61: {
            title: "7 of Hearts",
            description: "The 7th root of your Steel multiplies point gain.",
            cost: new Decimal(6),
            unlocked() {return hasUpgrade('c', 24) && hasUpgrade('c', 33) && hasUpgrade('c', 42) && hasUpgrade('c', 51) && hasUpgrade('f', 14)},
            effect() {
                return player.f.points.pow(0.142857142857)
            }
        }
    }
})
addLayer('f', {
    branches: ['c'],
    name: "forge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#7f7f7f",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "steel", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (!hasUpgrade('f', 14)) {
        if (hasUpgrade('c', 41)) mult = mult.times(5)
        if (hasUpgrade('c', 42)) mult = mult.times(5)
    } else {
        if (hasUpgrade('c', 41)) mult = mult.times(10)
        if (hasUpgrade('c', 42)) mult = mult.times(10)
    }
        if (hasUpgrade('c', 51)) mult = mult.times(upgradeEffect('c', 51))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone('c', 0) || player[this.layer].points >= 1},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "blank",
                "blank",
                "milestones",
                "blank",
                "blank",
                "upgrades"
            ]
        },
        "Copper": {
            content: [
                ["display-text", "You've reached the end for now..."],
            ],
            unlocked() {
                return hasMilestone('f', 2)
            }
        }
    },
    milestones: {
        0: {
            requirementDescription: "1 steel",
            effectDescription: "Unlock more card upgrades and steel upgrades",
            done() {return player.f.points.gte(1)}
        },
        1: {
            requirementDescription: "10000 steel",
            effectDescription: "Unlock even more card upgrades",
            done() {return player.f.points.gte(10000)}
        },
        2: {
            requirementDescription: "1e9 steel",
            effectDescription: "Unlock Copper",
            done() {return player.f.points.gte(1e9)}
        }
    },
    upgrades: {
        11: {
            title: "2 of Steel",
            description: "Add 2 to the effects of the 2 upgrades.",
            cost: new Decimal(100),
            unlocked() {return hasMilestone('f', 0)}
        },
        12: {
            title: "3 of Steel",
            description: "Add 3 to the effects of the 3 upgrades.",
            cost: new Decimal(2000),
            unlocked() {return hasUpgrade('f', 11)}
        },
        13: {
            title: "4 of Steel",
            description: "The 4th root of your steel multiplies your card progression in the formula for \"4 of Hearts\".",
            cost: new Decimal(30000),
            unlocked() {return hasUpgrade('f', 12)},
            effect() {
                return player[this.layer].points.pow(0.25)
            },
        },
        14: {
            title: "5 of Steel",
            description: "Add 5 to the effects of the 5 upgrades and unlock more card upgrades.",
            cost: new Decimal(40000000),
            unlocked() {return hasUpgrade('f', 13)}
        }
    },
})
