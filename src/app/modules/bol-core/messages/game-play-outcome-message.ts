/**
 * @author Joel Hernandez <lifenautjoe@gmail.com>
 */

export interface GamePlayOutcomeMessage {
    gameFinished: boolean;
    gameName: string;
    nextTurnHolderUserName: string;
    winnerUserName?: string;
    userAName: string;
    userBName: string;
    slots: Array<GamePlayOutcomeMessageSlot>;
}

interface GamePlayOutcomeMessageSlot {
    id: number;
    stones: Array<GamePlayOutcomeMessageSlotStone>
    empty: boolean;
}

interface GamePlayOutcomeMessageSlotStone {
    id: number;
}
