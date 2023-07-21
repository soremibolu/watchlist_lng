import { Router } from "@lightningjs/sdk";
import { updateMainData } from "../data/bookmarkedData";
import { Form as MainForm } from "./Form";

export class Form extends MainForm {
  override _handleEnter() {
    if (this.section === "form") {
      if (this.formIndex === 0) {
        this.Title.isFocused = true;
      } else {
        this.Year.isFocused = true;
      }
      this.section = "keyboard";
    }

    if (this.section === "buttons") {
      if (this.buttonIndex === 0 && (this.title || this.year)) {
        const newData = [
          ...this.data,
          {
            title: this.title,
            year: this.year,
            poster: "",
            bookmarkStatus: false,
          },
        ];

        updateMainData(newData);
      }

      Router.navigate("home");
    }
  }
}
