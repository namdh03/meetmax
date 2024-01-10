export default function formatTimeAgo(timestamp: number): string {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
    const secondsAgo = currentTimestamp - timestamp;

    if (secondsAgo < 60) {
        return `${secondsAgo}s ago`;
    }

    const timeUnits = [
        { unit: "m", divisor: 60 }, // minutes
        { unit: "h", divisor: 60 }, // hours
        { unit: "d", divisor: 24 }, // days
        { unit: "w", divisor: 7 }, // weeks
        { unit: "mo", divisor: 30 }, // months
        { unit: "y", divisor: 12 }, // years
    ];

    let timeAgo = secondsAgo;
    let unit = "s";

    for (const { unit: nextUnit, divisor } of timeUnits) {
        if (timeAgo < divisor) {
            break;
        }

        timeAgo = Math.floor(timeAgo / divisor);
        unit = nextUnit;
    }

    return `${timeAgo}${unit} ago`;
}
