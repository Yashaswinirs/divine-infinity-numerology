Developer notes · 1 of 4 · How to read this canvas

Three areas. Admin (dark purple) runs down the left in rows 1–10: 1 Sign-in & Overview, 2 Courses, 3 Students, 4 Consultations, 5 Live classes, 6 Payments, coupons, carts & wishlists, 7 Student questions, 8 Announcements, 9 Horoscopes, 10 Settings. Student area (light cream) is on the right in rows 11–20, 25 and 26. Website additions (dark homepage style) are rows 22–24 and 27.
The client’s own website designs (Home, About, Course, Course inner, Consultation, Horoscope, Free calculator, Blog, Blog inner, Contact, 404) are separate files and are not on this canvas.
Screen numbers (e.g. 6.3) are used throughout these notes.
Press Play on any screen to try it. Dashed “Prototype only” buttons are demo controls: don’t build them.
All names, numbers and dates are sample data. “Today” is Thu 29 Oct 2026. The same sample student, Priya Sharma, is used on both admin and student screens so the data lines up (₹42,497 paid, 79% through Numerology Foundations, Love consultation Wed 4 Nov 4 PM).
Phone frames show the mobile layout. Every screen is responsive.

Admin side menu (identical on every admin screen)
MANAGE: Overview, Courses, Students, Consultations, Live classes, Payments, Coupons, Carts & wishlists. ENGAGE: Horoscopes, Student questions, Announcements, Blogs (opens WordPress in a new tab). Settings at the bottom. Collapsible to icons.

Student menu
Dashboard, My courses, Live sessions, My questions, Consultations, Certificates, Payments, Profile & settings, plus Browse courses, Help (opens the website Contact page) and Log out. Top bar: search, wishlist and cart (with counts), notifications dropdown, account menu.

Design tokens
Admin: background #221c55 → #3b2452, gold headings #f7d2a0, cream buttons #fdd9a3 with #3a2468 text, green #3fd07a, red #ff5a5a.
Student: page #fdf8ef, cards #fffdf8, plum text #3d2352, purple buttons #7a5aa6, gold accents #d9952f, input fill #fdebc8.
Website: night-sky gradient with stars, gold headings #f6c98e, cream buttons #fdd9a3.
Fonts everywhere: Gilda Display (headings, numbers) and Lato (everything else).

Developer notes · 2 of 4 · Accounts, learning & content

• No batches. Students simply enrol in a course.
• Course access: every course is paid once, in full (no instalments), and stays available for its access period: default 1 year, set per course in 2.2/2.4 and as a default in Settings 10.1. Students see “Access until <date>” and get an email 30 days before it ends. From 30 days before the end, and after it ends, students can renew for another access period at the course’s renewal price (set in 2.2/2.4). Expired courses stay listed in My courses with a Renew button; progress, notes and certificates are kept, and certificates stay valid either way. Renewing early adds the new period to the current end date; renewing after expiry starts it from the payment date. Live classes, announcements and reports are per course, or open to all students.
• Student login (11): no passwords and no SMS/WhatsApp codes. Google, or an email containing a one-tap link AND a 6-digit code (works once, expires in 15 min, 3 tries, resend after 30 s). Unknown email → “No account yet” with Create account.
• Sign-up (12): name, email, mobile (contact only), date of birth → verify email → optional details (skippable) → Life Path welcome. Google sign-up skips verification and asks only mobile and date of birth.
• Numbers: Life Path = add every digit of the full birth date and reduce to one digit, keeping 11, 22 and 33. Personal year = birth day + birth month + current year (reduced); personal month = personal year + current month; personal day = personal month + today’s date. Universal day = all digits of today’s date.
• Course player (15): resumes at the last position; a lesson completes at 90% watched; 5-second autoplay to the next lesson; bookmarks and timestamped notes; captions need subtitle files (hide CC if none).
• Final assessment: unlocks after all lessons; 10 questions; 70% to pass; unlimited retakes.
• Certificates (19): issued when all lessons are done and the assessment is passed. Unique ID and public page /verify/<ID>. Name corrections come in through the Contact page and are reissued with the same ID and date.
• Live classes (5, 18): for one course or open to all. Join unlocks 10 min before start. RSVP feeds the “going” count. Questions sent ahead of a Q&A show for Teejaswinni. Recordings attach to a course module.
• Questions (7.1, 25, player Q&A tab): one shared thread system. Answers, follow-ups, pinned answers and “resolved” sync both ways. “Go to lesson” opens the player at the question’s timestamp.
• Horoscopes (9): fields match the website Horoscope page (overview, career, love, finance, lucky number, colour, direction, time) for daily, weekly, monthly and yearly. Element, ruling planet and quality are fixed per sign (Vedic rulers). Scheduled entries go live at 12:00 AM IST. An empty sign shows “Check back soon”.
• Reviews: approved from the Overview card (1.2) and each course’s Reviews tab (2.3). Students are asked for a rating once they’re past 50% of a course.
• Profile (20): birth details drive Life Path, personal day and consultation pre-fill. Email login is always on; Google can be connected or removed; device sessions can be logged out. Data export and account deletion (invoices kept for tax law).
• Blogs run on WordPress. The homepage pulls the latest 3 posts from the WordPress REST API.
Developer notes · 3 of 4 · Payments, consultations & website

