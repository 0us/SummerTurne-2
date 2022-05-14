/**
 * @param {() => object} func
 * @param {number} times
 */
export function repeat(func, times) {
    func();
    times && --times && repeat(func, times);
}