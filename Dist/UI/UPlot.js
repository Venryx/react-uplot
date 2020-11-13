import React, { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import { Assert, E } from "../Utils/FromJSVE";
export const UPlot = React.memo((props) => {
    let { divRef, chartRef, options, data, placeLegendBelowContainer } = props; // annoying, but needed to prevent memory leak (see: https://github.com/facebook/react/issues/18790#issuecomment-726394247)
    divRef = divRef !== null && divRef !== void 0 ? divRef : useRef(null);
    Assert(data == null || data.every(a => { var _a; return a.length == ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.length); }), () => `All data-arrays must have the same length. Got lengths: ${data.map(a => a.length).join(",")}`);
    const deps = [data, options, chartRef, divRef];
    useEffect(() => {
        //debugger;
        let chart = new uPlot(options, data, divRef.current);
        if (chartRef)
            chartRef.current = chart;
        return () => {
            if (chartRef)
                chartRef.current = null;
            chart.destroy();
            chart = null;
            // this is "improper", but it's the only easy way I know to solve all versions of the leak reliably! (ie. not knowing react-tree above this comp)
            // (Note: In debug mode, the memory leak occurs even with this hack, through "_debugOwner" prop. In prod mode, the hack below is... almost sufficient, though. [updateQueue go away!])
            //try {
            options = null;
            data = null;
            divRef = null;
            chartRef = null;
            deps.length = 0;
            /*	props.options = null as any;
                props.data = null as any;
            } catch (ex) {
                // typically, props object is frozen, so hack won't work -- this catch-block ignores the error
                // hack is still useful in my own projects, where I disable Object.freeze: https://stackoverflow.com/a/39253443/2441655
            }*/
        };
        //}, [data, options, chartRef, divRef]);
    }, deps);
    //}, [p.options, p.chartRef, divRef]);
    const randomID = `id_${Math.random().toString().replace(".", "")}`;
    const div = (React.createElement("div", { ref: divRef, style: E({ width: "100%", height: "100%" }, placeLegendBelowContainer && { height: "calc(100% + 33px)", pointerEvents: "none" }) }));
    if (placeLegendBelowContainer) {
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
