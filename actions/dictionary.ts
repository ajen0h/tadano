"use server"
export const getDictionary = async (lang:string) => {
    const dictionary=await import(`@/app/dictionaries/${lang}.json`).then(m=>m.default)
    return dictionary
};