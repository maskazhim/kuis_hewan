
import { AnimalData, LocalizedString } from './types';

// URL Google App Script untuk sheet 'quiz_animal'
export const API_URL = 'https://script.google.com/macros/s/AKfycbzkYXKPbZrdpYdCKHjmSYqLbbWS1vmuMuvVugA28bvRE_JDwfsMedBHX9ozgsH8_Fra/exec?sheet=quiz_animal';

export const ANIMALS: AnimalData[] = [
  // --- MAMALIA (MAMMALS) ---
  { 
    id: 'singa', name: { id: 'SINGA', en: 'LION', zh: '狮子' }, emoji: '🦁', image: '', diet: 'KARNIVORA', type: 'MAMALIA',
    fact: { id: 'Auman singa terdengar sejauh 8 km, lebih keras dari suara konser!', en: 'A lion\'s roar can be heard 5 miles away, louder than a concert!', zh: '狮子的吼声能传到8公里外，比音乐会还响！' }
  },
  { 
    id: 'harimau', name: { id: 'HARIMAU', en: 'TIGER', zh: '老虎' }, emoji: '🐯', image: '', diet: 'KARNIVORA', type: 'MAMALIA',
    fact: { id: 'Kulit harimau juga belang, bukan cuma bulunya saja!', en: 'Tigers have striped skin, not just striped fur!', zh: '老虎的皮肤也是有条纹的，不仅仅是毛发！' }
  },
  { 
    id: 'gajah', name: { id: 'GAJAH', en: 'ELEPHANT', zh: '大象' }, emoji: '🐘', image: '', diet: 'HERBIVORA', type: 'MAMALIA',
    fact: { id: 'Belalai gajah punya 40.000 otot, tapi bisa memegang sebutir beras!', en: 'A trunk has 40,000 muscles but can pick up a grain of rice!', zh: '象鼻有40,000块肌肉，但能捡起一粒米！' }
  },
  { 
    id: 'jerapah', name: { id: 'JERAPAH', en: 'GIRAFFE', zh: '长颈鹿' }, emoji: '🦒', image: '', diet: 'HERBIVORA', type: 'MAMALIA',
    fact: { id: 'Lidah jerapah berwarna biru-hitam agar tidak terbakar matahari!', en: 'Giraffe tongues are blue-black to prevent sunburn!', zh: '长颈鹿的舌头是蓝黑色的以防晒伤！' }
  },
  { 
    id: 'zebra', name: { id: 'ZEBRA', en: 'ZEBRA', zh: '斑马' }, emoji: '🦓', image: '', diet: 'HERBIVORA', type: 'MAMALIA',
    fact: { id: 'Zebra bisa tidur sambil berdiri dan belangnya unik seperti sidik jari!', en: 'Zebras sleep standing up and stripes are unique like fingerprints!', zh: '斑马站着睡觉，条纹像指纹一样独特！' }
  },
  { 
    id: 'monyet', name: { id: 'MONYET', en: 'MONKEY', zh: '猴子' }, emoji: '🐒', image: '', diet: 'OMNIVORA', type: 'MAMALIA',
    fact: { id: 'Monyet bisa berhitung matematika sederhana, pintar ya!', en: 'Monkeys can do simple math, so smart!', zh: '猴子会简单的数学，真聪明！' }
  },
  { 
    id: 'gorila', name: { id: 'GORILA', en: 'GORILLA', zh: '大猩猩' }, emoji: '🦍', image: '', diet: 'HERBIVORA', type: 'MAMALIA',
    fact: { id: 'Hidung gorila punya pola kerutan unik, seperti sidik jari manusia!', en: 'Gorillas have unique nose wrinkles, like human fingerprints!', zh: '大猩猩的鼻子有独特的皱纹，就像人类的指纹！' }
  },
  { 
    id: 'anjing', name: { id: 'ANJING', en: 'DOG', zh: '狗' }, emoji: '🐶', image: '', diet: 'OMNIVORA', type: 'MAMALIA',
    fact: { id: 'Penciuman anjing 40 kali lebih tajam dari manusia!', en: 'A dog\'s sense of smell is 40 times better than a human\'s!', zh: '狗的嗅觉比人类灵敏40倍！' }
  },
  { 
    id: 'kucing', name: { id: 'KUCING', en: 'CAT', zh: '猫' }, emoji: '🐱', image: '', diet: 'KARNIVORA', type: 'MAMALIA',
    fact: { id: 'Kucing tidak bisa merasakan rasa manis gula!', en: 'Cats cannot taste sweet sugar!', zh: '猫尝不出糖的甜味！' }
  },
  { 
    id: 'panda', name: { id: 'PANDA', en: 'PANDA', zh: '熊猫' }, emoji: '🐼', image: '', diet: 'HERBIVORA', type: 'MAMALIA',
    fact: { id: 'Panda menghabiskan 12 jam sehari hanya untuk makan bambu!', en: 'Pandas spend 12 hours a day just eating bamboo!', zh: '熊猫每天花12个小时吃竹子！' }
  },
  { 
    id: 'koala', name: { id: 'KOALA', en: 'KOALA', zh: '考拉' }, emoji: '🐨', image: '', diet: 'HERBIVORA', type: 'MAMALIA',
    fact: { id: 'Sidik jari koala hampir sama persis dengan manusia!', en: 'Koala fingerprints are almost identical to humans!', zh: '考拉的指纹几乎和人类一模一样！' }
  },
  { 
    id: 'sapi', name: { id: 'SAPI', en: 'COW', zh: '牛' }, emoji: '🐮', image: '', diet: 'HERBIVORA', type: 'MAMALIA',
    fact: { id: 'Sapi punya sahabat baik dan bisa sedih jika dipisahkan!', en: 'Cows have best friends and get sad if separated!', zh: '牛有最好的朋友，分开会感到难过！' }
  },
  { 
    id: 'babi', name: { id: 'BABI', en: 'PIG', zh: '猪' }, emoji: '🐷', image: '', diet: 'OMNIVORA', type: 'MAMALIA',
    fact: { id: 'Babi tidak bisa berkeringat, jadi mereka mandi lumpur biar dingin!', en: 'Pigs can\'t sweat, so they take mud baths to cool down!', zh: '猪不会出汗，所以洗泥浴降温！' }
  },
  { 
    id: 'kuda', name: { id: 'KUDA', en: 'HORSE', zh: '马' }, emoji: '🐴', image: '', diet: 'HERBIVORA', type: 'MAMALIA',
    fact: { id: 'Mata kuda adalah yang terbesar dari semua mamalia darat!', en: 'Horse eyes are the largest of any land mammal!', zh: '马的眼睛是陆地哺乳动物中最大的！' }
  },
  { 
    id: 'kelinci', name: { id: 'KELINCI', en: 'RABBIT', zh: '兔子' }, emoji: '🐰', image: '', diet: 'HERBIVORA', type: 'MAMALIA',
    fact: { id: 'Gigi kelinci tidak pernah berhenti tumbuh seumur hidupnya!', en: 'Rabbit teeth never stop growing!', zh: '兔子的牙齿终生都在生长！' }
  },
  { 
    id: 'beruang', name: { id: 'BERUANG', en: 'BEAR', zh: '熊' }, emoji: '🐻', image: '', diet: 'OMNIVORA', type: 'MAMALIA',
    fact: { id: 'Beruang kutub sebenarnya berkulit hitam, bulunya saja yang transparan!', en: 'Polar bears have black skin, their fur is transparent!', zh: '北极熊其实是黑皮肤，毛是透明的！' }
  },
  { 
    id: 'kanguru', name: { id: 'KANGURU', en: 'KANGAROO', zh: '袋鼠' }, emoji: '🦘', image: '', diet: 'HERBIVORA', type: 'MAMALIA',
    fact: { id: 'Kanguru tidak bisa berjalan mundur karena ekornya besar!', en: 'Kangaroos can\'t walk backwards because of their big tails!', zh: '袋鼠因为大尾巴而不能倒退走！' }
  },
  
  // --- BURUNG (BIRDS) ---
  { 
    id: 'elang', name: { id: 'ELANG', en: 'EAGLE', zh: '鹰' }, emoji: '🦅', image: '', diet: 'KARNIVORA', type: 'BURUNG',
    fact: { id: 'Mata elang bisa melihat kelinci dari jarak 3 km!', en: 'Eagles can spot a rabbit from 2 miles away!', zh: '老鹰能从3公里外看到兔子！' }
  },
  { 
    id: 'ayam', name: { id: 'AYAM', en: 'CHICKEN', zh: '鸡' }, emoji: '🐔', image: '', diet: 'OMNIVORA', type: 'BURUNG',
    fact: { id: 'Ayam adalah kerabat terdekat T-Rex yang masih hidup!', en: 'Chickens are the closest living relatives to T-Rex!', zh: '鸡是霸王龙最近的亲戚！' }
  },
  { 
    id: 'bebek', name: { id: 'BEBEK', en: 'DUCK', zh: '鸭子' }, emoji: '🦆', image: '', diet: 'OMNIVORA', type: 'BURUNG',
    fact: { id: 'Kaki bebek tidak kedinginan di es karena tidak punya saraf!', en: 'Duck feet don\'t feel cold on ice because they have no nerves!', zh: '鸭掌在冰上不觉得冷，因为没有神经！' }
  },
  { 
    id: 'burung_hantu', name: { id: 'BURUNG HANTU', en: 'OWL', zh: '猫头鹰' }, emoji: '🦉', image: '', diet: 'KARNIVORA', type: 'BURUNG',
    fact: { id: 'Burung hantu bisa memutar kepala hingga 270 derajat!', en: 'Owls can turn their heads 270 degrees!', zh: '猫头鹰能转头270度！' }
  },
  { 
    id: 'penguin', name: { id: 'PENGUIN', en: 'PENGUIN', zh: '企鹅' }, emoji: '🐧', image: '', diet: 'KARNIVORA', type: 'BURUNG',
    fact: { id: 'Penguin punya lutut di dalam tubuhnya, mereka sebenarnya berjongkok!', en: 'Penguins have knees inside, they are actually squatting!', zh: '企鹅体内有膝盖，它们其实是在蹲着！' }
  },
  { 
    id: 'flamingo', name: { id: 'FLAMINGO', en: 'FLAMINGO', zh: '火烈鸟' }, emoji: '🦩', image: '', diet: 'OMNIVORA', type: 'BURUNG',
    fact: { id: 'Warna pink flamingo berasal dari udang yang mereka makan!', en: 'Flamingos turn pink from the shrimp they eat!', zh: '火烈鸟变粉红是因为吃了虾！' }
  },
  { 
    id: 'merak', name: { id: 'MERAK', en: 'PEACOCK', zh: '孔雀' }, emoji: '🦚', image: '', diet: 'OMNIVORA', type: 'BURUNG',
    fact: { id: 'Hanya merak jantan yang punya ekor indah untuk pamer!', en: 'Only male peacocks have beautiful tails to show off!', zh: '只有雄孔雀才有美丽的尾巴来炫耀！' }
  },

  // --- REPTIL (REPTILES) ---
  { 
    id: 'buaya', name: { id: 'BUAYA', en: 'CROCODILE', zh: '鳄鱼' }, emoji: '🐊', image: '', diet: 'KARNIVORA', type: 'REPTIL',
    fact: { id: 'Buaya bisa menumbuhkan gigi baru hingga 50 kali!', en: 'Crocodiles can grow new teeth 50 times!', zh: '鳄鱼能长出新牙50次！' }
  },
  { 
    id: 'ular', name: { id: 'ULAR', en: 'SNAKE', zh: '蛇' }, emoji: '🐍', image: '', diet: 'KARNIVORA', type: 'REPTIL',
    fact: { id: 'Ular mencium bau dengan lidahnya, bukan hidungnya!', en: 'Snakes smell with their tongues, not noses!', zh: '蛇用舌头闻气味，而不是鼻子！' }
  },
  { 
    id: 'kura_kura', name: { id: 'KURA-KURA', en: 'TURTLE', zh: '乌龟' }, emoji: '🐢', image: '', diet: 'OMNIVORA', type: 'REPTIL',
    fact: { id: 'Tempurung kura-kura adalah tulang rusuknya, tidak bisa dilepas!', en: 'A turtle shell is its ribs, it can\'t come off!', zh: '乌龟壳是肋骨，不能取下来！' }
  },
  { 
    id: 'kadal', name: { id: 'KADAL', en: 'LIZARD', zh: '蜥蜴' }, emoji: '🦎', image: '', diet: 'KARNIVORA', type: 'REPTIL',
    fact: { id: 'Beberapa kadal bisa menyemprotkan darah dari matanya untuk pertahanan!', en: 'Some lizards squirt blood from their eyes for defense!', zh: '有些蜥蜴为了防御会从眼睛喷血！' }
  },
  { 
    id: 't-rex', name: { id: 'T-REX', en: 'T-REX', zh: '霸王龙' }, emoji: '🦖', image: '', diet: 'KARNIVORA', type: 'REPTIL',
    fact: { id: 'Gigitan T-Rex bisa menghancurkan mobil dengan mudah!', en: 'A T-Rex bite could easily crush a car!', zh: '霸王龙的咬合力能轻易压碎汽车！' }
  },

  // --- IKAN & LAUT (FISH/MARINE) ---
  { 
    id: 'hiu', name: { id: 'HIU', en: 'SHARK', zh: '鲨鱼' }, emoji: '🦈', image: '', diet: 'KARNIVORA', type: 'IKAN',
    fact: { id: 'Tulang hiu terbuat dari rawan yang lunak, seperti telingamu!', en: 'Shark skeletons are cartilage, like your ears!', zh: '鲨鱼骨骼是软骨，像你的耳朵！' }
  },
  { 
    id: 'paus', name: { id: 'PAUS', en: 'WHALE', zh: '鲸鱼' }, emoji: '🐋', image: '', diet: 'KARNIVORA', type: 'MAMALIA',
    fact: { id: 'Lidah paus biru seberat gajah, jantungnya seberat mobil!', en: 'Blue whale tongue weighs like an elephant, heart like a car!', zh: '蓝鲸舌头重如大象，心脏重如汽车！' }
  },
  { 
    id: 'lumba_lumba', name: { id: 'LUMBA-LUMBA', en: 'DOLPHIN', zh: '海豚' }, emoji: '🐬', image: '', diet: 'KARNIVORA', type: 'MAMALIA',
    fact: { id: 'Lumba-lumba tidur dengan satu mata terbuka agar tetap waspada!', en: 'Dolphins sleep with one eye open to stay alert!', zh: '海豚睁一只眼睡觉以保持警惕！' }
  },
  { 
    id: 'gurita', name: { id: 'GURITA', en: 'OCTOPUS', zh: '章鱼' }, emoji: '🐙', image: '', diet: 'KARNIVORA', type: 'INVERTEBRATA',
    fact: { id: 'Gurita punya 3 jantung dan darahnya berwarna biru!', en: 'Octopuses have 3 hearts and blue blood!', zh: '章鱼有3颗心脏，血液是蓝色的！' }
  },
  { 
    id: 'kepiting', name: { id: 'KEPITING', en: 'CRAB', zh: '螃蟹' }, emoji: '🦀', image: '', diet: 'OMNIVORA', type: 'INVERTEBRATA',
    fact: { id: 'Gigi kepiting sebenarnya ada di dalam perutnya!', en: 'Crab teeth are actually inside their stomachs!', zh: '螃蟹的牙齿其实在肚子里！' }
  },
  { 
    id: 'ikan', name: { id: 'IKAN', en: 'FISH', zh: '鱼' }, emoji: '🐠', image: '', diet: 'OMNIVORA', type: 'IKAN',
    fact: { id: 'Ikan tidak punya kelopak mata, jadi tidur dengan mata terbuka!', en: 'Fish have no eyelids, so they sleep with eyes open!', zh: '鱼没有眼睑，所以睁着眼睡觉！' }
  },

  // --- SERANGGA (INSECTS) ---
  { 
    id: 'lebah', name: { id: 'LEBAH', en: 'BEE', zh: '蜜蜂' }, emoji: '🐝', image: '', diet: 'HERBIVORA', type: 'SERANGGA',
    fact: { id: 'Lebah mengepakkan sayap 200 kali per detik!', en: 'Bees flap their wings 200 times per second!', zh: '蜜蜂每秒扇动翅膀200次！' }
  },
  { 
    id: 'kupu_kupu', name: { id: 'KUPU-KUPU', en: 'BUTTERFLY', zh: '蝴蝶' }, emoji: '🦋', image: '', diet: 'HERBIVORA', type: 'SERANGGA',
    fact: { id: 'Kupu-kupu mencicipi rasa makanan dengan kakinya!', en: 'Butterflies taste food with their feet!', zh: '蝴蝶用脚尝食物！' }
  },
  { 
    id: 'semut', name: { id: 'SEMUT', en: 'ANT', zh: '蚂蚁' }, emoji: '🐜', image: '', diet: 'OMNIVORA', type: 'SERANGGA',
    fact: { id: 'Berat semua semut di dunia lebih berat dari semua manusia!', en: 'All ants weigh more than all humans combined!', zh: '所有蚂蚁比所有人类还重！' }
  },
  { 
    id: 'laba_laba', name: { id: 'LABA-LABA', en: 'SPIDER', zh: '蜘蛛' }, emoji: '🕷️', image: '', diet: 'KARNIVORA', type: 'SERANGGA',
    fact: { id: 'Jaring laba-laba lebih kuat dari baja dengan tebal yang sama!', en: 'Spider silk is stronger than steel of the same thickness!', zh: '蜘蛛丝比同厚度的钢还硬！' }
  },
  { 
    id: 'belalang', name: { id: 'BELALANG', en: 'GRASSHOPPER', zh: '蚱蜢' }, emoji: '🦗', image: '', diet: 'HERBIVORA', type: 'SERANGGA',
    fact: { id: 'Telinga belalang ada di perutnya, dekat kaki belakang!', en: 'Grasshopper ears are on their bellies!', zh: '蚱蜢的耳朵在肚子上！' }
  },
  
  // --- AMFIBI (AMPHIBIANS) ---
  { 
    id: 'katak', name: { id: 'KATAK', en: 'FROG', zh: '青蛙' }, emoji: '🐸', image: '', diet: 'KARNIVORA', type: 'AMFIBI',
    fact: { id: 'Katak menyerap air minum melalui kulitnya, tidak lewat mulut!', en: 'Frogs absorb water through their skin, not mouths!', zh: '青蛙通过皮肤吸水，不经嘴！' }
  }
];

