
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"];

export const getFormattedDate = (unformatted: string): string => {
    const d = new Date(unformatted);
    return `${d.getDay()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const getTimeFrameFromNow = (unformatted: Date) => {
    const d = new Date(unformatted);

    const now = new Date();

    if (now.getFullYear() > d.getFullYear()) {
        return `${now.getFullYear() - d.getFullYear()} years ago` ;
    }

    if (now.getFullYear() === d.getFullYear() && now.getMonth() !== d.getMonth()) {
        return `${now.getMonth() - d.getMonth()} months ago` ;
    }

    if (now.getMonth() === d.getMonth() && now.getDate() !== d.getDate()) {
        return `${now.getDate() - d.getDate()} days ago` ;
    }

    if (now.getDay() === d.getDay() && now.getHours() !== d.getHours()) {
        return `${now.getHours() - d.getHours()} hours ago` ;
    }

    if (now.getHours() === d.getHours() && now.getMinutes() !== d.getMinutes()) {
        return `${now.getMinutes() - d.getMinutes()} minutes ago` ;
    }

    return "Just now";
};