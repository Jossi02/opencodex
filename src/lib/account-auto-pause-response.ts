/** Process-local outcome ownership; these markers never become upstream/client headers. */
const pausedResponses = new WeakSet<Response>();
const permanentResponses = new WeakSet<Response>();
export const wasAccountAutoPaused = (response: Response): boolean => pausedResponses.has(response);
export const wasPermanentAccountRefusal = (response: Response): boolean => permanentResponses.has(response);
export function markPermanentAccountRefusal(response: Response): void { permanentResponses.add(response); }
export function markAccountAutoPaused(response: Response): void { pausedResponses.add(response); }
export function inheritAccountAutoPauseResponse(source: Response, target: Response): Response {
  if (wasAccountAutoPaused(source)) markAccountAutoPaused(target);
  if (wasPermanentAccountRefusal(source)) markPermanentAccountRefusal(target);
  return target;
}
