import React, {useEffect, useRef} from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

export function UPlot(p: {options: uPlot.Options, data: uPlot.AlignedData}) {
	const plotRef = useRef<HTMLDivElement>(null);

	useEffect(()=>{
		const chart = new uPlot(p.options, p.data, plotRef.current!);
	}, [p.data, p.options]);

	return (
		<div ref={plotRef}/>
	);
}