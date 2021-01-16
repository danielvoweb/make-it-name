const App = require('./index.js')

const expectedAdjective = 'adjective'
const expectedAuthor = 'author'
const expectedScientist = 'scientist'

let app, log
beforeEach(() => {
    app = new App()
    log = jest.fn()
})

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
    app.defaultRandom = 1
    const actual = app.compose(
        expectedAdjective,
        expectedAuthor,
        expectedScientist
    )
    expect(actual.output).toBe(`${expectedAdjective}-${expectedAuthor}`)
})

test('compose() should build name from adjective and scientist for even randoms', () => {
    app.defaultRandom = 2
    const actual = app.compose(
        expectedAdjective,
        expectedAuthor,
        expectedScientist
    )
    expect(actual.output).toBe(`${expectedAdjective}-${expectedScientist}`)
})

test('transform() should change all hyphens to underscores', () => {
    const input = 'adjective-adjective-author'
    const actual = app.transform(input)
    expect(actual.output).toBe('adjective_adjective_author')
})

test('transform() should handle undefined arguments', () => {
    const actual = app.transform(undefined)
    expect(actual.output).toBe('')
})

test('transform() should chain with compose()', () => {
    app.defaultRandom = 1
    const actual = app
        .compose(expectedAdjective, expectedAuthor, expectedScientist)
        .transform()

    expect(actual.output).toBe(`${expectedAdjective}_${expectedAuthor}`)
})

test('print() should log a random name with underscores with options', () => {
    const options = {
        u: true,
    }
    app = new App(options)
    app.print(log)
    expect(log.mock.calls[0][0]).toMatch(/\w+_\w+/)
})

test('print() should log a random name with hyphens with options', () => {
    const options = {
        u: false,
    }

    app = new App(options)
    app.print(log)
    expect(log.mock.calls[0][0]).toMatch(/\w+-\w+/)
})

test('print() should log a random name with hyphens by default', () => {
    app.print(log)
    expect(log.mock.calls[0][0]).toMatch(/\w+-\w+/)
})
