-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily SMS reminders at 10 AM
SELECT cron.schedule(
  'daily-sms-reminder-10am',
  '0 10 * * *', -- Every day at 10:00 AM
  $$
  SELECT
    net.http_post(
        url:='https://fckhisiclzpkkqgyhtmz.supabase.co/functions/v1/daily-sms-reminder',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZja2hpc2ljbHpwa2txZ3lodG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODc5MzQsImV4cCI6MjA3MzM2MzkzNH0.mScQO0CNr4igvtpJw_u8sz4IAyhx0CC6T_vw5c49DHk"}'::jsonb,
        body:='{"scheduled": true}'::jsonb
    ) as request_id;
  $$
);