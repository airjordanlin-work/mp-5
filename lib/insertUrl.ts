"use server";
import {EntryProps} from "@/types";
import getUrl from "./getUrl";
import getCollection, {URLS_COLLECTION} from "@/db";

export default async function createNewUrl(
    entry: EntryProps
): Promise<string> {
    const {
        url, alias
    } = entry;

    if (!url || !alias) {
        return "url or alias is missing";
    }
    try {
        const res = await fetch(url);
        if (res.status < 200 || res.status >= 500) {
            console.log("invalid url response", res.status);
            return "invalid url";
        }
    } catch {
        return "invalid url";
    }

    const existingUrl = await getUrl(alias);
    if (existingUrl) {
        return "alias exists already";
    }

    const urlsCollection = await getCollection(URLS_COLLECTION);
    const res = await urlsCollection.insertOne({alias, url});

    return res.acknowledged ? "" : "something went wrong, try again";
}