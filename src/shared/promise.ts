export function handleSettledPromise<T>(response: PromiseSettledResult<T>) {
  if (response.status === "fulfilled") {
    return response.value;
  }
  throw new Error(response.reason);
}
