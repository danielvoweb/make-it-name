const { adjectives, authors, scientists } = require('./data')

class App {
    constructor(options) {
        this.options = options || { u: false }
        this.output = ''
        this.defaultRandom = new Date().getTime()
        this.adjective = adjectives[this.random(adjectives.length)]
        this.author = authors[this.random(authors.length)]
        this.scientist = scientists[this.random(scientists.length)]
    }

    print(log) {
        this.compose(this.adjective, this.author, this.scientist)
        if (this.options.u) this.transform()
        log(this.output)
    }

    compose(adjective, author, scientist) {
        this.output =
            this.defaultRandom % 2 == 0
                ? `${adjective}-${scientist}`
                : `${adjective}-${author}`
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
