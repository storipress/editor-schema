const DRAG = /drag/

export function stopEvent({ event }: { event: Event }): boolean {
  return event.type !== 'mousedown' && event.type !== 'drop' && !DRAG.test(event.type)
}
