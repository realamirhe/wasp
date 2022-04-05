import {foo} from "./foo";

test("foo", () => {
    expect(foo(5)).toEqual("5");
})