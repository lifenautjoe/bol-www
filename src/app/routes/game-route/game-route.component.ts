import { Component, OnInit } from '@angular/core';
import { GameService } from '../../modules/bol-core/services/game.service';

@Component({
    selector: 'bol-game-route',
    templateUrl: './game-route.component.html',
    styleUrls: ['./game-route.component.scss']
})
export class GameRouteComponent implements OnInit {

    constructor(private gameService: GameService) {
    }

    ngOnInit() {
        this.gameService.connectToCurrentGame();
    }

}
