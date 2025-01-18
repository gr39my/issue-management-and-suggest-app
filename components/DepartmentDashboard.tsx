'use client'

import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

interface DashboardData {
    department: string
    issueCount: number
    resolvedCount: number
}

interface DepartmentDashboardProps {
    data: DashboardData[]
}

export default function DepartmentDashboard({ data }: DepartmentDashboardProps) {
    const [chartData, setChartData] = useState({ datasets: [] })
    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setChartData({
            labels: data.map(item => item.department),
            datasets: [
                {
                    label: '課題数',
                    data: data.map(item => item.issueCount),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: '解決済み',
                    data: data.map(item => item.resolvedCount),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        })

        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: '部門別課題状況',
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        })
    }, [data])

    return (
        <Card>
            <CardHeader>
                <CardTitle>部門別ダッシュボード</CardTitle>
            </CardHeader>
            <CardContent>
                <Bar options={chartOptions} data={chartData} />
            </CardContent>
        </Card>
    )
}

