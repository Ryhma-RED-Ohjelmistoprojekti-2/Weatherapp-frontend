import { useContext } from "react";
import { METARContext } from "../context/METARContext";

const useMETAR = () => {
    return useContext(METARContext);
};

export default useMETAR