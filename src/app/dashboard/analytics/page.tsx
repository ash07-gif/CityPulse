
'use client';

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts";
import issuesData from "@/lib/mock-data";
import { IssueCategory } from "@/lib/types";

const resolutionTrendsData = [
    { month: "Jan", resolved: 18, pending: 8 },
    { month: "Feb", resolved: 30, pending: 20 },
    { month: "Mar", resolved: 23, pending: 12 },
    { month: "Apr", resolved: 7, pending: 19 },
    { month: "May", resolved: 20, pending: 13 },
    { month: "Jun", resolved: 21, pending: 14 },
    { month: "Jul", resolved: 35, pending: 10 },
];

const resolutionChartConfig = {
    resolved: {
        label: "Resolved",
        color: "hsl(var(--chart-2))",
    },
    pending: {
        label: "Pending",
        color: "hsl(var(--chart-5))",
    },
} as const;

const categoryChartConfig = {
    Road: { label: "Road", color: "hsl(var(--chart-1))" },
    Lighting: { label: "Lighting", color: "hsl(var(--chart-2))" },
    Water: { label: "Water", color: "hsl(var(--chart-3))" },
    Sanitation: { label: "Sanitation", color: "hsl(var(--chart-4))" },
    Others: { label: "Others", color: "hsl(var(--chart-5))" },
} as const;


export default function AnalyticsPage() {
    const categoryDistributionData = useMemo(() => {
        const counts = issuesData.reduce((acc, issue) => {
            acc[issue.category] = (acc[issue.category] || 0) + 1;
            return acc;
        }, {} as Record<IssueCategory, number>);

        return Object.entries(counts).map(([name, value]) => ({
            name: name as IssueCategory,
            value,
            fill: `var(--color-${name.toLowerCase()})`
        }));
    }, []);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Analytics Dashboard</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Resolution Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={resolutionChartConfig} className="min-h-[300px] w-full">
                        <RechartsBarChart accessibilityLayer data={resolutionTrendsData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="resolved" fill="var(--color-resolved)" radius={4} />
                            <Bar dataKey="pending" fill="var(--color-pending)" radius={4} />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={categoryChartConfig} className="min-h-[300px] w-full aspect-square">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="value" hideLabel />} />
                            <Pie
                                data={categoryDistributionData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={140}
                                paddingAngle={2}
                            >
                                {categoryDistributionData.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={entry.fill} className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" />
                                ))}
                            </Pie>
                            <ChartLegend
                                content={<ChartLegendContent nameKey="name" />}
                                className="mt-4 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
