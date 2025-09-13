import { memo, useMemo } from 'react';
import { LineChart } from "@mui/x-charts/LineChart";

const NumberChart = memo(function NumberChart({ currentNumber }: { currentNumber: number }) {

    const xAxis = useMemo(() => [
        {
            data: [1, 2, 3, 5, 8, 10],
        },
    ], []);

    const series = useMemo(() => [
        {
            data: [1.12197108, 1.10484178, 2.13487342, 1.13580827, 2.12841215, currentNumber],
            area: true,
            color: "#ff7f0e",
            areaColor: "#ffbb78",
        },
    ], [currentNumber]);

    return (
        <>
            <LineChart
                xAxis={xAxis}
                series={series}
                width={600}
                height={300}
            />
        </>
    );
});

export default NumberChart;

export { NumberChart };
