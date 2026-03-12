"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Clock,
  MousePointer,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Demo analytics data
const statsData = {
  overview: {
    totalViews: 1245890,
    uniqueVisitors: 456780,
    avgSessionDuration: "3m 45s",
    bounceRate: "42.3%",
    pageViews: 2345678,
    adsClickRate: "3.2%",
  },
  trends: {
    views: +12.5,
    visitors: +8.3,
    duration: +5.2,
    bounce: -3.1,
  },
};

const topArticles = [
  { id: "1", title: "GTA 6 Resmi Rilis Maret 2026!", views: 89420, trend: +23.5 },
  { id: "2", title: "Pemilu Legislatif 2026: Quick Count", views: 125670, trend: +45.2 },
  { id: "3", title: "MA Tetapkan Putusan UU ITE", views: 98760, trend: +18.9 },
  { id: "4", title: "iPhone 17 Pro Resmi Dirilis!", views: 15420, trend: +12.3 },
  { id: "5", title: "BMKG Peringatan Banjir Jakarta", views: 156780, trend: +67.8 },
];

const topCategories = [
  { name: "Politik", views: 345670, percentage: 28 },
  { name: "Teknologi", views: 289450, percentage: 23 },
  { name: "Hukum", views: 198760, percentage: 16 },
  { name: "Sosial", views: 167890, percentage: 13 },
  { name: "Gaming", views: 123450, percentage: 10 },
  { name: "AI Tools", views: 78900, percentage: 6 },
  { name: "Tips & Trik", views: 56780, percentage: 4 },
];

const deviceData = [
  { device: "Mobile", icon: Smartphone, percentage: 62, users: 283204 },
  { device: "Desktop", icon: Monitor, percentage: 28, users: 127898 },
  { device: "Tablet", icon: Tablet, percentage: 10, users: 45678 },
];

const trafficSources = [
  { source: "Google Search", percentage: 45, users: 205551 },
  { source: "Direct", percentage: 22, users: 100492 },
  { source: "Facebook", percentage: 15, users: 68517 },
  { source: "Twitter", percentage: 10, users: 45678 },
  { source: "Other", percentage: 8, users: 36542 },
];

const recentActivity = [
  { time: "2 menit lalu", event: "Artikel baru dibaca", article: "GTA 6 Resmi Rilis", location: "Jakarta" },
  { time: "5 menit lalu", event: "Subscriber baru", article: "-", location: "Bandung" },
  { time: "8 menit lalu", event: "Komentar baru", article: "Pemilu Legislatif", location: "Surabaya" },
  { time: "12 menit lalu", event: "Artikel dishare", article: "MA Tetapkan Putusan", location: "Medan" },
  { time: "15 menit lalu", event: "Ad click", article: "iPhone 17 Pro", location: "Yogyakarta" },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display">Analytics</h1>
          <p className="text-muted-foreground">Pantau performa website dan konten</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">24 Jam Terakhir</SelectItem>
            <SelectItem value="7d">7 Hari Terakhir</SelectItem>
            <SelectItem value="30d">30 Hari Terakhir</SelectItem>
            <SelectItem value="90d">90 Hari Terakhir</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-5 h-5 text-teal-600" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                {statsData.trends.views}%
              </Badge>
            </div>
            <p className="text-2xl font-bold">{formatNumber(statsData.overview.totalViews)}</p>
            <p className="text-xs text-muted-foreground">Total Views</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-orange-500" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                {statsData.trends.visitors}%
              </Badge>
            </div>
            <p className="text-2xl font-bold">{formatNumber(statsData.overview.uniqueVisitors)}</p>
            <p className="text-xs text-muted-foreground">Unique Visitors</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-cyan-600" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                {statsData.trends.duration}%
              </Badge>
            </div>
            <p className="text-2xl font-bold">{statsData.overview.avgSessionDuration}</p>
            <p className="text-xs text-muted-foreground">Avg. Duration</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-purple-500" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                <TrendingDown className="w-3 h-3 mr-1" />
                {Math.abs(statsData.trends.bounce)}%
              </Badge>
            </div>
            <p className="text-2xl font-bold">{statsData.overview.bounceRate}</p>
            <p className="text-xs text-muted-foreground">Bounce Rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold">{formatNumber(statsData.overview.pageViews)}</p>
            <p className="text-xs text-muted-foreground">Page Views</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <MousePointer className="w-5 h-5 text-rose-500" />
            </div>
            <p className="text-2xl font-bold">{statsData.overview.adsClickRate}</p>
            <p className="text-xs text-muted-foreground">Ads CTR</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Traffic Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                Traffic Overview
              </CardTitle>
              <CardDescription>Pengunjung dan page views dalam periode terpilih</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-teal-300 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Integrasi dengan Google Analytics untuk data real-time
                  </p>
                  <Badge className="mt-2">Coming Soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Articles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-orange-500" />
                Artikel Terpopuler
              </CardTitle>
              <CardDescription>Artikel dengan views tertinggi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topArticles.map((article, index) => (
                  <div key={article.id} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{article.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{formatNumber(article.views)} views</span>
                        <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                          +{article.trend}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Kategori Terpopuler</CardTitle>
              <CardDescription>Distribusi views per kategori</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCategories.map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-muted-foreground">{cat.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar Stats */}
        <div className="space-y-6">
          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Perangkat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceData.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.device} className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.device}</span>
                          <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{formatNumber(item.users)} users</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Sumber Traffic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trafficSources.map((source) => (
                  <div key={source.source} className="flex items-center justify-between">
                    <span className="text-sm">{source.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{source.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.event}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.article !== "-" ? activity.article : ""} • {activity.location}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
