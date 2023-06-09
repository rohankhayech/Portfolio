/** Copyright (c) 2023 Rohan Khayech */

/**
 * Retrieves the Linguist languages colors for the specified languages.
 * @param langs The list of languages to retrieve colors for.
 * @returns A map of languages and their colors.
 */
export async function getLanguageColors(langs: string[]): Promise<Map<string, string>> {
    // Retrieve from ozh/github colors repo.
    const data: {color: string, url: string}[] = await fetch('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json')
        .then(res => res.json())
    // Filter for specified languages then map to language -> color map.
        return new Map(Object.entries(data)
        .filter(lang => langs.includes(lang[0]))
        .map(lang=>[lang[0], lang[1].color])
    )
}