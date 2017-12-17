import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../modules/bol-core/services/game.service';
import { GamePlayOutcomeMessage } from '../../modules/bol-core/messages/game-play-outcome-message';
import { NoelEventListener } from 'noel/dist/types/types';
import { NoelEventListenerManager } from 'noel/dist/types/event-listener-manager';
import { AuthService } from '../../modules/bol-core/services/auth.service';

@Component({
    selector: 'bol-game-route',
    templateUrl: './game-route.component.html',
    styleUrls: ['./game-route.component.scss']
})
export class GameRouteComponent implements OnInit, OnDestroy, AfterViewInit {

    private static readonly GAME_SLOT_CLASS = '.game-slot';

    private onGamePlayOutcomeMessageListener: NoelEventListenerManager;
    private bootstrapped;
    private opponentUserName: string;
    private userName: string;

    private invertedBoard: boolean;

    @ViewChild('opponentStorageSlotRef') opponentStorageSlotRef;
    @ViewChild('opponentSlotsRef') opponentSlotsRef;
    @ViewChild('userSlotsRef') userSlotsRef;
    @ViewChild('userStorageSlotRef') userStorageSlotRef;

    userSlots = new Array(6);


    constructor(private gameService: GameService,
                private authService: AuthService) {
    }

    ngOnInit() {
        //this.gameService.connectToCurrentGame();
        this.onGamePlayOutcomeMessageListener = this.gameService.onGamePlayOutcomeMessage(this.onGamePlayOutcomeMessage.bind(this));
    }

    ngOnDestroy() {
        this.onGamePlayOutcomeMessageListener.remove();
    }

    ngAfterViewInit() {
        this.bootstrapWithGamePlayOutcomeMessage({
            'gameFinished': false,
            'nextTurnHolderUserName': 'ane',
            'userAName': 'joe',
            'userBName': 'ane',
            'winnerUserName': null,
            'gameName': 'asd123',
            'slots': [{
                'id': 1,
                'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}],
                'empty': false
            }, {'id': 2, 'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}], 'empty': false}, {
                'id': 3,
                'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}],
                'empty': false
            }, {'id': 4, 'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}], 'empty': false}, {
                'id': 5,
                'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}],
                'empty': false
            }, {'id': 6, 'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}], 'empty': false}, {
                'id': 7,
                'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}],
                'empty': false
            }, {'id': 8, 'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}], 'empty': false}, {
                'id': 9,
                'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}],
                'empty': false
            }, {'id': 10, 'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}], 'empty': false}, {
                'id': 11,
                'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}],
                'empty': false
            }, {'id': 12, 'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}], 'empty': false}, {
                'id': 13,
                'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}],
                'empty': false
            }, {'id': 14, 'stones': [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}], 'empty': false}]
        });
    }

    onGamePlayOutcomeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        if (!this.bootstrapped) {
            this.bootstrapWithGamePlayOutcomeMessage(gamePlayOutcomeMessage);
            this.bootstrapped = true;
        }
    }

    private bootstrapWithGamePlayOutcomeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        const userStorageSlotElement = this.userStorageSlotRef.nativeElement;
        let userSlotsElements = this.userSlotsRef.nativeElement.querySelectorAll(GameRouteComponent.GAME_SLOT_CLASS);

        userSlotsElements = [].slice.call(userSlotsElements);
        userSlotsElements.push(userStorageSlotElement);

        const opponentStorageSlotElement = this.opponentStorageSlotRef.nativeElement;
        let opponentSlotsElements = this.opponentSlotsRef.nativeElement.querySelectorAll(GameRouteComponent.GAME_SLOT_CLASS);

        opponentSlotsElements = [].slice.call(opponentSlotsElements).reverse();
        opponentSlotsElements.push(opponentStorageSlotElement);

        const user = this.authService.getLoggedInUser();
        const userName = user.getName();
        const isUserB = userName === gamePlayOutcomeMessage.userBName;

        const boardSlots = {};

        let slots = [];

        if (isUserB) {
            slots = slots.concat(opponentSlotsElements, userSlotsElements);
        } else {
            slots = slots.concat(userSlotsElements, opponentSlotsElements);
        }

        const slotsDictionary = {};

        slots.forEach((slot, index) => {
            slotsDictionary[index + 1] = slot;
        });
    }

}
