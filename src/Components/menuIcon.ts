import { Lightning, Colors } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";

interface MenuTemplateSpec extends Lightning.Component.TemplateSpec {
  Icon: object;
  icon: { icon: string; width: number; height: number };
}

export default class Menu
  extends Lightning.Component<MenuTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<MenuTemplateSpec>
{
  static override _template(): Lightning.Component.Template<MenuTemplateSpec> {
    return {
      Icon: {
        color: Colors(Color.Focused).get(),
      },
    };
  }

  set icon(iconData: { icon: string; width: number; height: number }) {
    const { icon, width, height } = iconData;
    this.getByRef("Icon")!.texture = Lightning.Tools.getSvgTexture(icon, width, height);
  }

  override _focus() {
    this.getByRef("Icon")!.color = Colors(Color.White).get();
  }

  override _unfocus() {
    this.getByRef("Icon")!.color = Colors(Color.Focused).get();
  }
}
