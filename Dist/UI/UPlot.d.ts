import React from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
export declare function UPlot(p: {
    chartRef?: React.MutableRefObject<uPlot | null>;
    options: uPlot.Options;
    data: uPlot.AlignedData;
    placeLegendBelowContainer: boolean;
}): JSX.Element;
