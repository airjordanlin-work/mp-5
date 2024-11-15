
'use client';

import { useState } from 'react';
import UrlAlias from './url-alias';
import insertUrl from '@/lib/insertUrl';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    maxWidth: '500px',
    margin: '0 auto',
});

const Input = styled('input')({
    width: '100%',
    padding: 'calc(0.5em + 1%)',
    margin: 'calc(0.3em + 1%) 0',
    fontSize: 'calc(0.9em + 0.5vw)',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    outline: 'none',
    '&:focus': {
        borderColor: '#0070f3',
    },
});

const StyledButton = styled(Button)({
    width: '100%',
    padding: 'calc(0.5em + 1%)',
    fontSize: 'calc(0.9em + 0.5vw)',
    margin: 'calc(0.3em + 1%) 0',
});


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
            <Form
                className = "p-8 m-2 text-lg bg-sky-200 flex flex-col"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                >
                {error.length>0 && <p>{error}</p>}
                <Input
                    placeholder="alias"
                    type="text"
                    value={alias}
                    onChange={(e) => {
                        setError("");
                        setAlias(e.target.value);
                    }}
                    />
                <Input
                    placeholder="url"
                    type="text"
                    value={url}
                    onChange={(e) => {
                        setError("");
                        setUrl(e.target.value);
                    }}
                    />
                <StyledButton type="submit" className="bg-sky-300">
                    Submit
                </StyledButton>
            </Form>
            <UrlAlias url={shortenedUrl} />
        </div>
    );

}

export default UrlShortenerForm;
