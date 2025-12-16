import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
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
  );
};

export default Sidebar;
