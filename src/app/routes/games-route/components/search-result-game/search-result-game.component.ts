import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../../modules/bol-core/models/game';
import { GamesService } from '../../../../modules/bol-core/services/games.service';
import { LoggerFactoryService, Logolous } from '../../../../modules/bol-core/services/logger-factory.service';
import { BolCoreEventsService } from '../../../../modules/bol-core/services/bol-core-events.service';

@Component({
    selector: 'bol-search-result-game',
    templateUrl: './search-result-game.component.html',
    styleUrls: ['./search-result-game.component.scss']
})
export class SearchResultGameComponent implements OnInit {

    @Input()
    game: Game;
    joinGameInProgress: boolean;

    private logger: Logolous;

    constructor(private loggerFactoryService: LoggerFactoryService,
                private bolCoreEventsService: BolCoreEventsService,
                private gamesService: GamesService) {
        this.logger = loggerFactoryService.make('SearchResultGameComponent');
    }

    ngOnInit() {

    }

    onWantsToJoinGame(game: Game) {
        this.joinGameInProgress = true;
        return this.gamesService.joinGame(game).then(() => {
            this.logger.info(`Joined game with name ${game.getName()}! Sending to game route!`);
            this.bolCoreEventsService.emitUserJoinedGame(game);
        }).catch((err) => {
            this.logger.error(`User couldn't join game with name ${game.getName()} with error`, err);
        }).finally(() => {
            this.joinGameInProgress = false;
        })
    }

}
