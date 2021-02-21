const { adjectives, authors, scientists } = require('./data')

class App {
    constructor(options, _adjectives, _authors, _scientists) {
        this.options = options || { u: false, c: false, a: false }
        this.output = ''
        this.defaultRandom = new Date().getTime()
        this.adjectives = _adjectives || adjectives
        this.authors = _authors || authors
        this.scientists = _scientists || scientists
    }

    setData() {
        this.adjective = this.adjectives[this.random(this.adjectives.length)]
        this.author = this.authors[this.random(this.authors.length)]
        this.scientist = this.scientists[this.random(this.scientists.length)]
    }

    setAlliterativeData() {
        this.adjective = this.adjectives[this.random(this.adjectives.length)]
        const match = this.adjective.substring(0, 1)
        this.author = this.alliterate(match, this.authors)
        this.scientist = this.alliterate(match, this.scientists)
    }

    setNoun() {
        return (this.nounType = ['author', 'scientist'](
            this.defaultRandom % 2 == 0
        ))
    }

    alliterate(match, collection) {
        const filteredCollection = collection.filter(
            (x) => x.substring(0, 1) == match
        )
        return filteredCollection[this.random(filteredCollection.length)]
    }

    print(log) {
        this.options.a ? this.setAlliterativeData() : this.setData()
        this.compose()
        if (this.options.c) this.capitalize()
        if (this.options.u) this.transform()
        log(this.output)
    }

    compose() {
        this.output =
            this.defaultRandom % 2 == 0
                ? `${this.adjective}-${this.scientist}`
                : `${this.adjective}-${this.author}`
        return this
    }

    capitalize(input) {
        this.output = (input || this.output)
            .split('-')
            .map((x) => (x ? x[0].toUpperCase() + x.substring(1) : ''))
            .join('-')

        return this
    }

    transform(input) {
        this.output = (input || this.output).replace(/-/gi, '_')
        return this
    }

    random(max = 0) {
        const random = Math.random()
        const flooredMax = Math.floor(Math.abs(max))
        return Math.floor(random * flooredMax)
    }
}

module.exports = App
