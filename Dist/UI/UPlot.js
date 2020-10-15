import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
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
    return (React.createElement("div", { ref: divRef }));
}
