import dayjs from "dayjs";

export const day = {
    filters: {
        dateFormatDash(date, format = 'YYYY-MM-DD') {
            return date ? dayjs(date).format(format) : ''
        }
    }
}
