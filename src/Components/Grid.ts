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
        flex: {
          direction: "row",
          wrap: true,
        },
      },
    };
  }

  ItemsContainer = this.getByRef("ItemsContainer")!;

  numberOfColumns = 4;

  offset = 20;

  index = 0;

  numOfItems = 0;

  get currentRow() {
    return Math.trunc(this.index / this.numberOfColumns) + 1;
  }

  get currentColumn() {
    const lastItemNumberOnCurrentRow = this.currentRow * this.numberOfColumns;
    return (
      this.numberOfColumns - (lastItemNumberOnCurrentRow - (this.index + 1))
    );
  }

  get totalNumberOfRows() {
    return Math.ceil(this.numOfItems / this.numberOfColumns);
  }

  cardWidth = Card.width + this.offset;
  cardHeight = Card.height + 100;

  set items(data: Data[]) {
    this.ItemsContainer.children = [];
    if (data.length === 0) {
      this.ItemsContainer.children = [];
      Router.focusWidget("Menu");
    } else {
      Router.focusPage();
      data.forEach((items: Data) => {
        const card = this.stage.element<typeof Card>({
          type: Card,
          w: this.cardWidth,
          h: this.cardHeight,
          items,
          passSignals: {
            action: "action",
          },
        });
        this.ItemsContainer?.childList.add(card);
      });

      this.index = this.index > data.length - 1 ? data.length - 1 : this.index;
    }

    this.numOfItems = this.ItemsContainer.children.length;
  }

  get activeItem() {
    return this.ItemsContainer.children[this.index] as Lightning.Component;
  }

  override _getFocused() {
    return this.activeItem;
  }

  _animateToSelected(direction: number) {
    let to = -this.activeItem.finalY;

    if (direction <= -1 || direction >= 1) {
      if (this.currentRow >= 3) {
        to += 1080 - (1080 - (this.cardHeight + this.offset + 2 * 57));
      } else {
        to = 0;
      }
    }

    this.ItemsContainer.setSmooth("y", to, {
      timingFunction: "ease-out",
      duration: 0.5,
    });
  }

  select(direction: number) {
    this.index += direction;
    this._animateToSelected(direction);
  }

  override _handleLeft() {
    if (this.index > 0 && this.currentColumn > 1) {
      this.select(-1);
      return true;
    } else {
      Router.focusWidget("Menu");
    }
    return false;
  }

  override _handleRight() {
    if (this.index !== this.numOfItems - 1 && this.numOfItems > 0) {
      this.select(1);
      return true;
    }
    return false;
  }

  override _handleUp() {
    if (this.index + 1 > this.numberOfColumns && this.numOfItems > 0) {
      this.select(-this.numberOfColumns);
    }
  }

  override _handleDown() {
    // Row before final row
    if (this.currentRow === this.totalNumberOfRows - 1) {
      const toLastItemFromCurrent = this.numOfItems - 1 - this.index;

      // Move to last item if there are no items below active item
      if (this.numberOfColumns > this.numOfItems - this.index - 2) {
        // if (this.currentColumn > this.numOfItems % this.numberOfColumns) {
        this.select(toLastItemFromCurrent);
      }
    }

    if (
      this.index < this.numOfItems - (this.numOfItems % this.numberOfColumns) &&
      this.index < this.numOfItems - this.numberOfColumns
    ) {
      this.select(this.numberOfColumns);
    }
    return true;
  }
}
