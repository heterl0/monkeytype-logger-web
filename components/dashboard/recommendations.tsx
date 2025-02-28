"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MonkeyTypeData } from "@/lib/data-processing";
import { Separator } from "@/components/ui/separator";

interface RecommendationsProps {
  data: MonkeyTypeData;
}

export function Recommendations({ data }: RecommendationsProps) {
  const { recommendations } = data;
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {recommendations.map((recommendation, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{recommendation.category}</CardTitle>
            <CardDescription>
              Personalized suggestions based on your typing patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendation.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
      
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Improvement Path</CardTitle>
          <CardDescription>
            Recommended progression for improving your typing skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-medium">Focus on Accuracy</h3>
              <p className="text-sm text-muted-foreground">Master precision before speed</p>
            </div>
            
            <Separator className="hidden md:block h-0.5 w-8 bg-primary/20" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-medium">Target Problem Words</h3>
              <p className="text-sm text-muted-foreground">Practice your challenging words</p>
            </div>
            
            <Separator className="hidden md:block h-0.5 w-8 bg-primary/20" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-medium">Build Muscle Memory</h3>
              <p className="text-sm text-muted-foreground">Develop consistent finger patterns</p>
            </div>
            
            <Separator className="hidden md:block h-0.5 w-8 bg-primary/20" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-medium">Increase Speed</h3>
              <p className="text-sm text-muted-foreground">Gradually build up typing speed</p>
            </div>
            
            <Separator className="hidden md:block h-0.5 w-8 bg-primary/20" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <span className="font-bold">5</span>
              </div>
              <h3 className="font-medium">Regular Assessment</h3>
              <p className="text-sm text-muted-foreground">Track progress and adjust practice</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}