const app = require('./index.js')

test('random() should return between zero and max', () => {
    const max = 3
    const actual = app.random(max)
    expect(actual).toBeLessThan(max)
    expect(actual).toBeGreaterThanOrEqual(0)
})

test('random() should handle zero', () => {
    const max = 0
    const actual = app.random(max)
    expect(actual).toBe(0)
})

test('random() should handle negatives', () => {
    const max = -2
    const actual = app.random(max)
    expect(actual).toBeLessThan(Math.abs(max))
    expect(actual).toBeGreaterThan(max)
    expect(actual).toBeGreaterThanOrEqual(0)
})

test('random() should handle undefined', () => {
    const max = undefined
    const actual = app.random(max)
    expect(actual).toEqual(0)
})

test('compose() should build name from adjective and authors for odd randoms', () => {
    const expectedAdjective = 'adjective'
    const expectedAuthor = 'author'
    const expectedScientist = 'scientist'
    const random = 1
    const actual = app.compose(
        random,
        expectedAdjective,
        expectedAuthor,
        expectedScientist
    )
    expect(actual).toEqual(`${expectedAdjective}-${expectedAuthor}`)
})

test('compose() should build name from adjective and scientist for even randoms', () => {
    const expectedAdjective = 'adjective'
    const expectedAuthor = 'author'
    const expectedScientist = 'scientist'
    const random = 2
    const actual = app.compose(
        random,
        expectedAdjective,
        expectedAuthor,
        expectedScientist
    )
    expect(actual).toEqual(`${expectedAdjective}-${expectedScientist}`)
})
