
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"];

export const getFormattedDate = (unformatted: string): string => {
    const d = new Date(unformatted);
    return `${d.getDay()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const getTimeFrameFromNow = (unformatted: Date) => {
    const d = new Date(unformatted);

    const now = new Date();

    if (now.getFullYear() > d.getFullYear()) {
        return `${now.getFullYear() - d.getFullYear()} years ago`;
    }

    if (now.getFullYear() === d.getFullYear() && now.getMonth() !== d.getMonth()) {
        const span = now.getMonth() - d.getMonth();
        return `${span} ${span === 1 ? "month" : "months"} ago`;
    }

    if (now.getMonth() === d.getMonth() && now.getDate() !== d.getDate()) {
        const span = now.getDate() - d.getDate();
        return `${span} ${span === 1 ? "day" : "days"} ago`;
    }

    if (now.getDay() === d.getDay() && now.getHours() !== d.getHours()) {
        const span = now.getHours() - d.getHours();
        return `${span} ${span === 1 ? "hour" : "hours"} ago`;
    }

    if (now.getHours() === d.getHours() && now.getMinutes() !== d.getMinutes()) {
        const span = now.getMinutes() - d.getMinutes();
        return `${span} ${span === 1 ? "minute" : "minutes"} ago`;
    }

    return "Just now";
};