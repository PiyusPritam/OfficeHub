import '@servicenow/sdk/global'
import { 
    Table, 
    StringColumn, 
    IntegerColumn, 
    BooleanColumn,
    ReferenceColumn,
    DateTimeColumn 
} from '@servicenow/sdk/core'

// Wellness Resource table for educational content and wellness materials
export const x_1599224_officehu_wellness_resource = Table({
    name: 'x_1599224_officehu_wellness_resource',
    label: 'Wellness Resource',
    schema: {
        resource_title: StringColumn({
            label: 'Resource Title',
            mandatory: true,
            maxLength: 300
        }),
        resource_description: StringColumn({
            label: 'Resource Description',
            maxLength: 2000
        }),
        resource_type: StringColumn({
            label: 'Resource Type',
            choices: {
                article: { label: 'Article', sequence: 0 },
                video: { label: 'Video', sequence: 1 },
                infographic: { label: 'Infographic', sequence: 2 },
                podcast: { label: 'Podcast', sequence: 3 },
                webinar: { label: 'Webinar', sequence: 4 },
                ebook: { label: 'E-book', sequence: 5 },
                checklist: { label: 'Checklist', sequence: 6 },
                guide: { label: 'Step-by-step Guide', sequence: 7 },
                template: { label: 'Template', sequence: 8 },
                app_recommendation: { label: 'App Recommendation', sequence: 9 },
                expert_tips: { label: 'Expert Tips', sequence: 10 }
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
            maxLength: 50
        }),
        category: StringColumn({
            label: 'Category',
            choices: {
                fitness: { label: 'Fitness & Exercise', sequence: 0 },
                nutrition: { label: 'Nutrition & Diet', sequence: 1 },
                mental_health: { label: 'Mental Health', sequence: 2 },
                stress_management: { label: 'Stress Management', sequence: 3 },
                sleep: { label: 'Sleep & Recovery', sequence: 4 },
                mindfulness: { label: 'Mindfulness & Meditation', sequence: 5 },
                work_life_balance: { label: 'Work-Life Balance', sequence: 6 },
                preventive_care: { label: 'Preventive Care', sequence: 7 },
                ergonomics: { label: 'Workplace Ergonomics', sequence: 8 },
                team_wellness: { label: 'Team Wellness', sequence: 9 },
                chronic_conditions: { label: 'Chronic Conditions', sequence: 10 },
                general_wellness: { label: 'General Wellness', sequence: 11 }
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
            maxLength: 50
        }),
        difficulty_level: StringColumn({
            label: 'Difficulty Level',
            choices: {
                beginner: { label: 'Beginner', sequence: 0 },
                intermediate: { label: 'Intermediate', sequence: 1 },
                advanced: { label: 'Advanced', sequence: 2 },
                all_levels: { label: 'All Levels', sequence: 3 }
            },
            dropdown: 'dropdown_with_none',
            default: 'all_levels',
            maxLength: 20
        }),
        duration_minutes: IntegerColumn({
            label: 'Duration (Minutes)',
            min: 1
        }),
        author: StringColumn({
            label: 'Author/Creator',
            maxLength: 200
        }),
        source_organization: StringColumn({
            label: 'Source Organization',
            maxLength: 200
        }),
        external_url: StringColumn({
            label: 'External URL',
            maxLength: 2000
        }),
        internal_content: StringColumn({
            label: 'Internal Content',
            maxLength: 10000
        }),
        tags: StringColumn({
            label: 'Tags (comma-separated)',
            maxLength: 1000
        }),
        is_featured: BooleanColumn({
            label: 'Featured Resource',
            default: 'false'
        }),
        is_premium: BooleanColumn({
            label: 'Premium Content',
            default: 'false'
        }),
        requires_login: BooleanColumn({
            label: 'Requires External Login',
            default: 'false'
        }),
        is_active: BooleanColumn({
            label: 'Active',
            default: 'true'
        }),
        view_count: IntegerColumn({
            label: 'View Count',
            default: '0',
            read_only: true
        }),
        like_count: IntegerColumn({
            label: 'Like Count',
            default: '0',
            read_only: true
        }),
        rating_average: IntegerColumn({
            label: 'Average Rating',
            default: '0',
            read_only: true,
            min: 0,
            max: 5
        }),
        published_date: DateTimeColumn({
            label: 'Published Date'
        }),
        last_updated: DateTimeColumn({
            label: 'Last Updated'
        }),
        added_by: ReferenceColumn({
            label: 'Added By',
            referenceTable: 'sys_user',
            mandatory: true
        }),
        target_audience: StringColumn({
            label: 'Target Audience',
            choices: {
                all_employees: { label: 'All Employees', sequence: 0 },
                managers: { label: 'Managers', sequence: 1 },
                remote_workers: { label: 'Remote Workers', sequence: 2 },
                new_employees: { label: 'New Employees', sequence: 3 },
                seniors: { label: 'Senior Employees (50+)', sequence: 4 },
                wellness_champions: { label: 'Wellness Champions', sequence: 5 },
                high_stress_roles: { label: 'High-Stress Roles', sequence: 6 }
            },
            dropdown: 'dropdown_with_none',
            default: 'all_employees',
            maxLength: 30
        }),
        language: StringColumn({
            label: 'Language',
            default: 'English',
            maxLength: 50
        })
    },
    display: 'resource_title',
    extensible: false,
    accessible_from: 'package_private',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true,
    audit: true,
    text_index: true
})