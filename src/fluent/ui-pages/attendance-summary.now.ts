import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import attendancePage from '../../client/attendance-summary.html'

export const attendance_summary_page = UiPage({
    $id: Now.ID['attendance-summary-page'],
    name: 'Attendance Summary',
    endpoint: 'x_1599224_officehu_attendance_summary.do',
    description: 'Weekly attendance summary with timelines, check-in/check-out tracking, and summary statistics',
    category: 'general',
    html: attendancePage,
    direct: true
})