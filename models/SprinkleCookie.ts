import {Cookie} from './Cookie';
import {Colours} from './Colours.enum';

export class SprinkleCookie extends Cookie {
  sprinkleColour: Colours;

  constructor(name: string, sprinkleColour: Colours){
    super(name);
    this.sprinkleColour = sprinkleColour;
    this.colour = Colours.Brown;
    this.chocChipNum = 0;
  }
}