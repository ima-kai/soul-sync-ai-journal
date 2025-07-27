import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SoulStats = () => {
  const stats = [
    {
      label: "Entries this week",
      value: "7",
      icon: "📝"
    },
    {
      label: "Mood streak",
      value: "5 days",
      icon: "😊"
    },
    {
      label: "Future conversations",
      value: "23",
      icon: "✨"
    }
  ];

  return (
    <Card className="bg-card/60 backdrop-blur-lg border-border/50 shadow-dreamy">
      <CardHeader>
        <CardTitle className="text-lg gradient-soul bg-clip-text text-transparent">
          Your Soul Journey
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <span className="font-semibold text-foreground">{stat.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SoulStats;