import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface VideoGenerationTabProps {
  videoPrompt: string;
  setVideoPrompt: (prompt: string) => void;
  videoDuration: string;
  setVideoDuration: (duration: string) => void;
  videoResolution: string;
  setVideoResolution: (resolution: string) => void;
  isGenerating: boolean;
  generationProgress: number;
  handleGenerateVideo: () => void;
  generatedVideos: Array<{ id: string; title: string; duration: string; resolution: string; status: string; thumbnail: string; date: string; url?: string }>;
  handleDownloadVideo: (url: string, title: string) => void;
}

const VideoGenerationTab = ({
  videoPrompt,
  setVideoPrompt,
  videoDuration,
  setVideoDuration,
  videoResolution,
  setVideoResolution,
  isGenerating,
  generationProgress,
  handleGenerateVideo,
  generatedVideos,
  handleDownloadVideo,
}: VideoGenerationTabProps) => {
  return (
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
                    {video.url && video.status === 'completed' && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadVideo(video.url!, video.title);
                        }}
                      >
                        <Icon name="Download" size={16} />
                      </Button>
                    )}
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
  );
};

export default VideoGenerationTab;