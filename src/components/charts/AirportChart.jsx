import { Stage, Layer, Line, Text, Ring, Arrow } from 'react-konva';
import React from 'react';
import { useWeather } from '../../hooks/UseWeather';

const AirportChart = () => {

    const { currentWeather } = useWeather();

    //this code defines the center of the coordinate grid
    const centeredXCoordinate = 155;
    const centeredYCoordinate = 105;
    const lineLength = 100;

    //this code is for current wind direction arrow drawing
    const directionRadianAngle = currentWeather.windDirection * (Math.PI / 180);

    const directionX1 = centeredXCoordinate + 110 * Math.cos(directionRadianAngle);
    const directionY1 = centeredYCoordinate - 110 * Math.sin(directionRadianAngle);

    const directionX2 = centeredXCoordinate + 80 * Math.cos(directionRadianAngle);
    const directionY2 = centeredYCoordinate - 80 * Math.sin(directionRadianAngle);

    //the following code before return statement is for runway angles environment variable
    const anglesString = import.meta.env.VITE_ANGLES;

    const anglePairs = anglesString.split(",")

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

                <Text
                    x={centeredXCoordinate - 35}
                    y={centeredYCoordinate - 20}
                    text={`${currentWeather.windDirection}°`}
                    fontSize={40}
                    fontStyle='bold'
                    fill="black"
                />

                <Arrow
                    points={[directionX1, directionY1, directionX2, directionY2]}
                    stroke="maroon"
                    strokeWidth={9}
                />
            </Layer>
        </Stage>
    );
};

export default AirportChart