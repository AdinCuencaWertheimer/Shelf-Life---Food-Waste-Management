import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TwilioMessage {
  Body: string;
  From: string;
  To: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('SMS reminder function called');

  try {
    // Check if this is a test call or get message type
    const body = await req.text();
    const requestData = body ? JSON.parse(body) : {};
    const isTest = requestData?.test === true;
    const messageType = requestData?.type || 'inventory'; // 'inventory' for 10am, 'dinner' for 4pm
    console.log('Is test call:', isTest);
    console.log('Message type:', messageType);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Twilio credentials
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

    console.log('Checking Twilio credentials...');
    console.log('Account SID exists:', !!twilioAccountSid);
    console.log('Auth Token exists:', !!twilioAuthToken);
    console.log('Phone Number exists:', !!twilioPhoneNumber);

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      console.error('Missing Twilio credentials');
      throw new Error('Missing Twilio credentials');
    }

    // Get users who need daily reminders
    console.log('Calling get_users_for_daily_reminder function...');
    const { data: users, error } = await supabaseClient.rpc('get_users_for_daily_reminder');

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    console.log(`Found ${users?.length || 0} users for daily reminders`);
    console.log('Users data:', JSON.stringify(users, null, 2));

    const results = [];

    if (users && users.length > 0) {
      for (const user of users) {
        console.log(`Processing user: ${user.user_id}, phone: ${user.phone_number}`);
        
        // Format phone number to E.164 format if needed
        let formattedPhone = user.phone_number;
        if (formattedPhone && !formattedPhone.startsWith('+')) {
          // Remove any non-digit characters
          const digitsOnly = formattedPhone.replace(/\D/g, '');
          
          // Assume US number if no country code
          if (digitsOnly.length === 10) {
            formattedPhone = `+1${digitsOnly}`;
          } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
            formattedPhone = `+${digitsOnly}`;
          } else {
            console.error(`Invalid phone number format: ${user.phone_number} (${digitsOnly.length} digits)`);
            results.push({
              user_id: user.user_id,
              phone_number: user.phone_number,
              status: 'failed',
              error: `Invalid phone number format: ${digitsOnly.length} digits`
            });
            continue;
          }
        }
        console.log(`Formatted phone number: ${formattedPhone}`);
        try {
          let message = '';
          
          if (messageType === 'dinner') {
            // 4 PM dinner suggestion message with specific recipes
            if (user.expiring_count > 0 || user.expired_count > 0) {
              const recipeIdeas = [
                "Quick Vegetable Stir-Fry - toss any veggies with soy sauce and garlic, serve over rice or noodles!",
                "One-Pan Pasta - add your expiring vegetables directly to boiling pasta water for the last few minutes",
                "Fresh Garden Salad - mix your leafy greens with olive oil, lemon, and any other fresh ingredients",
                "Smoothie Bowl - blend fruits with yogurt and top with nuts or granola for a healthy dinner",
                "Simple Soup - sauté vegetables, add broth, and simmer until tender. Perfect comfort food!",
                "Vegetable Omelets - whisk eggs and fold in any vegetables you need to use up",
                "Quick Grain Bowl - layer rice or quinoa with roasted vegetables and your favorite protein"
              ];
              const randomRecipe = recipeIdeas[Math.floor(Math.random() * recipeIdeas.length)];
              
              if (user.expired_count > 0 && user.expiring_count > 0) {
                message = `🍽️ Dinner inspiration! You have ${user.expired_count} expired and ${user.expiring_count} expiring items. Tonight try: ${randomRecipe}`;
              } else if (user.expired_count > 0) {
                message = `🍽️ Quick dinner idea! After clearing out ${user.expired_count} expired items, try: ${randomRecipe}`;
              } else {
                message = `🍽️ Perfect timing for dinner! Use your ${user.expiring_count} expiring items in: ${randomRecipe}`;
              }
            } else {
              const freshRecipeIdeas = [
                "Classic Spaghetti Aglio e Olio - just garlic, olive oil, and pasta for a simple Italian dinner",
                "Grilled Cheese and Tomato Soup - comfort food at its finest!",
                "Chicken Caesar Salad - fresh, crispy, and satisfying",
                "Vegetable Curry with Rice - warm spices and hearty vegetables",
                "Fish Tacos with Fresh Salsa - light and flavorful for tonight"
              ];
              const randomFreshRecipe = freshRecipeIdeas[Math.floor(Math.random() * freshRecipeIdeas.length)];
              message = `🍽️ Your kitchen is well-stocked! Tonight's suggestion: ${randomFreshRecipe}`;
            }
          } else {
            // 10 AM friendly kitchen summary message
            if (user.expired_count > 0 && user.expiring_count > 0) {
              message = `🌅 Good morning! Quick kitchen check: ${user.expired_count} items expired and ${user.expiring_count} expiring soon. A little cleanup and you'll be all set for fresh cooking today! ✨`;
            } else if (user.expired_count > 0) {
              message = `🌅 Morning! Just a heads up - you have ${user.expired_count} expired items to clear out. Once done, your kitchen will be perfectly fresh for today's meals! 🧹`;
            } else if (user.expiring_count > 0) {
              message = `🌅 Good morning! You have ${user.expiring_count} items expiring soon - perfect timing to use them in today's meals. Great planning! 👨‍🍳`;
            } else {
              message = `🌅 Good morning! Your kitchen is beautifully organized with everything fresh and ready. You're crushing this food management game! 🌟`;
            }
          }

          console.log(`Sending SMS to ${formattedPhone}: "${message}"`);

          // Send SMS via Twilio
          const twilioMessage: TwilioMessage = {
            Body: message,
            From: twilioPhoneNumber,
            To: formattedPhone,
          };
          console.log('Twilio message payload:', twilioMessage);

          const response = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams(twilioMessage),
            }
          );

          console.log(`Twilio response status: ${response.status}`);

          if (response.ok) {
            const twilioResponse = await response.json();
            console.log('Twilio response:', twilioResponse);
            results.push({
              user_id: user.user_id,
              phone_number: formattedPhone,
              message_sid: twilioResponse.sid,
              status: 'sent',
              message: message
            });
            console.log(`SMS sent successfully to ${formattedPhone}`);
          } else {
            const errorData = await response.text();
            console.error(`Failed to send SMS to ${formattedPhone}:`, errorData);
            console.error('Response status:', response.status);
            console.error('Response headers:', Object.fromEntries(response.headers.entries()));
            results.push({
              user_id: user.user_id,
              phone_number: formattedPhone,
              status: 'failed',
              error: errorData
            });
          }
        } catch (error) {
          console.error(`Error sending SMS to user ${user.user_id}:`, error);
          results.push({
            user_id: user.user_id,
            phone_number: formattedPhone,
            status: 'failed',
            error: error.message
          });
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Daily SMS reminders processed for ${users?.length || 0} users`,
        results: results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
})