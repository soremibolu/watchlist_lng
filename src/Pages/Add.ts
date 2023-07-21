import { Lightning, Colors, Router } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";
import { Form } from "../Components/AddForm";

interface AddTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Form: typeof Form;
  };
}

export interface AddTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export default class Add
  extends Lightning.Component<AddTemplateSpec, AddTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<AddTemplateSpec>
{
  static override _template(): Lightning.Component.Template<AddTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      rect: true,
      color: Colors(Color.Background).get(),
      Container: {
        w: 1920,
        h: 1080,
        flex: {
          direction: "column",
          alignItems: "center",
        },
        Form: {
          y: 200,
          type: Form,
        },
      },
    };
  }

  Form = this.getByRef("Container")!.getByRef("Form")!;

  override _active() {
    Router.focusPage();
    this.Form.movieTitle = this.params?.title || "";
  }

  override _getFocused() {
    return this.Form;
  }
}
