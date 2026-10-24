-- Run With Saints: fake data for local development.
-- Runs automatically after migrations on `npx supabase db reset`.
-- Every name here is made up.
--
-- Dates are relative to today, e.g. "3 days from now at 7:30 p.m. New York time",
-- so the events are always upcoming whenever you reset the database.

-- ---------------------------------------------------------------
-- Organizers (fixed ids so events can point at them)
-- ---------------------------------------------------------------
insert into public.organizers (id, name, type, slug, website) values
  ('00000000-0000-0000-0000-000000000001', 'St. Brendan Parish',                     'parish',       'st-brendan-parish-dc',          'https://example.com'),
  ('00000000-0000-0000-0000-000000000002', 'Capitol Hill Catholic Runners',          'ministry',     'capitol-hill-catholic-runners', null),
  ('00000000-0000-0000-0000-000000000003', 'Holy Family Parish, Brooklyn',           'parish',       'holy-family-brooklyn',          'https://example.com'),
  ('00000000-0000-0000-0000-000000000004', 'Manhattan Catholic Young Professionals', 'ministry',     'manhattan-catholic-yps',        null),
  ('00000000-0000-0000-0000-000000000005', 'Catholic Formation Online',              'organization', 'catholic-formation-online',     'https://example.com'),
  ('00000000-0000-0000-0000-000000000006', 'Maria Alvarez',                          'individual',   'maria-alvarez',                 null);

