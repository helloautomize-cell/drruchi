import re
p1=open('p1.html').read().replace('<title>Dental Krafts homepage options</title>','<title>Dental Krafts inner pages</title>')
ip=open('ip.html').read()
def faq(items):
    return ''.join(f'<details class="qa"><summary>{q}<span class="pm">{{i:plus:sm}}</span></summary><p>{a}</p></details>' for q,a in items)
FD=[('What is a prosthodontist?','A dentist with three more years of specialist training in replacing and restoring teeth: implants, dentures, crowns, bridges and complex rebuilding. In India it\'s an MDS in Prosthodontics.'),('Can I replace all my teeth with implants?','Often, yes. All-on-4 or All-on-6 fixes a full set of teeth on four to six implants. Dr Ruchi will check your bone with a scan before recommending it.'),('I already wear dentures. Can they be made more secure?','Yes. Two to four implants can hold a denture firmly in place, so it won\'t slip while you eat or speak.')]
FT=[('Does getting an implant hurt?','It\'s done under local anaesthesia. Most patients say it was easier than an extraction. Mild soreness for 2 to 3 days is normal, and painkillers handle it.'),('How long do implants last?','With good care and regular check-ups, many last 15 to 20 years or more. The crown on top may need replacing sooner.'),('Am I too old for an implant?','Age isn\'t the limit. Bone health and general health are. Many of our implant patients are in their 60s and 70s.'),('I have diabetes. Can I get an implant?','Usually yes, if it\'s well controlled. We\'ll check with you and your physician.'),('Why is there such a range in cost?','It depends on the implant system, the crown material, and whether you need bone grafting. Your estimate will itemise each.')]
ip=ip.replace('{FAQDOC}',faq(FD)).replace('{FAQTREAT}',faq(FT))
html=p1+'\n'+ip
def ic(m):
    n=m.group(1);s=m.group(2)
    return f'<svg class="ic{" ic-"+s if s else ""}" aria-hidden="true"><use href="#i-{n}"/></svg>'
html=re.sub(r'\{i:([a-z0-9-]+)(?::(sm|lg))?\}',ic,html)
sprite=open('sprite.svg').read()
i=html.index('</style>')+len('</style>')
html=html[:i]+'\n'+sprite+'\n'+html[i:]
print(re.findall(r'\{[A-Z]+\}',html))
open('dental-krafts-inner-pages.html','w').write(html)
used=sorted(set(re.findall(r'img/[a-zA-Z0-9_/.-]+\.(?:webp|svg)',html)))
import json,os
miss=[u for u in used if not os.path.exists(u)]
print('missing',miss)
json.dump(used,open('../ip-files.json','w'))
print(len(used))
