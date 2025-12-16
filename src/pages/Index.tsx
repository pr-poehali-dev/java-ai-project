import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import Sidebar from '@/components/Sidebar';
import DashboardTab from '@/components/DashboardTab';
import VideoGenerationTab from '@/components/VideoGenerationTab';
import DataModelsResultsSettings from '@/components/DataModelsResultsSettings';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoDuration, setVideoDuration] = useState('5');
  const [videoResolution, setVideoResolution] = useState('1080p');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedVideos, setGeneratedVideos] = useState<Array<{
    id: string;
    title: string;
    duration: string;
    resolution: string;
    status: string;
    thumbnail: string;
    date: string;
    url?: string;
  }>>([
    { id: '1', title: 'Космический корабль в полёте', duration: '5 сек', resolution: '1080p', status: 'completed', thumbnail: '🚀', date: '15.12.2024', url: '#' },
    { id: '2', title: 'Волны океана на закате', duration: '10 сек', resolution: '4K', status: 'completed', thumbnail: '🌊', date: '14.12.2024', url: '#' },
    { id: '3', title: 'Горы и облака в движении', duration: '8 сек', resolution: '1080p', status: 'processing', thumbnail: '⛰️', date: '16.12.2024' },
  ]);

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

  const handleGenerateVideo = async () => {
    if (!videoPrompt.trim()) {
      toast.error('Введите описание видео');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => Math.min(prev + 15, 90));
    }, 500);

    try {
      const response = await fetch('https://functions.poehali.dev/bf2c28ff-6aa5-4714-a6f7-e3bb3dae9ab6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: videoPrompt,
          duration: videoDuration,
          resolution: videoResolution,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка генерации видео');
      }

      const data = await response.json();
      
      clearInterval(progressInterval);
      setGenerationProgress(100);

      const newVideo = {
        id: data.video_id,
        title: videoPrompt.substring(0, 50),
        duration: `${videoDuration} сек`,
        resolution: videoResolution,
        status: 'completed',
        thumbnail: '🎬',
        date: new Date().toLocaleDateString('ru-RU'),
        url: data.url,
      };

      setGeneratedVideos(prev => [newVideo, ...prev]);
      
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationProgress(0);
        toast.success('Видео успешно сгенерировано!');
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      setIsGenerating(false);
      setGenerationProgress(0);
      toast.error('Ошибка при генерации видео');
      console.error('Video generation error:', error);
    }
  };

  const handleDownloadVideo = (url: string, title: string) => {
    if (!url || url === '#') {
      toast.error('URL видео недоступен');
      return;
    }
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-zа-я0-9]/gi, '_')}.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Скачивание началось!');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

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
              <DashboardTab 
                metrics={metrics} 
                generatedVideos={generatedVideos} 
                models={models} 
              />
            )}

            {activeTab === 'video' && (
              <VideoGenerationTab
                videoPrompt={videoPrompt}
                setVideoPrompt={setVideoPrompt}
                videoDuration={videoDuration}
                setVideoDuration={setVideoDuration}
                videoResolution={videoResolution}
                setVideoResolution={setVideoResolution}
                isGenerating={isGenerating}
                generationProgress={generationProgress}
                handleGenerateVideo={handleGenerateVideo}
                generatedVideos={generatedVideos}
                handleDownloadVideo={handleDownloadVideo}
              />
            )}

            {(activeTab === 'models' || activeTab === 'data' || activeTab === 'results' || activeTab === 'settings') && (
              <DataModelsResultsSettings 
                activeTab={activeTab} 
                models={models} 
                datasets={datasets} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;