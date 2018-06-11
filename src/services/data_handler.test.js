import * as dh from "./data_handler";
describe("test data handler service", () => {
    it("aggregate data by a given key", () => {
        const data = [
            { a: "1", b: "any" },
            { a: "4" },
            { a: "1", d: "any"},
            { d: "hey" }
        ];
        expect(dh.aggregateBy("a")(data)).toEqual(
            {
                1: [
                    data[0],
                    data[2]
                ],
                4: [
                    data[1]
                ]
            }
        );
    })

    it("aggregates deeply by an array of nested keys", () => {
        const data = [
            { a: { b: "1", c: { d: "2" } } },
            { a: { b: "1", c: { d: "2" } } },
            { a: { b: "2", c: { d: "2" } } },
            { a: { b: "3", c: { d: "2" } } }
        ];
        expect(dh.aggregateByDeepKey(["a", "b"])(data)).toEqual(
            {
                1: [data[0], data[1]],
                2: [data[2]],
                3: [data[3]]
            }
        );
    })
})