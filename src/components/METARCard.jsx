import { useState, useEffect } from "react";

const METARCard = () => {

    const [metars, setMetars] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMetarData = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://api.met.no/weatherapi/tafmetar/1.0/metar?icao=EFHK%2CEFTU%2CEFTP");
                if (!response.ok) throw new Error("Issue fetching metar data!");
                const metarData = await response.text();
                const metarArray = [];
                const EFHKDataArray = metarData.split("\n").filter(line => line.startsWith("EFHK"));
                const lastEFHKMetar = EFHKDataArray[EFHKDataArray.length - 1];
                metarArray.push(lastEFHKMetar);
                const EFTUDataArray = metarData.split("\n").filter(line => line.startsWith("EFTU"));
                const lastEFTUMetar = EFTUDataArray[EFTUDataArray.length - 1];
                metarArray.push(lastEFTUMetar)
                const EFTPDataArray = metarData.split("\n").filter(line => line.startsWith("EFTP"));
                const lastEFTPMetar = EFTPDataArray[EFTPDataArray.length - 1];
                metarArray.push(lastEFTPMetar)
                setMetars(metarArray);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        fetchMetarData();
    }, [])

    return (
        <article className="metarcard">
            <div className="metarcard-header">
                <h3>METARS</h3>
            </div>
            <div className="metarcard-content">
                {
                    loading ? (
                        <p>Loading METAR data...</p>
                    ) : (
                        <>
                            {metars.map((metar, index) => <p key={index}>{metar}</p>)}
                        </>
                    )
                }
            </div>
        </article>
    )
}

export default METARCard