export const UI_STRINGS = {
  id: {
    title: "MAINAR ANIMAL QUIZ",
    login: {
      welcome: "MAINAR ANIMAL QUIZ",
      subtitle: "Jelajahi Dunia Hewan!",
      adminTitle: "Pengelola Kode Akses",
      placeholder: "KODE AKSES",
      adminPlaceholder: "KODE ADMIN",
      button: "MULAI MAIN!",
      freeTrialButton: "COBA GRATIS 🎁",
      freeTrialLimit: "KUOTA HABIS 🔒",
      adminButton: "MASUK PANEL",
      switchAdmin: "KELOLA KODE AKSES",
      switchUser: "KEMBALI KE LOGIN ANAK",
      error: "Kode Salah! 😢",
      adminError: "Sandi Admin Salah!"
    },
    trial: {
      title: "TRIAL SELESAI!",
      message: "Kamu sudah mencoba 3 game seru! Buka akses penuh untuk bermain tanpa batas.",
      buy: "BELI KODE AKSES",
      enterCode: "MASUKKAN KODE"
    },
    questionEmoji: "SIAPA AKU?",
    questionText: "MANA HEWANNYA?",
    questionComplete: "LENGKAPI NAMAKU!",
    questionDiet: "APA JENIS MAKANANKU?",
    questionType: "AKU TERMASUK JENIS APA?",
    streak: "BERUNTUN",
    milestoneMessages: ["HEBAT! ✨", "LUAR BIASA! 🔥", "SANG JUARA! 🏆", "LEGENDA RIMBA! 👑", "DEWA HEWAN! 🌟"],
    funFactTitle: "TAHUKAH KAMU?",
    feedback: { correct: "HEBAT! ✨", wrong: "COBA LAGI 💪" },
    buttons: { next: "LANJUT ➔", close: "TUTUP" },
    types: { MAMALIA: "MAMALIA", REPTIL: "REPTIL", BURUNG: "BURUNG", IKAN: "IKAN", SERANGGA: "SERANGGA", AMFIBI: "AMFIBI", INVERTEBRATA: "INVERTEBRATA" },
    diets: { HERBIVORA: "HERBIVORA", KARNIVORA: "KARNIVORA", OMNIVORA: "OMNIVORA" }
  },
  en: {
    title: "MAINAR ANIMAL QUIZ",
    login: {
      welcome: "MAINAR ANIMAL QUIZ",
      subtitle: "Explore the Animal World!",
      adminTitle: "ACCESS CODE MANAGER",
      placeholder: "ACCESS CODE",
      adminPlaceholder: "ADMIN CODE",
      button: "START GAME!",
      freeTrialButton: "TRY FOR FREE 🎁",
      freeTrialLimit: "QUOTA LIMIT 🔒",
      adminButton: "ENTER PANEL",
      switchAdmin: "MANAGE ACCESS CODES",
      switchUser: "BACK TO KIDS LOGIN",
      error: "Wrong Code! 😢",
      adminError: "Wrong Admin Password!"
    },
    trial: {
      title: "TRIAL FINISHED!",
      message: "You've tried 3 fun games! Unlock full access for unlimited play.",
      buy: "BUY ACCESS CODE",
      enterCode: "ENTER CODE"
    },
    questionEmoji: "WHO AM I?",
    questionText: "WHERE IS THE ANIMAL?",
    questionComplete: "COMPLETE MY NAME!",
    questionDiet: "WHAT IS MY DIET?",
    questionType: "WHAT TYPE OF ANIMAL AM I?",
    streak: "STREAK",
    milestoneMessages: ["GREAT! ✨", "AMAZING! 🔥", "CHAMPION! 🏆", "JUNGLE LEGEND! 👑", "ANIMAL MASTER! 🌟"],
    funFactTitle: "DID YOU KNOW?",
    feedback: { correct: "GREAT! ✨", wrong: "TRY AGAIN 💪" },
    buttons: { next: "NEXT ➔", close: "CLOSE" },
    types: { MAMALIA: "MAMMAL", REPTIL: "REPTILE", BURUNG: "BIRD", IKAN: "FISH", SERANGGA: "INSECT", AMFIBI: "AMPHIBIAN", INVERTEBRATA: "INVERTEBRATE" },
    diets: { HERBIVORA: "HERBIVORE", KARNIVORA: "CARNIVORE", OMNIVORA: "OMNIVORE" }
  },
  zh: {
    title: "Mainar 动物问答",
    login: {
      welcome: "Mainar 动物问答",
      subtitle: "探索动物世界！",
      adminTitle: "访问代码管理器",
      placeholder: "输入代码",
      adminPlaceholder: "管理员代码",
      button: "开始游戏！",
      freeTrialButton: "免费试用 🎁",
      freeTrialLimit: "配额限制 🔒",
      adminButton: "进入面板",
      switchAdmin: "管理访问代码",
      switchUser: "返回学生登录",
      error: "代码错误！😢",
      adminError: "管理员密码错误！"
    },
    trial: {
      title: "试用结束！",
      message: "您已经尝试了3个有趣的游戏！解锁完整访问权限以无限畅玩。",
      buy: "购买访问代码",
      enterCode: "输入代码"
    },
    questionEmoji: "我是谁？",
    questionText: "动物在哪里？",
    questionComplete: "补全我的名字！",
    questionDiet: "我吃什么？",
    questionType: "我属于哪类动物？",
    streak: "连胜",
    milestoneMessages: ["太棒了！✨", "太神奇了！🔥", "冠军！🏆", "丛林传奇！👑", "动物大师！🌟"],
    funFactTitle: "你知道吗？",
    feedback: { correct: "太棒了！✨", wrong: "再试一次 💪" },
    buttons: { next: "下一步 ➔", close: "关闭" },
    types: { MAMALIA: "哺乳动物", REPTIL: "爬行动物", BURUNG: "鸟类", IKAN: "鱼类", SERANGGA: "昆虫", AMFIBI: "两栖动物", INVERTEBRATA: "无脊椎动物" },
    diets: { HERBIVORA: "食草动物", KARNIVORA: "食肉动物", OMNIVORA: "杂食动物" }
  }
};
