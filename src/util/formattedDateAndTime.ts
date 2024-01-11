
// date에 post.createdAt이 들어갑니다. 
// ex: getFormattaedDate(post.createdAt)
export const getFormattedDate = (date: number) => {
    return new Date(date).toLocaleDateString("ko", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })
}