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
    app.adjective = expectedAdjective
    app.author = expectedAuthor
    app.scientist = expectedScientist
    app.setNoun()
    const actual = app.compose()
    expect(actual.output).toBe(`${expectedAdjective}-${expectedAuthor}`)
})

test('compose() should build name from adjective and scientist for even randoms', () => {
    app.defaultRandom = 2
    app.adjective = expectedAdjective
    app.author = expectedAuthor
    app.scientist = expectedScientist
    app.setNoun()
    const actual = app.compose()
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
    app.adjective = expectedAdjective
    app.author = expectedAuthor
    app.scientist = expectedScientist
    app.setNoun()
    const actual = app.compose().transform()

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
    app.adjective = expectedAdjective
    app.author = expectedAuthor
    app.scientist = expectedScientist
    app.setNoun()
    const actual = app.compose().capitalize().transform()

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
        a: true,
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

test('print() should set alliterative random names with options', () => {
    const options = {
        a: true,
    }

    app = new App(options)
    app.print(log)
    const actual = app.output.split('-')
    expect(actual[0].substring(0, 1)).toBe(actual[1].substring(0, 1))
})

test('setAlliterativeData() should set scientist from adjective', () => {
    const adjectives = ['abrupt', 'brainy', 'charming']
    const scientists = ['brahe']

    app = new App(null, adjectives, null, scientists)
    app.nounType = 'scientist'

    app.setAlliterativeData()

    expect(app.adjective).toBe(adjectives[1])
})

test('setAlliterativeData() should set author from adjective', () => {
    const adjectives = ['abrupt', 'brainy', 'charming']
    const authors = ['bronte']

    app = new App(null, adjectives, authors, null)
    app.nounType = 'author'

    app.setAlliterativeData()

    expect(app.adjective).toBe(adjectives[1])
})

test('alliterate() should filter by match', () => {
    const adjectives = ['abrupt', 'brainy', 'charming']
    const actual = app.alliterate('b', adjectives)
    expect(actual).toBe('brainy')
})

test('alliterate() should filter a collection by a matched character', () => {
    const collection = ['austen', 'bronte', 'christie']
    const actual = app.alliterate('b', collection)
    expect(actual).toBe(collection[1])
})

test('alliterate() should be undefined if no match', () => {
    const collection = ['austen', 'bronte', 'christie']
    const actual = app.alliterate('d', collection)
    expect(actual).toBe(undefined)
})

test('setNoun() should return author for odd random cases', () => {
    app.defaultRandom = 1
    app.setNoun()
    const actual = app.nounType
    expect(actual).toBe('author')
})

test('setNoun() should return scientist for even random cases', () => {
    app.defaultRandom = 2
    app.setNoun()
    const actual = app.nounType
    expect(actual).toBe('scientist')
})
