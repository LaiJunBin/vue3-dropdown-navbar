import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import App from "./App.vue";

describe("App", () => {
  test("every class have 'dd-nav-' prefix and it properly position.", () => {
    const app = mount(App);

    expect(
      [...app.html().matchAll(/class="([^"]+)"/g)]
        .map((x) => x[1].split(" "))
        .flat()
        .filter((x) => {
          if (x.includes(":")) {
            return x.lastIndexOf(":") > x.indexOf("dd-nav-");
          } else {
            return !x.includes("dd-nav-");
          }
        })
    ).toStrictEqual([]);
  });
});
