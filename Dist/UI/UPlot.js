import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import { Assert, E } from "../Utils/FromJSVE";
export const UPlot = React.memo((p) => {
    var _a;
    const divRef = (_a = p.divRef) !== null && _a !== void 0 ? _a : useRef(null);
    Assert(p.data == null || p.data.every(a => { var _a; return a.length == ((_a = p.data[0]) === null || _a === void 0 ? void 0 : _a.length); }), () => `All data-arrays must have the same length. Got lengths: ${p.data.map(a => a.length).join(",")}`);
    useEffect(() => {
        //debugger;
        const chart = new uPlot(p.options, p.data, divRef.current);
        if (p.chartRef)
            p.chartRef.current = chart;
        return () => {
            if (p.chartRef)
                p.chartRef.current = null;
            chart.destroy();
        };
    }, [p.data, p.options, p.chartRef, divRef]);
    const randomID = `id_${Math.random().toString().replace(".", "")}`;
    const div = (React.createElement("div", { ref: divRef, style: E({ width: "100%", height: "100%" }, p.placeLegendBelowContainer && { height: "calc(100% + 33px)", pointerEvents: "none" }) }));
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
});
