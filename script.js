//#############################################################
// ____            _        _      ____
//| __ ) _   _ ___| |_     / \    | __ )  ___  _ __  _   _ ___
//|  _ \| | | / __| __|   / _ \   |  _ \ / _ \| '_ \| | | / __|
//| |_) | |_| \__ \ |_   / ___ \  | |_) | (_) | | | | |_| \__ \
//|____/ \__,_|___/\__| /_/   \_\ |____/ \___/|_| |_|\__,_|___/
//#############################################################

/** Busta-A-Bit Bonus Script
 *
 * Built by Peekaboi
 * Profile:  http://hackforums.net/member.php?action=profile&uid=2925654
 *
 * Please do not distribute
 *
 */

/** -------------- Settings -------------- **/

/** Main settings **/
var baseBet = 1;
//Your base bet for the script
var debug = true;
//Debug the script. This will activate the console logging

/** Fail safe settings **/
// This is **NOT currently working
var stopOnMajorLoss = false;
//Completely stop the script if you have lost more than 50% of your balance

/** Bonus hunting settings **/
var maxMultiplier = 3;
//Should it not snipe a bonus, what would you like to cash out on.
var maxPeopleLeft = 1;
//How many people should be left before we force cash out. Either this or the maxMultiplier will be triggered if the bonus snipe is not triggered
var ignoreBets = 0; // This is a advance setting
//How many bets should we ignore to ignore all those people using scripts or betting small? We want smart bets only. 3 is a good number
var startCheckingForBonusAtMultiplier = 1.20;
//At which multiplier (current payout) should we start looking for a bonus
var highBet = 10000;
//What makes a bet a "high" bet. This is the number that separates low bets from high bets. This number is divided by two on ever loss.
//The higher this number is, the more likely it is too lose a game. The lower, the less likely. However this effects your overall outcome in the future

/** Loss streak settings **/
var lossStreakSettingsEnabled = true;
//Disables or enabled loss streak settings
var maxLossStreak = 6;
//How many times would you like to lose in a row before resetting back to base bet. 1 to never double bet
var lossBetMultiplier = 1.1;
//What would you like to multiply your base bet by every time you lose, change to one to just double each game
var holdUntilWin = true;
//If this is true, then your current bet will not be reset. This means it will bet maxLossStreak * lossBetMultiplier * baseBet until it wins
var waitBeforeBet = 4;
//If this is not zero, the script will wait x games before betting again

/** Win streak settings (This is NOT tested) **/
var maxWinEnabled = false;
//If you would like to enable max win streaks This will stop the script after winning x times
var maxWinStreak = 0;
//How many times would you like to win in a row before we start getting scared about a rape train. This is a mind setting. It doesn't really change the chances in the end
var winBreakAmount = 3;
//How many games should we take a break a fter winning maxWinStreak in a row

/** Randomizer settings (This is NOT tested) **/
var useRandomizer = false;
//Should we use the randomizer function built into the script. This will randomize your base bet by either halving it or multiplying it each game
var randomMultipliers = [.50, 1, 2];
//What values would you like to randomly multiply the bet bad

/** -------------- Settings -------------- **/


/** SAFE EDIT LINE
 * ------------------------------------------------------------------------------------------------------------------------------------------/
 * WARNING: ANY EDITS BEYOND THIS LINE CAN RESULT IN LOSS OF BITS
 * DO NOT TOUCH. THIS IS YOUR ONLY WARNING
 * IF YOU EDIT ANYTHING BELOW THIS LINE YOU WILL LOSE BITS. I PROMISE
 * ------------------------------------------------------------------------------------------------------------------------------------------ **/


