create table
  public.karma_awards (
    id bigint generated by default as identity not null,
    created_at timestamp with time zone not null default now(),
    recipient_id uuid not null,
    points smallint not null,
    reason text null,
    constraint karma_awards_pkey primary key (id)
  ) tablespace pg_default;