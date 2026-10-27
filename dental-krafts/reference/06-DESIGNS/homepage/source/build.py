import re
parts=[open(f).read() for f in ['p1.html','p2.html','p3.html','p4.html','p5.html']]
html='\n'.join(parts)
NAVL='''<li><a href="#s-treat">Treatments <svg class="ic"><use href="#i-chevron-down"/></svg></a></li><li><a href="#s-docs">Our dentists</a></li><li><a href="#s-kids">Kids</a></li><li><a href="#s-costs">Costs</a></li><li><a href="#s-res">Results</a></li><li><a href="#s-clin">Clinics</a></li>'''
NAV=f'<div class="wrap"><img class="logo" src="img/dk-logo-colour.svg" alt="Dental Krafts"><ul>{NAVL}</ul><div class="acts"><a class="btn btn-s btn-sm" href="#s-clin">{{i:phone-call:sm}} Call</a><a class="btn btn-p btn-sm" href="#s-book">Book a visit</a></div></div>'
NAVD=f'<div class="wrap"><img class="logo" src="img/dk-logo-reversed.svg" alt="Dental Krafts"><ul>{NAVL}</ul><div class="acts"><a class="btn btn-w btn-sm" href="#s-book">Book a visit</a></div></div>'
UTIL='<div class="util"><div class="wrap"><span>{i:clock:sm} <b>Open 6 days</b> · 10 am – 8:30 pm · closed Wednesdays</span><span class="hide-m">{i:map-pin:sm} Golf Course Road · Sushant Lok 2</span><span>{i:phone-call:sm} <b class="tnum">98104 48720</b> · <b class="tnum">95992 52018</b></span></div></div>'
TK=[('medal','AIIMS MDS entrance topper','2012 · Dr Ruchi Goel'),('award','MDS, AIIMS New Delhi','Prosthodontics'),('award','MDS, PGIMER Chandigarh','Pedodontics · silver medal'),('user-heart','Senior Research Fellow','AIIMS · Dr Parmod Gulia'),('trophy','ISPPD best paper','2014'),('shield-check','Registered','Delhi State Dental Council'),('star','5.0 on Practo','1,000+ patient stories')]
TICKER=''.join(f'<div class="it"><span class="badge">{{i:{a}}}</span><span>{b}<small>{c}</small></span></div>' for a,b,c in TK)
FAQS=[('cost','How much does a consultation cost?','₹500, including an examination by the dentist. X-rays, if needed, are charged separately and explained first.'),
('visit','Which clinic should I visit?','Whichever is closer. Both dentists consult at both clinics on set days, so call to check who\'s in.'),
('visit','Are you open on weekends?','Yes, Saturday and Sunday. We\'re closed only on Wednesdays.'),
('kids','Do you treat children?','Yes. Dr Parmod Gulia is a specialist pediatric dentist (MDS, PGIMER Chandigarh), and he sees babies, children, teens and children with special needs.'),
('treat','Is a root canal painful?','It\'s done under local anaesthesia, and most patients say it feels like a long filling. We\'ll tell you what to expect before we start.'),
('treat','How long does an implant take?','Usually 3 to 6 months from placing the implant to fixing the final tooth, because the bone needs time to heal around it. Dr Ruchi will give you a timeline at your consultation.'),
('visit','Can I get a second opinion?','Of course. Bring your X-rays and the treatment plan you were given.'),
('cost','Do you accept insurance?','Call us to check your plan. We\'ll give you an itemised bill for reimbursement.'),
('visit','What should I do in a dental emergency?','Call the nearest clinic. During working hours we try to see urgent cases the same day.')]
FAQ=''.join(f'<details class="qa" data-t="{t}"><summary>{q}<span class="pm">{{i:plus:sm}}</span></summary><p>{a}</p></details>' for t,q,a in FAQS)
BAND=''.join(f'<span>{{i:{a}}} {t}</span>' for a,t in [('map-pin','Sector 53 · Golf Course Road'),('map-pin','Sector 57 · Sushant Lok 2'),('clock','10 am – 8:30 pm · closed Wednesdays'),('phone-call','98104 48720 · 95992 52018'),('award','MDS, AIIMS New Delhi'),('medal','MDS, PGIMER Chandigarh · silver medal'),('shield-check','Registered with the Delhi State Dental Council')])
html=html.replace('{NAVL}',NAVL).replace('{XBAND}',BAND)
html=html.replace('{NAVDARK}',NAVD).replace('{NAV}',NAV).replace('{UTIL}',UTIL).replace('{TICKER}',TICKER).replace('{FAQ}',FAQ)
names={}
def rail(m):
    key,num,name,opts=m.group(1),m.group(2),m.group(3),m.group(4)
    names[key]=name
    bs=''.join(f'<button data-v="{o.split("=")[0]}" data-l="{o.split("=")[1]}" aria-pressed="false"><span>{o.split("=")[0]}</span>{o.split("=")[1]}</button>' for o in opts.split('|'))
    return f'<div class="rail-o"><div class="wrap"><div class="nm"><i>{num}</i><b>{name}</b><span>{len(opts.split("|"))} options</span></div><div class="seg" role="group" aria-label="{name} options">{bs}</div></div></div>'
html=re.sub(r'\{RAIL:([a-z]+):(\d+):([^:]+):([^}]+)\}',rail,html)
html=re.sub(r'data-s="([a-z]+)">',lambda m:f'data-s="{m.group(1)}" data-name="{names.get(m.group(1),m.group(1))}">',html)
def ic(m):
    n=m.group(1);s=m.group(2)
    cls='ic'+(' ic-'+s if s else '')
    return f'<svg class="{cls}" aria-hidden="true"><use href="#i-{n}"/></svg>'
html=re.sub(r'\{i:([a-z0-9-]+)(?::(sm|lg))?\}',ic,html)
# content fixes
html=html.replace('<button class="chip" aria-pressed="false">Dentures</button><button class="chip" aria-pressed="false">Veneers and gaps</button>','<button class="chip" aria-pressed="false">Veneers and gaps</button>')
html=html.replace('Of course. Dr Ruchi has slots on Thursday evening. Shall we book 6:30 pm?','Of course. Which day suits you? We\'ll confirm a time with the dentist.')
sprite=open('sprite.svg').read()
bar='''<div class="pick"><div class="wrap"><div><b>Dental Krafts · homepage</b><br><span>All 15 sections approved · hero E, Forest concierge</span></div><div class="sum" id="sum" hidden></div><button class="copy" id="copy" hidden>Copy my pick</button></div></div><textarea id="copy-box" hidden style="width:100%;min-height:80px" aria-label="Your picks"></textarea>'''
# insert sprite+bar after the first </style>
i=html.index('</style>')+len('</style>')
html=html[:i]+'\n'+sprite+'\n'+bar+'\n'+html[i:]
left=re.findall(r'\{[A-Za-z]+[:}][^}]*\}?',html)
left=[l for l in left if not l.startswith('{"') and 'i:' not in l[:3]]
print('leftover placeholders:',[l for l in re.findall(r'\{(?:i:|RAIL|NAV|UTIL|TICKER|FAQ)[^}]*\}',html)])
open('dental-krafts-homepage.html','w').write(html)
print(len(html))
