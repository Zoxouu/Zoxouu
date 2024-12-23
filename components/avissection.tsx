"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';

type Avis = {
    author: string;
    image: string;
    note: string;
    commentaire: string;
    date: string;
};

const AvisSection: React.FC = () => {
    const [avis, setAvis] = useState<Avis[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAvis = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://192.168.10.52:8080/api/avis", {
                mode: 'cors',
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setAvis(data);
        } catch (err) {
            console.error('Erreur lors de la récupération des avis:', err);
            setError('Erreur lors de la récupération des avis.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAvis();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Récupère uniquement la date au format 'YYYY-MM-DD'
    };

    const renderStars = (rating: string) => {
        const numStars = parseInt(rating.split(" ")[0], 10); // "4 / 5" devient 4
        const stars = Array.from({ length: 5 }, (_, index) =>
            index < numStars ? '⭐' : '⭐' // Affiche une étoile pleine ou vide
        );
        return stars.join('');
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                <span>Chargement des avis...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <span>{error}</span>
            </div>
        );
    }

    if (avis.length === 0) {
        console.log('Aucun avis trouvé ou le tableau est vide.');
        return (
            <div className="text-center py-20">
                <span>Aucun avis disponible.</span>
            </div>
        );
    }

    console.log('Avis récupérés:', avis);

    return (
        <div className="py-10">
            <h2 className="text-2xl font-bold text-center mb-8">Avis</h2>

            <div className="overflow-hidden relative">
                <div className="flex animate-scroll gap-6">
                    {[...avis, ...avis].map((avisItem, index) => (
                        <div key={index} className="bg-[#1A1A1A] rounded-2xl p-5 max-w-sm">
                            <div className="flex gap-1 mb-2">{renderStars(avisItem.note)}</div>
                            <p className="text-white text-[15px] leading-snug mb-2">{avisItem.commentaire}</p>
                            <div className="flex items-center gap-2.5">
                                <Image src={avisItem.image} alt="" className="w-7 h-7 rounded-full object-cover" />
                                <div>
                                    <p className="text-white text-[13px] font-medium leading-tight">
                                        {avisItem.author}
                                    </p>
                                    <p className="text-[#737373] text-[11px]">
                                        {formatDate(avisItem.date)} on Discord
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AvisSection;
