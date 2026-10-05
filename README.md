# IndustryOps AI

IndustryOps AI is an industrial operations dashboard with a browser demo mode and a Supabase-backed mode. The Supabase setup provides authenticated, plant-scoped storage for assets, incidents, work orders, sensor readings, escalation policies, notifications, and audit history.

## Connect your Supabase project

1. Open the Supabase SQL Editor and run [`supabase/schema.sql`](supabase/schema.sql).
2. In Supabase Authentication, create or invite the users who should sign in. This app intentionally has no public sign-up screen.
3. Add each user's auth UUID to `public.plant_members`. For the starter plant, use:

   ```sql
   insert into public.plant_members (plant_id, user_id, role, display_name)
   values (
     '00000000-0000-4000-8000-000000000001',
     'AUTH_USER_UUID',
     'manager',
     'Alex Morgan'
   );
   ```

4. In [`supabase-config.js`](supabase-config.js), set your project URL, **anon/public** key, and the plant ID. Never put a service-role key in this browser file.
5. Optionally run [`supabase/seed-demo.sql`](supabase/seed-demo.sql) for six sample assets.
6. Run `npm start`, open `http://localhost:4173`, and sign in with the invited Supabase user. The included Node server uses built-in modules only. Opening the HTML as a `file://` URL may be blocked by browser security rules.

The app opens on the sign-in page. When the URL and anon key remain as placeholders, sign-in stays disabled and “Continue with demo” opens the browser demo. In connected mode, invited users sign in through Supabase Auth, and records load from and save to Supabase; row-level security isolates plant data and limits writes for viewer roles.

## Supabase Edge Functions

Deploy the functions in `supabase/functions` to the same Supabase project:

- `triage-incident` validates the signed-in user's plant membership and applies a conservative rules-based classification and recommendation. It is a working baseline, not a connected language model. A model provider and its secret can be added server-side later.
- `ingest-sensor` accepts gateway readings using the `x-ingest-key` secret, stores them, checks asset thresholds, and creates an incident and dashboard notification when a threshold is crossed. Set `INGESTION_API_KEY` as an Edge Function secret. Send JSON with `plantId`, `assetId`, `metric`, `value`, optional `unit`, `observedAt`, and `metadata`.
- `process-escalations` evaluates open incidents against `escalation_policies` and creates idempotent escalation events and dashboard notifications. The Escalations page has a manual “Check SLAs now” action. For automatic checks, schedule this function from your deployment environment.

Supabase Edge Function secrets should include the project's URL, anon key, and service-role key. Set `INGESTION_API_KEY` for sensor gateways and `CRON_SECRET` for your scheduler. The service-role key and both secrets belong only in server-side function secrets. Sensor gateways should call the `ingest-sensor` function directly with `x-ingest-key`; do not embed those keys in the dashboard. `supabase/config.toml` disables platform JWT verification only for the two endpoints that validate their own scheduler or ingestion secret; the escalation function also accepts signed-in plant members for its manual dashboard action.

## Current boundaries

- Email, SMS, OPC UA gateway connectivity, and a CMMS provider are not configured because they require your plant's vendor endpoints and credentials. The schema includes an integration outbox to support those adapters.
- The browser connects incidents, assets, work orders, and knowledge documents to Supabase. Secondary analytics still use sample presentation data.
- AI triage uses explicit rules until a model provider is configured. It does not claim an AMD GPU connection from Supabase Edge Functions.
- `audit_events` records incident, asset, and work-order changes. Supabase Auth provides identity; `plant_members` controls plant membership and role-based writes.
