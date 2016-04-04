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
var maxMultiplier = 1.57;
//Should it not snipe a bonus, what would you like to cash out on.
var maxPeopleLeft = 15;
//How many people should be left before we force cash out. Either this or the maxMultiplier will be triggered if the bonus snipe is not triggered
var ignoreBets = 0; // This is a advance setting
//How many bets should we ignore to ignore all those people using scripts or betting small? We want smart bets only. 3 is a good number
var startCheckingForBonusAtMultiplier = 1.20;
//At which multiplier (current payout) should we start looking for a bonus
var highBet = 4000;
//What makes a bet a "high" bet. This is the number that separates low bets from high bets. This number is divided by two on ever loss.
//The higher this number is, the more likely it is too lose a game. The lower, the less likely. However this effects your overall outcome in the future

/** Loss streak settings **/
var lossStreakSettingsEnabled = true;
//Disables or enabled loss streak settings
var maxLossStreak = 3;
//How many times would you like to lose in a row before resetting back to base bet. 1 to never double bet
var lossBetMultiplier = 4;
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


/** -------------- Globals -------------- **/
var username = engine.getUsername();
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
var startingBalance = engine.getBalance();
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
    'high': [],
    'med': [],
    'low': [],
    'tiny': []
};

var personal = {
    'currentGameIndex': 0
};
/** -------------- Globals -------------- **/


/** -------------- Events -------------- **/

engine.on('game_starting', function(info)
{
    log('=================================');
    log('Game Starting');
    log('=================================');

    betting = false;

    if(waitBeforeBet > 0) {
        if (engine.lastGamePlay() == 'LOST')
        {
            log('[Holding] Bot is currently holding before betting again');
            lostPrevious = true;
            breakAmount++;
            if(breakAmount >= waitBeforeBet)
            {
                breakAmount = 0;
            }
            else
            {
                return;
            }
        }
        else if(breakAmount > 0)
        {
            if(breakAmount >= waitBeforeBet)
            {
                breakAmount = 0;
            }
            else
            {
                log('[Holding] Bot is current holding before betting again Games left to hold: ' + (waitBeforeBet - breakAmount));
                breakAmount++;
                return;
            }
        }
    }

    if(stopOnMajorLoss)
    {
        if(startingBalance % engine.getBalance() >= 2)
        {
            log('Not going to bet because you have lost more than 50% of your balance');
            return;
        }
    }

    if(useRandomizer)
    {
        log('Current is being randomized, current bet: ' + currentBet);
        var rand = randomMultipliers[Math.floor(Math.random() * randomMultipliers.length)];
        currentBet = currentBet * rand;
        log('Current bet was randomized, new bet amount: ' + currentBet);
    }

    //Console how many bits were wagered last game
    log('Total Bits wagered last game: ' + totalBitsLastGame);

    if (engine.lastGamePlay() == 'LOST' || lostPrevious)
    {
        totalLost++;
        //currentHighBet = currentHighBet / 2; // This will give us a better chance at not losing the next round going for a lower bonus
        if(lossStreakSettingsEnabled)
        {
            log('Last game was a loss, betting with different variables');
            currentBet = currentBet * lossBetMultiplier;
            streakLoss++;
            if(lossStreakSettingsEnabled) {
                if(streakLoss >= maxLossStreak + 1)
                {
                    if(holdUntilWin)
                    {
                        log('** Hold until win enabled, continuing betting');
                        currentBet = currentBet / lossBetMultiplier;
                    }
                    else
                    {
                        log('** Lost too many games in a row, resetting bets');
                        return;
                    }
                }
            }
        }
    }
    else
    {

        log('Bot is resetting loss information for bets because it won');
        totalWon++;
        currentBet = baseBet;
        streakLoss = 0;
        currentHighBet = highBet;
    }



    //Wait before placing bet to get correct index range
    //wait(info.time_till_start - 2500);

    //Need to make sure this is false or it will multiply again
    lostPrevious = false;


    if (currentBet <= engine.getBalance()) {
        if (maxWinEnabled) {
            if (streakWin > maxWinStreak) {
                if (breakAmount > winBreakAmount) {
                    log('Bot is still on win streak cool down, ignoring bet. Last cool down game');
                    streakWin = 0;
                }
                else {
                    log("Bot is still on a win streak cool down, ignoring bet. More than 1 games left on cooldown");
                    breakAmount++;
                }
            }
            else {
                log('** Placing normal bet for ' + currentBet);
                engine.placeBet(currentBet * 100, Math.round(currentMultiplier * 100), false);
                betting = true;

            }
        }
        else
        {
            log('** Placing normal bet for ' + currentBet);
            engine.placeBet(currentBet * 100, Math.round(currentMultiplier * 100), false);
            betting = true;
        }
    }
});

