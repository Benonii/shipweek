import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
// @ts-ignore - this will be generated when user runs npx convex dev
import { api } from '../../convex/_generated/api';
// @ts-ignore
import type { Id } from '../../convex/_generated/dataModel';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronUp, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '../lib/auth-client';

export function ContendersTable({ userId: propUserId }: { userId?: string }) {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id || propUserId;
  
  const projects = useQuery(api.projects.get);
  const upvoteProject = useMutation(api.projects.upvote);
  const removeProject = useMutation(api.projects.remove);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleUpvote = async (id: string | Id<"projects">) => {
    if (!userId) {
      toast.loading('Redirecting to Google sign-in...', { id: 'auth-redirect' });
      await authClient.signIn.social({ 
        provider: 'google',
        callbackURL: window.location.origin
      });
      return;
    }
    
    try {
      setPendingId(id as string);
      // @ts-ignore
      await upvoteProject({ id, userId });
    } catch (err: any) {
      toast.error('Failed to upvote: ' + err.message);
    } finally {
      setPendingId(null);
    }
  };

  const handleDelete = async (id: string | Id<"projects">) => {
    if (!userId) return;
    
    if (!confirm('Are you sure you want to delete this contender?')) return;

    try {
      setPendingId(`delete-${id}`);
      // @ts-ignore
      await removeProject({ id, userId });
      toast.success('Project deleted successfully.');
    } catch (err: any) {
      toast.error('Failed to delete: ' + err.message);
    } finally {
      setPendingId(null);
    }
  };

  if (projects === undefined) return <div className="text-center py-10 font-mono uppercase tracking-widest text-sm text-gray-500 dark:text-[#888]">Loading Contenders...</div>;

  return (
    <div className="w-full border border-gray-200 bg-white dark:border-[#333] dark:bg-black overflow-hidden relative transition-colors duration-200">
      <Table>
        <TableHeader className="bg-white border-b border-gray-200 dark:bg-black dark:border-[#333] transition-colors duration-200">
          <TableRow className="hover:bg-transparent border-0">
             <TableHead className="text-gray-500 dark:text-[#888] font-mono uppercase tracking-wider text-[10px] whitespace-nowrap">Project</TableHead>
            <TableHead className="text-gray-500 dark:text-[#888] font-mono uppercase tracking-wider text-[10px] whitespace-nowrap">Channel</TableHead>
            <TableHead className="text-gray-500 dark:text-[#888] font-mono uppercase tracking-wider text-[10px] whitespace-nowrap">Developer</TableHead>
            <TableHead className="text-gray-500 dark:text-[#888] font-mono uppercase tracking-wider text-[10px] whitespace-nowrap">Open Source</TableHead>
            <TableHead className="text-gray-500 dark:text-[#888] font-mono uppercase tracking-wider text-[10px] whitespace-nowrap text-right">Stars</TableHead>
            <TableHead className="text-gray-500 dark:text-[#888] font-mono uppercase tracking-wider text-[10px] whitespace-nowrap text-right">Upvotes</TableHead>
            <TableHead className="text-gray-500 dark:text-[#888] font-mono uppercase tracking-wider text-[10px] whitespace-nowrap">Tags</TableHead>
            <TableHead className="text-gray-500 dark:text-[#888] font-mono uppercase tracking-wider text-[10px] whitespace-nowrap text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
           {projects.length === 0 && (
            <TableRow className="hover:bg-transparent border-0">
              <TableCell colSpan={8} className="text-center py-12 text-gray-400 dark:text-[#666] font-mono uppercase tracking-widest text-xs">
                No contenders yet. Be the first!
              </TableCell>
            </TableRow>
          )}
          {projects.map((item: any) => (
             <TableRow key={item._id} className="border-b border-gray-100 hover:bg-gray-50 dark:border-[#222] dark:hover:bg-[#111] transition-colors">
              <TableCell className="font-medium text-black dark:text-white text-sm truncate max-w-[150px]">
                {item.project_url ? (
                  <a href={item.project_url} target="_blank" rel="noreferrer" className="hover:underline decoration-gray-400 dark:decoration-[#666] underline-offset-4">
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {item.telegram_channel_image ? (
                    <img 
                      src={item.telegram_channel_image} 
                      alt={item.telegram_channel_name} 
                      className="w-7 h-7 object-cover rounded-full border border-gray-200 dark:border-[#333]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 text-gray-500 dark:bg-[#111] dark:border-[#333] flex items-center justify-center text-[8px] dark:text-[#888] font-mono">
                      IMG
                    </div>
                  )}
                  <span className="text-sm text-gray-700 dark:text-[#CCC]">{item.telegram_channel_name}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-700 dark:text-[#CCC] text-sm">{item.developer}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {item.open_source ? (
                    <span className="px-2 py-0.5 bg-gray-100 text-black border border-gray-200 dark:bg-[#111] dark:text-white text-[10px] uppercase font-mono tracking-wider dark:border-[#333] rounded-[4px]">Yes</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-white text-gray-400 border border-gray-100 dark:bg-black dark:text-[#666] text-[10px] uppercase font-mono tracking-wider dark:border-[#222] rounded-[4px]">No</span>
                  )}
                  {item.open_source && item.repository && (
                    <a href={item.repository} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black dark:text-[#666] dark:hover:text-white transition-colors" title="Repository">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right font-mono text-sm text-gray-500 dark:text-[#888]">
                {item.open_source ? item.stars : "N/A"}
              </TableCell>
              <TableCell className="text-right font-mono text-sm text-black dark:text-white">{item.upvotes}</TableCell>
               <TableCell>
                <div className="flex flex-wrap gap-1">
                  {item.tags.split(',').filter(Boolean).map((t: string, idx: number) => (
                    <span key={idx} className="px-1.5 py-0.5 text-gray-600 bg-gray-100 border border-gray-200 dark:text-[#888] dark:bg-[#111] dark:border-[#222] text-[10px] font-mono uppercase tracking-tight rounded-[4px]">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 items-center">
                  {userId && item.developerId === userId && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                      disabled={pendingId === `delete-${item._id}`}
                      className="rounded-[6px] border border-[#f87171]/30 bg-white text-[#f87171] hover:bg-[#f87171]/10 hover:text-[#f87171] dark:bg-black transition-all shadow-none h-8 px-2"
                      title="Delete your submission"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpvote(item._id)}
                    disabled={pendingId === item._id || (userId ? item.upvoters?.includes(userId) : false)}
                    className="rounded-[6px] border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-black dark:border-[#333] dark:bg-black dark:text-[#CCC] dark:hover:bg-white dark:hover:text-black transition-all shadow-none h-8 px-3 disabled:opacity-50"
                  >
                    <ChevronUp className="w-3.5 h-3.5 mr-1" />
                    <span className="font-mono text-[10px] uppercase tracking-wider">
                      {pendingId === item._id ? '...' : (userId && item.upvoters?.includes(userId) ? 'Voted' : 'Vote')}
                    </span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
