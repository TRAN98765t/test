import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 800;

export type FortuneType = 'horoscope' | 'tarot' | 'numerology' | 'omikuji';

export type FortuneInput = Record<string, string | number>;

const systemPrompt = `あなたは深い叡智を持つ神秘的な占い師です。
ユーザーの相談に対し、星々と月の導きを感じながら、詩的で優しい日本語で占い結果を語ります。
以下のルールを厳守してください:

- 必ず「💖 恋愛運」「💼 仕事運」「🌿 健康運」「✨ 全体運」の4項目を含めること
- 各項目は見出しに絵文字を使い、2〜3文で読みやすく整える
- 文章は神秘的・詩的でありながら、具体的な助言やヒントも必ず織り交ぜる
- 最後に「🎨 ラッキーカラー」と「🔮 ラッキーアイテム」を1行ずつ記載する
- 回答は日本語のみで、英語や曖昧な表現は避ける`;

function buildUserPrompt(type: FortuneType, input: FortuneInput): string {
  switch (type) {
    case 'horoscope': {
      const { sign, period } = input;
      return `【星座占いの依頼】\n星座: ${sign}\n期間: ${period}\nこの星座・期間における運勢を占ってください。`;
    }
    case 'tarot': {
      const { cards } = input;
      return `【タロット占いの依頼】\n引かれた3枚のカード(過去・現在・未来の順): ${cards}\n3枚のカードが示す物語として、過去・現在・未来の流れを踏まえて占ってください。`;
    }
    case 'numerology': {
      const { birthdate, lifePathNumber, name } = input;
      return `【数秘術占いの依頼】\n生年月日: ${birthdate}\nライフパスナンバー: ${lifePathNumber}${
        name ? `\n名前: ${name}` : ''
      }\nライフパスナンバーの本質を踏まえた運勢を占ってください。`;
    }
    case 'omikuji': {
      const { result } = input;
      return `【おみくじの依頼】\n引いた結果: ${result}\nこの結果が示す今日の運勢と過ごし方を占ってください。`;
    }
    default:
      return '【占いの依頼】\n運勢を占ってください。';
  }
}

export async function getFortuneReading(params: {
  type: FortuneType;
  input: FortuneInput;
}): Promise<string> {
  const apiKey = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      'APIキーが設定されていません。.envファイルに EXPO_PUBLIC_ANTHROPIC_API_KEY を設定してください。',
    );
  }

  const client = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: buildUserPrompt(params.type, params.input),
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('占い結果を取得できませんでした。');
    }
    return textBlock.text.trim();
  } catch (err) {
    if (err instanceof Error) {
      const message = err.message.toLowerCase();
      if (message.includes('network') || message.includes('fetch')) {
        throw new Error(
          'ネットワーク接続に問題があるようです。通信環境をご確認のうえ再度お試しください。',
        );
      }
      if (message.includes('401') || message.includes('unauthorized')) {
        throw new Error('APIキーが無効です。設定をご確認ください。');
      }
      throw err;
    }
    throw new Error('占い結果の取得中に予期せぬエラーが発生しました。');
  }
}
