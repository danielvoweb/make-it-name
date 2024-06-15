const { adjectives, authors, scientists } = require('./data')

class App {
    constructor(options, _adjectives, _authors, _scientists) {
        this.options = options || { u: false, c: false }
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

    setAlliterativeData(value) {
        if (value) {
            this.scientist = this.alliterate(value, this.scientists)
            this.author = this.alliterate(value, this.authors)
            this.adjective = this.alliterate(value, this.adjectives)
            return
        }

        const noun = {
            scientist: () => {
                this.scientist = this.scientists[
                    this.random(this.scientists.length)
                ]

                return this.scientist
            },
            author: () => {
                this.author = this.authors[this.random(this.authors.length)]

                return this.author
            },
        }[this.nounType]()
        const match = noun.substring(0, 1)
        this.adjective = this.alliterate(match, this.adjectives)
    }

    setNoun() {
        this.nounType = { 0: 'scientist', 1: 'author' }[this.defaultRandom % 2]
    }

    alliterate(match, collection) {
        const filteredCollection = collection.filter(
            (x) => x.substring(0, 1) == match
        )
        return filteredCollection[this.random(filteredCollection.length)]
    }

    print(log) {
        this.setNoun()
        this.options.a
            ? this.setAlliterativeData(this.options.a)
            : this.setData()
        this.compose()
        if (this.options.c) this.capitalize()
        if (this.options.u) this.transform()
        log(this.output)
    }

    compose() {
        this.output = {
            scientist: `${this.adjective}-${this.scientist}`,
            author: `${this.adjective}-${this.author}`,
        }[this.nounType]
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
