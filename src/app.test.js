const App = require('./index.js')

const expectedAdjective = 'adjective'
const expectedAuthor = 'author'
const expectedScientist = 'scientist'

const expectedCapitalizedAdjective = 'Adjective'
const expectedCapitalizedAuthor = 'Author'
const expectedCapitalizedScientist = 'Scientist'

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
    const input = `${expectedAdjective}-${expectedAdjective}-${expectedAuthor}`
    const actual = app.transform(input)
    expect(actual.output).toBe(
        `${expectedAdjective}_${expectedAdjective}_${expectedAuthor}`
    )
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

test('capitalize() should capitalize every word', () => {
    const input = `${expectedAdjective}-${expectedAdjective}-${expectedAuthor}`
    const actual = app.capitalize(input)
    expect(actual.output).toBe(
        `${expectedCapitalizedAdjective}-${expectedCapitalizedAdjective}-${expectedCapitalizedAuthor}`
    )
})

test('capitalize() should handle undefined', () => {
    const actual = app.capitalize(undefined)
    expect(actual.output).toBe('')
})

test('capitalize() should chain with compose() and transform()', () => {
    app.defaultRandom = 1
    const actual = app
        .compose(expectedAdjective, expectedAuthor, expectedScientist)
        .capitalize()
        .transform()

    expect(actual.output).toBe(
        `${expectedCapitalizedAdjective}_${expectedCapitalizedAuthor}`
    )
})

test('print() should log a random name with underscores with options', () => {
    const options = {
        u: true,
    }
    app = new App(options)
    app.print(log)
    expect(log.mock.calls[0][0]).toMatch(/\w+_\w+/)
})

test('print() should log a random name with hyphens and uppercase options', () => {
    const options = {
        c: true,
    }
    app = new App(options)
    app.print(log)
    expect(log.mock.calls[0][0]).toMatch(/[A-Z]\w+-[A-Z]\w+/)
})

test('print() should log random name with all options', () => {
    const options = {
        u: true,
        c: true,
    }
    app = new App(options)
    app.print(log)
    expect(log.mock.calls[0][0]).toMatch(/[A-Z]\w+_[A-Z]\w+/)
})

test('print() should log a random name with options', () => {
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
