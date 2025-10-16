import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await axios.get('/api/dashboard');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard-page">
            <div className="welcome-banner">
                <div className="banner-text">
                    <h2>Welcome back, {user?.name || user?.email || 'Admin'}</h2>
                    <p>Here's what's happening in your campus today</p>
                </div>
                <div className="banner-actions">
                    <Link to="/students" className="btn btn-primary">Add Student</Link>
                    <Link to="/faculty" className="btn btn-primary">Add Faculty</Link>
                    <Link to="/reports" className="btn btn-outline">Reports</Link>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{stats?.total_departments ?? 0}</div>
                    <div className="stat-label">Total Departments</div>
                    <div className="stat-change">{stats?.dept_change_text || ''}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value">{stats?.total_faculty ?? 0}</div>
                    <div className="stat-label">Total Faculty</div>
                    <div className="stat-change">{stats?.faculty_change_text || ''}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value">{stats?.total_students ?? 0}</div>
                    <div className="stat-label">Total Students</div>
                    <div className="stat-change">{stats?.student_change_text || ''}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value">{stats?.active_semesters ?? 0}</div>
                    <div className="stat-label">Active Semesters</div>
                    <div className="stat-change">{stats?.current_term || ''}</div>
                </div>
            </div>

            <div className="action-cards">
                <div className="action-card">
                    <div className="action-icon"></div>
                    <h3>Manage Departments</h3>
                    <p>Add, edit, or remove academic departments</p>
                </div>
                <div className="action-card">
                    <div className="action-icon"></div>
                    <h3>Manage Faculty</h3>
                    <p>Add new faculty members and manage existing ones</p>
                </div>
                <div className="action-card">
                    <div className="action-icon"></div>
                    <h3>Manage Students</h3>
                    <p>Add new students and manage student records</p>
                </div>
            </div>
        </div>
    );
}
