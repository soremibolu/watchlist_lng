import { Colors, Lightning, Utils } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";
import { Icons } from "./Menu";
import { Data, updateBookmarks } from "../data/bookmarkedData";

interface CardTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Border: object;
    Card: object;
    Year: object;
    Title: object;
    Bookmark: { Icon: object };
  };
  items: Data;
}

interface CardSignalMap extends Lightning.Component.SignalMap {
  created(): void;
}

interface CardTypeConfig extends Lightning.Component.TypeConfig {
  SignalMapType: CardSignalMap;
}

export class Card
  extends Lightning.Component<CardTemplateSpec, CardTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<CardTemplateSpec>
{
  static override _template(): Lightning.Component.Template<CardTemplateSpec> {
    return {
      Container: {
        Card: {
          w: 350,
          h: 250,
        },
        Bookmark: {
          w: 45,
          h: 45,
          y: 10,
          x: this.width - 40 - 20,
          rect: true,
          color: Colors(Color.Black).alpha(0.8).get(),
          shader: {
            type: Lightning.shaders.RoundedRectangle,
            radius: 20,
          },
          Icon: {
            y: 13,
            x: 10,
            texture: Lightning.Tools.getSvgTexture(Icons.bookmark, 25, 18),
            color: Colors(Color.White).get(),
          },
        },
        Border: {
          w: 350 + 12,
          h: 250 + 12,
          x: -6,
          y: -6,
          rect: true,
          color: Colors("transparent").get(),
          shader: {
            type: Lightning.shaders.RoundedRectangle,
            radius: 10,
            stroke: 6,
            strokeColor: Colors(Color.White).alpha(0.001).get(),
          },
        },
        Year: {
          y: 270,
          w: 350,
          text: {
            text: "",
            textColor: Colors(Color.Focused).get(),
            fontSize: 15,
            fontFace: "Nunito",
          },
        },
        Title: {
          y: 300,
          text: {
            text: "",
            textColor: Colors(Color.White).get(),
            fontSize: 22,
            fontFace: "Nunito",
            wordWrapWidth: 300,
            maxLines: 1,
            maxLinesSuffix: "...",
          },
        },
      },
    };
  }

  isSelected = false;

  Border = this.getByRef("Container")!.getByRef("Border")!;

  _items!: Data;

  set items(cardItems: Data) {
    const { title, year, poster, bookmarkStatus } = cardItems;
    this._items = cardItems;

    this.isSelected = bookmarkStatus;
    this.changeBookmark(bookmarkStatus);

    this.patch({
      Container: {
        Card: {
          src: Utils.asset(poster),
        },
        Year: {
          text: {
            text: year.toString(),
          },
        },
        Title: {
          text: {
            text: title,
          },
        },
      },
    });
  }

  changeBookmark(status: boolean) {
    this.patch({
      Container: {
        Bookmark: {
          Icon: {
            color: Colors(status ? Color.Focused : Color.White).get(),
          },
        },
      },
    });
  }

  override _enable() {
    this.signal("created");
  }

  static get height() {
    return 310;
  }

  static get width() {
    return 350;
  }

  override _handleEnter() {
    this.isSelected = !this.isSelected;
    this.changeBookmark(this.isSelected);
    updateBookmarks(this._items);
  }

  override _focus() {
    this.Border.patch({
      shader: {
        strokeColor: Colors(Color.White).alpha(1).get(),
      },
    });
  }

  override _unfocus() {
    this.Border.patch({
      shader: {
        strokeColor: Colors(Color.White).alpha(0.001).get(),
      },
    });
  }
}
