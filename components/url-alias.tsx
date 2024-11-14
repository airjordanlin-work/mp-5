
'use client';
export default function UrlAlias({url}: {url:string}) {
    return(
        url && (
            <div className="m-1 p-4 bg-sky-200"
            onClick={()=>{
                navigator.clipboard.writeText(url);
            }}>
                <p className='text-xs'>click to copy!</p>
                <p>{url}</p>
            </div>
        )
    );
}