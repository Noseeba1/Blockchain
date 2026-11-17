import {
  BlockItem,
  ChallengeMeta,
  ControlScenario,
  MysteryClue,
  MysteryQuestion,
  SpotRound,
} from '../types/game';
import { ARENA_IMAGES } from './assets';

export const CHALLENGES_META: ChallengeMeta[] = [
  {
    id: 'build-blockchain',
    order: 1,
    title: 'بناء السلسلة',
    titleEn: 'Build the Blockchain',
    concept: 'الربط التشفيري للكتل (Blocks & Previous Hash)',
    shortDesc: 'رتّب الكتل المبعثرة بحيث يرتبط كل Block ببصمة الكتلة التي تسبقه.',
    maxPoints: 10,
    questionsCount: 1,
    imageUrl: ARENA_IMAGES.chain,
    imageAlt: 'رسم ثلاثي الأبعاد يوضح أربع كتل مترابطة ضوئياً في سلسلة Blockchain',
  },
  {
    id: 'spot-change',
    order: 2,
    title: 'اكتشف التغيير',
    titleEn: 'Spot the Change',
    concept: 'بصمة البيانات وسلامتها (SHA-256 Hash)',
    shortDesc: 'قارن بين نسختين من السجل الرقمي واكتشف الحقل الذي غيّر بصمة الـ Hash.',
    maxPoints: 20,
    questionsCount: 2,
    imageUrl: ARENA_IMAGES.hash,
    imageAlt: 'رسم يوضح تحويل السجل الرقمي عبر منشور تشفير إلى بصمة Hash فريدة',
  },
  {
    id: 'control-systems',
    order: 3,
    title: 'من يتحكم في البيانات؟',
    titleEn: 'Who Controls the Data?',
    concept: 'الأنظمة المركزية مقابل الموزّعة واللامركزية',
    shortDesc: 'حلّل 4 مواقف واقعية وحدد طبيعة التحكم في البيانات داخل كل نظام.',
    maxPoints: 40,
    questionsCount: 4,
    imageUrl: ARENA_IMAGES.nodes,
    imageAlt: 'شبكة عقد متصلة توضح التوزيع اللامركزي للبيانات بين المشاركين',
  },
  {
    id: 'blockchain-mystery',
    order: 4,
    title: 'لغز البلوك تشين',
    titleEn: 'Blockchain Mystery',
    concept: 'التحقق الجماعي وكشف التلاعب في الشبكة',
    shortDesc: 'افحص الأدلة الأربعة في حادثة تعديل سجل جامعي واكتشف كيف كشفتها الشبكة.',
    maxPoints: 30,
    questionsCount: 3,
    imageUrl: ARENA_IMAGES.mystery,
    imageAlt: 'عدسة فحص تدقق في سلسلة كتل وتكتشف كتلة معدّلة بلون مختلف',
  },
];

// Correct sequence: Block #0 -> Block #1 -> Block #2 -> Block #3
export const CHALLENGE_1_CORRECT_ORDER: string[] = [
  'block-0',
  'block-1',
  'block-2',
  'block-3',
];

// Presented in shuffled order to participants
export const CHALLENGE_1_INITIAL_BLOCKS: BlockItem[] = [
  {
    id: 'block-2',
    blockNumber: 2,
    data: 'تسجيل شهادة حضور: سارة خالد',
    previousHash: 'd92e08',
    currentHash: '4b81f2',
  },
  {
    id: 'block-0',
    blockNumber: 0,
    data: 'Genesis Block — إنشاء السجل الجامعي الأول',
    previousHash: '000000',
    currentHash: 'a7f3c1',
  },
  {
    id: 'block-3',
    blockNumber: 3,
    data: 'اعتماد مشروع التخرج رقم 14',
    previousHash: '4b81f2',
    currentHash: '9c04e7',
  },
  {
    id: 'block-1',
    blockNumber: 1,
    data: 'منح 50 نقطة نشاط للطالب أحمد',
    previousHash: 'a7f3c1',
    currentHash: 'd92e08',
  },
];

