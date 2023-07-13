import { Lightning, Colors, Router } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";
import { Form } from "../Components/Form";

interface EditTemplateSpec extends Lightning.Component.TemplateSpec {
  Container: {
    Form: typeof Form;
  };
}

export interface EditTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true;
}

export default class Edit
  extends Lightning.Component<EditTemplateSpec, EditTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<EditTemplateSpec>
{
  static override _template(): Lightning.Component.Template<EditTemplateSpec> {
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
