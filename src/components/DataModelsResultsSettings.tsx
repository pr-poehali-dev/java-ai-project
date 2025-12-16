import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface DataModelsResultsSettingsProps {
  activeTab: string;
  models: Array<{ id: number; name: string; type: string; status: string; accuracy: number; epoch: number; totalEpochs: number }>;
  datasets: Array<{ id: number; name: string; type: string; size: string; records: number; status: string }>;
}

const DataModelsResultsSettings = ({ activeTab, models, datasets }: DataModelsResultsSettingsProps) => {
  if (activeTab === 'models') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <Card key={model.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{model.name}</CardTitle>
                <Badge variant="outline">{model.type}</Badge>
              </div>
              <CardDescription>Neural Network Architecture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Статус</span>
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
                {model.accuracy > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Точность</span>
                    <span className="font-semibold">{model.accuracy}%</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Эпохи</span>
                  <span className="font-mono">
                    {model.epoch}/{model.totalEpochs}
                  </span>
                </div>
              </div>
              {model.status === 'training' && (
                <Progress value={(model.epoch / model.totalEpochs) * 100} className="h-2" />
              )}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 gap-2">
                  <Icon name="Play" size={14} />
                  Запустить
                </Button>
                <Button size="sm" variant="outline" className="flex-1 gap-2">
                  <Icon name="Eye" size={14} />
                  Просмотр
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (activeTab === 'data') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Upload" size={20} className="text-primary" />
              Загрузить данные
            </CardTitle>
            <CardDescription>Поддерживаются форматы: CSV, JSON, SQL Database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
              <Icon name="FileUp" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">
                Перетащите файлы сюда или нажмите для выбора
              </p>
              <p className="text-sm text-muted-foreground">CSV, JSON файлы до 5GB</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          {datasets.map((dataset) => (
            <Card key={dataset.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon
                        name={dataset.type === 'CSV' ? 'FileSpreadsheet' : 'FileJson'}
                        size={24}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-foreground">{dataset.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {dataset.records.toLocaleString()} записей • {dataset.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={dataset.status === 'ready' ? 'secondary' : 'default'}
                      className="text-sm"
                    >
                      {dataset.status === 'ready' ? 'Готов' : 'Обработка'}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Icon name="MoreVertical" size={18} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'results') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="LineChart" size={20} className="text-primary" />
              Производительность моделей
            </CardTitle>
            <CardDescription>Сравнение точности по моделям</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 flex items-end gap-4">
              {[87.5, 92.3, 85, 90, 88].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col gap-1">
                  <div className="relative flex-1 flex flex-col justify-end">
                    <div
                      className="bg-gradient-to-t from-primary to-secondary rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{ height: `${val}%` }}
                      title={`Accuracy: ${val}%`}
                    />
                  </div>
                  <div className="text-xs text-center text-muted-foreground font-mono">M{idx + 1}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Target" size={20} className="text-secondary" />
              Статистика генерации
            </CardTitle>
            <CardDescription>Количество созданных видео по неделям</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 flex items-end gap-3">
              {[12, 18, 25, 32, 28, 42, 38, 45].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col gap-1">
                  <div className="relative flex-1 flex flex-col justify-end">
                    <div
                      className="bg-accent rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{ height: `${(val / 45) * 100}%` }}
                      title={`${val} videos`}
                    />
                  </div>
                  <div className="text-xs text-center text-muted-foreground">W{idx + 1}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeTab === 'settings') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Sliders" size={20} className="text-primary" />
              Параметры обучения
            </CardTitle>
            <CardDescription>Настройка гиперпараметров</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Learning Rate</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0.0001"
                  max="0.1"
                  step="0.0001"
                  className="flex-1"
                  defaultValue="0.001"
                />
                <span className="text-sm font-mono w-20 text-right">0.001</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Batch Size</label>
              <div className="flex items-center gap-4">
                <input type="range" min="8" max="256" step="8" className="flex-1" defaultValue="32" />
                <span className="text-sm font-mono w-20 text-right">32</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Epochs</label>
              <div className="flex items-center gap-4">
                <input type="range" min="10" max="500" step="10" className="flex-1" defaultValue="100" />
                <span className="text-sm font-mono w-20 text-right">100</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Cpu" size={20} className="text-secondary" />
              Вычислительные ресурсы
            </CardTitle>
            <CardDescription>Конфигурация GPU и CPU</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">GPU Использование</span>
                <span className="text-sm font-mono">72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">RAM Использование</span>
                <span className="text-sm font-mono">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="pt-2">
              <p className="text-sm text-muted-foreground mb-3">Доступные GPU</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <span className="text-sm font-mono">NVIDIA Tesla V100</span>
                  <Badge variant="secondary">Активен</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <span className="text-sm font-mono">NVIDIA Tesla V100</span>
                  <Badge variant="outline">Резерв</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default DataModelsResultsSettings;