• Payments go through Razorpay (UPI, cards, net banking). Card data never touches our servers.
• Prices are in ₹ and include 18% GST. Invoices show the GST split (CGST + SGST within Karnataka, IGST outside) and an optional GSTIN.
• No instalments or part payments: every course is paid in full at checkout.
• Checkout (22): creates the student account (Google or details) and enrols in one step. One coupon per order.
• Payment failed / pending (24): use for every payment (courses and consultations). Keep the order and coupon saved. “Pending” means the bank hasn’t confirmed yet: keep checking the status, block paying twice, and auto-refund if it isn’t confirmed within 30 min.
• Coupons (6.3–6.5): percent off (optional cap) or fixed amount; all or selected courses; everyone, new students only or existing students only; start/end dates, total uses, once per student. Codes aren’t case-sensitive.
• Cart & wishlist (26, 6.6–6.8): counts in the student top bar. Owned courses can’t be added. Cart checkout is one full payment for the total. Admin can send cart reminders (optional auto-email after 24 h) and email wishlist savers, optionally with a coupon. Price-drop and launch emails go to wishlist savers.
• Consultations (4, 16): available times come from 4.3 (weekly hours, 15-min break between sessions, 24-hour notice, up to 1 month ahead, blocked dates) minus existing bookings. The student pays upfront; the booking stays a request until Teejaswinni confirms in 4.1, with a full refund if she declines. Free cancel or reschedule up to 24 h before. Her written summary after the session shows in the student’s Consultations page.
• Legal pages (23): Terms, Privacy (written for India’s DPDP Act 2023) and Refund & Cancellation. Link them from the footer, sign-up, checkout and booking. Razorpay needs them before activating live payments.
• Cookie notice (27): show on the first visit to any public page. Load Google Analytics only after “Analytics” consent and ad pixels only after “Marketing” consent. Remember the choice for 12 months; “Cookie settings” in the footer reopens it.
• Contact form messages are emailed to Teejaswinni (no admin inbox).
• Most reminders and notifications go by email and calendar invite (free).
Developer notes · 4 of 4 · Open decisions, connections & not in scope

Confirm with the client before building
1. Legal pages: fill in [Legal business name] and the Grievance Officer, replace the sample email and phone, and have a lawyer or CA review the text.
2. Policies: 7-day course refund (under 20% watched), 24-hour consultation cancellation, and the 1-year course access length. Also confirm the renewal price for each course (samples: ₹4,999 and ₹7,999).
3. Prices shown as including GST.
4. WhatsApp: these admin features use the paid WhatsApp Business API: bulk reminders (3.1), payment reminders (6.1), the WhatsApp channel in Announcements (8.1), class reminders (5.2), the WhatsApp connection in Settings (10.1) and the admin login code (1.1). Kept as designed by decision. Confirm the per-message cost is acceptable, or switch to email.
5. Course catalogue: sample data differs between screens. The admin list has 4 courses; student screens also show Manifestation and Vedic Astrology Basics. Use the real catalogue from the database.
6. Assets: original course photos and a high-resolution logo. The logo on student and website screens is a redrawn placeholder.

Connect to the client’s own website designs
• Header “Login” → 11.1. Course inner page: Enrol → checkout (22), heart → wishlist, Add to cart → cart (26). Consultation page: Book → 16.2. Horoscope page reads content from admin 9. Free calculator results can invite visitors to sign up (12.1). Contact form → email to Teejaswinni.

Not in scope (by decision)
Batches, instalments / part payments, assignments, enquiries inbox, website content editor, email template designs, admin certificates screen, team & roles (single admin), reports page, separate admin reviews page, notifications page, help centre, maintenance page.
