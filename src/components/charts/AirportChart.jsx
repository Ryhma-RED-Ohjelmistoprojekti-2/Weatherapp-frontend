import { Stage, Layer, Line, Text, Ring } from 'react-konva';
import React from 'react';

const AirportChart = () => {

    const anglesString = "04/22,12/30"

    const anglePairs = anglesString.split(",")

    const centeredXCoordinate = 155;
    const centeredYCoordinate = 105;
    const lineLength = 100;

    return (
        <Stage width={310} height={210}>
            <Layer>
                <Ring
                    innerRadius={90}
                    outerRadius={90}
                    stroke="cyan"
                    strokeWidth={5}
                    x={centeredXCoordinate}
                    y={centeredYCoordinate}
                />
                
                {
                    anglePairs.map((pair, index) => {
                        const angles = pair.split("/");

                        const firstDegreeAngle = Number(angles[0]) * 10;
                        const secondDegreeAngle = Number(angles[1]) * 10;

                        const firstRadianAngle = firstDegreeAngle * (Math.PI / 180);
                        const secondRadianAngle = secondDegreeAngle * (Math.PI / 180);

                        const x1 = centeredXCoordinate + lineLength * Math.cos(firstRadianAngle);
                        const y1 = centeredYCoordinate - lineLength * Math.sin(firstRadianAngle);
                        const x2 = centeredXCoordinate + lineLength * Math.cos(secondRadianAngle);
                        const y2 = centeredYCoordinate - lineLength * Math.sin(secondRadianAngle);

                        return (
                            <React.Fragment key={index}>
                                <Line
                                    points={[x1, y1, x2, y2]}
                                    stroke="gray"
                                    strokeWidth={18}
                                />
                                <Text
                                    x={x1 - 50}
                                    y={y1 - 10}
                                    text={angles[0]}
                                    fontSize={20}
                                    fill="black"
                                />
                                <Text
                                    x={x2 - 50}
                                    y={y2 - 10}
                                    text={angles[1]}
                                    fontSize={20}
                                    fill="black"
                                />
                            </ React.Fragment>
                        )
                    })
                }
            </Layer>
        </Stage>
    );
};

export default AirportChart