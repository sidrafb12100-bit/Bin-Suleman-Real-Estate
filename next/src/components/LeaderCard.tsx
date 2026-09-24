/* eslint-disable @next/next/no-img-element */
import type { Leader } from '@/content/team';

/** Port of the About-page leader card (badge pill, role, bio, credential footer). */
export default function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative h-72 w-full bg-surface-container-high overflow-hidden">
        <img
          className="w-full h-full object-cover object-top"
          alt={`${leader.name}, ${leader.role}, Bin Suleman Real Estate & Builders`}
          src={leader.image}
        />
        <div className="absolute bottom-space-sm right-space-sm bg-primary/90 backdrop-blur-md px-space-sm py-space-xs rounded-full">
          <span className="font-label-caps text-label-caps text-secondary-container uppercase font-bold">
            {leader.badge}
          </span>
        </div>
      </div>
      <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-md">
        <div>
          <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">
            {leader.role}
          </span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mt-space-xs">{leader.name}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">{leader.bio}</p>
        </div>
        <div className="pt-space-md border-t border-surface-container-high flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant">{leader.footer}</span>
          <a
            className="text-secondary hover:text-on-surface transition-colors font-label-md text-label-md flex items-center gap-space-xs cursor-pointer"
            href="#"
          >
            <span>{leader.linkLabel}</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
}