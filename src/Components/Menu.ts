/* eslint-disable no-unused-vars */
import { Lightning, Colors, Router } from "@lightningjs/sdk";
import { Color } from "../Utils/colors";
import MenuIcon from "./menuIcon";

interface MenuTemplateSpec extends Lightning.Component.TemplateSpec {
  Recommended: typeof MenuIcon;
  Bookmarks: typeof MenuIcon;
  Add: typeof MenuIcon;
}

export enum Icons {
  bookmark = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIGZpbGw9IiNGRkZGRkYiIGhlaWdodD0iODAwcHgiIHdpZHRoPSI4MDBweCIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgCgkgdmlld0JveD0iMCAwIDQ2My4yNzMgNDYzLjI3MyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTMxMy44NzQsMEgxNDkuMzk4Yy0xNi4yOCwwLTI5LjQ3NywxMy4xOTctMjkuNDc2LDI5LjQ3N3Y0MjIuMzY4YzAsNC41MzIsMi42NzksOC42MzcsNi44MjcsMTAuNDYxCgkJCWM0LjE0OCwxLjgyNCw4Ljk4MywxLjAyNSwxMi4zMjQtMi4wMzhsODQuODQtNzcuNzg4YzQuMzY5LTQuMDA2LDExLjA3Ni00LjAwNiwxNS40NDYsMGw4NC44NCw3Ny43ODgKCQkJYzMuMzQsMy4wNjMsOC4xNzUsMy44NjMsMTIuMzI0LDIuMDM4czYuODI3LTUuOTI5LDYuODI3LTEwLjQ2MWgwLjAwMVYyOS40NzdDMzQzLjM1MSwxMy4xOTcsMzMwLjE1NCwwLDMxMy44NzQsMHoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4=",
  recommended = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij48cGF0aCBkPSJNMCAwaDE1LjIwNnYxNS4yMDZIMHoiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNMTYuNzk0IDBIMzJ2MTUuMjA2SDE2Ljc5NHoiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNMCAxNi43OTRoMTUuMjA2VjMySDB6IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTE2Ljc5NCAxNi43OTRIMzJWMzJIMTYuNzk0eiIgZmlsbD0iI0ZGRkZGRiIvPjwvc3ZnPg==",
  add = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxkZWZzPgo8L2RlZnM+CjxnIHN0eWxlPSJzdHJva2U6IG5vbmU7IHN0cm9rZS13aWR0aDogMDsgc3Ryb2tlLWRhc2hhcnJheTogbm9uZTsgc3Ryb2tlLWxpbmVjYXA6IGJ1dHQ7IHN0cm9rZS1saW5lam9pbjogbWl0ZXI7IHN0cm9rZS1taXRlcmxpbWl0OiAxMDsgZmlsbDogbm9uZTsgZmlsbC1ydWxlOiBub256ZXJvOyBvcGFjaXR5OiAxOyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS40MDY1OTM0MDY1OTM0MDE2IDEuNDA2NTkzNDA2NTkzNDAxNikgc2NhbGUoMi44MSAyLjgxKSIgPgoJPHBhdGggZD0iTSA1OC45MjEgOTAgSCAzMS4wNzkgYyAtMS4xNTUgMCAtMi4wOTIgLTAuOTM2IC0yLjA5MiAtMi4wOTIgViAyLjA5MiBDIDI4Ljk4OCAwLjkzNiAyOS45MjQgMCAzMS4wNzkgMCBoIDI3Ljg0MSBjIDEuMTU1IDAgMi4wOTIgMC45MzYgMi4wOTIgMi4wOTIgdiA4NS44MTcgQyA2MS4wMTIgODkuMDY0IDYwLjA3NiA5MCA1OC45MjEgOTAgeiIgc3R5bGU9InN0cm9rZTogbm9uZTsgc3Ryb2tlLXdpZHRoOiAxOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWxpbmVqb2luOiBtaXRlcjsgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOyBmaWxsOiByZ2IoMjU1LDI1NSwyNTUpOyBmaWxsLXJ1bGU6IG5vbnplcm87IG9wYWNpdHk6IDE7IiB0cmFuc2Zvcm09IiBtYXRyaXgoMSAwIDAgMSAwIDApICIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgoJPHBhdGggZD0iTSA5MCAzMS4wNzkgdiAyNy44NDEgYyAwIDEuMTU1IC0wLjkzNiAyLjA5MiAtMi4wOTIgMi4wOTIgSCAyLjA5MiBDIDAuOTM2IDYxLjAxMiAwIDYwLjA3NiAwIDU4LjkyMSBWIDMxLjA3OSBjIDAgLTEuMTU1IDAuOTM2IC0yLjA5MiAyLjA5MiAtMi4wOTIgaCA4NS44MTcgQyA4OS4wNjQgMjguOTg4IDkwIDI5LjkyNCA5MCAzMS4wNzkgeiIgc3R5bGU9InN0cm9rZTogbm9uZTsgc3Ryb2tlLXdpZHRoOiAxOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWxpbmVqb2luOiBtaXRlcjsgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOyBmaWxsOiByZ2IoMjU1LDI1NSwyNTUpOyBmaWxsLXJ1bGU6IG5vbnplcm87IG9wYWNpdHk6IDE7IiB0cmFuc2Zvcm09IiBtYXRyaXgoMSAwIDAgMSAwIDApICIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgo8L2c+Cjwvc3ZnPg==",
}

export default class Menu
  extends Lightning.Component<MenuTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<MenuTemplateSpec>
{
  static override _template(): Lightning.Component.Template<MenuTemplateSpec> {
    return {
      y: 50,
      x: 50,
      w: 130,
      h: 980,
      rect: true,
      color: Colors(Color.Primary).get(),
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 30,
      },
      Recommended: {
        type: MenuIcon,
        icon: {
          icon: Icons.recommended,
          width: 30,
          height: 30,
        },
        y: 50,
        x: 50,
      },
      Bookmarks: {
        type: MenuIcon,
        icon: {
          icon: Icons.bookmark,
          width: 50,
          height: 27,
        },
        y: 120,
        x: 40,
      },
      Add: {
        type: MenuIcon,
        icon: {
          icon: Icons.add,
          width: 35,
          height: 30,
        },
        y: 187,
        x: 48,
      },
    };
  }

  focused!: "recommended" | "bookmark" | "add";

  Recommended = this.getByRef("Recommended")!;

  Bookmarks = this.getByRef("Bookmarks")!;

  override _firstActive() {
    this.focused = "recommended";
  }

  override _handleUp() {
    if (this.focused === "add") {
      this.focused = "bookmark";
    } else if (this.focused === "bookmark") {
      this.focused = "recommended";
    }
  }

  override _handleDown() {
    if (this.focused === "recommended") {
      this.focused = "bookmark";
    } else if (this.focused === "bookmark") {
      this.focused = "add";
    }
  }

  override _handleEnter() {
    if (this.focused === "recommended") {
      Router.navigate("home");
    } else if (this.focused === "bookmark") {
      Router.navigate("bookmarks");
    } else {
      Router.navigate("add");
    }
  }

  override _handleRight() {
    Router.focusPage();
  }

  override _handleLeft() {
    return true;
  }

  override _getFocused() {
    if (this.focused === "bookmark") {
      return this.getByRef("Bookmarks");
    }
    if (this.focused === "add") {
      return this.getByRef("Add");
    }

    return this.getByRef("Recommended");
  }
}