export const CHALLENGE_2_ROUNDS: SpotRound[] = [
  {
    id: 'spot-round-1',
    title: 'السجل 1: سجل منحة طلابية',
    description:
      'أمامك نسختان من سجل مالي رقمي. تغيّرت بصمة SHA-256 بين النسختين بالكامل، فما الحقل الذي تم تعديله؟',
    fields: [
      {
        key: 'name',
        label: 'الاسم',
        labelEn: 'Name',
        valueA: 'أحمد (Ahmed)',
        valueB: 'أحمد (Ahmed)',
      },
      {
        key: 'amount',
        label: 'المبلغ',
        labelEn: 'Amount',
        valueA: '500',
        valueB: '900',
      },
      {
        key: 'status',
        label: 'الحالة',
        labelEn: 'Status',
        valueA: 'معتمد (Approved)',
        valueB: 'معتمد (Approved)',
      },
      {
        key: 'department',
        label: 'القسم',
        labelEn: 'Department',
        valueA: 'علوم الحاسب',
        valueB: 'علوم الحاسب',
      },
    ],
    changedKey: 'amount',
    explanation:
      'تغيّرت قيمة المبلغ (Amount) من 500 إلى 900. وبسبب حساسية خوارزمية SHA-256، أدى تغيير رقم واحد فقط إلى توليد بصمة Hash مختلفة كلياً، مما يمكّن النظام من كشف التعديل فوراً.',
  },
  {
    id: 'spot-round-2',
    title: 'السجل 2: سجل شهادة أكاديمية',
    description:
      'قارن بين النسخة الأصلية والنسخة المستلمة من سجل الشهادة الرقمية واختر الحقل المعدّل.',
    fields: [
      {
        key: 'student',
        label: 'الطالبة',
        labelEn: 'Student',
        valueA: 'ليلى حسن',
        valueB: 'ليلى حسن',
      },
      {
        key: 'track',
        label: 'التخصص',
        labelEn: 'Major',
        valueA: 'هندسة البرمجيات',
        valueB: 'هندسة البرمجيات',
      },
      {
        key: 'year',
        label: 'سنة التخرج',
        labelEn: 'Year',
        valueA: '2026',
        valueB: '2026',
      },
      {
        key: 'grade',
        label: 'التقدير',
        labelEn: 'Grade',
        valueA: 'جيد جداً (B+)',
        valueB: 'ممتاز (A+)',
      },
    ],
    changedKey: 'grade',
    explanation:
      'الحقل المتغيّر هو التقدير (Grade) من "جيد جداً" إلى "ممتاز". أي تعديل غير مصرح به في سجل محمي بالـ Hash يترك أثراً فورياً لأن البصمة الجديدة لا تطابق البصمة المحفوظة.',
  },
];

