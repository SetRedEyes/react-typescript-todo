export function checkErrorMessageType(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}