var _0x8cc4 = ["\x67\x65\x74\x55\x73\x65\x72\x6E\x61\x6D\x65", "\x67\x65\x74\x42\x61\x6C\x61\x6E\x63\x65", "\x67\x61\x6D\x65\x5F\x73\x74\x61\x72\x74\x69\x6E\x67", "\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D", "\x47\x61\x6D\x65\x20\x53\x74\x61\x72\x74\x69\x6E\x67", "\x6C\x61\x73\x74\x47\x61\x6D\x65\x50\x6C\x61\x79", "\x4C\x4F\x53\x54", "\x5B\x48\x6F\x6C\x64\x69\x6E\x67\x5D\x20\x42\x6F\x74\x20\x69\x73\x20\x63\x75\x72\x72\x65\x6E\x74\x6C\x79\x20\x68\x6F\x6C\x64\x69\x6E\x67\x20\x62\x65\x66\x6F\x72\x65\x20\x62\x65\x74\x74\x69\x6E\x67\x20\x61\x67\x61\x69\x6E", "\x5B\x48\x6F\x6C\x64\x69\x6E\x67\x5D\x20\x42\x6F\x74\x20\x69\x73\x20\x63\x75\x72\x72\x65\x6E\x74\x20\x68\x6F\x6C\x64\x69\x6E\x67\x20\x62\x65\x66\x6F\x72\x65\x20\x62\x65\x74\x74\x69\x6E\x67\x20\x61\x67\x61\x69\x6E\x20\x47\x61\x6D\x65\x73\x20\x6C\x65\x66\x74\x20\x74\x6F\x20\x68\x6F\x6C\x64\x3A\x20", "\x4E\x6F\x74\x20\x67\x6F\x69\x6E\x67\x20\x74\x6F\x20\x62\x65\x74\x20\x62\x65\x63\x61\x75\x73\x65\x20\x79\x6F\x75\x20\x68\x61\x76\x65\x20\x6C\x6F\x73\x74\x20\x6D\x6F\x72\x65\x20\x74\x68\x61\x6E\x20\x35\x30\x25\x20\x6F\x66\x20\x79\x6F\x75\x72\x20\x62\x61\x6C\x61\x6E\x63\x65", "\x43\x75\x72\x72\x65\x6E\x74\x20\x69\x73\x20\x62\x65\x69\x6E\x67\x20\x72\x61\x6E\x64\x6F\x6D\x69\x7A\x65\x64\x2C\x20\x63\x75\x72\x72\x65\x6E\x74\x20\x62\x65\x74\x3A\x20", "\x72\x61\x6E\x64\x6F\x6D", "\x6C\x65\x6E\x67\x74\x68", "\x66\x6C\x6F\x6F\x72", "\x43\x75\x72\x72\x65\x6E\x74\x20\x62\x65\x74\x20\x77\x61\x73\x20\x72\x61\x6E\x64\x6F\x6D\x69\x7A\x65\x64\x2C\x20\x6E\x65\x77\x20\x62\x65\x74\x20\x61\x6D\x6F\x75\x6E\x74\x3A\x20", "\x54\x6F\x74\x61\x6C\x20\x42\x69\x74\x73\x20\x77\x61\x67\x65\x72\x65\x64\x20\x6C\x61\x73\x74\x20\x67\x61\x6D\x65\x3A\x20", "\x4C\x61\x73\x74\x20\x67\x61\x6D\x65\x20\x77\x61\x73\x20\x61\x20\x6C\x6F\x73\x73\x2C\x20\x62\x65\x74\x74\x69\x6E\x67\x20\x77\x69\x74\x68\x20\x64\x69\x66\x66\x65\x72\x65\x6E\x74\x20\x76\x61\x72\x69\x61\x62\x6C\x65\x73", "\x2A\x2A\x20\x48\x6F\x6C\x64\x20\x75\x6E\x74\x69\x6C\x20\x77\x69\x6E\x20\x65\x6E\x61\x62\x6C\x65\x64\x2C\x20\x63\x6F\x6E\x74\x69\x6E\x75\x69\x6E\x67\x20\x62\x65\x74\x74\x69\x6E\x67", "\x2A\x2A\x20\x4C\x6F\x73\x74\x20\x74\x6F\x6F\x20\x6D\x61\x6E\x79\x20\x67\x61\x6D\x65\x73\x20\x69\x6E\x20\x61\x20\x72\x6F\x77\x2C\x20\x72\x65\x73\x65\x74\x74\x69\x6E\x67\x20\x62\x65\x74\x73", "\x42\x6F\x74\x20\x69\x73\x20\x72\x65\x73\x65\x74\x74\x69\x6E\x67\x20\x6C\x6F\x73\x73\x20\x69\x6E\x66\x6F\x72\x6D\x61\x74\x69\x6F\x6E\x20\x66\x6F\x72\x20\x62\x65\x74\x73\x20\x62\x65\x63\x61\x75\x73\x65\x20\x69\x74\x20\x77\x6F\x6E", "\x42\x6F\x74\x20\x69\x73\x20\x73\x74\x69\x6C\x6C\x20\x6F\x6E\x20\x77\x69\x6E\x20\x73\x74\x72\x65\x61\x6B\x20\x63\x6F\x6F\x6C\x20\x64\x6F\x77\x6E\x2C\x20\x69\x67\x6E\x6F\x72\x69\x6E\x67\x20\x62\x65\x74\x2E\x20\x4C\x61\x73\x74\x20\x63\x6F\x6F\x6C\x20\x64\x6F\x77\x6E\x20\x67\x61\x6D\x65", "\x42\x6F\x74\x20\x69\x73\x20\x73\x74\x69\x6C\x6C\x20\x6F\x6E\x20\x61\x20\x77\x69\x6E\x20\x73\x74\x72\x65\x61\x6B\x20\x63\x6F\x6F\x6C\x20\x64\x6F\x77\x6E\x2C\x20\x69\x67\x6E\x6F\x72\x69\x6E\x67\x20\x62\x65\x74\x2E\x20\x4D\x6F\x72\x65\x20\x74\x68\x61\x6E\x20\x31\x20\x67\x61\x6D\x65\x73\x20\x6C\x65\x66\x74\x20\x6F\x6E\x20\x63\x6F\x6F\x6C\x64\x6F\x77\x6E", "\x2A\x2A\x20\x50\x6C\x61\x63\x69\x6E\x67\x20\x6E\x6F\x72\x6D\x61\x6C\x20\x62\x65\x74\x20\x66\x6F\x72\x20", "\x72\x6F\x75\x6E\x64", "\x70\x6C\x61\x63\x65\x42\x65\x74", "\x6F\x6E", "\x70\x6C\x61\x79\x65\x72\x5F\x62\x65\x74", "\x63\x75\x72\x72\x65\x6E\x74\x47\x61\x6D\x65\x49\x6E\x64\x65\x78", "\x75\x73\x65\x72\x6E\x61\x6D\x65", "\x69\x6E\x64\x65\x78", "\x5B\x59\x6F\x75\x72\x20\x62\x65\x74\x5D\x20", "\x43\x75\x72\x72\x65\x6E\x74\x20\x69\x6E\x64\x65\x78\x20\x66\x6F\x72\x20\x67\x61\x6D\x65\x3A\x20", "\x67\x61\x6D\x65\x5F\x73\x74\x61\x72\x74\x65\x64", "\x47\x61\x6D\x65\x20\x68\x61\x73\x20\x73\x74\x61\x72\x74\x65\x64", "\x68\x61\x73\x4F\x77\x6E\x50\x72\x6F\x70\x65\x72\x74\x79", "\x62\x65\x74", "\x62\x6F\x6E\x75\x73", "\x70\x75\x73\x68", "\x68\x69\x67\x68", "\x5B\x44\x61\x74\x61\x5D\x20\x41\x64\x64\x69\x6E\x67\x20", "\x20\x74\x6F\x20\x68\x69\x67\x68\x20\x6C\x69\x73\x74\x20\x62\x65\x63\x61\x75\x73\x65\x20\x6F\x66\x20\x68\x69\x67\x68\x20\x62\x65\x74\x3A\x20", "\x6D\x65\x64", "\x20\x74\x6F\x20\x6D\x65\x64\x69\x75\x6D\x20\x6C\x69\x73\x74\x20\x62\x65\x63\x61\x75\x73\x65\x20\x6F\x66\x20\x6D\x65\x64\x69\x75\x6D\x20\x62\x65\x74\x3A\x20", "\x6C\x6F\x77", "\x20\x74\x6F\x20\x6C\x6F\x77\x20\x6C\x69\x73\x74\x20\x62\x65\x63\x61\x75\x73\x65\x20\x6F\x66\x20\x6C\x6F\x77\x20\x62\x65\x74\x3A\x20", "\x74\x69\x6E\x79", "\x20\x74\x6F\x20\x74\x69\x6E\x79\x20\x6C\x69\x73\x74\x20\x62\x65\x63\x61\x75\x73\x65\x20\x6F\x66\x20\x74\x69\x6E\x79\x20\x62\x65\x74\x3A\x20", "\x55\x73\x65\x72\x73\x20\x6C\x69\x73\x74\x73\x20\x74\x68\x69\x73\x20\x72\x6F\x75\x6E\x64\x3A", "\x48\x69\x67\x68\x65\x73\x74\x20\x55\x73\x65\x72\x73\x3A", "\x4D\x65\x64\x69\x75\x6D\x20\x55\x73\x65\x72\x73\x3A\x20", "\x4C\x6F\x77\x20\x55\x73\x65\x72\x73\x3A\x20", "\x54\x69\x6E\x79\x20\x55\x73\x65\x72\x73\x3A", "\x59\x6F\x75\x72\x20\x62\x6F\x6E\x75\x73\x20\x6C\x61\x73\x74\x20\x72\x6F\x75\x6E\x64\x3A\x20", "\x59\x6F\x75\x72\x20\x63\x75\x72\x72\x65\x6E\x74\x20\x62\x6F\x6E\x75\x73\x20\x74\x6F\x74\x61\x6C\x3A\x20", "\x43\x75\x72\x72\x65\x6E\x74\x20\x68\x6F\x75\x73\x65\x20\x65\x78\x70\x65\x63\x74\x65\x64\x20\x72\x65\x74\x75\x72\x6E\x3A\x20", "\x63\x61\x73\x68\x65\x64\x5F\x6F\x75\x74", "\x67\x65\x74\x43\x75\x72\x72\x65\x6E\x74\x50\x61\x79\x6F\x75\x74", "\x5B\x43\x6F\x75\x6E\x74\x5D\x20\x43\x75\x72\x72\x65\x6E\x74\x20\x63\x61\x73\x68\x65\x64\x20\x6F\x75\x74\x3A\x20", "\x20\x7C\x20\x54\x6F\x74\x61\x6C\x20\x42\x65\x74\x73\x3A\x20", "\x20\x7C\x20\x54\x6F\x74\x61\x6C\x20\x6C\x65\x66\x74\x20\x74\x6F\x20\x63\x61\x73\x68\x20\x6F\x75\x74\x3A\x20", "\x5B\x43\x61\x73\x68\x20\x6F\x75\x74\x5D\x20", "\x2A\x2A\x20\x43\x61\x73\x68\x65\x64\x20\x6F\x75\x74\x20\x77\x69\x74\x68\x20", "\x20\x70\x65\x6F\x70\x6C\x65\x20\x6C\x65\x66\x74", "\x63\x61\x73\x68\x4F\x75\x74", "\x5B\x49\x67\x6E\x6F\x72\x65\x64\x5D\x20", "\x20\x62\x65\x63\x61\x75\x73\x65\x20\x68\x69\x73\x20\x74\x68\x65\x20\x62\x65\x74\x20\x77\x61\x73\x20\x6E\x6F\x74\x20\x6F\x76\x65\x72\x20", "\x20\x62\x65\x63\x61\x75\x73\x65\x20\x68\x69\x73\x20\x70\x72\x65\x76\x69\x6F\x75\x73\x20\x62\x65\x74\x20\x77\x61\x73\x20\x74\x6F\x6F\x20\x6C\x6F\x77", "\x67\x61\x6D\x65\x5F\x63\x72\x61\x73\x68", "\x47\x61\x6D\x65\x20\x68\x61\x73\x20\x63\x72\x61\x73\x68\x65\x64", "\x64\x69\x73\x63\x6F\x6E\x6E\x65\x63\x74", "\x6C\x6F\x67", "\x6B\x65\x79", "\x76\x61\x6C\x75\x65", "\x73\x6F\x72\x74", "\x67\x65\x74\x54\x69\x6D\x65", "\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x20\x43\x75\x72\x72\x65\x6E\x74\x20\x53\x74\x61\x74\x69\x73\x74\x69\x63\x73\x20\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D", "\x54\x6F\x74\x61\x6C\x20\x4C\x6F\x73\x73\x65\x73\x3A\x20", "\x54\x6F\x74\x61\x6C\x20\x57\x6F\x6E\x3A\x20", "\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D", "\x45\x6E\x64\x69\x6E\x67\x20\x6D\x75\x6C\x74\x69\x70\x6C\x69\x65\x72\x73\x3A", "\x47\x45\x54", "\x6F\x70\x65\x6E", "\x73\x65\x6E\x64", "\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74"];
var username = engine[_0x8cc4[0]]();
var currentMultiplier = maxMultiplier;
var currentBet = baseBet;
var currentBetOrder = [];
var previousBetTotal = 0;
var currentIgnoreAmount = 0;
var breakAmount = 0;
var currentLossBreak = 0;
var streakLoss = 0;
var streakWin = 0;
var totalWon = 0;
var totalLost = 0;
var totalBitsLastGame = 0;
var startingBalance = engine[_0x8cc4[1]]();
var cashedOut = false;
var totalBetsCurrent = 0;
var totalCashedCurrent = 0;
var endingMultipliers = [];
var currentHighBet = highBet;
var bonusTotal = 0;
var houseReturnTotal = 0;
var lastStoppedMultiplier = null;
var betting = false;
var bonusLastRound = 0;
var lostPrevious = false;
var previousBets = {
    "\x68\x69\x67\x68": [],
    "\x6D\x65\x64": [],
    "\x6C\x6F\x77": [],
    "\x74\x69\x6E\x79": []
};
var personal = {
    "\x63\x75\x72\x72\x65\x6E\x74\x47\x61\x6D\x65\x49\x6E\x64\x65\x78": 0
};
engine[_0x8cc4[25]](_0x8cc4[2], function(_0xfda3x1c) {
    log(_0x8cc4[3]);
    log(_0x8cc4[4]);
    log(_0x8cc4[3]);
    betting = false;
    if (waitBeforeBet > 0) {
        if (engine[_0x8cc4[5]]() == _0x8cc4[6]) {
            log(_0x8cc4[7]);
            lostPrevious = true;
            breakAmount++;
            if (breakAmount >= waitBeforeBet) {
                breakAmount = 0
            } else {
                return
            }
        } else {
            if (breakAmount > 0) {
                if (breakAmount >= waitBeforeBet) {
                    breakAmount = 0
                } else {
                    log(_0x8cc4[8] + (waitBeforeBet - breakAmount));
                    breakAmount++;
                    return
                }
            }
        }
    };
    if (stopOnMajorLoss) {
        if (startingBalance % engine[_0x8cc4[1]]() >= 2) {
            log(_0x8cc4[9]);
            return
        }
    };
    if (useRandomizer) {
        log(_0x8cc4[10] + currentBet);
        var _0xfda3x1d = randomMultipliers[Math[_0x8cc4[13]](Math[_0x8cc4[11]]() * randomMultipliers[_0x8cc4[12]])];
        currentBet = currentBet * _0xfda3x1d;
        log(_0x8cc4[14] + currentBet)
    };
    log(_0x8cc4[15] + totalBitsLastGame);
    if (engine[_0x8cc4[5]]() == _0x8cc4[6] || lostPrevious) {
        totalLost++;
        if (lossStreakSettingsEnabled) {
            log(_0x8cc4[16]);
            currentBet = currentBet * lossBetMultiplier;
            streakLoss++;
            if (lossStreakSettingsEnabled) {
                if (streakLoss >= maxLossStreak + 1) {
                    if (holdUntilWin) {
                        log(_0x8cc4[17]);
                        currentBet = currentBet / lossBetMultiplier
                    } else {
                        log(_0x8cc4[18]);
                        return
                    }
                }
            }
        }
    } else {
        log(_0x8cc4[19]);
        totalWon++;
        currentBet = baseBet;
        streakLoss = 0;
        currentHighBet = highBet
    };
    lostPrevious = false;
    if (currentBet <= engine[_0x8cc4[1]]()) {
        if (maxWinEnabled) {
            if (streakWin > maxWinStreak) {
                if (breakAmount > winBreakAmount) {
                    log(_0x8cc4[20]);
                    streakWin = 0
                } else {
                    log(_0x8cc4[21]);
                    breakAmount++
                }
            } else {
                log(_0x8cc4[22] + currentBet);
                engine[_0x8cc4[24]](currentBet * 100, Math[_0x8cc4[23]](currentMultiplier * 100), false);
                betting = true
            }
        } else {
            log(_0x8cc4[22] + currentBet);
            engine[_0x8cc4[24]](currentBet * 100, Math[_0x8cc4[23]](currentMultiplier * 100), false);
            betting = true
        }
    }
});
engine[_0x8cc4[25]](_0x8cc4[26], function(_0xfda3x1e) {
    personal[_0x8cc4[27]] = null;
    totalBetsCurrent++;
    if (_0xfda3x1e[_0x8cc4[28]] != username) {
        currentBetOrder[_0xfda3x1e[_0x8cc4[28]]] = _0xfda3x1e
    } else {
        personal[_0x8cc4[27]] = _0xfda3x1e[_0x8cc4[28]][_0x8cc4[29]];
        log(_0x8cc4[30] + _0x8cc4[31] + personal[_0x8cc4[27]])
    }
});
engine[_0x8cc4[25]](_0x8cc4[32], function(_0xfda3x1e) {
    log(_0x8cc4[3]);
    log(_0x8cc4[33]);
    log(_0x8cc4[3]);
    previousBetTotal = 0;
    var _0xfda3x1f = 0;
    var _0xfda3x20 = _0xfda3x1e;
    currentBetOrder = sortCurrentPlayers(currentBetOrder);
    for (var _0xfda3x21 in _0xfda3x20) {
        if (_0xfda3x20[_0x8cc4[34]](_0xfda3x21)) {
            previousBets[_0xfda3x21] = _0xfda3x20[_0xfda3x21][_0x8cc4[35]];
            totalBitsLastGame = totalBitsLastGame + _0xfda3x20[_0xfda3x21][_0x8cc4[35]];
            betAmount = _0xfda3x20[_0xfda3x21][_0x8cc4[35]] / 100;
            bonusLastRound = _0xfda3x20[_0xfda3x21][_0x8cc4[36]] / 100;
            if (_0xfda3x20[_0xfda3x21][_0x8cc4[28]] == username) {
                bonusTotal = bonusTotal + bonusLastRound
            } else {
                if (betAmount >= currentHighBet) {
                    previousBets[_0x8cc4[38]][_0x8cc4[37]](_0xfda3x20[_0xfda3x21][_0x8cc4[28]]);
                    log(_0x8cc4[39] + _0xfda3x20[_0xfda3x21][_0x8cc4[28]] + _0x8cc4[40] + betAmount)
                } else {
                    if (betAmount >= (currentHighBet / 2)) {
                        previousBets[_0x8cc4[41]][_0x8cc4[37]](_0xfda3x20[_0xfda3x21][_0x8cc4[28]]);
                        log(_0x8cc4[39] + _0xfda3x20[_0xfda3x21][_0x8cc4[28]] + _0x8cc4[42] + betAmount)
                    } else {
                        if (betAmount >= (currentHighBet / 4)) {
                            previousBets[_0x8cc4[43]][_0x8cc4[37]](_0xfda3x20[_0xfda3x21][_0x8cc4[28]]);
                            log(_0x8cc4[39] + _0xfda3x20[_0xfda3x21][_0x8cc4[28]] + _0x8cc4[44] + betAmount)
                        } else {
                            previousBets[_0x8cc4[45]][_0x8cc4[37]](_0xfda3x20[_0xfda3x21][_0x8cc4[28]]);
                            log(_0x8cc4[39] + _0xfda3x20[_0xfda3x21][_0x8cc4[28]] + _0x8cc4[46] + betAmount)
                        }
                    }
                }
            }
        }
    };
    calculateHouseReturn(currentBet, lastStoppedMultiplier);
    log(_0x8cc4[3]);
    log(_0x8cc4[47]);
    log(_0x8cc4[3]);
    log(_0x8cc4[48]);
    log(previousBets[_0x8cc4[38]]);
    log(_0x8cc4[49]);
    log(previousBets[_0x8cc4[41]]);
    log(_0x8cc4[50]);
    log(previousBets[_0x8cc4[43]]);
    log(_0x8cc4[51]);
    log(previousBets[_0x8cc4[45]]);
    log(_0x8cc4[3]);
    log(_0x8cc4[52] + _0xfda3x1f);
    log(_0x8cc4[53] + bonusTotal);
    log(_0x8cc4[54] + houseReturnTotal);
    log(_0x8cc4[3]);
    bonusLastRound = 0
});
engine[_0x8cc4[25]](_0x8cc4[55], function(_0xfda3x22) {
    if (!cashedOut) {
        totalCashedCurrent++;
        cashedUser = null;
        var _0xfda3x23 = engine[_0x8cc4[56]]();
        log(_0x8cc4[57] + totalCashedCurrent + _0x8cc4[58] + totalBetsCurrent + _0x8cc4[59] + (totalBetsCurrent - totalCashedCurrent));
        if (totalBetsCurrent - totalCashedCurrent <= maxPeopleLeft) {
            wait(100);
            log(_0x8cc4[60] + _0x8cc4[61] + maxPeopleLeft + _0x8cc4[62]);
            engine[_0x8cc4[63]]()
        };
        cashedUser = _0xfda3x22[_0x8cc4[28]];
        if (isPossibleHigh(cashedUser, _0xfda3x23)) {
            if (_0xfda3x23 > startCheckingForBonusAtMultiplier) {
                engine[_0x8cc4[63]]();
                log(_0x8cc4[60] + _0x8cc4[61] + cashedUser);
                cashedOut = true
            } else {
                log(_0x8cc4[64] + _0xfda3x22[_0x8cc4[28]] + _0x8cc4[65] + startCheckingForBonusAtMultiplier)
            }
        } else {
            log(_0x8cc4[64] + _0xfda3x22[_0x8cc4[28]] + _0x8cc4[66])
        }
    }
});
engine[_0x8cc4[25]](_0x8cc4[67], function(_0xfda3x1e) {
    log(_0x8cc4[3]);
    log(_0x8cc4[68]);
    log(_0x8cc4[3]);
    lastStoppedMultiplier = engine[_0x8cc4[56]]();
    endingMultipliers[_0x8cc4[37]](_0xfda3x1e);
    currentBetOrder = [];
    currentIgnoreAmount = 0;
    cashedOut = false;
    totalBetsCurrent = 0;
    totalCashedCurrent = 0;
    previousBets = {
        "\x68\x69\x67\x68": [],
        "\x6D\x65\x64": [],
        "\x6C\x6F\x77": [],
        "\x74\x69\x6E\x79": []
    }
});
engine[_0x8cc4[25]](_0x8cc4[69], function() {});

