import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../modules/bol-core/models/game';
import * as Bluebird from 'bluebird';
import { GamesService } from '../../modules/bol-core/services/games.service';

@Component({
    selector: 'bol-games-route',
    templateUrl: './games-route.component.html',
    styleUrls: ['./games-route.component.scss']
})
export class GamesRouteComponent implements OnInit, OnDestroy {
    private static readonly REFRESH_GAMES_INTERVAL = 5000;
    // We filter the games list by this string
    gamesFilter: string;
    games: Array<Game>;
    gamesRefreshInProgress: boolean;

    private intervalHandle;

    constructor(private gamesService: GamesService) {

    }

    ngOnInit() {
        this.refreshGames().then(() => {
            this.intervalHandle = setInterval(() => {
                this.refreshGames();
            }, GamesRouteComponent.REFRESH_GAMES_INTERVAL);
        })
    }

    ngOnDestroy() {
        if (this.intervalHandle) clearInterval(this.intervalHandle);
    }

    refreshGames(): Bluebird<void> {
        this.gamesRefreshInProgress = true;
        return this.getGames().then((games) => {
            this.games = games;
        }).finally(() => {
            this.gamesRefreshInProgress = false;
        });
    }

    getGames(): Bluebird<Array<Game>> {
        return this.gamesService.getGames();
    }

}
