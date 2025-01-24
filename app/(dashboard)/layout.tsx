import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar";


const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) =>{
 
  return (
        <div className="flex min-h-screen">
           <Sidebar className="w-64 min-h-screen" />
              <div className="flex flex-col flex-grow">
                <Navbar className="w-full h-16" />
              <main className="flex-grow overflow-hidden p-4 sm:p-6 md:p-8">
               {children}
              </main>
          </div>
      </div>  
  );
}

export default DashboardLayout;