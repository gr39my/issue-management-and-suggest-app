import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Suggestion {
    tool: string
    description: string
}

interface AISuggestionProps {
    suggestions: Suggestion[]
    isLoading: boolean
}

export default function AISuggestion({ suggestions, isLoading }: AISuggestionProps) {
    if (isLoading) {
        return <div className="text-center">提案を生成中...</div>
    }

    if (suggestions.length === 0) {
        return <div className="text-center">課題を登録すると、AIが改善提案を生成します。</div>
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">AI提案</h2>
            {suggestions.map((suggestion, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>{suggestion.tool}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{suggestion.description}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

