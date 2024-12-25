"use client";
import { useEffect, useState } from "react";

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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const response = await fetch("https://api.zoxouu.me/api/avis", {
                mode: "cors",
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error("Erreur réseau");
            }

            const data = await response.json();
            setAvis(data);
        } catch (err) {
            console.error("Erreur lors de la récupération des avis:", err);
            setError("Erreur lors de la récupération des avis.");
        } finally {
            clearTimeout(timeoutId);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAvis();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const responsive = {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 },
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
        return (
            <div className="text-center py-20">
                <span>Aucun avis disponible.</span>
            </div>
        );
    }

    return (
        avis.map((avisItem, index) => (
                <div
                    key={index}
                    className="rounded-lg p-6 w-[350px] bg-card text-card-foreground shadow-md h-[300px] flex flex-col justify-between"
                >
                    <div className="flex gap-1 mb-2">
                        <span className="font-bold text-xl text-yellow-500">
                            {avisItem.note.replace(" / 5", "")}
                        </span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 text-[14px] leading-snug mb-2 flex-1 flex items-center justify-center">
                        {avisItem.commentaire}
                    </p>
                    <div className="flex items-center gap-2.5">
                        <img
                            src={avisItem.image}
                            alt={avisItem.author}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-gray-800 dark:text-gray-100 text-[13px] font-medium leading-tight">
                                {avisItem.author}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-[11px]">
                                {formatDate(avisItem.date)} sur Discord
                            </p>
                        </div>
                    </div>
                </div>
                )
            )
    );
};

export default AvisSection;
