import {Routes, Route, Navigate} from 'react-router'
import DashboardsPage from '../pages/DashboardsPage.jsx'
import CheckListPage from '../pages/ChecklistPage.jsx'
import OfficeChatPage from '../pages/OfficeChatPage.jsx'
import Checklist2Page from '../pages/Checklist2Page.jsx'

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/checklist" replace/>}/>
            <Route path="/checklist" element={<CheckListPage/>}/>
            <Route path="/checklist-2" element={<Checklist2Page/>}/>
            <Route path="/office-chat" element={<OfficeChatPage/>}/>
            <Route path="/dashboards" element={<DashboardsPage/>}/>
        </Routes>
    )
}