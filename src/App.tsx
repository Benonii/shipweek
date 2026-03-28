import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Toaster, toast } from 'sonner';
import { CreateModal } from './components/CreateModal';
import { ContendersTable } from './components/ContendersTable';
import { ModeToggle } from './components/mode-toggle';
import { ThemeProvider } from './components/theme-provider';
import { Rocket } from 'lucide-react';
import { Button } from './components/ui/button';
import { PowerOff } from 'lucide-react';
// @ts-ignore
import { api } from '../convex/_generated/api';

import { authClient } from './lib/auth-client';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL || "https://placeholder.convex.cloud");

function AuthHeader() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const handleSignIn = async () => {
    toast.loading('Redirecting to Google sign-in...', { id: 'auth-redirect' });
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: window.location.origin
    });
  };

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-[10px] uppercase font-mono tracking-wider text-gray-500 dark:text-[#888]">{user.email}</span>
          <Button variant="outline" size="sm" onClick={handleSignOut} className="rounded-[6px] border-gray-300 bg-white text-black hover:bg-gray-100 dark:border-[#333] dark:bg-black dark:text-[#CCC] dark:hover:bg-[#222] h-10 px-3">
            <span className="text-[10px] uppercase font-mono tracking-wider"><PowerOff /></span>
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSignIn} 
          className="rounded-[6px] border-gray-300 bg-white text-black hover:bg-black hover:text-white dark:border-[#333] dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black transition-colors h-10 w-10 flex items-center justify-center p-0"
          title="Sign in with Google"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </Button>
      )}
    </div>
  );
}

function Main() {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-[#EDEDED] font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 border-b border-gray-200 dark:border-[#333] pb-8 transition-colors duration-200">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-[8px] bg-gray-100 border border-gray-200 group-hover:bg-gray-200 dark:bg-[#111] dark:border-[#333] flex items-center justify-center dark:group-hover:bg-[#222] transition-colors duration-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Rocket className="w-6 h-6 text-black dark:text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-white mb-1">
                Ship Week <span className="text-gray-500 dark:text-[#888]">Contenders</span>
              </h1>
              <p className="text-[11px] uppercase tracking-widest text-gray-500 dark:text-[#666] font-mono">
                The best of the best
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <ModeToggle />
            <AuthHeader />
            <div className="h-8 w-px bg-gray-200 dark:bg-[#333]"></div>
            <CreateModal userId={userId} />
          </div>
        </div>

        <ContendersTable userId={userId} />
        <p className="mt-8 text-center text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-[#555] font-mono italic">
          Just keep shipping
        </p>
      </main>

      <Toaster 
        theme="dark" 
        position="bottom-right"
        toastOptions={{
          className: 'rounded-none border border-[#333] bg-black text-white font-mono text-xs',
        }} 
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ConvexProvider client={convex}>
        <Main />
      </ConvexProvider>
    </ThemeProvider>
  );
}

export default App;
