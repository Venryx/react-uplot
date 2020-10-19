import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import { E } from "../Utils/FromJSVE";
export function UPlot(p) {
    const divRef = useRef(null);
    useEffect(() => {
        const chart = new uPlot(p.options, p.data, divRef.current);
        if (p.chartRef)
            p.chartRef.current = chart;
        return () => {
            if (p.chartRef)
                p.chartRef.current = null;
            chart.destroy();
        };
    }, [p.data, p.options, p.chartRef]);
    const randomID = `id_${Math.random().toString().replace(".", "")}`;
    const div = React.createElement("div", { ref: divRef, style: E({ width: "100%", height: "100%" }, p.placeLegendBelowContainer && { height: "calc(100% + 33px)", pointerEvents: "none" }) });
    if (p.placeLegendBelowContainer) {
        return (React.createElement("div", { id: randomID, style: { width: "100%", height: "100%" } },
            React.createElement("style", null, `
					#${randomID} .u-wrap {
						pointer-events: auto;
					}
					#${randomID} .u-legend > tr {
						pointer-events: auto;
					}
				`),
            div));
    }
    return div;
}
