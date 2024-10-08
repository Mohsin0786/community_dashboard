import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

console.log("BASE",import.meta.env)

export interface SummaryMetrics {
    totalMembers: number;
    totalMessages: number;
   
}

export interface MemberMetrics {
    activeMembersCount: number;
   
    inactiveMembersCount: number
}

export interface Contributor {
    username: string;
    messageCount: number;
}

export interface GrowthRate {
    date: string;
    newMembers: number;
    totalMembers: number;
}

export interface EngagementRate {
    date: string;
    messages:Number
}

export const fetchSummaryMetrics = () => axios.get<SummaryMetrics>(`${API_BASE_URL}/community/summary`);
export const fetchMemberMetrics = () => axios.get<MemberMetrics>(`${API_BASE_URL}/community/members`);
export const fetchTopContributors = () => axios.get<{ topContributors: Contributor[] }>(`${API_BASE_URL}/community/top-contributors`);
export const fetchGrowthRate = () => axios.get<{ growthRate: GrowthRate[] }>(`${API_BASE_URL}/community/growth-rate`);
export const fetchEngagementRate = () => axios.get<{ engagementRate: EngagementRate[] }>(`${API_BASE_URL}/community/engagement-rate`);
