-- Enable the pg_cron and pg_net extensions needed for scheduled functions
SELECT cron.unschedule('morning-sms-reminder');
SELECT cron.unschedule('evening-sms-reminder');

-- Schedule morning SMS reminders at 10:00 AM every day (EST/EDT)
-- Using 14:00 UTC to account for EDT (UTC-4) - adjust if needed for your timezone
SELECT cron.schedule(
  'morning-sms-reminder',
  '0 14 * * *', -- 10:00 AM EDT (14:00 UTC)
  $$
  SELECT
    net.http_post(
        url:='https://fckhisiclzpkkqgyhtmz.supabase.co/functions/v1/daily-sms-reminder',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZja2hpc2ljbHpwa2txZ3lodG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODc5MzQsImV4cCI6MjA3MzM2MzkzNH0.mScQO0CNr4igvtpJw_u8sz4IAyhx0CC6T_vw5c49DHk"}'::jsonb,
        body:='{"type": "inventory"}'::jsonb
    ) as request_id;
  $$
);

-- Schedule evening SMS reminders at 4:00 PM every day (EST/EDT)  
-- Using 20:00 UTC to account for EDT (UTC-4) - adjust if needed for your timezone
SELECT cron.schedule(
  'evening-sms-reminder', 
  '0 20 * * *', -- 4:00 PM EDT (20:00 UTC)
  $$
  SELECT
    net.http_post(
        url:='https://fckhisiclzpkkqgyhtmz.supabase.co/functions/v1/daily-sms-reminder',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZja2hpc2ljbHpwa2txZ3lodG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODc5MzQsImV4cCI6MjA3MzM2MzkzNH0.mScQO0CNr4igvtpJw_u8sz4IAyhx0CC6T_vw5c49DHk"}'::jsonb,
        body:='{"type": "dinner"}'::jsonb
    ) as request_id;
  $$
);

-- View scheduled jobs to confirm they were created
SELECT * FROM cron.job WHERE jobname IN ('morning-sms-reminder', 'evening-sms-reminder');