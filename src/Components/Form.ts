import { Colors, Lightning, Router } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";
import Button from "./button";
import { Field } from "./Field";
import Keyboard from "./Keyboard/Keyboard";
import {
  bookmarks$,
  Data,
  updateMainData,
  allData$,
} from "../data/bookmarkedData";

interface FormTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Text: object;
    Fields: {
      Year: typeof Field;
      Title: typeof Field;
    };
    Buttons: {
      Save: typeof Button;
      Cancel: typeof Button;
    };
  };
  Keyboard: typeof Keyboard;
  movieTitle: string;
}

export class Form
  extends Lightning.Component<FormTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<FormTemplateSpec>
{
  static override _template(): Lightning.Component.Template<FormTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      Container: {
        w: 800,
        h: 500,
        x: (1920 - 500) / 2 - 125,
        rect: true,
        color: Colors(Color.Primary).get(),
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 10,
        },
        flex: {
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
        },
        Text: {
          text: {
            text: "Update Movie",
            textColor: Colors(Color.Focused).get(),
            fontSize: 22,
            fontFace: "Nunito",
          },
        },
        Fields: {
          y: 20,
          w: (w) => w,
          h: (h) => h / 2,
          flex: {
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
          },
          Title: {
            type: Field,
            fieldText: "Title",
          },
          Year: {
            y: 10,
            type: Field,
            fieldText: "Year",
          },
        },

        Buttons: {
          w: (w) => w,
          h: 38,
          y: 20,
          flex: {
            direction: "row",
            alignItems: "center",
            justifyContent: "center",
          },
          Save: {
            type: Button,
            label: "Save",
          },
          Cancel: {
            x: 20,
            type: Button,
            label: "Cancel",
          },
        },
      },
      Keyboard: {
        type: Keyboard,
        signals: {
          keyPressed: "keyPressed",
          spacePressed: "spacePressed",
          backPressed: "backPressed",
        },
      },
    };
  }

  formIndex = 0;

  buttonIndex = 0;

  idTitle = "";

  title = "";

  year = "";

  section: "keyboard" | "form" | "buttons" = "form";

  Title = this.getByRef("Container")!.getByRef("Fields")!.getByRef("Title")!;

  Year = this.getByRef("Container")!.getByRef("Fields")!.getByRef("Year")!;

  Save = this.getByRef("Container")!.getByRef("Buttons")!.getByRef("Save")!;

  Cancel = this.getByRef("Container")!.getByRef("Buttons")!.getByRef("Cancel")!;

  data: Data[] = [];

  static get height() {
    return 310;
  }

  static get width() {
    return 350;
  }

  set movieTitle(label: string) {
    this.title = label;
    this.idTitle = label;

    const filteredData = this.data.filter((item) => item.title === label);

    if (filteredData.length > 0 && filteredData[0]) {
      this.year = filteredData[0].year;
      this.patch({
        Container: {
          Fields: {
            Title: {
              fieldText: this.title,
            },
            Year: {
              fieldText: this.year,
            },
          },
        },
      });
    }
  }

  override _active() {
    allData$().subscribe((mainData) => {
      this.data = mainData;
    });
  }

  getFocusedSec(section: "keyboard" | "form" | "buttons") {
    if (section === "keyboard") return this.getByRef("Keyboard");

    if (section === "form") {
      if (this.formIndex === 0) {
        return this.Title;
      }
      return this.Year;
    }

    if (section === "buttons") {
      if (this.buttonIndex === 0) {
        return this.Save;
      }
      return this.Cancel;
    }
  }

  override _getFocused() {
    return this.getFocusedSec(this.section);
  }

  override _handleEnter() {
    if (this.section === "form") {
      if (this.formIndex === 0) {
        this.Title.isFocused = true;
      } else {
        this.Year.isFocused = true;
      }
      this.section = "keyboard";
    }

    if (this.section === "buttons") {
      if (this.buttonIndex === 0) {
        let bookMarkData: Data[] = [];
        bookmarks$().subscribe((data) => {
          bookMarkData = data;
        });

        const checkifMatch = this.data.filter(
          (data) => data.title === this.title && data.year === this.year
        );

        if (checkifMatch.length === 0) {
          const newData = this.data.map((item) => {
            const itemData = { ...item, bookmarkStatus: false };
            bookMarkData.forEach((bookmark) => {
              if (bookmark.title === item.title) {
                itemData.bookmarkStatus = true;
              }
            });

            if (itemData.title === this.idTitle) {
              itemData.title = this.title;
              itemData.year = this.year;
            }
            return itemData;
          });
          updateMainData(newData);
        }
      }
      Router.navigate("home");
    }
  }

  keyPressed(key: string) {
    if (this.formIndex === 0) {
      this.title = `${this.title}${key}`;
      this.Title.fieldText = this.title;
    } else {
      this.year = `${this.year}${key}`;
      this.Year.fieldText = this.year;
    }
  }

  spacePressed() {
    if (this.formIndex === 0) {
      this.title = `${this.title} `;
      this.Title.fieldText = this.title;
    } else {
      this.year = `${this.year} `;
      this.Year.fieldText = this.year;
    }
  }

  backPressed() {
    if (this.formIndex === 0) {
      this.title = this.title.substring(0, this.title.length - 1);
      this.Title.fieldText = this.title;
    } else {
      this.year = this.year.substring(0, this.year.length - 1);
      this.Year.fieldText = this.year;
    }
  }

  override _handleUp() {
    if (this.section === "keyboard") {
      this.section = "buttons";
      this.Title.isFocused = false;
      this.Year.isFocused = false;
      return true;
    }

    if (this.section === "form") {
      if (this.formIndex === 1) {
        this.formIndex = 0;
      }
      return true;
    }

    if (this.section === "buttons") {
      this.section = "form";
      this.formIndex = 1;
      return true;
    }
  }

  override _handleDown() {
    if (this.section === "form") {
      if (this.formIndex === 1) {
        this.section = "buttons";
      } else {
        this.formIndex = 1;
      }
      return true;
    }
    return true;
  }

  override _handleLeft() {
    if (this.section === "buttons" && this.buttonIndex === 1) {
      this.buttonIndex = 0;
    }
  }
  override _handleRight() {
    if (this.section === "buttons" && this.buttonIndex === 0) {
      this.buttonIndex = 1;
    }
  }
}
