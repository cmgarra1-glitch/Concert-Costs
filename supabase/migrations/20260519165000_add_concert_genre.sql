alter table public.concerts
  add column if not exists genre text not null default 'Pop';

alter table public.concerts
  drop constraint if exists concerts_genre_check;

alter table public.concerts
  add constraint concerts_genre_check
  check (genre in ('Country', 'Rap', 'Pop'));
