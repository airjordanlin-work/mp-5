import getUrl from "@/lib/getUrl";
import {redirect, permanentRedirect} from "next/navigation";

export default async function RedirectPage({
    params,}:{
    params: Promise<{alias: string}>;
}) {
    const {alias} = await params;

    console.log("alias: ", alias);

    const url = await getUrl(alias);

    if (url) {
        return permanentRedirect(url);

    }
    return redirect("/");
}