export const CHALLENGE_3_SCENARIOS: ControlScenario[] = [
  {
    id: 'control-1',
    title: 'الموقف 1: قاعدة بيانات التسجيل الجامعي',
    scenario:
      'تُحفظ جميع درجات الطلاب وسجلاتهم في خادم مركزي واحد داخل إدارة الجامعة، ولا يمكن لأي جهة تعديل السجلات إلا عبر مدير النظام الرئيسي.',
    options: [
      { id: 'centralized', label: 'نظام مركزي', labelEn: 'Centralized System' },
      { id: 'decentralized', label: 'شبكة لا مركزية', labelEn: 'Decentralized Network' },
    ],
    correctOptionId: 'centralized',
    explanation:
      'هذا نظام مركزي (Centralized) لأن خادماً واحداً وجهة إدارية واحدة تتحكم في حفظ البيانات وتحديثها. إذا تعطل الخادم المركزي تتوقف الخدمة.',
  },
  {
    id: 'control-2',
    title: 'الموقف 2: سجل عام تتشاركه عقد مستقلة',
    scenario:
      'تحتفظ 12 جامعة مختلفة بنسخة متطابقة من سجل الشهادات عبر Node خاصة بكل جامعة، ولا تستطيع أي جامعة منفردة تعديل السجل دون موافقة الشبكة.',
    options: [
      { id: 'centralized', label: 'نظام مركزي', labelEn: 'Centralized System' },
      { id: 'decentralized', label: 'شبكة لا مركزية موزّعة', labelEn: 'Decentralized Network' },
    ],
    correctOptionId: 'decentralized',
    explanation:
      'هذه شبكة لا مركزية موزّعة (Decentralized & Distributed)؛ فالسجل موزّع على عدة Nodes ولا توجد سلطة واحدة تفرض التعديل وحدها، بل يتم التحقق بشكل جماعي.',
  },
  {
    id: 'control-3',
    title: 'الموقف 3: خوادم شركة واحدة في 3 مدن',
    scenario:
      'تمتلك شركة تقنية 5 خوادم موزّعة في عدة مدن لتسريع الخدمة، لكن إدارة الشركة وحدها تمتلك الصلاحية الكاملة لتعديل البيانات أو إيقاف الخوادم الخمسة.',
    options: [
      { id: 'distributed', label: 'موزّع لكنه مركزي الإدارة', labelEn: 'Distributed, Centralized Control' },
      { id: 'decentralized', label: 'نظام لا مركزي بالكامل', labelEn: 'Fully Decentralized' },
    ],
    correctOptionId: 'distributed',
    explanation:
      'نقطة مهمة! ليس كل نظام موزّع (Distributed) نظاماً لا مركزياً (Decentralized). هنا الأجهزة موزّعة جغرافياً لتحسين الأداء، لكن القرار والتحكم يظلان بيد جهة واحدة مركزية.',
  },
  {
    id: 'control-4',
    title: 'الموقف 4: تطبيق محفظة تديره شركة واحدة',
    scenario:
      'تطبيق مدفوعات رقمي يسمح للمستخدمين بإرسال الرصيد، لكن الشركة المطوّرة تحتفظ لنفسها بحق تجميد أي حساب أو عكس أي معاملة من لوحة التحكم الخاصة بها.',
    options: [
      { id: 'centralized', label: 'نظام مركزي', labelEn: 'Centralized System' },
      { id: 'decentralized', label: 'شبكة لا مركزية', labelEn: 'Decentralized Network' },
    ],
    correctOptionId: 'centralized',
    explanation:
      'بما أن جهة واحدة تملك سلطة عكس المعاملات وتجميد الحسابات، فالتحكم مركزي (Centralized) حتى لو كان التطبيق متاحاً على ملايين الهواتف.',
  },
];

export const MYSTERY_STORY =
  'في مسابقة مشاريع التخرج الجامعية، تم توثيق نتائج التحكيم والجوائز داخل شبكة Blockchain تضم 4 كتل (Blocks) وتعمل عبر 5 عقد (Nodes) مستقلة. في صباح اليوم التالي، لاحظت اللجنة وجود محاولة مريبة لتعديل قيمة جائزة في Block #1 من 1000 إلى 5000 داخل جهاز واحد فقط. افحص الأدلة التالية لمساعدة اللجنة في كشف ما حدث!';

