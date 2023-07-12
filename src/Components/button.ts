import { Lightning, Colors } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";

interface ButtonTemplateSpec extends Lightning.Component.TemplateSpec {
  Text: object;
  label: string;
}

interface ButtonSignalMap extends Lightning.Component.SignalMap {
  clearAll(): void;
}

interface ButtonTypeConfig extends Lightning.Component.TypeConfig {
  SignalMapType: ButtonSignalMap;
}

export default class Button
  extends Lightning.Component<ButtonTemplateSpec, ButtonTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<ButtonTemplateSpec>
{
  static override _template(): Lightning.Component.Template<ButtonTemplateSpec> {
    return {
      w: 300,
      h: 38,
      rect: true,
      color: Colors(Color.Focused).get(),
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 4,
      },
      flex: {
        justifyContent: "center",
        alignItems: "center",
      },

      Text: {
        y: 2,
        text: {
          text: "",
          textColor: Colors(Color.White).get(),
          fontFace: "Nunito",
          fontSize: 22,
          lineHeight: 22,
          paddingLeft: Button.padding,
          paddingRight: Button.padding,
          verticalAlign: "middle",
          wordWrapWidth: 500,
        },
      },
    };
  }

  Text = this.getByRef("Text")!;

  _navigateTo?: string = "";

  static get padding() {
    return 24;
  }

  set label(label: string) {
    this.Text.text!.text = label;
  }

  override _focus() {
    this.patch({
      color: Colors(Color.White).get(),
      Text: {
        color: Colors(Color.Focused).get(),
      },
    });
  }

  override _unfocus() {
    this.patch({
      color: Colors(Color.Focused).get(),
      Text: {
        color: Colors(Color.White).get(),
      },
    });
  }
}
