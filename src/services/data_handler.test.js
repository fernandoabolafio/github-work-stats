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
})