export async function parallel<T>(
  concurrent: number,
  collectionandProcessors: [{ collection: Iterable<T>, processor: (item: T) => Promise<any>}],
) {
  // queue up simultaneous calls
  const queue: any = [];
  const ret = [];
  for (const item of collectionandProcessors) {
		for(const fn of item.collection){
			const p = item.processor(fn).then(res => {
				queue.splice(queue.indexOf(p), 1);
				return res;
			});
			queue.push(p);
			ret.push(p);
			// if max concurrent, wait for one to finish
			if (queue.length >= concurrent) {
					await Promise.race(queue);
			}
		}
  }
  // wait for the rest of the calls to finish
  await Promise.all(queue);
}
