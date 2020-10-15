import React, {useEffect, useRef} from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

export function UPlot(p: {chartRef?: React.MutableRefObject<uPlot|null>, options: uPlot.Options, data: uPlot.AlignedData}) {
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(()=>{
		const chart = new uPlot(p.options, p.data, divRef.current!);
		if (p.chartRef) p.chartRef.current = chart;
		return ()=>{
			if (p.chartRef) p.chartRef.current = null;
			chart.destroy();
		};
	}, [p.data, p.options, p.chartRef]);

	return (
		<div ref={divRef}/>
	);
}