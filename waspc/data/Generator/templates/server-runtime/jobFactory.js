var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class PassthroughJob {
    constructor() {
        this.fn = () => { };
        this.delayMs = 0;
    }
    clone() {
        const clonedJob = new PassthroughJob();
        clonedJob.fn = this.fn;
        clonedJob.delayMs = this.delayMs;
        return clonedJob;
    }
    delay(delayMs) {
        const clonedJob = this.clone();
        clonedJob.delayMs = delayMs;
        return clonedJob;
    }
    performAsync(...args) {
        const fn = this.fn;
        function wrappedFn(delayMs) {
            return __awaiter(this, void 0, void 0, function* () {
                if (delayMs > 0) {
                    yield sleep(delayMs);
                }
                return fn(args);
            });
        }
        const res = wrappedFn(this.delayMs);
        return {
            result: () => __awaiter(this, void 0, void 0, function* () { return yield res; })
        };
    }
}
export function passthroughJobFactory(fn) {
    const job = new PassthroughJob();
    job.fn = fn;
    return job;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
