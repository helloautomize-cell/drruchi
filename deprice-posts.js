const fs = require('fs');
const p = 'dental-krafts/content/posts.ts';
let s = fs.readFileSync(p, 'utf8');
const EOL = s.includes('\r\n') ? '\r\n' : '\n';

// --- 1. delete post objects whose own category is "Costs" ---
const starts = [...s.matchAll(/  \{\r?\n    slug: "/g)].map(m => m.index);
const endMark = s.indexOf(EOL + '];');
const blocks = [];
for (let i = 0; i < starts.length; i++) {
  const end = i + 1 < starts.length ? starts[i + 1] : endMark;
  blocks.push([starts[i], end, s.slice(starts[i], end)]);
}
const costs = blocks.filter(b => /category: "Costs"/.test(b[2]));
console.log('posts:', blocks.length, '| cost posts removed:', costs.length, costs.map(b => b[2].match(/slug: "([^"]+)"/)[1]).join(', '));
for (const b of [...costs].reverse()) s = s.slice(0, b[0]) + s.slice(b[1]);

// --- 2. drop whole body lines containing a rupee amount or Rs ---
let lines = s.split(EOL);
lines = lines.filter(l => !/₹|\bRs\.|\bINR\b/.test(l));

// --- 3. phrase-level rewrites for cost/price words ---
const reps = [
  ['benefits, costs, and treatment options', 'benefits and treatment options'],
  ['permanent and cost-effective solution', 'permanent and lasting solution'],
  ['Cost-effective alternative to individual implants', 'A simpler alternative to individual implants'],
  ['Cost: All-on-4 is more affordable per arch; traditional implants cost more because more implants are placed.', 'Scope: All-on-4 restores a whole arch at once; traditional implants place more implants.'],
  ['## How Much Do All-on-4 Dental Implants Cost in Gurgaon?', '## How All-on-4 Is Planned at Dental Krafts'],
  ['The cost of All-on-4 implants varies based on factors such as materials, clinic location, and dentist expertise. Additional dental conditions like wisdom teeth issues or the need for a root canal may influence the overall treatment cost.', 'How your All-on-4 plan is built depends on materials, bone condition, and whether other work — like wisdom teeth or a root canal — is needed first.'],
  ['## How Much Does a Root Canal Cost in Gurgaon?', '## How a Root Canal Is Planned'],
  ['## How Much Does a Tooth Extraction Cost in Gurgaon?', '## Tooth Extraction'],
  ['transparent pricing when choosing', 'clear plans when choosing'],
  ['2. How much does it cost to repair a chipped tooth?', '2. How is a chipped tooth repaired?'],
  ['Bonding is the most affordable option, while veneers and crowns cost more.', 'Bonding is the simplest fix; veneers and crowns are bigger treatments.'],
  ['types, procedure, benefits, risks, and costs', 'types, procedure, benefits and risks'],
  ['## How Much Does Dental Implant Surgery Cost?', '## How Implant Surgery Is Planned'],
  ['The cost varies based on the number of implants, type of implant, and additional procedures like bone grafting.', 'Your plan depends on the number of implants, the implant type, and additional procedures like bone grafting.'],
  ['offers top-quality dental treatments at affordable prices.', 'offers specialist dental treatments.'],
  ['Affordable prices with flexible payment plans', 'Clear, written plans'],
  ['painful or costly', 'painful or bigger problems'],
  ['Costs go up—because now you need', 'Treatment grows—because now you need'],
  ['## Cost of Dental Cleaning in Gurgaon', '## Dental Cleaning in Gurgaon'],
  ['unnecessary costs', 'unnecessary treatment'],
  ['Cost transparency', 'Clear plans'],
  ['Expected costs', 'What the plan covers'],
  ['## Compare Costs, but Do Not Choose Only by Price', '## Compare Clinics on More Than One Factor'],
  ['Dental treatment costs can vary depending on', 'Dental treatment plans can vary depending on'],
  ['Ask for a written estimate that includes: Cost Area', 'Ask for a written plan that covers:'],
  ['Whether imaging costs are included', 'Whether imaging is included'],
  ['Full treatment cost', 'The full plan'],
  ['Choose transparent pricing rather than the cheapest offer.', 'Choose clear, written plans.'],
  ['treatment costs, and personal concerns', 'treatment options, and personal concerns'],
  ['Costs are transparent', 'Plans are transparent'],
  ['risks, cost, treatment time', 'risks, treatment time'],
  ['their cost, procedure, pros & cons', 'the procedure, pros & cons'],
  ['It’s often part of budget treatments for patients seeking cost-effective solutions.', 'It’s often suggested for patients wanting a simpler treatment.'],
  ['Lower initial cost', 'A smaller first step'],
  ['Cost: implants cost more upfront but last longer; bridges are cheaper but may need replacement.', 'Longevity: implants last longer; bridges may need replacement sooner.'],
  ['## Cost Considerations', '## Things to Weigh'],
  ['Implants cost more initially but last much longer. Bridges are budget-friendly but might require maintenance.', 'Implants last much longer. Bridges may need maintenance or replacement over time.'],
  ['sedation or anesthesia costs are covered', 'sedation or anaesthesia is covered'],
  ['4. Cost Savings', '4. Early treatment'],
  ['avoid costly dental procedures like root canal treatment or dental implants by addressing problems early', 'avoid bigger treatments like root canals or implants by catching problems early'],
  ['Root Canal Treatment: Cost, Procedure & Benefits', 'Root Canal Treatment: Procedure & Benefits'],
  ['including cost, procedure, benefits', 'including procedure and benefits'],
  ['wondering about the cost of root canal treatment, how it’s done, and whether it’s worth it', 'wondering how root canal treatment is done and whether it’s worth it'],
  ['provide a detailed cost breakdown for root canals in Gurgaon', 'explain how it is planned'],
  ['check dental bridges cost options if necessary', 'discuss a dental bridge if needed'],
  ['reduce costs, sometimes avoiding', 'keep treatment smaller, sometimes avoiding'],
  ['## Root Canal Treatment Cost in Gurgaon (2026 Guide)', '## Root Canal Treatment in Gurgaon (2026 Guide)'],
  ['The cost of Root Canal Treatment in Gurgaon can vary depending on several factors, including the complexity of the case', 'How a root canal is planned depends on several factors, including the complexity of the case'],
  ['## Factors Affecting Root Canal Treatment Cost', '## What Shapes Your Root Canal Plan'],
  ['may add to the cost but enhance precision', 'may change the plan but enhance precision'],
  ['can increase costs —', 'can extend the plan —'],
  ['costly replacements like implants or bridges', 'bigger treatments like implants or bridges'],
  ['Cost-Effective in the Long Run', 'Worth It in the Long Run'],
  ['Cost over time: root canal is a one-time expense; implants/bridges add cost.', 'Over time: a root canal is a one-time treatment; extraction means a replacement tooth later.'],
  ['Transparent Pricing: No hidden costs — complete clarity on RCT pricing.', 'Clear planning: every step explained before treatment starts.'],
  ['Higher Cost: Generally more expensive than metal braces.', 'A bigger treatment: generally more involved than metal braces.'],
  ['Cost: Self-ligating braces can be more expensive than traditional braces and are sometimes part of budget treatments planning.', 'Self-ligating braces are a bigger treatment than traditional braces.'],
  ['Tooth Filling in Gurgaon: Treatment, Types, Cost, and Process', 'Tooth Filling in Gurgaon: Treatment, Types, and Process'],
  ['types, costs, and the process', 'types and the process'],
  ['types of fillings, costs, and more', 'types of fillings'],
  ['durable and cost-effective', 'durable and a simple choice'],
  ['## Cost of Tooth Fillings in Gurgaon', '## Tooth Fillings in Gurgaon'],
  ['The cost and type of filling vary based on individual needs.', 'The type of filling depends on your tooth.'],
  ['check dental bridges cost for options', 'discuss a dental bridge'],
  ['Worrying about the cost of removal', 'Worrying about the removal'],
  ['Cost: Zirconia crowns can be more expensive than crowns made from other materials.', 'Zirconia crowns are a bigger treatment than crowns made from other materials.'],
];
s = lines.join(EOL);
for (const [a, b] of reps) {
  if (!s.includes(a)) console.log('MISS:', JSON.stringify(a.slice(0, 70)));
  s = s.split(a).join(b);
}
fs.writeFileSync(p, s);

// --- report leftovers ---
s.split(EOL).forEach((l, i) => {
  if (/₹|\bRs\b|INR|\bprice|\bprices|\bpriced|\bpricing|\bcost|\bcosts|\bEMI\b|per tooth|consultation fee/i.test(l)) {
    console.log('LEFT ' + (i + 1) + ': ' + l.trim().slice(0, 140));
  }
});
console.log('DONE');
