import React, {useEffect, useRef} from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import {Assert, E} from "../Utils/FromJSVE.js";

export const UPlot = React.memo((props: {
	divRef?: React.RefObject<HTMLDivElement>, chartRef?: React.MutableRefObject<uPlot|null>,
	options: uPlot.Options, data: uPlot.AlignedData,
	placeLegendBelowContainer?: boolean, ignoreDoubleClick?: boolean,
})=>{
	// destructuring is pretty redundant (vs props.X), but is a step toward avoiding the memory-leak of data/options (see: https://github.com/facebook/react/issues/18790#issuecomment-726394247)
	let {divRef, chartRef, options, data, placeLegendBelowContainer, ignoreDoubleClick} = props;
	divRef = divRef ?? useRef<HTMLDivElement>(null);
	Assert(data == null || data.every(a=>a.length == data[0]?.length), ()=>`All data-arrays must have the same length. Got lengths: ${data.map(a=>a.length).join(",")}`);

	const deps = [data, options, chartRef, divRef];
	useEffect(()=>{
		let chart: uPlot|null = new uPlot(options, data, divRef!.current!);
		if (chartRef) chartRef.current = chart;

		if (ignoreDoubleClick && divRef?.current && !divRef.current["dblClickIgnoreSet"]) {
			divRef.current["dblClickIgnoreSet"] = true;
			divRef.current.addEventListener("dblclick", e=>{
				e.stopPropagation();
			}, {capture: true});
		}

		return ()=>{
			if (chartRef) chartRef.current = null;
			chart!.destroy();
			chart = null;

			// this is "improper", but it's the only easy way I know to solve all versions of the leak reliably! (ie. not knowing react-tree above this comp)
			// (Note: In debug mode, the memory leak occurs even with this hack, through "_debugOwner" prop. In prod mode, the hack below is... almost sufficient, though. [updateQueue go away!])
			//try {
			options = null as any;
			data = null as any;
			divRef = null as any;
			chartRef = null as any;
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

	const randomID = `id_${Math.random().toString().replace(".", "")}`;

	const div = (
		<div ref={divRef} style={E(
			{width: "100%", height: "100%"},
			placeLegendBelowContainer && {height: "calc(100% + 33px)", pointerEvents: "none"} as const,
		)}/>
	);
	if (placeLegendBelowContainer) {
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