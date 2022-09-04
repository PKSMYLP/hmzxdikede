
import dayjs from "dayjs"
export function formattingDate(date, format) {
    format = format || "YYYY-MM-DD HH:mm:ss";
    return dayjs(date).format(format);
}