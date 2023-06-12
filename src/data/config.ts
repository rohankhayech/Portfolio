import { loadJSONObject } from "./fileio";

export default async function loadConfig(): Promise<Config> {
    return loadJSONObject("config.json")
}