import './MapChart.css';
import React, {memo} from "react";
import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const excluded = ["Antarctica"]

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({visitedGeos}) => {
    let defaultSVGColorFill = localStorage.getItem('colorMode') === 'dark' ? "#23252b" : "#efefef" ;

    return (
        visitedGeos ?
            (
                    <ComposableMap className="mapChart" data-tip="" projection="geoEqualEarth"
                                   projectionConfig={{scale: 180}}>
                        <Geographies geography={geoUrl}>
                            {({geographies}) =>
                                geographies.filter(geo => !excluded.includes(geo.properties['NAME'])).map(geo => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        style={{
                                            default: {
                                                fill: (visitedGeos.includes(geo.properties['NAME']) ? "var(--brand-color)" : defaultSVGColorFill),
                                                outline: "none"
                                            },
                                            hover: {
                                                fill: (visitedGeos.includes(geo.properties['NAME']) ? "var(--brand-color)" : defaultSVGColorFill),
                                                outline: "none"
                                            },
                                            pressed: {
                                                fill: (visitedGeos.includes(geo.properties['NAME']) ? "var(--brand-color)" : defaultSVGColorFill),
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