engine.on('player_bet', function(data)
{
    personal.currentGameIndex = null;
    totalBetsCurrent++;
    if(data['username'] != username)
    {
        currentBetOrder[data['username']] = data;
    }
    else
    {
        personal.currentGameIndex = data['username'].index;
        log('[Your bet] ' + 'Current index for game: ' + personal.currentGameIndex);
    }

});

engine.on('game_started', function(data)
{
    log('=================================');
    log('Game has started');
    log('=================================');

    previousBetTotal = 0;
    var bonusThisRound = 0;

    //Order the current bets in order from highest to greatest
    var previousGameBets = data;
    currentBetOrder = sortCurrentPlayers(currentBetOrder);

    //Get previous game bets
    for (var key in previousGameBets) {
        if (previousGameBets.hasOwnProperty(key)) {
            previousBets[key] = previousGameBets[key]['bet'];
            totalBitsLastGame = totalBitsLastGame  + previousGameBets[key]['bet'];
            betAmount = previousGameBets[key]['bet'] / 100;
            bonusLastRound = previousGameBets[key]['bonus'] /100;
            if(previousGameBets[key]['username'] == username)
            {
                bonusTotal = bonusTotal + bonusLastRound;
            }
            else
            {
                if(betAmount >= currentHighBet)
                {
                    previousBets.high.push(previousGameBets[key]['username']);
                    log('[Data] Adding ' + previousGameBets[key]['username'] + ' to high list because of high bet: ' + betAmount)
                }
                else if(betAmount >= (currentHighBet / 2))
                {
                    previousBets.med.push(previousGameBets[key]['username']);
                    log('[Data] Adding ' + previousGameBets[key]['username'] + ' to medium list because of medium bet: ' + betAmount)
                }
                else if(betAmount >= (currentHighBet / 4))
                {
                    previousBets.low.push(previousGameBets[key]['username']);
                    log('[Data] Adding ' + previousGameBets[key]['username'] + ' to low list because of low bet: ' + betAmount)
                }
                else
                {
                    previousBets.tiny.push(previousGameBets[key]['username']);
                    log('[Data] Adding ' + previousGameBets[key]['username'] + ' to tiny list because of tiny bet: ' + betAmount)
                }
            }
        }
    }

    calculateHouseReturn(currentBet, lastStoppedMultiplier);


    log('=================================');
    log('Users lists this round:');
    log('=================================');
    log('Highest Users:');
    log(previousBets.high);
    log('Medium Users: ');
    log(previousBets.med);
    log('Low Users: ');
    log(previousBets.low);
    log('Tiny Users:' );
    log(previousBets.tiny);
    log('=================================');
    log('Your bonus last round: ' + bonusThisRound);
    log('Your current bonus total: ' + bonusTotal);
    log('Current house expected return: ' + houseReturnTotal);
    log('=================================');


    //Reset any variables
    bonusLastRound = 0;

});

engine.on('cashed_out', function(resp)
{
    if(!cashedOut) {

        totalCashedCurrent++;
        cashedUser = null;
        var currentPayout = engine.getCurrentPayout();

        log('[Count] Current cashed out: ' + totalCashedCurrent + ' | Total Bets: ' + totalBetsCurrent + ' | Total left to cash out: ' + (totalBetsCurrent - totalCashedCurrent));

       if(totalBetsCurrent - totalCashedCurrent <= maxPeopleLeft)
        {
            wait(100); //We must wait before cashing out because of small bug with bustabit
            log('[Cash out] ' + '** Cashed out with '+ maxPeopleLeft +' people left');
            engine.cashOut();
        }

        cashedUser = resp.username;

        if (isPossibleHigh(cashedUser, currentPayout))
        {
            if(currentPayout > startCheckingForBonusAtMultiplier)
            {
                engine.cashOut();
                log('[Cash out] ' + '** Cashed out with ' + cashedUser);
                cashedOut = true;
            }
            else
            {
                log('[Ignored] ' + resp.username + ' because his the bet was not over ' + startCheckingForBonusAtMultiplier);
            }
        }
        else {
            log('[Ignored] ' + resp.username + ' because his previous bet was too low');
        }
    }
});

