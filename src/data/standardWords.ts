// ~500 common English words (base forms + frequent inflections).
// Used to distinguish "standard word, nothing to translate" from genuinely unknown input.
// Slang is intentionally absent — the dictionary handles that first.

const BASE = [
  // pronouns & function words
  'i','me','my','mine','myself','we','us','our','ours','ourselves','you','your','yours','yourself','yourselves',
  'he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves',
  'this','that','these','those','who','whom','whose','which','what','where','when','why','how',
  'all','any','both','each','either','neither','none','some','somebody','someone','something','anybody','anyone','anything',
  'everybody','everyone','everything','nobody','nothing','no','not','yes','maybe','perhaps',
  // prepositions & conjunctions
  'in','on','at','by','for','with','without','about','against','between','into','through','during','before','after',
  'above','below','under','over','from','to','of','off','up','down','out','and','or','but','if','then','because',
  'as','until','while','so','than','though','although','since','unless',
  // common verbs (base + frequent forms)
  'be','am','is','are','was','were','been','being','have','has','had','having','do','does','did','doing','done',
  'say','says','said','saying','get','gets','got','getting','gotten','make','makes','made','making','go','goes','went','going','gone',
  'know','knows','knew','known','knowing','take','takes','took','taken','taking','see','sees','saw','seen','seeing',
  'come','comes','came','coming','think','thinks','thought','thinking','look','looks','looked','looking','want','wants','wanted','wanting',
  'give','gives','gave','given','giving','use','uses','used','using','find','finds','found','finding','tell','tells','told','telling',
  'ask','asks','asked','asking','work','works','worked','working','seem','seems','seemed','feel','feels','felt','feeling',
  'try','tries','tried','trying','leave','leaves','left','leaving','call','calls','called','calling','need','needs','needed','needing',
  'become','becomes','became','keep','keeps','kept','let','lets','letting','begin','begins','began','begun','help','helps','helped',
  'talk','talks','talked','talking','turn','turns','turned','start','starts','started','show','shows','showed','play','plays','played','playing',
  'run','runs','ran','running','move','moves','moved','like','likes','liked','live','lives','lived','believe','hold','holds','held',
  'bring','brings','brought','happen','happens','happened','write','writes','wrote','written','sit','sits','sat','stand','stands','stood',
  'lose','loses','lost','pay','pays','paid','meet','meets','met','include','includes','included','continue','set','sets','learn','learns','learned',
  'change','changes','changed','lead','leads','led','understand','understands','understood','watch','watches','watched','follow','follows','followed',
  'stop','stops','stopped','create','speak','speaks','spoke','spoken','read','reads','allow','adds','add','spend','spends','spent','grow','grows','grew',
  'open','opens','opened','walk','walks','walked','win','wins','won','offer','remember','remembers','love','loves','loved','consider','buy','buys','bought',
  'wait','waits','waited','serve','die','dies','died','send','sent','expect','build','builds','built','stay','stays','stayed','fall','falls','fell','fallen',
  'cut','cuts','reach','kill','remain','suggest','raise','pass','sell','sold','decide','decided','return','explain','hope','hoped','develop','carry','carried',
  'break','broke','broken','receive','agree','support','hit','hits','produce','eat','eats','ate','eaten','cover','catch','caught','choose','chose','chosen',
  'sleep','sleeps','slept','dream','dreams','cook','cooks','cooked','clean','cleans','cleaned','drink','drinks','drank','drunk','drive','drives','drove','driven',
  'fly','flies','flew','forget','forgets','forgot','forgotten','hear','heard','hide','hid','jump','jumps','laugh','laughs','laughed','listen','listens','listened',
  'cry','cries','cried','smile','smiles','smiled','wash','washes','washed','wear','wears','wore','worn','text','texts','texted','texting',
  'call','fix','fixes','fixed','check','checked','checks','save','saved','share','shared','post','posted','comment','commented','follow','block','blocked',
  // nouns
  'time','year','years','people','way','ways','day','days','man','men','woman','women','child','children','kid','kids','thing','things','world',
  'life','hand','hands','part','parts','eye','eyes','place','places','case','week','weeks','company','system','program','question','questions',
  'government','number','numbers','night','point','points','home','water','room','story','stories','fact','facts','month','months','lot','right','rights',
  'study','book','books','word','words','business','issue','issues','side','sides','kind','kinds','head','house','service','friend','friends','father','mother',
  'mom','dad','parent','parents','son','daughter','brother','sister','family','power','hour','hours','game','games','line','lines','end','ends','member','members',
  'law','car','cars','city','cities','community','name','names','team','teams','minute','minutes','idea','ideas','body','information','back','face','door',
  'health','person','art','war','history','party','result','results','change','morning','reason','reasons','research','girl','girls','boy','boys','guy','guys',
  'moment','moments','air','teacher','teachers','force','education','food','music','movie','movies','film','films','song','songs','video','videos',
  'school','schools','class','classes','student','students','teacher','college','university','test','tests','exam','exams','grade','grades','homework','lesson','lessons',
  'apple','apples','banana','pizza','bread','milk','coffee','tea','dinner','lunch','breakfast','cake','sugar','salt','meat','chicken','fish','rice',
  'dog','dogs','cat','cats','bird','birds','horse','fish','animal','animals','tree','trees','flower','flowers','grass','sun','moon','star','stars','sky','rain','snow','wind',
  'phone','phones','computer','computers','laptop','screen','internet','wifi','app','apps','game','account','password','message','messages','photo','photos','picture','pictures',
  'money','dollar','dollars','price','prices','job','jobs','office','boss','meeting','work','bus','train','trains','bike','road','street','park','store','shop','mall',
  'bed','beds','chair','chairs','table','tables','kitchen','bathroom','door','window','windows','shirt','shoes','shoe','pants','jacket','hat','clothes','bag','backpack',
  'hair','voice','smile','heart','mind','hand','arm','leg','legs','foot','feet',
  // adjectives & adverbs
  'good','great','bad','new','old','first','last','long','little','own','other','right','big','small','large','high','low','young','old',
  'important','few','public','same','able','sure','free','full','special','clear','easy','hard','early','late','happy','happier','happiest','sad','angry','tired','hungry','sick',
  'hot','cold','warm','cool','nice','fine','ok','okay','fun','funny','boring','interesting','beautiful','pretty','ugly','fast','slow','quick','loud','quiet','soft',
  'strong','weak','rich','poor','clean','dirty','dark','light','bright','heavy','empty','busy','ready','wrong','true','false','real','close','open','different','similar',
  'very','really','just','only','also','too','quite','almost','always','never','sometimes','often','usually','soon','now','today','tomorrow','yesterday','tonight',
  'here','there','everywhere','somewhere','anywhere','away','together','alone','again','still','already','yet','even','ever','once','twice',
  'hello','hi','hey','bye','goodbye','thanks','thank','please','sorry','welcome','yes','no',
  'happy','school','water','apple','run',
  // misc common
  'hello','morning','afternoon','evening','weekend','birthday','christmas','weather','summer','winter','spring','autumn','fall',
  'one','two','three','four','five','six','eight','nine','ten','eleven','twelve','hundred','thousand','million','first','second','third',
  'mr','mrs','ms','dr',
]

export const STANDARD_WORDS: Set<string> = new Set(BASE)
