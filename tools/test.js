process.env.NODE_ENV = 'test'

const spawn = require('child_process').spawn

const testArgs = [
  'mocha', [
    '--require babel-register',
    '--require babel-polyfill',
    '\'test/**/*Test.js\''
  ]]
const unitTestArgs = [
  'mocha', [
    '--require babel-register',
    '--require babel-polyfill',
    '\'test/unit/**/*Test.js\''
  ]]
const uiTestArgs = [
  'mocha', [
    '--require babel-register',
    '--require babel-polyfill',
    '--recursive',
    '$(find test -name \'*Test.js\' -not -path \'test/unit/*\''
  ]]
const watchArgs = [
  'webpack', ['--watch']
]

// TODO: check args

const commandToRun = process.argv[0]
let spawnArgs

switch (commandToRun) {
  case 'test':
    spawnArgs = testArgs
    break
  case 'unitTest':
    spawnArgs = unitTestArgs
    break
  case 'uiTest':
    spawnArgs = uiTestArgs
    break
  case 'watch':
    spawnArgs = watchArgs
    break
  default:
    console.log('ERROR! test type not passed in')
    process.exit(1)
}

const spawn = require('child_process').spawn
spawnArgs = Object.assign(spawnArgs, {
  env: process.env,
  shell: true,
  detached: true,
  stdio: 'ignore'
})

const child = spawn(...spawnArgs)

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`)
})

child.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`)
})

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`)
})

child.unref()