engine.on('game_crash', function(data)
{

    log('=================================');
    log('Game has crashed');
    log('=================================');

    lastStoppedMultiplier = engine.getCurrentPayout();
    endingMultipliers.push(data);

    //Reset the current variables to prevent them from being wrong.
    currentBetOrder = [];
    currentIgnoreAmount = 0;
    cashedOut = false;
    totalBetsCurrent = 0;
    totalCashedCurrent = 0;
    previousBets = {
        'high': [],
        'med': [],
        'low': [],
        'tiny': []
    };
});

engine.on('disconnect', function()
{
});


/** -------------- Custom Functions -------------- **/

/**
 * Log a message to the console, this is simply to shorten the call
 *
 * @param message
 */
function log(message)
{
    if(debug) {
        console.log(message);
    }
}

/**
 * Search array of bets for specific index
 *
 * @param username
 * @returns {*}
 */
function findIndexBet(username)
{
    for (var i=0; i < currentBetOrder.length; i++) {
        if (currentBetOrder[i].key === username) {
            return currentBetOrder[i];
        }
    }
}

/**
 * Check to see if contains index
 *
 * **/
function isIndexIn(term, array)
{
    for (var i=0; i < array.length; i++) {
        if (array[i]['value']['index'] === term) {
            return array[i];
        }
    }
}

/**
 * This will sort the current players in order from highest bet to lowest bet
 *
 * @param obj
 * @returns {Array}
 */
function sortCurrentPlayers(obj) {
    var arr = [];
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) {
        return b.value - a.value;
    });
    return arr;
}

/**
 * Check to see if a user is on the ignored list
 *
 * @param username
 * @returns {boolean}
 */
function isIgnored(username)
{
    for (i = 0; i < ignoreBets.length; i++) {
        if(ignoreBets[i] == username)
        {
            return true;
        }
        else
        {

        }
    }
}

/**
 * Check to see if a user might be a high better
 *
 * @param username
 * @returns {boolean}
 * @param currentMultiplier
 */
function isPossibleHigh(username, currentMultiplier)
{
    var listType = null;
    currentMultiplier *= 100;

    if(currentMultiplier > (startCheckingForBonusAtMultiplier * 100) + 100)
    {
        listType = 'low';
    }
    else if(currentMultiplier > (startCheckingForBonusAtMultiplier * 100) + 30)
    {
        listType = 'med';
    }
    else if(currentMultiplier > startCheckingForBonusAtMultiplier * 100)
    {
        listType = 'high'
    }
    else
    {
        return false;
    }

    for (i = 0; i < previousBets[listType].length; i++) {
        if(previousBets[listType][i] == username)
        {
            previousBets[listType][i] = null;
            return true;
        }
    }
}

/**
 * Calculates weather we are truley making a profit by overcoming house odds
 *
 * @param currentBet
 * @param multiplier
 */
function calculateHouseReturn(currentBet, multiplier)
{
    var ecxpectedHouseReturn = 0;
    ecxpectedHouseReturn  = .01 * ((100 * maxMultiplier) - currentBet) * (currentBet / (100 * maxMultiplier));
    houseReturnTotal = houseReturnTotal + ecxpectedHouseReturn;
}

/**
 * Wait x ms before continuing execution
 *
 * @param ms
 */
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

/**
 * Show statistics on your current session
 */
function showStatistics()
{
    log('============= Current Statistics ====================');
    log('Total Losses: ' + totalLost);
    log('Total Won: ' + totalWon);
    log('================================================');
    log('Your current bonus total: ' + bonusTotal);
    log('Current house expected return: ' + houseReturnTotal);
    log('================================================');
    log('Ending multipliers:');
    log(endingMultipliers);
    log('============= Current Statistics ====================');
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
