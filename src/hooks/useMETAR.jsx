import { useContext } from "react";
import { METARContext } from "../utils/METARContext";

const useMETAR = () => {
    return useContext(METARContext);
};

export default useMETAR