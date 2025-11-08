
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Upload } from "lucide-react";
import { useState } from "react";

export default function ReportIssuePage() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const { toast } = useToast();
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    toast({
                        variant: 'destructive',
                        title: 'Location Error',
                        description: 'Could not retrieve your location. Please ensure you have granted location permissions.',
                    });
                }
            );
        } else {
            toast({
                variant: 'destructive',
                title: 'Location Not Supported',
                description: 'Geolocation is not supported by your browser.',
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold font-headline">Report a New Issue</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Issue Details</CardTitle>
                    <CardDescription>Please provide as much detail as possible.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="e.g., Large pothole on Main St" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe the issue in detail" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="road">Road</SelectItem>
                                <SelectItem value="lighting">Lighting</SelectItem>
                                <SelectItem value="water">Water</SelectItem>
                                <SelectItem value="sanitation">Sanitation</SelectItem>
                                <SelectItem value="others">Others</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Attach Photo(s)</Label>
                        <div className="flex items-center justify-center w-full">
                            <Label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-background">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                </div>
                                <Input id="dropzone-file" type="file" className="hidden" />
                            </Label>
                        </div> 
                    </div>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Location</Label>
                            <Button variant="outline" size="sm" onClick={handleLocation}>
                                <MapPin className="mr-2 h-4 w-4" />
                                Use Current Location
                            </Button>
                        </div>
                        <div className="h-64 w-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground overflow-hidden">
                           {googleMapsApiKey && googleMapsApiKey !== "YOUR_API_KEY_HERE" && location ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={`https://www.google.com/maps/embed/v1/view?key=${googleMapsApiKey}&center=${location.lat},${location.lng}&zoom=18`}
                                ></iframe>
                           ) : (
                             <div className="flex flex-col items-center justify-center text-center p-4">
                                <MapPin className="w-8 h-8 mr-2"/>
                                {googleMapsApiKey === "YOUR_API_KEY_HERE" || !googleMapsApiKey ? (
                                    <p>Please add your Google Maps API key to the <code className='font-mono bg-background p-1 rounded'>.env.local</code> file.</p>
                                ) : (
                                    <p>Please provide your location by clicking the button above.</p>
                                )}
                             </div>
                           )}
                        </div>
                    </div>
                    <Button size="lg" className="w-full">Submit Issue</Button>
                </CardContent>
            </Card>
        </div>
    )
}
