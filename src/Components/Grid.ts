import { Lightning, Router } from "@lightningjs/sdk";
import { Card } from "../Components/Card";
import type { Data } from "../data/bookmarkedData";

interface GridTemplateSpec extends Lightning.Component.TemplateSpec {
  ItemsContainer: object;
  Card: typeof Card;
  items: Data[];
}

export default class Grid
  extends Lightning.Component<GridTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<GridTemplateSpec>
{
  static override _template(): Lightning.Component.Template<GridTemplateSpec> {
    return {
      ItemsContainer: {
        h: 1080,
        w: 1700,
      },
    };
  }

  ItemsContainer = this.getByRef("ItemsContainer")!;

  numberOfColumns = 4;

  offset = 20;

  index = 0;

  numOfItems = this.ItemsContainer.children.length;

  get currentRow() {
    return Math.trunc(this.index / this.numberOfColumns) + 1;
  }

  get currentColumn() {
    const lastItemNumberOnCurrentRow = this.currentRow * this.numberOfColumns;
    return this.numberOfColumns - (lastItemNumberOnCurrentRow - (this.index + 1));
  }

  set items(data: Data[]) {
    if (data.length === 0) {
      this.ItemsContainer.children = [];
      Router.focusWidget("Menu");
    } else {
      Router.focusPage();
      data.forEach((items: Data, index: number) => {
        const cardWidth = Card.width + this.offset;
        const cardHeight = Card.height + 100;

        const card = this.stage.element<typeof Card>({
          type: Card,
          items,
          passSignals: {
            action: "action",
          },
          x:
            (index >= this.numberOfColumns ? index - this.numberOfColumns : index) * cardWidth +
            this.offset / 2,
          y: index >= this.numberOfColumns ? cardHeight : 0,
        });
        this.ItemsContainer?.childList.add(card);
      });

      this.index = this.index > data.length - 1 ? data.length - 1 : this.index;
    }
  }

  override _getFocused() {
    return this.ItemsContainer.children[this.index] as Lightning.Component;
  }

  override _handleLeft() {
    if (this.index > 0 && this.currentColumn > 1) {
      this.index -= 1;
      return true;
    } else {
      Router.focusWidget("Menu");
    }
    return false;
  }

  override _handleRight() {
    if (this.index + 1 !== this.ItemsContainer.children.length || this.numOfItems > 0) {
      this.index += 1;
      return true;
    }
    return false;
  }

  override _handleUp() {
    if (this.index + 1 > this.numberOfColumns || this.numOfItems > 0) {
      this.index -= this.numberOfColumns;
    }
  }

  override _handleDown() {
    if (this.index < this.numberOfColumns || this.numOfItems > 0) {
      this.index += this.numberOfColumns;
    }
  }
}
