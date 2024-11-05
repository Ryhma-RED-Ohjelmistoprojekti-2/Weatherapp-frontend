import { createContext, useState, useEffect } from "react";

export const METARContext = createContext();

const METARProvider = ({ children }) => {

    const [metars, setMetars] = useState([]);
    const [loadingMetars, setLoadingMetars] = useState(false);
    const [metarError, setMetarError] = useState(null);

    useEffect(() => {
        const fetchMetarData = async () => {
            try {
                setLoadingMetars(true);
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
            } catch (error) {
                setMetarError(error.message);
            } finally {
                setLoadingMetars(false);
            }
        }

        fetchMetarData();
    }, [])

    const metarProviderValue = {
        metars,
        loadingMetars,
        metarError
    }

    return (
        <METARContext.Provider value={metarProviderValue}>
            {children}
        </METARContext.Provider>
    );
}

export default METARProvider