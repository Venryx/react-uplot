import React from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
export declare const UPlot: React.MemoExoticComponent<(props: {
    divRef?: React.RefObject<HTMLDivElement>;
    chartRef?: React.MutableRefObject<uPlot | null>;
    options: uPlot.Options;
    data: uPlot.AlignedData;
    placeLegendBelowContainer?: boolean;
    ignoreDoubleClick?: boolean;
}) => React.JSX.Element>;
