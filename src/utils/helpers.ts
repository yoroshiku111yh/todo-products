

export const isIncludeInString = (keyword: string, stringCheck: string) => {
    const checkStr = stringCheck.replace(/\s/g, "").toLowerCase();
    const searchWord = keyword.replace(/\s/g, "").toLowerCase();
    return checkStr.replace(/\s/g, "").length === 0 ? true : checkStr.includes(searchWord);
}