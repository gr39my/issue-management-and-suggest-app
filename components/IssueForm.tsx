import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createIssue } from '../utils/api'

interface IssueFormProps {
    onIssueCreated: () => void;
    onSuggestionsRequested: (description: string, department: string) => void;
}

export default function IssueForm({ onIssueCreated, onSuggestionsRequested }: IssueFormProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [department, setDepartment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await createIssue({ title, description, department })
            setTitle('')
            setDescription('')
            setDepartment('')
            onIssueCreated()
            onSuggestionsRequested(description, department)
        } catch (error) {
            console.error('Error creating issue:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">課題タイトル</label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">課題の詳細</label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">部門</label>
                <Select onValueChange={setDepartment} required>
                    <SelectTrigger>
                        <SelectValue placeholder="部門を選択" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sales">営業部</SelectItem>
                        <SelectItem value="marketing">マーケティング部</SelectItem>
                        <SelectItem value="engineering">エンジニアリング部</SelectItem>
                        <SelectItem value="hr">人事部</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '送信中...' : '課題を登録'}
            </Button>
        </form>
    )
}

