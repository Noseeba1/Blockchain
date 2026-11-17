import { AchievementInfo, ChallengeCompletion, ChallengeId, SubmissionRecord } from '../types/game';
import { CHALLENGES_META } from '../data/challenges';

export const POINTS_PER_CORRECT = 10;
export const TOTAL_QUESTIONS = CHALLENGES_META.reduce((acc, c) => acc + c.questionsCount, 0);
export const MAX_SCORE = TOTAL_QUESTIONS * POINTS_PER_CORRECT;

export function getAchievementLevel(score: number): AchievementInfo {
  if (score >= 90) {
    return {
      id: 'master',
      titleAr: 'خبير البلوك تشين',
      titleEn: 'Blockchain Master',
      message:
        'أداء استثنائي! أتقنت ربط الكتل، واكتشاف التلاعب عبر Hash، والتمييز بين الأنظمة الموزعة واللامركزية، وحل لغز الشبكة بدقة.',
      minScore: 90,
    };
  }
  if (score >= 70) {
    return {
      id: 'detective',
      titleAr: 'محقق التشفير',
      titleEn: 'Hash Detective',
      message:
        'عمل رائع! لديك فهم متين لكيفية حماية البيانات باستخدام Hash واكتشاف محاولات التعديل في الشبكة.',
      minScore: 70,
    };
  }
  if (score >= 40) {
    return {
      id: 'explorer',
      titleAr: 'مستكشف الكتل',
      titleEn: 'Block Explorer',
      message:
        'انطلاقة موفقة! تعرّفت على أساسيات الكتل والأنظمة الموزعة، ويمكنك إعادة المحاولة لتحقيق الدرجة الكاملة.',
      minScore: 40,
    };
  }
  return {
    id: 'beginner',
    titleAr: 'مبتدئ البلوك تشين',
    titleEn: 'Blockchain Beginner',
    message:
      'بداية جيدة في عالم Blockchain! كل تحدٍّ هنا مصمّم ليعرّفك على فكرة جديدة؛ جرّب إعادة المسابقة لتعزيز نتيجتك.',
    minScore: 0,
  };
}

export function getChallengeBreakdown(
  submissions: Record<string, SubmissionRecord>,
  completedChallenges: Record<ChallengeId, boolean>
): ChallengeCompletion[] {
  const allSubmissions = Object.values(submissions);
  return CHALLENGES_META.map((meta) => {
    const items = allSubmissions.filter((s) => s.challengeId === meta.id);
    const earnedPoints = items.reduce((sum, item) => sum + item.pointsAwarded, 0);
    const correctCount = items.filter((item) => item.isCorrect).length;
    return {
      challengeId: meta.id,
      completed: Boolean(completedChallenges[meta.id]),
      earnedPoints,
      maxPoints: meta.maxPoints,
      correctCount,
      totalCount: meta.questionsCount,
    };
  });
}

export function getScoreTotals(submissions: Record<string, SubmissionRecord>) {
  const list = Object.values(submissions);
  const totalScore = list.reduce((sum, s) => sum + s.pointsAwarded, 0);
  const correctAnswers = list.filter((s) => s.isCorrect).length;
  const incorrectAnswers = list.filter((s) => !s.isCorrect).length;
  return {
    totalScore,
    correctAnswers,
    incorrectAnswers,
    answeredCount: list.length,
  };
}
