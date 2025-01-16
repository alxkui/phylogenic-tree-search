"use client";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { BiDna } from "react-icons/bi";

export default function Home() {
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  //const [requests, setRequests] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  //const [rateLimiterTimeStart, setRateLimiterTimeStart] = useState(0);
  //const COOLDOWN = 30;

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // if(requests >= 20 && (Date.now() - rateLimiterTimeStart) <= 1000) {
    //   setTimeout(() => {
    //     setRequests(0);
    //     setRateLimiterTimeStart(0);
    //   }, COOLDOWN);

    //   setErrorMsg("You have hit your limit of 20 subsequent requests, please wait 30 seconds to continue");
    //   return;
    // }

    // if(rateLimiterTimeStart == 0) {
    //   setRateLimiterTimeStart(Date.now());
    // }

    if (e.target.value.length > 3) {
      const response = await fetch(
        `https://www.ebi.ac.uk/ena/portal/api/search?result=taxon&query=description="*${e.target.value}*"&fields=all&limit=100&searchCurations=true&format=json&download=false`
      );
      const dataJson = await response.json();
      setData(dataJson);
      setShowSearch(true);
      //setRequests(requests + 1);
    } else {
      setShowSearch(false);
    }
  }

  return (
    <div className="flex flex-col h-3/4 justify-center">
      {errorMsg.length > 0 && <Error msg={errorMsg} /> }
      <form className="bg-[#240b36] rounded-full w-full text-xl">
        <input
          onChange={(e) => handleChange(e)}
          className="py-4 px-4 rounded-md bg-[#240b36] w-full border text-white"
          type="text"
          placeholder="Start your search here e.g. Enterobacter sp."
        />
      </form>
      { showSearch ? <SearchResults data={data} /> : <Hero /> }
    </div>
  );
}

function Hero() {
  return (
    <div className="flex -z-20 flex-row justify-center items-center mt-28">
        <div className="w-[400]">
          <h3 className="text-4xl text-left text-white">Easily find taxonomy information, such as lineage and genetic code.</h3>
        </div>
        <div>
          <BiDna color="white" size="300" />
          </div>
      </div>
  )
}

function SearchResults(props: any) {
  return (
    <div className="bg-[#240b36] text-xl p-6 h-[600] relative bottom-1 border-[#391253] border border-t-0 rounded-br-md rounded-bl-md overflow-scroll">
      <h2 className="text-2xl">Search results {`(${props.data.length})`}</h2>
      <ul>
        <li className="my-4 text-white">
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

function Error(props: any) {
  return (
    <div className="absolute bg-red-600 errorMessage">
      <span className="text-center text-white">{props.msg}</span>
    </div>
  )
}

function TaxaElement(props: any) {
  return (
    <Link href={props.taxaLink}>
      <div className="flex justify-between hover:bg-[#391253] p-6">
        <div>
          <span>{props.taxaName}</span>
        </div>
        <div>
          <span className="mr-4 border bg-white rounded-full p-2 text-sm text-[#391253]">
            Rank: {props.taxaRank}
          </span>
          <span className="border bg-white rounded-full p-2 text-sm text-[#391253]">
            Genetic Code: {props.taxaGeneticCode}
          </span>
        </div>
      </div>
    </Link>
  );
}
