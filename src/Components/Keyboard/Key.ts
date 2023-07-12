import { Color } from "../../Utils/colors";
import { Colors, Lightning } from "@lightningjs/sdk";

export interface KeyTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
  Border: object;
  Container: {
    Icon: object;
    Title: object;
  };
  icon: string;
  width: number;
  title: string;
}

export class Key
  extends Lightning.Component<KeyTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<KeyTemplateSpec>
{
  Container = this.getByRef("Container")!;

  Background = this.getByRef("Background")!;

  TitleText = this.getByRef("Container")!.getByRef("Title")!;

  Icon = this.getByRef("Container")!.getByRef("Icon")!;

  static override _template(): Lightning.Component.Template<KeyTemplateSpec> {
    return {
      w: this.width,
      h: this.height,
      rect: true,
      color: Colors("transparent").get(),
      Background: {
        color: Colors(Color.Focused).get(),
        rect: true,
        w: (w) => w,
        h: (h) => h,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: this.radius,
        },
      },
      Container: {
        w: (w) => w,
        h: (h) => h,
        flex: {
          justifyContent: "center",
          alignItems: "center",
        },
        Icon: {
          color: Colors(Color.White).get(),
          texture: {},
        },
        Title: {
          text: {
            text: "",
            fontSize: 20,
            fontFace: "Nunito",
            textColor: Colors(Color.White).get(),
          },
        },
      },
    };
  }

  static get width() {
    return 58;
  }

  static get height() {
    return 56;
  }

  static get radius() {
    return 4;
  }

  titleText = "";

  set title(value: string) {
    this.titleText = value;
    this.Container.patch({
      Title: { text: { text: value } },
    });
  }

  set icon(value: string) {
    this.Container.patch({
      Icon: { texture: Lightning.Tools.getSvgTexture(value, 69, 30) },
    });
  }

  set width(width: number) {
    this.patch({
      Background: { w: width },
      Container: { w: width },
    });
  }

  override _focus() {
    this.Background.color = Colors(Color.White).get();
    if (this.TitleText && this.TitleText.text) {
      this.TitleText.text.textColor = Colors(Color.Focused).get();
    }
    if (this.Icon && this.Icon.texture) {
      this.Icon.color = Colors(Color.Focused).get();
    }
  }

  override _unfocus() {
    this.Background.color = Colors(Color.Focused).get();
    if (this.TitleText && this.TitleText.text) {
      this.TitleText.text.textColor = Colors(Color.White).get();
    }
    if (this.Icon && this.Icon.texture) {
      this.Icon.color = Colors(Color.White).get();
    }
  }
}
