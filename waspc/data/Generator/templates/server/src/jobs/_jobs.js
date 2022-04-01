{{={= =}=}}
{=& jobFnImportStatement =}

export default class {= jobName =} {
  static performAsync(args) {
    const fn = {= jobFnName =}(args)
    return {
      result: async function() {
        return await fn
      }
    }
  }
}
