import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Podcast {
    _id: string;
    title: string;
}

export function Podcasts() {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/podcasts');
                setPodcasts(response.data); // Ensure response.data is an array
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios error:', error.response?.data || error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        };
        fetchPodcasts();
    }, []);

    return (
        <div>
            <h1>Podcasts</h1>
            <ul>
                {podcasts.map((podcast) => (
                    <li key={podcast._id}>{podcast.title}</li>
                ))}
            </ul>
        </div>
    );
}
