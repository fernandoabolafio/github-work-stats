import * as dh from "./data_handler";
describe("test data handler service", () => {
    const DATASET1 = [
        { a: { b: "1", c: { d: "2" } } },
        { a: { b: "1", c: { d: "2" } } },
        { a: { b: "2", c: { d: "2" } } },
        { a: { b: "3", c: { d: "2" } } }
    ];
    const DATASET2 = [
        { a: "1", b: "any" },
        { a: "4" },
        { a: "1", d: "any"},
        { d: "hey" }
    ];
    const DATASET3 = [
        { a: { b: "1", c: { d: "3" } } },
        { a: { b: "1", c: { d: "2" } } },
        { a: { b: "2", c: { d: "2" } } },
        { a: { b: "3", c: { d: "2" } } }
    ];
    it("aggregate data by a given key", () => {
        const data = DATASET2;
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
        const data = DATASET1;
        expect(dh.aggregateByDeepKey(["a", "b"])(data)).toEqual(
            {
                1: [data[0], data[1]],
                2: [data[2]],
                3: [data[3]]
            }
        );
    })

    it("creates a filter from an array of keys an array of valid values", () => {
        const data = DATASET1;
        const keys = ["a", "b"];
        let validValues = ["2", "3"];
        let filter = dh.createBasicFilter(keys, validValues);
        expect(filter(data)).toEqual([
            data[2],
            data[3]
        ]);

        validValues = ["1"];
        filter = dh.createBasicFilter(keys, validValues);
        expect(filter(data)).toEqual([
            data[0],
            data[1]
        ]);
    })

    it("creates a custom filter from a provided function", () => {
        const data = DATASET2;
        let filter = dh.createCustomFilter((v) => typeof(v) === "string", true);
        expect(filter(data)).toEqual([]);
        filter = dh.createCustomFilter((v, i) => i === 1, true);
        expect(filter(data)).toEqual([data[1]]);
        filter = dh.createCustomFilter(v => v, false);
        expect(filter(data)).toEqual(data);
    })

    it("apply multiple filters to an array of items", () => {
        const data = DATASET3;
        const filter1 = dh.createBasicFilter(["a", "b"], ["1"]);
        const filter2 = dh.createBasicFilter(["a", "c", "d"], ["3"]);
        const filters = dh.applyFilters([filter1, filter2]);
        expect(filters(DATASET3)).toEqual([
            data[0]
        ]);
    })
})