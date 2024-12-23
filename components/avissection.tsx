"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import { motion } from "framer-motion"

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

    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <div className="flex animate-scroll gap-6">
            {[...avis].map((avisItem, index) => (
                <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUpVariants}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="rounded-2xl p-5 max-w-sm bg-card text-card-foreground shadow-md">
                        <div className="flex gap-1 mb-2">
                            {avisItem.note.replace(" / 5", "")}
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 text-[15px] leading-snug mb-2">{avisItem.commentaire}</p>
                        <div className="flex items-center gap-2.5">
                            <Image
                                src={avisItem.image}
                                alt={avisItem.author}
                                className="w-7 h-7 rounded-full object-cover"
                                width="100"
                                height="100"
                            />
                            <div>
                                <p className="text-gray-800 dark:text-gray-100 text-[13px] font-medium leading-tight">
                                    {avisItem.author}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-[11px]">
                                    {formatDate(avisItem.date)} on Discord
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

    );
};

export default AvisSection;
