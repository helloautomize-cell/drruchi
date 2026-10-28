const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'dental-krafts');
const edit = (f, reps) => {
  const p = path.join(root, f);
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of reps) {
    if (!s.includes(a)) console.log('MISS', f, JSON.stringify(a.slice(0, 60)));
    s = s.split(a).join(b);
  }
  fs.writeFileSync(p, s);
};

edit('app/contact-us/page.tsx', [
  ['Book a ₹500 consultation at Dental Krafts, Gurgaon.', 'Book a consultation at Dental Krafts, Gurgaon.'],
]);

edit('app/patient-stories/page.tsx', [
  ['Book a ₹500 consultation. You', 'Book a consultation. You'],
]);

edit('app/our-dentists/page.tsx', [
  ["You'll see every step and every cost before anything begins.", "You'll see every step explained before anything begins."],
  ['Book a ₹500 visit', 'Book a visit'],
  ["A ₹500 consultation with a full examination. You'll leave with a plan and a written estimate.", "A consultation with a full examination. You'll leave with a plan, in writing."],
]);

edit('app/dr-ruchi-goel/page.tsx', [
  ['she explains the plan, the alternatives and the cost <em>before anything begins</em>', 'she explains the plan and the alternatives <em>before anything begins</em>'],
  ['she walks you through the plan, the alternatives and the cost, often with your photos and X-rays on screen.', 'she walks you through the plan and the alternatives, often with your photos and X-rays on screen.'],
  ['A ₹500 consultation, and a plan in <em>writing</em>.', 'A consultation, and a plan in <em>writing</em>.'],
]);

edit('app/dr-parmod-gulia/page.tsx', [
  ['A ₹500 visit, and a plan for your <em>child</em>.', 'A first visit, and a plan for your <em>child</em>.'],
]);

edit('app/gallery/page.tsx', [
  ["Book a ₹500 consultation. We'll show you what's possible for your teeth, with a written plan and estimate.", "Book a consultation. We'll show you what's possible for your teeth, with a written plan."],
]);

edit('app/treatments/page.tsx', [
  ['Specialist care, prices explained first.', 'Specialist care, explained first.'],
  ['<span className="p">{t.costChip ?? ""}</span>', '<span className="p"></span>'],
  ["Book a ₹500 consultation. We'll examine, explain and give you options, with no pressure to start that day.", "Book a consultation. We'll examine, explain and give you options, with no pressure to start that day."],
  ['book="Book a ₹500 visit"', 'book="Book a visit"'],
]);

edit('app/medical-tourism/page.tsx', [
  ['<h2 className="d h2">Specialist care, <em>fraction</em> of the cost.</h2>', '<h2 className="d h2">Specialist care, <em>planned</em> around your trip.</h2>'],
  ["Gurgaon has modern clinics and English-speaking specialists, at costs a fraction of those in the US, UK, Australia or the Gulf — with Delhi's hotels, food and sights next door.", "Gurgaon has modern clinics and English-speaking specialists — with Delhi's hotels, food and sights next door."],
  ["You'll get a written treatment plan and estimate you can share with your insurer", "You'll get a written treatment plan you can share with your insurer"],
  ['<Link className="chip" href="/treatment-costs">Typical costs</Link>', '<Link className="chip" href="/treatments">All treatments</Link>'],
  ['A specialist replies with a provisional plan and estimate.', 'A specialist replies with a provisional plan.'],
  ['From Dr Ruchi or Dr Parmod, with an estimate.', 'From Dr Ruchi or Dr Parmod.'],
  ['international patients get a written plan and estimate for their insurer', 'international patients get a written plan for their insurer'],
]);

edit('app/terms-conditions/page.tsx', [
  ["<b>Fees:</b> we'll let you know the cost of services before your treatment starts.", "<b>Payment:</b> you'll know what your treatment involves before it starts."],
  ['to avoid a cancellation fee.', 'so we can offer the slot to someone else.'],
]);

edit('app/best-dental-clinic-gurgaon/page.tsx', [
  ['{ icon: "receipt", q: "Will I see the cost first?", a: "Yes. A written, itemised estimate before treatment, with options from simplest to ideal." }', '{ icon: "receipt", q: "Will I see the plan first?", a: "Yes. A written, itemised plan before treatment, with options from simplest to ideal." }'],
  ['Book a ₹500 visit', 'Book a visit'],
  ["A ₹500 consultation with an examination. You'll see your options and the cost before anything begins.", "A consultation with a full examination. You'll see your options before anything begins."],
]);

edit('app/best-dental-clinic-golf-course-road-gurgaon/page.tsx', [
  ["A consultation costs ₹500, and you'll see a written estimate before any treatment starts.", "You'll see a written plan before any treatment starts."],
  ["Book a ₹500 consultation at the Sector 53 clinic. You'll leave with a plan and a written estimate.", "Book a consultation at the Sector 53 clinic. You'll leave with a written plan."],
]);

