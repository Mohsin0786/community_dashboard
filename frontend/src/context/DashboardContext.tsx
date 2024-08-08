import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';
import {
  fetchSummaryMetrics,
  fetchMemberMetrics,
  fetchTopContributors,
  fetchGrowthRate,
  fetchEngagementRate,
  SummaryMetrics,
  MemberMetrics,
  Contributor,
  GrowthRate,
  EngagementRate
} from '../api';

interface DashboardContextProps {
  summary: SummaryMetrics | null;
  members: MemberMetrics | null;
  topContributors: Contributor[];
  growthRate: GrowthRate[];
  engagementRate: EngagementRate[];
  loading: boolean;
  error: string | null;
}

const defaultContextValue: DashboardContextProps = {
  summary: null,
  members: null,
  topContributors: [],
  growthRate: [],
  engagementRate: [],
  loading: true,
  error: null
};

export const DashboardContext = createContext<DashboardContextProps>(defaultContextValue);

interface DashboardProviderProps {
  children: ReactNode;
}



export const DashboardProvider: FC<DashboardProviderProps> = ({ children }) => {
  const [summary, setSummary] = useState<SummaryMetrics | null>(null);
  const [members, setMembers] = useState<MemberMetrics | null>(null);
  const [topContributors, setTopContributors] = useState<Contributor[]>([]);
  const [growthRate, setGrowthRate] = useState<GrowthRate[]>([]);
  const [engagementRate, setEngagementRate] = useState<EngagementRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("fetcheddd")
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {

        const [summaryRes, membersRes, topContributorsRes, growthRateRes, engagementRateRes] = await Promise.all([
          fetchSummaryMetrics(),
          fetchMemberMetrics(),
          fetchTopContributors(),
          fetchGrowthRate(),
          fetchEngagementRate()

        ]);

        // console.log(growthRateRes.data)
       
        setSummary(summaryRes.data);
        setMembers(membersRes.data);
        setTopContributors(topContributorsRes.data.topContributors);
        setGrowthRate(growthRateRes.data.growthRate);
        setEngagementRate(engagementRateRes.data.engagementRate);
      } catch (err:any) {
        console.log("fetcheddd")
        // Improved error handling
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          console.log("fetcheddd")
          setError('Error fetching metrics');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once

  return (
    <DashboardContext.Provider
      value={{
        summary,
        members,
        topContributors,
        growthRate,
        engagementRate,
        loading,
        error
      }}>
      {children}
    </DashboardContext.Provider>
  );
};


