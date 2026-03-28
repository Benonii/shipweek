import { useState, useRef } from 'react';
import { useMutation } from 'convex/react';
// @ts-ignore
import { api } from '../../convex/_generated/api';
// @ts-ignore
import type { Id } from '../../convex/_generated/dataModel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '../lib/auth-client';

export function CreateModal({ userId: propUserId }: { userId?: string }) {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id || propUserId;
  
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [channelName, setChannelName] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [developer, setDeveloper] = useState('');
  const [repository, setRepository] = useState('');
  const [tags, setTags] = useState('');
  const [openSource, setOpenSource] = useState(false);
  const [stars, setStars] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.projects.generateUploadUrl);
  const createProject = useMutation(api.projects.create);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !channelName || !developer || !projectUrl) {
      toast.error('Please fill required fields.');
      return;
    }

    try {
      setIsPending(true);

      let storageId: string | undefined = undefined;
      
      if (imageFile) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": imageFile.type },
          body: imageFile,
        });
        const { storageId: uploadedStorageId } = await result.json();
        storageId = uploadedStorageId;
      }

      await createProject({
        name,
        telegram_channel_name: channelName,
        project_url: projectUrl,
        repository: openSource ? repository : undefined,
        developer,
        open_source: openSource,
        tags,
        stars: openSource ? parseInt(stars) || 0 : 0,
        developerId: userId,
        ...(storageId ? { storageId: storageId as Id<"_storage"> } : {}),
      });

      toast.success('Project submitted successfully!');
      setOpen(false);
      setName('');
      setChannelName('');
      setProjectUrl('');
      setDeveloper('');
      setRepository('');
      setTags('');
      setOpenSource(false);
      setStars('');
      setImageFile(null);
      setPreviewUrl(null);
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          onClick={(e) => {
            if (!userId) {
              e.preventDefault();
              toast.loading('Redirecting to Google sign-in...', { id: 'auth-redirect' });
              authClient.signIn.social({
                provider: 'google',
                callbackURL: window.location.origin,
              });
            }
          }}
          className="rounded-[6px] border border-gray-300 bg-white text-black hover:bg-gray-100 dark:border-[#333] dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black transition-colors px-6 h-10 font-mono text-sm tracking-wide"
        >
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[12px] border border-gray-200 bg-white text-black dark:border-[#333] dark:bg-black dark:text-[#EDEDED] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium tracking-tight text-black dark:text-white mb-2">New Contender</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-5">
          


          <div className="grid gap-2">
            <Label htmlFor="name" className="text-[10px] uppercase font-mono tracking-widest text-gray-500 dark:text-[#888]">Project Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="rounded-[6px] border-gray-200 bg-gray-50 text-black focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-0 h-10 placeholder:text-gray-400 dark:border-[#333] dark:bg-[#111] dark:text-white dark:focus-visible:ring-white dark:placeholder:text-[#444]"
              placeholder="e.g. Ship Week App"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="projectUrl" className="text-[10px] uppercase font-mono tracking-widest text-gray-500 dark:text-[#888]">Project URL</Label>
            <Input
              id="projectUrl"
              value={projectUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectUrl(e.target.value)}
              className="rounded-[6px] border-gray-200 bg-gray-50 text-black focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-0 h-10 placeholder:text-gray-400 dark:border-[#333] dark:bg-[#111] dark:text-white dark:focus-visible:ring-white dark:placeholder:text-[#444]"
              placeholder="e.g. https://shipweek.app"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-[10px] uppercase font-mono tracking-widest text-gray-500 dark:text-[#888]">Telegram pfp</Label>
            <div className="flex justify-start my-1">
              <div 
                className="relative w-16 h-16 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:border-[#333] dark:bg-[#111] dark:hover:bg-[#222] transition-colors overflow-hidden group"
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <>
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center">
                      <span className="text-[10px] font-mono uppercase text-white">Change</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Plus className="w-5 h-5 text-gray-400 dark:text-[#888]" />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="channelName" className="text-[10px] uppercase font-mono tracking-widest text-gray-500 dark:text-[#888]">Channel Name</Label>
            <Input
              id="channelName"
              value={channelName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChannelName(e.target.value)}
              className="rounded-[6px] border-gray-200 bg-gray-50 text-black focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-0 h-10 placeholder:text-gray-400 dark:border-[#333] dark:bg-[#111] dark:text-white dark:focus-visible:ring-white dark:placeholder:text-[#444]"
              placeholder="e.g. @shipweek"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="developer" className="text-[10px] uppercase font-mono tracking-widest text-gray-500 dark:text-[#888]">Developer</Label>
            <Input
              id="developer"
              value={developer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeveloper(e.target.value)}
              className="rounded-[6px] border-gray-200 bg-gray-50 text-black focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-0 h-10 placeholder:text-gray-400 dark:border-[#333] dark:bg-[#111] dark:text-white dark:focus-visible:ring-white dark:placeholder:text-[#444]"
              placeholder="e.g. Satoshi"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags" className="text-[10px] uppercase font-mono tracking-widest text-gray-500 dark:text-[#888]">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
              className="rounded-[6px] border-gray-200 bg-gray-50 text-black focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-0 h-10 placeholder:text-gray-400 dark:border-[#333] dark:bg-[#111] dark:text-white dark:focus-visible:ring-white dark:placeholder:text-[#444]"
              placeholder="e.g. react, supabase, shadcn"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <input
              type="checkbox"
              id="openSource"
              checked={openSource}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOpenSource(e.target.checked)}
              className="w-4 h-4 rounded-[4px] border-gray-300 bg-white text-black focus:ring-1 focus:ring-black focus:ring-offset-0 cursor-pointer dark:border-[#333] dark:bg-[#111] dark:text-white dark:focus:ring-white"
            />
            <Label htmlFor="openSource" className="text-xs text-gray-600 dark:text-[#CCC] cursor-pointer font-mono tracking-wide">Open Source</Label>
          </div>

          {openSource && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stars" className="text-[10px] uppercase font-mono tracking-widest text-gray-500 dark:text-[#888]">Stars</Label>
                <Input
                  id="stars"
                  type="number"
                  value={stars}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStars(e.target.value)}
                  className="rounded-[6px] border-gray-200 bg-gray-50 text-black focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-0 h-10 placeholder:text-gray-400 dark:border-[#333] dark:bg-[#111] dark:text-white dark:focus-visible:ring-white dark:placeholder:text-[#444]"
                  placeholder="0"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="repository" className="text-[10px] uppercase font-mono tracking-widest text-gray-500 dark:text-[#888]">Repository URL</Label>
                <Input
                  id="repository"
                  value={repository}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepository(e.target.value)}
                  className="rounded-[6px] border-gray-200 bg-gray-50 text-black focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-0 h-10 placeholder:text-gray-400 dark:border-[#333] dark:bg-[#111] dark:text-white dark:focus-visible:ring-white dark:placeholder:text-[#444]"
                  placeholder="e.g. https://github.com/ship/week"
                />
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full rounded-[6px] border border-gray-300 mt-2 bg-black text-white hover:bg-gray-800 dark:border-[#333] dark:bg-white dark:text-black dark:hover:bg-[#CCC] transition-colors font-mono tracking-wide h-10"
          >
            {isPending ? 'Creating...' : 'Create Contender'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
