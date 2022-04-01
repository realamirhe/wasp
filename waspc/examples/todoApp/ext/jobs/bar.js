function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const foo = async () => {
  console.log("inside bar's foo")
  await sleep(4000)
  return 1
}
