import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b7bf15d0db44447cab5ff7cdda56a57b',
  appName: 'shelflifeweb',
  webDir: 'dist',
  server: {
    url: 'https://b7bf15d0-db44-447c-ab5f-f7cdda56a57b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;