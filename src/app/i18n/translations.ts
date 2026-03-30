export type Lang = 'ko' | 'en';

const translations = {
  ko: {
    landing: {
      title: '오늘 당신을 기다리는',
      titleHighlight: '운명의 메시지',
      description: '데이터와 영감이 만나는곳',
      mbtiPlaceholder: '당신의 MBTI를 입력해 주세요 (예: INFJ)',
      cta: '운세 확인하기',
      socialProof: '오늘 이미',
      socialProofCount: '1,248명',
      socialProofSuffix: '이 고민을 해결했습니다',
      googleConnect: 'Google 연동하기',
    },
    category: {
      title: '어떤 고민을 안고 오셨나요?',
      subtitle: 'AI 타로 마스터가 해답을 찾아드릴 분야를 선택해주세요.',
      items: [
        { title: '오늘의 운세', desc: '오늘 하루의 전반적인 흐름과 조언' },
        { title: '연애운', desc: '솔로, 짝사랑, 연인과의 관계 흐름' },
        { title: '금전/재물운', desc: '나의 재물 흐름과 투자 타이밍' },
        { title: '직장/사업운', desc: '이직, 취업, 사업 프로젝트의 향방' },
        { title: '인간관계', desc: '주변 사람들과의 갈등과 해결책' },
        { title: '상대방의 속마음', desc: '그 사람은 지금 나를 어떻게 생각할까?' },
      ],
    },
    cardSelection: {
      title: '당신의 카드를 3장 뽑아주세요',
      subtitle: (category: string) =>
        `[${category}] 운세를 위해 현재, 조언, 결과 카드를 차례로 선택합니다.`,
      positions: ['현재의 상태', '당면한 과제/조언', '오늘의 결과'],
    },
    result: {
      loading: '마스터가 당신의 카드를 읽고 있습니다...',
      title: '당신의 운명의 메시지',
      positions: ['현재의 상태', '당면한 과제/조언', '오늘의 결과'],
      upright: '▲ 정방향',
      reversed: '▼ 역방향',
      reset: '다시 상담하기',
      cardNames: [
        '바보', '마법사', '고위 여사제', '여황제', '황제', '교황',
        '연인', '전차', '힘', '은둔자', '운명의 수레바퀴', '정의',
        '매달린 사람', '죽음', '절제', '악마', '탑', '별', '달', '태양', '심판', '세계',
      ],
    },
  },

  en: {
    landing: {
      title: "Today's fate awaits you —",
      titleHighlight: 'A Message of Destiny',
      description: 'Where data meets intuition',
      mbtiPlaceholder: 'Enter your MBTI (e.g. INFJ)',
      cta: 'Read My Fortune',
      socialProof: 'Already today,',
      socialProofCount: '1,248 people',
      socialProofSuffix: 'found their answers',
      googleConnect: 'Connect with Google',
    },
    category: {
      title: "What's on your mind?",
      subtitle: 'Choose the area you would like AI Tarot Master to guide you through.',
      items: [
        { title: "Today's Fortune", desc: "An overview of today's flow and advice" },
        { title: 'Love & Romance', desc: 'Singles, crushes, and relationship dynamics' },
        { title: 'Wealth & Finance', desc: 'Your financial flow and investment timing' },
        { title: 'Career & Business', desc: 'Job changes, employment, project outlook' },
        { title: 'Relationships', desc: 'Conflicts with others and how to resolve them' },
        { title: 'Their True Feelings', desc: 'What is that person really thinking about you?' },
      ],
    },
    cardSelection: {
      title: 'Draw 3 cards',
      subtitle: (category: string) =>
        `For [${category}] — select the Present, Advice, and Outcome cards in order.`,
      positions: ['Present State', 'Challenge / Advice', "Today's Outcome"],
    },
    result: {
      loading: 'The Master is reading your cards...',
      title: 'Your Message of Destiny',
      positions: ['Present State', 'Challenge / Advice', "Today's Outcome"],
      upright: '▲ Upright',
      reversed: '▼ Reversed',
      reset: 'Read Again',
      cardNames: [
        'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
        'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
        'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
        'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World',
      ],
    },
  },
} as const;

export default translations;
