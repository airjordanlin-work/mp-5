'use client';

import { useState } from 'react';
import UrlAlias from './url-alias';
import insertUrl from '@/lib/insertUrl';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

function UrlShortenerForm() {
    const [alias, setAlias] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const handleSubmit = async () => {
        setShortenedUrl('');
        const res = await insertUrl({ url, alias });
        if (res.length === 0) {
            setShortenedUrl(window.location.href + alias);
            return;
        }
        setError(res);
    };

    return (
        <Box
            sx={{
                maxWidth: '400px',
                margin: '2rem auto',
                padding: '2rem',
                borderRadius: '8px',
                backgroundColor: '#e3f2fd',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
            }}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
                {error.length > 0 && <Alert severity="error">{error}</Alert>}
                <TextField
                    label="Alias"
                    variant="outlined"
                    fullWidth
                    value={alias}
                    onChange={(e) => {
                        setError('');
                        setAlias(e.target.value);
                    }}
                />
                <TextField
                    label="URL"
                    variant="outlined"
                    fullWidth
                    value={url}
                    onChange={(e) => {
                        setError('');
                        setUrl(e.target.value);
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ textTransform: 'none' }}
                >
                    Submit
                </Button>
            </form>
            {shortenedUrl && (
                <Typography
                    sx={{ marginTop: '1rem', color: '#1976d2', wordBreak: 'break-word' }}
                    variant="body1"
                >
                    Shortened URL: <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
                </Typography>
            )}
            <UrlAlias url={shortenedUrl} />
        </Box>
    );
}

export default UrlShortenerForm;
