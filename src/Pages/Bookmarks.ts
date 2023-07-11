import { Lightning, Colors } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";
import Grid from "../Components/Grid";
import { Data, getAllBookmarks } from "../data/bookmarkedData";

interface BookmarksTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Title: object;
    Grid: typeof Grid;
  };
}

export interface BookmarksTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export type CardProps = {
  title: string;
  year: number;
  poster: string;
  photo_width: number;
  photo_height: number;
};

export default class Bookmarks
  extends Lightning.Component<BookmarksTemplateSpec, BookmarksTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<BookmarksTemplateSpec>
{
  static override _template(): Lightning.Component.Template<BookmarksTemplateSpec> {
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
            text: "Bookmarks",
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
    const mainData: Data[] = [];

    getAllBookmarks().forEach((item) => {
      const items: Data = { ...item, bookmarkStatus: true };
      mainData.push(items);
    });
    this.Grid.items = mainData;
  }

  override _getFocused() {
    return this.Grid;
  }
}
