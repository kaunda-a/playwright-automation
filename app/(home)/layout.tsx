import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';

const LandingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="h-full overflow-auto">
      <Header />
      <div className="mx-auto max-w-screen-xl h-full w-full">
        {children}
      </div>
      <Footer />
    </main>
  );
}

export default LandingLayout;
