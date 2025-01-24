import Link from 'next/link';
import Logo from '@/components/icons/logo';
import { Monitor, ListTodo, Bot, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside className={`${className} text-white p-4 border flex flex-col h-screen font-medium relative border-neutral-200 dark:border-white/[0.2] dark:text-white px-4 py-2 rounded`}>
      <div className="mb-8 flex items-center">
        <Logo width={40} height={40} />
        <h1 className="ml-3 text-xl font-bold">Bandabot</h1>
      </div>
      <div className="flex-grow flex flex-col justify-center">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="flex flex-col space-y-4 bg-transparent">
            <TooltipProvider>
              {[
                { value: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
                { value: 'monitor', label: 'Monitor', href: '/monitor', icon: Monitor },
                { value: 'tasks', label: 'Tasks', href: '/tasks', icon: ListTodo },
                { value: 'bots', label: 'Bots', href: '/bots', icon: Bot },
                { value: 'proxies', label: 'Proxies', href: '/proxies', icon: Settings },
              ].map(({ value, label, href, icon: Icon }) => (
                <Tooltip key={value}>
                  <TooltipTrigger asChild>
                    <Link href={href} passHref>
                      <TabsTrigger
                        value={value}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-900 transition-colors data-[state=active]:bg-gray-800 flex items-center"
                      >
                        <Icon className="mr-2" size={18} />
                        {label}
                      </TabsTrigger>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Go to {label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </TabsList>
        </Tabs>
      </div>
    </aside>
  );
};

export default Sidebar;
