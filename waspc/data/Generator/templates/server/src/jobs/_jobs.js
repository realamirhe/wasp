{{={= =}=}}
{=& jobFnImportStatement =}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export default class {= jobName =} {
  constructor(delayMs) {
    this.delayMs = delayMs || 0
  }

  performAsync(args) {
    async function fn(delayMs) {
      if (delayMs > 0) {
        await sleep(delayMs)
      }
      return {= jobFnName =}(args)
    }

    const res = fn(this.delayMs)

    return {
      result: async () => await res
    }
  }

  static delay(ms) {
    return new {= jobName =}(ms)
  }

  static performAsync(args) {
    const job = new {= jobName =}(0)
    return job.performAsync(args)
  }
}
