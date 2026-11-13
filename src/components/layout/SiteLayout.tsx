import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';

export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>ByteHaven. Your favorites are saved on this device.</p>
          <p>
            Product data from{' '}
            <a href="https://dummyjson.com" target="_blank" rel="noreferrer" className="font-medium text-slate-700 underline-offset-4 hover:underline">
              DummyJSON
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
