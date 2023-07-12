import { Colors, Lightning } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";
import Button from "./button";
import { Field } from "./Field";
import Keyboard from "./Keyboard/Keyboard";

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
}

interface FormSignalMap extends Lightning.Component.SignalMap {
  focusOnKeyboard(): void;
}

interface FormTypeConfig extends Lightning.Component.TypeConfig {
  SignalMapType: FormSignalMap;
}

export class Form
  extends Lightning.Component<FormTemplateSpec, FormTypeConfig>
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
          y: 25,
          x: 20,
          text: {
            text: "Update Movie",
            textColor: Colors(Color.Focused).get(),
            fontSize: 22,
            fontFace: "Nunito",
          },
        },
        Fields: {
          y: 50,
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
          y: 50,
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
      },
    };
  }

  Title = this.getByRef("Container")!.getByRef("Fields")!.getByRef("Title");

  Year = this.getByRef("Container")!.getByRef("Fields")!.getByRef("Year");

  Save = this.getByRef("Container")!.getByRef("Buttons")!.getByRef("Save");

  Cancel = this.getByRef("Container")!.getByRef("Buttons")!.getByRef("Cancel");

  static get height() {
    return 310;
  }

  static get width() {
    return 350;
  }

  formIndex = 0;
  buttonIndex = 0;

  section: "keyboard" | "form" | "buttons" = "form";

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

  override _handleUp() {
    if (this.section === "keyboard") {
      this.section = "buttons";
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
