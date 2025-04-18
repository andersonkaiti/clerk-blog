export const decode = (input: unknown) =>
  Buffer.isBuffer(input)
    ? input.toString("utf-8")
    : input instanceof Uint8Array
    ? Buffer.from(input).toString("utf-8")
    : String(input);
