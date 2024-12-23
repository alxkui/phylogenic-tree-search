"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 3) {
      const response = await fetch(
        `https://www.ebi.ac.uk/ena/portal/api/search?result=taxon&query=description="${e.target.value}*"&fields=all&limit=10&searchCurations=true&format=json&download=false`
      );
      const dataJson = await response.json();
      setData(dataJson);
      console.log(dataJson);
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }

  return (
    <div className="grid justify-center align-middle content-center h-screen w-screen font-[family-name:var(--font-geist-sans)]">
      <form className="bg-[#240b36] rounded-md">
        <input
          onChange={(e) => handleChange(e)}
          className="pt-8 pb-8 pl-8 pr-8 rounded-md bg-[#240b36] border-r-2 w-[800] rounded-r-none"
          type="text"
          placeholder="Enterobacter spp."
        />
        <button
          className="p-8 pl-9 hover:bg-[#c31432] rounded-r-md transition-colors"
          type="button"
        >
          Search
        </button>
      </form>

      {
        showSearch && <SearchResults data={data} />
      }

    </div>
  );
}

function SearchResults(props: any) {
  return (
    <div className="bg-[#c31432] p-6 h-[500px] overflow-scroll">
      <h2 className="text-2xl">Search results</h2>
      <ul>
        <li className="my-4">
          {props.data.map((taxa: any) => (
            <TaxaElement
              key={taxa.taxId}
              taxaLink={`/taxonomy?object=${JSON.stringify(taxa)}`}
              taxaName={taxa.scientific_name}
              taxaRank={taxa.rank}
              taxaGeneticCode={taxa.genetic_code}
            />
          ))}
        </li>
      </ul>
    </div>
  );
}

function TaxaElement(props: any) {
  return (
    <Link href={props.taxaLink}>
      <div className="flex justify-between hover:bg-[#fc2145] p-6">
        <div>
          <span>{props.taxaName}</span>
        </div>
        <div>
          <span className="mr-4 border border-white rounded-full p-2">
            Rank: {props.taxaRank}
          </span>
          <span className="border border-white rounded-full p-2">
            Genetic Code: {props.taxaGeneticCode}
          </span>
        </div>
      </div>
    </Link>
  );
}
