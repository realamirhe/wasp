interface PerformableResult {
  result(): Promise<any>;
}

interface Performable {
  performAsync(...args: any): PerformableResult;
}

interface Job extends Performable {
  delay(delayMs: number): Performable;
}

class PassthroughJob implements Job {
  fn: (...args: any) => any = () => { };
  delayMs: number = 0;

  clone(): PassthroughJob {
    const clonedJob = new PassthroughJob();
    clonedJob.fn = this.fn;
    clonedJob.delayMs = this.delayMs;
    return clonedJob;
  }

  delay(delayMs: number): Performable {
    const clonedJob = this.clone();
    clonedJob.delayMs = delayMs;
    return clonedJob;
  }

  performAsync(...args: any) {
    const fn = this.fn;

    async function wrappedFn(delayMs: number) {
      if (delayMs > 0) {
        await sleep(delayMs);
      }
      return fn(args);
    }

    const res = wrappedFn(this.delayMs);

    return {
      result: async () => await res
    }
  }
}

export function passthroughJobFactory(fn: (...args: any) => any) {
  const job = new PassthroughJob();
  job.fn = fn;
  return job;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
