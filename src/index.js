const { adjectives, authors, scientists } = require('./data')

const app = {
    print: () => {
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
    },

    compose: (random, adjective, author, scientist) => {
        return random % 2 == 0
            ? `${adjective}-${scientist}`
            : `${adjective}-${author}`
    },

    random: (max = 0) => {
        const random = Math.random()
        const flooredMax = Math.floor(Math.abs(max))
        return Math.floor(random * flooredMax)
    },
}

module.exports = app
