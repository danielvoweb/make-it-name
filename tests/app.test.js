const data = require('../src/data.json')
const path = require('path')
const exec = require('child_process').exec

test('Should exit with code 0', async () => {
    const result = await cli(['mknm'])
    expect(result.code).toBe(0)
})

test('Should output a name with an adjective', async () => {
    const result = await cli(['mknm'])
    const firstWord = result.stdout.trim().split('-')[0]
    expect(data.adjectives).toContain(firstWord)
})

test('Should output a name with a scientist or author', async () => {
    const result = await cli(['mknm'])
    const secondWord = result.stdout.trim().split('-')[1]
    const scientistsAndAuthors = [...data.authors, ...data.scientists]
    expect(scientistsAndAuthors).toContain(secondWord)
})

test('Should output a random name', async () => {
    const result1 = await cli(['mknm'])
    const outputName1 = result1.stdout.trim()
    const result2 = await cli(['mknm'])
    const outputName2 = result2.stdout.trim()
    expect(outputName1).not.toBe(outputName2)
})

test('Should alliterate with -a option', async () => {
    const result = await cli(['mknm', '-a'])
    const outputNames = result.stdout.trim().split('-')
    const firstWordLetter = outputNames[0].substring(0, 1)
    const secondWordLetter = outputNames[1].substring(0, 1)
    expect(firstWordLetter).toBe(secondWordLetter)
})

test('Should alliterate with a value with -a option', async () => {
    const result = await cli(['mknm', '-a'])
    const outputNames = result.stdout.trim().split('-')
    const firstWord = outputNames[0]
    const secondWord = outputNames[1]
    expect(firstWord).not.toBe('undefined')
    expect(secondWord).not.toBe('undefined')
})

test('Should alliterate with -a option and value', async () => {
    const result = await cli(['mknm', '-a', 'd'])
    const outputNames = result.stdout.trim().split('-')
    const firstWordLetter = outputNames[0].substring(0, 1)
    const secondWordLetter = outputNames[1].substring(0, 1)
    expect(firstWordLetter).toBe('d')
    expect(firstWordLetter).toBe(secondWordLetter)
})

test('Should hyphentate output name as default', async () => {
    const result = await cli(['mknm'])
    const outputName = result.stdout.trim()
    expect(outputName).toContain('-')
})

test('Should use underscore with -u option', async () => {
    const result = await cli(['mknm', '-u'])
    const outputName = result.stdout.trim()
    expect(outputName).toContain('_')
})

test('Should capitalize first word with -c option', async () => {
    const result = await cli(['mknm', '-c'])
    const outputNames = result.stdout.trim().split('-')
    const firstWordLetter = outputNames[0].substring(0, 1)
    expect(firstWordLetter === firstWordLetter.toLowerCase()).toBe(false)
})

test('Should capitalize second word with -c option', async () => {
    const result = await cli(['mknm', '-c'])
    const outputNames = result.stdout.trim().split('-')
    const secondWordLetter = outputNames[1].substring(0, 1)
    expect(secondWordLetter === secondWordLetter.toLowerCase()).toBe(false)
})

function cli(args) {
    return new Promise((resolve) => {
        exec(
            `node ${path.resolve('bin/program.js')} ${args.join(' ')}`,
            { cwd: '.' },
            (error, stdout, stderr) => {
                resolve({
                    code: error && error.code ? error.code : 0,
                    error,
                    stdout,
                    stderr,
                })
            }
        )
    })
}
