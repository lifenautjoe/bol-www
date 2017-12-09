/**
 * @author Joel Hernandez <lifenautjoe@gmail.com>
 */
import { BaseModel } from './base-model';

export class Game extends BaseModel<GameData> {
    private name: string;

    constructor(data: GameData) {
        super(data);
    }

    getName(): string {
        return this.name;
    }
}

export interface GameData {
    name: string;
}
