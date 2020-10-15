import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
export function UPlot(p) {
    const plotRef = useRef(null);
    useEffect(() => {
        const chart = new uPlot(p.options, p.data, plotRef.current);
    }, [p.data, p.options]);
    return (React.createElement("div", { ref: plotRef }));
}
