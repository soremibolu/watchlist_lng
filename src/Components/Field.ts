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
}

export class Field
  extends Lightning.Component<FieldTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<FieldTemplateSpec>
{
  static override _template(): Lightning.Component.Template<FieldTemplateSpec> {
    return {
      w: 350,
      h: 100,
      Container: {
        Field: {
          w: 350,
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

  set fieldText(text: string) {
    this.patch({
      Container: {
        Text: {
          text: { text },
        },
      },
    });
  }

  override _focus() {
    this.patch({
      Container: {
        Field: {
          color: Colors(Color.White).get(),
        },
        Text: {
          color: Colors(Color.Focused).get(),
        },
      },
    });
  }

  override _unfocus() {
    this.patch({
      Container: {
        Field: {
          color: Colors(Color.Focused).get(),
        },
        Text: {
          color: Colors(Color.White).get(),
        },
      },
    });
  }
}
