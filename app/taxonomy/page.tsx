'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Taxonomy() {
    const [taxa, setTaxa]: any = useState([]);
    const searchParams = useSearchParams()
    const objectFromQuery: any = searchParams.get('object');

    function renderLineage(): any {
        if(taxa) {
            const lineage = taxa.lineage?.split(';');
            lineage?.pop();
            return lineage?.map((l: String, i: number) => (i != lineage?.length - 1) ? <span>{l} &#8594; </span> : <span>{l}</span>)
        }
    }

    useEffect(() => {
        return setTaxa(JSON.parse(objectFromQuery));
    }, [])

    return(
        <div className="flex flex-col justify-center h-screen w-screen p-8 font-[family-name:var(--font-geist-sans)]">
            <Link href="/">Back</Link>
            <h1 className="text-3xl">Scientific Name: {taxa.scientific_name}</h1>
            <div>
                <h1 className="text-2xl">Lineage:</h1>
                {
                    renderLineage()
                }
            </div>
            <h1 className="text-2xl">Rank: {taxa.rank}</h1>
            <h1 className="text-2xl">Genetic Code: {taxa.genetic_code}</h1>
        </div>
    );
}