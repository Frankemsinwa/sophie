
'use client';

import { useState } from 'react';
import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { videosData } from '@/lib/data';
import { Eye, Heart, ListFilter, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type VideoData = typeof videosData[0];

export default function VideosPage() {
    const [filteredVideos, setFilteredVideos] = useState(videosData);
    
    // Dummy filter logic
    const handleFilterChange = () => {
        // In a real app, you would apply filters here
        setFilteredVideos(videosData);
    }

    return (
        <DashboardLayout>
            <div className="grid flex-1 md:grid-cols-[250px_1fr]">
                <div className="hidden flex-col border-r bg-card p-4 md:flex">
                    <div className="mb-4 flex items-center gap-2">
                        <ListFilter className="h-5 w-5" />
                        <h2 className="text-lg font-bold tracking-tight">Filters</h2>
                    </div>
                    
                    <div className="flex-1 space-y-6">
                        <div>
                            <Label htmlFor="search" className="mb-2 block font-semibold">Search</Label>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input id="search" placeholder="Search videos..." className="pl-8" />
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-2 font-semibold">Sort By</h3>
                            <Select defaultValue="newest">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                    <SelectItem value="views">Most Views</SelectItem>
                                    <SelectItem value="likes">Most Likes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div>
                            <h3 className="mb-2 font-semibold">Categories</h3>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="gaming" />
                                    <label htmlFor="gaming" className="text-sm font-medium leading-none">Gaming</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="podcast" />
                                    <label htmlFor="podcast" className="text-sm font-medium leading-none">Podcast</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="travel" />
                                    <label htmlFor="travel" className="text-sm font-medium leading-none">Travel</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="cooking" />
                                    <label htmlFor="cooking" className="text-sm font-medium leading-none">Cooking</label>
                                </div>
                            </div>
                        </div>

                        <Button onClick={handleFilterChange} className="w-full">Apply Filters</Button>
                    </div>
                </div>
                <div className="p-4 md:p-8">
                    <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
                        My Videos
                    </h1>
                    <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                        {filteredVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}


function VideoCard({ video }: { video: VideoData }) {
  return (
    <Dialog>
      <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
        <DialogTrigger asChild>
          <div className="cursor-pointer">
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
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="secondary">Watch Now</Button>
                </div>
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
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            width={1280}
            height={720}
            className="w-full object-contain rounded-lg"
          />
        </DialogContent>
      </Card>
    </Dialog>
  );
}
