import useMETAR from "../../hooks/useMETAR"

const METARCard = () => {

    const { metars, loadingMetars, metarError } = useMETAR();

    return (
        <article className="metarcard">
            <div className="metarcard-header">
                <h3>METARS</h3>
            </div>
            <div className="metarcard-content">
                {
                    loadingMetars ? (
                        <p>Loading METAR data...</p>
                    ) : metarError ? (
                        <p style={{ color: 'black' }}>Error: {metarError}</p>
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