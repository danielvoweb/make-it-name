const path = require('path')
const exec = require('child_process').exec

test('Should exit with code 0', async () => {
    const result = await cli(['mknm'])
    expect(result.code).toBe(0)
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
