import { Lightning, Colors } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";
import Grid from "../Components/Grid";
import { allData$, bookmarks$, Data } from "../data/bookmarkedData";
import { combineLatest } from "rxjs";
import { Popup } from "../Components/actionPopup";

interface HomeTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Title: object;
    Grid: typeof Grid;
  };
  Popup: typeof Popup;
}

export interface HomeTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export default class Home
  extends Lightning.Component<HomeTemplateSpec, HomeTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<HomeTemplateSpec>
{
  static override _template(): Lightning.Component.Template<HomeTemplateSpec> {
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
            text: "Recommended",
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
    combineLatest([allData$(), bookmarks$()]).subscribe(([data, bookmarks]) => {
      const mainData = data.map((item) => {
        const items: Data = { ...item, bookmarkStatus: false };
        bookmarks.forEach((item) => {
          if (items.title === item.title) {
            items.bookmarkStatus = true;
          }
        });
        return items;
      });

      this.Grid.items = mainData;
    });
    this._refocus();
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
