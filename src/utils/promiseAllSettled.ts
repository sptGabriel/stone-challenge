type PromiseResult =
  | {
      status: "pending";
    }
  | {
      status: "fulfilled";
      value: any;
    }
  | {
      status: "rejected";
      error: Error;
    };

export function customPromiseAllSettled(
  promises: Array<Promise<any>>
): Promise<PromiseResult[]> {
  // We initialize a `results` array of the size of `promises`
  const results: PromiseResult[] = promises.map(() => {
    return { status: "pending" };
  });

  return new Promise((resolve, reject) => {
    function resolveIfNothingPending(): void {
      // If there are no pending promises, we can resolve our main promise
      if (!results.find((result) => result.status === "pending")) {
        resolve(results);
      }
    }

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          // When a promise is resolved, we store the value and status
          results[index] = { value, status: "fulfilled" };
          resolveIfNothingPending();
        })
        .catch((error) => {
          // When there's an error, we store it in the `results` array too
          results[index] = { error, status: "rejected" };
          resolveIfNothingPending();
        });
    });
  });
}
