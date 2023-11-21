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
    baseResource: "card progression", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    autoUpgrade: () => hasMilestone('f', 3),
    canBuyMax() {return hasMilestone('p', 2)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        ["infobox", "deleteLater"],
        "blank",
        "milestones",
        "blank",
        "upgrades"
    ],
    hotkeys: [
        {
            key: "c", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "C: Draw card", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.c.unlocked) doReset("c") },
            unlocked() {return player.c.unlocked}
        }
    ],
    milestones: {
        0: {
            requirementDescription: "4 cards",
            effectDescription: "Unlock the Forge layer",
            done() {return player.c.points.gte(4)}
        },
        1: {
            requirementDescription: "13 cards",
            effectDescription: "Unlock the Pokerchip layer",
            done() {return player.c.points.gte(13)},
            unlocked() {return hasMilestone('f', 4)}
        }
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
            title: "2 of Clubs",
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
            title: "3 of Clubs",
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
            title: "4 of Clubs",
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
            description: "Multiply steel gain by 5 yet again.",
            cost: new Decimal(6),
            unlocked() {return hasUpgrade('c', 24) && hasUpgrade('c', 33) && hasUpgrade('c', 42) && hasUpgrade('c', 51) && hasUpgrade('f', 14)},
        },
        44: {
            title: "5 of Clubs",
            description: "Multiply steel gain by 5 once again.",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade('c', 34) && hasUpgrade('c', 43) && hasUpgrade('c', 52) && hasUpgrade('c', 61) && hasUpgrade('f', 22)},
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
        53: {
            title: "6 of Diamonds",
            description: "The 6th root of the previous upgrade multiplies steel gain.",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade('c', 34) && hasUpgrade('c', 43) && hasUpgrade('c', 52) && hasUpgrade('c', 61) && hasUpgrade('f', 22)},
            effect() {
                return upgradeEffect('c', 52).plus(1).pow(0.16666666666)
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
        },
        62: {
            title: "7 of Clubs",
            description: "The 7th root of the previous upgrade multiplies point gain.",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade('c', 34) && hasUpgrade('c', 43) && hasUpgrade('c', 52) && hasUpgrade('c', 61) && hasUpgrade('f', 22)},
            effect() {
                return upgradeEffect('c', 61).pow(0.142857142857)
            }
        },
        71: {
            title: "8 of Hearts",
            description: "The 8th root of your Steel multiplies itself.",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade('c', 34) && hasUpgrade('c', 43) && hasUpgrade('c', 52) && hasUpgrade('c', 61) && hasUpgrade('f', 22)},
            effect() {
                return player.f.points.pow(0.125)
            }
        }
    },
    infoboxes: {
        deleteLater: {
            title: "Early Casino Update Notice",
            body() { return "The Solitree: Casino Update has released early due to risks involving my MacOS being infected. Please note that this is NOT the final update and things are subject to change." },
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
    baseResource: "card progression", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    resetsNothing: () => hasMilestone('p', 0),
    passiveGeneration() {
        if (hasMilestone('p', 2)) {return 10}
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (!hasUpgrade('f', 14)) {
        if (hasUpgrade('c', 41)) mult = mult.times(5)
        if (hasUpgrade('c', 42)) mult = mult.times(5)
        if (hasUpgrade('c', 43)) mult = mult.times(5)
    } else {
        if (hasUpgrade('c', 41)) mult = mult.times(10)
        if (hasUpgrade('c', 42)) mult = mult.times(10)
        if (hasUpgrade('c', 43)) mult = mult.times(5)
    }
        if (hasUpgrade('c', 51)) mult = mult.times(upgradeEffect('c', 51))
        if (hasUpgrade('c', 52)) mult = mult.times(upgradeEffect('c', 52))
        if (hasUpgrade('c', 53)) mult = mult.times(upgradeEffect('c', 53))
        if (hasUpgrade('c', 71)) mult = mult.times(upgradeEffect('c', 71))
        mult = mult.times(buyableEffect('f', 23))
        mult = mult.times(buyableEffect('f', 32))
        mult = mult.times(player.p.points.plus(1).pow(2).log(2).plus(1))
        return mult
    },
    copperLimit() {
        limit = new Decimal(10);
        if (hasUpgrade("f", 21)) limit = limit.plus(5);
        if (hasUpgrade("f", 22)) limit = limit.plus(10);
        if (hasMilestone("p", 3)) limit = limit.plus(player.p.points.pow(0.75))
        return limit
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        exp = exp.plus(getBuyableAmount('f', 21).pow(0.5).div(10))
        exp = exp.plus(buyableEffect('f', 33))
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone('c', 0) || player[this.layer].points >= 1},
    hotkeys: [
        {
            key: "f", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "F: Forge steel", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.f.unlocked) doReset("f") },
            unlocked() {return player.f.unlocked}
        }
    ],
    tabFormat: {
        "Steel": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "blank",
                "blank",
                "milestones",
                "blank",
                "blank",
                ["upgrades", [1]]
            ]
        },
        "Copper": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["bar", "copperStorage"],
                "blank",
                ["buyables", [1, 2]],
                "blank",
                "blank",
                ["upgrades", [2]],

            ],
            unlocked() {return hasMilestone('f', 2)},
        },
        "Iron": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["upgrades", [3]],
                "blank",
                ["display-text", () => "You currently have " + ironAmount() + " iron."],
                "blank",
                ["buyables", [3]],
            ],
            unlocked() {return hasMilestone('f', 4)}
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
        },
        3: {
            requirementDescription: "1e20 steel",
            effectDescription: "Autobuy Card upgrades",
            done() {return player.f.points.gte(1e20)}
        },
        4: {
            requirementDescription: "1e45 steel",
            effectDescription: "Unlock Iron",
            done() {return player.f.points.gte(1e45)}
        },
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
        },
        21: {
            title: "Steel Box",
            description: "Add 5 to the copper limit.",
            cost: new Decimal(1e15),
        },
        22: {
            title: "Copper Box",
            description: "Add 10 to the copper limit, and unlock more card upgrades. Requires 15 copper.",
            cost: new Decimal(1e30),
            canAfford() {return getBuyableAmount('f', 11).gte(15)},
        },
        31: {
            title: "Build Drill",
            description: "Gain +1 iron per order of magnitude of Steel after 45.",
            cost: new Decimal(1e45),
            effect() {
                if (player.f.points.lt(1e45)) return Decimal.dZero
                return player.f.points.plus(1).log10().minus(45).floor()
            }
        },
        32: {
            title: "Modify Drill",
            description: "Gain +2 iron per Card after 5.",
            cost: new Decimal(1e60),
            effect() {
                if (player.c.points.lt(5)) return Decimal.dZero
                return player.c.points.sub(5)
            },
            unlocked() {return hasUpgrade('f', 31)}
        },
        33: {
            title: "Improve Drill",
            description: "Gain +3 iron per Copper Plate.",
            cost: new Decimal(1e75),
            effect() {
                return getBuyableAmount('f', 22).mul(3)
            },
            unlocked() {return hasUpgrade('f', 32)}
        }
    },
    buyables: {
        respecText: "Reset all forged items",
        respec() {
            setBuyableAmount('f', 21, new Decimal(0))
            setBuyableAmount('f', 22, new Decimal(0))
            setBuyableAmount('f', 23, new Decimal(0))
            setBuyableAmount('f', 31, new Decimal(0))
            setBuyableAmount('f', 32, new Decimal(0))
            setBuyableAmount('f', 33, new Decimal(0))
            doReset('f')
        },
        respecMessage: "This will force a Forge reset and reset ALL items across all unlocked tabs except for steel. You sure?",
        11: {
            cost() {return new Decimal(1e9).times(new Decimal(new Decimal (2).plus(getBuyableAmount(this.layer, this.id))).pow(getBuyableAmount(this.layer, this.id))) },
            title: "Buy Copper",
            display() {return "Cost: " + format(this.cost()) + " steel"},
            canAfford() {
                if (player[this.layer].points.gte(this.cost())) {return getBuyableAmount(this.layer, this.id).lt(tmp[this.layer].copperLimit)}
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        21: {
            title: "Copper Wire",
            cost() {return new Decimal(1).plus(getBuyableAmount(this.layer, this.id)).plus(getBuyableAmount('f', 22)).plus(getBuyableAmount('f', 23))},
            display() {return "The square root of this buyable divided by 10 adds to the steel exponent.\nRequires: " + this.cost() + " copper.\nAmount: " + getBuyableAmount(this.layer, this.id)},
            canAfford() {return getBuyableAmount('f', 11).gte(this.cost())},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        22: {
            title: "Copper Plate",
            cost() {return new Decimal(1).plus(getBuyableAmount(this.layer, this.id)).plus(getBuyableAmount('f', 21)).plus(getBuyableAmount('f', 23))},
            display() {return "Double card progression.\nRequires: " + this.cost() + " copper.\nAmount: " + getBuyableAmount(this.layer, this.id)},
            canAfford() {return getBuyableAmount('f', 11).gte(this.cost())},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        23: {
            title: "Copper Pipe",
            cost() {return new Decimal(1).plus(getBuyableAmount(this.layer, this.id)).plus(getBuyableAmount('f', 21)).plus(getBuyableAmount('f', 22))},
            display() {return "Multiply steel gain by a factor of 10.\nRequires: " + this.cost() + " copper.\nAmount: " + getBuyableAmount(this.layer, this.id)},
            canAfford() {return getBuyableAmount('f', 11).gte(this.cost())},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                return new Decimal(10).pow(getBuyableAmount(this.layer, this.id).plus(1)).plus(1)
            }
        },
        31: {
            title: "Metal Wire",
            cost() {return new Decimal(2).pow(new Decimal(1).plus(getBuyableAmount(this.layer, this.id)).plus(getBuyableAmount('f', 32)).plus(getBuyableAmount('f', 33)))},
            display() {return "Copper divided by 20 multiplies card progression.\nRequires: " + this.cost() + " iron.\nAmount: " + getBuyableAmount(this.layer, this.id)},
            canAfford() {return ironAmount().gte(this.cost())},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                return getBuyableAmount('f', 11).div(20).mul(getBuyableAmount(this.layer, this.id))
            }
        },
        32: {
            title: "Metal Plate",
            cost() {return new Decimal(2).pow(new Decimal(1).plus(getBuyableAmount(this.layer, this.id)).plus(getBuyableAmount('f', 31)).plus(getBuyableAmount('f', 33)))},
            display() {return "Copper multiplies steel gain.\nRequires: " + this.cost() + " iron.\nAmount: " + getBuyableAmount(this.layer, this.id)},
            canAfford() {return ironAmount().gte(this.cost())},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                return getBuyableAmount('f', 11).mul(getBuyableAmount(this.layer, this.id)).add(1)
            }
        },
        33: {
            title: "Metal Pipe",
            cost() {return new Decimal(2).pow(new Decimal(1).plus(getBuyableAmount(this.layer, this.id)).plus(getBuyableAmount('f', 31)).plus(getBuyableAmount('f', 32)))},
            display() {return "Add to the steel exponent based on your cards and how many Metal Pipes you have.\nRequires: " + this.cost() + " iron.\nAmount: " + getBuyableAmount(this.layer, this.id)},
            canAfford() {return ironAmount().gte(this.cost())},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                return (getBuyableAmount(this.layer, this.id).times(player.c.points.div(100))).plus(1).log10()
            }
        }
    },
    bars: {
        copperStorage: {
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {return getBuyableAmount('f', 11).div(tmp.f.copperLimit)},
            display() {return "Copper Limit: " + getBuyableAmount('f', 11) + "/" + format(tmp.f.copperLimit)},
            fillStyle: {"background-color": "rgb(153, 51, 0)"},
        }
    },
})
addLayer("p", {
    startData() { return {                 
        unlocked: true,                    
        points: new Decimal(0),
    }},
    branches: ['c', 'f'],
    color: "#FF7F7f",                      
    resource: "pokerchips",            
    row: 2,          
    position: 2,                    
    baseResource: "cards",                 
    baseAmount() { return player.c.points},  
    requires: new Decimal(13),                                                         
    type: "normal",                         
    exponent: 2.5,                          
    gainMult() {                           
        return new Decimal(1)
    },
    gainExp() {                             
        return new Decimal(1)
    },
    layerShown() {return hasMilestone('c', 1) || player.p.points.gte(1)},         
    hotkeys: [
        {
            key: "p", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "P: Purchase pokerchips", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.p.unlocked) doReset("p") },
            unlocked() {return player.p.unlocked}
        }
    ],
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "milestones",
                ["display-text", "Your pokerchips are: "],
                ["display-text", () => "multiplying card progression by " + format(new Decimal(2).pow(player.p.points.plus(1)).plus(1).log10().plus(1))],
                ["display-text", () => "multiplying steel by " + format(player.p.points.plus(1).pow(2).log(2).plus(1))],
                ["display-text", () => "adding " + format(player.p.points.pow(0.75)) + " to the copper limit"]
            ]
        },
        "The Casino": {
                content: [
                    "main-display",
                    "prestige-button",
                    "blank",
                    ["microtabs", "casinostuff"]
                ],
                unlocked() {return hasMilestone('p', 4)}
        }
    }   ,
    milestones: {
        0: {
            requirementDescription: "1 pokerchip",
            effectDescription: "Forge resets nothing",
            done() {return player.p.points.gte(1)},
        },
        1: {
            requirementDescription: "2 pokerchips",
            effectDescription: "Generate 10x the steel you gain on reset",
            done() {return player.p.points.gte(2)},
        },    
        2: {
            requirementDescription: "3 pokerchips",
            effectDescription: "You can buy max cards",
            done() {return player.p.points.gte(3)},
        },     
        3: {
            requirementDescription: "4 pokerchips",
            effectDescription: "Unlock the Copper Limit pokerchip buff",
            done() {return player.p.points.gte(4)},
        },       
        4: {
            requirementDescription: "5 pokerchips",
            effectDescription: "Unlock the Casino",
            done() {return player.p.points.gte(5)},
        }
    },
    buyables: {
        11: {
            title: "Spin Slot Machine with Cards",
            cost() {return new Decimal(20).plus()},
            display() {return "Spin for a random boost to certain resource gains.\nRequires: " + this.cost() + " cards.\nAmount: " + getBuyableAmount(this.layer, this.id)},
            canAfford() {return player.c.points.gte(this.cost(getBuyableAmount(this.layer, this.id)))},
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title: "Spin Slot Machine with Steel",
            cost() {return new Decimal(1e200).mul(new Decimal(1e20).pow(getBuyableAmount(this.layer, this.id)))},
            display() {return "Spin for a random boost to certain resource gains.\nRequires: " + this.cost() + " steel.\nAmount: " + getBuyableAmount(this.layer, this.id)},
            canAfford() {return player.f.points.gte(this.cost())},
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        13: {
            title: "Spin Slot Machine with Pokerchips",
            cost() {return getBuyableAmount(this.layer, this.id).plus(1)},
            display() {return "Spin for a random boost to certain resource gains.\nRequires: " + this.cost() + " pokerchips.\nAmount: " + getBuyableAmount(this.layer, this.id)},
            canAfford() {return player.p.points.gte(this.cost())},
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        }
    },
    microtabs: {
        "casinostuff": {
            content: [
                "buyables"
            ]
        }
    }
})
