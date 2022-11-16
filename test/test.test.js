const { add } = require("../src/add");

test('Testing adding 2 number', () => {
    expect(add(2,3)).toBe(6)
})