function log(_0xfda3x25) {
    if (debug) {
        console[_0x8cc4[70]](_0xfda3x25)
    }
}

function findIndexBet(username) {
    for (var _0xfda3x27 = 0; _0xfda3x27 < currentBetOrder[_0x8cc4[12]]; _0xfda3x27++) {
        if (currentBetOrder[_0xfda3x27][_0x8cc4[71]] === username) {
            return currentBetOrder[_0xfda3x27]
        }
    }
}

function isIndexIn(_0xfda3x29, _0xfda3x2a) {
    for (var _0xfda3x27 = 0; _0xfda3x27 < _0xfda3x2a[_0x8cc4[12]]; _0xfda3x27++) {
        if (_0xfda3x2a[_0xfda3x27][_0x8cc4[72]][_0x8cc4[29]] === _0xfda3x29) {
            return _0xfda3x2a[_0xfda3x27]
        }
    }
}

function sortCurrentPlayers(_0xfda3x2c) {
    var _0xfda3x2d = [];
    var _0xfda3x2e;
    for (_0xfda3x2e in _0xfda3x2c) {
        if (_0xfda3x2c[_0x8cc4[34]](_0xfda3x2e)) {
            _0xfda3x2d[_0x8cc4[37]]({
                "\x6B\x65\x79": _0xfda3x2e,
                "\x76\x61\x6C\x75\x65": _0xfda3x2c[_0xfda3x2e]
            })
        }
    };
    _0xfda3x2d[_0x8cc4[73]](function(_0xfda3x2f, _0xfda3x30) {
        return _0xfda3x30[_0x8cc4[72]] - _0xfda3x2f[_0x8cc4[72]]
    });
    return _0xfda3x2d
}

