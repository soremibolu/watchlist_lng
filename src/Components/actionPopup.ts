import { Colors, Lightning } from "@lightningjs/sdk";
import { bookmarks$, Data, updateBookmarks } from "../data/bookmarkedData";
import { Color } from "../Utils/colors";
import Button from "./button";

interface PopupTemplateSpec extends Lightning.Component.TemplateSpec {
  Popup: {
    Text: object;
    Buttons: {
      Bookmark: typeof Button;
      Edit: typeof Button;
    };
  };
  items: Data;
}

interface PopupSignalMap extends Lightning.Component.SignalMap {
  closePopup(): void;
}

interface PopupTypeConfig extends Lightning.Component.TypeConfig {
  SignalMapType: PopupSignalMap;
}

export class Popup
  extends Lightning.Component<PopupTemplateSpec, PopupTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<PopupTemplateSpec>
{
  static override _template(): Lightning.Component.Template<PopupTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      flex: {
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      Popup: {
        w: 700,
        h: 400,
        rect: true,
        color: Colors(Color.Primary).get(),
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 10,
        },
        flex: {
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        Text: {
          text: {
            text: " would you like to remove dawad fwea fw af adf  sdv sdz cw",
            textColor: Colors(Color.White).get(),
            fontSize: 22,
            wordWrapWidth: 400,
            wordWrap: true,
            fontFace: "Nunito",
            textAlign: "center",
          },
        },
        Buttons: {
          w: (w) => w,
          h: 38,
          y: 30,
          flex: {
            direction: "row",
            alignItems: "center",
            justifyContent: "center",
          },
          Bookmark: {
            type: Button,
            label: "Bookmark",
          },
          Edit: {
            x: 20,
            type: Button,
            label: "Edit",
          },
        },
      },
    };
  }

  static get height() {
    return 310;
  }

  static get width() {
    return 350;
  }

  focusedButton: "Edit" | "Bookmark" = "Bookmark";

  override _getFocused() {
    if (this.focusedButton === "Bookmark") {
      return this.getByRef("Popup")?.getByRef("Buttons")?.getByRef("Bookmark");
    }
    return this.getByRef("Popup")?.getByRef("Buttons")?.getByRef("Edit");
  }

  override _handleLeft() {
    if (this.focusedButton === "Edit") {
      this.focusedButton = "Bookmark";
    }
  }

  override _handleRight() {
    if (this.focusedButton === "Bookmark") {
      this.focusedButton = "Edit";
    }
  }

  _items!: Data;

  set items(data: Data) {
    this._items = data;
    let isBookmarked = false;
    bookmarks$().subscribe((item) => {
      const filteredBookmarks = item.filter((object) => {
        return object.title === data.title;
      });
      isBookmarked = filteredBookmarks.length > 0;
    });

    this.patch({
      Popup: {
        Text: {
          text: {
            text: data.title,
          },
        },
        Buttons: {
          Bookmark: {
            label: `${isBookmarked ? "Remove from" : "Add to"} Bookmarks`,
          },
        },
      },
    });
  }

  override _handleEnter() {
    if (this.focusedButton === "Bookmark") {
      updateBookmarks(this._items);
    } else {
      //
    }
    this.signal("closePopup");
  }
}
