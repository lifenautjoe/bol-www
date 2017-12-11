import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './games-route.routes';
import { RouterModule } from '@angular/router';
import { GamesRouteComponent } from './games-route.component';
import { SearchResultGameComponent } from './components/search-result-game/search-result-game.component';
import { SearchGamePipe } from './pipes/search-game.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        GamesRouteComponent,
        SearchResultGameComponent,
        SearchGamePipe
    ]
})
export class GamesRouteModule {

}
