'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest/5 to-teal/5 px-4">
            <div className="text-center max-w-md">
                <h1 className="text-9xl font-black text-forest/20 mb-4">404</h1>
                <h2 className="text-3xl font-bold text-forest mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                    Page not found
                </h2>
                <p className="text-forest/60 mb-8">
                    The page you're looking for doesn't exist. Let's get you back on track.
                </p>
                <button
                    onClick={handleGoHome}
                    className="btn-teal">
                    Go home
                </button>
            </div>
        </div>
    );
}
