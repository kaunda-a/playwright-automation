"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Power, PowerOff } from "lucide-react"

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  
  return (
    <nav className={`${className} flex justify-between items-center py-4 px-6S border-b`}>
      <div className="flex items-center space-x-4">
        <Link href="/launch">
          <Button variant="ghost">
            <Power className="mr-2 h-4 w-4" />
            Launcher
          </Button>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/terminate">
          <Button variant="outline">
            <PowerOff className="mr-2 h-4 w-4" />
            Terminate
          </Button>
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;