import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard-layout";
import { metricsData, videosData } from "@/lib/data";
import { Users, Heart, Video, Eye, TrendingUp } from "lucide-react";
import { WithdrawDialog } from "@/components/withdraw-dialog";

export default function DashboardPage() {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(metricsData.balance);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num;
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
              <span className="text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-4 w-4"><rect width="256" height="256" fill="none"></rect><path d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,32,32,0,0,1-32-32,8,8,0,0,1,16,0,16,16,0,0,0,16,16A8,8,0,0,1,144,176ZM120,96a20,20,0,1,1-20,20A20.1,20.1,0,0,1,120,96Z" fill="currentColor"></path></svg>
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formattedBalance}</div>
              <p className="text-xs text-muted-foreground">
                Available for withdrawal
              </p>
            </CardContent>
            <CardFooter>
              <WithdrawDialog />
            </CardFooter>
          </Card>
          <MetricCard title="Followers" value={formatNumber(metricsData.followers)} icon={<Users className="h-4 w-4" />} footerText="+20.1% from last month" />
          <MetricCard title="Total Likes" value={formatNumber(metricsData.likes)} icon={<Heart className="h-4 w-4" />} footerText="+18.1% from last month" />
          <MetricCard title="Videos" value={String(metricsData.videoCount)} icon={<Video className="h-4 w-4" />} footerText="+5 since last month" />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight font-headline">
            Recent Videos
          </h2>
          <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videosData.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MetricCard({ title, value, icon, footerText }: { title: string, value: string, icon: React.ReactNode, footerText: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-muted-foreground">{icon}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {footerText}
        </p>
      </CardContent>
    </Card>
  );
}

type VideoData = typeof videosData[0];

function VideoCard({ video }: { video: VideoData }) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            width={400}
            height={225}
            className="w-full object-cover aspect-video"
            data-ai-hint={video.thumbnailHint}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-base leading-tight truncate font-headline">{video.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{video.publishedAt}</p>
          <div className="flex items-center justify-start gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{new Intl.NumberFormat('en-US', { notation: 'compact' }).format(video.views)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{new Intl.NumberFormat('en-US', { notation: 'compact' }).format(video.likes)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
