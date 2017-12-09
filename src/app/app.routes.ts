export const ROUTES = [
  {
    path: 'auth', loadChildren: './routes/auth-route/auth-route.module#AuthRouteModule'
  },
  {
    path: 'games', loadChildren: './routes/games-route/games-route.module#GamesRouteModule'
  },
  {
    path: 'game', loadChildren: './routes/game-route/game-route.module#GameRouteModule'
  }
];
