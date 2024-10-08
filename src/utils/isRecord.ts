type TRecord = Record<string, any>

const isRecord = <T extends TRecord = TRecord>(candidate: unknown): candidate is T => typeof candidate === "object" && candidate !== null

export {isRecord}