edit('app/dental-clinic-sector-53-gurgaon/page.tsx', [
  ['["Dental implants", "from ₹30,000", "/dental-implants"]', '["Dental implants", "Dr Ruchi", "/dental-implants"]'],
  ['["Root canal treatment", "from ₹6,000", "/root-canal-treatment"]', '["Root canal treatment", "Either dentist", "/root-canal-treatment"]'],
  ['["Crowns and bridges", "from ₹12,000", "/dental-crowns"]', '["Crowns and bridges", "Dr Ruchi", "/dental-crowns"]'],
  ['["Kids\' dentistry", "₹500 consultation", "/pediatric-dentist"]', '["Kids\' dentistry", "Dr Parmod", "/pediatric-dentist"]'],
  ['["Teeth whitening", "from ₹10,000", "/teeth-whitening"]', '["Teeth whitening", "Either dentist", "/teeth-whitening"]'],
  ['["Dentures", "from ₹5,000", "/dentures"]', '["Dentures", "Dr Ruchi", "/dentures"]'],
  ['["Teeth cleaning", "quoted at visit", "/teeth-cleaning"]', '["Teeth cleaning", "Either dentist", "/teeth-cleaning"]'],
  ['["Emergency care", "call us", "/emergency-dentist"]', '["Emergency care", "Call us", "/emergency-dentist"]'],
  ['([name, price, href]) => <Link key={href} href={href}><b>{name}</b><span>{price}</span></Link>', '([name, who, href]) => <Link key={href} href={href}><b>{name}</b><span>{who}</span></Link>'],
]);

edit('app/dental-clinic-sector-57-gurgaon/page.tsx', [
  ['["Kids\' dentistry", "₹500 consultation", "/pediatric-dentist"]', '["Kids\' dentistry", "Dr Parmod", "/pediatric-dentist"]'],
  ['["Root canal treatment", "from ₹6,000", "/root-canal-treatment"]', '["Root canal treatment", "Either dentist", "/root-canal-treatment"]'],
  ['["Dental implants", "from ₹30,000", "/dental-implants"]', '["Dental implants", "Dr Ruchi", "/dental-implants"]'],
  ['["Crowns and bridges", "from ₹12,000", "/dental-crowns"]', '["Crowns and bridges", "Dr Ruchi", "/dental-crowns"]'],
  ['["Teeth whitening", "from ₹10,000", "/teeth-whitening"]', '["Teeth whitening", "Either dentist", "/teeth-whitening"]'],
  ['["Teeth cleaning", "quoted at visit", "/teeth-cleaning"]', '["Teeth cleaning", "Either dentist", "/teeth-cleaning"]'],
  ['["Braces and aligners", "quoted after exam", "/teeth-braces"]', '["Braces and aligners", "Either dentist", "/teeth-braces"]'],
  ['["Emergency care", "call us", "/emergency-dentist"]', '["Emergency care", "Call us", "/emergency-dentist"]'],
  ['([name, price, href]) => <Link key={href} href={href}><b>{name}</b><span>{price}</span></Link>', '([name, who, href]) => <Link key={href} href={href}><b>{name}</b><span>{who}</span></Link>'],
]);

edit('app/best-dental-clinic-golf-course-road-gurgaon/page.tsx', [
  ['["tooth-implant", "Dental implants", "from ₹30,000", "/dental-implants"]', '["tooth-implant", "Dental implants", "Dr Ruchi", "/dental-implants"]'],
  ['["tooth-root", "Root canal treatment", "from ₹6,000", "/root-canal-treatment"]', '["tooth-root", "Root canal treatment", "Either dentist", "/root-canal-treatment"]'],
  ['["tooth", "Crowns and bridges", "from ₹12,000", "/dental-crowns"]', '["tooth", "Crowns and bridges", "Dr Ruchi", "/dental-crowns"]'],
  ['["first-tooth", "Kids\' dentistry", "₹500 consultation", "/pediatric-dentist"]', '["first-tooth", "Kids\' dentistry", "Dr Parmod", "/pediatric-dentist"]'],
  ['["sparkles", "Smile design & whitening", "from ₹10,000", "/smile-makeover"]', '["sparkles", "Smile design & whitening", "Dr Ruchi", "/smile-makeover"]'],
  ['["tooth-alert", "Emergency care", "call us", "/emergency-dentist"]', '["tooth-alert", "Emergency care", "Call us", "/emergency-dentist"]'],
  ['([ic, name, price, href])', '([ic, name, who, href])'],
  ['<span style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>{price}</span>', '<span style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>{who}</span>'],
]);

edit('app/blog/page.tsx', [
  ["costs, implants, kids' teeth and more.", "implants, kids' teeth and more."],
  ["Book a ₹500 consultation and ask your own questions — you'll leave with a plan and a written estimate.", "Book a consultation and ask your own questions — you'll leave with a written plan."],
]);

edit('app/blog/[slug]/page.tsx', [
  ['  Costs: [],\n', ''],
  ['A ₹500 consultation answers your own questions, with a written estimate.', 'A consultation answers your own questions, with a written plan.'],
  ['<Link className="chip" href="/treatment-costs">Treatment costs</Link>', '<Link className="chip" href="/treatments">All treatments</Link>'],
]);

console.log('ALL DONE');
