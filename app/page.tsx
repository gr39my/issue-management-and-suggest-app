'use client'

import { useState, useEffect } from 'react'
import IssueForm from '../components/IssueForm'
import AISuggestion from '../components/AISuggestion'
import DepartmentDashboard from '../components/DepartmentDashboard'
import { fetchSuggestions, fetchDashboardData } from '../utils/api'

export default function Home() {
    const [suggestions, setSuggestions] = useState([])
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
    const [dashboardData, setDashboardData] = useState([])

    const handleSuggestionsRequest = async (description: string, department: string) => {
        setIsLoadingSuggestions(true)
        try {
            const data = await fetchSuggestions(description, department)
            setSuggestions(data)
        } catch (error) {
            console.error('Error fetching suggestions:', error)
        } finally {
            setIsLoadingSuggestions(false)
        }
    }

    const handleDashboardUpdate = async () => {
        try {
            const data = await fetchDashboardData()
            setDashboardData(data)
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        }
    }

    useEffect(() => {
        handleDashboardUpdate()
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">業務改善提案システム</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-2xl font-bold mb-4">課題登録</h2>
                    <IssueForm
                        onIssueCreated={handleDashboardUpdate}
                        onSuggestionsRequested={handleSuggestionsRequest}
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">AI提案</h2>
                    <AISuggestion suggestions={suggestions} isLoading={isLoadingSuggestions} />
                </div>
            </div>
            <div className="mt-8">
                <DepartmentDashboard data={dashboardData} />
            </div>
        </div>
    )
}

