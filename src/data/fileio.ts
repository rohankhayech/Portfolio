/* Copyright (c) 2023 Rohan Khayech */

import path from "path"
import fsPromises from "fs/promises"

/**
 * Loads the JSON object from the specified file in the "json" directory.
 * @param filename The name of the file.
 * @returns The parsed JSON object.
 */
export async function loadJSONObject(filename: string): Promise<any> {
    const filePath = path.join(process.cwd(), "json", filename)
    const jsonData = await fsPromises.readFile(filePath, "utf-8")
    return JSON.parse(jsonData)
}