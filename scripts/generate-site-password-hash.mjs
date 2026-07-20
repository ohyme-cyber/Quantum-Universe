import { createHash } from "node:crypto"
import { stdin, stdout } from "node:process"

function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex")
}

function readHidden(prompt) {
  return new Promise((resolve) => {
    let value = ""
    stdout.write(prompt)
    stdin.setRawMode(true)
    stdin.resume()
    stdin.setEncoding("utf8")

    function cleanup() {
      stdin.setRawMode(false)
      stdin.pause()
      stdin.off("data", onData)
      stdout.write("\n")
    }

    function onData(char) {
      if (char === "\u0003") {
        cleanup()
        process.exit(130)
      }

      if (char === "\r" || char === "\n") {
        cleanup()
        resolve(value)
        return
      }

      if (char === "\u007f") {
        value = value.slice(0, -1)
        return
      }

      value += char
    }

    stdin.on("data", onData)
  })
}

async function readPipedPassword() {
  let value = ""
  for await (const chunk of stdin) {
    value += chunk
  }
  return value.trimEnd()
}

const argPassword = process.argv.slice(2).join(" ")
const password =
  argPassword || (stdin.isTTY ? await readHidden("Site password: ") : await readPipedPassword())

if (!password) {
  console.error("No password provided.")
  process.exit(1)
}

console.log(hashPassword(password))
