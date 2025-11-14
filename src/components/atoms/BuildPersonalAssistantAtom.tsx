import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface BuildPersonalAssistantAtomProps {
  title: string;
  description: string;
  duration: string;
}

const BuildPersonalAssistantAtom = ({ 
  title, 
  description, 
  duration 
}: BuildPersonalAssistantAtomProps) => {
  const handleStart = () => {
    console.log("Starting BuildPersonalAssistantAtom");
    // Placeholder - wire up later
  };

  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Interactive
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {duration}
          </div>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleStart} className="w-full">
          Start
        </Button>
      </CardContent>
    </Card>
  );
};

export default BuildPersonalAssistantAtom;
