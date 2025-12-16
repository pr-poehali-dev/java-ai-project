import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoDuration, setVideoDuration] = useState('5');
  const [videoResolution, setVideoResolution] = useState('1080p');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const generatedVideos = [
    { id: 1, title: 'Космический корабль в полёте', duration: '5 сек', resolution: '1080p', status: 'completed', thumbnail: '🚀', date: '15.12.2024' },
    { id: 2, title: 'Волны океана на закате', duration: '10 сек', resolution: '4K', status: 'completed', thumbnail: '🌊', date: '14.12.2024' },
    { id: 3, title: 'Горы и облака в движении', duration: '8 сек', resolution: '1080p', status: 'processing', thumbnail: '⛰️', date: '16.12.2024' },
  ];

  const models = [
    { id: 1, name: 'ResNet-50', type: 'CNN', status: 'training', accuracy: 87.5, epoch: 45, totalEpochs: 100 },
    { id: 2, name: 'BERT-Base', type: 'Transformer', status: 'completed', accuracy: 92.3, epoch: 100, totalEpochs: 100 },
    { id: 3, name: 'Video-Gen-V2', type: 'Video Generation', status: 'idle', accuracy: 0, epoch: 0, totalEpochs: 50 },
  ];

  const datasets = [
    { id: 1, name: 'ImageNet-1K', type: 'CSV', size: '1.2M', records: 1281167, status: 'ready' },
    { id: 2, name: 'Video Dataset', type: 'JSON', size: '12GB', records: 15000, status: 'ready' },
    { id: 3, name: 'Time Series Data', type: 'CSV', size: '156MB', records: 2500000, status: 'processing' },
  ];

  const metrics = [
    { label: 'Обучено моделей', value: '24', change: '+12%', trend: 'up' },
    { label: 'Точность (avg)', value: '89.7%', change: '+3.2%', trend: 'up' },
    { label: 'Создано видео', value: '156', change: '+42', trend: 'up' },
    { label: 'Время генерации', value: '2.5м', change: '-15%', trend: 'down' },
  ];

  const handleGenerateVideo = () => {
    if (!videoPrompt.trim()) {
      toast.error('Введите описание видео');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast.success('Видео успешно сгенерировано!');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="Brain" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">DeepLearning</h1>
                <p className="text-xs text-sidebar-foreground/60">Platform v2.0</p>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'dashboard', icon: 'LayoutDashboard', label: 'Главная' },
                { id: 'video', icon: 'Video', label: 'Генерация видео' },
                { id: 'models', icon: 'Box', label: 'Модели' },
                { id: 'data', icon: 'Database', label: 'Данные' },
                { id: 'results', icon: 'BarChart3', label: 'Результаты' },
                { id: 'settings', icon: 'Settings', label: 'Настройки' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    activeTab === item.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  )}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  {activeTab === 'dashboard' && 'Обзор'}
                  {activeTab === 'video' && 'Генерация видео'}
                  {activeTab === 'models' && 'Модели'}
                  {activeTab === 'data' && 'Данные'}
                  {activeTab === 'results' && 'Результаты'}
                  {activeTab === 'settings' && 'Настройки'}
                </h2>
                <p className="text-muted-foreground mt-1">
                  Платформа глубокого обучения для обработки больших данных
                </p>
              </div>
              {activeTab === 'video' && (
                <Button className="gap-2" onClick={() => setVideoPrompt('')}>
                  <Icon name="Sparkles" size={18} />
                  Новое видео
                </Button>
              )}
            </div>

            {activeTab === 'dashboard' && (
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
            )}

            {activeTab === 'video' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Wand2" size={20} className="text-primary" />
                      Создать видео
                    </CardTitle>
                    <CardDescription>Опишите, какое видео вы хотите создать</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="prompt">Описание видео</Label>
                      <Textarea
                        id="prompt"
                        placeholder="Космический корабль летит сквозь туманность, яркие звёзды и планеты на фоне..."
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Длительность</Label>
                        <Select value={videoDuration} onValueChange={setVideoDuration}>
                          <SelectTrigger id="duration">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 секунды</SelectItem>
                            <SelectItem value="5">5 секунд</SelectItem>
                            <SelectItem value="8">8 секунд</SelectItem>
                            <SelectItem value="10">10 секунд</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="resolution">Разрешение</Label>
                        <Select value={videoResolution} onValueChange={setVideoResolution}>
                          <SelectTrigger id="resolution">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="720p">720p (HD)</SelectItem>
                            <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                            <SelectItem value="4k">4K (Ultra HD)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {isGenerating && (
                      <div className="space-y-3 p-4 rounded-lg bg-muted">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Генерация видео...</span>
                          <span className="text-sm font-mono">{generationProgress}%</span>
                        </div>
                        <Progress value={generationProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Это может занять несколько минут
                        </p>
                      </div>
                    )}

                    <Button 
                      className="w-full gap-2" 
                      size="lg"
                      onClick={handleGenerateVideo}
                      disabled={isGenerating || !videoPrompt.trim()}
                    >
                      {isGenerating ? (
                        <>
                          <Icon name="Loader2" size={18} className="animate-spin" />
                          Генерация...
                        </>
                      ) : (
                        <>
                          <Icon name="Sparkles" size={18} />
                          Создать видео
                        </>
                      )}
                    </Button>

                    <div className="pt-4 border-t space-y-2">
                      <p className="text-sm font-medium text-foreground">Параметры модели</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Модель:</span>
                          <span className="font-mono">Video-Gen-V2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">FPS:</span>
                          <span className="font-mono">24</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Качество:</span>
                          <span className="font-mono">High</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Формат:</span>
                          <span className="font-mono">MP4</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="History" size={20} className="text-secondary" />
                        История генераций
                      </CardTitle>
                      <CardDescription>Ваши недавние видео</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {generatedVideos.map((video) => (
                          <div
                            key={video.id}
                            className="group p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200 cursor-pointer"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl flex-shrink-0">
                                {video.thumbnail}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-card-foreground mb-1 truncate">
                                  {video.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {video.duration} • {video.resolution}
                                </p>
                                <div className="flex items-center gap-2">
                                  <Badge variant={video.status === 'completed' ? 'secondary' : 'default'} className="text-xs">
                                    {video.status === 'completed' ? 'Готово' : 'Обработка'}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{video.date}</span>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Icon name="Download" size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Lightbulb" size={20} className="text-accent" />
                        Примеры промптов
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          'Океан на закате с волнами и чайками',
                          'Неоновый город будущего с летающими машинами',
                          'Лес с туманом и лучами солнца',
                          'Абстрактные цветные формы в движении',
                        ].map((example, idx) => (
                          <button
                            key={idx}
                            onClick={() => setVideoPrompt(example)}
                            className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors text-sm"
                          >
                            {example}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'models' && (
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
            )}

            {activeTab === 'data' && (
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
            )}

            {activeTab === 'results' && (
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
            )}

            {activeTab === 'settings' && (
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
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
