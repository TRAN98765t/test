# 占い師AI (Uranai App)

React Native + Expo + Claude API で作る AI 占いアプリ。iOS / Android 両対応。

## 機能

- **星座占い** — 12星座 × 今日 / 今週 / 今月
- **タロット占い** — 3枚のカードをめくって占う (flip animation)
- **数秘術** — 生年月日からライフパスナンバーを算出
- **おみくじ** — 筒を振って大吉〜大凶を引く
- **AI占い結果画面** — Claude API が神秘的な結果を生成
- **履歴機能** — AsyncStorage で過去の結果を保存・閲覧
- **シェア機能** — Expo Sharing で結果を共有

## セットアップ

```bash
npm install
cp .env.example .env
# .env に EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-... を設定
npx expo start
```

## 技術スタック

- Expo SDK 51 + Expo Router (ファイルベースルーティング)
- TypeScript
- `@anthropic-ai/sdk` (`dangerouslyAllowBrowser: true`)
- AsyncStorage / Animated API
- モデル: `claude-sonnet-4-20250514`, max_tokens: 800

## ディレクトリ

```
app/         ルーティング (各画面)
components/  共通コンポーネント
utils/       Claude API / ストレージ / 数秘計算
constants/   星座・タロットなどの定数データ
```
