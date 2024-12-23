'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function NestedLineage(props: any) {
    let margin = 60;

    return(
        <div className="relative my-4">
            <span className="deep" style={{
                paddingLeft: `${margin * props.multiplier}px`,
                display: 'block'
            }}>
                {props.lineage}
            </span>
            <div style={{
                position: "absolute",
                content: "",
                width: `${margin * props.multiplier - 10}px`,
                height: '1px',
                backgroundColor: 'white',
                top: '50%',
                transform: 'translateY(-50%)',
                left: '0',
            }}></div>
        </div>
    );
}

export default function Taxonomy() {
    const [taxa, setTaxa]: any = useState([]);
    const [related, setRelated]: any = useState([]);
    let lineage: any = [];
    const searchParams = useSearchParams()
    const objectFromQuery: any = searchParams.get('object');

    function renderLineage(): any {
        if(taxa) {
            const lineageArr = taxa.lineage?.split(';');
            lineageArr?.pop();
            lineage = lineageArr;
            if(!lineage?.length) return <span>There is no lineage for this taxa, must be a super kingdom</span>
            return lineage?.map((l: String, i: number) => <NestedLineage lineage={l} multiplier={i} />)
        }
    }

    useEffect(() => {
        setTaxa(JSON.parse(objectFromQuery));
    }, [])

    return(
        <div className="bg-[#240b36] p-6 rounded-md">
            <Link href="/"><FaArrowLeft className="mb-4" /></Link>
            <h1 className="text-4xl">{taxa.scientific_name}</h1>
            <div>
                <span className="text-sm mr-4 pill">Rank: {taxa.rank}</span>
                <span className="text-sm pill">Genetic Code: {taxa.genetic_code}</span>
            </div>
            <div className="my-4 border border-[#391253] p-4 rounded-md">
                <h1 className="text-2xl">Lineage:</h1>
                { taxa && renderLineage() }
            </div>
            <div>
                { lineage?.length > 0 && <Related rank={taxa.rank} lineage={lineage[lineage?.length - 2]} /> }
            </div>
        </div>
    );
}

function Related(props: any) {
    const [related, setRelated] = useState([]);

    async function getRelated(): Promise<any> {
        const response = await fetch(`https://www.ebi.ac.uk/ena/portal/api/search?result=taxon&query=lineage="*${props.lineage}*" AND rank="${props.rank}"&fields=all&limit=10&searchCurations=true&format=json&download=false`)
        const data = await response.json();
        setRelated(data);
    }

    useEffect(() => {
        getRelated();
    }, [])

    return (
        <div className="my-4 border border-[#391253] p-4 rounded-md">
            <h1 className="my-4 text-2xl">Other {props.rank} in {props.lineage}:</h1>
            { related.length > 0 && related.map((taxa: any) => (
                <span className="ml-4 pill text-wrap">{taxa.scientific_name}</span>
            )) }
        </div>
    )
}