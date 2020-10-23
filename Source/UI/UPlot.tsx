import React, {useEffect, useRef} from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import {Assert, E} from "../Utils/FromJSVE";

export const UPlot = React.memo((p: {
	divRef?: React.RefObject<HTMLDivElement>, chartRef?: React.MutableRefObject<uPlot|null>,
	options: uPlot.Options, data: uPlot.AlignedData,
	placeLegendBelowContainer?: boolean,
})=>{
	const divRef = p.divRef ?? useRef<HTMLDivElement>(null);
	Assert(p.data == null || p.data.every(a=>a.length == p.data[0]?.length), ()=>`All data-arrays must have the same length. Got lengths: ${p.data.map(a=>a.length).join(",")}`);

	useEffect(()=>{
		//debugger;
		const chart = new uPlot(p.options, p.data, divRef.current!);
		if (p.chartRef) p.chartRef.current = chart;
		return ()=>{
			if (p.chartRef) p.chartRef.current = null;
			chart.destroy();
		};
	}, [p.data, p.options, p.chartRef, divRef]);

	const randomID = `id_${Math.random().toString().replace(".", "")}`;

	const div = (
		<div ref={divRef} style={E(
			{width: "100%", height: "100%"},
			p.placeLegendBelowContainer && {height: "calc(100% + 33px)", pointerEvents: "none"} as const,
		)}/>
	);
	if (p.placeLegendBelowContainer) {
		return (
			<div id={randomID} style={{width: "100%", height: "100%"}}>
				<style>{`
					#${randomID} .u-wrap {
						pointer-events: auto;
					}
					#${randomID} .u-legend > tr {
						pointer-events: auto;
					}
				`}</style>
				{div}
			</div>
		);
	}
	return div;
});