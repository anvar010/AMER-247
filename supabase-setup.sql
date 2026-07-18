create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  form_type text not null,          -- 'apply' | 'contact' | 'career' | 'det247'
  hub text,                          -- e.g. "Emirates ID" (apply form only)
  reference_id text,
  applicant_name text,
  email text,
  phone text,
  data jsonb not null default '{}', -- any other submitted fields
  file_paths text[] not null default '{}', -- paths inside the storage bucket
  created_at timestamptz not null default now()
);

create index if not exists submissions_form_type_idx on submissions (form_type);
create index if not exists submissions_created_at_idx on submissions (created_at desc);

alter table submissions enable row level security;
