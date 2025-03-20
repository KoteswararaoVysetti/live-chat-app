import Container from '@/components/common/container';
import { Header } from './_components/header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container className="flex flex-col relative bg-slate-50 w-full h-[calc(100% - 20px)] lg:w-[calc(100% - 68px)] lg:h-auto">
      <Header className={`h-[68px] hidden lg:flex`} />
      <div className="flex justify-center items-center p-6 bg-white mt-2 w-full h-full overflow-hidden max-lg:mb-16">
        {children}
      </div>
    </Container>
  );
}
