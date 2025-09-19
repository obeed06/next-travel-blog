import styles from './MapChart.module.css';
import React, {memo, useContext} from "react";
import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import ColorModeContext from "../../src/ColorModeContext";

const excluded = ["Antarctica"]

const geoUrl =
    "../world-countries.json";

const MapChart = ({visitedGeos}) => {
    const { darkMode } = useContext(ColorModeContext);

    let defaultSVGColorFill = darkMode ? "#23252b" : "#efefef" ;

    return (
        visitedGeos ?
            (
                    <ComposableMap className={styles.mapChart} data-tip="" projection="geoEqualEarth"
                                   projectionConfig={{scale: 180}}>
                        <Geographies geography={geoUrl}>
                            {({geographies}) =>
                                geographies.filter(geo => !excluded.includes(geo.properties['name'])).map(geo => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        style={{
                                            default: {
                                                fill: (visitedGeos.includes(geo.properties['name']) ? "var(--brand-color)" : defaultSVGColorFill),
                                                outline: "none"
                                            },
                                            hover: {
                                                fill: (visitedGeos.includes(geo.properties['name']) ? "var(--brand-color)" : defaultSVGColorFill),
                                                outline: "none"
                                            },
                                            pressed: {
                                                fill: (visitedGeos.includes(geo.properties['name']) ? "var(--brand-color)" : defaultSVGColorFill),
                                                outline: "none"
                                            }
                                        }}
                                    />
                                ))
                            }
                        </Geographies>
                    </ComposableMap>
            ) : (
                <></>
            )
    );
};

export default memo(MapChart);