export const MYSTERY_CLUES: MysteryClue[] = [
  {
    id: 'clue-1',
    title: 'الدليل 1: فحص البصمة (Hash)',
    subtitle: 'مقارنة بصمة Block #1 قبل وبعد المحاولة',
    detail:
      'بمجرد تغيير الرقم من 1000 إلى 5000 داخل Block #1، تغيّرت بصمة Current Hash للكتلة بالكامل.',
    codeSnippet: 'الأصل: 8a4d2f  ←  المعدّل: f91c03',
  },
  {
    id: 'clue-2',
    title: 'الدليل 2: رابط الكتلة التالية',
    subtitle: 'فحص حقل Previous Hash في Block #2',
    detail:
      'ما زال Block #2 مسجلاً فيه أن بصمة الكتلة السابقة هي 8a4d2f، ما يعني انقطاع الرابط التشفيري مع Block #1 المعدّل.',
    codeSnippet: 'Block #2 Previous Hash = 8a4d2f ≠ f91c03',
  },
  {
    id: 'clue-3',
    title: 'الدليل 3: نسخ الشبكة (Nodes)',
    subtitle: 'فحص 5 عقد مشاركة في الـ Network',
    detail:
      'عند مقارنة السجل عبر العقد الخمس، اتفقت 4 Nodes على النسخة الأصلية (1000)، بينما انفردت عقدة واحدة بالنسخة المعدّلة.',
    codeSnippet: '4 Nodes: 8a4d2f  |  1 Node: f91c03',
  },
  {
    id: 'clue-4',
    title: 'الدليل 4: التوقيت والتحقق',
    subtitle: 'سجل الموافقة الجماعية',
    detail:
      'لم تمر النسخة المعدّلة عبر آلية التحقق في الشبكة، ولم تُعد حسابات الكتل التالية في بقية العقد.',
    codeSnippet: 'Verification Status: Rejected by Network',
  },
];

export const MYSTERY_QUESTIONS: MysteryQuestion[] = [
  {
    id: 'mystery-q1',
    prompt: '1. وفقاً للدليل الأول، ما الإشارة الأولى التي كشفت حدوث تغيير داخل Block #1؟',
    options: [
      { id: 'a', label: 'تغيّر قيمة Current Hash الخاصة بـ Block #1 فور تعديل المبلغ' },
      { id: 'b', label: 'زيادة عدد الكتل في السلسلة تلقائياً' },
      { id: 'c', label: 'توقف جميع الهواتف المتصلة بالإنترنت' },
    ],
    correctOptionId: 'a',
    explanation:
      'أي تعديل على محتوى الكتلة — مهما كان صغيراً — يُنتج بصمة Hash جديدة تماماً تختلف عن البصمة الأصلية المحفوظة.',
  },
  {
    id: 'mystery-q2',
    prompt: '2. لماذا أدى تعديل Block #1 إلى كشف الخلل في Block #2 أيضاً؟',
    options: [
      { id: 'a', label: 'لأن Block #2 يحذف بياناته عند تعديل Block #1' },
      { id: 'b', label: 'لأن Block #2 يحتفظ بـ Previous Hash للكتلة السابقة، فلم يعد يطابق البصمة الجديدة' },
      { id: 'c', label: 'لأن الكتل تُرتّب حسب الحروف الأبجدية فقط' },
    ],
    correctOptionId: 'b',
    explanation:
      'السلسلة مترابطة تشفيرياً؛ فكل كتلة تخزن Previous Hash للكتلة التي قبلها. لذا فإن تغيير كتلة قديمة يكسر تطابق الرابط مع الكتلة التالية فوراً.',
  },
  {
    id: 'mystery-q3',
    prompt: '3. القرار النهائي: كيف ستتعامل شبكة الـ Blockchain مع هذا التعديل غير المصرح به؟',
    options: [
      { id: 'a', label: 'تعتمد النسخة المعدّلة لأنها أحدث تعديل وصل لجهاز واحد' },
      { id: 'b', label: 'تحذف السجل الجامعي بالكامل وتبدأ من الصفر' },
      { id: 'c', label: 'ترفض التعديل وتعتمد النسخة المتطابقة لدى أغلبية العقد (Nodes) في الشبكة' },
    ],
    correctOptionId: 'c',
    explanation:
      'بفضل التوزيع والتحقق الجماعي بين العقد (Nodes)، ترفض الشبكة السجل المكسور من العقدة المنفردة وتحافظ على النسخة الصحيحة المتفق عليها.',
  },
];
