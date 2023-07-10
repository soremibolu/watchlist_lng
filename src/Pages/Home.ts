import { Lightning, Colors } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";
import Grid from "../Components/Grid";
import data from "../data/items";
import { Data, getAllBookmarks } from "../data/bookmarkedData";

interface HomeTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Title: object;
    Grid: typeof Grid;
  };
}

export interface HomeTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export type CardProps = {
  title: string;
  year: number;
  poster: string;
  photo_width: number;
  photo_height: number;
};

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
        },
      },
    };
  }

  Grid = this.getByRef("Container")!.getByRef("Grid")!;

  override _active() {
    this.Grid.items = [];
    // Router.reload()
    const mainData: Data[] = [];

    data.forEach((item) => {
      const items: Data = { ...item, bookmarkStatus: false, type: "add" };
      getAllBookmarks().forEach((bookmarked) => {
        if (items.title === bookmarked.title) {
          items.bookmarkStatus = true;
        }
      });
      mainData.push(items);
    });
    this.Grid.items = mainData;
  }

  override _detach() {
    this.Grid.items = [];
  }

  override _getFocused() {
    return this.Grid;
  }
}
