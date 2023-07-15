// export function stripTags(string: string) {
//     return string.replace(/<[^>]*>/i, "");
// }

export function stripTags(string: string) {
    return string.replace(/<\/?[^>]+>/g, "");
}