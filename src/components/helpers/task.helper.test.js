import { getAllTaskFilterBuilder } from "./task.helper.js";


describe("Testing Get ALL Task Filter Query Builder", () => { 
    test("Sending partial only partial allowed parameters, 1 allowed and 1 not allowed", () => { 
        const query = { 
            _id: "sagar",
            priority: "medium"
        };

        const filters = getAllTaskFilterBuilder(query);
        const expectedResult = {
            priority: "medium" 
        };

        expect(filters).toMatchObject(expectedResult);
    });
})

