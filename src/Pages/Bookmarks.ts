import { Lightning, Colors } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";
import Grid from "../Components/Grid";
import { bookmarks$, Data } from "../data/bookmarkedData";
import { Popup } from "../Components/actionPopup";

interface BookmarksTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Title: object;
    Grid: typeof Grid;
  };
  Popup: typeof Popup;
}

export interface BookmarksTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export default class Bookmarks
  extends Lightning.Component<BookmarksTemplateSpec, BookmarksTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<BookmarksTemplateSpec>
{
  static override _template(): Lightning.Component.Template<BookmarksTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      rect: true,
      color: Colors(Color.Background).get(),
      Container: {
        x: 130 + 2 * 50,
        Title: {
          y: 50,
          text: {
            text: "Bookmarks",
            textColor: Colors(Color.White).get(),
            fontSize: 36,
            fontFace: "Nunito",
          },
        },
        Grid: {
          type: Grid,
          y: 150,
          signals: {
            action: "action",
          },
        },
      },
      Popup: {
        type: Popup,
        signals: {
          closePopup: "closePopup",
        },
        visible: false,
      },
    };
  }

  Grid = this.getByRef("Container")!.getByRef("Grid")!;

  performAction = false;

  override _active() {
    bookmarks$().subscribe((items) => {
      this.Grid.items = [];
      const mainData = items.map((data) => {
        return { ...data, bookmarkStatus: true };
      });
      this.Grid.patch({
        items: mainData,
      });
    });
  }

  action(info: Data) {
    this.performAction = true;
    this.patch({
      Popup: {
        items: info,
        visible: true,
      },
    });
  }

  closePopup() {
    this.performAction = false;
    this.patch({
      Popup: {
        visible: false,
      },
    });
  }

  override _getFocused() {
    if (this.performAction) {
      return this.getByRef("Popup");
    }
    return this.Grid;
  }
}
