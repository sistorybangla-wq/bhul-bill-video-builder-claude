# দুই আউটপুটের নিয়ম

প্রতিটি ভিডিও কাজ ব্যবহারকারীর পর্যালোচনা ও অনুমোদনসহ দুই ধাপে করো। **Output 1 কোনো ভিডিও ফাইল নয়**—এটি SRT/স্ক্রিপ্ট অনুযায়ী তৈরি করতে যাওয়া দৃশ্যগুলোর scene-by-scene storyboard/পরিকল্পনা। ব্যবহারকারী সেটি দেখে ভুল সংশোধন চাইতে পারবেন. **Output 2 হলো অনুমোদনের পর তৈরি final MP4.**

## Output 1 — দৃশ্যের storyboard দেখানো

MP3 ও SRT যাচাই করে, SRT-এর লেখা অপরিবর্তিত রেখে একটি সহজ বাংলার দৃশ্য-পরিকল্পনা দাও। প্রতিটি দৃশ্যের জন্য দেখাও:

- দৃশ্য নম্বর ও আনুমানিক start/end time;
- ওই সময়ে SRT-তে থাকা কোন caption/narration অংশ চলবে (শুধু SRT-এর exact text উদ্ধৃত করবে; প্রয়োজন হলে বাদ দিয়ে timestamp উল্লেখ করবে);
- দৃশ্যে কী দেখা যাবে: background, original characters/props, action/expression;
- camera motion/transition, color mood এবং প্রস্তাবিত sound effect;
- scene-টি কোন SRT অংশকে দৃশ্যায়িত করছে।

দৃশ্যগুলো এমনভাবে বর্ণনা করো যেন ব্যবহারকারী আগে থেকেই বুঝতে পারেন final animation-এ কী দেখবেন। সম্ভব হলে scene-এর **static storyboard frame/contact sheet** বা key-frame image-ও দাও। এগুলো আলাদা review material; এগুলোকে video preview বা final video বলবে না। ব্যবহারকারী scene plan-এর লেখা/চিত্রে ভুল ধরতে পারবেন.

Storyboard-এ SRT-তে নেই এমন ঘটনা, সংলাপ, দাবি, চরিত্রের পরিচয় বা ফলাফল যোগ করবে না। কোনো scene detail অনুমানভিত্তিক হলে সেটি স্পষ্ট করে প্রশ্ন করবে বা neutral illustration প্রস্তাব করবে। Caption-এর wording কখনো বদলাবে না।

Storyboard দেখানোর পর থামো এবং বলো: **“এই দৃশ্য-পরিকল্পনা ঠিক আছে? পরিবর্তন চাইলে দৃশ্য নম্বর ও কী বদলাবেন বলুন। ঠিক থাকলে ‘অনুমোদন’ লিখুন; এরপর final MP4 বানাব।”**

## সংশোধন ও অনুমোদন

- ব্যবহারকারী পরিবর্তন চাইলে scene plan / storyboard সংশোধন করে আবার সম্পূর্ণ updated plan দেখাও। অনুমোদন না আসা পর্যন্ত final-quality video render করবে না।
- Caption text পরিবর্তনের অনুরোধ হলে বলো SRT-এর সংশোধিত কপি পাঠাতে; নিজে SRT wording পাল্টাবে না।
- শুধু স্পষ্ট সম্মতি—যেমন “অনুমোদন”, “ঠিক আছে, final করো”—অনুমোদন। অস্পষ্ট কথাকে অনুমোদন ধরে নেবে না.
- Storyboard অনুমোদনের পর দৃশ্যের বিষয়বস্তু, চরিত্র, layout বা animation-এ বড় পরিবর্তন দরকার হলে revised storyboard দেখিয়ে আবার অনুমোদন নাও। ছোট technical correction করা যায়, তবে caption/story meaning পাল্টানো যাবে না.

## Output 2 — final MP4

স্পষ্ট অনুমোদন পাওয়ার পর:

1. অনুমোদিত scene plan অনুসারে animation তৈরি করো.
2. Full-quality ৯:১৬, ১০৮০×১৯২০, ৩০ fps MP4 render করো.
3. `SKILL.md`-এর TypeScript/data check, scene-frame review, caption/font QA, audio check এবং `ffprobe` final verification করো.
4. কেবল সত্যিকারের তৈরি ও যাচাই করা final MP4 file tool দিয়ে দাও। Storyboard বা stills-কে MP4-এর বিকল্প বলবে না.
5. বাংলায় এক লাইনে জানাও কী সমস্যা রয়ে গেছে; সমস্যা না থাকলে বলো **“যা ঠিক হয়নি: কিছু নেই।”**

## Runtime সীমা

Claude.ai session-এ command execution বা file-render tool না থাকলে তা স্পষ্ট বলো। সে ক্ষেত্রে Output 1 হিসেবে storyboard/scene plan দিতে পারো; কিন্তু বাস্তবে render না হলে Output 2 তৈরি হয়েছে বলে দাবি করবে না, ভুয়া file/link দেবে না।
