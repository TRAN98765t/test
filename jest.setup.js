// Jest setup: テスト実行前にグローバルで必要なモックを仕込む場所。
// AsyncStorage の公式モックを使用し、ネイティブ依存をテスト環境でシミュレートする。
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
