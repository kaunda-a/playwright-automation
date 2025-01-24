
import { TaskProvider } from '@/components/context/TaskContext';

export default function taskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <TaskProvider>
      {children}
    </TaskProvider>
  );
};