-- ---------------------------------------------------------------
-- Events: 8 in D.C., 7 in New York, 5 online
-- One draft (#8) and one cancelled (#15) let you test the security rules.
-- ---------------------------------------------------------------
insert into public.events
  (slug, title, starts_at, is_online, venue_name, address, latitude, longitude,
   organizer_id, description, category, status, registration_url)
values
  -- Washington, D.C.
  ('young-adult-trivia-night-dc', 'Young Adult Trivia Night',
   ((current_date + 3) + time '19:30') at time zone 'America/New_York',
   false, 'St. Brendan Parish Hall', 'Capitol Hill, Washington, DC', 38.8899, -76.9950,
   '00000000-0000-0000-0000-000000000001',
   'Teams of four, saints-and-scripture rounds, and pizza. Come alone and we will put you on a team.',
   'young_adults', 'published', null),

  ('saturday-rosary-run-dc', 'Saturday Rosary Run',
   ((current_date + 5) + time '08:00') at time zone 'America/New_York',
   false, 'Lincoln Park', 'Capitol Hill, Washington, DC', 38.8906, -76.9900,
   '00000000-0000-0000-0000-000000000002',
   'An easy 5K with a decade of the Rosary at each mile. All paces welcome; coffee afterward.',
   'sports_outdoors', 'published', null),

  ('first-friday-adoration-dc', 'First Friday Adoration and Confession',
   ((current_date + 7) + time '19:00') at time zone 'America/New_York',
   false, 'St. Brendan Church', 'Capitol Hill, Washington, DC', 38.8899, -76.9950,
   '00000000-0000-0000-0000-000000000001',
   'An hour of Eucharistic adoration with confessions available throughout.',
   'mass_adoration', 'published', null),

  ('soup-kitchen-morning-dc', 'Soup Kitchen Volunteer Morning',
   ((current_date + 9) + time '09:00') at time zone 'America/New_York',
   false, 'Community Meal Center', 'NoMa, Washington, DC', 38.9067, -77.0030,
   '00000000-0000-0000-0000-000000000006',
   'Serve breakfast with a small group. Closed-toe shoes required. Spots are limited, so please register.',
   'service', 'published', 'https://example.com/register'),

  ('theology-on-tap-friendship-dc', 'Theology on Tap: Saints and Friendship',
   ((current_date + 12) + time '19:00') at time zone 'America/New_York',
   false, 'The Corner Pub', 'Navy Yard, Washington, DC', 38.8764, -77.0030,
   '00000000-0000-0000-0000-000000000001',
   'A short talk on the friendships of the saints, then open discussion. Ages 21 and up.',
   'faith_formation', 'published', null),

  ('parish-family-picnic-dc', 'Parish Family Picnic',
   ((current_date + 15) + time '12:00') at time zone 'America/New_York',
   false, 'Garfield Park', 'Capitol Hill, Washington, DC', 38.8830, -77.0000,
   '00000000-0000-0000-0000-000000000001',
   'Bring a dish to share. Games for kids, a bounce house, and a blessing before lunch.',
   'family', 'published', null),

  ('potomac-trail-hike-dc', 'Potomac Trail Hike',
   ((current_date + 18) + time '09:00') at time zone 'America/New_York',
   false, 'Great Falls Park trailhead', 'Great Falls, VA', 38.9985, -77.2550,
   '00000000-0000-0000-0000-000000000002',
   'A moderate 4-mile hike with Morning Prayer at the overlook. Carpools leave from the parish at 8:15.',
   'sports_outdoors', 'published', null),

  ('advent-retreat-draft-dc', 'Advent Retreat (draft)',
   ((current_date + 20) + time '09:00') at time zone 'America/New_York',
   false, 'St. Brendan Parish Hall', 'Capitol Hill, Washington, DC', 38.8899, -76.9950,
   '00000000-0000-0000-0000-000000000001',
   'Still being planned. This draft should NOT be visible on the website.',
   'retreats', 'draft', null),

  -- New York
  ('young-adult-mass-social-brooklyn', 'Young Adult Mass and Social',
   ((current_date + 4) + time '18:00') at time zone 'America/New_York',
   false, 'Holy Family Church', 'Park Slope, Brooklyn, NY', 40.6720, -73.9780,
   '00000000-0000-0000-0000-000000000003',
   'Evening Mass followed by snacks in the courtyard. A good first event if you are new to the area.',
   'young_adults', 'published', null),

  ('catholic-professionals-breakfast-nyc', 'Catholic Professionals Breakfast',
   ((current_date + 6) + time '07:30') at time zone 'America/New_York',
   false, 'Midtown Diner', 'Midtown, Manhattan, NY', 40.7549, -73.9840,
   '00000000-0000-0000-0000-000000000004',
   'Early breakfast and a short reflection before work. Done by 8:45.',
   'social', 'published', null),

  ('food-pantry-shift-brooklyn', 'Food Pantry Shift',
   ((current_date + 8) + time '10:00') at time zone 'America/New_York',
   false, 'Holy Family Parish Center', 'Park Slope, Brooklyn, NY', 40.6720, -73.9780,
   '00000000-0000-0000-0000-000000000003',
   'Sort donations and pack grocery bags for neighbors. Two-hour shift.',
   'service', 'published', null),

  ('saints-5k-central-park', 'Saints 5K in Central Park',
   ((current_date + 11) + time '08:00') at time zone 'America/New_York',
   false, 'Central Park, East 72nd St entrance', 'Upper East Side, Manhattan, NY', 40.7720, -73.9670,
   '00000000-0000-0000-0000-000000000004',
   'A casual group run around the lower loop, then brunch nearby.',
   'sports_outdoors', 'published', null),

  ('holy-hour-praise-midtown', 'Holy Hour with Praise Music',
   ((current_date + 13) + time '19:30') at time zone 'America/New_York',
   false, 'St. Agnes Chapel', 'Midtown, Manhattan, NY', 40.7520, -73.9770,
   '00000000-0000-0000-0000-000000000004',
   'Adoration with live praise and worship music. Stay for all or part of the hour.',
   'mass_adoration', 'published', null),

  ('bible-study-acts-brooklyn', 'Bible Study: The Acts of the Apostles',
   ((current_date + 16) + time '19:00') at time zone 'America/New_York',
   false, 'Holy Family Parish Center', 'Park Slope, Brooklyn, NY', 40.6720, -73.9780,
   '00000000-0000-0000-0000-000000000003',
   'Week one of an eight-week study. No preparation needed; Bibles provided.',
   'faith_formation', 'published', null),

  ('silent-retreat-day-nyc', 'Day of Silent Retreat',
   ((current_date + 22) + time '09:00') at time zone 'America/New_York',
   false, 'Retreat House', 'Riverdale, Bronx, NY', 40.9000, -73.9100,
   '00000000-0000-0000-0000-000000000004',
   'A guided day of silence, prayer and spiritual direction. Lunch included.',
   'retreats', 'cancelled', 'https://example.com/register'),

  -- Online
  ('compline-together-online', 'Night Prayer (Compline) Together',
   ((current_date + 1) + time '21:00') at time zone 'America/New_York',
   true, null, null, null, null,
   '00000000-0000-0000-0000-000000000005',
   'Fifteen minutes of the Church''s night prayer on a video call. Cameras optional.',
   'mass_adoration', 'published', null),

  ('lectio-divina-online', 'Lectio Divina on Zoom',
   ((current_date + 2) + time '20:00') at time zone 'America/New_York',
   true, null, null, null, null,
   '00000000-0000-0000-0000-000000000005',
   'Pray with Sunday''s Gospel using the four steps of lectio divina, in small breakout groups.',
   'faith_formation', 'published', null),

  ('catholic-parenting-qa-online', 'Catholic Parenting Q&A',
   ((current_date + 10) + time '20:30') at time zone 'America/New_York',
   true, null, null, null, null,
   '00000000-0000-0000-0000-000000000005',
   'Parents of young children trade ideas for family prayer, Sunday Mass with toddlers and more.',
   'family', 'published', null),

  ('young-adult-book-club-online', 'Young Adult Book Club',
   ((current_date + 14) + time '20:00') at time zone 'America/New_York',
   true, null, null, null, null,
   '00000000-0000-0000-0000-000000000005',
   'This month: a short spiritual classic. Read as much as you can and join the conversation.',
   'young_adults', 'published', null),

  ('discernment-conference-online', 'Discernment Conference',
   ((current_date + 25) + time '10:00') at time zone 'America/New_York',
   true, null, null, null, null,
   '00000000-0000-0000-0000-000000000005',
   'A half-day online conference on discerning vocation, with talks and Q&A. Free, registration required.',
   'conferences', 'published', 'https://example.com/register');

-- Give every event a two-hour end time
update public.events set ends_at = starts_at + interval '2 hours' where ends_at is null;
