import { Lightning, Utils, Router } from "@lightningjs/sdk";
import routes from "./Router";
import Menu from "./Components/Menu";
import { getColors } from "./Utils/colors";

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
  Widgets: {
    Menu: typeof Menu;
  };
}

export type CardProps = {
  title: string;
  year: number;
  poster: string;
  photo_width: number;
  photo_height: number;
};

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object;
}

export class App
  extends Router.App
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  readonly Background = this.getByRef("Background")!;

  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      ...super._template(),
      w: 1920,
      h: 1080,
      Background: {
        w: 1920,
        h: 1080,
      },
      Widgets: {
        Menu: {
          type: Menu,
          rect: true,
        },
      },
    };
  }

  /**
   * Retrieve the colors for this app to use with the Color plugin:
   * @see https://lightningjs.io/docs/#/lightning-sdk-reference/plugins/colors?id=loading-on-boot
   */
  static colors() {
    return getColors();
  }

  override async _setup() {
    super._setup();
    Router.startRouter(routes, this);
  }

  override _init(): void {
    Router.focusWidget("Menu");
  }

  static getFonts() {
    return [
      {
        family: "Nunito",
        url: Utils.asset("fonts/Nunito.ttf"),
      },
    ];
  }
}