function isIgnored(username) {
    for (i = 0; i < ignoreBets[_0x8cc4[12]]; i++) {
        if (ignoreBets[i] == username) {
            return true
        } else {}
    }
}

function isPossibleHigh(username, currentMultiplier) {
    var _0xfda3x33 = null;
    currentMultiplier *= 100;
    if (currentMultiplier > (startCheckingForBonusAtMultiplier * 100) + 100) {
        _0xfda3x33 = _0x8cc4[43]
    } else {
        if (currentMultiplier > (startCheckingForBonusAtMultiplier * 100) + 30) {
            _0xfda3x33 = _0x8cc4[41]
        } else {
            if (currentMultiplier > startCheckingForBonusAtMultiplier * 100) {
                _0xfda3x33 = _0x8cc4[38]
            } else {
                return false
            }
        }
    };
    for (i = 0; i < previousBets[_0xfda3x33][_0x8cc4[12]]; i++) {
        if (previousBets[_0xfda3x33][i] == username) {
            previousBets[_0xfda3x33][i] = null;
            return true
        }
    }
}

function calculateHouseReturn(currentBet, _0xfda3x35) {
    var _0xfda3x36 = 0;
    _0xfda3x36 = 0.01 * ((100 * maxMultiplier) - currentBet) * (currentBet / (100 * maxMultiplier));
    houseReturnTotal = houseReturnTotal + _0xfda3x36
}

function wait(_0xfda3x38) {
    var _0xfda3x39 = new Date()[_0x8cc4[74]]();
    var _0xfda3x3a = _0xfda3x39;
    while (_0xfda3x3a < _0xfda3x39 + _0xfda3x38) {
        _0xfda3x3a = new Date()[_0x8cc4[74]]()
    }
}

function showStatistics() {
    log(_0x8cc4[75]);
    log(_0x8cc4[76] + totalLost);
    log(_0x8cc4[77] + totalWon);
    log(_0x8cc4[78]);
    log(_0x8cc4[53] + bonusTotal);
    log(_0x8cc4[54] + houseReturnTotal);
    log(_0x8cc4[78]);
    log(_0x8cc4[79]);
    log(endingMultipliers);
    log(_0x8cc4[75])
}

function httpGet(_0xfda3x3d) {
    var _0xfda3x3e = new XMLHttpRequest();
    _0xfda3x3e[_0x8cc4[81]](_0x8cc4[80], _0xfda3x3d, false);
    _0xfda3x3e[_0x8cc4[82]](null);
    return _0xfda3x3e[_0x8cc4[83]]
}
