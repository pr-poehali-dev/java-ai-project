import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface DashboardTabProps {
  metrics: Array<{ label: string; value: string; change: string; trend: string }>;
  generatedVideos: Array<{ id: number; title: string; duration: string; resolution: string; status: string; thumbnail: string; date: string }>;
  models: Array<{ id: number; name: string; type: string; status: string; accuracy: number; epoch: number; totalEpochs: number }>;
}

const DashboardTab = ({ metrics, generatedVideos, models }: DashboardTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm">{metric.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium',
                    metric.trend === 'up' ? 'text-green-600' : 'text-blue-600'
                  )}
                >
                  <Icon name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Video" size={20} className="text-primary" />
              Недавние видео
            </CardTitle>
            <CardDescription>Последние сгенерированные видео</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedVideos.slice(0, 3).map((video) => (
                <div
                  key={video.id}
                  className="p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-3xl">
                      {video.thumbnail}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground">{video.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {video.duration} • {video.resolution}
                      </p>
                    </div>
                    <Badge variant={video.status === 'completed' ? 'secondary' : 'default'}>
                      {video.status === 'completed' ? 'Готово' : 'Обработка'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Box" size={20} className="text-secondary" />
              Активные модели
            </CardTitle>
            <CardDescription>3 модели в работе</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {models.map((model) => (
                <div
                  key={model.id}
                  className="p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-card-foreground">{model.name}</h4>
                      <p className="text-sm text-muted-foreground">{model.type}</p>
                    </div>
                    <Badge
                      variant={
                        model.status === 'training'
                          ? 'default'
                          : model.status === 'completed'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {model.status === 'training' && 'Обучается'}
                      {model.status === 'completed' && 'Завершено'}
                      {model.status === 'idle' && 'Ожидание'}
                    </Badge>
                  </div>
                  {model.status === 'training' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Эпоха {model.epoch}/{model.totalEpochs}
                        </span>
                        <span className="font-medium">{model.accuracy}%</span>
                      </div>
                      <Progress value={(model.epoch / model.totalEpochs) * 100} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardTab;
