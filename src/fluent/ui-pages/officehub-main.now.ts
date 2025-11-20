import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import officeHubPage from '../../client/index.html'

export const officehub_main_page = UiPage({
    $id: Now.ID['officehub-main-page'],
    name: 'OfficeHub Main Application',
    endpoint: 'x_1599224_officehu_main.do',
    description: 'Main OfficeHub employee portal with dashboard, attendance, leave management, and more',
    category: 'general',
    html: officeHubPage,
    direct: true
})