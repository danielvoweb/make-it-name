const { adjectives, authors, scientists } = require('./data')

// TODO: take in args

class App {
    print() {
        const adjective = adjectives[app.random(adjectives.length)]
        const author = authors[app.random(authors.length)]
        const scientist = scientists[app.random(scientists.length)]

        console.log(
            app.compose(
                app.random(100),
                adjective,
                author,
                scientist,
                scientist
            )
        )
    }

    // TODO: test around compose

    compose(random, adjective, author, scientist) {
        this.output =
            random % 2 == 0
                ? `${adjective}-${scientist}`
                : `${adjective}-${author}`
        return this
    }

    transform(input) {
        this.output = (input || this.output).replace('-', '_')
        return this
    }

    random(max = 0) {
        const random = Math.random()
        const flooredMax = Math.floor(Math.abs(max))
        return Math.floor(random * flooredMax)
    }
}

module.exports = App
