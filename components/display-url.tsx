
'use client';

import { useState } from 'react';
import UrlAlias from './url-alias';
import insertUrl from '@/lib/insertUrl';



function UrlShortenerForm() {
    const [alias, setAlias] = useState('');
    const [url, setUrl] = useState('');
    const [error,setError] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');


    const handleSubmit = async() => {
        setShortenedUrl('');
        const res = await insertUrl({url, alias});
        if(res.length === 0)
        {
            setShortenedUrl(window.location.href + alias);
            return;
        }
        setError(res);
    }


    return(

        <div>
            <form
                className = "p-8 m-2 text-lg bg-sky-200 flex flex-col"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                >
                {error.length>0 && <p>{error}</p>}
                <input
                    placeholder="alias"
                    type="text"
                    value={alias}
                    onChange={(e) => {
                        setError("");
                        setAlias(e.target.value);
                    }}
                    />
                <input
                    placeholder="url"
                    type="text"
                    value={url}
                    onChange={(e) => {
                        setError("");
                        setUrl(e.target.value);
                    }}
                    />
                <button type="submit" className="bg-sky-300">
                    Submit
                </button>
            </form>
            <UrlAlias url={shortenedUrl} />
        </div>
    );

}

export default UrlShortenerForm;
