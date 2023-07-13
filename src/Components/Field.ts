import { Colors, Lightning } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";

interface FieldTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Field: {
      Fields: object;
    };
    Text: object;
  };
  fieldText: string;
  isFocused: boolean;
}

export class Field
  extends Lightning.Component<FieldTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<FieldTemplateSpec>
{
  static override _template(): Lightning.Component.Template<FieldTemplateSpec> {
    return {
      w: 650,
      h: 100,
      Container: {
        Field: {
          w: 650,
          h: 60,
          rect: true,
          color: Colors(Color.Focused).get(),
          shader: {
            type: Lightning.shaders.RoundedRectangle,
            radius: 10,
          },
        },
        Text: {
          y: 15,
          x: 20,
          text: {
            text: "",
            textColor: Colors(Color.White).get(),
            fontSize: 22,
            fontFace: "Nunito",
          },
        },
      },
    };
  }

  shouldStayFocused = false;

  set fieldText(text: string) {
    this.patch({
      Container: {
        Text: {
          text: { text },
        },
      },
    });
  }

  makeFieldFocused(status: boolean) {
    this.patch({
      Container: {
        Field: {
          color: Colors(status ? Color.White : Color.Focused).get(),
        },
        Text: {
          color: Colors(status ? Color.Focused : Color.White).get(),
        },
      },
    });
  }

  set isFocused(status: boolean) {
    this.makeFieldFocused(status);
    this.shouldStayFocused = status;
  }

  override _focus() {
    this.makeFieldFocused(true);
  }

  override _unfocus() {
    this.makeFieldFocused(this.shouldStayFocused);
    this.shouldStayFocused = false;
  }
}
