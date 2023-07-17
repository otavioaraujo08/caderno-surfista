type DebounceCallback = (...args: any[]) => void;

export function UseDebounce(
    callback: DebounceCallback,
    delay: number
): DebounceCallback {
    let timeoutId: NodeJS.Timeout;

    return (...args: any[]) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}
