import Meme from "./meme";
import Pirce from "./price";

export default interface MemeWithHistory extends Meme {
  prices: Pirce[];
}